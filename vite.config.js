import path from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Walter Water",
        short_name: "Walter Water",
        description: "Find water and toilets near you !",
        start_url: "/",
        display: "standalone",
        background_color: "#164f91",
        theme_color: "#43aa8b",
        icons: [
          {
            src: "/pwa/walter-icon-16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any", // Used in browser tabs and bookmarks
          },
          {
            src: "/pwa/walter-icon-32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any", // Used in browser tabs and bookmarks
          },
          {
            src: "/pwa/walter-icon-120.png",
            sizes: "120x120",
            type: "image/png",
            purpose: "any maskable", // iPhone (Retina 2x)
          },
          {
            src: "/pwa/walter-icon-152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any maskable", // iPad (Retina)
          },
          {
            src: "/pwa/walter-icon-167.png",
            sizes: "167x167",
            type: "image/png",
            purpose: "any maskable", // iPad (Retina 2x)
          },
          {
            src: "/pwa/walter-icon-180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable", // iPhone (Retina 3x) and iPad
          },
          {
            src: "/pwa/walter-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable", // Android (Recommended for home screen icons)
          },
          {
            src: "/pwa/walter-icon-256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any", // Used in various contexts, including the Windows Start Menu
          },
          {
            src: "/pwa/walter-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable", // Android (Used for the Play Store)
          },
        ],
      },
      registerType: "autoUpdate",
      strategies: "generateSW", // or 'injectManifest'
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/, // Regex for URL pattern
            handler: "NetworkFirst", // Caching strategy
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50, // Maximum number of entries to cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache duration (30 days)
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
