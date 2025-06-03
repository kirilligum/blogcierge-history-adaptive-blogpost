export interface User {
  id: string; // Unique user ID
  email: string; // Username
  passwordHash: string; // Hashed password
  isAdmin: boolean;
  readHistory: string[]; // Array of article IDs or similar - now non-optional
}

export interface Session {
  id: string; // Unique session ID
  userId: string;
  expiresAt: number; // Timestamp
}
