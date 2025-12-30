import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Kebijakan Privasi',
  description: 'Informasi yang dikumpulkan ANQR, bagaimana informasi tersebut digunakan, dan hak-hak Anda berdasarkan hukum privasi yang berlaku.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ringkasan',
      paragraphs: [
        'ANQR adalah generator kode QR yang berjalan sepenuhnya di perangkat Anda. Kami tidak mengharuskan Anda membuat akun, dan kode QR dihasilkan secara lokal — kami tidak memiliki akses ke konten yang Anda encode.',
        'Untuk penggunaan profesional, ANQR menyediakan API sisi server yang menghasilkan kode QR dari parameter URL. Saat menggunakan API, konten QR Anda diproses di server kami untuk merender gambar, tetapi tidak disimpan atau dicatat.',
        'Kami menggunakan Google AdSense untuk periklanan dan dapat menggunakan layanan analitik. Layanan ini mengumpulkan informasi melalui cookie dan teknologi serupa. Kebijakan ini menjelaskan data apa yang dikumpulkan, bagaimana data tersebut digunakan, dan hak-hak Anda.',
      ],
    },
    {
      heading: 'Informasi yang kami kumpulkan',
      bullets: [
        'Informasi yang Anda berikan: Jika Anda menghubungi kami melalui email atau formulir kontak kami, kami mengumpulkan nama, alamat email, dan isi pesan Anda.',
        'Informasi yang dikumpulkan secara otomatis: Penyedia hosting kami (Netlify), mitra periklanan, dan layanan analitik dapat mengumpulkan: alamat IP, jenis dan versi peramban, sistem operasi, jenis perangkat, URL perujuk, halaman yang dikunjungi, waktu di situs, dan perkiraan lokasi geografis.',
        'Cookie pihak ketiga: Mitra periklanan kami (Google AdSense) menggunakan cookie dan teknologi serupa untuk menayangkan dan mengukur iklan. ANQR sendiri tidak memasang cookie pihak pertama apa pun.',
      ],
    },
    {
      heading: 'Cookie dan teknologi pihak ketiga',
      paragraphs: [
        'ANQR tidak memasang cookie pihak pertama apa pun. Preferensi Anda (seperti mode gelap) disimpan secara lokal di perangkat Anda, yang tidak dikirimkan ke server mana pun.',
        'Namun, mitra periklanan kami (Google AdSense) dan penyedia hosting dapat menggunakan cookie dan teknologi pelacakan serupa:',
      ],
      bullets: [
        'Cookie iklan (pihak ketiga): Ditetapkan oleh Google AdSense dan mitra periklanan untuk menayangkan iklan yang relevan, mengukur kinerja iklan, dan memahami minat pengguna. Cookie ini dapat melacak aktivitas Anda di berbagai situs web.',
        'Cookie analitik (pihak ketiga): Dapat digunakan oleh penyedia hosting kami atau layanan analitik untuk mengumpulkan data penggunaan anonim.',
      ],
    },
    {
      heading: 'Google AdSense dan periklanan',
      paragraphs: [
        'Kami menampilkan iklan melalui Google AdSense. Google dan mitranya menggunakan cookie untuk menayangkan iklan berdasarkan riwayat penelusuran Anda di situs ini dan situs web lain (iklan berbasis minat).',
        'Pelajari cara Google menggunakan informasi Anda: https://policies.google.com/technologies/partner-sites',
        'Kelola personalisasi iklan: https://adssettings.google.com',
        'Pilih untuk tidak ikut serta melalui Network Advertising Initiative: https://optout.networkadvertising.org',
        'Pilih untuk tidak ikut serta melalui Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Bagaimana kita menggunakan informasi',
      bullets: [
        'Untuk menanggapi pertanyaan Anda dan memberikan dukungan.',
        'Untuk menampilkan iklan yang relevan melalui mitra periklanan kami.',
        'Untuk menganalisis penggunaan situs dan meningkatkan layanan kami.',
        'Untuk mendeteksi, mencegah, dan mengatasi penipuan, penyalahgunaan, dan masalah keamanan.',
        'Untuk mematuhi kewajiban hukum.',
      ],
    },
    {
      heading: 'Layanan pihak ketiga',
      bullets: [
        'Google AdSense: Menerima data untuk menayangkan dan mengukur iklan.',
        'Penyedia analitik: Terima data penggunaan yang dianonimkan.',
        'Netlify (hosting): Memproses permintaan dan dapat mencatat alamat IP.',
        'Kami tidak menjual informasi pribadi Anda. Namun, berbagi data dengan mitra periklanan dapat dianggap sebagai penjualan berdasarkan CCPA (lihat di bawah).',
      ],
    },
    {
      heading: 'Retensi data',
      bullets: [
        'Pengajuan kontak: Hingga 2 tahun.',
        'Log server: Hingga 30 hari (penyedia hosting).',
        'Data analitik: Hingga 26 bulan (anonim).',
        'Cookie iklan: Biasanya 13 bulan (bervariasi tergantung mitra).',
      ],
    },
    {
      heading: 'Hak Anda berdasarkan GDPR (pengguna EEA)',
      paragraphs: [
        'Jika Anda berada di Wilayah Ekonomi Eropa, Anda memiliki hak-hak berikut berdasarkan Peraturan Perlindungan Data Umum:',
      ],
      bullets: [
        'Hak akses: Meminta salinan data pribadi yang kami simpan tentang Anda.',
        'Hak untuk perbaikan: Meminta koreksi atas data yang tidak akurat.',
        'Hak untuk penghapusan: Meminta penghapusan data Anda (hak untuk dilupakan).',
        'Hak untuk membatasi pemrosesan: Minta batasan tentang bagaimana kami menggunakan data Anda.',
        'Hak atas portabilitas data: Mintalah data Anda dalam format portabel.',
        'Hak untuk mengajukan keberatan: Mengajukan keberatan terhadap pemrosesan, termasuk untuk pemasaran langsung.',
        'Hak untuk mencabut persetujuan: Mencabut persetujuan kapan saja jika pemrosesan didasarkan pada persetujuan.',
        'Hak untuk mengajukan pengaduan: Ajukan pengaduan kepada otoritas perlindungan data Anda.',
      ],
    },
    {
      heading: 'Dasar hukum GDPR',
      paragraphs: [
        'Kami memproses data berdasarkan hal-hal berikut: (a) Persetujuan — untuk iklan yang dipersonalisasi (dikelola oleh mitra periklanan kami); (b) Kepentingan sah — untuk analitik, keamanan, dan peningkatan; (c) Kontrak — untuk menanggapi pertanyaan.',
        'Untuk menggunakan hak Anda, hubungi ${CONTACT_EMAIL}. Kami akan merespons dalam waktu 30 hari.',
      ],
    },
    {
      heading: 'Hak Anda berdasarkan CCPA (Pengguna California)',
      bullets: [
        'Hak untuk mengetahui: Meminta informasi tentang data yang dikumpulkan, sumber, tujuan, dan pihak ketiga.',
        'Hak untuk menghapus: Ajukan permohonan penghapusan informasi pribadi Anda.',
        'Hak untuk menolak: Menolak untuk menjual informasi pribadi (berbagi dengan mitra iklan mungkin termasuk).',
        'Hak untuk tidak didiskriminasi: Kami tidak akan melakukan diskriminasi karena Anda menggunakan hak Anda.',
      ],
    },
    {
      heading: 'Kategori CCPA yang dikumpulkan',
      paragraphs: [
        'Kategori: Pengidentifikasi (alamat IP, ID perangkat), Aktivitas internet (penjelajahan, interaksi iklan), Geolokasi (perkiraan), Kesimpulan (minat dari penjelajahan).',
        'Untuk menggunakan hak atau menolak: ${CONTACT_EMAIL} atau sesuaikan pengaturan cookie.',
      ],
    },
    {
      heading: 'Transfer internasional',
      paragraphs: [
        'Informasi Anda dapat ditransfer ke negara-negara dengan hukum perlindungan data yang berbeda, termasuk Amerika Serikat. Kami menggunakan pengamanan yang sesuai seperti Klausul Kontrak Standar.',
      ],
    },
    {
      heading: 'Privasi anak-anak',
      paragraphs: [
        'ANQR tidak ditujukan untuk anak-anak di bawah usia 13 tahun (atau 16 tahun di EEA). Kami tidak dengan sengaja mengumpulkan data dari anak-anak. Hubungi ${CONTACT_EMAIL} jika Anda yakin seorang anak telah memberikan informasi.',
      ],
    },
    {
      heading: 'Keamanan',
      paragraphs: [
        'Kami menggunakan langkah-langkah teknis dan organisasi yang tepat untuk melindungi data, termasuk enkripsi HTTPS. Namun, tidak ada transmisi internet yang 100% aman.',
      ],
    },
    {
      heading: 'Jangan Lacak',
      paragraphs: [
        'Kami menghormati sinyal Jangan Lacak (Do Not Track) dari peramban jika memungkinkan, meskipun mitra periklanan mungkin tidak menanggapi DNT.',
      ],
    },
    {
      heading: 'Perubahan pada kebijakan ini',
      paragraphs: [
        'Kami dapat memperbarui kebijakan ini secara berkala. Tanggal Terakhir diperbarui menunjukkan revisi terbaru. Perubahan signifikan dapat dikomunikasikan melalui banner situs.',
      ],
    },
    {
      heading: 'Hubungi kami',
      paragraphs: [
        'Untuk pertanyaan privasi atau untuk menggunakan hak Anda: ${CONTACT_EMAIL} atau gunakan halaman Kontak kami. Kami menanggapi permintaan privasi dalam waktu 30 hari.',
      ],
    },
  ],
}

export default privacy;
