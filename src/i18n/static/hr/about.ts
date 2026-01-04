import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'O ANQR-u',
  description: 'ANQR je besplatni generator QR kodova s pristupom koji je prvi na klijentu — generirajte QR kodove lokalno ili koristite naš API za ugradnju.',
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
      heading: 'Što je ANQR?',
      paragraphs: ['ANQR (izgovara se sidro) je besplatni generator QR kodova koji stvara kodove za skeniranje za URL-ove, tekst, Wi-Fi vjerodajnice, kartice kontakata, događaje u kalendaru i još mnogo toga.', 'Namijenjen je pojedincima, malim poduzećima, marketinškim stručnjacima i programerima koji žele moćne QR alate bez registracije. Dizajn usmjeren na klijenta znači da se QR kodovi generiraju lokalno u vašem pregledniku prema zadanim postavkama, s opcionalnim poslužiteljskim API-jem za profesionalno ugrađivanje i integraciju.'],
    },
    {
      heading: 'Ključne značajke',
      bullets: ['Generirajte QR kodove odmah u svom pregledniku — nije potreban račun.', 'Prilagodite boje, stilove modula, uzorke tražilice i dodajte slojeve slika.', 'Izvoz u više formata: PNG, SVG, WebP i animirani GIF.', 'Napredne kontrole za razinu ispravljanja pogrešaka, QR verziju, način kodiranja i odabir maske.', 'Smjernice za sigurno skeniranje i pregled uživo kako bi kodovi bili čitljivi u ispisu i na zaslonima.', 'API na strani poslužitelja za profesionalno ugrađivanje s potpunom podrškom za parametre.', 'Radi izvan mreže nakon učitavanja — to je statična web aplikacija koju možete pokrenuti bilo gdje.'],
    },
    {
      heading: 'Kako ANQR funkcionira',
      paragraphs: ['ANQR se pokreće u vašem pregledniku i kodira vaš unos u standardnu QR matricu s Reed-Solomonovom korekcijom pogrešaka, a zatim ga prikazuje u formatu koji odaberete.', 'Prema zadanim postavkama, generiranje se događa lokalno u vašem pregledniku. Za profesionalnu upotrebu možete koristiti i API na strani poslužitelja za generiranje QR kodova putem URL parametara - savršeno za ugradnju u web stranice, e-poštu ili automatizirane tijekove rada.', 'Kada dodajete slojeve ili animacije, ANQR uravnotežuje stiliziranje s pouzdanošću skeniranja tako da rezultat ostaje skeniran.', 'ANQR se fokusira na statičke kodove (podaci su unutar QR-a). Ako vam je potreban dinamički kod (odredište koje se može uređivati), možete kodirati vlastiti URL za preusmjeravanje ili kratku poveznicu.'],
    },
    {
      heading: 'Tko upravlja ANQR-om?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Oglašavanje i kako ostajemo slobodni',
      paragraphs: ['ANQR je besplatan za korištenje i financira se oglašavanjem. Možemo prikazivati oglase putem Google AdSensea i/ili drugih oglašivačkih partnera.', 'Pružatelji usluga oglasa mogu koristiti kolačiće ili slične tehnologije za personalizaciju oglasa na temelju vaših interesa i aktivnosti pregledavanja. Postavkama oglasa možete upravljati u postavkama uređaja i putem postavki Google oglasa, a više informacija možete pronaći u našim Pravilima o privatnosti.', 'Ne prodajemo sadržaj koji kodirate u QR kodove. Oglasi pomažu u pokrivanju troškova vođenja i poboljšanja projekta.'],
    },
    {
      heading: 'Otvoreni standardi',
      paragraphs: ['ANQR generira QR kodove na temelju standarda ISO/IEC 18004 i teži širokoj kompatibilnosti među skenerima, kamerama i tijekovima rada ispisa.'],
    },
    {
      heading: 'Obavijest o zaštitnom znaku',
      paragraphs: ['QR Code® je registrirani zaštitni znak tvrtke DENSO WAVE INCORPORATED. ANQR nije povezan s tvrtkom DENSO WAVE INCORPORATED, nije je podržava ili sponzorira.'],
    },
    {
      heading: 'Povratne informacije i doprinosi',
      paragraphs: ['Pozdravljamo povratne informacije, izvješća o greškama i prijedloge za nove značajke. Molimo vas da nas kontaktirate putem e-pošte ili stranice za kontakt — čitamo svaku poruku, iako se vrijeme odgovora može razlikovati.'],
    },
  ],
};

export default about;
