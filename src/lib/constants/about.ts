// src/lib/constants/about.ts
// All data for the About / Smart CV page.

// ── Types ─────────────────────────────────────────────────────────────────

export interface AboutSkillCategory {
  tooltip: string;
  skills: Array<string>;
}

export interface AboutSkillGroup {
  name: string;
  categories: Array<AboutSkillCategory>;
}

export interface AboutHighlight {
  title?: string;
  highlights: Array<string>;
}

export interface AboutExperience {
  company: string;
  website?: string;
  role: string;
  location: string;
  duration: string;
  overview?: string;
  responsibilities: Array<AboutHighlight>;
  tags: Array<string>;
}

export interface AboutEducation {
  institution: string;
  degree: string;
  duration: string;
  major?: string;
  description?: string;
}

// ── Experience ────────────────────────────────────────────────────────────

export const ABOUT_EXPERIENCE: Array<AboutExperience> = [
  {
    company: "Exco Partners",
    website: "https://excopartners.com.au",
    role: "Full Stack Developer",
    location: "Melbourne",
    duration: "2023 — Present",
    overview:
      "Currently contributing to the Fair Work Commission's Customer Service Platform, focused on modernising and enhancing the user experience for Australian workers and employers.",
    responsibilities: [
      {
        title: "Fair Work Commission",
        highlights: [
          "Led architectural planning for the frontend and CRM integration — defined how dynamic form data is structured and stored in Dataverse, aligning with long-term platform goals.",
          "Built schema-driven forms with React Hook Form + Zod, enabling scalable and reusable validation logic.",
          "Integrated with Dataverse CRM using OData and REST APIs for robust backend communication.",
          "Implemented React Query for API data fetching, caching, and synchronisation with minimal boilerplate.",
          "Wrote unit tests with Vitest to ensure reliability across shared components and utilities.",
          "Developed reusable field components driven by schema and context, reducing duplication and improving dev velocity.",
        ],
      },
    ],
    tags: ["#Architect", "#Forms", "#NextJS"],
  },
  {
    company: "inlight",
    website: "https://inlight.com.au",
    role: "Full Stack Developer",
    location: "Melbourne",
    duration: "2021 — 2023",
    overview:
      "Worked closely with the inlight team using agile methodology to deliver high-quality solutions across a diverse range of clients.",
    responsibilities: [
      {
        title: "Transport Accident Commission (TAC)",
        highlights: [
          "Built front-end search functionality, filters, and pages using TypeScript and Next.js.",
          "Developed unit tests and Cypress tests to ensure reliability and robustness.",
          "Ensured full accessibility of components and pages to meet AAA standards.",
        ],
      },
      {
        title: "Nando's AU & NZ",
        highlights: [
          "Led a comprehensive UI overhaul for the Australian and New Zealand websites.",
          "Implemented Framer Motion animations to enhance the user experience.",
          "Utilised LaunchDarkly feature toggles to efficiently manage test components.",
        ],
      },
      {
        title: "Solstice Energy",
        highlights: [
          "Designed and developed components in Vanilla Extract for Sanity CMS.",
          "Created a custom multi-file upload feature integrating with Resend for automated email delivery.",
        ],
      },
    ],
    tags: ["#Scaling", "#A11y", "#Animation"],
  },
  {
    company: "Zash Ventures",
    role: "Full Stack Developer",
    location: "Melbourne",
    duration: "2021 — 2022",
    overview:
      "Designed the system architecture for Veztr — a platform bridging investors and startups.",
    responsibilities: [
      {
        highlights: [
          "Designed the system architecture for Veztr end-to-end.",
          "Built REST APIs using Node.js and Express.js with Sequelize ORM for MySQL database management.",
          "Delivered the Veztr app using agile methodology in a fast-paced startup environment.",
        ],
      },
    ],
    tags: ["#Startup", "#Node", "#Architecture"],
  },
  {
    company: "C2 Capital",
    role: "WordPress Developer",
    location: "Melbourne",
    duration: "2020 — 2021",
    overview: "Developed an online LMS using PHP, Node.js, React, and WordPress.",
    responsibilities: [
      {
        highlights: [
          "Designed a Node/Express API to handle requests and filters efficiently.",
          "Integrated Stripe as a payment gateway for seamless and secure transactions.",
          "Implemented core business logic using an OOP-based PHP approach.",
        ],
      },
    ],
    tags: ["#WordPress", "#LMS", "#Stripe"],
  },
];

// ── Education ─────────────────────────────────────────────────────────────

export const ABOUT_EDUCATION: Array<AboutEducation> = [
  {
    institution: "Swinburne University of Technology",
    degree: "Master of Information Technology",
    duration: "2017 — 2019",
    major: "Major in Software Engineering",
    description:
      "High Distinction average with a focus on Distributed Systems and Human-Computer Interaction.",
  },
  {
    institution: "CHARUSAT University",
    degree: "Bachelor of Information Technology",
    duration: "2012 — 2016",
    description: "Foundation in Computer Science, algorithms, and software development.",
  },
];

// ── Skills ────────────────────────────────────────────────────────────────

export const ABOUT_SKILLS: Array<AboutSkillGroup> = [
  {
    name: "Front End",
    categories: [
      {
        tooltip: "JavaScript Frameworks",
        skills: ["TypeScript", "React", "Next.js", "Astro", "React Native"],
      },
      { tooltip: "UI", skills: ["Storybook"] },
      { tooltip: "Testing", skills: ["Unit Testing", "Jest", "Vitest", "Cypress"] },
      {
        tooltip: "Style",
        skills: ["Tailwind", "Vanilla Extract", "MUI", "Styled System", "CSS"],
      },
      { tooltip: "State Management", skills: ["MobX", "Redux", "React Context"] },
    ],
  },
  {
    name: "Back End",
    categories: [
      { tooltip: "Node Framework", skills: ["Node.js", "Express.js"] },
      { tooltip: "Languages", skills: ["PHP", "Java"] },
      { tooltip: "CMS", skills: ["Sanity", "WordPress", "Craft"] },
      { tooltip: "Databases", skills: ["SQL", "MongoDB"] },
    ],
  },
  {
    name: "DevOps",
    categories: [
      { tooltip: "CI/CD", skills: ["Vercel", "GitHub Actions"] },
      { tooltip: "Version Control", skills: ["Git"] },
    ],
  },
  {
    name: "Tools",
    categories: [
      { tooltip: "Design", skills: ["Figma"] },
      { tooltip: "Project Management", skills: ["Jira", "ClickUp", "Trello"] },
      { tooltip: "IDE", skills: ["nvim", "VS Code"] },
    ],
  },
];
