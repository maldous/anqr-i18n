import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Learn page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const learn: PageDefinition = {
  title: 'Leren met ANQR',
  description:
    'Praktische, business-first gidsen voor het omzetten van QR codes in echte marketing activa - niet alleen functionele vierkanten. Leer hoe u legacy point-of-sale codes kunt upgraden, conforme betaling QR signage kunt maken, print-ready export kunt voorbereiden, animatie veilig kunt gebruiken op digitale displays, en locked-in configuraties kunt delen over meertalige teams met behulp van ANQR ("anker") links.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open de generator', type: 'generator' },
    { href: '/examples?lang=${lang}', label: 'QR voorbeelden bekijken', type: 'example' },
    {
      href: '/guide?lang=${lang}',
      label: 'De volledige gebruikershandleiding openen',
      type: 'guide',
    },
  ],

  sections: [
    // Guide 1: Improving Existing QR Campaigns
    {
      heading: 'De bestaande QR-campagnes verbeteren',
      paragraphs: [
        "De meeste bedrijven hebben QR codes verspreid over hun activiteiten - op menu's, toonbank, verpakking en promotiemateriaal. Veel van deze codes zijn jaren geleden gemaakt met basisgeneratoren, wat resulteert in generieke zwart-wit vierkanten die niet inspireren vertrouwen of overeenkomen met uw merk identiteit. Deze uitgebreide gids begeleidt u door een systematische aanpak van het controleren, upgraden en optimaliseren van uw bestaande QR-infrastructuur zonder de klanttrajecten die u al hebt opgezet te verstoren.",
        "Het strategische voordeel van het upgraden in plaats van het vervangen van uw QR codes ligt in het behouden van continuïteit. Uw klanten hebben al geleerd om bepaalde bestemmingen te verwachten wanneer ze uw codes scannen. Door de gecodeerde URL's identiek te houden en tegelijkertijd de visuele presentatie, betrouwbaarheid en merkuitlijning drastisch te verbeteren, creëer je een naadloze overgang die het vertrouwen verbetert zonder dat er wijzigingen nodig zijn in je digitale infrastructuur of analytics tracking.",
      ],
      images: [
        {
          src: '/images/learn/improve-existing-overview.png',
          alt: 'Een side-by-side vergelijking met een vervaagde, generieke QR-code naast een moderne merkversie die dezelfde URL codeert',
          caption:
            'Voor en na: Dezelfde bestemming URL getransformeerd van een gedateerde generieke code naar een professionele merkactiva',
        },
      ],
    },
    {
      heading: 'Waarom Legacy QR Codes Underperform',
      paragraphs: [
        'QR-codes die tijdens de vroege adoptiefase zijn gecreëerd - met name in 2020-2021 toen bedrijven haast maakten om contactloze oplossingen te implementeren - hebben vaak te maken met verschillende kritieke kwesties. Lage foutcorrectie instellingen maken ze kwetsbaar wanneer ze worden afgedrukt op textuuroppervlakken of bekeken onder uitdagende verlichting. Onvoldoende stille zones veroorzaken scanfouten wanneer codes in de buurt van andere visuele elementen worden geplaatst. Generieke styling communiceert geen merklegitimiteit, wat leidt tot aarzeling en verminderde scansnelheden.',
        'Naast technische beperkingen vertegenwoordigen legacy codes vaak gemiste branding mogelijkheden. Elke QR-code is een touchpoint met uw klant - een moment waarop ze actief betrokken zijn en bereid zijn om actie te ondernemen. Een professioneel gestyleerde code die past bij uw merkkleuren, bevat passende veiligheidsmarges, en functies optionele merkelementen transformeert dit hulpprogramma in een marketingactivat die uw identiteit versterkt bij elke interactie.',
      ],
    },
    {
      heading: 'Een QR-codeaudit uitvoeren',
      paragraphs: [
        'Begin uw upgradeproject door het creëren van een uitgebreide inventaris van elke QR-code die momenteel in uw bedrijf wordt ingezet. Documenteer de fysieke locatie, de gecodeerde bestemming, de huidige staat van het bedrukte materiaal en de typische scanomgeving, inclusief lichtomstandigheden en kijkhoeken. Test elke code met meerdere apparaten - oudere smartphones en budget apparaten onthullen vaak betrouwbaarheidsproblemen die premium telefoons masker.',
        'Bijzondere aandacht besteden aan codes in high-stakes locaties: betaalpunten, check-in gebieden, en promotionele displays waar scan falen direct invloed heeft op inkomsten of klantervaring. Deze moeten prioriteit krijgen voor onmiddellijke verbetering. Let ook op codes die verschijnen in fotografie of video-inhoud, want deze zullen coördinatie met uw marketingteam nodig hebben om visuele activa bij te werken.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-audit.png',
          alt: 'Een checklist interface met QR audit categorieën: locatie, conditie, scan betrouwbaarheid en prioriteitsbeoordeling',
          caption:
            'Systematische QR audit template voor het documenteren en prioriteren van uw upgrade kandidaten',
        },
      ],
    },
    {
      heading: 'De Safe Upgrade-strategie',
      paragraphs: [
        'De hoofdregel van QR upgrades is het behoud van de bestemming. Pak de exacte URL van elke bestaande code en codeer het identiek in uw nieuwe versie. Dit zorgt ervoor dat alle bestaande analytics, redirect logica en klantverwachtingen intact blijven. Als u bestemmingsflexibiliteit nodig heeft voor toekomstige updates, dan is dit het ideale moment om een branded short URL of redirect service in te voeren - maar implementeer dit als een apart project om samengestelde wijzigingen te voorkomen.',
        'Voor de visuele upgrade, breng verbeteringen in lagen: eerst zorgen voor technische betrouwbaarheid (passende foutcorrectie en rustige zone), dan merk styling (kleuren, module vormen), en ten slotte overwegen optionele verbeteringen (centeroverlays, frames). Elke laag moet worden gevalideerd door middel van tests alvorens verder te gaan. De veiligheidsmodus van ANQR helpt deze prioriteiten af te dwingen door te waarschuwen wanneer styling keuzes de scannability in gevaar kunnen brengen.',
      ],
    },
    {
      heading: 'Merkidentiteit toevoegen zonder Betrouwbaarheid te compromitteren',
      paragraphs: [
        'Effectieve QR branding balanceert visuele impact tegen scan betrouwbaarheid. Begin met kleur: vervang de standaard zwarte voorgrond met je primaire merkkleur, zodat er voldoende contrast is met je achtergrond. Voor de meeste merken werken donkere kleuren op lichte achtergronden het beste. Vermijd low-contrast combinaties, gradiënten die de helderheid van de rand verminderen, of kleuren die vergelijkbaar lijken onder gemeenschappelijke lichtomstandigheden.',
        'Module vorm aanpassing biedt een andere branding mogelijkheid met minimale betrouwbaarheid impact. Afgeronde modules zorgen voor een zachtere, meer toegankelijke uitstraling met behoud van uitstekende scannability. Dot-stijl modules werken goed voor moderne, tech-forward merken. Aangesloten modules passen bij industriële of bedrijfsidentiteit. Welke stijl u ook kiest, onderhoud consistentie in al uw QR-implementaties voor directe merkherkenning.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-branding.png',
          alt: 'Een kleurenwieldiagram met optimale QR kleurencombinaties met contrastverhoudingsindicatoren',
          caption:
            'Brand kleur selectie gids met een hoog contrast combinaties die de scan betrouwbaarheid te handhaven',
        },
      ],
    },
    {
      heading: 'Test- en valideringsprotocol',
      paragraphs: [
        'Nooit upgrade QR codes implementeren zonder strenge testen. Druk een fysiek bewijs af op de exacte grootte en op hetzelfde materiaal als je uiteindelijke inzet. Test op de werkelijke locatie waar de code zal leven, op verschillende tijdstippen van de dag om rekening te houden met lichtvariaties. Gebruik ten minste drie verschillende apparaten: een huidige vlaggenschiptelefoon, een middelgroot apparaat en een oudere of budget smartphone.',
        'Record scantijden en succespercentages voor elke test. Een goed geoptimaliseerde code moet binnen 1-2 seconden scannen op elk redelijk modern apparaat. Als u consistente vertragingen of storingen ziet, vermindert styling intensiteit - verwijder of krimp overlays, verhoog stille zone grootte, of schakel over naar een hogere foutcorrectie niveau. Betrouwbaarheid heeft altijd voorrang op visuele verfijning.',
      ],
    },
    {
      heading: 'Uw configuratie vergrendelen voor consistentie',
      paragraphs: [
        'Zodra u een optimale configuratie hebt gevalideerd, behoudt u deze met behulp van de deelbare koppelingen van ANQR. Dit maakt een permanent record van elke instelling die wordt gebruikt om uw goedgekeurde code te genereren - kleuren, modulestijl, foutcorrectie, grootte, en eventuele overlays. Deel deze link met uw ontwerpteam, drukverkopers en iedereen die de code in de toekomst moet reproduceren.',
        "Dit configuratie slot voorkomt de geleidelijke degradatie die veel QR implementaties plagen. Zonder dat, medewerkers recreëren codes van screenshots, ontwerpers herbouwen instellingen uit het geheugen, en print leveranciers maken 'hulpzame' aanpassingen. Elke variatie introduceert potentiële problemen. Met een vergrendelde configuratielink is elke reproductie identiek aan uw geteste, goedgekeurde origineel.",
      ],
      images: [
        {
          src: '/images/learn/improve-existing-lock.png',
          alt: 'Een diagram met configuratiedrift: screenshots die leiden tot recreaties die leiden tot varianten, versus een enkele bron van waarheid koppeling',
          caption:
            'Configuratiedrift voorkomen door het instellen van één gezaghebbende bron voor alle QR reproducties',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-0',
          label: 'QR voorbeelden bekijken',
          type: 'example',
        },
      ],
    },

    // Guide 2: QR Codes for Retail Payments
    {
      heading: 'QR-codes voor retailbetalingen',
      paragraphs: [
        'Betaling QR codes werken in de meest veeleisende omgeving in de detailhandel: het moment van transactie. Klanten zijn klaar om te betalen, vaak met een wachtrij vormen achter hen, en elke seconde van vertraging creëert wrijving. Toch is dit hogedrukmoment ook uitstekend vastgoed voor merkversterking. Deze gids legt uit hoe u betaal QR codes die direct scannen op banking apps, terwijl het presenteren van een professionele, branded uiterlijk dat het vertrouwen van de klant bouwt.',
        'Het basisprincipe voor betaal QR codes is betrouwbaarheid boven esthetiek. Een prachtig ontworpen code die niet scant op de banking app van een klant zal u veel meer kosten in verlaten transacties en gefrustreerde klanten dan een conservatief ontwerp ooit zou kunnen. Beginnen met compliance, betrouwbaarheid toevoegen, dan zorgvuldig laag in branding alleen waar het niet compromitteert de primaire functie.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-overview.png',
          alt: 'Een retail teller display toont een betaling QR code wordt gescand door een smartphone met een banking app',
          caption:
            'Betaling QR codes moeten direct werken met bank- en portemonnee apps onder real-world teller voorwaarden',
        },
      ],
    },
    {
      heading: 'Inzicht in betaal QR-normen',
      paragraphs: [
        'Betaling QR codes meestal regionale normen die de lading formaat dicteren. In Singapore maakt PayNow QR gebruik van specifieke opmaak. In India, UPI codes volgen BharatQR of UPI diepe link standaarden. Europese SEPA-betalingen gebruiken EPC-QR-codes. Elke standaard bestaat om ervoor te zorgen dat bankapps direct de betalingsinformatie kunnen herkennen en verwerken. Afwijken van deze normen - zelfs enigszins - kan leiden tot betaling apps om codes die generieke camera scanners gelezen zonder probleem te weigeren.',
        'ANQR bevat sjablonen voor grote betalingsnormen die automatisch uw merchantgegevens formatteren in conforme payloads. Gebruik altijd deze templates in plaats van handmatig het bouwen van betaling strings, zoals zelfs kleine formattering fouten kunnen leiden tot transactie fouten. Als de betaalstandaard van uw regio niet beschikbaar is als sjabloon, raadpleeg dan de technische documentatie van uw betalingsdienstaanbieder voor exacte formatteringsvereisten.',
      ],
    },
    {
      heading: 'Maten en plaatsen voor tellerweergaven',
      paragraphs: [
        'Counter-top QR codes staan voor unieke fysieke uitdagingen. Klanten scannen op armlengte, vaak in een hoek, soms door niezen bewakers of vitrines. Overhead verlichting creëert schittering vlekken. De code wedijvert met andere rommel om aandacht en heldere zichtlijnen. Maat uw betaling QR royaal - een minimum van 4-5 cm wordt aanbevolen voor de meeste teller toepassingen, opschalen als de code zit achter glas of in een dimlicht gebied.',
        'Positie is net zo belangrijk als grootte. Plaats de code waar klanten hun telefoon comfortabel kunnen vasthouden zonder de wachtrij te blokkeren of ongemakkelijk te bereiken. Hoek het display naar de klant in plaats van het plat leggen. Gebruik indien mogelijk matte laminatie- of niet-reflecterende displaymaterialen om de verblinding door bovenverlichting te minimaliseren. Test de laatste plaatsing op verschillende tijdstippen van de dag om verlichting problemen te vangen.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-placement.png',
          alt: 'Een diagram met optimale QR plaatsingshoogtes en hoeken voor verschillende tellerconfiguraties',
          caption:
            'Teller plaatsing gids: optimale hoogtes, hoeken en afstanden voor betrouwbare betaling scannen',
        },
      ],
    },
    {
      heading: 'Conservative Branding for Payment Codes',
      paragraphs: [
        'Betaalapps zijn minder vergevingsgezind dan generieke camerascanners. Veel banking apps gebruiken oudere, eenvoudigere QR leesalgoritmen geoptimaliseerd voor snelheid in plaats van flexibiliteit. Dit betekent styling die perfect werkt met een telefooncamera kan mislukken met specifieke betaalapps. Houd branding conservatief: gebruik uw merkkleur voor de voorgrond als het een sterk contrast behoudt, maar vermijd gradiënten, zware overlays of decoratieve elementen die de herkenning kunnen verstoren.',
        'Als u een centraal logo of overlay wilt, houd het dan uiterst klein - niet meer dan 10-15% van het QR gebied - en test uitgebreid met elke betaalapp die uw klanten gebruiken. Veel bedrijven kiezen voor geen overlay op betaalcodes specifiek, reserveren dat styling voor de marketing van QR-codes waar betrouwbaarheidseisen minder streng zijn. Het is de taak van de betaalcode om transacties te verwerken, niet om visueel indruk te maken.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-branding.png',
          alt: 'Een vergelijking die acceptabele versus riskante merkniveaus voor betaling QR codes toont',
          caption:
            'Betaal QR branding spectrum: van veilige conservatieve styling tot riskante decoratieve benaderingen',
        },
      ],
    },
    {
      heading: 'Materiële en afdrukken overwegingen',
      paragraphs: [
        'Het fysieke displaymateriaal beïnvloedt de betrouwbaarheid van de scan aanzienlijk. Glanzende laminatie reflecteert bovenlichten direct in de camera van de klant. Getextureerde materialen kunnen module randen vervormen. Goedkope afdrukken kunnen fijne details vervagen. Voor betaling QR codes, investeren in kwaliteit: gebruik matte of satijnen laminatie, zorgen voor hoge resolutie afdrukken, en vervangen displays voordat ze slijt. Een gekraste of vervaagde betaalcode kost u transacties.',
        'Overweeg de duurzaamheid van het display en de vervangbaarheid. Counter displays worden aangeraakt, verplaatst, opgeblazen, en soms omgestoten. Ontwerp uw displaysysteem zodat de QR-inzetstuk eenvoudig kan worden vervangen zonder de gehele stand te vervangen. Houd reserveprints klaar, gegenereerd door uw vergrendelde configuratielink, zodat versleten codes direct kunnen worden verwisseld.',
      ],
    },
    {
      heading: 'Testen met Real Payment Apps',
      paragraphs: [
        'Generieke camerascanners zullen bijna elke redelijk geformatteerde QR-code decoderen. Betaling apps zijn kieskeuriger. Voor het implementeren van een betaling QR-code, test het met elke betaalapp die uw klanten zouden kunnen gebruiken. In multi-payment omgevingen, dit kan betekenen testen met meerdere bancaire apps, digitale portefeuilles, en betaalplatforms. Document welke apps je hebt getest en hun versies - betaalapps werken regelmatig bij, en een update kan het scangedrag veranderen.',
        "Test onder realistische omstandigheden: de werkelijke weergave, werkelijke verlichting, werkelijke scanafstand. Een code die direct scant op uw bureau kan worstelen op de toonbank om 5 uur 's middags zon creëert schittering. Test met de oudste, goedkoopste smartphone die u kunt vinden - als het werkt betrouwbaar op een budget apparaat, het zal werken op alles. Vlag elke scantijd over 2 seconden voor onderzoek en mogelijke herontwerp.",
      ],
      images: [
        {
          src: '/images/learn/retail-payments-testing.png',
          alt: 'Een testchecklist met verschillende betaalapps, apparaattypes en omgevingsomstandigheden om te controleren',
          caption: 'Uitgebreide betaling QR testmatrix voor apps, apparaten en omgevingsfactoren',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-5',
          label: 'QR voorbeelden bekijken',
          type: 'example',
        },
      ],
    },

    // Guide 3: Print-Ready QR Codes
    {
      heading: 'Afdrukken-klaar QR-codes: SVG vs PNG',
      paragraphs: [
        'Het verschil tussen een QR-code die perfect scant en een code die faalt komt vaak neer op hoe het werd geëxporteerd en behandeld in de print workflow. Deze gids legt de kritische onderscheiding tussen vector (SVG) en raster (PNG) formaten uit, wanneer te gebruiken elk, en hoe om QR-kunstwerk over te dragen aan ontwerpers en print leveranciers op manieren die de scan betrouwbaarheid van visitekaartjes te behouden tot billboard-size signage.',
        'Printproductie introduceert variabelen die niet op het scherm bestaan: inktspreiding, substraattextuur, afwerkingsprocessen en het cumulatieve effect van meerdere bestandsconversies. Een QR-code die er perfect uitziet in uw ontwerpsoftware kan uit de printer komen met verzachtte randen, verminderd contrast of subtiel vervormde modules. Begrijpen format selectie en workflow beste praktijken voorkomt deze stille storingen.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-overview.png',
          alt: 'Een vergroot beeld waarin vector QR modules worden vergeleken met scherpe randen versus rastermodules die pixel artefacten tonen',
          caption:
            'Vector vs raster op printschaal: het precisieverschil dat de betrouwbaarheid van de scan bepaalt',
        },
      ],
    },
    {
      heading: 'Waarom Vector (SVG) voorkeur heeft voor afdrukken',
      paragraphs: [
        'SVG-bestanden beschrijven QR-codes als wiskundige vormen in plaats van rasters van pixels. Dit betekent dat de code op elke grootte kan worden geschaald - van een 1cm label tot een 10-meter banner - zonder verlies van randscherpte. De RIP (Raster Image Processor) van de printer geeft de vectoren weer bij de oorspronkelijke resolutie van het uitvoerapparaat, zodat elke modulerand zo scherp is als de hardware toelaat. Er is geen interpolatie, geen anti-aliasing artefacten, geen verzamelde vervaging van meerdere grootte bewerkingen.',
        'Naast schaalbaarheid zijn SVG-bestanden robuuster in professionele workflows. Ze overleven ronde-trips door ontwerpsoftware zonder degradatie. Ze kunnen zonder herhaling worden gecorrigeerd. Ze zitten netjes in PDF-bestanden voor drukklare uitvoer. Voor elke afdrukapplicatie waar kwaliteit belangrijk is, dient SVG uw standaard exportformaat te zijn.',
      ],
    },
    {
      heading: 'Wanneer PNG aanvaardbaar is',
      paragraphs: [
        'PNG wordt noodzakelijk wanneer uw workflow of bestemming platform geen vectorformaten ondersteunt. Sommige webplatforms, signage CMS-systemen en legacy print workflows vereisen rasterafbeeldingen. In deze gevallen kan PNG goed werken - maar alleen als je strikte regels volgt: exporteren bij de uiteindelijke fysieke grootte en resolutie, nooit opschalen na export, en vermijd elke verlies aan compressie of formaat conversie.',
        'De kritische regel voor PNG is om uw gewenste pixelafmetingen te berekenen voordat u exporteert. Als je QR op 5cm afdrukt en je printer op 300 DPI werkt, heb je ongeveer 590 pixels nodig. Exporteren op deze grootte of groter, dan schaal naar beneden indien nodig - nooit omhoog. Voeg deze informatie in uw bestandsnaam of metadata zodat toekomstige gebruikers niet per ongeluk misbruik maken van een grootte-specifieke export.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-resolution.png',
          alt: 'Een calculator interface toont de relatie tussen fysieke grootte, DPI, en vereiste pixel afmetingen',
          caption:
            'Resolutiecalculator afdrukken: het bepalen van de minimale pixelafmetingen voor uw uitvoergrootte',
        },
      ],
    },
    {
      heading: 'ANQR-exportopties uitgelegd',
      paragraphs: [
        'ANQR biedt verschillende SVG-exportmodi voor verschillende workflows. True Vector-modus produceert pure path-based output ideaal voor print- en professionele ontwerptools. Wanneer je rasteroverlays of bepaalde effecten hebt toegevoegd, kan ANQR deze insluiten tijdens het onderhouden van vectormodules, of je kunt een volledig gerasterde versie exporteren met de opgegeven resolutie. Het begrijpen van deze opties helpt u kiezen voor de juiste export voor elke use case.',
        'Voor PNG export kunt u met ANQR exacte afmetingen specificeren en opties voor transparante achtergronden bevatten. De DPI-instelling helpt u bij het berekenen van de juiste maten voor afdrukken, maar vergeet niet dat DPI metadata is - wat belangrijk is voor afdrukken is het hebben van voldoende pixels voor uw fysieke grootte. Bij twijfel, exporteren groter dan je denkt dat je nodig hebt; schalen omlaag behoudt kwaliteit terwijl schaalvergroting vernietigt het.',
      ],
    },
    {
      heading: 'Bestanden voorbereiden voor overdracht',
      paragraphs: [
        'Bij het doorgeven van QR-kunstwerk aan ontwerpers of drukverkopers, omvatten duidelijke specificaties: de beoogde fysieke grootte, minimale eisen aan de rustige zone, en eventuele kleurruimte overwegingen. Voor kritische toepassingen kunt u zowel een SVG-master als een PNG-back-up met een hoge resolutie leveren, die duidelijk is voorzien van de beoogde toepassingen. Inclusief uw ANQR configuratie link zodat de code kan worden geregenereerd indien nodig.',
        'Anticipeer algemene fouten in het overdrachtsproces. Geef duidelijk aan dat de QR niet moet worden geschaald, gedraaid, scheefgetrokken of effecten mag hebben. Specificeer dat de stille zone duidelijk moet blijven - geen gewasmerken, registratiemerken of ontwerpelementen storen. Indien de QR op een gekleurde of fotografische achtergrond wordt geplaatst, moet een versie met een ondoorzichtige steunvorm worden verstrekt om voldoende contrast te garanderen.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-handoff.png',
          alt: 'Een bestandspakketdiagram met SVG master, PNG back-up, specificaties document en configuratie koppeling',
          caption:
            'Professioneel QR-handoffpakket: alles wat een ontwerper of printverkoper nodig heeft voor nauwkeurige reproductie',
        },
      ],
    },
    {
      heading: 'Controleren van afdrukproeven',
      paragraphs: [
        'Nooit een afdruk goedkeuren zonder een fysiek bewijs te scannen. Vraag een bewijs afgedrukt op het werkelijke substraat met de werkelijke afwerking die zal worden gebruikt in de productie. Scan het bewijs onder lichtomstandigheden die vergelijkbaar zijn met waar het laatste stuk zal worden weergegeven. Test met meerdere apparaten, waaronder oudere smartphones die misschien worstelen met marginale kwaliteit.',
        'Als het bewijs langzaam of inconsistent scant, onderzoek het dan voordat het wordt goedgekeurd. Veel voorkomende problemen omvatten onvoldoende contrast op gekleurde substraten, inbreuken in de rustige zone van trimmen, inkt spread verzachtende module randen, of lamineren het creëren van schittering. Elk van deze kan worden aangepakt voordat u zich verbindt tot een volledige print run - maar alleen als u ze te vangen in het bewijs stadium.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-proof.png',
          alt: 'Een testchecklist met scanresultaten, contrastmetingen en goedkeuringshandtekeningen',
          caption:
            'Print proof verificatie workflow: systematische testen alvorens zich te verbinden aan productiehoeveelheden',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-11',
          label: 'QR voorbeelden bekijken',
          type: 'example',
        },
      ],
    },

    // Guide 4: Animated QR Codes
    {
      heading: 'Geanimeerde QR-codes aanmaken',
      paragraphs: [
        'Geanimeerde QR-codes combineren de functionaliteit van standaard QR-codes met opvallende bewegingen die de inzetcijfers drastisch verhogen. In digitale bewegwijzering, sociale media en interactieve displays transformeert animatie een statisch nut in een meeslepend visueel element dat het oog trekt en interactie uitnodigt. Deze gids behandelt de principes, technieken en praktische beperkingen van het creëren van geanimeerde QR codes die betrouwbaar scannen terwijl het leveren van visuele impact.',
        'De fundamentele uitdaging van geanimeerde QR codes is het balanceren van visuele interesse tegen scan betrouwbaarheid. Elk frame moet individueel te scannen zijn - een scanner kan de code op elk punt in de animatiecyclus vastleggen. Deze beperking vormt elke ontwerpbeslissing: welke elementen kunnen bewegen, hoeveel ze kunnen veranderen en wat stabiel moet blijven gedurende de animatie.',
      ],
      images: [
        {
          src: '/images/learn/animated-overview.png',
          alt: 'Een digitaal bewegwijzeringsscherm met een geanimeerde QR-code die de aandacht van de kijker in een openbare ruimte vastlegt',
          caption:
            'Geanimeerde QR codes in digitale bewegwijzering: beweging die aandacht trekt en scanning stimuleert',
        },
      ],
    },
    {
      heading: 'Hoe Animatie invloed heeft op de uitstraling',
      paragraphs: [
        'QR scanners werken door het vastleggen van een enkel frame en het analyseren van het patroon van licht en donker modules. Om een geanimeerde code te laten werken, moet elk frame het volledige, geldige QR patroon bevatten. Dit sluit animaties uit die de codestructuur veranderen, modules oplossen of het contrastpatroon aanzienlijk veranderen. De gegevensdragers - het schijnbaar willekeurige patroon in het centrum - moeten visueel stabiel blijven.',
        'Veilige animatiebenaderingen wijzigen elementen die geen gegevens bevatten: achtergronden, kleuren, decoratieve frames en overlay elementen. De structurele componenten - zoekpatronen (de grote hoekvierkanten), timingpatronen (de afwisselende lijnen) en uitlijningspatronen (kleinere vierkanten in grotere codes) - moeten hun posities en verhoudingen behouden. Werken binnen deze beperkingen zorgt nog steeds voor verrassend dynamische en boeiende animaties.',
      ],
    },
    {
      heading: 'Animatietechnieken Dat werk',
      paragraphs: [
        'Kleur Fietsen animeert de voorgrond- en achtergrondkleuren door een palet met behoud van voldoende contrast bij elke stap. Dit zorgt voor een levendig, aandacht grijpend effect met een minimaal scanrisico - zolang contrast nooit onder leesbaar niveau daalt. De presets van de kleurcyclus van ANQR zijn ontworpen om de scannabiliteit gedurende de hele cyclus te behouden.',
        'Geanimeerde overlays plaatsen bewegende beelden achter een semi-transparant QR patroon. De code blijft stabiel terwijl de achtergrond animeert - misschien een looping video, geanimeerde merkelementen, of abstracte motion graphics. Deze techniek vereist zorgvuldige intensiteitsmanagement om te voorkomen dat de achtergrond het QR patroon overweldigen, maar creëert de meest visueel opvallende resultaten.',
      ],
      images: [
        {
          src: '/images/learn/animated-layers.png',
          alt: 'Een diagram met de gelaagde structuur van een geanimeerde QR: stabiele codelaag over geanimeerde achtergrondlaag',
          caption:
            'Animatielaagprincipe: het QR-patroon blijft constant terwijl achtergrondelementen zich onderaan animeren',
        },
      ],
    },
    {
      heading: 'Animatieparameters instellen',
      paragraphs: [
        'Framesnelheid beïnvloedt zowel visuele gladheid als bestandsgrootte. Voor de meeste toepassingen biedt 10-15 frames per seconde een soepele beweging zonder buitensporige bestandsgrootte. Hogere frame rates bieden minder visueel rendement, terwijl aanzienlijk toenemende bestandsgroottes. Overweeg uw levering context - een groot digitaal teken kan grotere bestanden dan een mobiele advertentie plaatsing.',
        'Loop gedrag bepaalt hoe de animatie cycli. Naadloze lussen creëren continue beweging ideaal voor bewegwijzering en ambient displays. Ping-pong (forward-then-reverse) loops werken goed voor eenvoudige animaties. Voor aandacht grijpende pulsen, overwegen animaties met holds - perioden van stilte doorgedrukt door beweging die trekt het oog zonder constante beweging vermoeidheid.',
      ],
    },
    {
      heading: 'Geanimeerde overlays aanmaken',
      paragraphs: [
        "Bij het gebruik van geanimeerde afbeeldingen (GIF's, geanimeerde WebP's, of video) als overlays haalt ANQR frames uit en combineert ze met uw QR-code. De overlay intensiteit instelling bepaalt hoeveel van de animatie toont door - lagere waarden prioriteit scannability terwijl hogere waarden voorkeur visuele impact. Test uw gekozen intensiteit over meerdere frames om consistente scannabiliteit te garanderen.",
        'De materiaalkwaliteit van de bron heeft een significant effect op de resultaten. Gebruik overlays met duidelijke onderwerpen en goed contrast. Vermijd bronanimaties met snel knipperen of extreme helderheidsveranderingen die af en toe lage contrastframes kunnen creëren. Een voorbeeld van de volledige animatiecyclus voordat u exporteert om eventuele problematische frames te vangen die niet kunnen scannen.',
      ],
      images: [
        {
          src: '/images/learn/animated-frames.png',
          alt: 'Een frame-voor-frame weergave van een geanimeerde overlay met contrastniveaus die in de reeks worden gehandhaafd',
          caption:
            'Frame analyse: het controleren van consistente scannabiliteit gedurende de gehele animatiecyclus',
        },
      ],
    },
    {
      heading: 'Uitvoer- en leveringsoverwegingen',
      paragraphs: [
        "GIF blijft de meest ondersteunde geanimeerde formaat, automatisch afspelen in de meeste contexten zonder ondersteuning van de videospeler. GIF's 256-kleurenpalet beperkt echter de kleurtrouw. Voor kleurkritische animaties, overwegen geanimeerde WebP waar ondersteund, of terugvallen op video-formaten voor de hoogste kwaliteit. De GIF-export van ANQR omvat ditheringopties om de kwaliteit binnen paletbeperkingen te maximaliseren.",
        'Bestandsgrootte is belangrijk voor levering. Digitale bewegwijzeringssystemen, e-mailclients en sociale platforms leggen vaak groottelimieten op. Als uw animatie deze grenzen overschrijdt, vermindert u het aantal frames, afmetingen of kleurdiepte. Soms bereikt het splitsen van een complexe animatie in een kortere lus betere resultaten dan agressieve compressie die elk frame degradeert.',
      ],
    },
    {
      heading: 'Geanimeerde QR-codes testen',
      paragraphs: [
        'Het testen van geanimeerde codes vereist scannen op meerdere punten in de animatiecyclus. Niet één keer scannen en succes aannemen - herhaaldelijk scannen, op verschillende momenten, om te controleren of elk frame leesbaar is. Bijzondere aandacht besteden aan frames bij kleurcyclus extremen of overlay intensiteit pieken waar contrast het laagst kan zijn.',
        'Testen op de werkelijke display hardware waar mogelijk. Monitor kleurkalibratie, kijkhoek en omgevingsverlichting alle invloed op hoe de animatie verschijnt en scant. Een heldere animatie die perfect scant op uw monitor kan uitspoelen op een buitenscherm of onleesbaar worden in schuine kijkhoeken.',
      ],
      images: [
        {
          src: '/images/learn/animated-testing.png',
          alt: 'Een testmatrix met scansuccessnelheden over verschillende frames, apparaten en weergaveomstandigheden',
          caption:
            'Geanimeerde QR-testprotocol: systematische verificatie over frames, apparaten en kijkomstandigheden',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-17',
          label: 'QR voorbeelden bekijken',
          type: 'example',
        },
      ],
    },

    // Guide 5: QR Safety & Compliance
    {
      heading: 'Veiligheid en naleving van QR Beste praktijken',
      paragraphs: [
        'Een prachtig ontworpen QR-code die niet scant is erger dan nutteloos - het frustreert klanten, schaadt merkperceptie, en verspilt elke bron geïnvesteerd in de creatie en distributie. Deze handleiding behandelt de technische en praktische factoren die bepalen of een QR-code betrouwbaar zal scannen, en hoe de veiligheidskenmerken van ANQR kunnen worden gebruikt om potentiële problemen op te vangen voordat ze de productie bereiken.',
        'QR code betrouwbaarheid is niet binair. Een code kan perfect scannen op vlaggenschip telefoons, maar falen op budget apparaten. Het kan werken in ideale verlichting, maar worstelen in dim restaurants of helder zonlicht. Het begrijpen van de factoren die van invloed zijn scannability helpt u om geïnformeerde tradeoffs tussen visuele styling en betrouwbaarheid in de echte wereld.',
      ],
      images: [
        {
          src: '/images/learn/safety-overview.png',
          alt: 'Een betrouwbaarheidsspectrum met QR codes variërend van zeer scannable tot marginaal leesbaar',
          caption:
            'Het scannability spectrum: van kogelvrije codes tot styling die betrouwbaarheidsgrenzen verleggen',
        },
      ],
    },
    {
      heading: 'Inzicht in foutcorrectieniveaus',
      paragraphs: [
        'QR codes omvatten ingebouwde redundantie waarmee ze kunnen worden gelezen, zelfs wanneer gedeeltelijk beschadigd of verduisterd. Het foutcorrectieniveau - L (7%), M (15%), Q (25%) of H (30%) - bepaalt hoeveel van de code kan ontbreken terwijl nog steeds correct wordt gedecodeerd. Hogere foutcorrectie creëert grotere codes, maar biedt een veiligheidsmarge voor overlays, druk imperfecties en milieuschade.',
        'Voor codes met afbeeldingsoverlays, foutcorrectieniveau H is essentieel - de overlay verduistert een deel van de code, en je hebt die 30% redundantie nodig om de betrouwbaarheid te behouden. Voor schone, ongestileerde codes in gecontroleerde omgevingen volstaat level M vaak. Niveau L dient te worden gereserveerd voor situaties waar de codegrootte kritisch beperkt is en u kunt ongerepte omstandigheden garanderen.',
      ],
    },
    {
      heading: 'De kritieke stille zone',
      paragraphs: [
        'De rustige zone is de lege marge rond elke QR code. Scanners gebruiken deze grens om te bepalen waar de code begint en eindigt. De ISO-norm specificeert een minimum rustige zone van vier modules (vier keer de breedte van het kleinste vierkant in de code). Het schenden van deze ruimte - met ontwerpelementen, trimranden of aangrenzende inhoud - is een van de meest voorkomende oorzaken van scanfouten.',
        'De handhaving van de stille zone van ANQR helpt deze kritische afstand te behouden, maar u moet er ook voor zorgen dat het bewaard blijft in uw definitieve ontwerpen. Bij het afleveren van QR-artwork, expliciet de eisen voor de stille zone specificeren. Controleer bij het plaatsen van codes in lay-outs of er geen elementen in deze ruimte binnendringen. Een paar millimeter heldere ruimte kan het verschil betekenen tussen betrouwbaar scannen en gefrustreerde klanten.',
      ],
      images: [
        {
          src: '/images/learn/safety-quietzone.png',
          alt: 'Een diagram met de juiste afstand tussen de stille zone en algemene schendingen die scanfouten veroorzaken',
          caption: 'Rustige zonevereisten: de onzichtbare marge die het succes van de scan bepaalt',
        },
      ],
    },
    {
      heading: 'Contrast en kleurveiligheid',
      paragraphs: [
        'QR-scanners detecteren het patroon van lichte en donkere modules. Elke styling die dit contrast vermindert - lichte voorgrond, donkere achtergronden, gradiënteffecten of laag-opacity overlays - maakt de code moeilijker te lezen. ANQR berekent contrastverhoudingen en waarschuwt wanneer uw kleurkeuzes gevaarlijke niveaus benaderen, maar de uiteindelijke scheidsrechter is altijd real-world testing.',
        'Kleurperceptie varieert per lichtomstandigheden. Een kleurcombinatie die hoog contrast op uw monitor lijkt, kan moeilijk te onderscheiden zijn onder warme gloeilampverlichting of koele fluorescerende buizen. Als uw code onder verschillende lichtomstandigheden zal worden ingezet, test dan onder meerdere lichtbronnen en beschouw meer conservatieve contrastverhoudingen als een veiligheidsmarge.',
      ],
    },
    {
      heading: 'Modulegrootte en weergaveafstand',
      paragraphs: [
        'De fysieke grootte van individuele modules bepaalt de maximale afstand van waaruit een code kan worden gescand. Kleinere modules betekenen kleinere codes maar vereisen grotere scanafstanden. De algemene regel is dat elke module ten minste 0,5 mm moet zijn op de beoogde scanafstand, evenredig opschalen voor grotere afstanden. Een code op een reclamebord heeft veel grotere modules nodig dan een code op een visitekaartje.',
        "Bij het berekenen van modulegrootte, rekening houden met het worst-case scenario: de klant met een oudere telefoon, in onvolmaakte verlichting, scannen op de maximale waarschijnlijke afstand. Ontwerp voor deze gebruiker, en iedereen zal een nog betere ervaring hebben. ANQR's grootte aanbevelingen factor in deze reële variabelen om passende afmetingen voor uw beoogde gebruik te suggereren.",
      ],
      images: [
        {
          src: '/images/learn/safety-distance.png',
          alt: 'Een grafiek met betrekking tot modulegrootte, afdrukafmetingen en maximale effectieve scanafstand',
          caption:
            'Scanning afstand gids: het aanpassen van module grootte aan uw implementatie eisen',
        },
      ],
    },
    {
      heading: 'Gebruik van ANQR-veiligheidsmodus',
      paragraphs: [
        "De veiligheidsmodus van ANQR geeft real-time feedback over scanbetrouwbaarheid. Het controleert contrast ratio's, rustige zone compliance, overlay intensiteit, en andere factoren die de scannability beïnvloeden. Wanneer een parameter riskante niveaus benadert, zie je waarschuwingen met specifieke richtlijnen over hoe om de betrouwbaarheid te verbeteren. Voor professionele implementaties waar falen duur is, houdt de veiligheidsmodus gedurende het hele ontwerpproces actief.",
        'Veiligheidsmodus bevat ook een scan verificatie functie die probeert om uw gegenereerde code te decoderen en rapporten succes of mislukking. Hoewel deze in-app verificatie niet elke realiteit kan repliceren, worden er veel gemeenschappelijke problemen opgevangen voordat je investeert in printen of distributie. Beschouw succesvolle verificatie als een minimum staaf, geen garantie - real-world testen blijft essentieel.',
      ],
    },
    {
      heading: 'Testprotocollen in de praktijk',
      paragraphs: [
        'Geen enkele hoeveelheid softwareverificatie vervangt fysieke tests. Print uw code op de gewenste grootte op representatief materiaal. Test het in de eigenlijke implementatieomgeving met lichtomstandigheden die overeenkomen met echt gebruik. Scannen met meerdere apparaten - niet alleen uw vlaggenschip telefoon, maar budget Android-apparaten, oudere iPhones, en alle specifieke apparaten die uw publiek vaak gebruikt.',
        'Documenteer uw testen systematisch. Noteer welke apparaten werden getest, onder welke omstandigheden, met welke resultaten. Als u codes op schaal inzet, stelt u acceptatiecriteria vast: misschien 95% succespercentage in uw testpool of succesvolle scans binnen 2 seconden op alle geteste apparaten. Deze normen helpen om go/no-go beslissingen objectief te maken in plaats van te hopen op het beste.',
      ],
      images: [
        {
          src: '/images/learn/safety-testing.png',
          alt: 'Een uitgebreide testchecklist met betrekking tot apparaten, voorwaarden en acceptatiecriteria',
          caption:
            'QR-implementatietestprotocol: systematische verificatie vóór productietoezegging',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#safety',
          label: 'Open de generator',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-0',
          label: 'QR voorbeelden bekijken',
          type: 'example',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/examples?lang=${lang}', label: 'QR voorbeelden bekijken', type: 'example' },
    {
      href: '/guide?lang=${lang}',
      label: 'De volledige gebruikershandleiding openen',
      type: 'guide',
    },
    { href: '/gallery?lang=${lang}', label: 'Galerie openen', type: 'gallery' },
  ],
};
