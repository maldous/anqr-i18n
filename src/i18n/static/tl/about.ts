import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: 'Tungkol sa ANQR',
  description: 'Ang ANQR ay isang libreng QR code generator na ganap na tumatakbo sa iyong device - hindi kinakailangan ng account.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ano ang ANQR?',
      paragraphs: [
        'Ang ANQR (binibigkas na anchor) ay isang libreng QR code generator na tumatakbo nang lokal sa iyong device at lumilikha ng mga scannable code para sa mga URL, text, Wi-Fi credential, contact card, mga kaganapan sa kalendaryo, at marami pang iba.',
        'Ito ay ginawa para sa mga indibidwal, maliliit na negosyo, marketer, at developer na nagnanais ng malalakas na QR tool nang hindi nag-a-upload ng mga file o nagsa-sign up. Ang iyong data ay nananatili sa iyong device.',
      ],
    },
    {
      heading: 'Mga Pangunahing Tampok',
      bullets: [
        'Gumawa agad ng mga QR code sa iyong device - hindi na kailangan ng pag-upload ng server, hindi na kailangan ng account.',
        'I-customize ang mga kulay, istilo ng modyul, pattern ng finder, at magdagdag ng mga overlay ng imahe.',
        'I-export sa iba\'t ibang format: PNG, SVG, WebP, at animated GIF.',
        'Mga advanced na kontrol para sa antas ng pagwawasto ng error, bersyon ng QR, mode ng pag-encode, at pagpili ng mask.',
        'Gabay sa kaligtasan ng pag-scan at live preview upang makatulong na mapanatiling nababasa ang mga code sa print at sa mga screen.',
        'Gumagana offline kapag na-load na - ito ay isang static na web app na maaari mong patakbuhin kahit saan.',
      ],
    },
    {
      heading: 'Paano gumagana ang ANQR',
      paragraphs: [
        'Tumatakbo ang ANQR sa iyong browser at ini-encode ang iyong input sa isang karaniwang QR matrix gamit ang Reed–Solomon error correction, pagkatapos ay nire-render ito sa format na iyong pipiliin.',
        'Lahat ng henerasyon ay nangyayari nang lokal. Kapag nagdagdag ka ng mga overlay o animation, binabalanse ng ANQR ang estilo at ang pagiging maaasahan ng pag-scan upang ang resulta ay manatiling maaaring i-scan.',
        'Nakatuon ang ANQR sa mga static code (ang datos ay nasa loob ng QR). Kung kailangan mo ng dynamic code (maaaring i-edit na destinasyon), maaari mong i-encode ang sarili mong redirect URL o maikling link.',
      ],
    },
    {
      heading: 'Sino ang nagpapatakbo ng ANQR?',
      paragraphs: [
        'Ang ANQR ay pinapatakbo bilang isang independiyenteng tool sa web. Para sa mga katanungan, suporta, o mga katanungan sa negosyo, mangyaring gamitin ang pahina ng Makipag-ugnayan o email' + CONTACT_EMAIL + '.',
      ],
    },
    {
      heading: 'Pag-aanunsyo at kung paano tayo nananatiling malaya',
      paragraphs: [
        'Libreng gamitin ang ANQR at sinusuportahan ito ng mga patalastas. Maaari kaming magpakita ng mga patalastas sa pamamagitan ng Google AdSense at/o iba pang mga kasosyo sa patalastas.',
        'Maaaring gumamit ang mga tagapagbigay ng ad ng cookies o mga katulad na teknolohiya upang i-personalize ang mga ad batay sa iyong mga interes at aktibidad sa pag-browse. Maaari mong pamahalaan ang mga kagustuhan sa ad sa mga setting ng iyong device at sa pamamagitan ng mga setting ng Google ad, at matuto nang higit pa sa aming Patakaran sa Pagkapribado.',
        'Hindi namin ibinebenta ang nilalamang iko-encode ninyo sa mga QR code. Nakakatulong ang mga ad sa pagbabayad ng gastos sa pagpapatakbo at pagpapabuti ng proyekto.',
      ],
    },
    {
      heading: 'Mga bukas na pamantayan',
      paragraphs: [
        'Bumubuo ang ANQR ng mga QR code batay sa pamantayang ISO/IEC 18004 at naglalayong magkaroon ng malawak na pagkakatugma sa mga scanner, camera, at mga daloy ng trabaho sa pag-print.',
      ],
    },
    {
      heading: 'Paunawa ng trademark',
      paragraphs: [
        'Ang QR Code® ay isang rehistradong trademark ng DENSO WAVE INCORPORATED. Ang ANQR ay walang kaugnayan, ineendorso, o iniisponsor ng DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Mga puna at kontribusyon',
      paragraphs: [
        'Tinatanggap namin ang feedback, mga ulat ng bug, at mga mungkahi sa feature. Mangyaring makipag-ugnayan sa amin sa pamamagitan ng email o sa pahina ng pakikipag-ugnayan - binabasa namin ang bawat mensahe, bagama\'t maaaring mag-iba ang mga oras ng pagtugon.',
      ],
    },
  ],
};

export default about;
