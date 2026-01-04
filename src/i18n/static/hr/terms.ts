import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Uvjeti pružanja usluge',
  description: 'Pristupom ili korištenjem stranice pristajete na ove uvjete.',
  lastUpdated: LAST_UPDATED,
  relatedLinks: [{ href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' }],
  sections: [
    {
      heading: 'Prihvaćanje uvjeta',
      paragraphs: ['Pristupom ili korištenjem ANQR-a (anqr.link) pristajete na ove Uvjete pružanja usluge i našu Politiku privatnosti. Ako se ne slažete s ovim uvjetima, nemojte koristiti stranicu.', 'Ove Uvjete možemo s vremena na vrijeme ažurirati. Nastavak korištenja stranice nakon promjena predstavlja prihvaćanje novih uvjeta.'],
    },
    {
      heading: 'Pravo na sudjelovanje',
      paragraphs: ['Morate imati najmanje 13 godina da biste koristili ANQR. Korištenjem stranice izjavljujete da ispunjavate ovaj dobni uvjet. Ako ste mlađi od 18 godina, izjavljujete da imate dopuštenje roditelja ili skrbnika za korištenje stranice.'],
    },
    {
      heading: 'Dopuštena uporaba',
      paragraphs: ['ANQR možete koristiti samo u zakonite svrhe. Isključivo ste odgovorni za sadržaj koji kodirate u QR kodove i za način na koji koristite QR kodove koje generirate.'],
    },
    {
      heading: 'Zabranjeno ponašanje',
      paragraphs: ['Slažete se da nećete:'],
      bullets: ['Koristite ANQR za izradu QR kodova koji olakšavaju phishing, distribuciju zlonamjernog softvera, prijevaru, prevare, uznemiravanje, klevetu ili bilo koju ilegalnu aktivnost.', 'Kodirajte sadržaj koji krši prava intelektualnog vlasništva, krši privatnost ili sadrži ilegalni materijal.', 'Pokušaj ometanja, preopterećenja ili ometanja rada ili sigurnosti lokacije.', 'Obrnuti inženjering, dekompilacija ili pokušaj izdvajanja izvornog koda sa stranice.', 'Koristite automatizirane alate (botove, scrapere) za pristup stranici na način koji smanjuje performanse za druge korisnike.', 'Zaobiđite ili onemogućite sve sigurnosne značajke ili značajke kontrole pristupa.', 'Predstavljati se kao bilo koja osoba ili entitet ili lažno predstavljati svoju pripadnost.'],
    },
    {
      heading: 'Intelektualno vlasništvo',
      paragraphs: ['Zadržavate vlasništvo nad sadržajem koji kodirate u QR kodove. ANQR ne polaže pravo na vlasništvo nad vašim podacima.', 'Naziv, logotip, dizajn sučelja i temeljni kod ANQR-a zaštićeni su autorskim pravima, zaštitnim znakovima i drugim zakonima o intelektualnom vlasništvu. Ne smijete kopirati, mijenjati, distribuirati ili stvarati izvedena djela bez našeg dopuštenja.', 'QR Code® je registrirani zaštitni znak tvrtke DENSO WAVE INCORPORATED. ANQR nije povezan s tvrtkom DENSO WAVE.'],
    },
    {
      heading: 'Licenca za korisnički sadržaj',
      paragraphs: ['Korištenjem ANQR-a ne dajete nam nikakva prava na vaš sadržaj. Prilikom korištenja lokalnog generiranja (zadano), svo generiranje QR koda događa se u vašem pregledniku i mi ne pristupamo, ne pohranjujemo niti prenosimo vaše kodirane podatke.', 'Prilikom korištenja API-ja na strani poslužitelja, vaš se sadržaj obrađuje za generiranje QR slike, ali se ne pohranjuje, ne bilježi niti koristi u bilo koju drugu svrhu osim prikazivanja tražene slike.'],
    },
    {
      heading: 'Usluge i oglašavanje trećih strana',
      paragraphs: ['Stranica prikazuje oglase putem Google AdSensea i može uključivati poveznice na web-stranice trećih strana. Nismo odgovorni za sadržaj, usluge ili prakse privatnosti trećih strana.', 'Vaše interakcije s oglašivačima i trećim stranama isključivo su između vas i njih. Pogledajte našu Politiku privatnosti za informacije o praksama oglašavanja.'],
    },
    {
      heading: 'Odricanje od jamstava',
      paragraphs: ['ANQR SE PRUŽA KAKAV JEST I KAKO JE DOSTUPAN BEZ JAMSTAVA BILO KOJE VRSTE, IZRIČITIH ILI IMPLICITNIH, UKLJUČUJUĆI, ALI NE OGRANIČAVAJUĆI SE NA, IMPLICITNA JAMSTVA PRODAJNOSTI, PRIKLADNOSTI ZA ODREĐENU SVRHU I NEPOVREDE PRAVA.', 'Ne jamčimo da: (a) stranica će biti neprekidna, sigurna ili bez grešaka; (b) QR kodovi će se skenirati u svim okruženjima, na svim uređajima ili sa svim aplikacijama za skeniranje; (c) stranica će ispunjavati vaše zahtjeve.', 'QR kodove uvijek trebate testirati u uvjetima u kojima će se koristiti (veličina ispisa, osvjetljenje, vrsta zaslona, udaljenost, kvaliteta kamere).'],
    },
    {
      heading: 'Ograničenje odgovornosti',
      paragraphs: ['U NAJVEĆOJ MJERI DOPUŠTENOJ ZAKONOM, ANQR I NJEGOVI OPERATERI, PODRUŽNICE I DAVATELJI LICENCA NEĆE BITI ODGOVORNI ZA BILO KAKVU IZRAVNU, NEIZRAVNU, SLUČAJNU, POSEBNU, POSLJEDIČNU, KAZNENU ILI PRIMJERENU ŠTETU, UKLJUČUJUĆI, ALI NE OGRANIČAVAJUĆI SE NA, ŠTETU ZBOG GUBITKA DOBITI, PRIHODA, PODATAKA, DOBRE VOLJE, KORIŠTENJA ILI DRUGIH NEMATERIJALNIH GUBITAKA, KOJI PROIZLAZE IZ ILI SU POVEZANI S VAŠIM PRISTUPOM ILI KORIŠTENJEM (ILI NEMOGUĆNOŠĆU PRISTUPA ILI KORIŠTENJA) USLUGE.', 'IZRIČITO RAZUMIJETE I SLAŽETE SE DA JE KORIŠTENJE USLUGE ISKLJUČIVO NA VLASTITI RIZIK. USLUGA SE PRUŽA BESPLATNO I SUKLADNO TOME, SLAŽETE SE DA ANQR I NJEGOVI OPERATERI NEĆE IMATI NIKAKVU ODGOVORNOST PREMA VAMA ZA BILO KAKVU ŠTETU ILI GUBITKE. NI U KOJEM SLUČAJU NAŠA UKUPNA UKUPNA ODGOVORNOST NEĆE PREMAŠITI NULA DOLARA (0 AUD).', 'SLAŽETE SE DA ĆETE OTKAZATI, ODREĆI SE I OTKAZATI SVE ZAHTJEVE, POTRAŽIVANJA I UZROKE ZA TUŽBE PROTIV ANQR-a I NJEGOVIH OPERATERA KOJI PROIZLAZE IZ VAŠEG KORIŠTENJA USLUGE.', 'NEKE JURISDIKCIJE NE DOPUŠTAJU ISKLJUČENJE ODREĐENIH JAMSTAVA ILI OGRANIČENJE ODGOVORNOSTI. U TAKVIM JURISDIKCIJAMA NAŠA ĆE ODGOVORNOST BITI OGRANIČENA U NAJVEĆOJ MJERI DOPUŠTENOJ VAŽEĆIM ZAKONOM.'],
    },
    {
      heading: 'Odšteta',
      paragraphs: ['Slažete se obeštetiti, braniti i osloboditi odgovornosti ANQR, njegove operatere, podružnice i njihove službenike, direktore, zaposlenike i agente od bilo kakvih potraživanja, šteta, gubitaka, obveza, troškova i izdataka (uključujući pravne troškove) koji proizlaze iz: (a) vašeg korištenja stranice; (b) vašeg kršenja ovih Uvjeta; (c) vašeg kršenja bilo kojih prava trećih strana; (d) bilo kojeg sadržaja koji kodirate u QR kodove.'],
    },
    {
      heading: 'Rješavanje sporova',
      paragraphs: ['Svaki spor koji proizlazi iz ovih Uvjeta ili vaše upotrebe ANQR-a prvo će se pokušati riješiti neformalnim pregovorima kontaktiranjem ${CONTACT_EMAIL}.', 'Ako neformalno rješavanje ne uspije, sporovi će se riješiti obvezujućom arbitražom u Victoriji, Australija, osim što bilo koja stranka može tražiti sudsku zabranu zbog kršenja intelektualnog vlasništva.'],
    },
    {
      heading: 'Odricanje od kolektivne tužbe',
      paragraphs: ['U MJERI DOPUŠTENOJ ZAKONOM, SLAŽETE SE DA ĆE SE BILO KAKVI POSTUPCI RJEŠAVANJA SPOROVA PROVODITI SAMO NA INDIVIDUALNOJ OSNOVI, A NE U SKUPNOJ, KONSOLIDIRANOJ ILI ZASTUPNIČKOJ TUŽBI.'],
    },
    {
      heading: 'Mjerodavno pravo',
      paragraphs: ['Ovi Uvjeti podliježu zakonima Victorije, Australija, bez obzira na načela sukoba zakona. Pristajete na isključivu nadležnost sudova koji se nalaze u Victoriji, Australija.'],
    },
    {
      heading: 'Promjene i dostupnost',
      paragraphs: ['Možemo izmijeniti, obustaviti ili ukinuti stranicu (ili bilo koji njezin dio) u bilo kojem trenutku bez prethodne najave ili odgovornosti.', 'Ove Uvjete možemo ažurirati u bilo kojem trenutku. Datum Zadnje ažuriranje označava kada su posljednji put revidirani. Nastavak korištenja nakon promjena predstavlja prihvaćanje.'],
    },
    {
      heading: 'Odvojivost',
      paragraphs: ['Ako se bilo koja odredba ovih Uvjeta smatra nevažećom ili neprovedivom, ta će se odredba provoditi u najvećoj dopuštenoj mjeri, a preostale odredbe ostat će na snazi u cijelosti.'],
    },
    {
      heading: 'Odricanje',
      paragraphs: ['Naše neprovođenje bilo kojeg prava ili odredbe ovih Uvjeta neće se smatrati odricanjem od takvog prava ili odredbe.'],
    },
    {
      heading: 'Cijeli sporazum',
      paragraphs: ['Ovi Uvjeti, zajedno s našim Pravilima o privatnosti, predstavljaju cjelokupni ugovor između vas i ANQR-a u vezi s vašim korištenjem stranice i zamjenjuju sve prethodne ugovore.'],
    },
    {
      heading: 'Viša sila',
      paragraphs: ['Nećemo biti odgovorni za bilo kakav neuspjeh ili kašnjenje u izvršenju zbog okolnosti izvan naše razumne kontrole, uključujući prirodne katastrofe, rat, terorizam, nerede, vladine akcije ili kvarove interneta/infrastrukture.'],
    },
    {
      heading: 'Kontakt',
      paragraphs: ['Pitanja o ovim Uvjetima možete poslati na: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
