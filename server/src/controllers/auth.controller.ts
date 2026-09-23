import type { Request } from "express";
import { authService } from "../services/auth.service";
import { success } from "../utils/api-response";
import type { LoginBody, RegisterBody } from "../schemas/auth.schema";
import { Unauthorized } from "../lib/app-errors";
import { asyncHandler } from "../utils/async-handler";
import { setRefreshTokenCookie } from "../utils/cookies";

export const authController = {
  register: asyncHandler(
    async (req: Request<unknown, unknown, RegisterBody>, res) => {
      const { email, password, displayName, orgName } = req.body;
      const { accessToken, refreshToken } = await authService.register(
        email,
        password,
        displayName,
        orgName,
      );
      setRefreshTokenCookie(res, refreshToken);
      res.status(201).json(success({ accessToken }));
    },
  ),

  login: asyncHandler(
    async (req: Request<unknown, unknown, LoginBody>, res) => {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.login(
        email,
        password,
      );
      setRefreshTokenCookie(res, refreshToken);
      res.json(success({ accessToken }));
    },
  ),

  refresh: asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Unauthorized("No refresh token");
    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refresh(refreshToken);
    setRefreshTokenCookie(res, newRefreshToken);
    res.json(success({ accessToken }));
  }),

  logout: asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(204).send();
  }),
};
