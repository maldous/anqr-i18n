import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'संपर्क करें',
  description: 'हम प्रतिक्रिया, बग रिपोर्ट, फीचर अनुरोध और सामान्य प्रश्नों का स्वागत करते हैं।',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'हमें कैसे पहुंचें',
      paragraphs: [
        `आपकी जरूरत के अनुसार संपर्क के कई तरीके। हम हर संदेश पढ़ते हैं, लेकिन वॉल्यूम और प्रकार पर निर्भर समय भिन्न हो सकता है।`
      ]
    },
    {
      heading: 'ईमेल',
      paragraphs: [
        `सभी पूछताछ के लिए: ${CONTACT_EMAIL}`,
        `This is the most reliable way to reach us and is recommended for detailed questions, business enquiries, or if the contact form does not work on your device.`
      ]
    },
    {
      heading: 'संपर्क फ़ॉर्म',
      paragraphs: [
        `Use the form below to send us a message directly. If the form does not submit successfully, please use email instead.`
      ]
    },
    {
      heading: 'पूछताछ के प्रकार',
      bullets: [
        `General questions: Questions about how to use ANQR, feature explanations, or general feedback.`,
        `Bug reports: Please include your browser, operating system, steps to reproduce, and any error messages you see.`,
        `Feature requests: Suggestions for new features or improvements. We consider all requests though we cannot promise implementation.`,
        `Business enquiries: Partnership opportunities, licensing questions, or commercial use enquiries.`,
        `Privacy requests: Requests to exercise your privacy rights under GDPR, CCPA, or other privacy laws (see Privacy Policy).`,
        'DMCA/Copyright: See the DMCA section below for takedown notice requirements.'
      ]
    },
    {
      heading: 'प्रतिक्रिया समय',
      paragraphs: [
        `We aim to respond to enquiries within 5-7 business days. Privacy-related requests will be addressed within 30 days as required by law.`,
        `During busy periods, response times may be longer. For urgent matters, please indicate "URGENT" in your subject line.`
      ]
    },
    {
      heading: 'संपर्क करने से पहले',
      paragraphs: [
        `Please check our Documentation page for answers to common questions about how to use ANQR features. Many questions about QR code generation, styling, and export options are covered there.`
      ]
    },
    {
      heading: 'DMCA कॉपीराइट नोटिस',
      paragraphs: [
        `If you believe that content available on ANQR infringes your copyright, you may submit a Digital Millennium Copyright Act (DMCA) takedown notice. To be valid, your notice must include:`
      ],
      bullets: [
        'A physical or electronic signature of the copyright owner or authorised agent.',
        'Identification of the copyrighted work claimed to have been infringed.',
        `Identification of the material that is claimed to be infringing, with information sufficient to locate it.`,
        'Your contact information (address, telephone number, and email address).',
        `A statement that you have a good faith belief that use of the material is not authorised by the copyright owner.`,
        `A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on their behalf.`
      ]
    },
    {
      heading: 'DMCA संपर्क',
      paragraphs: [
        `DMCA नोटिस यहाँ भेजें: ${CONTACT_EMAIL}`,
        `Please include "DMCA Notice" in the subject line. We will respond to valid notices in accordance with applicable law. Note that ANQR generates QR codes locally on users devices and does not host user-generated content.`
      ]
    }
  ]
};

export default contact;
