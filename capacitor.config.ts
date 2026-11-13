import type { CapacitorConfig } from "@capacitor/cli";

// Casca nativa: sem `server.url`. O WebView serve o bundle de `dist/`
// (gerado por `bun run build:native`) em https://localhost, então o jogo
// funciona offline desde a instalação.
const config: CapacitorConfig = {
  appId: "com.pjdev.alphabetcritterkeys",
  appName: "ABC dos Animais",
  webDir: "dist",
  android: {
    allowMixedContent: false,
  },
  plugins: {
    // Barra de status visível (relógio, rede) sobre o fundo do jogo. O conteúdo
    // vai de borda a borda (`viewport-fit=cover` no index.html) e se afasta das
    // barras com `env(safe-area-inset-*)`. Ícones escuros: o fundo é claro.
    SystemBars: {
      insetsHandling: "native",
      initialViewportFitValueHint: "cover",
      style: "LIGHT",
    },
  },
};

export default config;
