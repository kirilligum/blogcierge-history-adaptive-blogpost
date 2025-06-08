import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

// Helper to encode string to Base64, required by GitHub API
function toBase64(str: string): string {
  return btoa(str);
}

async function updateIndexForForget(r2Bucket: R2Bucket, slug: string) {
  const indexKey = "qa-datasets/_index.json";
  for (let i = 0; i < 5; i++) {
    const indexObj = await r2Bucket.get(indexKey);
    if (!indexObj) return;
    const etag = indexObj.etag;
    const indexData = await indexObj.json<Record<string, any>>();
    if (!indexData[slug]) return;
    delete indexData[slug];
    try {
      await r2Bucket.put(indexKey, JSON.stringify(indexData), {
        httpMetadata: { contentType: "application/json" },
        onlyIf: { etagMatches: etag },
      });
      return;
    } catch (e: any) {
      if (e.constructor.name === 'PreconditionFailedError' || (e.message && e.message.includes('status code 412'))) {
        await new Promise(res => setTimeout(res, Math.random() * 200 + 50));
      } else {
        throw e;
      }
    }
  }
}

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const accessToken = cookies.get("github_session")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized: No GitHub session found." }), { status: 401 });
  }

  const { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = locals.runtime.env;
  if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error("CRITICAL: GITHUB_REPO_OWNER or GITHUB_REPO_NAME is not configured.");
    return new Response(JSON.stringify({ error: "Server configuration error: Repository details (GITHUB_REPO_OWNER, GITHUB_REPO_NAME) are missing." }), { status: 500 });
  }

  const r2Bucket = locals.runtime.env.BLGC_AI_LOGS_BUCKET as R2Bucket | undefined;
  if (!r2Bucket) {
    return new Response(JSON.stringify({ error: "Server configuration error: R2 bucket not available." }), { status: 500 });
  }

  const body = await request.json();
  const slug = body.slug;
  if (typeof slug !== "string" || !slug) {
    return new Response(JSON.stringify({ error: "Slug is required." }), { status: 400 });
  }

  try {
    const qaKey = `qa-datasets/${slug}/latest.json`;
    const qaObject = await r2Bucket.get(qaKey);
    if (!qaObject) {
      return new Response(JSON.stringify({ error: `No Q&A data found in R2 for slug: ${slug}` }), { status: 404 });
    }
    const qaData = await qaObject.json();

    const fileContent = JSON.stringify(qaData, null, 2);
    const filePath = `src/data/qa/${slug}.json`;
    const commitMessage = `feat(qa): Add Q&A dataset for ${slug}`;
    const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;

    let existingFileSha: string | undefined;
    try {
      const getFileResponse = await fetch(githubApiUrl, {
        headers: { Authorization: `token ${accessToken}`, "User-Agent": "BlogCierge-App" },
      });
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        existingFileSha = fileData.sha;
      } else if (getFileResponse.status !== 404) {
        throw new Error(`GitHub API error checking file: ${getFileResponse.statusText}`);
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: "Could not verify file status on GitHub." }), { status: 500 });
    }

    const commitPayload: { message: string; content: string; sha?: string } = {
      message: commitMessage,
      content: toBase64(fileContent),
    };
    if (existingFileSha) {
      commitPayload.sha = existingFileSha;
    }

    const commitResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${accessToken}`,
        "User-Agent": "BlogCierge-App",
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify(commitPayload),
    });

    const commitData = await commitResponse.json();
    if (!commitResponse.ok) {
      throw new Error(commitData.message || "Failed to commit file.");
    }

    // Clean up R2 data after successful commit
    locals.runtime.ctx.waitUntil(updateIndexForForget(r2Bucket, slug));
    locals.runtime.ctx.waitUntil(r2Bucket.delete(qaKey));

    return new Response(JSON.stringify({ message: "Commit successful!", url: commitData.content.html_url }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to commit data: ${errorMessage}` }), { status: 500 });
  }
};
