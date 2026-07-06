// src/app/page.tsx
import type { ReactNode } from "react";

import { Contact } from "@/components/contact";
import { HeroBanner } from "@/components/hero-banner";
import { Timeline } from "@/components/timeline";
import { WorkedWith } from "@/components/worked-with";

export default function HomePage(): ReactNode {
  return (
    <main>
      <HeroBanner />
      <WorkedWith />
      <Timeline />
      <Contact />
    </main>
  );
}
