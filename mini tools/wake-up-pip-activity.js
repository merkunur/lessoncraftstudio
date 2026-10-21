/* =====================================================================
   wake-up-pip-activity.js — ACTIVITY #64 of the one-by-one rebuild:
   "Wake Up, Pip!" → THE FLIPBOOK (RL.K.2, 11 locales).
   Design sheet: docs/activities-rebuild/designs/064-wake-up-pip.md
   ---------------------------------------------------------------------
   THE INVENTION: a flipbook only moves when its pages are in story
   order. A little story plays in the flipbook (WATCH), then its pages
   fall out. The child stacks the pages back into the slots and pulls
   Flip!: the book riffles through the stack and the library pictures
   glide from page to page. A wrong order runs backwards and the flip
   stops there; a page where nothing in the story changes is a dead
   frame; a page from somewhere else pops a stranger in. In order, the
   story plays through, sleepy Pip (under his blanket in the corner)
   sits up, and the retell ribbon tells the story back: First, Next,
   Then, At the end — each starter over its page's own sentence.

   ACTIVITY LAYER ONLY: the model is wake-up-pip-core.js; lcs-shell.js
   and the shared retell-story-core.js are untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.WakeUpPipActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var WakeUpPipActivity = {
  id: 'wake-up-pip',
  apparatusClasses: ['wup-'],

  strings: {
    title:        {en:'Wake Up, Pip!',de:'Wach auf, Pip!',nl:'Word wakker, Pip!',da:'Vågn op, Pip!',sv:'Vakna, Pip!',no:'Våkn opp, Pip!',es:'¡Despierta, Pip!',it:'Svegliati, Pip!',pt:'Acorda, Pip!',fr:'Réveille-toi, Pip !',fi:'Herää, Pip!'},
    instrOrder:   {en:'Put the pages in story order, then flip the book for Pip.',de:'Leg die Seiten in die richtige Reihenfolge und blättere das Buch für Pip durch.',nl:'Leg de bladzijden in de goede volgorde en blader het boekje door voor Pip.',da:'Læg siderne i den rigtige rækkefølge, og bladr bogen igennem for Pip.',sv:'Lägg sidorna i rätt ordning och bläddra igenom boken för Pip.',no:'Legg sidene i riktig rekkefølge, og bla gjennom boka for Pip.',es:'Pon las páginas en el orden del cuento y hojea el libro para Pip.',it:'Metti le pagine in ordine e sfoglia il libro per Pip.',pt:'Coloque as páginas na ordem da história e folheie o livro para o Pip.',fr:'Remets les pages dans l’ordre de l’histoire, puis feuillette le livre pour Pip.',fi:'Laita sivut tarinan järjestykseen ja selaa kirja Pipille.'},
    instrMissing: {en:'One page is missing. Find the page that moves the story.',de:'Eine Seite fehlt. Finde die Seite, mit der die Geschichte weitergeht.',nl:'Er mist een bladzijde. Zoek de bladzijde waarmee het verhaal verdergaat.',da:'Der mangler en side. Find den side, der får historien videre.',sv:'En sida saknas. Hitta sidan som för berättelsen framåt.',no:'En side mangler. Finn siden som får fortellingen videre.',es:'Falta una página. Busca la página que hace avanzar el cuento.',it:'Manca una pagina. Trova la pagina che fa andare avanti la storia.',pt:'Falta uma página. Encontre a página que faz a história andar.',fr:'Il manque une page. Trouve la page qui fait avancer l’histoire.',fi:'Yksi sivu puuttuu. Etsi sivu, joka vie tarinaa eteenpäin.'},
    instrFix:     {en:'Something is wrong in this flipbook. Fix it, then flip.',de:'In diesem Daumenkino stimmt etwas nicht. Bring es in Ordnung und blättere dann.',nl:'Er klopt iets niet in dit flipboekje. Maak het goed en blader dan.',da:'Der er noget galt i denne flipbog. Ret det, og bladr så.',sv:'Något är fel i den här blädderboken. Rätta till det och bläddra sedan.',no:'Noe er galt i denne flippboka. Fiks det, og bla så.',es:'Algo está mal en este libro animado. Arréglalo y hojéalo.',it:'C’è qualcosa che non va in questo libro animato. Sistemalo e poi sfoglia.',pt:'Tem algo errado neste livro animado. Conserte e depois folheie.',fr:'Quelque chose ne va pas dans ce folioscope. Répare-le, puis feuillette.',fi:'Tässä selauskirjassa on jotain vialla. Korjaa se ja selaa sitten.'},
    instrCaps:    {en:'Put each sentence under its picture.',de:'Leg jeden Satz unter sein Bild.',nl:'Leg elke zin onder zijn plaatje.',da:'Læg hver sætning under sit billede.',sv:'Lägg varje mening under sin bild.',no:'Legg hver setning under bildet sitt.',es:'Pon cada oración debajo de su dibujo.',it:'Metti ogni frase sotto il suo disegno.',pt:'Coloque cada frase embaixo da sua figura.',fr:'Place chaque phrase sous son image.',fi:'Laita jokainen lause kuvansa alle.'},
    flip:         {en:'Flip!',de:'Blättern!',nl:'Bladeren!',da:'Bladr!',sv:'Bläddra!',no:'Bla!',es:'¡Hojear!',it:'Sfoglia!',pt:'Folhear!',fr:'Feuilleter !',fi:'Selaa!'},
    watch:        {en:'Watch again',de:'Noch mal ansehen',nl:'Nog eens kijken',da:'Se igen',sv:'Titta igen',no:'Se igjen',es:'Ver otra vez',it:'Guarda di nuovo',pt:'Ver de novo',fr:'Revoir',fi:'Katso uudelleen'},
    hintEmpty:    {en:'Put a page in every slot, then flip.',de:'Leg in jedes Feld eine Seite und blättere dann.',nl:'Leg in elk vak een bladzijde en blader dan.',da:'Læg en side i hvert felt, og bladr så.',sv:'Lägg en sida i varje ruta och bläddra sedan.',no:'Legg en side i hver rute, og bla så.',es:'Pon una página en cada lugar y hojea.',it:'Metti una pagina in ogni posto e poi sfoglia.',pt:'Coloque uma página em cada lugar e depois folheie.',fr:'Mets une page dans chaque case, puis feuillette.',fi:'Laita jokaiseen paikkaan sivu ja selaa sitten.'},
    hintBack:     {en:'The story ran backwards here. Which page comes first?',de:'Hier läuft die Geschichte rückwärts. Welche Seite kommt zuerst?',nl:'Hier loopt het verhaal achteruit. Welke bladzijde komt eerst?',da:'Her går historien baglæns. Hvilken side kommer først?',sv:'Här går berättelsen baklänges. Vilken sida kommer först?',no:'Her går fortellingen baklengs. Hvilken side kommer først?',es:'Aquí el cuento va hacia atrás. ¿Qué página va primero?',it:'Qui la storia va all’indietro. Quale pagina viene prima?',pt:'Aqui a história anda para trás. Qual página vem primeiro?',fr:'Ici, l’histoire recule. Quelle page vient d’abord ?',fi:'Tässä tarina kulkee takaperin. Mikä sivu tulee ensin?'},
    hintDead:     {en:'Nothing in the story changes on this page.',de:'Auf dieser Seite passiert in der Geschichte nichts.',nl:'Op deze bladzijde gebeurt er niets in het verhaal.',da:'På denne side sker der ikke noget i historien.',sv:'På den här sidan händer ingenting i berättelsen.',no:'På denne siden skjer det ingenting i fortellingen.',es:'En esta página no cambia nada del cuento.',it:'In questa pagina nella storia non cambia niente.',pt:'Nesta página nada muda na história.',fr:'Sur cette page, rien ne change dans l’histoire.',fi:'Tällä sivulla tarinassa ei muutu mikään.'},
    hintForeign:  {en:'That did not happen in the story.',de:'Das ist in der Geschichte nicht passiert.',nl:'Dat is niet gebeurd in het verhaal.',da:'Det skete ikke i historien.',sv:'Det hände inte i berättelsen.',no:'Det skjedde ikke i fortellingen.',es:'Eso no pasó en el cuento.',it:'Questo nella storia non è successo.',pt:'Isso não aconteceu na história.',fr:'Cela ne s’est pas passé dans l’histoire.',fi:'Sitä ei tapahtunut tarinassa.'},
    hintMiss2:    {en:'Watch the story again and follow each page.',de:'Schau dir die Geschichte noch einmal an und folge jeder Seite.',nl:'Kijk nog eens naar het verhaal en volg elke bladzijde.',da:'Se historien igen, og følg hver side.',sv:'Titta på berättelsen igen och följ varje sida.',no:'Se fortellingen igjen, og følg hver side.',es:'Mira el cuento otra vez y sigue cada página.',it:'Guarda di nuovo la storia e segui ogni pagina.',pt:'Veja a história de novo e acompanhe cada página.',fr:'Regarde encore l’histoire et suis chaque page.',fi:'Katso tarina uudelleen ja seuraa jokaista sivua.'},
    hintCapEmpty: {en:'Put a sentence under every page, then flip.',de:'Leg unter jede Seite einen Satz und blättere dann.',nl:'Leg onder elke bladzijde een zin en blader dan.',da:'Læg en sætning under hver side, og bladr så.',sv:'Lägg en mening under varje sida och bläddra sedan.',no:'Legg en setning under hver side, og bla så.',es:'Pon una oración debajo de cada página y hojea.',it:'Metti una frase sotto ogni pagina e poi sfoglia.',pt:'Coloque uma frase embaixo de cada página e depois folheie.',fr:'Mets une phrase sous chaque page, puis feuillette.',fi:'Laita jokaisen sivun alle lause ja selaa sitten.'},
    hintCapWrong: {en:'That sentence does not tell this picture.',de:'Dieser Satz passt nicht zu dem Bild.',nl:'Die zin hoort niet bij dit plaatje.',da:'Den sætning passer ikke til billedet.',sv:'Den meningen passar inte till bilden.',no:'Den setningen passer ikke til bildet.',es:'Esa oración no va con este dibujo.',it:'Questa frase non va con questo disegno.',pt:'Essa frase não combina com esta figura.',fr:'Cette phrase ne va pas avec cette image.',fi:'Tuo lause ei sovi tähän kuvaan.'},
    okWin:        {en:'Pip is awake! Thank you for telling the story.',de:'Pip ist wach! Danke, dass du die Geschichte erzählt hast.',nl:'Pip is wakker! Bedankt dat je het verhaal hebt verteld.',da:'Pip er vågen! Tak, fordi du fortalte historien.',sv:'Pip är vaken! Tack för att du berättade.',no:'Pip er våken! Takk for at du fortalte historien.',es:'¡Pip despertó! Gracias por contar el cuento.',it:'Pip è sveglio! Grazie per aver raccontato la storia.',pt:'O Pip acordou! Obrigado por contar a história.',fr:'Pip est réveillé ! Merci d’avoir raconté l’histoire.',fi:'Pip on hereillä! Kiitos, että kerroit tarinan.'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setGame:      {en:'Game',de:'Spiel',nl:'Spel',da:'Spil',sv:'Spel',no:'Spill',es:'Juego',it:'Gioco',pt:'Jogo',fr:'Jeu',fi:'Peli'},
    gOrder:       {en:'Story order',de:'Reihenfolge',nl:'Volgorde',da:'Rækkefølge',sv:'Ordning',no:'Rekkefølge',es:'Orden del cuento',it:'In ordine',pt:'Na ordem',fr:'Dans l’ordre',fi:'Järjestys'},
    gMissing:     {en:'The missing page',de:'Die fehlende Seite',nl:'De ontbrekende bladzijde',da:'Den manglende side',sv:'Sidan som saknas',no:'Siden som mangler',es:'La página que falta',it:'La pagina mancante',pt:'A página que falta',fr:'La page manquante',fi:'Puuttuva sivu'},
    gFix:         {en:'Fix the flipbook',de:'Daumenkino reparieren',nl:'Flipboekje herstellen',da:'Ret flipbogen',sv:'Laga blädderboken',no:'Fiks flippboka',es:'Arregla el libro animado',it:'Sistema il libro animato',pt:'Conserte o livro animado',fr:'Répare le folioscope',fi:'Korjaa selauskirja'},
    setPages:     {en:'Book',de:'Buch',nl:'Boek',da:'Bog',sv:'Bok',no:'Bok',es:'Libro',it:'Libro',pt:'Livro',fr:'Livre',fi:'Kirja'},
    pg3:          {en:'3 pages',de:'3 Seiten',nl:'3 bladzijden',da:'3 sider',sv:'3 sidor',no:'3 sider',es:'3 páginas',it:'3 pagine',pt:'3 páginas',fr:'3 pages',fi:'3 sivua'},
    pg4:          {en:'4 pages',de:'4 Seiten',nl:'4 bladzijden',da:'4 sider',sv:'4 sidor',no:'4 sider',es:'4 páginas',it:'4 pagine',pt:'4 páginas',fr:'4 pages',fi:'4 sivua'},
    setCaps:      {en:'Sentences',de:'Sätze',nl:'Zinnen',da:'Sætninger',sv:'Meningar',no:'Setninger',es:'Oraciones',it:'Frasi',pt:'Frases',fr:'Phrases',fi:'Lauseet'},
    capOff:       {en:'Pictures only',de:'Nur Bilder',nl:'Alleen plaatjes',da:'Kun billeder',sv:'Bara bilder',no:'Bare bilder',es:'Solo dibujos',it:'Solo disegni',pt:'Só figuras',fr:'Images seules',fi:'Vain kuvat'},
    capOn:        {en:'Match the sentences',de:'Sätze zuordnen',nl:'Zinnen erbij zoeken',da:'Find sætningerne',sv:'Para ihop meningarna',no:'Finn setningene',es:'Relaciona las oraciones',it:'Abbina le frasi',pt:'Combine as frases',fr:'Associe les phrases',fi:'Yhdistä lauseet'},
    ariaPage:     {en:'Page: {caption}',de:'Seite: {caption}',nl:'Bladzijde: {caption}',da:'Side: {caption}',sv:'Sida: {caption}',no:'Side: {caption}',es:'Página: {caption}',it:'Pagina: {caption}',pt:'Página: {caption}',fr:'Page : {caption}',fi:'Sivu: {caption}'},
    ariaSlot:     {en:'Slot {n}: {caption}',de:'Feld {n}: {caption}',nl:'Vak {n}: {caption}',da:'Felt {n}: {caption}',sv:'Ruta {n}: {caption}',no:'Rute {n}: {caption}',es:'Lugar {n}: {caption}',it:'Posto {n}: {caption}',pt:'Lugar {n}: {caption}',fr:'Case {n} : {caption}',fi:'Paikka {n}: {caption}'},
    ariaEmpty:    {en:'Slot {n}: empty',de:'Feld {n}: leer',nl:'Vak {n}: leeg',da:'Felt {n}: tomt',sv:'Ruta {n}: tom',no:'Rute {n}: tom',es:'Lugar {n}: vacío',it:'Posto {n}: vuoto',pt:'Lugar {n}: vazio',fr:'Case {n} : vide',fi:'Paikka {n}: tyhjä'},
    ariaPip:      {en:'Pip the hedgehog — {state}',de:'Pip, der Igel – {state}',nl:'Pip de egel – {state}',da:'Pindsvinet Pip – {state}',sv:'Igelkotten Pip – {state}',no:'Pinnsvinet Pip – {state}',es:'Pip el erizo: {state}',it:'Pip il riccio – {state}',pt:'Pip, o ouriço – {state}',fr:'Pip le hérisson – {state}',fi:'Siili Pip – {state}'},
    pipAsleep:    {en:'asleep',de:'schläft',nl:'slaapt',da:'sover',sv:'sover',no:'sover',es:'dormido',it:'dorme',pt:'dormindo',fr:'endormi',fi:'nukkuu'},
    pipAwake:     {en:'awake',de:'wach',nl:'wakker',da:'vågen',sv:'vaken',no:'våken',es:'despierto',it:'sveglio',pt:'acordado',fr:'réveillé',fi:'hereillä'},
    ariaStrip:    {en:'Sentence: {caption}',de:'Satz: {caption}',nl:'Zin: {caption}',da:'Sætning: {caption}',sv:'Mening: {caption}',no:'Setning: {caption}',es:'Oración: {caption}',it:'Frase: {caption}',pt:'Frase: {caption}',fr:'Phrase : {caption}',fi:'Lause: {caption}'},
    ariaTray:     {en:'Loose pages',de:'Lose Seiten',nl:'Losse bladzijden',da:'Løse sider',sv:'Lösa sidor',no:'Løse sider',es:'Páginas sueltas',it:'Pagine sparse',pt:'Páginas soltas',fr:'Pages en vrac',fi:'Irralliset sivut'}
  },

  defaults: { game: 'order', pages: '4', caps: 'off' },
  settings: [
    { key: 'game', type: 'choice', labelKey: 'setGame', options: [{ value: 'order', labelKey: 'gOrder' }, { value: 'missing', labelKey: 'gMissing' }, { value: 'fix', labelKey: 'gFix' }] },
    { key: 'pages', type: 'choice', labelKey: 'setPages', options: [{ value: '3', labelKey: 'pg3' }, { value: '4', labelKey: 'pg4' }] },
    { key: 'caps', type: 'choice', labelKey: 'setCaps', options: [{ value: 'off', labelKey: 'capOff' }, { value: 'on', labelKey: 'capOn' }] }
  ],

  OK_MS: 3400, FAST: false, WATCH_MS: 1600, STEP_MS: 700,
  INSTR: { order: 'instrOrder', missing: 'instrMissing', fix: 'instrFix' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._watched = 0; this._drag = null;
    injectFlipCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return WakeUpPipCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _game: function () { var g = this._set('game'); return WakeUpPipCore.LEVELS.indexOf(g) >= 0 ? g : 'order'; },
  _n: function () { return String(this._set('pages')) === '3' ? 3 : 4; },
  _caps: function () { return this._set('caps') === 'on'; },
  _key: function () { return this._loc() + '/' + this._game() + '/' + this._n(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = WakeUpPipCore.rounds(this._loc(), this._game(), this._n()); this._poolKey = k; this._order = null; this._deal = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = WakeUpPipCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deal = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deal = null; }
    if (!this._deal) this._deal = C.deal(pool, Math.random);
    var k = this._order[index % n], r = pool[k], dl = this._deal[k], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'wake-up-pip.' + r.loc + '.' + r.id, promptKey: this.INSTR[r.level], promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._view = {}; tool._watched = 0; tool._drag = null;
        tool.st = C.newState(r, dl); tool.st.withCaptions = tool._caps();
        tool._startWatch();
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = WakeUpPipCore, r0 = C.rounds(this._loc(), 'order', 4)[0]; this.st = C.newState(r0, C.deal([r0], C.seeded('x'))[0]); }
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
    var wrap = api.el('div', 'wup-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    this._stageEl = api.el('div', 'wup-stage'); wrap.appendChild(this._stageEl);
    this._socketsEl = api.el('div', 'wup-sockets'); this._stageEl.appendChild(this._socketsEl);
    this._viewer = api.el('div', 'wup-viewer'); this._viewer.setAttribute('aria-hidden', 'true'); this._stageEl.appendChild(this._viewer);
    this._trayEl = api.el('div', 'wup-tray'); this._trayEl.setAttribute('role', 'group'); wrap.appendChild(this._trayEl);
    this._ribbonEl = api.el('div', 'wup-ribbon'); wrap.appendChild(this._ribbonEl);
    var row = api.el('div', 'wup-row'); wrap.appendChild(row);
    this._pipEl = api.el('button', 'wup-pip'); this._pipEl.type = 'button'; this._pipEl.setAttribute('data-k', 'pip');
    this._pipEl.addEventListener('click', function () { self._view = Object.assign({}, self._view, { poke: true }); self._paint(); self._later(function () { self._view = Object.assign({}, self._view, { poke: false }); self._paint(); }, 700); });
    row.appendChild(this._pipEl);
    var watch = api.el('button', 'wup-watch'); watch.type = 'button'; watch.setAttribute('data-k', 'watch'); watch.addEventListener('click', function () { self._watchAgain(); }); this._watchBtn = watch; row.appendChild(watch);
    var chk = api.el('button', 'wup-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'wup-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
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
    if (!this._socketsEl) return;
    var st = this.st, C = WakeUpPipCore, r = st.r, v = this._view;
    var L = this._L = C.layout(this._width(), r.n);
    this._wrap.className = 'wup-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 330 ? ' is-tiny' : '') + ' is-' + st.phase + (v.watching ? ' is-watching' : '') + (this.FAST ? ' is-fast' : '');
    [['card-w', L.cardW], ['card-h', L.cardH], ['unit', L.unit], ['view-w', L.viewW], ['view-h', L.viewH], ['vunit', L.viewUnit], ['pip', L.pip]].forEach(function (p) { this._wrap.style.setProperty('--wup-' + p[0], p[1] + 'px'); }, this);
    this._paintSockets();
    this._paintTray();
    this._paintRibbon();
    this._paintViewer();
    var awake = st.done || v.awake;
    this._pipEl.className = 'wup-pip' + (awake ? ' is-awake' : '') + (v.stir ? ' is-stir' : '') + (v.poke ? ' is-poke' : '');
    this._pipEl.setAttribute('aria-label', this._t('ariaPip', { state: this._t(awake ? 'pipAwake' : 'pipAsleep') }));
    this._pipEl.innerHTML = '';
    var pim = this.api.el('img', 'wup-pipimg'); pim.alt = ''; pim.src = this._pic(C.PIP); pim.draggable = false; this._pipEl.appendChild(pim);
    if (!awake) { var bl = this.api.el('span', 'wup-blanket'); bl.setAttribute('aria-hidden', 'true'); this._pipEl.appendChild(bl); if (v.poke) { var z = this.api.el('span', 'wup-puff'); z.setAttribute('aria-hidden', 'true'); this._pipEl.appendChild(z); } }
    var canWatch = !st.done && !v.watching && (r.n === 3 || this._watched < 2);
    this._watchBtn.innerHTML = ''; var wl = this.api.el('span', 'wup-wlabel'); wl.textContent = this._t('watch'); this._watchBtn.appendChild(wl); var wi = this.api.el('span', 'wup-wicon'); wi.textContent = '↺'; wi.setAttribute('aria-hidden', 'true'); this._watchBtn.appendChild(wi); this._watchBtn.setAttribute('aria-label', this._t('watch')); this._watchBtn.hidden = !canWatch; this._watchBtn.classList.toggle('is-glow', !!(st.show && st.help >= 2));
    var h = C.hint(st), msg = '';
    if (st.done) msg = v.msg || '';
    else if (h && !this._busy) msg = this._t(h);
    else if (st.phase === 'captions' && !this._busy) msg = this._t('instrCaps');
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && ['backwards', 'dead', 'foreign', 'capWrong'].indexOf(st.last.result) >= 0));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!(this._busy || v.watching);
    this._checkBtn.textContent = this._t('flip');
  },
  /* a page card: its pictures side by side, each at its height in the story, with the drawn cues of that moment */
  _card: function (p, cls) {
    var api = this.api, L = this._L, self = this, f = p.frame, b = api.el('span', 'wup-card ' + (cls || '') + ' wup-sky-' + (f.d.sky || (f.d.indoor ? 'indoor' : 'day')) + (f.d.sand ? ' wup-sand' : ''));
    var row = api.el('span', 'wup-cardrow'); b.appendChild(row);
    /* every picture keeps its own size (the mother duck stays bigger than her duckling); two that do not fit side by side overlap a little instead of shrinking */
    var ts = f.t.slice().sort(function (a, c) { return a[1] - c[1]; }), total = ts.reduce(function (a, t) { return a + L.unit * Math.min(t[3], L.capS); }, 0);
    row.style.gap = (ts.length > 1 && total > L.cardW - 12 ? Math.floor((L.cardW - 12 - total) / (ts.length - 1)) : 6) + 'px';
    ts.forEach(function (t) {
      var s = Math.min(t[3], L.capS), size = L.unit * s, w = api.el('span', 'wup-cpic' + (f.d.shake && t[0] === 'tree/apple' ? ' is-shake' : ''));
      var lift = Math.max(0, Math.min(1, (96 - t[2]) / 60)) * Math.max(0, L.cardH - size - 4);
      w.style.width = size + 'px'; w.style.height = size + 'px'; w.style.marginBottom = lift + 'px';
      var im = api.el('img', 'wup-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t[0]);
      im.style.transform = (t[5] ? 'scaleX(-1) ' : '') + (t[4] ? 'rotate(' + t[4] + 'deg)' : '');
      w.appendChild(im);
      if (t[0] === 'kitchen tools/glass' && f.d.water) { var wa = api.el('span', 'wup-water'); wa.style.height = (f.d.water * .72) + '%'; w.appendChild(wa); for (var q = 0; q < (f.d.pebbles || 0); q++) { var pb = api.el('span', 'wup-pebble'); pb.style.left = (26 + (q % 3) * 16) + '%'; pb.style.bottom = (8 + Math.floor(q / 3) * 9) + '%'; w.appendChild(pb); } }
      row.appendChild(w);
    });
    if (f.d.ray) b.appendChild(api.el('span', 'wup-ray'));
    if (f.d.count) { var c = api.el('span', 'wup-count'); c.textContent = '3 · 2 · 1'; b.appendChild(c); }
    if (f.d.peep) { var pe = api.el('span', 'wup-peep'); pe.textContent = '♪ ♪'; b.appendChild(pe); }
    if (f.d.seed) b.appendChild(api.el('span', 'wup-seed'));
    if (f.d.wave) { var wv = api.el('span', 'wup-wave'); wv.style.height = f.d.wave + '%'; b.appendChild(wv); }
    if (f.dead && cls && cls.indexOf('is-dead') >= 0) b.appendChild(api.el('span', 'wup-pause'));
    b.setAttribute('aria-hidden', 'true');
    return b;
  },
  _dots: function (n) { var d = this.api.el('span', 'wup-tab'); for (var i = 0; i < n; i++) d.appendChild(this.api.el('span', 'wup-dot')); d.setAttribute('aria-hidden', 'true'); return d; },
  _paintSockets: function () {
    var el = this._socketsEl, st = this.st, r = st.r, self = this, api = this.api, v = this._view, help = WakeUpPipCore.helpOf(st);
    el.innerHTML = '';
    st.sockets.forEach(function (id, i) {
      var p = id ? WakeUpPipCore.page(r, id) : null;
      var bad = v.breakAt !== undefined && (i === v.breakAt || (v.breakKind === 'backwards' && i === v.breakAt - 1));
      var s = api.el('button', 'wup-socket' + (st.locked[i] ? ' is-locked' : '') + (id && st.sel === id ? ' is-sel' : '') + (!id && st.show && st.last && st.last.result === 'empty' ? ' is-pulse' : '') + (bad ? ' is-jiggle' : '') + (v.playing === i ? ' is-playing' : ''));
      s.type = 'button'; s.setAttribute('data-k', 'socket' + i); s.setAttribute('data-socket', i);
      s.setAttribute('aria-label', p ? self._t('ariaSlot', { n: i + 1, caption: p.caption }) : self._t('ariaEmpty', { n: i + 1 }));
      if (p) s.appendChild(self._card(p, (v.breakKind === 'dead' && i === v.breakAt ? 'is-dead' : '')));
      else s.appendChild(api.el('span', 'wup-empty'));
      /* miss 2: the page that belongs in the first wrong slot shows there as a faint outline */
      if (help && help.ghost === i) { var g = self._card(WakeUpPipCore.page(r, help.page), 'is-ghost'); g.setAttribute('data-ghost', help.page); s.appendChild(g); }
      s.appendChild(self._dots(i + 1));
      if (st.phase === 'captions') {
        var cid = st.caps[i], cp = api.el('span', 'wup-capslot' + (cid ? ' is-full' : '') + (cid && st.sel === cid ? ' is-sel' : ''));
        cp.textContent = cid ? WakeUpPipCore.page(r, cid).caption : '';
        s.appendChild(cp);
      }
      s.addEventListener('click', function () { self._tapSocket(i); });
      self._bindDrag(s, function () { return st.phase === 'captions' ? st.caps[i] : (st.locked[i] ? null : id); });
      el.appendChild(s);
    });
  },
  _paintTray: function () {
    var el = this._trayEl, st = this.st, r = st.r, self = this, api = this.api;
    el.innerHTML = ''; el.setAttribute('aria-label', this._t('ariaTray'));
    var items = st.phase === 'captions' ? st.strips : st.tray;
    el.hidden = !!(this._view.watching || st.done || !items.length);
    items.forEach(function (id) {
      var p = WakeUpPipCore.page(r, id), b;
      if (st.phase === 'captions') { b = api.el('button', 'wup-strip' + (st.sel === id ? ' is-sel' : '')); b.textContent = p.caption; b.setAttribute('aria-label', self._t('ariaStrip', { caption: p.caption })); }
      else { b = api.el('button', 'wup-loose' + (st.sel === id ? ' is-sel' : '')); b.appendChild(self._card(p)); b.setAttribute('aria-label', self._t('ariaPage', { caption: p.caption })); }
      b.type = 'button'; b.setAttribute('data-k', 'page-' + id); b.setAttribute('data-page', id);
      b.addEventListener('click', function () { self._tapPage(id); });
      self._bindDrag(b, function () { return id; });
      el.appendChild(b);
    });
  },
  /* the retell ribbon: a starter over each page's own sentence */
  _paintRibbon: function () {
    var el = this._ribbonEl, st = this.st, api = this.api; el.innerHTML = '';
    el.hidden = !st.done;
    if (!st.done) return;
    WakeUpPipCore.retell(st.r).forEach(function (x, i) {
      var tab = api.el('button', 'wup-rtab'); tab.type = 'button'; tab.setAttribute('data-k', 'retell' + i);
      var s = api.el('span', 'wup-starter'); s.textContent = x.starter; tab.appendChild(s);
      var c = api.el('span', 'wup-rcap'); c.textContent = x.caption; tab.appendChild(c);
      tab.addEventListener('click', function () { WakeUpPipActivity._say(x.caption); });
      el.appendChild(tab);
    });
  },
  /* the flipbook viewer: rises over the slots to play the WATCH step and every flip; the pictures glide between pages */
  _paintViewer: function () {
    var el = this._viewer, v = this._view, api = this.api, self = this;
    if (!v.frame) { el.hidden = true; el.innerHTML = ''; this._vpics = null; return; }
    el.hidden = false;
    if (!this._vpics || !el.querySelector('.wup-vscene')) {
      el.innerHTML = '';
      var book = api.el('div', 'wup-book'); el.appendChild(book);
      book.appendChild(api.el('span', 'wup-rings'));
      this._vscene = api.el('div', 'wup-vscene'); book.appendChild(this._vscene);
      this._vcap = api.el('p', 'wup-vcap'); el.appendChild(this._vcap);
      this._vpics = {};
    }
    var f = v.frame, sc = this._vscene;
    sc.className = 'wup-vscene wup-sky-' + (f.d.sky || (f.d.indoor ? 'indoor' : 'day')) + (f.d.sand ? ' wup-sand' : '') + (v.frozen ? ' is-frozen' : '');
    var on = {};
    f.t.forEach(function (t) {
      on[t[0]] = true;
      var e = self._vpics[t[0]];
      if (!e) { e = api.el('span', 'wup-vpic'); var im = api.el('img', 'wup-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t[0]); e.appendChild(im); sc.appendChild(e); self._vpics[t[0]] = e; }
      e.style.left = t[1] + '%'; e.style.top = t[2] + '%'; e.style.width = 'calc(var(--wup-vunit) * ' + t[3] + ')'; e.style.height = e.style.width; e.style.opacity = '1';
      e.firstChild.style.transform = (t[5] ? 'scaleX(-1) ' : '') + 'rotate(' + (t[4] || 0) + 'deg)';
      e.classList.toggle('is-stranger', !!(v.stranger && t[0] === v.stranger));
      e.classList.toggle('is-shake', !!(f.d.shake && t[0] === 'tree/apple'));
    });
    Object.keys(this._vpics).forEach(function (k) { if (!on[k]) self._vpics[k].style.opacity = '0'; });
    [].forEach.call(sc.querySelectorAll('.wup-vdraw'), function (n) { n.parentNode.removeChild(n); });
    var glass = f.t.filter(function (t) { return t[0] === 'kitchen tools/glass'; })[0];
    if (glass && f.d.water) {
      var wa = api.el('span', 'wup-vdraw wup-vwater'); wa.style.left = glass[1] + '%'; wa.style.top = glass[2] + '%'; wa.style.setProperty('--g', glass[3]); wa.style.setProperty('--lvl', f.d.water / 100); sc.appendChild(wa);
      for (var q = 0; q < (f.d.pebbles || 0); q++) { var pb = api.el('span', 'wup-vdraw wup-vpebble'); pb.style.left = 'calc(' + glass[1] + '% + var(--wup-vunit) * ' + ((q % 3 - 1) * .16 * glass[3]) + ')'; pb.style.top = 'calc(' + glass[2] + '% - var(--wup-vunit) * ' + ((.1 + Math.floor(q / 3) * .09) * glass[3]) + ')'; sc.appendChild(pb); }
    }
    if (f.d.ray) sc.appendChild(api.el('span', 'wup-vdraw wup-ray'));
    if (f.d.count) { var c = api.el('span', 'wup-vdraw wup-count'); c.textContent = '3 · 2 · 1'; sc.appendChild(c); }
    if (f.d.peep) { var pe = api.el('span', 'wup-vdraw wup-peep'); pe.textContent = '♪ ♪'; sc.appendChild(pe); }
    if (f.d.seed) sc.appendChild(api.el('span', 'wup-vdraw wup-seed'));
    if (f.d.wave) { var wv = api.el('span', 'wup-vdraw wup-wave'); wv.style.height = f.d.wave + '%'; sc.appendChild(wv); }
    if (v.dead) sc.appendChild(api.el('span', 'wup-vdraw wup-pause'));
    this._vcap.textContent = v.caption || '';
  },

  /* ---------------- the hand ---------------- */
  _tapPage: function (id) {
    if (this._busy || this.st.done || this._view.watching) return;
    var C = WakeUpPipCore, st = this.st, ok = st.phase === 'captions' ? C.pickStrip(st, id) : C.pick(st, id);
    if (ok) { this._view = {}; this.api.sound(st.sel ? 560 : 330); this._paint(); }
  },
  _tapSocket: function (i) {
    if (this._busy || this.st.done || this._view.watching) return;
    var C = WakeUpPipCore, st = this.st;
    if (st.phase === 'captions') {
      if (st.sel !== null) { if (C.putStrip(st, i)) { this._view = {}; this.api.sound(620); this._paint(); } return; }
      if (st.caps[i]) { C.pickStrip(st, st.caps[i]); this._view = {}; this._paint(); }
      return;
    }
    if (st.sel !== null) { if (C.put(st, i)) { this._view = {}; this.api.sound(620); this._paint(); } return; }
    var id = st.sockets[i];
    if (id && !st.locked[i]) { C.pick(st, id); this._view = {}; this.api.sound(560); this._paint(); return; }
    /* a locked or a picked-nothing tap opens the book to that page (a still) */
    if (id) this._preview(id);
  },
  _preview: function (id) { var self = this, p = WakeUpPipCore.page(this.st.r, id); this._view = { frame: p.frame, caption: '' }; this._paint(); this._later(function () { if (self._view.frame === p.frame) { self._view = {}; self._paint(); } }, this._ms(1400)); },
  _bindDrag: function (el, idOf) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var id = idOf(); if (!id || self._busy || self.st.done || self._view.watching || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var at = function (x, y) { var ss = self._wrap.querySelectorAll('.wup-socket'); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return +ss[z].getAttribute('data-socket'); } return -1; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = el.cloneNode(true); ghost.className += ' wup-ghost'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - 30) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(self._wrap.querySelectorAll('.wup-socket'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-socket') === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var C = WakeUpPipCore, st = self.st, h = at(e.clientX, e.clientY), cap = st.phase === 'captions';
        if (h >= 0) { st.sel = null; if (cap ? C.pickStrip(st, id) && C.putStrip(st, h) : C.pick(st, id) && C.put(st, h)) { self._view = {}; self.api.sound(620); } }
        else if (!cap && st.sockets.indexOf(id) >= 0) C.back(st, id);
        self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key;
    if (/^[1-4]$/.test(k) && st.sel !== null) { ev.preventDefault(); this._tapSocket(+k - 1); return; }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },

  /* ---------------- watch, flip ---------------- */
  /* WATCH: the story plays once in the flipbook (with the trivial thing standing still in the background in The missing page), then its pages fall out */
  _startWatch: function () {
    var self = this, st = this.st, r = st.r, frames = r.pages.map(function (p) { var f = JSON.parse(JSON.stringify(p.frame)); if (r.bg) f.t.push([r.bg, f.t[0][1] < 50 ? 84 : 14, 40, 1]); return { f: f, c: p.caption }; });
    this._watched++;
    if (this.FAST) { this._view = {}; this._paint(); return; }
    var step = function (k) {
      if (k >= frames.length) { self._view = {}; self._paint(); return; }
      self._view = { watching: true, frame: frames[k].f, caption: frames[k].c }; self._paint(); self._say(frames[k].c);
      self._later(function () { step(k + 1); }, self.WATCH_MS);
    };
    step(0);
  },
  _watchAgain: function () { if (this._busy || this.st.done || this._view.watching) return; this._startWatch(); },
  /* plays the stack from page 1; stops at the break */
  _play: function (ids, br, done) {
    var self = this, r = this.st.r, end = br ? br.at : ids.length - 1, k = 0;
    var show = function () {
      var p = WakeUpPipCore.page(r, ids[k]), last = k === end;
      self._view = { frame: p.frame, playing: k, stir: !br || k < end, frozen: !!(br && last), dead: !!(br && last && br.kind === 'dead'), stranger: br && last && br.kind === 'foreign' ? p.frame.t[1][0] : null, breakAt: br && last ? br.at : undefined, breakKind: br && last ? br.kind : undefined };
      self._paint();
      if (k < end) { k++; self._later(show, self._ms(self.STEP_MS)); } else self._later(done, self._ms(br ? 1300 : self.STEP_MS));
    };
    show();
  },
  _check: function () {
    if (this._busy || this.st.done || this._view.watching) return;
    var self = this, st = this.st, C = WakeUpPipCore, ids = st.sockets.slice(), phase = st.phase;
    var res = C.flip(st);
    if (res.kase === 'empty' || res.kase === 'capEmpty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    if (phase === 'captions') {
      if (res.ok) return this._win();
      this.api.sound(196); this._view = {}; this._paint(); this.api.announce(this._note.textContent || ''); return;
    }
    this._busy = true;
    var br = res.ok || res.kase === 'pages' ? null : { at: res.at, kind: res.kase };
    this._play(ids, br, function () {
      if (br) { self.api.sound(196); self._busy = false; self._view = { breakAt: br.at, breakKind: br.kind }; self._paint(); self.api.announce(self._note.textContent || ''); return; }
      if (res.kase === 'pages') { C.startCaptions(st, Math.random); self._busy = false; self._view = {}; self._paint(); self.api.announce(self._t('instrCaps')); return; }
      self._win();
    });
  },
  _win: function () {
    var self = this, pa = this._pa || {}, msg = this._t('okWin');
    pa.msg = msg; this._busy = true; this._view = { awake: true, msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var wupCssDone = false;
function injectFlipCSS() {
  if (wupCssDone || typeof document === 'undefined') return;
  wupCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wup-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;--wup-ink:#2A2A35;--wup-teal:#146B5E;--wup-coral:#F2784B;--wup-cream:#FFF8EC;--wup-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.wup-wrap:focus{outline:none;}'
  + '.wup-stage{position:relative;width:100%;max-width:660px;}'
  /* the slots: the flipbook's pages laid out, rings on top */
  + '.wup-sockets{display:grid;grid-template-columns:repeat(2,var(--wup-card-w));justify-content:center;gap:10px;}'
  + '.wup-socket{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:0;border:0;background:transparent;cursor:pointer;font:inherit;color:var(--wup-ink);}'
  + '.wup-socket::before{content:"";position:absolute;left:12%;right:12%;top:-5px;height:8px;background:repeating-linear-gradient(90deg,#8A8A96 0 5px,transparent 5px 16px);border-radius:4px;}'
  + '.wup-socket.is-sel .wup-card{box-shadow:inset 0 0 0 4px var(--wup-coral);} .wup-socket.is-over .wup-card,.wup-socket.is-over .wup-empty{box-shadow:inset 0 0 0 4px var(--wup-teal);}'
  + '.wup-socket.is-locked{cursor:default;} .wup-socket.is-locked .wup-card{box-shadow:inset 0 0 0 3px #8A8A96;}'
  + '.wup-socket.is-pulse .wup-empty{animation:wup-pulse 1s ease-in-out 2;} @keyframes wup-pulse{50%{box-shadow:inset 0 0 0 4px var(--wup-gold);}}'
  + '.wup-socket.is-jiggle{animation:wup-jig .18s ease-in-out 4;} @keyframes wup-jig{25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);}}'
  + '.wup-socket.is-playing .wup-card{box-shadow:inset 0 0 0 4px var(--wup-gold);}'
  + '.wup-empty{display:block;width:var(--wup-card-w);height:var(--wup-card-h);box-sizing:border-box;border-radius:12px;border:3px dashed #B9A988;background:#FBF6EC;}'
  + '.wup-tab{display:flex;gap:4px;height:12px;align-items:center;} .wup-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--wup-ink);}'
  /* a page card */
  + '.wup-card{position:relative;display:flex;align-items:flex-end;justify-content:center;width:var(--wup-card-w);height:var(--wup-card-h);box-sizing:border-box;padding:0 6px;border-radius:12px;overflow:hidden;background:#E8F4FB;box-shadow:inset 0 0 0 3px var(--wup-ink);}'
  + '.wup-card.is-ghost{position:absolute;left:0;top:0;opacity:.45;pointer-events:none;box-shadow:inset 0 0 0 4px var(--wup-gold);outline:3px dashed var(--wup-gold);outline-offset:-3px;}'
  + '.wup-cardrow{display:flex;align-items:flex-end;justify-content:center;gap:6px;width:100%;height:100%;}'
  + '.wup-cpic{position:relative;display:block;flex:none;} .wup-img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;}'
  + '.wup-cpic.is-shake .wup-img,.wup-vpic.is-shake .wup-img{animation:wup-shake .25s ease-in-out infinite;} @keyframes wup-shake{50%{rotate:5deg;}}'
  + '.wup-sky-day{background:linear-gradient(#CFE8F7 0,#E8F4FB 64%,#A9D18C 64%);} .wup-sky-dawn{background:linear-gradient(#F6C9A8 0,#FBE3CF 64%,#A9D18C 64%);} .wup-sky-night{background:linear-gradient(#26305A 0,#3D4A7E 100%);} .wup-sky-indoor{background:linear-gradient(#F6E7CC 0,#F6E7CC 70%,#D9B98C 70%);}'
  + '.wup-sand.wup-sky-day,.wup-sand{background:linear-gradient(#CFE8F7 0,#E8F4FB 62%,#EBD7A6 62%);}'
  + '.wup-water{position:absolute;left:24%;width:52%;bottom:7%;background:rgba(60,140,220,.55);border-radius:0 0 6px 6px;transition:height .3s;}'
  + '.wup-pebble,.wup-vpebble{position:absolute;width:12%;height:8%;border-radius:50%;background:#7C7C86;box-shadow:inset 0 -2px 0 #5E5E68;}'
  + '.wup-ray{position:absolute;right:8%;top:6%;width:44%;height:60%;background:linear-gradient(225deg,rgba(255,214,90,.8),rgba(255,214,90,0) 70%);clip-path:polygon(100% 0,0 100%,22% 100%);pointer-events:none;}'
  + '.wup-count{position:absolute;left:8px;top:8px;padding:2px 8px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--wup-ink);font-family:' + D + ';font-weight:800;font-size:15px;line-height:1.4;color:var(--wup-ink);}'
  + '.wup-peep{position:absolute;left:6px;top:6px;font-size:18px;font-weight:800;color:var(--wup-coral);}'
  + '.wup-seed{position:absolute;left:58%;bottom:6px;width:12px;height:8px;border-radius:50%;background:#7A4E2D;}'
  + '.wup-wave{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(rgba(70,150,230,.85),rgba(40,110,200,.9));border-radius:40% 40% 0 0 / 14px 14px 0 0;}'
  + '.wup-pause{position:absolute;left:0;right:0;top:42%;height:14%;background:rgba(80,80,90,.55);}'
  /* the loose pages */
  + '.wup-tray{display:grid;grid-template-columns:repeat(2,var(--wup-card-w));justify-content:center;gap:10px;width:100%;max-width:660px;padding:10px 0;border-top:3px dashed #D9C8A8;} .wup-tray[hidden]{display:none;}'
  + '.wup-loose{padding:0;border:0;background:transparent;cursor:grab;touch-action:none;border-radius:12px;} .wup-loose.is-sel .wup-card{box-shadow:inset 0 0 0 4px var(--wup-coral);}'
  + '.wup-socket .wup-card,.wup-loose{touch-action:none;}'
  + '.wup-strip{min-height:48px;padding:8px 12px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px var(--wup-ink),0 3px 0 #C9B999;font-family:' + B + ';font-weight:700;font-size:16px;line-height:1.3;color:var(--wup-ink);text-align:left;cursor:grab;touch-action:none;} .wup-strip.is-sel{box-shadow:inset 0 0 0 4px var(--wup-coral);}'
  + '.wup-capslot{display:block;width:var(--wup-card-w);min-height:44px;box-sizing:border-box;padding:6px 8px;border-radius:8px;border:2px dashed #B9A988;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.3;text-align:left;} .wup-capslot.is-full{border-style:solid;border-color:var(--wup-teal);background:#fff;} .wup-capslot.is-sel{border-color:var(--wup-coral);}'
  + '.wup-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.85;}'
  /* the flipbook viewer */
  + '.wup-viewer{position:absolute;left:50%;top:0;z-index:5;transform:translateX(-50%);width:var(--wup-view-w);display:flex;flex-direction:column;align-items:center;gap:6px;animation:wup-rise .25s ease-out;} .wup-viewer[hidden]{display:none;} @keyframes wup-rise{0%{transform:translate(-50%,24px);opacity:0;}}'
  + '.wup-book{position:relative;width:100%;padding:14px 10px 10px;box-sizing:border-box;border-radius:14px;background:#5B4636;box-shadow:0 8px 20px rgba(0,0,0,.25);}'
  + '.wup-rings{position:absolute;left:10%;right:10%;top:3px;height:10px;background:repeating-linear-gradient(90deg,#C9C9D2 0 7px,transparent 7px 20px);border-radius:5px;}'
  + '.wup-vscene{position:relative;height:var(--wup-view-h);border-radius:8px;overflow:hidden;}'
  + '.wup-vpic{position:absolute;display:block;transform:translate(-50%,-100%);transition:left .3s ease-in-out,top .3s ease-in-out,width .3s,height .3s,opacity .3s;}'
  + '.wup-vpic .wup-img{transition:transform .3s;}'
  + '.wup-vpic.is-stranger{animation:wup-blink .5s ease-in-out 3;} @keyframes wup-blink{50%{opacity:.2;}}'
  + '.wup-vscene.is-frozen{filter:saturate(.6);}'
  + '.wup-vwater{position:absolute;width:calc(var(--wup-vunit) * var(--g) * .38);height:calc(var(--wup-vunit) * var(--g) * .72 * var(--lvl));transform:translate(-50%,-100%);margin-top:calc(var(--wup-vunit) * var(--g) * -.07);background:rgba(60,140,220,.55);border-radius:0 0 8px 8px;transition:height .3s;}'
  + '.wup-vpebble{width:calc(var(--wup-vunit) * .12);height:calc(var(--wup-vunit) * .08);transform:translate(-50%,-100%);}'
  + '.wup-vcap{margin:0;min-height:24px;padding:4px 12px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--wup-ink);font-family:' + B + ';font-weight:800;font-size:17px;line-height:1.35;color:var(--wup-ink);text-align:center;} .wup-vcap:empty{display:none;}'
  + '.wup-wrap.is-watching .wup-sockets{visibility:hidden;}'
  /* the retell ribbon */
  + '.wup-ribbon{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;width:100%;max-width:660px;} .wup-ribbon[hidden]{display:none;}'
  + '.wup-rtab{display:flex;flex-direction:column;gap:2px;min-height:56px;padding:8px 12px;border:0;border-radius:12px;background:#FFF1BF;box-shadow:inset 0 0 0 3px var(--wup-gold);text-align:left;cursor:pointer;font:inherit;color:var(--wup-ink);}'
  + '.wup-starter{font-family:' + D + ';font-weight:800;font-size:16px;color:#A6461F;} .wup-rcap{font-family:' + B + ';font-weight:700;font-size:16px;line-height:1.3;}'
  /* Pip, Watch again, Flip */
  + '.wup-row{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;max-width:660px;}'
  + '.wup-pip{position:relative;width:calc(var(--wup-pip) + 12px);height:calc(var(--wup-pip) + 4px);padding:0;border:0;background:transparent;cursor:pointer;flex:none;margin-right:auto;}'
  + '.wup-pipimg{position:absolute;left:6px;bottom:0;width:var(--wup-pip);height:var(--wup-pip);object-fit:contain;transform:rotate(80deg);transition:transform .4s;transform-origin:50% 70%;}'
  + '.wup-pip.is-awake .wup-pipimg{transform:rotate(0);} .wup-pip.is-stir .wup-pipimg{animation:wup-stir .35s ease-in-out;} @keyframes wup-stir{50%{transform:rotate(74deg);}}'
  + '.wup-pip.is-awake.is-poke .wup-pipimg{animation:wup-wave .4s ease-in-out 2;} @keyframes wup-wave{50%{transform:rotate(-10deg);}}'
  + '.wup-blanket{position:absolute;left:0;right:0;bottom:0;height:42%;border-radius:12px 12px 6px 6px;background:repeating-linear-gradient(90deg,#FFF8EC 0 14px,#F2784B 14px 18px);box-shadow:inset 0 0 0 2px var(--wup-ink);}'
  + '.wup-puff{position:absolute;right:0;top:0;width:14px;height:14px;border-radius:50%;background:#C9C9D2;animation:wup-puff .7s ease-out;} @keyframes wup-puff{0%{transform:translate(-10px,20px) scale(.4);opacity:.2;}}'
  + '.wup-watch{min-height:48px;padding:0 16px;border:0;border-radius:12px;background:var(--wup-cream);box-shadow:inset 0 0 0 3px var(--wup-ink);font-family:' + D + ';font-weight:800;font-size:16px;color:var(--wup-ink);cursor:pointer;flex:none;} .wup-watch[hidden]{display:none;} .wup-watch.is-glow{box-shadow:inset 0 0 0 3px var(--wup-gold),0 0 0 4px rgba(232,184,58,.5);}'
  + '.wup-check{min-height:52px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .wup-check[hidden]{display:none;} .wup-check:disabled{opacity:.6;}'
  + '.wup-note{width:100%;max-width:660px;min-height:24px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--wup-teal);text-align:center;} .wup-note:empty{display:none;} .wup-note.is-ok{font-weight:800;} .wup-note.is-wrong{color:#A6461F;}'
  /* phones */
  + '.wup-wrap.is-narrow{gap:8px;} .wup-wrap.is-narrow .wup-sockets,.wup-wrap.is-narrow .wup-tray{gap:8px;} .wup-wrap.is-narrow .wup-card{padding:0 3px;} .wup-wrap.is-narrow .wup-cardrow{gap:3px;}'
  + '.wup-wrap.is-narrow .wup-watch{padding:0 10px;font-size:15px;} .wup-wrap.is-narrow .wup-check{padding:0 14px;} .wup-wrap.is-narrow .wup-ribbon{grid-template-columns:1fr;}'
  + '.wup-wicon{display:none;font-size:26px;line-height:1;} .wup-wrap.is-tiny .wup-wlabel{display:none;} .wup-wrap.is-tiny .wup-wicon{display:inline;} .wup-wrap.is-tiny .wup-watch{min-width:52px;padding:0 10px;}'
  + '.wup-wrap.is-fast *,.wup-wrap.is-fast *::before,.wup-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.wup-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'wup-css'; s.textContent = css; document.head.appendChild(s);
}
