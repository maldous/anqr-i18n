import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR användarhandbok',
  description: 'Komplett guide till att använda ANQR för att skapa QR-koder.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Komma igång',
      paragraphs: [
        'ANQR är en QR-kodgenerator med ett klientfokuserat tillvägagångssätt. Som standard genereras QR-koder lokalt i din webbläsare – inget konto krävs och dina data förblir privata. För professionell inbäddning kan du också använda serversidans API.',
        'Gränssnittet har tre gränssnittsnivåer: Grundläggande, Avancerad och Professionell. Välj din nivå med hjälp av flikarna i rubriken. Varje nivå låser upp ytterligare funktioner samtidigt som gränssnittet fokuserar på vad du behöver.',
      ],
      bullets: [
        'Grundläggande: Enkel QR-kodskapning med vanlig text/URL-innehåll och bildöverlagring.',
        'Avancerat: QR-kodningsalternativ, renderingsstilar, animering, utdataformat, utökade innehållstyper och anpassning av överlägg.',
        'Professionellt: Vattenstämplar, metadata, delning, säkerhetsanalys, QR-koder för betalning och företagsfunktioner.',
      ],
    },
    {
      heading: 'Snabbstart',
      paragraphs: ['Så här skapar du din första QR-kod:'],
      bullets: [
        '1. Välj en innehållstyp (URL, text, WiFi, etc.) från rullgardinsmenyn Innehållstyp.',
        '2. Ange dina uppgifter i de angivna fälten.',
        '3. Anpassa färger och stilar, och lägg till en överläggsbild.',
        '4. Klicka på Exportera för att ladda ner din QR-kod som PNG, GIF, WebP eller SVG.',
      ],
    },
    {
      heading: 'Grundläggande funktioner',
      paragraphs: [
        'Grundnivån erbjuder ett strömlinjeformat gränssnitt för att skapa QR-koder med nyttolastinnehåll och bildöverlagringar. Detta är det enklaste sättet att komma igång.',
      ],
    },
    {
      heading: 'Innehållstyper (grundläggande)',
      paragraphs: [
        'Vanlig text: Koda valfri text upp till QR-kodens kapacitetsgräns. Perfekt för korta meddelanden, koder eller identifierare.',
        'URL: Koda webbadresser. QR-koden öppnar URL:en när den skannas. Stöder protokollen http:// och https://.',
      ],
    },
    {
      heading: 'Bildöverlagring (grundläggande)',
      paragraphs: [
        'Ladda upp en bild (JPG, PNG, GIF, WebP) som ska blandas med din QR-kod. Grundläggande överlagringsfunktioner inkluderar:',
      ],
      bullets: [
        'Ladda upp från fil: Välj en bild från din enhet.',
        'Ladda från URL: Ange en bild-URL (måste tillåta CORS).',
        'Centerlogotyp: Placerar bilden i mitten, beroende på felkorrigering.',
        'Blandning: Enkel alfablandning av bild med QR-mönster.',
        'Intensitet: Styr hur starkt överlagringen påverkar QR-koden (0–100 %).',
        'Färgläge: Fullfärg, gråskala eller svartvitt.',
        'Bevara sökarmönster: Håller hörnmönster oförändrade för tillförlitlig skanning.',
      ],
    },
    {
      heading: 'Avancerade funktioner',
      paragraphs: [
        'Den avancerade nivån låser upp QR-kodningsalternativ, renderingsstilar, animering, utdataformat, utökade innehållstyper och avancerad anpassning av överlägg.',
      ],
    },
    {
      heading: 'Inställningar för QR-kodning',
      paragraphs: [
        'Version: QR-koder finns i versionerna 1–40, där högre versioner innehåller mer data men är större. Ställ in på 0 (Auto) för att låta ANQR välja den minsta versionen som passar ditt innehåll.',
        'Felkorrigering: Bestämmer hur mycket skada en QR-kod kan åstadkomma samtidigt som den är skanningsbar.',
      ],
      bullets: [
        'L (Låg): 7 % felkorrigering – minsta storlek, minst redundans.',
        'M (Medium): 15 % felkorrigering – balanserat alternativ.',
        'Q (kvartil): 25 % felkorrigering – bra för utskrivna koder.',
        'H (Hög): 30 % felkorrigering – bäst för koder med överlagringar eller under svåra förhållanden.',
      ],
    },
    {
      heading: 'Tyst zon (marginal)',
      paragraphs: [
        'Den tysta zonen är det vita utrymmet runt QR-koden. Skannrar behöver denna marginal för att upptäcka var koden börjar. Standarden rekommenderar minst 4 moduler. Att minska till under 4 kan orsaka skanningsproblem.',
      ],
    },
    {
      heading: 'Modulstil',
      paragraphs: [
        'Moduler är de individuella rutor som utgör en QR-kod. ANQR erbjuder fem stilar:',
      ],
      bullets: [
        'Kvadrat: Klassiskt QR-utseende med skarpa hörn.',
        'Avrundad: Mjukare hörn för ett vänligare utseende.',
        'Prickar: Cirkulära moduler för en modern estetik.',
        'Diamant: 45° roterade rutor för ett distinkt mönster.',
        'Anslutna: Moduler sammanfogas när de ligger intill varandra och skapar organiska former.',
      ],
    },
    {
      heading: 'Finder-mönsterstil',
      paragraphs: [
        'Findermönster är de tre stora rutorna i QR-hörnen som hjälper skannrar att orientera koden. Tillgängliga stilar:',
      ],
      bullets: [
        'Kvadratisk: Standard fyrkantiga hörn.',
        'Avrundad: Mjuka hörn som matchar rundad modulstil.',
        'Cirkel: Cirkulära sökmönster för punktformade koder.',
      ],
    },
    {
      heading: 'Justering och tidsmönster',
      paragraphs: [
        'Justeringsmönster visas i större QR-koder (version 2+) för att korrigera distorsion. Tidsmönster är de alternerande linjerna som förbinder sökarmönster.',
      ],
      bullets: [
        'Justeringsstil: Matchningssökare, Kvadratisk, Rundad eller Cirkel.',
        'Tidstil: Matchningsmodul, Heldragen eller Streckad.',
      ],
    },
    {
      heading: 'Färger',
      paragraphs: [
        'Förgrund: Färgen på QR-modulerna. Svart (#000000) är standard men vilken mörk färg som helst fungerar.',
        'Bakgrund: Bakgrundsfärgen. Vit (#ffffff) är standard. Se till att kontrasten är tillräcklig mot förgrunden.',
        'Transparent bakgrund: Ta bort bakgrunden helt för användning på färgade ytor. Se till att ytan ger tillräcklig kontrast.',
      ],
    },
    {
      heading: 'Modulstorlek och mellanrum',
      paragraphs: [
        'Modulstorlek: Styr hur stor varje modul renderas i pixlar. Större värden skapar större och lättare att skanna koder.',
        'Modulmellanrum: Lägger till mellanrum mellan moduler som en procentandel. Små mellanrum (5–15 %) kan förbättra skanningsbarheten under vissa förhållanden, men alltför stora mellanrum minskar tillförlitligheten.',
      ],
    },
    {
      heading: 'Utmatningsinställningar',
      paragraphs: ['Format: Välj ditt exportformat baserat på användningsfall.'],
      bullets: [
        'PNG: Förlustfritt rasterformat, perfekt för de flesta användningsområden. Bäst för tryck och digitalt.',
        'WebP: Modernt format med mindre filstorlekar. Bra för webbanvändning.',
        'GIF: Krävs för animerade QR-koder. Stöder transparens.',
        'SVG: Vektorformat som skalar oändligt. Bäst för stor stil eller när du behöver redigera koden.',
      ],
    },
    {
      heading: 'Utmatningsdimensioner',
      paragraphs: [
        'Bredd/Höjd: Ställ in utskriftsstorleken i pixlar. För utskrift, beräkna baserat på DPI (t.ex. 300 DPI vid 1 tum = 300px). Större storlekar skannar mer tillförlitligt på avstånd.',
      ],
    },
    {
      heading: 'Animationsinställningar (Avancerade)',
      paragraphs: ['Styra animerad QR-kods beteende:'],
      bullets: [
        'Hastighet: Animeringens bildhastighet i millisekunder.',
        'Loop: Kontinuerlig eller enkelspelande animation.',
        'Studsa: Regi av pingis-animation.',
        'Starta bildruta: Börja animeringen från en specifik bildruta.',
        'Max antal bildrutor: Begränsa totalt antal bildrutor i animeringen.',
        'Bildrutesteg: Hoppa över bildrutor för snabbare animering.',
        'Interpolering: Ingen, Crossfade eller Morph mellan bildrutor.',
      ],
    },
    {
      heading: 'Innehållstyper (Avancerade)',
      paragraphs: ['Avancerad nivå låser upp ytterligare nyttolastformat:'],
      bullets: [
        'Telefonnummer (tel:): Skapar en anropbar telefonlänk.',
        'E-post (mailto:): Öppnar e-postklienten med valfritt ämne och brödtext.',
        'SMS: Förifyllt textmeddelande till ett telefonnummer.',
        'vCard: Fullständigt kontaktkort med namn, organisation, telefon, e-postadress, adress.',
        'MeCard: Kompakt kontaktformat populärt i Japan.',
        'BizCard: Äldre visitkortsformat.',
        'Geografisk plats: GPS-koordinater som öppnas i kartor.',
        'WiFi: Nätverksuppgifter för automatisk anslutning (SSID, lösenord, säkerhetstyp).',
        'Kalenderhändelse: iCalendar-format med titel, plats, datum/tid.',
        'OSA för evenemang: Länk till sidan för evenemangsregistrering.',
        'Kalenderprenumeration: Prenumerera på ett ICS/WebCal-flöde.',
        'Fil-/dokument-URL: Direktlänk till nedladdningsbara filer.',
        'Länk till molnlagring: Länkar till Google Drive, Dropbox, OneDrive, etc.',
        'Social profil: Länkar till LinkedIn, Twitter, Instagram etc.',
        'Meddelandenlänk: WhatsApp, Telegram, Signal djuplänkar.',
      ],
    },
    {
      heading: 'Avancerade överläggsfunktioner',
      paragraphs: ['Ytterligare överlagringsfunktioner:'],
      bullets: [
        'Beskär: Aktivera beskärning för att välja ett kvadratiskt område av din bild.',
        'Halvton: Klassiskt punktmönster i tryckstil baserat på bildens ljusstyrka.',
        'Rattrad: Feldiffusionsrattring för detaljerad reproduktion.',
      ],
    },
    {
      heading: 'Överläggsblandningslägen (avancerat)',
      paragraphs: ['Ytterligare blandningslägen på avancerad nivå:'],
      bullets: [
        'Subpixel: Delar upp varje modul i subpixlar för högre detaljrikedom.',
        'Blått brus: Använder blått brus-dithering för artefaktfria mönster.',
        'Mosaik: Kakelbaserad effekt som bevarar bildstrukturen.',
        'Fyll mellanrum: Placerar bilden i mellanrummen mellan modulerna.',
        'Ljusstyrka: Varierar modulstorleken baserat på bildens ljusstyrka.',
        'Duotone: Omvandlar bilden till två färger för slående kontrast.',
      ],
    },
    {
      heading: 'Överlagringsintensitet',
      paragraphs: [
        'Styrer hur starkt överlagringen påverkar QR-koden (0–100 %). Högre värden visar mer bilddetaljer men kan minska skanningsbarheten. Börja runt 70 % och justera baserat på tester.',
      ],
    },
    {
      heading: 'Färgläge',
      paragraphs: ['Hur överlagringsbilden bearbetas:'],
      bullets: [
        'Fullfärg: Bevarar bildens ursprungliga färger.',
        'Gråskala: Konverterar till svarta och vita toner.',
        'Svartvitt: Konvertering av binär bild med hög kontrast.',
      ],
    },
    {
      heading: 'Bevara sökarmönster',
      paragraphs: [
        'När den är aktiverad behålls de tre hörnmönstren oförändrade av överlägget. Rekommenderas starkt för tillförlitlig skanning.',
      ],
    },
    {
      heading: 'Bildförbehandling',
      paragraphs: [
        'Tillämpa filter på din överlagringsbild innan du blandar. Dessa justeringar kan förbättra hur bilden visas i den slutliga QR-koden.',
      ],
      bullets: [
        'Ljusstyrka (-100 till +100): Gör bilden ljusare eller mörkare.',
        'Kontrast (-100 till +100): Öka eller minska tonomfånget.',
        'Gamma (0,2 till 3,0): Icke-linjär ljusstyrkejustering. Värden under 1 ljusar upp mellantoner, över 1 mörkar upp dem.',
        'Mättnad (-100 till +100): Färgintensitet. -100 är gråskala, +100 är övermättad.',
        'Rotera nyans (0–360°): Flytta alla färger runt färghjulet.',
        'Oskärpa (0–20px): Mjuka upp bilddetaljer.',
        'Skärpa (0–100 %): Förbättra kanter och detaljer.',
        'Posterisering (0–16 nivåer): Minska färgnivåerna för en postereffekt.',
        'Tröskelvärde (0–255): Konvertera till binärt svart/vitt vid gränspunkten.',
        'Kantdetektering: Sobel- eller Canny-algoritmer för att endast visa kanter.',
        'Invertera: Vänd alla färger.',
      ],
    },
    {
      heading: 'Anpassningsläge',
      paragraphs: ['Hur överläggsbilden passar in i QR-kodsområdet:'],
      bullets: [
        'Omslag: Bilden fyller hela området, beskärs vid behov.',
        'Innehåller: Hela bilden är synlig, kan ha marginaler.',
        'Stretch: Bilden förvrängs för att fylla exakt.',
      ],
    },
    {
      heading: 'Transformeringsalternativ',
      paragraphs: [
        'Rotation: Rotera överlägget i steg om 90°.',
        'Vänd X/Y: Spegla bilden horisontellt eller vertikalt.',
      ],
    },
    {
      heading: 'Rasteralgoritmer',
      paragraphs: [
        'Rasterning konverterar bilder med kontinuerlig ton till mönster som QR-koder kan representera. Tillgängligt när blandningslägena Rasterning, Blått brus eller Sann Rasterning används.',
      ],
      bullets: [
        'Feldiffusion: Klassisk Floyd-Steinberg-stil. Spridar kvantiseringsfelet till angränsande pixlar.',
        'Orderad (Bayer): Använder en tröskelmatris för regelbundna mönster.',
        'Klustrad punkt: Simulerar rasterutskrift.',
        'Void & Cluster: Optimerad ordnad dithering.',
        'Blått brus: Visuellt behagligt slumpmässigt utseende mönster.',
        'Tröskelvärde för blått brus: Tröskelvärdesdissering med blått brustextur.',
        'Vitt brus: Slumpmässig tröskeldithering.',
        'Gaussiskt/Triangulärt brus: Brus med olika fördelningar.',
        'Blått brus + feldiffusion: Hybrid som kombinerar båda teknikerna.',
        'Skärmad blå brus: Skärmliknande blått brusmönster.',
        'Perceptuell: Luminansviktad för bättre visuella resultat.',
        'Kantmedveten: Bevarar bildens kanter under dithering.',
        'Adaptiv tröskel: Lokalt adaptiv tröskelvärde.',
        'Tillfälligt blått brus: För animerade GIF-bilder varierar mönstret per bildruta.',
      ],
    },
    {
      heading: 'Diffusionskärnor',
      paragraphs: ['Välj hur felet fördelas när du använder feldiffusionsdithering:'],
      bullets: [
        'Floyd-Steinberg: Klassisk 4-granndiffusion. Bra generellt val.',
        'Jarvis-Judice-Ninke: 12-grannare, smidigare men långsammare.',
        'Stucki: Liknar JJN med olika vikter.',
        'Burkes: Förenklad JJN, snabbare.',
        'Sierra: Kärnfamilj som balanserar kvalitet och hastighet.',
        'Atkinson: Ljusdiffusion, bevarar detaljer men kan vara kornig.',
      ],
    },
    {
      heading: 'Vibrationsstyrka',
      paragraphs: [
        'Styr hur mycket dithering som tillämpas (0–100 %). Lägre värden bevarar mer av det ursprungliga mönstret, högre värden visar mer bilddetaljer.',
      ],
    },
    {
      heading: 'Inställningar för delpixlar',
      paragraphs: ['När blandningsläget för delpixlar används:'],
      bullets: [
        'Rutnätsstorlek: 2×2, 3×3 eller 4×4 delpixlar per modul. Högre = mer detaljer.',
        'Mittregel: Strikt kräver att mittenunderpixeln matchar modulen. Halvtonsmitten tillåter variation.',
        'Neutral färg: Färg som används för obestämda delpixlar.',
        'Finder Override: Hur sökarmönster återges (heldragna eller stiliserade).',
      ],
    },
    {
      heading: 'Rasterinställningar',
      paragraphs: ['När du använder blandningsläget för rastertoner:'],
      bullets: [
        'Cellstorlek: Per modul eller N×N-rutnät.',
        'Punktform: Cirkel, Kvadrat eller Linje.',
        'Ljusstyrka: Linjär, S-kurva eller Gamma.',
      ],
    },
    {
      heading: 'Duotonfärger',
      paragraphs: [
        'När du använder blandningsläget Duotone, ställ in skuggfärgen (mörka områden) och högdagerfärgen (ljusa områden).',
      ],
    },
    {
      heading: 'Inställningar för GIF-animering',
      paragraphs: ['När man använder animerade GIF-överlägg:'],
      bullets: [
        'Använd bildfördröjningar: Respektera original GIF-timing.',
        'Max FPS: Begränsa bildfrekvens (1–60 fps).',
        'Avfallshantering: Respektera eller förenkla metoderna för avfallshantering av ramar.',
      ],
    },
    {
      heading: 'Avancerade renderingsalternativ',
      paragraphs: ['Ytterligare renderingskontroller:'],
      bullets: [
        'Mellanrumsläge: Ingen, Infälld, Linje eller Negativt mellanrum för mellanrumsstil.',
        'Hörnradie: Procentandel avrundade hörn för moduler.',
        'Gradient: Ingen, linjär, radiell eller konisk gradient på moduler.',
        'Öga yttre/inre stil: Oberoende stil för ringar med sökmönster.',
        'Punktrotation: Rotera diamant-/punktmoduler.',
        'Ögonskala: Storleksjustering för sökmönster.',
        'Ramstil: Lägg till dekorativa ramar (rundad ram, klistermärke, etikett).',
        'Ramtext: Lägg till text som Skanna mig! i ramar.',
      ],
    },
    {
      heading: 'Avancerad QR-kodning',
      paragraphs: ['Finjustera QR-kodning:'],
      bullets: [
        'Kodningsläge: Auto, Numerisk, Alfanumerisk, Byte/UTF-8 eller Kanji.',
        'Tillämpa minsta tysta zon: Säkerställ minst 4 modulers marginal.',
      ],
    },
    {
      heading: 'Avancerade utmatningsalternativ',
      paragraphs: ['Ytterligare exportinställningar:'],
      bullets: [
        'Filnamn: Anpassat filnamn för nedladdningar.',
        'GIF-palettstorlek: 2–256 färger i GIF-utdata.',
        'GIF-kvantiserare: Median Cut, NeuQuant eller Octree-färgreducering.',
        'GIF-rastrering: Av, Floyd-Steinberg eller Ordnad.',
        'GIF Transparent färg: Ställ in en färg som ska vara transparent.',
        'SVG True Vector: Använd sökvägar istället för inbäddat raster.',
        'SVG-formprecision: Pixel- eller exakt banåtergivning.',
        'SVG-bädda in rasteröverlägg: Inkludera överlägg som inbäddad bild.',
        'Bakgrundsåsidosättning: Tvinga fram en specifik bakgrundsfärg i utdata.',
      ],
    },
    {
      heading: 'Valideringsalternativ',
      paragraphs: ['Inställningar för inmatningsbehandling:'],
      bullets: [
        'Validera inmatning: Kontrollera innehållsformatet före kodning.',
        'Trim mellanslag: Ta bort inledande/efterföljande mellanslag.',
        'Normalisera radbrytningar: Konvertera alla radslut till LF.',
        'Maxlängdsskydd: Varna om innehållet överskrider QR-kapaciteten.',
      ],
    },
    {
      heading: 'Professionella funktioner',
      paragraphs: [
        'Professionell nivå lägger till vattenstämplar, metadata, delningsalternativ, säkerhetsanalys, QR-koder för betalning och företagsfunktioner.',
      ],
    },
    {
      heading: 'Vattenstämpel',
      paragraphs: ['Lägg till vattenstämplar i dina QR-koder:'],
      bullets: [
        'Typ: Text-, bild- eller mönstervattenmärke.',
        'Position: Centrum, Hörn, Kanter, Bakom eller Tyst Zon.',
        'Opacitet: Vattenstämpelns genomskinlighet (0–100 %).',
        'Blandningsläge: Normal, Multiplicera, Skärm eller Överlagringsblandning.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Bädda in metadata i exporterade filer:'],
      bullets: [
        'Fält för titel, författare, upphovsrätt, licens och beskrivning.',
        'Skapningstid: Bädda in genereringstidsstämpel.',
        'Anpassad nyckel-värde: Lägg till godtyckliga metadatapar.',
      ],
    },
    {
      heading: 'Delning',
      paragraphs: ['Dela dina QR-kodkonfigurationer:'],
      bullets: [
        'Direktlänk: Generera en delbar URL med dina nuvarande inställningar.',
        'Bädda in HTML: Hämta inbäddningskod för webbplatser.',
        'Kodningsparametrar: Inkludera alla inställningar i delnings-URL:en.',
        'Obs! Överlagringsbilder från lokala filer kan inte delas via URL.',
      ],
    },
    {
      heading: 'Säkerhetsanalys',
      paragraphs: ['Se till att QR-koder förblir skannade:'],
      bullets: [
        'Säkerhetsläge: Av, Balanserad eller Strikta skanningskrav.',
        'Minsta modulstorlek: Minsta pixelstorlek per modul.',
        'Minsta tysta zon: Moduler med minsta marginal.',
        'Låssökare/Timing/Justera/Format/Version: Skydda specifika element.',
        'Max överlagringsintensitet med ECC: Automatiska intensitetsgränser baserade på felkorrigeringsnivå.',
      ],
    },
    {
      heading: 'Innehållstyper (Professionella)',
      paragraphs: ['Professionell nivå lägger till betalnings- och företagsinnehållstyper:'],
      bullets: [
        'EPC/SEPA (EU): QR-koder för europeiska banköverföringar med IBAN, BIC, belopp, referens.',
        'UPI (Indien): Enhetligt betalningsgränssnitt med VPA, betalningsmottagarens namn, belopp.',
        'PayNow (Singapore): Snabb betalning i Singapore med UEN eller mobilnummer.',
        'PromptPay (Thailand): Thailändskt nationellt betalningssystem.',
        'PIX (Brasilien): Brasiliansk omedelbar betalning med PIX-nyckel.',
        'Krypto: Bitcoin, Ethereum, Litecoin betalningsadresser med valfritt belopp.',
        'Länk till marknadsföringskampanj: URL:er med fullständig spårning av UTM-parametrar (marknadsföringstaggar).',
        'Kort länk: För användning med URL-förkortare för dynamiska/spårbara QR-koder.',
        'GS1 Digital Link: Produktidentifiering med GTIN, serienummer, batchnummer, utgångsdatum.',
        'Appdjuplänk: Djuplänkar till iOS/Android-appar med anpassade scheman.',
        'Anpassat format: Rådata utan formatering eller validering.',
      ],
    },
    {
      heading: 'Språkrelaterade betalningar i avancerat läge',
      paragraphs: [
        'När du använder avancerat läge visar ANQR automatiskt betalningsmetoder som är relevanta för ditt valda språk. Till exempel ser vietnamesiska användare VietQR, thailändska användare PromptPay och indisktalande användare ser UPI och BharatQR. Globala betalningsmetoder (kryptovaluta, PayPal, Cash App) är tillgängliga för alla språk. Professionellt läge låser upp alla betalningsstandarder oavsett språk.',
      ],
    },
    {
      heading: 'Europeiska betalningsstandarder',
      bullets: [
        'EPC/SEPA (EU): Europeiska banköverförings-QR-koder enligt EPC QR-kodstandarden. Stöder IBAN, BIC (valfritt för inrikes), belopp i EUR och strukturerade eller ostrukturerade betalningsreferenser. Används i hela SEPA-zonen inklusive EU-länder plus Schweiz, Norge, Island, Liechtenstein, Monaco och San Marino.',
        'Schweizisk QR-faktura: Schweizisk betalningsstandard enligt SIX Implementation Guidelines. Stöder CHF och EUR, QR-referens (QRR), fordringsreferens (ISO 11649), strukturerade fordringsägares/gäldenärers adresser och fakturainformation. Krävs för schweiziska fakturor sedan 2022.',
      ],
    },
    {
      heading: 'Indiska betalningsstandarder',
      bullets: [
        'UPI (Indien): Enhetligt betalningsgränssnitt enligt NPCI:s djuplänkningsspecifikation. Stöder VPA (virtuell betalningsadress), betalningsmottagarens namn, belopp i INR, transaktionsnota, referens-ID, handlarens kategorikod och transaktionsläge.',
        'BharatQR (Indien): Enhetlig QR-standard som stöder både UPI- och kortbaserade betalningar. Kombinerar UPI VPA med kort PAN för maximal kompatibilitet. Inkluderar handlarens namn, stad, MCC, GST-uppgifter och faktura-/referensnummer.',
      ],
    },
    {
      heading: 'Sydostasiatiska betalningsstandarder',
      bullets: [
        'PayNow (Singapore): Singapores snabbbetalningssystem som använder EMVCo QR-specifikation med SGQR-profil. Stöder UEN (företagsregistrering), mobilnummer eller NRIC som proxy-identifierare. Inkluderar flagga för redigerbarhet av belopp och utgångsdatum.',
        'PromptPay (Thailand): Thailändskt nationellt betalningssystem som följer Bank of Thailands EMV-profil. Stöder mobilnummer, nationellt ID, skatte-ID, e-plånboks-ID och fakturabetalning med flera referensfält.',
        'QRIS (Indonesien): Indonesisk standard för snabbsvar. EMV-baserad nationell betalningsstandard som stöder handlar-ID, NMID (nationellt handlar-ID), klassificering av handlarkriterier och bekvämlighetsavgifter (fasta eller procentuella).',
        'DuitNow (Malaysia): Malaysiskt system för omedelbara betalningar. Stöder flera proxytyper inklusive NRIC, mobilnummer, pass, armé-ID och företagsregistreringsnummer.',
        'VietQR (Vietnam): Vietnamesisk standard för interbanköverföringar. Kräver bankens BIN (NAPAS-identifiering) och kontonummer. Stöder flera servicekoder för olika överföringstyper (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filippinerna): Filippinsk QR-betalningsstandard för InstaPay och PESONet. Använder kontonummer med handlaridentifiering för P2M-transaktioner (person-till-handlare).',
      ],
    },
    {
      heading: 'Östasiatiska betalningsstandarder',
      bullets: [
        'TWQR (Taiwan): Taiwanesisk QR-betalningsstandard. Stöder handlar-ID, skatte-ID och TWD-belopp.',
        'HKQR/FPS (Hongkong): Hongkongs snabbare betalningssystem QR-koder. Stöder FPS-ID, mobilnummer eller e-postadress som betalningsidentifierare. Belopp i HKD.',
        'JPQR (Japan): Japansk enhetlig QR-kodsbetalningsstandard. Använder butiks-ID för handlaridentifiering med JPY-belopp.',
      ],
    },
    {
      heading: 'Andra regionala betalningsstandarder',
      bullets: [
        'PIX (Brasilien): Brasiliansk centralbanks system för omedelbara betalningar enligt BR-kodspecifikationen. Stöder PIX-nycklar (CPF, CNPJ, e-post, telefon eller slumpmässig nyckel), handlarens namn/ort, transaktions-ID och BRL-belopp.',
        'AusPayNet/NPP PayID (Australien): Australiens nya betalningsplattform PayID-system. Stöder PayID-typer (e-post, mobil, ABN, organisations-ID) eller traditionell BSB + kontonummer. Handlarens namn är valfritt eftersom betalare ser det registrerade namnet från NPP-sökning.',
      ],
    },
    {
      heading: 'Betalningar med kryptovaluta',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): Standardbetalnings-URI:er för kryptovaluta med plånboksadress, valfritt belopp och etikett. Kompatibel med alla större Bitcoin- och Litecoin-plånböcker.',
        'Lightning Network (BOLT11): Betalningsfakturor för Lightning Network. Klistra in en BOLT11-kodad fakturasträng för omedelbara Bitcoin-betalningar med minimala avgifter.',
        'Ethereum (EIP-681): URI:er för Ethereum-transaktionsbegäran som stöder nativa ETH-överföringar och ERC-20-tokenöverföringar. Inkluderar kedje-ID för stöd för flera nätverk (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gasparametrar och kontraktsfunktionsanrop.',
      ],
    },
    {
      heading: 'Betalningslänkstjänster',
      bullets: [
        'PayPal.Me: PayPal-betalningslänkar med användarnamn och valfritt förifyllt belopp. Mottagare kan betala via PayPal-saldo, kort eller bankkonton.',
        'Cash App: Betalningslänkar till Cash App med $cashtag och valfritt belopp. Populär i USA för peer-to-peer-betalningar.',
      ],
    },
    {
      heading: 'Generisk EMV QR',
      bullets: [
        'EMV Generic: Skapa anpassade EMV Merchant-Presented Mode QR-koder för betalningssystem som inte specifikt listas. Konfigurera handlarens namn, stad, landskod (ISO 3166-1), valutakod (ISO 4217 numerisk), MCC, alternativ för dricks/bekvämlighetsavgift och ytterligare datafält. Användbart för testning eller anpassade integrationer.',
      ],
    },
    {
      heading: 'Överläggande blandningslägen (professionellt)',
      paragraphs: ['Ytterligare blandningslägen på professionell nivå:'],
      bullets: [
        'Pixelering: Pixelerad överlagringseffekt.',
        'Kontur: Kantdetekteringsöverlagring som endast visar konturer.',
        'Våg: Vågig distorsionseffekt.',
        'Subpixelstorlek: Variabel subpixelstorlek baserad på bilden.',
        'Sann dither: Avancerad dithering med ordnad matrisval.',
        'Extrem: Maximal bildsynlighet, kan påverka skanningsbarheten.',
      ],
    },
    {
      heading: 'Skyddsinställningar',
      paragraphs: [
        'Finkornig kontroll över vilka QR-element som är skyddade från överlagringsmodifiering:',
      ],
      bullets: [
        'Bevara timing: Håll tidsmönstren oförändrade.',
        'Bevara justering: Behåll justeringsmönstren oförändrade.',
        'Skydda formatinformation: Skyddar formatinformationsmoduler.',
        'Skydda versionsinformation: Informationsmoduler för sköldversion.',
      ],
    },
    {
      heading: 'ECC-medvetet läge',
      paragraphs: [
        'Distribuerar intelligent överlagringsintensitet baserat på felkorrigeringskapacitet. Systemet analyserar vilka moduler som kan modifieras samtidigt som skanningsbarheten bibehålls.',
      ],
      bullets: [
        'Riskbudget: Procentuell felkorrigeringskapacitet att använda (0–100 %).',
        'Högre budget = mer synligt överlägg men mer riskfylld skanningsbarhet.',
        'Lägre budget = säkrare skanning men mindre synligt överlägg.',
      ],
    },
    {
      heading: 'Professionella renderingsalternativ',
      paragraphs: ['Avancerade renderingskontroller:'],
      bullets: [
        'Skarpa kanter: Använd pixelerad bildrendering för skarpa modulkanter.',
        'Pixel Snap: Pixeljustering för golv, runda eller tak.',
        'Färgläge per modul: Helfärg, Efter ljusstyrka, Efter position, Efter överlagring, Efter kluster.',
        'Färgpalett: Definiera en anpassad färgpalett för färgsättning per modul.',
        'Kontrastskydd: Säkerställ minsta möjliga kontrastförhållande mellan färgerna.',
        'Minsta kontrastförhållande: Kontrastkrav i WCAG-stil (1:1 till 21:1).',
        'Extra gränsmoduler: Ytterligare gräns bortom tyst zon.',
      ],
    },
    {
      heading: 'Professionella utdataalternativ',
      paragraphs: ['Inställningar för företagsexport:'],
      bullets: [
        'DPI: Ställ in utskriftsupplösning (72–600 DPI). 300 DPI rekommenderas för utskrift.',
        'Inkludera tyst zon: Växla tyst zon i utdatadimensioner.',
        'Exportera som ytterligare: Generera PDF tillsammans med primärformatet.',
      ],
    },
    {
      heading: 'Animationsinställningar (Professionella)',
      paragraphs: ['Ytterligare professionella animationsfunktioner:'],
      bullets: [
        'Temporär dithering: Av, Blått brus eller Flimmersäkra dithering per bildruta.',
        'Mönster: Ingen, Puls, Våg, Skanningslinje, Skimmer eller Drift-effekter.',
      ],
    },
    {
      heading: 'API-referens',
      paragraphs: [
        'ANQR tillhandahåller ett serversides-API för att generera QR-koder via URL-parametrar. Detta är idealiskt för att bädda in QR-koder i webbplatser, e-postmeddelanden, dokument eller automatiserade arbetsflöden utan JavaScript på klientsidan.',
        'Bas-URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Grundläggande parametrar',
      paragraphs: ['Obligatoriska och vanliga parametrar (parameternamn översätts inte):'],
      bullets: [
        'data (obligatorisk): Innehållet som ska kodas i QR-koden. URL-kodning av specialtecken.',
        'storlek: Bildstorlek i pixlar (standard: 400, max: 2000). Används om w/h inte har angetts.',
        'b, h: Utdatabredd och höjd i pixlar. Åsidosätter storleksparametern.',
        'format: Utdataformat — png, webp eller gif (standard: png).',
        'ec: Felkorrigeringsnivå — L, M, Q eller H (standard: H).',
        'fg: Förgrundsfärg som hexagon utan # (standard: 000000).',
        'bg: Bakgrundsfärg som hexagon utan # (standard: ffffff).',
        'transparent: Ställ in på 1 för transparent bakgrund.',
        'marginal: Tyst zon i moduler (standard: 4).',
      ],
    },
    {
      heading: 'Stilparametrar',
      paragraphs: ['Modul- och mönsterstyling:'],
      bullets: [
        'stil: Modulstil — fyrkantig, rundad, prickig, diamantformad, sammankopplad.',
        'sökare: Sökarens mönsterstil — fyrkantig, rundad, cirkel.',
        'align: Justeringsmönsterstil — match_finder, fyrkantig, rundad, cirkel.',
        'timing: Timingmönsterstil — match_module, heldragen, streckad.',
        'radie: Hörnradieprocent 0-100.',
        'gap: Modulgap i procent 0–50.',
        'gapMode: Gap-läge — inget, infälld ruta, linje, negativt_mellanrum.',
        'ögaYttre, ögaInre: Ögonstilar — fyrkantiga, rundade, cirkelformade.',
        'eyeScale: Ögonskalans procentandel (standard: 100).',
        'gradient: Gradienttyp — ingen, linjär, radiell, konisk.',
        'gradAngle: Gradientvinkel för linjära gradienter.',
        'gradStops: Gradientstopp som color1,pos1,color2,pos2,… (t.ex. ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Överlagringsparametrar',
      paragraphs: ['Alternativ för bildöverlagring (bildöverlagring hämtas på serversidan):'],
      bullets: [
        'img: URL för att lägga över bilden (måste vara offentligt tillgänglig).',
        'läge: Överlagringsläge — center, halvton, blandning, ljusstyrka, mosaik, ditherad, blått brus, delpixel.',
        'intensitet: Överlagringsintensitet 0–100 (standard: 100).',
        'colorMode: Överlagringsfärgläge — färg, gråskala, svartvitt.',
        'passform: Hur överlägget passar – täcker, innesluter, töjer ut.',
        'rotera: Överlagringsrotation i grader.',
        'flipX, flipY: Ställ in på 1 för att vända överlagring.',
        'keepFinders: Bevara sökmönster (standard: 1).',
        'keepTiming, keepAlign: Ställ in på 1 för att bevara timing-/justeringsmönster.',
      ],
    },
    {
      heading: 'Förbehandlingsparametrar',
      paragraphs: ['Bildförbehandling tillämpad på överlagring:'],
      bullets: [
        'ljusstyrka: Justering -100 till 100 (standard: 0).',
        'kontrast: Justering -100 till 100 (standard: 0).',
        'gamma: Värde 0,1 till 3 (standard: 1).',
        'mättnad: Justering -100 till 100 (standard: 0).',
        'nyans: Nyansrotation i grader.',
        'oskärpa: Oskärpa i pixlar.',
        'skärpa: Skärpningsmängd 0-100.',
        'posterize: Posterize-nivåer.',
        'tröskelvärde: Binärt tröskelvärde 0–255.',
        'kant: Kantdetektering — av, sobel, listig.',
        'invertera: Ställ in på 1 för att invertera färger.',
      ],
    },
    {
      heading: 'Vattenstämpelparametrar',
      paragraphs: ['Lägg till vattenstämplar till genererade QR-koder:'],
      bullets: [
        'wmEn: Ställ in på 1 för att aktivera vattenstämpel.',
        'wmKind: Vattenstämpeltyp — text, bild, mönster.',
        'wmText: Vattenstämpeltext (URL-kodad).',
        'wmImg: URL till vattenstämpelbild.',
        'wmPos: Position — mitten, hörn, kanter, bakom, tyst_zon.',
        'wmOpacitet: Opacitet 0–100 (standard: 50).',
        'wmBlend: Blandningsläge — normal, multiplicera, skärm, överlagring.',
      ],
    },
    {
      heading: 'Animationsparametrar',
      paragraphs: ['För animerad GIF-utdata (kräver format=gif):'],
      bullets: [
        'animPattern: Animeringsmönster — inget, puls, våg, skanningslinje, skimmer, drift, färgcykel.',
        'animFrames: Antal bildrutor 1–60 (standard: 24).',
        'animSpeed: Bildfördröjning i millisekunder 10–1000 (standard: 100).',
        'animSeed: Slumpmässigt frö för animering.',
        'lättnad: Animationslättnad — linjär, lättnad_in, lättnad_ut, lättnad_in_ut, studs.',
      ],
    },
    {
      heading: 'Utmatningsparametrar',
      paragraphs: ['Alternativ för utdataformat:'],
      bullets: [
        'kvalitet: WebP-kvalitet 0-1 (standard: 0,9).',
        'webpQ: WebP-kvalitet 0–100 (standard: 90).',
        'gifColors: GIF-palettstorlek 2–256 (standard: 256).',
        'dpi: Utdata-DPI för PNG (standard: 72).',
        'metaTitel, metaFörfattare, metaKopia, metaBeskrivning: PNG-metadatafält.',
      ],
    },
    {
      heading: 'Exempel på användning',
      paragraphs: [
        'Grundläggande QR-kod:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Stiliserad QR-kod med anpassade färger:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR-kod med överlagringsbild:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'Animerad GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Bädda in QR-koder',
      paragraphs: [
        'I professionellt läge genererar delningsfunktionen inbäddningsbar HTML och URL:er. Så här fungerar inbäddning:',
      ],
      bullets: [
        'Dela länk: Skapar en URL till ANQR-appen med alla dina inställningar kodade som URL-parametrar. Mottagare kan visa och ändra QR-koden.',
        'Bädda in bild: Genererar en tagg som pekar mot serverns API. QR-koden renderas på serversidan och visas som en bild.',
        'Bädda in Markdown: Skapar Markdown-bildsyntax för dokumentation och README-filer.',
        'Direkt API-URL: Den råa API-URL:en för användning i applikationer, skript eller andra integrationer.',
      ],
    },
    {
      heading: 'HTML-exempel',
      paragraphs: [
        'Så här bäddar du in en QR-kod på din webbplats:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-kod />',
        'För responsiv storleksanpassning:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-kod style=max-width: 100%; height: auto; />',
        'Servern cachar svar med långa cache-rubriker, så upprepade förfrågningar för samma URL är snabba.',
      ],
    },
    {
      heading: 'Dela URL-format',
      paragraphs: [
        'När du klickar på Dela i professionellt läge kodar ANQR dina aktuella inställningar till URL-parametrar. Formatet är:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….',
        'Dessa parametrar speglar API-parametrarna, så du kan konvertera en delnings-URL till en API-URL genom att ändra bassökvägen från / till /api/qr och justera w/h-parametrar efter behov.',
        'Obs! Överlagringsbilder som laddats upp från lokala filer kan inte delas via URL – endast URL-baserade överlagringar (img-parameter) fungerar i delade länkar och API-anrop.',
      ],
    },
    {
      heading: 'Taxagränser och användning',
      paragraphs: [
        'API:et är gratis att använda för rimliga volymer. För användning i hög volym eller kommersiella applikationer som kräver garanterad drifttid, vänligen kontakta oss.',
        'API-svar inkluderar aggressiva cachningsrubriker. För bästa prestanda, cacha svaren från din sida eller använd samma URL konsekvent för identiska QR-koder.',
      ],
    },
    {
      heading: 'Bästa praxis',
      paragraphs: ['Följ dessa riktlinjer för pålitliga QR-koder:'],
      bullets: [
        'Testa alltid dina QR-koder med flera skannerappar innan du skriver ut.',
        'Använd felkorrigering H (Hög) när du lägger till överlägg.',
        'Behåll minst 4 moduler tyst zon (marginal).',
        'Säkerställ hög kontrast mellan förgrund och bakgrund.',
        'Använd minst 300 DPI för utskrift och testa i faktisk utskriftsstorlek.',
        'Aktivera Bevara Findermönster när överlägg används.',
        'Börja med lägre överlagringsintensitet och öka gradvis.',
        'För utomhusbruk, överväg större modulstorlekar och högre felkorrigering.',
      ],
    },
    {
      heading: 'Felsökning',
      paragraphs: ['Vanliga problem och lösningar:'],
      bullets: [
        'QR skannar inte: Minska överlagringens intensitet, öka felkorrigeringen, kontrollera kontrasten.',
        'Koden är för lång: Minska innehållslängden, använd URL-förkortare, lägre version.',
        'Suddig utdata: Öka modulstorleken, använd PNG istället för komprimerade format.',
        'Färgerna ser fel ut: Kontrollera färgkontrasten, prova gråskaleöverlagringsläge.',
        'GIF animeras inte: Se till att GIF-formatet används, kontrollera antalet bildrutor.',
        'Bildöverlagring laddas inte: Kontrollera CORS-behörigheter på fjärrbilder.',
      ],
    },
    {
      heading: 'Tangentbordsgenvägar',
      paragraphs: [
        'ANQR stöder vanliga kortkommandon. Använd Ctrl/Cmd+S för att utlösa export (när fokus är på förhandsgranskningen).',
      ],
    },
    {
      heading: 'Delning och inbäddning',
      paragraphs: [
        'I professionellt läge klickar du på knappen Dela för att kopiera en URL med dina aktuella inställningar. Mottagare kan öppna denna URL för att se din exakta konfiguration. Obs! Överlagringsbilder från lokala filer kan inte delas via URL.',
      ],
    },
  ],
};

export default docs;
