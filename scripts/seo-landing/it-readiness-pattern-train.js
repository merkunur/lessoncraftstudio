/* it-readiness-pattern-train — Italian prose config for the pattern-train fan.
 * FIVE modes (readiness, NO standard, level 'infanzia', strand 'Sequenze e ritmi').
 * Italian native name: "Il treno dei modelli" — a train whose wagons repeat in a
 * pattern; the child reads the rhythm and CONTINUES the sequence with the next
 * picture(s). NO counting. The 5 modes are PATTERN TYPES, each written mode-true:
 *   'null' = AB   — due elementi che si alternano (A B A B A B)
 *   'aab'  = AAB  — due uguali e poi uno diverso (A A B A A B)
 *   'abb'  = ABB  — uno e poi due uguali (A B B A B B)
 *   'aabb' = AABB — due e due (A A B B A A B B)
 *   'abc'  = ABC  — tre diversi in fila (A B C A B C)
 * DISTINCT from the LIVE pattern-worksheet (strand 'Riconoscere e continuare gli
 * schemi', lexicon 'schema'/'fila'/'riga'): this type NEVER uses 'schema' nor that
 * strand; lexicon = modello / sequenza / ritmo / treno / vagone / si ripete /
 * il vagone successivo / continuare il treno / quale viene dopo.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le cose" = {GEN_ART} {GEN}; any verb whose SUBJECT is
 *   {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc. */
'use strict';

/* ---------------------------------------------------------------- AB (null)
 * ANCHOR: botta e risposta / uno e poi l'altro / l'alternanza.
 * IMAGE WORLD: il dondolo, l'altalena, lo scambio di battute, il ping-pong,
 * il «tu e io», il tic-tac. NO filastrocca «tà-tà-tì» (riservata ad AAB). */
const SKEL_AB = [
  // 1 — skill-statement opening
  `Uno e poi l'altro, uno e poi l'altro: è la botta e risposta dei vagoni a far girare questo treno dei modelli alla scuola dell'infanzia. Il ritmo si chiama AB perché due elementi si rincorrono a turno, prima il primo e poi il secondo, come un sereno scambio di battute che non si stanca mai. Su questa scheda il bambino guarda immagini di {N_PL} che si alternano a turno e indovina chi tocca al vagone successivo. Non c'è proprio nulla da contare: serve solo cogliere il botta e risposta e rispondere con la figura giusta. Questo seguire il tu-e-io delle figure è una preziosa abilità di base che prepara con dolcezza alla scuola. Niente fretta: il dondolo va al proprio ritmo. Suggeriscigli di dire «tu, io, tu, io» mentre punta i vagoni, così l'alternanza diventa un giochino orecchiabile. Se sbaglia il turno, lo scambia con leggerezza e tira avanti. Quando il botta e risposta riprende a filare liscio, il sorriso spunta da solo, accanto a un adulto paziente.`,

  // 2 — invitation opening
  `Vieni a giocare a turno con il treno del tuo bambino! Qui i vagoni fanno botta e risposta: uno parla e l'altro risponde, di nuovo il primo e poi il secondo, in un sereno scambio che va avanti per tutta la fila. È il ritmo AB. Sulla scheda spuntano immagini di {N_PL} che si danno il cambio a turno, e al piccolo tocca proseguire dicendo a chi va il vagone che viene ora. Seguire questo tu-e-io allena l'occhio a cogliere chi è di turno, una capacità che alla scuola servirà spesso. Qui non c'è nulla da contare: si segue lo scambio e lo si continua. Nessun voto in arrivo, soltanto la curiosità che fa da guida. Invitalo a fare le voci, una per il primo e una per il secondo, e a prevedere chi risponde adesso. Se un vagone salta il turno, ci si fa una risata e si riprova. Ogni botta e risposta portato a termine è una piccola conquista da vivere come uno scambio allegro e condiviso.`,

  // 3 — question opening
  `A chi tocca adesso? È la domanda che apre il botta e risposta di questo treno dei modelli. Il ritmo AB fa rincorrere due elementi a turno: prima l'uno, poi l'altro, di nuovo l'uno e poi l'altro, come un tu-e-io che si ripete sereno. Le immagini di {N_PL} si danno il cambio in fila, e il piccolo capisce chi è di turno e risponde con la figura giusta. Qui non si conta niente, si ascolta soltanto lo scambio: a chi spetta il vagone successivo. Riconoscere questo turno diverte e prepara con tenerezza alla scuola. Nessun cronometro batte il tempo: si va piano. Stuzzicalo con domandine, chi parla per primo, chi risponde subito dopo, e lasciagli il tempo di pensarci. Se cambia idea, ridà la parola a un'altra figura e prosegue sereno. Portare a termine lo scambio rinforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di un turno chiuso bene.`,

  // 4 — metaphor opening
  `Immagina un'altalena che va avanti e indietro: su, giù, su, giù, sempre a turno. Così dondola questo treno dei modelli a ritmo AB, con due figure che si alternano come lo slancio dell'altalena. Guardando {GEN_ART} {GEN}, il bambino scopre che i vagoni si danno il cambio uno dopo l'altro, e che a lui tocca dare la prossima spinta. Il compito è dolce: cogliere l'andirivieni delle figure e rispondere con il vagone successivo. Seguendo il dondolio del tu-e-io, il piccolo allena l'occhio al ritmo, senza contare nulla. Niente gara, soltanto il piacere di osservare l'altalena. Invitalo ad accompagnare a voce «avanti, indietro, avanti, indietro», così lo scambio si fa limpido. Se sbaglia la spinta, nessun problema: si corregge con il sorriso. Ogni andata-e-ritorno completato è una piccola conquista, perfetta da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first opening
  `Qui c'è solo da stare tranquilli: si guarda un dondolo di figure e gli si dà una spinta, con calma e con gusto. Il ritmo AB è un botta e risposta semplice, una figura e poi l'altra, sempre nello stesso ordine sereno. Su questa scheda il bambino osserva immagini di {N_PL} che si alternano a turno e capisce a chi tocca il vagone successivo. Non deve contare niente: gli basta sentire chi parla e chi risponde. Questo seguire lo scambio è una vera abilità di base, perché allena l'occhio al ritmo, utile più avanti per leggere e per scrivere. Niente gara né punteggio, soltanto lo sguardo curioso e la voglia di provare. Stimolalo a seguire il treno con il dito e a fare le due voci, una per ciascuna figura, così il turno diventa chiaro. Se cambia idea, ridà la parola con tranquillità. Continuare il botta e risposta fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — scene opening
  `Immagina due amici che si lanciano la palla: lancio, rilancio, lancio, rilancio, sempre a turno. Su questa scheda della scuola dell'infanzia il treno dei modelli gioca proprio così, a ritmo AB, con immagini di {N_PL} che si passano il turno una dopo l'altra. Il bambino legge questo scambio e aggiunge il vagone che manca per tenerlo vivo. Tutto sta nel sentire a chi tocca rilanciare e nel rispondere, una calma abilità che alla scuola conterà presto. Qui non si conta nulla, si segue soltanto il botta e risposta. La palla è già in gioco apposta, così al piccolo basta ridarla al momento giusto. Invitalo a dire «a te, a me, a te, a me» finché capisce chi rilancia ora. Davanti a uno sbaglio, basta un sorriso e un nuovo lancio. Quando indovina il turno, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — observe-the-rhythm opening
  `Senti il tic-tac del treno? Su questa scheda della scuola dell'infanzia i vagoni fanno tic, tac, tic, tac: il ritmo AB di due figure che si alternano a turno. Il bambino guarda immagini di {N_PL} che si danno il cambio e prosegue lo scambio con il vagone successivo. Non c'è alcun numero da scrivere: si ascolta come torna il botta e risposta e si tira avanti il treno. Cogliere questo turno è una preziosa abilità di base per gli apprendimenti futuri. Niente cronometro, niente voti, soltanto il gusto di osservare l'andirivieni. Accompagnalo con domandine dolci, chi fa tic e chi fa tac, chi tocca ora, e lascialo andare al proprio passo. Se un vagone manca il turno, ne sceglie un altro con serenità. Ogni tic-tac portato avanti per bene è una piccola gioia da festeggiare, da vivere insieme con dolcezza, un turno dopo l'altro.`,

  // 8 — classic-worksheet opening
  `Un gioco di sempre, semplice e amatissimo: il treno del tu-e-io a ritmo AB, qui pensato per la scuola dell'infanzia. Lo scambio fa rincorrere due figure a turno, prima l'una e poi l'altra, di continuo. Su questa scheda il bambino osserva {GEN_ART} {GEN} e vede i vagoni darsi il cambio, capisce il botta e risposta e tiene vivo il treno con la figura giusta. Niente numeri né conteggi: conta solo il seguire lo scambio e rispondere. Questa capacità di cogliere il turno rinforza la concentrazione, una bella preparazione alla scuola. Nessuna fretta scandisce il lavoro: si va con calma. Stimolalo a seguire il treno con il dito, a fare le due voci che si alternano e a indovinare chi risponde ora. Se sbaglia un turno, lo scambia con leggerezza e riparte. Tenere vivo il botta e risposta diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_AB = [
  `Il treno fa botta e risposta a ritmo AB: due figure che si rincorrono a turno, prima l'una e poi l'altra. Il bambino segue lo scambio e aggiunge il vagone successivo a chi tocca ora. Coglie il tu-e-io osservando, senza contare nulla, e tiene vivo il treno. Questo seguire i turni è una preziosa abilità di base, da gustare al proprio ritmo, senza fretta e senza voti.`,

  `A chi tocca adesso? Da questa domanda parte il gioco. Guardando immagini di {N_PL} che si danno il cambio a turno, il piccolo sente il botta e risposta AB e risponde con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili e tutto il tempo che serve; se un vagone salta il turno, se ne prova un altro con il sorriso.`,

  `Giocate a turno insieme: i vagoni fanno «tu e io», prima l'uno e poi l'altro, e il bambino dà la parola a chi viene ora. Suggeriscigli di fare le voci, «a te, a me, a te, a me», così capisce a chi tocca il vagone successivo. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di un botta e risposta chiuso bene.`,

  `Su questa pagina il piccolo trova un dondolo di figure già avviato con {N_PL}. Con calma sente a chi tocca e prosegue lo scambio, allenando l'occhio al tu-e-io e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo dare le spinte al suo ritmo, festeggiate ogni turno chiuso bene e proseguite senza alcuna pressione.`,

  `Come un'altalena che va avanti e indietro, il ritmo AB alterna due figure a turno. Guardando {GEN_ART} {GEN}, il bambino coglie il dondolio dello scambio e dà la prossima spinta con il vagone successivo. Senza tempi da battere e senza punteggi, conta solo la gioia di osservare e rispondere; quando il botta e risposta torna a filare, la fiducia in sé cresce un poco, in tutta serenità.`,

  `Questo treno fa tic-tac a ritmo AB: due figure si danno il cambio lungo i vagoni. Il bambino osserva immagini di {N_PL} che si alternano e aggiunge la figura a cui tocca il turno. Non si conta nulla, si ascolta soltanto. Accompagnalo con domandine leggere e lascialo andare con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  `Un classico scambio da proseguire, semplice e sempre utile: i vagoni fanno «uno e poi l'altro», e il bambino tiene vivo il tu-e-io con {N_PL}. Sente il turno AB e risponde con il vagone successivo, fino in fondo. Loda l'impegno e non la velocità, così il botta e risposta resta un piacere: un gioco di voci, mai di numeri, e ogni turno chiuso bene è una piccola conquista da assaporare con dolcezza.`,
];

/* ---------------------------------------------------------------- AAB (aab)
 * ANCHOR: due gemelli in testa, raddoppia il PRIMO, e poi quello diverso.
 * IMAGE WORLD: la collana di perline (due perle uguali, poi una diversa), i
 * due gemelli che aprono e il fratellino diverso che chiude. La testa doppia
 * è SEMPRE all'inizio. NO eco/coda (riservato ad ABB). */
const SKEL_AAB = [
  // 1 — skill-statement
  `Due gemelli in testa e poi il diverso: è il segreto del ritmo AAB di questo treno dei modelli, una dolce abilità per la scuola dell'infanzia. Si parte raddoppiando il primo — due vagoni gemelli, identici — e solo dopo arriva quello diverso a chiudere il terzetto, di nuovo due gemelli e poi il diverso. Su questa scheda il bambino guarda immagini di {N_PL} che aprono in coppia uguale e capisce quale vagone successivo arriva ora. Non c'è nulla da contare: basta accorgersi che la testa è doppia e che il diverso viene per ultimo, poi continuare il treno con la figura giusta. Cogliere dove sta la coppia gemella è una preziosa abilità di base che prepara alla scuola. Niente fretta: si infila una perlina alla volta. Suggeriscigli di dire «gemelli, gemelli, e poi il diverso», così il primo-doppio gli salta agli occhi. Se sbaglia, scambia la perlina con leggerezza e prosegue. Quando il terzetto torna ad aprire con i due gemelli, il sorriso spunta da solo, accanto a un adulto paziente.`,

  // 2 — invitation
  `Vieni a infilare la collana del tuo bambino! Questo treno AAB è come una collana di perline che parte sempre con due perle gemelle e poi ne mette una diversa, di nuovo due gemelle e poi la diversa. La coppia uguale apre, il diverso chiude. Sulla scheda spuntano immagini di {N_PL} che aprono in gemelli, e al piccolo tocca proseguire scegliendo la perlina che viene ora. Accorgersi che la testa è sempre doppia allena l'occhio a riconoscere dove inizia il terzetto, una capacità che alla scuola servirà spesso. Qui non si conta nulla: si segue la collana e la si allunga. Nessun voto in arrivo, solo la curiosità a fare da guida. Invitalo a indicare le due perle gemelle che aprono e poi quella diversa che chiude, e a prevedere chi viene adesso. Se infila una perlina sbagliata, ci si fa una risata e si riprova. Ogni terzetto chiuso bene è una conquista che lo riempie di orgoglio, da vivere come una collana costruita insieme.`,

  // 3 — question
  `Chi apre il terzetto? Nel ritmo AAB aprono sempre i due gemelli — il primo raddoppiato — e solo dopo arriva il diverso a chiudere, di nuovo due uguali e poi il diverso. Le immagini di {N_PL} cominciano ogni gruppetto in coppia identica, e il bambino lo riconosce e continua il treno con la figura giusta. Qui non si conta, si guarda soltanto: dove stanno i gemelli, quando spunta il diverso, quale vagone successivo arriva ora. Notare la testa doppia diverte e prepara con tenerezza alla scuola. Nessun cronometro batte il tempo: si va piano. Stuzzicalo con domandine, quali due figure aprono uguali, quale diversa le segue, e lasciagli lo spazio per pensarci. Se cambia idea, sceglie un'altra perlina e prosegue sereno. Chiudere il terzetto rinforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia dei gemelli che aprono bene.`,

  // 4 — metaphor
  `Immagina una filastrocca che fa «tà-tà-tì»: due battute uguali e robuste in testa, e poi una diversa, leggera, a chiudere. È così che canta il ritmo AAB: prima i due gemelli, poi il diverso. Guardando {GEN_ART} {GEN}, il bambino scopre che ogni gruppetto raddoppia il primo e mette in coda quello differente, e che a lui tocca proseguire. Il compito è dolce: sentire le due battute gemelle e poi la diversa, e aggiungere il vagone successivo. Battendo a voce il «tà-tà» della testa doppia, il piccolo allena l'occhio al ritmo, senza contare nulla. Niente gara, soltanto il piacere di canticchiare. Invitalo a fare «forte, forte, piano», così la coppia in testa si sente subito. Se sbaglia, niente paura: si corregge con il sorriso. Ogni «tà-tà-tì» completato è una piccola conquista, perfetta da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first
  `Qui c'è solo da stare tranquilli: si infila una collana di perline e la si allunga, con calma e con gusto. Il ritmo AAB apre sempre con due perle gemelle e poi ne mette una diversa, nello stesso ordine sereno. Su questa scheda il bambino osserva immagini di {N_PL} che cominciano in coppia uguale e capisce quale vagone successivo aggiungere. Non deve contare niente: gli basta accorgersi che la testa è doppia e il diverso chiude. Questo notare dov'è la coppia gemella è una vera abilità di base, perché allena l'occhio al ritmo, utile più avanti per leggere e per scrivere. Niente gara né punteggio, solo lo sguardo curioso e la voglia di provare. Stimolalo a toccare le due perle uguali in testa e poi quella diversa, così il proseguimento diventa chiaro. Se cambia idea, sostituisce la perlina con tranquillità. Allungare la collana fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — scene
  `Immagina due fratellini gemelli che corrono avanti tenendosi per mano, e dietro di loro un amico diverso che li segue: gemelli, gemelli, e poi l'amico, di nuovo gemelli e poi l'amico. È il ritmo AAB. Su questa scheda della scuola dell'infanzia le immagini di {N_PL} marciano proprio così, con la coppia uguale che apre ogni terzetto. Il bambino legge la fila e aggiunge chi manca per tenerla in ordine. Tutto sta nel vedere i gemelli davanti e il diverso dietro, una calma abilità che alla scuola conterà presto. Qui non si conta nulla, si riconosce soltanto chi apre in coppia. La marcia è già partita apposta, così al piccolo basta proseguirla. Invitalo a salutare «ciao gemelli, ciao amico» finché capisce chi viene ora. Davanti a uno sbaglio, basta un sorriso e un nuovo passo. Quando indovina, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — observe-the-rhythm
  `Guarda dove sono i gemelli! Su questa scheda della scuola dell'infanzia, ogni terzetto del ritmo AAB apre con due figure uguali in testa e chiude con quella diversa. Il bambino osserva immagini di {N_PL} che cominciano in coppia identica e prosegue il treno con il vagone successivo. Non c'è alcun numero da scrivere: si nota che la testa è doppia e che il diverso viene dopo, poi si continua. Cogliere dov'è la coppia gemella è una preziosa abilità di base per gli apprendimenti futuri. Niente cronometro, niente voti, solo il gusto di osservare. Accompagnalo con domandine dolci, quali due figure aprono uguali, quale diversa le chiude, e lascialo andare al proprio passo. Se un vagone rompe la coppia in testa, ne sceglie un altro con serenità. Ogni terzetto ben aperto è una piccola gioia da festeggiare, da vivere insieme con dolcezza.`,

  // 8 — classic-worksheet
  `Un gioco di sempre, semplice e amatissimo: il treno che apre con i gemelli, ritmo AAB, qui pensato per la scuola dell'infanzia. Ogni gruppetto raddoppia il primo e mette in coda il diverso. Su questa scheda il bambino osserva {GEN_ART} {GEN} e vede i due vagoni gemelli aprire ogni terzetto, riconosce il principio e prosegue il treno con la figura giusta. Niente numeri né conteggi: conta solo il notare la testa doppia e proseguire. Questa capacità di cogliere dove inizia la coppia rinforza la concentrazione, una bella preparazione alla scuola. Nessuna fretta scandisce il lavoro: si va con calma. Stimolalo a toccare le due figure gemelle in testa, a nominare quella diversa in coda e a indovinare chi apre ora. Se sbaglia un posto, lo scambia con leggerezza e riparte. Aprire ogni terzetto con i gemelli diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_AAB = [
  `Il treno apre con i gemelli a ritmo AAB: due figure uguali in testa e poi una diversa a chiudere. Il bambino guarda dove sta la coppia gemella e aggiunge il vagone successivo per riaprire il terzetto. Coglie la testa doppia osservando, senza contare nulla, e allunga la collana. Notare dove inizia la coppia è una preziosa abilità di base, da gustare al proprio ritmo, senza fretta e senza voti.`,

  `Chi apre il terzetto? Da questa domanda parte il gioco. Guardando immagini di {N_PL} che cominciano in coppia identica, il piccolo riconosce il ritmo AAB — due gemelli e poi il diverso — e prosegue con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili; se sbaglia la perlina, se ne prova un'altra con il sorriso.`,

  `Infilate la collana insieme: aprono due perle gemelle e poi ne arriva una diversa, e il bambino sceglie chi viene ora. Suggeriscigli di dire «gemelli, gemelli, e poi il diverso», così capisce quale vagone successivo riapre il terzetto. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una collana allungata con cura.`,

  `Su questa pagina il piccolo trova una collana a ritmo AAB già avviata con {N_PL}. Con calma vede i due gemelli in testa e prosegue, allenando l'occhio alla coppia che apre e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo infilare al suo ritmo, festeggiate ogni terzetto chiuso bene e proseguite senza alcuna pressione.`,

  `Come una filastrocca «tà-tà-tì», il ritmo AAB batte due note gemelle e poi una diversa. Guardando {GEN_ART} {GEN}, il bambino sente la testa doppia e prosegue il treno con il vagone successivo. Senza tempi da battere e senza punteggi, conta solo la gioia di canticchiare «forte, forte, piano»; quando il terzetto riapre con i gemelli, la fiducia in sé cresce un poco, in tutta serenità.`,

  `Questo treno apre in coppia a ritmo AAB: due gemelli in testa e poi il diverso lungo i vagoni. Il bambino osserva immagini di {N_PL} che cominciano uguali e aggiunge la figura che riapre il terzetto. Non si conta nulla, si guarda dove sta la coppia. Accompagnalo con domandine leggere e lascialo andare con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  `Un classico treno da proseguire, dove la testa è sempre doppia: aprono due gemelli e poi viene il diverso, e il bambino allunga la collana con {N_PL}. Riconosce il ritmo AAB e sceglie il vagone successivo, fino in fondo. Loda l'impegno e non la velocità, così infilare le perline resta un piacere: un gioco di sguardi, mai di numeri, e ogni terzetto chiuso bene è una piccola conquista da assaporare con dolcezza.`,
];

/* ---------------------------------------------------------------- ABB (abb)
 * ANCHOR: l'eco / il primo chiama e i due rispondono / la coda doppia.
 * IMAGE WORLD: l'eco in montagna (una voce, due ritorni), il capofila che
 * chiama e i due amici che fanno eco, il rimbalzo doppio. Il raddoppio è
 * SEMPRE alla FINE (la coda), MAI in testa. NO gemelli in testa (è AAB). */
const SKEL_ABB = [
  // 1 — skill-statement
  `Una voce e poi la sua eco doppia: è il segreto del ritmo ABB di questo treno dei modelli, una dolce abilità per la scuola dell'infanzia. Qui chi apre è solo, uno soltanto in testa, e subito due figure uguali gli fanno eco, come un richiamo che torna due volte; di nuovo uno che chiama e due che rispondono. Su questa scheda il bambino guarda immagini di {N_PL} dove il primo è da solo e la coda è doppia, e capisce quale vagone successivo arriva ora. Non c'è nulla da contare: basta sentire che il raddoppio sta alla fine e proseguire il treno con la figura giusta. Cogliere dove torna l'eco è una preziosa abilità di base che prepara alla scuola. Niente fretta: l'eco si gusta con calma. Suggeriscigli di dire «io chiamo… e tu rispondi, rispondi», così la coda doppia gli salta agli occhi. Se sbaglia, scambia la figura con leggerezza e prosegue. Quando l'eco riprende a tornare doppia, il sorriso spunta da solo, accanto a un adulto paziente.`,

  // 2 — invitation
  `Vieni a fare l'eco con il treno del tuo bambino! Il ritmo ABB è come una vocina che chiama in montagna: uno solo lancia il richiamo e due figure uguali gli rispondono in coda, di nuovo uno chiama e due fanno eco. Il singolo apre, la coppia chiude. Sulla scheda spuntano immagini di {N_PL} dove il primo è da solo e poi raddoppia in fondo, e al piccolo tocca proseguire scegliendo chi viene ora. Accorgersi che l'eco doppia arriva sempre alla fine allena l'occhio a sentire dove si chiude il gruppetto, una capacità che alla scuola servirà spesso. Qui non si conta nulla: si segue il richiamo e gli si dà voce. Nessun voto in arrivo, solo la curiosità a fare da guida. Invitalo a indicare il vagone solitario che chiama e poi i due che rispondono, e a prevedere chi torna adesso. Se sbaglia il richiamo, ci si fa una risata e si riprova. Ogni eco chiusa bene è una conquista che lo riempie di orgoglio, da vivere come un gioco di voci condiviso.`,

  // 3 — question
  `Chi risponde al richiamo? Nel ritmo ABB apre sempre uno solo — la voce singola — e poi due figure uguali gli fanno eco in coda, di nuovo uno e poi i due che rispondono. Le immagini di {N_PL} cominciano ogni gruppetto da sole e si chiudono con la coppia, e il bambino lo riconosce e continua il treno con la figura giusta. Qui non si conta, si ascolta soltanto: chi chiama da solo, quando torna l'eco doppia, quale vagone successivo arriva ora. Sentire dov'è il raddoppio finale diverte e prepara con tenerezza alla scuola. Nessun cronometro batte il tempo: si va piano. Stuzzicalo con domandine, quale figura chiama da sola, quali due le rispondono uguali, e lasciagli lo spazio per pensarci. Se cambia idea, sceglie un'altra eco e prosegue sereno. Chiudere il richiamo rinforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di un'eco tornata bene.`,

  // 4 — metaphor
  `Immagina una pallina che rimbalza: un colpo deciso e poi due rimbalzi uguali che gli vengono dietro, «top… tic-tic». È così che gioca il ritmo ABB: prima il colpo solo, poi i due rimbalzi gemelli in coda. Guardando {GEN_ART} {GEN}, il bambino scopre che ogni gruppetto parte da uno solo e raddoppia alla fine, e che a lui tocca proseguire. Il compito è dolce: sentire il colpo singolo e i due rimbalzi che fanno eco, e aggiungere il vagone successivo. Accompagnando a voce «top, e poi tic-tic», il piccolo allena l'occhio al ritmo, senza contare nulla. Niente gara, soltanto il piacere di sentire l'eco. Invitalo a fare «forte… piano-piano», così la coda doppia si sente subito. Se sbaglia, niente paura: si corregge con il sorriso. Ogni rimbalzo doppio completato è una piccola conquista, perfetta da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first
  `Qui c'è solo da stare tranquilli: si ascolta un'eco e le si risponde, con calma e con gusto. Il ritmo ABB apre sempre con una voce sola e la chiude con due figure uguali in coda, nello stesso ordine sereno. Su questa scheda il bambino osserva immagini di {N_PL} dove il primo è solitario e il raddoppio arriva alla fine, e capisce quale vagone successivo aggiungere. Non deve contare niente: gli basta sentire che la coda è doppia. Questo cogliere dove torna l'eco è una vera abilità di base, perché allena l'occhio al ritmo, utile più avanti per leggere e per scrivere. Niente gara né punteggio, solo lo sguardo curioso e la voglia di provare. Stimolalo a toccare il vagone solitario che chiama e poi i due che rispondono, così il proseguimento diventa chiaro. Se cambia idea, sostituisce l'eco con tranquillità. Rispondere al richiamo fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — scene
  `Immagina un bambino che chiama da una collina, «ehilà!», e dalla valle gli tornano due «ehilà, ehilà» uguali: una voce sola e poi l'eco doppia. È il ritmo ABB. Su questa scheda della scuola dell'infanzia le immagini di {N_PL} viaggiano proprio così, con il vagone solitario in testa e i due gemelli a fare eco in coda. Il bambino legge la fila e aggiunge chi manca per tenerla in ordine. Tutto sta nel sentire chi chiama da solo e chi risponde in coppia, una calma abilità che alla scuola conterà presto. Qui non si conta nulla, si riconosce soltanto dove torna l'eco. Il richiamo è già partito apposta, così al piccolo basta proseguirlo. Invitalo a fare «ehilà… ehilà, ehilà» finché capisce chi viene ora. Davanti a uno sbaglio, basta un sorriso e un nuovo richiamo. Quando indovina, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — observe-the-rhythm
  `Senti dove torna l'eco? Su questa scheda della scuola dell'infanzia, ogni gruppetto del ritmo ABB apre con una figura sola e chiude con due uguali, come un richiamo che rimbalza in coda. Il bambino osserva immagini di {N_PL} dove il primo è solitario e il raddoppio arriva alla fine, e prosegue il treno con il vagone successivo. Non c'è alcun numero da scrivere: si sente che la coda è doppia e si continua. Cogliere dov'è l'eco finale è una preziosa abilità di base per gli apprendimenti futuri. Niente cronometro, niente voti, solo il gusto di ascoltare. Accompagnalo con domandine dolci, quale figura chiama da sola, quali due le rispondono in coda, e lascialo andare al proprio passo. Se un vagone rompe l'eco, ne sceglie un altro con serenità. Ogni richiamo ben chiuso è una piccola gioia da festeggiare, da vivere insieme con dolcezza.`,

  // 8 — classic-worksheet
  `Un gioco di sempre, semplice e amatissimo: il treno dell'eco, ritmo ABB, qui pensato per la scuola dell'infanzia. Ogni gruppetto parte da uno solo e raddoppia alla fine, con due figure uguali a fare da coda. Su questa scheda il bambino osserva {GEN_ART} {GEN} e vede il vagone solitario chiamare e i due gemelli rispondere in coda, riconosce il principio e prosegue il treno con la figura giusta. Niente numeri né conteggi: conta solo il sentire dov'è l'eco e proseguire. Questa capacità di cogliere dove si chiude il richiamo rinforza la concentrazione, una bella preparazione alla scuola. Nessuna fretta scandisce il lavoro: si va con calma. Stimolalo a toccare il vagone che chiama da solo, a nominare i due che rispondono e a indovinare chi torna ora. Se sbaglia un posto, lo scambia con leggerezza e riparte. Far tornare l'eco diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_ABB = [
  `Il treno fa l'eco a ritmo ABB: una figura sola in testa e poi due uguali a rispondere in coda. Il bambino sente dov'è il raddoppio finale e aggiunge il vagone successivo per riaprire il richiamo. Coglie l'eco osservando, senza contare nulla, e prosegue il treno. Sentire dove torna la coda doppia è una preziosa abilità di base, da gustare al proprio ritmo, senza fretta e senza voti.`,

  `Chi risponde al richiamo? Da questa domanda parte il gioco. Guardando immagini di {N_PL} dove il primo chiama da solo e due uguali fanno eco, il piccolo riconosce il ritmo ABB e prosegue con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili; se sbaglia l'eco, se ne prova un'altra con il sorriso.`,

  `Fate l'eco insieme: uno chiama da solo e due gli rispondono in coda, e il bambino sceglie chi torna ora. Suggeriscigli di dire «io chiamo… e tu rispondi, rispondi», così capisce quale vagone successivo riapre il richiamo. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di un'eco tornata con cura.`,

  `Su questa pagina il piccolo trova un richiamo a ritmo ABB già avviato con {N_PL}. Con calma sente il vagone solitario e i due che rispondono in coda, allenando l'occhio all'eco doppia e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo rispondere al suo ritmo, festeggiate ogni richiamo chiuso bene e proseguite senza alcuna pressione.`,

  `Come una pallina che fa «top… tic-tic», il ritmo ABB lancia un colpo solo e due rimbalzi uguali in coda. Guardando {GEN_ART} {GEN}, il bambino sente l'eco finale e prosegue il treno con il vagone successivo. Senza tempi da battere e senza punteggi, conta solo la gioia di fare «forte… piano-piano»; quando il richiamo torna doppio, la fiducia in sé cresce un poco, in tutta serenità.`,

  `Questo treno chiude in eco a ritmo ABB: una voce sola e poi due uguali in coda lungo i vagoni. Il bambino osserva immagini di {N_PL} dove il raddoppio arriva alla fine e aggiunge la figura che riapre il richiamo. Non si conta nulla, si ascolta dov'è l'eco. Accompagnalo con domandine leggere e lascialo andare con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  `Un classico treno da proseguire, dove la coda è sempre doppia: chiama uno solo e gli rispondono due uguali, e il bambino fa tornare l'eco con {N_PL}. Riconosce il ritmo ABB e sceglie il vagone successivo, fino in fondo. Loda l'impegno e non la velocità, così rispondere al richiamo resta un piacere: un gioco di voci, mai di numeri, e ogni eco chiusa bene è una piccola conquista da assaporare con dolcezza.`,
];

/* -------------------------------------------------------------- AABB (aabb)
 * ANCHOR: a coppie / due e due / a braccetto.
 * IMAGE WORLD: il ballo a coppie (due ballerini uguali, poi altri due), gli
 * amici a braccetto a due a due, i calzini in coppia, il valzer «un-due,
 * un-due». SEMPRE in coppie di quattro (due+due), MAI terzetti. */
const SKEL_AABB = [
  // 1 — skill-statement
  `A coppie, due e due: è il passo di danza del ritmo AABB di questo treno dei modelli, una dolce abilità per la scuola dell'infanzia. I vagoni entrano in pista a braccetto — due figure uguali insieme — e subito dopo entra un'altra coppia, due figure uguali ma diverse dalle prime, di nuovo due e due. Su questa scheda il bambino guarda immagini di {N_PL} che ballano a coppie e capisce quale vagone successivo arriva ora. Non c'è nulla da contare: basta vedere che le figure vanno a braccetto, mai da sole, e proseguire il treno con la figura giusta. Cogliere il valzer delle coppie è una preziosa abilità di base che prepara alla scuola. Niente fretta: la danza va al proprio ritmo. Suggeriscigli di dire «una coppia, e poi un'altra coppia» mentre punta i vagoni, così il due-e-due gli salta agli occhi. Se sbaglia il ballerino, lo scambia con leggerezza e prosegue. Quando le coppie tornano a entrare a braccetto, il sorriso spunta da solo, accanto a un adulto paziente.`,

  // 2 — invitation
  `Vieni a ballare a coppie con il treno del tuo bambino! Il ritmo AABB è un ballo a due a due: prima entra una coppia di amici a braccetto, due uguali, e poi un'altra coppia, due uguali e diversi, di nuovo due e due. Sulla scheda spuntano immagini di {N_PL} che danzano abbracciate a coppie, e al piccolo tocca proseguire scegliendo chi entra ora in pista. Accorgersi che le figure entrano sempre a braccetto allena l'occhio a vedere le coppie, una capacità che alla scuola servirà spesso. Qui non si conta nulla: si segue la danza e la si continua. Nessun voto in arrivo, solo la curiosità a fare da guida. Invitalo a indicare la prima coppia a braccetto e poi l'altra coppia, e a prevedere chi balla adesso. Se mette in pista un ballerino spaiato, ci si fa una risata e si riprova. Ogni coppia entrata bene è una conquista che lo riempie di orgoglio, da vivere come un ballo allegro e condiviso.`,

  // 3 — question
  `Chi entra a braccetto adesso? Nel ritmo AABB le figure ballano sempre a coppie: due uguali insieme e poi altre due uguali insieme, di nuovo due e due. Le immagini di {N_PL} entrano in pista abbracciate a due a due, e il bambino lo riconosce e continua il treno con la figura giusta. Qui non si conta, si guarda soltanto: come entrano le coppie, quale vagone successivo arriva ora. Vedere il ballo a due a due diverte e prepara con tenerezza alla scuola. Nessun cronometro batte il tempo: si va piano. Stuzzicalo con domandine, quali due figure ballano insieme, quali altre due entrano dopo, e lasciagli lo spazio per pensarci. Se cambia idea, sceglie un'altra coppia e prosegue sereno. Far entrare bene le coppie rinforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di una danza a braccetto.`,

  // 4 — metaphor
  `Immagina un valzer che fa «un-due, un-due»: prima due passi insieme, poi altri due passi insieme. È così che balla il ritmo AABB, a coppie. Guardando {GEN_ART} {GEN}, il bambino scopre che i vagoni entrano a braccetto, due uguali e poi altre due uguali, e che a lui tocca far girare il ballo. Il compito è dolce: vedere le figure danzare a due a due e aggiungere il vagone successivo. Accompagnando a voce «un-due, un-due», il piccolo allena l'occhio al ritmo, senza contare nulla. Niente gara, soltanto il piacere del valzer. Invitalo a fare due battiti di mani uniti e poi altri due, «pa-pa… pa-pa», così le coppie si sentono subito. Se sbaglia un passo, niente paura: si corregge con il sorriso. Ogni valzer di coppie completato è una piccola conquista, perfetta da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first
  `Qui c'è solo da stare tranquilli: si guarda un ballo a coppie e lo si fa girare, con calma e con gusto. Il ritmo AABB manda in pista due figure uguali a braccetto e poi altre due uguali, nello stesso ordine sereno. Su questa scheda il bambino osserva immagini di {N_PL} che danzano a due a due e capisce quale vagone successivo aggiungere. Non deve contare niente: gli basta vedere che le figure vanno sempre in coppia. Questo cogliere il due-e-due è una vera abilità di base, perché allena l'occhio al ritmo, utile più avanti per leggere e per scrivere. Niente gara né punteggio, solo lo sguardo curioso e la voglia di provare. Stimolalo a indicare la prima coppia a braccetto e poi l'altra coppia, così il proseguimento diventa chiaro. Se cambia idea, cambia ballerino con tranquillità. Far ballare le coppie fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — scene
  `Immagina un girotondo di amici che si tengono a braccetto a due a due: prima passano due insieme, poi altri due insieme, di nuovo due e due. È il ritmo AABB. Su questa scheda della scuola dell'infanzia le immagini di {N_PL} sfilano proprio così, sempre abbracciate in coppia. Il bambino legge la fila e aggiunge chi manca per tenere insieme le coppie. Tutto sta nel vedere che nessuno cammina da solo, ma tutti a braccetto a due a due, una calma abilità che alla scuola conterà presto. Qui non si conta nulla, si riconosce soltanto il passo a coppie. La sfilata è già partita apposta, così al piccolo basta proseguirla. Invitalo a salutare «ciao coppia, ciao coppia» finché capisce chi passa ora. Davanti a uno sbaglio, basta un sorriso e un nuovo passo. Quando indovina, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — observe-the-rhythm
  `Guarda le coppie a braccetto! Su questa scheda della scuola dell'infanzia, ogni gruppo del ritmo AABB entra a due a due: due figure uguali insieme e poi altre due uguali insieme. Il bambino osserva immagini di {N_PL} che ballano a coppie e prosegue il treno con il vagone successivo. Non c'è alcun numero da scrivere: si vede che le figure vanno sempre in coppia e si continua. Cogliere il due-e-due è una preziosa abilità di base per gli apprendimenti futuri. Niente cronometro, niente voti, solo il gusto di guardare la danza. Accompagnalo con domandine dolci, quali due figure ballano abbracciate, quali altre due entrano dopo, e lascialo andare al proprio passo. Se un vagone resta spaiato, ne sceglie un altro con serenità. Ogni coppia entrata bene è una piccola gioia da festeggiare, da vivere insieme con dolcezza.`,

  // 8 — classic-worksheet
  `Un gioco di sempre, semplice e amatissimo: il treno che balla a coppie, ritmo AABB, qui pensato per la scuola dell'infanzia. Ogni gruppo entra a braccetto, due figure uguali e poi altre due uguali. Su questa scheda il bambino osserva {GEN_ART} {GEN} e vede le figure danzare a due a due, riconosce il principio e fa girare il treno con la figura giusta. Niente numeri né conteggi: conta solo il vedere le coppie e proseguire. Questa capacità di cogliere il due-e-due rinforza la concentrazione, una bella preparazione alla scuola. Nessuna fretta scandisce il lavoro: si va con calma. Stimolalo a indicare la prima coppia a braccetto, a nominare l'altra coppia e a indovinare chi balla ora. Se mette in pista uno spaiato, lo scambia con leggerezza e riparte. Far ballare le coppie diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_AABB = [
  `Il treno balla a coppie a ritmo AABB: due figure uguali a braccetto e poi altre due uguali. Il bambino guarda le coppie e aggiunge il vagone successivo per far entrare quella giusta. Vede il due-e-due osservando, senza contare nulla, e fa girare la danza. Cogliere che le figure vanno a braccetto è una preziosa abilità di base, da gustare al proprio ritmo, senza fretta e senza voti.`,

  `Chi entra a braccetto adesso? Da questa domanda parte il gioco. Guardando immagini di {N_PL} che ballano a due a due, il piccolo riconosce il ritmo AABB — una coppia e poi un'altra coppia — e prosegue con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili; se mette in pista uno spaiato, ne prova un altro con il sorriso.`,

  `Ballate a coppie insieme: entra una coppia a braccetto e poi un'altra coppia, e il bambino sceglie chi balla ora. Suggeriscigli di dire «una coppia, e poi un'altra coppia», così capisce quale vagone successivo entra in pista. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una danza fatta girare con cura.`,

  `Su questa pagina il piccolo trova un ballo a ritmo AABB già avviato con {N_PL}. Con calma vede le figure entrare a braccetto a due a due e prosegue, allenando l'occhio alle coppie e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo far ballare al suo ritmo, festeggiate ogni coppia entrata bene e proseguite senza alcuna pressione.`,

  `Come un valzer che fa «un-due, un-due», il ritmo AABB muove due passi insieme e poi altri due. Guardando {GEN_ART} {GEN}, il bambino sente il ballo a coppie e prosegue il treno con il vagone successivo. Senza tempi da battere e senza punteggi, conta solo la gioia di battere «pa-pa… pa-pa»; quando le coppie tornano a braccetto, la fiducia in sé cresce un poco, in tutta serenità.`,

  `Questo treno danza a coppie a ritmo AABB: due uguali a braccetto e poi altre due lungo i vagoni. Il bambino osserva immagini di {N_PL} che entrano a due a due e aggiunge la figura che completa la coppia. Non si conta nulla, si guarda la danza. Accompagnalo con domandine leggere e lascialo andare con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  `Un classico treno da proseguire, dove nessuno cammina da solo: le figure vanno a braccetto a due a due, e il bambino fa girare il ballo con {N_PL}. Riconosce il ritmo AABB e sceglie il vagone successivo, fino in fondo. Loda l'impegno e non la velocità, così far ballare le coppie resta un piacere: un gioco di sguardi, mai di numeri, e ogni coppia entrata bene è una piccola conquista da assaporare con dolcezza.`,
];

/* ---------------------------------------------------------------- ABC (abc)
 * ANCHOR: tre diversi in fila / un terzetto / il girotondo di tre.
 * IMAGE WORLD: il semaforo (rosso-giallo-verde), tre bandierine di colori
 * diversi, il girotondo di tre amici, la marcia «uno-due-tre». Tutti e tre
 * DIVERSI, nessun raddoppio: la sorpresa è che NIENTE si ripete dentro il
 * terzetto. NO gemelli, NO eco, NO coppie. */
const SKEL_ABC = [
  // 1 — skill-statement
  `Tre amici diversi in fila, e nessuno che si ripete: è la sorpresa del ritmo ABC di questo treno dei modelli, una dolce abilità per la scuola dell'infanzia. Il terzetto è fatto di tre figure tutte diverse, una dopo l'altra, e poi le stesse tre ricominciano nello stesso ordine, come un girotondo che ricomincia da capo. Su questa scheda il bambino guarda immagini di {N_PL} dove ogni terzetto è tutto diverso e capisce quale vagone successivo arriva ora. Non c'è nulla da contare: basta accorgersi che dentro il terzetto niente si ripete e poi proseguire il treno con la figura giusta. Tenere a mente l'ordine dei tre diversi è una preziosa abilità di base che prepara alla scuola. Niente fretta: il girotondo gira piano. Suggeriscigli di dire «uno, due, tre… e si ricomincia», così l'ordine del terzetto gli salta agli occhi. Se sbaglia, scambia la figura con leggerezza e prosegue. Quando il girotondo riparte con gli stessi tre amici, il sorriso spunta da solo, accanto a un adulto paziente.`,

  // 2 — invitation
  `Vieni a fare il girotondo con il treno del tuo bambino! Il ritmo ABC mette in fila tre amici tutti diversi, uno dopo l'altro, e poi gli stessi tre tornano nello stesso ordine, come una giostra che ricomincia il giro. Sulla scheda spuntano immagini di {N_PL} dove ogni terzetto è tutto diverso, e al piccolo tocca proseguire scegliendo chi ricomincia il giro ora. Accorgersi che dentro il terzetto nessuno si ripete allena l'occhio a tenere a mente l'ordine, una capacità che alla scuola servirà spesso. Qui non si conta nulla: si segue il girotondo e lo si fa proseguire. Nessun voto in arrivo, solo la curiosità a fare da guida. Invitalo a nominare i tre amici diversi in fila — primo, secondo, terzo — e a prevedere chi riapre il giro. Se mette in fila il vagone sbagliato, ci si fa una risata e si riprova. Ogni giro chiuso bene è una conquista che lo riempie di orgoglio, da vivere come una giostra fatta girare insieme.`,

  // 3 — question
  `Chi ricomincia il giro? Nel ritmo ABC sfilano sempre tre amici tutti diversi — primo, secondo, terzo — e poi gli stessi tre tornano nello stesso ordine. Le immagini di {N_PL} formano terzetti dove niente si ripete, e il bambino lo riconosce e continua il treno con la figura giusta. Qui non si conta, si guarda soltanto: chi viene primo, chi secondo, chi terzo, e quale vagone successivo riapre il giro. Tenere a mente l'ordine dei tre diversi diverte e prepara con tenerezza alla scuola. Nessun cronometro batte il tempo: si va piano. Stuzzicalo con domandine, quali tre figure diverse vedi in fila, quale riapre il terzetto, e lasciagli lo spazio per pensarci. Se cambia idea, rimette in fila un'altra figura e prosegue sereno. Chiudere il giro rinforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di un girotondo che ricomincia bene.`,

  // 4 — metaphor
  `Immagina un semaforo: rosso, giallo, verde, e poi di nuovo rosso, giallo, verde, sempre nello stesso ordine. È così che gira il ritmo ABC: tre figure tutte diverse, una dietro l'altra, e poi le stesse tre da capo. Guardando {GEN_ART} {GEN}, il bambino scopre che ogni terzetto è fatto di tre amici diversi e che a lui tocca far ripartire il giro. Il compito è dolce: tenere a mente l'ordine dei tre e aggiungere il vagone successivo. Nominando a voce «primo, secondo, terzo», il piccolo allena l'occhio al ritmo, senza contare nulla. Niente gara, soltanto il piacere di guardare le luci cambiare. Invitalo a fare tre suoni diversi, «bip, bop, bup», così l'ordine del terzetto si sente subito. Se sbaglia, niente paura: si corregge con il sorriso. Ogni semaforo completato è una piccola conquista, perfetta da vivere fianco a fianco, senza alcuna pressione addosso.`,

  // 5 — reassurance-first
  `Qui c'è solo da stare tranquilli: si guarda un girotondo di tre amici e lo si fa ripartire, con calma e con gusto. Il ritmo ABC mette in fila tre figure tutte diverse, sempre nello stesso ordine, che poi ricomincia da capo. Su questa scheda il bambino osserva immagini di {N_PL} dove dentro il terzetto niente si ripete e capisce quale vagone successivo aggiungere. Non deve contare niente: gli basta tenere a mente chi viene primo, secondo e terzo. Questo ricordare l'ordine dei tre diversi è una vera abilità di base, perché allena l'occhio al ritmo, utile più avanti per leggere e per scrivere. Niente gara né punteggio, solo lo sguardo curioso e la voglia di provare. Stimolalo a indicare i tre amici diversi in fila, così il proseguimento diventa chiaro. Se cambia idea, rimette in fila con tranquillità. Far ripartire il giro fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  // 6 — scene
  `Immagina tre bandierine di colori diversi appese a una cordicella: una rossa, una gialla, una blu, e poi di nuovo rossa, gialla, blu, sempre in quell'ordine. È il ritmo ABC. Su questa scheda della scuola dell'infanzia le immagini di {N_PL} sono appese proprio così, in terzetti dove ogni figura è diversa. Il bambino legge la fila di bandierine e aggiunge quella che manca per far ripartire il giro. Tutto sta nel tenere a mente l'ordine dei tre diversi e nel proseguirlo, una calma abilità che alla scuola conterà presto. Qui non si conta nulla, si riconosce soltanto chi viene primo, secondo e terzo. La cordicella è già appesa apposta, così al piccolo basta continuarla. Invitalo a nominare i colori «rossa, gialla, blu» finché capisce quale riapre il giro. Davanti a uno sbaglio, basta un sorriso e una nuova bandierina. Quando indovina, la sicurezza del bambino cresce un poco, in un clima sempre sereno e affettuoso.`,

  // 7 — observe-the-rhythm
  `Tieni a mente i tre amici diversi! Su questa scheda della scuola dell'infanzia, ogni terzetto del ritmo ABC mette in fila tre figure tutte diverse — primo, secondo, terzo — e poi le stesse tre ricominciano. Il bambino osserva immagini di {N_PL} dove dentro il gruppo niente si ripete e prosegue il treno con il vagone successivo. Non c'è alcun numero da scrivere: si ricorda l'ordine dei tre e si fa ripartire il giro. Tenere a mente la fila dei diversi è una preziosa abilità di base per gli apprendimenti futuri. Niente cronometro, niente voti, solo il gusto di guardare. Accompagnalo con domandine dolci, quali tre figure diverse arrivano in fila, quale riapre il terzetto, e lascialo andare al proprio passo. Se un vagone rompe l'ordine, ne sceglie un altro con serenità. Ogni giro tenuto a mente per bene è una piccola gioia da festeggiare, da vivere insieme con dolcezza.`,

  // 8 — classic-worksheet
  `Un gioco di sempre, semplice e amatissimo: il treno del girotondo di tre, ritmo ABC, qui pensato per la scuola dell'infanzia. Ogni terzetto è fatto di tre amici tutti diversi in fila, e poi gli stessi tre ricominciano in ordine. Su questa scheda il bambino osserva {GEN_ART} {GEN} e vede i tre vagoni diversi sfilare uno dopo l'altro, riconosce il principio e fa ripartire il treno con la figura giusta. Niente numeri né conteggi: conta solo il tenere a mente l'ordine e proseguire. Questa capacità di ricordare la fila dei diversi rinforza la concentrazione, una bella preparazione alla scuola. Nessuna fretta scandisce il lavoro: si va con calma. Stimolalo a nominare i tre amici diversi in fila — primo, secondo, terzo — e a indovinare chi riapre il giro. Se sbaglia un posto, lo scambia con leggerezza e riparte. Far ripartire il girotondo diventa un momento prezioso di osservazione, da assaporare insieme con tempi distesi e tanta gentilezza.`,
];

const P2_ABC = [
  `Il treno gira a terzetti a ritmo ABC: tre figure tutte diverse in fila, poi le stesse tre nello stesso ordine. Il bambino tiene a mente l'ordine dei tre e aggiunge il vagone successivo per riaprire il giro. Coglie il terzetto osservando, senza contare nulla, e fa ripartire il treno. Ricordare la fila dei diversi è una preziosa abilità di base, da gustare al proprio ritmo, senza fretta e senza voti.`,

  `Chi ricomincia il giro? Da questa domanda parte il gioco. Guardando immagini di {N_PL} che sfilano a tre diversi in fila, il piccolo riconosce il ritmo ABC e prosegue con la figura giusta. È un tranquillo esercizio di attenzione, mai di conteggio, da gustare insieme con parole gentili; se rompe l'ordine del terzetto, ne prova un altro con il sorriso.`,

  `Fate il girotondo insieme: tre amici diversi sfilano in fila e poi ricominciano, e il bambino sceglie chi riapre il giro. Suggeriscigli di nominarli «primo, secondo, terzo, e di nuovo», così capisce quale vagone successivo ricomincia il terzetto. Niente gara e niente cronometro, soltanto lo sguardo curioso e la gioia di una giostra fatta ripartire con cura.`,

  `Su questa pagina il piccolo trova un girotondo a ritmo ABC già avviato con {N_PL}. Con calma tiene a mente i tre amici diversi in fila e prosegue, allenando l'occhio all'ordine del terzetto e la pazienza. È un dolce momento di osservazione, perfetto da vivere fianco a fianco: lascialo far girare al suo ritmo, festeggiate ogni giro chiuso bene e proseguite senza alcuna pressione.`,

  `Come un semaforo «rosso, giallo, verde», il ritmo ABC mette tre figure tutte diverse e poi ricomincia. Guardando {GEN_ART} {GEN}, il bambino tiene a mente l'ordine del terzetto e prosegue il treno con il vagone successivo. Senza tempi da battere e senza punteggi, conta solo la gioia di nominare «primo, secondo, terzo»; quando il giro riparte, la fiducia in sé cresce un poco, in tutta serenità.`,

  `Questo treno sfila a terzetti a ritmo ABC: tre figure tutte diverse in fila lungo i vagoni. Il bambino osserva immagini di {N_PL} dove niente si ripete dentro il gruppo e aggiunge la figura che riapre il giro. Non si conta nulla, si tiene a mente l'ordine. Accompagnalo con domandine leggere e lascialo andare con calma; in pochi minuti ha una bella occupazione tranquilla e piena di senso.`,

  `Un classico treno da proseguire, dove ogni terzetto è tutto diverso: tre amici in fila, nessuno ripetuto, e il bambino fa ripartire il giro con {N_PL}. Riconosce il ritmo ABC e sceglie il vagone successivo, fino in fondo. Loda l'impegno e non la velocità, così far girare il terzetto resta un piacere: un gioco di sguardi, mai di numeri, e ogni giro chiuso bene è una piccola conquista da assaporare con dolcezza.`,
];

/* ----------------------------------------------------------------- exports */
const H1 = {
  'null': 'Treno dei modelli AB con {H1} – per la scuola dell\'infanzia',
  'aab': 'Treno dei modelli AAB con {H1} – per la scuola dell\'infanzia',
  'abb': 'Treno dei modelli ABB con {H1} – per la scuola dell\'infanzia',
  'aabb': 'Treno dei modelli AABB con {H1} – per la scuola dell\'infanzia',
  'abc': 'Treno dei modelli ABC con {H1} – per la scuola dell\'infanzia',
};
const CAR = {
  'null': 'Treno dei modelli (AB) – ',
  'aab': 'Treno dei modelli (AAB) – ',
  'abb': 'Treno dei modelli (ABB) – ',
  'aabb': 'Treno dei modelli (AABB) – ',
  'abc': 'Treno dei modelli (ABC) – ',
};

module.exports = {
  type: 'pattern-train',
  eyebrow: 'Scheda: Il treno dei modelli',
  strand: 'Sequenze e ritmi',
  level: 'infanzia',
  slotWord: 'treno-modelli',
  h1: (mk) => H1[mk] || H1['null'],
  carousel: (mk, themeH1) => (CAR[mk] || CAR['null']) + themeH1,
  modes: {
    'null': { SKEL: SKEL_AB, P2: P2_AB },
    'aab': { SKEL: SKEL_AAB, P2: P2_AAB },
    'abb': { SKEL: SKEL_ABB, P2: P2_ABB },
    'aabb': { SKEL: SKEL_AABB, P2: P2_AABB },
    'abc': { SKEL: SKEL_ABC, P2: P2_ABC },
  },
  P3: `Se il bambino si è divertito a leggere i ritmi e a continuare il treno, può proseguire con altre schede vicine, come {nb1} oppure {nb2}. Sono giochi tranquilli di osservazione, perfetti per allenare l'occhio sulle sequenze mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di scoprire quale vagone successivo arriva e portare a termine la sequenza.`,
};
