import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env } from "../configs/env";

export function signAccessToken(payload: { userId: string; orgId: string; role: string }) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: { userId: string }) {
  const jti = randomUUID();
  const token = jwt.sign({ ...payload, jti }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { token, jti };
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { userId: string; orgId: string; role: string };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string; jti: string };
}
