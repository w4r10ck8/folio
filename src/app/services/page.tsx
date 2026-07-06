// src/app/services/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Web development services offered by Jay Pancholi — from MVPs to production-grade React and Next.js applications.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.services}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.services}`,
    title: "Services | Jay Pancholi",
    description,
  },
  twitter: {
    title: "Services | Jay Pancholi",
    description,
  },
};

export default function ServicesPage(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">Services</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </main>
  );
}
