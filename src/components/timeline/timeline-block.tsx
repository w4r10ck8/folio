"use client";

import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

import { Badge } from "@/components/ui/badge";
import { type Job } from "@/lib/constants/jobs";

export type TimelineVariant =
  | "left-company-name"
  | "left-company-details"
  | "right-company-name"
  | "right-company-details";

const blockStyles = {
  // ─ left column, company identity (date · name · role) ─────────────────
  "left-company-name": {
    colClass: "hidden w-[35%] md:flex md:justify-end pr-10",
    motionClass: "w-full",
    slideX: -40,
    wrapper: "flex flex-col items-end text-right",
    badge:
      "mb-1 inline-block rounded-full border border-border text-muted-foreground px-3 py-0.5 font-mono text-xs tracking-wider",
    heading: "font-heading text-foreground text-3xl font-bold leading-tight",
    role: "text-primary mt-1.5 font-mono text-sm",
    card: "",
  },
  // ─ left column, highlights card ───────────────────────────────────────
  "left-company-details": {
    colClass: "hidden w-[65%] md:flex md:justify-end pr-10",
    motionClass: "w-full",
    slideX: -40,
    wrapper: "",
    badge: "",
    heading: "",
    role: "",
    card: "border-border/60 bg-background/60 rounded-2xl border p-5 backdrop-blur-sm",
  },
  // ─ right column, company identity ─────────────────────────────────────
  "right-company-name": {
    colClass: "hidden md:flex md:w-[35%] pl-10",
    motionClass: "w-full",
    slideX: 40,
    wrapper: "flex flex-col items-start text-left",
    badge:
      "mb-1 inline-block rounded-full border border-border text-muted-foreground px-3 py-0.5 font-mono text-xs tracking-wider",
    heading: "font-heading text-foreground text-3xl font-bold leading-tight",
    role: "text-primary mt-1.5 font-mono text-sm",
    card: "",
  },
  // ─ right column, highlights card ──────────────────────────────────────
  "right-company-details": {
    colClass: "hidden md:flex md:w-[65%] pl-10",
    motionClass: "w-full",
    slideX: 40,
    wrapper: "",
    badge: "",
    heading: "",
    role: "",
    card: "border-border/60 bg-background/60 rounded-2xl border p-5 backdrop-blur-sm",
  },
} satisfies Record<
  TimelineVariant,
  {
    colClass: string;
    motionClass: string;
    slideX: number;
    wrapper: string;
    badge: string;
    heading: string;
    role: string;
    card: string;
  }
>;

interface TimelineBlockProps {
  job: Job;
  variant: TimelineVariant;
}

export function TimelineBlock({ job, variant }: TimelineBlockProps) {
  const s = blockStyles[variant];

  const isDetailsVariant =
    variant === "left-company-details" || variant === "right-company-details";
  const hasDetails = !isDetailsVariant || job.highlights.length > 0;

  const content =
    variant === "left-company-name" || variant === "right-company-name" ? (
      <div className={s.wrapper}>
        <Badge variant="outline" className="mb-1 font-mono font-normal tracking-wider">
          {job.duration.toUpperCase()}
        </Badge>
        <h3 className={s.heading}>{job.company}</h3>
        <p className={s.role}>{job.role}</p>
      </div>
    ) : hasDetails ? (
      <div className={s.card}>
        <ul className="space-y-2.5">
          {job.highlights.map((highlight, i) => (
            <li
              key={i}
              className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
            >
              <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span>
                <ReactMarkdown components={{ p: ({ children }) => <>{children}</> }}>
                  {highlight}
                </ReactMarkdown>
              </span>
            </li>
          ))}
        </ul>
        {job.tags && job.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 pt-3">
            {job.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-muted-foreground font-mono font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    ) : null;

  return (
    // Column wrapper stays in flow even with no card, so the row keeps its
    // 35/65 split and the sibling name block doesn't collapse to flex-start.
    <div className={s.colClass}>
      <motion.div
        className={s.motionClass}
        initial={{ opacity: 0, x: s.slideX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </motion.div>
    </div>
  );
}
