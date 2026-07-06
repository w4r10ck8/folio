// src/lib/constants.ts
// App-wide named constants. No magic numbers or strings elsewhere.

// ── Site metadata ─────────────────────────────────────────────────────────
export const SITE_NAME = "Folio";
export const SITE_DESCRIPTION =
  "A production-ready Next.js starter with Tailwind v4 and shadcn/ui.";
export const SITE_URL = "https://muggleborn.dev";

// ── Pagination ────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ── Timing (ms) ───────────────────────────────────────────────────────────
export const DEBOUNCE_DELAY_MS = 300;
export const TOAST_DURATION_MS = 4000;

// ── Retry ─────────────────────────────────────────────────────────────────
export const MAX_RETRY_COUNT = 3;

// ── Discord (contact form notifications) ─────────────────────────────────
export const DISCORD_EMBED_COLOR = 0x8b5cf6; // accent used for the contact form embed

// ── Current employer ─────────────────────────────────────────────────────
export const CURRENT_EMPLOYER = "Exco Partners | NEC";
export const CURRENT_EMPLOYER_URL = "https://excopartners.com.au";
