import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'Ota yhteyttä',
  description: '”Otamme mielellämme vastaan palautetta, virheilmoituksia, ominaisuuspyyntöjä ja yleisiä tiedusteluja.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Näin meihin pääsee',
      paragraphs: [
        '”Tarjoamme useita tapoja ottaa meihin yhteyttä tarpeidesi mukaan. Luemme jokaisen viestin, vaikka vastausajat voivat vaihdella viestimäärän ja kyselytyypin mukaan.”',
      ],
    },
    {
      heading: '"Sähköposti”',
      paragraphs: [
        '”Kaikki tiedustelut: ${CONTACT_EMAIL}”',
        '”Tämä on luotettavin tapa tavoittaa meidät, ja sitä suositellaan yksityiskohtaisiin kysymyksiin, liiketoimintatiedusteluihin tai muihin tiedusteluihin.”',
      ],
    },
    {
      heading: '”Tiedustelutyypit”',
      bullets: [
        '”Yleisiä kysymyksiä: Kysymyksiä ANQR:n käytöstä, ominaisuuksien selityksistä tai yleisestä palautteesta.”',
        '”Virheilmoitukset: Liitä mukaan selaimesi, käyttöjärjestelmäsi, virheen toistamisen vaiheet ja kaikki näkemäsi virheilmoitukset.”',
        '”Ominaisuuspyynnöt: Ehdotuksia uusiksi ominaisuuksiksi tai parannuksiksi. Harkitsemme kaikkia pyyntöjä, vaikka emme voi luvata toteutusta.”',
        '”Liiketoimintaan liittyvät tiedustelut: Yhteistyömahdollisuudet, lisensointikysymykset tai kaupalliseen käyttöön liittyvät tiedustelut.”',
        '”Tietosuojapyynnöt: Pyynnöt käyttää yksityisyyden suojaan liittyviä oikeuksiasi GDPR:n, CCPA:n tai muiden tietosuojalakien nojalla (katso tietosuojakäytäntö).”',
        '”DMCA/Tekijänoikeus: Katso poistoilmoitusta koskevat vaatimukset alta DMCA-osiosta.”',
      ],
    },
    {
      heading: '”Vastausajat”',
      paragraphs: [
        '”Pyrimme vastaamaan tiedusteluihin 5–7 arkipäivän kuluessa. Tietosuojaan liittyviin pyyntöihin vastataan lain edellyttämällä tavalla 30 päivän kuluessa.”',
        '”Ruhka-aikoina vastausajat voivat olla pidempiä. Kiireellisissä asioissa merkitkää otsikkoriville ”KIIREELLINEN”.”',
      ],
    },
    {
      heading: 'Ennen kuin otat meihin yhteyttä',
      paragraphs: [
        '”Katso dokumentaatiosivultamme vastauksia yleisiin kysymyksiin ANQR-ominaisuuksien käytöstä. Siellä käsitellään monia QR-koodien luomiseen, muotoiluun ja vientivaihtoehtoihin liittyviä kysymyksiä.”',
      ],
    },
    {
      heading: '”DMCA-tekijänoikeusilmoitukset”',
      paragraphs: [
        '”Jos uskot, että ANQR:ssä saatavilla oleva sisältö loukkaa tekijänoikeuksiasi, voit lähettää Digital Millennium Copyright Act (DMCA) -poistoilmoituksen. Jotta ilmoituksesi olisi pätevä, sen on sisällettävä:”',
      ],
      bullets: [
        '”Tekijänoikeuden haltijan tai valtuutetun edustajan fyysinen tai sähköinen allekirjoitus.”',
        '”Tekijänoikeuksilla suojatun teoksen, jonka väitetään loukatun, tunnistetiedot.”',
        '”Tekijänoikeuksia loukkaavaksi väitetyn materiaalin yksilöinti ja riittävät tiedot sen paikantamiseksi.”',
        '”Yhteystietosi (osoite, puhelinnumero ja sähköpostiosoite).”',
        '”Lausunto, jossa vilpittömästi uskot, että tekijänoikeuden haltija ei ole antanut lupaa materiaalin käyttöön.”',
        '”Lausunto väärän valaehtoisen rangaistuksen uhalla siitä, että ilmoituksessasi annetut tiedot ovat oikein ja että olet tekijänoikeuden haltija tai sinulla on valtuudet toimia hänen puolestaan.”',
      ],
    },
    {
      heading: '”DMCA-yhteystiedot”',
      paragraphs: [
        '”Lähetä DMCA-ilmoitukset osoitteeseen: ${CONTACT_EMAIL}”',
        '”Kirjoita otsikkoriville ”DMCA-ilmoitus”. Vastaamme päteviin ilmoituksiin sovellettavan lain mukaisesti. Huomaa, että ANQR luo QR-koodeja paikallisesti käyttäjien laitteille eikä ylläpidä käyttäjien luomaa sisältöä.”',
      ],
    },
  ],
};

export default contact;
