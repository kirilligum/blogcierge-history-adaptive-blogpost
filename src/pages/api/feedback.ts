export const prerender = false; // This ensures the file is treated as a dynamic serverless function

import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

// Helper function to generate R2 object key (copied and adapted from ask.ts)
// Ensure this matches the desired structure for your logs.
function getR2SessionLogKey(
  slug: string,
  sessionId: string,
  turnTimestamp: string, // This will be the feedbackTimestamp
): string {
  const date = new Date(turnTimestamp);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  // Using a slightly different path or filename pattern for feedback logs can be useful
  // For example, appending '_feedback' to the timestamp in the filename.
  // Or, as requested, keep it similar and rely on the 'source' field in the JSON.
  // Here, we'll use the exact same key structure as ask.ts, but the timestamp will be specific to the feedback event.
  return `ai-logs/${slug}/${formattedDate}/${sessionId}/${turnTimestamp}_feedback.json`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const aiLogsBucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET as R2Bucket | undefined;

  if (!aiLogsBucket) {
    console.error("CRITICAL: BLGC_AI_LOGS_BUCKET is not configured.");
    return new Response(
      JSON.stringify({ error: "Server configuration error: Log storage unavailable." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let slug: string | undefined;
  let readerId: string | undefined;
  let sessionId: string | undefined;
  let aiResponseContent: string | undefined;
  let userQuestionContext: string | undefined;
  let rating: "like" | "dislike" | undefined;
  let feedbackTimestamp: string | undefined; // Timestamp of the feedback event

  try {
    const body = await request.json();
    ({
      slug,
      readerId,
      sessionId,
      aiResponseContent,
      userQuestionContext,
      rating,
      feedbackTimestamp,
    } = body);

    // Basic validation
    if (
      !slug ||
      !readerId ||
      !sessionId ||
      typeof aiResponseContent === "undefined" ||
      typeof userQuestionContext === "undefined" ||
      !rating ||
      !feedbackTimestamp ||
      !["like", "dislike"].includes(rating)
    ) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid required parameters for feedback." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const r2Key = getR2SessionLogKey(slug, sessionId, feedbackTimestamp);

    const logData = {
      sessionId,
      readerId,
      blogSlug: slug,
      turnTimestampUTC: feedbackTimestamp, // Timestamp of the feedback action
      userQuestionContext,                 // The user question that prompted the AI response
      aiResponseRated: aiResponseContent,   // The AI response text that was rated
      rating,                               // "like" or "dislike"
      source: "feedback_rating",            // To distinguish this log type
    };

    // Asynchronously put the log data into R2
    // locals.runtime.ctx.waitUntil is important for Cloudflare Pages Functions
    // to ensure the operation completes even after the response is sent.
    locals.runtime.ctx.waitUntil(
      aiLogsBucket.put(r2Key, JSON.stringify(logData), {
        httpMetadata: { contentType: "application/json" },
      })
      .then(() => console.log(`Feedback log stored in R2: ${r2Key}`))
      .catch((e) => console.error(`Error storing feedback log ${r2Key} in R2:`, e))
    );

    return new Response(
      JSON.stringify({ message: "Feedback received successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );

  } catch (error: unknown) {
    console.error("Error processing /api/feedback request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred processing feedback.";
    
    // Attempt to log the error itself to R2 if possible, using a generic key or known data
    // This is a best-effort logging for the error in the feedback endpoint
    const errorLogTimestamp = new Date().toISOString();
    const errorR2Key = `ai-logs/feedback_errors/${errorLogTimestamp}.json`;
    const errorLogData = {
      errorDetails: `Feedback API Error: ${errorMessage.substring(0, 1000)}`,
      requestBodyAttempt: { slug, readerId, sessionId, rating, feedbackTimestamp }, // Log what we know
      source: "error_api_feedback_catch_all",
      timestamp: errorLogTimestamp,
    };
     locals.runtime.ctx.waitUntil(
        aiLogsBucket.put(errorR2Key, JSON.stringify(errorLogData), {
          httpMetadata: { contentType: "application/json" },
        })
     );

    return new Response(
      JSON.stringify({ error: `Failed to process feedback: ${errorMessage}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
