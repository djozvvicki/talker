import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@services": resolve(__dirname, "./src/services"),
      "@store": resolve(__dirname, "./src/store"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@types": resolve(__dirname, "./src/types"),
      "@routes": resolve(__dirname, "./src/routes"),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Talker",
        short_name: "Talker",
        description:
          "Talker is chat and teams management app to easier communication with your friends or team colleagues",
        theme_color: "#121212",
        icons: [
          {
            src: "/talker.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/talker.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});
