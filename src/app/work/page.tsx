// src/app/work/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const description =
  "Jay Pancholi's work history and professional experience in full-stack web development.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: `${SITE_URL}${ROUTE_MANAGER.work}` },
  openGraph: {
    url: `${SITE_URL}${ROUTE_MANAGER.work}`,
    title: "Work | Jay Pancholi",
    description,
  },
  twitter: {
    title: "Work | Jay Pancholi",
    description,
  },
};

export default function WorkPage(): ReactNode {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-foreground text-4xl font-bold tracking-tight">Work</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </main>
  );
}
