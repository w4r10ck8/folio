"use client";

import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

import { Badge } from "@/components/ui/badge";
import { type Job } from "@/lib/constants/jobs";
import { cn } from "@/lib/utils";

export function MobileCard({ job, isRight }: { job: Job; isRight: boolean }) {
  return (
    <div
      className={cn(
        "border-border/60 bg-background/60 rounded-2xl border p-5 backdrop-blur-sm",
        isRight ? "text-left" : "text-right",
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-start justify-between gap-3",
          !isRight && "flex-row-reverse",
        )}
      >
        <div>
          <h3 className="font-heading text-foreground text-lg font-bold">{job.company}</h3>
          <p className="text-primary mt-0.5 font-mono text-sm">{job.role}</p>
        </div>
        <Badge variant="outline" className="mt-0.5 shrink-0 font-mono font-normal">
          {job.duration}
        </Badge>
      </div>
      <ul className="space-y-2">
        {job.highlights.map((highlight, i) => (
          <li
            key={i}
            className={cn(
              "text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed",
              !isRight && "flex-row-reverse",
            )}
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
        <div className={cn("mt-3 flex flex-wrap gap-1.5 pt-3", !isRight && "justify-end")}>
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
  );
}

export function MobileCardAnimated({ job, isRight }: { job: Job; isRight: boolean }) {
  return (
    <div className={cn("w-full md:hidden", isRight ? "pl-10" : "pr-10")}>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: isRight ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <MobileCard job={job} isRight={isRight} />
      </motion.div>
    </div>
  );
}
