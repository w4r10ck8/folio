# Muggleborn Dev Design System

> Developer portfolio and solo studio for Jay Pancholi. The site pairs `Bricolage Grotesque` (headings), `Manrope` (body), and `JetBrains Mono` (code) with a dark-first palette: near-black navy (`oklch(0.13 0.01 240)`), warm off-white (`oklch(0.99 0 0)`), teal-blue primary (`oklch(0.66 0.09 208.46)`), and a subtle dot-grid background that runs across every surface.

---

## 1. Visual Theme & Atmosphere

### Overall Aesthetic

Muggleborn Dev feels like **a developer's personal OS translated into a portfolio**. Dark surfaces, monospaced type accents, and a restrained teal-blue primary create a technical foundation. The studio layer sits on top: confident layout, editorial typographic scale, and personality in the copy. It is not a generic agency site and it is not a Github README.

### Mood & Feeling

- Dark, precise, and quietly opinionated
- Developer authenticity — real tools, real work, no fluff
- Studio confidence without corporate polish
- Casual and sarcastic in voice, disciplined in layout
- Magical/wizarding references are on-brand (Muggleborn Dev, Obliviate, Spellbook)

### Design Density

**Low to medium density.** The site prioritises clarity and breathing room. Projects and work history are the densest sections; the landing page and services stay spacious.

### Visual Character

- Dark dot-grid canvas as the universal background texture
- Teal-blue (`--primary`) used sparingly — CTAs, highlights, active states only
- Cards float slightly above the dot-grid with subtle borders and low-drama shadows
- JetBrains Mono surfaces on tech stack tags, labels, and code-adjacent UI
- High contrast between dark backgrounds and light foreground text
- Light mode exists and is fully supported, but dark is the intended hero experience

---

## 2. Color Palette & Roles

### Dark Mode (Primary Experience)

| Token                    | Value                                | Role                                    |
| ------------------------ | ------------------------------------ | --------------------------------------- |
| `--background`           | `oklch(0.13 0.01 240)`               | Page canvas, body background            |
| `--foreground`           | `oklch(0.95 0 0)`                    | Primary text, headings                  |
| `--card`                 | `oklch(17.977% 0.01043 248.456 / 0)` | Card surfaces (transparent over bg)     |
| `--card-foreground`      | `oklch(0.95 0 0)`                    | Text on cards                           |
| `--primary`              | `oklch(0.66 0.09 208.46)`            | CTAs, active links, key accents         |
| `--primary-foreground`   | `oklch(0.13 0.01 240)`               | Text on primary buttons                 |
| `--secondary`            | `oklch(0.25 0.01 240)`               | Secondary button fills, subtle surfaces |
| `--secondary-foreground` | `oklch(0.88 0 0)`                    | Text on secondary fills                 |
| `--muted`                | `oklch(0.22 0.01 240)`               | Muted backgrounds, tag fills            |
| `--muted-foreground`     | `oklch(0.62 0 0)`                    | Metadata, captions, secondary labels    |
| `--accent`               | `oklch(0.28 0.04 208)`               | Hover fills, subtle teal tints          |
| `--accent-foreground`    | `oklch(0.92 0 0)`                    | Text on accent surfaces                 |
| `--border`               | `oklch(0.28 0.01 240)`               | Card borders, dividers                  |
| `--input`                | `oklch(0.28 0.01 240)`               | Input field borders                     |
| `--ring`                 | `oklch(0.66 0.09 208.46)`            | Focus rings                             |
| `--destructive`          | `oklch(0.62 0.22 25)`                | Error, destructive actions              |
| `--dot-color`            | `oklch(0.25 0 0)`                    | Dot-grid dots (dark mode)               |

### Light Mode

| Token                  | Value                     | Role                                    |
| ---------------------- | ------------------------- | --------------------------------------- |
| `--background`         | `oklch(0.99 0 0)`         | Page canvas                             |
| `--foreground`         | `oklch(0.18 0 0)`         | Primary text                            |
| `--primary`            | `oklch(0.66 0.09 208.46)` | Same teal-blue — unchanged across modes |
| `--primary-foreground` | `oklch(1 0 0)`            | White text on primary                   |
| `--secondary`          | `oklch(0.95 0 0)`         | Light secondary fills                   |
| `--muted`              | `oklch(0.96 0 0)`         | Muted backgrounds                       |
| `--muted-foreground`   | `oklch(0.52 0 0)`         | Captions, metadata                      |
| `--accent`             | `oklch(0.93 0.03 208.46)` | Light teal tint                         |
| `--border`             | `oklch(0.9 0 0)`          | Borders and dividers                    |
| `--dot-color`          | `oklch(0.92 0 0)`         | Dot-grid dots (light mode, very subtle) |

### Sidebar Tokens (for dashboard-style layouts)

| Token               | Dark Value                | Light Value               |
| ------------------- | ------------------------- | ------------------------- |
| `--sidebar`         | `oklch(0.16 0.01 240)`    | `oklch(0.97 0 0)`         |
| `--sidebar-primary` | `oklch(0.66 0.09 208.46)` | same                      |
| `--sidebar-accent`  | `oklch(0.28 0.04 208)`    | `oklch(0.93 0.03 208.46)` |
| `--sidebar-border`  | `oklch(0.25 0.01 240)`    | `oklch(0.9 0 0)`          |

### Chart / Data Colours (cool blue-teal range)

| Token       | Dark                   | Light                  |
| ----------- | ---------------------- | ---------------------- |
| `--chart-1` | `oklch(0.78 0.12 190)` | `oklch(0.72 0.13 190)` |
| `--chart-2` | `oklch(0.72 0.1 208)`  | `oklch(0.66 0.09 208)` |
| `--chart-3` | `oklch(0.65 0.13 225)` | `oklch(0.6 0.13 225)`  |
| `--chart-4` | `oklch(0.59 0.16 245)` | `oklch(0.55 0.16 245)` |
| `--chart-5` | `oklch(0.54 0.18 265)` | `oklch(0.5 0.18 265)`  |

---

## 3. Typography Rules

### Font Stack

```css
--font-sans: var(--font-manrope), system-ui, sans-serif; /* body, UI */
--font-heading: var(--font-bricolage), system-ui, sans-serif; /* headings, display */
--font-mono: var(--font-jetbrains), "Courier New", monospace; /* code, tech tags, labels */
```

All three are loaded via `next/font/google` and injected as CSS variables on `<html>`.

### Type Scale

| Element       | Size    | Weight | Font                | Usage                         |
| ------------- | ------- | ------ | ------------------- | ----------------------------- |
| Hero Display  | 64–80px | 700    | Bricolage Grotesque | Landing page hero only        |
| Page Title    | 48px    | 700    | Bricolage Grotesque | Section/page H1               |
| Section Title | 32px    | 600    | Bricolage Grotesque | Section H2                    |
| Card Title    | 22px    | 600    | Bricolage Grotesque | Project/work card headings    |
| Body Large    | 18px    | 400    | Manrope             | Lead paragraphs, intros       |
| Body          | 16px    | 400    | Manrope             | Default body copy             |
| Small Body    | 14px    | 400    | Manrope             | Metadata, captions            |
| Label / Tag   | 12px    | 500    | JetBrains Mono      | Tech stack pills, code labels |
| Code          | 13px    | 400    | JetBrains Mono      | Inline code, terminal UI      |

### Typography Philosophy

Headings carry the personality — Bricolage Grotesque is wide, confident, and slightly irregular. Manrope keeps body copy clean and legible at smaller sizes. JetBrains Mono is the developer tell: it surfaces on anything technical (tech stack tags, terminal-style labels, keyboard shortcuts).

Never use Bricolage for body copy. Never use JetBrains Mono for running prose.

---

## 4. Component Stylings

### Radius Scale

```css
--radius: 0.5rem; /* 8px — base */
--radius-sm: calc(var(--radius) - 4px); /* 4px */
--radius-md: calc(var(--radius) - 2px); /* 6px */
--radius-lg: var(--radius); /* 8px */
--radius-xl: calc(var(--radius) + 4px); /* 12px */
```

Not pill-heavy. Cards and inputs use `radius-lg` (8px) or `radius-xl` (12px). Badges and small tags use `radius-sm` or `radius-md`.

### Buttons

```css
/* Primary */
.button-primary {
  background: oklch(0.66 0.09 208.46); /* --primary */
  color: oklch(0.13 0.01 240); /* --primary-foreground */
  border: none;
  border-radius: 8px; /* --radius-lg */
  min-height: 40px;
  padding: 0 16px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
}

.button-primary:hover {
  opacity: 0.9;
}

/* Secondary / Ghost */
.button-ghost {
  background: transparent;
  color: oklch(0.95 0 0); /* --foreground */
  border: none;
  border-radius: 8px;
  padding: 0 16px;
}

.button-ghost:hover {
  background: oklch(0.22 0.01 240); /* --accent */
}
```

### Cards

```css
.card {
  background: transparent; /* floats over dot-grid bg */
  border: 1px solid oklch(0.28 0.01 240); /* --border */
  border-radius: 12px; /* --radius-xl */
  padding: 24px;
}

/* Project feature card */
.card-project {
  background: oklch(0.22 0.01 240); /* --muted */
  border: 1px solid oklch(0.28 0.01 240);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 150ms ease;
}

.card-project:hover {
  border-color: oklch(0.66 0.09 208.46); /* --primary on hover */
}
```

### Tech Stack Tags / Pills

```css
.tag {
  background: oklch(0.22 0.01 240); /* --muted */
  color: oklch(0.62 0 0); /* --muted-foreground */
  border-radius: 4px; /* --radius-sm */
  padding: 2px 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
}
```

### Inputs

```css
.input {
  background: transparent;
  color: oklch(0.95 0 0); /* --foreground */
  border: 1px solid oklch(0.28 0.01 240); /* --input */
  border-radius: 8px;
  min-height: 40px;
  padding: 8px 12px;
  font-family: var(--font-sans);
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: oklch(0.66 0.09 208.46); /* --ring */
  box-shadow: 0 0 0 3px oklch(0.66 0.09 208.46 / 0.2);
}
```

### Dot-Grid Background

```css
body {
  background-color: oklch(0.13 0.01 240);
  background-image: radial-gradient(circle, oklch(0.25 0 0) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

The dot-grid is universal. Do not remove it from any page. Print mode strips it automatically.

---

## 5. Layout Principles

### Spacing Scale (Tailwind defaults, key values)

| Value      | px   | Usage                             |
| ---------- | ---- | --------------------------------- |
| `space-1`  | 4px  | Micro gaps, icon padding          |
| `space-2`  | 8px  | Tag internal spacing, tight pairs |
| `space-3`  | 12px | Compact control padding           |
| `space-4`  | 16px | Default component padding         |
| `space-6`  | 24px | Card padding, section gaps        |
| `space-8`  | 32px | Component separation              |
| `space-12` | 48px | Section breathing room            |
| `space-16` | 64px | Large section padding             |
| `space-24` | 96px | Hero vertical rhythm              |

### Layout Behaviour

- Max content width: `max-w-5xl` (1024px) or `max-w-6xl` (1152px) depending on section
- Navigation: sticky top bar, minimal — logo left, nav links right, theme toggle far right
- Hero: full viewport height (`min-h-screen`), centred content
- Projects grid: 2–3 columns on desktop, 1 on mobile
- About/CV: two-column on desktop (1/3 sidebar sticky, 2/3 main scroll), single column mobile

### Whitespace Philosophy

Let the dot-grid do the work. Sections do not need decorative dividers — the vertical rhythm and spacing create separation. Err on the side of more space, not less.

---

## 6. Depth & Elevation

### Elevation Strategy

Low drama. The dot-grid provides texture; cards and components sit _on_ the surface rather than floating above it. Shadows are used only to separate interactive elements (modals, dropdowns, popovers).

### Shadow Language

```css
--shadow-2xs: 0 1px 3px 0px oklch(0 0 0 / 0.05);
--shadow-xs: 0 1px 3px 0px oklch(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0px oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1);
--shadow: 0 1px 3px 0px oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1);
--shadow-md: 0 1px 3px 0px oklch(0 0 0 / 0.1), 0 2px 4px -1px oklch(0 0 0 / 0.1);
--shadow-lg: 0 1px 3px 0px oklch(0 0 0 / 0.1), 0 4px 6px -1px oklch(0 0 0 / 0.1);
--shadow-xl: 0 1px 3px 0px oklch(0 0 0 / 0.1), 0 8px 10px -1px oklch(0 0 0 / 0.1);
--shadow-2xl: 0 1px 3px 0px oklch(0 0 0 / 0.25);
```

### Surface Hierarchy

1. Dot-grid canvas (`--background`)
2. Card surfaces — same background or `--muted`, separated by `--border`
3. Popover / dropdown — `--popover` with `--shadow-lg`
4. Modal / overlay — strong backdrop blur + `--shadow-2xl`

---

## 7. Do's and Don'ts

### Do

- Dark mode is the hero — design dark-first, verify light second
- Use `--primary` teal-blue sparingly: CTAs, active nav items, key highlights only
- Use JetBrains Mono for anything technical: stack tags, labels, keyboard hints
- Keep the dot-grid on every page surface
- Write copy with personality — dry wit, specific, no buzzwords
- Use Bricolage Grotesque for display and headings only

### Don't

- Don't use gradients as decoration
- Don't make it look like a generic SaaS landing page or a Bootstrap template
- Don't remove the dot-grid for "cleanliness"
- Don't use `--primary` as a background colour for large surfaces
- Don't make the light mode feel like an afterthought (it's the print-friendly view)
- Don't over-animate — transitions max `200ms ease`, nothing bouncy

---

## 8. Responsive Behaviour

### Breakpoints (Tailwind defaults)

| Breakpoint | Width            | Behaviour                                                |
| ---------- | ---------------- | -------------------------------------------------------- |
| Mobile     | `< 640px`        | Single column, full-width cards, stacked nav             |
| Tablet     | `640px – 1024px` | Two-column grids, condensed spacing                      |
| Desktop    | `1024px+`        | Full layout, sticky sidebar on About, 3-col project grid |

### Responsive Rules

- Hero text scales down on mobile — do not let it overflow or require horizontal scroll
- Tech stack tag rows wrap, never truncate
- About/CV sidebar collapses to top on mobile, sticky on desktop
- Navigation collapses to hamburger or bottom sheet on mobile
- Print layout (triggered from About page) forces single-column, white background, no dot-grid

---

## 9. Site Structure

| Route       | Purpose                                                                             |
| ----------- | ----------------------------------------------------------------------------------- |
| `/`         | Landing — hero, brief intro, featured projects preview, CTA                         |
| `/work`     | Employment timeline — Exco Partners, inlight, Zash Ventures, C2 Capital + freelance |
| `/projects` | Project showcase — Obliviate (hero), Green Gods, others                             |
| `/services` | What Muggleborn Dev offers clients                                                  |
| `/about`    | Interactive CV — bio, skills, experience, printable                                 |
| `/contact`  | Contact links + optional form                                                       |

No blog. Blog lives on Spellbook (separate site).

---

## 10. Agent Prompt Guide

### Quick Reference

- Dark navy dot-grid canvas with near-white text
- Teal-blue (`oklch(0.66 0.09 208.46)`) as the single accent — used sparingly
- Bricolage Grotesque display headings, Manrope body, JetBrains Mono for tech/code
- Low-drama elevation, border-separated cards, no heavy shadows
- Casual and sarcastic developer voice, studio confidence in layout
- Muggleborn Dev — solo developer studio, Harry Potter naming theme

### Prompt Template

```text
Design this like Muggleborn Dev — a developer portfolio and solo studio:
- Dark navy dot-grid background (near-black with subtle dot texture at 20px intervals)
- Single teal-blue accent (oklch 0.66 0.09 208.46) used only for CTAs and active states
- Bricolage Grotesque for display headings, Manrope for body, JetBrains Mono for tech tags
- Border-defined cards with low-drama shadows floating over the dot-grid
- Casual, sarcastic developer voice — opinionated but not arrogant
- Studio-confident layout with generous whitespace and strong typographic hierarchy
```

### Avoid

- Generic agency templates or SaaS landing page patterns
- Gradient-heavy decorative backgrounds
- Neon or vibrant multi-colour accent systems
- Sterile corporate polish that strips the developer personality
- Animations that feel like a UI framework demo
