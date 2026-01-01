import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '"Privacybeleid”',
  description: '"Informatie die ANQR verzamelt, hoe deze wordt gebruikt en uw rechten onder de toepasselijke privacywetgeving.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Samenvatting”',
      paragraphs: [
        '"ANQR is een QR-codegenerator met een klantgerichte aanpak. U hoeft geen account aan te maken. Standaard worden QR-codes lokaal in uw browser gegenereerd – wij hebben geen toegang tot de inhoud die u codeert.”',
        '"Voor professioneel gebruik biedt ANQR een server-side API die QR-codes genereert op basis van URL-parameters. Bij gebruik van de API wordt uw QR-inhoud op onze servers verwerkt om de afbeelding weer te geven, maar deze wordt niet opgeslagen of geregistreerd.”',
        '"We gebruiken Google AdSense voor advertenties en mogelijk ook analyseservices. Deze services verzamelen informatie via cookies en vergelijkbare technologieën. Dit beleid legt uit welke gegevens worden verzameld, hoe ze worden gebruikt en wat uw rechten zijn.”',
      ],
    },
    {
      heading: '"Informatie die we verzamelen”',
      bullets: [
        '"Informatie die u verstrekt: Als u contact met ons opneemt via e-mail of ons contactformulier, verzamelen we uw naam, e-mailadres en de inhoud van uw bericht.”',
        '"Automatisch verzamelde informatie: Onze hostingprovider (Netlify), advertentiepartners en analysediensten kunnen de volgende gegevens verzamelen: IP-adres, browsertype en -versie, besturingssysteem, apparaattype, verwijzende URL, bezochte pagina\'s, tijd doorgebracht op de site en geschatte geografische locatie.”',
        '"Cookies van derden: Onze advertentiepartners (Google AdSense) gebruiken cookies en soortgelijke technologieën om advertenties weer te geven en te meten. ANQR zelf plaatst geen eigen cookies.”',
      ],
    },
    {
      heading: '"Cookies en technologieën van derden”',
      paragraphs: [
        '"ANQR plaatst geen eigen cookies. Uw voorkeuren (zoals de donkere modus) worden lokaal op uw apparaat opgeslagen en niet naar een server verzonden.”',
        '"Onze advertentiepartners (Google AdSense) en hostingprovider kunnen echter cookies en soortgelijke trackingtechnologieën gebruiken:”',
      ],
      bullets: [
        '"Advertentiecookies (van derden): Deze worden geplaatst door Google AdSense en advertentiepartners om relevante advertenties weer te geven, de advertentieprestaties te meten en de interesses van gebruikers te begrijpen. Deze cookies kunnen uw activiteit op verschillende websites volgen.”',
        '"Analytische cookies (van derden): Deze kunnen door onze hostingprovider of analysediensten worden gebruikt om geanonimiseerde gebruiksgegevens te verzamelen.”',
      ],
    },
    {
      heading: '"Google AdSense en advertenties”',
      paragraphs: [
        '"Wij tonen advertenties via Google AdSense. Google en zijn partners gebruiken cookies om advertenties weer te geven op basis van uw browsegeschiedenis op deze site en andere websites (advertenties op basis van interesses).”',
        '"Lees hoe Google uw gegevens gebruikt: https://policies.google.com/technologies/partner-sites”',
        '"Advertentiepersonalisatie beheren: https://adssettings.google.com”',
        '"Afmelden via Network Advertising Initiative: https://optout.networkadvertising.org”',
        '"Afmelden via de Digital Advertising Alliance: https://optout.aboutads.info”',
      ],
    },
    {
      heading: '"Hoe we informatie gebruiken”',
      bullets: [
        '"Om uw vragen te beantwoorden en ondersteuning te bieden.”',
        '"Om relevante advertenties weer te geven via onze advertentiepartners.”',
        '"Om het sitegebruik te analyseren en onze diensten te verbeteren.”',
        '"Om fraude, misbruik en veiligheidsproblemen op te sporen, te voorkomen en aan te pakken.”',
        '"Om te voldoen aan wettelijke verplichtingen.”',
      ],
    },
    {
      heading: '"Diensten van derden”',
      bullets: [
        '"Google AdSense: Ontvangt gegevens om advertenties weer te geven en te meten.”',
        '"Analytische aanbieders: ontvang geanonimiseerde gebruiksgegevens.”',
        '"Netlify (hosting): Verwerkt verzoeken en kan IP-adressen registreren.”',
        '"Wij verkopen uw persoonlijke gegevens niet. Het delen van gegevens met advertentiepartners kan echter worden beschouwd als een ‘verkoop’ onder de CCPA (zie hieronder).”',
      ],
    },
    {
      heading: '"Gegevensbewaring”',
      bullets: [
        '"Contactgegevens worden tot 2 jaar bewaard.”',
        '"Serverlogboeken: maximaal 30 dagen (hostingprovider).”',
        '"Analytische gegevens: tot 26 maanden (geanonimiseerd).”',
        '"Advertentiecookies: Meestal 13 maanden (kan per partner verschillen).”',
      ],
    },
    {
      heading: '"Uw rechten onder de AVG (gebruikers in de EER)”',
      paragraphs: [
        '"Als u zich in de Europese Economische Ruimte bevindt, hebt u de volgende rechten op grond van de Algemene Verordening Gegevensbescherming:”',
      ],
      bullets: [
        '"Recht op inzage: Vraag een kopie op van de persoonsgegevens die wij over u bewaren.”',
        '"Recht op rectificatie: Verzoek om correctie van onjuiste gegevens.”',
        '"Recht op verwijdering: Verzoek om verwijdering van uw gegevens ("recht om vergeten te worden”).”',
        '"Recht op beperking van de verwerking: verzoek om beperkingen op te leggen aan hoe wij uw gegevens gebruiken.”',
        '"Recht op dataportabiliteit: Vraag uw gegevens aan in een draagbaar formaat.”',
        '"Recht om bezwaar te maken: Bezwaar maken tegen verwerking, ook voor direct marketing.”',
        '"Recht om toestemming in te trekken: Trek uw toestemming te allen tijde in wanneer de verwerking op toestemming is gebaseerd.”',
        '"Recht om een klacht in te dienen: Dien een klacht in bij uw gegevensbeschermingsautoriteit.”',
      ],
    },
    {
      heading: '"Juridische basis van de AVG”',
      paragraphs: [
        '"Wij verwerken gegevens op de volgende gronden: (a) Toestemming – voor gepersonaliseerde reclame (beheerd door onze reclamepartners); (b) Legitieme belangen – voor analyses, beveiliging en verbetering; (c) Overeenkomst – om vragen te beantwoorden.”',
        '"Om uw rechten uit te oefenen, kunt u contact opnemen met ${CONTACT_EMAIL}. Wij reageren binnen 30 dagen.”',
      ],
    },
    {
      heading: '"Uw rechten onder de CCPA (gebruikers in Californië)”',
      bullets: [
        '"Recht op inzage: Vraag informatie op over verzamelde gegevens, bronnen, doeleinden en derden.”',
        '"Recht op verwijdering: Verzoek om verwijdering van uw persoonlijke gegevens.”',
        '"Recht om je af te melden: Meld je af voor de ‘verkoop’ van persoonlijke informatie (delen met advertentiepartners kan hier wel onder vallen).”',
        '"Recht op non-discriminatie: Wij zullen u niet discrimineren vanwege het uitoefenen van uw rechten.”',
      ],
    },
    {
      heading: '"CCPA-categorieën verzameld”',
      paragraphs: [
        '"Categorieën: Identificatiegegevens (IP-adres, apparaat-ID), internetactiviteit (browsen, interacties met advertenties), geolocatie (bij benadering), afleidingen (interesses uit browsen).”',
        '"Om uw rechten uit te oefenen of u af te melden: ${CONTACT_EMAIL} of pas uw cookie-instellingen aan.”',
      ],
    },
    {
      heading: '"Internationale overdrachten”',
      paragraphs: [
        '"Uw gegevens kunnen worden overgedragen naar landen met andere wetgeving inzake gegevensbescherming, waaronder de Verenigde Staten. We gebruiken passende waarborgen, zoals standaardcontractbepalingen.”',
      ],
    },
    {
      heading: '"De privacy van kinderen”',
      paragraphs: [
        '"ANQR is niet gericht op kinderen jonger dan 13 (of 16 in de EER). We verzamelen niet bewust gegevens van kinderen. Neem contact op met ${CONTACT_EMAIL} als u denkt dat een kind informatie heeft verstrekt.”',
      ],
    },
    {
      heading: '"Beveiliging”',
      paragraphs: [
        '"We gebruiken passende technische en organisatorische maatregelen om gegevens te beschermen, waaronder HTTPS-versleuteling. Geen enkele internettransmissie is echter 100% veilig.”',
      ],
    },
    {
      heading: '"Niet volgen”',
      paragraphs: [
        '"We respecteren \'Do Not Track\'-browsersignalen waar mogelijk, hoewel advertentiepartners mogelijk niet op DNT reageren.”',
      ],
    },
    {
      heading: '"Wijzigingen in dit beleid”',
      paragraphs: [
        '"We kunnen dit beleid periodiek bijwerken. De datum \'Laatst bijgewerkt\' geeft de meest recente herziening aan. Belangrijke wijzigingen kunnen via een banner op de website worden gecommuniceerd.”',
      ],
    },
    {
      heading: '"Neem contact met ons op”',
      paragraphs: [
        '"Voor vragen over privacy of om uw rechten uit te oefenen: ${CONTACT_EMAIL} of gebruik onze contactpagina. Wij reageren binnen 30 dagen op privacyverzoeken.”',
      ],
    },
  ],
}

export default privacy;
