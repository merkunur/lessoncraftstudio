import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Italian Content (Abbinamenti)
 *
 * File: frontend/content/product-pages/it/abbinamenti-schede.ts
 * URL: /it/apps/abbinamenti-schede
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Italian/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingItContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'abbinamenti-schede',
    appId: 'matching-app',
    title: 'Schede Didattiche di Abbinamenti | Generatore Schede per Scuola Primaria',
    description: 'Crea schede didattiche di abbinamenti professionali in pochi minuti. Il nostro generatore di abbinamenti permette di creare esercizi visivi perfetti per la scuola primaria e scuola dell\'infanzia. Genera schede didattiche personalizzate in formato PDF.',
    keywords: 'schede didattiche abbinamenti, schede scuola primaria, esercizi abbinamento, scuola infanzia, schede stampabili, generatore schede, abbinamento immagini, classe prima, pregrafismo, materiale didattico',
    canonicalUrl: 'https://www.lessoncraftstudio.com/it/apps/abbinamenti-schede',
  },

  // Hero Section
  hero: {
    title: 'Generatore di Schede Didattiche Abbinamenti',
    subtitle: 'Schede per Scuola Primaria e Scuola dell\'Infanzia',
    description: `Crea schede didattiche di abbinamenti professionali in pochi minuti. Il nostro generatore di abbinamenti permette di creare esercizi visivi perfetti per la scuola primaria. L'abbonamento Pacchetto Essenziale ti dà accesso illimitato a questo strumento a soli €144 all'anno. Genera tutte le schede didattiche che vuoi senza costi aggiuntivi per scheda.

Il generatore di abbinamenti è perfetto per creare schede didattiche scuola primaria. Usa immagini e parole per aiutare gli studenti a imparare. Ideale per classe prima, classe seconda e classe terza. Gli insegnanti della scuola dell'infanzia amano questo strumento per le attività di pregrafismo e riconoscimento visivo.

Le schede didattiche di abbinamenti sono uno strumento essenziale per l'insegnamento. Aiutano gli studenti a sviluppare il riconoscimento visivo. Rafforzano la memoria e la concentrazione. Supportano l'apprendimento dell'alfabeto e dei numeri. Rendono l'apprendimento divertente e coinvolgente.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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
    sectionTitle: 'Esempi di Schede Didattiche di Abbinamenti',
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
        worksheetSrc: '/samples/english/matching/matching portrait.jpeg',
        answerKeySrc: '/samples/english/matching/matching portrait answer_key.jpeg',
        altText: 'Scheda didattica di abbinamenti formato verticale con immagini per scuola primaria',
        pdfDownloadUrl: '/samples/english/matching/matching portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/matching/image and word.jpeg',
        answerKeySrc: '/samples/english/matching/image and word answer_key.jpeg',
        altText: 'Scheda abbinamenti immagine e parola per scuola dell\'infanzia',
        pdfDownloadUrl: '/samples/english/matching/image and word.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/matching/image and custom word.jpeg',
        answerKeySrc: '/samples/english/matching/image and custom word answer_key.jpeg',
        altText: 'Scheda abbinamenti immagine e parola personalizzata per classe prima',
        pdfDownloadUrl: '/samples/english/matching/image and custom word.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Funzionalità del Generatore di Schede di Abbinamenti',
    sectionDescription: 'Il nostro generatore di abbinamenti offre funzioni complete per creare schede didattiche professionali. Ogni funzione è stata progettata per gli insegnanti della scuola primaria. Crea schede didattiche scuola primaria in pochi minuti. Perfetto anche per la scuola dell\'infanzia e attività di pregrafismo.',
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
        title: 'Creazione Facile di Schede Didattiche',
        description: `Crea schede didattiche di abbinamenti in tre semplici passaggi. Scegli le immagini dalla raccolta. Seleziona la modalità di abbinamento. Clicca genera e la tua scheda è pronta. Perfetto per schede matematica con numeri da stampare. Ideale per esercizi di alfabeto e lettere dell'alfabeto. Ottimo per creare schede italiano classe prima.

Il generatore funziona per qualsiasi livello. Crea schede per la scuola dell'infanzia. Perfetto per classe prima e classe seconda. Gli insegnanti risparmiano ore di preparazione. Non servono competenze di design. L'interfaccia è intuitiva e facile da usare.

Combina con disegni da colorare per attività complete. Aggiungi esercizi di pregrafismo alla stessa pagina. Crea schede per le tabelline e la matematica. Tutto in un unico strumento semplice. Le schede didattiche scuola primaria sono pronte per la stampa immediata.`,
        icon: '⚡',
        highlighted: true,
      },
      {
        id: '2',
        title: 'Modifica Completa su Canvas',
        description: `Ogni elemento sulla scheda è completamente modificabile. Trascina, ruota e ridimensiona qualsiasi oggetto. Cambia colori, caratteri e dimensioni. Aggiungi testo personalizzato ovunque. Sposta le immagini per l'impaginazione perfetta. Cancella elementi non necessari con un clic.

Questa flessibilità è perfetta per schede didattiche scuola primaria personalizzate. Crea schede italiano classe prima con il layout ideale. Adatta schede matematica alle esigenze dei tuoi studenti. Modifica schede per la scuola dell'infanzia con caratteri grandi. Personalizza esercizi di alfabeto e lettere dell'alfabeto.

Gli strumenti di allineamento aiutano a posizionare gli elementi. Porta oggetti in primo piano o sullo sfondo. Allinea le immagini perfettamente. Blocca elementi che non vuoi spostare. Annulla e ripeti modifiche illimitate. Crea schede didattiche professionali senza essere un designer.`,
        icon: '✏️',
        highlighted: false,
      },
      {
        id: '3',
        title: 'Carica Immagini Personali',
        description: `Carica le tue foto e immagini. Combina immagini personali con la raccolta di 3000 immagini. Aggiungi foto dei tuoi studenti. Usa immagini della tua classe. Perfetto per personalizzare schede didattiche scuola primaria.

Carica foto per esercizi di alfabeto personalizzati. Aggiungi immagini per schede matematica tematiche. Combina con numeri da stampare per esercizi unici. Crea schede italiano classe prima con nomi degli studenti. Personalizza attività di pregrafismo con le loro foto.

Il sistema accetta tutti i formati comuni. JPEG, PNG e GIF funzionano perfettamente. Carica file multipli in una volta. Ridimensiona automaticamente le immagini troppo grandi. Combina con disegni da colorare dalla raccolta. Perfetto per schede didattiche scuola dell'infanzia personalizzate.`,
        icon: '📤',
        highlighted: false,
      },
      {
        id: '4',
        title: 'Supporto 11 Lingue',
        description: `Il generatore funziona in 11 lingue diverse. Perfetto per insegnanti di lingue straniere. Ideale per scuole internazionali. Essenziale per programmi bilingue. La raccolta di immagini include nomi in tutte le lingue.

Crea schede di alfabeto in inglese, tedesco, francese. Perfetto per insegnare lettere dell'alfabeto in spagnolo. Genera schede italiano classe prima per studenti ESL. Ottimo per esercizi di pregrafismo multilingue. Le schede didattiche scuola primaria funzionano in qualsiasi lingua.

Le lingue supportate includono italiano, portoghese, olandese. Anche svedese, danese, norvegese e finlandese. I nomi delle immagini si adattano automaticamente. Crea schede matematica con numeri da stampare in tutte le lingue. Perfetto per insegnare le tabelline in contesti multilingue.`,
        icon: '🌍',
        highlighted: false,
      },
      {
        id: '5',
        title: 'Licenza Commerciale Inclusa',
        description: `L'abbonamento Pacchetto Essenziale include la licenza commerciale completa. Vendi tutte le schede didattiche che crei. Perfetto per Teachers Pay Teachers. Ideale per negozi Etsy. Ottimo per Amazon KDP. Nessun costo aggiuntivo di licenza.

Crea schede didattiche scuola primaria e vendile online. Genera pacchetti di schede matematica per Teachers Pay Teachers. Vendi raccolte di schede italiano classe prima. Crea prodotti con alfabeto e lettere dell'alfabeto. Combina con disegni da colorare per pacchetti completi.

La qualità 300 DPI è perfetta per la stampa professionale. Crea prodotti print-on-demand senza problemi. Vendi schede per la scuola dell'infanzia. Genera pacchetti di pregrafismo e numeri da stampare. Molti insegnanti guadagnano 500-5000 euro al mese vendendo schede didattiche.`,
        icon: '📜',
        highlighted: false,
      },
      {
        id: '6',
        title: 'Raccolta di 3000+ Immagini',
        description: `Accesso a oltre 3000 immagini adatte ai bambini. Organizzate per temi educativi. Cerca per parola chiave. Filtra per categoria. Perfetto per creare schede didattiche scuola primaria su qualsiasi argomento.

La raccolta include immagini per alfabeto completo. Tutte le lettere dell'alfabeto con immagini corrispondenti. Numeri da stampare da 0 a 100. Oggetti per schede matematica e tabelline. Temi per schede italiano classe prima. Immagini per attività di pregrafismo.

Ogni tema include 20-50 immagini correlate. Animali, cibo, trasporti, natura. Perfetto per la scuola dell'infanzia. Sfondi e bordi decorativi inclusi. Combina facilmente con disegni da colorare. Crea schede didattiche scuola primaria tematiche professionali.`,
        icon: '🖼️',
        highlighted: false,
      },
      {
        id: '7',
        title: 'Qualità Professionale 300 DPI',
        description: `Esporta schede in qualità 300 DPI. Perfetto per la stampa professionale. Nitido su qualsiasi stampante. Ideale per fotocopie multiple. Le schede didattiche scuola primaria mantengono la qualità.

Scarica in formato PDF o JPEG. Il PDF è perfetto per la stampa diretta. JPEG funziona per documenti digitali. Opzione scala di grigi per risparmiare inchiostro. Genera automaticamente le soluzioni. Risparmia tempo nella preparazione.

Stampa schede matematica cristalline. Numeri da stampare sempre leggibili. Alfabeto e lettere dell'alfabeto nitide. Schede italiano classe prima di qualità professionale. Attività di pregrafismo con linee perfette. Disegni da colorare pronti per la classe. Le schede per la scuola dell'infanzia sono sempre perfette.`,
        icon: '✨',
        highlighted: false,
      },
    ],
  },

  // How-To Guide Section
  howTo: {
    sectionTitle: 'Come Creare Schede di Abbinamenti in 5 Passaggi',
    sectionDescription: 'Creare schede didattiche professionali richiede meno di 3 minuti. Questa guida ti mostra ogni passaggio. Perfetto per insegnanti della scuola primaria. Ideale anche per la scuola dell\'infanzia. Crea schede didattiche scuola primaria di qualità professionale senza esperienza di design.',
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
        title: 'Scegli Contenuto per le Schede',
        description: `Il primo passo è scegliere il contenuto delle tue schede. Tre opzioni disponibili per massima flessibilità. Scegli tema casuale per schede didattiche scuola primaria veloci. Seleziona tema specifico per unità didattiche. Oppure scegli immagini specifiche per controllo totale.

L'opzione tema casuale genera schede in secondi. Perfetto quando hai bisogno di schede didattiche velocemente. Ottimo per compiti a sorpresa. Il generatore sceglie immagini automaticamente. Ogni volta crei schede didattiche scuola primaria diverse.

La selezione per tema funziona per unità specifiche. Scegli animali per schede di scienze. Seleziona numeri da stampare per schede matematica. Usa oggetti della classe per schede italiano classe prima. Perfetto per esercizi di alfabeto tematici. Ideale per attività di pregrafismo coordinate.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personalizza Impostazioni',
        description: `Il secondo passo è configurare le impostazioni della scheda. Scegli il formato pagina adatto. A4 verticale è standard per schede didattiche scuola primaria italiane. Letter è comune in altri paesi. A4 orizzontale funziona per schede con molte immagini.

Seleziona la modalità di abbinamento. Immagine a lettera iniziale è perfetto per alfabeto. Gli studenti abbinano oggetti alle lettere dell'alfabeto. Ottimo per schede italiano classe prima. Ideale per imparare l'alfabeto in scuola dell'infanzia. Rinforza il riconoscimento delle lettere iniziali.

Immagine più parola a immagine più parola è per la lettura. Perfetto per schede didattiche scuola primaria di lettura. Combina riconoscimento visivo con parole scritte. Ottimo per classe prima e classe seconda. Rinforza connessioni parola-immagine.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera la Scheda Didattica',
        description: `Il terzo passaggio è generare l'anteprima. Clicca il pulsante Crea e la scheda appare istantaneamente. Vedi esattamente come sarà stampata. Tutte le schede didattiche scuola primaria appaiono in alta qualità. L'anteprima mostra ogni dettaglio.

Il generatore posiziona automaticamente gli elementi. Abbinamenti distribuiti uniformemente sulla pagina. Numeri da stampare chiaramente visibili. Lettere dell'alfabeto ben leggibili. Perfetto per schede italiano classe prima. Ottimo per esercizi di pregrafismo con spazio sufficiente.

Ogni generazione è unica. Clicca Crea più volte per varianti. Perfetto per schede didattiche scuola dell'infanzia diverse per ogni studente. Genera multiple versioni di schede matematica. Crea varianti di esercizi di alfabeto. Ottimo per evitare che gli studenti copino.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifica sulla Tela',
        description: `Il quarto passaggio è personalizzare sulla canvas. Clicca qualsiasi elemento per selezionarlo. Trascina per riposizionare. Ruota per orientamento diverso. Ridimensiona con le maniglie d'angolo. Cancella elementi non necessari.

Aggiungi testo personalizzato alle schede didattiche scuola primaria. Scrivi il nome dello studente. Aggiungi istruzioni specifiche. Perfetto per schede italiano classe prima personalizzate. Inserisci titoli per schede matematica. Aggiungi note per esercizi di pregrafismo.

Modifica caratteri e colori. Cambia dimensione testo per scuola dell'infanzia. Ingrandisci numeri da stampare per visibilità. Rendi lettere dell'alfabeto più grandi. Cambia colori per schede tematiche. Aggiungi bordi decorativi.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Scarica e Stampa',
        description: `Il quinto passaggio è scaricare le schede finite. Scegli formato PDF per stampa diretta. Oppure JPEG per documenti digitali. Entrambi formati a 300 DPI. Qualità professionale garantita. Le schede didattiche scuola primaria escono perfette.

Attiva opzione scala di grigi per risparmiare inchiostro. Perfetto per schede matematica in bianco e nero. Ottimo per disegni da colorare da stampare. Ideale per numeri da stampare economici. Le schede italiano classe prima funzionano bene in grigio.

Scarica sia scheda che soluzioni. La scheda per gli studenti. Le soluzioni per correzione veloce. Perfetto per schede di tabelline con risposte. Ottimo per verifiche di alfabeto. Ideale per esercizi di pregrafismo con modelli.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section
  useCases: {
    sectionTitle: 'Perfetto per Insegnanti, Genitori ed Educatori',
    sectionDescription: 'Le schede didattiche di abbinamenti servono diversi tipi di insegnanti. Ogni gruppo trova valore unico. Dalla scuola dell\'infanzia alla classe terza. Per italiano, matematica e tabelline. Perfetto per schede italiano classe prima e pregrafismo.',
    badgeText: 'Chi Usa le Nostre Schede',
    readMoreLabel: 'Leggi di più',
    showLessLabel: 'Mostra meno',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Insegnanti della Scuola dell\'Infanzia',
        subtitle: 'Pregrafismo, Alfabeto e Riconoscimento Visivo',
        description: `Gli insegnanti della scuola dell'infanzia usano schede di abbinamenti per sviluppo cognitivo. Perfetto per riconoscimento visivo. Ottimo per discriminazione di forme. Ideale per attività di pregrafismo preparatorie. I bambini piccoli adorano abbinare immagini.

Crea schede didattiche con immagini grandi e colorate. Usa modalità immagine a immagine per semplicità. Perfetto per bambini di 3-5 anni. Combina con disegni da colorare per attività multiple. Aggiungi pregrafismo tracciando linee tra abbinamenti.

Le schede didattiche scuola dell'infanzia rinforzano categorie. Abbina animali, cibo, giocattoli. Sviluppa vocabolario con nomi delle immagini. Prepara per l'apprendimento dell'alfabeto. Introduce numeri da stampare in modo giocoso. Fondamentale per sviluppo cognitivo precoce.`,
        quote: 'I bambini adorano abbinare le immagini colorate!',
      },
      {
        id: '2',
        icon: '👩‍🏫',
        title: 'Insegnanti Scuola Primaria Classe Prima',
        subtitle: 'Schede Italiano, Alfabeto e Tabelline Base',
        description: `Gli insegnanti di classe prima usano abbinamenti per alfabetizzazione. Perfetto per schede italiano classe prima con lettere iniziali. Abbina oggetti a lettere dell'alfabeto. Rinforza corrispondenza suono-lettera. Essenziale per lettura emergente. Introduce tabelline base con immagini.

Crea schede didattiche scuola primaria per sillabe. Abbina immagini a sillabe iniziali. Perfetto per italiano fonologico. Usa numeri da stampare per matematica base. Genera schede matematica per addizioni semplici. Combina alfabeto con disegni da colorare motivanti.

Le schede italiano classe prima supportano differenziazione. Alcuni studenti abbinano lettere. Altri abbinano parole complete. Perfetto per livelli misti. Crea tabelline del 2 e del 5 con immagini. Attività di pregrafismo affinano motricità. Schede didattiche scuola primaria personalizzate per ogni bambino.`,
        quote: 'Le schede aiutano tutti i livelli della classe.',
      },
      {
        id: '3',
        icon: '📚',
        title: 'Insegnanti Classe Seconda e Terza',
        subtitle: 'Schede Matematica, Tabelline e Vocabolario',
        description: `Gli insegnanti di classe seconda e terza usano abbinamenti per consolidamento. Perfetto per schede matematica con tabelline complete. Abbina problemi a soluzioni. Rinforza fatti matematici. Ottimo per schede italiano classe prima avanzate. Espande vocabolario tematico.

Crea schede didattiche scuola primaria per tabelline dall'1 al 10. Abbina moltiplicazioni a risposte. Perfetto per memorizzazione. Usa numeri da stampare per esercizi misti. Genera schede matematica per divisioni base. Combina con disegni da colorare premiati.

Le schede per classe seconda e terza supportano apprendimento interdisciplinare. Abbina vocabolario di scienze. Collega eventi storici. Perfetto per geografia italiana. Crea schede didattiche scuola primaria tematiche. Integra pregrafismo avanzato con grafici. Rinforza tabelline problematiche.`,
        quote: 'Perfetto per consolidare le tabelline.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Genitori Homeschool',
        subtitle: 'Schede Didattiche Personalizzate',
        description: `I genitori homeschool adorano la flessibilità. Creano schede didattiche scuola primaria su misura. Perfetto per ritmo individuale. Ottimo per interessi specifici del bambino. Ideale per schede italiano classe prima personalizzate. Genera tabelline quando il bambino è pronto.

Crea schede matematica adattate al livello esatto. Non troppo facili né troppo difficili. Usa numeri da stampare per esercizi graduali. Perfetto per pregrafismo a casa. Combina alfabeto con passioni del bambino. Aggiungi disegni da colorare come pausa.

Le schede didattiche homeschool supportano apprendimento multisensoriale. Stampa e usa come gioco. Taglia per attività di manipolazione. Perfetto per bambini cinetici. Crea schede italiano classe prima con nomi di famiglia. Genera tabelline con oggetti domestici. Schede didattiche scuola dell'infanzia per fratelli minori.`,
        quote: 'Creo schede su misura per ogni figlio.',
      },
      {
        id: '5',
        icon: '💚',
        title: 'Insegnanti di Sostegno',
        subtitle: 'Schede Differenziate per Bisogni Speciali',
        description: `Gli insegnanti di sostegno usano schede per differenziazione. Perfetto per bisogni educativi speciali. Ottimo per disturbi dell'apprendimento. Ideale per schede didattiche scuola primaria semplificate. Supporta studenti con difficoltà in tabelline. Rinforza pregrafismo per motricità fine.

Crea schede italiano classe prima con font grandi. Usa immagini extra-chiare. Perfetto per dislessia. Genera schede matematica con aiuti visivi. Numeri da stampare colorati per discalculia. Combina disegni da colorare con apprendimento.

Le schede di abbinamento supportano interventi specifici. Perfetto per terapia logopedica con alfabeto. Ottimo per tabelline con immagini concrete. Ideale per pregrafismo graduato. Crea schede didattiche scuola primaria per autismo. Routine prevedibili con stesso formato. Schede didattiche scuola dell'infanzia per ritardi sviluppo.`,
        quote: 'Finalmente materiali che posso adattare completamente.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Imprenditori Educativi',
        subtitle: 'Vendi su Teachers Pay Teachers ed Etsy',
        description: `Gli imprenditori educativi creano prodotti da vendere. Perfetto per Teachers Pay Teachers. Ottimo per negozi Etsy. Ideale per Amazon KDP. Crea pacchetti di schede italiano classe prima. Vendi raccolte di tabelline complete. Genera schede didattiche scuola primaria tematiche.

Crea bundle di schede matematica per anno scolastico. Include tabelline dall'1 al 10. Aggiungi numeri da stampare decorativi. Combina alfabeto con disegni da colorare. Perfetto per pacchetti di pregrafismo. Schede didattiche scuola dell'infanzia vendono bene.

I venditori guadagnano 500-5000 euro mensili. Crea prodotti stagionali con schede didattiche scuola primaria. Pacchetti natalizi di tabelline. Schede italiano classe prima primaverili. Bundle di pregrafismo estivo. Collezioni di schede matematica per ogni trimestre. Disegni da colorare bonus aumentano valore.`,
        quote: 'Ho guadagnato più di 2000 euro il primo anno.',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Domande Frequenti sulle Schede di Abbinamenti',
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
        question: 'Posso Creare Schede per la Scuola dell\'Infanzia con Disegni da Colorare?',
        answer: `Sì, assolutamente. Il generatore funziona perfettamente per scuola dell'infanzia. Crea schede italiano classe prima semplificate per bambini piccoli. Genera tabelline base del 2 e del 5 con immagini. Combina con disegni da colorare per attività multilivello. Perfetto per bambini di 3-6 anni.

Per la scuola dell'infanzia usa modalità immagine a immagine. I bambini abbinano figure colorate. Non serve saper leggere. Perfetto per sviluppo cognitivo. Aggiungi disegni da colorare come rinforzo. Usa immagini grandi e chiare. Caratteri enormi per testo minimo.`,
      },
      {
        id: '2',
        question: 'Posso Combinare Schede Matematica con Numeri da Stampare e Pregrafismo?',
        answer: `Sì, combinazione perfetta per apprendimento completo. Crea schede matematica con numeri da stampare grandi. Aggiungi spazio per pregrafismo tracciando numeri. Includi disegni da colorare matematici come bonus. Un'unica scheda copre 4 abilità diverse.

Le schede matematica con numeri da stampare rinforzano riconoscimento. I bambini vedono numeri chiari. Tracciano per pregrafismo. Colorano immagini correlate. Contano oggetti nei disegni da colorare. Apprendimento multisensoriale potente.`,
      },
      {
        id: '3',
        question: 'Le Schede Didattiche Funzionano per Pregrafismo e Tabelline Insieme?',
        answer: `Sì, eccellente combinazione per classe prima. Le schede didattiche scuola primaria supportano abilità multiple. Pregrafismo tracciando linee tra abbinamenti. Tabelline con rappresentazioni visive. Motricità fine e matematica insieme. Efficienza massima.

Il pregrafismo migliora quando traccia linee significative. Non solo linee casuali. Connettere abbinamenti tabelline dà senso. Il bambino traccia da 2x3 a immagine con 6 oggetti. Pregrafismo con scopo matematico. Rinforza entrambe le abilità.`,
      },
      {
        id: '4',
        question: 'Quali Modalità di Abbinamento Sono Disponibili?',
        answer: `Il nostro generatore offre quattro modalità di abbinamento diverse. Abbina immagini a lettere iniziali per esercizi di alfabeto. Abbina immagini e parole per la lettura. Abbina immagini tra loro per il riconoscimento visivo. Oppure crea abbinamenti personalizzati con le tue parole.

Ogni modalità serve scopi didattici diversi. Immagine a lettera è perfetto per schede italiano classe prima. Immagine e parola rinforza la lettura. Immagine a immagine funziona per scuola dell'infanzia. Parola personalizzata serve per vocabolario specifico.`,
      },
      {
        id: '5',
        question: 'Posso Stampare le Schede a Casa su Stampante Normale?',
        answer: `Assolutamente sì. Tutte le schede didattiche si stampano perfettamente su qualsiasi stampante domestica standard. I file PDF sono ottimizzati per stampanti inkjet e laser. Non serve attrezzatura specializzata. Una normale stampante A4 o Letter funziona perfettamente per schede didattiche scuola primaria.

L'opzione scala di grigi è particolarmente utile per stampa domestica. Converte schede colorate in bianco e nero per risparmiare inchiostro. Le schede in scala di grigi mantengono chiarezza completa. Gli studenti possono colorare dopo l'abbinamento.`,
      },
      {
        id: '6',
        question: 'Posso Vendere le Schede Didattiche Che Creo?',
        answer: `Sì. L'abbonamento Pacchetto Essenziale include licenza commerciale print-on-demand completa senza costi extra. Vendi tutte le schede didattiche scuola primaria create su Teachers Pay Teachers, Etsy e Amazon KDP. Nessuna attribuzione richiesta. Nessuna royalty oltre l'abbonamento. Mantieni 100% dei profitti dalle vendite.

La licenza copre vendita come download digitali e prodotti stampati. Vendi pacchetti PDF su Etsy. Pubblica libri stampabili su Amazon KDP. Crea bundle tematici per Teachers Pay Teachers.`,
      },
      {
        id: '7',
        question: 'Quanto Tempo Serve per Creare Schede Didattiche Complete?',
        answer: `Dall'apertura del generatore al download finale servono meno di 3 minuti. Selezionare immagini richiede 30-45 secondi. Configurare impostazioni 30 secondi. Generazione istantanea 2-3 secondi. Download finale 10 secondi. Totale sotto 2 minuti se non modifichi sul canvas.

Se modifichi sul canvas aggiungi 2-5 minuti. Dipende da quanto vuoi personalizzare. Anche con modifiche estese raramente superi 5 minuti totali.`,
      },
      {
        id: '8',
        question: 'Le Schede Didattiche Includono le Soluzioni?',
        answer: `Sì. Ogni scheda didattica include automaticamente le soluzioni. Risparmia tempo prezioso nella preparazione. Scarica in formato PDF o JPEG. Stampa a casa o a scuola. Qualità professionale 300 DPI perfetta per la stampa.

Il foglio soluzioni usa stesso layout della scheda principale. Gli studenti confrontano facilmente loro risposte con soluzioni. Questa corrispondenza visiva aiuta apprendimento. Scarica entrambe le versioni con un clic.`,
      },
      {
        id: '9',
        question: 'Quali Lingue Sono Supportate?',
        answer: `Il generatore supporta 11 lingue per libreria immagini. Inglese, tedesco, francese, spagnolo, portoghese, italiano, olandese, svedese, danese, norvegese e finlandese. Cambia lingua e i nomi file delle immagini cambiano automaticamente. Perfetto per schede italiano classe prima che insegnano vocabolario mentre praticano abbinamenti.

Le schede funzionano in tutte le 11 lingue. L'interfaccia utente si traduce automaticamente secondo lingua selezionata. I menu, pulsanti e istruzioni appaiono in italiano quando selezioni italiano.`,
      },
      {
        id: '10',
        question: 'Per Quali Fasce d\'Età Funzionano Meglio Queste Schede?',
        answer: `Le schede didattiche di abbinamenti funzionano meglio per bambini di 3-10 anni. Questa fascia include scuola dell'infanzia e scuola primaria completa. Adatta complessità modificando numero di abbinamenti e tipo di contenuto.

I bambini di scuola dell'infanzia (3-6 anni) usano modalità immagine a immagine semplice. Gli studenti di classe prima e seconda (6-8 anni) usano abbinamenti con parole. Gli studenti di classe terza (8-10 anni) usano abbinamenti con vocabolario avanzato.`,
      },
      {
        id: '11',
        question: 'Posso Caricare le Mie Immagini Personalizzate?',
        answer: `Assolutamente sì. Il caricamento immagini personalizzate è funzione chiave. Carica file JPEG, PNG e GIF. Carica più file simultaneamente per efficienza. Le tue immagini si mescolano perfettamente con immagini della libreria. Crea schede completamente personalizzate.

Gli insegnanti caricano foto di oggetti della classe per schede contestualizzate. Carica disegni creati da studenti per schede ultra-personalizzate. I bambini sono entusiasti di vedere loro arte nelle schede.`,
      },
      {
        id: '12',
        question: 'Quanto Costa l\'Abbonamento?',
        answer: `L'abbonamento Pacchetto Essenziale costa 144 euro all'anno. Oppure 15 euro mensili. Accesso illimitato a schede didattiche di abbinamenti. Include 10 generatori popolari. Genera tutte le schede che vuoi. Licenza commerciale inclusa. Supporto 11 lingue.

L'abbonamento Accesso Completo costa 240 euro annuali. Include tutti i 33 generatori di schede della piattaforma. Questa versatilità rende l'abbonamento un eccellente investimento per insegnanti che usano più tipi di schede.`,
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
    sectionTitle: 'Combina le Schede di Abbinamenti con Altri Generatori',
    sectionDescription: 'L\'abbonamento Pacchetto Essenziale include 10 generatori. Combina il generatore di abbinamenti con altri strumenti. Crea pacchetti completi di schede didattiche. Perfetto per unità tematiche. Ottimo per centri di apprendimento. Risparmia ancora più tempo.',
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
        description: 'Aggiungi attività artistiche dopo esercizi di abbinamento. Transizione perfetta.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Treno dell\'Alfabeto',
        category: 'Apprendimento Precoce',
        icon: '🚂',
        description: 'Combina abbinamenti con apprendimento delle lettere per sviluppo completo.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Trova e Conta',
        category: 'Matematica',
        icon: '🔍',
        description: 'Pratica conteggio con schede trova e conta. Perfetto complemento agli abbinamenti.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Disegna Linee',
        category: 'Pregrafismo',
        icon: '✏️',
        description: 'Sviluppa motricità fine con schede di pregrafismo e tracciamento linee.',
      },
    ],
  },
};

export default matchingItContent;
