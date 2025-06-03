export const kvKeys = {
  user: (userId: string) => `user:${userId}`,
  userByEmail: (email: string) => `user_by_email:${email}`, // To quickly find a user by email
  session: (sessionId: string) => `session:${sessionId}`,
  userSessions: (userId: string) => `user_sessions:${userId}`, // To list all sessions for a user
  deviceHistory: (deviceId: string) => `device_history:${deviceId}`,
};
