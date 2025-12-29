import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Panduan Pengguna ANQR',
  description: 'Panduan lengkap menggunakan ANQR untuk membuat kode QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Memulai',
      paragraphs: [
        'ANQR adalah generator kode QR yang berjalan sepenuhnya di perangkat Anda — komputer, ponsel, atau tablet Anda. Tidak diperlukan akun, tidak ada server yang terlibat, dan data Anda tetap terjaga kerahasiaannya.',
        'Antarmuka ini memiliki tiga level antarmuka: Dasar, Lanjutan, dan Profesional. Pilih level Anda menggunakan tab di header. Setiap level membuka fitur tambahan sambil tetap memfokuskan antarmuka pada apa yang Anda butuhkan.',
      ],
      bullets: [
        'Dasar: Pembuatan kode QR sederhana dengan konten teks/URL biasa dan overlay gambar.',
        'Lanjutan: Opsi pengkodean QR, gaya rendering, animasi, format output, tipe konten yang diperluas, dan penyesuaian overlay.',
        'Profesional: Tanda air, metadata, berbagi, analisis keamanan, kode QR pembayaran, dan fitur perusahaan.',
      ],
    },
    {
      heading: 'Panduan Cepat',
      paragraphs: [
        'Untuk membuat kode QR pertama Anda:',
      ],
      bullets: [
        '1. Pilih tipe konten (URL, teks, WiFi, dll.) dari menu tarik-turun Tipe Konten.',
        '2. Masukkan data Anda di kolom yang disediakan.',
        '3. Secara opsional, sesuaikan warna, gaya, dan tambahkan gambar overlay.',
        '4. Klik Ekspor untuk mengunduh kode QR Anda sebagai PNG, GIF, WebP, atau SVG.',
      ],
    },
    {
      heading: 'Fitur Dasar',
      paragraphs: [
        'Tingkat Dasar menyediakan antarmuka yang disederhanakan untuk membuat kode QR dengan konten muatan dan lapisan gambar. Ini adalah cara paling sederhana untuk memulai.',
      ],
    },
    {
      heading: 'Jenis Konten (Dasar)',
      paragraphs: [
        'Teks Biasa: Mengenkode teks apa pun hingga batas kapasitas kode QR. Ideal untuk pesan singkat, kode, atau pengenal.',
        'URL: Mengenkode alamat web. Kode QR akan membuka URL saat dipindai. Mendukung protokol http:// dan https://.',
      ],
    },
    {
      heading: 'Overlay Gambar (Dasar)',
      paragraphs: [
        'Unggah gambar (JPG, PNG, GIF, WebP) untuk dipadukan dengan kode QR Anda. Fitur overlay dasar meliputi:',
      ],
      bullets: [
        'Unggah dari file: Pilih gambar dari perangkat Anda.',
        'Muat dari URL: Masukkan URL gambar (harus mengizinkan CORS).',
        'Logo Tengah: Menempatkan gambar di tengah, mengandalkan koreksi kesalahan.',
        'Blend: Pencampuran alpha sederhana dari gambar dengan pola QR.',
        'Intensitas: Mengontrol seberapa kuat overlay memengaruhi kode QR (0-100%).',
        'Mode Warna: Warna Penuh, Skala Abu-abu, atau Hitam Putih.',
        'Pertahankan Pola Pencari: Menjaga pola sudut tetap tidak berubah untuk pemindaian yang andal.',
      ],
    },
    {
      heading: 'Fitur Lanjutan',
      paragraphs: [
        'Level Lanjutan membuka opsi pengkodean QR, gaya rendering, animasi, format output, jenis konten yang diperluas, dan kustomisasi overlay tingkat lanjut.',
      ],
    },
    {
      heading: 'Pengaturan Pengkodean QR',
      paragraphs: [
        'Versi: Kode QR tersedia dalam versi 1-40, dengan versi yang lebih tinggi menyimpan lebih banyak data tetapi ukurannya lebih besar. Atur ke 0 (Otomatis) agar ANQR memilih versi terkecil yang sesuai dengan konten Anda.',
        'Koreksi Kesalahan: Menentukan seberapa besar kerusakan yang dapat ditahan oleh kode QR agar tetap dapat dipindai.',
      ],
      bullets: [
        'L (Rendah): Koreksi kesalahan 7% - ukuran terkecil, redundansi paling sedikit.',
        'M (Sedang): Koreksi kesalahan 15% - opsi seimbang.',
        'Q (Kuartil): Koreksi kesalahan 25% - cocok untuk kode cetak.',
        'H (Tinggi): Koreksi kesalahan 30% - terbaik untuk kode dengan lapisan tambahan atau dalam kondisi sulit.',
      ],
    },
    {
      heading: 'Zona Tenang (Margin)',
      paragraphs: [
        'Zona tenang adalah ruang kosong di sekitar kode QR. Pemindai membutuhkan margin ini untuk mendeteksi di mana kode dimulai. Standar merekomendasikan setidaknya 4 modul. Mengurangi di bawah 4 dapat menyebabkan masalah pemindaian.',
      ],
    },
    {
      heading: 'Gaya Modul',
      paragraphs: [
        'Modul adalah kotak-kotak individual yang membentuk kode QR. ANQR menawarkan lima gaya:',
      ],
      bullets: [
        'Kotak: Tampilan QR klasik dengan sudut tajam.',
        'Membulat: Sudut yang diperhalus untuk tampilan yang lebih ramah.',
        'Titik: Modul melingkar untuk estetika modern.',
        'Berlian: Kotak yang diputar 45° untuk pola yang khas.',
        'Terhubung: Modul-modul menyatu ketika berdekatan, menciptakan bentuk-bentuk organik.',
      ],
    },
    {
      heading: 'Gaya Pola Pencari',
      paragraphs: [
        'Pola pencari adalah tiga persegi besar di sudut QR yang membantu pemindai mengorientasikan kode. Gaya yang tersedia:',
      ],
      bullets: [
        'Persegi: Sudut persegi standar.',
        'Membulat: Sudut yang diperhalus sesuai dengan gaya modul membulat.',
        'Lingkaran: Pola pencari melingkar untuk kode gaya titik.',
      ],
    },
    {
      heading: 'Pola Penyelarasan & Pengaturan Waktu',
      paragraphs: [
        'Pola penyelarasan muncul dalam kode QR yang lebih besar (versi 2+) untuk membantu mengoreksi distorsi. Pola pengaturan waktu adalah garis-garis bergantian yang menghubungkan pola pencari.',
      ],
      bullets: [
        'Gaya Penyelarasan: Pencari Kecocokan, Persegi, Bulat, atau Lingkaran.',
        'Gaya Pengaturan Waktu: Modul Pencocokan, Garis Padat, atau Garis Putus-putus.',
      ],
    },
    {
      heading: 'Warna',
      paragraphs: [
        'Latar depan: Warna modul QR. Hitam (#000000) adalah standar, tetapi warna gelap apa pun bisa digunakan.',
        'Latar Belakang: Warna latar belakang. Putih (#ffffff) adalah standar. Pastikan kontras yang cukup dengan latar depan.',
        'Latar Belakang Transparan: Hilangkan seluruh latar belakang untuk digunakan pada permukaan berwarna. Pastikan permukaan tersebut memberikan kontras yang memadai.',
      ],
    },
    {
      heading: 'Ukuran & Celah Modul',
      paragraphs: [
        'Ukuran Modul: Mengontrol seberapa besar setiap modul ditampilkan dalam piksel. Nilai yang lebih besar menghasilkan kode yang lebih besar dan lebih mudah dipindai.',
        'Jarak Modul: Menambahkan ruang antar modul dalam persentase. Jarak kecil (5-15%) dapat meningkatkan kemampuan pemindaian dalam beberapa kondisi, tetapi jarak yang berlebihan mengurangi keandalan.',
      ],
    },
    {
      heading: 'Pengaturan Keluaran',
      paragraphs: [
        'Format: Pilih format ekspor Anda berdasarkan kasus penggunaan.',
      ],
      bullets: [
        'PNG: Format raster tanpa kehilangan data, ideal untuk sebagian besar penggunaan. Terbaik untuk cetak dan digital.',
        'WebP: Format modern dengan ukuran file lebih kecil. Cocok untuk penggunaan web.',
        'GIF: Diperlukan untuk kode QR animasi. Mendukung transparansi.',
        'SVG: Format vektor yang dapat diskalakan tanpa batas. Terbaik untuk cetakan besar atau saat Anda perlu mengedit kode.',
      ],
    },
    {
      heading: 'Dimensi Keluaran',
      paragraphs: [
        'Lebar/Tinggi: Atur ukuran output dalam piksel. Untuk pencetakan, hitung berdasarkan DPI (misalnya, 300 DPI pada 1 inci = 300px). Ukuran yang lebih besar dipindai lebih andal dari jarak jauh.',
      ],
    },
    {
      heading: 'Pengaturan Animasi (Lanjutan)',
      paragraphs: [
        'Mengontrol perilaku kode QR animasi:',
      ],
      bullets: [
        'Kecepatan: Laju bingkai animasi dalam milidetik.',
        'Loop: Animasi berkelanjutan atau sekali putar.',
        'Bounce: Arah animasi pingpong.',
        'Bingkai Awal: Memulai animasi dari bingkai tertentu.',
        'Bingkai Maksimum: Batasi total bingkai dalam animasi.',
        'Langkah Bingkai: Lewati bingkai untuk animasi yang lebih cepat.',
        'Interpolasi: Tidak ada, Crossfade, atau Morph antar frame.',
      ],
    },
    {
      heading: 'Jenis Konten (Lanjutan)',
      paragraphs: [
        'Level lanjutan membuka format muatan tambahan:',
      ],
      bullets: [
        'Nomor Telepon (tel:): Membuat tautan telepon yang dapat dihubungi.',
        'Email (mailto:): Membuka klien email dengan subjek dan isi opsional.',
        'SMS: Pesan teks yang sudah diisi sebelumnya ke nomor telepon.',
        'vCard: Kartu kontak lengkap dengan nama, organisasi, telepon, email, alamat.',
        'MeCard: Format kontak ringkas yang populer di Jepang.',
        'BizCard: Format kartu nama lama.',
        'Lokasi Geografis: Koordinat GPS yang terbuka di peta.',
        'WiFi: Kredensial jaringan untuk koneksi otomatis (SSID, kata sandi, jenis keamanan).',
        'Acara Kalender: Format iCalendar dengan judul, lokasi, tanggal/waktu.',
        'Konfirmasi Kehadiran Acara: Tautan ke halaman pendaftaran acara.',
        'Berlangganan Kalender: Berlangganan umpan ICS/WebCal.',
        'URL File/Dokumen: Tautan langsung ke file yang dapat diunduh.',
        'Tautan Penyimpanan Cloud: Tautan ke Google Drive, Dropbox, OneDrive, dll.',
        'Profil Sosial: Tautan ke LinkedIn, Twitter, Instagram, dll.',
        'Tautan Pesan: Tautan mendalam WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'Fitur Overlay Tingkat Lanjut',
      paragraphs: [
        'Kemampuan overlay tambahan:',
      ],
      bullets: [
        'Pangkas: Aktifkan pemangkasan untuk memilih area persegi pada gambar Anda.',
        'Halftone: Pola titik bergaya cetak klasik berdasarkan kecerahan gambar.',
        'Dithered: Dithering difusi kesalahan untuk reproduksi detail.',
      ],
    },
    {
      heading: 'Mode Pencampuran Overlay (Lanjutan)',
      paragraphs: [
        'Mode pencampuran tambahan di tingkat Lanjutan:',
      ],
      bullets: [
        'Subpiksel: Membagi setiap modul menjadi subpiksel untuk detail yang lebih tinggi.',
        'Blue Noise: Menggunakan dithering blue noise untuk pola bebas artefak.',
        'Mosaik: Efek berbasis ubin yang mempertahankan struktur gambar.',
        'Pengisian Celah: Menempatkan gambar di celah antara modul.',
        'Kecerahan: Mengubah ukuran modul berdasarkan kecerahan gambar.',
        'Duotone: Memetakan gambar ke dua warna untuk kontras yang mencolok.',
      ],
    },
    {
      heading: 'Intensitas Hamparan',
      paragraphs: [
        'Mengontrol seberapa kuat overlay memengaruhi kode QR (0-100%). Nilai yang lebih tinggi menunjukkan detail gambar yang lebih banyak tetapi dapat mengurangi kemampuan pemindaian. Mulailah sekitar 70% dan sesuaikan berdasarkan pengujian.',
      ],
    },
    {
      heading: 'Mode Warna',
      paragraphs: [
        'Bagaimana gambar overlay diproses:',
      ],
      bullets: [
        'Warna Penuh: Mempertahankan warna gambar asli.',
        'Skala abu-abu: Mengonversi ke nada hitam dan putih.',
        'Hitam & Putih: Konversi biner kontras tinggi.',
      ],
    },
    {
      heading: 'Pertahankan Pola Pencari',
      paragraphs: [
        'Saat diaktifkan, pola pencari tiga sudut tetap tidak dimodifikasi oleh lapisan tambahan. Sangat direkomendasikan untuk pemindaian yang andal.',
      ],
    },
    {
      heading: 'Praproses Gambar',
      paragraphs: [
        'Terapkan filter pada gambar overlay Anda sebelum melakukan blending. Penyesuaian ini dapat meningkatkan tampilan gambar pada kode QR akhir.',
      ],
      bullets: [
        'Kecerahan (-100 hingga +100): Mencerahkan atau menggelapkan gambar.',
        'Kontras (-100 hingga +100): Meningkatkan atau mengurangi rentang nada.',
        'Gamma (0,2 hingga 3,0): Penyesuaian kecerahan non-linier. Nilai di bawah 1 mencerahkan nada tengah, di atas 1 menggelapkannya.',
        'Saturasi (-100 hingga +100): Intensitas warna. -100 adalah skala abu-abu, +100 adalah jenuh berlebihan.',
        'Rotasi Warna (0-360°): Menggeser semua warna di sekitar roda warna.',
        'Buram (0-20px): Melembutkan detail gambar.',
        'Pertajam (0-100%): Tingkatkan tepi dan detail.',
        'Posterisasi (0-16 level): Kurangi level warna untuk efek poster.',
        'Ambang Batas (0-255): Konversi ke biner hitam/putih pada titik batas.',
        'Deteksi Tepi: Algoritma Sobel atau Canny untuk hanya menampilkan tepi.',
        'Invert: Membalikkan semua warna.',
      ],
    },
    {
      heading: 'Mode Kebugaran',
      paragraphs: [
        'Bagaimana gambar overlay sesuai dengan area kode QR:',
      ],
      bullets: [
        'Sampul: Gambar memenuhi seluruh area, dipotong jika perlu.',
        'Berisi: Seluruh gambar terlihat, mungkin memiliki margin.',
        'Regangkan: Gambar terdistorsi untuk mengisi secara tepat.',
      ],
    },
    {
      heading: 'Opsi Transformasi',
      paragraphs: [
        'Rotasi: Putar overlay dalam kelipatan 90°.',
        'Balik X/Y: Cerminkan gambar secara horizontal atau vertikal.',
      ],
    },
    {
      heading: 'Algoritma Dithering',
      paragraphs: [
        'Dithering mengubah gambar nada kontinu menjadi pola yang dapat diwakili oleh kode QR. Tersedia saat menggunakan mode pencampuran Dithered, Blue Noise, atau True Dither.',
      ],
      bullets: [
        'Penyebaran Kesalahan: Gaya Floyd-Steinberg klasik. Menyebarkan kesalahan kuantisasi ke piksel tetangga.',
        'Terurut (Bayer): Menggunakan matriks ambang batas untuk pola reguler.',
        'Titik Berkelompok: Mensimulasikan pencetakan halftone.',
        'Void & Cluster: Pengacakan terurut yang dioptimalkan.',
        'Blue Noise: Pola acak yang tampak menyenangkan secara visual.',
        'Ambang Batas Derau Biru: Dithering ambang batas dengan tekstur derau biru.',
        'Kebisingan Putih: Pengacakan ambang batas acak.',
        'Derau Gaussian/Segitiga: Derau dengan distribusi yang berbeda.',
        'Blue Noise + Error Diffusion: Hybrid yang menggabungkan kedua teknik.',
        'Derau Biru yang Disaring: Pola derau biru seperti layar.',
        'Persepsi: Diberi bobot berdasarkan luminansi untuk hasil visual yang lebih baik.',
        'Edge-Aware: Mempertahankan tepi gambar selama proses dithering.',
        'Ambang Batas Adaptif: Penentuan ambang batas adaptif secara lokal.',
        'Temporal Blue Noise: Untuk GIF animasi, pola bervariasi per bingkai.',
      ],
    },
    {
      heading: 'Inti Difusi',
      paragraphs: [
        'Saat menggunakan dithering Difusi Kesalahan, pilih bagaimana kesalahan didistribusikan:',
      ],
      bullets: [
        'Floyd-Steinberg: Difusi 4-tetangga klasik. Pilihan umum yang baik.',
        'Jarvis-Judice-Ninke: 12 tetangga, lebih halus tetapi lebih lambat.',
        'Stucki: Mirip dengan JJN dengan bobot berbeda.',
        'Burkes: JJN yang disederhanakan, lebih cepat.',
        'Sierra: Keluarga kernel yang menyeimbangkan kualitas dan kecepatan.',
        'Atkinson: Difusi cahaya, mempertahankan detail tetapi bisa menghasilkan gambar yang buram.',
      ],
    },
    {
      heading: 'Kekuatan Dither',
      paragraphs: [
        'Mengontrol seberapa banyak dithering diterapkan (0-100%). Nilai yang lebih rendah mempertahankan lebih banyak pola asli, nilai yang lebih tinggi menampilkan lebih banyak detail gambar.',
      ],
    },
    {
      heading: 'Pengaturan Subpiksel',
      paragraphs: [
        'Saat menggunakan mode pencampuran Subpiksel:',
      ],
      bullets: [
        'Ukuran Grid: 2×2, 3×3, atau 4×4 subpiksel per modul. Semakin tinggi = semakin detail.',
        'Aturan Tengah: Ketat mengharuskan subpiksel tengah sesuai dengan modul. Tengah Halftone memungkinkan variasi.',
        'Warna Netral: Warna yang digunakan untuk subpiksel yang tidak ditentukan.',
        'Penggantian Finder: Cara pola finder ditampilkan (Padat atau Bergaya).',
      ],
    },
    {
      heading: 'Pengaturan Halftone',
      paragraphs: [
        'Saat menggunakan mode pencampuran Halftone:',
      ],
      bullets: [
        'Ukuran Sel: Per Modul atau kisi N×N.',
        'Bentuk Titik: Lingkaran, Persegi, atau Garis.',
        'Kurva Kecerahan: Linier, Kurva S, atau Gamma.',
      ],
    },
    {
      heading: 'Warna Duotone',
      paragraphs: [
        'Saat menggunakan mode pencampuran Duotone, atur warna Bayangan (area gelap) dan warna Sorotan (area terang).',
      ],
    },
    {
      heading: 'Pengaturan Animasi GIF',
      paragraphs: [
        'Saat menggunakan overlay GIF animasi:',
      ],
      bullets: [
        'Gunakan Penundaan Bingkai: Hormati pengaturan waktu GIF asli.',
        'FPS Maksimum: Batasi kecepatan bingkai (1-60 fps).',
        'Penanganan Pembuangan: Hormati atau Sederhanakan metode pembuangan bingkai.',
      ],
    },
    {
      heading: 'Opsi Rendering Tingkat Lanjut',
      paragraphs: [
        'Kontrol rendering tambahan:',
      ],
      bullets: [
        'Mode Jarak: Tidak Ada, Sisipan, Garis Luar, atau Penataan jarak Ruang Negatif.',
        'Radius Sudut: Persentase sudut membulat untuk modul.',
        'Gradien: Tidak ada, gradien linier, radial, atau kerucut pada modul.',
        'Gaya Luar/Dalam Mata: Penataan gaya independen untuk cincin pola pencari.',
        'Rotasi Titik: Putar modul berlian/titik.',
        'Skala Mata: Penyesuaian ukuran untuk pola pencari.',
        'Gaya Bingkai: Tambahkan bingkai dekoratif (Bingkai Bulat, Stiker, Label).',
        'Teks Bingkai: Tambahkan teks seperti Pindai Saya! ke bingkai.',
      ],
    },
    {
      heading: 'Pengkodean QR Tingkat Lanjut',
      paragraphs: [
        'Penyempurnaan pengkodean QR:',
      ],
      bullets: [
        'Mode Pengkodean: Otomatis, Numerik, Alfanumerik, Byte/UTF-8, atau Kanji.',
        'Terapkan Zona Tenang Minimum: Pastikan margin minimal 4 modul.',
      ],
    },
    {
      heading: 'Opsi Output Lanjutan',
      paragraphs: [
        'Pengaturan ekspor tambahan:',
      ],
      bullets: [
        'Nama berkas: Nama berkas khusus untuk unduhan.',
        'Ukuran Palet GIF: 2-256 warna dalam output GIF.',
        'GIF Quantizer: Pengurangan warna Median Cut, NeuQuant, atau Octree.',
        'GIF Dithering: Mati, Floyd-Steinberg, atau Diperintahkan.',
        'GIF Warna Transparan: Atur warna agar transparan.',
        'SVG True Vector: Gunakan jalur alih-alih raster yang disematkan.',
        'Ketepatan Bentuk SVG: Rendering Piksel atau Jalur Presisi.',
        'SVG Embed Raster Overlay: Sertakan overlay sebagai gambar yang disematkan.',
        'Penggantian Latar Belakang: Memaksa warna latar belakang tertentu pada output.',
      ],
    },
    {
      heading: 'Opsi Validasi',
      paragraphs: [
        'Pengaturan pemrosesan input:',
      ],
      bullets: [
        'Validasi Input: Periksa format konten sebelum pengkodean.',
        'Rampingkan Spasi: Hapus spasi di awal/akhir.',
        'Normalisasi Baris Baru: Ubah semua akhiran baris menjadi LF.',
        'Pelindung Panjang Maksimum: Beri peringatan jika konten melebihi kapasitas QR.',
      ],
    },
    {
      heading: 'Fitur Profesional',
      paragraphs: [
        'Level Profesional menambahkan tanda air, metadata, opsi berbagi, analisis keamanan, kode QR pembayaran, dan fitur perusahaan.',
      ],
    },
    {
      heading: 'Tanda Air',
      paragraphs: [
        'Tambahkan tanda air ke kode QR Anda:',
      ],
      bullets: [
        'Jenis: Tanda air berupa teks, gambar, atau pola.',
        'Posisi: Tengah, Sudut, Tepi, Belakang, atau Zona Tenang.',
        'Opasitas: Transparansi tanda air (0-100%).',
        'Mode Pencampuran: Pencampuran Normal, Multiply, Screen, atau Overlay.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: [
        'Sematkan metadata dalam file yang diekspor:',
      ],
      bullets: [
        'Kolom Judul, Penulis, Hak Cipta, Lisensi, Deskripsi.',
        'Waktu Pembuatan: Sematkan stempel waktu pembuatan.',
        'Kunci-Nilai Kustom: Tambahkan pasangan metadata sembarang.',
      ],
    },
    {
      heading: 'Berbagi',
      paragraphs: [
        'Bagikan konfigurasi kode QR Anda:',
      ],
      bullets: [
        'Tautan Langsung: Hasilkan URL yang dapat dibagikan dengan pengaturan Anda saat ini.',
        'Sematkan HTML: Dapatkan kode sematan untuk situs web.',
        'Parameter Enkripsi: Sertakan semua pengaturan dalam URL berbagi.',
        'Catatan: Gambar overlay dari file lokal tidak dapat dibagikan melalui URL.',
      ],
    },
    {
      heading: 'Analisis Keselamatan',
      paragraphs: [
        'Pastikan kode QR tetap dapat dipindai:',
      ],
      bullets: [
        'Mode Keamanan: Mati, Seimbang, atau Persyaratan pemindaian ketat.',
        'Ukuran Modul Minimum: Ukuran piksel minimum per modul.',
        'Zona Tenang Minimum: Modul margin minimum.',
        'Pencari Kunci/Pengaturan Waktu/Penyelarasan/Format/Versi: Lindungi elemen tertentu.',
        'Intensitas Overlay Maksimum berdasarkan ECC: Batasan intensitas otomatis berdasarkan tingkat koreksi kesalahan.',
      ],
    },
    {
      heading: 'Jenis Konten (Profesional)',
      paragraphs: [
        'Level profesional menambahkan jenis konten pembayaran dan perusahaan:',
      ],
      bullets: [
        'EPC/SEPA (EU): Kode QR transfer bank Eropa dengan IBAN, BIC, jumlah, referensi.',
        'UPI (India): Antarmuka Pembayaran Terpadu dengan VPA, nama penerima pembayaran, jumlah.',
        'PayNow (Singapura): Pembayaran cepat Singapura dengan UEN atau nomor ponsel.',
        'PromptPay (Thailand): Sistem pembayaran nasional Thailand.',
        'PIX (Brasil): Pembayaran instan Brasil dengan kunci PIX.',
        'Kripto: Alamat pembayaran Bitcoin, Ethereum, Litecoin dengan jumlah opsional.',
        'Tautan Kampanye Pemasaran: URL dengan pelacakan parameter UTM lengkap (Tag Pemasaran).',
        'Tautan Pendek: Untuk digunakan dengan pemendek URL untuk kode QR dinamis/yang dapat dilacak.',
        'GS1 Digital Link: Identifikasi produk dengan GTIN, nomor seri, batch, tanggal kedaluwarsa.',
        'App Deep Link: Deep link aplikasi iOS/Android dengan skema khusus.',
        'Format Kustom: Data mentah tanpa format atau validasi.',
      ],
    },
    {
      heading: 'Mode Pencampuran Overlay (Profesional)',
      paragraphs: [
        'Mode pencampuran tambahan di tingkat Profesional:',
      ],
      bullets: [
        'Pixelate: Efek overlay pikselasi.',
        'Garis Besar: Hamparan deteksi tepi yang hanya menampilkan kontur.',
        'Gelombang: Efek distorsi bergelombang.',
        'Ukuran Subpiksel: Ukuran subpiksel variabel berdasarkan gambar.',
        'True Dither: Dithering tingkat lanjut dengan pemilihan matriks terurut.',
        'Ekstrem: Visibilitas gambar maksimum, dapat memengaruhi kemampuan pemindaian.',
      ],
    },
    {
      heading: 'Pengaturan Perlindungan',
      paragraphs: [
        'Kontrol terperinci atas elemen QR mana yang dilindungi dari modifikasi overlay:',
      ],
      bullets: [
        'Pertahankan Pengaturan Waktu: Biarkan pola pengaturan waktu tidak berubah.',
        'Pertahankan Keselarasan: Biarkan pola keselarasan tidak dimodifikasi.',
        'Lindungi Info Format: Modul informasi format terlindungi.',
        'Lindungi Info Versi: Modul informasi versi Shield.',
      ],
    },
    {
      heading: 'Mode yang Mendukung ECC',
      paragraphs: [
        'Mendistribusikan intensitas overlay secara cerdas berdasarkan kapasitas koreksi kesalahan. Sistem menganalisis modul mana yang dapat dimodifikasi sambil mempertahankan kemampuan pemindaian.',
      ],
      bullets: [
        'Anggaran Risiko: Persentase kapasitas koreksi kesalahan yang akan digunakan (0-100%).',
        'Anggaran lebih tinggi = lapisan overlay lebih terlihat tetapi kemampuan pemindaian lebih berisiko.',
        'Anggaran lebih rendah = pemindaian lebih aman tetapi lapisan tumpang tindih kurang terlihat.',
      ],
    },
    {
      heading: 'Opsi Rendering Profesional',
      paragraphs: [
        'Kontrol rendering tingkat lanjut:',
      ],
      bullets: [
        'Tepi Tajam: Gunakan rendering gambar berpiksel untuk tepi modul yang tajam.',
        'Pixel Snap: Penyelarasan piksel Lantai, Bulat, atau Langit-langit.',
        'Mode Warna Per Modul: Solid, Berdasarkan Kecerahan, Berdasarkan Posisi, Berdasarkan Tumpang Tindih, Berdasarkan Kluster.',
        'Palet Warna: Tentukan palet warna khusus untuk pewarnaan per modul.',
        'Contrast Guard: Memastikan rasio kontras minimum antar warna.',
        'Rasio Kontras Minimum: Persyaratan kontras gaya WCAG (1:1 hingga 21:1).',
        'Modul Perbatasan Tambahan: Perbatasan tambahan di luar zona tenang.',
      ],
    },
    {
      heading: 'Opsi Output Profesional',
      paragraphs: [
        'Pengaturan ekspor perusahaan:',
      ],
      bullets: [
        'DPI: Atur resolusi cetak (72-600 DPI). 300 DPI direkomendasikan untuk pencetakan.',
        'Sertakan Zona Tenang: Aktifkan/nonaktifkan zona tenang pada dimensi output.',
        'Ekspor Sebagai Tambahan: Hasilkan PDF bersamaan dengan format utama.',
      ],
    },
    {
      heading: 'Pengaturan Animasi (Profesional)',
      paragraphs: [
        'Fitur animasi profesional tambahan:',
      ],
      bullets: [
        'Dither Temporal: Mati, Derau Biru, atau Dither per-frame Aman dari Kedipan.',
        'Pola: Tidak ada, Pulsa, Gelombang, Garis Pindai, Kilauan, atau efek Melayang.',
      ],
    },
    {
      heading: 'Praktik Terbaik',
      paragraphs: [
        'Ikuti panduan ini untuk kode QR yang andal:',
      ],
      bullets: [
        'Selalu uji kode QR Anda dengan beberapa aplikasi pemindai sebelum mencetak.',
        'Gunakan Koreksi Kesalahan H (Tinggi) saat menambahkan overlay.',
        'Pertahankan setidaknya 4 modul zona tenang (margin).',
        'Pastikan kontras yang tinggi antara latar depan dan latar belakang.',
        'Untuk pencetakan, gunakan setidaknya 300 DPI dan uji pada ukuran cetak sebenarnya.',
        'Aktifkan opsi Pertahankan Pola Finder saat menggunakan overlay.',
        'Mulailah dengan intensitas overlay yang lebih rendah dan tingkatkan secara bertahap.',
        'Untuk penggunaan di luar ruangan, pertimbangkan ukuran modul yang lebih besar dan koreksi kesalahan yang lebih tinggi.',
      ],
    },
    {
      heading: 'Penyelesaian Masalah',
      paragraphs: [
        'Masalah umum dan solusinya:',
      ],
      bullets: [
        'QR tidak dapat memindai: Kurangi intensitas overlay, tingkatkan koreksi kesalahan, periksa kontras.',
        'Kode terlalu panjang: Kurangi panjang konten, gunakan pemendek URL, turunkan versi.',
        'Hasil buram: Perbesar ukuran modul, gunakan PNG sebagai pengganti format terkompresi.',
        'Warna terlihat salah: Periksa kontras warna, coba mode overlay skala abu-abu.',
        'GIF tidak beranimasi: Pastikan menggunakan format output GIF, periksa jumlah frame.',
        'Overlay gambar tidak dimuat: Periksa izin CORS pada gambar jarak jauh.',
      ],
    },
    {
      heading: 'Pintasan Keyboard',
      paragraphs: [
        'ANQR mendukung pintasan keyboard standar. Gunakan Ctrl/Cmd+S untuk memicu ekspor (saat fokus pada pratinjau).',
      ],
    },
    {
      heading: 'Berbagi & Menyematkan',
      paragraphs: [
        'Dalam mode Profesional, klik tombol Bagikan untuk menyalin URL dengan pengaturan Anda saat ini. Penerima dapat membuka URL ini untuk melihat konfigurasi Anda yang persis sama. Catatan: Gambar overlay dari file lokal tidak dapat dibagikan melalui URL.',
      ],
    },
  ],
};

export default docs;
