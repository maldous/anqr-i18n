import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Kontaktujte nás',
  description: 'Vítáme zpětnou vazbu, hlášení chyb, požadavky na nové funkce a obecné dotazy.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Jak se k nám dostat',
      paragraphs: ['V závislosti na vašich potřebách nabízíme několik způsobů, jak nás kontaktovat. Čteme každou zprávu, i když doba odezvy se může lišit v závislosti na objemu a typu dotazu.'],
    },
    {
      heading: 'E-mail',
      paragraphs: ['Všechny dotazy: ${CONTACT_EMAIL}', 'Toto je nejspolehlivější způsob, jak nás kontaktovat, a doporučujeme ho pro podrobné dotazy, obchodní dotazy nebo jakékoli jiné dotazy.'],
    },
    {
      heading: 'Typy dotazů',
      bullets: ['Obecné otázky: Otázky ohledně používání ANQR, vysvětlení funkcí nebo obecná zpětná vazba.', 'Hlášení chyb: Uveďte prosím váš prohlížeč, operační systém, kroky k reprodukci a všechny chybové zprávy, které se vám zobrazují.', 'Požadavky na nové funkce: Návrhy na nové funkce nebo vylepšení. Všechny požadavky zvažujeme, i když nemůžeme slíbit jejich implementaci.', 'Obchodní dotazy: Možnosti partnerství, dotazy ohledně licencí nebo dotazy ohledně komerčního využití.', 'Žádosti o ochranu soukromí: Žádosti o uplatnění vašich práv na ochranu soukromí podle GDPR, CCPA nebo jiných zákonů o ochraně soukromí (viz Zásady ochrany osobních údajů).', 'DMCA/Autorská práva: Požadavky na oznámení o odstranění obsahu naleznete v části DMCA níže.'],
    },
    {
      heading: 'Doby odezvy',
      paragraphs: ['Snažíme se reagovat na dotazy do 5–7 pracovních dnů. Žádosti týkající se ochrany osobních údajů budou vyřízeny do 30 dnů, jak to vyžaduje zákon.', 'Během vytížených období může být doba odezvy delší. V případě naléhavých záležitostí uveďte prosím do předmětu zprávy URGENT.'],
    },
    {
      heading: 'Než nás kontaktujete',
      paragraphs: ['Prosím, podívejte se na naši stránku s dokumentací, kde najdete odpovědi na časté otázky týkající se používání funkcí ANQR. Najdete tam mnoho otázek týkajících se generování, stylování a možností exportu QR kódů.'],
    },
    {
      heading: 'Oznámení o autorských právech DMCA',
      paragraphs: ['Pokud se domníváte, že obsah dostupný na ANQR porušuje vaše autorská práva, můžete podat oznámení o odstranění obsahu podle zákona Digital Millennium Copyright Act (DMCA). Aby bylo vaše oznámení platné, musí obsahovat:'],
      bullets: ['Fyzický nebo elektronický podpis vlastníka autorských práv nebo jeho oprávněného zástupce.', 'Identifikace díla chráněného autorským právem, u kterého bylo údajně porušeno jeho autorské právo.', 'Identifikace materiálu, o kterém se tvrdí, že porušuje autorská práva, s informacemi dostatečnými k jeho nalezení.', 'Vaše kontaktní informace (adresa, telefonní číslo a e-mailová adresa).', 'Prohlášení, že se v dobré víře domníváte, že použití materiálu není autorizováno vlastníkem autorských práv.', 'Prohlášení pod trestem křivé přísahy, že informace ve vašem oznámení jsou přesné a že jste vlastníkem autorských práv nebo jste oprávněni jednat jeho jménem.'],
    },
    {
      heading: 'Kontakt DMCA',
      paragraphs: ['Zasílejte oznámení DMCA na adresu: ${CONTACT_EMAIL}', 'Do předmětu uveďte Oznámení DMCA. Na platná oznámení budeme reagovat v souladu s platnými zákony. Upozorňujeme, že ANQR generuje QR kódy lokálně na zařízeních uživatelů a nehostuje obsah generovaný uživateli.'],
    },
  ],
};

export default contact;
