import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const phpOrigin = process.env.GNS_PHP_ORIGIN ?? "http://127.0.0.1";
const phpBasePath = process.env.GNS_PHP_BASE_PATH ?? "/gns-fibra";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: phpOrigin,
        changeOrigin: true,
        rewrite: (path) => `${phpBasePath}${path}`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
