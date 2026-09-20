import { database } from "../configs/drizzle";
import { refreshTokens } from "../database/schema";
import { eq, and } from "drizzle-orm";

export const refreshTokensRepository = {
  async storeRefreshToken(jti: string, userId: string, expiresAt: Date) {
    return database.insert(refreshTokens).values({ jti, userId, expiresAt });
  },

  async findValidRefreshToken(jti: string) {
    const [row] = await database
      .select()
      .from(refreshTokens)
      .where(and(eq(refreshTokens.jti, jti), eq(refreshTokens.revoked, false)));
    return row;
  },

  async revokeRefreshToken(jti: string) {
    return database
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.jti, jti));
  },

  async revokeAllForUser(userId: string) {
    return database
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.userId, userId));
  },
};
