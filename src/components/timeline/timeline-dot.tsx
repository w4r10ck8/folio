"use client";

import { motion } from "motion/react";

export function TimelineDot({ dotRef }: { dotRef?: (el: HTMLDivElement | null) => void }) {
  return (
    <div ref={dotRef} className="relative flex h-6 w-6 items-center justify-center">
      {/* Outer ring */}
      <motion.div
        className="bg-background absolute h-6 w-6 rounded-full border-2 shadow-[0px_0_8px_0px_var(--primary)]"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, ease: "backOut" }}
      />
      {/* Inner dot */}
      <motion.div
        className="bg-primary absolute h-2.5 w-2.5 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.2, duration: 0.35, ease: "backOut" }}
      />
    </div>
  );
}
