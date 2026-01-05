import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 * IDs 1044-1178 contain enhanced, unique content for each field.
 */
export const examples: PageDefinition = {
  title: 'ANQR Voorbeelden',
  description:
    'Vijf real-world, productie-stijl voorbeelden die laten zien waar QR codes meetbare waarde creëren: het verhogen van een legacy retail counter code, merk retail betalingen en "scan-to" acties, het printen van flyers naar billboards, geanimeerde QR voor digitale bewegwijzering, en cross-lingual samenwerking met behulp van gedeelde Anker links. Elk voorbeeld bevat afbeeldingen, praktische beperkingen, en een remix link terug naar de generator.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open de generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Blader door artikels', type: 'learn' },
    {
      href: '/guide?lang=${lang}',
      label: 'De volledige gebruikershandleiding openen',
      type: 'guide',
    },
  ],

  sections: [
    // ===== Example 1: Uplift Existing Campaign (IDs 1044-1070) =====
    {
      heading: 'Case Study: Retail Counter QR Uplift',
      paragraphs: [
        'Dit real-world voorbeeld volgt een klein café dat al drie jaar dezelfde QR code op hun toonbank gebruikt. De originele code werd snel gegenereerd tijdens de pandemie rush, gedrukt op standaard papier, en gleed uit in een plastic standaard. Het werkte - technisch gezien - maar klanten hadden vaak meerdere pogingen nodig om het te scannen, en het deed niets om de zorgvuldig gemaakte merkidentiteit van het café te versterken.',
        'De transformatie begon met een eenvoudige audit: de bestaande code code gecodeerde het online menu URL van het café, die ze wilden behouden. De uitdaging was om de QR zich te laten voelen als onderdeel van de café-ervaring in plaats van als een after thought utility uit 2020.',
      ],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'Een verweerde QR-code in een kunststof standaard met zichtbare slijtage, vingerafdrukken en vervaagde afdrukken',
          caption:
            'Het uitgangspunt: drie jaar tegendienst had de oorspronkelijke QR nauwelijks functioneel verlaten',
        },
      ],
    },
    {
      heading: 'Diagnose van de problemen van de oorspronkelijke code',
      paragraphs: [
        'Het testen bracht meerdere problemen aan het licht: de originele code gebruikte Foutcorrectie L (minimum redundantie), had een rustige zone van slechts 2 modules, en werd afgedrukt bij lage resolutie. Onder de warme wolfraam verlichting van het café, de reeds gefade zwarte modules nauwelijks contrasteerde met het gele papier. Oudere telefoons worstelde; nieuwere telefoons slaagden maar met merkbare vertraging.',
        'Naast technische kwesties, de generieke zwart-wit vierkant communiceerde niets over het merk. Klanten aarzelden alvorens te scannen - een subtiele vertrouwensbarrière die de betrokkenheid met het zorgvuldig ontworpen digitale menu van het café verminderde.',
      ],
      images: [
        {
          src: '/images/examples/uplift-diagnosis.png',
          alt: 'Een kenmerkende overlay die de technische tekortkomingen van de oorspronkelijke QR toont: lage ECC, minimale rustige zone, slecht contrast',
          caption:
            'Technische analyse die onthult waarom de legacy code onderging in reële omstandigheden',
        },
      ],
    },
    {
      heading: 'Het upliftproces',
      paragraphs: [
        'Met behulp van ANQR heeft de café eigenaar de code opnieuw gecreëerd met de identieke menu-URL maar drastisch verbeterde instellingen: Foutcorrectie H voor maximale veerkracht, een 6-module rustige zone voor betrouwbare grensdetectie, en merkkleuren (diepe bordeaux modules op crème achtergrond) die overeenkomen met het interieurpalet van het café.',
        'Er werd een kleine centrumoverlay met het logo van het café toegevoegd - bewust subtiel gehouden om de scannbaarheid te behouden en tegelijkertijd meteen merkherkenning te bieden. De veiligheidsmodus bevestigde dat het nieuwe ontwerp betrouwbaar is gescand over de testapparatuur voordat er wordt gedrukt.',
      ],
      images: [
        {
          src: '/images/examples/uplift-process.png',
          alt: 'De ANQR interface toont de configuratie: merkkleuren, passende ECC, royale rustige zone, subtiele logo-overlay',
          caption:
            'Bouwen van de verbeterde configuratie: elke instelling gekozen om merkexpressie in evenwicht te brengen met scan betrouwbaarheid',
        },
      ],
    },
    {
      heading: 'Meetbare resultaten',
      paragraphs: [
        'Na het inzetten van de nieuwe QR op professionele matte-gelamineerde kaarten voorraad, het café volgde resultaten over vier weken. Het succespercentage van de scan is verbeterd van naar schatting 70% tot bijna-100%. De gemiddelde scantijd daalde van 3-4 seconden tot minder dan 1 seconde. Het meest significant, menu engagement steeg 40% - klanten die eerder keek naar de QR en gaf nu scannen vertrouwen.',
        "Personeel meldde minder klantvragen over 'hoe gebruik je de QR' en geen gevallen meer van handmatig typen van de URL voor gefrustreerde klanten. De branded uiterlijk ook vonk gesprekken, met klanten positief commentaar op het samenhangende ontwerp.",
      ],
      images: [
        {
          src: '/images/examples/uplift-results.png',
          alt: 'A voor/na vergelijking met metrics: scan succespercentage, gemiddelde scantijd, en wekelijkse scan aantal verbeteringen',
          caption: 'Vier weken aan gegevens die de meetbare impact van een attente QR uplift tonen',
        },
      ],
    },
    {
      heading: 'Deze configuratie opnieuw aanmaken',
      paragraphs: [
        'De configuratie van het café toont conservatief maar effectief brandmerken: Foutcorrectie H, 6-module rustige zone, high-contrast merk kleuren, en een minimale centrum overlay. Deze balans werkt voor de meeste retail counter toepassingen waar betrouwbaarheid eerst moet komen, maar de aanwezigheid van het merk nog steeds belangrijk.',
        'Open de generator met deze instellingen voorgeladen en pas de kleuren en overlay aan uw eigen merk. Het belangrijkste inzicht: verbeteringen van de betrouwbaarheid alleen al kunnen de betrokkenheid drastisch verhogen, zelfs voordat u visuele styling toevoegt.',
        'Bekijk de bijbehorende Leergids over het verbeteren van bestaande QR-campagnes voor de volledige methodologie achter deze aanpak.',
      ],
      images: [
        {
          src: '/images/examples/uplift-config.png',
          alt: 'Link naar de generator voorgeconfigureerd met de instellingen van het café voor onmiddellijke aanpassing',
          caption: 'Begin met een bewezen configuratie en pas aan voor uw merk',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H&margin=6#render',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-0',
          label: 'Blader door artikels',
          type: 'learn',
        },
      ],
    },

    // ===== Example 2: Branded Retail Payments (IDs 1071-1097) =====
    {
      heading: 'Case Study: Multi-Payment Counter Display',
      paragraphs: [
        'Dit voorbeeld volgt een boetiek kledingwinkel die vijf verschillende QR codes had verzameld in hun register: bankbetaling, tips, Instagram, Google reviews, en een huurlink. Elk werd gegenereerd uit een andere bron, gedrukt op verschillende tijden, en weergegeven in niet-matched stands. De visuele chaos was het ondermijnen van de zorgvuldig gecureerde esthetiek van de winkel, en het personeel regelmatig omgaan met klanten scannen van de verkeerde code.',
        'De oplossing vereist het scheiden van zorgen: betaalcodes vereist maximale betrouwbaarheid met conservatieve styling, terwijl marketingcodes expressiever kunnen zijn. Het uniforme displaysysteem dat ontstond toont aan hoe de aanwezigheid van het merk in evenwicht te brengen met de functionele eisen van verschillende QR use cases.',
      ],
      images: [
        {
          src: '/images/examples/payments-overview.png',
          alt: 'Een rommelig registergebied met vijf niet-gematchte QR-codes in verschillende stands en drukwerk',
          caption:
            'Het chaotische startpunt: vijf losgekoppelde QR codes concurreren om aandacht en veroorzaken klant verwarring',
        },
      ],
    },
    {
      heading: 'Prioritering van de betalingservaring',
      paragraphs: [
        'De primaire betalingsmethode van de winkel gebruikte een regionale standaard die strikte naleving van de lading vereiste. Test bleek dat zelfs kleine styling beïnvloed scan snelheid met bepaalde banking apps. De beslissing: houd de betaling QR volledig ongewijzigd, behalve voor maatoptimalisatie en professioneel printen op matte kaartvoorraad.',
        "Deze conservatieve benadering betekende dat de betaalcode er minder 'gebrandmerkt' uitzag dan ideaal, maar de afrondingsratio's van transacties verbeterden dramatisch. Het inzicht: betaalmomenten zijn geen merkmomenten - het zijn betrouwbaarheidsmomenten. Klanten waarderen snelheid en zekerheid over esthetiek wanneer geld wordt betrokken.",
      ],
      images: [
        {
          src: '/images/examples/payments-primary.png',
          alt: 'Een schone, grote betaling QR code op professionele matte kaart voorraad, prominent geplaatst in het register',
          caption:
            'De betaling QR: formaat royaal, professioneel gedrukt, conservatief vormgegeven voor onmiddellijke erkenning door banking apps',
        },
      ],
    },
    {
      heading: 'Secundaire actieweergave aanmaken',
      paragraphs: [
        'Voor tips, recensies, sociale, en het huren, de winkel kan meer expressief. Deze codes werden gerecupereerd in ANQR met consistente merkstijlen: de handtekening van de winkel olijfgroen op crème, ronde modulestijl, en een subtiele centrumoverlay met het pictogram van de winkel. Foutcorrectie H zorgde zelfs met de styling voor betrouwbaarheid.',
        'Deze vier codes werden gerangschikt in een branded panel naast (niet concurreren met) de betaalcode. Duidelijke labels in de typografie van de winkel verklaarden het doel van elke code. De visuele hiërarchie was opzettelijk: betaling stond alleen en prominent; secundaire acties gegroepeerd als opties.',
      ],
      images: [
        {
          src: '/images/examples/payments-secondary.png',
          alt: 'Een branded panel met vier QR codes voor tips, recensies, social, en verhuur, met duidelijke labels',
          caption:
            'Het secundaire actiepaneel: consistente branding, duidelijke etikettering, geplaatst als opties in plaats van afleiding',
        },
      ],
    },
    {
      heading: 'Systeemontwerp weergeven',
      paragraphs: [
        'Het fysieke display loste meerdere problemen tegelijk op. Zowel de betaalstand als het secundaire paneel gebruikt matte materialen om verblinding van bovenverlichting te elimineren. De hoogtes zijn geoptimaliseerd voor klanten van verschillende grootte. Hoeken gericht op de klant wachtrij in plaats van plat op de teller.',
        'Critically, de winkel gemaakt reserve afdrukken van vergrendelde ANQR configuratie links. Toen de tips code uiteindelijk kreeg koffie-splashed, personeel vervangen binnen enkele minuten met behulp van de opgeslagen configuratie - geen screenshots, geen gissen bij instellingen, geen kwaliteitsdegradatie.',
      ],
      images: [
        {
          src: '/images/examples/payments-display.png',
          alt: 'Een diagram met de fysieke weergave-indeling: hoogtes, hoeken, materialen en het verband tussen betaling en secundaire displays',
          caption:
            'Weergavesysteem blauwdruk: fysieke ergonomie geoptimaliseerd voor betrouwbaar scannen over klanthoogtes en lichtomstandigheden',
        },
      ],
    },
    {
      heading: 'Operationele verbeteringen',
      paragraphs: [
        "Zes weken na implementatie heeft de winkel significante verbeteringen gedocumenteerd: nul klachten van klanten over 'foute code' verwarring, snellere transactietijden en een 3x toename van tip-inzendingen (klanten konden nu de tipcode vinden en scannen zonder lastig personeel te vragen). Google reviews ook verhoogd als de toegewijde, goed gelabelde QR verwijderd wrijving.",
        'De opleiding van het personeel werd eenvoudiger: De betaalcode is de grote, de rest staat op het paneel. Toen betaling apps bijgewerkt en een kort toonde langzamer scannen, de conservatieve betaalcode ontwerp betekende het nog steeds werkte - slechts marginaal langzamer in plaats van volledig falen.',
        'Zie de Leergids over QR-codes voor retailbetalingen voor de principes achter dit displaysysteemontwerp.',
      ],
      images: [
        {
          src: '/images/examples/payments-metrics.png',
          alt: 'Een metrics dashboard dat voor/na vergelijkingen toont: verwarringsincidenten, transactietijd, tipfrequentie, beoordelingsinzendingen',
          caption:
            'Zes weken operationele gegevens die de bedrijfsimpact aantonen van een doordacht multi-QR-displaysysteem',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-7',
          label: 'Blader door artikels',
          type: 'learn',
        },
      ],
    },

    // ===== Example 3: Print Scaling (IDs 1098-1124) =====
    {
      heading: 'Case Study: Van Business Card tot Billboard',
      paragraphs: [
        'Dit voorbeeld volgt op een event productie bedrijf voorbereiding op een grote conferentie. Ze hadden dezelfde QR-code nodig - koppelen aan de event-app - ingezet in radicaal verschillende formaten: bezoekersbadge inserts (3cm), tafeltentkaarten (8cm), registratie bureau signage (30cm), wayfinding posters (60cm), en een enorme stage backdrop banner (4 meter). Elk formaat had verschillende kijkafstanden, lichtomstandigheden en productie-workflows.',
        'De uitdaging was niet alleen technisch - het was operationeel. Meerdere leveranciers behandelden verschillende afdruktaken, en het bedrijf moest zorgen voor consistente, scannable resultaten ongeacht wie geproduceerd wat. Hun oplossing was gericht op SVG export en strikte overdrachtsdocumentatie.',
      ],
      images: [
        {
          src: '/images/examples/print-overview.png',
          alt: 'Een collage met dezelfde QR code in vijf verschillende maten, van badge tot banner',
          caption:
            'Eén QR-code, vijf inzetgroottes: de uitdaging om de scannbaarheid van centimeter tot meter te behouden',
        },
      ],
    },
    {
      heading: 'Waarom vorige gebeurtenissen problemen hadden',
      paragraphs: [
        "Tijdens hun laatste conferentie had het bedrijf beschamende mislukkingen ervaren. De podiumbanner QR werd gegenereerd als een kleine PNG en opgeschaald in design software - het resultaat zag er aanvaardbaar uit van een afstand maar faalde om betrouwbaar te scannen van het publiek. Badge QR's waren over-stijld en te klein, frustrerend aanwezigen proberen om contacten toe te voegen. Inconsistente instellingen tussen formaten betekende dat de 'zelfde' QR er op elk stuk anders uitzag.",
        'Post-event analyse onthulde de oorzaak: geen enkele bron van waarheid. Elke ontwerper had de QR opnieuw gemaakt met iets verschillende instellingen, en elke afdrukverkoper had bestanden anders verwerkt. Kwaliteit aangetast door het telefoonspel van file handoffs.',
      ],
      images: [
        {
          src: '/images/examples/print-problems.png',
          alt: "Close-up foto's met scanfouten: gepixelde bannermodules, ondermaatse badgecodes, inconsistente styling tussen formaten",
          caption:
            'Forensische analyse van eerdere mislukkingen: elk formaat had verschillende kwaliteitsproblemen geïntroduceerd',
        },
      ],
    },
    {
      heading: 'De SVG-eerste workflow',
      paragraphs: [
        'Voor dit evenement heeft het bedrijf een strikt protocol opgesteld: één master QR gegenereerd in ANQR met optimale instellingen (Foutcorrectie H, royale rustige zone, schone styling), geëxporteerd als SVG, en opgeslagen als de enige gezaghebbende bron. De ANQR configuratie link werd gedocumenteerd naast het SVG bestand zodat de code kan worden geregenereerd indien nodig.',
        "Elke ontwerper en leverancier kreeg dezelfde SVG master met expliciete instructies: plaats op de gewenste grootte, niet wijzigen, handhaven rustige zonevrijheid. Voor leveranciers die rasterformaten nodig hebben, verstrekte het bedrijf vooraf gerenderde PNG's op specifieke grootte met duidelijke naamgeving conventies die het beoogde gebruik aangeven.",
      ],
      images: [
        {
          src: '/images/examples/print-workflow.png',
          alt: "Een bestandspakket met de SVG master, groottespecifieke PNG's, specificatiedocument en configuratielink",
          caption:
            'Het handoff pakket: alles wat leveranciers nodig hebben om consistente resultaten te produceren zonder te raden',
        },
      ],
    },
    {
      heading: 'Groottespecifieke overwegingen',
      paragraphs: [
        "Elk formaat vereist specifieke aandacht. Badge inserts op 3cm had de QR nodig om maximale beschikbare ruimte te bezetten - scanafstand zou armlengte zijn. Tafeltenten op 8cm kunnen decoratieve kaders buiten de rustige zone omvatten. De 4 meter hoge banner vereist berekening: van typische afstand tot het publiek (15-20 meter), modules moesten duidelijk te onderscheiden zijn door telefooncamera's, waardoor de QR minimaal 80 cm binnen het bannerontwerp moest zijn.",
        'Het bedrijf creëerde een Size Guide documenteren minimale QR afmetingen voor elke verwachte scanafstand. Dit werd een herbruikbare troef voor toekomstige gebeurtenissen, waardoor giswerk uit het ontwerpproces werd verwijderd.',
      ],
      images: [
        {
          src: '/images/examples/print-sizing.png',
          alt: 'Een grafiek met de relatie tussen scanafstand, minimale QR-grootte en moduleafmetingen voor elk evenementformaat',
          caption:
            'De groottematrix: berekende afmetingen garanderen betrouwbaar scannen op de verwachte kijkafstand van elk formaat',
        },
      ],
    },
    {
      heading: 'Productieresultaten',
      paragraphs: [
        'De validatie van de conferentiedag was systematisch: het personeel testte elke ingezette QR voordat de deuren opengingen. De badge inserts scanden direct op armlengte. Tafeltenten werkten betrouwbaar in de variabele verlichting van breakout rooms. De podiumbanner - de schaamte van het vorige evenement - scande succesvol vanuit het midden van het publieksgebied.',
        'Zero scanning klachten werden geregistreerd bij 2000+ bezoekers. De operationele overwinning was even belangrijk: wanneer een last-minute sponsor toevoeging nieuwe bewegwijzering vereist, het productieteam genereerde het van de master SVG in minuten, ervan overtuigd dat het zou overeenkomen met al het andere.',
        'Zie de Learn-gids over print-ready QR-codes voor het SVG vs PNG-besluitkader en de overdracht van beste praktijken.',
      ],
      images: [
        {
          src: '/images/examples/print-success.png',
          alt: 'Evenement fotografie toont bezoekers succesvol scannen QR codes op verschillende groottes en afstanden door de hele locatie',
          caption:
            "Succes van de conferentiedag: betrouwbaar scannen in elk formaat, van badge close-ups tot bannerafstandsfoto's",
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=svg#output',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-14',
          label: 'Blader door artikels',
          type: 'learn',
        },
      ],
    },

    // ===== Example 4: Animated Signage (IDs 1125-1151) =====
    {
      heading: 'Case Study: Airport Lounge Digital Display',
      paragraphs: [
        'Dit voorbeeld volgt een luchtvaartmaatschappij lounge die statische QR codes had gebruikt op hun digitale welkomstschermen. De schermen weergegeven roterende promotionele inhoud, maar de QR-code voor lounge check-in zat in een hoek, statische en gemakkelijk over het hoofd. Analytics toonde slechts 15% van de in aanmerking komende gasten gebruikt de QR check-in ondanks dat het sneller dan de bureauwachtrij. De meeste gasten merkten het gewoon niet.',
        'De hypothese was simpel: in een visueel drukke omgeving met bewegende inhoud wordt een statische QR onzichtbaar. De oplossing die nodig is om de QR merkbaar te maken zonder afbreuk te doen aan de betrouwbaarheid die nodig is voor een check-in flow waar falen zou leiden tot gefrustreerde reizigers en langere bureaurijen.',
      ],
      images: [
        {
          src: '/images/examples/animated-overview.png',
          alt: 'Een digitaal display in een luchthaven lounge met promotionele inhoud met een kleine, statische QR code in de hoek',
          caption:
            'De oorspronkelijke opzet: een statische QR verloren in een zee van dynamische promotionele inhoud, het bereiken van slechts 15% adoptie',
        },
      ],
    },
    {
      heading: 'Het ontwerpen van veilige animatie',
      paragraphs: [
        'De digitale bewegwijzering van de lounge gebruikte grote LED-panelen - een uitdagende omgeving waar agressieve animatie scanproblemen kan veroorzaken. Het ontwerpteam begon conservatief: een zacht pulseffect dat subtiel uitbreidde en de visuele aanwezigheid van de QR samentrok zonder de eigenlijke codestructuur te wijzigen. Frame timing werd ingesteld langzaam (250m) om eventuele flikkerende problemen met de LED refresh rate te voorkomen.',
        'Veiligheidsmodus validatie bevestigd elk frame bleef scannable. Aanvullende tests op de werkelijke LED-panelen toonden aan dat de puls nog subtieler dan desktop previews voorgesteld - LED helderheid en kijkhoeken beïnvloed waargenomen contrast meer dan verwacht.',
      ],
      images: [
        {
          src: '/images/examples/animated-config.png',
          alt: 'Het ANQR animatie paneel met pulsconfiguratie: langzame timing, subtiele intensiteit, veiligheidsmodus ingeschakeld',
          caption:
            'Animatieconfiguratie: parameters ingesteld voor LED-paneelweergave terwijl de scan betrouwbaarheid in elk frame behouden',
        },
      ],
    },
    {
      heading: 'Integratie met Signage Content',
      paragraphs: [
        "De geanimeerde QR werd geplaatst in een speciale 'stabiele zone' van de schermindeling - een gebied dat constant bleef terwijl promotionele inhoud draaide in het hoofdschermgebied. Deze scheiding was van cruciaal belang: de QR had visuele stabiliteit nodig om te scannen, zelfs terwijl hij de aandacht trok door zijn subtiele animatie.",
        'Een duidelijke call-to-action werd toegevoegd naast de QR: Scan de wachtrij om in te checken. De tekst bleef statisch terwijl de QR pulsed, het creëren van een visuele hiërarchie die het oog trok op de scankans zonder het overweldigen van de promotionele inhoud.',
      ],
      images: [
        {
          src: '/images/examples/animated-layout.png',
          alt: 'Een schermindelingsdiagram met de geanimeerde QR in een stabiele zone terwijl promotionele inhoud draait in het hoofdgebied',
          caption:
            'Screen vastgoed allocatie: de geanimeerde QR bezet een stabiele zone gescheiden van roterende promotionele inhoud',
        },
      ],
    },
    {
      heading: 'Technische invoering',
      paragraphs: [
        "De geanimeerde QR werd geëxporteerd als een GIF met geoptimaliseerde instellingen voor de signage CMS. File size overwegingen belangrijk - de lounge's content management systeem had upload limieten, en overdreven grote bestanden veroorzaakt afspelen stotteren. De uiteindelijke export van evenwichtige visuele kwaliteit tegen bestandsgrootte door het kleurenpalet te beperken en het aantal frames te optimaliseren.",
        'Deployment omvatte een terugval: als de GIF niet om welke reden dan ook kon spelen, zou het bewegwijzeringssysteem een statische PNG-back-up weergeven. Deze redundantie zorgde ervoor dat check-in vermogen nooit verloren als gevolg van technische problemen met de animatie.',
      ],
      images: [
        {
          src: '/images/examples/animated-cms.png',
          alt: 'Een CMS-interface die de geanimeerde QR-upload met fallback statische afbeelding geconfigureerd toont',
          caption:
            'Signage CMS configuratie: geanimeerde primaire met statische terugval ervoor zorgen dat check-in mogelijkheid nooit wordt onderbroken',
        },
      ],
    },
    {
      heading: 'Gemeten effect',
      paragraphs: [
        "Na een maand van werking, QR check-in adoptie steeg van 15% naar 24% - een relatieve verbetering van 60%. Gast feedback onderzoeken wees uit dat de geanimeerde QR was 'makkelijker op te merken' en 'voelt meer modern.' Desk wachtrij tijden nam meetbaar tijdens de piek periodes als meer gasten zelf bediend via de QR.",
        "Belangrijk, nul scanfouten werden gemeld ondanks duizenden dagelijkse scans. De conservatieve animatie aanpak had het aandachtsdoel bereikt zonder de betrouwbaarheid op te offeren een check-in flow gevraagd. De lounge rolde vervolgens soortgelijke geanimeerde QR's uit als hun andere locaties.",
        'Zie de Leergids over geanimeerde QR-codes voor digitale bewegwijzering voor de technische principes achter veilig animatieontwerp.',
      ],
      images: [
        {
          src: '/images/examples/animated-metrics.png',
          alt: 'Een dashboard met verhoging van de adoptiesnelheid, vermindering van de wachtrijtijd en betrouwbaarheid van de nulfaillissementsscan gedurende de inzetperiode',
          caption:
            'Een maand van gegevens: 60% adoptie verhoging, verminderde wachtrij tijden, en gehandhaafd perfecte scan betrouwbaarheid',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif&animPattern=pulse#animation',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-21',
          label: 'Blader door artikels',
          type: 'learn',
        },
      ],
    },

    // ===== Example 5: Cross-Lingual Collaboration (IDs 1152-1178) =====
    {
      heading: 'Case Study: Global Product Launch QR Campaign',
      paragraphs: [
        "Dit voorbeeld volgt een consumentenelektronicabedrijf dat tegelijkertijd een nieuw product lanceert in 12 markten in 8 talen. Elk regionaal marketingteam moest verpakkings-, winkel- en promotiemateriaal produceren met QR-codes die gekoppeld zijn aan gelokaliseerde productpagina's. Eerdere lanceringen hadden geresulteerd in inconsistente QR styling, af en toe scannen mislukkingen, en een 'telefoonspel' van configuratie drift als elk team opnieuw codes gemaakt van screenshots.",
        'De oplossing maakte gebruik van de gedeelde configuratielinks van ANQR om één enkele bron van waarheid te creëren die elk regionaal team kon benaderen, ongeacht hun interfacetaal. De QR payload gebruikte een slimme redirect die gebruikerstaal detecteren, dus een code werkte wereldwijd terwijl het leveren van lokale ervaringen.',
      ],
      images: [
        {
          src: '/images/examples/collab-overview.png',
          alt: 'Een wereldkaart met 12 marktlocaties met QR-codes, sommige visueel inconsistent met elkaar',
          caption:
            "De uitdaging: 12 markten, 8 talen en een geschiedenis van inconsistente QR-implementaties in regio's",
        },
      ],
    },
    {
      heading: 'De masterconfiguratie instellen',
      paragraphs: [
        'Het wereldwijde merkteam creëerde de gezaghebbende QR-configuratie in ANQR: merkkleuren die overeenkomen met de visuele identiteit van de productlijn, Foutcorrectie H voor betrouwbaarheid in alle print- en digitale toepassingen, en styling die consistent zou reproduceren ongeacht lokale productiemethoden. De configuratie was vergrendeld en de share link gedocumenteerd in de globale campagnebrief.',
        'Kritiek, de gecodeerde URL gebruikt een taal-detecting redirect service. Bij het scannen werden gebruikers automatisch doorgestuurd naar hun lokale taalproductpagina. Dit betekende dat alle 12 markten identieke QR-codes konden gebruiken - geen variaties per marktlading die fouten konden introduceren.',
      ],
      images: [
        {
          src: '/images/examples/collab-master.png',
          alt: 'De ANQR interface toont de master configuratie met merkkleuren, ECC H en de smart redirect URL',
          caption:
            'De masterconfiguratie: wereldwijde merkstandaarden gecodeerd in één enkele, gedeelde bron van waarheid',
        },
      ],
    },
    {
      heading: 'Regionale teamworkflow',
      paragraphs: [
        'Elk regionaal marketingteam ontving de configuratielink met eenvoudige instructies: open de link, verifieer de preview overeenkomstig de merkrichtlijnen, exporteer in het gewenste formaat voor uw toepassing. De ANQR-interface die in de taal van elk team wordt weergegeven, maar de onderliggende QR-instellingen bleven identiek, ongeacht de interfacetaal.',
        'Toen het Japanse team SVG nodig had voor high-end retail displays en het Braziliaanse team PNG nodig had voor social media, beide geëxporteerd vanuit dezelfde configuratie. Toen de printverkoper van het Duitse team om specifieke kleurwaarden vroeg, konden ze direct naar de configuratie verwijzen in plaats van te raden vanuit een screenshot.',
      ],
      images: [
        {
          src: '/images/examples/collab-regional.png',
          alt: 'Screenshots met dezelfde configuratieverbinding geopend in Japanse, Portugese en Duitse interfaces',
          caption:
            'Zelfde configuratie, verschillende interfaces: regionale teams werken in hun voorkeurstaal met behoud van wereldwijde consistentie',
        },
      ],
    },
    {
      heading: 'Regionale verschillen aanpakken',
      paragraphs: [
        "Sommige markten vereisten kleine aanpassingen. Het Chinese team had een versie nodig met een WeChat-geoptimaliseerd frame voor sociaal delen. In plaats van de master te wijzigen, creëerden ze een gedocumenteerde variant met een eigen configuratielink, duidelijk aangeduid als 'CN-WeChat variant' in de campagne activabibliotheek. Hierdoor bleef de traceerbaarheid gehandhaafd en werd de noodzakelijke lokalisatie mogelijk.",
        "Het merkteam stelde een eenvoudige regel vast: elke variatie van master vereist een nieuwe, gedocumenteerde configuratielink. Geen wijzigingen aan geëxporteerde bestanden, geen 'quick fixes' in ontwerpsoftware. Dit voorkwam de configuratie drift die had geplaagd vorige lanceringen.",
      ],
      images: [
        {
          src: '/images/examples/collab-variants.png',
          alt: 'Een interface van de activabibliotheek met de masterconfiguratie en goedgekeurde regionale varianten, elk met een eigen link',
          caption:
            'Campaign asset governance: master configuratie plus gedocumenteerde varianten, allemaal traceerbaar via configuratie links',
        },
      ],
    },
    {
      heading: 'Startresultaten',
      paragraphs: [
        "Productlanceringsdag zag QR-codes die gelijktijdig op alle 12 markten werden ingezet voor verpakkingen, retaildisplays, eventmaterialen en digitale campagnes. Kwaliteitscontroles bevestigden visuele consistentie tussen regio's - de QR op Tokyo retail displays kwamen overeen met de QR op São Paulo verpakking overeen met de QR op Berlijn event banners.",
        'Overal in de markt werden storingen in het scannen gerapporteerd. Wanneer een post-lancering product pagina URL-wijziging nodig was, de redirect service onzichtbaar behandeld - geen herdruk vereist. Het wereldwijde team schatte de configuratielinkbenadering 40+ uur coördinatietijd in vergelijking met hun vorige lanceringsmethode.',
        'Zie de Learn-gids over de meertalige QR-samenwerking voor de workflowprincipes van wereldwijde campagnesamenhang.',
      ],
      images: [
        {
          src: '/images/examples/collab-success.png',
          alt: "Een raster van foto's met consistente QR-implementatie op verschillende markten: Tokyo retail, São Paulo verpakking, Berlijn evenementen",
          caption:
            'Wereldwijde consistentie bereikt: identieke QR presentatie op 12 markten ondanks verschillende talen, leveranciers en formaten',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-28',
          label: 'Blader door artikels',
          type: 'learn',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Blader door artikels', type: 'learn' },
    {
      href: '/guide?lang=${lang}',
      label: 'De volledige gebruikershandleiding openen',
      type: 'guide',
    },
    { href: '/gallery?lang=${lang}', label: 'Galerie openen', type: 'gallery' },
  ],
};
