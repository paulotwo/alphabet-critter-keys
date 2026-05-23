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

MP3 files live in `public/sounds/`. `ANIMAL_SOUND_FILES` maps Portuguese animal names → filename stem (e.g. `"Abelha" → "bee"`). The sound is played by `AlphabetKey` (or `Index`) on key press, separate from the TTS narration.

### TTS narration

`speak()` in `Index.tsx` uses the Web Speech API. `SplashScreen` pre-loads the voice list on mount and fires a silent utterance on the start button click to warm up the TTS engine — this is required because browsers block `speechSynthesis.speak()` outside a user-gesture context.

### Theming

Row colors (`bg-game-red`, `bg-game-orange`, etc.) are Tailwind utilities backed by CSS variables (`--row-red`, etc.) defined in the global CSS. The six `ROW_COLORS` in `Index.tsx` are applied by row index.

## Deploy

Hosted at `https://alphabet-critter-keys.ksepisteme.com.br/` via Cloudflare Workers Static Assets. Configuration is in `wrangler.jsonc` — no worker entry point, just `assets.directory = "./dist"` with `not_found_handling = "single-page-application"` for React Router client-side routing.
