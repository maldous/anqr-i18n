import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const examples: PageDefinition = {
  title: 'ANQR-voorbeelden',
  description: 'Vind de juiste plek om te beginnen met ANQR - van de volledige gebruikershandleiding tot praktische Learn-artikelen en kant-en-klare voorbeelden.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open de generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Blader door Learn-artikelen', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open de volledige gebruikershandleiding', type: 'guide' },
  ],

  sections: [
    // Example 1: Uplift an Existing QR Campaign
    {
      heading: 'Verbeter een bestaande QR-campagne',
      paragraphs: ['Transformeer een eenvoudige QR-code in een merkversie die is geoptimaliseerd voor veiligheid.', '819'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'Verbeter een bestaande QR-campagne',
          caption: 'Transformeer een eenvoudige QR-code in een merkversie die is geoptimaliseerd voor veiligheid.',
        },
      ],
    },
    {
      heading: 'De uitdaging',
      paragraphs: ['U heeft een bestaande QR-codecampagne, bijvoorbeeld gewone zwart-witcodes die op marketingmateriaal zijn afgedrukt. De codes werken, maar zijn niet merkgebonden en hebben mogelijk suboptimale instellingen. Hoe upgrade je zonder bestaande scans te verbreken?', '820'],
      images: [
        {
          src: '/images/examples/uplift-before.png',
          alt: 'De uitdaging',
          caption: 'U heeft een bestaande QR-codecampagne, bijvoorbeeld gewone zwart-witcodes die op marketingmateriaal zijn afgedrukt. De codes werken, maar zijn niet merkgebonden en hebben mogelijk suboptimale instellingen. Hoe upgrade je zonder bestaande scans te verbreken?',
        },
      ],
    },
    {
      heading: 'De oplossing',
      paragraphs: ['Behoud dezelfde bestemmings-URL, maar maak de QR-code opnieuw met ANQR. Voeg uw logo toe als centrale overlay, pas merkkleuren toe en schakel de Veiligheidsmodus in om ervoor te zorgen dat de geüpgradede code betrouwbaar scant. De gecodeerde inhoud blijft identiek.', '821', '822'],
      images: [
        {
          src: '/images/examples/uplift-after.png',
          alt: 'De oplossing',
          caption: 'Behoud dezelfde bestemmings-URL, maar maak de QR-code opnieuw met ANQR. Voeg uw logo toe als centrale overlay, pas merkkleuren toe en schakel de Veiligheidsmodus in om ervoor te zorgen dat de geüpgradede code betrouwbaar scant. De gecodeerde inhoud blijft identiek.',
        },
      ],
    },
    {
      heading: 'Stap voor stap',
      paragraphs: ['1. Voer uw bestaande URL in ANQR in. 2. Stel Foutcorrectie in op H (Hoog). 3. Upload uw logo en stel de overlaymodus in op \'Middenlogo\'. 4. Stel de intensiteit in op 60-70%. 5. Schakel \'Finderpatronen behouden\' in. 6. Merkkleuren toepassen (hoog contrast behouden). 7. Schakel Veiligheidsmodus \'Gebalanceerd\' in. 8. Test met meerdere scanner-apps. 9. Exporteer als SVG voor printflexibiliteit.', '823', '824', '825', '826', '827', '828'],
    },
    {
      heading: 'Waarom het werkt',
      paragraphs: ['De QR-code codeert dezelfde URL, dus bestaande gedrukte codes en nieuwe merkcodes werken beide. Hoge foutcorrectie compenseert de logo-overlay. De Veiligheidsmodus zorgt ervoor dat de ontwerpkeuzes de scanbaarheid niet in gevaar brengen.', '829', '830'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Herscheppen in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 2: Branded Retail Payments
    {
      heading: 'Merk retailbetaling QR',
      paragraphs: ['Ontwerp een betalings-QR die branding combineert met scanbetrouwbaarheid.', '831'],
      images: [
        {
          src: '/images/examples/retail-payments-overview.png',
          alt: 'Merk retailbetaling QR',
          caption: 'Ontwerp een betalings-QR die branding combineert met scanbetrouwbaarheid.',
        },
      ],
    },
    {
      heading: 'De uitdaging',
      paragraphs: ['Uw detailhandelsbedrijf heeft QR-codes voor betalingen nodig die overeenkomen met uw merkidentiteit en tegelijkertijd voldoen aan strenge betalingssysteemvereisten. Generieke zwart-wit betaalcodes werken, maar missen merkmogelijkheden.', '832'],
      images: [
        {
          src: '/images/examples/retail-payments-before.png',
          alt: 'De uitdaging',
          caption: 'Uw detailhandelsbedrijf heeft QR-codes voor betalingen nodig die overeenkomen met uw merkidentiteit en tegelijkertijd voldoen aan strenge betalingssysteemvereisten. Generieke zwart-wit betaalcodes werken, maar missen merkmogelijkheden.',
        },
      ],
    },
    {
      heading: 'De oplossing',
      paragraphs: ['Gebruik de betaaltemplates van ANQR (UPI, PayNow, SEPA, etc.) met conservatieve branding. Voeg uw logo klein en gecentreerd toe, gebruik merkkleuren voor de voorgrond terwijl u de witte achtergrond behoudt en gebruik het hoogste foutcorrectieniveau.', '833'],
      images: [
        {
          src: '/images/examples/retail-payments-after.png',
          alt: 'De oplossing',
          caption: 'Gebruik de betaaltemplates van ANQR (UPI, PayNow, SEPA, etc.) met conservatieve branding. Voeg uw logo klein en gecentreerd toe, gebruik merkkleuren voor de voorgrond terwijl u de witte achtergrond behoudt en gebruik het hoogste foutcorrectieniveau.',
        },
      ],
    },
    {
      heading: 'Ontwerpbeperkingen',
      paragraphs: ['Voor een goede klantervaring moeten betalingscodes in minder dan 1 seconde worden gescand. Dit beperkt hoeveel maatwerk veilig is: logo onder 15% van het codegebied, geen wijziging van het zoekpatroon, een stille zone van minimaal 4 modules en testen met daadwerkelijke betalingsapps (niet alleen generieke scanners).', '834'],
    },
    {
      heading: 'Aanbevolen instellingen',
      paragraphs: ['Foutcorrectie: H (hoog). Stille Zone: 4+ modules. Modulestijl: Vierkant (meest betrouwbaar). Logo-overlay: maximale intensiteit van 50-60%. Veiligheidsmodus: streng. Test altijd met uw betaalapp (Google Pay, bankapps etc.).', '835'],
    },
    {
      heading: 'Waarom deze aanpak werkt',
      paragraphs: ['Conservatieve branding zorgt ervoor dat betaalapps snel scannen en toch uw merkidentiteit laten zien. De stille zone en foutcorrectie bieden ruimte voor drukvariaties en omgevingsfactoren op het verkooppunt.', '836'],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Herscheppen in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 3: Print Scaling
    {
      heading: 'Afdrukschalen: PNG versus SVG',
      paragraphs: ['Zie het verschil tussen raster en vector bij grote afdrukformaten.', '837'],
      images: [
        {
          src: '/images/examples/print-scaling-overview.png',
          alt: 'Afdrukschalen: PNG versus SVG',
          caption: 'Zie het verschil tussen raster en vector bij grote afdrukformaten.',
        },
      ],
    },
    {
      heading: 'De uitdaging',
      paragraphs: ['Voor afdrukken op groot formaat (posters, banners of bewegwijzering) hebt u QR-codes nodig. Exporteren met kleine pixelgroottes en vervolgens opschalen levert wazige, mogelijk onscanbare codes op.', '838'],
      images: [
        {
          src: '/images/examples/print-scaling-before.png',
          alt: 'De uitdaging',
          caption: 'Voor afdrukken op groot formaat (posters, banners of bewegwijzering) hebt u QR-codes nodig. Exporteren met kleine pixelgroottes en vervolgens opschalen levert wazige, mogelijk onscanbare codes op.',
        },
      ],
    },
    {
      heading: 'PNG op posterformaat',
      paragraphs: ['Een QR-code die wordt geëxporteerd als PNG van 200 x 200 px en vervolgens wordt geschaald naar 30 cm (12 inch), wordt duidelijk korrelig. De moduleranden vervagen samen, waardoor het contrast en de betrouwbaarheid van de scanner afnemen. Dit is de meest voorkomende QR-fout bij afdrukken.', '839'],
      images: [
        {
          src: '/images/examples/print-scaling-png.png',
          alt: 'PNG op posterformaat',
          caption: 'Een QR-code die wordt geëxporteerd als PNG van 200 x 200 px en vervolgens wordt geschaald naar 30 cm (12 inch), wordt duidelijk korrelig. De moduleranden vervagen samen, waardoor het contrast en de betrouwbaarheid van de scanner afnemen. Dit is de meest voorkomende QR-fout bij afdrukken.',
        },
      ],
    },
    {
      heading: 'SVG op posterformaat',
      paragraphs: ['Dezelfde QR-code die als SVG wordt geëxporteerd, kan perfect naar elk formaat worden geschaald. Moduleranden blijven helder omdat ze wiskundig zijn gedefinieerd en niet op pixels zijn gebaseerd. Dit werkt zowel geprint op 5 cm als op 5 meter.', '840'],
      images: [
        {
          src: '/images/examples/print-scaling-svg.png',
          alt: 'SVG op posterformaat',
          caption: 'Dezelfde QR-code die als SVG wordt geëxporteerd, kan perfect naar elk formaat worden geschaald. Moduleranden blijven helder omdat ze wiskundig zijn gedefinieerd en niet op pixels zijn gebaseerd. Dit werkt zowel geprint op 5 cm als op 5 meter.',
        },
      ],
    },
    {
      heading: 'Werkstroom exporteren',
      paragraphs: ['In ANQR: 1. Ontwerp uw QR-code op elk voorbeeldformaat. 2. Ga naar Uitvoerinstellingen. 3. Selecteer Formaat: SVG. 4. Schakel \'True Vector\' in voor schaalbare paden. 5. Exporteer en importeer in uw ontwerpsoftware. 6. Schaal naar het uiteindelijke afdrukformaat: het blijft scherp.', '841', '842', '843', '844', '845'],
    },
    {
      heading: 'Wanneer moet u PNG met hoge resolutie gebruiken?',
      paragraphs: ['Als uw workflow PNG vereist: bereken de uiteindelijke pixelafmetingen (fysieke grootte × DPI). Voor een code van 10 cm bij 300 DPI: 10 cm ≈ 4 inch × 300 = 1200 px. Exporteer op 1200×1200px. Dit levert resultaten van afdrukkwaliteit zonder schaalvergroting.', '846'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Herscheppen in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 4: Animated Signage
    {
      heading: 'Geanimeerde bewegwijzering QR',
      paragraphs: ['Voeg opvallende animaties toe terwijl de scanbetrouwbaarheid behouden blijft.', '847'],
      images: [
        {
          src: '/images/examples/animated-signage-overview.png',
          alt: 'Geanimeerde bewegwijzering QR',
          caption: 'Voeg opvallende animaties toe terwijl de scanbetrouwbaarheid behouden blijft.',
        },
      ],
    },
    {
      heading: 'De uitdaging',
      paragraphs: ['Uw narrowcasting concurreert om aandacht. Statische QR-codes worden genegeerd onder geanimeerde inhoud. Maar agressieve animaties kunnen het scannen verbreken.', '848'],
      images: [
        {
          src: '/images/examples/animated-signage-before.png',
          alt: 'De uitdaging',
          caption: 'Uw narrowcasting concurreert om aandacht. Statische QR-codes worden genegeerd onder geanimeerde inhoud. Maar agressieve animaties kunnen het scannen verbreken.',
        },
      ],
    },
    {
      heading: 'Veilige animatieaanpak',
      paragraphs: ['Gebruik subtiele animaties die de aandacht trekken zonder de codestructuur te verstoren. Het \'Pulse\'-patroon van ANQR schaalt de code zachtjes, \'Shimmer\' voegt sprankelende effecten toe en \'Wave\' zorgt voor vloeiende bewegingen, terwijl elk frame scanbaar blijft.', '849'],
      images: [
        {
          src: '/images/examples/animated-signage-after.png',
          alt: 'Veilige animatieaanpak',
          caption: 'Gebruik subtiele animaties die de aandacht trekken zonder de codestructuur te verstoren. Het \'Pulse\'-patroon van ANQR schaalt de code zachtjes, \'Shimmer\' voegt sprankelende effecten toe en \'Wave\' zorgt voor vloeiende bewegingen, terwijl elk frame scanbaar blijft.',
        },
      ],
    },
    {
      heading: 'Aanbevolen instellingen',
      paragraphs: ['Patroon: Pulse of Shimmer. Snelheid: 200-300 ms per frame. Foutcorrectie: H (hoog). Tijdelijke dither: Flikkerveilig. Schakel altijd \'Preserve Finder Patterns\' in. Test op uw werkelijke signage-displayhardware.', '850'],
    },
    {
      heading: 'Formaat en levering',
      paragraphs: ['Exporteer als GIF voor ondersteuning voor universele signage-spelers. Gebruik 24-30 frames voor vloeiende animaties zonder buitensporige bestandsgrootte. Als uw signage video ondersteunt, biedt MP4/WebM een betere kwaliteit, maar vereist het afspelen van video.', '851'],
    },
    {
      heading: 'Plaatsing op schermen',
      paragraphs: ['Positie op comfortabele scanhoogte. Geef kijkers een weergavetijd van meer dan 5 seconden zodat ze het kunnen opmerken en scannen. Voeg een tekstprompt (\'Scan voor details\') toe naast de code. Zorg voor voldoende contrast met uw achtergrondinhoud.', '852'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Herscheppen in Generator',
          type: 'generator',
        },
      ],
    },

    // Example 5: Cross-lingual Collaboration
    {
      heading: 'Cross-linguale QR-samenwerking',
      paragraphs: ['Deel QR-configuraties tussen teams in verschillende talen.', '853'],
      images: [
        {
          src: '/images/examples/collaboration-overview.png',
          alt: 'Cross-linguale QR-samenwerking',
          caption: 'Deel QR-configuraties tussen teams in verschillende talen.',
        },
      ],
    },
    {
      heading: 'De uitdaging',
      paragraphs: ['Uw internationale team moet consistente QR-codes maken, maar teamleden werken in verschillende talen. Handmatige configuratierecreatie is foutgevoelig en tijdrovend.', '854'],
      images: [
        {
          src: '/images/examples/collaboration-before.png',
          alt: 'De uitdaging',
          caption: 'Uw internationale team moet consistente QR-codes maken, maar teamleden werken in verschillende talen. Handmatige configuratierecreatie is foutgevoelig en tijdrovend.',
        },
      ],
    },
    {
      heading: 'De oplossing',
      paragraphs: ['De deellinks van ANQR coderen alle instellingen in de URL. Teamleden kunnen dezelfde link openen in de taal van hun voorkeur: de QR-configuratie wordt op dezelfde manier geladen, maar de interface wordt weergegeven in hun landinstelling.', '855'],
      images: [
        {
          src: '/images/examples/collaboration-after.png',
          alt: 'De oplossing',
          caption: 'De deellinks van ANQR coderen alle instellingen in de URL. Teamleden kunnen dezelfde link openen in de taal van hun voorkeur: de QR-configuratie wordt op dezelfde manier geladen, maar de interface wordt weergegeven in hun landinstelling.',
        },
      ],
    },
    {
      heading: 'Hoe het werkt',
      paragraphs: ['1. Configureer uw QR-code in ANQR. 2. Klik op Delen om een ​​link te genereren. 3. Stuur de link naar je collega. 4. Ze openen het - ANQR laadt uw exacte instellingen. 5. Ze kunnen hun interfacetaal wijzigen zonder de QR-configuratie te beïnvloeden. 6. Beide teamleden exporteren identieke QR-codes.', '856', '857', '858', '859', '860'],
    },
    {
      heading: 'Taalparameter',
      paragraphs: ['ANQR-share-links bevatten een \'lang\'-parameter voor de interfacetaal, maar de QR-inhoud en stijlinstellingen zijn taalonafhankelijk. Als u de lang-parameter wijzigt, worden menu\'s en labels gewijzigd, niet de QR-code zelf.', '861'],
    },
    {
      heading: 'Samenwerkingsworkflow',
      paragraphs: ['Maak een \'master\'-configuratie met uw merkinstellingen. Deel de link met uw team. Elk regiokantoor kan zijn voorkeurstaal gebruiken, terwijl de merkconsistentie behouden blijft. Updates van de hoofdlink worden doorgegeven aan iedereen die deze gebruikt.', '862', '863'],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Herscheppen in Generator',
          type: 'generator',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Blader door Learn-artikelen', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Open de volledige gebruikershandleiding', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: '899', type: 'gallery' },
  ],
};
