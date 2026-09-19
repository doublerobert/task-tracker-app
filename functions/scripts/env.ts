import {config} from "@dotenvx/dotenvx"
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

config({ path: ".env.vault", quiet: true });

export const env = createEnv({
  server: {
    SEED_ADMIN_EMAIL: z.email(),
    SEED_ADMIN_PASSWORD: z.string().min(6),
    SEED_ADMIN_NAME: z.string().min(5),
  },
  runtimeEnv: process.env,
});
