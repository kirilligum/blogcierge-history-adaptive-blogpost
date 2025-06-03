// src/pages/api/get-read-status.ts
import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";
import type { User } from '@/types/user'; // Assuming User type is available
import { kvKeys } from '@/utils/kvKeys'; // Assuming kvKeys is available

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const KV = locals.runtime?.env?.KV as KVNamespace | undefined;

  if (!KV) {
    console.error("CRITICAL: KV Namespace is not configured for get-read-status.");
    return new Response(JSON.stringify({ error: "Server configuration error: Storage unavailable." }), { status: 500 });
  }

  try {
    const body = await request.json();
    // 'date' is no longer used for logged-in users, but might be sent by older clients for deviceId.
    // It's also not used in the new device history key structure.
    const { deviceId, slugs } = body;

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required parameter: slugs array." }), { status: 400 });
    }

    const readStatuses: Record<string, boolean> = {};

    if (locals.user && locals.user.id) { // Check for locals.user.id to ensure user object is populated
      // User is logged in. The subtask description mentions fetching the full user object.
      // This is safer to ensure fresh readHistory.
      // `UserForLocals` (previously `SafeUser`) is defined in `env.d.ts`. If it includes `readHistory`,
      // and the middleware populates it correctly, we could potentially use `locals.user.readHistory`.
      // However, the provided code block for `get-read-status.ts` fetches the user data again.

      const userKey = kvKeys.user(locals.user.id);
      const userJson = await KV.get(userKey);

      if (!userJson) {
        console.error(`User data not found for logged-in user ${locals.user.id} during get-read-status`);
        // Fallback to deviceId if available, or return all false
        if (!deviceId) {
           slugs.forEach((slug: string) => {
             if (typeof slug === 'string') readStatuses[slug] = false;
           });
           return new Response(JSON.stringify(readStatuses), { status: 200 });
        }
        // Proceed to device logic if user data is missing (should be rare)
      } else {
        const userData: User = JSON.parse(userJson);
        const userReadHistory = userData.readHistory || []; // Ensure readHistory exists
        slugs.forEach((slug: string) => {
          if (typeof slug === 'string' && slug.trim() !== '') {
            readStatuses[slug] = userReadHistory.includes(slug);
          }
        });
        return new Response(JSON.stringify(readStatuses), { status: 200 });
      }
    }
    
    // Anonymous user or fallback from missing user data with deviceId
    if (!deviceId) {
      // If not logged in (and not fallen through from failed user fetch), and no deviceId, cannot determine status
      slugs.forEach((slug: string) => {
        if (typeof slug === 'string') readStatuses[slug] = false;
      });
      // Return 400 if no user and no deviceId was ever provided.
      // If it was a fallback from a failed user fetch, deviceId might be undefined, so we'd return 200 with all false.
      // The original code returns 400 here.
      return new Response(JSON.stringify({ error: "User not logged in and no deviceId provided." }), { status: 400 });
    }

    // Anonymous user, use deviceId. New key structure: device_history:<deviceId>/<slug>
    // The 'date' parameter is ignored in this new structure.
    await Promise.all(slugs.map(async (slug: string) => {
      if (typeof slug !== 'string' || slug.trim() === '') {
        console.warn(`Invalid slug provided: '${slug}'`);
        readStatuses[slug] = false; // Default for invalid slug
        return;
      }
      const deviceKvKey = `${kvKeys.deviceHistory(deviceId)}/${slug}`;
      try {
        const storedData = await KV.get<{ read: boolean }>(deviceKvKey, { type: "json" });
        readStatuses[slug] = storedData?.read === true;
      } catch (e) {
        console.error(`Error fetching device read status from KV for key ${deviceKvKey}:`, e);
        readStatuses[slug] = false;
      }
    }));

    return new Response(JSON.stringify(readStatuses), { status: 200 });

  } catch (error: unknown) {
    console.error("Error processing /api/get-read-status request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to process request: ${errorMessage}` }), { status: 500 });
  }
};
