// src/app/page.tsx
import type { ReactNode } from "react";

import { HeroBanner } from "@/components/hero-banner";

export default function HomePage(): ReactNode {
  return (
    <main>
      <HeroBanner />
    </main>
  );
}
