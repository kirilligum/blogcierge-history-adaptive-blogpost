import type { APIRoute } from "astro";
import type { KVNamespace } from "@cloudflare/workers-types";

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const adminKV = locals.runtime?.env?.BLGC_ADMIN_KV as
    | KVNamespace
    | undefined;

  if (!adminKV) {
    return new Response("Server configuration error: Admin KV not available.", {
      status: 500,
    });
  }

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectUrl = formData.get("redirect");

  if (typeof email !== "string" || typeof password !== "string" || password.length === 0) {
    return new Response("Email and password are required.", { status: 400 });
  }

  // Fetch the stored admin user
  const storedUser = await adminKV.get<{ email: string; passwordHash: string }>("admin_user", "json");

  // Hash the submitted password to compare with the stored hash
  const passwordBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const submittedHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Check if user exists and if the password is correct
  if (!storedUser || storedUser.email.toLowerCase() !== email.toLowerCase() || submittedHash !== storedUser.passwordHash) {
    const failureRedirect = new URL("/blog/admin/login", request.url);
    failureRedirect.searchParams.set("error", "invalid_credentials");
    if (typeof redirectUrl === 'string' && redirectUrl.startsWith('/')) {
        failureRedirect.searchParams.set("redirect", redirectUrl);
    }
    return new Response(null, {
      status: 302,
      headers: { Location: failureRedirect.toString() },
    });
  }

  // Credentials are correct, create a session
  const sessionId = crypto.randomUUID();
  const sessionKey = `session::${sessionId}`;
  const sessionTTL = 60 * 60 * 24; // 1 day in seconds

  // Store email in session data
  await adminKV.put(sessionKey, JSON.stringify({ valid: true, email: storedUser.email }), {
    expirationTtl: sessionTTL,
  });

  cookies.set("admin_session", sessionId, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "strict",
    maxAge: sessionTTL,
  });

  // Redirect to the originally requested URL, or the admin dashboard as a fallback.
  let finalRedirect = "/blog/admin";
  if (typeof redirectUrl === 'string' && redirectUrl.startsWith('/') && !redirectUrl.startsWith('//')) {
    finalRedirect = redirectUrl;
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: finalRedirect,
    },
  });
};
