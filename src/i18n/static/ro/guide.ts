import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const guide: PageDefinition = {
  title: 'Ghidul utilizatorului ANQR',
  description: 'Ghid complet pentru utilizarea ANQR pentru crearea de coduri QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Noțiuni introductive',
      paragraphs: [
        'ANQR este un generator de coduri QR cu o abordare axată pe client. În mod implicit, codurile QR sunt generate local în browserul dvs. — nu este necesar un cont, iar datele dvs. rămân private. Pentru integrare profesională, puteți utiliza și API-ul server-side.',
        'Interfața are trei niveluri de interfață: De bază, Avansat și Profesional. Selectați nivelul dorit folosind filele din antet. Fiecare nivel deblochează funcții suplimentare, menținând în același timp interfața concentrată pe ceea ce aveți nevoie.',
      ],
      bullets: [
        'De bază: Creare simplă de coduri QR cu text simplu/URL și suprapunere de imagini.',
        'Avansat: opțiuni de codare QR, stiluri de randare, animație, formate de ieșire, tipuri de conținut extinse și personalizare suprapunere.',
        'Professional: Filigrane, metadate, partajare, analiză de siguranță, coduri QR pentru plăți și funcții pentru întreprinderi.',
      ],
    },
    {
      heading: 'Pornire rapidă',
      paragraphs: ['Pentru a crea primul cod QR:'],
      bullets: [
        '1. Selectați un tip de conținut (URL, text, WiFi etc.) din meniul derulant Tip de conținut.',
        '2. Introduceți datele în câmpurile furnizate.',
        '3. Opțional, personalizați culorile, stilurile și adăugați o imagine suprapusă.',
        '4. Faceți clic pe Export pentru a descărca codul QR în format PNG, GIF, WebP sau SVG.',
      ],
    },
    {
      heading: 'Caracteristici de bază',
      paragraphs: [
        'Nivelul de bază oferă o interfață simplificată pentru crearea de coduri QR cu conținut suplimentar și suprapuneri de imagini. Aceasta este cea mai simplă modalitate de a începe.',
      ],
    },
    {
      heading: 'Tipuri de conținut (de bază)',
      paragraphs: [
        'Text simplu: Codificați orice text până la limita de capacitate a codului QR. Ideal pentru mesaje scurte, coduri sau identificatori.',
        'URL: Codificați adresele web. Codul QR va deschide adresa URL la scanare. Acceptă protocoalele http:// și https://.',
      ],
    },
    {
      heading: 'Suprapunere imagine (de bază)',
      paragraphs: [
        'Încărcați o imagine (JPG, PNG, GIF, WebP) pentru a o combina cu codul QR. Printre funcțiile de bază ale suprapunerii se numără:',
      ],
      bullets: [
        'Încărcare din fișier: Selectați o imagine de pe dispozitiv.',
        'Încărcare de la URL: Introduceți un URL de imagine (trebuie să permită CORS).',
        'Siglă centrală: Plasează imaginea în centru, bazându-se pe corectarea erorilor.',
        'Combinare: Combinare alfa simplă a imaginii cu modelul QR.',
        'Intensitate: Controlează cât de puternic afectează suprapunerea codul QR (0-100%).',
        'Mod culoare: Culoare completă, Tonuri de gri sau Alb-negru.',
        'Păstrați modelele Finder: Păstrează modelele de colțuri nemodificate pentru o scanare fiabilă.',
      ],
    },
    {
      heading: 'Funcții avansate',
      paragraphs: [
        'Nivelul Avansat deblochează opțiuni de codare QR, stiluri de randare, animații, formate de ieșire, tipuri de conținut extinse și personalizare avansată a suprapunerilor.',
      ],
    },
    {
      heading: 'Setări de codificare QR',
      paragraphs: [
        'Versiune: Codurile QR sunt disponibile în versiunile 1-40, versiunile superioare conținând mai multe date, dar fiind mai mari. Setați la 0 (Auto) pentru a permite ANQR să aleagă cea mai mică versiune care se potrivește conținutului dvs.',
        'Corecție erori: Determină cât de multe daune poate suferi un cod QR rămânând scanabil.',
      ],
      bullets: [
        'L (Scăzut): Corecție eroare 7% - cea mai mică dimensiune, cea mai mică redundanță.',
        'M (Mediu): Corecție eroare 15% - opțiune echilibrată.',
        'Q (Cuartilă): corecție a erorii de 25% - bun pentru codurile tipărite.',
        'H (Ridicat): Corecție eroare 30% - ideală pentru coduri cu suprapuneri sau în condiții dificile.',
      ],
    },
    {
      heading: 'Zonă liniștită (Margine)',
      paragraphs: [
        'Zona liniștită este spațiul alb din jurul codului QR. Scanerele au nevoie de această margine pentru a detecta unde începe codul. Standardul recomandă cel puțin 4 module. Reducerea sub 4 poate cauza probleme de scanare.',
      ],
    },
    {
      heading: 'Stilul modulului',
      paragraphs: [
        'Modulele sunt pătratele individuale care alcătuiesc un cod QR. ANQR oferă cinci stiluri:',
      ],
      bullets: [
        'Pătrat: Aspect clasic de cod QR cu colțuri ascuțite.',
        'Rotunjit: Colțuri înmuiate pentru un aspect mai prietenos.',
        'Puncte: Module circulare pentru o estetică modernă.',
        'Romb: pătrate rotite la 45° pentru un model distinctiv.',
        'Conectate: Modulele se îmbină atunci când sunt adiacente, creând forme organice.',
      ],
    },
    {
      heading: 'Stil model Finder',
      paragraphs: [
        'Modelele de căutare sunt cele trei pătrate mari din colțurile codurilor QR care ajută scanerele să se orienteze în cod. Stiluri disponibile:',
      ],
      bullets: [
        'Pătrat: Colțuri pătrate standard.',
        'Rotunjit: Colțuri înmuiate, care se potrivesc cu stilul modulului rotunjit.',
        'Cerc: Modele de căutare circulară pentru coduri de tip punct.',
      ],
    },
    {
      heading: 'Modele de aliniere și sincronizare',
      paragraphs: [
        'Modelele de aliniere apar în codurile QR mai mari (versiunea 2+) pentru a ajuta la corectarea distorsiunii. Modelele de sincronizare sunt liniile alternante care conectează modelele căutării.',
      ],
      bullets: [
        'Stil de aliniere: Găsire potrivire, Pătrat, Rotunjit sau Cerc.',
        'Stil de sincronizare: Modul de potrivire, Continuu sau Întrerupt.',
      ],
    },
    {
      heading: 'Culori',
      paragraphs: [
        'Prim-plan: Culoarea modulelor QR. Negrul (#000000) este standard, dar orice culoare închisă funcționează.',
        'Fundal: Culoarea de fundal. Albul (#ffffff) este standard. Asigurați un contrast suficient cu prim-planul.',
        'Fundal transparent: Îndepărtați complet fundalul pentru utilizarea pe suprafețe colorate. Asigurați-vă că suprafața oferă un contrast adecvat.',
      ],
    },
    {
      heading: 'Dimensiunea și spațiul dintre modul',
      paragraphs: [
        'Dimensiunea modulului: Controlează dimensiunea fiecărui modul în pixeli. Valorile mai mari creează coduri mai mari și mai ușor de scanat.',
        'Spațiu între module: Adaugă spațiu între module ca procent. Spațiile mici (5-15%) pot îmbunătăți scanabilitatea în anumite condiții, dar spațiile excesive reduc fiabilitatea.',
      ],
    },
    {
      heading: 'Setări de ieșire',
      paragraphs: ['Format: Alegeți formatul de export în funcție de cazul de utilizare.'],
      bullets: [
        'PNG: Format raster fără pierderi, ideal pentru majoritatea utilizărilor. Cel mai bun pentru imprimare și digital.',
        'WebP: Format modern cu fișiere mai mici. Bun pentru utilizare pe web.',
        'GIF: Necesar pentru codurile QR animate. Acceptă transparența.',
        'SVG: Format vectorial care se scalează infinit. Ideal pentru caractere mari sau când trebuie să editați codul.',
      ],
    },
    {
      heading: 'Dimensiuni de ieșire',
      paragraphs: [
        'Lățime/Înălțime: Setați dimensiunea de ieșire în pixeli. Pentru imprimare, calculați pe baza DPI (de exemplu, 300 DPI la 1 inch = 300px). Dimensiunile mai mari scanează mai fiabil la distanță.',
      ],
    },
    {
      heading: 'Setări de animație (avansate)',
      paragraphs: ['Controlează comportamentul codului QR animat:'],
      bullets: [
        'Viteză: Rata de cadre a animației în milisecunde.',
        'Buclă: Animație continuă sau cu o singură redare.',
        'Bounce: Regia animației de ping-pong.',
        'Cadru de început: Începe animația de la un cadru specific.',
        'Cadre maxime: Limitează numărul total de cadre din animație.',
        'Pas de cadru: Omite cadrele pentru o animație mai rapidă.',
        'Interpolare: Fără, Estompare încrucișată sau Morph între cadre.',
      ],
    },
    {
      heading: 'Tipuri de conținut (avansat)',
      paragraphs: ['Nivelul avansat deblochează formate suplimentare de sarcină utilă:'],
      bullets: [
        'Număr de telefon (tel:): Creează o legătură telefonică apelabilă.',
        'Email (mailto:): Deschide clientul de e-mail cu subiect și corp opțional.',
        'SMS: Mesaj text precompletat către un număr de telefon.',
        'vCard: Fișă de contact completă cu nume, organizație, telefon, e-mail, adresă.',
        'MeCard: Format compact de contact popular în Japonia.',
        'BizCard: Format tradițional de carte de vizită.',
        'Locație geografică: Coordonate GPS care se deschid în hărți.',
        'WiFi: Acreditări de rețea pentru conexiune automată (SSID, parolă, tip de securitate).',
        'Eveniment calendaristic: format iCalendar cu titlu, locație, dată/oră.',
        'RSVP eveniment: Link către pagina de înregistrare la eveniment.',
        'Abonare Calendar: Abonați-vă la un flux ICS/WebCal.',
        'URL fișier/document: Legătură directă către fișiere descărcabile.',
        'Link către stocarea în cloud: Linkuri către Google Drive, Dropbox, OneDrive etc.',
        'Profil social: Linkuri către LinkedIn, Twitter, Instagram etc.',
        'Link pentru mesagerie: linkuri directe WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'Funcții avansate de suprapunere',
      paragraphs: ['Capacități suplimentare de suprapunere:'],
      bullets: [
        'Decupare: Activați decuparea pentru a selecta o regiune pătrată a imaginii.',
        'Semiton: Model de puncte în stil clasic de imprimare, bazat pe luminozitatea imaginii.',
        'Dithering: Dithering cu difuzie de erori pentru reproducere detaliată.',
      ],
    },
    {
      heading: 'Moduri de amestecare suprapunere (avansat)',
      paragraphs: ['Moduri de amestecare suplimentare în nivelul Avansat:'],
      bullets: [
        'Subpixel: Împarte fiecare modul în subpixeli pentru detalii mai detaliate.',
        'Zgomot albastru: Folosește dithering cu zgomot albastru pentru modele fără artefacte.',
        'Mozaic: Efect pe bază de plăci care păstrează structura imaginii.',
        'Umplere gol: Plasează imaginea în golurile dintre module.',
        'Luminozitate: Dimensiunea modulului variază în funcție de luminozitatea imaginii.',
        'Duoton: Mapează imaginea la două culori pentru un contrast izbitor.',
      ],
    },
    {
      heading: 'Intensitatea suprapunerii',
      paragraphs: [
        'Controlează cât de puternic afectează suprapunerea codul QR (0-100%). Valorile mai mari afișează mai multe detalii ale imaginii, dar pot reduce scanabilitatea. Începeți în jurul valorii de 70% și ajustați în funcție de testare.',
      ],
    },
    {
      heading: 'Mod culoare',
      paragraphs: ['Cum este procesată imaginea suprapusă:'],
      bullets: [
        'Culoare completă: Păstrează culorile originale ale imaginii.',
        'Scală de gri: Convertește în tonuri de alb și negru.',
        'Alb-negru: Conversie binară cu contrast ridicat.',
      ],
    },
    {
      heading: 'Păstrați modelele Finder',
      paragraphs: [
        'Când este activat, modelele de căutare în trei colțuri nu sunt modificate de suprapunere. Recomandat insistent pentru o scanare fiabilă.',
      ],
    },
    {
      heading: 'Preprocesarea imaginilor',
      paragraphs: [
        'Aplicați filtre imaginii suprapuse înainte de amestecare. Aceste ajustări pot îmbunătăți aspectul imaginii în codul QR final.',
      ],
      bullets: [
        'Luminozitate (-100 până la +100): Luminează sau întunecă imaginea.',
        'Contrast (-100 până la +100): Măriți sau micșorați gama tonală.',
        'Gamma (0,2 până la 3,0): Reglare neliniară a luminozității. Valorile sub 1 luminează tonurile medii, peste 1 le întunecă.',
        'Saturație (-100 până la +100): Intensitatea culorii. -100 reprezintă tonurile de gri, +100 reprezintă suprasaturația.',
        'Rotire nuanță (0-360°): Deplasează toate culorile în jurul roții cromatice.',
        'Estocare (0-20px): Atenuează detaliile imaginii.',
        'Ascuțire (0-100%): Îmbunătățește marginile și detaliile.',
        'Posterizare (0-16 niveluri): Reduceți nivelurile de culoare pentru un efect de poster.',
        'Prag (0-255): Conversie în binar alb/negru la punctul de delimitare.',
        'Detecția muchiilor: algoritmi Sobel sau Canny pentru afișarea doar a muchiilor.',
        'Inversare: Inversați toate culorile.',
      ],
    },
    {
      heading: 'Mod de potrivire',
      paragraphs: ['Cum se potrivește imaginea suprapusă în zona codului QR:'],
      bullets: [
        'Copertă: Imaginea umple întreaga zonă, poate fi decupată dacă este necesar.',
        'Conține: Întreaga imagine este vizibilă, poate avea margini.',
        'Întindere: Imaginea se distorsionează pentru a umple exact.',
      ],
    },
    {
      heading: 'Opțiuni de transformare',
      paragraphs: [
        'Rotație: Rotește suprapunerea în trepte de 90°.',
        'Răsturnare X/Y: Oglindiți imaginea pe orizontală sau verticală.',
      ],
    },
    {
      heading: 'Algoritmi de dithering',
      paragraphs: [
        'Dithering-ul convertește imaginile cu tonuri continue în modele pe care le pot reprezenta codurile QR. Disponibil atunci când se utilizează modurile de amestecare Dithered, Blue Noise sau True Dither.',
      ],
      bullets: [
        'Difuzie de erori: Stil clasic Floyd-Steinberg. Răspândește eroarea de cuantizare la pixelii vecini.',
        'Ordonat (Bayer): Folosește o matrice de prag pentru modele regulate.',
        'Puncte grupate: Simulează imprimarea cu semitonuri.',
        'Void & Cluster: Dithering ordonat optimizat.',
        'Zgomot albastru: Model aleatoriu plăcut din punct de vedere vizual.',
        'Prag de zgomot albastru: Dithering de prag cu textură de zgomot albastru.',
        'Zgomot alb: Trepidație aleatorie a pragului.',
        'Zgomot gaussian/triunghiular: Zgomot cu distribuții diferite.',
        'Zgomot albastru + Difuzie de erori: Hibrid care combină ambele tehnici.',
        'Zgomot albastru ecranat: Model de zgomot albastru asemănător ecranului.',
        'Perceptual: Ponderat în funcție de luminanță pentru rezultate vizuale mai bune.',
        'Edge-Aware: Păstrează marginile imaginii în timpul dithering-ului.',
        'Prag adaptiv: Prag adaptiv local.',
        'Zgomot albastru temporal: Pentru GIF-uri animate, modelul variază per cadru.',
      ],
    },
    {
      heading: 'Nuclee de difuzie',
      paragraphs: [
        'Când se utilizează ditheringul Error Diffusion, alegeți modul în care este distribuită eroarea:',
      ],
      bullets: [
        'Floyd-Steinberg: Difuzie clasică cu 4 vecini. O alegere generală bună.',
        'Jarvis-Judice-Ninke: cu 12 vecini, mai lin, dar mai lent.',
        'Stucki: Similar cu JJN cu ponderi diferite.',
        'Burkes: JJN simplificat, mai rapid.',
        'Sierra: Familie de boabe care echilibrează calitatea și viteza.',
        'Atkinson: Difuzie a luminii, păstrează detaliile, dar poate fi granulată.',
      ],
    },
    {
      heading: 'Puterea ezitării',
      paragraphs: [
        'Controlează gradul de dithering aplicat (0-100%). Valorile mai mici păstrează o mai mare parte din modelul original, valorile mai mari afișează mai multe detalii ale imaginii.',
      ],
    },
    {
      heading: 'Setări subpixel',
      paragraphs: ['Când se utilizează modul de amestecare Subpixel:'],
      bullets: [
        'Dimensiunea grilei: 2×2, 3×3 sau 4×4 subpixeli per modul. Cu cât mai mare = mai multe detalii.',
        'Regula centrală: Strict necesită ca subpixelul central să se potrivească cu modulul. Centrul semitonurilor permite variații.',
        'Culoare neutră: Culoare utilizată pentru subpixeli nedeterminați.',
        'Suprascriere Finder: Cum sunt redate modelele finder (solide sau stilizate).',
      ],
    },
    {
      heading: 'Setări semiton',
      paragraphs: ['Când se utilizează modul de amestecare semitonuri:'],
      bullets: [
        'Dimensiunea celulei: Per modul sau grilă N×N.',
        'Formă de punct: cerc, pătrat sau linie.',
        'Curba de luminozitate: liniară, curbă în S sau gamma.',
      ],
    },
    {
      heading: 'Culori bicolore',
      paragraphs: [
        'Când utilizați modul de amestecare Duotone, setați culoarea Umbrei (zone întunecate) și culoarea Luminii (zone luminoase).',
      ],
    },
    {
      heading: 'Setări animație GIF',
      paragraphs: ['Când se utilizează suprapuneri GIF animate:'],
      bullets: [
        'Utilizați întârzierile cadrelor: Respectați sincronizarea GIF originală.',
        'FPS maxim: Limită rată cadre (1-60 fps).',
        'Manipularea eliminării: Respectați sau simplificați metodele de eliminare a ramelor.',
      ],
    },
    {
      heading: 'Opțiuni avansate de randare',
      paragraphs: ['Controale suplimentare de randare:'],
      bullets: [
        'Mod spațiu: Niciunul, Inserție, Contur sau Stilizare spațiu negativ.',
        'Raza colțului: Procentajul de colțuri rotunjite pentru module.',
        'Gradient: Niciunul, gradient liniar, radial sau conic pe module.',
        'Stil exterior/interior al ochiului: Stil independent pentru inelele cu model de căutător.',
        'Rotație puncte: Rotiți modulele romb/punct.',
        'Scală ochi: Ajustarea dimensiunii pentru modelele de vizor.',
        'Stil ramă: Adăugați rame decorative (ramă rotunjită, autocolant, etichetă).',
        'Text încadrare: Adăugați text precum «Scanează-mă!» în cadre.',
      ],
    },
    {
      heading: 'Codificare QR avansată',
      paragraphs: ['Reglare fină a codării QR:'],
      bullets: [
        'Mod de codificare: Automat, Numeric, Alfanumeric, Byte/UTF-8 sau Kanji.',
        'Aplicați zona minimă de liniște: Asigurați o marjă de cel puțin 4 module.',
      ],
    },
    {
      heading: 'Opțiuni avansate de ieșire',
      paragraphs: ['Setări suplimentare de export:'],
      bullets: [
        'Nume fișier: Nume fișier personalizat pentru descărcări.',
        'Dimensiunea paletei GIF: 2-256 culori în ieșirea GIF.',
        'Cuantizator GIF: Reducerea culorii prin tăiere mediană, NeuQuant sau Octree.',
        'Dithering GIF: Dezactivat, Floyd-Steinberg sau Ordonat.',
        'Culoare transparentă GIF: Setați o culoare care să fie transparentă.',
        'SVG True Vector: Folosește căi în loc de raster încorporat.',
        'Precizie formă SVG: Redare pixel sau cale precisă.',
        'Suprapunere raster încorporată SVG: Include suprapunerea ca imagine încorporată.',
        'Suprascriere fundal: Forțează o anumită culoare de fundal în ieșire.',
      ],
    },
    {
      heading: 'Opțiuni de validare',
      paragraphs: ['Setări de procesare a datelor de intrare:'],
      bullets: [
        'Validare intrare: Verificați formatul conținutului înainte de codificare.',
        'Trim Whitespace: Eliminați spațiile de la început/sfârșit.',
        'Normalizare linii noi: Conversie toate sfârșituluri de linie în LF.',
        'Protecție lungime maximă: Avertizare dacă conținutul depășește capacitatea codului QR.',
      ],
    },
    {
      heading: 'Caracteristici profesionale',
      paragraphs: [
        'Nivelul Profesional adaugă filigrane, metadate, opțiuni de partajare, analiză de siguranță, coduri QR pentru plăți și funcții pentru întreprinderi.',
      ],
    },
    {
      heading: 'Filigran',
      paragraphs: ['Adăugați filigrane la codurile QR:'],
      bullets: [
        'Tip: Filigran text, imagine sau model.',
        'Poziție: Centru, Colțuri, Margini, În spate sau Zonă liniștită.',
        'Opacitate: Transparență filigran (0-100%).',
        'Mod de amestecare: Amestecare Normală, Înmulțire, Ecran sau Suprapunere.',
      ],
    },
    {
      heading: 'Metadate',
      paragraphs: ['Încorporarea metadatelor în fișierele exportate:'],
      bullets: [
        'Câmpuri Titlu, Autor, Drepturi de autor, Licență, Descriere.',
        'Ora creării: Încorporarea marcajului temporal de generare.',
        'Perechi cheie-valoare personalizate: Adăugați perechi de metadate arbitrare.',
      ],
    },
    {
      heading: 'Împărtășire',
      paragraphs: ['Partajați configurațiile codului QR:'],
      bullets: [
        'Link direct: Generați o adresă URL partajabilă cu setările dvs. actuale.',
        'Încorporarea HTML-ului: Obțineți cod de încorporare pentru site-uri web.',
        'Codificare parametri: Includeți toate setările în URL-ul de partajare.',
        'Notă: Imaginile suprapuse din fișierele locale nu pot fi partajate prin URL.',
      ],
    },
    {
      heading: 'Analiza siguranței',
      paragraphs: ['Asigurați-vă că codurile QR rămân scanabile:'],
      bullets: [
        'Mod de siguranță: Cerințe de scanare dezactivate, echilibrate sau stricte.',
        'Dimensiune minimă a modulului: Dimensiunea minimă a pixelilor per modul.',
        'Zonă minimă de liniște: Module de margine minimă.',
        'Blocare instrumente de căutare/Sincronizare/Aliniere/Formatare/Versiune: Protejați elemente specifice.',
        'Intensitatea maximă a suprapunerii prin ECC: Limite automate de intensitate bazate pe nivelul de corecție a erorilor.',
      ],
    },
    {
      heading: 'Tipuri de conținut (profesional)',
      paragraphs: ['Nivelul profesional adaugă tipuri de conținut pentru plăți și întreprinderi:'],
      bullets: [
        'EPC/SEPA (UE): Coduri QR pentru transferuri bancare europene cu IBAN, BIC, sumă, referință.',
        'UPI (India): Interfață unificată de plăți cu VPA, numele beneficiarului, suma.',
        'PayNow (Singapore): Plată rapidă în Singapore cu UEN sau număr de telefon mobil.',
        'PromptPay (Thailanda): Sistem național de plăți thailandez.',
        'PIX (Brazilia): Plată instantanee braziliană cu cheie PIX.',
        'Adrese de plată Crypto: Bitcoin, Ethereum, Litecoin cu sumă opțională.',
        'Link către campania de marketing: URL-uri cu urmărire completă a parametrilor UTM (etichete de marketing).',
        'Link scurt: Pentru utilizare cu scurtătoare de URL-uri pentru coduri QR dinamice/urmăribile.',
        'GS1 Digital Link: Identificarea produsului cu GTIN, serie, lot, expirare.',
        'Link direct către aplicații: Linkuri directe către aplicații iOS/Android cu scheme personalizate.',
        'Format personalizat: Date brute fără formatare sau validare.',
      ],
    },
    {
      heading: 'Plăți relevante pentru limbă în modul avansat',
      paragraphs: [
        'Când utilizați modul Avansat, ANQR afișează automat metodele de plată relevante pentru limba selectată. De exemplu, utilizatorii vietnamezi văd VietQR, utilizatorii thailandezi văd PromptPay, iar utilizatorii de limbi indiene văd UPI și BharatQR. Metodele de plată globale (criptomonede, PayPal, Cash App) sunt disponibile pentru toate limbile. Modul Profesional deblochează toate standardele de plată, indiferent de limbă.',
      ],
    },
    {
      heading: 'Standarde europene de plată',
      bullets: [
        'EPC/SEPA (UE): Coduri QR pentru transferuri bancare europene, conform standardului EPC QR Code. Acceptă IBAN, BIC (opțional pentru plăți interne), sumă în EUR și referințe de plată structurate sau nestructurate. Utilizat în întreaga zonă SEPA, inclusiv în țările UE, plus Elveția, Norvegia, Islanda, Liechtenstein, Monaco și San Marino.',
        'Factură QR elvețiană: standard de plată elvețian conform Ghidului de implementare SIX. Acceptă CHF și EUR, referință QR (QRR), referință creditor (ISO 11649), adrese structurate creditor/debitor și informații despre factură. Obligatoriu pentru facturile elvețiene din 2022.',
      ],
    },
    {
      heading: 'Standardele de plată indiene',
      bullets: [
        'UPI (India): Interfață unificată de plăți conform specificației NPCI Deep Linking. Acceptă VPA (adresă de plată virtuală), numele beneficiarului, suma în INR, nota de tranzacție, ID-ul de referință, codul categoriei comerciantului și modul de tranzacție.',
        'BharatQR (India): Standard QR unificat care acceptă atât plățile UPI, cât și cele bazate pe card. Combină UPI VPA cu PAN-ul cardului pentru compatibilitate maximă. Include numele comerciantului, orașul, MCC, detaliile GST și numerele de factură/referință.',
      ],
    },
    {
      heading: 'Standarde de plată din Asia de Sud-Est',
      bullets: [
        'PayNow (Singapore): Sistem de plată rapidă din Singapore care utilizează specificația EMVCo QR cu profil SGQR. Acceptă UEN (numărul de înregistrare al companiei), numărul de telefon mobil sau NRIC ca identificatori proxy. Include indicatorul de editare a sumei și data de expirare.',
        'PromptPay (Thailanda): Sistem național de plăți thailandez care urmează profilul EMV al Băncii Thailandei. Acceptă număr de telefon mobil, act de identitate național, cod fiscal, cod de identificare a portofelului electronic și plată de facturi cu câmpuri de referință multiple.',
        'QRIS (Indonezia): Cod de răspuns rapid Standard indonezian. Standard național de plată bazat pe EMV care acceptă ID-ul comerciantului, NMID (National Merchant ID), clasificarea criteriilor comerciantului și comisioanele de comoditate (fixe sau procentuale).',
        'DuitNow (Malaysia): Sistem malaezian de plăți instantanee. Acceptă mai multe tipuri de proxy, inclusiv numere de identificare a numerelor de telefon, de telefon mobil, de pașaport, de act de identitate al armatei și de înregistrare comercială.',
        'VietQR (Vietnam): Standard vietnamez pentru transferuri interbancare. Necesită codul BIN al băncii (identificare NAPAS) și numărul de cont. Acceptă mai multe coduri de serviciu pentru diferite tipuri de transfer (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filipine): Standard filipinez de plată cu QR pentru InstaPay și PESONet. Folosește numere de cont cu identificarea comerciantului pentru tranzacții P2M (persoană-comerciant).',
      ],
    },
    {
      heading: 'Standarde de plată din Asia de Est',
      bullets: [
        'TWQR (Taiwan): Standard taiwanez de plată cu QR. Acceptă ID-ul comerciantului, ID-ul fiscal și sumele TWD.',
        'HKQR/FPS (Hong Kong): Coduri QR ale sistemului de plăți mai rapide din Hong Kong. Acceptă ID-ul FPS, numărul de telefon mobil sau adresa de e-mail ca identificatori de plată. Sume în HKD.',
        'JPQR (Japonia): Standard japonez unificat de plată cu cod QR. Folosește ID-ul magazinului pentru identificarea comerciantului cu sume în JPY.',
      ],
    },
    {
      heading: 'Alte standarde regionale de plată',
      bullets: [
        'PIX (Brazilia): Sistem de plată instantanee al Băncii Centrale a Braziliei, conform specificațiilor codului BR. Acceptă chei PIX (CPF, CNPJ, e-mail, telefon sau cheie aleatorie), numele/orașul comerciantului, ID-ul tranzacției și sumele în BRL.',
        'AusPayNet/NPP PayID (Australia): Sistemul PayID al noii platforme australiene de plăți. Acceptă tipuri de PayID (e-mail, mobil, ABN, ID organizație) sau BSB tradițional + număr de cont. Numele comerciantului este opțional, deoarece plătitorii văd numele înregistrat din căutarea NPP.',
      ],
    },
    {
      heading: 'Plăți prin criptomonede',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): URI-uri standard pentru plăți în criptomonede cu adresă de portofel, sumă opțională și etichetă. Compatibil cu toate portofelele importante Bitcoin și Litecoin.',
        'Lightning Network (BOLT11): Facturi de plată Lightning Network. Inserați un șir de factură codificat BOLT11 pentru plăți instantanee în Bitcoin cu comisioane minime.',
        'Ethereum (EIP-681): URI-uri pentru cereri de tranzacții Ethereum care acceptă transferuri native ETH și transferuri de token-uri ERC-20. Include ID-ul lanțului pentru suport multi-rețea (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parametrii de gaz și apelurile funcțiilor contract.',
      ],
    },
    {
      heading: 'Servicii de legătură de plată',
      bullets: [
        'PayPal.Me: Linkuri de plată PayPal cu nume de utilizator și sumă precompletată opțională. Destinatarii pot plăti prin soldul PayPal, carduri sau conturi bancare.',
        'Cash App: Linkuri de plată Cash App folosind $cashtag cu sumă opțională. Populară în Statele Unite pentru plăți peer-to-peer.',
      ],
    },
    {
      heading: 'Cod QR EMV generic',
      bullets: [
        'EMV Generic: Creați coduri QR EMV personalizate în modul prezentat de comerciant pentru scheme de plată care nu sunt enumerate în mod specific. Configurați numele comerciantului, orașul, codul țării (ISO 3166-1), codul monedei (numeric ISO 4217), MCC, opțiunile pentru bacșiș/taxă de confort și câmpuri de date suplimentare. Util pentru testare sau integrări personalizate.',
      ],
    },
    {
      heading: 'Moduri de amestecare suprapuse (profesionale)',
      paragraphs: ['Moduri de amestecare suplimentare la nivelul Profesional:'],
      bullets: [
        'Pixelatare: Efect de suprapunere pixelată.',
        'Contur: Suprapunerea detectării marginilor afișează doar contururile.',
        'Val: Efect de distorsiune ondulată.',
        'Dimensiune subpixel: Dimensiune variabilă a subpixelilor în funcție de imagine.',
        'True Dithering: Dithering avansat cu selecție ordonată a matricelor.',
        'Extrem: Vizibilitate maximă a imaginii, poate afecta scanabilitatea.',
      ],
    },
    {
      heading: 'Setări de protecție',
      paragraphs: [
        'Control detaliat asupra elementelor QR care sunt protejate de modificarea suprapunerii:',
      ],
      bullets: [
        'Păstrați sincronizarea: Păstrați modelele de sincronizare nemodificate.',
        'Păstrați alinierea: Păstrați modelele de aliniere nemodificate.',
        'Protect Format Information: Module de informații despre format Shield.',
        'Protejează informații despre versiune: Module de informații despre versiune Shield.',
      ],
    },
    {
      heading: 'Mod ECC-Aware',
      paragraphs: [
        'Distribuie inteligent intensitatea suprapunerii pe baza capacității de corectare a erorilor. Sistemul analizează ce module pot fi modificate, menținând în același timp scanabilitatea.',
      ],
      bullets: [
        'Buget de risc: Procentul de utilizare a capacității de corectare a erorilor (0-100%).',
        'Buget mai mare = suprapunere mai vizibilă, dar scanabilitate mai riscantă.',
        'Buget mai mic = scanare mai sigură, dar suprapunere mai puțin vizibilă.',
      ],
    },
    {
      heading: 'Opțiuni profesionale de randare',
      paragraphs: ['Controale avansate de randare:'],
      bullets: [
        'Margini clare: Folosește randarea imaginilor pixelate pentru margini clare ale modulelor.',
        'Aliniere pixeli: Aliniere pixeli podea, rotundă sau tavan.',
        'Mod de culoare per modul: Solid, După luminozitate, După poziție, După suprapunere, După cluster.',
        'Paletă de culori: Definiți o paletă de culori personalizată pentru colorarea per modul.',
        'Contrast Guard: Asigurați un raport minim de contrast între culori.',
        'Raport minim de contrast: cerință de contrast în stil WCAG (1:1 până la 21:1).',
        'Module de graniță suplimentare: Graniță suplimentară dincolo de zona liniștită.',
      ],
    },
    {
      heading: 'Opțiuni de ieșire profesionale',
      paragraphs: ['Setări de export pentru întreprindere:'],
      bullets: [
        'DPI: Setați rezoluția de imprimare (72-600 DPI). Se recomandă 300 DPI pentru imprimare.',
        'Includeți zona liniștită: Comutați zona liniștită în dimensiunile de ieșire.',
        'Exportare ca suplimentar: Generare PDF alături de formatul principal.',
      ],
    },
    {
      heading: 'Setări de animație (profesionale)',
      paragraphs: ['Funcții suplimentare de animație profesională:'],
      bullets: [
        'Dithering temporal: Dezactivat, Zgomot albastru sau Dithering per cadru sigur cu pâlpâire.',
        'Model: Niciunul, Puls, Undă, Linie de scanare, Strălucire sau Efecte de derivă.',
      ],
    },
    {
      heading: 'Referință API',
      paragraphs: [
        'ANQR oferă o API pe server pentru generarea de coduri QR prin parametri URL. Acest lucru este ideal pentru încorporarea codurilor QR în site-uri web, e-mailuri, documente sau fluxuri de lucru automate fără JavaScript pe client.',
        'URL de bază: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Parametri de bază',
      paragraphs: ['Parametri obligatorii și comuni (numele parametrilor nu sunt traduse):'],
      bullets: [
        'date (obligatorii): Conținutul de codificat în codul QR. Caractere speciale codificate pentru URL.',
        'size: Dimensiunea imaginii în pixeli (implicit: 400, max: 2000). Se utilizează dacă lățimea/înălțimea nu sunt specificate.',
        'l, h: Lățimea și înălțimea de ieșire în pixeli. Suprascrie parametrul de dimensiune.',
        'format: Format de ieșire — png, webp sau gif (implicit: png).',
        'ec: Nivel de corecție a erorilor — L, M, Q sau H (implicit: H).',
        'fg: Culoarea prim-planului în hexadecimal fără # (implicit: 000000).',
        'bg: Culoare de fundal în hexadecimal fără # (implicit: ffffff).',
        'transparent: Setați la 1 pentru fundal transparent.',
        'margine: Zonă liniștită în module (implicit: 4).',
      ],
    },
    {
      heading: 'Parametri de stilizare',
      paragraphs: ['Stilizarea modulelor și a modelelor:'],
      bullets: [
        'stil: Stil modul — pătrat, rotunjit, puncte, romb, conectat.',
        'căutător: Stilul modelului căutător — pătrat, rotunjit, cerc.',
        'align: Stilul modelului de aliniere — match_finder, pătrat, rotunjit, cerc.',
        'timing: Stilul modelului de sincronizare — match_module, solid, punctat.',
        'rază: Procentaj rază colț 0-100.',
        'gap: Procentajul decalajului modulului 0-50.',
        'gapMode: Mod spațiu — niciunul, inserare, contur, spațiu_negativ.',
        'eyeOuter, eyeInner: Stiluri de ochi — pătrat, rotunjit, cerc.',
        'eyeScale: Procentul scalei ochilor (implicit: 100).',
        'grad: Tip de gradient — niciunul, liniar, radial, conic.',
        'gradAngle: Unghiul gradientului pentru gradienții liniari.',
        'gradStops: Gradientul se oprește ca culoare1, poziție1, culoare2, poziție2,… (de exemplu, ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Parametri de suprapunere',
      paragraphs: [
        'Opțiuni de suprapunere a imaginii (imaginea suprapusă este preluată de pe server):',
      ],
      bullets: [
        'img: URL pentru suprapunerea imaginii (trebuie să fie accesibilă publicului).',
        'mod: Mod suprapunere — centru, semiton, amestec, luminozitate, mozaic, dithering, zgomot albastru, subpixel.',
        'intensitate: Intensitate suprapunere 0-100 (implicit: 100).',
        'colorMode: Mod de culoare suprapunere — culoare, tonuri de gri, alb-negru.',
        'potrivire: Cum se potrivește suprapunerea — acoperă, conține, se întinde.',
        'rot: Rotația suprapunerii în grade.',
        'flipX, flipY: Setați la 1 pentru a inversa suprapunerea.',
        'keepFinders: Păstrează modelele de căutare (implicit: 1).',
        'keepTiming, keepAlign: Setați la 1 pentru a păstra modelele de temporizare/aliniere.',
      ],
    },
    {
      heading: 'Parametri de preprocesare',
      paragraphs: ['Preprocesarea imaginii aplicată suprapunerii:'],
      bullets: [
        'luminozitate: Ajustare -100 până la 100 (implicit: 0).',
        'contrast: Ajustare -100 până la 100 (implicit: 0).',
        'gamma: Valoare 0,1 până la 3 (implicit: 1).',
        'saturație: Ajustare -100 până la 100 (implicit: 0).',
        'nuanță: Rotația nuanței în grade.',
        'estomac: Estompare în pixeli.',
        'ascuțire: Cantitate de ascuțire 0-100.',
        'posterizare: Posterizează nivelurile.',
        'prag: Prag binar 0-255.',
        'margine: Detectarea marginilor — dezactivată, ușor de înțeles, viclean.',
        'inversare: Setați la 1 pentru a inversa culorile.',
      ],
    },
    {
      heading: 'Parametri filigran',
      paragraphs: ['Adăugați filigrane la codurile QR generate:'],
      bullets: [
        'wmEn: Setați la 1 pentru a activa filigranul.',
        'wmKind: Tip de filigran — text, imagine, model.',
        'wmText: Text filigran (codificat URL).',
        'wmImg: URL către imaginea cu filigran.',
        'wmPos: Poziție — centru, colțuri, margini, în spate, zonă_liniștită.',
        'wmOpacitate: Opacitate 0-100 (implicit: 50).',
        'wmBlend: Mod de amestecare — normal, multiplicare, ecran, suprapunere.',
      ],
    },
    {
      heading: 'Parametri de animație',
      paragraphs: ['Pentru ieșirea GIF animată (necesită format=gif):'],
      bullets: [
        'animPattern: Model de animație — niciunul, puls, undă, linie de scanare, strălucire, derivă, ciclu_de_colorare.',
        'animFrames: Număr de cadre 1-60 (implicit: 24).',
        'animSpeed: Întârziere cadru în milisecunde 10-1000 (implicit: 100).',
        'animSeed: Sămânță aleatorie pentru animație.',
        'easing: Easing animație — liniară, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Parametri de ieșire',
      paragraphs: ['Opțiuni format de ieșire:'],
      bullets: [
        'calitate: calitate WebP 0-1 (implicit: 0,9).',
        'webpQ: Calitate WebP 0-100 (implicit: 90).',
        'gifColors: dimensiunea paletei GIF 2-256 (implicit: 256).',
        'dpi: DPI de ieșire pentru PNG (implicit: 72).',
        'metaTitlu, metaAuthor, metaCopie, metaDescriere: câmpuri de metadate PNG.',
      ],
    },
    {
      heading: 'Exemplu de utilizare',
      paragraphs: [
        'Cod QR de bază:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Cod QR stilizat cu culori personalizate:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'Cod QR cu imagine suprapusă:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'GIF animat:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Încorporarea codurilor QR',
      paragraphs: [
        'În modul Profesional, funcția Partajare generează HTML și URL-uri încorporabile. Iată cum funcționează încorporarea:',
      ],
      bullets: [
        'Partajare link: Creează o adresă URL către aplicația ANQR cu toate setările codificate ca parametri URL. Destinatarii pot vizualiza și modifica codul QR.',
        'Încorporează imaginea: Generează o etichetă care indică API-ul serverului. Codul QR este redat pe server și servit ca imagine.',
        'Embed Markdown: Creează sintaxa imaginilor Markdown pentru documentație și fișiere README.',
        'URL API direct: URL-ul API brut pentru utilizare în aplicații, scripturi sau alte integrări.',
      ],
    },
    {
      heading: 'Exemplu HTML',
      paragraphs: [
        'Pentru a încorpora un cod QR în site-ul dvs. web:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=Cod QR />',
        'Pentru dimensionare responsivă:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=Cod QR style=lățime maximă: 100%; înălțime: auto; />',
        'Serverul stochează în cache răspunsurile cu antete lungi, astfel încât solicitările repetate pentru aceeași adresă URL sunt rapide.',
      ],
    },
    {
      heading: 'Format URL de partajare',
      paragraphs: [
        'Când faceți clic pe Partajare în modul Profesional, ANQR codifică setările curente în parametri URL. Formatul este:',
        'https://anqr.link/?data=…&ec=H&style=rounded&…',
        'Acești parametri oglindesc parametrii API, astfel încât puteți converti o adresă URL de partajare într-o adresă URL API modificând calea de bază de la / la /api/qr și ajustând parametrii w/h după cum este necesar.',
        'Notă: Imaginile suprapuse încărcate din fișiere locale nu pot fi partajate prin URL — numai suprapunerile bazate pe URL (parametrul img) funcționează în linkurile partajate și apelurile API.',
      ],
    },
    {
      heading: 'Limite de rată și utilizare',
      paragraphs: [
        'API-ul este gratuit pentru volume rezonabile. Pentru utilizare în volum mare sau aplicații comerciale care necesită disponibilitate garantată, vă rugăm să ne contactați.',
        'Răspunsurile API includ antete de cache agresive. Pentru cele mai bune performanțe, memorați în cache răspunsurile la nivelul dvs. sau utilizați aceeași adresă URL în mod constant pentru coduri QR identice.',
      ],
    },
    {
      heading: 'Cele mai bune practici',
      paragraphs: ['Urmați aceste instrucțiuni pentru coduri QR fiabile:'],
      bullets: [
        'Testați întotdeauna codurile QR cu mai multe aplicații de scanare înainte de a le imprima.',
        'Utilizați Corecția erorilor H (Ridicată) la adăugarea de suprapuneri.',
        'Păstrați cel puțin 4 module de zonă liniștită (margine).',
        'Asigurați un contrast ridicat între prim-plan și fundal.',
        'Pentru imprimare, utilizați cel puțin 300 DPI și testați la dimensiunea reală a imprimării.',
        'Activează opțiunea Păstrarea modelelor Finder la utilizarea suprapunerilor.',
        'Începeți cu o intensitate mai mică a suprapunerii și creșteți treptat.',
        'Pentru utilizare în exterior, luați în considerare module mai mari și o corecție a erorilor mai mare.',
      ],
    },
    {
      heading: 'Depanare',
      paragraphs: ['Probleme comune și soluții:'],
      bullets: [
        'QR nu scanează: Reduceți intensitatea suprapunerii, creșteți corecția erorilor, verificați contrastul.',
        'Cod prea mare: Reduceți lungimea conținutului, utilizați un instrument de scurtare a URL-urilor, o versiune mai mică.',
        'Ieșire neclară: Măriți dimensiunea modulului, utilizați PNG în loc de formate comprimate.',
        'Culorile arată greșit: Verificați contrastul culorilor, încercați modul de suprapunere în tonuri de gri.',
        'GIF-ul nu se animează: Asigurați-vă că utilizați formatul de ieșire GIF, verificați numărul de cadre.',
        'Suprapunerea imaginii nu se încarcă: Verificați permisiunile CORS pentru imaginile la distanță.',
      ],
    },
    {
      heading: 'Comenzi rapide de la tastatură',
      paragraphs: [
        'ANQR acceptă comenzi rapide standard de la tastatură. Folosiți Ctrl/Cmd+S pentru a declanșa exportul (când este focalizat pe previzualizare).',
      ],
    },
    {
      heading: 'Partajare și integrare',
      paragraphs: [
        'În modul Profesional, faceți clic pe butonul Partajare pentru a copia o adresă URL cu setările curente. Destinatarii pot deschide această adresă URL pentru a vedea configurația exactă. Notă: Imaginile suprapuse din fișierele locale nu pot fi partajate prin URL.',
      ],
    },
  ],
};

export default guide;
