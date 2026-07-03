"use client";

import { type Job } from "@/lib/constants/jobs";
import { DOT_OFFSET, HALF_DOT } from "./constants";
import { MobileCardAnimated } from "./mobile-card";
import { TimelineBlock } from "./timeline-block";
import { TimelineDot } from "./timeline-dot";

interface TimelineEventProps {
  job: Job;
  isRight: boolean;
  dotRef: (el: HTMLDivElement | null) => void;
  rowRef: (el: HTMLDivElement | null) => void;
}

export function TimelineEvent({ job, isRight, dotRef, rowRef }: TimelineEventProps) {
  return (
    <div ref={rowRef} className="relative flex items-start">
      {/* Mobile dot */}
      <div className="absolute top-5 left-4 z-10 -translate-x-1/2 md:hidden">
        <TimelineDot />
      </div>

      {/* Desktop dot — alternates sides to match the zigzag path */}
      <div
        className="absolute z-10 hidden md:block"
        style={{
          top: "22px",
          left: isRight
            ? `calc(50% - ${DOT_OFFSET + HALF_DOT}px)`
            : `calc(50% + ${DOT_OFFSET - HALF_DOT}px)`,
        }}
      >
        <TimelineDot dotRef={dotRef} />
      </div>

      {/* Desktop columns */}
      <TimelineBlock job={job} variant={isRight ? "left-company-name" : "left-company-details"} />
      <TimelineBlock job={job} variant={isRight ? "right-company-details" : "right-company-name"} />

      {/* Mobile fallback */}
      <MobileCardAnimated job={job} />
    </div>
  );
}
