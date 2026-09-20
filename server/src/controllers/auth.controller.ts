import type { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { success } from "src/utils/api-response";

export const authController = {
  async register(req: Request, res: Response) {
    const { email, password, displayName, orgName } = req.body;

    const { accessToken, refreshToken } = await authService.register(
      email,
      password,
      displayName,
      orgName,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json(success({ accessToken }));
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authService.login(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json(success({ accessToken }));
  },

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refresh(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json(success({ accessToken }));
  },

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    res.clearCookie("refreshToken");
    res.status(204).send();
  },
};
