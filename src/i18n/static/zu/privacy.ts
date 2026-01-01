import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '"Inqubomgomo Yobumfihlo”',
  description: '"Ulwazi oluqoqwa yi-ANQR, indlela olusetshenziswa ngayo, kanye namalungelo akho ngaphansi kwemithetho yobumfihlo esebenzayo.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Isifinyezo”',
      paragraphs: [
        '"I-ANQR iyisikhiqizi sekhodi ye-QR esinendlela yokubona iklayenti kuqala. Asidingi ukuthi udale i-akhawunti. Ngokuzenzakalelayo, amakhodi e-QR akhiqizwa endaweni yakho kusiphequluli sakho — asinakho ukufinyelela kokuqukethwe okufaka ikhodi.”',
        '"Ukuze kusetshenziswe ngobungcweti, i-ANQR inikeza i-API eseceleni kweseva ekhiqiza amakhodi e-QR kusuka kumapharamitha e-URL. Uma usebenzisa i-API, okuqukethwe kwakho kwe-QR kuyacutshungulwa kumaseva ethu ukuze kuboniswe isithombe, kodwa akugciniwe noma akulogwa.”',
        '"Sisebenzisa i-Google AdSense ekukhangiseni futhi singasebenzisa izinsizakalo zokuhlaziya. Lezi zinsizakalo ziqoqa ulwazi ngamakhukhi nobuchwepheshe obufanayo. Le nqubomgomo ichaza ukuthi yiluphi ulwazi oluqoqwayo, ukuthi lusetshenziswa kanjani, kanye namalungelo akho.”',
      ],
    },
    {
      heading: '"Ulwazi esiluqoqayo”',
      bullets: [
        '"Ulwazi olunikezayo: Uma usithinta nge-imeyili noma ifomu lethu lokuxhumana, siqoqa igama lakho, ikheli le-imeyili, kanye nokuqukethwe kwemiyalezo.”',
        '"Ulwazi oluqoqwe ngokuzenzakalelayo: Umhlinzeki wethu wokusingatha (i-Netlify), ozakwethu bokukhangisa, kanye nezinsizakalo zokuhlaziya zingase ziqoqe: ikheli le-IP, uhlobo lwesiphequluli kanye nenguqulo, uhlelo lokusebenza, uhlobo lwedivayisi, i-URL yokubhekisela, amakhasi avakashelwe, isikhathi esikusayithi, kanye nendawo eseduze.”',
        '"Amakhukhi eqembu lesithathu: Abalingani bethu bokukhangisa (i-Google AdSense) basebenzisa amakhukhi nobuchwepheshe obufanayo ukuze bakhonze futhi balinganise izikhangiso. I-ANQR ngokwayo ayibeki noma yimaphi amakhukhi eqembu lesithathu.”',
      ],
    },
    {
      heading: '"Amakhukhi nobuchwepheshe bezinkampani zangaphandle”',
      paragraphs: [
        '"I-ANQR ayibeki noma yimaphi amakhukhi eqembu lokuqala. Izintandokazi zakho (njengemodi emnyama) zigcinwa endaweni kudivayisi yakho, ezingadluliselwa kunoma iyiphi iseva.”',
        '"Kodwa-ke, ozakwethu bokukhangisa (i-Google AdSense) kanye nomhlinzeki wokusingatha bangasebenzisa amakhukhi kanye nobuchwepheshe obufanayo bokulandelela:”',
      ],
      bullets: [
        '"Amakhukhi okukhangisa (owesithathu): Asethwe yi-Google AdSense kanye nabalingani bokukhangisa ukuze bakhonze izikhangiso ezifanele, balinganise ukusebenza kwezikhangiso, futhi baqonde izintshisekelo zomsebenzisi. Lawa makhukhi angalandelela umsebenzi wakho kumawebhusayithi ahlukene.”',
        '"Amakhukhi e-Analytics (owesithathu): Angasetshenziswa umhlinzeki wethu wokusingathwa noma izinsizakalo ze-analytics ukuqoqa idatha yokusetshenziswa engaziwa.”',
      ],
    },
    {
      heading: '"I-Google AdSense kanye nokukhangisa”',
      paragraphs: [
        '"Sibonisa izikhangiso nge-Google AdSense. I-Google kanye nabalingani bayo basebenzisa amakhukhi ukuze banikeze izikhangiso ngokusekelwe emlandweni wakho wokuphequlula kule sayithi nakwamanye amawebhusayithi (ukukhangisa okusekelwe ezithakazelweni).”',
        '"Funda ukuthi i-Google isebenzisa kanjani ulwazi lwakho: https://policies.google.com/technologies/partner-sites”',
        '"Phatha ukwenza ngezifiso izikhangiso: https://adssettings.google.com”',
        '"Khetha ukuphuma nge-Network Advertising Initiative: https://optout.networkadvertising.org”',
        '"Khetha ukuphuma nge-Digital Advertising Alliance: https://optout.aboutads.info”',
      ],
    },
    {
      heading: '"Indlela esisebenzisa ngayo ulwazi”',
      bullets: [
        '"Ukuphendula imibuzo yakho nokunikeza ukwesekwa.”',
        '"Ukubonisa izikhangiso ezifanele ngabalingani bethu bokukhangisa.”',
        '"Ukuhlaziya ukusetshenziswa kwesayithi nokuthuthukisa izinsizakalo zethu.”',
        '"Ukuthola, ukuvimbela, nokubhekana nezinkinga zokukhwabanisa, ukuxhashazwa, kanye nezokuphepha.”',
        '"Ukuthobela izibopho zomthetho.”',
      ],
    },
    {
      heading: '"Izinsizakalo zeqembu lesithathu”',
      bullets: [
        '"I-Google AdSense: Yamukela idatha yokukhonza nokulinganisa izikhangiso.”',
        '"Abahlinzeki bezibalo: Thola idatha yokusetshenziswa engaziwa.”',
        '"I-Netlify (ukusingatha): Icubungula izicelo futhi ingangena ngemvume kumakheli e-IP.”',
        '"Asithengisi imininingwane yakho yomuntu siqu. Kodwa-ke, ukwabelana ngemininingwane nabalingani bokukhangisa kungabhekwa "njengokuthengisa” ngaphansi kwe-CCPA (bheka ngezansi).”',
      ],
    },
    {
      heading: '"Ukugcinwa kwedatha”',
      bullets: [
        '"Izithulo zokuxhumana: Kuze kube yiminyaka emi-2.”',
        '"Amalogi eseva: Kufika ezinsukwini ezingu-30 (umhlinzeki wokusingatha).”',
        '"Idatha yokuhlaziya: Kuze kufike ezinyangeni ezingama-26 (ayibonakali).”',
        '"Amakhukhi okukhangisa: Ngokuvamile izinyanga ezingu-13 (ziyahlukahluka ngomlingani).”',
      ],
    },
    {
      heading: '"Amalungelo akho ngaphansi kwe-GDPR (abasebenzisi be-EEA)”',
      paragraphs: [
        '"Uma use-European Economic Area, unamalungelo alandelayo ngaphansi koMthethonqubo Ojwayelekile Wokuvikelwa Kwedatha:”',
      ],
      bullets: [
        '"Ilungelo lokufinyelela: Cela ikhophi yedatha yomuntu siqu esinayo ngawe.”',
        '"Ilungelo lokulungiswa: Cela ukulungiswa kwedatha enganembile.”',
        '"Ilungelo lokusula: Cela ukususwa kwedatha yakho ("ilungelo lokukhohlwa").”',
        '"Ilungelo lokukhawulela ukucubungula: Cela imikhawulo yokuthi siyisebenzisa kanjani idatha yakho.”',
        '"Ilungelo lokuphatheka kwedatha: Cela idatha yakho ngefomethi ephathekayo.”',
        '"Ilungelo lokuphikisa: Ukuphikisana nokucutshungulwa, okuhlanganisa nokumaketha okuqondile.”',
        '"Ilungelo lokuhoxisa imvume: Ukuhoxisa imvume nganoma yisiphi isikhathi lapho ukucubungula kusekelwe esivumelwaneni.”',
        '"Ilungelo lokufaka isikhalazo: Faka isikhalazo egunyeni lakho lokuvikela idatha.”',
      ],
    },
    {
      heading: '"Isisekelo esisemthethweni se-GDPR”',
      paragraphs: [
        '"Sicubungula idatha ngalezi zisekelo: (a) Imvume — yokukhangisa okwenziwe ngezifiso (okuphethwe ngabalingani bethu bokukhangisa); (b) Izintshisekelo ezisemthethweni — zokuhlaziya, ukuphepha, kanye nokuthuthukiswa; (c) Inkontileka — yokuphendula imibuzo.”',
        '"Ukuze usebenzise amalungelo akho, xhumana no-${CONTACT_EMAIL}. Siphendula zingakapheli izinsuku ezingu-30.”',
      ],
    },
    {
      heading: '"Amalungelo akho ngaphansi kwe-CCPA (abasebenzisi baseCalifornia)”',
      bullets: [
        '"Ilungelo lokwazi: Cela ulwazi mayelana nedatha eqoqwe, imithombo, izinjongo, kanye nabantu besithathu.”',
        '"Ilungelo lokususa: Cela ukususwa kolwazi lwakho lomuntu siqu.”',
        '"Ilungelo lokuzikhipha: Ukuzikhipha "ekuthengisweni” kolwazi lomuntu siqu (ukwabelana nabalingani bezikhangiso kungafaneleka).”',
        '"Ilungelo lokungabandlululwa: Ngeke sibandlulule ngokusebenzisa amalungelo akho.”',
      ],
    },
    {
      heading: '"Izigaba ze-CCPA eziqoqiwe”',
      paragraphs: [
        '"Izigaba: Izikhombisi (ikheli le-IP, i-ID yedivayisi), umsebenzi we-inthanethi (ukuphequlula, ukusebenzisana kwezikhangiso), Indawo (cishe), Izincazelo (izintshisekelo ezivela ekuphequluleni).”',
        '"Ukusebenzisa amalungelo noma ukukhetha ukuphuma: ${CONTACT_EMAIL} noma ukulungisa izilungiselelo zamakhukhi.”',
      ],
    },
    {
      heading: '"Ukudluliselwa kwamanye amazwe”',
      paragraphs: [
        '"Ulwazi lwakho lungadluliselwa emazweni anemithetho ehlukene yokuvikela idatha, okuhlanganisa ne-United States. Sisebenzisa izindlela zokuvikela ezifanele njenge-Standard Contractual Clauses.”',
      ],
    },
    {
      heading: '"Ubumfihlo bezingane”',
      paragraphs: [
        '"I-ANQR ayiqondisiwe ezinganeni ezingaphansi kweminyaka engu-13 (noma engu-16 ku-EEA). Asiqoqi ngamabomu idatha evela ezinganeni. Xhumana no-${CONTACT_EMAIL} uma ukholelwa ukuthi ingane inikeze ulwazi.”',
      ],
    },
    {
      heading: '"Ukuphepha”',
      paragraphs: [
        '"Sisebenzisa izindlela ezifanele zobuchwepheshe kanye nezokuhlela ukuvikela idatha, okuhlanganisa nokubethela kwe-HTTPS. Kodwa-ke, akukho ukudluliswa kwe-inthanethi okuphephile ngokuphelele.”',
      ],
    },
    {
      heading: '"Ungalandeli”',
      paragraphs: [
        '"Siyawahlonipha amasignali esiphequluli se-Do Not Track lapho kungenzeka khona, yize ozakwethu bezokukhangisa bengase bangaphenduli ku-DNT.”',
      ],
    },
    {
      heading: '"Izinguquko kule nqubomgomo”',
      paragraphs: [
        '"Singabuyekeza le nqubomgomo njalo. Usuku "Lokugcina ukubuyekezwa” lubonisa ukubuyekezwa kwakamuva kakhulu. Izinguquko ezibalulekile zingadluliselwa ngesibhengezo sesayithi.”',
      ],
    },
    {
      heading: '"Xhumana nathi”',
      paragraphs: [
        '"Ngemibuzo yobumfihlo noma ukusebenzisa amalungelo akho: ${CONTACT_EMAIL} noma sebenzisa ikhasi lethu lokuxhumana. Siphendula izicelo zobumfihlo zingakapheli izinsuku ezingu-30.”',
      ],
    },
  ],
}

export default privacy;
