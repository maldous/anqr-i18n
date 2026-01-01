import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR korisnički priručnik',
  description: 'Potpuni vodič za korištenje ANQR-a za izradu QR kodova.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Početak',
      paragraphs: ['ANQR je generator QR kodova s pristupom koji je prvi na klijentu. Prema zadanim postavkama, QR kodovi se generiraju lokalno u vašem pregledniku - nije potreban račun i vaši podaci ostaju privatni. Za profesionalno ugrađivanje možete koristiti i API na strani poslužitelja.', 'Sučelje ima tri razine: Osnovnu, Naprednu i Profesionalnu. Odaberite svoju razinu pomoću kartica u zaglavlju. Svaka razina otključava dodatne značajke, a sučelje ostaje usmjereno na ono što vam je potrebno.'],
      bullets: ['Osnovno: Jednostavno stvaranje QR koda s običnim tekstualnim/URL sadržajem i preklapanjem slike.', 'Napredno: opcije QR kodiranja, stilovi renderiranja, animacija, izlazni formati, proširene vrste sadržaja i prilagodba sloja.', 'Profesionalno: Vodeni žigovi, metapodaci, dijeljenje, analiza sigurnosti, QR kodovi za plaćanje i značajke za tvrtke.'],
    },
    {
      heading: 'Brzi početak',
      paragraphs: ['Za izradu vašeg prvog QR koda:'],
      bullets: ['1. Odaberite vrstu sadržaja (URL, tekst, WiFi itd.) iz padajućeg izbornika Vrsta sadržaja.', '2. Unesite svoje podatke u predviđena polja.', '3. Po želji prilagodite boje, stilove i dodajte sliku sloja.', '4. Kliknite Izvoz za preuzimanje QR koda kao PNG, GIF, WebP ili SVG.'],
    },
    {
      heading: 'Osnovne značajke',
      paragraphs: ['Osnovna razina pruža pojednostavljeno sučelje za izradu QR kodova s korisnim sadržajem i slojevima slika. Ovo je najjednostavniji način za početak.'],
    },
    {
      heading: 'Vrste sadržaja (osnovne)',
      paragraphs: ['Običan tekst: Kodirajte bilo koji tekst do ograničenja kapaciteta QR koda. Idealno za kratke poruke, kodove ili identifikatore.', 'URL: Kodirajte web adrese. QR kod će otvoriti URL nakon skeniranja. Podržava http:// i https:// protokole.'],
    },
    {
      heading: 'Prekrivanje slike (osnovno)',
      paragraphs: ['Prenesite sliku (JPG, PNG, GIF, WebP) koja će se stopiti s vašim QR kodom. Osnovne značajke prekrivanja uključuju:'],
      bullets: ['Prenesi iz datoteke: Odaberite sliku s uređaja.', 'Učitaj s URL-a: Unesite URL slike (mora dopustiti CORS).', 'Logo u središtu: Postavlja sliku u središte, oslanjajući se na ispravljanje pogrešaka.', 'Stapanje: Jednostavno alfa stapanje slike s QR uzorkom.', 'Intenzitet: Kontrolira koliko snažno sloj utječe na QR kod (0-100%).', 'Način rada u boji: Puna boja, Siva skala ili Crno-bijelo.', 'Sačuvaj uzorke tražila: Održava uzorke kutova nepromijenjenima za pouzdano skeniranje.'],
    },
    {
      heading: 'Napredne značajke',
      paragraphs: ['Napredna razina otključava opcije QR kodiranja, stilove renderiranja, animaciju, izlazne formate, proširene vrste sadržaja i napredno prilagođavanje slojeva.'],
    },
    {
      heading: 'Postavke QR kodiranja',
      paragraphs: ['Verzija: QR kodovi dolaze u verzijama 1-40, s tim da novije verzije sadrže više podataka, ali su veće. Postavite na 0 (Automatski) kako biste ANQR-u omogućili da odabere najmanju verziju koja odgovara vašem sadržaju.', 'Ispravljanje pogrešaka: Određuje koliko štete QR kod može pretrpjeti, a da pritom ostane skeniran.'],
      bullets: ['L (nisko): 7% korekcije pogreške - najmanja veličina, najmanja redundancija.', 'M (srednje): 15% korekcije pogreške - uravnotežena opcija.', 'Q (kvartil): 25% korekcije pogreške - dobro za tiskane kodove.', 'H (Visoka): 30% korekcija pogreške - najbolje za kodove s preklapanjima ili u teškim uvjetima.'],
    },
    {
      heading: 'Mirna zona (Margina)',
      paragraphs: ['Mirna zona je bijeli prostor oko QR koda. Skeneri trebaju ovu marginu kako bi otkrili gdje kod počinje. Standard preporučuje najmanje 4 modula. Smanjenje ispod 4 može uzrokovati probleme sa skeniranjem.'],
    },
    {
      heading: 'Stil modula',
      paragraphs: ['Moduli su pojedinačni kvadrati koji čine QR kod. ANQR nudi pet stilova:'],
      bullets: ['Kvadrat: Klasični QR izgled s oštrim kutovima.', 'Zaobljeno: Omekšani kutovi za prijateljskiji izgled.', 'Točke: Kružni moduli za modernu estetiku.', 'Dijamant: Kvadrati rotirani pod kutom od 45° za prepoznatljiv uzorak.', 'Povezano: Moduli se spajaju kada su susjedni, stvarajući organske oblike.'],
    },
    {
      heading: 'Stil uzorka Findera',
      paragraphs: ['Uzorci za tražilicu su tri velika kvadrata u kutovima QR koda koji pomažu skenerima da orijentiraju kod. Dostupni stilovi:'],
      bullets: ['Kvadrat: Standardni kvadratni kutovi.', 'Zaobljeno: Ublaženi kutovi koji odgovaraju zaobljenom stilu modula.', 'Krug: Kružni uzorci za pronalaženje kodova u obliku točka.'],
    },
    {
      heading: 'Uzorci poravnanja i vremena',
      paragraphs: ['Uzorci poravnanja pojavljuju se u većim QR kodovima (verzija 2+) kako bi se pomoglo u ispravljanju izobličenja. Vremenski uzorci su naizmjenične linije koje spajaju uzorke tražila.'],
      bullets: ['Stil poravnanja: Tražilica podudaranja, Kvadrat, Zaobljeno ili Krug.', 'Stil mjerenja vremena: Modul podudaranja, Puna ili Isprekidana.'],
    },
    {
      heading: 'Boje',
      paragraphs: ['Prednji plan: Boja QR modula. Crna (#000000) je standardna, ali bilo koja tamna boja funkcionira.', 'Pozadina: Boja pozadine. Bijela (#ffffff) je standardna. Osigurajte dovoljan kontrast s prednjim planom.', 'Prozirna pozadina: U potpunosti uklonite pozadinu za korištenje na obojenim površinama. Osigurajte da površina pruža odgovarajući kontrast.'],
    },
    {
      heading: 'Veličina i razmak modula',
      paragraphs: ['Veličina modula: Kontrolira koliko se velik svaki modul prikazuje u pikselima. Veće vrijednosti stvaraju veće i lakše za skeniranje kodove.', 'Razmak između modula: Dodaje razmak između modula u postotku. Mali razmaci (5-15%) mogu poboljšati mogućnost skeniranja u nekim uvjetima, ali prekomjerni razmaci smanjuju pouzdanost.'],
    },
    {
      heading: 'Postavke izlaza',
      paragraphs: ['Format: Odaberite format izvoza na temelju slučaja upotrebe.'],
      bullets: ['PNG: Rasterski format bez gubitaka, idealan za većinu upotreba. Najbolji za tisak i digitalno snimanje.', 'WebP: Moderni format s manjim veličinama datoteka. Dobro za web upotrebu.', 'GIF: Obavezno za animirane QR kodove. Podržava transparentnost.', 'SVG: Vektorski format koji se beskonačno skalira. Najbolji za veliki tisak ili kada trebate urediti kod.'],
    },
    {
      heading: 'Izlazne dimenzije',
      paragraphs: ['Širina/Visina: Postavite izlaznu veličinu u pikselima. Za ispis, izračunajte na temelju DPI-ja (npr. 300 DPI na 1 inč = 300px). Veće veličine pouzdanije skeniraju na udaljenosti.'],
    },
    {
      heading: 'Postavke animacije (napredne)',
      paragraphs: ['Kontrola ponašanja animiranog QR koda:'],
      bullets: ['Brzina: Broj sličica u sekundi animacije u milisekundama.', 'Petlja: Kontinuirana ili jednokratna animacija.', 'Bounce: Smjer animacije ping-ponga.', 'Početni kadar: Započni animaciju od određenog kadra.', 'Maksimalni broj sličica: Ograniči ukupan broj sličica u animaciji.', 'Korak kadra: Preskakanje kadrova za bržu animaciju.', 'Interpolacija: Nema, Pretapanje ili Morf između kadrova.'],
    },
    {
      heading: 'Vrste sadržaja (napredno)',
      paragraphs: ['Napredna razina otključava dodatne formate korisnog tereta:'],
      bullets: [
        'Broj telefona (tel:): Stvara telefonsku vezu za pozivanje.',
        'E-pošta (mailto:): Otvara klijent e-pošte s opcionalnim predmetom i tijelom poruke.',
        'SMS: Unaprijed ispunjena tekstualna poruka na telefonski broj.',
        'vCard: Potpuna kontaktna kartica s imenom, organizacijom, telefonom, e-poštom i adresom.',
        'MeCard: Kompaktni format kontakta popularan u Japanu.',
        'BizCard: Naslijeđeni format posjetnice.',
        'Geografska lokacija: GPS koordinate koje se otvaraju na kartama.',
        'WiFi: Mrežni podaci za automatsko povezivanje (SSID, lozinka, vrsta sigurnosti).',
        'Događaj u kalendaru: iCalendar format s naslovom, lokacijom, datumom/vremenom.',
        'Potvrda dolaska na događaj: Veza na stranicu za registraciju događaja.',
        'Pretplata na kalendar: Pretplatite se na ICS/WebCal feed.',
        'URL datoteke/dokumenta: Izravna veza do datoteka za preuzimanje.',
        'Veza za pohranu u oblaku: poveznice na Google Drive, Dropbox, OneDrive itd.',
        'Društveni profil: poveznice na LinkedIn, Twitter, Instagram itd.',
        'Poveznica za razmjenu poruka: duboke poveznice WhatsAppa, Telegrama, Signala.',
      ],
    },
    {
      heading: 'Napredne značajke prekrivanja',
      paragraphs: ['Dodatne mogućnosti preklapanja:'],
      bullets: ['Orezivanje: Omogućite orezivanje za odabir kvadratnog područja slike.', 'Poluton: Klasični uzorak točka u stilu ispisa temeljen na svjetlini slike.', 'Dithering: Dithering s difuzijom grešaka za detaljnu reprodukciju.'],
    },
    {
      heading: 'Načini miješanja s preklapanjem (napredno)',
      paragraphs: ['Dodatni načini miješanja na naprednoj razini:'],
      bullets: ['Podpiksel: Dijeli svaki modul na podpiksele radi većeg broja detalja.', 'Plavi šum: Koristi podebljavanje plavog šuma za uzorke bez artefakata.', 'Mozaik: Efekt temeljen na pločicama koji čuva strukturu slike.', 'Ispunjavanje praznina: Postavlja sliku u praznine između modula.', 'Svjetlina: Veličina modula varira ovisno o svjetlini slike.', 'Duotone: Preslikava sliku u dvije boje za upečatljiv kontrast.'],
    },
    {
      heading: 'Intenzitet prekrivanja',
      paragraphs: ['Kontrolira koliko snažno sloj utječe na QR kod (0-100%). Veće vrijednosti prikazuju više detalja slike, ali mogu smanjiti skeniranje. Počnite s oko 70% i prilagodite na temelju testiranja.'],
    },
    {
      heading: 'Način rada u boji',
      paragraphs: ['Kako se obrađuje preklapajuća slika:'],
      bullets: ['Puna boja: Čuva izvorne boje slike.', 'Siva skala: Pretvara u crno-bijele tonove.', 'Crno-bijelo: Binarna pretvorba visokog kontrasta.'],
    },
    {
      heading: 'Sačuvaj obrasce Findera',
      paragraphs: ['Kada je omogućeno, preklapanje ne mijenja uzorke tražila s tri kuta. Preporučuje se za pouzdano skeniranje.'],
    },
    {
      heading: 'Predobrada slike',
      paragraphs: ['Primijenite filtere na sliku sloja prije miješanja. Ove prilagodbe mogu poboljšati izgled slike u konačnom QR kodu.'],
      bullets: ['Svjetlina (-100 do +100): Posvjetlite ili potamnite sliku.', 'Kontrast (-100 do +100): Povećajte ili smanjite tonski raspon.', 'Gama (0,2 do 3,0): Nelinearno podešavanje svjetline. Vrijednosti ispod 1 posvjetljuju srednje tonove, iznad 1 ih potamnjuju.', 'Zasićenost (-100 do +100): Intenzitet boje. -100 je siva skala, +100 je prezasićena.', 'Rotiranje nijanse (0-360°): Pomicanje svih boja oko kotačića boja.', 'Zamućenje (0-20px): Omekšavanje detalja slike.', 'Izoštri (0-100%): Poboljšaj rubove i detalje.', 'Posterizacija (0-16 razina): Smanjite razine boja za efekt postera.', 'Prag (0-255): Pretvori u binarno crno/bijelo na graničnoj točki.', 'Detekcija rubova: Sobelovi ili Cannyjevi algoritmi za prikaz samo rubova.', 'Invert: Obrnite sve boje.'],
    },
    {
      heading: 'Način prilagođavanja',
      paragraphs: ['Kako se slika sloja uklapa u područje QR koda:'],
      bullets: ['Naslovnica: Slika ispunjava cijelo područje, po potrebi se obrezuje.', 'Sadrži: Vidljiva je cijela slika, može imati margine.', 'Rastezanje: Slika se iskrivljuje kako bi se točno ispunila.'],
    },
    {
      heading: 'Mogućnosti transformacije',
      paragraphs: ['Rotacija: Rotirajte sloj u koracima od 90°.', 'Okreni X/Y: Zrcali sliku vodoravno ili okomito.'],
    },
    {
      heading: 'Algoritmi za treperenje',
      paragraphs: ['Dithering pretvara slike kontinuiranog tona u uzorke koje QR kodovi mogu predstavljati. Dostupno pri korištenju načina miješanja Dithered, Blue Noise ili True Dither.'],
      bullets: [
        'Difuzija pogreške: Klasični Floyd-Steinbergov stil. Širi pogrešku kvantizacije na susjedne piksele.',
        'Uređeno (Bayer): Koristi matricu praga za regularne uzorke.',
        'Grupirana točka: Simulira polutonski ispis.',
        'Praznina i klaster: Optimizirano uređeno treperenje.',
        'Plavi šum: Vizualno ugodan uzorak slučajnog izgleda.',
        'Prag plavog šuma: Prag ditheringa s teksturom plavog šuma.',
        'Bijeli šum: Slučajno podrhtavanje praga.',
        'Gaussov/trokutasti šum: Šum s različitim distribucijama.',
        'Plavi šum + difuzija pogreške: Hibrid koji kombinira obje tehnike.',
        'Zasjenjeni plavi šum: Uzorak plavog šuma nalik zaslonu.',
        'Perceptivno: Ponderirano luminancijom za bolje vizualne rezultate.',
        'Svjesno rubova: Čuva rubove slike tijekom treperenja.',
        'Adaptivni prag: Lokalno-adaptivno određivanje praga.',
        'Vremenski plavi šum: Za animirane GIF-ove, uzorak varira po kadru.',
      ],
    },
    {
      heading: 'Difuzijske jezgre',
      paragraphs: ['Prilikom korištenja ditheringa Error Diffusion, odaberite kako se greška distribuira:'],
      bullets: ['Floyd-Steinberg: Klasična difuzija s 4 susjeda. Dobar opći izbor.', 'Jarvis-Judice-Ninke: 12 susjeda, glatkije, ali sporije.', 'Stucki: Slično JJN-u s različitim težinama.', 'Burkes: Pojednostavljeni JJN, brži.', 'Sierra: Obitelj zrna koja uravnotežuje kvalitetu i brzinu.', 'Atkinson: Difuzija svjetlosti, čuva detalje, ali može biti zrnato.'],
    },
    {
      heading: 'Jačina podrhtavanja',
      paragraphs: ['Kontrolira koliko se treperenja primjenjuje (0-100%). Niže vrijednosti čuvaju više izvornog uzorka, više vrijednosti prikazuju više detalja slike.'],
    },
    {
      heading: 'Postavke podpiksela',
      paragraphs: ['Prilikom korištenja načina miješanja subpiksela:'],
      bullets: ['Veličina mreže: 2×2, 3×3 ili 4×4 podpiksela po modulu. Veća = više detalja.', 'Pravilo središta: Strogo zahtijeva da središnji podpiksel odgovara modulu. Središte polutonova omogućuje varijacije.', 'Neutralna boja: Boja koja se koristi za neodređene podpiksele.', 'Nadjačavanje tražilice: Kako se uzorci tražilice prikazuju (puni ili stilizirani).'],
    },
    {
      heading: 'Postavke polutonova',
      paragraphs: ['Prilikom korištenja načina miješanja polutonova:'],
      bullets: ['Veličina ćelije: Po modulu ili mreži N×N.', 'Oblik točke: krug, kvadrat ili linija.', 'Krivulja svjetline: linearna, S-krivulja ili gama.'],
    },
    {
      heading: 'Dvobojne boje',
      paragraphs: ['Kada koristite način miješanja Duotone, postavite boju sjene (tamna područja) i boju svjetlucanja (svijetla područja).'],
    },
    {
      heading: 'Postavke GIF animacije',
      paragraphs: ['Prilikom korištenja animiranih GIF slojeva:'],
      bullets: ['Koristite odgode kadrova: Poštujte izvorno vrijeme GIF-a.', 'Maks. FPS: Ograničenje broja sličica u sekundi (1-60 fps).', 'Rukovanje odlaganjem: Poštujte ili pojednostavite metode odlaganja okvira.'],
    },
    {
      heading: 'Napredne opcije renderiranja',
      paragraphs: ['Dodatne kontrole renderiranja:'],
      bullets: ['Način razmaka: Stil razmaka bez razmaka, umetanje, potez ili negativni prostor.', 'Radijus kuta: Postotak zaobljenih kutova za module.', 'Gradient: Nema, Linearni, Radijalni ili Konusni gradijent na modulima.', 'Vanjski/unutarnji stil oka: Neovisni stil za prstenove s uzorkom tražila.', 'Rotacija točaka: Rotiranje modula dijamanta/točaka.', 'Mjerilo oka: Prilagodba veličine za uzorke tražila.', 'Stil okvira: Dodajte ukrasne okvire (zaobljeni okvir, naljepnica, oznaka).', 'Tekst okvira: Dodajte tekst poput Skeniraj me! u okvire.'],
    },
    {
      heading: 'Napredno QR kodiranje',
      paragraphs: ['Fino podešavanje QR kodiranja:'],
      bullets: ['Način kodiranja: Automatski, Numerički, Alfanumerički, Bajt/UTF-8 ili Kanji.', 'Provesti minimalnu mirnu zonu: Osigurati marginu od najmanje 4 modula.'],
    },
    {
      heading: 'Napredne opcije izlaza',
      paragraphs: ['Dodatne postavke izvoza:'],
      bullets: ['Naziv datoteke: Prilagođeni naziv datoteke za preuzimanja.', 'Veličina GIF palete: 2-256 boja u GIF izlazu.', 'GIF kvantizator: Smanjenje boje pomoću medijanskog rezanja, NeuQuant ili oktobrskog stabla.', 'GIF dithering: Isključeno, Floyd-Steinberg ili Uređeno.', 'Prozirna boja GIF-a: Postavite boju da bude prozirna.', 'SVG True Vector: Koristite putanje umjesto ugrađenog rastera.', 'Preciznost SVG oblika: Iscrtavanje piksela ili precizno iscrtavanje puta.', 'SVG Embed Raster Overlay: Uključi sloj kao ugrađenu sliku.', 'Nadjačavanje pozadine: Prisilno postavljanje određene boje pozadine u izlaz.'],
    },
    {
      heading: 'Mogućnosti validacije',
      paragraphs: ['Postavke obrade unosa:'],
      bullets: ['Provjera unosa: Provjerite format sadržaja prije kodiranja.', 'Uklanjanje razmaka: Uklanjanje početnih/završnih razmaka.', 'Normalizacija znakova za novi red: Pretvori sve završetke redaka u LF.', 'Zaštita maksimalne duljine: Upozori ako sadržaj premašuje kapacitet QR-a.'],
    },
    {
      heading: 'Profesionalne značajke',
      paragraphs: ['Profesionalna razina dodaje vodene žigove, metapodatke, opcije dijeljenja, sigurnosnu analizu, QR kodove za plaćanje i poslovne značajke.'],
    },
    {
      heading: 'Vodeni žig',
      paragraphs: ['Dodajte vodene žigove svojim QR kodovima:'],
      bullets: ['Vrsta: Tekst, slika ili uzorak vodenog žiga.', 'Položaj: Centar, Kutovi, Rubovi, Iza ili Mirna zona.', 'Neprozirnost: Prozirnost vodenog žiga (0-100%).', 'Način miješanja: Normalno, Množenje, Zaslon ili Prekrivanje.'],
    },
    {
      heading: 'Metapodaci',
      paragraphs: ['Ugradi metapodatke u izvezene datoteke:'],
      bullets: ['Polja Naslov, Autor, Autorska prava, Licenca, Opis.', 'Vrijeme stvaranja: Ugradi vremensku oznaku stvaranja.', 'Prilagođeni ključ-vrijednost: Dodajte proizvoljne parove metapodataka.'],
    },
    {
      heading: 'Dijeljenje',
      paragraphs: ['Podijelite konfiguracije svog QR koda:'],
      bullets: ['Izravna veza: Generirajte URL za dijeljenje s vašim trenutnim postavkama.', 'Ugradi HTML: Nabavite kod za ugradnju web-mjesta.', 'Parametri kodiranja: Uključite sve postavke u URL za dijeljenje.', 'Napomena: Slike slojeva iz lokalnih datoteka ne mogu se dijeliti putem URL-a.'],
    },
    {
      heading: 'Analiza sigurnosti',
      paragraphs: ['Osigurajte da se QR kodovi mogu skenirati:'],
      bullets: ['Sigurni način rada: Isključeno, Uravnoteženo ili Strogi zahtjevi za skeniranje.', 'Min veličina modula: Minimalna veličina piksela po modulu.', 'Minimalna mirna zona: Moduli minimalne margine.', 'Pronalazači zaključavanja/Vremensko određivanje/Poravnanje/Format/Verzija: Zaštitite određene elemente.', 'Maksimalni intenzitet prekrivanja pomoću ECC-a: Automatska ograničenja intenziteta na temelju razine korekcije pogrešaka.'],
    },
    {
      heading: 'Vrste sadržaja (profesionalno)',
      paragraphs: ['Profesionalna razina dodaje vrste plaćanja i poslovnog sadržaja:'],
      bullets: ['EPC/SEPA (EU): QR kodovi za europski bankovni transfer s IBAN-om, BIC-om, iznosom, referencom.', 'UPI (Indija): Jedinstveno platno sučelje s VPA-om, imenom primatelja plaćanja, iznosom.', 'PayNow (Singapur): Brzo plaćanje u Singapuru s UEN-om ili brojem mobitela.', 'PromptPay (Tajland): Tajlandski nacionalni platni sustav.', 'PIX (Brazil): Brazilsko trenutno plaćanje s PIX ključem.', 'Kripto: Bitcoin, Ethereum, Litecoin adrese za plaćanje s opcionalnim iznosom.', 'Poveznica marketinške kampanje: URL-ovi s potpunim praćenjem UTM parametara (marketinških oznaka).', 'Kratka poveznica: Za korištenje s programima za skraćivanje URL-ova za dinamičke/praćene QR kodove.', 'GS1 Digitalna veza: Identifikacija proizvoda GTIN-om, serijskim brojem, serijom, istekom roka valjanosti.', 'Duboka poveznica aplikacije: Duboke poveznice iOS/Android aplikacija s prilagođenim shemama.', 'Prilagođeni format: Sirovi podaci bez formatiranja ili validacije.'],
    },
    {
      heading: 'Plaćanja relevantna za jezik u naprednom načinu rada',
      paragraphs: ['Kada koristite napredni način rada, ANQR automatski prikazuje načine plaćanja relevantne za vaš odabrani jezik. Na primjer, vijetnamski korisnici vide VietQR, tajlandski korisnici vide PromptPay, a indijski korisnici vide UPI i BharatQR. Globalni načini plaćanja (kriptovaluta, PayPal, Cash App) dostupni su za sve jezike. Profesionalni način rada otključava sve standarde plaćanja bez obzira na jezik.'],
    },
    {
      heading: 'Europski standardi plaćanja',
      bullets: ['EPC/SEPA (EU): QR kodovi za europske bankovne transfere prema standardu EPC QR kodova. Podržava IBAN, BIC (nije obavezno za domaće), iznos u EUR i strukturirane ili nestrukturirane reference plaćanja. Koristi se u cijeloj SEPA zoni, uključujući zemlje EU-a, te Švicarsku, Norvešku, Island, Lihtenštajn, Monako i San Marino.', 'Švicarski QR-račun: Švicarski standard plaćanja prema SIX smjernicama za implementaciju. Podržava CHF i EUR, QR-referencu (QRR), referencu vjerovnika (ISO 11649), strukturirane adrese vjerovnika/dužnika i podatke o računu. Obavezno za švicarske račune od 2022.'],
    },
    {
      heading: 'Indijski standardi plaćanja',
      bullets: ['UPI (Indija): Ujedinjeno sučelje za plaćanja prema NPCI specifikaciji dubokog povezivanja. Podržava VPA (virtualnu adresu za plaćanje), ime primatelja plaćanja, iznos u INR, bilješku o transakciji, referentni ID, kod kategorije trgovca i način transakcije.', 'BharatQR (Indija): Ujedinjeni QR standard koji podržava i UPI i plaćanja putem kartica. Kombinira UPI VPA s PAN-om kartice za maksimalnu kompatibilnost. Uključuje naziv trgovca, grad, MCC, podatke o GST-u i brojeve računa/referentne brojeve.'],
    },
    {
      heading: 'Standardi plaćanja u jugoistočnoj Aziji',
      bullets: ['PayNow (Singapur): Singapurski sustav brzog plaćanja koji koristi EMVCo QR specifikaciju s SGQR profilom. Podržava UEN (registraciju tvrtke), broj mobitela ili NRIC kao proxy identifikatore. Uključuje oznaku za uređivanje iznosa i datum isteka.', 'PromptPay (Tajland): Tajlandski nacionalni platni sustav koji slijedi EMV profil Banke Tajlanda. Podržava broj mobitela, nacionalni identifikacijski broj, porezni identifikacijski broj, identifikacijski broj elektroničkog novčanika i plaćanje računa s više referentnih polja.', 'QRIS (Indonezija): Indonezijski standard za brzi odgovor. Nacionalni standard plaćanja temeljen na EMV-u koji podržava ID trgovca, NMID (nacionalni ID trgovca), klasifikaciju kriterija trgovca i naknade za praktičnost (fiksne ili postotne).', 'DuitNow (Malezija): Malezijski sustav za trenutno plaćanje. Podržava više vrsta proxyja, uključujući NRIC, mobitel, putovnicu, vojnu iskaznicu i registracijske brojeve tvrtki.', 'VietQR (Vijetnam): Vijetnamski standard međubankarskog transfera. Zahtijeva bankovni BIN (NAPAS identifikacija) i broj računa. Podržava više servisnih kodova za različite vrste transfera (QRPUSH, QRIBFTTA, QRIBFTTC).', 'QR Ph (Filipini): Filipinski QR standard plaćanja za InstaPay i PESONet. Koristi brojeve računa s identifikacijom trgovca za P2M (osoba-trgovac) transakcije.'],
    },
    {
      heading: 'Istočnoazijski standardi plaćanja',
      bullets: ['TWQR (Tajvan): Tajvanski QR standard plaćanja. Podržava ID trgovca, porezni ID i iznose TWD.', 'HKQR/FPS (Hong Kong): QR kodovi sustava za brže plaćanje u Hong Kongu. Podržava FPS ID, broj mobitela ili e-poštu kao identifikatore plaćanja. Iznosi su u HKD.', 'JPQR (Japan): Japanski ujedinjeni standard plaćanja QR kodom. Koristi ID trgovine za identifikaciju trgovca s iznosima u JPY.'],
    },
    {
      heading: 'Ostali regionalni standardi plaćanja',
      bullets: ['PIX (Brazil): Sustav trenutnih plaćanja Brazilske središnje banke prema specifikaciji BR koda. Podržava PIX ključeve (CPF, CNPJ, e-pošta, telefon ili nasumični ključ), ime/grad trgovca, ID transakcije i iznose u BRL-u.', 'AusPayNet/NPP PayID (Australija): PayID sustav nove australske platforme za plaćanja. Podržava vrste PayID-ova (e-pošta, mobitel, ABN, ID organizacije) ili tradicionalni BSB + broj računa. Naziv trgovca nije obavezan jer platitelji vide registrirano ime iz NPP pretrage.'],
    },
    {
      heading: 'Plaćanja kriptovalutama',
      bullets: ['Bitcoin/Litecoin (BIP-21): Standardni URI-ji za plaćanje kriptovalutama s adresom novčanika, opcionalnim iznosom i oznakom. Kompatibilno sa svim glavnim Bitcoin i Litecoin novčanicima.', 'Lightning Network (BOLT11): Fakture za plaćanje Lightning Networka. Zalijepite niz faktura kodiran BOLT11 za trenutna Bitcoin plaćanja uz minimalne naknade.', 'Ethereum (EIP-681): URI-ji zahtjeva za transakciju Ethereuma koji podržavaju izvorne ETH transfere i transfere ERC-20 tokena. Uključuje ID lanca za podršku više mreža (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parametre plina i pozive funkcija ugovora.'],
    },
    {
      heading: 'Usluge povezivanja plaćanja',
      bullets: ['PayPal.Me: PayPal poveznice za plaćanje s korisničkim imenom i opcionalnim unaprijed unesenim iznosom. Primatelji mogu platiti putem PayPal stanja, kartica ili bankovnih računa.', 'Aplikacija za gotovinu: Linkovi za plaćanje putem aplikacije za gotovinu koji koriste $cashtag s opcionalnim iznosom. Popularno u Sjedinjenim Državama za peer-to-peer plaćanja.'],
    },
    {
      heading: 'Generički EMV QR',
      bullets: ['EMV Generic: Izradite prilagođene EMV QR kodove za način rada koji predstavlja trgovac za sheme plaćanja koje nisu posebno navedene. Konfigurirajte naziv trgovca, grad, kod države (ISO 3166-1), kod valute (ISO 4217 numerički), MCC, opcije napojnice/naknade za praktičnost i dodatna podatkovna polja. Korisno za testiranje ili prilagođene integracije.'],
    },
    {
      heading: 'Načini miješanja preklapanja (profesionalno)',
      paragraphs: ['Dodatni načini miješanja na profesionalnoj razini:'],
      bullets: ['Pikselizacija: Efekt pikseliziranog preklapanja.', 'Obris: Prekrivanje detekcije rubova koje prikazuje samo konture.', 'Val: Efekt valovitog izobličenja.', 'Veličina podpiksela: Promjenjiva veličina podpiksela na temelju slike.', 'Pravo podrhtavanje: Napredno podrhtavanje s odabirom uređene matrice.', 'Ekstremno: Maksimalna vidljivost slike, može utjecati na skeniranje.'],
    },
    {
      heading: 'Postavke zaštite',
      paragraphs: ['Precizna kontrola nad time koji su QR elementi zaštićeni od modifikacije preklapanja:'],
      bullets: ['Očuvanje vremena: Održavanje obrazaca vremena nepromijenjenima.', 'Sačuvaj poravnanje: Održi obrasce poravnanja nepromijenjenima.', 'Informacije o formatu zaštite: Moduli s informacijama o formatu zaštite.', 'Informacije o verziji zaštite: Moduli s informacijama o verziji zaštite.'],
    },
    {
      heading: 'ECC-svjesni način rada',
      paragraphs: ['Inteligentno raspoređuje intenzitet sloja na temelju kapaciteta ispravljanja pogrešaka. Sustav analizira koji se moduli mogu mijenjati uz održavanje mogućnosti skeniranja.'],
      bullets: ['Proračun rizika: Postotak korištenja kapaciteta za ispravljanje pogrešaka (0-100%).', 'Veći proračun = vidljiviji sloj, ali rizičnija mogućnost skeniranja.', 'Niži budžet = sigurnije skeniranje, ali manje vidljiv sloj.'],
    },
    {
      heading: 'Profesionalne opcije renderiranja',
      paragraphs: ['Napredne kontrole renderiranja:'],
      bullets: ['Oštri rubovi: Koristite pikselizirano renderiranje slike za oštre rubove modula.', 'Pixel Snap: Poravnanje piksela na podu, okruglo ili stropno.', 'Način boje po modulu: Jednobojno, Po svjetlini, Po položaju, Po prekrivanju, Po skupini.', 'Paleta boja: Definirajte prilagođenu paletu boja za bojanje po modulu.', 'Zaštita kontrasta: Osigurajte minimalni omjer kontrasta između boja.', 'Minimalni omjer kontrasta: Zahtjev za kontrast u stilu WCAG-a (1:1 do 21:1).', 'Dodatni granični moduli: Dodatna granica izvan mirne zone.'],
    },
    {
      heading: 'Profesionalne mogućnosti ispisa',
      paragraphs: ['Postavke izvoza za poduzeća:'],
      bullets: ['DPI: Postavite razlučivost ispisa (72-600 DPI). Preporučuje se 300 DPI za ispis.', 'Uključi mirnu zonu: Uključi/isključi mirnu zonu u izlaznim dimenzijama.', 'Izvoz kao dodatno: Generiraj PDF uz primarni format.'],
    },
    {
      heading: 'Postavke animacije (profesionalne)',
      paragraphs: ['Dodatne profesionalne značajke animacije:'],
      bullets: ['Vremensko podrhtavanje: Isključeno, Plavi šum ili Podrhtavanje po kadru sigurno od treperenja.', 'Uzorak: Efekti Nema, Puls, Val, Linija skeniranja, Svjetlucanje ili Pomicanje.'],
    },
    {
      heading: 'API referenca',
      paragraphs: ['ANQR pruža API na strani poslužitelja za generiranje QR kodova putem URL parametara. To je idealno za ugrađivanje QR kodova u web stranice, e-poštu, dokumente ili automatizirane tijekove rada bez JavaScripta na strani klijenta.', 'Osnovni URL: https://anqr.link/api/qr'],
    },
    {
      heading: 'Osnovni parametri',
      paragraphs: ['Obavezni i uobičajeni parametri (imena parametara se ne prevode):'],
      bullets: ['podaci (obavezno): Sadržaj koji treba kodirati u QR kodu. Posebni znakovi za kodiranje URL-a.', 'veličina: Veličina slike u pikselima (zadano: 400, maks.: 2000). Koristi se ako nije navedeno š/v.', 'š, v: Izlazna širina i visina u pikselima. Nadjačava parametar veličine.', 'format: Izlazni format — png, webp ili gif (zadano: png).', 'ec: Razina korekcije pogrešaka — L, M, Q ili H (zadano: H).', 'fg: Boja prednjeg plana kao heksadecimalni broj bez # (zadano: 000000).', 'bg: Boja pozadine kao heksadecimalni broj bez # (zadano: ffffff).', 'prozirno: Postavite na 1 za prozirnu pozadinu.', 'margina: Mirna zona u modulima (zadano: 4).'],
    },
    {
      heading: 'Parametri stiliziranja',
      paragraphs: ['Stiliranje modula i uzorka:'],
      bullets: ['stil: Stil modula — kvadratni, zaobljeni, točkice, romb, povezani.', 'finder: Stil uzorka Findera — kvadratni, zaobljeni, krug.', 'poravnanje: Stil uzorka poravnanja — match_finder, kvadrat, zaobljeno, krug.', 'vrijeme: Stil uzorka vremena — match_module, puno, isprekidano.', 'radijus: Postotak radijusa kuta 0-100.', 'razmak: Postotak razmaka modula 0-50.', 'gapMode: Način razmaka — nema, umetak, potez, negativni_razmak.', 'okoVanjsko, unutarnje oko: Stilovi očiju — kvadratne, zaobljene, krug.', 'eyeScale: Postotak skale oka (zadano: 100).', 'grad: Vrsta gradijenta — nijedan, linearni, radijalni, konusni.', 'gradAngle: Kut gradijenta za linearne gradijente.', 'gradStops: Gradijentni zaustavljanja kao color1,pos1,color2,pos2,… (npr. ff0000,0,0000ff,1).'],
    },
    {
      heading: 'Parametri prekrivanja',
      paragraphs: ['Opcije prekrivanja slike (slika prekrivanja se dohvaća na strani poslužitelja):'],
      bullets: ['img: URL za prekrivanje slike (mora biti javno dostupan).', 'način: Način preklapanja — središte, poluton, miješanje, svjetlina, mozaik, zamućeno, plavi šum, podpiksel.', 'intenzitet: Intenzitet prekrivanja 0-100 (zadano: 100).', 'colorMode: Način preklapanja boja — boja, siva skala, crno-bijelo.', 'prilagođavanje: Kako se prekrivni sloj prilagođava — prekrivanje, zadržavanje, rastezanje.', 'rotacija: Rotacija prekrivanja u stupnjevima.', 'flipX, flipY: Postavite na 1 za okretanje preklapanja.', 'keepFinders: Sačuvaj obrasce tražilice (zadano: 1).', 'keepTiming, keepAlign: Postavite na 1 kako biste sačuvali obrasce vremenskog usklađivanja/poravnanja.'],
    },
    {
      heading: 'Parametri predobrade',
      paragraphs: ['Predobrada slike primijenjena na preklapanje:'],
      bullets: ['svjetlina: Podešavanje od -100 do 100 (zadano: 0).', 'kontrast: Podešavanje od -100 do 100 (zadano: 0).', 'gama: Vrijednost od 0,1 do 3 (zadano: 1).', 'zasićenost: Podešavanje od -100 do 100 (zadano: 0).', 'nijansa: Rotacija nijanse u stupnjevima.', 'zamućenje: Zamućenje u pikselima.', 'izoštravanje: Količina izoštravanja 0-100.', 'posteriziraj: Posteriziraj razine.', 'prag: Binarni prag 0-255.', 'rub: Detekcija ruba — isključeno, sobel, lukavo.', 'invert: Postavite na 1 za invertiranje boja.'],
    },
    {
      heading: 'Parametri vodenog žiga',
      paragraphs: ['Dodajte vodene žigove generiranim QR kodovima:'],
      bullets: ['wmEn: Postavite na 1 za omogućavanje vodenog žiga.', 'wmKind: Vrsta vodenog žiga — tekst, slika, uzorak.', 'wmText: Tekst vodenog žiga (URL kodiran).', 'wmImg: URL za sliku vodenog žiga.', 'wmPos: Položaj — središte, kutovi, rubovi, iza, tiha_zona.', 'wmOpacity: Neprozirnost 0-100 (zadano: 50).', 'wmBlend: Način miješanja — normalno, množenje, zaslon, prekrivanje.'],
    },
    {
      heading: 'Parametri animacije',
      paragraphs: ['Za animirani GIF izlaz (zahtijeva format=gif):'],
      bullets: ['animPattern: Uzorak animacije — nema, puls, val, linija skeniranja, svjetlucanje, pomicanje, ciklus_boje.', 'animFrames: Broj okvira 1-60 (zadano: 24).', 'animSpeed: Kašnjenje okvira u milisekundama 10-1000 (zadano: 100).', 'animSeed: Nasumično sjeme za animaciju.', 'ublažavanje: Ublažavanje animacije — linearno, ublažavanje_u, ublažavanje_u, ublažavanje_u, odbijanje.'],
    },
    {
      heading: 'Izlazni parametri',
      paragraphs: ['Opcije izlaznog formata:'],
      bullets: ['kvaliteta: WebP kvaliteta 0-1 (zadano: 0,9).', 'webpQ: WebP kvaliteta 0-100 (zadano: 90).', 'gifColors: veličina GIF palete 2-256 (zadano: 256).', 'dpi: Izlazni DPI za PNG (zadano: 72).', 'metaNaslov, metaAutor, metaKopija, metaOpis: polja metapodataka PNG.'],
    },
    {
      heading: 'Primjer upotrebe',
      paragraphs: ['Osnovni QR kod:', 'https://anqr.link/api/qr?data=https://example.com', 'Stilizirani QR kod s prilagođenim bojama:', 'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30', 'QR kod sa slikom prekrivanja:', 'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70', 'Animirani GIF:', 'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out'],
    },
    {
      heading: 'Ugrađivanje QR kodova',
      paragraphs: ['U profesionalnom načinu rada, značajka Dijeljenje generira ugradivi HTML i URL-ove. Evo kako ugradnja funkcionira:'],
      bullets: ['Dijeli poveznicu: Stvara URL za ANQR aplikaciju sa svim vašim postavkama kodiranim kao parametri URL-a. Primatelji mogu pregledavati i mijenjati QR kod.', 'Ugradi sliku: Generira oznaku koja upućuje na API poslužitelja. QR kod se prikazuje na strani poslužitelja i poslužuje kao slika.', 'Ugradi Markdown: Stvara sintaksu slike Markdowna za dokumentaciju i README datoteke.', 'Izravni API URL: Sirovi API URL za korištenje u aplikacijama, skriptama ili drugim integracijama.'],
    },
    {
      heading: 'Primjer HTML-a',
      paragraphs: ['Za ugradnju QR koda na vašu web stranicu:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR kod />', 'Za responzivno dimenzioniranje:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR kod style=max-width: 100%; height: auto; />', 'Poslužitelj kešira odgovore s dugim zaglavljima predmemorije, pa su ponovljeni zahtjevi za isti URL brzi.'],
    },
    {
      heading: 'Format URL-a za dijeljenje',
      paragraphs: ['Kada kliknete Dijeli u profesionalnom načinu rada, ANQR kodira vaše trenutne postavke u URL parametre. Format je:', 'https://anqr.link/?data=…&ec=H&style=rounded&….', 'Ovi parametri odražavaju API parametre, tako da URL za dijeljenje možete pretvoriti u API URL promjenom osnovne putanje iz / u /api/qr i prilagođavanjem w/h parametara prema potrebi.', 'Napomena: Slike slojeva prenesene iz lokalnih datoteka ne mogu se dijeliti putem URL-a — u dijeljenim poveznicama i API pozivima rade samo slojevi temeljeni na URL-u (parametar img).'],
    },
    {
      heading: 'Ograničenja brzine i korištenje',
      paragraphs: ['API je besplatan za korištenje u razumnim količinama. Za korištenje velikih količina ili komercijalne aplikacije koje zahtijevaju zajamčeno vrijeme rada, kontaktirajte nas.', 'API odgovori uključuju agresivno keširanje zaglavlja. Za najbolje performanse, keširajte odgovore na svojoj strani ili dosljedno koristite isti URL za identične QR kodove.'],
    },
    {
      heading: 'Najbolje prakse',
      paragraphs: ['Slijedite ove smjernice za pouzdane QR kodove:'],
      bullets: ['Uvijek testirajte svoje QR kodove s više aplikacija za skeniranje prije ispisa.', 'Koristite ispravljanje pogrešaka H (visoko) prilikom dodavanja slojeva.', 'Održavajte barem 4 modula mirne zone (margine).', 'Osigurajte visok kontrast između prednjeg plana i pozadine.', 'Za ispis koristite barem 300 DPI i testirajte u stvarnoj veličini ispisa.', 'Omogući očuvanje uzoraka Findera pri korištenju slojeva.', 'Počnite s nižim intenzitetom sloja i postupno ga povećavajte.', 'Za vanjsku upotrebu, razmotrite veće veličine modula i veću korekciju pogrešaka.'],
    },
    {
      heading: 'Rješavanje problema',
      paragraphs: ['Uobičajeni problemi i rješenja:'],
      bullets: ['QR se ne skenira: Smanjite intenzitet sloja, povećajte ispravljanje pogrešaka, provjerite kontrast.', 'Kod je prevelik: Smanjite duljinu sadržaja, koristite skraćivač URL-ova, nižu verziju.', 'Mutan ispis: Povećajte veličinu modula, koristite PNG umjesto komprimiranih formata.', 'Boje izgledaju pogrešno: Provjerite kontrast boja, isprobajte način preklapanja u sivim tonovima.', 'GIF se ne animira: Provjerite korištenje GIF formata izlaza, provjerite broj sličica u sekundi.', 'Prekrivanje slike se ne učitava: Provjerite CORS dozvole na udaljenim slikama.'],
    },
    {
      heading: 'Prečaci na tipkovnici',
      paragraphs: ['ANQR podržava standardne tipkovničke prečace. Koristite Ctrl/Cmd+S za pokretanje izvoza (kada je fokus na pregledu).'],
    },
    {
      heading: 'Dijeljenje i ugrađivanje',
      paragraphs: ['U profesionalnom načinu rada kliknite gumb Dijeli da biste kopirali URL s trenutnim postavkama. Primatelji mogu otvoriti ovaj URL kako bi vidjeli vašu točnu konfiguraciju. Napomena: Slike slojeva iz lokalnih datoteka ne mogu se dijeliti putem URL-a.'],
    },
  ],
};

export default docs;
