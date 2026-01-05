import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: '1',
  description: '2',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: '3',
      paragraphs: ['4', '5'],
    },
    {
      heading: '6',
      bullets: ['7', '8', '9', '10', '11', '12', '501'],
    },
    {
      heading: '13',
      paragraphs: ['14', '502', '15', '16'],
    },
    {
      heading: '17',
      paragraphs: [`email@anqr.link`],
    },
    {
      heading: '20',
      paragraphs: ['21', '22', '23'],
    },
    {
      heading: '24',
      paragraphs: ['25'],
    },
    {
      heading: '26',
      paragraphs: ['27'],
    },
    {
      heading: '28',
      paragraphs: ['29'],
    },
  ],
};

export default about;
