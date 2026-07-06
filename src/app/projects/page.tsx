// src/app/projects/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "A showcase of projects built by Jay Pancholi — React, Next.js, TypeScript, and more.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.projects}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.projects}`,
    title: "Projects | Jay Pancholi",
    description,
  },
  twitter: {
    title: "Projects | Jay Pancholi",
    description,
  },
};

export default function ProjectsPage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">Projects</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </main>
  );
}
