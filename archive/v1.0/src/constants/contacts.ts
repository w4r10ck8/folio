import { PATHS } from '../constants/paths';
import type { ContactProps } from '../utils/types';

export const CONTACTS: ContactProps[] = [
  {
    iconName: 'Mail',
    title: 'jaypancholi94@gmail.com',
    hoverColor: 'hover:!bg-red-500',
    href: PATHS.mailto,
  },
  {
    iconName: 'Smartphone',
    title: '+61 (0) 450 691 794',
    hoverColor: 'hover:!bg-smartphone',
    href: PATHS.phone,
  },
  {
    iconName: 'Linkedin',
    title: '@jay-pancholi',
    hoverColor: 'hover:!bg-linkedin',
    href: PATHS.linkedin,
  },
  {
    iconName: 'Github',
    title: '@jaypancholi94',
    hoverColor: 'hover:!bg-github',
    href: PATHS.github,
  },
  {
    iconName: 'Instagram',
    title: '@_jaypancholi_',
    hoverColor: 'hover:!bg-instagram',
    href: PATHS.instagram,
  },
  {
    iconName: 'Facebook',
    title: '@Jay.D.Pancholi',
    hoverColor: 'hover:!bg-facebook',
    href: PATHS.facebook,
  },
];
