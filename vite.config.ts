import { config } from "@dotenvx/dotenvx";
import { defineConfig, type Plugin } from "vite";
import { resolve } from "path";

config({ path: ".env.vault", quiet: true });

function flattenHtmlOutput(): Plugin {
  return {
    name: "flatten-html-output",
    generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.startsWith("pages/") && fileName.endsWith(".html")) {
          const asset = bundle[fileName];
          const newFileName = fileName.replace("pages/", "");
          asset.fileName = newFileName;
          delete bundle[fileName];
          bundle[newFileName] = asset;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [flattenHtmlOutput()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        login: resolve(import.meta.dirname, "pages/login.html"),
        dashboard: resolve(import.meta.dirname, "pages/dashboard.html"),
        admin: resolve(import.meta.dirname, "pages/admin.html"),
        taskDetail: resolve(import.meta.dirname, "pages/task-detail.html"),
      },
    },
  },
});
