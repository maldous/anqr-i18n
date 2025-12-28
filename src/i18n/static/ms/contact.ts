import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Hubungi Kami',
  description: 'Kami mengalu-alukan maklum balas, laporan bug, permintaan ciri dan pertanyaan umum.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Cara menghubungi kami',
      paragraphs: [
        'Kami menawarkan beberapa cara menghubungi bergantung pada keperluan anda. Kami membaca setiap mesej, walaupun masa respons mungkin berbeza berdasarkan jumlah dan jenis pertanyaan.',
      ],
    },
    // Full translation for all 8 sections...
  ],
}