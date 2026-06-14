/* it-readiness-find-objects — Italian prose config for the find-objects fan.
 * One mode (readiness, NO standard, level 'infanzia'):
 *   'find-odd' — a crowded search-picture (scena affollata) full of pictures; MOST
 *      appear as PAIRS (gemelli); a FEW are UNPAIRED (spaiate). The child scans the
 *      whole scene and marks the unpaired pictures. NO counting — pure visual search.
 *      Strand: Discriminazione visiva.
 * LEXICON SEPARATION FROM shadow-match (same strand): this config uses
 *   scena affollata / cercare / coppia / gemello / spaiata / senza compagno /
 *   che compare una sola volta — and NEVER any of shadow-match's shape/shadow words.
 *   No shadows mentioned at all (lexicon stays on visual-search-for-the-unpaired).
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le cose / il gruppo" = {GEN_ART} {GEN}; any verb/adjective
 *   agreeing with {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc. */
'use strict';

const SKEL_FO = [
  // 1 — question opening
  `«Chi non ha trovato il suo gemello?» È la domanda che apre questo gioco per il bambino della scuola dell'infanzia. La pagina è una scena affollata, piena di immagini di {N_PL}, e la maggior parte di esse compare in coppia: due figure identiche, vicine come gemelli. Solo poche immagini sono rimaste spaiate, senza compagno, e si nascondono nel disordine. Il bambino passa lo sguardo su tutta la scena e segna le figure che compaiono una sola volta. Qui non si conta niente, si cerca soltanto: questa immagine ha un gemello oppure è sola? Proprio questo cercare con pazienza in un campo affollato è una preziosa abilità che prepara alla scuola. Niente fretta, si gioca al proprio ritmo. Suggeriscigli di prendere una figura e di chiedersi se nella scena ce n'è un'altra uguale. Se non la trova, ha scovato un'immagine spaiata. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, l'attività diventa un caldo momento di gioco condiviso.`,

  // 2 — metaphor opening
  `Immagina una stanza piena di amici che si tengono per mano a due a due: a colpo d'occhio noti chi è rimasto da solo. È la stessa sensazione che accoglie il bambino su questa scena affollata. Guardando {GEN_ART} {GEN}, scopre che quasi tutte le figure formano coppie di gemelli, mentre alcune sono spaiate e aspettano di essere notate. Il compito che gli proponiamo è dolce, scorrere con calma tutta la pagina e segnare le immagini che non hanno un compagno. Concentrandosi sulla ricerca, il piccolo allena la discriminazione visiva e impara a confrontare una figura con tutte le altre. Non c'è alcun voto da prendere, soltanto la curiosità che guida lo sguardo. Invitalo a raccontare ad alta voce ciò che vede, a indicare le coppie e a cercare gli intrusi solitari. Se segna una figura che in realtà ha il suo gemello, sorridete insieme e si riprova con leggerezza. Ogni immagine spaiata trovata è una conquista che lo riempie di orgoglio, in un'atmosfera serena e paziente.`,

  // 3 — invitation opening
  `Vieni a esplorare questa scena affollata insieme al tuo bambino! Sulla pagina, pensata per la scuola dell'infanzia, brulicano immagini di {N_PL} di ogni tipo. Quasi tutte si presentano a coppie, due figure identiche una vicina all'altra; ma qualcuna è rimasta spaiata, senza compagno. Il piccolo cerca in tutto il campo e segna proprio quelle immagini che compaiono una sola volta. Non deve contare nulla, deve solo riconoscere: c'è una seconda figura uguale a questa, oppure è sola? Questo cercare attento rafforza il guardare con precisione, una calma abilità di base che alla scuola tornerà utile per distinguere lettere e forme simili. Niente cronometro scandisce il tempo: si procede con tranquillità. Accompagnalo con domande leggere, dove vedi due figure uguali, quale ne è rimasta una sola, e lasciagli lo spazio per pensarci. Trovare l'immagine spaiata rafforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di una figura scovata.`,

  // 4 — skill-statement opening
  `Cercare con gli occhi senza contare: ecco l'abilità gentile che questa scheda della scuola dell'infanzia mette in gioco. Sulla pagina, una scena affollata pullula di figure; la maggior parte di esse forma coppie di gemelli, mentre poche restano spaiate. Il bambino esamina tutta la scena e segna le immagini rimaste senza compagno. È un esercizio per gli occhi e per l'attenzione: per scegliere bene, deve confrontare ogni figura con quelle vicine e capire se ce n'è un'altra uguale. Niente tempi da battere, conta il piacere di cercare. Sostienilo con domande dolci e lascialo esplorare la pagina seguendo il proprio passo. Se non trova subito una figura solitaria, riprova con tranquillità, senza che nessuno lo metta fretta. Ogni immagine spaiata individuata rafforza la discriminazione visiva e la fiducia in se stesso. Vissuta a quattro mani, con tempi distesi e parole gentili, questa attività diventa un momento prezioso in cui il bambino impara guardando e confrontando, una figura alla volta.`,

  // 5 — quote opening
  `«Questa è uguale a quella, e quella invece è tutta sola!» Capita spesso di sentire frasi così, mentre il bambino esplora questa scena affollata della scuola dell'infanzia. Guardando le immagini di {N_PL}, nota che quasi tutte tornano in coppia, identiche come gemelli, e che alcune sono rimaste spaiate. Il suo compito è cercare in tutto il campo e segnare proprio le figure che compaiono una sola volta. Non si conta, si osserva: questa immagine ha un gemello da qualche parte, oppure no? Questo guardare invece di contare è un'abilità di base molto utile, e rende i bambini sicuri nel cercare con attenzione. Le figure sono mescolate apposta, perché la ricerca resti una piccola avventura. Incoraggialo a confrontare ogni immagine con le altre e a scegliere quelle senza compagno. Se sbaglia, ne cerca un'altra con serenità, senza fretta. Ogni figura spaiata è una piccola gioia da festeggiare, in un clima caldo e paziente da vivere fianco a fianco.`,

  // 6 — "Immagina…" scene opening
  `Immagina di entrare in una piazza piena di gente, dove quasi tutti camminano in coppia. È l'atmosfera di questa scena affollata, pensata per la scuola dell'infanzia. Il bambino vi trova tante immagini di {N_PL}: la maggior parte appare a due a due, come gemelli, mentre poche figure restano spaiate, senza nessuno accanto. Il piccolo cerca tra tutte le immagini e segna quelle solitarie, che compaiono una sola volta. Qui non c'è niente da contare, solo da scoprire chi è rimasto senza compagno. Cercare con cura in un campo così pieno allena gli occhi e la concentrazione, un'abilità che alla scuola conterà quando si tratterà di non perdere di vista i dettagli. Invitalo a indicare prima le coppie ben formate, poi a stanare le figure rimaste sole. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo. Quando trova l'immagine spaiata, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — reassurance-first opening
  `Qui non c'è nulla da sbagliare davvero: si cerca, si guarda e ci si diverte. Questa scena affollata della scuola dell'infanzia accoglie il bambino con tante immagini di {N_PL}, quasi tutte disposte in coppia. Solo poche figure sono rimaste spaiate, senza compagno, e attendono di essere notate. Con calma il piccolo scorre tutto il campo e segna le immagini che compaiono una sola volta. Non deve contare niente: gli basta confrontare ogni figura con le altre e capire se ce n'è un'altra uguale. Questo cercare paziente è una vera abilità di base, perché rafforza il guardare con attenzione, utile più avanti nello scrivere e nel leggere. Niente gara né punteggio, soltanto lo sguardo curioso e la voglia di provare. Stimolalo a procedere ordinatamente, fila dopo fila, così nessuna figura gli sfugge. Se cambia idea, ne può segnare un'altra con tranquillità. Trovare le immagini solitarie è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 8 — scene/wimmel opening (sensory)
  `Occhi aperti sul gran disordine! Su questa scena affollata, pensata per la scuola dell'infanzia, le immagini di {N_PL} sono sparpagliate qua e là, allegramente confuse. Quasi ogni figura ha il suo gemello nascosto da qualche parte nel campo, ma non tutte: alcune sono rimaste spaiate. Il bambino spulcia tutta la pagina e scova le immagini senza compagno, quelle che compaiono una sola volta. Confronta ogni motivo con gli altri, invece di tirare a indovinare: questa figura torna anche altrove, oppure è sola? Questa quieta concentrazione sul cercare è una preziosa abilità di base che prepara alla scuola e affina gli occhi e la pazienza. Non c'è alcuna fretta, solo il gusto di guardare bene. Stimolalo a seguire la scena con ordine, a indicare le coppie e a festeggiare ogni figura solitaria trovata. Se una figura lo trae in inganno, riparte con calma. In un clima gentile e disteso, l'attività si fa momento prezioso di osservazione e scoperta, da vivere insieme con dolcezza.`,
];

const P2_FO = [
  // 1 — question
  `«Chi è rimasto senza gemello?» Da questa domanda parte il gioco. Nella scena affollata quasi tutte le immagini formano coppie, ma poche sono spaiate. Il bambino le cerca confrontando ogni figura con le altre e segna quelle che compaiono una sola volta. È un'attività tutta di sguardo, senza contare e senza voti, da gustare al proprio ritmo; ogni figura solitaria trovata merita un sorriso.`,

  // 2 — invitation/parent-tip
  `Prepara un momento tranquillo al tavolo e osservate insieme la scena con {N_PL}. Quasi tutte le figure hanno un gemello vicino, ma qualcuna è sola: invita il piccolo a stanare proprio quelle spaiate. Niente orologi e niente corsa; basta confrontare ogni immagine con le altre e segnare chi compare una sola volta. Un sorriso caldo motiva i piccoli cercatori più di ogni altra cosa.`,

  // 3 — metaphor
  `Come amici che si tengono per mano a due a due, quasi tutte le figure di questa scena affollata hanno il loro gemello. Il bambino guarda {GEN_ART} {GEN} e scopre chi è rimasto solo, segnando le immagini spaiate. È un dolce esercizio di attenzione, mai di conteggio: lasciagli tutto il tempo che serve e festeggiate insieme ogni figura senza compagno individuata, in tutta serenità.`,

  // 4 — reassurance
  `Su questa pagina il piccolo trova una scena affollata di immagini di {N_PL}, quasi tutte in coppia. Con calma cerca quelle spaiate e le segna, allenando la discriminazione visiva e la pazienza. È un momento di osservazione perfetto da vivere fianco a fianco: lascialo procedere al suo ritmo, accompagnalo con domande leggere e proseguite senza alcuna pressione, festeggiando ogni figura solitaria.`,

  // 5 — skill-statement
  `Cercare con gli occhi, non con i numeri: nella scena affollata il bambino confronta ogni figura con le altre e stana quelle che compaiono una sola volta. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una figura spaiata scovata. Suggeriscigli di passare in rassegna la pagina con ordine, così nessuna immagine senza compagno gli sfugge.`,

  // 6 — "trick"/parent-tip
  `Se il piccolo è incerto, fategli scorrere la scena affollata una fila alla volta, invece di guardare a caso: così non gli sfugge nessuna figura. Per ciascuna immagine cercate insieme se ne esiste un'altra uguale; quando non c'è il gemello, ha trovato una spaiata. Questo piccolo aiuto rende il cercare concreto e rafforza il suo sguardo attento, in tutta calma e senza contare nulla.`,

  // 7 — quote/celebration
  `«Eccola, questa è tutta sola!» è l'esclamazione che renderà felice il vostro momento insieme. Nella scena affollata di {N_PL}, il bambino confronta le figure e segna quelle senza compagno, una a una. Loda l'impegno e non la velocità, così cercare resta un piacere e non una prova: è un gioco di sguardi, mai di numeri, e ogni immagine spaiata trovata è una piccola conquista da assaporare con dolcezza.`,
];

const H1 = {
  'find-odd': 'Trova le figure spaiate con {H1} – scheda per la scuola dell\'infanzia',
};
const CAR = {
  'find-odd': 'Trova le figure spaiate – ',
};

module.exports = {
  type: 'find-objects',
  eyebrow: 'Scheda: Trova le figure spaiate',
  strand: 'Discriminazione visiva',
  level: 'infanzia',
  slotWord: 'figure-spaiate',
  h1: (mk) => H1[mk] || H1['find-odd'],
  carousel: (mk, themeH1) => (CAR[mk] || 'Trova le figure spaiate – ') + themeH1,
  modes: {
    'find-odd': { SKEL: SKEL_FO, P2: P2_FO },
  },
  P3: `Se il bambino si è divertito a cercare nella scena affollata, può continuare con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli di osservazione, perfetti per affinare lo sguardo attento mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di cercare e scoprire chi è rimasto spaiato.`,
};
