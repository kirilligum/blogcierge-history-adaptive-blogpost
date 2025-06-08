import type { APIRoute } from "astro";

// Helper to get the SHA of an existing file
async function getFileSha(apiUrl: string, accessToken: string): Promise<string | null> {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
        "User-Agent": "BlogCierge-App",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
    return null;
  } catch (e) {
    console.error("Error getting file SHA:", e);
    return null;
  }
}

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const accessToken = cookies.get("github_session")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = locals.runtime.env;
  if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
  }

  const body = await request.json();
  const slug = body.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
  }

  const filePath = `src/data/qa/${slug}.json`;
  const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;

  const sha = await getFileSha(githubApiUrl, accessToken);
  if (!sha) {
    return new Response(JSON.stringify({ error: "File not found in repository, cannot delete." }), { status: 404 });
  }

  try {
    const deleteResponse = await fetch(githubApiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `token ${accessToken}`,
        "User-Agent": "BlogCierge-App",
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `feat(qa): Remove Q&A dataset for ${slug}`,
        sha: sha,
      }),
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      throw new Error(errorData.message || "Failed to delete file from GitHub.");
    }

    return new Response(JSON.stringify({ message: "File deleted successfully." }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error(`Error deleting file for slug ${slug}:`, errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};
