import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'About ANQR',
  description: 'Learn more about ANQR and its features',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'ANQR என்றால் என்ன?',
      paragraphs: [
        `ANQR ("anchor" உச்சரிப்பு) உங்கள் சாதனத்தில் முழுமையாக இயங்கும் இலவச QR கோட் உருவாக்கி — உங்கள் கணினி, தொலைபேசி அல்லது டேப்லெட். URL, உரை, Wi-Fi சான்றிதழ்கள், தொடர்பு அட்டை, நிகழ்ச்சி காலண்டர் போன்றவற்றிற்கான QR கோடுகளை உருவாக்கவும்.`,
        `இந்த கருவி கணக்கு உருவாக்காமல் விரைவாக QR கோடுகளை உருவாக்க வேண்டிய தனிநபர்கள், சிறு வணிகங்கள், மார்க்கெட்டர்கள் மற்றும் உருவாக்குநர்களுக்காக வடிவமைக்கப்பட்டது. உங்கள் தரவு உங்கள் சாதனத்தை விட்டு வெளியேறாது.`
      ]
    },
    {
      heading: 'Key features',
      bullets: [
        'Generate QR codes instantly on your device — no server uploads, no account required.',
        'Customise appearance with colours, module styles, finder patterns, and image overlays.',
        'Export in multiple formats: PNG, SVG, WebP, and animated GIF.',
        'Advanced options for error correction, version control, and encoding modes.',
        'Safety analysis tools to help ensure your QR codes remain scannable.',
        'Three feature levels (Basic, Advanced, Professional) to match your needs.'
      ]
    },
    {
      heading: 'How ANQR works',
      paragraphs: [
        `ANQR processes everything locally on your device. The text or data you enter to create a QR code never leaves your device — it is encoded directly on your computer, phone, or tablet without being sent to any server.`,
        `When you upload an overlay image, it is processed locally on your device. If you load an image from a URL, it is fetched directly from its host server.`,
        'We do not store, log, or have access to the content you encode into QR codes.'
      ]
    },
    {
      heading: 'Who operates ANQR?',
      paragraphs: [
        `ANQR is operated as an independent web tool. For questions, support, or business enquiries, please use the Contact page or email ${CONTACT_EMAIL}.`
      ]
    },
    {
      heading: 'Advertising and how we stay free',
      paragraphs: [
        `ANQR is free to use and supported by advertising. We display ads through Google AdSense and potentially other advertising partners.`,
        `These advertising services may use cookies and similar technologies to serve ads based on your interests and browsing history. You can learn more about this in our Privacy Policy, and you can manage your ad preferences through your device settings or Google's Ads Settings.`,
        `We believe in transparency: ads help us keep the tool free and accessible to everyone without requiring subscriptions or paywalls.`
      ]
    },
    {
      heading: 'Open standards',
      paragraphs: [
        `QR codes are an open ISO standard (ISO/IEC 18004). ANQR generates standard-compliant QR codes that work with any QR scanner app or device.`
      ]
    },
    {
      heading: 'Trademark notice',
      paragraphs: [
        `QR Code® is a registered trademark of DENSO WAVE INCORPORATED. ANQR is an independent tool and is not affiliated with, endorsed by, or sponsored by DENSO WAVE INCORPORATED.`
      ]
    },
    {
      heading: 'Feedback and contributions',
      paragraphs: [
        `We welcome feedback, bug reports, and feature suggestions. Please use the Contact page to get in touch. We read every message, though response times may vary.`
      ]
    }
  ]
};

export default about;
