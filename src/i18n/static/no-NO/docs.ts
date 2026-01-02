import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: '«ANQR brukerhåndbok»',
  description: '«Komplett guide til bruk av ANQR for å lage QR-koder.»',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '«Kom i gang»',
      paragraphs: [
        '«ANQR er en QR-kodegenerator med en klientfokusert tilnærming. Som standard genereres QR-koder lokalt i nettleseren din – ingen konto kreves, og dataene dine forblir private. For profesjonell innebygging kan du også bruke server-side API-et.»',
        '«Grensesnittet har tre grensesnittnivåer: Grunnleggende, Avansert og Profesjonell. Velg nivå ved hjelp av fanene i overskriften. Hvert nivå låser opp tilleggsfunksjoner samtidig som grensesnittet holdes fokusert på det du trenger.»',
      ],
      bullets: [
        '«Grunnleggende: Enkel QR-kodeoppretting med ren tekst/URL-innhold og bildeoverlegg.»',
        '«Avansert: QR-kodingsalternativer, gjengivelsesstiler, animasjon, utdataformater, utvidede innholdstyper og tilpasning av overlegg.»',
        '«Profesjonell: Vannmerker, metadata, deling, sikkerhetsanalyse, QR-koder for betaling og bedriftsfunksjoner.»',
      ],
    },
    {
      heading: '«Hurtigstart»',
      paragraphs: ['«Slik lager du din første QR-kode:»'],
      bullets: [
        '«1. Velg en innholdstype (URL, tekst, WiFi osv.) fra rullegardinmenyen Innholdstype.»',
        '«2. Skriv inn dataene dine i de oppgitte feltene.»',
        '«3. Tilpass eventuelt farger og stiler, og legg til et overleggsbilde.»',
        '«4. Klikk på Eksporter for å laste ned QR-koden din som PNG, GIF, WebP eller SVG.»',
      ],
    },
    {
      heading: '«Grunnleggende funksjoner»',
      paragraphs: [
        '«Basic-nivået gir et strømlinjeformet grensesnitt for å lage QR-koder med nyttelastinnhold og bildeoverlegg. Dette er den enkleste måten å komme i gang på.»',
      ],
    },
    {
      heading: '«Innholdstyper (grunnleggende)»',
      paragraphs: [
        '«Vanlig tekst: Kod hvilken som helst tekst opp til QR-kodekapasitetsgrensen. Ideell for korte meldinger, koder eller identifikatorer.»',
        '«URL: Koder nettadresser. QR-koden åpner URL-en når den skannes. Støtter protokollene http:// og https://.»',
      ],
    },
    {
      heading: '«Bildeoverlegg (grunnleggende)»',
      paragraphs: [
        '«Last opp et bilde (JPG, PNG, GIF, WebP) som skal blandes med QR-koden din. Grunnleggende overleggsfunksjoner inkluderer:»',
      ],
      bullets: [
        '«Last opp fra fil: Velg et bilde fra enheten din.»',
        '«Last inn fra URL: Skriv inn en bilde-URL (må tillate CORS).»',
        '«Senterlogo: Plasserer bildet i midten, basert på feilretting.»',
        '«Blanding: Enkel alfablanding av bilde med QR-mønster.»',
        '«Intensitet: Kontrollerer hvor sterkt overlegget påvirker QR-koden (0–100 %).»',
        '«Fargemodus: Fullfarge, gråtoner eller svart-hvitt.»',
        '«Bevar søkermønstre: Holder hjørnemønstrene uendret for pålitelig skanning.»',
      ],
    },
    {
      heading: '«Avanserte funksjoner»',
      paragraphs: [
        '«Avansert nivå låser opp QR-kodingsalternativer, gjengivelsesstiler, animasjon, utdataformater, utvidede innholdstyper og avansert tilpasning av overlegg.»',
      ],
    },
    {
      heading: '«Innstillinger for QR-koding»',
      paragraphs: [
        '«Versjon: QR-koder finnes i versjon 1–40, der høyere versjoner inneholder mer data, men er større. Sett til 0 (Auto) for å la ANQR velge den minste versjonen som passer til innholdet ditt.»',
        '«Feilretting: Bestemmer hvor mye skade en QR-kode kan tåle samtidig som den kan skannes.»',
      ],
      bullets: [
        '«L (Lav): 7 % feilkorreksjon – minste størrelse, minst redundans.»',
        '«M (Medium): 15 % feilretting – balansert alternativ.»',
        '«Q (kvartil): 25 % feilretting – bra for trykte koder.»',
        '«H (Høy): 30 % feilretting – best for koder med overlegg eller under tøffe forhold.»',
      ],
    },
    {
      heading: '«Stillesone (margin)»',
      paragraphs: [
        '«Den stille sonen er det hvite området rundt QR-koden. Skannere trenger denne marginen for å oppdage hvor koden starter. Standarden anbefaler minst 4 moduler. Å redusere til under 4 kan føre til skanneproblemer.»',
      ],
    },
    {
      heading: '«Modulstil»',
      paragraphs: [
        '«Moduler er de individuelle firkantene som utgjør en QR-kode. ANQR tilbyr fem stiler:»',
      ],
      bullets: [
        '«Firkant: Klassisk QR-utseende med skarpe hjørner.»',
        '«Avrundet: Mykgjorte hjørner for et vennligere utseende.»',
        '«Prikker: Sirkulære moduler for en moderne estetikk.»',
        '«Diamant: 45° roterte firkanter for et særegent mønster.»',
        '«Tilkoblet: Moduler slås sammen når de står i nærheten, og skaper organiske former.»',
      ],
    },
    {
      heading: '«Finder-mønsterstil»',
      paragraphs: [
        '«Findermønstre er de tre store firkantene i QR-hjørner som hjelper skannere med å orientere koden. Tilgjengelige stiler:»',
      ],
      bullets: [
        '«Firkant: Standard firkantede hjørner.»',
        '«Avrundet: Mykede hjørner som matcher den avrundede modulstilen.»',
        '«Sirkel: Sirkulære søkemønstre for punktformede koder.»',
      ],
    },
    {
      heading: '«Justering og tidsmønstre»',
      paragraphs: [
        '«Justeringsmønstre vises i større QR-koder (versjon 2+) for å korrigere forvrengning. Tidsmønstre er de alternerende linjene som forbinder søkermønstre.»',
      ],
      bullets: [
        '«Justeringsstil: Matchsøker, Firkantet, Avrundet eller Sirkel.»',
        '«Tidspunktstil: Matchmodul, Heltrukket eller Stiplet.»',
      ],
    },
    {
      heading: '«Farger»',
      paragraphs: [
        '«Forgrunn: Fargen på QR-modulene. Svart (#000000) er standard, men alle mørke farger fungerer.»',
        '«Bakgrunn: Bakgrunnsfargen. Hvit (#ffffff) er standard. Sørg for tilstrekkelig kontrast med forgrunnen.»',
        '«Gjennomsiktig bakgrunn: Fjern bakgrunnen helt for bruk på fargede overflater. Sørg for at overflaten gir tilstrekkelig kontrast.»',
      ],
    },
    {
      heading: '«Modulstørrelse og -avstand»',
      paragraphs: [
        '«Modulstørrelse: Kontrollerer hvor stor hver modul gjengis i piksler. Større verdier skaper større koder som er enklere å skanne.»',
        '«Modulavstand: Legger til avstand mellom moduler som en prosentandel. Små avstander (5–15 %) kan forbedre skanningsmuligheten under noen forhold, men for store avstander reduserer påliteligheten.»',
      ],
    },
    {
      heading: '«Utgangsinnstillinger»',
      paragraphs: ['«Format: Velg eksportformat basert på brukstilfelle.»'],
      bullets: [
        '«PNG: Tapsfritt rasterformat, ideelt for de fleste bruksområder. Best for trykk og digitalt.»',
        '«WebP: Moderne format med mindre filstørrelser. Bra for nettbruk.»',
        '«GIF: Påkrevd for animerte QR-koder. Støtter gjennomsiktighet.»',
        '«SVG: Vektorformat som skalerer uendelig. Best for stor skrift eller når du trenger å redigere koden.»',
      ],
    },
    {
      heading: '«Utgangsdimensjoner»',
      paragraphs: [
        '«Bredde/høyde: Angi utskriftsstørrelsen i piksler. For utskrift, beregn basert på DPI (f.eks. 300 DPI ved 1 tomme = 300 piksler). Større størrelser skanner mer pålitelig på avstand.»',
      ],
    },
    {
      heading: '«Animasjonsinnstillinger (Avansert)»',
      paragraphs: ['«Kontrollér animert QR-kodeoppførsel:»'],
      bullets: [
        '«Hastighet: Animasjonsbildefrekvens i millisekunder.»',
        '«Loop: Kontinuerlig eller enkeltspillingsanimasjon.»',
        '«Bounce: Regi av pingpong-animasjon.»',
        '«Startbilde: Start animasjonen fra et bestemt bilde.»',
        '«Maksimalt antall bilder: Begrens totalt antall bilder i animasjonen.»',
        '«Bildetrinn: Hopp over bilder for raskere animasjon.»',
        '«Interpolering: Ingen, Kryssfading eller Morf mellom rammer.»',
      ],
    },
    {
      heading: '«Innholdstyper (Avansert)»',
      paragraphs: ['«Avansert nivå låser opp flere nyttelastformater:»'],
      bullets: [
        '«Telefonnummer (tlf:): Oppretter en anropbar telefonkobling.»',
        '«E-post (mailto:): Åpner e-postklient med valgfritt emne og brødtekst.»',
        '«SMS: Forhåndsutfylt tekstmelding til et telefonnummer.»',
        '«vCard: Fullstendig kontaktkort med navn, organisasjon, telefon, e-post og adresse.»',
        '«MeCard: Kompakt kontaktformat populært i Japan.»',
        '«BizCard: Eldre visittkortformat.»',
        '«Geografisk plassering: GPS-koordinater som åpnes i kart.»',
        '«WiFi: Nettverkslegitimasjon for automatisk tilkobling (SSID, passord, sikkerhetstype).»',
        '«Kalenderhendelse: iCalendar-format med tittel, sted, dato/klokkeslett.»',
        '«RSVP for arrangement: Lenke til registreringssiden for arrangementet.»',
        '«Kalenderabonnement: Abonner på en ICS/WebCal-feed.»',
        '«Fil-/dokument-URL: Direktelenke til nedlastbare filer.»',
        '«Lenke til skylagring: Lenker til Google Drive, Dropbox, OneDrive osv.»',
        '«Sosial profil: Lenker til LinkedIn, Twitter, Instagram osv.»',
        '«Meldingslenke: WhatsApp, Telegram, Signal dyplenker.»',
      ],
    },
    {
      heading: '«Avanserte overleggsfunksjoner»',
      paragraphs: ['«Ytterligere overleggsfunksjoner:»'],
      bullets: [
        '«Beskjæring: Aktiver beskjæring for å velge et firkantet område av bildet.»',
        '«Halvtone: Klassisk punktmønster i utskriftsstil basert på bildets lysstyrke.»',
        '«Dithered: Feildiffusjonsdithering for detaljert reproduksjon.»',
      ],
    },
    {
      heading: '«Overleggsblandingsmoduser (avansert)»',
      paragraphs: ['«Ytterligere blandingsmoduser på avansert nivå:»'],
      bullets: [
        '«Underpiksel: Deler hver modul inn i underpiksler for høyere detaljer.»',
        '«Blå støy: Bruker blå støy-dithering for artefaktfrie mønstre.»',
        '«Mosaikk: Flisbasert effekt som bevarer bildestrukturen.»',
        '«Fyll mellomrom: Plasserer bildet i mellomrommene mellom modulene.»',
        '«Lysstyrke: Varierer modulstørrelsen basert på bildets lysstyrke.»',
        '«Duotone: Omformer bildet til to farger for å få en slående kontrast.»',
      ],
    },
    {
      heading: '«Overleggsintensitet»',
      paragraphs: [
        '«Styrer hvor sterkt overlegget påvirker QR-koden (0–100 %). Høyere verdier viser flere bildedetaljer, men kan redusere skanningsmuligheten. Start rundt 70 % og juster basert på testing.»',
      ],
    },
    {
      heading: '«Fargemodus»',
      paragraphs: ['«Hvordan overleggsbildet behandles:»'],
      bullets: [
        '«Fullfarge: Bevarer originale bildefarger.»',
        '«Gråtone: Konverterer til svart-hvitt-toner.»',
        '«Svart-hvitt: Konvertering av binærbilder med høy kontrast.»',
      ],
    },
    {
      heading: '«Bevar søkermønstre»',
      paragraphs: [
        '«Når den er aktivert, forblir de tre hjørnesøkermønstrene uendret av overlegget. Anbefales på det sterkeste for pålitelig skanning.»',
      ],
    },
    {
      heading: '«Forbehandling av bilde»',
      paragraphs: [
        '«Bruk filtre på overleggsbildet før du blander det. Disse justeringene kan forbedre hvordan bildet vises i den endelige QR-koden.»',
      ],
      bullets: [
        '«Lysstyrke (-100 til +100): Gjør bildet lysere eller mørkere.»',
        '«Kontrast (-100 til +100): Øk eller reduser toneområdet.»',
        '«Gamma (0,2 til 3,0): Ikke-lineær lysstyrkejustering. Verdier under 1 lysner mellomtoner, over 1 mørkner dem.»',
        '«Metning (-100 til +100): Fargeintensitet. -100 er gråtoner, +100 er overmettet.»',
        '«Roter fargetone (0–360°): Flytt alle fargene rundt fargehjulet.»',
        '«Uskarphet (0–20 piksler): Mykgjør bildedetaljer.»',
        '«Skarpe (0–100 %): Forbedre kanter og detaljer.»',
        '«Plakateffekt (0–16 nivåer): Reduser fargenivåene for en plakateffekt.»',
        '«Terskel (0–255): Konverter til binær svart/hvitt ved grenseverdien.»',
        '«Kantdeteksjon: Sobel- eller Canny-algoritmer for å bare vise kanter.»',
        '«Inverter: Snu alle farger.»',
      ],
    },
    {
      heading: '«Tilpasningsmodus»',
      paragraphs: ['«Hvordan overleggsbildet passer til QR-kodeområdet:»'],
      bullets: [
        '«Forside: Bildet fyller hele området, beskjæres om nødvendig.»',
        '«Inneholder: Hele bildet er synlig, kan ha marger.»',
        '«Strekk: Bildet forvrenges for å fylle nøyaktig.»',
      ],
    },
    {
      heading: '«Transformeringsalternativer»',
      paragraphs: [
        '«Rotasjon: Roter overlegget i trinn på 90°.»',
        '«Snu X/Y: Speilvende bildet horisontalt eller vertikalt.»',
      ],
    },
    {
      heading: '«Dithering-algoritmer»',
      paragraphs: [
        '«Rastrering konverterer bilder med kontinuerlig tone til mønstre som QR-koder kan representere. Tilgjengelig når du bruker blandingsmodusene Rastrering, Blå støy eller Ekte Rastrering.»',
      ],
      bullets: [
        '«Feildiffusjon: Klassisk Floyd-Steinberg-stil. Sprer kvantiseringsfeil til nærliggende piksler.»',
        '«Ordert (Bayer): Bruker en terskelmatrise for vanlige mønstre.»',
        '«Klyngepunkt: Simulerer rasterutskrift.»',
        '«Totalrom og klynge: Optimalisert ordnet dithering.»',
        '«Blå støy: Visuelt behagelig mønster med tilfeldig utseende.»',
        '«Terskel for blå støy: Terskelvariasjon med blå støytekstur.»',
        '«Hvit støy: Tilfeldig terskel-dithering.»',
        '«Gaussisk/triangulær støy: Støy med forskjellige fordelinger.»',
        '«Blå støy + feildiffusjon: Hybrid som kombinerer begge teknikkene.»',
        '«Skjermet blå støy: Skjermlignende blå støymønster.»',
        '«Perseptuell: Luminansvektet for bedre visuelle resultater.»',
        '«Kantbevisst: Bevarer bildekanter under dithering.»',
        '«Adaptiv terskel: Lokalt adaptiv terskelverdisetting.»',
        '«Temporal blå støy: For animerte GIF-er varierer mønsteret per bilde.»',
      ],
    },
    {
      heading: '«Diffusjonskjerner»',
      paragraphs: ['«Når du bruker feildiffusjonsdithering, velg hvordan feilen skal fordeles:»'],
      bullets: [
        '«Floyd-Steinberg: Klassisk 4-nabo-diffusjon. Godt generelt valg.»',
        '«Jarvis-Judice-Ninke: 12-nabo, jevnere, men tregere.»',
        '«Stucki: Ligner på JJN med forskjellige vekter.»',
        '«Burkes: Forenklet JJN, raskere.»',
        '«Sierra: Familie av kjerner som balanserer kvalitet og hastighet.»',
        '«Atkinson: Lysdiffusjon, bevarer detaljer, men kan være kornete.»',
      ],
    },
    {
      heading: '«Ditherstyrke»',
      paragraphs: [
        '«Styrer hvor mye dithering som brukes (0–100 %). Lavere verdier bevarer mer av det opprinnelige mønsteret, høyere verdier viser flere bildedetaljer.»',
      ],
    },
    {
      heading: '«Innstillinger for underpiksler»',
      paragraphs: ['«Når du bruker blandingsmodusen for delpiksler:»'],
      bullets: [
        '«Rutenettstørrelse: 2×2, 3×3 eller 4×4 delpiksler per modul. Høyere = mer detaljer.»',
        '«Senterregel: Streng krever at senterunderpiksel samsvarer med modulen. Halvtonesenter tillater variasjon.»',
        '«Nøytral farge: Farge brukt for ubestemte delpiksler.»',
        '«Overstyring av søker: Hvordan søkermønstre gjengis (heltrukket eller stilisert).»',
      ],
    },
    {
      heading: '«Rasterinnstillinger»',
      paragraphs: ['«Når du bruker blandingsmodus for halvtone:»'],
      bullets: [
        '«Cellestørrelse: Per modul eller N×N-rutenett.»',
        '«Prikkeform: Sirkel, firkant eller linje.»',
        '«Lysstyrkekurve: Lineær, S-kurve eller Gamma.»',
      ],
    },
    {
      heading: '«Totonefarger»',
      paragraphs: [
        '«Når du bruker blandingsmodusen Toton, angi skyggefargen (mørke områder) og uthevingsfargen (lyse områder).»',
      ],
    },
    {
      heading: '«Innstillinger for GIF-animasjon»',
      paragraphs: ['«Når du bruker animerte GIF-overlegg:»'],
      bullets: [
        '«Bruk bildeforsinkelser: Respekter original GIF-timing.»',
        '«Maks. FPS: Begrens bildefrekvens (1–60 fps).»',
        '«Håndtering av avfallshåndtering: Respekter eller forenkle metoder for rammeavfallshåndtering.»',
      ],
    },
    {
      heading: '«Avanserte gjengivelsesalternativer»',
      paragraphs: ['«Ytterligere gjengivelseskontroller:»'],
      bullets: [
        '«Gap-modus: Ingen, Innfelt, Strek eller Negativt mellomrom-styling.»',
        '«Hjørneradius: Prosentandel av avrundede hjørner for moduler.»',
        '«Gradient: Ingen, lineær, radial eller konisk gradient på moduler.»',
        '«Øye ytre/indre stil: Uavhengig styling for søkermønsterringer.»',
        '«Punktrotasjon: Roter diamant-/prikkmoduler.»',
        '«Øyeskala: Størrelsesjustering for søkermønstre.»',
        '«Rammestil: Legg til dekorative rammer (avrundet ramme, klistremerke, merkelapp).»',
        '«Rammetekst: Legg til tekst som «Skann meg!» i rammer.»',
      ],
    },
    {
      heading: '«Avansert QR-koding»',
      paragraphs: ['«Finjuster QR-koding:»'],
      bullets: [
        '«Kodingsmodus: Auto, Numerisk, Alfanumerisk, Byte/UTF-8 eller Kanji.»',
        '«Håndhev minimum stille sone: Sørg for minst 4 modulers margin.»',
      ],
    },
    {
      heading: '«Avanserte utdataalternativer»',
      paragraphs: ['«Ytterligere eksportinnstillinger:»'],
      bullets: [
        '«Filnavn: Tilpasset filnavn for nedlastinger.»',
        '«GIF-palettstørrelse: 2–256 farger i GIF-utdata.»',
        '«GIF-kvantisering: Mediankutt, NeuQuant eller Octree-fargereduksjon.»',
        '«GIF-dithering: Av, Floyd-Steinberg eller bestilt.»',
        '«GIF Transparent farge: Angi en farge som skal være transparent.»',
        '«SVG True Vector: Bruk stier i stedet for innebygd raster.»',
        '«SVG-formpresisjon: Piksel- eller presis banegjengivelse.»',
        '«SVG Embed Raster Overlay: Inkluder overlegg som innebygd bilde.»',
        '«Overstyring av bakgrunn: Tving frem en spesifikk bakgrunnsfarge i utdata.»',
      ],
    },
    {
      heading: '«Valideringsalternativer»',
      paragraphs: ['«Innstillinger for inndatabehandling:»'],
      bullets: [
        '«Valider input: Sjekk innholdsformatet før koding.»',
        '«Fjern mellomrom: Fjern innledende/etterfølgende mellomrom.»',
        '«Normaliser linjeskift: Konverter alle linjeavslutninger til LF.»',
        '«Max Length Guard: Advarsel hvis innholdet overskrider QR-kapasiteten.»',
      ],
    },
    {
      heading: '«Profesjonelle funksjoner»',
      paragraphs: [
        '«Profesjonelt nivå legger til vannmerker, metadata, delingsalternativer, sikkerhetsanalyse, QR-koder for betaling og bedriftsfunksjoner.»',
      ],
    },
    {
      heading: '«Vannmerke»',
      paragraphs: ['«Legg til vannmerker i QR-kodene dine:»'],
      bullets: [
        '«Type: Tekst-, bilde- eller mønstervannmerke.»',
        '«Posisjon: Senter, hjørner, kanter, bak eller stille sone.»',
        '«Opasitet: Vannmerkegjennomsiktighet (0–100 %).»',
        '«Blandingsmodus: Normal, Multiplisering, Skjerm eller Overlappingsblanding.»',
      ],
    },
    {
      heading: '«Metadata»',
      paragraphs: ['«Legg inn metadata i eksporterte filer:»'],
      bullets: [
        '«Felt for tittel, forfatter, opphavsrett, lisens og beskrivelse.»',
        '«Opprettelsestidspunkt: Bygg inn generasjonstidsstempel.»',
        '«Tilpasset nøkkelverdi: Legg til vilkårlige metadatapar.»',
      ],
    },
    {
      heading: '«Deling»',
      paragraphs: ['«Del QR-kodekonfigurasjonene dine:»'],
      bullets: [
        '«Direktelenke: Generer en delbar URL med dine nåværende innstillinger.»',
        '«Bygg inn HTML: Få innebyggingskode for nettsteder.»',
        '«Kodingsparametere: Inkluder alle innstillinger i delings-URL-en.»',
        '«Merk: Overleggsbilder fra lokale filer kan ikke deles via URL.»',
      ],
    },
    {
      heading: '«Sikkerhetsanalyse»',
      paragraphs: ['«Sørg for at QR-koder fortsatt kan skannes:»'],
      bullets: [
        '«Sikkerhetsmodus: Av, Balansert eller Strenge skannekrav.»',
        '«Minimumsmodulstørrelse: Minimum pikselstørrelse per modul.»',
        '«Min. stille sone: Moduler med minimumsmargin.»',
        '«Låsesøkere/Timing/Justering/Format/Versjon: Beskytt bestemte elementer.»',
        '«Maksimal overleggsintensitet med ECC: Automatiske intensitetsgrenser basert på feilkorrigeringsnivå.»',
      ],
    },
    {
      heading: '«Innholdstyper (Profesjonelle)»',
      paragraphs: ['«Faglig nivå legger til betalings- og bedriftsinnholdstyper:»'],
      bullets: [
        '«EPC/SEPA (EU): QR-koder for europeiske bankoverføringer med IBAN, BIC, beløp, referanse.»',
        '«UPI (India): Enhetlig betalingsgrensesnitt med VPA, betalingsmottakernavn, beløp.»',
        '«PayNow (Singapore): Rask betaling i Singapore med UEN eller mobilnummer.»',
        '«PromptPay (Thailand): Thailandsk nasjonalt betalingssystem.»',
        '«PIX (Brasil): Brasiliansk øyeblikkelig betaling med PIX-nøkkel.»',
        '«Krypto: Bitcoin, Ethereum, Litecoin betalingsadresser med valgfritt beløp.»',
        '«Lenke til markedsføringskampanje: URL-er med full sporing av UTM-parametere (markedsføringstagger).»',
        '«Kort lenke: For bruk med URL-forkortere for dynamiske/sporbare QR-koder.»',
        '«GS1 Digital Link: Produktidentifikasjon med GTIN, serienummer, batchnummer, utløpsdato.»',
        '«Dyplenker til apper: Dyplenker til iOS/Android-apper med tilpassede ordninger.»',
        '«Tilpasset format: Rådata uten formatering eller validering.»',
      ],
    },
    {
      heading: '«Språkrelevante betalinger i avansert modus»',
      paragraphs: [
        '«Når du bruker avansert modus, viser ANQR automatisk betalingsmetoder som er relevante for det valgte språket. For eksempel ser vietnamesiske brukere VietQR, thailandske brukere ser PromptPay, og indiskspråklige brukere ser UPI og BharatQR. Globale betalingsmetoder (kryptovaluta, PayPal, Cash App) er tilgjengelige for alle språk. Profesjonell modus låser opp alle betalingsstandarder uavhengig av språk.»',
      ],
    },
    {
      heading: '«Europeiske betalingsstandarder»',
      bullets: [
        '«EPC/SEPA (EU): Europeiske QR-koder for bankoverføringer i henhold til EPC QR-kodestandarden. Støtter IBAN, BIC (valgfritt for innenlands), beløp i EUR og strukturerte eller ustrukturerte betalingsreferanser. Brukes i hele SEPA-sonen, inkludert EU-land pluss Sveits, Norge, Island, Liechtenstein, Monaco og San Marino.»',
        '«Sveitsisk QR-faktura: Sveitsisk betalingsstandard i henhold til SIX implementeringsretningslinjer. Støtter CHF og EUR, QR-referanse (QRR), kreditorreferanse (ISO 11649), strukturerte kreditor-/debitoradresser og fakturainformasjon. Påkrevd for sveitsiske fakturaer siden 2022.»',
      ],
    },
    {
      heading: '«Indiske betalingsstandarder»',
      bullets: [
        '«UPI (India): Enhetlig betalingsgrensesnitt i henhold til NPCI Deep Linking-spesifikasjonen. Støtter VPA (virtuell betalingsadresse), betalingsmottakernavn, beløp i INR, transaksjonsnotat, referanse-ID, selgerkategorikode og transaksjonsmodus.»',
        '«BharatQR (India): Enhetlig QR-standard som støtter både UPI- og kortbaserte betalinger. Kombinerer UPI VPA med kort-PAN for maksimal kompatibilitet. Inkluderer selgernavn, by, MCC, GST-detaljer og faktura-/referansenummer.»',
      ],
    },
    {
      heading: '«Sørøstasiatiske betalingsstandarder»',
      bullets: [
        '«PayNow (Singapore): Singapores hurtigbetalingssystem som bruker EMVCo QR-spesifikasjon med SGQR-profil. Støtter UEN (bedriftsregistrering), mobilnummer eller NRIC som proxy-identifikatorer. Inkluderer flagg for redigering av beløp og utløpsdato.»',
        '«PromptPay (Thailand): Thailandsk nasjonalt betalingssystem som følger Bank of Thailands EMV-profil. Støtter mobilnummer, nasjonalt ID-nummer, skatte-ID, e-lommebok-ID og regningsbetaling med flere referansefelt.»',
        '«QRIS (Indonesia): Indonesisk standard for hurtigrespons. EMV-basert nasjonal betalingsstandard som støtter selger-ID, NMID (nasjonal selger-ID), klassifisering av selgerkriterier og gebyrer (faste eller prosentvise).»',
        '«DuitNow (Malaysia): Malaysisk system for direkte betaling. Støtter flere proxy-typer, inkludert NRIC, mobil, pass, militær-ID og organisasjonsnummer.»',
        '«VietQR (Vietnam): Vietnamesisk standard for interbankoverføringer. Krever bankens BIN-nummer (NAPAS-identifikasjon) og kontonummer. Støtter flere tjenestekoder for forskjellige overføringstyper (QRPUSH, QRIBFTTA, QRIBFTTC).»',
        '«QR Ph (Filippinene): Filippinsk QR-betalingsstandard for InstaPay og PESONet. Bruker kontonumre med selgeridentifikasjon for P2M-transaksjoner (person-til-selger).»',
      ],
    },
    {
      heading: '«Østasiatiske betalingsstandarder»',
      bullets: [
        '«TWQR (Taiwan): Taiwansk QR-betalingsstandard. Støtter selger-ID, skatte-ID og TWD-beløp.»',
        '«HKQR/FPS (Hong Kong): QR-koder for Hong Kongs raskere betalingssystem. Støtter FPS-ID, mobilnummer eller e-postadresse som betalingsidentifikatorer. Beløp i HKD.»',
        '«JPQR (Japan): Japansk enhetlig QR-kodebetalingsstandard. Bruker butikk-ID for selgeridentifikasjon med JPY-beløp.»',
      ],
    },
    {
      heading: '«Andre regionale betalingsstandarder»',
      bullets: [
        '«PIX (Brasil): Brasils sentralbanks direktebetalingssystem i henhold til BR-kodespesifikasjonen. Støtter PIX-nøkler (CPF, CNPJ, e-post, telefon eller tilfeldig nøkkel), selgernavn/by, transaksjons-ID og BRL-beløp.»',
        '«AusPayNet/NPP PayID (Australia): Australsk ny betalingsplattform for PayID-systemer. Støtter PayID-typer (e-post, mobil, ABN, organisasjons-ID) eller tradisjonell BSB + kontonummer. Selgernavn er valgfritt, ettersom betalere ser det registrerte navnet fra NPP-oppslag.»',
      ],
    },
    {
      heading: '«Betalinger med kryptovaluta»',
      bullets: [
        '«Bitcoin/Litecoin (BIP-21): Standard kryptovalutabetalings-URI-er med lommebokadresse, valgfritt beløp og etikett. Kompatibel med alle større Bitcoin- og Litecoin-lommebøker.»',
        '«Lightning Network (BOLT11): Fakturaer for Lightning Network-betalinger. Lim inn en BOLT11-kodet fakturastreng for umiddelbare Bitcoin-betalinger med minimale gebyrer.»',
        '«Ethereum (EIP-681): URI-er for forespørsler om Ethereum-transaksjoner som støtter native ETH-overføringer og ERC-20-tokenoverføringer. Inkluderer kjede-ID for støtte for flere nettverk (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gassparametere og kontraktsfunksjonskall.»',
      ],
    },
    {
      heading: '«Betalingslenketjenester»',
      bullets: [
        '«PayPal.Me: PayPal-betalingslenker med brukernavn og valgfritt forhåndsutfylt beløp. Mottakere kan betale via PayPal-saldo, kort eller bankkontoer.»',
        '«Cash App: Betalingslenker til Cash App med $cashtag med valgfritt beløp. Populær i USA for peer-to-peer-betalinger.»',
      ],
    },
    {
      heading: '«Generisk EMV QR»',
      bullets: [
        '«EMV Generic: Opprett tilpassede EMV-QR-koder i selgerpresentert modus for betalingsordninger som ikke er spesifikt oppført. Konfigurer selgernavn, by, landskode (ISO 3166-1), valutakode (ISO 4217 numerisk), MCC, alternativer for tips/bekvemmelighetsgebyr og flere datafelt. Nyttig for testing eller tilpassede integrasjoner.»',
      ],
    },
    {
      heading: '«Overleggsblandingsmoduser (profesjonell)»',
      paragraphs: ['«Ytterligere blandingsmoduser på profesjonelt nivå:»'],
      bullets: [
        '«Pikselering: Pikselert overleggseffekt.»',
        '«Omriss: Kantdeteksjonsoverlegg som bare viser konturer.»',
        '«Bølge: Bølget forvrengningseffekt.»',
        '«Subpikselstørrelse: Variabel subpikselstørrelse basert på bildet.»',
        '«Ekte dither: Avansert dithering med ordnet matrisevalg.»',
        '«Ekstrem: Maksimal bildesynlighet, kan påvirke skanningsmuligheten.»',
      ],
    },
    {
      heading: '«Beskyttelsesinnstillinger»',
      paragraphs: [
        '«Finkornet kontroll over hvilke QR-elementer som er beskyttet mot overleggsmodifikasjon:»',
      ],
      bullets: [
        '«Bevar timing: Hold timingmønstrene uendret.»',
        '«Bevar justering: Behold justeringsmønstrene uendret.»',
        '«Beskytt formatinformasjon: Skjoldformatinformasjonsmoduler.»',
        '«Beskytt versjonsinformasjon: Moduler for informasjon om skjermversjon.»',
      ],
    },
    {
      heading: '«ECC-bevisst modus»',
      paragraphs: [
        '«Fordeler overleggsintensiteten intelligent basert på feilkorreksjonskapasitet. Systemet analyserer hvilke moduler som kan endres samtidig som skanningsmuligheten opprettholdes.»',
      ],
      bullets: [
        '«Risikobudsjett: Prosentandel av feilrettingskapasitet som skal brukes (0–100 %).»',
        '«Høyere budsjett = mer synlig overlegg, men mer risikabel skanning.»',
        '«Lavere budsjett = tryggere skanning, men mindre synlig overlegg.»',
      ],
    },
    {
      heading: '«Profesjonelle gjengivelsesalternativer»',
      paragraphs: ['«Avanserte gjengivelseskontroller:»'],
      bullets: [
        '«Skarpe kanter: Bruk pikselert bildegjengivelse for skarpe modulkanter.»',
        '«Pikselsnap: Pikseljustering for gulv, runde eller tak.»',
        '«Fargemodus per modul: Helfarget, Etter lysstyrke, Etter posisjon, Etter overlegg, Etter klynge.»',
        '«Fargepalett: Definer egendefinert fargepalett for fargelegging per modul.»',
        '«Kontrastbeskyttelse: Sørg for minimum kontrastforhold mellom fargene.»',
        '«Minimumskontrastforhold: Kontrastkrav i WCAG-stil (1:1 til 21:1).»',
        '«Ekstra grensemoduler: Ekstra grense utenfor stillesonen.»',
      ],
    },
    {
      heading: '«Profesjonelle utdataalternativer»',
      paragraphs: ['«Innstillinger for eksport for bedrifter:»'],
      bullets: [
        '«DPI: Angi utskriftsoppløsning (72–600 DPI). 300 DPI anbefales for utskrift.»',
        '«Inkluder stillesone: Aktiver stillesone i utdatadimensjoner.»',
        '«Eksporter som tillegg: Generer PDF sammen med hovedformatet.»',
      ],
    },
    {
      heading: '«Animasjonsinnstillinger (profesjonell)»',
      paragraphs: ['«Ytterligere profesjonelle animasjonsfunksjoner:»'],
      bullets: [
        '«Midlertidig dithering: Av, blå støy eller flimmersikker dithering per bilde.»',
        '«Mønster: Ingen, Puls, Bølge, Skanningslinje, Skimmer eller Drift-effekter.»',
      ],
    },
    {
      heading: '«API-referanse»',
      paragraphs: [
        '«ANQR tilbyr et serverside-API for generering av QR-koder via URL-parametere. Dette er ideelt for å legge inn QR-koder på nettsteder, e-poster, dokumenter eller automatiserte arbeidsflyter uten JavaScript på klientsiden.»',
        '«Basis-URL: https://anqr.link/api/qr»',
      ],
    },
    {
      heading: '«Grunnleggende parametere»',
      paragraphs: ['«Obligatoriske og vanlige parametere (parameternavnene oversettes ikke):»'],
      bullets: [
        '«data (obligatorisk): Innholdet som skal kodes i QR-koden. URL-kode spesialtegn.»',
        '«størrelse: Bildestørrelse i piksler (standard: 400, maks: 2000). Brukes hvis w/h ikke er spesifisert.»',
        '«b, h: Bredde og høyde i piksler. Overstyrer størrelsesparameteren.»',
        '«format: Utdataformat — png, webp eller gif (standard: png).»',
        '«ec: Feilkorreksjonsnivå — L, M, Q eller H (standard: H).»',
        '«fg: Forgrunnsfarge som heksadesimal uten # (standard: 000000).»',
        '«bg: Bakgrunnsfarge som heksadesimal uten # (standard: ffffff).»',
        '«gjennomsiktig: Sett til 1 for gjennomsiktig bakgrunn.»',
        '«margin: Stille sone i moduler (standard: 4).»',
      ],
    },
    {
      heading: '«Stilparametere»',
      paragraphs: ['«Modul- og mønsterstil:»'],
      bullets: [
        '«stil: Modulstil — firkantet, avrundet, prikker, diamantformet, sammenkoblet.»',
        '«finder: Finder-mønsterstil — firkantet, avrundet, sirkel.»',
        '«align: Stil for justeringsmønster — match_finder, firkant, avrundet, sirkel.»',
        '«timing: Stil for tidsmønster — match_module, heltrukket, stiplet.»',
        '«radius: Hjørneradiusprosent 0–100.»',
        '«gap: Modulgapprosent 0–50.»',
        'gapMode: Gap-modus — ingen, innsatt, strek, negativt_rom.',
        '«øyeYtre, øyeIndre: Øyestiler — firkantet, avrundet, sirkel.»',
        '«eyeScale: Øyeskalaprosent (standard: 100).»',
        '«grad: Gradienttype — ingen, lineær, radial, konisk.»',
        '«gradAngle: Gradientvinkel for lineære gradienter.»',
        '«gradStops: Gradientstopp som color1,pos1,color2,pos2,… (f.eks. ff0000,0,0000ff,1).»',
      ],
    },
    {
      heading: '«Overleggsparametere»',
      paragraphs: ['«Alternativer for bildeoverlegg (overleggsbilde hentes på serversiden):»'],
      bullets: [
        '«img: URL til overlegg av bilde (må være offentlig tilgjengelig).»',
        '«modus: Overleggsmodus — senter, halvtone, blanding, lysstyrke, mosaikk, utjevnet, blåstøy, delpiksel.»',
        '«intensitet: Overleggsintensitet 0–100 (standard: 100).»',
        '«colorMode: Overleggsfargemodus — farge, gråtoner, svart-hvitt.»',
        '«passform: Hvordan overlegget passer – dekker, inneholder, strekker seg.»',
        '«rot: Overlappingsrotasjon i grader.»',
        '«flipX, flipY: Sett til 1 for å vende overlegg.»',
        '«keepFinders: Bevar søkemønstre (standard: 1).»',
        'keepTiming, keepAlign: Sett til 1 for å bevare timing-/justeringsmønstre.',
      ],
    },
    {
      heading: '«Forbehandlingsparametere»',
      paragraphs: ['«Forbehandling av bildet på overlegg:»'],
      bullets: [
        '«lysstyrke: Justering -100 til 100 (standard: 0).»',
        '«kontrast: Justering -100 til 100 (standard: 0).»',
        '«gamma: Verdi 0,1 til 3 (standard: 1).»',
        '«metning: Justering -100 til 100 (standard: 0).»',
        '«fargetone: Fargerotasjon i grader.»',
        '«uskarphet: Uskarphet i piksler».',
        '«skarphet: Skarphetsmengde 0–100.»',
        '«posterize: Posterize-nivåer.»',
        '«terskel: Binær terskel 0–255.»',
        '«kant: Kantdeteksjon — av, tydelig, skarp.»',
        '«inverter: Sett til 1 for å invertere farger.»',
      ],
    },
    {
      heading: '«Vannmerkeparametere»',
      paragraphs: ['«Legg til vannmerker i genererte QR-koder:»'],
      bullets: [
        'wmEn: Sett til 1 for å aktivere vannmerke.',
        '«wmKind: Vannmerketype — tekst, bilde, mønster.»',
        '«wmText: Vannmerketekst (URL-kodet).»',
        '«wmImg: URL til vannmerkebilde.»',
        'wmPos: Posisjon — sentrum, hjørner, kanter, bak, stille_sone.',
        'wmOpacity: Opacity 0–100 (standard: 50).',
        '«wmBlend: Blandingsmodus — normal, multipliser, skjerm, overlegg.»',
      ],
    },
    {
      heading: '«Animasjonsparametere»',
      paragraphs: ['«For animert GIF-utdata (krever format=gif):»'],
      bullets: [
        '«animPattern: Animasjonsmønster — ingen, puls, bølge, skannelinje, skimmer, drift, fargesyklus.»',
        '«animFrames: Antall rammer 1–60 (standard: 24).»',
        '«animSpeed: Bildeforsinkelse i millisekunder 10–1000 (standard: 100).»',
        '«animSeed: Tilfeldig seed for animasjon.»',
        '«lettelse: Animasjonslettelse — lineær, lettelse_inn, lettelse_ut, lettelse_inn_ut, sprett.»',
      ],
    },
    {
      heading: 'Utgangsparametere',
      paragraphs: ['«Alternativer for utdataformat:»'],
      bullets: [
        '«kvalitet: WebP-kvalitet 0–1 (standard: 0,9).»',
        '«webpQ: WebP-kvalitet 0–100 (standard: 90).»',
        '«gifColors: GIF-palettstørrelse 2–256 (standard: 256).»',
        '«dpi: Utdata-DPI for PNG (standard: 72).»',
        '«metatittel, metaforfatter, metakopi, metabeskrivelse: PNG-metadatafelt.»',
      ],
    },
    {
      heading: '«Eksempel på bruk»',
      paragraphs: [
        '«Grunnleggende QR-kode:»',
        '«https://anqr.link/api/qr?data=https://example.com»',
        '«QR-kode med tilpassede farger:»',
        '«https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30»',
        '«QR-kode med overleggsbilde:»',
        '«https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70»',
        '«Animert GIF:»',
        '«https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out»',
      ],
    },
    {
      heading: '«Innlemming av QR-koder»',
      paragraphs: [
        '«I profesjonell modus genererer delingsfunksjonen innebygd HTML og URL-er. Slik fungerer innebygging:»',
      ],
      bullets: [
        '«Del lenke: Oppretter en URL til ANQR-appen med alle innstillingene dine kodet som URL-parametere. Mottakere kan se og endre QR-koden.»',
        '«Legg inn bilde: Genererer en tag som peker til server-API-et. QR-koden gjengis på serversiden og serveres som et bilde.»',
        '«Bygg inn Markdown: Oppretter Markdown-bildesyntaks for dokumentasjon og README-filer.»',
        '«Direkte API-URL: Den rå API-URL-en for bruk i applikasjoner, skript eller andre integrasjoner.»',
      ],
    },
    {
      heading: '«HTML-eksempel»',
      paragraphs: [
        '«Slik legger du inn en QR-kode på nettstedet ditt:»',
        '«<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-kode />»',
        '«For responsiv størrelsesjustering:»',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-kode style=maks-bredde: 100%; høyde: auto; />',
        '«Serveren mellomlagrer svar med lange mellomlagsoverskrifter, så gjentatte forespørsler om samme URL er raske.»',
      ],
    },
    {
      heading: '«Format for deling av URL»',
      paragraphs: [
        '«Når du klikker på Del i profesjonell modus, koder ANQR dine nåværende innstillinger til URL-parametere. Formatet er:»',
        '«https://anqr.link/?data=…&ec=H&style=rounded&….»',
        '«Disse parameterne speiler API-parameterne, slik at du kan konvertere en delings-URL til en API-URL ved å endre basisbanen fra / til /api/qr og justere w/h-parameterne etter behov.»',
        '«Merk: Overleggsbilder lastet opp fra lokale filer kan ikke deles via URL – bare URL-baserte overlegg (img-parameter) fungerer i delte lenker og API-kall.»',
      ],
    },
    {
      heading: '«Rategrenser og bruk»',
      paragraphs: [
        '«API-et er gratis å bruke for rimelige volumer. For bruk i store mengder eller kommersielle applikasjoner som krever garantert oppetid, vennligst kontakt oss.»',
        '«API-svar inkluderer aggressive mellomlagringsoverskrifter. For best ytelse, mellomlagre svarene dine eller bruk samme URL konsekvent for identiske QR-koder.»',
      ],
    },
    {
      heading: '«Beste praksis»',
      paragraphs: ['«Følg disse retningslinjene for pålitelige QR-koder:»'],
      bullets: [
        '«Test alltid QR-kodene dine med flere skannerapper før du skriver ut.»',
        '«Bruk feilkorreksjon H (Høy) når du legger til overlegg.»',
        '«Behold minst 4 moduler med stille sone (margin).»',
        '«Sørg for høy kontrast mellom forgrunn og bakgrunn.»',
        '«For utskrift, bruk minst 300 DPI og test i faktisk utskriftsstørrelse.»',
        '«Aktiver Bevar søkermønstre når du bruker overlegg.»',
        '«Start med lavere overleggsintensitet og øk gradvis.»',
        '«Vurder større modulstørrelser og høyere feilkorreksjon for utendørs bruk.»',
      ],
    },
    {
      heading: '«Feilsøking»',
      paragraphs: ['«Vanlige problemer og løsninger:»'],
      bullets: [
        '«QR skanner ikke: Reduser overleggsintensiteten, øk feilkorreksjon, sjekk kontrasten.»',
        '«Koden er for lang: Reduser innholdslengden, bruk URL-forkorter, lav versjon.»',
        '«Uskarp utdata: Øk modulstørrelsen, bruk PNG i stedet for komprimerte formater.»',
        '«Fargene ser feil ut: Sjekk fargekontrasten, prøv gråtoneoverleggsmodus.»',
        '«GIF animeres ikke: Sørg for at du bruker GIF-formatutdata, sjekk antall bilder.»',
        '«Bildeoverlegget lastes ikke inn: Sjekk CORS-tillatelsene på eksterne bilder.»',
      ],
    },
    {
      heading: '«Snarveier på tastaturet»',
      paragraphs: [
        '«ANQR støtter standard hurtigtaster. Bruk Ctrl/Cmd+S for å utløse eksport (når fokus er på forhåndsvisningen).»',
      ],
    },
    {
      heading: '«Deling og innebygging»',
      paragraphs: [
        '«I profesjonell modus klikker du på Del-knappen for å kopiere en URL med dine nåværende innstillinger. Mottakere kan åpne denne URL-en for å se din nøyaktige konfigurasjon. Merk: Overleggsbilder fra lokale filer kan ikke deles via URL.»',
      ],
    },
  ],
};

export default docs;
