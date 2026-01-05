import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Om ANQR',
  description:
    'ANQR er en gratis QR-kodegenerator med en klient-første tilnærming - generere QR-koder lokalt eller bruk vår API til innbygging.',
  lastUpdated: LAST_UPDATED,
  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Open the generator', type: 'generator' },
    { href: '/learn?lang=${lang}', label: 'Browse Learn articles', type: 'learn' },
  ],
  relatedLinks: [
    { href: '/privacy?lang=${lang}', label: 'Privacy Policy', type: 'external' },
    { href: '/terms?lang=${lang}', label: 'Terms of Service', type: 'external' },
  ],
  sections: [
    {
      heading: 'Hva er ANQR?',
      paragraphs: [
        'ANQR (uttalt "anchor")) er en gratis QR-kodegenerator som skaper skanneaktiverbare koder for URL-er, tekst, Wi-Fi-informasjon, kontaktkort, kalenderarrangementer og mer.',
        'Den er bygget for enkeltpersoner, små bedrifter, markedsførere og utviklere som ønsker kraftige QR-verktøy uten å registrere seg. Den klient-første design betyr at QR-koder genereres lokalt i nettleseren din som standard, med en valgfri server-API for profesjonell innelegging og integrasjon.',
      ],
    },
    {
      heading: 'Nøkkelfunksjoner',
      bullets: [
        'Opprett QR-koder umiddelbart i nettleseren din - ingen konto kreves.',
        'Tilpasse farger, modulstiler, finner mønstre og legge til bildeoverlegg.',
        'Eksporter i flere formater: PNG, SVG, WebP og animert GIF.',
        'Avanserte kontroller for feilrettingsnivå, QR-versjon, kodemodus og maskevalg.',
        'Scan-sikkerhet veiledning og live forhåndsvisning for å holde koder lesbare i utskrift og på skjermer.',
        'Serverside API for profesjonell innbygging med full parameterstøtte.',
        'Fungerer offline når lastet - det er en statisk web app du kan kjøre hvor som helst.',
      ],
    },
    {
      heading: 'Hvordan ANQR fungerer',
      paragraphs: [
        'ANQR kjører i nettleseren din og koder inngangen til en standard QR matrise med Reed-Solomon feilretting, og deretter gjør det til det formatet du velger.',
        'Som standard skjer generasjon lokalt i nettleseren din. For profesjonell bruk kan du også bruke serversiden API til å generere QR-koder via URL-parametre - perfekt for inneslutting i nettsteder, e-poster eller automatiserte arbeidsflyter.',
        'Når du legger til overlegg eller animasjoner, balanserer ANQR styling med skanne pålitelighet slik at resultatet forblir skannet.',
        'ANQR fokuserer på statiske koder (data er inne i QR). Hvis du trenger en dynamisk kode (redigerbar reisemål), kan du kode din egen omdirigeringsadresse eller kort link.',
      ],
    },
    {
      heading: 'Hvem driver ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklame og hvordan vi holder oss gratis',
      paragraphs: [
        'ANQR er gratis å bruke og støttes av reklame. Vi kan vise annonser via Google AdSense og/eller andre annonseringspartnere.',
        'Annonseleverandører kan bruke informasjonskapsler eller lignende teknologier til å personliggjøre annonser basert på dine interesser og surfeaktivitet. Du kan administrere annonseinnstillinger i enhetsinnstillingene dine og gjennom Googles annonseinnstillinger, og lære mer i vår personvernerklæring.',
        'Vi selger ikke innholdet du koder i QR-koder. Annonser bidrar til å dekke kostnadene ved å kjøre og forbedre prosjektet.',
      ],
    },
    {
      heading: 'Åpne standarder',
      paragraphs: [
        'ANQR genererer QR-koder basert på ISO/IEC 18004-standarden og tar sikte på bred kompatibilitet mellom skannere, kameraer og utskriftsarbeidsflyter.',
      ],
    },
    {
      heading: 'Varemerkevarsel',
      paragraphs: [
        'QR Code® er et registrert varemerke som tilhører DENSO WAVE INKORPORATED. ANQR er ikke tilknyttet, godkjent av eller sponset av DENSO WAVE INKORPORATED.',
      ],
    },
    {
      heading: 'Feedback og bidrag',
      paragraphs: [
        'Vi ønsker tilbakemeldinger, feilrapporter og forslag til funksjon. Ta kontakt via e-post eller kontaktsiden - vi leser hver melding, men responstider kan variere.',
      ],
    },
  ],
};

export default about;
