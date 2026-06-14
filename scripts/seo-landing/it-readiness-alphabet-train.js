/* it-readiness-alphabet-train — Italian prose config for the alphabet-train fan.
 * One mode 'null' (readiness, NO standard, level 'infanzia'):
 *   a TRAIN of wagons; each wagon belongs to a LETTER of the alphabet (ABC order).
 *   Some wagons already show a hint (a little picture + a letter); other wagons are
 *   empty. The child recognizes the MISSING letter by its shape and places it in the
 *   empty wagon, so the whole train lines up the alphabet in order, from A to Z.
 *   PURE LETTER-RECOGNITION + alphabet ORDER — NOT phonics, NOT initial-sounds, NO
 *   sound-matching. NO counting. Strand: Conoscere le lettere.
 * Lexicon: treno / vagone / lettera / alfabeto / ABC / in ordine / dalla A alla Z /
 *   riconoscere la lettera / la lettera che manca. NO sound/reading-words claims.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   the theme {N_PL} are decoration that "ride on the hint-wagons" — referenced ONLY
 *   in "con {N_PL}", "le immagini di {N_PL}", or "{GEN_ART} {GEN}" slots; never
 *   "le {N_PL}". Any verb/adjective agreeing with {GEN} is PLURAL; "di/a/da/in/su +
 *   collective" via {DI_GEN} etc. */
'use strict';

const SKEL_AT = [
  // 1 — invitation opening
  `Sali con il tuo bambino sul treno delle lettere! Ogni vagone appartiene a una lettera dell'alfabeto, e su alcuni vagoni c'è già un indizio: una piccola immagine e una lettera. Altri vagoni, invece, sono ancora vuoti. Il piccolo riconosce la lettera che manca, guardandone bene la forma, e la sistema nel vagone libero, così tutto il treno mette in fila l'alfabeto in ordine, dalla A alla Z. Qui si tratta di riconoscere le lettere e di metterle in ordine, mai di contare. Le immagini di {N_PL} che viaggiano sui vagoni-indizio rendono il viaggio ancora più allegro. Niente fretta, si gioca al proprio ritmo. Suggeriscigli di nominare a voce ogni lettera mentre la colloca, così il nome e la forma si fanno familiari. Se mette una lettera nel posto sbagliato, la cambia con leggerezza e prosegue. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, questa attività diventa un caldo momento di gioco condiviso, una bella preparazione alla scuola.`,

  // 2 — question opening
  `Chi rimette le lettere nel giusto ordine? Sul treno delle lettere ogni vagone è una lettera, e il bambino fa in modo che tutto l'alfabeto sia ben allineato, uno dietro l'altro. Su alcuni vagoni aiuta già un indizio, una piccola immagine con una lettera; altri vagoni aspettano ancora la loro lettera. Il piccolo osserva con attenzione la lettera che manca, la riconosce dalla sua forma e la sistema nel vagone vuoto. A poco a poco, lettera dopo lettera, il treno compone l'alfabeto in ordine, dalla A alla Z. Qui non si conta nulla: si guardano le forme delle lettere e si rimettono al loro posto. Accanto alle lettere viaggiano {GEN_ART} {GEN}, che fanno capolino dai vagoni-indizio e regalano buonumore. Niente cronometro scandisce il tempo: si procede con tranquillità. Riconoscere le lettere e ordinarle è una preziosa abilità di base che prepara alla scuola, da gustare insieme con calma e tante parole gentili.`,

  // 3 — metaphor opening
  `Immagina un trenino che parte solo quando ogni vagone ha trovato la sua lettera: è l'idea di questa scheda della scuola dell'infanzia. Su alcuni vagoni c'è già un indizio, una piccola immagine con la sua lettera, mentre altri sono rimasti vuoti. Il bambino guarda la forma della lettera che manca, la riconosce e la colloca nel vagone libero, finché il treno non mette in fila l'alfabeto in ordine, dalla A alla Z. Concentrandosi sulla forma delle lettere, il piccolo impara a conoscerle e a ricordare quale segue quale. Non si conta niente: si riconoscono le lettere e si dispongono nella giusta sequenza. Non c'è alcun voto da prendere, soltanto la curiosità che guida lo sguardo. Invitalo a nominare ogni lettera mentre la sistema, magari canticchiando la canzone dell'alfabeto. Sui vagoni-indizio viaggiano le immagini di {N_PL}, allegre compagne di viaggio. Se sbaglia un posto, sorridete insieme e si riprova, in un'atmosfera serena e paziente.`,

  // 4 — skill-statement opening
  `Riconoscere le lettere e metterle in ordine: ecco la dolce abilità che questo treno delle lettere mette in gioco. Ogni vagone appartiene a una lettera dell'alfabeto; su alcuni c'è già un indizio con immagine e lettera, altri sono ancora vuoti. Il bambino guarda la forma della lettera mancante, la riconosce e la sistema nel vagone libero, così l'intero treno compone l'alfabeto dalla A alla Z. È un esercizio per gli occhi e per la memoria: per scegliere bene, deve osservare con cura ogni lettera e ricordare la sua posizione nella sequenza. Qui non si conta nulla, non ci sono numeri. Niente tempi da battere, conta il piacere di guardare. Sostienilo con domande dolci, quale lettera viene dopo, che forma ha, e lascialo lavorare al proprio passo. Se non trova subito la lettera giusta, riprova con tranquillità. Con le immagini di {N_PL} a bordo dei vagoni-indizio, questa attività diventa un momento prezioso in cui il bambino impara a conoscere le lettere, una alla volta, senza alcuna pressione.`,

  // 5 — "Immagina…" scene opening
  `Immagina una stazione affollata dove i vagoni aspettano la loro lettera per partire: è la scena di questo treno delle lettere, pensato per la scuola dell'infanzia. Alcuni vagoni mostrano già un indizio, una piccola immagine con una lettera, mentre altri sono rimasti vuoti. Il bambino riconosce la lettera che manca, guardandone bene la forma, e la colloca nel vagone libero, così l'alfabeto si allinea in ordine, dalla A alla Z. Tutto sta nel riconoscere le lettere e nel disporle nella giusta sequenza, una calma abilità che alla scuola conterà presto. Qui non si conta niente, ci sono solo le lettere e il loro ordine. I vagoni sono in parte già pronti apposta, così il piccolo deve solo completare quelli vuoti. Sui vagoni-indizio viaggiano {GEN_ART} {GEN}, che salutano felici dai finestrini. Invitalo a nominare ogni lettera mentre la sistema. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo, in un clima sempre sereno e affettuoso.`,

  // 6 — reassurance-first opening
  `Qui non c'è proprio nulla da temere: si guardano le lettere, si rimettono al loro posto e ci si diverte. Su questo treno delle lettere, ogni vagone appartiene a una lettera dell'alfabeto. Alcuni vagoni portano già un indizio, una piccola immagine con la sua lettera, mentre altri attendono la loro. Con calma il bambino riconosce la lettera mancante dalla forma e la colloca nel vagone vuoto, finché l'intero treno compone l'alfabeto dalla A alla Z. Non deve contare niente, gli basta osservare bene ogni lettera e ricordare l'ordine. Questo riconoscere le lettere è una vera abilità di base, perché rende familiare la loro forma e la loro sequenza, utili più avanti a scuola. Niente gara né punteggio, soltanto lo sguardo curioso e la voglia di provare. Stimolalo a procedere con ordine, lettera dopo lettera. Con le immagini di {N_PL} a bordo dei vagoni-indizio, completare il treno è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 7 — quote opening
  `«Manca la sua lettera, mettiamola noi!» è l'esclamazione che accende il gioco. Su questo treno delle lettere ogni vagone è una lettera dell'alfabeto, e il bambino completa quelli vuoti per far filare tutto in ordine. Alcuni vagoni hanno già un indizio, una piccola immagine con una lettera, altri aspettano ancora la loro. Il piccolo riconosce la lettera che manca, guardandone la forma, e la sistema nel vagone libero, così l'alfabeto si allinea dalla A alla Z. Qui si riconoscono le lettere e si mettono in ordine, mai si contano numeri. Questo guardare attento allena la memoria e l'occhio, una bella preparazione alla scuola. Le immagini di {N_PL} viaggiano sui vagoni-indizio e rendono il percorso allegro. Incoraggialo a nominare ogni lettera a voce alta mentre la colloca. Se sbaglia, ne prova un'altra con serenità, senza fretta. Ogni vagone completato è una piccola gioia da festeggiare, in un clima caldo e paziente da vivere fianco a fianco.`,

  // 8 — classic/scene opening
  `Tutti a bordo, si parte per un viaggio nell'alfabeto! Su questo treno delle lettere, pensato per la scuola dell'infanzia, ogni vagone appartiene a una lettera. Alcuni vagoni mostrano già un indizio, una piccola immagine con la sua lettera, mentre altri sono ancora vuoti. Il bambino riconosce la lettera mancante dalla forma e la sistema al suo posto, finché il treno non mette in fila tutto l'ABC, dalla A alla Z. È puro riconoscimento delle lettere e del loro ordine: niente numeri, niente conteggi, solo lettere e sequenza. Questa capacità di conoscere le lettere rafforza la memoria e l'attenzione, fondamenta preziose per la scuola. Niente fretta scandisce il viaggio: si procede con calma. Stimolalo a nominare ogni lettera, a seguire i vagoni in ordine e a indovinare quale lettera viene dopo. Se sbaglia un posto, lo cambia con leggerezza e riparte. Con le immagini di {N_PL} a bordo dei vagoni-indizio, conoscere le lettere diventa un momento prezioso da vivere insieme, con tempi distesi e tanta gentilezza.`,
];

const P2_AT = [
  // 1 — invitation
  `Sul treno delle lettere ogni vagone è una lettera dell'alfabeto. Il bambino riconosce la lettera che manca, guardandone la forma, e la sistema nel vagone vuoto, finché l'ABC è in fila dalla A alla Z. Alcuni vagoni hanno già un indizio con immagine e lettera. Con le immagini di {N_PL} a bordo dei vagoni-indizio, il treno viaggia senza fretta: si riconoscono le lettere e si ordinano, mai si conta.`,

  // 2 — question
  `Quale lettera manca a questo vagone? Da questa domanda parte il gioco. Il bambino riconosce la lettera dalla sua forma e la colloca al suo posto, così l'alfabeto si allinea dalla A alla Z. È un tranquillo esercizio di riconoscimento, mai di conteggio, da gustare insieme con parole gentili e tutto il tempo che serve. Con le immagini di {N_PL} sui vagoni-indizio, il viaggio nell'alfabeto si fa allegro.`,

  // 3 — skill-statement
  `Conoscere le lettere e metterle in ordine: su questo treno il bambino completa i vagoni vuoti con la lettera giusta, riconosciuta dalla sua forma. Vagoni già pronti, con un'immagine e una lettera, mostrano la via. Niente numeri e niente conteggi, solo lettere e sequenza, dalla A alla Z. È una preziosa abilità di base per la scuola, e con {GEN_ART} {GEN} a bordo dei vagoni-indizio il percorso resta sereno e divertente.`,

  // 4 — metaphor
  `Come un trenino che parte solo quando ogni vagone ha la sua lettera, questa scheda invita il bambino a riconoscere la lettera mancante e a sistemarla al posto giusto, finché l'alfabeto è in ordine dalla A alla Z. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo lavorare al suo ritmo e festeggiate ogni vagone completato. Sui vagoni-indizio viaggiano le immagini di {N_PL}.`,

  // 5 — reassurance
  `Su questa pagina il piccolo trova un treno con alcuni vagoni già pronti e altri vuoti. Con calma riconosce la forma della lettera che manca e la colloca al suo posto, allenando la memoria dell'alfabeto e la pazienza. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di un vagone completato. Con le immagini di {N_PL} a bordo dei vagoni-indizio, il viaggio dalla A alla Z resta dolce e senza pressioni.`,

  // 6 — parent-tip
  `Nominate insieme a voce ogni lettera mentre il bambino la sistema nel vagone vuoto: così il nome e la forma diventano familiari, e l'ordine dell'alfabeto si fissa pian piano. Potete anche canticchiare la canzone dell'ABC mentre il treno si compone, dalla A alla Z. Si riconoscono le lettere e si ordinano, mai si conta. Con {GEN_ART} {GEN} a bordo dei vagoni-indizio, il momento resta allegro e tranquillo.`,

  // 7 — celebration
  `Ogni vagone completato è un piccolo traguardo da festeggiare. Il bambino riconosce la lettera mancante dalla sua forma e la rimette al suo posto, finché tutto il treno è in ordine dalla A alla Z. Loda l'impegno e non la velocità, così conoscere le lettere resta un piacere e non una prova. Con le immagini di {N_PL} sui vagoni-indizio, il viaggio nell'alfabeto si gusta con dolcezza, una lettera alla volta.`,
];

module.exports = {
  type: 'alphabet-train',
  eyebrow: 'Scheda: Il treno delle lettere',
  strand: 'Conoscere le lettere',
  level: 'infanzia',
  slotWord: 'treno-lettere',
  h1: (mk) => 'Il treno delle lettere con {H1} – l\'alfabeto in ordine – scheda per la scuola dell\'infanzia',
  carousel: (mk, themeH1) => 'Il treno delle lettere – ' + themeH1,
  modes: {
    'null': { SKEL: SKEL_AT, P2: P2_AT },
  },
  P3: `Se il bambino si è divertito a comporre il treno delle lettere, può continuare con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli per conoscere le lettere e il loro ordine mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di riconoscere ogni lettera e mettere l'alfabeto in fila, dalla A alla Z.`,
};
