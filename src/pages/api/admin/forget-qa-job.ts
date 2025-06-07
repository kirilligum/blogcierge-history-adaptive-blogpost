import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

async function updateIndexForForget(r2Bucket: R2Bucket, slug: string) {
  const indexKey = "qa-datasets/_index.json";

  for (let i = 0; i < 5; i++) { // Retry loop
    const indexObj = await r2Bucket.get(indexKey);
    if (!indexObj) {
      // Index doesn't exist, nothing to do.
      console.log(`Index file not found. Nothing to forget for slug ${slug}.`);
      return;
    }

    const etag = indexObj.etag;
    const indexData = await indexObj.json<Record<string, any>>();

    if (!indexData[slug]) {
      console.log(`Slug ${slug} not found in index. Nothing to forget.`);
      return; // Slug not in index, we're done.
    }

    // Remove the slug from the index
    delete indexData[slug];

    try {
      await r2Bucket.put(indexKey, JSON.stringify(indexData), {
        httpMetadata: { contentType: "application/json" },
        onlyIf: { etagMatches: etag },
      });
      console.log(`Successfully removed ${slug} from index.`);
      return; // Success
    } catch (e: any) {
      if (e.constructor.name === 'PreconditionFailedError' || (e.message && e.message.includes('status code 412'))) {
        console.warn(`Etag mismatch on index update for forgetting ${slug}. Retrying...`);
        await new Promise(res => setTimeout(res, Math.random() * 200 + 50));
      } else {
        console.error(`Failed to update index for forgetting ${slug} with a non-retryable error:`, e);
        throw e;
      }
    }
  }
  throw new Error(`Failed to update index for forgetting ${slug} after multiple retries.`);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const r2Bucket = locals.runtime?.env?.BLGC_AI_LOGS_BUCKET as R2Bucket | undefined;
  if (!r2Bucket) {
    return new Response(JSON.stringify({ error: "Server configuration error: R2 not available." }), { status: 500 });
  }

  const body = await request.json();
  const slug = body.slug;

  if (typeof slug !== "string" || !slug) {
    return new Response(JSON.stringify({ error: "Slug is required." }), { status: 400 });
  }

  const lockKey = `qa-datasets/${slug}/_lock`;

  try {
    // 1. Delete the lock file. This is fire-and-forget.
    // We use `waitUntil` to ensure it happens even if we respond early.
    locals.runtime.ctx.waitUntil(
      r2Bucket.delete(lockKey).then(() => console.log(`Lock file for ${slug} deleted.`))
    );

    // 2. Update the index to remove the 'generating' status.
    await updateIndexForForget(r2Bucket, slug);

    return new Response(JSON.stringify({ message: `Job for ${slug} has been forgotten.` }), { status: 200 });

  } catch (error) {
    console.error(`Error forgetting job for slug ${slug}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to forget job: ${errorMessage}` }), { status: 500 });
  }
};
