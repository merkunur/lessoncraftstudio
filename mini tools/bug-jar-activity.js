/* =====================================================================
   bug-jar-activity.js — ACTIVITY #16 of the one-by-one rebuild:
   "The Wondering Jar — guess, then count to find out" (K.CC.B.5) —
   THE BUG JAR. Design sheet: docs/activities-rebuild/016-bug-jar.md
   ---------------------------------------------------------------------
   A packed jar of library bugs stands beside a jar with exactly ten of
   the same bugs (five up to ten). THE INVENTION IS THAT JAR OF TEN: the
   child guesses against it — fewer, or more? — then pours the packed jar
   out; the bugs land on a tray where they can be counted (rows, an
   array, a ring, a scatter), the child ticks each bug while counting (a
   tick, never a number) and sets the jar's label with − and +. The label
   starts at ten, so "ten and four more" is a way there. Check tells the
   count and holds it against the guess — never a score. Miss 2 numbers
   the bugs up to the last one, which shows "?". No mascot is drawn.

   ACTIVITY LAYER ONLY: the model is bug-jar-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.BugJarActivity.st / ._order / ._pool / .POUR_MS.
   ===================================================================== */
'use strict';

var BugJarActivity = {
  id: 'bug-jar',
  apparatusClasses: ['bj-'],

  strings: {
    title:          {en:'The Wondering Jar',de:'Das Schätzglas',fr:'Le bocal mystère',es:'El frasco misterioso',pt:'O pote misterioso',it:'Il barattolo misterioso',nl:'De raadpot',sv:'Gissningsburken',da:'Gætteglasset',no:'Gjetteglasset',fi:'Arvauspurkki'},
    instruction:    {en:'Pour the jar out, tick each bug as you count, and set the label to how many. With the guess on, guess first: fewer bugs than in the other jar, or more?',de:'Schütte das Glas aus, hake beim Zählen jedes Tierchen ab und stelle auf dem Etikett ein, wie viele es sind. Mit Raten: Rate zuerst, ob es weniger Tierchen sind als im anderen Glas oder mehr.',fr:'Vide le bocal, coche chaque petite bête en comptant et indique combien il y en a sur l’étiquette. Si l’on devine d’abord\u00a0: moins de petites bêtes que dans l’autre bocal, ou plus\u202f?',es:'Vacía el frasco, marca cada bicho mientras cuentas y pon en la etiqueta cuántos hay. Si se adivina primero: ¿menos bichos que en el otro frasco, o más?',pt:'Esvazie o pote, marque cada bichinho enquanto conta e coloque na etiqueta quantos são. Com palpite: primeiro, menos bichinhos que no outro pote, ou mais?',it:'Svuota il barattolo, segna ogni animaletto mentre conti e scrivi sull’etichetta quanti sono. Con l’ipotesi: prima indovina se sono meno che nell’altro barattolo o di più.',nl:'Kieper de pot leeg, vink elk beestje af terwijl je telt en zet op het etiket hoeveel het er zijn. Met raden: raad eerst of het er minder zijn dan in de andere pot, of meer.',sv:'Häll ut burken, bocka av varje småkryp medan du räknar och ställ in på etiketten hur många det är. Med gissning: gissa först om det är färre än i den andra burken eller fler.',da:'Hæld glasset ud, sæt flueben ved hvert kryb, mens du tæller, og sæt etiketten til, hvor mange der er. Med gæt: gæt først, om der er færre end i det andet glas, eller flere.',no:'Hell ut glasset, kryss av hvert småkryp mens du teller, og still inn etiketten på hvor mange det er. Med gjetning: gjett først om det er færre enn i det andre glasset, eller flere.',fi:'Kaada purkki, merkitse jokainen ötökkä laskiessasi ja aseta etikettiin, montako niitä on. Arvauksen kanssa: arvaa ensin, onko ötököitä vähemmän kuin toisessa purkissa vai enemmän.'},
    prompt:         {en:'How many bugs are in the jar? Guess, pour, count, set the label, then press Check.',de:'Wie viele Tierchen sind im Glas? Raten, ausschütten, zählen, Etikett einstellen – dann auf Prüfen drücken.',fr:'Combien de petites bêtes dans le bocal ? Devine, vide, compte, règle l’étiquette, puis appuie sur Vérifier.',es:'¿Cuántos bichos hay en el frasco? Adivina, vacía, cuenta, pon la etiqueta y luego oprime Comprobar.',pt:'Quantos bichinhos há no pote? Dê um palpite, esvazie, conte, ajuste a etiqueta e depois aperte Verificar.',it:'Quanti animaletti ci sono nel barattolo? Indovina, svuota, conta, regola l’etichetta, poi premi Verifica.',nl:'Hoeveel beestjes zitten er in de pot? Raad, kieper leeg, tel, zet het etiket goed en druk dan op Controleer.',sv:'Hur många småkryp finns i burken? Gissa, häll ut, räkna, ställ in etiketten och tryck sedan på Kontrollera.',da:'Hvor mange kryb er der i glasset? Gæt, hæld ud, tæl, sæt etiketten, og tryk så på Tjek.',no:'Hvor mange småkryp er det i glasset? Gjett, hell ut, tell, still inn etiketten, og trykk så på Sjekk.',fi:'Montako ötökkää purkissa on? Arvaa, kaada, laske, aseta etiketti ja paina sitten Tarkista.'},
    jarLabel:       {en:'The jar of bugs: tap to pour it out',de:'Das Glas mit Tierchen: Tippe, um es auszuschütten',fr:'Le bocal de petites bêtes : touche pour le vider',es:'El frasco de bichos: toca para vaciarlo',pt:'O pote de bichinhos: toque para esvaziá-lo',it:'Il barattolo di animaletti: tocca per svuotarlo',nl:'De pot met beestjes: tik om hem leeg te kiepen',sv:'Burken med småkryp: tryck för att hälla ut den',da:'Glasset med kryb: tryk for at hælde det ud',no:'Glasset med småkryp: trykk for å helle det ut',fi:'Ötökkäpurkki: napauta kaataaksesi sen'},
    benchLabel:     {en:'A jar with {b} bugs',de:'Ein Glas mit {b} Tierchen',fr:'Un bocal avec {b} petites bêtes',es:'Un frasco con {b} bichos',pt:'Um pote com {b} bichinhos',it:'Un barattolo con {b} animaletti',nl:'Een pot met {b} beestjes',sv:'En burk med {b} småkryp',da:'Et glas med {b} kryb',no:'Et glass med {b} småkryp',fi:'Purkki, jossa on {b} ötökkää'},
    guessFewer:     {en:'Fewer than {b}',de:'Weniger als {b}',fr:'Moins de {b}',es:'Menos de {b}',pt:'Menos de {b}',it:'Meno di {b}',nl:'Minder dan {b}',sv:'Färre än {b}',da:'Færre end {b}',no:'Færre enn {b}',fi:'Vähemmän kuin {b}'},
    guessMore:      {en:'More than {b}',de:'Mehr als {b}',fr:'Plus de {b}',es:'Más de {b}',pt:'Mais de {b}',it:'Più di {b}',nl:'Meer dan {b}',sv:'Fler än {b}',da:'Flere end {b}',no:'Flere enn {b}',fi:'Enemmän kuin {b}'},
    pourBtn:        {en:'Pour it out',de:'Ausschütten',fr:'Vider le bocal',es:'Vaciar el frasco',pt:'Esvaziar o pote',it:'Svuota il barattolo',nl:'Leegkiepen',sv:'Häll ut',da:'Hæld ud',no:'Hell ut',fi:'Kaada'},
    trayLabel:      {en:'The bugs, poured out',de:'Die ausgeschütteten Tierchen',fr:'Les petites bêtes, sorties du bocal',es:'Los bichos, fuera del frasco',pt:'Os bichinhos, fora do pote',it:'Gli animaletti, fuori dal barattolo',nl:'De beestjes, uit de pot',sv:'Småkrypen, utanför burken',da:'Krybene, ude af glasset',no:'Småkrypene, ute av glasset',fi:'Purkista kaadetut ötökät'},
    bugTick:        {en:'Tick this bug as counted',de:'Dieses Tierchen als gezählt abhaken',fr:'Cocher cette petite bête comme comptée',es:'Marcar este bicho como contado',pt:'Marcar este bichinho como contado',it:'Segna questo animaletto come contato',nl:'Dit beestje afvinken als geteld',sv:'Bocka av småkrypet som räknat',da:'Sæt flueben ved krybet som talt',no:'Kryss av småkrypet som telt',fi:'Merkitse tämä ötökkä lasketuksi'},
    minus:          {en:'One less',de:'Eins weniger',fr:'Un de moins',es:'Uno menos',pt:'Um a menos',it:'Uno in meno',nl:'Eén minder',sv:'En mindre',da:'Én mindre',no:'Én mindre',fi:'Yksi vähemmän'},
    plus:           {en:'One more',de:'Eins mehr',fr:'Un de plus',es:'Uno más',pt:'Um a mais',it:'Uno in più',nl:'Eén meer',sv:'En till',da:'Én mere',no:'Én til',fi:'Yksi lisää'},
    answerLabel:    {en:'The label says {v}',de:'Auf dem Etikett steht {v}',fr:'L’étiquette indique {v}',es:'La etiqueta dice {v}',pt:'A etiqueta diz {v}',it:'L’etichetta dice {v}',nl:'Op het etiket staat {v}',sv:'Etiketten visar {v}',da:'Etiketten viser {v}',no:'Etiketten viser {v}',fi:'Etiketissä lukee {v}'},
    clearTicks:     {en:'Clear the ticks',de:'Haken löschen',fr:'Effacer les coches',es:'Borrar las marcas',pt:'Apagar as marcas',it:'Cancella i segni',nl:'Vinkjes wissen',sv:'Ta bort bockarna',da:'Fjern fluebenene',no:'Fjern kryssene',fi:'Poista merkit'},
    chipFewer:      {en:'Your guess: fewer than {b}',de:'Du hast geraten: weniger als {b}',fr:'Tu as deviné : moins de {b}',es:'Adivinaste: menos de {b}',pt:'Seu palpite: menos de {b}',it:'La tua ipotesi: meno di {b}',nl:'Jouw gok: minder dan {b}',sv:'Din gissning: färre än {b}',da:'Dit gæt: færre end {b}',no:'Din gjetning: færre enn {b}',fi:'Arvauksesi: vähemmän kuin {b}'},
    chipMore:       {en:'Your guess: more than {b}',de:'Du hast geraten: mehr als {b}',fr:'Tu as deviné : plus de {b}',es:'Adivinaste: más de {b}',pt:'Seu palpite: mais de {b}',it:'La tua ipotesi: più di {b}',nl:'Jouw gok: meer dan {b}',sv:'Din gissning: fler än {b}',da:'Dit gæt: flere end {b}',no:'Din gjetning: flere enn {b}',fi:'Arvauksesi: enemmän kuin {b}'},
    verdictMoreYes: {en:'More than {b}, just as you guessed!',de:'Mehr als {b} – genau wie du geraten hast!',fr:'Plus de {b}, comme tu l’avais deviné !',es:'¡Más de {b}, tal como adivinaste!',pt:'Mais de {b}, como você imaginou!',it:'Più di {b}, proprio come avevi indovinato!',nl:'Meer dan {b}, precies zoals je had geraden!',sv:'Fler än {b}, precis som du gissade!',da:'Flere end {b}, præcis som du gættede!',no:'Flere enn {b}, akkurat som du gjettet!',fi:'Enemmän kuin {b}, juuri kuten arvasit!'},
    verdictMoreNo:  {en:'More than {b}: more than you guessed!',de:'Mehr als {b} – mehr, als du geraten hast!',fr:'Plus de {b} : plus que tu ne pensais !',es:'¡Más de {b}: más de lo que adivinaste!',pt:'Mais de {b}: mais do que você imaginou!',it:'Più di {b}: più di quanti pensavi!',nl:'Meer dan {b}: meer dan je had geraden!',sv:'Fler än {b}: fler än du gissade!',da:'Flere end {b}: flere, end du gættede!',no:'Flere enn {b}: flere enn du gjettet!',fi:'Enemmän kuin {b}: enemmän kuin arvasit!'},
    verdictFewerYes:{en:'Fewer than {b}, just as you guessed!',de:'Weniger als {b} – genau wie du geraten hast!',fr:'Moins de {b}, comme tu l’avais deviné !',es:'¡Menos de {b}, tal como adivinaste!',pt:'Menos de {b}, como você imaginou!',it:'Meno di {b}, proprio come avevi indovinato!',nl:'Minder dan {b}, precies zoals je had geraden!',sv:'Färre än {b}, precis som du gissade!',da:'Færre end {b}, præcis som du gættede!',no:'Færre enn {b}, akkurat som du gjettet!',fi:'Vähemmän kuin {b}, juuri kuten arvasit!'},
    verdictFewerNo: {en:'Fewer than {b}: fewer than you guessed!',de:'Weniger als {b} – weniger, als du geraten hast!',fr:'Moins de {b} : moins que tu ne pensais !',es:'¡Menos de {b}: menos de lo que adivinaste!',pt:'Menos de {b}: menos do que você imaginou!',it:'Meno di {b}: meno di quanti pensavi!',nl:'Minder dan {b}: minder dan je had geraden!',sv:'Färre än {b}: färre än du gissade!',da:'Færre end {b}: færre, end du gættede!',no:'Færre enn {b}: færre enn du gjettet!',fi:'Vähemmän kuin {b}: vähemmän kuin arvasit!'},
    hintGuess:      {en:'Guess first: fewer or more than in the other jar?',de:'Rate zuerst: weniger oder mehr als im anderen Glas?',fr:'Devine d’abord : moins ou plus que dans l’autre bocal ?',es:'Primero adivina: ¿menos o más que en el otro frasco?',pt:'Primeiro dê um palpite: menos ou mais que no outro pote?',it:'Prima indovina: meno o più che nell’altro barattolo?',nl:'Raad eerst: minder of meer dan in de andere pot?',sv:'Gissa först: färre eller fler än i den andra burken?',da:'Gæt først: færre eller flere end i det andet glas?',no:'Gjett først: færre eller flere enn i det andre glasset?',fi:'Arvaa ensin: vähemmän vai enemmän kuin toisessa purkissa?'},
    hintPour:       {en:'Pour the jar out, then count the bugs.',de:'Schütte das Glas aus und zähle dann die Tierchen.',fr:'Vide le bocal, puis compte les petites bêtes.',es:'Vacía el frasco y luego cuenta los bichos.',pt:'Esvazie o pote e depois conte os bichinhos.',it:'Svuota il barattolo, poi conta gli animaletti.',nl:'Kieper de pot leeg en tel dan de beestjes.',sv:'Häll ut burken och räkna sedan småkrypen.',da:'Hæld glasset ud, og tæl så krybene.',no:'Hell ut glasset og tell så småkrypene.',fi:'Kaada purkki ja laske sitten ötökät.'},
    hintSet:        {en:'Count the bugs, then set the label with − and +.',de:'Zähle die Tierchen und stelle dann das Etikett mit − und + ein.',fr:'Compte les petites bêtes, puis règle l’étiquette avec − et +.',es:'Cuenta los bichos y luego pon la etiqueta con − y +.',pt:'Conte os bichinhos e depois ajuste a etiqueta com − e +.',it:'Conta gli animaletti, poi regola l’etichetta con − e +.',nl:'Tel de beestjes en zet dan het etiket goed met − en +.',sv:'Räkna småkrypen och ställ sedan in etiketten med − och +.',da:'Tæl krybene, og sæt så etiketten med − og +.',no:'Tell småkrypene og still så inn etiketten med − og +.',fi:'Laske ötökät ja aseta sitten etiketti painikkeilla − ja +.'},
    hintTicks:      {en:'Some bugs have no tick yet. Tick each one as you count.',de:'Manche Tierchen haben noch keinen Haken. Hake beim Zählen jedes ab.',fr:'Certaines petites bêtes ne sont pas encore cochées. Coche chacune en comptant.',es:'Algunos bichos todavía no tienen marca. Marca cada uno mientras cuentas.',pt:'Alguns bichinhos ainda não estão marcados. Marque cada um enquanto conta.',it:'Alcuni animaletti non sono ancora segnati. Segnali uno per uno mentre conti.',nl:'Sommige beestjes hebben nog geen vinkje. Vink er elk af terwijl je telt.',sv:'Några småkryp har ingen bock än. Bocka av vart och ett medan du räknar.',da:'Nogle kryb har ikke fået flueben endnu. Sæt flueben ved hvert, mens du tæller.',no:'Noen småkryp har ikke kryss ennå. Kryss av hvert enkelt mens du teller.',fi:'Osa ötököistä on vielä merkitsemättä. Merkitse jokainen laskiessasi.'},
    hintMore:       {en:'Fewer than that. Count again, touching each bug once.',de:'Weniger als das. Zähle noch einmal und tippe jedes Tierchen einmal an.',fr:'Moins que ça. Recompte en touchant chaque petite bête une seule fois.',es:'Menos que eso. Cuenta otra vez y toca cada bicho una sola vez.',pt:'Menos que isso. Conte de novo, tocando cada bichinho uma vez só.',it:'Meno di così. Conta di nuovo e tocca ogni animaletto una volta sola.',nl:'Minder dan dat. Tel opnieuw en raak elk beestje één keer aan.',sv:'Färre än så. Räkna igen och rör vid varje småkryp en gång.',da:'Færre end det. Tæl igen, og rør ved hvert kryb én gang.',no:'Færre enn det. Tell igjen og ta på hvert småkryp én gang.',fi:'Vähemmän kuin tuo. Laske uudelleen ja kosketa jokaista ötökkää kerran.'},
    hintFewer:      {en:'More than that. Count again, touching each bug once.',de:'Mehr als das. Zähle noch einmal und tippe jedes Tierchen einmal an.',fr:'Plus que ça. Recompte en touchant chaque petite bête une seule fois.',es:'Más que eso. Cuenta otra vez y toca cada bicho una sola vez.',pt:'Mais que isso. Conte de novo, tocando cada bichinho uma vez só.',it:'Più di così. Conta di nuovo e tocca ogni animaletto una volta sola.',nl:'Meer dan dat. Tel opnieuw en raak elk beestje één keer aan.',sv:'Fler än så. Räkna igen och rör vid varje småkryp en gång.',da:'Flere end det. Tæl igen, og rør ved hvert kryb én gang.',no:'Flere enn det. Tell igjen og ta på hvert småkryp én gang.',fi:'Enemmän kuin tuo. Laske uudelleen ja kosketa jokaista ötökkää kerran.'},
    hintLast:       {en:'The bugs are numbered up to the last one. What number goes on the last bug? That is how many.',de:'Die Tierchen sind bis zum letzten nummeriert. Welche Zahl gehört zum letzten? So viele sind es.',fr:'Les petites bêtes sont numérotées jusqu’à la dernière. Quel nombre va sur la dernière ? C’est combien il y en a.',es:'Los bichos están numerados hasta el último. ¿Qué número le toca al último? Esos son los que hay.',pt:'Os bichinhos estão numerados até o último. Que número vai no último? É quantos são.',it:'Gli animaletti sono numerati fino all’ultimo. Quale numero va sull’ultimo? Sono tanti così.',nl:'De beestjes zijn genummerd tot het laatste. Welk getal hoort bij het laatste? Zoveel zijn het er.',sv:'Småkrypen är numrerade fram till det sista. Vilket tal hör till det sista? Så många är det.',da:'Krybene er nummereret frem til det sidste. Hvilket tal hører til det sidste? Så mange er der.',no:'Småkrypene er nummerert fram til det siste. Hvilket tall hører til det siste? Så mange er det.',fi:'Ötököt on numeroitu viimeiseen asti. Mikä luku kuuluu viimeiselle? Niin monta niitä on.'},
    celebrate:      {en:'Yes — {n}!',de:'Ja – {n}!',fr:'Oui — {n} !',es:'¡Sí: {n}!',pt:'Isso: {n}!',it:'Sì: {n}!',nl:'Ja – {n}!',sv:'Ja – {n}!',da:'Ja – {n}!',no:'Ja – {n}!',fi:'Kyllä – {n}!'},
    setRange:       {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo10:      {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    rangeTo16:      {en:'Up to 16',de:'Bis 16',fr:'Jusqu’à 16',es:'Hasta 16',pt:'Até 16',it:'Fino a 16',nl:'Tot en met 16',sv:'Upp till 16',da:'Op til 16',no:'Opptil 16',fi:'16:een asti'},
    setGuess:       {en:'The guess',de:'Das Raten',fr:'Deviner',es:'Adivinar',pt:'O palpite',it:'L’ipotesi',nl:'Het raden',sv:'Gissningen',da:'Gættet',no:'Gjetningen',fi:'Arvaus'},
    guessOn:        {en:'Guess first',de:'Zuerst raten',fr:'Deviner d’abord',es:'Adivinar primero',pt:'Palpite primeiro',it:'Prima indovinare',nl:'Eerst raden',sv:'Gissa först',da:'Gæt først',no:'Gjett først',fi:'Arvaa ensin'},
    guessOff:       {en:'No guess',de:'Ohne Raten',fr:'Sans deviner',es:'Sin adivinar',pt:'Sem palpite',it:'Senza ipotesi',nl:'Zonder raden',sv:'Utan gissning',da:'Uden gæt',no:'Uten gjetning',fi:'Ei arvausta'}
  },

  defaults: { range: 'to16', guess: 'on' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to10', labelKey: 'rangeTo10' }, { value: 'to16', labelKey: 'rangeTo16' }] },
    { key: 'guess', type: 'choice', labelKey: 'setGuess', options: [{ value: 'on', labelKey: 'guessOn' }, { value: 'off', labelKey: 'guessOff' }] }
  ],

  POUR_MS: 620,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null;
    injectBugJarCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(BugJarCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the jars stay empty */ });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return BugJarCore.POOLS[r] ? r : 'to16'; },
  _guessOn: function () { var g = this.api && this.api.settings && this.api.settings.guess; return g !== 'off'; },
  _ensurePool: function () { var key = this._range() + ':' + this._guessOn(); if (!this._pool || this._poolKey !== key) { this._pool = BugJarCore.rounds(this._range(), 'bj', this._guessOn()); this._poolKey = key; this._order = null; } return this._pool; },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'bug-jar.' + r.id,
      promptKey: 'prompt',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = BugJarCore.newState(r); },
      check: function (tool) { var res = BugJarCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return BugJarCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  _t: function (key, args) { return String(this.api.t(key)).replace(/\{(\w+)\}/g, function (m, k) { return args && k in args ? args[k] : m; }); },   /* the shell's t() does not fill placeholders */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = BugJarCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to16', 'bj')[0]);
    var wrap = api.el('div', 'bj-wrap'); this._wrap = wrap;

    /* the jars: the packed one (a button: pour) and the jar of ten (a reference, not a control) */
    var jars = api.el('div', 'bj-jars');
    var mj = api.el('button', 'bj-jar bj-mystery'); mj.type = 'button'; mj.setAttribute('aria-label', t('jarLabel'));
    mj.addEventListener('click', function () { self._pour(); });
    mj.innerHTML = '<span class="bj-lid" aria-hidden="true"></span><span class="bj-glass" aria-hidden="true"></span><span class="bj-tag" aria-hidden="true">?</span>';
    var bj = api.el('div', 'bj-jar bj-bench'); bj.setAttribute('role', 'img');
    bj.innerHTML = '<span class="bj-lid" aria-hidden="true"></span><span class="bj-glass" aria-hidden="true"></span><span class="bj-tag" aria-hidden="true"></span>';
    jars.appendChild(mj); jars.appendChild(bj);
    this._mj = mj; this._bj = bj;
    wrap.appendChild(jars);
    /* the guess and the pour */
    var gRow = api.el('div', 'bj-guess');
    var gf = api.el('button', 'bj-gbtn'); gf.type = 'button'; gf.addEventListener('click', function () { self._guess('fewer'); });
    var gm = api.el('button', 'bj-gbtn'); gm.type = 'button'; gm.addEventListener('click', function () { self._guess('more'); });
    gRow.appendChild(gf); gRow.appendChild(gm); this._gf = gf; this._gm = gm;
    wrap.appendChild(gRow);
    var pour = api.el('button', 'bj-pour'); pour.type = 'button'; pour.textContent = t('pourBtn');
    pour.addEventListener('click', function () { self._pour(); });
    this._pourBtn = pour; wrap.appendChild(pour);

    /* after the pour: the guess, the tray, the label */
    var top = api.el('div', 'bj-top');
    var chip = api.el('div', 'bj-chip'); this._chip = chip; top.appendChild(chip);
    var clr = api.el('button', 'bj-clear'); clr.type = 'button'; clr.setAttribute('aria-label', t('clearTicks'));
    clr.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M4 4v5h5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span>';
    clr.querySelector('span').textContent = t('clearTicks');
    clr.addEventListener('click', function () { if (BugJarCore.clearTicks(self.st)) { self.api.sound(300); self._paint(); } });
    this._clr = clr; top.appendChild(clr);
    wrap.appendChild(top);
    var tray = api.el('div', 'bj-tray'); tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', t('trayLabel'));
    this._tray = tray; this._bugs = [];
    for (var k = 0; k < 20; k++) {
      (function (i) {
        var b = api.el('button', 'bj-bug'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('bugTick')); b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () { self._tick(i); });
        var tk = api.el('span', 'bj-tick'); tk.setAttribute('aria-hidden', 'true'); b.appendChild(tk);
        var nb = api.el('span', 'bj-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
        tray.appendChild(b); self._bugs.push(b);
      }(k));
    }
    wrap.appendChild(tray);
    var lab = api.el('div', 'bj-label');
    var minus = api.el('button', 'bj-step'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', t('minus'));
    minus.addEventListener('click', function () { self._step(-1); });
    var card = api.el('div', 'bj-card'); card.setAttribute('role', 'status');
    var plus = api.el('button', 'bj-step'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', t('plus'));
    plus.addEventListener('click', function () { self._step(1); });
    lab.appendChild(minus); lab.appendChild(card); lab.appendChild(plus);
    this._minus = minus; this._card = card; this._plus = plus;
    wrap.appendChild(lab);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var L = this._L = BugJarCore.layout(this._width()), w = this._wrap;
    ['wide', 'stack'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.classList.toggle('is-tight', !!L.tight);
    w.style.setProperty('--bj-cell', L.cell + 'px');
    w.style.setProperty('--bj-pic', L.pic + 'px');
    w.style.setProperty('--bj-tw', L.trayW + 'px');
    w.style.setProperty('--bj-th', L.trayH + 'px');
    w.style.setProperty('--bj-jw', L.jarW + 'px');
    w.style.setProperty('--bj-jh', L.jarH + 'px');
    this._spotsFor = null; this._packFor = null;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },
  _img: function (noun) { var img = LCSPictures.img(this._theme, noun, this.api.lang, { plural: false }); img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun); return img; },
  /* fill a jar's glass with a packed heap of bugs (so it cannot be counted) */
  _fillJar: function (jar, count, seed) {
    var glass = jar.querySelector('.bj-glass'), noun = this.st.noun, L = this._L, key = seed + ':' + count + ':' + noun + ':' + L.jarW;
    if (jar._packed === key) return;
    glass.innerHTML = '';
    if (!this._theme || !this._theme.nouns[noun]) return;
    var bodyW = L.jarW, bodyH = L.jarH * 0.86;
    BugJarCore.jarPack(count, seed).forEach(function (p, i) {
      var img = this._img(noun), sz = Math.round(p.size * bodyW);
      img.className = 'bj-packed'; img.style.width = sz + 'px'; img.style.height = sz + 'px';
      img.style.left = (p.fx * bodyW - sz / 2) + 'px'; img.style.top = (p.fy * bodyH - sz / 2) + 'px';
      img.style.transform = 'rotate(' + p.tilt + 'deg)'; img.style.zIndex = String(i);
      glass.appendChild(img);
    }, this);
    jar._packed = key;
  },

  _paint: function () {
    var st = this.st, C = BugJarCore, L = this._L, t = this.api.t, self = this;
    var w = this._wrap, poured = st.phase === 'count';
    w.classList.toggle('is-jar', !poured);
    w.classList.toggle('is-count', poured);
    w.classList.toggle('is-done', st.done);
    w.classList.toggle('no-guess', !st.guessOn);
    /* the jars */
    if (!poured) {
      this._fillJar(this._mj, st.n, st.id + ':m');
      this._fillJar(this._bj, st.bench, st.id + ':b');
      this._bj.querySelector('.bj-tag').textContent = String(st.bench);
      this._bj.setAttribute('aria-label', this._t('benchLabel', { b: st.bench }));
      this._gf.textContent = this._t('guessFewer', { b: st.bench });
      this._gm.textContent = this._t('guessMore', { b: st.bench });
      this._gf.setAttribute('aria-pressed', String(st.guess === 'fewer'));
      this._gm.setAttribute('aria-pressed', String(st.guess === 'more'));
      this._gf.classList.toggle('is-on', st.guess === 'fewer');
      this._gm.classList.toggle('is-on', st.guess === 'more');
      this._pourBtn.disabled = !C.canPour(st);
      this._mj.classList.toggle('can-pour', C.canPour(st));
    }
    /* the guess chip, then the verdict */
    var v = C.verdict(st);
    this._chip.hidden = !st.guessOn || !st.guess;
    this._chip.textContent = v ? this._t(v.key, { b: st.bench }) : (st.guess ? this._t(st.guess === 'more' ? 'chipMore' : 'chipFewer', { b: st.bench }) : '');
    this._chip.classList.toggle('is-verdict', !!v);
    this._clr.hidden = st.done || !st.seq.length;
    /* the tray */
    if (this._spotsFor !== st.id + ':' + L.mode) { this._spots = C.traySpots(st, L); this._spotsFor = st.id + ':' + L.mode; }
    var nums = C.bugNums(st, this._spots);
    for (var k = 0; k < 20; k++) {
      var b = this._bugs[k], on = poured && k < st.n;
      b.hidden = !on;
      if (!on) continue;
      var s = this._spots[k];
      b.style.left = s.x + 'px'; b.style.top = s.y + 'px'; b.style.setProperty('--bj-tilt', s.tilt + 'deg');
      var img = b.querySelector('img');
      if (img && img.getAttribute('data-noun') !== st.noun) { img.remove(); img = null; }
      if (!img && this._theme && this._theme.nouns[st.noun]) { img = this._img(st.noun); img.className = 'bj-pic'; b.insertBefore(img, b.firstChild); }
      b.classList.toggle('is-ticked', !!st.ticks[k]);
      b.setAttribute('aria-pressed', String(!!st.ticks[k]));
      b.disabled = st.done;
      var nb = b.querySelector('.bj-num');
      nb.textContent = nums[k]; nb.classList.toggle('is-on', !!nums[k]); nb.classList.toggle('is-q', nums[k] === '?');
      nb.classList.toggle('is-gold', st.done && nums[k] === String(st.n));
    }
    /* the label */
    var val = C.shown(st);
    this._card.textContent = String(val);
    this._card.classList.toggle('is-set', st.answer !== null);
    this._card.setAttribute('aria-label', this._t('answerLabel', { v: val }));
    this._minus.disabled = st.done || val <= 1;
    this._plus.disabled = st.done || val >= st.max;
  },

  /* ---------------- the hand ---------------- */
  _guess: function (g) {
    if (!BugJarCore.guess(this.st, g)) return;
    this.api.sound(g === 'more' ? 560 : 420);
    this._paint();
    this.api.track('guess', { n: this.st.n, guess: g });
  },
  _pour: function () {
    var st = this.st, self = this;
    if (!BugJarCore.canPour(st)) { if (st.phase === 'jar') bounce(this._wrap.querySelector('.bj-guess'), 'bj-nudge'); return; }
    var from = [].slice.call(this._mj.querySelectorAll('.bj-packed')).map(function (im) { return im.getBoundingClientRect(); });
    BugJarCore.pour(st);
    this.api.sound(380);
    this._paint();
    /* the bugs fly from the heap in the jar to their places on the tray */
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && from.length) {
      for (var k = 0; k < st.n; k++) {
        var im = this._bugs[k].querySelector('img'), f = from[k];
        if (!im || !f || !im.animate) continue;
        var r = im.getBoundingClientRect();
        if (!r.width) continue;
        var dx = (f.left + f.width / 2) - (r.left + r.width / 2), dy = (f.top + f.height / 2) - (r.top + r.height / 2), sc = f.width / r.width;
        im.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')', opacity: 0.4 }, { transform: 'none', opacity: 1 }], { duration: self.POUR_MS, delay: k * 25, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'backwards' });
      }
    }
    this.api.track('pour', { n: st.n, guess: st.guess });
  },
  _tick: function (k) {
    if (!BugJarCore.tick(this.st, k)) return;
    this.api.sound(this.st.ticks[k] ? 520 : 360);
    this._paint();
    if (this.st.ticks[k]) bounce(this._bugs[k], 'bj-hop');
  },
  _step: function (d) {
    if (!BugJarCore.step(this.st, d)) return;
    this.api.sound(d > 0 ? 500 : 400);
    this._paint();
    bounce(this._card, 'bj-flip');
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'pour' || res.slip === 'set') return;
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses, guess: st.guess, ticks: st.seq.length });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var bjCssDone = false;
function injectBugJarCSS() {
  if (bjCssDone || typeof document === 'undefined') return;
  bjCssDone = true;
  var css = ''
  + '.bj-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--bj-cell:100px;--bj-pic:96px;--bj-tw:416px;--bj-th:416px;--bj-jw:220px;--bj-jh:286px;}'
  + '.bj-wrap.is-jar .bj-top,.bj-wrap.is-jar .bj-tray,.bj-wrap.is-jar .bj-label{display:none;}'
  + '.bj-wrap.is-count .bj-jars,.bj-wrap.is-count .bj-guess,.bj-wrap.is-count .bj-pour{display:none;}'
  + '.bj-wrap.no-guess .bj-guess{display:none;}'
  /* the jars: glass, a lid, a paper tag */
  + '.bj-jars{display:flex;gap:16px;justify-content:center;align-items:flex-end;}'
  + '.bj-jar{position:relative;width:var(--bj-jw);height:var(--bj-jh);padding:0;border:0;background:transparent;-webkit-tap-highlight-color:transparent;}'
  + 'button.bj-jar{cursor:pointer;touch-action:manipulation;} button.bj-jar:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:4px;border-radius:24px;}'
  + '.bj-glass{position:absolute;left:0;right:0;bottom:0;height:86%;overflow:hidden;border-radius:30px 30px 38px 38px;background:linear-gradient(90deg,rgba(255,255,255,.75),rgba(225,240,245,.45) 30%,rgba(205,228,236,.35) 70%,rgba(255,255,255,.7));box-shadow:inset 0 0 0 3px rgba(130,170,185,.7),inset 10px 0 18px rgba(255,255,255,.7),0 8px 16px rgba(40,70,80,.16);}'
  + '.bj-glass::after{content:"";position:absolute;left:12%;top:8%;width:9%;height:70%;border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.85),rgba(255,255,255,.1));z-index:60;pointer-events:none;}'
  + '.bj-packed{position:absolute;object-fit:contain;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(30,30,20,.3));}'
  + '.bj-lid{position:absolute;left:12%;right:12%;top:1%;height:14%;z-index:2;border-radius:10px 10px 6px 6px;background:linear-gradient(180deg,#E9A34A,#C77F2B);box-shadow:inset 0 -4px 0 rgba(0,0,0,.12),0 3px 6px rgba(60,40,10,.2);}'
  + '.bj-tag{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%) rotate(-3deg);z-index:70;min-width:64px;padding:6px 14px;border-radius:10px;background:#FFFDF4;color:#7A4E0E;font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(28px,calc(var(--bj-jw) * .2),42px);line-height:1.1;text-align:center;box-shadow:0 0 0 2px #E3C68E,0 4px 8px rgba(60,40,10,.2);pointer-events:none;}'
  + '.bj-mystery.can-pour{animation:bj-wobble 1.6s ease-in-out infinite;} @keyframes bj-wobble{0%,70%,100%{transform:none;}80%{transform:rotate(-3deg);}90%{transform:rotate(3deg);}}'
  /* the guess */
  + '.bj-guess{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}'
  + '.bj-gbtn{min-height:52px;min-width:150px;padding:0 18px;border-radius:26px;border:3px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:19px;cursor:pointer;touch-action:manipulation;}'
  + '.bj-gbtn.is-on{background:var(--lcs-structure);border-color:var(--lcs-structure);color:#fff;box-shadow:0 4px 0 rgba(0,0,0,.15);}'
  + '.bj-gbtn:focus-visible,.bj-pour:focus-visible,.bj-step:focus-visible,.bj-clear:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.bj-guess.bj-nudge{animation:bj-nudge .4s ease 1;} @keyframes bj-nudge{0%,100%{transform:none;}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}'
  + '.bj-pour{min-height:52px;padding:0 26px;border-radius:26px;border:0;background:#E08A2E;color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:19px;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 #B86A1C;}'
  + '.bj-pour:disabled{background:#E9D6BF;box-shadow:none;cursor:default;color:#fff;}'
  /* after the pour */
  + '.bj-top{width:var(--bj-tw);min-height:44px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:nowrap;} .bj-wrap.is-done .bj-clear{display:none;}'
  + '.bj-chip{flex:0 1 auto;min-width:0;padding:8px 14px;line-height:1.25;border-radius:18px;background:#FFF4E2;color:#7A4E0E;font-family:var(--lcs-font-body);font-weight:800;font-size:15px;box-shadow:0 0 0 2px #F0D8AE;} .bj-chip[hidden]{display:block;visibility:hidden;}'
  + '.bj-chip.is-verdict{background:#E8F5EF;color:var(--lcs-structure);box-shadow:0 0 0 2px #B9DCCB;}'
  + '.bj-clear{min-height:44px;padding:0 14px;border-radius:22px;border:2px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:14px;cursor:pointer;touch-action:manipulation;margin-left:auto;display:inline-flex;align-items:center;gap:6px;} .bj-clear svg{width:20px;height:20px;flex:none;} .bj-clear[hidden]{display:inline-flex;visibility:hidden;}'
  + '.bj-wrap.is-stack .bj-clear{width:44px;padding:0;justify-content:center;} .bj-wrap.is-stack .bj-clear span{display:none;} .bj-wrap.is-stack .bj-chip{font-size:14px;padding:7px 12px;}'
  + '.bj-tray{position:relative;width:var(--bj-tw);height:var(--bj-th);box-sizing:border-box;border-radius:24px;background:radial-gradient(120% 100% at 30% 20%,#F4F0D8,#E5DDB8);box-shadow:inset 0 0 0 4px #CDBF8C,0 6px 14px rgba(60,50,20,.14);}'
  + '.bj-bug{position:absolute;width:var(--bj-pic);height:var(--bj-pic);padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;transform:rotate(var(--bj-tilt,0deg));-webkit-tap-highlight-color:transparent;} .bj-bug[hidden]{display:none;}'
  + '.bj-bug::before{content:"";position:absolute;inset:6%;border-radius:50%;transition:background .15s,box-shadow .15s;}'
  + '.bj-bug.is-ticked::before{background:rgba(255,255,255,.6);box-shadow:0 0 0 3px var(--lcs-structure);}'
  + '.bj-bug:disabled{cursor:default;} .bj-bug:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.bj-pic{position:relative;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(40,30,10,.25));}'
  + '.bj-tick{position:absolute;left:0;bottom:0;width:max(18px,calc(var(--bj-pic) * .26));height:max(18px,calc(var(--bj-pic) * .26));border-radius:50%;background:var(--lcs-structure);border:2px solid #fff;box-sizing:border-box;display:none;z-index:2;}'
  + '.bj-tick::after{content:"";position:absolute;left:30%;top:16%;width:26%;height:44%;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg);}'
  + '.bj-bug.is-ticked .bj-tick{display:block;}'
  + '.bj-bug.bj-hop .bj-pic{animation:bj-hop .26s var(--lcs-ease) 1;} @keyframes bj-hop{0%,100%{transform:none;}50%{transform:translateY(-10%) scale(1.05);}}'
  + '.bj-num{position:absolute;right:-2px;top:-2px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:24px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:3;transform:rotate(calc(-1 * var(--bj-tilt,0deg)));}'
  + '.bj-num:not(.is-on){display:none;} .bj-num.is-q{background:var(--lcs-accent);} .bj-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:36px;height:36px;line-height:32px;font-size:21px;border-radius:18px;}'
  /* the label: − [number] + */
  + '.bj-label{display:flex;align-items:center;gap:14px;}'
  + '.bj-step{width:56px;height:56px;border-radius:50%;border:3px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;font-size:30px;line-height:1;cursor:pointer;touch-action:manipulation;} .bj-step:disabled{opacity:.35;cursor:default;}'
  + '.bj-card{min-width:96px;height:64px;padding:0 16px;box-sizing:border-box;border-radius:12px;background:#FFFDF4;color:#B9A27A;font-family:var(--lcs-font-display);font-weight:800;font-size:40px;line-height:64px;text-align:center;transform:rotate(-2deg);box-shadow:0 0 0 3px #E3C68E,0 5px 10px rgba(60,40,10,.18);}'
  + '.bj-card.is-set{color:#7A4E0E;} .bj-card.bj-flip{animation:bj-flip .2s ease 1;} @keyframes bj-flip{0%{transform:rotate(-2deg) scale(1);}50%{transform:rotate(-2deg) scale(1.08);}100%{transform:rotate(-2deg);}}'
  + '.bj-wrap.is-stack{gap:8px;} .bj-wrap.is-stack .bj-jars{gap:8px;} .bj-wrap.is-stack .bj-gbtn{min-width:0;flex:1 1 130px;font-size:17px;} .bj-wrap.is-stack .bj-guess{width:100%;}'
  + '.bj-wrap.is-tight{gap:6px;} .bj-wrap.is-tight .bj-step{width:48px;height:48px;font-size:26px;} .bj-wrap.is-tight .bj-card{height:52px;line-height:52px;font-size:34px;min-width:84px;} .bj-wrap.is-tight .bj-top{min-height:44px;}'
  + '@media (prefers-reduced-motion:reduce){.bj-mystery.can-pour,.bj-bug .bj-pic,.bj-card,.bj-guess{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'bj-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = BugJarActivity;
if (typeof window !== 'undefined') window.BugJarActivity = BugJarActivity;
