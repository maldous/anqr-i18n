import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Learn with ANQR',
  description:
    'Practical guides for improving QR campaigns, payments, marketing, and cross-language sharing.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'View QR examples', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: 'Improving Existing QR Campaigns',
      paragraphs: [
        'How to audit, upgrade, and safely replace existing QR codes without breaking user journeys.',
      ],
      images: [
        {
          src: '/images/learn/campaign-overview.png',
          alt: 'Improving Existing QR Campaigns',
          caption:
            'How to audit, upgrade, and safely replace existing QR codes without breaking user journeys.',
        },
      ],
    },
    {
      heading: 'Why upgrade existing QR codes?',
      paragraphs: [
        'Many businesses have QR codes already in circulation — on packaging, signage, print materials, or products. These codes often use basic designs with no branding, poor error correction, or inadequate quiet zones. Upgrading them can improve scan reliability, brand recognition, and campaign tracking without changing the destination URL.',
      ],
    },
    {
      heading: 'Auditing your current QR codes',
      paragraphs: [
        'Before replacing any QR code, audit what you have. Scan each code with multiple apps (iOS Camera, Google Lens, dedicated QR scanners) to verify they work. Note the encoded content, print size, placement, and any scanning issues. Document which codes are on permanent materials (etched signs, product packaging) versus temporary ones (posters, flyers).',
      ],
      images: [
        {
          src: '/images/learn/campaign-before.png',
          alt: 'Auditing your current QR codes',
          caption:
            'Before replacing any QR code, audit what you have. Scan each code with multiple apps (iOS Camera, Google Lens, dedicated QR scanners) to verify they work. Note the encoded content, print size, placement, and any scanning issues. Document which codes are on permanent materials (etched signs, product packaging) versus temporary ones (posters, flyers).',
        },
        {
          src: '/images/learn/campaign-after.png',
          alt: 'Auditing your current QR codes',
          caption:
            'Before replacing any QR code, audit what you have. Scan each code with multiple apps (iOS Camera, Google Lens, dedicated QR scanners) to verify they work. Note the encoded content, print size, placement, and any scanning issues. Document which codes are on permanent materials (etched signs, product packaging) versus temporary ones (posters, flyers).',
        },
      ],
    },
    {
      heading: 'Safe replacement strategy',
      paragraphs: [
        'For codes on permanent materials, consider using a URL shortener or redirect service so you can change the destination without reprinting. For temporary materials, you can safely replace with upgraded designs. Always test the new code at actual print size before mass production.',
      ],
    },
    {
      heading: 'Adding branding safely',
      paragraphs: [
        "ANQR lets you add logos and brand colours while maintaining scannability. Use Error Correction H (High) when adding overlays — this provides 30% redundancy. Enable 'Preserve Finder Patterns' to keep the corner squares intact. Start with low overlay intensity (50-70%) and test thoroughly.",
      ],
    },
    {
      heading: 'Print vs digital considerations',
      paragraphs: [
        "Print QR codes need higher resolution (300+ DPI) and larger quiet zones to account for paper texture and viewing distance. Digital QR codes on screens can be smaller but must account for screen glare and refresh rates. ANQR's Safety Mode helps enforce minimum sizes for both contexts.",
      ],
    },
    {
      heading: 'Testing your upgraded codes',
      paragraphs: [
        "Always test with: (1) Multiple scanner apps, (2) Different lighting conditions, (3) Various distances, (4) The actual print material or screen type. ANQR's built-in validation scans the generated code to verify it decodes correctly.",
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#overlay',
          label: "Open this guide's recommended settings in the ANQR generator.",
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}',
          label: 'See related guides and examples',
          type: 'example',
        },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: 'QR Codes for Retail Payments',
      paragraphs: [
        'Design payment QR codes that are fast to scan, on-brand, and compatible with major wallets.',
      ],
      images: [
        {
          src: '/images/learn/retail-payment-overview.png',
          alt: 'QR Codes for Retail Payments',
          caption:
            'Design payment QR codes that are fast to scan, on-brand, and compatible with major wallets.',
        },
      ],
    },
    {
      heading: 'Payment QR requirements',
      paragraphs: [
        'Payment QR codes have stricter requirements than marketing codes. They must scan quickly (customers are waiting), work with specific wallet apps, and meet compliance standards. Most payment standards (UPI, PayNow, SEPA) specify exact encoding formats that ANQR supports.',
      ],
    },
    {
      heading: 'Sizing for point-of-sale',
      paragraphs: [
        "Counter displays need codes at least 3cm (1.2in) square for handheld scanning at 15-30cm distance. Wall-mounted codes for queue scanning should be 8-15cm (3-6in) for 0.5-2m distance. ANQR's Safety Mode enforces minimum module sizes suitable for payment contexts.",
      ],
      images: [
        {
          src: '/images/learn/retail-sizing.png',
          alt: 'Sizing for point-of-sale',
          caption:
            "Counter displays need codes at least 3cm (1.2in) square for handheld scanning at 15-30cm distance. Wall-mounted codes for queue scanning should be 8-15cm (3-6in) for 0.5-2m distance. ANQR's Safety Mode enforces minimum module sizes suitable for payment contexts.",
        },
      ],
    },
    {
      heading: 'Branding within compliance',
      paragraphs: [
        'Payment QR codes can include merchant branding, but with constraints. Keep logos small (under 20% of code area), maintain high contrast, and never modify finder patterns. Use Error Correction H and test with the actual payment apps your customers use (Google Pay, Apple Wallet, bank apps).',
      ],
    },
    {
      heading: 'POS display materials',
      paragraphs: [
        'Laminated displays resist fingerprints but can cause glare. Matte finishes scan better in bright environments. Angled stands (15-30°) reduce reflections. Consider environmental factors: outdoor payment points need weather protection and may need larger codes for variable lighting.',
      ],
    },
    {
      heading: 'Regional payment standards',
      paragraphs: [
        "ANQR supports regional payment formats: UPI/BharatQR (India), PayNow (Singapore), PromptPay (Thailand), PIX (Brazil), SEPA/EPC (Europe), and more. Each has specific field requirements — use ANQR's payment templates to ensure compliance.",
      ],
    },
    {
      heading: 'Testing payment codes',
      paragraphs: [
        'Test with actual payment apps, not just generic QR scanners. Verify the payment amount, recipient details, and reference fields parse correctly. Test in the actual installation environment with real lighting conditions.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: "Open this guide's recommended settings in the ANQR generator.",
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}',
          label: 'See related guides and examples',
          type: 'example',
        },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: 'Print-Ready QR Codes: SVG vs PNG',
      paragraphs: [
        'Why vector formats matter for print, and how to export QR codes that scale perfectly.',
      ],
      images: [
        {
          src: '/images/learn/print-svg-overview.png',
          alt: 'Print-Ready QR Codes: SVG vs PNG',
          caption:
            'Why vector formats matter for print, and how to export QR codes that scale perfectly.',
        },
      ],
    },
    {
      heading: 'Why SVG for print?',
      paragraphs: [
        'SVG (Scalable Vector Graphics) files contain mathematical descriptions of shapes, not pixels. This means they scale infinitely without quality loss. A QR code exported as SVG at 100px will print perfectly at poster size, while a PNG at the same size would be blurry or pixelated.',
      ],
    },
    {
      heading: 'When PNG is acceptable',
      paragraphs: [
        "PNG works fine when: (1) You export at final print resolution (e.g., 300 DPI × physical size), (2) The code won't be scaled up, (3) You're using digital displays at known resolutions. For flexibility and future-proofing, SVG is still preferred.",
      ],
      images: [
        {
          src: '/images/learn/print-png-pixelated.png',
          alt: 'When PNG is acceptable',
          caption:
            "PNG works fine when: (1) You export at final print resolution (e.g., 300 DPI × physical size), (2) The code won't be scaled up, (3) You're using digital displays at known resolutions. For flexibility and future-proofing, SVG is still preferred.",
        },
        {
          src: '/images/learn/print-svg-crisp.png',
          alt: 'When PNG is acceptable',
          caption:
            "PNG works fine when: (1) You export at final print resolution (e.g., 300 DPI × physical size), (2) The code won't be scaled up, (3) You're using digital displays at known resolutions. For flexibility and future-proofing, SVG is still preferred.",
        },
      ],
    },
    {
      heading: 'ANQR SVG export options',
      paragraphs: [
        "ANQR offers two SVG modes: 'True Vector' creates pure path-based SVG that scales perfectly and can be edited in Illustrator/Inkscape. 'Raster Embed' includes any overlay image as an embedded bitmap — useful when you need overlays but still want vector module shapes.",
      ],
    },
    {
      heading: 'Print workflow integration',
      paragraphs: [
        'Export SVG from ANQR, then import into your design software (InDesign, Illustrator, Canva Pro). Place the QR code at final print size and verify the quiet zone is preserved. Most print shops prefer PDF delivery — your design software can embed the SVG in the final PDF.',
      ],
    },
    {
      heading: 'Resolution and DPI settings',
      paragraphs: [
        "For PNG export intended for print: multiply your physical size by DPI. A 2-inch code at 300 DPI needs 600×600px. ANQR's DPI setting embeds this metadata for print software. For screens, 72-96 DPI is standard.",
      ],
    },
    {
      heading: 'Avoiding common print mistakes',
      paragraphs: [
        "Don't: scale up low-res exports, compress QR images as JPEG (artifacts break scanning), place codes in fold/cut zones, or reduce quiet zones to fit layouts. Do: export at target size, use lossless formats, test actual print samples.",
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: "Open this guide's recommended settings in the ANQR generator.",
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}',
          label: 'See related guides and examples',
          type: 'example',
        },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: 'Animated QR Codes for Digital Signage',
      paragraphs: [
        'When and how to use animated QR codes on screens while keeping them scannable.',
      ],
      images: [
        {
          src: '/images/learn/animation-overview.png',
          alt: 'Animated QR Codes for Digital Signage',
          caption: 'When and how to use animated QR codes on screens while keeping them scannable.',
        },
      ],
    },
    {
      heading: 'When animation helps',
      paragraphs: [
        'Animation catches attention on busy digital displays where static content is ignored. Subtle animations (gentle pulse, colour shift) draw the eye without disrupting scanning. Animation works best for: retail screens, event displays, interactive kiosks, and social media content.',
      ],
    },
    {
      heading: 'When animation hurts',
      paragraphs: [
        'Avoid animation for: payment QR codes (speed matters), codes viewed briefly (transit ads), codes on screens with poor refresh rates, or when the environment has many competing visuals. When in doubt, test animated vs static with your target audience.',
      ],
      images: [
        {
          src: '/images/learn/animation-static.png',
          alt: 'When animation hurts',
          caption:
            'Avoid animation for: payment QR codes (speed matters), codes viewed briefly (transit ads), codes on screens with poor refresh rates, or when the environment has many competing visuals. When in doubt, test animated vs static with your target audience.',
        },
        {
          src: '/images/learn/animation-animated.gif',
          alt: 'When animation hurts',
          caption:
            'Avoid animation for: payment QR codes (speed matters), codes viewed briefly (transit ads), codes on screens with poor refresh rates, or when the environment has many competing visuals. When in doubt, test animated vs static with your target audience.',
        },
      ],
    },
    {
      heading: 'Safe animation parameters',
      paragraphs: [
        "For reliable scanning: keep animation speed slow (200ms+ per frame), avoid rapid flashing, maintain consistent contrast throughout animation, and ensure every frame scans independently. ANQR's 'Flicker Safe' temporal dithering helps prevent strobing effects.",
      ],
    },
    {
      heading: 'Recommended animation styles',
      paragraphs: [
        'Pulse: Gentle size oscillation draws attention without breaking scanning. Wave: Flowing patterns add movement while keeping structure intact. Colour Cycle: Hue shifts maintain contrast while adding visual interest. Shimmer: Subtle sparkle effects on module edges.',
      ],
    },
    {
      heading: 'Format considerations',
      paragraphs: [
        'GIF: Universal support, limited to 256 colours, larger files. APNG: Better quality, less browser support. Video (MP4/WebM): Best quality, requires video player context. ANQR exports GIF by default — test on your actual signage player.',
      ],
    },
    {
      heading: 'Screen placement tips',
      paragraphs: [
        "Position QR codes at comfortable scanning height (1.2-1.5m for standing viewers). Avoid screen edges where distortion occurs. Allow adequate dwell time — 5+ seconds for viewers to notice, pull out phone, and scan. Consider adding a 'Scan Me' call-to-action.",
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: "Open this guide's recommended settings in the ANQR generator.",
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}',
          label: 'See related guides and examples',
          type: 'example',
        },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: 'QR Code Safety and Compliance',
      paragraphs: [
        "Understanding quiet zones, contrast, error correction, and what ANQR's Safety Mode enforces.",
      ],
      images: [
        {
          src: '/images/learn/safety-overview.png',
          alt: 'QR Code Safety and Compliance',
          caption:
            "Understanding quiet zones, contrast, error correction, and what ANQR's Safety Mode enforces.",
        },
      ],
    },
    {
      heading: 'The quiet zone requirement',
      paragraphs: [
        "The quiet zone is the blank margin around every QR code. Scanners need this space to detect code boundaries. ISO 18004 recommends 4 modules minimum. Cutting into the quiet zone is the most common cause of scanning failures. ANQR's Safety Mode enforces this minimum.",
      ],
      images: [
        {
          src: '/images/learn/safety-quiet-zone.png',
          alt: 'The quiet zone requirement',
          caption:
            "The quiet zone is the blank margin around every QR code. Scanners need this space to detect code boundaries. ISO 18004 recommends 4 modules minimum. Cutting into the quiet zone is the most common cause of scanning failures. ANQR's Safety Mode enforces this minimum.",
        },
      ],
    },
    {
      heading: 'Contrast requirements',
      paragraphs: [
        "QR codes need high contrast between foreground and background. The ISO standard assumes black on white, but any high-contrast combination works. Avoid: low-contrast colour pairs, gradients that reduce contrast in areas, or backgrounds that interfere with the quiet zone. ANQR's Contrast Guard warns about problematic combinations.",
      ],
      images: [
        {
          src: '/images/learn/safety-contrast.png',
          alt: 'Contrast requirements',
          caption:
            "QR codes need high contrast between foreground and background. The ISO standard assumes black on white, but any high-contrast combination works. Avoid: low-contrast colour pairs, gradients that reduce contrast in areas, or backgrounds that interfere with the quiet zone. ANQR's Contrast Guard warns about problematic combinations.",
        },
      ],
    },
    {
      heading: 'Error correction explained',
      paragraphs: [
        'QR codes include redundant data for error correction. Level L allows 7% damage, M allows 15%, Q allows 25%, H allows 30%. Use H (High) when adding overlays, printing on textured materials, or expecting wear. Higher correction = slightly larger codes.',
      ],
    },
    {
      heading: 'What Safety Mode enforces',
      paragraphs: [
        "ANQR's Safety Mode (Balanced or Strict) automatically: enforces minimum quiet zone, warns about low contrast, limits overlay intensity based on error correction level, protects finder/timing/alignment patterns from modification, and validates the final code scans correctly.",
      ],
    },
    {
      heading: 'Logo and overlay limits',
      paragraphs: [
        "Overlays covering more than 30% of data modules risk scan failure even with H error correction. ANQR's ECC-Aware mode intelligently distributes overlay impact to stay within safe limits. Always keep finder patterns (corner squares) completely unmodified.",
      ],
    },
    {
      heading: 'Compliance for specific industries',
      paragraphs: [
        'Some industries have specific QR requirements: payment systems mandate exact encoding formats, pharmaceutical tracking requires GS1 compliance, event tickets may need encrypted payloads. ANQR supports these standards — use the appropriate content type template.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#safety',
          label: "Open this guide's recommended settings in the ANQR generator.",
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}',
          label: 'See related guides and examples',
          type: 'example',
        },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: 'Open the full User Guide', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'View QR examples', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'View QR examples', type: 'gallery' },
  ],
};

export default learn;
