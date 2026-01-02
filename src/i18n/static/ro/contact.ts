import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Contactați-ne',
  description:
    'Așteptăm cu nerăbdare feedback, raportări de erori, solicitări de funcții și întrebări generale.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Cum ne puteți contacta',
      paragraphs: [
        'Vă oferim mai multe modalități de a ne contacta, în funcție de nevoile dumneavoastră. Citim fiecare mesaj, deși timpii de răspuns pot varia în funcție de volum și de tipul solicitării.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        'Pentru orice întrebări: ${CONTACT_EMAIL}',
        'Aceasta este cea mai fiabilă modalitate de a ne contacta și este recomandată pentru întrebări detaliate, solicitări de afaceri sau orice alte nelămuriri.',
      ],
    },
    {
      heading: 'Tipuri de solicitări',
      bullets: [
        'Întrebări generale: Întrebări despre cum se utilizează ANQR, explicații ale funcțiilor sau feedback general.',
        'Rapoarte de erori: Vă rugăm să includeți browserul, sistemul de operare, pașii pentru reproducere și orice mesaje de eroare pe care le vedeți.',
        'Cereri de funcționalități: Sugestii pentru funcționalități noi sau îmbunătățiri. Luăm în considerare toate cererile, deși nu putem promite implementarea.',
        'Solicitări de afaceri: Oportunități de parteneriat, întrebări privind licențierea sau solicitări privind utilizarea comercială.',
        'Solicitări de confidențialitate: Solicitări de exercitare a drepturilor dumneavoastră la confidențialitate în temeiul GDPR, CCPA sau al altor legi privind confidențialitatea (consultați Politica de confidențialitate).',
        'DMCA/Drepturi de autor: Consultați secțiunea DMCA de mai jos pentru cerințele privind notificarea de eliminare.',
      ],
    },
    {
      heading: 'Timpi de răspuns',
      paragraphs: [
        'Ne propunem să răspundem solicitărilor în termen de 5-7 zile lucrătoare. Solicitările legate de confidențialitate vor fi soluționate în termen de 30 de zile, conform legii.',
        'În perioadele aglomerate, timpii de răspuns pot fi mai lungi. Pentru probleme urgente, vă rugăm să indicați URGENT în subiectul mesajului.',
      ],
    },
    {
      heading: 'Înainte de a ne contacta',
      paragraphs: [
        'Vă rugăm să consultați pagina noastră de Documentație pentru răspunsuri la întrebări frecvente despre cum se utilizează funcțiile ANQR. Multe întrebări despre generarea, stilizarea și opțiunile de exportare a codurilor QR sunt acoperite acolo.',
      ],
    },
    {
      heading: 'Notificări privind drepturile de autor DMCA',
      paragraphs: [
        'Dacă considerați că un conținut disponibil pe ANQR vă încalcă drepturile de autor, puteți trimite o notificare de eliminare în conformitate cu Legea privind drepturile de autor în era digitală (DMCA). Pentru a fi valabilă, notificarea dumneavoastră trebuie să includă:',
      ],
      bullets: [
        'O semnătură fizică sau electronică a titularului drepturilor de autor sau a agentului autorizat.',
        'Identificarea operei protejate prin drepturi de autor despre care se pretinde că a fost încălcată.',
        'Identificarea materialului despre care se pretinde că încalcă drepturile de autor, cu informații suficiente pentru a-l localiza.',
        'Informațiile dumneavoastră de contact (adresă, număr de telefon și adresă de e-mail).',
        'O declarație prin care susțineți cu bună-credință că utilizarea materialului nu este autorizată de deținătorul drepturilor de autor.',
        'O declarație, sub sancțiunea pedepsei pentru mărturie mincinoasă, care atestă că informațiile din notificarea dumneavoastră sunt corecte și că sunteți titularul drepturilor de autor sau sunteți autorizat să acționați în numele său.',
      ],
    },
    {
      heading: 'Contact DMCA',
      paragraphs: [
        'Trimiteți notificări DMCA către: ${CONTACT_EMAIL}',
        'Vă rugăm să includeți «Notificare DMCA» în subiectul mesajului. Vom răspunde notificărilor valide în conformitate cu legislația aplicabilă. Rețineți că ANQR generează coduri QR local pe dispozitivele utilizatorilor și nu găzduiește conținut generat de utilizatori.',
      ],
    },
  ],
};

export default contact;
