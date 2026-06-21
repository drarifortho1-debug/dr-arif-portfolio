# Dr. Arif Ortho — Agent Guide

## Commands

```sh
pnpm dev        # dev server (localhost:3000)
pnpm build      # production build (includes type-check)
pnpm lint       # ESLint (Next.js core-web-vitals + TS configs)
```

No separate typecheck step — `pnpm build` covers it.

## Stack

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4
- pnpm (workspace config in `pnpm-workspace.yaml`)
- Font: Noto Sans Bengali via `next/font/google`, applied via CSS variable `--font-bangla` and `font-bangla` utility class
- `@tailwindcss/postcss` plugin (PostCSS, not classic Tailwind config)

## Architecture

- 6 routes: `/` *(home)*, `/about`, `/treatments`, `/chambers`, `/gallery`, `/blogs`
- Page files (`src/app/*/page.tsx`) are thin — only import section components, no JSX
- Section components live in `src/components/{page}/` (e.g. `home/HeroBanner.tsx`)
- Shared primitives in `src/components/shared/UI.tsx`: `Badge`, `SectionHeading`, `SectionWrapper`, `PrimaryButton`, `OutlineButton`, `ArrowLink`, `StatsCard`, `SocialCircles`, `Icon*`
- Shared layout: `Navbar` + `Footer` in `src/components/shared/`
- All content is Bengali (`lang="bn"` on `<html>`)

## Conventions

- Every section component uses `"use client"` (no server components)
- **No inline styles** (`style={{}}`) — use Tailwind v4 utilities only. For hover/transform transitions, use the `card-hover` CSS class from `globals.css`
- **No comments** in code
- One component file per page section
- SVGs are inline; `lucide-react` is installed but unused
- Reuse shared UI atoms (`Badge`, `SectionWrapper`, etc.) instead of duplicating patterns
- Custom animations: `animate-fade-up` (0.6s), `animate-fade-in` (0.3s), delay classes `delay-1` through `delay-4`
- `@theme inline` in `globals.css` for custom tokens; no `tailwind.config`
- ESLint flags `<a href="/">` — use `next/link` `Link` for internal routes
- Ignore `.next/`, `out/`, `build/` in lint config
- VSCode cSpell ignores Bengali Unicode (`\\u0980-\\u09FF`)

## Quirks

- Next.js config enables `reactCompiler: true` (React 19 compiler)
- No environment files tracked in git (`.env*` in `.gitignore`)
- `next.config.ts` uses ES module syntax (`import type`)
- Build artifacts: `.next/`, `out/`, `build/` are gitignored
