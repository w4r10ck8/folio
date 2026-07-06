// src/components/footer/index.tsx
import type { ReactNode } from "react";

import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

const SOCIAL_LINKS = [
  { label: "GITHUB", index: "01", href: ROUTE_MANAGER.external.github, isMailto: false },
  { label: "LINKEDIN", index: "02", href: ROUTE_MANAGER.external.linkedin, isMailto: false },
  { label: "EMAIL", index: "03", href: ROUTE_MANAGER.external.email, isMailto: true },
] as const;

export function Footer(): ReactNode {
  return (
    <footer className="border-border/50 bg-background fixed right-0 bottom-0 left-0 z-0 flex h-(--footer-height) w-full items-center border-t">
      <div className="container mx-auto flex w-full flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between md:gap-0">
        {/* Left — brand + tagline */}
        <div>
          <p className="font-heading text-4xl font-bold">
            <span className="text-foreground">muggleborn</span>
            <span className="text-primary">.dev</span>
          </p>
          <p className="text-muted-foreground mt-3 max-w-xs font-mono text-[10px] leading-relaxed tracking-wider uppercase">
            Designed &amp; engineered with precision in Melbourne.
            <br />
          </p>
          <p className="text-muted-foreground mt-1.5 font-mono text-[10px]">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

        {/* Right — social links */}
        <nav aria-label="Social links" className="flex gap-8">
          {SOCIAL_LINKS.map(({ label, index, href, isMailto }) => (
            <a
              key={label}
              href={href}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              className="group text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {label}
              <span className="text-primary tabular-nums">{index}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
