// src/lib/constants/projects.ts

import type { LucideIcon } from "lucide-react";

export type ProjectStatus = "live" | "archived" | "wip" | "closed-beta";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string | null;
  screenshots: Array<string>;
  github: string | null;
  preview: string | null;
  tags: Array<string>;
  status: ProjectStatus;
  featured: boolean;
}

export const PROJECTS: Array<Project> = [
  {
    title: "Obliviate",
    subtitle: "One-Time Secret Sharing",
    description:
      "A magical one-time secret sharing service — self-hosted, secure, and ephemeral. Secrets are encrypted client-side using AES-256-GCM with PBKDF2 key derivation, so even admins can't read them. Only the person with the link can reveal the message, and it self-destructs after a single view.",

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "Firestore",
      "AES-256-GCM",
      "PBKDF2",
      "Tailwind CSS",
      "Radix UI",
      "TanStack Query",
      "React Hook Form",
      "Framer Motion",
      "Node.js",
    ],
    thumbnail: "/projects/obliviate/thumbnail.png",
    screenshots: [
      "/projects/obliviate/dark-01.png",
      "/projects/obliviate/dark-02.png",
      "/projects/obliviate/dark-03.png",
      "/projects/obliviate/dark-04.png",
      "/projects/obliviate/light-01.png",
      "/projects/obliviate/light-02.png",
      "/projects/obliviate/light-03.png",
      "/projects/obliviate/light-04.png",
    ],
    github: "https://github.com/jaypancholi94/obliviate",
    preview: "https://obliviate.muggleborn.dev",
    status: "live",
    featured: true,
  },
  {
    title: "Gringotts",

    subtitle: "Your Financial Command Center",

    description: `Gringotts is a full-stack invoice and client management platform built for freelancers. It replaces the chaos of spreadsheets and generic accounting tools with a single, structured workflow — from onboarding a client through to tax-ready records.

The app supports multi-tenant architecture, meaning each user operates in an isolated workspace. Clients, projects, and invoices are linked together so every invoice has full context behind it. Flexible invoicing supports milestone-based billing, upfront deposits, and custom line items — matching how freelancers actually work.

Invoices are shared via secure, token-based links with optional expiry controls — no client login required. A live financial snapshot surfaces revenue, outstanding balances, and overdue payments at a glance, with exportable records for tax filing and reconciliation.

Built with a layered backend (repositories → services → API routes), strict TypeScript, Zod validation at every boundary, and a polished UI using shadcn/ui and Tailwind CSS v4.`,

    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "React Query",
      "React Hook Form",
      "Zod",
      "shadcn/ui",
      "Tailwind CSS v4",
      "Radix UI",
      "TanStack Table",
      "Recharts",
      "Motion",
      "Puppeteer",
      "Vitest",
      "Storybook",
    ],
    thumbnail: "/projects/gringotts/thumbnail.png",
    screenshots: ["/projects/gringotts/thumbnail.png"],
    github: "https://github.com/w4r10ck8/gringotts",
    preview: "https://gringotts.muggleborn.dev",
    status: "closed-beta",
    featured: true,
  },
  {
    title: "Room of Requirement",
    subtitle: "Developer utilities that appear exactly when you need them.",
    description: `A collection of browser-based developer tools organized into searchable "artifacts". 
Covers converters (Base64, case, color, date, Markdown-to-HTML, NATO alphabet), development tools 
(chmod calculator, crontab generator, diff checker, JS playground, regex tester, UUID v1/v4/v5/v7 
generator), creative utilities (email signature generator, wallpaper generator, QR code generator 
supporting URL/Wi-Fi/vCard/SMS/geo), and network tools (DNS lookup, IPv4 subnet calculator, WHOIS 
lookup via RDAP). All tools run client-side with a global command palette for instant access, 
dark/light/system theme support, and a responsive split-layout UI.`,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Radix UI",
      "Lucide React",
      "Zod",
      "React Hook Form",
      "next-themes",
      "date-fns",
      "Vitest",
      "Vercel",
    ],
    thumbnail: "/projects/ror/thumbnail.png",
    screenshots: ["/projects/ror/thumbnail.png"],
    github: "https://github.com/jaypancholi94/room-of-requirement",
    preview: "https://ror.muggleborn.dev",
    status: "live",
    featured: true,
  },
  {
    title: "Divination",
    subtitle: "Bridge Design And Development In One Connected Workflow",
    description: `Divination is a design-system connector app that helps teams move from concepts to production faster. It provides a centralised theme configuration panel where you can define brand colours, typography (Sans/Serif/Mono), spacing, shadows, and border radius — then export and share those configs across projects. The app includes a full UI component library (40+ components), multi-variant auth flows, a data dashboard with charts and tables, live theme previewing with Light/Dark/System mode support, and a drag-and-drop sortable interface. It ships with multiple login and signup page variants (v1–v5) so design teams can prototype and compare handoff-ready layouts side by side.`,
    tags: [
      // Core Framework
      "Next.js 16",
      "React 19",
      "TypeScript",

      // Styling
      "Tailwind CSS v4",
      "shadcn/ui",
      "Radix UI",
      "class-variance-authority",
      "tw-animate-css",

      // State Management
      "Redux Toolkit",
      "React Redux",

      // Animation & Effects
      "Motion (Framer Motion)",
      "Rough Notation",

      // Drag & Drop
      "dnd-kit",

      // Data & Tables
      "TanStack Table",
      "Recharts",

      // Icons
      "Lucide React",
      "Tabler Icons",
      "Radix Icons",

      // Forms & Validation
      "Zod",

      // UI Utilities
      "Sonner",
      "Vaul",
      "next-themes",

      // Tooling
      "ESLint",
      "Prettier",
    ],
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/w4r10ck8/divination",
    preview: "https://divination.muggleborn.dev",
    status: "live",
    featured: false,
  },
  {
    title: "SpellBook",
    subtitle: "A Developer's Grimoire of Hard-Won Knowledge & Craft",
    description:
      "A personal developer knowledge base and digital garden covering JavaScript, TypeScript, React, Vue.js, Git, AWS, and full-stack development. An ever-growing wiki of practical patterns, best practices, and reference notes — auto-deployed as new content is added.",
    tags: [
      "VitePress",
      "TypeScript",
      "Obsidian",
      "Markdown",
      "Mermaid",
      "Bun",
      "Prettier",
      "Husky",
      "lint-staged",
      "markdownlint",
      "Vercel",
      "Node.js",
    ],
    thumbnail: "/projects/spellbook/thumbnail.png",
    screenshots: ["/projects/spellbook/thumbnail.png"],
    github: "https://github.com/jaypancholi94/spellbook",
    preview: "https://spellbook.muggleborn.dev",
    status: "live",
    featured: false,
  },
  {
    title: "Revelio",
    subtitle: "Chrome Extension for Keyboard Accessibility Inspection",
    description:
      "A Chrome extension built for developers and accessibility testers to visualise and debug how keyboard users experience a web page. Revelio overlays focus rings, tab order badges, and a heatmap directly onto the page, flags WCAG violations with warning badges, and logs every focus event in a side panel with full element metadata and JSON/CSV export. Settings can be scoped globally or overridden per URL.",
    tags: [
      "TypeScript",
      "React 19",
      "Vite 6",
      "Tailwind CSS 4",
      "Chrome Extension",
      "Manifest V3",
      "Web Accessibility",
      "WCAG",
      "vite-plugin-web-extension",
      "Shadow DOM",
      "Service Worker",
      "Content Script",
    ],
    thumbnail: "/projects/revelio/thumbnail.png",
    screenshots: ["/projects/revelio/thumbnail.png"],
    github: null,
    status: "live",
    preview:
      "https://chromewebstore.google.com/detail/gebcmdddadighnadfnlmpdiggkgnnabh?utm_source=item-share-cb",
    featured: false,
  },
];

export interface HobbyProject {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  github: string | null;
  preview: string | null;
  tags: Array<string>;
}

import { Trophy, Bot, Server, LayoutGrid } from "lucide-react";

export const HOBBY_PROJECTS: Array<HobbyProject> = [
  {
    title: "Nobel Prize Search",
    subtitle: "Real-Time Fuzzy Search Over Nobel Prize Data",
    description:
      "A search app that updates results in real-time as you type, with quality-ranked output so the most relevant laureates surface first. Uses Fuse.js for fuzzy matching, useEffect-based debouncing to cut down API calls, and pagination to keep large result sets manageable. Queries are shareable via URL, and the UI is fully responsive with accessible components from shadcn/ui.",
    icon: Trophy,
    github: "https://github.com/jaypancholi94/nobel-prize-search",
    preview: "https://nobel-prize-search.vercel.app/",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Fuse.js", "shadcn/ui"],
  },
  {
    title: "Robot Simulation",
    subtitle: "Toy Robot on a 5×5 Grid",
    description:
      "A web app for simulating a toy robot moving around a 5×5 grid. Built as a take-home challenge with intuitive move and rotate controls, edge detection to prevent the robot falling off, and a clean minimalistic design inspired by Bellroy.",
    icon: Bot,
    github: "https://github.com/jaypancholi94/robot-simulator",
    preview: "https://robot-simulator-bellroy.vercel.app/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Ticket Management System API",
    subtitle: "REST API with JWT Auth — Learning Project",
    description:
      "Built early on to understand authentication and REST API mechanics. A Node.js/Express backend with Sequelize for database management, JWT for auth, and bcrypt for password hashing. Covers user creation, ticket creation, updating, and deletion.",
    icon: Server,
    github: "https://github.com/jaypancholi94/Ticket-Management-System-API",
    preview: null,
    tags: ["JavaScript", "Node.js", "Express", "Sequelize", "JWT", "bcrypt", "mysql2"],
  },
  {
    title: "2048",
    subtitle: "The Classic Sliding Puzzle, Rebuilt with React + Redux",
    description:
      "A replica of the 2048 game built to learn Redux state management. Core logic uses matrix transpose methods for tile merging, the UI is built with Material-UI, and the grid size is configurable from 2×2 up to 8×8.",
    icon: LayoutGrid,
    github: "https://github.com/jaypancholi94/2048",
    preview: "https://2048-the-game.vercel.app/",
    tags: ["React", "Redux", "Material-UI", "Vercel"],
  },
];
