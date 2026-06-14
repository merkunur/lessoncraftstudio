/* it-readiness-more-less — Italian prose config for the more-less fan.
 * ONE mode (readiness, NO standard, level 'infanzia'):
 *   'image-image' — two groups/piles of pictures side by side; the child decides,
 *      BY LOOKING (not counting), which group has MORE and which has FEWER
 *      (pre-numeric magnitude comparison; no counting, no numerals, no arithmetic).
 *   Strand: Confronto di quantità.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le cose" = {GEN_ART} {GEN}; any verb/adjective agreeing
 *   with {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc.
 * Lexicon kept on QUANTITY (quantità / di più / di meno / gruppo / mucchio /
 *   la quantità maggiore) — NEVER "grandezza / grande / piccolo / dimensione"
 *   (that is big-small). Strictly COMPARISON-framed; NEVER "conta quante…",
 *   NEVER numbers/numerals/arithmetic. */
'use strict';

const SKEL_II = [
  `«Dove ce ne sono di più?» È la prima domanda che accende lo sguardo del bambino della scuola dell'infanzia davanti a questa pagina. Su un lato c'è un gruppo di immagini di {N_PL}, sull'altro un secondo gruppo, e tutto sta nel decidere quale ne contenga di più e quale di meno. Niente conteggi: il piccolo guarda i due insiemi e capisce a colpo d'occhio quale appare più pieno. Proprio questo confrontare a vista, senza usare numeri, è una preziosa abilità che prepara alla scuola, perché getta le basi del futuro senso della quantità. Niente fretta, si gioca al proprio ritmo. Suggeriscigli di guardare un gruppo, poi l'altro, e di chiedersi quale dei due gli sembra più affollato. Se all'inizio esita, lasciate riposare lo sguardo e riprovate insieme con leggerezza. Quando indica il gruppo con la quantità maggiore, la soddisfazione arriva da sola. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, l'attività diventa un caldo momento di gioco condiviso, tutto fatto di occhi e mai di numeri.`,

  `Immagina un cestino traboccante e uno quasi vuoto: anche solo guardandoli si capisce dove ce n'è di più. È la stessa sensazione che accoglie il bambino su questa scheda. Osservando le immagini di {N_PL} disposte in due gruppi, scopre che a lui tocca decidere quale insieme è più ricco e quale più scarso, soltanto con gli occhi. Concentrandosi sul confronto, il piccolo allena il senso della quantità prima ancora dei numeri, perché impara a valutare di più e di meno a vista. Non c'è alcun voto da prendere, soltanto la curiosità che guida lo sguardo. Invitalo a descrivere ad alta voce ciò che vede, a indicare il gruppo che gli pare più affollato. Se sceglie l'insieme sbagliato, sorridete insieme e si riprova con leggerezza. Ogni scelta giusta è una conquista che lo riempie di orgoglio. In un'atmosfera serena e paziente, questa attività diventa un'occasione affettuosa per osservare con calma e crescere insieme, un confronto dopo l'altro, senza alcuna pressione addosso.`,

  `Guarda i due gruppi: dove ce ne sono di più? Su questa pagina pensata per la scuola dell'infanzia, due insiemi di immagini si fronteggiano, uno a sinistra e uno a destra. Il bambino deve riconoscere quale gruppo contenga la quantità maggiore e quale quella minore. Per riuscirci basta confrontare a vista: questo insieme sembra più pieno o più vuoto di quello accanto? Così il piccolo distingue di più e di meno senza bisogno di contare né di usare numeri. Questo confronto di quantità è una calma abilità di base, e precede di molto il calcolo. Niente cronometro scandisce il tempo: si procede con tranquillità. Accompagnalo con domande leggere, in quale gruppo te ne sembrano di più, e lasciagli lo spazio per pensarci. Se cambia idea, può indicare di nuovo e proseguire sereno. Riconoscere il gruppo con più immagini rafforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a coltivare lo sguardo curioso del bambino.`,

  `Sai dire con un'occhiata dove ce n'è di più? Per il bambino è subito un piccolo gioco da risolvere con gli occhi. Davanti a sé ha due gruppi di immagini e sceglie quello con la quantità maggiore, senza contare alcunché. Qui non si tratta di numeri, ma di confrontare insiemi: quale ne ha di più, quale di meno. Valutare le quantità a vista diverte e prepara con dolcezza alla scuola, dove il senso del numero conta molto. I due gruppi sono affiancati apposta, perché il confronto resti facile e immediato. Stimolalo a guardare prima un insieme, poi l'altro, e a scegliere quello che gli pare più affollato. Anche uno sbaglio è un passo avanti: si riprova con il sorriso. Quando indica il gruppo giusto, la concentrazione del bambino si fa più salda. Vissuta accanto a una voce dolce e con tempi distesi, la scheda diventa un caldo momento in cui si impara osservando, mai contando.`,

  `Di più o di meno, che cosa vedi? Ecco la domanda gentile di questa scheda della scuola dell'infanzia. Sulla pagina, due gruppi di immagini aspettano lo sguardo del bambino, che decide quale insieme contenga di più e quale di meno, solo guardando. È un allenamento dolce per gli occhi: per scegliere bene, deve confrontare con cura quanto pieno appare ciascun gruppo. Niente tempi da battere, conta il piacere di osservare. Sostienilo con domande dolci e lascialo esplorare la pagina seguendo il proprio passo. Se non capisce subito quale ne abbia di più, riprova con tranquillità, senza che nessuno lo metta fretta. Ogni confronto riuscito rafforza il senso della quantità e la fiducia in se stesso. Vissuta a quattro mani, con tempi distesi e parole gentili, questa attività diventa un momento prezioso in cui il bambino impara guardando e paragonando, un piccolo passo alla volta. Qui non servono numeri: bastano due occhi attenti e curiosi.`,

  `Confrontare le quantità senza usare numeri: su questa pagina della scuola dell'infanzia il bambino vede due gruppi di immagini e decide, soltanto con lo sguardo, quale ne contenga di più e quale di meno. Guardando le immagini di {N_PL} divise in due insiemi, non conta nulla: gli basta osservare con attenzione quale gruppo appare più ricco. Questo guardare invece di contare è un'abilità di base molto utile, e rende i bambini sicuri nel valutare gli insiemi. I due gruppi sono affiancati proprio per invitare al paragone. Incoraggialo a passare lo sguardo dall'uno all'altro e a scegliere quello con la quantità maggiore. Se indica il gruppo sbagliato, ne sceglie un altro con serenità, senza fretta. Ogni confronto giusto è una piccola gioia da festeggiare. In un clima caldo e paziente, l'attività si trasforma in un dolce momento di scoperta da vivere fianco a fianco, con tanta gentilezza e nessuna pressione.`,

  `Quale mucchio è più affollato? Questa è la domanda che fa sorridere il bambino davanti alla scheda. Osservando le immagini di {N_PL} disposte in due gruppi, capisce che a lui spetta riconoscere quale insieme ne contenga di più e quale di meno, soltanto guardando. Tutto sta nel confrontare a vista, una calma abilità che alla scuola conterà quando arriveranno i primi ragionamenti sulle quantità. E la cosa più bella è che qui basta guardare, mai contare. I due mucchi sono accostati apposta, così il paragone resta una piccola avventura immediata. Invitalo a indicare il gruppo più pieno, a confrontarlo con quello più scarso e a spiegarti la sua scelta. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo. Quando individua la quantità maggiore, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso, al passo che preferisce.`,

  `Due insiemi, uno sguardo solo. Su questa scheda per la scuola dell'infanzia il bambino trova due gruppi di immagini e deve scegliere quello con la quantità maggiore, senza contare. Confrontando i due insiemi a vista, capisce quale ne contiene di più e quale di meno. Questa quieta attenzione alle quantità è una vera abilità di base: rafforza il senso del numero ancora prima delle cifre, e al piccolo tornerà utile più avanti, quando incontrerà i primi confronti veri. Non c'è gara né punteggio, soltanto lo sguardo attento e la voglia di provare. Stimolalo a osservare un gruppo alla volta, a indicare quello più pieno e a raccontare ciò che nota. Se sceglie l'insieme sbagliato, ne indica un altro con calma e riparte. Trovare il gruppo con più immagini è una conquista che fa bene alla fiducia. In un clima gentile e disteso, l'attività si fa momento prezioso di osservazione e confronto, da assaporare insieme con tempi morbidi.`,
];

const P2_II = [
  `«Dove ce ne sono di più?» Da questa domanda parte il gioco. Davanti a due gruppi di immagini, il bambino sceglie quello con la quantità maggiore guardando soltanto, senza contare. Confronta gli insiemi al proprio ritmo, senza fretta e senza voti; se osserva prima il gruppo più scarso, quello più affollato salta subito agli occhi.`,

  `Setta un momento tranquillo al tavolo e osservate insieme le immagini di {N_PL} divise in due gruppi. A ogni pagina chiedigli quale insieme gli sembra più pieno, prima che indichi quello con più immagini. Così il tempo resta calmo e la pressione fuori dalla porta. Qui non si conta nulla: si confrontano le quantità guardando, e ogni scelta giusta merita un sorriso.`,

  `Un'idea dolce: riempite prima due ciotole, una con tanti tappi e una con pochi, e chiedetegli dove ce n'è di più, poi tornate alla pagina con {N_PL}. Così il piccolo capisce per gioco cosa significa «di più» e «di meno». Dopo, scegliere il gruppo giusto diventa facilissimo. Guardare e confrontare le quantità, mai contare, è tutto il segreto di questa scheda.`,

  `Resta sereno accanto al bambino mentre confronta le immagini di {N_PL} nei due gruppi. C'è chi indica con il dito e chi preferisce dirlo a voce: va bene in entrambi i modi. L'importante è che trovi l'insieme con la quantità maggiore e lo scelga con piacere. Niente orologi e niente corsa; un sorriso caldo motiva i piccoli osservatori più di ogni altra cosa.`,

  `Fidati del primo sguardo del bambino: di solito vede subito quale gruppo ne contiene di più, senza bisogno di contare. Incoraggialo a seguire la sua impressione e parlate insieme di dove ce n'è di più e di meno. Questo confrontare a vista, senza numeri, è proprio ciò che costruisce il primo senso della quantità, e può restare un gioco leggero e tranquillo, tutto fatto di occhi.`,

  `Che cosa vedi per primo? Invita il bambino a guardare le immagini di {N_PL} nei due gruppi e a dirti quale gli sembra più affollato. Non si conta, si confronta: lo sguardo da solo rivela la quantità maggiore. Parlate con calma di dove ce n'è di più e di meno e gioite di ogni scoperta. Così il confronto tra insiemi diventa un piccolo gioco sereno che, senza fretta, prepara alla scuola.`,

  `Accompagna il bambino con domande aperte mentre osserva le immagini di {N_PL}: in quale gruppo te ne sembrano di più? Lui decide soltanto guardando, senza mai contare. Loda lo sguardo attento, non la risposta veloce. Senza orologi e senza punteggi, il piccolo si allena a riconoscere la quantità maggiore e a confrontare gli insiemi con sicurezza, un confronto leggero dopo l'altro.`,
];

const H1_DISPLAY = 'Di più o di meno? Con {H1} – scheda per la scuola dell\'infanzia';

module.exports = {
  type: 'more-less',
  eyebrow: 'Scheda: Di più o di meno',
  strand: 'Confronto di quantità',
  level: 'infanzia',
  slotWord: 'piu-meno',
  h1: (mk) => H1_DISPLAY,
  carousel: (mk, themeH1) => 'Di più o di meno – ' + themeH1,
  modes: {
    'image-image': { SKEL: SKEL_II, P2: P2_II },
  },
  P3: `Se il bambino si è divertito a confrontare i gruppi, può continuare con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli di osservazione, perfetti per allenare lo sguardo sulle quantità mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di guardare dove ce n'è di più e dove di meno.`,
};
