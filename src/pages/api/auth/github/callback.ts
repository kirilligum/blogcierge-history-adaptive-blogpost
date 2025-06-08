import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, cookies, locals, redirect }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies.get("github_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response("Invalid state or code. Please try again.", { status: 400 });
  }

  // State is valid, now exchange the code for an access token
  const clientId = locals.runtime?.env?.GITHUB_CLIENT_ID;
  const clientSecret = locals.runtime?.env?.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("CRITICAL: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not configured.");
    const errorMessage = `
      <body style="font-family: sans-serif; padding: 2em;">
        <h1>Configuration Error</h1>
        <p>The <code>GITHUB_CLIENT_ID</code> or <code>GITHUB_CLIENT_SECRET</code> is missing from your environment configuration.</p>
        <p>Please ensure you have created a <code>.dev.vars</code> file and added your GitHub OAuth App credentials to it.</p>
        <p>Refer to the <code>README.md</code> for full setup instructions.</p>
      </body>
    `;
    return new Response(errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error || !tokenData.access_token) {
      console.error("GitHub OAuth token exchange failed:", tokenData);
      return new Response(`Error from GitHub: ${tokenData.error_description || "Failed to get access token."}`, { status: 500 });
    }

    const accessToken = tokenData.access_token;

    // Store the access token in a secure, httpOnly cookie
    cookies.set("github_session", accessToken, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Clean up the state cookie
    cookies.delete("github_oauth_state", { path: "/" });

    // Redirect user back to where they came from
    const fromUrl = cookies.get("github_oauth_from")?.value;
    cookies.delete("github_oauth_from", { path: "/" });

    return redirect(fromUrl || "/blog/admin/list");

  } catch (error) {
    console.error("Error during GitHub token exchange:", error);
    return new Response("An internal server error occurred.", { status: 500 });
  }
};
