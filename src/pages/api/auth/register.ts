// src/pages/api/auth/register.ts
import type { APIRoute } from 'astro';
import { User } from '../../../types/user';
import { kvKeys } from '../../../utils/kvKeys';
// A simple hashing function (replace with a proper library like bcrypt in production)
import { nanoid } from 'nanoid';

async function simpleHash(password: string): Promise<string> {
  // In a real application, use a strong hashing algorithm like bcrypt or Argon2
  // This is a placeholder and NOT secure for production.
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { email, password } = await request.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email format.' }), { status: 400 });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long.' }), { status: 400 });
  }

  const { KV } = locals.runtime.env;

  // Check if user already exists
  const existingUserKey = kvKeys.userByEmail(email);
  const existingUser = await KV.get(existingUserKey);

  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 409 });
  }

  const userId = nanoid();
  const passwordHash = await simpleHash(password);

  const newUser: User = {
    id: userId,
    email,
    passwordHash,
    isAdmin: false, // Default to not admin
    readHistory: [],
  };

  try {
    await KV.put(kvKeys.user(userId), JSON.stringify(newUser));
    await KV.put(kvKeys.userByEmail(email), userId); // Store a mapping from email to userId

    return new Response(JSON.stringify({ message: 'User registered successfully.', userId }), { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(JSON.stringify({ error: 'Failed to register user.' }), { status: 500 });
  }
};
