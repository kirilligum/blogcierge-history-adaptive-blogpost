// src/pages/api/auth/register.integration.test.ts
import { POST as registerUserHandler } from './register'; // Import the actual handler
import type { APIContext } from 'astro';
import { nanoid } from 'nanoid'; // Actual nanoid for realistic ID generation

// Simple In-Memory KV Mock
class InMemoryKV {
  private store: Map<string, any>;
  constructor() {
    this.store = new Map();
    // console.log("InMemoryKV initialized");
  }
  async get(key: string): Promise<string | null> {
    // console.log(`KV GET: ${key}`, this.store.get(key));
    return this.store.has(key) ? this.store.get(key) : null;
  }
  async put(key: string, value: string): Promise<void> {
    // console.log(`KV PUT: ${key}`, value);
    this.store.set(key, value);
  }
  // Add delete and list if needed for other tests
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
  clear(): void { // Helper for tests
    this.store.clear();
    // console.log("InMemoryKV cleared");
  }
  dump(): Map<string, any> { // Helper for debugging tests
    return new Map(this.store);
  }
}

// Mock for Astro's APIContext.locals.runtime.env (and other parts of context as needed)
const createMockAPIContext = (kvStore: InMemoryKV, requestBody: any): Partial<APIContext> => {
  const request = new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  return {
    request,
    locals: {
      // @ts-ignore - We are mocking a subset of the runtime
      runtime: {
        env: {
          AUTH_KV: kvStore, // Changed from KV to AUTH_KV
          // BLGC_USER_INTERACTIONS_KV could be mocked here if the test involved it
        },
        // @ts-ignore
        ctx: { // Add ctx mock for waitUntil if any tested paths use it (register doesn't currently)
            waitUntil: globalThis.vi ? globalThis.vi.fn(promise => promise) : (promise => promise),
        }
      },
    },
    cookies: {
        // @ts-ignore
        get: globalThis.vi ? globalThis.vi.fn() : () => {},
        // @ts-ignore
        set: globalThis.vi ? globalThis.vi.fn() : () => {},
        // @ts-ignore
        delete: globalThis.vi ? globalThis.vi.fn() : () => {},
        // @ts-ignore
        has: globalThis.vi ? globalThis.vi.fn() : () => {},
        // @ts-ignore
        serialize: globalThis.vi ? globalThis.vi.fn() : () => {},
    }
  };
};

// Use vi from Vitest (or jest) for mocking if available, otherwise simple stubs
// Ensure a global 'vi' or Jest equivalent for mocking is available when running tests.
// If not, replace vi.fn() with simple stub functions.
const vi = globalThis.vi || { fn: () => ((..._args: any[]) => { /* console.log('Mocked function called with:', _args); */ }) };

// A basic expect-like function for environments without a test runner's global expect
// This is very rudimentary and only for demonstration if no test runner is present.
// In a real test environment (Vitest, Jest), `expect` is provided globally.
const expect = globalThis.expect || ((actual: any) => ({
    toBe: (expected: any) => { if (actual !== expected) throw new Error(`Expected ${actual} to be ${expected}`); },
    toBeTypeOf: (expectedType: string) => { if (typeof actual !== expectedType) throw new Error(`Expected ${actual} to be of type ${expectedType}`); },
    not: { toBeNull: () => { if (actual === null) throw new Error(`Expected ${actual} not to be null`); } },
    toMatch: (regex: RegExp) => { if (!regex.test(String(actual))) throw new Error(`Expected ${actual} to match ${regex}`); },
    // Add more assertions as needed for tests
}));


describe('POST /api/auth/register Integration Test', () => {
  let kvStore: InMemoryKV;

  beforeEach(() => {
    kvStore = new InMemoryKV();
    if (globalThis.vi && globalThis.vi.resetAllMocks) { // Vitest/Jest full mocking system
        globalThis.vi.resetAllMocks();
    }
  });

  test('should register a new user successfully and make them an admin (first user)', async () => {
    const mockContext = createMockAPIContext(kvStore, {
      email: 'admin@example.com',
      password: 'password123',
    }) as APIContext;

    const response = await registerUserHandler(mockContext);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.message).toBe('User registered successfully.');
    expect(body.userId).toBeTypeOf('string');
    expect(body.isAdmin).toBe(true);

    const adminFlag = await kvStore.get("system_flags:admin_user_created");
    expect(adminFlag).toBe("true");

    const userIdFromEmail = await kvStore.get(`user_by_email:admin@example.com`);
    expect(userIdFromEmail).toBe(body.userId);

    const userKey = `user:${body.userId}`;
    const storedUserJSON = await kvStore.get(userKey);
    expect(storedUserJSON).not.toBeNull();
    const storedUser = JSON.parse(storedUserJSON!);
    expect(storedUser.email).toBe('admin@example.com');
    expect(storedUser.isAdmin).toBe(true);
    expect(storedUser.passwordHash).toMatch(/^[0-9a-f]{32}:[0-9a-f]{64}$/); // scrypt hash format
  });

  test('should register a subsequent user as non-admin', async () => {
    // First, make an admin user
    await kvStore.put("system_flags:admin_user_created", "true");
    // Optionally, create a dummy admin user to ensure the flag isn't the only thing checked
    // const adminId = nanoid();
    // await kvStore.put(`user_by_email:admin@example.com`, adminId);
    // await kvStore.put(`user:${adminId}`, JSON.stringify({ id: adminId, email: 'admin@example.com', passwordHash: 'dummyhash', isAdmin: true, readHistory: [] }));


    const mockContext = createMockAPIContext(kvStore, {
      email: 'user@example.com',
      password: 'password456',
    }) as APIContext;

    const response = await registerUserHandler(mockContext);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.isAdmin).toBe(false);

    const storedUserJSON = await kvStore.get(`user:${body.userId}`);
    const storedUser = JSON.parse(storedUserJSON!);
    expect(storedUser.isAdmin).toBe(false);
  });

  test('should return 409 if user already exists', async () => {
    const existingUserId = nanoid();
    await kvStore.put(`user_by_email:existing@example.com`, existingUserId);
    // No need to put full user object for this specific test of userByEmail check

    const mockContext = createMockAPIContext(kvStore, {
      email: 'existing@example.com',
      password: 'password123',
    }) as APIContext;

    const response = await registerUserHandler(mockContext);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error).toBe('User already exists.');
  });

  test('should return 400 for invalid email format', async () => {
    const mockContext = createMockAPIContext(kvStore, {
      email: 'invalidemail',
      password: 'password123',
    }) as APIContext;

    const response = await registerUserHandler(mockContext);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Invalid email format.');
  });

  test('should return 400 for password less than 8 characters', async () => {
    const mockContext = createMockAPIContext(kvStore, {
      email: 'test@example.com',
      password: 'short',
    }) as APIContext;

    const response = await registerUserHandler(mockContext);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Password must be at least 8 characters long.');
  });
});

// To run this test (example with Vitest):
// 1. Ensure Vitest is installed: `npm install -D vitest` or `yarn add -D vitest globalthis`
// 2. Add a script to package.json: `"test": "vitest"` or `"test": "vitest --globals"`
// 3. Run `yarn test src/pages/api/auth/register.integration.test.ts`
// Note: This version includes a basic `expect` polyfill for demonstration.
// For full Vitest/Jest functionality, ensure your test runner provides these globals or import them.
// e.g. import { expect, describe, test, beforeEach, vi } from 'vitest'; (if using Vitest with imports)
// Or use --globals flag with Vitest.
// The @ts-ignore comments for cookies can be removed if using a full typed mock for APIContext.
