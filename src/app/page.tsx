// src/app/page.tsx
import type { ReactNode } from "react";

import { Contact } from "@/components/contact";
import { HeroBanner } from "@/components/hero-banner";
import { Timeline } from "@/components/timeline";

export default function HomePage(): ReactNode {
  return (
    <main>
      <HeroBanner />
      <Timeline />
      <Contact />
    </main>
  );
}
