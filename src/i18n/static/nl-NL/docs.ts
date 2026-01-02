import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR-gebruikershandleiding',
  description: 'Complete handleiding voor het gebruik van ANQR voor het maken van QR-codes.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aan de slag',
      paragraphs: [
        'ANQR is een QR-codegenerator met een clientgerichte aanpak. Standaard worden QR-codes lokaal in uw browser gegenereerd – er is geen account nodig en uw gegevens blijven privé. Voor professionele integratie kunt u ook de server-side API gebruiken.',
        'De interface heeft drie niveaus: Basis, Geavanceerd en Professioneel. Selecteer uw niveau via de tabbladen in de header. Elk niveau ontgrendelt extra functies, terwijl de interface gericht blijft op wat u nodig hebt.',
      ],
      bullets: [
        'Basis: Eenvoudige QR-codecreatie met platte tekst/URL-inhoud en afbeeldingsoverlay.',
        'Geavanceerd: QR-coderingsopties, weergavestijlen, animatie, uitvoerformaten, uitgebreide inhoudstypen en aanpassing van de overlay.',
        'Professioneel: Watermerken, metadata, delen, veiligheidsanalyse, QR-codes voor betalingen en bedrijfsfuncties.',
      ],
    },
    {
      heading: 'Snelstart',
      paragraphs: ['Om je eerste QR-code te maken:'],
      bullets: [
        "1. Selecteer een inhoudstype (URL, tekst, wifi, enz.) in het vervolgkeuzemenu 'Inhoudstype'.",
        '2. Voer uw gegevens in de daarvoor bestemde velden in.',
        '3. Optioneel kunt u kleuren en stijlen aanpassen en een overlay-afbeelding toevoegen.',
        '4. Klik op Exporteren om uw QR-code te downloaden als PNG, GIF, WebP of SVG.',
      ],
    },
    {
      heading: 'Basisfuncties',
      paragraphs: [
        'Het basisniveau biedt een gestroomlijnde interface voor het maken van QR-codes met payload-inhoud en afbeeldingsoverlays. Dit is de eenvoudigste manier om te beginnen.',
      ],
    },
    {
      heading: 'Inhoudstypen (basis)',
      paragraphs: [
        'Platte tekst: Codeer elke tekst tot de maximale capaciteit van de QR-code. Ideaal voor korte berichten, codes of identificaties.',
        'URL: Codeer webadressen. De QR-code opent de URL wanneer deze wordt gescand. Ondersteunt http:// en https:// protocollen.',
      ],
    },
    {
      heading: 'Beeldoverlay (Basis)',
      paragraphs: [
        'Upload een afbeelding (JPG, PNG, GIF, WebP) om te combineren met uw QR-code. Basisfuncties voor overlays zijn onder andere:',
      ],
      bullets: [
        'Uploaden vanuit bestand: Selecteer een afbeelding van uw apparaat.',
        'Laden vanaf URL: Voer een afbeeldings-URL in (CORS moet zijn toegestaan).',
        'Centrerend logo: Plaats de afbeelding in het midden, gebruikmakend van foutcorrectie.',
        'Blend: Eenvoudige alfablending van afbeelding met QR-patroon.',
        'Intensiteit: Hiermee wordt bepaald hoe sterk de overlay de QR-code beïnvloedt (0-100%).',
        'Kleurmodus: Volledige kleur, grijstinten of zwart-wit.',
        'Behoud zoekerpatronen: Houdt hoekpatronen ongewijzigd voor betrouwbaar scannen.',
      ],
    },
    {
      heading: 'Geavanceerde functies',
      paragraphs: [
        'Het geavanceerde niveau ontgrendelt opties voor QR-codering, weergavestijlen, animatie, uitvoerformaten, uitgebreidere inhoudstypen en geavanceerde aanpassingsmogelijkheden voor overlays.',
      ],
    },
    {
      heading: 'QR-coderingsinstellingen',
      paragraphs: [
        'Versie: QR-codes zijn er in versies 1-40, waarbij hogere versies meer gegevens kunnen bevatten maar ook groter zijn. Stel dit in op 0 (Auto) om ANQR de kleinste versie te laten kiezen die bij uw inhoud past.',
        'Foutcorrectie: Bepaalt hoeveel schade een QR-code kan oplopen terwijl deze nog steeds scanbaar blijft.',
      ],
      bullets: [
        'L (Laag): 7% foutcorrectie - kleinste formaat, minste redundantie.',
        'M (Medium): 15% foutcorrectie - gebalanceerde optie.',
        'Q (kwartiel): 25% foutcorrectie - geschikt voor gedrukte codes.',
        'H (Hoog): 30% foutcorrectie - het meest geschikt voor codes met overlays of in zware omstandigheden.',
      ],
    },
    {
      heading: 'Stille zone (marge)',
      paragraphs: [
        'De stille zone is de witte ruimte rond de QR-code. Scanners hebben deze marge nodig om te detecteren waar de code begint. De standaard adviseert minimaal 4 modules. Minder dan 4 modules kan scanproblemen veroorzaken.',
      ],
    },
    {
      heading: 'Modulestijl',
      paragraphs: [
        'Modules zijn de afzonderlijke vierkantjes waaruit een QR-code is opgebouwd. ANQR biedt vijf stijlen aan:',
      ],
      bullets: [
        'Vierkant: Klassieke QR-uitstraling met scherpe hoeken.',
        'Afgerond: Verzachte hoeken voor een vriendelijker uiterlijk.',
        'Dots: Cirkelvormige modules voor een moderne esthetiek.',
        'Ruit: vierkanten die 45° gedraaid zijn voor een opvallend patroon.',
        'Verbonden: Modules versmelten wanneer ze naast elkaar staan en creëren organische vormen.',
      ],
    },
    {
      heading: 'Zoekpatroonstijl',
      paragraphs: [
        'Zoekpatronen zijn de drie grote vierkanten in de hoeken van een QR-code die scanners helpen de code te oriënteren. Beschikbare stijlen:',
      ],
      bullets: [
        'Vierkant: Standaard vierkante hoeken.',
        'Afgerond: Verzachte hoeken die passen bij de afgeronde module-stijl.',
        'Cirkel: Cirkelvormige zoekpatronen voor puntcodes.',
      ],
    },
    {
      heading: 'Patronen voor afstemming en timing',
      paragraphs: [
        'Uitlijningspatronen verschijnen in grotere QR-codes (versie 2+) om vervorming te corrigeren. Timingpatronen zijn de afwisselende lijnen die de zoekpatronen verbinden.',
      ],
      bullets: [
        'Uitlijningsstijl: Match Finder, Vierkant, Afgerond of Cirkel.',
        'Timingstijl: Match Module, Volle lijn of Gestreepte lijn.',
      ],
    },
    {
      heading: 'Kleuren',
      paragraphs: [
        'Voorgrond: De kleur van de QR-modules. Zwart (#000000) is standaard, maar elke donkere kleur werkt.',
        'Achtergrond: De achtergrondkleur. Wit (#ffffff) is standaard. Zorg voor voldoende contrast met de voorgrond.',
        'Transparante achtergrond: Verwijder de achtergrond volledig voor gebruik op gekleurde oppervlakken. Zorg ervoor dat het oppervlak voldoende contrast biedt.',
      ],
    },
    {
      heading: 'Modulegrootte en tussenruimte',
      paragraphs: [
        'Modulegrootte: Hiermee wordt bepaald hoe groot elke module in pixels wordt weergegeven. Grotere waarden zorgen voor grotere, gemakkelijker te scannen codes.',
        'Module Gap: Voegt ruimte toe tussen modules als percentage. Kleine openingen (5-15%) kunnen de scanbaarheid onder bepaalde omstandigheden verbeteren, maar te grote openingen verminderen de betrouwbaarheid.',
      ],
    },
    {
      heading: 'Uitvoerinstellingen',
      paragraphs: ['Formaat: Kies uw exportformaat op basis van uw gebruikssituatie.'],
      bullets: [
        'PNG: Verliesvrij rasterformaat, ideaal voor de meeste toepassingen. Het meest geschikt voor print en digitaal.',
        'WebP: Modern formaat met kleinere bestandsgroottes. Goed geschikt voor webgebruik.',
        'GIF: Vereist voor geanimeerde QR-codes. Ondersteunt transparantie.',
        'SVG: Vectorformaat dat oneindig schaalbaar is. Het meest geschikt voor grote afdrukken of wanneer u de code moet bewerken.',
      ],
    },
    {
      heading: 'Uitvoerdimensies',
      paragraphs: [
        'Breedte/Hoogte: Stel de uitvoergrootte in pixels in. Voor afdrukken, bereken op basis van DPI (bijv. 300 DPI bij 1 inch = 300px). Grotere formaten worden betrouwbaarder gescand op afstand.',
      ],
    },
    {
      heading: 'Animatie-instellingen (Geavanceerd)',
      paragraphs: ['Beheer het gedrag van geanimeerde QR-codes:'],
      bullets: [
        'Snelheid: Beeldverversingssnelheid van de animatie in milliseconden.',
        'Loop: Continue of eenmalige animatie.',
        'Bounce: Animatie-regie voor pingpong.',
        'Startframe: Start de animatie vanaf een specifiek frame.',
        'Maximale frames: Beperk het totale aantal frames in de animatie.',
        'Framestap: Sla frames over voor snellere animatie.',
        'Interpolatie: Geen, Crossfade of Morph tussen frames.',
      ],
    },
    {
      heading: 'Inhoudstypen (Geavanceerd)',
      paragraphs: ['Geavanceerd niveau ontgrendelt extra payload-formaten:'],
      bullets: [
        'Telefoonnummer (tel:): Hiermee wordt een belbare telefoonverbinding tot stand gebracht.',
        'E-mail (mailto:): Opent een e-mailprogramma met optioneel onderwerp en inhoud.',
        'SMS: Vooraf ingevuld tekstbericht naar een telefoonnummer.',
        'vCard: Volledige contactkaart met naam, organisatie, telefoonnummer, e-mailadres en adres.',
        'MeCard: Compact contactformaat populair in Japan.',
        'BizCard: Het oude visitekaartjeformaat.',
        'Geolocatie: GPS-coördinaten die in kaarten worden geopend.',
        'WiFi: Netwerkgegevens voor automatische verbinding (SSID, wachtwoord, beveiligingstype).',
        'Agenda-evenement: iCalendar-indeling met titel, locatie, datum/tijd.',
        'Aanmelden voor het evenement: Link naar de registratiepagina voor het evenement.',
        'Abonneren op de kalender: Abonneer u op een ICS/WebCal-feed.',
        'URL van bestand/document: Directe link naar downloadbare bestanden.',
        'Link naar cloudopslag: Links naar Google Drive, Dropbox, OneDrive, enz.',
        'Sociale profielen: Links naar LinkedIn, Twitter, Instagram, enz.',
        'Berichtenlink: WhatsApp, Telegram, Signal deeplinks.',
      ],
    },
    {
      heading: 'Geavanceerde overlayfuncties',
      paragraphs: ['Aanvullende overlaymogelijkheden:'],
      bullets: [
        'Bijsnijden: Schakel bijsnijden in om een vierkant gedeelte van uw afbeelding te selecteren.',
        'Halftone: Klassiek stippenpatroon in drukstijl, gebaseerd op de helderheid van de afbeelding.',
        'Dithered: Foutdiffusiedithering voor gedetailleerde reproductie.',
      ],
    },
    {
      heading: 'Overlay-mengmodi (geavanceerd)',
      paragraphs: ['Extra mengmodi in het geavanceerde niveau:'],
      bullets: [
        'Subpixel: Verdeelt elke module in subpixels voor meer detail.',
        'Blauwe ruis: Gebruikt blauwe ruis-dithering voor artefactvrije patronen.',
        'Mozaïek: Tegelgebaseerd effect dat de beeldstructuur behoudt.',
        'Gap Fill: Plaats een afbeelding in de openingen tussen modules.',
        'Helderheid: Varieert de modulegrootte op basis van de beeldhelderheid.',
        'Duotone: Zet een afbeelding om naar twee kleuren voor een opvallend contrast.',
      ],
    },
    {
      heading: 'Overlay-intensiteit',
      paragraphs: [
        'Bepaalt hoe sterk de overlay de QR-code beïnvloedt (0-100%). Hogere waarden tonen meer beelddetails, maar kunnen de scanbaarheid verminderen. Begin rond de 70% en pas dit aan op basis van tests.',
      ],
    },
    {
      heading: 'Kleurenmodus',
      paragraphs: ['Hoe de overlay-afbeelding wordt verwerkt:'],
      bullets: [
        'Volledige kleur: Behoudt de originele kleuren van de afbeelding.',
        'Grijsschaal: Omzetten naar zwart-wittinten.',
        'Zwart-wit: Binaire conversie met hoog contrast.',
      ],
    },
    {
      heading: 'Bewaar zoekpatronen',
      paragraphs: [
        'Wanneer deze functie is ingeschakeld, blijven de drie hoekzoekerpatronen ongewijzigd door de overlay. Sterk aanbevolen voor betrouwbaar scannen.',
      ],
    },
    {
      heading: 'Beeldvoorverwerking',
      paragraphs: [
        'Pas filters toe op je overlay-afbeelding voordat je deze samenvoegt. Deze aanpassingen kunnen de weergave van de afbeelding in de uiteindelijke QR-code verbeteren.',
      ],
      bullets: [
        'Helderheid (-100 tot +100): De afbeelding lichter of donkerder maken.',
        'Contrast (-100 tot +100): Vergroting of verlaging van het toonbereik.',
        'Gamma (0,2 tot 3,0): Niet-lineaire helderheidsaanpassing. Waarden onder 1 maken middentonen lichter, waarden boven 1 maken ze donkerder.',
        'Verzadiging (-100 tot +100): Kleurintensiteit. -100 is grijstinten, +100 is oververzadigd.',
        'Kleuren roteren (0-360°): Verschuif alle kleuren rond de kleurencirkel.',
        'Vervagen (0-20px): Beelddetails verzachten.',
        'Scherpen (0-100%): Verbeter de randen en details.',
        'Posterize (0-16 niveaus): Verlaag de kleurniveaus voor een postereffect.',
        'Drempelwaarde (0-255): Omzetten naar binair zwart/wit bij het afsnijpunt.',
        'Randdetectie: Sobel- of Canny-algoritmen om alleen randen weer te geven.',
        'Omkeren: Keer alle kleuren om.',
      ],
    },
    {
      heading: 'Pasvormmodus',
      paragraphs: ['Hoe de overlay-afbeelding in het QR-codegebied past:'],
      bullets: [
        'Omslag: Afbeelding vult het hele gebied, bijsnijden indien nodig.',
        'Bevat: Het gehele beeld is zichtbaar, mogelijk met marges.',
        'Uitrekken: Beeld vervormt om precies te vullen.',
      ],
    },
    {
      heading: 'Transformatieopties',
      paragraphs: [
        'Rotatie: Draai de overlay in stappen van 90°.',
        'X/Y spiegelen: Spiegel de afbeelding horizontaal of verticaal.',
      ],
    },
    {
      heading: 'Dithering-algoritmen',
      paragraphs: [
        'Dithering zet beelden met continue kleurtinten om in patronen die QR-codes kunnen weergeven. Beschikbaar bij gebruik van de mengmodi Dithered, Blue Noise of True Dither.',
      ],
      bullets: [
        'Foutdiffusie: Klassieke Floyd-Steinberg-stijl. Verspreidt de kwantiseringsfout naar naburige pixels.',
        'Geordend (Bayer): Gebruikt een drempelmatrix voor regelmatige patronen.',
        'Clustered Dot: Simuleert rasterdruk.',
        'Void & Cluster: Geoptimaliseerde geordende dithering.',
        'Blauwe ruis: een visueel aangenaam, willekeurig ogend patroon.',
        'Blue Noise Threshold: Drempeldithering met blauwe ruistextuur.',
        'Witte ruis: willekeurige drempel-dithering.',
        'Gaussiaanse/driehoekige ruis: ruis met verschillende verdelingen.',
        'Blauwe ruis + foutdiffusie: een hybride die beide technieken combineert.',
        'Schermachtige blauwe ruis: Schermachtig blauw ruispatroon.',
        'Perceptueel: Luminantie-gewogen voor betere visuele resultaten.',
        'Randbewust: Behoudt beeldranden tijdens dithering.',
        'Adaptieve drempel: Lokaal-adaptieve drempelbepaling.',
        "Temporele blauwe ruis: voor geanimeerde GIF's, varieert het patroon per frame.",
      ],
    },
    {
      heading: 'Diffusiekernen',
      paragraphs: [
        'Bij het gebruik van Error Diffusion-dithering kunt u kiezen hoe de fout wordt verdeeld:',
      ],
      bullets: [
        'Floyd-Steinberg: Klassieke 4-buurdiffusie. Goede algemene keuze.',
        'Jarvis-Judice-Ninke: 12-buurt, soepeler maar langzamer.',
        'Stucki: Vergelijkbaar met JJN, maar met andere gewichten.',
        'Burkes: Vereenvoudigde JJN, sneller.',
        'Sierra: Een familie van korrels die kwaliteit en snelheid in balans brengen.',
        'Atkinson: Lichtverspreiding, behoudt details maar kan korrelig zijn.',
      ],
    },
    {
      heading: 'Dither Strength',
      paragraphs: [
        'Bepaalt hoeveel dithering wordt toegepast (0-100%). Lagere waarden behouden meer van het oorspronkelijke patroon, hogere waarden tonen meer beelddetails.',
      ],
    },
    {
      heading: 'Subpixelinstellingen',
      paragraphs: ['Bij gebruik van de subpixel-mengmodus:'],
      bullets: [
        'Rastergrootte: 2×2, 3×3 of 4×4 subpixels per module. Hoger = meer detail.',
        'Middenregel: Strikt vereist dat de middelste subpixel overeenkomt met de module. Halftoonmidden staat variatie toe.',
        'Neutrale kleur: Kleur gebruikt voor onbepaalde subpixels.',
        'Finder Override: Hoe zoekpatronen worden weergegeven (Effen of Gestileerd).',
      ],
    },
    {
      heading: 'Halftone-instellingen',
      paragraphs: ['Bij gebruik van de halftoon-mengmodus:'],
      bullets: [
        'Celgrootte: Per module of N×N-raster.',
        'Puntvorm: cirkel, vierkant of lijn.',
        'Helderheidscurve: lineair, S-curve of gamma.',
      ],
    },
    {
      heading: 'Duotone kleuren',
      paragraphs: [
        'Wanneer u de Duotone-mengmodus gebruikt, stelt u de schaduwkleur (donkere gebieden) en de hooglichtkleur (lichte gebieden) in.',
      ],
    },
    {
      heading: 'GIF-animatie-instellingen',
      paragraphs: ['Bij gebruik van geanimeerde GIF-overlays:'],
      bullets: [
        'Gebruik framevertragingen: respecteer de oorspronkelijke GIF-timing.',
        'Maximale FPS: Beperk de framesnelheid (1-60 fps).',
        'Afvalverwerking: Respecteer of vereenvoudig de methoden voor het afvoeren van frames.',
      ],
    },
    {
      heading: 'Geavanceerde weergaveopties',
      paragraphs: ['Aanvullende weergave-instellingen:'],
      bullets: [
        'Gap-modus: Geen, Inzet, Rand of Negatieve ruimte-styling.',
        'Hoekrax: Percentage afgeronde hoeken voor modules.',
        'Gradiënt: Geen, lineaire, radiale of conische gradiënt op modules.',
        'Oog buiten-/binnenstijl: Onafhankelijke styling voor zoekerpatroonringen.',
        'Puntrotatie: Roteer diamant-/puntmodules.',
        'Oogschaal: Grootteaanpassing voor zoekerpatronen.',
        'Framestijl: Voeg decoratieve frames toe (afgerond frame, sticker, label).',
        "Frametekst: Voeg tekst zoals 'Scan mij!' toe aan frames.",
      ],
    },
    {
      heading: 'Geavanceerde QR-codering',
      paragraphs: ['QR-codering verfijnen:'],
      bullets: [
        'Coderingsmodus: Auto, Numeriek, Alfanumeriek, Byte/UTF-8 of Kanji.',
        'Minimale stille zone afdwingen: Zorg voor een marge van minimaal 4 modules.',
      ],
    },
    {
      heading: 'Geavanceerde uitvoeropties',
      paragraphs: ['Aanvullende exportinstellingen:'],
      bullets: [
        'Bestandsnaam: Aangepaste bestandsnaam voor downloads.',
        'GIF-paletgrootte: 2-256 kleuren in GIF-uitvoer.',
        'GIF Quantizer: Median Cut, NeuQuant of Octree kleurreductie.',
        'GIF-dithering: Uit, Floyd-Steinberg of Bevolen.',
        'GIF Transparante kleur: Stel een kleur in die transparant moet zijn.',
        'SVG True Vector: Gebruik paden in plaats van ingebedde rasterafbeeldingen.',
        'SVG-vormprecisie: weergave van pixels of precieze paden.',
        'SVG-rasteroverlay insluiten: Overlay als ingesloten afbeelding opnemen.',
        'Achtergrondkleur overschrijven: Dwing een specifieke achtergrondkleur af in de uitvoer.',
      ],
    },
    {
      heading: 'Validatieopties',
      paragraphs: ['Instellingen voor invoerverwerking:'],
      bullets: [
        'Invoer valideren: controleer het inhoudsformaat vóór het coderen.',
        'Witruimte verwijderen: Verwijder spaties aan het begin en einde van de regel.',
        'Normaliseer nieuwe regels: Converteer alle regeleinden naar LF.',
        'Maximale lengtebeveiliging: waarschuwing als de inhoud de QR-capaciteit overschrijdt.',
      ],
    },
    {
      heading: 'Professionele functies',
      paragraphs: [
        'Het Professional-niveau voegt watermerken, metadata, deelopties, veiligheidsanalyse, QR-codes voor betalingen en bedrijfsfuncties toe.',
      ],
    },
    {
      heading: 'Watermerk',
      paragraphs: ['Voeg watermerken toe aan uw QR-codes:'],
      bullets: [
        'Soort: Tekst-, beeld- of patroonwatermerk.',
        'Positie: Midden, Hoeken, Randen, Achter of Stille Zone.',
        'Dekking: Transparantie van het watermerk (0-100%).',
        'Mengmodus: Normaal, Vermenigvuldigen, Scherm of Overlay-mengmodus.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Metagegevens insluiten in geëxporteerde bestanden:'],
      bullets: [
        'Titel, Auteur, Copyright, Licentie, Beschrijving velden.',
        'Aanmaaktijd: Tijdstempel van de embedgeneratie.',
        'Aangepaste sleutel-waarde: Voeg willekeurige metadataparen toe.',
      ],
    },
    {
      heading: 'Delen',
      paragraphs: ['Deel uw QR-codeconfiguraties:'],
      bullets: [
        'Directe link: Genereer een deelbare URL met uw huidige instellingen.',
        'HTML insluiten: verkrijg de insluitcode voor websites.',
        'Parameters coderen: alle instellingen opnemen in de deel-URL.',
        'Opmerking: Overlay-afbeeldingen uit lokale bestanden kunnen niet via een URL worden gedeeld.',
      ],
    },
    {
      heading: 'Veiligheidsanalyse',
      paragraphs: ['Zorg ervoor dat QR-codes scanbaar blijven:'],
      bullets: [
        'Veiligheidsmodus: Uit, Gebalanceerd of Strikte scanvereisten.',
        'Min Module Size: Minimum pixel size per module.',
        'Min Quiet Zone: Modules met minimale marge.',
        'Vergrendelingszoekers/Timing/Uitlijnen/Formaat/Versie: Bescherm specifieke elementen.',
        'Maximale overlay-intensiteit door ECC: Automatische intensiteitslimieten op basis van het foutcorrectieniveau.',
      ],
    },
    {
      heading: 'Contenttypen (Professioneel)',
      paragraphs: ['Het professionele niveau voegt betalings- en bedrijfscontenttypen toe:'],
      bullets: [
        'EPC/SEPA (EU): QR-codes voor Europese bankoverschrijvingen met IBAN, BIC, bedrag en referentie.',
        'UPI (India): Unified Payments Interface met VPA, naam begunstigde, bedrag.',
        'PayNow (Singapore): Snel betalen in Singapore met UEN of mobiel nummer.',
        'PromptPay (Thailand): Thais nationaal betalingssysteem.',
        'PIX (Brazilië): Braziliaanse directe betaling met PIX-sleutel.',
        'Crypto: Bitcoin-, Ethereum- en Litecoin-betaaladressen met optioneel bedrag.',
        "Link naar marketingcampagne: URL's met volledige UTM-parameter (marketingtags) tracking.",
        'Korte link: Voor gebruik met URL-verkorters voor dynamische/traceerbare QR-codes.',
        'GS1 Digitale Link: Productidentificatie met GTIN, serienummer, batchnummer en vervaldatum.',
        "App Deep Link: iOS/Android app deep links met aangepaste schema's.",
        'Aangepast formaat: Ruwe gegevens zonder opmaak of validatie.',
      ],
    },
    {
      heading: 'Taalrelevante betalingen in geavanceerde modus',
      paragraphs: [
        'In de geavanceerde modus toont ANQR automatisch de betaalmethoden die relevant zijn voor de door u geselecteerde taal. Zo zien Vietnamese gebruikers VietQR, Thaise gebruikers PromptPay en Indiase gebruikers UPI en BharatQR. Wereldwijde betaalmethoden (cryptovaluta, PayPal, Cash App) zijn beschikbaar voor alle talen. De professionele modus ontgrendelt alle betaalstandaarden, ongeacht de taal.',
      ],
    },
    {
      heading: 'Europese betalingsnormen',
      bullets: [
        'EPC/SEPA (EU): QR-codes voor Europese bankoverschrijvingen volgens de EPC QR-codestandaard. Ondersteunt IBAN, BIC (optioneel voor binnenlandse transacties), bedrag in EUR en gestructureerde of ongestructureerde betalingsreferenties. Wordt gebruikt in de gehele SEPA-zone, inclusief EU-landen plus Zwitserland, Noorwegen, IJsland, Liechtenstein, Monaco en San Marino.',
        'Zwitserse QR-factuur: Zwitserse betalingsstandaard conform de SIX-implementatierichtlijnen. Ondersteunt CHF en EUR, QR-referentie (QRR), crediteurreferentie (ISO 11649), gestructureerde crediteur-/debiteuradressen en factuurgegevens. Vereist voor Zwitserse facturen sinds 2022.',
      ],
    },
    {
      heading: 'Indiase betalingsnormen',
      bullets: [
        'UPI (India): Unified Payments Interface volgens de NPCI Deep Linking Specification. Ondersteunt VPA (Virtual Payment Address), naam van de begunstigde, bedrag in INR, transactienotitie, referentie-ID, merchant category code en transactiemodus.',
        'BharatQR (India): Een uniforme QR-standaard die zowel UPI- als kaartbetalingen ondersteunt. Combineert UPI VPA met kaart-PAN voor maximale compatibiliteit. Bevat de naam van de handelaar, de stad, MCC, GST-gegevens en factuur-/referentienummers.',
      ],
    },
    {
      heading: 'Betalingsnormen voor Zuidoost-Azië',
      bullets: [
        'PayNow (Singapore): Snel betalingssysteem in Singapore dat gebruikmaakt van de EMVCo QR-specificatie met SGQR-profiel. Ondersteunt UEN (bedrijfsregistratie), mobiel nummer of NRIC als proxy-identificaties. Inclusief een vlag voor bewerkbaarheid van het bedrag en een vervaldatum.',
        'PromptPay (Thailand): Thais nationaal betalingssysteem dat het EMV-profiel van de Bank van Thailand volgt. Ondersteunt betalingen via mobiel nummer, nationale identiteitskaart, belastingnummer, e-wallet-ID en factuurbetalingen met meerdere referentievelden.',
        'QRIS (Indonesië): Quick Response Code Indonesische standaard. EMV-gebaseerde nationale betalingsstandaard die ondersteuning biedt voor merchant ID, NMID (National Merchant ID), classificatie op basis van merchantcriteria en transactiekosten (vast of percentage).',
        'DuitNow (Maleisië): Maleisisch systeem voor directe betalingen. Ondersteunt meerdere proxy-typen, waaronder NRIC, mobiel nummer, paspoort, militaire ID en bedrijfsregistratienummers.',
        'VietQR (Vietnam): Vietnamese standaard voor interbancaire overboekingen. Vereist bank-BIN (NAPAS-identificatie) en rekeningnummer. Ondersteunt meerdere servicecodes voor verschillende overboekingstypen (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filipijnen): Filipijnse QR-betaalstandaard voor InstaPay en PESONet. Maakt gebruik van rekeningnummers met handelaarsidentificatie voor P2M-transacties (van persoon naar handelaar).',
      ],
    },
    {
      heading: 'Oost-Aziatische betalingsnormen',
      bullets: [
        'TWQR (Taiwan): Taiwanese QR-betaalstandaard. Ondersteunt handelaars-ID, belasting-ID en TWD-bedragen.',
        'HKQR/FPS (Hong Kong): QR-codes van het Hong Kong Faster Payment System. Ondersteunt FPS-ID, mobiel nummer of e-mailadres als betalingsidentificatie. Bedragen in HKD.',
        'JPQR (Japan): Japanse uniforme QR-code betaalstandaard. Gebruikt winkel-ID voor identificatie van de verkoper met JPY-bedragen.',
      ],
    },
    {
      heading: 'Andere regionale betalingsnormen',
      bullets: [
        'PIX (Brazilië): Instantbetalingssysteem van de Braziliaanse Centrale Bank volgens de BR Code-specificatie. Ondersteunt PIX-sleutels (CPF, CNPJ, e-mail, telefoonnummer of willekeurige sleutel), naam/plaats van de handelaar, transactie-ID en bedragen in BRL.',
        'AusPayNet/NPP PayID (Australië): Australisch nieuw betalingsplatform PayID-systeem. Ondersteunt PayID-typen (e-mail, mobiel, ABN, organisatie-ID) of traditioneel BSB + rekeningnummer. De naam van de handelaar is optioneel, aangezien betalers de geregistreerde naam zien via de NPP-zoekfunctie.',
      ],
    },
    {
      heading: 'Cryptovalutabetalingen',
      bullets: [
        "Bitcoin/Litecoin (BIP-21): Standaard cryptocurrency-betalings-URI's met walletadres, optioneel bedrag en label. Compatibel met alle gangbare Bitcoin- en Litecoin-wallets.",
        'Lightning Network (BOLT11): Betalingsfacturen via Lightning Network. Plak een BOLT11-gecodeerde factuurstring voor directe Bitcoin-betalingen met minimale kosten.',
        "Ethereum (EIP-681): Ethereum-transactieverzoek-URI's die native ETH-overdrachten en ERC-20-tokenoverdrachten ondersteunen. Bevat de chain-ID voor ondersteuning van meerdere netwerken (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gasparameters en aanroepen van contractfuncties.",
      ],
    },
    {
      heading: 'Betaallinkdiensten',
      bullets: [
        'PayPal.Me: PayPal-betaallinks met gebruikersnaam en optioneel vooraf ingevuld bedrag. Ontvangers kunnen betalen via PayPal-saldo, kaarten of bankrekeningen.',
        'Cash App: Cash App-betaallinks met $cashtag en optioneel bedrag. Populair in de Verenigde Staten voor peer-to-peer-betalingen.',
      ],
    },
    {
      heading: 'Generieke EMV QR-code',
      bullets: [
        'EMV Generiek: Maak aangepaste EMV Merchant-Presented Mode QR-codes voor betaalsystemen die niet specifiek worden vermeld. Configureer de naam van de handelaar, de plaats, de landcode (ISO 3166-1), de valutacode (ISO 4217 numeriek), MCC, fooi-/servicekostenopties en extra gegevensvelden. Handig voor testen of aangepaste integraties.',
      ],
    },
    {
      heading: 'Overlay-mengmodi (professioneel)',
      paragraphs: ['Extra mengmodi in het professionele niveau:'],
      bullets: [
        'Pixelate: Gepixelde overlay-effect.',
        'Overzicht: Randdetectie-overlay die alleen contouren weergeeft.',
        'Golf: Golvend vervormingseffect.',
        'Subpixelgrootte: Variabele subpixelgrootte op basis van de afbeelding.',
        'True Dither: Geavanceerde dithering met geordende matrixselectie.',
        'Extreem: Maximale beeldzichtbaarheid, kan de scanbaarheid beïnvloeden.',
      ],
    },
    {
      heading: 'Beveiligingsinstellingen',
      paragraphs: [
        'Nauwkeurige controle over welke QR-elementen beschermd zijn tegen wijziging van de overlay:',
      ],
      bullets: [
        'Behoud de timing: Houd de timingpatronen ongewijzigd.',
        'Uitlijning behouden: laat uitlijningspatronen ongewijzigd.',
        'Formaatinformatie beschermen: Bescherm formaatinformatiemodules.',
        'Bescherm versie-informatie: Bescherm modules met versie-informatie.',
      ],
    },
    {
      heading: 'ECC-bewuste modus',
      paragraphs: [
        'Verdeelt de overlay-intensiteit op intelligente wijze op basis van de foutcorrectiecapaciteit. Het systeem analyseert welke modules kunnen worden aangepast met behoud van scanbaarheid.',
      ],
      bullets: [
        'Risicobudget: Percentage van de foutcorrectiecapaciteit dat gebruikt mag worden (0-100%).',
        'Hoger budget = meer zichtbare overlay, maar riskantere scanbaarheid.',
        'Een lager budget betekent veiliger scannen, maar een minder zichtbare overlay.',
      ],
    },
    {
      heading: 'Professionele renderingopties',
      paragraphs: ['Geavanceerde weergave-instellingen:'],
      bullets: [
        'Scherpe randen: Gebruik gepixelde beeldweergave voor scherpe module-randen.',
        'Pixel Snap: Pixeluitlijning op vloer, rond of plafond.',
        'Kleurmodus per module: Effen, Op basis van helderheid, Op basis van positie, Op basis van overlay, Op basis van cluster.',
        'Kleurenpalet: Definieer een aangepast kleurenpalet voor kleuring per module.',
        'Contrast Guard: Zorg voor een minimale contrastverhouding tussen kleuren.',
        'Minimale contrastverhouding: WCAG-contrastvereiste (1:1 tot 21:1).',
        'Extra grensmodules: extra grens buiten de stille zone.',
      ],
    },
    {
      heading: 'Professionele uitvoeropties',
      paragraphs: ['Exportinstellingen voor bedrijven:'],
      bullets: [
        'DPI: Stel de afdrukresolutie in (72-600 DPI). 300 DPI wordt aanbevolen voor afdrukken.',
        'Stille zone inschakelen: stille zone in uitvoerdimensies in- of uitschakelen.',
        'Exporteren als extra: Genereer een PDF naast het primaire formaat.',
      ],
    },
    {
      heading: 'Animatie-instellingen (Professioneel)',
      paragraphs: ['Aanvullende professionele animatiefuncties:'],
      bullets: [
        'Temporele dithering: Uit, blauwe ruis of flikkerveilige dithering per frame.',
        'Patroon: Geen, Puls, Golf, Scanlijn, Glinstering of Drift-effecten.',
      ],
    },
    {
      heading: 'API-referentie',
      paragraphs: [
        'ANQR biedt een server-side API voor het genereren van QR-codes via URL-parameters. Dit is ideaal voor het insluiten van QR-codes in websites, e-mails, documenten of geautomatiseerde workflows zonder client-side JavaScript.',
        'Basis-URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Basisparameters',
      paragraphs: ['Vereiste en algemene parameters (parameternamen worden niet vertaald):'],
      bullets: [
        'data (vereist): De inhoud die in de QR-code moet worden gecodeerd. URL-codering van speciale tekens.',
        'size: Afbeeldingsgrootte in pixels (standaard: 400, max: 2000). Wordt gebruikt als w/h niet is gespecificeerd.',
        'w, h: Uitvoerbreedte en -hoogte in pixels. Overschrijft de parameter voor de grootte.',
        'formaat: Uitvoerformaat — png, webp of gif (standaard: png).',
        'ec: Foutcorrectieniveau — L, M, Q of H (standaard: H).',
        'fg: Voorgrondkleur als hexadecimaal zonder # (standaard: 000000).',
        'bg: Achtergrondkleur als hexadecimaal zonder # (standaard: ffffff).',
        'transparant: Stel in op 1 voor een transparante achtergrond.',
        'marge: Stille zone in modules (standaard: 4).',
      ],
    },
    {
      heading: 'Stylingparameters',
      paragraphs: ['Module- en patroonstyling:'],
      bullets: [
        'stijl: Modulestijl — vierkant, afgerond, stippen, ruit, verbonden.',
        'finder: Zoekerpatroonstijl — vierkant, afgerond, cirkel.',
        'align: Uitlijnpatroonstijl — match_finder, vierkant, afgerond, cirkel.',
        'timing: Stijl van het timingpatroon — match_module, effen, gestreept.',
        'radius: Percentage van de hoekradius 0-100.',
        'kloof: Percentage van de modulekloof 0-50.',
        'gapMode: Gap-modus — geen, inset, stroke, negative_space.',
        'Oog buiten, oog binnen: Oogvormen — vierkant, rond, cirkel.',
        'eyeScale: Oogschaalpercentage (standaard: 100).',
        'grad: Gradiënttype — geen, lineair, radiaal, conisch.',
        'gradAngle: Gradiënthoek voor lineaire gradiënten.',
        'gradStops: Gradiëntstops als color1,pos1,color2,pos2,… (bijv. ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Overlayparameters',
      paragraphs: [
        'Opties voor afbeeldingsoverlay (de overlay-afbeelding wordt aan de serverzijde opgehaald):',
      ],
      bullets: [
        'img: URL naar de overlay-afbeelding (moet openbaar toegankelijk zijn).',
        'modus: Overlaymodus — midden, halftoon, mengmodus, helderheid, mozaïek, geditherd, blauwruis, subpixel.',
        'intensiteit: Overlay-intensiteit 0-100 (standaard: 100).',
        'colorMode: Overlay-kleurmodus — kleur, grijsschaal, zwart-wit.',
        'pasvorm: Hoe de overlay past — bedekken, omsluiten, uitrekken.',
        'rot: Overlay rotatie in graden.',
        'flipX, flipY: Stel in op 1 om de overlay om te draaien.',
        'keepFinders: Behoud zoekpatronen (standaard: 1).',
        'keepTiming, keepAlign: Stel in op 1 om timing-/uitlijningspatronen te behouden.',
      ],
    },
    {
      heading: 'Voorverwerkingsparameters',
      paragraphs: ['Beeldvoorverwerking toegepast op overlay:'],
      bullets: [
        'helderheid: Aanpassing -100 tot 100 (standaard: 0).',
        'contrast: Aanpassing -100 tot 100 (standaard: 0).',
        'gamma: Waarde 0,1 tot 3 (standaard: 1).',
        'verzadiging: Aanpassing -100 tot 100 (standaard: 0).',
        'tint: Tintrotatie in graden.',
        'blur: Vervaging in pixels.',
        'slijpen: Slijphoeveelheid 0-100.',
        'posterize: Posterize-niveaus.',
        'drempelwaarde: Binaire drempelwaarde 0-255.',
        'rand: Randdetectie — uit, Sobel, Canny.',
        'inverteren: Stel in op 1 om de kleuren om te keren.',
      ],
    },
    {
      heading: 'Watermerkparameters',
      paragraphs: ['Watermerken toevoegen aan gegenereerde QR-codes:'],
      bullets: [
        'wmEn: Stel in op 1 om watermerk in te schakelen.',
        'wmKind: Watermerktype — tekst, afbeelding, patroon.',
        'wmText: Watermerktekst (URL-gecodeerd).',
        'wmImg: URL naar watermerkafbeelding.',
        'wmPos: Positie — midden, hoeken, randen, achter, stille zone.',
        'wmOpacity: Dekking 0-100 (standaard: 50).',
        'wmBlend: Mengmodus — normaal, vermenigvuldigen, scherm, overlay.',
      ],
    },
    {
      heading: 'Animatieparameters',
      paragraphs: ['Voor geanimeerde GIF-uitvoer (vereist format=gif):'],
      bullets: [
        'animPattern: Animatiepatroon — geen, puls, golf, scanlijn, glinstering, drift, kleurcyclus.',
        'animFrames: Aantal frames 1-60 (standaard: 24).',
        'animSpeed: Framevertraging in milliseconden 10-1000 (standaard: 100).',
        'animSeed: Willekeurige seed voor animatie.',
        'easing: Animation easing — linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Uitvoerparameters',
      paragraphs: ['Opties voor uitvoerformaat:'],
      bullets: [
        'kwaliteit: WebP-kwaliteit 0-1 (standaard: 0,9).',
        'webpQ: WebP-kwaliteit 0-100 (standaard: 90).',
        'gifColors: GIF-paletgrootte 2-256 (standaard: 256).',
        'dpi: Uitvoer-DPI voor PNG (standaard: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: PNG-metadatavelden.',
      ],
    },
    {
      heading: 'Voorbeeldgebruik',
      paragraphs: [
        'Basis QR-code:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Gestileerde QR-code met aangepaste kleuren:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR-code met overlay-afbeelding:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'Geanimeerde GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'QR-codes insluiten',
      paragraphs: [
        "In de professionele modus genereert de deelfunctie insluitbare HTML en URL's. Zo werkt het insluiten:",
      ],
      bullets: [
        'Deellink: Hiermee wordt een URL naar de ANQR-app gegenereerd, waarbij al uw instellingen als URL-parameters zijn gecodeerd. Ontvangers kunnen de QR-code bekijken en wijzigen.',
        'Afbeelding insluiten: Genereert een tag die verwijst naar de server-API. De QR-code wordt aan de serverzijde weergegeven en als afbeelding aangeboden.',
        'Markdown insluiten: Maakt Markdown-afbeeldingssyntaxis voor documentatie- en README-bestanden.',
        'Directe API-URL: De onbewerkte API-URL voor gebruik in applicaties, scripts of andere integraties.',
      ],
    },
    {
      heading: 'HTML-voorbeeld',
      paragraphs: [
        'Een QR-code in uw website insluiten:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-code />',
        'Voor responsieve maatvoering:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-code style=max-width: 100%; height: auto; />',
        'De server cachet reacties met lange cacheheaders, waardoor herhaalde verzoeken voor dezelfde URL snel worden verwerkt.',
      ],
    },
    {
      heading: 'URL-indeling delen',
      paragraphs: [
        'Wanneer u in de professionele modus op Delen klikt, codeert ANQR uw huidige instellingen in URL-parameters. Het formaat is:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….',
        'Deze parameters weerspiegelen de API-parameters, zodat u een gedeelde URL kunt omzetten naar een API-URL door het basispad van / naar /api/qr te wijzigen en de w/h-parameters naar behoefte aan te passen.',
        'Opmerking: Overlay-afbeeldingen die vanuit lokale bestanden zijn geüpload, kunnen niet via een URL worden gedeeld. Alleen URL-gebaseerde overlays (img-parameter) werken in gedeelde links en API-aanroepen.',
      ],
    },
    {
      heading: 'Tarieflimieten en gebruik',
      paragraphs: [
        'De API is gratis te gebruiken voor redelijke volumes. Voor gebruik met grote volumes of commerciële toepassingen die gegarandeerde beschikbaarheid vereisen, kunt u contact met ons opnemen.',
        'API-reacties bevatten agressieve caching-headers. Voor optimale prestaties kunt u reacties aan uw kant cachen of consequent dezelfde URL gebruiken voor identieke QR-codes.',
      ],
    },
    {
      heading: 'Beste praktijken',
      paragraphs: ['Volg deze richtlijnen voor betrouwbare QR-codes:'],
      bullets: [
        'Test uw QR-codes altijd met meerdere scanner-apps voordat u ze afdrukt.',
        'Gebruik foutcorrectie H (Hoog) bij het toevoegen van overlays.',
        'Houd ten minste 4 modules aan stille zone (marge) aan.',
        'Zorg voor een hoog contrast tussen voorgrond en achtergrond.',
        'Gebruik voor afdrukken minimaal 300 DPI en test op de werkelijke afdrukgrootte.',
        "Schakel 'Zoekpatronen behouden' in bij gebruik van overlays.",
        'Begin met een lagere overlay-intensiteit en verhoog deze geleidelijk.',
        'Voor gebruik buitenshuis kunt u overwegen grotere moduleformaten en een hogere foutcorrectie te gebruiken.',
      ],
    },
    {
      heading: 'Probleemoplossing',
      paragraphs: ['Veelvoorkomende problemen en oplossingen:'],
      bullets: [
        'QR-scanner werkt niet: verlaag de overlay-intensiteit, verhoog de foutcorrectie, controleer het contrast.',
        'Code te groot: Verkort de inhoud, gebruik een URL-verkorter, kleinere versie.',
        'Wazige uitvoer: vergroot de modulegrootte en gebruik PNG in plaats van gecomprimeerde formaten.',
        'Kleuren zien er verkeerd uit: controleer het kleurcontrast, probeer de grijsschaal-overlaymodus.',
        'GIF wordt niet geanimeerd: Zorg ervoor dat u het uitvoerformaat GIF gebruikt en controleer het aantal frames.',
        'Afbeeldingoverlay wordt niet geladen: controleer de CORS-machtigingen voor externe afbeeldingen.',
      ],
    },
    {
      heading: 'Toetsenbord sneltoetsen',
      paragraphs: [
        'ANQR ondersteunt standaard sneltoetsen. Gebruik Ctrl/Cmd+S om de export te starten (wanneer het voorbeeldvenster is geselecteerd).',
      ],
    },
    {
      heading: 'Delen en insluiten',
      paragraphs: [
        'Klik in de professionele modus op de knop Delen om een URL met uw huidige instellingen te kopiëren. Ontvangers kunnen deze URL openen om uw exacte configuratie te bekijken. Opmerking: Overlay-afbeeldingen uit lokale bestanden kunnen niet via een URL worden gedeeld.',
      ],
    },
  ],
};

export default docs;
