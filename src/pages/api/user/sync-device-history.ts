// src/pages/api/user/sync-device-history.ts
import type { APIRoute } from 'astro';
import type { User } from '@/types/user';
import { kvKeys } from '@/utils/kvKeys';

export const POST: APIRoute = async ({ request, locals }) => {
  const { user: currentUser, runtime } = locals;
  const { KV } = runtime.env;

  if (!currentUser || !currentUser.id) { // Ensure currentUser and its id are present
    return new Response(JSON.stringify({ error: 'Unauthorized. User not logged in.' }), { status: 401 });
  }

  try {
    const { slugs: deviceSlugs } = await request.json();

    if (!Array.isArray(deviceSlugs) || !deviceSlugs.every(s => typeof s === 'string')) {
      return new Response(JSON.stringify({ error: 'Invalid input. Expected an array of slugs.' }), { status: 400 });
    }

    if (deviceSlugs.length === 0) {
      return new Response(JSON.stringify({ message: 'No slugs provided to sync.' }), { status: 200 });
    }

    const userKey = kvKeys.user(currentUser.id);
    const userJson = await KV.get(userKey);

    if (!userJson) {
      console.error(`User data not found for logged-in user ${currentUser.id} during sync-device-history`);
      // This should ideally not happen if user is authenticated via middleware properly
      return new Response(JSON.stringify({ error: 'User data not found.' }), { status: 404 });
    }

    const userData: User = JSON.parse(userJson);
    // Ensure readHistory is initialized if it's somehow null/undefined, though type says it's string[]
    userData.readHistory = userData.readHistory || [];
    const userReadHistory = new Set(userData.readHistory);

    let newSlugsAdded = 0;
    for (const slug of deviceSlugs) {
      if (slug && typeof slug === 'string' && slug.trim() !== '' && !userReadHistory.has(slug)) {
        userReadHistory.add(slug);
        newSlugsAdded++;
      }
    }

    if (newSlugsAdded > 0) {
      userData.readHistory = Array.from(userReadHistory);
      await KV.put(userKey, JSON.stringify(userData));
      return new Response(JSON.stringify({ message: `Successfully synced ${newSlugsAdded} new read items.` }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Read history already up to date.' }), { status: 200 });
    }

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/user/sync-device-history:', err.message);
    if (err instanceof SyntaxError) { // JSON parsing error
        return new Response(JSON.stringify({ error: 'Invalid JSON payload.' }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: 'Failed to sync device history.' }), { status: 500 });
  }
};
