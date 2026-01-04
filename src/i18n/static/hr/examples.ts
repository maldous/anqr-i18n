import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const examples: PageDefinition = {
  title: 'ANQR primjeri',
  description: 'Pronađite pravo mjesto za početak s ANQR-om - od cjelovitog korisničkog vodiča do praktičnih Learn članaka i gotovih primjera.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Otvorite generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Pregledajte članke Learna', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Otvorite cijeli korisnički priručnik', type: 'guide' },
  ],

  sections: [
    // Example 1: Uplift an Existing QR Campaign
    {
      heading: 'Poboljšajte postojeću QR kampanju',
      paragraphs: ['Pretvorite običan QR kod u markiranu, sigurnosno optimiziranu verziju.', '819'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'Poboljšajte postojeću QR kampanju',
          caption: 'Pretvorite običan QR kod u markiranu, sigurnosno optimiziranu verziju.',
        },
      ],
    },
    {
      heading: 'Izazov',
      paragraphs: ['Imate postojeću kampanju s QR kodom — možda obične crno-bijele kodove ispisane na marketinškim materijalima. Kodovi rade, ali nisu dio marke i možda imaju postavke koje nisu optimalne. Kako izvršiti nadogradnju bez prekidanja postojećih skeniranja?', '820'],
      images: [
        {
          src: '/images/examples/uplift-before.png',
          alt: 'Izazov',
          caption: 'Imate postojeću kampanju s QR kodom — možda obične crno-bijele kodove ispisane na marketinškim materijalima. Kodovi rade, ali nisu dio marke i možda imaju postavke koje nisu optimalne. Kako izvršiti nadogradnju bez prekidanja postojećih skeniranja?',
        },
      ],
    },
    {
      heading: 'Rješenje',
      paragraphs: ['Zadržite isti odredišni URL, ali ponovno izradite QR kod s ANQR-om. Dodajte svoj logotip kao središnji sloj, primijenite boje robne marke i omogućite Siguran način rada kako biste osigurali pouzdano skeniranje nadograđenog koda. Kodirani sadržaj ostaje identičan.', '821', '822'],
      images: [
        {
          src: '/images/examples/uplift-after.png',
          alt: 'Rješenje',
          caption: 'Zadržite isti odredišni URL, ali ponovno izradite QR kod s ANQR-om. Dodajte svoj logotip kao središnji sloj, primijenite boje robne marke i omogućite Siguran način rada kako biste osigurali pouzdano skeniranje nadograđenog koda. Kodirani sadržaj ostaje identičan.',
        },
      ],
    },
    {
      heading: 'Korak po korak',
      paragraphs: ['1. Unesite svoj postojeći URL u ANQR. 2. Postavite Ispravljanje pogrešaka na H (Visoko). 3. Učitajte svoj logotip i postavite način preklapanja na \'Središnji logotip\'. 4. Namjestite intenzitet na 60-70%. 5. Omogućite \'Sačuvaj uzorke tražila\'. 6. Nanesite boje marke (održavajte visoki kontrast). 7. Omogućite sigurnosni način rada \'Balanced\'. 8. Testirajte s više aplikacija za skeniranje. 9. Izvezite kao SVG za fleksibilnost ispisa.', '823', '824', '825', '826', '827', '828'],
    },
    {
      heading: 'Zašto radi',
      paragraphs: ['QR kod kodira isti URL, tako da postojeći tiskani kodovi i novi kodovi robne marke rade. Visoko ispravljanje pogrešaka kompenzira preklapanje logotipa. Safety Mode osigurava da odabiri dizajna ne ugrožavaju mogućnost skeniranja.', '829', '830'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Ponovno kreiraj u Generatoru',
          type: 'generator',
        },
      ],
    },

    // Example 2: Branded Retail Payments
    {
      heading: 'Brendirano QR plaćanje u maloprodaji',
      paragraphs: ['Dizajnirajte QR za plaćanje koji uravnotežuje brendiranje i pouzdanost skeniranja.', '831'],
      images: [
        {
          src: '/images/examples/retail-payments-overview.png',
          alt: 'Brendirano QR plaćanje u maloprodaji',
          caption: 'Dizajnirajte QR za plaćanje koji uravnotežuje brendiranje i pouzdanost skeniranja.',
        },
      ],
    },
    {
      heading: 'Izazov',
      paragraphs: ['Vašem maloprodajnom poduzeću potrebni su QR kodovi za plaćanje koji odgovaraju identitetu vašeg brenda, a istovremeno ispunjavaju stroge zahtjeve sustava plaćanja. Generički crno-bijeli kodovi plaćanja funkcioniraju, ali propuštaju prilike za brendiranje.', '832'],
      images: [
        {
          src: '/images/examples/retail-payments-before.png',
          alt: 'Izazov',
          caption: 'Vašem maloprodajnom poduzeću potrebni su QR kodovi za plaćanje koji odgovaraju identitetu vašeg brenda, a istovremeno ispunjavaju stroge zahtjeve sustava plaćanja. Generički crno-bijeli kodovi plaćanja funkcioniraju, ali propuštaju prilike za brendiranje.',
        },
      ],
    },
    {
      heading: 'Rješenje',
      paragraphs: ['Koristite ANQR-ove predloške plaćanja (UPI, PayNow, SEPA, itd.) s konzervativnim brendiranjem. Dodajte svoj logotip malen i centriran, koristite boje robne marke za prvi plan dok zadržite bijelu pozadinu i koristite najvišu razinu ispravljanja pogrešaka.', '833'],
      images: [
        {
          src: '/images/examples/retail-payments-after.png',
          alt: 'Rješenje',
          caption: 'Koristite ANQR-ove predloške plaćanja (UPI, PayNow, SEPA, itd.) s konzervativnim brendiranjem. Dodajte svoj logotip malen i centriran, koristite boje robne marke za prvi plan dok zadržite bijelu pozadinu i koristite najvišu razinu ispravljanja pogrešaka.',
        },
      ],
    },
    {
      heading: 'Ograničenja dizajna',
      paragraphs: ['Kodovi plaćanja moraju se skenirati za manje od 1 sekunde za dobro korisničko iskustvo. Ovo ograničava koliko je prilagodba sigurna: logotip ispod 15% područja koda, nema izmjene uzorka tražila, tiha zona od najmanje 4 modula i testiranje sa stvarnim aplikacijama za plaćanje (ne samo generičkim skenerima).', '834'],
    },
    {
      heading: 'Preporučene postavke',
      paragraphs: ['Ispravak pogreške: H (visoka). Mirna zona: 4+ modula. Stil modula: kvadrat (najpouzdaniji). Prekrivanje logotipa: 50-60% intenziteta maksimalno. Sigurnosni način rada: Strogi. Uvijek testirajte pomoću aplikacije za plaćanje (Google Pay, bankovne aplikacije itd.).', '835'],
    },
    {
      heading: 'Zašto ovaj pristup funkcionira',
      paragraphs: ['Konzervativno brendiranje osigurava brzo skeniranje aplikacija za plaćanje dok još uvijek pokazuje identitet vašeg brenda. Tiha zona i ispravljanje pogrešaka daju marginu za varijacije ispisa i okolišne čimbenike na prodajnom mjestu.', '836'],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Ponovno kreiraj u Generatoru',
          type: 'generator',
        },
      ],
    },

    // Example 3: Print Scaling
    {
      heading: 'Skaliranje ispisa: PNG naspram SVG',
      paragraphs: ['Vidite razliku između rastera i vektora pri velikim veličinama ispisa.', '837'],
      images: [
        {
          src: '/images/examples/print-scaling-overview.png',
          alt: 'Skaliranje ispisa: PNG naspram SVG',
          caption: 'Vidite razliku između rastera i vektora pri velikim veličinama ispisa.',
        },
      ],
    },
    {
      heading: 'Izazov',
      paragraphs: ['Potrebni su vam QR kodovi za ispis velikog formata — posteri, banneri ili natpisi. Izvoz u malim veličinama piksela, a zatim povećavanje, stvara mutne kodove koji se potencijalno ne mogu skenirati.', '838'],
      images: [
        {
          src: '/images/examples/print-scaling-before.png',
          alt: 'Izazov',
          caption: 'Potrebni su vam QR kodovi za ispis velikog formata — posteri, banneri ili natpisi. Izvoz u malim veličinama piksela, a zatim povećavanje, stvara mutne kodove koji se potencijalno ne mogu skenirati.',
        },
      ],
    },
    {
      heading: 'PNG u veličini postera',
      paragraphs: ['QR kod izvezen kao 200 × 200 px PNG, a zatim smanjen na 30 cm (12 inča) postaje očito pikseliziran. Rubovi modula zamagljuju se zajedno, smanjujući kontrast i pouzdanost skenera. Ovo je najčešći kvar QR ispisa.', '839'],
      images: [
        {
          src: '/images/examples/print-scaling-png.png',
          alt: 'PNG u veličini postera',
          caption: 'QR kod izvezen kao 200 × 200 px PNG, a zatim smanjen na 30 cm (12 inča) postaje očito pikseliziran. Rubovi modula zamagljuju se zajedno, smanjujući kontrast i pouzdanost skenera. Ovo je najčešći kvar QR ispisa.',
        },
      ],
    },
    {
      heading: 'SVG u veličini postera',
      paragraphs: ['Isti QR kod izvezen kao SVG savršeno se skalira na bilo koju veličinu. Rubovi modula ostaju jasni jer su matematički definirani, a ne temeljeni na pikselima. Ovo funkcionira bilo da se ispisuje na 5 cm ili 5 metara.', '840'],
      images: [
        {
          src: '/images/examples/print-scaling-svg.png',
          alt: 'SVG u veličini postera',
          caption: 'Isti QR kod izvezen kao SVG savršeno se skalira na bilo koju veličinu. Rubovi modula ostaju jasni jer su matematički definirani, a ne temeljeni na pikselima. Ovo funkcionira bilo da se ispisuje na 5 cm ili 5 metara.',
        },
      ],
    },
    {
      heading: 'Izvoz tijek rada',
      paragraphs: ['U ANQR: 1. Dizajnirajte svoj QR kod u bilo kojoj veličini pregleda. 2. Idite na postavke izlaza. 3. Odaberite Format: SVG. 4. Omogućite \'True Vector\' za skalabilne staze. 5. Izvoz i uvoz u vaš softver za dizajn. 6. Skalirajte do konačne veličine ispisa — ostaje oštar.', '841', '842', '843', '844', '845'],
    },
    {
      heading: 'Kada koristiti PNG visoke rezolucije',
      paragraphs: ['Ako vaš tijek rada zahtijeva PNG: izračunajte konačne dimenzije piksela (fizička veličina × DPI). Za kôd od 10 cm pri 300 DPI: 10 cm ≈ 4 inča × 300 = 1200 px. Izvoz u 1200×1200px. To daje rezultate kvalitete ispisa bez skaliranja.', '846'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Ponovno kreiraj u Generatoru',
          type: 'generator',
        },
      ],
    },

    // Example 4: Animated Signage
    {
      heading: 'Animirani signalni QR',
      paragraphs: ['Dodajte animaciju koja privlači pozornost uz zadržavanje pouzdanosti skeniranja.', '847'],
      images: [
        {
          src: '/images/examples/animated-signage-overview.png',
          alt: 'Animirani signalni QR',
          caption: 'Dodajte animaciju koja privlači pozornost uz zadržavanje pouzdanosti skeniranja.',
        },
      ],
    },
    {
      heading: 'Izazov',
      paragraphs: ['Vaše digitalno oglašavanje natječe se za pozornost. Statički QR kodovi zanemaruju se među animiranim sadržajem. Ali agresivna animacija može prekinuti skeniranje.', '848'],
      images: [
        {
          src: '/images/examples/animated-signage-before.png',
          alt: 'Izazov',
          caption: 'Vaše digitalno oglašavanje natječe se za pozornost. Statički QR kodovi zanemaruju se među animiranim sadržajem. Ali agresivna animacija može prekinuti skeniranje.',
        },
      ],
    },
    {
      heading: 'Siguran pristup animaciji',
      paragraphs: ['Koristite suptilnu animaciju koja privlači pozornost bez narušavanja strukture koda. ANQR-ov \'Pulse\' uzorak nježno skalira kod, \'Shimmer\' dodaje svjetlucave efekte, a \'Wave\' stvara tekuće kretanje — a sve to dok svaki okvir ostaje vidljiv.', '849'],
      images: [
        {
          src: '/images/examples/animated-signage-after.png',
          alt: 'Siguran pristup animaciji',
          caption: 'Koristite suptilnu animaciju koja privlači pozornost bez narušavanja strukture koda. ANQR-ov \'Pulse\' uzorak nježno skalira kod, \'Shimmer\' dodaje svjetlucave efekte, a \'Wave\' stvara tekuće kretanje — a sve to dok svaki okvir ostaje vidljiv.',
        },
      ],
    },
    {
      heading: 'Preporučene postavke',
      paragraphs: ['Uzorak: Pulse ili Shimmer. Brzina: 200-300ms po okviru. Ispravak pogreške: H (visoka). Temporalno podrhtavanje: Zaštićeno od treperenja. Uvijek omogućite \'Sačuvaj uzorke tražila\'. Testirajte na stvarnom hardveru za prikaz signala.', '850'],
    },
    {
      heading: 'Format i dostava',
      paragraphs: ['Izvezi kao GIF za podršku za player za univerzalne oznake. Koristite 24-30 okvira za glatku animaciju bez prevelike veličine datoteke. Ako vaš natpis podržava video, MP4/WebM nudi bolju kvalitetu, ali zahtijeva mogućnost reprodukcije videa.', '851'],
    },
    {
      heading: 'Postavljanje na ekrane',
      paragraphs: ['Postavite na udobnu visinu za skeniranje. Dopustite 5+ sekundi vremena prikaza kako bi gledatelji primijetili i skenirali. Dodajte tekstualni upit (\'Skeniraj detalje\') pored koda. Osigurajte odgovarajući kontrast naspram pozadinskog sadržaja.', '852'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Ponovno kreiraj u Generatoru',
          type: 'generator',
        },
      ],
    },

    // Example 5: Cross-lingual Collaboration
    {
      heading: 'Međujezična QR suradnja',
      paragraphs: ['Dijelite QR konfiguracije među timovima na različitim jezicima.', '853'],
      images: [
        {
          src: '/images/examples/collaboration-overview.png',
          alt: 'Međujezična QR suradnja',
          caption: 'Dijelite QR konfiguracije među timovima na različitim jezicima.',
        },
      ],
    },
    {
      heading: 'Izazov',
      paragraphs: ['Vaš međunarodni tim mora izraditi dosljedne QR kodove, ali članovi tima rade na različitim jezicima. Ručna rekreacija konfiguracije sklona je pogreškama i oduzima puno vremena.', '854'],
      images: [
        {
          src: '/images/examples/collaboration-before.png',
          alt: 'Izazov',
          caption: 'Vaš međunarodni tim mora izraditi dosljedne QR kodove, ali članovi tima rade na različitim jezicima. Ručna rekreacija konfiguracije sklona je pogreškama i oduzima puno vremena.',
        },
      ],
    },
    {
      heading: 'Rješenje',
      paragraphs: ['ANQR-ove veze za dijeljenje kodiraju sve postavke u URL-u. Članovi tima mogu otvoriti istu poveznicu na željenom jeziku — QR konfiguracija se učitava identično, ali se sučelje prikazuje na njihovom jeziku.', '855'],
      images: [
        {
          src: '/images/examples/collaboration-after.png',
          alt: 'Rješenje',
          caption: 'ANQR-ove veze za dijeljenje kodiraju sve postavke u URL-u. Članovi tima mogu otvoriti istu poveznicu na željenom jeziku — QR konfiguracija se učitava identično, ali se sučelje prikazuje na njihovom jeziku.',
        },
      ],
    },
    {
      heading: 'Kako radi',
      paragraphs: ['1. Konfigurirajte svoj QR kod u ANQR. 2. Kliknite Dijeli za generiranje veze. 3. Pošaljite poveznicu svom kolegi. 4. Otvaraju ga — ANQR učitava vaše točne postavke. 5. Mogu promijeniti jezik sučelja bez utjecaja na QR konfiguraciju. 6. Oba člana tima izvoze identične QR kodove.', '856', '857', '858', '859', '860'],
    },
    {
      heading: 'Parametar jezika',
      paragraphs: ['ANQR veze za dijeljenje uključuju parametar \'lang\' za jezik sučelja, ali QR sadržaj i postavke stila ne ovise o jeziku. Promjenom parametra jezika mijenjaju se izbornici i oznake, a ne sam QR kod.', '861'],
    },
    {
      heading: 'Tijek rada za suradnju',
      paragraphs: ['Stvorite \'glavnu\' konfiguraciju s postavkama svoje marke. Podijelite vezu sa svojim timom. Svaki regionalni ured može koristiti svoj željeni jezik uz održavanje dosljednosti robne marke. Ažuriranja glavne veze prenose se na sve koji je koriste.', '862', '863'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Ponovno kreiraj u Generatoru',
          type: 'generator',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Pregledajte članke Learna', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Otvorite cijeli korisnički priručnik', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: '899', type: 'gallery' },
  ],
};
