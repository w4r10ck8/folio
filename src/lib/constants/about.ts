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
  location?: string;
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
          "Led architectural planning for the frontend and CRM integration - defined how dynamic form data is structured and stored in Dataverse, aligning with long-term platform goals.",
          "Built schema-driven forms with React Hook Form + Zod, enabling scalable and reusable validation logic.",
          "Integrated with Dataverse CRM using OData and REST APIs for robust backend communication.",
          "Implemented React Query for API data fetching, caching, and synchronisation with minimal boilerplate.",
          "Wrote unit tests with Vitest to ensure reliability across shared components and utilities.",
          "Developed reusable field components driven by schema and context, reducing duplication and improving dev velocity.",
        ],
      },
    ],
    tags: ["#Architecture", "#NextJS", "#Forms", "#Dynamics365", "#Zod", "#Vitest", "#Consulting"],
  },
  {
    company: "inlight",
    website: "https://inlight.com.au",
    role: "Full Stack Developer",
    location: "Melbourne",
    duration: "2021 — 2023",
    overview:
      "Worked closely with the inlight team using agile methodology to deliver high-quality solutions across a diverse range of clients. Proficient in front-end and back-end development, CMS management, UI/UX enhancements, and ensuring accessibility standards. Experienced in writing thorough documentation, conducting tests, and maintaining robust systems.",
    responsibilities: [
      {
        title: "Transport Accident Commission (TAC) — How Safe Is Your Car",
        highlights: [
          "Built front-end search functionality, filters, and ANCAP page using TypeScript and Next.js.",
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
          "Regularly updated and maintained promotional free delivery offers.",
        ],
      },
      {
        title: "Solstice Energy",
        highlights: [
          "Designed and developed components in Vanilla Extract for Sanity CMS.",
          "Connected form input fields to React Hook Form for efficient data handling.",
          "Created a custom multi-file upload feature integrating with Resend for automated email delivery.",
          "Configured CMS and maintained the front-end using TypeScript.",
        ],
      },
      {
        title: "Amplar Health",
        highlights: [
          "Managed and maintained systems for psychologists using a Next.js and TypeScript codebase, ensuring operational efficiency and prompt issue resolution.",
          "Provided client support, addressing needs and maintaining clear communication.",
          "Conducted regression testing after system updates to ensure continued functionality and stability.",
          "Handled regular deployments using Vercel, ensuring consistent and reliable application delivery.",
        ],
      },
      {
        title: "Vicinity Centres",
        highlights: [
          "Enhanced UI/UX by implementing front-end tweaks using React and Storyblok CMS.",
          "Developed a custom Vue.js plugin for Storyblok to automate promotions based on date and time logic.",
          "Wrote a Python script to bulk modify and remove unused fields in the mall database.",
        ],
      },
      {
        title: "Make-A-Wish",
        highlights: [
          "Revamped UI components in Twig, giving a fresh look to the Make-A-Wish website.",
          "Added new filter fields to Craft CMS to enhance content management capabilities.",
          "Assisted in managing, maintaining, and deploying the donation form built as a React npm package, ensuring version stability.",
        ],
      },
    ],
    tags: ["#Consulting", "#A11y", "#Animation", "#CMS", "#FullStack"],
  },
  {
    company: "Zash Ventures",
    role: "Full Stack Developer",
    location: "Melbourne",
    duration: "2021 — 2022",
    overview:
      "Designed the system architecture for Veztr - a platform bridging investors and startups.",
    responsibilities: [
      {
        highlights: [
          "Designed the system architecture for Veztr end-to-end.",
          "Built REST APIs using Node.js and Express.js with Sequelize ORM for MySQL database management.",
          "Delivered the Veztr app using agile methodology in a fast-paced startup environment.",
        ],
      },
    ],
    tags: ["#Startup", "#NodeJS", "#REST", "#MySQL", "#Architecture"],
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
    tags: ["#WordPress", "#PHP", "#LMS", "#Stripe", "#OOP"],
  },
];

// ── Education ─────────────────────────────────────────────────────────────

export const ABOUT_EDUCATION: Array<AboutEducation> = [
  {
    institution: "Swinburne University of Technology",
    degree: "Master of Information Technology",
    duration: "2017 — 2019",
    location: "Melbourne, Australia",
    major: "Major in Software Engineering",
    description:
      "High Distinction average with a focus on Distributed Systems and Human-Computer Interaction.",
  },
  {
    institution: "CHARUSAT University",
    degree: "Bachelor of Information Technology",
    duration: "2012 — 2016",
    location: "Gujarat, India",
    description: "Foundation in Computer Science, algorithms, and software development.",
  },
];

// ── Skills ────────────────────────────────────────────────────────────────

export const ABOUT_SKILLS: Array<AboutSkillGroup> = [
  {
    name: "Front End",
    categories: [
      {
        tooltip: "Core Web",
        skills: ["HTML5", "CSS", "JavaScript", "TypeScript"],
      },
      {
        tooltip: "Frameworks",
        skills: ["React", "Next.js", "Astro", "React Native"],
      },
      { tooltip: "UI Components", skills: ["Storybook"] },
      {
        tooltip: "Styling",
        skills: ["Tailwind CSS", "Vanilla Extract", "Styled System", "MUI"],
      },
      {
        tooltip: "Forms & Validation",
        skills: ["React Hook Form", "Zod"],
      },
      {
        tooltip: "State Management",
        skills: ["TanStack Query", "Redux", "MobX", "React Context"],
      },
      { tooltip: "Animation", skills: ["Framer Motion"] },
      {
        tooltip: "Web Standards",
        skills: ["Responsive Design", "Accessibility (WCAG)", "Progressive Web Apps", "SEO"],
      },
      {
        tooltip: "Build Tools",
        skills: ["Webpack", "Vite", "Turbopack", "ESLint", "Prettier"],
      },
    ],
  },
  {
    name: "Back End",
    categories: [
      { tooltip: "Runtime & Framework", skills: ["Node.js", "Express.js"] },
      { tooltip: "Languages", skills: ["PHP", "Java"] },
      {
        tooltip: "APIs",
        skills: ["REST APIs", "GraphQL", "OpenAPI", "Swagger"],
      },
      { tooltip: "Auth", skills: ["OAuth", "JWT"] },
      { tooltip: "ORM", skills: ["Prisma"] },
      { tooltip: "CMS", skills: ["Sanity", "WordPress", "Craft CMS"] },
      {
        tooltip: "Databases",
        skills: [
          "SQL",
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "MongoDB",
          "Redis",
          "Firebase",
          "Supabase",
        ],
      },
    ],
  },
  {
    name: "Testing",
    categories: [
      {
        tooltip: "Test Types",
        skills: [
          "Unit Testing",
          "Integration Testing",
          "End-to-End Testing",
          "Accessibility Testing",
          "Visual Regression Testing",
        ],
      },
      {
        tooltip: "Frameworks",
        skills: ["Jest", "Vitest", "Cypress", "Playwright"],
      },
    ],
  },
  {
    name: "DevOps",
    categories: [
      { tooltip: "Version Control", skills: ["Git", "GitHub"] },
      {
        tooltip: "CI/CD",
        skills: ["GitHub Actions", "Azure DevOps", "CI/CD"],
      },
      {
        tooltip: "Cloud & Hosting",
        skills: ["Azure", "Vercel", "Cloudflare"],
      },
      { tooltip: "Containers", skills: ["Docker"] },
      { tooltip: "Server", skills: ["Linux", "Nginx"] },
      { tooltip: "Package Managers", skills: ["npm", "pnpm"] },
    ],
  },
  {
    name: "Architecture",
    categories: [
      {
        tooltip: "Design Patterns",
        skills: [
          "System Design",
          "API Design",
          "Micro Frontends",
          "Design Systems",
          "Component Libraries",
        ],
      },
      {
        tooltip: "Performance",
        skills: ["Performance Optimisation", "Caching", "Code Splitting"],
      },
      { tooltip: "Rendering", skills: ["SSR", "SSG", "ISR"] },
    ],
  },
  {
    name: "AI",
    categories: [
      {
        tooltip: "LLMs & APIs",
        skills: ["LLMs", "OpenAI API", "Claude API", "MCP"],
      },
      {
        tooltip: "AI Engineering",
        skills: ["Prompt Engineering", "AI Integrations", "Agent Orchestration"],
      },
    ],
  },
  {
    name: "Tools",
    categories: [
      { tooltip: "IDE", skills: ["LazyVim", "VS Code", "Neovim"] },
      { tooltip: "Design", skills: ["Figma"] },
      { tooltip: "Project Management", skills: ["Jira", "ClickUp", "Trello"] },
      {
        tooltip: "API Testing",
        skills: ["Postman", "Bruno", "Insomnia"],
      },
      { tooltip: "Browser & Terminal", skills: ["Chrome DevTools", "Terminal"] },
    ],
  },
  {
    name: "Process",
    categories: [
      { tooltip: "Methodology", skills: ["Agile", "Scrum"] },
      {
        tooltip: "Engineering",
        skills: ["Technical Documentation", "Code Reviews", "Mentoring", "Problem Solving"],
      },
    ],
  },
];
