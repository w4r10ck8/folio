// src/components/about/cv-timeline-wrapper.tsx
// Manages the SVG scroll path + dot position measurement.
// Card rendering is delegated to cv-entry.tsx; dot to cv-dot.tsx.
"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { ABOUT_EDUCATION, ABOUT_EXPERIENCE } from "@/lib/constants/about";
import { TimelineDot } from "./cv-dot";
import { EducationCard, JobCard } from "./cv-entry";

// Centre of the 40 px left column — dots and path vertical segment sit here.
const TRACK_X = 20;
const TOTAL_DOTS = ABOUT_EXPERIENCE.length + ABOUT_EDUCATION.length;

function SectionHeading({ children }: { children: ReactNode }): ReactNode {
  return (
    <h2 className="font-heading text-foreground text-3xl leading-tight font-bold text-balance md:text-4xl">
      {children}
    </h2>
  );
}

export function CvTimelineWrapper(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>(Array(TOTAL_DOTS).fill(null));
  const [pathD, setPathD] = useState("");
  const [progressRange, setProgressRange] = useState<[number, number]>([0, 1]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Ref (not state) so useTransform's callback always reads the latest range
  // without needing to resubscribe — avoids a stale-closure re-render cycle.
  const progressRangeRef = useRef(progressRange);
  // eslint-disable-next-line react-hooks/refs
  progressRangeRef.current = progressRange;

  // Deriving straight from scrollYProgress (rather than a manual effect +
  // one-shot animate()) means this always reflects the true scroll position
  // immediately, including on a mid-page refresh — no 0-then-jump flash.
  const rawProgress = useTransform(scrollYProgress, (v) => {
    const [lo, hi] = progressRangeRef.current;
    return lo + v * (hi - lo);
  });
  const displayProgress = useSpring(rawProgress, { damping: 30, stiffness: 220, mass: 0.5 });

  useLayoutEffect(() => {
    function buildPath() {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      if (dotRefs.current.filter(Boolean).length < 2) return;

      // Anchored to the container's own top/bottom edges (not dot position +
      // a fixed offset) so the visual curve always lands exactly where the
      // "start center" / "end center" scroll trigger fires — otherwise the
      // two drift apart and the curve stalls off-centre at scroll's end.
      const y1 = 0;
      const yn = Math.round(cr.height);

      const arm = cr.left + 2000;
      const r = 24;
      // Progress should reach the viewport's right edge, not just the (narrower)
      // content column's edge — otherwise the animated line stalls short of where
      // the always-fully-drawn background path visually continues into the margin.
      const visibleRight = Math.max(cr.width, window.innerWidth - cr.left);
      setPathD(
        `M ${-arm},${y1} ` +
          `H ${TRACK_X - r} ` +
          `Q ${TRACK_X},${y1} ${TRACK_X},${y1 + r} ` +
          `V ${yn - r} ` +
          `Q ${TRACK_X},${yn} ${TRACK_X + r},${yn} ` +
          `H ${visibleRight + arm}`,
      );

      const leftArm = arm + TRACK_X - r;
      const curve = (Math.PI / 2) * r;
      const vert = Math.max(0, yn - y1 - 2 * r);
      const rightArm = visibleRight - (TRACK_X + r) + arm;
      const total = leftArm + curve + vert + curve + rightArm;
      setProgressRange([leftArm / total, 1 - arm / total]);
    }

    buildPath();
    const ro = new ResizeObserver(buildPath);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative grid grid-cols-[40px_1fr]">
      {/* SVG path — overflow:visible so horizontal arms extend off-screen */}
      {pathD && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          style={{ zIndex: -1 }}
        >
          <path
            d={pathD}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
            strokeOpacity={0.5}
          />
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            style={{ pathLength: displayProgress }}
          />
        </svg>
      )}

      {/* ── Experience ─────────────────────────────────────────────── */}
      <div />
      <div className="pt-4 pb-3">
        <SectionHeading>Experience</SectionHeading>
      </div>

      {ABOUT_EXPERIENCE.map((job, i) => (
        <Fragment key={job.company}>
          <TimelineDot
            dotRef={(el) => {
              dotRefs.current[i] = el;
            }}
          />
          <JobCard job={job} />
        </Fragment>
      ))}

      {/* ── Education ──────────────────────────────────────────────── */}
      <div />
      <div className="pt-6 pb-3">
        <SectionHeading>Education</SectionHeading>
      </div>

      {ABOUT_EDUCATION.map((edu, i) => (
        <Fragment key={edu.institution}>
          <TimelineDot
            dotRef={(el) => {
              dotRefs.current[ABOUT_EXPERIENCE.length + i] = el;
            }}
            delay={i * 0.05}
          />
          <EducationCard edu={edu} />
        </Fragment>
      ))}
    </div>
  );
}
