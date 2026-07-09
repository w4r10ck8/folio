"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { ABOUT_EDUCATION, ABOUT_EXPERIENCE } from "@/lib/constants/about";
import { TimelineDot } from "./cv-dot";
import { EducationCard, JobCard } from "./cv-entry";

const TRACK_X = 20;
const TOTAL_DOTS = ABOUT_EXPERIENCE.length + ABOUT_EDUCATION.length;
const OFFSET = 80;

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
    offset: ["start center", "end start"],
  });

  const progressRangeRef = useRef(progressRange);
  // eslint-disable-next-line react-hooks/refs
  progressRangeRef.current = progressRange;

  const displayProgress = useTransform(scrollYProgress, (v) => {
    const [lo, hi] = progressRangeRef.current;
    return lo + v * (hi - lo);
  });

  useLayoutEffect(() => {
    function buildPath() {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const valid = dotRefs.current.filter(Boolean) as Array<HTMLDivElement>;
      if (valid.length < 2) return;

      const first = valid[0]!.getBoundingClientRect();
      const last = valid[valid.length - 1]!.getBoundingClientRect();
      const y1 = Math.round(first.top + first.height / 2 - cr.top) - OFFSET;
      const yn = Math.round(last.top + last.height / 2 - cr.top) + OFFSET;

      const r = 24;
      const arm = cr.left + 2000;
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
