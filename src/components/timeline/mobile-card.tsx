"use client";

import { motion } from "motion/react";

import { type Job } from "@/lib/constants/jobs";

export function MobileCard({ job }: { job: Job }) {
  return (
    <div className="border-border/60 bg-background/60 rounded-2xl border p-5 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-foreground text-lg font-bold">{job.company}</h3>
          <p className="text-primary mt-0.5 font-mono text-sm">{job.role}</p>
        </div>
        <span className="border-border text-muted-foreground mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-xs">
          {job.duration}
        </span>
      </div>
      <ul className="space-y-2">
        {job.highlights.map((highlight, i) => (
          <li
            key={i}
            className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
          >
            <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MobileCardAnimated({ job }: { job: Job }) {
  return (
    <div className="w-full pl-10 md:hidden">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <MobileCard job={job} />
      </motion.div>
    </div>
  );
}
