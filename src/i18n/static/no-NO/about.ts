import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: '«Om ANQR»',
  description:
    '«ANQR er en gratis QR-kodegenerator med en klientfokusert tilnærming – generer QR-koder lokalt eller bruk API-et vårt for innebygging.»',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '«Hva er ANQR?»',
      paragraphs: [
        '«ANQR (uttales «anker») er en gratis QR-kodegenerator som lager skannbare koder for URL-er, tekst, Wi-Fi-legitimasjon, kontaktkort, kalenderhendelser og mer.»',
        '«Den er bygget for enkeltpersoner, små bedrifter, markedsførere og utviklere som ønsker kraftige QR-verktøy uten å registrere seg. Klientfokusert design betyr at QR-koder genereres lokalt i nettleseren din som standard, med et valgfritt server-API for profesjonell innebygging og integrering.»',
      ],
    },
    {
      heading: '«Nøkkelfunksjoner»',
      bullets: [
        '«Generer QR-koder umiddelbart i nettleseren din – ingen konto kreves.»',
        '«Tilpass farger, modulstiler, søkermønstre og legg til bildeoverlegg.»',
        '«Eksporter i flere formater: PNG, SVG, WebP og animert GIF.»',
        '«Avanserte kontroller for feilkorrigeringsnivå, QR-versjon, kodingsmodus og maskevalg.»',
        '«Veiledning for skannesikkerhet og forhåndsvisning i sanntid for å holde koder lesbare i trykt format og på skjermer.»',
        '«Serverside-API for profesjonell innebygging med full parameterstøtte.»',
        '«Fungerer offline når den er lastet inn – det er en statisk webapp du kan kjøre hvor som helst.»',
      ],
    },
    {
      heading: '«Hvordan ANQR fungerer»',
      paragraphs: [
        '«ANQR kjører i nettleseren din og koder inndataene dine inn i en standard QR-matrise med Reed-Solomon-feilkorreksjon, og gjengir dem deretter til formatet du velger.»',
        '«Som standard skjer genereringen lokalt i nettleseren din. For profesjonell bruk kan du også bruke server-side API-et til å generere QR-koder via URL-parametere – perfekt for innebygging i nettsteder, e-poster eller automatiserte arbeidsflyter.»',
        '«Når du legger til overlegg eller animasjoner, balanserer ANQR stil med skanningspålitelighet, slik at resultatet forblir skannbart.»',
        '«ANQR fokuserer på statiske koder (dataene er inne i QR-koden). Hvis du trenger en dynamisk kode (redigerbar destinasjon), kan du kode din egen omdirigerings-URL eller korte lenke.»',
      ],
    },
    {
      heading: '«Hvem driver ANQR?»',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: '«Reklame og hvordan vi holder oss frie»',
      paragraphs: [
        '«ANQR er gratis å bruke og støttes av reklame. Vi kan vise annonser via Google AdSense og/eller andre reklamepartnere.»',
        '«Annonseleverandører kan bruke informasjonskapsler eller lignende teknologier for å tilpasse annonser basert på dine interesser og nettleseraktivitet. Du kan administrere annonsepreferanser i enhetsinnstillingene dine og gjennom Googles annonseinnstillinger, og du kan finne ut mer i personvernerklæringen vår.»',
        '«Vi selger ikke innholdet du koder inn i QR-koder. Annonser bidrar til å dekke kostnadene ved å drive og forbedre prosjektet.»',
      ],
    },
    {
      heading: '«Åpne standarder»',
      paragraphs: [
        '«ANQR genererer QR-koder basert på ISO/IEC 18004-standarden og tar sikte på bred kompatibilitet på tvers av skannere, kameraer og utskriftsarbeidsflyter.»',
      ],
    },
    {
      heading: '«Varemerkevarsel»',
      paragraphs: [
        '«QR Code® er et registrert varemerke for DENSO WAVE INCORPORATED. ANQR er ikke tilknyttet, godkjent av eller sponset av DENSO WAVE INCORPORATED.»',
      ],
    },
    {
      heading: '«Tilbakemeldinger og bidrag»',
      paragraphs: [
        '«Vi tar gjerne imot tilbakemeldinger, feilrapporter og forslag til funksjoner. Ta kontakt via e-post eller kontaktsiden – vi leser alle meldinger, men responstidene kan variere.»',
      ],
    },
  ],
};

export default about;
