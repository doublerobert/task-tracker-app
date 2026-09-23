import { usersRepository } from "../repositories/users.repository";
import { organizationsRepository } from "../repositories/organizations.repository";
import { refreshTokensRepository } from "../repositories/refresh-tokens.repository";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt";
import { Unauthorized } from "../lib/app-errors";
import { comparePassword, hashPassword } from "src/lib/passwords";

export const authService = {
  async register(
    email: string,
    password: string,
    displayName: string,
    orgName: string,
  ) {
    const passwordHash = await hashPassword(password);
    const org = await organizationsRepository.create(orgName);
    const user = await usersRepository.create({
      organizationId: org.id,
      email,
      password: passwordHash,
      displayName,
      role: "admin",
    });
    return authService.issueTokenPair(user.id, org.id, user.role);
  },

  async login(email: string, password: string) {
    const user = await usersRepository.findByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Unauthorized("Invalid credentials");
    }
    return authService.issueTokenPair(user.id, user.organizationId, user.role);
  },

  async issueTokenPair(userId: string, orgId: string, role: string) {
    const accessToken = signAccessToken({ userId, orgId, role });
    const { token: refreshToken, jti } = signRefreshToken({ userId });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshTokensRepository.storeRefreshToken(jti, userId, expiresAt);
    return { accessToken, refreshToken };
  },

  async refresh(oldRefreshToken: string) {
    const payload = verifyRefreshToken(oldRefreshToken);
    const stored = await refreshTokensRepository.findValidRefreshToken(
      payload.jti,
    );
    if (!stored) throw new Unauthorized("Refresh token revoked or not found");
    if (stored.expiresAt < new Date())
      throw new Unauthorized("Refresh token expired");

    await refreshTokensRepository.revokeRefreshToken(payload.jti);

    const user = await usersRepository.findById(payload.userId);
    if (!user) throw new Unauthorized("User not found");

    return authService.issueTokenPair(user.id, user.organizationId, user.role);
  },

  async logout(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    await refreshTokensRepository.revokeRefreshToken(payload.jti);
  },
};
