import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'गोपनीयता नीति',
  description: `ANQR कौन-सी जानकारी एकत्र करता है, उसका उपयोग कैसे होता है, और लागू गोपनीयता कानूनों के तहत आपके अधिकार।`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'सारांश',
      paragraphs: [
        `ANQR एक QR कोड जनरेटर है जो पूरी तरह से आपके डिवाइस पर चलता है। हमें अकाउंट की आवश्यकता नहीं है, QR कोड्स लोकली जनरेट होते हैं — हमें आपके एन्कोड कंटेंट तक पहुंच नहीं है।`,
        `हम Google AdSense का उपयोग विज्ञापन के लिए करते हैं और एनालिटिक्स सेवाओं का उपयोग कर सकते हैं। ये सेवाएं कुकीज़ और समान तकनीकों से जानकारी एकत्र करती हैं। यह नीति बताती है कि कौन सा डेटा एकत्र किया जाता है, इसका उपयोग कैसे होता है, और आपके अधिकार क्या हैं।`
      ]
    },
    {
      heading: 'हम एकत्रित जानकारी',
      bullets: [
        `आप द्वारा प्रदान की गई जानकारी: यदि आप ईमेल या संपर्क फॉर्म से संपर्क करते हैं, तो हम आपका नाम, ईमेल पता और संदेश सामग्री एकत्र करते हैं।`,
        `स्वचालित एकत्रित जानकारी: हमारा होस्टिंग प्रदाता (Netlify), विज्ञापन साझेदार और एनालिटिक्स सेवाएं IP पता, ब्राउज़र प्रकार/संस्करण, ऑपरेटिंग सिस्टम, डिवाइस प्रकार, रेफरिंग URL, देखी गई पेज, साइट पर समय और अनुमानित भौगोलिक स्थान एकत्र कर सकती हैं।`,
        `तीसरे पक्ष की कुकीज़: हमारे विज्ञापन साझेदार (Google AdSense) कुकीज़ और समान तकनीकों से विज्ञापन सर्व करते हैं और मापते हैं। ANQR स्वयं कोई पहली पक्ष कुकी सेट नहीं करता।`
      ]
    },
    {
      heading: 'कुकीज़ और तृतीय‑पक्ष तकनीकें',
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
      heading: 'Google AdSense और विज्ञापन',
      paragraphs: [
        `We display advertisements through Google AdSense. Google and its partners use cookies to serve ads based on your browsing history on this site and other websites (interest-based advertising).`,
        `Learn how Google uses your information: https://policies.google.com/technologies/partner-sites`,
        'Manage ad personalisation: https://adssettings.google.com',
        'Opt out via Network Advertising Initiative: https://optout.networkadvertising.org',
        'Opt out via Digital Advertising Alliance: https://optout.aboutads.info'
      ]
    },
    {
      heading: 'हम जानकारी का उपयोग कैसे करते हैं',
      bullets: [
        'To respond to your enquiries and provide support.',
        'To display relevant advertisements through our advertising partners.',
        'To analyse site usage and improve our services.',
        'To detect, prevent, and address fraud, abuse, and security issues.',
        'To comply with legal obligations.'
      ]
    },
    {
      heading: 'तृतीय‑पक्ष सेवाएँ',
      bullets: [
        'Google AdSense: Receives data to serve and measure advertisements.',
        'Analytics providers: Receive anonymised usage data.',
        'Netlify (hosting): Processes requests and may log IP addresses.',
        `We do not sell your personal information. However, sharing data with advertising partners may be considered a "sale" under CCPA (see below).`
      ]
    },
    {
      heading: 'डेटा संरक्षण अवधि',
      bullets: [
        'Contact submissions: Up to 2 years.',
        'Server logs: Up to 30 days (hosting provider).',
        'Analytics data: Up to 26 months (anonymised).',
        'Advertising cookies: Typically 13 months (varies by partner).'
      ]
    },
    {
      heading: 'GDPR के तहत आपके अधिकार (EEA उपयोगकर्ता)',
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
      heading: 'अंतरराष्ट्रीय स्थानांतरण',
      paragraphs: [
        `Your information may be transferred to countries with different data protection laws, including the United States. We use appropriate safeguards such as Standard Contractual Clauses.`
      ]
    },
    {
      heading: 'बच्चों की गोपनीयता',
      paragraphs: [
        `ANQR is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. Contact ${CONTACT_EMAIL} if you believe a child has provided information.`
      ]
    },
    {
      heading: 'सुरक्षा',
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
      heading: 'इस नीति में परिवर्तन',
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
