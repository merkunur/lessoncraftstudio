/* it-readiness-picture-path — Italian prose config for the picture-path fan.
 * ONE mode: 'choose-path' (readiness, NO standard, level 'infanzia').
 * Strand: Orientamento spaziale. Mechanic: a maze. An arrow marks the start;
 * several pictures of {N_PL} sit around the outside, but only ONE is reachable —
 * walls block the others. The child traces the open corridor with finger or pencil
 * to discover which picture the path leads to. NO counting, NO time pressure.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le immagini/cose" = {GEN_ART} {GEN}; any verb/adjective
 *   agreeing with {GEN} is PLURAL; "di/a/da/in/su + collective" via {DI_GEN} etc. */
'use strict';

const SKEL_CP = [
  `Immagina il bambino seduto con la matita in mano davanti a questo labirinto, che si domanda: dove porterà mai la strada? È proprio questo a rendere la scheda così appassionante. Al via c'è una piccola freccia e, tutt'intorno al labirinto, aspettano diverse immagini di {N_PL}, ma una sola è davvero raggiungibile. I muretti sbarrano tutte le altre strade. Il piccolo segue il percorso con il dito o con la matita e scopre a quale immagine conduce il corridoio aperto. Un orientamento nello spazio come questo è una preziosa abilità di base che prepara alla scuola, senza alcuna pressione e senza contare nulla. Niente fretta, qui si gioca al proprio ritmo. Suggeriscigli di partire dalla freccia e di provare le diverse direzioni una a una. Se una strada finisce contro un muro, si torna indietro con serenità e si riprova. Vissuta a fianco di un adulto paziente, con parole dolci e nessuna corsa, l'attività diventa un caldo momento di gioco condiviso.`,

  `Trovare la strada giusta in un labirinto, per il bambino della scuola dell'infanzia, è come risolvere un piccolo enigma, e infatti lo è. Su questa scheda una freccia indica da dove partire, e attorno al labirinto sono disposte più mete con {N_PL}. Ma i muri lasciano libera una sola strada. Il piccolo guarda con attenzione, osserva i bivi e segue il percorso fino alla fine. Così esercita, quasi per gioco, l'orientamento nello spazio e l'osservare con cura, due abilità che più avanti gli serviranno nel leggere e nello scrivere. Non c'è alcun limite di tempo né la paura di sbagliare. Invitalo a posare il dito sulla freccia e a far scorrere lo sguardo lungo i corridoi, prima ancora di tracciare il cammino. Quando trova la via aperta, può ripassarla con una matita colorata, e il percorso diventa subito un piccolo trofeo da mostrare con orgoglio.`,

  `A volte una strada sembra dritta e finisce invece contro un muro: scoprire dove il sentiero porta davvero allena nel bambino il pensiero che guarda avanti. In questo gioco il piccolo parte dalla freccia e deve capire quale delle immagini disposte all'esterno, con {N_PL}, sia raggiungibile attraverso il labirinto. Un solo corridoio è libero. Con il dito o con una matita colorata, il bambino percorre il tragitto passo dopo passo. Questa forma di logica spaziale è una vera abilità di base, e per giunta diverte un mondo. Niente conta gli errori e niente cronometro scandisce il tempo: si esplora con calma. Accompagnalo con domande leggere, dove pensi che porti questa strada, e lasciagli lo spazio per provarci. Riuscire a seguire la via giusta rafforza l'attenzione e la fiducia in sé, in un clima sempre sereno e affettuoso, lontano da ogni fretta.`,

  `I bambini amano i labirinti perché sembrano un'avventura: quale corridoio porterà alla meta? Su questa pagina il piccolo comincia dalla freccia e decide a quale delle immagini sistemate all'esterno, con {N_PL}, conduce davvero la strada. Le altre mete sono tagliate fuori dai muri, nascoste con astuzia. Il bambino si fa largo con la matita lungo i corridoi e segue l'unico percorso libero. Mentre lo fa, allena quasi senza accorgersene l'orientamento nello spazio e la concentrazione, due preziose abilità di base. Niente punteggio e niente gara, soltanto il piccolo e un cammino tutto da scoprire. Le strade chiuse fanno parte del gioco, e ogni vicolo cieco è un'occasione per tornare sui propri passi. Lascia che provi diverse direzioni: imboccare una via sbagliata e ricominciare con il sorriso è esattamente ciò che rende il labirinto un esercizio così vivo e affettuoso.`,

  `Dove porta la strada? Questa semplice domanda è il cuore della scheda della scuola dell'infanzia. Partendo dalla freccia, il bambino deve seguire il percorso giusto attraverso il labirinto, finché non arriva a una delle immagini disposte all'esterno, con {N_PL}. La parte sorprendente è che diverse mete sembrano raggiungibili, ma i muri le bloccano tutte tranne una. Il piccolo guarda con attenzione, prova con il dito e individua la via aperta. Così esercita la percezione dello spazio, un'abilità che alla scuola aiuta a orientarsi e a mettere ordine. Niente fretta e nessun controllo degli errori: si esplora al proprio ritmo. Invitalo a osservare prima tutte le immagini intorno, poi a scegliere da quale corridoio partire. Quando il cammino giusto si rivela, festeggiate insieme la scoperta. È un dolce momento di gioco e di crescita, da percorrere fianco a fianco con tanta calma.`,

  `Una freccia segna l'inizio e tutt'intorno fanno capolino diverse immagini, ma a quale conduce il cammino? Questo labirinto sfida con dolcezza il bambino a trovare, con {N_PL} come meta, l'unica uscita raggiungibile. I muri sbarrano i sentieri sbagliati, così resta aperta una sola via. Il piccolo la segue con pazienza usando la matita, da un bivio all'altro. L'esercizio rafforza l'immaginazione dello spazio, un'abilità di base centrale per l'avvio alla scuola. Non c'è alcun orologio che scorre, né qualcuno che fa paragoni, soltanto la gioia di cercare e di trovare. I corridoi chiusi non sono sbagli, ma indizi su dove non passare. Stimolalo a raccontare a voce alta quale strada vuole provare, e perché. Ogni tentativo, anche quello che finisce contro un muretto, lo avvicina alla meta e nutre la sua sicurezza, in un clima caldo e tranquillo.`,

  `Seguire il cammino che porta davvero alla meta è un esercizio meraviglioso per le piccole mani e le menti curiose. Su questa scheda il bambino si muove insieme alla freccia e si chiede quale delle immagini esterne, con {N_PL}, sia raggiungibile attraverso il labirinto. Un solo corridoio è libero, gli altri finiscono contro i muri. Con il dito o con una matita, il piccolo si apre la strada lungo i passaggi. Così sviluppa l'orientamento nello spazio e la costanza, due preziose abilità di base. Ogni tentativo merita una lode e la meta non mette alcuna fretta. Suggeriscigli di guardare avanti, di immaginare dove arriverà un sentiero prima ancora di percorrerlo. Se sbaglia strada, basta tornare al bivio e ripartire con leggerezza. Quando finalmente il percorso si rivela, la gioia del bambino è autentica, e la sua concentrazione esce rafforzata da questo dolce momento di scoperta.`,

  `Attraverso il labirinto fino all'immagine giusta: sembra un gioco ed è invece vero apprendimento. Il bambino parte dalla freccia e cerca di capire dove porta la strada, a quale delle immagini disposte all'esterno, con {N_PL}. La maggior parte delle mete è bloccata dai muri, e solo un percorso resta aperto. Il piccolo lo segue con attenzione, usando il dito, e scopre da solo la soluzione. Una logica spaziale come questa prepara al pensiero della scuola, senza che il bambino debba contare o calcolare alcunché. Niente cronometro e niente punteggio, soltanto la curiosità che guida lo sguardo lungo i corridoi. Le vie chiuse fanno parte dell'avventura, e ogni vicolo cieco insegna a guardare meglio. Basta stampare la scheda, sedersi vicini e cercare insieme il cammino. Quando la via giusta appare, condividete la soddisfazione di averla trovata con calma e con gioia.`,
];

const P2_CP = [
  `Ed ecco come si gioca: il bambino posa il dito sulla freccia e segue i corridoi del labirinto. A ogni bivio osserva quale strada prosegue e quale finisce contro un muretto. La meta è arrivare a una delle immagini di {N_PL} disposte all'esterno. Lascialo provare più direzioni con calma, gli errori fanno parte del gioco; trovata la via giusta, può ripassarla con una matita colorata.`,

  `Sedetevi insieme al tavolo e osservate il labirinto con calma. Dov'è il via? Dove potrebbe portare la strada? Il bambino segue il percorso con il dito, tra {N_PL} sistemati intorno al labirinto. Una sola meta è raggiungibile. Parlatene mentre cercate, perché così è più divertente e si rafforza, quasi senza accorgersene, il senso dello spazio. Alla fine il cammino trovato può essere ripassato con i colori.`,

  `Così il bambino trova la strada: dalla freccia si fa largo con la matita lungo i corridoi e controlla quale direzione è aperta. Certe vie sembrano promettenti e finiscono invece contro un muro, e va benissimo così. Conta soltanto scoprire a quale delle immagini di {N_PL} conduce il corridoio libero. Non c'è alcun limite di tempo: lascialo pensare, provare e scoprire al proprio ritmo.`,

  `Una piccola guida: mostra al bambino la freccia come punto di partenza e invitalo a seguire il cammino nel labirinto. Con il dito o con una matita percorre i passaggi, sempre alla ricerca dell'unica via aperta verso le immagini di {N_PL} disposte ai bordi. Le altre strade sono sbarrate dai muri. Se si perde, basta tornare indietro e ripartire: ogni tentativo conta e allena il guardare con cura.`,

  `Provateci insieme: il bambino comincia dalla freccia e segue il tragitto con il dito attraverso il labirinto. Ai bivi decide quale corridoio prosegue. La meta è trovare l'unica immagine raggiungibile, con {N_PL}, mentre i muri sbarrano le altre. Quando ha scoperto la via giusta, può tracciarla con una matita. Così la ricerca diventa una piccola gioia conquistata, del tutto senza pressione.`,

  `Un consiglio per cominciare: guardate prima, con il bambino, tutte le immagini disposte all'esterno del labirinto. Poi lui parte dalla freccia e segue il percorso con il dito, lungo i corridoi, fino a una meta tra {N_PL}. Una sola strada è libera, le altre finiscono contro i muri. Incoraggialo a tentare anche qualche deviazione: così impara a guardare avanti e a osservare con precisione.`,

  `E ora tocca a voi: il bambino parte dalla freccia e cerca la via attraverso il labirinto. Con il dito percorre i corridoi e capisce presto che non ogni strada porta alla meta. Si tratta di trovare l'unica immagine con {N_PL} che il corridoio libero raggiunge. Loda ogni tentativo, anche le deviazioni, perché fanno parte dello scoprire. Alla fine, trovare il cammino sarà ancora più bello.`,
];

const H1 = {
  'choose-path': 'Trova il percorso con {H1} – scheda per la scuola dell\'infanzia',
};
const CAR = {
  'choose-path': 'Percorso illustrato – ',
};

module.exports = {
  type: 'picture-path',
  eyebrow: 'Scheda: Percorso illustrato',
  strand: 'Orientamento spaziale',
  level: 'infanzia',
  slotWord: 'percorso',
  h1: (mk) => H1[mk] || H1['choose-path'],
  carousel: (mk, themeH1) => (CAR[mk] || '') + themeH1,
  modes: {
    'choose-path': { SKEL: SKEL_CP, P2: P2_CP },
  },
  P3: `Se il bambino si è divertito a seguire le strade, può continuare con altri labirinti vicini, come {nb1} oppure {nb2}. Ogni nuova meta rende la ricerca di nuovo emozionante e mantiene in movimento l'orientamento nello spazio, mentre esplora {GEN_ART} {GEN}. Ogni scheda si può stampare oppure giocare online, come preferite. Vivetela insieme con tempi distesi, senza cronometro e senza punteggio, soltanto per il piacere di cercare e trovare il cammino.`,
};
