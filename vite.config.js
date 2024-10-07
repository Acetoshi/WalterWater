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
        background_color: "#ffffff",
        theme_color: "#00bfff",
        icons: [
          {
            src: "images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
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
});
