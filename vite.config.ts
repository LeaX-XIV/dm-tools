import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import viteFonts from "unplugin-fonts/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/dm-tools/",
  server: {
    host: true,
  },
  plugins: [
    vue(),
    vueDevTools(),
    viteFonts({
      fontsource: {
        families: [
          {
            name: "Roboto",
            weights: [100, 300, 400, 500, 700, 900],
            styles: ["normal", "italic"],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@decorators": fileURLToPath(new URL("./src/decorators", import.meta.url)),
      "@model": fileURLToPath(new URL("./src/model", import.meta.url)),
      "@state": fileURLToPath(new URL("./src/state", import.meta.url)),
    },
  },
});
