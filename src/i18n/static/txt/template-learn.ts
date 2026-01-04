import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: '640',
  description: '641',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: '684', type: 'generator' },
    { href: '/guide?lang=${lang}', label: '681', type: 'guide' },
    { href: '/examples?lang=${lang}', label: '683', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: '685',
      paragraphs: ['686'],
      images: [
        { src: '/images/learn/campaign-overview.svg', alt: '685', caption: '686' },
      ],
    },
    {
      heading: '687',
      paragraphs: ['688'],
    },
    {
      heading: '689',
      paragraphs: ['690'],
      images: [
        { src: '/images/learn/campaign-before.svg', alt: '689', caption: '690' },
        { src: '/images/learn/campaign-after.svg', alt: '689', caption: '690' },
      ],
    },
    {
      heading: '691',
      paragraphs: ['692'],
    },
    {
      heading: '693',
      paragraphs: ['694'],
    },
    {
      heading: '695',
      paragraphs: ['696'],
    },
    {
      heading: '697',
      paragraphs: ['698'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#overlay', label: '700', type: 'generator' },
        { href: '/examples?lang=${lang}', label: '670', type: 'example' },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: '701',
      paragraphs: ['702'],
      images: [
        { src: '/images/learn/retail-payment-overview.svg', alt: '701', caption: '702' },
      ],
    },
    {
      heading: '703',
      paragraphs: ['704'],
    },
    {
      heading: '705',
      paragraphs: ['706'],
      images: [
        { src: '/images/learn/retail-sizing.svg', alt: '705', caption: '706' },
      ],
    },
    {
      heading: '707',
      paragraphs: ['708'],
    },
    {
      heading: '709',
      paragraphs: ['710'],
    },
    {
      heading: '711',
      paragraphs: ['712'],
    },
    {
      heading: '713',
      paragraphs: ['714'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: '700', type: 'generator' },
        { href: '/examples?lang=${lang}', label: '670', type: 'example' },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: '715',
      paragraphs: ['716'],
      images: [
        { src: '/images/learn/print-svg-overview.svg', alt: '715', caption: '716' },
      ],
    },
    {
      heading: '717',
      paragraphs: ['718'],
    },
    {
      heading: '719',
      paragraphs: ['720'],
      images: [
        { src: '/images/learn/print-png-pixelated.svg', alt: '719', caption: '720' },
        { src: '/images/learn/print-svg-crisp.svg', alt: '719', caption: '720' },
      ],
    },
    {
      heading: '721',
      paragraphs: ['722'],
    },
    {
      heading: '723',
      paragraphs: ['724'],
    },
    {
      heading: '725',
      paragraphs: ['726'],
    },
    {
      heading: '727',
      paragraphs: ['728'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: '700', type: 'generator' },
        { href: '/examples?lang=${lang}', label: '670', type: 'example' },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: '729',
      paragraphs: ['730'],
      images: [
        { src: '/images/learn/animation-overview.svg', alt: '729', caption: '730' },
      ],
    },
    {
      heading: '731',
      paragraphs: ['732'],
    },
    {
      heading: '733',
      paragraphs: ['734'],
      images: [
        { src: '/images/learn/animation-static.svg', alt: '733', caption: '734' },
        { src: '/images/learn/animation-animated.svg', alt: '733', caption: '734' },
      ],
    },
    {
      heading: '735',
      paragraphs: ['736'],
    },
    {
      heading: '737',
      paragraphs: ['738'],
    },
    {
      heading: '739',
      paragraphs: ['740'],
    },
    {
      heading: '741',
      paragraphs: ['742'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: '700', type: 'generator' },
        { href: '/examples?lang=${lang}', label: '670', type: 'example' },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: '743',
      paragraphs: ['744'],
      images: [
        { src: '/images/learn/safety-overview.svg', alt: '743', caption: '744' },
      ],
    },
    {
      heading: '745',
      paragraphs: ['746'],
      images: [
        { src: '/images/learn/safety-quiet-zone.svg', alt: '745', caption: '746' },
      ],
    },
    {
      heading: '747',
      paragraphs: ['748'],
      images: [
        { src: '/images/learn/safety-contrast.svg', alt: '747', caption: '748' },
      ],
    },
    {
      heading: '749',
      paragraphs: ['750'],
    },
    {
      heading: '751',
      paragraphs: ['752'],
    },
    {
      heading: '753',
      paragraphs: ['754'],
    },
    {
      heading: '755',
      paragraphs: ['756'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: '700', type: 'generator' },
        { href: '/examples?lang=${lang}', label: '670', type: 'example' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: '681', type: 'guide' },
    { href: '/examples?lang=${lang}', label: '683', type: 'example' },
    { href: '/gallery?lang=${lang}', label: '683', type: 'gallery' },
  ],
};

export default learn;
