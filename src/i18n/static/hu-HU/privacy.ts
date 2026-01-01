import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: '"Adatvédelmi irányelvek”',
  description: '"Az ANQR által gyűjtött információk, azok felhasználási módja és az Ön jogai az alkalmazandó adatvédelmi törvények értelmében.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Összefoglaló”',
      paragraphs: [
        '"Az ANQR egy kliensközpontú QR-kód generátor. Nem kell fiókot létrehoznia. Alapértelmezés szerint a QR-kódok helyben, a böngészőjében generálódnak – nincs hozzáférésünk a kódolt tartalomhoz.”',
        '"Professzionális használatra az ANQR egy szerveroldali API-t biztosít, amely QR-kódokat generál URL-paraméterekből. Az API használatakor a QR-tartalmat a szervereink feldolgozzák a kép megjelenítéséhez, de nem tárolják vagy naplózzák.”',
        '"A Google AdSense-t használjuk hirdetésekhez, és analitikai szolgáltatásokat is igénybe vehetünk. Ezek a szolgáltatások sütiken és hasonló technológiákon keresztül gyűjtenek információkat. Ez a szabályzat ismerteti, hogy milyen adatokat gyűjtünk, hogyan használjuk fel azokat, és milyen jogokkal rendelkezel.”',
      ],
    },
    {
      heading: '"Általunk gyűjtött információk”',
      bullets: [
        '"Az Ön által megadott információk: Ha e-mailben vagy a kapcsolatfelvételi űrlapunkon keresztül veszi fel velünk a kapcsolatot, összegyűjtjük az Ön nevét, e-mail címét és az üzenet tartalmát.”',
        '"Automatikusan gyűjtött információk: Tárhelyszolgáltatónk (Netlify), hirdetési partnereink és elemző szolgáltatásaink a következőket gyűjthetik: IP-cím, böngésző típusa és verziója, operációs rendszer, eszköztípus, hivatkozó URL, meglátogatott oldalak, a webhelyen töltött idő és a hozzávetőleges földrajzi hely.”',
        '"Harmadik féltől származó sütik: Hirdetési partnereink (Google AdSense) sütiket és hasonló technológiákat használnak a hirdetések megjelenítéséhez és méréséhez. Maga az ANQR nem állít be semmilyen belső sütit.”',
      ],
    },
    {
      heading: '"Sütik és harmadik féltől származó technológiák”',
      paragraphs: [
        '"Az ANQR nem állít be semmilyen belső sütit. A beállításaid (például a sötét mód) helyben tárolódnak az eszközödön, és nem kerülnek továbbításra semmilyen szerverre.”',
        '"Hirdetési partnereink (Google AdSense) és tárhelyszolgáltatónk azonban sütiket és hasonló nyomkövető technológiákat használhatnak:”',
      ],
      bullets: [
        '"Hirdetési sütik (harmadik féltől): A Google AdSense és hirdetési partnerei állítják be őket a releváns hirdetések megjelenítése, a hirdetések teljesítményének mérése és a felhasználók érdeklődési körének megértése érdekében. Ezek a sütik nyomon követhetik az Ön tevékenységét különböző webhelyeken.”',
        '"Analitikai sütik (harmadik féltől): Tárhelyszolgáltatónk vagy analitikai szolgáltatásaink anonimizált használati adatok gyűjtésére használhatják őket.”',
      ],
    },
    {
      heading: '"Google AdSense és hirdetések”',
      paragraphs: [
        '"A Google AdSense-en keresztül jelenítünk meg hirdetéseket. A Google és partnerei sütiket használnak a hirdetések megjelenítéséhez az ezen a webhelyen és más webhelyeken tett böngészési előzményei alapján (érdeklődésen alapuló hirdetés).”',
        '"Tudja meg, hogyan használja fel a Google az Ön adatait: https://policies.google.com/technologies/partner-sites”',
        '"Hirdetések személyre szabásának kezelése: https://adssettings.google.com”',
        '"Leiratkozás a Network Advertising Initiative-en keresztül: https://optout.networkadvertising.org”',
        '"Leiratkozás a Digital Advertising Alliance-on keresztül: https://optout.aboutads.info”',
      ],
    },
    {
      heading: '"Hogyan használjuk fel az információkat”',
      bullets: [
        '"Hogy válaszoljunk a kérdéseire és támogatást nyújtsunk.”',
        '"Releváns hirdetések megjelenítése hirdetési partnereinken keresztül.”',
        '"A webhelyhasználat elemzése és szolgáltatásaink fejlesztése érdekében.”',
        '"A csalások, visszaélések és biztonsági problémák felderítése, megelőzése és kezelése érdekében.”',
        '"Jogi kötelezettségek teljesítése érdekében.”',
      ],
    },
    {
      heading: '"Harmadik fél szolgáltatásai”',
      bullets: [
        '"Google AdSense: Adatokat fogad hirdetések megjelenítéséhez és méréséhez.”',
        '"Elemzőszolgáltatók: Anonimizált használati adatok fogadása.”',
        '"Netlify (tárhelyszolgáltató): Feldolgozza a kéréseket és naplózhatja az IP-címeket.”',
        '"Nem adjuk el a személyes adatait. Azonban az adatok hirdetési partnerekkel való megosztása "értékesítésnek” minősülhet a CCPA értelmében (lásd alább).”',
      ],
    },
    {
      heading: '"Adatmegőrzés”',
      bullets: [
        '"Kapcsolatfelvételi beküldések: Legfeljebb 2 év.”',
        '"Szervernaplók: Legfeljebb 30 nap (tárhelyszolgáltató).”',
        '"Analitikai adatok: Legfeljebb 26 hónap (anonimizált).”',
        '"Hirdetési sütik: Általában 13 hónap (partnerenként változó).”',
      ],
    },
    {
      heading: '"Az Ön jogai a GDPR értelmében (EGT-felhasználók)”',
      paragraphs: [
        '"Ha az Európai Gazdasági Térségben tartózkodik, az Általános Adatvédelmi Rendelet értelmében a következő jogokkal rendelkezik:”',
      ],
      bullets: [
        '"Hozzáférési jog: Kérjen másolatot az Önről tárolt személyes adatokról.”',
        '"Helyesbítéshez való jog: Kérni a pontatlan adatok helyesbítését.”',
        '"Törléshez való jog: Kérheti adatai törlését ("elfeledtetéshez való jog”).”',
        '"A feldolgozás korlátozásához való jog: Kérheti az adatai felhasználásának korlátozását.”',
        '"Adathordozhatósághoz való jog: Kérheti adatait hordozható formátumban.”',
        '"Tiltakozáshoz való jog: Tiltakozás az adatkezelés ellen, beleértve a közvetlen üzletszerzés céljából történő adatkezelést is.”',
        '"A hozzájárulás visszavonásához való jog: A hozzájárulás bármikor visszavonható, ha az adatkezelés hozzájáruláson alapul.”',
        '"Panasztételi jog: Panasz benyújtása az adatvédelmi hatóságnál.”',
      ],
    },
    {
      heading: '"GDPR jogalap”',
      paragraphs: [
        '"Az adatokat a következő alapokon dolgozzuk fel: (a) Hozzájárulás – személyre szabott hirdetésekhez (hirdetési partnereink kezelik); (b) Jogos érdekek – elemzés, biztonság és fejlesztés céljából; (c) Szerződés – megkeresésekre való válaszadás céljából.”',
        '"Jogainak gyakorlásához vegye fel a kapcsolatot a következő címen: ${CONTACT_EMAIL}. 30 napon belül válaszolunk.”',
      ],
    },
    {
      heading: '"Az Ön jogai a CCPA értelmében (kaliforniai felhasználók)”',
      bullets: [
        '"Tudáshoz való jog: Információk kérése a gyűjtött adatokról, forrásokról, célokról és harmadik felekről.”',
        '"Törléshez való jog: Kérheti személyes adatainak törlését.”',
        '"Kilépési jog: Személyes adatok "értékesítésének” megtiltása (a hirdetési partnerekkel való megosztás erre jogosíthat).”',
        '"A megkülönböztetésmentességhez való jog: Nem fogunk megkülönböztetni az Ön jogainak gyakorlása miatt.”',
      ],
    },
    {
      heading: '"CCPA kategóriák gyűjtése”',
      paragraphs: [
        '"Kategóriák: Azonosítók (IP-cím, eszközazonosító), Internetes tevékenység (böngészés, hirdetési interakciók), Földrajzi helymeghatározás (hozzávetőleges), Következtetések (böngészésből származó érdeklődési körök).”',
        '"Jogok gyakorlásához vagy leiratkozáshoz: ${CONTACT_EMAIL} vagy a sütibeállítások módosításához.”',
      ],
    },
    {
      heading: '"Nemzetközi átutalások”',
      paragraphs: [
        '"Az Ön adatai továbbíthatók olyan országokba, ahol eltérő adatvédelmi törvények vannak érvényben, beleértve az Egyesült Államokat is. Megfelelő biztosítékokat alkalmazunk, például standard szerződési záradékokat.”',
      ],
    },
    {
      heading: '"Gyermekek magánélete”',
      paragraphs: [
        '"Az ANQR nem 13 év alatti (vagy az EGT-ben 16 év alatti) gyermekekre irányul. Tudatosan nem gyűjtünk adatokat gyermekektől. Lépjen kapcsolatba a ${CONTACT_EMAIL} címen, ha úgy gondolja, hogy egy gyermek információkat adott meg.”',
      ],
    },
    {
      heading: '"Biztonság”',
      paragraphs: [
        '"Megfelelő technikai és szervezési intézkedéseket alkalmazunk az adatok védelme érdekében, beleértve a HTTPS titkosítást is. Azonban egyetlen internetes átvitel sem 100%-ban biztonságos.”',
      ],
    },
    {
      heading: '"Kövesés tiltása”',
      paragraphs: [
        '"Ahol lehetséges, tiszteletben tartjuk a böngésző Do Not Track jelzéseit, bár előfordulhat, hogy a hirdetési partnerek nem reagálnak a DNT-re.”',
      ],
    },
    {
      heading: '"Változások ebben a szabályzatban”',
      paragraphs: [
        '"Ezt a szabályzatot rendszeresen frissíthetjük. Az "Utolsó frissítés” dátuma a legutóbbi változatot jelöli. A jelentős változásokról egy webhelyen található szalagcímen keresztül tájékoztathatunk.”',
      ],
    },
    {
      heading: '"Kapcsolat”',
      paragraphs: [
        '"Adatvédelmi kérdésekkel vagy jogai gyakorlásával kapcsolatban: ${CONTACT_EMAIL} vagy használja a Kapcsolatfelvétel oldalunkat. Az adatvédelmi kérelmekre 30 napon belül válaszolunk.”',
      ],
    },
  ],
}

export default privacy;
