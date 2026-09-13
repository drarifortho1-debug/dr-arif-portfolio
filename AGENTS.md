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

- Public routes: `/`, `/about-us`, `/our-treatments`, `/our-treatments/[slug]`, `/our-videos`, `/our-blogs`, `/our-blogs/[id]`, legal pages
- Admin: `/admin-panel/*` (Firebase Auth gated, client-only) — sidebar groups: Content (Pages, Posts), Main (Header, Footer), Media (Library, Gallery, Videos)
- Public page files are thin server components: `getPage(slug)` → `SectionRenderer`
- Section components live in `src/components/{page}/` (e.g. `home/HeroBanner.tsx`) and take a `data` prop merged over `blockDefaults(type)`

## CMS (Firestore-driven sections)

- `src/lib/cms/types.ts` — `SectionInstance { id, type, enabled, data }`, `PageDoc`, header/footer settings, admin `Field` schema
- `src/lib/cms/blocks.ts` — the registry: every section `type` with its admin `fields` and `defaults` (defaults = today's hardcoded content, so an empty Firestore renders the site unchanged). Add a new block type here + a case in `SectionRenderer`
- `src/lib/cms/defaults.ts` — default section list per page, `PAGE_META`, default header/footer
- `src/lib/cms/server.ts` — server-only reads via `firebase-admin` (`getPage`, `getHeader`, `getFooter`, `getBlogs`, `getVideos`, `getGallery`, `loadSectionContext`); every read falls back to defaults on error
- `src/lib/cms/treatments.ts` — treatment pages model: `DEFAULT_TREATMENTS` (from `treatment-data.ts` + `treatments-nav.ts`), `mergeTreatments` (Firestore `treatments/{slug}` docs override defaults or add new pages), admin form schema. Table rows are stored as `{cells: []}` objects because Firestore forbids nested arrays
- Header "চিকিৎসা সেবা" dropdown is auto-built from enabled treatments (`autoChildren: true` on the nav item; `getHeader` fills children)
- `src/lib/cms/client.ts` — browser-side save/load for the admin, Firebase Storage upload, and `revalidate(paths)` which POSTs an ID token to `/api/revalidate`
- `src/components/sections/SectionRenderer.tsx` — `type` → component switch; `page-body` renders the page's built-in content passed via the `body` prop
- `src/components/sections/blocks/*` — the custom block palette (rich text, image+text, card grid, FAQ, CTA, gallery, video, counters, links)
- Firestore: `pages/{slug}`, `site/header`, `site/footer`, `treatments/{slug}`, `blogs` (has `slug` + `imageAlt`; URL is `/our-blogs/{slug}`, legacy IDs 308-redirect), `videos`, `gallery`, `media`. Rules in `firestore.rules` / `storage.rules` (public read, auth write)
- Public pages: `export const revalidate = 300` + on-demand `revalidatePath` after every admin save
- Shared primitives in `src/components/shared/UI.tsx`: `Badge`, `SectionHeading`, `SectionWrapper`, `PrimaryButton`, `OutlineButton`, `ArrowLink`, `StatsCard`, `SocialCircles`, `Icon*`
- Shared layout: `Navbar` + `Footer` in `src/components/shared/`
- All content is Bengali (`lang="bn"` on `<html>`)

## Conventions

- Section components are server components unless they need hooks (Swiper, menus). Data fetching happens in `page.tsx` via `src/lib/cms/server.ts`, never in the browser
- Admin components (`src/components/admin/*`) are all `"use client"`; FieldRenderer renders any `Field[]` schema, so admin forms are declared as data, not JSX
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
- Media uploads go through `/api/upload` (Firebase ID token required) which forwards to ImgBB using the server-side `IMGBB_API_KEY` env var — never put that key in client code. ImgBB has no delete API, so "delete" only removes the `media` Firestore record. Browser resizes images >1920px / >1.5MB to WebP before upload (Vercel's 4.5 MB request limit)
- Firebase Storage is NOT used (project is on Spark plan; no bucket exists)
- `next.config.ts` allowlists `firebasestorage.googleapis.com` and `*.firebasestorage.app` for `next/image`
- `next.config.ts` uses ES module syntax (`import type`)
- Build artifacts: `.next/`, `out/`, `build/` are gitignored
