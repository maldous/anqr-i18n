import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const guide: PageDefinition = {
  title: "Guida per l'utente ANQR",
  description: "Guida completa all'utilizzo di ANQR per la creazione di codici QR.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Per iniziare',
      paragraphs: [
        "ANQR è un generatore di codici QR con un approccio client-first. Per impostazione predefinita, i codici QR vengono generati localmente nel browser: non è necessario un account e i dati rimangono privati. Per l'integrazione professionale, è anche possibile utilizzare l'API lato server.",
        "L'interfaccia ha tre livelli: Base, Avanzato e Professionale. Seleziona il tuo livello utilizzando le schede nell'intestazione. Ogni livello sblocca funzionalità aggiuntive, mantenendo l'interfaccia focalizzata su ciò di cui hai bisogno.",
      ],
      bullets: [
        'Base: creazione semplice di un codice QR con contenuto di testo/URL normale e sovrapposizione di immagini.',
        'Avanzate: opzioni di codifica QR, stili di rendering, animazione, formati di output, tipi di contenuto estesi e personalizzazione della sovrapposizione.',
        'Professionale: filigrane, metadati, condivisione, analisi della sicurezza, codici QR per i pagamenti e funzionalità aziendali.',
      ],
    },
    {
      heading: 'Avvio rapido',
      paragraphs: ['Per creare il tuo primo codice QR:'],
      bullets: [
        '1. Selezionare un tipo di contenuto (URL, testo, Wi-Fi, ecc.) dal menu a discesa Tipo di contenuto.',
        '2. Inserisci i tuoi dati nei campi forniti.',
        "3. Facoltativamente, personalizza colori, stili e aggiungi un'immagine sovrapposta.",
        '4. Fai clic su Esporta per scaricare il tuo codice QR come PNG, GIF, WebP o SVG.',
      ],
    },
    {
      heading: 'Caratteristiche di base',
      paragraphs: [
        "Il livello Base offre un'interfaccia semplificata per la creazione di codici QR con contenuti di payload e sovrapposizioni di immagini. Questo è il modo più semplice per iniziare.",
      ],
    },
    {
      heading: 'Tipi di contenuto (base)',
      paragraphs: [
        'Testo normale: codifica qualsiasi testo fino al limite di capacità del codice QR. Ideale per messaggi brevi, codici o identificatori.',
        "URL: codifica gli indirizzi web. Il codice QR aprirà l'URL una volta scansionato. Supporta i protocolli http:// e https://.",
      ],
    },
    {
      heading: 'Sovrapposizione immagine (base)',
      paragraphs: [
        "Carica un'immagine (JPG, PNG, GIF, WebP) da integrare nel tuo codice QR. Le funzionalità di base della sovrapposizione includono:",
      ],
      bullets: [
        "Carica da file: seleziona un'immagine dal tuo dispositivo.",
        'Carica da URL: inserisci un URL immagine (deve consentire CORS).',
        "Logo centrale: posiziona l'immagine al centro, basandosi sulla correzione degli errori.",
        "Blend: semplice fusione alfa dell'immagine con pattern QR.",
        "Intensità: controlla l'intensità con cui la sovrapposizione influisce sul codice QR (0-100%).",
        'Modalità colore: Colore pieno, Scala di grigi o Bianco e nero.',
        'Mantieni i modelli del Finder: mantiene i modelli degli angoli non modificati per una scansione affidabile.',
      ],
    },
    {
      heading: 'Funzionalità avanzate',
      paragraphs: [
        'Il livello Avanzato sblocca opzioni di codifica QR, stili di rendering, animazioni, formati di output, tipi di contenuto estesi e personalizzazione avanzata della sovrapposizione.',
      ],
    },
    {
      heading: 'Impostazioni di codifica QR',
      paragraphs: [
        'Versione: i codici QR sono disponibili nelle versioni da 1 a 40, con le versioni superiori che contengono più dati ma sono più grandi. Imposta su 0 (Auto) per consentire ad ANQR di scegliere la versione più piccola adatta al tuo contenuto.',
        'Correzione errori: determina quanto danno può subire un codice QR pur rimanendo scansionabile.',
      ],
      bullets: [
        'L (Basso): correzione degli errori del 7% - dimensione minima, minima ridondanza.',
        "M (Medio): correzione dell'errore del 15% - opzione bilanciata.",
        'Q (Quartile): correzione degli errori del 25% - buona per i codici stampati.',
        'H (Alto): correzione degli errori del 30%, ideale per codici con sovrapposizioni o in condizioni difficili.',
      ],
    },
    {
      heading: 'Zona tranquilla (margine)',
      paragraphs: [
        'La zona silenziosa è lo spazio bianco attorno al codice QR. Gli scanner hanno bisogno di questo margine per rilevare dove inizia il codice. Lo standard raccomanda almeno 4 moduli. Ridurre il numero di moduli al di sotto di 4 potrebbe causare problemi di scansione.',
      ],
    },
    {
      heading: 'Stile del modulo',
      paragraphs: [
        'I moduli sono i singoli quadrati che compongono un codice QR. ANQR offre cinque stili:',
      ],
      bullets: [
        'Quadrato: aspetto classico del QR con angoli acuti.',
        'Arrotondato: angoli smussati per un aspetto più amichevole.',
        "Dots: Moduli circolari per un'estetica moderna.",
        'Rosa: quadrati ruotati di 45° per un motivo distintivo.',
        'Connesso: i moduli si fondono quando sono adiacenti, creando forme organiche.',
      ],
    },
    {
      heading: 'Stile del modello del cercatore',
      paragraphs: [
        'I pattern di ricerca sono i tre grandi quadrati negli angoli dei codici QR che aiutano gli scanner a orientare il codice. Stili disponibili:',
      ],
      bullets: [
        'Quadrato: angoli quadrati standard.',
        'Arrotondato: angoli smussati che si abbinano allo stile del modulo arrotondato.',
        'Cerchio: Modelli di ricerca circolari per codici a punti.',
      ],
    },
    {
      heading: 'Allineamento e modelli di temporizzazione',
      paragraphs: [
        'I modelli di allineamento appaiono nei codici QR più grandi (versione 2+) per aiutare a correggere la distorsione. I modelli di sincronizzazione sono le linee alternate che collegano i modelli di ricerca.',
      ],
      bullets: [
        'Stile di allineamento: Trova corrispondenza, Quadrato, Arrotondato o Cerchio.',
        'Stile di temporizzazione: modulo di corrispondenza, continuo o tratteggiato.',
      ],
    },
    {
      heading: 'Colori',
      paragraphs: [
        'Primo piano: il colore dei moduli QR. Il nero (#000000) è lo standard, ma va bene qualsiasi colore scuro.',
        'Sfondo: il colore di sfondo. Il bianco (#ffffff) è lo standard. Assicurare un contrasto sufficiente con il primo piano.',
        "Sfondo trasparente: rimuovere completamente lo sfondo per l'utilizzo su superfici colorate. Assicurarsi che la superficie fornisca un contrasto adeguato.",
      ],
    },
    {
      heading: 'Dimensioni e spazio del modulo',
      paragraphs: [
        'Dimensione modulo: controlla la dimensione in pixel di ciascun modulo. Valori più grandi creano codici più grandi e facili da scansionare.',
        "Spazio tra i moduli: aggiunge spazio tra i moduli in percentuale. Piccoli spazi (5-15%) possono migliorare la scansionabilità in alcune condizioni, ma spazi eccessivi riducono l'affidabilità.",
      ],
    },
    {
      heading: 'Impostazioni di uscita',
      paragraphs: ["Formato: scegli il formato di esportazione in base al caso d'uso."],
      bullets: [
        'PNG: formato raster senza perdita di dati, ideale per la maggior parte degli usi. Ideale per la stampa e il digitale.',
        "WebP: formato moderno con dimensioni di file ridotte. Ottimo per l'uso sul web.",
        'GIF: obbligatorio per i codici QR animati. Supporta la trasparenza.',
        "SVG: formato vettoriale che si ridimensiona all'infinito. Ideale per caratteri di grandi dimensioni o quando è necessario modificare il codice.",
      ],
    },
    {
      heading: 'Dimensioni di uscita',
      paragraphs: [
        'Larghezza/Altezza: imposta la dimensione di output in pixel. Per la stampa, calcola in base ai DPI (ad esempio, 300 DPI a 1 pollice = 300 px). Le dimensioni maggiori garantiscono una scansione più affidabile a distanza.',
      ],
    },
    {
      heading: 'Impostazioni di animazione (avanzate)',
      paragraphs: ['Controlla il comportamento del codice QR animato:'],
      bullets: [
        "Velocità: frequenza dei fotogrammi dell'animazione in millisecondi.",
        'Loop: animazione continua o a riproduzione singola.',
        "Bounce: Direzione dell'animazione del ping-pong.",
        "Inizia fotogramma: inizia l'animazione da un fotogramma specifico.",
        "Numero massimo di fotogrammi: limita il numero totale di fotogrammi nell'animazione.",
        "Frame Step: salta i frame per un'animazione più veloce.",
        'Interpolazione: Nessuna, Dissolvenza incrociata o Morph tra i fotogrammi.',
      ],
    },
    {
      heading: 'Tipi di contenuto (avanzato)',
      paragraphs: ['Il livello avanzato sblocca formati di carico aggiuntivi:'],
      bullets: [
        'Numero di telefono (tel:): crea un collegamento telefonico chiamabile.',
        'Email (mailto:): apre il client di posta elettronica con oggetto e corpo facoltativi.',
        'SMS: messaggio di testo precompilato a un numero di telefono.',
        'vCard: Scheda contatto completa con nome, organizzazione, telefono, email, indirizzo.',
        'MeCard: formato di contatto compatto popolare in Giappone.',
        'BizCard: formato di biglietto da visita tradizionale.',
        'Geolocalizzazione: coordinate GPS che si aprono nelle mappe.',
        'WiFi: Credenziali di rete per la connessione automatica (SSID, password, tipo di sicurezza).',
        'Evento del calendario: formato iCalendar con titolo, luogo, data/ora.',
        "RSVP evento: collegamento alla pagina di registrazione all'evento.",
        'Iscrizione al calendario: iscriviti a un feed ICS/WebCal.',
        'URL file/documento: collegamento diretto ai file scaricabili.',
        'Collegamento allo storage cloud: collegamenti a Google Drive, Dropbox, OneDrive, ecc.',
        'Profilo social: link a LinkedIn, Twitter, Instagram, ecc.',
        'Link di messaggistica: deep link di WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'Funzionalità di sovrapposizione avanzate',
      paragraphs: ['Ulteriori capacità di sovrapposizione:'],
      bullets: [
        "Ritaglia: abilita il ritaglio per selezionare una regione quadrata dell'immagine.",
        "Mezzitoni: modello di punti in stile stampa classico basato sulla luminosità dell'immagine.",
        'Dithered: dithering a diffusione di errore per una riproduzione dettagliata.',
      ],
    },
    {
      heading: 'Modalità di fusione sovrapposizione (avanzate)',
      paragraphs: ['Ulteriori modalità di fusione nel livello avanzato:'],
      bullets: [
        'Subpixel: divide ogni modulo in subpixel per ottenere maggiori dettagli.',
        'Rumore blu: utilizza il dithering del rumore blu per modelli privi di artefatti.',
        "Mosaico: effetto basato su tessere che preserva la struttura dell'immagine.",
        "Riempimento spazi vuoti: posiziona l'immagine negli spazi vuoti tra i moduli.",
        "Luminosità: varia la dimensione del modulo in base alla luminosità dell'immagine.",
        "Duotone: mappa l'immagine su due colori per un contrasto sorprendente.",
      ],
    },
    {
      heading: 'Intensità di sovrapposizione',
      paragraphs: [
        "Controlla l'intensità dell'effetto della sovrapposizione sul codice QR (0-100%). Valori più alti mostrano maggiori dettagli dell'immagine, ma potrebbero ridurne la leggibilità. Iniziare intorno al 70% e regolare in base ai test.",
      ],
    },
    {
      heading: 'Modalità colore',
      paragraphs: ["Come viene elaborata l'immagine sovrapposta:"],
      bullets: [
        "Colore pieno: conserva i colori originali dell'immagine.",
        'Scala di grigi: converte in toni di bianco e nero.',
        'Bianco e nero: conversione binaria ad alto contrasto.',
      ],
    },
    {
      heading: 'Conserva i modelli del Finder',
      paragraphs: [
        'Se abilitato, mantiene i tre modelli di rilevamento degli angoli non modificati dalla sovrapposizione. Fortemente consigliato per una scansione affidabile.',
      ],
    },
    {
      heading: 'Pre-elaborazione delle immagini',
      paragraphs: [
        "Applica filtri all'immagine sovrapposta prima di sfumarla. Queste regolazioni possono migliorare l'aspetto dell'immagine nel codice QR finale.",
      ],
      bullets: [
        "Luminosità (da -100 a +100): schiarisce o scurisce l'immagine.",
        'Contrasto (da -100 a +100): aumenta o diminuisce la gamma tonale.',
        'Gamma (da 0,2 a 3,0): regolazione non lineare della luminosità. Valori inferiori a 1 schiariscono i mezzitoni, superiori a 1 li scuriscono.',
        'Saturazione (da -100 a +100): Intensità del colore. -100 è in scala di grigi, +100 è sovrasaturato.',
        'Ruota tonalità (0-360°): sposta tutti i colori sulla ruota dei colori.',
        "Sfocatura (0-20px): ammorbidisce i dettagli dell'immagine.",
        'Nitidezza (0-100%): migliora i bordi e i dettagli.',
        'Posterizza (livelli 0-16): riduce i livelli di colore per ottenere un effetto poster.',
        'Soglia (0-255): converte in bianco/nero binario al punto di taglio.',
        'Rilevamento dei bordi: algoritmi Sobel o Canny per mostrare solo i bordi.',
        'Inverti: inverti tutti i colori.',
      ],
    },
    {
      heading: 'Modalità di adattamento',
      paragraphs: ["Come l'immagine sovrapposta si adatta all'area del codice QR:"],
      bullets: [
        "Copertina: l'immagine riempie l'intera area, ritagliandola se necessario.",
        "Contiene: l'intera immagine è visibile, potrebbe avere margini.",
        "Allungamento: l'immagine viene distorta per riempire esattamente.",
      ],
    },
    {
      heading: 'Opzioni di trasformazione',
      paragraphs: [
        'Rotazione: ruota la sovrapposizione con incrementi di 90°.',
        "Capovolgi X/Y: specchia l'immagine orizzontalmente o verticalmente.",
      ],
    },
    {
      heading: 'Algoritmi di dithering',
      paragraphs: [
        'Il dithering converte le immagini a tono continuo in pattern che i codici QR possono rappresentare. Disponibile quando si utilizzano le modalità di fusione Dithering, Rumore blu o Dithering vero.',
      ],
      bullets: [
        "Diffusione dell'errore: classico stile Floyd-Steinberg. Diffonde l'errore di quantizzazione ai pixel adiacenti.",
        'Ordinato (Bayer): utilizza una matrice di soglia per modelli regolari.',
        'Punto raggruppato: simula la stampa a mezzitoni.',
        'Vuoto e cluster: dithering ordinato ottimizzato.',
        'Rumore blu: motivo casuale visivamente piacevole.',
        'Soglia rumore blu: dithering della soglia con texture rumore blu.',
        'Rumore bianco: dithering della soglia casuale.',
        'Rumore gaussiano/triangolare: rumore con diverse distribuzioni.',
        'Rumore blu + diffusione di errori: ibrido che combina entrambe le tecniche.',
        'Rumore blu schermato: modello di rumore blu simile a quello di uno schermo.',
        'Percettivo: ponderato in base alla luminanza per risultati visivi migliori.',
        "Edge-Aware: preserva i bordi dell'immagine durante il dithering.",
        'Soglia adattiva: soglia adattiva localmente.',
        'Rumore blu temporale: per le GIF animate, varia il pattern per fotogramma.',
      ],
    },
    {
      heading: 'Kernel di diffusione',
      paragraphs: [
        "Quando si utilizza il dithering di diffusione degli errori, scegliere come distribuire l'errore:",
      ],
      bullets: [
        'Floyd-Steinberg: classica diffusione a 4 vicini. Buona scelta generale.',
        'Jarvis-Judice-Ninke: 12 vicini, più fluidi ma più lenti.',
        'Stucki: simile a JJN con pesi diversi.',
        'Burkes: JJN semplificato, più veloce.',
        'Sierra: famiglia di kernel che bilancia qualità e velocità.',
        'Atkinson: Diffusione della luce, preserva i dettagli ma può essere granulosa.',
      ],
    },
    {
      heading: 'Forza di Dither',
      paragraphs: [
        "Controlla la quantità di dithering applicata (0-100%). Valori più bassi preservano maggiormente il pattern originale, mentre valori più alti mostrano maggiori dettagli dell'immagine.",
      ],
    },
    {
      heading: 'Impostazioni subpixel',
      paragraphs: ['Quando si utilizza la modalità di fusione Subpixel:'],
      bullets: [
        'Dimensione griglia: 2×2, 3×3 o 4×4 subpixel per modulo. Più alto = più dettagli.',
        'Regola centrale: rigorosa, il subpixel centrale deve corrispondere al modulo. Il centro dei mezzitoni consente variazioni.',
        'Colore neutro: colore utilizzato per subpixel indeterminati.',
        'Finder Override: come vengono resi i pattern del finder (solidi o stilizzati).',
      ],
    },
    {
      heading: 'Impostazioni mezzitoni',
      paragraphs: ['Quando si utilizza la modalità di fusione Mezzitoni:'],
      bullets: [
        'Dimensione cella: per modulo o griglia N×N.',
        'Forma del punto: cerchio, quadrato o linea.',
        'Curva di luminosità: lineare, a S o gamma.',
      ],
    },
    {
      heading: 'Colori bicromatici',
      paragraphs: [
        'Quando si utilizza la modalità di fusione Duotone, impostare il colore Ombra (aree scure) e il colore Evidenziazione (aree luminose).',
      ],
    },
    {
      heading: 'Impostazioni animazione GIF',
      paragraphs: ['Quando si utilizzano sovrapposizioni GIF animate:'],
      bullets: [
        'Usa i ritardi dei fotogrammi: rispetta i tempi GIF originali.',
        'FPS massimo: limita la frequenza dei fotogrammi (1-60 fps).',
        'Gestione dello smaltimento: rispettare o semplificare i metodi di smaltimento dei telai.',
      ],
    },
    {
      heading: 'Opzioni di rendering avanzate',
      paragraphs: ['Controlli di rendering aggiuntivi:'],
      bullets: [
        'Modalità spazio: stile spazio Nessuno, Rientranza, Tratto o Spazio negativo.',
        "Raggio dell'angolo: percentuale di angoli arrotondati per i moduli.",
        'Gradiente: nessuno, gradiente lineare, radiale o conico sui moduli.',
        "Stile interno/esterno dell'occhio: stile indipendente per gli anelli con motivo di ricerca.",
        'Rotazione punti: ruota i moduli diamante/punto.',
        "Scala dell'occhio: regolazione delle dimensioni per i modelli del mirino.",
        'Stile cornice: aggiungi cornici decorative (cornice arrotondata, adesivo, etichetta).',
        'Testo cornice: aggiungi testo come Scansionami! alle cornici.',
      ],
    },
    {
      heading: 'Codifica QR avanzata',
      paragraphs: ['Regolazione precisa della codifica QR:'],
      bullets: [
        'Modalità di codifica: automatica, numerica, alfanumerica, byte/UTF-8 o kanji.',
        'Applicare la zona silenziosa minima: garantire almeno 4 moduli di margine.',
      ],
    },
    {
      heading: 'Opzioni di output avanzate',
      paragraphs: ['Impostazioni di esportazione aggiuntive:'],
      bullets: [
        'Nome file: nome file personalizzato per i download.',
        "Dimensione tavolozza GIF: 2-256 colori nell'output GIF.",
        'Quantizzatore GIF: taglio mediano, NeuQuant o riduzione del colore Octree.',
        'Dithering GIF: disattivato, Floyd-Steinberg o ordinato.',
        'Colore trasparente GIF: imposta un colore trasparente.',
        'SVG True Vector: usa tracciati anziché raster incorporati.',
        'Precisione della forma SVG: rendering pixel o percorso preciso.',
        'SVG Incorpora sovrapposizione raster: includi sovrapposizione come immagine incorporata.',
        "Sostituzione sfondo: forza un colore di sfondo specifico nell'output.",
      ],
    },
    {
      heading: 'Opzioni di convalida',
      paragraphs: ["Impostazioni di elaborazione dell'input:"],
      bullets: [
        'Convalida input: controlla il formato del contenuto prima della codifica.',
        'Rimuovi spazi vuoti: rimuovi gli spazi iniziali/finali.',
        'Normalizza le nuove righe: converte tutte le terminazioni di riga in LF.',
        'Protezione lunghezza massima: avvisa se il contenuto supera la capacità del QR.',
      ],
    },
    {
      heading: 'Funzionalità professionali',
      paragraphs: [
        'Il livello Professional aggiunge filigrane, metadati, opzioni di condivisione, analisi di sicurezza, codici QR per i pagamenti e funzionalità aziendali.',
      ],
    },
    {
      heading: 'Filigrana',
      paragraphs: ['Aggiungi filigrane ai tuoi codici QR:'],
      bullets: [
        'Tipo: filigrana con testo, immagine o motivo.',
        'Posizione: Centro, Angoli, Bordi, Dietro o Zona tranquilla.',
        'Opacità: trasparenza della filigrana (0-100%).',
        'Modalità di fusione: fusione normale, moltiplica, scolora o sovrapponi.',
      ],
    },
    {
      heading: 'Metadati',
      paragraphs: ['Incorpora metadati nei file esportati:'],
      bullets: [
        'Campi Titolo, Autore, Copyright, Licenza, Descrizione.',
        'Ora di creazione: incorpora timestamp di generazione.',
        'Chiave-valore personalizzata: aggiungi coppie di metadati arbitrarie.',
      ],
    },
    {
      heading: 'Condivisione',
      paragraphs: ['Condividi le configurazioni del tuo codice QR:'],
      bullets: [
        'Collegamento diretto: genera un URL condivisibile con le tue impostazioni attuali.',
        'Incorpora HTML: ottieni il codice di incorporamento per i siti web.',
        "Codifica parametri: includi tutte le impostazioni nell'URL di condivisione.",
        'Nota: le immagini sovrapposte dai file locali non possono essere condivise tramite URL.',
      ],
    },
    {
      heading: 'Analisi della sicurezza',
      paragraphs: ['Assicurarsi che i codici QR rimangano scansionabili:'],
      bullets: [
        'Modalità di sicurezza: requisiti di scansione disattivati, bilanciati o rigorosi.',
        'Dimensione minima del modulo: dimensione minima in pixel per modulo.',
        'Min Quiet Zone: Moduli con margine minimo.',
        'Lock Finders/Timing/Align/Format/Version: Proteggi elementi specifici.',
        'Intensità massima di sovrapposizione tramite ECC: limiti di intensità automatici basati sul livello di correzione degli errori.',
      ],
    },
    {
      heading: 'Tipi di contenuto (professionale)',
      paragraphs: ['Il livello professionale aggiunge tipi di pagamento e contenuti aziendali:'],
      bullets: [
        'EPC/SEPA (UE): codici QR per bonifici bancari europei con IBAN, BIC, importo, riferimento.',
        'UPI (India): Interfaccia di pagamento unificata con VPA, nome del beneficiario, importo.',
        'PayNow (Singapore): pagamento rapido a Singapore con UEN o numero di cellulare.',
        'PromptPay (Thailandia): sistema di pagamento nazionale thailandese.',
        'PIX (Brasile): pagamento istantaneo brasiliano con chiave PIX.',
        'Criptovalute: indirizzi di pagamento Bitcoin, Ethereum, Litecoin con importo opzionale.',
        'Link alla campagna di marketing: URL con monitoraggio completo dei parametri UTM (tag di marketing).',
        'Collegamento breve: da utilizzare con accorciatori di URL per codici QR dinamici/tracciabili.',
        'GS1 Digital Link: Identificazione del prodotto con GTIN, seriale, lotto, scadenza.',
        'App Deep Link: deep link per app iOS/Android con schemi personalizzati.',
        'Formato personalizzato: dati grezzi senza formattazione o convalida.',
      ],
    },
    {
      heading: 'Pagamenti pertinenti alla lingua in modalità avanzata',
      paragraphs: [
        'Quando si utilizza la modalità avanzata, ANQR mostra automaticamente i metodi di pagamento pertinenti alla lingua selezionata. Ad esempio, gli utenti vietnamiti vedono VietQR, gli utenti tailandesi vedono PromptPay e gli utenti di lingua indiana vedono UPI e BharatQR. I metodi di pagamento globali (criptovalute, PayPal, Cash App) sono disponibili in tutte le lingue. La modalità professionale sblocca tutti gli standard di pagamento, indipendentemente dalla lingua.',
      ],
    },
    {
      heading: 'Standard europei di pagamento',
      bullets: [
        "EPC/SEPA (UE): codici QR per bonifici bancari europei conformi allo standard EPC. Supportano IBAN, BIC (facoltativo per i pagamenti nazionali), importo in EUR e riferimenti di pagamento strutturati o non strutturati. Utilizzato in tutta l'area SEPA, inclusi i paesi dell'UE, oltre a Svizzera, Norvegia, Islanda, Liechtenstein, Monaco e San Marino.",
        'QR-fattura svizzera: standard di pagamento svizzero conforme alle linee guida di implementazione SIX. Supporta CHF ed EUR, QR-Reference (QRR), Creditor Reference (ISO 11649), indirizzi strutturati di creditori/debitori e informazioni sulla fattura. Obbligatorio per le fatture svizzere dal 2022.',
      ],
    },
    {
      heading: 'Standard di pagamento indiani',
      bullets: [
        'UPI (India): Interfaccia di pagamento unificata conforme alle specifiche NPCI Deep Linking. Supporta VPA (Virtual Payment Address), nome del beneficiario, importo in INR, nota di transazione, ID di riferimento, codice categoria commerciante e modalità di transazione.',
        'BharatQR (India): Standard QR unificato che supporta sia i pagamenti UPI che quelli con carta. Combina UPI VPA con il PAN della carta per la massima compatibilità. Include nome del commerciante, città, MCC, dettagli GST e numeri di fattura/riferimento.',
      ],
    },
    {
      heading: 'Standard di pagamento del Sud-est asiatico',
      bullets: [
        "PayNow (Singapore): sistema di pagamento rapido di Singapore che utilizza le specifiche EMVCo QR con profilo SGQR. Supporta UEN (registrazione aziendale), numero di cellulare o NRIC come identificatori proxy. Include flag di modifica dell'importo e data di scadenza.",
        "PromptPay (Thailandia): sistema di pagamento nazionale thailandese conforme al profilo EMV della Banca di Thailandia. Supporta numero di cellulare, documento d'identità nazionale, codice fiscale, ID portafoglio elettronico e pagamento di bollette con più campi di riferimento.",
        'QRIS (Indonesia): Standard indonesiano del codice di risposta rapida. Standard di pagamento nazionale basato su EMV che supporta ID commerciante, NMID (ID commerciante nazionale), classificazione dei criteri del commerciante e commissioni di servizio (fisse o percentuali).',
        "DuitNow (Malesia): sistema di pagamento istantaneo malese. Supporta diversi tipi di proxy, tra cui NRIC, numeri di cellulare, passaporti, carte d'identità militari e numeri di registrazione aziendale.",
        'VietQR (Vietnam): standard vietnamita per i trasferimenti interbancari. Richiede il codice BIN della banca (identificazione NAPAS) e il numero di conto. Supporta più codici di servizio per diverse tipologie di trasferimento (QRPUSH, QRIBFTTA, QRIBFTTC).',
        'QR Ph (Filippine): Standard di pagamento QR filippino per InstaPay e PESONet. Utilizza numeri di conto con identificazione del commerciante per le transazioni P2M (da persona a commerciante).',
      ],
    },
    {
      heading: "Standard di pagamento dell'Asia orientale",
      bullets: [
        'TWQR (Taiwan): standard di pagamento QR taiwanese. Supporta ID commerciante, codice fiscale e importi TWD.',
        'HKQR/FPS (Hong Kong): codici QR del sistema di pagamento più veloce di Hong Kong. Supporta ID FPS, numero di cellulare o e-mail come identificatori di pagamento. Importi in HKD.',
        "JPQR (Giappone): standard giapponese unificato per i pagamenti tramite codice QR. Utilizza l'ID del negozio per l'identificazione del commerciante con importi in JPY.",
      ],
    },
    {
      heading: 'Altri standard di pagamento regionali',
      bullets: [
        'PIX (Brasile): sistema di pagamento istantaneo della Banca Centrale Brasiliana conforme alle specifiche del Codice BR. Supporta chiavi PIX (CPF, CNPJ, email, telefono o chiave casuale), nome/città del commerciante, ID transazione e importi in BRL.',
        'AusPayNet/NPP PayID (Australia): sistema PayID della nuova piattaforma di pagamenti australiana. Supporta i tipi di PayID (e-mail, cellulare, ABN, ID organizzazione) o il tradizionale BSB + numero di conto. Il nome del commerciante è facoltativo, poiché i pagatori vedono il nome registrato dalla ricerca NPP.',
      ],
    },
    {
      heading: 'Pagamenti con criptovaluta',
      bullets: [
        'Bitcoin/Litecoin (BIP-21): URI standard per i pagamenti in criptovaluta con indirizzo del wallet, importo opzionale ed etichetta. Compatibile con tutti i principali wallet Bitcoin e Litecoin.',
        'Lightning Network (BOLT11): fatture di pagamento Lightning Network. Incolla una stringa di fattura codificata BOLT11 per pagamenti Bitcoin istantanei con commissioni minime.',
        'Ethereum (EIP-681): URI di richiesta di transazione Ethereum che supportano trasferimenti ETH nativi e trasferimenti di token ERC-20. Include ID catena per il supporto multi-rete (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), parametri del gas e chiamate alle funzioni contrattuali.',
      ],
    },
    {
      heading: 'Servizi di collegamento di pagamento',
      bullets: [
        'PayPal.Me: link di pagamento PayPal con nome utente e importo precompilato opzionale. I destinatari possono pagare tramite saldo PayPal, carte o conti bancari.',
        'Cash App: link di pagamento Cash App che utilizzano $cashtag con importo opzionale. Popolare negli Stati Uniti per i pagamenti peer-to-peer.',
      ],
    },
    {
      heading: 'Codice QR EMV generico',
      bullets: [
        'EMV Generico: crea codici QR EMV personalizzati in modalità Merchant-Presented per schemi di pagamento non specificatamente elencati. Configura il nome del commerciante, la città, il codice paese (ISO 3166-1), il codice valuta (ISO 4217 numerico), il codice MCC, le opzioni per mance/commissioni e campi dati aggiuntivi. Utile per test o integrazioni personalizzate.',
      ],
    },
    {
      heading: 'Modalità di fusione sovrapposizione (professionale)',
      paragraphs: ['Ulteriori modalità di fusione nel livello Professionale:'],
      bullets: [
        'Pixelate: effetto di sovrapposizione pixelato.',
        'Contorno: sovrapposizione di rilevamento dei bordi che mostra solo i contorni.',
        'Onda: effetto di distorsione ondulato.',
        "Dimensione subpixel: dimensione variabile dei subpixel in base all'immagine.",
        'True Dither: dithering avanzato con selezione di matrici ordinate.',
        "Estremo: massima visibilità dell'immagine, può influire sulla scansionabilità.",
      ],
    },
    {
      heading: 'Impostazioni di protezione',
      paragraphs: [
        'Controllo dettagliato su quali elementi QR sono protetti dalla modifica della sovrapposizione:',
      ],
      bullets: [
        'Preserva i tempi: mantieni i modelli di temporizzazione invariati.',
        'Preserva allineamento: mantieni i modelli di allineamento non modificati.',
        'Proteggi informazioni sul formato: proteggi i moduli di informazioni sul formato.',
        'Proteggi informazioni sulla versione: protegge i moduli di informazioni sulla versione.',
      ],
    },
    {
      heading: 'Modalità ECC-Aware',
      paragraphs: [
        "Distribuisce in modo intelligente l'intensità della sovrapposizione in base alla capacità di correzione degli errori. Il sistema analizza quali moduli possono essere modificati mantenendo la scansionabilità.",
      ],
      bullets: [
        'Budget di rischio: percentuale della capacità di correzione degli errori da utilizzare (0-100%).',
        'Budget più elevato = sovrapposizione più visibile ma maggiore rischio di scansione.',
        'Budget inferiore = scansione più sicura ma sovrapposizione meno visibile.',
      ],
    },
    {
      heading: 'Opzioni di rendering professionali',
      paragraphs: ['Controlli di rendering avanzati:'],
      bullets: [
        'Bordi nitidi: usa il rendering delle immagini pixelate per ottenere bordi nitidi dei moduli.',
        'Pixel Snap: allineamento pixel pavimento, rotondo o soffitto.',
        'Modalità colore per modulo: Solido, Per luminosità, Per posizione, Per sovrapposizione, Per cluster.',
        'Palette colori: definisce una tavolozza colori personalizzata per la colorazione di ogni modulo.',
        'Protezione del contrasto: assicura il rapporto di contrasto minimo tra i colori.',
        'Rapporto di contrasto minimo: requisito di contrasto in stile WCAG (da 1:1 a 21:1).',
        'Moduli di confine aggiuntivi: confine aggiuntivo oltre la zona tranquilla.',
      ],
    },
    {
      heading: 'Opzioni di output professionali',
      paragraphs: ['Impostazioni di esportazione aziendale:'],
      bullets: [
        'DPI: imposta la risoluzione di stampa (72-600 DPI). Per la stampa si consigliano 300 DPI.',
        'Includi zona silenziosa: attiva/disattiva la zona silenziosa nelle dimensioni di output.',
        'Esporta come aggiuntivo: genera PDF insieme al formato principale.',
      ],
    },
    {
      heading: 'Impostazioni di animazione (professionale)',
      paragraphs: ['Ulteriori funzionalità di animazione professionale:'],
      bullets: [
        'Dithering temporale: disattivato, rumore blu o dithering per fotogramma sicuro.',
        'Pattern: Nessuno, Effetti Impulso, Onda, Linea di scansione, Luccichio o Deriva.',
      ],
    },
    {
      heading: 'Riferimento API',
      paragraphs: [
        "ANQR fornisce un'API lato server per la generazione di codici QR tramite parametri URL. Questa è la soluzione ideale per incorporare codici QR in siti web, e-mail, documenti o flussi di lavoro automatizzati senza JavaScript lato client.",
        'URL di base: https://anqr.link/api/qr',
      ],
    },
    {
      heading: 'Parametri di base',
      paragraphs: ['Parametri obbligatori e comuni (i nomi dei parametri non vengono tradotti):'],
      bullets: [
        "dati (obbligatori): il contenuto da codificare nel codice QR. Caratteri speciali codificati nell'URL.",
        "dimensione: dimensione dell'immagine in pixel (predefinita: 400, massima: 2000). Utilizzata se w/h non è specificato.",
        "w, h: larghezza e altezza dell'output in pixel. Sostituisce il parametro size.",
        'formato: formato di output: png, webp o gif (predefinito: png).',
        'ec: Livello di correzione degli errori: L, M, Q o H (predefinito: H).',
        'fg: colore di primo piano come esadecimale senza # (predefinito: 000000).',
        'bg: Colore di sfondo esadecimale senza # (predefinito: ffffff).',
        'trasparente: impostare su 1 per uno sfondo trasparente.',
        'margine: zona silenziosa nei moduli (predefinito: 4).',
      ],
    },
    {
      heading: 'Parametri di stile',
      paragraphs: ['Stile del modulo e del pattern:'],
      bullets: [
        'stile: Stile del modulo: quadrato, arrotondato, punti, rombo, connesso.',
        'finder: stile del pattern Finder: quadrato, arrotondato, cerchio.',
        'align: stile del modello di allineamento — match_finder, quadrato, arrotondato, cerchio.',
        'timing: Stile del pattern di temporizzazione: match_module, solido, tratteggiato.',
        "raggio: percentuale del raggio dell'angolo 0-100.",
        'gap: percentuale di gap del modulo 0-50.',
        'gapMode: Modalità gap — nessuno, inserto, tratto, spazio negativo.',
        'eyeOuter, eyeInner: Stili degli occhi: quadrati, arrotondati, circolari.',
        'eyeScale: percentuale della scala oculare (predefinita: 100).',
        'grad: Tipo di gradiente: nessuno, lineare, radiale, conico.',
        'gradAngle: Angolo di pendenza per gradienti lineari.',
        'gradStops: Il gradiente si interrompe come color1,pos1,color2,pos2,… (ad esempio, ff0000,0,0000ff,1).',
      ],
    },
    {
      heading: 'Parametri di sovrapposizione',
      paragraphs: [
        "Opzioni di sovrapposizione dell'immagine (l'immagine sovrapposta viene recuperata dal lato server):",
      ],
      bullets: [
        "img: URL per sovrapporre l'immagine (deve essere accessibile al pubblico).",
        'modalità: modalità sovrapposizione — centro, mezzitoni, fusione, luminosità, mosaico, retinato, rumore blu, subpixel.',
        'intensità: intensità di sovrapposizione 0-100 (predefinito: 100).',
        'colorMode: Modalità colore sovrapposto: colore, scala di grigi, b/n.',
        'adattamento: come si adatta la sovrapposizione: copre, contiene, si allunga.',
        'rot: rotazione della sovrapposizione in gradi.',
        'flipX, flipY: impostare su 1 per capovolgere la sovrapposizione.',
        'keepFinders: conserva i modelli di ricerca (predefinito: 1).',
        'keepTiming, keepAlign: impostare su 1 per preservare i modelli di temporizzazione/allineamento.',
      ],
    },
    {
      heading: 'Parametri di pre-elaborazione',
      paragraphs: ["Pre-elaborazione dell'immagine applicata alla sovrapposizione:"],
      bullets: [
        'luminosità: regolazione da -100 a 100 (predefinito: 0).',
        'contrasto: regolazione da -100 a 100 (predefinito: 0).',
        'gamma: valore da 0,1 a 3 (predefinito: 1).',
        'saturazione: regolazione da -100 a 100 (predefinito: 0).',
        'tonalità: rotazione della tonalità in gradi.',
        'sfocatura: sfocatura in pixel.',
        'affilatura: quantità di nitidezza 0-100.',
        'posterizza: livelli di posterizzazione.',
        'soglia: soglia binaria 0-255.',
        'edge: Rilevamento del bordo — spento, sobel, astuto.',
        'inverti: imposta su 1 per invertire i colori.',
      ],
    },
    {
      heading: 'Parametri della filigrana',
      paragraphs: ['Aggiungi filigrane ai codici QR generati:'],
      bullets: [
        'wmEn: impostare su 1 per abilitare la filigrana.',
        'wmKind: Tipo di filigrana: testo, immagine, motivo.',
        'wmText: testo della filigrana (codificato in URL).',
        "wmImg: URL per filigranare l'immagine.",
        'wmPos: Posizione — centro, angoli, bordi, dietro, quiet_zone.',
        'wmOpacity: Opacità 0-100 (predefinito: 50).',
        'wmBlend: Modalità di fusione: normale, moltiplica, schermo, sovrapposizione.',
      ],
    },
    {
      heading: 'Parametri di animazione',
      paragraphs: ["Per l'output GIF animato (richiede format=gif):"],
      bullets: [
        'animPattern: Pattern di animazione — nessuno, impulso, onda, linea di scansione, luccichio, deriva, ciclo_colore.',
        'animFrames: Numero di frame 1-60 (predefinito: 24).',
        'animSpeed: Ritardo del frame in millisecondi 10-1000 (predefinito: 100).',
        "animSeed: Seme casuale per l'animazione.",
        "easing: Easing dell'animazione — lineare, ease_in, ease_out, ease_in_out, bounce.",
      ],
    },
    {
      heading: 'Parametri di output',
      paragraphs: ['Opzioni formato output:'],
      bullets: [
        'qualità: qualità WebP 0-1 (predefinita: 0,9).',
        'webpQ: qualità WebP 0-100 (predefinito: 90).',
        'gifColors: dimensione della tavolozza GIF 2-256 (predefinita: 256).',
        'dpi: DPI di output per PNG (predefinito: 72).',
        'metaTitle, metaAuthor, metaCopy, metaDesc: campi metadati PNG.',
      ],
    },
    {
      heading: 'Esempio di utilizzo',
      paragraphs: [
        'Codice QR di base:',
        'https://anqr.link/api/qr?data=https://example.com',
        'Codice QR personalizzato con colori personalizzati:',
        'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30',
        'Codice QR con immagine sovrapposta:',
        'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70',
        'GIF animata:',
        'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
      ],
    },
    {
      heading: 'Incorporamento di codici QR',
      paragraphs: [
        "In modalità Professionale, la funzione Condividi genera HTML e URL incorporabili. Ecco come funziona l'incorporamento:",
      ],
      bullets: [
        "Condividi collegamento: crea un URL all'app ANQR con tutte le impostazioni codificate come parametri URL. I destinatari possono visualizzare e modificare il codice QR.",
        "Immagine incorporata: genera un tag che punta all'API del server. Il codice QR viene renderizzato lato server e visualizzato come immagine.",
        'Incorpora Markdown: crea la sintassi delle immagini Markdown per la documentazione e i file README.',
        'URL API diretto: URL API non elaborato da utilizzare in applicazioni, script o altre integrazioni.',
      ],
    },
    {
      heading: 'Esempio HTML',
      paragraphs: [
        'Per incorporare un codice QR nel tuo sito web:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=200 alt=Codice QR />',
        'Per dimensionamento reattivo:',
        '<img src=https://anqr.link/api/qr?data=https://yoursite.com&size=400 alt=Codice QR style=larghezza massima: 100%; altezza: auto; />',
        'Il server memorizza nella cache le risposte con intestazioni di cache lunghe, quindi le richieste ripetute per lo stesso URL sono veloci.',
      ],
    },
    {
      heading: 'Formato URL di condivisione',
      paragraphs: [
        'Quando fai clic su Condividi in modalità Professionale, ANQR codifica le impostazioni correnti in parametri URL. Il formato è:',
        'https://anqr.link/?data=…&ec=H&style=rounded&….',
        'Questi parametri rispecchiano i parametri API, quindi è possibile convertire un URL di condivisione in un URL API modificando il percorso di base da / a /api/qr e regolando i parametri w/h secondo necessità.',
        'Nota: le immagini sovrapposte caricate da file locali non possono essere condivise tramite URL: solo le sovrapposizioni basate su URL (parametro img) funzionano nei link condivisi e nelle chiamate API.',
      ],
    },
    {
      heading: 'Limiti di velocità e utilizzo',
      paragraphs: [
        "L'API è gratuita per volumi ragionevoli. Per utilizzi ad alto volume o applicazioni commerciali che richiedono tempi di attività garantiti, vi preghiamo di contattarci.",
        'Le risposte API includono intestazioni di caching aggressive. Per prestazioni ottimali, memorizza nella cache le risposte o utilizza lo stesso URL in modo coerente per codici QR identici.',
      ],
    },
    {
      heading: 'Migliori pratiche',
      paragraphs: ['Segui queste linee guida per codici QR affidabili:'],
      bullets: [
        'Prima di stampare, testa sempre i tuoi codici QR con più app di scansione.',
        'Utilizzare la correzione degli errori H (Alta) quando si aggiungono sovrapposizioni.',
        'Mantenere almeno 4 moduli di zona silenziosa (margine).',
        'Garantire un contrasto elevato tra primo piano e sfondo.',
        'Per la stampa, utilizzare almeno 300 DPI e testare le dimensioni di stampa effettive.',
        'Abilita Mantieni modelli Finder quando usi le sovrapposizioni.',
        "Inizia con un'intensità di sovrapposizione inferiore e aumentala gradualmente.",
        "Per l'uso all'aperto, prendere in considerazione moduli di dimensioni maggiori e una correzione degli errori più elevata.",
      ],
    },
    {
      heading: 'Risoluzione dei problemi',
      paragraphs: ['Problemi comuni e soluzioni:'],
      bullets: [
        "Il codice QR non viene scansionato: ridurre l'intensità della sovrapposizione, aumentare la correzione degli errori, controllare il contrasto.",
        'Codice troppo grande: ridurre la lunghezza del contenuto, utilizzare un accorciatore di URL, versione inferiore.',
        'Output sfocato: aumentare le dimensioni del modulo, utilizzare PNG invece di formati compressi.',
        'I colori sembrano sbagliati: controlla il contrasto dei colori, prova la modalità di sovrapposizione in scala di grigi.',
        'GIF non animato: assicurarsi di utilizzare il formato di output GIF, controllare il conteggio dei fotogrammi.',
        "La sovrapposizione dell'immagine non si carica: verificare le autorizzazioni CORS sulle immagini remote.",
      ],
    },
    {
      heading: 'Scorciatoie da tastiera',
      paragraphs: [
        "ANQR supporta le scorciatoie da tastiera standard. Utilizzare Ctrl/Cmd+S per avviare l'esportazione (quando il focus è sull'anteprima).",
      ],
    },
    {
      heading: 'Condivisione e incorporamento',
      paragraphs: [
        'In modalità Professionale, fai clic sul pulsante Condividi per copiare un URL con le tue impostazioni correnti. I destinatari potranno aprire questo URL per visualizzare la configurazione esatta. Nota: le immagini sovrapposte da file locali non possono essere condivise tramite URL.',
      ],
    },
  ],
};

export default guide;
