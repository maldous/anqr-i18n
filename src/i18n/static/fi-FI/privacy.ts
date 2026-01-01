import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Tietosuojakäytäntö',
  description: 'ANQR:n keräämät tiedot, niiden käyttötapa ja oikeutesi sovellettavien tietosuojalakien nojalla.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Yhteenveto',
      paragraphs: ['ANQR on QR-koodigeneraattori, joka on asiakaslähtöinen. Emme vaadi sinua luomaan tiliä. Oletusarvoisesti QR-koodit luodaan paikallisesti selaimessasi – meillä ei ole pääsyä koodaamaasi sisältöön.', 'ANQR tarjoaa ammattikäyttöön palvelinpuolen API:n, joka luo QR-koodeja URL-parametreista. API:a käytettäessä QR-sisältösi käsitellään palvelimillamme kuvan renderöimiseksi, mutta sitä ei tallenneta tai kirjata.', 'Käytämme Google AdSenseä mainontaan ja saatamme käyttää analytiikkapalveluita. Nämä palvelut keräävät tietoja evästeiden ja vastaavien tekniikoiden avulla. Tässä käytännössä selitetään, mitä tietoja kerätään, miten niitä käytetään ja mitkä ovat oikeutesi.'],
    },
    {
      heading: 'Keräämämme tiedot',
      bullets: ['Antamasi tiedot: Jos otat meihin yhteyttä sähköpostitse tai yhteydenottolomakkeemme kautta, keräämme nimesi, sähköpostiosoitteesi ja viestisi sisällön.', 'Automaattisesti kerätyt tiedot: Hosting-palveluntarjoajamme (Netlify), mainoskumppanimme ja analytiikkapalvelut voivat kerätä seuraavia tietoja: IP-osoite, selaintyyppi ja -versio, käyttöjärjestelmä, laitetyyppi, viittaava URL-osoite, vieraillut sivut, sivustolla vietetty aika ja likimääräinen maantieteellinen sijainti.', 'Kolmannen osapuolen evästeet: Mainoskumppanimme (Google AdSense) käyttävät evästeitä ja vastaavia tekniikoita mainosten näyttämiseen ja mittaamiseen. ANQR itse ei aseta ensimmäisen osapuolen evästeitä.'],
    },
    {
      heading: 'Evästeet ja kolmannen osapuolen teknologiat',
      paragraphs: ['ANQR ei aseta ensimmäisen osapuolen evästeitä. Asetuksesi (kuten pimeä tila) tallennetaan paikallisesti laitteellesi, eikä niitä lähetetä millekään palvelimelle.', 'Mainoskumppanimme (Google AdSense) ja hosting-palveluntarjoajamme voivat kuitenkin käyttää evästeitä ja vastaavia seurantatekniikoita:'],
      bullets: ['Mainosevästeet (kolmannen osapuolen): Google AdSensen ja mainoskumppaneiden asettamat evästeet, joiden avulla voidaan näyttää osuvia mainoksia, mitata mainosten tehokkuutta ja ymmärtää käyttäjien kiinnostuksen kohteita. Nämä evästeet voivat seurata toimintaasi eri verkkosivustoilla.', 'Analytiikkaevästeet (kolmannen osapuolen): Palveluntarjoajamme tai analytiikkapalvelumme voivat käyttää näitä evästeitä anonymisoitujen käyttötietojen keräämiseen.'],
    },
    {
      heading: 'Google AdSense ja mainonta',
      paragraphs: ['Näytämme mainoksia Google AdSensen kautta. Google ja sen kumppanit käyttävät evästeitä näyttääkseen mainoksia, jotka perustuvat selaushistoriaasi tällä sivustolla ja muilla verkkosivustoilla (kiinnostuksen kohteisiin perustuva mainonta).', 'Lue, miten Google käyttää tietojasi: https://policies.google.com/technologies/partner-sites', 'Hallinnoi mainosten personointia: https://adssettings.google.com', 'Kieltäydy mainostuksesta Network Advertising Initiativen kautta: https://optout.networkadvertising.org', 'Kieltäydy Digital Advertising Alliancen kautta: https://optout.aboutads.info'],
    },
    {
      heading: 'Kuinka käytämme tietoja',
      bullets: ['Vastataksemme tiedusteluihisi ja tarjotaksemme tukea.', 'Näyttääksemme relevantteja mainoksia mainoskumppaneidemme kautta.', 'Sivuston käytön analysoimiseksi ja palvelujemme parantamiseksi.', 'Petosten, väärinkäytösten ja turvallisuusongelmien havaitsemiseksi, ehkäisemiseksi ja ratkaisemiseksi.', 'Lakisääteisten velvoitteiden noudattamiseksi.'],
    },
    {
      heading: 'Kolmannen osapuolen palvelut',
      bullets: ['Google AdSense: Vastaanottaa tietoja mainosten näyttämistä ja mittaamista varten.', 'Analytiikkapalvelujen tarjoajat: Vastaanota anonymisoitua käyttödataa.', 'Netlify (hosting): Käsittelee pyyntöjä ja saattaa kirjata IP-osoitteita.', 'Emme myy henkilötietojasi. Tietojen jakamista mainoskumppaneiden kanssa voidaan kuitenkin pitää CCPA:n mukaisena myyntinä (katso alla).'],
    },
    {
      heading: 'Tietojen säilytys',
      bullets: ['Yhteystietojen lähettäminen: Jopa 2 vuotta.', 'Palvelinlokit: Enintään 30 päivää (hosting-palveluntarjoaja).', 'Analytiikkatiedot: Jopa 26 kuukautta (anonymisoitu).', 'Mainosevästeet: Tyypillisesti 13 kuukautta (vaihtelee kumppanin mukaan).'],
    },
    {
      heading: 'Oikeutesi GDPR:n nojalla (ETA-alueen käyttäjät)',
      paragraphs: ['Jos olet Euroopan talousalueella, sinulla on seuraavat oikeudet yleisen tietosuoja-asetuksen nojalla:'],
      bullets: ['Oikeus tutustua tietoihin: Pyydä kopio hallussamme olevista sinua koskevista henkilötiedoista.', 'Oikeus oikaisuun: Pyytää virheellisten tietojen korjaamista.', 'Oikeus tietojen poistamiseen: Pyytää tietojesi poistamista (oikeus tulla unohdetuksi).', 'Oikeus rajoittaa käsittelyä: Pyytää rajoituksia tietojesi käyttöön.', 'Oikeus tietojen siirrettävyyteen: Pyydä tietojasi siirrettävässä muodossa.', 'Vastustamisoikeus: Vastustaa käsittelyä, mukaan lukien suoramarkkinointia.', 'Oikeus peruuttaa suostumus: Peruuttaa suostumus milloin tahansa, jos käsittely perustuu suostumukseen.', 'Oikeus tehdä valitus: Tee valitus tietosuojaviranomaiselle.'],
    },
    {
      heading: 'GDPR:n oikeusperusta',
      paragraphs: ['Käsittelemme tietoja seuraavin perustein: (a) Suostumus – personoitua mainontaa varten (mainontakumppaniemme hallinnoimia); (b) Oikeutetut edut – analytiikkaa, turvallisuutta ja parantamista varten; (c) Sopimus – tiedusteluihin vastaamiseksi.', 'Käyttääksesi oikeuksiasi, ota yhteyttä osoitteeseen ${CONTACT_EMAIL}. Vastaamme 30 päivän kuluessa.'],
    },
    {
      heading: 'CCPA:n mukaiset oikeutesi (Kalifornian käyttäjät)',
      bullets: ['Oikeus tietää: Pyytää tietoja kerätyistä tiedoista, lähteistä, tarkoituksista ja kolmansista osapuolista.', 'Oikeus poistaa henkilötietojasi: Pyytää henkilötietojesi poistamista.', 'Oikeus kieltäytyä: Kieltäytyä henkilötietojen myynnistä (jakaminen mainoskumppaneiden kanssa voi olla oikeutettua tähän).', 'Oikeus syrjimättömyyteen: Emme syrji ketään oikeuksien käyttämisen perusteella.'],
    },
    {
      heading: 'Kerätyt CCPA-luokat',
      paragraphs: ['Kategoriat: Tunnisteet (IP-osoite, laitetunnus), Internet-toiminta (selaaminen, mainosten vuorovaikutus), Maantieteellinen sijainti (likimääräinen), Päätelmät (selailusta johtuvat kiinnostuksen kohteet).', 'Oikeuksien käyttämiseksi tai kieltäytymiseksi: ${CONTACT_EMAIL} tai evästeasetusten muuttamiseen.'],
    },
    {
      heading: 'Kansainväliset siirrot',
      paragraphs: ['Tietojasi voidaan siirtää maihin, joissa on erilaiset tietosuojalait, mukaan lukien Yhdysvallat. Käytämme asianmukaisia suojatoimia, kuten vakiosopimuslausekkeita.'],
    },
    {
      heading: 'Lasten yksityisyys',
      paragraphs: ['ANQR ei ole suunnattu alle 13-vuotiaille lapsille (tai alle 16-vuotiaille ETA-alueella). Emme tietoisesti kerää tietoja lapsilta. Ota yhteyttä osoitteeseen ${CONTACT_EMAIL}, jos uskot lapsen antaneen tietoja.'],
    },
    {
      heading: 'Turvallisuus',
      paragraphs: ['Käytämme asianmukaisia teknisiä ja organisatorisia toimenpiteitä tietojen suojaamiseksi, mukaan lukien HTTPS-salausta. Mikään internet-siirto ei kuitenkaan ole 100 % turvallinen.'],
    },
    {
      heading: 'Älä seuraa',
      paragraphs: ['Kunnioitamme Do Not Track -selainsignaaleja mahdollisuuksien mukaan, vaikka mainoskumppanit eivät välttämättä vastaa DNT:hen.'],
    },
    {
      heading: 'Muutokset tähän käytäntöön',
      paragraphs: ['Saatamme päivittää tätä käytäntöä ajoittain. Viimeksi päivitetty -päivämäärä osoittaa viimeisimmän version. Merkittävistä muutoksista voidaan ilmoittaa sivuston bannerin kautta.'],
    },
    {
      heading: 'Ota yhteyttä',
      paragraphs: ['Tietosuojaan liittyvissä kysymyksissä tai oikeuksiesi käyttämiseksi: ${CONTACT_EMAIL} tai käytä yhteydenottosivuamme. Vastaamme tietosuojapyyntöihin 30 päivän kuluessa.'],
    },
  ],
};

export default privacy;
