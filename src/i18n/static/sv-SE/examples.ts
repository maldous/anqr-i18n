import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 * IDs 1044-1178 contain enhanced, unique content for each field.
 */
export const examples: PageDefinition = {
  title: 'ANQR-exempel',
  description:
    'Fem verkliga, produktionsliknande exempel som visar var QR-koder skapar mätbart värde: upplyftande av en äldre detaljhandelsräknekod, varumärkesbetalningar och "skanna-till"-åtgärder, tryckskalning från flygblad till skyltar, animerad QR för digital skyltning och tvärspråkigt samarbete med delbara ankarlänkar. Varje exempel innehåller bilder, praktiska begränsningar och en remixlänk tillbaka till generatorn.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Öppna generatorn', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Bläddra Lär artiklar', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Öppna hela användarhandboken', type: 'guide' },
  ],

  sections: [
    // ===== Example 1: Uplift Existing Campaign (IDs 1044-1070) =====
    {
      heading: 'Fallstudie: Retail Counter QR Uplift',
      paragraphs: [
        'This real-world example follows a small café that had been using the same QR code on their counter for three years. The original code was generated quickly during the pandemic rush, printed on standard paper, and slipped into a plastic stand. Det fungerade fortfarande - tekniskt - men kunderna behövde ofta flera försök att skanna det, och det gjorde ingenting för att förstärka caféets noggrant utformade varumärkesidentitet.',
        "The transformation began with a simple audit: the existing code encoded the café's online menu URL, which they wanted to keep. The challenge was making the QR feel like part of the café experience rather than an afterthought utility from 2020.",
      ],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'A weathered QR code in a plastic stand showing visible wear, fingerprints, and faded printing',
          caption:
            'The starting point: three years of counter service had left the original QR barely functional',
        },
      ],
    },
    {
      heading: 'Diagnostisera originalkodens problem',
      paragraphs: [
        "Testning avslöjade flera problem: den ursprungliga koden använde Error Correction L (minsta redundans), hade en tyst zon på endast 2 moduler och skrevs ut med låg upplösning. Under the café's warm tungsten lighting, the already-faded black modules barely contrasted against the yellowed paper. Äldre telefoner kämpade; newer phones succeeded but with noticeable delay.",
        "Beyond technical issues, the generic black-and-white square communicated nothing about the brand. Customers hesitated before scanning - a subtle trust barrier that reduced engagement with the café's carefully designed digital menu.",
      ],
      images: [
        {
          src: '/images/examples/uplift-diagnosis.png',
          alt: "A diagnostic overlay showing the original QR's technical deficiencies: low ECC, minimal quiet zone, poor contrast",
          caption:
            'Technical analysis revealing why the legacy code underperformed in real-world conditions',
        },
      ],
    },
    {
      heading: 'Upplyftsprocessen',
      paragraphs: [
        'Med hjälp av ANQR återskapade caféägaren koden med identisk meny-URL men dramatiskt förbättrade inställningar: Felkorrigering H för maximal motståndskraft, en tyst zon med 6 moduler för tillförlitlig gränsdetektering och märkesfärger (djupa vinröda moduler på krämfärgad bakgrund) som matchade caféets interiörpalett.',
        'Ett litet mittöverlägg med caféets logotyp lades till - hölls medvetet subtilt för att bibehålla skanningsbarheten samtidigt som det ger omedelbar varumärkesigenkänning. Safety Mode confirmed the new design scanned reliably across test devices before any printing.',
      ],
      images: [
        {
          src: '/images/examples/uplift-process.png',
          alt: 'The ANQR interface showing the configuration: brand colours, appropriate ECC, generous quiet zone, subtle logo overlay',
          caption:
            'Building the upgraded configuration: every setting chosen to balance brand expression with scan reliability',
        },
      ],
    },
    {
      heading: 'Mätbara resultat',
      paragraphs: [
        'After deploying the new QR on professional matte-laminated card stock, the café tracked results over four weeks. Scan success rate improved from an estimated 70% to near-100%. Average scan time dropped from 3-4 seconds to under 1 second. Most significantly, menu engagement increased 40% - customers who previously glanced at the QR and gave up were now scanning confidently.',
        "Staff reported fewer customer questions about 'how to use the QR' and no more instances of manually typing the URL for frustrated customers. The branded appearance also sparked conversations, with customers commenting positively on the cohesive design.",
      ],
      images: [
        {
          src: '/images/examples/uplift-results.png',
          alt: 'En jämförelse före/efter med mätvärden: sökningsframgångsfrekvens, genomsnittlig sökningstid och förbättringar av antalet sökningar per vecka',
          caption: 'Fyra veckors data som visar den mätbara effekten av en genomtänkt QR-höjning',
        },
      ],
    },
    {
      heading: 'Återskapa denna konfiguration',
      paragraphs: [
        'Kaféets konfiguration visar konservativt men effektivt varumärke: Error Correction H, 6-moduls tyst zon, högkontrast märkesfärger och en minimal mittöverlägg. Denna balans fungerar för de flesta butiksdisktillämpningar där tillförlitlighet måste komma i första hand men varumärkesnärvaro fortfarande spelar roll.',
        'Öppna generatorn med dessa inställningar förinstallerade och anpassa färgerna och överlägget till ditt eget varumärke. Nyckelinsikten: enbart tillförlitlighetsförbättringar kan dramatiskt öka engagemanget, även innan du lägger till någon visuell stil.',
        'Se den relaterade Learn-guiden för att förbättra befintliga QR-kampanjer för hela metoden bakom detta tillvägagångssätt.',
      ],
      images: [
        {
          src: '/images/examples/uplift-config.png',
          alt: 'Länk till generatorn förkonfigurerad med caféets inställningar för omedelbar anpassning',
          caption: 'Börja med en beprövad konfiguration och anpassa efter ditt varumärke',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H&margin=6#render',
          label: 'Öppna generatorn',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-0',
          label: 'Bläddra Lär artiklar',
          type: 'learn',
        },
      ],
    },

    // ===== Example 2: Branded Retail Payments (IDs 1071-1097) =====
    {
      heading: 'Fallstudie: Multi-Payment Counter Display',
      paragraphs: [
        'Det här exemplet följer en klädbutik i boutiquestil som hade samlat fem olika QR-koder i sitt register: bankbetalning, tips, Instagram, recensioner från Google och en anställningslänk. Var och en genererades från en annan källa, trycktes vid olika tidpunkter och visades i felaktiga montrar. Det visuella kaoset undergrävde butikens noggrant kurerade estetik, och personalen hanterade regelbundet kunder som skannar fel kod.',
        'Lösningen krävde separata bekymmer: betalningskoder behövde maximal tillförlitlighet med konservativ stil, medan marknadsföringskoder kunde vara mer uttrycksfulla. Det enhetliga displaysystemet som uppstod visar hur man balanserar varumärkesnärvaro mot de funktionella kraven från olika QR-användningsfall.',
      ],
      images: [
        {
          src: '/images/examples/payments-overview.png',
          alt: 'Ett rörigt registerområde som visar fem felaktiga QR-koder i olika stativ och tryckt material',
          caption:
            'The chaotic starting point: five disconnected QR codes competing for attention and causing customer confusion',
        },
      ],
    },
    {
      heading: 'Prioritera betalningsupplevelsen',
      paragraphs: [
        "The store's primary payment method used a regional standard that required strict payload compliance. Testing revealed that even minor styling affected scan speed with certain banking apps. The decision: keep the payment QR completely unmodified except for size optimisation and professional printing on matte card stock.",
        "This conservative approach meant the payment code looked less 'branded' than ideal, but transaction completion rates improved dramatically. The insight: payment moments aren't branding opportunities - they're reliability moments. Customers appreciate speed and certainty over aesthetics when money is involved.",
      ],
      images: [
        {
          src: '/images/examples/payments-primary.png',
          alt: 'A clean, large payment QR code on professional matte card stock, positioned prominently at the register',
          caption:
            'The payment QR: sized generously, printed professionally, styled conservatively for instant recognition by banking apps',
        },
      ],
    },
    {
      heading: 'Skapar den sekundära åtgärdsskärmen',
      paragraphs: [
        "For tips, reviews, social, and hiring, the store could be more expressive. These codes were regenerated in ANQR with consistent brand styling: the store's signature olive green on cream, rounded module style, and a subtle centre overlay with the store's icon. Error Correction H ensured reliability even with the styling.",
        "These four codes were arranged in a branded panel positioned beside (not competing with) the payment code. Clear labels in the store's typography explained each code's purpose. The visual hierarchy was intentional: payment stood alone and prominent; sekundära åtgärder grupperade som alternativ.",
      ],
      images: [
        {
          src: '/images/examples/payments-secondary.png',
          alt: 'A branded panel showing four styled QR codes for tips, reviews, social, and hiring, with clear labels',
          caption:
            'The secondary action panel: consistent branding, clear labelling, positioned as options rather than distractions',
        },
      ],
    },
    {
      heading: 'Displaysystemdesign',
      paragraphs: [
        'Den fysiska displayen löste flera problem samtidigt. Både betalningsstället och den sekundära panelen använde matta material för att eliminera bländning från takbelysning. Höjderna optimerades för kunder av varierande storlek. Vinklar riktade mot kundkön snarare än platt mot disken.',
        'Kritiskt nog skapade butiken reservutskrifter från låsta ANQR-konfigurationslänkar. När tipskoden så småningom blev kaffestänkt ersatte personalen den inom några minuter med den lagrade konfigurationen - inga skärmdumpar, inga gissningar på inställningar, ingen kvalitetsförsämring.',
      ],
      images: [
        {
          src: '/images/examples/payments-display.png',
          alt: 'Ett diagram som visar den fysiska displaylayouten: höjder, vinklar, material och förhållandet mellan betalning och sekundära displayer',
          caption:
            'Displaysystemritning: fysisk ergonomi optimerad för tillförlitlig skanning över kundhöjder och ljusförhållanden',
        },
      ],
    },
    {
      heading: 'Operativa förbättringar',
      paragraphs: [
        'Sex veckor efter implementeringen dokumenterade butiken betydande förbättringar: noll kundklagomål om förvirring av "fel kod", snabbare transaktionstider och en trefaldig ökning av tipsinlämningar (kunder kunde nu hitta och skanna tipskoden utan att fråga personalen obekvämt). Googles recensioner ökade också i takt med att den dedikerade, välmärkta QR tog bort friktionen.',
        'Personalutbildningen blev enklare: "betalningskoden är den stora, allt annat finns på panelen." När betalningsappar uppdaterades och en kort visade långsammare skanning, innebar den konservativa betalningskoddesignen att den fortfarande fungerade - bara marginellt långsammare snarare än att misslyckas helt.',
        'Se Learn-guiden om QR-koder för detaljhandelsbetalningar för principerna bakom denna displaysystemdesign.',
      ],
      images: [
        {
          src: '/images/examples/payments-metrics.png',
          alt: 'En mätinstrumentpanel som visar före/efter jämförelser: förvirringstillbud, transaktionstid, tipsfrekvens, granskningsinlämningar',
          caption:
            'Sex veckors driftsdata som visar affärseffekten av ett genomtänkt multi-QR-displaysystem',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Öppna generatorn',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-7',
          label: 'Bläddra Lär artiklar',
          type: 'learn',
        },
      ],
    },

    // ===== Example 3: Print Scaling (IDs 1098-1124) =====
    {
      heading: 'Fallstudie: Från visitkort till anslagstavla',
      paragraphs: [
        'Det här exemplet följer ett produktionsbolag för evenemang som förbereder sig för en stor konferens. De behövde samma QR-kod – länkad till evenemangsappen – utplacerad i radikalt olika format: deltagaremärken (3 cm), bordstältkort (8 cm), registreringsskrivbordsskyltar (30 cm), vägvisande affischer (60 cm) och en massiv scenbakgrundsbanner (4 meter). Varje format hade olika visningsavstånd, ljusförhållanden och produktionsarbetsflöden.',
        "The challenge wasn't just technical - it was operational. Multiple vendors handled different print jobs, and the company needed to ensure consistent, scannable results regardless of who produced what. Their solution centred on SVG export and rigorous handoff documentation.",
      ],
      images: [
        {
          src: '/images/examples/print-overview.png',
          alt: 'A collage showing the same QR code deployed across five different sizes, from badge to banner',
          caption:
            'One QR code, five deployment sizes: the challenge of maintaining scannability from centimetres to metres',
        },
      ],
    },
    {
      heading: 'Varför tidigare evenemang hade problem',
      paragraphs: [
        "At their last conference, the company had experienced embarrassing failures. Scenbannern QR genererades som en liten PNG och skalades upp i designprogramvara - resultatet såg acceptabelt ut på avstånd men kunde inte skanna tillförlitligt från publiken. Badge QRs were over-styled and too small, frustrating attendees trying to add contacts. Inconsistent settings across formats meant the 'same' QR actually looked different on each piece.",
        'Post-event analysis revealed the root cause: no single source of truth. Each designer had recreated the QR with slightly different settings, and each print vendor had processed files differently. Quality degraded through the telephone game of file handoffs.',
      ],
      images: [
        {
          src: '/images/examples/print-problems.png',
          alt: 'Close-up photographs showing scanning failures: pixelated banner modules, undersized badge codes, inconsistent styling across formats',
          caption:
            'Forensic analysis of previous event failures: each format had introduced different quality problems',
        },
      ],
    },
    {
      heading: 'SVG-First Workflow',
      paragraphs: [
        'För detta evenemang etablerade företaget ett strikt protokoll: en master QR genererad i ANQR med optimala inställningar (felkorrigering H, generös tyst zon, ren stil), exporteras som SVG och lagras som den enda auktoritativa källan. The ANQR configuration link was documented alongside the SVG file so the code could be regenerated if needed.',
        'Varje designer och leverantör fick samma SVG-master med tydliga instruktioner: placera i önskad storlek, modifiera inte, bibehåll frigång till tyst zon. För leverantörer som kräver rasterformat tillhandahöll företaget förrenderade PNG-filer i specifika storlekar med tydliga namnkonventioner som indikerar avsedd användning.',
      ],
      images: [
        {
          src: '/images/examples/print-workflow.png',
          alt: 'A file package showing the SVG master, size-specific PNGs, specification document, and configuration link',
          caption:
            'The handoff package: everything vendors needed to produce consistent results without guessing',
        },
      ],
    },
    {
      heading: 'Storleksspecifika överväganden',
      paragraphs: [
        "Varje format krävde särskild uppmärksamhet. Badge inserts at 3cm needed the QR to occupy maximum available space - scanning distance would be arm's length. Table tents at 8cm could include decorative framing outside the quiet zone. 4-metersbannern krävde beräkning: från typiskt publikavstånd (15-20 meter) behövde moduler vara tydligt urskiljbara med telefonkameror, vilket innebar att QR-en behövde vara minst 80 cm inom bannerdesignen.",
        'The company created a sizing guide documenting minimum QR dimensions for each expected scanning distance. This became a reusable asset for future events, removing guesswork from the design process.',
      ],
      images: [
        {
          src: '/images/examples/print-sizing.png',
          alt: 'A chart showing the relationship between scanning distance, minimum QR size, and module dimensions for each event format',
          caption:
            "The sizing matrix: calculated dimensions ensuring reliable scanning at each format's expected viewing distance",
        },
      ],
    },
    {
      heading: 'Production Results',
      paragraphs: [
        "Conference day validation was systematic: staff tested every deployed QR before doors opened. The badge inserts scanned instantly at arm's length. Table tents worked reliably in the variable lighting of breakout rooms. The stage banner - the previous event's embarrassment - scanned successfully from the middle of the audience area.",
        'Zero scanning complaints were logged across 2,000+ attendees. Den operativa vinsten var lika betydande: när ett sponsortillskott i sista minuten krävde ny skyltning, genererade produktionsteamet det från huvud-SVG på några minuter, övertygade om att det skulle matcha allt annat.',
        'See the Learn guide on print-ready QR codes for the SVG vs PNG decision framework and handoff best practices.',
      ],
      images: [
        {
          src: '/images/examples/print-success.png',
          alt: 'Event photography showing attendees successfully scanning QR codes at various sizes and distances throughout the venue',
          caption:
            'Conference day success: reliable scanning across every format, from badge close-ups to stage banner distance shots',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=svg#output',
          label: 'Öppna generatorn',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-14',
          label: 'Bläddra Lär artiklar',
          type: 'learn',
        },
      ],
    },

    // ===== Example 4: Animated Signage (IDs 1125-1151) =====
    {
      heading: 'Fallstudie: Airport Lounge Digital Display',
      paragraphs: [
        'This example follows an airline lounge that had been using static QR codes on their digital welcome screens. The screens displayed rotating promotional content, but the QR code for lounge check-in sat in a corner, static and easily overlooked. Analytics showed only 15% of eligible guests used the QR check-in despite it being faster than the desk queue. De flesta gäster märkte det helt enkelt inte.',
        'The hypothesis was simple: in a visually busy environment with moving content, a static QR becomes invisible. Lösningen som behövdes för att göra QR:n märkbar utan att kompromissa med tillförlitligheten som krävs för ett incheckningsflöde där ett misslyckande skulle innebära frustrerade resenärer och längre skrivbordsköer.',
      ],
      images: [
        {
          src: '/images/examples/animated-overview.png',
          alt: 'A digital display in an airport lounge showing promotional content with a small, static QR code in the corner',
          caption:
            'The original setup: a static QR lost in a sea of dynamic promotional content, achieving only 15% adoption',
        },
      ],
    },
    {
      heading: 'Designa säker animering',
      paragraphs: [
        "The lounge's digital signage used large LED panels - a challenging environment where aggressive animation could create scanning problems. Designteamet började konservativt: en mild pulseffekt som subtilt utökade och drog ihop QR:s visuella närvaro utan att ändra den faktiska kodstrukturen. Frame timing was set slow (250ms) to avoid any flicker issues with the LED refresh rate.",
        'Safety Mode validation confirmed every frame remained scannable. Ytterligare tester på de faktiska LED-panelerna avslöjade att pulsen behövde vara ännu mer subtil än förhandsvisningar på skrivbordet föreslog - LED-ljusstyrka och betraktningsvinklar påverkade den upplevda kontrasten mer än förväntat.',
      ],
      images: [
        {
          src: '/images/examples/animated-config.png',
          alt: 'The ANQR animation settings panel showing pulse configuration: slow timing, subtle intensity, Safety Mode enabled',
          caption:
            'Animation configuration: parameters tuned for LED panel display while maintaining scan reliability in every frame',
        },
      ],
    },
    {
      heading: 'Integration med Signage Content',
      paragraphs: [
        'Den animerade QR:en placerades i en dedikerad "stabil zon" i skärmlayouten - ett område som förblev konstant medan reklaminnehåll roterade i huvudvisningsområdet. This separation was crucial: the QR needed visual stability for scanning even while attracting attention through its subtle animation.',
        "A clear call-to-action was added adjacent to the QR: 'Skip the queue - scan to check in.' Texten förblev statisk medan QR:en pulserade, vilket skapade en visuell hierarki som drog blickarna till skanningsmöjligheten utan att överväldiga det reklaminnehållet.",
      ],
      images: [
        {
          src: '/images/examples/animated-layout.png',
          alt: 'A screen layout diagram showing the animated QR in a stable zone while promotional content rotates in the main area',
          caption:
            'Screen real estate allocation: the animated QR occupies a stable zone separate from rotating promotional content',
        },
      ],
    },
    {
      heading: 'Teknisk distribution',
      paragraphs: [
        "The animated QR was exported as a GIF with optimised settings for the signage CMS. File size considerations mattered - the lounge's content management system had upload limits, and overly large files caused playback stuttering. The final export balanced visual quality against file size by limiting the colour palette and optimising frame count.",
        'Deployment included a fallback: if the GIF failed to play for any reason, the signage system would display a static PNG backup. This redundancy ensured check-in capability was never lost due to technical issues with the animation.',
      ],
      images: [
        {
          src: '/images/examples/animated-cms.png',
          alt: 'A CMS interface showing the animated QR upload with fallback static image configured',
          caption:
            'Signage CMS configuration: animated primary with static fallback ensuring check-in capability is never interrupted',
        },
      ],
    },
    {
      heading: 'Uppmätt påverkan',
      paragraphs: [
        "After one month of operation, QR check-in adoption increased from 15% to 24% - a 60% relative improvement. Guest feedback surveys indicated the animated QR was 'easier to notice' and 'felt more modern.' Desk queue times decreased measurably during peak periods as more guests self-served via the QR.",
        'Importantly, zero scanning failures were reported despite thousands of daily scans. The conservative animation approach had achieved the attention goal without sacrificing the reliability a check-in flow demanded. The lounge subsequently rolled out similar animated QRs to their other locations.',
        'Se Learn-guiden om animerade QR-koder för digital skyltning för de tekniska principerna bakom säker animationsdesign.',
      ],
      images: [
        {
          src: '/images/examples/animated-metrics.png',
          alt: 'A dashboard showing adoption rate increase, queue time reduction, and zero-failure scan reliability over the deployment period',
          caption:
            'One month of data: 60% adoption increase, reduced queue times, and maintained perfect scan reliability',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif&animPattern=pulse#animation',
          label: 'Öppna generatorn',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-21',
          label: 'Bläddra Lär artiklar',
          type: 'learn',
        },
      ],
    },

    // ===== Example 5: Cross-Lingual Collaboration (IDs 1152-1178) =====
    {
      heading: 'Fallstudie: Global produktlansering QR-kampanj',
      paragraphs: [
        'Detta exempel följer ett hemelektronikföretag som lanserar en ny produkt samtidigt på 12 marknader på 8 språk. Varje regionalt marknadsföringsteam behövde producera förpackningar, detaljhandelsdisplayer och reklammaterial med QR-koder som länkar till lokaliserade produktsidor. Tidigare lanseringar hade resulterat i inkonsekvent QR-stil, enstaka skanningsfel och ett "telefonspel" med konfigurationsdrift när varje lag återskapade koder från skärmdumpar.',
        'Lösningen utnyttjade ANQR:s delbara konfigurationslänkar för att etablera en enda källa till sanning som varje regionalt team kunde komma åt, oavsett deras gränssnittsspråk. QR-nyttolasten använde en smart omdirigering som upptäckte användarspråk, så en kod fungerade globalt samtidigt som den levererade lokaliserade upplevelser.',
      ],
      images: [
        {
          src: '/images/examples/collab-overview.png',
          alt: 'En världskarta som visar 12 marknadsplatser med QR-koder, några visuellt inkonsekventa med varandra',
          caption:
            'Utmaningen: 12 marknader, 8 språk och en historia av inkonsekventa QR-implementeringar över regioner',
        },
      ],
    },
    {
      heading: 'Etablera huvudkonfigurationen',
      paragraphs: [
        'Det globala varumärkesteamet skapade den auktoritativa QR-konfigurationen i ANQR: märkesfärger som matchar produktlinjens visuella identitet, Error Correction H för tillförlitlighet i alla tryckta och digitala applikationer och styling som skulle reproduceras konsekvent oavsett lokala produktionsmetoder. Konfigurationen låstes och delningslänken dokumenterades i den globala kampanjrapporten.',
        'Kritiskt sett använde den kodade URL:en en språkdetekterande omdirigeringstjänst. När de skannades omdirigerades användarna automatiskt till sin produktsida på det lokala språket. Detta innebar att alla 12 marknader kunde använda identiska QR-koder - inga nyttolastvariationer per marknad som kunde skapa fel.',
      ],
      images: [
        {
          src: '/images/examples/collab-master.png',
          alt: 'ANQR-gränssnittet som visar huvudkonfigurationen med varumärkesfärger, ECC H och den smarta omdirigeringsadressen',
          caption:
            'Huvudkonfigurationen: globala varumärkesstandarder kodade till en enda, delbar sanningskälla',
        },
      ],
    },
    {
      heading: 'Regionalt arbetsflöde',
      paragraphs: [
        'Varje regionalt marknadsföringsteam fick konfigurationslänken med enkla instruktioner: öppna länken, kontrollera att förhandsgranskningen stämmer överens med varumärkets riktlinjer, exportera i det format som krävs för din applikation. ANQR-gränssnittet visades på varje teams föredragna språk, men de underliggande QR-inställningarna förblev identiska oavsett gränssnittsspråk.',
        'När det japanska teamet behövde SVG för avancerade detaljhandelsskärmar och det brasilianska teamet behövde PNG för sociala medier, exporterade båda från samma konfiguration. När det tyska lagets tryckerileverantör begärde specifika färgvärden kunde de referera till konfigurationen direkt istället för att gissa från en skärmdump.',
      ],
      images: [
        {
          src: '/images/examples/collab-regional.png',
          alt: 'Screenshots showing the same configuration link opened in Japanese, Portuguese, and German interfaces',
          caption:
            'Same configuration, different interfaces: regional teams work in their preferred language while maintaining global consistency',
        },
      ],
    },
    {
      heading: 'Hantering av regionala variationer',
      paragraphs: [
        'Vissa marknader krävde mindre anpassningar. The Chinese team needed a version with a WeChat-optimised frame for social sharing. Istället för att modifiera mastern skapade de en dokumenterad variant med en egen konfigurationslänk, tydligt märkt som "CN-WeChat-variant" i kampanjtillgångsbiblioteket. This maintained traceability while allowing necessary localisation.',
        "The brand team established a simple rule: any variation from master required a new, documented configuration link. No modifications to exported files, no 'quick fixes' in design software. This prevented the configuration drift that had plagued previous launches.",
      ],
      images: [
        {
          src: '/images/examples/collab-variants.png',
          alt: 'An asset library interface showing the master configuration and approved regional variants, each with its own link',
          caption:
            'Campaign asset governance: master configuration plus documented variants, all traceable via configuration links',
        },
      ],
    },
    {
      heading: 'Startresultat',
      paragraphs: [
        'På produktlanseringsdagen distribuerades QR-koder över förpackningar, återförsäljare, evenemangsmaterial och digitala kampanjer på alla 12 marknader samtidigt. Kvalitetsrevisioner bekräftade visuell överensstämmelse mellan regioner - QR-koden på Tokyo-butiksskärmarna matchade QR-koden på São Paulo-förpackningen och QR-koden på Berlin-evenemangsbanner.',
        'Zero scanning failures were reported across markets. When a post-launch product page URL change was needed, the redirect service handled it invisibly - no reprinting required. The global team estimated the configuration link approach saved 40+ hours of coordination time compared to their previous launch methodology.',
        'See the Learn guide on cross-lingual QR collaboration for the workflow principles behind global campaign consistency.',
      ],
      images: [
        {
          src: '/images/examples/collab-success.png',
          alt: 'A grid of photographs showing consistent QR deployment across different markets: Tokyo retail, São Paulo packaging, Berlin events',
          caption:
            'Global consistency achieved: identical QR presentation across 12 markets despite different languages, vendors, and formats',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Öppna generatorn',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-28',
          label: 'Bläddra Lär artiklar',
          type: 'learn',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Bläddra Lär artiklar', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Öppna hela användarhandboken', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'Öppna galleriet', type: 'gallery' },
  ],
};
