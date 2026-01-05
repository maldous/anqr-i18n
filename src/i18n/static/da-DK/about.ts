import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Om ANQR',
  description: 'ANQR er en gratis QR kode generator med en klient- første tilgang - generere QR koder lokalt eller bruge vores API til indlejring.',
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
      heading: 'Hvad er ANQR?',
      paragraphs: ['ANQR (udtales "anker") er en gratis QR kode generator, der skaber scannede koder for URL \'er, tekst, Wi- Fi legitimationsoplysninger, kontaktkort, kalender begivenheder, og meget mere.', 'Det er bygget til enkeltpersoner, små virksomheder, marketingfolk, og udviklere, der ønsker kraftfulde QR-værktøjer uden tilmelding. Klient- første design betyder QR koder genereres lokalt i din browser som standard, med en valgfri server API til professionel indlejring og integration.'],
    },
    {
      heading: 'Nøglefunktioner',
      bullets: ['Generér QR-koder øjeblikkeligt i din browser - ingen konto kræves.', 'Tilpas farver, modulstilarter, findermønstre og tilføj billedoverskrifter.', 'Eksportér i flere formater: PNG, SVG, WebP og animeret GIF.', 'Avancerede kontroller for fejlkorrigeringsniveau, QR-version, kodningstilstand og maske valg.', 'Scan- sikkerhedsvejledning og live preview for at hjælpe med at holde koder læsbare i print og på skærme.', 'Server- side API til professionel indlejring med fuld parameter support.', 'Fungerer offline når du er indlæst - det er en statisk web-app, du kan køre overalt.'],
    },
    {
      heading: 'Sådan virker ANQR',
      paragraphs: ['ANQR kører i din browser og indkoder dit input i en standard QR matrix med Reed- Solomon fejl korrektion, og derefter gør det til det format, du vælger.', 'Som standard, generering sker lokalt i din browser. Til professionel brug, kan du også bruge serverside API til at generere QR-koder via URL-parametre - perfekt til indlejring i hjemmesider, e-mails eller automatiske arbejdsgange.', 'Når du tilføjer overlejringer eller animationer, ANQR balancer styling med scanning pålidelighed, så resultatet forbliver scannede.', 'ANQR fokuserer på statiske koder (dataene er inde i QR). Hvis du har brug for en dynamisk kode (redigerbar destination), kan du indkode din egen omdirigerede URL eller kort link.'],
    },
    {
      heading: 'Hvem driver ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklame og hvordan vi forbliver frie',
      paragraphs: ['ANQR er gratis at bruge og understøttes af reklamer. Vi kan vise annoncer via Google AdSense og / eller andre reklamepartnere.', 'Ad-udbydere kan bruge cookies eller lignende teknologier til at personliggøre annoncer baseret på dine interesser og browsing aktivitet. Du kan administrere annonceindstillinger i dine enhedsindstillinger og gennem Google-annonceindstillinger og lære mere i vores privatlivspolitik.', 'Vi sælger ikke det indhold, du indkoder i QR-koder. Ads hjælper med at dække omkostningerne ved at køre og forbedre projektet.'],
    },
    {
      heading: 'Åbne standarder',
      paragraphs: ['ANQR genererer QR-koder baseret på ISO / IEC 18004-standarden og sigter mod bred kompatibilitet på tværs af scannere, kameraer og udskriftsarbejdsgange.'],
    },
    {
      heading: 'Varemærkemeddelelse',
      paragraphs: ['QR Code ® er et registreret varemærke tilhørende DENSO WAVE INCORPOREED. ANQR er ikke tilknyttet, påtegnet eller sponsoreret af DENSO WAVE INCORPORERET.'],
    },
    {
      heading: 'Feedback og bidrag',
      paragraphs: ['Vi glæder os over feedback, fejlrapporter og forslag til funktioner. Kontakt venligst via e-mail eller kontaktsiden - vi læser alle meddelelser, selvom svartiderne kan variere.'],
    },
  ],
};

export default about;
