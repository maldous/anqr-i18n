import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const terms: PageDefinition = {
  title: '"Szolgáltatási feltételek”',
  description: '"A webhely elérésével vagy használatával Ön elfogadja ezeket a feltételeket.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Feltételek elfogadása”',
      paragraphs: [
        '"Az ANQR (anqr.link) elérésével vagy használatával Ön elfogadja a jelen Szolgáltatási Feltételeket és az Adatvédelmi Szabályzatunkat. Ha nem ért egyet ezekkel a feltételekkel, ne használja az oldalt.”',
        '"Időről időre frissíthetjük ezeket a Feltételeket. A webhely további használata a változtatások után az új feltételek elfogadását jelenti.”',
      ],
    },
    {
      heading: '"Jogosultság”',
      paragraphs: [
        '"Az ANQR használatához legalább 13 évesnek kell lennie. A webhely használatával Ön kijelenti, hogy megfelel ennek a korhatár-követelménynek. Ha 18 év alatti, akkor Ön kijelenti, hogy rendelkezik szülője vagy gyámja engedélyével a webhely használatához.”',
      ],
    },
    {
      heading: '"Engedélyezett használat”',
      paragraphs: [
        '"Az ANQR-t kizárólag jogszerű célokra használhatja. Kizárólag Ön felelős a QR-kódokba kódolt tartalomért és azért, hogyan használja fel az Ön által generált QR-kódokat.”',
      ],
    },
    {
      heading: '"Tiltott magatartás”',
      paragraphs: [
        '"Ön beleegyezik, hogy nem:”',
      ],
      bullets: [
        '"Használjon ANQR-t QR-kódok létrehozására, amelyek megkönnyítik az adathalászatot, a rosszindulatú programok terjesztését, a csalást, az átveréseket, a zaklatást, a rágalmazást vagy bármilyen illegális tevékenységet.”',
        '"Olyan tartalom kódolása, amely sérti a szellemi tulajdonjogokat, megsérti a magánéletet, vagy illegális anyagot tartalmaz.”',
        '"A webhely működésének vagy biztonságának megzavarására, túlterhelésére vagy akadályozására tett kísérlet.”',
        '"Visszafejtse, dekompilálja vagy próbálja meg kinyerni a forráskódot az oldalról.”',
        '"Automatizált eszközök (botok, adatkaparók) használata az oldal olyan módon történő eléréséhez, amely rontja a teljesítményt más felhasználók számára.”',
        '"Bármely biztonsági vagy hozzáférés-vezérlési funkció megkerülése vagy letiltása.”',
        '"Bármely személy vagy szervezet személyazonosságának kiadásával, illetve a hovatartozásod félrevezető feltüntetésével.”',
      ],
    },
    {
      heading: '"Szellemi tulajdon”',
      paragraphs: [
        '"Megtartod a QR-kódokba kódolt tartalom tulajdonjogát. Az ANQR nem tart igényt az adataid tulajdonjogára.”',
        '"Az ANQR név, logó, felületkialakítás és az alapul szolgáló kód szerzői jogi, védjegy- és egyéb szellemi tulajdonjogi törvények védelme alatt áll. Engedélyünk nélkül tilos másolni, módosítani, terjeszteni vagy származékos műveket létrehozni.”',
        '"A QR Code® a DENSO WAVE INCORPORATED bejegyzett védjegye. Az ANQR nem áll kapcsolatban a DENSO WAVE-vel.”',
      ],
    },
    {
      heading: '"Felhasználói tartalomlicenc”',
      paragraphs: [
        '"Az ANQR használatával semmilyen jogot nem ad nekünk a tartalmához. Helyi generálás (alapértelmezett) használata esetén minden QR-kód generálása a böngészőjében történik, és mi nem férünk hozzá, nem tároljuk és nem továbbítjuk a kódolt adatait.”',
        '"A szerveroldali API használatakor a tartalom feldolgozásra kerül a QR-kép létrehozásához, de nem tárolódik, nem naplózódik és nem kerül felhasználásra a kért kép megjelenítésén túl semmilyen más célra.”',
      ],
    },
    {
      heading: '"Harmadik féltől származó szolgáltatások és hirdetések”',
      paragraphs: [
        '"A webhely hirdetéseket jelenít meg a Google AdSense-en keresztül, és tartalmazhat harmadik fél webhelyeire mutató linkeket. Nem vállalunk felelősséget a harmadik féltől származó tartalmakért, szolgáltatásokért vagy adatvédelmi gyakorlatokért.”',
        '"A hirdetőkkel és harmadik felekkel folytatott interakciói kizárólag Ön és közöttük történnek. A hirdetési adatokkal kapcsolatos gyakorlattal kapcsolatos információkért tekintse meg Adatvédelmi irányelveinket.”',
      ],
    },
    {
      heading: '"Jótállás kizárása”',
      paragraphs: [
        '"AZ ANQR-t "JELENLEGI ÁLLAPOTBAN” ÉS "ELÉRHETŐSÉG SZERINT” BIZTOSÍTJUK, BÁRMILYEN KIFEJEZETT VAGY VÉLELMEZETT GARANCIA NÉLKÜL, BELEÉRTVE, DE NEM KIZÁRÓLAGOSAN AZ ELADHATÓSÁGRA, EGY ADOTT CÉLRA VALÓ ALKALMASSÁGRA ÉS A JOGTISZTELETRE VONATKOZÓ VÉLELMEZETT GARANCIÁKAT.”',
        '"Nem garantáljuk, hogy: (a) az oldal megszakítás nélküli, biztonságos vagy hibamentes lesz; (b) a QR-kódok minden környezetben, minden eszközön vagy minden szkenneralkalmazással beolvashatók; (c) az oldal megfelel az Ön igényeinek.”',
        '"A QR-kódokat mindig a használati körülmények között kell tesztelni (nyomtatási méret, megvilágítás, képernyő típusa, távolság, kamera minősége).”',
      ],
    },
    {
      heading: '"Felelősség korlátozása”',
      paragraphs: [
        '"A TÖRVÉNY ÁLTAL MEGENGEDETT LEGNAGYOBB MÉRTÉKBEN AZ ANQR ÉS ÜZEMELTETŐI, LEÁNYVÁLLALATAI ÉS LICENCADÓI NEM FELELŐSEK SEMMILYEN KÖZVETLEN, KÖZVETETT, VÉLETLENSZERŰ, KÜLÖNLEGES, KÖVETKEZMÉNYES, BÜNTETŐJOGI VAGY PÉLDÁS KÁRÉRT, BELEÉRTVE, DE NEM KORLÁTOZÓDVA AZ ELMARADT HASZONÉRT, BEVÉTELÉRT, ADATOKÉRT, JÓHÍRÉRT, HASZNÁLATÉRT VAGY EGYÉB IMMATERIALIS VESZTESÉGEKÉRT, AMELYEK A SZOLGÁLTATÁSHOZ VALÓ HOZZÁFÉRÉSÉBŐL VAGY HASZNÁLATÁBÓL (ILLETVE A HOZZÁFÉRÉS VAGY HASZNÁLAT KÉPTELENSÉGÉBŐL) EREDNEK VAGY AZZAL KAPCSOLATOSAK.”',
        '"ÖN KIFEJEZETTEN TUDOMÁSUL VESZI ÉS ELFOGADJA, HOGY A SZOLGÁLTATÁS HASZNÁLATA KIZÁRÓLAG SAJÁT FELELŐSSÉGÉRE TÖRTÉNIK. A SZOLGÁLTATÁST INGYENESEN BIZTOSÍTJUK, ÉS ENNEK MEGFELELŐEN ÖN ELFOGADJA, HOGY AZ ANQR ÉS ÜZEMELTETŐI SEMMILYEN FELELŐSSÉGET NEM TUDNAK ÖNNEL FELÉ SEMMILYEN KÁRÉRT VAGY VESZTESÉGÉRT. TELJES ÖSSZES FELELŐSSÉGÜNK SEMMILYEN ESETBEN SEM HALADHATJA MEG A NULLA DOLLÁRT (0 AUD).”',
        '"ÖN BELEEGYEZIK HOGY ELUTASÍT, LEMOND ÉS ELHÁZOL MINDEN IGÉNYT, KÖVETELÉST ÉS KERESETI OKOT AZ ANQR-REL ÉS ÜZEMELTETŐIVEL SZEMBEN, A SZOLGÁLTATÁS HASZNÁLATÁBÓL EREDŐ.”',
        '"NÉHÁNY JOGHATÓSÁG NEM ENGEDÉLYEZI BIZONYOS SZAVATOSSÁGOK VAGY A FELELŐSSÉG KORLÁTOZÁSÁT. ILYEN JOGHATÓSÁGOKBAN FELELŐSSÉGÜNK AZ HATÁLYOS JOGSZABÁLYOK ÁLTAL MEGENGEDETT MÉRTÉKRE KORLÁTOZÓDIK.”',
      ],
    },
    {
      heading: '"Kártalanítás”',
      paragraphs: [
        '"Ön beleegyezik, hogy kártalanítja, megvédi és vétlennek nyilvánítja az ANQR-t, annak üzemeltetőit, leányvállalatait és azok tisztviselőit, igazgatóit, alkalmazottait és ügynökeit minden olyan követeléssel, kárral, veszteséggel, felelősséggel, költséggel és kiadással (beleértve a jogi díjakat is) szemben, amelyek a következőkből erednek: (a) a webhely Ön általi használata; (b) a jelen Feltételek megsértése; (c) harmadik felek jogainak megsértése; (d) a QR-kódokba kódolt tartalom.”',
      ],
    },
    {
      heading: '"Vitarendezés”',
      paragraphs: [
        '"A jelen Feltételekből vagy az ANQR használatából eredő bármilyen vitát elsősorban informális tárgyalások útján kell megkísérelni rendezni a ${CONTACT_EMAIL} címen.”',
        '"Amennyiben az informális rendezés sikertelen, a vitákat kötelező érvényű választottbírósági eljárás útján kell rendezni Victoriában, Ausztráliában, azzal a kivétellel, hogy bármelyik fél bírósághoz fordulhat a szellemi tulajdonjogok megsértése miatti tiltó intézkedés iránti kérelemmel.”',
      ],
    },
    {
      heading: '"Csoportos keresetről való lemondás”',
      paragraphs: [
        '"A TÖRVÉNY ÁLTAL MEGENGEDETT MÉRTÉKBEN ÖN ELFOGADJA, HOGY BÁRMELY VITARENDEZÉSI ELJÁRÁS CSAK EGYÉNI ALAPON KERÜL LEFOLYÁSRA, ÉS NEM CSOPORTOS, ÖSSZEVONT VAGY KÉPVISELETI KERESETKÉNT.”',
      ],
    },
    {
      heading: '"Irányadó jog”',
      paragraphs: [
        '"A jelen Feltételekre Victoria állam törvényei az irányadók, tekintet nélkül a kollíziós jogi elvekre. Ön elfogadja a Victoria államban található bíróságok kizárólagos joghatóságát.”',
      ],
    },
    {
      heading: '"Változások és elérhetőség”',
      paragraphs: [
        '"Bármikor, előzetes értesítés és felelősségvállalás nélkül módosíthatjuk, felfüggeszthetjük vagy megszüntethetjük az oldalt (vagy annak bármely részét).”',
        '"Ezeket a Feltételeket bármikor frissíthetjük. Az "Utolsó frissítés” dátuma a legutóbbi felülvizsgálat időpontját jelzi. A változtatások utáni további használat a Feltételek elfogadását jelenti.”',
      ],
    },
    {
      heading: '"Elválaszthatóság”',
      paragraphs: [
        '"Amennyiben a jelen Feltételek bármely rendelkezése érvénytelennek vagy végrehajthatatlannak minősül, az adott rendelkezést a megengedett legnagyobb mértékben végre kell hajtani, a fennmaradó rendelkezések pedig teljes mértékben hatályban maradnak.”',
      ],
    },
    {
      heading: '"Lemondás”',
      paragraphs: [
        '"A jelen Feltételek bármely jogának vagy rendelkezésének érvényesítésének elmulasztása nem tekinthető az adott jogról vagy rendelkezésről való lemondásnak.”',
      ],
    },
    {
      heading: '"Teljes megállapodás”',
      paragraphs: [
        '"Ezek a Feltételek, valamint az Adatvédelmi Szabályzatunk alkotják az Ön és az ANQR között létrejött teljes megállapodást a webhely Ön általi használatával kapcsolatban, és felülírnak minden korábbi megállapodást.”',
      ],
    },
    {
      heading: '"Vis maior”',
      paragraphs: [
        '"Nem vállalunk felelősséget a teljesítésben bekövetkezett semmilyen hibáért vagy késedelemért, amely az ésszerű ellenőrzésünkön kívül eső körülményekből ered, beleértve a természeti katasztrófákat, háborút, terrorizmust, zavargásokat, kormányzati intézkedéseket vagy az internet/infrastruktúra hibáit.”',
      ],
    },
    {
      heading: '"Kapcsolat”',
      paragraphs: [
        '"A Feltételekkel kapcsolatos kérdéseket a következő címre küldheti: ${CONTACT_EMAIL}”',
      ],
    },
  ],
}

export default terms;
