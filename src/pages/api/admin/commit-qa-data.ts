import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

// Helper to encode string to Base64, required by GitHub API
function toBase64(str: string): string {
  // btoa is available in the Cloudflare Workers runtime
  return btoa(str);
}

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const accessToken = cookies.get("github_session")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized: No GitHub session found." }), { status: 401 });
  }

  const { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = locals.runtime.env;
  if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error("CRITICAL: GITHUB_REPO_OWNER or GITHUB_REPO_NAME is not configured.");
    return new Response(JSON.stringify({ error: "Server configuration error: Repository details missing." }), { status: 500 });
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
    // 1. Fetch the generated Q&A data from R2
    const qaKey = `qa-datasets/${slug}/latest.json`;
    const qaObject = await r2Bucket.get(qaKey);
    if (!qaObject) {
      return new Response(JSON.stringify({ error: `No Q&A data found in R2 for slug: ${slug}` }), { status: 404 });
    }
    const qaData = await qaObject.json();

    // 2. Prepare the content and path for GitHub
    const fileContent = JSON.stringify(qaData, null, 2);
    const filePath = `src/data/qa/${slug}.json`;
    const commitMessage = `feat(qa): Add Q&A dataset for ${slug}`;
    const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;

    // 3. Check if the file already exists to get its SHA for updates
    let existingFileSha: string | undefined;
    try {
      const getFileResponse = await fetch(githubApiUrl, {
        headers: {
          Authorization: `token ${accessToken}`,
          "User-Agent": "BlogCierge-App",
        },
      });
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        existingFileSha = fileData.sha;
        console.log(`File ${filePath} exists. Updating with SHA: ${existingFileSha}`);
      } else if (getFileResponse.status !== 404) {
        // Handle errors other than "not found"
        throw new Error(`GitHub API error checking file: ${getFileResponse.statusText}`);
      }
    } catch (e) {
      console.error("Error checking for existing file on GitHub:", e);
      return new Response(JSON.stringify({ error: "Could not verify file status on GitHub." }), { status: 500 });
    }

    // 4. Commit the file to GitHub (create or update)
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
        "Accept": "application/vnd.github.v3+json",
      },
      body: JSON.stringify(commitPayload),
    });

    const commitData = await commitResponse.json();

    if (!commitResponse.ok) {
      console.error("GitHub API commit failed:", commitData);
      return new Response(JSON.stringify({ error: `GitHub API Error: ${commitData.message || "Failed to commit file."}` }), { status: commitResponse.status });
    }

    console.log(`Successfully committed Q&A data for ${slug} to GitHub.`);
    return new Response(JSON.stringify({ message: "Commit successful!", url: commitData.content.html_url }), { status: 200 });

  } catch (error) {
    console.error(`Error committing data for slug ${slug}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: `Failed to commit data: ${errorMessage}` }), { status: 500 });
  }
};
