/* it-readiness-find-and-count — Italian prose config for the find-and-count fan.
 * One mode (readiness, NO standard, level 'infanzia'):
 *   'letter-spotting' — an initial-SOUND spotting sheet (NOT counting, despite the
 *      worksheet family name). The parent/child names a target SOUND (the initial
 *      sound of a word); the child scans the pictures and circles the ones whose
 *      name STARTS with that sound. Phonological awareness — hearing the first sound
 *      of a word (suono iniziale). Strand: Consapevolezza fonologica.
 * LEXICON SEPARATION FROM the live "matching" type (Lettura, connect picture→letter):
 *   this config stays on suono iniziale / la prima lettera / ascoltare / cerchiare /
 *   con cosa comincia / il suono con cui inizia — and NEVER uses abbina/collega/unire
 *   nor any counting word (conta / quante / quanti are FORBIDDEN: listen-and-circle,
 *   never count).
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le immagini / il gruppo" = {GEN_ART} {GEN}; any verb/adjective
 *   agreeing with {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc. */
'use strict';

const SKEL_LS = [
  // 1 — question opening
  `«Con quale suono comincia questa parola?» È la domanda che apre il gioco per il bambino della scuola dell'infanzia. Su questa pagina ci sono tante immagini di {N_PL}, e a voi spetta scegliere un suono iniziale, per esempio il suono con cui inizia «sole». Il piccolo ascolta con attenzione, dice piano il nome di ogni figura e cerchia quelle che cominciano proprio con quel suono. Niente numeri qui, solo orecchie ben aperte: il nome di questa immagine parte con il suono giusto oppure no? Proprio questo ascoltare la prima parte delle parole è una preziosa abilità che prepara alla scuola e alla lettura. Niente fretta, si gioca al proprio ritmo. Suggeriscigli di pronunciare a voce alta il nome della figura, allungando bene il primo suono. Se non corrisponde, si passa serenamente alla prossima. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, l'attività diventa un caldo momento di gioco condiviso.`,

  // 2 — metaphor opening
  `Le parole hanno un piccolo cancello da cui entrano: il loro primo suono. È questa la magia che accoglie il bambino su questa scheda. Guardando {GEN_ART} {GEN}, gli proponiamo di scegliere insieme un suono iniziale e poi di scovare ogni figura il cui nome comincia proprio così. Il compito è dolce, ascoltare la prima parte di ciascuna parola e cerchiare le immagini che la condividono. Concentrandosi sul suono di apertura, il piccolo allena la consapevolezza fonologica e impara a sentire come iniziano le parole. Non c'è alcun voto da prendere, soltanto la curiosità che guida l'orecchio. Invitalo a dire ad alta voce il nome di ogni immagine, calcando dolcemente il suono iniziale. Se cerchia una figura che in realtà comincia in altro modo, sorridete insieme e si riprova con leggerezza. Ogni parola che inizia con il suono giusto è una conquista che lo riempie di orgoglio, in un'atmosfera serena e paziente.`,

  // 3 — invitation opening
  `Vieni ad ascoltare i suoni delle parole insieme al tuo bambino! Su questa pagina, pensata per la scuola dell'infanzia, ci sono immagini di {N_PL} di ogni tipo. Scegliete insieme un suono iniziale, magari quello con cui comincia «mela», e poi il piccolo cerca tutte le figure che partono con lo stesso suono e le cerchia. Non deve far altro che ascoltare: con cosa comincia il nome di questa immagine? È lo stesso suono che abbiamo scelto, oppure no? Questo ascolto attento rafforza la consapevolezza fonologica, una calma abilità di base che alla scuola tornerà preziosa per imparare a leggere. Niente cronometro scandisce il tempo: si procede con tranquillità. Accompagnalo con domande leggere, come comincia questa parola, senti lo stesso suono dell'inizio, e lasciagli lo spazio per pensarci. Riconoscere il suono iniziale rafforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di un suono ritrovato.`,

  // 4 — skill-statement opening
  `Ascoltare l'inizio delle parole, senza contare nulla: ecco l'abilità gentile che questa scheda della scuola dell'infanzia mette in gioco. Sulla pagina si affollano immagini di vario genere; voi scegliete un suono iniziale e il bambino cerchia tutte le figure il cui nome comincia con quel suono. È un esercizio per l'orecchio e per l'attenzione: per scegliere bene, deve dire piano il nome di ogni immagine e cogliere come parte. Niente tempi da battere, conta il piacere di ascoltare. Sostienilo pronunciando insieme a lui il suono iniziale, allungandolo con dolcezza. Lascialo esplorare la pagina seguendo il proprio passo. Se non riconosce subito un suono, riprova con tranquillità, senza che nessuno lo metta fretta. Ogni immagine cerchiata al punto giusto rafforza la consapevolezza fonologica e la fiducia in se stesso. Vissuta a quattro mani, con tempi distesi e parole gentili, questa attività diventa un momento prezioso in cui il bambino impara ascoltando, una parola alla volta.`,

  // 5 — quote opening
  `«Senti? "Pera" comincia come "palla"!» Capita spesso di sentire frasi così, mentre il bambino gioca con questa scheda della scuola dell'infanzia. Guardando le immagini di {N_PL}, voi scegliete insieme un suono iniziale e lui cerca le figure il cui nome parte proprio con quel suono, cerchiandole una a una. Non si conta, si ascolta: il nome di questa immagine comincia con il suono giusto, oppure no? Questo ascoltare invece di contare è un'abilità di base molto utile, e rende i bambini sicuri nel riconoscere come iniziano le parole. Le immagini sono mescolate apposta, perché la ricerca resti una piccola avventura. Incoraggialo a pronunciare ogni nome ad alta voce e a sentire bene la prima parte. Se sbaglia, ne ascolta un'altra con serenità, senza fretta. Ogni parola che inizia con quel suono è una piccola gioia da festeggiare, in un clima caldo e paziente da vivere fianco a fianco.`,

  // 6 — "Immagina…" scene opening
  `Immagina un treno di parole, e ogni vagone parte con il suo primo suono. È questa l'atmosfera della scheda, pensata per la scuola dell'infanzia. Il bambino vi trova tante immagini di {N_PL}, e insieme scegliete un suono iniziale da cui partire. Il piccolo dice piano il nome di ciascuna figura, ascolta come comincia e cerchia quelle che iniziano con quel suono. Qui non c'è niente da contare, solo da ascoltare con quali suoni si aprono le parole. Tendere l'orecchio all'inizio di ogni nome allena l'attenzione e la consapevolezza fonologica, un'abilità che alla scuola conterà quando si tratterà di imparare a leggere. Invitalo a pronunciare prima il suono che cercate, poi a cercare le figure che partono allo stesso modo. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo. Quando trova una parola che comincia con il suono giusto, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — reassurance-first opening
  `Qui non c'è nulla da sbagliare davvero: si ascolta, si pronuncia e ci si diverte. Questa scheda della scuola dell'infanzia accoglie il bambino con tante immagini di {N_PL}. Insieme scegliete un suono iniziale, e il piccolo cerca le figure il cui nome comincia proprio con quel suono, cerchiandole con calma. Non deve contare niente: gli basta dire il nome di ogni immagine e ascoltare la sua prima parte. Questo ascolto paziente è una vera abilità di base, perché allena l'orecchio a cogliere come iniziano le parole, utile più avanti nel leggere e nello scrivere. Niente gara né punteggio, soltanto la curiosità e la voglia di provare. Stimolalo a procedere con ordine, una figura dopo l'altra, così nessuna parola gli sfugge. Se cambia idea, può ascoltarne un'altra con tranquillità. Riconoscere i suoni iniziali è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 8 — sensory/playful opening
  `Orecchie aperte, si parte a caccia di suoni! Su questa pagina, pensata per la scuola dell'infanzia, le immagini di {N_PL} sono sparpagliate qua e là, allegramente confuse. Voi scegliete un suono iniziale e il bambino spulcia la scheda per trovare le figure il cui nome comincia proprio così, cerchiandole man mano. Pronuncia ogni nome a fior di labbra e tende l'orecchio alla prima parte, invece di tirare a indovinare: questa parola parte con il suono giusto, oppure no? Questa quieta concentrazione sull'ascolto è una preziosa abilità di base che prepara alla scuola e affina l'orecchio e la pazienza. Non c'è alcuna fretta, solo il gusto di ascoltare bene. Stimolalo a dire ogni nome a voce alta e a festeggiare ogni parola che inizia con il suono cercato. Se un nome lo trae in inganno, riparte con calma. In un clima gentile e disteso, l'attività si fa momento prezioso di scoperta, da vivere insieme con dolcezza.`,
];

const P2_LS = [
  // 1 — question
  `«Con quale suono comincia?» Da questa domanda parte il gioco. Scegliete insieme un suono iniziale e il bambino cerca, tra le figure, quelle il cui nome parte proprio così, cerchiandole. Dice piano ogni nome e ascolta la sua prima parte. È un'attività tutta di orecchio, senza voti e senza fretta, da gustare al proprio ritmo; ogni parola che comincia con il suono giusto merita un sorriso.`,

  // 2 — invitation/parent-tip
  `Prepara un momento tranquillo al tavolo e ascoltate insieme la scheda con {N_PL}. Scegliete un suono iniziale e invita il piccolo a cerchiare le figure il cui nome comincia proprio con quel suono. Niente orologi e niente corsa; basta dire ad alta voce ogni nome e tendere l'orecchio all'inizio. Un sorriso caldo motiva i piccoli ascoltatori più di ogni altra cosa.`,

  // 3 — metaphor
  `Ogni parola ha un piccolo cancello da cui entra, il suo primo suono. Il bambino guarda {GEN_ART} {GEN}, dice piano ciascun nome e cerchia le figure che cominciano con il suono scelto. È un dolce esercizio di ascolto, mai di conteggio: lasciagli tutto il tempo che serve e festeggiate insieme ogni parola che parte con il suono giusto, in tutta serenità.`,

  // 4 — reassurance
  `Su questa pagina il piccolo trova tante immagini di {N_PL}. Scegliete insieme un suono iniziale e, con calma, lui cerchia le figure il cui nome comincia con quel suono, allenando la consapevolezza fonologica e la pazienza. È un momento di ascolto perfetto da vivere fianco a fianco: lascialo procedere al suo ritmo, accompagnalo con domande leggere e proseguite senza alcuna pressione.`,

  // 5 — skill-statement
  `Ascoltare l'inizio delle parole, non i numeri: il bambino dice piano il nome di ogni figura e cerchia quelle che cominciano con il suono scelto. Niente gara e niente cronometro, soltanto l'orecchio curioso e la gioia di un suono iniziale riconosciuto. Suggeriscigli di pronunciare ogni nome a voce alta, allungando dolcemente la prima parte, così nessuna parola gli sfugge.`,

  // 6 — "trick"/parent-tip
  `Se il piccolo è incerto, pronunciate insieme il suono che cercate e poi dite il nome di una figura allungando bene l'inizio: «sssole, sssedia». Così sentirà subito se i due suoni si somigliano e potrà cerchiare la figura giusta. Questo piccolo aiuto rende l'ascolto concreto e rafforza il suo orecchio attento, in tutta calma e senza contare nulla.`,

  // 7 — quote/celebration
  `«Senti, comincia come la mia parola!» è l'esclamazione che renderà felice il vostro momento insieme. Tra le immagini di {N_PL}, il bambino ascolta come inizia ogni nome e cerchia le figure che partono con il suono scelto. Loda l'impegno e non la velocità, così ascoltare resta un piacere e non una prova: è un gioco di orecchio, mai di numeri, e ogni parola riconosciuta è una piccola conquista da assaporare con dolcezza.`,
];

const H1 = {
  'letter-spotting': 'Trova le lettere iniziali con {H1} – per la scuola dell\'infanzia',
};
const CAR = {
  'letter-spotting': 'Suoni iniziali – ',
};

module.exports = {
  type: 'find-and-count',
  eyebrow: 'Scheda: Suoni iniziali',
  strand: 'Consapevolezza fonologica',
  level: 'infanzia',
  slotWord: 'suoni-iniziali',
  h1: (mk) => H1[mk] || H1['letter-spotting'],
  carousel: (mk, themeH1) => (CAR[mk] || 'Suoni iniziali – ') + themeH1,
  modes: {
    'letter-spotting': { SKEL: SKEL_LS, P2: P2_LS },
  },
  P3: `Se il bambino si è divertito ad ascoltare i suoni delle parole, può continuare con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli di ascolto e osservazione, perfetti per affinare l'orecchio attento mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di ascoltare e scoprire con quale suono comincia ogni parola.`,
};
