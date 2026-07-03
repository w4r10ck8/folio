// src/app/page.tsx
import type { ReactNode } from "react";

import { HeroBanner } from "@/components/hero-banner";
import { Timeline } from "@/components/timeline";

export default function HomePage(): ReactNode {
  return (
    <main>
      <HeroBanner />
      <Timeline />
    </main>
  );
}
