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
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return new Response("Password is required.", { status: 400 });
  }

  // Hash the submitted password to compare with the stored hash
  const passwordBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const submittedHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const storedHash = await adminKV.get("admin_password_hash");

  if (submittedHash !== storedHash) {
    // Using a redirect with a query parameter for a better user experience
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/blog/admin/login?error=invalid_credentials",
      },
    });
  }

  // Password is correct, create a session
  const sessionId = crypto.randomUUID();
  const sessionKey = `session::${sessionId}`;
  const sessionTTL = 60 * 60 * 24; // 1 day in seconds

  await adminKV.put(sessionKey, JSON.stringify({ valid: true }), {
    expirationTtl: sessionTTL,
  });

  cookies.set("admin_session", sessionId, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "strict",
    maxAge: sessionTTL,
  });

  // Redirect to the admin dashboard
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/blog/admin",
    },
  });
};
