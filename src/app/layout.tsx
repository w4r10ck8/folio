// src/app/layout.tsx
import { BriefcaseBusiness, CircleUser, House, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/cursor";
import { DevtoolsGate } from "@/components/devtools-guard";
import { Dock, type DockItem } from "@/components/dock";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TWITTER_HANDLE,
  SITE_URL,
} from "@/lib/constants";
import { ROUTE_MANAGER } from "@/lib/constants/route-manager";

import "./globals.css";

const DOCK_ITEMS: Array<DockItem> = [
  { label: "Home", href: ROUTE_MANAGER.home, icon: <House size={24} /> },
  { label: "Projects", href: ROUTE_MANAGER.projects, icon: <BriefcaseBusiness size={24} /> },
  { label: "About", href: ROUTE_MANAGER.about, icon: <CircleUser size={24} /> },
  { label: "Contact", href: ROUTE_MANAGER.contact, icon: <Mail size={24} /> },
  { type: "separator" },
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jay Pancholi | Developer",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Jay Pancholi | Developer",
    title: "Jay Pancholi | Developer",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Jay Pancholi | Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Pancholi | Developer",
    description: SITE_DESCRIPTION,
    creator: SITE_TWITTER_HANDLE,
    images: [`${SITE_URL}/opengraph-image`],
  },
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
          <TooltipProvider>
            <DevtoolsGate>
              <div className="bg-background relative z-10 mb-(--footer-height) bg-clip-content">
                {children}
              </div>
              <Footer />
              <Dock items={DOCK_ITEMS} themeToggle />
              <CustomCursor />
              <Toaster />
            </DevtoolsGate>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
