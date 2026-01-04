import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
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
    // Example 1: Uplift an Existing QR Campaign
    {
      heading: '759',
      paragraphs: ['760', '819'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: '759',
          caption: '760',
        },
      ],
    },
    {
      heading: '761',
      paragraphs: ['762', '820'],
      images: [
        {
          src: '/images/examples/uplift-before.png',
          alt: '761',
          caption: '762',
        },
      ],
    },
    {
      heading: '763',
      paragraphs: ['764', '821', '822'],
      images: [
        {
          src: '/images/examples/uplift-after.png',
          alt: '763',
          caption: '764',
        },
      ],
    },
    {
      heading: '765',
      paragraphs: ['766', '823', '824', '825', '826', '827', '828'],
    },
    {
      heading: '767',
      paragraphs: ['768', '829', '830'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: '769',
          type: 'generator',
        },
      ],
    },

    // Example 2: Branded Retail Payments
    {
      heading: '771',
      paragraphs: ['772', '831'],
      images: [
        {
          src: '/images/examples/retail-payments-overview.png',
          alt: '771',
          caption: '772',
        },
      ],
    },
    {
      heading: '773',
      paragraphs: ['774', '832'],
      images: [
        {
          src: '/images/examples/retail-payments-before.png',
          alt: '773',
          caption: '774',
        },
      ],
    },
    {
      heading: '775',
      paragraphs: ['776', '833'],
      images: [
        {
          src: '/images/examples/retail-payments-after.png',
          alt: '775',
          caption: '776',
        },
      ],
    },
    {
      heading: '777',
      paragraphs: ['778', '834'],
    },
    {
      heading: '779',
      paragraphs: ['780', '835'],
    },
    {
      heading: '781',
      paragraphs: ['782', '836'],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: '769',
          type: 'generator',
        },
      ],
    },

    // Example 3: Print Scaling
    {
      heading: '783',
      paragraphs: ['784', '837'],
      images: [
        {
          src: '/images/examples/print-scaling-overview.png',
          alt: '783',
          caption: '784',
        },
      ],
    },
    {
      heading: '785',
      paragraphs: ['786', '838'],
      images: [
        {
          src: '/images/examples/print-scaling-before.png',
          alt: '785',
          caption: '786',
        },
      ],
    },
    {
      heading: '787',
      paragraphs: ['788', '839'],
      images: [
        {
          src: '/images/examples/print-scaling-png.png',
          alt: '787',
          caption: '788',
        },
      ],
    },
    {
      heading: '789',
      paragraphs: ['790', '840'],
      images: [
        {
          src: '/images/examples/print-scaling-svg.png',
          alt: '789',
          caption: '790',
        },
      ],
    },
    {
      heading: '791',
      paragraphs: ['792', '841', '842', '843', '844', '845'],
    },
    {
      heading: '793',
      paragraphs: ['794', '846'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: '769',
          type: 'generator',
        },
      ],
    },

    // Example 4: Animated Signage
    {
      heading: '795',
      paragraphs: ['796', '847'],
      images: [
        {
          src: '/images/examples/animated-signage-overview.png',
          alt: '795',
          caption: '796',
        },
      ],
    },
    {
      heading: '797',
      paragraphs: ['798', '848'],
      images: [
        {
          src: '/images/examples/animated-signage-before.png',
          alt: '797',
          caption: '798',
        },
      ],
    },
    {
      heading: '799',
      paragraphs: ['800', '849'],
      images: [
        {
          src: '/images/examples/animated-signage-after.png',
          alt: '799',
          caption: '800',
        },
      ],
    },
    {
      heading: '801',
      paragraphs: ['802', '850'],
    },
    {
      heading: '803',
      paragraphs: ['804', '851'],
    },
    {
      heading: '805',
      paragraphs: ['806', '852'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: '769',
          type: 'generator',
        },
      ],
    },

    // Example 5: Cross-lingual Collaboration
    {
      heading: '807',
      paragraphs: ['808', '853'],
      images: [
        {
          src: '/images/examples/collaboration-overview.png',
          alt: '807',
          caption: '808',
        },
      ],
    },
    {
      heading: '809',
      paragraphs: ['810', '854'],
      images: [
        {
          src: '/images/examples/collaboration-before.png',
          alt: '809',
          caption: '810',
        },
      ],
    },
    {
      heading: '811',
      paragraphs: ['812', '855'],
      images: [
        {
          src: '/images/examples/collaboration-after.png',
          alt: '811',
          caption: '812',
        },
      ],
    },
    {
      heading: '813',
      paragraphs: ['814', '856', '857', '858', '859', '860'],
    },
    {
      heading: '815',
      paragraphs: ['816', '861'],
    },
    {
      heading: '817',
      paragraphs: ['818', '862', '863'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: '769',
          type: 'generator',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: '682', type: 'learn' },
    { href: '/guide?lang=${lang}', label: '681', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: '899', type: 'gallery' },
  ],
};
