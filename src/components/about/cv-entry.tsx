// src/components/about/cv-entry.tsx
// Job and Education card components for the CV timeline.
"use client";

import { BookOpen, GraduationCap, MapPin, SquareArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AboutEducation, AboutExperience } from "@/lib/constants/about";
import { TimelineYear } from "./cv-year";

// ── BulletItem ────────────────────────────────────────────────────────────

function BulletItem({ text }: { text: string }): ReactNode {
  return (
    <li className="text-muted-foreground flex gap-2 text-sm leading-relaxed">
      <span className="text-primary mt-1.5 shrink-0 leading-none">·</span>
      <span>{text}</span>
    </li>
  );
}

// ── JobCard ───────────────────────────────────────────────────────────────

interface JobCardProps {
  job: AboutExperience;
}

export function JobCard({ job }: JobCardProps): ReactNode {
  const [start = "", end = ""] = job.duration.split(" — ");
  return (
    <Card className="mb-6">
      <div className="flex gap-4">
        <TimelineYear start={start} end={end} />

        <div className="flex flex-1 flex-col gap-3">
          {/* Role + company header */}
          <div className="flex flex-col gap-1">
            <h3 className="text-foreground font-heading text-xl font-semibold">{job.role}</h3>
            {job.website ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary -ml-3 w-fit font-bold"
                asChild
              >
                <a href={job.website} target="_blank" rel="noopener noreferrer">
                  {job.company}
                  <SquareArrowUpRight className="ml-1 inline-block h-3 w-3" />
                </a>
              </Button>
            ) : (
              <span className="text-primary text-sm font-bold">{job.company}</span>
            )}
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <MapPin size={12} />
              {job.location}
            </span>
          </div>

          <div className="bg-border h-px w-full" />

          {/* Overview */}
          {job.overview && (
            <p className="text-muted-foreground text-sm leading-relaxed">{job.overview}</p>
          )}

          {/* Responsibilities */}
          {job.responsibilities.map((resp, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              {resp.title && <p className="text-foreground text-sm font-semibold">{resp.title}</p>}
              <ul className="flex flex-col gap-1">
                {resp.highlights.map((h) => (
                  <BulletItem key={h} text={h} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── EducationCard ─────────────────────────────────────────────────────────

interface EducationCardProps {
  edu: AboutEducation;
}

export function EducationCard({ edu }: EducationCardProps): ReactNode {
  const [start = "", end = ""] = edu.duration.split(" — ");
  return (
    <Card className="relative mb-4 overflow-hidden">
      <div className="flex gap-4">
        <TimelineYear start={start} end={end} />

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-foreground font-heading text-xl font-semibold">{edu.degree}</h3>
            <span className="text-primary text-sm font-bold">{edu.institution}</span>
            {edu.location && (
              <span className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin size={12} />
                {edu.location}
              </span>
            )}
            {edu.major && (
              <span className="text-muted-foreground flex items-center gap-1 text-sm">
                <BookOpen size={12} />
                {edu.major}
              </span>
            )}
          </div>

          {edu.description && (
            <>
              <div className="bg-border h-px w-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
            </>
          )}
        </div>

        <GraduationCap
          size={150}
          className="text-muted-foreground absolute -top-10 -right-2 shrink-0 self-center opacity-10"
        />
      </div>
    </Card>
  );
}
