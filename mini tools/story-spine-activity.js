/* =====================================================================
   story-spine-activity.js — ACTIVITY #65 of the one-by-one rebuild:
   "Dot's Story Spine" → THE BOOK THAT CRACKS AND MENDS (RL.K.3, 11 locales).
   Design sheet: docs/activities-rebuild/designs/065-story-spine.md
   ---------------------------------------------------------------------
   THE INVENTION: a story is a book that breaks and gets mended. The
   child names the parts (START / TROUBLE / FIX tabs on loose pages),
   chooses the middle page, chooses the end page, or lays the sentences
   under the pictures — and presses the gold stud. The book reads itself:
   the start page plants a green pennant, the trouble page CRACKS with a
   coral zigzag (its thing gets a coral ring), and the fix page sends a
   bandage across that seals the crack (the ring turns teal). A calm page
   cannot crack; a page that makes something else better sends a bandage
   that peels off and flutters down; a page where nothing changed sends
   nothing. A mended book closes and stands on the shelf.

   ACTIVITY LAYER ONLY: the model is story-spine-book-core.js; lcs-shell.js
   and the old story-spine-core.js are untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.StorySpineActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var StorySpineActivity = {
  id: 'story-spine',
  apparatusClasses: ['ssb-'],

  strings: {
    title:        {en:"Dot's Story Spine",de:'Dots Geschichten-Werkstatt',nl:'De verhalenwerkplaats van Dot',da:'Dots fortælleværksted',sv:'Dots berättelseverkstad',no:'Dots fortellerverksted',es:'El taller de cuentos de Dot',it:'La bottega delle storie di Dot',pt:'A oficina de histórias do Fabo',fr:'L’atelier des histoires de Dot',fi:'Dotin tarinapaja'},
    instrName:    {en:'Put START, TROUBLE and FIX on the pages, then read the book.',de:'Leg ANFANG, PROBLEM und LÖSUNG auf die Seiten, dann lies das Buch.',nl:'Leg BEGIN, PROBLEEM en OPLOSSING op de bladzijden en lees dan het boek.',da:'Sæt BEGYNDELSE, PROBLEM og LØSNING på siderne, og læs så bogen.',sv:'Sätt BÖRJAN, PROBLEM och LÖSNING på sidorna och läs sedan boken.',no:'Sett BEGYNNELSE, PROBLEM og LØSNING på sidene, og les så boka.',es:'Pon INICIO, PROBLEMA y SOLUCIÓN en las páginas y luego lee el libro.',it:'Metti INIZIO, PROBLEMA e SOLUZIONE sulle pagine, poi leggi il libro.',pt:'Coloque COMEÇO, PROBLEMA e SOLUÇÃO nas páginas e depois leia o livro.',fr:'Place DÉBUT, PROBLÈME et SOLUTION sur les pages, puis lis le livre.',fi:'Laita ALKU, ONGELMA ja RATKAISU sivuille ja lue sitten kirja.'},
    instrTrouble: {en:'What went wrong? Put the trouble page in the middle.',de:'Was ist schiefgegangen? Leg die Problem-Seite in die Mitte.',nl:'Wat ging er mis? Leg de probleembladzijde in het midden.',da:'Hvad gik galt? Læg problemsiden i midten.',sv:'Vad gick fel? Lägg problemsidan i mitten.',no:'Hva gikk galt? Legg problemsiden i midten.',es:'¿Qué salió mal? Pon la página del problema en medio.',it:'Che cosa è andato storto? Metti la pagina del problema nel mezzo.',pt:'O que deu errado? Coloque a página do problema no meio.',fr:'Qu’est-ce qui ne va pas ? Mets la page du problème au milieu.',fi:'Mikä meni vikaan? Laita ongelmasivu keskelle.'},
    instrFix:     {en:'What fixed it? Put the fix page at the end.',de:'Was hat geholfen? Leg die Lösungs-Seite ans Ende.',nl:'Wat loste het op? Leg de oplossingsbladzijde achteraan.',da:'Hvad hjalp? Læg løsningssiden til sidst.',sv:'Vad hjälpte? Lägg lösningssidan sist.',no:'Hva hjalp? Legg løsningssiden til slutt.',es:'¿Qué lo arregló? Pon la página de la solución al final.',it:'Che cosa ha sistemato tutto? Metti la pagina della soluzione alla fine.',pt:'O que resolveu? Coloque a página da solução no final.',fr:'Qu’est-ce qui a tout arrangé ? Mets la page de la solution à la fin.',fi:'Mikä auttoi? Laita ratkaisusivu loppuun.'},
    instrMatch:   {en:'Put each sentence under its picture.',de:'Leg jeden Satz unter sein Bild.',nl:'Leg elke zin onder zijn plaatje.',da:'Læg hver sætning under sit billede.',sv:'Lägg varje mening under sin bild.',no:'Legg hver setning under bildet sitt.',es:'Pon cada oración debajo de su dibujo.',it:'Metti ogni frase sotto il suo disegno.',pt:'Coloque cada frase embaixo da sua figura.',fr:'Place chaque phrase sous son image.',fi:'Laita jokainen lause kuvansa alle.'},
    read:         {en:'Read the book',de:'Lies das Buch',nl:'Lees het boek',da:'Læs bogen',sv:'Läs boken',no:'Les boka',es:'Lee el libro',it:'Leggi il libro',pt:'Leia o livro',fr:'Lis le livre',fi:'Lue kirja'},
    tabStart:     {en:'Start',de:'Anfang',nl:'Begin',da:'Begyndelse',sv:'Början',no:'Begynnelse',es:'Inicio',it:'Inizio',pt:'Começo',fr:'Début',fi:'Alku'},
    tabTrouble:   {en:'Trouble',de:'Problem',nl:'Probleem',da:'Problem',sv:'Problem',no:'Problem',es:'Problema',it:'Problema',pt:'Problema',fr:'Problème',fi:'Ongelma'},
    tabFix:       {en:'Fix',de:'Lösung',nl:'Oplossing',da:'Løsning',sv:'Lösning',no:'Løsning',es:'Solución',it:'Soluzione',pt:'Solução',fr:'Solution',fi:'Ratkaisu'},
    hintTabs:     {en:'Put a tab on every page.',de:'Leg auf jede Seite ein Kärtchen.',nl:'Leg op elke bladzijde een kaartje.',da:'Sæt et mærke på hver side.',sv:'Sätt en lapp på varje sida.',no:'Sett en lapp på hver side.',es:'Pon una etiqueta en cada página.',it:'Metti un cartellino su ogni pagina.',pt:'Coloque uma etiqueta em cada página.',fr:'Mets une étiquette sur chaque page.',fi:'Laita jokaiselle sivulle lappu.'},
    hintEmpty:    {en:'Put a page in the empty place.',de:'Leg eine Seite auf den leeren Platz.',nl:'Leg een bladzijde op de lege plek.',da:'Læg en side på den tomme plads.',sv:'Lägg en sida på den tomma platsen.',no:'Legg en side på den tomme plassen.',es:'Pon una página en el lugar vacío.',it:'Metti una pagina nel posto vuoto.',pt:'Coloque uma página no lugar vazio.',fr:'Mets une page à la place vide.',fi:'Laita sivu tyhjään paikkaan.'},
    hintStrips:   {en:'Put a sentence under each picture.',de:'Leg unter jedes Bild einen Satz.',nl:'Leg onder elk plaatje een zin.',da:'Læg en sætning under hvert billede.',sv:'Lägg en mening under varje bild.',no:'Legg en setning under hvert bilde.',es:'Pon una oración debajo de cada dibujo.',it:'Metti una frase sotto ogni disegno.',pt:'Coloque uma frase embaixo de cada figura.',fr:'Mets une phrase sous chaque image.',fi:'Laita jokaisen kuvan alle lause.'},
    hintStart:    {en:'START is where the story begins: who is in it.',de:'Am ANFANG lernst du kennen, wer in der Geschichte vorkommt.',nl:'Het BEGIN laat zien wie er in het verhaal zitten.',da:'BEGYNDELSEN viser, hvem der er med i historien.',sv:'BÖRJAN visar vem som är med i berättelsen.',no:'BEGYNNELSEN viser hvem som er med i fortellingen.',es:'El INICIO muestra quiénes están en el cuento.',it:'L’INIZIO fa conoscere chi c’è nella storia.',pt:'O COMEÇO mostra quem está na história.',fr:'Le DÉBUT montre qui est dans l’histoire.',fi:'ALKU kertoo, keitä tarinassa on.'},
    hintTrouble:  {en:'TROUBLE is when something goes wrong.',de:'Das PROBLEM ist, wenn etwas schiefgeht.',nl:'Het PROBLEEM is wanneer er iets misgaat.',da:'PROBLEMET er, når noget går galt.',sv:'PROBLEMET är när något går fel.',no:'PROBLEMET er når noe går galt.',es:'El PROBLEMA es cuando algo sale mal.',it:'Il PROBLEMA è quando qualcosa va storto.',pt:'O PROBLEMA é quando alguma coisa dá errado.',fr:'Le PROBLÈME, c’est quand quelque chose ne va pas.',fi:'ONGELMA on se, kun jokin menee vikaan.'},
    hintFix:      {en:'FIX is how the trouble gets better.',de:'Die LÖSUNG zeigt, wie das Problem besser wird.',nl:'De OPLOSSING laat zien hoe het probleem beter wordt.',da:'LØSNINGEN er, hvordan problemet bliver bedre.',sv:'LÖSNINGEN är hur problemet blir bättre.',no:'LØSNINGEN er hvordan problemet blir bedre.',es:'La SOLUCIÓN es cómo se arregla el problema.',it:'La SOLUZIONE è come il problema si sistema.',pt:'A SOLUÇÃO é como o problema fica melhor.',fr:'La SOLUTION, c’est comment le problème s’arrange.',fi:'RATKAISU kertoo, miten ongelma korjaantuu.'},
    hintCalm:     {en:'Nothing goes wrong on that page.',de:'Auf dieser Seite geht nichts schief.',nl:'Op die bladzijde gaat niets mis.',da:'Der går ikke noget galt på den side.',sv:'Ingenting går fel på den sidan.',no:'Ingenting går galt på den siden.',es:'En esa página no sale nada mal.',it:'In quella pagina non va storto niente.',pt:'Nessa página nada dá errado.',fr:'Rien ne tourne mal sur cette page.',fi:'Sillä sivulla mikään ei mene vikaan.'},
    hintOther:    {en:'Something goes wrong — but the fix doesn’t mend it. Look at the fix page: what does it fix?',de:'Hier geht etwas schief – aber die Lösung hilft dabei nicht. Schau dir die Lösungs-Seite an: Was bringt sie in Ordnung?',nl:'Er gaat iets mis – maar de oplossing helpt daar niet bij. Kijk naar de oplossingsbladzijde: wat lost die op?',da:'Noget går galt – men løsningen hjælper ikke på det. Se på løsningssiden: Hvad ordner den?',sv:'Något går fel – men lösningen hjälper inte mot det. Titta på lösningssidan: vad fixar den?',no:'Noe går galt – men løsningen hjelper ikke på det. Se på løsningssiden: Hva fikser den?',es:'Algo sale mal, pero la solución no lo arregla. Mira la página de la solución: ¿qué arregla?',it:'Qualcosa va storto, ma la soluzione non lo sistema. Guarda la pagina della soluzione: che cosa sistema?',pt:'Alguma coisa dá errado, mas a solução não resolve isso. Olhe a página da solução: o que ela resolve?',fr:'Quelque chose ne va pas, mais la solution ne l’arrange pas. Regarde la page de la solution : qu’est-ce qu’elle arrange ?',fi:'Jokin menee vikaan, mutta ratkaisu ei korjaa sitä. Katso ratkaisusivua: mitä se korjaa?'},
    hintElse:     {en:'That makes something else better. What went wrong?',de:'Das macht etwas anderes besser. Was ist schiefgegangen?',nl:'Dat maakt iets anders beter. Wat ging er mis?',da:'Det gør noget andet bedre. Hvad gik galt?',sv:'Det gör något annat bättre. Vad gick fel?',no:'Det gjør noe annet bedre. Hva gikk galt?',es:'Eso mejora otra cosa. ¿Qué salió mal?',it:'Questo migliora un’altra cosa. Che cosa è andato storto?',pt:'Isso melhora outra coisa. O que deu errado?',fr:'Cela arrange autre chose. Qu’est-ce qui n’allait pas ?',fi:'Se korjaa jotain muuta. Mikä meni vikaan?'},
    hintStill:    {en:'The trouble is still there on that page.',de:'Auf dieser Seite ist das Problem immer noch da.',nl:'Op die bladzijde is het probleem er nog steeds.',da:'Problemet er der stadig på den side.',sv:'Problemet finns kvar på den sidan.',no:'Problemet er der fortsatt på den siden.',es:'En esa página el problema sigue ahí.',it:'In quella pagina il problema c’è ancora.',pt:'Nessa página o problema continua lá.',fr:'Sur cette page, le problème est toujours là.',fi:'Sillä sivulla ongelma on yhä jäljellä.'},
    hintRead:     {en:'Read that sentence again. Does the picture show it?',de:'Lies den Satz noch einmal. Zeigt das Bild das?',nl:'Lees die zin nog eens. Laat het plaatje dat zien?',da:'Læs sætningen igen. Viser billedet det?',sv:'Läs meningen igen. Visar bilden det?',no:'Les setningen igjen. Viser bildet det?',es:'Lee otra vez esa oración. ¿La muestra el dibujo?',it:'Rileggi quella frase. Il disegno la mostra?',pt:'Leia essa frase de novo. A figura mostra isso?',fr:'Relis cette phrase. L’image la montre-t-elle ?',fi:'Lue lause uudelleen. Näkyykö se kuvassa?'},
    okWin:        {en:'Start, trouble, fix — that’s a story!',de:'Anfang, Problem, Lösung – das ist eine Geschichte!',nl:'Begin, probleem, oplossing – dat is een verhaal!',da:'Begyndelse, problem, løsning – det er en historie!',sv:'Början, problem, lösning – det är en berättelse!',no:'Begynnelse, problem, løsning – det er en fortelling!',es:'Inicio, problema, solución: ¡eso es un cuento!',it:'Inizio, problema, soluzione: questa è una storia!',pt:'Começo, problema, solução: isso é uma história!',fr:'Début, problème, solution : c’est une histoire !',fi:'Alku, ongelma, ratkaisu – siinä on tarina!'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setTask:      {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Attività',pt:'Tarefa',fr:'Activité',fi:'Tehtävä'},
    tName:        {en:'Name the parts',de:'Teile benennen',nl:'Benoem de delen',da:'Navngiv delene',sv:'Namnge delarna',no:'Navngi delene',es:'Nombra las partes',it:'Dai un nome alle parti',pt:'Dê nome às partes',fr:'Nomme les parties',fi:'Nimeä osat'},
    tTrouble:     {en:'Find the trouble',de:'Problem finden',nl:'Zoek het probleem',da:'Find problemet',sv:'Hitta problemet',no:'Finn problemet',es:'Busca el problema',it:'Trova il problema',pt:'Encontre o problema',fr:'Trouve le problème',fi:'Etsi ongelma'},
    tFix:         {en:'Find the fix',de:'Lösung finden',nl:'Zoek de oplossing',da:'Find løsningen',sv:'Hitta lösningen',no:'Finn løsningen',es:'Busca la solución',it:'Trova la soluzione',pt:'Encontre a solução',fr:'Trouve la solution',fi:'Etsi ratkaisu'},
    tMatch:       {en:'Match the sentences',de:'Sätze zuordnen',nl:'Zinnen bij de plaatjes',da:'Sætninger til billederne',sv:'Para ihop meningarna',no:'Setninger til bildene',es:'Relaciona las oraciones',it:'Abbina le frasi',pt:'Combine as frases',fr:'Associe les phrases',fi:'Yhdistä lauseet'},
    setWords:     {en:'Words',de:'Wörter',nl:'Woorden',da:'Ord',sv:'Ord',no:'Ord',es:'Palabras',it:'Parole',pt:'Palavras',fr:'Mots',fi:'Sanat'},
    wShown:       {en:'Shown',de:'Anzeigen',nl:'Tonen',da:'Vis',sv:'Visa',no:'Vis',es:'Mostrar',it:'Mostra',pt:'Mostrar',fr:'Afficher',fi:'Näytä'},
    wHidden:      {en:'Hidden',de:'Ausblenden',nl:'Verbergen',da:'Skjul',sv:'Dölj',no:'Skjul',es:'Ocultar',it:'Nascondi',pt:'Esconder',fr:'Masquer',fi:'Piilota'},
    ariaPage:     {en:'Page: {caption}',de:'Seite: {caption}',nl:'Bladzijde: {caption}',da:'Side: {caption}',sv:'Sida: {caption}',no:'Side: {caption}',es:'Página: {caption}',it:'Pagina: {caption}',pt:'Página: {caption}',fr:'Page : {caption}',fi:'Sivu: {caption}'},
    ariaSlot:     {en:'{part} place: {caption}',de:'Platz für {part}: {caption}',nl:'Plek voor {part}: {caption}',da:'Plads til {part}: {caption}',sv:'Plats för {part}: {caption}',no:'Plass til {part}: {caption}',es:'Lugar de {part}: {caption}',it:'Posto per {part}: {caption}',pt:'Lugar: {part} — {caption}',fr:'Place {part} : {caption}',fi:'Paikka – {part}: {caption}'},
    ariaEmpty:    {en:'{part} place: empty',de:'Platz für {part}: leer',nl:'Plek voor {part}: leeg',da:'Plads til {part}: tom',sv:'Plats för {part}: tom',no:'Plass til {part}: tom',es:'Lugar de {part}: vacío',it:'Posto per {part}: vuoto',pt:'Lugar: {part} — vazio',fr:'Place {part} : vide',fi:'Paikka – {part}: tyhjä'},
    ariaTab:      {en:'Tab: {part}',de:'Kärtchen: {part}',nl:'Kaartje: {part}',da:'Mærke: {part}',sv:'Lapp: {part}',no:'Lapp: {part}',es:'Etiqueta: {part}',it:'Cartellino: {part}',pt:'Etiqueta: {part}',fr:'Étiquette : {part}',fi:'Lappu: {part}'},
    ariaStrip:    {en:'Sentence: {caption}',de:'Satz: {caption}',nl:'Zin: {caption}',da:'Sætning: {caption}',sv:'Mening: {caption}',no:'Setning: {caption}',es:'Oración: {caption}',it:'Frase: {caption}',pt:'Frase: {caption}',fr:'Phrase : {caption}',fi:'Lause: {caption}'},
    ariaShelf:    {en:'Finished books',de:'Fertige Bücher',nl:'Afgemaakte boeken',da:'Færdige bøger',sv:'Färdiga böcker',no:'Ferdige bøker',es:'Libros terminados',it:'Libri finiti',pt:'Livros terminados',fr:'Livres terminés',fi:'Valmiit kirjat'},
    ariaTable:    {en:'The table',de:'Der Tisch',nl:'De tafel',da:'Bordet',sv:'Bordet',no:'Bordet',es:'La mesa',it:'Il tavolo',pt:'A mesa',fr:'La table',fi:'Pöytä'},
    liveCrack:    {en:'The trouble page cracked.',de:'Die Problem-Seite ist aufgerissen.',nl:'De probleembladzijde is gescheurd.',da:'Problemsiden revnede.',sv:'Problemsidan sprack.',no:'Problemsiden sprakk.',es:'La página del problema se rompió.',it:'La pagina del problema si è strappata.',pt:'A página do problema rachou.',fr:'La page du problème s’est déchirée.',fi:'Ongelmasivu repesi.'},
    liveMisfit:   {en:'The bandage did not fit.',de:'Das Pflaster hat nicht gepasst.',nl:'De pleister paste niet.',da:'Plastret passede ikke.',sv:'Plåstret passade inte.',no:'Plasteret passet ikke.',es:'La curita no pegó.',it:'Il cerotto non andava bene.',pt:'O curativo não serviu.',fr:'Le pansement n’a pas tenu.',fi:'Laastari ei sopinut.'},
    liveMended:   {en:'The story is mended.',de:'Die Geschichte ist geflickt.',nl:'Het verhaal is weer heel.',da:'Historien er lappet.',sv:'Berättelsen är lagad.',no:'Fortellingen er reparert.',es:'El cuento está arreglado.',it:'La storia è aggiustata.',pt:'A história está consertada.',fr:'L’histoire est réparée.',fi:'Tarina on korjattu.'}
  },

  defaults: { task: 'name', words: 'shown' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'name', labelKey: 'tName' }, { value: 'trouble', labelKey: 'tTrouble' }, { value: 'fix', labelKey: 'tFix' }, { value: 'match', labelKey: 'tMatch' }] },
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: 'shown', labelKey: 'wShown' }, { value: 'hidden', labelKey: 'wHidden' }] }
  ],

  OK_MS: 3600, FAST: false, STEP_MS: 650,
  INSTR: { name: 'instrName', trouble: 'instrTrouble', fix: 'instrFix', match: 'instrMatch' },
  TAB: { start: 'tabStart', trouble: 'tabTrouble', fix: 'tabFix' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null; this._shelf = [];
    injectBookCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._shelf = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return StorySpineBookCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _task: function () { var g = this._set('task'); return StorySpineBookCore.TASKS.indexOf(g) >= 0 ? g : 'name'; },
  _words: function () { return this._set('words') !== 'hidden'; },
  _key: function () { return this._loc() + '/' + this._task(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },
  _part: function (i) { return this._t(this.TAB[StorySpineBookCore.ROLES[i]]); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = StorySpineBookCore.rounds(this._loc(), this._task()); this._poolKey = k; this._order = null; this._deal = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = StorySpineBookCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deal = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deal = null; this._shelf = []; }
    if (!this._deal) this._deal = C.deal(pool, this._order, Math.random);
    var k = this._order[index % n], r = pool[k], dl = this._deal[k], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'story-spine.' + r.loc + '.' + r.id, promptKey: this.INSTR[r.task], promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool.st = C.newState(r, dl); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = StorySpineBookCore, p0 = C.rounds(this._loc(), this._task()); this.st = C.newState(p0[0], C.deal(p0, p0.map(function (_, i) { return i; }), C.seeded('x'))[0]); }
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ssb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._bookEl = api.el('div', 'ssb-book'); wrap.appendChild(this._bookEl);
    this._tableEl = api.el('div', 'ssb-table'); this._tableEl.setAttribute('role', 'group'); wrap.appendChild(this._tableEl);
    this._trayEl = api.el('div', 'ssb-tray'); wrap.appendChild(this._trayEl);
    this._ribbonEl = api.el('div', 'ssb-ribbon'); wrap.appendChild(this._ribbonEl);
    var row = api.el('div', 'ssb-row'); wrap.appendChild(row);
    this._shelfEl = api.el('button', 'ssb-shelf'); this._shelfEl.type = 'button'; this._shelfEl.setAttribute('data-k', 'shelf'); row.appendChild(this._shelfEl);
    this._shelfEl.addEventListener('click', function () { self._openShelf(); });
    var stud = api.el('button', 'ssb-stud'); stud.type = 'button'; stud.setAttribute('data-k', 'check');
    stud.addEventListener('click', function () { self._check(); }); this._studBtn = stud; row.appendChild(stud);
    var note = api.el('p', 'ssb-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._bookEl) return;
    var st = this.st, C = StorySpineBookCore, v = this._view;
    var L = this._L = C.layout(this._width());
    this._wrap.className = 'ssb-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.task + (st.done ? ' is-done' : '') + (this._words() ? '' : ' is-nowords') + (this.FAST ? ' is-fast' : '') + (v.stay || st.done ? ' is-still' : '');
    [['card-w', L.cardW], ['gap', L.gap], ['unit', L.unit], ['area-h', L.areaH]].forEach(function (p) { this._wrap.style.setProperty('--ssb-' + p[0], p[1] + 'px'); }, this);
    this._paintBook();
    this._paintTable();
    this._paintTray();
    this._paintRibbon();
    this._paintShelf();
    var h = C.hint(st), msg = '';
    if (st.done) msg = '';
    else if (h && !this._busy) msg = typeof h === 'string' ? this._t(h) : C.hintText(st, this._loc());
    this._note.textContent = msg;
    this._note.classList.toggle('is-wrong', !!(msg && st.last && st.last.reason !== 'empty'));
    this._studBtn.hidden = !!st.done; this._studBtn.disabled = !!this._busy;
    this._studBtn.innerHTML = '';
    this._studBtn.appendChild(this.api.el('span', 'ssb-knob'));
    var sl = this.api.el('span', 'ssb-studlabel'); sl.textContent = this._t('read'); this._studBtn.appendChild(sl);
    this._studBtn.setAttribute('aria-label', this._t('read'));
  },

  /* a page: its library pictures placed as a scene, the drawn cues of that moment, and the marks the reading leaves */
  _card: function (p, opt) {
    var api = this.api, L = this._L, self = this, o = opt || {}, mk = o.marks || {};
    var b = api.el('span', 'ssb-card' + (o.cls ? ' ' + o.cls : ''));
    var area = api.el('span', 'ssb-pic ssb-sky-' + (p.d.indoor ? 'indoor' : (p.d.sky || 'day')) + (p.d.water ? ' ssb-water' : ''));
    var w = L.cardW - 8, h = L.areaH;
    if (p.d.pond) area.appendChild(api.el('span', 'ssb-pond'));
    p.t.forEach(function (t) {
      var pl = StorySpineBookCore.place(t, w, h, L.unit), s = api.el('span', 'ssb-pp');
      s.style.left = pl.left + 'px'; s.style.bottom = pl.bottom + 'px'; s.style.width = pl.size + 'px'; s.style.height = pl.size + 'px';
      var im = api.el('img', 'ssb-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t[0]);
      im.style.transform = (t[5] ? 'scaleX(-1) ' : '') + (t[4] ? 'rotate(' + t[4] + 'deg)' : '');
      s.appendChild(im);
      if (t[0] === p.thing) {
        s.setAttribute('data-thing', '1');
        if (mk.ring) s.classList.add('is-ring-' + mk.ring);
        if (mk.glow) s.classList.add('is-glow');
      }
      area.appendChild(s);
    });
    if (mk.search) area.appendChild(api.el('span', 'ssb-search'));
    if (mk.ghost) { var gh = api.el('span', 'ssb-ghostmark ssb-mark-' + mk.ghost); area.appendChild(gh); }
    if (mk.pennant) area.appendChild(api.el('span', 'ssb-pennant' + (mk.pennant === 'tip' ? ' is-tip' : '')));
    if (mk.crack) area.appendChild(api.el('span', 'ssb-crack' + (mk.crack === 'sealed' ? ' is-sealed' : '')));
    if (mk.flat) area.appendChild(api.el('span', 'ssb-flat'));
    if (mk.band) { var bd = api.el('img', 'ssb-band is-' + mk.band); bd.alt = ''; bd.draggable = false; bd.src = self._pic(StorySpineBookCore.BANDAGE); area.appendChild(bd); }
    if (mk.idle) area.appendChild(api.el('span', 'ssb-idle'));
    b.appendChild(area);
    if (o.caption) { var c = api.el('span', 'ssb-cap'); c.textContent = p.caption; b.appendChild(c); }
    b.setAttribute('aria-hidden', 'true');
    return b;
  },
  _paintBook: function () {
    var el = this._bookEl, st = this.st, r = st.r, self = this, api = this.api, v = this._view, C = StorySpineBookCore, help = C.helpOf(st) || {};
    el.innerHTML = '';
    var ids = v.preview ? v.preview.ids : (v.bound || st.slots), rr = v.preview ? v.preview.r : r;
    el.className = 'ssb-book' + (v.closing ? ' is-closing' : '') + (v.preview ? ' is-preview' : '');
    el.style.setProperty('--ssb-cover', rr.color);
    for (var i = 0; i < 3; i++) (function (i) {
      var id = ids[i], p = id ? C.page(rr, id) : null, marks = (v.marks && v.marks[i]) || {};
      if (!v.reading && !v.preview && p) {
        if (help.ringFix === id) marks = { ring: 'teal' };
        if (help.ringTrouble === id) marks = { ring: 'coral' };
        if (st.task === 'match' && help.search === i) marks = { search: true };
      }
      var open = st.open === i && !v.preview, s = api.el(st.task === 'name' ? 'div' : 'button', 'ssb-slot' + (open ? ' is-open' : '') + (open && id && st.sel === id ? ' is-sel' : '') + (v.at === i ? ' is-reading' : '') + (help.flash === i && !v.reading ? ' is-flash' : '') + (open && !id && st.show && st.last && st.last.reason === 'empty' ? ' is-pulse' : ''));
      if (st.task !== 'name') s.type = 'button'; else s.setAttribute('role', 'group'); s.setAttribute('data-k', 'slot' + i); s.setAttribute('data-slot', i);
      s.setAttribute('aria-label', p ? self._t('ariaSlot', { part: self._part(i), caption: p.caption }) : self._t('ariaEmpty', { part: self._part(i) }));
      if (p) s.appendChild(self._card(p, { marks: marks, caption: self._words() && st.task !== 'match', cls: v.flyIn ? 'is-flyin' : '' }));
      else s.appendChild(api.el('span', 'ssb-empty' + (st.task === 'name' ? ' is-short' : '')));
      if (p || st.task !== 'name') { var num = api.el('span', 'ssb-num'); num.textContent = String(i + 1); num.setAttribute('aria-hidden', 'true'); s.appendChild(num); }
      if (st.task === 'match' && !v.preview) {
        var cid = st.caps[i], cp = api.el('span', 'ssb-capslot' + (cid ? ' is-full' : '') + (cid && st.sel === cid ? ' is-sel' : '') + (help.underline && help.underline.indexOf(i) >= 0 && cid ? ' is-wrong' : ''));
        cp.setAttribute('data-k', 'cap' + i); cp.setAttribute('data-cap', i);
        if (cid) self._stripText(cp, C.page(r, cid), help.underline && help.underline.indexOf(i) >= 0);
        s.appendChild(cp);
      }
      s.addEventListener('click', function (ev) { self._tapSlot(i, ev); });
      if (open && id) self._bindDrag(s, function () { return st.slots[st.open]; }, 'page');
      if (st.task === 'match' && st.caps[i]) self._bindDrag(s.querySelector('.ssb-capslot'), function () { return st.caps[i]; }, 'strip');
      el.appendChild(s);
    })(i);
  },
  /* a strip's sentence; at a miss its key word is underlined */
  _stripText: function (node, p, mark) {
    var cap = p.caption, idx = ['start', 'trouble', 'fix'].indexOf(p.kind), kw = StorySpineBookCore.keyWord(this._loc(), p.story, idx), at = mark ? cap.indexOf(kw) : -1;
    node.textContent = '';
    if (at < 0) { node.textContent = cap; return; }
    node.appendChild(document.createTextNode(cap.slice(0, at)));
    var u = this.api.el('span', 'ssb-kw'); u.textContent = kw; node.appendChild(u);
    node.appendChild(document.createTextNode(cap.slice(at + kw.length)));
  },
  _paintTable: function () {
    var el = this._tableEl, st = this.st, r = st.r, self = this, api = this.api, v = this._view, C = StorySpineBookCore, help = C.helpOf(st) || {};
    el.innerHTML = ''; el.setAttribute('aria-label', this._t('ariaTable'));
    el.hidden = !!(st.done || v.preview || (st.task === 'name' && v.bound && v.reading) || st.table.every(function (x) { return !x; }));
    st.table.forEach(function (id, i) {
      if (!id) { el.appendChild(api.el('span', 'ssb-hole')); return; }
      var p = C.page(r, id), b;
      if (st.task === 'match') {
        b = api.el('button', 'ssb-strip' + (st.sel === id ? ' is-sel' : '')); self._stripText(b, p, false);
        b.setAttribute('aria-label', self._t('ariaStrip', { caption: p.caption }));
        self._bindDrag(b, function () { return id; }, 'strip');
      } else {
        var tab = st.task === 'name' ? C.tabOn(st, id) : null, marks = {};
        if (help.glow === id) marks.glow = true;
        if (help.mark && help.mark.page === id) marks.ghost = help.mark.role;
        b = api.el('button', 'ssb-loose' + (st.sel === id ? ' is-sel' : '') + (tab ? ' has-tab' : ''));
        if (st.task === 'name') {
          var clip = api.el('span', 'ssb-clip');
          if (tab) { var tb = self._tabEl(tab, st.sel === 'tab:' + tab); clip.appendChild(tb); self._bindDrag(tb, function () { return 'tab:' + C.tabOn(st, id); }, 'tab'); }
          b.appendChild(clip);
        }
        b.appendChild(self._card(p, { marks: marks, caption: self._words() }));
        b.setAttribute('aria-label', self._t('ariaPage', { caption: p.caption }) + (tab ? ' — ' + self._t(self.TAB[tab]) : ''));
        if (st.task !== 'name') self._bindDrag(b, function () { return id; }, 'page');
      }
      b.type = 'button'; b.setAttribute('data-k', 'page-' + id); b.setAttribute('data-page', id);
      b.addEventListener('click', function (ev) { self._tapPage(id, ev); });
      el.appendChild(b);
    });
  },
  _tabEl: function (role, sel) {
    var t = this.api.el('span', 'ssb-tab ssb-tab-' + role + (sel ? ' is-sel' : ''));
    t.appendChild(this.api.el('span', 'ssb-mark ssb-mark-' + role));
    var w = this.api.el('span', 'ssb-tabword'); w.textContent = this._t(this.TAB[role]); t.appendChild(w);
    t.setAttribute('data-tab', role);
    return t;
  },
  _paintTray: function () {
    var el = this._trayEl, st = this.st, self = this, api = this.api, v = this._view;
    el.innerHTML = '';
    el.hidden = !!(st.task !== 'name' || st.done || v.preview || !st.tray.length);
    st.tray.forEach(function (role) {
      var b = api.el('button', 'ssb-trayslot'); b.type = 'button'; b.setAttribute('data-k', 'tab-' + role); b.setAttribute('data-tab', role);
      b.setAttribute('aria-label', self._t('ariaTab', { part: self._t(self.TAB[role]) }));
      b.appendChild(self._tabEl(role, st.sel === 'tab:' + role));
      b.addEventListener('click', function () { self._tapTab(role); });
      self._bindDrag(b, function () { return 'tab:' + role; }, 'tab');
      el.appendChild(b);
    });
  },
  /* the retell ribbon: a starter label over each page's own sentence */
  _paintRibbon: function () {
    var el = this._ribbonEl, st = this.st, api = this.api; el.innerHTML = '';
    el.hidden = !st.done;
    if (!st.done) return;
    StorySpineBookCore.retell(st.r).forEach(function (x, i) {
      var tab = api.el('button', 'ssb-rtab'); tab.type = 'button'; tab.setAttribute('data-k', 'retell' + i);
      var s = api.el('span', 'ssb-starter'); s.textContent = x.starter; tab.appendChild(s);
      var c = api.el('span', 'ssb-rcap'); c.textContent = x.caption; tab.appendChild(c);
      tab.addEventListener('click', function () { StorySpineActivity._say(x.caption); });
      el.appendChild(tab);
    });
  },
  /* the shelf: one spine per mended book this pass; a tap on the shelf opens the shelved books again, one per tap */
  _paintShelf: function () {
    var el = this._shelfEl, self = this, api = this.api, v = this._view;
    el.innerHTML = ''; el.setAttribute('aria-label', this._t('ariaShelf'));
    el.disabled = !this._shelf.length;
    this._shelf.forEach(function (story) {
      var r = (self._pool || []).filter(function (x) { return x.story === story; })[0];
      var b = api.el('span', 'ssb-spine' + (v.preview && v.preview.r.story === story ? ' is-open' : '')); b.setAttribute('data-spine', story);
      b.style.background = r ? r.color : '#888';
      el.appendChild(b);
    });
  },
  _openShelf: function () { if (!this._shelf.length || this._busy) return; this._shelfAt = ((this._shelfAt || 0) + 1) % this._shelf.length; this._preview(this._shelf[this._shelfAt]); },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done || this._view.preview); },
  _clear: function () { this._view = {}; },
  _tapTab: function (role) { if (!this._free()) return; if (StorySpineBookCore.pickTab(this.st, role)) { this._clear(); this.api.sound(this.st.sel ? 560 : 330); this._paint(); } },
  _tapPage: function (id, ev) {
    if (!this._free()) return;
    var C = StorySpineBookCore, st = this.st;
    if (st.task === 'name') {
      var t = ev && ev.target && ev.target.closest ? ev.target.closest('.ssb-tab') : null;
      if (st.sel && st.sel.indexOf('tab:') === 0) { if (C.putTab(st, id)) { this._clear(); this.api.sound(620); this._paint(); } return; }
      if (t || C.tabOn(st, id)) { C.pickTab(st, C.tabOn(st, id)); this._clear(); this.api.sound(560); this._paint(); }
      return;
    }
    if (st.task === 'match') { if (C.pickStrip(st, id)) { this._clear(); this.api.sound(st.sel ? 560 : 330); this._paint(); } return; }
    if (C.pick(st, id)) { this._clear(); this.api.sound(st.sel ? 560 : 330); this._paint(); }
  },
  _tapSlot: function (i, ev) {
    if (this._view.preview) return;
    if (!this._free()) return;
    var C = StorySpineBookCore, st = this.st;
    if (st.task === 'match') {
      if (st.sel) { if (C.putStrip(st, i)) { this._clear(); this.api.sound(620); this._paint(); } return; }
      if (st.caps[i]) { C.pickStrip(st, st.caps[i]); this._clear(); this.api.sound(560); this._paint(); }
      return;
    }
    if (st.task === 'name') return;
    if (i === st.open) {
      if (st.sel) { if (C.put(st)) { this._clear(); this.api.sound(620); this._paint(); } return; }
      if (st.slots[i]) { C.pick(st, st.slots[i]); this._clear(); this.api.sound(560); this._paint(); }
    }
  },
  _bindDrag: function (el, idOf, kind) {
    var self = this;
    if (!el) return;
    el.addEventListener('pointerdown', function (ev) {
      var id = idOf(); if (!id || !self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      ev.stopPropagation();
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var targets = function () { return kind === 'tab' ? self._wrap.querySelectorAll('.ssb-loose') : kind === 'strip' ? self._wrap.querySelectorAll('.ssb-capslot') : self._wrap.querySelectorAll('.ssb-slot.is-open'); };
      var at = function (x, y) { var ss = targets(); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return ss[z]; } return null; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = el.cloneNode(true); ghost.className += ' ssb-ghost'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - 24) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(targets(), function (s) { s.classList.toggle('is-over', s === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var C = StorySpineBookCore, st = self.st, h = at(e.clientX, e.clientY), ok = false;
        st.sel = null;
        if (kind === 'tab') { var role = id.slice(4); if (h) ok = C.pickTab(st, role) && C.putTab(st, h.getAttribute('data-page')); else if (C.pageWithTab(st, role)) C.tabBack(st, role); }
        else if (kind === 'strip') { if (h) ok = C.pickStrip(st, id) && C.putStrip(st, +h.getAttribute('data-cap')); else if (st.caps.indexOf(id) >= 0) C.stripBack(st, id); }
        else { if (h) ok = C.pick(st, id) && C.put(st); else if (st.slots[st.open] === id) C.back(st, id); }
        if (ok) { self._clear(); self.api.sound(620); }
        self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key, C = StorySpineBookCore;
    if (/^[1-3]$/.test(k) && st.sel) {
      ev.preventDefault(); var i = +k - 1;
      if (st.task === 'name') { var id = st.table[i]; if (id) this._tapPage(id); }
      else if (st.task === 'match') this._tapSlot(i);
      else if (C.put(st)) { this._clear(); this._paint(); }
      return;
    }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },

  /* ---------------- the reading ---------------- */
  /* plays the book page by page; marks[i] collects what each page shows */
  _readAnim: function (ids, res, done) {
    var self = this, C = StorySpineBookCore, r = this.st.r, marks = [{}, {}, {}], kinds = ids.map(function (id) { return C.page(r, id).kind; });
    var stop = res.ok ? 3 : res.stopAt, steps = [];
    steps.push(function () { marks[0].pennant = kinds[0] === 'start' ? 'ok' : 'tip'; });
    if (stop >= 1) steps.push(function () {
      if (C.cracks(kinds[1])) { marks[1].crack = 'open'; marks[1].ring = 'coral'; self.api.sound(180); self.api.announce(self._t('liveCrack')); }
      else marks[1].flat = true;
    });
    if (stop >= 2 || (res.reason === 'no-crack' && self.st.task === 'trouble')) steps.push(function () {
      if (!C.cracks(kinds[1])) { marks[1].band = 'slide'; return; }
      if (!C.sendsBandage(kinds[2])) { marks[2].idle = true; return; }
      if (C.mends(kinds[2], kinds[1])) { marks[1].band = 'seal'; marks[1].crack = 'sealed'; marks[1].ring = 'teal'; self.api.sound(659); self._later(function () { self.api.sound(880); }, self._ms(120)); }
      else { marks[1].band = 'peel'; self.api.announce(self._t('liveMisfit')); }
    });
    var k = 0;
    var next = function () {
      if (k >= steps.length) { self._later(done, self._ms(res.ok ? 500 : 1300)); return; }
      steps[k](); self._view = Object.assign({}, self._view, { reading: true, at: Math.min(k, 2), marks: JSON.parse(JSON.stringify(marks)), flyIn: false }); self._paint();
      k++; self._later(next, self._ms(self.STEP_MS));
    };
    this._view = { reading: true, bound: ids, flyIn: true, marks: marks, at: -1 }; this._paint();
    this._later(next, this._ms(350));
  },
  _check: function () {
    if (!this._free()) return;
    var self = this, st = this.st, C = StorySpineBookCore, task = st.task;
    var res = C.read(st);
    if (res.reason === 'empty') { this.api.sound(460); this._clear(); this._paint(); return; }
    if (task === 'match') {
      if (res.ok) return this._win();
      this.api.sound(196); this._clear(); this._paint(); this.api.announce(this._note.textContent || ''); return;
    }
    this._busy = true;
    this._readAnim(res.ids, res, function () {
      if (res.ok) return self._win();
      self.api.sound(196); self._busy = false;
      /* Name: the pages drop back onto the table, tabs still on; Trouble / Fix: the book stays open on the stop */
      var kept = (self._view.marks || []).map(function (m) { m = Object.assign({}, m); if (m.band === 'peel' || m.band === 'slide') delete m.band; return m; });
      self._view = task === 'name' ? {} : { marks: kept, stay: true };
      self._paint(); self.api.announce(self._note.textContent || '');
    });
  },
  _win: function () {
    var self = this, st = this.st, pa = this._pa || {}, msg = this._t('okWin');
    pa.msg = msg; this._busy = true;
    var sealed = [{ pennant: 'ok' }, { crack: 'sealed', ring: 'teal', band: 'sealed' }, {}];
    this._view = { marks: sealed };
    this.api.announce(this._t('liveMended'));
    this._paint();
    this._later(function () { self._view = { marks: sealed, closing: true }; self._paint(); }, this._ms(700));
    this._later(function () { if (self._shelf.indexOf(st.r.story) < 0) self._shelf.push(st.r.story); self._busy = false; self._view = { marks: sealed }; self._paint(); self.api.sound(659); self._later(function () { self.api.sound(784); }, self._ms(110)); self._later(function () { self.api.sound(1046); }, self._ms(220)); }, this._ms(1300));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  /* a shelved book opens again: its three pages, pennant, crack and bandage */
  _preview: function (story) {
    if (this._busy) return;
    var self = this, r = (this._pool || []).filter(function (x) { return x.story === story; })[0]; if (!r) return;
    this._view = { preview: { r: r, ids: r.pages.map(function (p) { return p.id; }) }, marks: [{ pennant: 'ok' }, { crack: 'sealed', ring: 'teal', band: 'sealed' }, {}] };
    this._paint();
    this._later(function () { if (self._view.preview && self._view.preview.r === r) { self._view = self.st.done ? { marks: [{ pennant: 'ok' }, { crack: 'sealed', ring: 'teal', band: 'sealed' }, {}] } : {}; self._paint(); } }, this._ms(2200));
  }
};

var ssbCssDone = false;
function injectBookCSS() {
  if (ssbCssDone || typeof document === 'undefined') return;
  ssbCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ssb-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;--ssb-ink:#2A2A35;--ssb-teal:#146B5E;--ssb-coral:#F2784B;--ssb-cream:#FFF8EC;--ssb-gold:#E8B83A;--ssb-green:#3E9B4F;user-select:none;-webkit-user-select:none;}'
  + '.ssb-wrap:focus{outline:none;}'
  /* the book: a hard cover in the story's colour, three page places */
  + '.ssb-book{position:relative;display:grid;grid-template-columns:repeat(3,var(--ssb-card-w));gap:var(--ssb-gap);justify-content:center;padding:10px calc(var(--ssb-gap) / 2) 8px;border-radius:14px;background:var(--ssb-cover,#8A5A3B);box-shadow:inset 0 0 0 4px rgba(0,0,0,.18),0 6px 14px rgba(0,0,0,.18);transition:transform .5s ease-in,opacity .5s ease-in;}'
  + '.ssb-book::before{content:"";position:absolute;left:50%;top:-6px;width:56px;height:12px;margin-left:-28px;border-radius:6px;background:#C8414B;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2);}'
  + '.ssb-book.is-closing{transform:scaleX(.08) translateY(-20px);opacity:.2;}'
  + '.ssb-slot{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;padding:0;border:0;background:transparent;cursor:default;font:inherit;color:var(--ssb-ink);}'
  + '.ssb-slot.is-open{cursor:pointer;} .ssb-slot.is-open .ssb-empty{border-color:#fff;background:rgba(255,255,255,.35);}'
  + '.ssb-slot.is-over .ssb-card,.ssb-slot.is-over .ssb-empty{box-shadow:inset 0 0 0 4px var(--ssb-teal);}'
  + '.ssb-slot.is-sel .ssb-card{box-shadow:inset 0 0 0 4px var(--ssb-coral);}'
  + '.ssb-slot.is-reading .ssb-card{box-shadow:inset 0 0 0 4px var(--ssb-gold);}'
  + '.ssb-slot.is-flash .ssb-card{animation:ssb-flash .5s ease-in-out 3;} @keyframes ssb-flash{50%{box-shadow:inset 0 0 0 5px var(--ssb-gold);}}'
  + '.ssb-slot.is-pulse .ssb-empty{animation:ssb-pulse 1s ease-in-out 2;} @keyframes ssb-pulse{50%{box-shadow:inset 0 0 0 4px var(--ssb-gold);}}'
  + '.ssb-empty{display:block;width:var(--ssb-card-w);height:var(--ssb-area-h);box-sizing:border-box;border-radius:10px;border:3px dashed rgba(255,255,255,.7);background:rgba(255,255,255,.18);} .ssb-empty.is-short{height:16px;border-width:2px;border-radius:6px;}'
  + '.ssb-num{display:block;min-height:20px;font-family:' + D + ';font-weight:800;font-size:18px;line-height:20px;color:#fff;}'
  /* a page */
  + '.ssb-slot>.ssb-card,.ssb-loose>.ssb-card{flex:1 1 auto;}'
  + '.ssb-card{position:relative;display:flex;flex-direction:column;width:var(--ssb-card-w);box-sizing:border-box;padding:4px;border-radius:10px;background:var(--ssb-cream);box-shadow:inset 0 0 0 2.5px var(--ssb-ink);}'
  + '.ssb-card.is-flyin{animation:ssb-flyin .35s ease-out;} @keyframes ssb-flyin{0%{transform:translateY(60px) scale(.9);opacity:.3;}}'
  + '.ssb-pic{position:relative;display:block;width:100%;height:var(--ssb-area-h);border-radius:7px;overflow:hidden;}'
  + '.ssb-sky-day{background:linear-gradient(#D6ECF9 0,#EEF7FC 70%,#B8DB9A 70%);} .ssb-sky-rain{background:linear-gradient(#B9C6D3 0,#D9E1E8 70%,#A9C79A 70%);} .ssb-sky-night{background:linear-gradient(#2B3563 0,#46548A 70%,#4E6B4A 70%);} .ssb-sky-indoor{background:linear-gradient(#F6E7CC 0,#F6E7CC 72%,#D9B98C 72%);}'
  + '.ssb-pic.ssb-water{background:linear-gradient(#D6ECF9 0,#EEF7FC 62%,#7DB8E3 62%);} .ssb-pic.ssb-water.ssb-sky-rain{background:linear-gradient(#B9C6D3 0,#D9E1E8 62%,#7DA4C6 62%);}'
  + '.ssb-pond{position:absolute;right:-8%;bottom:-6%;width:74%;height:40%;border-radius:50%;background:#7DB8E3;box-shadow:inset 0 5px 0 rgba(255,255,255,.45),inset 0 0 0 3px #5E9CC9;}'
  + '.ssb-pp{position:absolute;display:block;} .ssb-img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;}'
  + '.ssb-pp.is-ring-coral::after,.ssb-pp.is-ring-teal::after,.ssb-pp.is-glow::after{content:"";position:absolute;inset:-4px;border-radius:50%;box-shadow:inset 0 0 0 4px var(--ssb-coral);pointer-events:none;}'
  + '.ssb-pp.is-ring-teal::after{box-shadow:inset 0 0 0 4px var(--ssb-teal);} .ssb-pp.is-glow::after{box-shadow:0 0 0 4px rgba(232,184,58,.85),inset 0 0 0 4px var(--ssb-gold);animation:ssb-glow 1s ease-in-out infinite;} @keyframes ssb-glow{50%{opacity:.4;}}'
  + '.ssb-cap{display:block;margin-top:4px;padding:0 2px;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.25;text-align:left;color:var(--ssb-ink);overflow-wrap:anywhere;-webkit-hyphens:auto;hyphens:auto;}'
  + '.ssb-wrap.is-nowords .ssb-cap{display:none;}'
  /* the marks of the reading */
  + '.ssb-pennant{position:absolute;left:6px;top:4px;width:26px;height:34px;border-left:3px solid var(--ssb-ink);transform-origin:0 100%;animation:ssb-plant .3s ease-out;} .ssb-pennant::after{content:"";position:absolute;left:0;top:0;border-left:22px solid var(--ssb-green);border-top:9px solid transparent;border-bottom:9px solid transparent;animation:ssb-flutter .6s ease-in-out infinite alternate;}'
  + '.ssb-pennant.is-tip{transform:rotate(80deg) translate(10px,-6px);opacity:.75;animation:ssb-tip .5s ease-in;} @keyframes ssb-plant{0%{transform:translateY(-14px);opacity:0;}} @keyframes ssb-flutter{to{transform:skewY(-8deg);}} @keyframes ssb-tip{0%{transform:rotate(0);}}'
  + '.ssb-crack{position:absolute;left:50%;top:0;bottom:0;width:18px;margin-left:-9px;background:var(--ssb-coral);clip-path:polygon(40% 0,70% 0,45% 18%,80% 34%,40% 52%,78% 70%,45% 86%,62% 100%,30% 100%,58% 86%,22% 70%,60% 52%,20% 34%,58% 18%);animation:ssb-tear .25s ease-out;} .ssb-crack.is-sealed{opacity:.35;} @keyframes ssb-tear{0%{clip-path:polygon(40% 0,70% 0,70% 0,40% 0);}}'
  + '.ssb-wrap:not(.is-fast) .ssb-slot.is-reading .ssb-pic:has(.ssb-crack:not(.is-sealed)){animation:ssb-jolt .25s ease-in-out;} @keyframes ssb-jolt{30%{transform:translateX(-3px);}60%{transform:translateX(3px);}}'
  + '.ssb-flat{position:absolute;left:0;right:0;bottom:0;height:5px;background:#B9A988;}'
  + '.ssb-band{position:absolute;left:50%;top:50%;width:var(--ssb-unit);height:var(--ssb-unit);margin:calc(var(--ssb-unit) / -2) 0 0 calc(var(--ssb-unit) / -2);object-fit:contain;pointer-events:none;transform:rotate(-35deg);}'
  + '.ssb-band.is-seal{animation:ssb-seal .45s ease-out;} @keyframes ssb-seal{0%{transform:translateX(calc(var(--ssb-card-w) + var(--ssb-gap))) rotate(-395deg);}}'
  + '.ssb-band.is-peel{animation:ssb-peel 1.1s ease-in forwards;} @keyframes ssb-peel{0%{transform:translateX(calc(var(--ssb-card-w) + var(--ssb-gap))) rotate(-395deg);}35%{transform:rotate(-35deg);}55%{transform:rotate(-35deg) scaleY(.6);}100%{transform:translate(20px,90px) rotate(40deg) scaleY(.6);opacity:0;}}'
  + '.ssb-band.is-slide{animation:ssb-slide 1.1s ease-in forwards;} @keyframes ssb-slide{0%{transform:translateX(calc(var(--ssb-card-w) + var(--ssb-gap))) rotate(-35deg);}50%{transform:translateX(-30px) rotate(-35deg);}100%{transform:translate(-60px,90px) rotate(10deg);opacity:0;}}'
  + '.ssb-idle{position:absolute;right:6px;top:6px;width:34px;height:14px;border-radius:5px;background:#E8C9A8;box-shadow:inset 0 0 0 2px #B98F66;opacity:.8;}'
  + '.ssb-search{position:absolute;left:50%;top:44%;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;border:3px dashed var(--ssb-coral);animation:ssb-look 1.2s ease-in-out;} @keyframes ssb-look{0%{transform:translate(-40px,20px);}50%{transform:translate(30px,-10px);}}'
  /* the faint mark on the page that belongs under the wrong tab (miss 2) */
  + '.ssb-ghostmark{position:absolute;right:6px;top:6px;width:34px;height:34px;opacity:.55;}'
  /* the table and the loose pages */
  + '.ssb-table{display:grid;grid-template-columns:repeat(3,var(--ssb-card-w));gap:var(--ssb-gap);justify-content:center;width:100%;padding-top:10px;border-top:3px dashed #D9C8A8;} .ssb-table[hidden]{display:none;}'
  + '.ssb-hole{display:block;width:var(--ssb-card-w);} '
  + '.ssb-loose{position:relative;display:flex;flex-direction:column;align-items:stretch;padding:0;border:0;background:transparent;cursor:pointer;font:inherit;touch-action:none;transform:rotate(-1.5deg);} .ssb-loose:nth-child(2){transform:rotate(1.5deg);}'
  + '.ssb-loose.is-sel .ssb-card{box-shadow:inset 0 0 0 4px var(--ssb-coral);} .ssb-loose.is-over .ssb-card{box-shadow:inset 0 0 0 4px var(--ssb-teal);}'
  + '.ssb-clip{display:flex;justify-content:center;min-height:44px;margin-bottom:4px;border-radius:10px;border:2px dashed #C9B999;}'
  + '.ssb-loose.has-tab .ssb-clip{border-color:transparent;}'
  /* the tabs */
  + '.ssb-tray{display:grid;grid-template-columns:repeat(3,var(--ssb-card-w));gap:var(--ssb-gap);justify-content:center;} .ssb-tray[hidden]{display:none;}'
  + '.ssb-trayslot{padding:0;border:0;background:transparent;cursor:grab;touch-action:none;display:flex;justify-content:center;}'
  + '.ssb-tab{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:0;max-width:100%;min-height:44px;box-sizing:border-box;padding:0 10px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px var(--ssb-ink),0 3px 0 #C9B999;cursor:grab;touch-action:none;}'
  + '.ssb-tab.is-sel{box-shadow:inset 0 0 0 4px var(--ssb-coral),0 3px 0 #C9B999;transform:translateY(-3px);}'
  + '.ssb-tabword{font-family:' + D + ';font-weight:800;font-size:16px;line-height:1.1;text-transform:uppercase;color:var(--ssb-ink);overflow-wrap:anywhere;}'
  + '.ssb-mark{display:block;flex:none;width:22px;height:22px;}'
  + '.ssb-mark-start{position:relative;border-left:3px solid var(--ssb-ink);box-sizing:border-box;} .ssb-mark-start::after{content:"";position:absolute;left:0;top:1px;border-left:16px solid var(--ssb-green);border-top:7px solid transparent;border-bottom:7px solid transparent;}'
  + '.ssb-mark-trouble{background:var(--ssb-coral);clip-path:polygon(35% 0,70% 0,45% 30%,85% 52%,40% 100%,52% 58%,15% 42%);}'
  + '.ssb-mark-fix{height:12px;width:24px;border-radius:5px;background:repeating-linear-gradient(90deg,#E8C9A8 0 8px,#F7EEE3 8px 16px);box-shadow:inset 0 0 0 2px #B98F66;transform:rotate(-30deg);}'
  /* sentence strips */
  + '.ssb-strip{min-height:48px;padding:8px 10px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px var(--ssb-ink),0 3px 0 #C9B999;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.3;color:var(--ssb-ink);text-align:left;cursor:grab;touch-action:none;overflow-wrap:anywhere;} .ssb-strip.is-sel{box-shadow:inset 0 0 0 4px var(--ssb-coral);}'
  + '.ssb-capslot{display:block;width:var(--ssb-card-w);min-height:48px;box-sizing:border-box;padding:6px 8px;border-radius:8px;border:2px dashed rgba(255,255,255,.8);background:rgba(255,255,255,.2);font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.3;text-align:left;color:var(--ssb-ink);cursor:pointer;touch-action:none;overflow-wrap:anywhere;}'
  + '.ssb-capslot.is-full{border:0;background:#fff;box-shadow:inset 0 0 0 3px var(--ssb-teal);} .ssb-capslot.is-sel{box-shadow:inset 0 0 0 4px var(--ssb-coral);} .ssb-capslot.is-over{box-shadow:inset 0 0 0 4px var(--ssb-teal);background:#fff;}'
  + '.ssb-capslot.is-wrong{box-shadow:inset 0 0 0 3px var(--ssb-coral);} .ssb-kw{text-decoration:underline;text-decoration-color:var(--ssb-coral);text-decoration-thickness:3px;text-underline-offset:3px;}'
  + '.ssb-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.85;}'
  /* the retell ribbon */
  + '.ssb-ribbon{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;max-width:660px;} .ssb-ribbon[hidden]{display:none;}'
  + '.ssb-rtab{display:flex;flex-direction:column;gap:2px;min-height:56px;padding:8px 10px;border:0;border-radius:12px;background:#FFF1BF;box-shadow:inset 0 0 0 3px var(--ssb-gold);text-align:left;cursor:pointer;font:inherit;color:var(--ssb-ink);}'
  + '.ssb-starter{font-family:' + D + ';font-weight:800;font-size:16px;color:#A6461F;} .ssb-rcap{font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.3;overflow-wrap:anywhere;}'
  /* the shelf and the gold stud */
  + '.ssb-row{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;max-width:660px;}'
  + '.ssb-shelf{display:flex;align-items:flex-end;gap:3px;min-height:48px;padding:0 6px 4px;border:0;border-bottom:5px solid #9A6B3E;border-radius:0 0 3px 3px;background:transparent;flex:1 1 auto;min-width:0;cursor:pointer;} .ssb-shelf:disabled{cursor:default;}'
  + '.ssb-spine{display:block;width:16px;height:40px;border-radius:3px 3px 1px 1px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.25),inset 0 8px 0 rgba(255,255,255,.25);flex:none;} .ssb-spine.is-open{transform:translateY(-6px);}'
  + '.ssb-stud{display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 18px 0 8px;border-radius:28px;border:0;background:var(--ssb-cream);box-shadow:inset 0 0 0 3px var(--ssb-ink),0 3px 0 #C9B999;font-family:' + D + ';font-weight:800;font-size:18px;color:var(--ssb-ink);cursor:pointer;flex:none;}'
  + '.ssb-stud[hidden]{display:none;} .ssb-stud:disabled{opacity:.6;}'
  + '.ssb-knob{display:block;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFE89A,#E8B83A 55%,#B8861B);box-shadow:0 2px 0 #8C6512;}'
  + '.ssb-note{width:100%;max-width:660px;min-height:24px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--ssb-teal);text-align:center;} .ssb-note:empty{display:none;} .ssb-note.is-wrong{color:#A6461F;}'
  /* phones */
  + '.ssb-wrap.is-narrow{gap:8px;} .ssb-wrap.is-narrow .ssb-card{padding:3px;} .ssb-wrap.is-narrow .ssb-book{padding:8px 3px 4px;}'
  + '.ssb-wrap.is-narrow .ssb-cap,.ssb-wrap.is-narrow .ssb-strip,.ssb-wrap.is-narrow .ssb-capslot,.ssb-wrap.is-narrow .ssb-rcap{font-size:14px;line-height:1.2;}'
  + '.ssb-wrap.is-narrow .ssb-strip,.ssb-wrap.is-narrow .ssb-capslot{padding:5px 6px;}'
  + '.ssb-strip,.ssb-capslot,.ssb-rcap{-webkit-hyphens:auto;hyphens:auto;}'
  + '.ssb-wrap.is-narrow .ssb-tab{padding:0 4px;gap:4px;width:100%;} .ssb-wrap.is-narrow .ssb-tabword{font-size:14px;text-transform:none;} .ssb-wrap.is-narrow .ssb-mark{width:16px;height:16px;}'
  + '.ssb-wrap.is-narrow .ssb-ribbon{grid-template-columns:1fr;} .ssb-wrap.is-narrow .ssb-rtab{min-height:44px;padding:6px 10px;}'
  + '.ssb-wrap.is-tiny .ssb-num{min-height:16px;font-size:15px;line-height:16px;} .ssb-wrap.is-tiny .ssb-book{padding-top:8px;gap:4px;} .ssb-wrap.is-tiny .ssb-slot{gap:2px;}'
  + '.ssb-wrap.is-tiny{gap:6px;} .ssb-wrap.is-tiny .ssb-stud{min-height:48px;} .ssb-wrap.is-tiny .ssb-knob{width:36px;height:36px;} .ssb-wrap.is-tiny .ssb-shelf{min-height:44px;}'
  + '.ssb-wrap.is-tiny .ssb-cap{line-height:1.15;} .ssb-wrap.is-tiny .ssb-table{padding-top:6px;} .ssb-wrap.is-tiny .ssb-mark{display:none;} .ssb-wrap.is-tiny .ssb-studlabel{display:none;} .ssb-wrap.is-tiny .ssb-stud{padding:0 6px;}'
  + '.ssb-wrap.is-still .ssb-pennant,.ssb-wrap.is-still .ssb-pennant::after,.ssb-wrap.is-still .ssb-crack,.ssb-wrap.is-still .ssb-band,.ssb-wrap.is-still .ssb-pic{animation:none !important;}'
  + '.ssb-wrap.is-fast .ssb-band.is-peel,.ssb-wrap.is-fast .ssb-band.is-slide{display:none;}'
  + '.ssb-wrap.is-fast *,.ssb-wrap.is-fast *::before,.ssb-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ssb-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}'
  + '@media print{.ssb-row,.ssb-note{display:none;}}';
  var s = document.createElement('style'); s.id = 'ssb-css'; s.textContent = css; document.head.appendChild(s);
}
