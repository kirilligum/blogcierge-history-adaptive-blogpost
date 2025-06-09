import type { APIRoute } from "astro";
import { getEntryBySlug } from "astro:content";
import type { R2Bucket, R2PutOptions } from "@cloudflare/workers-types";
import { getApiKey } from "../../../utils/apiKey";

const LLAMA_API_URL = "https://api.llama.com/v1/chat/completions";
const MODEL = "Llama-4-Maverick-17B-128E-Instruct-FP8";
const INDEX_KEY = "qa-datasets/_index.json";
const LOCK_EXPIRATION_SECONDS = 300; // 5 minutes

/**
 * Updates the central index file in R2 using an optimistic locking pattern.
 * It will retry a few times if another process updates the index simultaneously.
 */
async function updateIndex(
  r2Bucket: R2Bucket,
  slug: string,
  status: "generating" | "success" | "error",
  data: any,
) {
  for (let i = 0; i < 5; i++) {
    // Retry loop for optimistic locking
    const indexObj = await r2Bucket.get(INDEX_KEY);
    // This will be a string if the object exists, otherwise undefined.
    const etag = indexObj?.etag;

    let index: Record<string, any> = {};
    if (indexObj) {
      try {
        index = await indexObj.json();
      } catch (e) {
        console.error("Could not parse index file, starting fresh.", e);
      }
    }

    index[slug] = { status, ...data };

    try {
      const putOptions: R2PutOptions = {
        httpMetadata: { contentType: "application/json" },
      };

      // Only apply the conditional check if an etag exists (i.e., the file is being updated).
      // If etag is undefined, this is a simple 'put', which is fine for creation.
      if (etag) {
        putOptions.onlyIf = { etagMatches: etag };
      }

      await r2Bucket.put(INDEX_KEY, JSON.stringify(index), putOptions);
      console.log(`Index updated for slug ${slug} with status ${status}.`);
      return; // Success
    } catch (e: any) {
      // This is how we check for precondition failure (etag mismatch)
      if (
        e.constructor.name === "PreconditionFailedError" ||
        (e.message && e.message.includes("status code 412"))
      ) {
        console.log(`Etag mismatch on index update for ${slug}. Retrying...`);
        await new Promise((res) => setTimeout(res, Math.random() * 200 + 50)); // Small random delay
      } else {
        // If it's another error, we should probably stop.
        console.error(
          `Failed to update index for ${slug} with a non-retryable error:`,
          e,
        );
        throw e; // rethrow
      }
    }
  }
  console.error(`Failed to update index for ${slug} after multiple retries.`);
}

/**
 * The background task that generates the dataset, stores it, updates the index,
 * and cleans up the lock file.
 */
async function generateAndStoreDataset(
  slug: string,
  r2Bucket: R2Bucket,
  apiKey: string,
) {
  const lockKey = `qa-datasets/${slug}/_lock`;
  const successKey = `qa-datasets/${slug}/latest.json`;
  const errorKey = `qa-datasets/${slug}/error.json`;

  try {
    // 1. Fetch blog post content
    const entry = await getEntryBySlug("blog", slug);
    if (!entry) {
      throw new Error(`Blog post with slug '${slug}' not found.`);
    }

    // 2. Prepare and call the LLM
    const systemPrompt = `You are a Q&A dataset generator that translates content into a format that is easier to learn for LLMs during pre-trainining and fine-tuning. Given the following blog post, generate a JSON object containing an array of 10 diverse and insightful question-answer pairs that cover the main topics of the article. The questions should be what a curious reader might ask. The answers should be concise and directly derivable from the text.

You MUST output your response as a single JSON object adhering to the provided schema.

--- BLOG POST CONTENT ---
${entry.body}
`;

    const qaSchema = {
      name: "generateQADataset",
      strict: true,
      schema: {
        type: "object",
        properties: {
          qa_pairs: {
            type: "array",
            description: "An array of question and answer pairs.",
            items: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description:
                    "A question a reader might ask about the blog post.",
                },
                answer: {
                  type: "string",
                  description:
                    "A concise answer to the question, derived from the blog post.",
                },
              },
              required: ["question", "answer"],
              additionalProperties: false, // Added to comply with docs
            },
          },
        },
        required: ["qa_pairs"],
        additionalProperties: false, // Added to comply with docs
      },
    };

    const payload = {
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }],
      response_format: {
        type: "json_schema",
        json_schema: qaSchema,
      },
      max_tokens: 8192,
      temperature: 0.5,
    };

    const llmResponse = await fetch(LLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      throw new Error(`LLM API Error (${llmResponse.status}): ${errorText}`);
    }

    const llmData = await llmResponse.json();
    const jsonString =
      llmData.completion_message?.content?.text ||
      llmData.choices?.[0]?.message?.content;

    if (!jsonString) {
      throw new Error("LLM returned an empty response.");
    }

    // 3. Validate and store the result
    let parsedJson;
    try {
      parsedJson = JSON.parse(jsonString);
    } catch (e) {
      throw new Error(
        `Failed to parse LLM JSON response. Raw response: ${jsonString}`,
      );
    }

    const qaData = parsedJson.qa_pairs;
    if (!Array.isArray(qaData)) {
      throw new Error(
        `LLM response did not contain a 'qa_pairs' array. Raw response: ${jsonString}`,
      );
    }

    const resultPayload = {
      slug,
      generatedAt: new Date().toISOString(),
      model: MODEL,
      data: qaData,
    };

    await r2Bucket.put(successKey, JSON.stringify(resultPayload), {
      httpMetadata: { contentType: "application/json" },
    });
    console.log(`Successfully generated and stored QA dataset for ${slug}.`);

    // 4. Update the central index to 'success'
    await updateIndex(r2Bucket, slug, "success", {
      generatedAt: resultPayload.generatedAt,
    });
  } catch (error) {
    console.error(`Error generating dataset for ${slug}:`, error);
    const errorPayload = {
      slug,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    };
    await r2Bucket.put(errorKey, JSON.stringify(errorPayload), {
      httpMetadata: { contentType: "application/json" },
    });

    // Update index with error status
    await updateIndex(r2Bucket, slug, "error", {
      error: errorPayload.error,
      timestamp: errorPayload.timestamp,
    });
  } finally {
    // 5. Clean up the lock file
    await r2Bucket.delete(lockKey);
    console.log(`Lock file for ${slug} deleted.`);
  }
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const r2Bucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET as
    | R2Bucket
    | undefined;
  const apiKey = getApiKey(locals, import.meta.env.DEV);

  if (!r2Bucket || !apiKey) {
    return new Response(
      "Server configuration error: R2 or API key not available.",
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const slug = formData.get("slug");

  if (typeof slug !== "string") {
    return new Response("Slug is required.", { status: 400 });
  }

  const lockKey = `qa-datasets/${slug}/_lock`;

  // 1. Implement Lock
  const existingLock = await r2Bucket.head(lockKey);
  if (existingLock) {
    const lockAge = Date.now() - existingLock.uploaded.getTime();
    if (lockAge < LOCK_EXPIRATION_SECONDS * 1000) {
      console.log(`Lock for ${slug} is still active.`);
      const redirectUrl = new URL("/blog/admin/list", request.url);
      redirectUrl.searchParams.set("generation_locked_for", slug);
      return redirect(redirectUrl.toString(), 303);
    }
    console.log(`Found expired lock for ${slug}. Overwriting.`);
  }

  // Create lock file. A simple put is sufficient given the check above.
  // A race condition is possible but unlikely and low-impact for this use case.
  await r2Bucket.put(
    lockKey,
    JSON.stringify({ startedAt: new Date().toISOString() }),
    { httpMetadata: { contentType: "application/json" } },
  );
  console.log(`Lock acquired for ${slug}.`);

  // 2. Update index to 'generating' status
  await updateIndex(r2Bucket, slug, "generating", {
    startedAt: new Date().toISOString(),
  });

  // 3. Trigger background process
  locals.runtime.ctx.waitUntil(generateAndStoreDataset(slug, r2Bucket, apiKey));

  // 4. Redirect back to the list page
  const redirectUrl = new URL("/blog/admin/list", request.url);
  redirectUrl.searchParams.set("generation_started_for", slug);
  return redirect(redirectUrl.toString(), 303); // Use 303 See Other for POST-redirect-GET
};
