// src/components/about/cv-sidebar.tsx
"use client";

import Image from "next/image";

import { Briefcase, MapPin } from "lucide-react";

import { ABOUT_SKILLS } from "@/lib/constants/about";
import { CURRENT_EMPLOYER, CURRENT_EMPLOYER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CvSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      {/* Card 1 — Profile */}
      <Card className="flex flex-col gap-6 p-6">
        {/* Avatar */}
        <Image
          src="/jay.jpeg"
          alt="Jay Pancholi"
          width={400}
          height={400}
          className="aspect-square w-full rounded-xl object-cover"
          priority
        />

        {/* Heading */}
        <h2 className="font-sans text-lg font-semibold md:text-2xl">Hey again! 👋🏻</h2>

        {/* Bio */}
        <p className="text-muted-foreground leading-relaxed">
          Senior Software Engineer with a Master of Information Technology from Swinburne
          University. Experienced in architecting and delivering scalable web applications, driving
          technical direction, mentoring developers, and building modern full-stack solutions with a
          strong focus on performance, accessibility, and exceptional user experiences.
        </p>

        <p className="text-muted-foreground">🚀 Always learn, always improve.</p>

        {/* Location + employer */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-muted-foreground/30 w-1/2 gap-1.5">
            <MapPin size={13} />
            Melbourne
          </Button>
          <Button variant="outline" size="sm" asChild className="border-muted-foreground/30 w-1/2">
            <a href={CURRENT_EMPLOYER_URL} target="_blank" rel="noopener noreferrer">
              <Briefcase size={13} />
              {CURRENT_EMPLOYER}
            </a>
          </Button>
        </div>
      </Card>

      {/* Card 2 — Skills */}
      <Card className="flex flex-col gap-0 p-6">
        <h2 className="font-sans text-lg font-semibold md:text-2xl">Skills</h2>
        <div>
          {ABOUT_SKILLS.map((group) => (
            <div key={group.name} className="flex flex-col">
              <h3 className="my-3 text-sm font-bold">{group.name}</h3>
              <div className="flex flex-wrap gap-2">
                {group.categories.flatMap((cat) =>
                  cat.skills.map((skill) => (
                    <Tooltip key={skill}>
                      <TooltipTrigger asChild>
                        <span
                          data-cursor-expand
                          className={cn(
                            "border-border bg-secondary text-secondary-foreground",
                            "cursor-help rounded-full border px-2.5 py-0.5",
                            "hover:bg-primary hover:text-primary-foreground transition-all duration-300",
                          )}
                        >
                          <code className="text-xs">{skill}</code>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">{cat.tooltip}</TooltipContent>
                    </Tooltip>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
