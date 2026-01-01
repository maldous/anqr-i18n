import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Az ANQR-ről',
  description: 'Az ANQR egy ingyenes QR-kód generátor kliensközpontú megközelítéssel – generáljon QR-kódokat helyben, vagy használja az API-nkat a beágyazáshoz.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Mi az ANQR?',
      paragraphs: ['Az ANQR (ejtsd: horgony) egy ingyenes QR-kód generátor, amely beolvasható kódokat hoz létre URL-ekhez, szövegekhez, Wi-Fi hitelesítő adatokhoz, névjegykártyákhoz, naptári eseményekhez és egyebekhez.', 'Magánszemélyek, kisvállalkozások, marketingesek és fejlesztők számára készült, akik regisztráció nélkül szeretnének hatékony QR-kód eszközöket. Az ügyfélközpontú kialakítás azt jelenti, hogy a QR-kódok alapértelmezés szerint helyben, a böngészőben generálódnak, opcionális szerver API-val a professzionális beágyazás és integráció érdekében.'],
    },
    {
      heading: 'Főbb jellemzők',
      bullets: ['QR-kódok generálása azonnal a böngészőben – fiók nélkül.', 'Szabja testre a színeket, a modulstílusokat, a keresőmintákat, és adjon hozzá képátfedéseket.', 'Exportálás több formátumban: PNG, SVG, WebP és animált GIF.', 'Speciális vezérlők a hibajavítási szinthez, a QR-kód verziójához, a kódolási módhoz és a maszk kiválasztásához.', 'Szkennelési biztonsági útmutatás és élő előnézet a kódok olvashatóságának megőrzéséhez nyomtatásban és a képernyőn.', 'Szerveroldali API professzionális beágyazáshoz teljes paraméter-támogatással.', 'Betöltés után offline is működik – ez egy statikus webalkalmazás, amelyet bárhol futtathatsz.'],
    },
    {
      heading: 'Hogyan működik az ANQR',
      paragraphs: ['Az ANQR a böngészőben fut, és a bemenetet egy szabványos QR-mátrixba kódolja Reed–Solomon hibajavítással, majd a kiválasztott formátumban megjeleníti.', 'Alapértelmezés szerint a generálás helyben, a böngészőben történik. Professzionális használatra a szerveroldali API-t is használhatja QR-kódok generálására URL-paramétereken keresztül – tökéletes webhelyekbe, e-mailekbe vagy automatizált munkafolyamatokba való beágyazáshoz.', 'Átfedések vagy animációk hozzáadásakor az ANQR egyensúlyt teremt a stílus és a szkennelés megbízhatósága között, így az eredmény szkennelhető marad.', 'Az ANQR statikus kódokra összpontosít (az adatok a QR-kódon belül vannak). Ha dinamikus kódra van szükséged (szerkeszthető cél), akkor kódolhatod a saját átirányítási URL-edet vagy rövid linkedet.'],
    },
    {
      heading: 'Ki üzemelteti az ANQR-t?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklám és hogyan maradhatunk szabadok',
      paragraphs: ['Az ANQR ingyenesen használható, és hirdetések támogatják. Hirdetéseket jeleníthetünk meg a Google AdSense-en és/vagy más hirdetési partnereken keresztül.', 'A hirdetésszolgáltatók sütiket vagy hasonló technológiákat használhatnak a hirdetések személyre szabására az Ön érdeklődési köre és böngészési tevékenysége alapján. A hirdetési beállításokat az eszközbeállításaiban és a Google hirdetésbeállításain keresztül kezelheti, további információkat pedig az Adatvédelmi irányelveinkben talál.', 'Nem áruljuk a QR-kódokba kódolt tartalmat. A hirdetések segítenek fedezni a projekt működtetésének és fejlesztésének költségeit.'],
    },
    {
      heading: 'Nyílt szabványok',
      paragraphs: ['Az ANQR az ISO/IEC 18004 szabvány alapján generál QR-kódokat, és széles körű kompatibilitást céloz a szkennerek, kamerák és nyomtatási munkafolyamatok között.'],
    },
    {
      heading: 'Védjegyre vonatkozó közlemény',
      paragraphs: ['A QR Code® a DENSO WAVE INCORPORATED bejegyzett védjegye. Az ANQR nem áll kapcsolatban a DENSO WAVE INCORPORATED-del, nem támogatja és nem szponzorálja azt.'],
    },
    {
      heading: 'Visszajelzések és hozzájárulások',
      paragraphs: ['Szívesen fogadjuk a visszajelzéseket, hibajelentéseket és funkciójavaslatokat. Kérjük, vegye fel velünk a kapcsolatot e-mailben vagy a kapcsolatfelvételi oldalon keresztül – minden üzenetet elolvasunk, bár a válaszadási idők eltérőek lehetnek.'],
    },
  ],
};

export default about;
