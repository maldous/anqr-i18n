import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontakta oss',
  description:
    'Vi välkomnar feedback, felrapporter, funktionsförfrågningar och allmänna förfrågningar.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Hur du når oss',
      paragraphs: [
        'Vi erbjuder flera sätt att kontakta oss beroende på dina behov. Vi läser varje meddelande, men svarstiderna kan variera beroende på volym och typ av förfrågan.',
      ],
    },
    {
      heading: 'E-post',
      paragraphs: [
        'För alla förfrågningar: ${CONTACT_EMAIL}',
        'Detta är det mest pålitliga sättet att nå oss och rekommenderas för detaljerade frågor, affärsförfrågningar eller andra förfrågningar.',
      ],
    },
    {
      heading: 'Typer av förfrågningar',
      bullets: [
        'Allmänna frågor: Frågor om hur man använder ANQR, förklaringar av funktioner eller allmän feedback.',
        'Buggrapporter: Vänligen inkludera din webbläsare, ditt operativsystem, steg för att reproducera och eventuella felmeddelanden du ser.',
        'Funktionsförfrågningar: Förslag på nya funktioner eller förbättringar. Vi beaktar alla förfrågningar men kan inte lova implementering.',
        'Förfrågningar om affärsverksamhet: Möjligheter till partnerskap, licensfrågor eller förfrågningar om kommersiell användning.',
        'Integritetsbegäranden: Begäranden om att utöva dina rättigheter gällande integritet enligt GDPR, CCPA eller andra integritetslagar (se integritetspolicyn).',
        'DMCA/Upphovsrätt: Se DMCA-avsnittet nedan för krav för meddelande om borttagning.',
      ],
    },
    {
      heading: 'Svarstider',
      paragraphs: [
        'Vi strävar efter att svara på förfrågningar inom 5–7 arbetsdagar. Integritetsrelaterade förfrågningar kommer att behandlas inom 30 dagar i enlighet med lagkrav.',
        'Under högtrafik kan svarstiderna vara längre. För brådskande ärenden, vänligen ange BRÅDSKANDE i ämnesraden.',
      ],
    },
    {
      heading: 'Innan du kontaktar oss',
      paragraphs: [
        'Se vår dokumentationssida för svar på vanliga frågor om hur man använder ANQR-funktioner. Många frågor om generering, formatering och exportalternativ för QR-koder täcks där.',
      ],
    },
    {
      heading: 'DMCA-upphovsrättsmeddelanden',
      paragraphs: [
        'Om du anser att innehåll som är tillgängligt på ANQR gör intrång i din upphovsrätt kan du skicka in en anmälan om borttagning enligt Digital Millennium Copyright Act (DMCA). För att vara giltig måste din anmälan innehålla:',
      ],
      bullets: [
        'En fysisk eller elektronisk signatur från upphovsrättsinnehavaren eller en auktoriserad representant.',
        'Identifiering av det upphovsrättsskyddade verk som påstås ha blivit intrång.',
        'Identifiering av det material som påstås göra intrång, med tillräcklig information för att lokalisera det.',
        'Din kontaktinformation (adress, telefonnummer och e-postadress).',
        'Ett uttalande om att du i god tro anser att användningen av materialet inte är godkänd av upphovsrättsinnehavaren.',
        'En försäkran, under ed, om att informationen i ditt meddelande är korrekt och att du är upphovsrättsinnehavare eller har rätt att agera för deras räkning.',
      ],
    },
    {
      heading: 'DMCA-kontakt',
      paragraphs: [
        'Skicka DMCA-meddelanden till: ${CONTACT_EMAIL}',
        'Vänligen ange DMCA-meddelande i ämnesraden. Vi kommer att svara på giltiga meddelanden i enlighet med gällande lag. Observera att ANQR genererar QR-koder lokalt på användarnas enheter och inte innehåller användargenererat innehåll.',
      ],
    },
  ],
};

export default contact;
