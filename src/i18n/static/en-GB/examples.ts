import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const examples: PageDefinition = {
  title: 'ANQR Examples',
  description: 'Find the right place to start with ANQR - from the full User Guide to practical Learn articles and ready-made examples.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Full User Guide',
      paragraphs: ['Read the complete User Guide for a structured, feature-by-feature reference, including all parameters and API details.'],
    },
    {
      heading: 'Learn by use case',
      paragraphs: ['Browse scenario-focused guides in the Learn library, covering campaigns, payments, marketing, safety, dynamic QR, and cross-lingual flows.'],
    },
    {
      heading: 'Examples you can remix',
      paragraphs: ['Open ready-made configurations in the generator from the Examples library and adapt them to your brand, content, and channels.'],
    },
    {
      heading: 'Jump into the generator',
      paragraphs: ['Start creating QR codes right away in the ANQR generator, then come back to guides and examples as you refine your setup.'],
    },
    {
      heading: 'Quick links',
      bullets: ['Open the full User Guide', 'Browse Learn articles', 'View QR examples', 'Open the generator'],
    },
  ],
};

export default examples;
