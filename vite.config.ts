import { config } from "@dotenvx/dotenvx";
import { defineConfig } from "vite";
import { resolve } from "path";

config({ path: ".env.vault", quiet: true });

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        login: resolve(import.meta.dirname, "login.html"),
        dashboard: resolve(import.meta.dirname, "dashboard.html"),
        admin: resolve(import.meta.dirname, "admin.html"),
        taskDetail: resolve(import.meta.dirname, "task-detail.html"),
      },
    },
  },
});
