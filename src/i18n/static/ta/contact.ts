import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'எங்களை தொடர்புகொள்ளுங்கள்',
  description: `கருத்துகள், பிழை அறிக்கைகள், அம்ச கோரிக்கைகள் மற்றும் பொதுக் கேள்விகளை நாங்கள் வரவேற்கிறோம்.`,
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'எங்களை எவ்வாறு தொடர்புகொள்ளலாம்',
      paragraphs: [
        `We offer several ways to contact us depending on your needs. We read every message, though response times may vary based on volume and enquiry type.`
      ]
    },
    {
      heading: 'மின்னஞ்சல்',
      paragraphs: [
        `எல்லா விசாரணைகளுக்கும்: ${CONTACT_EMAIL}`,
        `This is the most reliable way to reach us and is recommended for detailed questions, business enquiries, or if the contact form does not work on your device.`
      ]
    },
    {
      heading: 'தொடர்பு படிவம்',
      paragraphs: [
        `Use the form below to send us a message directly. If the form does not submit successfully, please use email instead.`
      ]
    },
    {
      heading: 'வினாக்களின் வகைகள்',
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
      heading: 'பதில் அளிக்கும் காலம்',
      paragraphs: [
        `We aim to respond to enquiries within 5-7 business days. Privacy-related requests will be addressed within 30 days as required by law.`,
        `During busy periods, response times may be longer. For urgent matters, please indicate "URGENT" in your subject line.`
      ]
    },
    {
      heading: 'தொடர்புகொள்ளும் முன்',
      paragraphs: [
        `Please check our Documentation page for answers to common questions about how to use ANQR features. Many questions about QR code generation, styling, and export options are covered there.`
      ]
    },
    {
      heading: 'DMCA பதிப்புரிமை அறிவிப்புகள்',
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
      heading: 'DMCA தொடர்பு',
      paragraphs: [
        `DMCA அறிவிப்புகளை இங்கே அனுப்பவும்: ${CONTACT_EMAIL}`,
        `Please include "DMCA Notice" in the subject line. We will respond to valid notices in accordance with applicable law. Note that ANQR generates QR codes locally on users devices and does not host user-generated content.`
      ]
    }
  ]
};

export default contact;
