import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Učite uz ANQR',
  description: 'Praktični vodiči za poboljšanje QR kampanja, plaćanja, marketinga i dijeljenja na više jezika.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Otvorite generator', type: 'generator' },
    { href: '/guide?lang=${lang}', label: 'Otvorite cijeli korisnički priručnik', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Pogledajte QR primjere', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: 'Poboljšanje postojećih QR kampanja',
      paragraphs: ['Kako revidirati, nadograditi i sigurno zamijeniti postojeće QR kodove bez prekidanja korisničkih putovanja.'],
      images: [{ src: '/images/learn/campaign-overview.svg', alt: 'Poboljšanje postojećih QR kampanja', caption: 'Kako revidirati, nadograditi i sigurno zamijeniti postojeće QR kodove bez prekidanja korisničkih putovanja.' }],
    },
    {
      heading: 'Zašto nadograditi postojeće QR kodove?',
      paragraphs: ['Mnoge tvrtke već imaju QR kodove u optjecaju — na pakiranjima, natpisima, materijalima za ispis ili proizvodima. Ovi kodovi često koriste osnovne dizajne bez markiranja, lošeg ispravljanja pogrešaka ili neadekvatnih tihih zona. Njihova nadogradnja može poboljšati pouzdanost skeniranja, prepoznatljivost marke i praćenje kampanje bez mijenjanja odredišnog URL-a.'],
    },
    {
      heading: 'Provjera vaših trenutnih QR kodova',
      paragraphs: ['Prije zamjene bilo kojeg QR koda provjerite što imate. Skenirajte svaki kod s više aplikacija (iOS Camera, Google Lens, namjenski QR skeneri) kako biste potvrdili da rade. Zabilježite kodirani sadržaj, veličinu ispisa, položaj i eventualne probleme sa skeniranjem. Dokumentirajte koji se kodovi nalaze na trajnim materijalima (urezani znakovi, pakiranja proizvoda) u odnosu na privremene (posteri, letci).'],
      images: [
        { src: '/images/learn/campaign-before.svg', alt: 'Provjera vaših trenutnih QR kodova', caption: 'Prije zamjene bilo kojeg QR koda provjerite što imate. Skenirajte svaki kod s više aplikacija (iOS Camera, Google Lens, namjenski QR skeneri) kako biste potvrdili da rade. Zabilježite kodirani sadržaj, veličinu ispisa, položaj i eventualne probleme sa skeniranjem. Dokumentirajte koji se kodovi nalaze na trajnim materijalima (urezani znakovi, pakiranja proizvoda) u odnosu na privremene (posteri, letci).' },
        { src: '/images/learn/campaign-after.svg', alt: 'Provjera vaših trenutnih QR kodova', caption: 'Prije zamjene bilo kojeg QR koda provjerite što imate. Skenirajte svaki kod s više aplikacija (iOS Camera, Google Lens, namjenski QR skeneri) kako biste potvrdili da rade. Zabilježite kodirani sadržaj, veličinu ispisa, položaj i eventualne probleme sa skeniranjem. Dokumentirajte koji se kodovi nalaze na trajnim materijalima (urezani znakovi, pakiranja proizvoda) u odnosu na privremene (posteri, letci).' },
      ],
    },
    {
      heading: 'Strategija sigurne zamjene',
      paragraphs: ['Za kodove na trajnim materijalima razmislite o korištenju URL skraćivača ili usluge preusmjeravanja kako biste mogli promijeniti odredište bez ponovnog ispisa. Za privremene materijale možete sigurno zamijeniti nadograđenim dizajnom. Uvijek testirajte novi kod na stvarnoj veličini ispisa prije masovne proizvodnje.'],
    },
    {
      heading: 'Sigurno dodavanje robne marke',
      paragraphs: ['ANQR vam omogućuje dodavanje logotipa i boja marke uz zadržavanje mogućnosti skeniranja. Koristite Ispravljanje pogrešaka H (Visoko) kada dodajete preklapanja — to osigurava 30% redundancije. Omogućite \'Preserve Finder Patterns\' kako biste kutne kvadrate zadržali netaknutima. Započnite s niskim intenzitetom sloja (50-70%) i temeljito testirajte.'],
    },
    {
      heading: 'Ispis nasuprot digitalnom razmatranju',
      paragraphs: ['Ispis QR kodova zahtijeva veću razlučivost (300+ DPI) i veće tihe zone kako bi se uzela u obzir tekstura papira i udaljenost gledanja. Digitalni QR kodovi na zaslonima mogu biti manji, ali moraju uzeti u obzir odsjaj zaslona i stope osvježavanja. ANQR-ov Safety Mode pomaže u provođenju minimalnih veličina za oba konteksta.'],
    },
    {
      heading: 'Testiranje vaših nadograđenih kodova',
      paragraphs: ['Uvijek testirajte sa: (1) više aplikacija skenera, (2) različitim uvjetima osvjetljenja, (3) različitim udaljenostima, (4) stvarnim materijalom za ispis ili vrstom zaslona. Ugrađena provjera valjanosti ANQR-a skenira generirani kod kako bi provjerila ispravnost dekodiranja.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#overlay', label: 'Otvorite preporučene postavke ovog vodiča u ANQR generatoru.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Pogledajte povezane vodiče i primjere', type: 'example' },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: 'QR kodovi za maloprodajna plaćanja',
      paragraphs: ['Dizajnirajte QR kodove za plaćanje koji se brzo skeniraju, koji su ugrađeni u robnu marku i koji su kompatibilni s glavnim novčanicima.'],
      images: [{ src: '/images/learn/retail-payment-overview.svg', alt: 'QR kodovi za maloprodajna plaćanja', caption: 'Dizajnirajte QR kodove za plaćanje koji se brzo skeniraju, koji su ugrađeni u robnu marku i koji su kompatibilni s glavnim novčanicima.' }],
    },
    {
      heading: 'QR zahtjevi za plaćanje',
      paragraphs: ['QR kodovi za plaćanje imaju strože zahtjeve od marketinških kodova. Moraju brzo skenirati (kupci čekaju), raditi s određenim aplikacijama novčanika i ispunjavati standarde sukladnosti. Većina standarda plaćanja (UPI, PayNow, SEPA) navodi točne formate kodiranja koje ANQR podržava.'],
    },
    {
      heading: 'Određivanje veličine za prodajno mjesto',
      paragraphs: ['Zasloni brojača trebaju kodove od najmanje 3 cm (1,2 in) kvadrata za skeniranje iz ruke na udaljenosti od 15-30 cm. Zidni kodovi za skeniranje u redu čekanja trebaju biti 8-15 cm (3-6 in) za udaljenost od 0,5-2 m. ANQR-ov Safety Mode nameće minimalne veličine modula prikladne za kontekst plaćanja.'],
      images: [{ src: '/images/learn/retail-sizing.svg', alt: 'Određivanje veličine za prodajno mjesto', caption: 'Zasloni brojača trebaju kodove od najmanje 3 cm (1,2 in) kvadrata za skeniranje iz ruke na udaljenosti od 15-30 cm. Zidni kodovi za skeniranje u redu čekanja trebaju biti 8-15 cm (3-6 in) za udaljenost od 0,5-2 m. ANQR-ov Safety Mode nameće minimalne veličine modula prikladne za kontekst plaćanja.' }],
    },
    {
      heading: 'Brendiranje unutar usklađenosti',
      paragraphs: ['QR kodovi za plaćanje mogu sadržavati robnu marku trgovca, ali uz ograničenja. Neka logotipi budu mali (ispod 20% područja koda), održavajte visoki kontrast i nikada ne mijenjajte uzorke tražila. Upotrijebite Ispravljanje pogrešaka H i testirajte sa stvarnim aplikacijama za plaćanje koje koriste vaši klijenti (Google Pay, Apple Wallet, bankovne aplikacije).'],
    },
    {
      heading: 'POS izložbeni materijali',
      paragraphs: ['Laminirani zasloni otporni su na otiske prstiju, ali mogu izazvati odsjaj. Mat završni sloj bolje skenira u svijetlim okruženjima. Zakošeni stalci (15-30°) smanjuju refleksiju. Uzmite u obzir čimbenike okoliša: vanjske naplatne točke trebaju zaštitu od vremenskih uvjeta i možda će trebati veće kodove za varijabilnu rasvjetu.'],
    },
    {
      heading: 'Regionalni standardi plaćanja',
      paragraphs: ['ANQR podržava regionalne formate plaćanja: UPI/BharatQR (Indija), PayNow (Singapur), PromptPay (Tajland), PIX (Brazil), SEPA/EPC (Europa) i više. Svaki ima posebne zahtjeve za polje — koristite ANQR-ove predloške plaćanja kako biste osigurali usklađenost.'],
    },
    {
      heading: 'Testiranje kodova plaćanja',
      paragraphs: ['Testirajte sa stvarnim aplikacijama za plaćanje, a ne samo s generičkim QR skenerima. Provjerite ispravno analizirani iznos uplate, pojedinosti o primatelju i referentna polja. Testirajte u stvarnom okruženju instalacije sa stvarnim svjetlosnim uvjetima.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: 'Otvorite preporučene postavke ovog vodiča u ANQR generatoru.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Pogledajte povezane vodiče i primjere', type: 'example' },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: 'QR kodovi spremni za ispis: SVG naspram PNG',
      paragraphs: ['Zašto su vektorski formati važni za ispis i kako izvesti QR kodove koji savršeno skaliraju.'],
      images: [{ src: '/images/learn/print-svg-overview.svg', alt: 'QR kodovi spremni za ispis: SVG naspram PNG', caption: 'Zašto su vektorski formati važni za ispis i kako izvesti QR kodove koji savršeno skaliraju.' }],
    },
    {
      heading: 'Zašto SVG za ispis?',
      paragraphs: ['SVG (Scalable Vector Graphics) datoteke sadrže matematičke opise oblika, a ne piksela. To znači da se beskonačno skaliraju bez gubitka kvalitete. QR kod izvezen kao SVG od 100 piksela savršeno će se ispisati na veličini postera, dok bi PNG iste veličine bio mutan ili pikseliziran.'],
    },
    {
      heading: 'Kada je PNG prihvatljiv',
      paragraphs: ['PNG radi dobro kada: (1) izvozite u konačnoj razlučivosti ispisa (npr. 300 DPI × fizička veličina), (2) kôd se neće povećati, (3) koristite digitalne zaslone u poznatim razlučivostima. Zbog fleksibilnosti i budućnosti, SVG je i dalje poželjan.'],
      images: [
        { src: '/images/learn/print-png-pixelated.svg', alt: 'Kada je PNG prihvatljiv', caption: 'PNG radi dobro kada: (1) izvozite u konačnoj razlučivosti ispisa (npr. 300 DPI × fizička veličina), (2) kôd se neće povećati, (3) koristite digitalne zaslone u poznatim razlučivostima. Zbog fleksibilnosti i budućnosti, SVG je i dalje poželjan.' },
        { src: '/images/learn/print-svg-crisp.svg', alt: 'Kada je PNG prihvatljiv', caption: 'PNG radi dobro kada: (1) izvozite u konačnoj razlučivosti ispisa (npr. 300 DPI × fizička veličina), (2) kôd se neće povećati, (3) koristite digitalne zaslone u poznatim razlučivostima. Zbog fleksibilnosti i budućnosti, SVG je i dalje poželjan.' },
      ],
    },
    {
      heading: 'ANQR SVG mogućnosti izvoza',
      paragraphs: ['ANQR nudi dva SVG načina rada: \'True Vector\' stvara čisti SVG temeljen na putanji koji se savršeno skalira i može se uređivati ​​u Illustratoru/Inkscapeu. \'Raster Embed\' uključuje bilo koju preklapajuću sliku kao ugrađenu bitmapu — korisno kada trebate slojeve, ali još uvijek želite oblike vektorskih modula.'],
    },
    {
      heading: 'Integracija tijeka rada ispisa',
      paragraphs: ['Izvezite SVG iz ANQR-a, zatim uvezite u svoj softver za dizajn (InDesign, Illustrator, Canva Pro). Postavite QR kod na konačnu veličinu ispisa i provjerite je li mirna zona sačuvana. Većina tiskara preferira isporuku u PDF formatu — vaš softver za dizajn može ugraditi SVG u konačni PDF.'],
    },
    {
      heading: 'Postavke rezolucije i DPI',
      paragraphs: ['Za PNG izvoz namijenjen ispisu: pomnožite svoju fizičku veličinu s DPI. Kod od 2 inča na 300 DPI treba 600 × 600 px. ANQR-ova DPI postavka ugrađuje ove metapodatke za softver za ispis. Za zaslone, 72-96 DPI je standard.'],
    },
    {
      heading: 'Izbjegavanje uobičajenih tiskarskih pogrešaka',
      paragraphs: ['Nemojte: povećavati izvoze niske razlučivosti, komprimirati QR slike kao JPEG (prometi prekidaju skeniranje), postavljati kodove u zone savijanja/rezanja ili smanjivati ​​mirne zone kako bi odgovarale rasporedima. Učinite: izvozite u ciljnoj veličini, koristite formate bez gubitaka, testirajte stvarne uzorke ispisa.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: 'Otvorite preporučene postavke ovog vodiča u ANQR generatoru.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Pogledajte povezane vodiče i primjere', type: 'example' },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: 'Animirani QR kodovi za Digital Signage',
      paragraphs: ['Kada i kako koristiti animirane QR kodove na zaslonima, a da ih se može skenirati.'],
      images: [{ src: '/images/learn/animation-overview.svg', alt: 'Animirani QR kodovi za Digital Signage', caption: 'Kada i kako koristiti animirane QR kodove na zaslonima, a da ih se može skenirati.' }],
    },
    {
      heading: 'Kad animacija pomaže',
      paragraphs: ['Animacija privlači pažnju na užurbanim digitalnim zaslonima gdje se statični sadržaj zanemaruje. Suptilne animacije (blagi puls, promjena boja) privlače pogled bez ometanja skeniranja. Animacija najbolje funkcionira za: maloprodajne zaslone, prikaze događaja, interaktivne kioske i sadržaj društvenih medija.'],
    },
    {
      heading: 'Kad animacija boli',
      paragraphs: ['Izbjegavajte animaciju za: QR kodove plaćanja (brzina je bitna), kodove koji se kratko gledaju (oglasi za prijevoz), kodove na zaslonima s niskim stopama osvježavanja ili kada okruženje ima mnogo konkurentskih vizualnih elemenata. Ako ste u nedoumici, testirajte animirane naspram statičnih sa svojom ciljanom publikom.'],
      images: [
        { src: '/images/learn/animation-static.svg', alt: 'Kad animacija boli', caption: 'Izbjegavajte animaciju za: QR kodove plaćanja (brzina je bitna), kodove koji se kratko gledaju (oglasi za prijevoz), kodove na zaslonima s niskim stopama osvježavanja ili kada okruženje ima mnogo konkurentskih vizualnih elemenata. Ako ste u nedoumici, testirajte animirane naspram statičnih sa svojom ciljanom publikom.' },
        { src: '/images/learn/animation-animated.svg', alt: 'Kad animacija boli', caption: 'Izbjegavajte animaciju za: QR kodove plaćanja (brzina je bitna), kodove koji se kratko gledaju (oglasi za prijevoz), kodove na zaslonima s niskim stopama osvježavanja ili kada okruženje ima mnogo konkurentskih vizualnih elemenata. Ako ste u nedoumici, testirajte animirane naspram statičnih sa svojom ciljanom publikom.' },
      ],
    },
    {
      heading: 'Sigurni parametri animacije',
      paragraphs: ['Za pouzdano skeniranje: održavajte sporu brzinu animacije (200 ms+ po kadru), izbjegavajte brzo bljeskanje, održavajte dosljedan kontrast tijekom cijele animacije i osigurajte da se svaki kadar skenira nezavisno. ANQR-ov temporalni dithering \'Flicker Safe\' pomaže u sprječavanju strobing efekata.'],
    },
    {
      heading: 'Preporučeni stilovi animacije',
      paragraphs: ['Puls: Lagano osciliranje veličine privlači pozornost bez prekidanja skeniranja. Valoviti: Tekući uzorci dodaju pokret dok struktura ostaje netaknuta. Ciklus boja: promjene nijansi održavaju kontrast dok dodaju vizualni interes. Svjetlucanje: suptilni svjetlucavi efekti na rubovima modula.'],
    },
    {
      heading: 'Razmatranja formata',
      paragraphs: ['GIF: Univerzalna podrška, ograničeno na 256 boja, veće datoteke. APNG: Bolja kvaliteta, manje podrške za preglednik. Video (MP4/WebM): najbolja kvaliteta, zahtijeva kontekst video playera. ANQR prema zadanim postavkama izvozi GIF — testirajte na svom stvarnom playeru za natpise.'],
    },
    {
      heading: 'Savjeti za postavljanje zaslona',
      paragraphs: ['Postavite QR kodove na udobnu visinu za skeniranje (1,2-1,5 m za gledatelje koji stoje). Izbjegavajte rubove zaslona gdje dolazi do izobličenja. Omogućite odgovarajuće vrijeme zadržavanja — 5+ sekundi kako bi gledatelji primijetili, izvukli telefon i skenirali. Razmislite o dodavanju poziva na radnju \'Skeniraj me\'.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: 'Otvorite preporučene postavke ovog vodiča u ANQR generatoru.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Pogledajte povezane vodiče i primjere', type: 'example' },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: 'Sigurnost i usklađenost s QR kodom',
      paragraphs: ['Razumijevanje tihih zona, kontrasta, ispravljanja pogrešaka i onoga što ANQR-ov sigurnosni način rada provodi.'],
      images: [{ src: '/images/learn/safety-overview.svg', alt: 'Sigurnost i usklađenost s QR kodom', caption: 'Razumijevanje tihih zona, kontrasta, ispravljanja pogrešaka i onoga što ANQR-ov sigurnosni način rada provodi.' }],
    },
    {
      heading: 'Zahtjev za tihu zonu',
      paragraphs: ['Tiha zona je prazna margina oko svakog QR koda. Skeneri trebaju ovaj prostor za otkrivanje granica koda. ISO 18004 preporučuje najmanje 4 modula. Rezanje u tihu zonu je najčešći uzrok neuspjeha skeniranja. ANQR-ov Safety Mode osigurava ovaj minimum.'],
      images: [{ src: '/images/learn/safety-quiet-zone.svg', alt: 'Zahtjev za tihu zonu', caption: 'Tiha zona je prazna margina oko svakog QR koda. Skeneri trebaju ovaj prostor za otkrivanje granica koda. ISO 18004 preporučuje najmanje 4 modula. Rezanje u tihu zonu je najčešći uzrok neuspjeha skeniranja. ANQR-ov Safety Mode osigurava ovaj minimum.' }],
    },
    {
      heading: 'Zahtjevi za kontrast',
      paragraphs: ['QR kodovi trebaju visok kontrast između prednjeg plana i pozadine. ISO standard pretpostavlja crno na bijelom, ali svaka kombinacija visokog kontrasta funkcionira. Izbjegavajte: parove boja niskog kontrasta, gradijente koji smanjuju kontrast u područjima ili pozadine koje ometaju mirnu zonu. ANQR-ov Contrast Guard upozorava na problematične kombinacije.'],
      images: [{ src: '/images/learn/safety-contrast.svg', alt: 'Zahtjevi za kontrast', caption: 'QR kodovi trebaju visok kontrast između prednjeg plana i pozadine. ISO standard pretpostavlja crno na bijelom, ali svaka kombinacija visokog kontrasta funkcionira. Izbjegavajte: parove boja niskog kontrasta, gradijente koji smanjuju kontrast u područjima ili pozadine koje ometaju mirnu zonu. ANQR-ov Contrast Guard upozorava na problematične kombinacije.' }],
    },
    {
      heading: 'Objašnjenje ispravljanja pogreške',
      paragraphs: ['QR kodovi uključuju suvišne podatke za ispravljanje pogrešaka. Razina L dopušta 7% štete, M dopušta 15%, Q dopušta 25%, H dopušta 30%. Koristite H (High) kada dodajete slojeve, ispisujete na materijale s teksturom ili očekujete istrošenost. Veća korekcija = malo veći kodovi.'],
    },
    {
      heading: 'Što Siguran način rada provodi',
      paragraphs: ['ANQR-ov sigurnosni način rada (uravnoteženi ili strogi) automatski: provodi minimalnu tihu zonu, upozorava na nizak kontrast, ograničava intenzitet preklapanja na temelju razine ispravljanja pogrešaka, štiti uzorke tražila/vremena/poravnavanja od modifikacije i provjerava ispravnost konačnog skeniranja koda.'],
    },
    {
      heading: 'Ograničenja logotipa i preklapanja',
      paragraphs: ['Prekrivanja koja pokrivaju više od 30% podatkovnih modula rizikuju neuspjeh skeniranja čak i uz H ispravljanje pogrešaka. ANQR-ov ECC-Aware način rada inteligentno raspoređuje utjecaj preklapanja kako bi ostao unutar sigurnih granica. Uvijek držite uzorke tražila (kutne kvadrate) potpuno nepromijenjenima.'],
    },
    {
      heading: 'Sukladnost za određene industrije',
      paragraphs: ['Neke industrije imaju posebne zahtjeve za QR: sustavi plaćanja nalažu točne formate kodiranja, farmaceutsko praćenje zahtijeva usklađenost sa GS1, ulaznice za događaje mogu zahtijevati šifrirane sadržaje. ANQR podržava ove standarde — koristite odgovarajući predložak vrste sadržaja.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: 'Otvorite preporučene postavke ovog vodiča u ANQR generatoru.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Pogledajte povezane vodiče i primjere', type: 'example' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: 'Otvorite cijeli korisnički priručnik', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Pogledajte QR primjere', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Pogledajte QR primjere', type: 'gallery' },
  ],
};

export default learn;
