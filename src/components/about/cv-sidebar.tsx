// src/components/about/cv-sidebar.tsx
"use client";

import { MapPin, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ABOUT_SKILLS } from "@/lib/constants/about";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

export function CvSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <Card>
        {/* Avatar placeholder */}
        <div className="border-border bg-muted mx-auto flex aspect-square w-full max-w-60 items-center justify-center overflow-hidden rounded-2xl border md:mx-0">
          <span className="font-heading text-muted-foreground text-6xl font-bold select-none">
            JP
          </span>
        </div>

        {/* Identity */}
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-foreground text-2xl leading-tight font-bold">
            Jay <span className="text-primary">&ldquo;Muggleborn&rdquo;</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Senior Full-Stack Developer</p>
          <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
            <MapPin size={13} />
            <span>Melbourne, Australia</span>
          </div>
        </div>

        {/* Print button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 print:hidden"
          onClick={() => window.print()}
        >
          <Printer size={14} />
          Print Smart CV
        </Button>

        {/* Skills */}
        <div className="flex flex-col gap-5">
          {ABOUT_SKILLS.map((group) => (
            <div key={group.name} className="flex flex-col gap-2">
              <h3 className="text-muted-foreground font-mono text-xs font-semibold tracking-widest uppercase">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.categories.flatMap((cat) =>
                  cat.skills.map((skill) => (
                    <span
                      key={skill}
                      title={cat.tooltip}
                      className={cn(
                        "border-border bg-secondary text-secondary-foreground",
                        "cursor-default rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      )}
                    >
                      {skill}
                    </span>
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
