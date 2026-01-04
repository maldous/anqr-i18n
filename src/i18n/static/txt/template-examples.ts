import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /examples page with 5 comprehensive examples
// All string values are numeric ids that map to lines in en-GB.txt.
export const examples: PageDefinition = {
  title: '671',
  description: '672',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: '684', type: 'generator' },
    { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
    { href: '/guide?lang=${lang}', label: '681', type: 'guide' },
  ],
  sections: [
    // Example 1: Uplift an Existing QR Campaign (759-770)
    {
      heading: '759',
      paragraphs: ['760'],
      images: [{ src: '/images/examples/uplift-overview.svg', alt: '759', caption: '760' }],
    },
    {
      heading: '761',
      paragraphs: ['762'],
      images: [{ src: '/images/examples/uplift-before.svg', alt: '761', caption: '762' }],
    },
    {
      heading: '763',
      paragraphs: ['764'],
      images: [{ src: '/images/examples/uplift-after.svg', alt: '763', caption: '764' }],
    },
    {
      heading: '765',
      paragraphs: ['766'],
    },
    {
      heading: '767',
      paragraphs: ['768'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&ec=H#overlay', label: '769', type: 'generator' },
        { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
      ],
    },

    // Example 2: Branded Retail Payment QR (771-782)
    {
      heading: '771',
      paragraphs: ['772'],
      images: [{ src: '/images/examples/payment-overview.svg', alt: '771', caption: '772' }],
    },
    {
      heading: '773',
      paragraphs: ['774'],
      images: [{ src: '/images/examples/payment-before.svg', alt: '773', caption: '774' }],
    },
    {
      heading: '775',
      paragraphs: ['776'],
      images: [{ src: '/images/examples/payment-after.svg', alt: '775', caption: '776' }],
    },
    {
      heading: '777',
      paragraphs: ['778'],
    },
    {
      heading: '779',
      paragraphs: ['780'],
    },
    {
      heading: '781',
      paragraphs: ['782'],
      links: [
        { href: '/?lang=${lang}&tab=professional&ec=H#payload', label: '769', type: 'generator' },
        { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
      ],
    },

    // Example 3: Print Scaling: PNG vs SVG (783-794)
    {
      heading: '783',
      paragraphs: ['784'],
      images: [{ src: '/images/examples/print-overview.svg', alt: '783', caption: '784' }],
    },
    {
      heading: '785',
      paragraphs: ['786'],
      images: [{ src: '/images/examples/print-png-scaled.svg', alt: '785', caption: '786' }],
    },
    {
      heading: '787',
      paragraphs: ['788'],
      images: [{ src: '/images/examples/print-svg-scaled.svg', alt: '787', caption: '788' }],
    },
    {
      heading: '789',
      paragraphs: ['790'],
    },
    {
      heading: '791',
      paragraphs: ['792'],
    },
    {
      heading: '793',
      paragraphs: ['794'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&format=svg#output', label: '769', type: 'generator' },
        { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
      ],
    },

    // Example 4: Animated Signage QR (795-806)
    {
      heading: '795',
      paragraphs: ['796'],
      images: [{ src: '/images/examples/animation-overview.svg', alt: '795', caption: '796' }],
    },
    {
      heading: '797',
      paragraphs: ['798'],
      images: [{ src: '/images/examples/animation-static.svg', alt: '797', caption: '798' }],
    },
    {
      heading: '799',
      paragraphs: ['800'],
      images: [{ src: '/images/examples/animation-animated.svg', alt: '799', caption: '800' }],
    },
    {
      heading: '801',
      paragraphs: ['802'],
    },
    {
      heading: '803',
      paragraphs: ['804'],
    },
    {
      heading: '805',
      paragraphs: ['806'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif#animation',
          label: '769',
          type: 'generator',
        },
        { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
      ],
    },

    // Example 5: Cross-Lingual QR Collaboration (807-817)
    {
      heading: '807',
      paragraphs: ['808'],
      images: [{ src: '/images/examples/collab-overview.svg', alt: '807', caption: '808' }],
    },
    {
      heading: '809',
      paragraphs: ['810'],
      images: [{ src: '/images/examples/collab-english.svg', alt: '809', caption: '810' }],
    },
    {
      heading: '811',
      paragraphs: ['812'],
      images: [{ src: '/images/examples/collab-japanese.svg', alt: '811', caption: '812' }],
    },
    {
      heading: '813',
      paragraphs: ['814'],
    },
    {
      heading: '815',
      paragraphs: ['816', '817'],
      links: [
        { href: '/?lang=${lang}&tab=professional#share', label: '769', type: 'generator' },
        { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
    { href: '/guide?lang=${lang}', label: '681', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: '683', type: 'gallery' },
  ],
};

export default examples;
