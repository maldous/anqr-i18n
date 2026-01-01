import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Mengenai ANQR',
  description: 'ANQR ialah penjana kod QR percuma dengan pendekatan klien-dahulu — jana kod QR secara setempat atau gunakan API kami untuk penyematan.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Apakah itu ANQR?',
      paragraphs: ['ANQR (disebut anchor) ialah penjana kod QR percuma yang berjalan secara setempat pada peranti anda dan mencipta kod yang boleh diimbas untuk URL, teks, kelayakan Wi-Fi, kad kenalan, acara kalendar dan banyak lagi.', 'Ia dibina untuk individu, perniagaan kecil, pemasar dan pembangun yang mahukan alat QR yang berkuasa tanpa memuat naik fail atau mendaftar. Data anda kekal pada peranti anda.'],
    },
    {
      heading: 'Ciri-ciri utama',
      bullets: ['Jana kod QR serta-merta pada peranti anda — tiada muat naik pelayan, tiada akaun diperlukan.', 'Sesuaikan warna, gaya modul, corak pencari dan tambahkan tindanan imej.', 'Eksport dalam pelbagai format: PNG, SVG, WebP dan GIF animasi.', 'Kawalan lanjutan untuk tahap pembetulan ralat, versi QR, mod pengekodan dan pemilihan topeng.', 'Panduan keselamatan imbasan dan pratonton langsung untuk membantu memastikan kod boleh dibaca dalam bentuk cetakan dan pada skrin.', 'API sebelah pelayan untuk penyematan profesional dengan sokongan parameter penuh.', 'Berfungsi di luar talian setelah dimuatkan — ia merupakan aplikasi web statik yang boleh anda jalankan di mana-mana sahaja.'],
    },
    {
      heading: 'Bagaimana ANQR berfungsi',
      paragraphs: ['ANQR berjalan dalam pelayar anda dan mengekod input anda ke dalam matriks QR standard dengan pembetulan ralat Reed–Solomon, kemudian memaparkannya kepada format yang anda pilih.', 'Secara lalai, penjanaan berlaku secara setempat dalam pelayar anda. Untuk kegunaan profesional, anda juga boleh menggunakan API sebelah pelayan untuk menjana kod QR melalui parameter URL — sesuai untuk penyematan dalam laman web, e-mel atau aliran kerja automatik.', 'Semua penjanaan berlaku secara setempat. Apabila anda menambah tindanan atau animasi, ANQR mengimbangi penggayaan dengan kebolehpercayaan imbasan supaya hasilnya kekal boleh diimbas.', 'ANQR memberi tumpuan kepada kod statik (data berada di dalam QR). Jika anda memerlukan kod dinamik (destinasi yang boleh diedit), anda boleh mengekod URL pengalihan atau pautan pendek anda sendiri.'],
    },
    {
      heading: 'Siapa yang mengendalikan ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Pengiklanan dan bagaimana kita kekal bebas',
      paragraphs: ['ANQR adalah percuma untuk digunakan dan disokong oleh pengiklanan. Kami mungkin memaparkan iklan melalui Google AdSense dan/atau rakan kongsi pengiklanan lain.', 'Penyedia iklan mungkin menggunakan kuki atau teknologi serupa untuk memperibadikan iklan berdasarkan minat dan aktiviti penyemakan imbas anda. Anda boleh mengurus pilihan iklan dalam tetapan peranti anda dan melalui tetapan iklan Google, dan ketahui lebih lanjut dalam Dasar Privasi kami.', 'Kami tidak menjual kandungan yang anda kodkan ke dalam kod QR. Iklan membantu menampung kos pengendalian dan penambahbaikan projek.'],
    },
    {
      heading: 'Piawaian terbuka',
      paragraphs: ['ANQR menjana kod QR berdasarkan piawaian ISO/IEC 18004 dan bertujuan untuk keserasian yang meluas merentasi pengimbas, kamera dan aliran kerja cetakan.'],
    },
    {
      heading: 'Notis tanda dagangan',
      paragraphs: ['QR Code® ialah tanda dagangan berdaftar DENSO WAVE INCORPORATED. ANQR tidak bergabung dengan, disokong oleh, atau ditaja oleh DENSO WAVE INCORPORATED.'],
    },
    {
      heading: 'Maklum balas dan sumbangan',
      paragraphs: ['Kami mengalu-alukan maklum balas, laporan pepijat dan cadangan ciri. Sila hubungi kami melalui e-mel atau halaman hubungan — kami membaca setiap mesej, walaupun masa respons mungkin berbeza-beza.'],
    },
  ],
};

export default about;
