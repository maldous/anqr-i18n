import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Privatlivspolitik',
  description: 'Oplysninger som ANQR indsamler, hvordan de bruges, og dine rettigheder i henhold til gældende privatlivslovgivning.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Resumé',
      paragraphs: ['ANQR er en QR-kodegenerator med en klientfokuseret tilgang. Vi kræver ikke, at du opretter en konto. Som standard genereres QR-koder lokalt i din browser – vi har ikke adgang til det indhold, du koder.', 'Til professionel brug leverer ANQR en server-side API, der genererer QR-koder fra URL-parametre. Når du bruger API\'en, behandles dit QR-indhold på vores servere for at gengive billedet, men det gemmes eller logges ikke.', 'Vi bruger Google AdSense til annoncering og kan bruge analysetjenester. Disse tjenester indsamler oplysninger via cookies og lignende teknologier. Denne politik forklarer, hvilke data der indsamles, hvordan de bruges, og dine rettigheder.'],
    },
    {
      heading: 'Oplysninger vi indsamler',
      bullets: ['Oplysninger, du giver: Hvis du kontakter os via e-mail eller vores kontaktformular, indsamler vi dit navn, din e-mailadresse og dit beskedindhold.', 'Automatisk indsamlede oplysninger: Vores hostingudbyder (Netlify), reklamepartnere og analysetjenester kan indsamle: IP-adresse, browsertype og -version, operativsystem, enhedstype, henvisende URL, besøgte sider, tid på webstedet og omtrentlig geografisk placering.', 'Tredjepartscookies: Vores reklamepartnere (Google AdSense) bruger cookies og lignende teknologier til at vise og måle annoncer. ANQR sætter ikke selv nogen førstepartscookies.'],
    },
    {
      heading: 'Cookies og tredjepartsteknologier',
      paragraphs: ['ANQR sætter ingen førstepartscookies. Dine præferencer (f.eks. mørk tilstand) gemmes lokalt på din enhed, som ikke overføres til nogen server.', 'Vores reklamepartnere (Google AdSense) og hostingudbyder kan dog bruge cookies og lignende sporingsteknologier:'],
      bullets: ['Annoncecookies (tredjepart): Indstillet af Google AdSense og annonceringspartnere for at vise relevante annoncer, måle annoncers effektivitet og forstå brugerinteresser. Disse cookies kan spore din aktivitet på tværs af forskellige websteder.', 'Analytiske cookies (tredjepart): Kan bruges af vores hostingudbyder eller analysetjenester til at indsamle anonymiserede brugsdata.'],
    },
    {
      heading: 'Google AdSense og annoncering',
      paragraphs: ['Vi viser annoncer via Google AdSense. Google og dets partnere bruger cookies til at vise annoncer baseret på din browserhistorik på dette websted og andre websteder (interessebaseret annoncering).', 'Lær hvordan Google bruger dine oplysninger: https://policies.google.com/technologies/partner-sites', 'Administrer annoncetilpasning: https://adssettings.google.com', 'Framelding via Network Advertising Initiative: https://optout.networkadvertising.org', 'Framelding via Digital Advertising Alliance: https://optout.aboutads.info'],
    },
    {
      heading: 'Sådan bruger vi information',
      bullets: ['For at besvare dine forespørgsler og yde support.', 'At vise relevante annoncer gennem vores reklamepartnere.', 'For at analysere brugen af webstedet og forbedre vores tjenester.', 'At opdage, forebygge og håndtere svindel, misbrug og sikkerhedsproblemer.', 'For at overholde juridiske forpligtelser.'],
    },
    {
      heading: 'Tredjepartstjenester',
      bullets: ['Google AdSense: Modtager data for at vise og måle annoncer.', 'Analytikudbydere: Modtag anonymiserede brugsdata.', 'Netlify (hosting): Behandler anmodninger og kan logge IP-adresser.', 'Vi sælger ikke dine personlige oplysninger. Deling af data med reklamepartnere kan dog betragtes som et salg i henhold til CCPA (se nedenfor).'],
    },
    {
      heading: 'Dataopbevaring',
      bullets: ['Kontaktindsendelser: Op til 2 år.', 'Serverlogfiler: Op til 30 dage (hostingudbyder).', 'Analysedata: Op til 26 måneder (anonymiseret).', 'Annoncecookies: Typisk 13 måneder (varierer afhængigt af partner).'],
    },
    {
      heading: 'Dine rettigheder i henhold til GDPR (EØS-brugere)',
      paragraphs: ['Hvis du befinder dig i Det Europæiske Økonomiske Samarbejdsområde, har du følgende rettigheder i henhold til den generelle forordning om databeskyttelse:'],
      bullets: ['Ret til indsigt: Anmod om en kopi af de personoplysninger, vi har om dig.', 'Ret til berigtigelse: Anmodning om berigtigelse af ukorrekte oplysninger.', 'Ret til sletning: Anmod om sletning af dine data (retten til at blive glemt).', 'Ret til at begrænse behandling: Anmod om begrænsninger i, hvordan vi bruger dine data.', 'Ret til dataportabilitet: Anmod om dine data i et portabelt format.', 'Ret til indsigelse: Indsigelse mod behandling, herunder til direkte markedsføring.', 'Ret til at trække samtykke tilbage: Tilbagekaldelse af samtykke når som helst, hvor behandling er baseret på samtykke.', 'Ret til at indgive en klage: Indgiv en klage til din databeskyttelsesmyndighed.'],
    },
    {
      heading: 'GDPR-retsgrundlag',
      paragraphs: ['Vi behandler data på følgende grundlag: (a) Samtykke – til personligt tilpasset annoncering (administreret af vores annonceringspartnere); (b) Legitime interesser – til analyser, sikkerhed og forbedring; (c) Kontrakt – til at besvare forespørgsler.', 'For at udøve dine rettigheder, kontakt ${CONTACT_EMAIL}. Vi svarer inden for 30 dage.'],
    },
    {
      heading: 'Dine rettigheder i henhold til CCPA (brugere i Californien)',
      bullets: ['Ret til at vide: Anmod om oplysninger om indsamlede data, kilder, formål og tredjeparter.', 'Ret til sletning: Anmod om sletning af dine personlige oplysninger.', 'Ret til at framelde sig: Fravælg salg af personlige oplysninger (deling med annoncepartnere kan være berettiget).', 'Ret til ikke-diskrimination: Vi vil ikke diskriminere for at udøve dine rettigheder.'],
    },
    {
      heading: 'CCPA-kategorier indsamlet',
      paragraphs: ['Kategorier: Identifikatorer (IP-adresse, enheds-ID), internetaktivitet (browsing, annonceinteraktioner), geoplacering (omtrentlig), inferenser (interesser fra browsing).', 'For at udøve rettigheder eller framelde dig: ${CONTACT_EMAIL} eller juster cookieindstillinger.'],
    },
    {
      heading: 'Internationale overførsler',
      paragraphs: ['Dine oplysninger kan blive overført til lande med andre databeskyttelseslove, herunder USA. Vi bruger passende sikkerhedsforanstaltninger såsom standardkontraktbestemmelser.'],
    },
    {
      heading: 'Børns privatliv',
      paragraphs: ['ANQR er ikke rettet mod børn under 13 år (eller 16 år i EØS). Vi indsamler ikke bevidst data fra børn. Kontakt ${CONTACT_EMAIL}, hvis du mener, at et barn har givet oplysninger.'],
    },
    {
      heading: 'Sikkerhed',
      paragraphs: ['Vi bruger passende tekniske og organisatoriske foranstaltninger til at beskytte data, herunder HTTPS-kryptering. Ingen internettransmission er dog 100 % sikker.'],
    },
    {
      heading: 'Spor ikke',
      paragraphs: ['Vi respekterer Do Not Track-browsersignaler, hvor det er muligt, selvom reklamepartnere muligvis ikke reagerer på DNT.'],
    },
    {
      heading: 'Ændringer i denne politik',
      paragraphs: ['Vi kan opdatere denne politik med jævne mellemrum. Datoen Sidst opdateret angiver den seneste revision. Væsentlige ændringer kan meddeles via et banner på webstedet.'],
    },
    {
      heading: 'Kontakt os',
      paragraphs: ['Hvis du har spørgsmål om privatlivets fred eller ønsker at udøve dine rettigheder: ${CONTACT_EMAIL} eller brug vores kontaktside. Vi besvarer anmodninger om privatliv inden for 30 dage.'],
    },
  ],
};

export default privacy;
