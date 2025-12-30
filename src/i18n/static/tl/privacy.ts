import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'Patakaran sa Pagkapribado',
  description: 'Impormasyon na kinokolekta ng ANQR, kung paano ito ginagamit, at ang iyong mga karapatan sa ilalim ng naaangkop na mga batas sa privacy.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Buod',
      paragraphs: [
        'Ang ANQR ay isang QR code generator na ganap na tumatakbo sa iyong device. Hindi ka namin hinihiling na gumawa ng account, at ang mga QR code ay lokal na nabubuo - wala kaming access sa nilalamang iyong ine-encode.',
        'Ginagamit namin ang Google AdSense para sa advertising at maaaring gumamit ng mga serbisyo ng analytics. Nangongolekta ang mga serbisyong ito ng impormasyon sa pamamagitan ng cookies at mga katulad na teknolohiya. Ipinapaliwanag ng patakarang ito kung anong data ang kinokolekta, kung paano ito ginagamit, at ang iyong mga karapatan.',
      ],
    },
    {
      heading: 'Impormasyon na aming kinokolekta',
      bullets: [
        'Impormasyon na iyong ibibigay: Kung makikipag-ugnayan ka sa amin sa pamamagitan ng email o sa aming contact form, kokolektahin namin ang iyong pangalan, email address, at nilalaman ng mensahe.',
        'Awtomatikong kinokolektang impormasyon: Ang aming hosting provider (Netlify), mga kasosyo sa advertising, at mga serbisyo ng analytics ay maaaring mangolekta ng: IP address, uri at bersyon ng browser, operating system, uri ng device, referring URL, mga pahinang binisita, oras sa site, at tinatayang lokasyong heograpiko.',
        'Mga third-party cookies: Ang aming mga kasosyo sa advertising (Google AdSense) ay gumagamit ng mga cookies at mga katulad na teknolohiya upang maghatid at sumukat ng mga advertisement. Ang ANQR mismo ay hindi nagtatakda ng anumang first-party cookies.',
      ],
    },
    {
      heading: 'Mga cookie at mga teknolohiya ng ikatlong partido',
      paragraphs: [
        'Hindi nagtatakda ang ANQR ng anumang first-party cookies. Ang iyong mga kagustuhan (tulad ng dark mode) ay nakaimbak nang lokal sa iyong device, na hindi ipinapadala sa anumang server.',
        'Gayunpaman, maaaring gumamit ang aming mga kasosyo sa advertising (Google AdSense) at tagapagbigay ng hosting ng cookies at mga katulad na teknolohiya sa pagsubaybay:',
      ],
      bullets: [
        'Mga cookies sa advertising (third-party): Itinakda ng Google AdSense at mga kasosyo sa advertising upang maghatid ng mga kaugnay na ad, sukatin ang pagganap ng ad, at maunawaan ang mga interes ng user. Maaaring subaybayan ng mga cookies na ito ang iyong aktibidad sa iba\'t ibang website.',
        'Mga cookie ng analytics (ikatlong partido): Maaaring gamitin ng aming tagapagbigay ng hosting o mga serbisyo ng analytics upang mangolekta ng hindi nagpapakilalang datos ng paggamit.',
      ],
    },
    {
      heading: 'Google AdSense at pag-aanunsyo',
      paragraphs: [
        'Nagpapakita kami ng mga advertisement sa pamamagitan ng Google AdSense. Gumagamit ang Google at ang mga kasosyo nito ng cookies upang maghatid ng mga ad batay sa iyong kasaysayan ng pag-browse sa site na ito at iba pang mga website (interest-based advertising).',
        'Alamin kung paano ginagamit ng Google ang iyong impormasyon: https://policies.google.com/technologies/partner-sites',
        'Pamahalaan ang pag-personalize ng ad: https://adssettings.google.com',
        'Mag-opt out sa pamamagitan ng Network Advertising Initiative: https://optout.networkadvertising.org',
        'Mag-opt out sa pamamagitan ng Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Paano namin ginagamit ang impormasyon',
      bullets: [
        'Upang tumugon sa iyong mga katanungan at magbigay ng suporta.',
        'Upang magpakita ng mga kaugnay na patalastas sa pamamagitan ng aming mga kasosyo sa advertising.',
        'Upang suriin ang paggamit ng site at pagbutihin ang aming mga serbisyo.',
        'Upang matukoy, maiwasan, at matugunan ang pandaraya, pang-aabuso, at mga isyu sa seguridad.',
        'Upang sumunod sa mga legal na obligasyon.',
      ],
    },
    {
      heading: 'Mga serbisyo ng ikatlong partido',
      bullets: [
        'Google AdSense: Tumatanggap ng datos upang maghatid at sumukat ng mga patalastas.',
        'Mga tagapagbigay ng analytics: Tumanggap ng hindi nagpapakilalang datos ng paggamit.',
        'Netlify (hosting): Pinoproseso ang mga kahilingan at maaaring mag-log ng mga IP address.',
        'Hindi namin ibinebenta ang iyong personal na impormasyon. Gayunpaman, ang pagbabahagi ng data sa mga kasosyo sa advertising ay maaaring ituring na isang pagbebenta sa ilalim ng CCPA (tingnan sa ibaba).',
      ],
    },
    {
      heading: 'Pagpapanatili ng datos',
      bullets: [
        'Mga pagsusumite ng contact: Hanggang 2 taon.',
        'Mga tala ng server: Hanggang 30 araw (tagapagbigay ng hosting).',
        'Data ng Analytics: Hanggang 26 na buwan (hindi nagpapakilala).',
        'Mga cookie sa advertising: Karaniwang 13 buwan (nag-iiba depende sa kasosyo).',
      ],
    },
    {
      heading: 'Ang iyong mga karapatan sa ilalim ng GDPR (mga gumagamit ng EEA)',
      paragraphs: [
        'Kung ikaw ay nasa European Economic Area, mayroon kang mga sumusunod na karapatan sa ilalim ng General Data Protection Regulation:',
      ],
      bullets: [
        'Karapatang maka-access: Humingi ng kopya ng personal na datos na hawak namin tungkol sa iyo.',
        'Karapatan sa pagwawasto: Humiling ng pagwawasto ng hindi tumpak na datos.',
        'Karapatang burahin: Humiling ng pagbura ng iyong datos (karapatang makalimutan).',
        'Karapatang paghigpitan ang pagproseso: Humiling ng mga limitasyon sa kung paano namin ginagamit ang iyong data.',
        'Karapatan sa kadalian ng pagdadala ng datos: Hilingin ang iyong datos sa isang portable na format.',
        'Karapatang tumutol: Tumutol sa pagproseso, kabilang ang para sa direktang pagmemerkado.',
        'Karapatang bawiin ang pahintulot: Bawiin ang pahintulot anumang oras kung saan ang pagproseso ay batay sa pahintulot.',
        'Karapatang maghain ng reklamo: Maghain ng reklamo sa iyong awtoridad sa proteksyon ng datos.',
      ],
    },
    {
      heading: 'Legal na batayan ng GDPR',
      paragraphs: [
        'Pinoproseso namin ang datos batay sa mga sumusunod: (a) Pahintulot - para sa personalized na advertising (pinamamahalaan ng aming mga kasosyo sa advertising); (b) Mga lehitimong interes - para sa analytics, seguridad, at pagpapabuti; (c) Kontrata - upang tumugon sa mga katanungan.',
        `Para magamit ang iyong mga karapatan, makipag-ugnayan sa ${CONTACT_EMAIL}. Tutugon kami sa loob ng 30 araw.`,
      ],
    },
    {
      heading: 'Ang iyong mga karapatan sa ilalim ng CCPA (mga gumagamit ng California)',
      bullets: [
        'Karapatang malaman: Humingi ng impormasyon tungkol sa nakalap na datos, mga pinagmulan, mga layunin, at mga ikatlong partido.',
        'Karapatang magbura: Humiling ng pagbura ng iyong personal na impormasyon.',
        'Karapatang mag-opt-out: Mag-opt out sa pagbebenta ng personal na impormasyon (maaaring maging kwalipikado ang pagbabahagi sa mga kasosyo sa ad).',
        'Karapatan sa kawalan ng diskriminasyon: Hindi kami mandidiskrimina dahil sa paggamit ng iyong mga karapatan.',
      ],
    },
    {
      heading: 'Mga kategorya ng CCPA na nakolekta',
      paragraphs: [
        'Mga Kategorya: Mga Tagatukoy (IP address, ID ng device), Aktibidad sa Internet (pag-browse, mga interaksyon sa ad), Geolocation (tinatayang), Mga Hinuha (mga interes mula sa pag-browse).',
        `Para gamitin ang mga karapatan o mag-opt out: ${CONTACT_EMAIL} o isaayos ang mga setting ng cookie.`,
      ],
    },
    {
      heading: 'Mga internasyonal na paglilipat',
      paragraphs: [
        'Maaaring ilipat ang iyong impormasyon sa mga bansang may iba\'t ibang batas sa proteksyon ng datos, kabilang ang Estados Unidos. Gumagamit kami ng mga naaangkop na pananggalang tulad ng Mga Karaniwang Klausula ng Kontrata.',
      ],
    },
    {
      heading: 'Pagiging pribado ng mga bata',
      paragraphs: [
        `Ang ANQR ay hindi para sa mga batang wala pang 13 taong gulang (o 16 sa EEA). Hindi namin sadyang nangongolekta ng datos mula sa mga bata. Makipag-ugnayan sa ${CONTACT_EMAIL} kung naniniwala kang nagbigay ng impormasyon ang isang bata.`,
      ],
    },
    {
      heading: 'Seguridad',
      paragraphs: [
        'Gumagamit kami ng mga naaangkop na teknikal at organisasyonal na hakbang upang protektahan ang datos, kabilang ang HTTPS encryption. Gayunpaman, walang transmisyon sa internet ang 100% ligtas.',
      ],
    },
    {
      heading: 'Huwag Subaybayan',
      paragraphs: [
        'Iginagalang namin ang mga signal ng browser na Huwag Subaybayan kung saan posible, bagama\'t maaaring hindi tumugon ang mga kasosyo sa advertising sa DNT.',
      ],
    },
    {
      heading: 'Mga pagbabago sa patakarang ito',
      paragraphs: [
        'Maaari naming i-update ang patakarang ito nang pana-panahon. Ang petsang Huling na-update ay nagpapahiwatig ng pinakabagong rebisyon. Ang mga mahahalagang pagbabago ay maaaring ipaalam sa pamamagitan ng isang banner ng site.',
      ],
    },
    {
      heading: 'Makipag-ugnayan sa amin',
      paragraphs: [
        `Para sa mga tanong tungkol sa privacy o para gamitin ang iyong mga karapatan: ${CONTACT_EMAIL} o gamitin ang aming pahina ng Makipag-ugnayan. Tumutugon kami sa mga kahilingan sa privacy sa loob ng 30 araw.`,
      ],
    },
  ],
}
