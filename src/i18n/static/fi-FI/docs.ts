import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR-käyttöopas',
  description: 'Täydellinen opas ANQR:n käyttöön QR-koodien luomiseen.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Aloitusopas',
      paragraphs: ['ANQR on QR-koodigeneraattori, joka käyttää asiakaslähtöistä lähestymistapaa. Oletusarvoisesti QR-koodit luodaan paikallisesti selaimessasi – tiliä ei tarvita ja tietosi pysyvät yksityisinä. Ammattimaiseen upottamiseen voit käyttää myös palvelinpuolen API:a.', 'Käyttöliittymässä on kolme käyttöliittymätasoa: Perus, Edistynyt ja Ammattimainen. Valitse tasosi otsikon välilehtien avulla. Jokainen taso avaa lisäominaisuuksia ja pitää käyttöliittymän keskittyneenä siihen, mitä tarvitset.'],
      bullets: ['Perus: Yksinkertainen QR-koodin luonti pelkkää tekstiä/URL-sisältöä ja kuvallista päällekkäisyyttä käyttäen.', 'Lisäasetukset: QR-koodausasetukset, renderöintityylit, animaatio, tulostusmuodot, laajennetut sisältötyypit ja päällekkäiskuvan mukauttaminen.', 'Ammattimainen: Vesileimat, metatiedot, jakaminen, turvallisuusanalyysi, maksujen QR-koodit ja yritysominaisuudet.'],
    },
    {
      heading: 'Pika-aloitus',
      paragraphs: ['Ensimmäisen QR-koodisi luominen:'],
      bullets: ['1. Valitse sisällön tyyppi (URL, teksti, WiFi jne.) Sisältötyyppi-pudotusvalikosta.', '2. Syötä tietosi niille varattuihin kenttiin.', '3. Voit halutessasi mukauttaa värejä ja tyylejä sekä lisätä päällekkäiskuvan.', '4. Lataa QR-koodisi PNG-, GIF-, WebP- tai SVG-muodossa napsauttamalla Vie.'],
    },
    {
      heading: 'Perusominaisuudet',
      paragraphs: ['Perustaso tarjoaa virtaviivaisen käyttöliittymän QR-koodien luomiseen hyötykuorman ja kuvapeittokuvien avulla. Tämä on yksinkertaisin tapa aloittaa.'],
    },
    {
      heading: 'Sisältötyypit (perusasetukset)',
      paragraphs: ['Selkeä teksti: Koodaa mitä tahansa tekstiä QR-koodin kapasiteettirajaan asti. Ihanteellinen lyhyille viesteille, koodeille tai tunnisteille.', 'URL: Koodaa verkko-osoitteita. QR-koodi avaa URL-osoitteen skannattaessa. Tukee http://- ja https://-protokollia.'],
    },
    {
      heading: 'Kuvan päällekkäisyys (perus)',
      paragraphs: ['Lähetä kuva (JPG, PNG, GIF, WebP) yhdistettäväksi QR-koodiisi. Perusominaisuuksiin kuuluvat:'],
      bullets: ['Lataa tiedostosta: Valitse kuva laitteeltasi.', 'Lataa URL-osoitteesta: Anna kuvan URL-osoite (CORS on sallittava).', 'Keskitetty logo: Sijoittaa kuvan keskelle virheenkorjauksen avulla.', 'Sekoitus: Kuvan yksinkertainen alfa-sekoitus QR-kuviolla.', 'Intensiteetti: Määrittää, kuinka voimakkaasti peittokuva vaikuttaa QR-koodiin (0–100 %).', 'Väritila: Täysvärinen, harmaasävy tai mustavalkoinen.', 'Säilytä Finder-kuviot: Säilyttää kulmakuviot muokkaamattomina luotettavan skannauksen takaamiseksi.'],
    },
    {
      heading: 'Lisäominaisuudet',
      paragraphs: ['Edistynyt taso avaa QR-koodausvaihtoehdot, renderöintityylit, animaatiot, tulostusmuodot, laajennetut sisältötyypit ja edistyneet peittokuvien mukauttamisvaihtoehdot.'],
    },
    {
      heading: 'QR-koodausasetukset',
      paragraphs: ['Versio: QR-koodeja on saatavilla versioina 1–40, ja uudemmat versiot sisältävät enemmän tietoa, mutta ovat suurempia. Aseta arvoksi 0 (Automaattinen), jos haluat ANQR:n valitsevan pienimmän version, joka sopii sisältöösi.', 'Virheenkorjaus: Määrittää, kuinka paljon vaurioita QR-koodi voi kestää pysyäkseen skannattavana.'],
      bullets: ['L (Low): 7 %:n virheenkorjaus – pienin koko, vähiten redundanssia.', 'M (Keskitaso): 15 %:n virheenkorjaus – tasapainotettu vaihtoehto.', 'Q (kvartiili): 25 %:n virheenkorjaus – hyvä tulostetuille koodeille.', 'H (korkea): 30 %:n virheenkorjaus – paras päällekkäisiä koodeja tai ankarissa olosuhteissa käytettäville koodeille.'],
    },
    {
      heading: 'Hiljainen alue (marginaali)',
      paragraphs: ['Hiljainen alue on QR-koodin ympärillä oleva tyhjä tila. Skannerit tarvitsevat tämän marginaalin havaitakseen koodin alun. Standardi suosittelee vähintään neljää moduulia. Alle neljän moduulin pienentäminen voi aiheuttaa skannausongelmia.'],
    },
    {
      heading: 'Moduulin tyyli',
      paragraphs: ['Moduulit ovat yksittäisiä neliöitä, jotka muodostavat QR-koodin. ANQR tarjoaa viisi tyyliä:'],
      bullets: ['Neliö: Klassinen QR-ulkonäkö terävillä kulmilla.', 'Pyöristetty: Pehmennetyt kulmat ystävällisemmän ilmeen saavuttamiseksi.', 'Pisteitä: Pyöreitä moduuleja moderniin estetiikkaan.', 'Timantti: 45° kierretyt neliöt erottuvan kuvion aikaansaamiseksi.', 'Yhdistetty: Moduulit yhdistyvät vierekkäin ollessaan luoden orgaanisia muotoja.'],
    },
    {
      heading: 'Finder-kuvion tyyli',
      paragraphs: ['Finder-kuviot ovat QR-kulmissa olevia kolmea suurta neliötä, jotka auttavat skannereita suuntaamaan koodin. Saatavilla olevat tyylit:'],
      bullets: ['Neliö: Vakiomuotoiset suorakulmaiset kulmat.', 'Pyöristetty: Pehmennetyt kulmat, jotka sopivat pyöristetyn moduulin tyyliin.', 'Ympyrä: Pyöreät etsintäkuviot pistemäisille koodeille.'],
    },
    {
      heading: 'Kohdistus- ja ajoitusmallit',
      paragraphs: ['Suuremmissa QR-koodeissa (versio 2+) näkyy kohdistuskuvioita vääristymien korjaamiseksi. Ajoituskuviot ovat vuorottelevia viivoja, jotka yhdistävät etsimen kuvioita.'],
      bullets: ['Tasaustyyli: Match Finder, Neliö, Pyöristetty tai Ympyrä.', 'Ajoitustyyli: Vastaa moduulia, yhtenäinen tai katkoviiva.'],
    },
    {
      heading: 'Värit',
      paragraphs: ['Etuala: QR-moduulien väri. Musta (#000000) on vakio, mutta mikä tahansa tumma väri toimii.', 'Tausta: Taustaväri. Valkoinen (#ffffff) on vakio. Varmista, että kontrasti etualaan nähden on riittävä.', 'Läpinäkyvä tausta: Poista tausta kokonaan värillisillä pinnoilla käytettäväksi. Varmista, että pinta tarjoaa riittävän kontrastin.'],
    },
    {
      heading: 'Moduulin koko ja rako',
      paragraphs: ['Moduulin koko: Määrittää, kuinka suurena kukin moduuli renderöidään pikseleinä. Suuremmat arvot luovat suurempia ja helpommin luettavia koodeja.', 'Moduuliväli: Lisää moduulien välistä tilaa prosentteina. Pienet välit (5–15 %) voivat parantaa skannattavuutta joissakin olosuhteissa, mutta liialliset välit heikentävät luotettavuutta.'],
    },
    {
      heading: 'Lähtöasetukset',
      paragraphs: ['Muoto: Valitse vientimuoto käyttötapauksen mukaan.'],
      bullets: ['PNG: Häviötön rasterimuoto, ihanteellinen useimpiin käyttötarkoituksiin. Paras tulostettavaksi ja digitaaliseksi.', 'WebP: Moderni muoto, jonka tiedostokoko on pienempi. Hyvä verkkokäyttöön.', 'GIF: Pakollinen animoiduille QR-koodeille. Tukee läpinäkyvyyttä.', 'SVG: Vektorimuoto, joka skaalautuu äärettömästi. Paras suurikokoiselle tulosteelle tai kun koodia on muokattava.'],
    },
    {
      heading: 'Lähtömitat',
      paragraphs: ['Leveys/Korkeus: Aseta tulostuskoko pikseleinä. Tulostettaessa laske DPI:n perusteella (esim. 300 DPI 1 tuumalla = 300 pikseliä). Suuremmat koot skannaavat luotettavammin etäisyydeltä.'],
    },
    {
      heading: 'Animaatioasetukset (Lisäasetukset)',
      paragraphs: ['Animoitujen QR-koodien toiminnan hallinta:'],
      bullets: ['Nopeus: Animaation kuvataajuus millisekunteina.', 'Silmukka: Jatkuva tai yhden toiston animaatio.', 'Bounce: Ping-pong-animaation suunta.', 'Aloituskehys: Aloita animaatio tietystä ruudusta.', 'Maksimikehykset: Rajoita animaation kokonaiskehysten määrää.', 'Ruutuaskellus: Ohita ruutuja nopeampaa animaatiota varten.', 'Interpolointi: Ei mitään, ristihäivytys tai muodonmuutos ruutujen välillä.'],
    },
    {
      heading: 'Sisältötyypit (lisäasetukset)',
      paragraphs: ['Edistynyt taso avaa lisää hyötykuormamuotoja:'],
      bullets: [
        'Puhelinnumero (tel:): Luo soitettavan puhelinlinkin.',
        'Sähköposti (mailto:): Avaa sähköpostiohjelman, jossa on valinnainen aihe ja viestin runko.',
        'SMS: Valmiiksi täytetty tekstiviesti puhelinnumeroon.',
        'vCard: Täydellinen yhteystietokortti, jossa on nimi, organisaatio, puhelinnumero, sähköpostiosoite ja osoite.',
        'MeCard: Japanissa suosittu kompakti yhteystietomuoto.',
        'BizCard: Vanha käyntikorttimuoto.',
        'Maantieteellinen sijainti: GPS-koordinaatit, jotka avautuvat kartoissa.',
        'WiFi: Verkkotunnukset automaattista yhteyttä varten (SSID, salasana, suojaustyyppi).',
        'Kalenteritapahtuma: iCalendar-muoto otsikolla, sijainnilla, päivämäärällä/kellonajalla.',
        'Tapahtuman ilmoittautuminen: Linkki tapahtuman ilmoittautumissivulle.',
        'Kalenterin tilaus: Tilaa ICS/WebCal-syöte.',
        'Tiedoston/dokumentin URL-osoite: Suora linkki ladattaviin tiedostoihin.',
        'Pilvitallennuslinkki: Linkit Google Driveen, Dropboxiin, OneDriveen jne.',
        'Sosiaalisen median profiili: Linkit LinkedIniin, Twitteriin, Instagramiin jne.',
        'Viestilinkki: WhatsApp, Telegram, Signal-syvälinkit.',
      ],
    },
    {
      heading: 'Lisäominaisuudet päällekkäin',
      paragraphs: ['Lisäominaisuudet päällekkäin:'],
      bullets: ['Rajaa: Ota käyttöön rajaus, jos haluat valita kuvan neliönmuotoisen alueen.', 'Rasterikuvio: Klassinen tulostustyylinen pistekuvio, joka perustuu kuvan kirkkauteen.', 'Dithered: Virheiden diffuusioon perustuva dithering yksityiskohtaista toistoa varten.'],
    },
    {
      heading: 'Päällekkäissekoitustilat (edistyneet)',
      paragraphs: ['Lisäsekoitustiloja edistyneellä tasolla:'],
      bullets: ['Alipikseli: Jakaa jokaisen moduulin alipikseleihin tarkempien yksityiskohtien saavuttamiseksi.', 'Sininen kohina: Käyttää sinisen kohinan värinätoimintoa artefaktittomien kuvioiden luomiseksi.', 'Mosaiikki: Laattoihin perustuva tehoste, joka säilyttää kuvan rakenteen.', 'Täyttöväli: Sijoittaa kuvan moduulien välisiin rakoihin.', 'Kirkkaus: Vaihtelee moduulin kokoa kuvan kirkkauden perusteella.', 'Duotone: Kartoittaa kuvan kahteen väriin silmiinpistävän kontrastin aikaansaamiseksi.'],
    },
    {
      heading: 'Päällekkäisyyden intensiteetti',
      paragraphs: ['Säätää QR-koodin peittokuvan vaikutusta (0–100 %). Korkeammat arvot näyttävät enemmän kuvan yksityiskohtia, mutta saattavat heikentää sen luettavuutta. Aloita noin 70 %:lla ja säädä testitulosten perusteella.'],
    },
    {
      heading: 'Väritila',
      paragraphs: ['Kuinka peittokuvaa käsitellään:'],
      bullets: ['Täysvärinen: Säilyttää kuvan alkuperäiset värit.', 'Harmaasävy: Muuntaa mustavalkoisiksi sävyiksi.', 'Mustavalkoinen: Suurikontrastinen binäärimuunnos.'],
    },
    {
      heading: 'Säilytä Finder-kuviot',
      paragraphs: ['Kun tämä on käytössä, peittokuva ei muokkaa kolmen kulman etsimen kuvioita. Suositellaan vahvasti luotettavan skannauksen varmistamiseksi.'],
    },
    {
      heading: 'Kuvan esikäsittely',
      paragraphs: ['Lisää suodattimia päällekkäiskuvaan ennen sekoittamista. Nämä säädöt voivat parantaa kuvan ulkoasua lopullisessa QR-koodissa.'],
      bullets: ['Kirkkaus (-100 - +100): Vaalenna tai tummenna kuvaa.', 'Kontrasti (-100 - +100): Lisää tai vähennä sävyaluetta.', 'Gamma (0,2–3,0): Epälineaarinen kirkkauden säätö. Arvot, jotka ovat alle 1, vaalentavat keskisävyjä, ja arvot, jotka ovat yli 1, tummenevat niitä.', 'Kylläisyys (-100 - +100): Värin intensiteetti. -100 on harmaasävy, +100 on ylikyllästetty.', 'Sävyn kierto (0–360°): Siirrä kaikkia värejä väriympyrässä.', 'Sumenna (0–20 pikseliä): Pehmennä kuvan yksityiskohtia.', 'Terävöi (0–100 %): Paranna reunoja ja yksityiskohtia.', 'Posterisointi (0–16 tasoa): Vähennä väritasoja julistetehosteen aikaansaamiseksi.', 'Kynnysarvo (0–255): Muunna binääriseksi mustavalkoiseksi katkaisukohdassa.', 'Reunan tunnistus: Sobelin tai Cannyn algoritmit vain reunojen näyttämiseen.', 'Käänteinen: Käännä kaikki värit päinvastaisiksi.'],
    },
    {
      heading: 'Sopivuustila',
      paragraphs: ['Kuinka päällekkäiskuva sopii QR-koodialueelle:'],
      bullets: ['Kansi: Kuva täyttää koko alueen, rajataan tarvittaessa.', 'Sisältää: Koko kuva näkyy, siinä voi olla reunukset.', 'Venytä: Kuva vääristyy täyttääkseen sen tarkasti.'],
    },
    {
      heading: 'Muunnostavalinnat',
      paragraphs: ['Kierto: Kierrä päällekkäiskuvaa 90° välein.', 'Käännä X/Y: Peilaa kuva vaakasuunnassa tai pystysuunnassa.'],
    },
    {
      heading: 'Dithering-algoritmit',
      paragraphs: ['Rasterointi muuntaa jatkuvasävyiset kuvat kuvioiksi, joita QR-koodit voivat esittää. Käytettävissä käytettäessä Rasterointi-, Sininen kohina- tai Todellinen rasterointi -sekoitustiloja.'],
      bullets: [
        'Virheen diffuusio: Klassinen Floyd-Steinberg-tyyli. Levittää kvantisointivirheen naapuripikseleihin.',
        'Järjestetty (Bayer): Käyttää kynnysmatriisia säännöllisille kuvioille.',
        'Klusteripiste: Simuloi puolisävytulostusta.',
        'Tyhjiö ja klusteri: Optimoitu järjestetty dithering.',
        'Sininen kohina: Visuaalisesti miellyttävä satunnaisen näköinen kuvio.',
        'Sinisen kohinan kynnysarvo: Kynnyksen värinä sinisen kohinan tekstuurilla.',
        'Valkoinen kohina: Satunnainen kynnysvärähtely.',
        'Gaussinen/kolmiokohina: Kohinaa eri jakaumilla.',
        'Sininen kohina + virheiden diffuusio: hybridi, joka yhdistää molemmat tekniikat.',
        'Seulottu sininen kohina: Ruudun kaltainen sinisen kohinan kuvio.',
        'Perseptuaalinen: Luminanssipainotteinen parempien visuaalisten tulosten saavuttamiseksi.',
        'Reunatietoinen: Säilyttää kuvan reunat rasteroinnin aikana.',
        'Adaptiivinen kynnysarvo: Paikallisesti adaptiivinen kynnysarvo.',
        'Ajallinen sininen kohina: Animoiduissa GIF-kuvissa kuvio vaihtelee ruudusta toiseen.',
      ],
    },
    {
      heading: 'Diffuusioytimet',
      paragraphs: ['Kun käytät virheiden leviämisen rasterointia, valitse, miten virheet jakautuvat:'],
      bullets: ['Floyd-Steinberg: Klassinen neljän naapurin diffuusio. Hyvä yleinen valinta.', 'Jarvis-Judice-Ninke: 12-naapuri, tasaisempi mutta hitaampi.', 'Stucki: Samanlainen kuin JJN, mutta eri painotuksilla.', 'Burkes: Yksinkertaistettu JJN, nopeampi.', 'Sierra: Laadun ja nopeuden tasapainottava ydinperhe.', 'Atkinson: Valon diffuusio, säilyttää yksityiskohdat, mutta voi olla rakeinen.'],
    },
    {
      heading: 'Epävakaa voima',
      paragraphs: ['Säätää rasteroinnin määrää (0–100 %). Pienemmät arvot säilyttävät enemmän alkuperäistä kuviota, suuremmat arvot näyttävät enemmän kuvan yksityiskohtia.'],
    },
    {
      heading: 'Alipikseliasetukset',
      paragraphs: ['Kun käytetään Subpixel-sekoitustilaa:'],
      bullets: ['Ruudukon koko: 2×2, 3×3 tai 4×4 alipikseliä moduulia kohden. Suurempi = enemmän yksityiskohtia.', 'Keskusääntö: Tiukka sääntö edellyttää, että keskimmäinen alipikselin vastaa moduulia. Rasterointikeskus sallii vaihtelun.', 'Neutraali väri: Määrittämättömille alipikseleille käytetty väri.', 'Finder-ominaisuuden ohitus: Miten Finder-kuviot renderöidään (kiinteänä tai tyyliteltynä).'],
    },
    {
      heading: 'Puolisävyasetukset',
      paragraphs: ['Kun käytetään rasterisekoitustilaa:'],
      bullets: ['Solun koko: Moduulia tai N×N-ruudukkoa kohden.', 'Pisteen muoto: ympyrä, neliö tai viiva.', 'Kirkkauskäyrä: lineaarinen, S-käyrä tai gamma.'],
    },
    {
      heading: 'Kaksisävyiset värit',
      paragraphs: ['Kun käytät kaksisävyistä sekoitustilaa, aseta varjon väri (tummat alueet) ja korostusväri (kirkkaat alueet).'],
    },
    {
      heading: 'GIF-animaatioasetukset',
      paragraphs: ['Animoituja GIF-peittokuvia käytettäessä:'],
      bullets: ['Käytä kehysviiveitä: Noudata alkuperäistä GIF-ajoitusta.', 'Max FPS: Rajoita kuvataajuus (1–60 fps).', 'Hävityskäsittely: Kunnioita tai yksinkertaista kehysten hävitysmenetelmiä.'],
    },
    {
      heading: 'Lisäasetukset renderöinnissä',
      paragraphs: ['Lisärenderöintiasetukset:'],
      bullets: ['Raon tila: Ei mitään, Sisäkkäinen, Viiva tai Negatiivinen tila -raon tyyli.', 'Kulmasäde: Moduulien pyöristettyjen kulmien prosenttiosuus.', 'Liukuvärjäys: Ei mitään, lineaarinen, säteittäinen tai kartiomainen liukuvärjäys moduuleissa.', 'Silmän ulko-/sisäosan tyyli: Etsinkuvioisten renkaiden itsenäinen muotoilu.', 'Pisteen kierto: Kierrä vinoneliö-/pistemoduuleja.', 'Silmän skaalaus: Etsimen kuvioiden koon säätö.', 'Kehystyyli: Lisää koristekehyksiä (pyöristetty kehys, tarra, tunniste).', 'Kehysteksti: Lisää kehyksiin tekstiä, kuten Skannaa minut!.'],
    },
    {
      heading: 'Edistynyt QR-koodaus',
      paragraphs: ['Hienosäädä QR-koodausta:'],
      bullets: ['Koodaustila: Automaattinen, Numeerinen, Aakkosnumeerinen, Tavu/UTF-8 tai Kanji.', 'Vaadi vähimmäishiljainen alue: Varmista vähintään 4 moduulin marginaali.'],
    },
    {
      heading: 'Lisäasetukset tulosteelle',
      paragraphs: ['Lisävientiasetukset:'],
      bullets: ['Tiedostonimi: Mukautettu tiedostonimi latauksille.', 'GIF-paletin koko: 2–256 väriä GIF-tulosteessa.', 'GIF-kvantisoija: Mediaanileikkaus, NeuQuant tai Octree-värinvähennys.', 'GIF-värinänvaimennus: Pois päältä, Floyd-Steinberg tai määrätty.', 'GIF-tiedoston läpinäkyvä väri: Aseta väri läpinäkyväksi.', 'SVG True Vector: Käytä polkuja upotetun rasterin sijaan.', 'SVG-muodon tarkkuus: pikseli- tai tarkka polkurenderöinti.', 'SVG:n upotettu rasteripeittokuva: Sisällytä peittokuva upotettuna kuvana.', 'Taustan ohitus: Pakota tietty taustaväri tulosteeseen.'],
    },
    {
      heading: 'Vahvistusvaihtoehdot',
      paragraphs: ['Syötteen käsittelyasetukset:'],
      bullets: ['Syötteen vahvistaminen: Tarkista sisällön muoto ennen koodausta.', 'Leikkaa välilyönnit: Poista välilyönnit alusta ja perästä.', 'Normalisoi rivinvaihdot: Muunna kaikki rivinvaihdot LF-riviksi.', 'Maksimipituuden vartija: Varoita, jos sisältö ylittää QR-koodin kapasiteetin.'],
    },
    {
      heading: 'Ammatilliset ominaisuudet',
      paragraphs: ['Ammattilaistaso lisää vesileimat, metatiedot, jakamisvaihtoehdot, turvallisuusanalyysin, maksujen QR-koodit ja yritysominaisuudet.'],
    },
    {
      heading: 'Vesileima',
      paragraphs: ['Lisää vesileimat QR-koodeihisi:'],
      bullets: ['Laji: Teksti-, kuva- tai kuviovesileima.', 'Sijainti: Keskellä, Kulmissa, Reunoilla, Takana tai Hiljainen alue.', 'Läpinäkymättömyys: Vesileiman läpinäkyvyys (0–100 %).', 'Sekoitustila: Normaali, Kertolasku, Näyttö tai Peittokuvasekoitus.'],
    },
    {
      heading: 'Metadata',
      paragraphs: ['Upota metatiedot vietyihin tiedostoihin:'],
      bullets: ['Otsikko-, Tekijä-, Tekijänoikeus-, Lisenssi- ja Kuvaus-kentät.', 'Luontiaika: Upota sukupolven aikaleima.', 'Mukautettu avain-arvo: Lisää mielivaltaisia metatietopareja.'],
    },
    {
      heading: 'Jakaminen',
      paragraphs: ['Jaa QR-koodimäärityksesi:'],
      bullets: ['Suora linkki: Luo jaettava URL-osoite nykyisillä asetuksillasi.', 'HTML:n upottaminen: Hae verkkosivustojen upotuskoodia.', 'Koodausparametrit: Sisällytä kaikki asetukset jako-URL-osoitteeseen.', 'Huomautus: Paikallisten tiedostojen päällekkäiskuvia ei voi jakaa URL-osoitteen kautta.'],
    },
    {
      heading: 'Turvallisuusanalyysi',
      paragraphs: ['Varmista, että QR-koodit pysyvät skannattavina:'],
      bullets: ['Turvatila: Pois päältä, Tasapainotettu tai Tiukka skannausvaatimukset.', 'Minimimoduulin koko: Moduulin vähimmäispikselikoko.', 'Minimihiljainen vyöhyke: Minimimarginaalimoduulit.', 'Lukon etsintä/Ajoitus/Tasonnus/Muoto/Versio: Suojaa tiettyjä elementtejä.', 'ECC:n maksimipeittointensiteetti: Automaattiset intensiteettirajoitukset virheenkorjaustasoon perustuen.'],
    },
    {
      heading: 'Sisältötyypit (ammattimainen)',
      paragraphs: ['Ammattitaso lisää maksu- ja yrityssisältötyypit:'],
      bullets: ['EPC/SEPA (EU): Eurooppalaisten tilisiirtojen QR-koodit IBAN-tilinumerolla, BIC-koodilla, summalla ja viitteellä.', 'UPI (Intia): Unified Payments Interface VPA:lla, maksunsaajan nimi, summa.', 'PayNow (Singapore): Nopea maksu Singaporessa UEN- tai matkapuhelinnumerolla.', 'PromptPay (Thaimaa): Thaimaan kansallinen maksujärjestelmä.', 'PIX (Brasilia): Brasilialainen pikamaksu PIX-avaimella.', 'Krypto: Bitcoin-, Ethereum- ja Litecoin-maksuosoitteet valinnaisella summalla.', 'Markkinointikampanjan linkki: URL-osoitteet, joissa on täysi UTM-parametrien (markkinointitunnisteiden) seuranta.', 'Lyhyt linkki: Käytetään URL-lyhenteiden kanssa dynaamisille/seurattaville QR-koodeille.', 'GS1 Digital Link: Tuotteen tunnistus GTIN-, sarja-, erä- ja viimeinen käyttöpäivämäärän mukaan.', 'Sovelluksen syvälinkki: iOS/Android-sovelluksen syvälinkit mukautetuilla malleilla.', 'Mukautettu muoto: Raakadata ilman muotoilua tai validointia.'],
    },
    {
      heading: 'Kielikohtaiset maksut edistyneessä tilassa',
      paragraphs: ['Kun käytät edistynyttä tilaa, ANQR näyttää automaattisesti valitsemasi kielen mukaiset maksutavat. Esimerkiksi vietnamilaiset käyttäjät näkevät VietQR:n, thaimaalaiset käyttäjät näkevät PromptPayn ja intialaiset käyttäjät näkevät UPI:n ja BharatQR:n. Maailmanlaajuiset maksutavat (kryptovaluutta, PayPal, Cash App) ovat saatavilla kaikilla kielillä. Ammattilaistila avaa kaikki maksustandardit kielestä riippumatta.'],
    },
    {
      heading: 'Eurooppalaiset maksustandardit',
      bullets: ['EPC/SEPA (EU): Eurooppalaisten tilisiirtojen QR-koodit EPC:n QR-koodistandardin mukaisesti. Tukee IBAN-tilinumeroa, BIC-koodia (valinnainen kotimaanmaksuille), summaa EUR-määränä sekä strukturoituja tai strukturoimattomia maksuviitteitä. Käytössä SEPA-alueella, mukaan lukien EU-maat sekä Sveitsi, Norja, Islanti, Liechtenstein, Monaco ja San Marino.', 'Sveitsiläinen QR-lasku: Sveitsiläinen maksustandardi SIX-toteutusohjeiden mukaisesti. Tukee CHF:ää ja EUR:a, QR-viitettä (QRR), velkojan viitettä (ISO 11649), strukturoituja velkojan/velkojan osoitteita ja laskun tietoja. Pakollinen sveitsiläisille laskuille vuodesta 2022 lähtien.'],
    },
    {
      heading: 'Intian maksustandardit',
      bullets: ['UPI (Intia): Unified Payments Interface, joka noudattaa NPCI Deep Linking -spesifikaatiota. Tukee VPA:ta (virtuaalinen maksuosoite), maksunsaajan nimeä, summaa INR:na, tapahtumamerkintää, viitetunnusta, kauppiaan luokkakoodia ja tapahtumatilaa.', 'BharatQR (Intia): Yhtenäinen QR-standardi, joka tukee sekä UPI- että korttipohjaisia maksuja. Yhdistää UPI VPA:n kortin PAN-numeroon maksimaalisen yhteensopivuuden saavuttamiseksi. Sisältää kauppiaan nimen, kaupungin, MCC:n, GST-tiedot ja lasku-/viitenumerot.'],
    },
    {
      heading: 'Kaakkois-Aasian maksustandardit',
      bullets: ['PayNow (Singapore): Singaporen pikamaksujärjestelmä, joka käyttää EMVCo QR -spesifikaatiota ja SGQR-profiilia. Tukee UEN:ää (yritysrekisteröinti), matkapuhelinnumeroa tai NRIC:tä välitystunnisteina. Sisältää summan muokkausmahdollisuuden ja voimassaolopäivän.', 'PromptPay (Thaimaa): Thaimaan kansallinen maksujärjestelmä, joka noudattaa Bank of Thailandin EMV-profiilia. Tukee matkapuhelinnumeroa, kansallista henkilökorttia, verotunnistetta, e-lompakon tunnusta ja laskun maksamista useilla viitekentillä.', 'QRIS (Indonesia): Indonesian pikavastauskoodien standardi. EMV-pohjainen kansallinen maksustandardi, joka tukee kauppiastunnusta, NMID:tä (kansallinen kauppiastunnus), kauppiaan kriteeriluokitusta ja palvelumaksuja (kiinteitä tai prosentuaalisia).', 'DuitNow (Malesia): Malesialainen pikamaksujärjestelmä. Tukee useita välityspalvelintyyppejä, kuten NRIC-, matkapuhelin-, passi-, armeijan henkilöllisyystodistus- ja yritysrekisterinumeroita.', 'VietQR (Vietnam): Vietnamin pankkien välinen siirtostandardi. Vaatii pankin BIN-koodin (NAPAS-tunniste) ja tilinumeron. Tukee useita palvelukoodeja eri siirtotyypeille (QRPUSH, QRIBFTTA, QRIBFTTC).', 'QR Ph (Filippiinit): Filippiinien QR-maksustandardi InstaPaylle ja PESONetille. Käyttää tilinumeroita kauppiaan tunnistuksen kanssa P2M-tapahtumissa (henkilöstä kauppiaaseen).'],
    },
    {
      heading: 'Itä-Aasian maksustandardit',
      bullets: ['TWQR (Taiwan): Taiwanilainen QR-maksustandardi. Tukee kauppiaan tunnusta, verotunnusta ja TWD-summia.', 'HKQR/FPS (Hongkong): Hongkongin nopeamman maksujärjestelmän QR-koodit. Tukee FPS-tunnusta, matkapuhelinnumeroa tai sähköpostiosoitetta maksutunnisteina. Summat Hongkongin dollareissa.', 'JPQR (Japani): Japanin yhtenäinen QR-koodimaksustandardi. Käyttää myymälätunnusta kauppiaan tunnistamiseen JPY-summien yhteydessä.'],
    },
    {
      heading: 'Muut alueelliset maksustandardit',
      bullets: ['PIX (Brasilia): Brasilian keskuspankin pikamaksujärjestelmä BR Code -spesifikaation mukaisesti. Tukee PIX-avaimia (CPF, CNPJ, sähköpostiosoite, puhelinnumero tai satunnainen avain), kauppiaan nimeä/kaupunkia, tapahtumatunnusta ja BRL-summia.', 'AusPayNet/NPP PayID (Australia): Australian uuden maksualustan PayID-järjestelmä. Tukee PayID-tyyppejä (sähköposti, matkapuhelin, ABN, organisaatiotunnus) tai perinteistä BSB + tilinumeroa. Kauppiaan nimi on valinnainen, koska maksajat näkevät rekisteröidyn nimen NPP-hausta.'],
    },
    {
      heading: 'Kryptovaluuttamaksut',
      bullets: ['Bitcoin/Litecoin (BIP-21): Kryptovaluuttojen maksujen vakio-URI-tunnukset, joissa on lompakon osoite, valinnainen summa ja nimi. Yhteensopiva kaikkien tärkeimpien Bitcoin- ja Litecoin-lompakoiden kanssa.', 'Lightning Network (BOLT11): Lightning Networkin maksulaskut. Liitä BOLT11-koodattu laskumerkkijono välittömiä Bitcoin-maksuja varten minimaalisilla kuluilla.', 'Ethereum (EIP-681): Ethereumin tapahtumapyyntöjen URI:t, jotka tukevat natiiveja ETH-siirtoja ja ERC-20-token-siirtoja. Sisältää ketjutunnuksen usean verkon tuelle (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), kaasuparametrit ja sopimusfunktiokutsut.'],
    },
    {
      heading: 'Maksulinkkipalvelut',
      bullets: ['PayPal.Me: PayPal-maksulinkit käyttäjätunnuksella ja valinnaisella esitäytetyllä summalla. Vastaanottajat voivat maksaa PayPal-saldon, korttien tai pankkitilien kautta.', 'Cash App: Cash App -maksulinkit, jotka käyttävät $cashtag-koodia ja valinnaista summaa. Suosittu Yhdysvalloissa vertaisverkkomaksuissa.'],
    },
    {
      heading: 'Yleinen EMV QR',
      bullets: ['EMV Generic: Luo mukautettuja EMV Merchant-Presented Mode -QR-koodeja maksujärjestelmille, joita ei ole erikseen lueteltu. Määritä kauppiaan nimi, kaupunki, maakoodi (ISO 3166-1), valuuttakoodi (ISO 4217 numeerinen), MCC, tip-/palvelumaksuvaihtoehdot ja lisätietokentät. Hyödyllinen testaukseen tai mukautettuihin integraatioihin.'],
    },
    {
      heading: 'Päällekkäissekoitustilat (ammattimainen)',
      paragraphs: ['Lisäsekoitustiloja ammattilaistasolla:'],
      bullets: ['Pixelate: Pikselöity peittokuvaefekti.', 'Ääriviivat: Reunan tunnistuskerros, joka näyttää vain ääriviivat.', 'Aalto: Aaltoileva vääristymäefekti.', 'Alipikselin koko: Muuttuva alipikselin koko kuvan perusteella.', 'Todellinen rasteri: Edistynyt rasterikuvaus järjestetyllä matriisivalinnalla.', 'Äärimmäinen: Kuvan näkyvyys maksimaalinen, voi vaikuttaa skannattavuuteen.'],
    },
    {
      heading: 'Suojausasetukset',
      paragraphs: ['Hienovarainen hallinta siitä, mitkä QR-elementit on suojattu päällekkäismuokkauksilta:'],
      bullets: ['Säilytä ajoitus: Pidä ajoitusmallit muokkaamattomina.', 'Säilytä kohdistus: Pidä kohdistuskuviot muokkaamattomina.', 'Suojausmuodon tiedot: Suojausmuodon tietomoduulit.', 'Suojausversion tiedot: Suojausversion tiedot -moduulit.'],
    },
    {
      heading: 'ECC-tietoinen tila',
      paragraphs: ['Jakaa päällekkäiskerroksen intensiteetin älykkäästi virheenkorjauskapasiteetin perusteella. Järjestelmä analysoi, mitä moduuleja voidaan muokata säilyttäen samalla skannattavuuden.'],
      bullets: ['Riskibudjetti: Käytettävissä oleva virheenkorjauskapasiteetin prosenttiosuus (0–100 %).', 'Suurempi budjetti = näkyvämpi päällekkäisyys, mutta riskialttiimpi skannattavuus.', 'Pienempi budjetti = turvallisempi skannaus, mutta vähemmän näkyvä peittokuva.'],
    },
    {
      heading: 'Ammattimaiset renderöintivaihtoehdot',
      paragraphs: ['Lisäasetukset renderöinnissä:'],
      bullets: ['Terävät reunat: Käytä pikselöityä kuvan renderöintiä terävien moduulireunojen aikaansaamiseksi.', 'Pikselikohdistus: Lattian, pyöreän tai katon pikselikohdistus.', 'Moduulikohtainen väritila: Tasainen, Kirkkauden mukaan, Sijainnin mukaan, Peittokerroksen mukaan, Klusterin mukaan.', 'Väripaletti: Määritä mukautettu väripaletti moduulikohtaista väritystä varten.', 'Kontrastisuoja: Varmista värien välinen vähimmäiskontrastisuhde.', 'Minimikontrastisuhde: WCAG-tyylinen kontrastivaatimus (1:1 – 21:1).', 'Lisärajamoduulit: Lisäraja hiljaisen alueen ulkopuolella.'],
    },
    {
      heading: 'Ammattimaiset tulostusasetukset',
      paragraphs: ['Yrityksen vientiasetukset:'],
      bullets: ['DPI: Aseta tulostustarkkuus (72–600 DPI). Tulostukseen suositellaan 300 DPI:tä.', 'Sisällytä hiljainen alue: Ota hiljainen alue käyttöön tulostusmitoissa.', 'Vie lisämuodossa: Luo PDF ensisijaisen muodon rinnalle.'],
    },
    {
      heading: 'Animaatioasetukset (ammattimainen)',
      paragraphs: ['Lisäominaisuuksia ammattimaiseen animaatioon:'],
      bullets: ['Ajallinen rasteri: Pois päältä, Sininen kohina tai Välkkymätön kehyskohtainen rasteri.', 'Kuvio: Ei mitään, Pulssi, Aaltoilu, Skannausviiva, Hohto tai Drift-tehosteet.'],
    },
    {
      heading: 'API-viite',
      paragraphs: ['ANQR tarjoaa palvelinpuolen API:n QR-koodien luomiseen URL-parametrien avulla. Tämä on ihanteellinen QR-koodien upottamiseen verkkosivustoille, sähköposteihin, dokumentteihin tai automatisoituihin työnkulkuihin ilman asiakaspuolen JavaScriptiä.', 'Perus-URL: https://anqr.link/api/qr'],
    },
    {
      heading: 'Perusparametrit',
      paragraphs: ['Pakolliset ja yleiset parametrit (parametrien nimiä ei käännetä):'],
      bullets: ['data (pakollinen): QR-koodiin koodattava sisältö. URL-koodaa erikoismerkit.', 'koko: Kuvan koko pikseleinä (oletus: 400, maksimi: 2000). Käytetään, jos leveyttä/korkeutta ei ole määritetty.', 'l, k: Tulosteen leveys ja korkeus pikseleinä. Ohittaa kokoparametrin.', 'muoto: Tulostemuoto — png, webp tai gif (oletus: png).', 'ec: Virheenkorjaustaso — L, M, Q tai H (oletus: H).', 'fg: Etualan väri heksadesimaalilukuna ilman #-merkkiä (oletus: 000000).', 'tausta: Taustaväri heksadesimaaliarvona ilman #-merkkiä (oletus: ffffff).', 'läpinäkyvä: Aseta arvoksi 1 läpinäkyvää taustaa varten.', 'marginaali: Hiljainen vyöhyke moduuleissa (oletus: 4).'],
    },
    {
      heading: 'Muotoiluparametrit',
      paragraphs: ['Moduulien ja kuvioiden muotoilu:'],
      bullets: ['tyyli: Moduulin tyyli — neliö, pyöristetty, piste, vinoneliö, yhdistetty.', 'finder: Finder-kuvion tyyli — neliö, pyöristetty, ympyrä.', 'align: Tasauskuvion tyyli — match_finder, neliö, pyöristetty, ympyrä.', 'ajoitus: Ajoituskuvion tyyli — match_module, kiinteä, katkoviiva.', 'säde: Kulmasäteen prosenttiosuus 0–100.', 'aukko: Moduulin aukon prosenttiosuus 0–50.', 'gapMode: Välitila — ei mitään, sisäkkäinen, viiva, negatiivinen_väli.', 'eyeOuter, eyeInner: Silmien tyylit — neliö, pyöreä, ympyrä.', 'eyeScale: Silmän skaalausprosentti (oletus: 100).', 'grad: Liukuvärjäystyyppi — ei mitään, lineaarinen, säteittäinen, kartiomainen.', 'gradAngle: Lineaaristen liukuvärien liukukulma.', 'gradStops: Liukuvärin loppupisteet muodossa color1,pos1,color2,pos2,… (esim. ff0000,0,0000ff,1).'],
    },
    {
      heading: 'Päällekkäisparametrit',
      paragraphs: ['Kuvan peittokuvan asetukset (peittokuva noudetaan palvelimelta):'],
      bullets: ['img: Päällekkäiskuvan URL-osoite (kuvan on oltava julkisesti saatavilla).', 'tila: Peittokuvatila — keskusta, rasteri, sekoitus, kirkkaus, mosaiikki, rasteroitu, sinikohina, alipikseli.', 'intensiteetti: Peittokuvan intensiteetti 0–100 (oletus: 100).', 'colorMode: Peittokuvan väritila — väri, harmaasävy, mustavalkoinen.', 'sovitus: Miten peitemateriaali sopii – peittää, sisältää, venyttää.', 'rot: Peittokuvan kierto asteina.', 'flipX, flipY: Aseta arvoksi 1 kääntääksesi päällekkäiskuvan.', 'keepFinders: Säilytä etsintäkuviot (oletus: 1).', 'keepTiming, keepAlign: Aseta arvoksi 1 säilyttääksesi ajoitus-/tasausmallit.'],
    },
    {
      heading: 'Esikäsittelyparametrit',
      paragraphs: ['Kuvan esikäsittely käytetty peittokuvaan:'],
      bullets: ['kirkkaus: Säätö -100 - 100 (oletus: 0).', 'kontrasti: Säätö -100 - 100 (oletus: 0).', 'gamma: Arvo 0,1–3 (oletus: 1).', 'kylläisyys: Säätö -100 - 100 (oletus: 0).', 'sävy: Sävyn kierto asteina.', 'sumenna: Sumenna pikseleinä.', 'terävöitys: Terävyyden määrä 0–100.', 'posterisoi: Posterisoi tasot.', 'kynnys: Binäärinen kynnysarvo 0–255.', 'reuna: Reunan tunnistus — pois päältä, sobel, canny.', 'käännä: Aseta arvoon 1 kääntääksesi värit käänteisiksi.'],
    },
    {
      heading: 'Vesileiman parametrit',
      paragraphs: ['Lisää vesileimat luotuihin QR-koodeihin:'],
      bullets: ['wmEn: Aseta arvoksi 1 ottaaksesi vesileiman käyttöön.', 'wmKind: Vesileiman tyyppi — teksti, kuva, kuvio.', 'wmText: Vesileimateksti (URL-koodattu).', 'wmImg: Vesileimakuvan URL-osoite.', 'wmPos: Sijainti — keskikohta, kulmat, reunat, takana, hiljainen_alue.', 'wmOpacity: Läpinäkymättömyys 0–100 (oletus: 50).', 'wmBlend: Sekoitustila — normaali, kertolasku, näyttö, päällekkäiskuva.'],
    },
    {
      heading: 'Animaatioparametrit',
      paragraphs: ['Animoitua GIF-tulostetta varten (vaatii format=gif):'],
      bullets: ['animPattern: Animaatiokuvio — ei mitään, pulssi, aalto, skannausviiva, hohde, ajautuminen, värisykli.', 'animFrames: Kehysten määrä 1–60 (oletus: 24).', 'animSpeed: Kehyksen viive millisekunteina 10–1000 (oletus: 100).', 'animSeed: Satunnainen animaation siemen.', 'easing: Animaation keventäminen — lineaarinen, keventäminen_sisään, keventäminen_ulos, keventäminen_sisään, pomppu.'],
    },
    {
      heading: 'Lähtöparametrit',
      paragraphs: ['Tulostemuotoasetukset:'],
      bullets: ['laatu: WebP-laatu 0–1 (oletus: 0,9).', 'webpQ: WebP-laatu 0–100 (oletus: 90).', 'gifColors: GIF-paletin koko 2–256 (oletus: 256).', 'dpi: Tulosteen DPI PNG:lle (oletus: 72).', 'metaTitle, metaAuthor, metaCopy, metaDesc: PNG-metatietokentät.'],
    },
    {
      heading: 'Esimerkki käytöstä',
      paragraphs: ['Perus-QR-koodi:', 'https://anqr.link/api/qr?data=https://esimerkki.com', 'Tyylitetty QR-koodi mukautetuilla väreillä:', 'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30', 'QR-koodi ja sen päällä oleva kuva:', 'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70', 'Animoitu GIF:', 'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out'],
    },
    {
      heading: 'QR-koodien upottaminen',
      paragraphs: ['Professional-tilassa jakotoiminto luo upotettavaa HTML-koodia ja URL-osoitteita. Upottaminen toimii näin:'],
      bullets: ['Jaa linkki: Luo URL-osoitteen ANQR-sovellukseen, jossa kaikki asetuksesi on koodattu URL-parametreina. Vastaanottajat voivat tarkastella ja muokata QR-koodia.', 'Upota kuva: Luo tunnisteen, joka osoittaa palvelimen API:in. QR-koodi renderöidään palvelimen puolella ja näytetään kuvana.', 'Upota Markdown: Luo Markdown-kuvan syntaksin dokumentaatiolle ja README-tiedostoille.', 'Suora API-URL: Raaka API-URL-osoite, jota käytetään sovelluksissa, komentosarjoissa tai muissa integraatioissa.'],
    },
    {
      heading: 'HTML-esimerkki',
      paragraphs: ['QR-koodin upottaminen verkkosivustolle:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR-koodi />', 'Responsiivista kokoa varten:', '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR-koodi style=max-width: 100%; height: auto; />', 'Palvelin tallentaa vastaukset välimuistiin pitkillä välimuistiotsikoilla, joten toistuvat pyynnöt samasta URL-osoitteesta ovat nopeita.'],
    },
    {
      heading: 'Jaa URL-osoitteen muoto',
      paragraphs: ['Kun napsautat Jaa-painiketta ammattilaistilassa, ANQR koodaa nykyiset asetuksesi URL-parametreiksi. Muoto on:', 'https://anqr.link/?data=…&ec=H&style=rounded&….', 'Nämä parametrit peilaavat API-parametreja, joten voit muuntaa jaetun URL-osoitteen API-URL-osoitteeksi muuttamalla peruspolun /:sta /api/qr:ksi ja säätämällä w/h-parametreja tarpeen mukaan.', 'Huomautus: Paikallisista tiedostoista ladattuja päällekkäiskuvia ei voi jakaa URL-osoitteen kautta — vain URL-pohjaiset päällekkäiskuvat (img-parametri) toimivat jaetuissa linkeissä ja API-kutsuissa.'],
    },
    {
      heading: 'Nopeusrajoitukset ja käyttö',
      paragraphs: ['API on ilmainen kohtuullisille käyttömäärille. Jos käyttö on suurta tai kaupalliset sovellukset vaativat taattua käyttöaikaa, ota meihin yhteyttä.', 'API-vastaukset sisältävät aggressiivisia välimuistiotsikoita. Parhaan suorituskyvyn saavuttamiseksi tallenna vastaukset välimuistiin omalla puolellasi tai käytä samaa URL-osoitetta johdonmukaisesti identtisille QR-koodeille.'],
    },
    {
      heading: 'Parhaat käytännöt',
      paragraphs: ['Noudata näitä ohjeita luotettavien QR-koodien saamiseksi:'],
      bullets: ['Testaa aina QR-koodisi useilla skannerisovelluksilla ennen tulostamista.', 'Käytä virheenkorjausasetusta H (korkea) lisättäessä päällekkäisyyksiä.', 'Pidä vähintään 4 moduulia hiljaista aluetta (marginaalia).', 'Varmista etualan ja taustan välinen suuri kontrasti.', 'Käytä tulostuksessa vähintään 300 DPI:tä ja testaa todellisessa tulostuskoossa.', 'Ota käyttöön Säilytä etsintäkuviot päällekkäisyyksiä käytettäessä.', 'Aloita pienemmällä päällekkäisintensiteetillä ja lisää sitä vähitellen.', 'Ulkokäyttöön kannattaa harkita suurempia moduulikokoja ja suurempaa virheenkorjausta.'],
    },
    {
      heading: 'Vianmääritys',
      paragraphs: ['Yleisiä ongelmia ja ratkaisuja:'],
      bullets: ['QR ei skannaa: Vähennä peittokuvan intensiteettiä, lisää virheenkorjausta, tarkista kontrasti.', 'Koodi on liian pitkä: Lyhennä sisällön pituutta, käytä URL-lyhentäjää, vanhempaa versiota.', 'Epäselvä tuloste: Suurenna moduulin kokoa, käytä PNG:tä pakattujen muotojen sijaan.', 'Värit näyttävät vääriltä: Tarkista värien kontrasti, kokeile harmaasävyjen päällekkäistilaa.', 'GIF ei animoidu: Varmista, että käytät GIF-muotoista tulostusta, tarkista ruutumäärä.', 'Kuvan päällekkäisyys ei lataudu: Tarkista etäkuvien CORS-käyttöoikeudet.'],
    },
    {
      heading: 'Pikanäppäimet',
      paragraphs: ['ANQR tukee tavallisia pikanäppäimiä. Käynnistä vienti painamalla Ctrl/Cmd+S (kun esikatselu on aktiivinen).'],
    },
    {
      heading: 'Jakaminen ja upottaminen',
      paragraphs: ['Professional-tilassa napsauta Jaa-painiketta kopioidaksesi URL-osoitteen nykyisillä asetuksillasi. Vastaanottajat voivat avata tämän URL-osoitteen nähdäkseen tarkat määrityksesi. Huomautus: Paikallisten tiedostojen päällekkäiskuvia ei voi jakaa URL-osoitteen kautta.'],
    },
  ],
};

export default docs;
