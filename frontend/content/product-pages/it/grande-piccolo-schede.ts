import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - Italian Content (Grande Piccolo)
 *
 * File: frontend/content/product-pages/it/grande-piccolo-schede.ts
 * URL: /it/apps/grande-piccolo-schede
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Italian/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year, $25/month) - NOT Core Bundle
 */

export const bigSmallItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'grande-piccolo-schede',
    appId: 'big-small',
    title: 'Schede Didattiche Grande Piccolo - Generatore di Schede Scuola dell\'Infanzia per Confronto Dimensioni',
    description: 'Crea schede didattiche professionali per insegnare i concetti di grande e piccolo ai bambini della scuola dell\'infanzia. Generatore di schede scuola primaria con 5 tipi di esercizi di comparazione dimensioni.',
    keywords: 'schede didattiche grande piccolo, schede scuola infanzia, confronto dimensioni, schede matematica, pregrafismo, schede didattiche scuola primaria, discriminazione visiva, schede italiano classe prima, disegni da colorare, numeri da stampare',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/grande-piccolo-schede',
  },

  // Hero Section
  hero: {
    title: 'Generatore Schede Grande Piccolo',
    subtitle: 'Schede Didattiche Scuola dell\'Infanzia per Confronto Dimensioni',
    description: `Crea schede didattiche professionali per insegnare i concetti di grande e piccolo ai bambini della scuola dell'infanzia. Il nostro generatore di schede didattiche scuola primaria richiede un abbonamento Accesso Completo che costa 240 euro all'anno o 25 euro al mese. Con il tuo abbonamento puoi generare schede didattiche illimitate senza costi aggiuntivi per ogni scheda. Accedi a tutti i 33 tipi di generatori di schede inclusi nell'abbonamento Accesso Completo.

Le schede grande e piccolo sono perfette per bambini dai 3 ai 6 anni che stanno sviluppando competenze di discriminazione visiva. Il generatore crea cinque tipi diversi di esercizi di comparazione. Cerchia l'oggetto piccolo per identificazione del più piccolo. Cerchia l'oggetto grande per riconoscimento del più grande. Cerchia l'oggetto medio quando usi tre immagini. Ordina da piccolo a grande per sequenze crescenti. Ordina da grande a piccolo per sequenze decrescenti.

Ogni scheda didattica si scarica in formato PDF o JPEG di alta qualità professionale. Perfetto per stampare a casa o a scuola per attività di pregrafismo e sviluppo cognitivo. Le schede matematica e schede scuola dell'infanzia includono chiavi di risposta automatiche. Ideale per centri di apprendimento, attività individuali, valutazioni e compiti a casa. Il sistema funziona con oltre 3000 immagini adatte ai bambini organizzate per temi. Scegli animali, frutta, giocattoli, veicoli e oggetti quotidiani. Oppure carica le tue immagini personalizzate per creare schede didattiche uniche.`,
    previewImageSrc: '/samples/english/big small/big-small identical images.jpeg',
    ctaLabels: {
      tryFree: 'Prova Gratis',
      viewSamples: 'Vedi Esempi',
    },
    trustBadges: {
      languages: '11 Lingue',
      images: '3000+ Immagini',
      license: 'Licenza Commerciale',
    },
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    floatingStats: {
      time: '3 min',
      action: 'Crea e Scarica',
      quality: '300 DPI',
    },
  },

  // Sample Gallery
  samples: {
    sectionTitle: 'Esempi di Schede Didattiche Grande Piccolo',
    sectionDescription: 'Scarica esempi gratuiti per vedere la nostra qualità professionale',
    downloadLabel: 'Scarica Esempio Gratuito',
    worksheetLabel: 'Scheda',
    answerKeyLabel: 'Chiave di Risposta',
    viewAllLabel: 'Ingrandisci',
    noPdfLabel: 'Solo anteprima',
    freePdfCountLabel: 'download gratuiti',
    badgeText: 'Esempi Gratuiti',
    downloadingLabel: 'Scaricamento...',
    ofLabel: 'di',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Scheda didattica grande piccolo con immagini identiche per scuola dell\'infanzia',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Scheda didattica grande piccolo con immagini diverse per discriminazione visiva',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Scheda didattica grande piccolo con ordinamento numeri 1-2-3',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Funzionalità Complete delle Schede Didattiche Grande Piccolo - Tutto per Creare Schede Scuola dell\'Infanzia Professionali',
    sectionDescription: 'Il generatore di schede didattiche grande piccolo include sette funzionalità essenziali per maestre e maestri della scuola dell\'infanzia e primaria. Ogni funzione è stata progettata per risparmiare tempo e creare materiali didattici di qualità professionale. L\'abbonamento Accesso Completo da 240 euro all\'anno ti dà accesso completo a tutte queste funzionalità per tutti i 33 tipi di generatori di schede. Nessun limite di utilizzo. Nessun costo aggiuntivo per scheda creata.',
    highlightBadgeText: 'Funzionalità Chiave',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    badgeText: 'Funzionalità',
    trustBadges: {
      allFeatures: 'Tutte le funzionalità incluse',
      noHiddenFees: 'Nessun costo nascosto',
      cancelAnytime: 'Cancella quando vuoi',
    },
    items: [
      {
        id: '1',
        title: 'Crea Schede Didattiche Scuola dell\'Infanzia in 3 Clic - Generazione Rapida per Attività di Pregrafismo',
        description: `Il processo di creazione è estremamente semplice e veloce. Seleziona un tema di immagini dalla biblioteca di oltre 3000 illustrazioni adatte ai bambini. Configura le impostazioni degli esercizi secondo l'età e il livello di sviluppo dei tuoi bambini. Clicca genera e la tua scheda didattica appare istantaneamente sul canvas digitale.

Non servono competenze tecniche o esperienza di design grafico. L'interfaccia è intuitiva e pensata specificamente per insegnanti occupati della scuola dell'infanzia. Dalla selezione delle immagini al download finale servono meno di 3 minuti. Perfetto per maestre che devono preparare schede matematica e attività di pregrafismo velocemente tra una lezione e l'altra.

Il sistema genera automaticamente esercizi bilanciati di confronto dimensioni. Le immagini vengono ridimensionate secondo algoritmi precisi che garantiscono differenze chiare e visibili. Ogni scheda è diversa anche se usi le stesse impostazioni. Questo permette di creare facilmente varianti per diversi gruppi di bambini della scuola dell'infanzia o per esercitazioni ripetute durante l'anno scolastico.`,
        icon: '⚡',
        highlighted: true,
      },
      {
        id: '2',
        title: 'Modifica Schede Didattiche Scuola Primaria sul Canvas - Controllo Totale su Ogni Elemento',
        description: `Ogni elemento sulla scheda didattica è completamente modificabile. Trascina immagini per riposizionarle dove preferisci. Ridimensiona oggetti cliccando e trascinando gli angoli. Ruota elementi per creare layout più dinamici e interessanti visivamente. Elimina qualsiasi cosa non ti serve con un semplice clic del mouse.

Aggiungi testo personalizzato ovunque sulla scheda. Cambia colore, dimensione e font del testo secondo le tue preferenze didattiche. Inserisci istruzioni specifiche in italiano per i tuoi studenti della classe prima. Aggiungi il nome della scuola o della sezione. Crea intestazioni personalizzate che riflettono il tuo stile didattico personale.

Il canvas funziona come un editor grafico professionale ma semplificato per insegnanti. Pulsanti chiari per portare elementi in primo piano o sullo sfondo. Strumenti di allineamento per posizionare oggetti perfettamente sulla pagina. Funzioni annulla e ripeti per correggere errori facilmente. Tutto è modificabile fino al download finale delle schede didattiche scuola primaria.`,
        icon: '✏️',
        highlighted: false,
      },
      {
        id: '3',
        title: 'Carica Immagini Personalizzate - Schede Scuola dell\'Infanzia Uniche per i Tuoi Bambini',
        description: `La funzione di caricamento immagini ti permette di usare le tue foto e illustrazioni personali. Carica foto degli oggetti della tua classe o sezione. Usa immagini che i tuoi bambini della scuola dell'infanzia conoscono e riconoscono quotidianamente. Crea schede didattiche tematiche collegate alle unità didattiche che stai insegnando.

Il sistema accetta tutti i formati immagine comuni come JPEG, PNG e GIF. Puoi caricare più file contemporaneamente con un solo clic. Le immagini caricate si mescolano con quelle della biblioteca integrata. Combina immagini personali con illustrazioni professionali per risultati unici e personalizzati.

Questa funzione è particolarmente utile per bambini con bisogni educativi speciali nella scuola dell'infanzia. Usa foto di oggetti familiari dall'ambiente domestico del bambino. Crea schede matematica personalizzate che aumentano l'engagement e la comprensione. Le immagini personalizzate rendono l'apprendimento dei concetti di dimensione più concreto e significativo per ogni bambino.`,
        icon: '📤',
        highlighted: false,
      },
      {
        id: '4',
        title: 'Schede Didattiche in 11 Lingue - Supporto Multilingue per Scuola dell\'Infanzia Internazionale',
        description: `Il generatore supporta 11 lingue diverse per interfaccia e contenuti. Italiano, inglese, tedesco, francese, spagnolo, portoghese brasiliano, olandese, danese, svedese, norvegese e finlandese. Cambia lingua con un semplice clic dal menu impostazioni nel pannello laterale.

Questa funzionalità è essenziale per scuole internazionali e programmi bilingue della scuola primaria. Crea le stesse schede didattiche in lingue diverse per sezioni multilingue. Supporta bambini che stanno imparando l'italiano come seconda lingua nella classe prima. Perfetto per scuole dell'infanzia con bambini di background linguistici diversi.

Le etichette e le istruzioni delle schede matematica cambiano automaticamente nella lingua selezionata. I simboli grafici per cerchiare e ordinare restano universali. Puoi creare set di schede didattiche scuola primaria parallele in più lingue per insegnamento comparativo. Ideale per educatori che lavorano in contesti multiculturali europei.`,
        icon: '🌍',
        highlighted: false,
      },
      {
        id: '5',
        title: 'Licenza Commerciale Inclusa - Vendi Schede Didattiche Scuola dell\'Infanzia su Etsy e Teachers Pay Teachers',
        description: `L'abbonamento Accesso Completo include una licenza commerciale print-on-demand completa senza costi aggiuntivi. Puoi vendere le schede didattiche che crei su piattaforme come Etsy, Teachers Pay Teachers e Amazon KDP. Nessuna attribuzione richiesta sui tuoi prodotti digitali. Trattieni il 100% dei profitti dalle vendite.

Molti insegnanti italiani guadagnano vendendo schede didattiche scuola primaria e materiali per la scuola dell'infanzia online. Teachers Pay Teachers è un mercato globale con milioni di insegnanti acquirenti. Le schede di pregrafismo, schede matematica e disegni da colorare sono tra i prodotti più venduti. Insegnanti di successo guadagnano da 500 a 5000 euro al mese vendendo risorse didattiche.

La qualità professionale 300 DPI è perfetta per prodotti digitali commerciali. Crea pacchetti tematici di schede didattiche coordinate per la scuola dell'infanzia. Sviluppa curriculum completi di discriminazione visiva e matematica iniziale da vendere. Combina schede grande piccolo con schede alfabeto, tabelline e numeri da stampare per pacchetti completi.`,
        icon: '📜',
        highlighted: false,
      },
      {
        id: '6',
        title: 'Biblioteca di 3000+ Immagini - Schede Didattiche e Disegni da Colorare Integrati per Scuola dell\'Infanzia',
        description: `La biblioteca integrata contiene oltre 3000 immagini professionali adatte ai bambini della scuola dell'infanzia. Organizzate per temi educativi: animali domestici, animali della fattoria, animali selvatici, frutta, verdura, trasporti, oggetti scolastici, giocattoli, natura e molto altro. Ogni immagine è stata selezionata per essere chiara, riconoscibile e appropriata per l'età prescolare.

Seleziona per tema per creare schede didattiche tematiche coordinate. Scegli tema animali della fattoria per unità didattiche sull'agricoltura. Usa tema frutta e verdura per educazione alimentare nella scuola dell'infanzia. Seleziona veicoli per progetti sui trasporti. Le schede matematica tematiche aumentano l'interesse e rinforzano apprendimenti trasversali.

Molte immagini funzionano perfettamente anche come disegni da colorare dopo gli esercizi. I bambini possono prima completare le attività di discriminazione dimensioni poi colorare le immagini sulla stessa scheda. Questa combinazione sviluppa competenze cognitive di pregrafismo e motricità fine contemporaneamente. Perfetto per attività integrate nella scuola dell'infanzia.`,
        icon: '🖼️',
        highlighted: false,
      },
      {
        id: '7',
        title: 'Qualità Professionale 300 DPI - Schede Didattiche Scuola Primaria Pronte per Stampa e Vendita',
        description: `Tutte le schede didattiche si scaricano in risoluzione professionale 300 DPI. Questa è qualità da tipografia per stampa nitida e chiara. Le immagini mantengono dettagli perfetti anche quando stampate a grandezza naturale. I bordi degli oggetti sono netti per facilitare la discriminazione visiva. I colori sono vivaci e attraenti per i bambini della scuola dell'infanzia.

Scegli formato JPEG per stampa rapida immediata o PDF per documenti multipagina organizzati. Il formato PDF mantiene dimensioni esatte della pagina A4 o Letter. JPEG funziona con qualsiasi stampante casalinga senza programmi speciali. Entrambi i formati mantengono la qualità professionale 300 DPI per schede matematica e pregrafismo.

L'opzione scala di grigi è inclusa per ridurre drasticamente il consumo di inchiostro. Le schede didattiche scuola primaria in bianco e nero funzionano perfettamente per fotocopie multiple. I bambini possono colorare le immagini dopo aver completato gli esercizi trasformandole in disegni da colorare. Le chiavi di risposta si generano automaticamente con le soluzioni corrette evidenziate.`,
        icon: '✨',
        highlighted: false,
      },
    ],
  },

  // How-To Guide Section
  howTo: {
    sectionTitle: 'Come Creare Schede Didattiche Grande Piccolo in 5 Semplici Passi - Schede Scuola dell\'Infanzia Pronte in 3 Minuti',
    sectionDescription: 'Creare schede didattiche professionali per insegnare i concetti di dimensione richiede meno di 3 minuti. L\'intero processo dal login al download è velocissimo e intuitivo. Nessuna competenza tecnica richiesta per generare schede matematica e attività di pregrafismo. Segui questi cinque passi semplici e avrai schede didattiche scuola primaria personalizzate pronte per i tuoi studenti della scuola dell\'infanzia.',
    ctaText: 'Inizia Ora',
    badgeText: 'Guida Passo-Passo',
    stepLabel: 'Passo',
    completionTitle: 'Scheda Pronta!',
    completionSubtitle: 'La tua scheda didattica è pronta per il download',
    readyTime: 'Pronta in meno di 3 minuti',
    noSkillsNeeded: 'Nessuna competenza di design richiesta',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Seleziona Immagini per Schede Didattiche Scuola dell\'Infanzia - Temi o Selezione Personalizzata',
        description: `Il primo passo è selezionare le immagini che appariranno nelle tue schede grande e piccolo. Hai tre opzioni principali per scegliere le immagini. Seleziona un tema completo dalla biblioteca organizzata. Scegli immagini individuali sfogliando la collezione di 3000 illustrazioni. Oppure carica le tue foto personalizzate dalla classe o da casa.

La selezione per tema è la più veloce per creare schede didattiche. Clicca sul menu a tendina temi e scegli una categoria educativa. Temi disponibili includono animali domestici, animali della fattoria, animali selvatici, frutta, verdura, giocattoli, veicoli, oggetti scolastici, natura e molti altri. Ogni tema contiene 20-50 immagini coordinate visivamente perfette per la scuola dell'infanzia.

Una volta selezionato il tema il sistema mostra tutte le immagini disponibili in anteprima. Devi selezionare tante immagini quanti esercizi vuoi creare nella tua scheda. Se pianifichi 4 esercizi seleziona 4 immagini diverse. Se vuoi 8 esercizi seleziona 8 immagini. Un contatore mostra quante immagini hai selezionato e quante servono ancora per completare la scheda didattica.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura Impostazioni Esercizi Grande Piccolo - Schede Didattiche Personalizzate per Ogni Livello',
        description: `Il secondo passo è configurare come funzioneranno gli esercizi di confronto dimensioni. Queste impostazioni controllano la difficoltà e il formato delle schede didattiche scuola dell'infanzia. Tutte le opzioni hanno valori predefiniti intelligenti che funzionano bene per la maggior parte delle situazioni educative.

Scegli il numero di esercizi per pagina da 1 a 10. Per bambini piccoli della scuola dell'infanzia 3-4 esercizi per pagina funzionano bene. Lascia spazio sufficiente per i bambini di lavorare senza sentirsi sopraffatti. Per classe prima 5-6 esercizi sono appropriati. Per esercitazioni intensive o compiti a casa usa fino a 8-10 esercizi per creare schede matematica complete.

Scegli se usare 2 o 3 immagini per esercizio nelle tue schede didattiche. Con 2 immagini crei esercizi grande-piccolo semplici perfetti per 3-4 anni. Con 3 immagini puoi includere il concetto medio e creare esercizi di ordinamento più complessi. Le schede con 3 immagini sono ideali per classe prima e bambini di 5-6 anni della scuola dell'infanzia.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Schede Didattiche Scuola dell\'Infanzia - Creazione Istantanea con Numeri da Stampare',
        description: `Il terzo passo è generare la scheda grande piccolo. Clicca il grande pulsante verde Genera Scheda nel pannello laterale. Il sistema elabora le tue impostazioni e crea la scheda didattica in 2-3 secondi. La scheda appare sul canvas digitale pronta per revisione e modifica immediata.

Il sistema distribuisce automaticamente gli esercizi sulla pagina in modo bilanciato. Lo spacing è ottimizzato per chiarezza e facilità d'uso da parte dei bambini. Ogni esercizio ha spazio sufficiente per le risposte. Il layout è professionale senza intervento manuale. Perfetto per creare velocemente schede didattiche scuola primaria di alta qualità.

Le immagini che hai selezionato vengono assegnate casualmente agli esercizi. Ogni esercizio usa una delle tue immagini scelte dalla biblioteca. Il sistema ridimensiona automaticamente le immagini secondo l'algoritmo grande-piccolo. Con 2 immagini crea una grande e una piccola con differenza dell'80%. Con 3 immagini crea piccola-media-grande con gradazione chiara.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica Schede Scuola dell\'Infanzia sul Canvas - Personalizza Attività di Pregrafismo Completamente',
        description: `Il quarto passo è modificare la scheda didattica sul canvas digitale interattivo. Questo passo è completamente opzionale per creare schede didattiche scuola primaria. Se la scheda generata è perfetta puoi saltare direttamente al download. Ma la possibilità di modificare ti dà controllo creativo totale sulle tue schede matematica.

Clicca qualsiasi elemento per selezionarlo sul canvas. Immagini, cerchi per le risposte, numeri, testo. Tutto è modificabile nelle schede scuola dell'infanzia. Trascina elementi selezionati per riposizionarli dove preferisci. Usa i punti di controllo agli angoli per ridimensionare. Ruota elementi usando l'icona di rotazione circolare. Elimina elementi con il tasto Canc o pulsante elimina nella barra strumenti.

Aggiungi testo personalizzato cliccando il pulsante Aggiungi Testo. Digita istruzioni specifiche in italiano per i tuoi studenti della scuola dell'infanzia. Aggiungi il nome dell'unità didattica su dimensioni e forme. Inserisci promemoria o suggerimenti per attività di pregrafismo. Il testo è completamente formattabile con colori e dimensioni personalizzabili.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica Schede Didattiche Scuola Primaria - PDF e JPEG di Qualità Professionale 300 DPI',
        description: `Il quinto passo finale è scaricare le schede didattiche per stampa o condivisione. Clicca il menu a tendina Download nella barra superiore. Scegli tra quattro opzioni di download per le tue schede scuola dell'infanzia. Scheda esercizi in formato JPEG. Scheda esercizi in formato PDF. Chiave di risposta in JPEG. Chiave di risposta in PDF.

Il formato JPEG è perfetto per stampa rapida immediata delle schede didattiche scuola primaria. Funziona con qualsiasi stampante casalinga senza programmi speciali. Apri il file e stampa direttamente. Ideale per stampare una singola scheda matematica velocemente. I file JPEG si aprono in qualsiasi dispositivo per massima compatibilità.

Il formato PDF mantiene dimensioni esatte della pagina A4 o Letter. Perfetto per creare documenti multipagina con più schede didattiche. Combina più PDF usando programmi gratuiti. Ideale per condividere schede scuola dell'infanzia via email con genitori. Prima di scaricare puoi attivare l'opzione scala di grigi. Questa opzione converte le schede in bianco e nero per risparmiare inchiostro.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section
  useCases: {
    sectionTitle: 'Perfetto per Maestre e Genitori - Schede Didattiche Scuola dell\'Infanzia per Ogni Esigenza Educativa',
    sectionDescription: 'Il generatore di schede grande piccolo è ideale per diversi tipi di educatori e contesti didattici. Maestre della scuola dell\'infanzia usano le schede per insegnare concetti matematici fondamentali. Insegnanti di scuola primaria creano materiali per pregrafismo e discriminazione visiva. Genitori homeschooler personalizzano schede didattiche per i loro bambini. Educatori di sostegno adattano le attività per bisogni speciali.',
    badgeText: 'Chi Usa le Nostre Schede',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestre di Scuola dell\'Infanzia - Schede Didattiche e Attività di Pregrafismo per Bambini 3-6 Anni',
        subtitle: 'Pregrafismo, Discriminazione Visiva e Concetti Matematici',
        description: `Le maestre della scuola dell'infanzia usano il generatore quotidianamente per attività di discriminazione visiva. Creano schede grande piccolo per introdurre concetti matematici di base. I bambini di 3-4 anni iniziano con esercizi semplici usando 2 immagini. I bambini di 5-6 anni progrediscono a esercizi con 3 immagini includendo il concetto di medio.

Le schede didattiche supportano lo sviluppo cognitivo e le attività di pregrafismo. Cerchiare l'immagine corretta sviluppa controllo motorio fine. Ordinare immagini da piccolo a grande insegna sequenze e relazioni spaziali. Queste competenze sono fondamentali per la preparazione alla scuola primaria e alla classe prima.

Le maestre apprezzano particolarmente la velocità di creazione. Preparare schede didattiche scuola dell'infanzia richiede meno di 3 minuti. Perfetto per programmazione settimanale o per rispondere a bisogni emergenti. Puoi creare varianti della stessa attività per diversi livelli di sviluppo. La biblioteca di 3000 immagini permette di collegare le schede ai temi didattici mensili.`,
        quote: 'I bambini adorano confrontare dimensioni con immagini colorate!',
      },
      {
        id: '2',
        icon: '👩‍🏫',
        title: 'Insegnanti di Scuola Primaria - Schede Didattiche Scuola Primaria per Matematica e Discriminazione Visiva',
        subtitle: 'Schede Matematica con Tabelline e Numeri da Stampare',
        description: `Gli insegnanti di classe prima e classe seconda usano le schede grande piccolo per rafforzare concetti matematici. La discriminazione dimensioni è collegata a competenze di misurazione e confronto quantitativo. I bambini che padroneggiano grande-piccolo-medio hanno basi solide per comprendere numeri da stampare, tabelline e operazioni matematiche.

Le schede didattiche scuola primaria funzionano bene come riscaldamento matematico all'inizio della lezione. Cinque minuti di attività grande piccolo attivano il pensiero logico. I bambini si concentrano e sono pronti per concetti più complessi. Perfetto anche come pausa cervello tra attività impegnative di alfabeto o italiano.

Molti insegnanti di classe prima combinano schede grande piccolo con schede matematica per pacchetti completi. Creano fascicoli settimanali con diverse tipologie di esercizi. Le schede sono eccellenti per valutazioni formative rapide. Le chiavi di risposta automatiche rendono la correzione velocissima.`,
        quote: 'Perfetto per sviluppare il pensiero matematico in modo divertente.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Genitori Homeschooler - Schede Scuola dell\'Infanzia Personalizzate per Educazione Domiciliare',
        subtitle: 'Schede Didattiche Scuola Primaria con Alfabeto e Lettere',
        description: `I genitori che educano a casa apprezzano la flessibilità completa del generatore. Creano schede didattiche perfettamente calibrate sul livello del loro bambino. Nessun compromesso per adattarsi a gruppi classe eterogenei. Ogni scheda è personalizzata per il ritmo di apprendimento individuale del bambino.

La possibilità di caricare immagini personali è particolarmente preziosa per homeschooling. Fotografa giocattoli preferiti del bambino per schede grande piccolo. Usa foto di oggetti di casa per esercizi contestualizzati. Crea schede matematica con immagini di fratelli o animali domestici. La personalizzazione aumenta drasticamente motivazione e comprensione.

I genitori homeschooler usano l'abbonamento Accesso Completo per accesso a tutti i 33 generatori. Creano curriculum completi combinando schede didattiche diverse. Un abbonamento copre tutte le esigenze educative. Molti genitori stampano schede didattiche scuola dell'infanzia in bianco e nero. I bambini completano esercizi poi colorano le immagini come attività artistica.`,
        quote: 'Mio figlio adora le schede con le foto dei suoi giocattoli!',
      },
      {
        id: '4',
        icon: '💚',
        title: 'Educatori di Sostegno - Schede Didattiche Adattate per Bisogni Educativi Speciali',
        subtitle: 'Schede Didattiche Differenziate con Pregrafismo Adattato',
        description: `Gli educatori di sostegno trovano il generatore estremamente utile per differenziazione. Bambini con bisogni speciali necessitano materiali adattati al loro livello. Le schede grande piccolo si personalizzano completamente per ogni studente. Crea esercizi molto semplici con 2 immagini grandi e chiaramente diverse per bambini con difficoltà cognitive.

La possibilità di modificare ogni elemento sul canvas è essenziale per adattamenti. Ingrandisci immagini per bambini con difficoltà visive. Semplifica layout rimuovendo elementi distraenti. Aggiungi supporti visivi extra come frecce colorate o bordi evidenziati. Personalizza istruzioni con linguaggio semplificato o pittogrammi.

Le schede didattiche con immagini personalizzate supportano bambini con autismo. Usa foto di oggetti dall'ambiente familiare del bambino. Crea schede con routine quotidiane visualizzate. Le immagini familiari riducono ansia e aumentano comprensione. La prevedibilità delle schede strutturate aiuta bambini che hanno bisogno di routine chiare.`,
        quote: 'Finalmente schede che posso adattare per ogni studente.',
      },
      {
        id: '5',
        icon: '🌍',
        title: 'Insegnanti di Italiano L2 - Schede Italiano Classe Prima e Vocabolario Dimensioni',
        subtitle: 'Schede Multilingue per Apprendimento della Lingua Italiana',
        description: `Gli insegnanti di italiano come seconda lingua usano schede grande piccolo per insegnare vocabolario di base. I concetti di dimensione sono tra i primi aggettivi che bambini stranieri imparano. Grande, piccolo, medio sono parole fondamentali ad alta frequenza. Le schede didattiche forniscono pratica visiva concreta per acquisizione linguistica.

Le schede funzionano perfettamente in contesti multilingue. L'abbonamento include 11 lingue di interfaccia. Crea schede italiano classe prima per studenti italofoni. Crea le stesse schede in inglese, arabo o cinese per confronto. I bambini vedono che concetti di dimensione sono universali mentre parole cambiano tra lingue.

Molti insegnanti L2 combinano schede grande piccolo con schede alfabeto e lettere dell'alfabeto. Prima insegnano nomi degli oggetti. Poi aggiungono aggettivi di dimensione. I bambini imparano mela poi mela grande e mela piccola. La progressione linguistica naturale supporta acquisizione grammaticale corretta dell'italiano.`,
        quote: 'Perfetto per insegnare vocabolario italiano giocando!',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Insegnanti Imprenditori - Vendi Schede Didattiche Scuola dell\'Infanzia su Etsy e Teachers Pay Teachers',
        subtitle: 'Vendi Schede Didattiche con Tabelline e Disegni da Colorare',
        description: `Molti insegnanti italiani stanno costruendo business online vendendo schede didattiche. Teachers Pay Teachers e Etsy sono mercati globali con domanda enorme per materiali educativi di qualità. Le schede matematica, pregrafismo, alfabeto, tabelline e disegni da colorare sono tra i prodotti più venduti.

L'abbonamento Accesso Completo include licenza commerciale completa. Crea centinaia di schede didattiche scuola primaria diverse da vendere. Nessun costo aggiuntivo oltre ai 240 euro annuali. Nessuna attribuzione richiesta. Trattieni 100% dei profitti dalle vendite. Molti insegnanti guadagnano da 500 a 5000 euro al mese vendendo risorse digitali.

La strategia vincente è creare pacchetti tematici completi. Pacchetto autunno con schede grande piccolo a tema zucche e foglie. Pacchetto animali con 50 schede diverse usando animali della biblioteca. Pacchetto matematica prescolare con grande piccolo, numeri da stampare e schede matematica base. I pacchetti si vendono meglio di schede singole.`,
        quote: 'Ho guadagnato oltre 2000 euro vendendo schede grande piccolo.',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Domande Frequenti su Schede Didattiche Scuola Primaria e Pregrafismo - Risposte Complete per Insegnanti',
    sectionDescription: 'Gli insegnanti hanno domande specifiche prima di abbonarsi al generatore di schede grande piccolo. Questa sezione risponde alle domande più comuni su schede didattiche scuola dell\'infanzia, schede matematica, alfabeto, tabelline, pregrafismo e disegni da colorare.',
    showMoreText: 'Mostra altre domande',
    showLessText: 'Mostra meno domande',
    badgeText: 'FAQ',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    secureCheckout: 'Pagamento sicuro',
    cancelAnytime: 'Cancella quando vuoi',
    items: [
      {
        id: '1',
        question: 'Il Generatore di Schede Didattiche Scuola Primaria è Davvero Gratuito da Usare?',
        answer: `Il generatore di schede grande piccolo richiede un abbonamento Accesso Completo che costa 240 euro all'anno o 25 euro al mese. L'abbonamento ti dà accesso illimitato alla creazione di schede didattiche scuola primaria senza costi aggiuntivi per singola scheda. Genera tutte le schede matematica, alfabeto, tabelline, pregrafismo, disegni da colorare, schede italiano classe prima e numeri da stampare di cui hai bisogno senza limiti.

L'abbonamento Accesso Completo include tutti i 33 generatori di schede sulla piattaforma. Non solo grande piccolo ma anche addizioni, sottrazioni, lettere dell'alfabeto, vocabolario, pattern, labirinti e molti altri. Un singolo abbonamento copre tutte le esigenze di materiali didattici per scuola dell'infanzia e scuola primaria durante tutto l'anno scolastico.

Entrambi gli abbonamenti includono licenza commerciale completa. Puoi vendere le schede didattiche che crei su Etsy, Teachers Pay Teachers e Amazon KDP. La qualità professionale 300 DPI è perfetta per prodotti digitali. Nessuna attribuzione richiesta. Trattieni 100% dei profitti dalle vendite dopo commissioni delle piattaforme.`,
      },
      {
        id: '2',
        question: 'Posso Stampare Schede Matematica e Pregrafismo a Casa con Stampante Normale?',
        answer: `Sì, tutte le schede didattiche funzionano perfettamente con stampanti domestiche normali. Le schede matematica, pregrafismo, alfabeto e disegni da colorare si scaricano in formato PDF o JPEG. Entrambi i formati sono compatibili con qualsiasi stampante inkjet o laser. Apri il file scaricato e stampa direttamente senza programmi speciali.

Le schede si adattano automaticamente ai formati pagina standard. Scegli formato Letter per stampanti americane o A4 per stampanti europee. Le dimensioni sono preimpostate correttamente. Non serve ridimensionare o regolare margini. La stampa è semplice come qualsiasi documento normale.

L'opzione scala di grigi riduce drasticamente consumo di inchiostro. Le schede didattiche scuola primaria in bianco e nero stampano con solo inchiostro nero. Perfetto per fotocopiatrici scolastiche. I bambini possono colorare le schede matematica e pregrafismo dopo aver completato gli esercizi trasformandole in disegni da colorare.`,
      },
      {
        id: '3',
        question: 'Servono Competenze di Design per Creare Schede Matematica, Tabelline e Alfabeto?',
        answer: `No, non servono competenze di design grafico per creare schede didattiche professionali. Il generatore è stato progettato specificamente per insegnanti senza esperienza tecnica. L'interfaccia è intuitiva e guidata passo-passo. Seleziona immagini, configura impostazioni, clicca genera. Le schede matematica, tabelline, alfabeto e pregrafismo appaiono pronte in 3 minuti.

Il sistema gestisce automaticamente tutta l'impaginazione professionale. Distribuisce esercizi sulla pagina in modo bilanciato. Ottimizza spacing per chiarezza. Ridimensiona immagini proporzionalmente. Crea layout puliti senza intervento manuale. Anche insegnanti che non hanno mai usato programmi grafici creano schede didattiche scuola primaria di qualità eccellente.

Se vuoi personalizzare ulteriormente le schede l'editor canvas è semplice. Trascina elementi con il mouse. Clicca per selezionare e modificare. Cambia colori con palette visive. Tutto funziona con clic e trascina. Nessun codice. Nessuna curva di apprendimento ripida.`,
      },
      {
        id: '4',
        question: 'Posso Usare Schede Alfabeto e Lettere dell\'Alfabeto nella Mia Classe con Studenti?',
        answer: `Sì, l'abbonamento Accesso Completo include utilizzo illimitato in classe con i tuoi studenti. Crea tutte le schede alfabeto, lettere dell'alfabeto, tabelline, schede matematica, pregrafismo e disegni da colorare che servono. Stampa copie multiple per tutta la classe. Usa le schede didattiche scuola primaria per lezioni, centri di apprendimento, compiti a casa e valutazioni.

La licenza copre uso educativo completo in contesti scolastici. Scuole pubbliche, private, charter e religiose. Programmi homeschool e educazione parentale. Doposcuola e tutoring privato. Centri estivi educativi. Qualsiasi contesto dove insegni a bambini della scuola dell'infanzia o primaria.

Puoi anche condividere schede didattiche con colleghi della tua scuola. Genera schede italiano classe prima per il team di classe prima. Crea numeri da stampare per il dipartimento matematica. Prepara disegni da colorare per programmi artistici. L'abbonamento personale copre condivisione interna alla tua istituzione educativa senza costi aggiuntivi.`,
      },
      {
        id: '5',
        question: 'Quali Lingue Supportano le Schede Matematica, Tabelline e Numeri da Stampare?',
        answer: `Il generatore supporta 11 lingue per interfaccia e contenuti delle schede didattiche. Italiano, inglese, tedesco, francese, spagnolo, portoghese brasiliano, olandese, danese, svedese, norvegese e finlandese. Cambia lingua con un clic dal menu impostazioni. Tutte le etichette, istruzioni e elementi di testo cambiano automaticamente nella lingua selezionata.

Questa funzionalità è essenziale per scuole internazionali e programmi bilingue. Genera schede matematica in italiano per studenti italofoni. Crea tabelline in inglese per sezioni internazionali. Prepara schede alfabeto in francese per programmi di immersione linguistica. Le stesse immagini funzionano in tutte le lingue quindi crei facilmente materiali paralleli.

Gli insegnanti di italiano L2 trovano il supporto multilingue particolarmente prezioso. Crea schede italiano classe prima con istruzioni in lingua madre dello studente. Genera lettere dell'alfabeto italiano con spiegazioni in arabo, cinese o inglese. I bambini comprendono compiti più facilmente quando istruzioni sono nella loro lingua familiare mentre apprendono contenuti in italiano.`,
      },
      {
        id: '6',
        question: 'Posso Vendere Schede Didattiche Scuola Primaria e Disegni da Colorare che Creo?',
        answer: `Sì, l'abbonamento Accesso Completo include licenza commerciale print-on-demand completa. Puoi vendere schede didattiche scuola primaria, disegni da colorare, schede matematica, tabelline, alfabeto, pregrafismo e numeri da stampare su piattaforme commerciali. Etsy, Teachers Pay Teachers e Amazon KDP sono i mercati più popolari per insegnanti imprenditori.

Nessun costo aggiuntivo oltre all'abbonamento annuale da 240 euro. Nessuna attribuzione richiesta sui tuoi prodotti. Trattieni 100% dei profitti dalle vendite dopo le commissioni delle piattaforme di vendita. Molti insegnanti guadagnano da 500 a 5000 euro mensili vendendo risorse didattiche digitali.

La strategia vincente è creare pacchetti completi tematici. Bundle matematica prescolare con grande piccolo, numeri da stampare e schede matematica base. Collezione alfabeto completa con lettere dell'alfabeto maiuscole e minuscole. Pacchetto italiano classe prima con vocabolario, grammatica e disegni da colorare. I pacchetti curriculum si vendono a prezzi premium rispetto a schede singole.`,
      },
      {
        id: '7',
        question: 'Come Posso Personalizzare Schede Italiano Classe Prima e Lettere dell\'Alfabeto per i Miei Studenti?',
        answer: `Le schede didattiche sono completamente personalizzabili sul canvas digitale. Ogni elemento è modificabile. Trascina immagini per riposizionarle. Ridimensiona elementi cliccando angoli. Ruota oggetti per layout dinamici. Elimina qualsiasi cosa non serva. Aggiungi testo personalizzato ovunque sulla scheda italiano classe prima o lettere dell'alfabeto.

Carica le tue immagini personalizzate per schede uniche. Fotografa oggetti dalla tua classe. Usa foto di mascotte scolastiche. Carica disegni creati dai bambini. Le immagini personali si mescolano con la biblioteca di 3000 illustrazioni professionali. Combina per risultati completamente personalizzati.

Modifica colori, font e dimensioni di tutto il testo. Cambia colore sfondo per temi stagionali. Aggiungi bordi decorativi per occasioni speciali. Inserisci istruzioni specifiche per studenti con bisogni speciali. Ingrandisci elementi per bambini con difficoltà visive. Le opzioni di personalizzazione per schede matematica, tabelline, pregrafismo e numeri da stampare sono illimitate.`,
      },
      {
        id: '8',
        question: 'Quali Gruppi di Età Funzionano Meglio con Schede Pregrafismo e Numeri da Stampare?',
        answer: `Le schede grande piccolo sono perfette per bambini dai 3 ai 7 anni. Bambini di 3-4 anni della scuola dell'infanzia lavorano su discriminazione visiva di base. Esercizi semplici con 2 immagini grandi e chiaramente diverse. Cerchiare l'oggetto grande o piccolo sviluppa competenze di osservazione e pregrafismo fondamentali.

Bambini di 5-6 anni progrediscono a esercizi più complessi. Tre immagini includendo il concetto di medio. Ordinare da piccolo a grande insegna sequenze. Queste attività preparano per matematica formale con numeri da stampare e tabelline. Sviluppano pensiero logico necessario per classe prima.

Bambini di classe prima e seconda usano schede per rafforzare competenze. La discriminazione dimensioni è collegata a misurazione e confronto quantitativo. Insegnanti combinano grande piccolo con schede matematica, alfabeto e lettere dell'alfabeto per programmi integrati. Le schede funzionano anche per studenti più grandi con bisogni educativi speciali o ritardi di sviluppo cognitivo.`,
      },
      {
        id: '9',
        question: 'Posso Caricare Mie Immagini per Schede Alfabeto, Pregrafismo e Disegni da Colorare?',
        answer: `Sì, la funzione di caricamento immagini personalizzate è inclusa nell'abbonamento. Carica foto in formato JPEG, PNG o GIF. Caricamento multiplo permette di aggiungere molte immagini contemporaneamente. Le tue immagini appaiono insieme alla biblioteca integrata. Selezionale per schede alfabeto, pregrafismo, disegni da colorare o qualsiasi altro tipo di scheda didattica.

Questa funzione è particolarmente utile per temi specifici. Fotografa oggetti dall'aula per schede contestualizzate. Usa foto di gite scolastiche per attività di follow-up. Carica immagini di feste culturali per unità multiculturali. Crea schede italiano classe prima con vocabolario specifico al tuo curriculum locale.

Le immagini personalizzate supportano bambini con bisogni speciali. Usa foto dall'ambiente familiare del bambino autistico. Crea schede matematica con oggetti che il bambino usa quotidianamente. Genera tabelline con immagini di interessi speciali del bambino. Personalizzazione aumenta engagement e comprensione per tutti gli studenti.`,
      },
      {
        id: '10',
        question: 'Quanto Tempo Serve per Creare Schede Matematica, Tabelline e Lettere dell\'Alfabeto?',
        answer: `Creare una scheda didattica richiede meno di 3 minuti dall'inizio alla fine. Seleziona tema o immagini - 30 secondi. Configura impostazioni per schede matematica, tabelline o lettere dell'alfabeto - 30 secondi. Clicca genera - 5 secondi. Rivedi scheda sul canvas - 30 secondi. Scarica PDF o JPEG - 30 secondi. Totale circa 2-3 minuti per scheda completa.

Questo è drasticamente più veloce dei metodi tradizionali. Creare schede manualmente richiede 30-60 minuti. Cercare clipart online. Impaginare in Word o PowerPoint. Formattare per stampa. Correggere errori di allineamento. Con il generatore risparmi 90% del tempo preparando schede didattiche scuola primaria, pregrafismo e numeri da stampare.

Se vuoi personalizzare aggiungi 2-5 minuti. Modifica testo, sposta immagini, cambia colori. Anche con personalizzazione completa finisci in meno di 10 minuti totali. Confronta con ore necessarie usando Canva o Adobe. Il risparmio tempo si accumula rapidamente.`,
      },
      {
        id: '11',
        question: 'Le Schede Grande Piccolo Includono Chiavi di Risposta?',
        answer: `Sì, il generatore crea automaticamente chiavi di risposta per schede grande piccolo. Dopo aver generato la scheda esercizi clicca il pulsante Genera Chiave di Risposta. Il sistema crea una seconda scheda identica ma con soluzioni evidenziate. Per esercizi cerchia appare segno di spunta verde sull'immagine corretta. Per esercizi ordinamento appaiono numeri 1-2-3 nelle posizioni corrette.

Le chiavi di risposta hanno stesso formato e qualità delle schede esercizi. Puoi scaricare entrambe in PDF o JPEG. Ideale per correzione rapida, autovalutazione studenti e lavoro indipendente. Questo vale anche per schede matematica, tabelline, alfabeto, numeri da stampare e tutti gli altri 33 generatori sulla piattaforma.

Il risparmio tempo con chiavi automatiche è significativo. Non devi calcolare manualmente risposte corrette. Non devi creare documento separato per soluzioni. Clicca un pulsante e scarica chiave completa. Perfetto per preparare pacchetti compiti da casa con schede italiano classe prima, lettere dell'alfabeto, pregrafismo e disegni da colorare dove studenti possono auto-correggere.`,
      },
      {
        id: '12',
        question: 'Posso Creare Schede Didattiche Scuola Primaria su Matematica, Alfabeto e Altre Materie Specifiche?',
        answer: `Sì, l'abbonamento Accesso Completo include 33 generatori diversi per tutte le materie principali. Schede matematica includono addizioni, sottrazioni, moltiplicazioni, divisioni, tabelline, numeri da stampare e frazioni. Schede alfabeto e lettere dell'alfabeto coprono literacy. Schede italiano classe prima includono vocabolario, grammatica e lettura. Pregrafismo e disegni da colorare supportano sviluppo motorio e artistico.

Ogni generatore è specializzato per una competenza specifica. Grande piccolo insegna discriminazione dimensioni. Pattern insegna sequenze logiche. Labirinti sviluppano problem solving. Trova e conta sviluppa abilità di conteggio. Combina diversi generatori per creare curriculum completi per scuola dell'infanzia e primaria.

Puoi creare schede tematiche collegando materie diverse. Tema animali con grande piccolo, schede matematica per contare animali, schede alfabeto con nomi di animali, disegni da colorare di animali. Tema stagioni con vocabolario stagionale, numeri da stampare, tabelline tematiche e pregrafismo. Le possibilità di integrazione curricolare sono infinite con 33 generatori inclusi nell'abbonamento.`,
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Accesso Completo',
    price: '€240',
    priceInterval: '/anno',
    priceSuffix: 'Fatturato annualmente',
    benefits: [
      'Creazione schede illimitata',
      'Tutti i 33 generatori inclusi',
      'Licenza commerciale inclusa',
      '11 lingue supportate',
      '3000+ immagini tematiche',
      'Qualità stampa 300 DPI',
    ],
    ctaText: 'Inizia Ora',
    bundleDescription: 'Il tuo abbonamento include l\'accesso a tutti i 33 generatori di schede',
    bundleApps: [],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combina Grande Piccolo con Altri Generatori',
    sectionDescription: 'L\'abbonamento Accesso Completo include 33 generatori. Combina il generatore Grande Piccolo con altri strumenti. Crea pacchetti completi di schede didattiche. Perfetto per unità tematiche. Ottimo per centri di apprendimento.',
    ctaTitle: 'Pronto a Creare Schede Straordinarie?',
    ctaDescription: 'Unisciti a migliaia di educatori che creano schede professionali. Generazione illimitata, licenza commerciale inclusa.',
    primaryCtaText: 'Inizia la Prova Gratuita',
    secondaryCtaText: 'Vedi Tutti i 33 Generatori',
    badgeText: 'Funziona Perfettamente Con',
    exploreText: 'Esplora tutte le applicazioni',
    trustBadges: {
      securePayment: 'Pagamento sicuro',
      cancelAnytime: 'Cancella quando vuoi',
    },
    items: [
      {
        id: '1',
        slug: 'addition',
        name: 'Addizioni',
        category: 'Matematica',
        icon: '➕',
        description: 'Crea schede di addizioni con immagini per completare il curriculum matematico.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Disegni da Colorare',
        category: 'Arte e Creatività',
        icon: '🎨',
        description: 'Aggiungi pagine da colorare con le stesse immagini usate nelle schede grande piccolo.',
      },
      {
        id: '3',
        slug: 'matching',
        name: 'Abbinamenti',
        category: 'Apprendimento Visivo',
        icon: '🔗',
        description: 'Combina grande piccolo con abbinamenti per sviluppo riconoscimento visivo completo.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Trova e Conta',
        category: 'Matematica',
        icon: '🔍',
        description: 'Pratica conteggio con schede trova e conta usando stessi temi delle schede dimensioni.',
      },
      {
        id: '5',
        slug: 'more-less',
        name: 'Più o Meno',
        category: 'Matematica',
        icon: '⚖️',
        description: 'Combina grande piccolo con confronto quantità per sviluppo matematico completo.',
      },
    ],
  },
};

export default bigSmallItContent;
