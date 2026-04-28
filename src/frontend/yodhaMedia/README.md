# yodhaMedia

Digital growth agency website built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4 (CSS-first config)
- Framer Motion (motion/react)
- Three.js + React Three Fiber
- React Query v5
- Radix UI + Shadcn/UI components

## Getting Started

```bash
cd src/frontend/yodhaMedia
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/           # Next.js App Router pages
    api/         # API route handlers
    admin/       # Admin dashboard
  components/    # React components
    3d/          # Three.js/R3F components
    admin/       # Admin UI components
    layout/      # Navbar, Footer, etc.
    ui/          # Shadcn/UI base components
  contexts/      # React contexts
  hooks/         # Custom React hooks
  lib/           # Utilities, animation variants
  services/      # API service functions
  types/         # TypeScript types
```

## Environment Variables

Copy `.env.example` to `.env.local`:
```
NEXT_PUBLIC_API_URL=/api
```

## Available Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm type-check` — Run TypeScript type checking
