import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const guide: PageDefinition = {
  title: 'ANQR Gebruikersgids',
  description: 'Volledige gids vir die gebruik van ANQR vir die skep van QR-kodes.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aan die gang kom',
      paragraphs: [
        "ANQR is 'n QR-kodegenerator met 'n kliënt-eerste benadering. Standaard word QR-kodes plaaslik in jou blaaier gegenereer — geen rekening nodig nie en jou data bly privaat. Vir professionele inbedding kan jy ook die bedienerkant-API gebruik.",
        'Die koppelvlak het drie koppelvlakvlakke: Basies, Gevorderd en Professioneel. Kies jou vlak deur die oortjies in die koptekst te gebruik. Elke vlak ontsluit bykomende funksies terwyl die koppelvlak gefokus bly op wat jy nodig het.',
      ],
      bullets: [
        'Basies: Eenvoudige QR-kode-skepping met gewone teks/URL-inhoud en beeldoorleg.',
        'Gevorderd: QR-koderingsopsies, weergawestyle, animasie, uitvoerformate, uitgebreide inhoudtipes en oorleg-aanpassing.',
        'Professioneel: Watermerke, metadata, deling, veiligheidsanalise, QR-kodes vir betaling en ondernemingskenmerke.',
      ],
    },
    {
      heading: 'Vinnige Begin',
      paragraphs: ['Om jou eerste QR-kode te skep:'],
      bullets: [
        "1. Kies 'n inhoudtipe (URL, teks, WiFi, ens.) uit die Inhoudtipe-aftreklys.",
        '2. Voer jou data in die voorsiene velde in.',
        "3. Pas kleure en style aan, en voeg 'n oorlegbeeld by.",
        '4. Klik Uitvoer om jou QR-kode as PNG, GIF, WebP of SVG af te laai.',
      ],
    },
    {
      heading: 'Basiese Kenmerke',
      paragraphs: [
        "Die Basiese vlak bied 'n vaartbelynde koppelvlak vir die skep van QR-kodes met vraginhoud en beeldoorlegsels. Dit is die eenvoudigste manier om te begin.",
      ],
    },
    {
      heading: 'Inhoudsoorte (Basies)',
      paragraphs: [
        'Gewone teks: Enkodeer enige teks tot die QR-kodekapasiteitslimiet. Ideaal vir kort boodskappe, kodes of identifiseerders.',
        'URL: Enkodeer webadresse. Die QR-kode sal die URL oopmaak wanneer dit geskandeer word. Ondersteun http://- en https://-protokolle.',
      ],
    },
    {
      heading: 'Beeldoorleg (Basies)',
      paragraphs: [
        "Laai 'n beeld (JPG, PNG, GIF, WebP) op om met jou QR-kode te meng. Basiese oorlegfunksies sluit in:",
      ],
      bullets: [
        "Laai op vanaf lêer: Kies 'n beeld vanaf jou toestel.",
        "Laai vanaf URL: Voer 'n beeld-URL in (moet CORS toelaat).",
        'Sentrale Logo: Plaas beeld in die middel, afhangende van foutkorreksie.',
        'Vermenging: Eenvoudige alfa-vermenging van beeld met QR-patroon.',
        'Intensiteit: Beheer hoe sterk die oorlegsel die QR-kode beïnvloed (0-100%).',
        'Kleurmodus: Volkleur, Grysskaal of Swart & Wit.',
        'Bewaar Soekerpatrone: Hou hoekpatrone onveranderd vir betroubare skandering.',
      ],
    },
    {
      heading: 'Gevorderde kenmerke',
      paragraphs: [
        'Die Gevorderde vlak ontsluit QR-koderingsopsies, weergawestyle, animasie, uitvoerformate, uitgebreide inhoudtipes en gevorderde oorleg-aanpassing.',
      ],
    },
    {
      heading: 'QR-koderinginstellings',
      paragraphs: [
        'Weergawe: QR-kodes kom in weergawes 1-40, met hoër weergawes wat meer data bevat, maar groter is. Stel op 0 (Auto) om ANQR die kleinste weergawe te laat kies wat by jou inhoud pas.',
        "Foutkorreksie: Bepaal hoeveel skade 'n QR-kode kan ly terwyl dit skandeerbaar bly.",
      ],
      bullets: [
        'L (Laag): 7% foutkorreksie - kleinste grootte, minste oortolligheid.',
        'M (Medium): 15% foutkorreksie - gebalanseerde opsie.',
        'Q (Kwartiel): 25% foutkorreksie - goed vir gedrukte kodes.',
        'H (Hoog): 30% foutkorreksie - die beste vir kodes met oorlegsels of in strawwe toestande.',
      ],
    },
    {
      heading: 'Stil Sone (Marge)',
      paragraphs: [
        'Die stil sone is die wit spasie rondom die QR-kode. Skandeerders benodig hierdie marge om te bepaal waar die kode begin. Die standaard beveel ten minste 4 modules aan. As dit onder 4 verminder word, kan dit skanderingsprobleme veroorsaak.',
      ],
    },
    {
      heading: 'Modulestyl',
      paragraphs: [
        "Modules is die individuele vierkante wat 'n QR-kode uitmaak. ANQR bied vyf style:",
      ],
      bullets: [
        'Vierkant: Klassieke QR-voorkoms met skerp hoeke.',
        "Afgerond: Versagde hoeke vir 'n vriendeliker voorkoms.",
        "Pukke: Sirkelvormige modules vir 'n moderne estetika.",
        "Diamant: 45° geroteerde vierkante vir 'n kenmerkende patroon.",
        'Verbonde: Modules smelt saam wanneer hulle aangrensend is, wat organiese vorms skep.',
      ],
    },
    {
      heading: 'Vindpatroonstyl',
      paragraphs: [
        'Vindpatrone is die drie groot vierkante in QR-hoeke wat skandeerders help om die kode te oriënteer. Beskikbare style:',
      ],
      bullets: [
        'Vierkant: Standaard vierkantige hoeke.',
        'Afgerond: Versagde hoeke wat ooreenstem met die afgeronde modulestyl.',
        'Sirkel: Sirkelvormige soekpatrone vir puntstylkodes.',
      ],
    },
    {
      heading: 'Belyning en tydsberekeningpatrone',
      paragraphs: [
        'Belyningspatrone verskyn in groter QR-kodes (weergawe 2+) om vervorming te help korrigeer. Tydspatrone is die afwisselende lyne wat soekpatrone verbind.',
      ],
      bullets: [
        'Belyningstyl: Pasmaatvinder, Vierkantig, Afgerond of Sirkel.',
        'Tydsberekeningstyl: Pasmodule, Solied of Gestreep.',
      ],
    },
    {
      heading: 'Kleure',
      paragraphs: [
        'Voorgrond: Die kleur van die QR-modules. Swart (#000000) is standaard, maar enige donker kleur werk.',
        'Agtergrond: Die agtergrondkleur. Wit (#ffffff) is standaard. Verseker voldoende kontras met die voorgrond.',
        'Deursigtige agtergrond: Verwyder die agtergrond heeltemal vir gebruik op gekleurde oppervlaktes. Maak seker dat die oppervlak voldoende kontras bied.',
      ],
    },
    {
      heading: 'Modulegrootte en gaping',
      paragraphs: [
        'Modulegrootte: Beheer hoe groot elke module in pixels weergegee word. Groter waardes skep groter, makliker skandeerbare kodes.',
        "Module-gaping: Voeg spasie tussen modules as 'n persentasie by. Klein gapings (5-15%) kan skandeerbaarheid in sommige toestande verbeter, maar oormatige gapings verminder betroubaarheid.",
      ],
    },
    {
      heading: 'Uitvoerinstellings',
      paragraphs: ['Formaat: Kies jou uitvoerformaat gebaseer op die gebruiksgeval.'],
      bullets: [
        'PNG: Verlieslose rasterformaat, ideaal vir die meeste gebruike. Die beste vir drukwerk en digitaal.',
        'WebP: Moderne formaat met kleiner lêergroottes. Goed vir webgebruik.',
        'GIF: Vereis vir geanimeerde QR-kodes. Ondersteun deursigtigheid.',
        'SVG: Vektorformaat wat oneindig skaal. Die beste vir grootdruk of wanneer jy die kode moet wysig.',
      ],
    },
    {
      heading: 'Uitvoerdimensies',
      paragraphs: [
        'Breedte/Hoogte: Stel die uitvoergrootte in pixels. Vir drukwerk, bereken gebaseer op DPI (bv. 300 DPI teen 1 duim = 300px). Groter groottes skandeer meer betroubaar op afstand.',
      ],
    },
    {
      heading: 'Animasie-instellings (Gevorderd)',
      paragraphs: ['Beheer geanimeerde QR-kodegedrag:'],
      bullets: [
        'Spoed: Animasieraamtempo in millisekondes.',
        'Lus: Deurlopende of enkelspel-animasie.',
        'Bounce: Ping-pong animasie regie.',
        'Beginraam: Begin animasie vanaf spesifieke raam.',
        'Maksimum rame: Beperk totale rame in animasie.',
        'Raamstap: Slaan rame oor vir vinniger animasie.',
        'Interpolasie: Geen, Kruisvervaag of Verander tussen rame.',
      ],
    },
    {
      heading: 'Inhoudsoorte (Gevorderd)',
      paragraphs: ['Gevorderde vlak ontsluit bykomende vragformate:'],
      bullets: [
        "Telefoonnommer (tel:): Skep 'n oproepbare telefoonskakel.",
        'E-pos (mailto:): Maak e-poskliënt oop met opsionele onderwerp en liggaam.',
        "SMS: Voorafgevulde teksboodskap na 'n telefoonnommer.",
        'vCard: Volledige kontakkaart met naam, organisasie, telefoon, e-pos, adres.',
        'MeCard: Kompakte kontakformaat gewild in Japan.',
        'BizCard: Ouer besigheidskaartjieformaat.',
        'Geo-ligging: GPS-koördinate wat in kaarte oopmaak.',
        'WiFi: Netwerkbewyse vir outomatiese verbinding (SSID, wagwoord, sekuriteitstipe).',
        'Kalendergebeurtenis: iCalendar-formaat met titel, ligging, datum/tyd.',
        'Geleentheid RSVP: Skakel na geleentheidsregistrasiebladsy.',
        "Kalenderintekening: Teken in op 'n ICS/WebCal-voer.",
        'Lêer-/Dokument-URL: Direkte skakel na aflaaibare lêers.',
        'Wolkbergingskakel: Skakels na Google Drive, Dropbox, OneDrive, ens.',
        'Sosiale Profiel: Skakels na LinkedIn, Twitter, Instagram, ens.',
        'Boodskapskakel: WhatsApp, Telegram, Signal diep skakels.',
      ],
    },
    {
      heading: 'Gevorderde oorlegfunksies',
      paragraphs: ['Bykomende oorlegvermoëns:'],
      bullets: [
        "Sny: Aktiveer sny om 'n vierkantige streek van jou beeld te kies.",
        'Halftoon: Klassieke drukstyl-kolletjiepatroon gebaseer op beeldhelderheid.',
        'Gedithered: Foutdiffusie-dithering vir gedetailleerde reproduksie.',
      ],
    },
    {
      heading: 'Oorleg-mengmodusse (Gevorderd)',
      paragraphs: ['Bykomende mengmodusse in Gevorderde vlak:'],
      bullets: [
        'Subpixel: Verdeel elke module in subpixels vir hoër detail.',
        'Blou Geraas: Gebruik blou geraas-dithering vir artefakvrye patrone.',
        'Mosaïek: Teëlgebaseerde effek wat beeldstruktuur bewaar.',
        'Gapevul: Plaas beeld in gapings tussen modules.',
        'Helderheid: Varieer modulegrootte gebaseer op beeldhelderheid.',
        'Duotoon: Verbind beeld met twee kleure vir treffende kontras.',
      ],
    },
    {
      heading: 'Oorlegintensiteit',
      paragraphs: [
        'Beheer hoe sterk die oorlegsel die QR-kode beïnvloed (0-100%). Hoër waardes wys meer beelddetail, maar kan skandeerbaarheid verminder. Begin rondom 70% en pas aan op grond van toetsing.',
      ],
    },
    {
      heading: 'Kleurmodus',
      paragraphs: ['Hoe die oorlegbeeld verwerk word:'],
      bullets: [
        'Volle kleur: Behou oorspronklike beeldkleure.',
        'Grysskaal: Skakel om na swart en wit kleure.',
        'Swart & Wit: Hoëkontras binêre omskakeling.',
      ],
    },
    {
      heading: 'Bewaar Soekerpatrone',
      paragraphs: [
        'Wanneer dit geaktiveer is, bly die driehoeksoekpatrone onveranderd deur die oorlegsel. Sterk aanbeveel vir betroubare skandering.',
      ],
    },
    {
      heading: 'Beeldvoorverwerking',
      paragraphs: [
        'Pas filters toe op jou oorlegbeeld voordat jy dit meng. Hierdie aanpassings kan verbeter hoe die beeld in die finale QR-kode verskyn.',
      ],
      bullets: [
        'Helderheid (-100 tot +100): Verlig of verdonker die beeld.',
        'Kontras (-100 tot +100): Verhoog of verlaag die toonbereik.',
        'Gamma (0.2 tot 3.0): Nie-lineêre helderheidsaanpassing. Waardes onder 1 verlig middeltone, bo 1 verdonker hulle.',
        'Vasadasie (-100 tot +100): Kleurintensiteit. -100 is grysskaal, +100 is oorversadig.',
        'Kleurrotasie (0-360°): Verskuif alle kleure rondom die kleurwiel.',
        'Vervaag (0-20px): Versag beeldbesonderhede.',
        'Verskerp (0-100%): Verbeter rande en besonderhede.',
        "Plakkateer (0-16 vlakke): Verminder kleurvlakke vir 'n plakkaateffek.",
        'Drempel (0-255): Skakel om na binêre swart/wit by die afsnypunt.',
        'Randopsporing: Sobel- of Canny-algoritmes om slegs rande te wys.',
        'Omkeer: Keer alle kleure om.',
      ],
    },
    {
      heading: 'Pasmodus',
      paragraphs: ['Hoe die oorlegbeeld by die QR-kode-area pas:'],
      bullets: [
        'Omslag: Beeld vul die hele area, sny indien nodig.',
        'Bevat: Hele beeld sigbaar, mag kantlyne hê.',
        'Strek: Beeld vervorm om presies te vul.',
      ],
    },
    {
      heading: 'Transformeer Opsies',
      paragraphs: [
        'Rotasie: Roteer die oorlegsel in 90°-inkremente.',
        'Flip X/Y: Spieël die beeld horisontaal of vertikaal.',
      ],
    },
    {
      heading: 'Dithering-algoritmes',
      paragraphs: [
        'Dithering skakel deurlopende toonbeelde om na patrone wat QR-kodes kan voorstel. Beskikbaar wanneer Dithered, Blue Noise of True Dither-mengmodusse gebruik word.',
      ],
      bullets: [
        'Foutverspreiding: Klassieke Floyd-Steinberg-styl. Versprei kwantiseringsfout na aangrensende pixels.',
        "Georden (Bayer): Gebruik 'n drempelmatriks vir gereelde patrone.",
        'Gegroepeerde punt: Simuleer halftoondrukwerk.',
        'Leegte en Groep: Geoptimaliseerde geordende dithering.',
        'Blou Geraas: Visueel aangename, lukraak lykende patroon.',
        'Blou Geraas Drempel: Drempel-dithering met blou geraas tekstuur.',
        'Witgeraas: Willekeurige drempel-dithering.',
        'Gaussiese/Driehoekige Geraas: Geraas met verskillende verspreidings.',
        'Blou Geraas + Foutdiffusie: Hibriede kombinasie van beide tegnieke.',
        'Geskermde Blou Geraas: Skermagtige blou geraaspatroon.',
        'Perseptueel: Luminansie-geweeg vir beter visuele resultate.',
        'Randbewus: Bewaar beeldrande tydens dithering.',
        'Aanpasbare Drempel: Lokaal-aanpasbare drempelbepaling.',
        "Temporale Blou Geraas: Vir geanimeerde GIF's, wissel patroon per raam.",
      ],
    },
    {
      heading: 'Diffusiepitte',
      paragraphs: ['Wanneer Foutverspreiding-dithering gebruik word, kies hoe fout versprei word:'],
      bullets: [
        'Floyd-Steinberg: Klassieke 4-buur diffusie. Goeie algemene keuse.',
        'Jarvis-Judice-Ninke: 12-buurman, gladder maar stadiger.',
        'Stucki: Soortgelyk aan JJN met verskillende gewigte.',
        'Burkes: Vereenvoudigde JJN, vinniger.',
        'Sierra: Familie van pitte wat kwaliteit en spoed balanseer.',
        'Atkinson: Ligverspreiding, behou detail maar kan korrelrig wees.',
      ],
    },
    {
      heading: 'Dither Krag',
      paragraphs: [
        'Beheer hoeveel dithering toegepas word (0-100%). Laer waardes behou meer van die oorspronklike patroon, hoër waardes wys meer beelddetail.',
      ],
    },
    {
      heading: 'Subpixel-instellings',
      paragraphs: ['Wanneer Subpixel-mengmodus gebruik word:'],
      bullets: [
        'Roostergrootte: 2×2, 3×3, of 4×4 subpixels per module. Hoër = meer detail.',
        'Sentrumreël: Streng vereis dat die middelste subpixel by die module pas. Halftoonsentrum laat variasie toe.',
        'Neutrale Kleur: Kleur wat gebruik word vir onbepaalde subpixels.',
        'Vindoorskakeling: Hoe vinderpatrone weergegee word (Solied of Gestileerd).',
      ],
    },
    {
      heading: 'Ralftooninstellings',
      paragraphs: ['Wanneer halftoon-mengmodus gebruik word:'],
      bullets: [
        'Selgrootte: Per Module of N×N-rooster.',
        'Puntvorm: Sirkel, Vierkant of Lyn.',
        'Helderheidskromme: Lineêr, S-kromme of Gamma.',
      ],
    },
    {
      heading: 'Duotoonkleure',
      paragraphs: [
        'Wanneer jy Duotone-mengmodus gebruik, stel die Skadukleur (donker areas) en Uitligkleur (helder areas) in.',
      ],
    },
    {
      heading: 'GIF-animasie-instellings',
      paragraphs: ['Wanneer geanimeerde GIF-oorlegsels gebruik word:'],
      bullets: [
        'Gebruik raamvertragings: Respekteer oorspronklike GIF-tydsberekening.',
        'Maksimum FPS: Beperk raamtempo (1-60 fps).',
        'Beskikkingshantering: Respekteer of vereenvoudig raambeskikkingsmetodes.',
      ],
    },
    {
      heading: 'Gevorderde Leweropsies',
      paragraphs: ['Bykomende weergawekontroles:'],
      bullets: [
        'Gapmodus: Geen, Inset, Strek of Negatiewe Ruimte gapingstilering.',
        'Hoekradius: Persentasie afgeronde hoeke vir modules.',
        'Gradiënt: Geen, Lineêr, Radiaal of Koniese gradiënt op modules.',
        'Oog Buite/Binne Styl: Onafhanklike stilering vir soekpatroonringe.',
        'Puntrotasie: Roteer diamant-/puntmodules.',
        'Oogskaal: Grootte-aanpassing vir soekpatrone.',
        'Raamstyl: Voeg dekoratiewe rame by (Afgeronde raam, plakker, etiket).',
        'Raamteks: Voeg teks soos Skandeer my! by rame.',
      ],
    },
    {
      heading: 'Gevorderde QR-kodering',
      paragraphs: ['Verfyn QR-kodering:'],
      bullets: [
        'Enkoderingsmodus: Outomaties, Numeries, Alfanumeries, Byte/UTF-8, of Kanji.',
        'Dwing Min Stil Sone Af: Verseker ten minste 4 module marge.',
      ],
    },
    {
      heading: 'Gevorderde Uitvoeropsies',
      paragraphs: ['Bykomende uitvoerinstellings:'],
      bullets: [
        'Lêernaam: Pasgemaakte lêernaam vir aflaaie.',
        'GIF-paletgrootte: 2-256 kleure in GIF-uitvoer.',
        'GIF-kwantiseerder: Mediaansnit, NeuQuant of Octree-kleurvermindering.',
        'GIF-rastering: Af, Floyd-Steinberg of Georden.',
        "GIF Deursigtige Kleur: Stel 'n kleur om deursigtig te wees.",
        'SVG Ware Vektor: Gebruik paaie in plaas van ingebedde raster.',
        'SVG-vormpresisie: Piksel- of presiese padweergawe.',
        'SVG Inbed Raster Oorleg: Sluit oorleg as ingebedde beeld in.',
        "Agtergrondoorskrywing: Forseer 'n spesifieke agtergrondkleur in uitvoer.",
      ],
    },
    {
      heading: 'Validasie-opsies',
      paragraphs: ['Invoerverwerkingsinstellings:'],
      bullets: [
        'Valideer invoer: Kontroleer inhoudformaat voor kodering.',
        'Sny witspasies af: Verwyder voorste/agterste spasies.',
        'Normaliseer Nuwe Lyne: Skakel alle lyneindes om na LF.',
        'Maksimum Lengte Beskermer: Waarsku as inhoud QR-kapasiteit oorskry.',
      ],
    },
    {
      heading: 'Professionele Kenmerke',
      paragraphs: [
        'Die Professionele vlak voeg watermerke, metadata, deelopsies, veiligheidsanalise, betaal-QR-kodes en ondernemingskenmerke by.',
      ],
    },
    {
      heading: 'Watermerk',
      paragraphs: ['Voeg watermerke by jou QR-kodes:'],
      bullets: [
        'Soort: Teks-, Beeld- of Patroonwatermerk.',
        'Posisie: Sentrum, Hoeke, Kante, Agter, of Stil Sone.',
        'Ondeursigtigheid: Watermerkdeursigtigheid (0-100%).',
        'Mengmodus: Normaal, Vermenigvuldig, Skerm of Oorleg-menging.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Voeg metadata in uitgevoerde lêers in:'],
      bullets: [
        'Titel, Outeur, Kopiereg, Lisensie, Beskrywingsvelde.',
        'Skeppingstyd: Voeg generasietydstempel in.',
        'Aangepaste sleutelwaarde: Voeg arbitrêre metadata-pare by.',
      ],
    },
    {
      heading: 'Deel',
      paragraphs: ['Deel jou QR-kode-konfigurasies:'],
      bullets: [
        "Direkte skakel: Genereer 'n deelbare URL met jou huidige instellings.",
        'Inbed HTML: Kry inbedkode vir webwerwe.',
        'Enkodeer Parameters: Sluit alle instellings in die deel-URL in.',
        'Let wel: Oorlegbeelde van plaaslike lêers kan nie via URL gedeel word nie.',
      ],
    },
    {
      heading: 'Veiligheidsanalise',
      paragraphs: ['Maak seker dat QR-kodes skandeerbaar bly:'],
      bullets: [
        'Veiligheidsmodus: Af, Gebalanseerd of Streng skanderingsvereistes.',
        'Min Modulegrootte: Minimum pixelgrootte per module.',
        'Min Stil Sone: Minimum marge modules.',
        'Sluitvinders/Tydsberekening/Belyning/Formaat/Weergawe: Beskerm spesifieke elemente.',
        'Maksimum Oorlegintensiteit deur ECC: Outomatiese intensiteitslimiete gebaseer op foutkorreksievlak.',
      ],
    },
    {
      heading: 'Inhoudsoorte (Professioneel)',
      paragraphs: ['Professionele vlak voeg betaling- en ondernemingsinhoudtipes by:'],
      bullets: [
        'EPC/SEPA (EU): Europese bankoorplasings-QR-kodes met IBAN, BIC, bedrag, verwysing.',
        'UPI (Indië): Verenigde Betalingskoppelvlak met VPA, naam van begunstigde, bedrag.',
        'PayNow (Singapoer): Singapoer vinnige betaling met UEN of selfoonnommer.',
        'PromptPay (Thailand): Thaise nasionale betalingsstelsel.',
        'PIX (Brasilië): Brasiliaanse kitsbetaling met PIX-sleutel.',
        'Kripto: Bitcoin, Ethereum, Litecoin betaaladresse met opsionele bedrag.',
        "Bemarkingsveldtogskakel: URL'e met volledige UTM-parameter (bemarkingsetikette) dop.",
        'Kort skakel: Vir gebruik met URL-verkorters vir dinamiese/opspoorbare QR-kodes.',
        'GS1 Digitale Skakel: Produkidentifikasie met GTIN, reeksnommer, bondel, vervaldatum.',
        'App-diep skakel: iOS/Android-app-diep skakels met pasgemaakte skemas.',
        'Aangepaste formaat: Rou data sonder formatering of validering.',
      ],
    },
    {
      heading: 'Taalrelevante Betalings in Gevorderde Modus',
      paragraphs: [
        'Wanneer Gevorderde modus gebruik word, wys ANQR outomaties betaalmetodes wat relevant is vir jou gekose taal. Byvoorbeeld, Viëtnamese gebruikers sien VietQR, Thaise gebruikers sien PromptPay, en Indiese gebruikers sien UPI en BharatQR. Globale betaalmetodes (kriptogeldeenheid, PayPal, Cash App) is beskikbaar vir alle tale. Professionele modus ontsluit alle betaalstandaarde ongeag die taal.',
      ],
    },
    {
      heading: 'Europese Betalingsstandaarde',
      bullets: [
        'EPC/SEPA (EU): Europese bankoordrag QR-kodes volgens die EPC QR-kodestandaard. Ondersteun IBAN, BIC (opsioneel vir binnelands), bedrag in EUR, en gestruktureerde of ongestruktureerde betalingsverwysings. Word gebruik regoor die SEPA-sone, insluitend EU-lande plus Switserland, Noorweë, Ysland, Liechtenstein, Monaco en San Marino.',
        'Switserse QR-rekening: Switserse betalingsstandaard volgens SIX Implementeringsriglyne. Ondersteun CHF en EUR, QR-verwysing (QRR), krediteurverwysing (ISO 11649), gestruktureerde krediteur-/skuldenaaradresse en rekeninginligting. Vereis vir Switserse fakture sedert 2022.',
      ],
    },
    {
      heading: 'Indiese Betalingsstandaarde',
      bullets: [
        'UPI (Indië): Verenigde Betalingskoppelvlak volgens NPCI Diep Skakelspesifikasie. Ondersteun VPA (Virtuele Betalingsadres), begunstigdenaam, bedrag in INR, transaksienota, verwysings-ID, handelaarkategoriekode en transaksiemodus.',
        'BharatQR (Indië): Verenigde QR-standaard wat beide UPI- en kaartgebaseerde betalings ondersteun. Kombineer UPI VPA met kaart PAN vir maksimum versoenbaarheid. Sluit handelaarnaam, stad, MCC, BTW-besonderhede en faktuur-/verwysingsnommers in.',
      ],
    },
    {
      heading: 'Suidoos-Asiatiese Betalingsstandaarde',
      bullets: [
        "PayNow (Singapoer): Singapoerse vinnige betalingsstelsel wat EMVCo QR-spesifikasie met SGQR-profiel gebruik. Ondersteun UEN (besigheidsregistrasie), selfoonnommer of NRIC as volmag-identifiseerders. Sluit 'n wysigbaarheidsvlag en vervaldatum in.",
        'PromptPay (Thailand): Thaise nasionale betalingsstelsel wat die Bank van Thailand se EMV-profiel volg. Ondersteun selfoonnommer, nasionale ID, belasting-ID, e-beursie-ID en rekeningbetaling met verskeie verwysingsvelde.',
        'QRIS (Indonesië): Vinnige reaksiekode Indonesiese standaard. EMV-gebaseerde nasionale betalingsstandaard wat handelaar-ID, NMID (Nasionale Handelaar-ID), handelaarkriteria-klassifikasie en geriefsfooie (vas of persentasie) ondersteun.',
        'DuitNow (Maleisië): Maleisiese kitsbetalingstelsel. Ondersteun verskeie volmagtipes, insluitend NRIC, selfoon, paspoort, weermag-ID en besigheidsregistrasienommers.',
        'VietQR (Viëtnam): Viëtnamese interbankoordragstandaard. Vereis bank BIN (NAPAS-identifikasie) en rekeningnommer. Ondersteun verskeie dienskodes vir verskillende oordragtipes (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filippyne): Filippynse QR-betalingsstandaard vir InstaPay en PESONet. Gebruik rekeningnommers met handelaaridentifikasie vir P2M (persoon-tot-handelaar) transaksies.',
      ],
    },
    {
      heading: 'Oos-Asiatiese Betalingsstandaarde',
      bullets: [
        'TWQR (Taiwan): Taiwanese QR-betalingsstandaard. Ondersteun handelaar-ID, belasting-ID en TWD-bedrae.',
        'HKQR/FPS (Hong Kong): Hong Kong Faster Payment System QR-kodes. Ondersteun FPS ID, selfoonnommer of e-pos as betalingsidentifiseerders. Bedrae in HKD.',
        'JPQR (Japan): Japannese verenigde QR-kode-betalingsstandaard. Gebruik winkel-ID vir handelaaridentifikasie met JPY-bedrae.',
      ],
    },
    {
      heading: 'Ander Streeksbetalingsstandaarde',
      bullets: [
        'PIX (Brasilië): Brasiliaanse Sentrale Bank se kitsbetalingstelsel volgens BR-kodespesifikasie. Ondersteun PIX-sleutels (CPF, CNPJ, e-pos, telefoon of ewekansige sleutel), handelaar se naam/stad, transaksie-ID en BRL-bedrae.',
        'AusPayNet/NPP PayID (Australië): Australiese Nuwe Betalingsplatform PayID-stelsel. Ondersteun PayID-tipes (e-pos, selfoon, ABN, organisasie-ID) of tradisionele BSB + rekeningnommer. Handelaarnaam is opsioneel aangesien betalers die geregistreerde naam vanaf NPP-opslag sien.',
      ],
    },
    {
      heading: 'Kriptogeldeenheidbetalings',
      bullets: [
        "Bitcoin/Litecoin (BIP-21): Standaard kriptogeldeenheid-betalings-URI's met beursie-adres, opsionele bedrag en etiket. Versoenbaar met alle groot Bitcoin- en Litecoin-beursies.",
        "Lightning Network (BOLT11): Lightning Network-betalingsfakture. Plak 'n BOLT11-geënkodeerde faktuurstring vir onmiddellike Bitcoin-betalings met minimale fooie.",
        "Ethereum (EIP-681): Ethereum-transaksieversoek-URI's wat inheemse ETH-oordragte en ERC-20-tokenoordragte ondersteun. Sluit ketting-ID in vir multinetwerkondersteuning (Mainnet, Polygon, BSC, Arbitrum, Optimisme, Avalanche), gasparameters en kontrakfunksie-oproepe.",
      ],
    },
    {
      heading: 'Betalingskakeldienste',
      bullets: [
        'PayPal.Me: PayPal-betalingskakels met gebruikersnaam en opsionele voorafgevulde bedrag. Ontvangers kan betaal via PayPal-saldo, kaarte of bankrekeninge.',
        'Kontant-app: Kontant-app-betalingskakels met $cashtag met opsionele bedrag. Gewild in die Verenigde State vir eweknie-betalings.',
      ],
    },
    {
      heading: 'Generiese EMV QR',
      bullets: [
        'EMV Generies: Skep persoonlike EMV Handelaar-Aangebied Modus QR-kodes vir betalingsskemas wat nie spesifiek gelys is nie. Konfigureer handelaar se naam, stad, landkode (ISO 3166-1), geldeenheidkode (ISO 4217 numeries), MCC, fooitjie-/gerieflikheidsfooi-opsies en bykomende datavelde. Nuttig vir toetsing of persoonlike integrasies.',
      ],
    },
    {
      heading: 'Oorleg-mengmodusse (Professioneel)',
      paragraphs: ['Bykomende mengmodusse in Professionele vlak:'],
      bullets: [
        'Pikseleer: Gepikseleerde oorleg-effek.',
        'Omlyn: Randopsporingsoorlegsel wat slegs kontoere wys.',
        'Golf: Golwende vervormingseffek.',
        'Subpixelgrootte: Veranderlike subpixelgrootte gebaseer op beeld.',
        'Ware Dither: Gevorderde dithering met geordende matrikskeuse.',
        'Ekstreem: Maksimum beeldsigbaarheid, kan skandeerbaarheid beïnvloed.',
      ],
    },
    {
      heading: 'Beskermingsinstellings',
      paragraphs: ['Fynkorrelige beheer oor watter QR-elemente teen oorlegwysiging beskerm word:'],
      bullets: [
        'Behou tydsberekening: Hou tydspatrone onveranderd.',
        'Behou Belyning: Hou belyningspatrone onveranderd.',
        'Beskerm Formaatinligting: Beskerm formaatinligtingsmodules.',
        'Beskerm weergawe-inligting: Beskerm weergawe-inligtingsmodules.',
      ],
    },
    {
      heading: 'ECC-Bewuste Modus',
      paragraphs: [
        'Verdeel intelligent die oorlegintensiteit gebaseer op foutkorreksiekapasiteit. Die stelsel analiseer watter modules gewysig kan word terwyl skandeerbaarheid behoue bly.',
      ],
      bullets: [
        'Risikobegroting: Persentasie van foutkorreksiekapasiteit om te gebruik (0-100%).',
        'Hoër begroting = meer sigbare oorlegsel maar meer riskante skandeerbaarheid.',
        'Laer begroting = veiliger skandering maar minder sigbare oorlegsel.',
      ],
    },
    {
      heading: 'Professionele Leweropsies',
      paragraphs: ['Gevorderde weergawekontroles:'],
      bullets: [
        'Skerp rande: Gebruik gepikseleerde beeldweergawe vir skerp modulerande.',
        'Pixel Snap: Vloer-, Ronde- of Plafon-pixelbelyning.',
        'Kleurmodus per module: Solied, Volgens helderheid, Volgens posisie, Volgens oorlegsel, Volgens groep.',
        "Kleurpalet: Definieer 'n persoonlike kleurpalet vir kleur per module.",
        'Kontrasbeskerming: Verseker minimum kontrasverhouding tussen kleure.',
        'Min Kontrasverhouding: WCAG-styl kontrasvereiste (1:1 tot 21:1).',
        'Ekstra Grensmodules: Bykomende grens buite stil sone.',
      ],
    },
    {
      heading: 'Professionele Uitvoeropsies',
      paragraphs: ['Ondernemingsuitvoerinstellings:'],
      bullets: [
        'DPI: Stel drukresolusie (72-600 DPI). 300 DPI word aanbeveel vir druk.',
        'Sluit Stil Sone in: Wissel stil sone in uitvoerdimensies.',
        'Uitvoer as Bykomend: Genereer PDF langs primêre formaat.',
      ],
    },
    {
      heading: 'Animasie-instellings (Professioneel)',
      paragraphs: ['Bykomende professionele animasiekenmerke:'],
      bullets: [
        'Tydelelike Dither: Af, Blou Geraas, of Flikkerveilige per-raam dithering.',
        'Patroon: Geen, Puls, Golf, Skandeerlyn, Skitter of Dryf-effekte.',
      ],
    },
    {
      heading: 'API-verwysing',
      paragraphs: [
        "ANQR bied 'n bedienerkant-API vir die generering van QR-kodes via URL-parameters. Dit is ideaal vir die inbedding van QR-kodes in webwerwe, e-posse, dokumente of outomatiese werkvloeie sonder kliëntkant-JavaScript.",
        'Basis-URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Basiese Parameters',
      paragraphs: ['Vereiste en algemene parameters (parametername word nie vertaal nie):'],
      bullets: [
        'data (vereis): Die inhoud wat in die QR-kode gekodeer moet word. URL-gekodeerde spesiale karakters.',
        'grootte: Beeldgrootte in pixels (standaard: 400, maks: 2000). Word gebruik indien w/h nie gespesifiseer is nie.',
        'w, h: Uitvoerbreedte en -hoogte in pixels. Oorskryf grootteparameter.',
        'formaat: Uitvoerformaat — png, webp of gif (standaard: png).',
        'ec: Foutkorreksievlak — L, M, Q of H (standaard: H).',
        'fg: Voorgrondkleur as heksadesimum sonder # (standaard: 000000).',
        'bg: Agtergrondkleur as heksadesimum sonder # (standaard: ffffff).',
        'deursigtig: Stel op 1 vir deursigtige agtergrond.',
        'marge: Stil sone in modules (standaard: 4).',
      ],
    },
    {
      heading: 'Stylparameters',
      paragraphs: ['Module- en patroonstilering:'],
      bullets: [
        'styl: Modulestyl — vierkantig, afgerond, kolletjies, diamant, verbind.',
        'vinder: Vinderpatroonstyl — vierkantig, afgerond, sirkel.',
        'align: Belyningspatroonstyl — match_finder, vierkantig, afgerond, sirkel.',
        'tydsberekening: Tydsberekeningspatroonstyl — match_module, solied, stippellyn.',
        'radius: Hoekradiuspersentasie 0-100.',
        'gaping: Module gaping persentasie 0-50.',
        'gapMode: Gapmodus — geen, inset, streep, negatiewe_spasie.',
        'oogBuite, oogBinne: Oogstyle — vierkantig, afgerond, sirkel.',
        'eyeScale: Oogskaalpersentasie (standaard: 100).',
        'grad: Gradiënttipe — geen, lineêr, radiaal, konies.',
        'gradiënthoek: Gradiënthoek vir lineêre gradiënte.',
        'gradiëntstops: Gradiëntstops as kleur1,pos1,kleur2,pos2,… (bv. ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Oorlegparameters',
      paragraphs: ['Beeldoorleg-opsies (oorlegbeeld word van die bedienerkant afgehaal):'],
      bullets: [
        'img: URL om beeld oor te lê (moet publiek toeganklik wees).',
        'modus: Oorlegmodus — middelpunt, halftoon, versnit, helderheid, mosaïek, geraas, blouruis, subpixel.',
        'intensiteit: Oorlegintensiteit 0-100 (standaard: 100).',
        'colorMode: Oorlegkleurmodus — kleur, grysskaal, swart-en-wit.',
        'pasvorm: Hoe oorlegsel pas — bedek, bevat, rek.',
        'rot: Oorvleuelende rotasie in grade.',
        'flipX, flipY: Stel op 1 om oorlegsel om te draai.',
        'keepFinders: Bewaar vinderpatrone (standaard: 1).',
        'keepTiming, keepAlign: Stel op 1 om tydsberekening/belyningspatrone te bewaar.',
      ],
    },
    {
      heading: 'Voorverwerkingsparameters',
      paragraphs: ['Beeldvoorverwerking toegepas op oorlegsel:'],
      bullets: [
        'helderheid: Aanpassing -100 tot 100 (standaard: 0).',
        'kontras: Aanpassing -100 tot 100 (standaard: 0).',
        'gamma: Waarde 0.1 tot 3 (standaard: 1).',
        'versadiging: Aanpassing -100 tot 100 (standaard: 0).',
        'kleurtoon: Kleurrotasie in grade.',
        'vervaag: Vervaag in pixels.',
        'skerp: Skerp hoeveelheid 0-100.',
        'plakkaatmaak: Plakkaatmaakvlakke.',
        'drempel: Binêre drempel 0-255.',
        'rand: Randopsporing — af, sobel, slim.',
        'omkeer: Stel op 1 om kleure om te keer.',
      ],
    },
    {
      heading: 'Watermerkparameters',
      paragraphs: ['Voeg watermerke by gegenereerde QR-kodes:'],
      bullets: [
        'wmEn: Stel op 1 om watermerk te aktiveer.',
        'wmKind: Watermerktipe — teks, beeld, patroon.',
        'wmText: Watermerk teks (URL-geënkodeerd).',
        'wmImg: URL na watermerkbeeld.',
        'wmPos: Posisie — middelpunt, hoeke, rande, agter, stil_sone.',
        'wmOndeursigtigheid: Ondeursigtigheid 0-100 (standaard: 50).',
        'wmBlend: Mengmodus — normaal, vermenigvuldig, skerm, oorleg.',
      ],
    },
    {
      heading: 'Animasieparameters',
      paragraphs: ['Vir geanimeerde GIF-uitvoer (vereis formaat=gif):'],
      bullets: [
        'animPattern: Animasiepatroon — geen, puls, golf, skanderingslyn, glinstering, drywing, kleursiklus.',
        'animFrames: Aantal rame 1-60 (standaard: 24).',
        'animSpeed: Raamvertraging in millisekondes 10-1000 (standaard: 100).',
        'animSeed: Willekeurige saad vir animasie.',
        'verslapping: Animasieverslapping — lineêr, verligting_in, verligting_uit, verligting_in_uit, weiering.',
      ],
    },
    {
      heading: 'Uitvoerparameters',
      paragraphs: ['Uitvoerformaatopsies:'],
      bullets: [
        'kwaliteit: WebP-kwaliteit 0-1 (standaard: 0.9).',
        'webpQ: WebP-kwaliteit 0-100 (standaard: 90).',
        'gifColors: GIF-paletgrootte 2-256 (standaard: 256).',
        'dpi: Uitvoer-DPI vir PNG (standaard: 72).',
        'metaTitel, metaOuteur, metaKopie, metaBeskrywing: PNG-metadatavelde.',
      ],
    },
    {
      heading: 'Voorbeeldgebruik',
      paragraphs: [
        'Basiese QR-kode:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Gestileerde QR-kode met persoonlike kleure:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR-kode met oorlegbeeld:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'Geanimeerde GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Inbedding van QR-kodes',
      paragraphs: [
        "In Professionele modus genereer die Deel-funksie inbedbare HTML en URL'e. Hier is hoe inbedding werk:",
      ],
      bullets: [
        "Deel skakel: Skep 'n URL na die ANQR-toepassing met al jou instellings geënkodeer as URL-parameters. Ontvangers kan die QR-kode bekyk en wysig.",
        "Inbedbeeld: Genereer 'n etiket wat na die bediener-API wys. Die QR-kode word aan die bedienerkant weergegee en as 'n beeld bedien.",
        'Inbed Markdown: Skep Markdown-beeldsintaksis vir dokumentasie en README-lêers.',
        'Direkte API-URL: Die rou API-URL vir gebruik in toepassings, skrifte of ander integrasies.',
      ],
    },
    {
      heading: 'HTML-voorbeeld',
      paragraphs: [
        "Om 'n QR-kode in jou webwerf in te sluit:",
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-kode />',
        'Vir responsiewe groottebepaling:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-kode style=maksimum-wydte: 100%; hoogte: outomaties; />',
        'Die bediener stoor antwoorde met lang kas-opskrifte, so herhaalde versoeke vir dieselfde URL is vinnig.',
      ],
    },
    {
      heading: 'Deel URL-formaat',
      paragraphs: [
        'Wanneer jy op Deel in Professionele modus klik, kodeer ANQR jou huidige instellings in URL-parameters. Die formaat is:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….',
        "Hierdie parameters weerspieël die API-parameters, sodat jy 'n deel-URL na 'n API-URL kan omskakel deur die basispad van / na /api/qr te verander en w/h-parameters aan te pas soos nodig.",
        'Let wel: Oorlegbeelde wat vanaf plaaslike lêers opgelaai is, kan nie via URL gedeel word nie — slegs URL-gebaseerde oorlegsels (img-parameter) werk in gedeelde skakels en API-oproepe.',
      ],
    },
    {
      heading: 'Koerslimiete en Gebruik',
      paragraphs: [
        'Die API is gratis om te gebruik vir redelike volumes. Vir hoë-volume gebruik of kommersiële toepassings wat gewaarborgde bedryfstyd vereis, kontak ons asseblief.',
        'API-antwoorde sluit aggressiewe kas-opskrifte in. Vir die beste werkverrigting, kas antwoorde aan jou kant of gebruik dieselfde URL konsekwent vir identiese QR-kodes.',
      ],
    },
    {
      heading: 'Beste Praktyke',
      paragraphs: ['Volg hierdie riglyne vir betroubare QR-kodes:'],
      bullets: [
        'Toets altyd jou QR-kodes met verskeie skandeerder-apps voordat jy druk.',
        'Gebruik Foutkorreksie H (Hoog) wanneer oorlegsels bygevoeg word.',
        'Hou ten minste 4 modules stil sone (marge).',
        'Verseker hoë kontras tussen voorgrond en agtergrond.',
        'Vir drukwerk, gebruik ten minste 300 DPI en toets teen werklike drukgrootte.',
        'Aktiveer Bewaar Soekerpatrone wanneer oorlegsels gebruik word.',
        'Begin met laer oorlegintensiteit en verhoog dit geleidelik.',
        'Vir buiteluggebruik, oorweeg groter modulegroottes en hoër foutkorreksie.',
      ],
    },
    {
      heading: 'Probleemoplossing',
      paragraphs: ['Algemene probleme en oplossings:'],
      bullets: [
        'QR sal nie skandeer nie: Verminder oorlegintensiteit, verhoog foutkorreksie, kontroleer kontras.',
        'Kode te groot: Verminder inhoudslengte, gebruik URL-verkorter, verlaag weergawe.',
        'Vasige uitvoer: Vergroot modulegrootte, gebruik PNG in plaas van saamgeperste formate.',
        'Kleure lyk verkeerd: Kontroleer kleurkontras, probeer grysskaal-oorlegmodus.',
        'GIF animeer nie: Maak seker dat GIF-formaat-uitvoer gebruik word, kontroleer raamtelling.',
        'Beeldoorleg laai nie: Kontroleer CORS-toestemmings op afgeleë beelde.',
      ],
    },
    {
      heading: 'Sleutelbordkortpaaie',
      paragraphs: [
        'ANQR ondersteun standaard sleutelbordkortpaaie. Gebruik Ctrl/Cmd+S om uitvoer te aktiveer (wanneer op die voorskou gefokus is).',
      ],
    },
    {
      heading: 'Deel en Inbedding',
      paragraphs: [
        "In Professionele modus, klik die Deel-knoppie om 'n URL met jou huidige instellings te kopieer. Ontvangers kan hierdie URL oopmaak om jou presiese konfigurasie te sien. Let wel: Oorlegbeelde van plaaslike lêers kan nie via URL gedeel word nie.",
      ],
    },
  ],
};

export default guide;
