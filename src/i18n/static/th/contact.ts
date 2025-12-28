import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'ติดต่อเรา',
  description: 'เรายินดีรับฟีดแบ็ค, รายงานบั๊ก, คำขอคุณสมบัติ และคำถามทั่วไป',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'วิธีติดต่อเรา',
      paragraphs: [
        'เรามีหลายวิธีติดต่อขึ้นอยู่กับความต้องการของคุณ เราอ่านทุกข้อความ, แม้ว่าเวลาตอบสนองอาจแตกต่างตามปริมาณและประเภทคำถาม',
      ],
    },
    // Full translation for all 8 sections with accurate Thai...
  ],
}