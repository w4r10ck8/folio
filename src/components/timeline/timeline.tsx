"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";

import { JOBS } from "@/lib/constants/jobs";
import { CORNER_R, DOT_SEAM_RATIO, MOBILE_DOT_INSET } from "./constants";
import { TimelineEvent } from "./timeline-event";

function buildZigzagPath(
  dotX: (i: number) => number,
  dotRefs: Array<HTMLDivElement | null>,
  rowRefs: Array<HTMLDivElement | null>,
  cr: DOMRect,
): string {
  const dots = dotRefs.filter(Boolean) as Array<HTMLDivElement>;
  if (dots.length < 2) return "";

  const ys = dots.map((el) => {
    const r = el.getBoundingClientRect();
    return Math.round(r.top + r.height / 2 - cr.top);
  });
  if (ys[0] === ys[ys.length - 1] && ys.length > 1 && ys.every((y) => y === ys[0])) return "";

  const rowRects = rowRefs.filter(Boolean).map((ref) => ref!.getBoundingClientRect());

  const parts: Array<string> = [`M ${dotX(0)},${ys[0]!}`];

  for (let i = 1; i < ys.length; i++) {
    const px = dotX(i - 1);
    const cx = dotX(i);
    const py = ys[i - 1]!;
    const cy = ys[i]!;

    if (px !== cx) {
      const gapTop = rowRects[i - 1] ? Math.round(rowRects[i - 1]!.bottom - cr.top) : py;
      const gapBottom = rowRects[i] ? Math.round(rowRects[i]!.top - cr.top) : cy;
      const turnY = Math.round((gapTop + gapBottom) / 2);
      const r = Math.min(CORNER_R, Math.abs(turnY - py) / 2, Math.abs(cx - px) / 2);
      const dir = cx > px ? 1 : -1;
      parts.push(`L ${px},${turnY - r}`);
      parts.push(`Q ${px},${turnY} ${px + dir * r},${turnY}`);
      parts.push(`L ${cx - dir * r},${turnY}`);
      parts.push(`Q ${cx},${turnY} ${cx},${turnY + r}`);
    }
    parts.push(`L ${cx},${cy}`);
  }

  return parts.join(" ");
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileDotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pathD, setPathD] = useState("");
  const [mobilePathD, setMobilePathD] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useLayoutEffect(() => {
    function buildPaths() {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const half = Math.round(cr.width / 2);
      const dotOffset = Math.round(cr.width * DOT_SEAM_RATIO);
      containerRef.current.style.setProperty("--dot-offset", `${dotOffset}px`);

      // Desktop: dots sit either side of the column seam
      const desktopDotX = (i: number) => half + (i % 2 === 0 ? -dotOffset : dotOffset);
      setPathD(buildZigzagPath(desktopDotX, dotRefs.current, rowRefs.current, cr));

      // Mobile: dots alternate between the left and right edge
      const mobileDotX = (i: number) =>
        i % 2 === 0 ? MOBILE_DOT_INSET : cr.width - MOBILE_DOT_INSET;
      setMobilePathD(buildZigzagPath(mobileDotX, mobileDotRefs.current, rowRefs.current, cr));
    }

    buildPaths();
    const ro = new ResizeObserver(buildPaths);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="mb-2 font-mono text-sm" style={{ color: "var(--matrix-green)" }}>
            $ ls career/
          </p>
          <h2
            className="font-heading text-foreground font-bold"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Journey so far
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Mobile SVG zigzag */}
          {mobilePathD && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 block h-full w-full overflow-visible md:hidden"
            >
              <path
                d={mobilePathD}
                fill="none"
                stroke="var(--color-muted-foreground)"
                strokeOpacity={0.4}
                strokeWidth="2"
              />
              <motion.path
                d={mobilePathD}
                fill="none"
                stroke="var(--color-primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          )}

          {/* Desktop SVG zigzag */}
          {pathD && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
            >
              <path
                d={pathD}
                fill="none"
                stroke="var(--color-muted-foreground)"
                strokeOpacity={0.4}
                strokeWidth="2"
              />
              <motion.path
                d={pathD}
                fill="none"
                stroke="var(--color-primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          )}

          <div className="space-y-16 md:space-y-24">
            {JOBS.map((job, i) => (
              <TimelineEvent
                key={job.company}
                job={job}
                isRight={i % 2 === 0}
                dotRef={(el) => {
                  dotRefs.current[i] = el;
                }}
                mobileDotRef={(el) => {
                  mobileDotRefs.current[i] = el;
                }}
                rowRef={(el) => {
                  rowRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
