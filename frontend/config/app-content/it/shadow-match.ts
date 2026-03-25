import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'generatore schede abbinamento ombre',
    secondaryKeywords: [
      'generatore di schede di abbinamento ombre stampabili per venditori Etsy',
      'creatore di puzzle di silhouette per editori Amazon KDP',
      'generatore di schede di discriminazione visiva con licenza commerciale',
      'vendere schede di abbinamento ombre su Gumroad',
    ],
    lsiKeywords: [
      'prodotti digitali di discriminazione visiva per imprenditori',
      'generatore di puzzle di silhouette uso commerciale',
      'attività di percezione visiva stampabili per business online',
    ],
    titleTag: 'Generatore Schede Abbinamento Ombre | Crea Stampabili',
    metaDescription:
      'Crea schede di abbinamento ombre da vendere su Etsy, KDP e Gumroad. Modalità Ombra e Completa, silhouette automatiche, 104 temi, export PDF. Prova con filigrana.',
  },

  hero: {
    title: 'Generatore di Schede di Abbinamento Ombre per Attività di Corrispondenza Silhouette e Immagini Divise',
    tagline: 'Due modalità di corrispondenza in un solo generatore — Abbinamento Ombre crea silhouette nere generate automaticamente da qualsiasi immagine, Completa l\'Immagine divide le immagini in metà — entrambe con algoritmo di derangement Fisher-Yates che garantisce zero corrispondenze banali, risposte auto-generate e 104 collezioni di immagini tematiche.',
    description:
      'Crea schede professionali di abbinamento ombre dove gli utenti associano immagini colorate alle loro silhouette o riconnettono metà di immagini separate. La modalità Abbinamento Ombre posiziona 4 immagini colorate etichettate A, B, C, D nella riga superiore e 4 silhouette nere auto-generate etichettate 1, 2, 3, 4 nella riga inferiore — le silhouette vengono create tramite elaborazione a livello di pixel che converte ogni pixel con alpha > 10 in nero puro, producendo contorni precisi che preservano il profilo di trasparenza esatto di ogni immagine. La modalità Completa l\'Immagine divide le immagini in metà con direzione di taglio orizzontale o verticale, etichetta le prime metà A–D e le seconde metà 1–4, e adatta il layout in base all\'orientamento. Entrambe le modalità utilizzano un algoritmo di derangement Fisher-Yates per garantire che nessun elemento appaia nella sua posizione originale, creando veri e propri esercizi di corrispondenza ogni volta. Attiva o disattiva le etichette A/B/C/D e 1/2/3/4, aggiungi campi opzionali nome e data per l\'uso online, e genera risposte automatiche che mostrano ogni abbinamento corretto lettera-numero. Il Generatore di Abbinamento Ombre NON è sensibile alla lingua: il risultato è puramente visivo, senza contenuto testuale localizzato nella scheda. L\'Accesso Completo sblocca tutti i 104 temi con oltre 3100 illustrazioni e le 11 lingue di interfaccia. Aggiungi temi di sfondo e di bordo con controlli di opacità indipendenti, includi testo personalizzato con sette opzioni di font, ed esporta PDF e JPEG pronti per la stampa a 300 DPI nei formati Lettera, A4, Quadrato (1200×1200) o dimensioni personalizzate. Che tu venda pacchetti di puzzle di silhouette su Etsy, compili quaderni di percezione visiva per Amazon KDP o crei attività rapide di fine lezione per Gumroad, questo generatore produce schede pronte per la produzione in pochi minuti — prova gratuita con tutte le funzionalità, senza registrazione, senza carta di credito. I download includono una filigrana; acquista una licenza per rimuoverla.',
  },

  howItWorks: {
    title: 'Come Creare Schede di Abbinamento Ombre in 5 Passaggi',
    steps: [
      {
        title: 'Configura il Layout della Pagina',
        description:
          'Apri il pannello Impostazione Pagina e scegli un formato: Lettera Verticale, Lettera Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (1200×1200) o qualsiasi dimensione personalizzata. Seleziona un colore di sfondo con il selettore colori. Scegli un tema di sfondo e regola la sua opacità (da 0 a 1 in passi di 0,05), poi seleziona un tema di bordo con il proprio controllo di opacità indipendente. Queste opzioni di layout incorniciano la tua scheda di abbinamento ombre prima di configurare qualsiasi contenuto.',
      },
      {
        title: 'Scegli la Modalità di Esercizio e Configura le Opzioni',
        description:
          'Apri il pannello Configurazione Esercizio e seleziona la tua modalità: Abbinamento Ombre o Completa l\'Immagine. La modalità Abbinamento Ombre genera silhouette nere dalle immagini selezionate tramite elaborazione a livello di pixel. La modalità Completa l\'Immagine divide le immagini in metà — scegli la direzione di taglio orizzontale (sopra/sotto) o verticale (sinistra/destra) con i pulsanti radio che appaiono in questa modalità. Attiva o disattiva la casella «Mostra Etichette» (attiva per impostazione predefinita) per visualizzare gli identificativi A/B/C/D e 1/2/3/4 nella scheda. Attiva «Includi Campi Nome/Data» per aggiungere righe per nome e data dell\'utente.',
      },
      {
        title: 'Seleziona 4 Immagini dalla Libreria',
        description:
          'Apri il pannello Libreria Immagini ed esplora 104 collezioni tematiche con oltre 3100 illustrazioni colorate — animali, cibi, veicoli, natura, festività e decine di altri. Filtra per tema usando il menu a tendina o cerca per parola chiave con ritardo di 300 ms. Clicca sulle immagini per selezionarle — il contatore mostra il tuo progresso verso le 4 immagini richieste. L\'anteprima delle immagini selezionate conferma le tue scelte prima di generare. Puoi anche caricare immagini personalizzate PNG, JPG o GIF tramite il pannello Carica Immagini Personalizzate.',
      },
      {
        title: 'Genera la Scheda di Abbinamento Ombre',
        description:
          'Clicca su Genera per creare la scheda di corrispondenza. Nella modalità Abbinamento Ombre, l\'app elabora ogni immagine a livello di pixel — la carica su un canvas, estrae i dati dei pixel tramite getImageData e converte ogni pixel con alpha > 10 in nero puro (R=0, G=0, B=0, A=255) per produrre silhouette precise. Nella modalità Completa l\'Immagine, le immagini vengono divise lungo la direzione di taglio scelta. Entrambe le modalità applicano un derangement Fisher-Yates per garantire che nessun elemento appaia nella sua posizione originale. Un\'intestazione stilizzata appare con sfondo ambra (#FFC107), contenitore bianco a pillola e bordo ambra di 3 px mostrando «Abbinamento Ombre» e istruzioni nella lingua selezionata.',
      },
      {
        title: 'Genera le Risposte e Scarica',
        description:
          'Passa alla scheda Risposte per visualizzare le risposte auto-generate. Nella modalità Abbinamento Ombre, ogni cella mostra l\'immagine originale accanto alla sua silhouette con un\'etichetta come «A → 2» che indica la corrispondenza corretta. Nella modalità Completa l\'Immagine, ogni cella mostra l\'immagine originale completa con la sua etichetta di corrispondenza. Scarica entrambe le versioni con i quattro pulsanti dedicati: Scheda JPEG, Risposte JPEG, Scheda PDF e Risposte PDF a 300 DPI. Attiva la scala di grigi per versioni a risparmio d\'inchiostro. Ogni esportazione è pronta per la produzione: inserzioni Etsy, interni Amazon KDP e file prodotto Gumroad.',
      },
    ],
  },

  keyFeatures: {
    title: 'Caratteristiche Principali del Generatore di Schede di Abbinamento Ombre',
    features: [
      {
        title: 'Silhouette Auto-Generate tramite Elaborazione Immagini a Livello di Pixel',
        description:
          'La modalità Abbinamento Ombre crea silhouette nere attraverso vera manipolazione a livello di pixel — senza filtri CSS né risorse pre-fabbricate. L\'app carica ogni immagine su un canvas, estrae i dati dei pixel tramite getImageData e converte ogni pixel il cui valore alpha è superiore a 10 in nero puro (R=0, G=0, B=0, A=255). Questo preserva il profilo di trasparenza esatto di ogni immagine, producendo contorni di silhouette precisi che riflettono dettagli fini come orecchie di animali, forme di veicoli e contorni di oggetti. La gestione CORS assicura l\'elaborazione corretta di immagini cross-origin, con un fallback a un rettangolo nero solido se il canvas è contaminato.',
      },
      {
        title: 'Due Modalità di Esercizio: Abbinamento Ombre e Completa l\'Immagine con Opzioni di Direzione di Taglio',
        description:
          'Un solo generatore offre due attività di corrispondenza visiva distinte. La modalità Abbinamento Ombre posiziona 4 immagini colorate nella riga superiore e 4 silhouette auto-generate nella riga inferiore — gli utenti identificano ogni immagine solo dalla forma del suo contorno. La modalità Completa l\'Immagine divide 4 immagini in metà e presenta le prime e le seconde metà separatamente — gli utenti riconnettono i pezzi per completare ogni immagine. Nella modalità Completa l\'Immagine, scegli la direzione di taglio orizzontale (metà sopra/sotto) o verticale (metà sinistra/destra). Il layout si adatta automaticamente: le pagine orizzontali usano 2 righe × 4 elementi, le pagine verticali usano 2 colonne × 4 elementi.',
      },
      {
        title: 'Algoritmo di Derangement che Garantisce Zero Corrispondenze Banali',
        description:
          'Entrambe le modalità di esercizio utilizzano un algoritmo di derangement Fisher-Yates che garantisce che nessun elemento appaia nella sua posizione originale. Nella modalità Abbinamento Ombre, nessuna silhouette si trova direttamente sotto la sua immagine corrispondente. Nella modalità Completa l\'Immagine, nessuna seconda metà appare adiacente alla sua prima metà corrispondente. Questo elimina la possibilità di indovinare correttamente solo dalla posizione e garantisce che ogni scheda presenti una vera sfida di corrispondenza. Il derangement si ricalcola ad ogni generazione, producendo disposizioni diverse dallo stesso set di immagini.',
      },
      {
        title: 'Risposte Auto-Generate con Etichette di Corrispondenza Lettera-Numero',
        description:
          'Ogni scheda di abbinamento ombre genera automaticamente un foglio risposte complementare in una scheda canvas separata. Il foglio risposte usa un layout a griglia dove ogni cella mostra l\'immagine originale accanto alla sua silhouette o immagine completa, etichettata con la corrispondenza corretta come «A → 2». La griglia usa 4 colonne con uno spazio di 50 px prima della seconda riga e 15 px di spaziatura verticale tra gli elementi. Nessuna creazione manuale delle risposte — il foglio risposte rimane sincronizzato con la scheda. Scaricalo separatamente come answer_key.jpeg o answer_key.pdf insieme alla scheda dell\'utente.',
      },
      {
        title: 'Libreria Immagini con 104 Collezioni Tematiche e Oltre 3100 Illustrazioni',
        description:
          'Esplora 104 collezioni di immagini tematiche che coprono animali, cibi, veicoli, natura, professioni, festività, sport, stagioni e decine di altri. Ogni tema fornisce illustrazioni colorate che producono silhouette distintive con contorni riconoscibili — forme di animali, profili di veicoli e contorni di oggetti che stimolano la percezione visiva. Filtra per tema usando il menu a tendina o cerca immagini specifiche per parola chiave. La Licenza Commerciale include 10 temi colorati per iniziare; l\'Accesso Completo sblocca tutti i 104 temi per massima varietà creativa in entrambe le modalità di esercizio.',
      },
      {
        title: 'Etichette Opzionali e Campi Nome/Data per utenti',
        description:
          'Attiva o disattiva la casella «Mostra Etichette» (attiva per impostazione predefinita) per visualizzare gli identificativi A, B, C, D sulle immagini o prime metà e 1, 2, 3, 4 sulle silhouette o seconde metà. Quando le etichette sono nascoste, la scheda diventa una sfida di corrispondenza puramente visiva senza supporto alfanumerico — ideale per attività avanzate o quaderni di puzzle dove non servono risposte scritte. La casella «Includi Campi Nome/Data» aggiunge righe per nome e data nella parte inferiore della pagina per responsabilità e organizzazione online.',
      },
      {
        title: 'Esportazione PDF e JPEG Pronta per la Stampa a 300 DPI con Modalità Scala di Grigi',
        description:
          'Scarica schede di abbinamento ombre e fogli risposte come immagini JPEG ad alta risoluzione o documenti PDF pronti per la stampa renderizzati a 300 DPI (moltiplicatore 6×, qualità JPEG 1.0). Quattro pulsanti di download dedicati esportano i file della scheda di lavoro e del foglio risposte separatamente. I formati di pagina includono Lettera Verticale, Lettera Orizzontale, A4 Verticale, A4 Orizzontale, Quadrato (1200×1200) e dimensioni completamente personalizzate. L\'orientamento del PDF viene rilevato automaticamente. Attiva la scala di grigi per versioni a risparmio d\'inchiostro. Ogni esportazione è pronta per la produzione: download digitali, quaderni stampati e materiali per il negozio.',
      },
      {
        title: 'Modifica Completa del Canvas con Strumenti di Testo, Allineamento e Controlli Livelli',
        description:
          'Il canvas Fabric.js offre controllo totale su ogni elemento della tua scheda di abbinamento ombre. Trascina, ridimensiona, ruota e riposiziona immagini, testo e contenuto generato liberamente. I controlli livelli gestiscono l\'ordine di sovrapposizione — porta elementi in primo piano o inviali sullo sfondo. Blocca gli elementi completati mentre ne modifichi altri. Aggiungi testo personalizzato con sette opzioni di font (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), dimensione e colore regolabili, e larghezza contorno testo da 0 a 10 con granularità di 0,5. Sei opzioni di allineamento più centra nella pagina mantengono i layout precisi. Zoom dal 25% al 300% per lavoro di dettaglio. Annulla e ripristina con cronologia illimitata usando Ctrl+Z e Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Come Vendere Schede di Abbinamento Ombre Online',
    cases: [
      {
        title: 'Pacchetti Tematici di Abbinamento Ombre su Etsy',
        description:
          'Crea pacchetti tematici di abbinamento ombre usando le 104 collezioni di immagini — puzzle di ombre di animali, corrispondenza di silhouette di veicoli, sfide di ombre di cibi e decine di altri. Ogni tema fornisce illustrazioni con contorni distintivi che creano attività di silhouette coinvolgenti. Raggruppa 15–20 schede di abbinamento ombre per tema con risposte incluse e vendi tra 3 € e 7 € per pacchetto. Mischia entrambe le modalità in un unico pacchetto: schede di Abbinamento Ombre per il riconoscimento di silhouette e schede di Completa l\'Immagine per il ragionamento spaziale. Le silhouette auto-generate e le risposte eliminano le parti più dispendiose della produzione.',
        platform: 'Etsy (etsy.it)',
      },
      {
        title: 'Quaderni di Percezione Visiva su Amazon KDP',
        description:
          'Compila 50–80 schede di abbinamento ombre in un quaderno stampato formattato per Amazon KDP. Struttura il tuo libro con capitoli alternati: i capitoli di Abbinamento Ombre sviluppano il riconoscimento di silhouette mentre i capitoli di Completa l\'Immagine sviluppano la consapevolezza spaziale e il ragionamento parte-tutto. Includi le direzioni di taglio orizzontale e verticale nelle sezioni di Completa l\'Immagine per varietà. Posiziona le risposte alla fine del libro usando la funzione di risposte auto-generate. La modalità scala di grigi produce pagine a risparmio d\'inchiostro pronte per interni di libri in bianco e nero. I quaderni di puzzle di percezione visiva si vendono bene nella categoria libri di attività durante tutto l\'anno.',
        platform: 'Amazon KDP (kdp.amazon.it)',
      },
      {
        title: 'Attività Rapide di Fine Lezione per Gumroad',
        description:
          'Crea attività di abbinamento ombre pronte all\'uso con campi nome/data e risposte stampate per l\'uso online. i venditori che cercano esercizi di discriminazione visiva apprezzano schede che arrivano pronte per la stampa. Crea set collegati al catalogo prodotti: corrispondenza di ombre di animali per scienze, silhouette di professioni per studi sociali, puzzle di ombre di cibi per educazione alimentare. L\'opzione etichette ti permette di creare versioni guidate (con etichette A/B/C/D e 1/2/3/4) e versioni sfida (etichette nascoste) nello stesso prodotto per pacchetti scalati per livello.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Collezioni di Abbinamento Ombre Stagionali',
        description:
          'Le 104 collezioni di immagini tematiche coprono ogni occasione stagionale e festiva — Natale, Halloween, Pasqua, San Valentino, ritorno a scuola, vacanze estive e altro. Le attività di silhouette hanno un fascino speciale durante Halloween quando i temi di ombre e mistero sono naturalmente popolari. Crea collezioni di abbinamento ombre stagionali allineate con i picchi di acquisto. Includi schede di Abbinamento Ombre e Completa l\'Immagine in ogni set stagionale per massimo valore e varietà. I prodotti stagionali raggiungono prezzi più alti durante le loro finestre di massima domanda.',
        platform: 'Etsy / Amazon KDP / Gumroad (stagionale)',
      },
      {
        title: 'Pacchetti di Puzzle Multi-Modalità come Prodotti Premium',
        description:
          'Combina entrambe le modalità di esercizio in pacchetti di puzzle multi-modalità premium che dimostrano la versatilità del generatore. Ogni pacchetto include schede di Abbinamento Ombre (riconoscimento silhouette), schede di Completa l\'Immagine con tagli orizzontali (ricomposizione sopra/sotto) e schede di Completa l\'Immagine con tagli verticali (ricomposizione sinistra/destra) — tre tipi di attività distinti da un unico set di immagini tematiche. Questo approccio tre-in-uno giustifica prezzi premium di 7–12 € per pacchetto. Le risposte per ogni scheda sono incluse automaticamente, conferendo una finitura professionale che aumenta il valore percepito.',
        platform: 'Etsy / Amazon KDP (pacchetti premium)',
      },
    ],
  },

  faq: [
    {
      question: 'Quali sono le due modalità di esercizio e come si differenziano?',
      answer:
        'Il generatore offre due modalità distinte. La modalità Abbinamento Ombre posiziona 4 immagini colorate nella riga superiore e 4 silhouette nere auto-generate nella riga inferiore — gli utenti associano ogni immagine alla sua ombra abbinando lettere (A–D) con numeri (1–4). La modalità Completa l\'Immagine divide 4 immagini in metà e presenta le prime metà (A–D) e le seconde metà (1–4) separatamente — gli utenti associano le metà per completare ogni immagine. Abbinamento Ombre valuta il riconoscimento di silhouette mentre Completa l\'Immagine sviluppa la consapevolezza spaziale e il ragionamento parte-tutto.',
    },
    {
      question: 'Come vengono generate le silhouette?',
      answer:
        'Le silhouette vengono create tramite vera elaborazione di immagini a livello di pixel, non con filtri CSS né risorse di ombre pre-fabbricate. L\'app carica ogni immagine su un canvas, estrae ogni pixel tramite getImageData e converte tutti i pixel il cui valore alpha è superiore a 10 in nero puro (R=0, G=0, B=0, A=255). Questo preserva il profilo di trasparenza esatto di ogni immagine sorgente, producendo silhouette nere precise che riflettono dettagli fini come orecchie, code, manici e altri contorni distintivi.',
    },
    {
      question: 'Quali sono le opzioni di direzione di taglio nella modalità Completa l\'Immagine?',
      answer:
        'La modalità Completa l\'Immagine offre due opzioni di direzione di taglio tramite pulsanti radio: il taglio orizzontale divide le immagini in metà superiore e inferiore, mentre il taglio verticale divide le immagini in metà sinistra e destra. La direzione di taglio si applica a tutte e 4 le immagini della scheda. Il layout si adatta automaticamente in base all\'orientamento della pagina — le pagine orizzontali dispongono gli elementi in 2 righe × 4 elementi, mentre le pagine verticali usano 2 colonne × 4 elementi per un equilibrio visivo ottimale.',
    },
    {
      question: 'Come funziona l\'algoritmo di derangement?',
      answer:
        'Entrambe le modalità utilizzano un algoritmo di derangement Fisher-Yates che garantisce che nessun elemento appaia nella sua posizione originale. Nella modalità Abbinamento Ombre, nessuna silhouette si trova direttamente sotto la sua immagine corrispondente. Nella modalità Completa l\'Immagine, nessuna seconda metà appare adiacente alla sua prima metà corrispondente. Questo garantisce che ogni scheda presenti una vera sfida di corrispondenza — gli utenti non possono indovinare correttamente solo dalla posizione. Il derangement si ricalcola ad ogni generazione, producendo disposizioni diverse dalle stesse immagini.',
    },
    {
      question: 'Posso attivare o disattivare le etichette A/B/C/D e 1/2/3/4?',
      answer:
        'Sì. La casella «Mostra Etichette» nel pannello Configurazione Esercizio (attiva per impostazione predefinita) controlla se le etichette A, B, C, D appaiono sulle immagini o prime metà e se le etichette 1, 2, 3, 4 appaiono sulle silhouette o seconde metà. Quando le etichette sono attive, gli utenti scrivono coppie lettera-numero come risposte. Quando le etichette sono disattivate, la scheda diventa una sfida di corrispondenza puramente visiva senza supporto alfanumerico — utile per quaderni di puzzle o attività avanzate.',
    },
    {
      question: 'Perché ci sono sempre esattamente 4 problemi per scheda?',
      answer:
        'La scheda usa un numero fisso di 4 problemi di corrispondenza (SELECT_COUNT = 4). Questo non è configurabile. Quattro elementi offrono l\'equilibrio ottimale per la corrispondenza di silhouette e immagini divise: varietà sufficiente per creare una vera sfida di corrispondenza con il derangement, mantenendo ogni immagine abbastanza grande perché gli utenti studino i dettagli fini delle silhouette e delle metà divise. Il formato costante di 4 elementi funziona bene anche per prodotti in pacchetto dove ogni pagina ha una densità di contenuto prevedibile.',
    },
    {
      question: 'Come funzionano i campi nome e data?',
      answer:
        'Attiva la casella «Includi Campi Nome/Data» nel pannello Configurazione Esercizio per aggiungere righe per nome e data nella parte inferiore della scheda. Quando attiva, gli utenti possono scrivere il loro nome e la data direttamente sulla pagina stampata — essenziale per la responsabilità online e l\'organizzazione delle valutazioni. Quando disattivata, la scheda utilizza l\'intera area della pagina per il contenuto di corrispondenza. Questa opzione funziona con entrambe le modalità, Abbinamento Ombre e Completa l\'Immagine.',
    },
    {
      question: 'Come funzionano le risposte auto-generate?',
      answer:
        'Il generatore usa un sistema a doppio canvas con una scheda Scheda di Lavoro e una scheda Risposte. Nella modalità Abbinamento Ombre, le risposte mostrano una griglia dove ogni cella presenta l\'immagine originale accanto alla sua silhouette con un\'etichetta come «A → 2». Nella modalità Completa l\'Immagine, ogni cella mostra l\'immagine originale completa con la sua etichetta di corrispondenza. La griglia usa 4 colonne con spaziatura uniforme. Entrambe le versioni si esportano separatamente con i quattro pulsanti di download dedicati: scheda JPEG, scheda PDF, risposte JPEG e risposte PDF.',
    },
    {
      question: 'Esiste una prova gratuita?',
      answer:
        'Sì. Puoi accedere a tutte le funzionalità — entrambe le modalità di esercizio, le silhouette auto-generate, le opzioni di direzione di taglio, le risposte, la libreria immagini completa, i temi di sfondo e di bordo, l\'opzione etichette, i campi nome/data, gli strumenti di testo e tutti i formati di download — senza creare un account, inserire carta di credito o installare alcun software. I download della prova gratuita includono una piccola filigrana. Una licenza commerciale rimuove la filigrana e concede diritti completi di vendita.',
    },
    {
      question: 'Il Generatore di Abbinamento Ombre è sensibile alla lingua?',
      answer:
        'No. L\'Abbinamento Ombre è puramente visivo — il risultato della scheda contiene solo immagini, silhouette e metà divise, senza contenuto testuale localizzato. L\'interfaccia dell\'app (menu, pulsanti, testo dell\'intestazione) supporta tutte le 11 lingue, ma la scheda generata funziona in modo identico indipendentemente dalla selezione della lingua. Questo rende le schede di abbinamento ombre universalmente vendibili su tutti i mercati senza traduzione. La Licenza Commerciale include 10 temi colorati; l\'Accesso Completo sblocca tutti i 104 temi e le 11 lingue di interfaccia.',
    },
    {
      question: 'Posso vendere schede di abbinamento ombre create con questo strumento su Etsy e Amazon KDP?',
      answer:
        'Sì. Con una licenza commerciale, hai tutti i diritti per vendere le tue schede di abbinamento ombre come download digitali su Etsy, come quaderni stampati su Amazon KDP, come risorse educative su Gumroad o attraverso qualsiasi altro canale di vendita. Le due modalità di esercizio, le silhouette auto-generate, l\'algoritmo di derangement, le risposte automatiche e le 104 collezioni di immagini tematiche ti forniscono gli strumenti creativi per produrre prodotti di corrispondenza visiva originali e vendibili.',
    },
    {
      question: 'Qual è la politica di rimborso?',
      answer:
        'Poiché la prova gratuita ti dà accesso a tutte le funzionalità, non offriamo rimborsi sugli acquisti di licenze commerciali. Puoi testare entrambe le modalità di esercizio, le silhouette auto-generate, le opzioni di direzione di taglio, le risposte, la libreria immagini completa, i temi di sfondo e di bordo, l\'opzione etichette, i campi nome/data, gli strumenti di testo e tutti i formati di download prima di acquistare. La prova gratuita è la politica di rimborso — assicurati che lo strumento sia adatto alle tue esigenze prima di acquistare una licenza.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'abbinamenti-schede',
      anchorText: 'Generatore di Schede di Abbinamento',
    },
    {
      pageType: 'app',
      slug: 'griglia-abbinamento-schede',
      anchorText: 'Generatore di Puzzle a Griglia',
    },
    {
      pageType: 'app',
      slug: 'bingo-immagini-schede',
      anchorText: 'Generatore di Schede di Bingo Illustrato',
    },
    {
      pageType: 'app',
      slug: 'negozificazione-immagini-schede',
      anchorText: 'Generatore di Schede di negozificazione Immagini',
    },
    {
      pageType: 'app',
      slug: 'disegni-da-colorare',
      anchorText: 'Generatore di Schede da Colorare',
    },
    {
      pageType: 'app',
      slug: 'trova-oggetti-schede',
      anchorText: 'Generatore di Schede di Trova Oggetti',
    },
    {
      pageType: 'bundle',
      slug: 'pacchetto-abbinamento-negozificazione',
      anchorText: 'Pacchetto Abbinamento e negozificazione — Tutte le App di Abbinamento in un Pacchetto',
    },
    {
      pageType: 'idea',
      slug: 'prescuola-idee-stampabili',
      anchorText: 'Idee di stampabili per la scuola materna',
    },
    {
      pageType: 'idea',
      slug: 'scuola-infanzia-idee-stampabili',
      anchorText: 'Idee di stampabili per l\'asilo',
    },
    {
      pageType: 'start',
      slug: 'piano-attivita-stampabili',
      anchorText: 'Piano per la tua attività di stampabili',
    },
    {
      pageType: 'guide',
      slug: 'creare-schede-discriminazione-visiva',
      anchorText: 'Creare schede di discriminazione visiva',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/italian/shadow match/Abbina le Ombre 1.webp',
      primaryAlt: 'Scheda di abbinamento ombre con immagini colorate nella riga superiore e silhouette nere auto-generate nella riga inferiore con intestazione ambra',
    },
    sampleGallery: [
      {
        src: '/samples/italian/shadow match/Abbina le Ombre 2.webp',
        alt: 'Scheda di abbinamento ombre mostrando quattro immagini colorate associate a quattro silhouette nere con etichette di lettere e numeri',
        caption: 'Modalità Abbinamento Ombre — gli utenti associano le immagini alle loro silhouette auto-generate',
      },
      {
        src: '/samples/italian/shadow match/Abbina le Ombre 3.webp',
        alt: 'Scheda Completa l\'Immagine con metà di immagini divise che gli utenti riconnettono associando prime e seconde metà',
        caption: 'Modalità Completa l\'Immagine — gli utenti associano le metà delle immagini per completare le illustrazioni',
      },
      {
        src: '/samples/italian/shadow match/Abbina le Ombre 4.webp',
        alt: 'Foglio risposte di abbinamento ombre mostrando le immagini originali con silhouette ed etichette di corrispondenza lettera-numero corrette',
        caption: 'Risposte auto-generate — le etichette lettera-numero mostrano le corrispondenze corrette',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Come Creare Schede di Abbinamento Ombre con Silhouette e Immagini Divise — Tutorial Passo a Passo',
  },
};

export default content;
