// src/app/contact/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Contact } from "@/components/contact";
import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Contact Jay Pancholi for full-stack development projects, frontend consulting, collaborations, and remote opportunities.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.contact}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.contact}`,
    title: "Contact | Jay Pancholi",
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Contact Jay Pancholi",
      },
    ],
  },
  twitter: {
    title: "Contact | Jay Pancholi",
    description,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function ContactPage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col">
      <Contact />
    </main>
  );
}
