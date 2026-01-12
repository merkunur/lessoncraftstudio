import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - Italian Content (Percorso Illustrato / Labirinti)
 *
 * File: frontend/content/product-pages/it/percorso-illustrato-schede.ts
 * URL: /it/apps/percorso-illustrato-schede
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Italian/picture-path.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * NOTE: This is a FULL ACCESS app ($240/year = €240/anno)
 */

export const picturePathItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'percorso-illustrato-schede',
    appId: 'picture-path',
    title: 'Generatore di Labirinti e Percorsi | Schede Didattiche Scuola dell\'Infanzia e Primaria',
    description: 'Crea schede didattiche di percorsi e labirinti con immagini per la scuola dell\'infanzia e scuola primaria. Tre modalità di gioco: Percorso Illustrato, Labirinto Classico, Scegli il Percorso Giusto. Scarica schede didattiche PDF in meno di 3 minuti.',
    keywords: 'schede didattiche labirinti, percorso illustrato, schede pregrafismo, schede scuola infanzia, schede scuola primaria, labirinti bambini, schede didattiche PDF, generatore labirinti, attività logica bambini',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/percorso-illustrato-schede',
  },

  // Hero Section
  hero: {
    title: 'Generatore di Schede Didattiche Percorsi e Labirinti',
    subtitle: 'Tre Modalità di Gioco per Scuola dell\'Infanzia e Primaria',
    description: `Crea schede didattiche di percorsi e labirinti con immagini per la scuola dell'infanzia e scuola primaria. Il tuo abbonamento Accesso Completo ti dà accesso illimitato alla creazione di schede didattiche senza costi aggiuntivi per ogni scheda. Genera schede didattiche personalizzate perfette per bambini in età prescolare e della primaria. Scarica schede didattiche in PDF di alta qualità in meno di 3 minuti.

Il nostro generatore di schede didattiche offre tre modalità di gioco diverse. La modalità Percorso Illustrato crea schede dove i bambini seguono un percorso attraverso immagini, perfetta per schede pregrafismo e logica visiva. La modalità Labirinto Classico genera schede con labirinti tradizionali dove lungo il percorso corretto ci sono immagini da raccogliere. La modalità Scegli il Percorso Giusto crea schede con percorsi multipli dove solo uno è corretto.

Ogni modalità di gioco ti permette di creare schede didattiche completamente personalizzate. Scegli le immagini dalla nostra biblioteca di oltre 3000 immagini. Carica le tue immagini personali per schede didattiche tematiche. Modifica dimensioni della griglia, colori, e ogni elemento visivo. Perfetto per insegnanti che creano schede didattiche scuola dell'infanzia personalizzate.`,
    previewImageSrc: '/samples/english/picture path/picture path.jpeg',
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
    sectionTitle: 'Esempi di Schede Didattiche Percorsi e Labirinti',
    sectionDescription: 'Scarica esempi gratuiti per vedere la nostra qualità professionale',
    downloadLabel: 'Scarica Esempio Gratuito',
    worksheetLabel: 'Scheda',
    answerKeyLabel: 'Soluzioni',
    viewAllLabel: 'Ingrandisci',
    noPdfLabel: 'Solo anteprima',
    freePdfCountLabel: 'download gratuiti',
    badgeText: 'Esempi Gratuiti',
    downloadingLabel: 'Scaricamento...',
    ofLabel: 'di',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/picture path/picture path.jpeg',
        answerKeySrc: '/samples/english/picture path/picture path answer_key.jpeg',
        altText: 'Scheda didattica percorso illustrato con immagini per scuola infanzia',
        pdfDownloadUrl: '/samples/english/picture path/picture path.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/picture path/classic maze.jpeg',
        answerKeySrc: '/samples/english/picture path/classic maze answer_key.jpeg',
        altText: 'Scheda didattica labirinto classico per scuola primaria',
        pdfDownloadUrl: '/samples/english/picture path/classic maze.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/picture path/right path.jpeg',
        answerKeySrc: '/samples/english/picture path/right path answer_key.jpeg',
        altText: 'Scheda didattica scegli il percorso giusto per bambini',
        pdfDownloadUrl: '/samples/english/picture path/right path.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Funzionalità del Generatore di Schede Didattiche',
    sectionDescription: 'Il nostro generatore di schede didattiche offre funzionalità complete per insegnanti. Crea schede didattiche scuola primaria in pochi clic. Genera schede didattiche scuola dell\'infanzia personalizzate. Ogni funzionalità è progettata per facilitare il lavoro quotidiano degli insegnanti. L\'abbonamento Accesso Completo include accesso illimitato a tutti gli strumenti.',
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
        title: 'Crea Schede Didattiche Scuola dell\'Infanzia in 3 Clic',
        description: `Crea schede didattiche scuola dell'infanzia in meno di 3 minuti. Scegli la modalità di gioco che preferisci. Seleziona le immagini dalla biblioteca o carica le tue. Genera immediatamente la scheda didattica completa. Non servono competenze di design grafico o informatica. Perfetto per maestre della scuola dell'infanzia che hanno poco tempo. Ogni scheda didattica è pronta per la stampa o la condivisione digitale.

Il generatore crea automaticamente percorsi ben bilanciati. I labirinti hanno sempre una soluzione unica. La difficoltà è calibrata per l'età dei bambini. Le immagini sono posizionate in modo ottimale sulla pagina. Ottieni schede didattiche professionali senza sforzo manuale.

Dopo la generazione iniziale, personalizza completamente la scheda. Aggiungi testo, cambia colori, modifica il layout. Ogni elemento sulla tela è modificabile. Crea schede didattiche uniche per ogni lezione. L'abbonamento Accesso Completo include creazione illimitata senza costi per singola scheda.`,
        icon: '⚡',
        highlighted: true,
      },
      {
        id: '2',
        title: 'Modifica Completa sulla Tela Interattiva',
        description: `Ogni elemento delle schede didattiche scuola primaria è completamente modificabile. Trascina, ruota, ridimensiona qualsiasi immagine o testo sulla tela. Cambia i colori delle pareti del labirinto. Modifica lo spessore delle linee del percorso. Aggiungi o rimuovi immagini decorative in qualsiasi momento. Sposta il punto di partenza e arrivo dove preferisci.

La tela interattiva ti dà controllo totale sul design. Allinea gli elementi con strumenti di allineamento precisi. Porta gli oggetti in primo piano o sullo sfondo. Blocca elementi che non vuoi modificare accidentalmente. Ogni scheda didattica diventa unica secondo le tue esigenze didattiche.

I controlli di livello permettono di organizzare gli elementi. Seleziona più oggetti e allineali a sinistra, centro o destra. Allinea in alto, centro o basso verticalmente. Questi strumenti professionali garantiscono schede didattiche dall'aspetto pulito e organizzato.`,
        icon: '✏️',
        highlighted: false,
      },
      {
        id: '3',
        title: 'Carica Immagini Personalizzate',
        description: `Carica le tue immagini personali per creare schede didattiche tematiche. Usa foto degli alunni per percorsi personalizzati. Carica disegni da colorare per combinarli con i labirinti. Importa simboli specifici per le tue unità didattiche. Il sistema accetta tutti i formati immagine comuni: JPEG, PNG, GIF.

Combina immagini della biblioteca con le tue foto. Crea schede didattiche completamente personalizzate per ogni bambino. Perfetto per progetti su temi specifici o festività. Carica immagini di animali, piante, oggetti della vita quotidiana.

Le immagini caricate funzionano come immagini di partenza, arrivo, percorso, distrattori o decorazioni. Nessun limite al numero di immagini che puoi caricare. Ogni immagine caricata può essere modificata come le immagini della libreria.`,
        icon: '📤',
        highlighted: false,
      },
      {
        id: '4',
        title: 'Schede Didattiche in 11 Lingue',
        description: `Il generatore supporta 11 lingue complete per l'interfaccia e i contenuti. Crea schede didattiche con alfabeto italiano per la classe prima. Genera percorsi con lettere dell'alfabeto in inglese per lezioni di lingua straniera. Usa lettere dell'alfabeto francese, tedesco, spagnolo per classi multilingue. Perfetto per scuole internazionali e programmi bilingue.

La biblioteca di immagini include alfabeto completo in ogni lingua. Ogni lettera dell'alfabeto è disponibile come immagine separata. Crea percorsi dove i bambini seguono l'ordine alfabetico. Genera labirinti dove raccolgono lettere dell'alfabeto specifiche.

Le 11 lingue supportate sono: italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese, finlandese. Ideale per insegnanti di lingue straniere e programmi ESL.`,
        icon: '🌍',
        highlighted: false,
      },
      {
        id: '5',
        title: 'Licenza Commerciale Inclusa',
        description: `L'abbonamento Accesso Completo include licenza commerciale print-on-demand completa senza costi aggiuntivi. Vendi le tue schede didattiche su Teachers Pay Teachers, Etsy, Amazon KDP. Nessun costo aggiuntivo per la licenza commerciale. Crea schede matematica con numeri e operazioni da vendere. Genera schede tabelline per pacchetti didattici commerciali.

Molti insegnanti guadagnano 500-5000 euro al mese vendendo schede didattiche online. La licenza include il diritto di vendere prodotti stampati. Non serve attribuzione o menzione della piattaforma. Qualità professionale 300 DPI perfetta per la stampa commerciale.

Crea collezioni tematiche di schede didattiche da vendere come pacchetti. Il mercato italiano delle risorse didattiche digitali è in forte crescita. L'abbonamento Accesso Completo si ripaga rapidamente con le vendite.`,
        icon: '📜',
        highlighted: false,
      },
      {
        id: '6',
        title: 'Libreria di 3000+ Immagini',
        description: `Accedi a oltre 3000 immagini organizzate per temi. La biblioteca include numeri da stampare da 0 a 100. Simboli matematici per operazioni aritmetiche. Immagini tematiche per ogni argomento didattico. Animali, piante, forme geometriche, oggetti della vita quotidiana. Tutti inclusi nel tuo abbonamento senza costi extra per immagine.

Usa numeri da stampare per creare percorsi matematici. I bambini seguono il percorso raccogliendo numeri in ordine crescente. Genera labirinti con simboli matematici da riconoscere. Combina numeri e operazioni per schede matematica avanzate.

La funzione di ricerca trova rapidamente le immagini necessarie. Ogni tema è visualmente coerente per schede didattiche professionali. Organizzate per categorie per selezione rapida e intuitiva.`,
        icon: '🖼️',
        highlighted: false,
      },
      {
        id: '7',
        title: 'Qualità Professionale 300 DPI',
        description: `Esporta schede didattiche in formato PDF o JPEG a 300 DPI. Qualità professionale perfetta per la stampa. Le schede italiano classe prima mantengono nitidezza dei dettagli. Le attività di pregrafismo hanno linee perfettamente definite. Stampa a casa su stampante normale senza perdita di qualità. Porta le schede in copisteria per stampe professionali.

L'opzione scala di grigi risparmia inchiostro per la stampa domestica. Converti automaticamente schede didattiche a colori in bianco e nero. Perfetto per schede pregrafismo da far colorare ai bambini. Le linee restano nitide anche in scala di grigi.

Scarica schede didattiche immediatamente dopo la creazione. Nessun watermark sulle schede didattiche con abbonamento Accesso Completo. Download illimitato senza restrizioni.`,
        icon: '✨',
        highlighted: false,
      },
    ],
  },

  // How-To Guide Section
  howTo: {
    sectionTitle: 'Come Creare Schede Didattiche in 5 Passaggi Semplici',
    sectionDescription: 'Crea schede didattiche scuola primaria professionali in meno di 3 minuti. Segui questi 5 passaggi semplici per generare schede didattiche scuola dell\'infanzia personalizzate. Non servono competenze tecniche o di design.',
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
        title: 'Scegli Modalità e Contenuto',
        description: `Inizia selezionando la modalità di gioco. Scegli tra Percorso Illustrato, Labirinto Classico, o Scegli il Percorso Giusto. Ogni modalità crea schede didattiche scuola dell'infanzia con obiettivi didattici diversi. Il Percorso Illustrato è perfetto per schede pregrafismo e sviluppo logico. Il Labirinto Classico funziona benissimo per schede matematica con numeri da stampare da raccogliere.

Poi seleziona le immagini per la tua scheda didattica. Usa la funzione tema per scegliere gruppi di immagini coerenti. Perfetto per schede didattiche scuola primaria tematiche su animali, stagioni, festività. Oppure seleziona immagini singole dalla biblioteca di 3000+ opzioni.

Per schede alfabeto e lettere dell'alfabeto, seleziona le lettere dalla biblioteca. Crea percorsi dove i bambini seguono l'ordine alfabetico. Genera labirinti dove raccolgono specifiche lettere dell'alfabeto. Ideale per schede italiano classe prima.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personalizza Impostazioni',
        description: `Configura le impostazioni della pagina. Scegli formato Lettera o A4, verticale o orizzontale. Il formato verticale funziona bene per schede didattiche scuola primaria standard. Il formato orizzontale è ottimo per percorsi più lunghi e complessi. Puoi anche creare formati quadrati o dimensioni personalizzate.

Per la modalità Labirinto Classico, imposta dimensione griglia. Le griglie 12×12 sono perfette per schede didattiche scuola dell'infanzia. Le griglie 15×15 offrono più sfida per schede didattiche scuola primaria. Scegli quante immagini da raccogliere lungo il percorso.

Personalizza l'aspetto del labirinto. Cambia colore delle pareti per abbinarle a temi specifici. Usa pareti rosse per schede didattiche natalizie. Scegli verde per temi primaverili. Regola spessore delle linee per schede pregrafismo più evidenti.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera la Scheda Didattica',
        description: `Clicca il pulsante Crea Nuova Scheda. Il generatore crea istantaneamente la scheda didattica completa. Per schede matematica con numeri da stampare, i numeri appaiono automaticamente lungo il percorso. Per schede alfabeto, le lettere dell'alfabeto sono posizionate strategicamente nel labirinto.

La generazione è completamente automatica. Il sistema crea percorsi bilanciati e risolvibili. Le immagini distrattori sono distribuite in modo intelligente. Il percorso corretto ha sempre una soluzione unica. Non devi mai preoccuparti di labirinti impossibili o troppo facili.

Ogni generazione crea una scheda didattica unica. Rigenera per varianti dello stesso tema. Perfetto per creare più versioni per valutazioni individuali. Ottimo per generare pacchetti di schede didattiche scuola primaria su un argomento.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica sulla Tela',
        description: `La tela interattiva ti permette modifiche complete. Trascina qualsiasi elemento per riposizionarlo. Ridimensiona immagini per enfasi visiva. Ruota elementi per layout più dinamici. Ogni modifica è immediata e visibile in tempo reale.

Aggiungi testo personalizzato alle schede didattiche scuola dell'infanzia. Scrivi istruzioni specifiche in italiano. Inserisci domande per schede italiano classe prima. Aggiungi operazioni matematiche per schede matematica. Cambia font e dimensione per leggibilità ottimale.

Per schede pregrafismo, aggiungi linee guida tratteggiate. Inserisci frecce direzionali per indicare dove iniziare. Aggiungi simboli visivi per istruzioni non verbali. Perfetto per bambini che non leggono ancora.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica e Stampa',
        description: `Quando la scheda didattica è perfetta, scaricala immediatamente. Scegli formato PDF per qualità massima. Il PDF mantiene risoluzione 300 DPI perfetta. Ideale per stampare schede didattiche scuola primaria professionali. Ottimo per schede italiano classe prima da distribuire in classe.

Oppure scarica in formato JPEG per condivisione digitale. Perfetto per caricare su piattaforme didattiche online. Ideale per inviare schede didattiche scuola dell'infanzia ai genitori via email. Utile per creare presentazioni con schede didattiche integrate.

Scarica anche la chiave delle risposte. La chiave mostra il percorso corretto evidenziato. Essenziale per correggere rapidamente. Usa l'opzione scala di grigi per risparmiare inchiostro.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section
  useCases: {
    sectionTitle: 'Perfetto per Insegnanti, Genitori ed Educatori',
    sectionDescription: 'Il generatore di schede didattiche serve diversi gruppi di educatori. Ogni gruppo trova valore unico nelle funzionalità offerte. Dalle maestre della scuola dell\'infanzia agli insegnanti di sostegno. Dai genitori homeschool agli insegnanti imprenditori.',
    badgeText: 'Chi Usa le Nostre Schede',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Maestre Scuola dell\'Infanzia',
        subtitle: 'Schede Pregrafismo e Disegni da Colorare per Bambini Piccoli',
        description: `Le maestre della scuola dell'infanzia usano il generatore per attività di pregrafismo quotidiane. I percorsi illustrati sviluppano coordinazione occhio-mano. I labirinti semplici preparano alla scrittura. Perfetto per bambini di 3-6 anni che stanno sviluppando motricità fine. Le schede pregrafismo create sono calibrate per mani piccole.

Combina percorsi con disegni da colorare per attività complete. I bambini seguono il percorso poi colorano le immagini trovate. Ideale per centri di apprendimento autonomo. Le schede didattiche scuola dell'infanzia tengono i bambini impegnati per 15-20 minuti.

Crea temi stagionali per la scuola dell'infanzia. Percorsi autunnali con foglie e zucche. Labirinti invernali con pupazzi di neve. Schede pregrafismo primaverili con fiori e farfalle. I disegni da colorare tematici mantengono alto l'interesse dei bambini.`,
        quote: 'I bambini adorano seguire i percorsi e trovare le immagini!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Insegnanti Scuola Primaria',
        subtitle: 'Schede Matematica e Tabelline per Classe Prima, Seconda e Terza',
        description: `Gli insegnanti della scuola primaria creano schede matematica personalizzate. Per la classe prima, percorsi con numeri da stampare da 1 a 20. I bambini seguono i numeri in ordine crescente attraverso il labirinto. Sviluppa riconoscimento numerico e sequenze. Le schede matematica rendono l'apprendimento attivo e divertente.

Per la classe seconda e terza, genera schede tabelline interattive. Ogni immagine da raccogliere mostra un'operazione. Il bambino risolve 3×4 per sapere se raccogliere il numero 12. Le schede tabelline trasformano la memorizzazione in gioco.

Crea schede didattiche scuola primaria per valutazioni formative. Genera versioni multiple dello stesso concetto matematico. Ogni bambino riceve una scheda matematica unica. Previene la copiatura durante le verifiche.`,
        quote: 'Le schede differenziate risparmiano ore di preparazione.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Genitori Homeschool',
        subtitle: 'Schede Didattiche Personalizzate per Educazione Domestica',
        description: `I genitori homeschool apprezzano la flessibilità completa. Crea schede didattiche che seguono gli interessi del bambino. Percorsi con dinosauri per bambini appassionati di paleontologia. Labirinti con animali marini per futuri biologi. La personalizzazione mantiene alta la motivazione nell'apprendimento domestico.

Usa numeri da stampare per lezioni matematiche individualizzate. Adatta la difficoltà esattamente al livello del bambino. Troppo facile? Rigenera con griglia più grande. Troppo difficile? Riduci il numero di distrattori. Le schede didattiche homeschool si adattano perfettamente al ritmo individuale.

Combina alfabeto e lettere dell'alfabeto con temi di interesse. Un bambino ama i gatti? Crea percorsi dove raccoglie lettere dell'alfabeto tra immagini di gatti. Insegna l'alfabeto attraverso passioni personali.`,
        quote: 'Creo schede personalizzate per ogni bambino in minuti.',
      },
      {
        id: '4',
        icon: '🇮🇹',
        title: 'Insegnanti di Italiano Classe Prima',
        subtitle: 'Alfabeto e Lettere per Schede Italiano',
        description: `Gli insegnanti di italiano classe prima usano le schede per alfabetizzazione. Crea percorsi dove i bambini seguono l'ordine alfabetico. Da A a Z attraverso un labirinto di lettere dell'alfabeto. Rinforza la sequenza alfabetica in modo visivo e cinestetico. Molto più coinvolgente della recitazione orale tradizionale.

Genera schede italiano classe prima per riconoscimento di vocali e consonanti. Percorsi dove raccogli solo le vocali. Labirinti dove eviti le consonanti. Le schede didattiche rendono la grammatica italiana interattiva. I bambini imparano giocando invece che memorizzando.

Crea schede italiano classe prima per formazione di sillabe. Metti sillabe come CA-SA lungo il percorso. I bambini leggono ogni sillaba mentre procedono. Alla fine hanno letto una parola completa.`,
        quote: 'Perfetto per combinare lettura e problem solving!',
      },
      {
        id: '5',
        icon: '💚',
        title: 'Insegnanti di Sostegno',
        subtitle: 'Schede Didattiche Differenziate per Bisogni Speciali',
        description: `Gli insegnanti di sostegno apprezzano la differenziazione rapida. Crea versioni semplificate per alunni con bisogni educativi speciali. Griglie più piccole per schede didattiche scuola dell'infanzia facilitate. Meno distrattori per ridurre il carico cognitivo. Immagini più grandi per bambini con difficoltà visive.

Genera schede pregrafismo con linee più spesse. Perfetto per bambini con difficoltà di motricità fine. I percorsi larghi sono più facili da tracciare. Le schede didattiche adattate aumentano successo e autostima. Ogni bambino può completare l'attività al proprio livello.

Usa immagini familiari per schede didattiche personalizzate. Carica foto di oggetti della vita quotidiana del bambino. Percorsi con immagini riconoscibili riducono l'ansia. Le schede didattiche scuola primaria inclusive funzionano per tutti.`,
        quote: 'Finalmente materiali che posso adattare completamente.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Insegnanti Imprenditori',
        subtitle: 'Vendi Schede Didattiche su Teachers Pay Teachers ed Etsy',
        description: `Molti insegnanti guadagnano vendendo schede didattiche online. La licenza commerciale Accesso Completo ti permette vendite illimitate. Crea pacchetti tematici di schede matematica da vendere. Collezioni di schede tabelline per tutte le moltiplicazioni. Set completi alfabeto e lettere dell'alfabeto.

Teachers Pay Teachers è pieno di insegnanti che cercano schede didattiche pronte. I pacchetti di schede matematica vendono particolarmente bene. Soprattutto schede tabelline differenziate per livelli. Gli insegnanti pagano volentieri 3-8 euro per pacchetti di 10-20 schede.

Crea negozi Etsy specializzati in schede didattiche stampabili. Pacchetti stagionali di schede didattiche scuola primaria. Molti insegnanti guadagnano 500-2000 euro mensili extra. La creazione rapida permette inventario ampio. Nessun costo per immagine o template.`,
        quote: 'Ho guadagnato più di 2000 euro il primo anno.',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Domande Frequenti sulle Schede Didattiche Percorsi e Labirinti',
    sectionDescription: 'Risposte alle domande più comuni sul nostro generatore di schede didattiche',
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
        question: 'Questo Generatore di Schede Didattiche È Davvero Gratuito?',
        answer: `Il generatore richiede un abbonamento Accesso Completo che costa 240 euro all'anno o 25 euro al mese. Il tuo abbonamento ti dà creazione illimitata di schede didattiche senza costi per singola scheda. Genera tutte le schede didattiche scuola primaria che ti servono senza addebiti aggiuntivi. Crea schede didattiche scuola dell'infanzia illimitate senza pagare per immagine o template.

L'abbonamento Accesso Completo include tutti i 33 generatori di schede didattiche della piattaforma. Oltre a percorsi e labirinti, accedi a generatori per matematica, alfabeto, disegni da colorare. Tutti gli strumenti inclusi al prezzo fisso di 240 euro annui. Nessun costo nascosto o sorprese. Licenza commerciale inclusa senza extra.`,
      },
      {
        id: '2',
        question: 'Posso Stampare Schede Pregrafismo a Casa su Stampante Normale?',
        answer: `Sì. Tutte le schede pregrafismo e schede con numeri da stampare si stampano perfettamente su stampante domestica normale. La qualità 300 DPI garantisce nitidezza anche su carta standard. Le schede pregrafismo hanno linee chiare e spesse perfette per bambini piccoli. I numeri da stampare restano leggibili e ben definiti.

Usa l'opzione scala di grigi per risparmiare inchiostro colorato. Le schede pregrafismo in bianco e nero funzionano perfettamente per tracciare percorsi. Stampa 20-30 schede didattiche con una cartuccia di inchiostro standard. Molto più economico di acquistare libri di attività pre-stampati.`,
      },
      {
        id: '3',
        question: 'Servono Competenze di Design per Creare Schede Didattiche?',
        answer: `No. Non servono assolutamente competenze di design grafico o informatica. Il generatore crea automaticamente schede italiano classe prima pronte all'uso. Scegli le lettere dell'alfabeto e il sistema genera il percorso. Tutto automatizzato e intuitivo. Anche insegnanti che non usano computer quotidianamente ci riescono facilmente.

L'interfaccia in italiano è chiara e semplice. Ogni pulsante è etichettato in modo chiaro. Le istruzioni guidano passo dopo passo. Crea la tua prima scheda italiano classe prima in meno di 5 minuti. Dopo la prima volta, il processo diventa ancora più veloce.`,
      },
      {
        id: '4',
        question: 'Posso Usare Schede Didattiche in Classe con i Miei Alunni?',
        answer: `Sì. L'abbonamento Accesso Completo include uso illimitato in classe. Stampa schede tabelline per tutti i tuoi alunni. Crea schede matematica personalizzate per ogni bambino. Usa le schede didattiche per lezioni, compiti, valutazioni. Nessuna restrizione sul numero di copie stampate. Nessun limite sul numero di alunni.

Condividi schede didattiche digitalmente con i genitori. Invia schede matematica via email per compiti a casa. Carica schede tabelline sulla piattaforma didattica della scuola. L'abbonamento copre tutti gli usi educativi.`,
      },
      {
        id: '5',
        question: 'Quali Lingue Sono Disponibili per le Schede Didattiche?',
        answer: `Il generatore supporta 11 lingue complete. L'interfaccia utente si traduce in italiano, inglese, tedesco, francese, spagnolo, portoghese, olandese, svedese, danese, norvegese, finlandese. Le immagini nella biblioteca includono alfabeto e numeri da stampare in tutte queste lingue. Perfetto per insegnanti di lingue straniere e scuole internazionali.

Crea schede alfabeto inglese per lezioni di inglese. Genera numeri da stampare in francese per classi CLIL. Produci schede didattiche multilingue per studenti immigrati. La biblioteca contiene lettere dell'alfabeto con pronuncia corretta per ogni lingua.`,
      },
      {
        id: '6',
        question: 'Posso Vendere le Schede Didattiche Che Creo?',
        answer: `Sì. L'abbonamento Accesso Completo include licenza commerciale print-on-demand completa senza costi extra. Vendi schede didattiche scuola dell'infanzia su Teachers Pay Teachers, Etsy, Amazon KDP. Crea pacchetti di schede pregrafismo da vendere come prodotti digitali. Nessuna attribuzione richiesta. Nessun limite sul numero di vendite o guadagni.

La licenza copre prodotti stampati e download digitali. Vendi PDF stampabili o libri fisici tramite print-on-demand. Crea pacchetti stagionali di schede didattiche. Molti insegnanti costruiscono business secondari redditizi.`,
      },
      {
        id: '7',
        question: 'Come Personalizzo le Schede per i Miei Studenti?',
        answer: `Personalizza ogni aspetto delle schede didattiche scuola primaria sulla tela interattiva. Carica foto degli alunni per percorsi personalizzati. Aggiungi nomi degli studenti come testo. Modifica colori per abbinare preferenze individuali. Ridimensiona elementi per visibilità migliore. Ogni scheda didattica diventa unica per ogni bambino.

Per schede matematica, modifica il livello di difficoltà. Griglie piccole per principianti, grandi per avanzati. Per schede alfabeto, scegli solo le lettere che stai insegnando quella settimana. Per schede tabelline, includi solo le moltiplicazioni già studiate.`,
      },
      {
        id: '8',
        question: 'Per Quali Fasce d\'Età Funzionano Meglio Queste Schede?',
        answer: `Le schede didattiche scuola dell'infanzia funzionano perfettamente per bambini da 3 a 8 anni. Età 3-4 anni: percorsi semplici con poche immagini grandi. Età 5-6 anni: labirinti più complessi con più scelte. Età 7-8 anni: schede matematica e tabelline integrate nei percorsi. Adatta difficoltà per ogni livello di sviluppo.

Per pregrafismo, bambini 3-4 anni beneficiano da percorsi larghi e semplici. Bambini 5-6 anni gestiscono labirinti più stretti e dettagliati. Per schede alfabeto, bambini 5-6 imparano riconoscimento lettere. Bambini 6-8 formano parole con le lettere raccolte.`,
      },
      {
        id: '9',
        question: 'Posso Caricare le Mie Immagini Personalizzate?',
        answer: `Sì. Il generatore accetta caricamento illimitato di immagini personali. Carica disegni da colorare che hai creato. Importa foto da usare nei percorsi. Aggiungi simboli specifici per le tue unità didattiche. Il sistema accetta JPEG, PNG, GIF. Nessun limite sul numero di file caricati.

Combina immagini caricate con quelle della biblioteca. Crea disegni da colorare tematici perfetti per la tua classe. Usa foto di oggetti che i bambini riconoscono. Importa clipart acquistato da altri siti. Le immagini caricate funzionano esattamente come quelle della biblioteca.`,
      },
      {
        id: '10',
        question: 'Quanto Tempo Serve per Creare Schede Didattiche Complete?',
        answer: `Creare schede matematica con numeri da stampare richiede meno di 3 minuti. Scegli i numeri dalla biblioteca (1 minuto). Genera il percorso automaticamente (10 secondi). Modifica sulla tela se necessario (1-2 minuti). Scarica il PDF (10 secondi). Totale: 2-3 minuti per scheda matematica completa.

Per pacchetti grandi, genera 10 schede matematica in 15-20 minuti. Molto più veloce di creazione manuale che richiede 30-60 minuti per scheda. Il risparmio di tempo si accumula. 10 schede alla settimana equivalgono a 5 ore risparmiate settimanalmente.`,
      },
      {
        id: '11',
        question: 'Le Schede Didattiche Includono Chiavi delle Risposte?',
        answer: `Sì. Ogni scheda genera automaticamente una chiave delle risposte. La chiave mostra il percorso corretto evidenziato. Per schede tabelline, la chiave indica quali numeri raccogliere. Per schede alfabeto, mostra l'ordine corretto delle lettere. Scarica chiave e scheda come file separati. Perfetto per correzioni rapide.

La chiave delle risposte usa gli stessi colori e layout della scheda originale. Facile confronto visivo per bambini piccoli. Utile per auto-correzione guidata. Gli alunni confrontano il loro percorso con la chiave.`,
      },
      {
        id: '12',
        question: 'Posso Creare Schede su Altri Argomenti oltre ai Labirinti?',
        answer: `Sì, l'abbonamento Accesso Completo include tutti i 33 generatori diversi. Oltre a percorsi e labirinti hai addizioni, matematica generale, word scramble, alfabeto train, pagine da colorare, matching, sudoku per bambini e molto altro. Ogni generatore crea schede su argomento diverso.

L'abbonamento Accesso Completo costa 240 euro annuali. Include tutti i 33 generatori di schede della piattaforma. Il Pacchetto Essenziale costa 144 euro annuali e include 10 generatori popolari. Questa versatilità rende l'abbonamento un eccellente investimento per ogni insegnante.`,
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
      'Licenza commerciale inclusa',
      '11 lingue supportate',
      '3000+ immagini tematiche',
      'Qualità stampa 300 DPI',
      'Soluzioni incluse',
      'Tutti i 33 generatori inclusi',
    ],
    ctaText: 'Inizia Ora',
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combina Labirinti e Percorsi con Altri Materiali Stampabili',
    sectionDescription: 'Il generatore di percorsi e labirinti funziona magnificamente combinato con altri tipi di schede didattiche. La piattaforma offre 33 generatori diversi per materiali stampabili. Crea pacchetti didattici completi per ogni argomento.',
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
        description: 'Crea schede di addizioni con immagini per completare il curriculum matematico. Stessa interfaccia e qualità.',
      },
      {
        id: '2',
        slug: 'find-and-count',
        name: 'Trova e Conta',
        category: 'Matematica',
        icon: '🔍',
        description: 'Combina percorsi con attività di conteggio. Perfetto complemento per sviluppo matematico completo.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Treno dell\'Alfabeto',
        category: 'Apprendimento Precoce',
        icon: '🚂',
        description: 'Combina labirinti con apprendimento delle lettere. Crea pacchetti integrati per sviluppo completo.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Disegni da Colorare',
        category: 'Arte e Creatività',
        icon: '🎨',
        description: 'Aggiungi attività artistiche dopo esercizi di logica. Transizione perfetta tra concentrazione e rilassamento.',
      },
      {
        id: '5',
        slug: 'matching',
        name: 'Abbinamenti',
        category: 'Logica',
        icon: '🔗',
        description: 'Combina percorsi con attività di abbinamento per sviluppo cognitivo completo.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Pregrafismo',
        category: 'Motricità Fine',
        icon: '✏️',
        description: 'Completa l\'apprendimento motorio con schede di pregrafismo. Perfetto per scuola dell\'infanzia.',
      },
    ],
  },
};

export default picturePathItContent;
