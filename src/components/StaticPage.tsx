/**
 * StaticPage
 * About, Privacy, Terms, Contact, and Docs pages.
 */

import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdUnit } from '@/components/AdUnit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDown, ChevronUp, List, X, Menu } from 'lucide-react'

export type StaticPageType = 'about' | 'docs' | 'privacy' | 'terms' | 'contact'

interface StaticPageProps {
  page: StaticPageType
}

type PageSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

// Helper to generate URL-friendly slug from heading
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper to render text with clickable URLs
function renderTextWithLinks(text: string): React.ReactNode {
  // Match URLs starting with http:// or https://
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)
  
  if (parts.length === 1) {
    return text
  }
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline break-all"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

// ToC group structure for docs
type TocGroup = {
  title: string
  items: Array<{ heading: string; slug: string }>
}

// Group docs sections into logical categories
function buildDocsToc(sections: PageSection[]): TocGroup[] {
  const groups: TocGroup[] = [
    { title: 'Getting Started', items: [] },
    { title: 'Basic', items: [] },
    { title: 'Advanced', items: [] },
    { title: 'Professional', items: [] },
    { title: 'Tips & Help', items: [] },
  ]

  let currentGroupIndex = 0

  for (const section of sections) {
    const heading = section.heading
    const slug = slugify(heading)

    // Determine which group this section belongs to
    if (heading === 'Getting Started' || heading === 'Quick Start') {
      currentGroupIndex = 0
    } else if (heading === 'Basic Features') {
      currentGroupIndex = 1
    } else if (heading === 'Advanced Features') {
      currentGroupIndex = 2
    } else if (heading === 'Professional Features') {
      currentGroupIndex = 3
    } else if (heading === 'Best Practices') {
      currentGroupIndex = 4
    }

    groups[currentGroupIndex].items.push({ heading, slug })
  }

  return groups.filter(g => g.items.length > 0)
}

type PageDefinition = {
  title: string
  description: string
  lastUpdated?: string
  sections: PageSection[]
}

const LAST_UPDATED = '1 January 2026'
const CONTACT_EMAIL = 'email@anqr.link'

const pages: Record<StaticPageType, PageDefinition> = {
  about: {
    title: 'About ANQR',
    description:
      'ANQR is a free, browser-based QR code generator with no account required.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'What is ANQR?',
        paragraphs: [
          'ANQR (pronounced "anchor") is a free online QR code generator that runs entirely in your web browser. Create QR codes for URLs, text, Wi-Fi credentials, contact cards, calendar events, and more.',
          'The tool is designed for individuals, small businesses, marketers, and developers who need to create QR codes quickly without signing up for an account or installing software.',
        ],
      },
      {
        heading: 'Key features',
        bullets: [
          'Generate QR codes instantly in your browser — no server uploads, no account required.',
          'Customise appearance with colours, module styles, finder patterns, and image overlays.',
          'Export in multiple formats: PNG, SVG, WebP, and animated GIF.',
          'Advanced options for error correction, version control, and encoding modes.',
          'Safety analysis tools to help ensure your QR codes remain scannable.',
          'Three feature levels (Basic, Advanced, Professional) to match your needs.',
        ],
      },
      {
        heading: 'How ANQR works',
        paragraphs: [
          'ANQR processes everything locally in your browser using JavaScript. The text or data you enter to create a QR code never leaves your device — it is encoded directly on your computer or phone.',
          'When you upload an overlay image from your device, it is processed locally. If you load an image from a URL, your browser fetches that image directly from its host server.',
          'We do not store, log, or have access to the content you encode into QR codes.',
        ],
      },
      {
        heading: 'Who operates ANQR?',
        paragraphs: [
          `ANQR is operated as an independent web tool. For questions, support, or business enquiries, please use the Contact page or email ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Advertising and how we stay free',
        paragraphs: [
          'ANQR is free to use and supported by advertising. We display ads through Google AdSense and potentially other advertising partners.',
          'These advertising services may use cookies and similar technologies to serve ads based on your interests and browsing history. You can learn more about this in our Privacy Policy, and you can manage your ad preferences through your browser settings or Google\'s Ads Settings.',
          'We believe in transparency: ads help us keep the tool free and accessible to everyone without requiring subscriptions or paywalls.',
        ],
      },
      {
        heading: 'Open standards',
        paragraphs: [
          'QR codes are an open ISO standard (ISO/IEC 18004). ANQR generates standard-compliant QR codes that work with any QR scanner app or device.',
        ],
      },
      {
        heading: 'Trademark notice',
        paragraphs: [
          'QR Code® is a registered trademark of DENSO WAVE INCORPORATED. ANQR is an independent tool and is not affiliated with, endorsed by, or sponsored by DENSO WAVE INCORPORATED.',
        ],
      },
      {
        heading: 'Feedback and contributions',
        paragraphs: [
          'We welcome feedback, bug reports, and feature suggestions. Please use the Contact page to get in touch. We read every message, though response times may vary.',
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    description:
      'Information ANQR collects, how it is used, and your rights under applicable privacy laws.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Summary',
        paragraphs: [
          'ANQR is a browser-based QR code generator. We do not require you to create an account, and QR codes are generated locally in your browser — we do not have access to the content you encode.',
          'We use Google AdSense for advertising and may use analytics services. These services collect information through cookies and similar technologies. This policy explains what data is collected, how it is used, and your rights.',
        ],
      },
      {
        heading: 'Information we collect',
        bullets: [
          'Information you provide: If you contact us via email or our contact form, we collect your name, email address, and message content.',
          'Automatically collected information: Our hosting provider (Netlify), advertising partners, and analytics services may collect: IP address, browser type and version, operating system, device type, referring URL, pages visited, time on site, and approximate geographic location.',
          'Third-party cookies: Our advertising partners (Google AdSense) use cookies and similar technologies to serve and measure advertisements. ANQR itself does not set any first-party cookies.',
        ],
      },
      {
        heading: 'Cookies and third-party technologies',
        paragraphs: [
          'ANQR does not set any first-party cookies. Your preferences (such as dark mode) are stored locally in your browser using localStorage, which is not transmitted to any server.',
          'However, our advertising partners (Google AdSense) and hosting provider may use cookies and similar tracking technologies:',
        ],
        bullets: [
          'Advertising cookies (third-party): Set by Google AdSense and advertising partners to serve relevant ads, measure ad performance, and understand user interests. These cookies may track your activity across different websites.',
          'Analytics cookies (third-party): May be used by our hosting provider or analytics services to collect anonymised usage data.',
        ],
      },
      {
        heading: 'Google AdSense and advertising',
        paragraphs: [
          'We display advertisements through Google AdSense. Google and its partners use cookies to serve ads based on your browsing history on this site and other websites (interest-based advertising).',
          'Learn how Google uses your information: https://policies.google.com/technologies/partner-sites',
          'Manage ad personalisation: https://adssettings.google.com',
          'Opt out via Network Advertising Initiative: https://optout.networkadvertising.org',
          'Opt out via Digital Advertising Alliance: https://optout.aboutads.info',
        ],
      },
      {
        heading: 'How we use information',
        bullets: [
          'To respond to your enquiries and provide support.',
          'To display relevant advertisements through our advertising partners.',
          'To analyse site usage and improve our services.',
          'To detect, prevent, and address fraud, abuse, and security issues.',
          'To comply with legal obligations.',
        ],
      },
      {
        heading: 'Third-party services',
        bullets: [
          'Google AdSense: Receives data to serve and measure advertisements.',
          'Analytics providers: Receive anonymised usage data.',
          'Netlify (hosting): Processes requests and may log IP addresses.',
          'We do not sell your personal information. However, sharing data with advertising partners may be considered a "sale" under CCPA (see below).',
        ],
      },
      {
        heading: 'Data retention',
        bullets: [
          'Contact submissions: Up to 2 years.',
          'Server logs: Up to 30 days (hosting provider).',
          'Analytics data: Up to 26 months (anonymised).',
          'Advertising cookies: Typically 13 months (varies by partner).',
        ],
      },
      {
        heading: 'Your rights under GDPR (EEA users)',
        paragraphs: [
          'If you are in the European Economic Area, you have the following rights under the General Data Protection Regulation:',
        ],
        bullets: [
          'Right of access: Request a copy of personal data we hold about you.',
          'Right to rectification: Request correction of inaccurate data.',
          'Right to erasure: Request deletion of your data ("right to be forgotten").',
          'Right to restrict processing: Request limits on how we use your data.',
          'Right to data portability: Request your data in a portable format.',
          'Right to object: Object to processing, including for direct marketing.',
          'Right to withdraw consent: Withdraw consent at any time where processing is consent-based.',
          'Right to lodge a complaint: File a complaint with your data protection authority.',
        ],
      },
      {
        heading: 'GDPR legal basis',
        paragraphs: [
          'We process data on these bases: (a) Consent — for personalised advertising (managed by our advertising partners); (b) Legitimate interests — for analytics, security, and improvement; (c) Contract — to respond to enquiries.',
          `To exercise your rights, contact ${CONTACT_EMAIL}. We respond within 30 days.`,
        ],
      },
      {
        heading: 'Your rights under CCPA (California users)',
        bullets: [
          'Right to know: Request information about data collected, sources, purposes, and third parties.',
          'Right to delete: Request deletion of your personal information.',
          'Right to opt-out: Opt out of the "sale" of personal information (sharing with ad partners may qualify).',
          'Right to non-discrimination: We will not discriminate for exercising your rights.',
        ],
      },
      {
        heading: 'CCPA categories collected',
        paragraphs: [
          'Categories: Identifiers (IP address, device ID), Internet activity (browsing, ad interactions), Geolocation (approximate), Inferences (interests from browsing).',
          `To exercise rights or opt out: ${CONTACT_EMAIL} or adjust cookie settings.`,
        ],
      },
      {
        heading: 'International transfers',
        paragraphs: [
          'Your information may be transferred to countries with different data protection laws, including the United States. We use appropriate safeguards such as Standard Contractual Clauses.',
        ],
      },
      {
        heading: 'Children\'s privacy',
        paragraphs: [
          `ANQR is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. Contact ${CONTACT_EMAIL} if you believe a child has provided information.`,
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We use appropriate technical and organisational measures to protect data, including HTTPS encryption. However, no internet transmission is 100% secure.',
        ],
      },
      {
        heading: 'Do Not Track',
        paragraphs: [
          'We honour Do Not Track browser signals where feasible, though advertising partners may not respond to DNT.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this policy periodically. The "Last updated" date indicates the most recent revision. Significant changes may be communicated via a site banner.',
        ],
      },
      {
        heading: 'Contact us',
        paragraphs: [
          `For privacy questions or to exercise your rights: ${CONTACT_EMAIL} or use our Contact page. We respond to privacy requests within 30 days.`,
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    description:
      'By accessing or using the site, you agree to be bound by these terms.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'Acceptance of terms',
        paragraphs: [
          'By accessing or using ANQR (anqr.link), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the site.',
          'We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.',
        ],
      },
      {
        heading: 'Eligibility',
        paragraphs: [
          'You must be at least 13 years of age to use ANQR. By using the site, you represent that you meet this age requirement. If you are under 18, you represent that you have your parent or guardian\'s permission to use the site.',
        ],
      },
      {
        heading: 'Permitted use',
        paragraphs: [
          'You may use ANQR for lawful purposes only. You are solely responsible for the content you encode into QR codes and for how you use any QR codes you generate.',
        ],
      },
      {
        heading: 'Prohibited conduct',
        paragraphs: [
          'You agree not to:',
        ],
        bullets: [
          'Use ANQR to create QR codes that facilitate phishing, malware distribution, fraud, scams, harassment, defamation, or any illegal activity.',
          'Encode content that infringes intellectual property rights, violates privacy, or contains illegal material.',
          'Attempt to disrupt, overload, or interfere with the operation or security of the site.',
          'Reverse engineer, decompile, or attempt to extract source code from the site.',
          'Use automated tools (bots, scrapers) to access the site in a manner that degrades performance for other users.',
          'Circumvent or disable any security or access control features.',
          'Impersonate any person or entity or misrepresent your affiliation.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'You retain ownership of the content you encode into QR codes. ANQR does not claim ownership of your data.',
          'The ANQR name, logo, interface design, and underlying code are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our permission.',
          'QR Code® is a registered trademark of DENSO WAVE INCORPORATED. ANQR is not affiliated with DENSO WAVE.',
        ],
      },
      {
        heading: 'User content license',
        paragraphs: [
          'By using ANQR, you grant us no rights to your content — all QR code generation happens locally in your browser and we do not access, store, or transmit your encoded data.',
        ],
      },
      {
        heading: 'Third-party services and advertising',
        paragraphs: [
          'The site displays advertisements through Google AdSense and may include links to third-party websites. We are not responsible for third-party content, services, or privacy practices.',
          'Your interactions with advertisers and third parties are solely between you and them. See our Privacy Policy for information about advertising data practices.',
        ],
      },
      {
        heading: 'Disclaimer of warranties',
        paragraphs: [
          'ANQR IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
          'We do not warrant that: (a) the site will be uninterrupted, secure, or error-free; (b) QR codes will scan in all environments, on all devices, or with all scanner applications; (c) the site will meet your requirements.',
          'You should always test QR codes in the conditions where they will be used (print size, lighting, screen type, distance, camera quality).',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANQR AND ITS OPERATORS, AFFILIATES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, USE, OR OTHER INTANGIBLE LOSSES, ARISING FROM OR RELATED TO YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.',
          'YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED FREE OF CHARGE, AND ACCORDINGLY, YOU AGREE THAT ANQR AND ITS OPERATORS SHALL HAVE NO LIABILITY TO YOU WHATSOEVER FOR ANY DAMAGES OR LOSSES. IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED ZERO DOLLARS ($0 AUD).',
          'YOU AGREE TO RELEASE, WAIVE, AND DISCHARGE ANY AND ALL CLAIMS, DEMANDS, AND CAUSES OF ACTION AGAINST ANQR AND ITS OPERATORS ARISING FROM YOUR USE OF THE SERVICE.',
          'SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATIONS OF LIABILITY. IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.',
        ],
      },
      {
        heading: 'Indemnification',
        paragraphs: [
          'You agree to indemnify, defend, and hold harmless ANQR, its operators, affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from: (a) your use of the site; (b) your violation of these Terms; (c) your violation of any third-party rights; (d) any content you encode into QR codes.',
        ],
      },
      {
        heading: 'Dispute resolution',
        paragraphs: [
          `Any dispute arising from these Terms or your use of ANQR shall first be attempted to be resolved through informal negotiation by contacting ${CONTACT_EMAIL}.`,
          'If informal resolution fails, disputes shall be resolved through binding arbitration in Victoria, Australia, except that either party may seek injunctive relief in court for intellectual property violations.',
        ],
      },
      {
        heading: 'Class action waiver',
        paragraphs: [
          'TO THE EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These Terms are governed by the laws of Victoria, Australia, without regard to conflict of laws principles. You consent to the exclusive jurisdiction of the courts located in Victoria, Australia.',
        ],
      },
      {
        heading: 'Changes and availability',
        paragraphs: [
          'We may modify, suspend, or discontinue the site (or any part of it) at any time without notice or liability.',
          'We may update these Terms at any time. The "Last updated" date indicates when they were most recently revised. Continued use after changes constitutes acceptance.',
        ],
      },
      {
        heading: 'Severability',
        paragraphs: [
          'If any provision of these Terms is held invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.',
        ],
      },
      {
        heading: 'Waiver',
        paragraphs: [
          'Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.',
        ],
      },
      {
        heading: 'Entire agreement',
        paragraphs: [
          'These Terms, together with our Privacy Policy, constitute the entire agreement between you and ANQR regarding your use of the site and supersede any prior agreements.',
        ],
      },
      {
        heading: 'Force majeure',
        paragraphs: [
          'We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, government actions, or internet/infrastructure failures.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `Questions about these Terms can be sent to: ${CONTACT_EMAIL}`,
        ],
      },
    ],
  },

  contact: {
    title: 'Contact Us',
    description:
      'We welcome feedback, bug reports, feature requests, and general enquiries.',
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        heading: 'How to reach us',
        paragraphs: [
          'We offer several ways to contact us depending on your needs. We read every message, though response times may vary based on volume and enquiry type.',
        ],
      },
      {
        heading: 'Email',
        paragraphs: [
          `For all enquiries: ${CONTACT_EMAIL}`,
          'This is the most reliable way to reach us and is recommended for detailed questions, business enquiries, or if the contact form does not work in your browser.',
        ],
      },
      {
        heading: 'Contact form',
        paragraphs: [
          'Use the form below to send us a message directly. If the form does not submit successfully (which can happen with some browser configurations), please use email instead.',
        ],
      },
      {
        heading: 'Types of enquiries',
        bullets: [
          'General questions: Questions about how to use ANQR, feature explanations, or general feedback.',
          'Bug reports: Please include your browser, operating system, steps to reproduce, and any error messages you see.',
          'Feature requests: Suggestions for new features or improvements. We consider all requests though we cannot promise implementation.',
          'Business enquiries: Partnership opportunities, licensing questions, or commercial use enquiries.',
          'Privacy requests: Requests to exercise your privacy rights under GDPR, CCPA, or other privacy laws (see Privacy Policy).',
          'DMCA/Copyright: See the DMCA section below for takedown notice requirements.',
        ],
      },
      {
        heading: 'Response times',
        paragraphs: [
          'We aim to respond to enquiries within 5-7 business days. Privacy-related requests will be addressed within 30 days as required by law.',
          'During busy periods, response times may be longer. For urgent matters, please indicate "URGENT" in your subject line.',
        ],
      },
      {
        heading: 'Before contacting us',
        paragraphs: [
          'Please check our Documentation page for answers to common questions about how to use ANQR features. Many questions about QR code generation, styling, and export options are covered there.',
        ],
      },
      {
        heading: 'DMCA Copyright Notices',
        paragraphs: [
          'If you believe that content available on ANQR infringes your copyright, you may submit a Digital Millennium Copyright Act (DMCA) takedown notice. To be valid, your notice must include:',
        ],
        bullets: [
          'A physical or electronic signature of the copyright owner or authorised agent.',
          'Identification of the copyrighted work claimed to have been infringed.',
          'Identification of the material that is claimed to be infringing, with information sufficient to locate it.',
          'Your contact information (address, telephone number, and email address).',
          'A statement that you have a good faith belief that use of the material is not authorised by the copyright owner.',
          'A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on their behalf.',
        ],
      },
      {
        heading: 'DMCA Contact',
        paragraphs: [
          `Send DMCA notices to: ${CONTACT_EMAIL}`,
          'Please include "DMCA Notice" in the subject line. We will respond to valid notices in accordance with applicable law. Note that ANQR generates QR codes locally in user browsers and does not host user-generated content.',
        ],
      },
    ],
  },

  docs: {
    title: 'ANQR Documentation',
    description:
      'Complete guide to using ANQR for creating QR codes.',
    lastUpdated: LAST_UPDATED,
    sections: [
      // ==================== GETTING STARTED ====================
      {
        heading: 'Getting Started',
        paragraphs: [
          'ANQR is a browser-based QR code generator that runs entirely in your browser. No account is required, and your data stays on your device.',
          'The interface has three interface levels: Basic, Advanced, and Professional. Select your level using the tabs in the header. Each level unlocks additional features while keeping the interface focused on what you need.',
        ],
        bullets: [
          'Basic: Simple QR code creation with plain text/URL content and image overlay.',
          'Advanced: QR encoding options, rendering styles, animation, output formats, extended content types, and overlay customization.',
          'Professional: Watermarks, metadata, sharing, safety analysis, payment QR codes, and enterprise features.',
        ],
      },
      {
        heading: 'Quick Start',
        paragraphs: [
          'To create your first QR code:',
        ],
        bullets: [
          '1. Select a content type (URL, text, WiFi, etc.) from the Content Type dropdown.',
          '2. Enter your data in the provided fields.',
          '3. Optionally customize colors, styles, and add an overlay image.',
          '4. Click Export to download your QR code as PNG, GIF, WebP, or SVG.',
        ],
      },

      // ==================== BASIC TIER ====================
      {
        heading: 'Basic Features',
        paragraphs: [
          'The Basic level provides a streamlined interface for creating QR codes with payload content and image overlays. This is the simplest way to get started.',
        ],
      },
      {
        heading: 'Content Types (Basic)',
        paragraphs: [
          'Plain Text: Encode any text up to the QR code capacity limit. Ideal for short messages, codes, or identifiers.',
          'URL: Encode web addresses. The QR code will open the URL when scanned. Supports http:// and https:// protocols.',
        ],
      },
      {
        heading: 'Image Overlay (Basic)',
        paragraphs: [
          'Upload an image (JPG, PNG, GIF, WebP) to blend with your QR code. Basic overlay features include:',
        ],
        bullets: [
          'Upload from file: Select an image from your device.',
          'Load from URL: Enter an image URL (must allow CORS).',
          'Center Logo: Places image in the center, relying on error correction.',
          'Blend: Simple alpha blending of image with QR pattern.',
          'Intensity: Controls how strongly the overlay affects the QR code (0-100%).',
          'Color Mode: Full Color, Grayscale, or Black & White.',
          'Preserve Finder Patterns: Keeps corner patterns unmodified for reliable scanning.',
        ],
      },

      // ==================== ADVANCED TIER ====================
      {
        heading: 'Advanced Features',
        paragraphs: [
          'The Advanced level unlocks QR encoding options, rendering styles, animation, output formats, extended content types, and advanced overlay customization.',
        ],
      },
      {
        heading: 'QR Encoding Settings',
        paragraphs: [
          'Version: QR codes come in versions 1-40, with higher versions holding more data but being larger. Set to 0 (Auto) to let ANQR choose the smallest version that fits your content.',
          'Error Correction: Determines how much damage a QR code can sustain while remaining scannable.',
        ],
        bullets: [
          'L (Low): 7% error correction - smallest size, least redundancy.',
          'M (Medium): 15% error correction - balanced option.',
          'Q (Quartile): 25% error correction - good for printed codes.',
          'H (High): 30% error correction - best for codes with overlays or in harsh conditions.',
        ],
      },
      {
        heading: 'Quiet Zone (Margin)',
        paragraphs: [
          'The quiet zone is the white space around the QR code. Scanners need this margin to detect where the code starts. The standard recommends at least 4 modules. Reducing below 4 may cause scanning issues.',
        ],
      },
      {
        heading: 'Module Style',
        paragraphs: [
          'Modules are the individual squares that make up a QR code. ANQR offers five styles:',
        ],
        bullets: [
          'Square: Classic QR appearance with sharp corners.',
          'Rounded: Softened corners for a friendlier look.',
          'Dots: Circular modules for a modern aesthetic.',
          'Diamond: 45° rotated squares for a distinctive pattern.',
          'Connected: Modules merge when adjacent, creating organic shapes.',
        ],
      },
      {
        heading: 'Finder Pattern Style',
        paragraphs: [
          'Finder patterns are the three large squares in QR corners that help scanners orient the code. Available styles:',
        ],
        bullets: [
          'Square: Standard square corners.',
          'Rounded: Softened corners matching rounded module style.',
          'Circle: Circular finder patterns for dot-style codes.',
        ],
      },
      {
        heading: 'Alignment & Timing Patterns',
        paragraphs: [
          'Alignment patterns appear in larger QR codes (version 2+) to help correct distortion. Timing patterns are the alternating lines connecting finder patterns.',
        ],
        bullets: [
          'Alignment Style: Match Finder, Square, Rounded, or Circle.',
          'Timing Style: Match Module, Solid, or Dashed.',
        ],
      },
      {
        heading: 'Colors',
        paragraphs: [
          'Foreground: The color of the QR modules. Black (#000000) is standard but any dark color works.',
          'Background: The background color. White (#ffffff) is standard. Ensure sufficient contrast with the foreground.',
          'Transparent Background: Remove the background entirely for use on colored surfaces. Ensure the surface provides adequate contrast.',
        ],
      },
      {
        heading: 'Module Size & Gap',
        paragraphs: [
          'Module Size: Controls how large each module is rendered in pixels. Larger values create bigger, easier-to-scan codes.',
          'Module Gap: Adds space between modules as a percentage. Small gaps (5-15%) can improve scannability in some conditions but excessive gaps reduce reliability.',
        ],
      },
      {
        heading: 'Output Settings',
        paragraphs: [
          'Format: Choose your export format based on use case.',
        ],
        bullets: [
          'PNG: Lossless raster format, ideal for most uses. Best for print and digital.',
          'WebP: Modern format with smaller file sizes. Good for web use.',
          'GIF: Required for animated QR codes. Supports transparency.',
          'SVG: Vector format that scales infinitely. Best for large print or when you need to edit the code.',
        ],
      },
      {
        heading: 'Output Dimensions',
        paragraphs: [
          'Width/Height: Set the output size in pixels. For print, calculate based on DPI (e.g., 300 DPI at 1 inch = 300px). Larger sizes scan more reliably at distance.',
        ],
      },
      {
        heading: 'Animation Settings (Advanced)',
        paragraphs: [
          'Control animated QR code behavior:',
        ],
        bullets: [
          'Speed: Animation frame rate in milliseconds.',
          'Loop: Continuous or single-play animation.',
          'Bounce: Ping-pong animation direction.',
          'Start Frame: Begin animation from specific frame.',
          'Max Frames: Limit total frames in animation.',
          'Frame Step: Skip frames for faster animation.',
          'Interpolation: None, Crossfade, or Morph between frames.',
        ],
      },
      {
        heading: 'Content Types (Advanced)',
        paragraphs: [
          'Advanced level unlocks additional payload formats:',
        ],
        bullets: [
          'Phone Number (tel:): Creates a callable phone link.',
          'Email (mailto:): Opens email client with optional subject and body.',
          'SMS: Pre-filled text message to a phone number.',
          'vCard: Full contact card with name, organization, phone, email, address.',
          'MeCard: Compact contact format popular in Japan.',
          'BizCard: Legacy business card format.',
          'Geo Location: GPS coordinates that open in maps.',
          'WiFi: Network credentials for automatic connection (SSID, password, security type).',
          'Calendar Event: iCalendar format with title, location, date/time.',
          'Event RSVP: Link to event registration page.',
          'Calendar Subscribe: Subscribe to an ICS/WebCal feed.',
          'File/Document URL: Direct link to downloadable files.',
          'Cloud Storage Link: Links to Google Drive, Dropbox, OneDrive, etc.',
          'Social Profile: Links to LinkedIn, Twitter, Instagram, etc.',
          'Messaging Link: WhatsApp, Telegram, Signal deep links.',
        ],
      },
      {
        heading: 'Advanced Overlay Features',
        paragraphs: [
          'Additional overlay capabilities:',
        ],
        bullets: [
          'Crop: Enable cropping to select a square region of your image.',
          'Halftone: Classic print-style dot pattern based on image brightness.',
          'Dithered: Error-diffusion dithering for detailed reproduction.',
        ],
      },
      {
        heading: 'Overlay Blend Modes (Advanced)',
        paragraphs: [
          'Additional blend modes in Advanced level:',
        ],
        bullets: [
          'Subpixel: Divides each module into subpixels for higher detail.',
          'Blue Noise: Uses blue noise dithering for artifact-free patterns.',
          'Mosaic: Tile-based effect preserving image structure.',
          'Gap Fill: Places image in gaps between modules.',
          'Brightness: Varies module size based on image brightness.',
          'Duotone: Maps image to two colors for striking contrast.',
        ],
      },
      {
        heading: 'Overlay Intensity',
        paragraphs: [
          'Controls how strongly the overlay affects the QR code (0-100%). Higher values show more image detail but may reduce scannability. Start around 70% and adjust based on testing.',
        ],
      },
      {
        heading: 'Color Mode',
        paragraphs: [
          'How the overlay image is processed:',
        ],
        bullets: [
          'Full Color: Preserves original image colors.',
          'Grayscale: Converts to black and white tones.',
          'Black & White: High contrast binary conversion.',
        ],
      },
      {
        heading: 'Preserve Finder Patterns',
        paragraphs: [
          'When enabled, keeps the three corner finder patterns unmodified by the overlay. Strongly recommended for reliable scanning.',
        ],
      },
      {
        heading: 'Image Preprocessing',
        paragraphs: [
          'Apply filters to your overlay image before blending. These adjustments can improve how the image appears in the final QR code.',
        ],
        bullets: [
          'Brightness (-100 to +100): Lighten or darken the image.',
          'Contrast (-100 to +100): Increase or decrease tonal range.',
          'Gamma (0.2 to 3.0): Non-linear brightness adjustment. Values below 1 lighten midtones, above 1 darken them.',
          'Saturation (-100 to +100): Color intensity. -100 is grayscale, +100 is oversaturated.',
          'Hue Rotate (0-360°): Shift all colors around the color wheel.',
          'Blur (0-20px): Soften image details.',
          'Sharpen (0-100%): Enhance edges and details.',
          'Posterize (0-16 levels): Reduce color levels for a poster effect.',
          'Threshold (0-255): Convert to binary black/white at cutoff point.',
          'Edge Detection: Sobel or Canny algorithms to show only edges.',
          'Invert: Reverse all colors.',
        ],
      },
      {
        heading: 'Fit Mode',
        paragraphs: [
          'How the overlay image fits the QR code area:',
        ],
        bullets: [
          'Cover: Image fills entire area, cropping if needed.',
          'Contain: Entire image visible, may have margins.',
          'Stretch: Image distorts to fill exactly.',
        ],
      },
      {
        heading: 'Transform Options',
        paragraphs: [
          'Rotation: Rotate overlay in 90° increments.',
          'Flip X/Y: Mirror the image horizontally or vertically.',
        ],
      },
      {
        heading: 'Dithering Algorithms',
        paragraphs: [
          'Dithering converts continuous-tone images to patterns that QR codes can represent. Available when using Dithered, Blue Noise, or True Dither blend modes.',
        ],
        bullets: [
          'Error Diffusion: Classic Floyd-Steinberg style. Spreads quantization error to neighboring pixels.',
          'Ordered (Bayer): Uses a threshold matrix for regular patterns.',
          'Clustered Dot: Simulates halftone printing.',
          'Void & Cluster: Optimized ordered dithering.',
          'Blue Noise: Visually pleasant random-looking pattern.',
          'Blue Noise Threshold: Threshold dithering with blue noise texture.',
          'White Noise: Random threshold dithering.',
          'Gaussian/Triangular Noise: Noise with different distributions.',
          'Blue Noise + Error Diffusion: Hybrid combining both techniques.',
          'Screened Blue Noise: Screen-like blue noise pattern.',
          'Perceptual: Luminance-weighted for better visual results.',
          'Edge-Aware: Preserves image edges during dithering.',
          'Adaptive Threshold: Locally-adaptive thresholding.',
          'Temporal Blue Noise: For animated GIFs, varies pattern per frame.',
        ],
      },
      {
        heading: 'Diffusion Kernels',
        paragraphs: [
          'When using Error Diffusion dithering, choose how error is distributed:',
        ],
        bullets: [
          'Floyd-Steinberg: Classic 4-neighbor diffusion. Good general choice.',
          'Jarvis-Judice-Ninke: 12-neighbor, smoother but slower.',
          'Stucki: Similar to JJN with different weights.',
          'Burkes: Simplified JJN, faster.',
          'Sierra: Family of kernels balancing quality and speed.',
          'Atkinson: Light diffusion, preserves detail but can be grainy.',
        ],
      },
      {
        heading: 'Dither Strength',
        paragraphs: [
          'Controls how much dithering is applied (0-100%). Lower values preserve more of the original pattern, higher values show more image detail.',
        ],
      },
      {
        heading: 'Subpixel Settings',
        paragraphs: [
          'When using Subpixel blend mode:',
        ],
        bullets: [
          'Grid Size: 2×2, 3×3, or 4×4 subpixels per module. Higher = more detail.',
          'Center Rule: Strict requires center subpixel to match module. Halftone Center allows variation.',
          'Neutral Color: Color used for undetermined subpixels.',
          'Finder Override: How finder patterns are rendered (Solid or Stylized).',
        ],
      },
      {
        heading: 'Halftone Settings',
        paragraphs: [
          'When using Halftone blend mode:',
        ],
        bullets: [
          'Cell Size: Per Module or N×N grid.',
          'Dot Shape: Circle, Square, or Line.',
          'Brightness Curve: Linear, S-Curve, or Gamma.',
        ],
      },
      {
        heading: 'Duotone Colors',
        paragraphs: [
          'When using Duotone blend mode, set the Shadow color (dark areas) and Highlight color (bright areas).',
        ],
      },
      {
        heading: 'GIF Animation Settings',
        paragraphs: [
          'When using animated GIF overlays:',
        ],
        bullets: [
          'Use Frame Delays: Respect original GIF timing.',
          'Max FPS: Limit frame rate (1-60 fps).',
          'Disposal Handling: Respect or Simplify frame disposal methods.',
        ],
      },
      {
        heading: 'Advanced Rendering Options',
        paragraphs: [
          'Additional rendering controls:',
        ],
        bullets: [
          'Gap Mode: None, Inset, Stroke, or Negative Space gap styling.',
          'Corner Radius: Rounded corners percentage for modules.',
          'Gradient: None, Linear, Radial, or Conic gradient on modules.',
          'Eye Outer/Inner Style: Independent styling for finder pattern rings.',
          'Dot Rotation: Rotate diamond/dot modules.',
          'Eye Scale: Size adjustment for finder patterns.',
          'Frame Style: Add decorative frames (Rounded Frame, Sticker, Tag).',
          'Frame Text: Add text like "Scan Me!" to frames.',
        ],
      },
      {
        heading: 'Advanced QR Encoding',
        paragraphs: [
          'Fine-tune QR encoding:',
        ],
        bullets: [
          'Encoding Mode: Auto, Numeric, Alphanumeric, Byte/UTF-8, or Kanji.',
          'Enforce Min Quiet Zone: Ensure at least 4 module margin.',
        ],
      },
      {
        heading: 'Advanced Output Options',
        paragraphs: [
          'Additional export settings:',
        ],
        bullets: [
          'Filename: Custom filename for downloads.',
          'GIF Palette Size: 2-256 colors in GIF output.',
          'GIF Quantizer: Median Cut, NeuQuant, or Octree color reduction.',
          'GIF Dithering: Off, Floyd-Steinberg, or Ordered.',
          'GIF Transparent Color: Set a color to be transparent.',
          'SVG True Vector: Use paths instead of embedded raster.',
          'SVG Shape Precision: Pixel or Precise path rendering.',
          'SVG Embed Raster Overlay: Include overlay as embedded image.',
          'Background Override: Force a specific background color in output.',
        ],
      },
      {
        heading: 'Validation Options',
        paragraphs: [
          'Input processing settings:',
        ],
        bullets: [
          'Validate Input: Check content format before encoding.',
          'Trim Whitespace: Remove leading/trailing spaces.',
          'Normalize Newlines: Convert all line endings to LF.',
          'Max Length Guard: Warn if content exceeds QR capacity.',
        ],
      },

      // ==================== PROFESSIONAL TIER ====================
      {
        heading: 'Professional Features',
        paragraphs: [
          'The Professional level adds watermarks, metadata, sharing options, safety analysis, payment QR codes, and enterprise features.',
        ],
      },
      {
        heading: 'Watermark',
        paragraphs: [
          'Add watermarks to your QR codes:',
        ],
        bullets: [
          'Kind: Text, Image, or Pattern watermark.',
          'Position: Center, Corners, Edges, Behind, or Quiet Zone.',
          'Opacity: Watermark transparency (0-100%).',
          'Blend Mode: Normal, Multiply, Screen, or Overlay blending.',
        ],
      },
      {
        heading: 'Metadata',
        paragraphs: [
          'Embed metadata in exported files:',
        ],
        bullets: [
          'Title, Author, Copyright, License, Description fields.',
          'Creation Time: Embed generation timestamp.',
          'Custom Key-Value: Add arbitrary metadata pairs.',
        ],
      },
      {
        heading: 'Sharing',
        paragraphs: [
          'Share your QR code configurations:',
        ],
        bullets: [
          'Direct Link: Generate a shareable URL with your current settings.',
          'Embed HTML: Get embed code for websites.',
          'Encode Parameters: Include all settings in the share URL.',
          'Note: Overlay images from local files cannot be shared via URL.',
        ],
      },
      {
        heading: 'Safety Analysis',
        paragraphs: [
          'Ensure QR codes remain scannable:',
        ],
        bullets: [
          'Safety Mode: Off, Balanced, or Strict scanning requirements.',
          'Min Module Size: Minimum pixel size per module.',
          'Min Quiet Zone: Minimum margin modules.',
          'Lock Finders/Timing/Align/Format/Version: Protect specific elements.',
          'Max Overlay Intensity by ECC: Automatic intensity limits based on error correction level.',
        ],
      },
      {
        heading: 'Content Types (Professional)',
        paragraphs: [
          'Professional level adds payment and enterprise content types:',
        ],
        bullets: [
          'EPC/SEPA (EU): European bank transfer QR codes with IBAN, BIC, amount, reference.',
          'UPI (India): Unified Payments Interface with VPA, payee name, amount.',
          'PayNow (Singapore): Singapore fast payment with UEN or mobile number.',
          'PromptPay (Thailand): Thai national payment system.',
          'PIX (Brazil): Brazilian instant payment with PIX key.',
          'Crypto: Bitcoin, Ethereum, Litecoin payment addresses with optional amount.',
          'Marketing Campaign Link: URLs with full UTM parameter (Marketing Tags) tracking.',
          'Short Link: For use with URL shorteners for dynamic/trackable QR codes.',
          'GS1 Digital Link: Product identification with GTIN, serial, batch, expiry.',
          'App Deep Link: iOS/Android app deep links with custom schemes.',
          'Custom Format: Raw data with no formatting or validation.',
        ],
      },
      {
        heading: 'Overlay Blend Modes (Professional)',
        paragraphs: [
          'Additional blend modes in Professional level:',
        ],
        bullets: [
          'Pixelate: Pixelated overlay effect.',
          'Outline: Edge detection overlay showing only contours.',
          'Wave: Wavy distortion effect.',
          'Subpixel Size: Variable subpixel sizing based on image.',
          'True Dither: Advanced dithering with ordered matrix selection.',
          'Extreme: Maximum image visibility, may affect scannability.',
        ],
      },
      {
        heading: 'Protection Settings',
        paragraphs: [
          'Fine-grained control over which QR elements are protected from overlay modification:',
        ],
        bullets: [
          'Preserve Timing: Keep timing patterns unmodified.',
          'Preserve Alignment: Keep alignment patterns unmodified.',
          'Protect Format Info: Shield format information modules.',
          'Protect Version Info: Shield version information modules.',
        ],
      },
      {
        heading: 'ECC-Aware Mode',
        paragraphs: [
          'Intelligently distributes overlay intensity based on error correction capacity. The system analyzes which modules can be modified while maintaining scannability.',
        ],
        bullets: [
          'Risk Budget: Percentage of error correction capacity to use (0-100%).',
          'Higher budget = more visible overlay but riskier scannability.',
          'Lower budget = safer scanning but less visible overlay.',
        ],
      },


      {
        heading: 'Professional Rendering Options',
        paragraphs: [
          'Advanced rendering controls:',
        ],
        bullets: [
          'Crisp Edges: Use pixelated image rendering for sharp module edges.',
          'Pixel Snap: Floor, Round, or Ceil pixel alignment.',
          'Per-Module Color Mode: Solid, By Brightness, By Position, By Overlay, By Cluster.',
          'Color Palette: Define custom color palette for per-module coloring.',
          'Contrast Guard: Ensure minimum contrast ratio between colors.',
          'Min Contrast Ratio: WCAG-style contrast requirement (1:1 to 21:1).',
          'Extra Border Modules: Additional border beyond quiet zone.',
        ],
      },
      {
        heading: 'Professional Output Options',
        paragraphs: [
          'Enterprise export settings:',
        ],
        bullets: [
          'DPI: Set print resolution (72-600 DPI). 300 DPI recommended for print.',
          'Include Quiet Zone: Toggle quiet zone in output dimensions.',
          'Export As Additional: Generate PDF alongside primary format.',
        ],
      },
      {
        heading: 'Animation Settings (Professional)',
        paragraphs: [
          'Additional professional animation features:',
        ],
        bullets: [
          'Temporal Dither: Off, Blue Noise, or Flicker Safe per-frame dithering.',
          'Pattern: None, Pulse, Wave, Scanline, Shimmer, or Drift effects.',
        ],
      },

      // ==================== TIPS & BEST PRACTICES ====================
      {
        heading: 'Best Practices',
        paragraphs: [
          'Follow these guidelines for reliable QR codes:',
        ],
        bullets: [
          'Always test your QR codes with multiple scanner apps before printing.',
          'Use Error Correction H (High) when adding overlays.',
          'Keep at least 4 modules of quiet zone (margin).',
          'Ensure high contrast between foreground and background.',
          'For print, use at least 300 DPI and test at actual print size.',
          'Enable Preserve Finder Patterns when using overlays.',
          'Start with lower overlay intensity and increase gradually.',
          'For outdoor use, consider larger module sizes and higher error correction.',
        ],
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'Common issues and solutions:',
        ],
        bullets: [
          'QR won\'t scan: Reduce overlay intensity, increase error correction, check contrast.',
          'Code too large: Reduce content length, use URL shortener, lower version.',
          'Blurry output: Increase module size, use PNG instead of compressed formats.',
          'Colors look wrong: Check color contrast, try grayscale overlay mode.',
          'GIF not animating: Ensure using GIF format output, check frame count.',
          'Image overlay not loading: Check CORS permissions on remote images.',
        ],
      },
      {
        heading: 'Keyboard Shortcuts',
        paragraphs: [
          'ANQR supports standard browser shortcuts. Use Ctrl/Cmd+S to trigger export (when focused on the preview).',
        ],
      },
      {
        heading: 'Sharing & Embedding',
        paragraphs: [
          'In Professional mode, click the Share button to copy a URL with your current settings. Recipients can open this URL to see your exact configuration. Note: Overlay images from local files cannot be shared via URL.',
        ],
      },
    ],
  },
}

function usePageTitle(page: StaticPageType, title: string) {
  useEffect(() => {
    document.title = `${title} | ANQR`
  }, [page, title])
}

// Table of Contents component for docs page
function DocsTableOfContents({ 
  groups, 
  activeSlug, 
  onNavigate,
  onClose,
  isOpen
}: { 
  groups: TocGroup[]
  activeSlug: string
  onNavigate: (slug: string) => void
  onClose: () => void
  isOpen: boolean
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // On desktop, respect isOpen prop. On mobile, always render (has its own mobileOpen state)
  // We check window width via CSS classes, so we render both but hide with lg:hidden / hidden lg:block
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set(groups.map(g => g.title)))

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  const handleItemClick = (slug: string) => {
    onNavigate(slug)
    setMobileOpen(false)
  }

  // Find active group for mobile display
  const activeGroup = groups.find(g => g.items.some(item => item.slug === activeSlug))
  const activeItem = activeGroup?.items.find(item => item.slug === activeSlug)

  const tocContent = (
    <nav className="text-sm">
      {groups.map((group) => (
        <div key={group.title} className="mb-3">
          <button
            onClick={() => toggleGroup(group.title)}
            className="flex items-center justify-between w-full text-left font-semibold text-foreground hover:text-primary py-1.5 px-2 rounded transition-colors"
          >
            <span>{group.title}</span>
            {expandedGroups.has(group.title) ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedGroups.has(group.title) && (
            <ul className="mt-1 space-y-0.5 border-l-2 border-muted ml-2">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => handleItemClick(item.slug)}
                    className={`block w-full text-left py-1 pl-3 pr-2 text-xs leading-snug transition-colors rounded-r ${
                      activeSlug === item.slug
                        ? 'text-primary font-medium bg-primary/10 border-l-2 border-primary -ml-[2px]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.heading}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile ToC - slide-out drawer */}
      <div className="lg:hidden">
        {/* Toggle button fixed at top */}
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="fixed top-16 left-2 z-40 p-2 rounded-lg bg-card border shadow-md hover:bg-muted transition-colors"
            title="Open documentation sidebar"
          >
            <List className="h-5 w-5" />
          </button>
        )}
        
        {/* Backdrop */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50" 
            onClick={() => setMobileOpen(false)}
          />
        )}
        
        {/* Sidebar drawer */}
        <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-background border-r shadow-xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <List className="h-4 w-4" />
              Contents
            </h3>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)] scrollbar-hide">
            {tocContent}
          </div>
        </div>
      </div>

      {/* Desktop ToC - sticky sidebar with slide animation */}
      <aside className={`hidden lg:block flex-shrink-0 border-r bg-background docs-sidebar transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-64' : 'w-0 border-r-0'
      }`}>
        <div className="sticky top-0 h-screen overflow-y-auto py-6 px-4 scrollbar-hide">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <List className="h-4 w-4" />
              Contents
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {tocContent}
        </div>
      </aside>
    </>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [botField, setBotField] = useState('')

  const encodedBody = useMemo(() => {
    const data: Record<string, string> = {
      'form-name': 'contact',
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      'bot-field': botField,
    }
    return new URLSearchParams(data).toString()
  }, [form, botField])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedBody,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setBotField('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground">Message sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — we received your message. If you do not hear back, email us at{' '}
          <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="rounded-xl border bg-card p-6"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <label>
          Do not fill this out if you are human: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-name">
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-email">
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-subject">
          Subject
        </label>
        <Input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
          placeholder="What can we help with?"
          required
        />
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-message">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Tell us what you are trying to do, and include any error messages if relevant."
          rows={6}
          required
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">
          We could not submit the form from this browser/session. Please email{' '}
          <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          By sending a message, you agree that we can use your details to respond. See the Privacy Policy.
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

export function StaticPage({ page }: StaticPageProps) {
  const def = pages[page]
  usePageTitle(page, def.title)
  
  const isDocsPage = page === 'docs'
  const tocGroups = useMemo(() => isDocsPage ? buildDocsToc(def.sections) : [], [isDocsPage, def.sections])
  const [activeSlug, setActiveSlug] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (!isDocsPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visibleEntries = entries.filter(e => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by position in viewport (topmost first)
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          const topEntry = visibleEntries[0]
          const slug = topEntry.target.getAttribute('data-slug')
          if (slug) setActiveSlug(slug)
        }
      },
      {
        root: contentRef.current,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    )

    // Observe all section headings
    sectionRefs.current.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isDocsPage, tocGroups])

  // Navigate to section with smooth scroll
  const navigateToSection = useCallback((slug: string) => {
    const el = sectionRefs.current.get(slug)
    if (el && contentRef.current) {
      const container = contentRef.current
      const elementTop = el.offsetTop - 80 // Account for sticky header
      container.scrollTo({ top: elementTop, behavior: 'smooth' })
      setActiveSlug(slug)
      // Update URL hash without triggering scroll
      window.history.replaceState(null, '', `#${slug}`)
    }
  }, [])

  // Handle initial hash on mount
  useEffect(() => {
    if (!isDocsPage) return
    const hash = window.location.hash.slice(1)
    if (hash) {
      // Delay to ensure refs are populated
      setTimeout(() => navigateToSection(hash), 100)
    } else if (tocGroups.length > 0 && tocGroups[0].items.length > 0) {
      setActiveSlug(tocGroups[0].items[0].slug)
    }
  }, [isDocsPage, tocGroups, navigateToSection])

  // Register section ref
  const registerSectionRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(slug, el)
    } else {
      sectionRefs.current.delete(slug)
    }
  }, [])

  // State for docs sidebar visibility - starts collapsed
  const [isDocsSidebarOpen, setIsDocsSidebarOpen] = useState(false)

  // Note: Click outside to close is disabled - user must click X button to close sidebar

  // For docs page, use a different layout with ToC
  if (isDocsPage) {
    return (
      <main className="min-h-[200px] flex-1 flex bg-background overflow-hidden transition-all duration-300">
        {/* Left ad column - hidden on docs to make room for ToC */}
        <div className="hidden xl:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-3 pr-2">
          <AdUnit slot="static-left" width={160} height={600} format="vertical" />
        </div>

        {/* Toggle button when sidebar is closed - positioned in main content area */}
        {!isDocsSidebarOpen && (
          <div className="hidden lg:block relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDocsSidebarOpen(true)
              }}
              className="docs-sidebar-toggle absolute left-4 top-4 z-40 p-2 rounded-lg bg-card border shadow-md hover:bg-muted transition-colors"
              title="Open documentation sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Table of Contents */}
        <DocsTableOfContents 
          groups={tocGroups} 
          activeSlug={activeSlug} 
          onNavigate={navigateToSection}
          onClose={() => setIsDocsSidebarOpen(false)}
          isOpen={isDocsSidebarOpen}
        />

        {/* Main content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-background scrollbar-hide">
          {/* Centered header section like Gallery */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 tracking-tight text-foreground">{def.title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">{def.description}</p>
            </div>
          </div>
          
          {/* Horizontal ad below header */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-center">
              <AdUnit slot="docs-top" width={728} height={90} format="horizontal" />
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-4 sm:px-6 py-4">

            <div className="space-y-8 sm:space-y-10">
              {def.sections.map((section) => {
                const slug = slugify(section.heading)
                return (
                  <section 
                    key={section.heading} 
                    id={slug}
                    data-slug={slug}
                    ref={(el) => registerSectionRef(slug, el)}
                    className="space-y-3 sm:space-y-4 scroll-mt-20"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                      <a 
                        href={`#${slug}`} 
                        className="hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          navigateToSection(slug)
                        }}
                      >
                        {section.heading}
                      </a>
                    </h2>

                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {renderTextWithLinks(p)}
                      </p>
                    ))}

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                        {section.bullets.map((b) => (
                          <li key={b} className="leading-relaxed">{renderTextWithLinks(b)}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>

            {/* Bottom horizontal ad */}
            <div className="mt-8 flex justify-center">
              <AdUnit slot="docs-bottom" width={728} height={90} format="horizontal" />
            </div>

            <div className="mt-8 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">Last Updated: {LAST_UPDATED}</p>
            </div>
          </article>
        </div>

        {/* Right ad column */}
        <div className="hidden xl:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-2 pr-3">
          <AdUnit slot="static-right" width={160} height={600} format="vertical" />
        </div>
      </main>
    )
  }

  // Standard layout for non-docs pages
  return (
    <main className="min-h-[200px] flex-1 flex bg-background overflow-hidden transition-all duration-300">
      {/* Left ad column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-3 pr-2">
        <AdUnit slot="static-left" width={160} height={600} format="vertical" />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
        {/* Centered header section like Gallery */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 tracking-tight text-foreground">{def.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">{def.description}</p>
          </div>
        </div>
        
        {/* Horizontal ad below header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <AdUnit slot={`${page}-top`} width={728} height={90} format="horizontal" />
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 py-4">
          <div className="space-y-10">
            {def.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>

                {section.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-base text-muted-foreground leading-relaxed">
                    {renderTextWithLinks(p)}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b}>{renderTextWithLinks(b)}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {page === 'contact' && <ContactForm />}
          </div>

          {/* Bottom horizontal ad */}
          <div className="mt-8 flex justify-center">
            <AdUnit slot={`${page}-bottom`} width={728} height={90} format="horizontal" />
          </div>

          <div className="mt-8 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">Last Updated: {LAST_UPDATED}</p>
          </div>
        </article>
      </div>

      {/* Right ad column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-2 pr-3">
        <AdUnit slot="static-right" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}

export default StaticPage
