// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { User, Session } from '../../../types/user';
import { kvKeys } from '../../../utils/kvKeys';
import { nanoid } from 'nanoid';

// Placeholder hashing function (ensure it's identical to the one in register.ts)
async function simpleHash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Session duration: 1 hour (in seconds)
const SESSION_DURATION = 60 * 60;

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }

  const { KV } = locals.runtime.env;

  try {
    // 1. Find user by email
    const userIdKey = kvKeys.userByEmail(email);
    const userId = await KV.get(userIdKey);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
    }

    // 2. Retrieve user data
    const userKey = kvKeys.user(userId);
    const userJSON = await KV.get(userKey);

    if (!userJSON) {
      // This case should ideally not happen if userByEmail mapping is consistent
      console.error(`User data not found for userId: ${userId} but email mapping exists.`);
      return new Response(JSON.stringify({ error: 'Login failed. User data inconsistent.' }), { status: 500 });
    }
    const user: User = JSON.parse(userJSON);

    // 3. Verify password
    const passwordHash = await simpleHash(password);
    if (passwordHash !== user.passwordHash) {
      return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
    }

    // 4. Generate session token
    const sessionId = nanoid(32); // Longer session ID
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

    const session: Session = {
      id: sessionId,
      userId: user.id,
      expiresAt,
    };

    // 5. Store session in KV
    // Store the main session object, expiring it automatically
    await KV.put(kvKeys.session(sessionId), JSON.stringify(session), { expirationTtl: SESSION_DURATION });

    // Optionally, store a reference to this session under the user's sessions list
    // This could be useful for "logout all devices" functionality, but adds complexity.
    // For now, we'll keep it simple. A more complex approach might involve a Set or List in KV.

    // 6. Return session ID to the client (e.g., in a cookie)
    cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD, // Only send over HTTPS in production
      maxAge: SESSION_DURATION,
      sameSite: 'lax',
    });

    return new Response(JSON.stringify({ message: 'Login successful.', userId: user.id, isAdmin: user.isAdmin }), { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred during login.' }), { status: 500 });
  }
};
