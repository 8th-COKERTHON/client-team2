import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    babel({
      presets: [reactCompilerPreset()],
    }),

    VitePWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: true,
      },

      includeAssets: ["icon-192.png", "icon-512.png"],

      manifest: {
        id: "/",
        name: "적재적소",
        short_name: "적재적소",
        description:
          "저장한 콘텐츠를 적절한 순간에 다시 꺼내 배움으로 연결하는 서비스",
        lang: "ko-KR",

        start_url: "/",
        scope: "/",
        display: "standalone",

        background_color: "#ffffff",
        theme_color: "#ffffff",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],

        // Android에서 다른 앱의 공유 대상에
        // 적재적소를 노출할 때 나중에 활성화
        // share_target: {
        //   action: "/links/new",
        //   method: "GET",
        //   params: {
        //     title: "title",
        //     text: "text",
        //     url: "url",
        //   },
        // },
      },

      workbox: {
        cleanupOutdatedCaches: true,
        importScripts: ["push-worker.js"],
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif,woff,woff2}"],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
});
