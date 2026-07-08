// src/app/projects/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Projects } from "@/components/projects";
import { ProjectsHeroBanner } from "@/components/projects-hero-banner";
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
    <main>
      <div className="container mx-auto">
        <ProjectsHeroBanner />
        <Projects />
      </div>
    </main>
  );
}
