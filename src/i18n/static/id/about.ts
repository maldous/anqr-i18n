import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Tentang ANQR',
  description: 'ANQR adalah generator kode QR gratis yang berjalan sepenuhnya di perangkat Anda - tidak memerlukan akun.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Apa itu ANQR?',
      paragraphs: [
        'ANQR (diucapkan anchor) adalah generator kode QR gratis yang berjalan secara lokal di perangkat Anda dan membuat kode yang dapat dipindai untuk URL, teks, kredensial Wi-Fi, kartu kontak, acara kalender, dan banyak lagi.',
        'Aplikasi ini dirancang untuk individu, usaha kecil, pemasar, dan pengembang yang menginginkan alat QR yang canggih tanpa perlu mengunggah file atau mendaftar. Data Anda tetap berada di perangkat Anda.',
      ],
    },
    {
      heading: 'Fitur-fitur utama',
      bullets: [
        'Hasilkan kode QR secara instan di perangkat Anda - tanpa unggahan server, tanpa perlu akun.',
        'Sesuaikan warna, gaya modul, pola pencari, dan tambahkan lapisan gambar.',
        'Ekspor dalam berbagai format: PNG, SVG, WebP, dan GIF animasi.',
        'Kontrol lanjutan untuk tingkat koreksi kesalahan, versi QR, mode pengkodean, dan pemilihan mask.',
        'Panduan keamanan pemindaian dan pratinjau langsung untuk membantu menjaga agar kode tetap mudah dibaca dalam bentuk cetak dan di layar.',
        'Berfungsi secara offline setelah dimuat - ini adalah aplikasi web statis yang dapat Anda jalankan di mana saja.',
      ],
    },
    {
      heading: 'Cara kerja ANQR',
      paragraphs: [
        'ANQR berjalan di peramban Anda dan mengkodekan input Anda ke dalam matriks QR standar dengan koreksi kesalahan Reed–Solomon, lalu menampilkannya dalam format yang Anda pilih.',
        'Semua proses pembuatan terjadi secara lokal. Saat Anda menambahkan overlay atau animasi, ANQR menyeimbangkan penataan gaya dengan keandalan pemindaian sehingga hasilnya tetap dapat dipindai.',
        'ANQR berfokus pada kode statis (data berada di dalam QR). Jika Anda memerlukan kode dinamis (tujuan yang dapat diedit), Anda dapat mengkodekan URL pengalihan atau tautan pendek Anda sendiri.',
      ],
    },
    {
      heading: 'Siapa yang mengoperasikan ANQR?',
      paragraphs: [
        'ANQR dioperasikan sebagai alat web independen. Untuk pertanyaan, dukungan, atau pertanyaan bisnis, silakan gunakan halaman Kontak atau email.' + CONTACT_EMAIL + '.',
      ],
    },
    {
      heading: 'Periklanan dan bagaimana kita tetap bebas',
      paragraphs: [
        'ANQR gratis untuk digunakan dan didukung oleh iklan. Kami dapat menampilkan iklan melalui Google AdSense dan/atau mitra periklanan lainnya.',
        'Penyedia iklan dapat menggunakan cookie atau teknologi serupa untuk mempersonalisasi iklan berdasarkan minat dan aktivitas penjelajahan Anda. Anda dapat mengelola preferensi iklan di pengaturan perangkat Anda dan melalui pengaturan iklan Google, dan mempelajari lebih lanjut di Kebijakan Privasi kami.',
        'Kami tidak menjual konten yang Anda encode ke dalam kode QR. Iklan membantu menutupi biaya pengoperasian dan peningkatan proyek.',
      ],
    },
    {
      heading: 'Standar terbuka',
      paragraphs: [
        'ANQR menghasilkan kode QR berdasarkan standar ISO/IEC 18004 dan bertujuan untuk kompatibilitas luas di berbagai pemindai, kamera, dan alur kerja pencetakan.',
      ],
    },
    {
      heading: 'Pemberitahuan merek dagang',
      paragraphs: [
        'QR Code® adalah merek dagang terdaftar dari DENSO WAVE INCORPORATED. ANQR tidak berafiliasi dengan, didukung oleh, atau disponsori oleh DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Umpan balik dan kontribusi',
      paragraphs: [
        'Kami menerima masukan, laporan bug, dan saran fitur. Silakan hubungi kami melalui email atau halaman kontak - kami membaca setiap pesan, meskipun waktu respons dapat bervariasi.',
      ],
    },
  ],
};

export default about;
