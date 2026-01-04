import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const guide: PageDefinition = {
  title: 'Umhlahlandlela Womsebenzisi we-ANQR',
  description: 'Umhlahlandlela ophelele wokusebenzisa i-ANQR ekudaleni amakhodi e-QR.',
  lastUpdated: LAST_UPDATED,
  breadcrumb: ['Guide'],
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Vula ijeneretha', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
    { href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' },
  ],
  sections: [
    // Getting Started (sections 0-1)
    {
      heading: 'Ukuqala',
      paragraphs: ['I-ANQR iyisikhiqizi sekhodi ye-QR esinendlela yoku-client-first. Ngokuzenzakalelayo, amakhodi e-QR akhiqizwa endaweni yakho kusiphequluli sakho — akukho akhawunti edingekayo futhi idatha yakho ihlala iyimfihlo. Ukuze ushumeke ngobungcweti, ungasebenzisa futhi i-API eseceleni kweseva.', 'I-interface inamazinga amathathu e-interface: Okuyisisekelo, Okuthuthukisiwe, kanye Nobungcweti. Khetha izinga lakho usebenzisa amathebhu asekhanda. Izinga ngalinye livula izici ezengeziwe ngenkathi ligcina i-interface igxile kulokho okudingayo.'],
      bullets: ['Okuyisisekelo: Ukwakhiwa kwekhodi ye-QR elula ngokuqukethwe okucacile kombhalo/i-URL kanye nokumbozwa kwesithombe.', 'Okuthuthukisiwe: Izinketho zokufaka ikhodi ye-QR, izitayela zokubonisa, izithombe ezinyakazayo, amafomethi okukhipha, izinhlobo zokuqukethwe ezinwetshiwe, kanye nokwenza ngokwezifiso i-overlay.', 'Ochwepheshe: Ama-watermark, imethadatha, ukwabelana, ukuhlaziywa kokuphepha, amakhodi e-QR okukhokha, kanye nezici zebhizinisi.'],
      links: [{ href: '/?lang=${lang}', label: 'Vula ijeneretha', type: 'generator' }],
    },
    {
      heading: 'Ukuqala Okusheshayo',
      paragraphs: ['Ukudala ikhodi yakho yokuqala ye-QR:'],
      bullets: ['1. Khetha uhlobo lokuqukethwe (i-URL, umbhalo, i-WiFi, njll.) kusukela ku-dropdown yohlobo lokuqukethwe.', '2. Faka idatha yakho ezinkambini ezinikeziwe.', '3. Yenza ngokwezifiso imibala, izitayela, bese wengeza isithombe esimboziwe ngokuzikhethela.', '4. Chofoza okuthi Thumela ukuze ulande ikhodi yakho ye-QR njenge-PNG, GIF, WebP, noma i-SVG.'],
      links: [{ href: '/?lang=${lang}', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    // Basic Features (sections 2-4)
    {
      heading: 'Izici Eziyisisekelo',
      paragraphs: ['Izinga eliyisisekelo linikeza isikhombikubona esilula sokudala amakhodi e-QR anokuqukethwe komthwalo kanye nokumbozwa kwezithombe. Lena yindlela elula yokuqala.'],
      links: [{ href: '/?lang=${lang}&tab=basic', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinhlobo Zokuqukethwe (Okuyisisekelo)',
      paragraphs: ['Umbhalo Ocacile: Faka ikhodi kunoma yimuphi umbhalo kuze kufike emkhawulweni womthamo wekhodi ye-QR. Kuhle kakhulu kwimilayezo emifushane, amakhodi, noma izihlonzi.', 'I-URL: Faka ikhodi yamakheli ewebhu. Ikhodi ye-QR izovula i-URL uma iskeniwe. Isekela amaphrothokholi e-http:// kanye ne-https://.'],
    },
    {
      heading: 'Ukumbozwa Kwesithombe (Okuyisisekelo)',
      paragraphs: ['Layisha isithombe (JPG, PNG, GIF, WebP) ukuze sihlangane nekhodi yakho ye-QR. Izici eziyisisekelo zokumboza zifaka:'],
      bullets: ['Layisha kusuka kufayela: Khetha isithombe kusuka kudivayisi yakho.', 'Layisha kusuka ku-URL: Faka i-URL yesithombe (kumele ivumele ama-CORS).', 'Ilogo Ephakathi: Ibeka isithombe phakathi nendawo, incike ekulungisweni kwamaphutha.', 'Ukuxuba: Ukuxuba okulula kwesithombe ngephethini ye-QR.', 'Ukuqina: Kulawula ukuthi ukunqwabelanisa kuyithinta kangakanani ikhodi ye-QR (0-100%).', 'Imodi Yombala: Umbala Ogcwele, Isikali Esimpunga, noma Okumnyama Nokumhlophe.', 'Amaphethini Okugcina I-Finder: Igcina amaphethini ekhoneni engashintshiwe ukuze kuskenwe okuthembekile.'],
      links: [
        { href: '/?lang=${lang}&tab=basic#overlay', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-5', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    // Advanced Features (sections 5-40)
    {
      heading: 'Izici Ezithuthukisiwe',
      paragraphs: ['Izinga Elithuthukisiwe livula izinketho zokufaka ikhodi ye-QR, izitayela zokubonisa, izithombe ezinyakazayo, amafomethi okukhipha, izinhlobo zokuqukethwe ezinwetshiwe, kanye nokwenza ngokwezifiso i-overlay ethuthukisiwe.'],
      links: [{ href: '/?lang=${lang}&tab=advanced', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izilungiselelo Zokufaka Ikhodi ye-QR',
      paragraphs: ['Inguqulo: Amakhodi e-QR afika ngezinguqulo 1-40, ngezinguqulo eziphezulu eziphethe idatha eningi kodwa ezinkulu. Setha ku-0 (Okuzenzakalelayo) ukuze uvumele i-ANQR ikhethe inguqulo encane kakhulu efanela okuqukethwe kwakho.', 'Ukulungiswa Kwephutha: Kunquma ukuthi ikhodi ye-QR ingalimala kangakanani ngenkathi isakwazi ukuskenwa.'],
      bullets: ['L (Ephansi): ukulungiswa kwamaphutha angu-7% - usayizi omncane kakhulu, ukuphindaphinda okuncane kakhulu.', 'M (Okuphakathi): Ukulungiswa kwamaphutha angu-15% - inketho elinganisiwe.', 'Q (Quartile): Ukulungiswa kwamaphutha angu-25% - kuhle kumakhodi aphrintiwe.', 'H (Phezulu): Ukulungiswa kwamaphutha angu-30% - kungcono kakhulu kumakhodi anezimbobo noma ezimweni ezinzima.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#qr-encoding', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Indawo Ethule (Umkhawulo)',
      paragraphs: ['Indawo ethule yindawo emhlophe ezungeze ikhodi ye-QR. Izikena zidinga lo mkhawulo ukuze zithole ukuthi ikhodi iqala kuphi. Indinganiso incoma okungenani amamojula angu-4. Ukunciphisa ngaphansi kuka-4 kungabangela izinkinga zokuskena.'],
    },
    {
      heading: 'Isitayela Semodyuli',
      paragraphs: ['Amamojula ayizikwele ngazinye ezakha ikhodi ye-QR. I-ANQR inikeza izitayela ezinhlanu:'],
      bullets: ['Isikwele: Ukubukeka kwe-QR yakudala enamakhona abukhali.', 'Iyindilinga: Amakhona athambile ukuze kubukeke kunobungane.', 'Amachashazi: Amamojula ayindilinga okubukeka kwesimanje.', 'Idayimane: izikwele ezijikelezwe ngo-45° ukuze kube nephethini ehlukile.', 'Kuxhunyiwe: Amamojula ayahlangana uma eseduze, okudala izimo eziphilayo.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#render', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Isitayela Sephethini Yokuthola',
      paragraphs: ['Amaphethini e-Finder ayizikwele ezintathu ezinkulu emakhoneni e-QR ezisiza ama-scanner ukuthi aqondise ikhodi. Izitayela ezitholakalayo:'],
      bullets: ['Isikwele: Amakhona ajwayelekile esikwele.', 'Okuyindilinga: Amakhona athambile ahambisana nesitayela semojuli eyindilinga.', 'Isiyingi: Amaphethini okuthola isiyingi samakhodi esitayela samachashazi.'],
    },
    {
      heading: 'Amaphethini Okuqondanisa Nesikhathi',
      paragraphs: ['Amaphethini okuqondanisa avela kumakhodi amakhulu e-QR (inguqulo 2+) ukusiza ukulungisa ukuphazamiseka. Amaphethini esikhathi ayimigqa eshintshanayo exhumanisa amaphethini esitholi.'],
      bullets: ['Isitayela Sokuqondanisa: Isitholi Sokufaniswa, Isikwele, Esiyindilinga, noma Isiyingi.', 'Isitayela Sesikhathi: Imojula Yokufanisa, Eqinile, noma Enezingqimba.'],
    },
    {
      heading: 'Imibala',
      paragraphs: ['Ingaphambili: Umbala wamamojula e-QR. Umnyama (#000000) ujwayelekile kodwa noma yimuphi umbala omnyama uyasebenza.', 'Ingemuva: Umbala wangemuva. Okumhlophe (#ffffff) kuyinto ejwayelekile. Qinisekisa ukuthi umehluko owanele nengaphambili.', 'Ingemuva Elibonakalayo: Susa ingemuva ngokuphelele ukuze ulisebenzise ezindaweni ezinemibala. Qinisekisa ukuthi indawo inikeza umehluko owanele.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#render', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Usayizi Wemojuli Nesikhala',
      paragraphs: ['Usayizi Wemojuli: Ilawula ukuthi imojuli ngayinye iboniswa ngobukhulu kangakanani ngamaphikseli. Amanani amakhulu adala amakhodi amakhulu, okulula ukuwaskena.', 'Igebe Lemojuli: Lifaka isikhala phakathi kwamamojuli njengephesenti. Izikhala ezincane (5-15%) zingathuthukisa ukuskenwa kwezinye izimo kodwa izikhala eziningi zinciphisa ukuthembeka.'],
    },
    {
      heading: 'Izilungiselelo Zokukhipha',
      paragraphs: ['Ifomethi: Khetha ifomethi yakho yokuthumela ngaphandle ngokusekelwe esimweni sokusetshenziswa.'],
      bullets: ['PNG: Ifomethi ye-raster engenakulahlekelwa, ilungele ukusetshenziswa okuningi. Ilungele ukuphrinta kanye nedijithali.', 'I-WebP: Ifomethi yesimanje enosayizi abancane bamafayela. Ilungele ukusetshenziswa kuwebhu.', 'I-GIF: Iyadingeka kumakhodi e-QR agqwayizayo. Isekela ukucaca.', 'I-SVG: Ifomethi yevektha ekhula ngokungenamkhawulo. Kungcono kakhulu ekuphrinteni okukhulu noma lapho udinga ukuhlela ikhodi.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-3', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    {
      heading: 'Ubukhulu Bokukhipha',
      paragraphs: ['Ububanzi/Ukuphakama: Setha usayizi wokukhipha ngamaphikseli. Ukuze uphrinte, bala ngokusekelwe ku-DPI (isb., i-300 DPI ku-1 intshi = 300px). Osayizi abakhulu baskena ngokwethembeka kakhulu ebangeni.'],
    },
    {
      heading: 'Izilungiselelo Zopopayi (Ezithuthukisiwe)',
      paragraphs: ['Lawula ukuziphatha kwekhodi ye-QR egqwayizayo:'],
      bullets: ['Isivinini: Izinga lohlaka lwe-animation ngama-millisecond.', 'I-Loop: Izithombe ezinyakazayo eziqhubekayo noma ezidlalwa kanye kuphela.', 'Ukugxuma: Isiqondiso se-Ping-pong animation.', 'Uhlaka Lokuqala: Qala ukugqwayiza kusuka kuhlaka oluthile.', 'Amafreyimu aphezulu: Nciphisa amafreyimu aphelele ku-animation.', 'Isinyathelo Sohlaka: Yeqa ozimele ukuze uthole izithombe ezinyakazayo ezisheshayo.', 'Ukuhlanganiswa: Akukho, Ukufiphala, noma i-Morph phakathi kwamafreyimu.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-4', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    {
      heading: 'Izinhlobo Zokuqukethwe (Okuthuthukisiwe)',
      paragraphs: ['Izinga elithuthukisiwe livula amafomethi engeziwe okulayisha:'],
      bullets: [
        'Inombolo Yocingo (ucingo:): Idala isixhumanisi socingo esingashayelwa.',
        'I-imeyili (i-imeyili:): Ivula iklayenti le-imeyili elinesihloko nomzimba ongakukhetha.',
        'I-SMS: Umlayezo wombhalo ogcwaliswe kusengaphambili enombolweni yocingo.',
        'i-vCard: Ikhadi lokuxhumana eligcwele elinegama, inhlangano, ifoni, i-imeyili, ikheli.',
        'I-MeCard: Ifomethi yokuxhumana ehlanganisiwe ethandwa kakhulu eJapane.',
        'I-BizCard: Ifomethi yekhadi lebhizinisi elidala.',
        'Indawo Yendawo: Ama-GPS axhumanisayo avuleka kumamephu.',
        'I-WiFi: Iziqinisekiso zenethiwekhi zokuxhumeka okuzenzakalelayo (i-SSID, iphasiwedi, uhlobo lokuphepha).',
        'Umcimbi Wekhalenda: Ifomethi ye-iCalendar enesihloko, indawo, usuku/isikhathi.',
        'I-RSVP Yomcimbi: Isixhumanisi sekhasi lokubhalisa umcimbi.',
        'Ukubhalisela Ikhalenda: Bhalisela okuphakelayo kwe-ICS/WebCal.',
        'Ifayela/I-URL Yedokhumenti: Isixhumanisi esiqondile samafayela angalandwa.',
        'Isixhumanisi Sesitoreji Samafu: Izixhumanisi ze-Google Drayivu, iDropbox, i-OneDrive, njll.',
        'Iphrofayela Yezokuxhumana: Izixhumanisi ze-LinkedIn, Twitter, Instagram, njll.',
        'Isixhumanisi Sokuthumela Imiyalezo: I-WhatsApp, iTelegram, Izixhumanisi Ezijulile Zesignali.',
      ],
      links: [{ href: '/?lang=${lang}&tab=advanced#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izici Ezithuthukisiwe Zokumboza',
      paragraphs: ['Amakhono engeziwe okumboza:'],
      bullets: ['Nqampuna: Nika amandla ukunqampuna ukuze ukhethe isifunda esiyisikwele sesithombe sakho.', 'I-Halftone: Iphethini yamachashazi yesitayela sokuphrinta esijwayelekile esekelwe ekukhanyeni kwesithombe.', 'Ukugoba: Ukugoba kokusabalalisa amaphutha ukuze kukhiqizwe kabusha okuningiliziwe.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#overlay', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Amamodi Okuhlanganisa Okumboza (Okuthuthukisiwe)',
      paragraphs: ['Izindlela ezengeziwe zokuxuba ezingeni elithuthukisiwe:'],
      bullets: ['I-Subpixel: Ihlukanisa imojula ngayinye ibe ama-subpixel ukuze uthole imininingwane ephezulu.', 'Umsindo Oluhlaza Okwesibhakabhaka: Isebenzisa umsindo oluhlaza okwesibhakabhaka ogeleza ngamaphethini angenazo izinto zokwenziwa.', 'I-Mosaic: Umphumela osekelwe kuthayela ogcina isakhiwo sesithombe.', 'Ukugcwalisa Igebe: Kubeka isithombe ezikhaleni phakathi kwamamojula.', 'Ukukhanya: Kushintsha usayizi wemojula ngokusekelwe ekukhanyeni kwesithombe.', 'I-Duotone: Imephu yesithombe ngemibala emibili ukuze kubonakale umehluko omkhulu.'],
    },
    {
      heading: 'Ukuqina Kokumboza',
      paragraphs: ['Ilawula ukuthi ukunqwabelanisa kuyithinta kangakanani ikhodi ye-QR (0-100%). Amanani aphezulu abonisa imininingwane eminingi yesithombe kodwa anganciphisa ukuskenwa. Qala cishe ngo-70% bese ulungisa ngokusekelwe ekuhlolweni.'],
      links: [{ href: '/learn?lang=${lang}#section-5', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' }],
    },
    {
      heading: 'Imodi Yombala',
      paragraphs: ['Indlela isithombe esimboziwe esicutshungulwa ngayo:'],
      bullets: ['Umbala Ogcwele: Kugcina imibala yesithombe sokuqala.', 'I-Grayscale: Iguqula ibe imibala emnyama nemhlophe.', 'Okumnyama Nomhlophe: Ukuguqulwa kwe-binary okugqamile kakhulu.'],
    },
    {
      heading: 'Amaphethini Okuthola I-Preserve',
      paragraphs: ['Uma ivuliwe, igcina amaphethini okuthola amakhona amathathu engashintshiwe yimbondela. Kunconywa kakhulu ukuskena okuthembekile.'],
    },
    {
      heading: 'Ukucubungula Isithombe Ngaphambi Kokuba Sibe Khona',
      paragraphs: ['Faka izihlungi esithombeni sakho esimboziwe ngaphambi kokuhlanganisa. Lokhu kulungiswa kungathuthukisa indlela isithombe esibonakala ngayo kukhodi yokugcina ye-QR.'],
      bullets: ['Ukukhanya (-100 kuya ku-+100): Khanyisa noma wenze isithombe sibe mnyama.', 'Ukuqhathanisa (-100 kuya ku-+100): Khulisa noma wehlise ububanzi bethoni.', 'I-Gamma (0.2 kuya ku-3.0): Ukulungiswa kokukhanya okungekho emgqeni. Amanani angaphansi kuka-1 akhanyisa amathoni aphakathi, ngaphezu kuka-1 awenza abe mnyama.', 'Ukugcwala (-100 kuya ku-+100): Ubukhulu bombala. -100 i-grayscale, +100 igcwele ngokweqile.', 'Ukushintshashintsha Kombala (0-360°): Shintsha yonke imibala uzungeze isondo lombala.', 'Ukufiphaza (0-20px): Thambisa imininingwane yesithombe.', 'Lola (0-100%): Thuthukisa imiphetho nemininingwane.', 'I-Posterize (amazinga angu-0-16): Nciphisa amazinga ombala ukuze uthole umphumela we-poster.', 'Umphetho (0-255): Guqula ube mnyama/mhlophe ophindwe kabili endaweni yokuphela.', 'Ukutholwa Komphetho: Ama-algorithm e-Sobel noma e-Canny okubonisa imiphetho kuphela.', 'Guqula: Buyisela emuva yonke imibala.'],
    },
    {
      heading: 'Imodi Yokufaneleka',
      paragraphs: ['Indlela isithombe esimboziwe esifanelana ngayo nendawo yekhodi ye-QR:'],
      bullets: ['Isembozo: Isithombe sigcwalisa yonke indawo, sinqunywa uma kudingeka.', 'Iqukethe: Isithombe sonke siyabonakala, singase sibe nemingcele.', 'Ukwelula: Isithombe siyaphambuka ukuze sigcwaliseke kahle.'],
    },
    {
      heading: 'Izinketho Zokuguqula',
      paragraphs: ['Ukujikeleza: Phendukisa ukumboza ngezinyuko ezingama-90°.', 'Jikelezisa u-X/Y: Yenza isibuko sesithombe sivundlile noma siqonde phezulu.'],
    },
    {
      heading: 'Ama-Algorithm Okushintshashintshayo',
      paragraphs: ['I-Dithering iguqula izithombe zethoni eqhubekayo zibe amaphethini angamelwa amakhodi e-QR. Iyatholakala uma kusetshenziswa izindlela zokuxuba ze-Dithered, Blue Noise, noma i-True Dither.'],
      bullets: [
        'Ukusabalala Kwephutha: Isitayela se-Classic Floyd-Steinberg. Kusakazwa iphutha le-quantization kuma-pixel angomakhelwane.',
        'Ku-oda (Bayer): Kusetshenziswa i-threshold matrix yamaphethini ajwayelekile.',
        'I-Clustered Dot: Ilingisa ukuphrinta kwe-halftone.',
        'Ize kanye neQembu: Ukulungiswa kwe-dithering oku-odwe kahle.',
        'Umsindo Oluhlaza Okwesibhakabhaka: Iphethini ebukeka ingahleliwe ejabulisayo.',
        'Umphetho Womsindo Oluhlaza Okwesibhakabhaka: Umphetho ogobhoza ngomsindo oluhlaza okwesibhakabhaka.',
        'Umsindo Omhlophe: Ukuwohloka komkhawulo okungahleliwe.',
        'Umsindo weGaussian/Triangular: Umsindo onezinhlobo ezahlukene zokusabalalisa.',
        'Umsindo Oluhlaza Okwesibhakabhaka + Ukusabalalisa Amaphutha: I-Hybrid ehlanganisa zombili izindlela.',
        'Umsindo Oluhlaza Okwesibhakabhaka Ovikelwe: Iphethini yomsindo oluhlaza okwesibhakabhaka ofana nesikrini.',
        'Ukuqonda: Ukukhanya-kulinganiswe ngemiphumela emihle yokubona.',
        'Ukuqapha Unqenqema: Kugcina imiphetho yesithombe ngesikhathi sokucwiliswa.',
        'Umkhawulo Ozivumelanisa Nezimo: Umkhawulo Ozivumelanisa Nezimo Endaweni.',
        'Umsindo Oluhlaza Okwesikhashana: Kuma-GIF agqwayizayo, kuyahlukahluka iphethini ngohlaka ngalunye.',
      ],
    },
    {
      heading: 'Izinhlayiya Zokusabalalisa',
      paragraphs: ['Uma usebenzisa i-Error Diffusion dithering, khetha ukuthi iphutha lisatshalaliswa kanjani:'],
      bullets: ['UFloyd-Steinberg: Ukusabalala kwakudala komakhelwane abane. Ukukhetha okuhle okuvamile.', 'Jarvis-Judice-Ninke: 12-umakhelwane, obushelelezi kodwa ohamba kancane.', 'Stucki: Kufana no-JJN onezisindo ezahlukene.', 'UBurkes: I-JJN elula, esheshayo.', 'ISierra: Umndeni wama-kernel alinganisela ikhwalithi kanye nesivinini.', 'U-Atkinson: Ukusabalala kokukhanya, kulondoloza imininingwane kodwa kungaba yizinhlayiya.'],
    },
    {
      heading: 'Amandla Okulawula',
      paragraphs: ['Ilawula ukuthi kusetshenziswa ukuchelela okungakanani (0-100%). Amanani aphansi agcina iphethini yokuqala, amanani aphezulu abonisa imininingwane eminingi yesithombe.'],
    },
    {
      heading: 'Izilungiselelo ze-Subpixel',
      paragraphs: ['Uma usebenzisa imodi yokuxuba ye-Subpixel:'],
      bullets: ['Usayizi Wegridi: 2×2, 3×3, noma 4×4 ama-subpixels ngemojuli ngayinye. Okuphezulu = imininingwane eyengeziwe.', 'Umthetho Ophakathi: Okuqinile kudinga i-subpixel ephakathi ukuze ifane nemojuli. I-Halftone Center ivumela ukuhlukahluka.', 'Umbala Ongathathi hlangothi: Umbala osetshenziselwa ama-subpixel anganqunywanga.', 'Ukweqiwa Kokuthola: Indlela amaphethini okuthola ahunyushwa ngayo (Aqinile noma Ahlelwe Ngesitayela).'],
    },
    {
      heading: 'Izilungiselelo ze-Halftone',
      paragraphs: ['Uma usebenzisa imodi yokuxuba ye-Halftone:'],
      bullets: ['Usayizi Weseli: NgeModule ngayinye noma igridi engu-N×N.', 'Isimo Samachashazi: Indilinga, Isikwele, noma Umugqa.', 'Ijika Lokukhanya: Eliqondile, Eliyi-S, noma Eliyi-Gamma.'],
    },
    {
      heading: 'Imibala ye-Duotone',
      paragraphs: ['Uma usebenzisa imodi yokuxuba ye-Duotone, setha umbala we-Shadow (izindawo ezimnyama) kanye nombala we-Highlight (izindawo ezikhanyayo).'],
    },
    {
      heading: 'Izilungiselelo Zopopayi Ze-GIF',
      paragraphs: ['Uma usebenzisa ama-GIF overlay agqwayiziwe:'],
      bullets: ['Sebenzisa Ukulibaziseka Kwefreyimu: Hlonipha isikhathi sokuqala se-GIF.', 'I-FPS Ephakeme: Umkhawulo wesilinganiso sohlaka (1-60 fps).', 'Ukuphathwa Kokulahlwa: Hlonipha noma Yenza Lula Izindlela Zokulahla Uhlaka.'],
    },
    {
      heading: 'Izinketho Zokwenza Okuthuthukisiwe',
      paragraphs: ['Izilawuli ezengeziwe zokunikeza:'],
      bullets: ['Imodi Yesikhala: Akukho, Isethi Engaphakathi, I-Stroke, noma Isitayela Sesikhala Esingesihle.', 'Irediyasi Yekona: Amaphesenti amakhona ayindilinga amamojula.', 'I-Gradient: Ayikho, i-Linear, i-Radial, noma i-Conic gradient kumamojula.', 'Isitayela Sangaphandle/Sangaphakathi Seso: Isitayela esizimele samasongo ephethini le-finder.', 'Ukuzungeza Amachashazi: Zungezisa amamojula edayimane/amachashazi.', 'Isikali Samehlo: Ukulungiswa kosayizi wamaphethini e-finder.', 'Isitayela Sohlaka: Engeza ozimele bokuhlobisa (Uhlaka Oluyindilinga, Isitika, Ithegi).', 'Umbhalo Wohlaka: Engeza umbhalo onjengokuthi Ngiskene! kumafreyimu.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#render', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Ukufaka ikhodi kwe-QR Okuthuthukisiwe',
      paragraphs: ['Hlela kahle ikhodi ye-QR:'],
      bullets: ['Imodi Yokufaka Ikhodi: Okuzenzakalelayo, Izinombolo, Izinombolo Ezinezinombolo, I-Byte/UTF-8, noma i-Kanji.', 'Qinisekisa Indawo Encane Yokuthula: Qinisekisa okungenani imajini yamamojula angu-4.'],
    },
    {
      heading: 'Izinketho Zokukhipha Ezithuthukisiwe',
      paragraphs: ['Izilungiselelo ezengeziwe zokuthumela ngaphandle:'],
      bullets: ['Igama Lefayela: Igama lefayela elenziwe ngokwezifiso lokulanda.', 'Usayizi we-GIF Palette: Imibala engu-2-256 ekuphumeni kwe-GIF.', 'I-GIF Quantizer: Ukunciphisa umbala okuphakathi, i-NeuQuant, noma i-Octree.', 'Ukudilika kwe-GIF: Kuphelile, uFloyd-Steinberg, noma Ku-odawe.', 'Umbala Ocacile we-GIF: Setha umbala ukuze ubonakale.', 'I-SVG True Vector: Sebenzisa izindlela esikhundleni se-raster embedded.', 'Ukucaca Komumo we-SVG: Ukuboniswa kwendlela ye-Pixel noma enembile.', 'I-SVG Embed Raster Overlay: Faka i-overlay njengesithombe esifakiwe.', 'Ukweqiwa Kwesizinda: Phoqa umbala wangemuva othize ekuphumeni.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#output', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinketho Zokuqinisekisa',
      paragraphs: ['Izilungiselelo zokucubungula okokufaka:'],
      bullets: ['Qinisekisa Okufakiwe: Hlola ifomethi yokuqukethwe ngaphambi kokufaka ikhodi.', 'Sika isikhala esimhlophe: Susa izikhala eziholayo/ezilandelanayo.', 'Yenza imigqa emisha ibe yi-normalize: Guqula zonke iziphetho zemigqa zibe yi-LF.', 'Isivikelo Sobude Obuphezulu: Xwayisa uma okuqukethwe kudlula umthamo we-QR.'],
    },
    // Professional Features (sections 41-56)
    {
      heading: 'Izici Zobungcweti',
      paragraphs: ['Izinga Lobungcweti linezela ama-watermark, i-metadata, izinketho zokwabelana, ukuhlaziywa kokuphepha, amakhodi e-QR okukhokha, kanye nezici zebhizinisi.'],
      links: [{ href: '/?lang=${lang}&tab=professional', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Uphawu Lwamanzi',
      paragraphs: ['Engeza ama-watermark kumakhodi akho e-QR:'],
      bullets: ['Uhlobo: Umbhalo, Isithombe, noma uphawu lwephethini.', 'Isikhundla: Phakathi, Emakhoneni, Emaphethelweni, Ngemuva, noma Indawo Ethule.', 'Ukungafihli lutho: Ukucaca kwe-Watermark (0-100%).', 'Imodi Yokuxuba: Okuvamile, Ukuphindaphinda, Ukuhlanganisa Isikrini, noma Ukumboza.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#watermark', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
      ],
    },
    {
      heading: 'Imethadatha',
      paragraphs: ['Shumeka imethadatha kumafayela athunyelwe:'],
      bullets: ['Isihloko, Umbhali, Ilungelo Lokushicilela, Ilayisensi, Izinkambu Zencazelo.', 'Isikhathi Sokudala: Shumeka isitembu sesikhathi sokukhiqiza.', 'Inani Lokhiye Owenziwe Ngokwezifiso: Engeza amabhangqa emethadatha angahleliwe.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#metadata', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
      ],
    },
    {
      heading: 'Ukwabelana',
      paragraphs: ['Yabelana ngezilungiselelo zakho zekhodi ye-QR:'],
      bullets: ['Isixhumanisi Esiqondile: Dala i-URL engabiwa ngezilungiselelo zakho zamanje.', 'Shumeka i-HTML: Thola ikhodi yokushumeka yamawebhusayithi.', 'Amapharamitha Okufaka Ikhodi: Faka zonke izilungiselelo ku-URL yokwabelana.', 'Qaphela: Izithombe ezimboziwe ezivela kumafayela endawo azikwazi ukwabiwa nge-URL.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#share', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-7', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    {
      heading: 'Ukuhlaziywa Kokuphepha',
      paragraphs: ['Qinisekisa ukuthi amakhodi e-QR ahlala eskenwa:'],
      bullets: ['Imodi Yokuphepha: Izidingo zokuskena ezivaliwe, ezilinganisiwe, noma eziqinile.', 'Usayizi Omncane Wemojuli: Usayizi omncane wephikseli ngemojuli ngayinye.', 'Indawo Ethule Encane: Amamojula amancane omkhawulo.', 'Izitholi Zokukhiya/Isikhathi/Ukuqondanisa/Ifomethi/Inguqulo: Vikela izakhi ezithile.', 'Ubukhulu Bokunqwabelana Okuphezulu yi-ECC: Imikhawulo yokuqina okuzenzakalelayo ngokusekelwe ezingeni lokulungisa amaphutha.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-5', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    {
      heading: 'Izinhlobo Zokuqukethwe (Ochwepheshe)',
      paragraphs: ['Izinga lochwepheshe lengeza izinhlobo zokukhokha kanye nokuqukethwe kwebhizinisi:'],
      bullets: ['I-EPC/SEPA (EU): Amakhodi e-QR okudluliselwa kwebhange laseYurophu ane-IBAN, i-BIC, inani, ireferensi.', 'I-UPI (India): Isixhumanisi Sezinkokhelo Ezihlanganisiwe ne-VPA, igama lomuntu okhokhelwayo, inani.', 'I-PayNow (eSingapore): Inkokhelo esheshayo yaseSingapore nge-UEN noma inombolo yeselula.', 'I-PromptPay (Thailand): Uhlelo lokukhokha lukazwelonke lwaseThailand.', 'PIX (eBrazil): Inkokhelo esheshayo yaseBrazil ngokhiye we-PIX.', 'I-Crypto: Amakheli okukhokha e-Bitcoin, i-Ethereum, i-Litecoin anenani lokuzikhethela.', 'Isixhumanisi Somkhankaso Wokumaketha: ama-URL anokulandelela okugcwele kwepharamitha ye-UTM (Amathegi Okumaketha).', 'Isixhumanisi Esifushane: Sokusetshenziswa nezifinyezo ze-URL zamakhodi e-QR aguquguqukayo/alandelekayo.', 'Isixhumanisi Sedijithali se-GS1: Ukuhlonza umkhiqizo nge-GTIN, i-serial, i-batch, nokuphelelwa yisikhathi.', 'Isixhumanisi Esijulile Sohlelo Lokusebenza: izixhumanisi ezijulile zohlelo lokusebenza lwe-iOS/Android ezinezinhlelo ezenziwe ngokwezifiso.', 'Ifomethi Engokwezifiso: Idatha eluhlaza engenakho ukufometha noma ukuqinisekiswa.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-2', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    // Payment Standards (Language-Relevant) - section 42
    {
      heading: 'Izinkokhelo Ezihambisana Nolimi Kumodi Ethuthukisiwe',
      paragraphs: ['Uma usebenzisa imodi ethuthukisiwe, i-ANQR ikhombisa ngokuzenzakalelayo izindlela zokukhokha ezifanele ulimi lwakho olukhethile. Isibonelo, abasebenzisi baseVietnam babona i-VietQR, abasebenzisi baseThailand babona i-PromptPay, kanti abasebenzisi bolimi lwesiNdiya babona i-UPI ne-BharatQR. Izindlela zokukhokha zomhlaba wonke (i-cryptocurrency, i-PayPal, i-Cash App) ziyatholakala kuzo zonke izilimi. Imodi yobungcweti ivula zonke izindinganiso zokukhokha kungakhathalekile ukuthi ulimi luni.'],
      links: [{ href: '/?lang=${lang}&tab=advanced#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izindinganiso Zokukhokha ZaseYurophu',
      bullets: ['EPC/SEPA (EU): Amakhodi e-QR okudluliselwa kwebhange laseYurophu alandela i-EPC QR Code Standard. Isekela i-IBAN, i-BIC (ongakukhetha kwezasekhaya), inani nge-EUR, kanye nezinkomba zokukhokha ezihlelekile noma ezingahlelekile. Isetshenziswa kulo lonke indawo ye-SEPA kufaka phakathi amazwe e-EU kanye neSwitzerland, iNorway, i-Iceland, iLiechtenstein, iMonaco, neSan Marino.', 'I-Swiss QR-bill: Izinga lokukhokha laseSwitzerland elilandela Iziqondiso Zokusebenza Eziyisithupha. Isekela i-CHF ne-EUR, i-QR-Reference (QRR), i-Creditor Reference (ISO 11649), amakheli ahlelekile omkweletisi/okweletayo, kanye nolwazi lwebhili. Kuyadingeka kuma-invoyisi aseSwitzerland kusukela ngo-2022.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izindinganiso Zokukhokha ZaseNdiya',
      bullets: ['I-UPI (eNdiya): I-Unified Payments Interface elandela i-NPCI Deep Linking Specification. Isekela i-VPA (Ikheli Lokukhokha Elibonakalayo), igama lomuntu okhokhelwayo, inani ku-INR, inothi lokuthengiselana, i-ID yokubhekisela, ikhodi yesigaba somthengisi, kanye nemodi yokuthengiselana.', 'I-BharatQR (eNdiya): Indinganiso ye-QR ehlanganisiwe esekela kokubili izinkokhelo ze-UPI kanye nekhadi. Ihlanganisa i-UPI VPA nekhadi le-PAN ukuze ivumelane kakhulu. Ifaka igama lomthengisi, idolobha, i-MCC, imininingwane ye-GST, kanye nezinombolo ze-invoyisi/ireferensi.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izindinganiso Zokukhokha ZaseNingizimu-mpumalanga ye-Asia',
      bullets: ['I-PayNow (eSingapore): Uhlelo lokukhokha okusheshayo lwaseSingapore olusebenzisa imininingwane ye-EMVCo QR enephrofayili ye-SGQR. Isekela i-UEN (ukubhaliswa kwebhizinisi), inombolo yeselula, noma i-NRIC njengezihlonzi ze-proxy. Kufaka phakathi ifulegi lokuhlela inani kanye nosuku lokuphelelwa yisikhathi.', 'I-PromptPay (Thailand): Uhlelo lokukhokha lukazwelonke lwaseThailand olulandela iphrofayili ye-EMV yeBhange laseThailand. Isekela inombolo yeselula, i-ID kazwelonke, i-ID yentela, i-ID ye-e-wallet, kanye nokukhokha ibhili ngezinkambu eziningi zokubhekisela.', 'I-QRIS (Indonesia): Ikhodi Yokuphendula Okusheshayo I-Indonesian Standard. Izindinganiso zokukhokha zikazwelonke ezisekelwe ku-EMV ezisekela i-Merchant ID, i-NMID (i-National Merchant ID), ukuhlukaniswa kwezindlela zomthengisi, kanye nezimali zokunethezeka (ezingaguquki noma iphesenti).', 'DuitNow (Malaysia): Uhlelo lokukhokha okusheshayo lwaseMalaysia. Lusekela izinhlobo eziningi ze-proxy ezifaka i-NRIC, iselula, ipasipoti, i-ID yezempi, kanye nezinombolo zokubhalisa zebhizinisi.', 'I-VietQR (iVietnam): Indinganiso yokudlulisa phakathi kwamabhange aseVietnam. Idinga i-BIN yasebhange (ukuhlonza i-NAPAS) kanye nenombolo ye-akhawunti. Isekela amakhodi amaningi esevisi ezinhlobo ezahlukene zokudlulisa (i-QRPUSH, i-QRIBFTTA, i-QRIBFTTC).', 'I-QR Ph (ePhilippines): Izinga lokukhokha le-Philippine QR le-InstaPay kanye ne-PESONet. Isebenzisa izinombolo ze-akhawunti ezinobunikazi bomthengisi kwezentengiselwano ze-P2M (umuntu kuya kumthengisi).'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izindinganiso Zokukhokha zaseMpumalanga Asia',
      bullets: ['TWQR (Taiwan): Izinga lokukhokha le-QR laseTaiwan. Lisekela i-ID yomthengisi, i-ID yentela, kanye namanani e-TWD.', 'HKQR/FPS (Hong Kong): Amakhodi e-QR eSistimu Yokukhokha Esheshayo yaseHong Kong. Isekela i-FPS ID, inombolo yeselula, noma i-imeyili njengezikhombi zokukhokha. Amanani ku-HKD.', 'I-JPQR (eJapane): Ikhodi ye-QR ehlanganisiwe yaseJapan ejwayelekile. Isebenzisa i-ID yesitolo ukuhlonza umthengisi ngamanani e-JPY.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Ezinye Izindinganiso Zokukhokha Zesifunda',
      bullets: ['PIX (eBrazil): Uhlelo lokukhokha olusheshayo lweBhange Eliphakathi laseBrazil lulandela ukucaciswa kwekhodi ye-BR. Lusekela okhiye be-PIX (i-CPF, i-CNPJ, i-imeyili, ifoni, noma ukhiye ongahleliwe), igama/idolobha lomthengisi, i-ID yokuthengiselana, kanye namanani e-BRL.', 'I-AusPayNet/NPP PayID (e-Australia): Uhlelo lwe-PayID Yeplatifomu Yokukhokha Entsha yase-Australia. Isekela izinhlobo ze-PayID (i-imeyili, iselula, i-ABN, i-ID yenhlangano) noma inombolo ye-akhawunti yendabuko ye-BSB +. Igama lomthengisi liyazikhethela njengoba abakhokhi bebona igama elibhalisiwe ekufuneni kwe-NPP.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinkokhelo Zemali Yedijithali',
      bullets: ['I-Bitcoin/i-Litecoin (BIP-21): Ama-URI ajwayelekile okukhokha nge-cryptocurrency anekheli lesikhwama, inani lokuzikhethela, kanye nelebula. Iyahambisana nazo zonke izikhwama ezinkulu ze-Bitcoin ne-Litecoin.', 'Inethiwekhi Yombani (BOLT11): Ama-invoyisi okukhokha eNethiwekhi Yombani. Namathisela uchungechunge lwe-invoyisi olufakwe ikhodi ye-BOLT11 ukuze uthole izinkokhelo ze-Bitcoin ezisheshayo ezinezindleko ezincane.', 'I-Ethereum (EIP-681): Ama-URI esicelo sokuthengiselana kwe-Ethereum asekela ukudluliselwa kwe-ETH yomdabu kanye nokudluliselwa kwamathokheni e-ERC-20. Kufaka phakathi i-ID yochungechunge lokusekelwa kwenethiwekhi eminingi (i-Mainnet, i-Polygon, i-BSC, i-Arbitrum, i-Optimism, i-Avalanche), amapharamitha egesi, kanye nezingcingo zomsebenzi wenkontileka.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinsizakalo Zesixhumanisi Sokukhokha',
      bullets: ['I-PayPal.Me: Izixhumanisi zokukhokha ze-PayPal negama lomsebenzisi kanye nenani eligcwaliswe kusengaphambili elizikhethela lona. Abamukeli bangakhokha ngebhalansi ye-PayPal, amakhadi, noma ama-akhawunti asebhange.', 'I-Cash App: Izixhumanisi zokukhokha ze-Cash App zisebenzisa i-$cashtag enenani lokuzikhethela. Idumile e-United States ngezinkokhelo zontanga.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'I-EMV QR Ejwayelekile',
      bullets: ['I-EMV Generic: Dala amakhodi e-QR emodi ye-EMV Merchant-Presented Mode ngokwezifiso zohlelo lokukhokha olungafakwanga ohlwini oluqondile. Lungiselela igama lomthengisi, idolobha, ikhodi yezwe (ISO 3166-1), ikhodi yemali (inombolo ye-ISO 4217), i-MCC, izinketho zemali yethiphu/yokulula, kanye nezinkambu zedatha ezengeziwe. Kuwusizo ekuhlolweni noma ekuhlanganisweni ngokwezifiso.'],
      links: [{ href: '/?lang=${lang}&tab=professional#payload', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    // Professional Overlay/Render sections (continued)
    {
      heading: 'Izindlela Zokuhlanganisa Ezimboziwe (Zobungcweti)',
      paragraphs: ['Izindlela ezengeziwe zokuxuba ezingeni lobuchwepheshe:'],
      bullets: ['I-Pixelate: Umphumela wokumboza nge-Pixelated.', 'Uhlaka: Isembozo sokutholwa komphetho esibonisa ama-contour kuphela.', 'Igagasi: Umphumela wokuhlanekezela kwamagagasi.', 'Usayizi we-Subpixel: Usayizi we-subpixel oguquguqukayo ngokusekelwe esithombeni.', 'I-True Dither: Ukucwilisa okuthuthukisiwe ngokukhethwa kwe-matrix okuhleliwe.', 'Okukhulu: Ukubonakala okuphezulu kwesithombe, kungathinta ukuskenwa.'],
      links: [{ href: '/?lang=${lang}&tab=professional#overlay', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izilungiselelo Zokuvikela',
      paragraphs: ['Ukulawula okucolekile ukuthi izakhi ze-QR zivikelwe kuphi ekuguqulweni kwembondela:'],
      bullets: ['Londoloza Isikhathi: Gcina amaphethini esikhathi engashintshiwe.', 'Londoloza Ukuqondanisa: Gcina amaphethini okuqondanisa engashintshiwe.', 'Vikela Ulwazi Lwefomethi: Amamojula olwazi lwefomethi ye-Shield.', 'Vikela Ulwazi Lwenguqulo: Amamojula olwazi lwenguqulo yesivikelo.'],
    },
    {
      heading: 'Imodi Yokuqaphela I-ECC',
      paragraphs: ['Isabalalisa ngobuhlakani ubukhulu be-overlay ngokusekelwe kumthamo wokulungisa amaphutha. Uhlelo luhlaziya ukuthi yimaphi amamojula angashintshwa ngenkathi kugcinwa ukuskenwa.'],
      bullets: ['Isabelomali Sengozi: Amaphesenti omthamo wokulungisa amaphutha okufanele usetshenziswe (0-100%).', 'Isabelomali esiphezulu = ukunqwabelanisa okubonakalayo kodwa ukuskenwa okuyingozi.', 'Isabelomali esiphansi = ukuskena okuphephile kodwa okungabonakali kangako.'],
      links: [{ href: '/?lang=${lang}&tab=professional#overlay', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinketho Zokwenza Umdwebo Ngobungcweti',
      paragraphs: ['Izilawuli zokunikeza ezithuthukisiwe:'],
      bullets: ['Imiphetho Ecwebezelayo: Sebenzisa ukwenziwa kwesithombe esinamaphikseli emiphethweni ebukhali yemojula.', 'I-Pixel Snap: Ukulungiswa kwe-pixel yesitezi, esiyindilinga, noma esesilingeni.', 'Imodi Yombala Ngemojuli: Iqinile, Ngokukhanya, Ngesikhundla, Ngokumboza, Ngeqembu.', 'Iphalethi Yombala: Chaza iphalethi yombala ngokwezifiso yokufaka umbala ngemojuli ngayinye.', 'I-Contrast Guard: Qinisekisa isilinganiso esincane sokungafani phakathi kwemibala.', 'Isilinganiso Esincane Sokuqhathanisa: Imfuneko Yokuqhathanisa Yesitayela se-WCAG (1:1 kuya ku-21:1).', 'Amamojula Emingcele Engeziwe: Umngcele owengeziwe ngale kwendawo ethule.'],
      links: [{ href: '/?lang=${lang}&tab=professional#render', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izinketho Zokukhipha Zobungcweti',
      paragraphs: ['Izilungiselelo zokuthumela ngaphandle kwebhizinisi:'],
      bullets: ['DPI: Setha isinqumo sokuphrinta (72-600 DPI). Kunconywa i-DPI engu-300 ukuze iphrintwe.', 'Faka Indawo Ethule: Guqula indawo ethule ngobukhulu bokukhipha.', 'Thumela Njengokwengeziwe: Khiqiza i-PDF kanye nefomethi eyinhloko.'],
      links: [{ href: '/?lang=${lang}&tab=professional#output', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Izilungiselelo Zopopayi (Ochwepheshe)',
      paragraphs: ['Izici ezengeziwe zopopayi bobungcweti:'],
      bullets: ['I-Temporal Dither: Ivaliwe, Umsindo Oluhlaza okwesibhakabhaka, noma Ukufiphaza Okuphephile ngohlaka ngalunye.', 'Iphethini: Ayikho, i-Pulse, i-Wave, i-Scanline, i-Shimmer, noma imiphumela ye-Drift.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#animation', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' },
        { href: '/learn?lang=${lang}#section-4', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' },
      ],
    },
    // API Reference (sections 57-69)
    {
      heading: 'Ireferensi ye-API',
      paragraphs: ['I-ANQR inikeza i-API eseceleni kweseva yokukhiqiza amakhodi e-QR ngamapharamitha e-URL. Lokhu kulungele ukushumeka amakhodi e-QR kumawebhusayithi, ama-imeyili, amadokhumenti, noma imisebenzi ezenzakalelayo ngaphandle kwe-JavaScript eseceleni kweklayenti.', 'I-URL Eyisisekelo: https://anqr.link/api/qr'],
      links: [{ href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' }],
    },
    {
      heading: 'Amapharamitha Ayisisekelo',
      paragraphs: ['Amapharamitha adingekayo navamile (amagama amapharamitha awahunyushwa):'],
      bullets: ['idatha (iyadingeka): Okuqukethwe okufanele kufakwe ikhodi kukhodi ye-QR. Faka ikhodi ye-URL ngezinhlamvu ezikhethekile.', 'usayizi: Usayizi wesithombe ngamaphikseli (okuzenzakalelayo: 400, ubuningi: 2000). Kusetshenziswa uma kungacacisiwe.', 'w, h: Ububanzi bokukhipha kanye nokuphakama ngamaphikseli. Ikhipha ipharamitha yosayizi.', 'ifomethi: Ifomethi yokuphuma — png, webp, noma gif (okuzenzakalelayo: png).', 'ec: Izinga lokulungisa amaphutha — L, M, Q, noma H (okuzenzakalelayo: H).', 'fg: Umbala ongaphambili njenge-hex ngaphandle kwe-# (okuzenzakalelayo: 000000).', 'bg: Umbala wangemuva njenge-hex ngaphandle kwe-# (okuzenzakalelayo: ffffff).', 'okusobala: Setha ku-1 ukuze uthole ingemuva elibonakalayo.', 'umkhawulo: Indawo ethule kumamojula (okuzenzakalelayo: 4).'],
    },
    {
      heading: 'Amapharamitha Okwenza Isitayela',
      paragraphs: ['Isitayela seModule kanye nephethini:'],
      bullets: ['isitayela: Isitayela semojuli — isikwele, isiyingi, amachashazi, idayimane, ixhunyiwe.', 'isitholi: Isitayela sephethini yesitholi — isikwele, isiyingi, indilinga.', 'ukuqondanisa: Isitayela sephethini yokuqondanisa — isitholi_sokulinganisa, isikwele, isiyingi, indilinga.', 'isikhathi: Isitayela sephethini yesikhathi — imojula_yokulinganisa, eqinile, efiphele.', 'irediyasi: Iphesenti lerediyasi yekona 0-100.', 'igebe: Iphesenti legebe lemojuli 0-50.', 'Imodi yegebe: Imodi yegebe — akukho, isethi engaphakathi, i-stroke, isikhala_esingesihle.', 'i-eyeOuter, i-eyeInner: Izitayela zamehlo — isikwele, isiyingi, indilinga.', 'Isikali samehlo: Amaphesenti esikali samehlo (okuzenzakalelayo: 100).', 'i-gradient: Uhlobo lwe-gradient — alukho, oluqondile, oluyi-radial, oluyi-conic.', 'gradAngle: I-Gradient angle yama-gradient aqondile.', 'i-gradStops: I-Gradient iyama njengombala1, pos1, umbala2, pos2,… (isb., ff0000,0,0000ff,1).'],
    },
    {
      heading: 'Amapharamitha Okumboza',
      paragraphs: ['Izinketho zokumboza isithombe (isithombe sokumboza sithathwa ohlangothini lweseva):'],
      bullets: ['img: I-URL yokubeka isithombe ngaphezulu (kumele ifinyeleleke emphakathini).', 'imodi: Imodi yokumboza — isikhungo, ithoni eyingxenye, inhlanganisela, ukukhanya, i-mosaic, ukugoba, umsindo oluhlaza okwesibhakabhaka, i-subpixel.', 'ukuqina: Ukuqina kwembondela 0-100 (okuzenzakalelayo: 100).', 'iModi yombala: Imodi yombala we-Overlay — umbala, i-grayscale, bw.', 'ukulingana: Indlela imbondela efanelana ngayo — vala, gcina, welula.', 'ukubola: Ukujikeleza okumboziwe ngamadigri.', 'flipX, flipY: Setha ku-1 ukuze uphendule imbondela.', 'keepFinders: Gcina amaphethini esitholi (okuzenzakalelayo: 1).', 'keepTiming, keepAlign: Setha ku-1 ukuze kulondolozwe amaphethini okugcina isikhathi/ukuqondanisa.'],
    },
    {
      heading: 'Amapharamitha Okucubungula Ngaphambi Kokusebenza',
      paragraphs: ['Ukucubungula isithombe kusengaphambili kusetshenziswe ekumbozeni:'],
      bullets: ['ukukhanya: Ukulungiswa -100 kuya ku-100 (okuzenzakalelayo: 0).', 'umehluko: Ukulungiswa -100 kuya ku-100 (okuzenzakalelayo: 0).', 'i-gamma: Inani 0.1 kuya ku-3 (okuzenzakalelayo: 1).', 'ukugcwala: Ukulungiswa -100 kuya ku-100 (okuzenzakalelayo: 0).', 'umbala: Ukujikeleza kombala ngamadigri.', 'ukufiphaza: Ukufiphaza kumaphikseli.', 'lola: Lola inani 0-100.', 'ukwenza i-posterize: Ukwenza i-posterize amazinga.', 'umkhawulo: Umkhawulo we-Binary 0-255.', 'unqenqema: Ukutholwa konqenqema — kuvaliwe, kupholile, kuyisiwula.', 'guqula: Setha ku-1 ukuze uguqule imibala.'],
    },
    {
      heading: 'Amapharamitha e-Watermark',
      paragraphs: ['Engeza ama-watermark kumakhodi e-QR akhiqiziwe:'],
      bullets: ['wmEn: Setha ku-1 ukuze unike amandla uphawu lwe-watermark.', 'wmKind: Uhlobo lwe-Watermark — umbhalo, isithombe, iphethini.', 'wmText: Umbhalo we-Watermark (obhalwe nge-URL).', 'wmImg: I-URL yesithombe se-watermark.', 'wmPos: Indawo — phakathi, amakhona, imiphetho, ngemuva, indawo ethule.', 'wmOpacity: Opacity 0-100 (okuzenzakalelayo: 50).', 'wmBlend: Imodi yokuhlanganisa — evamile, ukuphindaphinda, isikrini, ukumboza.'],
    },
    {
      heading: 'Amapharamitha Opopayi',
      paragraphs: ['Kokukhipha kwe-GIF okugqwayizayo (kudinga ifomethi=i-gif):'],
      bullets: ['i-animPattern: Iphethini ye-animation — akukho, i-pulse, igagasi, umugqa wokuskena, ukucwazimula, ukuzulazula, umjikelezo_wombala.', 'Amafreyimu e-anim: Inani lamafreyimu 1-60 (okuzenzakalelayo: 24).', 'i-animSpeed: Ukulibaziseka kohlaka kuma-milliseconds 10-1000 (okuzenzakalelayo: 100).', 'i-animSeed: Imbewu engahleliwe ye-animation.', 'ukulula: Ukululaza izithombe — okuqondile, okulula_ukungena, okulula_ukuphuma, okulula_ukuphuma_ekungeneni, ukugxuma.'],
    },
    {
      heading: 'Amapharamitha Okukhipha',
      paragraphs: ['Izinketho zefomethi yokuphuma:'],
      bullets: ['ikhwalithi: Ikhwalithi ye-WebP 0-1 (okuzenzakalelayo: 0.9).', 'webpQ: Ikhwalithi ye-WebP 0-100 (okuzenzakalelayo: 90).', 'Imibala ye-gif: usayizi wephalethi ye-GIF 2-256 (okuzenzakalelayo: 256).', 'dpi: I-DPI yokukhipha ye-PNG (okuzenzakalelayo: 72).', 'i-metaTitle, i-metaAuthor, i-metaCopy, i-metaDesc: amasimu e-metadata e-PNG.'],
    },
    {
      heading: 'Isibonelo Sokusetshenziswa',
      paragraphs: ['Ikhodi ye-QR eyisisekelo:', 'https://anqr.link/api/qr?data=https://example.com', 'Ikhodi ye-QR enesitayela enemibala eyenziwe ngokwezifiso:', 'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30', 'Ikhodi ye-QR enesithombe esimboziwe:', 'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70', 'I-GIF Egqwayizayo:', 'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out'],
      links: [{ href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' }],
    },
    {
      heading: 'Ukushumeka Amakhodi e-QR',
      paragraphs: ['Kumodi yobungcweti, isici sokwabelana sikhiqiza i-HTML nama-URL afakekayo. Nansi indlela okusebenza ngayo ukushumeka:'],
      bullets: ['Isixhumanisi Sokwabelana: Kudala i-URL kuhlelo lokusebenza lwe-ANQR nazo zonke izilungiselelo zakho ezifakwe ikhodi njengemingcele ye-URL. Abamukeli bangabuka futhi bashintshe ikhodi ye-QR.', 'Shumeka Isithombe: Kudala ithegi ekhomba ku-API yeseva. Ikhodi ye-QR ihunyushwa njenge-server-side futhi isetshenziswa njengesithombe.', 'Shumeka i-Markdown: Idala i-syntax yesithombe se-Markdown yamadokhumenti namafayela e-README.', 'I-URL ye-API Eqondile: I-URL ye-API eluhlaza esetshenziswa kuzinhlelo zokusebenza, izikripthi, noma ezinye izihlanganisi.'],
      links: [{ href: '/?lang=${lang}&tab=professional#share', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
    {
      heading: 'Isibonelo se-HTML',
      paragraphs: ['Ukushumeka ikhodi ye-QR kuwebhusayithi yakho:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR Code />', 'Ngosayizi ophendulayo:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR Code style=max-width: 100%; height: auto; />', 'Iseva igcina izimpendulo ngama-header amade e-cache, ngakho-ke izicelo eziphindaphindwayo ze-URL efanayo ziyashesha.'],
    },
    {
      heading: 'Ifomethi ye-URL yokwabelana',
      paragraphs: ['Uma uchofoza ukuthi Yabelana ngemodi yobungcweti, i-ANQR ifaka ikhodi kuzilungiselelo zakho zamanje kumapharamitha e-URL. Ifomethi yile:', 'https://anqr.link/?data=…&ec=H&style=rounded&….', 'Lezi zinhlaka zibonisa amapharamitha e-API, ngakho-ke ungaguqula i-URL yokwabelana ibe yi-URL ye-API ngokushintsha indlela eyisisekelo kusuka ku-/ kuya ku-/api/qr bese ulungisa amapharamitha e-w/h njengoba kudingeka.', 'Qaphela: Izithombe ezimboziwe ezilayishwe kumafayela endawo azikwazi ukwabiwa nge-URL — kuphela ukumbozwa okusekelwe ku-URL (ipharamitha ye-img) okusebenza kuzixhumanisi ezabiwe kanye nezingcingo ze-API.'],
    },
    {
      heading: 'Imikhawulo Yezilinganiso Nokusetshenziswa',
      paragraphs: ['I-API imahhala ukuyisebenzisa ukuze kube namavolumu afanele. Ukuze uthole ukusetshenziswa okuphezulu noma izinhlelo zokusebenza zezentengiselwano ezidinga isikhathi esiqinisekisiwe sokusebenza, sicela usithinte.', 'Izimpendulo ze-API zifaka phakathi ama-header e-caching anamandla. Ukuze usebenze kahle kakhulu, gcina izimpendulo ze-cache ohlangothini lwakho noma usebenzise i-URL efanayo njalo kumakhodi e-QR afanayo.'],
    },
    // Best Practices & Troubleshooting (sections 70+)
    {
      heading: 'Imikhuba Emihle Kakhulu',
      paragraphs: ['Landela lezi ziqondiso ukuze uthole amakhodi e-QR athembekile:'],
      bullets: ['Hlola njalo amakhodi akho e-QR ngezinhlelo zokusebenza eziningi zokuskena ngaphambi kokuphrinta.', 'Sebenzisa Ukulungiswa Kwephutha H (Okuphezulu) uma ungeza ama-overlay.', 'Gcina okungenani amamojula ama-4 endawo ethule (umkhawulo).', 'Qinisekisa umehluko omkhulu phakathi kwengaphambili nengemuva.', 'Ukuze uphrinte, sebenzisa okungenani i-300 DPI bese uhlola ngobukhulu bangempela bokuphrinta.', 'Nika amandla amaphethini e-Preserve Finder uma usebenzisa ama-overlays.', 'Qala ngamandla aphansi okumboza bese ukhula kancane kancane.', 'Ukuze kusetshenziswe ngaphandle, cabanga ngosayizi omkhulu wamamojula kanye nokulungiswa kwamaphutha aphezulu.'],
      links: [
        { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
        { href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' },
      ],
    },
    {
      heading: 'Ukuxazulula Izinkinga',
      paragraphs: ['Izinkinga ezivamile kanye nezixazululo:'],
      bullets: ['I-QR ngeke iskene: Yehlisa ukuqina kwe-overlay, yandisa ukulungiswa kwamaphutha, hlola umehluko.', 'Ikhodi inkulu kakhulu: Nciphisa ubude bokuqukethwe, sebenzisa isifinyezo se-URL, inguqulo ephansi.', 'Ukukhipha okufiphele: Khulisa usayizi wemojula, sebenzisa i-PNG esikhundleni samafomethi acindezelwe.', 'Imibala ayibonakali kahle: Hlola ukungafani kombala, zama imodi yokumboza nge-grayscale.', 'I-GIF ayigqwayizi: Qinisekisa ukuthi usebenzisa umphumela wefomethi ye-GIF, hlola inani lozimele.', 'Ukumbozwa kwesithombe akulayishwa: Hlola izimvume ze-CORS ezithombeni ezikude.'],
      links: [{ href: '/learn?lang=${lang}#section-5', label: 'Bona imihlahlandlela ehlobene nezibonelo', type: 'learn' }],
    },
    {
      heading: 'Izinqamuleli Zekhibhodi',
      paragraphs: ['I-ANQR isekela izinqamuleli zekhibhodi ezijwayelekile. Sebenzisa i-Ctrl/Cmd+S ukuze uqale ukuthumela ngaphandle (uma kugxilwe ekubukeni kuqala).'],
    },
    {
      heading: 'Ukwabelana Nokushumeka',
      paragraphs: ['Kumodi yobungcweti, chofoza inkinobho ethi Yabelana ukuze ukopishe i-URL ngezilungiselelo zakho zamanje. Abamukeli bangavula le URL ukuze babone ukucushwa kwakho okuqondile. Qaphela: Izithombe ezimboziwe ezivela kumafayela endawo azikwazi ukwabiwa nge-URL.'],
      links: [{ href: '/?lang=${lang}&tab=professional#share', label: 'Zama lokhu kumisa ngqo kujeneretha ye-ANQR.', type: 'generator' }],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Phequlula izindatshana zokufunda', type: 'learn' },
    { href: '/examples?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Buka izibonelo ze-QR', type: 'gallery' },
    { href: '/?lang=${lang}', label: 'Vula ijeneretha', type: 'generator' },
  ],
};

export default guide;
