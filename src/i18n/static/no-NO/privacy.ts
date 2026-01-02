import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: '«Personvernerklæring»',
  description:
    '«Informasjon ANQR samler inn, hvordan den brukes og dine rettigheter i henhold til gjeldende personvernlover.»',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '«Sammendrag»',
      paragraphs: [
        '«ANQR er en QR-kodegenerator med en klientfokusert tilnærming. Vi krever ikke at du oppretter en konto. Som standard genereres QR-koder lokalt i nettleseren din – vi har ikke tilgang til innholdet du koder.»',
        '«For profesjonell bruk tilbyr ANQR et serverside-API som genererer QR-koder fra URL-parametere. Når du bruker API-et, behandles QR-innholdet ditt på serverne våre for å gjengi bildet, men det lagres eller logges ikke.»',
        '«Vi bruker Google AdSense til annonsering og kan bruke analysetjenester. Disse tjenestene samler inn informasjon gjennom informasjonskapsler og lignende teknologier. Denne policyen forklarer hvilke data som samles inn, hvordan de brukes og dine rettigheter.»',
      ],
    },
    {
      heading: '«Informasjon vi samler inn»',
      bullets: [
        '«Informasjon du oppgir: Hvis du kontakter oss via e-post eller kontaktskjemaet vårt, samler vi inn navnet ditt, e-postadressen din og meldingsinnholdet ditt.»',
        '«Automatisk innsamlet informasjon: Vår hostingleverandør (Netlify), annonsepartnere og analysetjenester kan samle inn: IP-adresse, nettlesertype og -versjon, operativsystem, enhetstype, henvisende URL, besøkte sider, tid på nettstedet og omtrentlig geografisk plassering.»',
        '«Informasjonskapsler fra tredjeparter: Våre annonsepartnere (Google AdSense) bruker informasjonskapsler og lignende teknologier for å vise og måle annonser. ANQR setter ikke noen informasjonskapsler fra førsteparter.»',
      ],
    },
    {
      heading: '«Informasjonskapsler og tredjepartsteknologier»',
      paragraphs: [
        '«ANQR setter ingen førsteparts informasjonskapsler. Dine preferanser (som mørk modus) lagres lokalt på enheten din, og overføres ikke til noen server.»',
        '«Imidlertid kan våre annonsepartnere (Google AdSense) og hostingleverandør bruke informasjonskapsler og lignende sporingsteknologier:»',
      ],
      bullets: [
        '«Annonseinformasjonskapsler (tredjepart): Angitt av Google AdSense og annonsepartnere for å vise relevante annonser, måle annonseytelse og forstå brukerinteresser. Disse informasjonskapslene kan spore aktiviteten din på tvers av forskjellige nettsteder.»',
        '«Analyseinformasjonskapsler (tredjepart): Kan brukes av vår hostingleverandør eller analysetjenester til å samle inn anonymiserte bruksdata.»',
      ],
    },
    {
      heading: '«Google AdSense og annonsering»',
      paragraphs: [
        '«Vi viser annonser via Google AdSense. Google og partnerne bruker informasjonskapsler for å vise annonser basert på nettleserloggen din på dette nettstedet og andre nettsteder (interessebasert annonsering).»',
        '«Finn ut hvordan Google bruker informasjonen din: https://policies.google.com/technologies/partner-sites»',
        '«Administrer annonsetilpasning: https://adssettings.google.com»',
        '«Velg bort via Network Advertising Initiative: https://optout.networkadvertising.org»',
        '«Meld deg bort via Digital Advertising Alliance: https://optout.aboutads.info»',
      ],
    },
    {
      heading: '«Hvordan vi bruker informasjon»',
      bullets: [
        '«For å svare på dine henvendelser og gi støtte.»',
        '«For å vise relevante annonser gjennom våre annonsepartnere.»',
        '«For å analysere bruken av nettstedet og forbedre tjenestene våre.»',
        '«For å oppdage, forebygge og håndtere svindel, misbruk og sikkerhetsproblemer.»',
        '«For å overholde juridiske forpliktelser.»',
      ],
    },
    {
      heading: '«Tredjepartstjenester»',
      bullets: [
        '«Google AdSense: Mottar data for å vise og måle annonser.»',
        '«Analyseleverandører: Motta anonymiserte bruksdata.»',
        '«Netlify (hosting): Behandler forespørsler og kan logge IP-adresser.»',
        '«Vi selger ikke din personlige informasjon. Deling av data med annonsepartnere kan imidlertid anses som et «salg» i henhold til CCPA (se nedenfor).»',
      ],
    },
    {
      heading: '«Datalagring»',
      bullets: [
        '«Kontaktinnsendinger: Opptil 2 år.»',
        '«Serverlogger: Opptil 30 dager (hostingleverandør).»',
        '«Analysedata: Opptil 26 måneder (anonymisert).»',
        '«Annonseinformasjonskapsler: Vanligvis 13 måneder (varierer fra partner til partner).»',
      ],
    },
    {
      heading: '«Dine rettigheter i henhold til GDPR (EØS-brukere)»',
      paragraphs: [
        '«Hvis du befinner deg i EØS-området, har du følgende rettigheter i henhold til personvernforordningen:»',
      ],
      bullets: [
        '«Rett til innsyn: Be om en kopi av personopplysninger vi har om deg.»',
        '«Rett til retting: Be om retting av unøyaktige data.»',
        '«Rett til sletting: Be om sletting av dataene dine («retten til å bli glemt»).»',
        '«Rett til å begrense behandlingen: Be om begrensninger på hvordan vi bruker dataene dine.»',
        '«Rett til dataportabilitet: Be om å få dataene dine i et portabelt format.»',
        '«Rett til å protestere: Protestere mot behandling, inkludert for direkte markedsføring.»',
        '«Rett til å trekke tilbake samtykke: Trekk tilbake samtykke når som helst der behandlingen er basert på samtykke.»',
        '«Rett til å sende inn en klage: Send inn en klage til din databeskyttelsesmyndighet.»',
      ],
    },
    {
      heading: '«GDPR-rettslig grunnlag»',
      paragraphs: [
        '«Vi behandler data på disse grunnlagene: (a) Samtykke – for personlig tilpasset annonsering (administrert av våre annonseringspartnere); (b) Legitime interesser – for analyse, sikkerhet og forbedring; (c) Avtale – for å svare på henvendelser.»',
        '«For å utøve dine rettigheter, kontakt ${CONTACT_EMAIL}. Vi svarer innen 30 dager.»',
      ],
    },
    {
      heading: '«Dine rettigheter i henhold til CCPA (brukere i California)»',
      bullets: [
        '«Rett til å vite: Be om informasjon om innsamlede data, kilder, formål og tredjeparter.»',
        '«Rett til sletting: Be om sletting av dine personopplysninger.»',
        '«Rett til å reservere seg mot «salg» av personopplysninger (deling med annonsepartnere kan kvalifisere).»',
        '«Rett til ikke-diskriminering: Vi vil ikke diskriminere for å utøve dine rettigheter.»',
      ],
    },
    {
      heading: '«CCPA-kategorier samlet inn»',
      paragraphs: [
        '«Kategorier: Identifikatorer (IP-adresse, enhets-ID), internettaktivitet (surfing, annonseinteraksjoner), geolokalisering (omtrentlig), slutninger (interesser fra surfing).»',
        '«For å utøve rettigheter eller reservere deg mot dette: ${CONTACT_EMAIL} eller juster innstillingene for informasjonskapsler.»',
      ],
    },
    {
      heading: '«Internasjonale overføringer»',
      paragraphs: [
        '«Informasjonen din kan bli overført til land med andre personvernlover, inkludert USA. Vi bruker passende sikkerhetstiltak, som standard kontraktsklausuler.»',
      ],
    },
    {
      heading: '«Barns personvern»',
      paragraphs: [
        '«ANQR er ikke rettet mot barn under 13 år (eller 16 år i EØS). Vi samler ikke bevisst inn data fra barn. Kontakt ${CONTACT_EMAIL} hvis du mener at et barn har gitt informasjon.»',
      ],
    },
    {
      heading: '«Sikkerhet»',
      paragraphs: [
        '«Vi bruker passende tekniske og organisatoriske tiltak for å beskytte data, inkludert HTTPS-kryptering. Ingen internettoverføring er imidlertid 100 % sikker.»',
      ],
    },
    {
      heading: '«Ikke spor»',
      paragraphs: [
        '«Vi respekterer nettlesersignaler fra «Do Not Track» der det er mulig, selv om annonsepartnere kanskje ikke svarer på DNT.»',
      ],
    },
    {
      heading: '«Endringer i denne policyen»',
      paragraphs: [
        '«Vi kan oppdatere denne policyen med jevne mellomrom. Datoen «Sist oppdatert» indikerer den nyeste revisjonen. Vesentlige endringer kan kommuniseres via et nettstedsbanner.»',
      ],
    },
    {
      heading: '«Kontakt oss»',
      paragraphs: [
        '«For spørsmål om personvern eller for å utøve dine rettigheter: ${CONTACT_EMAIL} eller bruk vår kontaktside. Vi svarer på forespørsler om personvern innen 30 dager.»',
      ],
    },
  ],
};

export default privacy;
