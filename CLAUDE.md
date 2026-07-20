# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # start dev server
bun build        # production build
bun lint         # next lint
bun lint:fix     # eslint --fix
bun format       # prettier --write .
bun format:check # prettier --check .
bun type-check   # tsc --noEmit
```

No test runner is configured.

## Architecture

Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4. Package manager is **bun**.

### Tailwind v4 config split

Token configuration is split across two files:

- `tailwind.config.ts` — plugins only (`tailwindcss-animate`, `@tailwindcss/typography`). Content paths are explicit.
- `src/app/globals.css` — all design tokens. CSS custom properties are defined in `:root` / `.dark`, then mapped to Tailwind via `@theme inline`. Dark mode uses `@custom-variant dark (&:is(.dark *))` (class strategy). Do **not** put color/radius/shadow tokens in `tailwind.config.ts`.

### Theming

- Dark mode: `next-themes` with `attribute="class"`, `suppressHydrationWarning` on `<html>`.
- Fonts: Manrope (`--font-sans`), Bricolage Grotesque (`--font-heading`), JetBrains Mono (`--font-mono`) — loaded via `next/font/google`, injected as CSS vars on `<html>`, consumed by Tailwind via `@theme inline`.
- Dot-grid background is applied on `body` using `--dot-color` (light: `oklch(0.92 0 0)`, dark: `oklch(0.25 0 0)`).
- Print styles in `globals.css` force light-mode tokens, A4 portrait layout, and strip the dot grid.

### Key conventions

- `src/lib/constants.ts` — all app-wide magic strings and numbers live here.
- `src/lib/utils.ts` — exports `cn()` (clsx + tailwind-merge). Use for all className composition.
- `src/types/index.ts` — shared utility types: `Result<T, E>`, `WithRequired`, `WithOptional`, `PaginatedResponse`.
- `src/hooks/` — client-only hooks. Use `useMounted()` before reading any browser-only state (e.g. `next-themes` `theme`) to avoid hydration mismatches.
- `src/components/ui/` — shadcn/ui primitives. Add new primitives here; keep page-specific components outside `ui/`.
