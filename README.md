# 🎵 ABC dos Animais

Jogo educativo infantil de alfabeto com sons e animais. Cada letra do alfabeto exibe um animal aleatório com emoji, e ao tocar na tecla o app fala a letra e o nome do animal em voz alta.

## Funcionalidades

- **26 teclas coloridas** — uma por letra do alfabeto, organizadas em fileiras com cores distintas
- **Narração por voz** — usa a Web Speech API para pronunciar a letra e o animal ao toque
- **Animais aleatórios** — botão "Trocar Animais" sorteia um novo animal para cada letra (sem repetir o anterior)
- **Multilíngue** — suporte a 6 idiomas com vozes nativas:
  - 🇧🇷 Português · 🇺🇸 English · 🇪🇸 Español · 🇫🇷 Français · 🇮🇹 Italiano · 🇩🇪 Deutsch
- **PWA** — instalável em dispositivos móveis e desktop, funciona offline

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) com [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (porta 8080)
npm run dev

# Testes unitários
npm test

# Build de produção
npm run build
```

## Estrutura do projeto

```
src/
├── components/
│   ├── AlphabetKey.tsx      # Tecla individual (emoji + letra)
│   └── LanguageSelector.tsx # Seletor de idioma
├── data/
│   ├── animals.ts           # Dados em Português + tipos compartilhados
│   ├── animals_en.ts        # Inglês
│   ├── animals_es.ts        # Espanhol
│   ├── animals_fr.ts        # Francês
│   ├── animals_it.ts        # Italiano
│   └── animals_de.ts        # Alemão
└── pages/
    └── Index.tsx            # Página principal
```

## Adicionar um novo idioma

1. Crie `src/data/animals_xx.ts` exportando `ANIMALS_XX_BY_LETTER` no mesmo formato de `animals.ts`
2. Adicione a chave ao tipo `Language` em `animals.ts`
3. Registre a configuração de fala e textos da UI em `LANG_CONFIG` em `Index.tsx`
4. Inclua o mapa no objeto `ANIMALS_MAP` em `Index.tsx`