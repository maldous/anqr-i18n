import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR brugervejledning',
  description: 'Komplet guide til brug af ANQR til at oprette QR-koder.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Kom godt i gang',
      paragraphs: ['ANQR er en QR-kodegenerator med en klientorienteret tilgang. Som standard genereres QR-koder lokalt i din browser – ingen konto kræves, og dine data forbliver private. Til professionel indlejring kan du også bruge server-side API\'en.', 'Grænsefladen har tre grænsefladeniveauer: Grundlæggende, Avanceret og Professionel. Vælg dit niveau ved hjælp af fanerne i overskriften. Hvert niveau låser op for yderligere funktioner, samtidig med at grænsefladen fokuserer på det, du har brug for.'],
      bullets: ['Grundlæggende: Simpel QR-kodeoprettelse med almindelig tekst/URL-indhold og billedoverlay.', 'Avanceret: QR-kodningsmuligheder, gengivelsesstile, animation, outputformater, udvidede indholdstyper og tilpasning af overlay.', 'Professionel: Vandmærker, metadata, deling, sikkerhedsanalyse, QR-koder til betaling og virksomhedsfunktioner.'],
    },
    {
      heading: 'Hurtigstart',
      paragraphs: ['Sådan opretter du din første QR-kode:'],
      bullets: ['1. Vælg en indholdstype (URL, tekst, WiFi osv.) fra rullemenuen Indholdstype.', '2. Indtast dine data i de angivne felter.', '3. Tilpas eventuelt farver og stilarter, og tilføj et overlaybillede.', '4. Klik på Eksporter for at downloade din QR-kode som PNG, GIF, WebP eller SVG.'],
    },
    {
      heading: 'Grundlæggende funktioner',
      paragraphs: ['Basic-niveauet giver en strømlinet brugerflade til at oprette QR-koder med payload-indhold og billedoverlejringer. Dette er den enkleste måde at komme i gang på.'],
    },
    {
      heading: 'Indholdstyper (grundlæggende)',
      paragraphs: ['Almindelig tekst: Indkod enhver tekst op til QR-koden. Ideel til korte beskeder, koder eller identifikatorer.', 'URL: Indkod webadresser. QR-koden åbner URL\'en, når den scannes. Understøtter protokollerne http:// og https://.'],
    },
    {
      heading: 'Billedoverlay (grundlæggende)',
      paragraphs: ['Upload et billede (JPG, PNG, GIF, WebP) for at blande det med din QR-kode. Grundlæggende overlay-funktioner inkluderer:'],
      bullets: ['Upload fra fil: Vælg et billede fra din enhed.', 'Indlæs fra URL: Indtast en billed-URL (skal tillade CORS).', 'Centerlogo: Placerer billedet i midten, afhængigt af fejlkorrektion.', 'Blanding: Simpel alfa-blanding af billede med QR-mønster.', 'Intensitet: Styrer, hvor kraftigt overlayet påvirker QR-koden (0-100%).', 'Farvetilstand: Fuld farve, gråtoner eller sort-hvid.', 'Bevar søgermønstre: Holder hjørnemønstre uændrede for pålidelig scanning.'],
    },
    {
      heading: 'Avancerede funktioner',
      paragraphs: ['Det avancerede niveau låser op for QR-kodningsmuligheder, gengivelsesstile, animation, outputformater, udvidede indholdstyper og avanceret tilpasning af overlay.'],
    },
    {
      heading: 'Indstillinger for QR-kodning',
      paragraphs: ['Version: QR-koder findes i version 1-40, hvor højere versioner indeholder flere data, men er større. Indstil til 0 (Auto) for at lade ANQR vælge den mindste version, der passer til dit indhold.', 'Fejlretning: Bestemmer, hvor meget skade en QR-kode kan pådrage sig, mens den stadig kan scannes.'],
      bullets: ['L (Lav): 7% fejlkorrektion - mindste størrelse, mindst redundans.', 'M (Mellem): 15% fejlkorrektion - afbalanceret mulighed.', 'Q (Kvartil): 25% fejlkorrektion - god til trykte koder.', 'H (Høj): 30% fejlkorrektion - bedst til koder med overlays eller under barske forhold.'],
    },
    {
      heading: 'Stillezone (Margin)',
      paragraphs: ['Den stille zone er det hvide område omkring QR-koden. Scannere har brug for denne margin for at kunne registrere, hvor koden starter. Standarden anbefaler mindst 4 moduler. Hvis antallet reduceres til under 4, kan det forårsage scanningsproblemer.'],
    },
    {
      heading: 'Modulstil',
      paragraphs: ['Moduler er de individuelle firkanter, der udgør en QR-kode. ANQR tilbyder fem stilarter:'],
      bullets: ['Firkant: Klassisk QR-udseende med skarpe hjørner.', 'Afrundet: Blødere hjørner for et mere venligt udseende.', 'Prikker: Cirkulære moduler til en moderne æstetik.', 'Diamant: 45° roterede firkanter for et karakteristisk mønster.', 'Forbundne: Moduler flettes sammen, når de støder op til hinanden, hvilket skaber organiske former.'],
    },
    {
      heading: 'Finder-mønsterstil',
      paragraphs: ['Findermønstre er de tre store firkanter i QR-hjørner, der hjælper scannere med at orientere koden. Tilgængelige stilarter:'],
      bullets: ['Firkantet: Standard firkantede hjørner.', 'Afrundet: Blødgjorte hjørner, der matcher den afrundede modulstil.', 'Cirkel: Cirkulære søgemønstre til priklignende koder.'],
    },
    {
      heading: 'Justerings- og timingmønstre',
      paragraphs: ['Justeringsmønstre vises i større QR-koder (version 2+) for at hjælpe med at korrigere forvrængning. Timingmønstre er de skiftende linjer, der forbinder søgermønstre.'],
      bullets: ['Justeringsstil: Matchfinder, Firkantet, Afrundet eller Cirkel.', 'Timingstil: Matchmodul, Heltrukket eller Stiplet.'],
    },
    {
      heading: 'Farver',
      paragraphs: ['Forgrund: Farven på QR-modulerne. Sort (#000000) er standard, men enhver mørk farve fungerer.', 'Baggrund: Baggrundsfarven. Hvid (#ffffff) er standard. Sørg for tilstrækkelig kontrast til forgrunden.', 'Gennemsigtig baggrund: Fjern baggrunden helt ved brug på farvede overflader. Sørg for, at overfladen giver tilstrækkelig kontrast.'],
    },
    {
      heading: 'Modulstørrelse og -afstand',
      paragraphs: ['Modulstørrelse: Styrer, hvor stort hvert modul gengives i pixels. Større værdier skaber større, lettere at scanne koder.', 'Modulmellemrum: Tilføjer mellemrum mellem moduler som en procentdel. Små mellemrum (5-15%) kan forbedre scanningsmuligheden under visse forhold, men for store mellemrum reducerer pålideligheden.'],
    },
    {
      heading: 'Outputindstillinger',
      paragraphs: ['Format: Vælg dit eksportformat baseret på brugsscenariet.'],
      bullets: ['PNG: Tabsfrit rasterformat, ideelt til de fleste formål. Bedst til tryk og digitalt.', 'WebP: Moderne format med mindre filstørrelser. God til webbrug.', 'GIF: Påkrævet til animerede QR-koder. Understøtter gennemsigtighed.', 'SVG: Vektorformat, der skalerer uendeligt. Bedst til stor skrift eller når du har brug for at redigere koden.'],
    },
    {
      heading: 'Outputdimensioner',
      paragraphs: ['Bredde/Højde: Indstil outputstørrelsen i pixels. Beregn ud fra DPI til udskrivning (f.eks. 300 DPI ved 1 tomme = 300px). Større størrelser scanner mere pålideligt på afstand.'],
    },
    {
      heading: 'Animationsindstillinger (Avanceret)',
      paragraphs: ['Styr animeret QR-kodeadfærd:'],
      bullets: ['Hastighed: Animations billedhastighed i millisekunder.', 'Loop: Kontinuerlig eller enkeltvis animation.', 'Bounce: Instruktion af bordtennisanimation.', 'Startbillede: Start animation fra et specifikt billede.', 'Maksimalt antal billeder: Begræns det samlede antal billeder i animationen.', 'Billedtrin: Spring billeder over for hurtigere animation.', 'Interpolation: Ingen, Crossfade eller Morph mellem billeder.'],
    },
    {
      heading: 'Indholdstyper (Avanceret)',
      paragraphs: ['Avanceret niveau låser op for yderligere nyttelastformater:'],
      bullets: [
        'Telefonnummer (tlf:): Opretter et telefonnummer, der kan ringes til.',
        'E-mail (mailto:): Åbner e-mailklient med valgfrit emne og brødtekst.',
        'SMS: Forudfyldt tekstbesked til et telefonnummer.',
        'vCard: Fuld kontaktkort med navn, organisation, telefon, e-mail, adresse.',
        'MeCard: Kompakt kontaktformat populært i Japan.',
        'BizCard: Ældre visitkortformat.',
        'Geografisk placering: GPS-koordinater, der åbnes i kort.',
        'WiFi: Netværksoplysninger til automatisk forbindelse (SSID, adgangskode, sikkerhedstype).',
        'Kalenderbegivenhed: iCalendar-format med titel, placering, dato/klokkeslæt.',
        'Tilmelding til arrangement: Link til tilmeldingsside for arrangement.',
        'Kalenderabonnement: Abonner på et ICS/WebCal-feed.',
        'Fil-/dokument-URL: Direkte link til filer, der kan downloades.',
        'Link til cloudlagring: Links til Google Drive, Dropbox, OneDrive osv.',
        'Social profil: Links til LinkedIn, Twitter, Instagram osv.',
        'Beskedlink: Dybe links til WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'Avancerede overlay-funktioner',
      paragraphs: ['Yderligere overlay-funktioner:'],
      bullets: ['Beskær: Aktiver beskæring for at vælge et firkantet område af dit billede.', 'Halvtone: Klassisk prikmønster i printstil baseret på billedets lysstyrke.', 'Dithered: Fejldiffusionsdithering for detaljeret gengivelse.'],
    },
    {
      heading: 'Overlay-blandingstilstande (Avanceret)',
      paragraphs: ['Yderligere blandingstilstande på avanceret niveau:'],
      bullets: ['Subpixel: Opdeler hvert modul i subpixels for at opnå højere detaljer.', 'Blå støj: Bruger blå støj-dithering til artefaktfri mønstre.', 'Mosaik: Flisebaseret effekt, der bevarer billedstrukturen.', 'Udfyldning af mellemrum: Placerer billede i mellemrummene mellem moduler.', 'Lysstyrke: Varierer modulstørrelsen baseret på billedets lysstyrke.', 'Duotone: Omdanner billedet til to farver for at opnå en slående kontrast.'],
    },
    {
      heading: 'Overlay-intensitet',
      paragraphs: ['Styrer, hvor kraftigt overlayet påvirker QR-koden (0-100%). Højere værdier viser flere billeddetaljer, men kan reducere scanningsmuligheden. Start omkring 70% og juster baseret på test.'],
    },
    {
      heading: 'Farvetilstand',
      paragraphs: ['Sådan behandles overlaybilledet:'],
      bullets: ['Fuld farve: Bevarer originale billedfarver.', 'Gråtone: Konverterer til sorte og hvide toner.', 'Sort-hvid: Konvertering af binær billedformat med høj kontrast.'],
    },
    {
      heading: 'Bevar søgermønstre',
      paragraphs: ['Når aktiveret, forbliver de tre hjørnesøgermønstre uændrede af overlayet. Anbefales kraftigt for pålidelig scanning.'],
    },
    {
      heading: 'Billedforbehandling',
      paragraphs: ['Anvend filtre på dit overlaybillede, før du blander det. Disse justeringer kan forbedre, hvordan billedet vises i den endelige QR-kode.'],
      bullets: ['Lysstyrke (-100 til +100): Gør billedet lysere eller mørkere.', 'Kontrast (-100 til +100): Øg eller reducer toneområdet.', 'Gamma (0,2 til 3,0): Ikke-lineær lysstyrkejustering. Værdier under 1 lysner mellemtoner, over 1 mørkner dem.', 'Mætning (-100 til +100): Farveintensitet. -100 er gråtoner, +100 er overmætning.', 'Rotér farvetone (0-360°): Flyt alle farver rundt på farvehjulet.', 'Sløring (0-20px): Gør billeddetaljer blødere.', 'Skærp (0-100%): Forbedr kanter og detaljer.', 'Posterisering (0-16 niveauer): Reducer farveniveauer for at få en plakateffekt.', 'Tærskelværdi (0-255): Konverter til binær sort/hvid ved grænseværdien.', 'Kantdetektion: Sobel- eller Canny-algoritmer til kun at vise kanter.', 'Invertér: Vend alle farver om.'],
    },
    {
      heading: 'Tilpasningstilstand',
      paragraphs: ['Hvordan overlay-billedet passer til QR-kodeområdet:'],
      bullets: ['Forside: Billedet udfylder hele området, beskæres om nødvendigt.', 'Indeholder: Hele billedet er synligt, kan have margener.', 'Stræk: Billedet forvrænges for at udfylde præcist.'],
    },
    {
      heading: 'Transformationsmuligheder',
      paragraphs: ['Rotation: Roter overlay i intervaller af 90°.', 'Vend X/Y: Spejlvend billedet vandret eller lodret.'],
    },
    {
      heading: 'Dithering-algoritmer',
      paragraphs: ['Dithering konverterer billeder med kontinuerlig tone til mønstre, som QR-koder kan repræsentere. Tilgængelig, når blandingstilstandene Dithered, Blue Noise eller True Dither bruges.'],
      bullets: [
        'Fejldiffusion: Klassisk Floyd-Steinberg-stil. Spreder kvantiseringsfejl til nærliggende pixels.',
        'Orderet (Bayer): Bruger en tærskelmatrix til regelmæssige mønstre.',
        'Klyngepunkt: Simulerer rasterudskrivning.',
        'Void & Cluster: Optimeret ordnet dithering.',
        'Blå støj: Visuelt behageligt tilfældigt udseende mønster.',
        'Blå støjtærskel: Tærskel-dithering med blå støjtekstur.',
        'Hvid støj: Tilfældig tærskelvariation.',
        'Gaussisk/Triangulær støj: Støj med forskellige fordelinger.',
        'Blå støj + fejldiffusion: Hybrid kombination af begge teknikker.',
        'Skærmet blå støj: Skærmlignende blå støjmønster.',
        'Perceptuel: Luminansvægtet for bedre visuelle resultater.',
        'Kantbevidst: Bevarer billedkanter under dithering.',
        'Adaptiv tærskelværdi: Lokalt adaptiv tærskelværdi.',
        'Temporal blå støj: For animerede GIF\'er varierer mønsteret pr. billede.',
      ],
    },
    {
      heading: 'Diffusionskerner',
      paragraphs: ['Når du bruger Error Diffusion dithering, skal du vælge, hvordan fejlen fordeles:'],
      bullets: ['Floyd-Steinberg: Klassisk 4-nabo-diffusion. Godt generelt valg.', 'Jarvis-Judice-Ninke: 12-nabo, mere jævn men langsommere.', 'Stucki: Ligner JJN med forskellige vægte.', 'Burkes: Forenklet JJN, hurtigere.', 'Sierra: Familie af kerner, der balancerer kvalitet og hastighed.', 'Atkinson: Lysdiffusion, bevarer detaljer, men kan være kornet.'],
    },
    {
      heading: 'Ditherstyrke',
      paragraphs: ['Styrer, hvor meget dithering der anvendes (0-100%). Lavere værdier bevarer mere af det oprindelige mønster, højere værdier viser flere billeddetaljer.'],
    },
    {
      heading: 'Indstillinger for underpixel',
      paragraphs: ['Når du bruger Subpixel-blandingstilstand:'],
      bullets: ['Gitterstørrelse: 2×2, 3×3 eller 4×4 underpixels pr. modul. Højere = flere detaljer.', 'Centerregel: Streng kræver, at centerunderpixel matcher modulet. Halvtonecenter tillader variation.', 'Neutral farve: Farve brugt til ubestemte underpixels.', 'Finder Override: Hvordan findermønstre gengives (Ensfarvet eller Stiliseret).'],
    },
    {
      heading: 'Rasterindstillinger',
      paragraphs: ['Når du bruger blandingstilstanden Halvtone:'],
      bullets: ['Cellestørrelse: Pr. modul eller N×N gitter.', 'Prikform: Cirkel, firkant eller linje.', 'Lysstyrkekurve: Lineær, S-kurve eller Gamma.'],
    },
    {
      heading: 'Duotone farver',
      paragraphs: ['Når du bruger blandingstilstanden Duotone, skal du indstille skyggefarven (mørke områder) og fremhævningsfarven (lyse områder).'],
    },
    {
      heading: 'Indstillinger for GIF-animation',
      paragraphs: ['Når du bruger animerede GIF-overlays:'],
      bullets: ['Brug billedforsinkelser: Respekter den oprindelige GIF-timing.', 'Maks. FPS: Begræns billedhastighed (1-60 fps).', 'Håndtering af bortskaffelse: Respekter eller forenkl metoder til bortskaffelse af rammer.'],
    },
    {
      heading: 'Avancerede gengivelsesindstillinger',
      paragraphs: ['Yderligere gengivelseskontroller:'],
      bullets: ['Gap-tilstand: Ingen, Indsæt, Streg eller Negativ afstand mellemrumsstyling.', 'Hjørneradius: Procentdel af afrundede hjørner for moduler.', 'Gradient: Ingen, lineær, radial eller konisk gradient på moduler.', 'Ydre/indre øjestil: Uafhængig styling til findermønsterringe.', 'Prikrotation: Roter diamant-/prikmoduler.', 'Øjenskala: Størrelsesjustering for søgermønstre.', 'Rammestil: Tilføj dekorative rammer (Afrundet ramme, Klistermærke, Etiket).', 'Rammetekst: Tilføj tekst som Scan mig! til rammer.'],
    },
    {
      heading: 'Avanceret QR-kodning',
      paragraphs: ['Finjuster QR-kodning:'],
      bullets: ['Kodningstilstand: Auto, Numerisk, Alfanumerisk, Byte/UTF-8 eller Kanji.', 'Håndhæv min. stillezone: Sørg for mindst 4 modulers margen.'],
    },
    {
      heading: 'Avancerede outputindstillinger',
      paragraphs: ['Yderligere eksportindstillinger:'],
      bullets: ['Filnavn: Brugerdefineret filnavn til downloads.', 'GIF-paletstørrelse: 2-256 farver i GIF-output.', 'GIF-kvantisering: Median Cut, NeuQuant eller Octree-farvereduktion.', 'GIF-dithering: Fra, Floyd-Steinberg eller Ordnet.', 'GIF Transparent farve: Indstil en farve til at være transparent.', 'SVG True Vector: Brug stier i stedet for integreret raster.', 'SVG-formpræcision: Pixel- eller præcis stigengivelse.', 'SVG-indlejring af rasteroverlay: Inkluder overlay som indlejret billede.', 'Baggrundstilsidesættelse: Tving en specifik baggrundsfarve i outputtet.'],
    },
    {
      heading: 'Valideringsmuligheder',
      paragraphs: ['Indstillinger for inputbehandling:'],
      bullets: ['Valider input: Kontroller indholdsformat før kodning.', 'Fjern mellemrum: Fjern foranstillede/efterfølgende mellemrum.', 'Normaliser linjeskift: Konverter alle linjeafslutninger til LF.', 'Max Length Guard: Advar hvis indhold overstiger QR-kapaciteten.'],
    },
    {
      heading: 'Professionelle funktioner',
      paragraphs: ['Det professionelle niveau tilføjer vandmærker, metadata, delingsmuligheder, sikkerhedsanalyse, QR-koder til betaling og virksomhedsfunktioner.'],
    },
    {
      heading: 'Vandmærke',
      paragraphs: ['Tilføj vandmærker til dine QR-koder:'],
      bullets: ['Type: Tekst-, billede- eller mønstervandmærke.', 'Position: Center, Hjørner, Kanter, Bagved eller Stillezone.', 'Opacitet: Vandmærkets gennemsigtighed (0-100%).', 'Blandingstilstand: Normal, Multiplikation, Skærm eller Overlay-blanding.'],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Integrer metadata i eksporterede filer:'],
      bullets: ['Felter for titel, forfatter, ophavsret, licens og beskrivelse.', 'Oprettelsestidspunkt: Integrer genereringstidsstempel.', 'Brugerdefineret nøgleværdi: Tilføj vilkårlige metadatapar.'],
    },
    {
      heading: 'Deling',
      paragraphs: ['Del dine QR-kodekonfigurationer:'],
      bullets: ['Direkte link: Generer en delbar URL med dine nuværende indstillinger.', 'Integrer HTML: Hent integreret kode til websteder.', 'Kodningsparametre: Inkluder alle indstillinger i delings-URL\'en.', 'Bemærk: Overlay-billeder fra lokale filer kan ikke deles via URL.'],
    },
    {
      heading: 'Sikkerhedsanalyse',
      paragraphs: ['Sørg for, at QR-koder stadig kan scannes:'],
      bullets: ['Sikkerhedstilstand: Fra, Balanceret eller Strenge scanningskrav.', 'Min. modulstørrelse: Minimum pixelstørrelse pr. modul.', 'Min. stillezone: Minimumsmarginmoduler.', 'Låsesøgere/Timing/Justering/Format/Version: Beskyt specifikke elementer.', 'Maksimal overlayintensitet via ECC: Automatiske intensitetsgrænser baseret på fejlkorrektionsniveau.'],
    },
    {
      heading: 'Indholdstyper (Professionelle)',
      paragraphs: ['Professionelt niveau tilføjer betalings- og virksomhedsindholdstyper:'],
      bullets: ['EPC/SEPA (EU): Europæiske bankoverførslers QR-koder med IBAN, BIC, beløb, reference.', 'UPI (Indien): Ensartet betalingsgrænseflade med VPA, modtagernavn, beløb.', 'PayNow (Singapore): Hurtig betaling i Singapore med UEN eller mobilnummer.', 'PromptPay (Thailand): Thailandsk nationalt betalingssystem.', 'PIX (Brasilien): Brasiliansk øjeblikkelig betaling med PIX-nøgle.', 'Krypto: Bitcoin, Ethereum, Litecoin betalingsadresser med valgfrit beløb.', 'Link til marketingkampagne: URL\'er med fuld UTM-parametersporing (marketingtags).', 'Kort link: Til brug med URL-forkortere til dynamiske/sporbare QR-koder.', 'GS1 Digital Link: Produktidentifikation med GTIN, serienummer, batchnummer, udløbsdato.', 'App Deep Link: Dybe links til iOS/Android-apps med brugerdefinerede ordninger.', 'Brugerdefineret format: Rådata uden formatering eller validering.'],
    },
    {
      heading: 'Sprogrelevante betalinger i avanceret tilstand',
      paragraphs: ['Når du bruger avanceret tilstand, viser ANQR automatisk betalingsmetoder, der er relevante for dit valgte sprog. For eksempel ser vietnamesiske brugere VietQR, thailandske brugere ser PromptPay, og indisktalende brugere ser UPI og BharatQR. Globale betalingsmetoder (kryptovaluta, PayPal, Cash App) er tilgængelige for alle sprog. Professionel tilstand låser op for alle betalingsstandarder uanset sprog.'],
    },
    {
      heading: 'Europæiske betalingsstandarder',
      bullets: ['EPC/SEPA (EU): Europæiske bankoverførsels-QR-koder, der følger EPC QR-kodestandarden. Understøtter IBAN, BIC (valgfrit for indenlandske betalinger), beløb i EUR og strukturerede eller ustrukturerede betalingsreferencer. Bruges i hele SEPA-zonen, inklusive EU-lande plus Schweiz, Norge, Island, Liechtenstein, Monaco og San Marino.', 'Schweizisk QR-faktura: Schweizisk betalingsstandard i henhold til SIX Implementation Guidelines. Understøtter CHF og EUR, QR-reference (QRR), kreditorreference (ISO 11649), strukturerede kreditor-/debitoradresser og fakturaoplysninger. Påkrævet for schweiziske fakturaer siden 2022.'],
    },
    {
      heading: 'Indiske betalingsstandarder',
      bullets: ['UPI (Indien): Unified Payments Interface følger NPCI Deep Linking Specification. Understøtter VPA (Virtual Payment Address), modtagernavn, beløb i INR, transaktionsnota, reference-ID, forhandlerkategorikode og transaktionstilstand.', 'BharatQR (Indien): Ensartet QR-standard, der understøtter både UPI- og kortbaserede betalinger. Kombinerer UPI VPA med kort-PAN for maksimal kompatibilitet. Inkluderer forhandlernavn, by, MCC, GST-oplysninger og faktura-/referencenumre.'],
    },
    {
      heading: 'Sydøstasiatiske betalingsstandarder',
      bullets: ['PayNow (Singapore): Singapores hurtigbetalingssystem, der bruger EMVCo QR-specifikation med SGQR-profil. Understøtter UEN (virksomhedsregistrering), mobilnummer eller NRIC som proxy-identifikatorer. Inkluderer flag for redigering af beløb og udløbsdato.', 'PromptPay (Thailand): Thailandsk nationalt betalingssystem, der følger Bank of Thailands EMV-profil. Understøtter mobilnummer, nationalt ID, skatte-ID, e-wallet-ID og regningsbetaling med flere referencefelter.', 'QRIS (Indonesien): Indonesisk standard for hurtig responskode. EMV-baseret national betalingsstandard, der understøtter handels-ID, NMID (nationalt handels-ID), klassificering af handelskriterier og gebyrer (faste eller procentvise).', 'DuitNow (Malaysia): Malaysisk system til øjeblikkelige betalinger. Understøtter flere proxytyper, herunder NRIC, mobil, pas, militær-ID og virksomhedsregistreringsnumre.', 'VietQR (Vietnam): Vietnamesisk standard for interbankoverførsler. Kræver bankens BIN (NAPAS-identifikation) og kontonummer. Understøtter flere servicekoder til forskellige overførselstyper (QRPUSH, QRIBFTTA, QRIBFTTC).', 'QR Ph (Filippinerne): Filippinsk QR-betalingsstandard for InstaPay og PESONet. Bruger kontonumre med forhandleridentifikation til P2M-transaktioner (person-til-forhandler).'],
    },
    {
      heading: 'Østasiatiske betalingsstandarder',
      bullets: ['TWQR (Taiwan): Taiwansk QR-betalingsstandard. Understøtter forhandler-ID, skatte-ID og TWD-beløb.', 'HKQR/FPS (Hong Kong): QR-koder til Hong Kongs hurtigere betalingssystem. Understøtter FPS-ID, mobilnummer eller e-mail som betalingsidentifikatorer. Beløb i HKD.', 'JPQR (Japan): Japansk samlet QR-kodebetalingsstandard. Bruger butiks-ID til identifikation af forhandlere med JPY-beløb.'],
    },
    {
      heading: 'Andre regionale betalingsstandarder',
      bullets: ['PIX (Brasilien): Brasiliansk centralbanks system til øjeblikkelige betalinger, der følger BR-kodespecifikationen. Understøtter PIX-nøgler (CPF, CNPJ, e-mail, telefon eller tilfældig nøgle), forhandlernavn/by, transaktions-ID og BRL-beløb.', 'AusPayNet/NPP PayID (Australien): Ny australsk betalingsplatform, PayID-system. Understøtter PayID-typer (e-mail, mobil, ABN, organisations-ID) eller traditionel BSB + kontonummer. Forhandlernavn er valgfrit, da betalere ser det registrerede navn fra NPP-opslag.'],
    },
    {
      heading: 'Kryptovalutabetalinger',
      bullets: ['Bitcoin/Litecoin (BIP-21): Standard kryptovalutabetalings-URI\'er med tegnebogsadresse, valgfrit beløb og etiket. Kompatibel med alle større Bitcoin- og Litecoin-tegnebøger.', 'Lightning Network (BOLT11): Lightning Network-betalingsfakturaer. Indsæt en BOLT11-kodet fakturastreng for øjeblikkelige Bitcoin-betalinger med minimale gebyrer.', 'Ethereum (EIP-681): Ethereum-transaktionsanmodnings-URI\'er, der understøtter native ETH-overførsler og ERC-20-tokenoverførsler. Inkluderer kæde-ID til multinetværkssupport (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gasparametre og kontraktfunktionskald.'],
    },
    {
      heading: 'Betalingslinktjenester',
      bullets: ['PayPal.Me: PayPal-betalingslink med brugernavn og valgfrit forudfyldt beløb. Modtagere kan betale via PayPal-saldo, kort eller bankkonti.', 'Cash App: Betalingslinks til Cash App ved hjælp af $cashtag med valgfrit beløb. Populær i USA til peer-to-peer-betalinger.'],
    },
    {
      heading: 'Generisk EMV QR',
      bullets: ['EMV Generisk: Opret brugerdefinerede EMV-QR-koder i Merchant-Presented Mode til betalingsordninger, der ikke specifikt er angivet. Konfigurer forhandlernavn, by, landekode (ISO 3166-1), valutakode (ISO 4217 numerisk), MCC, muligheder for drikkepenge/gebyrer og yderligere datafelter. Nyttig til test eller brugerdefinerede integrationer.'],
    },
    {
      heading: 'Overlay-blandingstilstande (professionel)',
      paragraphs: ['Yderligere blandingstilstande på professionelt niveau:'],
      bullets: ['Pixeleret: Pixeleret overlay-effekt.', 'Omrids: Kantdetekteringsoverlay, der kun viser konturer.', 'Bølge: Bølget forvrængningseffekt.', 'Subpixelstørrelse: Variabel subpixelstørrelse baseret på billedet.', 'Ægte dither: Avanceret dithering med ordnet matrixvalg.', 'Ekstrem: Maksimal billedsynlighed, kan påvirke scanningsmuligheden.'],
    },
    {
      heading: 'Beskyttelsesindstillinger',
      paragraphs: ['Finkornet kontrol over hvilke QR-elementer der er beskyttet mod overlay-ændringer:'],
      bullets: ['Bevar timing: Hold timingmønstre uændrede.', 'Bevar justering: Hold justeringsmønstre uændrede.', 'Beskyt formatinfo: Beskyt formatinformationsmoduler.', 'Protect Version Info: Informationsmoduler til Shield-version.'],
    },
    {
      heading: 'ECC-bevidst tilstand',
      paragraphs: ['Fordeler intelligent overlayintensitet baseret på fejlkorrektionskapacitet. Systemet analyserer, hvilke moduler der kan ændres, samtidig med at scanningsmuligheden opretholdes.'],
      bullets: ['Risikobudget: Procentdel af fejlkorrektionskapacitet, der skal anvendes (0-100%).', 'Højere budget = mere synligt overlay, men mere risikabelt scanningsmulighed.', 'Lavere budget = sikrere scanning, men mindre synligt overlay.'],
    },
    {
      heading: 'Professionelle gengivelsesmuligheder',
      paragraphs: ['Avancerede gengivelseskontroller:'],
      bullets: ['Skarpe kanter: Brug pixeleret billedgengivelse til skarpe modulkanter.', 'Pixel Snap: Pixeljustering af gulv, rund eller loft.', 'Farvetilstand pr. modul: Helfarve, Efter lysstyrke, Efter position, Efter overlejring, Efter klynge.', 'Farvepalet: Definer brugerdefineret farvepalet til farvelægning pr. modul.', 'Kontrastbeskyttelse: Sørg for et minimalt kontrastforhold mellem farverne.', 'Minimumskontrastforhold: Kontrastkrav i WCAG-stil (1:1 til 21:1).', 'Ekstra grænsemoduler: Yderligere grænse ud over stillezonen.'],
    },
    {
      heading: 'Professionelle outputmuligheder',
      paragraphs: ['Indstillinger for virksomhedseksport:'],
      bullets: ['DPI: Indstil udskriftsopløsning (72-600 DPI). 300 DPI anbefales til udskrivning.', 'Inkluder stillezone: Slå stillezone til/fra i outputdimensioner.', 'Eksporter som yderligere: Generer PDF sammen med det primære format.'],
    },
    {
      heading: 'Animationsindstillinger (Professionelle)',
      paragraphs: ['Yderligere professionelle animationsfunktioner:'],
      bullets: ['Temporal dither: Fra, Blå støj eller Flicker Safe dithering pr. frame.', 'Mønster: Ingen, Puls, Bølge, Scanlinje, Shimmer eller Drift-effekter.'],
    },
    {
      heading: 'API-reference',
      paragraphs: ['ANQR leverer en server-side API til generering af QR-koder via URL-parametre. Dette er ideelt til at integrere QR-koder i websteder, e-mails, dokumenter eller automatiserede arbejdsgange uden JavaScript på klientsiden.', 'Basis-URL: https://anqr.link/api/qr'],
    },
    {
      heading: 'Grundlæggende parametre',
      paragraphs: ['Påkrævede og almindelige parametre (parameternavne oversættes ikke):'],
      bullets: ['data (påkrævet): Indholdet, der skal kodes i QR-koden. URL-kod specialtegn.', 'størrelse: Billedstørrelse i pixels (standard: 400, maks: 2000). Bruges hvis w/h ikke er angivet.', 'b, h: Outputbredde og -højde i pixels. Tilsidesætter størrelsesparameteren.', 'format: Outputformat — png, webp eller gif (standard: png).', 'ec: Fejlkorrektionsniveau — L, M, Q eller H (standard: H).', 'fg: Forgrundsfarve som hex uden # (standard: 000000).', 'bg: Baggrundsfarve som hex uden # (standard: ffffff).', 'gennemsigtig: Indstil til 1 for gennemsigtig baggrund.', 'margin: Stillezone i moduler (standard: 4).'],
    },
    {
      heading: 'Stilparametre',
      paragraphs: ['Modul- og mønsterstyling:'],
      bullets: ['stil: Modulstil — firkantet, afrundet, prikker, diamant, forbundet.', 'finder: Finder-mønsterstil — firkantet, afrundet, cirkel.', 'align: Justeringsmønsterstil — match_finder, firkant, afrundet, cirkel.', 'timing: Timingmønsterstil — match_module, solid, stiplet.', 'radius: Hjørneradius i procent 0-100.', 'mellemrum: Modulmellemrum i procent 0-50.', 'gapMode: Gap-tilstand — ingen, indsat, streg, negativt_mellemrum.', 'øjeYdre, øjeIndre: Øjestile — firkantet, afrundet, cirkel.', 'eyeScale: Øjenskalaprocent (standard: 100).', 'grad: Gradienttype — ingen, lineær, radial, konisk.', 'gradAngle: Gradientvinkel for lineære gradienter.', 'gradStops: Gradientstop som color1,pos1,color2,pos2,… (f.eks. ff0000,0,0000ff,1).'],
    },
    {
      heading: 'Overlay-parametre',
      paragraphs: ['Indstillinger for billedoverlay (overlaybillede hentes på serversiden):'],
      bullets: ['img: URL til overlejring af billede (skal være offentligt tilgængelig).', 'tilstand: Overlay-tilstand — center, halvtone, blanding, lysstyrke, mosaik, dithered, blå støj, subpixel.', 'intensitet: Overlay-intensitet 0-100 (standard: 100).', 'colorMode: Overlay-farvetilstand — farve, gråtoner, sort/hvid.', 'pasform: Hvordan overlay passer — dækker, indeholder, strækker sig.', 'rot: Overlejringsrotation i grader.', 'flipX, flipY: Indstil til 1 for at vende overlay.', 'keepFinders: Bevar søgemønstre (standard: 1).', 'keepTiming, keepAlign: Indstil til 1 for at bevare timing-/justeringsmønstre.'],
    },
    {
      heading: 'Forbehandlingsparametre',
      paragraphs: ['Billedforbehandling anvendt på overlay:'],
      bullets: ['lysstyrke: Justering -100 til 100 (standard: 0).', 'kontrast: Justering -100 til 100 (standard: 0).', 'gamma: Værdi 0,1 til 3 (standard: 1).', 'mætning: Justering -100 til 100 (standard: 0).', 'farvetone: Farverotation i grader.', 'sløring: Sløring i pixels.', 'skærp: Skærpningsmængde 0-100.', 'posterize: Posterize-niveauer.', 'tærskelværdi: Binær tærskelværdi 0-255.', 'kant: Kantdetektion — fra, åben, snedig.', 'invertér: Indstil til 1 for at invertere farver.'],
    },
    {
      heading: 'Vandmærkeparametre',
      paragraphs: ['Tilføj vandmærker til genererede QR-koder:'],
      bullets: ['wmEn: Indstil til 1 for at aktivere vandmærke.', 'wmKind: Vandmærketype — tekst, billede, mønster.', 'wmText: Vandmærketekst (URL-kodet).', 'wmImg: URL til vandmærkebillede.', 'wmPos: Position — center, hjørner, kanter, bagved, stillezone.', 'wmOpacitet: Opacitet 0-100 (standard: 50).', 'wmBlend: Blandingstilstand — normal, multiplicer, skærm, overlay.'],
    },
    {
      heading: 'Animationsparametre',
      paragraphs: ['Til animeret GIF-output (kræver format=gif):'],
      bullets: ['animPattern: Animationsmønster — ingen, puls, bølge, scanningslinje, shimmer, drift, farvecyklus.', 'animFrames: Antal billeder 1-60 (standard: 24).', 'animSpeed: Billedforsinkelse i millisekunder 10-1000 (standard: 100).', 'animSeed: Tilfældigt frø til animation.', 'lettelse: Animationslettelse — lineær, lettelse_ind, lettelse_ud, lettelse_ind_ud, bounce.'],
    },
    {
      heading: 'Outputparametre',
      paragraphs: ['Indstillinger for outputformat:'],
      bullets: ['kvalitet: WebP-kvalitet 0-1 (standard: 0,9).', 'webpQ: WebP-kvalitet 0-100 (standard: 90).', 'gifColors: GIF-paletstørrelse 2-256 (standard: 256).', 'dpi: Output-DPI for PNG (standard: 72).', 'metaTitel, metaForfatter, metaKopi, metaBeskrivelse: PNG-metadatafelter.'],
    },
    {
      heading: 'Eksempel på brug',
      paragraphs: ['Grundlæggende QR-kode:', 'https://anqr.link/api/qr?data=https://example.com', 'QR-kode med brugerdefinerede farver:', 'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30', 'QR-kode med overlaybillede:', 'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70', 'Animeret GIF:', 'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out'],
    },
    {
      heading: 'Integrering af QR-koder',
      paragraphs: ['I professionel tilstand genererer delingsfunktionen integreret HTML og URL\'er. Sådan fungerer integrerelse:'],
      bullets: ['Del link: Opretter en URL til ANQR-appen med alle dine indstillinger kodet som URL-parametre. Modtagere kan se og ændre QR-koden.', 'Integrer billede: Genererer et tag, der peger på server-API\'en. QR-koden gengives på serversiden og serveres som et billede.', 'Integrer Markdown: Opretter Markdown-billedsyntaks til dokumentation og README-filer.', 'Direkte API-URL: Den rå API-URL til brug i applikationer, scripts eller andre integrationer.'],
    },
    {
      heading: 'HTML-eksempel',
      paragraphs: ['Sådan integrerer du en QR-kode på din hjemmeside:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-kode />', 'For responsiv størrelsesjustering:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-kode style=maks. bredde: 100%; højde: auto; />', 'Serveren cacher svar med lange cache-headere, så gentagne anmodninger om den samme URL er hurtige.'],
    },
    {
      heading: 'Del URL-format',
      paragraphs: ['Når du klikker på Del i professionel tilstand, koder ANQR dine nuværende indstillinger til URL-parametre. Formatet er:', 'https://anqr.link/?data=…&ec=H&style=rounded&….', 'Disse parametre afspejler API-parametrene, så du kan konvertere en delings-URL til en API-URL ved at ændre basisstien fra / til /api/qr og justere w/h-parametrene efter behov.', 'Bemærk: Overlay-billeder, der er uploadet fra lokale filer, kan ikke deles via URL – kun URL-baserede overlays (img-parameter) fungerer i delte links og API-kald.'],
    },
    {
      heading: 'Satsgrænser og brug',
      paragraphs: ['API\'en er gratis at bruge ved rimelige mængder. Ved brug i store mængder eller kommercielle applikationer, der kræver garanteret oppetid, bedes du kontakte os.', 'API-svar inkluderer aggressive cache-headere. For den bedste ydeevne, cache-svar fra din side eller brug den samme URL konsekvent for identiske QR-koder.'],
    },
    {
      heading: 'Bedste praksis',
      paragraphs: ['Følg disse retningslinjer for pålidelige QR-koder:'],
      bullets: ['Test altid dine QR-koder med flere scanner-apps, før du udskriver.', 'Brug fejlkorrektion H (Høj), når du tilføjer overlejringer.', 'Hold mindst 4 moduler stillezone (margin).', 'Sørg for høj kontrast mellem forgrund og baggrund.', 'Brug mindst 300 DPI til udskrift, og test i den faktiske udskriftsstørrelse.', 'Aktivér Bevar Findermønstre ved brug af overlejringer.', 'Start med lavere overlayintensitet og øg gradvist.', 'Til udendørs brug bør du overveje større modulstørrelser og højere fejlkorrektion.'],
    },
    {
      heading: 'Fejlfinding',
      paragraphs: ['Almindelige problemer og løsninger:'],
      bullets: ['QR scanner ikke: Reducer overlay-intensiteten, øg fejlkorrektionen, kontroller kontrasten.', 'Kode for stor: Reducer indholdslængden, brug URL-forkorter, lav version.', 'Sløret output: Øg modulstørrelsen, brug PNG i stedet for komprimerede formater.', 'Farverne ser forkerte ud: Kontroller farvekontrasten, prøv gråtoneoverlejringstilstand.', 'GIF animeres ikke: Sørg for at bruge GIF-formatoutput, kontroller antallet af billeder.', 'Billedoverlay indlæses ikke: Kontroller CORS-tilladelser på eksterne billeder.'],
    },
    {
      heading: 'Tastaturgenveje',
      paragraphs: ['ANQR understøtter standard tastaturgenveje. Brug Ctrl/Cmd+S for at udløse eksport (når fokus er på forhåndsvisningen).'],
    },
    {
      heading: 'Deling og indlejring',
      paragraphs: ['I professionel tilstand skal du klikke på knappen Del for at kopiere en URL med dine nuværende indstillinger. Modtagere kan åbne denne URL for at se din nøjagtige konfiguration. Bemærk: Overlay-billeder fra lokale filer kan ikke deles via URL.'],
    },
  ],
};

export default docs;
