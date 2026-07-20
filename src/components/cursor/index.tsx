"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";
import { interpolate } from "flubber";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";

// ── Path builders ──────────────────────────────────────────────────────────

/**
 * Arrow cursor tip at (cx, cy), pointing top-left.
 *
 * Derived by taking the Pointer SVG path (viewBox 0 0 16 16), scaling to 24 × 24
 * (×1.5), applying rotate(-70deg) around the element centre (12, 12), then
 * translating so the visual tip lands at (cx, cy). Arc commands are treated as
 * line segments — the arcs are r=0.5 in 16×16 space (0.75 px at 24×24), so the
 * approximation is indistinguishable at screen resolution.
 */
function buildArrow(cx: number, cy: number): string {
  return (
    `M${cx},${cy} ` +
    `L${cx + 15.9},${cy + 14.6} ` +
    `L${cx + 15.4},${cy + 15.9} ` +
    `L${cx + 7.6},${cy + 16.4} ` +
    `L${cx + 2.3},${cy + 22} ` +
    `L${cx + 1},${cy + 21.6} ` +
    `L${cx - 0.4},${cy + 0.7} ` +
    `Z`
  );
}

/**
 * Rounded-rectangle path in viewport coordinates.
 * Uses quadratic bezier curves for corners to match CSS border-radius feel.
 */
function buildRoundedRect(x: number, y: number, w: number, h: number, brStr: string): string {
  const r = Math.min(parseFloat(brStr) || 12, w / 2, h / 2);
  return (
    `M${x + r},${y} ` +
    `L${x + w - r},${y} ` +
    `Q${x + w},${y} ${x + w},${y + r} ` +
    `L${x + w},${y + h - r} ` +
    `Q${x + w},${y + h} ${x + w - r},${y + h} ` +
    `L${x + r},${y + h} ` +
    `Q${x},${y + h} ${x},${y + h - r} ` +
    `L${x},${y + r} ` +
    `Q${x},${y} ${x + r},${y} ` +
    `Z`
  );
}

// ── Types ──────────────────────────────────────────────────────────────────

interface ExpandTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const INTERACTIVE = "a, button, [role='button'], [data-cursor-expand], input, textarea, select";
const EXPAND_PADDING = 2;

// [fillOpacity, strokeOpacity, strokeWidth]
const STYLE_ARROW: [number, number, number] = [1, 0, 0];
const STYLE_EXPANDED: [number, number, number] = [0.07, 0.15, 1];

// ── CustomCursor ───────────────────────────────────────────────────────────

export function CustomCursor() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const pathRef = useRef<SVGPathElement>(null);

  // Keep latest isDark reachable inside the stable effect closure
  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
    const color = isDark ? "white" : "black";
    pathRef.current?.setAttribute("fill", color);
    pathRef.current?.setAttribute("stroke", color);
  }, [isDark]);

  // All cursor state lives in refs — avoid stale closures and skip React re-renders
  // for high-frequency DOM updates (path d, fill-opacity, etc.)
  const pos = useRef({ x: -200, y: -200 });
  const currentD = useRef(buildArrow(-200, -200));
  const isHovering = useRef(false);
  const isMorphing = useRef(false);
  const currentEl = useRef<Element | null>(null);
  const animCtrl = useRef<AnimationPlaybackControls | null>(null);

  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // ── Imperative path style ───────────────────────────────────────────
    const setStyle = (fillOp: number, strokeOp: number, strokeW: number) => {
      const p = pathRef.current;
      if (!p) return;
      p.setAttribute("fill-opacity", String(fillOp));
      p.setAttribute("stroke-opacity", String(strokeOp));
      p.setAttribute("stroke-width", String(strokeW));
      // Drop shadow only in arrow mode — matches the original Pointer SVG feel
      p.setAttribute("filter", fillOp > 0.5 ? "url(#cursor-shadow)" : "none");
    };

    // ── Core morph function ─────────────────────────────────────────────
    // Cancels any running animation, creates a flubber interpolator from
    // currentD → toD, then drives it with a spring via framer-motion animate().
    const morphTo = (
      toD: string,
      fromStyle: [number, number, number],
      toStyle: [number, number, number],
      stiffness: number,
      damping: number,
      onDone?: () => void,
    ) => {
      animCtrl.current?.stop();
      isMorphing.current = true;

      const fromD = currentD.current;
      const interp = interpolate(fromD, toD, { maxSegmentLength: 4 });

      animCtrl.current = animate(0, 1, {
        type: "spring",
        stiffness,
        damping,
        mass: 0.7,
        onUpdate(v) {
          const t = Math.min(1, Math.max(0, v));
          const d = interp(t);
          currentD.current = d;
          pathRef.current?.setAttribute("d", d);
          setStyle(
            fromStyle[0] + (toStyle[0] - fromStyle[0]) * t,
            fromStyle[1] + (toStyle[1] - fromStyle[1]) * t,
            fromStyle[2] + (toStyle[2] - fromStyle[2]) * t,
          );
        },
        onComplete() {
          isMorphing.current = false;
          onDone?.();
        },
      });
    };

    // ── Target reading ──────────────────────────────────────────────────
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

    // ── Element enter / leave ───────────────────────────────────────────
    const enterEl = (el: Element) => {
      if (el === currentEl.current) return;
      if (!visibleRef.current) return;
      const wasHovering = isHovering.current; // capture BEFORE mutating
      currentEl.current = el;
      isHovering.current = true;
      const { x, y, width, height, borderRadius } = readTarget(el);
      morphTo(
        buildRoundedRect(x, y, width, height, borderRadius),
        wasHovering ? STYLE_EXPANDED : STYLE_ARROW,
        STYLE_EXPANDED,
        350,
        30,
      );
    };

    const leaveEl = () => {
      if (!isHovering.current) return;
      isHovering.current = false;
      currentEl.current = null;

      // Fast tween (not spring) so collapse feels instant, not laggy.
      // On complete, snap to actual current cursor position to eliminate drift.
      animCtrl.current?.stop();
      isMorphing.current = true;
      const fromD = currentD.current;
      const toD = buildArrow(pos.current.x, pos.current.y);
      const interp = interpolate(fromD, toD, { maxSegmentLength: 4 });

      animCtrl.current = animate(0, 1, {
        duration: 0.12,
        ease: [0.4, 0, 0.2, 1],
        onUpdate(v) {
          const t = Math.min(1, Math.max(0, v));
          const d = interp(t);
          currentD.current = d;
          pathRef.current?.setAttribute("d", d);
          setStyle(
            STYLE_EXPANDED[0] + (STYLE_ARROW[0] - STYLE_EXPANDED[0]) * t,
            STYLE_EXPANDED[1] + (STYLE_ARROW[1] - STYLE_EXPANDED[1]) * t,
            STYLE_EXPANDED[2] + (STYLE_ARROW[2] - STYLE_EXPANDED[2]) * t,
          );
        },
        onComplete() {
          isMorphing.current = false;
          // Snap to wherever the cursor actually is now
          const d = buildArrow(pos.current.x, pos.current.y);
          currentD.current = d;
          pathRef.current?.setAttribute("d", d);
          setStyle(...STYLE_ARROW);
        },
      });
    };

    // ── DOM event handlers ──────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
        // Teleport to first position — no fly-in from (-200,-200)
        const d = buildArrow(e.clientX, e.clientY);
        currentD.current = d;
        const color = isDarkRef.current ? "white" : "black";
        const p = pathRef.current;
        if (p) {
          p.setAttribute("d", d);
          p.setAttribute("fill", color);
          p.setAttribute("stroke", color);
          setStyle(...STYLE_ARROW);
        }
      }

      // Live arrow tracking — only when idle (not hovering or morphing)
      if (!isHovering.current && !isMorphing.current) {
        const d = buildArrow(e.clientX, e.clientY);
        currentD.current = d;
        pathRef.current?.setAttribute("d", d);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest(INTERACTIVE) ?? null;
      if (el) enterEl(el);
    };

    const onOut = (e: MouseEvent) => {
      if (!currentEl.current) return;
      const rt = e.relatedTarget as Element | null;
      if (rt && currentEl.current.contains(rt)) return;
      const next = rt?.closest(INTERACTIVE) ?? null;
      if (next)
        enterEl(next); // slide to adjacent element
      else leaveEl();
    };

    const onLeave = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
      animCtrl.current?.stop();
      animCtrl.current = null;
      isMorphing.current = false;
      isHovering.current = false;
      currentEl.current = null;
    };

    const onScroll = () => {
      if (!isHovering.current || !currentEl.current) return;
      const { x, y, width, height, borderRadius } = readTarget(currentEl.current);
      // Instantly snap expanded rect to new scroll position
      const d = buildRoundedRect(x, y, width, height, borderRadius);
      currentD.current = d;
      pathRef.current?.setAttribute("d", d);
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
      animCtrl.current?.stop();
    };
  }, []); // Stable — all mutable state lives in refs

  if (!mounted) return null;

  return (
    // Single SVG overlay — one <path> that morphs between arrow and rounded rect.
    // No React state drives the path; all updates are imperative via pathRef.
    <svg
      className="pointer-events-none fixed inset-0 z-9999 h-screen w-screen"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s ease" }}
    >
      <defs>
        <filter id="cursor-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity={isDark ? 0.6 : 0.35} />
        </filter>
      </defs>
      <path ref={pathRef} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
