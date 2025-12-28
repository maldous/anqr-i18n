import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'ติดต่อเรา',
  description: 'เรายินดีรับความคิดเห็น รายงานบั๊ก คำขอฟีเจอร์ และคำถามทั่วไป',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'วิธีติดต่อเรา',
      paragraphs: [
        `เรามีหลายวิธีติดต่อขึ้นอยู่กับความต้องการของคุณ เราอ่านทุกข้อความ, แม้ว่าเวลาตอบสนองอาจแตกต่างตามปริมาณและประเภทคำถาม`
      ]
    },
    {
      heading: 'อีเมล',
      paragraphs: [
        `สำหรับการติดต่อทั้งหมด: ${CONTACT_EMAIL}`,
        `This is the most reliable way to reach us and is recommended for detailed questions, business enquiries, or if the contact form does not work on your device.`
      ]
    },
    {
      heading: 'แบบฟอร์มติดต่อ',
      paragraphs: [
        `Use the form below to send us a message directly. If the form does not submit successfully, please use email instead.`
      ]
    },
    {
      heading: 'ประเภทของคำถาม',
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
      heading: 'ระยะเวลาการตอบกลับ',
      paragraphs: [
        `We aim to respond to enquiries within 5-7 business days. Privacy-related requests will be addressed within 30 days as required by law.`,
        `During busy periods, response times may be longer. For urgent matters, please indicate "URGENT" in your subject line.`
      ]
    },
    {
      heading: 'ก่อนติดต่อเรา',
      paragraphs: [
        `Please check our Documentation page for answers to common questions about how to use ANQR features. Many questions about QR code generation, styling, and export options are covered there.`
      ]
    },
    {
      heading: 'การแจ้งลิขสิทธิ์ DMCA',
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
      heading: 'ติดต่อ DMCA',
      paragraphs: [
        `ส่งหนังสือแจ้ง DMCA ไปที่: ${CONTACT_EMAIL}`,
        `Please include "DMCA Notice" in the subject line. We will respond to valid notices in accordance with applicable law. Note that ANQR generates QR codes locally on users devices and does not host user-generated content.`
      ]
    }
  ]
};

export default contact;
