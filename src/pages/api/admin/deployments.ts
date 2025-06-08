import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_PROJECT_NAME,
    CLOUDFLARE_API_TOKEN,
  } = locals.runtime.env;

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_PROJECT_NAME || !CLOUDFLARE_API_TOKEN) {
    const errorMessage = `
      <body style="font-family: sans-serif; padding: 2em;">
        <h1>Configuration Error</h1>
        <p>One or more Cloudflare API credentials are missing:</p>
        <ul>
          <li><code>CLOUDFLARE_ACCOUNT_ID</code></li>
          <li><code>CLOUDFLARE_PROJECT_NAME</code></li>
          <li><code>CLOUDFLARE_API_TOKEN</code></li>
        </ul>
        <p>Please ensure these are set in your <code>.dev.vars</code> file for local development.</p>
        <p>Refer to the <code>README.md</code> for instructions on how to create an API token and find your Account ID.</p>
      </body>
    `;
    return new Response(errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
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
