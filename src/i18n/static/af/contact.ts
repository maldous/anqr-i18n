import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontak Ons',
  description: 'Ons verwelkom terugvoer, foutverslae, versoeke vir funksies en algemene navrae.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Hoe om ons te bereik',
      paragraphs: [
        'Ons bied verskeie maniere om ons te kontak, afhangende van u behoeftes. Ons lees elke boodskap, hoewel reaksietye kan wissel na gelang van die volume en tipe navraag.',
      ],
    },
    {
      heading: 'E-pos',
      paragraphs: [
        'Vir alle navrae: ${CONTACT_EMAIL}',
        'Dit is die betroubaarste manier om ons te bereik en word aanbeveel vir gedetailleerde vrae, sake-navrae of enige ander navrae.',
      ],
    },
    {
      heading: 'Tipes navrae',
      bullets: [
        'Algemene vrae: Vrae oor hoe om ANQR te gebruik, verduidelikings van funksies of algemene terugvoer.',
        'Foutverslae: Sluit asseblief u blaaier, bedryfstelsel, stappe om te reproduseer en enige foutboodskappe wat u sien in.',
        'Funksieversoeke: Voorstelle vir nuwe funksies of verbeterings. Ons oorweeg alle versoeke, hoewel ons nie implementering kan belowe nie.',
        'Besigheidsnavrae: Vennootskapsgeleenthede, lisensiëringsvrae of kommersiële gebruiksnavrae.',
        'Privaatheidsversoeke: Versoeke om u privaatheidsregte kragtens GDPR, CCPA of ander privaatheidswette uit te oefen (sien Privaatheidsbeleid).',
        'DMCA/Kopiereg: Sien die DMCA-afdeling hieronder vir vereistes vir verwyderingskennisgewing.',
      ],
    },
    {
      heading: 'Reaksietye',
      paragraphs: [
        'Ons doel is om binne 5-7 werksdae op navrae te reageer. Privaatheidsverwante versoeke sal binne 30 dae aangespreek word soos deur die wet vereis.',
        'Gedurende besige tye kan reaksietye langer wees. Vir dringende sake, dui asseblief DRINGEND in u onderwerpreël aan.',
      ],
    },
    {
      heading: 'Voordat u ons kontak',
      paragraphs: [
        'Kyk asseblief na ons Dokumentasie-bladsy vir antwoorde op algemene vrae oor hoe om ANQR-funksies te gebruik. Baie vrae oor QR-kodegenerering, stilering en uitvoeropsies word daar gedek.',
      ],
    },
    {
      heading: 'DMCA-kopieregkennisgewings',
      paragraphs: [
        "As u glo dat inhoud wat op ANQR beskikbaar is, u kopiereg skend, kan u 'n kennisgewing van verwydering ingevolge die Wet op Kopiereg van die Digitale Millennium (DMCA) indien. Om geldig te wees, moet u kennisgewing die volgende insluit:",
      ],
      bullets: [
        "'n Fisiese of elektroniese handtekening van die kopiereghouer of gemagtigde agent.",
        'Identifikasie van die kopieregbeskermde werk wat beweer word geskend te wees.',
        'Identifikasie van die materiaal wat beweer word inbreuk te maak, met voldoende inligting om dit op te spoor.',
        'Jou kontakbesonderhede (adres, telefoonnommer en e-posadres).',
        "'n Verklaring dat u te goeder trou glo dat die gebruik van die materiaal nie deur die kopiereghouer gemagtig is nie.",
        "'n Verklaring, onder eed, dat die inligting in u kennisgewing akkuraat is en dat u die kopiereghouer is of gemagtig is om namens hulle op te tree.",
      ],
    },
    {
      heading: 'DMCA Kontak',
      paragraphs: [
        'Stuur DMCA-kennisgewings aan: ${CONTACT_EMAIL}',
        'Sluit asseblief DMCA-kennisgewing in die onderwerpreël in. Ons sal op geldige kennisgewings reageer in ooreenstemming met toepaslike wetgewing. Let daarop dat ANQR QR-kodes plaaslik op gebruikerstoestelle genereer en nie gebruikersgegenereerde inhoud huisves nie.',
      ],
    },
  ],
};

export default contact;
