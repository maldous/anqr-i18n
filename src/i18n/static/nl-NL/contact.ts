import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Contacteer ons',
  description: 'We verwelkomen feedback, bug rapporten, feature verzoeken, en algemene vragen.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Hoe ons te bereiken',
      paragraphs: ['Wij bieden verschillende manieren om contact met ons op te nemen afhankelijk van uw behoeften. We lezen elk bericht, hoewel de responstijden kunnen variëren op basis van volume en het type aanvraag.'],
    },
    {
      heading: 'E-mail',
      paragraphs: ['Voor alle vragen: ${CONTACT_EMAIL}_', 'Dit is de meest betrouwbare manier om ons te bereiken en wordt aanbevolen voor gedetailleerde vragen, zakelijke vragen, of andere vragen.'],
    },
    {
      heading: 'Soorten onderzoeken',
      bullets: ['Algemene vragen: Vragen over hoe ANQR te gebruiken, functie uitleg, of algemene feedback.', 'Foutmeldingen: Gelieve uw browser, besturingssysteem, stappen te reproduceren, en eventuele foutmeldingen die u ziet.', 'Feature verzoeken: Suggesties voor nieuwe functies of verbeteringen. We overwegen alle verzoeken, hoewel we de uitvoering niet kunnen beloven.', 'Bedrijfsvragen: Samenwerkingsmogelijkheden, licentievragen of vragen over commercieel gebruik.', 'Privacyverzoeken: Verzoeken om uw privacyrechten uit te oefenen onder AVG, CCPA of andere privacywetgeving (zie Privacybeleid).', 'DMCA/Copyright: Zie de DMCA-sectie hieronder voor de vereisten voor het nemen van een kennisgeving.'],
    },
    {
      heading: 'Responstijden',
      paragraphs: ['We willen binnen 5-7 werkdagen antwoorden op vragen. Privacy-gerelateerde verzoeken zullen worden behandeld binnen 30 dagen zoals vereist door de wet.', 'Tijdens drukke periodes kunnen de responstijden langer zijn. Voor dringende zaken, gelieve "URGENTIE" in uw onderwerplijn aan te geven.'],
    },
    {
      heading: 'Alvorens ons te contacteren',
      paragraphs: ['Raadpleeg onze Documentatie pagina voor antwoorden op veelgestelde vragen over hoe u ANQR functies kunt gebruiken. Veel vragen over QR code generatie, styling en export opties zijn er behandeld.'],
    },
    {
      heading: 'DMCA Auteursrechten',
      paragraphs: ['Als u van mening bent dat content beschikbaar op ANQR uw auteursrecht schendt, kunt u een digitale Millennium Copyright Act (DMCA) takedown notificatie indienen. Om geldig te zijn, moet uw kennisgeving bevatten:'],
      bullets: ['Een fysieke of elektronische handtekening van de eigenaar van het auteursrecht of gemachtigde agent.', 'Identificatie van het auteursrechtelijk beschermde werk waarvan wordt beweerd dat het is geschonden.', 'Identificatie van het materiaal waarvan wordt beweerd dat het inbreuk maakt, met voldoende informatie om het te lokaliseren.', 'Uw contactgegevens (adres, telefoonnummer en e-mailadres).', 'Een verklaring dat u er goed van overtuigd bent dat het gebruik van het materiaal niet is toegestaan door de eigenaar van het auteursrecht.', 'Een verklaring, op straffe van meineed, dat de informatie in uw bericht juist is en dat u de eigenaar bent van het auteursrecht of gemachtigd bent om namens hen op te treden.'],
    },
    {
      heading: 'DMCA Contact',
      paragraphs: ['Verzend DMCA berichten naar: ${CONTACT_EMAIL}', 'Gelieve "DMCA Notice" in de onderwerpregel op te nemen. We zullen reageren op geldige kennisgevingen in overeenstemming met het toepasselijke recht. Merk op dat ANQR QR-codes lokaal genereert op gebruikersapparaten en geen door gebruikers gegenereerde inhoud host.'],
    },
  ],
};

export default contact;
