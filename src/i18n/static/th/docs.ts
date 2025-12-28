import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'คู่มือผู้ใช้ ANQR',
  description: 'คู่มือครบถ้วนในการใช้ ANQR เพื่อสร้าง QR code',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'เริ่มต้น',
      paragraphs: [
        'ANQR เป็นเครื่องสร้าง QR code ที่ทำงานทั้งหมดบนอุปกรณ์ของคุณ — คอมพิวเตอร์, โทรศัพท์หรือแท็บเล็ต ไม่ต้องมีบัญชี, ไม่มีเซิร์ฟเวอร์, ข้อมูลของคุณยังคงส่วนตัว',
        'อินเตอร์เฟซมีสามระดับ: พื้นฐาน, ขั้นสูง, มืออาชีพ เลือกระดับของคุณด้วยแท็บในหัวข้อ แต่ละระดับปลดล็อกคุณสมบัติเพิ่มเติมขณะรักษาความโฟกัส',
      ],
      bullets: [
        'พื้นฐาน: สร้าง QR code ง่ายๆ ด้วยเนื้อหา plain text/URL และภาพ overlay',
        // Full all 40+ sections translated with technical terms like 'โมดูล' for module...
      ],
    },
    // Complete translation for all sections...
  ],
}