// src/app/services/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">Services</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </main>
  );
}
