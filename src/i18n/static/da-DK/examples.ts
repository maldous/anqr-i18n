import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Examples page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 * IDs 1044-1178 contain enhanced, unique content for each field.
 */
export const examples: PageDefinition = {
  title: 'ANQR Eksempler',
  description: 'Fem real-world, produktion-stil eksempler, der viser, hvor QR-koder skaber målelig værdi: Opløfte en ældre detail counter kode, mærkevarer detailbetalinger og "scan- til" handlinger, udskrive skalering fra flyers til billboards, animeret QR til digital skiltning, og tværsprogligt samarbejde ved hjælp af shareable Anchor links. Hvert eksempel omfatter billeder, praktiske begrænsninger og et remix link tilbage til generatoren.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Åbn generatoren', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Gennemse Lær artikler', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Åbn den fulde brugervejledning', type: 'guide' },
  ],

  sections: [
    // ===== Example 1: Uplift Existing Campaign (IDs 1044-1070) =====
    {
      heading: 'Case Study: Retail Counter QR Uplift',
      paragraphs: ['Dette realverden eksempel følger en lille café, der havde brugt den samme QR kode på deres tæller i tre år. Den oprindelige kode blev genereret hurtigt under pandemien rush, trykt på standardpapir, og gled ind i en plastik stand. Det virkede stadig - teknisk set - men kunderne havde ofte brug for flere forsøg på at scanne det, og det gjorde intet for at styrke caféens omhyggeligt udformede mærke identitet.', 'Omdannelsen begyndte med en simpel revision: den eksisterende kode indkodet caféens online menu URL, som de ønskede at holde. Udfordringen var at få QR til at føle sig som en del af caféoplevelsen i stedet for en eftertanke fra 2020.'],
      images: [
        {
          src: '/images/examples/uplift-overview.png',
          alt: 'En vævet QR-kode i et plaststativ med synligt slid, fingeraftryk og falmet tryk',
          caption: 'Udgangspunktet: tre års counter service havde forladt den oprindelige QR knap fungerende',
        },
      ],
    },
    {
      heading: 'Diagnosticering af den oprindelige kodes problemer',
      paragraphs: ['Test afslørede flere problemer: den oprindelige kode, der anvendes Fejl korrektion L (minimum redundans), havde en rolig zone på kun 2 moduler, og blev trykt ved lav opløsning. Under caféen varme wolfram belysning, den allerede falmede sorte moduler knapt kontrastet mod gult papir. Ældre telefoner kæmpede; nyere telefoner lykkedes, men med mærkbar forsinkelse.', 'Ud over tekniske spørgsmål, den generiske sort-og-hvid firkant kommunikerede intet om mærket. Kunderne tøvede før scanningen - en diskret tillidsbarriere, der reducerede engagementet med caféens omhyggeligt designede digitale menu.'],
      images: [
        {
          src: '/images/examples/uplift-diagnosis.png',
          alt: 'Et diagnostisk overlay, der viser den oprindelige QR tekniske mangler: lav ECC, minimal stille zone, dårlig kontrast',
          caption: 'Teknisk analyse, der viser, hvorfor den nedarvede kode undergik realverdens forhold',
        },
      ],
    },
    {
      heading: 'Opløftningsprocessen',
      paragraphs: ['Ved hjælp af ANQR genskabte caféejeren koden med den identiske menu URL, men dramatisk forbedrede indstillinger: Fejlkorrektion H for maksimal modstandsdygtighed, en 6-moduls stille zone til pålidelig grænseledning, og brandfarver (dybe bordeaux moduler på flødebaggrund), der matcher caféens indvendige palet.', 'Der blev tilføjet et lille center-overlay med caféens logo - holdt bevidst diskret for at opretholde scanbarheden, samtidig med at det gav øjeblikkelig mærkegenkendelse. Sikkerhedstilstand bekræftede det nye design scannet pålideligt på tværs af testanordninger før enhver udskrivning.'],
      images: [
        {
          src: '/images/examples/uplift-process.png',
          alt: 'ANQR-grænsefladen viser konfigurationen: mærkefarver, passende ECC, generøs stille zone, subtile logo overlay',
          caption: 'Opbygning af den opgraderede konfiguration: Hver indstilling valgt til at balancere mærke udtryk med scanningspålidelighed',
        },
      ],
    },
    {
      heading: 'Målbare resultater',
      paragraphs: ['Efter implementering af den nye QR på professionel mat-lamineret kort lager, caféen sporet resultater over fire uger. Scan succesrate forbedret fra anslået 70% til næsten 100%. Gennemsnitlig scanningstid faldt fra 3-4 sekunder til under 1 sekund. Mest markant, menu engagement steg 40% - kunder, der tidligere kiggede på QR og gav op var nu scanne trygt.', 'Personalet rapporterede færre kundespørgsmål om \'hvordan man bruger QR\' og ikke flere tilfælde af manuelt at skrive URL for frustrerede kunder. Det mærkevarer udseende også tændt samtaler, med kunderne kommentere positivt på den sammenhængende design.'],
      images: [
        {
          src: '/images/examples/uplift-results.png',
          alt: 'A før / efter sammenligning med målinger: scan succesrate, gennemsnitlig scan tid, og ugentlige scan tæller forbedringer',
          caption: 'Fire ugers data, der viser den målelige virkning af en tankevækkende QR opløft',
        },
      ],
    },
    {
      heading: 'Genoprette denne indstilling',
      paragraphs: ['Caféen viser konservativ, men effektiv branding: Fejlkorrektion H, 6-modul stille zone, høj kontrast mærke farver, og en minimal center overlay. Denne balance fungerer for de fleste detailhandel counter applikationer, hvor pålidelighed skal komme først, men mærke tilstedeværelse stadig betyder noget.', 'Åbn generatoren med disse indstillinger forudindlæst og tilpasse farver og overlay til dit eget mærke. Den vigtigste indsigt: pålidelighed forbedringer alene kan dramatisk øge engagement, selv før tilføje nogen visuel styling.', 'Se vejledning i at forbedre eksisterende QR kampagner for den fulde metodologi bag denne tilgang.'],
      images: [
        {
          src: '/images/examples/uplift-config.png',
          alt: 'Link til generatoren forudkonfigureret med caféens indstillinger for øjeblikkelig tilpasning',
          caption: 'Start med en dokumenteret konfiguration og tilpasse til dit mærke',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H&margin=6#render',
          label: 'Åbn generatoren',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-0',
          label: 'Gennemse Lær artikler',
          type: 'learn',
        },
      ],
    },

    // ===== Example 2: Branded Retail Payments (IDs 1071-1097) =====
    {
      heading: 'Case Study: Multi- Payment Counter Display',
      paragraphs: ['Dette eksempel følger en boutique tøj butik, der havde akkumuleret fem forskellige QR-koder på deres register: bank betaling, tips, Instagram, Google anmeldelser, og en leje link. Hver blev genereret fra en anden kilde, trykt på forskellige tidspunkter, og vises i mismatchede stande. Det visuelle kaos undergravede butikkens omhyggeligt kurerede æstetik, og personalet tog sig regelmæssigt af kunderne og scannede den forkerte kode.', 'Løsningen krævede adskillelse af bekymringer: betalingskoder krævede maksimal pålidelighed med konservativ styling, mens markedsføringskoder kunne være mere ekspressive. Det samlede display system, der opstod, viser, hvordan man kan afbalancere mærkets tilstedeværelse i forhold til de funktionelle krav i forskellige QR-anvendelsestilfælde.'],
      images: [
        {
          src: '/images/examples/payments-overview.png',
          alt: 'Et rodet register med fem QR-koder i forskellige stande og trykte materialer',
          caption: 'Det kaotiske udgangspunkt: fem frakoblede QR-koder konkurrerer om opmærksomhed og forårsager kundeforvirring',
        },
      ],
    },
    {
      heading: 'Prioritering af betalingsoplevelsen',
      paragraphs: ['Butikkens primære betalingsmetode anvendte en regional standard, der krævede streng overholdelse af nyttelast. Test viste, at selv mindre styling påvirket scanningshastighed med visse bank apps. Beslutningen: holde betalingen QR helt umodificeret undtagen for størrelsesoptimering og professionel trykning på mat kort lager.', 'Denne konservative tilgang betød, at betalingskoden så mindre "mærket" end ideel, men transaktionernes gennemførelsesgrad blev forbedret dramatisk. Indsigt: Betalingsøjeblikke er ikke branding muligheder - de er pålidelighed øjeblikke. Kunderne sætter pris på hastighed og sikkerhed over æstetik, når penge er involveret.'],
      images: [
        {
          src: '/images/examples/payments-primary.png',
          alt: 'En ren, stor betaling QR kode på professionel mat kort lager, placeret fremtrædende i registret',
          caption: 'Betalingen QR: størrelse generøst, trykt professionelt, stylet konservativt for øjeblikkelig anerkendelse af bank apps',
        },
      ],
    },
    {
      heading: 'Oprettelse af den sekundære handlingsskærm',
      paragraphs: ['For tips, anmeldelser, sociale, og leje, kan butikken være mere udtryksfuld. Disse koder blev regenereret i ANQR med konsekvent mærke styling: butikkens signatur oliven grøn på fløde, afrundet modul stil, og en subtile center overlay med butikkens ikon. Fejlkorrektion H sikret pålidelighed selv med styling.', 'Disse fire koder blev arrangeret i et mærkepanel placeret ved siden af (ikke konkurrerer med) betalingskoden. Klare etiketter i butikkens typografi forklarede hver kodes formål. Det visuelle hierarki var bevidst: betaling stod alene og fremtrædende; sekundære handlinger grupperet sammen som muligheder.'],
      images: [
        {
          src: '/images/examples/payments-secondary.png',
          alt: 'En mærkevare panel viser fire stylede QR-koder for tips, anmeldelser, sociale, og leje, med klare etiketter',
          caption: 'Det sekundære aktionspanel: ensartet branding, klar mærkning, placeret som valgmuligheder snarere end distraktioner',
        },
      ],
    },
    {
      heading: 'Displaysystemdesign',
      paragraphs: ['Den fysiske skærm løste flere problemer samtidigt. Både betalingsstangen og det sekundære panel brugte mat materiale til at fjerne blænding fra overhead belysning. Højderne blev optimeret til kunder af forskellig størrelse. Vinkler rettet mod kunden kø snarere end flad på disken.', 'Kritisk set skabte butikken ekstra aftryk fra låste ANQR konfigurationslinks. Når tips koden i sidste ende fik kaffe-splashed, personale erstattet det inden for minutter ved hjælp af den gemte konfiguration - ingen screenshots, ingen gætte på indstillinger, ingen kvalitet forringelse.'],
      images: [
        {
          src: '/images/examples/payments-display.png',
          alt: 'Et diagram, der viser det fysiske display layout: højder, vinkler, materialer og forholdet mellem betaling og sekundære skærme',
          caption: 'Displaysystemtegning: fysisk ergonomi optimeret til pålidelig scanning på tværs af kundehøjder og lysforhold',
        },
      ],
    },
    {
      heading: 'Operationelle forbedringer',
      paragraphs: ['Seks uger efter indsættelsen, butikken dokumenteret betydelige forbedringer: nul kunde klager over "forkert kode" forvirring, hurtigere transaktionstider, og en 3x stigning i tip indlæg (kunder kunne nu finde og scanne tip kode uden uforskammet spørger personale). Google anmeldelser også øget som den dedikerede, velmærket QR fjernet friktion.', 'Personaleuddannelsen blev enklere: "betalingskoden er den store, alt andet er på panelet". Når betaling apps opdateret og en kort viste langsommere scanning, den konservative betalingskode design betød, at det stadig fungerede - bare marginalt langsommere i stedet for at fejle helt.', 'Se vejledningen Lær om QR-koder for detailbetalinger for principperne bag dette display system design.'],
      images: [
        {
          src: '/images/examples/payments-metrics.png',
          alt: 'Et måleinstrumentbræt, der viser før / efter sammenligninger: forvirring, transaktionstid, tipfrekvens, anmeldelser',
          caption: 'Seks ugers operationelle data, der viser den forretningsmæssige virkning af et gennemtænkt multi- QR display system',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Åbn generatoren',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-7',
          label: 'Gennemse Lær artikler',
          type: 'learn',
        },
      ],
    },

    // ===== Example 3: Print Scaling (IDs 1098-1124) =====
    {
      heading: 'Case Study: Fra business card til Billboard',
      paragraphs: ['Dette eksempel følger et event production firma forbereder en større konference. De havde brug for samme QR kode - linking til begivenheden app - indsat på tværs af radikalt forskellige formater: attendee badge indsatser (3cm), bordtkort (8cm), registrering skrivebord skiltning (30cm), wayfinding plakater (60cm), og en massiv scene baggrund banner (4 meter). Hvert format havde forskellige synsafstande, lysforhold og produktionsarbejdsgange.', 'Udfordringen var ikke kun teknisk - den var operationel. Flere leverandører håndterede forskellige print job, og virksomheden havde brug for at sikre konsistente, scannede resultater, uanset hvem der producerede hvad. Deres løsning var koncentreret om SVG eksport og streng overdragelse dokumentation.'],
      images: [
        {
          src: '/images/examples/print-overview.png',
          alt: 'En collage, der viser samme QR-kode fordelt på fem forskellige størrelser, fra skilt til banner',
          caption: 'En QR-kode, fem implementeringsstørrelser: udfordringen med at opretholde scanbarheden fra centimeter til meter',
        },
      ],
    },
    {
      heading: 'Hvorfor tidligere begivenheder havde problemer',
      paragraphs: ['På deres sidste konference havde virksomheden oplevet pinlige fiaskoer. Scenen banner QR blev genereret som en lille PNG og skaleret op i design software - resultatet så acceptabelt fra en afstand, men undlod at scanne pålideligt fra publikum. Badge QR var over- stylet og for små, frustrerende deltagere forsøger at tilføje kontakter. Ukonsistente indstillinger på tværs af formater betød den \'samme\' QR faktisk så forskellige på hvert stykke.', 'Efter-begivenhed analyse afslørede den grundlæggende årsag: ingen enkelt kilde til sandhed. Hver designer havde genskabt QR med lidt forskellige indstillinger, og hver printleverandør havde behandlet filer forskelligt. Kvalitet nedbrudt gennem telefonspil fil tømmermænd.'],
      images: [
        {
          src: '/images/examples/print-problems.png',
          alt: 'Close- up fotografier viser scanningsfejl: pixelerede bannermoduler, underdimensionerede badge koder, inkonsekvent styling på tværs af formater',
          caption: 'Kritisk analyse af tidligere begivenheder: hvert format havde indført forskellige kvalitetsproblemer',
        },
      ],
    },
    {
      heading: 'SVG-første arbejdsgang',
      paragraphs: ['For denne begivenhed, selskabet etableret en streng protokol: en master QR genereret i ANQR med optimale indstillinger (Fejl Korrektion H, generøs stille zone, ren styling), eksporteret som SVG, og gemt som den eneste autoritative kilde. ANQR konfigurationslinket blev dokumenteret sammen med SVG-filen, så koden kunne regenereres om nødvendigt.', 'Hver designer og sælger modtaget den samme SVG master med udtrykkelige instruktioner: sted på den ønskede størrelse, ikke ændre, opretholde rolige zone clearance. For sælgere, der kræver raster formater, virksomheden leveret præ-gjorde PNGs i specifikke størrelser med klare navngivning konventioner, der angiver påtænkte anvendelse.'],
      images: [
        {
          src: '/images/examples/print-workflow.png',
          alt: 'En filpakke, der viser SVG-master, SELSKABSspecifikke PNGs, specifikationsdokument og konfigurationslink',
          caption: 'Overdragelsespakken: alt, hvad leverandører har brug for for at producere konsekvente resultater uden at gætte',
        },
      ],
    },
    {
      heading: 'Size-specifikke overvejelser',
      paragraphs: ['Hvert format krævede særlig opmærksomhed. Badge indsats på 3 cm skulle QR til at besætte maksimal tilgængelig plads - scanning afstand ville være armlængde. Bordtelte på 8 cm kunne omfatte dekorative indramning uden for den stille zone. Den 4-meter banner krævede beregning: fra typiske publikum afstand (15-20 meter), moduler skal være klart kan skelnes med telefonkameraer, hvilket betød, at QR skulle være mindst 80cm inden for bannerdesignet.', 'Virksomheden skabte en størrelsesvejledning, der dokumenterer minimale QR-dimensioner for hver forventet scanningsafstand. Dette blev et genanvendeligt aktiv for fremtidige begivenheder, fjerne gætteri fra designprocessen.'],
      images: [
        {
          src: '/images/examples/print-sizing.png',
          alt: 'Et diagram, der viser forholdet mellem scanningsafstand, mindste QR-størrelse og moduldimensioner for hvert begivenhedsformat',
          caption: 'Størrelsesmatrix: beregnede dimensioner, der sikrer pålidelig scanning i hvert format \'forventede synsafstand',
        },
      ],
    },
    {
      heading: 'Produktionsresultater',
      paragraphs: ['Valideringen af konferencedagen var systematisk: personalet testede hver indsat QR, før dørene blev åbnet. Skiltet indsætter scannet øjeblikkeligt på armlængde. Bordtelte arbejdede pålideligt i den variable belysning af breakout rum. Scenebanneret - den forrige begivenheds forlegenhed - scannet med succes fra midten af publikum området.', 'Ingen scanningsklager blev logget på tværs af 2.000 + deltagere. Den operationelle gevinst var lige så betydelig: Når en sidste-minut sponsor tilføjelse krævede ny skiltning, produktionen team genereret det fra master SVG i minutter, sikker på, at det ville matche alt andet.', 'Se instruktionsvejledning om print- ready QR-koder for SVG vs PNG-beslutningsrammen og overdragelse af bedste praksis.'],
      images: [
        {
          src: '/images/examples/print-success.png',
          alt: 'Event fotografering viser deltagere vellykket scanning QR-koder i forskellige størrelser og afstande i hele mødestedet',
          caption: 'Konferencedag succes: pålidelig scanning på tværs af alle formater, fra badge closeups til scene banner afstand skud',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=svg#output',
          label: 'Åbn generatoren',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-14',
          label: 'Gennemse Lær artikler',
          type: 'learn',
        },
      ],
    },

    // ===== Example 4: Animated Signage (IDs 1125-1151) =====
    {
      heading: 'Case Study: Lufthavnslokale Digital Display',
      paragraphs: ['Dette eksempel følger et flyselskab lounge, der havde brugt statiske QR-koder på deres digitale velkomstskærme. Skærmene viste roterende reklameindhold, men QR-koden for lounge check-in sad i et hjørne, statisk og let overset. Analytics viste kun 15% af de støtteberettigede gæster brugte QR check-in trods det er hurtigere end skrivebordskø. De fleste gæster bemærkede det simpelthen ikke.', 'Hypotesen var enkel: i et visuelt travlt miljø med bevægeligt indhold, en statisk QR bliver usynlig. Den løsning, der er nødvendig for at gøre QR mærkbar uden at kompromittere den pålidelighed, der kræves for en check-in flow, hvor fiasko ville betyde frustrerede rejsende og længere skrivebord køer.'],
      images: [
        {
          src: '/images/examples/animated-overview.png',
          alt: 'En digital skærm i en lufthavn lounge, der viser salgsfremmende indhold med en lille, statisk QR-kode i hjørnet',
          caption: 'Den oprindelige setup: en statisk QR tabt i et hav af dynamisk salgsfremmende indhold, opnå kun 15% vedtagelse',
        },
      ],
    },
    {
      heading: 'Designer sikker animering',
      paragraphs: ['Lounge \'s digitale skiltning brugte store LED-paneler - et udfordrende miljø, hvor aggressiv animation kunne skabe scanningsproblemer. Design team startede konservativt: en blid puls effekt, der subtly udvidet og indgået QR visuelle tilstedeværelse uden at ændre den faktiske kode struktur. Ramme timing blev sat langsom (250 ms) for at undgå eventuelle flimmer problemer med LED opdateringshastighed.', 'Valideringen af sikkerhedstilstanden bekræftede, at alle rammer kan scannes. Yderligere test på de faktiske LED paneler afslørede, at pulsen skulle være endnu mere subtile end desktop forhåndsvisninger foreslået - LED lysstyrke og visning vinkler påvirket opfattes kontrast mere end forventet.'],
      images: [
        {
          src: '/images/examples/animated-config.png',
          alt: 'ANQR-animationsindstillingspanelet viser pulskonfiguration: langsom timing, subtil intensitet, sikkerhedstilstand aktiveret',
          caption: 'Animation konfiguration: parametre tunet til LED panel display, mens opretholde scanningen pålidelighed i hver ramme',
        },
      ],
    },
    {
      heading: 'Integration med signageindhold',
      paragraphs: ['Den animerede QR var placeret i en dedikeret \'stabil zone\' af skærmen layout - et område, der forblev konstant, mens salgsfremmende indhold roteret i de vigtigste display område. Denne adskillelse var afgørende: QR nødvendig visuel stabilitet til scanning, selv mens tiltrække opmærksomhed gennem sin subtile animation.', 'Der blev tilføjet en klar call- to- handling ved siden af QR: Skip køen - scan for at tjekke ind. Teksten forblev statisk, mens QR pulsed, skabe et visuelt hierarki, der trak øjet på scanningen mulighed uden at overvælde den salgsfremmende indhold.'],
      images: [
        {
          src: '/images/examples/animated-layout.png',
          alt: 'En skærm layout diagram viser den animerede QR i en stabil zone, mens salgsfremmende indhold roterer i hovedområdet',
          caption: 'Screen fast ejendom tildeling: den animerede QR indtager en stabil zone adskilt fra roterende salgsfremmende indhold',
        },
      ],
    },
    {
      heading: 'Teknisk implementering',
      paragraphs: ['Den animerede QR blev eksporteret som GIF med optimerede indstillinger til skiltning CMS. Filstørrelse overvejelser betød noget - loungens indhold management system havde upload grænser, og alt for store filer forårsaget afspilning stuttering. Den endelige eksport afbalanceret visuel kvalitet i forhold til filstørrelse ved at begrænse farve palet og optimere frame tæller.', 'Implementering omfattede en fallback: hvis GIF undlod at spille af en eller anden grund, skiltning system ville vise en statisk PNG backup. Denne redundans sikrede checkin kapacitet blev aldrig tabt på grund af tekniske problemer med animation.'],
      images: [
        {
          src: '/images/examples/animated-cms.png',
          alt: 'En CMS grænseflade, der viser den animerede QR upload med fallback statisk billede konfigureret',
          caption: 'Signal CMS konfiguration: animeret primær med statisk fall back sikrer check-in kapacitet aldrig afbrydes',
        },
      ],
    },
    {
      heading: 'Målt virkning',
      paragraphs: ['Efter en måneds drift, QR check-in adoption steg fra 15% til 24% - en 60% relativ forbedring. Gæstetilbagemeldinger viste, at den animerede QR var \'lettere at bemærke\' og \'følte sig mere moderne\'. Deskekøetiden faldt målbart i spidsbelastningsperioder, da flere gæster serverede selv via QR.', 'Vigtigt, ingen scanningsfejl blev rapporteret på trods af tusindvis af daglige scanninger. Den konservative animation tilgang havde opnået opmærksomhed mål uden at ofre den pålidelighed en check-in flow krævede. Loungen efterfølgende rullet ud lignende animerede QR \'er til deres andre steder.', 'Se vejledningen Lær om animerede QR-koder for digital skiltning for de tekniske principper bag sikker animation design.'],
      images: [
        {
          src: '/images/examples/animated-metrics.png',
          alt: 'Et instrumentbræt, der viser en stigning i adoptionshastigheden, en reduktion af køens tid og en scanningspålidelighed med zero-fejl i implementeringsperioden',
          caption: 'En måneds data: 60% adoption stigning, reduceret kø gange, og opretholdt perfekt scanning pålidelighed',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&format=gif&animPattern=pulse#animation',
          label: 'Åbn generatoren',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-21',
          label: 'Gennemse Lær artikler',
          type: 'learn',
        },
      ],
    },

    // ===== Example 5: Cross-Lingual Collaboration (IDs 1152-1178) =====
    {
      heading: 'Case Study: Global produkt lancering QR kampagne',
      paragraphs: ['Dette eksempel følger en virksomhed inden for forbrugerelektronik, der lancerer et nyt produkt samtidigt på 12 markeder på 8 sprog. Hvert regionalt markedsføringshold havde behov for at producere emballage, displays og reklamemateriale med QR-koder, der forbinder med lokale produktsider. Tidligere lanceringer havde resulteret i inkonsekvent QR styling, lejlighedsvis scanning fejl, og et \'telefonspil\' af konfiguration drift som hvert hold genskabt koder fra screenshots.', 'Løsningen gearede ANQR \'s delelige konfiguration links til at etablere en enkelt kilde til sandhed, at hvert regionalt hold kunne få adgang, uanset deres interface sprog. QR nyttelasten brugte en smart omdirigering, der detekterede brugersproget, så en kode fungerede globalt og leverede lokale oplevelser.'],
      images: [
        {
          src: '/images/examples/collab-overview.png',
          alt: 'Et verdenskort med 12 markedsplaceringer med QR-koder, nogle visuelt uforenelige med hinanden',
          caption: 'Udfordringen: 12 markeder, 8 sprog og en historie med inkonsekvente QR implementeringer på tværs af regioner',
        },
      ],
    },
    {
      heading: 'Oprettelse af masterkonfiguration',
      paragraphs: ['Det globale brand team skabte den autoritative QR konfiguration i ANQR: mærke farver, der matcher produktlinjens visuelle identitet, Fejl Rettelse H for pålidelighed på tværs af alle print og digitale applikationer, og styling, der ville reproducere konsekvent uanset lokale produktionsmetoder. Konfigurationen var låst og aktielinket dokumenteret i den globale kampagneoversigt.', 'Kritisk, den kodede URL brugt et sprog-detektere omdirigering service. Når scannet, brugere blev automatisk omdirigeret til deres lokale sprog produkt side. Dette betød, at alle 12 markeder kunne bruge identiske QR-koder - ingen variationer i nyttelast på markedet, der kunne indføre fejl.'],
      images: [
        {
          src: '/images/examples/collab-master.png',
          alt: 'ANQR-grænsefladen, der viser hovedkonfigurationen med mærkefarver, ECC H og den smarte omdirigerede URL',
          caption: 'Master konfiguration: globale brand standarder kodet ind i en enkelt, delelig kilde til sandhed',
        },
      ],
    },
    {
      heading: 'Arbejdsgang for regionale grupper',
      paragraphs: ['Hvert regionalt marketinghold modtog konfigurationslinket med enkle instruktioner: Åbn linket, verificer forhåndsvisningen matcher mærkets retningslinjer, eksport i det ønskede format til din ansøgning. Den ANQR interface vises i hvert holds foretrukne sprog, men de underliggende QR indstillinger forblev identiske uanset interface sprog.', 'Når det japanske team havde brug for SVG til high-end detaildisplays og det brasilianske team havde brug for PNG til sociale medier, begge eksporteret fra samme konfiguration. Da det tyske holds udskriftsleverandør anmodede om specifikke farveværdier, kunne de henvise konfigurationen direkte frem for at gætte fra et skærmbillede.'],
      images: [
        {
          src: '/images/examples/collab-regional.png',
          alt: 'Skærmbilleder, der viser det samme konfigurationslink åbnet i japanske, portugisiske og tyske grænseflader',
          caption: 'Samme konfiguration, forskellige grænseflader: Regionale hold arbejder i deres foretrukne sprog, samtidig med at den globale sammenhæng bevares',
        },
      ],
    },
    {
      heading: 'Håndtering af regionale variationer',
      paragraphs: ['Nogle markeder krævede mindre tilpasninger. Det kinesiske team havde brug for en version med en WeChat- optimeret ramme for social deling. I stedet for at ændre master, de skabte en dokumenteret variant med sin egen konfiguration link, tydeligt mærket som \'CN- WeChat variant\' i kampagnen aktiv bibliotek. Dette fastholdt sporbarheden, samtidig med at det muliggjorde den nødvendige lokalisering.', 'Mærketeamet indførte en simpel regel: Enhver variation fra master krævede et nyt dokumenteret konfigurationslink. Ingen ændringer til eksporterede filer, ingen "hurtige rettelser" i design software. Dette forhindrede den konfiguration drift, der havde plaget tidligere lanceringer.'],
      images: [
        {
          src: '/images/examples/collab-variants.png',
          alt: 'En grænseflade til aktivbiblioteket, der viser masterkonfigurationen og godkendte regionale varianter, hver med sit eget link',
          caption: 'Kampagne forvaltning af aktiver: master konfiguration plus dokumenterede varianter, alle sporbar via konfigurationslinks',
        },
      ],
    },
    {
      heading: 'Start resultater',
      paragraphs: ['Produkt lanceringen dag så QR koder indsat på tværs af emballage, detaildisplays, begivenhed materialer, og digitale kampagner på alle 12 markeder samtidig. Kvalitetskontrol bekræftede visuel konsistens på tværs af regioner - QR på Tokyo detaildisplays matchede QR på São Paulo emballage matchede QR på Berlin event bannere.', 'Nul scanningsfejl blev rapporteret på tværs af markeder. Når en post- lancering produkt side URL ændring var nødvendig, omdirigering service håndteret det usynligt - ingen genudskrivning kræves. Det globale team anslog konfigurationsforbindelsesmetoden sparet 40 + timers koordinationstid sammenlignet med deres tidligere lanceringsmetode.', 'Se Vejledningen Lær om tværsprogligt QR-samarbejde om principperne for arbejdsgang bag global kampagne sammenhæng.'],
      images: [
        {
          src: '/images/examples/collab-success.png',
          alt: 'Et gitter af fotografier, der viser konsekvent QR implementering på forskellige markeder: Tokyo detailhandel, São Paulo emballage, Berlin begivenheder',
          caption: 'Global sammenhæng opnået: identisk QR præsentation på 12 markeder på trods af forskellige sprog, leverandører og formater',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#share',
          label: 'Åbn generatoren',
          type: 'generator',
        },
        {
          href: '/learn?lang=${lang}#section-28',
          label: 'Gennemse Lær artikler',
          type: 'learn',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/learn?lang=${lang}', label: 'Gennemse Lær artikler', type: 'learn' },
    { href: '/guide?lang=${lang}', label: 'Åbn den fulde brugervejledning', type: 'guide' },
    { href: '/gallery?lang=${lang}', label: 'Åbn galleriet', type: 'gallery' },
  ],
};
