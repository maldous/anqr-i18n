import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Om ANQR',
  description:
    'ANQR är en gratis QR-kodgenerator med ett klientfokuserat tillvägagångssätt – generera QR-koder lokalt eller använd vårt API för inbäddning.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Vad är ANQR?',
      paragraphs: [
        'ANQR (uttalas ankare) är en gratis QR-kodgenerator som skapar skannbara koder för webbadresser, text, Wi-Fi-uppgifter, kontaktkort, kalenderhändelser och mer.',
        'Den är byggd för individer, småföretag, marknadsförare och utvecklare som vill ha kraftfulla QR-verktyg utan att registrera sig. Den klientfokuserade designen innebär att QR-koder genereras lokalt i din webbläsare som standard, med ett valfritt server-API för professionell inbäddning och integration.',
      ],
    },
    {
      heading: 'Viktiga funktioner',
      bullets: [
        'Generera QR-koder direkt i din webbläsare – inget konto krävs.',
        'Anpassa färger, modulstilar, sökmönster och lägg till bildöverlägg.',
        'Exportera i flera format: PNG, SVG, WebP och animerad GIF.',
        'Avancerade kontroller för felkorrigeringsnivå, QR-version, kodningsläge och maskval.',
        'Riktlinjer för skanningssäkerhet och förhandsgranskning i realtid för att hålla koder läsbara i tryck och på skärmar.',
        'Serversides-API för professionell inbäddning med fullständigt parameterstöd.',
        'Fungerar offline när den väl är laddad – det är en statisk webbapp som du kan köra var som helst.',
      ],
    },
    {
      heading: 'Hur ANQR fungerar',
      paragraphs: [
        'ANQR körs i din webbläsare och kodar din inmatning till en standard QR-matris med Reed-Solomon-felkorrigering, och renderar den sedan till det format du väljer.',
        'Som standard sker genereringen lokalt i din webbläsare. För professionellt bruk kan du också använda serversidans API för att generera QR-koder via URL-parametrar – perfekt för inbäddning i webbplatser, e-postmeddelanden eller automatiserade arbetsflöden.',
        'När du lägger till överlägg eller animationer balanserar ANQR stil med skanningspålitlighet så att resultatet förblir skanningsbart.',
        'ANQR fokuserar på statiska koder (data finns inuti QR-koden). Om du behöver en dynamisk kod (redigerbar destination) kan du koda din egen omdirigerings-URL eller korta länk.',
      ],
    },
    {
      heading: 'Vem driver ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklam och hur vi förblir fria',
      paragraphs: [
        'ANQR är gratis att använda och stöds av reklam. Vi kan komma att visa annonser via Google AdSense och/eller andra reklampartners.',
        'Annonsleverantörer kan använda cookies eller liknande tekniker för att anpassa annonser baserat på dina intressen och din surfaktivitet. Du kan hantera annonsinställningar i dina enhetsinställningar och via Googles annonsinställningar, och du kan läsa mer i vår integritetspolicy.',
        'Vi säljer inte innehållet du kodar in i QR-koder. Annonser hjälper till att täcka kostnaderna för att driva och förbättra projektet.',
      ],
    },
    {
      heading: 'Öppna standarder',
      paragraphs: [
        'ANQR genererar QR-koder baserade på ISO/IEC 18004-standarden och strävar efter bred kompatibilitet mellan skannrar, kameror och utskriftsarbetsflöden.',
      ],
    },
    {
      heading: 'Varumärkesmeddelande',
      paragraphs: [
        'QR Code® är ett registrerat varumärke som tillhör DENSO WAVE INCORPORATED. ANQR är inte anslutet till, godkänt av eller sponsrat av DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Feedback och bidrag',
      paragraphs: [
        'Vi välkomnar feedback, felrapporter och förslag på funktioner. Kontakta oss via e-post eller kontaktsidan – vi läser alla meddelanden, men svarstiderna kan variera.',
      ],
    },
  ],
};

export default about;
