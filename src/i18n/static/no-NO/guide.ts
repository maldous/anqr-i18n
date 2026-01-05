import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const guide: PageDefinition = {
  title: 'ANQR Brukerveiledning',
  description: 'Komplett guide til å bruke ANQR til å opprette QR-koder.',
  lastUpdated: LAST_UPDATED,
  breadcrumb: ['Guide'],
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Åpne generatoren', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Bla gjennom Lær artikler', type: 'learn' },
    { href: '/examples?lang=${lang}', label: 'Vis QR eksempler', type: 'example' },
  ],
  sections: [
    // Getting Started (sections 0-1)
    {
      heading: 'Komme i gang',
      paragraphs: [
        'ANQR er en QR-kodegenerator med en klient-første tilnærming. Som standard genereres QR-koder lokalt i nettleseren din - ingen konto kreves og dataene forblir private. For profesjonell innlegging kan du også bruke serversiden API.',
        'Grensesnittet har tre grensesnittnivå: Basic, Advanced og Professional. Velg nivået ved hjelp av fanene i overskriften. Hvert nivå låser opp ekstra funksjoner mens du holder grensesnittet fokusert på det du trenger.',
      ],
      bullets: [
        'Grunnleggende: Enkel QR-kodeskaping med vanlig tekst/URL-innhold og bildeoverlegg.',
        'Avansert: QR-kodingsalternativer, gjengivelsesstiler, animasjon, utdataformater, utvidede innholdstyper og overleggstilpassing.',
        'Profesjonell: Vannmerker, metadata, deling, sikkerhetsanalyse, betaling QR-koder og bedriftsfunksjoner.',
      ],
      links: [{ href: '/?lang=${lang}', label: 'Åpne generatoren', type: 'generator' }],
    },
    {
      heading: 'Rask start',
      paragraphs: ['For å lage din første QR-kode:'],
      bullets: [
        '1. Velg en innholdstype (URL, tekst, WiFi, etc.) fra innholdstype.',
        '2. Skriv inn dine data i de angitte feltene.',
        '3. Valgfritt å tilpasse farger, stiler og legge til et overleggsbilde.',
        '4. Klikk Eksporter for å laste ned QR-koden som PNG, GIF, WebP eller SVG.',
      ],
      links: [
        {
          href: '/?lang=${lang}',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    // Basic Features (sections 2-4)
    {
      heading: 'Grunnleggende funksjoner',
      paragraphs: [
        'Grunnleggende nivå gir et strømlinjeformet grensesnitt for å opprette QR-koder med nyttelastinnhold og overlegg. Dette er den enkleste måten å komme i gang på.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=basic',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Innholdstyper (Basic)',
      paragraphs: [
        'Vanleg tekst: Koder alle tekster opp til QR kode kapasitetsgrense. Ideell for korte meldinger, koder eller identifikatorer.',
        'URL: Kode webadresser. QR-koden åpner URL-en når den skannes. Støtter http://og https://protokoller.',
      ],
    },
    {
      heading: 'Bilder Overlegg (Basic)',
      paragraphs: [
        'Last opp et bilde (JPG, PNG, GIF, WebP) for å blande med QR-koden. Grunnleggende overleggsfunksjoner inkluderer:',
      ],
      bullets: [
        'Last opp fra fil: Velg et bilde fra enheten.',
        'Last fra URL: Skriv inn en bildeadresse (må ikke tillate CORS).',
        'Senter logo: Plasserer bildet i sentrum, avhengig av feilretting.',
        'Blanding: Enkel alfa blanding av bildet med QR-mønster.',
        'Intensitet: Kontroller hvor sterkt overlegget påvirker QR-koden (0-100%).',
        'Fargemodus: Full farge, gråtone eller svart/hvitt.',
        'Bevar Finder-mønster: Holder hjørnemønstre uendret for pålitelig skanning.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=basic#overlay',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-5',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    // Advanced Features (sections 5-40)
    {
      heading: 'Avanserte funksjoner',
      paragraphs: [
        'Det avanserte nivået låser QR-kodingsalternativer, gjengivelsesstiler, animasjon, utgangsformater, utvidede innholdstyper og avansert overleggstilpasning.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'QR-kodingsinnstillinger',
      paragraphs: [
        'Versjon: QR-koder kommer i versjon 1-40, med høyere versjoner som har mer data, men er større. Sett til 0 (Auto) for å la ANQR velge den minste versjonen som passer innholdet ditt.',
        'Feilretting: Avgjør hvor mye skade en QR-kode kan opprettholde mens den forblir skantable.',
      ],
      bullets: [
        'L (Low): 7% feilretting - minste størrelse, minst redundans.',
        'M (medium): 15% feilretting - balansert alternativ.',
        'Q (Quartile): 25% feilretting - bra for trykte koder.',
        'H (høy): 30% feilretting - beste for koder med overlegg eller under tøffe forhold.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#qr-encoding',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Stille Zone (Margin)',
      paragraphs: [
        'Den stille sonen er den hvite plassen rundt QR-koden. Skannere trenger denne margen for å oppdage hvor koden starter. Standarden anbefaler minst 4 moduler. Nedsettelse under 4 kan forårsake skanneproblemer.',
      ],
    },
    {
      heading: 'Modulstil',
      paragraphs: [
        'Moduler er de enkelte firkanter som utgjør en QR-kode. ANQR tilbyr fem stiler:',
      ],
      bullets: [
        'Square: Klassisk QR utseende med skarpe hjørner.',
        'Avrundet: Myke hjørner for et vennligere utseende.',
        'Dots: Cirkulære moduler for en moderne estetisk.',
        'Diamant: 45° roterte firkanter for et karakteristisk mønster.',
        'Tilkoblet: Moduler slås sammen når de tilstøter, og skaper organiske former.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#render',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Finder mønster stil',
      paragraphs: [
        'Finnemønstre er de tre store firkantene i QR hjørner som hjelper skannere orientere koden. Tilgjengelige stiler:',
      ],
      bullets: [
        'Square: Standard firkantede hjørner.',
        'Avrundet: Mykte hjørner som passer avrundet modulstil.',
        'Sirkel: Circular Finder mønstre for dot-style koder.',
      ],
    },
    {
      heading: 'Justering & Timing-mønster',
      paragraphs: [
        'Justeringsmønstre vises i større QR-koder (versjon 2+) for å bidra til å korrigere forvrengning. Timing mønstre er de vekslende linjene som forbinder finner mønstre.',
      ],
      bullets: [
        'Justeringsstil: Match Finder, firkant, rundet eller sirkel.',
        'Timing Style: Match Module, Solid eller Dashed.',
      ],
    },
    {
      heading: 'Farger',
      paragraphs: [
        'Forgrunn: Fargen på QR-modulene. Svart (# 0,00000) er standard, men alle mørke farger fungerer.',
        'Bakgrunn: Bakgrunnsfarge. Hvit (#ffffff) er standard. Sikre tilstrekkelig kontrast med forgrunnen.',
        'Gjennomsiktig bakgrunn: Fjern bakgrunnen helt for bruk på fargede overflater. Sørg for at overflaten gir tilstrekkelig kontrast.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#render',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Modulstørrelse & Gap',
      paragraphs: [
        'Modulstørrelse: Kontrollerer hvor stor hver modul er i piksler. Større verdier skaper større, enklere å skanne koder.',
        'Modul Gap: Legger til plass mellom moduler som prosent. Små hull (5-15%) kan forbedre skannbarheten i enkelte forhold, men store hull reduserer påliteligheten.',
      ],
    },
    {
      heading: 'Utgangsinnstillinger',
      paragraphs: ['Format: Velg eksportformat basert på brukstilfelle.'],
      bullets: [
        'PNG: Lossless raster format, ideell for de fleste bruk. Best for print og digital.',
        'WebP: Moderne format med mindre filstørrelser. Godt for webbruk.',
        'GIF: Nødvendig for animerte QR-koder. Støtter åpenhet.',
        'SVG: Vektorformat som skalerer uendelig. Beste for store utskrifter eller når du trenger å redigere koden.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-3',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Utgangsdimensjoner',
      paragraphs: [
        'Breidde/høyde: Angi utgangsstørrelse i piksler. For utskrift, beregne basert på DPI (f.eks. 300 DPI på 1 tomme = 300px). Større størrelser skanner mer pålitelig på avstand.',
      ],
    },
    {
      heading: 'Animasjonsinnstillinger (Avansert)',
      paragraphs: ['Kontroller animert QR-kodeadferd:'],
      bullets: [
        'Hastighet: Animasjonsrammehastighet i millisekunder.',
        'Loop: Kontinuerlig eller enkeltspill animasjon.',
        'Bounce: Ping-pong animasjon retning.',
        'Start ramme: Begynn animasjon fra spesifikk ramme.',
        'Max Frames: Begrens totale rammer i animasjon.',
        'Rammesteg: Hopp over rammer for raskere animasjon.',
        'Interpolering: Ingen, Crossfade eller Morph mellom rammer.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-4',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Innholdstyper (Avansert)',
      paragraphs: ['Avansert nivå låser opp ytterligere nyttelastformater:'],
      bullets: [
        'Telefonnummer (tel:): Oppretter en telefonlenke.',
        'E-post (post til:): Åpner e-postklient med valgfritt emne og kropp.',
        'SMS: Forfylt tekstmelding til et telefonnummer.',
        'vCard: Full kontaktkort med navn, organisasjon, telefon, e-post, adresse.',
        'MeCard: Kompakt kontaktformat populært i Japan.',
        'BizCard: Legacy visittkortformat.',
        'Geo Plassering: GPS koordinater som åpnes i kart.',
        'WiFi: Nettverksopplysninger for automatisk tilkobling (SSID, passord, sikkerhetstype).',
        'Kalender Hendelse: iCalendar-format med tittel, plassering, dato/tid.',
        'Hendelsesbesvarelse: Link til hendelsesregistrering.',
        'Abonner på en ICS/WebCal-feed.',
        'Fil/dokument URL: Direkte lenke til nedlastbare filer.',
        'Cloud Storage Link: Linker til Google Drive, Dropbox, OneDrive, etc.',
        'Sosial profil: Linker til LinkedIn, Twitter, Instagram osv.',
        'Meldingslink: WhatsApp, Telegram, Signal dype lenker.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Avanserte overleggsfunksjoner',
      paragraphs: ['Ytterligere overleggsfunksjoner:'],
      bullets: [
        'Beskjær: Aktiver beskjering for å velge et firkantet område av bildet.',
        'Halftone: Klassisk utskrift-stil prikk mønster basert på bilde lysstyrke.',
        'Dithered: Feil-diffusion dithering for detaljert reproduksjon.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#overlay',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Overlegg blandemoduser (avansert)',
      paragraphs: ['Ytterligere blandingsmoduser i avansert nivå:'],
      bullets: [
        'Subpiksel: Deler hver modul i underpiksler for høyere detaljer.',
        'Blåstøy: Bruker blå støy utjamning for artefakter-frie mønstre.',
        'Mosaikk: Flisebasert effekt som bevarer bildestruktur.',
        'Gap Fyll: Plasserer bildet i hull mellom moduler.',
        'Lysstyrke: Varies modulstørrelse basert på bildelysstyrke.',
        'Duotone: Kartbilde til to farger for slående kontrast.',
      ],
    },
    {
      heading: 'Overlegg Intensitet',
      paragraphs: [
        'Kontrollerer hvor sterkt overlegget påvirker QR-koden (0,100%). Høyere verdier viser mer bildedetaljer, men kan redusere skannbarhet. Start rundt 70% og justere basert på testing.',
      ],
      links: [
        {
          href: '/learn?lang=${lang}#section-5',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Fargemodus',
      paragraphs: ['Hvordan overleggsbildet behandles:'],
      bullets: [
        'Full farge: Bevarer originalbildefarger.',
        'Gråskala: Konverterer til svart og hvitt.',
        'Svart/hvitt: Høy kontrast binær konvertering.',
      ],
    },
    {
      heading: 'Bevar Finder mønster',
      paragraphs: [
        'Når aktivert, holder de tre hjørne finner mønstre umodifisert av overlegget. Sterkt anbefalt for pålitelig skanning.',
      ],
    },
    {
      heading: 'Forbehandling av bilder',
      paragraphs: [
        'Bruk filtre på overleggsbildet før blanding. Disse justeringene kan forbedre hvordan bildet vises i den endelige QR-koden.',
      ],
      bullets: [
        'Lysstyrke (-100 til +100): Lysere eller mørkere bildet.',
        'Kontrast (-100 til +100): Øke eller redusere tonalt område.',
        'Gamma (0,2 til 3.0): Ikke-lineær lysstyrkejustering. Verdier under 1 lysere midtoner, over 1 mørkere dem.',
        'Metning (-100 til +100): Fargeintensitet. -100 er gråton, +100 er overmettet.',
        'Hue rotasjon (0-360°): Skift alle farger rundt fargehjulet.',
        'Slør (0-0px): Myke bildedetaljer.',
        'Skjerp (0-100%): Forbedre kanter og detaljer.',
        'Posterize (0-16 nivåer): Reduser fargenivået for en plakateffekt.',
        'Terskel (0-255): Konverter til binær svart/hvitt ved avskjæring.',
        'Kantdeteksjon: Sobel eller Canny algoritmer for å vise kun kanter.',
        'Reverser alle farger.',
      ],
    },
    {
      heading: 'Fitmodus',
      paragraphs: ['Hvordan overleggsbildet passer QR-kodeområdet:'],
      bullets: [
        'Deksel: Bilde fyller hele området, beskjering om nødvendig.',
        'Inneholder: Hele bildet synlig, kan ha marginer.',
        'Stretch: Bildet forvrenger å fylle nøyaktig.',
      ],
    },
    {
      heading: 'Transformasjonsalternativer',
      paragraphs: [
        'Rotasjon: Roter overlegg i 90° trinn.',
        'Flip X/Y: Speil bildet horisontalt eller vertikalt.',
      ],
    },
    {
      heading: 'Dindringsalgoritmer',
      paragraphs: [
        'Dithering konverterer kontinuerlig tonebilder til mønstre som QR-koder kan representere. Tilgjengelig når du bruker Dithered, Blue Noise eller True Dither blandingsmodus.',
      ],
      bullets: [
        'Feil Diffusion: Classic Floyd-Steinberg stil. Sprer kvantiseringsfeil til nabopiksler.',
        'Bestill (Bayer): Bruker en terskelmatrise for vanlige mønstre.',
        'Clustered Dot: Simulerer halvtoneutskrift.',
        'Void & Cluster: Optimert bestilling.',
        'Blå støy: Visuelt hyggelig tilfeldig utseende mønster.',
        'Blåstøy Terskel: Terskel utjamning med blå støy tekstur.',
        'Hvit støy: Tilfeldig terskel.',
        'Gaussisk/triangulær Støy: Støy med forskjellige distribusjoner.',
        'Blå støy + feildiffusion: Hybrid kombinerer begge teknikkene.',
        'Skjermet blå støy: Skjermlignende blå støymønster.',
        'Perceptuell: Luminansvektet for bedre visuelle resultater.',
        'Edge-Aware: Bevarer bildekanter under utjamning.',
        'Adaptiv terskel: Lokalt adaptiv terskel.',
        'Temporal blå støy: For animerte GIFs, varierer mønster per ramme.',
      ],
    },
    {
      heading: 'Diffusion Kerneler',
      paragraphs: ['Velg hvordan feilen distribueres ved bruk av Feil Diffusion dithering:'],
      bullets: [
        'Floyd-Steinberg: Klassisk 4-nærliggende diffusjon. Godt generelt valg.',
        'Jarvis-Judice-Ninke: 12-neighbor, jevnere men langsommere.',
        'Stucki: Lignende JJN med ulike vekter.',
        'Burker: Forenklet JJN, raskere.',
        'Sierra: Familie av kjerner balansere kvalitet og hastighet.',
        'Atkinson: Lys diffusjon, bevarer detaljer, men kan være kornaktig.',
      ],
    },
    {
      heading: 'Endere styrke',
      paragraphs: [
        'Kontrollerer hvor mye dithering brukes (0,100%). Lavere verdier bevarer mer av det opprinnelige mønsteret, høyere verdier viser mer bildedetaljer.',
      ],
    },
    {
      heading: 'Underpikselinnstillinger',
      paragraphs: ['Ved bruk av subpikselblandingsmodus:'],
      bullets: [
        'Gridstørrelse: 2×2, 3×3, eller 4×4 underpiksler per modul. Høyere = mer detaljer.',
        'Senterregelen: Strict krever sentrum subpiksel for å matche modul. Halvtonesenteret tillater variasjon.',
        'Nøytral farge: Farge som brukes for ubestemte subpiksler.',
        'Finner Overstyr: Hvordan finne mønstre er gjengitt (solid eller stilisert).',
      ],
    },
    {
      heading: 'Halvtoneinnstillinger',
      paragraphs: ['Når du bruker Halftone blandingsmodus:'],
      bullets: [
        'Cellstørrelse: per modul eller NxN rutenett.',
        'Punktform: Sirkel, firkant eller linje.',
        'Lysstyrkekurve: Linear, S-Kurve eller Gamma.',
      ],
    },
    {
      heading: 'Duotonefarger',
      paragraphs: [
        'Når du bruker duotone blandemodus, angi skyggefarge (mørke områder) og fargeheve (høyre områder).',
      ],
    },
    {
      heading: 'GIF- animasjonsinnstillinger',
      paragraphs: ['Når du bruker animerte GIF-overlegg:'],
      bullets: [
        'Bruk rammeforsinkelser: Respekt original GIF-tid.',
        'Maks FPS: Begrens rammehastighet (1-60 fps).',
        'Dispositionshåndtering: Respekt eller forenkle rammeavhendingsmetoder.',
      ],
    },
    {
      heading: 'Avanserte gjengivelsesalternativer',
      paragraphs: ['Ytterligere gjengivelseskontroller:'],
      bullets: [
        'Gapmodus: Ingen, Innsats, Stroke eller Negativ mellomroms gap styling.',
        'Hjørneradius: Avrundede hjørner prosentdel for moduler.',
        'Gradient: Ingen, lineær, Radiell eller konisk gradient på moduler.',
        'Eye Outer/Inner Style: Uavhengig styling for finner mønster ringer.',
        'Dot rotasjon: Roter diamant/dot moduler.',
        'Eye Scale: Størrelsesjustering for finnermønstre.',
        'Rammestil: Legg til dekorative rammer (Rounded Frame, Sticker, Tag).',
        'Rammetekst: Legg til tekst som "Scan Me!" i rammer.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#render',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Avansert QR-koding',
      paragraphs: ['Fine-tune QR-koding:'],
      bullets: [
        'Kodingsmodus: Auto, Numeric, Alfanumeric, Byte/UTF-8 eller Kanji.',
        'Enforce Min Stille Zone: sikre minst 4 modulmargin.',
      ],
    },
    {
      heading: 'Avanserte utgangsalternativer',
      paragraphs: ['Ekstra eksportinnstillinger:'],
      bullets: [
        'Filnavn: Tilpasset filnamn for nedlastinger.',
        'GIF Palettstørrelse: 2-256 farger i GIF-utgang.',
        'GIF Quantizer: Median Cut, NeuQuant eller Octree fargereduksjon.',
        'GIF Dithering: Av, Floyd-Steinberg, eller Bestill.',
        'GIF Gjennomsiktig farge: Sett en farge som skal være gjennomsiktig.',
        'SVG Ekte vektor: Bruk stier i stedet for innebygd raster.',
        'SVG Form presisjon: Pixel eller presis banegjengivelse.',
        'SVG Bygg inn Raster Overlay: Inkluder overlegg som innebygd bilde.',
        'Bakgrunn Overstyr: Tving en bestemt bakgrunnsfarge i utgangen.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Valideringsalternativer',
      paragraphs: ['Inndatabehandlingsinnstillinger:'],
      bullets: [
        'Valider inndata: Sjekk innholdsformat før koding.',
        'Trim Whitespace: Fjern ledende/strimbare områder.',
        'Normalisere nye linjer: Konverter alle linjer til LF.',
        'Maks lengdevakt: Varsle om innhold overstiger QR-kapasitet.',
      ],
    },
    // Professional Features (sections 41-56)
    {
      heading: 'Profesjonelle funksjoner',
      paragraphs: [
        'Profesjonelt nivå legger til vannmerker, metadata, delingsalternativer, sikkerhetsanalyse, betaling QR-koder og bedriftsfunksjoner.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Vannmerke',
      paragraphs: ['Legg vannmerker til dine QR-koder:'],
      bullets: [
        'Type: Tekst, bilde eller mønster vannmerke.',
        'Posisjon: Senter, hjørner, kanter, bak, eller stille sone.',
        'Dekkevne: Vannmerke gjennomsiktighet (0-100%).',
        'Blandemodus: Normal, multiplisert, skjerm eller overleggsblanding.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#watermark',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Bygg inn metadata i eksporterte filer:'],
      bullets: [
        'Tittel, Forfatter, opphavsrett, lisens, Beskrivelse felt.',
        'Skapelsestid: Bygg inn generasjonens tidsstempel.',
        'Egendefinert nøkkelverdi: Legg til vilkårlige metadatapar.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#metadata',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Deling',
      paragraphs: ['Del dine QR-kodekonfigurasjoner:'],
      bullets: [
        'Direkte link: Opprett en delt URL med gjeldende innstillinger.',
        'Embed HTML: Få innebygd kode for nettsteder.',
        'Kodeparametere: Ta med alle innstillinger i delt URL.',
        'Merk: Overlegg bilder fra lokale filer kan ikke deles via URL.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#share',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-7',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Sikkerhetsanalyse',
      paragraphs: ['Sørg for at QR-koder forblir skanneaktiverbare:'],
      bullets: [
        'Sikkerhetsmodus: Av, balansert eller strenge skannekrav.',
        'Min Module Størrelse: Minimum pikselstørrelse per modul.',
        'Min stille Sone: Minimum marginmoduler.',
        'Lock Finders/Timing/Align/Format/Version: Beskytt bestemte elementer.',
        'Max Overlay Intensitet ved ECC: Automatiske intensitetsgrenser basert på feilrettingsnivå.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#safety',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-5',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Innholdstyper (Profesjonell)',
      paragraphs: ['Profesjonelt nivå legger til betalings- og foretaksinnholdstyper:'],
      bullets: [
        'EPC/SEPA (EU): Europeisk bankoverføring QR-koder med IBAN, BIC, beløp, referanse.',
        'UPI (India): Unified Payments Interface med VPA, Payee name, beløp.',
        'PayNow (Singapore): Singapore hurtig betaling med UEN eller mobilnummer.',
        '(Thailand): Thai nasjonale betalingssystem.',
        'PIX (Brazil): Brasiliansk øyeblikksbetaling med PIX-nøkkel.',
        'Crypto: Bitcoin, Ethereum, Litecoin-betalingsadresser med valgfritt beløp.',
        'Markedsføringskampanje Link: URL-adresser med full UTM-parameter (Marketing Tags) sporing.',
        'Kort link: For bruk med URL-forkortere for dynamiske/sporbare QR-koder.',
        'GS1 Digital Link: Produktidentifikasjon med GTIN, serie, sats, utløp.',
        'App Deep Link: iOS/Android app dype lenker med tilpassede ordninger.',
        'Tilpasset format: Rå data uten formatering eller validering.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-2',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    // Payment Standards (Language-Relevant) - section 42
    {
      heading: 'Language-Relevante betalinger i avansert modus',
      paragraphs: [
        'Når du bruker avansert modus, viser ANQR automatisk betalingsmetoder som er relevante for det valgte språket. For eksempel, vietnamesiske brukere se VietQR, thailandske brukere se quimpay, og indiske språkbrukere se UPI og BharatQR. Globale betalingsmetoder (kryptovaluta, PayPal, Cash App) er tilgjengelige for alle språk. Profesjonell modus låser alle betalingsstandarder uansett språk.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Europeiske betalingsstandarder',
      bullets: [
        'EPC/SEPA (EU): Europeisk bankoverføring QR-koder etter EPC QR-kodestandarden. Støtter IBAN, BIC (valgfritt for innenlandsk), beløp i EUR, og strukturerte eller ustrukturerte betalingsreferanser. Brukes over hele SEPA-sonen, inkludert EU-land og Sveits, Norge, Island, Liechtenstein, Monaco og San Marino.',
        'Sveitsisk QR-bill: Sveitsisk betalingsstandard etter SIX implementeringsretningslinjer. Støtter CHF og EUR, QR-reference (QRR), Creditor Reference (ISO 11649), strukturerte kreditor-/debitoradresser og faktureringsinformasjon. Det er nødvendig med sveitsiske fakturaer siden 2022.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Indiske betalingsstandarder',
      bullets: [
        'UPI (India): Unified Payments Interface som følger NPCI Deep Linking Spesifikasjon. Støtter VPA (Virtual Payment Address), betalingsnavn, beløp i INR, transaksjonsnote, referanse-ID, handelskategorikode og transaksjonsmodus.',
        'BharatQR (India): Unified QR standard støtter både UPI og kortbaserte betalinger. Kombinerer UPI VPA med kort-PAN for maksimal kompatibilitet. Inkluderer handelsnavn, by, MCC, GST-detaljer og faktura/referansenumre.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Sørøstasiatiske betalingsstandarder',
      bullets: [
        'PayNow (Singapore): Singapore rask betalingssystem ved hjelp av EMVCo QR spesifikasjon med SGQR profil. Støtter UEN (bedriftsregistrering), mobilnummer eller NRIC som proxy-identifikatorer. Inkluderer mengderedigeringsflagg og utløpsdato.',
        '(Thailand): Thai National Payment System etter Bank of Thailand EMV profil. Støtter mobilnummer, nasjonal ID, skatte-ID, e-veske-ID og fakturering med flere referansefelt.',
        'QRIS (Indonesia): Rask responskode Indonesisk standard. EMV-basert nasjonal betalingsstandard som støtter kjøpmanns-ID, NMID (Nasjonal merchant ID), kjøpmannskriterier klassifisering og bekvemmelighetsgebyrer (fast eller prosent).',
        'DuitNow (Malayasia): Malaysias øyeblikkelige betalingssystem. Støtter flere proxytyper, inkludert NRIC, mobil, pass, hær-ID og forretningsnummer.',
        'VietQR (Vietnam): vietnamesisk interbank transfer standard. Krever bank BIN (NAPAS identifikasjon) og kontonummer. Støtter flere servicekoder for ulike overføringstyper (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filippiner): Filipinsk QR betalingsstandard for InstaPay og PESONet. Bruker kontonummer med kjøpmannsidentifikasjon for P2M (person-til-merchant) transaksjoner.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Østasiatiske betalingsstandarder',
      bullets: [
        'TWQR (Taiwan): Taiwansk QR betalingsstandard. Støtter handels-ID, skatte-ID og TWD-beløp.',
        'HKQR/FPS (Hong Kong): Hongkong raskere betalingssystem QR-koder. Støtter FPS ID, mobilnummer eller e-post som betalingsidentifikatorer. Beløp i HKD.',
        'JPQR (Japan): Japansk enhetlig QR-kodebetalingsstandard. Bruker lager-ID for kjøpsidentifikasjon med JPY-beløp.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Andre regionale betalingsstandarder',
      bullets: [
        'PIX (Brazil): Brasiliansk sentralbank Instant Payment system etter BR Code spesifikasjon. Støtter PIX-nøkler (CPF, CNPJ, e-post, telefon eller tilfeldig nøkkel), handelsnavn/by, transaksjons-ID og BRL-beløp.',
        'AusPayNet/NPP PayID (Australia): Australian New Payments Platform PayID-system. Støtter betaler ID-typer (e-post, mobil, ABN, organisasjons-ID) eller tradisjonelle BSB + kontonummer. Merchant navn er valgfritt som betalere se registrert navn fra NPP-oppslag.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Cryptocurrency Betalinger',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): Standard cryptocurrency-betalingsadresser med lommebokadresse, valgfritt beløp og etikett. Kompatibel med alle store Bitcoin og Litecoin lommeboker.',
        'Lightning Network (BOLT11): Lightning Network betaling fakturaer. Lim inn en BOLT11-kodet fakturastreng for øyeblikkelige Bitcoin-betalinger med minimale avgifter.',
        'Ethereum (EIP-681): Ethereum-transaksjonsforespørselsadresser som støtter innfødte ETH-overføringer og ERC-20-tokenoverføringer. Inkluderer kjede-ID for multi-nettverksstøtte (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gassparametre og kontraktsfunksjonssamtaler.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Betalingslink-tjenester',
      bullets: [
        'PayPal.Me: PayPal betalingskoblinger med brukernavn og valgfritt forhåndsfylt beløp. Mottakere kan betale via PayPal-saldo, kort eller bankkontoer.',
        'Kontantapp: Kontant App betalingskoblinger ved hjelp av $cashtag med valgfritt beløp. Populær i USA for peer-to-peer betaling.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Generisk EMV QR',
      bullets: [
        'EMV Generisk: Opprett egendefinert EMV Merchant-Presented Mode QR-koder for betalingsordninger som ikke er spesielt oppført. Konfigurer handelsnavn, by, landkode (ISO 3166-1), valutakode (ISO 4217 numeriske), MCC, tips-/konvensjonsgebyralternativer og ekstra datafelt. Nyttig for testing eller egendefinert integrasjon.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    // Professional Overlay/Render sections (continued)
    {
      heading: 'Overlegg blandemoduser (profesjonell)',
      paragraphs: ['Ytterligere blandingsmoduser i profesjonelt nivå:'],
      bullets: [
        'Pixelate: Pixelert overlegg effekt.',
        'Outline: Edge deteksjon overlegg som kun viser konturer.',
        'Wavy distortion effekt.',
        'Subpixel Størrelse: Variabel underpiksel størrelse basert på bildet.',
        'True Dither: Avansert utjamning med bestilt matrise utvalg.',
        'Ekstrem: Maksimal bildesynlighet, kan påvirke skannbarhet.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#overlay',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Beskyttelsesinnstillinger',
      paragraphs: [
        'Finkornet kontroll over hvilke QR-elementer som er beskyttet mot overleggsmodifikasjon:',
      ],
      bullets: [
        'Bevar Timing: Hold timingsmønstre uendret.',
        'Bevar justering: Hold justeringsmønstre umodifisert.',
        'Beskytt format Info: Skjold format informasjon moduler.',
        'Beskytt versjon Info: Skjold versjon informasjon moduler.',
      ],
    },
    {
      heading: 'ECC-Aware-modus',
      paragraphs: [
        'Intelligent distribuerer overleggsintensitet basert på feilrettingskapasitet. Systemet analyserer hvilke moduler som kan modifiseres mens skannbarhet opprettholdes.',
      ],
      bullets: [
        'Risikobudsjett: Prosentandel feilrettelseskapasitet til bruk (0-100%).',
        'Høyere budsjett = mer synlig overlegg, men risikofriere skannbarhet.',
        'Lavere budsjett = tryggere skanning, men mindre synlig overlegg.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#overlay',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Profesjonelle gjengivelsesalternativer',
      paragraphs: ['Avanserte gjengivelseskontroller:'],
      bullets: [
        'Crisp Edges: Bruk pikslert bildegjengivelse for skarpe modulkanter.',
        'Pixel Snap: Gulv, runde eller Ceil pixel justering.',
        'Per-module fargemodus: solid, etter lysstyrke, etter posisjon, ved overlegg, ved Cluster.',
        'Fargepalett: Definer egendefinert fargepalett for per-module farger.',
        'Kontrastvakt: Sørg for minste kontrastforhold mellom farger.',
        'Min kontrastforhold: WCAG-stil kontrastkrav (1:1 til 21:1).',
        'Ekstra grense Moduler: Ytterligere grense utenfor stille sone.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#render',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Profesjonelle utgangsalternativer',
      paragraphs: ['Bedriftseksportinnstillinger:'],
      bullets: [
        'DPI: Sett utskriftsoppløsning (72-600 DPI). 300 DPI anbefales for utskrift.',
        'Inkluder Stille Zone: Bytt rolig sone i utgangsdimensjoner.',
        'Eksporter som ekstra: Opprett PDF sammen med primærformat.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#output',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'Animasjonsinnstillinger (Profesjonell)',
      paragraphs: ['Ytterligere profesjonell animasjonsfunksjoner:'],
      bullets: [
        'Temporal diner: Av, Blå støy, eller Flicker Safe per-frame dithering.',
        'Mønster: Ingen, Pulse, bølge, Scanline, Shimmer eller Drift effekter.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#animation',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-4',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    // API Reference (sections 57-69)
    {
      heading: 'API referanse',
      paragraphs: [
        'ANQR gir en server-side API for å generere QR-koder via URL-parametre. Dette er ideelt for å integrere QR-koder i nettsteder, e-poster, dokumenter eller automatiserte arbeidsflyter uten JavaScript på klientsiden.',
        'Base URL: https://anqr.link/api/qr',
      ],
      links: [{ href: '/examples?lang=${lang}', label: 'Vis QR eksempler', type: 'example' }],
    },
    {
      heading: 'Grunnleggende parametere',
      paragraphs: ['Nødvendige og felles parametere (parameternavn er ikke oversatt):'],
      bullets: [
        'data (nødvendig): Innholdet som skal kodes i QR-koden. URL-kode spesielle tegn.',
        'størrelse: Bildestørrelse i piksler (standard: 400, max: 2000). Brukes hvis w/h ikke er spesifisert.',
        'w, h: Utgangsbredde og høyde i piksler. Overstyrer størrelsesparameter.',
        'format: Utgangsformat - png, webp eller gif (standard: png).',
        'ec: Feilrettingsnivå - L, M, Q eller H (standard: H).',
        'fg: Forgrunnsfarge som heks uten # (standard: 0000).',
        'bg: Bakgrunnsfarge som heks uten # (standard: ffffff).',
        'gjennomsiktig: Sett til 1 for gjennomsiktig bakgrunn.',
        'margin: Stille sone i moduler (standard: 4).',
      ],
    },
    {
      heading: 'Stilparametre',
      paragraphs: ['Modul og mønster styling:'],
      bullets: [
        'stil: Modul stil - firkantet, rundet, prikker, diamant, tilkoblet.',
        'finner: Finder mønster stil - firkantet, avrundet, sirkel.',
        'justering: Juster mønster stil - match_finder, firkantet, avrundet, sirkel.',
        'timing: Timing mønster stil - match_module, solid, dashed.',
        'radius: Corner radius prosent 0-100.',
        'gap: Modul gap prosent 0-50.',
        'gapMode: Gap modus - ingen, inset, slag, negativ_rom.',
        'øye Ytre, øyeInner: Øye stiler - firkantet, avrundet, sirkel.',
        'øyeskala: Øyeskalaprosent (standard: 100).',
        'grad: Grad: Gradient type - ingen, lineær, radial, konisk.',
        'gradAngle: Gradvinkel for lineære gradienter.',
        'gradStops: Gradient stopper som farge1,pos1,color2,pos2,... (f.eks. ff0000, 00000ff,1).',
      ],
    },
    {
      heading: 'Overleggsparametere',
      paragraphs: ['Bildeoverlegg (overleggsbilde hentes serversiden):'],
      bullets: [
        'img: URL til overlegg bilde (må være offentlig tilgjengelig).',
        'modus: Overlegg modus - sentrum, halvtone, blanding, lysstyrke, mosaikk, pyntet, blå-støyt, subpiksel.',
        'intensitet: Overlegg intensitet 0-100 (standard: 100).',
        'farge Mode: Overlegg fargemodus - farge, gråtone, bw.',
        'passform: Hvor overlegg passer - deksel, inneholder, strekk.',
        'rott: Overlegg rotasjon i grader.',
        'flipX, flipY: Sett til 1 for å snu overlegg.',
        'hold Finnere: Bevar Finder mønstre (standard: 1).',
        'hold Timing, keepAlign: Sett til 1 for å bevare timing/justeringsmønstre.',
      ],
    },
    {
      heading: 'Forbehandlingsparametre',
      paragraphs: ['Forbehandling av bilder påført overlegg:'],
      bullets: [
        'lysstyrke: Justering -100 til 100 (standard: 0).',
        'kontrast: Justering -100 til 100 (standard: 0).',
        'gamma: Verdi 0.1 til 3 (standard: 1).',
        'metning: Justering -100 til 100 (standard: 0).',
        'nyanse: Hue rotasjon i grader.',
        'sløring: Blur i piksler.',
        'skjerpe: Skärpe mengde 0-100.',
        'plakat: Posterize nivåer.',
        'terskel: Binær terskel 0-255.',
        'kant: Edge deteksjon - off, sobel, canni.',
        'invert: Sett til 1 å invertere farger.',
      ],
    },
    {
      heading: 'Vannmerkeparametere',
      paragraphs: ['Legg vannmerker til genererte QR-koder:'],
      bullets: [
        'wmEn: Sett til 1 for å muliggjøre vannmerke.',
        'wm Type: Vannmerke type - tekst, bilde, mønster.',
        'wmText: Vannmerketekst (URL-kodet).',
        'wmImg: URL til vannmerkebilde.',
        'wmPos: Posisjon - sentrum, hjørner, kanter, bak, roe_zone.',
        'wmOpacity: Dekkevne 0-100 (standard: 50).',
        'wmBlend: Blandemodus - normal, multiplisere, skjerm, overlegg.',
      ],
    },
    {
      heading: 'Animasjonsparametere',
      paragraphs: ['For animert GIF-utgang (krever format=gif):'],
      bullets: [
        'anim Mønster: animasjonsmønster - ingen, puls, bølge, skanneline, skimmer, drift, color_syklus.',
        'anim Rammer: Antall rammer 1-60 (standard: 24).',
        'anim Hastighet: Rammeforsinkelse i millisekunder 10-1000 (standard: 100).',
        'anim Seed: Tilfeldig frø for animasjon.',
        'easing: Animation easing - lineær, easy_in, easy_out, easy_in_out, studse.',
      ],
    },
    {
      heading: 'Utgangsparametere',
      paragraphs: ['Utdataformatalternativer:'],
      bullets: [
        'kvalitet: WebP kvalitet 0-1 (standard: 0.9).',
        'webpQ: WebP-kvalitet 0-100 (standard: 90).',
        'gifColors: GIF palettstørrelse 2-256 (standard: 256).',
        'dpi: Utgangs-DPI for PNG (standard: 72).',
        'metaTitel, metaAuthor, metaCopy, meta Desc: PNG metadata felt.',
      ],
    },
    {
      heading: 'Eksempel Bruk',
      paragraphs: [
        'Grunnleggende QR-kode:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Stilt QR-kode med egendefinerte farger:',
        'https://anqr.link/api/qr?data=Hallo&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR-kode med overleggsbilde:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halvton&intensity=70',
        'Animert GIF:',
        'https://anqr.link/api/qr?data=Hallo&format=gif&animMønster=pulse&animFrames=24&easing=ease_in_out',
      ],
      links: [{ href: '/examples?lang=${lang}', label: 'Vis QR eksempler', type: 'example' }],
    },
    {
      heading: 'Innbygging QR Koder',
      paragraphs: [
        'I profesjonell modus genererer Share-funksjonen embeddable HTML og URLs. Her er hvordan innbygging fungerer:',
      ],
      bullets: [
        'Share Link: Oppretter en URL til ANQR-appen med alle innstillingene kodet som URL-parametre. Mottakere kan vise og endre QR-koden.',
        'Bygg inn bildet: Generererer en <img> tag som peker på server-API. QR-koden gjøres serversiden og fungerer som et bilde.',
        'Legg merke til: Oppretter Markdown-bildesyntaks for dokumentasjon og README-filer.',
        'Direkte API URL: Den rå API URL for bruk i programmer, skript eller andre integrasjoner.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#share',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
    {
      heading: 'HTML- eksempel',
      paragraphs: [
        'For å legge inn en QR-kode på nettsiden din:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="QR-kode" />',
        'For responsiv størrelse:',
        '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="QR-kode" style="max-bredde: 100%; høyde: auto;" >',
        'Server cache svar med lange cache overskrifter, så gjentatte forespørsler om samme URL er raskt.',
      ],
    },
    {
      heading: 'Del URL-format',
      paragraphs: [
        'Når du klikker på Del i profesjonell modus, koder ANQR dine gjeldende innstillinger til URL-parametre. Formatet er:',
        'https://anqr.link/?data=...&ec=H&style=rounded&....',
        'Disse parametrene speiler API-parametrene, slik at du kan konvertere en delt URL til en API-adresse ved å endre basisstien fra / til /api/qr og justere w/h-parametre etter behov.',
        'Merk: Overlegg bilder som lastes opp fra lokale filer kan ikke deles via URL - bare URL-baserte overlegg (img parameter) fungerer i delt lenker og API-samtaler.',
      ],
    },
    {
      heading: 'Prisgrenser og bruk',
      paragraphs: [
        'API er fritt å bruke for rimelige volumer. For bruk av høyvolum eller kommersielle applikasjoner som krever garantert oppetid, vennligst kontakt oss.',
        'API-svar inkluderer aggressive caching-hoder. For best ytelse, cache svar på slutten eller bruk samme URL konsekvent for identiske QR-koder.',
      ],
    },
    // Best Practices & Troubleshooting (sections 70+)
    {
      heading: 'Beste praksis',
      paragraphs: ['Følg disse retningslinjene for pålitelige QR-koder:'],
      bullets: [
        'Test alltid QR-kodene dine med flere skannerapper før du skriver ut.',
        'Bruk feilretting H (høy) når du legger til overlegg.',
        'Hold minst 4 moduler av rolig sone (margin).',
        'Sikre høy kontrast mellom forgrunn og bakgrunn.',
        'For utskrift, bruk minst 300 DPI og test i faktisk utskriftsstørrelse.',
        'Aktiver Bevar søkemønster når du bruker overlegg.',
        'Start med lavere overlegg intensitet og øke gradvis.',
        'For utendørs bruk, vurdere større modulstørrelser og høyere feilkorreksjon.',
      ],
      links: [
        { href: '/learn?lang=${lang}', label: 'Bla gjennom Lær artikler', type: 'learn' },
        { href: '/examples?lang=${lang}', label: 'Vis QR eksempler', type: 'example' },
      ],
    },
    {
      heading: 'Feilsøking',
      paragraphs: ['Vanlige problemer og løsninger:'],
      bullets: [
        'QR vil ikke skanne: Reduser overleggsintensitet, øke feilretting, sjekk kontrast.',
        'Kode for stor: Reduser innholdslengde, bruk URL-korter, lavere versjon.',
        'Sløringsutgang: Øk modulstørrelsen, bruk PNG i stedet for komprimerte formater.',
        'Farger ser feil ut: Sjekk fargekontrast, prøv gråtone overlegg modus.',
        'GIF ikke animere: Sørg for å bruke GIF-formatutgang, sjekk rammetelling.',
        'Overlegg på bildet som ikke lastes inn: Sjekk tillatelser for CORS på eksterne bilder.',
      ],
      links: [
        {
          href: '/learn?lang=${lang}#section-5',
          label: 'Se relaterte guider og eksempler',
          type: 'learn',
        },
      ],
    },
    {
      heading: 'Tastatursnarveier',
      paragraphs: [
        'ANQR støtter standard tastatursnarveier. Bruk Ctrl/Cmd+S til å utløse eksport (når fokusert på forhåndsvisningen).',
      ],
    },
    {
      heading: 'Deling og innbygging',
      paragraphs: [
        'Klikk Share-knappen i profesjonell modus for å kopiere en URL med gjeldende innstillinger. Mottakere kan åpne denne URL-en for å se nøyaktig konfigurasjon. Merk: Overlegg bilder fra lokale filer kan ikke deles via URL.',
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#share',
          label: 'Prøv denne konfigurasjonen direkte i ANQR-generatoren.',
          type: 'generator',
        },
      ],
    },
  ],
  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Bla gjennom Lær artikler', type: 'learn' },
    { href: '/examples?lang=${lang}', label: 'Vis QR eksempler', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Vis QR eksempler', type: 'gallery' },
    { href: '/?lang=${lang}', label: 'Åpne generatoren', type: 'generator' },
  ],
};

export default guide;
