import type { APIRoute } from "astro";
import type { KVNamespace } from "@cloudflare/workers-types";

export const GET: APIRoute = async ({ locals, cookies, redirect }) => {
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

  // Delete the session cookie from the browser
  cookies.delete("admin_session", { path: "/" });

  // Redirect to the login page
  return redirect("/blog/admin/login");
};
