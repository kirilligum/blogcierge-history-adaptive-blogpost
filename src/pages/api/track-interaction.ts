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
    // Add readState to destructuring, it might be undefined
    const { deviceId, date, slug, interactionType, readState } = body; 

    if (!deviceId || !date || !slug || !interactionType) {
      // readState is optional, so not included in this primary check
      return new Response(JSON.stringify({ error: "Missing required parameters for interaction tracking (deviceId, date, slug, interactionType)." }), { status: 400, headers: { "Content-Type": "application/json" } });
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
            
            // Determine the new read status:
            // If readState (boolean) is explicitly passed, use it.
            // Otherwise, default to true (marking as read).
            const newReadValue = typeof readState === 'boolean' ? readState : true;

            if (!currentData) {
              currentData = { read: newReadValue, messages: [] };
            } else {
              currentData.read = newReadValue; 
              if (!currentData.messages) { 
                currentData.messages = [];
              }
            }
            await userInteractionsKV.put(kvKey, JSON.stringify(currentData));
            console.log(`Interaction for KV key ${kvKey}: 'read' status set to ${newReadValue}.`);
          } catch (e) {
            console.error(`Error storing read interaction to KV (${kvKey}):`, e);
            // Note: The response to the client might have already been sent by this point
            // if the error occurs late in the async waitUntil block.
            // For critical KV errors, you might want to handle them before responding if possible,
            // but for background tasks, logging is often the primary recourse.
          }
        })()
      );
      return new Response(JSON.stringify({ message: "Read interaction processed successfully." }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    // Add other interactionType handling here if needed in the future

    return new Response(JSON.stringify({ error: `Unknown interaction type: ${interactionType}` }), { status: 400, headers: { "Content-Type": "application/json" } });

  } catch (error: unknown) {
    console.error("Error processing /api/track-interaction request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    // Log the error to R2 or another logging service if available/configured
    return new Response(JSON.stringify({ error: `Failed to process interaction: ${errorMessage}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
