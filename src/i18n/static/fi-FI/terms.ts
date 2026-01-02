import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Käyttöehdot',
  description: 'Käyttämällä sivustoa hyväksyt nämä ehdot.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Ehtojen hyväksyminen',
      paragraphs: [
        'Käyttämällä ANQR:ää (anqr.link) hyväksyt nämä käyttöehdot ja tietosuojakäytäntömme. Jos et hyväksy näitä ehtoja, älä käytä sivustoa.',
        'Saatamme päivittää näitä ehtoja aika ajoin. Sivuston käytön jatkaminen muutosten jälkeen merkitsee uusien ehtojen hyväksymistä.',
      ],
    },
    {
      heading: 'Kelpoisuus',
      paragraphs: [
        'Sinun on oltava vähintään 13-vuotias käyttääksesi ANQR:ää. Käyttämällä sivustoa vakuutat, että täytät tämän ikävaatimuksen. Jos olet alle 18-vuotias, vakuutat, että sinulla on vanhempasi tai huoltajasi lupa käyttää sivustoa.',
      ],
    },
    {
      heading: 'Sallittu käyttö',
      paragraphs: [
        'Saat käyttää ANQR-koodeja vain laillisiin tarkoituksiin. Olet yksin vastuussa QR-koodeihin koodaamastasi sisällöstä ja siitä, miten käytät luomiasi QR-koodeja.',
      ],
    },
    {
      heading: 'Kielletty käytös',
      paragraphs: ['Sitoudut olemaan tekemättä seuraavaa:'],
      bullets: [
        'Käytä ANQR:ää luodaksesi QR-koodeja, jotka helpottavat tietojenkalastelua, haittaohjelmien levittämistä, petoksia, huijauksia, häirintää, kunnianloukkausta tai muuta laitonta toimintaa.',
        'Koodaa sisältöä, joka loukkaa immateriaalioikeuksia, yksityisyyttä tai sisältää laitonta materiaalia.',
        'Yrittää häiritä, ylikuormittaa tai häiritä sivuston toimintaa tai turvallisuutta.',
        'Palauttaa lähdekoodia, purkaa sitä tai yrittää purkaa sitä sivustolta.',
        'Käytä automatisoituja työkaluja (botteja, kaavimia) sivuston käyttämiseen tavalla, joka heikentää suorituskykyä muilta käyttäjiltä.',
        'Kierrä tai poista käytöstä kaikki turvallisuus- tai käyttöoikeuksien hallintaominaisuudet.',
        'Esiytyä toiseksi henkilöksi tai yhteisöksi tai esittää väärin yhteyksiäsi.',
      ],
    },
    {
      heading: 'Immateriaalioikeudet',
      paragraphs: [
        'Säilytät QR-koodeihin koodaamasi sisällön omistusoikeuden. ANQR ei vaadi tietojesi omistusoikeutta.',
        'ANQR-nimi, logo, käyttöliittymäsuunnittelu ja pohjana oleva koodi ovat tekijänoikeus-, tavaramerkki- ja muiden immateriaalioikeuslakien suojaamia. Et saa kopioida, muokata, levittää tai luoda johdannaisteoksia ilman lupaamme.',
        'QR Code® on DENSO WAVE INCORPORATEDin rekisteröity tavaramerkki. ANQR ei ole sidoksissa DENSO WAVEen.',
      ],
    },
    {
      heading: 'Käyttäjäsisällön lisenssi',
      paragraphs: [
        'Käyttämällä ANQR:ää et anna meille mitään oikeuksia sisältöösi. Paikallista luontia käytettäessä (oletusarvo) kaikki QR-koodien luonti tapahtuu selaimessasi, emmekä käytä, tallenna tai lähetä koodattuja tietojasi.',
        'Palvelinpuolen API:a käytettäessä sisältöäsi käsitellään QR-kuvan luomiseksi, mutta sitä ei tallenneta, kirjata tai käytetä mihinkään muuhun tarkoitukseen kuin pyydetyn kuvan renderöintiin.',
      ],
    },
    {
      heading: 'Kolmannen osapuolen palvelut ja mainonta',
      paragraphs: [
        'Sivusto näyttää mainoksia Google AdSensen kautta ja saattaa sisältää linkkejä kolmansien osapuolten verkkosivustoille. Emme ole vastuussa kolmansien osapuolten sisällöstä, palveluista tai tietosuojakäytännöistä.',
        'Vuorovaikutuksesi mainostajien ja kolmansien osapuolten kanssa on yksinomaan sinun ja heidän välistä. Tietosuojakäytännössämme on lisätietoja mainostietojen käsittelystä.',
      ],
    },
    {
      heading: 'Takuiden vastuuvapauslauseke',
      paragraphs: [
        'ANQR TARJOTAAN SELLAISENAAN JA SAATAVUUDEN MUKAAN ILMAN MINKÄÄNLAISIA NIMENOMAISIA TAI OLETETTUJA TAKUITA, MUKAAN LUKIEN, MUTTA EI RAJOITTUEN, OLETETUT TAKUUT MYYNTIKELPOISUUDESTA, SOPIVUUDESTA TIETTYYN TARKOITUKSEEN JA OIKEUKSIEN LOUKKAAMATTOMUUDESTA.',
        'Emme takaa, että: (a) sivusto toimii keskeytyksettä, turvallisesti tai virheettömästi; (b) QR-koodit skannataan kaikissa ympäristöissä, kaikilla laitteilla tai kaikilla skannerisovelluksilla; (c) sivusto täyttää vaatimuksesi.',
        'QR-koodit tulisi aina testata niissä olosuhteissa, joissa niitä käytetään (tulostuskoko, valaistus, näytön tyyppi, etäisyys, kameran laatu).',
      ],
    },
    {
      heading: 'Vastuunrajoitus',
      paragraphs: [
        'LAIN SALLIMISSA RAJOISSA ANQR JA SEN YLLÄPITÄJÄT, TYTYRYHTIÖT JA LISENSINANTAJAT EIVÄT OLE VASTUUSSA MISTÄÄN SUORISTA, VÄLILLISISTÄ, SATUNNAISISTA, ERITYISISTÄ, VÄLILLISISTÄ, RANGAISTUSLUONTOISISTA TAI RANGAISTUSLUONTOISISTA VAHINGOISTA, MUKAAN LUKIEN, MUTTA EI RAJOITTUEN NIITÄ, VAHINGOT VOITON, TULOJEN, TIETOJEN, GOODWILLIN, KÄYTÖN TAI MUIDEN AINEETTOMIEN MENETYKSISTÄ, JOTKA JOHTUVAT PALVELUN KÄYTÖSTÄ TAI KÄYTTÖKELVOTTOMUUDESTA TAI LIITTYVÄT SIIHEN.',
        'YMMÄRRÄT JA HYVÄKSYT NIMENOMAISESTI, ETTÄ KÄYTÄT PALVELUTTA OMALLA VASTUULLASI. PALVELU TARJOTAAN ILMAISEKSI, JA NIIDEN MUKAAN HYVÄKSYT, ETTÄ ANQR JA SEN YLLÄPITÄJÄT EIVÄT OLE MISSÄÄN VASTUUSSA SINULLE MISTÄÄN VAHINGOISTA TAI MENETYKSISTÄ. KOKONAISVASTUUMME EI MISSÄÄN TAPAUKSESSA YLITÄ NOLLA DOLLARIA (0 AUD).',
        'SITOUDUT VAPAUTTAMAAN JA LUOVUMAAN KAIKISTA VAATIMUKSISTA, KANTEISTA JA SYYISTÄ ANQR:ÄÄ JA SEN YLLÄPITÄJIÄ VASTAAN, JOTKA JOHTUVAT PALVELUN KÄYTÖSTÄSI.',
        'JOILLAKIN LAINKÄYTTÖALUEILLA TIETTYJEN TAKUIDEN TAI VASTUUNRAJOITUSTEN POISSULKEMINEN EI OLE SALLITTU. TÄLLAISISSA LAINKÄYTTÖALUEILLA VASTUUMME RAJOITTUU SOVELLETTAVAN LAIN SALLIMISSA ENIMMÄISMÄÄRÄSSÄ.',
      ],
    },
    {
      heading: 'Vahingonkorvaus',
      paragraphs: [
        'Sitoudut korvaamaan ANQR:lle, sen ylläpitäjille, tytäryhtiöille ja heidän toimihenkilöilleen, johtajilleen, työntekijöilleen ja edustajille kaikki vaatimukset, vahingot, tappiot, vastuut, kustannukset ja kulut (mukaan lukien oikeudenkäyntikulut), jotka johtuvat: (a) sivuston käytöstäsi; (b) näiden ehtojen rikkomisestasi; (c) kolmansien osapuolten oikeuksien rikkomisestasi; (d) kaikesta QR-koodeihin koodaamastasi sisällöstä.',
      ],
    },
    {
      heading: 'Riitojenratkaisu',
      paragraphs: [
        'Näistä ehdoista tai ANQR:n käytöstäsi johtuvat riidat yritetään ensisijaisesti ratkaista epävirallisilla neuvotteluilla ottamalla yhteyttä osoitteeseen ${CONTACT_EMAIL}.',
        'Jos epävirallinen sovintoratkaisu epäonnistuu, riidat ratkaistaan sitovalla välimiesmenettelyllä Victoriassa, Australiassa, paitsi että kumpi tahansa osapuoli voi hakea tuomioistuimelta kieltomääräystä immateriaalioikeusloukkausten johdosta.',
      ],
    },
    {
      heading: 'Ryhmäkanteesta luopuminen',
      paragraphs: [
        'LAIN SALLIMISSA RAJOISSA HYVÄKSYTTE, ETTÄ RIITOJEN RATKAISUMENETTELYJÄ KÄYTETÄÄN VAIN YKSILÖTASOLLA EIKÄ RYHMÄKANTEINA, YHDISTETTYNÄ KANTENA TAI EDUSTAJAKANTENA.',
      ],
    },
    {
      heading: 'Sovellettava laki',
      paragraphs: [
        'Näihin ehtoihin sovelletaan Victorian, Australian, lakia lainvalintasäännöistä riippumatta. Hyväksyt Victorian, Australian, tuomioistuinten yksinomaisen toimivallan.',
      ],
    },
    {
      heading: 'Muutokset ja saatavuus',
      paragraphs: [
        'Voimme muokata, keskeyttää tai lopettaa sivuston (tai minkä tahansa sen osan) milloin tahansa ilman erillistä ilmoitusta tai vastuuta.',
        'Voimme päivittää näitä ehtoja milloin tahansa. Viimeksi päivitetty -päivämäärä osoittaa, milloin niitä on viimeksi tarkistettu. Käytön jatkaminen muutosten jälkeen katsotaan niiden hyväksymiseksi.',
      ],
    },
    {
      heading: 'Erittävyys',
      paragraphs: [
        'Jos jokin näiden ehtojen määräys katsotaan pätemättömäksi tai täytäntöönpanokelvottomaksi, kyseistä määräystä sovelletaan sallitussa enimmäislaajuudessa, ja muut määräykset pysyvät täysin voimassa.',
      ],
    },
    {
      heading: 'Luopuminen',
      paragraphs: [
        'Se, ettemme pane täytäntöön mitään näiden ehtojen mukaista oikeutta tai määräystä, ei katsota kyseisestä oikeudesta tai määräyksestä luopumiseksi.',
      ],
    },
    {
      heading: 'Kokonaissopimus',
      paragraphs: [
        'Nämä ehdot yhdessä tietosuojakäytäntömme kanssa muodostavat sinun ja ANQR:n välisen koko sopimuksen sivuston käytöstäsi ja korvaavat kaikki aiemmat sopimukset.',
      ],
    },
    {
      heading: 'Ylivoimainen este',
      paragraphs: [
        'Emme ole vastuussa mistään suorituskyvyn epäonnistumisesta tai viivästyksestä, joka johtuu kohtuullisen hallintamme ulkopuolella olevista olosuhteista, mukaan lukien luonnonkatastrofit, sota, terrorismi, mellakat, hallituksen toimet tai internet-/infrastruktuurihäiriöt.',
      ],
    },
    {
      heading: 'Yhteystiedot',
      paragraphs: ['Kysymykset näistä ehdoista voi lähettää osoitteeseen: ${CONTACT_EMAIL}'],
    },
  ],
};

export default terms;
