import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const accessToken = cookies.get("github_session")?.value;

  if (!accessToken) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        "User-Agent": "BlogCierge-App",
      },
    });

    if (!userResponse.ok) {
      // This can happen if the token is expired or revoked
      console.warn("GitHub token is no longer valid. Status:", userResponse.status);
      // Clear the invalid cookie
      cookies.delete("github_session", { path: "/" });
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userData = await userResponse.json();
    const userInfo = {
      login: userData.login,
      avatar_url: userData.avatar_url,
      name: userData.name,
    };

    return new Response(
      JSON.stringify({ authenticated: true, user: userInfo }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching GitHub user status:", error);
    return new Response(
      JSON.stringify({
        authenticated: false,
        error: "Failed to communicate with GitHub.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
