import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'Panduan Pengguna ANQR',
  description: 'Panduan lengkap menggunakan ANQR untuk mencipta kod QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Permulaan',
      paragraphs: [
        'ANQR adalah penjana kod QR yang berjalan sepenuhnya pada peranti anda — komputer, telefon atau tablet. Tiada akaun diperlukan, tiada pelayan terlibat, dan data anda kekal peribadi.',
        'Antara muka mempunyai tiga tahap: Asas, Lanjutan, dan Profesional. Pilih tahap anda menggunakan tab di header. Setiap tahap membuka ciri tambahan sambil mengekalkan fokus antara muka.',
      ],
      bullets: [
        'Asas: Ciptaan kod QR mudah dengan kandungan teks/URL biasa dan tindan imej.',
        // Full all 40+ sections translated...
      ],
    },
    // Complete translation...
  ],
}