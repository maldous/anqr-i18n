import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn hub (includes learn guides + example overviews)
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Learn with ANQR',
  description: 'Practical guides for improving QR campaigns, payments, marketing, and cross-language sharing.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Improving existing QR campaigns',
      paragraphs: ['How to audit, upgrade, and safely replace existing QR codes without breaking user journeys.'],
    },
    {
      heading: 'QR codes for retail payments',
      paragraphs: ['Design payment QR codes that are fast to scan, on-brand, and compatible with major wallets.'],
    },
    {
      heading: 'QR codes for small business marketing',
      paragraphs: ['Use QR codes in print, packaging, and storefronts to drive trackable visits and conversions.'],
    },
    {
      heading: 'Animated QR codes for digital signage',
      paragraphs: ['When and how to use animated QR codes on screens while keeping them scannable.'],
    },
    {
      heading: 'QR code safety and compliance',
      paragraphs: ['Guardrails for avoiding phishing, unsafe redirects, and privacy issues in QR campaigns.'],
    },
    {
      heading: 'Dynamic server-side QR generation',
      paragraphs: ['Use the ANQR API and short links to power dynamic, server-side QR experiences.'],
    },
    {
      heading: 'Cross-lingual QR link sharing',
      paragraphs: ['Strategies for sharing one QR across languages, locales, and regions.'],
    },
    {
      heading: 'Example: Uplift an existing QR campaign',
      paragraphs: ['Step-by-step example showing how to migrate a static print campaign to ANQR with better safety.'],
    },
    {
      heading: 'Example: Branded retail payment QR',
      paragraphs: ['Design a payment QR that matches your brand while staying compatible with scanners and wallets.'],
    },
    {
      heading: 'Example: Avatar business card QR',
      paragraphs: ['Create a profile or vCard QR with an avatar overlay that still scans reliably.'],
    },
    {
      heading: 'Example: Seasonal retail QR campaign',
      paragraphs: ['Rotate destinations and creative while reusing printed codes for seasonal promotions.'],
    },
    {
      heading: 'Example: Animated signage QR',
      paragraphs: ['Pair animated QR overlays with digital signage while keeping enough contrast and quiet zone.'],
    },
    {
      heading: 'Example: Cross-lingual QR collaboration',
      paragraphs: ['Share one QR that routes people to content in their language using ANQR share links.'],
    },
    {
      heading: 'Open this scenario in the generator',
      bullets: ['Try this configuration directly in the ANQR generator.', 'See related guides and examples'],
    },
  ],
};

export default learn;
