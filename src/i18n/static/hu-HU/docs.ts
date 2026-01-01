import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'oldal "ANQR felhasználói útmutató”',
  description: '"Teljes körű útmutató az ANQR QR-kódok létrehozásához való használatához.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Első lépések”',
      paragraphs: [
        '"Az ANQR egy kliensközpontú QR-kód generátor. Alapértelmezés szerint a QR-kódok lokálisan, a böngésződben generálódnak – nincs szükség fiókra, és az adataid bizalmasak maradnak. Professzionális beágyazáshoz a szerveroldali API-t is használhatod.”',
        '"A kezelőfelületnek három szintje van: Alap, Haladó és Professzionális. Válassza ki a szintet a fejlécben található fülek segítségével. Minden szint további funkciókat old fel, miközben a kezelőfelület a szükséges információkra összpontosít.”',
      ],
      bullets: [
        '"Alapvető: Egyszerű QR-kód létrehozása sima szöveges/URL-tartalmú és képátfedvényes QR-kóddal.”',
        '"Speciális: QR-kódolási beállítások, renderelési stílusok, animáció, kimeneti formátumok, bővített tartalomtípusok és az átfedés testreszabása.”',
        '"Professzionális: Vízjelek, metaadatok, megosztás, biztonsági elemzés, fizetési QR-kódok és vállalati funkciók.”',
      ],
    },
    {
      heading: '"Gyorsindítás”',
      paragraphs: [
        '"Az első QR-kód létrehozásához:”',
      ],
      bullets: [
        '"1. Válasszon ki egy tartalomtípust (URL, szöveg, WiFi stb.) a Tartalomtípus legördülő menüből.”',
        '"2. Írja be adatait a megadott mezőkbe.”',
        '"3. Opcionálisan testreszabhatja a színeket és stílusokat, valamint hozzáadhat egy átfedő képet.”',
        '"4. Kattintson az Exportálás gombra a QR-kód PNG, GIF, WebP vagy SVG formátumban történő letöltéséhez.”',
      ],
    },
    {
      heading: '"Alapvető funkciók”',
      paragraphs: [
        '"Az Alapszint leegyszerűsített felületet biztosít QR-kódok létrehozásához hasznos adatokkal és képátfedvényekkel. Ez a legegyszerűbb módja a kezdésnek.”',
      ],
    },
    {
      heading: '"Tartalomtípusok (alap)”',
      paragraphs: [
        '"Egyszerű szöveg: Bármilyen szöveg kódolása a QR-kód kapacitáskorlátjáig. Ideális rövid üzenetekhez, kódokhoz vagy azonosítókhoz.”',
        '"URL: Webcímek kódolása. A QR-kód beolvasáskor megnyitja az URL-t. Támogatja a http:// és https:// protokollokat.”',
      ],
    },
    {
      heading: '"Képátfedés (alap)”',
      paragraphs: [
        '"Tölts fel egy képet (JPG, PNG, GIF, WebP), hogy az összeolvadjon a QR-kódoddal. Az alapvető átfedési funkciók a következők:”',
      ],
      bullets: [
        '"Feltöltés fájlból: Válasszon ki egy képet az eszközéről.”',
        '"Betöltés URL-címről: Adjon meg egy kép URL-címét (engedélyeznie kell a CORS-t).”',
        '"Középre helyezett logó: A képet középre helyezi, a hibajavításra támaszkodva.”',
        '"Keverés: Kép egyszerű alfa-keverése QR-mintával.”',
        '"Intenzitás: Azt szabályozza, hogy a réteg milyen erősen befolyásolja a QR-kódot (0–100%).”',
        '"Színes mód: Teljes szín, szürkeárnyalatos vagy fekete-fehér.”',
        '"Kereső minták megőrzése: A sarokmintákat módosítatlanul tartja a megbízható szkennelés érdekében.”',
      ],
    },
    {
      heading: '"Speciális funkciók”',
      paragraphs: [
        '"A haladó szint feloldja a QR-kódolási lehetőségeket, a renderelési stílusokat, az animációt, a kimeneti formátumokat, a kibővített tartalomtípusokat és a speciális átfedések testreszabását.”',
      ],
    },
    {
      heading: '"QR kódolási beállítások”',
      paragraphs: [
        '"Verzió: A QR-kódok 1-40-es verziókban kaphatók, a magasabb verziók több adatot tartalmaznak, de nagyobbak. Állítsa 0-ra (Automatikus), hogy az ANQR a tartalomhoz illő legkisebb verziót válassza.”',
        '"Hibajavítás: Meghatározza, hogy egy QR-kód mennyi sérülést szenvedhet el, miközben beolvasható marad.”',
      ],
      bullets: [
        '"L (Alacsony): 7%-os hibajavítás – legkisebb méret, legkisebb redundancia.”',
        '"M (Közepes): 15%-os hibajavítás – kiegyensúlyozott opció.”',
        '"Q (kvartilis): 25%-os hibajavítás – nyomtatott kódokhoz jó.”',
        '"H (Magas): 30%-os hibajavítás – legjobban átfedéseket tartalmazó kódokhoz vagy zord körülményekhez.”',
      ],
    },
    {
      heading: '"Csendes zóna (Margó)”',
      paragraphs: [
        '"A csendes zóna a QR-kód körüli üres terület. A szkennereknek erre a margóra van szükségük ahhoz, hogy érzékeljék a kód kezdetét. A szabvány legalább 4 modult ajánl. 4 alá csökkentve szkennelési problémákat okozhat.”',
      ],
    },
    {
      heading: '"Modulstílus”',
      paragraphs: [
        '"A modulok az egyes négyzetek, amelyekből egy QR-kód áll. Az ANQR öt stílust kínál:”',
      ],
      bullets: [
        '"Négyzet: Klasszikus QR-megjelenés éles sarkokkal.”',
        '"Lekerekített: Lágyított sarkok a barátságosabb megjelenésért.”',
        '"Pontok: Kör alakú modulok a modern esztétikáért.”',
        '"Gyémánt: 45°-ban elforgatott négyzetek a jellegzetes minta érdekében.”',
        '"Összekapcsolódó: A modulok egymás mellé helyezve egyesülnek, organikus formákat hozva létre.”',
      ],
    },
    {
      heading: '"Keresőminta stílus”',
      paragraphs: [
        '"A keresőmintázatok a QR-sarkokban található három nagy négyzet, amelyek segítenek a szkennereknek a kód eligazodásában. Elérhető stílusok:”',
      ],
      bullets: [
        '"Négyzet: Szabványos derékszögű sarkok.”',
        '"Lekerekített: Lágyított sarkok, amelyek illeszkednek a lekerekített modul stílusához.”',
        '"Kör: Kör alakú keresőminták pontstílusú kódokhoz.”',
      ],
    },
    {
      heading: '"Igazítási és időzítési minták”',
      paragraphs: [
        '"Az igazítási minták a nagyobb QR-kódokon (2-es verzió+) jelennek meg a torzítás korrigálása érdekében. Az időzítési minták a keresőmintákat összekötő váltakozó vonalak.”',
      ],
      bullets: [
        '"Igazítási stílus: Egyezéskereső, Négyzet, Lekerekített vagy Kör.”',
        '"Időzítési stílus: Modulhoz illesztés, folytonos vagy szaggatott.”',
      ],
    },
    {
      heading: '"Színek”',
      paragraphs: [
        '"Előtér: A QR-modulok színe. A fekete (#000000) az alapértelmezett, de bármilyen sötét szín működik.”',
        '"Háttér: A háttérszín. A fehér (#ffffff) az alapértelmezett. Biztosítson megfelelő kontrasztot az előtérrel.”',
        '"Átlátszó háttér: Színes felületeken való használat esetén a hátteret teljesen el kell távolítani. Győződjön meg arról, hogy a felület megfelelő kontrasztot biztosít.”',
      ],
    },
    {
      heading: '"Modulméret és rés”',
      paragraphs: [
        '"Modulméret: Azt szabályozza, hogy az egyes modulok pixelekben megjelenített méretet jelenítsenek meg. Nagyobb értékek nagyobb, könnyebben beolvasható kódokat hoznak létre.”',
        '"Modulrés: Százalékosan növeli a modulok közötti távolságot. A kis rések (5-15%) bizonyos körülmények között javíthatják a szkennelést, de a túlzott rések csökkentik a megbízhatóságot.”',
      ],
    },
    {
      heading: '"Kimeneti beállítások”',
      paragraphs: [
        '"Formátum: Válassza ki az exportálási formátumot a felhasználási eset alapján.”',
      ],
      bullets: [
        '"PNG: Veszteségmentes raszteres formátum, a legtöbb felhasználásra ideális. Nyomtatáshoz és digitális nyomtatáshoz a legmegfelelőbb.”',
        '"WebP: Modern formátum kisebb fájlméretekkel. Jó webes használatra.”',
        '"GIF: Animált QR-kódokhoz szükséges. Átlátszóságot biztosít.”',
        '"SVG: Végtelenül skálázható vektorformátum. Nagyméretű nyomtatáshoz vagy a kód szerkesztéséhez a legmegfelelőbb.”',
      ],
    },
    {
      heading: '"Kimeneti méretek”',
      paragraphs: [
        '"Szélesség/Magasság: Állítsa be a kimeneti méretet pixelben. Nyomtatáshoz DPI alapján számoljon (pl. 300 DPI 1 hüvelyknél = 300 képpont). A nagyobb méretek megbízhatóbban szkennelnek távolról.”',
      ],
    },
    {
      heading: '"Animációs beállítások (Speciális)”',
      paragraphs: [
        '"Animált QR-kód viselkedésének szabályozása:”',
      ],
      bullets: [
        '"Sebesség: Animáció képkockasebessége milliszekundumban.”',
        '"Hosszú lejátszás: Folyamatos vagy egyszeri lejátszású animáció.”',
        '"Bounce: Pingpong animációs irány.”',
        '"Kezdő képkocka: Animáció indítása adott képkockától.”',
        '"Max képkockák: Az animációban lévő képkockák teljes számának korlátozása.”',
        '"Képkocka lépésköz: Képkockák átugrása a gyorsabb animáció érdekében.”',
        '"Interpoláció: Nincs, Áttűnés vagy Morfolás a képkockák között.”',
      ],
    },
    {
      heading: '"Tartalomtípusok (haladó)”',
      paragraphs: [
        '"A haladó szint további hasznos adatformátumokat old fel:”',
      ],
      bullets: [
        '"Telefonszám (tel:): Hívható telefonkapcsolatot hoz létre.”',
        '"Email (mailto:): Megnyitja az e-mail klienst opcionális tárggyal és szövegtörzzsel.”',
        '"SMS: Előre kitöltött szöveges üzenet telefonszámra.”',
        '"vCard: Teljes névjegykártya névvel, szervezettel, telefonszámmal, e-mail címmel és címmel.”',
        '"MeCard: Kompakt névjegykártya-formátum, népszerű Japánban.”',
        '"BizCard: Régi névjegykártya-formátum.”',
        '"Földrajzi helymeghatározás: GPS-koordináták, amelyek megnyílnak a térképen.”',
        '"WiFi: Hálózati hitelesítő adatok az automatikus csatlakozáshoz (SSID, jelszó, biztonsági típus).”',
        '"Naptári esemény: iCalendar formátum címmel, helyszínnel, dátummal/idővel.”',
        '"Esemény részvételi szándékának visszajelzése: Link az esemény regisztrációs oldalára.”',
        '"Naptár feliratkozás: ICS/WebCal hírcsatornára feliratkozás.”',
        '"Fájl/dokumentum URL: Közvetlen hivatkozás a letölthető fájlokhoz.”',
        '"Felhőtárhely-link: Linkek a Google Drive-hoz, Dropboxhoz, OneDrive-hoz stb.”',
        '"Közösségi profil: LinkedIn, Twitter, Instagram stb. linkek.”',
        '"Üzenetküldő link: WhatsApp, Telegram, Signal mélyhivatkozások.”',
      ],
    },
    {
      heading: '"Speciális átfedési funkciók”',
      paragraphs: [
        '"További átfedési lehetőségek:”',
      ],
      bullets: [
        '"Vágás: Engedélyezze a vágást a kép négyzet alakú területének kijelöléséhez.”',
        '"Féltónus: Klasszikus nyomtatási stílusú pontminta a kép fényereje alapján.”',
        '"Dithered: Hibaszórásos dithering a részletes reprodukció érdekében.”',
      ],
    },
    {
      heading: '"Átfedés keverési módok (haladó)”',
      paragraphs: [
        '"További keverési módok haladó szinten:”',
      ],
      bullets: [
        '"Alpixel: Minden modult alpixelekre oszt a nagyobb részletesség érdekében.”',
        '"Kék zaj: Kék zaj ditheringet használ a műtermékektől mentes mintázatok érdekében.”',
        '"Mozaik: Csempe alapú effektus, amely megőrzi a képszerkezetet.”',
        '"Rés kitöltése: Képet helyez a modulok közötti résekbe.”',
        '"Fényerő: A kép fényerejétől függően változtatja a modul méretét.”',
        '"Duotone: A képet két színre képezi le a feltűnő kontraszt érdekében.”',
      ],
    },
    {
      heading: '"Átfedés intenzitása”',
      paragraphs: [
        '"Azt szabályozza, hogy a QR-kódot milyen erősen befolyásolja az átfedés (0-100%). A magasabb értékek több képrészletet mutatnak, de csökkenthetik a szkennelhetőséget. Kezdje 70% körül, és a tesztelés alapján állítsa be.”',
      ],
    },
    {
      heading: '"Színmód”',
      paragraphs: [
        '"Hogyan dolgozza fel a fedvényképet:”',
      ],
      bullets: [
        '"Teljes szín: Megőrzi az eredeti képszíneket.”',
        '"Szürkeárnyalatos: Fekete-fehér tónusokká alakít.”',
        '"Fekete-fehér: Nagy kontrasztú bináris konverzió.”',
      ],
    },
    {
      heading: '"Kereső minták megőrzése”',
      paragraphs: [
        '"Engedélyezés esetén a három sarokkereső mintázatot nem módosítja az átfedés. A megbízható szkennelés érdekében erősen ajánlott.”',
      ],
    },
    {
      heading: '"Kép előfeldolgozás”',
      paragraphs: [
        '"Alkalmazzon szűrőket az átfedő képre a keverés előtt. Ezek a beállítások javíthatják a kép megjelenését a végső QR-kódban.”',
      ],
      bullets: [
        '"Fényerő (-100 és +100 között): A kép világosítása vagy sötétítése.”',
        '"Kontraszt (-100 és +100 között): Növeli vagy csökkenti a tónustartományt.”',
        '"Gamma (0,2–3,0): Nemlineáris fényerő-beállítás. Az 1 alatti értékek világosítják a középtónusokat, az 1 felettiek sötétítik azokat.”',
        '"Telítettség (-100 és +100 között): Színintenzitás. A -100 a szürkeárnyalatos, a +100 a túltelített.”',
        '"Színárnyalat forgatása (0-360°): Az összes szín eltolása a színkörön.”',
        '"Elmosás (0-20 képpont): Képrészletek lágyítása.”',
        '"Élesítés (0-100%): Élesítés és részletek kiemelése.”',
        '"Poszterizálás (0-16 szint): Csökkentse a színszinteket poszterhatás eléréséhez.”',
        '"Küszöbérték (0-255): Bináris fekete/fehérre konvertálás a határértéknél.”',
        '"Élészlelés: Sobel vagy Canny algoritmusok csak az élek megjelenítéséhez.”',
        '"Invertálás: Minden szín megfordítása.”',
      ],
    },
    {
      heading: '"Fitt mód”',
      paragraphs: [
        '"Hogyan illeszkedik a ráhelyezett kép a QR-kód területére:”',
      ],
      bullets: [
        '"Borító: A kép kitölti a teljes területet, szükség esetén levágva.”',
        '"Tartalmaz: A teljes kép látható, margókkal.”',
        '"Nyújtás: A kép torzul, hogy pontosan kitöltse.”',
      ],
    },
    {
      heading: '"Átalakítási beállítások”',
      paragraphs: [
        '"Forgatás: Az átfedés forgatása 90°-os lépésekben.”',
        '"X/Y tükrözés: A kép tükrözése vízszintesen vagy függőlegesen.”',
      ],
    },
    {
      heading: '"Dithering algoritmusok”',
      paragraphs: [
        '"A színárnyalatos képek QR-kódokkal ábrázolható mintázatokká alakíthatók. Színárnyalatos, kék zaj vagy valódi színárnyalatos keverési módok használatakor érhető el.”',
      ],
      bullets: [
        '"Hibadiffúzió: Klasszikus Floyd-Steinberg stílus. A kvantálási hibát kiterjeszti a szomszédos pixelekre.”',
        '"Rendezett (Bayer): Küszöbmátrixot használ a szabályos mintákhoz.”',
        '"Fürtözött pont: Féltónusú nyomtatást szimulál.”',
        '"Üres és klaszteres: Optimalizált rendezett dithering.”',
        '"Kék zaj: Vizuálisan kellemes, véletlenszerű kinézetű minta.”',
        '"Kék zaj küszöbérték: Küszöbérték-dithering kék zaj textúrával.”',
        '"Fehér zaj: Véletlenszerű küszöbérték-dithering.”',
        '"Gauss-/háromszögzaj: Különböző eloszlású zaj.”',
        '"Kék zaj + hibaszórás: Hibrid, amely mindkét technikát ötvözi.”',
        '"Szűrt kék zaj: képernyőszerű kék zajminta.”',
        '"Perceptuális: Fényerősség-súlyozás a jobb vizuális eredmények érdekében.”',
        '"Élfigyelő: Megőrzi a képszéleket a dithering során.”',
        '"Adaptív küszöbérték: Lokálisan adaptív küszöbérték-meghatározás.”',
        '"Időbeli kék zaj: Animált GIF-ek esetén képkockánként változik a minta.”',
      ],
    },
    {
      heading: '"Diffúziós kernelek”',
      paragraphs: [
        '"Hibaszórásos árnyalás használatakor válassza ki a hiba elosztásának módját:”',
      ],
      bullets: [
        '"Floyd-Steinberg: Klasszikus 4-szomszédos diffúzió. Jó általános választás.”',
        '"Jarvis-Judice-Ninke: 12 szomszédos, simább, de lassabb.”',
        '"Stucki: Hasonló a JJN-hez, csak más súlyokkal.”',
        '"Burkes: Egyszerűsített JJN, gyorsabb.”',
        '"Sierra: A minőséget és a sebességet egyensúlyba hozó kernelcsalád.”',
        '"Atkinson: Fényszórás, megőrzi a részleteket, de szemcsés lehet.”',
      ],
    },
    {
      heading: '"Támadó erő”',
      paragraphs: [
        '"A dithering mértékét szabályozza (0–100%). Az alacsonyabb értékek jobban megőrzik az eredeti mintázatot, a magasabb értékek több képrészletet jelenítenek meg.”',
      ],
    },
    {
      heading: '"Alpixel beállítások”',
      paragraphs: [
        '"Szubpixel keverési mód használatakor:”',
      ],
      bullets: [
        '"Rácsméret: 2×2, 3×3 vagy 4×4 alpixel modulonként. Nagyobb = részletesebb.”',
        '"Középponti szabály: A szigorú beállítás megköveteli a középső alképpontnak, hogy egyezzen a modullal. A félárnyalatos középpont variációkat tesz lehetővé.”',
        '"Semleges szín: Meghatározatlan alpixelekhez használt szín.”',
        '"Kereső felülbírálása: Hogyan jelennek meg a kereső mintái (tömör vagy stilizált).”',
      ],
    },
    {
      heading: '"Féltónus beállítások”',
      paragraphs: [
        '"Féltónusú keverési mód használata esetén:”',
      ],
      bullets: [
        '"Cellaméret: Modulonként vagy N×N rácsonként.”',
        '"Pont alakja: kör, négyzet vagy vonal.”',
        '"Fényerőgörbe: lineáris, S-görbe vagy gamma.”',
      ],
    },
    {
      heading: '"Kétszínű színek”',
      paragraphs: [
        '"Kéttónusú keverési mód használatakor állítsa be az Árnyék színét (sötét területek) és a Kiemelés színét (világos területek).”',
      ],
    },
    {
      heading: '"GIF animációs beállítások”',
      paragraphs: [
        '"Animált GIF-átfedések használata esetén:”',
      ],
      bullets: [
        '"Képkockák késleltetésének használata: Az eredeti GIF időzítésének tiszteletben tartása.”',
        '"Max FPS: Képkockasebesség korlátozása (1-60 fps).”',
        '"Szemétkezelés: A keretek megsemmisítési módszereinek tiszteletben tartása vagy egyszerűsítése.”',
      ],
    },
    {
      heading: '"Speciális renderelési beállítások”',
      paragraphs: [
        '"További renderelési vezérlők:”',
      ],
      bullets: [
        '"Hézag mód: Nincs, Beszúrás, Ecsetvonás vagy Negatív térköz hézagstílus.”',
        '"Sarokrádiusz: Lekerekített sarkok százalékos aránya moduloknál.”',
        '"Színátmenet: Nincs, Lineáris, Radiális vagy Kúpos színátmenet a modulokon.”',
        '"Szem külső/belső stílusa: Független stílus a keresőmintás gyűrűkhöz.”',
        '"Pontforgatás: Gyémánt/pont modulok forgatása.”',
        '"Szemméret: Méretbeállítás a kereső mintázataihoz.”',
        '"Keretstílus: Díszítő keretek hozzáadása (lekerekített keret, matrica, címke).”',
        '"Keret szövege: Adjon hozzá olyan szöveget a keretekhez, mint a "Szkennelj be!”.”',
      ],
    },
    {
      heading: '"Speciális QR-kódolás”',
      paragraphs: [
        '"QR-kódolás finomhangolása:”',
      ],
      bullets: [
        '"Kódolási mód: Automatikus, Numerikus, Alfanumerikus, Bájtos/UTF-8 vagy Kanji.”',
        '"Minimális csendes zóna érvényesítése: Legalább 4 modulnyi margó biztosítása.”',
      ],
    },
    {
      heading: '"Speciális kimeneti beállítások”',
      paragraphs: [
        '"További exportbeállítások:”',
      ],
      bullets: [
        '"Fájlnév: Egyéni fájlnév a letöltésekhez.”',
        '"GIF paletta mérete: 2–256 szín a GIF kimenetben.”',
        '"GIF kvantáló: Medián vágás, NeuQuant vagy Octree színcsökkentés.”',
        '"GIF-féle színkülönbség: Ki, Floyd-Steinberg, vagy elrendelt.”',
        '"GIF átlátszó színe: Állítson be egy színt átlátszóra.”',
        '"SVG True Vector: Útvonalak használata beágyazott raszter helyett.”',
        '"SVG alakzat pontossága: Pixel vagy precíz útvonal renderelés.”',
        '"SVG beágyazott raszteres átfedés: Átfedés beágyazott képként való beillesztése.”',
        '"Háttér felülírása: Adott háttérszín kikényszerítése a kimenetben.”',
      ],
    },
    {
      heading: '"Érvényesítési beállítások”',
      paragraphs: [
        '"Beviteli feldolgozási beállítások:”',
      ],
      bullets: [
        '"Bevitel érvényesítése: Tartalomformátum ellenőrzése kódolás előtt.”',
        '"Térközök vágása: Eltávolítja a kezdő/záró szóközöket.”',
        '"Sortörések normalizálása: Minden sorvég konvertálása LF-re.”',
        '"Maximális hosszvédelem: Figyelmeztetés, ha a tartalom meghaladja a QR-kód kapacitását.”',
      ],
    },
    {
      heading: '"Szakmai jellemzők”',
      paragraphs: [
        '"A Professzionális szint vízjeleket, metaadatokat, megosztási lehetőségeket, biztonsági elemzést, fizetési QR-kódokat és vállalati funkciókat ad hozzá.”',
      ],
    },
    {
      heading: '"Vízjel”',
      paragraphs: [
        '"Vízjelek hozzáadása QR-kódokhoz:”',
      ],
      bullets: [
        '"Fajta: Szöveg, kép vagy minta vízjel.”',
        '"Pozíció: Középen, Sarkokban, Széleken, Mögött vagy Csendes zónában.”',
        '"Átlátszóság: Vízjel átlátszósága (0-100%).”',
        '"Keverési mód: Normál, Szorzás, Képernyő vagy Átfedés keverés.”',
      ],
    },
    {
      heading: '"Metaadatok”',
      paragraphs: [
        '"Metaadatok beágyazása az exportált fájlokba:”',
      ],
      bullets: [
        '"Cím, Szerző, Szerzői jog, Licenc, Leírás mezők.”',
        '"Létrehozási idő: Generációs időbélyeg beágyazása.”',
        '"Egyéni kulcs-érték: Tetszőleges metaadatpárok hozzáadása.”',
      ],
    },
    {
      heading: '"Megosztás”',
      paragraphs: [
        '"QR-kód konfigurációk megosztása:”',
      ],
      bullets: [
        '"Közvetlen hivatkozás: Megosztható URL létrehozása a jelenlegi beállításokkal.”',
        '"HTML beágyazása: Beágyazási kód beszerzése webhelyekhez.”',
        '"Kódolási paraméterek: Az összes beállítás belefoglalása a megosztási URL-be.”',
        '"Megjegyzés: A helyi fájlokból származó átfedő képek nem oszthatók meg URL-címen keresztül.”',
      ],
    },
    {
      heading: '"Biztonsági elemzés”',
      paragraphs: [
        '"Győződjön meg arról, hogy a QR-kódok továbbra is beolvashatók:”',
      ],
      bullets: [
        '"Biztonságos mód: Kikapcsolva, Kiegyensúlyozott vagy Szigorú szkennelési követelmények.”',
        '"Min. modulméret: Minimális pixelméret modulonként.”',
        '"Minimális csendes zóna: Minimális margójú modulok.”',
        '"Zárkeresők/Időzítés/Igazítás/Formátum/Verzió: Meghatározott elemek védelme.”',
        '"Maximális átfedési intenzitás ECC szerint: Automatikus intenzitáskorlátok a hibajavítási szint alapján.”',
      ],
    },
    {
      heading: '"Tartalomtípusok (professzionális)”',
      paragraphs: [
        '"A professzionális szint fizetési és vállalati tartalomtípusokat ad hozzá:”',
      ],
      bullets: [
        '"EPC/SEPA (EU): Európai banki átutalások QR-kódjai IBAN-nal, BIC-kel, összeggel, hivatkozással.”',
        '"UPI (India): Egységes fizetési felület VPA-val, kedvezményezett neve, összeg.”',
        '"PayNow (Szingapúr): Gyorsfizetés Szingapúrban UEN-nel vagy mobilszámmal.”',
        '"PromptPay (Thaiföld): Thaiföldi nemzeti fizetési rendszer.”',
        '"PIX (Brazília): Brazil azonnali fizetés PIX kulccsal.”',
        '"Kripto: Bitcoin, Ethereum, Litecoin fizetési címek opcionális összeggel.”',
        '"Marketingkampány link: URL-ek teljes UTM paraméter (marketingcímkék) követéssel.”',
        '"Rövid link: URL-rövidítőkkel használható dinamikus/nyomon követhető QR-kódokhoz.”',
        '"GS1 digitális kapcsolat: Termékazonosítás GTIN, sorozatszám, tételszám és lejárat alapján.”',
        '"Alkalmazás mélylinkje: iOS/Android alkalmazások mélylinkjei egyéni sémákkal.”',
        '"Egyéni formátum: Nyers adatok formázás és érvényesítés nélkül.”',
      ],
    },
    {
      heading: '"Nyelvfüggő fizetések speciális módban”',
      paragraphs: [
        '"Speciális mód használatakor az ANQR automatikusan megjeleníti a kiválasztott nyelvhez kapcsolódó fizetési módokat. Például a vietnami felhasználók a VietQR-t, a thai felhasználók a PromptPay-t, az indiai nyelvet használók pedig az UPI-t és a BharatQR-t látják. A globális fizetési módok (kriptovaluta, PayPal, Cash App) minden nyelven elérhetők. A professzionális mód nyelvtől függetlenül minden fizetési szabványt felold.”',
      ],
    },
    {
      heading: '"Európai Fizetési Szabványok”',
      bullets: [
        '"EPC/SEPA (EU): Európai banki átutalások QR-kódjai az EPC QR-kód szabvány szerint. Támogatja az IBAN-t, a BIC-t (belföldi átutalások esetén opcionális), az EUR-ban megadott összeget, valamint a strukturált vagy strukturálatlan fizetési hivatkozásokat. A SEPA zónában használatos, beleértve az EU-országokat, valamint Svájcot, Norvégiát, Izlandot, Liechtensteint, Monacót és San Marinót.”',
        '"Svájci QR-számla: Svájci fizetési szabvány a SIX implementációs irányelvek alapján. Támogatja a CHF és EUR pénznemeket, a QR-referenciát (QRR), a hitelezői referenciát (ISO 11649), a strukturált hitelező/adós címeket és a számlainformációkat. 2022 óta kötelező a svájci számlákhoz.”',
      ],
    },
    {
      heading: '"Indiai fizetési szabványok”',
      bullets: [
        '"UPI (India): Egységes fizetési felület az NPCI mélylinkelési specifikációját követve. Támogatja a VPA-t (virtuális fizetési cím), a kedvezményezett nevét, az INR-ben megadott összeget, a tranzakciós megjegyzést, a referenciaazonosítót, a kereskedő kategóriakódját és a tranzakciós módot.”',
        '"BharatQR (India): Egységes QR-szabvány, amely támogatja mind az UPI, mind a kártyaalapú fizetéseket. Az UPI VPA-t a kártya PAN-jával kombinálja a maximális kompatibilitás érdekében. Tartalmazza a kereskedő nevét, városát, MCC-jét, GST-adatait, valamint a számla-/hivatkozási számokat.”',
      ],
    },
    {
      heading: '"Délkelet-ázsiai fizetési szabványok”',
      bullets: [
        '"PayNow (Szingapúr): Szingapúri gyorsfizetési rendszer, amely az EMVCo QR specifikációt és az SGQR profilt használja. Támogatja az UEN-t (cégbejegyzés), a mobilszámot vagy az NRIC-t proxy azonosítóként. Tartalmazza az összeg szerkeszthetőségét és a lejárati dátumot.”',
        '"PromptPay (Thaiföld): Thaiföldi nemzeti fizetési rendszer, amely a Bank of Thailand EMV profilját követi. Támogatja a mobilszámot, a személyi igazolványt, az adóazonosítót, az e-pénztárca azonosítót és a számlafizetést több referenciamezővel.”',
        '"QRIS (Indonézia): Indonéz gyors válaszkód szabvány. EMV-alapú nemzeti fizetési szabvány, amely támogatja a kereskedőazonosítót, az NMID-t (nemzeti kereskedőazonosító), a kereskedői kritériumok besorolását és a kényelmi díjakat (fix vagy százalékos).”',
        '"DuitNow (Malajzia): Maláj azonnali fizetési rendszer. Több proxy típust támogat, beleértve az országos adószámot, a mobilszámot, az útlevelet, a katonai igazolványt és a cégjegyzékszámot.”',
        '"VietQR (Vietnam): Vietnámi bankközi átutalási szabvány. Banki BIN-t (NAPAS azonosító) és számlaszámot igényel. Több szolgáltatáskódot támogat a különböző átutalási típusokhoz (QRPUSH, QRIBFTTA, QRIBFTTC).”',
        '"QR Ph (Fülöp-szigetek): Fülöp-szigeteki QR-fizetési szabvány az InstaPay és a PESONet számára. Kereskedőazonosítóval ellátott számlaszámokat használ a P2M (személy-kereskedő) tranzakciókhoz.”',
      ],
    },
    {
      heading: '"Kelet-ázsiai fizetési szabványok”',
      bullets: [
        '"TWQR (Tajvan): Tajvani QR-fizetési szabvány. Támogatja a kereskedőazonosítót, az adóazonosítót és a TWD összegeket.”',
        '"HKQR/FPS (Hongkong): Hong Kong Faster Payment System QR-kódok. Fizetési azonosítóként támogatja az FPS azonosítót, a mobilszámot vagy az e-mail címet. Az összegek HKD-ben vannak megadva.”',
        '"JPQR (Japán): Egységes japán QR-kódos fizetési szabvány. Az üzlet azonosítóját használja a kereskedő azonosítására JPY összegek esetén.”',
      ],
    },
    {
      heading: '"Egyéb regionális fizetési szabványok”',
      bullets: [
        '"PIX (Brazília): A brazil központi bank azonnali fizetési rendszere a BR Code specifikációját követi. Támogatja a PIX kulcsokat (CPF, CNPJ, e-mail, telefonszám vagy véletlenszerű kulcs), a kereskedő nevét/városát, a tranzakcióazonosítót és a BRL összegeket.”',
        '"AusPayNet/NPP PayID (Ausztrália): Az ausztrál új fizetési platform PayID rendszere. Támogatja a PayID típusokat (e-mail, mobil, ABN, szervezeti azonosító) vagy a hagyományos BSB + számlaszámot. A kereskedő neve opcionális, mivel a fizetők a regisztrált nevet látják az NPP kereséséből.”',
      ],
    },
    {
      heading: '"Kriptovaluta fizetések”',
      bullets: [
        '"Bitcoin/Litecoin (BIP-21): Standard kriptovaluta fizetési URI-k tárcacímmel, opcionális összeggel és címkével. Kompatibilis az összes főbb Bitcoin és Litecoin tárcával.”',
        '"Lightning Network (BOLT11): Lightning Network fizetési számlák. Illesszen be egy BOLT11 kódolású számla karakterláncot azonnali Bitcoin fizetésekhez minimális díjakkal.”',
        '"Ethereum (EIP-681): Ethereum tranzakciókérés URI-k, amelyek támogatják a natív ETH átutalásokat és az ERC-20 token átutalásokat. Tartalmazza a láncazonosítót a többhálózatos támogatáshoz (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), gázparamétereket és szerződéses függvényhívásokat.”',
      ],
    },
    {
      heading: '"Fizetési linkszolgáltatások”',
      bullets: [
        '"PayPal.Me: PayPal fizetési linkek felhasználónévvel és opcionálisan előre kitöltött összeggel. A címzettek PayPal-egyenlegükkel, kártyájukkal vagy bankszámlájukkal fizethetnek.”',
        '"Cash App: Cash App fizetési linkek $cashtag használatával, opcionális összeggel. Népszerű az Egyesült Államokban peer-to-peer fizetésekhez.”',
      ],
    },
    {
      heading: '"Általános EMV QR”',
      bullets: [
        '"EMV Generic: Egyéni EMV Merchant-Presented Mode QR-kódok létrehozása a konkrétan fel nem sorolt fizetési sémákhoz. Konfigurálja a kereskedő nevét, városát, országkódját (ISO 3166-1), pénznemkódját (ISO 4217 numerikus), MCC-jét, borravaló/kényelmi díj opcióit és további adatmezőket. Hasznos teszteléshez vagy egyéni integrációkhoz.”',
      ],
    },
    {
      heading: '"Átfedéses keverési módok (Professzionális)”',
      paragraphs: [
        '"További keverési módok professzionális szinten:”',
      ],
      bullets: [
        '"Pixelate: Pixeles átfedő effektus.”',
        '"Körvonal: Az élérzékelési átfedés csak a kontúrokat mutatja.”',
        '"Hullám: Hullámos torzítási effektus.”',
        '"Alpixelméret: Változó alpixelméret a kép alapján.”',
        '"Valódi árnyalás: Speciális árnyalás rendezett mátrixkiválasztással.”',
        '"Extrém: Maximális képláthatóság, befolyásolhatja a szkennelhetőséget.”',
      ],
    },
    {
      heading: '"Védelmi beállítások”',
      paragraphs: [
        '"Finomhangolt szabályozás a QR-kódok módosításától védett elemek felett:”',
      ],
      bullets: [
        '"Időzítés megőrzése: Az időzítési minták módosítás nélküli megőrzése.”',
        '"Igazítás megőrzése: Az igazítási minták módosítás nélküli megőrzése.”',
        '"Védelmi formátum információk: Védett formátum információs modulok.”',
        '"Védelmi verzióinformációk: Védett verzióinformációs modulok.”',
      ],
    },
    {
      heading: '"ECC-tudatos mód”',
      paragraphs: [
        '"Intelligensen osztja el az átfedési intenzitást a hibajavító kapacitás alapján. A rendszer elemzi, hogy mely modulok módosíthatók a szkennelhetőség megőrzése mellett.”',
      ],
      bullets: [
        '"Kockázati költségvetés: A felhasználható hibajavító kapacitás százalékos aránya (0–100%).”',
        '"Nagyobb költségvetés = láthatóbb réteg, de kockázatosabb áttekinthetőség.”',
        '"Alacsonyabb költségvetés = biztonságosabb szkennelés, de kevésbé látható réteg.”',
      ],
    },
    {
      heading: '"Professzionális renderelési beállítások”',
      paragraphs: [
        '"Speciális renderelési vezérlők:”',
      ],
      bullets: [
        '"Éles élek: Pixelezett képmegjelenítés használata éles modulélekhez.”',
        '"Pixel illesztés: Padló, Kerek vagy Plafon pixel igazítása.”',
        '"Modulonkénti színmód: Egyszínű, Fényerő szerint, Pozíció szerint, Átfedés szerint, Klaszter szerint.”',
        '"Színpaletta: Egyéni színpaletta meghatározása modulonkénti színezéshez.”',
        '"Kontrasztvédelem: Biztosítsa a színek közötti minimális kontrasztarányt.”',
        '"Minimális kontrasztarány: WCAG-stílusú kontrasztkövetelmény (1:1-től 21:1-ig).”',
        '"Extra határmodulok: További határ a csendes zónán túl.”',
      ],
    },
    {
      heading: '"Professzionális kimeneti beállítások”',
      paragraphs: [
        '"Vállalati exportbeállítások:”',
      ],
      bullets: [
        '"DPI: Állítsa be a nyomtatási felbontást (72–600 DPI). Nyomtatáshoz 300 DPI ajánlott.”',
        '"Csendes zóna beillesztése: Csendes zóna be-/kikapcsolása a kimeneti méretekben.”',
        '"Exportálás további formátumként: PDF létrehozása az elsődleges formátum mellett.”',
      ],
    },
    {
      heading: '"Animációs beállítások (Professzionális)”',
      paragraphs: [
        '"További professzionális animációs funkciók:”',
      ],
      bullets: [
        '"Időbeli dither: Ki, Kékzaj vagy Villogásmentes képkockánkénti dithering.”',
        '"Minta: Nincs, Pulzálás, Hullám, Pásztázó vonal, Csillámlás vagy Sodródás effektek.”',
      ],
    },
    {
      heading: '"API-referencia”',
      paragraphs: [
        '"Az ANQR szerveroldali API-t biztosít QR-kódok URL-paramétereken keresztüli generálásához. Ez ideális QR-kódok weboldalakba, e-mailekbe, dokumentumokba vagy automatizált munkafolyamatokba való beágyazásához kliensoldali JavaScript nélkül.”',
        '"Alap URL: https://anqr.link/api/qr”',
      ],
    },
    {
      heading: '"Alapvető paraméterek”',
      paragraphs: [
        '"Kötelező és gyakori paraméterek (a paraméternevek nincsenek lefordítva):”',
      ],
      bullets: [
        '"adatok (kötelező): A QR-kódban kódolandó tartalom. URL-kódolású speciális karakterek.”',
        '"méret: Kép mérete pixelben (alapértelmezett: 400, max: 2000). Akkor használatos, ha a szélesség/magasság nincs megadva.”',
        '"sz, h: Kimeneti szélesség és magasság pixelben. Felülírja a méretparamétert.”',
        '"formátum: Kimeneti formátum — png, webp vagy gif (alapértelmezett: png).”',
        '"ec: Hibajavítási szint — L, M, Q vagy H (alapértelmezett: H).”',
        '"fg: Előtérszín hexadecimális számként # nélkül (alapértelmezett: 000000).”',
        '"bg: Háttérszín hexadecimálisan, # nélkül (alapértelmezett: ffffff).”',
        '"átlátszó: Állítsd 1-re az átlátszó háttérhez.”',
        '"margin: Csendes zóna a modulokban (alapértelmezett: 4).”',
      ],
    },
    {
      heading: '"Stílusparaméterek”',
      paragraphs: [
        '"Modul- és mintaformázás:”',
      ],
      bullets: [
        '"stílus: Modulstílus – négyzet, lekerekített, pontok, rombusz, összekötött.”',
        '"finder: Finder minta stílusa – négyzet, lekerekített, kör.”',
        '"align: Igazítási minta stílusa — match_finder, négyzet, lekerekített, kör.”',
        '"timing: Időzítési minta stílusa — match_module, tömör, szaggatott.”',
        '"radius: Saroksugár százalékos értéke 0–100.”',
        '"rés: Modulrés százalékos értéke 0–50.”',
        '"gapMode: Résmód — nincs, beszúrt, körvonal, negatív_tér.”',
        '"eyeOuter, eyeInner: Szemstílusok – négyzet, lekerekített, kör.”',
        '"eyeScale: Szemméret százalékos értéke (alapértelmezett: 100).”',
        '"grad: Gradiens típusa – nincs, lineáris, radiális, kúpos.”',
        '"gradAngle: Lineáris színátmenetek színátmenet szöge.”',
        '"gradStops: A színátmenet megáll a következőképpen: color1,pos1,color2,pos2,… (pl. ff0000,0,0000ff,1).”',
      ],
    },
    {
      heading: '"Átfedési paraméterek”',
      paragraphs: [
        '"Képátfedés beállításai (az átfedés képét a szerveroldal tölti le):”',
      ],
      bullets: [
        '"img: URL a kép átfedéséhez (nyilvánosan elérhetőnek kell lennie).”',
        '"mód: Átfedés mód — középre, félárnyékra, keverésre, fényerőre, mozaikra, ditherre, kékzajra, alpixelre.”',
        '"intenzitás: Átfedés intenzitása 0-100 (alapértelmezett: 100).”',
        '"colorMode: Átfedés színmódja — színes, szürkeárnyalatos, fekete-fehér.”',
        '"illeszkedés: Hogyan illeszkedik a fedvény – lefed, tartalmaz, nyújt.”',
        '"rot: Átfedés forgatása fokban.”',
        '"flipX, flipY: 1-re állítva tükrözi az átfedést.”',
        '"keepFinders: Keresőminták megőrzése (alapértelmezett: 1).”',
        '"keepTiming, keepAlign: Állítsa 1-re az időzítési/igazítási minták megőrzéséhez.”',
      ],
    },
    {
      heading: '"Előfeldolgozási paraméterek”',
      paragraphs: [
        '"Kép előfeldolgozás alkalmazva az átfedésre:”',
      ],
      bullets: [
        '"fényerő: Beállítás -100 és 100 között (alapértelmezett: 0).”',
        '"kontraszt: Beállítás -100-tól 100-ig (alapértelmezett: 0).”',
        '"gamma: Érték 0,1 és 3 között (alapértelmezett: 1).”',
        '"telítettség: Beállítás -100-tól 100-ig (alapértelmezett: 0).”',
        '"árnyalat: Színárnyalat-forgatás fokban.”',
        '"elmosás: Elmosás képpontokban.”',
        '"élesítés: Élesítés mértéke 0-100.”',
        '"poszterizálás: Szintek poszterizálása.”',
        '"küszöbérték: Bináris küszöbérték 0–255.”',
        '"él: Élészlelés — ki, sobel, ravasz.”',
        '"invertálás: Állítsa 1-re a színek invertálásához.”',
      ],
    },
    {
      heading: '"Vízjel paraméterek”',
      paragraphs: [
        '"Vízjelek hozzáadása a létrehozott QR-kódokhoz:”',
      ],
      bullets: [
        '"wmEn: 1-re állítva engedélyezheti a vízjelet.”',
        '"wmKind: Vízjel típusa — szöveg, kép, minta.”',
        '"wmText: Vízjel szövege (URL-kódolású).”',
        '"wmImg: Vízjelkép URL-címe.”',
        '"wmPos: Pozíció — középen, sarkok, élek, mögött, csendes_zóna.”',
        '"wmOpacity: Opacitás 0-100 (alapértelmezett: 50).”',
        '"wmBlend: Keverési mód — normál, szorzó, képernyő, átfedés.”',
      ],
    },
    {
      heading: '"Animációs paraméterek”',
      paragraphs: [
        '"Animált GIF kimenethez (format=gif szükséges):”',
      ],
      bullets: [
        '"animPattern: Animációs minta — nincs, pulzus, hullám, pásztázási vonal, csillogás, sodródás, színciklus.”',
        '"animKeretek: Képkockák száma 1-60 (alapértelmezett: 24).”',
        '"animSpeed: Képkocka késleltetés milliszekundumban 10-1000 (alapértelmezett: 100).”',
        '"animSeed: Véletlenszerű vetőmag az animációhoz.”',
        '"easing: Animáció easing — lineáris, easy_in, easy_out, easy_in_out, pattogás.”',
      ],
    },
    {
      heading: '"Kimeneti paraméterek”',
      paragraphs: [
        '"Kimeneti formátum beállításai:”',
      ],
      bullets: [
        '"minőség: WebP minőség 0-1 (alapértelmezett: 0,9).”',
        '"webpQ: WebP minőség 0-100 (alapértelmezett: 90).”',
        '"gifColors: GIF paletta mérete 2-256 (alapértelmezett: 256).”',
        '"dpi: PNG kimeneti DPI-je (alapértelmezett: 72).”',
        '"metaTitle, metaAuthor, metaCopy, metaDesc: PNG metaadatmezők.”',
      ],
    },
    {
      heading: '"Példahasználat”',
      paragraphs: [
        '"Alap QR-kód:”',
        '"https://anqr.link/api/qr?data=https://example.com”',
        '"Stílusos QR-kód egyéni színekkel:”',
        '"https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30”',
        '"QR-kód ráfedésképpel:”',
        '"https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70”',
        '"Animált GIF:”',
        '"https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out”',
      ],
    },
    {
      heading: '"QR-kódok beágyazása”',
      paragraphs: [
        '"Professzionális módban a Megosztás funkció beágyazható HTML-t és URL-eket generál. A beágyazás a következőképpen működik:”',
      ],
      bullets: [
        '"Link megosztása: Létrehoz egy URL-t az ANQR alkalmazáshoz, amelyben az összes beállítás URL-paraméterként van kódolva. A címzettek megtekinthetik és módosíthatják a QR-kódot.”',
        '"Kép beágyazása: Létrehoz egy címkét, amely a szerver API-jára mutat. A QR-kód szerveroldalon jelenik meg, és képként szolgál.”',
        '"Markdown beágyazása: Markdown képszintaxist hoz létre a dokumentációhoz és a README fájlokhoz.”',
        '"Közvetlen API URL: A nyers API URL alkalmazásokban, szkriptekben vagy más integrációkban való használatra.”',
      ],
    },
    {
      heading: '"HTML példa”',
      paragraphs: [
        '"QR-kód beágyazása a webhelyére:”',
        '"<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="QR kód" />”',
        '"Reszponzív méretezés esetén:”',
        '"<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="QR Code" style="max-width: 100%; height: auto;" />”',
        '"A szerver hosszú gyorsítótár-fejlécekkel gyorsítja fel a válaszokat, így az ugyanazon URL-címre vonatkozó ismételt kérések gyorsak.”',
      ],
    },
    {
      heading: '"URL megosztási formátuma”',
      paragraphs: [
        '"Amikor a Megosztás gombra kattint Professzionális módban, az ANQR URL-paraméterekké kódolja az aktuális beállításait. A formátum a következő:”',
        '"https://anqr.link/?data=…&ec=H&style=rounded&….”',
        '"Ezek a paraméterek tükrözik az API paramétereket, így egy megosztott URL-t API URL-lé konvertálhat az alap elérési út /-ról /api/qr-re módosításával, és a w/h paraméterek szükség szerinti módosításával.”',
        '"Megjegyzés: A helyi fájlokból feltöltött átfedő képek nem oszthatók meg URL-en keresztül – csak az URL-alapú átfedések (img paraméter) működnek megosztott hivatkozásokban és API-hívásokban.”',
      ],
    },
    {
      heading: '"Díjkorlátok és használat”',
      paragraphs: [
        '"Az API ésszerű mennyiség esetén ingyenesen használható. Nagy volumenű használat vagy garantált üzemidőt igénylő kereskedelmi alkalmazások esetén kérjük, vegye fel velünk a kapcsolatot.”',
        '"Az API-válaszok agresszív gyorsítótárazási fejléceket tartalmaznak. A legjobb teljesítmény érdekében gyorsítótárazza a válaszokat a saját oldalán, vagy használja következetesen ugyanazt az URL-címet azonos QR-kódokhoz.”',
      ],
    },
    {
      heading: '"Bevált gyakorlatok”',
      paragraphs: [
        '"A megbízható QR-kódokért kövesse az alábbi irányelveket:”',
      ],
      bullets: [
        '"Nyomtatás előtt mindig teszteld a QR-kódokat több szkenneralkalmazással.”',
        '"Átfedések hozzáadásakor használja a H (Magas) hibajavítást.”',
        '"Legalább 4 modulnyi csendes zónát (margót) kell tartani.”',
        '"Biztosítson nagy kontrasztot az előtér és a háttér között.”',
        '"Nyomtatáshoz legalább 300 DPI felbontást használjon, és a tényleges nyomtatási méretben tesztelje.”',
        '"Keresőminták megőrzésének engedélyezése átfedések használatakor.”',
        '"Kezdje alacsonyabb fedési intenzitással, és fokozatosan növelje.”',
        '"Kültéri használat esetén nagyobb modulméreteket és magasabb hibajavítást kell figyelembe venni.”',
      ],
    },
    {
      heading: '"Hibaelhárítás”',
      paragraphs: [
        '"Gyakori problémák és megoldások:”',
      ],
      bullets: [
        '"A QR-kód nem olvassa be: Csökkentse az átfedés intenzitását, növelje a hibajavítást, ellenőrizze a kontrasztot.”',
        '"A kód túl nagy: Csökkentsd a tartalom hosszát, használj URL-rövidítőt, régebbi verziót.”',
        '"Elmosódott kimenet: Növelje a modul méretét, használjon PNG-t tömörített formátumok helyett.”',
        '"A színek rosszul néznek ki: Ellenőrizze a színkontrasztot, próbálja ki a szürkeárnyalatos átfedési módot.”',
        '"A GIF nem animál: GIF formátumú kimenetet használ, ellenőrizze a képkockaszámot.”',
        '"A képátfedés nem töltődik be: Ellenőrizze a CORS-engedélyeket a távoli képeken.”',
      ],
    },
    {
      heading: '"Billentyűparancsok”',
      paragraphs: [
        '"Az ANQR támogatja a szabványos billentyűparancsokat. Használja a Ctrl/Cmd+S billentyűkombinációt az exportálás elindításához (amikor az előnézeten van a fókusz).”',
      ],
    },
    {
      heading: '"Megosztás és beágyazás”',
      paragraphs: [
        '"Professzionális módban kattintson a Megosztás gombra egy URL-cím másolásához az aktuális beállításokkal. A címzettek megnyithatják ezt az URL-címet a pontos konfiguráció megtekintéséhez. Megjegyzés: A helyi fájlokból származó átfedő képek nem oszthatók meg URL-címen keresztül.”',
      ],
    },
  ],
};

export default docs;
