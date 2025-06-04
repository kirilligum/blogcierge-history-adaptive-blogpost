// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';
import type { User, Session } from '@/types/user'; // Updated path alias
import { kvKeys } from '@/utils/kvKeys'; // Updated path alias

export const onRequest = defineMiddleware(async (context, next) => {
  const { locals, cookies, request } = context;
  // Initialize user as null or undefined on locals
  locals.user = undefined;

  const sessionId = cookies.get('session_id')?.value;

  if (!sessionId) {
    return next(); // No session ID, proceed to next middleware or route
  }

  try {
    // Ensure runtime and env are defined before trying to access AUTH_KV
    if (!locals.runtime?.env?.AUTH_KV) {
      console.error("CRITICAL: AUTH_KV namespace is not available in middleware.");
      // Clear potentially problematic cookie and proceed without user context
      cookies.delete('session_id', { path: '/' });
      return next();
    }
    const { AUTH_KV } = locals.runtime.env;

    const sessionKey = kvKeys.session(sessionId);
    const sessionJSON = await AUTH_KV.get(sessionKey);

    if (!sessionJSON) {
      // Session not found in KV, maybe expired and auto-deleted, or invalid
      cookies.delete('session_id', { path: '/' }); // Clear invalid cookie
      return next();
    }

    const session: Session = JSON.parse(sessionJSON);

    // Check session expiration (KV TTL handles actual deletion, but good to double check)
    if (session.expiresAt < Math.floor(Date.now() / 1000)) {
      cookies.delete('session_id', { path: '/' }); // Clear expired cookie
      // Optionally delete from KV explicitly if not relying solely on TTL
      // await AUTH_KV.delete(sessionKey);
      return next();
    }

    // Session is valid, fetch user data
    const userKey = kvKeys.user(session.userId);
    const userJSON = await AUTH_KV.get(userKey);

    if (!userJSON) {
      // User associated with session not found. This is an inconsistent state.
      console.error(`User not found for session ${sessionId}, userId ${session.userId}`);
      cookies.delete('session_id', { path: '/' }); // Clear problematic session cookie
      // Optionally delete the session from KV as well, if user data is missing for a valid session
      // await AUTH_KV.delete(sessionKey);
      return next();
    }

    const user: User = JSON.parse(userJSON);

    // Attach user to locals for use in API routes and pages
    // Exclude passwordHash from being passed around in locals for security.
    const { passwordHash, ...userData } = user;
    locals.user = userData;

  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, clear potentially problematic cookie and proceed
    cookies.delete('session_id', { path: '/' });
  }

  return next();
});
