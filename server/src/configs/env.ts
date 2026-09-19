import {config} from "@dotenvx/dotenvx"
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

config({ path: ".env.vault", quiet: true });

export const env = createEnv({
  server: {
    PORT: z.number(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.url().min(1),
    JWT_SECRET: z.string().min(1),
    BCRYPT_SALT_ROUNDS: z.number(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
