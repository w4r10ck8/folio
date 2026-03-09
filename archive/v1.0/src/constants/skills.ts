import type { SkillGroup } from '../utils/types';

export const SKILLS: SkillGroup[] = [
  {
    name: 'Front End',
    categories: [
      {
        tooltip: 'JavaScript Frameworks',
        skills: ['TypeScript', 'React', 'Next.js', 'Astro', 'React Native'],
      },
      {
        tooltip: 'UI',
        skills: ['StoryBook'],
      },
      {
        tooltip: 'Testing',
        skills: ['Unit Testing', 'Jest', 'Vitest', 'Cypress'],
      },
      {
        tooltip: 'Style',
        skills: ['Tailwind', 'Vanilla Extract', 'MUI', 'Styled System', 'CSS'],
      },
      {
        tooltip: 'State Management',
        skills: ['Mobx', 'Redux', 'React Context'],
      },
    ],
  },
  {
    name: 'Back End',
    categories: [
      {
        tooltip: 'Node Framework',
        skills: ['Express.js'],
      },
      { tooltip: 'Languages', skills: ['PHP', 'JAVA'] },
      {
        tooltip: 'CMS',
        skills: ['Sanity', 'WordPress', 'Craft'],
      },
      {
        tooltip: 'Databases',
        skills: ['SQL', 'MongoDB'],
      },
    ],
  },
  {
    name: 'DevOps',
    categories: [
      {
        tooltip: 'CI/CD',
        skills: ['Vercel', 'GitHub Actions'],
      },
      {
        tooltip: 'Version Control',
        skills: ['Git'],
      },
    ],
  },
  {
    name: 'Tools',
    categories: [
      {
        tooltip: 'Design',
        skills: ['Figma'],
      },
      {
        tooltip: 'Project Management',
        skills: ['Jira', 'ClickUp', 'Trello'],
      },
      {
        tooltip: 'IDE',
        skills: ['nvim', 'VS Code', 'Submlime'],
      },
    ],
  },
];
