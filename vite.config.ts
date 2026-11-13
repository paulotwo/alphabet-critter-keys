import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Build do app (Capacitor): `vite build --mode native`. Sem service worker
// (o bundle já vai dentro do app) e sem analytics (Política de Famílias do Play).
const stripAnalytics = (): Plugin => ({
  name: "strip-analytics",
  transformIndexHtml: (html) =>
    html.replace(/[ \t]*<!-- analytics:start[\s\S]*?<!-- analytics:end -->\r?\n?/, ""),
});

// Só servem ao site e não entram no app: as prévias de Open Graph (public/og),
// o sitemap/robots e os MP3 de public/sounds, que nenhuma tela toca hoje.
// Se o app passar a tocar os sons dos animais, tire "sounds" desta lista.
const WEB_ONLY = ["og", "sounds", "sitemap.xml", "robots.txt", "placeholder.svg"];
const dropWebOnlyFiles = (): Plugin => ({
  name: "drop-web-only-files",
  closeBundle: () => {
    for (const entry of WEB_ONLY) fs.rmSync(path.resolve(__dirname, "dist", entry), { recursive: true, force: true });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const native = mode === "native";
  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    native && stripAnalytics(),
    native && dropWebOnlyFiles(),
    !native && VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}"],
        navigateFallbackDenylist: [/^\/~oauth/],
      },
      manifest: {
        name: "ABC dos Animais",
        short_name: "ABC Animais",
        description: "Jogo educativo interativo para crianças aprenderem o alfabeto com animais e sons em 6 idiomas.",
        lang: "pt-BR",
        theme_color: "#FF5252",
        background_color: "#FFF8F0",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        id: "/",
        categories: ["education", "kids"],
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
