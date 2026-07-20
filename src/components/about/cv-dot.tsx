// src/components/about/cv-dot.tsx
// Animated timeline dot — registers its DOM ref so the SVG path builder can measure it.
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface TimelineDotProps {
  dotRef: (el: HTMLDivElement | null) => void;
  delay?: number;
}

export function TimelineDot({ dotRef, delay = 0 }: TimelineDotProps): ReactNode {
  return (
    <div className="relative z-10 flex items-start justify-center pt-1">
      <motion.div
        ref={dotRef}
        className="bg-background border-primary h-3 w-3 rounded-full border-2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay, duration: 0.3, ease: "backOut" }}
      />
    </div>
  );
}
