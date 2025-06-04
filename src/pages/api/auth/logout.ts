// src/pages/api/auth/logout.ts
import type { APIRoute } from 'astro';
import { kvKeys } from '@/utils/kvKeys';

export const POST: APIRoute = async ({ cookies, locals }) => {
  const sessionId = cookies.get('session_id')?.value;

  if (!sessionId) {
    // No session to logout from, or cookie already cleared
    return new Response(JSON.stringify({ message: 'Not logged in or session expired.' }), { status: 200 });
  }

  if (!locals.runtime?.env?.AUTH_KV) {
    console.error("CRITICAL: AUTH_KV namespace is not available in logout.ts.");
    // Still attempt to clear cookie, but log the server config issue.
    cookies.delete('session_id', { path: '/' });
    return new Response(JSON.stringify({ error: "Server configuration error." }), { status: 500 });
  }
  const { AUTH_KV } = locals.runtime.env;

  try {
    // 1. Remove the session from KV store
    await AUTH_KV.delete(kvKeys.session(sessionId));

    // 2. Instruct the client to delete the session cookie
    cookies.delete('session_id', {
      path: '/',
    });

    return new Response(JSON.stringify({ message: 'Logout successful.' }), { status: 200 });

  } catch (error) {
    console.error('Logout error:', error);
    // Even if KV delete fails, try to clear the cookie
    cookies.delete('session_id', {
      path: '/',
    });
    return new Response(JSON.stringify({ error: 'An error occurred during logout.' }), { status: 500 });
  }
};
