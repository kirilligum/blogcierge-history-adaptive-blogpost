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

  const indexKey = "qa-datasets/_index.json";
  const indexObject = await r2Bucket.get(indexKey);

  if (!indexObject) {
    // If index doesn't exist, nothing has been generated yet.
    return new Response(JSON.stringify({ status: "idle" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const indexData = await indexObject.json<Record<string, { status: string }>>();
    const postStatus = indexData[slug];

    if (postStatus) {
      return new Response(JSON.stringify({ status: postStatus.status }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // If slug is not in the index, it's idle.
      return new Response(JSON.stringify({ status: "idle" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("Failed to parse QA dataset index file for status check:", e);
    // If index is corrupt, we can't know the status.
    return new Response(JSON.stringify({ status: "unknown", error: "Failed to read status index" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
