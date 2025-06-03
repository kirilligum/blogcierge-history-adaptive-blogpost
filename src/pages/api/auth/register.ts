// src/pages/api/auth/register.ts
import type { APIRoute } from 'astro';
import type { User } from '@/types/user';
import { kvKeys } from '@/utils/kvKeys'; // Assuming kvKeys includes a general key or we add one
import { nanoid } from 'nanoid';
import * as scrypt from "scrypt-js";

// Helper function to convert ArrayBuffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper function to convert hex string to Uint8Array
function hexToBuffer(hexString: string): Uint8Array {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return bytes;
}

const ADMIN_CREATED_FLAG_KEY = "system_flags:admin_user_created";

export const POST: APIRoute = async ({ request, locals }) => {
  const { email, password } = await request.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email format.' }), { status: 400 });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long.' }), { status: 400 });
  }

  const { KV } = locals.runtime.env;

  const existingUserKey = kvKeys.userByEmail(email);
  const existingUserId = await KV.get(existingUserKey);

  if (existingUserId) {
    return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 409 });
  }

  const userId = nanoid();

  const N = 16384, r = 8, p = 1, dkLen = 32;
  const salt = crypto.getRandomValues(new Uint8Array(16));

  try {
    const passwordBuffer = new TextEncoder().encode(password);
    const derivedKey = await scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen);
    const passwordHashWithSalt = `${bufferToHex(salt)}:${bufferToHex(derivedKey)}`;

    let isAdminUser = false;
    const adminCreatedFlag = await KV.get(ADMIN_CREATED_FLAG_KEY);

    if (!adminCreatedFlag || adminCreatedFlag.toLowerCase() !== 'true') {
      isAdminUser = true;
    }

    const newUser: User = {
      id: userId,
      email,
      passwordHash: passwordHashWithSalt,
      isAdmin: isAdminUser, // Set admin status
      readHistory: [],
    };

    // Use a transaction or careful ordering if possible, though KV is not transactional in the traditional sense.
    // We'll put the user first, then the flag. If flag setting fails, the first user is still admin.
    // If user setting fails, flag isn't set, next user can become admin.
    await KV.put(kvKeys.user(userId), JSON.stringify(newUser));
    await KV.put(kvKeys.userByEmail(email), userId);

    if (isAdminUser) {
      // Set the flag only if this user was made admin and all previous KV puts succeeded
      await KV.put(ADMIN_CREATED_FLAG_KEY, "true");
      console.log(`User ${email} registered as the first admin user.`);
    }

    return new Response(JSON.stringify({ message: 'User registered successfully.', userId, isAdmin: isAdminUser }), { status: 201 });
  } catch (error) {
    console.error('Error during registration (admin check/scrypt):', error);
    // Potentially roll back KV puts if that's feasible, or log for manual check.
    // For now, just return a generic error.
    let errorMessage = 'Failed to register user.';
    if (error instanceof Error) { // Check if error is an instance of Error
        if (error.message.toLowerCase().includes('scrypt')) {
            errorMessage = 'Failed to register user due to a hashing process error.';
        } else {
            errorMessage = `Failed to register user: ${error.message}`;
        }
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
};
