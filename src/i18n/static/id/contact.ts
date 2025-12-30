import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Hubungi Kami',
  description: 'Kami menerima masukan, laporan bug, permintaan fitur, dan pertanyaan umum.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Cara menghubungi kami',
      paragraphs: [
        'Kami menawarkan beberapa cara untuk menghubungi kami, tergantung pada kebutuhan Anda. Kami membaca setiap pesan, meskipun waktu respons dapat bervariasi berdasarkan volume dan jenis pertanyaan.',
      ],
    },
    {
      heading: 'Email',
      paragraphs: [
        `Untuk semua pertanyaan: ${CONTACT_EMAIL}`,
        'Ini adalah cara paling andal untuk menghubungi kami dan direkomendasikan untuk pertanyaan detail, pertanyaan bisnis, atau jika formulir kontak tidak berfungsi di perangkat Anda.',
      ],
    },
    {
      heading: 'Jenis-jenis pertanyaan',
      bullets: [
        'Pertanyaan umum: Pertanyaan tentang cara menggunakan ANQR, penjelasan fitur, atau umpan balik umum.',
        'Laporan bug: Harap sertakan peramban Anda, sistem operasi, langkah-langkah untuk mereproduksi masalah, dan pesan kesalahan apa pun yang Anda lihat.',
        'Permintaan fitur: Saran untuk fitur baru atau peningkatan. Kami mempertimbangkan semua permintaan meskipun kami tidak dapat menjanjikan implementasinya.',
        'Pertanyaan bisnis: Peluang kemitraan, pertanyaan perizinan, atau pertanyaan penggunaan komersial.',
        'Permintaan privasi: Permintaan untuk menggunakan hak privasi Anda berdasarkan GDPR, CCPA, atau undang-undang privasi lainnya (lihat Kebijakan Privasi).',
        'DMCA/Hak Cipta: Lihat bagian DMCA di bawah ini untuk persyaratan pemberitahuan penghapusan konten.',
      ],
    },
    {
      heading: 'Waktu respons',
      paragraphs: [
        'Kami berupaya menanggapi pertanyaan dalam waktu 5-7 hari kerja. Permintaan terkait privasi akan ditangani dalam waktu 30 hari sesuai dengan ketentuan hukum.',
        'Selama periode sibuk, waktu respons mungkin lebih lama. Untuk hal-hal yang mendesak, harap cantumkan URGENT di baris subjek email Anda.',
      ],
    },
    {
      heading: 'Sebelum menghubungi kami',
      paragraphs: [
        'Silakan periksa halaman Dokumentasi kami untuk jawaban atas pertanyaan umum tentang cara menggunakan fitur ANQR. Banyak pertanyaan tentang pembuatan kode QR, penataan gaya, dan opsi ekspor dibahas di sana.',
      ],
    },
    {
      heading: 'Pemberitahuan Hak Cipta DMCA',
      paragraphs: [
        'Jika Anda yakin bahwa konten yang tersedia di ANQR melanggar hak cipta Anda, Anda dapat mengirimkan pemberitahuan penghapusan berdasarkan Digital Millennium Copyright Act (DMCA). Agar sah, pemberitahuan Anda harus mencakup:',
      ],
      bullets: [
        'Tanda tangan fisik atau elektronik dari pemilik hak cipta atau agen yang diberi wewenang.',
        'Identifikasi karya berhak cipta yang diklaim telah dilanggar.',
        'Identifikasi materi yang diklaim sebagai pelanggaran, dengan informasi yang cukup untuk menemukannya.',
        'Informasi kontak Anda (alamat, nomor telepon, dan alamat email).',
        'Pernyataan bahwa Anda memiliki keyakinan yang jujur bahwa penggunaan materi tersebut tidak diizinkan oleh pemilik hak cipta.',
        'Suatu pernyataan, di bawah sumpah, bahwa informasi dalam pemberitahuan Anda akurat dan bahwa Anda adalah pemilik hak cipta atau berwenang untuk bertindak atas nama mereka.',
      ],
    },
    {
      heading: 'Kontak DMCA',
      paragraphs: [
        `Kirim pemberitahuan DMCA ke: ${CONTACT_EMAIL}`,
        'Harap sertakan Pemberitahuan DMCA di baris subjek. Kami akan menanggapi pemberitahuan yang sah sesuai dengan hukum yang berlaku. Harap dicatat bahwa ANQR menghasilkan kode QR secara lokal di perangkat pengguna dan tidak menghosting konten yang dibuat pengguna.',
      ],
    },
  ],
};

export default contact;
