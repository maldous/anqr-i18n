import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'O ANQR',
  description: 'ANQR je bezplatný generátor QR kódů s přístupem zaměřeným na klienta – generujte QR kódy lokálně nebo použijte naše API pro vkládání.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Co je ANQR?',
      paragraphs: ['ANQR (vyslovuje se anchor) je bezplatný generátor QR kódů, který vytváří skenovatelné kódy pro URL adresy, text, přihlašovací údaje k Wi-Fi, vizitky kontaktů, události kalendáře a další.', 'Je určen pro jednotlivce, malé firmy, marketéry a vývojáře, kteří chtějí výkonné nástroje pro QR kódy bez nutnosti registrace. Design zaměřený na klienta znamená, že QR kódy se ve výchozím nastavení generují lokálně ve vašem prohlížeči s volitelným serverovým API pro profesionální vkládání a integraci.'],
    },
    {
      heading: 'Klíčové vlastnosti',
      bullets: ['Generujte QR kódy okamžitě ve svém prohlížeči – není potřeba žádný účet.', 'Přizpůsobte si barvy, styly modulů, vzory Finderu a přidejte překryvné obrázky.', 'Export do více formátů: PNG, SVG, WebP a animovaný GIF.', 'Pokročilé ovládací prvky pro úroveň korekce chyb, verzi QR kódu, režim kódování a výběr masky.', 'Pokyny pro bezpečné skenování a živý náhled pomáhají udržet kódy čitelné v tištěné podobě i na obrazovce.', 'Serverové API pro profesionální vkládání s plnou podporou parametrů.', 'Po načtení funguje offline – je to statická webová aplikace, kterou můžete spustit kdekoli.'],
    },
    {
      heading: 'Jak funguje ANQR',
      paragraphs: ['ANQR běží ve vašem prohlížeči a kóduje váš vstup do standardní QR matice s Reed-Solomonovou korekcí chyb a poté jej vykreslí do formátu, který si vyberete.', 'Ve výchozím nastavení generování probíhá lokálně ve vašem prohlížeči. Pro profesionální použití můžete také použít serverové API k generování QR kódů pomocí parametrů URL – ideální pro vkládání do webových stránek, e-mailů nebo automatizovaných pracovních postupů.', 'Když přidáte překryvy nebo animace, ANQR vyvažuje styling se spolehlivostí skenování, takže výsledek zůstává skenovatelný.', 'ANQR se zaměřuje na statické kódy (data jsou uvnitř QR kódu). Pokud potřebujete dynamický kód (upravitelnou destinaci), můžete si zakódovat vlastní URL přesměrování nebo krátký odkaz.'],
    },
    {
      heading: 'Kdo provozuje ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'Reklama a jak zůstat svobodní',
      paragraphs: ['ANQR je zdarma k použití a je podporován reklamou. Můžeme zobrazovat reklamy prostřednictvím Google AdSense a/nebo jiných reklamních partnerů.', 'Poskytovatelé reklamy mohou používat soubory cookie nebo podobné technologie k personalizaci reklam na základě vašich zájmů a aktivity prohlížení. Předvolby reklam můžete spravovat v nastavení svého zařízení a prostřednictvím nastavení reklam Google a další informace naleznete v našich Zásadách ochrany osobních údajů.', 'Obsah, který kódujete do QR kódů, neprodáváme. Reklamy pomáhají pokrýt náklady na provoz a vylepšování projektu.'],
    },
    {
      heading: 'Otevřené standardy',
      paragraphs: ['ANQR generuje QR kódy na základě normy ISO/IEC 18004 a usiluje o širokou kompatibilitu napříč skenery, fotoaparáty a tiskovými pracovními postupy.'],
    },
    {
      heading: 'Oznámení o ochranné známce',
      paragraphs: ['QR Code® je registrovaná ochranná známka společnosti DENSO WAVE INCORPORATED. ANQR není přidružena k DENSO WAVE INCORPORATED, není jí schválena ani sponzorována.'],
    },
    {
      heading: 'Zpětná vazba a příspěvky',
      paragraphs: ['Vítáme zpětnou vazbu, hlášení chyb a návrhy na nové funkce. Kontaktujte nás prosím e-mailem nebo prostřednictvím kontaktní stránky – čteme každou zprávu, i když doba odezvy se může lišit.'],
    },
  ],
};

export default about;
