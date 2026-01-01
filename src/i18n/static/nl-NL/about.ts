import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Over ANQR',
  description: 'ANQR is een gratis QR-codegenerator met een klantgerichte aanpak: genereer QR-codes lokaal of gebruik onze API om ze in te sluiten.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Wat is ANQR?',
      paragraphs: ['ANQR (uitgesproken als \'anker\') is een gratis QR-codegenerator waarmee scanbare codes kunnen worden gemaakt voor URL\'s, tekst, wifi-gegevens, contactkaarten, agenda-items en meer.', 'Het is ontwikkeld voor particulieren, kleine bedrijven, marketeers en ontwikkelaars die krachtige QR-tools willen gebruiken zonder zich te hoeven registreren. Dankzij het klantgerichte ontwerp worden QR-codes standaard lokaal in uw browser gegenereerd, met een optionele server-API voor professionele integratie en inbedding.'],
    },
    {
      heading: 'Belangrijkste kenmerken',
      bullets: ['Genereer direct QR-codes in uw browser — geen account vereist.', 'Pas kleuren, modulestijlen en zoekpatronen aan en voeg afbeeldingsoverlays toe.', 'Exporteren in meerdere formaten: PNG, SVG, WebP en geanimeerde GIF.', 'Geavanceerde instellingen voor foutcorrectieniveau, QR-versie, coderingsmodus en maskerselectie.', 'Richtlijnen voor scanveiligheid en live preview om codes leesbaar te houden in gedrukte vorm en op schermen.', 'Server-side API voor professionele integratie met volledige parameterondersteuning.', 'Werkt offline zodra geladen — het is een statische webapplicatie die je overal kunt uitvoeren.'],
    },
    {
      heading: 'Hoe ANQR werkt',
      paragraphs: ['ANQR draait in uw browser en codeert uw invoer in een standaard QR-matrix met Reed-Solomon-foutcorrectie, waarna het deze weergeeft in het door u gekozen formaat.', 'Standaard vindt de generatie lokaal in uw browser plaats. Voor professioneel gebruik kunt u ook de server-side API gebruiken om QR-codes te genereren via URL-parameters – perfect voor integratie in websites, e-mails of geautomatiseerde workflows.', 'Wanneer je overlays of animaties toevoegt, zorgt ANQR voor een balans tussen stijl en scanbetrouwbaarheid, zodat het resultaat scanbaar blijft.', 'ANQR richt zich op statische codes (de gegevens bevinden zich in de QR-code). Als u een dynamische code nodig hebt (bewerkbare bestemming), kunt u uw eigen redirect-URL of verkorte link coderen.'],
    },
    {
      heading: 'Wie beheert ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reclame en hoe we vrij blijven',
      paragraphs: ['ANQR is gratis te gebruiken en wordt ondersteund door advertenties. We kunnen advertenties weergeven via Google AdSense en/of andere advertentiepartners.', 'Advertentieaanbieders kunnen cookies of vergelijkbare technologieën gebruiken om advertenties te personaliseren op basis van uw interesses en browsegedrag. U kunt uw advertentievoorkeuren beheren in de instellingen van uw apparaat en via de advertentie-instellingen van Google. Lees meer in ons privacybeleid.', 'Wij verkopen de inhoud die u in QR-codes codeert niet. Advertenties helpen de kosten van het runnen en verbeteren van het project te dekken.'],
    },
    {
      heading: 'Open standaarden',
      paragraphs: ['ANQR genereert QR-codes op basis van de ISO/IEC 18004-standaard en streeft naar brede compatibiliteit met scanners, camera\'s en printworkflows.'],
    },
    {
      heading: 'Handelsmerkvermelding',
      paragraphs: ['QR Code® is een geregistreerd handelsmerk van DENSO WAVE INCORPORATED. ANQR is niet gelieerd aan, onderschreven door of gesponsord door DENSO WAVE INCORPORATED.'],
    },
    {
      heading: 'Feedback en bijdragen',
      paragraphs: ['We stellen feedback, bugrapporten en suggesties voor nieuwe functies zeer op prijs. Neem contact met ons op via e-mail of de contactpagina – we lezen elk bericht, maar de reactietijd kan variëren.'],
    },
  ],
};

export default about;
