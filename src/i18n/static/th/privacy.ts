import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'นโยบายความเป็นส่วนตัว',
  description: `ข้อมูลที่ ANQR เก็บรวบรวม วิธีการใช้งาน และสิทธิของคุณภายใต้กฎหมายความเป็นส่วนตัวที่เกี่ยวข้อง`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'สรุป',
      paragraphs: [
        `ANQR เป็นเครื่องสร้าง QR code ที่ทำงานทั้งหมดบนอุปกรณ์ของคุณ เราไม่ต้องการให้คุณสร้างบัญชี และ QR code ถูกสร้างในเครื่อง — เราไม่มีสิทธิ์เข้าถึงเนื้อหาที่คุณเข้ารหัส`,
        `เราใช้ Google AdSense สำหรับโฆษณาและอาจใช้บริการวิเคราะห์ บริการเหล่านี้รวบรวมข้อมูลผ่านคุกกี้และเทคโนโลยีที่คล้ายกัน นโยบายนี้อธิบายข้อมูลที่รวบรวม วิธีการใช้งาน และสิทธิของคุณ`
      ]
    },
    {
      heading: 'ข้อมูลที่เรารวบรวม',
      bullets: [
        `ข้อมูลที่คุณให้: หากคุณติดต่อเราผ่านอีเมลหรือฟอร์มติดต่อ เรารวบรวมชื่อ อีเมล และเนื้อหาแสนส`,
        `ข้อมูลที่รวบรวมโดยอัตโนมัติ: ผู้ให้บริการโฮสติ้งของเรา (Netlify), พันธมิตรโฆษณา และบริการวิเคราะห์อาจรวบรวม: IP address, ชนิดและเวอร์ชันเบราว์เซอร์, ระบบปฏิบัติการ, ชนิดอุปกรณ์, URL อ้างอิง, หน้าที่เยี่ยมชม, เวลาบนไซต์ และตำแหน่งทางภูมิศาสตร์โดยประมาณ`,
        `คุกกี้บุคคลที่สาม: พันธมิตรโฆษณาของเรา (Google AdSense) ใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อให้บริการและวัดโฆษณา ANQR เองไม่ตั้งคุกกี้บุคคลแรก`
      ]
    },
    {
      heading: 'คุกกี้และเทคโนโลยีของบุคคลที่สาม',
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
      heading: 'Google AdSense และโฆษณา',
      paragraphs: [
        `We display advertisements through Google AdSense. Google and its partners use cookies to serve ads based on your browsing history on this site and other websites (interest-based advertising).`,
        `Learn how Google uses your information: https://policies.google.com/technologies/partner-sites`,
        'Manage ad personalisation: https://adssettings.google.com',
        'Opt out via Network Advertising Initiative: https://optout.networkadvertising.org',
        'Opt out via Digital Advertising Alliance: https://optout.aboutads.info'
      ]
    },
    {
      heading: 'เราใช้ข้อมูลอย่างไร',
      bullets: [
        'To respond to your enquiries and provide support.',
        'To display relevant advertisements through our advertising partners.',
        'To analyse site usage and improve our services.',
        'To detect, prevent, and address fraud, abuse, and security issues.',
        'To comply with legal obligations.'
      ]
    },
    {
      heading: 'บริการของบุคคลที่สาม',
      bullets: [
        'Google AdSense: Receives data to serve and measure advertisements.',
        'Analytics providers: Receive anonymised usage data.',
        'Netlify (hosting): Processes requests and may log IP addresses.',
        `We do not sell your personal information. However, sharing data with advertising partners may be considered a "sale" under CCPA (see below).`
      ]
    },
    {
      heading: 'การเก็บรักษาข้อมูล',
      bullets: [
        'Contact submissions: Up to 2 years.',
        'Server logs: Up to 30 days (hosting provider).',
        'Analytics data: Up to 26 months (anonymised).',
        'Advertising cookies: Typically 13 months (varies by partner).'
      ]
    },
    {
      heading: 'สิทธิของคุณภายใต้ GDPR (ผู้ใช้ใน EEA)',
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
      heading: 'การโอนข้อมูลระหว่างประเทศ',
      paragraphs: [
        `Your information may be transferred to countries with different data protection laws, including the United States. We use appropriate safeguards such as Standard Contractual Clauses.`
      ]
    },
    {
      heading: 'ความเป็นส่วนตัวของเด็ก',
      paragraphs: [
        `ANQR is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. Contact ${CONTACT_EMAIL} if you believe a child has provided information.`
      ]
    },
    {
      heading: 'ความปลอดภัย',
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
      heading: 'การเปลี่ยนแปลงนโยบายนี้',
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
