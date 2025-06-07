import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const r2Bucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET as R2Bucket | undefined;
  if (!r2Bucket) {
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug parameter is required" }), { status: 400 });
  }

  const successKey = `qa-datasets/${slug}/latest.json`;
  const errorKey = `qa-datasets/${slug}/error.json`;
  const lockKey = `qa-datasets/${slug}/_lock`;

  // Check for a final state first (success or error)
  const successObj = await r2Bucket.head(successKey);
  if (successObj) {
    return new Response(JSON.stringify({ status: "success" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorObj = await r2Bucket.head(errorKey);
  if (errorObj) {
    return new Response(JSON.stringify({ status: "error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // If no final state, check if it's still generating
  const lockObj = await r2Bucket.head(lockKey);
  if (lockObj) {
    return new Response(JSON.stringify({ status: "generating" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // If no files are found, it's idle
  return new Response(JSON.stringify({ status: "idle" }), {
    headers: { "Content-Type": "application/json" },
  });
};
