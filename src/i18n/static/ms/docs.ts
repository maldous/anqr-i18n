import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Panduan Pengguna ANQR',
  description: 'Panduan lengkap menggunakan ANQR untuk mencipta kod QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Bermula',
      paragraphs: [
        'ANQR ialah penjana kod QR yang berfungsi sepenuhnya pada peranti anda - komputer, telefon atau tablet anda. Tiada akaun diperlukan, tiada pelayan yang terlibat dan data anda kekal sulit.',
        'Antara muka ini mempunyai tiga tahap antara muka: Asas, Lanjutan dan Profesional. Pilih tahap anda menggunakan tab dalam pengepala. Setiap tahap membuka kunci ciri tambahan sambil memastikan antara muka tertumpu pada apa yang anda perlukan.',
      ],
      bullets: [
        'Asas: Penciptaan kod QR mudah dengan kandungan teks/URL biasa dan tindanan imej.',
        'Lanjutan: Pilihan pengekodan QR, gaya pemaparan, animasi, format output, jenis kandungan lanjutan dan penyesuaian tindanan.',
        'Profesional: Tera air, metadata, perkongsian, analisis keselamatan, kod QR pembayaran dan ciri perusahaan.',
      ],
    },
    {
      heading: 'Permulaan Pantas',
      paragraphs: [
        'Untuk mencipta kod QR pertama anda:',
      ],
      bullets: [
        '1. Pilih jenis kandungan (URL, teks, WiFi, dsb.) daripada menu lungsur turun Jenis Kandungan.',
        '2. Masukkan data anda dalam ruangan yang disediakan.',
        '3. Sesuaikan warna, gaya dan tambahkan imej tindanan secara pilihan.',
        '4. Klik Eksport untuk memuat turun kod QR anda sebagai PNG, GIF, WebP atau SVG.',
      ],
    },
    {
      heading: 'Ciri-ciri Asas',
      paragraphs: [
        'Tahap Asas menyediakan antara muka yang diperkemas untuk mencipta kod QR dengan kandungan muatan dan tindanan imej. Ini adalah cara paling mudah untuk bermula.',
      ],
    },
    {
      heading: 'Jenis Kandungan (Asas)',
      paragraphs: [
        'Teks Biasa: Mengekod sebarang teks sehingga had kapasiti kod QR. Sesuai untuk pesanan ringkas, kod atau pengecam.',
        'URL: Kod alamat web. Kod QR akan membuka URL apabila diimbas. Menyokong protokol http:// dan https://.',
      ],
    },
    {
      heading: 'Tindan Imej (Asas)',
      paragraphs: [
        'Muat naik imej (JPG, PNG, GIF, WebP) untuk digabungkan dengan kod QR anda. Ciri-ciri tindanan asas termasuk:',
      ],
      bullets: [
        'Muat naik daripada fail: Pilih imej daripada peranti anda.',
        'Muatkan daripada URL: Masukkan URL imej (mesti membenarkan CORS).',
        'Logo Tengah: Meletakkan imej di tengah, bergantung pada pembetulan ralat.',
        'Campuran: Pengadunan alfa mudah imej dengan corak QR.',
        'Intensiti: Mengawal sejauh mana tindanan mempengaruhi kod QR (0-100%).',
        'Mod Warna: Warna Penuh, Skala Kelabu atau Hitam & Putih.',
        'Kekalkan Corak Pencari: Mengekalkan corak sudut tanpa diubah suai untuk pengimbasan yang boleh dipercayai.',
      ],
    },
    {
      heading: 'Ciri Lanjutan',
      paragraphs: [
        'Tahap Lanjutan membuka pilihan pengekodan QR, gaya pemaparan, animasi, format output, jenis kandungan lanjutan dan penyesuaian tindanan lanjutan.',
      ],
    },
    {
      heading: 'Tetapan Pengekodan QR',
      paragraphs: [
        'Versi: Kod QR terdapat dalam versi 1-40, dengan versi yang lebih tinggi menyimpan lebih banyak data tetapi lebih besar. Tetapkan kepada 0 (Auto) untuk membolehkan ANQR memilih versi terkecil yang sesuai dengan kandungan anda.',
        'Pembetulan Ralat: Menentukan berapa banyak kerosakan yang boleh dialami oleh kod QR semasa masih boleh diimbas.',
      ],
      bullets: [
        'L (Rendah): Pembetulan ralat 7% - saiz terkecil, redundansi paling sedikit.',
        'M (Sederhana): pembetulan ralat 15% - pilihan seimbang.',
        'Q (Kuartil): Pembetulan ralat 25% - sesuai untuk kod bercetak.',
        'H (Tinggi): Pembetulan ralat 30% - terbaik untuk kod dengan tindanan atau dalam keadaan yang teruk.',
      ],
    },
    {
      heading: 'Zon Tenang (Margin)',
      paragraphs: [
        'Zon senyap ialah ruang putih di sekeliling kod QR. Pengimbas memerlukan margin ini untuk mengesan di mana kod bermula. Standard mengesyorkan sekurang-kurangnya 4 modul. Mengurangkan di bawah 4 boleh menyebabkan masalah pengimbasan.',
      ],
    },
    {
      heading: 'Gaya Modul',
      paragraphs: [
        'Modul ialah petak individu yang membentuk kod QR. ANQR menawarkan lima gaya:',
      ],
      bullets: [
        'Segiempat sama: Rupa QR klasik dengan bucu tajam.',
        'Bulat: Sudut yang dilembutkan untuk penampilan yang lebih mesra.',
        'Titik: Modul bulat untuk estetika moden.',
        'Berlian: Segi empat sama berputar 45° untuk corak yang tersendiri.',
        'Bersambung: Modul bergabung apabila bersebelahan, menghasilkan bentuk organik.',
      ],
    },
    {
      heading: 'Gaya Corak Pencari',
      paragraphs: [
        'Corak pencari ialah tiga segi empat sama besar di sudut QR yang membantu pengimbas mengorientasikan kod. Gaya yang tersedia:',
      ],
      bullets: [
        'Segiempat sama: Sudut segi empat sama standard.',
        'Bulat: Sudut yang dilembutkan sepadan dengan gaya modul bulat.',
        'Bulatan: Corak pencari bulat untuk kod gaya titik.',
      ],
    },
    {
      heading: 'Corak Penjajaran & Pemasaan',
      paragraphs: [
        'Corak penjajaran muncul dalam kod QR yang lebih besar (versi 2+) untuk membantu membetulkan herotan. Corak pemasaan ialah garisan berselang-seli yang menghubungkan corak pencari.',
      ],
      bullets: [
        'Gaya Penjajaran: Pencari Padanan, Segiempat, Bulat atau Bulatan.',
        'Gaya Pemasaan: Modul Padanan, Padu atau Putus-putus.',
      ],
    },
    {
      heading: 'Warna',
      paragraphs: [
        'Latar Depan: Warna modul QR. Hitam (#000000) adalah standard tetapi sebarang warna gelap boleh digunakan.',
        'Latar Belakang: Warna latar belakang. Putih (#ffffff) adalah standard. Pastikan kontras yang mencukupi dengan latar depan.',
        'Latar Belakang Lutsinar: Tanggalkan latar belakang sepenuhnya untuk digunakan pada permukaan berwarna. Pastikan permukaan memberikan kontras yang mencukupi.',
      ],
    },
    {
      heading: 'Saiz & Jurang Modul',
      paragraphs: [
        'Saiz Modul: Mengawal saiz paparan setiap modul dalam piksel. Nilai yang lebih besar menghasilkan kod yang lebih besar dan lebih mudah diimbas.',
        'Jurang Modul: Menambah ruang antara modul sebagai peratusan. Jurang kecil (5-15%) boleh meningkatkan kebolehimbasan dalam beberapa keadaan tetapi jurang yang berlebihan mengurangkan kebolehpercayaan.',
      ],
    },
    {
      heading: 'Tetapan Output',
      paragraphs: [
        'Format: Pilih format eksport anda berdasarkan kes penggunaan.',
      ],
      bullets: [
        'PNG: Format raster tanpa kehilangan, sesuai untuk kebanyakan kegunaan. Terbaik untuk cetakan dan digital.',
        'WebP: Format moden dengan saiz fail yang lebih kecil. Sesuai untuk kegunaan web.',
        'GIF: Diperlukan untuk kod QR beranimasi. Menyokong ketelusan.',
        'SVG: Format vektor yang berskala tanpa had. Terbaik untuk cetakan besar atau apabila anda perlu mengedit kod.',
      ],
    },
    {
      heading: 'Dimensi Output',
      paragraphs: [
        'Lebar/Tinggi: Tetapkan saiz output dalam piksel. Untuk cetakan, kira berdasarkan DPI (cth., 300 DPI pada 1 inci = 300px). Saiz yang lebih besar mengimbas dengan lebih andal pada jarak jauh.',
      ],
    },
    {
      heading: 'Tetapan Animasi (Lanjutan)',
      paragraphs: [
        'Kawal tingkah laku kod QR animasi:',
      ],
      bullets: [
        'Kelajuan: Kadar bingkai animasi dalam milisaat.',
        'Gelung: Animasi berterusan atau main tunggal.',
        'Lantunan: Arahan animasi ping-pong.',
        'Mula Bingkai: Mulakan animasi daripada bingkai tertentu.',
        'Bingkai Maks: Hadkan jumlah bingkai dalam animasi.',
        'Langkah Bingkai: Langkau bingkai untuk animasi yang lebih pantas.',
        'Interpolasi: Tiada, Pudar Silang atau Morf antara bingkai.',
      ],
    },
    {
      heading: 'Jenis Kandungan (Lanjutan)',
      paragraphs: [
        'Tahap lanjutan membuka format muatan tambahan:',
      ],
      bullets: [
        'Nombor Telefon (tel:): Mencipta pautan telefon yang boleh dihubungi.',
        'E-mel (mailto:): Membuka klien e-mel dengan subjek dan isi pilihan.',
        'SMS: Mesej teks yang telah diisi ke nombor telefon.',
        'vCard: Kad hubungan penuh dengan nama, organisasi, telefon, e-mel, alamat.',
        'MeCard: Format hubungan padat yang popular di Jepun.',
        'BizCard: Format kad perniagaan legasi.',
        'Geo Lokasi: Koordinat GPS yang dibuka dalam peta.',
        'WiFi: Kelayakan rangkaian untuk sambungan automatik (SSID, kata laluan, jenis keselamatan).',
        'Acara Kalendar: Format iKalendar dengan tajuk, lokasi, tarikh/masa.',
        'RSVP Acara: Pautan ke halaman pendaftaran acara.',
        'Langgan Kalendar: Langgan suapan ICS/WebCal.',
        'URL Fail/Dokumen: Pautan terus ke fail yang boleh dimuat turun.',
        'Pautan Storan Awan: Pautan ke Google Drive, Dropbox, OneDrive, dll.',
        'Profil Sosial: Pautan ke LinkedIn, Twitter, Instagram, dll.',
        'Pautan Pemesejan: WhatsApp, Telegram, Pautan dalam Signal.',
      ],
    },
    {
      heading: 'Ciri-ciri Tindanan Lanjutan',
      paragraphs: [
        'Keupayaan tindanan tambahan:',
      ],
      bullets: [
        'Potong: Dayakan pemotongan untuk memilih kawasan segi empat sama imej anda.',
        'Halftone: Corak titik gaya cetakan klasik berdasarkan kecerahan imej.',
        'Dithered: Dithering ralat-resapan untuk pembiakan terperinci.',
      ],
    },
    {
      heading: 'Mod Campuran Overlay (Lanjutan)',
      paragraphs: [
        'Mod campuran tambahan dalam tahap Lanjutan:',
      ],
      bullets: [
        'Subpiksel: Membahagikan setiap modul kepada subpiksel untuk perincian yang lebih tinggi.',
        'Hingar Biru: Menggunakan dithering hingar biru untuk corak bebas artifak.',
        'Mozek: Kesan berasaskan jubin yang memelihara struktur imej.',
        'Isi Jurang: Meletakkan imej dalam jurang antara modul.',
        'Kecerahan: Saiz modul berbeza-beza berdasarkan kecerahan imej.',
        'Duotone: Memetakan imej kepada dua warna untuk kontras yang menarik.',
      ],
    },
    {
      heading: 'Intensiti Lapisan',
      paragraphs: [
        'Mengawal sejauh mana tindanan mempengaruhi kod QR (0-100%). Nilai yang lebih tinggi menunjukkan lebih banyak perincian imej tetapi mungkin mengurangkan kebolehimbasan. Mulakan sekitar 70% dan laraskan berdasarkan ujian.',
      ],
    },
    {
      heading: 'Mod Warna',
      paragraphs: [
        'Bagaimana imej tindanan diproses:',
      ],
      bullets: [
        'Warna Penuh: Mengekalkan warna imej asal.',
        'Skala Kelabu: Menukar kepada ton hitam putih.',
        'Hitam & Putih: Penukaran binari kontras tinggi.',
      ],
    },
    {
      heading: 'Kekalkan Corak Pencari',
      paragraphs: [
        'Apabila diaktifkan, mengekalkan corak pencari tiga sudut tidak diubah suai oleh tindanan. Amat disyorkan untuk pengimbasan yang andal.',
      ],
    },
    {
      heading: 'Prapemprosesan Imej',
      paragraphs: [
        'Gunakan penapis pada imej tindanan anda sebelum mengadun. Pelarasan ini boleh menambah baik penampilan imej dalam kod QR akhir.',
      ],
      bullets: [
        'Kecerahan (-100 hingga +100): Cerahkan atau gelapkan imej.',
        'Kontras (-100 hingga +100): Meningkatkan atau mengurangkan julat ton.',
        'Gamma (0.2 hingga 3.0): Pelarasan kecerahan tak linear. Nilai di bawah 1 mencerahkan midtone, di atas 1 menggelapkannya.',
        'Ketepuan (-100 hingga +100): Keamatan warna. -100 ialah skala kelabu, +100 ialah terlebih tepu.',
        'Putar Hue (0-360°): Anjak semua warna di sekitar roda warna.',
        'Kabur (0-20px): Melembutkan butiran imej.',
        'Tajamkan (0-100%): Tingkatkan tepi dan perincian.',
        'Posterisasi (tahap 0-16): Kurangkan tahap warna untuk kesan poster.',
        'Ambang (0-255): Tukar kepada hitam/putih binari pada titik pemotongan.',
        'Pengesanan Tepi: Algoritma Sobel atau Canny untuk menunjukkan tepi sahaja.',
        'Terbalikkan: Terbalikkan semua warna.',
      ],
    },
    {
      heading: 'Mod Padanan',
      paragraphs: [
        'Bagaimana imej tindanan sesuai dengan kawasan kod QR:',
      ],
      bullets: [
        'Kulit: Imej memenuhi seluruh kawasan, memangkas jika perlu.',
        'Kandungan: Keseluruhan imej kelihatan, mungkin mempunyai margin.',
        'Regangan: Imej diputarbelitkan untuk mengisi dengan tepat.',
      ],
    },
    {
      heading: 'Pilihan Transformasi',
      paragraphs: [
        'Putaran: Putar tindanan dalam kenaikan 90°.',
        'Terbalikkan X/Y: Cerminkan imej secara mendatar atau menegak.',
      ],
    },
    {
      heading: 'Algoritma Dithering',
      paragraphs: [
        'Dithering menukar imej ton berterusan kepada corak yang boleh diwakili oleh kod QR. Tersedia apabila menggunakan mod campuran Dithered, Blue Noise atau True Dither.',
      ],
      bullets: [
        'Ralat Difusi: Gaya Floyd-Steinberg klasik. Menyebarkan ralat pengkuantuman kepada piksel bersebelahan.',
        'Tertib (Bayer): Menggunakan matriks ambang untuk corak biasa.',
        'Titik Berkelompok: Mensimulasikan pencetakan separuh ton.',
        'Kekosongan & Kluster: Dithering tertib yang dioptimumkan.',
        'Hingar Biru: Corak yang kelihatan rawak dan menyenangkan secara visual.',
        'Ambang Hingar Biru: Ambang dithering dengan tekstur hingar biru.',
        'Hingar Putih: Penggendalaman ambang rawak.',
        'Hingar Gaussian/Segi Tiga: Hilang bunyi dengan taburan yang berbeza.',
        'Hingar Biru + Difusi Ralat: Hibrid yang menggabungkan kedua-dua teknik.',
        'Bunyi Biru Bersaring: Corak hingar biru seperti skrin.',
        'Perseptual: Berwajaran pencahayaan untuk hasil visual yang lebih baik.',
        'Sedar Tepi: Mengekalkan tepi imej semasa dithering.',
        'Ambang Adaptif: Ambang adaptif setempat.',
        'Hingar Biru Sementara: Untuk GIF animasi, corak berbeza setiap bingkai.',
      ],
    },
    {
      heading: 'Inti Penyebaran',
      paragraphs: [
        'Apabila menggunakan dithering Difusi Ralat, pilih cara ralat diagihkan:',
      ],
      bullets: [
        'Floyd-Steinberg: Penyebaran 4-jiran klasik. Pilihan umum yang baik.',
        'Jarvis-Judice-Ninke: 12-jiran, lebih lancar tetapi lebih perlahan.',
        'Stucki: Serupa dengan JJN dengan berat yang berbeza.',
        'Burkes: JJN Ringkas, Lebih Cepat.',
        'Sierra: Keluarga kernel yang mengimbangi kualiti dan kelajuan.',
        'Atkinson: Penyebaran cahaya, mengekalkan perincian tetapi boleh menjadi berbutir.',
      ],
    },
    {
      heading: 'Kekuatan Dither',
      paragraphs: [
        'Mengawal berapa banyak dithering yang dikenakan (0-100%). Nilai yang lebih rendah mengekalkan lebih banyak corak asal, nilai yang lebih tinggi menunjukkan lebih banyak perincian imej.',
      ],
    },
    {
      heading: 'Tetapan Subpiksel',
      paragraphs: [
        'Apabila menggunakan mod campuran Subpiksel:',
      ],
      bullets: [
        'Saiz Grid: 2×2, 3×3, atau 4×4 subpiksel setiap modul. Lebih tinggi = lebih terperinci.',
        'Peraturan Pusat: Ketat memerlukan subpiksel tengah untuk sepadan dengan modul. Pusat Halfton membenarkan variasi.',
        'Warna Neutral: Warna yang digunakan untuk subpiksel yang tidak ditentukan.',
        'Finder Override: Cara corak pencari dipaparkan (Pepejal atau Bergaya).',
      ],
    },
    {
      heading: 'Tetapan Halfton',
      paragraphs: [
        'Apabila menggunakan mod campuran Halftone:',
      ],
      bullets: [
        'Saiz Sel: Setiap Modul atau grid N×N.',
        'Bentuk Titik: Bulatan, Segiempat atau Garisan.',
        'Lengkung Kecerahan: Linear, Lengkung-S atau Gamma.',
      ],
    },
    {
      heading: 'Warna Duoton',
      paragraphs: [
        'Apabila menggunakan mod campuran Duotone, tetapkan Warna Bayangan (kawasan gelap) dan Warna Serlahan (kawasan terang).',
      ],
    },
    {
      heading: 'Tetapan Animasi GIF',
      paragraphs: [
        'Apabila menggunakan tindanan GIF animasi:',
      ],
      bullets: [
        'Gunakan Kelewatan Bingkai: Hormati pemasaan GIF asal.',
        'FPS Maks: Hadkan kadar bingkai (1-60 fps).',
        'Pengendalian Pelupusan: Hormati atau Permudahkan kaedah pelupusan bingkai.',
      ],
    },
    {
      heading: 'Pilihan Pemaparan Lanjutan',
      paragraphs: [
        'Kawalan pemaparan tambahan:',
      ],
      bullets: [
        'Mod Jurang: Tiada, Sisipan, Goresan atau Penggayaan Jurang Ruang Negatif.',
        'Jejari Sudut: Peratusan sudut bulat untuk modul.',
        'Kecerunan: Tiada, Linear, Jejari atau Kecerunan Kon pada modul.',
        'Gaya Luar/Dalaman Mata: Penggayaan bebas untuk cincin corak pencari.',
        'Putaran Titik: Putar modul berlian/titik.',
        'Skala Mata: Pelarasan saiz untuk corak pencari.',
        'Gaya Bingkai: Tambah bingkai hiasan (Bingkai Bulat, Pelekat, Tag).',
        'Teks Bingkai: Tambah teks seperti Imbas Saya! pada bingkai.',
      ],
    },
    {
      heading: 'Pengekodan QR Lanjutan',
      paragraphs: [
        'Memperhalusi pengekodan QR:',
      ],
      bullets: [
        'Mod Pengekodan: Auto, Angka, Alfanumerik, Bait/UTF-8 atau Kanji.',
        'Tetapkan Zon Senyap Minimum: Pastikan sekurang-kurangnya 4 margin modul.',
      ],
    },
    {
      heading: 'Pilihan Output Lanjutan',
      paragraphs: [
        'Tetapan eksport tambahan:',
      ],
      bullets: [
        'Nama Fail: Nama fail tersuai untuk muat turun.',
        'Saiz Palet GIF: 2-256 warna dalam output GIF.',
        'Pengkuantiti GIF: Potongan Median, NeuQuant atau pengurangan warna Octree.',
        'Penggelisahan GIF: Mati, Floyd-Steinberg, atau Tertib.',
        'Warna Lutsinar GIF: Tetapkan warna kepada lutsinar.',
        'Vektor Sebenar SVG: Gunakan laluan dan bukannya raster terbenam.',
        'Ketepatan Bentuk SVG: Pemaparan laluan Piksel atau Tepat.',
        'Hamparan Raster Benam SVG: Sertakan hamparan sebagai imej terbenam.',
        'Penggantian Latar Belakang: Paksa warna latar belakang tertentu dalam output.',
      ],
    },
    {
      heading: 'Pilihan Pengesahan',
      paragraphs: [
        'Tetapan pemprosesan input:',
      ],
      bullets: [
        'Sahkan Input: Semak format kandungan sebelum pengekodan.',
        'Potong Ruang Putih: Alih keluar ruang hadapan/belakang.',
        'Normalisasikan Baris Baharu: Tukar semua pengakhiran baris kepada LF.',
        'Pengawal Panjang Maksimum: Amaran jika kandungan melebihi kapasiti QR.',
      ],
    },
    {
      heading: 'Ciri-ciri Profesional',
      paragraphs: [
        'Tahap Profesional menambah tera air, metadata, pilihan perkongsian, analisis keselamatan, kod QR pembayaran dan ciri perusahaan.',
      ],
    },
    {
      heading: 'Tanda Air',
      paragraphs: [
        'Tambah tanda air pada kod QR anda:',
      ],
      bullets: [
        'Jenis: Tanda air Teks, Imej atau Corak.',
        'Kedudukan: Tengah, Sudut, Tepi, Belakang atau Zon Tenang.',
        'Kelegapan: Ketelusan tera air (0-100%).',
        'Mod Adunan: Pengadunan Normal, Pendaraban, Skrin atau Lapisan.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: [
        'Benamkan metadata dalam fail yang dieksport:',
      ],
      bullets: [
        'Medan Tajuk, Pengarang, Hak Cipta, Lesen, Huraian.',
        'Masa Penciptaan: Cap masa penjanaan benam.',
        'Nilai Kunci Tersuai: Tambah pasangan metadata sewenang-wenangnya.',
      ],
    },
    {
      heading: 'Perkongsian',
      paragraphs: [
        'Kongsikan konfigurasi kod QR anda:',
      ],
      bullets: [
        'Pautan Langsung: Jana URL yang boleh dikongsi dengan tetapan semasa anda.',
        'Benamkan HTML: Dapatkan kod benam untuk laman web.',
        'Parameter Kod: Sertakan semua tetapan dalam URL kongsi.',
        'Nota: Imej tindanan daripada fail setempat tidak boleh dikongsi melalui URL.',
      ],
    },
    {
      heading: 'Analisis Keselamatan',
      paragraphs: [
        'Pastikan kod QR kekal boleh diimbas:',
      ],
      bullets: [
        'Mod Keselamatan: Keperluan pengimbasan Mati, Seimbang atau Ketat.',
        'Saiz Modul Minimum: Saiz piksel minimum setiap modul.',
        'Zon Senyap Minimum: Modul margin minimum.',
        'Pencari Kunci/Pemasaan/Jajarkan/Format/Versi: Lindungi elemen tertentu.',
        'Keamatan Tindanan Maksimum oleh ECC: Had keamatan automatik berdasarkan tahap pembetulan ralat.',
      ],
    },
    {
      heading: 'Jenis Kandungan (Profesional)',
      paragraphs: [
        'Tahap profesional menambah jenis pembayaran dan kandungan perusahaan:',
      ],
      bullets: [
        'EPC/SEPA (EU): Kod QR pemindahan bank Eropah dengan IBAN, BIC, jumlah, rujukan.',
        'UPI (India): Antara Muka Pembayaran Bersepadu dengan VPA, nama penerima, jumlah.',
        'Bayar Sekarang (Singapura): Pembayaran pantas Singapura dengan UEN atau nombor telefon bimbit.',
        'PromptPay (Thailand): Sistem pembayaran kebangsaan Thailand.',
        'PIX (Brazil): Pembayaran segera Brazil dengan kunci PIX.',
        'Kripto: Alamat pembayaran Bitcoin, Ethereum, Litecoin dengan jumlah pilihan.',
        'Pautan Kempen Pemasaran: URL dengan penjejakan parameter UTM penuh (Tag Pemasaran).',
        'Pautan Pendek: Untuk digunakan dengan pemendek URL bagi kod QR dinamik/boleh dijejaki.',
        'Pautan Digital GS1: Pengenalpastian produk dengan GTIN, siri, kelompok, tarikh luput.',
        'Pautan Dalam Aplikasi: Pautan dalam aplikasi iOS/Android dengan skema tersuai.',
        'Format Tersuai: Data mentah tanpa pemformatan atau pengesahan.',
      ],
    },
    {
      heading: 'Mod Campuran Overlay (Profesional)',
      paragraphs: [
        'Mod campuran tambahan dalam tahap Profesional:',
      ],
      bullets: [
        'Pixelat: Kesan tindanan piksel.',
        'Garis Besar: Lapisan pengesanan tepi yang hanya menunjukkan kontur.',
        'Gelombang: Kesan herotan beralun.',
        'Saiz Subpiksel: Saiz subpiksel yang boleh diubah suai berdasarkan imej.',
        'Dither Sejati: Dithering lanjutan dengan pemilihan matriks tertib.',
        'Melampau: Keterlihatan imej maksimum, mungkin menjejaskan kebolehimbasan.',
      ],
    },
    {
      heading: 'Tetapan Perlindungan',
      paragraphs: [
        'Kawalan terperinci ke atas elemen QR yang dilindungi daripada pengubahsuaian tindanan:',
      ],
      bullets: [
        'Kekalkan Pemasaan: Pastikan corak pemasaan tidak diubah suai.',
        'Kekalkan Penjajaran: Pastikan corak penjajaran tidak diubah suai.',
        'Lindungi Maklumat Format: Modul maklumat format perisai.',
        'Lindungi Maklumat Versi: Lindungi modul maklumat versi.',
      ],
    },
    {
      heading: 'Mod Sedar ECC',
      paragraphs: [
        'Mengedarkan keamatan tindanan secara bijak berdasarkan kapasiti pembetulan ralat. Sistem menganalisis modul mana yang boleh diubah suai sambil mengekalkan kebolehimbasan.',
      ],
      bullets: [
        'Bajet Risiko: Peratusan kapasiti pembetulan ralat untuk digunakan (0-100%).',
        'Bajet yang lebih tinggi = tindanan yang lebih jelas tetapi kebolehimbasan yang lebih berisiko.',
        'Bajet yang lebih rendah = pengimbasan yang lebih selamat tetapi tindanan yang kurang kelihatan.',
      ],
    },
    {
      heading: 'Pilihan Pemaparan Profesional',
      paragraphs: [
        'Kawalan pemaparan lanjutan:',
      ],
      bullets: [
        'Tepi Rangup: Gunakan pemaparan imej berpiksel untuk tepi modul yang tajam.',
        'Penangkapan Piksel: Penjajaran piksel Lantai, Bulat atau Siling.',
        'Mod Warna Setiap Modul: Pepejal, Mengikut Kecerahan, Mengikut Kedudukan, Mengikut Tindanan, Mengikut Gugusan.',
        'Palet Warna: Tentukan palet warna tersuai untuk pewarnaan setiap modul.',
        'Pengawal Kontras: Pastikan nisbah kontras minimum antara warna.',
        'Nisbah Kontras Min: Keperluan kontras gaya WCAG (1:1 hingga 21:1).',
        'Modul Sempadan Tambahan: Sempadan tambahan di luar zon senyap.',
      ],
    },
    {
      heading: 'Pilihan Output Profesional',
      paragraphs: [
        'Tetapan eksport perusahaan:',
      ],
      bullets: [
        'DPI: Tetapkan resolusi cetakan (72-600 DPI). 300 DPI disyorkan untuk cetakan.',
        'Sertakan Zon Senyap: Togol zon senyap dalam dimensi output.',
        'Eksport Sebagai Tambahan: Jana PDF bersama format utama.',
      ],
    },
    {
      heading: 'Tetapan Animasi (Profesional)',
      paragraphs: [
        'Ciri animasi profesional tambahan:',
      ],
      bullets: [
        'Dither Temporal: Mati, Bunyi Biru atau Dithering setiap bingkai Berkelip Selamat.',
        'Corak: Tiada, Nadi, Gelombang, Garis Imbas, Berkilau atau Kesan Hanyut.',
      ],
    },
    {
      heading: 'Amalan Terbaik',
      paragraphs: [
        'Ikuti garis panduan ini untuk kod QR yang boleh dipercayai:',
      ],
      bullets: [
        'Sentiasa uji kod QR anda dengan berbilang aplikasi pengimbas sebelum mencetak.',
        'Gunakan Pembetulan Ralat H (Tinggi) semasa menambah tindanan.',
        'Kekalkan sekurang-kurangnya 4 modul zon senyap (margin).',
        'Pastikan kontras yang tinggi antara latar depan dan latar belakang.',
        'Untuk cetakan, gunakan sekurang-kurangnya 300 DPI dan uji pada saiz cetakan sebenar.',
        'Dayakan Kekalkan Corak Pencari apabila menggunakan tindanan.',
        'Mulakan dengan keamatan tindanan yang lebih rendah dan tingkatkan secara beransur-ansur.',
        'Untuk kegunaan luar, pertimbangkan saiz modul yang lebih besar dan pembetulan ralat yang lebih tinggi.',
      ],
    },
    {
      heading: 'Penyelesaian Masalah',
      paragraphs: [
        'Isu dan penyelesaian biasa:',
      ],
      bullets: [
        'QR tidak dapat mengimbas: Kurangkan keamatan tindanan, tingkatkan pembetulan ralat, semak kontras.',
        'Kod terlalu besar: Kurangkan panjang kandungan, gunakan pemendek URL, versi yang lebih rendah.',
        'Output kabur: Tingkatkan saiz modul, gunakan PNG dan bukannya format termampat.',
        'Warna kelihatan salah: Semak kontras warna, cuba mod tindanan skala kelabu.',
        'GIF tidak menganimasikan: Pastikan output format GIF digunakan, semak kiraan bingkai.',
        'Tindan imej tidak dimuatkan: Semak kebenaran CORS pada imej jauh.',
      ],
    },
    {
      heading: 'Pintasan Papan Kekunci',
      paragraphs: [
        'ANQR menyokong pintasan papan kekunci standard. Gunakan Ctrl/Cmd+S untuk mencetuskan eksport (apabila difokuskan pada pratonton).',
      ],
    },
    {
      heading: 'Perkongsian & Penyematan',
      paragraphs: [
        'Dalam mod Profesional, klik butang Kongsi untuk menyalin URL dengan tetapan semasa anda. Penerima boleh membuka URL ini untuk melihat konfigurasi tepat anda. Nota: Imej tindanan daripada fail setempat tidak boleh dikongsi melalui URL.',
      ],
    },
  ],
};

export default docs;
