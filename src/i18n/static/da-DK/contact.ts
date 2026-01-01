import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontakt os',
  description: 'Vi modtager gerne feedback, fejlrapporter, funktionsanmodninger og generelle forespørgsler.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Sådan kontakter du os',
      paragraphs: ['Vi tilbyder flere måder at kontakte os på afhængigt af dine behov. Vi læser alle beskeder, selvom svartiderne kan variere afhængigt af mængde og forespørgselstype.'],
    },
    {
      heading: 'E-mail',
      paragraphs: ['For alle henvendelser: ${CONTACT_EMAIL}', 'Dette er den mest pålidelige måde at kontakte os på, og det anbefales til detaljerede spørgsmål, forretningsforespørgsler eller andre forespørgsler.'],
    },
    {
      heading: 'Typer af forespørgsler',
      bullets: ['Generelle spørgsmål: Spørgsmål om, hvordan man bruger ANQR, forklaringer af funktioner eller generel feedback.', 'Fejlrapporter: Inkluder venligst din browser, dit operativsystem, trin til at reproducere og eventuelle fejlmeddelelser, du ser.', 'Funktionsanmodninger: Forslag til nye funktioner eller forbedringer. Vi overvejer alle anmodninger, men vi kan ikke love implementering.', 'Forretningsforespørgsler: Partnerskabsmuligheder, licensspørgsmål eller forespørgsler om kommerciel brug.', 'Anmodninger om beskyttelse af personlige oplysninger: Anmodninger om at udøve dine rettigheder vedrørende beskyttelse af personlige oplysninger i henhold til GDPR, CCPA eller andre love om beskyttelse af personlige oplysninger (se Privatlivspolitik).', 'DMCA/Ophavsret: Se DMCA-afsnittet nedenfor for krav til meddelelser om fjernelse.'],
    },
    {
      heading: 'Responstider',
      paragraphs: ['Vi bestræber os på at besvare forespørgsler inden for 5-7 hverdage. Forespørgsler vedrørende privatlivets fred vil blive behandlet inden for 30 dage som krævet ved lov.', 'I travle perioder kan svartiderne være længere. Ved hastende sager bedes du angive HASTER i emnelinjen.'],
    },
    {
      heading: 'Før du kontakter os',
      paragraphs: ['Se venligst vores dokumentationsside for at få svar på almindelige spørgsmål om, hvordan du bruger ANQR-funktioner. Mange spørgsmål om generering af QR-koder, styling og eksportmuligheder er dækket der.'],
    },
    {
      heading: 'DMCA-ophavsretsmeddelelser',
      paragraphs: ['Hvis du mener, at indhold, der er tilgængeligt på ANQR, krænker din ophavsret, kan du indsende en meddelelse om fjernelse i henhold til Digital Millennium Copyright Act (DMCA). For at være gyldig skal din meddelelse indeholde:'],
      bullets: ['En fysisk eller elektronisk underskrift fra ophavsretsindehaveren eller en bemyndiget repræsentant.', 'Identifikation af det ophavsretligt beskyttede værk, der hævdes at være krænket.', 'Identifikation af det materiale, der hævdes at krænke ophavsretten, med oplysninger, der er tilstrækkelige til at lokalisere det.', 'Dine kontaktoplysninger (adresse, telefonnummer og e-mailadresse).', 'En erklæring om, at du i god tro mener, at brugen af materialet ikke er godkendt af indehaveren af ophavsretten.', 'En erklæring, under straf for mened, om at oplysningerne i din meddelelse er nøjagtige, og at du er indehaver af ophavsretten eller har bemyndigelse til at handle på deres vegne.'],
    },
    {
      heading: 'DMCA-kontakt',
      paragraphs: ['Send DMCA-meddelelser til: ${CONTACT_EMAIL}', 'Angiv venligst DMCA-meddelelse i emnelinjen. Vi vil svare på gyldige meddelelser i overensstemmelse med gældende lov. Bemærk, at ANQR genererer QR-koder lokalt på brugernes enheder og ikke hoster brugergenereret indhold.'],
    },
  ],
};

export default contact;
