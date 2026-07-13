// src/hooks/use-devtools-open.ts
"use client";

import { useEffect, useState } from "react";
import { addListener, launch, removeListener, stop } from "devtools-detector";

const CONSOLE_BRAND_MESSAGE = "Designed and built by Jay with love and lots of caffeine.";
const CONSOLE_BRAND_STYLE = "color:#8b5cf6; font-size:14px; font-weight:bold; padding:8px 0;";

/**
 * Reports devtools open/close as React state via devtools-detector, which
 * broadcasts to listeners only on an actual state change (edge-triggered
 * internally). This is a marketing easter egg, not a security control — its
 * only reliable technique (console.log render-timing) requires console.clear()
 * as part of how it measures, so any custom console message printed here
 * can't persist indefinitely; it flashes once per open. No-ops outside
 * production and on touch devices, where the devtools concept doesn't apply.
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
      if (open) {
        console.clear();
        console.log(`%c${CONSOLE_BRAND_MESSAGE}`, CONSOLE_BRAND_STYLE);
      }
      setIsOpen(open);
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
