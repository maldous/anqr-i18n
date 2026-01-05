import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Over ANQR',
  description:
    'ANQR is een gratis QR code generator met een client-first benadering - genereren QR codes lokaal of gebruik onze API voor inbedding.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: 'Wat is ANQR?',
      paragraphs: [
        'ANQR (uitgesproken als "anker") is een gratis QR code generator die scannable codes maakt voor URL\'s, tekst, Wi-Fi referenties, contactkaarten, agenda evenementen, en meer.',
        'Het is gebouwd voor particulieren, kleine bedrijven, marketeers en ontwikkelaars die krachtige QR-tools willen zonder zich aan te melden. Het client-first ontwerp betekent dat QR-codes standaard lokaal worden gegenereerd in uw browser, met een optionele server API voor professionele inbedding en integratie.',
      ],
    },
    {
      heading: 'Belangrijkste kenmerken',
      bullets: [
        'Genereer QR codes direct in uw browser - geen account nodig.',
        'Pas kleuren, modulestijlen, zoekpatronen aan en voeg afbeeldingen toe.',
        'Exporteren in meerdere formaten: PNG, SVG, WebP en geanimeerde GIF.',
        'Geavanceerde controles voor foutcorrectie niveau, QR-versie, codering modus, en masker selectie.',
        'Scan-veiligheid begeleiding en live preview om codes leesbaar te houden in afdruk en op schermen.',
        'Server-side API voor professionele inbedding met volledige parameter ondersteuning.',
        'Werkt offline eenmaal geladen - het is een statische webapp die je overal kunt draaien.',
      ],
    },
    {
      heading: 'Hoe werkt ANQR?',
      paragraphs: [
        'ANQR draait in uw browser en codeert uw invoer in een standaard QR matrix met Reed',
        'Standaard gebeurt generatie lokaal in uw browser. Voor professioneel gebruik kunt u ook de server-side API gebruiken om QR-codes te genereren via URL-parameters - perfect voor inbedding in websites, e-mails of geautomatiseerde workflows.',
        'Wanneer u overlays of animaties toevoegt, balanceert ANQR styling met scan betrouwbaarheid zodat het resultaat scannable blijft.',
        'ANQR richt zich op statische codes (de gegevens zitten in de QR). Als u een dynamische code (bewerkbare bestemming) nodig hebt, kunt u uw eigen redirect URL of korte link coderen.',
      ],
    },
    {
      heading: 'Wie beheert ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reclame en hoe we vrij blijven',
      paragraphs: [
        'ANQR is vrij te gebruiken en wordt ondersteund door reclame. We kunnen advertenties tonen via Google AdSense en/of andere advertentiepartners.',
        'Ad providers kunnen cookies of soortgelijke technologieën gebruiken om advertenties te personaliseren op basis van uw interesses en surfactiviteit. U kunt advertentievoorkeuren beheren in uw apparaatinstellingen en via Google-advertentieinstellingen, en meer te weten komen in ons Privacybeleid.',
        'Wij verkopen de inhoud die u codeert niet in QR-codes. Ads helpen de kosten van het uitvoeren en verbeteren van het project te dekken.',
      ],
    },
    {
      heading: 'Open standaarden',
      paragraphs: [
        "ANQR genereert QR-codes op basis van de ISO/IEC 18004-norm en streeft naar brede compatibiliteit tussen scanners, camera's en printworkflows.",
      ],
    },
    {
      heading: 'Kennisgeving merk',
      paragraphs: [
        'QR Code® is een geregistreerd handelsmerk van DENSO WAVE geïncorporeerd. ANQR is niet aangesloten bij, bekrachtigd door of gesponsord door DENSO WAVE GEINCORPOREERD.',
      ],
    },
    {
      heading: 'Feedback en bijdragen',
      paragraphs: [
        'We verwelkomen feedback, bugrapporten en feature suggesties. Neem contact op via e-mail of de contactpagina - we lezen elk bericht, hoewel de reactietijden kunnen variëren.',
      ],
    },
  ],
};

export default about;
