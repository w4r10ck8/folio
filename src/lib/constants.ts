// src/lib/constants.ts
// App-wide named constants. No magic numbers or strings elsewhere.

// ── Site metadata ─────────────────────────────────────────────────────────
export const SITE_NAME = "Jay Pancholi";
export const SITE_DESCRIPTION =
  "Full-stack developer based in Melbourne. I build fast, accessible web products with TypeScript, React, and Next.js.";
export const SITE_URL = "https://muggleborn.dev";
export const SITE_AUTHOR = "Jay Pancholi";
export const SITE_TWITTER_HANDLE = "@jaypancholi94";
export const SITE_KEYWORDS = [
  "Jay Pancholi",
  "full-stack developer",
  "frontend developer",
  "React",
  "Next.js",
  "TypeScript",
  "Melbourne",
  "web developer",
  "portfolio",
];

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
