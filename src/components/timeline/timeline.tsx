"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";

import { JOBS } from "@/lib/constants/jobs";
import { CORNER_R, DOT_OFFSET } from "./constants";
import { TimelineEvent } from "./timeline-event";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pathD, setPathD] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useLayoutEffect(() => {
    function buildPath() {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const half = Math.round(cr.width / 2);

      // X from geometry (even = right-card dot left of centre, odd = right of centre)
      const dotX = (i: number) => half + (i % 2 === 0 ? -DOT_OFFSET : DOT_OFFSET);

      // Y from DOM measurement
      const ys = dotRefs.current.filter(Boolean).map((ref) => {
        const r = ref!.getBoundingClientRect();
        return Math.round(r.top + r.height / 2 - cr.top);
      });
      if (ys.length < 2) return;

      const rowRects = rowRefs.current.filter(Boolean).map((ref) => ref!.getBoundingClientRect());

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

      setPathD(parts.join(" "));
    }

    buildPath();
    const ro = new ResizeObserver(buildPath);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
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
          {/* Mobile spine */}
          <div className="bg-border absolute top-0 left-4 h-full w-px -translate-x-1/2 md:hidden" />
          <motion.div
            className="bg-primary absolute top-0 left-4 h-full w-0.5 origin-top -translate-x-1/2 md:hidden"
            style={{ scaleY: scrollYProgress }}
          />

          {/* Desktop SVG zigzag */}
          {pathD && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
            >
              <path d={pathD} fill="none" stroke="var(--color-border)" strokeWidth="2" />
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
