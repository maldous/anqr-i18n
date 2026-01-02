import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Tietoja ANQR:stä',
  description:
    'ANQR on ilmainen QR-koodigeneraattori, joka on asiakaslähtöinen – luo QR-koodeja paikallisesti tai käytä API-rajapintaamme upottamiseen.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Mikä on ANQR?',
      paragraphs: [
        'ANQR (lausutaan ankkuri) on ilmainen QR-koodigeneraattori, joka luo skannattavia koodeja URL-osoitteille, tekstille, Wi-Fi-tunnistetiedoille, yhteystietokorteille, kalenteritapahtumille ja muille.',
        'Se on rakennettu yksityishenkilöille, pienyrityksille, markkinoijille ja kehittäjille, jotka haluavat tehokkaita QR-työkaluja ilman rekisteröitymistä. Asiakaslähtöinen suunnittelu tarkoittaa, että QR-koodit luodaan oletuksena paikallisesti selaimessasi, ja valinnainen palvelinsovellusliittymä mahdollistaa ammattimaisen upottamisen ja integroinnin.',
      ],
    },
    {
      heading: 'Tärkeimmät ominaisuudet',
      bullets: [
        'Luo QR-koodeja välittömästi selaimessasi – tiliä ei tarvita.',
        'Mukauta värejä, moduulityylejä, etsimen kuvioita ja lisää kuvapeittokuvia.',
        'Vie useissa muodoissa: PNG, SVG, WebP ja animoitu GIF.',
        'Virheenkorjaustasolle, QR-versiolle, koodaustilalle ja maskin valinnalle lisäasetukset.',
        'Skannausturvallisuusohjeet ja reaaliaikainen esikatselu auttavat pitämään koodit luettavina sekä tulosteessa että näytöllä.',
        'Palvelinpuolen API ammattimaiseen upottamiseen täydellä parametrituella.',
        'Toimii offline-tilassa latauksen jälkeen – se on staattinen verkkosovellus, jota voit käyttää missä tahansa.',
      ],
    },
    {
      heading: 'ANQR:n toimintaperiaate',
      paragraphs: [
        'ANQR toimii selaimessasi ja koodaa syötteesi standardiksi QR-matriisiksi Reed–Solomon-virheenkorjauksella ja renderöi sen sitten valitsemaasi muotoon.',
        'Oletusarvoisesti luonti tapahtuu paikallisesti selaimessasi. Ammattimaisessa käytössä voit myös käyttää palvelinpuolen API:a QR-koodien luomiseen URL-parametrien avulla – täydellinen upotukseen verkkosivustoille, sähköposteihin tai automatisoituihin työnkulkuihin.',
        'Kun lisäät päällekkäiskuvia tai animaatioita, ANQR tasapainottaa tyylin skannauksen luotettavuuteen, jotta tulos pysyy skannattavana.',
        'ANQR keskittyy staattisiin koodeihin (tiedot ovat QR-koodin sisällä). Jos tarvitset dynaamista koodia (muokattavissa oleva kohde), voit koodata oman uudelleenohjausosoitteen tai lyhyen linkin.',
      ],
    },
    {
      heading: 'Kuka ylläpitää ANQR:ää?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Mainonta ja miten pysymme vapaina',
      paragraphs: [
        'ANQR on ilmainen käyttää ja sitä tuetaan mainoksilla. Saatamme näyttää mainoksia Google AdSensen ja/tai muiden mainoskumppaneiden kautta.',
        'Mainosten tarjoajat voivat käyttää evästeitä tai vastaavia tekniikoita mainosten personointiin kiinnostuksen kohteidesi ja selaustoimintasi perusteella. Voit hallita mainosasetuksiasi laitteesi asetuksissa ja Googlen mainosasetuksissa. Lisätietoja on tietosuojakäytännössämme.',
        'Emme myy QR-koodeihin koodaamaasi sisältöä. Mainokset auttavat kattamaan projektin ylläpito- ja parantamiskustannuksia.',
      ],
    },
    {
      heading: 'Avoimet standardit',
      paragraphs: [
        'ANQR luo QR-koodeja ISO/IEC 18004 -standardin mukaisesti ja pyrkii laajaan yhteensopivuuteen skannerien, kameroiden ja tulostustyönkulkujen välillä.',
      ],
    },
    {
      heading: 'Tavaramerkki-ilmoitus',
      paragraphs: [
        'QR Code® on DENSO WAVE INCORPORATEDin rekisteröity tavaramerkki. ANQR ei ole sidoksissa DENSO WAVE INCORPORATEDiin, eikä DENSO WAVE INCORPORATED hyväksy tai sponsoroi sitä.',
      ],
    },
    {
      heading: 'Palaute ja panokset',
      paragraphs: [
        'Otamme mielellämme vastaan palautetta, virheilmoituksia ja ominaisuusehdotuksia. Ota yhteyttä sähköpostitse tai yhteydenottosivun kautta – luemme jokaisen viestin, vaikka vastausajat voivat vaihdella.',
      ],
    },
  ],
};

export default about;
