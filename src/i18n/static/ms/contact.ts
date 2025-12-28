import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Hubungi Kami',
  description: 'Kami mengalu-alukan maklum balas, laporan pepijat, permintaan ciri dan pertanyaan umum.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Cara menghubungi kami',
      paragraphs: [
        'Kami menyediakan beberapa cara untuk menghubungi kami mengikut keperluan anda. Kami membaca setiap mesej, namun masa respons mungkin berbeza mengikut jumlah dan jenis pertanyaan.',
      ],
    },
    {
      heading: 'E-mel',
      paragraphs: [
        `Untuk semua pertanyaan: ${CONTACT_EMAIL}`,
        'Ini cara paling boleh dipercayai untuk menghubungi kami dan disyorkan untuk soalan terperinci, pertanyaan perniagaan, atau jika borang hubungan tidak berfungsi pada peranti anda.',
      ],
    },
    {
      heading: 'Borang hubungan',
      paragraphs: [
        'Gunakan borang di bawah untuk menghantar mesej terus kepada kami. Jika borang tidak berjaya dihantar, sila gunakan e-mel.',
      ],
    },
    {
      heading: 'Jenis pertanyaan',
      bullets: [
        'Soalan umum: Soalan tentang cara menggunakan ANQR, penerangan ciri, atau maklum balas umum.',
        'Laporan pepijat: Sila sertakan pelayar anda, sistem operasi, langkah untuk menghasilkan semula, dan sebarang mesej ralat yang anda lihat.',
        'Permintaan ciri: Cadangan ciri baharu atau penambahbaikan. Kami mempertimbangkan semua permintaan, namun kami tidak dapat menjanjikan pelaksanaan.',
        'Pertanyaan perniagaan: Peluang perkongsian, soalan pelesenan, atau pertanyaan penggunaan komersial.',
        'Permintaan privasi: Permintaan untuk menggunakan hak privasi anda di bawah GDPR, CCPA, atau undang-undang privasi lain (lihat Dasar Privasi).',
        'DMCA/Hak cipta: Lihat bahagian DMCA di bawah untuk keperluan notis takedown.',
      ],
    },
    {
      heading: 'Masa respons',
      paragraphs: [
        'Kami menyasarkan untuk membalas pertanyaan dalam 5–7 hari bekerja. Permintaan berkaitan privasi akan ditangani dalam 30 hari seperti dikehendaki oleh undang-undang.',
        'Semasa tempoh sibuk, masa respons mungkin lebih lama. Untuk perkara segera, sila nyatakan "URGENT" dalam tajuk e-mel anda.',
      ],
    },
    {
      heading: 'Sebelum menghubungi kami',
      paragraphs: [
        'Sila semak halaman Dokumentasi kami untuk jawapan kepada soalan lazim tentang cara menggunakan ciri ANQR. Banyak soalan tentang penjanaan kod QR, penggayaan dan pilihan eksport diterangkan di sana.',
      ],
    },
    {
      heading: 'Notis Hak Cipta DMCA',
      paragraphs: [
        'Jika anda percaya kandungan yang tersedia di ANQR melanggar hak cipta anda, anda boleh menghantar notis takedown Akta Hak Cipta Milenium Digital (DMCA). Untuk sah, notis anda mesti mengandungi:',
      ],
      bullets: [
        'Tandatangan fizikal atau elektronik pemilik hak cipta atau ejen yang diberi kuasa.',
        'Pengenalpastian karya berhak cipta yang didakwa telah dilanggar.',
        'Pengenalpastian bahan yang didakwa melanggar, dengan maklumat yang mencukupi untuk menemuinya.',
        'Maklumat hubungan anda (alamat, nombor telefon dan alamat e-mel).',
        'Pernyataan bahawa anda mempunyai kepercayaan iktikad baik bahawa penggunaan bahan tersebut tidak dibenarkan oleh pemilik hak cipta.',
        'Pernyataan, di bawah hukuman sumpah, bahawa maklumat dalam notis anda adalah tepat dan bahawa anda ialah pemilik hak cipta atau diberi kuasa untuk bertindak bagi pihaknya.',
      ],
    },
    {
      heading: 'Hubungan DMCA',
      paragraphs: [
        `Hantar notis DMCA ke: ${CONTACT_EMAIL}`,
        'Sila sertakan "DMCA Notice" dalam baris subjek. Kami akan membalas notis yang sah mengikut undang-undang yang berkenaan. Harap maklum ANQR menjana kod QR secara setempat pada peranti pengguna dan tidak mengehos kandungan yang dijana pengguna.',
      ],
    },
  ],
};

export default contact;
