# ABC dos Animais

Jogo educativo infantil de alfabeto com sons e animais. Cada letra exibe um animal com imagem, e ao tocar na tecla o app fala a letra e o nome do animal em voz alta.

**URL:** https://alphabet-critter-keys.ksepisteme.com.br/

## Funcionalidades

- **26 teclas coloridas** — uma por letra, organizadas em fileiras com cores distintas
- **Narração por voz** — usa a Web Speech API para pronunciar a letra e o animal ao toque
- **Sons de animais** — reproduz o som real do animal além da voz
- **Animais aleatórios** — botão "Trocar Animais" sorteia um novo animal para cada letra
- **Multilíngue** — 6 idiomas com vozes nativas: 🇧🇷 PT · 🇺🇸 EN · 🇪🇸 ES · 🇫🇷 FR · 🇮🇹 IT · 🇩🇪 DE
- **PWA** — instalável em dispositivos móveis e desktop, funciona offline
- **Tela de boas-vindas** — splash screen animada no primeiro acesso

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/) (deploy via Wrangler)
- [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

## Desenvolvimento

```bash
# Instalar dependências
bun install

# Servidor de desenvolvimento (porta 8080)
bun run dev

# Build de produção
bun run build

# Testes unitários
bun run test

# Deploy para Cloudflare Workers
bun run deploy
```

> Na primeira vez, autentique com `wrangler login` antes de rodar o deploy.

## Estrutura do projeto

```
src/
├── components/
│   ├── AlphabetKey.tsx       # Tecla individual (imagem + letra)
│   ├── LanguageSelector.tsx  # Seletor de idioma
│   ├── PwaInstallBanner.tsx  # Banner de instalação PWA
│   ├── SplashScreen.tsx      # Tela de boas-vindas
│   └── NavLink.tsx           # Link de navegação
├── data/
│   ├── animals.ts            # Dados em Português + tipos compartilhados
│   ├── animals_en.ts         # Inglês
│   ├── animals_es.ts         # Espanhol
│   ├── animals_fr.ts         # Francês
│   ├── animals_it.ts         # Italiano
│   ├── animals_de.ts         # Alemão
│   ├── animalImages.ts       # Mapeamento letra → imagem
│   └── animalSounds.ts       # Mapeamento animal → áudio
├── hooks/
│   ├── use-pwa-install.ts    # Lógica de instalação PWA
│   └── use-mobile.tsx        # Detecção de dispositivo móvel
└── pages/
    ├── Index.tsx             # Página principal
    └── NotFound.tsx          # Página 404
```

## Adicionar um novo idioma

1. Crie `src/data/animals_xx.ts` exportando `ANIMALS_XX_BY_LETTER` no mesmo formato de `animals.ts`
2. Adicione a chave ao tipo `Language` em `animals.ts`
3. Registre a configuração de fala e textos da UI em `LANG_CONFIG` em `Index.tsx`
4. Inclua o mapa no objeto `ANIMALS_MAP` em `Index.tsx`
