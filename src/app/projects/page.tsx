// src/app/projects/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Projects } from "@/components/projects";
import { ProjectsHeroBanner } from "@/components/projects-hero-banner";
import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Explore project case studies by Jay Pancholi featuring React, Next.js, TypeScript, performance-first architecture, and accessible UX patterns.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.projects}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.projects}`,
    title: "Projects | Jay Pancholi",
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Jay Pancholi Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | Jay Pancholi",
    description,
    images: [`${SITE_URL}/opengraph-image`],
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
