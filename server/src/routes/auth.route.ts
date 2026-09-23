import express from "express";
import { authController } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/validate.middleware";

const router = express.Router();

router.post(
  "/auth/register",
  validate({ body: registerSchema }),
  authController.register,
);
router.post(
  "/auth/login",
  validate({ body: loginSchema }),
  authController.login,
);
router.post("/auth/refresh", authController.refresh);
router.post("/auth/logout", authController.logout);

export default router;
