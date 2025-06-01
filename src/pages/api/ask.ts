export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from "astro";
// REMOVE:
// import { getEntryBySlug } from "astro:content";
// ADD:
import { getCollection, getEntryBySlug } from "astro:content"; // Added getEntryBySlug
import type { KVNamespace, R2Bucket } from "@cloudflare/workers-types"; // Added R2Bucket
import { getApiKey } from "../../utils/apiKey";

// CACHE_TTL_SECONDS for individual questions remains the same
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 60; // 2 months (60 days)

// ADD: Constants for all-posts content cache
const ALL_POSTS_CACHE_KEY = "ALL_POSTS_CONCATENATED_V1";
const ALL_POSTS_CACHE_TTL_SECONDS = 60 * 60 * 24; // 1 day (adjust as needed)

function normalizeQuestionForCache(question: string): string {
  // Normalize by converting to lowercase, removing punctuation, and collapsing multiple spaces
  return question
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper function to generate R2 object key
function getR2SessionLogKey(
  slug: string,
  sessionId: string,
  turnTimestamp: string,
): string {
  const date = new Date(turnTimestamp);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return `ai-logs/${slug}/${formattedDate}/${sessionId}/${turnTimestamp}.json`;
}

const LLAMA_API_URL = "https://api.llama.com/v1/chat/completions";
const DEFAULT_MODEL = "Llama-4-Maverick-17B-128E-Instruct-FP8";

export const POST: APIRoute = async ({ request, locals }) => {
  // Define aiLogsBucket at the top of the function scope, before the try block
  const aiLogsBucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET;
  const userInteractionsKV = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace | undefined;
  // ADD: Access the new KV namespace for site content
  const siteContentCache = locals.runtime?.env?.BLGC_SITE_CONTENT_CACHE as KVNamespace | undefined;

  // Declare variables that might be used in the catch block if an early error occurs
  let slug: string | undefined;
  let readerId: string | undefined;
  let sessionId: string | undefined;
  let currentUserQuestion: string | undefined;
  let turnTimestamp: string | undefined;
  let r2Key: string | undefined;

  try {
    // 1. Parse incoming request data
    const body = await request.json();
    // Expect 'messages' array, 'slug', 'readerId', 'sessionId', 'currentUserQuestion'
    // Assign to the variables declared above
    ({ slug, readerId, sessionId, currentUserQuestion } = body);
    const messages = body.messages; // messages is also from body

    // Basic validation
    if (
      !slug ||
      !readerId ||
      !sessionId ||
      typeof currentUserQuestion === "undefined" ||
      !messages ||
      !Array.isArray(
        messages,
      ) /* messages.length === 0 is allowed if currentUserQuestion is primary */
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required parameters (slug, readerId, sessionId, currentUserQuestion, messages).",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    turnTimestamp = new Date().toISOString(); // Timestamp for this entire turn
    // r2Key is initialized here, ensuring it's defined if slug, sessionId, and turnTimestamp are valid
    if (aiLogsBucket && slug && sessionId && turnTimestamp) {
      r2Key = getR2SessionLogKey(slug, sessionId, turnTimestamp);
    } else {
      r2Key = ""; // Ensure r2Key is initialized even if not fully formed
    }

    // User question logging will be combined with the response/error logging later.

    // --- START REPLACEMENT: Fetching ALL blog post content with KV Caching ---
    let allPostsConcatenatedBody: string | null = null;

    if (siteContentCache) {
      try {
        console.log(`[CACHE_ALL_POSTS] Attempting to read from KV: ${ALL_POSTS_CACHE_KEY}`);
        allPostsConcatenatedBody = await siteContentCache.get(ALL_POSTS_CACHE_KEY);
        if (allPostsConcatenatedBody) {
          console.log(`[CACHE_ALL_POSTS] HIT: Found all posts content in KV.`);
        } else {
          console.log(`[CACHE_ALL_POSTS] MISS: All posts content not found in KV.`);
        }
      } catch (kvError) {
        console.error(`[CACHE_ALL_POSTS] Error reading from KV for ${ALL_POSTS_CACHE_KEY}:`, kvError);
        // Proceed to fetch from source, allPostsConcatenatedBody remains null.
      }
    }

    if (!allPostsConcatenatedBody) {
      console.log("[CACHE_ALL_POSTS] Fetching all posts from astro:content as it was not in KV or KV read failed.");
      try {
        const allEntries = await getCollection("blog");

        if (!allEntries || allEntries.length === 0) {
          console.error(`No blog posts found in the collection.`);
          if (aiLogsBucket && r2Key) {
            const logData = {
              sessionId,
              readerId,
              blogSlug: slug, // Log the current page's slug
              turnTimestampUTC: turnTimestamp,
              userQuestion: currentUserQuestion,
              errorDetails: `Context Error: No blog posts found in collection.`,
              source: "error_context_no_posts_in_collection",
            };
            locals.runtime.ctx.waitUntil(
              aiLogsBucket.put(r2Key, JSON.stringify(logData)),
            );
          }
          return new Response(
            JSON.stringify({ error: "Blog post context not available (no posts found)." }),
            { status: 404 },
          );
        }

        const concatenatedBodyFromSource = allEntries
          .map(
            (entry) =>
              `--- BEGIN BLOG POST: ${entry.slug} (Title: ${entry.data.title}) ---\n${entry.body}\n--- END BLOG POST: ${entry.slug} ---`,
          )
          .join("\n\n");
        
        allPostsConcatenatedBody = concatenatedBodyFromSource;

        if (siteContentCache && allPostsConcatenatedBody) {
          console.log(`[CACHE_ALL_POSTS] Writing fetched all posts content to KV: ${ALL_POSTS_CACHE_KEY}`);
          locals.runtime.ctx.waitUntil(
            siteContentCache.put(ALL_POSTS_CACHE_KEY, allPostsConcatenatedBody, {
              expirationTtl: ALL_POSTS_CACHE_TTL_SECONDS,
            })
            .then(() => console.log(`[CACHE_ALL_POSTS] Successfully wrote all posts content to KV.`))
            .catch((kvWriteError) => console.error(`[CACHE_ALL_POSTS] Error writing all posts content to KV:`, kvWriteError))
          );
        }
      } catch (e) {
        console.error(`Error fetching blog post collection:`, e);
        if (aiLogsBucket && r2Key) {
          const logData = {
            sessionId,
            readerId,
            blogSlug: slug, // Log the current page's slug
            turnTimestampUTC: turnTimestamp,
            userQuestion: currentUserQuestion,
            errorDetails: `Context Error: Failed to fetch blog post collection. Details: ${e instanceof Error ? e.message : String(e)}`,
            source: "error_context_collection_fetch",
          };
          locals.runtime.ctx.waitUntil(
            aiLogsBucket.put(r2Key, JSON.stringify(logData)),
          );
        }
        // If fetching from source fails, allPostsConcatenatedBody might still be null.
        // The check below will handle returning an error.
      }
    }

    if (!allPostsConcatenatedBody) {
      console.error(`CRITICAL: All blog post content could not be retrieved from cache or source.`);
      if (aiLogsBucket && r2Key) {
          const logData = {
              sessionId,
              readerId,
              blogSlug: slug,
              turnTimestampUTC: turnTimestamp,
              userQuestion: currentUserQuestion,
              errorDetails: `Context Error: Failed to retrieve concatenated blog post content from both KV cache and astro:content.`,
              source: "error_context_retrieval_failed_completely",
          };
          locals.runtime.ctx.waitUntil(
              aiLogsBucket.put(r2Key, JSON.stringify(logData))
          );
      }
      return new Response(
          JSON.stringify({ error: "Critical error: Blog post context unavailable." }),
          { status: 500 },
      );
    }
    // --- END REPLACEMENT: Fetching ALL blog post content with KV Caching ---

    // 3. Securely access the API key
    const apiKey = getApiKey(locals, import.meta.env.DEV);

    if (!apiKey) {
      const contextMessage = import.meta.env.DEV
        ? "Local development: LLAMA_API_KEY not found in .env or via platform proxy."
        : "Cloudflare deployment: LLAMA_API_KEY not found in environment variables. Ensure it is set in Pages project settings.";
      console.error(`CRITICAL: ${contextMessage}`);
      // Log API key error to R2
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          errorDetails: `Server configuration error: API key missing. Context: ${contextMessage}`,
          source: "error_api_key",
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket.put(r2Key, JSON.stringify(logData)),
        );
      }
      return new Response(
        JSON.stringify({
          error: "Server configuration error. API key missing.",
        }),
        {
          status: 500, // Internal Server Error
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Determine cache eligibility and attempt cache read
    const aiCache = locals.runtime?.env?.BLGC_BLOGPOST_AI_CACHE;
    const lastMessage = messages[messages.length - 1];
    let isCacheableQuestion = false;
    let cacheKey = "";
    // let questionContentMatches = false; // REMOVED

    console.log(
      "[DEBUG] Initial cache eligibility check. KV available:",
      !!aiCache,
    );
    if (lastMessage) {
      console.log(
        `[DEBUG] Last message role: "${lastMessage.role}", content (first 100 chars): "${lastMessage.content?.substring(0, 100)}"`,
      );
    } else {
      console.log("[DEBUG] No last message found in request.");
    }
    console.log(`[DEBUG] Total messages in history: ${messages.length}`);

    if (aiCache && lastMessage && lastMessage.role === "user") {
      const currentUserQuestion = lastMessage.content;
      // It's good practice to normalize the question for the cache key to avoid minor variations
      // (e.g., case, extra spaces) creating different cache entries for essentially the same question.
      const normalizedCurrentUserQuestion =
        normalizeQuestionForCache(currentUserQuestion);

      console.log(
        `[DEBUG] Current user question (raw, first 100 chars): "${currentUserQuestion?.substring(0, 100)}"`,
      );
      console.log(
        `[DEBUG] Current user question (normalized): "${normalizedCurrentUserQuestion}"`,
      );
      // The log for predefined cacheable question is no longer relevant here.

      // NEW CACHING LOGIC: Cache if it's the first message in the thread.
      if (messages.length === 1) {
        console.log(
          "[DEBUG] This is the FIRST message. This question IS cacheable.",
        );
        isCacheableQuestion = true; // Mark as cacheable
        // Generate a cache key based on the slug AND the normalized question content
        // to ensure different initial questions for the same slug have different cache entries.
        // Using a prefix like "initial-q::" to distinguish from other potential cache types in the future.
        cacheKey = `initial-q::${slug}::${normalizedCurrentUserQuestion}`;
        console.log(`[DEBUG] Generated cache key: "${cacheKey}"`);

        // Attempt cache read
        try {
          console.log(`[CACHE] Checking cache for key: ${cacheKey}`);
          const cachedAnswer = await aiCache.get(cacheKey);
          if (cachedAnswer) {
            console.log(
              `[CACHE] HIT for key: ${cacheKey}. Returning cached answer.`,
            );
            // Log cache hit to R2
            if (aiLogsBucket && r2Key) {
              const logData = {
                sessionId,
                readerId,
                blogSlug: slug,
                turnTimestampUTC: turnTimestamp,
                userQuestion: currentUserQuestion,
                aiResponse: cachedAnswer,
                source: "cache",
                cacheKey,
              };
              locals.runtime.ctx.waitUntil(
                aiLogsBucket
                  .put(r2Key, JSON.stringify(logData), {
                    httpMetadata: { contentType: "application/json" },
                  })
                  .then(() => console.log(`Logged CACHE HIT to R2: ${r2Key}`))
                  .catch((e) =>
                    console.error(
                      `Error logging CACHE HIT to R2 for ${r2Key}:`,
                      e,
                    ),
                  ),
              );
            }
            return new Response(
              JSON.stringify({ answer: cachedAnswer, source: "cache" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              },
            );
          } else {
            console.log(`[CACHE] MISS for key: ${cacheKey}`);
          }
        } catch (kvError) {
          console.error(
            `[CACHE] KV Cache read error for key ${cacheKey}:`,
            kvError,
          );
          // If cache read fails, proceed to LLM call. Do not block the request.
        }
      } else {
        console.log(
          `[DEBUG] This is NOT the FIRST message (messages.length: ${messages.length}). Not attempting cache read, and will not write to cache later.`,
        );
      }
      // The old 'if/else' block checking against NORMALIZED_CACHEABLE_QUESTION is removed.
    } else {
      let reason = "[DEBUG] Initial conditions for caching not met: ";
      if (!aiCache) reason += "KV unavailable. ";
      if (!lastMessage) reason += "No last message. ";
      else if (lastMessage.role !== "user")
        reason += `Last message not from user (role: ${lastMessage.role}). `;
      console.log(reason.trim());
    }

    // 5. Prepare the payload for OpenRouter if not served from cache
    // The entire `post.body` is used as context, as requested.
    // Be aware: Extremely large post bodies might exceed model context limits.
    const siteUrl = new URL(request.url).origin; // Get site's base URL

    // --- Define Payload for the Answering LLM ---
    // llmResponseSchema remains the same
    const llmResponseSchema = {
      name: "blogPostAssistantResponse", // A descriptive name for the schema
      strict: true, // Enforce schema strictly, as per Cerebras docs for best results
      schema: {
        type: "object",
        properties: {
          relation: {
            type: "string",
            description:
              "Explanation of how the query relates to the blog post.",
          },
          related: {
            type: "boolean",
            description:
              "True if the query is related to the blog post, false otherwise.",
          },
          response: {
            type: "string",
            description:
              "The answer to the query if related, or an empty string if not related.",
          },
        },
        required: ["relation", "related", "response"],
        additionalProperties: false, // Disallow properties not defined in the schema
      },
    };

    // MODIFY: Update the system prompt
    const answererSystemPrompt = `You are an expert assistant for a technical blog.
Your task is to analyze the user's query in relation to ALL the provided blog post content from the entire site, then respond in a specific JSON format.

Instructions:
1.  **Explain Relation**: Briefly explain how the user's query relates to the provided blog post content, OR to the broader topics, technologies, and concepts discussed or implied within the blog post.
2.  **Determine Relevance**: Based on the explanation above, state whether the query is relevant (true/false).
    *   A query is **relevant** if it demonstrates a clear conceptual linkage to, represents a logical pathway of inquiry from, or aligns thematically within the conceptual scope established by the blog post's content. This includes queries that:
        *   Directly address specific statements, facts, arguments, conclusions, or information explicitly presented in the blog post.
        *   Seek further detail, explanation, elaboration, background context, functional details, or potential implications for concepts, entities, processes, or terms that are explicitly mentioned or integral to understanding the blog post.
        *   Explore topics that are integral components of, necessary prerequisites to understanding, or natural extensions and specializations of the primary subjects discussed in the blog post.
        *   Discuss broader principles, overarching categories, established fields of study, or adjacent areas of inquiry to which the blog post's main subject matter demonstrably belongs and is intrinsically or thematically linked.
        *   Request clarification of language, terminology, or concepts used within the blog post to ensure accurate comprehension.
    *   A query is **not relevant** if it introduces subjects or themes that share no discernible conceptual, logical, or hierarchical connection to the blog post's explicit content or its clearly established subject area, thereby falling outside its thematic boundaries and conceptual scope.
3.  **Answer if Relevant**: If the query is relevant (true), provide a concise, technically deep answer (around 5 lines or less, focusing on definitions or key concepts from the blog post or related topics as appropriate). If the query is not relevant (false), the 'response' field in the JSON MUST be an empty string.

The user is asking their question while viewing the blog post with slug: '${slug}'. Use this information if it helps to frame your response or understand the user's immediate point of reference.

All available blog post content is provided below:
--- BEGIN ALL BLOG POSTS CONTENT ---
${allPostsConcatenatedBody}
--- END ALL BLOG POSTS CONTENT ---

Use the chat history below for context if relevant to the current question.

You MUST output your response as a single JSON object adhering to the following schema:
{
  "type": "object",
  "properties": {
    "relation": { "type": "string", "description": "Explanation of how the query relates to the blog post content or its broader topics." },
    "related": { "type": "boolean", "description": "True if the query is relevant, false otherwise." },
    "response": { "type": "string", "description": "The answer to the query if relevant, or an empty string if not relevant." }
  },
  "required": ["relation", "related", "response"]
}
No additional text or explanation outside this JSON object.`;

    const answererPayload = {
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: answererSystemPrompt },
        // Ensure `messages` here is the chat history from the client, not the one used for cache check
        ...(body.messages || []), // Use body.messages which is the chat history for LLM
      ],
      max_tokens: 2048,
      temperature: 0.6,
      repetition_penalty: 1,
      top_p: 0.9,
      response_format: {
        type: "json_schema",
        json_schema: llmResponseSchema, // llmResponseSchema contains name, strict, and the actual schema
      },
      // The system prompt still requests JSON output, and this will enforce it.
    };

    // --- Prepare and Make Answerer LLM Call ---
    const commonHeaders = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "Blog AI Assistant",
    };

    let answererResponse;
    let attemptNumber = 1; 
    let finalLlmSuccessful = false;
    let llmOutputString; // To store the successful LLM output string
    let actualProviderUsed = DEFAULT_MODEL; // Initialize, might be updated by fallback

    console.log(
      `[LLM_CALL] Attempt ${attemptNumber}: Calling LLM with all posts context. Model: ${answererPayload.model}. API URL: ${LLAMA_API_URL}`,
    );
    console.log(
      "[MOCKING_LOG] LLM Input Payload:",
      JSON.stringify(answererPayload, null, 2),
    ); // Added for mocking
    
    try {
      answererResponse = await fetch(LLAMA_API_URL, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify(answererPayload),
      });
    } catch (fetchError) {
      console.error("LLM API fetch error:", fetchError);
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          errorDetails: `LLM API fetch error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`,
          source: "error_llm_api_fetch",
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket.put(r2Key, JSON.stringify(logData)),
        );
      }
      return new Response(
        JSON.stringify({ error: "Failed to connect to the AI service." }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!answererResponse.ok) {
      const primaryErrorText = await answererResponse.text();
      const primaryStatus = answererResponse.status;
      console.error(
        `[LLM_CALL] Attempt ${attemptNumber} FAILED: Status ${primaryStatus}`,
        primaryErrorText.substring(0, 500),
      );
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          errorDetails: `LLM API Error (Primary Attempt): Status ${primaryStatus}. Details: ${primaryErrorText.substring(0, 1000)}`,
          source: "error_llm_api_response_primary",
          attempt: attemptNumber,
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket.put(r2Key, JSON.stringify(logData)),
        );
      }

      // --- BEGIN FALLBACK LOGIC ---
      attemptNumber = 2;
      console.log(`[LLM_CALL] Attempt ${attemptNumber}: FALLBACK - Fetching current blog post content for slug: ${slug}`);

      let currentPostBodyForFallback: string | null = null;
      try {
        const currentPostEntry = await getEntryBySlug("blog", slug); // Use the slug from the request
        if (!currentPostEntry) {
          console.error(`[FALLBACK_CONTEXT] Error: Blog post with slug '${slug}' not found for fallback.`);
          if (aiLogsBucket && r2Key) {
            const logData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, errorDetails: `Fallback context retrieval failed: Blog post with slug '${slug}' not found. Primary LLM error was: Status ${primaryStatus}, ${primaryErrorText.substring(0,200)}`, source: "error_fallback_context_not_found", attempt: attemptNumber-1 };
            locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify(logData)));
          }
          return new Response(JSON.stringify({ error: `AI service primary attempt failed (Status ${primaryStatus}). Fallback context retrieval also failed: post '${slug}' not found.` }), { status: primaryStatus, headers: { "Content-Type": "application/json" } });
        }
        currentPostBodyForFallback = currentPostEntry.body;
        console.log(`[FALLBACK_CONTEXT] Successfully fetched content for slug '${slug}'.`);
      } catch (e) {
        console.error(`[FALLBACK_CONTEXT] Error fetching blog post '${slug}' for fallback:`, e);
        if (aiLogsBucket && r2Key) {
            const logData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, errorDetails: `Fallback context retrieval failed: Error fetching post '${slug}'. Details: ${e instanceof Error ? e.message : String(e)}. Primary LLM error was: Status ${primaryStatus}, ${primaryErrorText.substring(0,200)}`, source: "error_fallback_context_fetch", attempt: attemptNumber-1 };
            locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify(logData)));
        }
        return new Response(JSON.stringify({ error: `AI service primary attempt failed (Status ${primaryStatus}). Fallback context retrieval also failed: error fetching post '${slug}'.` }), { status: primaryStatus, headers: { "Content-Type": "application/json" } });
      }

      if (currentPostBodyForFallback) {
        const fallbackSystemPrompt = `You are an expert assistant for a technical blog.
Your task is to analyze the user's query in relation to THE PROVIDED BLOG POST CONTENT (current post only), then respond in a specific JSON format.
This is a fallback attempt because a previous attempt with broader context (all site posts) failed. Focus your answer only on the single blog post provided below.

The user is asking their question while viewing the blog post with slug: '${slug}'.

THE blog post content is provided below:
--- BEGIN CURRENT BLOG POST CONTENT ---
${currentPostBodyForFallback}
--- END CURRENT BLOG POST CONTENT ---

Use the chat history below for context if relevant to the current question.

You MUST output your response as a single JSON object adhering to the following schema:
{
  "type": "object",
  "properties": {
    "relation": { "type": "string", "description": "Explanation of how the query relates to THE blog post content or its broader topics." },
    "related": { "type": "boolean", "description": "True if the query is relevant, false otherwise." },
    "response": { "type": "string", "description": "The answer to the query if relevant, or an empty string if not relevant." }
  },
  "required": ["relation", "related", "response"]
}
No additional text or explanation outside this JSON object.`;

        const fallbackPayload = {
          ...answererPayload, // Spread original payload (model, max_tokens, temp, etc.)
          messages: [ // Override messages to change system prompt
            { role: "system", content: fallbackSystemPrompt },
            ...(body.messages || []), // Keep the original chat history
          ],
        };

        console.log(`[LLM_CALL] Attempt ${attemptNumber}: Calling LLM with fallback (single post) context.`);
        console.log("[MOCKING_LOG] Fallback LLM Input Payload:", JSON.stringify(fallbackPayload, null, 2));

        try {
          answererResponse = await fetch(LLAMA_API_URL, { // Re-assign answererResponse
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify(fallbackPayload),
          });
        } catch (fetchErrorFallback) {
          console.error(`[LLM_CALL] Attempt ${attemptNumber} (Fallback) FETCH FAILED:`, fetchErrorFallback);
          if (aiLogsBucket && r2Key) {
            const logData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, errorDetails: `LLM API fetch error (Fallback Attempt): ${fetchErrorFallback instanceof Error ? fetchErrorFallback.message : String(fetchErrorFallback)}`, source: "error_llm_api_fetch_fallback", attempt: attemptNumber };
            locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify(logData)));
          }
          return new Response(JSON.stringify({ error: "Failed to connect to the AI service on fallback attempt." }), { status: 503, headers: { "Content-Type": "application/json" } });
        }

        if (answererResponse.ok) {
          console.log(`[LLM_CALL] Attempt ${attemptNumber} (Fallback) SUCCEEDED.`);
          finalLlmSuccessful = true;
          const answerDataFallback = await answererResponse.json();
          llmOutputString = answerDataFallback.completion_message?.content?.text;
          actualProviderUsed = DEFAULT_MODEL; // Or derive if different for fallback
        } else {
          const fallbackErrorText = await answererResponse.text();
          console.error(`[LLM_CALL] Attempt ${attemptNumber} (Fallback) FAILED: Status ${answererResponse.status}`, fallbackErrorText.substring(0, 500));
          if (aiLogsBucket && r2Key) {
            const logData = { sessionId, readerId, blogSlug: slug, turnTimestampUTC: turnTimestamp, userQuestion: currentUserQuestion, errorDetails: `LLM API Error (Fallback Attempt): Status ${answererResponse.status}. Details: ${fallbackErrorText.substring(0, 1000)}`, source: "error_llm_api_response_fallback", attempt: attemptNumber };
            locals.runtime.ctx.waitUntil(aiLogsBucket.put(r2Key, JSON.stringify(logData)));
          }
          return new Response(JSON.stringify({ error: `AI service fallback attempt also failed (Status ${answererResponse.status}). Details: ${fallbackErrorText}` }), { status: answererResponse.status, headers: { "Content-Type": "application/json" } });
        }
      } else {
        // This case should be covered by earlier returns if currentPostBodyForFallback is null.
        // For safety, returning the primary error if somehow reached.
        return new Response(JSON.stringify({ error: `AI service primary attempt failed (Status ${primaryStatus}). Fallback context was not available.` }), { status: primaryStatus, headers: { "Content-Type": "application/json" } });
      }
      // --- END FALLBACK LOGIC ---
    } else {
      // Primary LLM call was successful
      console.log(`[LLM_CALL] Attempt ${attemptNumber} (Primary) SUCCEEDED.`);
      finalLlmSuccessful = true;
      const answerData = await answererResponse.json();
      llmOutputString = answerData.completion_message?.content?.text;
      actualProviderUsed = DEFAULT_MODEL; // From primary attempt
    }

    if (!finalLlmSuccessful || !llmOutputString) {
      // This should ideally not be reached if all error paths return a Response.
      // If llmOutputString is null/undefined after a supposedly successful call.
      console.error(
        "LLM response content is missing or empty after successful call flag. LLM Output:", llmOutputString ? llmOutputString.substring(0,100) : "undefined",
        "Raw response object (if available):", answererResponse ? JSON.stringify(await answererResponse.json()).substring(0,500) : "N/A"
      );
      if (aiLogsBucket && r2Key) {
          const logData = {
            sessionId,
            readerId,
            blogSlug: slug,
            turnTimestampUTC: turnTimestamp,
            userQuestion: currentUserQuestion,
            errorDetails: "LLM response content was missing or empty after successful call.",
            source: "error_llm_empty_response_content",
            attempt: attemptNumber, // Add attempt number
          };
          locals.runtime.ctx.waitUntil(
            aiLogsBucket.put(r2Key, JSON.stringify(logData)),
          );
        }
        return new Response(
          JSON.stringify({
            error:
              "AI service returned an empty or malformed response content.",
          }),
          { status: 500 },
        );
      }

    let parsedLlmJson;
    try {
      parsedLlmJson = JSON.parse(llmOutputString);
      console.log(
        "[MOCKING_LOG] LLM Parsed Output JSON:",
        JSON.stringify(parsedLlmJson, null, 2),
      ); // Added for mocking
    } catch (e) {
      console.error(
        "Failed to parse LLM JSON response:",
        e,
        "Raw response:",
        llmOutputString.substring(0, 500),
      );
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          errorDetails: `Failed to parse LLM JSON. Error: ${e instanceof Error ? e.message : String(e)}. Raw: ${llmOutputString.substring(0, 500)}`,
          source: "error_llm_json_parse",
          attempt: attemptNumber, // Add attempt number
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket.put(r2Key, JSON.stringify(logData)),
        );
      }
      return new Response(
        JSON.stringify({
          error: "AI service returned a response that was not valid JSON.",
        }),
        { status: 500 },
      );
    }

    const { relation, related, response: llmAnswerFromSchema } = parsedLlmJson;

    if (
      typeof related !== "boolean" ||
      typeof llmAnswerFromSchema === "undefined" ||
      typeof relation === "undefined"
    ) {
      console.error(
        "LLM JSON response did not match expected schema:",
        JSON.stringify(parsedLlmJson).substring(0, 500),
      );
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          errorDetails: `LLM JSON response did not match expected schema. Received: ${JSON.stringify(parsedLlmJson).substring(0, 500)}`,
          source: "error_llm_schema_mismatch",
          attempt: attemptNumber, // Add attempt number
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket.put(r2Key, JSON.stringify(logData)),
        );
      }
      return new Response(
        JSON.stringify({
          error: "AI service returned data in an unexpected format.",
        }),
        { status: 500 },
      );
    }

    if (!related) {
      const funnyResponses = [
        "My circuits are tingling to chat about the blog post, but your question seems to be exploring a different galaxy! How about we steer back to LLM data curation?",
        "Hold your horses, thinker! That question's a bit of a wild stallion, off the blog's trail. Let's wrangle it back to AI and data insights!",
        "I'm geared up to dissect the blog's content! Your query, though, appears to have wandered into a parallel universe. Shall we return to the fascinating realm of LLMs?",
        "Bleep, blorp! My prime directive is to assist with this blog post. That question is like asking a dictionary for dance moves! Got any queries about data curation strategies?",
        "While I admire your expansive curiosity, my expertise is finely tuned to the blog post's subject matter. Let's delve into those topics, shall we?",
      ];
      const corkyResponse =
        funnyResponses[Math.floor(Math.random() * funnyResponses.length)];

      console.log(
        `[DEBUG] Query determined as NOT RELATED by LLM. Relation: "${relation}". User question: "${currentUserQuestion}"`,
      );
      if (aiLogsBucket && r2Key) {
        const logData = {
          sessionId,
          readerId,
          blogSlug: slug,
          turnTimestampUTC: turnTimestamp,
          userQuestion: currentUserQuestion,
          aiRawRelation: relation,
          aiRelatedFlag: related,
          systemResponse: corkyResponse,
          source: "system_filter_off_topic",
          attempt: attemptNumber, 
          providerUsed: actualProviderUsed,
        };
        locals.runtime.ctx.waitUntil(
          aiLogsBucket
            .put(r2Key, JSON.stringify(logData), {
              httpMetadata: { contentType: "application/json" },
            })
            .then(() => console.log(`Logged OFF-TOPIC query to R2: ${r2Key}`))
            .catch((e) =>
              console.error(
                `Error logging OFF-TOPIC query to R2 for ${r2Key}:`,
                e,
              ),
            ),
        );
      }

      return new Response(
        JSON.stringify({
          answer: corkyResponse,
          source: "system_filter_off_topic",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // If related is true, proceed with llmAnswerFromSchema
    const finalAnswer =
      llmAnswerFromSchema ||
      "The AI indicated this query is related to the blog post but didn't provide a specific answer. You could try rephrasing your question for more details.";

    // Log successful LLM response to R2
    if (aiLogsBucket && r2Key) {
      const logData = {
        sessionId,
        readerId,
        blogSlug: slug,
        turnTimestampUTC: turnTimestamp,
        userQuestion: currentUserQuestion,
        aiRawRelation: relation,
        aiRelatedFlag: related,
        aiResponse: finalAnswer,
        source: attemptNumber === 1 ? "llm_primary" : "llm_fallback_single_post", // Differentiate source
        modelUsed: DEFAULT_MODEL, 
        attempt: attemptNumber,
        providerUsed: actualProviderUsed,
      };
      locals.runtime.ctx.waitUntil(
        aiLogsBucket
          .put(r2Key, JSON.stringify(logData), {
            httpMetadata: { contentType: "application/json" },
          })
          .then(() => console.log(`Logged LLM response to R2: ${r2Key}`))
          .catch((e) =>
            console.error(`Error logging LLM response to R2 for ${r2Key}:`, e),
          ),
      );
    }

    // Log successful LLM response to R2 (this part already exists)
    // ... existing R2 logging for LLM response ...

    // NEW: Log interaction to KV
    if (userInteractionsKV && readerId && slug && turnTimestamp && currentUserQuestion && finalAnswer) {
      const interactionDate = new Date(turnTimestamp).toISOString().split('T')[0]; // YYYY-MM-DD
      const kvKey = `${readerId}/${interactionDate}/${slug}`;

      const userMessageEntry = {
        role: 'user',
        content: currentUserQuestion, // This is the user's direct question for this turn
        timestamp: turnTimestamp, // Timestamp of the user's question
      };
      const aiMessageEntry = {
        role: 'ai',
        content: finalAnswer, // The AI's response for this turn
        timestamp: new Date().toISOString(), // Timestamp for when AI response is finalized
      };

      locals.runtime.ctx.waitUntil(
        (async () => {
          try {
            let currentData = await userInteractionsKV.get<any>(kvKey, { type: 'json' });
            if (!currentData) {
              currentData = { read: true, messages: [] }; // If asking, assume they've "read"
            } else if (typeof currentData.read === 'undefined' || !currentData.read) {
              currentData.read = true; // Ensure read is true if messages are being added
            }
            if (!currentData.messages) {
                currentData.messages = []; // Ensure messages array exists
            }
            currentData.messages.push(userMessageEntry);
            currentData.messages.push(aiMessageEntry);
            await userInteractionsKV.put(kvKey, JSON.stringify(currentData));
            console.log(`Interaction messages stored in KV: ${kvKey}`);
          } catch (e) {
            console.error(`KV store error for /api/ask messages (${kvKey}):`, e);
          }
        })()
      );
    }

    // Cache logic: Only cache if the question was cacheable AND related
    console.log(
      `[DEBUG] Conditions for cache write: isCacheableQuestion=${isCacheableQuestion}, related=${related}, aiCache=${!!aiCache}, answererResponse.ok=${answererResponse.ok}, finalAnswer exists=${!!finalAnswer}`,
    );
    if (
      isCacheableQuestion &&
      related &&
      aiCache &&
      answererResponse.ok &&
      finalAnswer
    ) {
      try {
        console.log(
          `[CACHE] Writing to cache for key: ${cacheKey} (LLM answer: "${finalAnswer.substring(0, 50)}...")`,
        );
        await aiCache.put(cacheKey, finalAnswer, {
          expirationTtl: CACHE_TTL_SECONDS,
        });
        console.log(`[CACHE] Successfully wrote to cache for key: ${cacheKey}`);
      } catch (kvError) {
        console.error(
          `[CACHE] KV Cache write error for key ${cacheKey}:`,
          kvError,
        );
      }
    } else if (answererResponse.ok && finalAnswer) {
      let skipReason = "[DEBUG] Cache write skipped: ";
      if (!isCacheableQuestion) {
        if (lastMessage && lastMessage.role === "user" && messages.length > 1) {
          skipReason += "Question was not the first message. ";
        } else {
          skipReason +=
            "Question was not eligible for caching (check earlier logs for specifics). ";
        }
      }
      if (isCacheableQuestion && !related) {
        // Check if it was cacheable but then deemed unrelated
        skipReason += "Query was not related to blog post. ";
      }
      if (!aiCache && isCacheableQuestion && related)
        // Only log if it would have been cached
        skipReason += "KV unavailable. ";
      if (!answererResponse.ok) skipReason += "LLM response not OK. ";
      if (!finalAnswer && related)
        skipReason += "No AI answer (but was related). "; // Should be covered by fallback
      console.log(skipReason.trim());
    }

    return new Response(
      JSON.stringify({ answer: finalAnswer, source: "llm" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: unknown) {
    console.error("Error in /api/ask endpoint:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    // Log general error to R2
    // Note: slug, sessionId, readerId, currentUserQuestion might be undefined if error happened before body parsing.
    // r2Key might also be empty.
    // aiLogsBucket is now guaranteed to be in scope (or undefined if not available in env)
    if (aiLogsBucket) {
      const logSlug = typeof slug === "string" ? slug : "unknown_slug_in_error";
      const logSessionId =
        typeof sessionId === "string" ? sessionId : "unknown_session_in_error";
      const logReaderId =
        typeof readerId === "string" ? readerId : "unknown_reader_in_error";
      const logUserQuestion =
        typeof currentUserQuestion === "string"
          ? currentUserQuestion
          : "unknown_question_in_error";

      // Use the initial turnTimestamp for consistency if available, otherwise a new one.
      // r2Key would be based on initial turnTimestamp if it was set.
      const finalR2Key =
        r2Key && slug && sessionId && turnTimestamp
          ? r2Key
          : getR2SessionLogKey(
              logSlug,
              logSessionId,
              turnTimestamp || new Date().toISOString(),
            );

      const logData = {
        sessionId: logSessionId,
        readerId: logReaderId,
        blogSlug: logSlug,
        turnTimestampUTC: turnTimestamp || new Date().toISOString(), // Use original turnTimestamp if available, else a new one
        userQuestion: logUserQuestion,
        errorDetails: `Outer API Error: ${errorMessage.substring(0, 1000)}`,
        source: "error_api_catch_all",
      };
      locals.runtime.ctx.waitUntil(
        aiLogsBucket.put(finalR2Key, JSON.stringify(logData)),
      );
    }
    return new Response(
      JSON.stringify({
        error: `An unexpected server error occurred: ${errorMessage}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
