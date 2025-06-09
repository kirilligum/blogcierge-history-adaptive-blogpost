export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import type { D1Database, KVNamespace, R2Bucket, VectorizeIndex } from "@cloudflare/workers-types";
import { getApiKey } from "../../utils/apiKey";

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 60; // 2 months
const ALL_POSTS_CACHE_KEY = "ALL_POSTS_CONCATENATED_V1";
const ALL_POSTS_CACHE_TTL_SECONDS = 60 * 60 * 24; // 1 day

function normalizeQuestionForCache(question: string): string {
  return question.toLowerCase().replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
}

function getR2SessionLogKey(slug: string, sessionId: string, turnTimestamp: string): string {
  const date = new Date(turnTimestamp);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return `ai-logs/${slug}/${formattedDate}/${sessionId}/${turnTimestamp}.json`;
}

const LLAMA_API_URL = "https://api.llama.com/v1/chat/completions";
const DEFAULT_MODEL = "Llama-4-Maverick-17B-128E-Instruct-FP8";
const EMBEDDING_MODEL = "@cf/baai/bge-base-en-v1.5";

async function handleRagMode(
  { slug, currentUserQuestion, messages, readerId, sessionId, turnTimestamp, r2Key },
  { locals }
) {
  const db = locals.runtime.env.BLGC_RAG_DB as D1Database;
  const vectorIndex = locals.runtime.env.BLGC_RAG_VECTORS as VectorizeIndex;
  const ai = locals.runtime.env.AI;
  const aiLogsBucket = locals.runtime.env.BLGC_AI_LOGS_BUCKET;

  if (!db || !vectorIndex || !ai) {
    const errorDetail = `CRITICAL: RAG dependencies are not configured. DB ready: ${!!db}, Vectorize ready: ${!!vectorIndex}, AI ready: ${!!ai}.`;
    console.error(errorDetail);
    if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: errorDetail, source: "error_rag_misconfigured" })));
    return new Response(JSON.stringify({ error: "Server configuration error: RAG system dependencies are not available." }), { status: 500 });
  }

  const { data: embeddingData } = await ai.run(EMBEDDING_MODEL, { text: [currentUserQuestion] });
  const questionEmbedding = embeddingData[0];

  if (!questionEmbedding) {
    const errorDetail = "Failed to generate embedding for the user's question.";
    console.error(errorDetail);
    if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: errorDetail, source: "error_embedding_generation" })));
    return new Response(JSON.stringify({ error: "Failed to process question." }), { status: 500 });
  }

  const topK = 5;
  const vectorQuery = await vectorIndex.query(questionEmbedding, { topK });
  const chunkIds = vectorQuery.matches.map(match => parseInt(match.id));

  let contextChunks: { text: string }[] = [];
  if (chunkIds.length > 0) {
    const query = `SELECT text FROM content_chunks WHERE id IN (${'?,'.repeat(chunkIds.length).slice(0, -1)})`;
    const { results } = await db.prepare(query).bind(...chunkIds).all<{ text: string }>();
    if (results) contextChunks = results;
  }

  const contextMessage = contextChunks.length > 0
    ? `Context:\n${contextChunks.map(chunk => `- ${chunk.text}`).join("\n\n")}`
    : "No relevant context found in the blog posts for this question.";

  const answererSystemPrompt = `You are an expert assistant for a technical blog. Your task is to analyze the user's query in relation to the provided context from the blog, then respond in a specific JSON format. The context consists of the most relevant snippets from blog posts based on the user's question.

Instructions:
1.  **Explain Relation**: Briefly explain how the user's query relates to the provided context.
2.  **Determine Relevance**: Based on the explanation above, state whether the query is relevant (true/false). A query is relevant if the provided context can help answer it.
3.  **Answer if Relevant**: If the query is relevant (true), provide a concise, technically deep answer using ONLY the information from the provided context. If the query is not relevant (false), or if the context is insufficient to answer, the 'response' field in the JSON MUST be an empty string.

The user is asking their question while viewing the blog post with slug: '${slug}'. Use this information if it helps to frame your response.

Here is the relevant context retrieved from the blog:
--- BEGIN CONTEXT ---
${contextMessage}
--- END CONTEXT ---

Use the chat history below for context on the conversation flow.

You MUST output your response as a single JSON object adhering to the following schema:
{ "type": "object", "properties": { "relation": { "type": "string" }, "related": { "type": "boolean" }, "response": { "type": "string" } }, "required": ["relation", "related", "response"] }
No additional text or explanation outside this JSON object.`;
  
  const llmResponseSchema = { name: "blogPostAssistantResponse", strict: true, schema: { type: "object", properties: { relation: { type: "string" }, related: { type: "boolean" }, response: { type: "string" } }, required: ["relation", "related", "response"], additionalProperties: false } };
  const payload = { model: DEFAULT_MODEL, messages: [{ role: "system", content: answererSystemPrompt }, ...messages], max_tokens: 2048, temperature: 0.6, response_format: { type: "json_schema", json_schema: llmResponseSchema } };
  
  return { payload, source: 'llm_rag' };
}

async function handleFullContextMode(
  { slug, currentUserQuestion, messages, readerId, sessionId, turnTimestamp, r2Key },
  { locals }
) {
  const siteContentCache = locals.runtime?.env?.BLGC_SITE_CONTENT_CACHE as KVNamespace | undefined;
  const aiLogsBucket = locals.runtime.env.BLGC_AI_LOGS_BUCKET;
  let allPostsConcatenatedBody: string | null = null;

  if (siteContentCache) {
    allPostsConcatenatedBody = await siteContentCache.get(ALL_POSTS_CACHE_KEY);
  }

  if (!allPostsConcatenatedBody) {
    try {
      const allEntries = await getCollection("blog");
      if (!allEntries || allEntries.length === 0) throw new Error("No blog posts found in collection.");
      const concatenatedBodyFromSource = allEntries.map(entry => `--- BEGIN BLOG POST: ${entry.slug} (Title: ${entry.data.title}) ---\n${entry.body}\n--- END BLOG POST: ${entry.slug} ---`).join("\n\n");
      allPostsConcatenatedBody = concatenatedBodyFromSource;
      if (siteContentCache) {
        locals.runtime.ctx.waitUntil(siteContentCache.put(ALL_POSTS_CACHE_KEY, allPostsConcatenatedBody, { expirationTtl: ALL_POSTS_CACHE_TTL_SECONDS }));
      }
    } catch (e) {
      console.error(`Error fetching blog post collection:`, e);
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: `Context Error: Failed to fetch blog post collection.`, source: "error_context_collection_fetch" })));
    }
  }

  if (!allPostsConcatenatedBody) {
    return new Response(JSON.stringify({ error: "Critical error: Blog post context unavailable." }), { status: 500 });
  }

  const answererSystemPrompt = `You are an expert assistant for a technical blog. Your task is to analyze the user's query in relation to ALL the provided blog post content from the entire site, then respond in a specific JSON format.
  
The user is asking their question while viewing the blog post with slug: '${slug}'.
  
All available blog post content is provided below:
--- BEGIN ALL BLOG POSTS CONTENT ---
${allPostsConcatenatedBody}
--- END ALL BLOG POSTS CONTENT ---
  
You MUST output your response as a single JSON object adhering to the following schema:
{ "type": "object", "properties": { "relation": { "type": "string" }, "related": { "type": "boolean" }, "response": { "type": "string" } }, "required": ["relation", "related", "response"] }`;

  const llmResponseSchema = { name: "blogPostAssistantResponse", strict: true, schema: { type: "object", properties: { relation: { type: "string" }, related: { type: "boolean" }, response: { type: "string" } }, required: ["relation", "related", "response"], additionalProperties: false } };
  const payload = { model: DEFAULT_MODEL, messages: [{ role: "system", content: answererSystemPrompt }, ...messages], max_tokens: 2048, temperature: 0.6, response_format: { type: "json_schema", json_schema: llmResponseSchema } };

  return { payload, source: 'llm_full_context' };
}

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  const aiLogsBucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET;
  const userInteractionsKV = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace | undefined;

  let slug, readerId, sessionId, currentUserQuestion, turnTimestamp, r2Key, useRag;
  let messages;

  try {
    const body = await request.json();
    ({ slug, readerId, sessionId, currentUserQuestion, messages, useRag } = body);

    if (!slug || !readerId || !sessionId || typeof currentUserQuestion === "undefined" || !messages || !Array.isArray(messages) || typeof useRag !== 'boolean') {
      return new Response(JSON.stringify({ error: "Missing required parameters (slug, readerId, sessionId, currentUserQuestion, messages, useRag)." }), { status: 400 });
    }

    turnTimestamp = new Date().toISOString();
    if (aiLogsBucket) r2Key = getR2SessionLogKey(slug, sessionId, turnTimestamp);

    const aiCache = locals.runtime?.env?.BLGC_BLOGPOST_AI_CACHE;
    const lastMessage = messages[messages.length - 1];
    if (aiCache && lastMessage && lastMessage.role === "user" && messages.length === 1) {
      const normalizedCurrentUserQuestion = normalizeQuestionForCache(lastMessage.content);
      const cacheKey = `initial-q::${slug}::${normalizedCurrentUserQuestion}`;
      const cachedAnswer = await aiCache.get(cacheKey);
      if (cachedAnswer) {
        if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, aiResponse: cachedAnswer, source: "cache", cacheKey })));
        return new Response(JSON.stringify({ answer: cachedAnswer, source: "cache" }), { status: 200 });
      }
    }

    const apiKey = getApiKey(locals, import.meta.env.DEV);
    if (!apiKey) {
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: "Server configuration error: API key missing.", source: "error_api_key" })));
      return new Response(JSON.stringify({ error: "Server configuration error. API key missing." }), { status: 500 });
    }

    const modeArgs = { slug, currentUserQuestion, messages, readerId, sessionId, turnTimestamp, r2Key };
    const { payload, source } = useRag
      ? await handleRagMode(modeArgs, context)
      : await handleFullContextMode(modeArgs, context);

    if (payload instanceof Response) return payload; // Error response from handler

    const llmResponse = await fetch(LLAMA_API_URL, { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: `LLM API Error: Status ${llmResponse.status}. Details: ${errorText.substring(0, 1000)}`, source: "error_llm_api_response" })));
      return new Response(JSON.stringify({ error: `AI service failed with status ${llmResponse.status}` }), { status: llmResponse.status });
    }

    const answerData = await llmResponse.json();
    const llmOutputString = answerData.completion_message?.content?.text || answerData.choices?.[0]?.message?.content;

    if (!llmOutputString) {
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: "LLM response content was missing or empty.", source: "error_llm_empty_response_content" })));
      return new Response(JSON.stringify({ error: "AI service returned an empty response." }), { status: 500 });
    }

    const parsedLlmJson = JSON.parse(llmOutputString);
    const { relation, related, response: llmAnswerFromSchema } = parsedLlmJson;

    if (typeof related !== "boolean" || typeof llmAnswerFromSchema === "undefined") {
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ errorDetails: `LLM JSON response did not match expected schema.`, source: "error_llm_schema_mismatch" })));
      return new Response(JSON.stringify({ error: "AI service returned data in an unexpected format." }), { status: 500 });
    }

    if (!related) {
      const funnyResponses = ["My circuits are tingling to chat about the blog post, but your question seems to be exploring a different galaxy! How about we steer back to LLM data curation?", "Hold your horses, thinker! That question's a bit of a wild stallion, off the blog's trail. Let's wrangle it back to AI and data insights!", "I'm geared up to dissect the blog's content! Your query, though, appears to have wandered into a parallel universe. Shall we return to the fascinating realm of LLMs?", "Bleep, blorp! My prime directive is to assist with this blog post. That question is like asking a dictionary for dance moves! Got any queries about data curation strategies?", "While I admire your expansive curiosity, my expertise is finely tuned to the blog post's subject matter. Let's delve into those topics, shall we?"];
      const corkyResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
      if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, aiRawRelation: relation, aiRelatedFlag: related, systemResponse: corkyResponse, source: "system_filter_off_topic" })));
      return new Response(JSON.stringify({ answer: corkyResponse, source: "system_filter_off_topic" }), { status: 200 });
    }

    const finalAnswer = llmAnswerFromSchema || "The AI indicated this query is related but didn't provide a specific answer. Try rephrasing your question.";
    if (aiLogsBucket && r2Key) locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify({ sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, aiRawRelation: relation, aiRelatedFlag: related, aiResponse: finalAnswer, source, modelUsed: DEFAULT_MODEL })));

    if (userInteractionsKV && readerId && slug && turnTimestamp && currentUserQuestion && finalAnswer) {
      const interactionDate = new Date(turnTimestamp).toISOString().split('T')[0];
      const kvKey = `${readerId}/${interactionDate}/${slug}`;
      const userMessageEntry = { role: 'user', content: currentUserQuestion, timestamp: turnTimestamp };
      const aiMessageEntry = { role: 'ai', content: finalAnswer, timestamp: new Date().toISOString() };
      locals.runtime.ctx.waitUntil(
        (async () => {
          try {
            let currentData = await userInteractionsKV.get<any>(kvKey, { type: 'json' }) || { read: true, messages: [] };
            currentData.read = true;
            currentData.messages.push(userMessageEntry, aiMessageEntry);
            await userInteractionsKV.put(kvKey, JSON.stringify(currentData));
          } catch (e) { console.error(`KV store error for /api/ask messages (${kvKey}):`, e); }
        })()
      );
    }

    return new Response(JSON.stringify({ answer: finalAnswer, source: "llm" }), { status: 200 });

  } catch (error: unknown) {
    console.error("Error in /api/ask endpoint:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    if (aiLogsBucket) {
      const finalR2Key = r2Key || `ai-logs/error/${new Date().toISOString()}.json`;
      locals.runtime.ctx.waitUntil(aiLogsBucket.put(finalR2Key, JSON.stringify({ errorDetails: `Outer API Error: ${errorMessage}`, source: "error_api_catch_all" })));
    }
    return new Response(JSON.stringify({ error: `An unexpected server error occurred: ${errorMessage}` }), { status: 500 });
  }
};
