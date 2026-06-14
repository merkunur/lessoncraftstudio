/* it-readiness-matching — Italian prose config for the matching fan (letter mode).
 * SINGLE mode 'letter', FRAMEWORK-BEARING:
 *   standard='RF.K.3.a' (Phoneme-Grapheme correspondence — the alphabetic act),
 *   level='classe-prima', strand 'Lettura' (the Indicazioni-nazionali early
 *   decoding/alphabetic competency).
 * Mechanic (source: de-readiness-matching.js): a tap-to-connect matching sheet —
 *   pictures on one side, single letters on the other; the child says the word, hears
 *   the first sound, and links each picture to the LETTER its name STARTS with
 *   (corrispondenza suono/lettera). Described GENERICALLY — no false specific phonics
 *   rule claim. No counting.
 * §22.1: strand 'Lettura' is shared with the LIVE wordsearch (also Lettura), so the
 *   mechanic + lexicon stay distinct — matching: abbinare / collegare / lettera
 *   iniziale / suono iniziale / la lettera / l'immagine; NOT wordsearch's griglia /
 *   parole nascoste / cerchiare, NOT crossword's cruciverba / incrocio.
 * Placeholder discipline (PURE-SUBSTITUTION renderer — no Italian morphology):
 *   {N_PL} appears ONLY in "immagini di {N_PL}" / "con {N_PL}" / "di {N_PL}" /
 *   "tra {N_PL}" slots; "le immagini/cose" = {GEN_ART} {GEN} (verb agreeing with
 *   {GEN} is PLURAL; no adjective/participle on {GEN}); "di/a/su/in/da + collective"
 *   via {DI_GEN} etc. */
'use strict';

const SKEL = [
  `«Con quale lettera inizia?» È la domanda che apre questa scheda per il bambino della classe prima. Da un lato della pagina ci sono immagini di {N_PL}, dall'altro alcune lettere singole. Il piccolo guarda una figura, dice ad alta voce il suo nome, ascolta il suono iniziale e collega l'immagine alla lettera con cui quel nome comincia. Così abbina ogni figura alla sua lettera giusta, mettendo in pratica la corrispondenza tra suono e lettera, il primo grande passo verso la lettura. Non si conta nulla: si ascolta e si riconosce. Suggeriscigli di pronunciare la parola lentamente, indugiando sul primo suono, e di cercare la lettera che lo rappresenta. Se sceglie una lettera che non va, sorridete insieme e si riprova con leggerezza. Quando immagine e lettera si ritrovano, la soddisfazione arriva da sola. Non c'è cronometro e non c'è punteggio: si lavora al proprio ritmo. Stampa la pagina, prendi una matita e accompagna il piccolo in questo primo gioco di lettere.`,

  `Dire la parola, ascoltarne l'inizio, trovare la lettera: ecco il cuore gentile di questa scheda della classe prima. Il bambino osserva {GEN_ART} {GEN} e accanto trova una fila di lettere singole, tutte mescolate. Per ogni figura pronuncia il nome, presta attenzione al primo suono e tira una linea fino alla lettera con cui inizia. È così che il piccolo allena la corrispondenza tra suono iniziale e lettera, una competenza preziosa che apre la porta alla lettura. Qui non si tratta di contare, ma di riconoscere con l'orecchio e con gli occhi. Invitalo a ripetere la parola sottovoce e a indicare quale lettera somiglia a quel suono. Anche uno sbaglio è un passo avanti: si cambia e si riprova con il sorriso. Ogni abbinamento riuscito è una piccola conquista che rafforza la fiducia. Senza voti e senza fretta, la voglia di leggere cresce un poco a ogni figura collegata.`,

  `Guarda l'immagine e ascolta il suo inizio! Su questa pagina pensata per la classe prima, le figure aspettano di ritrovare la loro lettera iniziale. Da una parte il bambino vede immagini di {N_PL}, dall'altra le lettere singole, sparse alla rinfusa. Il piccolo nomina ogni figura, coglie il primo suono della parola e lo collega alla lettera che lo rappresenta. Questo esercizio allena la corrispondenza tra suono e lettera, l'abilità di base che in classe prima accompagna i primi passi nella lettura. Niente numeri da contare: conta solo l'ascolto attento. Accompagnalo con domande leggere, come inizia questa parola, quale lettera senti per prima, e lasciagli lo spazio per pensarci. Se cambia idea, può scegliere di nuovo e proseguire sereno. Trovare la lettera giusta rafforza l'attenzione e la fiducia in sé. È un invito semplice a stare vicini e a gustare insieme la gioia di un suono riconosciuto.`,

  `Quale lettera apre questa parola? Per il bambino è subito un piccolo enigma da risolvere con l'orecchio. Osservando {GEN_ART} {GEN}, dice il nome di ciascuna figura e cerca, tra le lettere disponibili, quella con cui la parola comincia. Qui non si tratta di contare, ma di ascoltare: dal primo suono della parola, il piccolo individua la lettera giusta e la collega all'immagine. Abbinare figura e lettera diverte e allena la corrispondenza tra suono e segno, una serena preparazione alla lettura. Le lettere sono mescolate apposta, perché il gioco stia tutto nel riconoscere bene. Stimolalo a pronunciare il nome con calma e a chiedersi quale lettera sente per prima. Quando la coppia giusta si compone, la concentrazione del bambino si fa più salda. Vissuta accanto a una voce dolce e con tempi distesi, la scheda diventa un caldo momento in cui si impara ascoltando, senza alcuna corsa.`,

  `Da una parte le immagini colorate, dall'altra le lettere singole ben mescolate: ecco la pagina che attende il bambino della classe prima. Guardando le immagini di {N_PL}, il piccolo dice il nome di ogni figura, ascolta con attenzione il suono iniziale e lo collega alla lettera giusta. Non serve contare, basta ascoltare e riconoscere: con quale suono comincia la parola? A quale lettera corrisponde? Questo legame tra il primo suono e la lettera è un'abilità di base molto utile, e rende i bambini sicuri quando iniziano a leggere. Le lettere sono disposte in disordine proprio per invitare al riconoscimento attento. Incoraggialo a ripetere la parola sottovoce e a cercare la lettera che apre quel nome. Se una lettera non corrisponde, ne prova un'altra con serenità, senza fretta. Ogni abbinamento riuscito è una piccola gioia da festeggiare, in un clima caldo e paziente da vivere fianco a fianco.`,

  `Ascoltare il primo suono e trovare la lettera: ecco la sfida affettuosa di questa scheda della classe prima. Sulla pagina il bambino trova, da un lato, immagini di {N_PL} e, dall'altro, le lettere singole mescolate. Con calma nomina ciascuna figura, coglie il suono con cui la parola inizia e cerca la lettera che lo rappresenta. È un allenamento gentile per l'orecchio e per gli occhi: per scegliere bene, deve ascoltare l'inizio della parola e riconoscere la lettera giusta. Niente tempi da battere, conta il piacere di ascoltare. Sostienilo con domande dolci e lascialo esplorare la pagina seguendo il proprio passo. Se non trova subito la lettera giusta, riprova con tranquillità, senza che nessuno lo metta fretta. Ogni figura collegata alla sua lettera rafforza la corrispondenza tra suono e segno e la fiducia in se stesso. Vissuta a quattro mani, con parole gentili, questa attività diventa un momento prezioso di ascolto e scoperta.`,

  `Ogni parola comincia con un suono, e ogni suono ha la sua lettera. Su questa scheda per la classe prima, il bambino trova immagini di {N_PL} accanto a una fila di lettere singole, da rimettere in coppia. Dice il nome di ciascuna figura, ascolta come inizia e collega l'immagine alla lettera con cui quel nome comincia. Questa quieta attenzione al suono iniziale è una vera abilità di base: rafforza la corrispondenza tra suono e lettera, che al piccolo tornerà utile via via che impara a leggere parole intere. Non c'è gara né punteggio, soltanto l'ascolto attento e la voglia di provare. Stimolalo a pronunciare la parola con calma, a indicare la lettera che apre quel nome e a raccontare ciò che sente. Se una lettera non va, ne prende un'altra con calma e riparte. Trovare la coppia giusta è una conquista che fa bene alla fiducia, da assaporare insieme con tempi morbidi.`,

  `Dì la parola, ascolta l'inizio, trova la lettera: così semplice e incoraggiante è questa scheda. Il bambino osserva le immagini di {N_PL}, pronuncia il nome di ogni figura e cerca la lettera con cui quel nome comincia, collegandola all'immagine. Le lettere singole, mescolate sull'altro lato, invitano a riconoscere bene il suono iniziale prima di scegliere. Così il piccolo allena la corrispondenza tra suono e lettera, un primo passo sicuro verso la lettura. A ogni figura nominata, l'orecchio si fa più attento e la scelta più sicura. Lascialo ascoltare e riflettere al suo ritmo, quante volte desidera: può cambiare idea e proseguire sereno. Qui conta soltanto partecipare con gioia e con cura, senza alcuna pressione e senza voti. Stampa la pagina e vivi insieme a tuo figlio questo primo, sereno gioco di lettere e immagini da abbinare.`,
];

const P2 = [
  `«Con quale lettera inizia?» Da questa domanda parte il gioco. Il bambino guarda le immagini di {N_PL}, dice il nome di ciascuna figura, ascolta il suono iniziale e la collega alla lettera con cui comincia. Così allena la corrispondenza tra suono e lettera, un primo passo verso la lettura. Niente da contare e niente cronometro: solo il piacere di ritrovare immagine e lettera, al proprio ritmo e senza voti.`,

  `Dire la parola e trovare la lettera: osservando {GEN_ART} {GEN}, il piccolo ascolta come inizia ogni nome e tira una linea fino alla lettera giusta. È un tranquillo esercizio di ascolto e riconoscimento, da gustare insieme con parole gentili e tutto il tempo che serve. Se sceglie una lettera che non va, se ne prova un'altra con il sorriso, allenando la corrispondenza tra suono iniziale e lettera.`,

  `Ascolta l'inizio della parola: collegando le immagini di {N_PL} alla loro lettera iniziale, il bambino impara a riconoscere il primo suono e a trovare la lettera che lo rappresenta. Niente gara e niente numeri da contare, soltanto l'orecchio attento e la gioia di una coppia ritrovata. Suggeriscigli di pronunciare il nome con calma e di cercare la lettera con cui comincia.`,

  `Su questa pagina il piccolo trova figure e lettere singole mescolate. Osservando {GEN_ART} {GEN}, per ogni immagine ascolta il suono iniziale e sceglie la lettera con cui il nome comincia, allenando la corrispondenza tra suono e segno. È un dolce momento di ascolto, perfetto da vivere fianco a fianco: lascialo provare al suo ritmo, festeggiate ogni coppia ritrovata e proseguite senza alcuna pressione.`,

  `Riconoscere il suono iniziale: a ogni immagine corrisponde la lettera con cui il suo nome comincia. Il bambino dice la parola, ascolta come inizia e la unisce alla lettera giusta, esercitando la corrispondenza tra suono e lettera. Senza tempi da battere e senza punteggi, conta soltanto la gioia di provare; quando figura e lettera si ritrovano, la fiducia in sé cresce un poco.`,

  `Questo gioco invita il piccolo a collegare le immagini di {N_PL} alla loro lettera iniziale. Con serenità dice il nome di ogni figura, ascolta il primo suono e individua, tra le lettere mescolate, quella con cui la parola comincia. È un caldo momento di ascolto e scoperta, da condividere con dolcezza: accompagnalo con domande leggere, lasciagli lo spazio per pensare e incoraggia ogni tentativo, anche quando deve cambiare scelta.`,

  `Ogni parola comincia con un suono: il bambino confronta le immagini di {N_PL} con le lettere singole e ritrova ogni coppia ascoltando l'inizio del nome. Esercita la corrispondenza tra suono e lettera con calma, al passo che preferisce, senza alcuna pressione addosso; ogni abbinamento riuscito è una piccola conquista che lo riempie di orgoglio e voglia di continuare ad ascoltare.`,
];

const H1 = 'Abbina le lettere con {H1} – per la classe prima';
const CAR = 'Abbina le lettere – ';

module.exports = {
  type: 'matching',
  eyebrow: 'Scheda: Abbina le lettere',
  strand: 'Lettura',
  standard: 'RF.K.3.a',
  level: 'classe-prima',
  slotWord: 'abbina-lettere',
  h1: (mk) => H1,
  carousel: (mk, themeH1) => CAR + themeH1,
  modes: {
    'letter': { SKEL: SKEL, P2: P2 },
  },
  P3: `Se a tuo figlio piace ascoltare i suoni e trovare le lettere, prova anche le altre schede con {nb1} o con {nb2}, sempre da fare con calma e con il sorriso. Nella nostra raccolta trovi tante altre schede di lettere con {GEN_ART} {GEN}, gratuite e pronte da stampare oppure da giocare online. Scegli il tema che ama di più, prendi una matita e regalagli un sereno momento di prime lettere, senza fretta e senza punteggi.`,
};
