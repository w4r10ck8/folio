// src/app/page.tsx
import type { ReactNode } from "react";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export default function HomePage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">{SITE_NAME}</h1>
        <p className="text-muted-foreground max-w-prose">{SITE_DESCRIPTION}</p>
      </div>
    </main>
  );
}
