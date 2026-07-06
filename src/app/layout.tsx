// src/app/layout.tsx
import { BriefcaseBusiness, CircleUser, Earth, Github, House, Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/cursor";
import { Dock, type DockItem } from "@/components/dock";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

import "./globals.css";

const DOCK_ITEMS: Array<DockItem> = [
  { label: "Home", href: ROUTE_MANAGER.home, icon: <House size={24} /> },
  { label: "Projects", href: ROUTE_MANAGER.projects, icon: <BriefcaseBusiness size={24} /> },
  { label: "About", href: ROUTE_MANAGER.about, icon: <CircleUser size={24} /> },
  { type: "separator" },
  {
    label: "Social",
    icon: <Earth size={24} />,
    children: [
      { label: "Email", href: ROUTE_MANAGER.external.email, icon: <Mail size={24} /> },
      { label: "LinkedIn", href: ROUTE_MANAGER.external.linkedin, icon: <Linkedin size={24} /> },
      { label: "GitHub", href: ROUTE_MANAGER.external.github, icon: <Github size={24} /> },
    ],
  },
];

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background pointep-ovents-none reinter-events-none box-shadow:0_40px_80px_-20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] relative z-10 bg-clip-content">
            {children}
          </div>
          <Footer />
          <Dock items={DOCK_ITEMS} themeToggle />
          <CustomCursor />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
