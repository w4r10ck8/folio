// src/app/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Contact } from "@/components/contact";
import { HeroBanner } from "@/components/hero-banner";
import { ContactCard } from "@/components/idea-brewing";
import { Timeline } from "@/components/timeline";
import { WorkedWith } from "@/components/worked-with";
import {
  CURRENT_EMPLOYER,
  CURRENT_EMPLOYER_URL,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.home}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.home}`,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  url: SITE_URL,
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: CURRENT_EMPLOYER,
    url: CURRENT_EMPLOYER_URL,
  },
  sameAs: [ROUTE_MANAGER.external.github, ROUTE_MANAGER.external.linkedin],
};

export default function HomePage(): ReactNode {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroBanner />
        <WorkedWith />
        <Timeline />
        <ContactCard />
      </main>
    </>
  );
}
