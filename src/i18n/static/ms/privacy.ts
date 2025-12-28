import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Dasar Privasi',
  description: 'Maklumat yang dikumpul ANQR, cara ia digunakan, dan hak anda di bawah undang-undang privasi yang berkenaan.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ringkasan',
      paragraphs: [
        'ANQR ialah penjana kod QR yang berfungsi sepenuhnya pada peranti anda. Anda tidak perlu membuat akaun, dan kod QR dijana secara setempat — kami tidak mempunyai akses kepada kandungan yang anda enkodkan.',
        'Kami menggunakan Google AdSense untuk pengiklanan dan mungkin menggunakan perkhidmatan analitik. Perkhidmatan ini mengumpul maklumat melalui kuki dan teknologi seumpamanya. Dasar ini menerangkan data yang dikumpul, cara ia digunakan, dan hak anda.',
      ],
    },
    {
      heading: 'Maklumat yang kami kumpul',
      bullets: [
        'Maklumat yang anda berikan: Jika anda menghubungi kami melalui e-mel atau borang hubungan, kami mengumpul nama, alamat e-mel, dan kandungan mesej anda.',
        'Maklumat yang dikumpul secara automatik: Penyedia hos kami (Netlify), rakan pengiklanan, dan perkhidmatan analitik mungkin mengumpul: alamat IP, jenis dan versi pelayar, sistem operasi, jenis peranti, URL perujuk, halaman yang dilawati, masa di laman, dan lokasi geografi anggaran.',
        'Kuki pihak ketiga: Rakan pengiklanan kami (Google AdSense) menggunakan kuki dan teknologi seumpamanya untuk menyajikan dan mengukur iklan. ANQR sendiri tidak menetapkan sebarang kuki pihak pertama.',
      ],
    },
    {
      heading: 'Kuki dan teknologi pihak ketiga',
      paragraphs: [
        'ANQR tidak menetapkan sebarang kuki pihak pertama. Keutamaan anda (seperti mod gelap) disimpan secara setempat pada peranti anda dan tidak dihantar ke mana-mana pelayan.',
        'Walau bagaimanapun, rakan pengiklanan kami (Google AdSense) dan penyedia hos mungkin menggunakan kuki serta teknologi penjejakan yang serupa:',
      ],
      bullets: [
        'Kuki pengiklanan (pihak ketiga): Ditetapkan oleh Google AdSense dan rakan pengiklanan untuk menyajikan iklan yang relevan, mengukur prestasi iklan, dan memahami minat pengguna. Kuki ini mungkin menjejak aktiviti anda merentas laman web yang berbeza.',
        'Kuki analitik (pihak ketiga): Mungkin digunakan oleh penyedia hos atau perkhidmatan analitik untuk mengumpul data penggunaan yang dianonimkan.',
      ],
    },
    {
      heading: 'Google AdSense dan pengiklanan',
      paragraphs: [
        'Kami memaparkan iklan melalui Google AdSense. Google dan rakan kongsinya menggunakan kuki untuk menyajikan iklan berdasarkan sejarah pelayaran anda di laman ini dan laman web lain (pengiklanan berasaskan minat).',
        'Ketahui cara Google menggunakan maklumat anda: https://policies.google.com/technologies/partner-sites',
        'Urus pemperibadian iklan: https://adssettings.google.com',
        'Nyahlanggan melalui Network Advertising Initiative: https://optout.networkadvertising.org',
        'Nyahlanggan melalui Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Cara kami menggunakan maklumat',
      bullets: [
        'Untuk menjawab pertanyaan anda dan memberikan sokongan.',
        'Untuk memaparkan iklan yang relevan melalui rakan pengiklanan kami.',
        'Untuk menganalisis penggunaan laman dan menambah baik perkhidmatan kami.',
        'Untuk mengesan, mencegah, dan menangani penipuan, penyalahgunaan, dan isu keselamatan.',
        'Untuk mematuhi kewajipan undang-undang.',
      ],
    },
    {
      heading: 'Perkhidmatan pihak ketiga',
      bullets: [
        'Google AdSense: Menerima data untuk menyajikan dan mengukur iklan.',
        'Penyedia analitik: Menerima data penggunaan yang dianonimkan.',
        'Netlify (hos): Memproses permintaan dan mungkin merekod alamat IP.',
        'Kami tidak menjual maklumat peribadi anda. Namun, perkongsian data dengan rakan pengiklanan mungkin dianggap sebagai "jualan" di bawah CCPA (lihat di bawah).',
      ],
    },
    {
      heading: 'Penyimpanan data',
      bullets: [
        'Penghantaran borang hubungan: Sehingga 2 tahun.',
        'Log pelayan: Sehingga 30 hari (penyedia hos).',
        'Data analitik: Sehingga 26 bulan (dianonimkan).',
        'Kuki pengiklanan: Lazimnya 13 bulan (berbeza mengikut rakan).',
      ],
    },
    {
      heading: 'Hak anda di bawah GDPR (pengguna EEA)',
      paragraphs: [
        'Jika anda berada di Kawasan Ekonomi Eropah (EEA), anda mempunyai hak berikut di bawah Peraturan Perlindungan Data Umum (GDPR):',
      ],
      bullets: [
        'Hak akses: Minta salinan data peribadi yang kami pegang tentang anda.',
        'Hak pembetulan: Minta pembetulan data yang tidak tepat.',
        'Hak pemadaman: Minta pemadaman data anda ("hak untuk dilupakan").',
        'Hak mengehadkan pemprosesan: Minta had tentang cara kami menggunakan data anda.',
        'Hak keboleh-alihan data: Minta data anda dalam format yang boleh dibawa.',
        'Hak membantah: Bantah pemprosesan, termasuk untuk pemasaran langsung.',
        'Hak menarik balik persetujuan: Tarik balik persetujuan pada bila-bila masa apabila pemprosesan berasaskan persetujuan.',
        'Hak membuat aduan: Failkan aduan kepada pihak berkuasa perlindungan data anda.',
      ],
    },
    {
      heading: 'Asas undang-undang GDPR',
      paragraphs: [
        'Kami memproses data atas asas berikut: (a) Persetujuan — untuk pengiklanan diperibadikan (diurus oleh rakan pengiklanan kami); (b) Kepentingan sah — untuk analitik, keselamatan, dan penambahbaikan; (c) Kontrak — untuk menjawab pertanyaan.',
        `Untuk menggunakan hak anda, hubungi ${CONTACT_EMAIL}. Kami akan membalas dalam masa 30 hari.`,
      ],
    },
    {
      heading: 'Hak anda di bawah CCPA (pengguna California)',
      bullets: [
        'Hak untuk mengetahui: Minta maklumat tentang data yang dikumpul, sumber, tujuan, dan pihak ketiga.',
        'Hak untuk memadam: Minta pemadaman maklumat peribadi anda.',
        'Hak untuk nyahlanggan: Nyahlanggan "jualan" maklumat peribadi (perkongsian dengan rakan iklan mungkin layak).',
        'Hak untuk tidak didiskriminasi: Kami tidak akan mendiskriminasi anda kerana menggunakan hak anda.',
      ],
    },
    {
      heading: 'Kategori yang dikumpul di bawah CCPA',
      paragraphs: [
        'Kategori: Pengenal (alamat IP, ID peranti), aktiviti internet (pelayaran, interaksi iklan), geolokasi (anggaran), inferens (minat daripada pelayaran).',
        `Untuk menggunakan hak atau nyahlanggan: ${CONTACT_EMAIL} atau laraskan tetapan kuki.`,
      ],
    },
    {
      heading: 'Pemindahan antarabangsa',
      paragraphs: [
        'Maklumat anda mungkin dipindahkan ke negara yang mempunyai undang-undang perlindungan data yang berbeza, termasuk Amerika Syarikat. Kami menggunakan perlindungan yang sesuai seperti Klausa Kontrak Standard.',
      ],
    },
    {
      heading: 'Privasi kanak-kanak',
      paragraphs: [
        `ANQR tidak ditujukan kepada kanak-kanak di bawah 13 tahun (atau 16 tahun di EEA). Kami tidak dengan sengaja mengumpul data daripada kanak-kanak. Hubungi ${CONTACT_EMAIL} jika anda percaya seorang kanak-kanak telah memberikan maklumat.`,
      ],
    },
    {
      heading: 'Keselamatan',
      paragraphs: [
        'Kami menggunakan langkah teknikal dan organisasi yang sesuai untuk melindungi data, termasuk penyulitan HTTPS. Namun, tiada penghantaran internet yang 100% selamat.',
      ],
    },
    {
      heading: 'Jangan Jejak (Do Not Track)',
      paragraphs: [
        'Kami menghormati isyarat Do Not Track pelayar apabila berdaya, walaupun rakan pengiklanan mungkin tidak bertindak balas terhadap DNT.',
      ],
    },
    {
      heading: 'Perubahan pada dasar ini',
      paragraphs: [
        'Kami mungkin mengemas kini dasar ini dari semasa ke semasa. Tarikh "Last updated" menunjukkan semakan paling terkini. Perubahan penting mungkin dimaklumkan melalui sepanduk laman.',
      ],
    },
    {
      heading: 'Hubungi kami',
      paragraphs: [
        `Untuk soalan privasi atau untuk menggunakan hak anda: ${CONTACT_EMAIL} atau gunakan halaman Contact kami. Kami membalas permintaan privasi dalam masa 30 hari.`,
      ],
    },
  ],
}
