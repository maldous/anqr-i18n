import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Gabay sa Gumagamit ng ANQR',
  description: 'Kumpletong gabay sa paggamit ng ANQR para sa paggawa ng mga QR code.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Pagsisimula',
      paragraphs: [
        'Ang ANQR ay isang QR code generator na ganap na tumatakbo sa iyong device — sa iyong computer, telepono, o tablet. Hindi kinakailangan ng account, walang server na kasangkot, at ang iyong data ay nananatiling pribado.',
        'Ang interface ay may tatlong antas ng interface: Basic, Advanced, at Professional. Piliin ang iyong antas gamit ang mga tab sa header. Ang bawat antas ay nagbubukas ng mga karagdagang tampok habang pinapanatiling nakatuon ang interface sa kung ano ang kailangan mo.',
      ],
      bullets: [
        'Pangunahin: Simpleng paggawa ng QR code gamit ang plain text/URL content at image overlay.',
        'Advanced: Mga opsyon sa QR encoding, mga istilo ng pag-render, animation, mga format ng output, mga pinalawak na uri ng nilalaman, at pagpapasadya ng overlay.',
        'Propesyonal: Mga watermark, metadata, pagbabahagi, pagsusuri sa kaligtasan, mga QR code sa pagbabayad, at mga tampok ng negosyo.',
      ],
    },
    {
      heading: 'Mabilis na Pagsisimula',
      paragraphs: ['Para gawin ang iyong unang QR code:'],
      bullets: [
        '1. Pumili ng uri ng nilalaman (URL, teksto, WiFi, atbp.) mula sa dropdown na Uri ng Nilalaman.',
        '2. Ilagay ang iyong datos sa mga ibinigay na patlang.',
        '3. Maaari mo ring i-customize ang mga kulay, estilo, at magdagdag ng overlay na larawan.',
        '4. I-click ang I-export para i-download ang iyong QR code bilang PNG, GIF, WebP, o SVG.',
      ],
    },
    {
      heading: 'Mga Pangunahing Katangian',
      paragraphs: [
        'Ang Basic level ay nagbibigay ng pinasimpleng interface para sa paglikha ng mga QR code na may payload content at mga image overlay. Ito ang pinakasimpleng paraan para makapagsimula.',
      ],
    },
    {
      heading: 'Mga Uri ng Nilalaman (Pangunahin)',
      paragraphs: [
        'Plain Text: I-encode ang anumang teksto hanggang sa limitasyon ng kapasidad ng QR code. Mainam para sa mga maiikling mensahe, code, o identifier.',
        'URL: I-encode ang mga web address. Magbubukas ang QR code ng URL kapag na-scan. Sinusuportahan ang mga protocol na http:// at https://.',
      ],
    },
    {
      heading: 'Pag-overlay ng Larawan (Pangunahin)',
      paragraphs: [
        'Mag-upload ng larawan (JPG, PNG, GIF, WebP) para maihalo sa iyong QR code. Kabilang sa mga pangunahing tampok ng overlay ang:',
      ],
      bullets: [
        'Mag-upload mula sa file: Pumili ng larawan mula sa iyong device.',
        'Mag-load mula sa URL: Maglagay ng URL ng larawan (dapat payagan ang CORS).',
        'Logo sa Gitnang Bahagi: Inilalagay ang imahe sa gitna, umaasa sa pagwawasto ng error.',
        'Paghahalo: Simpleng alpha blending ng imahe gamit ang QR pattern.',
        'Intensity: Kinokontrol kung gaano kalakas ang epekto ng overlay sa QR code (0-100%).',
        'Mode ng Kulay: Buong Kulay, Grayscale, o Itim at Puti.',
        'Panatilihin ang mga Pattern ng Finder: Pinapanatiling hindi nababago ang mga pattern ng sulok para sa maaasahang pag-scan.',
      ],
    },
    {
      heading: 'Mga Advanced na Tampok',
      paragraphs: [
        'Binubuksan ng Advanced level ang mga opsyon sa QR encoding, mga istilo ng pag-render, animation, mga format ng output, mga pinalawak na uri ng nilalaman, at advanced na pagpapasadya ng overlay.',
      ],
    },
    {
      heading: 'Mga Setting ng QR Encoding',
      paragraphs: [
        'Bersyon: Ang mga QR code ay may mga bersyon 1-40, kung saan ang mas mataas na mga bersyon ay naglalaman ng mas maraming data ngunit mas malaki. Itakda sa 0 (Auto) upang hayaan ang ANQR na pumili ng pinakamaliit na bersyon na akma sa iyong nilalaman.',
        'Pagwawasto ng Mali: Tinutukoy kung gaano kalaking pinsala ang maaaring matamo ng isang QR code habang nananatiling maaaring i-scan.',
      ],
      bullets: [
        'L (Mababa): 7% na pagwawasto ng error - pinakamaliit na laki, pinakamaliit na kalabisan.',
        'M (Katamtaman): 15% pagwawasto ng error - balanseng opsyon.',
        'Q (Quartile): 25% pagwawasto ng error - mainam para sa mga nakalimbag na code.',
        'H (Mataas): 30% pagwawasto ng error - pinakamainam para sa mga code na may mga overlay o sa malupit na mga kondisyon.',
      ],
    },
    {
      heading: 'Tahimik na Sona (Margin)',
      paragraphs: [
        'Ang tahimik na sona ay ang puting espasyo sa paligid ng QR code. Kailangan ng mga scanner ang margin na ito upang matukoy kung saan nagsisimula ang code. Inirerekomenda ng pamantayan ang hindi bababa sa 4 na module. Ang pagbawas sa ibaba ng 4 ay maaaring magdulot ng mga isyu sa pag-scan.',
      ],
    },
    {
      heading: 'Estilo ng Modyul',
      paragraphs: [
        'Ang mga modyul ay ang mga indibidwal na parisukat na bumubuo sa isang QR code. Nag-aalok ang ANQR ng limang istilo:',
      ],
      bullets: [
        'Parihaba: Klasikong anyo ng QR na may matutulis na sulok.',
        'Bilugan: Pinalambot na mga sulok para sa mas magiliw na hitsura.',
        'Mga Tuldok: Mga pabilog na modyul para sa isang modernong estetika.',
        'Diamante: 45° na pinaikot na mga parisukat para sa isang natatanging disenyo.',
        'Konektado: Ang mga modyul ay nagsasama kapag magkatabi, na lumilikha ng mga organikong hugis.',
      ],
    },
    {
      heading: 'Estilo ng Pattern ng Finder',
      paragraphs: [
        'Ang mga pattern ng Finder ay ang tatlong malalaking parisukat sa mga sulok ng QR na tumutulong sa mga scanner na i-orient ang code. Mga magagamit na istilo:',
      ],
      bullets: [
        'Kwadrado: Karaniwang mga sulok na parisukat.',
        'Bilugan: Pinalambot na mga sulok na tumutugma sa istilo ng bilugan na modyul.',
        'Bilog: Mga pabilog na pattern para sa paghahanap ng mga code na istilong tuldok.',
      ],
    },
    {
      heading: 'Mga Pattern ng Pag-align at Pagtatakda ng Oras',
      paragraphs: [
        'Lumalabas ang mga pattern ng pagkakahanay sa mas malalaking QR code (bersyon 2+) upang makatulong na itama ang distorsyon. Ang mga pattern ng timing ay ang mga salit-salit na linya na nagdurugtong sa mga pattern ng tagahanap.',
      ],
      bullets: [
        'Estilo ng Paghahanay: Tagahanap ng Tugma, Parisukat, Bilugan, o Bilog.',
        'Istilo ng Pagtatakda ng Panahon: Modyul ng Pagtutugma, Solido, o Dashed.',
      ],
    },
    {
      heading: 'Mga Kulay',
      paragraphs: [
        'Pangunahan: Ang kulay ng mga QR module. Karaniwan ang itim (#000000) ngunit maaari itong gamitin kahit anong madilim na kulay.',
        'Likod: Ang kulay ng likuran. Puti (#ffffff) ang karaniwan. Siguraduhing sapat ang contrast sa harapan.',
        'Transparent na Background: Tanggalin nang buo ang background para magamit sa mga may kulay na ibabaw. Tiyaking nagbibigay ang ibabaw ng sapat na contrast.',
      ],
    },
    {
      heading: 'Laki at Gap ng Modyul',
      paragraphs: [
        'Laki ng Module: Kinokontrol kung gaano kalaki ang nire-render ng bawat module sa mga pixel. Ang mas malalaking value ay lumilikha ng mas malaki at mas madaling i-scan na mga code.',
        'Gap ng Module: Nagdaragdag ng espasyo sa pagitan ng mga module bilang porsyento. Ang maliliit na puwang (5-15%) ay maaaring mapabuti ang kakayahang ma-scan sa ilang mga kondisyon ngunit ang labis na mga puwang ay nakakabawas sa pagiging maaasahan.',
      ],
    },
    {
      heading: 'Mga Setting ng Output',
      paragraphs: ['Format: Piliin ang format ng iyong pag-export batay sa use case.'],
      bullets: [
        'PNG: Lossless raster format, mainam para sa karamihan ng gamit. Pinakamahusay para sa print at digital.',
        'WebP: Modernong format na may mas maliliit na laki ng file. Mainam para sa paggamit sa web.',
        'GIF: Kinakailangan para sa mga animated na QR code. Sinusuportahan ang transparency.',
        'SVG: Format na vector na walang katapusang sukat. Pinakamahusay para sa malalaking letra o kapag kailangan mong i-edit ang code.',
      ],
    },
    {
      heading: 'Mga Dimensyon ng Output',
      paragraphs: [
        'Lapad/Taas: Itakda ang laki ng output sa mga pixel. Para sa pag-print, kalkulahin batay sa DPI (hal., 300 DPI sa 1 pulgada = 300px). Mas maaasahan ang pag-scan ng mas malalaking sukat sa malayo.',
      ],
    },
    {
      heading: 'Mga Setting ng Animasyon (Advanced)',
      paragraphs: ['Kontrolin ang animated na pag-uugali ng QR code:'],
      bullets: [
        'Bilis: Bilis ng frame ng animation sa milliseconds.',
        'Ulitin: Tuloy-tuloy o single-play na animation.',
        'Talbog: Direksyon ng animation ng ping-pong.',
        'Simulan ang Frame: Simulan ang animation mula sa partikular na frame.',
        'Max Frames: Limitahan ang kabuuang frames sa animation.',
        'Hakbang sa Frame: Laktawan ang mga frame para sa mas mabilis na animation.',
        'Interpolasyon: Wala, Crossfade, o Morph sa pagitan ng mga frame.',
      ],
    },
    {
      heading: 'Mga Uri ng Nilalaman (Advanced)',
      paragraphs: ['Nagbubukas ang advanced level ng mga karagdagang format ng payload:'],
      bullets: [
        'Numero ng Telepono (tel:): Lumilikha ng link sa telepono na maaaring tawagan.',
        'Email (mailto:): Binubuksan ang email client na may opsyonal na paksa at katawan.',
        'SMS: Paunang napunang text message sa isang numero ng telepono.',
        'vCard: Kumpletong contact card na may pangalan, organisasyon, telepono, email, address.',
        'MeCard: Sikat na format ng compact contact sa Japan.',
        'BizCard: Format ng legacy business card.',
        'Lokasyon sa Heograpiya: Mga coordinate ng GPS na bumubukas sa mga mapa.',
        'WiFi: Mga kredensyal sa network para sa awtomatikong koneksyon (SSID, password, uri ng seguridad).',
        'Kaganapan sa Kalendaryo: format ng iCalendar na may pamagat, lokasyon, petsa/oras.',
        'RSVP ng Kaganapan: Link sa pahina ng pagpaparehistro ng kaganapan.',
        'Mag-subscribe sa Kalendaryo: Mag-subscribe sa isang feed ng ICS/WebCal.',
        'URL ng File/Dokumento: Direktang link sa mga file na maaaring i-download.',
        'Link sa Cloud Storage: Mga link papunta sa Google Drive, Dropbox, OneDrive, atbp.',
        'Social Profile: Mga link sa LinkedIn, Twitter, Instagram, atbp.',
        'Link sa Pagmemensahe: WhatsApp, Telegram, Signal deep links.',
      ],
    },
    {
      heading: 'Mga Advanced na Tampok ng Overlay',
      paragraphs: ['Mga karagdagang kakayahan sa overlay:'],
      bullets: [
        'I-crop: Paganahin ang pag-crop upang pumili ng parisukat na rehiyon ng iyong larawan.',
        'Halftone: Klasikong disenyo ng tuldok na istilo ng pag-print batay sa liwanag ng imahe.',
        'Dithered: Dithering ng error-diffusion para sa detalyadong reproduksyon.',
      ],
    },
    {
      heading: 'Mga Blend Mode ng Overlay (Advanced)',
      paragraphs: ['Karagdagang mga blend mode sa Advanced level:'],
      bullets: [
        'Subpixel: Hinahati ang bawat modyul sa mga subpixel para sa mas detalyadong impormasyon.',
        'Blue Noise: Gumagamit ng blue noise dithering para sa mga pattern na walang artifact.',
        'Mosaic: Epektong nakabatay sa tile na nagpapanatili sa istruktura ng imahe.',
        'Pagpuno ng Gap: Inilalagay ang imahe sa mga puwang sa pagitan ng mga modyul.',
        'Liwanag: Nag-iiba-iba ang laki ng modyul batay sa liwanag ng imahe.',
        'Duotone: Inimapa ang imahe sa dalawang kulay para sa kapansin-pansing contrast.',
      ],
    },
    {
      heading: 'Intensity ng Overlay',
      paragraphs: [
        'Kinokontrol kung gaano kalakas ang epekto ng overlay sa QR code (0-100%). Ang mas matataas na halaga ay nagpapakita ng mas maraming detalye ng imahe ngunit maaaring makabawas sa kakayahang i-scan. Magsimula sa bandang 70% at isaayos batay sa pagsubok.',
      ],
    },
    {
      heading: 'Mode ng Kulay',
      paragraphs: ['Paano pinoproseso ang overlay na imahe:'],
      bullets: [
        'Buong Kulay: Pinapanatili ang mga orihinal na kulay ng imahe.',
        'Grayscale: Kino-convert sa itim at puting mga tono.',
        'Itim at Puti: Mataas na contrast na binary conversion.',
      ],
    },
    {
      heading: 'Panatilihin ang mga Pattern ng Finder',
      paragraphs: [
        'Kapag pinagana, pinapanatili nitong hindi nababago ng overlay ang tatlong pattern ng tagahanap ng sulok. Lubos na inirerekomenda para sa maaasahang pag-scan.',
      ],
    },
    {
      heading: 'Pagproseso ng Imahe',
      paragraphs: [
        'Maglagay ng mga filter sa iyong overlay na larawan bago i-blend. Ang mga pagsasaayos na ito ay maaaring mapabuti kung paano lumalabas ang larawan sa panghuling QR code.',
      ],
      bullets: [
        'Liwanag (-100 hanggang +100): Paliwanagin o padilimin ang imahe.',
        'Contrast (-100 hanggang +100): Dagdagan o bawasan ang saklaw ng tono.',
        'Gamma (0.2 hanggang 3.0): Hindi linear na pagsasaayos ng liwanag. Ang mga halagang mas mababa sa 1 ay nagpapagaan ng mga midtone, at mas mataas sa 1 ay nagpapadilim sa mga ito.',
        'Saturation (-100 hanggang +100): Intensidad ng kulay. -100 ay grayscale, +100 ay oversaturated.',
        'Hue Rotate (0-360°): Ilipat ang lahat ng kulay sa paligid ng color wheel.',
        'Palabo (0-20px): Palambutin ang mga detalye ng imahe.',
        'Patalasin (0-100%): Pagandahin ang mga gilid at detalye.',
        'Posterize (0-16 na antas): Bawasan ang mga antas ng kulay para sa epekto ng poster.',
        'Hangganan (0-255): I-convert sa binary black/white sa cutoff point.',
        'Pagtuklas ng Gilid: Mga algorithm ng Sobel o Canny para ipakita lamang ang mga gilid.',
        'Baliktarin: Baligtarin ang lahat ng kulay.',
      ],
    },
    {
      heading: 'Mode ng Pagkasyahin',
      paragraphs: ['Paano umaangkop ang overlay na imahe sa lugar ng QR code:'],
      bullets: [
        'Pabalat: Pinupuno ng larawan ang buong lugar, pinuputol kung kinakailangan.',
        'Naglalaman: Nakikita ang buong larawan, maaaring may mga gilid.',
        'Pag-unat: Binabaluktot ang imahe upang mapuno nang eksakto.',
      ],
    },
    {
      heading: 'Mga Opsyon sa Pagbabago',
      paragraphs: [
        'Pag-ikot: I-rotate ang overlay nang 90° na palugit.',
        'I-flip X/Y: I-salamin ang imahe nang pahalang o patayo.',
      ],
    },
    {
      heading: 'Mga Algoritmo ng Dithering',
      paragraphs: [
        'Kino-convert ng dithering ang mga imaheng may tuluy-tuloy na tono sa mga pattern na kayang katawanin ng mga QR code. Magagamit kapag gumagamit ng mga blend mode na Dithered, Blue Noise, o True Dither.',
      ],
      bullets: [
        'Error Diffusion: Klasikong istilo nina Floyd-Steinberg. Ikinakalat ang error sa quantization sa mga kalapit na pixel.',
        'Ordered (Bayer): Gumagamit ng threshold matrix para sa mga regular na pattern.',
        'Clustered Dot: Ginagaya ang pag-imprenta ng halftone.',
        'Void at Cluster: Na-optimize na nakaayos na dithering.',
        'Asul na Ingay: Isang disenyo na tila walang kapantay ang hitsura at kaaya-aya sa paningin.',
        'Blue Noise Threshold: Pag-dither ng Threshold na may teksturang blue noise.',
        'Puting Ingay: Random na Pag-dither ng Threshold.',
        "Gaussian/Triangular na Ingay: Ingay na may iba't ibang distribusyon.",
        'Blue Noise + Error Diffusion: Hybrid na pagsasama-sama ng parehong pamamaraan.',
        'Naka-screen na Asul na Ingay: Parang-screen na padron ng asul na ingay.',
        'Perseptwal: Tinimbang ng liwanag para sa mas mahusay na mga resultang biswal.',
        'Edge-Aware: Pinapanatili ang mga gilid ng imahe habang nagdithering.',
        'Adaptive Threshold: Lokal na adaptive thresholding.',
        'Temporal na Asul na Ingay: Para sa mga animated na GIF, nag-iiba ang pattern bawat frame.',
      ],
    },
    {
      heading: 'Mga Kernel ng Difusyon',
      paragraphs: [
        'Kapag ginagamit ang Error Diffusion dithering, piliin kung paano ipinamamahagi ang error:',
      ],
      bullets: [
        'Floyd-Steinberg: Klasikong 4-neighbor diffusion. Magandang pangkalahatang pagpipilian.',
        'Jarvis-Judice-Ninke: 12-kapwa, mas makinis ngunit mas mabagal.',
        "Stucki: Katulad ng JJN na may iba't ibang bigat.",
        'Burkes: Pinasimpleng JJN, mas mabilis.',
        'Sierra: Pamilya ng mga kernel na nagbabalanse ng kalidad at bilis.',
        'Atkinson: Pagkalat ng liwanag, pinapanatili ang detalye ngunit maaaring maging butil-butil.',
      ],
    },
    {
      heading: 'Lakas ng Pagkalito',
      paragraphs: [
        'Kinokontrol kung gaano karaming dithering ang inilalapat (0-100%). Ang mas mababang mga halaga ay nagpapanatili ng mas maraming orihinal na pattern, ang mas mataas na mga halaga ay nagpapakita ng mas maraming detalye ng imahe.',
      ],
    },
    {
      heading: 'Mga Setting ng Subpixel',
      paragraphs: ['Kapag ginagamit ang Subpixel blend mode:'],
      bullets: [
        'Laki ng Grid: 2×2, 3×3, o 4×4 na mga subpixel bawat modyul. Mas mataas = mas detalyado.',
        'Panuntunan sa Gitnang Bahagi: Kinakailangan ng mahigpit na center subpixel na tumugma sa module. Pinapayagan ng Halftone Center ang pagkakaiba-iba.',
        'Kulay na Neutral: Kulay na ginagamit para sa mga hindi natukoy na subpixel.',
        'Finder Override: Paano nire-render ang mga pattern ng finder (Solid o Stylized).',
      ],
    },
    {
      heading: 'Mga Setting ng Halftone',
      paragraphs: ['Kapag ginagamit ang Halftone blend mode:'],
      bullets: [
        'Laki ng Selula: Bawat Modyul o N×N grid.',
        'Hugis ng Tuldok: Bilog, Parisukat, o Linya.',
        'Kurba ng Liwanag: Linear, S-Curve, o Gamma.',
      ],
    },
    {
      heading: 'Mga Kulay na Duotone',
      paragraphs: [
        'Kapag ginagamit ang Duotone blend mode, itakda ang Shadow color (madilim na bahagi) at Highlight color (maliwanag na bahagi).',
      ],
    },
    {
      heading: 'Mga Setting ng Animasyon ng GIF',
      paragraphs: ['Kapag gumagamit ng mga animated na GIF overlay:'],
      bullets: [
        'Gumamit ng Frame Delays: Igalang ang orihinal na timing ng GIF.',
        'Pinakamataas na FPS: Limitasyon sa frame rate (1-60 fps).',
        'Paghawak sa Pagtatapon: Igalang o Pasimplehin ang mga pamamaraan ng pagtatapon ng frame.',
      ],
    },
    {
      heading: 'Mga Advanced na Opsyon sa Pag-render',
      paragraphs: ['Mga karagdagang kontrol sa pag-render:'],
      bullets: [
        'Gap Mode: Wala, Inset, Stroke, o Negatibong Pag-istilo ng puwang.',
        'Radius ng Sulok: Porsyento ng mga bilugan na sulok para sa mga modyul.',
        'Gradient: Wala, Linear, Radial, o Conic gradient sa mga modyul.',
        'Eye Outer/Inner Style: Malayang pag-istilo para sa mga finder pattern ring.',
        'Pag-ikot ng Tuldok: Paikutin ang mga modyul na diyamante/tuldok.',
        'Iskala ng Mata: Pagsasaayos ng laki para sa mga pattern ng tagahanap.',
        'Estilo ng Frame: Magdagdag ng mga pandekorasyon na frame (Bilog na Frame, Sticker, Tag).',
        'Teksto ng Frame: Magdagdag ng teksto tulad ng Scan Me! sa mga frame.',
      ],
    },
    {
      heading: 'Mahusay na Pag-encode ng QR',
      paragraphs: ['Pag-aayos ng QR encoding:'],
      bullets: [
        'Mode ng Pag-encode: Awtomatiko, Numeriko, Alpanumeriko, Byte/UTF-8, o Kanji.',
        'Ipatupad ang Min Quiet Zone: Tiyaking may kahit 4 na margin ng module.',
      ],
    },
    {
      heading: 'Mga Advanced na Opsyon sa Output',
      paragraphs: ['Mga karagdagang setting ng pag-export:'],
      bullets: [
        'Pangalan ng file: Pasadyang pangalan ng file para sa mga download.',
        'Laki ng GIF Palette: 2-256 na kulay sa GIF output.',
        'GIF Quantizer: Median Cut, NeuQuant, o Octree na pagbabawas ng kulay.',
        'Pag-dither ng GIF: Off, Floyd-Steinberg, o Ordered.',
        'Kulay na Transparent ng GIF: Itakda ang kulay na maging transparent.',
        'SVG True Vector: Gumamit ng mga path sa halip na naka-embed na raster.',
        'Katumpakan ng Hugis ng SVG: Pag-render ng Pixel o Tumpak na landas.',
        'SVG Embed Raster Overlay: Isama ang overlay bilang naka-embed na imahe.',
        'Pag-override ng Background: Pilitin ang isang partikular na kulay ng background sa output.',
      ],
    },
    {
      heading: 'Mga Opsyon sa Pagpapatunay',
      paragraphs: ['Mga setting ng pagproseso ng input:'],
      bullets: [
        'Patunayan ang Input: Suriin ang format ng nilalaman bago i-encode.',
        'Bawasan ang Puting Espasyo: Alisin ang mga espasyo sa unahan/kasunod.',
        'Gawing Normal ang mga Bagong Linya: I-convert ang lahat ng pagtatapos ng linya sa LF.',
        'Pinakamataas na Haba ng Proteksyon: Babala kung ang nilalaman ay lumampas sa kapasidad ng QR.',
      ],
    },
    {
      heading: 'Mga Propesyonal na Tampok',
      paragraphs: [
        'Ang antas na Propesyonal ay nagdaragdag ng mga watermark, metadata, mga opsyon sa pagbabahagi, pagsusuri sa kaligtasan, mga QR code sa pagbabayad, at mga tampok ng enterprise.',
      ],
    },
    {
      heading: 'Tatak ng Tubig',
      paragraphs: ['Magdagdag ng mga watermark sa iyong mga QR code:'],
      bullets: [
        'Uri: Watermark ng Teksto, Larawan, o Pattern.',
        'Posisyon: Gitna, Mga Sulok, Mga Gilid, Likod, o Tahimik na Sona.',
        'Kadiliman: Transparency ng Watermark (0-100%).',
        'Blend Mode: Normal, Multiply, Screen, o Overlay blending.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: ['I-embed ang metadata sa mga na-export na file:'],
      bullets: [
        'Mga patlang ng Pamagat, Awtor, Karapatang-ari, Lisensya, Paglalarawan.',
        'Oras ng Paglikha: Timestamp ng Pagbuo ng I-embed.',
        'Pasadyang Halaga ng Key: Magdagdag ng mga arbitraryong pares ng metadata.',
      ],
    },
    {
      heading: 'Pagbabahagi',
      paragraphs: ['Ibahagi ang mga configuration ng iyong QR code:'],
      bullets: [
        'Direktang Link: Bumuo ng maibabahaging URL gamit ang iyong kasalukuyang mga setting.',
        'I-embed ang HTML: Kumuha ng embed code para sa mga website.',
        'Mga Parameter ng Pag-encode: Isama ang lahat ng setting sa URL ng pagbabahagi.',
        'Paalala: Hindi maaaring ibahagi ang mga overlay na larawan mula sa mga lokal na file sa pamamagitan ng URL.',
      ],
    },
    {
      heading: 'Pagsusuri ng Kaligtasan',
      paragraphs: ['Siguraduhing mananatiling na-scan ang mga QR code:'],
      bullets: [
        'Mode na Pangkaligtasan: Naka-off, Balanse, o Mahigpit na mga kinakailangan sa pag-scan.',
        'Minimum na Laki ng Module: Minimum na laki ng pixel bawat module.',
        'Minimum na Tahimik na Sona: Mga modyul na may minimum na margin.',
        'Mga Lock Finder/Timing/Align/Format/Bersyon: Protektahan ang mga partikular na elemento.',
        'Max Overlay Intensity ayon sa ECC: Awtomatikong limitasyon ng intensity batay sa antas ng pagwawasto ng error.',
      ],
    },
    {
      heading: 'Mga Uri ng Nilalaman (Propesyonal)',
      paragraphs: [
        'Nagdaragdag ang antas ng propesyonal ng mga uri ng pagbabayad at nilalaman para sa negosyo:',
      ],
      bullets: [
        'EPC/SEPA (EU): Mga QR code para sa bank transfer sa Europa na may IBAN, BIC, halaga, sanggunian.',
        'UPI (India): Pinag-isang Interface ng Pagbabayad gamit ang VPA, pangalan ng tatanggap, halaga.',
        'PayNow (Singapore): Mabilis na pagbabayad sa Singapore gamit ang UEN o numero ng mobile.',
        'PromptPay (Thailand): Pambansang sistema ng pagbabayad ng Thailand.',
        'PIX (Brazil): Agarang pagbabayad sa Brazil gamit ang PIX key.',
        'Crypto: Mga address sa pagbabayad ng Bitcoin, Ethereum, Litecoin na may opsyonal na halaga.',
        'Link ng Kampanya sa Marketing: Mga URL na may kumpletong pagsubaybay sa parameter ng UTM (Mga Tag sa Marketing).',
        'Maikling Link: Para gamitin sa mga URL shortener para sa mga dynamic/trackable na QR code.',
        'GS1 Digital Link: Pagkilala ng produkto gamit ang GTIN, serial, batch, expiry.',
        'Malalim na Link ng App: Mga malalim na link ng iOS/Android app na may mga pasadyang scheme.',
        'Pasadyang Format: Hilaw na datos na walang pag-format o pagpapatunay.',
      ],
    },
    {
      heading: 'Mga Pagbabayad na May Kaugnayan sa Wika sa Advanced Mode',
      paragraphs: [
        'Kapag ginagamit ang Advanced mode, awtomatikong ipinapakita ng ANQR ang mga paraan ng pagbabayad na may kaugnayan sa iyong napiling wika. Halimbawa, ang mga Vietnamese user ay nakakakita ng VietQR, ang mga Thai user ay nakakakita ng PromptPay, at ang mga Indian language user ay nakakakita ng UPI at BharatQR. Ang mga pandaigdigang paraan ng pagbabayad (cryptocurrency, PayPal, Cash App) ay magagamit sa lahat ng wika. Binubuksan ng Professional mode ang lahat ng pamantayan sa pagbabayad anuman ang wika.',
      ],
    },
    {
      heading: 'Mga Pamantayan sa Pagbabayad sa Europa',
      bullets: [
        'EPC/SEPA (EU): Mga QR code para sa bank transfer sa Europa na sumusunod sa EPC QR Code Standard. Sinusuportahan ang IBAN, BIC (opsyonal para sa domestic), halaga sa EUR, at mga structured o unstructured na reference sa pagbabayad. Ginagamit sa buong SEPA zone kabilang ang mga bansa ng EU kasama ang Switzerland, Norway, Iceland, Liechtenstein, Monaco, at San Marino.',
        'Swiss QR-bill: Pamantayan sa pagbabayad ng Switzerland na sumusunod sa SIX Implementation Guidelines. Sinusuportahan ang CHF at EUR, QR-Reference (QRR), Creditor Reference (ISO 11649), mga structured na address ng creditor/debtor, at impormasyon sa bill. Kinakailangan para sa mga invoice sa Switzerland mula 2022.',
      ],
    },
    {
      heading: 'Mga Pamantayan sa Pagbabayad sa India',
      bullets: [
        'UPI (India): Unified Payments Interface na sumusunod sa NPCI Deep Linking Specification. Sinusuportahan ang VPA (Virtual Payment Address), pangalan ng tatanggap, halaga sa INR, tala ng transaksyon, reference ID, merchant category code, at mode ng transaksyon.',
        'BharatQR (India): Pinag-isang pamantayan ng QR na sumusuporta sa parehong UPI at card-based na pagbabayad. Pinagsasama ang UPI VPA sa card PAN para sa pinakamataas na compatibility. Kasama ang pangalan ng merchant, lungsod, MCC, mga detalye ng GST, at mga numero ng invoice/reference.',
      ],
    },
    {
      heading: 'Mga Pamantayan sa Pagbabayad sa Timog-silangang Asya',
      bullets: [
        'PayNow (Singapore): Sistema ng mabilis na pagbabayad sa Singapore gamit ang EMVCo QR specification na may SGQR profile. Sinusuportahan ang UEN (business registration), numero ng mobile, o NRIC bilang mga proxy identifier. Kasama ang flag ng editability ng halaga at petsa ng expiry.',
        'PromptPay (Thailand): Pambansang sistema ng pagbabayad ng Thailand na sumusunod sa Bank of Thailand EMV profile. Sinusuportahan ang numero ng mobile, national ID, tax ID, e-wallet ID, at pagbabayad ng bill na may maraming reference field.',
        'QRIS (Indonesia): Quick Response Code Indonesian Standard. Pamantayan sa pambansang pagbabayad na nakabatay sa EMV na sumusuporta sa merchant ID, NMID (National Merchant ID), klasipikasyon ng merchant criteria, at mga convenience fee (fixed o percentage).',
        'DuitNow (Malaysia): Sistema ng instant na pagbabayad sa Malaysia. Sinusuportahan ang maraming uri ng proxy kabilang ang NRIC, mobile, passport, army ID, at mga numero ng business registration.',
        "VietQR (Vietnam): Pamantayan ng Vietnamese interbank transfer. Nangangailangan ng bank BIN (NAPAS identification) at numero ng account. Sinusuportahan ang maraming service code para sa iba't ibang uri ng transfer (QRPUSH, QRIBFTTA, QRIBFTTC).",
        'QR Ph (Philippines): Pamantayan ng QR payment sa Pilipinas para sa InstaPay at PESONet. Gumagamit ng mga numero ng account na may merchant identification para sa mga P2M (person-to-merchant) na transaksyon.',
      ],
    },
    {
      heading: 'Mga Pamantayan sa Pagbabayad sa Silangang Asya',
      bullets: [
        'TWQR (Taiwan): Pamantayan ng QR payment sa Taiwan. Sinusuportahan ang merchant ID, tax ID, at mga halaga sa TWD.',
        'HKQR/FPS (Hong Kong): Mga QR code ng Hong Kong Faster Payment System. Sinusuportahan ang FPS ID, numero ng mobile, o email bilang mga payment identifier. Mga halaga sa HKD.',
        'JPQR (Japan): Pinag-isang pamantayan ng QR code payment sa Japan. Gumagamit ng store ID para sa merchant identification na may mga halaga sa JPY.',
      ],
    },
    {
      heading: 'Iba Pang Mga Pamantayan sa Pagbabayad sa Rehiyon',
      bullets: [
        'PIX (Brazil): Sistema ng instant na pagbabayad ng Brazilian Central Bank na sumusunod sa BR Code specification. Sinusuportahan ang mga PIX key (CPF, CNPJ, email, phone, o random key), pangalan/lungsod ng merchant, transaction ID, at mga halaga sa BRL.',
        'AusPayNet/NPP PayID (Australia): Sistema ng PayID ng Australian New Payments Platform. Sinusuportahan ang mga uri ng PayID (email, mobile, ABN, organisation ID) o tradisyonal na BSB + numero ng account. Opsyonal ang pangalan ng merchant dahil nakikita ng mga nagbabayad ang nakarehistrong pangalan mula sa NPP lookup.',
      ],
    },
    {
      heading: 'Mga Pagbabayad sa Cryptocurrency',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): Mga karaniwang URI ng pagbabayad sa cryptocurrency na may wallet address, opsyonal na halaga, at label. Compatible sa lahat ng pangunahing Bitcoin at Litecoin wallet.',
        'Lightning Network (BOLT11): Mga invoice ng pagbabayad sa Lightning Network. Mag-paste ng BOLT11 encoded invoice string para sa instant na pagbabayad ng Bitcoin na may minimal na bayarin.',
        'Ethereum (EIP-681): Mga URI ng transaction request sa Ethereum na sumusuporta sa native ETH transfer at ERC-20 token transfer. Kasama ang chain ID para sa multi-network support (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), mga parameter ng gas, at mga contract function call.',
      ],
    },
    {
      heading: 'Mga Serbisyo ng Payment Link',
      bullets: [
        'PayPal.Me: Mga PayPal payment link na may username at opsyonal na pre-filled na halaga. Maaaring magbayad ang mga tatanggap sa pamamagitan ng PayPal balance, mga card, o mga bank account.',
        'Cash App: Mga Cash App payment link gamit ang $cashtag na may opsyonal na halaga. Sikat sa Estados Unidos para sa peer-to-peer na pagbabayad.',
      ],
    },
    {
      heading: 'Generic EMV QR',
      bullets: [
        'EMV Generic: Gumawa ng mga custom na EMV Merchant-Presented Mode QR code para sa mga scheme ng pagbabayad na hindi partikular na nakalista. I-configure ang pangalan ng merchant, lungsod, country code (ISO 3166-1), currency code (ISO 4217 numeric), MCC, mga opsyon sa tip/convenience fee, at mga karagdagang field ng data. Kapaki-pakinabang para sa pagsubok o custom na integration.',
      ],
    },
    {
      heading: 'Mga Blend Mode ng Overlay (Propesyonal)',
      paragraphs: ['Mga karagdagang blend mode sa antas na Propesyonal:'],
      bullets: [
        'Pixelate: Epektong pixelated overlay.',
        'Balangkas: Overlay ng pagtukoy ng gilid na nagpapakita lamang ng mga contour.',
        'Alon: Epekto ng kulot na distorsyon.',
        'Laki ng Subpixel: Pabagu-bagong laki ng subpixel batay sa imahe.',
        'Tunay na Dither: Masusing dithering na may maayos na pagpili ng matrix.',
        'Extreme: Pinakamataas na visibility ng imahe, maaaring makaapekto sa kakayahang i-scan.',
      ],
    },
    {
      heading: 'Mga Setting ng Proteksyon',
      paragraphs: [
        'Maingat na kontrol kung aling mga elemento ng QR ang protektado mula sa pagbabago ng overlay:',
      ],
      bullets: [
        'Panatilihin ang Timing: Panatilihing hindi nababago ang mga pattern ng timing.',
        'Panatilihin ang Pagkakahanay: Panatilihing hindi nababago ang mga pattern ng pagkakahanay.',
        'Protektahan ang Impormasyon sa Format: Mga module ng impormasyon sa format na Shield.',
        'Protektahan ang Impormasyon sa Bersyon: Mga module ng impormasyon sa bersyon na may kalasag.',
      ],
    },
    {
      heading: 'Mode na May Kamalayan sa ECC',
      paragraphs: [
        'Matalinong ipinamamahagi ang intensidad ng overlay batay sa kapasidad ng pagwawasto ng error. Sinusuri ng sistema kung aling mga module ang maaaring baguhin habang pinapanatili ang kakayahang i-scan.',
      ],
      bullets: [
        'Badyet sa Panganib: Porsyento ng kakayahang magamit sa pagwawasto ng error (0-100%).',
        'Mas mataas na badyet = mas nakikitang overlay ngunit mas mapanganib ang kakayahang ma-scan.',
        'Mas mababang badyet = mas ligtas na pag-scan ngunit hindi gaanong nakikitang overlay.',
      ],
    },
    {
      heading: 'Mga Opsyon sa Propesyonal na Pag-render',
      paragraphs: ['Mga advanced na kontrol sa pag-render:'],
      bullets: [
        'Malinaw na mga Gilid: Gumamit ng pixelated na pag-render ng imahe para sa matutulis na mga gilid ng module.',
        'Pixel Snap: Pag-align ng pixel sa Sahig, Bilog, o Kisame.',
        'Mode ng Kulay Bawat Modyul: Solid, Ayon sa Liwanag, Ayon sa Posisyon, Ayon sa Overlay, Ayon sa Kumpol.',
        'Paleta ng Kulay: Tukuyin ang pasadyang paleta ng kulay para sa pangkulay kada modyul.',
        'Contrast Guard: Tiyakin ang pinakamababang contrast ratio sa pagitan ng mga kulay.',
        'Minimum Contrast Ratio: Kinakailangan sa contrast na istilo ng WCAG (1:1 hanggang 21:1).',
        'Mga Karagdagang Module ng Hangganan: Karagdagang hangganan na lampas sa tahimik na sona.',
      ],
    },
    {
      heading: 'Mga Opsyon sa Propesyonal na Output',
      paragraphs: ['Mga setting ng pag-export ng enterprise:'],
      bullets: [
        'DPI: Itakda ang resolusyon sa pag-print (72-600 DPI). 300 DPI ang inirerekomenda para sa pag-print.',
        'Isama ang Quiet Zone: I-toggle ang quiet zone sa mga dimensyon ng output.',
        'I-export Bilang Karagdagang: Bumuo ng PDF kasama ng pangunahing format.',
      ],
    },
    {
      heading: 'Mga Setting ng Animasyon (Propesyonal)',
      paragraphs: ['Mga karagdagang tampok ng propesyonal na animation:'],
      bullets: [
        'Temporal Dither: Naka-off, Blue Noise, o Flicker Safe per-frame dithering.',
        'Pattern: Wala, Pulso, Alon, Scanline, Kumikinang, o Mga Epektong Naaanod.',
      ],
    },
    {
      heading: 'Sanggunian ng API',
      paragraphs: [
        'Nagbibigay ang ANQR ng server-side API para sa pagbuo ng mga QR code sa pamamagitan ng mga parameter ng URL. Ito ay perpekto para sa pag-embed ng mga QR code sa mga website, email, dokumento, o automated na workflow nang walang client-side JavaScript.',
        'Base URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Mga Pangunahing Parameter"',
      paragraphs: [
        'Mga kinakailangan at karaniwang parameter (hindi isinasalin ang mga pangalan ng parameter):',
      ],
      bullets: [
        'data (kinakailangan): Ang content na ie-encode sa QR code. I-URL-encode ang mga espesyal na karakter.',
        'size: Laki ng imahe sa pixels (default: 400, max: 2000). Ginagamit kung hindi tinukoy ang w/h.',
        'w, h: Lapad at taas ng output sa pixels. Nag-o-override sa size parameter.',
        'format: Format ng output — png, webp, o gif (default: png).',
        'ec: Antas ng pagwawasto ng error — L, M, Q, o H (default: H).',
        'fg: Kulay ng foreground bilang hex na walang # (default: 000000).',
        'bg: Kulay ng background bilang hex na walang # (default: ffffff).',
        'transparent: Itakda sa 1 para sa transparent na background.',
        'margin: Tahimik na sona sa mga module (default: 4).',
      ],
    },
    {
      heading: 'Mga Parameter ng Istilo"',
      paragraphs: ['Pag-istilo ng module at pattern:'],
      bullets: [
        'style: Istilo ng module — square, rounded, dots, diamond, connected.',
        'finder: Istilo ng finder pattern — square, rounded, circle.',
        'align: Istilo ng alignment pattern — match_finder, square, rounded, circle.',
        'timing: Istilo ng timing pattern — match_module, solid, dashed.',
        'radius: Porsyento ng radius ng sulok 0-100.',
        'gap: Porsyento ng gap ng module 0-50.',
        'gapMode: Mode ng gap — none, inset, stroke, negative_space.',
        'eyeOuter, eyeInner: Mga istilo ng mata — square, rounded, circle.',
        'eyeScale: Porsyento ng scale ng mata (default: 100).',
        'grad: Uri ng gradient — none, linear, radial, conic.',
        'gradAngle: Anggulo ng gradient para sa mga linear gradient.',
        'gradStops: Mga gradient stop bilang color1,pos1,color2,pos2,... (hal., ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Mga Parameter ng Overlay"',
      paragraphs: ['Mga opsyon ng image overlay (kinukuha ang overlay image sa server-side):'],
      bullets: [
        'img: URL sa overlay image (dapat na publicly accessible).',
        'mode: Mode ng overlay — center, halftone, blend, brightness, mosaic, dithered, blue-noise, subpixel.',
        'intensity: Intensity ng overlay 0-100 (default: 100).',
        'colorMode: Color mode ng overlay — color, grayscale, bw.',
        'fit: Paano umaakma ang overlay — cover, contain, stretch.',
        'rot: Rotasyon ng overlay sa degrees.',
        'flipX, flipY: Itakda sa 1 upang i-flip ang overlay.',
        'keepFinders: Panatilihin ang mga finder pattern (default: 1).',
        'keepTiming, keepAlign: Itakda sa 1 upang panatilihin ang timing/alignment pattern.',
      ],
    },
    {
      heading: 'Mga Parameter ng Preprocessing"',
      paragraphs: ['Image preprocessing na inilalapat sa overlay:'],
      bullets: [
        'brightness: Pagsasaayos -100 hanggang 100 (default: 0).',
        'contrast: Pagsasaayos -100 hanggang 100 (default: 0).',
        'gamma: Halaga 0.1 hanggang 3 (default: 1).',
        'saturation: Pagsasaayos -100 hanggang 100 (default: 0).',
        'hue: Rotasyon ng hue sa degrees.',
        'blur: Blur sa pixels.',
        'sharpen: Halaga ng sharpen 0-100.',
        'posterize: Mga antas ng posterize.',
        'threshold: Binary threshold 0-255.',
        'edge: Edge detection — off, sobel, canny.',
        'invert: Itakda sa 1 upang i-invert ang mga kulay.',
      ],
    },
    {
      heading: 'Mga Parameter ng Watermark"',
      paragraphs: ['Magdagdag ng mga watermark sa mga nabuong QR code:'],
      bullets: [
        'wmEn: Itakda sa 1 upang paganahin ang watermark.',
        'wmKind: Uri ng watermark — text, image, pattern.',
        'wmText: Text ng watermark (URL-encoded).',
        'wmImg: URL sa watermark image.',
        'wmPos: Posisyon — center, corners, edges, behind, quiet_zone.',
        'wmOpacity: Opacity 0-100 (default: 50).',
        'wmBlend: Blend mode — normal, multiply, screen, overlay.',
      ],
    },
    {
      heading: 'Mga Parameter ng Animation"',
      paragraphs: ['Para sa animated GIF output (nangangailangan ng format=gif):'],
      bullets: [
        'animPattern: Pattern ng animation — none, pulse, wave, scanline, shimmer, drift, color_cycle.',
        'animFrames: Bilang ng mga frame 1-60 (default: 24).',
        'animSpeed: Delay ng frame sa milliseconds 10-1000 (default: 100).',
        'animSeed: Random seed para sa animation.',
        'easing: Easing ng animation — linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Mga Parameter ng Output"',
      paragraphs: ['Mga opsyon ng format ng output:'],
      bullets: [
        'quality: Kalidad ng WebP 0-1 (default: 0.9).',
        'webpQ: Kalidad ng WebP 0-100 (default: 90).',
        'gifColors: Laki ng GIF palette 2-256 (default: 256).',
        'dpi: Output DPI para sa PNG (default: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: Mga field ng PNG metadata.',
      ],
    },
    {
      heading: 'Halimbawa ng Paggamit"',
      paragraphs: [
        'Pangunahing QR code:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Naka-istilo na QR code na may custom na mga kulay:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR code na may overlay image:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'Animated GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Pag-embed ng mga QR Code',
      paragraphs: [
        'Sa Professional mode, ang Share feature ay bumubuo ng embeddable na HTML at mga URL. Narito kung paano gumagana ang pag-embed:',
      ],
      bullets: [
        'Share Link: Gumagawa ng URL sa ANQR app na may lahat ng iyong mga setting na naka-encode bilang mga URL parameter. Maaaring tingnan at baguhin ng mga tatanggap ang QR code.',
        'Embed Image: Bumubuo ng <img> tag na nakaturo sa server API. Ang QR code ay nire-render sa server-side at ibinibigay bilang imahe.',
        'Embed Markdown: Gumagawa ng Markdown image syntax para sa dokumentasyon at mga README file.',
        'Direct API URL: Ang raw API URL para sa paggamit sa mga application, script, o iba pang integration.',
      ],
    },
    {
      heading: 'Halimbawa ng HTML',
      paragraphs: [
        'Upang mag-embed ng QR code sa iyong website:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="QR Code" />',
        'Para sa responsive sizing:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="QR Code" style="max-width: 100%; height: auto;" />',
        'Ang server ay nagca-cache ng mga response na may mahabang cache header, kaya ang paulit-ulit na request para sa parehong URL ay mabilis.',
      ],
    },
    {
      heading: 'Format ng Share URL',
      paragraphs: [
        'Kapag nag-click ka ng Share sa Professional mode, ini-encode ng ANQR ang iyong kasalukuyang mga setting sa mga URL parameter. Ang format ay:',
        'https://anqr.link/?data=...&ec=H&style=rounded&....',
        'Ang mga parameter na ito ay tumutugma sa mga API parameter, kaya maaari mong i-convert ang share URL sa API URL sa pamamagitan ng pagpapalit ng base path mula / sa /api/qr at pag-aayos ng mga w/h parameter kung kinakailangan.',
        'Paalala: Ang mga overlay image na na-upload mula sa mga lokal na file ay hindi maaaring ibahagi sa pamamagitan ng URL — ang mga URL-based na overlay lamang (img parameter) ang gumagana sa mga shared link at API call.',
      ],
    },
    {
      heading: 'Mga Rate Limit at Paggamit"',
      paragraphs: [
        'Ang API ay libreng gamitin para sa mga makatwirang dami. Para sa mataas na dami ng paggamit o mga komersyal na application na nangangailangan ng garantisadong uptime, mangyaring makipag-ugnayan sa amin.',
        'Kasama sa mga API response ang agresibong caching header. Para sa pinakamahusay na pagganap, mag-cache ng mga response sa iyong panig o gumamit ng parehong URL nang tuluy-tuloy para sa magkaparehong mga QR code.',
      ],
    },
    {
      heading: 'Mga Pinakamahuhusay na Gawi',
      paragraphs: ['Sundin ang mga alituntuning ito para sa maaasahang mga QR code:'],
      bullets: [
        'Laging subukan ang iyong mga QR code gamit ang maraming scanner app bago mag-print.',
        'Gamitin ang Pagwawasto ng Error H (Mataas) kapag nagdaragdag ng mga overlay.',
        'Magpanatili ng kahit 4 na modyul ng tahimik na sona (margin).',
        'Siguraduhin ang mataas na contrast sa pagitan ng foreground at background.',
        'Para sa pag-print, gumamit ng kahit man lang 300 DPI at subukan sa aktwal na laki ng pag-print.',
        'Paganahin ang Preserve Finder Patterns kapag gumagamit ng mga overlay.',
        'Magsimula sa mas mababang intensidad ng overlay at unti-unting dagdagan.',
        'Para sa panlabas na gamit, isaalang-alang ang mas malalaking sukat ng modyul at mas mataas na pagwawasto ng error.',
      ],
    },
    {
      heading: 'Pag-troubleshoot',
      paragraphs: ['Mga karaniwang isyu at solusyon:'],
      bullets: [
        'Ayaw mag-scan ng QR: Bawasan ang tindi ng overlay, dagdagan ang pagwawasto ng error, suriin ang contrast.',
        'Masyadong malaki ang code: Bawasan ang haba ng nilalaman, gumamit ng URL shortener, mas mababang bersyon.',
        'Malabo na output: Dagdagan ang laki ng module, gumamit ng PNG sa halip na mga naka-compress na format.',
        'Mali ang hitsura ng mga kulay: Suriin ang contrast ng kulay, subukan ang grayscale overlay mode.',
        'Hindi nag-a-animate ang GIF: Siguraduhing ginagamit ang output na format ng GIF, tingnan ang bilang ng frame.',
        'Hindi naglo-load ang overlay ng imahe: Suriin ang mga pahintulot ng CORS sa mga malalayong imahe.',
      ],
    },
    {
      heading: 'Mga Shortcut sa Keyboard',
      paragraphs: [
        'Sinusuportahan ng ANQR ang mga karaniwang shortcut sa keyboard. Gamitin ang Ctrl/Cmd+S para i-trigger ang export (kapag nakatuon sa preview).',
      ],
    },
    {
      heading: 'Pagbabahagi at Pag-embed',
      paragraphs: [
        'Sa Professional mode, i-click ang button na Share para kopyahin ang URL gamit ang kasalukuyan mong mga setting. Maaaring buksan ng mga tatanggap ang URL na ito para makita ang eksaktong configuration mo. Paalala: Hindi maaaring ibahagi sa pamamagitan ng URL ang mga overlay na larawan mula sa mga lokal na file.',
      ],
    },
  ],
};

export default docs;
