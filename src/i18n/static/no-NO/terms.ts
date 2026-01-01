import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: '«Bruksvilkår»',
  description: '«Ved å gå inn på eller bruke nettstedet, godtar du å være bundet av disse vilkårene.»',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '«Godkjenning av vilkår»',
      paragraphs: ['«Ved å gå inn på eller bruke ANQR (anqr.link), godtar du å være bundet av disse tjenestevilkårene og vår personvernerklæring. Hvis du ikke godtar disse vilkårene, må du ikke bruke nettstedet.»', '«Vi kan oppdatere disse vilkårene fra tid til annen. Fortsatt bruk av nettstedet etter endringer utgjør aksept av de nye vilkårene.»'],
    },
    {
      heading: '«Kvalifisering»',
      paragraphs: ['«Du må være minst 13 år for å bruke ANQR. Ved å bruke nettstedet bekrefter du at du oppfyller dette alderskravet. Hvis du er under 18 år, bekrefter du at du har tillatelse fra foreldre eller verge til å bruke nettstedet.»'],
    },
    {
      heading: '«Tillatt bruk»',
      paragraphs: ['«Du kan kun bruke ANQR til lovlige formål. Du er eneansvarlig for innholdet du koder inn i QR-koder og for hvordan du bruker eventuelle QR-koder du genererer.»'],
    },
    {
      heading: '«Forbudt oppførsel»',
      paragraphs: ['«Du samtykker i å ikke:»'],
      bullets: ['«Bruk ANQR til å lage QR-koder som legger til rette for phishing, distribusjon av skadelig programvare, svindel, trakassering, ærekrenkelse eller annen ulovlig aktivitet.»', '«Kod innhold som krenker immaterielle rettigheter, krenker personvernet eller inneholder ulovlig materiale.»', '«Forsøk på å forstyrre, overbelaste eller forstyrre driften eller sikkerheten til nettstedet.»', '«Utfør omvendt utvikling, dekompilering eller forsøk å trekke ut kildekode fra nettstedet.»', '«Bruk automatiserte verktøy (boter, skrapere) for å få tilgang til nettstedet på en måte som forringer ytelsen for andre brukere.»', '«Omgå eller deaktiver sikkerhets- eller tilgangskontrollfunksjoner.»', '«Utgi deg for å være en annen person eller enhet, eller feilaktig fremstille din tilknytning.»'],
    },
    {
      heading: '«Immateriell eiendom»',
      paragraphs: ['«Du beholder eierskapet til innholdet du koder inn i QR-koder. ANQR gjør ikke krav på eierskap til dataene dine.»', '«ANQR-navnet, logoen, grensesnittdesignet og den underliggende koden er beskyttet av opphavsrett, varemerker og andre lover om immaterielle rettigheter. Du kan ikke kopiere, endre, distribuere eller lage avledede verk uten vår tillatelse.»', '«QR Code® er et registrert varemerke for DENSO WAVE INCORPORATED. ANQR er ikke tilknyttet DENSO WAVE.»'],
    },
    {
      heading: '«Lisens for brukerinnhold»',
      paragraphs: ['«Ved å bruke ANQR gir du oss ingen rettigheter til innholdet ditt. Når du bruker lokal generering (standard), skjer all QR-kodegenerering i nettleseren din, og vi får ikke tilgang til, lagrer eller overfører dine kodede data.»', '«Når du bruker server-side API-et, behandles innholdet ditt for å generere QR-bildet, men det lagres, logges eller brukes ikke til noe annet formål enn å gjengi det forespurte bildet.»'],
    },
    {
      heading: '«Tredjepartstjenester og reklame»',
      paragraphs: ['«Nettstedet viser annonser via Google AdSense og kan inneholde lenker til tredjepartsnettsteder. Vi er ikke ansvarlige for tredjeparts innhold, tjenester eller personvernpraksis.»', '«Din samhandling med annonsører og tredjeparter skjer utelukkende mellom deg og dem. Se vår personvernerklæring for informasjon om praksis for annonseringsdata.»'],
    },
    {
      heading: '«Ansvarsfraskrivelse for garantier»',
      paragraphs: ['«ANQR TILBYS «SOM DEN ER» OG «SOM TILGJENGELIG» UTEN GARANTIER AV NOE SLAG, VERKEN DIREKTE ELLER INDIREKTE, INKLUDERT, MEN IKKE BEGRENSET TIL, INDIREKTE GARANTIER OM SALGBARHET, EGNETHET FOR ET SÆRSKILT FORMÅL OG IKKE-KRENKELSE.»', '«Vi garanterer ikke at: (a) nettstedet vil være uavbrutt, sikkert eller feilfritt; (b) QR-koder vil skannes i alle miljøer, på alle enheter eller med alle skannerapplikasjoner; (c) nettstedet vil oppfylle dine krav.»', '«Du bør alltid teste QR-koder under de forholdene der de skal brukes (utskriftsstørrelse, belysning, skjermtype, avstand, kamerakvalitet).»'],
    },
    {
      heading: '«Ansvarsbegrensning»',
      paragraphs: ['«I DEN GRAD LOVEN TILLATER DET, SKAL ANQR OG DENS OPERATØRER, TILKNYTTEDE SELSKAPER OG LISENSGIVERE IKKE VÆRE ANSVARLIGE FOR NOEN DIREKTE, INDIREKTE, TILFELDIGE, SPESIELLE, FØLGESKADER, STRAFFERETTERSTATNING ELLER EKSEMPLARISKE SKADER, INKLUDERT, MEN IKKE BEGRENSET TIL, SKADER FOR TAP AV FORTJENESTE, INNTEKTER, DATA, GOODWILL, BRUK ELLER ANDRE IMMATERIELLE TAP, SOM OPPSTÅR FRA ELLER ER RELATERT TIL DIN TILGANG TIL ELLER BRUK AV (ELLER MANGLENDE EVNE TIL Å FÅ TILGANG TIL ELLER BRUKE) TJENESTEN.»', '«DU FORSTÅR OG SAMTYKKER UTTRYKKELIG I AT DIN BRUK AV TJENESTEN SKJER PÅ EGEN RISIKO. TJENESTEN TILBYS GRATIS, OG FØLGELIG SAMTYKKER DU I AT ANQR OG DENS OPERATØRER IKKE HAR ERSTATNINGSANSVAR OVERFOR DEG FOR SKADER ELLER TAP. VÅRT TOTALE ERSTATNINGSANSVAR SKAL UNDER INGEN OMSTENDIGHETER OVERSKRIDE NULL DOLLAR ($0 AUD).»', '«DU SAMTYKKER I Å FRASKRIVE, GI AVKAST PÅ OG FRASKRIVE ALLE KRAV, EFTERLYSNINGER OG SØKSMÅL MOT ANQR OG DENS OPERATØRER SOM OPPSTÅR FRA DIN BRUK AV TJENESTEN.»', '«NOEN JURISDIKSJONER TILLATER IKKE UTELUKKELSE AV VISSE GARANTIER ELLER ANSVARSBEGRENSNINGER. I SLIKE JURISDIKSJONER SKAL VÅRT ANSVAR VÆRE BEGRENSET TIL DEN GRAD GJELDENDE LOV TILLATER DET.»'],
    },
    {
      heading: '«Erstatning»',
      paragraphs: ['«Du samtykker i å holde ANQR, dets operatører, tilknyttede selskaper og deres respektive ledere, direktører, ansatte og agenter skadesløse fra ethvert krav, skade, tap, ansvar, kostnader og utgifter (inkludert advokatsalærer) som følge av: (a) din bruk av nettstedet; (b) ditt brudd på disse vilkårene; (c) ditt brudd på tredjeparts rettigheter; (d) ethvert innhold du koder inn i QR-koder.»'],
    },
    {
      heading: '«Tvisteløsning»',
      paragraphs: ['«Enhver tvist som oppstår fra disse vilkårene eller din bruk av ANQR skal først forsøkes løst gjennom uformell forhandling ved å kontakte ${CONTACT_EMAIL}.»', '«Hvis uformell løsning mislykkes, skal tvister løses gjennom bindende voldgift i Victoria, Australia, med unntak av at begge parter kan søke forføyning i retten for brudd på immaterielle rettigheter.»'],
    },
    {
      heading: '«Fraskrivelse av gruppesøksmål»',
      paragraphs: ['«I DEN GRAD LOVEN TILLATER DET, SAMTYKKER DU I AT ENHVER TVISTELØSNINGSPROSEDURE KUN SKAL GJENNOMFØRES PÅ INDIVIDUELL BASIS OG IKKE I ET GRUPPESØKSMÅL, SAMLET SØKSMÅL ELLER REPRESENTATIVT SØKSMÅL.»'],
    },
    {
      heading: '«Gjeldende lov»',
      paragraphs: ['«Disse vilkårene er underlagt lovene i Victoria, Australia, uten hensyn til prinsipper om lovkonflikt. Du samtykker i den eksklusive jurisdiksjonen til domstolene i Victoria, Australia.»'],
    },
    {
      heading: '«Endringer og tilgjengelighet»',
      paragraphs: ['«Vi kan endre, suspendere eller avvikle nettstedet (eller deler av det) når som helst uten varsel eller ansvar.»', '«Vi kan oppdatere disse vilkårene når som helst. Datoen «Sist oppdatert» angir når de sist ble revidert. Fortsatt bruk etter endringer utgjør aksept.»'],
    },
    {
      heading: '«Avskillelighet»',
      paragraphs: ['«Hvis noen bestemmelse i disse vilkårene kjennes ugyldig eller ikke kan håndheves, skal denne bestemmelsen håndheves i den grad det er tillatt, og de gjenværende bestemmelsene skal forbli i full kraft og virkning.»'],
    },
    {
      heading: '«Fraskrivelse»',
      paragraphs: ['«Hvis vi ikke håndhever noen rettighet eller bestemmelse i disse vilkårene, skal det ikke anses som en fraskrivelse av slik rettighet eller bestemmelse.»'],
    },
    {
      heading: '«Hele avtalen»',
      paragraphs: ['«Disse vilkårene, sammen med vår personvernerklæring, utgjør hele avtalen mellom deg og ANQR angående din bruk av nettstedet, og erstatter alle tidligere avtaler.»'],
    },
    {
      heading: '«Force majeure»',
      paragraphs: ['«Vi er ikke ansvarlige for feil eller forsinkelser i ytelsen som følge av omstendigheter utenfor vår rimelige kontroll, inkludert naturkatastrofer, krig, terrorisme, opptøyer, myndighetstiltak eller feil med internett/infrastruktur.»'],
    },
    {
      heading: '«Kontakt»',
      paragraphs: ['«Spørsmål om disse vilkårene kan sendes til: ${CONTACT_EMAIL}»'],
    },
  ],
};

export default terms;
