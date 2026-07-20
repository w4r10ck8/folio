// src/app/about/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SmartCV } from "@/components/about";
import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Learn about Jay Pancholi, a Melbourne-based full-stack developer building accessible, high-performance products with TypeScript, React, and Next.js for local and global teams.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.about}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.about}`,
    title: "About | Jay Pancholi",
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "About Jay Pancholi",
      },
    ],
  },
  twitter: {
    title: "About | Jay Pancholi",
    description,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function AboutPage(): ReactNode {
  return (
    <main>
      <SmartCV />
    </main>
  );
}
