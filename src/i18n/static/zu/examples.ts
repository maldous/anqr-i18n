import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /examples page with 5 comprehensive examples
// All string values are numeric ids that map to lines in en-GB.txt.
export const examples: PageDefinition = {
  title: 'Izibonelo ze-ANQR',
  description: 'Thola indawo elungile ongaqala ngayo nge-ANQR - kusukela kuMhlahlandlela Womsebenzisi ogcwele kuya kuma-athikili asebenzayo okufunda kanye nezibonelo esezenziwe.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Vula ijeneretha', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Vula Umhlahlandlela Womsebenzisi ogcwele', type: 'guide' },
  ],
  sections: [
    // Example 1: Uplift an Existing QR Campaign (759-770)
    {
      heading: 'Phakamisa Umkhankaso Okhona we-QR',
      paragraphs: ['Guqula ikhodi ye-QR engenalutho ibe inguqulo enophawu, elungiselelwe ukuphepha.'],
      images: [{ src: '/images/examples/uplift-overview.svg', alt: 'Phakamisa Umkhankaso Okhona we-QR', caption: 'Guqula ikhodi ye-QR engenalutho ibe inguqulo enophawu, elungiselelwe ukuphepha.' }],
    },
    {
      heading: 'Inselele',
      paragraphs: ['Unomkhankaso okhona wekhodi ye-QR - mhlawumbe amakhodi acacile amnyama namhlophe aphrintwe ezintweni zokumaketha. Amakhodi ayasebenza, kodwa awekho kubhrendi futhi angase abe nezilungiselelo eziphansi. Uthuthukisa kanjani ngaphandle kokuphula izikena ezikhona?'],
      images: [{ src: '/images/examples/uplift-before.svg', alt: 'Inselele', caption: 'Unomkhankaso okhona wekhodi ye-QR - mhlawumbe amakhodi acacile amnyama namhlophe aphrintwe ezintweni zokumaketha. Amakhodi ayasebenza, kodwa awekho kubhrendi futhi angase abe nezilungiselelo eziphansi. Uthuthukisa kanjani ngaphandle kokuphula izikena ezikhona?' }],
    },
    {
      heading: 'Isixazululo',
      paragraphs: ['Gcina i-URL efanayo yendawo kodwa dala kabusha ikhodi ye-QR nge-ANQR. Engeza ilogo yakho njengembondela emaphakathi, sebenzisa imibala yebhrendi, futhi unike amandla Imodi Yokuphepha ukuze uqinisekise ukuthi ikhodi ethuthukisiwe iskena ngokuthembekile. Okuqukethwe okubhalwe ngekhodi kuhlala kufana.'],
      images: [{ src: '/images/examples/uplift-after.svg', alt: 'Isixazululo', caption: 'Gcina i-URL efanayo yendawo kodwa dala kabusha ikhodi ye-QR nge-ANQR. Engeza ilogo yakho njengembondela emaphakathi, sebenzisa imibala yebhrendi, futhi unike amandla Imodi Yokuphepha ukuze uqinisekise ukuthi ikhodi ethuthukisiwe iskena ngokuthembekile. Okuqukethwe okubhalwe ngekhodi kuhlala kufana.' }],
    },
    {
      heading: 'Igxathu emvakwe gxathu',
      paragraphs: ['1. Faka i-URL yakho ekhona ku-ANQR. 2. Setha Ukulungiswa Kwephutha kube H (Phezulu). 3. Layisha ilogo yakho bese usetha imodi yokumbondela kokuthi \'Ilogo Emaphakathi\'. 4. Lungisa ukushuba kube ngu-60-70%. 5. Nika amandla okuthi \'Gcina Amaphethini Esitholi\'. 6. Faka imibala yomkhiqizo (gcina ukugqama okuphezulu). 7. Nika amandla Imodi Yokuphepha \'Ibhalansile\'. 8. Hlola ngezinhlelo zokusebenza zesithwebuli eziningi. 9. Thumela njenge-SVG ukuze uphrinte kube nezimo.'],
    },
    {
      heading: 'Kungani kusebenza',
      paragraphs: ['Ikhodi ye-QR ibhala i-URL efanayo, ngakho amakhodi akhona aphrintiwe namakhodi amasha anebhrendi ayasebenza womabili. Ukulungiswa kwephutha eliphezulu kunxephezela imbondela yelogo. Imodi yokuphepha iqinisekisa ukukhetha kwedizayini akuphazamisi ukuskena.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&ec=H#overlay', label: 'Dala kabusha ku-Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
      ],
    },

    // Example 2: Branded Retail Payment QR (771-782)
    {
      heading: 'I-QR Yenkokhelo Yokuthengisa Ephawulwe',
      paragraphs: ['Dala i-QR yokukhokha ebhalansisa ukumaketha nokuthembeka kweskeni.'],
      images: [{ src: '/images/examples/payment-overview.svg', alt: 'I-QR Yenkokhelo Yokuthengisa Ephawulwe', caption: 'Dala i-QR yokukhokha ebhalansisa ukumaketha nokuthembeka kweskeni.' }],
    },
    {
      heading: 'Inselele',
      paragraphs: ['Ibhizinisi lakho lokudayisa lidinga amakhodi e-QR okukhokha afana nobunikazi bomkhiqizo wakho kuyilapho lihlangabezana nezidingo eziqinile zesistimu yokukhokha. Amakhodi okukhokha ajwayelekile amnyama namhlophe ayasebenza kodwa aphuthelwa amathuba okufaka uphawu lwentengiso.'],
      images: [{ src: '/images/examples/payment-before.svg', alt: 'Inselele', caption: 'Ibhizinisi lakho lokudayisa lidinga amakhodi e-QR okukhokha afana nobunikazi bomkhiqizo wakho kuyilapho lihlangabezana nezidingo eziqinile zesistimu yokukhokha. Amakhodi okukhokha ajwayelekile amnyama namhlophe ayasebenza kodwa aphuthelwa amathuba okufaka uphawu lwentengiso.' }],
    },
    {
      heading: 'Isixazululo',
      paragraphs: ['Sebenzisa izifanekiso zokukhokha ze-ANQR (i-UPI, i-PayNow, i-SEPA, njll.) ezinophawu olulondolozayo. Engeza ilogo yakho ibe incane futhi imaphakathi, sebenzisa imibala yomkhiqizo ngaphambili kuyilapho ugcina ingemuva elimhlophe, futhi usebenzise ileveli ephezulu yokulungisa iphutha.'],
      images: [{ src: '/images/examples/payment-after.svg', alt: 'Isixazululo', caption: 'Sebenzisa izifanekiso zokukhokha ze-ANQR (i-UPI, i-PayNow, i-SEPA, njll.) ezinophawu olulondolozayo. Engeza ilogo yakho ibe incane futhi imaphakathi, sebenzisa imibala yomkhiqizo ngaphambili kuyilapho ugcina ingemuva elimhlophe, futhi usebenzise ileveli ephezulu yokulungisa iphutha.' }],
    },
    {
      heading: 'Izithiyo zokuklama',
      paragraphs: ['Amakhodi okukhokha kufanele askenwe ngaphansi kwesekhondi elingu-1 ukuze uthole ulwazi oluhle lwekhasimende. Lokhu kukhawulela ukuthi kungakanani ukwenza ngendlela oyifisayo okuphephile: ilogo engaphansi kuka-15% wendawo yekhodi, akukho ukuguqulwa kwephethini yesitholi, ubuncane bendawo ethule enemojuli engu-4, nokuhlola ngezinhlelo zokusebenza zokukhokha zangempela (hhayi nje izikena ezijwayelekile).'],
    },
    {
      heading: 'Izilungiselelo ezinconyiwe',
      paragraphs: ['Ukulungiswa Kwephutha: H (Phezulu). Indawo Ethule: 4+ amamojula. Isitayela Semojuli: Isikwele (esithembeke kakhulu). I-Logo Overlay: 50-60% ukuqina okukhulu. Imodi yokuphepha: Iqinile. Hlola njalo ngohlelo lwakho lokusebenza lokukhokha (i-Google Pay, izinhlelo zokusebenza zasebhange, njll.).'],
    },
    {
      heading: 'Kungani le ndlela isebenza',
      paragraphs: ['Ukufakwa kwebhrendi okulandelanayo kuqinisekisa ukuthi izinhlelo zokusebenza zokukhokha ziskena ngokushesha kuyilapho zisabonisa ubunikazi bomkhiqizo wakho. Indawo ethulile nokulungiswa kwamaphutha kunikeza umkhawulo wokuhluka kokuphrinta kanye nezici zemvelo endaweni yokuthengisa.'],
      links: [
        { href: '/?lang=${lang}&tab=professional&ec=H#payload', label: 'Dala kabusha ku-Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
      ],
    },

    // Example 3: Print Scaling: PNG vs SVG (783-794)
    {
      heading: 'Ukukala kokuphrinta: PNG vs SVG',
      paragraphs: ['Bona umehluko phakathi kwe-raster ne-vector kumasayizi amakhulu wokuphrinta.'],
      images: [{ src: '/images/examples/print-overview.svg', alt: 'Ukukala kokuphrinta: PNG vs SVG', caption: 'Bona umehluko phakathi kwe-raster ne-vector kumasayizi amakhulu wokuphrinta.' }],
    },
    {
      heading: 'Inselele',
      paragraphs: ['Udinga amakhodi e-QR ukuze uphrinte ifomethi enkulu — amaphosta, izibhengezo, noma izimpawu. Ukuthumela ngamaphikseli amancane amasayizi bese ukhuphula kukhiqiza amakhodi afiphele, okungenzeka angenakuskenwa.'],
      images: [{ src: '/images/examples/print-png-scaled.svg', alt: 'Inselele', caption: 'Udinga amakhodi e-QR ukuze uphrinte ifomethi enkulu — amaphosta, izibhengezo, noma izimpawu. Ukuthumela ngamaphikseli amancane amasayizi bese ukhuphula kukhiqiza amakhodi afiphele, okungenzeka angenakuskenwa.' }],
    },
    {
      heading: 'I-PNG ngosayizi wephosta',
      paragraphs: ['Ikhodi ye-QR ekhishelwe njenge-200×200px PNG bese ilinganiswa ku-30cm (12in) iba ngamaphikiseli ngokusobala. Amaphethelo emojuli ayafiphala ndawonye, ​​anciphisa ukugqama nokuthembeka kwesikena. Lokhu ukwehluleka okuvame kakhulu kwe-QR yokuphrinta.'],
      images: [{ src: '/images/examples/print-svg-scaled.svg', alt: 'I-PNG ngosayizi wephosta', caption: 'Ikhodi ye-QR ekhishelwe njenge-200×200px PNG bese ilinganiswa ku-30cm (12in) iba ngamaphikiseli ngokusobala. Amaphethelo emojuli ayafiphala ndawonye, ​​anciphisa ukugqama nokuthembeka kwesikena. Lokhu ukwehluleka okuvame kakhulu kwe-QR yokuphrinta.' }],
    },
    {
      heading: 'SVG ngosayizi wephosta',
      paragraphs: ['Ikhodi ye-QR efanayo ithunyelwa njengezikali ze-SVG ngokuphelele kunoma yimuphi usayizi. Amaphethelo emojuli ahlala ehlanzekile ngoba achazwe ngokwezibalo, hhayi amaphikseli. Lokhu kusebenza noma kuphrintwe ku-5cm noma ku-5 metres.'],
    },
    {
      heading: 'Khipha ukuhamba komsebenzi',
      paragraphs: ['Ku-ANQR: 1. Dizayina ikhodi yakho ye-QR kunoma yimuphi usayizi wokubuka kuqala. 2. Yiya kuzilungiselelo zokuphumayo. 3. Khetha Ifomethi: SVG. 4. Nika amandla i-\'Vector Yeqiniso\' emigwaqweni engakala. 5. Thekelisa futhi ungenise ku-software yakho yokuklama. 6. Linganisa usayizi wokugcina wokuphrinta — uhlala uhlanzekile.'],
    },
    {
      heading: 'Isetshenziswa nini i-PNG ephezulu',
      paragraphs: ['Uma ukugeleza komsebenzi wakho kudinga i-PNG: bala ubukhulu bephikseli bokugcina (usayizi womzimba × i-DPI). Ngekhodi engu-10cm ku-300 DPI: 10cm ≈ 4 amayintshi × 300 = 1200px. Thumela ku-1200×1200px. Lokhu kunikeza imiphumela yekhwalithi yokuphrinta ngaphandle kokukala.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced&format=svg#output', label: 'Dala kabusha ku-Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
      ],
    },

    // Example 4: Animated Signage QR (795-806)
    {
      heading: 'Izimpawu Ezinyakazayo ze-QR',
      paragraphs: ['Engeza ukugqwayiza okudonsa ukunaka ngenkathi ugcina ukwethembeka kokuskena.'],
      images: [{ src: '/images/examples/animation-overview.svg', alt: 'Izimpawu Ezinyakazayo ze-QR', caption: 'Engeza ukugqwayiza okudonsa ukunaka ngenkathi ugcina ukwethembeka kokuskena.' }],
    },
    {
      heading: 'Inselele',
      paragraphs: ['Izimpawu zakho zedijithali ziqhudelana ukuze zinakwe. Amakhodi e-QR aqinile azitshwa phakathi kokuqukethwe okugqwayizayo. Kodwa ukugqwayiza okunolaka kunganqamula ukuskena.'],
      images: [{ src: '/images/examples/animation-static.svg', alt: 'Inselele', caption: 'Izimpawu zakho zedijithali ziqhudelana ukuze zinakwe. Amakhodi e-QR aqinile azitshwa phakathi kokuqukethwe okugqwayizayo. Kodwa ukugqwayiza okunolaka kunganqamula ukuskena.' }],
    },
    {
      heading: 'Indlela yopopayi ephephile',
      paragraphs: ['Sebenzisa ukugqwayiza okucashile okudonsa ukunaka ngaphandle kokuphazamisa ukwakheka kwekhodi. Iphethini ye-\'Pulse\' ye-ANQR ikala kahle ikhodi, i-\'Shimmer\' yengeza imiphumela ecwebezelayo, futhi i-\'Wave\' idala ukunyakaza okugelezayo - konke kuyilapho igcina lonke uhlaka luskena.'],
      images: [{ src: '/images/examples/animation-animated.svg', alt: 'Indlela yopopayi ephephile', caption: 'Sebenzisa ukugqwayiza okucashile okudonsa ukunaka ngaphandle kokuphazamisa ukwakheka kwekhodi. Iphethini ye-\'Pulse\' ye-ANQR ikala kahle ikhodi, i-\'Shimmer\' yengeza imiphumela ecwebezelayo, futhi i-\'Wave\' idala ukunyakaza okugelezayo - konke kuyilapho igcina lonke uhlaka luskena.' }],
    },
    {
      heading: 'Izilungiselelo ezinconyiwe',
      paragraphs: ['Iphethini: Pulse noma Shimmer. Isivinini: 200-300ms uzimele ngamunye. Ukulungiswa Kwephutha: H (Phezulu). I-Temporal Dither: I-Flicker Safe. Njalo unika amandla okuthi \'Gcina Amaphethini Esitholi\'. Hlola ihadiwe yakho yokubonisa izimpawu zangempela.'],
    },
    {
      heading: 'Ifomethi nokulethwa',
      paragraphs: ['Thumela njenge-GIF ukuze uthole ukwesekwa kwesidlali sezimpawu zomhlaba wonke. Sebenzisa ozimele abangu-24-30 ukuze uthole ukugqwayiza okubushelelezi ngaphandle kosayizi wefayela oweqile. Uma izimpawu zakho zisekela ividiyo, i-MP4/WebM inikeza ikhwalithi engcono kodwa idinga amandla okudlala ividiyo.'],
    },
    {
      heading: 'Ukubekwa ezikrinini',
      paragraphs: ['Ima ekuphakameni okunethezekile kokuskena. Vumela amasekhondi angu-5+ isikhathi sokubonisa ukuze ababukeli babone futhi baskene. Engeza ukwaziswa kombhalo (\'Skena ukuze uthole imininingwane\') eduze nekhodi. Qinisekisa ukugqama okwanele kokuqukethwe kwakho okungemuva.'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif#animation',
          label: 'Dala kabusha ku-Generator',
          type: 'generator',
        },
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
      ],
    },

    // Example 5: Cross-Lingual QR Collaboration (807-817)
    {
      heading: 'Ukusebenzisana kwe-QR ye-Cross-Lingual',
      paragraphs: ['Yabelana ngokulungiselelwa kwe-QR kuwo wonke amaqembu ngezilimi ezahlukene.'],
      images: [{ src: '/images/examples/collab-overview.svg', alt: 'Ukusebenzisana kwe-QR ye-Cross-Lingual', caption: 'Yabelana ngokulungiselelwa kwe-QR kuwo wonke amaqembu ngezilimi ezahlukene.' }],
    },
    {
      heading: 'Inselele',
      paragraphs: ['Ithimba lakho lamazwe ngamazwe lidinga ukudala amakhodi e-QR angashintshi, kodwa amalungu eqembu asebenza ngezilimi ezahlukene. Ukuzilibazisa kokucushwa okwenziwa ngesandla kunephutha futhi kudla isikhathi.'],
      images: [{ src: '/images/examples/collab-english.svg', alt: 'Inselele', caption: 'Ithimba lakho lamazwe ngamazwe lidinga ukudala amakhodi e-QR angashintshi, kodwa amalungu eqembu asebenza ngezilimi ezahlukene. Ukuzilibazisa kokucushwa okwenziwa ngesandla kunephutha futhi kudla isikhathi.' }],
    },
    {
      heading: 'Isixazululo',
      paragraphs: ['Izixhumanisi zokwabelana ze-ANQR zihlanganisa zonke izilungiselelo ku-URL. Amalungu eqembu angavula isixhumanisi esifanayo ngolimi abaluncamelayo - ukulungiselelwa kwe-QR kulayisha ngendlela efanayo, kodwa isixhumi esibonakalayo sibonakala ngolimi lwawo.'],
      images: [{ src: '/images/examples/collab-japanese.svg', alt: 'Isixazululo', caption: 'Izixhumanisi zokwabelana ze-ANQR zihlanganisa zonke izilungiselelo ku-URL. Amalungu eqembu angavula isixhumanisi esifanayo ngolimi abaluncamelayo - ukulungiselelwa kwe-QR kulayisha ngendlela efanayo, kodwa isixhumi esibonakalayo sibonakala ngolimi lwawo.' }],
    },
    {
      heading: 'Isebenza kanjani',
      paragraphs: ['1. Lungiselela ikhodi yakho ye-QR ku-ANQR. 2. Chofoza okuthi Yabelana ukuze ukhiqize isixhumanisi. 3. Thumela isixhumanisi kosebenza naye. 4. Bayivula - I-ANQR ilayisha izilungiselelo zakho ngqo. 5. Bangakwazi ukushintsha ulimi lwabo lwesixhumi esibonakalayo ngaphandle kokuthinta ukumiswa kwe-QR. 6. Womabili amalungu eqembu athumela amakhodi afanayo e-QR.'],
    },
    {
      heading: 'Ipharamitha yolimi',
      paragraphs: ['Izixhumanisi zokwabelana ze-ANQR zifaka ipharamitha ye-\'lang\' yolimi lwesixhumi esibonakalayo, kodwa okuqukethwe kwe-QR nezilungiselelo zesitayela azizimele ngolimi. Ukushintsha ipharamitha ye-lang kushintsha amamenyu namalebula, hhayi ikhodi ye-QR ngokwayo.', 'Ukuhamba komsebenzi wokubambisana'],
      links: [
        { href: '/?lang=${lang}&tab=professional#share', label: 'Dala kabusha ku-Generator', type: 'generator' },
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Vula Umhlahlandlela Womsebenzisi ogcwele', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'gallery' },
  ],
};

export default examples;
