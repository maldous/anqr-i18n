import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'தனியுரிமைக் கொள்கை',
  description: `ANQR சேகரிக்கும் தகவல்கள், அவை எப்படி பயன்படுத்தப்படுகின்றன, மற்றும் பொருந்தும் தனியுரிமை சட்டங்களின் கீழ் உங்கள் உரிமைகள்.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'சுருக்கம்',
      paragraphs: [
        `ANQR is a QR code generator that runs entirely on your device. We do not require you to create an account, and QR codes are generated locally — we do not have access to the content you encode.`,
        `We use Google AdSense for advertising and may use analytics services. These services collect information through cookies and similar technologies. This policy explains what data is collected, how it is used, and your rights.`
      ]
    },
    {
      heading: 'நாங்கள் சேகரிக்கும் தகவல்கள்',
      bullets: [
        `Information you provide: If you contact us via email or our contact form, we collect your name, email address, and message content.`,
        `Automatically collected information: Our hosting provider (Netlify), advertising partners, and analytics services may collect: IP address, browser type and version, operating system, device type, referring URL, pages visited, time on site, and approximate geographic location.`,
        `Third-party cookies: Our advertising partners (Google AdSense) use cookies and similar technologies to serve and measure advertisements. ANQR itself does not set any first-party cookies.`
      ]
    },
    {
      heading: 'குக்கிகள் மற்றும் மூன்றாம் தரப்பு தொழில்நுட்பங்கள்',
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
      heading: 'Google AdSense மற்றும் விளம்பரங்கள்',
      paragraphs: [
        `We display advertisements through Google AdSense. Google and its partners use cookies to serve ads based on your browsing history on this site and other websites (interest-based advertising).`,
        `Learn how Google uses your information: https://policies.google.com/technologies/partner-sites`,
        'Manage ad personalisation: https://adssettings.google.com',
        'Opt out via Network Advertising Initiative: https://optout.networkadvertising.org',
        'Opt out via Digital Advertising Alliance: https://optout.aboutads.info'
      ]
    },
    {
      heading: 'தகவலை எவ்வாறு பயன்படுத்துகிறோம்',
      bullets: [
        'To respond to your enquiries and provide support.',
        'To display relevant advertisements through our advertising partners.',
        'To analyse site usage and improve our services.',
        'To detect, prevent, and address fraud, abuse, and security issues.',
        'To comply with legal obligations.'
      ]
    },
    {
      heading: 'மூன்றாம் தரப்பு சேவைகள்',
      bullets: [
        'Google AdSense: Receives data to serve and measure advertisements.',
        'Analytics providers: Receive anonymised usage data.',
        'Netlify (hosting): Processes requests and may log IP addresses.',
        `We do not sell your personal information. However, sharing data with advertising partners may be considered a "sale" under CCPA (see below).`
      ]
    },
    {
      heading: 'தரவு வைத்திருக்கும் காலம்',
      bullets: [
        'Contact submissions: Up to 2 years.',
        'Server logs: Up to 30 days (hosting provider).',
        'Analytics data: Up to 26 months (anonymised).',
        'Advertising cookies: Typically 13 months (varies by partner).'
      ]
    },
    {
      heading: 'GDPR கீழ் உங்கள் உரிமைகள் (EEA பயனர்கள்)',
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
      heading: 'சர்வதேச மாற்றங்கள்',
      paragraphs: [
        `Your information may be transferred to countries with different data protection laws, including the United States. We use appropriate safeguards such as Standard Contractual Clauses.`
      ]
    },
    {
      heading: 'குழந்தைகளின் தனியுரிமை',
      paragraphs: [
        `ANQR is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. Contact ${CONTACT_EMAIL} if you believe a child has provided information.`
      ]
    },
    {
      heading: 'பாதுகாப்பு',
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
      heading: 'இந்த கொள்கையில் மாற்றங்கள்',
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
