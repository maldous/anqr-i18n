import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Politica de confidențialitate',
  description:
    'Informațiile colectate de ANQR, modul în care sunt utilizate și drepturile dumneavoastră în temeiul legilor aplicabile privind confidențialitatea.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Rezumat',
      paragraphs: [
        'ANQR este un generator de coduri QR cu o abordare axată pe client. Nu vă solicităm să creați un cont. În mod implicit, codurile QR sunt generate local în browserul dvs. — nu avem acces la conținutul pe care îl codificați.',
        'Pentru uz profesional, ANQR oferă o API pe server care generează coduri QR din parametri URL. Când utilizați API-ul, conținutul QR este procesat pe serverele noastre pentru a reda imaginea, dar nu este stocat sau înregistrat.',
        'Utilizăm Google AdSense pentru publicitate și este posibil să folosim servicii de analiză. Aceste servicii colectează informații prin intermediul cookie-urilor și al tehnologiilor similare. Această politică explică ce date sunt colectate, cum sunt utilizate și drepturile dumneavoastră.',
      ],
    },
    {
      heading: 'Informațiile pe care le colectăm',
      bullets: [
        'Informațiile pe care le furnizați: Dacă ne contactați prin e-mail sau prin formularul nostru de contact, colectăm numele, adresa de e-mail și conținutul mesajului dumneavoastră.',
        'Informații colectate automat: Furnizorul nostru de găzduire (Netlify), partenerii de publicitate și serviciile de analiză pot colecta: adresa IP, tipul și versiunea browserului, sistemul de operare, tipul dispozitivului, adresa URL de referință, paginile vizitate, timpul petrecut pe site și locația geografică aproximativă.',
        'Cookie-uri terțe: Partenerii noștri de publicitate (Google AdSense) utilizează cookie-uri și tehnologii similare pentru a difuza și măsura reclame. ANQR în sine nu setează cookie-uri proprii.',
      ],
    },
    {
      heading: 'Cookie-uri și tehnologii terțe',
      paragraphs: [
        'ANQR nu setează cookie-uri proprii. Preferințele dvs. (cum ar fi modul întunecat) sunt stocate local pe dispozitivul dvs., care nu sunt transmise către niciun server.',
        'Cu toate acestea, partenerii noștri de publicitate (Google AdSense) și furnizorul de găzduire pot utiliza cookie-uri și tehnologii de urmărire similare:',
      ],
      bullets: [
        'Cookie-uri publicitare (terțe): Setate de Google AdSense și partenerii de publicitate pentru a difuza anunțuri relevante, a măsura performanța anunțurilor și a înțelege interesele utilizatorilor. Aceste cookie-uri pot urmări activitatea dvs. pe diferite site-uri web.',
        'Cookie-uri analitice (terțe): Pot fi utilizate de furnizorul nostru de găzduire sau de serviciile de analiză pentru a colecta date de utilizare anonimizate.',
      ],
    },
    {
      heading: 'Google AdSense și publicitatea',
      paragraphs: [
        'Afișăm reclame prin Google AdSense. Google și partenerii săi utilizează module cookie pentru a difuza reclame pe baza istoricului dvs. de navigare pe acest site și pe alte site-uri web (publicitate bazată pe interese).',
        'Aflați cum utilizează Google informațiile dvs.: https://policies.google.com/technologies/partner-sites',
        'Gestionați personalizarea anunțurilor: https://adssettings.google.com',
        'Renunțați prin intermediul Inițiativei de publicitate în rețea: https://optout.networkadvertising.org',
        'Renunțați prin intermediul Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Cum utilizăm informațiile',
      bullets: [
        'Pentru a răspunde la solicitările dumneavoastră și a vă oferi asistență.',
        'Pentru a afișa reclame relevante prin intermediul partenerilor noștri de publicitate.',
        'Pentru a analiza utilizarea site-ului și a îmbunătăți serviciile noastre.',
        'Pentru a detecta, preveni și aborda frauda, abuzul și problemele de securitate.',
        'Pentru respectarea obligațiilor legale.',
      ],
    },
    {
      heading: 'Servicii ale unor terți',
      bullets: [
        'Google AdSense: Primește date pentru a difuza și măsura reclame.',
        'Furnizori de analiză: Primesc date de utilizare anonimizate.',
        'Netlify (găzduire): Procesează cererile și poate înregistra adresele IP.',
        'Nu vindem informațiile dumneavoastră personale. Cu toate acestea, partajarea datelor cu partenerii de publicitate poate fi considerată o «vânzare» în temeiul CCPA (vezi mai jos).',
      ],
    },
    {
      heading: 'Păstrarea datelor',
      bullets: [
        'Trimiteri de contacte: Până la 2 ani.',
        'Jurnale server: Până la 30 de zile (furnizor de găzduire).',
        'Date analitice: Până la 26 de luni (anonimizate).',
        'Cookie-uri publicitare: De obicei 13 luni (variază în funcție de partener).',
      ],
    },
    {
      heading: 'Drepturile dumneavoastră în temeiul GDPR (utilizatori SEE)',
      paragraphs: [
        'Dacă vă aflați în Spațiul Economic European, aveți următoarele drepturi în temeiul Regulamentului general privind protecția datelor:',
      ],
      bullets: [
        'Dreptul de acces: Solicitați o copie a datelor cu caracter personal pe care le deținem despre dumneavoastră.',
        'Dreptul la rectificare: Solicitarea corectării datelor inexacte.',
        'Dreptul la ștergere: Solicitați ștergerea datelor dumneavoastră (dreptul de a fi uitat).',
        'Dreptul la restricționarea prelucrării: Solicitați limite privind modul în care utilizăm datele dumneavoastră.',
        'Dreptul la portabilitatea datelor: Solicitați datele dumneavoastră într-un format portabil.',
        'Dreptul de opoziție: Opuneți-vă prelucrării, inclusiv în scopuri de marketing direct.',
        'Dreptul de a retrage consimțământul: Retrageți consimțământul în orice moment în cazul în care prelucrarea se bazează pe consimțământ.',
        'Dreptul de a depune o plângere: Depuneți o plângere la autoritatea dumneavoastră pentru protecția datelor.',
      ],
    },
    {
      heading: 'Temeiul juridic GDPR',
      paragraphs: [
        'Prelucrăm datele pe următoarele baze: (a) Consimțământ — pentru publicitate personalizată (gestionată de partenerii noștri de publicitate); (b) Interese legitime — pentru analiză, securitate și îmbunătățire; (c) Contract — pentru a răspunde la solicitări.',
        'Pentru a vă exercita drepturile, contactați ${CONTACT_EMAIL}. Vă vom răspunde în termen de 30 de zile.',
      ],
    },
    {
      heading: 'Drepturile dumneavoastră în temeiul CCPA (utilizatori din California)',
      bullets: [
        'Dreptul de a cunoaște: Solicitați informații despre datele colectate, surse, scopuri și terțe părți.',
        'Dreptul la ștergere: Solicitați ștergerea informațiilor dumneavoastră personale.',
        'Dreptul de a renunța: Renunțați la «vânzarea» informațiilor personale (partajarea cu partenerii publicitari poate fi eligibilă).',
        'Dreptul la nediscriminare: Nu vom discrimina pentru exercitarea drepturilor dumneavoastră.',
      ],
    },
    {
      heading: 'Categorii CCPA colectate',
      paragraphs: [
        'Categorii: Identificatori (adresă IP, ID dispozitiv), Activitate pe internet (navigare, interacțiuni cu reclame), Geolocație (aproximativă), Inferențe (interese din navigare).',
        'Pentru a vă exercita drepturile sau a renunța: ${CONTACT_EMAIL} sau ajustați setările cookie-urilor.',
      ],
    },
    {
      heading: 'Transferuri internaționale',
      paragraphs: [
        'Informațiile dumneavoastră pot fi transferate către țări cu legi diferite privind protecția datelor, inclusiv Statele Unite. Folosim garanții adecvate, cum ar fi clauzele contractuale standard.',
      ],
    },
    {
      heading: 'Confidențialitatea copiilor',
      paragraphs: [
        'ANQR nu se adresează copiilor sub 13 ani (sau 16 ani în SEE). Nu colectăm în mod conștient date de la copii. Contactați ${CONTACT_EMAIL} dacă considerați că un copil a furnizat informații.',
      ],
    },
    {
      heading: 'Securitate',
      paragraphs: [
        'Utilizăm măsuri tehnice și organizatorice adecvate pentru a proteja datele, inclusiv criptarea HTTPS. Cu toate acestea, nicio transmisie pe internet nu este 100% sigură.',
      ],
    },
    {
      heading: 'Nu urmăriți',
      paragraphs: [
        'Respectăm semnalele browserului Do Not Track acolo unde este posibil, deși partenerii de publicitate ar putea să nu răspundă la DNT.',
      ],
    },
    {
      heading: 'Modificări ale acestei politici',
      paragraphs: [
        'Este posibil să actualizăm periodic această politică. Data «Ultima actualizare» indică cea mai recentă revizuire. Modificările semnificative pot fi comunicate prin intermediul unui banner al site-ului.',
      ],
    },
    {
      heading: 'Contactați-ne',
      paragraphs: [
        'Pentru întrebări legate de confidențialitate sau pentru a vă exercita drepturile: ${CONTACT_EMAIL} sau utilizați pagina noastră de Contact. Răspundem solicitărilor de confidențialitate în termen de 30 de zile.',
      ],
    },
  ],
};

export default privacy;
