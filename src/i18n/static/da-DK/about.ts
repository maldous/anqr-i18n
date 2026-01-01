import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: '"Om ANQR”',
  description: '"ANQR er en gratis QR-kodegenerator med en klientorienteret tilgang – generer QR-koder lokalt, eller brug vores API til indlejring.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Hvad er ANQR?”',
      paragraphs: [
        '"ANQR (udtales "anker") er en gratis QR-kodegenerator, der opretter scanbare koder til URL\'er, tekst, Wi-Fi-legitimationsoplysninger, kontaktkort, kalenderbegivenheder og meget mere.”',
        'Det er bygget til enkeltpersoner, små virksomheder, marketingfolk og udviklere, der ønsker effektive QR-værktøjer uden at tilmelde sig. Det klientorienterede design betyder, at QR-koder som standard genereres lokalt i din browser med en valgfri server-API til professionel integration og integration.',
      ],
    },
    {
      heading: '"Nøglefunktioner”',
      bullets: [
        '"Generer QR-koder med det samme i din browser – ingen konto kræves.”',
        '"Tilpas farver, modulstile, søgermønstre og tilføj billedoverlejringer.”',
        '"Eksporter i flere formater: PNG, SVG, WebP og animeret GIF.”',
        '"Avancerede kontroller til fejlkorrektionsniveau, QR-version, kodningstilstand og maskevalg.”',
        '"Scanningssikkerhedsvejledning og live forhåndsvisning, der hjælper med at holde koder læselige i trykte medier og på skærme.”',
        '"Serverside-API til professionel indlejring med fuld parameterunderstøttelse.”',
        '"Virker offline når den er indlæst – det er en statisk webapp, du kan køre hvor som helst.”',
      ],
    },
    {
      heading: '"Sådan fungerer ANQR”',
      paragraphs: [
        '"ANQR kører i din browser og koder dit input ind i en standard QR-matrix med Reed-Solomon-fejlkorrektion, hvorefter det gengives i det format, du vælger.”',
        '"Som standard sker genereringen lokalt i din browser. Til professionel brug kan du også bruge server-side API\'en til at generere QR-koder via URL-parametre – perfekt til indlejring i websteder, e-mails eller automatiserede arbejdsgange.”',
        'Når du tilføjer overlays eller animationer, balancerer ANQR styling med scanningspålidelighed, så resultatet forbliver scanningsbart.',
        '"ANQR fokuserer på statiske koder (dataene er inde i QR-koden). Hvis du har brug for en dynamisk kode (redigerbar destination), kan du kode din egen omdirigerings-URL eller korte link.”',
      ],
    },
    {
      heading: '"Hvem driver ANQR?”',
      paragraphs: [
        '"ANQR drives som et uafhængigt webværktøj. For spørgsmål, support eller forretningsforespørgsler, brug venligst kontaktsiden eller send en e-mail”' + CONTACT_EMAIL + '".”',
      ],
    },
    {
      heading: '"Reklame og hvordan vi forbliver frie”',
      paragraphs: [
        '"ANQR er gratis at bruge og understøttes af reklamer. Vi kan vise annoncer via Google AdSense og/eller andre reklamepartnere.”',
        'Annonceudbydere kan bruge cookies eller lignende teknologier til at tilpasse annoncer baseret på dine interesser og din browseraktivitet. Du kan administrere annoncepræferencer i dine enhedsindstillinger og via Googles annonceindstillinger, og du kan få mere at vide i vores privatlivspolitik.',
        'Vi sælger ikke det indhold, du koder ind i QR-koder. Annoncer er med til at dække omkostningerne ved at drive og forbedre projektet.',
      ],
    },
    {
      heading: '"Åbne standarder”',
      paragraphs: [
        '"ANQR genererer QR-koder baseret på ISO/IEC 18004-standarden og sigter mod bred kompatibilitet på tværs af scannere, kameraer og printworkflows.”',
      ],
    },
    {
      heading: '"Varemærkemeddelelse”',
      paragraphs: [
        '"QR Code® er et registreret varemærke tilhørende DENSO WAVE INCORPORATED. ANQR er ikke tilknyttet, godkendt af eller sponsoreret af DENSO WAVE INCORPORATED.”',
      ],
    },
    {
      heading: '"Feedback og bidrag”',
      paragraphs: [
        'Vi modtager gerne feedback, fejlrapporter og forslag til funktioner. Kontakt os venligst via e-mail eller kontaktsiden – vi læser alle beskeder, selvom svartiderne kan variere.',
      ],
    },
  ],
};

export default about;
