import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

// Template for the /learn page with 5 comprehensive guides
// All string values are numeric ids that map to lines in en-GB.txt.
export const learn: PageDefinition = {
  title: 'Leer met ANQR',
  description: 'Praktische handleidingen voor het verbeteren van QR-campagnes, betalingen, marketing en delen in meerdere talen.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open de generator', type: 'generator' },
    { href: '/guide?lang=${lang}', label: 'Open de volledige gebruikershandleiding', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Bekijk QR-voorbeelden', type: 'example' },
  ],
  sections: [
    // Guide 1: Improving Existing QR Campaigns (685-700)
    {
      heading: 'Verbetering van bestaande QR-campagnes',
      paragraphs: ['Hoe u bestaande QR-codes kunt controleren, upgraden en veilig vervangen zonder de gebruikerstrajecten te onderbreken.'],
      images: [{ src: '/images/learn/campaign-overview.svg', alt: 'Verbetering van bestaande QR-campagnes', caption: 'Hoe u bestaande QR-codes kunt controleren, upgraden en veilig vervangen zonder de gebruikerstrajecten te onderbreken.' }],
    },
    {
      heading: 'Waarom bestaande QR-codes upgraden?',
      paragraphs: ['Veel bedrijven hebben al QR-codes in omloop – op verpakkingen, bewegwijzering, drukwerk of producten. Deze codes maken vaak gebruik van basisontwerpen zonder branding, slechte foutcorrectie of onvoldoende stille zones. Als u deze upgradet, kunt u de scanbetrouwbaarheid, merkherkenning en campagnetracking verbeteren zonder de bestemmings-URL te wijzigen.'],
    },
    {
      heading: 'Controle van uw huidige QR-codes',
      paragraphs: ['Controleer wat u heeft voordat u een QR-code vervangt. Scan elke code met meerdere apps (iOS Camera, Google Lens, speciale QR-scanners) om te controleren of ze werken. Let op de gecodeerde inhoud, het afdrukformaat, de plaatsing en eventuele scanproblemen. Documenteer welke codes op permanente materialen (geëtste borden, productverpakkingen) staan ​​versus tijdelijke materialen (posters, flyers).'],
      images: [
        { src: '/images/learn/campaign-before.svg', alt: 'Controle van uw huidige QR-codes', caption: 'Controleer wat u heeft voordat u een QR-code vervangt. Scan elke code met meerdere apps (iOS Camera, Google Lens, speciale QR-scanners) om te controleren of ze werken. Let op de gecodeerde inhoud, het afdrukformaat, de plaatsing en eventuele scanproblemen. Documenteer welke codes op permanente materialen (geëtste borden, productverpakkingen) staan ​​versus tijdelijke materialen (posters, flyers).' },
        { src: '/images/learn/campaign-after.svg', alt: 'Controle van uw huidige QR-codes', caption: 'Controleer wat u heeft voordat u een QR-code vervangt. Scan elke code met meerdere apps (iOS Camera, Google Lens, speciale QR-scanners) om te controleren of ze werken. Let op de gecodeerde inhoud, het afdrukformaat, de plaatsing en eventuele scanproblemen. Documenteer welke codes op permanente materialen (geëtste borden, productverpakkingen) staan ​​versus tijdelijke materialen (posters, flyers).' },
      ],
    },
    {
      heading: 'Veilige vervangingsstrategie',
      paragraphs: ['Voor codes op permanent materiaal kunt u overwegen een URL-verkorter of omleidingsservice te gebruiken, zodat u de bestemming kunt wijzigen zonder deze opnieuw af te drukken. Voor tijdelijke materialen kunt u veilig vervangen door verbeterde ontwerpen. Test de nieuwe code altijd op werkelijke afdrukgrootte vóór massaproductie.'],
    },
    {
      heading: 'Veilig branding toevoegen',
      paragraphs: ['Met ANQR kunt u logo\'s en merkkleuren toevoegen terwijl de scanbaarheid behouden blijft. Gebruik Foutcorrectie H (Hoog) bij het toevoegen van overlays: dit zorgt voor 30% redundantie. Schakel \'Preserve Finder Patterns\' in om de hoekvierkanten intact te houden. Begin met een lage overlay-intensiteit (50-70%) en test grondig.'],
    },
    {
      heading: 'Print versus digitale overwegingen',
      paragraphs: ['Voor het afdrukken van QR-codes is een hogere resolutie (300+ DPI) en grotere stille zones nodig om rekening te houden met de papiertextuur en kijkafstand. Digitale QR-codes op schermen kunnen kleiner zijn, maar moeten rekening houden met schermverblinding en vernieuwingsfrequenties. De veiligheidsmodus van ANQR helpt bij het afdwingen van minimumgroottes voor beide contexten.'],
    },
    {
      heading: 'Uw geüpgradede codes testen',
      paragraphs: ['Test altijd met: (1) Meerdere scanner-apps, (2) Verschillende lichtomstandigheden, (3) Verschillende afstanden, (4) Het daadwerkelijke printmateriaal of schermtype. De ingebouwde validatie van ANQR scant de gegenereerde code om te verifiëren dat deze correct wordt gedecodeerd.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#overlay', label: 'Open de aanbevolen instellingen van deze handleiding in de ANQR-generator.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Zie gerelateerde handleidingen en voorbeelden', type: 'example' },
      ],
    },

    // Guide 2: QR Codes for Retail Payments (701-714)
    {
      heading: 'QR-codes voor retailbetalingen',
      paragraphs: ['Ontwerp QR-codes voor betalingen die snel kunnen worden gescand, merkgebonden en compatibel zijn met de belangrijkste portemonnees.'],
      images: [{ src: '/images/learn/retail-payment-overview.svg', alt: 'QR-codes voor retailbetalingen', caption: 'Ontwerp QR-codes voor betalingen die snel kunnen worden gescand, merkgebonden en compatibel zijn met de belangrijkste portemonnees.' }],
    },
    {
      heading: 'Betaling QR-vereisten',
      paragraphs: ['QR-codes voor betalingen stellen strengere eisen dan marketingcodes. Ze moeten snel scannen (klanten wachten), werken met specifieke portemonnee-apps en voldoen aan compliancenormen. De meeste betalingsstandaarden (UPI, PayNow, SEPA) specificeren exacte coderingsformaten die ANQR ondersteunt.'],
    },
    {
      heading: 'Maatvoering voor verkooppunten',
      paragraphs: ['Voor toonbankdisplays zijn codes van minimaal 3 cm (1,2 inch) nodig voor handmatig scannen op een afstand van 15-30 cm. Aan de muur gemonteerde codes voor het scannen van wachtrijen moeten 8-15 cm (3-6 inch) zijn voor een afstand van 0,5-2 m. De veiligheidsmodus van ANQR dwingt minimale modulegroottes af die geschikt zijn voor betalingscontexten.'],
      images: [{ src: '/images/learn/retail-sizing.svg', alt: 'Maatvoering voor verkooppunten', caption: 'Voor toonbankdisplays zijn codes van minimaal 3 cm (1,2 inch) nodig voor handmatig scannen op een afstand van 15-30 cm. Aan de muur gemonteerde codes voor het scannen van wachtrijen moeten 8-15 cm (3-6 inch) zijn voor een afstand van 0,5-2 m. De veiligheidsmodus van ANQR dwingt minimale modulegroottes af die geschikt zijn voor betalingscontexten.' }],
    },
    {
      heading: 'Branding binnen compliance',
      paragraphs: ['QR-codes voor betalingen kunnen de branding van verkopers bevatten, maar met beperkingen. Houd logo\'s klein (minder dan 20% van het codegebied), behoud een hoog contrast en wijzig nooit zoekerpatronen. Gebruik Foutcorrectie H en test met de daadwerkelijke betaalapps die uw klanten gebruiken (Google Pay, Apple Wallet, bankapps).'],
    },
    {
      heading: 'POS-displaymateriaal',
      paragraphs: ['Gelamineerde beeldschermen zijn bestand tegen vingerafdrukken, maar kunnen verblinding veroorzaken. Matte afwerkingen scannen beter in heldere omgevingen. Schuine standaarden (15-30°) verminderen reflecties. Houd rekening met omgevingsfactoren: buitenbetaalpunten hebben bescherming tegen weersinvloeden nodig en hebben mogelijk grotere codes nodig voor variabele verlichting.'],
    },
    {
      heading: 'Regionale betalingsstandaarden',
      paragraphs: ['ANQR ondersteunt regionale betalingsformaten: UPI/BharatQR (India), PayNow (Singapore), PromptPay (Thailand), PIX (Brazilië), SEPA/EPC (Europa) en meer. Elk heeft specifieke veldvereisten. Gebruik de betalingssjablonen van ANQR om naleving te garanderen.'],
    },
    {
      heading: 'Betaalcodes testen',
      paragraphs: ['Test met daadwerkelijke betaalapps, niet alleen met generieke QR-scanners. Controleer of het betalingsbedrag, de gegevens van de ontvanger en de referentievelden correct zijn geparseerd. Test in de daadwerkelijke installatieomgeving met echte lichtomstandigheden.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#payload', label: 'Open de aanbevolen instellingen van deze handleiding in de ANQR-generator.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Zie gerelateerde handleidingen en voorbeelden', type: 'example' },
      ],
    },

    // Guide 3: Print-Ready QR Codes: SVG vs PNG (715-728)
    {
      heading: 'Afdrukklare QR-codes: SVG versus PNG',
      paragraphs: ['Waarom vectorformaten belangrijk zijn voor drukwerk en hoe je QR-codes kunt exporteren die perfect schalen.'],
      images: [{ src: '/images/learn/print-svg-overview.svg', alt: 'Afdrukklare QR-codes: SVG versus PNG', caption: 'Waarom vectorformaten belangrijk zijn voor drukwerk en hoe je QR-codes kunt exporteren die perfect schalen.' }],
    },
    {
      heading: 'Waarom SVG voor print?',
      paragraphs: ['SVG-bestanden (Scalable Vector Graphics) bevatten wiskundige beschrijvingen van vormen, geen pixels. Dit betekent dat ze oneindig schalen zonder kwaliteitsverlies. Een QR-code die als SVG met 100px wordt geëxporteerd, wordt perfect op posterformaat afgedrukt, terwijl een PNG van hetzelfde formaat wazig of korrelig zou zijn.'],
    },
    {
      heading: 'Wanneer PNG acceptabel is',
      paragraphs: ['PNG werkt prima als: (1) u exporteert met de uiteindelijke afdrukresolutie (bijvoorbeeld 300 DPI x fysieke grootte), (2) de code niet wordt opgeschaald, (3) u digitale beeldschermen gebruikt met bekende resoluties. Voor flexibiliteit en toekomstbestendigheid heeft SVG nog steeds de voorkeur.'],
      images: [
        { src: '/images/learn/print-png-pixelated.svg', alt: 'Wanneer PNG acceptabel is', caption: 'PNG werkt prima als: (1) u exporteert met de uiteindelijke afdrukresolutie (bijvoorbeeld 300 DPI x fysieke grootte), (2) de code niet wordt opgeschaald, (3) u digitale beeldschermen gebruikt met bekende resoluties. Voor flexibiliteit en toekomstbestendigheid heeft SVG nog steeds de voorkeur.' },
        { src: '/images/learn/print-svg-crisp.svg', alt: 'Wanneer PNG acceptabel is', caption: 'PNG werkt prima als: (1) u exporteert met de uiteindelijke afdrukresolutie (bijvoorbeeld 300 DPI x fysieke grootte), (2) de code niet wordt opgeschaald, (3) u digitale beeldschermen gebruikt met bekende resoluties. Voor flexibiliteit en toekomstbestendigheid heeft SVG nog steeds de voorkeur.' },
      ],
    },
    {
      heading: 'ANQR SVG-exportopties',
      paragraphs: ['ANQR biedt twee SVG-modi: \'True Vector\' creëert pure, op paden gebaseerde SVG die perfect schaalt en kan worden bewerkt in Illustrator/Inkscape. \'Raster Embed\' omvat elke overlay-afbeelding als een ingebedde bitmap - handig als u overlays nodig heeft maar toch vectormodulevormen wilt.'],
    },
    {
      heading: 'Integratie van printworkflows',
      paragraphs: ['Exporteer SVG vanuit ANQR en importeer vervolgens in uw ontwerpsoftware (InDesign, Illustrator, Canva Pro). Plaats de QR-code op het definitieve afdrukformaat en controleer of de stille zone behouden blijft. De meeste drukkerijen geven de voorkeur aan PDF-levering; uw ontwerpsoftware kan de SVG in de uiteindelijke PDF insluiten.'],
    },
    {
      heading: 'Resolutie en DPI-instellingen',
      paragraphs: ['Voor PNG-export bedoeld voor afdrukken: vermenigvuldig uw fysieke grootte met DPI. Een 2-inch code bij 300 DPI heeft 600×600px nodig. De DPI-instelling van ANQR integreert deze metadata voor printsoftware. Voor schermen is 72-96 DPI standaard.'],
    },
    {
      heading: 'Voorkom veelvoorkomende printfouten',
      paragraphs: ['Niet doen: exporten met lage resolutie opschalen, QR-afbeeldingen comprimeren als JPEG (artefacten breken het scannen af), codes in vouw-/snijzones plaatsen of stille zones verkleinen om in lay-outs te passen. Doen: exporteren op doelformaat, verliesvrije formaten gebruiken, daadwerkelijke afdrukvoorbeelden testen.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#output', label: 'Open de aanbevolen instellingen van deze handleiding in de ANQR-generator.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Zie gerelateerde handleidingen en voorbeelden', type: 'example' },
      ],
    },

    // Guide 4: Animated QR Codes for Digital Signage (729-742)
    {
      heading: 'Geanimeerde QR-codes voor digitale signage',
      paragraphs: ['Wanneer en hoe geanimeerde QR-codes op schermen te gebruiken terwijl ze scanbaar blijven.'],
      images: [{ src: '/images/learn/animation-overview.svg', alt: 'Geanimeerde QR-codes voor digitale signage', caption: 'Wanneer en hoe geanimeerde QR-codes op schermen te gebruiken terwijl ze scanbaar blijven.' }],
    },
    {
      heading: 'Wanneer animatie helpt',
      paragraphs: ['Animatie trekt de aandacht op drukke digitale schermen waar statische inhoud wordt genegeerd. Subtiele animaties (zachte puls, kleurverschuiving) trekken de aandacht zonder het scannen te verstoren. Animatie werkt het beste voor: winkelschermen, evenementendisplays, interactieve kiosken en sociale media-inhoud.'],
    },
    {
      heading: 'Wanneer animatie pijn doet',
      paragraphs: ['Vermijd animaties voor: QR-codes voor betalingen (snelheid is belangrijk), codes die kort worden bekeken (transit-advertenties), codes op schermen met slechte vernieuwingsfrequenties of wanneer de omgeving veel concurrerende beelden heeft. Test bij twijfel geanimeerd versus statisch bij uw doelgroep.'],
      images: [
        { src: '/images/learn/animation-static.svg', alt: 'Wanneer animatie pijn doet', caption: 'Vermijd animaties voor: QR-codes voor betalingen (snelheid is belangrijk), codes die kort worden bekeken (transit-advertenties), codes op schermen met slechte vernieuwingsfrequenties of wanneer de omgeving veel concurrerende beelden heeft. Test bij twijfel geanimeerd versus statisch bij uw doelgroep.' },
        { src: '/images/learn/animation-animated.svg', alt: 'Wanneer animatie pijn doet', caption: 'Vermijd animaties voor: QR-codes voor betalingen (snelheid is belangrijk), codes die kort worden bekeken (transit-advertenties), codes op schermen met slechte vernieuwingsfrequenties of wanneer de omgeving veel concurrerende beelden heeft. Test bij twijfel geanimeerd versus statisch bij uw doelgroep.' },
      ],
    },
    {
      heading: 'Veilige animatieparameters',
      paragraphs: ['Voor betrouwbaar scannen: houd de animatiesnelheid laag (200 ms+ per frame), vermijd snel knipperen, behoud een consistent contrast tijdens de animatie en zorg ervoor dat elk frame afzonderlijk wordt gescand. ANQR\'s \'Flicker Safe\' tijdelijke dithering helpt stroboscoopeffecten te voorkomen.'],
    },
    {
      heading: 'Aanbevolen animatiestijlen',
      paragraphs: ['Puls: Zachte oscillatie van het formaat trekt de aandacht zonder het scannen te onderbreken. Golf: Vloeiende patronen voegen beweging toe terwijl de structuur intact blijft. Kleurcyclus: Tintverschuivingen behouden het contrast en voegen visuele interesse toe. Shimmer: subtiele glittereffecten op de randen van de modules.'],
    },
    {
      heading: 'Formaatoverwegingen',
      paragraphs: ['GIF: Universele ondersteuning, beperkt tot 256 kleuren, grotere bestanden. APNG: Betere kwaliteit, minder browserondersteuning. Video (MP4/WebM): Beste kwaliteit, vereist context van de videospeler. ANQR exporteert standaard GIF - test op uw daadwerkelijke signage-speler.'],
    },
    {
      heading: 'Tips voor schermplaatsing',
      paragraphs: ['Plaats QR-codes op comfortabele scanhoogte (1,2-1,5 m voor staande kijkers). Vermijd schermranden waar vervorming optreedt. Zorg voor voldoende verblijftijd – meer dan vijf seconden zodat kijkers het kunnen opmerken, haal de telefoon eruit en scan. Overweeg om een ​​\'Scan Me\'-call-to-action toe te voegen.'],
      links: [
        { href: '/?lang=${lang}&tab=advanced#animation', label: 'Open de aanbevolen instellingen van deze handleiding in de ANQR-generator.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Zie gerelateerde handleidingen en voorbeelden', type: 'example' },
      ],
    },

    // Guide 5: QR Code Safety and Compliance (743-756)
    {
      heading: 'Veiligheid en naleving van de QR-code',
      paragraphs: ['Inzicht in stille zones, contrast, foutcorrectie en wat de veiligheidsmodus van ANQR afdwingt.'],
      images: [{ src: '/images/learn/safety-overview.svg', alt: 'Veiligheid en naleving van de QR-code', caption: 'Inzicht in stille zones, contrast, foutcorrectie en wat de veiligheidsmodus van ANQR afdwingt.' }],
    },
    {
      heading: 'De stille zone-eis',
      paragraphs: ['De stille zone is de lege marge rond elke QR-code. Scanners hebben deze ruimte nodig om codegrenzen te detecteren. ISO 18004 beveelt minimaal 4 modules aan. Het betreden van de stille zone is de meest voorkomende oorzaak van scanfouten. De veiligheidsmodus van ANQR dwingt dit minimum af.'],
      images: [{ src: '/images/learn/safety-quiet-zone.svg', alt: 'De stille zone-eis', caption: 'De stille zone is de lege marge rond elke QR-code. Scanners hebben deze ruimte nodig om codegrenzen te detecteren. ISO 18004 beveelt minimaal 4 modules aan. Het betreden van de stille zone is de meest voorkomende oorzaak van scanfouten. De veiligheidsmodus van ANQR dwingt dit minimum af.' }],
    },
    {
      heading: 'Contrastvereisten',
      paragraphs: ['QR-codes hebben een hoog contrast nodig tussen voor- en achtergrond. De ISO-norm gaat uit van zwart op wit, maar elke combinatie met hoog contrast werkt. Vermijd: kleurparen met laag contrast, kleurverlopen die het contrast in gebieden verminderen of achtergronden die de stille zone verstoren. ANQR\'s Contrast Guard waarschuwt voor problematische combinaties.'],
      images: [{ src: '/images/learn/safety-contrast.svg', alt: 'Contrastvereisten', caption: 'QR-codes hebben een hoog contrast nodig tussen voor- en achtergrond. De ISO-norm gaat uit van zwart op wit, maar elke combinatie met hoog contrast werkt. Vermijd: kleurparen met laag contrast, kleurverlopen die het contrast in gebieden verminderen of achtergronden die de stille zone verstoren. ANQR\'s Contrast Guard waarschuwt voor problematische combinaties.' }],
    },
    {
      heading: 'Foutcorrectie uitgelegd',
      paragraphs: ['QR-codes bevatten redundante gegevens voor foutcorrectie. Niveau L staat 7% schade toe, M staat 15% toe, Q staat 25% toe, H staat 30% toe. Gebruik H (Hoog) bij het toevoegen van overlays, afdrukken op gestructureerde materialen of het verwachten van slijtage. Hogere correctie = iets grotere codes.'],
    },
    {
      heading: 'Wat de veiligheidsmodus afdwingt',
      paragraphs: ['ANQR\'s veiligheidsmodus (gebalanceerd of streng): handhaaft automatisch een minimale stille zone, waarschuwt voor laag contrast, beperkt de intensiteit van de overlay op basis van het foutcorrectieniveau, beschermt zoeker-/timing-/uitlijningspatronen tegen wijziging en valideert de uiteindelijke codescans correct.'],
    },
    {
      heading: 'Limieten voor logo en overlay',
      paragraphs: ['Overlays die meer dan 30% van de datamodules bedekken, riskeren scanfouten, zelfs met H-foutcorrectie. De ECC-Aware-modus van ANQR verdeelt op intelligente wijze de impact van de overlay om binnen veilige limieten te blijven. Zorg ervoor dat zoekerpatronen (hoekvierkantjes) altijd volledig ongewijzigd blijven.'],
    },
    {
      heading: 'Naleving voor specifieke industrieën',
      paragraphs: ['Sommige industrieën hebben specifieke QR-vereisten: betalingssystemen vereisen exacte coderingsformaten, farmaceutische tracking vereist GS1-compliance en kaartjes voor evenementen hebben mogelijk gecodeerde payloads nodig. ANQR ondersteunt deze standaarden: gebruik de juiste sjabloon voor het inhoudstype.'],
      links: [
        { href: '/?lang=${lang}&tab=professional#safety', label: 'Open de aanbevolen instellingen van deze handleiding in de ANQR-generator.', type: 'generator' },
        { href: '/examples?lang=${lang}', label: 'Zie gerelateerde handleidingen en voorbeelden', type: 'example' },
      ],
    },
  ],
  relatedLinks: [
    { href: '/guide?lang=${lang}', label: 'Open de volledige gebruikershandleiding', type: 'guide' },
    { href: '/examples?lang=${lang}', label: 'Bekijk QR-voorbeelden', type: 'example' },
    { href: '/gallery?lang=${lang}', label: 'Bekijk QR-voorbeelden', type: 'gallery' },
  ],
};

export default learn;
