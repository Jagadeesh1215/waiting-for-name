# NextStarter

A clean, scalable, production-ready Next.js 15 starter with TypeScript, Tailwind CSS v4, dark mode, and a polished UI component library.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
nextjs-starter/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── about/page.tsx    # About page
│   │   │   └── dashboard/page.tsx # Dashboard
│   │   ├── api/
│   │   │   └── hello/route.ts    # Example API route
│   │   ├── globals.css           # Global styles + design tokens
│   │   ├── layout.tsx            # Root layout
│   │   ├── loading.tsx           # Loading UI
│   │   ├── error.tsx             # Error UI
│   │   └── not-found.tsx         # 404 page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── api.ts
│   └── lib/
│       ├── utils.ts
│       └── helpers.ts
├── public/
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
└── .prettierrc
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | App display name | `NextStarter` |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_DESCRIPTION` | App meta description | — |

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** — React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** — CSS-first utility framework
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Conditional class utilities

## Features

- ✅ Next.js 15 App Router
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4 (CSS-first, no config file)
- ✅ Dark mode (no flash of unstyled content)
- ✅ Responsive Navbar + Footer
- ✅ Reusable UI components (Button, Input, Card, Modal)
- ✅ Custom hooks (useLocalStorage, useDebounce, useMediaQuery)
- ✅ SEO metadata setup
- ✅ Example API route
- ✅ Loading + Error + 404 states
- ✅ ESLint + Prettier configured
- ✅ Absolute imports (`@/*`)
