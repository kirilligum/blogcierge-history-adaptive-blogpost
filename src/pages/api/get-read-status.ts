import type { APIRoute } from 'astro';
import type { KVNamespace } from "@cloudflare/workers-types";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const userInteractionsKV = locals.runtime?.env?.BLGC_USER_INTERACTIONS_KV as KVNamespace | undefined;

  if (!userInteractionsKV) {
    console.error("CRITICAL: BLGC_USER_INTERACTIONS_KV is not configured for get-read-status.");
    return new Response(JSON.stringify({ error: "Server configuration error: Interaction storage unavailable." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  try {
    const body = await request.json();
    const { deviceId, date, slugs } = body;

    if (!deviceId || !date || !Array.isArray(slugs) || slugs.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required parameters: deviceId, date, and slugs array." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return new Response(JSON.stringify({ error: "Invalid date format. Expected YYYY-MM-DD." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const readStatuses: Record<string, boolean> = {};
    
    // Use Promise.all to fetch statuses concurrently
    await Promise.all(slugs.map(async (slug: string) => {
      if (typeof slug !== 'string' || slug.trim() === '') {
        console.warn(`Invalid slug provided in the list: '${slug}'`);
        return; // Skip invalid slugs
      }
      const kvKey = `${deviceId}/${date}/${slug}`;
      try {
        const currentData = await userInteractionsKV.get<any>(kvKey, { type: "json" });
        readStatuses[slug] = currentData?.read === true; // Default to false if not found or not explicitly true
      } catch (e) {
        console.error(`Error fetching read status from KV for key ${kvKey}:`, e);
        readStatuses[slug] = false; // Default to false on error
      }
    }));

    return new Response(JSON.stringify(readStatuses), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error: unknown) {
    console.error("Error processing /api/get-read-status request:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to process request: ${errorMessage}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
