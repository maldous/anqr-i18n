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
        'Kami menawarkan beberapa cara untuk menghubungi kami bergantung pada keperluan anda. Kami membaca setiap mesej, walaupun masa respons mungkin berbeza-beza berdasarkan jumlah dan jenis pertanyaan.',
      ],
    },
    {
      heading: 'E-mel',
      paragraphs: [
        `Untuk semua pertanyaan: ${CONTACT_EMAIL}`,
        'Ini adalah cara yang paling boleh dipercayai untuk menghubungi kami dan disyorkan untuk soalan terperinci, pertanyaan perniagaan atau jika borang hubungan tidak berfungsi pada peranti anda.',
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
        'Soalan umum: Soalan tentang cara menggunakan ANQR, penjelasan ciri atau maklum balas umum.',
        'Laporan pepijat: Sila sertakan pelayar, sistem pengendalian, langkah-langkah untuk menghasilkan semula dan sebarang mesej ralat yang anda lihat.',
        'Permintaan ciri: Cadangan untuk ciri atau penambahbaikan baharu. Kami mempertimbangkan semua permintaan walaupun kami tidak dapat menjanjikan pelaksanaan.',
        'Pertanyaan perniagaan: Peluang perkongsian, soalan pelesenan atau pertanyaan penggunaan komersial.',
        'Permintaan privasi: Permintaan untuk melaksanakan hak privasi anda di bawah GDPR, CCPA atau undang-undang privasi lain (lihat Dasar Privasi).',
        'DMCA/Hak Cipta: Lihat bahagian DMCA di bawah untuk keperluan notis penghapusan.',
      ],
    },
    {
      heading: 'Masa tindak balas',
      paragraphs: [
        'Kami menyasarkan untuk menjawab pertanyaan dalam tempoh 5-7 hari bekerja. Permintaan berkaitan privasi akan ditangani dalam tempoh 30 hari seperti yang dikehendaki oleh undang-undang.',
        'Semasa tempoh sibuk, masa respons mungkin lebih lama. Untuk perkara penting, sila nyatakan SEGERA dalam baris subjek anda.',
      ],
    },
    {
      heading: 'Sebelum menghubungi kami',
      paragraphs: [
        'Sila semak halaman Dokumentasi kami untuk jawapan kepada soalan lazim tentang cara menggunakan ciri ANQR. Banyak soalan tentang penjanaan kod QR, penggayaan dan pilihan eksport dibincangkan di sana.',
      ],
    },
    {
      heading: 'Notis Hak Cipta DMCA',
      paragraphs: [
        'Jika anda percaya bahawa kandungan yang tersedia di ANQR melanggar hak cipta anda, anda boleh mengemukakan notis penghapusan Akta Hak Cipta Milenium Digital (DMCA). Untuk sah, notis anda mesti merangkumi:',
      ],
      bullets: [
        'Tandatangan fizikal atau elektronik pemilik hak cipta atau ejen yang diberi kuasa.',
        'Pengenalpastian karya berhak cipta yang didakwa telah dilanggar.',
        'Pengenalpastian bahan yang didakwa melanggar, dengan maklumat yang mencukupi untuk mencarinya.',
        'Maklumat perhubungan anda (alamat, nombor telefon dan alamat e-mel).',
        'Pernyataan bahawa anda mempunyai kepercayaan yang baik bahawa penggunaan bahan tersebut tidak dibenarkan oleh pemilik hak cipta.',
        'Pernyataan, di bawah hukuman sumpah bohong, bahawa maklumat dalam notis anda adalah tepat dan anda adalah pemilik hak cipta atau diberi kuasa untuk bertindak bagi pihak mereka.',
      ],
    },
    {
      heading: 'Hubungan DMCA',
      paragraphs: [
        `Hantar notis DMCA kepada: ${CONTACT_EMAIL}`,
        'Sila sertakan Notis DMCA dalam baris subjek. Kami akan membalas notis yang sah mengikut undang-undang yang terpakai. Ambil perhatian bahawa ANQR menjana kod QR secara setempat pada peranti pengguna dan tidak mengehoskan kandungan yang dijana pengguna.',
      ],
    },
  ],
};

export default contact;
