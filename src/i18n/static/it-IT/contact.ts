import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const contact: PageDefinition = {
  title: 'Contattaci',
  description:
    'Accogliamo volentieri feedback, segnalazioni di bug, richieste di funzionalità e domande di carattere generale.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Come raggiungerci',
      paragraphs: [
        'Offriamo diversi modi per contattarci, a seconda delle vostre esigenze. Leggiamo ogni messaggio, anche se i tempi di risposta possono variare in base al volume e al tipo di richiesta.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        'Per qualsiasi richiesta: ${CONTACT_EMAIL}',
        'Questo è il modo più affidabile per contattarci ed è consigliato per domande dettagliate, richieste commerciali o qualsiasi altra richiesta.',
      ],
    },
    {
      heading: 'Tipi di richieste',
      bullets: [
        'Domande generali: domande su come utilizzare ANQR, spiegazioni delle funzionalità o feedback generale.',
        'Segnalazioni di bug: includi il tuo browser, il sistema operativo, i passaggi per riprodurli e tutti i messaggi di errore che vedi.',
        "Richieste di funzionalità: suggerimenti per nuove funzionalità o miglioramenti. Valutiamo tutte le richieste, anche se non possiamo garantirne l'implementazione.",
        'Richieste commerciali: opportunità di partnership, domande sulle licenze o richieste di utilizzo commerciale.',
        'Richieste sulla privacy: richieste di esercitare i tuoi diritti sulla privacy ai sensi del GDPR, del CCPA o di altre leggi sulla privacy (vedi Informativa sulla privacy).',
        'DMCA/Copyright: vedere la sezione DMCA qui sotto per i requisiti di notifica di rimozione.',
      ],
    },
    {
      heading: 'Tempi di risposta',
      paragraphs: [
        'Il nostro obiettivo è rispondere alle richieste entro 5-7 giorni lavorativi. Le richieste relative alla privacy saranno gestite entro 30 giorni, come previsto dalla legge.',
        "Durante i periodi di maggiore affluenza, i tempi di risposta potrebbero essere più lunghi. Per questioni urgenti, si prega di indicare URGENTE nell'oggetto.",
      ],
    },
    {
      heading: 'Prima di contattarci',
      paragraphs: [
        "Consulta la nostra pagina Documentazione per le risposte alle domande più comuni sull'utilizzo delle funzionalità ANQR. Qui troverai risposte a molte domande sulla generazione di codici QR, sullo stile e sulle opzioni di esportazione.",
      ],
    },
    {
      heading: 'Avvisi di copyright DMCA',
      paragraphs: [
        'Se ritieni che i contenuti disponibili su ANQR violino il tuo copyright, puoi inviare una notifica di rimozione ai sensi del Digital Millennium Copyright Act (DMCA). Per essere valida, la notifica deve includere:',
      ],
      bullets: [
        'Una firma fisica o elettronica del titolare del copyright o di un agente autorizzato.',
        "Identificazione dell'opera protetta da copyright che si ritiene sia stata violata.",
        "Identificazione del materiale che si ritiene violi il diritto d'autore, con informazioni sufficienti per localizzarlo.",
        'I tuoi dati di contatto (indirizzo, numero di telefono e indirizzo email).',
        "Una dichiarazione in cui si afferma di ritenere in buona fede che l'uso del materiale non è autorizzato dal titolare del copyright.",
        'Una dichiarazione, sotto pena di spergiuro, che le informazioni contenute nella tua notifica sono accurate e che sei il titolare del copyright o sei autorizzato ad agire per suo conto.',
      ],
    },
    {
      heading: 'Contatto DMCA',
      paragraphs: [
        'Inviare le notifiche DMCA a: ${CONTACT_EMAIL}',
        "Si prega di includere Avviso DMCA nell'oggetto. Risponderemo alle notifiche valide in conformità con la legge applicabile. Si prega di notare che ANQR genera codici QR localmente sui dispositivi degli utenti e non ospita contenuti generati dagli utenti.",
      ],
    },
  ],
};

export default contact;
