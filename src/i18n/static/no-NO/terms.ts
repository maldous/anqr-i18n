import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Vilkår for tjeneste',
  description:
    'Ved å få tilgang til eller bruke nettstedet, godtar du å være bundet av disse vilkårene.',
  lastUpdated: LAST_UPDATED,
  relatedLinks: [{ href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' }],
  sections: [
    {
      heading: 'Godkjennelse av vilkår',
      paragraphs: [
        'Ved å få tilgang til eller bruke ANQR (anqr.link) godtar du å være bundet av disse vilkårene og vår personvernerklæring. Hvis du ikke godtar disse vilkårene, ikke bruk nettstedet.',
        'Vi kan oppdatere disse vilkårene fra tid til annen. Fortsatt bruk av nettstedet etter endringer utgjør aksept av de nye vilkårene.',
      ],
    },
    {
      heading: 'Kvalifikasjon',
      paragraphs: [
        'Du må være minst 13 år for å bruke ANQR. Ved å bruke nettstedet, representerer du at du oppfyller dette alderskravet. Hvis du er under 18 år, representerer du at du har din foreldres eller verges tillatelse til å bruke nettstedet.',
      ],
    },
    {
      heading: 'Tillatt bruk',
      paragraphs: [
        'Du kan kun bruke ANQR til lovlige formål. Du er utelukkende ansvarlig for innholdet du koder i QR-koder og for hvordan du bruker QR-koder du genererer.',
      ],
    },
    {
      heading: 'Forbudt oppførsel',
      paragraphs: ['Du godtar å ikke:'],
      bullets: [
        'Bruk ANQR til å opprette QR-koder som lette phishing, malware distribusjon, svindel, svindel, trakassering, defamasjon eller ulovlig aktivitet.',
        'Kode innhold som bryter immaterielle rettigheter, bryter personvern eller inneholder ulovlig materiale.',
        'Forsøk på å forstyrre, overbelaste eller forstyrre driften eller sikkerheten på nettstedet.',
        'Reverse ingeniør, dekompilere eller forsøke å trekke ut kildekode fra nettstedet.',
        'Bruk automatiske verktøy (bots, skrapere) for å få tilgang til nettstedet på en måte som reduserer ytelsen for andre brukere.',
        'Omslutt eller deaktivere sikkerhets- eller tilgangskontrollfunksjoner.',
        'Personliggjør enhver person eller enhet eller feilrepresenter din tilhørighet.',
      ],
    },
    {
      heading: 'Immateriell eiendom',
      paragraphs: [
        'Du beholder eierskapet til innholdet du koder i QR-koder. ANQR gjør ikke krav på eierskap av dine data.',
        'ANQR-navn, logo, grensesnittdesign og underliggende kode er beskyttet av opphavsrett, varemerke og andre immaterielle eiendomslover. Du kan ikke kopiere, modifisere, distribuere eller opprette derivater uten vår tillatelse.',
        'QR Code® er et registrert varemerke som tilhører DENSO WAVE INKORPORATED. ANQR er ikke tilknyttet DENSO WAVE.',
      ],
    },
    {
      heading: 'Brukerinnholdslisens',
      paragraphs: [
        'Ved å bruke ANQR gir du oss ingen rettigheter til innholdet ditt. Når du bruker lokal generasjon (standard), skjer all QR-kodegenerasjon i nettleseren din, og vi får ikke tilgang til, lagrer eller overfører kodede data.',
        'Når du bruker serversiden API, behandles innholdet til å generere QR-bildet, men lagres ikke, logges eller brukes til noe annet formål enn å gjøre det ønskede bildet.',
      ],
    },
    {
      heading: 'Tredjepartstjenester og annonsering',
      paragraphs: [
        'Nettstedet viser annonser gjennom Google AdSense og kan inkludere koblinger til tredjeparts nettsteder. Vi er ikke ansvarlig for tredjeparts innhold, tjenester eller personvernpraksis.',
        'Samspillet med annonsører og tredjeparter er utelukkende mellom deg og dem. Se vår personvernerklæring for informasjon om reklamedatapraksis.',
      ],
    },
    {
      heading: 'Ansvarsfraskrivelse av garantier',
      paragraphs: [
        'ANQR ER FREMSTILT PÅ ET "AS ER" OG "AS TILGJENGELIGE" BASIS UTEN VARRANTIER AV KIND, EKSPRESER ELLER MPLIDERT, MEN IKKE LEID FOR UGJENNOMTRENGELIGE WARRANTIES AV SALG, PASSERT FOR ANSVARSFORMÅL OG NON-INFRINGEMENT.',
        'Vi garanterer ikke at nettstedet vil være uavbrutt, sikkert eller feilfritt; (b) QR-koder vil skanne i alle miljøer, på alle enheter eller med alle skannerapplikasjoner; (c) nettstedet vil oppfylle dine krav.',
        'Du bør alltid teste QR-koder i forhold der de vil bli brukt (utskriftsstørrelse, belysning, skjermtype, avstand, kamerakvalitet).',
      ],
    },
    {
      heading: 'Begrensning av ansvar',
      paragraphs: [
        'TIL MAXIUM EXTENT PERMENT AV LAW, ANQR OG ITS OPERATORER, AFFILIATES, OG LICENSORER IKKE LEILE FOR LEVERT, INDIRECT, INCIDENTAL, SÄRSKILT, KUNITILE, PUNITIVE, ELLER EXEMPLE DAGER, INKLUDERT TIL LEJE TIL LEJER FOR PROFITTER, REVENUE, DATA, GODWILL, BRUK, ELLER ANDRE INTANGIBLE LOSER, SOM ER LEVERT PÅ ELLER LEVERT TIL DIN LEJE TIL ELLER BRUK AV (ELLER INABILITET TIL ACCESS ELLER BRUK) TJENESTEN.',
        'DU EKSPONERER OG FORSTÅR AT DIN BRUK AV TJENESTEN ER PÅ DIN SOLE RISK. TJENESTET ER LEVERT AV KATALOG, OG KATALOGLIG TALT, DU FORSTÅR AT ANQR OG ITS OPERATORER IKKE HAR NOE ANSVAR FOR DEG, HVA SOM HELST FOR NOEN DAMAGES ELLER LOSSES. I INGEN VÅRE TOTALT GREGATE LIABILITY EXCEED ZERO DOLLARS ($ 0 AUD).',
        'DU ER ENIG I Å GI UT, GI OG DISCHARGE ALLE OG ALLE KLAMER, DEMANDS, OG KATEDRALER AV ACTION AGAINST ANQR OG ITS OPERATORS ARISER FRA DIN BRUK AV TJENESTEN.',
        'NOEN JURISDICSJONER INGEN ALLE EKSTRUSJON AV AKTIVE VARRANTIER ELLER LEMISJONER AV ANSVAR. I STORE JURISDICTIONS, KAN VÅR LEJELIGHET BLI LEID TIL DET MAXIMUM EXTENT PERMITET AV GJENNELIGE LOV.',
      ],
    },
    {
      heading: 'Indemnisering',
      paragraphs: [
        'Du aksepterer å avgrense, forsvare og holde ufarlige ANQR, dets operatører, tilknyttede selskaper og deres respektive funksjonærer, direktører, ansatte og agenter fra ethvert krav, skader, tap, forpliktelser, kostnader og utgifter (inkludert juridiske avgifter) som oppstår fra: a) din bruk av nettstedet; b) din brudd på disse vilkårene; c) din brudd på tredjepartsrettigheter; d) ethvert innhold du koder i QR-koder.',
      ],
    },
    {
      heading: 'Tvistløsning',
      paragraphs: [
        'Enhver tvist som oppstår fra disse vilkårene eller din bruk av ANQR skal først forsøkes å bli løst gjennom uformell forhandling ved å kontakte ${CONTACT_EMAIL}_.',
        'Hvis uformell resolusjon mislykkes, skal tvister løses gjennom bindende voldgift i Victoria i Australia, bortsett fra at begge parter kan søke skadelig lindring i retten for brudd på immateriell eiendom.',
      ],
    },
    {
      heading: 'Klassehandlingsunntak',
      paragraphs: [
        'TIL EXTENT PERMENTT AV LAW, DU FORSTÅR AT ENHVER DISPUTERE RESOLUSJON PROCEEDINGS VIL BLI KONDUSERT BARE PÅ EN INDIVIDUELL BASE OG IKKE I EN KLASS, KONSOLIDERT, ELLER REPRESENTATIV HANDLING.',
      ],
    },
    {
      heading: 'Styrende lov',
      paragraphs: [
        'Disse vilkårene styres av lovene i Victoria, Australia, uten hensyn til lovkonflikter. Du samtykker i den eksklusive jurisdiksjonen til domstolene i Victoria, Australia.',
      ],
    },
    {
      heading: 'Endringer og tilgjengelighet',
      paragraphs: [
        'Vi kan endre, suspendere eller avbryte nettstedet (eller deler av det) til enhver tid uten varsel eller ansvar.',
        'Vi kan når som helst oppdatere disse vilkårene. Den siste oppdaterte datoen indikerer når de sist ble revidert. Fortsatt bruk etter endringer utgjør aksept.',
      ],
    },
    {
      heading: 'Everabilitet',
      paragraphs: [
        'Hvis en bestemmelse av disse vilkårene holdes ugyldig eller ikke kan håndheves, vil denne bestemmelsen i størst mulig grad være tillatt, og de resterende bestemmelsene vil forbli i full kraft og virkning.',
      ],
    },
    {
      heading: 'Waiver',
      paragraphs: [
        'Vår manglende håndheving av noen rett eller bestemmelse av disse vilkårene skal ikke anses som en fraskrivelse av slik rett eller bestemmelse.',
      ],
    },
    {
      heading: 'Hele avtalen',
      paragraphs: [
        'Disse vilkårene utgjør sammen med vår personvernerklæring hele avtalen mellom deg og ANQR om din bruk av nettstedet og erstatter eventuelle tidligere avtaler.',
      ],
    },
    {
      heading: 'Force majeure',
      paragraphs: [
        'Vi vil ikke være ansvarlig for noen svikt eller forsinkelse i ytelse på grunn av omstendigheter som er utenfor vår rimelige kontroll, inkludert naturkatastrofer, krig, terrorisme, opprør, statlige handlinger eller internett/infrastrukturfeil.',
      ],
    },
    {
      heading: 'Kontakt',
      paragraphs: ['Spørsmål om disse vilkårene kan sendes til: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
