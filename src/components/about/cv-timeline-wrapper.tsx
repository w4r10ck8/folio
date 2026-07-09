// src/components/about/cv-timeline-wrapper.tsx
"use client";

import { GraduationCap } from "lucide-react";
import { animate, motion, useMotionValue, useScroll } from "motion/react";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { ABOUT_EDUCATION, ABOUT_EXPERIENCE } from "@/lib/constants/about";

// Centre of the 40 px left column — dots and path vertical segment sit here.
const TRACK_X = 20;
const TOTAL_DOTS = ABOUT_EXPERIENCE.length + ABOUT_EDUCATION.length;
const OFFSET = 50;

export function CvTimelineWrapper(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>(Array(TOTAL_DOTS).fill(null));
  const [pathD, setPathD] = useState("");

  // Fractions of total path length where the visible vertical portion starts/ends.
  // Used to remap scrollYProgress so the fill only animates over the visible segment
  // and avoids the "slow then suddenly fast" effect caused by long off-screen arms.
  const [progressRange, setProgressRange] = useState<[number, number]>([0, 1]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // displayProgress drives the fill. Starts at 0 on every mount so the path
  // always animates in from nothing, even on a mid-scroll page refresh.
  const displayProgress = useMotionValue(0);

  useEffect(() => {
    // Wait until useLayoutEffect has measured the dots and built the correct path.
    // progressRange[0] === 0 means we still have the default [0,1] state.
    if (!pathD || progressRange[0] === 0) return;

    const remap = (v: number) => progressRange[0] + v * (progressRange[1] - progressRange[0]);

    // Entrance: animate from 0 to wherever the scroll currently sits.
    const controls = animate(displayProgress, remap(scrollYProgress.get()), {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    });

    // Real-time tracking — scroll always wins over the entrance animation.
    const unsub = scrollYProgress.on("change", (v) => displayProgress.set(remap(v)));

    return () => {
      controls.stop();
      unsub();
    };
    // Deps are stable after the first measured render — this runs exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD, progressRange]);

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

      // Enter from left (off-screen) → curved 90° down → vertical → curved 90° exit right
      const arm = cr.left + 2000;
      const r = 24; // corner radius, matches home timeline CORNER_R
      setPathD(
        `M ${-arm},${y1} ` +
          `H ${TRACK_X - r} ` +
          `Q ${TRACK_X},${y1} ${TRACK_X},${y1 + r} ` +
          `V ${yn - r} ` +
          `Q ${TRACK_X},${yn} ${TRACK_X + r},${yn} ` +
          `H ${cr.width + arm}`,
      );

      // Calculate path-length fractions for the visible portion.
      // leftArm  = length of the horizontal entry arm up to the curve start
      // curve    = quarter-circle arc length (π/2 * r)
      // vert     = straight vertical segment between the two curves
      // rightArm = length of the horizontal exit arm from the curve end
      // total    = full path length (arms + curves + vert)
      // pStart = where visible portion begins; pEnd = where it ends
      const leftArm = arm + TRACK_X - r;
      const curve = (Math.PI / 2) * r;
      const vert = Math.max(0, yn - y1 - 2 * r);
      const rightArm = cr.width - (TRACK_X + r) + arm;
      const total = leftArm + curve + vert + curve + rightArm;
      setProgressRange([leftArm / total, 1 - rightArm / total]);
    }

    buildPath();
    const ro = new ResizeObserver(buildPath);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative grid grid-cols-[40px_1fr]">
      {/* SVG — overflow:visible so horizontal arms extend off-screen */}
      {pathD && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          style={{ zIndex: -1 }}
        >
          {/* Static background track */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeOpacity={0.5}
          />
          {/* Scroll-driven fill — drawProgress remapped to visible portion only */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            style={{ pathLength: displayProgress }}
          />
        </svg>
      )}
      {/* ── Experience ───────────────────────────────────────────────── */}
      <div /> {/* empty left cell — path passes through */}
      <div className="pt-4 pb-3">
        <h2 className="font-heading text-foreground text-xl font-bold">Experience</h2>
      </div>
      {ABOUT_EXPERIENCE.map((job, i) => (
        <Fragment key={job.company}>
          {/* Dot */}
          <div className="relative z-10 flex items-start justify-center pt-1">
            <motion.div
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="bg-background border-primary h-3 w-3 rounded-full border-2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, ease: "backOut" }}
            />
          </div>

          {/* Job content */}
          <div className="flex flex-col gap-3 pb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-foreground font-semibold">{job.role}</h3>
                <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
                  {job.website ? (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <span>{job.company}</span>
                  )}
                  <span className="text-border">•</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <span className="text-muted-foreground shrink-0 font-mono text-sm tabular-nums">
                {job.duration}
              </span>
            </div>
            {job.overview && (
              <p className="text-muted-foreground text-sm leading-relaxed">{job.overview}</p>
            )}
            {job.responsibilities.map((resp, ri) => (
              <div key={ri} className="flex flex-col gap-1.5">
                {resp.title && (
                  <p className="text-foreground text-sm font-semibold">{resp.title}</p>
                )}
                <ul className="flex flex-col gap-1">
                  {resp.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-muted-foreground flex gap-2 text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1.5 shrink-0 leading-none">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
      {/* ── Education ────────────────────────────────────────────────── */}
      <div />
      <div className="pt-6 pb-3">
        <h2 className="font-heading text-foreground text-xl font-bold">Education</h2>
      </div>
      {ABOUT_EDUCATION.map((edu, i) => (
        <Fragment key={edu.institution}>
          {/* Dot */}
          <div className="relative z-10 flex items-start justify-center pt-1">
            <motion.div
              ref={(el) => {
                dotRefs.current[ABOUT_EXPERIENCE.length + i] = el;
              }}
              className="bg-background border-primary h-3 w-3 rounded-full border-2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: "backOut" }}
            />
          </div>

          {/* Education content */}
          <div className="flex items-start justify-between gap-4 pb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-foreground font-semibold">{edu.degree}</h3>
              <p className="text-primary text-sm font-medium">{edu.institution}</p>
              {edu.major && <p className="text-muted-foreground font-mono text-xs">{edu.major}</p>}
              {edu.description && (
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-muted-foreground font-mono text-sm tabular-nums">
                {edu.duration}
              </span>
              <GraduationCap size={28} className="text-muted-foreground/20" />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
