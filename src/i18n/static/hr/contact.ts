import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontaktirajte nas',
  description: 'Pozdravljamo povratne informacije, izvješća o greškama, zahtjeve za značajkama i općenite upite.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Kako doći do nas',
      paragraphs: ['Nudimo vam nekoliko načina da nas kontaktirate ovisno o vašim potrebama. Čitamo svaku poruku, iako vrijeme odgovora može varirati ovisno o količini i vrsti upita.'],
    },
    {
      heading: 'E-pošta',
      paragraphs: ['Za sve upite: ${CONTACT_EMAIL}', 'Ovo je najpouzdaniji način da nas kontaktirate i preporučuje se za detaljna pitanja, poslovne upite ili bilo koje druge upite.'],
    },
    {
      heading: 'Vrste upita',
      bullets: ['Opća pitanja: Pitanja o korištenju ANQR-a, objašnjenja značajki ili opće povratne informacije.', 'Izvješća o pogreškama: Molimo navedite svoj preglednik, operativni sustav, korake za reprodukciju i sve poruke o pogreškama koje vidite.', 'Zahtjevi za značajke: Prijedlozi za nove značajke ili poboljšanja. Razmatramo sve zahtjeve iako ne možemo obećati implementaciju.', 'Poslovni upiti: Mogućnosti partnerstva, pitanja o licenciranju ili upiti o komercijalnoj upotrebi.', 'Zahtjevi za privatnost: Zahtjevi za ostvarivanje vaših prava na privatnost prema GDPR-u, CCPA-u ili drugim zakonima o privatnosti (vidi Pravila o privatnosti).', 'DMCA/Autorska prava: Zahtjeve za obavijest o uklanjanju potražite u odjeljku DMCA u nastavku.'],
    },
    {
      heading: 'Vrijeme odgovora',
      paragraphs: ['Nastojimo odgovoriti na upite u roku od 5 do 7 radnih dana. Zahtjevi vezani uz privatnost bit će obrađeni u roku od 30 dana kako je propisano zakonom.', 'Tijekom prometnih razdoblja, vrijeme odgovora može biti dulje. Za hitne slučajeve, molimo vas da u naslovu navedete HITNO.'],
    },
    {
      heading: 'Prije nego što nas kontaktirate',
      paragraphs: ['Molimo provjerite našu stranicu s dokumentacijom za odgovore na česta pitanja o korištenju ANQR značajki. Tamo su obrađena mnoga pitanja o generiranju, stiliziranju i opcijama izvoza QR koda.'],
    },
    {
      heading: 'DMCA obavijesti o autorskim pravima',
      paragraphs: ['Ako smatrate da sadržaj dostupan na ANQR-u krši vaša autorska prava, možete podnijeti obavijest o uklanjanju sadržaja prema Zakonu o autorskim pravima digitalnog tisućljeća (DMCA). Da bi vaša obavijest bila valjana, mora sadržavati:'],
      bullets: ['Fizički ili elektronički potpis vlasnika autorskih prava ili ovlaštenog zastupnika.', 'Identifikacija djela zaštićenog autorskim pravima za koje se tvrdi da su prekršena.', 'Identifikacija materijala za koji se tvrdi da krši autorska prava, s informacijama dovoljnim za njegovo lociranje.', 'Vaši kontaktni podaci (adresa, broj telefona i adresa e-pošte).', 'Izjava da u dobroj vjeri vjerujete da korištenje materijala nije odobreno od strane vlasnika autorskih prava.', 'Izjava, pod kaznenom odgovornošću za krivokletstvo, da su informacije u vašoj obavijesti točne i da ste vlasnik autorskih prava ili ovlašteni djelovati u njihovo ime.'],
    },
    {
      heading: 'DMCA kontakt',
      paragraphs: ['Pošaljite DMCA obavijesti na: ${CONTACT_EMAIL}', 'Molimo vas da u naslovu navedete DMCA obavijest. Na valjane obavijesti odgovorit ćemo u skladu s važećim zakonom. Imajte na umu da ANQR generira QR kodove lokalno na korisničkim uređajima i ne hostira sadržaj koji generiraju korisnici.'],
    },
  ],
};

export default contact;
