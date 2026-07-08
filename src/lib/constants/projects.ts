// src/lib/constants/projects.ts

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
    subtitle: "Share secrets that self-destruct after one view",
    description:
      "A secure, privacy-focused web app for sharing passwords, API keys, and confidential messages. Every secret is encrypted server-side and permanently deleted the moment it's revealed — it can never be accessed again.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/jaypancholi94/obliviate",
    preview: "https://obliviate.muggleborn.dev",
    tags: ["Next.js", "TypeScript", "Firebase", "React Query", "shadcn/ui", "Tailwind CSS"],
    status: "live",
    featured: true,
  },
  {
    title: "Gringotts",
    subtitle: "Goblin-grade invoicing and client management",
    description:
      "A full-stack financial dashboard for freelancers and small teams. Manage clients, raise invoices, track transactions, and generate reports — all behind a secure auth wall.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/w4r10ck8/gringotts",
    preview: "https://gringotts.muggleborn.dev",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "next-auth", "React Query", "Recharts"],
    status: "wip",
    featured: true,
  },
  {
    title: "Room of Requirement",
    subtitle: "Developer utilities that appear exactly when you need them",
    description:
      "A searchable collection of developer tools — converters, formatters, generators, and more. Search, click, done. It gives you what you need, when you need it.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/jaypancholi94/room-of-requirement",
    preview: "https://ror.muggleborn.dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    status: "live",
    featured: true,
  },
  {
    title: "Mischief Managed",
    subtitle: "Track trips, expenses and members in one place",
    description:
      "A group trip and expense manager. Create trips, log events, track costs, and manage who owes what — built for friend groups and small teams that go places together.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/w4r10ck8/mischief-managed",
    preview: null,
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "next-auth", "React Query"],
    status: "wip",
    featured: false,
  },
  {
    title: "Howler",
    subtitle: "Schema-driven multi-step form wizard",
    description:
      "A multi-step form framework built around schema-driven configuration. Each step is independently validated and the whole thing is wired up with a dev tooling panel for rapid iteration.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/w4r10ck8/howler",
    preview: "https://howler.muggleborn.dev",
    tags: ["Next.js", "TypeScript", "React Hook Form", "Zod", "React Query"],
    status: "wip",
    featured: false,
  },
  {
    title: "Divination",
    subtitle: "A showcase of polished dashboard and auth UI patterns",
    description:
      "A UI pattern library exploring multiple design approaches for dashboards, login screens, and signup flows. Useful as a reference or starting point for new projects.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/w4r10ck8/divination",
    preview: "https://divination.muggleborn.dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "dnd-kit", "Recharts", "Redux"],
    status: "wip",
    featured: false,
  },
  {
    title: "SpellBook",
    subtitle: "My little corner of the internet for all things dev",
    description:
      "A personal developer handbook and blog — code snippets, notes, and ramblings. It updates and deploys as new notes are jotted down. Think of it as a digital scrapbook for everything dev-related.",
    thumbnail: null,
    screenshots: [],
    github: "https://github.com/jaypancholi94/spellbook",
    preview: "https://spellbook.muggleborn.dev",
    tags: ["VitePress", "Vue", "Markdown"],
    status: "live",
    featured: false,
  },
  {
    title: "Revelio",
    subtitle: "Interactive quiz platform",
    description:
      "A web app that lets you create and share interactive quizzes. Users can answer questions, get instant feedback, and see their scores at the end.",
    thumbnail: null,
    screenshots: [],
    github: "",
    status: "live",
    preview: "",
    featured: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
  },
];
