import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Funda nge-ANQR',
  description: 'Imihlahlandlela esebenzayo yokuthuthukisa imikhankaso ye-QR, izinkokhelo, ukumaketha, nokwabelana ngezilimi ezihlukahlukene.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Vula ijeneretha', type: 'generator' },
    { href: '/guide?lang=${lang}', label: 'Vula Umhlahlandlela Womsebenzisi ogcwele', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: 'Ukuthuthukisa Imikhankaso Ekhona Ye-QR',
      paragraphs: ['Ungawacwaninga kanjani, uthuthukise, futhi ufake ngokuphephile amakhodi e-QR akhona ngaphandle kokwephula uhambo lwabasebenzisi.'],
      images: [{ src: '/images/learn/campaign-overview.svg', alt: 'Ukuthuthukisa Imikhankaso Ekhona Ye-QR', caption: 'Ungawacwaninga kanjani, uthuthukise, futhi ufake ngokuphephile amakhodi e-QR akhona ngaphandle kokwephula uhambo lwabasebenzisi.' }],
    },
    {
      heading: 'Kungani uthuthukisa amakhodi akhona e-QR?',
      paragraphs: ['Amabhizinisi amaningi anamakhodi e-QR asevele ekhona - emaphaketheni, ezimpawu, ezintweni zokuphrinta, noma emikhiqizweni. Lawa makhodi ngokuvamile asebenzisa imiklamo eyisisekelo engenawo uphawu, ukulungiswa kwamaphutha okungalungile, noma izindawo ezithule ezinganele. Ukuzithuthukisa kungathuthukisa ukuthembeka kokuskena, ukuqashelwa komkhiqizo, nokulandelela umkhankaso ngaphandle kokushintsha i-URL okuyiwa kuyo.'],
    },
    {
      heading: 'Ihlola amakhodi akho amanje e-QR',
      paragraphs: ['Ngaphambi kokufaka noma iyiphi ikhodi ye-QR, hlola lokho onakho. Skena ikhodi ngayinye ngezinhlelo zokusebenza eziningi (i-iOS Ikhamera, i-Google Lens, izikena ze-QR ezizinikele) ukuze uqinisekise ukuthi ziyasebenza. Qaphela okuqukethwe okubhalwe ngekhodi, usayizi wokuphrinta, ukubekwa, nanoma yiziphi izinkinga zokuskena. Idokhumenti ukuthi yimaphi amakhodi asezindaweni ezihlala njalo (izimpawu eziqoshiwe, ukupakishwa komkhiqizo) uma kuqhathaniswa nalawo esikhashana (amaphosta, amaflaya).'],
      images: [
        { src: '/images/learn/campaign-before.svg', alt: 'Ihlola amakhodi akho amanje e-QR', caption: 'Ngaphambi kokufaka noma iyiphi ikhodi ye-QR, hlola lokho onakho. Skena ikhodi ngayinye ngezinhlelo zokusebenza eziningi (i-iOS Ikhamera, i-Google Lens, izikena ze-QR ezizinikele) ukuze uqinisekise ukuthi ziyasebenza. Qaphela okuqukethwe okubhalwe ngekhodi, usayizi wokuphrinta, ukubekwa, nanoma yiziphi izinkinga zokuskena. Idokhumenti ukuthi yimaphi amakhodi asezindaweni ezihlala njalo (izimpawu eziqoshiwe, ukupakishwa komkhiqizo) uma kuqhathaniswa nalawo esikhashana (amaphosta, amaflaya).' },
        { src: '/images/learn/campaign-after.svg', alt: 'Ihlola amakhodi akho amanje e-QR', caption: 'Ngaphambi kokufaka noma iyiphi ikhodi ye-QR, hlola lokho onakho. Skena ikhodi ngayinye ngezinhlelo zokusebenza eziningi (i-iOS Ikhamera, i-Google Lens, izikena ze-QR ezizinikele) ukuze uqinisekise ukuthi ziyasebenza. Qaphela okuqukethwe okubhalwe ngekhodi, usayizi wokuphrinta, ukubekwa, nanoma yiziphi izinkinga zokuskena. Idokhumenti ukuthi yimaphi amakhodi asezindaweni ezihlala njalo (izimpawu eziqoshiwe, ukupakishwa komkhiqizo) uma kuqhathaniswa nalawo esikhashana (amaphosta, amaflaya).' },
      ],
    },
    {
      heading: 'Isu lokushintsha eliphephile',
      paragraphs: ['Ukuze uthole amakhodi ezintweni ezisetshenziswa unomphela, cabanga ukusebenzisa isifinyezi se-URL noma isevisi yokuqondisa kabusha ukuze ukwazi ukushintsha indawo oya kuyo ngaphandle kokuphrinta kabusha. Ngezinto zesikhashana, ungashintsha ngokuphepha ngemiklamo ethuthukisiwe. Hlola njalo ikhodi entsha ngosayizi wangempela wokuphrinta ngaphambi kokukhiqiza ngobuningi.'],
    },
    {
      heading: 'Ingeza ukufaka uphawu ngokuphepha',
      paragraphs: ['I-ANQR ikuvumela ukuthi ungeze amalogo nemibala yebhrendi kuyilapho ugcina ukuskena. Sebenzisa Ukulungisa Iphutha H (Okuphezulu) lapho wengeza izimbondela — lokhu kunikeza ukuphinda kusebenze okungu-30%. Nika amandla okuthi \'Gcina Amaphethini Esitholi\' ukuze ugcine izikwele zamakhona ziqinile. Qala ngokuqina kwembondela ephansi (50-70%) bese uhlola kahle.'],
    },
    {
      heading: 'Ukuphrinta uma kuqhathaniswa nokucatshangelwa kwedijithali',
      paragraphs: ['Amakhodi okuphrinta e-QR adinga ukulungiswa okuphezulu (300+ DPI) nezindawo ezinkulu ezithule ukuze aphendule ukuthungwa kwephepha nebanga lokubuka. Amakhodi edijithali e-QR ezikrinini angaba mancane kodwa kufanele abhekele ukuxhopha kwesikrini namazinga okuvuselela. Imodi yokuphepha ye-ANQR isiza ukuphoqelela osayizi abancane bazo zombili izimo.'],
    },
    {
      heading: 'Ihlola amakhodi akho athuthukisiwe',
      paragraphs: ['Hlola njalo: (1) Ngezinhlelo zokusebenza zeskena eziningi, (2) Izimo zokukhanya ezihlukile, (3) amabanga ahlukahlukene, (4) Into yokuphrinta yangempela noma uhlobo lwesikrini. Ukuqinisekisa okwakhelwe ngaphakathi kwe-ANQR kuskena ikhodi ekhiqiziwe ukuze kuqinisekiswe ukuthi iqoshwa kahle.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#overlay', label: 'Vula izilungiselelo ezinconyiwe zalo mhlahlandlela kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'example' },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: 'Amakhodi e-QR ezinkokhelo zokudayisa',
      paragraphs: ['Dizayina amakhodi e-QR okukhokha ashesha ukuskenwa, kubhrendi, futhi ahambisana nezikhwama ezinkulu.'],
      images: [{ src: '/images/learn/retail-payment-overview.svg', alt: 'Amakhodi e-QR ezinkokhelo zokudayisa', caption: 'Dizayina amakhodi e-QR okukhokha ashesha ukuskenwa, kubhrendi, futhi ahambisana nezikhwama ezinkulu.' }],
    },
    {
      heading: 'Izimfuneko ze-QR zokukhokha',
      paragraphs: ['Amakhodi e-QR okukhokha anezidingo eziqinile kunamakhodi okuthengisa. Kufanele askene ngokushesha (amakhasimende alindile), asebenze nezinhlelo zokusebenza ezithile ze-wallet, futhi ahlangabezane nezindinganiso zokuthobela. Amazinga amaningi okukhokha (i-UPI, i-PayNow, i-SEPA) acacisa amafomethi wombhalo wekhodi anembile asekelwa i-ANQR.'],
    },
    {
      heading: 'Ukulinganisa indawo yokuthengisa',
      paragraphs: ['Izibonisi zekhawunta zidinga amakhodi okungenani isikwele esingu-3cm (1.2in) ukuze uskene ophathwa ngesandla ebangeni elingu-15-30cm. Amakhodi abekwe odongeni okuskena komugqa kufanele abe ngu-8-15cm (3-6in) ngebanga elingu-0.5-2m. Indlela Yokuphepha ye-ANQR iphoqelela ubuncane bosayizi bamamojula afanele izimo zokukhokha.'],
      images: [{ src: '/images/learn/retail-sizing.svg', alt: 'Ukulinganisa indawo yokuthengisa', caption: 'Izibonisi zekhawunta zidinga amakhodi okungenani isikwele esingu-3cm (1.2in) ukuze uskene ophathwa ngesandla ebangeni elingu-15-30cm. Amakhodi abekwe odongeni okuskena komugqa kufanele abe ngu-8-15cm (3-6in) ngebanga elingu-0.5-2m. Indlela Yokuphepha ye-ANQR iphoqelela ubuncane bosayizi bamamojula afanele izimo zokukhokha.' }],
    },
    {
      heading: 'Ukumaketha ngaphakathi kokuhambisana',
      paragraphs: ['Amakhodi e-QR okukhokha angafaka ukufaka uphawu lomthengisi, kodwa anemigoqo. Gcina amalogo emancane (ngaphansi kuka-20% wendawo yekhodi), gcina ukugqama okuphezulu, futhi ungalokothi uguqule amaphethini esitholi. Sebenzisa Ukulungisa Iphutha H futhi uhlole ngezinhlelo zokusebenza zokukhokha zangempela ezisetshenziswa amakhasimende akho (i-Google Pay, i-Apple Wallet, izinhlelo zokusebenza zasebhange).'],
    },
    {
      heading: 'Izinto zokubonisa ze-POS',
      paragraphs: ['Izibonisi ezinamalayithi zimelana nezigxivizo zeminwe kodwa zingabangela ukukhanya. I-Matte iqeda ukuskena kangcono ezindaweni ezikhanyayo. Izitendi ezinama-engeli (15-30°) zinciphisa ukubonakaliswa. Cabangela izici zemvelo: izindawo zokukhokha zangaphandle zidinga ukuvikelwa kwesimo sezulu futhi zingadinga amakhodi amakhulu okukhanyisa okuguquguqukayo.'],
    },
    {
      heading: 'Izindinganiso zokukhokha zesifunda',
      paragraphs: ['I-ANQR isekela amafomethi okukhokha esifunda: UPI/BharatQR (India), PayNow (Singapore), PromptPay (Thailand), PIX (Brazil), SEPA/EPC (Europe), nokunye. Ngayinye inezidingo zenkambu ethile - sebenzisa izifanekiso zokukhokha ze-ANQR ukuze uqinisekise ukuthotshelwa kwemithetho.'],
    },
    {
      heading: 'Ihlola amakhodi okukhokha',
      paragraphs: ['Hlola ngezinhlelo zokusebenza zokukhokha zangempela, hhayi nje izikena ezijwayelekile ze-QR. Qinisekisa inani lokukhokha, imininingwane yomamukeli, nezinkambu zereferensi zicutshungulwa ngendlela efanele. Hlola endaweni yangempela yokufaka enezimo zokukhanyisa zangempela.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: 'Vula izilungiselelo ezinconyiwe zalo mhlahlandlela kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'example' },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: 'Amakhodi e-QR Alungele Ukuphrinta: SVG vs PNG',
      paragraphs: ['Kungani amafomethi e-vector ebaluleke kakhulu ekuphrintiwe, nokuthi uwathekelisa kanjani amakhodi e-QR akala kahle.'],
      images: [{ src: '/images/learn/print-svg-overview.svg', alt: 'Amakhodi e-QR Alungele Ukuphrinta: SVG vs PNG', caption: 'Kungani amafomethi e-vector ebaluleke kakhulu ekuphrintiwe, nokuthi uwathekelisa kanjani amakhodi e-QR akala kahle.' }],
    },
    {
      heading: 'Kungani i-SVG yokuphrinta?',
      paragraphs: ['Amafayela e-SVG (Scalable Vector Graphics) aqukethe izincazelo zezibalo zomumo, hhayi amaphikseli. Lokhu kusho ukuthi balinganisa ngokungenamkhawulo ngaphandle kokulahlekelwa kwekhwalithi. Ikhodi ye-QR ekhishelwe njenge-SVG ngo-100px izophrinta kahle kakhulu kusayizi wephosta, kuyilapho i-PNG enosayizi ofanayo izofiphala noma yenziwe ngephikiseli.'],
    },
    {
      heading: 'Uma i-PNG yamukelekile',
      paragraphs: ['I-PNG isebenza kahle lapho: (1) Uthumela ngokulungiswa kokuphrinta kokugcina (isb., 300 DPI × usayizi womzimba), (2) Ikhodi ngeke ikhushulwe, (3) usebenzisa izibonisi zedijithali ezinqumweni ezaziwayo. Ngokuvumelana nezimo nobufakazi besikhathi esizayo, i-SVG isakhethwa.'],
      images: [
        { src: '/images/learn/print-png-pixelated.svg', alt: 'Uma i-PNG yamukelekile', caption: 'I-PNG isebenza kahle lapho: (1) Uthumela ngokulungiswa kokuphrinta kokugcina (isb., 300 DPI × usayizi womzimba), (2) Ikhodi ngeke ikhushulwe, (3) usebenzisa izibonisi zedijithali ezinqumweni ezaziwayo. Ngokuvumelana nezimo nobufakazi besikhathi esizayo, i-SVG isakhethwa.' },
        { src: '/images/learn/print-svg-crisp.svg', alt: 'Uma i-PNG yamukelekile', caption: 'I-PNG isebenza kahle lapho: (1) Uthumela ngokulungiswa kokuphrinta kokugcina (isb., 300 DPI × usayizi womzimba), (2) Ikhodi ngeke ikhushulwe, (3) usebenzisa izibonisi zedijithali ezinqumweni ezaziwayo. Ngokuvumelana nezimo nobufakazi besikhathi esizayo, i-SVG isakhethwa.' },
      ],
    },
    {
      heading: 'Izinketho zokuthekelisa ze-ANQR SVG',
      paragraphs: ['I-ANQR inikezela ngezindlela ezimbili ze-SVG: \'IVector Yeqiniso\' idala i-SVG emsulwa esekelwe endleleni ekala kahle futhi ingahlelwa ku-Illustrator/Inkscape. \'Ukushumeka kwe-Raster\' kufaka phakathi noma yisiphi isithombe esiyimbondela njenge-bitmap eshumekiwe - iwusizo uma udinga izimbondela kodwa usafuna umumo wemojula ye-vector.'],
    },
    {
      heading: 'Phrinta ukuhlanganiswa kokuhamba komsebenzi',
      paragraphs: ['Khipha i-SVG kusuka ku-ANQR, bese ungenisa kusofthiwe yakho yokuklama (InDesign, Illustrator, Canva Pro). Beka ikhodi ye-QR kusayizi wokugcina wokuphrinta futhi uqinisekise ukuthi indawo ethulile igciniwe. Izitolo eziningi zokuphrinta zikhetha ukulethwa kwe-PDF - isofthiwe yakho yokuklama ingashumeka i-SVG ku-PDF yokugcina.'],
    },
    {
      heading: 'Ukulungiswa kanye nezilungiselelo ze-DPI',
      paragraphs: ['Ngokuthekelisa kwe-PNG okuhloselwe ukuphrintwa: phindaphinda usayizi wakho womzimba nge-DPI. Ikhodi yamayintshi angu-2 ku-300 DPI idinga u-600×600px. Isilungiselelo se-ANQR\'s DPI sishumeka le methadatha yesofthiwe yokuphrinta. Ezikrinini, i-72-96 DPI ijwayelekile.'],
    },
    {
      heading: 'Ukugwema amaphutha avamile wokuphrinta',
      paragraphs: ['Ungenzi: ukhuphule ukuthunyelwa kwe-res ephansi, cindezela izithombe ze-QR njenge-JPEG (ama-artifact break scanning), beka amakhodi ezindaweni ezigoqiwe/ezisikiwe, noma wehlise izindawo ezithule ukuze zilingane nezakhiwo. Yenza: thekelisa ngosayizi oqondiwe, sebenzisa amafomethi angalahleki, hlola amasampula wangempela wokuphrinta.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: 'Vula izilungiselelo ezinconyiwe zalo mhlahlandlela kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'example' },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: 'Amakhodi e-QR Agqwayizayo Ophawu Lwedijithali',
      paragraphs: ['Asetshenziswa nini futhi kanjani amakhodi e-QR agqwayizayo ezikrinini kuyilapho uwagcina eskenakeka.'],
      images: [{ src: '/images/learn/animation-overview.svg', alt: 'Amakhodi e-QR Agqwayizayo Ophawu Lwedijithali', caption: 'Asetshenziswa nini futhi kanjani amakhodi e-QR agqwayizayo ezikrinini kuyilapho uwagcina eskenakeka.' }],
    },
    {
      heading: 'Uma ukugqwayiza kusiza',
      paragraphs: ['Ukugqwayiza kudonsa amehlo kuzibonisi zedijithali ezimatasa lapho okuqukethwe okumile kuzitshwa khona. Izithombe ezinyakazayo ezicashile (ukushaya kwenhliziyo okuthambile, ukushintsha kombala) zidweba iso ngaphandle kokuphazamisa ukuskena. Ukugqwayiza kusebenza kangcono: izikrini zokuthengisa, izibonisi zemicimbi, amakhikhikhi asebenzisanayo, nokuqukethwe kwenkundla yezokuxhumana.'],
    },
    {
      heading: 'Uma ukugqwayiza kubuhlungu',
      paragraphs: ['Gwema ukugqwayiza: amakhodi e-QR okukhokha (izindaba zesivinini), amakhodi abukwe kafushane (izikhangiso zezokuthutha), amakhodi ezikrinini anezilinganiso zokuvuselela ezingezinhle, noma lapho imvelo inezithombe eziningi ezincintisanayo. Uma ungabaza, hlola i-animated vs static nezithameli oziqondise.'],
      images: [
        { src: '/images/learn/animation-static.svg', alt: 'Uma ukugqwayiza kubuhlungu', caption: 'Gwema ukugqwayiza: amakhodi e-QR okukhokha (izindaba zesivinini), amakhodi abukwe kafushane (izikhangiso zezokuthutha), amakhodi ezikrinini anezilinganiso zokuvuselela ezingezinhle, noma lapho imvelo inezithombe eziningi ezincintisanayo. Uma ungabaza, hlola i-animated vs static nezithameli oziqondise.' },
        { src: '/images/learn/animation-animated.svg', alt: 'Uma ukugqwayiza kubuhlungu', caption: 'Gwema ukugqwayiza: amakhodi e-QR okukhokha (izindaba zesivinini), amakhodi abukwe kafushane (izikhangiso zezokuthutha), amakhodi ezikrinini anezilinganiso zokuvuselela ezingezinhle, noma lapho imvelo inezithombe eziningi ezincintisanayo. Uma ungabaza, hlola i-animated vs static nezithameli oziqondise.' },
      ],
    },
    {
      heading: 'Amapharamitha wopopayi aphephile',
      paragraphs: ['Ukuze uthole ukuskena okuthembekile: gcina isivinini sokugqwayiza sihamba kancane (200ms+ uzimele ngamunye), gwema ukubaneka okusheshayo, gcina ukugqama okungaguquki kukho konke ukugqwayiza, futhi uqinisekise ukuthi uhlaka ngalunye luskena ngokuzimela. I-ANQR\'s \'Flicker Safe\' i-dithering yesikhashana isiza ukuvimbela imiphumela yokushaywa.'],
    },
    {
      heading: 'Izitayela zokugqwayiza ezinconyiwe',
      paragraphs: ['I-Pulse: I-oscillation yosayizi omnene idonsela ukunaka ngaphandle kokuphula ukuskena. I-Wave: Amaphethini agelezayo engeza ukunyakaza ngenkathi igcina isakhiwo siqinile. Umjikelezo Wombala: Amashifu e-Hue agcina ukugqama ngenkathi engeza intshisekelo ebonakalayo. Shimmer: Imiphumela ecashile ecwebezelayo emaphethelweni emojuli.'],
    },
    {
      heading: 'Ukucatshangelwa kwefomethi',
      paragraphs: ['I-GIF: Ukusekelwa kwendawo yonke, kukhawulelwe imibala engu-256, amafayela amakhulu. I-APNG: Ikhwalithi engcono, ukusekelwa kwesiphequluli okuncane. Ividiyo (MP4/WebM): Ikhwalithi ehamba phambili, idinga umongo wesidlali sevidiyo. I-ANQR ithumela i-GIF ngokuzenzakalelayo — hlola esidlalini sakho sangempela sezimpawu.'],
    },
    {
      heading: 'Amathiphu okubeka isikrini',
      paragraphs: ['Beka amakhodi e-QR ekuphakameni okunethezekile kokuskena (1.2-1.5m ezibukelini ezimile). Gwema imiphetho yesikrini lapho kwenzeka khona ukuhlanekezela. Vumela isikhathi esanele sokuhlala — imizuzwana engu-5+ ukuze izibukeli ziqaphele, zikhiphe ifoni, futhi ziskene. Cabangela ukungeza i-\'Scan Me\' yokubizela esenzweni.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: 'Vula izilungiselelo ezinconyiwe zalo mhlahlandlela kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'example' },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: 'Ukuphepha Nokuthobela Ikhodi Ye-QR',
      paragraphs: ['Ukuqonda izindawo ezithulile, ukugqama, ukulungisa amaphutha, kanye nalokho okuphoqelelwa yimodi yokuphepha ye-ANQR.'],
      images: [{ src: '/images/learn/safety-overview.svg', alt: 'Ukuphepha Nokuthobela Ikhodi Ye-QR', caption: 'Ukuqonda izindawo ezithulile, ukugqama, ukulungisa amaphutha, kanye nalokho okuphoqelelwa yimodi yokuphepha ye-ANQR.' }],
    },
    {
      heading: 'Imfuneko yendawo ethule',
      paragraphs: ['Indawo ethulile iwumkhawulo ongenalutho kuwo wonke amakhodi e-QR. Izikena zidinga lesi sikhala ukuze zithole imingcele yekhodi. I-ISO 18004 incoma amamojula ama-4 ubuncane. Ukusika endaweni ethulile kuyimbangela evame kakhulu yokuhluleka kokuskena. Imodi yokuphepha ye-ANQR iphoqelela lobu buncane.'],
      images: [{ src: '/images/learn/safety-quiet-zone.svg', alt: 'Imfuneko yendawo ethule', caption: 'Indawo ethulile iwumkhawulo ongenalutho kuwo wonke amakhodi e-QR. Izikena zidinga lesi sikhala ukuze zithole imingcele yekhodi. I-ISO 18004 incoma amamojula ama-4 ubuncane. Ukusika endaweni ethulile kuyimbangela evame kakhulu yokuhluleka kokuskena. Imodi yokuphepha ye-ANQR iphoqelela lobu buncane.' }],
    },
    {
      heading: 'Izimfuneko zokuqhathanisa',
      paragraphs: ['Amakhodi e-QR adinga umehluko omkhulu phakathi kwengaphambili nengemuva. Izinga le-ISO lithatha okumnyama kokumhlophe, kodwa noma iyiphi inhlanganisela yomehluko ophezulu iyasebenza. Gwema: amapheya emibala anomehluko ophansi, ama-gradient anciphisa ukugqama ezindaweni, noma ingemuva eliphazamisa indawo ethulile. I-Contrast Guard ye-ANQR ixwayisa ngezinhlanganisela eziyinkinga.'],
      images: [{ src: '/images/learn/safety-contrast.svg', alt: 'Izimfuneko zokuqhathanisa', caption: 'Amakhodi e-QR adinga umehluko omkhulu phakathi kwengaphambili nengemuva. Izinga le-ISO lithatha okumnyama kokumhlophe, kodwa noma iyiphi inhlanganisela yomehluko ophezulu iyasebenza. Gwema: amapheya emibala anomehluko ophansi, ama-gradient anciphisa ukugqama ezindaweni, noma ingemuva eliphazamisa indawo ethulile. I-Contrast Guard ye-ANQR ixwayisa ngezinhlanganisela eziyinkinga.' }],
    },
    {
      heading: 'Ukulungiswa kwephutha kuchaziwe',
      paragraphs: ['Amakhodi e-QR afaka idatha engasasebenzi ukuze kulungiswe iphutha. Izinga L livumela umonakalo ongu-7%, uM uvumela u-15%, u-Q uvumela u-25%, u-H uvumela u-30%. Sebenzisa u-H (Okuphezulu) lapho wengeza izimbondela, uphrinta ezintweni ezithungwe, noma ulindele ukuguga. Ukulungiswa okuphezulu = amakhodi amakhudlwana.'],
    },
    {
      heading: 'Yini ephoqelela Imodi Yokuphepha',
      paragraphs: ['Imodi Yokuphepha ye-ANQR (Ibhalansi noma Eqinile) ngokuzenzakalelayo: isebenzisa indawo ethule encane, ixwayisa ngokugqama okuphansi, ikhawulela ukuqina kwembondela ngokusekelwe ezingeni lokulungiswa kwamaphutha, ivikela amaphethini okuthola/isikhathi/ukuqondanisa ekulungisweni, futhi iqinisekisa ukuskena kwekhodi yokugcina ngendlela efanele.'],
    },
    {
      heading: 'Ilogo nemikhawulo yembondela',
      paragraphs: ['Izimbondela ezimboza ngaphezu kuka-30% wamamojula edatha engozini yokuhluleka kokuskena ngisho nokulungiswa kwephutha lika-H. Imodi ye-ANQR ye-ECC-Aware isabalalisa ngobuhlakani umthelela wembondela ukuze uhlale ngaphakathi kwemikhawulo ephephile. Ngaso sonke isikhathi gcina amaphethini okuthola (izikwele zamakhona) engalungiswanga ngokuphelele.'],
    },
    {
      heading: 'Ukuthobela izimboni ezithile',
      paragraphs: ['Ezinye izimboni zinezidingo eziqondile ze-QR: izinhlelo zokukhokha zigunyaza amafomethi wombhalo wekhodi anembile, ukulandelela kwezemithi kudinga ukuthotshelwa kwe-GS1, amathikithi omcimbi angase adinge ukulayishwa kwenkokhelo okubethelwe. I-ANQR isekela lawa mazinga — sebenzisa isifanekiso sohlobo lokuqukethwe esifanele.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: 'Vula izilungiselelo ezinconyiwe zalo mhlahlandlela kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'example' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: 'Vula Umhlahlandlela Womsebenzisi ogcwele', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'gallery' },
  ],
};

export default learn;
