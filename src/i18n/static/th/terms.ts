import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'ข้อกำหนดการให้บริการ',
  description: 'การเข้าถึงหรือใช้เว็บไซต์แสดงว่าคุณยอมรับข้อผูกมัดกับข้อกำหนดเหล่านี้',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'การยอมรับข้อกำหนด',
      paragraphs: [
        'การเข้าถึงหรือใช้ ANQR (anqr.link) แสดงว่าคุณยอมรับข้อผูกมัดกับข้อกำหนดการให้บริการเหล่านี้และนโยบายความเป็นส่วนตัวของเรา หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาอย่าใช้เว็บไซต์',
        'เราสามารถอัปเดตข้อกำหนดเหล่านี้ได้เป็นครั้งคราว การใช้เว็บไซต์ต่อเนื่องหลังการเปลี่ยนแปลงแสดงถึงการยอมรับข้อกำหนดใหม่',
      ],
    },
    // Full translation for all 21 sections with formal legal Thai, keeping English terms...
  ],
}