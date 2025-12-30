import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Dasar Privasi',
  description: 'Maklumat yang dikumpul oleh ANQR, cara ia digunakan dan hak anda di bawah undang-undang privasi yang terpakai.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ringkasan',
      paragraphs: [
        'ANQR ialah penjana kod QR yang berjalan sepenuhnya pada peranti anda. Kami tidak memerlukan anda membuat akaun dan kod QR dijana secara setempat — kami tidak mempunyai akses kepada kandungan yang anda kodkan.',
        'Untuk kegunaan profesional, ANQR menyediakan API sebelah pelayan yang menjana kod QR daripada parameter URL. Apabila menggunakan API, kandungan QR anda diproses pada pelayan kami untuk memaparkan imej, tetapi tidak disimpan atau direkodkan.',
        'Kami menggunakan Google AdSense untuk pengiklanan dan mungkin menggunakan perkhidmatan analitik. Perkhidmatan ini mengumpul maklumat melalui kuki dan teknologi serupa. Dasar ini menerangkan data yang dikumpul, cara ia digunakan dan hak anda.',
      ],
    },
    {
      heading: 'Maklumat yang kami kumpulkan',
      bullets: [
        'Maklumat yang anda berikan: Jika anda menghubungi kami melalui e-mel atau borang hubungan kami, kami akan mengumpulkan nama, alamat e-mel dan kandungan mesej anda.',
        'Maklumat yang dikumpul secara automatik: Penyedia hosting kami (Netlify), rakan kongsi pengiklanan dan perkhidmatan analitik mungkin mengumpul: alamat IP, jenis dan versi pelayar, sistem pengendalian, jenis peranti, URL rujukan, halaman yang dilawati, masa di tapak dan anggaran lokasi geografi.',
        'Kuki pihak ketiga: Rakan kongsi pengiklanan kami (Google AdSense) menggunakan kuki dan teknologi serupa untuk menayangkan dan mengukur iklan. ANQR sendiri tidak menetapkan sebarang kuki pihak pertama.',
      ],
    },
    {
      heading: 'Kuki dan teknologi pihak ketiga',
      paragraphs: [
        'ANQR tidak menetapkan sebarang kuki pihak pertama. Pilihan anda (seperti mod gelap) disimpan secara setempat pada peranti anda, yang tidak dihantar ke mana-mana pelayan.',
        'Walau bagaimanapun, rakan kongsi pengiklanan kami (Google AdSense) dan penyedia hosting mungkin menggunakan kuki dan teknologi penjejakan yang serupa:',
      ],
      bullets: [
        'Kuki pengiklanan (pihak ketiga): Ditetapkan oleh Google AdSense dan rakan kongsi pengiklanan untuk menayangkan iklan yang berkaitan, mengukur prestasi iklan dan memahami minat pengguna. Kuki ini mungkin menjejaki aktiviti anda merentasi laman web yang berbeza.',
        'Kuki analitik (pihak ketiga): Mungkin digunakan oleh penyedia hosting atau perkhidmatan analitik kami untuk mengumpulkan data penggunaan tanpa nama.',
      ],
    },
    {
      heading: 'Google AdSense dan pengiklanan',
      paragraphs: [
        'Kami memaparkan iklan melalui Google AdSense. Google dan rakan kongsinya menggunakan kuki untuk menayangkan iklan berdasarkan sejarah penyemakan imbas anda di laman web ini dan laman web lain (pengiklanan berasaskan minat).',
        'Ketahui cara Google menggunakan maklumat anda: https://policies.google.com/technologies/partner-sites',
        'Urus pemperibadian iklan: https://adssettings.google.com',
        'Pilih keluar melalui Inisiatif Pengiklanan Rangkaian: https://optout.networkadvertising.org',
        'Pilih keluar melalui Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Bagaimana kami menggunakan maklumat',
      bullets: [
        'Untuk menjawab pertanyaan anda dan memberikan sokongan.',
        'Untuk memaparkan iklan yang berkaitan melalui rakan kongsi pengiklanan kami.',
        'Untuk menganalisis penggunaan laman web dan menambah baik perkhidmatan kami.',
        'Untuk mengesan, mencegah dan menangani isu penipuan, penyalahgunaan dan keselamatan.',
        'Untuk mematuhi kewajipan undang-undang.',
      ],
    },
    {
      heading: 'Perkhidmatan pihak ketiga',
      bullets: [
        'Google AdSense: Menerima data untuk menayangkan dan mengukur iklan.',
        'Penyedia analitik: Terima data penggunaan tanpa nama.',
        'Netlify (pengehosan): Memproses permintaan dan mungkin merekod alamat IP.',
        'Kami tidak menjual maklumat peribadi anda. Walau bagaimanapun, perkongsian data dengan rakan kongsi pengiklanan mungkin dianggap sebagai jualan di bawah CCPA (lihat di bawah).',
      ],
    },
    {
      heading: 'Pengekalan data',
      bullets: [
        'Penyerahan hubungan: Sehingga 2 tahun.',
        'Log pelayan: Sehingga 30 hari (penyedia hosting).',
        'Data analitik: Sehingga 26 bulan (tanpa nama).',
        'Kuki pengiklanan: Biasanya 13 bulan (berbeza mengikut rakan kongsi).',
      ],
    },
    {
      heading: 'Hak anda di bawah GDPR (pengguna EEA)',
      paragraphs: [
        'Jika anda berada di Kawasan Ekonomi Eropah, anda mempunyai hak berikut di bawah Peraturan Perlindungan Data Umum:',
      ],
      bullets: [
        'Hak akses: Minta salinan data peribadi yang kami simpan tentang anda.',
        'Hak untuk pembetulan: Meminta pembetulan data yang tidak tepat.',
        'Hak untuk pemadaman: Meminta pemadaman data anda (hak untuk dilupakan).',
        'Hak untuk menyekat pemprosesan: Meminta had tentang cara kami menggunakan data anda.',
        'Hak untuk kebolehgunaan data: Minta data anda dalam format mudah alih.',
        'Hak untuk membantah: Membantah pemprosesan, termasuk untuk pemasaran langsung.',
        'Hak untuk menarik balik persetujuan: Menarik balik persetujuan pada bila-bila masa jika pemprosesan berasaskan persetujuan.',
        'Hak untuk membuat aduan: Failkan aduan dengan pihak berkuasa perlindungan data anda.',
      ],
    },
    {
      heading: 'Asas perundangan GDPR',
      paragraphs: [
        'Kami memproses data berdasarkan perkara berikut: (a) Persetujuan — untuk pengiklanan diperibadikan (diuruskan oleh rakan kongsi pengiklanan kami); (b) Kepentingan sah — untuk analitik, keselamatan dan penambahbaikan; (c) Kontrak — untuk menjawab pertanyaan.',
        'Untuk melaksanakan hak anda, hubungi ${CONTACT_EMAIL}. Kami akan memberi maklum balas dalam tempoh 30 hari.',
      ],
    },
    {
      heading: 'Hak anda di bawah CCPA (pengguna California)',
      bullets: [
        'Hak untuk mengetahui: Meminta maklumat tentang data yang dikumpul, sumber, tujuan dan pihak ketiga.',
        'Hak untuk memadam: Minta pemadaman maklumat peribadi anda.',
        'Hak untuk menarik diri: Menarik diri daripada penjualan maklumat peribadi (perkongsian dengan rakan kongsi iklan mungkin layak).',
        'Hak untuk tidak diskriminasi: Kami tidak akan mendiskriminasi kerana melaksanakan hak anda.',
      ],
    },
    {
      heading: 'Kategori CCPA dikumpul',
      paragraphs: [
        'Kategori: Pengecam (alamat IP, ID peranti), Aktiviti Internet (penyemayanan, interaksi iklan), Geolokasi (anggaran), Inferens (minat daripada pelayaran).',
        'Untuk melaksanakan hak atau menarik diri: ${CONTACT_EMAIL} atau melaraskan tetapan kuki.',
      ],
    },
    {
      heading: 'Pemindahan antarabangsa',
      paragraphs: [
        'Maklumat anda mungkin dipindahkan ke negara-negara yang mempunyai undang-undang perlindungan data yang berbeza, termasuk Amerika Syarikat. Kami menggunakan perlindungan yang sesuai seperti Klausa Kontrak Standard.',
      ],
    },
    {
      heading: 'Privasi kanak-kanak',
      paragraphs: [
        'ANQR tidak ditujukan kepada kanak-kanak di bawah umur 13 tahun (atau 16 tahun di EEA). Kami tidak sengaja mengumpul data daripada kanak-kanak. Hubungi ${CONTACT_EMAIL} jika anda percaya bahawa seorang kanak-kanak telah memberikan maklumat.',
      ],
    },
    {
      heading: 'Keselamatan',
      paragraphs: [
        'Kami menggunakan langkah-langkah teknikal dan organisasi yang sesuai untuk melindungi data, termasuk penyulitan HTTPS. Walau bagaimanapun, tiada penghantaran internet yang 100% selamat.',
      ],
    },
    {
      heading: 'Jangan Jejaki',
      paragraphs: [
        'Kami menghormati isyarat pelayar Jangan Jejaki jika boleh, walaupun rakan kongsi pengiklanan mungkin tidak memberi respons kepada DNT.',
      ],
    },
    {
      heading: 'Perubahan pada dasar ini',
      paragraphs: [
        'Kami mungkin mengemas kini dasar ini secara berkala. Tarikh Kemas kini terakhir menunjukkan semakan terkini. Perubahan ketara mungkin dimaklumkan melalui sepanduk laman web.',
      ],
    },
    {
      heading: 'Hubungi kami',
      paragraphs: [
        'Untuk soalan privasi atau untuk melaksanakan hak anda: ${CONTACT_EMAIL} atau gunakan halaman Hubungi kami. Kami akan menjawab permintaan privasi dalam tempoh 30 hari.',
      ],
    },
  ],
}

export default privacy;
