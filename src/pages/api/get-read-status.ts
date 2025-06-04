// src/pages/api/get-read-status.ts
import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";
import type { User } from '@/types/user';
import { kvKeys } from '@/utils/kvKeys';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const { AUTH_KV, BLGC_USER_INTERACTIONS_KV } = locals.runtime?.env || {};

  try {
    const body = await request.json();
    const { deviceId, slugs } = body;

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required parameter: slugs array." }), { status: 400 });
    }

    const readStatuses: Record<string, boolean> = {};

    if (locals.user && locals.user.id) { // User is logged in
      if (!AUTH_KV) {
        console.error("CRITICAL: AUTH_KV Namespace is not configured for get-read-status (logged-in user).");
        return new Response(JSON.stringify({ error: "Server configuration error: Auth storage unavailable." }), { status: 500 });
      }

      const userKey = kvKeys.user(locals.user.id);
      const userJson = await AUTH_KV.get(userKey);

      if (!userJson) {
        console.warn(`User data not found in AUTH_KV for user ${locals.user.id}. Proceeding as if no history.`);
        // If user data is missing, treat as no read history for this user.
        // Client might have deviceId to try anonymous lookup if this path is taken.
        // For now, just return all false for this user, or let it fall through to deviceId check if that's desired.
        // To ensure it doesn't fall through if user was identified, handle explicitly:
        slugs.forEach((slug: string) => {
            if (typeof slug === 'string') readStatuses[slug] = false;
        });
        // If deviceId is also part of the request, the client might expect a merge or device lookup.
        // However, current logic is: if logged in, use user data. If user data missing, it's an issue for that user.
        // Let's proceed to device check if user is logged in but their specific data is missing, AND deviceId is present
        if (!deviceId) { // Only return all false if no deviceId to fallback to
            return new Response(JSON.stringify(readStatuses), { status: 200 });
        }
        // If deviceId is present, let it be handled by the anonymous logic path below
        console.warn(`User ${locals.user.id} data not found, but deviceId ${deviceId} present. Attempting device history lookup.`);
      } else {
        const userData: User = JSON.parse(userJson);
        const userReadHistory = userData.readHistory || [];
        slugs.forEach((slug: string) => {
          if (typeof slug === 'string' && slug.trim() !== '') {
            readStatuses[slug] = userReadHistory.includes(slug);
          }
        });
        return new Response(JSON.stringify(readStatuses), { status: 200 });
      }
    }
    
    // Anonymous user or fallback for logged-in user whose specific data wasn't found but deviceId was provided
    if (!deviceId) {
      // If not logged in AND no deviceId, we can't provide status.
      // If was logged in but user data was missing AND no deviceId, this is the end of the line.
      slugs.forEach((slug: string) => {
        if (typeof slug === 'string') readStatuses[slug] = false;
      });
      // If no user session and no deviceId, it's a bad request from client.
      if (!locals.user) {
        return new Response(JSON.stringify({ error: "User not logged in and no deviceId provided." }), { status: 400 });
      }
      // If user was logged in but data was missing and no deviceId, return the all-false statuses.
      return new Response(JSON.stringify(readStatuses), { status: 200 });
    }

    // At this point, we must have a deviceId. Use BLGC_USER_INTERACTIONS_KV.
    if (!BLGC_USER_INTERACTIONS_KV) {
        console.error("CRITICAL: BLGC_USER_INTERACTIONS_KV Namespace is not configured for get-read-status (anonymous user).");
        return new Response(JSON.stringify({ error: "Server configuration error: Interaction storage unavailable." }), { status: 500 });
    }

    await Promise.all(slugs.map(async (slug: string) => {
      if (typeof slug !== 'string' || slug.trim() === '') {
        console.warn(`Invalid slug provided: '${slug}'`);
        readStatuses[slug] = false;
        return;
      }
      const deviceKvKey = `${kvKeys.deviceHistory(deviceId)}/${slug}`;
      try {
        const storedData = await BLGC_USER_INTERACTIONS_KV.get<{ read: boolean }>(deviceKvKey, { type: "json" });
        readStatuses[slug] = storedData?.read === true;
      } catch (e) {
        console.error(`Error fetching device read status from BLGC_USER_INTERACTIONS_KV for key ${deviceKvKey}:`, e);
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
