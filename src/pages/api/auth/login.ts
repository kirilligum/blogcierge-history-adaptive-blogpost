// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { User, Session } from '@/types/user';
import { kvKeys } from '@/utils/kvKeys';
import { nanoid } from 'nanoid';
import * as scrypt from "scrypt-js"; // Import scrypt-js

// Helper function to convert hex string to Uint8Array (same as in register)
function hexToBuffer(hexString: string): Uint8Array {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return bytes;
}

// Helper function to convert ArrayBuffer to hex string (same as in register)
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const SESSION_DURATION = 60 * 60;

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }

  const { KV } = locals.runtime.env;

  try {
    const userIdKey = kvKeys.userByEmail(email);
    const userId = await KV.get(userIdKey);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
    }

    const userKey = kvKeys.user(userId);
    const userJSON = await KV.get(userKey);

    if (!userJSON) {
      console.error(`User data not found for userId: ${userId}`);
      return new Response(JSON.stringify({ error: 'Login failed. User data inconsistent.' }), { status: 500 });
    }
    const user: User = JSON.parse(userJSON);

    // Verify password using scrypt
    const [saltHex, storedKeyHex] = user.passwordHash.split(':');
    if (!saltHex || !storedKeyHex) {
        console.error('Invalid password hash format in DB for user:', user.id);
        return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 }); // Treat as invalid credentials
    }

    const salt = hexToBuffer(saltHex);
    // Scrypt parameters used during registration (must be the same)
    const N = 16384, r = 8, p = 1, dkLen = 32;
    const passwordBuffer = new TextEncoder().encode(password);

    const derivedKeyAttemptBuffer = await scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen);
    const derivedKeyAttemptHex = bufferToHex(derivedKeyAttemptBuffer);

    if (derivedKeyAttemptHex !== storedKeyHex) {
      return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
    }

    // Password is correct, proceed with session generation
    const sessionId = nanoid(32);
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

    const session: Session = {
      id: sessionId,
      userId: user.id,
      expiresAt,
    };

    await KV.put(kvKeys.session(sessionId), JSON.stringify(session), { expirationTtl: SESSION_DURATION });

    cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      maxAge: SESSION_DURATION,
      sameSite: 'lax',
    });

    // Return only necessary user info, not the full user object or password hash
    // The UserForLocals type (if defined in env.d.ts and used by middleware) should match this structure.
    return new Response(JSON.stringify({
        message: 'Login successful.',
        userId: user.id,
        isAdmin: user.isAdmin,
        // readHistory is part of User object, but not typically returned directly on login for brevity.
        // If needed, client can fetch it separately or it can be added to UserForLocals and included here.
    }), { status: 200 });

  } catch (error) {
    console.error('Login error with scrypt:', error);
    // It's good practice to check if the error is from scrypt itself or other parts
    let errorMessage = 'An error occurred during login.';
    if (error instanceof Error && error.message.toLowerCase().includes('scrypt')) {
        errorMessage = 'Login failed due to a key verification process error.';
    } else if (error instanceof Error) {
        errorMessage = `Login failed: ${error.message}`;
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};
