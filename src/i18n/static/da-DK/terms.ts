import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Servicevilkår',
  description: 'Ved at tilgå eller bruge webstedet accepterer du at være bundet af disse vilkår.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Accept af vilkår',
      paragraphs: [
        'Ved at tilgå eller bruge ANQR (anqr.link) accepterer du at være bundet af disse servicevilkår og vores privatlivspolitik. Hvis du ikke accepterer disse vilkår, må du ikke bruge webstedet.',
        'Vi kan opdatere disse vilkår fra tid til anden. Fortsat brug af webstedet efter ændringer udgør accept af de nye vilkår.',
      ],
    },
    {
      heading: 'Berettigelse',
      paragraphs: [
        'Du skal være mindst 13 år for at bruge ANQR. Ved at bruge webstedet erklærer du, at du opfylder denne aldersgrænse. Hvis du er under 18 år, erklærer du, at du har din forælder eller værges tilladelse til at bruge webstedet.',
      ],
    },
    {
      heading: 'Tilladt brug',
      paragraphs: [
        'Du må kun bruge ANQR til lovlige formål. Du er eneansvarlig for det indhold, du koder ind i QR-koder, og for hvordan du bruger eventuelle QR-koder, du genererer.',
      ],
    },
    {
      heading: 'Forbudt adfærd',
      paragraphs: ['Du accepterer ikke at:'],
      bullets: [
        'Brug ANQR til at oprette QR-koder, der fremmer phishing, distribution af malware, bedrageri, chikane, ærekrænkelse eller enhver form for ulovlig aktivitet.',
        'Kod indhold, der krænker intellektuelle ejendomsrettigheder, krænker privatlivets fred eller indeholder ulovligt materiale.',
        'Forsøg på at forstyrre, overbelaste eller forstyrre webstedets drift eller sikkerhed.',
        'Udfør reverse engineering, dekompilering eller forsøg på at udtrække kildekode fra webstedet.',
        'Brug automatiserede værktøjer (bots, scrapers) til at tilgå webstedet på en måde, der forringer ydeevnen for andre brugere.',
        'Omgå eller deaktiver sikkerheds- eller adgangskontrolfunktioner.',
        'Udgiv dig for at være en anden person eller enhed eller vildled din tilknytning.',
      ],
    },
    {
      heading: 'Intellektuel ejendom',
      paragraphs: [
        'Du beholder ejerskabet af det indhold, du koder ind i QR-koder. ANQR gør ikke krav på ejerskab af dine data.',
        'ANQR-navnet, logoet, interfacedesignet og den underliggende kode er beskyttet af ophavsret, varemærker og andre love om intellektuel ejendomsret. Du må ikke kopiere, ændre, distribuere eller skabe afledte værker uden vores tilladelse.',
        'QR Code® er et registreret varemærke tilhørende DENSO WAVE INCORPORATED. ANQR er ikke tilknyttet DENSO WAVE.',
      ],
    },
    {
      heading: 'Licens til brugerindhold',
      paragraphs: [
        'Ved at bruge ANQR giver du os ingen rettigheder til dit indhold. Når du bruger lokal generering (standard), sker al QR-kodegenerering i din browser, og vi hverken tilgår, gemmer eller overfører dine kodede data.',
        "Når du bruger server-side API'en, behandles dit indhold for at generere QR-billedet, men det gemmes, logges eller bruges ikke til andre formål end at gengive det ønskede billede.",
      ],
    },
    {
      heading: 'Tredjepartstjenester og reklame',
      paragraphs: [
        'Webstedet viser annoncer via Google AdSense og kan indeholde links til tredjepartswebsteder. Vi er ikke ansvarlige for tredjepartsindhold, -tjenester eller -privatlivspraksis.',
        'Dine interaktioner med annoncører og tredjeparter foregår udelukkende mellem dig og dem. Se vores privatlivspolitik for information om praksis for annonceringsdata.',
      ],
    },
    {
      heading: 'Ansvarsfraskrivelse for garantier',
      paragraphs: [
        'ANQR LEVERES SOM DEN ER OG SOM TILGÆNGELIG UDEN NOGEN ART FOR GARANTIER, HVERKEN UDTRYKKELIGE ELLER UNDERFORSTÅEDE, HERUNDER, MEN IKKE BEGRÆNSET TIL, UNDERFORSTÅEDE GARANTIER FOR SALGBARHED, EGNETHED TIL ET BESTEMT FORMÅL OG IKKE-KRÆNKELSE AF RETTIGHEDER.',
        'Vi garanterer ikke, at: (a) webstedet vil være uafbrudt, sikkert eller fejlfrit; (b) QR-koder vil scanne i alle miljøer, på alle enheder eller med alle scannerapplikationer; (c) webstedet vil opfylde dine krav.',
        'Du bør altid teste QR-koder under de forhold, hvor de skal bruges (udskriftsstørrelse, belysning, skærmtype, afstand, kamerakvalitet).',
      ],
    },
    {
      heading: 'Ansvarsbegrænsning',
      paragraphs: [
        'I DET OMFANG, LOVEN TILLADER DET, ER ANQR OG DENS OPERATØRER, TILKNYTTEDE SELSKABER OG LICENSGIVERE IKKE ANSVARLIGE FOR NOGEN DIREKTE, INDIREKTE, TILFÆLDIGE, SÆRLIGE, FØLGE-, PØNALE ELLER EKSEMPLARISKE ERSTATNINGER, HERUNDER, MEN IKKE BEGRÆNSET TIL, ERSTATNING FOR TAB AF FORTJENESTE, INDTÆGT, DATA, GOODWILL, BRUG ELLER ANDRE IMMATERIELLE TAB, DER OPSTÅR FRA ELLER ER RELATERET TIL DIN ADGANG TIL ELLER BRUG AF (ELLER MANGLENDE EVNE TIL AT FÅ ADGANG TIL ELLER BRUGE) TJENESTEN.',
        'DU FORSTÅR OG ACCEPTERER UDTRYKKELIGT, AT DIN BRUG AF TJENESTEN SKER PÅ EGEN RISIKO. TJENESTEN LEVERES GRATIS, OG FØLGELIG ACCEPTERER DU, AT ANQR OG DENS OPERATØRER IKKE HAR INTET ANSVAR OVER FOR DIG FOR SKADER ELLER TAB. VORES SAMLEDE ANSVAR SKAL UNDER INGEN OMSTÆNDIGHEDER OVERSTIGE NUL DOLLARS ($0 AUD).',
        'DU ACCEPTERER AT FRASKIVE DIG, FRASKIVE DIG OG FRASKIVE DIG ALLE KRAV, EFTERLYSNINGER OG SØGSMÅL MOD ANQR OG DENS OPERATØRER, DER MÅ OPSTÅ SOM FØLGE AF DIN BRUG AF TJENESTEN.',
        'VISSE JURISDIKTIONER TILLADER IKKE UDELUKKELSE AF VISSE GARANTIER ELLER ANSVARSBEGRÆNSNINGER. I SÅDANNE JURISDIKTIONER SKAL VORES ANSVAR VÆRE BEGRÆNSET TIL DET OMFANG, DER ER TILLADT I HENHOLD TIL GÆLDENDE LOV.',
      ],
    },
    {
      heading: 'Skadesløsholdelse',
      paragraphs: [
        'Du accepterer at skadesløsholde, forsvare og fritage ANQR, dets operatører, tilknyttede selskaber og deres respektive funktionærer, direktører, medarbejdere og agenter for ethvert krav, skade, tab, ansvar, omkostninger og udgifter (herunder juridiske gebyrer) som følge af: (a) din brug af webstedet; (b) din overtrædelse af disse vilkår; (c) din overtrædelse af tredjepartsrettigheder; (d) ethvert indhold, du koder ind i QR-koder.',
      ],
    },
    {
      heading: 'Tvistbilæggelse',
      paragraphs: [
        'Enhver tvist, der måtte opstå som følge af disse vilkår eller din brug af ANQR, skal først forsøges løst gennem uformel forhandling ved at kontakte ${CONTACT_EMAIL}.',
        'Hvis uformel løsning mislykkes, skal tvister afgøres ved bindende voldgift i Victoria, Australien, bortset fra at begge parter kan søge påbud i retten for krænkelser af intellektuel ejendomsret.',
      ],
    },
    {
      heading: 'Fraskrivelse af gruppesøgsmål',
      paragraphs: [
        'I DET OMFANG LOVEN TILLADER DET, ACCEPTERER DU, AT ENHVER TVISTBILÆGGELSESPROCEDURE KUN VIL BLIVE GØRT PÅ INDIVIDUEL GRUNDLAG OG IKKE SOM GRUPPE-, SAMLET ELLER REPRÆSENTATIV SØGSMÅL.',
      ],
    },
    {
      heading: 'Gældende lov',
      paragraphs: [
        'Disse vilkår er underlagt lovgivningen i Victoria, Australien, uden hensyntagen til principper om lovkonflikt. Du accepterer den eksklusive jurisdiktion for domstolene i Victoria, Australien.',
      ],
    },
    {
      heading: 'Ændringer og tilgængelighed',
      paragraphs: [
        'Vi kan til enhver tid ændre, suspendere eller afbryde webstedet (eller dele af det) uden varsel eller ansvar.',
        'Vi kan opdatere disse vilkår når som helst. Datoen Sidst opdateret angiver, hvornår de senest blev revideret. Fortsat brug efter ændringer udgør accept.',
      ],
    },
    {
      heading: 'Adskillelighed',
      paragraphs: [
        'Hvis nogen bestemmelse i disse vilkår findes ugyldig eller ikke kan håndhæves, skal denne bestemmelse håndhæves i det videst mulige omfang, og de resterende bestemmelser skal fortsat være i fuld kraft og virkning.',
      ],
    },
    {
      heading: 'Fraskrivelse',
      paragraphs: [
        'Vores undladelse af at håndhæve nogen rettighed eller bestemmelse i disse vilkår skal ikke anses for at være et afkald på en sådan rettighed eller bestemmelse.',
      ],
    },
    {
      heading: 'Hele aftalen',
      paragraphs: [
        'Disse vilkår udgør sammen med vores privatlivspolitik hele aftalen mellem dig og ANQR vedrørende din brug af webstedet og erstatter alle tidligere aftaler.',
      ],
    },
    {
      heading: 'Force majeure',
      paragraphs: [
        'Vi er ikke ansvarlige for fejl eller forsinkelser i udførelsen som følge af omstændigheder uden for vores rimelige kontrol, herunder naturkatastrofer, krig, terrorisme, optøjer, regeringshandlinger eller internet-/infrastrukturfejl.',
      ],
    },
    {
      heading: 'Kontakt',
      paragraphs: ['Spørgsmål om disse vilkår kan sendes til: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
