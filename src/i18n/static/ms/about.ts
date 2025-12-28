import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Perihal ANQR',
  description: 'ANQR ialah penjana kod QR percuma yang berjalan sepenuhnya pada peranti anda — tiada akaun diperlukan.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Apakah ANQR?',
      paragraphs: [
        'ANQR (disebut "anchor") ialah penjana kod QR percuma yang berjalan secara tempatan pada peranti anda dan menghasilkan kod boleh imbas untuk URL, teks, kelayakan Wi-Fi, kad kenalan, acara kalendar dan banyak lagi.',
        'Ia dibina untuk individu, perniagaan kecil, pemasar dan pembangun yang mahukan alat QR yang berkuasa tanpa memuat naik fail atau mendaftar akaun. Data anda kekal pada peranti anda.',
      ],
    },
    {
      heading: 'Ciri-ciri utama',
      bullets: [
        'Jana kod QR serta-merta pada peranti anda — tiada muat naik ke pelayan, tiada akaun diperlukan.',
        'Sesuaikan warna, gaya modul, corak finder, dan tambah tindanan imej.',
        'Eksport dalam pelbagai format: PNG, SVG, WebP dan GIF beranimasi.',
        'Kawalan lanjutan untuk tahap pembetulan ralat, versi QR, mod pengekodan dan pemilihan mask.',
        'Panduan keselamatan imbasan dan pratonton langsung untuk memastikan kod mudah dibaca pada cetakan dan skrin.',
        'Berfungsi luar talian selepas dimuat — aplikasi web statik yang boleh dijalankan di mana-mana.',
      ],
    },
    {
      heading: 'Bagaimana ANQR berfungsi',
      paragraphs: [
        'ANQR berjalan dalam pelayar anda, mengekod input anda ke dalam matriks QR standard dengan pembetulan ralat Reed–Solomon, kemudian merender ke format yang anda pilih.',
        'Semua penjanaan berlaku secara tempatan. Apabila anda menambah tindanan atau animasi, ANQR mengimbangi gaya dengan kebolehimbasan supaya hasilnya kekal boleh diimbas.',
        'ANQR memfokuskan kod statik (data berada dalam QR). Jika anda perlukan kod dinamik (destinasi boleh diubah), anda boleh mengekod URL ubah hala atau pautan pendek anda sendiri.',
      ],
    },
    {
      heading: 'Siapa yang mengendalikan ANQR?',
      paragraphs: [
        'ANQR dikendalikan sebagai alat web bebas. Untuk soalan, sokongan atau pertanyaan perniagaan, sila gunakan halaman Hubungi atau e-mel ' + CONTACT_EMAIL + '.',
      ],
    },
    {
      heading: 'Iklan dan bagaimana kami kekal percuma',
      paragraphs: [
        'ANQR adalah percuma untuk digunakan dan disokong oleh pengiklanan. Kami mungkin memaparkan iklan melalui Google AdSense dan/atau rakan pengiklanan lain.',
        'Penyedia iklan mungkin menggunakan kuki atau teknologi serupa untuk memperibadikan iklan berdasarkan minat dan aktiviti pelayaran anda. Anda boleh mengurus pilihan iklan dalam tetapan peranti dan melalui tetapan iklan Google, serta membaca lebih lanjut dalam Dasar Privasi kami.',
        'Kami tidak menjual kandungan yang anda enkodkan ke dalam kod QR. Iklan membantu menampung kos menjalankan dan menambah baik projek ini.',
      ],
    },
    {
      heading: 'Piawaian terbuka',
      paragraphs: [
        'ANQR menjana kod QR berdasarkan piawaian ISO/IEC 18004 dan menyasarkan keserasian luas merentas pengimbas, kamera dan aliran kerja cetakan.',
      ],
    },
    {
      heading: 'Notis jenama dagang',
      paragraphs: [
        'QR Code® ialah jenama dagang berdaftar DENSO WAVE INCORPORATED. ANQR tidak bersekutu dengan, disokong oleh, atau disponsori oleh DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Maklum balas dan sumbangan',
      paragraphs: [
        'Kami mengalu-alukan maklum balas, laporan pepijat dan cadangan ciri. Sila hubungi kami melalui e-mel atau halaman Hubungi — kami membaca setiap mesej, walaupun masa respons mungkin berbeza.',
      ],
    },
  ],
};

export default about;
