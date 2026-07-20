import { COMPANY_PATHS } from '../constants/paths.ts';
import type { JobProps, ProjectProps } from '../utils/types';

export const PROJECTS: ProjectProps[] = [
  {
    name: 'Nobel Prize Search',
    preview: 'https://nobel-prize-search.vercel.app/',
    github: 'https://github.com/jaypancholi94/nobel-prize-search',
    highlights: [
      'Developed an application that updates data in real-time upon text field changes, ensuring the most current information is displayed. Implemented quality search ranking to display the most relevant results at the top',
      'Utilized useEffect for debouncing input in text fields, reducing unnecessary API calls and enhancing performance. Implemented pagination for efficient data management, allowing users to navigate large data sets easily',
      'Integrated Fuse.js for fuzzy search functionality with customizable parameters. Ensured a fully responsive design using Tailwind CSS, and utilized Shadcn.ui for accessible UI components. Implemented shareable URLs for easy query sharing and fetched up-to-date Nobel Prize data from the Nobel Prize API',
    ],
    techStack: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Fuse.js',
      'Shadcn.ui',
    ],
  },
  {
    name: 'Robot Simmulation',
    preview: 'https://robot-simulator-bellroy.vercel.app/',
    github: 'https://github.com/jaypancholi94/robot-simulator',
    highlights: [
      'A web application for simulating a robot on a 5x5 grid, built with React, TypeScript, and Tailwind CSS. The application features intuitive controls for moving and rotating the robot, with a clean, minimalistic design inspired by Bellroy.',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    name: 'Overlapping Rectangles',
    preview: 'https://overlapping-rectangle.vercel.app/',
    github: 'https://github.com/jaypancholi94/overlapping-rectangle',
    highlights: [
      'Developed a function in TypeScript to determine if two rectangles overlap based on their top, bottom, left, and right coordinates, enhancing problem-solving skills and algorithmic thinking.',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    name: 'SkipTheSearch',
    preview: 'https://skip-the-search.vercel.app/',
    github: 'https://github.com/jaypancholi94/SkipTheSearch',
    highlights: [
      'Created a comprehensive repository to consolidate all my learnings from various tools and packages',
      'Designed to solve the problem of recalling past internet resources quickly and efficiently for developers',
      'Built using VitePress.js and Obsidian, and hosted on Vercel for easy access',
    ],
    techStack: ['TypeScript', 'VitePress', 'Vercel'],
  },
  {
    name: 'Ticket Management System API',
    github: 'https://github.com/jaypancholi94/Ticket-Management-System-API',
    highlights: [
      'Developed as a beginner to understand authentication and API mechanisms',
      'Built the API using Node.js and Express, with Sequelize for database management',
      'Implemented JSON Web Token (JWT) for authentication and middleware setup',
      'Enabled basic functionalities such as user creation, ticket creation, updating, and deletion',
    ],
    techStack: [
      'JavaScript',
      'Node.js',
      'Express',
      'Sequelize',
      'JWT',
      'bcrypt',
      'mysql2',
    ],
  },
  {
    name: '2048',
    preview: 'https://2048-the-game.vercel.app/',
    github: 'https://github.com/jaypancholi94/2048',
    highlights: [
      'Developed a replica of the 2048 game using React and Redux to learn and understand efficient state management',
      'Implemented matrix transpose methods to build the core logic of the game, making the development process engaging and educational',
      'Explored the Material-UI design library to enhance the user interface',
      'Enabled functionality allowing players to select game layouts ranging from 2x2 to 8x8 matrices.',
    ],
    techStack: ['React', 'Redux', 'Material-UI', 'Vercel'],
  },
];

export const FREELANCE_PROJECTS: JobProps[] = [
  {
    company: 'Whitefox',
    website: COMPANY_PATHS.whitefox,
    role: 'Full Stack Developer',
    duration: '2021 - 2021',
    linkHoverColor: 'hover:!bg-white hover:!text-whitefox',
    description: {
      responsibilities: [
        {
          highlights: [
            'Developed a WordPress form for a real estate company to streamline the collection of client information',
            'Included payment options and quotation features within the form to enhance functionality',
            'Implemented PHPMailer to send SMTP emails to WhiteFox agents',
          ],
        },
      ],
    },
  },

  {
    company: 'My Little Tag',
    website: COMPANY_PATHS['my-little-tag'],
    role: 'Full Stack Developer',
    duration: '2019 - 2020',
    linkHoverColor: 'hover:!bg-mylittletag',
    description: {
      responsibilities: [
        {
          highlights: [
            'Developed a lost and found website that generates unique QR codes for customers, AirTag was introduced',
            'Facilitated the connection between item finders and owners by allowing QR code scans to provide owner contact information',
            'Implemented a custom payment gateway for seamless transactions.',
            'Enhanced the lost and found process, ensuring easy and efficient item recovery for users',
          ],
        },
      ],
    },
  },
];
