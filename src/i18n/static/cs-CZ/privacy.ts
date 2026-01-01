import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Zásady ochrany osobních údajů',
  description: 'Informace, které ANQR shromažďuje, jak jsou používány a vaše práva podle platných zákonů o ochraně osobních údajů.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Shrnutí',
      paragraphs: ['ANQR je generátor QR kódů s přístupem zaměřeným na klienta. Nevyžadujeme, abyste si vytvořili účet. Ve výchozím nastavení se QR kódy generují lokálně ve vašem prohlížeči – nemáme přístup k obsahu, který kódujete.', 'Pro profesionální použití poskytuje ANQR serverové API, které generuje QR kódy z parametrů URL. Při použití API je váš QR obsah zpracován na našich serverech za účelem vykreslení obrázku, ale není uložen ani protokolován.', 'Pro inzerci používáme Google AdSense a můžeme používat analytické služby. Tyto služby shromažďují informace prostřednictvím souborů cookie a podobných technologií. Tyto zásady vysvětlují, jaké údaje se shromažďují, jak se používají a jaká jsou vaše práva.'],
    },
    {
      heading: 'Informace, které shromažďujeme',
      bullets: ['Informace, které poskytnete: Pokud nás kontaktujete e-mailem nebo prostřednictvím našeho kontaktního formuláře, shromažďujeme vaše jméno, e-mailovou adresu a obsah zprávy.', 'Automaticky shromažďované informace: Náš poskytovatel hostingu (Netlify), reklamní partneři a analytické služby mohou shromažďovat: IP adresu, typ a verzi prohlížeče, operační systém, typ zařízení, odkazující URL, navštívené stránky, čas strávený na webu a přibližnou geografickou polohu.', 'Soubory cookie třetích stran: Naši reklamní partneři (Google AdSense) používají soubory cookie a podobné technologie k zobrazování a měření reklam. Samotný ANQR nenastavuje žádné soubory cookie první strany.'],
    },
    {
      heading: 'Soubory cookie a technologie třetích stran',
      paragraphs: ['ANQR nenastavuje žádné soubory cookie první strany. Vaše preference (například tmavý režim) jsou uloženy lokálně ve vašem zařízení a nejsou přenášeny na žádný server.', 'Naši reklamní partneři (Google AdSense) a poskytovatelé hostingu však mohou používat soubory cookie a podobné technologie sledování:'],
      bullets: ['Reklamní soubory cookie (třetích stran): Nastavují se službou Google AdSense a reklamními partnery za účelem zobrazování relevantních reklam, měření výkonu reklam a pochopení zájmů uživatelů. Tyto soubory cookie mohou sledovat vaši aktivitu na různých webových stránkách.', 'Analytické soubory cookie (třetích stran): Mohou být používány naším poskytovatelem hostingu nebo analytickými službami ke shromažďování anonymizovaných údajů o užívání.'],
    },
    {
      heading: 'Google AdSense a reklama',
      paragraphs: ['Reklamy zobrazujeme prostřednictvím služby Google AdSense. Google a jeho partneři používají soubory cookie k zobrazování reklam na základě vaší historie prohlížení na tomto webu a dalších webových stránkách (reklama založená na zájmech).', 'Zjistěte, jak Google používá vaše informace: https://policies.google.com/technologies/partner-sites', 'Spravovat personalizaci reklam: https://adssettings.google.com', 'Odhlásit se můžete prostřednictvím iniciativy Network Advertising Initiative: https://optout.networkadvertising.org', 'Odhlásit se můžete prostřednictvím Digital Advertising Alliance: https://optout.aboutads.info'],
    },
    {
      heading: 'Jak používáme informace',
      bullets: ['Abychom mohli odpovídat na vaše dotazy a poskytovat podporu.', 'Abychom mohli zobrazovat relevantní reklamy prostřednictvím našich reklamních partnerů.', 'Analyzovat používání webu a zlepšovat naše služby.', 'Odhalovat, předcházet a řešit podvody, zneužívání a bezpečnostní problémy.', 'Aby bylo možné dodržet zákonné povinnosti.'],
    },
    {
      heading: 'Služby třetích stran',
      bullets: ['Google AdSense: Přijímá data pro zobrazování a měření reklam.', 'Poskytovatelé analytických služeb: Získejte anonymní data o užívání.', 'Netlify (hosting): Zpracovává požadavky a může zaznamenávat IP adresy.', 'Vaše osobní údaje neprodáváme. Sdílení dat s reklamními partnery však může být podle zákona CCPA považováno za prodej (viz níže).'],
    },
    {
      heading: 'Uchovávání dat',
      bullets: ['Podání kontaktů: Až 2 roky.', 'Protokoly serveru: Až 30 dní (poskytovatel hostingu).', 'Analytická data: Až 26 měsíců (anonymizovaná).', 'Reklamní soubory cookie: Obvykle 13 měsíců (liší se podle partnera).'],
    },
    {
      heading: 'Vaše práva podle GDPR (uživatelé z EHP)',
      paragraphs: ['Pokud se nacházíte v Evropském hospodářském prostoru, máte podle obecného nařízení o ochraně osobních údajů následující práva:'],
      bullets: ['Právo na přístup: Požádejte o kopii osobních údajů, které o vás uchováváme.', 'Právo na opravu: Požádat o opravu nepřesných údajů.', 'Právo na výmaz: Požádejte o výmaz svých údajů (právo být zapomenut).', 'Právo na omezení zpracování: Požádejte o omezení způsobu, jakým používáme vaše údaje.', 'Právo na přenositelnost údajů: Požádejte o své údaje v přenosném formátu.', 'Právo vznést námitku: Vznést námitku proti zpracování, a to i pro účely přímého marketingu.', 'Právo na odvolání souhlasu: Souhlas lze kdykoli odvolat, pokud je zpracování založeno na souhlasu.', 'Právo podat stížnost: Podejte stížnost u svého úřadu pro ochranu osobních údajů.'],
    },
    {
      heading: 'Právní základ GDPR',
      paragraphs: ['Údaje zpracováváme na těchto základech: (a) Souhlas – pro personalizovanou reklamu (spravovanou našimi reklamními partnery); (b) Oprávněné zájmy – pro analytiku, zabezpečení a vylepšování; (c) Smlouva – pro zodpovězení dotazů.', 'Chcete-li uplatnit svá práva, kontaktujte ${CONTACT_EMAIL}. Odpovíme vám do 30 dnů.'],
    },
    {
      heading: 'Vaše práva podle CCPA (kalifornští uživatelé)',
      bullets: ['Právo vědět: Požadovat informace o shromážděných údajích, zdrojích, účelech a třetích stranách.', 'Právo na výmaz: Požádat o výmaz vašich osobních údajů.', 'Právo na odhlášení: Odhlásit se z prodeje osobních údajů (sdílení s reklamními partnery může splňovat podmínky).', 'Právo na nediskriminaci: Nebudeme diskriminovat za uplatňování vašich práv.'],
    },
    {
      heading: 'Shromážděné kategorie CCPA',
      paragraphs: ['Kategorie: Identifikátory (IP adresa, ID zařízení), Aktivita na internetu (prohlížení, interakce s reklamami), Geolokace (přibližná), Inference (zájmy z prohlížení).', 'Chcete-li uplatnit práva nebo se odhlásit: ${CONTACT_EMAIL} nebo upravte nastavení souborů cookie.'],
    },
    {
      heading: 'Mezinárodní převody',
      paragraphs: ['Vaše informace mohou být převedeny do zemí s odlišnými zákony na ochranu osobních údajů, včetně Spojených států. Používáme vhodná ochranná opatření, jako jsou standardní smluvní doložky.'],
    },
    {
      heading: 'Soukromí dětí',
      paragraphs: ['ANQR není určen pro děti mladší 13 let (nebo 16 let v EHP). Vědomě neshromažďujeme údaje od dětí. Pokud se domníváte, že dítě poskytlo informace, kontaktujte ${CONTACT_EMAIL}.'],
    },
    {
      heading: 'Bezpečnost',
      paragraphs: ['Používáme vhodná technická a organizační opatření k ochraně dat, včetně šifrování HTTPS. Žádný internetový přenos však není 100% bezpečný.'],
    },
    {
      heading: 'Nesledovat',
      paragraphs: ['Signály prohlížeče s klauzulí Nesledovat respektujeme, kdykoli je to možné, ačkoli reklamní partneři na signál Nesledovat nemusí reagovat.'],
    },
    {
      heading: 'Změny těchto zásad',
      paragraphs: ['Tyto zásady můžeme pravidelně aktualizovat. Datum Poslední aktualizace označuje nejnovější revizi. Významné změny mohou být oznámeny prostřednictvím banneru na webu.'],
    },
    {
      heading: 'Kontaktujte nás',
      paragraphs: ['V případě dotazů ohledně ochrany osobních údajů nebo pro uplatnění vašich práv: ${CONTACT_EMAIL} nebo použijte naši kontaktní stránku. Na žádosti o ochranu osobních údajů odpovídáme do 30 dnů.'],
    },
  ],
};

export default privacy;
