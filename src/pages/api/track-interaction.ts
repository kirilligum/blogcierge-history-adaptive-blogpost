// src/pages/api/track-interaction.ts
import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";
import type { User } from '@/types/user'; // Assuming User type is available
import { kvKeys } from '@/utils/kvKeys'; // Assuming kvKeys is available

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const { AUTH_KV, BLGC_USER_INTERACTIONS_KV } = locals.runtime?.env || {};

  if (locals.user && !AUTH_KV) {
    console.error("CRITICAL: AUTH_KV Namespace is not configured for logged-in user interaction.");
    return new Response(JSON.stringify({ error: "Server configuration error: Auth storage unavailable." }), { status: 500 });
  }
  if (!locals.user && !BLGC_USER_INTERACTIONS_KV) {
    console.error("CRITICAL: BLGC_USER_INTERACTIONS_KV Namespace is not configured for anonymous user interaction.");
    return new Response(JSON.stringify({ error: "Server configuration error: Interaction storage unavailable." }), { status: 500 });
  }


  try {
    const body = await request.json();
    const { deviceId, slug, interactionType, readState, date } = body; // date might be kept for device history for now

    if (!slug || !interactionType) {
      return new Response(JSON.stringify({ error: "Missing required parameters: slug, interactionType." }), { status: 400 });
    }

    // Validate date format if provided for device history, but it's less critical for user history
    if (!locals.user && (!deviceId || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date))) {
        return new Response(JSON.stringify({ error: "Missing deviceId or date (YYYY-MM-DD) for anonymous user interaction." }), { status: 400 });
    }


    if (interactionType === 'read') {
      const newReadValue = typeof readState === 'boolean' ? readState : true;

      if (locals.user && AUTH_KV) { // User is logged in, use AUTH_KV
        const user = locals.user; // User from middleware is SafeUser (UserForLocals)

        locals.runtime.ctx.waitUntil(
          (async () => {
            try {
              const userKey = kvKeys.user(user.id);
              const userJson = await AUTH_KV.get(userKey);
              if (!userJson) {
                console.error(`User data not found for logged-in user ${user.id} during track-interaction`);
                return;
              }
              const userData: User = JSON.parse(userJson);

              userData.readHistory = userData.readHistory || [];
              const slugIndex = userData.readHistory.indexOf(slug);

              if (newReadValue) { // Mark as read
                if (slugIndex === -1) {
                  userData.readHistory.push(slug);
                }
              } else { // Mark as unread
                if (slugIndex !== -1) {
                  userData.readHistory.splice(slugIndex, 1);
                }
              }
              await AUTH_KV.put(userKey, JSON.stringify(userData));
              console.log(`User ${user.id} read history updated for slug ${slug} in AUTH_KV. New state: ${newReadValue}`);
            } catch (e) {
              console.error(`Error updating user read history for user ${user.id}, slug ${slug} in AUTH_KV:`, e);
            }
          })()
        );
      } else if (deviceId && BLGC_USER_INTERACTIONS_KV) { // Anonymous user, use BLGC_USER_INTERACTIONS_KV
        const deviceKvKey = `${kvKeys.deviceHistory(deviceId)}/${slug}`;

        locals.runtime.ctx.waitUntil(
          (async () => {
            try {
              await BLGC_USER_INTERACTIONS_KV.put(deviceKvKey, JSON.stringify({ read: newReadValue }));
              console.log(`Device ${deviceId} interaction for slug ${slug} in BLGC_USER_INTERACTIONS_KV: 'read' status set to ${newReadValue}.`);
            } catch (e) {
              console.error(`Error storing device read interaction to BLGC_USER_INTERACTIONS_KV (${deviceKvKey}):`, e);
            }
          })()
        );
      } else {
        // This case implies either:
        // 1. User is anonymous but no deviceId was provided (already handled by param check if date also missing).
        // 2. KV namespace was missing for the specific user type (logged-in vs anonymous), handled by initial checks.
        // If it reaches here with deviceId but no BLGC_USER_INTERACTIONS_KV, it means the KV wasn't bound.
        if (!deviceId) {
            return new Response(JSON.stringify({ error: "User not logged in and no deviceId provided." }), { status: 400 });
        }
        // If deviceId is present, then a KV namespace must have been missing, which is a server config error.
        // The initial checks for KV availability should ideally catch this.
        console.error("Interaction tracking failed: Could not determine appropriate KV store or necessary identifiers missing.");
        return new Response(JSON.stringify({ error: "Interaction tracking failed due to server or request misconfiguration." }), { status: 500 });
      }

      return new Response(JSON.stringify({ message: "Read interaction processed." }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: `Unknown interaction type: ${interactionType}` }), { status: 400 });

  } catch (error: unknown) {
    console.error("Error processing /api/track-interaction request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to process interaction: ${errorMessage}` }), { status: 500 });
  }
};
