import type { APIRoute } from "astro";
import type { KVNamespace } from "@cloudflare/workers-types";

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, locals, cookies, redirect }) => {
  const adminKV = locals.runtime?.env?.BLGC_ADMIN_KV as
    | KVNamespace
    | undefined;

  if (!adminKV) {
    return new Response("Server configuration error: Admin KV not available.", {
      status: 500,
    });
  }

  // Check if an admin user already exists to prevent unauthorized overwrites
  const existingUser = await adminKV.get("admin_user", "json");
  if (existingUser) {
    return new Response("Forbidden: Admin account has already been set up.", {
      status: 403,
    });
  }

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return new Response("A valid email is required.", { status: 400 });
  }

  if (typeof password !== "string" || password.length < 8) {
    return new Response("Password must be a string of at least 8 characters.", {
      status: 400,
    });
  }

  // Hash the password using Web Crypto API (available in Workers)
  const passwordBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const passwordHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Store the new user object
  const adminUser = {
    email: email.toLowerCase(),
    passwordHash,
  };
  await adminKV.put("admin_user", JSON.stringify(adminUser));

  // Automatically log the user in by creating a session
  const sessionId = crypto.randomUUID();
  const sessionKey = `session::${sessionId}`;
  const sessionTTL = 60 * 60 * 24; // 1 day in seconds

  // Store email in session data for potential UI use
  await adminKV.put(sessionKey, JSON.stringify({ valid: true, email: adminUser.email }), {
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
  return redirect("/blog/admin");
};
