// Gera o ícone do app (uma tecla do jogo com a letra A e um animal sentado em
// cima) a partir da arte do jogo: fontes do Capacitor em assets/ e ícones web
// em public/.
// Uso, na raiz do projeto:
//   node scripts/gen-app-icons.mjs && bunx capacitor-assets generate --android
//   node scripts/gen-app-icons.mjs --candidates   (só a folha de variações)
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

// Cores das fileiras do teclado (--row-* em src/index.css).
const RED = "#FF5C5C";
const ORANGE = "#FF9742";
const GREEN = "#2CC391";
const BLUE = "#5294FF";
const PURPLE = "#A49FFE";

const VARIANTS = {
  elephant: { animal: "elephant", background: BLUE, key: RED },
  parrot: { animal: "parrot", background: PURPLE, key: ORANGE },
  fox: { animal: "fox", background: GREEN, key: BLUE },
};
/** Variação aplicada ao app. */
const CHOSEN = "fox";

const ART = 1024;
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

function darken(hex, amount) {
  const channel = (i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - amount));
  return `rgb(${channel(1)},${channel(3)},${channel(5)})`;
}

/** Tecla com a borda 3D (como `.key-shadow` no jogo) e a letra A em traço arredondado. */
function keySvg(color) {
  const letter = "M417 830 L512 596 L607 830 M448 752 L576 752";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ART}" height="${ART}">` +
      `<rect x="202" y="536" width="620" height="366" rx="92" fill="${darken(color, 0.28)}"/>` +
      `<rect x="202" y="492" width="620" height="366" rx="92" fill="${color}"/>` +
      `<path d="${letter}" transform="translate(0 9)" fill="none" stroke="${darken(color, 0.28)}" stroke-width="62" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${letter}" fill="none" stroke="#ffffff" stroke-width="62" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</svg>`,
  );
}

/** Animal recortado, com contorno branco de figurinha, num quadro com folga `pad`. */
async function sticker(animal, height, pad) {
  const art = await sharp(`src/assets/animals/${animal}.png`)
    .trim()
    .resize({ height, width: 600, fit: "inside" })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: TRANSPARENT })
    .png()
    .toBuffer({ resolveWithObject: true });
  const { width, height: h } = art.info;
  // Contorno: a silhueta engordada (alfa borrado e limiarizado), pintada de branco.
  const fat = await sharp(art.data).extractChannel("alpha").blur(pad / 2.2).threshold(18).blur(1.2).toBuffer();
  const outline = await sharp({ create: { width, height: h, channels: 3, background: "#ffffff" } })
    .joinChannel(fat)
    .png()
    .toBuffer();
  return {
    data: await sharp(outline).composite([{ input: art.data }]).png().toBuffer(),
    width,
    height: h,
  };
}

/**
 * Tecla + animal num quadro transparente de 1024 px. Tudo cabe no círculo
 * inscrito no quadro, então nenhum recorte circular de launcher corta a arte.
 */
async function art({ animal, key }) {
  const pad = 16;
  const pet = await sticker(animal, 520, pad);
  return sharp({ create: { width: ART, height: ART, channels: 4, background: TRANSPARENT } })
    .composite([
      { input: keySvg(key) },
      // Sentado na borda de cima da tecla (os pés descem um pouco sobre ela).
      { input: pet.data, left: Math.round((ART - pet.width) / 2), top: 556 + pad - pet.height },
    ])
    .png()
    .toBuffer();
}

/** A arte, com `diameter` px, centrada num quadro transparente de `size` px. */
async function foreground(variant, size, diameter) {
  const scaled = await sharp(await art(variant)).resize(diameter, diameter).toBuffer();
  const offset = Math.round((size - diameter) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: TRANSPARENT } })
    .composite([{ input: scaled, left: offset, top: offset }])
    .png()
    .toBuffer();
}

const background = (variant, size) =>
  sharp({ create: { width: size, height: size, channels: 3, background: variant.background } }).png().toBuffer();

/** Ícone completo: fundo + arte. */
async function icon(variant, size, diameter) {
  return sharp(await background(variant, size))
    .composite([{ input: await foreground(variant, size, diameter) }])
    .png()
    .toBuffer();
}

/** .ico com um PNG embutido (formato aceito desde o Windows Vista). */
function ico(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

// O ícone adaptativo gerado pelo @capacitor/assets encaixa a imagem inteira
// nos 72dp visíveis (inset de 16,7%), então a zona segura de 66dp, que nenhum
// launcher corta, é um círculo de 66/72 do lado da imagem.
const SAFE = Math.floor((1024 * 66) / 72);
// icon-only também vira ícone redondo (Android antigo) e "maskable" no PWA
// (zona segura: círculo de 80%).
const FULL = 820;

/** Como o launcher recorta: círculo, quadrado arredondado e o ícone inteiro. */
async function preview(variant) {
  const layered = await sharp(await background(variant, 1024))
    .composite([{ input: await foreground(variant, 1024, SAFE) }])
    .png()
    .toBuffer();
  const adaptive = await sharp(layered).resize(400, 400).png().toBuffer();
  const masked = (rx) =>
    sharp(adaptive)
      .composite([
        {
          input: Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" rx="${rx}" fill="#fff"/></svg>`,
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
  const small = await sharp(await masked(200)).resize(96, 96).toBuffer();
  return sharp({ create: { width: 1480, height: 480, channels: 3, background: "#f2f2f2" } })
    .composite([
      { input: await masked(200), left: 40, top: 40 },
      { input: await masked(90), left: 470, top: 40 },
      { input: await sharp(await icon(variant, 1024, FULL)).resize(400, 400).toBuffer(), left: 900, top: 40 },
      { input: small, left: 1340, top: 192 },
    ])
    .png()
    .toBuffer();
}

mkdirSync("test-results", { recursive: true });

if (process.argv.includes("--candidates")) {
  const names = Object.keys(VARIANTS);
  const rows = await Promise.all(names.map((name) => preview(VARIANTS[name])));
  await sharp({ create: { width: 1480, height: 480 * rows.length, channels: 3, background: "#f2f2f2" } })
    .composite(rows.map((input, i) => ({ input, left: 0, top: 480 * i })))
    .png()
    .toFile("test-results/icone-candidatos.png");
  console.log(`candidatos (de cima para baixo): ${names.join(", ")}`);
} else {
  const variant = VARIANTS[CHOSEN];
  mkdirSync("assets", { recursive: true });

  // Capacitor (@capacitor/assets)
  const full = await icon(variant, 1024, FULL);
  await sharp(full).toFile("assets/icon-only.png");
  await sharp(await background(variant, 1024)).toFile("assets/icon-background.png");
  await sharp(await foreground(variant, 1024, SAFE)).toFile("assets/icon-foreground.png");
  const splash = await icon(variant, 2732, 1100);
  await sharp(splash).toFile("assets/splash.png");
  await sharp(splash).toFile("assets/splash-dark.png");

  // Web / PWA
  await sharp(full).resize(512, 512).png().toFile("public/pwa-512x512.png");
  await sharp(full).resize(192, 192).png().toFile("public/pwa-192x192.png");
  writeFileSync("public/favicon.ico", ico(await sharp(full).resize(48, 48).png().toBuffer(), 48));

  await sharp(await preview(variant)).toFile("test-results/icone-aplicado.png");
  console.log(`ícones gerados (${CHOSEN})`);
}
