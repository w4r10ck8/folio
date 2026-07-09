// src/components/about/index.tsx
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ContactCard } from "@/components/idea-brewing";
import { CvInterests } from "./cv-interests";
import { CvSidebar } from "./cv-sidebar";
import { CvTimelineWrapper } from "./cv-timeline-wrapper";

export function SmartCV(): ReactNode {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:gap-10">
      {/* ── Sticky sidebar ─────────────────────────────────────────────── */}
      {/* self-start prevents the flex child from stretching to full height,
          which is required for sticky to engage. */}
      <div className="w-full md:sticky md:top-8 md:w-1/3 md:self-start">
        <CvSidebar />
      </div>

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <div className="flex w-full flex-col gap-6 md:w-2/3">
        {/* Heading + bio */}
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <h2 className="font-heading text-foreground text-3xl leading-tight font-bold text-balance md:text-4xl">
              Smart CV, <span className="text-primary">Human first.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I build digital bridges. As a{" "}
              <a
                href="https://muggleborn.dev"
                className="text-primary underline-offset-2 hover:underline"
              >
                Muggleborn Developer
              </a>
              , I pride myself on translating complex technical architectures into intuitive,
              high-end human experiences. I believe the best software isn&apos;t just
              &ldquo;bug-free&rdquo; — it&apos;s articulate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not configuring{" "}
              <a
                href="https://lazyvim.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                LazyVim
              </a>{" "}
              or wrestling with CSS grid layouts, you&apos;ll find me hiking the trails around
              Melbourne, submerged in a reef with a scuba tank, or deeply immersed in an RPG. I
              value precision in my code and presence in my life.
            </p>
          </CardContent>
        </Card>

        <CvTimelineWrapper />
        <CvInterests />
        <ContactCard />
      </div>
    </div>
  );
}
