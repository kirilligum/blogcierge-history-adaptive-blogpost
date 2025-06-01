import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const userInteractionsKV = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace | undefined;

  if (!userInteractionsKV) {
    console.error("CRITICAL: BLGC_USER_INTERACTIONS_KV is not configured.");
    return new Response(JSON.stringify({ error: "Server configuration error: Interaction storage unavailable." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  try {
    const body = await request.json();
    const { deviceId, date, slug, interactionType } = body;

    if (!deviceId || !date || !slug || !interactionType) {
      return new Response(JSON.stringify({ error: "Missing required parameters for interaction tracking." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return new Response(JSON.stringify({ error: "Invalid date format. Expected YYYY-MM-DD." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const kvKey = `${deviceId}/${date}/${slug}`;

    if (interactionType === 'read') {
      // Use waitUntil to ensure the KV operation completes
      locals.runtime.ctx.waitUntil(
        (async () => {
          try {
            let currentData = await userInteractionsKV.get<any>(kvKey, { type: "json" });
            if (!currentData) {
              currentData = { read: true, messages: [] };
            } else {
              currentData.read = true; // Mark as read or ensure it's true
              if (!currentData.messages) { // Ensure messages array exists if updating old data
                currentData.messages = [];
              }
            }
            await userInteractionsKV.put(kvKey, JSON.stringify(currentData));
            console.log(`Read interaction tracked successfully for KV key: ${kvKey}`);
          } catch (e) {
            console.error(`Error storing read interaction to KV (${kvKey}):`, e);
            // Note: The response to the client might have already been sent by this point
            // if the error occurs late in the async waitUntil block.
            // For critical KV errors, you might want to handle them before responding if possible,
            // but for background tasks, logging is often the primary recourse.
          }
        })()
      );
      return new Response(JSON.stringify({ message: "Read interaction tracking initiated." }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    // Add other interactionType handling here if needed in the future

    return new Response(JSON.stringify({ error: "Unknown interaction type." }), { status: 400, headers: { "Content-Type": "application/json" } });

  } catch (error: unknown) {
    console.error("Error processing /api/track-interaction request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    // Log the error to R2 or another logging service if available/configured
    return new Response(JSON.stringify({ error: `Failed to process interaction: ${errorMessage}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
