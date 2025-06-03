// src/pages/api/auth/logout.ts
import type { APIRoute } from 'astro';
import { kvKeys } from '@/utils/kvKeys';

export const POST: APIRoute = async ({ cookies, locals }) => {
  const sessionId = cookies.get('session_id')?.value;

  if (!sessionId) {
    // No session to logout from, or cookie already cleared
    return new Response(JSON.stringify({ message: 'Not logged in or session expired.' }), { status: 200 });
  }

  const { KV } = locals.runtime.env;

  try {
    // 1. Remove the session from KV store
    await KV.delete(kvKeys.session(sessionId));

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
