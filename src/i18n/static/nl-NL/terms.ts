import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Gebruiksvoorwaarden',
  description: 'Door de site te bezoeken of te gebruiken, gaat u akkoord met deze voorwaarden.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aanvaarding van de voorwaarden',
      paragraphs: [
        'Door ANQR (anqr.link) te bezoeken of te gebruiken, gaat u akkoord met deze Servicevoorwaarden en ons Privacybeleid. Als u niet akkoord gaat met deze voorwaarden, dient u de site niet te gebruiken.',
        'We kunnen deze voorwaarden van tijd tot tijd bijwerken. Door de site te blijven gebruiken na wijzigingen, accepteert u de nieuwe voorwaarden.',
      ],
    },
    {
      heading: 'Geschiktheid',
      paragraphs: [
        'Je moet minimaal 13 jaar oud zijn om ANQR te gebruiken. Door de site te gebruiken, verklaar je dat je aan deze leeftijdseis voldoet. Als je jonger bent dan 18, verklaar je dat je toestemming hebt van je ouder of voogd om de site te gebruiken.',
      ],
    },
    {
      heading: 'Toegestaan gebruik',
      paragraphs: [
        'U mag ANQR alleen voor wettige doeleinden gebruiken. U bent zelf volledig verantwoordelijk voor de inhoud die u in QR-codes codeert en voor de manier waarop u de door u gegenereerde QR-codes gebruikt.',
      ],
    },
    {
      heading: 'Verboden gedrag',
      paragraphs: ['U stemt ermee in om niet:'],
      bullets: [
        'Gebruik ANQR om QR-codes te maken die phishing, verspreiding van malware, fraude, oplichting, intimidatie, laster of andere illegale activiteiten mogelijk maken.',
        'Codeer inhoud die inbreuk maakt op intellectuele-eigendomsrechten, de privacy schendt of illegaal materiaal bevat.',
        'Poging om de werking of de beveiliging van de site te verstoren, te overbelasten of te belemmeren.',
        'Reverse engineering toepassen, decompileren of proberen de broncode van de site te extraheren.',
        'Gebruik geautomatiseerde tools (bots, scrapers) om toegang te krijgen tot de site op een manier die de prestaties voor andere gebruikers verslechtert.',
        'Omzeil of schakel beveiligings- of toegangscontrolefuncties uit.',
        'Je voordoen als een andere persoon of entiteit, of je band met een organisatie verkeerd voorstellen.',
      ],
    },
    {
      heading: 'Intellectueel eigendom',
      paragraphs: [
        'U behoudt het eigendom van de inhoud die u in QR-codes codeert. ANQR claimt geen eigendom van uw gegevens.',
        'De naam ANQR, het logo, het interfaceontwerp en de onderliggende code zijn beschermd door auteursrecht, handelsmerk en andere wetten inzake intellectueel eigendom. U mag deze niet kopiëren, wijzigen, verspreiden of er afgeleide werken van maken zonder onze toestemming.',
        'QR Code® is een geregistreerd handelsmerk van DENSO WAVE INCORPORATED. ANQR is niet gelieerd aan DENSO WAVE.',
      ],
    },
    {
      heading: 'Gebruikerslicentie voor content',
      paragraphs: [
        'Door ANQR te gebruiken, verleent u ons geen rechten op uw inhoud. Bij gebruik van lokale generatie (de standaardinstelling) vindt alle QR-codegeneratie plaats in uw browser en hebben wij geen toegang tot uw gecodeerde gegevens, slaan deze niet op en verzenden ze niet.',
        'Bij gebruik van de server-side API wordt uw inhoud verwerkt om de QR-code te genereren, maar deze wordt niet opgeslagen, geregistreerd of gebruikt voor andere doeleinden dan het weergeven van de gevraagde afbeelding.',
      ],
    },
    {
      heading: 'Diensten en reclame van derden',
      paragraphs: [
        'De site toont advertenties via Google AdSense en kan links naar websites van derden bevatten. Wij zijn niet verantwoordelijk voor de inhoud, diensten of privacypraktijken van derden.',
        'Uw interacties met adverteerders en derden vinden uitsluitend tussen u en hen plaats. Zie ons privacybeleid voor informatie over de omgang met advertentiegegevens.',
      ],
    },
    {
      heading: 'Uitsluiting van garanties',
      paragraphs: [
        "ANQR WORDT GELEVERD OP EEN 'AS IS' EN 'AS AVAILABLE' BASIS ZONDER ENIGE GARANTIES, EXPLICIET OF IMPLICIET, INCLUSIEF MAAR NIET BEPERKT TOT IMPLICIETE GARANTIES VAN VERKOOPBAARHEID, GESCHIKTHEID VOOR EEN BEPAALD DOEL EN NIET-INBREUK.",
        'Wij garanderen niet dat: (a) de site ononderbroken, veilig of foutloos zal zijn; (b) QR-codes in alle omgevingen, op alle apparaten of met alle scannerapplicaties gescand kunnen worden; (c) de site aan uw eisen zal voldoen.',
        'U moet QR-codes altijd testen onder de omstandigheden waarin ze gebruikt zullen worden (afdrukformaat, belichting, schermtype, afstand, camerakwaliteit).',
      ],
    },
    {
      heading: 'Beperking van aansprakelijkheid',
      paragraphs: [
        'VOOR ZOVER WETTELIJK TOEGESTAAN, ZIJN ANQR EN HAAR EXPLOITANTEN, GELIEERDE ONDERNEMINGEN EN LICENTIEGEVERS NIET AANSPRAKELIJK VOOR ENIGE DIRECTE, INDIRECTE, INCIDENTELE, SPECIALE, GEVOLGS-, PUNITIEVE OF EXEMPLAIRE SCHADE, WAARONDER MAAR NIET BEPERKT TOT SCHADEVERGOEDING VOOR VERLIES VAN WINST, OMZET, GEGEVENS, GOODWILL, GEBRUIK OF ANDERE IMMATERIËLE VERLIEZEN, VOORTVLOEIEND UIT OF VERBAND HOUDENDE MET UW TOEGANG TOT OF GEBRUIK VAN (OF ONVERMOGEN TOT TOEGANG TOT OF GEBRUIK VAN) DE DIENST.',
        'U begrijpt en stemt er uitdrukkelijk mee in dat uw gebruik van de dienst geheel voor uw eigen risico is. De dienst wordt gratis aangeboden en daarom stemt u ermee in dat ANQR en haar beheerders op geen enkele wijze aansprakelijk zijn voor enige schade of verlies. In geen geval zal onze totale aansprakelijkheid meer dan nul dollar (AUD) bedragen.',
        'U STEMT ERMEE IN OM AF TE ZIEN VAN ALLE CLAIMS, EISEN EN RECHTSVORDERINGEN TEGEN ANQR EN HAAR EXPLOITANTEN DIE VOORTVLOEIEN UIT UW GEBRUIK VAN DE DIENST.',
        'SOMMIGE RECHTSGEBIEDEN STAAN DE UITSLUITING VAN BEPAALDE GARANTIES OF BEPERKINGEN VAN AANSPRAKELIJKHEID NIET TOE. IN DERGELIJKE RECHTSGEBIEDEN IS ONZE AANSPRAKELIJKHEID BEPERKT TOT DE MAXIMALE MATE DIE IS TOEGESTAAN VOLGENS DE TOEPASSELIJKE WETGEVING.',
      ],
    },
    {
      heading: 'Schadeloosstelling',
      paragraphs: [
        'U stemt ermee in ANQR, haar beheerders, gelieerde ondernemingen en hun respectievelijke functionarissen, directeuren, werknemers en vertegenwoordigers te vrijwaren, te verdedigen en schadeloos te stellen voor alle claims, schade, verliezen, aansprakelijkheden, kosten en uitgaven (inclusief juridische kosten) die voortvloeien uit: (a) uw gebruik van de site; (b) uw schending van deze Voorwaarden; (c) uw schending van rechten van derden; (d) alle inhoud die u in QR-codes codeert.',
      ],
    },
    {
      heading: 'Geschillenbeslechting',
      paragraphs: [
        'Elk geschil dat voortvloeit uit deze voorwaarden of uw gebruik van ANQR zal eerst worden geprobeerd op te lossen door middel van informeel overleg door contact op te nemen met ${CONTACT_EMAIL}.',
        'Indien informele schikking niet lukt, zullen geschillen worden beslecht door bindende arbitrage in Victoria, Australië, met dien verstande dat elk van beide partijen een gerechtelijk bevel kan aanvragen voor schendingen van intellectuele eigendomsrechten.',
      ],
    },
    {
      heading: 'Afstand van collectieve rechtsvordering',
      paragraphs: [
        'VOOR ZOVER WETTELIJK TOEGESTAAN, GAAT U ERMEE AKKOORD DAT EVENTUELE GESCHILLENBESLECHTINGSPROCEDURES UITSLUITEND OP INDIVIDUELE BASIS WORDEN GEVOERD EN NIET IN EEN COLLECTIEVE, GEBUNDELDE OF VERTEGENWOORDIGENDE ACTIE.',
      ],
    },
    {
      heading: 'Toepasselijk recht',
      paragraphs: [
        'Deze voorwaarden worden beheerst door de wetten van Victoria, Australië, zonder rekening te houden met beginselen van conflicterende wetten. U stemt in met de exclusieve bevoegdheid van de rechtbanken in Victoria, Australië.',
      ],
    },
    {
      heading: 'Wijzigingen en beschikbaarheid',
      paragraphs: [
        'Wij kunnen de site (of een deel ervan) te allen tijde zonder voorafgaande kennisgeving of aansprakelijkheid wijzigen, opschorten of stopzetten.',
        "We kunnen deze voorwaarden op elk moment bijwerken. De datum 'Laatst bijgewerkt' geeft aan wanneer ze voor het laatst zijn herzien. Voortgezet gebruik na wijzigingen houdt acceptatie in.",
      ],
    },
    {
      heading: 'Scheidbaarheid',
      paragraphs: [
        'Indien een bepaling van deze Voorwaarden ongeldig of niet-afdwingbaar wordt verklaard, zal die bepaling in de maximaal mogelijke mate worden afgedwongen, en blijven de overige bepalingen volledig van kracht.',
      ],
    },
    {
      heading: 'Vrijwaring',
      paragraphs: [
        'Het feit dat wij een recht of bepaling van deze Voorwaarden niet afdwingen, mag niet worden beschouwd als een afstand van dat recht of die bepaling.',
      ],
    },
    {
      heading: 'Volledige overeenkomst',
      paragraphs: [
        'Deze voorwaarden, samen met ons privacybeleid, vormen de volledige overeenkomst tussen u en ANQR met betrekking tot uw gebruik van de site en vervangen alle voorgaande overeenkomsten.',
      ],
    },
    {
      heading: 'Overmacht',
      paragraphs: [
        'Wij zijn niet aansprakelijk voor enig falen of vertraging in de uitvoering als gevolg van omstandigheden buiten onze redelijke controle, waaronder natuurrampen, oorlog, terrorisme, rellen, overheidsmaatregelen of storingen in internet/infrastructuur.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: ['Vragen over deze voorwaarden kunt u sturen naar: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
