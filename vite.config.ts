import { config } from "@dotenvx/dotenvx";
import { defineConfig } from "vite";
import { resolve } from "path";

config({ path: ".env.vault", quiet: true });

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
        admin: resolve(__dirname, "admin.html"),
        taskDetail: resolve(__dirname, "task-detail.html"),
      },
    },
  },
});
