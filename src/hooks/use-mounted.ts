// src/hooks/use-mounted.ts
"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns `true` only after the component has mounted on the client.
 *
 * Use this to safely read browser-only state (e.g. next-themes `theme`)
 * without causing a hydration mismatch between SSR and the first render.
 *
 * Uses `useSyncExternalStore` so it works correctly during SSR and hydration
 * without needing setState-in-effect.
 *
 * @example
 * const mounted = useMounted()
 * if (!mounted) return <Skeleton />
 * return <div>{resolvedTheme}</div>
 */

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
