import { COMPANY_PATHS } from '../constants/paths';
import type { JobProps } from '../utils/types';

export const JOBS: JobProps[] = [
  {
    company: 'Exco Partners',
    website: COMPANY_PATHS['exco-partners'],
    role: 'Full Stack Developer',
    linkHoverColor: 'hover:!bg-exco-partners',
    duration: '2023 - Present',
    description: {
      overview: `🚀 Currently contributing to the Fair Work Commission's Customer Service Platform, focused on modernising and enhancing the user experience for Australian workers and employers.`,
      responsibilities: [
        {
          title: 'Fair Work Commission',
          highlights: [
            'Led architectural planning for the frontend and CRM integration — helped define how dynamic form data is structured and stored in Dataverse, aligning with long-term platform goals.',
            'Led UI modernisation using Material UI for improved accessibility and visual consistency.',
            'Built schema-driven forms with React Hook Form + Zod, enabling scalable and reusable validation logic.',
            'Integrated with Data-verse CRM using OData and REST APIs for robust backend communication.',
            'Refactored into a modular component architecture using field-level meta for dynamic rendering and better DX.',
            'Implemented React Query to manage API data fetching, caching, and synchronisation with minimal boilerplate.',
            'Wrote unit tests with Vitest to ensure reliability and maintainability across shared components and utilities.',
            'Developed reusable field components driven by schema and context, reducing duplication and improving dev velocity.',
          ],
        },
      ],
    },
  },
  {
    company: 'inlight',
    website: COMPANY_PATHS.inlight,
    role: 'Full Stack Developer',
    linkHoverColor: 'hover:!bg-inlight',
    duration: '2021 - 2023',
    description: {
      overview:
        'Worked closely with Inlight team using agile methodology to deliver high-quality solutions to clients. Proficient in front-end and back-end development, CMS management, UI/UX enhancements, and ensuring accessibility standards. Experienced in writing thorough documentation, conducting tests, and maintaining robust systems across various projects',
      responsibilities: [
        {
          title: 'Transport Accident Commission (TAC) - How Safe Is Your Car',
          highlights: [
            'Built front-end search functionality, filters, and ANCAP page using TypeScript and Next.js',
            'Developed unit tests and Cypress tests to ensure reliability and robustness',
            'Ensured full accessibility of components and pages to meet AAA standards',
          ],
        },
        {
          title: 'Solstice Energy',
          highlights: [
            ' Designed and developed components in Vanilla Extract for Sanity CMS',
            'Connected form input fields to React Hook Form for efficient data handling',
            'Created a custom multi-file upload feature, integrating with Resend service to email files.',
            'Configured CMS and maintained the front-end using TypeScript.',
          ],
        },
        {
          title: 'Make a Wish',
          highlights: [
            'Revamped UI components in Twig, giving a fresh look to the Make-A-Wish website',
            'Added new filter fields to Craft CMS to enhance content management capabilities.',
            'Assisted in managing, maintaining and deploying the donation form built in React as npm package, ensuring version and stability.',
          ],
        },
        {
          title: 'Amplar Health',
          highlights: [
            'Managed and maintained systems for psychologists using a Next.js and TypeScript codebase, ensuring operational efficiency and prompt issue resolution.',
            'Provided client support, addressing needs and maintaining clear communication.',
            'Conducted regression testing after system updates to ensure continued functionality and stability.',
            'Handled regular deployments using Vercel, ensuring consistent and reliable application delivery.',
          ],
        },
        {
          title: 'Vicinity',
          highlights: [
            'Enhanced UI/UX by implementing front-end tweaks using React and Storyblok CMS',
            'Developed a custom plugin in Vue.js for Storyblok to automate promotions based on date and time logic',
            'Wrote a Python script to bulk modify/remove unused fields in the mall database',
          ],
        },
        {
          title: 'Nando’s AU & NZ',
          highlights: [
            "Led a comprehensive UI overhaul for Nando's Australia and New Zealand websites",
            'Implemented Framer Motion animations to enhance basting user experience Utilised LaunchDarkly feature toggles to efficiently manage test components',
            'Regularly updated and maintained promotional free delivery offers',
          ],
        },
      ],
    },
  },
  {
    company: 'Zash Ventures',
    role: 'Full Stack Developer',
    duration: '2021 - 2022',
    description: {
      responsibilities: [
        {
          highlights: [
            'Designed the system architecture for Veztr.',
            'Worked on the Veztr App to bridge the gap between investors and startups using agile methodology.',
            'Built APIs using Node.js and Express.js, with Sequelize for MySQL database management.',
          ],
        },
      ],
    },
  },
  {
    company: 'C2 Capital',
    role: 'WordPress Developer',
    duration: '2020 - 2021',
    description: {
      responsibilities: [
        {
          highlights: [
            'Developed an online LMS app using PHP, Node, React, and WordPress.',
            'Designed a Node (Express) API to handle requests and filters efficiently.',
            'Integrated Stripe as a payment gateway for seamless transactions.',
            'Implemented core logic using an OOP-based PHP approach.',
            'Designed and developed three websites, enhancing online presence and functionality.',
            'API is build in Node.js and applied auth0 for security',
            'Provided help in design, development and code maintenance.',
          ],
        },
      ],
    },
  },
];
