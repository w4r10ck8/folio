export interface Job {
  company: string;
  role: string;
  duration: string;
  highlights: Array<string>;
}

export const JOBS: Array<Job> = [
  {
    company: "Exco Partners",
    role: "Full Stack Developer",
    duration: "2023 – Present",
    highlights: [
      "Led architectural planning for the frontend and CRM integration on the Fair Work Commission's Customer Service Platform.",
      "Built schema-driven forms with React Hook Form + Zod, enabling scalable and reusable validation logic.",
      "Integrated with Dataverse CRM using OData and REST APIs for robust backend communication.",
      "Implemented React Query for API data fetching, caching, and synchronisation with minimal boilerplate.",
      "Wrote unit tests with Vitest to ensure reliability across shared components and utilities.",
    ],
  },
  {
    company: "inlight",
    role: "Full Stack Developer",
    duration: "2021 – 2023",
    highlights: [
      "Built front-end search, filters, and pages for the Transport Accident Commission using TypeScript and Next.js.",
      "Led a comprehensive UI overhaul for Nando's AU and NZ, implementing Framer Motion animations.",
      "Designed and developed components in Vanilla Extract for Sanity CMS (Solstice Energy).",
      "Built a custom multi-file upload feature integrating with Resend for automated email delivery.",
      "Developed unit tests and Cypress end-to-end tests across multiple client projects.",
    ],
  },
  {
    company: "Zash Ventures",
    role: "Full Stack Developer",
    duration: "2021 – 2022",
    highlights: [
      "Designed the system architecture for Veztr — a platform bridging investors and startups.",
      "Built REST APIs using Node.js and Express.js with Sequelize ORM for MySQL database management.",
      "Delivered the Veztr app end-to-end using agile methodology in a fast-paced startup environment.",
    ],
  },
  {
    company: "C2 Capital",
    role: "WordPress Developer",
    duration: "2020 – 2021",
    highlights: [
      "Developed an online LMS using PHP, Node.js, React, and WordPress.",
      "Designed a Node/Express API to handle requests and filters efficiently.",
      "Integrated Stripe as a payment gateway for seamless and secure transactions.",
      "Implemented core business logic using an OOP-based PHP approach.",
    ],
  },
  {
    company: "Swinburne University",
    role: "Master of Information Technology",
    duration: "2017 – 2019",
    highlights: [],
  },
  {
    company: "CHARUSAT University",
    role: "Bachelor of Information Technology",
    duration: "2012 – 2016",
    highlights: [],
  },
];
