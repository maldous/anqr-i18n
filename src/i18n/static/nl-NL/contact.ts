import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Neem contact met ons op',
  description: 'We stellen feedback, bugrapporten, functieverzoeken en algemene vragen zeer op prijs.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Hoe u ons kunt bereiken',
      paragraphs: ['We bieden verschillende manieren om contact met ons op te nemen, afhankelijk van uw behoeften. We lezen elk bericht, maar de reactietijd kan variëren afhankelijk van het aantal berichten en het type vraag.'],
    },
    {
      heading: 'E-mail',
      paragraphs: ['Voor alle vragen: ${CONTACT_EMAIL}', 'Dit is de meest betrouwbare manier om ons te bereiken en wordt aanbevolen voor gedetailleerde vragen, zakelijke vragen of andere vragen.'],
    },
    {
      heading: 'Soorten vragen',
      bullets: ['Algemene vragen: Vragen over het gebruik van ANQR, uitleg over functies of algemene feedback.', 'Bugrapporten: Vermeld alstublieft uw browser, besturingssysteem, stappen om het probleem te reproduceren en eventuele foutmeldingen die u ziet.', 'Functieverzoeken: Suggesties voor nieuwe functies of verbeteringen. We nemen alle verzoeken in overweging, maar we kunnen implementatie niet garanderen.', 'Zakelijke vragen: Partnerschapsmogelijkheden, licentievragen of vragen over commercieel gebruik.', 'Privacyverzoeken: Verzoeken om uw privacyrechten uit te oefenen onder de AVG, de CCPA of andere privacywetgeving (zie Privacybeleid).', 'DMCA/Auteursrecht: Zie het DMCA-gedeelte hieronder voor de vereisten voor verwijderingsverzoeken.'],
    },
    {
      heading: 'Reactietijden',
      paragraphs: ['Wij streven ernaar om binnen 5-7 werkdagen op vragen te reageren. Verzoeken met betrekking tot privacy worden binnen 30 dagen behandeld, zoals wettelijk vereist.', 'Tijdens drukke perioden kunnen de reactietijden langer zijn. Vermeld bij dringende zaken \'DRINGEND\' in de onderwerpregel.'],
    },
    {
      heading: 'Voordat u contact met ons opneemt',
      paragraphs: ['Raadpleeg onze documentatiepagina voor antwoorden op veelgestelde vragen over het gebruik van ANQR-functies. Veel vragen over het genereren, opmaken en exporteren van QR-codes worden daar beantwoord.'],
    },
    {
      heading: 'DMCA-auteursrechtkennisgevingen',
      paragraphs: ['Als u van mening bent dat inhoud die beschikbaar is op ANQR inbreuk maakt op uw auteursrecht, kunt u een DMCA-verwijderingsverzoek indienen. Uw verzoek is alleen geldig als het de volgende informatie bevat:'],
      bullets: ['Een fysieke of elektronische handtekening van de auteursrechthebbende of een gemachtigde.', 'Identificatie van het auteursrechtelijk beschermde werk waarvan beweerd wordt dat er inbreuk op is gemaakt.', 'Identificatie van het materiaal waarvan beweerd wordt dat het inbreuk maakt, met voldoende informatie om het te lokaliseren.', 'Uw contactgegevens (adres, telefoonnummer en e-mailadres).', 'Een verklaring dat u te goeder trouw gelooft dat het gebruik van het materiaal niet is toegestaan door de auteursrechthebbende.', 'Een verklaring, onder ede, dat de informatie in uw kennisgeving juist is en dat u de auteursrechthebbende bent of gemachtigd bent om namens hen op te treden.'],
    },
    {
      heading: 'DMCA-contact',
      paragraphs: ['Stuur DMCA-meldingen naar: ${CONTACT_EMAIL}', 'Vermeld \'DMCA-melding\' in de onderwerpregel. We zullen op geldige meldingen reageren in overeenstemming met de toepasselijke wetgeving. Houd er rekening mee dat ANQR QR-codes lokaal op de apparaten van gebruikers genereert en geen door gebruikers gegenereerde inhoud host.'],
    },
  ],
};

export default contact;
