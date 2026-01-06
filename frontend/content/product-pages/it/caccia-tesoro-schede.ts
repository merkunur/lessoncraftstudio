import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Italian Content (Caccia al Tesoro)
 *
 * File: frontend/content/product-pages/it/caccia-tesoro-schede.ts
 * URL: /it/apps/caccia-tesoro-schede
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Italian/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const treasureHuntItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'caccia-tesoro-schede',
    appId: 'treasure-hunt',
    title: 'Schede Didattiche Caccia al Tesoro - Generatore di Schede per Scuola dell\'Infanzia e Scuola Primaria',
    description: 'Crea schede didattiche caccia al tesoro con il nostro generatore professionale. Il tuo abbonamento Accesso Completo ti consente di creare schede illimitate senza costi aggiuntivi per singola scheda. Genera schede didattiche personalizzate perfette per la scuola dell\'infanzia e la scuola primaria. Scarica schede di alta qualità in formato PDF in meno di 3 minuti.',
    keywords: 'schede didattiche caccia al tesoro, schede didattiche scuola primaria, schede didattiche scuola infanzia, orientamento spaziale, ragionamento spaziale, vocabolario direzionale, schede italiano classe prima, schede matematica, disegni da colorare, pregrafismo, seguire istruzioni',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/caccia-tesoro-schede',
  },

  // Hero Section
  hero: {
    title: 'Generatore Schede Didattiche Caccia al Tesoro',
    subtitle: 'Schede Didattiche Scuola Primaria e Scuola dell\'Infanzia',
    description: `Crea schede didattiche caccia al tesoro con il nostro generatore professionale. Il tuo abbonamento Accesso Completo ti consente di creare schede illimitate senza costi aggiuntivi per singola scheda. Genera schede didattiche personalizzate perfette per la scuola dell'infanzia e la scuola primaria. Scarica schede di alta qualità in formato PDF in meno di 3 minuti.

Le schede didattiche caccia al tesoro aiutano i bambini a sviluppare il ragionamento spaziale. Gli studenti seguono istruzioni scritte per navigare attraverso una griglia. Ogni scheda insegna vocabolario direzionale come su, giù, sinistra, destra. Per gli studenti più grandi, usa indicazioni cardinali come nord, sud, est, ovest.

Il generatore crea automaticamente percorsi educativi con istruzioni passo dopo passo. Seleziona un tema e 6 immagini appaiono sulla griglia. Il sistema genera istruzioni di navigazione complete. Gli studenti leggono, contano i passi e trovano oggetti nascosti. Questo combina comprensione della lettura con abilità matematiche spaziali.

Perfetto per insegnanti di scuola dell'infanzia che necessitano di attività di ragionamento spaziale. Ideale per insegnanti di scuola primaria che insegnano orientamento e mappe. Gli educatori homeschool utilizzano queste schede per lezioni di geografia. Gli insegnanti di italiano come lingua straniera praticano vocabolario direzionale. Crea pacchetti tematici stagionali per tutto l'anno scolastico.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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
    sectionTitle: 'Esempi di Schede Didattiche Caccia al Tesoro',
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
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Schede didattiche caccia al tesoro per scuola primaria - indicazioni su e giù',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Schede didattiche caccia al tesoro scuola infanzia - indicazioni cardinali nord sud',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Funzionalità del Generatore di Schede Didattiche Caccia al Tesoro - Tutto Ciò che Serve per Schede Didattiche Scuola Primaria',
    sectionDescription: 'Il generatore di schede didattiche caccia al tesoro offre funzionalità complete per insegnanti. Crea schede didattiche scuola primaria in pochi minuti senza competenze di design. Ogni funzionalità è progettata per risparmiare tempo agli educatori. Il sistema combina facilità d\'uso con personalizzazione professionale. Genera attività educative di alta qualità per la scuola dell\'infanzia e la scuola primaria.',
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
        title: 'Crea Schede Didattiche per Scuola dell\'Infanzia in 3 Clic - Generazione Rapida di Schede',
        description: `La creazione di schede didattiche caccia al tesoro richiede solo tre semplici passaggi. Primo, seleziona un tema dalla biblioteca di oltre 3000 immagini. Secondo, scegli il tipo di indicazioni direzionali per il livello dei tuoi studenti. Terzo, clicca su "Crea" e la tua scheda didattica appare istantaneamente.

Il sistema genera automaticamente sei immagini sul percorso della griglia. Crea istruzioni scritte passo dopo passo in italiano. Gli studenti seguono le indicazioni per trovare ogni oggetto nascosto. Non sono necessarie competenze tecniche o di design grafico.

Ogni scheda didattica include istruzioni complete di navigazione. Il generatore posiziona le immagini in modo casuale per varietà. Calcola automaticamente passi e direzioni per ogni oggetto. Genera sia il foglio di lavoro che la chiave di risposta in un solo clic. L'intero processo richiede meno di tre minuti dall'inizio al download.`,
        icon: '⚡',
        highlighted: true,
      },
      {
        id: '2',
        title: 'Modifica Completa delle Schede Didattiche Scuola Primaria - Personalizzazione di Ogni Elemento su Canvas',
        description: `Ogni elemento sulla tua scheda didattica è completamente modificabile sul canvas. Trascina immagini ovunque sulla griglia con il mouse. Ridimensiona gli oggetti trascinando i bordi. Ruota le immagini usando le maniglie d'angolo. Elimina elementi che non servono con un clic.

L'editor canvas utilizza la tecnologia Fabric.js professionale. Ogni modifica avviene in tempo reale con anteprima immediata. Sposta il testo delle istruzioni ovunque sulla pagina. Cambia colori, dimensioni dei caratteri e famiglie di font facilmente. Aggiungi elementi di testo personalizzati per istruzioni speciali.

I controlli di livello ti permettono di gestire l'ordine degli oggetti. Porta le immagini in primo piano o inviale sul fondo. Allinea oggetti multipli con strumenti di allineamento automatico. Blocca elementi che non vuoi spostare accidentalmente. Sblocca tutto con un solo clic quando necessario.`,
        icon: '✏️',
        highlighted: false,
      },
      {
        id: '3',
        title: 'Carica Immagini Personalizzate per Schede Didattiche - Combina con Disegni da Colorare e Numeri da Stampare',
        description: `La funzione di caricamento immagini personalizzate espande le possibilità creative. Carica foto degli studenti per attività personalizzate di orientamento. Aggiungi immagini specifiche della classe per rilevanza culturale. Combina immagini caricate con disegni da colorare dalla biblioteca.

Il sistema supporta caricamento multi-file in tutti i formati comuni. Carica file JPEG, PNG e GIF contemporaneamente. Le tue immagini appaiono immediatamente nell'area di anteprima. Clicca su qualsiasi immagine caricata per aggiungerla alla selezione della griglia. Usa immagini personalizzate insieme a numeri da stampare per lezioni di matematica.

Gli insegnanti caricano foto di gite scolastiche per attività di memoria. Crea percorsi caccia al tesoro usando luoghi familiari della scuola. Aggiungi immagini di oggetti in classe per esercizi di vocabolario. Combina foto personali con temi della biblioteca per varietà. Le possibilità sono infinite con immagini personalizzate.`,
        icon: '📤',
        highlighted: false,
      },
      {
        id: '4',
        title: 'Schede Didattiche in 11 Lingue - Supporto Multilingue per Scuola dell\'Infanzia e Scuola Primaria',
        description: `Il generatore supporta 11 lingue per l'interfaccia utente e il contenuto. Italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese e finlandese. Ogni lingua include vocabolario direzionale completamente tradotto. Le istruzioni appaiono nella lingua selezionata sulla scheda didattica.

Questa funzionalità multilingue è essenziale per insegnanti di italiano come lingua straniera. Crea schede didattiche caccia al tesoro per studenti che imparano l'italiano. Pratica vocabolario direzionale in italiano per studenti ESL. Genera materiali in più lingue per programmi bilingue. Le scuole internazionali beneficiano del supporto linguistico completo.

Ogni lingua traduce correttamente "su", "giù", "sinistra", "destra" per indicazioni base. Le indicazioni cardinali traducono "nord", "sud", "est", "ovest" accuratamente. I comandi di movimento come "muovi" e "passi" appaiono nella lingua selezionata. Tutto il testo dell'interfaccia si aggiorna istantaneamente quando cambi lingua.`,
        icon: '🌍',
        highlighted: false,
      },
      {
        id: '5',
        title: 'Licenza Commerciale Inclusa con Accesso Completo - Vendi Schede Didattiche Scuola Primaria su Teachers Pay Teachers',
        description: `Il tuo abbonamento Accesso Completo include licenza commerciale completa per stampa su richiesta. Vendi le tue schede didattiche caccia al tesoro su Teachers Pay Teachers senza costi aggiuntivi. Crea negozi Etsy vendendo fogli di lavoro stampabili. Pubblica libri a basso contenuto su Amazon KDP. Nessuna attribuzione richiesta per uso commerciale.

Questa licenza commerciale rappresenta un valore enorme per insegnanti imprenditori. I concorrenti addebitano €50-200 all'anno extra per diritti commerciali. La tua licenza Accesso Completo include tutto per €240 all'anno. Genera schede didattiche scuola primaria illimitate per la vendita. Crea prodotti a 300 DPI di qualità professionale per clienti esigenti.

Gli insegnanti costruiscono attività redditizie vendendo pacchetti di schede tematiche. Crea collezioni stagionali di schede didattiche caccia al tesoro. Vendi pacchetti di orientamento spaziale per ogni livello di grado. Combina con disegni da colorare e schede matematica per prodotti premium. Molti educatori guadagnano €500-5000 al mese vendendo schede didattiche.`,
        icon: '📜',
        highlighted: false,
      },
      {
        id: '6',
        title: 'Biblioteca di 3000+ Immagini - Accesso Completo a Schede Matematica, Alfabeto e Tabelline',
        description: `La biblioteca di immagini include oltre 3000 illustrazioni adatte ai bambini. Tutte le immagini sono organizzate per tema per selezione rapida. Cerca immagini specifiche usando la barra di ricerca. Ogni tema contiene 8-30 immagini correlate. Accesso completo incluso nel tuo abbonamento Accesso Completo senza costi extra.

I temi coprono ogni materia e stagione dell'anno scolastico. Schede matematica con numeri da stampare e simboli operativi. Temi alfabeto con lettere dell'alfabeto in stili multipli. Tabelline e concetti matematici per la scuola primaria. Disegni da colorare e illustrazioni per ogni occasione. Temi stagionali per autunno, inverno, primavera ed estate.

Ogni immagine è progettata professionalmente per attrattiva educativa. Stili artistici semplici e chiari che i bambini riconoscono facilmente. Colori vivaci che catturano l'attenzione mantenendo la professionalità. Dimensioni perfette per schede didattiche scuola dell'infanzia e primaria. Le immagini funzionano benissimo sia a colori che in scala di grigi.`,
        icon: '🖼️',
        highlighted: false,
      },
    ],
  },

  // How-To Guide Section
  howTo: {
    sectionTitle: 'Come Creare Schede Didattiche Scuola Primaria in 5 Semplici Passaggi - Schede Didattiche per Scuola dell\'Infanzia Pronte in 3 Minuti',
    sectionDescription: 'Creare schede didattiche caccia al tesoro richiede meno di tre minuti dall\'inizio alla fine. Il processo è progettato per insegnanti occupati che necessitano di materiali di qualità rapidamente. Ogni passaggio è intuitivo e non richiede formazione tecnica. Segui questi cinque semplici passaggi per generare schede didattiche scuola primaria professionali. Il tuo flusso di lavoro diventa efficiente con pratica regolare.',
    ctaText: 'Inizia Ora',
    badgeText: 'Guida Passo-Passo',
    stepLabel: 'Passaggio',
    completionTitle: 'Scheda Didattica Pronta!',
    completionSubtitle: 'La tua scheda caccia al tesoro è pronta per il download',
    readyTime: 'Pronto in meno di 3 minuti',
    noSkillsNeeded: 'Nessuna competenza di design richiesta',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Scegli il Contenuto per Schede Didattiche Scuola dell\'Infanzia - Temi, Alfabeto o Numeri da Stampare',
        description: `Il primo passaggio determina quali immagini appariranno sulla tua scheda caccia al tesoro. Hai due opzioni principali per la selezione del contenuto. L'opzione tema genera automaticamente sei immagini correlate. L'opzione manuale ti permette di scegliere esattamente sei immagini individuali.

La selezione per tema funziona perfettamente per creazione rapida di schede didattiche. Clicca sul menu a tendina "Genera da Tema" nel pannello Puzzle Setup. Scegli tra oltre 100 temi organizzati per materia e stagione. Temi alfabeto per lezioni di lettere dell'alfabeto. Temi numeri da stampare per concetti matematici. Temi animali, cibo, forme, stagioni e festività. Il sistema seleziona automaticamente sei immagini appropriate dal tema.

La selezione manuale offre controllo preciso sul contenuto delle schede didattiche. Naviga alla sezione Image Library nel pannello laterale. Scegli un tema per vedere le immagini disponibili. Clicca su qualsiasi immagine per aggiungerla alla tua selezione. L'area di anteprima mostra le tue sei immagini selezionate. Rimuovi immagini cliccandole di nuovo. Combina immagini da temi diversi per varietà.`,
        icon: '📝',
      },
      {
        id: '2',
        number: 2,
        title: 'Personalizza le Impostazioni per Schede Matematica e Pregrafismo - Indicazioni Base o Cardinali',
        description: `Il secondo passaggio configura come funziona la tua scheda caccia al tesoro. L'impostazione più importante è il tipo di indicazioni direzionali. Scegli tra indicazioni base (su/giù/sinistra/destra) o cardinali (nord/sud/est/ovest). Questa scelta determina il livello di difficoltà e il vocabolario.

Le indicazioni base sono appropriate per studenti di scuola dell'infanzia e classe prima. I bambini piccoli capiscono "su" e "giù" naturalmente. "Sinistra" e "destra" sono concetti spaziali che praticano quotidianamente. Usa indicazioni base per età 4-7 anni. Perfetto per lezioni introduttive di orientamento e seguire istruzioni.

Le indicazioni cardinali funzionano per studenti di classe seconda e superiori. Nord, sud, est, ovest sono vocabolario geografico formale. Tipicamente introdotti nel curriculum di classe seconda. Richiedono comprensione di mappe e bussole. Usa indicazioni cardinali per età 8+ anni. Eccellente per lezioni di geografia e abilità cartografiche.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera la Tua Scheda Didattica - Schede Didattiche e Disegni da Colorare Istantanei',
        description: `Il terzo passaggio crea la tua scheda caccia al tesoro completa istantaneamente. Clicca il pulsante "Crea" nell'angolo in alto a destra. Il sistema genera automaticamente l'intero foglio di lavoro in secondi. Sei immagini appaiono posizionate casualmente su una griglia. Le istruzioni scritte complete appaiono sulla pagina.

Il generatore calcola un percorso logico attraverso tutte e sei le immagini. Crea istruzioni passo dopo passo in italiano. Ogni istruzione specifica direzione e numero di passi. Esempio: "Muovi su 3 passi. Muovi destra 2 passi." Gli studenti seguono le istruzioni per trovare ogni oggetto in sequenza. Il percorso termina all'ultima immagine sulla griglia.

L'anteprima canvas mostra esattamente come apparirà la tua scheda stampata. Tutte le immagini, testo, sfondi e bordi sono visibili. Ingrandisci per ispezionare dettagli da vicino. Riduci per vedere il layout completo della pagina. Il sistema genera anche una chiave di risposta automaticamente. La chiave mostra il percorso visivo attraverso la griglia.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica su Canvas - Schede Italiano Classe Prima, Tabelline e Pregrafismo Personalizzati',
        description: `Il quarto passaggio personalizza ogni aspetto della tua scheda generata. L'editor canvas ti dà controllo completo su tutti gli elementi. Trascina immagini in posizioni diverse se il posizionamento automatico non è ideale. Ridimensiona oggetti trascinando i bordi per enfasi. Ruota immagini per varietà visiva e interesse.

Aggiungi elementi di testo personalizzati per istruzioni speciali o intestazioni. Clicca "Add Text" nel pannello Text Tools. Digita il tuo contenuto e clicca per aggiungerlo al canvas. Posiziona il testo ovunque sulla pagina trascinandolo. Cambia colore del font, dimensione e famiglia usando i controlli. Crea intestazioni come "Caccia al Tesoro di Classe Prima" o "Percorso di Orientamento".

Modifica il testo delle istruzioni esistenti se necessario. Clicca su qualsiasi elemento di testo per selezionarlo. Cambia formattazione usando i controlli della barra laterale. Aggiungi enfasi con font grassetti o colori vivaci. Semplifica il linguaggio per lettori più giovani. Adatta il vocabolario al livello di lettura dei tuoi studenti.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica e Stampa Schede Didattiche Scuola Primaria - File PDF e JPEG di Alta Qualità',
        description: `Il passaggio finale scarica le tue schede didattiche completate per uso immediato. Clicca il pulsante "Download" nell'angolo in alto a destra. Appare un menu con opzioni multiple. Scegli tra formati JPEG o PDF. Seleziona se vuoi il foglio di lavoro, la chiave di risposta o entrambi.

I file JPEG funzionano perfettamente per condivisione digitale. Carica su piattaforme di gestione dell'apprendimento come Google Classroom. Condividi via email con genitori per supporto all'apprendimento a casa. Pubblica sui social media per mostrare attività della classe. I file JPEG si aprono su qualsiasi dispositivo senza software speciale.

I file PDF mantengono qualità perfetta per stampa professionale. Scarica PDF per stampare copie multiple per la tua classe. La qualità rimane nitida su qualsiasi stampante. I PDF preservano esattamente il layout e la formattazione. Ideale per archiviare schede didattiche scuola primaria per uso futuro. I genitori homeschool preferiscono PDF per raccolte stampabili.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section
  useCases: {
    sectionTitle: 'Perfetto per Insegnanti, Genitori ed Educatori - Schede Didattiche Scuola Primaria e Scuola dell\'Infanzia per Ogni Esigenza',
    sectionDescription: 'Il generatore di schede didattiche caccia al tesoro serve educatori in contesti diversi. Ogni gruppo di utenti trova valore unico in questa risorsa flessibile. Insegnanti di scuola dell\'infanzia sviluppano ragionamento spaziale nei bambini piccoli. Insegnanti di scuola primaria insegnano abilità cartografiche e vocabolario geografico. Genitori homeschool creano lezioni personalizzate per apprendimento a casa. Insegnanti di lingue praticano vocabolario direzionale in italiano e altre lingue.',
    badgeText: 'Chi Usa le Nostre Schede',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '🎨',
        title: 'Insegnanti di Scuola dell\'Infanzia - Schede Didattiche con Pregrafismo e Disegni da Colorare per Sviluppo Motorio',
        subtitle: 'Per Bambini dai 3 ai 6 Anni',
        description: `Gli insegnanti di scuola dell'infanzia usano schede caccia al tesoro per insegnare concetti spaziali fondamentali. I bambini di età 3-6 anni imparano "su", "giù", "sinistra" e "destra" attraverso pratica attiva. Le indicazioni base sono appropriate per il livello di sviluppo dei bambini piccoli. Ogni scheda didattica combina comprensione della lettura con movimento fisico. Gli studenti seguono istruzioni scritte semplici per trovare oggetti.

Combina schede didattiche caccia al tesoro con attività di pregrafismo per lezioni integrate. Aggiungi linee tratteggiate tra gli oggetti per pratica di tracciamento. Gli studenti seguono il percorso tracciando con matite o pastelli. Questa combinazione sviluppa coordinazione occhio-mano mentre praticano orientamento. Le abilità di pregrafismo preparano i bambini per la scrittura in classe prima.

Integra disegni da colorare nelle schede caccia al tesoro per attività estese. Genera la scheda, poi gli studenti colorano ogni immagine dopo trovarla. Questa combinazione mantiene impegnati i bambini più a lungo. I disegni da colorare sviluppano controllo motorio fine essenziale per la scuola primaria. Usa temi stagionali per connessioni curriculari durante l'anno.`,
        quote: 'Le schede caccia al tesoro rendono l\'apprendimento spaziale divertente e coinvolgente!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Insegnanti di Scuola Primaria - Schede Matematica, Tabelline e Alfabeto per Apprendimento Integrato',
        subtitle: 'Per Studenti dai 6 agli 8 Anni',
        description: `Gli insegnanti di scuola primaria usano schede caccia al tesoro per insegnare abilità cartografiche formali. Gli studenti di classe seconda e terza imparano indicazioni cardinali nord, sud, est, ovest. Questa connessione con geografia e studi sociali arricchisce il curriculum. Le schede didattiche insegnano coordinati griglia e ragionamento spaziale. Gli studenti applicano abilità matematiche contando passi e calcolando distanze.

Integra schede matematica con attività caccia al tesoro per lezioni interdisciplinari. Aggiungi problemi matematici a ogni punto del percorso. Esempio: "Trova la mela. Risolvi 12 + 8 = ? prima di continuare." Gli studenti praticano addizione, sottrazione o moltiplicazione navigando. Combina schede matematica con istruzioni direzionali per coinvolgimento doppio.

Usa schede caccia al tesoro per pratica delle tabelline durante lezioni di matematica. Posiziona problemi di moltiplicazione in ogni posizione della griglia. Gli studenti risolvono le tabelline per ricevere la prossima indicazione direzionale. Questa gamificazione rende divertente la pratica delle tabelline. Crea sfide progressive da tabelline del 2 alle tabelline del 12.`,
        quote: 'Le schede caccia al tesoro integrano perfettamente orientamento e matematica.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Genitori Homeschool - Schede Italiano Classe Prima, Numeri da Stampare e Apprendimento Personalizzato',
        subtitle: 'Materiale Didattico Flessibile per Casa',
        description: `I genitori homeschool usano schede caccia al tesoro per lezioni di orientamento personalizzate. L'apprendimento a casa beneficia di attività autocorrettive indipendenti. Le chiavi di risposta permettono ai bambini di verificare il proprio lavoro. I genitori supervisionano multipli bambini di età diverse simultaneamente. Le schede didattiche tengono impegnato un bambino mentre lavori con un altro.

Crea schede italiano classe prima specificamente per studenti che imparano a leggere. Usa vocabolario semplice nelle istruzioni direzionali. Frasi come "Muovi su 2 passi" usano parole ad alta frequenza. Gli studenti di classe prima praticano comprensione della lettura seguendo indicazioni. Combina con lezioni di fonetica usando temi alfabeto per rinforzo.

Integra numeri da stampare nelle schede caccia al tesoro per lezioni di matematica. Posiziona numeri 1-10 sulla griglia in ordine casuale. Gli studenti seguono indicazioni per trovare numeri in sequenza. Questa attività insegna riconoscimento numerico e conteggio ordinale. Usa numeri da stampare più grandi per pratica di formazione numerica.`,
        quote: 'Un abbonamento copre tutto il materiale didattico di cui ho bisogno per l\'homeschool.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Insegnanti di Italiano e Lingue Straniere - Schede Didattiche Scuola Primaria Multilingue per Vocabolario Direzionale',
        subtitle: 'Per Studenti Stranieri e Programmi Bilingui',
        description: `Gli insegnanti di italiano come lingua straniera usano schede caccia al tesoro per pratica di vocabolario. Le istruzioni direzionali appaiono completamente in italiano. Gli studenti ESL imparano "su", "giù", "sinistra", "destra" in contesto. Ogni scheda didattica fornisce pratica di comprensione della lettura autentica. Gli studenti devono capire istruzioni italiane per completare con successo l'attività.

Il supporto di 11 lingue rende questo strumento essenziale per programmi bilingue. Genera la stessa scheda caccia al tesoro in italiano e inglese per confronto. Gli studenti completano prima la versione italiana poi controllano comprensione con l'inglese. Questa tecnica parallela costruisce fiducia nei principianti. Scuole internazionali usano schede didattiche scuola primaria in più lingue simultaneamente.

Insegna vocabolario spaziale italiano attraverso pratica fisica con percorsi caccia al tesoro. Gli studenti imparano "muovi", "passi", "trova" attraverso azione. I verbi imperativi italiani diventano naturali con ripetizione. Ogni percorso rinforza lo stesso vocabolario direzionale ripetutamente. La ripetizione costruisce fluenza senza noia grazie a temi variati.`,
        quote: 'Le schede multilingue accelerano l\'apprendimento del vocabolario direzionale italiano.',
      },
      {
        id: '5',
        icon: '🤝',
        title: 'Insegnanti di Educazione Speciale - Schede Didattiche con Pregrafismo e Alfabeto per Differenziazione',
        subtitle: 'Materiale Personalizzato per Bisogni Speciali',
        description: `Gli insegnanti di educazione speciale usano schede caccia al tesoro per orientamento differenziato. Gli studenti con esigenze diverse beneficiano di istruzioni visive chiare. Le immagini forniscono supporto per lettori in difficoltà. Le indicazioni brevi e semplici riducono sovraccarico cognitivo. Ogni studente lavora al proprio ritmo senza pressione di gruppo.

Combina schede didattiche con attività di pregrafismo per studenti con difficoltà motorie. Linee tratteggiate larghe tra oggetti per pratica di controllo motorio. Gli studenti tracciano il percorso prima di scrivere indicazioni. Il pregrafismo costruisce forza muscolare necessaria per scrittura. Aumenta gradualmente difficoltà da linee rette a curve durante l'anno.

Usa temi alfabeto per studenti che praticano riconoscimento delle lettere. Griglie semplici 3×3 con lettere grandi e chiare. Gli studenti trovano lettere in ordine alfabetico seguendo indicazioni visive. Combina riconoscimento alfabeto con pratica di orientamento spaziale. Rinforzi positivi dopo ogni lettera trovata con successo costruiscono fiducia.`,
        quote: 'Finalmente posso creare materiale differenziato perfetto per ogni studente.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Insegnanti Imprenditori - Vendi Schede Didattiche Scuola Primaria e Disegni da Colorare su Piattaforme Educative',
        subtitle: 'Monetizza la Tua Creatività Educativa',
        description: `Gli insegnanti imprenditori costruiscono attività vendendo schede didattiche su Teachers Pay Teachers. I pacchetti caccia al tesoro si vendono bene come attività pronte all'uso. Crea collezioni tematiche stagionali per vendite durante tutto l'anno. Pacchetti autunnali con zucche e foglie. Collezioni invernali con pupazzi di neve e fiocchi. Temi primaverili con fiori e farfalle per vendite di marzo-maggio.

Combina schede didattiche scuola primaria con disegni da colorare per prodotti premium. Offri versioni colorate e in bianco e nero in ogni pacchetto. Gli acquirenti apprezzano opzioni multiple per esigenze diverse. I disegni da colorare aumentano valore percepito senza lavoro extra. Imposta prezzi più alti per pacchetti combinati completi.

Crea prodotti differenziati con livelli di difficoltà multipli. Pacchetto base con indicazioni fondamentali per prezzi K-1. Pacchetto avanzato con indicazioni cardinali per grado 2-3. Vendi entrambi i livelli separatamente o come pacchetto bundle. Gli insegnanti acquistano livelli multipli per classi miste. La differenziazione aumenta potenziale clientela e vendite.`,
        quote: 'Ho costruito un business redditizio vendendo schede caccia al tesoro tematiche.',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Domande Frequenti sulle Schede Didattiche Caccia al Tesoro - Schede Didattiche Scuola Primaria',
    sectionDescription: 'Gli insegnanti pongono domande simili quando scoprono il generatore di schede caccia al tesoro. Queste risposte forniscono informazioni dettagliate sull\'abbonamento Accesso Completo. Ogni domanda affronta preoccupazioni comuni riguardo funzionalità e valore. Le risposte chiariscono cosa è incluso nel tuo abbonamento €240 annuale. Comprendi esattamente cosa ricevi prima di investire nella piattaforma.',
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
        question: 'Questo Generatore di Schede Didattiche Scuola Primaria Richiede Davvero Abbonamento Accesso Completo?',
        answer: `Il generatore di schede didattiche caccia al tesoro richiede abbonamento Accesso Completo che costa €240 annualmente o €25 mensili. Il tuo abbonamento ti dà creazione illimitata di schede senza costi per singola scheda. Genera quante schede didattiche scuola primaria hai bisogno senza costi aggiuntivi. Crea schede italiano classe prima, materiali di scuola dell'infanzia e attività per tutti i livelli di grado.

L'abbonamento Accesso Completo include tutti i 33 generatori di schede didattiche sulla piattaforma. Oltre alle schede caccia al tesoro, accedi a generatori di schede matematica, tabelline, alfabeto e altro. Genera disegni da colorare, attività di pregrafismo e numeri da stampare illimitati. Questa varietà completa supporta ogni materia e livello di grado che insegni.`,
      },
      {
        id: '2',
        question: 'Posso Stampare Schede Italiano Classe Prima e Pregrafismo su Stampante Normale di Casa?',
        answer: `Sì, stampa schede italiano classe prima e attività di pregrafismo su qualsiasi stampante domestica standard. Il formato PDF mantiene qualità perfetta su stampanti inkjet o laser. Le schede didattiche scaricano a 300 DPI di risoluzione professionale. Questa qualità alta garantisce testo nitido e immagini chiare su qualsiasi stampante. Stampa su carta standard formato Lettera o A4.

L'opzione scala di grigi risparmia inchiostro mantenendo qualità eccellente. Converti schede colorate in versioni stampabili in bianco e nero con un clic. Stampa 30 copie di schede pregrafismo senza consumare cartucce colorate costose. Gli studenti colorano immagini dopo completare attività di orientamento. Questa combinazione estende valore educativo risparmiando costi di stampa.`,
      },
      {
        id: '3',
        question: 'Ho Bisogno di Competenze di Design per Creare Schede Matematica, Tabelline e Disegni da Colorare?',
        answer: `No, non servono assolutamente competenze di design per creare schede matematica o tabelline. Il generatore gestisce tutta la complessità di design automaticamente. Clicca "Crea" e schede didattiche complete appaiono istantaneamente. Non è necessario capire progettazione grafica, layout o composizione. L'interfaccia è progettata per insegnanti, non designer professionisti.

Crea schede matematica personalizzate selezionando semplicemente temi numeri. Genera percorsi caccia al tesoro con numeri da stampare in secondi. Aggiungi problemi delle tabelline usando editor di testo semplice. Nessuna curva di apprendimento software complicata. Se puoi usare email, puoi creare schede didattiche professionali.`,
      },
      {
        id: '4',
        question: 'Posso Usare Schede Didattiche con Pregrafismo e Alfabeto nella Mia Classe di Scuola dell\'Infanzia?',
        answer: `Sì, l'abbonamento Accesso Completo include uso illimitato in classe per tutti i materiali generati. Crea schede didattiche con pregrafismo per i tuoi studenti di scuola dell'infanzia liberamente. Genera attività alfabeto per pratica di riconoscimento lettere quotidianamente. Stampa copie multiple per ogni bambino nella tua classe. Nessun costo per studente o limitazioni numeriche.

Usa schede pregrafismo per centri di apprendimento indipendenti durante l'anno. Genera percorsi caccia al tesoro con linee tratteggiate per pratica di tracciamento. Gli studenti di scuola dell'infanzia sviluppano controllo motorio fine seguendo percorsi. Questa combinazione pregrafismo-orientamento costruisce abilità multiple simultaneamente. Crea nuove schede settimanalmente mantenendo attività fresche.`,
      },
      {
        id: '5',
        question: 'In Quali Lingue Sono Disponibili le Schede Didattiche con Alfabeto e Tabelline?',
        answer: `Le schede didattiche sono disponibili in 11 lingue complete. Italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese e finlandese. Ogni lingua include istruzioni direzionali completamente tradotte. Genera schede italiano classe prima con vocabolario completamente in italiano.

Tutti i comandi e testo interfaccia appaiono nella lingua selezionata. Cambia lingua con menu a tendina per aggiornamento istantaneo. Le istruzioni "muovi su 3 passi" appaiono in italiano perfetto. Indicazioni cardinali "nord, sud, est, ovest" tradotte accuratamente. Ogni dettaglio linguistico suona naturale per parlanti nativi.`,
      },
      {
        id: '6',
        question: 'Posso Vendere Schede Matematica e Tabelline che Creo su Teachers Pay Teachers?',
        answer: `Sì, il tuo abbonamento Accesso Completo include licenza commerciale completa per stampa su richiesta. Vendi schede matematica e attività tabelline su Teachers Pay Teachers senza costi aggiuntivi. Crea negozi Etsy vendendo fogli di lavoro stampabili digitali. Pubblica libretti a basso contenuto su Amazon KDP. Nessuna attribuzione richiesta sui tuoi prodotti finali.

Genera inventario illimitato di prodotti schede matematica per vendita. Crea 50 schede tabelline diverse per pacchetto mega. Ogni scheda può essere venduta ripetutamente come prodotto digitale. Non ci sono royalty o costi per transazione oltre commissioni piattaforma. Il tuo abbonamento €240 copre diritti commerciali completi per tutti i materiali.`,
      },
      {
        id: '7',
        question: 'Come Personalizzo Schede Didattiche con Disegni da Colorare e Pregrafismo per i Miei Studenti?',
        answer: `L'editor canvas permette personalizzazione completa di ogni elemento sulla scheda didattica. Trascina immagini ovunque sulla griglia per disposizione preferita. Ridimensiona disegni da colorare trascinando bordi per enfasi. Aggiungi elementi di pregrafismo come linee tratteggiate tra oggetti. Ogni modifica avviene in tempo reale con anteprima immediata.

Aggiungi testo personalizzato usando strumenti di testo semplici. Crea intestazioni come "Caccia al Tesoro di Pregrafismo di Classe Prima". Modifica istruzioni per adattare livelli di lettura dei tuoi studenti. Cambia colori font, dimensioni e famiglie per preferenze visive. Gli studenti con bisogni speciali beneficiano di testo ingrandito o colori ad alto contrasto.`,
      },
      {
        id: '8',
        question: 'Per Quali Gruppi di Età Funzionano Schede Italiano Classe Prima con Alfabeto e Numeri da Stampare?',
        answer: `Le schede didattiche caccia al tesoro funzionano perfettamente per età 4-9 anni con difficoltà personalizzabile. Studenti di scuola dell'infanzia (4-6 anni) usano indicazioni base e griglie semplici. Schede italiano classe prima (6-7 anni) introducono istruzioni scritte più complesse. Studenti di classe seconda e terza (8-9 anni) gestiscono indicazioni cardinali e griglie larghe.

Usa temi alfabeto per studenti di scuola dell'infanzia e classe prima che imparano lettere. Griglie 3×3 semplici con lettere grandi sono appropriate per età 4-6. Studenti di classe prima seguono percorsi più lunghi trovando lettere dell'alfabeto in sequenza. Classe seconda combina riconoscimento alfabeto con abilità cartografiche usando indicazioni cardinali. Ogni livello di età progredisce in complessità naturalmente.`,
      },
      {
        id: '9',
        question: 'Posso Caricare Mie Immagini per Schede Didattiche con Tabelline e Schede Matematica?',
        answer: `Sì, carica immagini personalizzate per combinare con contenuto biblioteca in schede matematica. Il sistema supporta caricamento multi-file in formati JPEG, PNG e GIF. Le tue immagini appaiono immediatamente nell'area di anteprima. Clicca qualsiasi immagine caricata per aggiungerla alla selezione griglia. Usa per personalizzare schede tabelline con temi specifici classe.

Carica fotos di manipolativi matematici dalla tua classe. Crea percorsi caccia al tesoro attraverso blocchi base-dieci o contatori. Gli studenti connettono rappresentazioni concrete con pratica delle tabelline. Questa personalizzazione rende schede matematica più rilevanti per i tuoi studenti. Le immagini familiari aumentano coinvolgimento e comprensione.`,
      },
      {
        id: '10',
        question: 'Quanto Tempo Serve per Creare Schede Didattiche Scuola Primaria con Schede Matematica?',
        answer: `Meno di tre minuti per scheda completa. Seleziona tema, scegli tipo indicazioni, clicca genera. La scheda appare istantaneamente. Personalizza se desideri o scarica immediatamente. Risparmio del 90% rispetto alla creazione manuale. Stesso processo rapido per pregrafismo, alfabeto, tabelline, schede matematica e disegni da colorare.

Gli insegnanti della scuola dell'infanzia creano pacchetti settimanali completi in 20 minuti. Lunedì caccia al tesoro, martedì pregrafismo, mercoledì alfabeto, giovedì tabelline e schede matematica, venerdì disegni da colorare. Aggiungi numeri da stampare e schede italiano classe prima secondo necessità. Un'ora di lavoro produce materiale per settimane intere.`,
      },
      {
        id: '11',
        question: 'Le Schede Didattiche Includono Chiavi di Risposta per Schede Italiano Classe Prima?',
        answer: `Sì. Genera la chiave di risposta automaticamente con un clic. Il sistema crea un foglio separato mostrando il percorso corretto attraverso la griglia. Ogni oggetto ha la posizione chiaramente indicata. Risparmia tempo enorme durante la correzione. Nessuna necessità di risolvere percorsi manualmente. Perfetto per schede italiano classe prima e scuola dell'infanzia.

Le chiavi di risposta funzionano per tutti i tipi di schede. Pregrafismo, alfabeto, tabelline e schede matematica tutti includono soluzioni. Disegni da colorare non necessitano chiavi ma gli altri sì. Numeri da stampare con chiavi complete. Le maestre di scuola primaria apprezzano enormemente questa funzionalità. Correzione rapida significa più tempo per insegnamento.`,
      },
      {
        id: '12',
        question: 'Posso Creare Schede Didattiche su Materie Scolastiche Specifiche con Tabelline e Schede Matematica?',
        answer: `Sì. Combina schede caccia al tesoro con qualsiasi materia. Usa immagini di animali per scienze. Oggetti storici per storia. Forme geometriche per matematica. Strumenti musicali per educazione musicale. La biblioteca di 3000+ immagini copre tutte le materie della scuola dell'infanzia e scuola primaria.

Crea unità tematiche interdisciplinari. Combina caccia al tesoro con pregrafismo per sviluppo motorio integrato. Aggiungi alfabeto e lettere dell'alfabeto per literacy. Include tabelline e schede matematica per numeracy. Disegni da colorare per arte. Numeri da stampare per conteggio. Schede italiano classe prima collegano lingua e contenuti. Un generatore, infinite possibilità curriculari.`,
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
      'Tutti i 33 generatori inclusi',
      'Generatore schede caccia al tesoro incluso',
      'Creazione schede illimitata',
      'Licenza commerciale inclusa',
      '11 lingue supportate',
      '3000+ immagini tematiche',
      'Qualità stampa 300 DPI',
      'Chiavi di risposta automatiche',
    ],
    ctaText: 'Inizia Ora',
    guaranteeText: 'Garanzia soddisfatti o rimborsati 30 giorni',
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combina Schede Caccia al Tesoro con Altri Generatori',
    sectionDescription: 'L\'abbonamento Accesso Completo include 33 generatori. Combina il generatore di Schede Caccia al Tesoro con altri strumenti. Crea pacchetti completi di schede didattiche. Perfetto per unità tematiche. Ottimo per centri di apprendimento.',
    ctaTitle: 'Pronto a Creare Schede Straordinarie?',
    ctaDescription: 'Unisciti a migliaia di educatori che creano schede professionali. Generazione illimitata, licenza commerciale inclusa.',
    primaryCtaText: 'Inizia la Prova Gratuita',
    secondaryCtaText: 'Vedi Tutti i 33 Generatori',
    badgeText: 'Funziona Perfettamente Con',
    exploreText: 'Esplora tutte le applicazioni',
    trustBadges: {
      guarantee: 'Garanzia di rimborso 30 giorni',
      securePayment: 'Pagamento sicuro',
      cancelAnytime: 'Cancella quando vuoi',
    },
    items: [
      {
        id: '1',
        slug: 'pregrafismo-schede',
        name: 'Pregrafismo',
        category: 'Scrittura',
        icon: '✏️',
        description: 'Combina caccia al tesoro con esercizi di pregrafismo per sviluppo motorio completo.',
      },
      {
        id: '2',
        slug: 'abbinamenti-schede',
        name: 'Abbinamenti',
        category: 'Logica',
        icon: '🔗',
        description: 'Aggiungi abbinamenti per rafforzare le relazioni spaziali e logiche.',
      },
      {
        id: '3',
        slug: 'disegni-da-colorare',
        name: 'Disegni da Colorare',
        category: 'Arte e Creatività',
        icon: '🎨',
        description: 'Integra disegni da colorare per pacchetti di attività complete.',
      },
      {
        id: '4',
        slug: 'preposizioni-schede',
        name: 'Preposizioni',
        category: 'Concetti Spaziali',
        icon: '📍',
        description: 'Combina con preposizioni per rafforzare vocabolario spaziale.',
      },
      {
        id: '5',
        slug: 'percorso-illustrato-schede',
        name: 'Percorso Illustrato',
        category: 'Orientamento',
        icon: '🗺️',
        description: 'Aggiungi percorsi illustrati per attività di navigazione complete.',
      },
    ],
  },
};

export default treasureHuntItContent;
