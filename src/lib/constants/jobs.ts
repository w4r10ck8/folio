export interface Job {
  company: string;
  role: string;
  location?: string;
  duration: string;
  highlights: Array<string>;
  tags?: Array<string>;
}

export const JOBS: Array<Job> = [
  {
    company: "Exco Partners | An NEC Company",
    role: "Full Stack Developer",
    duration: "2023 – Present",
    highlights: [
      "Built and evolved **digital services** used by thousands of Australians through the **Fair Work Commission**.",
      "Architected **scalable platforms** that simplify complex business workflows.",
      "Delivered **accessible, user-centric experiences** in close collaboration with cross-functional teams.",
      "Elevated **performance**, **code quality**, and **long-term maintainability** across the platform.",
    ],
    tags: ["#MyFWC", "#NextJS", "#Accessibility", "#Performance", "#Dynamics365"],
  },
  {
    company: "inlight",
    role: "Full Stack Developer",
    duration: "2021 – 2023",
    highlights: [
      "Delivered **digital products** for **government, healthcare, retail, and not-for-profit organisations**.",
      "Built **reusable design systems**, modern user interfaces, and **headless CMS** experiences across multiple client projects.",
      "Developed **accessible, high-performance applications** with a strong focus on **quality, testing, and maintainability**.",
      "Collaborated closely with **designers, developers, and clients** to deliver polished solutions from concept through production.",
    ],
    tags: [
      "#A11y",
      "#NextJS",
      "#NodeJS",
      "#SanityCMS",
      "#Cypress",
      "#HeadlessCMS",
      "#DesignSystems",
    ],
  },
  {
    company: "Zash Ventures",
    role: "Full Stack Developer",
    duration: "2021 – 2022",
    highlights: [
      "Helped build a **FinTech platform** connecting **investors with startups**.",
      "Developed **full-stack features** that transformed product ideas into production-ready solutions.",
      "Collaborated directly with **founders** in a fast-paced, agile environment.",
      "Designed **scalable systems** that enabled rapid product growth.",
    ],
    tags: ["#Startup", "#FinTech", "#FullStack", "#ProductDevelopment", "#Scalability"],
  },
  {
    company: "C2 Capital",
    role: "WordPress Developer",
    duration: "2020 – 2021",
    highlights: [
      "Delivered **custom digital solutions** for businesses using **WordPress** and **PHP**.",
      "Built **tailored functionality** that streamlined internal workflows and business processes.",
      "Integrated **payment gateways** and third-party services into production systems.",
      "Supported projects from **requirements gathering** through development, deployment, and ongoing maintenance.",
    ],
    tags: ["#WordPress", "#PHP", "#PaymentSystems", "#CustomDevelopment", "#BusinessSolutions"],
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
