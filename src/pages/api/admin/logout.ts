import type { APIRoute } from "astro";
import type { KVNamespace } from "@cloudflare/workers-types";

export const GET: APIRoute = async ({ locals, cookies, redirect, url }) => {
  const sessionCookie = cookies.get("admin_session");

  if (sessionCookie?.value) {
    const adminKV = locals.runtime?.env?.BLGC_ADMIN_KV as
      | KVNamespace
      | undefined;
    if (adminKV) {
      // Delete the session from KV to invalidate it
      await adminKV.delete(`session::${sessionCookie.value}`);
    }
  }

  // Delete the session cookies from the browser
  cookies.delete("admin_session", { path: "/" });
  cookies.delete("github_session", { path: "/" });

  const redirectTo = url.searchParams.get("redirect");

  // Basic security check: only allow relative paths starting with '/'
  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
    return redirect(redirectTo);
  }

  // Redirect to the login page by default
  return redirect("/blog/admin/login");
};
