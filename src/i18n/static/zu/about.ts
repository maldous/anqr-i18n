import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Mayelana ne-ANQR',
  description: 'I-ANQR iyisikhiqizi samakhodi e-QR samahhala esinendlela yokuqagela iklayenti — khiqiza amakhodi e-QR endaweni noma sebenzisa i-API yethu ukuze ushumeke.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: 'Kuyini i-ANQR?',
      paragraphs: ['I-ANQR (ebizwa ngokuthi i-anchor) iyi-generator yamakhodi e-QR yamahhala edala amakhodi askenikayo ama-URL, umbhalo, iziqinisekiso ze-Wi-Fi, amakhadi okuxhumana, imicimbi yekhalenda, nokuningi.', 'Yakhelwe abantu ngabanye, amabhizinisi amancane, abathengisi, kanye nabathuthukisi abafuna amathuluzi e-QR anamandla ngaphandle kokubhalisa. Umklamo wokuqala weklayenti usho ukuthi amakhodi e-QR akhiqizwa endaweni yakho kusiphequluli sakho ngokuzenzakalelayo, nge-API yeseva yokuzikhethela yokushumeka nokuhlanganisa kobungcweti.'],
    },
    {
      heading: 'Izici Eziyinhloko',
      bullets: ['Khiqiza amakhodi e-QR ngokushesha kusiphequluli sakho — akudingeki i-akhawunti.', 'Yenza ngokwezifiso imibala, izitayela zamamojula, amaphethini okuthola, bese wengeza ukunqwabelanisa kwesithombe.', 'Thumela ngaphandle ngamafomethi amaningi: i-PNG, i-SVG, i-WebP, kanye ne-GIF egqwayizayo.', 'Izilawuli ezithuthukisiwe zezinga lokulungisa amaphutha, inguqulo ye-QR, imodi yokufaka ikhodi, kanye nokukhetha imaski.', 'Isiqondiso sokuphepha kokuskena kanye nokubuka kuqala bukhoma ukusiza ukugcina amakhodi efundeka ephrintiwe nasezikrinini.', 'I-API eseceleni kweseva yokushumeka kobungcweti ngokusekelwa okugcwele kwamapharamitha.', 'Isebenza ingaxhunyiwe ku-inthanethi uma isilayishiwe — uhlelo lokusebenza lwewebhu olungaguquki ongalusebenzisa noma kuphi.'],
    },
    {
      heading: 'Indlela i-ANQR esebenza ngayo',
      paragraphs: ['I-ANQR isebenza kusiphequluli sakho bese ifaka ikhodi yokufaka kwakho ku-QR matrix ejwayelekile ngokulungiswa kwamaphutha kaReed–Solomon, bese ikwenza kufomethi oyikhethayo.', 'Ngokuzenzakalelayo, ukwenziwa kwenzeka endaweni yakho kusiphequluli sakho. Ukuze kusetshenziswe ngobungcweti, ungasebenzisa futhi i-API eseceleni kweseva ukukhiqiza amakhodi e-QR ngamapharamitha e-URL — afanele ukushumeka kumawebhusayithi, ama-imeyili, noma imisebenzi ezenzakalelayo.', 'Uma ungeza ama-overlays noma ama-animation, i-ANQR ibhalansisa isitayela nokuthembeka kokuskena ukuze umphumela uhlale ungaskenwa.', 'I-ANQR igxile kumakhodi angaguquki (idatha ingaphakathi kwe-QR). Uma udinga ikhodi enamandla (indawo ehlelekayo), ungabhala ikhodi ye-URL yakho yokuqondisa kabusha noma isixhumanisi esifushane.'],
    },
    {
      heading: 'Ubani osebenzisa i-ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Ukukhangisa nokuthi sihlala kanjani sikhululekile',
      paragraphs: ['I-ANQR imahhala ukuyisebenzisa futhi isekelwa ukukhangisa. Singase sibonise izikhangiso nge-Google AdSense kanye/noma abanye ozakwethu bokukhangisa.', 'Abahlinzeki bezikhangiso bangasebenzisa amakhukhi noma ubuchwepheshe obufanayo ukwenza izikhangiso zibe ngezakho ngokusekelwe ezithakazelweni zakho kanye nomsebenzi wakho wokuphequlula. Ungaphatha izintandokazi zezikhangiso kuzilungiselelo zedivayisi yakho kanye nezilungiselelo zezikhangiso ze-Google, futhi ufunde kabanzi kuNqubomgomo yethu Yobumfihlo.', 'Asithengisi okuqukethwe okufaka ikhodi kumakhodi e-QR. Izikhangiso ziyasiza ekukhokheleni izindleko zokuqhuba nokuthuthukisa iphrojekthi.'],
    },
    {
      heading: 'Izindinganiso ezivulekile',
      paragraphs: ['I-ANQR ikhiqiza amakhodi e-QR asekelwe ku-ISO/IEC 18004 standard futhi ihlose ukuhambisana okubanzi kuzo zonke izikena, amakhamera, kanye nemisebenzi yokuphrinta.'],
    },
    {
      heading: 'Isaziso sophawu lokuhweba',
      paragraphs: ['I-QR Code® wuphawu lokuhweba olubhalisiwe lwe-DENSO WAVE INCORPORATED. I-ANQR ayixhunyanisiwe, ayivunyelwe, noma ayixhasiwe yi-DENSO WAVE INCORPORATED.'],
    },
    {
      heading: 'Impendulo kanye neminikelo',
      paragraphs: ['Siyakwamukela impendulo, imibiko yeziphazamiso, kanye neziphakamiso zezici. Sicela uxhumane nathi nge-imeyili noma ikhasi lokuxhumana — sifunda yonke imiyalezo, yize izikhathi zokuphendula zingahluka.'],
    },
  ],
};

export default about;
