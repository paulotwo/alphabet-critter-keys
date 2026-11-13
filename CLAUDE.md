# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # install dependencies
bun run dev          # dev server at http://localhost:8080
bun run build        # production build → dist/
bun run preview      # preview production build locally
bun run test         # run unit tests (vitest)
bun run lint         # eslint
bun run deploy       # vite build + wrangler deploy (requires wrangler login first)
bun run build:native # vite build --mode native + cap sync android
bun run android:apk  # debug APK -> android/app/build/outputs/apk/debug/
bun run android:aab  # release AAB (needs signing config, not set up yet)
bun run android:open # open android/ in Android Studio
```

Run a single test file:
```bash
bunx vitest run src/test/example.test.ts
```

## Architecture

This is a single-page React app (no backend). All state lives in `src/pages/Index.tsx`.

### Data flow

Each letter maps to a list of `AnimalEntry[]` (`{ name, emoji, sound }`). On load and on shuffle, `getRandomAnimals()` picks one entry per letter, avoiding repeating the previous animal. The resulting `Record<string, AnimalEntry>` (`currentAnimals`) drives the whole UI.

Language switch replaces `currentAnimals` entirely from the corresponding `ANIMALS_*_BY_LETTER` map.

### Animal data (`src/data/`)

- `animals.ts` — Portuguese data, plus the shared types (`AnimalEntry`, `Language`), `LETTERS`, and `getRandomAnimals()`
- `animals_en/es/fr/it/de.ts` — one file per language, same structure
- `ANIMALS_MAP` in `Index.tsx` wires all six maps to their `Language` key
- **Emojis must be globally unique** across the entire alphabet — each emoji corresponds to exactly one image import in `animalImages.ts`

### Images (`src/data/animalImages.ts`)

PNG files live in `src/assets/animals/`. `animalImages.ts` imports each one and exports `EMOJI_TO_IMAGE: Record<string, string>` (emoji → imported asset URL). `AlphabetKey` resolves `EMOJI_TO_IMAGE[emoji]` and falls back to rendering the emoji text if the image is missing.

Adding an animal with a new emoji requires adding both the PNG to `src/assets/animals/` and the entry to `EMOJI_TO_IMAGE`.

### Audio (`src/data/animalSounds.ts`)

MP3 files live in `public/sounds/`. `ANIMAL_SOUND_FILES` maps Portuguese animal names → filename stem (e.g. `"Abelha" → "bee"`). `playAnimalSound()` is currently not called by any screen (only the TTS narration plays), so the native build leaves `public/sounds/` out of the app.

### TTS narration

`src/lib/speech.ts` owns all narration (`speak`, `stopSpeech`, `preloadVoices`, `unlockSpeech`). On the web it uses the Web Speech API: `SplashScreen` pre-loads the voice list on mount and fires a silent utterance on the start button click, because browsers block `speechSynthesis.speak()` outside a user gesture. In the native app it uses the system TTS (see below). Never call `window.speechSynthesis` directly from components: it does not exist in the Android WebView.

### Native app (Capacitor, Android)

`capacitor.config.ts` (appId `com.pjdev.alphabetcritterkeys`) wraps `dist/` with no `server.url`: the bundle ships inside the app and runs at `https://localhost`, offline. `android/` is committed; `android/local.properties` (SDK path) is not.

- `vite build --mode native` drops `VitePWA` (no service worker), strips the `analytics:start`/`analytics:end` block from `index.html` (no analytics in the app: Play Families Policy) and deletes the web-only files listed in `WEB_ONLY` in `vite.config.ts` (`og/`, `sounds/`, sitemap, robots). The web build keeps everything.
- `src/lib/platform.ts` exports `isNative` and `SITE_URL`. Use `isNative` for anything that differs in the app.
- Narration uses `@capacitor-community/text-to-speech` on native. It needs the `TTS_SERVICE` `<queries>` entry in `AndroidManifest.xml`.
- `Index.tsx` handles the Android back button (keyboard → splash → exit app), stops speech when the app goes to background, and shares `SITE_URL` through the native share sheet.
- The status bar stays visible over the game background: `SystemBars` in `capacitor.config.ts` + `viewport-fit=cover`, and the screens keep clear of the bars with `env(safe-area-inset-*)`. Portrait comes from `android:screenOrientation`; the fullscreen request and the PWA install banner are skipped on native.
- The Fredoka font is bundled (`@fontsource/fredoka`, imported in `main.tsx`) so it works offline; do not load fonts from a CDN.
- Icons/splash: `node scripts/gen-app-icons.mjs` builds the icon (a game key with the letter A and an animal on top, variant chosen by `CHOSEN`) into `assets/`, `public/pwa-*.png` and `favicon.ico`; then `bunx capacitor-assets generate --android` writes the Android resources. `--candidates` only renders the comparison sheet in `test-results/`. The launcher name is localized in `android/app/src/main/res/values-*/strings.xml`.
- After changing web code, run `bun run build:native` before building in Gradle.

### Theming

Row colors (`bg-game-red`, `bg-game-orange`, etc.) are Tailwind utilities backed by CSS variables (`--row-red`, etc.) defined in the global CSS. The six `ROW_COLORS` in `Index.tsx` are applied by row index.

## Deploy

Hosted at `https://alphabet-critter-keys.ksepisteme.com.br/` via Cloudflare Workers Static Assets. Configuration is in `wrangler.jsonc` — no worker entry point, just `assets.directory = "./dist"` with `not_found_handling = "single-page-application"` for React Router client-side routing.
