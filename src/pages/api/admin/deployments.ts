import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_PROJECT_NAME,
    CLOUDFLARE_API_TOKEN,
  } = locals.runtime.env;

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_PROJECT_NAME || !CLOUDFLARE_API_TOKEN) {
    return new Response(JSON.stringify({ error: "Cloudflare API credentials are not configured on the server." }), { status: 500 });
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${CLOUDFLARE_PROJECT_NAME}/deployments`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudflare API error:", errorText);
      return new Response(JSON.stringify({ error: `Failed to fetch deployments: ${response.statusText}` }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data.result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Cloudflare deployments:", error);
    return new Response(JSON.stringify({ error: "An internal error occurred while fetching deployment status." }), { status: 500 });
  }
};
