import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crucipuzzle (Word Search) - Italian Content
 *
 * File: frontend/content/product-pages/it/cerca-parole-schede.ts
 * URL: /it/apps/cerca-parole-schede
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Italian/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'cerca-parole-schede',
    appId: 'word-search',
    title: 'Generatore di Crucipuzzle | Schede Didattiche Scuola Primaria Stampabili',
    description: 'Crea crucipuzzle professionali con il nostro generatore di schede didattiche. Genera schede didattiche scuola primaria illimitate per la scuola dell\'infanzia e la scuola primaria. Scarica schede didattiche PDF di alta qualità in meno di 3 minuti.',
    keywords: 'crucipuzzle, schede didattiche, scuola primaria, schede stampabili, generatore crucipuzzle, schede didattiche scuola primaria, schede italiano classe prima, pregrafismo, alfabeto, schede matematica',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/cerca-parole-schede',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Generatore di Crucipuzzle',
    subtitle: 'Schede Didattiche Scuola Primaria Stampabili',
    description: `Crea crucipuzzle professionali con il nostro generatore di schede didattiche. Il tuo abbonamento Pacchetto Essenziale ti permette di generare schede didattiche scuola primaria illimitate senza costi aggiuntivi per ogni foglio. Genera crucipuzzle stampabili personalizzati perfetti per la scuola dell'infanzia e la scuola primaria. Scarica schede didattiche PDF di alta qualità in meno di 3 minuti.

Il nostro generatore di crucipuzzle rende facile creare schede didattiche personalizzate per i tuoi studenti. Ogni crucipuzzle può includere immagini dalla nostra biblioteca di oltre 3000 elementi oppure le tue immagini caricate. Gli insegnanti della scuola primaria usano il nostro strumento per creare schede matematica, schede italiano classe prima, e attività di pregrafismo. Il generatore supporta 11 lingue diverse per contenuti multilingue e insegnamento ESL.

Le schede didattiche scuola primaria create con il nostro generatore sono stampabili immediatamente. Scarica in formato PDF o JPEG con qualità professionale 300 DPI. Ogni crucipuzzle generato può essere completamente modificato sulla tela digitale. Trascina elementi, ridimensiona immagini, cambia colori e font. Gli insegnanti della scuola dell'infanzia apprezzano la facilità di creare schede didattiche tematiche in pochi clic.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Esempi di Crucipuzzle',
    downloadLabel: 'Scarica Esempio Gratuito',
    worksheetLabel: 'Scheda',
    answerKeyLabel: 'Soluzioni',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Crucipuzzle formato verticale con immagini tematiche per pratica vocabolario scuola infanzia',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Crucipuzzle formato orizzontale con immagini colorate per scuola primaria',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Crucipuzzle con lista parole personalizzata per pratica ortografia',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Tutto il Necessario per Schede Didattiche Scuola Primaria',
    sectionDescription: 'Il nostro generatore di crucipuzzle include tutte le funzionalità necessarie per creare schede didattiche professionali. Ogni caratteristica è stata progettata pensando agli insegnanti. Genera schede didattiche scuola primaria in minuti invece di ore.',
    highlightBadgeText: 'Funzionalità Chiave',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Crea Schede Didattiche in 3 Clic',
        description: `La creazione di crucipuzzle è incredibilmente semplice con il nostro generatore. Seleziona un tema dalla nostra biblioteca. Clicca genera. Scarica la tua scheda didattica. Questi tre passaggi richiedono meno di 3 minuti. Gli insegnanti della scuola dell'infanzia apprezzano la velocità di creazione. Scegli tra oltre 50 temi educativi organizzati per materia. Ogni tema contiene immagini curate appropriate per l'età. Il generatore seleziona automaticamente 8 immagini e crea il crucipuzzle.

Le schede didattiche generate automaticamente sono pronte per la stampa immediata. Nessuna modifica richiesta se sei soddisfatto del risultato. Ogni crucipuzzle include la lista delle parole da cercare. Le immagini appaiono accanto alle parole corrispondenti. Questa associazione visiva aiuta gli studenti più giovani. La dimensione predefinita della griglia funziona perfettamente per la scuola dell'infanzia. Gli insegnanti risparmiano tempo prezioso usando la generazione automatica per attività quotidiane.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifica Schede sulla Tela Digitale',
        description: `Ogni crucipuzzle generato può essere completamente modificato sulla tela digitale. Clicca su qualsiasi elemento per selezionarlo. Trascina immagini per riposizionarle. Ridimensiona gli elementi trascinando gli angoli. Ruota le immagini per un orientamento perfetto. Elimina elementi che non desideri. Questa editabilità completa ti dà controllo totale sul design finale.

Le schede didattiche scuola primaria spesso richiedono personalizzazione per studenti diversi. Modifica le dimensioni del testo per studenti ipovedenti. Aumenta la dimensione delle immagini per principianti. Riduci la complessità della griglia per studenti con bisogni speciali. Cambia i colori per migliorare il contrasto. Ogni modifica avviene istantaneamente sulla tela. Vedi immediatamente i risultati delle tue modifiche.

Il sistema di annulla/ripristina protegge il tuo lavoro. Prova diverse disposizioni senza preoccuparti. Annulla fino a 50 azioni precedenti. Ripristina se cambi idea. Gli strumenti di allineamento aiutano a posizionare gli elementi con precisione. Porta elementi in primo piano o sullo sfondo. Organizza i livelli per un design professionale.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🌍',
        title: 'Crucipuzzle in 11 Lingue',
        description: `Il generatore supporta 11 lingue diverse per i contenuti. Crea crucipuzzle in italiano per schede italiano classe prima. Genera attività in inglese per lezioni ESL. Passa facilmente tra lingue diverse. Ogni immagine nella nostra biblioteca ha nomi in tutte le 11 lingue. Il sistema usa automaticamente la lingua selezionata per i nomi delle parole.

Questo supporto multilingue è perfetto per insegnanti di lingua straniera. Crea crucipuzzle per studenti che imparano inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, danese, svedese, norvegese o finlandese. Ogni crucipuzzle generato usa vocabolario nativo. Gli studenti imparano parole corrette nella loro lingua target. L'associazione di immagini e parole rafforza l'apprendimento del vocabolario.

Le scuole internazionali beneficiano enormemente di questa funzionalità. Crea materiali per programmi di immersione bilingue. Supporta studenti di lingua ereditaria con attività nella loro lingua madre. Gli insegnanti ESL usano crucipuzzle in più lingue per dimostrare cognati. La funzionalità multilingue distingue il nostro generatore come strumento veramente globale per l'educazione.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Carica Immagini Personalizzate',
        description: `Carica le tue immagini per schede didattiche completamente personalizzate. Clicca il pulsante di caricamento. Seleziona uno o più file immagine. Le tue immagini appaiono immediatamente nella biblioteca. Usa formati JPEG, PNG o GIF. Carica foto dei tuoi studenti per crucipuzzle personalizzati. Includi immagini specifiche per le tue lezioni.

Gli insegnanti caricano immagini per schede matematica con forme geometriche personalizzate. Crea crucipuzzle con vocabolario matematico specifico. Carica illustrazioni di concetti che stai insegnando. Combina immagini caricate con la nostra biblioteca. Gli insegnanti d'arte caricano disegni da colorare creati dagli studenti. Trasforma il lavoro degli studenti in attività di apprendimento.

Le immagini caricate rimangono disponibili durante la tua sessione. Riutilizza le stesse immagini per più crucipuzzle. Combina immagini caricate con immagini della biblioteca. Ogni immagine caricata si integra perfettamente nel flusso di lavoro. Il sistema ottimizza automaticamente le dimensioni delle immagini. Carica immagini ad alta risoluzione senza preoccupazioni.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licenza Commerciale Inclusa',
        description: `Il tuo abbonamento Pacchetto Essenziale include una licenza commerciale completa. Vendi schede didattiche che crei con il nostro generatore. Pubblica su Teachers Pay Teachers senza costi aggiuntivi. Apri un negozio Etsy per fogli stampabili. Crea libri di attività per Amazon KDP. La licenza copre tutti gli usi di stampa su richiesta.

Gli insegnanti vendono pacchetti di crucipuzzle con lettere dell'alfabeto per scuola dell'infanzia. Crea serie tematiche di attività per ogni lettera. Vendi crucipuzzle matematici con numeri e forme. Genera pacchetti di tabelline per studenti di scuola primaria. Ogni crucipuzzle che crei può essere venduto commercialmente. Nessuna attribuzione richiesta sui tuoi prodotti.

Questa licenza commerciale rappresenta un valore enorme rispetto ai concorrenti. Altri servizi addebitano 100-200 euro all'anno solo per i diritti commerciali. Il tuo abbonamento Pacchetto Essenziale di 144 euro include tutto. Crea prodotti illimitati. Vendili dove vuoi. Tieni tutti i profitti delle tue vendite. Gli insegnanti-imprenditori generano 500-5000 euro al mese vendendo schede didattiche create con il nostro generatore.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca di 3000+ Immagini',
        description: `Accedi a oltre 3000 immagini adatte ai bambini nella nostra biblioteca. Ogni immagine è stata selezionata per uso educativo. Trova immagini per qualsiasi materia o tema. Cerca per parola chiave per trovare esattamente ciò di cui hai bisogno. Filtra per tema per vedere collezioni curate. Tutte le immagini sono ottimizzate per la stampa in alta qualità.

La biblioteca include immagini complete per esercizi di pregrafismo. Trova forme, linee e modelli per lo sviluppo della motricità fine. Accedi a numeri da stampare da 0 a 100 in vari stili. Usa lettere dell'alfabeto maiuscole e minuscole. Ogni lettera disponibile in diversi font e stili. Le immagini coprono animali, cibo, trasporti, professioni, sport, natura e molto altro.

Le immagini sono organizzate per facilità d'uso. Sfoglia per categoria per ispirazione. Ogni tema contiene 15-30 immagini correlate. Combina immagini da temi diversi per crucipuzzle interdisciplinari. Tutte le immagini hanno nomi appropriati in 11 lingue. Nessun costo aggiuntivo per l'accesso alla biblioteca.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualità Professionale 300 DPI',
        description: `Ogni crucipuzzle viene esportato a 300 DPI per qualità professionale. Questa alta risoluzione garantisce testo nitido e immagini chiare. Stampa su qualsiasi stampante domestica o professionale. Le schede didattiche scuola primaria hanno un aspetto professionale, non fatto in casa. I genitori apprezzano la qualità visiva dei materiali.

Scegli tra formati PDF e JPEG per il download. I PDF mantengono la massima qualità per la stampa. I file JPEG funzionano bene per la condivisione digitale. L'opzione scala di grigi risparmia inchiostro mantenendo la qualità. Utile per classi che stampano molte copie. Ogni formato di esportazione mantiene la risoluzione 300 DPI.

La qualità professionale è essenziale per vendere schede didattiche. I clienti si aspettano immagini nitide e testo leggibile. La nostra esportazione 300 DPI soddisfa tutti gli standard di stampa commerciale. Carica direttamente su piattaforme di stampa su richiesta. Nessuna preoccupazione per la qualità dell'immagine o problemi di risoluzione.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Crea Schede Didattiche in 5 Semplici Passaggi',
    sectionDescription: 'Creare crucipuzzle professionali con il nostro generatore richiede meno di 3 minuti. Segui questi cinque passaggi per produrre schede didattiche scuola primaria di alta qualità. Non sono necessarie competenze di design. Non è richiesta esperienza tecnica.',
    ctaText: 'Inizia Ora',
    stepLabel: 'Passaggio',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Scegli il Contenuto per le Schede',
        description: `Il primo passaggio è selezionare il contenuto per il tuo crucipuzzle. Hai tre opzioni potenti per creare schede didattiche scuola primaria. Scegli un tema dalla nostra biblioteca per generazione automatica veloce. Seleziona immagini individuali per schede didattiche mirate alle tue lezioni. Carica le tue immagini personalizzate per contenuti completamente unici. Ogni metodo produce crucipuzzle professionali pronti per la stampa.

La selezione del tema è la più veloce. Clicca il menu a tendina "Tema". Sfoglia oltre 50 temi educativi organizzati per categoria. Seleziona "Animali della fattoria" per lezioni di scienze. Scegli "Lettere dell'alfabeto" per attività di alfabetizzazione. Prendi "Forme geometriche" per schede matematica.

La selezione individuale di immagini offre controllo preciso. Clicca il pulsante "Selezione immagini individuali". Filtra per tema per vedere immagini specifiche. Usa la barra di ricerca per trovare esattamente ciò di cui hai bisogno. Clicca fino a 8 immagini per aggiungerle al tuo crucipuzzle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personalizza le Impostazioni',
        description: `Il secondo passaggio personalizza le impostazioni del crucipuzzle per i tuoi studenti. Regola la dimensione della griglia per abbinare il livello di abilità. Modifica il formato della pagina per le tue esigenze di stampa. Attiva opzioni del puzzle per la difficoltà appropriata. Ogni impostazione ti dà controllo completo sul prodotto finale.

La dimensione della griglia determina la difficoltà del crucipuzzle. Le griglie più piccole sono più facili per i giovani studenti. Imposta 8×8 per la scuola dell'infanzia. Usa 10×10 per la prima classe. Prova 12×12 per studenti di seconda e terza classe. Le griglie più grandi creano puzzle più impegnativi.

Le opzioni del puzzle controllano la complessità della ricerca delle parole. Spunta "Consenti parole diagonali" per crucipuzzle standard. Attiva "Consenti parole inverse" per difficoltà extra. Disattiva queste opzioni per studenti principianti.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera la Scheda Didattica',
        description: `Il terzo passaggio genera il tuo crucipuzzle con un singolo clic. Clicca il grande pulsante "Genera Crucipuzzle". Il generatore crea il tuo puzzle in 2-3 secondi. L'anteprima appare istantaneamente sulla tela. Vedi esattamente come apparirà il tuo crucipuzzle stampato. La griglia mostra tutte le parole nascoste nelle lettere casuali.

Il processo di generazione è completamente automatico. L'algoritmo posiziona parole nella griglia rispettando le tue impostazioni. Le parole si incrociano naturalmente quando possibile. Gli spazi vuoti si riempiono con lettere casuali. Il layout professionale avviene istantaneamente.

La generazione automatica del tema produce crucipuzzle completi in un clic. Il sistema seleziona 8 immagini dal tema scelto. Crea nomi di parole dalla biblioteca di immagini. Posiziona parole nella griglia. Aggiunge immagini alla lista delle parole.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica sulla Tela',
        description: `Il quarto passaggio modifica il crucipuzzle generato sulla tela digitale. Questa editabilità completa distingue il nostro generatore dagli strumenti di base. Clicca su qualsiasi elemento per selezionarlo. Trascina per riposizionare. Ridimensiona trascinando gli angoli. Ruota usando la maniglia di rotazione. Elimina premendo il tasto Canc.

La modifica del testo permette personalizzazione completa della formattazione. Clicca sul titolo per modificare il testo. Cambia "Crucipuzzle" in "Cerca Parole di Matematica". Personalizza per la tua lezione specifica. Clicca su qualsiasi testo per modificare dimensione del font, famiglia di caratteri e colore.

La modifica delle immagini offre controllo completo del posizionamento. Trascina immagini nella lista delle parole per riorganizzarle. Ridimensiona immagini per enfasi. Ingrandisci immagini importanti. Ruota immagini per varietà visiva.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica e Stampa',
        description: `Il quinto passaggio scarica il tuo crucipuzzle finito per la stampa. Clicca il pulsante "Scarica PDF" per la massima qualità di stampa. Il file PDF mantiene la risoluzione 300 DPI completa. Stampa su qualsiasi stampante domestica o professionale. I colori appaiono vibranti e il testo rimane nitido.

L'opzione JPEG offre flessibilità per la condivisione digitale. Clicca "Scarica JPEG" per formato immagine. Condividi facilmente via email con i genitori. Carica su piattaforme di apprendimento digitale. I file JPEG mantengono la qualità 300 DPI per la stampa.

L'opzione scala di grigi risparmia inchiostro colorato mantenendo la qualità. Spunta "Scala di grigi" prima del download. Il crucipuzzle converte in nero e grigio. Stampa centinaia di copie senza esaurire le cartucce colorate.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfetto per Insegnanti, Genitori ed Educatori',
    sectionDescription: 'Il generatore di crucipuzzle serve educatori in contesti diversi. Gli insegnanti della scuola dell\'infanzia creano attività di pregrafismo. Gli insegnanti di scuola primaria generano schede matematica. I genitori homeschool producono disegni da colorare.',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Insegnanti della Scuola dell\'Infanzia',
        subtitle: 'Pregrafismo, Alfabeto e Attività di Alfabetizzazione Precoce',
        description: `Gli insegnanti della scuola dell'infanzia usano il generatore per creare attività di pregrafismo essenziali. I crucipuzzle sviluppano abilità di riconoscimento visivo necessarie per la lettura. I giovani studenti scansionano la griglia cercando lettere dell'alfabeto. Questa pratica rafforza il riconoscimento delle lettere. Le immagini nel crucipuzzle forniscono indizi visivi per parole.

Le attività di pregrafismo preparano gli studenti per la scrittura. Cerchiare parole trovate sviluppa il controllo motorio fine. Tracciare da lettera a lettera migliora la coordinazione occhio-mano. Gli insegnanti creano crucipuzzle con lettere dell'alfabeto grandi e chiare.

I temi della scuola dell'infanzia funzionano perfettamente con il generatore. Crea crucipuzzle su "Animali della fattoria" per unità scientifiche. Genera puzzle di "Colori e forme" per riconoscimento visivo. Produce attività "Lettere dell'alfabeto" per pratica settimanale di ogni lettera.`,
        quote: 'I miei studenti adorano trovare le immagini nascoste!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Insegnanti di Scuola Primaria',
        subtitle: 'Schede Matematica, Tabelline e Numeri da Stampare',
        description: `Gli insegnanti di scuola primaria creano schede matematica usando crucipuzzle tematici. Genera puzzle con numeri da stampare da 1-100. Gli studenti cercano numeri nella griglia per la pratica di riconoscimento. Crea crucipuzzle di "Forme geometriche" per vocabolario matematico.

I crucipuzzle con tabelline offrono pratica di moltiplicazione coinvolgente. Usa liste di parole personalizzate per fatti di moltiplicazione. Scrivi "DUE PER TRE", "DUE PER QUATTRO", "DUE PER CINQUE" come parole. Gli studenti trovano ogni fatto di moltiplicazione nella griglia.

Le schede matematica con elementi visivi migliorano la comprensione concettuale. Carica immagini di manipolativi matematici. Includi blocchi base dieci, frazioni circolari, forme di pattern. Crea crucipuzzle combinando numeri da stampare con rappresentazioni visive.`,
        quote: 'I crucipuzzle rendono la pratica di ortografia un gioco.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Genitori Homeschool',
        subtitle: 'Schede Didattiche e Disegni da Colorare per Apprendimento a Casa',
        description: `I genitori homeschool apprezzano la velocità di creazione di schede didattiche. Insegni tre figli a livelli diversi simultaneamente. Genera crucipuzzle appropriati per ogni età in minuti. Crea puzzle 8×8 facile per il bambino di 5 anni. Genera griglia 12×12 media per il bambino di 7 anni.

La combinazione di crucipuzzle e disegni da colorare crea pacchetti di apprendimento completi. Genera un crucipuzzle su "Animali della giungla". Scarica fogli di disegni da colorare degli stessi animali dalla nostra biblioteca. Il bambino completa il crucipuzzle poi colora le immagini abbinate.

Le schede didattiche personalizzate si adattano agli interessi dei bambini. Tuo figlio ama i dinosauri. Carica immagini di dinosauri dal suo libro preferito. Crea crucipuzzle con nomi di dinosauri specifici. L'interesse personale aumenta il coinvolgimento.`,
        quote: 'Uno strumento copre tutti i livelli dei miei figli.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Insegnanti ESL e Lingua Straniera',
        subtitle: 'Crucipuzzle Multilingue per Acquisizione Vocabolario',
        description: `Gli insegnanti ESL sfruttano il supporto di 11 lingue del generatore. Insegni inglese a studenti di lingua italiana. Crea crucipuzzle identici in italiano e inglese. Gli studenti completano prima la versione italiana per fiducia. Poi affrontano la versione inglese con vocabolario familiare.

I crucipuzzle tematici costruiscono campi semantici in lingua straniera. Crea serie di "Cibo" con frutti, verdure, bevande. Genera puzzle di "Abbigliamento" con indumenti e accessori. Produce attività di "Famiglia" con termini di parentela.

Le scuole internazionali usano crucipuzzle per programmi di immersione bilingue. Lunedì: crucipuzzle in italiano. Martedì: stesso tema in inglese. Mercoledì: tedesco. Giovedì: francese. Venerdì: scelta dello studente di lingua.`,
        quote: 'Il supporto multilingue è essenziale per il mio programma bilingue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Insegnanti di Sostegno',
        subtitle: 'Schede Italiano Classe Prima e Materiali Differenziati',
        description: `Gli insegnanti di sostegno personalizzano schede italiano classe prima per studenti con bisogni diversi. Carica foto dello studente per motivazione personale. Includi immagini di oggetti familiari dall'ambiente domestico dello studente. Usa lettere dell'alfabeto extra grandi per studenti ipovedenti.

I crucipuzzle con alfabeto aiutano studenti che lottano con il riconoscimento delle lettere. Crea puzzle singola lettera per pratica focalizzata. Genera griglia con solo la lettera A ripetuta. Lo studente la trova ogni volta che appare. Passa alla lettera B dopo il successo.

La modifica manuale dei nomi delle immagini supporta obiettivi IEP specifici. Uno studente sta lavorando su parole CVC. Seleziona 8 immagini dalla biblioteca. Modifica ogni nome a struttura CVC: GATTO, CANE, SOLE, MARE.`,
        quote: 'Posso adattare rapidamente le schede per ogni studente.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Insegnanti-Imprenditori',
        subtitle: 'Vendere Schede Didattiche su Teachers Pay Teachers',
        description: `Gli insegnanti-imprenditori usano il generatore per creare prodotti vendibili. La licenza commerciale Pacchetto Essenziale copre tutte le vendite di stampa su richiesta. Crea pacchetti di crucipuzzle a tema per Teachers Pay Teachers. Genera 20 crucipuzzle su "Animali dell'oceano".

I negozi Etsy prosperano con schede didattiche stampabili. Genera serie di crucipuzzle stagionali. Crea 12 puzzle a tema autunnale. Produce 12 design invernali. Sviluppa 12 attività primaverili. Genera 12 crucipuzzle estivi. Elenca ogni serie separatamente su Etsy.

Amazon KDP permette pubblicazione di libri di crucipuzzle. Crea 100 crucipuzzle a tema educativo. Organizza per difficoltà crescente. Aggiungi pagina di titolo e istruzioni. Esporta ogni pagina come PDF 300 DPI. Carica su KDP come libro di attività.`,
        quote: 'Il mio abbonamento si è ripagato nel primo mese!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Domande Frequenti',
    sectionDescription: 'Tutto quello che devi sapere sul nostro generatore di crucipuzzle.',
    showMoreText: 'Mostra altre domande',
    showLessText: 'Mostra meno',
    items: [
      {
        id: '1',
        question: 'Questo generatore di schede didattiche è gratuito da usare?',
        answer: 'Il generatore di crucipuzzle richiede un abbonamento Pacchetto Essenziale che costa 144 euro annualmente o 15 euro mensili. Il tuo abbonamento ti dà creazione illimitata di crucipuzzle senza costi per foglio. Genera tutte le schede didattiche scuola primaria di cui hai bisogno senza costi aggiuntivi. Nessun limite sul numero di crucipuzzle creati. Nessun limite sul numero di download.',
      },
      {
        id: '2',
        question: 'Posso stampare schede didattiche a casa su una stampante normale?',
        answer: 'Sì. Tutte le schede didattiche scaricano come file PDF o JPEG ottimizzati per la stampa domestica. Stampa su qualsiasi stampante inkjet o laser standard. I formati Letter e A4 si adattano a stampanti comuni. La qualità 300 DPI garantisce testo nitido e immagini chiare. L\'opzione scala di grigi risparmia inchiostro colorato mantenendo la qualità.',
      },
      {
        id: '3',
        question: 'Ho bisogno di competenze di design per creare schede didattiche?',
        answer: 'No. Il generatore non richiede competenze di design per creare schede didattiche o crucipuzzle. Clicca tre pulsanti: seleziona tema, genera, scarica. Il sistema gestisce automaticamente tutto il design professionale. Nessuna conoscenza di software di grafica necessaria. Gli insegnanti senza competenze tecniche creano materiali dall\'aspetto professionale facilmente.',
      },
      {
        id: '4',
        question: 'Posso usare crucipuzzle e schede didattiche nella mia classe?',
        answer: 'Sì. L\'abbonamento Pacchetto Essenziale include uso in classe illimitato per schede didattiche con pregrafismo e alfabeto. Stampa copie per tutti i tuoi studenti. Condividi con colleghi nel tuo edificio scolastico. Usa materiali per istruzione in classe, compiti, centri di apprendimento. Nessuna limitazione su utilizzo educativo.',
      },
      {
        id: '5',
        question: 'Quali lingue sono disponibili per le schede didattiche?',
        answer: 'Le schede didattiche sono disponibili in 11 lingue per contenuti multilingue. Crea schede italiano classe prima in italiano. Genera materiali in inglese, tedesco, francese, spagnolo, portoghese, olandese, danese, svedese, norvegese o finlandese. Ogni immagine nella biblioteca ha nomi in tutte le lingue supportate.',
      },
      {
        id: '6',
        question: 'Posso vendere le schede didattiche che creo?',
        answer: 'Sì. L\'abbonamento Pacchetto Essenziale include licenza commerciale completa di stampa su richiesta. Vendi schede didattiche su Teachers Pay Teachers. Crea pacchetti per Etsy. Pubblica libri di attività su Amazon KDP. La licenza copre tutte le piattaforme di vendita online. Nessun costo aggiuntivo per diritti commerciali.',
      },
      {
        id: '7',
        question: 'Come personalizzo le schede didattiche per studenti diversi?',
        answer: 'Personalizza schede didattiche modificando dimensioni griglia, difficoltà e contenuto. Riduci dimensioni griglia a 8×8 per studenti in difficoltà. Aumenta a 16×16 per studenti avanzati. Disabilita parole diagonali e inverse per principianti. Carica immagini personalizzate per interessi specifici degli studenti. Modifica dimensioni font per studenti ipovedenti.',
      },
      {
        id: '8',
        question: 'Quali fasce d\'età funzionano meglio con i crucipuzzle?',
        answer: 'Le schede didattiche con pregrafismo funzionano meglio per bambini di 4-6 anni. I crucipuzzle sviluppano abilità di riconoscimento visivo necessarie per la lettura. Gli studenti di scuola primaria dalla prima alla terza classe beneficiano di crucipuzzle più complessi con griglie più grandi e parole più difficili. Il generatore si adatta a tutte le età regolando impostazioni.',
      },
      {
        id: '9',
        question: 'Posso caricare le mie immagini per crucipuzzle personalizzati?',
        answer: 'Sì. Carica le tue immagini per creare schede didattiche completamente personalizzate. Clicca il pulsante caricamento. Seleziona file JPEG, PNG o GIF. Le tue immagini appaiono nella biblioteca. Usa con immagini della nostra biblioteca o da sole. Carica foto degli studenti, manipolativi matematici o illustrazioni specifiche per le tue lezioni.',
      },
      {
        id: '10',
        question: 'Quanto tempo serve per creare una scheda didattica?',
        answer: 'Creare schede didattiche richiede meno di 3 minuti. Seleziona tema con lettere dell\'alfabeto. Clicca genera. Scarica. Tre passaggi semplici producono crucipuzzle professionale. La selezione di immagini individuali aggiunge 2-3 minuti. Anche con personalizzazione completa, i crucipuzzle finiscono in 10 minuti.',
      },
      {
        id: '11',
        question: 'Le schede didattiche includono fogli delle risposte?',
        answer: 'Sì. Tutti i crucipuzzle includono opzione foglio delle risposte. Clicca "Scarica Foglio delle Risposte" dopo generazione. Ricevi versione con tutte le parole evidenziate nella griglia. Usa per correzione rapida. Condividi con assistenti didattici. I fogli delle risposte corrispondono esattamente al crucipuzzle dello studente.',
      },
      {
        id: '12',
        question: 'Posso creare crucipuzzle su materie scolastiche specifiche?',
        answer: 'Sì. Crea schede didattiche su materie specifiche usando temi mirati e liste di parole personalizzate. Genera crucipuzzle di tabelline con fatti di moltiplicazione. Usa temi matematici per vocabolario geometrico. Carica immagini di concetti scientifici che stai insegnando. Ogni argomento diventa attività coinvolgente di crucipuzzle.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pacchetto Essenziale',
    price: '€144',
    priceInterval: '/anno',
    priceSuffix: 'Fatturato annualmente',
    benefits: [
      'Creazione schede illimitata',
      'Licenza commerciale inclusa',
      '11 lingue supportate',
      '3000+ immagini tematiche',
      'Qualità stampa 300 DPI',
      'Soluzioni incluse',
    ],
    ctaText: 'Inizia Ora',
    guaranteeText: 'Garanzia soddisfatti o rimborsati 30 giorni',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combina con Altri Generatori di Schede',
    sectionDescription: 'Crea pacchetti di apprendimento completi combinando crucipuzzle con questi generatori complementari.',
    ctaTitle: 'Pronto a Creare Schede Straordinarie?',
    ctaDescription: 'Unisciti a migliaia di educatori che creano schede professionali. Generazione illimitata, licenza commerciale inclusa.',
    primaryCtaText: 'Inizia la Prova Gratuita',
    secondaryCtaText: 'Vedi Tutti i 33 Generatori',
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Cruciverba',
        category: 'Lingua e Lettura',
        icon: '📝',
        description: 'Completa i crucipuzzle con cruciverba usando gli stessi temi di vocabolario per pratica completa delle parole.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Parole Mescolate',
        category: 'Lingua e Lettura',
        icon: '🔤',
        description: 'Abbina crucipuzzle con puzzle di parole mescolate per rinforzare ortografia e vocabolario da angoli diversi.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Indovina la Parola',
        category: 'Lingua e Lettura',
        icon: '❓',
        description: 'Aggiungi attività di indovinare parole ai tuoi centri di alfabetizzazione insieme ai crucipuzzle per pratica variata.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Criptogrammi',
        category: 'Logica',
        icon: '🔐',
        description: 'Sfida gli studenti con puzzle di decodifica che sviluppano pensiero logico e riconoscimento di pattern di lettere.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Disegni da Colorare',
        category: 'Arte e Creatività',
        icon: '🎨',
        description: 'Premia crucipuzzle completati con pagine da colorare tematiche che sviluppano motricità fine.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Treno dell\'Alfabeto',
        category: 'Apprendimento Precoce',
        icon: '🚂',
        description: 'Bilancia la pratica dei crucipuzzle con attività di riconoscimento lettere per alfabetizzazione precoce completa.',
      },
    ],
  },
};

export default wordSearchItContent;
