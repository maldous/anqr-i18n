import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'About ANQR',
  description: 'Learn more about ANQR and its features',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Apakah ANQR?',
      paragraphs: [
        `ANQR (diucapkan "anchor") adalah penjana kod QR percuma yang berjalan sepenuhnya pada peranti anda — komputer, telefon atau tablet anda. Cipta kod QR untuk URL, teks, kelayakan Wi-Fi, kad kontakt, acara kalendar dan banyak lagi.`,
        `Alatan ini direka untuk individu, perniagaan kecil, pemasar dan pembangun yang memerlukan kod QR dengan cepat tanpa mendaftar akaun. Data anda tidak pernah meninggalkan peranti anda.`
      ]
    },
    {
      heading: 'Ciri-ciri utama',
      bullets: [
        'Jana kod QR segera pada peranti anda — tiada muat naik pelayan, tiada akaun diperlukan.',
        'Sesuaikan penampilan dengan warna, gaya modul, corak pencari dan tindan gambar.',
        'Eksport dalam pelbagai format: PNG, SVG, WebP, dan GIF animasi.',
        'Pilihan lanjutan untuk pembetulan ralat, kawalan versi dan mod pengekodan.',
        'Alat analisis keselamatan membantu memastikan kod QR anda boleh diimbas.',
        'Tiga tahap ciri (Asas, Lanjutan, Profesional) untuk keperluan anda.'
      ]
    },
    {
      heading: 'Bagaimana ANQR berfungsi',
      paragraphs: [
        `ANQR memproses semuanya secara tempatan pada peranti anda. Teks atau data yang anda masukkan untuk mencipta kod QR tidak pernah meninggalkan peranti anda — ia dikodkan secara langsung pada komputer, telefon atau tablet anda tanpa dihantar ke pelayan.`,
        `Apabila anda muat naik imej tindan, ia diproses secara tempatan pada peranti anda. Jika anda muat imej dari URL, ia diambil secara langsung dari pelayan hos.`,
        'Kami tidak menyimpan, melog atau mengakses kandungan yang anda kodkan ke dalam kod QR.'
      ]
    },
    {
      heading: 'Siapa mengendalikan ANQR?',
      paragraphs: [
        `ANQR dikendalikan sebagai alat web bebas. Untuk soalan, sokongan atau pertanyaan perniagaan, sila gunakan halaman Hubungi atau e-mel ${CONTACT_EMAIL}.`
      ]
    },
    {
      heading: 'Iklan dan bagaimana kami kekal percuma',
      paragraphs: [
        `ANQR percuma untuk digunakan dan disokong oleh iklan. Kami memaparkan iklan melalui Google AdSense dan mungkin rakan iklan lain.`,
        `Perkhidmatan iklan ini mungkin menggunakan kuki dan teknologi serupa untuk menyampaikan iklan berdasarkan minat dan sejarah pelayaran anda. Anda boleh ketahui lebih lanjut dalam Dasar Privasi kami, dan urus keutamaan iklan anda melalui tetapan peranti atau Google Ads Settings.`,
        `Kami percaya pada ketelusan: iklan membantu kami mengekalkan alatan percuma dan boleh diakses kepada semua orang tanpa langganan atau paywall.`
      ]
    },
    {
      heading: 'Piawaian terbuka',
      paragraphs: [
        `Kod QR adalah piawaian ISO terbuka (ISO/IEC 18004). ANQR menjana kod QR patuh standard yang berfungsi dengan mana-mana aplikasi pembaca QR atau peranti.`
      ]
    },
    {
      heading: 'Notis jenama dagang',
      paragraphs: [
        `QR Code® adalah jenama dagang berdaftar DENSO WAVE INCORPORATED. ANQR adalah alat bebas dan tidak berkaitan, disokong atau disponsori oleh DENSO WAVE INCORPORATED.`
      ]
    },
    {
      heading: 'Maklum balas dan sumbangan',
      paragraphs: [
        `Kami mengalu-alukan maklum balas, laporan bug dan cadangan ciri. Sila gunakan halaman Hubungi untuk berhubung. Kami membaca setiap mesej, walaupun masa respons mungkin berbeza.`
      ]
    }
  ]
};

export default about;
