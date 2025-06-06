import { defineMiddleware } from "astro:middleware";

const ADMIN_ROOT = "/blog/admin";
const LOGIN_PAGE = "/blog/admin/login";
const SETUP_PAGE = "/blog/admin/setup";
const ADMIN_API_ROOT = "/api/admin/";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // If not an admin route or admin API route, skip middleware
  if (!pathname.startsWith(ADMIN_ROOT) && !pathname.startsWith(ADMIN_API_ROOT)) {
    return next();
  }

  // Allow access to logout API endpoint to clear cookies
  if (pathname === "/api/admin/logout") {
    return next();
  }

  const adminKV = context.locals.runtime?.env?.BLGC_ADMIN_KV;
  if (!adminKV) {
    console.error("BLGC_ADMIN_KV is not configured.");
    return new Response(
      "Server configuration error: Admin KV not available.",
      { status: 500 },
    );
  }

  // Check for an admin user object instead of just a password hash
  const adminUser = await adminKV.get("admin_user", "json");

  // Case 1: No admin user is set up yet.
  if (!adminUser) {
    // Allow access only to the setup page and its API endpoint
    if (pathname === SETUP_PAGE || pathname === "/api/admin/setup") {
      return next();
    }
    // For all other admin routes, redirect to setup
    return context.redirect(SETUP_PAGE);
  }

  // Case 2: Admin user exists. Check for session.
  const sessionCookie = context.cookies.get("admin_session");
  const sessionId = sessionCookie?.value;
  const session = sessionId ? await adminKV.get(`session::${sessionId}`, "json") : null;

  // If user has a valid session
  if (session) {
    // If they try to access login or setup, redirect them to the admin dashboard
    if (pathname === LOGIN_PAGE || pathname === SETUP_PAGE) {
      return context.redirect(ADMIN_ROOT);
    }
    // Otherwise, let them proceed
    return next();
  }

  // If user does NOT have a valid session
  // Allow access only to the login page and its API endpoint
  if (pathname === LOGIN_PAGE || pathname === "/api/admin/login") {
    return next();
  }

  // For all other admin routes, redirect to login
  return context.redirect(LOGIN_PAGE);
});
