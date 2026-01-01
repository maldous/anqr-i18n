import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'Uživatelská příručka ANQR',
  description: 'Kompletní průvodce používáním ANQR pro vytváření QR kódů.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Začínáme',
      paragraphs: [
        'ANQR je generátor QR kódů s přístupem zaměřeným na klienta. Ve výchozím nastavení se QR kódy generují lokálně ve vašem prohlížeči – není vyžadován žádný účet a vaše data zůstávají soukromá. Pro profesionální vkládání můžete také použít serverové API.',
        'Rozhraní má tři úrovně: Základní, Pokročilá a Profesionální. Vyberte si úroveň pomocí záložek v záhlaví. Každá úroveň odemyká další funkce a zároveň se rozhraní zaměřuje na to, co potřebujete.',
      ],
      bullets: [
        'Základní: Jednoduché vytvoření QR kódu s prostým textem/URL obsahem a překrytím obrázkem.',
        'Pokročilé: Možnosti kódování QR kódů, styly vykreslování, animace, výstupní formáty, rozšířené typy obsahu a přizpůsobení překrytí.',
        'Profesionální: Vodoznaky, metadata, sdílení, analýza bezpečnosti, platební QR kódy a podnikové funkce.',
      ],
    },
    {
      heading: 'Rychlý start',
      paragraphs: [
        'Vytvoření prvního QR kódu:',
      ],
      bullets: [
        '1. V rozbalovací nabídce Typ obsahu vyberte typ obsahu (URL, text, Wi-Fi atd.).',
        '2. Zadejte svá data do vyznačených polí.',
        '3. Volitelně upravte barvy, styly a přidejte překryvný obrázek.',
        '4. Kliknutím na tlačítko Exportovat stáhnete QR kód ve formátu PNG, GIF, WebP nebo SVG.',
      ],
    },
    {
      heading: 'Základní funkce',
      paragraphs: [
        'Základní úroveň nabízí zjednodušené rozhraní pro vytváření QR kódů s obsahem datových částí a překryvnými obrázky. Toto je nejjednodušší způsob, jak začít.',
      ],
    },
    {
      heading: 'Typy obsahu (základní)',
      paragraphs: [
        'Prostý text: Zakódujte libovolný text až do limitu kapacity QR kódu. Ideální pro krátké zprávy, kódy nebo identifikátory.',
        'URL: Kódování webových adres. QR kód po naskenování otevře URL. Podporuje protokoly http:// a https://.',
      ],
    },
    {
      heading: 'Překrytí obrázků (základní)',
      paragraphs: [
        'Nahrajte obrázek (JPG, PNG, GIF, WebP), který bude sladit s vaším QR kódem. Mezi základní funkce překrytí patří:',
      ],
      bullets: [
        'Nahrát ze souboru: Vyberte obrázek ze svého zařízení.',
        'Načíst z URL: Zadejte URL obrázku (musí povolit CORS).',
        'Logo na střed: Umístí obrázek do středu s využitím korekce chyb.',
        'Prolnutí: Jednoduché alfa prolnutí obrázku s QR vzorem.',
        'Intenzita: Určuje, jak silně překrytí ovlivňuje QR kód (0–100 %).',
        'Barevný režim: Plné barvy, Stupně šedi nebo Černobílý.',
        'Zachovat vzory pro vyhledávání: Zachovává vzory rohů beze změn pro spolehlivé skenování.',
      ],
    },
    {
      heading: 'Pokročilé funkce',
      paragraphs: [
        'Pokročilá úroveň odemyká možnosti kódování QR kódů, styly vykreslování, animace, výstupní formáty, rozšířené typy obsahu a pokročilé přizpůsobení překrytí.',
      ],
    },
    {
      heading: 'Nastavení kódování QR kódů',
      paragraphs: [
        'Verze: QR kódy se dodávají ve verzích 1–40, přičemž vyšší verze obsahují více dat, ale jsou větší. Nastavením na 0 (Auto) umožníte ANQR vybrat nejmenší verzi, která odpovídá vašemu obsahu.',
        'Oprava chyb: Určuje, kolik poškození může QR kód utrpět, aniž by zůstal skenovatelný.',
      ],
      bullets: [
        'L (Nízká): 7% korekce chyb – nejmenší velikost, nejmenší redundance.',
        'M (Střední): 15% korekce chyb – vyvážená možnost.',
        'Q (kvartil): 25% korekce chyb – vhodné pro tištěné kódy.',
        'H (Vysoká): 30% korekce chyb – nejlepší pro kódy s překryvy nebo v náročných podmínkách.',
      ],
    },
    {
      heading: 'Tichá zóna (okraj)',
      paragraphs: [
        'Tichá zóna je bílý prostor kolem QR kódu. Skenery potřebují tuto rezervu k detekci začátku kódu. Standard doporučuje alespoň 4 moduly. Snížení pod 4 může způsobit problémy se skenováním.',
      ],
    },
    {
      heading: 'Styl modulu',
      paragraphs: [
        'Moduly jsou jednotlivé čtverce, které tvoří QR kód. ANQR nabízí pět stylů:',
      ],
      bullets: [
        'Čtverec: Klasický vzhled QR kódu s ostrými rohy.',
        'Zaoblené: Změkčené rohy pro přátelštější vzhled.',
        'Tečky: Kruhové moduly pro moderní estetiku.',
        'Diamant: Čtverce otočené o 45° pro výrazný vzor.',
        'Propojené: Moduly se při sousedství slučují a vytvářejí organické tvary.',
      ],
    },
    {
      heading: 'Styl vzoru ve vyhledávači',
      paragraphs: [
        'Vzory Finder jsou tři velké čtverce v rozích QR kódů, které pomáhají skenerům orientovat kód. Dostupné styly:',
      ],
      bullets: [
        'Čtverec: Standardní čtvercové rohy.',
        'Zaoblené: Změkčené rohy odpovídající stylu zaobleného modulu.',
        'Kruh: Kruhové vyhledávací vzory pro kódy ve stylu teček.',
      ],
    },
    {
      heading: 'Vzory zarovnání a časování',
      paragraphs: [
        'Ve větších QR kódech (verze 2+) se zobrazují zarovnávací vzory, které pomáhají korigovat zkreslení. Časové vzory jsou střídavé čáry spojující vyhledávací vzory.',
      ],
      bullets: [
        'Styl zarovnání: Vyhledávač shod, Čtverec, Zaoblený nebo Kruh.',
        'Styl časování: Modul shody, plný nebo přerušovaný.',
      ],
    },
    {
      heading: 'Barvy',
      paragraphs: [
        'Popředí: Barva QR modulů. Standardní je černá (#000000), ale funguje jakákoli tmavá barva.',
        'Pozadí: Barva pozadí. Standardní je bílá (#ffffff). Zajistěte dostatečný kontrast s popředím.',
        'Průhledné pozadí: Pro použití na barevných površích pozadí zcela odstraňte. Ujistěte se, že povrch poskytuje dostatečný kontrast.',
      ],
    },
    {
      heading: 'Velikost a mezera modulu',
      paragraphs: [
        'Velikost modulu: Určuje velikost každého modulu v pixelech. Větší hodnoty vytvářejí větší a snadněji čitelné kódy.',
        'Mezera mezi moduly: Přidává prostor mezi moduly v procentech. Malé mezery (5–15 %) mohou za určitých podmínek zlepšit skenovatelnost, ale nadměrné mezery snižují spolehlivost.',
      ],
    },
    {
      heading: 'Nastavení výstupu',
      paragraphs: [
        'Formát: Vyberte formát exportu na základě případu použití.',
      ],
      bullets: [
        'PNG: Bezztrátový rastrový formát, ideální pro většinu použití. Nejlepší pro tisk i digitální formát.',
        'WebP: Moderní formát s menšími velikostmi souborů. Vhodný pro webové použití.',
        'GIF: Vyžadováno pro animované QR kódy. Podporuje průhlednost.',
        'SVG: Vektorový formát s nekonečným škálováním. Nejlepší pro velký tisk nebo když potřebujete upravit kód.',
      ],
    },
    {
      heading: 'Výstupní rozměry',
      paragraphs: [
        'Šířka/Výška: Nastavte výstupní velikost v pixelech. Pro tisk použijte DPI (např. 300 DPI na 1 palec = 300 pixelů). Větší velikosti se skenují spolehlivěji z dálky.',
      ],
    },
    {
      heading: 'Nastavení animace (pokročilé)',
      paragraphs: [
        'Ovládání chování animovaného QR kódu:',
      ],
      bullets: [
        'Rychlost: Snímková frekvence animace v milisekundách.',
        'Smyčka: Nepřetržitá nebo jednorázová animace.',
        'Bounce: Režie animace ping-pongu.',
        'Spustit snímek: Zahájit animaci od konkrétního snímku.',
        'Max. snímků: Omezení celkového počtu snímků v animaci.',
        'Krok po snímcích: Přeskakování snímků pro rychlejší animaci.',
        'Interpolace: Žádná, Prolnutí nebo Morf mezi snímky.',
      ],
    },
    {
      heading: 'Typy obsahu (pokročilé)',
      paragraphs: [
        'Pokročilá úroveň odemyká další formáty datového zatížení:',
      ],
      bullets: [
        'Telefonní číslo (tel:): Vytvoří telefonní spojení, na které lze volat.',
        'E-mail (mailto:): Otevře e-mailového klienta s volitelným předmětem a tělem zprávy.',
        'SMS: Předvyplněná textová zpráva na telefonní číslo.',
        'vCard: Kompletní kontaktní karta se jménem, organizací, telefonním číslem, e-mailem a adresou.',
        'MeCard: Kompaktní formát kontaktů oblíbený v Japonsku.',
        'BizCard: Starší formát vizitek.',
        'Geografická poloha: GPS souřadnice, které se otevírají v mapách.',
        'WiFi: Síťové přihlašovací údaje pro automatické připojení (SSID, heslo, typ zabezpečení).',
        'Událost v kalendáři: formát iCalendar s názvem, místem konání, datem/časem.',
        'Potvrzení účasti na akci: Odkaz na stránku registrace na akci.',
        'Přihlásit se k odběru kalendáře: Přihlaste se k odběru kanálu ICS/WebCal.',
        'URL souboru/dokumentu: Přímý odkaz na soubory ke stažení.',
        'Odkaz na cloudové úložiště: Odkazy na Disk Google, Dropbox, OneDrive atd.',
        'Profil na sociálních sítích: Odkazy na LinkedIn, Twitter, Instagram atd.',
        'Odkaz na zasílání zpráv: Průběžné odkazy na WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'Pokročilé funkce překrytí',
      paragraphs: [
        'Další možnosti překrytí:',
      ],
      bullets: [
        'Oříznutí: Povolte oříznutí pro výběr čtvercové oblasti obrázku.',
        'Polotón: Klasický bodový vzor ve stylu tisku založený na jasu obrazu.',
        'Dithering: Dithering s difuzí chyb pro detailní reprodukci.',
      ],
    },
    {
      heading: 'Režimy prolnutí překrytí (pokročilé)',
      paragraphs: [
        'Další režimy prolnutí v pokročilé úrovni:',
      ],
      bullets: [
        'Subpixel: Rozdělí každý modul na subpixely pro dosažení vyšších detailů.',
        'Modrý šum: Používá dithering modrého šumu pro vytvoření vzorů bez artefaktů.',
        'Mozaika: Efekt založený na dlaždicích zachovávající strukturu obrazu.',
        'Vyplnění mezer: Umístí obrázek do mezer mezi moduly.',
        'Jas: Velikost modulu se mění v závislosti na jasu obrazu.',
        'Duotone: Mapuje obrázek do dvou barev pro výrazný kontrast.',
      ],
    },
    {
      heading: 'Intenzita překrytí',
      paragraphs: [
        'Ovládá, jak silně překryv ovlivňuje QR kód (0–100 %). Vyšší hodnoty zobrazují více detailů obrázku, ale mohou snížit skenovatelnost. Začněte s hodnotou kolem 70 % a upravte ji podle testování.',
      ],
    },
    {
      heading: 'Barevný režim',
      paragraphs: [
        'Jak se zpracovává překryvný obrázek:',
      ],
      bullets: [
        'Plné barvy: Zachovává původní barvy obrazu.',
        'Šedá stupně: Převede na černobílé tóny.',
        'Černobílá: Vysoce kontrastní binární konverze.',
      ],
    },
    {
      heading: 'Zachovat vzory vyhledávače',
      paragraphs: [
        'Pokud je tato možnost povolena, tři rohové vzory pro vyhledávání zůstanou nezměněny překrytím. Důrazně doporučeno pro spolehlivé skenování.',
      ],
    },
    {
      heading: 'Předzpracování obrazu',
      paragraphs: [
        'Před prolnutím použijte na překryvný obrázek filtry. Tyto úpravy mohou vylepšit, jak se obrázek zobrazuje ve finálním QR kódu.',
      ],
      bullets: [
        'Jas (-100 až +100): Zesvětlení nebo ztmavení obrazu.',
        'Kontrast (-100 až +100): Zvýšení nebo snížení tónového rozsahu.',
        'Gamma (0,2 až 3,0): Nelineární nastavení jasu. Hodnoty pod 1 zesvětlují střední tóny, nad 1 je ztmavují.',
        'Sytost (-100 až +100): Intenzita barev. -100 je stupně šedi, +100 je přesycená.',
        'Otočení odstínu (0–360°): Posouvá všechny barvy v barevném kruhu.',
        'Rozmazání (0–20 px): Změkčení detailů obrazu.',
        'Zaostření (0–100 %): Zvýraznění hran a detailů.',
        'Posterizace (0–16 úrovní): Snižte úrovně barev pro efekt plakátu.',
        'Práhová hodnota (0–255): Převod na binární černobílou v bodě odpojení.',
        'Detekce hran: Sobelovy nebo Cannyho algoritmy pro zobrazení pouze hran.',
        'Invertovat: Obrácení všech barev.',
      ],
    },
    {
      heading: 'Režim přizpůsobení',
      paragraphs: [
        'Jak se překryvný obrázek vejde do oblasti QR kódu:',
      ],
      bullets: [
        'Obálka: Obrázek vyplní celou oblast, v případě potřeby se ořízne.',
        'Obsahuje: Celý obrázek viditelný, může mít okraje.',
        'Roztažení: Obrázek se zkreslí, aby se přesně vyplnil.',
      ],
    },
    {
      heading: 'Možnosti transformace',
      paragraphs: [
        'Otočení: Otočení překrytí v krocích po 90°.',
        'Převrátit X/Y: Zrcadlí obraz vodorovně nebo svisle.',
      ],
    },
    {
      heading: 'Algoritmy ditheringu',
      paragraphs: [
        'Dithering převádí obrázky s kontinuálními tóny na vzory, které mohou reprezentovat QR kódy. K dispozici při použití režimů prolnutí Dithered, Blue Noise nebo True Dither.',
      ],
      bullets: [
        'Rozptyl chyb: Klasický styl Floyda-Steinberga. Rozprostírá chybu kvantizace do sousedních pixelů.',
        'Uspořádané (Bayer): Používá prahovou matici pro pravidelné vzory.',
        'Shluk teček: Simuluje tisk polotónů.',
        'Prázdnota a shluk: Optimalizované uspořádané rozklady.',
        'Modrý šum: Vizuálně příjemný náhodně vypadající vzor.',
        'Práhová hodnota modrého šumu: Dithering prahu s texturou modrého šumu.',
        'Bílý šum: Náhodné prahové rozptylování.',
        'Gaussův/trojúhelníkový šum: Šum s různým rozdělením.',
        'Modrý šum + difúze chyb: Hybrid kombinující obě techniky.',
        'Stíněný modrý šum: Modrý šum podobný stíněné vrstvě.',
        'Percepční: Vážené jasem pro lepší vizuální výsledky.',
        'S ohledem na okraje: Zachovává okraje obrazu během ditheringu.',
        'Adaptivní práh: Lokálně adaptivní prahování.',
        'Dočasný modrý šum: U animovaných GIFů se vzorek mění v jednotlivých snímcích.',
      ],
    },
    {
      heading: 'Difuzní jádra',
      paragraphs: [
        'Při použití ditheringu Error Diffusion zvolte způsob rozložení chyby:',
      ],
      bullets: [
        'Floyd-Steinberg: Klasická difúze se 4 sousedy. Dobrý obecný výběr.',
        'Jarvis-Judice-Ninke: 12 sousedů, plynulejší, ale pomalejší.',
        'Stucki: Podobné jako JJN s různými váhami.',
        'Burkes: Zjednodušené JJN, rychlejší.',
        'Sierra: Rodina jader vyvažující kvalitu a rychlost.',
        'Atkinson: Rozptyl světla, zachovává detaily, ale může být zrnitý.',
      ],
    },
    {
      heading: 'Síla chvění',
      paragraphs: [
        'Ovládá míru aplikovaného ditheringu (0–100 %). Nižší hodnoty zachovávají více původního vzoru, vyšší hodnoty zobrazují více detailů obrazu.',
      ],
    },
    {
      heading: 'Nastavení subpixelů',
      paragraphs: [
        'Při použití režimu prolnutí Subpixel:',
      ],
      bullets: [
        'Velikost mřížky: 2×2, 3×3 nebo 4×4 subpixely na modul. Vyšší = více detailů.',
        'Pravidlo pro střed: Strict vyžaduje, aby středový subpixel odpovídal modulu. Halftone Center umožňuje variaci.',
        'Neutrální barva: Barva použitá pro neurčené subpixely.',
        'Přepsání Finderu: Jak se vykreslují vzory Finderu (plné nebo stylizované).',
      ],
    },
    {
      heading: 'Nastavení polotónů',
      paragraphs: [
        'Při použití režimu prolnutí Polotón:',
      ],
      bullets: [
        'Velikost buňky: na modul nebo mřížku N×N.',
        'Tvar tečky: Kruh, čtverec nebo čára.',
        'Křivka jasu: Lineární, S-křivka nebo Gamma.',
      ],
    },
    {
      heading: 'Duotonové barvy',
      paragraphs: [
        'Při použití režimu prolnutí Duotone nastavte barvu stínu (tmavé oblasti) a barvu zvýraznění (světlé oblasti).',
      ],
    },
    {
      heading: 'Nastavení animace GIF',
      paragraphs: [
        'Při použití animovaných překryvných obrázků GIF:',
      ],
      bullets: [
        'Použijte zpoždění snímků: Respektujte původní načasování GIFů.',
        'Max FPS: Omezení snímkové frekvence (1–60 fps).',
        'Manipulace s likvidací: Respektujte nebo zjednodušte metody likvidace rámů.',
      ],
    },
    {
      heading: 'Pokročilé možnosti vykreslování',
      paragraphs: [
        'Další ovládací prvky vykreslování:',
      ],
      bullets: [
        'Režim mezery: Žádný, Vložený, Tah nebo Styl mezery Negativní prostor.',
        'Poloměr rohu: Procento zaoblených rohů pro moduly.',
        'Gradient: Žádný, lineární, radiální nebo kuželový gradient na modulech.',
        'Vnější/vnitřní styl oka: Nezávislý styl pro kroužky s hledacím vzorem.',
        'Rotace teček: Otáčení diamantových/tečkových modulů.',
        'Měřítko oka: Úprava velikosti pro vzory hledáčku.',
        'Styl rámečku: Přidejte ozdobné rámečky (zaoblený rámeček, samolepku, štítek).',
        'Text rámečku: Přidejte do rámečků text jako Naskenuj mě!.',
      ],
    },
    {
      heading: 'Pokročilé kódování QR kódů',
      paragraphs: [
        'Doladění kódování QR kódů:',
      ],
      bullets: [
        'Režim kódování: Automatický, Číselný, Alfanumerický, Byte/UTF-8 nebo Kanji.',
        'Vynutit minimální klidovou zónu: Zajistit alespoň 4modulový odstup.',
      ],
    },
    {
      heading: 'Pokročilé možnosti výstupu',
      paragraphs: [
        'Další nastavení exportu:',
      ],
      bullets: [
        'Název souboru: Vlastní název souboru pro stahování.',
        'Velikost palety GIF: 2–256 barev ve výstupu GIF.',
        'Kvantizér GIFů: Mediánový řez, NeuQuant nebo redukce barev Octree.',
        'Rozklad GIFů: Vypnuto, Floyd-Steinberg nebo Uspořádané.',
        'Průhledná barva GIFu: Nastavení průhledné barvy.',
        'SVG True Vector: Používejte cesty místo vloženého rastru.',
        'Přesnost tvaru SVG: Vykreslování pixelů nebo přesné vykreslování cesty.',
        'Vložit rastrový obrázek do SVG: Zahrnout překrytí jako vložený obrázek.',
        'Přepsání pozadí: Vynutí použití určité barvy pozadí ve výstupu.',
      ],
    },
    {
      heading: 'Možnosti ověření',
      paragraphs: [
        'Nastavení zpracování vstupu:',
      ],
      bullets: [
        'Ověření vstupu: Před kódováním zkontrolujte formát obsahu.',
        'Ořezání bílých znaků: Odebrání úvodních/koncových mezer.',
        'Normalizace nových řádků: Převedení všech konců řádků na LF.',
        'Ochrana maximální délky: Upozornit, pokud obsah překročí kapacitu QR kódu.',
      ],
    },
    {
      heading: 'Profesionální funkce',
      paragraphs: [
        'Profesionální úroveň přidává vodoznaky, metadata, možnosti sdílení, analýzu bezpečnosti, platební QR kódy a podnikové funkce.',
      ],
    },
    {
      heading: 'Vodoznak',
      paragraphs: [
        'Přidejte vodoznaky do QR kódů:',
      ],
      bullets: [
        'Druh: Textový, obrázkový nebo vzorový vodoznak.',
        'Pozice: Střed, Rohy, Okraje, Za nebo Klidová zóna.',
        'Opacita: Průhlednost vodoznaku (0–100 %).',
        'Režim prolnutí: Normální, Násobení, Obrazovka nebo Překrytí.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: [
        'Vložit metadata do exportovaných souborů:',
      ],
      bullets: [
        'Pole Název, Autor, Autorská práva, Licence, Popis.',
        'Čas vytvoření: Vložit časové razítko generování.',
        'Vlastní klíč-hodnota: Přidání libovolných párů metadat.',
      ],
    },
    {
      heading: 'Sdílení',
      paragraphs: [
        'Sdílejte konfigurace QR kódu:',
      ],
      bullets: [
        'Přímý odkaz: Vygenerujte sdílenou URL adresu s vaším aktuálním nastavením.',
        'Vložit HTML: Získejte kód pro vložení webových stránek.',
        'Parametry kódování: Zahrnout všechna nastavení do adresy URL sdílení.',
        'Poznámka: Překryvné obrázky z lokálních souborů nelze sdílet prostřednictvím adresy URL.',
      ],
    },
    {
      heading: 'Analýza bezpečnosti',
      paragraphs: [
        'Zajistěte, aby QR kódy zůstaly skenovatelné:',
      ],
      bullets: [
        'Bezpečnostní režim: Vypnuto, Vyvážené nebo Přísné požadavky na skenování.',
        'Min. velikost modulu: Minimální velikost pixelu na modul.',
        'Minimální klidová zóna: Moduly s minimální rezervou.',
        'Vyhledávače zámků/Načasování/Zarovnání/Formát/Verze: Ochrana specifických prvků.',
        'Maximální intenzita překrytí pomocí ECC: Automatické limity intenzity založené na úrovni korekce chyb.',
      ],
    },
    {
      heading: 'Typy obsahu (profesionální)',
      paragraphs: [
        'Profesionální úroveň přidává typy plateb a podnikového obsahu:',
      ],
      bullets: [
        'EPC/SEPA (EU): QR kódy pro evropské bankovní převody s IBAN, BIC, částkou a referenčním číslem.',
        'UPI (Indie): Sjednocené platební rozhraní s VPA, jménem příjemce platby, částkou.',
        'PayNow (Singapur): Rychlá platba v Singapuru s UEN nebo mobilním číslem.',
        'PromptPay (Thajsko): Thajský národní platební systém.',
        'PIX (Brazílie): Okamžitá platba v Brazilii s klíčem PIX.',
        'Kryptoměna: Platební adresy Bitcoin, Ethereum, Litecoin s volitelnou částkou.',
        'Odkaz na marketingovou kampaň: URL adresy s plným sledováním parametrů UTM (marketingových tagů).',
        'Krátký odkaz: Pro použití se zkracovači URL pro dynamické/sledovatelné QR kódy.',
        'GS1 Digitální propojení: Identifikace produktu pomocí GTIN, sériového čísla, šarže a data expirace.',
        'Přímé odkazy aplikací: Přímé odkazy aplikací pro iOS/Android s vlastními schématy.',
        'Vlastní formát: Nezpracovaná data bez formátování nebo validace.',
      ],
    },
    {
      heading: 'Platby relevantní pro jazyk v pokročilém režimu',
      paragraphs: [
        'Při použití pokročilého režimu ANQR automaticky zobrazuje platební metody relevantní pro vámi vybraný jazyk. Například vietnamští uživatelé vidí VietQR, thajští uživatelé vidí PromptPay a indičtí uživatelé vidí UPI a BharatQR. Globální platební metody (kryptoměny, PayPal, Cash App) jsou k dispozici pro všechny jazyky. Profesionální režim odemyká všechny platební standardy bez ohledu na jazyk.',
      ],
    },
    {
      heading: 'Evropské platební standardy',
      bullets: [
        'EPC/SEPA (EU): Evropské QR kódy pro bankovní převody podle standardu EPC QR Code. Podporuje IBAN, BIC (volitelné pro domácí platby), částku v EUR a strukturované i nestrukturované platební reference. Používá se v celé zóně SEPA včetně zemí EU a dále Švýcarska, Norska, Islandu, Lichtenštejnska, Monaka a San Marina.',
        'Švýcarská QR faktura: Švýcarský platební standard podle implementačních pokynů SIX. Podporuje CHF a EUR, QR referenci (QRR), referenci věřitele (ISO 11649), strukturované adresy věřitelů/dlužníků a informace o faktuře. Vyžadováno pro švýcarské faktury od roku 2022.',
      ],
    },
    {
      heading: 'Indické platební standardy',
      bullets: [
        'UPI (Indie): Sjednocené platební rozhraní podle specifikace NPCI Deep Linking. Podporuje VPA (virtuální platební adresu), jméno příjemce, částku v INR, poznámku k transakci, referenční ID, kód kategorie obchodníka a režim transakce.',
        'BharatQR (Indie): Sjednocený standard QR kódů podporující platby UPI i platby kartou. Kombinuje UPI VPA s PAN karty pro maximální kompatibilitu. Zahrnuje název obchodníka, město, MCC, údaje o DPH a čísla faktur/referenční čísla.',
      ],
    },
    {
      heading: 'Platební standardy jihovýchodní Asie',
      bullets: [
        'PayNow (Singapur): Singapurský systém rychlých plateb využívající specifikaci EMVCo QR s profilem SGQR. Podporuje UEN (registrace firmy), číslo mobilního telefonu nebo NRIC jako proxy identifikátory. Zahrnuje příznak upravitelnosti částky a datum platnosti.',
        'PromptPay (Thajsko): Thajský národní platební systém splňující profil EMV Bank of Thailand. Podporuje mobilní číslo, národní identifikační číslo, daňové identifikační číslo, ID elektronické peněženky a platby faktur s více referenčními poli.',
        'QRIS (Indonésie): Indonéský standard pro kód rychlé odezvy. Národní platební standard založený na EMV s podporou ID obchodníka, NMID (národní ID obchodníka), klasifikace dle kritérií obchodníka a poplatků za služby (fixních nebo procentuálních).',
        'DuitNow (Malajsie): Malajský systém okamžitých plateb. Podporuje více typů proxy serverů, včetně NRIC, mobilního telefonu, pasu, armádního průkazu totožnosti a registračního čísla firmy.',
        'VietQR (Vietnam): Vietnamský standard pro mezibankovní převody. Vyžaduje bankovní BIN (identifikace NAPAS) a číslo účtu. Podporuje více servisních kódů pro různé typy převodů (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filipíny): Filipínský standard pro platby QR kódy pro InstaPay a PESONet. Používá čísla účtů s identifikací obchodníka pro transakce P2M (osoba-obchodník).',
      ],
    },
    {
      heading: 'Východoasijské platební standardy',
      bullets: [
        'TWQR (Tchaj-wan): Tchajwanský standard pro platby QR kódy. Podporuje ID obchodníka, DIČ a částky TWD.',
        'HKQR/FPS (Hongkong): QR kódy systému rychlejších plateb v Hongkongu. Podporuje FPS ID, číslo mobilního telefonu nebo e-mail jako identifikátory plateb. Částky v HKD.',
        'JPQR (Japonsko): Japonský jednotný standard pro platby pomocí QR kódu. Používá ID obchodu pro identifikaci obchodníka s částkami v JPY.',
      ],
    },
    {
      heading: 'Další regionální platební standardy',
      bullets: [
        'PIX (Brazílie): Systém okamžitých plateb Brazilské centrální banky podle specifikace BR Code. Podporuje klíče PIX (CPF, CNPJ, e-mail, telefon nebo náhodný klíč), jméno/město obchodníka, ID transakce a částky v BRL.',
        'AusPayNet/NPP PayID (Austrálie): Systém PayID pro novou australskou platební platformu. Podporuje typy PayID (e-mail, mobil, ABN, ID organizace) nebo tradiční BSB + číslo účtu. Název obchodníka je volitelný, protože plátci vidí registrovaný název z vyhledávání NPP.',
      ],
    },
    {
      heading: 'Platby kryptoměnami',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): Standardní URI pro platby kryptoměnami s adresou peněženky, volitelnou částkou a popiskem. Kompatibilní se všemi hlavními peněženkami Bitcoin a Litecoin.',
        'Lightning Network (BOLT11): Platební faktury Lightning Network. Vložte fakturační řetězec kódovaný v BOLT11 pro okamžité platby bitcoiny s minimálními poplatky.',
        'Ethereum (EIP-681): URI požadavků na transakci Ethereum podporující nativní převody ETH a převody tokenů ERC-20. Zahrnuje ID řetězce pro podporu více sítí (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parametry plynu a volání funkcí kontraktu.',
      ],
    },
    {
      heading: 'Služby platebních odkazů',
      bullets: [
        'PayPal.Me: Platební odkazy PayPal s uživatelským jménem a volitelnou předvyplněnou částkou. Příjemci mohou platit prostřednictvím zůstatku na účtu PayPal, kartou nebo bankovním účtem.',
        'Aplikace Cash: Platební odkazy v aplikaci Cash používajících $cashtag s volitelnou částkou. Oblíbené ve Spojených státech pro peer-to-peer platby.',
      ],
    },
    {
      heading: 'Obecný EMV QR kód',
      bullets: [
        'EMV Generic: Vytvořte si vlastní QR kódy EMV pro režim prezentovaný obchodníkem pro platební schémata, která nejsou konkrétně uvedena. Nakonfigurujte název obchodníka, město, kód země (ISO 3166-1), kód měny (číselný dle ISO 4217), MCC, možnosti spropitného/poplatku za pohodlí a další datová pole. Užitečné pro testování nebo vlastní integrace.',
      ],
    },
    {
      heading: 'Režimy prolnutí překrytí (Profesionální)',
      paragraphs: [
        'Další režimy prolnutí na úrovni Professional:',
      ],
      bullets: [
        'Pixelate: Efekt pixelovaného překrytí.',
        'Obrys: Překrytí detekce hran zobrazující pouze kontury.',
        'Vlna: Efekt vlnitého zkreslení.',
        'Velikost subpixelu: Variabilní velikost subpixelu na základě obrázku.',
        'True Dither: Pokročilé ditherování s výběrem uspořádané matice.',
        'Extrémní: Maximální viditelnost obrazu, může ovlivnit skenovatelnost.',
      ],
    },
    {
      heading: 'Nastavení ochrany',
      paragraphs: [
        'Jemně odstupňovaná kontrola nad tím, které QR prvky jsou chráněny před úpravou překrytí:',
      ],
      bullets: [
        'Zachovat načasování: Udržovat časové vzorce neměnné.',
        'Zachovat zarovnání: Zachovat vzory zarovnání beze změn.',
        'Informace o formátu ochrany: Informační moduly formátu ochrany.',
        'Informace o verzi ochrany: Moduly s informacemi o verzi ochrany.',
      ],
    },
    {
      heading: 'Režim s vědomím ECC',
      paragraphs: [
        'Inteligentně rozděluje intenzitu překrytí na základě kapacity korekce chyb. Systém analyzuje, které moduly lze upravit při zachování skenovatelnosti.',
      ],
      bullets: [
        'Rozpočet rizik: Procento využití kapacity pro korekci chyb (0–100 %).',
        'Vyšší rozpočet = viditelnější překryv, ale rizikovější skenovatelnost.',
        'Nižší rozpočet = bezpečnější skenování, ale méně viditelné překrytí.',
      ],
    },
    {
      heading: 'Možnosti profesionálního renderování',
      paragraphs: [
        'Pokročilé ovládací prvky vykreslování:',
      ],
      bullets: [
        'Ostré hrany: Pro ostré hrany modulů použijte pixelované vykreslování obrazu.',
        'Pixel Snap: Zarovnání pixelů k podlaze, zaoblení nebo stropu.',
        'Barevný režim pro jednotlivé moduly: Plný, Podle jasu, Podle polohy, Podle překrytí, Podle shluku.',
        'Paleta barev: Definujte vlastní paletu barev pro barvení jednotlivých modulů.',
        'Ochrana kontrastu: Zajistěte minimální kontrastní poměr mezi barvami.',
        'Minimální kontrastní poměr: Požadavek na kontrast ve stylu WCAG (1:1 až 21:1).',
        'Moduly pro další hranice: Další hranice za klidovou zónou.',
      ],
    },
    {
      heading: 'Možnosti profesionálního výstupu',
      paragraphs: [
        'Nastavení exportu pro podniky:',
      ],
      bullets: [
        'DPI: Nastavte rozlišení tisku (72–600 DPI). Pro tisk se doporučuje 300 DPI.',
        'Zahrnout klidovou zónu: Přepnout klidovou zónu ve výstupních dimenzích.',
        'Exportovat jako další: Generovat PDF vedle primárního formátu.',
      ],
    },
    {
      heading: 'Nastavení animace (profesionální)',
      paragraphs: [
        'Další profesionální animační funkce:',
      ],
      bullets: [
        'Dočasné rozklady: Vypnuto, Modrý šum nebo Bezpečné rozklady snímků proti blikání.',
        'Vzor: Žádný, Pulzní, Vlnový, Čárový sken, Třpyt nebo Drift.',
      ],
    },
    {
      heading: 'Referenční informace k API',
      paragraphs: [
        'ANQR poskytuje serverové API pro generování QR kódů pomocí parametrů URL. To je ideální pro vkládání QR kódů do webových stránek, e-mailů, dokumentů nebo automatizovaných pracovních postupů bez JavaScriptu na straně klienta.',
        'Základní URL: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Základní parametry',
      paragraphs: [
        'Požadované a běžné parametry (názvy parametrů se nepřekládají):',
      ],
      bullets: [
        'data (povinné): Obsah, který se má zakódovat do QR kódu. Speciální znaky pro kódování URL.',
        'velikost: Velikost obrázku v pixelech (výchozí: 400, max.: 2000). Použije se, pokud není zadána šířka/výška.',
        'š, v: Výstupní šířka a výška v pixelech. Přepíše parametr velikosti.',
        'formát: Výstupní formát — png, webp nebo gif (výchozí: png).',
        'ec: Úroveň korekce chyb — L, M, Q nebo H (výchozí: H).',
        'fg: Barva popředí v hexadecimálním formátu bez # (výchozí: 000000).',
        'bg: Barva pozadí v hexadecimálním formátu bez # (výchozí: ffffff).',
        'průhledné: Nastavte na 1 pro průhledné pozadí.',
        'okraj: Klidová zóna v modulech (výchozí: 4).',
      ],
    },
    {
      heading: 'Parametry stylingu',
      paragraphs: [
        'Stylování modulů a vzorů:',
      ],
      bullets: [
        'styl: Styl modulu – čtverec, zaoblený, tečky, kosočtverec, propojený.',
        'finder: Styl vzoru Finderu – čtverec, zaoblený, kruh.',
        'zarovnání: Styl vzoru zarovnání — match_finder, čtverec, zaoblený, kruh.',
        'časování: Styl časového vzoru — match_module, plná, přerušovaná.',
        'poloměr: Procentuální hodnota poloměru rohu 0–100.',
        'mezera: Procento mezery modulů 0–50.',
        'gapMode: Režim mezery — žádný, vsazený, tah, záporný_prostor.',
        'eyeOuter, eyeInner: Styly očí – čtvercové, zaoblené, kruhové.',
        'eyeScale: Procento stupnice očí (výchozí: 100).',
        'grad: Typ gradientu — žádný, lineární, radiální, kuželový.',
        'gradAngle: Úhel gradientu pro lineární gradienty.',
        'gradStops: Zastavení přechodu jako barva1,pozice1,barva2,pozice2,… (např. ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Parametry překrytí',
      paragraphs: [
        'Možnosti překryvného obrázku (překryvný obrázek se načítá na straně serveru):',
      ],
      bullets: [
        'img: URL adresa pro překryvný obrázek (musí být veřejně přístupná).',
        'režim: Režim překrytí — střed, polotón, prolnutí, jas, mozaika, rozklad, modrý šum, subpixel.',
        'intenzita: Intenzita překrytí 0–100 (výchozí: 100).',
        'colorMode: Režim barev překrytí – barva, stupně šedi, černobílý.',
        'přizpůsobení: Jak se překryv přizpůsobí – zakrýt, obsáhnout, roztáhnout.',
        'rotace: Rotace překrytí ve stupních.',
        'flipX, flipY: Nastavte na 1 pro převrácení překrytí.',
        'keepFinders: Zachovat vzory pro vyhledávání (výchozí: 1).',
        'keepTiming, keepAlign: Nastavte na 1 pro zachování vzorů časování/zarovnání.',
      ],
    },
    {
      heading: 'Parametry předběžného zpracování',
      paragraphs: [
        'Předzpracování obrazu použité na překrytí:',
      ],
      bullets: [
        'jas: Nastavení -100 až 100 (výchozí: 0).',
        'kontrast: Úprava -100 až 100 (výchozí: 0).',
        'gama: Hodnota 0,1 až 3 (výchozí: 1).',
        'sytost: Úprava -100 až 100 (výchozí: 0).',
        'odstín: Rotace odstínu ve stupních.',
        'rozmazání: Rozmazání v pixelech.',
        'zaostření: Míra zaostření 0–100.',
        'posterizace: Posterizace úrovní.',
        'práh: Binární práh 0–255.',
        'hrana: Detekce hran – vypnuto, sobel, chytrost.',
        'invertovat: Nastavte na 1 pro invertování barev.',
      ],
    },
    {
      heading: 'Parametry vodoznaku',
      paragraphs: [
        'Přidání vodoznaků do vygenerovaných QR kódů:',
      ],
      bullets: [
        'wmEn: Nastavením na 1 povolíte vodoznak.',
        'wmKind: Typ vodoznaku – text, obrázek, vzor.',
        'wmText: Text vodoznaku (kódovaný pomocí URL).',
        'wmImg: URL adresa obrázku vodoznaku.',
        'wmPos: Pozice — střed, rohy, hrany, za, tichá_zóna.',
        'wmOpacity: Neprůhlednost 0–100 (výchozí: 50).',
        'wmBlend: Režim prolnutí — normální, násobení, obrazovka, překrytí.',
      ],
    },
    {
      heading: 'Parametry animace',
      paragraphs: [
        'Pro animovaný GIF výstup (vyžaduje formát=gif):',
      ],
      bullets: [
        'animPattern: Animační vzor — žádný, pulz, vlna, řádek skenování, třpyt, drift, barevný cyklus.',
        'animFrames: Počet snímků 1–60 (výchozí: 24).',
        'animSpeed: Zpoždění snímku v milisekundách 10–1000 (výchozí: 100).',
        'animSeed: Náhodné seed pro animaci.',
        'zpomalení: Zpomalení animace — lineární, náběh/doběh, náběh/doběh, náběh/doběh, odraz.',
      ],
    },
    {
      heading: 'Výstupní parametry',
      paragraphs: [
        'Možnosti výstupního formátu:',
      ],
      bullets: [
        'kvalita: kvalita WebP 0–1 (výchozí: 0,9).',
        'webpQ: Kvalita WebP 0–100 (výchozí: 90).',
        'gifColors: Velikost palety GIF 2–256 (výchozí: 256).',
        'dpi: Výstupní DPI pro PNG (výchozí: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: Pole metadat PNG.',
      ],
    },
    {
      heading: 'Příklad použití',
      paragraphs: [
        'Základní QR kód:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Stylizovaný QR kód s vlastními barvami:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'QR kód s překryvným obrázkem:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'Animovaný GIF:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Vkládání QR kódů',
      paragraphs: [
        'V profesionálním režimu funkce Sdílet generuje vložitelné HTML a URL adresy. Vkládání funguje takto:',
      ],
      bullets: [
        'Sdílet odkaz: Vytvoří URL adresu aplikace ANQR se všemi vašimi nastaveními zakódovanými jako parametry URL. Příjemci si mohou QR kód prohlédnout a upravit.',
        'Vložit obrázek: Generuje tag odkazující na serverové API. QR kód je vykreslen na straně serveru a zobrazen jako obrázek.',
        'Vložit Markdown: Vytvoří syntaxi obrázků Markdownu pro dokumentaci a soubory README.',
        'Přímá URL API: Nezpracovaná URL API pro použití v aplikacích, skriptech nebo jiných integracích.',
      ],
    },
    {
      heading: 'Příklad HTML',
      paragraphs: [
        'Vložení QR kódu na váš web:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=QR kód />',
        'Pro responzivní změnu velikosti:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=QR kód style=max-width: 100%; height: auto; />',
        'Server ukládá do mezipaměti odpovědi s dlouhými záhlavími, takže opakované požadavky na stejnou URL adresu jsou rychlé.',
      ],
    },
    {
      heading: 'Formát adresy URL pro sdílení',
      paragraphs: [
        'Když v profesionálním režimu kliknete na Sdílet, ANQR zakóduje vaše aktuální nastavení do parametrů URL. Formát je:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….',
        'Tyto parametry zrcadlí parametry API, takže můžete převést sdílenou URL na URL API změnou základní cesty z / na /api/qr a úpravou parametrů w/h podle potřeby.',
        'Poznámka: Překryvné obrázky nahrané z lokálních souborů nelze sdílet přes URL – ve sdílených odkazech a voláních API fungují pouze překryvné obrázky založené na URL (parametr img).',
      ],
    },
    {
      heading: 'Limity rychlosti a využití',
      paragraphs: [
        'Rozhraní API je pro rozumné objemy zdarma. Pro velké objemy použití nebo komerční aplikace vyžadující garantovanou dostupnost nás prosím kontaktujte.',
        'Odpovědi API zahrnují agresivní ukládání hlaviček do mezipaměti. Pro dosažení nejlepšího výkonu ukládejte odpovědi do mezipaměti na vaší straně nebo používejte pro identické QR kódy konzistentně stejnou URL adresu.',
      ],
    },
    {
      heading: 'Osvědčené postupy',
      paragraphs: [
        'Pro spolehlivé QR kódy postupujte podle těchto pokynů:',
      ],
      bullets: [
        'Před tiskem vždy otestujte QR kódy pomocí více aplikací pro skenování.',
        'Při přidávání překryvů použijte korekci chyb H (Vysoká).',
        'Udržujte alespoň 4 moduly klidové zóny (okraje).',
        'Zajistěte vysoký kontrast mezi popředím a pozadím.',
        'Pro tisk použijte rozlišení alespoň 300 DPI a otestujte ve skutečné velikosti tisku.',
        'Při použití překryvů povolte možnost Zachovat vzory ve vyhledávači.',
        'Začněte s nižší intenzitou překrytí a postupně ji zvyšujte.',
        'Pro venkovní použití zvažte větší velikosti modulů a vyšší korekci chyb.',
      ],
    },
    {
      heading: 'Řešení problémů',
      paragraphs: [
        'Běžné problémy a jejich řešení:',
      ],
      bullets: [
        'QR kód se neskenuje: Snižte intenzitu překrytí, zvyšte korekci chyb, zkontrolujte kontrast.',
        'Kód je příliš dlouhý: Zkraťte délku obsahu, použijte zkracovač URL, nižší verzi.',
        'Rozmazaný výstup: Zvětšete velikost modulu, použijte PNG místo komprimovaných formátů.',
        'Barvy vypadají špatně: Zkontrolujte barevný kontrast, zkuste režim překrytí stupňů šedi.',
        'GIF se neanimuje: Ujistěte se, že používáte výstup ve formátu GIF, zkontrolujte počet snímků.',
        'Překrývání obrázků se nenačítá: Zkontrolujte oprávnění CORS u vzdálených obrázků.',
      ],
    },
    {
      heading: 'Klávesové zkratky',
      paragraphs: [
        'ANQR podporuje standardní klávesové zkratky. Pro spuštění exportu použijte Ctrl/Cmd+S (při zobrazení náhledu).',
      ],
    },
    {
      heading: 'Sdílení a vkládání',
      paragraphs: [
        'V profesionálním režimu klikněte na tlačítko Sdílet a zkopírujte URL adresu s aktuálním nastavením. Příjemci si mohou tuto URL adresu otevřít a zobrazit si vaši přesnou konfiguraci. Poznámka: Překryvné obrázky z lokálních souborů nelze sdílet prostřednictvím URL adresy.',
      ],
    },
  ],
};

export default docs;
