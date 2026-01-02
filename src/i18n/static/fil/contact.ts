import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Makipag-ugnayan sa Amin',
  description:
    'Tinatanggap namin ang feedback, mga ulat ng bug, mga kahilingan sa tampok, at mga pangkalahatang katanungan.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Paano kami makontak',
      paragraphs: [
        "Nag-aalok kami ng ilang paraan upang makipag-ugnayan sa amin depende sa iyong mga pangangailangan. Binabasa namin ang bawat mensahe, bagama't maaaring mag-iba ang mga oras ng pagtugon batay sa dami ng tao at uri ng pagtatanong.",
      ],
    },
    {
      heading: 'Email',
      paragraphs: [
        'Para sa lahat ng mga katanungan: ${CONTACT_EMAIL}',
        'Ito ang pinaka-maaasahang paraan upang makontak kami at inirerekomenda para sa mga detalyadong tanong, mga katanungan tungkol sa negosyo, o anumang iba pang mga katanungan.',
      ],
    },
    {
      heading: 'Mga Uri ng Pagtatanong',
      bullets: [
        'Mga pangkalahatang tanong: Mga tanong tungkol sa kung paano gamitin ang ANQR, mga paliwanag sa tampok, o pangkalahatang feedback.',
        'Mga ulat ng bug: Pakisama ang iyong browser, operating system, mga hakbang sa pagkopya, at anumang mga mensahe ng error na iyong nakikita.',
        "Mga kahilingan para sa tampok: Mga mungkahi para sa mga bagong tampok o pagpapabuti. Isinasaalang-alang namin ang lahat ng kahilingan bagama't hindi namin maipapangako ang pagpapatupad.",
        'Mga katanungan sa negosyo: Mga oportunidad sa pakikipagsosyo, mga katanungan sa paglilisensya, o mga katanungan sa paggamit ng komersyo.',
        'Mga kahilingan sa privacy: Mga kahilingan na gamitin ang iyong mga karapatan sa privacy sa ilalim ng GDPR, CCPA, o iba pang mga batas sa privacy (tingnan ang Patakaran sa Privacy).',
        'DMCA/Karapatang-ari: Tingnan ang seksyon ng DMCA sa ibaba para sa mga kinakailangan sa abiso ng pagtanggal.',
      ],
    },
    {
      heading: 'na Mga oras ng pagtugon',
      paragraphs: [
        'Layunin naming tumugon sa mga katanungan sa loob ng 5-7 araw ng negosyo. Ang mga kahilingang may kaugnayan sa privacy ay tutugunan sa loob ng 30 araw ayon sa hinihingi ng batas.',
        'Sa mga panahong abala, maaaring mas matagal ang oras ng pagtugon. Para sa mga apurahang bagay, mangyaring ilagay ang URGENT sa iyong subject line.',
      ],
    },
    {
      heading: 'Bago makipag-ugnayan sa amin',
      paragraphs: [
        'Pakitingnan ang aming pahina ng Dokumentasyon para sa mga sagot sa mga karaniwang tanong tungkol sa kung paano gamitin ang mga tampok ng ANQR. Maraming tanong tungkol sa pagbuo, pag-istilo, at mga opsyon sa pag-export ng QR code ang sakop doon.',
      ],
    },
    {
      heading: 'Mga Paunawa sa Karapatang-ari ng DMCA',
      paragraphs: [
        'Kung naniniwala kang ang nilalamang makukuha sa ANQR ay lumalabag sa iyong karapatang-ari, maaari kang magsumite ng isang paunawa sa pagtanggal ng kopya ng Digital Millennium Copyright Act (DMCA). Upang maging wasto, dapat kasama sa iyong paunawa ang:',
      ],
      bullets: [
        'Isang pisikal o elektronikong lagda ng may-ari ng karapatang-ari o awtorisadong ahente.',
        'Pagkilala sa akdang may karapatang-ari na inaangkin na nilabag.',
        'Pagkilala sa materyal na sinasabing lumalabag, na may sapat na impormasyon upang mahanap ito.',
        'Ang iyong impormasyon sa pakikipag-ugnayan (tirahan, numero ng telepono, at email address).',
        'Isang pahayag na mayroon kang mabuting pananampalataya na paniniwala na ang paggamit ng materyal ay hindi pinahihintulutan ng may-ari ng karapatang-ari.',
        'Isang pahayag, sa ilalim ng parusa ng perjury, na ang impormasyon sa iyong paunawa ay tumpak at ikaw ang may-ari ng copyright o awtorisadong kumilos para sa kanila.',
      ],
    },
    {
      heading: 'Pakikipag-ugnayan sa DMCA',
      paragraphs: [
        'Ipadala ang mga abiso ng DMCA sa: ${CONTACT_EMAIL}',
        'Pakilagay ang Paunawa ng DMCA sa subject line. Sasagot kami sa mga wastong abiso alinsunod sa naaangkop na batas. Tandaan na ang ANQR ay bumubuo ng mga QR code nang lokal sa mga device ng gumagamit at hindi nagho-host ng nilalamang binuo ng gumagamit.',
      ],
    },
  ],
};

export default contact;
