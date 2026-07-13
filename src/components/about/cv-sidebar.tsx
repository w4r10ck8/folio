// src/components/about/cv-sidebar.tsx
"use client";

import { MapPin, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ui/profile-card";
import { ABOUT_SKILLS } from "@/lib/constants/about";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

export function CvSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <Card>
        <ProfileCard
          avatarUrl="/avatar.jpg"
          name="Jay Pancholi"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={true}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          iconUrl="/company/fwc.svg"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />

        {/* Location */}
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <MapPin size={13} />
          <span>Melbourne, Australia</span>
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
