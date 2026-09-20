import { config } from "@dotenvx/dotenvx";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.vault", quiet: true });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
