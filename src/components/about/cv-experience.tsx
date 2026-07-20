// src/components/about/cv-experience.tsx
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABOUT_EXPERIENCE } from "@/lib/constants/about";

export function CvExperience(): ReactNode {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl font-bold">Experience</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-0">
        {ABOUT_EXPERIENCE.map((job) => (
          <div key={`${job.company}-${job.role}`} className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-foreground text-xl font-semibold">{job.role}</h3>
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

            {/* Overview */}
            {job.overview && (
              <p className="text-muted-foreground text-sm leading-relaxed">{job.overview}</p>
            )}

            {/* Responsibilities */}
            {job.responsibilities.map((resp, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {resp.title && (
                  <p className="text-foreground text-sm font-semibold">{resp.title}</p>
                )}
                <ul className="flex flex-col gap-1">
                  {resp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-muted-foreground flex gap-2 text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1.5 shrink-0 leading-none">·</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
