import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Dasar Privasi',
  description: `Maklumat yang ANQR kumpul, cara ia digunakan, dan hak anda di bawah undang-undang privasi yang berkenaan.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ringkasan',
      paragraphs: [
        `ANQR adalah penjana kod QR yang berjalan sepenuhnya pada peranti anda. Kami tidak memerlukan anda mencipta akaun, dan kod QR dijana secara tempatan — kami tidak mempunyai akses kepada kandungan yang anda kodkan.`,
        `Kami menggunakan Google AdSense untuk iklan dan mungkin perkhidmatan analitik. Perkhidmatan ini mengumpul maklumat melalui kuki dan teknologi serupa. Dasar ini menerangkan data yang dikumpul, bagaimana ia digunakan, dan hak anda.`
      ]
    },
    {
      heading: 'Maklumat yang kami kumpul',
      bullets: [
        `Information you provide: If you contact us via email or our contact form, we collect your name, email address, and message content.`,
        `Automatically collected information: Our hosting provider (Netlify), advertising partners, and analytics services may collect: IP address, browser type and version, operating system, device type, referring URL, pages visited, time on site, and approximate geographic location.`,
        `Third-party cookies: Our advertising partners (Google AdSense) use cookies and similar technologies to serve and measure advertisements. ANQR itself does not set any first-party cookies.`
      ]
    },
    {
      heading: 'Kuki dan teknologi pihak ketiga',
      paragraphs: [
        `ANQR does not set any first-party cookies. Your preferences (such as dark mode) are stored locally on your device, which is not transmitted to any server.`,
        `However, our advertising partners (Google AdSense) and hosting provider may use cookies and similar tracking technologies:`
      ],
      bullets: [
        `Advertising cookies (third-party): Set by Google AdSense and advertising partners to serve relevant ads, measure ad performance, and understand user interests. These cookies may track your activity across different websites.`,
        `Analytics cookies (third-party): May be used by our hosting provider or analytics services to collect anonymised usage data.`
      ]
    },
    {
      heading: 'Google AdSense dan pengiklanan',
      paragraphs: [
        `We display advertisements through Google AdSense. Google and its partners use cookies to serve ads based on your browsing history on this site and other websites (interest-based advertising).`,
        `Learn how Google uses your information: https://policies.google.com/technologies/partner-sites`,
        'Manage ad personalisation: https://adssettings.google.com',
        'Opt out via Network Advertising Initiative: https://optout.networkadvertising.org',
        'Opt out via Digital Advertising Alliance: https://optout.aboutads.info'
      ]
    },
    {
      heading: 'Cara kami menggunakan maklumat',
      bullets: [
        'To respond to your enquiries and provide support.',
        'To display relevant advertisements through our advertising partners.',
        'To analyse site usage and improve our services.',
        'To detect, prevent, and address fraud, abuse, and security issues.',
        'To comply with legal obligations.'
      ]
    },
    {
      heading: 'Perkhidmatan pihak ketiga',
      bullets: [
        'Google AdSense: Receives data to serve and measure advertisements.',
        'Analytics providers: Receive anonymised usage data.',
        'Netlify (hosting): Processes requests and may log IP addresses.',
        `We do not sell your personal information. However, sharing data with advertising partners may be considered a "sale" under CCPA (see below).`
      ]
    },
    {
      heading: 'Penyimpanan data',
      bullets: [
        'Contact submissions: Up to 2 years.',
        'Server logs: Up to 30 days (hosting provider).',
        'Analytics data: Up to 26 months (anonymised).',
        'Advertising cookies: Typically 13 months (varies by partner).'
      ]
    },
    {
      heading: 'Hak anda di bawah GDPR (pengguna EEA)',
      paragraphs: [
        `If you are in the European Economic Area, you have the following rights under the General Data Protection Regulation:`
      ],
      bullets: [
        'Right of access: Request a copy of personal data we hold about you.',
        'Right to rectification: Request correction of inaccurate data.',
        'Right to erasure: Request deletion of your data ("right to be forgotten").',
        'Right to restrict processing: Request limits on how we use your data.',
        'Right to data portability: Request your data in a portable format.',
        'Right to object: Object to processing, including for direct marketing.',
        'Right to withdraw consent: Withdraw consent at any time where processing is consent-based.',
        'Right to lodge a complaint: File a complaint with your data protection authority.'
      ]
    },
    {
      heading: 'GDPR legal basis',
      paragraphs: [
        `We process data on these bases: (a) Consent — for personalised advertising (managed by our advertising partners); (b) Legitimate interests — for analytics, security, and improvement; (c) Contract — to respond to enquiries.`,
        `To exercise your rights, contact ${CONTACT_EMAIL}. We respond within 30 days.`
      ]
    },
    {
      heading: 'Your rights under CCPA (California users)',
      bullets: [
        `Right to know: Request information about data collected, sources, purposes, and third parties.`,
        'Right to delete: Request deletion of your personal information.',
        `Right to opt-out: Opt out of the "sale" of personal information (sharing with ad partners may qualify).`,
        'Right to non-discrimination: We will not discriminate for exercising your rights.'
      ]
    },
    {
      heading: 'CCPA categories collected',
      paragraphs: [
        `Categories: Identifiers (IP address, device ID), Internet activity (browsing, ad interactions), Geolocation (approximate), Inferences (interests from browsing).`,
        `To exercise rights or opt out: ${CONTACT_EMAIL} or adjust cookie settings.`
      ]
    },
    {
      heading: 'Pemindahan antarabangsa',
      paragraphs: [
        `Your information may be transferred to countries with different data protection laws, including the United States. We use appropriate safeguards such as Standard Contractual Clauses.`
      ]
    },
    {
      heading: 'Privasi kanak-kanak',
      paragraphs: [
        `ANQR is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. Contact ${CONTACT_EMAIL} if you believe a child has provided information.`
      ]
    },
    {
      heading: 'Keselamatan',
      paragraphs: [
        `We use appropriate technical and organisational measures to protect data, including HTTPS encryption. However, no internet transmission is 100% secure.`
      ]
    },
    {
      heading: 'Do Not Track',
      paragraphs: [
        `We honour Do Not Track browser signals where feasible, though advertising partners may not respond to DNT.`
      ]
    },
    {
      heading: 'Perubahan pada dasar ini',
      paragraphs: [
        `We may update this policy periodically. The "Last updated" date indicates the most recent revision. Significant changes may be communicated via a site banner.`
      ]
    },
    {
      heading: 'Contact us',
      paragraphs: [
        `For privacy questions or to exercise your rights: ${CONTACT_EMAIL} or use our Contact page. We respond to privacy requests within 30 days.`
      ]
    }
  ]
};

export default privacy;
