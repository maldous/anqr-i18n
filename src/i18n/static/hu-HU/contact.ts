import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: '"Kapcsolatfelvétel”',
  description: '"Szívesen fogadjuk a visszajelzéseket, hibajelentéseket, funkcióigényléseket és általános megkereséseket.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Hogyan juthat el hozzánk”',
      paragraphs: [
        '"Több módot is kínálunk a kapcsolatfelvételre, az Ön igényeitől függően. Minden üzenetet elolvasunk, bár a válaszidő a mennyiségtől és a megkeresés típusától függően változhat.”',
      ],
    },
    {
      heading: '"E-mail”',
      paragraphs: [
        '"Minden kérdés esetén: ${CONTACT_EMAIL}”',
        '"Ez a legmegbízhatóbb módja annak, hogy elérjen minket, és ezt ajánljuk részletes kérdések, üzleti megkeresések vagy bármilyen egyéb megkeresés esetén.”',
      ],
    },
    {
      heading: '"Kérdezések típusai”',
      bullets: [
        '"Általános kérdések: Kérdések az ANQR használatával kapcsolatban, funkciók magyarázata vagy általános visszajelzés.”',
        '"Hibajelentések: Kérjük, tüntesse fel a böngészőjét, az operációs rendszerét, a hiba reprodukálásához szükséges lépéseket és az esetlegesen megjelenő hibaüzeneteket.”',
        '"Funkciókérés: Javaslatok új funkciókra vagy fejlesztésekre. Minden kérést figyelembe veszünk, bár a megvalósítást nem tudjuk garantálni.”',
        '"Üzleti megkeresések: Partnerségi lehetőségek, licenckérdések vagy kereskedelmi felhasználással kapcsolatos megkeresések.”',
        '"Adatvédelmi kérelmek: Az Ön adatvédelmi jogainak gyakorlására irányuló kérelmek a GDPR, a CCPA vagy más adatvédelmi törvények értelmében (lásd az Adatvédelmi irányelveket).”',
        '"DMCA/Szerzői jog: Az eltávolítási értesítéssel kapcsolatos követelményeket lásd az alábbi DMCA szakaszban.”',
      ],
    },
    {
      heading: '"Válaszidő”',
      paragraphs: [
        '"Célunk, hogy 5-7 munkanapon belül válaszoljunk a megkeresésekre. Az adatvédelemmel kapcsolatos kérelmeket a törvényi előírásoknak megfelelően 30 napon belül megválaszoljuk.”',
        '"Forgalmas időszakokban a válaszadási idő hosszabb lehet. Sürgős ügyek esetén kérjük, a tárgy mezőben tüntesse fel, hogy "SÜRGŐS”.”',
      ],
    },
    {
      heading: '"Mielőtt kapcsolatba lépne velünk”',
      paragraphs: [
        '"Kérjük, tekintse meg a Dokumentáció oldalunkat az ANQR funkciók használatával kapcsolatos gyakori kérdések megválaszolásáért. Számos kérdést tárgyalunk a QR-kód generálásával, formázásával és exportálási lehetőségekkel kapcsolatban.”',
      ],
    },
    {
      heading: '"DMCA szerzői jogi közlemények”',
      paragraphs: [
        '"Ha úgy gondolod, hogy az ANQR-en elérhető tartalom sérti a szerzői jogaidat, benyújthatsz egy Digitális Millenniumi Szerzői Jogi Törvény (DMCA) szerinti eltávolítási értesítést. Ahhoz, hogy az értesítés érvényes legyen, a következőket kell tartalmaznia:”',
      ],
      bullets: [
        '"A szerzői jog tulajdonosának vagy meghatalmazott képviselőjének fizikai vagy elektronikus aláírása.”',
        '"A jogsértésnek vélt szerzői jogvédelem alatt álló mű azonosítása.”',
        '"A jogsértőnek vélt anyag azonosítása, a helymeghatározásához elegendő információval.”',
        '"Elérhetőségei (cím, telefonszám és e-mail cím).”',
        '"Nyilatkozat arról, hogy jóhiszeműen feltételezed, hogy az anyag felhasználását a szerzői jog tulajdonosa nem engedélyezte.”',
        '"Nyilatkozat – hamis tanúzás terhe mellett – arról, hogy az értesítésben szereplő információk pontosak, és hogy Ön a szerzői jog tulajdonosa, vagy felhatalmazást kapott arra, hogy az ő nevében járjon el.”',
      ],
    },
    {
      heading: '"DMCA kapcsolat”',
      paragraphs: [
        '"DMCA értesítések küldése ide: ${CONTACT_EMAIL}”',
        '"Kérjük, a tárgy mezőben tüntesse fel a "DMCA közlemény” szöveget. Az érvényes értesítésekre a vonatkozó törvényeknek megfelelően válaszolunk. Felhívjuk figyelmét, hogy az ANQR QR-kódokat generál helyben a felhasználók eszközein, és nem tárol felhasználók által generált tartalmat.”',
      ],
    },
  ],
};

export default contact;
