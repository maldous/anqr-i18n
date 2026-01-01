import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Pravila o privatnosti',
  description: 'Informacije koje ANQR prikuplja, kako se koriste i vaša prava prema važećim zakonima o privatnosti.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Sažetak',
      paragraphs: ['ANQR je generator QR kodova s pristupom koji je na prvom mjestu prema klijentu. Ne zahtijevamo da kreirate račun. Prema zadanim postavkama, QR kodovi se generiraju lokalno u vašem pregledniku - nemamo pristup sadržaju koji kodirate.', 'Za profesionalnu upotrebu, ANQR pruža API na strani poslužitelja koji generira QR kodove iz URL parametara. Prilikom korištenja API-ja, vaš QR sadržaj se obrađuje na našim poslužiteljima kako bi se prikazala slika, ali se ne pohranjuje niti bilježi.', 'Koristimo Google AdSense za oglašavanje i možemo koristiti analitičke usluge. Ove usluge prikupljaju informacije putem kolačića i sličnih tehnologija. Ova politika objašnjava koji se podaci prikupljaju, kako se koriste i vaša prava.'],
    },
    {
      heading: 'Informacije koje prikupljamo',
      bullets: ['Informacije koje dajete: Ako nas kontaktirate putem e-pošte ili našeg kontakt obrasca, prikupljamo vaše ime, adresu e-pošte i sadržaj poruke.', 'Automatski prikupljene informacije: Naš pružatelj hostinga (Netlify), oglašivački partneri i analitičke usluge mogu prikupljati: IP adresu, vrstu i verziju preglednika, operativni sustav, vrstu uređaja, URL s kojeg se odnosi preporuka, posjećene stranice, vrijeme na web-mjestu i približnu geografsku lokaciju.', 'Kolačići treće strane: Naši oglašivački partneri (Google AdSense) koriste kolačiće i slične tehnologije za prikazivanje i mjerenje oglasa. Sam ANQR ne postavlja kolačiće prve strane.'],
    },
    {
      heading: 'Kolačići i tehnologije trećih strana',
      paragraphs: ['ANQR ne postavlja kolačiće prve strane. Vaše postavke (kao što je tamni način rada) pohranjuju se lokalno na vašem uređaju i ne prenose se ni na jedan poslužitelj.', 'Međutim, naši oglašivački partneri (Google AdSense) i pružatelj hostinga mogu koristiti kolačiće i slične tehnologije praćenja:'],
      bullets: ['Oglašavački kolačići (treće strane): Postavljaju ih Google AdSense i oglašivački partneri za prikazivanje relevantnih oglasa, mjerenje učinkovitosti oglasa i razumijevanje interesa korisnika. Ovi kolačići mogu pratiti vašu aktivnost na različitim web-stranicama.', 'Analitički kolačići (treće strane): Može ih koristiti naš pružatelj hostinga ili analitičke usluge za prikupljanje anonimiziranih podataka o korištenju.'],
    },
    {
      heading: 'Google AdSense i oglašavanje',
      paragraphs: ['Prikazujemo oglase putem Google AdSensea. Google i njegovi partneri koriste kolačiće za prikazivanje oglasa na temelju vaše povijesti pregledavanja na ovoj i drugim web-stranicama (oglašavanje temeljeno na interesima).', 'Saznajte kako Google koristi vaše podatke: https://policies.google.com/technologies/partner-sites', 'Upravljanje personalizacijom oglasa: https://adssettings.google.com', 'Isključite se putem inicijative za mrežno oglašavanje: https://optout.networkadvertising.org', 'Odjava putem Digital Advertising Alliancea: https://optout.aboutads.info'],
    },
    {
      heading: 'Kako koristimo informacije',
      bullets: ['Kako bismo odgovorili na vaše upite i pružili podršku.', 'Za prikazivanje relevantnih oglasa putem naših oglašivačkih partnera.', 'Za analizu korištenja stranice i poboljšanje naših usluga.', 'Za otkrivanje, sprječavanje i rješavanje problema s prijevarom, zlouporabom i sigurnošću.', 'Radi poštivanja zakonskih obveza.'],
    },
    {
      heading: 'Usluge trećih strana',
      bullets: ['Google AdSense: Prima podatke za prikazivanje i mjerenje oglasa.', 'Pružatelji analitičkih usluga: Primajte anonimizirane podatke o korištenju.', 'Netlify (hosting): Obrađuje zahtjeve i može zapisivati IP adrese.', 'Ne prodajemo vaše osobne podatke. Međutim, dijeljenje podataka s oglašivačkim partnerima može se smatrati prodajom prema CCPA-u (vidi dolje).'],
    },
    {
      heading: 'Zadržavanje podataka',
      bullets: ['Podnošenje kontakata: Do 2 godine.', 'Zapisnici poslužitelja: Do 30 dana (pružatelj hostinga).', 'Analitički podaci: Do 26 mjeseci (anonimizirano).', 'Reklamni kolačići: Obično 13 mjeseci (razlikuje se ovisno o partneru).'],
    },
    {
      heading: 'Vaša prava prema GDPR-u (korisnici iz EGP-a)',
      paragraphs: ['Ako se nalazite u Europskom gospodarskom prostoru, imate sljedeća prava prema Općoj uredbi o zaštiti podataka:'],
      bullets: ['Pravo pristupa: Zatražite kopiju osobnih podataka koje imamo o vama.', 'Pravo na ispravak: Zahtjev za ispravak netočnih podataka.', 'Pravo na brisanje: Zahtjev za brisanje vaših podataka (pravo na zaborav).', 'Pravo na ograničavanje obrade: Zahtjev za ograničenje načina na koji koristimo vaše podatke.', 'Pravo na prenosivost podataka: Zatražite svoje podatke u prenosivom formatu.', 'Pravo na prigovor: Prigovor na obradu, uključujući i za izravni marketing.', 'Pravo na povlačenje privole: Povlačenje privole u bilo kojem trenutku kada se obrada temelji na privoli.', 'Pravo na podnošenje pritužbe: Podnesite pritužbu svom tijelu za zaštitu podataka.'],
    },
    {
      heading: 'Pravna osnova GDPR-a',
      paragraphs: ['Podatke obrađujemo na ovim osnovama: (a) Privola — za personalizirano oglašavanje (kojim upravljaju naši oglašivački partneri); (b) Legitimni interesi — za analitiku, sigurnost i poboljšanje; (c) Ugovor — za odgovaranje na upite.', 'Za ostvarivanje svojih prava kontaktirajte ${CONTACT_EMAIL}. Odgovaramo u roku od 30 dana.'],
    },
    {
      heading: 'Vaša prava prema CCPA-u (korisnici u Kaliforniji)',
      bullets: ['Pravo na znanje: Zahtjev za informacijama o prikupljenim podacima, izvorima, svrhama i trećim stranama.', 'Pravo na brisanje: Zahtjev za brisanje vaših osobnih podataka.', 'Pravo na isključivanje: Isključite se iz prodaje osobnih podataka (dijeljenje s oglasnim partnerima može ispunjavati uvjete).', 'Pravo na nediskriminaciju: Nećemo diskriminirati zbog ostvarivanja vaših prava.'],
    },
    {
      heading: 'Prikupljene CCPA kategorije',
      paragraphs: ['Kategorije: Identifikatori (IP adresa, ID uređaja), Internetska aktivnost (pregledavanje, interakcije s oglasima), Geolokacija (približna), Zaključci (interesi iz pregledavanja).', 'Za ostvarivanje prava ili isključivanje: ${CONTACT_EMAIL} ili prilagodite postavke kolačića.'],
    },
    {
      heading: 'Međunarodni transferi',
      paragraphs: ['Vaši se podaci mogu prenijeti u zemlje s različitim zakonima o zaštiti podataka, uključujući Sjedinjene Američke Države. Koristimo odgovarajuće zaštitne mjere kao što su standardne ugovorne klauzule.'],
    },
    {
      heading: 'Privatnost djece',
      paragraphs: ['ANQR nije namijenjen djeci mlađoj od 13 godina (ili 16 godina u EGP-u). Ne prikupljamo podatke od djece svjesno. Kontaktirajte ${CONTACT_EMAIL} ako smatrate da je dijete dalo podatke.'],
    },
    {
      heading: 'Sigurnost',
      paragraphs: ['Koristimo odgovarajuće tehničke i organizacijske mjere za zaštitu podataka, uključujući HTTPS enkripciju. Međutim, nijedan internetski prijenos nije 100% siguran.'],
    },
    {
      heading: 'Ne prati',
      paragraphs: ['Poštujemo signale preglednika Nemoj pratiti gdje god je to izvedivo, iako oglašivački partneri možda neće odgovoriti na DNT.'],
    },
    {
      heading: 'Izmjene ove politike',
      paragraphs: ['Ovu politiku možemo periodično ažurirati. Datum Zadnje ažuriranje označava najnoviju reviziju. Značajne promjene mogu se priopćiti putem bannera na web-mjestu.'],
    },
    {
      heading: 'Kontaktirajte nas',
      paragraphs: ['Za pitanja o privatnosti ili za ostvarivanje vaših prava: ${CONTACT_EMAIL} ili koristite našu stranicu za kontakt. Na zahtjeve za privatnost odgovaramo u roku od 30 dana.'],
    },
  ],
};

export default privacy;
