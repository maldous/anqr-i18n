import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Privaatheidsbeleid',
  description:
    'Inligting wat ANQR insamel, hoe dit gebruik word, en u regte kragtens toepaslike privaatheidswette.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Opsomming',
      paragraphs: [
        "ANQR is 'n QR-kodegenerator met 'n kliënt-eerste benadering. Ons vereis nie dat jy 'n rekening skep nie. QR-kodes word standaard plaaslik in jou blaaier gegenereer — ons het nie toegang tot die inhoud wat jy kodeer nie.",
        "Vir professionele gebruik bied ANQR 'n bedienerkant-API wat QR-kodes genereer vanaf URL-parameters. Wanneer die API gebruik word, word jou QR-inhoud op ons bedieners verwerk om die beeld te lewer, maar word nie gestoor of aangeteken nie.",
        'Ons gebruik Google AdSense vir advertensies en mag ontledingsdienste gebruik. Hierdie dienste versamel inligting deur koekies en soortgelyke tegnologieë. Hierdie beleid verduidelik watter data versamel word, hoe dit gebruik word, en jou regte.',
      ],
    },
    {
      heading: 'Inligting wat ons insamel',
      bullets: [
        'Inligting wat u verskaf: Indien u ons per e-pos of ons kontakvorm kontak, versamel ons u naam, e-posadres en boodskapinhoud.',
        'Outomaties versamelde inligting: Ons gasheerverskaffer (Netlify), advertensievennote en analitiese dienste mag die volgende insamel: IP-adres, blaaiertipe en -weergawe, bedryfstelsel, toesteltipe, verwysende URL, besoekte bladsye, tyd op die webwerf en benaderde geografiese ligging.',
        'Derdeparty-koekies: Ons advertensievennote (Google AdSense) gebruik koekies en soortgelyke tegnologieë om advertensies te bedien en te meet. ANQR self stel geen eersteparty-koekies nie.',
      ],
    },
    {
      heading: 'Koekies en derdepartytegnologieë',
      paragraphs: [
        'ANQR stel geen eersteparty-koekies nie. Jou voorkeure (soos donkermodus) word plaaslik op jou toestel gestoor, wat nie na enige bediener oorgedra word nie.',
        'Ons advertensievennote (Google AdSense) en gasheerverskaffer mag egter koekies en soortgelyke doptegnologieë gebruik:',
      ],
      bullets: [
        'Advertensiekoekies (derdeparty): Ingestel deur Google AdSense en advertensievennote om relevante advertensies te bedien, advertensieprestasie te meet en gebruikersbelange te verstaan. Hierdie koekies kan jou aktiwiteit op verskillende webwerwe dophou.',
        'Analitiese koekies (derdeparty): Kan deur ons gasheerverskaffer of analitiese dienste gebruik word om geanonimiseerde gebruiksdata in te samel.',
      ],
    },
    {
      heading: 'Google AdSense en advertensies',
      paragraphs: [
        'Ons vertoon advertensies deur Google AdSense. Google en sy vennote gebruik koekies om advertensies te vertoon gebaseer op jou blaaigeskiedenis op hierdie webwerf en ander webwerwe (belangstellingsgebaseerde advertensies).',
        'Leer hoe Google jou inligting gebruik: https://policies.google.com/technologies/partner-sites',
        'Bestuur advertensiepersonalisering: https://adssettings.google.com',
        'Kies uit via Netwerkadvertensie-inisiatief: https://optout.networkadvertising.org',
        'Kies uit via Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Hoe ons inligting gebruik',
      bullets: [
        'Om op u navrae te reageer en ondersteuning te bied.',
        'Om relevante advertensies deur ons advertensievennote te vertoon.',
        'Om webwerfgebruik te analiseer en ons dienste te verbeter.',
        'Om bedrog, misbruik en sekuriteitskwessies op te spoor, te voorkom en aan te spreek.',
        'Om aan wetlike verpligtinge te voldoen.',
      ],
    },
    {
      heading: 'Derdepartydienste',
      bullets: [
        'Google AdSense: Ontvang data om advertensies te bedien en te meet.',
        'Analitiese verskaffers: Ontvang geanonimiseerde gebruiksdata.',
        'Netlify (gasheerdienste): Verwerk versoeke en mag IP-adresse aanteken.',
        "Ons verkoop nie u persoonlike inligting nie. Die deel van data met advertensievennote kan egter as 'n verkoop onder CCPA beskou word (sien hieronder).",
      ],
    },
    {
      heading: 'Databewaring',
      bullets: [
        'Kontakvoorleggings: Tot 2 jaar.',
        'Bedienerlogboeke: Tot 30 dae (gasheerverskaffer).',
        'Analitiese data: Tot 26 maande (geanonimiseerd).',
        'Advertensiekoekies: Tipies 13 maande (wissel volgens vennoot).',
      ],
    },
    {
      heading: 'U regte kragtens GDPR (EER-gebruikers)',
      paragraphs: [
        'As u in die Europese Ekonomiese Gebied is, het u die volgende regte kragtens die Algemene Verordening oor Databeskerming:',
      ],
      bullets: [
        "Reg van toegang: Versoek 'n afskrif van persoonlike data wat ons oor u hou.",
        'Reg op regstelling: Versoek regstelling van onakkurate data.',
        'Reg op uitwissing: Versoek die uitwissing van u data (reg om vergeet te word).',
        'Reg om verwerking te beperk: Versoek beperkings op hoe ons u data gebruik.',
        "Reg op dataportabiliteit: Versoek u data in 'n draagbare formaat.",
        'Reg om beswaar te maak: Beswaar maak teen verwerking, insluitend vir direkte bemarking.',
        'Reg om toestemming terug te trek: Trek toestemming te eniger tyd terug waar verwerking op toestemming gebaseer is.',
        "Reg om 'n klagte in te dien: Dien 'n klagte in by u databeskermingsowerheid.",
      ],
    },
    {
      heading: 'GDPR-regsbasis',
      paragraphs: [
        'Ons verwerk data op hierdie basisse: (a) Toestemming — vir gepersonaliseerde advertensies (bestuur deur ons advertensievennote); (b) Wettige belange — vir analise, sekuriteit en verbetering; (c) Kontrak — om op navrae te reageer.',
        'Om u regte uit te oefen, kontak ${CONTACT_EMAIL}. Ons reageer binne 30 dae.',
      ],
    },
    {
      heading: 'Jou regte onder CCPA (Kaliforniese gebruikers)',
      bullets: [
        'Reg om te weet: Versoek inligting oor ingesamelde data, bronne, doeleindes en derde partye.',
        'Reg om te verwyder: Versoek die verwydering van u persoonlike inligting.',
        'Reg om uit te teken: Kies om nie die verkoop van persoonlike inligting te aanvaar nie (deling met advertensievennote kan kwalifiseer).',
        'Reg op nie-diskriminasie: Ons sal nie diskrimineer vir die uitoefening van u regte nie.',
      ],
    },
    {
      heading: 'CCPA-kategorieë versamel',
      paragraphs: [
        'Kategorieë: Identifiseerders (IP-adres, toestel-ID), internetaktiwiteit (blaai, advertensie-interaksies), geolokasie (benader), afleidings (belangstellings uit blaai).',
        'Om regte uit te oefen of te weier: ${CONTACT_EMAIL} of pas koekie-instellings aan.',
      ],
    },
    {
      heading: 'Internasionale oordragte',
      paragraphs: [
        'U inligting kan oorgedra word na lande met verskillende databeskermingswette, insluitend die Verenigde State. Ons gebruik toepaslike waarborge soos Standaard Kontraktuele Klousules.',
      ],
    },
    {
      heading: 'Kinders se privaatheid',
      paragraphs: [
        "ANQR is nie gerig op kinders onder 13 (of 16 in die EER) nie. Ons versamel nie doelbewus data van kinders nie. Kontak ${CONTACT_EMAIL} as u glo dat 'n kind inligting verskaf het.",
      ],
    },
    {
      heading: 'Sekuriteit',
      paragraphs: [
        'Ons gebruik gepaste tegniese en organisatoriese maatreëls om data te beskerm, insluitend HTTPS-enkripsie. Geen internet-oordrag is egter 100% veilig nie.',
      ],
    },
    {
      heading: 'Moenie Opspoor Nie',
      paragraphs: [
        'Ons eerbiedig die Moenie-Spoor-blaaierseine waar moontlik, alhoewel advertensievennote moontlik nie op DNT sal reageer nie.',
      ],
    },
    {
      heading: 'Wysigings aan hierdie beleid',
      paragraphs: [
        "Ons mag hierdie beleid periodiek opdateer. Die Laas opgedateer-datum dui die mees onlangse hersiening aan. Beduidende veranderinge mag via 'n webwerfbanier gekommunikeer word.",
      ],
    },
    {
      heading: 'Kontak ons',
      paragraphs: [
        'Vir privaatheidsvrae of om u regte uit te oefen: ${CONTACT_EMAIL} of gebruik ons Kontakbladsy. Ons reageer binne 30 dae op privaatheidsversoeke.',
      ],
    },
  ],
};

export default privacy;
