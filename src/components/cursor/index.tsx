"use client";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

interface ExpandTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

// ── Constants ─────────────────────────────────────────────────────────────

const INTERACTIVE = "a, button, [role='button'], [data-cursor-expand]";
const EXPAND_PADDING = 1;

// ── Cursor arrow — mirrors the shape from ui/pointer ─────────────────────

function CursorArrow({ isDark }: { isDark: boolean }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      viewBox="0 0 16 16"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "rotate-[-70deg]",
        isDark ? "stroke-black text-white" : "stroke-white text-black",
      )}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}

// ── CustomCursor ───────────────────────────────────────────────────────────

export function CustomCursor() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Instant motion values — no spring lag on the arrow itself
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const [expandTarget, setExpandTarget] = useState<ExpandTarget | null>(null);
  const [showArrow, setShowArrow] = useState(false);

  // Refs avoid stale closures inside event handlers
  const currentEl = useRef<Element | null>(null);
  const showArrowRef = useRef(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const readTarget = (el: Element): ExpandTarget => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - EXPAND_PADDING,
        y: rect.top - EXPAND_PADDING,
        width: rect.width + EXPAND_PADDING * 2,
        height: rect.height + EXPAND_PADDING * 2,
        borderRadius: window.getComputedStyle(el).borderRadius || "12px",
      };
    };

    const updateEl = (next: Element | null) => {
      if (next === currentEl.current) return;
      currentEl.current = next;
      setExpandTarget(next ? readTarget(next) : null);
    };

    const onMove = (e: MouseEvent) => {
      if (!initialized.current) {
        initialized.current = true;
        // Teleport on first move — avoids the arrow flying in from (-200, -200)
        cursorX.jump(e.clientX);
        cursorY.jump(e.clientY);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      if (!showArrowRef.current) {
        showArrowRef.current = true;
        setShowArrow(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element)?.closest(INTERACTIVE) ?? null;
      updateEl(interactive);
    };

    const onOut = (e: MouseEvent) => {
      if (!currentEl.current) return;
      const rt = e.relatedTarget as Element | null;
      // Still within the same interactive element (moving between its children)
      if (rt && currentEl.current.contains(rt)) return;
      updateEl(rt?.closest(INTERACTIVE) ?? null);
    };

    const onLeave = () => {
      if (showArrowRef.current) {
        showArrowRef.current = false;
        setShowArrow(false);
      }
      initialized.current = false;
      currentEl.current = null;
      setExpandTarget(null);
    };

    const onScroll = () => {
      if (currentEl.current) setExpandTarget(readTarget(currentEl.current));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      {/*
       * Expand highlight — blooms from the cursor tip outward to cover the
       * hovered element. Springs between elements so moving feels fluid.
       */}
      <AnimatePresence>
        {expandTarget && (
          <motion.div
            key="expand"
            initial={{
              // Start as a small dot at the element's centre, then bloom outward
              opacity: 0,
              x: expandTarget.x + expandTarget.width / 2 - 6,
              y: expandTarget.y + expandTarget.height / 2 - 6,
              width: 12,
              height: 12,
              borderRadius: "50%",
            }}
            animate={{
              opacity: 1,
              x: expandTarget.x,
              y: expandTarget.y,
              width: expandTarget.width,
              height: expandTarget.height,
              borderRadius: expandTarget.borderRadius,
            }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
            transition={{
              opacity: { duration: 0.1 },
              x: { type: "spring", stiffness: 500, damping: 35, mass: 0.6 },
              y: { type: "spring", stiffness: 500, damping: 35, mass: 0.6 },
              width: { type: "spring", stiffness: 380, damping: 32, mass: 0.6 },
              height: { type: "spring", stiffness: 380, damping: 32, mass: 0.6 },
              borderRadius: { duration: 0.18 },
            }}
            className="border-foreground/20 bg-foreground/10 absolute border"
          />
        )}
      </AnimatePresence>

      {/*
       * Arrow cursor — instant tracking so it feels exactly like a native cursor.
       * Fades out the moment expand activates; fades back in on leaving.
       */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showArrow && !expandTarget ? 1 : 0 }}
        transition={{ opacity: { duration: 0.12 } }}
        className="absolute top-0 left-0 will-change-transform"
      >
        {/* Offset by -12px to center the 24×24 SVG on the cursor hot-point */}
        <div style={{ transform: "translate(-12px, -12px)" }}>
          <CursorArrow isDark={isDark} />
        </div>
      </motion.div>
    </div>
  );
}
