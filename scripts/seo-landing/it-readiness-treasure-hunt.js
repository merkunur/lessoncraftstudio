/* it-readiness-treasure-hunt — Italian prose config for the treasure-hunt fan.
 * TWO modes (readiness, NO standard, level 'infanzia', strand 'Orientamento spaziale'):
 *   'cardinal-arrows' — the child follows ARROWS across a treasure map: su / giù /
 *      sinistra / destra. Owns: frecce / segui la freccia / la rotta a frecce /
 *      casella per casella. NO compass words. NEVER path-words (percorso/sentiero).
 *   'compass' — the child uses a COMPASS and the cardinal points: nord / sud / est /
 *      ovest. Owns: bussola / l'ago della bussola / orientarsi. NO arrow words.
 * Mechanic: a treasure map grid where the child follows DIRECTIONS to reach the
 * treasure. NO counting, NO time pressure, no timer, no score.
 * FENCE vs picture-path (Labirinti): this config OWNS caccia al tesoro / il tesoro /
 * segui le frecce / la bussola / gli indizi / casella per casella. It NEVER uses
 * labirinto / il percorso / l'uscita / l'entrata / vicolo cieco (those are picture-path).
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "tra {N_PL}" /
 *   "di {N_PL}" slots; "le cose/immagini" = {GEN_ART} {GEN}; any verb/adjective
 *   agreeing with {GEN} is PLURAL; "di/a/da/su + collective" via {DI_GEN} etc.;
 *   the P3 uses {nb1}/{nb2} neighbours + {GEN_ART} {GEN}. Never an article directly
 *   before {N_PL}. Every SKEL frame references the theme via {N_PL} or {GEN_ART} {GEN}. */
'use strict';

const SKEL_ARROWS = [
  // 1 — what the child does (arrows lead the treasure hunt)
  `Segui le frecce e trova il tesoro! In questa scheda il bambino guarda la freccia, capisce dove punta e avanza di una sola casella nella direzione indicata: su, giù, a sinistra oppure a destra. Procede così di freccia in freccia, una alla volta, senza mai saltare una casella. A ogni nuova freccia la direzione può cambiare — su, giù, sinistra, destra — e bisogna osservare con cura dove guarda la punta prima di muoversi. Lungo il cammino il piccolo incontra immagini di {N_PL} da osservare, e l'avventura si fa vivace. Avanzare nel verso indicato, una freccia per volta, casella per casella, è un primo bell'orientamento nello spazio: a sinistra, a destra, in su, in giù. Senza cronometro e senza punteggio, da rifare tutte le volte che si vuole alla scuola dell'infanzia.`,

  // 2 — why: orientarsi nello spazio + seguire una consegna di direzione
  `Seguire una freccia vuol dire capire dove punta: il bambino osserva il verso — su, giù, sinistra o destra — e poi avanza nella direzione indicata. Questo gesto, ripetuto una freccia alla volta, lo aiuta a dare un nome ai primi termini di direzione: in su, in giù, a sinistra, a destra. Incrociando lungo la strada {GEN_ART} {GEN}, conserva il piacere dell'osservazione. La freccia mostra la via, il piccolo avanza di una casella e la rotta a frecce si allunga casella dopo casella. Riconoscere che la freccia punta a sinistra, oppure verso l'alto, e poi muoversi in quel verso: ecco tutto l'apprendimento, tranquillo e gioioso. Senza fretta, il bambino acquista sicurezza e il vocabolario su-giù-sinistra-destra diventa a poco a poco familiare.`,

  // 3 — home or atelier "con il dito che avanza di una casella"
  `A casa o in sezione, il bambino segue le frecce con il dito. Posa il dito sul via, guarda la prima freccia, ne legge il verso — la freccia punta a destra, in su, in giù oppure a sinistra — e fa scivolare il dito di una casella in quella direzione. Poi passa alla freccia seguente, sempre una alla volta. Osserva tra {N_PL} disposte intorno alla mappa e avanza nel verso indicato, con calma. Da solo o accompagnato, si prende il tempo di sentire bene ogni direzione: su, giù, sinistra, destra. Il dito segue la punta della freccia, casella dopo casella, verso il tesoro. Un'attività semplice e rassicurante, perfetta per la scuola dell'infanzia e sempre senza alcuna pressione.`,

  // 4 — vivid "una vera caccia al tesoro sulla carta"
  `Pronti, partenza, via, tra {N_PL}, alla ricerca del tesoro! Sul foglio le frecce disegnano la rotta: ognuna punta in su, in giù, a sinistra o a destra. Il bambino guarda il verso della freccia e avanza di una casella nella direzione indicata, una freccia per volta. Non si muove a caso: segue le frecce, esattamente dove puntano. Riconoscere che questa freccia indica la sinistra e quell'altra l'alto, e poi spostarsi nel verso giusto: è tutto il gioco della caccia al tesoro. Un modo allegro, alla scuola dell'infanzia, di esercitare l'orientamento seguendo le frecce, su-giù-sinistra-destra, senza mai perdere il piacere di arrivare al tesoro.`,

  // 5 — free + print or online
  `Questa scheda «segui le frecce» è gratis e si gioca in due modi: da stampare per tracciare la rotta con la matita, oppure online per avanzare con la punta del dito. In entrambi i casi il bambino guarda ogni freccia, ne legge il verso — in su, in giù, a sinistra, a destra — e si sposta di una casella nella direzione indicata, una freccia alla volta. Le immagini di {N_PL} costellano il cammino verso il tesoro. A casa come in classe è pronta all'uso, senza materiale: basta seguire le frecce, casella per casella. Stampala per il quaderno oppure aprila online: scegli tu il formato che si adatta meglio al tuo bambino.`,

  // 6 — calm pacing "una freccia alla volta, con calma"
  `Qui si va una freccia alla volta, con calma. Il bambino guarda una freccia, ne individua il verso — su, giù, sinistra o destra —, avanza di una casella in quella direzione e poi passa alla freccia seguente, senza fretta. Se una direzione gli sfugge, ricomincia: non esiste una risposta sbagliata «per davvero», soltanto nuovi tentativi. Incontrare tra {N_PL} rende il momento sereno. Niente cronometro, niente punteggio: solo il piacere di seguire le frecce, leggendo ogni volta dove guarda la punta. Imparare la sinistra, la destra, il su e il giù, una freccia dopo l'altra fino al tesoro: questa pedagogia dolce è perfetta per i bambini della scuola dell'infanzia.`,

  // 7 — "per voi" angle
  `Per voi, genitori o insegnanti, «segui le frecce» è uno strumento semplice e rassicurante. La scheda invita il bambino a leggere il verso di ogni freccia — su, giù, sinistra, destra — e ad avanzare di una casella nella direzione indicata, una freccia alla volta. Potete nominare la prima insieme a lui: «la freccia punta a destra», e poi lasciarlo fare in autonomia. Provate a proporre il dito prima della matita: così il verso della freccia si sente in modo dolce. Le immagini di {N_PL} offrono bei punti di osservazione lungo la rotta del tesoro. Un'attività della scuola dell'infanzia facile da inserire nella giornata, gratis e senza pressione, in cui si seguono le frecce tutte le volte che si vuole.`,

  // 8 — reach-the-treasure image
  `Il bambino segue una rotta a frecce ben chiara: ognuna punta in su, in giù, a sinistra o a destra. La consegna è limpida — guardare dove va la freccia, poi avanzare di una casella nel verso indicato, una freccia alla volta, finché il dito si ferma sulla casella del tesoro. Lungo la via incontra {GEN_ART} {GEN} da osservare, e la caccia al tesoro si fa vivace. Seguire le frecce richiede di leggere bene ogni punta e di tenere la rotta: a sinistra, a destra, in su, in giù, casella per casella. È un primo orientamento nello spazio, tutto in dolcezza. Questa scheda di osservazione e logica, pensata per la scuola dell'infanzia, si rifà tutte le volte che si vuole, al proprio ritmo.`,
];

const P2_ARROWS = [
  `Questa scheda «segui le frecce» è adatta ai bambini della scuola dell'infanzia, a casa come a scuola. Gratis, da stampare per tracciare con la matita o da giocare online con la punta del dito. Il bambino guarda ogni freccia, ne legge il verso — su, giù, sinistra, destra — e avanza di una casella nella direzione indicata, una freccia alla volta, verso il tesoro.`,

  `Pensata per i più piccoli, questa attività gratis si gioca online o da stampare. Le frecce mostrano la via: su, giù, sinistra, destra. Il bambino le segue una a una, avanzando di una casella nel verso indicato, casella per casella. Senza cronometro e senza punteggio, ripete la caccia al tesoro tutte le volte che vuole.`,

  `Perfetta in autonomia o accompagnata, questa scheda «segui le frecce» è pronta all'uso. Da stampare o online, gratis, invita il bambino a leggere il verso di ogni freccia — sinistra, destra, su, giù — e ad avanzare di una casella nella direzione indicata, senza alcuna pressione, fino al tesoro.`,

  `Per casa o per la classe, ecco una scheda di frecce semplice e gratis. Il bambino osserva, legge dove punta ogni freccia — su, giù, sinistra o destra — e avanza di una casella in quel verso. Da stampare o online, prima con il dito e poi con la matita, è adatta ai piccoli della scuola dell'infanzia.`,

  `Questa attività gratis della scuola dell'infanzia si gioca con la punta del dito online o con la matita sul foglio. Il principio: seguire le frecce una a una, leggerne il verso — in su, in giù, a sinistra, a destra — e avanzare di una casella nella direzione indicata, casella per casella, con calma.`,

  `Ideale per un primo orientamento, questa scheda propone frecce che mostrano la via: su, giù, sinistra, destra. Da stampare o online, gratis, il bambino segue ogni freccia e avanza di una casella nel verso indicato, al proprio ritmo e senza alcuna pressione, fino al tesoro.`,

  `Adatta ai bambini della scuola dell'infanzia, in autonomia o con voi, questa scheda gratis mette l'osservazione al centro del gioco. Leggere il verso della freccia — su, giù, sinistra, destra — e avanzare di una casella: da stampare per la matita o da giocare online con il dito, con calma.`,
];

const SKEL_COMPASS = [
  // 1 — what the child does (compass lead)
  `Prendi la bussola e cerca il tesoro! In questa scheda il bambino si orienta con i punti cardinali: nord, sud, est e ovest. L'ago della bussola indica la direzione, e ogni indizio dice dove andare: «vai verso nord», «vai verso est». Il piccolo legge il punto cardinale, poi si sposta di una casella in quel verso, tra {N_PL} sparse sulla mappa. A poco a poco scopre dove si trovano i quattro punti cardinali su una pianta e impara a orientarsi con la bussola, indizio dopo indizio. Prima il nord, poi l'est, poi il sud: orientarsi con la bussola diventa un gioco. Non c'è cronometro né punteggio, soltanto i punti cardinali e il piacere di avanzare verso il tesoro. Una bella scheda da stampare, come una piccola spedizione.`,

  // 2 — why: primo vocabolario spaziale nord-sud + seguire una consegna
  `Nord, sud, est e ovest: ecco i quattro punti cardinali che il bambino scopre qui. Sulla griglia seminata di immagini di {N_PL}, ogni indizio dà un punto cardinale — «vai verso sud», «vai verso ovest» —, e il piccolo legge la bussola per avanzare di una casella in quel verso. Imparare a orientarsi con la bussola e a riconoscere il nord, il sud, l'est, l'ovest prepara in dolcezza tanti apprendimenti futuri. Con ogni punto cardinale nominato, l'ago della bussola diventa più familiare, molto prima delle carte geografiche della scuola. Al suo ritmo, senza pressione, il bambino acquista sicurezza e prende confidenza con i quattro punti cardinali, un indizio dopo l'altro.`,

  // 3 — home or atelier "con il dito che avanza di una casella"
  `A casa o in sezione, il bambino si orienta con la bussola, con la punta del dito. Posa il dito, legge il primo punto cardinale — «vai verso nord» —, e fa scivolare il dito di una casella in quel verso. Poi arriva un altro indizio: verso est, verso sud, verso ovest. Osserva tra {N_PL} disposte sulla mappa e si sposta seguendo i punti cardinali, un indizio alla volta. Da solo o accompagnato, si prende il tempo di collocare bene il nord, il sud, l'est e l'ovest. L'ago della bussola fa da guida, il dito segue. Un'attività semplice da proporre in un angolo tranquillo, perfetta per la scuola dell'infanzia e sempre senza alcuna pressione.`,

  // 4 — vivid "una vera caccia al tesoro sulla carta"
  `Prepara la bussola, si parte tra {N_PL}, a caccia del tesoro! Gli indizi parlano la lingua degli esploratori: «vai verso nord», «vai verso est», «vai verso sud», «vai verso ovest». Il bambino legge ogni punto cardinale e sposta il dito di una casella in quel verso. Indizio dopo indizio, i quattro punti cardinali diventano riferimenti che può usare da solo, e orientarsi con la bussola diventa un vero piacere. Riconoscere il nord, poi l'ovest, poi il sud: è tutto il gioco dell'esploratore a caccia del tesoro. Un modo allegro, alla scuola dell'infanzia, di esercitare l'osservazione e la logica con la bussola, senza mai perdere il piacere della scoperta.`,

  // 5 — free + print or online
  `Questa scheda con la bussola è gratis e si gioca in due modi: da stampare per seguire i punti cardinali con la matita, oppure online con la punta del dito. In entrambi i casi il bambino legge la bussola, segue gli indizi — verso nord, sud, est od ovest — e si sposta di una casella in quel verso. Le immagini di {N_PL} costellano la spedizione verso il tesoro. A casa come in classe è pronta all'uso, senza materiale: basta orientarsi con la bussola. Stampala per il quaderno oppure aprila online: scegli tu il formato che si adatta meglio al tuo bambino.`,

  // 6 — calm pacing
  `Qui si va un punto cardinale alla volta, con calma. Il bambino ascolta l'indizio — «vai verso nord» —, si sposta di una casella con la bussola, poi passa al successivo: verso est, verso sud, verso ovest. Se esita su un punto cardinale, ricomincia: non esiste una risposta sbagliata «per davvero», soltanto nuovi tentativi. Incrociare {GEN_ART} {GEN} rende il momento sereno. Niente cronometro, niente punteggio: solo il piacere di orientarsi con la bussola, nominando ogni volta il nord, il sud, l'est o l'ovest. Questa pedagogia dolce, che lascia tutto il tempo necessario, è perfetta per i bambini della scuola dell'infanzia.`,

  // 7 — "per voi" angle
  `Per voi, genitori o insegnanti, questa scheda con la bussola è uno strumento semplice e rassicurante. Invita il bambino a orientarsi con i punti cardinali — nord, sud, est, ovest — e a spostarsi di una casella a ogni indizio. Voi prestate la voce: «vai verso ovest», «vai verso nord», e poi lo lasciate avanzare in autonomia. Provate a proporre il dito prima della matita: così il punto cardinale si colloca in modo dolce. Le immagini di {N_PL} offrono bei punti di osservazione lungo la spedizione verso il tesoro. È un'attività della scuola dell'infanzia facile da inserire nella giornata, gratis e senza pressione, in cui ci si orienta con la bussola tutte le volte che si vuole.`,

  // 8 — reach-the-treasure image
  `Il bambino naviga con la bussola, un punto cardinale alla volta. La consegna è limpida: ascoltare l'indizio — verso nord, verso sud, verso est, verso ovest —, leggere l'ago della bussola, poi spostarsi di una casella in quel verso, finché il dito si ferma sulla casella del tesoro. Lungo il cammino incontra {GEN_ART} {GEN} da osservare, e la spedizione si fa vivace. Orientarsi con la bussola richiede di collocare bene ogni punto cardinale e di tenere la rotta: nord, sud, est, ovest. È un primo vocabolario spaziale, tutto in dolcezza. Questa scheda di osservazione e logica, pensata per la scuola dell'infanzia, si rifà tutte le volte che si vuole, al proprio ritmo.`,
];

const P2_COMPASS = [
  `Questa scheda con la bussola è adatta ai bambini della scuola dell'infanzia, a casa come a scuola. Gratis, da stampare per seguire i punti cardinali con la matita o da giocare online con la punta del dito. Il bambino si orienta con la bussola e segue il nord, il sud, l'est e l'ovest, un indizio alla volta, verso il tesoro.`,

  `Pensata per i più piccoli, questa attività gratis si gioca online o da stampare. Gli indizi danno i punti cardinali: nord, sud, est, ovest. Il bambino legge la bussola e si sposta di una casella in quel verso. Senza cronometro e senza punteggio, ripete la spedizione tutte le volte che vuole.`,

  `Perfetta in autonomia o accompagnata, questa scheda con la bussola è pronta all'uso. Da stampare o online, gratis, invita il bambino a orientarsi con i punti cardinali — nord, sud, est, ovest — e a spostarsi di una casella a ogni indizio, senza alcuna pressione, fino al tesoro.`,

  `Per casa o per la classe, ecco una scheda con la bussola, semplice e gratis. Il bambino osserva, legge il punto cardinale — nord, sud, est od ovest — e si sposta di una casella in quel verso. Da stampare o online, prima con il dito e poi con la matita, è adatta ai piccoli della scuola dell'infanzia.`,

  `Questa attività gratis della scuola dell'infanzia si gioca con la punta del dito online o con la matita sul foglio. Il principio: orientarsi con la bussola, leggere ogni punto cardinale — il nord, il sud, l'est, l'ovest — e spostarsi di una casella in quel verso, con calma.`,

  `Ideale per scoprire un primo vocabolario spaziale, questa scheda propone una bussola e i suoi quattro punti cardinali. Da stampare o online, gratis, il bambino legge ogni indizio — nord, sud, est, ovest — e si sposta di una casella, al proprio ritmo e senza alcuna pressione, verso il tesoro.`,

  `Adatta ai bambini della scuola dell'infanzia, in autonomia o con voi, questa scheda gratis mette l'osservazione al centro del gioco. Orientarsi con la bussola, leggere il punto cardinale e spostarsi di una casella: da stampare per la matita o da giocare online con il dito, con calma.`,
];

const H1 = {
  'cardinal-arrows': 'Caccia al tesoro: {H1} – per la scuola dell\'infanzia',
  'compass': 'Caccia al tesoro: {H1} – per la scuola dell\'infanzia',
};
const CAR = {
  'cardinal-arrows': 'Caccia al tesoro – ',
  'compass': 'Caccia al tesoro – ',
};

module.exports = {
  type: 'treasure-hunt',
  eyebrow: 'Scheda: Caccia al tesoro',
  strand: 'Orientamento spaziale',
  level: 'infanzia',
  slotWord: 'immagini',
  h1: (mk) => H1[mk] || H1['cardinal-arrows'],
  carousel: (mk, themeH1) => (CAR[mk] || '') + themeH1,
  modes: {
    'cardinal-arrows': { SKEL: SKEL_ARROWS, P2: P2_ARROWS },
    'compass': { SKEL: SKEL_COMPASS, P2: P2_COMPASS },
  },
  P3: `Il bambino ha preso gusto alle cacce al tesoro sul tema {GEN}? Altre piccole avventure lo aspettano. Provate i nostri {nb1} per nuove mappe e nuovi indizi, oppure cambiate mondo con i nostri {nb2} quando viene voglia di variare, mentre esplora {GEN_ART} {GEN}. Ogni scheda resta la stessa avventura tranquilla, senza cronometro e senza punteggio, perché il piacere di seguire gli indizi e di trovare il tesoro cresca in dolcezza. Tutte le nostre schede sono gratis: da giocare online su tablet o computer, oppure da stampare per un momento calmo a casa. Così il bambino può continuare a cercare il tesoro, a tenere la rotta e a festeggiare ogni piccola scoperta, un tesoro dopo l'altro, sempre al proprio ritmo.`,
};
