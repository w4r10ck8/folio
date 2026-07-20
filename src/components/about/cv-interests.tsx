// src/components/about/cv-interests.tsx
import { maskSnorkel } from "@lucide/lab";
import { Gamepad2, Icon, Mountain, Terminal } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Interest {
  label: string;
  icon: ReactNode;
  note?: string;
  badge?: string;
  wide?: boolean;
}

const INTERESTS: Array<Interest> = [
  { label: "PADI Scuba", icon: <Icon iconNode={maskSnorkel} size={28} /> },
  { label: "Hiking", icon: <Mountain size={28} /> },
  { label: "Gaming", icon: <Gamepad2 size={28} /> },
  {
    label: "LazyVim Enthusiast",
    icon: <Terminal size={20} />,
    note: "My config is my canvas.",
    badge: "CONFIGURED",
    wide: true,
  },
];

export function CvInterests(): ReactNode {
  const gridItems = INTERESTS.filter((i) => !i.wide);
  const wideItems = INTERESTS.filter((i) => i.wide);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-xl font-bold">Human Interests</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        {/* 3-column grid for regular interests */}
        <div className="grid grid-cols-3 gap-3">
          {gridItems.map((interest) => (
            <div
              key={interest.label}
              className="border-border bg-secondary/40 flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-5"
            >
              <span className="text-muted-foreground">{interest.icon}</span>
              <span className="text-foreground text-center text-sm font-medium">
                {interest.label}
              </span>
            </div>
          ))}
        </div>

        {/* Full-width wide cards */}
        {wideItems.map((interest) => (
          <div
            key={interest.label}
            className="border-border bg-secondary/40 flex items-center gap-4 rounded-xl border px-4 py-4"
          >
            <div className="bg-muted text-muted-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              {interest.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-sm font-semibold">{interest.label}</span>
              {interest.note && (
                <span className="text-muted-foreground text-xs italic">{interest.note}</span>
              )}
            </div>
            {interest.badge && (
              <span className="border-border text-muted-foreground ml-auto rounded-md border px-2 py-0.5 font-mono text-xs tracking-widest uppercase">
                {interest.badge}
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
