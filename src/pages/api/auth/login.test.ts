// src/pages/api/auth/login.test.ts
// Similar setup as register.test.ts with Vitest/Jest and mocks
// import * as scrypt from "scrypt-js"; // For generating test hashes if needed
// import { Buffer } from 'buffer'; // If using Buffer for hex/buffer conversion helpers in tests

// Helper function to convert ArrayBuffer to hex string (if not importing from module)
// function bufferToHex(buffer: ArrayBuffer): string {
//   return Array.from(new Uint8Array(buffer))
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');
// }


describe('POST /api/auth/login', () => {
  let mockKV: any;
  let mockLocals: any;
  let mockCookies: any;
  // let loginEndpoint;
  // const N = 16384, r = 8, p = 1, dkLen = 32; // scrypt params, must match those in login.ts
  // const kvKeys = { userByEmail: (email: string) => `user_by_email:${email}`, user: (id: string) => `user:${id}`, session: (id: string) => `session:${id}` };


  beforeEach(() => {
    // Reset mocks before each test
    // mockKV = { get: vi.fn(), put: vi.fn() };
    // mockLocals = { runtime: { env: { KV: mockKV } } };
    // mockCookies = { get: vi.fn(), set: vi.fn(), delete: vi.fn() };
    // loginEndpoint = require('./login').POST;
  });

  test('should login successfully with correct scrypt-hashed password and set session cookie', async () => {
    // Arrange
    // const testEmail = 'test@example.com';
    // const testPassword = 'password123';
    // const testUserId = 'userTestId';
    // const salt = crypto.getRandomValues(new Uint8Array(16));
    // const passwordBuffer = new TextEncoder().encode(testPassword);
    // const derivedKey = await scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen);
    // const scryptPasswordHash = `${bufferToHex(salt)}:${bufferToHex(derivedKey)}`;

    // mockKV.get.mockImplementation(async (key: string) => {
    //   if (key === kvKeys.userByEmail(testEmail)) return testUserId;
    //   if (key === kvKeys.user(testUserId)) return JSON.stringify({ id: testUserId, email: testEmail, passwordHash: scryptPasswordHash, isAdmin: false, readHistory: [] });
    //   return null;
    // });
    // mockKV.put.mockResolvedValue(undefined); // For session put
    // mockCookies.set = vi.fn();
    // const request = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: testEmail, password: testPassword }) });

    // Act
    // const response = await loginEndpoint({ request, locals: mockLocals, cookies: mockCookies });
    // const body = await response.json();

    // Assert
    // expect(response.status).toBe(200);
    // expect(body.message).toBe('Login successful.');
    // expect(body.userId).toBe(testUserId);
    // expect(body.isAdmin).toBe(false);
    // expect(mockKV.put).toHaveBeenCalledWith(expect.stringContaining(kvKeys.session('')), expect.any(String), { expirationTtl: 3600 });
    // expect(mockCookies.set).toHaveBeenCalledWith('session_id', expect.any(String), expect.objectContaining({ path: '/', httpOnly: true, maxAge: 3600, sameSite: 'lax' }));
  });

  test('should return 401 for incorrect password against scrypt hash', async () => {
    // Arrange
    // const testEmail = 'test@example.com';
    // const correctPassword = 'password123';
    // const wrongPassword = 'wrongpassword';
    // const testUserId = 'userTestId';
    // const salt = crypto.getRandomValues(new Uint8Array(16));
    // const passwordBuffer = new TextEncoder().encode(correctPassword);
    // const derivedKey = await scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen);
    // const scryptPasswordHash = `${bufferToHex(salt)}:${bufferToHex(derivedKey)}`;

    // mockKV.get.mockImplementation(async (key: string) => {
    //   if (key === kvKeys.userByEmail(testEmail)) return testUserId;
    //   if (key === kvKeys.user(testUserId)) return JSON.stringify({ id: testUserId, email: testEmail, passwordHash: scryptPasswordHash, isAdmin: false, readHistory: [] });
    //   return null;
    // });
    // const request = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: testEmail, password: wrongPassword }) });

    // Act
    // const response = await loginEndpoint({ request, locals: mockLocals, cookies: mockCookies });
    // const body = await response.json();

    // Assert
    // expect(response.status).toBe(401);
    // expect(body.error).toBe('Invalid credentials.');
  });

  test('should return 401 for non-existent email', async () => {
    // Arrange
    // mockKV.get.mockResolvedValue(null); // UserByEmail returns null
    // const request = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'nouser@example.com', password: 'password123' }) });

    // Act
    // const response = await loginEndpoint({ request, locals: mockLocals, cookies: mockCookies });
    // const body = await response.json();

    // Assert
    // expect(response.status).toBe(401);
    // expect(body.error).toBe('Invalid credentials.');
  });

  test('login response should only contain message, userId and isAdmin status', async () => {
    // Arrange (similar setup as successful login)
    // const testEmail = 'test@example.com';
    // const testPassword = 'password123';
    // const testUserId = 'userTestId';
    // const salt = crypto.getRandomValues(new Uint8Array(16));
    // const passwordBuffer = new TextEncoder().encode(testPassword);
    // const derivedKey = await scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen);
    // const scryptPasswordHash = `${bufferToHex(salt)}:${bufferToHex(derivedKey)}`;
    // mockKV.get.mockImplementation(async (key: string) => {
    //   if (key === kvKeys.userByEmail(testEmail)) return testUserId;
    //   if (key === kvKeys.user(testUserId)) return JSON.stringify({ id: testUserId, email: testEmail, passwordHash: scryptPasswordHash, isAdmin: true, readHistory: ['test'] });
    //   return null;
    // });
    // mockKV.put.mockResolvedValue(undefined);
    // mockCookies.set = vi.fn();
    // const request = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: testEmail, password: testPassword }) });

    // Act
    // const response = await loginEndpoint({ request, locals: mockLocals, cookies: mockCookies });
    // const body = await response.json();

    // Assert
    // expect(response.status).toBe(200);
    // expect(body).toEqual({ message: 'Login successful.', userId: testUserId, isAdmin: true });
    // expect(body.email).toBeUndefined();
    // expect(body.passwordHash).toBeUndefined();
    // expect(body.readHistory).toBeUndefined();
  });

  test('should return 401 if password hash in DB is in invalid format', async () => {
    // Arrange
    // const testEmail = 'test@example.com';
    // const testPassword = 'password123';
    // const testUserId = 'userTestId';
    // const invalidPasswordHash = "justsomerandomstringwithoutcolon"; // Invalid format
    // mockKV.get.mockImplementation(async (key: string) => {
    //   if (key === kvKeys.userByEmail(testEmail)) return testUserId;
    //   if (key === kvKeys.user(testUserId)) return JSON.stringify({ id: testUserId, email: testEmail, passwordHash: invalidPasswordHash, isAdmin: false, readHistory: [] });
    //   return null;
    // });
    // const request = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: testEmail, password: testPassword }) });

    // Act
    // const response = await loginEndpoint({ request, locals: mockLocals, cookies: mockCookies });
    // const body = await response.json();

    // Assert
    // expect(response.status).toBe(401);
    // expect(body.error).toBe('Invalid credentials.'); // As per current error handling in login.ts
  });

  // Add more tests: KV failures for get/put, missing user data after email lookup (500 error).
});
