// src/components/about/cv-education.tsx
import { GraduationCap } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABOUT_EDUCATION } from "@/lib/constants/about";

export function CvEducation(): ReactNode {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl font-bold">Education</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        {ABOUT_EDUCATION.map((edu) => (
          <div
            key={edu.institution}
            className="border-border bg-muted/40 relative overflow-hidden rounded-xl border p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-foreground font-semibold">{edu.degree}</h3>
                <p className="text-primary text-sm font-medium">{edu.institution}</p>
                {edu.major && (
                  <p className="text-muted-foreground font-mono text-xs">{edu.major}</p>
                )}
                {edu.description && (
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="text-muted-foreground font-mono text-sm tabular-nums">
                  {edu.duration}
                </span>
                <GraduationCap size={32} className="text-muted-foreground/20" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
