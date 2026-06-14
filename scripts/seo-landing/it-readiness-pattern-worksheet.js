/* it-readiness-pattern-worksheet — Italian prose config for the pattern-worksheet fan.
 * One mode 'null' (readiness, NO standard, level 'infanzia'):
 *   a simple printable worksheet; each ROW shows a repeating pattern that has already
 *   STARTED (the pictures repeat in a simple rhythm); the child recognizes the rhythm
 *   and CONTINUES / completes the row with the next picture(s). NO counting.
 *   This is the generic no-prep printable face — do NOT mention the named
 *   alternating-pattern labels (those belong to the named pattern-train type). Strand:
 *   Riconoscere e continuare gli schemi.
 * Lexicon: schema / motivo / fila / riga / si ripete / ritmo / continuare /
 *   completare / quale viene dopo. Free + printable + no-prep mentioned in moderation.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le cose" = {GEN_ART} {GEN}; any verb/adjective agreeing
 *   with {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc. */
'use strict';

const SKEL_PW = [
  // 1 — skill-statement opening
  `Riconoscere un ritmo e portarlo avanti: ecco la dolce abilità che questa scheda della scuola dell'infanzia mette in gioco. Su ogni riga è già cominciato uno schema fatto di immagini di {N_PL} che si ripetono in un ordine semplice e regolare. Il bambino guarda, coglie il ritmo e completa la fila aggiungendo la figura che viene dopo. Non c'è niente da contare: basta osservare con attenzione come tornano le immagini e capire quale tocca ora. Proprio questo guardare e proseguire è una preziosa abilità di base che prepara alla scuola. Niente fretta, si lavora al proprio ritmo. Suggeriscigli di seguire la riga con il dito e di dire ad alta voce le figure che si ripetono, così il motivo gli salta agli occhi. Se sbaglia la figura, la cambia con leggerezza e prosegue. Il foglio è gratuito, si stampa in un attimo e non richiede alcuna preparazione: davvero pochi minuti e il bambino può completare le righe già avviate, in tutta tranquillità, accanto a un adulto paziente.`,

  // 2 — invitation opening
  `Vieni a continuare gli schemi insieme al tuo bambino! Questa scheda della scuola dell'infanzia mostra, riga dopo riga, motivi fatti di immagini di {N_PL} che si ripetono in un ritmo semplice. Ogni fila è già iniziata, e al piccolo tocca portarla avanti aggiungendo le figure che vengono dopo. Osservando come tornano le immagini, allena l'occhio a cogliere le regolarità, una capacità che alla scuola conterà spesso. Non si conta nulla: si guarda il motivo e lo si completa. Non c'è alcun voto da prendere, soltanto la curiosità che guida lo sguardo. Invitalo a raccontare cosa nota, a indicare le figure che si ripetono e a prevedere quale viene ora. Se prova una figura che non rispetta il ritmo, sorridete insieme e si riprova. Ogni riga completata è una conquista che lo riempie di orgoglio. Il foglio è gratuito e pronto da stampare, senza alcuna preparazione: vivetelo come un sereno momento di scoperta da condividere, una fila alla volta.`,

  // 3 — question opening
  `Quale figura viene dopo? È la domanda che fa sorridere il bambino davanti a questa scheda della scuola dell'infanzia. In ogni riga uno schema è già partito: le immagini di {N_PL} si ripetono seguendo un ritmo facile da cogliere. Il piccolo guarda con attenzione, riconosce il motivo e continua la fila con la figura giusta. Qui non si conta, si osserva soltanto: come torna lo schema, quale immagine arriva ora. Questo riconoscere le regolarità diverte e prepara con dolcezza alla scuola, dove guardare con cura conta molto. Niente cronometro scandisce il tempo: si procede con tranquillità. Accompagnalo con domande leggere, quali figure vedi ripetersi, cosa dovrebbe venire adesso, e lasciagli lo spazio per pensarci. Se cambia idea, può scegliere di nuovo e proseguire sereno. Completare lo schema rafforza l'attenzione e la fiducia in sé. È un foglio gratuito e immediato da stampare, un invito semplice a stare vicini e a gustare insieme la gioia di una fila portata a termine.`,

  // 4 — metaphor opening
  `Immagina una piccola canzone fatta di figure invece che di note: torna sempre uguale, con lo stesso ritmo. È così che si comporta lo schema di questa scheda della scuola dell'infanzia. Guardando {GEN_ART} {GEN}, il bambino scopre che in ogni riga un motivo si ripete in modo regolare, e che a lui tocca proseguirlo. Il compito è dolce, riconoscere la melodia delle immagini e completare la fila con la figura che viene dopo. Concentrandosi sul ritmo, il piccolo allena l'occhio a cogliere le regolarità, senza contare nulla. Non c'è alcuna gara, soltanto il piacere di osservare. Invitalo a canticchiare a voce le figure che tornano, così il motivo si fa più chiaro. Se sbaglia il proseguimento, niente paura: si corregge con il sorriso. Ogni schema completato è una piccola conquista. Il foglio è gratuito e pronto in un istante da stampare, perfetto per un momento sereno da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first opening
  `Qui non c'è proprio nulla da temere: si guarda un motivo e lo si porta avanti, con calma e con piacere. Su questa scheda della scuola dell'infanzia, ogni riga mostra uno schema già avviato, fatto di immagini di {N_PL} che si ripetono in un ritmo semplice. Il bambino osserva il motivo, ne coglie la regolarità e completa la fila con la figura giusta. Non deve contare niente, gli basta riconoscere come torna il motivo. Questo guardare attento è una vera abilità di base, perché allena l'occhio a cogliere le regolarità, utile più avanti nel leggere e nello scrivere. Niente gara né punteggio, soltanto lo sguardo curioso e la voglia di provare. Stimolalo a seguire la riga con il dito e a indicare le figure che si ripetono, così il proseguimento diventa chiaro. Se cambia idea, può correggere con tranquillità. Il foglio è gratuito e si stampa subito, senza preparazione: completare gli schemi è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — "Immagina…" scene opening
  `Immagina una fila di vagoni decorati che si susseguono sempre nello stesso ordine: appena ne vedi qualcuno, indovini cosa arriva dopo. Questa scheda della scuola dell'infanzia funziona così, ma con motivi di figure. Su ogni riga le immagini di {N_PL} si ripetono in un ritmo semplice, e il bambino prosegue la fila aggiungendo la figura che manca. Tutto sta nel guardare come torna lo schema e nel continuarlo, una calma abilità che alla scuola conterà presto. Qui non si conta niente, si riconosce soltanto il motivo. Le righe sono già iniziate apposta, così il piccolo deve solo portarle a termine. Invitalo a leggere la fila a voce, figura dopo figura, finché capisce quale viene ora. Davanti a uno sbaglio, basta un sorriso e un nuovo tentativo. È un foglio gratuito e immediato da stampare: quando completa lo schema, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — no-prep / parent-pragmatic opening
  `Cerchi qualcosa di semplice e pronto all'uso per un momento tranquillo? Questo foglio gratuito di schemi è proprio quello che fa per voi: si stampa subito e non richiede alcuna preparazione. Mostra, riga dopo riga, motivi di immagini di {N_PL} che si ripetono in un ritmo facile. Ogni fila è già cominciata, e il bambino la completa aggiungendo la figura che viene dopo. Non c'è niente da contare: si guarda come torna lo schema e si prosegue. Questo riconoscere le regolarità è una preziosa abilità di base per il futuro apprendimento. Niente cronometro, niente voti, soltanto il gusto di osservare. Accompagnalo con domande leggere e lascialo lavorare al proprio passo. Se una figura non rispetta il ritmo, ne sceglie un'altra con serenità. Si può stampare oppure completare al computer, come vi è più comodo: in pochi minuti il piccolo ha una bella occupazione calma e piena di senso, da vivere insieme con dolcezza.`,

  // 8 — classic-worksheet opening
  `Un classico tra i fogli da completare, sempre amato e sempre utile: ecco questa scheda di schemi per la scuola dell'infanzia. Su ogni riga un motivo è già stato avviato, con immagini di {N_PL} che si ripetono in un ordine regolare. Il bambino guarda, riconosce il principio e porta avanti la fila fino in fondo, aggiungendo le figure che vengono dopo. Non servono numeri né conteggi: conta solo il guardare attento e il proseguire. Questa capacità di cogliere le regolarità rafforza la concentrazione, una bella preparazione alla scuola. Niente fretta scandisce il lavoro: si procede con calma. Stimolalo a seguire la riga con il dito, a nominare le figure che tornano e a indovinare quale arriva ora. Se sbaglia un posto, lo cambia con leggerezza e riparte. Il foglio è gratuito e si stampa in un attimo: completare gli schemi diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_PW = [
  // 1 — skill-statement
  `In ogni riga uno schema è già cominciato: le immagini si ripetono in un ritmo semplice e il bambino completa la fila con la figura che viene dopo. Coglie il motivo guardando, senza contare nulla, e porta avanti la riga. Questo riconoscere le regolarità è una preziosa abilità di base; il foglio è gratuito e pronto da stampare, da gustare al proprio ritmo, senza fretta e senza voti.`,

  // 2 — question
  `Quale figura viene dopo? Da questa domanda parte il gioco. Guardando le immagini di {N_PL}, il piccolo riconosce il ritmo dello schema in ogni riga e prosegue la fila con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili e tutto il tempo che serve; se una figura non rispetta il motivo, se ne prova un'altra con il sorriso.`,

  // 3 — invitation/parent-tip
  `Continua lo schema insieme al tuo bambino: in ogni riga un motivo si ripete, e lui aggiunge la figura che manca. Suggeriscigli di seguire la fila con il dito e di nominare a voce le immagini che tornano, così capisce quale viene ora. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una riga completata. Il foglio è gratuito e si stampa in un attimo.`,

  // 4 — reassurance
  `Su questa pagina il piccolo trova righe di schemi già avviati con {N_PL}. Con calma riconosce come torna il motivo e completa ogni fila, allenando l'occhio a cogliere le regolarità e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo lavorare al suo ritmo, festeggiate ogni riga portata a termine e proseguite senza alcuna pressione.`,

  // 5 — metaphor
  `Come una piccola canzone fatta di figure, lo schema torna sempre uguale. Guardando {GEN_ART} {GEN}, il bambino coglie la melodia del motivo e prosegue ogni riga con la figura che viene dopo. Senza tempi da battere e senza punteggi, conta soltanto la gioia di guardare e completare; quando la fila è finita, la fiducia in sé cresce un poco, in tutta serenità.`,

  // 6 — no-prep/pragmatic
  `Questo foglio gratuito di schemi è pronto all'uso: si stampa subito, senza alcuna preparazione. Mostra righe di immagini di {N_PL} che si ripetono in un ritmo facile, e il bambino le porta avanti aggiungendo la figura giusta. Non si conta nulla, si guarda soltanto. Accompagnalo con domande leggere e lascialo procedere con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  // 7 — classic/celebration
  `Un classico foglio da completare, semplice e sempre utile: in ogni riga uno schema con {N_PL} aspetta di essere proseguito. Il bambino riconosce il ritmo e aggiunge le figure che vengono dopo, fino in fondo. Loda l'impegno e non la velocità, così continuare gli schemi resta un piacere: un gioco di sguardi, mai di numeri, e ogni riga completata è una piccola conquista da assaporare con dolcezza.`,
];

module.exports = {
  type: 'pattern-worksheet',
  eyebrow: 'Scheda: Continua lo schema',
  strand: 'Riconoscere e continuare gli schemi',
  level: 'infanzia',
  slotWord: 'schemi',
  h1: (mk) => 'Continua lo schema con {H1} – scheda per la scuola dell\'infanzia',
  carousel: (mk, themeH1) => 'Continua lo schema – ' + themeH1,
  modes: {
    'null': { SKEL: SKEL_PW, P2: P2_PW },
  },
  P3: `Se il bambino si è divertito a riconoscere e continuare i motivi, può proseguire con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli di osservazione, perfetti per allenare l'occhio sulle regolarità mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure completare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di guardare quale figura viene dopo e portare a termine la fila.`,
};
