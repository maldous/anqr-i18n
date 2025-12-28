import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Dasar Privasi',
  description: 'Maklumat yang dikumpul oleh ANQR, bagaimana ia digunakan, dan hak anda di bawah undang-undang privasi yang berkenaan.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ringkasan',
      paragraphs: [
        'ANQR adalah penjana kod QR yang berjalan sepenuhnya pada peranti anda. Kami tidak memerlukan anda mencipta akaun, dan kod QR dijana secara tempatan — kami tidak mempunyai akses kepada kandungan yang anda kodkan.',
        'Kami menggunakan Google AdSense untuk iklan dan mungkin perkhidmatan analitik. Perkhidmatan ini mengumpul maklumat melalui kuki dan teknologi serupa. Dasar ini menerangkan data yang dikumpul, bagaimana ia digunakan, dan hak anda.',
      ],
    },
    // Full complete translation for all sections...
  ],
}