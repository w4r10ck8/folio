"use client";

import { cn } from "@/lib/utils";
import { TypingAnimation } from "@/components/ui/typing-animation";

interface TerminalCommandProps {
  children: string;
  /** "default" = matrix-green (on standard bg), "onPrimary" = muted on primary-coloured card */
  variant?: "default" | "onPrimary";
  /** "sm" (default) for section labels; "base" for hero-sized usage */
  size?: "sm" | "base";
  className?: string;
}

export function TerminalCommand({
  children,
  variant = "default",
  size = "sm",
  className,
}: TerminalCommandProps) {
  const isOnPrimary = variant === "onPrimary";
  const colorStyle = isOnPrimary ? undefined : { color: "var(--matrix-green)" };
  const colorClass = isOnPrimary ? "text-primary-foreground/50" : "";

  const promptClass = size === "base" ? "font-mono text-base md:text-lg" : "font-mono text-sm";
  const textClass = size === "base" ? "font-mono text-base" : "font-mono text-sm";

  return (
    <div className={cn("flex items-center gap-1.5", colorClass, className)} style={colorStyle}>
      <span className={promptClass}>$</span>
      <TypingAnimation
        className={textClass}
        cursorStyle="block"
        showCursor
        blinkCursor
        startOnView={size !== "base"}
      >
        {children}
      </TypingAnimation>
    </div>
  );
}
