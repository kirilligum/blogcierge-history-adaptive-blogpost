// src/pages/api/track-interaction.ts
import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";
import type { User } from '@/types/user'; // Assuming User type is available
import { kvKeys } from '@/utils/kvKeys'; // Assuming kvKeys is available

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  // Use the primary KV store defined in middleware, assuming it's for all app data including user profiles and device history.
  // If BLGC_USER_INTERACTIONS_KV was a *separate* store for anonymous data, that needs clarification.
  // For now, assume 'KV' from locals.runtime.env is the one to use for both.
  const KV = locals.runtime?.env?.KV as KVNamespace | undefined;

  if (!KV) {
    console.error("CRITICAL: KV Namespace is not configured.");
    return new Response(JSON.stringify({ error: "Server configuration error: Storage unavailable." }), { status: 500 });
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

      if (locals.user) {
        // User is logged in, update their profile
        const user = locals.user as User; // User from middleware is SafeUser, need full User for update

        locals.runtime.ctx.waitUntil(
          (async () => {
            try {
              const userKey = kvKeys.user(user.id);
              const userJson = await KV.get(userKey);
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
              await KV.put(userKey, JSON.stringify(userData));
              console.log(`User ${user.id} read history updated for slug ${slug}. New state: ${newReadValue}`);
            } catch (e) {
              console.error(`Error updating user read history for user ${user.id}, slug ${slug}:`, e);
            }
          })()
        );
      } else if (deviceId) {
        // Anonymous user, use deviceId (and date, for now, to maintain some compatibility if needed)
        // New Key Structure for device history: device_history:<deviceId>/<slug>
        // This simplifies from the previous date-based key for device history directly.
        // If date-specific tracking for devices is essential, the key could be device_history:<deviceId>/<date>/<slug>
        const deviceKvKey = `${kvKeys.deviceHistory(deviceId)}/${slug}`; // Simplified key

        locals.runtime.ctx.waitUntil(
          (async () => {
            try {
              // For device history, we'll store a simple boolean for read status directly under the slug key.
              // Or, to be consistent with how user history might be fetched (list of slugs),
              // we could store an object like { read: true/false }
              // Let's use a simple direct boolean for device specific slug for now.
              await KV.put(deviceKvKey, JSON.stringify({ read: newReadValue }));
              console.log(`Device ${deviceId} interaction for slug ${slug}: 'read' status set to ${newReadValue}.`);
            } catch (e) {
              console.error(`Error storing device read interaction to KV (${deviceKvKey}):`, e);
            }
          })()
        );
      } else {
        return new Response(JSON.stringify({ error: "User not logged in and no deviceId provided." }), { status: 400 });
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
