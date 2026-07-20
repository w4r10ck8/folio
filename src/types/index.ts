// src/types/index.ts
// Shared TypeScript types used across the application.

// ── Utilities ─────────────────────────────────────────────────────────────

/**
 * Makes specified keys of T required (non-optional).
 *
 * @example
 * type UserWithId = WithRequired<User, 'id'>
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Makes specified keys of T optional.
 *
 * @example
 * type PartialUser = WithOptional<User, 'address' | 'phone'>
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extracts the resolved type of a Promise.
 *
 * @example
 * type Data = Awaited<ReturnType<typeof fetchUser>>
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * A discriminated union result type — avoids throwing for expected errors.
 *
 * @example
 * function divide(a: number, b: number): Result<number> {
 *   if (b === 0) return { ok: false, error: 'Division by zero' }
 *   return { ok: true, data: a / b }
 * }
 */
export type Result<T, E = string> = { ok: true; data: T } | { ok: false; error: E };

// ── Theme ─────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark" | "system";

// ── Pagination ────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
