import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const privacy: PageDefinition = {
  title: 'Informativa sulla privacy',
  description:
    'Informazioni raccolte da ANQR, come vengono utilizzate e i tuoi diritti ai sensi delle leggi sulla privacy applicabili.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Riepilogo',
      paragraphs: [
        'ANQR è un generatore di codici QR con un approccio client-first. Non è necessario creare un account. Per impostazione predefinita, i codici QR vengono generati localmente nel browser: non abbiamo accesso al contenuto codificato.',
        "Per uso professionale, ANQR fornisce un'API lato server che genera codici QR a partire da parametri URL. Utilizzando l'API, il contenuto QR viene elaborato sui nostri server per riprodurre l'immagine, ma non viene memorizzato o registrato.",
        'Utilizziamo Google AdSense per la pubblicità e potremmo utilizzare servizi di analisi. Questi servizi raccolgono informazioni tramite cookie e tecnologie simili. Questa informativa spiega quali dati vengono raccolti, come vengono utilizzati e quali sono i tuoi diritti.',
      ],
    },
    {
      heading: 'Informazioni che raccogliamo',
      bullets: [
        "Informazioni fornite dall'utente: se ci contatti tramite e-mail o tramite il nostro modulo di contatto, raccogliamo il tuo nome, indirizzo e-mail e contenuto del messaggio.",
        'Informazioni raccolte automaticamente: il nostro fornitore di hosting (Netlify), i partner pubblicitari e i servizi di analisi possono raccogliere: indirizzo IP, tipo e versione del browser, sistema operativo, tipo di dispositivo, URL di riferimento, pagine visitate, tempo trascorso sul sito e posizione geografica approssimativa.',
        'Cookie di terze parti: i nostri partner pubblicitari (Google AdSense) utilizzano cookie e tecnologie simili per pubblicare e misurare gli annunci pubblicitari. ANQR stessa non imposta alcun cookie proprietario.',
      ],
    },
    {
      heading: 'Cookie e tecnologie di terze parti',
      paragraphs: [
        'ANQR non imposta cookie proprietari. Le tue preferenze (come la modalità scura) vengono memorizzate localmente sul tuo dispositivo e non vengono trasmesse ad alcun server.',
        'Tuttavia, i nostri partner pubblicitari (Google AdSense) e il provider di hosting potrebbero utilizzare cookie e tecnologie di tracciamento simili:',
      ],
      bullets: [
        'Cookie pubblicitari (di terze parti): impostati da Google AdSense e dai partner pubblicitari per pubblicare annunci pertinenti, misurare le prestazioni degli annunci e comprendere gli interessi degli utenti. Questi cookie possono tracciare la tua attività su diversi siti web.',
        'Cookie analitici (di terze parti): possono essere utilizzati dal nostro provider di hosting o dai servizi di analisi per raccogliere dati di utilizzo resi anonimi.',
      ],
    },
    {
      heading: 'Google AdSense e pubblicità',
      paragraphs: [
        'Mostriamo annunci pubblicitari tramite Google AdSense. Google e i suoi partner utilizzano i cookie per pubblicare annunci in base alla cronologia di navigazione su questo sito e su altri siti web (pubblicità basata sugli interessi).',
        'Scopri come Google utilizza le tue informazioni: https://policies.google.com/technologies/partner-sites',
        'Gestisci la personalizzazione degli annunci: https://adssettings.google.com',
        'Disattivazione tramite Network Advertising Initiative: https://optout.networkadvertising.org',
        'Disattivazione tramite Digital Advertising Alliance: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'Come utilizziamo le informazioni',
      bullets: [
        'Per rispondere alle vostre richieste e fornirvi supporto.',
        'Per visualizzare annunci pubblicitari pertinenti tramite i nostri partner pubblicitari.',
        "Per analizzare l'utilizzo del sito e migliorare i nostri servizi.",
        'Per rilevare, prevenire e affrontare frodi, abusi e problemi di sicurezza.',
        'Per ottemperare agli obblighi di legge.',
      ],
    },
    {
      heading: 'Servizi di terze parti',
      bullets: [
        'Google AdSense: riceve dati per pubblicare e misurare gli annunci pubblicitari.',
        'Fornitori di analisi: ricevere dati di utilizzo resi anonimi.',
        'Netlify (hosting): elabora le richieste e può registrare gli indirizzi IP.',
        'Non vendiamo le tue informazioni personali. Tuttavia, la condivisione dei dati con partner pubblicitari può essere considerata una vendita ai sensi del CCPA (vedi sotto).',
      ],
    },
    {
      heading: 'Conservazione dei dati',
      bullets: [
        'Invii di contatti: fino a 2 anni.',
        'Registri del server: fino a 30 giorni (provider di hosting).',
        'Dati analitici: fino a 26 mesi (resi anonimi).',
        'Cookie pubblicitari: in genere 13 mesi (varia a seconda del partner).',
      ],
    },
    {
      heading: 'I tuoi diritti ai sensi del GDPR (utenti SEE)',
      paragraphs: [
        'Se ti trovi nello Spazio economico europeo, hai i seguenti diritti ai sensi del Regolamento generale sulla protezione dei dati:',
      ],
      bullets: [
        'Diritto di accesso: richiedere una copia dei dati personali che conserviamo su di te.',
        'Diritto di rettifica: Richiedere la correzione di dati inesatti.',
        "Diritto alla cancellazione: Richiedere la cancellazione dei propri dati (diritto all'oblio).",
        'Diritto di limitazione del trattamento: Richiedi limitazioni al modo in cui utilizziamo i tuoi dati.',
        'Diritto alla portabilità dei dati: richiedere i propri dati in un formato portabile.',
        'Diritto di opposizione: opporsi al trattamento, anche per finalità di marketing diretto.',
        'Diritto di revocare il consenso: revocare il consenso in qualsiasi momento laddove il trattamento sia basato sul consenso.',
        "Diritto di proporre reclamo: presentare un reclamo all'autorità di protezione dei dati.",
      ],
    },
    {
      heading: 'Base giuridica del GDPR',
      paragraphs: [
        'Elaboriamo i dati in base a queste basi: (a) Consenso – per pubblicità personalizzata (gestita dai nostri partner pubblicitari); (b) Interessi legittimi – per analisi, sicurezza e miglioramento; (c) Contratto – per rispondere alle richieste.',
        'Per esercitare i tuoi diritti, contatta ${CONTACT_EMAIL}. Risponderemo entro 30 giorni.',
      ],
    },
    {
      heading: 'I tuoi diritti ai sensi del CCPA (utenti della California)',
      bullets: [
        'Diritto di sapere: richiedere informazioni sui dati raccolti, sulle fonti, sulle finalità e sulle terze parti.',
        'Diritto alla cancellazione: Richiedere la cancellazione dei propri dati personali.',
        'Diritto di opposizione: opporsi alla vendita di informazioni personali (la condivisione con partner pubblicitari potrebbe essere ammessa).',
        "Diritto alla non discriminazione: non discrimineremo per l'esercizio dei tuoi diritti.",
      ],
    },
    {
      heading: 'Categorie CCPA raccolte',
      paragraphs: [
        'Categorie: Identificatori (indirizzo IP, ID dispositivo), Attività Internet (navigazione, interazioni con gli annunci), Geolocalizzazione (approssimativa), Inferenze (interessi derivanti dalla navigazione).',
        'Per esercitare i diritti o rinunciare: ${CONTACT_EMAIL} o modificare le impostazioni dei cookie.',
      ],
    },
    {
      heading: 'Trasferimenti internazionali',
      paragraphs: [
        'Le tue informazioni potrebbero essere trasferite in Paesi con leggi sulla protezione dei dati diverse, inclusi gli Stati Uniti. Utilizziamo misure di sicurezza appropriate, come le Clausole Contrattuali Standard.',
      ],
    },
    {
      heading: 'La privacy dei minori',
      paragraphs: [
        'ANQR non è rivolto a minori di 13 anni (o 16 anni nello Spazio economico europeo). Non raccogliamo consapevolmente dati da minori. Contatta ${CONTACT_EMAIL} se ritieni che un minore abbia fornito informazioni.',
      ],
    },
    {
      heading: 'Sicurezza',
      paragraphs: [
        'Utilizziamo misure tecniche e organizzative adeguate per proteggere i dati, inclusa la crittografia HTTPS. Tuttavia, nessuna trasmissione via Internet è sicura al 100%.',
      ],
    },
    {
      heading: 'Non tracciare',
      paragraphs: [
        'Osserviamo i segnali del browser Do Not Track laddove possibile, anche se i partner pubblicitari potrebbero non rispondere a DNT.',
      ],
    },
    {
      heading: 'Modifiche alla presente politica',
      paragraphs: [
        'Potremmo aggiornare periodicamente la presente informativa. La data di Ultimo aggiornamento indica la revisione più recente. Eventuali modifiche significative potrebbero essere comunicate tramite un banner sul sito.',
      ],
    },
    {
      heading: 'Contattaci',
      paragraphs: [
        'Per domande sulla privacy o per esercitare i tuoi diritti: ${CONTACT_EMAIL} o utilizza la nostra pagina Contatti. Rispondiamo alle richieste sulla privacy entro 30 giorni.',
      ],
    },
  ],
};

export default privacy;
