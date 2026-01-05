import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

/**
 * Template for the Learn page.
 * All string values are numeric ids that map to lines in en-GB.txt.
 * Structure is FLAT - each subsection is a top-level section.
 */
export const learn: PageDefinition = {
  title: 'Tanulj az ANQR-rel',
  description:
    'Gyakorlati, üzleti-első útmutatók a QR kódok valódi marketing eszközök - nem csak funkcionális négyzetek. Ismerje meg, hogyan lehet frissíteni a régi point-of-sale kódokat, hozzon létre megfelelő fizetési QR jelzéseket, készítsen print- ready exportot, használja az animációt biztonságosan a digitális kijelzőkön, és ossza meg zárt konfigurációkat a többnyelvű csapatok ANQR ("horgony") linkek segítségével.',
  lastUpdated: LAST_UPDATED,

  primaryLinks: [
    { href: '/?lang=${lang}', label: 'Nyisd ki a generátort', type: 'generator' },
    { href: '/examples?lang=${lang}', label: 'QR példák megtekintése', type: 'example' },
    {
      href: '/guide?lang=${lang}',
      label: 'A teljes felhasználói útmutató megnyitása',
      type: 'guide',
    },
  ],

  sections: [
    // Guide 1: Improving Existing QR Campaigns
    {
      heading: 'A meglévő QR-kampányok javítása',
      paragraphs: [
        'A legtöbb vállalkozás QR-kódokat szórt szét a műveletek - menü, pult, csomagolás, és promóciós anyagok. Sok ilyen kódok születtek évekkel ezelőtt alapvető generátorok, ami generikus fekete-fehér négyzetek, amelyek nem ösztönzik a bizalmat, vagy egyezik a márka identitás. Ez az átfogó útmutató az ellenőrzés, a korszerűsítés és a meglévő QR-infrastruktúra optimalizálásának módszeres megközelítésén keresztül kíséri Önt, anélkül, hogy megzavarná a már létrehozott ügyfélutakat.',
        'A fejlesztés stratégiai előnye, nem pedig a QR-kódok cseréje a folytonosság megőrzésében rejlik. Ügyfelei már megtanulták, hogy bizonyos célállomásokra számítsanak, amikor átnézik a kódjaikat. Azzal, hogy a kódolt URL-ek azonosak maradnak, miközben drámaian javítják a vizuális megjelenítést, a szkennelési megbízhatóságot és a márka beállítását, olyan zökkenőmentes átmenetet hoznak létre, amely növeli a bizalmat anélkül, hogy a digitális infrastruktúra vagy az analitika nyomon követése bármilyen változtatást igényelne.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-overview.png',
          alt: 'Oldal-by-side összehasonlítás, amely egy elhalványult, generikus QR kódot mutat egy modern márkás verzió mellett, amely ugyanazt az URL-t kódolja',
          caption:
            'Előtte és utána: Ugyanaz a rendeltetési hely, az URL, amelyet dátummal ellátott általános kódból szakmai márkás eszközzé alakítottak át',
        },
      ],
    },
    {
      heading: 'Miért Legacy QR kódok alulteljesítés',
      paragraphs: [
        'A korai elfogadási szakaszban - különösen 2020-2021 között, amikor a vállalkozások kontakt nélküli megoldások bevezetésére siettek - létrehozott QR-kódok gyakran számos kritikus kérdéstől szenvednek. Az alacsony hibajavítási beállítások sérülékennyé teszik őket, ha texturált felületekre nyomtatják őket, vagy ha kihívást jelentő világítás alatt nézik őket. Az elégtelen csendes zónák meghibásodásokat okoznak, ha a kódokat más vizuális elemek közelében helyezik el. Generikus stílus nem kommunikálni márka legitimitását, ami habozás és csökkent scan arány.',
        'A technikai korlátokon túl a hagyatéki kódok gyakran elmulasztott branding lehetőségeket jelentenek. Minden QR kód egy touchpoint az ügyfél - egy pillanat, amikor aktívan részt vesznek és hajlandóak cselekedni. A professzionális stílusú kód, amely megfelel a márka színek, tartalmazza a megfelelő biztonsági rések, és funkciók opcionális márkás elemek átalakítja ezt a használatot egy marketing eszköz, amely megerősíti az identitás minden kölcsönhatás.',
      ],
    },
    {
      heading: 'A QR-kód ellenőrzése',
      paragraphs: [
        'Kezdje meg a frissítési projekt létrehozásával átfogó leltárt minden QR kódot jelenleg telepített az üzleti. Dokumentálja a fizikai elhelyezkedést, a kódolt rendeltetési helyet, a nyomtatott anyag jelenlegi állapotát, valamint a jellegzetes letapogatási környezetet, beleértve a világítási körülményeket és a látószöget. Tesztelni minden kódot több eszköz - régebbi okostelefonok és költségvetési eszközök gyakran fedi fel megbízhatósági problémák prémium telefonok maszk.',
        'Különös figyelmet kell fordítani a magas tétű helyszíneken található kódokra: fizetési pontokra, ellenőrző pontokra és promóciós kijelzőkre, ahol a szkennelési hiba közvetlenül befolyásolja a bevételeket vagy az ügyfelek tapasztalatait. Ezeket prioritásként kell kezelni az azonnali korszerűsítés érdekében. Jegyezze meg azokat a kódokat is, amelyek megjelennek a fényképészetben vagy a videotartalomban, mivel ezek összehangolást igényelnek a marketing csapatával a vizuális eszközök frissítéséhez.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-audit.png',
          alt: 'A QR ellenőrzési kategóriákat bemutató ellenőrző lista interfész: hely, állapot, scan megbízhatóság és elsőbbségi minősítés',
          caption:
            'Szisztematikus QR ellenőrzési sablon dokumentálása és rangsorolása a frissítő jelöltek',
        },
      ],
    },
    {
      heading: 'A biztonságos fejlesztési stratégia',
      paragraphs: [
        'A QR fejlesztések legfőbb szabálya a célállomás megőrzése. Törölje ki a pontos URL-t minden létező kódból, és kódolja azonos módon az új verzióban. Ez biztosítja, hogy az összes meglévő analitika, átirányított logika, és az ügyfelek elvárásai sértetlenek maradjanak. Ha a jövőbeni frissítésekhez úticél-rugalmasságra van szükség, ez a legjobb idő egy rövid URL vagy átirányított szolgáltatás bevezetésére - de ezt külön projektként kell végrehajtani, hogy elkerüljük a változtatásokat.',
        'A vizuális frissítéshez alkalmazzon javításokat rétegekben: először biztosítsa a műszaki megbízhatóságot (megfelelő hibajavítás és csendes zóna), majd adjon hozzá márkastílust (színek, modulformák), és végül vegye figyelembe az opcionális javításokat (középsõ borítások, keretek). A vizsgálat megkezdése előtt minden réteget validálni kell. Az ANQR biztonsági üzemmódjának köszönhetően ezeket a prioritásokat figyelmeztetéssel érvényesíthető, ha a stílusválasztás veszélyeztetheti a scannabilitást.',
      ],
    },
    {
      heading: 'A védjegyek hozzáadása a megbízhatóság veszélyeztetése nélkül',
      paragraphs: [
        'Hatékony QR branding egyensúly vizuális hatás ellen scan megbízhatóság. Kezdje színnel: cserélje ki az alapértelmezett fekete előteret az elsődleges márka színére, biztosítva a háttér megfelelő kontrasztját. A legtöbb márka számára a sötét színek a könnyű háttéren a legjobb. Kerülje az alacsony kontrasztú kombinációkat, a széltisztaságot csökkentő gradienseket vagy a közös világítási körülmények között hasonló színeket.',
        'Modulforma testreszabása újabb márkanév lehetőséget minimális megbízhatósági hatással. Kerekített modulok hoznak létre egy puhább, megközelíthetőbb megjelenés, miközben a kiváló scannability. Dot- style modulok jól működik a modern, techno-forward márkák. A csatlakoztatott modulok megfelelnek az ipari vagy vállalati identitásoknak. Bármilyen stílust is választasz, tartsd fenn a konzisztenciát a QR-ben az azonnali márkafelismerés érdekében.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-branding.png',
          alt: 'Színkerék-diagram, amely optimális QR-színkombinációkat és kontrasztarány-kijelzőket mutat',
          caption:
            'A márkaszínválasztó útmutató magas kontraszt kombinációkat mutat, amelyek fenntartják a scan megbízhatóságát',
        },
      ],
    },
    {
      heading: 'Vizsgálati és érvényesítési jegyzőkönyv',
      paragraphs: [
        'Soha ne alkalmazzon korszerűsített QR kódokat szigorú vizsgálatok nélkül. Nyomtasson fizikai bizonyítékot a pontos méretben és ugyanazon az anyagon, mint a végső telepítés. Vizsgálat azon a tényleges helyen, ahol a kód élni fog, különböző napszakokban a világítási változatok figyelembevétele érdekében. Használjon legalább három különböző eszközt: egy jelenlegi zászlóshajó telefont, egy közepes hatótávolságú eszközt, és egy régebbi vagy költségvetésű okostelefont.',
        'Rögzített szkennelési idő és sikerességi arány minden egyes vizsgálat esetében. Egy jól optimalizált kód 110 másodpercen belül letapogatja a modern eszközöket. Ha következetes késéseket vagy hibákat lát, csökkentse a stílus intenzitását - távolítsa el vagy zsugorítsa felül, növelje a csendes zóna méretét, vagy váltson magasabb hibajavítási szintre. A megbízhatóság mindig elsőbbséget élvez a vizuális kifinomultsággal szemben.',
      ],
    },
    {
      heading: 'A konzisztencia beállításának bezárása',
      paragraphs: [
        'Miután validált egy optimális konfigurációt, őrizze meg az ANQR megosztható linkjeit. Ez létrehoz egy állandó rekordot minden beállítást használt, hogy létrehozza a jóváhagyott kódot - színek, modul stílus, hiba korrekció, méretezés, és bármilyen overlays. Ossza meg ezt a linket a tervező csapattal, nyomdával, és bárki mással, akinek a jövőben szüksége lehet a kód reprodukálására.',
        'Ez a konfigurációs zár megakadályozza a fokozatos lebomlást, ami sok QR telepítést okoz. Enélkül a személyzet tagjai újragondolják a screenshotok kódjait, a tervezők rekonstruálják a beállításokat a memóriából, és a nyomdagyártók "hasznos" kiigazításokat végeznek. Minden módosítás potenciális kérdéseket vet fel. Egy zárt konfigurációs linkkel, minden reprodukció megegyezik a tesztelt, jóváhagyott eredetivel.',
      ],
      images: [
        {
          src: '/images/learn/improve-existing-lock.png',
          alt: 'A konfigurációs eltolódást bemutató diagram: screenshotok, amelyek a változatok rekonstrukciójához vezetnek, szemben egyetlen source- of- truth linkkel',
          caption:
            'A konfigurációs eltolódás megelőzése egyetlen hiteles forrás létrehozásával minden QR reprodukcióhoz',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced&ec=H#overlay',
          label: 'Nyisd ki a generátort',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-0',
          label: 'QR példák megtekintése',
          type: 'example',
        },
      ],
    },

    // Guide 2: QR Codes for Retail Payments
    {
      heading: 'A lakossági fizetések QR-kódjai',
      paragraphs: [
        'A fizetési QR-kódok a legigényesebb környezetben működnek a kiskereskedelemben: az ügylet pillanatában. A vásárlók készek fizetni, gyakran egy sor alkotó mögöttük, és minden másodperc késés teremt súrlódás. Mégis ez a nagy nyomású pillanat a márka megerősítésének elsődleges ingatlanja is. Ez az útmutató elmagyarázza, hogyan lehet létrehozni a fizetési QR kódokat, amelyek azonnal szkennelnek banki alkalmazások, miközben bemutatja a professzionális, márkás megjelenés, amely növeli az ügyfelek bizalmát.',
        'A fizetési QR-kódok alapelve a megbízhatóság az esztétika felett. A gyönyörűen megtervezett kód, amely nem szkenneli az egyik ügyfél banki alkalmazás kerül sokkal több elhagyott tranzakciók és frusztrált ügyfelek, mint egy konzervatív design valaha is. Kezdje a megfeleléssel, adja hozzá a megbízhatóságot, majd óvatosan réteg márkanév csak ott, ahol nem veszélyezteti az elsődleges funkciót.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-overview.png',
          alt: 'Kiskereskedelmi számláló kijelzője, amelyen a fizetési QR kódot egy okostelefon szkenneli banki alkalmazással',
          caption:
            'A fizetési QR-kódoknak azonnal működniük kell bank- és pénztárca-alkalmazásokkal, valós ellenfeltételek mellett',
        },
      ],
    },
    {
      heading: 'A fizetési QR-előírások megértése',
      paragraphs: [
        'A QR fizetési kódok jellemzően a hasznos teher formátumát meghatározó regionális szabványokat követik. Szingapúrban a PayNow QR speciális formázást alkalmaz. Indiában az UPI-kódok a BharatQR vagy az UPI mélykapcsolati szabványokat követik. Az európai SEPA-fizetések EPC QR-kódokat használnak. Minden szabvány létezik annak biztosítására, hogy a banki alkalmazások azonnal felismerjék és feldolgozzák a fizetési információkat. Az e szabványoktól való eltéréssel - még kissé is - a fizetési alkalmazások elutasíthatják azokat a kódokat, amelyeket a generikus kameraszkennerek kérdés nélkül olvasnak.',
        'ANQR tartalmaz sablonokat a nagyobb fizetési szabványok, amelyek automatikusan formázzák a kereskedő adatait a megfelelő terhelések. Mindig ezeket a sablonokat használja ahelyett, hogy kézzel készítené el a fizetési szálakat, mivel még a kisebb formázási hibák is okozhat tranzakciós hibákat. Ha a régió fizetési előírása sablonként nem áll rendelkezésre, akkor a pontos formázási követelmények érdekében keresse fel a pénzforgalmi szolgáltató műszaki dokumentációját.',
      ],
    },
    {
      heading: 'Mérés és elhelyezés a számláló megjelenítések',
      paragraphs: [
        'Az ellen- top QR kódok egyedi fizikai kihívásokkal néznek szembe. A vásárlók a kar hosszával, gyakran szögben, néha tüsszentéssel, vagy kijelzős táskák segítségével keresnek. A fejvilágítás csillogó foltokat hoz létre. A kód versenyez a többi számláló klutter a figyelem és a tiszta városvonalak. Mérje meg a fizetési QR nagyvonalúan - legalább 4-5cm ajánlott a legtöbb számláló alkalmazások, méretezés, ha a kód mögött ül üveg vagy egy halvány megvilágított területen.',
        'A pozíció ugyanannyira számít, mint a méret. Helyezze el a kódot, ahol az ügyfelek kényelmesen tarthatják a telefont anélkül, hogy blokkolnák a sort vagy kényelmetlenül elérnék. Fordítsa a kijelzőt az ügyfél felé ahelyett, hogy lapos. Ha lehetséges, használja a matte laminálást vagy a nem reflektív kijelző anyagokat, hogy minimalizálja a felső világításból származó vakító fényt. Tesztelje a végső elhelyezést a különböző időpontokban a nap, hogy elkapja a világítási problémák.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-placement.png',
          alt: 'Az optimális QR elhelyezési magasságokat és szögeket mutató diagram a különböző számláló konfigurációkhoz',
          caption:
            'Counter elhelyezési útmutató: optimális magasságok, szögek és távolságok megbízható fizetési szkenneléshez',
        },
      ],
    },
    {
      heading: 'Konzervatív márkanév fizetési kódok',
      paragraphs: [
        'A fizetési alkalmazások kevésbé megbocsátóak, mint a generikus kameraszkennerek. Sok banki app használ régebbi, egyszerűbb QR olvasó algoritmusok optimalizált sebesség helyett rugalmas. Ez azt jelenti, stílus, amely tökéletesen működik a telefon kamera lehet, hogy nem a konkrét fizetési alkalmazások. Tartsa márkanév konzervatív: használja a márka színét az előtér, ha fenntartja erős kontraszt, de kerülje a gradiensek, nehéz overlays, vagy dekoratív elemek, amelyek zavarhatják az elismerés.',
        'Ha középső logót vagy borítást szeretne, tartsa rendkívül kicsinek - nem több mint a QR terület 10- 15% -, és alaposan ellenőrizze az ügyfelei által használt fizetési alkalmazásokat. Számos vállalkozás kifejezetten a fizetési kódok túllépése mellett dönt, fenntartva ezt a stílust a QR-kódok marketingjére, ahol a megbízhatósági követelmények kevésbé szigorúak. A fizetési kód feladata a tranzakciók feldolgozása, nem a vizuálisan történő lenyűgözés.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-branding.png',
          alt: 'Egy összehasonlítás, amely elfogadható vs kockázatos márkanév szint fizetési QR kódok',
          caption:
            'Fizetési QR márka spektrum: a biztonságos konzervatív stílus a kockázatos dekorációs megközelítések',
        },
      ],
    },
    {
      heading: 'Anyag- és nyomtatási szempontok',
      paragraphs: [
        'A fizikai megjelenítő anyag jelentősen befolyásolja a letapogatás megbízhatóságát. Fényes laminálás tükrözi a felső fények közvetlenül az ügyfél kameráját. A texturált anyagok torzíthatják a modulszéleket. Az olcsó nyomtatás elhomályosíthatja a részleteket. Fizetési QR-kódok, befektetni a minőség: használja a matte vagy szatén lamináció, biztosítja a nagy felbontású nyomtatás, és cserélje ki a kijelzőket, mielőtt mutatják kopás. Egy megkarmolt vagy elhalványult fizetési kód a tranzakcióidba kerül.',
        'Mérlegelje a kijelző tartósságát és helyettesíthetőségét. A kijelzőket megérintik, mozgatják, szétfröccsennek, és néha felborítják. Tervezze meg a kijelzőrendszert úgy, hogy a QR beültetés könnyen kicserélhető legyen anélkül, hogy az egész standot kicserélné. Tartsa a tartalék ujjlenyomatok készen, generált a zárt konfigurációs link, így kopott kódok azonnal cserélhető.',
      ],
    },
    {
      heading: 'Vizsgálat valós fizetéssel Alkalmazások',
      paragraphs: [
        'A generikus kameraszkennerek szinte minden ésszerűen formázott QR kódot dekódolnak. A fizetési alkalmazások finomabbak. Mielőtt bármilyen fizetési QR kódot, tesztelje azt minden fizetési alkalmazás az ügyfelek használhatják. Több fizetési környezetben ez több banki alkalmazással, digitális pénztárcával és fizetési platformokkal végzett tesztelést jelenthet. Dokumentum, mely alkalmazásokat tesztelte, és azok verziói - fizetési alkalmazások rendszeresen frissítik, és egy frissítés megváltoztathatja a letapogató viselkedést.',
        'Vizsgálat reális körülmények között: a tényleges kijelző, a tényleges világítás, a tényleges letapogatási távolság. Egy kód, ami azonnal letapogatja az asztalán, 5-kor a pulton fog küszködni, amikor a délután süt a nap. Teszt a legrégebbi, legolcsóbb okostelefon található - ha működik megbízhatóan egy költségvetési eszköz, ez fog működni mindent. Jelölje be, ha a vizsgálat és a lehetséges újratervezés ideje 2 másodperc.',
      ],
      images: [
        {
          src: '/images/learn/retail-payments-testing.png',
          alt: 'A különböző fizetési alkalmazásokat, eszköztípusokat és környezeti feltételeket ellenőrző ellenőrző ellenőrző lista',
          caption: 'Átfogó QR vizsgálati mátrix alkalmazások, eszközök és környezeti tényezők',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=professional#payload',
          label: 'Nyisd ki a generátort',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-5',
          label: 'QR példák megtekintése',
          type: 'example',
        },
      ],
    },

    // Guide 3: Print-Ready QR Codes
    {
      heading: 'Print- Ready QR kódok: SVG vs PNG',
      paragraphs: [
        'A tökéletesen szkennelt QR-kód és a sikertelen QR-kód közötti különbség gyakran az exportálás és a nyomtatási munkafolyamat során történő kezelés módjából adódik. Ez az útmutató magyarázza a kritikus megkülönböztetéseket vektor (SVG) és raster (PNG) formátumok, mikor kell használni, és hogyan kell átadni a QR artwork a tervezők és nyomdai szállítók úgy, hogy megőrizze a scan megbízhatóságát a névjegykártyáktól a számlázási méretű jelek.',
        'A nyomtatás olyan változókat vezet be, amelyek nem léteznek a képernyőn: tinta terjedése, szubsztrátum textúra, befejezési folyamatok, és a többszörös fájlátalakítások kumulatív hatása. A QR kód, amely úgy néz ki, tökéletes a tervezési szoftver is jelenik meg a nyomtató lágyított élű, csökkentett kontraszt, vagy finoman torzított modulok. A formátum kiválasztásának és a munkafolyamat legjobb gyakorlatának megértése megakadályozza ezeket a csendes hibákat.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-overview.png',
          alt: 'A nagyított nézet összehasonlítja vektoros QR modulok ropogós szélek képest raszter modulok mutatja pixel leletek',
          caption:
            'Vector vs raster nyomtatási skálán: a pontosság különbség, amely meghatározza a scan megbízhatóságát',
        },
      ],
    },
    {
      heading: 'Miért a Vector (SVG) preferált nyomtatás',
      paragraphs: [
        'SVG fájlok leírja QR kódok matematikai formák helyett rácsok pixelek. Ez azt jelenti, hogy a kód bármilyen méretre méretezhető - egy 1cm-es címkéről egy 10 méteres bannerre - anélkül, hogy a szélélesség csökkenne. A nyomtató RIP-je (Raster Image Processor) a vektorokat a kimeneti eszköz anyanyelvi felbontására állítja be, biztosítva, hogy minden modul éle olyan ropogós legyen, amennyire a hardver engedi. Nincs interpoláció, nincs anti-aliasing ereklye, nincs halmozott elmosódás többszörös átméretezésből.',
        'A méretezhetőségen túl az SVG-fájlok megbízhatóbbak a szakmai munkafolyamatokban. Túlélik a körutazásokat a design szoftvereken keresztül, romlás nélkül. Ezek a színek újraegyesítés nélkül is kijavíthatók. Tisztán beágyazódtak PDF fájlokba a press- ready kimenethez. Minden nyomtatási alkalmazás esetében, ahol a minőség számít, az SVG legyen az alapértelmezett exportformátum.',
      ],
    },
    {
      heading: 'Ha PNG elfogadható',
      paragraphs: [
        'PNG válik szükségessé, ha a munkafolyamat vagy a célplatform nem támogatja vektorformátumok. Egyes webes platformok, jelzők CMS rendszerek, és a hagyatéki nyomtatási munkafolyamatok raszteres képeket igényelnek. Ezekben az esetekben a PNG jól működhet - de csak akkor, ha szigorú szabályokat követünk: export a végső fizikai méret és felbontás, soha nem méreteződik az export után, és elkerüljük a veszteséges tömörítést vagy formátumátalakítást.',
        'A PNG-re vonatkozó kritikus szabály, hogy az exportálás előtt ki kell számítani a szükséges pixel méreteket. Ha a QR 5cm-es nyomtatást végez, és a nyomtató 300 DPI-vel működik, akkor körülbelül 590 pixel kell. Exportálás ilyen vagy nagyobb méretben, majd lemerülni, ha szükséges - soha fel. Írja be ezt az információt fájlnevébe vagy metaadataiba, hogy a jövőbeli felhasználók véletlenül ne használhassák fel a méretspecifikus exportot.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-resolution.png',
          alt: 'Számológép interfész, amely a fizikai méret, a DPI és a szükséges pixel méretek közötti kapcsolatot mutatja',
          caption: 'Nyomtatási felbontáskalkulátor: a kimenet minimális méreteinek meghatározása',
        },
      ],
    },
    {
      heading: 'ANQR Export opciók',
      paragraphs: [
        'Az ANQR számos SVG kiviteli módot kínál a különböző munkafolyamatokhoz. A True Vector mód tiszta, path-alapú kimenetet hoz létre ideális nyomtatáshoz és professzionális tervezéshez. Ha a raszter overlays vagy bizonyos hatások, ANQR lehet beágyazni ezeket, miközben a vektor modulok, vagy exportálhat egy teljesen rothadt változat a megadott felbontást. Ezek megértése segít kiválasztani a megfelelő export minden egyes felhasználási esetben.',
        'A PNG export esetében az ANQR lehetővé teszi a pontos méretek megadását és az átlátható háttérrel kapcsolatos lehetőségeket. A DPI beállítás segítségével kiszámítható a megfelelő méret a nyomtatáshoz, de ne feledje, hogy a DPI metaadat - ami a nyomtatáshoz számít, hogy a fizikai mérethez elegendő pixel legyen. Ha kétség merül fel, nagyobb exportra van szüksége, mint gondolná; a minőség megőrzése és a növekedés tönkreteszi azt.',
      ],
    },
    {
      heading: 'Fájlok előkészítése Handoff-hoz',
      paragraphs: [
        'A QR műalkotások tervezőknek vagy nyomdaiparosoknak történő átadásakor egyértelmű előírásokat kell alkalmazni: a tervezett fizikai méretet, a minimális csendes zónára vonatkozó követelményeket, valamint a színterekre vonatkozó szempontokat. Kritikus alkalmazásokhoz SVG-mestert és magas felbontású PNG-erősítést is kell biztosítani, egyértelműen megjelölve a tervezett felhasználásokat. Tartalmazza az ANQR konfigurációs linket, hogy a kód szükség esetén regenerálódhasson.',
        'Várjuk meg a közös hibákat az átadási folyamatban. Adja meg egyértelműen, hogy a QR-t nem szabad méretezni, forgatni, ferdíteni, vagy alkalmazni. Adja meg, hogy a csendes zónának tisztának kell maradnia - nincs termésjelölés, lajstromjel, vagy a tervezési elemek behatolása. Ha a QR kerül egy színes vagy fényképészeti háttér, ad egy változatot átlátszatlan hátoldalán, hogy biztosítsa a megfelelő kontraszt.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-handoff.png',
          alt: 'A fájlcsomag diagramja mutatja SVG master, PNG biztonsági mentés, specifikációk dokumentum, és konfigurációs link',
          caption:
            'Professional QR handoff csomag: minden, amire egy tervezőnek vagy nyomdának szüksége van a pontos sokszorosításhoz',
        },
      ],
    },
    {
      heading: 'Nyomtatványok ellenőrzése',
      paragraphs: [
        'Soha ne hagyja jóvá a lenyomatot anélkül, hogy letapogatna egy fizikai bizonyítékot. Kérjen bizonyítékot a tényleges szubsztrátumra nyomtatva a gyártás során használt tényleges befejezéssel. Keresse meg a bizonyítékot olyan világítási körülmények között, mint ahol az utolsó darab megjelenik. Vizsgálat több eszközzel, beleértve az idősebb okostelefonokat, amelyek küzdhetnek a marginális minőség.',
        'Ha a bizonyíték lassan vagy következetlenül vizsgálódik, a jóváhagyás előtt vizsgálja meg. A közös kérdések közé tartozik a színezett szubsztrátumok nem megfelelő kontrasztja, a csendes zóna megsértése a vágással, a tinta terjedése lágyító modul szélei, vagy a laminálás, amely vakságot okoz. Ezek közül bármelyikkel foglalkozni lehet, mielőtt teljes nyomtatási folyamatra köteleznénk magunkat - de csak akkor, ha a bizonyítási szakaszban kapjuk el őket.',
      ],
      images: [
        {
          src: '/images/learn/print-ready-proof.png',
          alt: 'A vizsgálati eredményeket, a kontrasztaméréseket és a jóváhagyási jeleket ellenőrző ellenőrző ellenőrző lista',
          caption:
            'Nyomtatólevél-ellenőrzési munkafolyamat: szisztematikus vizsgálat a termelési mennyiségekre vonatkozó kötelezettségvállalás előtt',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#output',
          label: 'Nyisd ki a generátort',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-11',
          label: 'QR példák megtekintése',
          type: 'example',
        },
      ],
    },

    // Guide 4: Animated QR Codes
    {
      heading: 'Animated QR kódok létrehozása',
      paragraphs: [
        'Animált QR-kódok kombinálják a funkcionalitását szabványos QR-kódok szemfogós mozgás, amely drámaian növeli az elkötelezettség mértékét. A digitális jelek, a közösségi média és az interaktív megjelenítések, animáció alakít statikus segédprogram egy impozáns vizuális elem, amely felhívja a szemet, és kölcsönhatás. Ez az útmutató tartalmazza az animált QR-kódok létrehozásának alapelveit, technikáit és gyakorlati korlátait, amelyek a vizuális hatás elérése mellett megbízhatóan szkennelnek.',
        'Az animációs QR-kódok alapvető kihívása a vizuális érdeklődés és a letapogatás megbízhatósága közötti egyensúly. Minden képkockának egyedileg kiolvashatónak kell lennie - a szkenner az animációs ciklus bármely pontján rögzítheti a kódot. Ez a kényszer alakít minden tervezési döntést: mely elemek tudnak mozgatni, mennyit tudnak változtatni, és mi kell állandó az egész animáció.',
      ],
      images: [
        {
          src: '/images/learn/animated-overview.png',
          alt: 'Digitális jelzéskijelző, amely animációs QR-kódot mutat, amely a nézők figyelmét egy nyilvános helyen rögzíti',
          caption:
            'Animált QR-kódok digitális jelzésekben: mozgás, amely felhívja a figyelmet és ösztönzi a szkennelést',
        },
      ],
    },
    {
      heading: 'Hogyan befolyásolja az animáció scannability',
      paragraphs: [
        'A QR szkennerek egyetlen képkocka rögzítésével és a fény- és sötét modulok mintájának elemzésével működnek. Ahhoz, hogy egy animációs kód működjön, minden keretnek tartalmaznia kell a teljes, érvényes QR mintát. Ez kizárja az animációkat, amelyek átalakítják a kódszerkezetet, feloldják a modulokat, vagy jelentősen megváltoztatják a kontraszt mintát. Az adathordozó moduloknak - a látszólag véletlenszerű minta a központban - vizuálisan stabilnak kell maradniuk.',
        'A biztonságos animációs megközelítések olyan elemeket módosítanak, amelyek nem hordoznak adatokat: hátteret, színeket, dekorációs kereteket és overlay elemeket. A szerkezeti komponensek - kereső minták (a nagy sarok négyzetek), időzítési minták (a váltakozó vonalak) és beállítási minták (kisebb négyzetek nagyobb kódok) - kell tartani pozícióikat és arányait. E korlátok között dolgozni még mindig meglepően dinamikus és izgalmas animációkat tesz lehetővé.',
      ],
    },
    {
      heading: 'Animációs technikák Ez működik',
      paragraphs: [
        'Színes kerékpáros animálja az előtér és a háttér színek egy paletta, miközben elegendő kontraszt minden lépésben. Ez vibráló, figyelemelterelő hatást eredményez minimális letapogatási kockázattal - mindaddig, amíg a kontraszt soha nem esik az olvasható szint alá. Az ANQR színciklus-előjegyzéseit úgy tervezték, hogy a teljes ciklus során megőrizzék a scannabilitást.',
        'Animált overlays hely mozgó képek mögött félig átlátszó QR minta. A kód stabil marad, míg a háttér animálja - talán egy hurkolás videó, animációs márka elemek, vagy absztrakt mozgás grafika. Ez a technika megköveteli a gondos intenzitás kezelése, hogy megakadályozzák a háttér elsöprő a QR minta, de létrehozza a legvizuálisabb feltűnő eredményeket.',
      ],
      images: [
        {
          src: '/images/learn/animated-layers.png',
          alt: 'Az animált QR réteges szerkezetét bemutató ábra: stabil kódréteg animált háttérrétegen',
          caption:
            'Animációs rétegezési elv: a QR minta állandó marad, míg a háttérelemek animálódnak alatta',
        },
      ],
    },
    {
      heading: 'Animációs paraméterek beállítása',
      paragraphs: [
        'A képkeret a vizuális simaságot és a fájl méretét egyaránt befolyásolja. A legtöbb alkalmazás esetében másodpercenként 10- 15 képkocka biztosít smoothing-looking motion nélkül túlzott fájlméret. A magasabb frame arány csökkenti a vizuális hozamokat, miközben jelentősen növeli a fájl méretét. Tekintse meg a szállítási környezet - egy nagy digitális jel képes kezelni nagyobb fájlokat, mint egy mobil hirdetés elhelyezése.',
        'A hurok viselkedése határozza meg az animáció ciklusait. A varrat nélküli hurkok folyamatos mozgást biztosítanak, ami ideális a jelzésekhez és a környezeti megjelenítésekhez. Ping-pong (a -then-reverse) hurkok jól működik egyszerű animációk. A figyelem-megragadás impulzusok, fontolja animációk tartásokkal - időszakokat a csend szúrt mozgás, hogy felhívja a szemet nélkül állandó mozgás fáradtság.',
      ],
    },
    {
      heading: 'Animációs átfedések létrehozása',
      paragraphs: [
        'Amikor animált képeket (GIFs, animált WebP, vagy video) használ overlays, ANQR kivonatok keretek és kompozit őket a QR kódot. Az overlay intenzitás beállítása szabályozza, hogy az animáció mekkora része mutat keresztül - az alacsonyabb értékek előnyben részesítik a scannability-t, míg a magasabb értékek a vizuális hatást részesítik előnyben. Tesztelje a kiválasztott intenzitást több képkockán keresztül, hogy biztosítsa a következetes scannability.',
        'A forrásanyag minősége jelentősen befolyásolja az eredményeket. Használja overlays tiszta alanyok és jó kontraszt. Kerülje a forrás animációk gyors villogás vagy extrém fényerő változások, amelyek alkalmanként alacsony kontrasztú keretek. Előnézetben a teljes animációs ciklus, mielőtt export elkapni a problémás keretek, hogy lehet, hogy nem szkennelt.',
      ],
      images: [
        {
          src: '/images/learn/animated-frames.png',
          alt: 'Egy animált átfedés keretbe eső nézete, amely a sorozatban fenntartott kontrasztanyagszinteket mutatja',
          caption:
            'Frame analízis: a teljes animációs ciklusban következetes scannabilitás ellenőrzése',
        },
      ],
    },
    {
      heading: 'Export- és szállítási szempontok',
      paragraphs: [
        'GIF továbbra is a legszélesebb körben támogatott animált formátum, játék automatikusan a legtöbb környezetben anélkül, hogy szükséges video lejátszó támogatást. A GIF 256 színű palettája azonban korlátozza a színhűséget. A színes-kritikus animációk, fontolja animált WebP, ahol támogatott, vagy vissza videó formátumok a legmagasabb minőségű. Az ANQR GIF-exportja magában foglalja a paletta korlátain belül a minőség maximalizálására szolgáló ásási lehetőségeket.',
        'A fájl mérete számít. A digitális jelzőrendszerek, az e-mail ügyfelek és a szociális platformok gyakran mérethatárokat szabnak. Ha az animáció túllépi ezeket a határértékeket, csökkentse a keret számát, méreteit vagy színmélységét. Néha a komplex animáció rövidebb hurokra osztása jobb eredményeket eredményez, mint az agresszív tömörítés, ami minden keretet lealacsonyít.',
      ],
    },
    {
      heading: 'Animált QR kódok tesztelése',
      paragraphs: [
        'Az animációs kódok tesztelése az animációs ciklus több pontján is szükséges. Ne csak egyszer, és feltételezi a siker - szkennelés többször, különböző pillanatokban, hogy ellenőrizze, minden keret olvasható. Különös figyelmet kell fordítani azokra a képkockákra, amelyek a színciklus szélső pontjain vagy a túlnyúlás intenzitásának csúcsai között vannak, ahol a kontraszt lehet a legalacsonyabb.',
        'Ha lehetséges, a tényleges megjelenítő hardver tesztelése. A színkalibrálás, a látószög és a környezeti világítás monitorozása mind befolyásolja az animáció megjelenését és letapogatását. Egy fényes animáció, amely tökéletesen letapogatja a monitort, kimoshatja egy kültéri képernyőn, vagy olvashatatlanná válhat ferde látószögben.',
      ],
      images: [
        {
          src: '/images/learn/animated-testing.png',
          alt: 'Vizsgálati mátrix, amely a különböző képkockákon, eszközökön és kijelzőkön keresztüli sikerességi arányokat mutatja',
          caption:
            'Animált QR vizsgálati protokoll: szisztematikus ellenőrzés képkockákon, eszközökön és megfigyelési körülményeken',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#animation',
          label: 'Nyisd ki a generátort',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-17',
          label: 'QR példák megtekintése',
          type: 'example',
        },
      ],
    },

    // Guide 5: QR Safety & Compliance
    {
      heading: 'QR Biztonsági és megfelelési legjobb gyakorlatok',
      paragraphs: [
        'A gyönyörűen megtervezett QR kód, amely nem szkenneli, rosszabb, mint a haszontalan - frusztrálja az ügyfelek, károkozás márka érzékelés, és elpazarolja minden erőforrás befektetett létrehozása és forgalmazása. Ez az útmutató azokra a technikai és gyakorlati tényezőkre vonatkozik, amelyek meghatározzák, hogy a QR-kód megbízhatóan szkennelhető-e, és hogyan lehet az ANQR biztonsági funkcióit használni a potenciális problémák észlelésére, mielőtt elérik a termelést.',
        'A QR-kód megbízhatósága nem bináris. Egy kód tökéletesen letapogathatja a zászlóshajó telefonokat, de a költségvetés nem működik. Lehet, hogy működik az ideális világítás, de küzdelem homályos éttermek vagy fényes napfény. A scannability-t befolyásoló tényezők megértése segít abban, hogy a vizuális stílus és a realworld megbízhatósága között tájékozottak legyenek.',
      ],
      images: [
        {
          src: '/images/learn/safety-overview.png',
          alt: 'A QR-kódokat mutató megbízhatósági spektrum a nagyon részletezhető és a kis mértékben olvasható kódoktól',
          caption:
            'A scannability spektrum: a golyóálló kódoktól a megbízhatósági korlátokat feszítő stílus',
        },
      ],
    },
    {
      heading: 'Hibaszintek megértése',
      paragraphs: [
        'A QR-kódok magukban foglalják a redundanciát, amely lehetővé teszi számukra, hogy olvassák, még akkor is, ha részben sérült vagy elhomályosodott. A hibajavítási szint - L (7%), M (15%), Q (25%) vagy H (30%) - meghatározza, hogy a kód mekkora része hiányzik, miközben még mindig helyesen dekódolja. A nagyobb hibajavítás nagyobb kódokat eredményez, de biztonsági tartalékot biztosít a felülírások, a nyomtatási hibák és a környezeti károk esetére.',
        'A képfelülettel rendelkező kódok esetében hibajavítási szint H elengedhetetlen - az átfedés fizikailag elfedi a kód egy részét, és szükség van arra, hogy 30% redundancia fenntartása megbízhatóság. A tiszta, stílustalan kódok ellenőrzött környezetben, szint M gyakran elegendő. Szint Az L-t azokra a helyzetekre kell fenntartani, amikor a kód mérete kritikus mértékben korlátozott, és Ön garantálhatja az eredeti feltételeket.',
      ],
    },
    {
      heading: 'A kritikus csendes zóna',
      paragraphs: [
        'A csendes zóna a vaktér minden QR kód körül. A szkennerek ezt a határt használják a kód kezdetének és végének azonosítására. Az ISO szabvány négy modul minimális csendes zónáját határozza meg (a kód legkisebb négyzetének négyszerese). A szkennelési hibák egyik leggyakoribb oka, hogy megsértjük ezt a helyet - tervezési elemekkel, szegélyszegéllyel vagy szomszédos tartalommal.',
        'Az ANQR csendes zónája segít fenntartani ezt a kritikus távolságot, de azt is meg kell győződnie róla, hogy megőrzi a végleges terveit. A QR műalkotások átadásakor egyértelműen meg kell határozni a csendes zóna követelményeit. A kódok elhelyezésekor győződjön meg róla, hogy nem hatoltak be elemek ebbe a térbe. Néhány milliméter tiszta tér jelentheti a különbséget megbízható szkenner és frusztrált ügyfelek.',
      ],
      images: [
        {
          src: '/images/learn/safety-quietzone.png',
          alt: 'A diagram mutatja a helyes csendes zóna osztás versus gyakori jogsértések, amelyek a szkennelési hibák',
          caption: 'Csendes zóna követelmények: a láthatatlan rés, amely meghatározza a scan siker',
        },
      ],
    },
    {
      heading: 'Kontraszt és színbiztonság',
      paragraphs: [
        'QR szkennerek érzékelik a fény- és sötét modulok mintáját. Bármilyen stílus, amely csökkenti ezt a kontraszt - könnyű előtér, sötét háttér, gradiens hatások, vagy alacsony opacitás overlays - megnehezíti a kódot olvasni. Az ANQR kiszámítja a kontrasztarányokat és figyelmeztet, ha a színválasztásaid veszélyes szintekhez közelítenek, de a végső arbiter mindig a realworld tesztelés.',
        'A színek érzékelése a fényviszonyok függvényében változik. A monitoron magas kontrasztnak tűnő színkombináció nehezen megkülönböztethető meleg izzólámpa vagy hideg fluoreszkáló csövek esetén. Ha az Ön kódját különböző világítási körülmények között alkalmazzák, több fényforrás mellett is tesztelik, és a konzervatívabb kontrasztarányokat biztonsági tartaléknak tekintik.',
      ],
    },
    {
      heading: 'A modul mérete és távolsága',
      paragraphs: [
        'Az egyes modulok fizikai mérete határozza meg azt a maximális távolságot, amelytől a kódot be lehet szkennelni. A kisebb modulok kisebb kódokat jelentenek, de nagyobb távolságokat igényelnek. Az általános szabály az, hogy minden modul legyen legalább 0,5 mm a tervezett letapogatási távolságon, arányosan növelve a nagyobb távolságokat. Egy hirdetőtáblán lévő kódnak sokkal nagyobb modulokra van szüksége, mint egy névjegykártyán lévő kódra.',
        'A modul méretének kiszámításakor figyelembe kell venni a legrosszabb eshetőséget: az ügyfél egy régebbi telefonnal, tökéletlen megvilágításban, a lehető legnagyobb távolságban. Design ennek a felhasználónak, és mindenki más lesz még jobb élményt. Az ANQR méretre vonatkozó ajánlásainak tényezője ezekben a realworld változókban, hogy megfelelő méreteket javasoljon az Ön tervezett használatához.',
      ],
      images: [
        {
          src: '/images/learn/safety-distance.png',
          alt: 'A modul méretére, nyomtatási méreteire és maximális tényleges letapogatási távolságára vonatkozó ábra',
          caption:
            'Távolsági útmutató lekérdezése: a modul méretének megfelelése a telepítési igényekhez',
        },
      ],
    },
    {
      heading: 'ANQR biztonsági üzemmód használata',
      paragraphs: [
        'Az ANQR biztonsági üzemmódja valós idejű visszajelzést nyújt a letapogatás megbízhatóságáról. Figyeli a kontrasztarányokat, a csendes zóna megfelelőségét, az átfedési intenzitást, és egyéb tényezőket, amelyek befolyásolják a scannability-t. Amikor bármely paraméter megközelíti a kockázatos szinteket, figyelmeztetéseket fog látni, konkrét útmutatással a megbízhatóság javítására. Amennyiben a meghibásodás költséges, a biztonsági üzemmód a tervezési folyamat során mindvégig aktív marad.',
        'A Safety Mode magában foglal egy letapogatási funkciót is, amely megpróbálja dekódolni a generált kódot, és sikerről vagy kudarcról számol be. Bár ez az in-app ellenőrzés nem képes megismételni minden real-world állapot, ez fog sok közös kérdéseket, mielőtt befektetnek a nyomtatás vagy forgalmazás. Kezelje a sikeres ellenőrzés, mint egy minimum bar, nem garancia - real-world tesztelés továbbra is elengedhetetlen.',
      ],
    },
    {
      heading: 'Real- World vizsgálati protokollok',
      paragraphs: [
        'Egyetlen szoftverellenőrzés sem helyettesíti a fizikai vizsgálatokat. Nyomtassa ki a kódot a kívánt méretű reprezentatív anyag. Tesztelje a tényleges telepítési környezetben a valós használatnak megfelelő világítási körülményekkel. Keresse meg több eszköz - nem csak a zászlóshajó telefon, de a költségvetés Android eszközök, régebbi iPhone, és bármilyen speciális eszközök a közönség általában használja.',
        'Dokumentálja a teszteket szisztematikusan. Jegyezze fel, hogy mely eszközöket tesztelték, milyen feltételek mellett, milyen eredményekkel. Ha a kódokat a skálán használja, állapítson meg elfogadási kritériumokat: talán 95% -os sikerességi arány az eszköz tesztmedencéjében, vagy 2 másodpercen belül az összes vizsgált eszközön. Ezek a szabványok segítenek, hogy a go / no-go döntések objektívek legyenek ahelyett, hogy a legjobbakat remélnék.',
      ],
      images: [
        {
          src: '/images/learn/safety-testing.png',
          alt: 'Az eszközök, feltételek és elfogadási kritériumok átfogó vizsgálati ellenőrző listája',
          caption:
            'QR telepítési vizsgálati protokoll: szisztematikus ellenőrzés a gyártási kötelezettségvállalás előtt',
        },
      ],
      links: [
        {
          href: '/?lang=${lang}&tab=advanced#safety',
          label: 'Nyisd ki a generátort',
          type: 'generator',
        },
        {
          href: '/examples?lang=${lang}#section-0',
          label: 'QR példák megtekintése',
          type: 'example',
        },
      ],
    },
  ],

  relatedLinks: [
    { href: '/examples?lang=${lang}', label: 'QR példák megtekintése', type: 'example' },
    {
      href: '/guide?lang=${lang}',
      label: 'A teljes felhasználói útmutató megnyitása',
      type: 'guide',
    },
    { href: '/gallery?lang=${lang}', label: 'A galéria megnyitása', type: 'gallery' },
  ],
};
