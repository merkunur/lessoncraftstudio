/* it-readiness-prepositions — Italian prose config for the prepositions fan.
 * TWO modes, MODE-AWARE (the math-puzzle per-mode-function model):
 *   'fillin' (classe-prima, L.K.1.e, strand 'Riflessione linguistica') — the child
 *      looks at a scene, sees where something is, and WRITES the preposition
 *      (su / sotto / accanto / in / dietro / davanti) into a blank: reading + writing
 *      the function word.
 *   'multiplechoice' (infanzia, NO standard, strand 'Concetti spaziali') — the child
 *      looks at a scene and PICKS (taps) the correct spatial relation by eye; no
 *      reading, no writing: pure spatial-concept recognition.
 * Per-coordinate co.level (set in the coords file: fillin→classe-prima,
 *   mc→infanzia); cfg.level is the classe-prima default. cfg.standard/cfg.strand are
 *   mode-aware functions (the generator's standard-guard skips a null standard, so mc
 *   gets the dashed no-standard chip). The two prepositions are written as literal
 *   words in the prose, never placeholder-ized.
 * §22.1: fillin (Riflessione linguistica, write the word) vs mc (Concetti spaziali,
 *   pick by eye) are distinct strands + mode-true mechanics. mc (spatial) shares
 *   territory with picture-path's 'Orientamento spaziale' but the mechanic differs
 *   (recognize a position relation vs trace a maze path) — lexicons stay distinct.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le immagini/cose" = {GEN_ART} {GEN}; any verb agreeing with
 *   {GEN} is PLURAL; "di/a/su/in/da + collective" via {DI_GEN} etc. */
'use strict';

const SKEL_FILLIN = [
  `Con questo esercizio a completamento il bambino della classe prima legge e scrive da solo la preposizione giusta. In ogni immagine qualcosa si trova in una posizione precisa: a volte su, a volte sotto, a volte accanto. Il piccolo guarda con attenzione la scena con {GEN_ART} {GEN}, capisce dove si trova l'oggetto e poi scrive nello spazio vuoto la parola giusta: su, sotto, accanto, in, dietro o davanti. Così, da un'immagine osservata, nasce una piccola parola scritta, lettera dopo lettera. Questo allena insieme il guardare con cura e lo scrivere le preposizioni. Non c'è cronometro e non c'è punteggio: il bambino può riflettere con calma, dire la parola sottovoce e poi scriverla con attenzione nello spazio. Se sbaglia, può cancellare e riprovare con serenità. Stampa la pagina, prendi una matita morbida e accompagna il piccolo mentre trasforma in parole ciò che osserva nell'immagine.`,

  `Qui si leggono e si scrivono le piccole parole che dicono dove si trovano le cose: su, sotto, accanto, in. Il bambino osserva la scena con le immagini di {N_PL}, riconosce dove si trova un oggetto e scrive la preposizione giusta nello spazio vuoto. La palla è su o sotto qualcosa? Il gatto è accanto o dietro? Proprio questa posizione il piccolo la riconosce e la fissa per iscritto. Poiché la parola va scritta per intero, il bambino presta attenzione da solo a ogni lettera. Così il capire lo spazio e lo scrivere si uniscono in modo naturale e vicino alla vita di tutti i giorni. È un esercizio di riflessione linguistica adatto alla classe prima, che invita a osservare e a mettere in parole. Lascia che il bambino scelga il proprio ritmo: la comprensione cresce quando si lavora con calma, senza alcuna fretta.`,

  `Guarda, dì, scrivi: così funziona questo esercizio a completamento sulle preposizioni. Il bambino vede un'immagine con {GEN_ART} {GEN}, riflette su dove si trova qualcosa e scrive la parola giusta nello spazio vuoto. Che sia su, sotto, accanto o in, ogni preposizione descrive una posizione diversa, e il piccolo la riconosce e la scrive. Mentre lo fa, esercita non solo l'osservare dove si trovano le cose, ma anche lo scrivere con cura la parola. È proprio questo scrivere da sé a rendere l'esercizio una vera attività di scrittura per la classe prima. Non ci sono tempi da rispettare né voti da temere: conta solo il pensare con attenzione e lo scrivere con gioia. Se una lettera è difficile, basta ripetere la parola con calma. Prenditi il tempo e lascia che il bambino completi ogni spazio al suo passo, con tranquillità e con il sorriso.`,

  `Questo esercizio a completamento porta la scrittura delle preposizioni dentro un piccolo gioco di osservazione. Nelle immagini gli oggetti si trovano in posizioni diverse intorno {A_GEN}, e il bambino descrive ogni posizione con la parola giusta. Dove si trova la cosa: su, sotto, accanto o davanti? Il piccolo lo riconosce, si dice la parola sottovoce e poi la scrive lettera per lettera nello spazio vuoto. Così l'osservazione dello spazio diventa parola scritta. Poiché ogni spazio richiede una parola intera, il bambino allena la scrittura quasi senza accorgersene. Può cancellare e ripensare quante volte vuole: alla fine, in ogni spazio comparirà la preposizione giusta. Non c'è alcuna pressione, solo la bella soddisfazione di aver scritto da sé la parola che descrive la posizione. Stampa la scheda e vivi con tuo figlio questo sereno momento di osservazione e scrittura.`,

  `Leggere, riconoscere, scrivere: con questa scheda il bambino completa gli spazi con la preposizione giusta, tutto da solo. Osserva le immagini di {N_PL}, controlla dove si trova qualcosa e descrive la posizione con la parola corretta. Su un ripiano o sotto un tavolo? Accanto a una porta o in una scatola? Il piccolo decide e scrive con cura la parola nello spazio vuoto. Così impara a tradurre in parole scritte le posizioni che vede, un bell'esercizio di riflessione linguistica e di prima scrittura per la classe prima. Senza fretta e senza gara, il bambino può guardare con calma, riflettere e scrivere al suo ritmo. Ogni parola completata gli dà sicurezza e gli mostra quanto sa già fare. Stampa la pagina e accompagna tuo figlio mentre mette in parole, una posizione dopo l'altra, ciò che osserva con attenzione.`,

  `Qui il bambino trasforma in parole scritte ciò che vede. In ogni immagine qualcosa si trova in una posizione precisa accanto {A_GEN}, e il piccolo descrive questa posizione con la preposizione giusta. Guarda, riconosce dove si trova l'oggetto e scrive su, sotto, accanto o in nello spazio vuoto. È proprio questo scrivere consapevole a fissare le piccole parole che nella lingua si usano di continuo. Allo stesso tempo, l'immagine educa lo sguardo a cogliere le relazioni nello spazio. Lascia che il bambino rifletta e scriva con comodo: qui non si vince nulla, se non la soddisfazione di aver completato ogni spazio con la parola giusta. Non c'è cronometro e non c'è punteggio. Stampa la scheda, prendi una matita morbida e regala a tuo figlio un momento sereno di osservazione e scrittura, una preposizione alla volta.`,

  `Quale parola va nello spazio: su, sotto o accanto? Con questo esercizio a completamento il bambino decide da solo e scrive la preposizione giusta. Osserva la scena con le immagini di {N_PL}, riconosce dove si trova qualcosa e poi scrive la parola, lettera per lettera, nello spazio vuoto. Così esercita insieme il leggere e lo scrivere le preposizioni. Poiché la parola va davvero scritta, il bambino impara bene la sua forma e la sua ortografia. È un esercizio pensato per la classe prima, quando i bambini cominciano a mettere per iscritto la lingua che parlano. Prenditi il tempo: ogni parola scritta correttamente è un piccolo, bel traguardo. Lascia che il piccolo scelga il proprio ritmo, cancelli quando vuole e provi di nuovo con serenità, senza alcuna fretta e senza voti.`,

  `Un'immagine, uno spazio vuoto, la parola giusta: così, semplice, comincia questo esercizio sulle preposizioni. Il bambino guarda le immagini di {N_PL}, riconosce dove si trova qualcosa e scrive da solo la preposizione nello spazio. La mela è su qualcosa, la sedia è accanto a qualcosa, la chiave è in qualcosa? Il piccolo descrive la posizione e la fissa per iscritto. Questo scrivere allena insieme il vocabolario, l'ortografia e la comprensione delle relazioni nello spazio. Lascia che il bambino legga, rifletta e scriva al proprio ritmo, in tutta tranquillità. Il momento più bello è quando in ogni spazio compare la preposizione giusta, scritta con le sue mani. Stampa la pagina e accompagna tuo figlio in questo sereno passo verso la scrittura, dove ogni parola dice dove si trovano le cose.`,
];

const P2_FILLIN = [
  `Con questo esercizio a completamento il bambino legge e scrive da solo la preposizione giusta. Guarda le immagini di {N_PL}, riconosce dove si trova qualcosa e scrive su, sotto, accanto o in nello spazio vuoto. Così allena insieme lo scrivere e il capire lo spazio. Lascialo riflettere e scrivere al suo ritmo: niente cronometro e niente punteggio, solo la gioia di ogni spazio completato con la parola giusta.`,

  `Guarda, dì, scrivi: il bambino osserva {GEN_ART} {GEN}, riconosce la posizione e scrive la preposizione giusta nello spazio. Che sia su, sotto o accanto, ogni parola descrive un posto diverso. Poiché la scrive da sé, esercita il vocabolario e l'ortografia insieme. È un bell'esercizio di scrittura per la classe prima, senza fretta e in tutta calma.`,

  `Qui il bambino trasforma in parole ciò che vede. Riconosce dove si trova qualcosa intorno {A_GEN} e scrive la preposizione giusta nello spazio vuoto. In una scatola, su un tavolo, accanto a una porta: il piccolo descrive la posizione e la fissa per iscritto. Così impara bene le piccole parole, lettera dopo lettera. Prenditi il tempo: ogni parola giusta conta.`,

  `Quale preposizione va qui? Il bambino guarda le immagini di {N_PL}, controlla dove si trova qualcosa e scrive su, sotto o accanto nello spazio vuoto. È proprio questo scrivere da sé a rendere la scheda una vera attività della classe prima. Conta ogni lettera, e il piccolo può cancellare e ripensare tutte le volte che vuole.`,

  `Leggere, riconoscere, scrivere: il bambino osserva le immagini di {N_PL}, descrive la posizione e scrive la preposizione giusta. Così impara a tradurre in parole scritte ciò che vede. Poiché ogni spazio richiede una parola intera, presta attenzione da solo all'ortografia. È un sereno esercizio di scrittura, senza tempi da battere e senza gara.`,

  `Un'immagine, uno spazio, la parola giusta: il bambino riconosce dove si trova qualcosa e scrive da solo la preposizione. Su, sotto, accanto o in: la parola compare lettera per lettera nello spazio. Così crescono il vocabolario e l'ortografia mentre lavora. Lascia che il piccolo rifletta e scriva con calma, finché ogni spazio è completato.`,

  `Con questa scheda il bambino guarda con attenzione: dove si trovano le cose intorno {A_GEN}? Poi scrive la preposizione giusta nello spazio vuoto. Poiché la parola va davvero scritta, se la imprime bene. Così il capire lo spazio e lo scrivere si uniscono in modo naturale. Il momento più bello è quando in ogni spazio compare la parola giusta.`,
];

const SKEL_MC = [
  `«Dov'è finita la palla?» Da una domanda così leggera comincia questo gioco di immagini per la scuola dell'infanzia. Il bambino guarda la scena, nota dove si trova l'oggetto e indica con un dito la posizione giusta: su, sotto o accanto? Non deve leggere né scrivere nulla, gli basta osservare e scegliere. In questo modo i concetti spaziali su, sotto, accanto e in prendono forma davanti ai suoi occhi, molto prima che arrivino le lettere. È un'abilità di base che un giorno renderà più semplice imparare a leggere e a scrivere. Qui non si conta e non si misura il tempo: niente fretta, niente cronometro, solo lo sguardo curioso del piccolo. Suggeriscigli di raccontare ad alta voce ciò che vede e, se indica un posto che non va, accoglietelo con un sorriso e riprovate insieme con dolcezza.`,

  `Immagina una stanza piena di sorprese: in ogni scena di questo gioco di immagini qualcosa si nasconde in un posto preciso. Il bambino della scuola dell'infanzia osserva con attenzione le immagini di {N_PL} e capisce subito dove si trova l'oggetto. Dov'è: sopra, sotto o accanto? Invece di scrivere una parola, tocca semplicemente la figura corretta tra quelle proposte. Così riconosce i concetti spaziali senza ancora saper leggere, allenando un pensiero che più avanti accompagnerà la scrittura delle preposizioni. Le scene chiedono occhi attenti, non mani veloci: il piccolo può guardare e riguardare al proprio ritmo, perché la comprensione nasce dalla calma e non dalla corsa. Accompagnalo con domande gentili e festeggiate ogni posizione scoperta, in un clima sereno e affettuoso che gli dà fiducia.`,

  `Per il bambino della scuola dell'infanzia questo è un piccolo allenamento dello sguardo: imparare a notare dove si trovano le cose. In ogni immagine l'oggetto occupa un posto diverso, e il piccolo lo riconosce con un colpo d'occhio. L'uccellino è su, sotto o accanto? Lui osserva e tocca la risposta, senza una sola lettera da scrivere. Così esercita i concetti spaziali su, sotto, accanto e in soltanto con gli occhi, scoprendo che ogni cosa ha un suo posto rispetto alle altre. È una preparazione delicata alle preposizioni che più avanti leggerà e scriverà a scuola. Nessun cronometro scandisce il gioco: si procede con tutta calma. Stimolalo a indicare l'oggetto e a dire dov'è, e lasciagli lo spazio per pensarci senza alcuna pressione.`,

  `Niente paura degli errori: in questo gioco di immagini ogni tentativo è un piccolo passo, mai uno sbaglio da temere. Il bambino guarda una scena intorno {A_GEN} e si chiede dove si trovi l'oggetto, poi sceglie toccando la figura giusta. Poiché qui non si legge e non si scrive, l'attività è adatta già ai più piccoli della scuola dell'infanzia. Capiscono la posizione con gli occhi e, quasi senza accorgersene, fanno crescere il pensiero spaziale che un domani aiuterà a leggere e a scrivere le preposizioni. Lascia che il piccolo osservi con comodo e decida al proprio ritmo: qui non si vince nulla, se non il piacere di scoprire dov'è ogni cosa. Vissuta accanto a una voce dolce e con tempi distesi, la scheda diventa un caldo momento da gustare insieme, con tanta gentilezza.`,

  `Osservare bene è già imparare: ecco l'idea di questa scheda per la scuola dell'infanzia. Il bambino guarda la scena con le immagini di {N_PL}, individua dove si trova qualcosa e tocca la risposta giusta, senza dover leggere o scrivere una sola parola. In modo del tutto giocoso esercita i concetti spaziali con gli occhi, scoprendo che un oggetto può stare su, sotto o accanto a un altro. Questo guardare e scegliere è una vera abilità di base, che prepara alle preposizioni dei primi anni di scuola. Prenditi il tempo, perché qui conta l'attenzione e non la velocità: se il piccolo è incerto, può guardare di nuovo con tutta calma. Ogni posizione riconosciuta è una conquista che rafforza la sua sicurezza ed è un dolce invito a stare vicini e a scoprire insieme.`,

  `Un consiglio per cominciare: sedetevi accanto e descrivete insieme la scena, prima ancora di scegliere. In ogni immagine di questo gioco qualcosa si trova in un punto preciso accanto {A_GEN}, e il bambino della scuola dell'infanzia riconosce se è su, sotto o accanto a qualcosa. Invece di scrivere la parola, indica la figura giusta tra quelle proposte. Così comprende le posizioni molto prima di saperle leggere, allenando il pensiero spaziale in un'attività pensata su misura per i più piccoli: niente scrittura, niente numeri, nessuna pressione. Lascia che osservi con calma e tocchi la sua risposta. Ogni scelta azzeccata è un piccolo passo verso la futura lettura. Guidalo con domande dolci, vicino a che cosa si trova, e regalagli tutto il tempo che gli serve, in un clima sereno e affettuoso.`,

  `Scegliere con gli occhi: è questa l'abilità che il bambino mette in gioco. Osserva {GEN_ART} {GEN} e decide qual è la posizione corretta, su, sotto o accanto, poi tocca semplicemente l'immagine giusta senza leggere e senza scrivere. Riconoscere dove si trova un oggetto rispetto agli altri è una capacità di base importante per la scuola, e questo gioco la allena con leggerezza. Poiché non c'è nulla da scrivere, è adatto già alla scuola dell'infanzia. Lascia che il piccolo guardi al proprio ritmo, rifletta e scelga senza alcuna gara: davanti a una risposta che non va, basta un sorriso e un nuovo tentativo. Quando riconosce da solo la posizione giusta, la sua fiducia cresce un poco, in un'atmosfera sempre calma e gentile in cui ogni scoperta è festeggiata.`,

  `C'è un momento speciale, in questo gioco di immagini, ed è quando il bambino capisce da sé dove si trova ogni cosa. Vede una scena con le immagini di {N_PL} e si domanda dove sia l'oggetto: su, sotto o accanto? Poi tocca la figura giusta, riconoscendo invece di scrivere. In questo modo esercita i concetti spaziali soltanto con gli occhi, senza una sola lettera. È una meravigliosa preparazione alle preposizioni che più avanti incontrerà sulla carta, perfetta per la scuola dell'infanzia: nessun numero, nessuna scrittura, solo guardare e capire. Lascia che il piccolo osservi con comodo e scelga con tranquillità, senza gara né punteggio. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna fretta, questa scheda diventa un caldo momento di gioco da condividere.`,
];

const P2_MC = [
  `«Dov'è la palla?» Il bambino guarda la scena e indica: è su, sotto o accanto? Niente da leggere, niente da scrivere, solo da osservare e scegliere. Così i concetti spaziali prendono forma sotto i suoi occhi, un'abilità di base preziosa. Niente fretta e niente cronometro: solo guardare, capire e toccare la risposta.`,

  `Immagina una scena piena di sorprese: il bambino osserva le immagini di {N_PL} e nota dove si trova qualcosa. Sopra, sotto o accanto? Tocca la figura giusta, senza scrivere una parola. Adatto già alla scuola dell'infanzia, gli fa capire le preposizioni con gli occhi, molto prima di saperle leggere. Una dolce preparazione alla futura lettura.`,

  `Un piccolo allenamento dello sguardo: il bambino vede dove si trova qualcosa intorno {A_GEN} e indica la posizione giusta. Senza lettere, riconosce i concetti spaziali su, sotto, accanto e in. Ogni oggetto ha un suo posto rispetto agli altri, e lui lo scopre con calma. Prenditi il tempo: qui conta solo l'osservare con attenzione.`,

  `Niente paura degli errori: il bambino osserva le immagini di {N_PL} e decide dov'è l'oggetto, su, sotto o accanto? Invece di scrivere, sceglie semplicemente la figura corretta. Così esercita una vera abilità di base in vista delle preposizioni. Proprio quel che serve alla scuola dell'infanzia: nessuna pressione, solo guardare e capire al proprio passo.`,

  `Osservare bene è già imparare: il bambino riconosce se qualcosa è su, sotto o accanto e tocca la risposta giusta. Poiché non si legge e non si scrive, il gioco è adatto già ai più piccoli. Così cresce il pensiero spaziale, che un domani aiuterà a leggere le preposizioni. In tutta calma e senza punteggi né gare.`,

  `Sedetevi accanto e descrivete insieme la scena: il bambino guarda le immagini di {N_PL}, vede dove si trova qualcosa e sceglie la posizione giusta. Su, sotto o accanto: con un tocco la risposta è data. Così esercita le preposizioni con gli occhi, come preparazione alla scuola. Lascialo guardare e decidere con comodo, al proprio ritmo, senza alcuna fretta.`,

  `Scegliere con gli occhi: dov'è l'oggetto intorno {A_GEN}? Il bambino nota la posizione e tocca l'immagine giusta, senza leggere. Così allena in modo giocoso i concetti spaziali su, sotto, accanto e in. Questa abilità di base prepara con dolcezza alle preposizioni. Ogni posizione riconosciuta è un piccolo, bel passo avanti, da festeggiare insieme.`,
];

const H1 = {
  'fillin': 'Scrivi le preposizioni con {H1} – per la classe prima',
  'multiplechoice': 'Preposizioni: su, sotto, in con {H1} – per la scuola dell\'infanzia',
};
const CAR = {
  'fillin': 'Scrivi le preposizioni – ',
  'multiplechoice': 'Preposizioni: su, sotto, in – ',
};
const P3 = {
  'fillin': `Se a tuo figlio piace scrivere le piccole parole che dicono dove si trovano le cose, prova anche le altre schede con {nb1} o con {nb2}. Nella nostra raccolta trovi tante altre schede di preposizioni con {GEN_ART} {GEN}, gratuite e pronte da stampare oppure da giocare online. Scegli il tema che ama di più e regalagli un sereno momento di osservazione e scrittura, senza fretta e senza punteggi.`,
  'multiplechoice': `Se a tuo figlio piace scoprire dove si trovano le cose, prova anche le altre schede con {nb1} o con {nb2}. Nella nostra raccolta trovi tanti altri giochi di posizioni con {GEN_ART} {GEN}, gratuiti e pronti da stampare oppure da giocare online. Scegli il tema che ama di più e vivete insieme un dolce momento di osservazione, soltanto guardando e scegliendo, senza fretta e senza punteggi.`,
};

module.exports = {
  type: 'prepositions',
  eyebrow: 'Scheda: Preposizioni',
  level: 'classe-prima',
  slotWord: 'preposizioni',
  standard: (mk) => (mk === 'fillin' ? 'L.K.1.e' : null),
  strand: (mk) => (mk === 'fillin' ? 'Riflessione linguistica' : 'Concetti spaziali'),
  h1: (mk) => H1[mk] || H1['fillin'],
  carousel: (mk, themeH1) => (CAR[mk] || CAR['fillin']) + themeH1,
  modes: {
    'fillin': { SKEL: SKEL_FILLIN, P2: P2_FILLIN },
    'multiplechoice': { SKEL: SKEL_MC, P2: P2_MC },
  },
  P3: (mk) => P3[mk] || P3['fillin'],
};
