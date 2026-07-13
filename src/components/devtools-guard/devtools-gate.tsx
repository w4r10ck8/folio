// src/components/devtools-guard/devtools-gate.tsx
"use client";

import type { ReactNode } from "react";

import { useDevtoolsOpen } from "@/hooks/use-devtools-open";

import { DevtoolsGuard } from "./devtools-guard";

interface DevtoolsGateProps {
  children: ReactNode;
}

/**
 * Swaps the real app tree out for DevtoolsGuard while devtools are open,
 * instead of layering a guard on top of it — so the real markup isn't
 * sitting in the DOM behind it for the Elements panel to read.
 */
export function DevtoolsGate({ children }: DevtoolsGateProps): ReactNode {
  const isOpen = useDevtoolsOpen();

  if (isOpen) return <DevtoolsGuard />;
  return children;
}
