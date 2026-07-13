// src/hooks/use-devtools-open.ts
"use client";

import { useEffect, useState } from "react";
import { addListener, launch, removeListener, stop } from "devtools-detector";

const CONSOLE_BRAND_MESSAGE = "Designed and built by Jay with love and lots of caffeine.";
const CONSOLE_BRAND_STYLE = "color:#8b5cf6; font-size:14px; font-weight:bold; padding:8px 0;";

/**
 * Reports devtools open as React state via devtools-detector. Once triggered,
 * permanently stops the detection loop — its only reliable technique
 * (console.log render-timing) requires console.clear() every cycle as part
 * of how it measures, so stopping the loop for good is what lets our console
 * message survive instead of getting wiped on the next cycle. Trade-off:
 * sticky until page reload, no auto-recovery on devtools close — deliberate,
 * not a bug. No-ops outside production and on touch devices, where the
 * devtools concept doesn't apply.
 *
 * @example
 * const isDevtoolsOpen = useDevtoolsOpen()
 */
export function useDevtoolsOpen(): boolean {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (isExemptDevice()) return;

    const listener = (open: boolean) => {
      if (!open) return;

      console.clear();
      console.log(`%c${CONSOLE_BRAND_MESSAGE}`, CONSOLE_BRAND_STYLE);
      setIsOpen(true);

      removeListener(listener);
      stop();
    };

    addListener(listener);
    launch();

    return () => {
      removeListener(listener);
      stop();
    };
  }, []);

  return isOpen;
}

function isExemptDevice(): boolean {
  return (
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768
  );
}
