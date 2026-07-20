// src/app/contact/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Contact } from "@/components/contact";
import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Get in touch with Jay Pancholi — open to new projects, collaborations, and conversations.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.contact}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.contact}`,
    title: "Contact | Jay Pancholi",
    description,
  },
  twitter: {
    title: "Contact | Jay Pancholi",
    description,
  },
};

export default function ContactPage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col">
      <Contact />
    </main>
  );
}
