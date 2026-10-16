/* =====================================================================
   writing-line-activity.js — ACTIVITY #5 of the one-by-one rebuild:
   "Digby's Number Trace" (K.CC.A.3) — THE FADING LINE.
   Design sheet: docs/activities-rebuild/005-writing-line.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE FADING LINE. One writing line, three boxes. Box 1
   carries the whole road and a green start dot; box 2 only a faint ghost
   and the dot; box 3 is empty — so the third numeral is the child's own.
   The child writes with a finger and the ink appears only where the
   finger has actually swept the stroke, from its start (the shipped
   live-ink judge, stroke-trace-core.js). A stall is named from the
   finger's own path — started at the other end · flipped · the wrong way
   round · stopped short — and after three stalls the guide steps back in,
   silently. A glowing walker shows the strokes on request. When the line
   is full the round checks itself and the number is spoken. On a phone:
   one big box at a time, the line so far above it. No mascot: paper,
   writing lines, a road, a hairline, a dot, the child's ink.

   ACTIVITY LAYER ONLY: the model is writing-line-core.js (which loads
   number-trace-core.js + stroke-trace-core.js unchanged); lcs-shell.js is
   untouched. Test seams: window.WritingLineActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var WritingLineActivity = {
  id: 'writing-line',
  apparatusClasses: ['wl-'],

  strings: {
    title:          {en:'Write the Number',de:'Schreib die Zahl',fr:'Écris le chiffre',it:'Scrivi il numero',es:'Escribe el número',pt:'Escreva o número',nl:'Schrijf het cijfer',sv:'Skriv siffran',da:'Skriv tallet',no:'Skriv tallet',fi:'Kirjoita numero'},
    instruction:    {en:'A writing line with three boxes. Start on the green dot and write the number with your finger: the first box shows the whole road, the second only a faint line, and the third you write by yourself.',de:'Eine Schreibzeile mit drei Kästchen. Beginne am grünen Punkt und schreibe die Zahl mit dem Finger: Das erste Kästchen zeigt den ganzen Weg, das zweite nur eine feine Linie, und das dritte schreibst du ganz allein.',fr:'Une ligne d’écriture avec trois cases. Pars du point vert et écris le chiffre avec ton doigt : la première case montre tout le chemin, la deuxième seulement un trait léger, et la troisième, tu l’écris tout seul.',it:'Una riga di scrittura con tre caselle. Parti dal punto verde e scrivi il numero con il dito: la prima casella mostra tutta la strada, la seconda solo una linea leggera, e la terza la scrivi da solo.',es:'Una línea de escritura con tres cuadros. Empieza en el punto verde y escribe el número con el dedo: el primer cuadro muestra todo el camino, el segundo solo una línea tenue, y el tercero lo escribes tú solo.',pt:'Uma linha de escrita com três quadros. Comece no ponto verde e escreva o número com o dedo: o primeiro quadro mostra todo o caminho, o segundo só uma linha fraquinha, e o terceiro você escreve sozinho.',nl:'Een schrijfregel met drie vakjes. Begin op de groene stip en schrijf het cijfer met je vinger: het eerste vakje laat de hele weg zien, het tweede alleen een vaag lijntje, en het derde schrijf je helemaal zelf.',sv:'En skrivrad med tre rutor. Börja på den gröna pricken och skriv siffran med fingret: första rutan visar hela vägen, andra bara en svag linje, och den tredje skriver du helt själv.',da:'En skrivelinje med tre felter. Begynd på den grønne prik, og skriv tallet med fingeren: det første felt viser hele vejen, det andet kun en svag linje, og det tredje skriver du helt selv.',no:'En skrivelinje med tre ruter. Begynn på den grønne prikken og skriv tallet med fingeren: den første ruta viser hele veien, den andre bare en svak linje, og den tredje skriver du helt selv.',fi:'Kirjoitusrivi, jolla on kolme ruutua. Aloita vihreästä pisteestä ja kirjoita numero sormella: ensimmäinen ruutu näyttää koko reitin, toinen vain haalean viivan, ja kolmannen kirjoitat aivan itse.'},
    promptFading:   {en:'Write {d} three times — the last one by yourself.',de:'Schreibe die {d} dreimal – die letzte ganz allein.',fr:'Écris le {d} trois fois : le dernier tout seul.',it:'Scrivi il numero {d} tre volte: l’ultimo da solo.',es:'Escribe el {d} tres veces: el último tú solo.',pt:'Escreva o {d} três vezes: o último sozinho.',nl:'Schrijf de {d} drie keer – de laatste helemaal zelf.',sv:'Skriv {d} tre gånger – den sista helt själv.',da:'Skriv {d} tre gange – det sidste helt selv.',no:'Skriv {d} tre ganger – det siste helt selv.',fi:'Kirjoita {d} kolme kertaa – viimeinen aivan itse.'},
    promptFull:     {en:'Write {d} three times, following the road.',de:'Schreibe die {d} dreimal und folge dabei dem Weg.',fr:'Écris le {d} trois fois en suivant le chemin.',it:'Scrivi il numero {d} tre volte seguendo la strada.',es:'Escribe el {d} tres veces siguiendo el camino.',pt:'Escreva o {d} três vezes seguindo o caminho.',nl:'Schrijf de {d} drie keer en volg de weg.',sv:'Skriv {d} tre gånger längs vägen.',da:'Skriv {d} tre gange ad vejen.',no:'Skriv {d} tre ganger langs veien.',fi:'Kirjoita {d} kolme kertaa reittiä pitkin.'},
    promptAlone:    {en:'Write {d} three times by yourself.',de:'Schreibe die {d} dreimal ganz allein.',fr:'Écris le {d} trois fois tout seul.',it:'Scrivi il numero {d} tre volte da solo.',es:'Escribe el {d} tres veces tú solo.',pt:'Escreva o {d} três vezes sozinho.',nl:'Schrijf de {d} drie keer helemaal zelf.',sv:'Skriv {d} tre gånger helt själv.',da:'Skriv {d} tre gange helt selv.',no:'Skriv {d} tre ganger helt selv.',fi:'Kirjoita {d} kolme kertaa aivan itse.'},
    hintStart:      {en:'Put your finger on the green dot and follow the road.',de:'Setze den Finger auf den grünen Punkt und folge dem Weg.',fr:'Pose ton doigt sur le point vert et suis le chemin.',it:'Metti il dito sul punto verde e segui la strada.',es:'Pon el dedo en el punto verde y sigue el camino.',pt:'Coloque o dedo no ponto verde e siga o caminho.',nl:'Zet je vinger op de groene stip en volg de weg.',sv:'Sätt fingret på den gröna pricken och följ vägen.',da:'Sæt fingeren på den grønne prik, og følg vejen.',no:'Sett fingeren på den grønne prikken og følg veien.',fi:'Laita sormi vihreälle pisteelle ja seuraa reittiä.'},
    hintUnfinished: {en:'Not finished yet — write the number in every box.',de:'Noch nicht fertig – schreibe die Zahl in jedes Kästchen.',fr:'Ce n’est pas fini : écris le chiffre dans chaque case.',it:'Non è ancora finito: scrivi il numero in ogni casella.',es:'Todavía no terminas: escribe el número en cada cuadro.',pt:'Ainda não acabou: escreva o número em cada quadro.',nl:'Nog niet klaar: schrijf het cijfer in elk vakje.',sv:'Inte klart än – skriv siffran i varje ruta.',da:'Ikke færdig endnu – skriv tallet i hvert felt.',no:'Ikke ferdig ennå – skriv tallet i hver rute.',fi:'Ei vielä valmis – kirjoita numero jokaiseen ruutuun.'},
    noteFull:       {en:'Start on the green dot and follow the road.',de:'Beginne am grünen Punkt und folge dem Weg.',fr:'Pars du point vert et suis le chemin.',it:'Parti dal punto verde e segui la strada.',es:'Empieza en el punto verde y sigue el camino.',pt:'Comece no ponto verde e siga o caminho.',nl:'Begin op de groene stip en volg de weg.',sv:'Börja på den gröna pricken och följ vägen.',da:'Begynd på den grønne prik, og følg vejen.',no:'Begynn på den grønne prikken og følg veien.',fi:'Aloita vihreästä pisteestä ja seuraa reittiä.'},
    noteGhost:      {en:'The road is faint now. Start on the dot and write it.',de:'Der Weg ist jetzt nur noch ganz blass. Beginne am Punkt und schreib sie.',fr:'Le chemin est tout pâle maintenant. Pars du point et écris-le.',it:'Ora la strada si vede appena. Parti dal punto e scrivilo.',es:'Ahora el camino casi no se ve. Empieza en el punto y escríbelo.',pt:'Agora o caminho está fraquinho. Comece no ponto e escreva.',nl:'De weg is nu vaag. Begin op de stip en schrijf het.',sv:'Nu syns vägen bara lite. Börja på pricken och skriv.',da:'Nu kan vejen kun lige anes. Begynd på prikken, og skriv.',no:'Nå synes veien bare så vidt. Begynn på prikken og skriv.',fi:'Nyt reitti on haalea. Aloita pisteestä ja kirjoita.'},
    noteBlank:      {en:'Now write it by yourself. The first box shows how.',de:'Jetzt schreib sie ganz allein. Das erste Kästchen zeigt, wie.',fr:'Maintenant écris-le tout seul. La première case te montre comment.',it:'Ora scrivilo da solo. La prima casella ti fa vedere come.',es:'Ahora escríbelo tú solo. El primer cuadro te enseña cómo.',pt:'Agora escreva sozinho. O primeiro quadro mostra como.',nl:'Schrijf het nu helemaal zelf. Het eerste vakje laat zien hoe.',sv:'Skriv nu helt själv. Första rutan visar hur.',da:'Skriv nu helt selv. Det første felt viser hvordan.',no:'Skriv nå helt selv. Den første ruta viser hvordan.',fi:'Kirjoita nyt aivan itse. Ensimmäinen ruutu näyttää, miten.'},
    noteStroke:     {en:'Good — now the next stroke.',de:'Gut – jetzt der nächste Strich.',fr:'Bien : maintenant le trait suivant.',it:'Bene: ora il prossimo tratto.',es:'Bien: ahora el siguiente trazo.',pt:'Boa! Agora o próximo traço.',nl:'Goed – nu de volgende haal.',sv:'Bra – nu nästa streck.',da:'Godt – nu den næste streg.',no:'Bra – nå neste strek.',fi:'Hyvä – nyt seuraava viiva.'},
    noteReversed:   {en:'Start at the other end, like the first box.',de:'Fang am anderen Ende an – wie im ersten Kästchen.',fr:'Commence par l’autre bout, comme dans la première case.',it:'Parti dall’altra parte, come nella prima casella.',es:'Empieza por el otro extremo, como en el primer cuadro.',pt:'Comece pela outra ponta, como no primeiro quadro.',nl:'Begin aan de andere kant, net als in het eerste vakje.',sv:'Börja i andra änden, som i första rutan.',da:'Begynd i den anden ende, ligesom i det første felt.',no:'Begynn i den andre enden, som i den første ruta.',fi:'Aloita toisesta päästä, kuten ensimmäisessä ruudussa.'},
    noteMirror:     {en:'Flipped! Your number faces the wrong way. Look at the first box.',de:'Spiegelverkehrt! Deine Zahl schaut in die falsche Richtung. Schau auf das erste Kästchen.',fr:'À l’envers ! Ton chiffre regarde du mauvais côté. Regarde la première case.',it:'Al contrario! Il tuo numero guarda dalla parte sbagliata. Guarda la prima casella.',es:'¡Al revés! Tu número mira hacia el lado equivocado. Mira el primer cuadro.',pt:'Espelhado! Seu número está virado para o lado errado. Olhe o primeiro quadro.',nl:'Gespiegeld! Je cijfer kijkt de verkeerde kant op. Kijk naar het eerste vakje.',sv:'Spegelvänd! Din siffra tittar åt fel håll. Titta på första rutan.',da:'Spejlvendt! Dit tal vender den forkerte vej. Se på det første felt.',no:'Speilvendt! Tallet ditt vender feil vei. Se på den første ruta.',fi:'Peilikuva! Numerosi katsoo väärään suuntaan. Katso ensimmäistä ruutua.'},
    noteDirection:  {en:'Go round the other way — start at the top, like the first box.',de:'Fahr andersherum – fang oben an, wie im ersten Kästchen.',fr:'Tourne dans l’autre sens : pars du haut, comme dans la première case.',it:'Gira dall’altra parte: parti dall’alto, come nella prima casella.',es:'Gira hacia el otro lado: empieza arriba, como en el primer cuadro.',pt:'Gire para o outro lado: comece em cima, como no primeiro quadro.',nl:'Draai de andere kant op: begin bovenaan, net als in het eerste vakje.',sv:'Gå åt andra hållet – börja uppe, som i första rutan.',da:'Gå den anden vej rundt – begynd øverst, ligesom i det første felt.',no:'Gå den andre veien rundt – begynn øverst, som i den første ruta.',fi:'Kierrä toiseen suuntaan – aloita ylhäältä, kuten ensimmäisessä ruudussa.'},
    noteShort:      {en:'Nearly — keep going to the end of the stroke.',de:'Fast – zieh den Strich bis zum Ende.',fr:'Presque : continue jusqu’au bout du trait.',it:'Quasi: continua fino alla fine del tratto.',es:'Casi: sigue hasta el final del trazo.',pt:'Quase! Continue até o fim do traço.',nl:'Bijna – ga door tot het einde van de haal.',sv:'Nästan – fortsätt till slutet av strecket.',da:'Næsten – fortsæt til enden af stregen.',no:'Nesten – fortsett til enden av streken.',fi:'Melkein – jatka viivan loppuun asti.'},
    noteOff:        {en:'Follow the shape of the number, like the first box.',de:'Folge der Form der Zahl, wie im ersten Kästchen.',fr:'Suis la forme du chiffre, comme dans la première case.',it:'Segui la forma del numero, come nella prima casella.',es:'Sigue la forma del número, como en el primer cuadro.',pt:'Siga a forma do número, como no primeiro quadro.',nl:'Volg de vorm van het cijfer, net als in het eerste vakje.',sv:'Följ siffrans form, som i första rutan.',da:'Følg tallets form, ligesom i det første felt.',no:'Følg formen på tallet, som i den første ruta.',fi:'Seuraa numeron muotoa, kuten ensimmäisessä ruudussa.'},
    noteHelp:       {en:'Here is the road again — follow it.',de:'Hier ist der Weg wieder – folge ihm.',fr:'Voilà le chemin à nouveau : suis-le.',it:'Ecco di nuovo la strada: seguila.',es:'Aquí está el camino otra vez: síguelo.',pt:'Aqui está o caminho de novo: siga por ele.',nl:'Hier is de weg weer – volg hem.',sv:'Här är vägen igen – följ den.',da:'Her er vejen igen – følg den.',no:'Her er veien igjen – følg den.',fi:'Tässä reitti taas – seuraa sitä.'},
    noteDone:       {en:'Three times {d} — the line is full!',de:'Dreimal die {d} – die Zeile ist voll!',fr:'Trois fois le {d} : la ligne est pleine !',it:'Tre volte il numero {d}: la riga è piena!',es:'Tres veces el {d}: ¡la línea está llena!',pt:'Três vezes o {d}: a linha está cheia!',nl:'Drie keer de {d} – de regel is vol!',sv:'Tre gånger {d} – raden är full!',da:'Tre gange {d} – linjen er fuld!',no:'Tre ganger {d} – linja er full!',fi:'Kolme kertaa {d} – rivi on täynnä!'},
    celebrateFading:{en:'Yes! {d}, {d}, {d} — the last one all by yourself!',de:'Ja! {d}, {d}, {d} – die letzte ganz allein!',fr:'Oui ! {d}, {d}, {d} : le dernier tout seul !',it:'Sì! {d}, {d}, {d}: l’ultimo tutto da solo!',es:'¡Sí! {d}, {d}, {d}: ¡el último tú solo!',pt:'Isso! {d}, {d}, {d} — o último sozinho!',nl:'Ja! {d}, {d}, {d} – de laatste helemaal zelf!',sv:'Ja! {d}, {d}, {d} – den sista helt själv!',da:'Ja! {d}, {d}, {d} – det sidste helt selv!',no:'Ja! {d}, {d}, {d} – det siste helt selv!',fi:'Hienoa! {d}, {d}, {d} – viimeinen aivan itse!'},
    celebrateFull:  {en:'Yes! You wrote {d} three times.',de:'Ja! Du hast die {d} dreimal geschrieben.',fr:'Oui ! Tu as écrit le {d} trois fois.',it:'Sì! Hai scritto il numero {d} tre volte.',es:'¡Sí! Escribiste el {d} tres veces.',pt:'Isso! Você escreveu o {d} três vezes.',nl:'Ja! Je hebt de {d} drie keer geschreven.',sv:'Ja! Du skrev {d} tre gånger.',da:'Ja! Du skrev {d} tre gange.',no:'Ja! Du skrev {d} tre ganger.',fi:'Hienoa! Kirjoitit numeron {d} kolme kertaa.'},
    celebrateAlone: {en:'Yes! {d} three times — all by yourself!',de:'Ja! Dreimal die {d} – ganz allein!',fr:'Oui ! Trois fois le {d}, tout seul !',it:'Sì! Tre volte il numero {d}, tutto da solo!',es:'¡Sí! Tres veces el {d}, ¡tú solo!',pt:'Isso! Três vezes o {d} — sozinho!',nl:'Ja! Drie keer de {d} – helemaal zelf!',sv:'Ja! {d} tre gånger – helt själv!',da:'Ja! {d} tre gange – helt selv!',no:'Ja! {d} tre ganger – helt selv!',fi:'Hienoa! {d} kolme kertaa – aivan itse!'},
    boxLabel:       {en:'box {i} of 3',de:'Kästchen {i} von 3',fr:'case {i} sur 3',it:'casella {i} di 3',es:'cuadro {i} de 3',pt:'quadro {i} de 3',nl:'vakje {i} van 3',sv:'ruta {i} av 3',da:'felt {i} af 3',no:'rute {i} av 3',fi:'ruutu {i}/3'},
    boxDone:        {en:'done',de:'fertig',fr:'terminée',it:'fatta',es:'listo',pt:'pronto',nl:'klaar',sv:'klar',da:'færdigt',no:'ferdig',fi:'valmis'},
    boxActive:      {en:'write here',de:'hier schreiben',fr:'écris ici',it:'scrivi qui',es:'escribe aquí',pt:'escreva aqui',nl:'schrijf hier',sv:'skriv här',da:'skriv her',no:'skriv her',fi:'kirjoita tähän'},
    boxWait:        {en:'later',de:'später',fr:'plus tard',it:'dopo',es:'después',pt:'depois',nl:'later',sv:'senare',da:'senere',no:'senere',fi:'myöhemmin'},
    lineLabel:      {en:'The writing line',de:'Die Schreibzeile',fr:'La ligne d’écriture',it:'La riga di scrittura',es:'La línea de escritura',pt:'A linha de escrita',nl:'De schrijfregel',sv:'Skrivraden',da:'Skrivelinjen',no:'Skrivelinja',fi:'Kirjoitusrivi'},
    showMe:         {en:'Show me',de:'Vormachen',fr:'Montre-moi',it:'Fammi vedere',es:'Enséñame',pt:'Me mostra',nl:'Voordoen',sv:'Visa mig',da:'Vis mig',no:'Vis meg',fi:'Näytä'},
    rubOut:         {en:'Rub out',de:'Wegwischen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Sudda',da:'Visk ud',no:'Visk ut',fi:'Pyyhi'},
    setGuide:       {en:'Guide',de:'Hilfe',fr:'Guide',it:'Guida',es:'Guía',pt:'Guia',nl:'Hulp',sv:'Stöd',da:'Hjælp',no:'Hjelp',fi:'Tuki'},
    guideFading:    {en:'Fading',de:'Wird weniger',fr:'Qui s’efface',it:'Sempre meno',es:'Va desapareciendo',pt:'Vai sumindo',nl:'Steeds minder',sv:'Tonar bort',da:'Bliver mindre',no:'Blir mindre',fi:'Häipyvä'},
    guideFull:      {en:'Always',de:'Immer',fr:'Toujours',it:'Sempre',es:'Siempre',pt:'Sempre',nl:'Altijd',sv:'Alltid',da:'Altid',no:'Alltid',fi:'Aina'},
    guideAlone:     {en:'By yourself',de:'Ganz allein',fr:'Tout seul',it:'Da solo',es:'Tú solo',pt:'Sozinho',nl:'Helemaal zelf',sv:'Helt själv',da:'Helt selv',no:'Helt selv',fi:'Aivan itse'},
    setLine:        {en:'Lines',de:'Linien',fr:'Lignes',it:'Righe',es:'Líneas',pt:'Linhas',nl:'Lijnen',sv:'Linjer',da:'Linjer',no:'Linjer',fi:'Viivat'},
    lineHouse:      {en:'Three lines',de:'Drei Linien',fr:'Trois lignes',it:'Tre righe',es:'Tres líneas',pt:'Três linhas',nl:'Drie lijnen',sv:'Tre linjer',da:'Tre linjer',no:'Tre linjer',fi:'Kolme viivaa'},
    linePlain:      {en:'One line',de:'Eine Linie',fr:'Une ligne',it:'Una riga',es:'Una línea',pt:'Uma linha',nl:'Eén lijn',sv:'En linje',da:'Én linje',no:'Én linje',fi:'Yksi viiva'}
  },

  defaults: { guide: 'fading', line: 'house' },
  settings: [
    { key: 'guide', type: 'choice', labelKey: 'setGuide', options: [{ value: 'fading', labelKey: 'guideFading' }, { value: 'full', labelKey: 'guideFull' }, { value: 'alone', labelKey: 'guideAlone' }] },
    { key: 'line', type: 'choice', labelKey: 'setLine', options: [{ value: 'house', labelKey: 'lineHouse' }, { value: 'plain', labelKey: 'linePlain' }] }
  ],

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._order = null; this._curPass = 0;
    this._ro = null; this._note = null; this._autoCheck = null; this._drag = false; this._walker = null;
    injectWritingLineCSS();
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._autoCheck) { clearTimeout(this._autoCheck); this._autoCheck = null; }
    this._stopWalker();
  },
  onSettings: function (key) {
    if (key === 'line') { if (this._mat) this._paintAll(); return; }     // the lines only change the paper
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _width: function () { var s = this.api && this.api.stage; var w = s ? s.clientWidth : 0; return w > 160 ? w : 560; },
  _guide: function () { var g = this.api && this.api.settings && this.api.settings.guide; return WritingLineCore.PLANS[g] ? g : 'fading'; },
  _line: function () { return (this.api && this.api.settings && this.api.settings.line === 'plain') ? 'plain' : 'house'; },
  _ensurePool: function () { if (!this._pool) this._pool = WritingLineCore.rounds('wl'); return this._pool; },
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
    var r = pool[this._order[index % n]], guide = this._guide();
    var suffix = guide === 'full' ? 'Full' : guide === 'alone' ? 'Alone' : 'Fading';
    return {
      id: 'writing-line.' + guide + '.' + r.digit,
      promptKey: 'prompt' + suffix,
      promptArgs: { d: r.digit },
      celebrateKey: 'celebrate' + suffix,
      answerType: 'state',
      setup: function (tool) { if (tool._autoCheck) { clearTimeout(tool._autoCheck); tool._autoCheck = null; } tool._stopWalker(); tool._note = null; tool.st = WritingLineCore.newState(r, tool.api.lang, guide); },
      check: function (tool) { var ok = WritingLineCore.verdict(tool.st) === 'done'; if (ok) tool._onRight(); return ok; },
      hintKey: function (tool) { tool._nudge(); var c = WritingLineCore.activeCell(tool.st); return (WritingLineCore.boxesDone(tool.st) === 0 && c && c.ink.length === 0 && c.live.length === 0) ? 'hintStart' : 'hintUnfinished'; }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    this._stopWalker();
    if (!this.st) this.st = WritingLineCore.newState({ digit: 3, seed: 'boot' }, api.lang, 'fading');
    var st = this.st;
    var wrap = api.el('div', 'wl-wrap');
    this._wrap = wrap;
    var L = WritingLineCore.layout(this._width());
    this._L = L;

    /* the line so far (one-box layout) */
    var thumbs = api.el('div', 'wl-thumbs');
    thumbs.setAttribute('aria-hidden', 'true');
    this._thumbs = [];
    for (var k = 0; k < 3; k++) { var th = api.el('div', 'wl-thumb'); th.appendChild(svgEl('svg', { viewBox: '0 0 100 100', class: 'wl-thumbsvg' })); thumbs.appendChild(th); this._thumbs.push(th); }
    this._thumbsEl = thumbs;
    wrap.appendChild(thumbs);

    /* the writing line */
    var mat = api.el('div', 'wl-line');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', t('lineLabel'));
    this._mat = mat;
    this._boxes = [];
    for (var i = 0; i < 3; i++) {
      var box = api.el('div', 'wl-box');
      box.dataset.i = String(i);
      var sv = svgEl('svg', { viewBox: '0 0 100 100', class: 'wl-paper' });
      box.appendChild(sv);
      this._wirePointer(sv, i);
      mat.appendChild(box);
      this._boxes.push(box);
    }
    wrap.appendChild(mat);

    /* the strip: Show me · note · Rub out */
    var strip = api.el('div', 'wl-strip');
    var show = api.el('button', 'wl-tool wl-show'); show.type = 'button';
    show.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c3-8 7-8 9-4s5 4 7-6"/><circle cx="4" cy="18" r="2" fill="currentColor"/></svg><span class="wl-tool-text"></span>';
    show.lastChild.textContent = t('showMe'); show.setAttribute('aria-label', t('showMe'));
    show.addEventListener('click', function () { self._showMe(); });
    this._show = show; strip.appendChild(show);
    var note = api.el('div', 'wl-note'); note.setAttribute('aria-live', 'polite'); this._noteEl = note; strip.appendChild(note);
    var rub = api.el('button', 'wl-tool wl-rub'); rub.type = 'button';
    rub.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7z"/><path d="M12 9l5 5M17 9l-5 5"/></svg><span class="wl-tool-text"></span>';
    rub.lastChild.textContent = t('rubOut'); rub.setAttribute('aria-label', t('rubOut'));
    rub.addEventListener('click', function () { self._rubOut(); });
    this._rub = rub; strip.appendChild(rub);
    wrap.appendChild(strip);

    stage.appendChild(wrap);
    this._layout();
    this._paintAll();
    this._watchWidth();
  },

  _layout: function () {
    var L = this._L = WritingLineCore.layout(this._width());
    this._wrap.classList.toggle('is-single', L.mode === 'single');
    this._wrap.style.setProperty('--wl-cell', L.cell + 'px');
    this._wrap.style.setProperty('--wl-gap', L.gap + 'px');
    this._thumbsEl.style.display = L.mode === 'single' ? '' : 'none';
    for (var i = 0; i < 3; i++) this._boxes[i].style.display = (L.mode === 'single' && i !== this.st.at && !(this.st.done && i === 2)) ? 'none' : '';
  },
  _paintAll: function () {
    var st = this.st, t = this.api.t;
    if (this._L.mode === 'single') for (var i = 0; i < 3; i++) this._boxes[i].style.display = (i !== st.at && !(st.done && i === 2)) ? 'none' : '';
    for (var b = 0; b < 3; b++) {
      var box = this._boxes[b], c = st.cells[b];
      var active = !st.done && b === st.at;
      box.classList.toggle('is-active', active);
      box.classList.toggle('is-done', c.formed);
      box.classList.toggle('is-wait', !c.formed && !active);
      box.setAttribute('aria-label', interp(t('boxLabel'), { i: b + 1 }) + ': ' + (c.formed ? t('boxDone') : active ? t('boxActive') : t('boxWait')));
      this._paintBox(box.firstChild, b, false);
      if (this._thumbs[b]) { this._paintBox(this._thumbs[b].firstChild, b, true); this._thumbs[b].classList.toggle('is-active', active); this._thumbs[b].classList.toggle('is-done', c.formed); }
    }
    var c0 = WritingLineCore.activeCell(st);
    var note = this._note || { key: st.done ? 'noteDone' : (c0.shown === 'full' ? 'noteFull' : c0.shown === 'ghost' ? 'noteGhost' : 'noteBlank'), args: { d: st.digit }, slip: false };
    this._noteEl.textContent = interp(t(note.key), note.args);
    this._noteEl.classList.toggle('is-slip', !!note.slip);
    this._noteEl.classList.toggle('is-done', st.done);
    this._show.disabled = st.done;
    this._rub.disabled = st.done || !c0 || (c0.ink.length === 0 && c0.live.length === 0);
  },
  /* one box: the lines, the guide at its shown level, the ink, the live ink, the walker */
  _paintBox: function (sv, b, thumb) {
    var st = this.st, c = st.cells[b], ST = WritingLineCore.deps().ST;
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    var LN = WritingLineCore.LINES, house = this._line() === 'house';
    sv.appendChild(svgEl('line', { x1: 2, y1: LN.top, x2: 98, y2: LN.top, class: 'wl-rule' }));
    if (house) sv.appendChild(svgEl('line', { x1: 2, y1: LN.mid, x2: 98, y2: LN.mid, class: 'wl-rule wl-rule-mid' }));
    sv.appendChild(svgEl('line', { x1: 2, y1: LN.base, x2: 98, y2: LN.base, class: 'wl-rule wl-rule-base' }));
    var active = !st.done && b === st.at, idx = c.trace.idx, i;
    var level = c.formed ? 'none' : c.shown;
    if (!thumb && level !== 'none') {
      for (i = 0; i < st.strokes.length; i++) {
        var pts = ST.flatten(st.strokes[i], 1.2), d = pathOf(pts), done = i < idx;
        if (level === 'full') sv.appendChild(svgEl('path', { d: d, class: 'wl-road' + (active && i === idx ? ' is-now' : '') + (done ? ' is-done' : '') }));
        if (level === 'full' || level === 'ghost') sv.appendChild(svgEl('path', { d: d, class: 'wl-hair' + (level === 'ghost' ? ' is-faded' : '') + (done ? ' is-done' : '') }));
      }
      if (level === 'full' && st.strokes.length > 1) {
        var placed = [];
        for (i = 0; i < st.strokes.length; i++) {
          var s0 = st.strokes[i][0], px = s0.x + (s0.x < 50 ? -9 : 9), py = s0.y - 6;
          /* two strokes may start at the same point (the 5's down-stroke and its bar): the second numeral steps aside */
          for (var q = 0; q < placed.length; q++) if (Math.abs(placed[q].x - px) < 8 && Math.abs(placed[q].y - py) < 8) px += 12;
          placed.push({ x: px, y: py });
          var tx = svgEl('text', { x: px, y: py, class: 'wl-pip' + (i < idx ? ' is-done' : '') });
          tx.textContent = String(i + 1); sv.appendChild(tx);
        }
      }
      if (active && level !== 'blank' && idx < st.strokes.length) { var sp = ST.startPoint(c.trace) || st.strokes[idx][0]; sv.appendChild(svgEl('circle', { cx: sp.x, cy: sp.y, r: 3.6, class: 'wl-start' })); }
    }
    for (i = 0; i < c.ink.length; i++) if (c.ink[i].length > 1) sv.appendChild(svgEl('path', { d: pathOf(c.ink[i]), class: 'wl-ink' + (c.formed ? ' is-formed' : '') }));
    if (c.live.length > 1) { var lv = svgEl('path', { d: pathOf(c.live), class: 'wl-ink wl-ink-live' }); sv.appendChild(lv); if (active && !thumb) this._livePath = lv; }
    else if (active && !thumb) { this._livePath = svgEl('path', { d: '', class: 'wl-ink wl-ink-live' }); sv.appendChild(this._livePath); }
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._mat || !self._mat.isConnected) return;
      last = w;
      self._layout(); self._paintAll();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- the finger ---------------- */
  _wirePointer: function (sv, b) {
    var self = this;
    var toVB = function (ev) { var r = sv.getBoundingClientRect(); return { x: ((ev.clientX - r.left) / r.width) * 100, y: ((ev.clientY - r.top) / r.height) * 100 }; };
    sv.addEventListener('pointerdown', function (ev) {
      if (!self.st || self.st.done || b !== self.st.at) return;
      ev.preventDefault();
      self._stopWalker();
      self._drag = true;
      try { sv.setPointerCapture(ev.pointerId); } catch (e) {}
      self._sample(toVB(ev));
    });
    sv.addEventListener('pointermove', function (ev) {
      if (!self._drag) return;
      var pts = (ev.getCoalescedEvents ? ev.getCoalescedEvents() : null) || [ev];
      for (var i = 0; i < pts.length; i++) self._sample(toVB(pts[i]));
    });
    var end = function (ev) {
      if (!self._drag) return;
      self._drag = false;
      try { sv.releasePointerCapture(ev.pointerId); } catch (e) {}
      self._endStroke();
    };
    sv.addEventListener('pointerup', end);
    sv.addEventListener('pointercancel', end);
  },
  _sample: function (pt) {
    var st = this.st, c = WritingLineCore.activeCell(st);
    if (!c) return;
    var r = WritingLineCore.sample(st, pt);
    if (r.on && this._livePath) this._livePath.setAttribute('d', pathOf(c.live));
    if (r.done) { this._drag = false; this._endStroke(); }
  },
  _endStroke: function () {
    var st = this.st, self = this, t = this.api.t;
    var res = WritingLineCore.endStroke(st);
    if (res.result === 'none') return;
    if (res.result === 'stroke-ok') {
      this._note = { key: 'noteStroke', args: {}, slip: false };
      this.api.sound(600 + 40 * res.stroke);
      this._paintAll();
      this.api.track('stroke', { d: st.digit, box: st.at, stroke: res.stroke });
      return;
    }
    if (res.result === 'formed') {
      this._note = null;
      this.api.sound(660); setTimeout(function () { self.api.sound(880); }, 140);
      this._speakNumber(st.digit);
      this._paintAll();
      var done = this._boxes[res.box]; bounce(done, 'wl-pop');
      this.api.announce(interp(t('boxLabel'), { i: res.box + 1 }) + ': ' + t('boxDone'));
      this.api.track('box', { d: st.digit, box: res.box, guide: st.guide });
      if (res.round) {
        if (this._autoCheck) clearTimeout(this._autoCheck);
        this._autoCheck = setTimeout(function () {
          self._autoCheck = null;
          var btn = document.querySelector('.lcs-activity-check');
          if (btn && !btn.hidden && !btn.disabled && self.st === st && st.done) btn.click();
        }, 750);
      }
      return;
    }
    /* a stall: the ink stays, the slip is named, the guide may step back in */
    var key = { reversed: 'noteReversed', mirror: 'noteMirror', direction: 'noteDirection', short: 'noteShort', off: 'noteOff' }[res.slip] || 'noteOff';
    if (res.helped) key = 'noteHelp';
    this._note = { key: key, args: {}, slip: !res.helped };
    this.api.sound(300);
    this._paintAll();
    bounce(this._boxes[st.at], 'wl-wobble');
    this.api.announce(this._noteEl.textContent);
    this.api.track('stall', { d: st.digit, box: st.at, slip: res.slip, helped: !!res.helped });
  },
  _rubOut: function () {
    var st = this.st;
    if (!WritingLineCore.rubOut(st)) return;
    this._stopWalker();
    this._note = null;
    this._paintAll();
    this.api.sound(380);
    this.api.announce(this.api.t('rubOut'));
    this.api.track('rubOut', { d: st.digit, box: st.at });
  },
  _nudge: function () {
    var st = this.st;
    if (!st.done) bounce(this._boxes[st.at], 'wl-bounce');
    this._paintAll();
  },
  _onRight: function () {
    var st = this.st;
    this._note = null;
    this._paintAll();
    for (var b = 0; b < 3; b++) (function (box, d) { setTimeout(function () { bounce(box, 'wl-pop'); }, 120 * d); }(this._boxes[b], b));
    this.api.track('right', { d: st.digit, guide: st.guide });
  },

  /* ---------------- the walker (Show me) ---------------- */
  WALK_SPEED: 55,   /* units per second, paced by distance */
  _showMe: function () {
    var st = this.st, self = this;
    if (st.done || this._drag) return;
    this._stopWalker();
    var route = WritingLineCore.demoRoute(st), sv = this._boxes[st.at].firstChild;
    if (!route.length || !sv) return;
    var plan = [], total = 0;
    for (var i = 0; i < route.length; i++) { var pts = route[i], cum = [0]; for (var k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y)); plan.push({ pts: pts, cum: cum, len: cum[cum.length - 1], offset: total }); total += cum[cum.length - 1] + 14; }
    var dot = svgEl('circle', { r: 3.6, class: 'wl-walker', cx: route[0][0].x, cy: route[0][0].y });
    sv.appendChild(dot);
    var t0 = null;
    var step = function (ts) {
      if (t0 === null) t0 = ts;
      var u = (ts - t0) / 1000 * self.WALK_SPEED;
      if (u >= total) { self._stopWalker(); return; }
      for (var i = 0; i < plan.length; i++) {
        var p = plan[i], v = u - p.offset;
        if (v < 0) break;
        if (v <= p.len) { var k = 0; while (k + 1 < p.cum.length && p.cum[k + 1] < v) k++; var a = p.pts[k], b = p.pts[Math.min(k + 1, p.pts.length - 1)], seg = p.cum[Math.min(k + 1, p.cum.length - 1)] - p.cum[k], f = seg > 0 ? (v - p.cum[k]) / seg : 0; dot.setAttribute('cx', a.x + (b.x - a.x) * f); dot.setAttribute('cy', a.y + (b.y - a.y) * f); dot.style.opacity = '1'; break; }
        dot.style.opacity = '0.35';
      }
      self._walker = requestAnimationFrame(step);
    };
    this._walker = requestAnimationFrame(step);
    this._walkerDot = dot;
    this.api.track('showMe', { d: st.digit, box: st.at });
  },
  _stopWalker: function () {
    if (this._walker) { cancelAnimationFrame(this._walker); this._walker = null; }
    if (this._walkerDot && this._walkerDot.parentNode) this._walkerDot.parentNode.removeChild(this._walkerDot);
    this._walkerDot = null;
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
function pathOf(pts) { var d = ''; for (var i = 0; i < pts.length; i++) d += (i ? ' L ' : 'M ') + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1); return d; }

var wlCssDone = false;
function injectWritingLineCSS() {
  if (wlCssDone || typeof document === 'undefined') return;
  wlCssDone = true;
  var css = ''
  + '.wl-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--wl-cell:212px;--wl-gap:12px;--wl-ink:#C64A22;--wl-ink2:#D9542A;--wl-dot:#1F8A55;}'
  /* the line so far (phone) */
  + '.wl-thumbs{display:flex;gap:8px;justify-content:center;}'
  + '.wl-thumb{width:44px;height:44px;border-radius:10px;background:#FFFEFB;border:2px solid var(--lcs-line);box-sizing:border-box;overflow:hidden;}'
  + '.wl-thumb.is-active{border-color:var(--lcs-structure);box-shadow:0 0 0 3px rgba(20,107,94,.14);}'
  + '.wl-thumb.is-done{border-color:var(--lcs-good);}'
  + '.wl-thumbsvg{width:100%;height:100%;display:block;}'
  /* the writing line */
  + '.wl-line{display:flex;gap:var(--wl-gap);justify-content:center;align-items:flex-start;width:100%;}'
  + '.wl-box{width:var(--wl-cell);height:var(--wl-cell);flex:0 0 auto;border-radius:18px;background:#FFFEFB;border:3px solid var(--lcs-line);box-sizing:border-box;overflow:hidden;position:relative;'
  + 'box-shadow:inset 0 2px 0 rgba(255,255,255,.8),0 4px 0 rgba(20,107,94,.10),0 8px 18px rgba(20,30,28,.06);transition:border-color .25s,box-shadow .25s,opacity .25s;}'
  + '.wl-box.is-active{border-color:var(--lcs-structure);box-shadow:0 0 0 4px rgba(20,107,94,.14),0 4px 0 rgba(20,107,94,.12),0 8px 18px rgba(20,30,28,.06);}'
  + '.wl-box.is-wait{opacity:.72;}'
  + '.wl-box.is-done{border-color:var(--lcs-good);}'
  + '.wl-paper{width:100%;height:100%;display:block;touch-action:none;-webkit-user-select:none;user-select:none;}'
  + '.wl-box.is-active .wl-paper{cursor:crosshair;}'
  /* the paper */
  + '.wl-rule{stroke:rgba(20,107,94,.18);stroke-width:.8;} .wl-rule-mid{stroke-dasharray:2 3;} .wl-rule-base{stroke:rgba(20,107,94,.30);stroke-width:1.1;}'
  + '.wl-road{fill:none;stroke:rgba(20,107,94,.30);stroke-width:7;stroke-linecap:butt;stroke-linejoin:round;} .wl-road.is-now{stroke:rgba(20,107,94,.46);} .wl-road.is-done{stroke:rgba(20,107,94,.16);}'
  + '.wl-hair{fill:none;stroke:rgba(20,107,94,.85);stroke-width:1.6;stroke-linecap:butt;stroke-linejoin:round;} .wl-hair.is-faded{stroke:rgba(20,107,94,.34);stroke-dasharray:3 2.5;} .wl-hair.is-done{stroke:rgba(20,107,94,.30);}'
  + '.wl-pip{font-family:var(--lcs-font-display);font-weight:800;font-size:9px;fill:rgba(20,107,94,.85);text-anchor:middle;} .wl-pip.is-done{fill:rgba(20,107,94,.35);}'
  + '.wl-start{fill:var(--wl-dot);stroke:#fff;stroke-width:1.2;animation:wl-pulse 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'
  + '@keyframes wl-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.3);}}'
  + '.wl-ink{fill:none;stroke:var(--wl-ink);stroke-width:5.4;stroke-linecap:round;stroke-linejoin:round;} .wl-ink-live{stroke:var(--wl-ink2);}'
  + '.wl-walker{fill:#F2C879;stroke:#B8860B;stroke-width:.8;pointer-events:none;}'
  + '.wl-bounce{animation:wl-bounce .4s var(--lcs-ease) 1;} @keyframes wl-bounce{0%,100%{transform:none;}40%{transform:translateY(-6px) scale(1.02);}}'
  + '.wl-wobble{animation:wl-wobble .45s var(--lcs-ease) 1;} @keyframes wl-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.wl-pop{animation:wl-pop .5s var(--lcs-ease) 1;} @keyframes wl-pop{0%{transform:none;}45%{transform:scale(1.06);}100%{transform:none;}}'
  /* the strip */
  + '.wl-strip{width:100%;display:flex;align-items:center;gap:12px;box-sizing:border-box;padding:10px 12px;border-radius:18px;background:var(--lcs-surface);border:2px solid var(--lcs-line);}'
  + '.wl-note{flex:1 1 120px;min-width:0;font-family:var(--lcs-font-body);font-weight:700;font-size:15px;line-height:1.3;color:var(--lcs-structure);text-align:center;}'
  + '.wl-note.is-slip{color:var(--lcs-accent);} .wl-note.is-done{color:var(--lcs-good);}'
  + '.wl-tool{min-height:44px;min-width:44px;padding:0 16px 0 12px;border-radius:999px;border:2px solid var(--lcs-structure-soft);background:var(--lcs-surface);font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;}'
  + '.wl-tool:hover{background:var(--lcs-structure-soft);} .wl-tool:disabled{opacity:.45;cursor:default;}'
  + '.wl-rub{color:var(--lcs-accent);}'
  + '@media (max-width:420px){.wl-strip{gap:8px;padding:8px 10px;} .wl-tool{padding:0;width:44px;justify-content:center;} .wl-tool-text{display:none;} .wl-note{font-size:14px;}}'
  + '@media (prefers-reduced-motion:reduce){.wl-start,.wl-box,.wl-thumb{animation:none!important;transition:none!important;} .wl-walker{display:none;}}';
  var style = document.createElement('style');
  style.id = 'wl-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = WritingLineActivity;
if (typeof window !== 'undefined') window.WritingLineActivity = WritingLineActivity;
