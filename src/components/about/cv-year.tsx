// src/components/about/cv-year.tsx
// Vertical time column — end year (top, primary) → divider → start year (bottom, muted).

import type { CSSProperties, ReactNode } from "react";

interface TimelineYearProps {
  start: string;
  end: string;
}

const YEAR_STYLE: CSSProperties = { writingMode: "sideways-lr" };

export function TimelineYear({ start, end }: TimelineYearProps): ReactNode {
  return (
    <div className="flex w-8 shrink-0 flex-col items-center gap-1 pt-0.5">
      <span
        className="text-primary font-mono text-lg leading-none font-bold tabular-nums"
        style={YEAR_STYLE}
      >
        {end}
      </span>
      <div className="bg-border my-1 min-h-4 w-px flex-1" />
      <span
        className="text-muted-foreground font-mono text-lg leading-none tabular-nums"
        style={YEAR_STYLE}
      >
        {start}
      </span>
    </div>
  );
}
