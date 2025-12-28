import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: 'Terma Perkhidmatan',
  description: 'Dengan mengakses atau menggunakan laman web, anda bersetuju terikat dengan terma ini.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Penerimaan terma',
      paragraphs: [
        'Dengan mengakses atau menggunakan ANQR (anqr.link), anda bersetuju terikat dengan Terma Perkhidmatan ini dan Dasar Privasi kami. Jika anda tidak bersetuju dengan terma ini, jangan gunakan laman web.',
        'Kami boleh mengemas kini Terma ini dari semasa ke semasa. Penggunaan berterusan selepas perubahan merupakan penerimaan terma baru.',
      ],
    },
    // Full translation for all 21 sections with formal legal Malay...
  ],
}