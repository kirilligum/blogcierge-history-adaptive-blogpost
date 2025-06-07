import type { APIRoute } from "astro";
import { getEntryBySlug } from "astro:content";
import type { R2Bucket } from "@cloudflare/workers-types";
import { getApiKey } from "../../../utils/apiKey";

const LLAMA_API_URL = "https://api.llama.com/v1/chat/completions";
const MODEL = "Llama-4-Maverick-17B-128E-Instruct-FP8";

export const prerender = false;

/**
 * This function runs in the background after the user has been redirected.
 * It performs the heavy lifting: calling the LLM and storing the result in R2.
 */
async function generateAndStoreDataset(
  slug: string,
  locals: App.Locals,
  r2Bucket: R2Bucket,
) {
  // First, clean up any error file from a previous failed attempt for this slug.
  await r2Bucket.delete(`qa-datasets/${slug}/error.json`);

  try {
    const entry = await getEntryBySlug("blog", slug);
    if (!entry) {
      throw new Error("Blog post not found.");
    }

    const apiKey = getApiKey(locals, import.meta.env.DEV);
    if (!apiKey) {
      throw new Error("API key not configured on server.");
    }

    const qaSchema = {
      name: "generateQADataset",
      strict: true,
      schema: {
        type: "object",
        properties: {
          qa_pairs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string", description: "An insightful question a target reader might ask." },
                answer: { type: "string", description: "A concise answer synthesized directly from the article." },
              },
              required: ["question", "answer"],
            },
          },
        },
        required: ["qa_pairs"],
      },
    };

    const systemPrompt = `You are an expert in creating educational materials. Generate a set of question-and-answer pairs based on the provided blog post. The questions should be what a curious reader would ask. The answers must be synthesized *directly* from the article content. The purpose is to create a dataset for an LLM to better understand the article.

BLOG POST CONTENT:
---
${entry.body}
---

You MUST output your response as a single JSON object adhering to the specified schema.`;

    const payload = {
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }],
      max_tokens: 4000,
      temperature: 0.4,
      response_format: { type: "json_schema", json_schema: qaSchema },
    };

    const llmResponse = await fetch(LLAMA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      throw new Error(`LLM API Error: ${llmResponse.status} - ${errorText}`);
    }

    const llmData = await llmResponse.json();
    const llmOutputString = llmData.completion_message?.content?.text || llmData.choices?.[0]?.message?.content;
    const parsedJson = JSON.parse(llmOutputString);
    const qaPairs = parsedJson.qa_pairs;

    if (qaPairs && Array.isArray(qaPairs)) {
      const r2Key = `qa-datasets/${slug}/latest.json`;
      const fileContent = JSON.stringify({ generatedAt: new Date().toISOString(), data: qaPairs }, null, 2);
      await r2Bucket.put(r2Key, fileContent);
      console.log(`[QA-GEN] Successfully generated and stored dataset for slug: ${slug}`);
    } else {
      throw new Error("LLM returned invalid or empty data structure.");
    }
  } catch (error) {
    console.error(`[QA-GEN] Failed to generate dataset for slug ${slug}:`, error);
    // On failure, write an error file to R2 so the UI can see it.
    await r2Bucket.put(`qa-datasets/${slug}/error.json`, JSON.stringify({ error: error.message, timestamp: new Date().toISOString() }));
  }
}

/**
 * This is the main API handler. It's fast and non-blocking.
 * It starts the background job and immediately redirects the user.
 */
export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const r2Bucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET as R2Bucket | undefined;
  if (!r2Bucket) {
    return new Response("R2 bucket not configured.", { status: 500 });
  }

  const formData = await request.formData();
  const slug = formData.get("slug");
  
  if (!slug || typeof slug !== "string") {
    return new Response("Post slug is required.", { status: 400 });
  }

  // Hand off the long-running task to the Cloudflare runtime.
  locals.runtime.ctx.waitUntil(generateAndStoreDataset(slug, locals, r2Bucket));

  // Immediately redirect back to the list page with a status message.
  const redirectURL = new URL(request.headers.get('referer') || '/blog/admin/list');
  redirectURL.searchParams.set('generation_started_for', slug);
  return redirect(redirectURL.toString());
};
