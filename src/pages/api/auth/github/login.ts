import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, cookies, redirect, url }) => {
  const clientId = locals.runtime?.env?.GITHUB_CLIENT_ID;

  if (!clientId) {
    console.error("CRITICAL: GITHUB_CLIENT_ID is not configured.");
    const errorMessage = `
      <body style="font-family: sans-serif; padding: 2em;">
        <h1>Configuration Error</h1>
        <p>The <code>GITHUB_CLIENT_ID</code> is missing from your environment configuration.</p>
        <p>Please ensure you have created a <code>.dev.vars</code> file in the root of your project and added your GitHub OAuth App credentials to it, like this:</p>
        <pre style="background-color:#f0f0f0; padding: 1em; border-radius: 4px;"><code># .dev.vars
GITHUB_CLIENT_ID="iv1.xxxxxxxxxxxxxxxx"
# ... other secrets
        </code></pre>
        <p>Refer to the <code>README.md</code> for full setup instructions.</p>
      </body>
    `;
    return new Response(errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Generate a random state string for CSRF protection
  const state = crypto.randomUUID();

  // Store the state in a short-lived, secure cookie
  cookies.set("github_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  // Store the original URL the user was on, so we can redirect back after login
  const fromUrl = url.searchParams.get("from");
  if (fromUrl) {
    cookies.set("github_oauth_from", fromUrl, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });
  }

  // Construct the GitHub authorization URL
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", "repo"); // Request access to repositories
  authUrl.searchParams.set("state", state);

  // Redirect the user to GitHub
  return redirect(authUrl.toString());
};
