import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const about: PageDefinition = {
  title: '"Oor ANQR”',
  description: '"ANQR is \'n gratis QR-kodegenerator met \'n kliënt-eerste benadering — genereer QR-kodes plaaslik of gebruik ons API vir inbedding.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Wat is ANQR?”',
      paragraphs: [
        '"ANQR (uitgespreek "anker") is \'n gratis QR-kodegenerator wat skandeerbare kodes skep vir URL\'e, teks, Wi-Fi-besonderhede, kontakkaarte, kalendergeleenthede en meer.”',
        '"Dit is gebou vir individue, klein besighede, bemarkers en ontwikkelaars wat kragtige QR-gereedskap wil hê sonder om aan te meld. Die kliënt-eerste ontwerp beteken dat QR-kodes standaard plaaslik in jou blaaier gegenereer word, met \'n opsionele bediener-API vir professionele inbedding en integrasie.”',
      ],
    },
    {
      heading: '"Belangrike kenmerke”',
      bullets: [
        '"Genereer QR-kodes onmiddellik in jou blaaier — geen rekening nodig nie.”',
        '"Pas kleure, modulestyle, soekerpatrone aan en voeg beeldoorlegsels by.”',
        '"Voer uit in verskeie formate: PNG, SVG, WebP en geanimeerde GIF.”',
        '"Gevorderde kontroles vir foutkorreksievlak, QR-weergawe, koderingsmodus en maskerkeuse.”',
        '"Skandeerveiligheidsriglyne en regstreekse voorskou om kodes leesbaar te hou in drukwerk en op skerms.”',
        '"Bedienerkant-API vir professionele inbedding met volle parameterondersteuning.”',
        '"Werk vanlyn sodra dit gelaai is — dit is \'n statiese webtoepassing wat jy enige plek kan laat loop.”',
      ],
    },
    {
      heading: '"Hoe ANQR werk”',
      paragraphs: [
        '"ANQR loop in jou blaaier en kodeer jou invoer in \'n standaard QR-matriks met Reed-Solomon-foutkorreksie, en lewer dit dan na die formaat wat jy kies.”',
        '"Standaard vind generering plaaslik in jou blaaier plaas. Vir professionele gebruik kan jy ook die bedienerkant-API gebruik om QR-kodes via URL-parameters te genereer – perfek vir inbedding in webwerwe, e-posse of outomatiese werkvloeie.”',
        '"Wanneer jy oorlegsels of animasies byvoeg, balanseer ANQR stilering met skanderingsbetroubaarheid sodat die resultaat skandeerbaar bly.”',
        '"ANQR fokus op statiese kodes (die data is binne die QR). As jy \'n dinamiese kode (wysigbare bestemming) benodig, kan jy jou eie aanstuur-URL of kort skakel kodeer.”',
      ],
    },
    {
      heading: '"Wie bedryf ANQR?”',
      paragraphs: [
        '"ANQR word as \'n onafhanklike webhulpmiddel bedryf. Vir vrae, ondersteuning of sake-navrae, gebruik asseblief die Kontak-bladsy of e-pos”' + CONTACT_EMAIL + '".”',
      ],
    },
    {
      heading: '"Advertering en hoe ons vry bly”',
      paragraphs: [
        '"ANQR is gratis om te gebruik en word deur advertensies ondersteun. Ons mag advertensies via Google AdSense en/of ander advertensievennote wys.”',
        '"Advertensieverskaffers kan koekies of soortgelyke tegnologieë gebruik om advertensies te personaliseer gebaseer op jou belangstellings en blaai-aktiwiteit. Jy kan advertensievoorkeure in jou toestelinstellings en deur Google-advertensie-instellings bestuur, en meer leer in ons Privaatheidsbeleid.”',
        '"Ons verkoop nie die inhoud wat jy in QR-kodes enkodeer nie. Advertensies help om die koste van die bestuur en verbetering van die projek te dek.”',
      ],
    },
    {
      heading: '"Oop standaarde”',
      paragraphs: [
        '"ANQR genereer QR-kodes gebaseer op die ISO/IEC 18004-standaard en streef na breë versoenbaarheid tussen skandeerders, kameras en drukwerkvloei.”',
      ],
    },
    {
      heading: '"Handelsmerkkennisgewing”',
      paragraphs: [
        '"QR Code® is \'n geregistreerde handelsmerk van DENSO WAVE INCORPORATED. ANQR is nie geaffilieer met, onderskryf deur of geborg deur DENSO WAVE INCORPORATED nie.”',
      ],
    },
    {
      heading: '"Terugvoer en bydraes”',
      paragraphs: [
        '"Ons verwelkom terugvoer, foutverslae en voorstelle vir funksies. Kontak ons asseblief per e-pos of die kontakbladsy — ons lees elke boodskap, alhoewel reaksietye kan wissel.”',
      ],
    },
  ],
};

export default about;
