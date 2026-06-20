/* it-letterhint-prose — Italian prose config for the alphabet-train LETTER-HINT fan.
 * MECHANIC (distinct from the null mode): the child sorts a row of PICTURE CARDS into
 *   A→Z alphabetical order; EACH picture card has its BEGINNING LETTER printed on it,
 *   so a pre-reader places each card by recognizing that printed first letter — no
 *   reading the word, no sounds. READINESS (alphabetical order) with a printed-letter
 *   visual scaffold. The printed letter is a VISUAL cue, NEVER a sound.
 * Divergence vs it-readiness-alphabet-train (null): that one is a TRAIN of wagons with a
 *   MISSING letter to recognize; THIS one is SORTING PICTURE CARDS by their printed first
 *   letter into the alphabet order. Emphasize ordinare/mettere in ordine le IMMAGINI in
 *   base alla loro lettera iniziale, the printed-letter scaffold, the pre-reader angle.
 * FENCE: never use suono/suoni/fonema/fonetico/fonetica/pronuncia — only
 *   "lettera iniziale" / "prima lettera" / "la lettera con cui inizia".
 * {T} = Italian theme name; literal {T} inside SKEL/P2 strings, ${T} inside arrow fns;
 *   safe frames only: "con {T}", "le immagini di {T}", "il treno di {T}"; never inflect. */
'use strict';

module.exports = {
  eyebrow: 'Scheda: Ordine alfabetico con immagini',

  strand: 'Avvio all\'ordine alfabetico',

  h1: (T) => `Metti in ordine le immagini di ${T} per lettera iniziale`,

  title: (T) => `Ordine alfabetico con immagini per l'infanzia – ${T} | PDF gratis`,

  meta: (T) => `Scheda per la scuola dell'infanzia: ordina le immagini di ${T} dalla A alla Z guardando la lettera iniziale stampata su ogni carta. Senza fretta, al suo ritmo. Da stampare in PDF o giocare online, gratis.`,

  carousel: (T) => `Ordine alfabetico con ${T}`,

  SKEL: [
    // 1 — invitation opening
    `Disponi davanti al tuo bambino una fila di carte illustrate con {T} e invitalo a metterle in ordine alfabetico, dalla A alla Z. Su ogni carta, accanto al disegno, c'è stampata la lettera iniziale della parola: è proprio questo l'aiuto pensato per chi ancora non sa leggere. Il piccolo guarda la prima lettera di ciascuna immagine, la riconosce dalla forma e sistema la carta al posto giusto nella sequenza. Non deve leggere nessuna parola intera né contare nulla: gli basta osservare la lettera con cui inizia e seguirne l'ordine. Suggeriscigli di nominare a voce ogni lettera mentre colloca la carta, così il nome e la forma si fanno familiari. Se mette un'immagine fuori posto, la sposta con leggerezza e prosegue. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, questa attività diventa un caldo momento di gioco condiviso e una bella preparazione alla scuola.`,

    // 2 — question opening
    `Quale immagine viene prima nell'alfabeto? Da questa domanda parte il gioco. Il bambino ha davanti tante carte illustrate di {T}, e ognuna porta stampata la sua lettera iniziale, ben visibile accanto al disegno. Guardando solo quella prima lettera, il piccolo riconosce a quale punto dell'alfabeto appartiene ciascuna carta e la mette in fila, dalla A alla Z. La lettera stampata è la guida perfetta per chi non legge ancora: non serve decifrare la parola, basta osservare la lettera con cui inizia. Qui non si conta nulla, si ordinano le immagini in base alla loro lettera iniziale. Procedete con tranquillità, una carta alla volta, senza alcun cronometro a scandire il tempo. Riconoscere la prima lettera e disporre le immagini nel giusto ordine è una preziosa abilità di base che prepara dolcemente alla scuola.`,

    // 3 — metaphor opening
    `Immagina di sistemare le foto in un album seguendo l'alfabeto: è l'idea di questa scheda della scuola dell'infanzia. Il bambino ha una fila di carte illustrate di {T} e le ordina dalla A alla Z. Per riuscirci non deve saper leggere: su ogni carta è stampata la lettera iniziale della parola, accanto al disegno, e quella lettera gli dice dove va l'immagine. Il piccolo osserva la prima lettera, la riconosce dalla forma e colloca la carta al suo posto nella sequenza. Non si conta niente: si guardano le lettere iniziali e si mettono in ordine le immagini. Non c'è alcun voto da prendere, soltanto la curiosità che guida lo sguardo. Invitalo a nominare ogni lettera mentre sistema la carta, magari canticchiando la canzone dell'alfabeto. Se sbaglia un posto, sorridete insieme e si riprova, in un'atmosfera serena e paziente.`,

    // 4 — skill-statement opening
    `Mettere in ordine alfabetico le immagini guardando la loro lettera iniziale: ecco la dolce abilità che questa scheda mette in gioco. Il bambino dispone una fila di carte illustrate di {T} dalla A alla Z. Ogni carta mostra, accanto al disegno, la prima lettera della parola stampata bene in vista, così anche chi non legge ancora può collocarla al posto giusto. Il piccolo osserva la lettera iniziale, la riconosce e sistema l'immagine nella sequenza. È un esercizio per gli occhi e per la memoria: per ordinare bene deve guardare con cura la prima lettera di ogni carta e ricordare quale viene dopo nell'alfabeto. Qui non si conta nulla, non ci sono numeri. Sostienilo con domande dolci, quale lettera viene prima, con che lettera inizia questa immagine, e lascialo lavorare al proprio passo. Con le carte di {T} davanti, questa attività diventa un momento prezioso, senza alcuna pressione.`,

    // 5 — "Immagina…" scene opening
    `Immagina un tavolo pieno di carte illustrate, tutte da mettere in fila secondo l'alfabeto: è la scena di questa scheda pensata per la scuola dell'infanzia. Il bambino ha davanti le immagini di {T} e le ordina dalla A alla Z. Il bello è che non deve leggere niente: su ogni carta è stampata la lettera con cui inizia la parola, accanto al disegno, e quella lettera lo guida. Il piccolo riconosce la prima lettera, la confronta con le altre e colloca ciascuna carta al suo posto nella sequenza. Tutto sta nel guardare la lettera iniziale e nel disporre le immagini in ordine, una calma abilità che alla scuola conterà presto. Qui non si conta niente, ci sono solo le lettere iniziali e l'alfabeto. Invitalo a nominare ogni lettera mentre sistema la carta. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo, in un clima sempre sereno e affettuoso.`,

    // 6 — reassurance-first opening
    `Qui non c'è proprio nulla da temere: si guardano le immagini, si mettono in ordine e ci si diverte. Il bambino ha una fila di carte illustrate di {T} e le dispone in ordine alfabetico, dalla A alla Z. Per farlo non deve leggere alcuna parola: su ogni carta è stampata la lettera iniziale, accanto al disegno, ed è proprio quella a indicare dove va l'immagine. Con calma il piccolo riconosce la prima lettera dalla forma e sistema la carta al posto giusto nella sequenza. Non deve contare niente, gli basta osservare la lettera con cui inizia ciascuna immagine e ricordare l'ordine. Questo riconoscere la lettera iniziale è una vera abilità di base, perché rende familiare la forma delle lettere e la loro sequenza, utili più avanti a scuola. Niente gara né punteggio, soltanto lo sguardo curioso. Con le immagini di {T}, ordinare le carte è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

    // 7 — quote opening
    `«Questa inizia con la A, la mettiamo per prima!» è l'esclamazione che accende il gioco. Il bambino ha davanti le carte illustrate di {T} e le mette in ordine alfabetico, dalla A alla Z. Su ogni carta, accanto al disegno, è stampata la lettera iniziale: così anche chi non sa ancora leggere sa dove collocare ciascuna immagine. Il piccolo guarda la prima lettera, la riconosce dalla forma e sistema la carta nella sequenza giusta. Qui si ordinano le immagini in base alla loro lettera iniziale, mai si contano numeri. Questo guardare attento allena la memoria e l'occhio, una bella preparazione alla scuola. Incoraggialo a nominare ogni lettera a voce alta mentre dispone la carta. Se sbaglia, ne prova un'altra con serenità, senza fretta. Ogni carta messa al posto giusto è una piccola gioia da festeggiare, in un clima caldo e paziente da vivere fianco a fianco.`,

    // 8 — classic/scene opening
    `Tutte le immagini in fila, dalla A alla Z! Su questa scheda, pensata per la scuola dell'infanzia, il bambino mette in ordine alfabetico le carte illustrate di {T}. Ogni carta mostra, accanto al disegno, la lettera con cui inizia la parola, stampata bene in vista, così il piccolo che ancora non legge può comunque collocarla al posto giusto. Riconosce la prima lettera dalla forma e sistema l'immagine nella sequenza. È puro avvio all'ordine alfabetico: niente numeri, niente conteggi, solo lettere iniziali e immagini da disporre in ordine. Questa capacità di guardare la prima lettera rafforza la memoria e l'attenzione, fondamenta preziose per la scuola. Niente fretta scandisce il lavoro: si procede con calma. Stimolalo a nominare ogni lettera, a confrontare le carte e a indovinare quale viene prima. Con le immagini di {T} davanti, ordinare le carte diventa un momento prezioso da vivere insieme, con tempi distesi e tanta gentilezza.`,
  ],

  P2: [
    // 1 — invitation
    `Il bambino mette in ordine alfabetico le carte illustrate di {T}, dalla A alla Z. Su ogni carta è stampata la lettera iniziale, accanto al disegno, così anche chi non legge ancora sa dove collocarla. Il piccolo guarda la prima lettera, la riconosce e sistema l'immagine al suo posto. Con le immagini di {T} davanti, si ordina senza fretta: si guarda la lettera iniziale, mai si conta.`,

    // 2 — question
    `Con che lettera inizia questa immagine? Da questa domanda parte il gioco. Il bambino guarda la lettera stampata su ciascuna carta di {T} e dispone le immagini in ordine alfabetico, dalla A alla Z. È un tranquillo esercizio di ordine, mai di conteggio, e non serve leggere la parola: basta osservare la prima lettera. Da gustare insieme con parole gentili e tutto il tempo che serve.`,

    // 3 — skill-statement
    `Mettere in ordine le immagini in base alla lettera iniziale: su questa scheda il bambino dispone le carte di {T} dalla A alla Z guardando la prima lettera stampata su ognuna. Niente parole da leggere, niente numeri da contare, solo lettere iniziali e immagini da ordinare. È una preziosa abilità di base per la scuola, e con le immagini di {T} davanti il percorso resta sereno e divertente, al ritmo del piccolo.`,

    // 4 — metaphor
    `Come si sistemano i libri di una libreria seguendo l'alfabeto, questa scheda invita il bambino a ordinare le carte di {T} dalla A alla Z. La guida è la lettera iniziale stampata su ogni immagine: il piccolo la riconosce e colloca la carta al posto giusto, senza dover leggere nulla. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo lavorare al suo ritmo e festeggiate ogni carta ben sistemata, con le immagini di {T}.`,

    // 5 — reassurance
    `Su questa pagina il piccolo trova una fila di carte illustrate di {T} da mettere in ordine alfabetico. Con calma guarda la lettera iniziale stampata su ciascuna e colloca le immagini dalla A alla Z, allenando la memoria dell'alfabeto e la pazienza. Non deve leggere le parole: gli basta la prima lettera. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una carta ben sistemata, con le immagini di {T}.`,

    // 6 — parent-tip
    `Nominate insieme a voce ogni lettera mentre il bambino sistema la carta nella fila: così il nome e la forma della prima lettera diventano familiari, e l'ordine dell'alfabeto si fissa pian piano. Potete anche canticchiare la canzone dell'ABC mentre ordinate le immagini di {T}, dalla A alla Z. Si guarda la lettera iniziale e si ordinano le carte, mai si conta. Un momento allegro e tranquillo da condividere.`,

    // 7 — celebration
    `Ogni carta messa al posto giusto è un piccolo traguardo da festeggiare. Il bambino guarda la lettera iniziale stampata sull'immagine, la riconosce e dispone la carta nella sequenza, finché tutto è in ordine dalla A alla Z. Loda l'impegno e non la velocità, così ordinare le immagini di {T} resta un piacere e non una prova. Con le carte di {T} davanti, l'alfabeto si gusta con dolcezza, una lettera iniziale alla volta.`,
  ],

  P3: (T) => `Se il bambino si è divertito a mettere in ordine le immagini di ${T} guardando la lettera iniziale, può continuare con altre schede vicine, sempre senza pressione e al suo ritmo. Ogni scheda si può stampare in PDF per lavorare su carta oppure giocare online, sempre gratis e senza registrarsi. Non ci sono cronometri né punteggi: il ritmo lo decide il piccolo, con calore e senza vergogna per gli errori. Questo avvio all'ordine alfabetico, in linea con le Indicazioni nazionali per la scuola dell'infanzia, prepara dolcemente alla lettura e alla scrittura, una prima lettera alla volta.`,

  soundWords: ['suono', 'suoni', 'fonema', 'fonetico', 'fonetica', 'pronuncia'],
  extraTokens: ['ordine alfabetico', 'lettera iniziale', 'treno delle lettere'],
};
