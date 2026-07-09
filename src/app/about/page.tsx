// src/app/about/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SmartCV } from "@/components/about";
import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Learn about Jay Pancholi — full-stack developer based in Melbourne, Australia. TypeScript, React, and Next.js specialist.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.about}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.about}`,
    title: "About | Jay Pancholi",
    description,
  },
  twitter: {
    title: "About | Jay Pancholi",
    description,
  },
};

export default function AboutPage(): ReactNode {
  return (
    <main>
      <SmartCV />
    </main>
  );
}
