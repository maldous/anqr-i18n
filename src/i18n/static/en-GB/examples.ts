import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /examples page with 5 comprehensive examples
// All string values are numeric ids that map to lines in en-GB.txt.
export const examples: PageDefinition = {
  title: 'ANQR Examples',
  description: 'Find the right place to start with ANQR - from the full User Guide to practical Learn articles and ready-made examples.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
  ],
  sections: [
    // Example 1: Uplift an Existing QR Campaign (759-770)
    {
      heading: 'Uplift an Existing QR Campaign',
      paragraphs: ['Transform a plain QR code into a branded, safety-optimised version.'],
      images: [{ src: '/images/examples/uplift-overview.svg', alt: 'Uplift an Existing QR Campaign', caption: 'Transform a plain QR code into a branded, safety-optimised version.' }],
    },
    {
      heading: 'The challenge',
      paragraphs: ['You have an existing QR code campaign — perhaps plain black-and-white codes printed on marketing materials. The codes work, but they\'re not on-brand and may have suboptimal settings. How do you upgrade without breaking existing scans?'],
      images: [{ src: '/images/examples/uplift-before.svg', alt: 'The challenge', caption: 'You have an existing QR code campaign — perhaps plain black-and-white codes printed on marketing materials. The codes work, but they\'re not on-brand and may have suboptimal settings. How do you upgrade without breaking existing scans?' }],
    },
    {
      heading: 'The solution',
      paragraphs: ['Keep the same destination URL but recreate the QR code with ANQR. Add your logo as a center overlay, apply brand colours, and enable Safety Mode to ensure the upgraded code scans reliably. The encoded content remains identical.'],
      images: [{ src: '/images/examples/uplift-after.svg', alt: 'The solution', caption: 'Keep the same destination URL but recreate the QR code with ANQR. Add your logo as a center overlay, apply brand colours, and enable Safety Mode to ensure the upgraded code scans reliably. The encoded content remains identical.' }],
    },
    {
      heading: 'Step-by-step',
      paragraphs: ['1. Enter your existing URL in ANQR. 2. Set Error Correction to H (High). 3. Upload your logo and set overlay mode to \'Center Logo\'. 4. Adjust intensity to 60-70%. 5. Enable \'Preserve Finder Patterns\'. 6. Apply brand colours (maintain high contrast). 7. Enable Safety Mode \'Balanced\'. 8. Test with multiple scanner apps. 9. Export as SVG for print flexibility.'],
    },
    {
      heading: 'Why it works',
      paragraphs: ['The QR code encodes the same URL, so existing printed codes and new branded codes both work. High error correction compensates for the logo overlay. Safety Mode ensures the design choices don\'t compromise scannability.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&ec=H#overlay', label: 'Recreate in Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
      ],
    },

    // Example 2: Branded Retail Payment QR (771-782)
    {
      heading: 'Branded Retail Payment QR',
      paragraphs: ['Design a payment QR that balances branding with scan reliability.'],
      images: [{ src: '/images/examples/payment-overview.svg', alt: 'Branded Retail Payment QR', caption: 'Design a payment QR that balances branding with scan reliability.' }],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Your retail business needs payment QR codes that match your brand identity while meeting strict payment system requirements. Generic black-and-white payment codes work but miss branding opportunities.'],
      images: [{ src: '/images/examples/payment-before.svg', alt: 'The challenge', caption: 'Your retail business needs payment QR codes that match your brand identity while meeting strict payment system requirements. Generic black-and-white payment codes work but miss branding opportunities.' }],
    },
    {
      heading: 'The solution',
      paragraphs: ['Use ANQR\'s payment templates (UPI, PayNow, SEPA, etc.) with conservative branding. Add your logo small and centered, use brand colours for the foreground while keeping white background, and use the highest error correction level.'],
      images: [{ src: '/images/examples/payment-after.svg', alt: 'The solution', caption: 'Use ANQR\'s payment templates (UPI, PayNow, SEPA, etc.) with conservative branding. Add your logo small and centered, use brand colours for the foreground while keeping white background, and use the highest error correction level.' }],
    },
    {
      heading: 'Design constraints',
      paragraphs: ['Payment codes must scan in under 1 second for good customer experience. This limits how much customisation is safe: logo under 15% of code area, no finder pattern modification, minimum 4-module quiet zone, and test with actual payment apps (not just generic scanners).'],
    },
    {
      heading: 'Recommended settings',
      paragraphs: ['Error Correction: H (High). Quiet Zone: 4+ modules. Module Style: Square (most reliable). Logo Overlay: 50-60% intensity maximum. Safety Mode: Strict. Always test with your payment app (Google Pay, bank apps, etc.).'],
    },
    {
      heading: 'Why this approach works',
      paragraphs: ['Conservative branding ensures payment apps scan quickly while still showing your brand identity. The quiet zone and error correction provide margin for printing variations and environmental factors at the point of sale.'],
      links: [
        { href: '/?lang=${lang}&tab=professional&ec=H#payload', label: 'Recreate in Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
      ],
    },

    // Example 3: Print Scaling: PNG vs SVG (783-794)
    {
      heading: 'Print Scaling: PNG vs SVG',
      paragraphs: ['See the difference between raster and vector at large print sizes.'],
      images: [{ src: '/images/examples/print-overview.svg', alt: 'Print Scaling: PNG vs SVG', caption: 'See the difference between raster and vector at large print sizes.' }],
    },
    {
      heading: 'The challenge',
      paragraphs: ['You need QR codes for large format print — posters, banners, or signage. Exporting at small pixel sizes then scaling up produces blurry, potentially unscannable codes.'],
      images: [{ src: '/images/examples/print-png-scaled.svg', alt: 'The challenge', caption: 'You need QR codes for large format print — posters, banners, or signage. Exporting at small pixel sizes then scaling up produces blurry, potentially unscannable codes.' }],
    },
    {
      heading: 'PNG at poster size',
      paragraphs: ['A QR code exported as 200×200px PNG then scaled to 30cm (12in) becomes obviously pixelated. The module edges blur together, reducing contrast and scanner reliability. This is the most common print QR failure.'],
      images: [{ src: '/images/examples/print-svg-scaled.svg', alt: 'PNG at poster size', caption: 'A QR code exported as 200×200px PNG then scaled to 30cm (12in) becomes obviously pixelated. The module edges blur together, reducing contrast and scanner reliability. This is the most common print QR failure.' }],
    },
    {
      heading: 'SVG at poster size',
      paragraphs: ['The same QR code exported as SVG scales perfectly to any size. Module edges remain crisp because they\'re mathematically defined, not pixel-based. This works whether printed at 5cm or 5 metres.'],
    },
    {
      heading: 'Export workflow',
      paragraphs: ['In ANQR: 1. Design your QR code at any preview size. 2. Go to Output settings. 3. Select Format: SVG. 4. Enable \'True Vector\' for scalable paths. 5. Export and import into your design software. 6. Scale to final print size — it stays crisp.'],
    },
    {
      heading: 'When to use high-res PNG',
      paragraphs: ['If your workflow requires PNG: calculate final pixel dimensions (physical size × DPI). For a 10cm code at 300 DPI: 10cm ≈ 4 inches × 300 = 1200px. Export at 1200×1200px. This gives print-quality results without scaling.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&format=svg#output', label: 'Recreate in Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
      ],
    },

    // Example 4: Animated Signage QR (795-806)
    {
      heading: 'Animated Signage QR',
      paragraphs: ['Add attention-grabbing animation while maintaining scan reliability.'],
      images: [{ src: '/images/examples/animation-overview.svg', alt: 'Animated Signage QR', caption: 'Add attention-grabbing animation while maintaining scan reliability.' }],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Your digital signage competes for attention. Static QR codes get ignored among animated content. But aggressive animation can break scanning.'],
      images: [{ src: '/images/examples/animation-static.svg', alt: 'The challenge', caption: 'Your digital signage competes for attention. Static QR codes get ignored among animated content. But aggressive animation can break scanning.' }],
    },
    {
      heading: 'Safe animation approach',
      paragraphs: ['Use subtle animation that draws attention without disrupting the code structure. ANQR\'s \'Pulse\' pattern gently scales the code, \'Shimmer\' adds sparkle effects, and \'Wave\' creates flowing motion — all while keeping every frame scannable.'],
      images: [{ src: '/images/examples/animation-animated.svg', alt: 'Safe animation approach', caption: 'Use subtle animation that draws attention without disrupting the code structure. ANQR\'s \'Pulse\' pattern gently scales the code, \'Shimmer\' adds sparkle effects, and \'Wave\' creates flowing motion — all while keeping every frame scannable.' }],
    },
    {
      heading: 'Recommended settings',
      paragraphs: ['Pattern: Pulse or Shimmer. Speed: 200-300ms per frame. Error Correction: H (High). Temporal Dither: Flicker Safe. Always enable \'Preserve Finder Patterns\'. Test on your actual signage display hardware.'],
    },
    {
      heading: 'Format and delivery',
      paragraphs: ['Export as GIF for universal signage player support. Use 24-30 frames for smooth animation without excessive file size. If your signage supports video, MP4/WebM offers better quality but requires video playback capability.'],
    },
    {
      heading: 'Placement on screens',
      paragraphs: ['Position at comfortable scanning height. Allow 5+ seconds display time for viewers to notice and scan. Add a text prompt (\'Scan for details\') near the code. Ensure adequate contrast against your background content.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif#animation',
          label: 'Recreate in Generator',
          type: 'generator',
        },
        { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
      ],
    },

    // Example 5: Cross-Lingual QR Collaboration (807-817)
    {
      heading: 'Cross-Lingual QR Collaboration',
      paragraphs: ['Share QR configurations across teams in different languages.'],
      images: [{ src: '/images/examples/collab-overview.svg', alt: 'Cross-Lingual QR Collaboration', caption: 'Share QR configurations across teams in different languages.' }],
    },
    {
      heading: 'The challenge',
      paragraphs: ['Your international team needs to create consistent QR codes, but team members work in different languages. Manual configuration recreation is error-prone and time-consuming.'],
      images: [{ src: '/images/examples/collab-english.svg', alt: 'The challenge', caption: 'Your international team needs to create consistent QR codes, but team members work in different languages. Manual configuration recreation is error-prone and time-consuming.' }],
    },
    {
      heading: 'The solution',
      paragraphs: ['ANQR\'s share links encode all settings in the URL. Team members can open the same link in their preferred language — the QR configuration loads identically, but the interface displays in their locale.'],
      images: [{ src: '/images/examples/collab-japanese.svg', alt: 'The solution', caption: 'ANQR\'s share links encode all settings in the URL. Team members can open the same link in their preferred language — the QR configuration loads identically, but the interface displays in their locale.' }],
    },
    {
      heading: 'How it works',
      paragraphs: ['1. Configure your QR code in ANQR. 2. Click Share to generate a link. 3. Send the link to your colleague. 4. They open it — ANQR loads your exact settings. 5. They can switch their interface language without affecting the QR configuration. 6. Both team members export identical QR codes.'],
    },
    {
      heading: 'Language parameter',
      paragraphs: ['ANQR share links include a \'lang\' parameter for the interface language, but the QR content and styling settings are language-independent. Changing the lang parameter changes menus and labels, not the QR code itself.', 'Collaboration workflow'],
      links: [
        { href: '/?lang=${lang}&tab=professional#share', label: 'Recreate in Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'View QR examples', type: 'gallery' },
  ],
};

export default examples;
