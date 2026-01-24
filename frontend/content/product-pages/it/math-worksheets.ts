import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Italian Content
 *
 * File: frontend/content/product-pages/it/math-worksheets.ts
 * URL: /it/apps/matematica-schede
 *
 * SEO OPTIMIZED with Italian samples and universal keywords
 * Universal Keywords (5+ times each in TITLES):
 * - Scheda gratuita
 * - Scheda gratuita per bambini
 * - Schede gratuite
 * - Stampabili gratuiti
 * - Scheda per bambini
 * - Scheda per scuola dell'infanzia
 * - Scheda
 */

export const mathWorksheetsItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'matematica-schede',
    appId: 'math-worksheet',
    title: 'Schede Matematica Schede Gratuite | Generatore Stampabili Gratuiti Scuola Primaria',
    description: 'Crea schede matematica professionali con il nostro generatore schede didattiche. Genera schede didattiche scuola primaria personalizzate con immagini per scuola dell\'infanzia e classe prima. Scarica schede didattiche PDF in meno di 3 minuti.',
    keywords: 'schede matematica, generatore schede didattiche, schede didattiche scuola primaria, schede stampabili, numeri da stampare, pregrafismo, tabelline, disegni da colorare, schede italiano classe prima, alfabeto',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/matematica-schede',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/italian/math/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schede matematica scheda gratuita per bambini - esercizi visivi scuola infanzia',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/italian/math/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schede gratuite matematica stampabili gratuiti - scheda per bambini scuola primaria',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/italian/math/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Scheda gratuita matematica schede gratuite - stampabili gratuiti per bambini',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/italian/math/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Scheda per scuola dell\'infanzia matematica - schede gratuite esercizi conteggio',
      },
    ],
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-3
  hero: {
    title: 'Schede Matematica Schede Gratuite - Generatore Stampabili Gratuiti per Bambini',
    subtitle: 'Scheda Gratuita per Bambini - Stampabili Gratuiti Scuola Infanzia e Primaria',
    description: `Crea schede matematica professionali con il nostro generatore schede didattiche. Il tuo abbonamento Pacchetto Essenziale ti dà accesso illimitato alla creazione di schede didattiche scuola primaria senza costi aggiuntivi per foglio. Genera schede matematica personalizzate perfette per la scuola dell'infanzia e la classe prima. Scarica schede didattiche di alta qualità in formato PDF in meno di 3 minuti.

Il nostro generatore schede matematica trasforma numeri astratti in puzzle visivi divertenti. Ogni scheda matematica utilizza immagini colorate che i bambini amano. Una mela più una mela uguale due mele. I bambini contano le immagini per risolvere i problemi di matematica. Questo metodo rende l'apprendimento della matematica concreto e divertente.

Perfetto per insegnanti della scuola dell'infanzia e della scuola primaria. Le schede didattiche scuola primaria si adattano a diversi livelli di difficoltà. Inizia con esercizi molto facili con 2 simboli per i bambini più piccoli. Passa a esercizi difficili con 4 simboli per la classe prima e seconda. Ogni scheda matematica può includere addizione semplice oppure addizione e sottrazione insieme.`,
    previewImageSrc: '/samples/italian/math/sample-1.jpeg',
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

  // Sample Gallery - Italian samples from /samples/italian/math/
  samples: {
    sectionTitle: "Scheda Gratuita per Bambini - Schede Gratuite e Stampabili Gratuiti e Scheda per Bambini",
    sectionDescription: "Scarica stampabili gratuiti - Scheda gratuita per bambini di qualità professionale. Schede gratuite e scheda per bambini perfette per scheda per scuola dell'infanzia. Scheda gratuita per bambini e scheda per bambini includono materiale educativo. Scheda gratuita e scheda per scuola dell'infanzia disponibile",
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
        worksheetSrc: '/samples/italian/math/sample-1.jpeg',
        answerKeySrc: '/samples/italian/math/sample-1-answer.jpeg',
        altText: 'Schede matematica scheda gratuita per bambini - formato verticale scuola infanzia',
        pdfDownloadUrl: '/samples/italian/math/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/italian/math/sample-2.jpeg',
        answerKeySrc: '/samples/italian/math/sample-2-answer.jpeg',
        altText: 'Schede gratuite matematica stampabili gratuiti - scheda per bambini scuola primaria',
        pdfDownloadUrl: '/samples/italian/math/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/italian/math/sample-3.jpeg',
        answerKeySrc: '/samples/italian/math/sample-3-answer.jpeg',
        altText: 'Scheda gratuita matematica schede gratuite - stampabili gratuiti esercizi visivi',
        pdfDownloadUrl: '/samples/italian/math/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/italian/math/sample-4.jpeg',
        answerKeySrc: '/samples/italian/math/sample-4-answer.jpeg',
        altText: 'Scheda per scuola dell\'infanzia matematica - schede gratuite per bambini conteggio',
        pdfDownloadUrl: '/samples/italian/math/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from math-worksheet.md feature sections
  features: {
    sectionTitle: "Schede Gratuite e Scheda per Bambini - Stampabili Gratuiti e Scheda per Scuola dell'Infanzia",
    sectionDescription: 'Il nostro generatore schede matematica offre strumenti completi per creare schede didattiche professionali. Ogni funzionalità è progettata per insegnanti della scuola primaria e della scuola dell\'infanzia. Crea schede didattiche scuola primaria personalizzate in pochi minuti. Le schede matematica includono tutto dal pregrafismo base alle tabelline avanzate. Sette funzionalità essenziali rendono la creazione di schede didattiche semplice ed efficace.',
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
        title: 'Crea Schede Gratuite Matematica in 3 Clic - Stampabili Gratuiti Veloci',
        description: `Creare schede didattiche scuola primaria non è mai stato così semplice. Seleziona il livello di difficoltà per le tue schede matematica. Scegli immagini dalla libreria oppure carica i tuoi disegni da colorare. Clicca genera e la tua scheda didattica appare immediatamente. Tutto il processo richiede meno di 3 minuti dall'inizio al download.

Il generatore schede matematica elimina il lavoro manuale. Non serve saper usare programmi di grafica complicati. Non serve creare modelli di schede didattiche da zero. Seleziona semplicemente le opzioni che vuoi. Il generatore crea schede didattiche scuola primaria professionali automaticamente. Perfetto per insegnanti che hanno poco tempo ma vogliono materiali di qualità.

Ogni scheda matematica può includere da 1 a 6 esercizi per foglio. Ideale per schede didattiche scuola dell'infanzia con meno esercizi. Perfetto per classe prima con più problemi di matematica. Il generatore si adatta alle tue esigenze pedagogiche. Crea schede didattiche diverse ogni volta senza ripetere lo stesso lavoro.`,
        icon: '⚡',
        highlighted: true,
      },
      {
        id: '2',
        title: 'Modifica Schede Gratuite per Bambini - Personalizza Ogni Elemento',
        description: `Dopo aver generato le schede matematica puoi modificare ogni elemento. Trascina immagini in nuove posizioni sulle schede didattiche scuola primaria. Ridimensiona numeri da stampare per renderli più grandi o più piccoli. Ruota disegni da colorare per adattarli meglio al layout. Elimina elementi che non servono dalle schede didattiche.

Il canvas di modifica offre controllo completo. Cambia colori di sfondi e bordi sulle schede matematica. Aggiungi testo personalizzato alle schede didattiche scuola primaria. Ogni scheda didattica diventa unica e perfetta per i tuoi studenti. La modifica funziona con tocco su tablet oppure mouse su computer.

Annulla e ripeti modifiche illimitate. Se commetti un errore sulle schede matematica clicca annulla. Prova diverse configurazioni per le schede didattiche finché non trovi quella perfetta. Nessun rischio di rovinare il lavoro. Le schede didattiche scuola primaria rimangono sempre modificabili fino al download finale.`,
        icon: '✏️',
        highlighted: false,
      },
      {
        id: '3',
        title: 'Carica Immagini - Scheda Gratuita per Bambini Personalizzata',
        description: `Carica i tuoi disegni da colorare per rendere schede didattiche uniche. Il generatore accetta JPEG, PNG e GIF per le schede matematica. Carica file multipli contemporaneamente. Combina immagini personali con la libreria di 3000+ disegni inclusi. Perfetto per creare schede didattiche scuola primaria tematiche.

Usa foto di oggetti dalla tua classe per schede matematica familiari. Carica disegni da colorare che i bambini hanno creato. Include mascotte della scuola nelle schede didattiche. Personalizza schede didattiche scuola primaria per eventi speciali o progetti tematici. Le immagini personalizzate rendono l'apprendimento più coinvolgente.

I disegni caricati funzionano esattamente come immagini della libreria. Usa disegni da colorare personalizzati in puzzle matematici. Combina con numeri da stampare e simboli operativi. Crea schede matematica che riflettono la realtà dei tuoi studenti. Le schede didattiche diventano strumenti pedagogici personalizzati.`,
        icon: '📤',
        highlighted: false,
      },
      {
        id: '4',
        title: 'Schede Gratuite in 11 Lingue - Scheda per Scuola dell\'Infanzia Multilingue',
        description: `L'interfaccia del generatore schede matematica supporta 11 lingue. Italiano, inglese, tedesco, francese, spagnolo, portoghese brasiliano, olandese, danese, svedese, norvegese e finlandese. Cambia lingua dell'interfaccia con un clic. Tutte le etichette e i pulsanti si traducono automaticamente. Crea schede didattiche scuola primaria nella tua lingua madre.

Particolarmente utile per insegnanti di lingue straniere. Crea schede matematica bilingue per studenti immigrati. Genera schede didattiche in più lingue per classi multilingue. Perfetto per scuole internazionali che servono famiglie diverse. Le schede didattiche scuola primaria diventano strumenti di inclusione linguistica.

Anche i nomi file delle immagini supportano 11 lingue. Cerca "mela" in italiano oppure "apple" in inglese. La libreria riconosce termini in tutte le lingue supportate. Facilita la creazione di schede matematica con vocabolario specifico. Le schede didattiche possono insegnare matematica e lingua contemporaneamente.`,
        icon: '🌍',
        highlighted: false,
      },
      {
        id: '5',
        title: 'Licenza Commerciale - Vendi Stampabili Gratuiti',
        description: `Il Pacchetto Essenziale include licenza commerciale completa. Vendi schede matematica su Etsy senza costi extra di licenza. Carica schede didattiche su Teachers Pay Teachers per guadagno passivo. Pubblica raccolte di schede didattiche scuola primaria su Amazon KDP. Ogni abbonamento Pacchetto Essenziale include diritti commerciali completi.

Crea pacchetti tematici di schede matematica per la vendita. Sviluppa libretti di tabelline per studenti della classe prima. Genera collezioni stagionali di schede didattiche scuola primaria. Molti insegnanti guadagnano 500-5000 euro al mese vendendo materiali didattici. Le schede matematica di qualità professionale si vendono bene online.

Tutte le schede didattiche sono esportate a 300 DPI. Qualità perfetta per stampa professionale e vendita. Non serve attribuzione sulle schede matematica che vendi. Usa il generatore per costruire un business di risorse didattiche. La licenza commerciale nel Pacchetto Essenziale vale oltre 150 euro all'anno presso concorrenti. Qui è inclusa nei 144 euro annuali.`,
        icon: '📜',
        highlighted: false,
      },
      {
        id: '6',
        title: '3000+ Immagini - Schede Gratuite per Bambini Illimitate',
        description: `La libreria include oltre 3000 disegni organizzati per tema. Trova velocemente immagini per schede matematica. Animali, cibo, veicoli, natura, oggetti scolastici e molto altro. Ogni categoria contiene decine di disegni da colorare. Perfetto per creare schede didattiche scuola dell'infanzia tematiche.

Include alfabeto completo e lettere dell'alfabeto in vari stili. Numeri da stampare da 0 a 100. Forme geometriche per schede matematica. Simboli matematici per addizione, sottrazione e altro. Tutto il necessario per schede didattiche scuola primaria è incluso nella libreria.

Cerca immagini per parola chiave nelle schede matematica. Filtra per tema per trovare disegni da colorare correlati. Seleziona immagini singole oppure interi temi. La libreria si aggiorna regolarmente con nuovi contenuti. Tutti i disegni sono adatti ai bambini e sicuri per la scuola dell'infanzia. Nessun costo aggiuntivo per usare qualsiasi immagine della libreria.`,
        icon: '🖼️',
        highlighted: false,
      },
      {
        id: '7',
        title: 'Qualità 300 DPI - Scheda per Scuola dell\'Infanzia Perfetta',
        description: `Ogni scheda matematica viene esportata in risoluzione 300 DPI. Qualità professionale perfetta per stampanti scolastiche. I numeri da stampare risultano nitidi e leggibili. I disegni da colorare mantengono dettagli chiari. Le schede didattiche scuola primaria sembrano materiali pubblicati professionalmente.

Esporta schede matematica in formato PDF oppure JPEG. Il PDF mantiene qualità vettoriale per testo e numeri. JPEG offre compatibilità universale per condivisione. Entrambi i formati supportano 300 DPI per schede didattiche di alta qualità. Scegli scala di grigi per risparmiare inchiostro senza perdere leggibilità.

Stampa schede didattiche su carta comune oppure cartoncino. La qualità 300 DPI funziona perfettamente con ogni tipo di carta. Le schede matematica rimangono chiare anche dopo fotocopie multiple. Ideale per insegnanti che devono duplicare materiali per classe intera. Le schede didattiche scuola primaria mantengono qualità professionale in ogni situazione.`,
        icon: '✨',
        highlighted: false,
      },
    ],
  },

  // How-To Guide Section - FULL text from math-worksheet.md "How to Create" section
  howTo: {
    sectionTitle: "Scheda Gratuita per Bambini Creare - Scheda per Scuola dell'Infanzia",
    sectionDescription: 'Creare schede didattiche scuola primaria professionali richiede meno di 3 minuti. Il generatore schede matematica guida attraverso un processo semplice e intuitivo. Anche insegnanti senza esperienza tecnica creano schede didattiche perfette. Cinque passaggi chiari portano dalla configurazione iniziale al download finale.',
    ctaText: 'Inizia Ora',
    badgeText: 'Guida Passo-Passo',
    stepLabel: 'Passo',
    completionTitle: 'Scheda Pronta!',
    completionSubtitle: 'La tua scheda matematica è pronta per il download',
    readyTime: 'Pronta in meno di 3 minuti',
    noSkillsNeeded: 'Nessuna competenza di design richiesta',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Scegli Impostazioni - Schede Gratuite per Bambini',
        description: `Il primo passaggio configura il livello delle schede matematica. Seleziona difficoltà dal menu a tendina del generatore. Molto facile usa solo 2 simboli perfetto per scuola dell'infanzia. Facile mantiene 2 simboli ma con numeri più grandi per bambini pronti. Medio usa 3 simboli ideale per schede italiano classe prima. Difficile include 4 simboli per studenti avanzati che praticano tabelline.

Scegli quali operazioni includere nelle schede didattiche scuola primaria. Solo addizione per bambini che iniziano a contare. Addizione e sottrazione insieme per schede matematica più complete. Ogni operazione si adatta automaticamente al livello di difficoltà scelto. Le schede didattiche mantengono coerenza pedagogica in base alle tue selezioni.

Decidi quanti esercizi includere per foglio. Minimo 1 esercizio per schede didattiche scuola dell'infanzia con spazio grande. Massimo 6 esercizi per fogli di pratica intensiva. Più esercizi significano più opportunità di praticare schede matematica. Meno esercizi danno spazio per disegni da colorare più grandi.`,
        icon: '⚙️',
      },
      {
        id: '2',
        number: 2,
        title: 'Seleziona Immagini - Scheda Gratuita per Bambini',
        description: `Il secondo passaggio sceglie immagini per le schede matematica. Due metodi disponibili nel generatore schede didattiche. Selezione individuale per controllo completo di ogni immagine. Tema completo per coerenza visiva rapida nelle schede didattiche scuola primaria.

Metodo tema completo offre velocità massima. Apri menu temi e scegli categoria. Animali della fattoria per schede matematica tematiche. Frutta e verdura per schede didattiche nutrizione. Veicoli per bambini appassionati di trasporti. Il tema seleziona automaticamente immagini coordinate. Perfetto per creare schede didattiche scuola dell'infanzia rapidamente.

Metodo selezione individuale offre personalizzazione completa. Filtra libreria per tema se vuoi. Cerca immagini specifiche per nome. Clicca ogni immagine che vuoi usare nelle schede matematica. Le immagini selezionate appaiono nel pool di selezione. Perfetto per schede didattiche con mix di categorie diverse.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Schede Gratuite Matematica Istantaneamente',
        description: `Il terzo passaggio genera le schede didattiche. Clicca bottone genera dopo aver configurato tutto. Il generatore schede matematica lavora istantaneamente. Appaiono esercizi completi sul canvas in secondi. Ogni scheda didattica include immagini, simboli operativi e spazi risposta.

L'anteprima mostra esattamente come appariranno schede matematica stampate. Verifica che numeri da stampare siano leggibili. Controlla che disegni da colorare siano chiari. Assicurati che layout funzioni per schede didattiche scuola primaria. Tutto è visibile prima di procedere con modifiche.

Se il risultato non soddisfa puoi rigenerare schede matematica. Cambia configurazioni e clicca genera nuovamente. Prova difficoltà diversa per schede didattiche. Seleziona tema differente per variare immagini. Ogni generazione crea schede matematica nuove e uniche.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica Stampabili Gratuiti sul Canvas',
        description: `Il quarto passaggio personalizza schede matematica generate. Il canvas di modifica offre controllo completo. Clicca qualsiasi elemento per selezionarlo nelle schede didattiche scuola primaria. Trascina per spostare posizione. Ridimensiona tirando angoli. Ruota usando maniglia superiore.

Aggiungi sfondi tematici alle schede matematica. Menu sfondi mostra anteprima di tutti i temi. Clicca sfondo preferito per applicarlo alle schede didattiche. Regola opacità se lo sfondo è troppo scuro. Gli sfondi aggiungono contesto visivo alle schede didattiche scuola dell'infanzia.

Aggiungi bordi decorativi alle schede matematica. Menu bordi funziona come menu sfondi. Centinaia di bordi tematici disponibili. Stagionali per schede didattiche mensili. Accademici per schede matematica formali. Giocosi per scuola dell'infanzia. I bordi creano cornice professionale.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica Schede Gratuite per Scuola dell\'Infanzia',
        description: `Il quinto passaggio scarica schede didattiche complete. Clicca bottone download nel generatore schede matematica. Scegli formato file per le tue schede didattiche scuola primaria. PDF per qualità massima e facilità stampa. JPEG per compatibilità con tutti i dispositivi.

Le schede matematica scaricano immediatamente sul computer. File include tutte le personalizzazioni fatte. Ogni scheda didattica mantiene qualità 300 DPI professionale. Numeri da stampare risultano nitidi su qualsiasi stampante. I disegni da colorare mantengono dettagli chiari.

Stampa schede matematica su stampante scuola o casa. Funziona perfettamente con stampanti inkjet o laser. Le schede didattiche scuola primaria stampano su carta A4 standard. Usa carta più pesante per schede didattiche durature. Le schede matematica resistono a uso ripetuto in classe.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section - FULL text from math-worksheet.md "Perfect For" section
  useCases: {
    sectionTitle: "Schede Gratuite per Insegnanti - Scheda Gratuita per Bambini Matematica",
    sectionDescription: 'Il generatore schede matematica serve diversi tipi di educatori. Insegnanti della scuola dell\'infanzia trovano materiali perfetti per bambini piccoli. Docenti della scuola primaria creano schede didattiche per tutti i livelli. Genitori homeschool sviluppano curriculum personalizzati. Insegnanti di sostegno differenziano istruzione facilmente.',
    badgeText: 'Chi Usa le Nostre Schede',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Insegnanti Scuola dell\'Infanzia',
        subtitle: 'Schede Gratuite con Pregrafismo - Scheda Gratuita per Bambini 3-6 Anni',
        description: `Gli insegnanti della scuola dell'infanzia usano schede matematica per introdurre concetti numerici. Bambini di 3-6 anni imparano meglio con immagini concrete. Le schede didattiche scuola dell'infanzia trasformano matematica astratta in gioco visivo. Conta mele colorate invece di numeri scritti. Questo approccio funziona perfettamente per scuola dell'infanzia.

Livello molto facile con 2 simboli è ideale per scuola dell'infanzia. Piccoli gruppi di immagini facili da contare. Numeri da stampare grandi e chiari per bambini che iniziano. Le schede matematica per scuola dell'infanzia includono spazio per pregrafismo. I bambini tracciano numeri dopo aver contato immagini.

Temi familiari funzionano meglio per scuola dell'infanzia. Animali domestici che i bambini conoscono. Giocattoli comuni nella classe. Cibo che mangiano ogni giorno. Le schede didattiche scuola dell'infanzia diventano strumenti di apprendimento riconoscibili. Bambini collegano matematica a mondo reale.`,
        quote: 'I miei bambini adorano contare le immagini colorate!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Insegnanti Scuola Primaria',
        subtitle: 'Schede Gratuite Classe Prima - Stampabili Gratuiti con Tabelline',
        description: `Gli insegnanti della scuola primaria usano schede matematica per tutti i livelli. Classe prima inizia con addizione semplice usando immagini. Classe seconda avanza a problemi con 3-4 simboli. Classe terza pratica tabelline con esercizi difficili. Le schede didattiche scuola primaria crescono con gli studenti.

Crea schede italiano classe prima che combinano matematica e lingua. Usa immagini con nomi italiani chiari. Mela, gatto, automobile diventano strumenti didattici. Gli studenti imparano vocabolario mentre praticano matematica. Le schede italiano classe prima supportano alfabetizzazione e numeracy insieme.

Personalizza difficoltà per differenziare nella scuola primaria. Studenti avanzati ricevono schede matematica con 4 simboli e tabelline. Studenti che necessitano supporto ricevono esercizi con 2 simboli. Tutti lavorano su stesso tema ma livelli diversi. Le schede didattiche permettono differenziazione invisibile.`,
        quote: 'Le schede differenziate risparmiano ore di preparazione.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Genitori Homeschool',
        subtitle: 'Scheda Gratuita per Bambini Personalizzata - Stampabili Gratuiti Homeschool',
        description: `I genitori homeschool creano curriculum completi con schede matematica. Flessibilità totale su tempi e contenuti delle schede didattiche. Adatta ogni lezione agli interessi specifici del bambino. Usa temi che appassionano per mantenere motivazione alta. Le schede matematica homeschool diventano esperienze di apprendimento personalizzate.

Combina schede matematica con altri argomenti di studio. Tema dinosauri per bambino appassionato di paleontologia. Tema spazio per bambino che ama astronomia. Tema cucina per bambino che aiuta in cucina. Le schede didattiche integrano matematica con passioni esistenti. L'apprendimento diventa naturale e divertente.

Usa alfabeto e lettere dell'alfabeto per lezioni integrate. Crea schede matematica che includono iniziali di parole. Conta oggetti che iniziano con lettera specifica. Combina numeracy e literacy in singola attività. Le schede didattiche homeschool massimizzano efficienza del tempo.`,
        quote: 'Creo schede personalizzate per ogni bambino in minuti.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Insegnanti di Lingue',
        subtitle: 'Schede Gratuite Multilingue - Scheda per Scuola dell\'Infanzia ESL',
        description: `Gli insegnanti di lingue straniere usano schede matematica come strumenti ESL. Vocabolario matematico in 11 lingue supportate. Gli studenti imparano numeri e operazioni in lingua target. Le schede didattiche diventano esercizi linguistici pratici. Matematica fornisce contesto significativo per acquisizione lingua.

Crea schede matematica bilingue per studenti immigrati. Italiano e lingua madre contemporaneamente sulle schede didattiche. Transizione graduale verso italiano completo. I bambini vedono connessioni tra lingue. Le schede matematica facilitano integrazione linguistica.

Usa alfabeto e lettere dell'alfabeto per insegnamento fonetica. Immagini con nomi che iniziano con suoni target. Conta oggetti mentre pratichi pronuncia italiana. Le schede didattiche combinano matematica e fonetica. Apprendimento linguistico diventa multisensoriale.`,
        quote: 'Perfetto per i miei studenti che stanno imparando italiano.',
      },
      {
        id: '5',
        icon: '💚',
        title: 'Insegnanti di Sostegno',
        subtitle: 'Schede Gratuite Educazione Speciale - Stampabili Gratuiti con Pregrafismo',
        description: `Gli insegnanti di sostegno personalizzano schede matematica per bisogni individuali. Studenti con difficoltà apprendimento necessitano modifiche specifiche. Ingrandisci numeri da stampare per studenti con problemi visivi. Riduci numero esercizi per studenti con difficoltà attenzione. Le schede didattiche si adattano a ogni Piano Educativo Individualizzato.

Usa immagini grandi e chiare per schede matematica modificate. Studenti con disabilità cognitive beneficiano da semplicità visiva. Poche immagini per esercizio riducono sovraccarico cognitivo. Le schede didattiche speciali eliminano distrazioni non necessarie. Focus rimane su concetto matematico centrale.

Combina schede matematica con attività pregrafismo per terapia occupazionale. Tracciare numeri sviluppa controllo motorio fine. Colorare immagini dopo esercizi rinforza successo. Le schede didattiche diventano strumenti terapeutici multifunzionali. Matematica e sviluppo motorio procedono insieme.`,
        quote: 'Finalmente materiali che posso adattare completamente.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Insegnanti Imprenditori',
        subtitle: 'Vendi Schede Gratuite - Stampabili Gratuiti su Etsy e TPT',
        description: `Gli insegnanti imprenditori creano prodotti vendibili con schede matematica. Teachers Pay Teachers e Etsy sono mercati enormi. Pacchetti tematici di schede didattiche si vendono eccellentemente. Raccolte stagionali di schede matematica generano reddito passivo. La licenza commerciale Pacchetto Essenziale rende tutto possibile.

Crea set completi di tabelline per studenti scuola primaria. Pacchetto completo da 2x a 12x tabella. Ogni scheda matematica copre tabellina specifica. Vendi come PDF digitale a 5-15 euro. Clienti scaricano immediatamente dopo acquisto. Le schede didattiche diventano prodotto digitale redditizio.

Sviluppa libretti di disegni da colorare matematici tematici. Natale, Halloween, Pasqua con schede matematica coordinate. Genitori cercano attività stagionali educative. Le schede didattiche tematiche riempiono questa nicchia perfettamente. Vendite aumentano durante festività specifiche.`,
        quote: 'Ho guadagnato più di 2000€ il primo anno.',
      },
    ],
  },

  // FAQ Section - FULL text from math-worksheet.md FAQ section
  faq: {
    sectionTitle: "FAQ - Scheda Gratuita per Bambini e Scheda per Scuola dell'Infanzia. Scheda per Bambini",
    sectionDescription: 'Risposte alle domande più comuni sul nostro generatore schede didattiche',
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
        question: 'Le Schede Gratuite Matematica sono Davvero Gratuite?',
        answer: `Il generatore schede matematica richiede abbonamento Pacchetto Essenziale che costa 144 euro annualmente oppure 15 euro mensili. Il tuo abbonamento dà creazione illimitata di schede didattiche senza costi per foglio. Genera quante schede matematica necessiti senza costi aggiuntivi. Crea schede didattiche con pregrafismo, tabelline, disegni da colorare senza limiti.

Il Pacchetto Essenziale include 10 generatori di schede didattiche popolari. L'abbonamento Accesso Completo costa 240 euro annualmente e include tutti 33 tipi di generatori. Entrambi abbonamenti includono licenza commerciale, supporto 11 lingue e qualità esportazione 300 DPI professionale. Numeri da stampare illimitati e alfabeto completo inclusi.`,
      },
      {
        id: '2',
        question: 'Posso Stampare Schede Gratuite per Bambini a Casa?',
        answer: `Assolutamente sì. Le schede matematica funzionano perfettamente su qualsiasi stampante domestica. Stampanti inkjet e laser producono risultati eccellenti. Le schede didattiche esportano in qualità 300 DPI per chiarezza massima. Numeri da stampare risultano nitidi su carta comune.

Schede didattiche con disegni da colorare stampano su carta A4 standard. Usa carta normale 80g per uso quotidiano. Usa cartoncino 120-160g per schede didattiche durature. Le schede matematica con pregrafismo resistono a uso ripetuto bambini. Scegli opzione scala grigi per risparmiare inchiostro colorato.`,
      },
      {
        id: '3',
        question: 'Come Creo Schede Gratuite per Scuola dell\'Infanzia?',
        answer: `No, zero esperienza design necessaria per schede matematica. Il generatore è progettato per insegnanti senza competenze tecniche. Selezioni opzioni da menu semplici. Clicchi genera e schede didattiche appaiono automaticamente. Tutto il lavoro design è gestito dal software.

Anche personalizzazione avanzata rimane semplice. Trascina elementi con mouse o tocco. Ridimensiona disegni da colorare tirando angoli. Aggiungi pregrafismo e alfabeto con strumenti testo. Le schede didattiche si creano con stessa facilità di documento Word. Nessuna curva apprendimento complicata.`,
      },
      {
        id: '4',
        question: 'Posso Usare Scheda Gratuita per Bambini in Classe?',
        answer: `L'abbonamento Pacchetto Essenziale include uso illimitato in classe. Stampa quante copie necessiti per i tuoi studenti. Distribuisci schede didattiche a tutta classe senza restrizioni. Usa schede matematica per lezioni, compiti, valutazioni e pratica. Le schede didattiche con pregrafismo funzionano perfettamente per centri apprendimento.

Crea versioni differenziate per livelli diversi studenti. Alcuni ricevono schede matematica facili con disegni da colorare grandi. Altri ricevono tabelline avanzate. Tutti lavorano contemporaneamente su materiali appropriati. Le schede didattiche permettono differenziazione efficace.`,
      },
      {
        id: '5',
        question: 'In Quali Lingue Sono Disponibili Schede Gratuite?',
        answer: `Le schede matematica supportano 11 lingue completamente. Italiano, inglese, tedesco, francese, spagnolo, portoghese brasiliano, olandese, danese, svedese, norvegese e finlandese. Cambia lingua interfaccia con singolo clic. Tutti pulsanti e etichette si traducono automaticamente.

Crea schede didattiche multilingue per studenti ESL. Schede italiano classe prima in italiano puro. Stesse schede in inglese per confronto. Le immagini con alfabeto e numeri da stampare funzionano in tutte le lingue. Perfetto per programmi bilinguismo e classi internazionali.`,
      },
      {
        id: '6',
        question: 'Posso Vendere Stampabili Gratuiti Che Creo?',
        answer: `Sì. L'abbonamento Pacchetto Essenziale include licenza commerciale print-on-demand completa senza costi extra. Vendi schede didattiche su Teachers Pay Teachers senza limitazioni. Carica su Etsy come prodotti digitali. Pubblica raccolte su Amazon KDP. Le schede matematica con tabelline e disegni da colorare si vendono eccellentemente.

Non serve attribuzione sulle schede didattiche vendute. Usa come preferisci per business educativo. Molti insegnanti guadagnano 500-5000 euro mensili vendendo schede matematica. Pacchetti tematici con pregrafismo e alfabeto sono particolarmente popolari. La licenza commerciale vale oltre 150 euro annui presso concorrenti ma è inclusa nei 144 euro Pacchetto Essenziale.`,
      },
      {
        id: '7',
        question: 'Come Personalizzo Scheda Gratuita per Bambini?',
        answer: `Personalizzazione inizia con selezione difficoltà per schede didattiche. Scegli molto facile per bambini piccoli. Difficile per studenti avanzati praticando tabelline. Seleziona quanti esercizi per foglio. Configura intervallo numeri da stampare da 0 a 100.

Scegli temi immagini per schede matematica. Animali per bambini amanti natura. Veicoli per appassionati trasporti. Carica disegni da colorare personalizzati per temi specifici lezione. Aggiungi sfondi e bordi coordinati. Include testo con pregrafismo per pratica scrittura. Ogni scheda didattica diventa perfetta per tua classe.`,
      },
      {
        id: '8',
        question: 'Per Quali Età Funzionano Schede Gratuite per Bambini?',
        answer: `Le schede didattiche funzionano perfettamente per età 3-9 anni. Scuola dell'infanzia usa livello molto facile con 2 simboli. Disegni da colorare grandi e numeri da stampare chiari. Bambini 3-6 anni contano immagini facilmente.

Classe prima e seconda usano difficoltà media con 3 simboli. Schede italiano classe prima combinano matematica con alfabeto. Classe terza pratica tabelline con livello difficile 4 simboli. Le schede didattiche con pregrafismo si adattano a sviluppo bambini. Ogni livello offre sfida appropriata.`,
      },
      {
        id: '9',
        question: 'Posso Caricare Immagini nelle Schede Gratuite per Bambini?',
        answer: `Assolutamente sì. Il generatore accetta caricamento immagini personalizzate. Formati supportati includono JPEG, PNG e GIF. Carica file multipli contemporaneamente per schede matematica. Le immagini caricate si combinano con libreria 3000+ disegni inclusi.

Usa foto oggetti dalla tua classe. Carica disegni da colorare che bambini hanno creato. Include mascotte scuola o progetti tematici. Le immagini personalizzate rendono schede didattiche uniche e riconoscibili. Perfetto per schede matematica con pregrafismo personalizzato per tua scuola.`,
      },
      {
        id: '10',
        question: 'Quanto Tempo Serve per Creare Schede Gratuite?',
        answer: `Creare schede didattiche professionali richiede meno di 3 minuti totali. Selezione difficoltà e operazioni: 30 secondi. Scelta immagini o tema: 1 minuto. Generazione: istantanea. Personalizzazione opzionale: 1-2 minuti. Download: 10 secondi. Schede matematica complete in minuti invece di ore.

Rispetto metodo tradizionale risparmi 27-57 minuti per foglio. Crea 10 schede didattiche diverse in 30 minuti invece di 5-10 ore. Le schede matematica con tabelline e disegni da colorare si producono velocemente. Tempo risparmiato si usa per pianificazione o interazione studenti.`,
      },
      {
        id: '11',
        question: 'Le Schede Gratuite per Scuola dell\'Infanzia Includono Soluzioni?',
        answer: `Sì, puoi includere risposte direttamente nelle schede didattiche. Attiva opzione "Mostra risposte in foglio" durante configurazione. Le soluzioni appaiono accanto a ogni esercizio. Perfetto per schede matematica autocorrettive. Gli studenti verificano lavoro indipendentemente.

Alternativamente genera schede didattiche senza risposte per valutazioni. Crea versione separata con soluzioni per chiave risposta insegnante. Le schede matematica offrono flessibilità completa. Disegni da colorare e pregrafismo funzionano con o senza risposte mostrate.`,
      },
      {
        id: '12',
        question: 'Posso Creare Scheda Gratuita per Bambini su Argomenti Specifici?',
        answer: `Le schede matematica usano immagini tematiche per collegare a argomenti curricolo. Tema animali per unità scienze naturali. Tema cibo per lezioni nutrizione. Tema stagioni per studi sociali. I disegni da colorare coordinano con lezioni altre materie.

Combina schede didattiche matematica con alfabeto per literacy integrata. Usa pregrafismo e numeri da stampare per sviluppo motorio. Le tabelline si praticano con qualsiasi tema visivo. Schede matematica diventano strumenti apprendimento interdisciplinare. Ogni foglio supporta obiettivi curricolo multipli contemporaneamente.`,
      },
    ],
  },

  // Pricing Section
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
    bundleDescription: 'Il tuo abbonamento include l\'accesso a 10 generatori di schede:',
    bundleApps: [
      'Addizioni con Immagini',
      'Treno dell\'Alfabeto',
      'Pagine da Colorare',
      'Schede di Matematica',
      'Parole Mescolate',
      'Trova e Conta',
      'Gioco di Associazione',
      'Tracciare Linee',
      'Bingo con Immagini',
      'Sudoku',
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: "Schede Gratuite Combinare - Scheda per Bambini e Stampabili Gratuiti",
    sectionDescription: 'Il generatore schede matematica è uno di 33 strumenti sulla piattaforma. Combina diverse schede didattiche per creare pacchetti apprendimento completi. Schede matematica più schede italiano classe prima per literacy integrata. Disegni da colorare più pregrafismo per sviluppo motorio. Tabelline più alfabeto per rinforzo multiplo. I pacchetti combinati offrono esperienze apprendimento ricche.',
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
        description: 'Crea schede di addizioni per completare il curriculum matematico. Stessa interfaccia e qualità delle schede matematica.',
      },
      {
        id: '2',
        slug: 'subtraction',
        name: 'Sottrazioni',
        category: 'Matematica',
        icon: '➖',
        description: 'Genera schede di sottrazioni per rinforzo matematico. Perfetto abbinamento con schede matematica.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Treno dell\'Alfabeto',
        category: 'Apprendimento Precoce',
        icon: '🚂',
        description: 'Combina matematica con apprendimento delle lettere. Crea pacchetti integrati per sviluppo completo.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Disegni da Colorare',
        category: 'Arte e Creatività',
        icon: '🎨',
        description: 'Aggiungi attività artistiche dopo esercizi matematici. Transizione perfetta tra concentrazione e rilassamento.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Trova e Conta',
        category: 'Matematica',
        icon: '🔍',
        description: 'Rinforza competenze di conteggio con attività visive. Perfetto complemento alle schede matematica.',
      },
      {
        id: '6',
        slug: 'matching',
        name: 'Abbinamenti',
        category: 'Logica',
        icon: '🔗',
        description: 'Sviluppa memoria e riconoscimento visivo con attività di abbinamento tematiche.',
      },
    ],
  },
};

export default mathWorksheetsItContent;
