import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Informazioni su ANQR',
  description:
    "ANQR è un generatore di codici QR gratuito con un approccio client-first: genera codici QR localmente o usa la nostra API per l'incorporamento.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "Che cos'è l'ANQR?",
      paragraphs: [
        'ANQR (pronunciato anchor) è un generatore di codici QR gratuito che crea codici scansionabili per URL, testo, credenziali Wi-Fi, schede di contatto, eventi del calendario e altro ancora.',
        "È pensato per privati, piccole imprese, professionisti del marketing e sviluppatori che desiderano potenti strumenti QR senza dover registrarsi. Il design client-first prevede che i codici QR vengano generati localmente nel browser per impostazione predefinita, con un'API server opzionale per l'integrazione e l'incorporamento professionale.",
      ],
    },
    {
      heading: 'Caratteristiche principali',
      bullets: [
        "Genera codici QR all'istante nel tuo browser, senza bisogno di un account.",
        'Personalizza colori, stili di moduli, modelli di ricerca e aggiungi sovrapposizioni di immagini.',
        'Esporta in più formati: PNG, SVG, WebP e GIF animate.',
        'Controlli avanzati per il livello di correzione degli errori, la versione QR, la modalità di codifica e la selezione della maschera.',
        'Guida alla sicurezza della scansione e anteprima in tempo reale per aiutare a mantenere i codici leggibili in stampa e sugli schermi.',
        "API lato server per l'incorporamento professionale con supporto completo dei parametri.",
        "Funziona offline una volta caricata: è un'app web statica che puoi eseguire ovunque.",
      ],
    },
    {
      heading: 'Come funziona ANQR',
      paragraphs: [
        'ANQR viene eseguito nel tuo browser e codifica il tuo input in una matrice QR standard con correzione degli errori Reed-Solomon, quindi lo restituisce nel formato che scegli.',
        "Per impostazione predefinita, la generazione avviene localmente nel browser. Per uso professionale, è anche possibile utilizzare l'API lato server per generare codici QR tramite parametri URL, ideale per l'incorporamento in siti web, e-mail o flussi di lavoro automatizzati.",
        "Quando si aggiungono sovrapposizioni o animazioni, ANQR bilancia lo stile con l'affidabilità della scansione, in modo che il risultato rimanga scansionabile.",
        "ANQR si concentra sui codici statici (i dati sono all'interno del QR). Se hai bisogno di un codice dinamico (destinazione modificabile), puoi codificare il tuo URL di reindirizzamento o link breve.",
      ],
    },
    {
      heading: "Chi gestisce l'ANQR?",
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'La pubblicità e come restiamo liberi',
      paragraphs: [
        'ANQR è gratuito e supportato dalla pubblicità. Potremmo mostrare annunci tramite Google AdSense e/o altri partner pubblicitari.',
        'I fornitori di annunci pubblicitari possono utilizzare cookie o tecnologie simili per personalizzare gli annunci in base ai tuoi interessi e alla tua attività di navigazione. Puoi gestire le preferenze relative agli annunci nelle impostazioni del tuo dispositivo e tramite le impostazioni degli annunci di Google, e saperne di più consultando la nostra Informativa sulla privacy.',
        'Non vendiamo i contenuti che codifichi nei codici QR. Gli annunci pubblicitari contribuiscono a coprire i costi di gestione e miglioramento del progetto.',
      ],
    },
    {
      heading: 'Standard aperti',
      paragraphs: [
        "ANQR genera codici QR basati sullo standard ISO/IEC 18004 e mira a un'ampia compatibilità tra scanner, fotocamere e flussi di lavoro di stampa.",
      ],
    },
    {
      heading: 'Avviso sui marchi',
      paragraphs: [
        'QR Code® è un marchio registrato di DENSO WAVE INCORPORATED. ANQR non è affiliato, approvato o sponsorizzato da DENSO WAVE INCORPORATED.',
      ],
    },
    {
      heading: 'Feedback e contributi',
      paragraphs: [
        'Accogliamo volentieri feedback, segnalazioni di bug e suggerimenti sulle funzionalità. Contattateci via email o tramite la pagina dei contatti: leggiamo ogni messaggio, anche se i tempi di risposta possono variare.',
      ],
    },
  ],
};

export default about;
