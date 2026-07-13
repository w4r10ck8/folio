// src/components/devtools-guard/devtools-guard.tsx
"use client";

import type { Route } from "next";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { House, Mail, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

import {
  DEVTOOLS_GUARD_EYEBROW,
  DEVTOOLS_GUARD_HEADING_BOLD,
  DEVTOOLS_GUARD_HEADING_ITALIC,
  DEVTOOLS_GUARD_SUBTEXT_LINE_1,
  DEVTOOLS_GUARD_SUBTEXT_LINE_2,
} from "./constants";

/**
 * Renders in place of the real page — see DevtoolsGate for the swap logic.
 * Not an overlay: when this is mounted, the real page markup isn't.
 */
export function DevtoolsGuard(): ReactNode {
  const primaryButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    primaryButtonRef.current?.focus();
  }, []);

  return (
    <main className="devtools-guard-active bg-background fixed inset-0 flex items-center justify-center p-6">
      <div className="border-border bg-background w-full max-w-sm rounded-2xl border p-8 text-center shadow-2xl">
        <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-12 items-center justify-center rounded-full">
          <WandSparkles className="size-5" />
        </div>

        <p className="text-muted-foreground mb-3 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          {DEVTOOLS_GUARD_EYEBROW}
        </p>

        <h1 className="font-heading text-foreground mb-4 text-2xl leading-tight sm:text-3xl">
          <span className="font-bold">{DEVTOOLS_GUARD_HEADING_BOLD}</span>{" "}
          <span className="text-muted-foreground font-normal italic">
            {DEVTOOLS_GUARD_HEADING_ITALIC}
          </span>
        </h1>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          {DEVTOOLS_GUARD_SUBTEXT_LINE_1}
          <br />
          {DEVTOOLS_GUARD_SUBTEXT_LINE_2}
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full gap-2">
            <Link href={ROUTE_MANAGER.home as Route} ref={primaryButtonRef}>
              <House className="size-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full gap-2">
            <Link href={ROUTE_MANAGER.contact as Route}>
              <Mail className="size-4" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
