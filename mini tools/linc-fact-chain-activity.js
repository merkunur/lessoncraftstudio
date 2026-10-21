/* =====================================================================
   linc-fact-chain-activity.js — ACTIVITY #71 of the one-by-one rebuild:
   "Linc's Fact Chain" → THE DOMINO TRACK (RI.K.3, 11 locales).
   Design sheet: docs/activities-rebuild/designs/071-linc-fact-chain.md
   ---------------------------------------------------------------------
   THE INVENTION: facts are dominoes. Stand the fact that connects in the
   gap; Linc pushes the first domino, and the chain keeps falling only
   across a real connection. As it falls the facts join into one sentence
   on the rail with the link word glowing (Then / so). At a false link the
   struck domino rocks and stays standing, and the rail shows the two facts
   with a broken link between them. Three levels: what happens next (gap
   after), so what happens / what made it happen (gap after or BEFORE), and
   three in a chain.

   ACTIVITY LAYER ONLY: the model is linc-fact-chain-core.js; lcs-shell.js
   and fact-connect-core.js are untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.LincFactChainActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var LincFactChainActivity = {
  id: 'linc-fact-chain',
  apparatusClasses: ['lf-'],

  strings: {
    title:         {en:'Linc\'s Fact Chain',de:'Lincs Dominokette',nl:'De dominorij van Linc',da:'Lincs dominokæde',sv:'Lincs dominokedja',no:'Lincs dominokjede',es:'La fila de dominó de Linc',it:'Il domino di Linc',pt:'O dominó do Linc',fr:'Les dominos de Linc',fi:'Lincin dominoketju'},
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    instr:         {en:'Stand the fact that connects in the gap. Linc will give it a push.',de:'Stell den passenden Satz in die Lücke. Linc gibt einen Schubs.',nl:'Zet de zin die erbij past in het gat. Linc geeft een duwtje.',da:'Stil den sætning, der passer, i hullet. Linc giver et skub.',sv:'Ställ meningen som passar i luckan. Linc ger en knuff.',no:'Sett setningen som passer, i hullet. Linc gir et dytt.',es:'Pon en el hueco el dato que se conecta. Linc le da un empujón.',it:'Metti nello spazio la frase che si collega. Linc dà una spinta.',pt:'Coloque no espaço a frase que se liga. O Linc dá um empurrão.',fr:'Mets dans le trou la phrase qui va avec. Linc donne une poussée.',fi:'Pane aukkoon lause, joka sopii. Linc antaa tönäisyn.'},
    tabNext:       {en:'What happens next?',de:'Was passiert als Nächstes?',nl:'Wat gebeurt er daarna?',da:'Hvad sker der så?',sv:'Vad händer sedan?',no:'Hva skjer så?',es:'¿Qué pasa después?',it:'Che cosa succede dopo?',pt:'O que acontece depois?',fr:'Que se passe-t-il ensuite ?',fi:'Mitä tapahtuu sitten?'},
    tabSo:         {en:'So what happens?',de:'Was passiert deshalb?',nl:'Wat gebeurt er daardoor?',da:'Hvad sker der derfor?',sv:'Vad händer då?',no:'Hva skjer da?',es:'Por eso, ¿qué pasa?',it:'Quindi, che cosa succede?',pt:'Por causa disso, o que acontece?',fr:'Alors, que se passe-t-il ?',fi:'Mitä siitä seuraa?'},
    tabBecause:    {en:'What made it happen?',de:'Warum ist das passiert?',nl:'Waardoor gebeurt dat?',da:'Hvorfor sker det?',sv:'Varför händer det?',no:'Hvorfor skjer det?',es:'¿Por qué pasa eso?',it:'Perché succede?',pt:'Por que isso acontece?',fr:'Pourquoi est-ce que ça arrive ?',fi:'Miksi niin tapahtuu?'},
    tabChain:      {en:'What happens next, and next?',de:'Was passiert danach – und danach?',nl:'Wat gebeurt er daarna, en daarna?',da:'Hvad sker der så, og så?',sv:'Vad händer sedan, och sedan?',no:'Hva skjer så, og så?',es:'¿Qué pasa después, y después?',it:'Che cosa succede dopo, e poi?',pt:'O que acontece depois, e depois?',fr:'Et ensuite, et ensuite ?',fi:'Mitä tapahtuu sitten, ja sitten?'},
    linkThen:      {en:'Then',de:'Dann',nl:'Daarna',da:'Så',sv:'Sedan',no:'Så',es:'Después',it:'Poi',pt:'Depois',fr:'Ensuite',fi:'Sitten'},
    linkSo:        {en:'So',de:'Also',nl:'Dus',da:'Så',sv:'Så',no:'Så',es:'Así que',it:'Quindi',pt:'Então',fr:'Alors',fi:'Joten'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hintEmpty:     {en:'Stand one fact in the gap first.',de:'Stell zuerst einen Satz in die Lücke.',nl:'Zet eerst een zin in het gat.',da:'Stil først en sætning i hullet.',sv:'Ställ först en mening i luckan.',no:'Sett først en setning i hullet.',es:'Primero pon un dato en el hueco.',it:'Prima metti una frase nello spazio.',pt:'Primeiro coloque uma frase no espaço.',fr:'Mets d’abord une phrase dans le trou.',fi:'Pane ensin lause aukkoon.'},
    hintMiss1Next: {en:'Read them together. Does that come next?',de:'Lies sie zusammen. Kommt das als Nächstes?',nl:'Lees ze samen. Komt dat daarna?',da:'Læs dem sammen. Kommer det bagefter?',sv:'Läs dem tillsammans. Kommer det sedan?',no:'Les dem sammen. Kommer det etterpå?',es:'Léelos juntos. ¿Eso pasa después?',it:'Leggile insieme. Viene dopo?',pt:'Leia as duas juntas. Isso vem depois?',fr:'Lis-les ensemble. Est-ce que ça vient ensuite ?',fi:'Lue ne yhdessä. Tapahtuuko se seuraavaksi?'},
    hintMiss1So:   {en:'Read them together. Does the first fact make that happen?',de:'Lies sie zusammen. Bewirkt der erste Satz das?',nl:'Lees ze samen. Zorgt de eerste zin daarvoor?',da:'Læs dem sammen. Får den første sætning det til at ske?',sv:'Läs dem tillsammans. Gör den första meningen att det händer?',no:'Les dem sammen. Får den første setningen det til å skje?',es:'Léelos juntos. ¿El primer dato hace que eso pase?',it:'Leggile insieme. La prima frase fa succedere questo?',pt:'Leia as duas juntas. A primeira frase faz isso acontecer?',fr:'Lis-les ensemble. Est-ce que la première phrase en est la cause ?',fi:'Lue ne yhdessä. Saako ensimmäinen lause sen tapahtumaan?'},
    hintMiss2:     {en:'Try each fact with "{link}" and read it.',de:'Probier jeden Satz mit „{link}“ aus und lies ihn.',nl:'Probeer elke zin met ‘{link}’ en lees hem.',da:'Prøv hver sætning med »{link}«, og læs den.',sv:'Prova varje mening med ”{link}” och läs den.',no:'Prøv hver setning med «{link}», og les den.',es:'Prueba cada dato con «{link}» y léelo.',it:'Prova ogni frase con «{link}» e leggila.',pt:'Experimente cada frase com “{link}” e leia.',fr:'Essaie chaque phrase avec « {link} » et lis-la.',fi:'Kokeile jokaista lausetta sanan ”{link}” kanssa ja lue se.'},
    okTail:        {en:'The facts connect!',de:'Die Sätze hängen zusammen!',nl:'De zinnen horen bij elkaar!',da:'Sætningerne hænger sammen!',sv:'Meningarna hänger ihop!',no:'Setningene henger sammen!',es:'¡Los datos se conectan!',it:'Le frasi sono collegate!',pt:'As frases se ligam!',fr:'Les phrases vont ensemble !',fi:'Lauseet liittyvät toisiinsa!'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setLevel:      {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lNext:         {en:'What happens next',de:'Was kommt danach',nl:'Wat komt daarna',da:'Hvad sker så',sv:'Vad händer sedan',no:'Hva skjer så',es:'Qué pasa después',it:'Che cosa succede dopo',pt:'O que acontece depois',fr:'Ce qui se passe ensuite',fi:'Mitä tapahtuu sitten'},
    lCause:        {en:'Why it happens',de:'Warum es passiert',nl:'Waarom het gebeurt',da:'Hvorfor det sker',sv:'Varför det händer',no:'Hvorfor det skjer',es:'Por qué pasa',it:'Perché succede',pt:'Por que acontece',fr:'Pourquoi ça arrive',fi:'Miksi se tapahtuu'},
    lChain:        {en:'Three in a chain',de:'Drei in einer Kette',nl:'Drie op een rij',da:'Tre i en kæde',sv:'Tre i en kedja',no:'Tre i en kjede',es:'Tres en cadena',it:'Tre in catena',pt:'Três em corrente',fr:'Trois à la suite',fi:'Kolmen ketju'},
    setChoices:    {en:'Choices',de:'Auswahl',nl:'Keuzes',da:'Valg',sv:'Val',no:'Valg',es:'Opciones',it:'Scelte',pt:'Opções',fr:'Choix',fi:'Vaihtoehdot'},
    cFewer:        {en:'Fewer',de:'Weniger',nl:'Minder',da:'Færre',sv:'Färre',no:'Færre',es:'Menos',it:'Meno',pt:'Menos',fr:'Moins',fi:'Vähemmän'},
    cMore:         {en:'More',de:'Mehr',nl:'Meer',da:'Flere',sv:'Fler',no:'Flere',es:'Más',it:'Più',pt:'Mais',fr:'Plus',fi:'Enemmän'},
    ariaLinc:      {en:'Linc the lizard pushes the dominoes',de:'Linc, die Eidechse, schubst die Dominosteine',nl:'Linc de hagedis duwt de dominostenen',da:'Firbenet Linc skubber til dominobrikkerne',sv:'Ödlan Linc knuffar dominobrickorna',no:'Øglen Linc dytter dominobrikkene',es:'Linc, el lagarto, empuja las fichas de dominó',it:'Linc la lucertola spinge le tessere del domino',pt:'O lagarto Linc empurra as peças de dominó',fr:'Linc le lézard pousse les dominos',fi:'Lisko Linc tönäisee dominopalikoita'},
    ariaFact:      {en:'Fact: {f}',de:'Satz: {f}',nl:'Zin: {f}',da:'Sætning: {f}',sv:'Mening: {f}',no:'Setning: {f}',es:'Dato: {f}',it:'Frase: {f}',pt:'Frase: {f}',fr:'Phrase : {f}',fi:'Lause: {f}'},
    ariaGapBefore: {en:'Empty place before: {f}',de:'Leerer Platz vor: {f}',nl:'Lege plek vóór: {f}',da:'Tom plads før: {f}',sv:'Tom plats före: {f}',no:'Tom plass før: {f}',es:'Lugar vacío antes de: {f}',it:'Posto vuoto prima di: {f}',pt:'Lugar vazio antes de: {f}',fr:'Place vide avant : {f}',fi:'Tyhjä paikka ennen lausetta: {f}'},
    ariaGapAfter:  {en:'Empty place after: {f}',de:'Leerer Platz nach: {f}',nl:'Lege plek na: {f}',da:'Tom plads efter: {f}',sv:'Tom plats efter: {f}',no:'Tom plass etter: {f}',es:'Lugar vacío después de: {f}',it:'Posto vuoto dopo: {f}',pt:'Lugar vazio depois de: {f}',fr:'Place vide après : {f}',fi:'Tyhjä paikka lauseen jälkeen: {f}'},
    ariaStopped:   {en:'The chain stopped at: {f}',de:'Die Kette ist stehen geblieben bei: {f}',nl:'De rij stopte bij: {f}',da:'Kæden stoppede ved: {f}',sv:'Kedjan stannade vid: {f}',no:'Kjeden stoppet ved: {f}',es:'La cadena se detuvo en: {f}',it:'La catena si è fermata a: {f}',pt:'A corrente parou em: {f}',fr:'La chaîne s’est arrêtée à : {f}',fi:'Ketju pysähtyi kohtaan: {f}'}
  },

  defaults: { level: 'next', choices: 'more' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'next', labelKey: 'lNext' }, { value: 'cause', labelKey: 'lCause' }, { value: 'chain', labelKey: 'lChain' }] },
    { key: 'choices', type: 'choice', labelKey: 'setChoices', options: [{ value: 'fewer', labelKey: 'cFewer' }, { value: 'more', labelKey: 'cMore' }] }
  ],

  OK_MS: 4200, FAST: false, MISS_MS: 1700, FALL_MS: 380,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._curPass = 0; this._pass = 0; this._slots = null; this._pos = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null;
    injectLincCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return LincFactChainCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _level: function () { return LincFactChainCore.levelOf(this._set('level')); },
  _fewer: function () { return this._set('choices') === 'fewer'; },
  _key: function () { return this._loc() + '/' + this._level() + '/' + (this._fewer() ? 'f' : 'm'); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LincFactChainCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._slots = null; }
    return this._pool;
  },
  /* the round id names the text: the next pass is the same rounds in a new order, the right card on new slots */
  nextTask: function (opts) {
    var C = LincFactChainCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.map(function (i) { return pool[i]; });
      this._order = C.plan(this._level(), Math.random, prev).map(function (x) { return pool.indexOf(x); }); this._orderForPool = pool;
      this._pass = pass; this._slots = null;
    }
    var id = pool[this._order[pos]], r0 = C.round(this._loc(), this._level(), id), k = C.trayKeys(r0, this._fewer()).length;
    if (!this._slots || this._slots.length !== n || this._slotsK !== k) { this._slots = C.slots(Math.random, k, n); this._slotsK = k; }
    var pa = { msg: this._t('instr') }; this._pa = pa;
    return {
      id: 'linc.' + this._loc() + '.' + this._level() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._pos = pos; tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id, pos) {
    var C = LincFactChainCore, r = C.round(this._loc(), this._level(), id);
    this._clearTimers(); this._busy = false; this._view = {}; this._drag = null;
    this.st = C.newState(r, C.deal(r, Math.random, this._slots ? this._slots[pos] : 0, this._fewer()));
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = LincFactChainCore, r = C.round(this._loc(), this._level(), C.ids(this._level())[0]); this.st = C.newState(r, C.deal(r, C.seeded('x'), 1, this._fewer())); }
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
    var wrap = api.el('div', 'lf-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._body = api.el('div', 'lf-body'); wrap.appendChild(this._body);
    var row = api.el('div', 'lf-row'); wrap.appendChild(row);
    var chk = api.el('button', 'lf-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'lf-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    wrap.addEventListener('keydown', function (ev) { if ((ev.key === 'Delete' || ev.key === 'Backspace') && ev.target && ev.target.getAttribute && ev.target.getAttribute('data-gapcard') !== null) { ev.preventDefault(); self._unstand(+ev.target.getAttribute('data-gapcard')); } });
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
    if (!this._body) return;
    var st = this.st, r = st.r, C = LincFactChainCore, v = this._view, api = this.api, self = this, L = this._L = C.layout(this._width(), r.places.length);
    this._wrap.className = 'lf-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + r.dir + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    [['linc', L.linc], ['dw', L.dw], ['dh', L.dh], ['dtext', L.dtext], ['ctext', L.ctext], ['rail', L.rail]].forEach(function (p) { self._wrap.style.setProperty('--lf-' + p[0], p[1] + 'px'); });
    this._body.innerHTML = '';

    /* the question tab: the arrow points toward the gap */
    var tab = api.el('div', 'lf-tab lf-tab-' + (r.dir === 'because' ? 'left' : 'right'));
    var tt = api.el('span', 'lf-tabtxt'); tt.textContent = this._t(r.tab); tab.appendChild(tt);
    this._body.appendChild(tab);

    /* the track: Linc, the dominoes and gaps on a wooden plank, the bell */
    var track = api.el('div', 'lf-track'); this._track = track;
    var linc = api.el('button', 'lf-linc' + (v.push ? ' is-push' : '') + (v.win ? ' is-flick' : '')); linc.type = 'button'; linc.setAttribute('data-k', 'linc'); linc.setAttribute('aria-label', this._t('ariaLinc'));
    var li = api.el('img', 'lf-img'); li.alt = ''; li.draggable = false; li.src = this._pic(C.LINC); linc.appendChild(li);
    linc.addEventListener('click', function () { if (st.done && !self._busy) self._replay(); });
    track.appendChild(linc);
    var row = api.el('div', 'lf-places');
    var fall = v.falls || null, gapPx = L.mode === 'wide' ? (r.places.length === 3 ? 40 : 64) : L.W < 300 ? (r.places.length === 3 ? 5 : 22) : (r.places.length === 3 ? 10 : 30), ang = fall ? this._angles(fall, gapPx, L.dh, L.mode === 'wide' ? 48 : 30) : null, toFall = [];
    r.places.forEach(function (p, i) {
      var slot = api.el('div', 'lf-slot'); slot.setAttribute('data-place', i);
      if (p.gap !== undefined) { slot.setAttribute('data-gap', p.gap); slot.classList.add('lf-gapslot'); }
      var text = C.placeText(r, st.placed, i);
      if (text === null) {
        var g = api.el('div', 'lf-gap' + (v.pulse ? ' is-pulse' : '') + (v.over === p.gap ? ' is-over' : ''));
        g.setAttribute('aria-label', self._t(r.places[i + 1] ? 'ariaGapBefore' : 'ariaGapAfter', { f: C.placeText(r, st.placed, r.places[i + 1] ? i + 1 : i - 1) || '' }));
        if (st.help >= 2 && !st.done) { var lw = api.el('span', 'lf-gapword'); lw.textContent = self._t(r.links[Math.max(0, i - 1)]); g.appendChild(lw); }
        slot.appendChild(g);
      } else {
        var d = api.el(p.gap !== undefined ? 'button' : 'div', 'lf-domino' + (p.gap !== undefined ? ' is-placed' : ' is-given') + (fall && fall.f[i] ? ' is-fallen' : '') + (fall && fall.broken === i ? ' is-rock' : '') + (p.gap !== undefined && v.stood === p.gap ? ' is-stood' : ''));
        if (fall && fall.f[i]) { if (fall.animate && !self.FAST) { d.style.transitionDelay = (i * self.FALL_MS) + 'ms'; toFall.push([d, ang[i]]); } else { d.style.transition = 'none'; d.style.transform = 'rotate(' + ang[i] + 'deg)'; } }
        if (fall && fall.broken === i) d.style.animationDelay = (self.FAST || !fall.animate ? 0 : i * self.FALL_MS) + 'ms';
        if (p.gap !== undefined) {
          d.type = 'button'; d.setAttribute('data-k', 'gapcard' + p.gap); d.setAttribute('data-gapcard', p.gap); d.setAttribute('aria-label', self._t('ariaFact', { f: text }));
          d.addEventListener('pointerdown', function (ev) { self._dragStart(ev, st.placed[p.gap], p.gap, d); });
          d.addEventListener('click', function () { if (self._suppress) { self._suppress = false; return; } if (st.done) return self._standUp(); self._say(text); });
        } else { d.setAttribute('role', 'img'); d.setAttribute('aria-label', self._t('ariaFact', { f: text })); d.addEventListener('click', function () { if (st.done) return self._standUp(); self._say(text); }); }
        var dt = api.el('span', 'lf-dtext'); dt.textContent = text; d.appendChild(dt);
        slot.appendChild(d);
      }
      row.appendChild(slot);
    });
    row.style.setProperty('--lf-gap', gapPx + 'px');
    track.appendChild(row);
    var bell = api.el('div', 'lf-bell' + (v.ring ? ' is-ring' : '')); bell.setAttribute('aria-hidden', 'true'); bell.appendChild(api.el('span', 'lf-bellcup')); bell.appendChild(api.el('span', 'lf-bellball'));
    track.appendChild(bell);
    this._body.appendChild(track);

    /* the rail: the joined sentence (or the broken pair, or a miss-2 preview) */
    var rail = api.el('div', 'lf-rail'); rail.setAttribute('aria-live', 'polite');
    var pv = v.preview, res = st.result;
    if (st.done && (v.win || v.joined)) { var j = api.el('span', 'lf-joined is-ok'); j.textContent = r.joined; rail.appendChild(j); }
    else if (pv || (res && !res.ok && v.falls)) {
      var pr = pv || res, link = this._t(pr.link);
      rail.className += pv ? ' is-preview' : ' is-broken';
      var a = api.el('span', 'lf-part'); a.textContent = pr.pair[0]; rail.appendChild(a);
      var lk = api.el('span', 'lf-link' + (pv ? '' : ' is-broken')); lk.textContent = link + (pv ? '' : '?'); rail.appendChild(lk);
      var b = api.el('span', 'lf-part'); b.textContent = pr.pair[1]; rail.appendChild(b);
    }
    this._body.appendChild(rail);

    /* the tray: the cards lying flat */
    if (!st.done) {
      var tray = api.el('div', 'lf-tray lf-tray' + st.tray.length); tray.setAttribute('data-zone', 'tray'); this._trayEl = tray;
      st.tray.forEach(function (key, s) {
        var placed = st.placed.indexOf(key) >= 0;
        var c = api.el('button', 'lf-card' + (placed ? ' is-out' : '')); c.type = 'button'; c.setAttribute('data-k', 'card' + key); c.setAttribute('data-card', key); c.setAttribute('data-slot', s);
        c.setAttribute('aria-label', self._t('ariaFact', { f: r.cards[key] }));
        if (placed) c.disabled = true;
        var ct = api.el('span', 'lf-ctext'); ct.textContent = r.cards[key]; c.appendChild(ct);
        c.addEventListener('pointerdown', function (ev) { if (!placed) self._dragStart(ev, key, null, c); });
        c.addEventListener('click', function () { if (self._suppress) { self._suppress = false; return; } if (!placed) self._standFirst(key); });
        tray.appendChild(c);
      });
      this._body.appendChild(tray);
    } else this._trayEl = null;

    if (toFall.length) requestAnimationFrame(function () { requestAnimationFrame(function () { toFall.forEach(function (x) { x[0].style.transform = 'rotate(' + x[1] + 'deg)'; }); }); });
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg;
    else if (h && !this._busy) msg = this._t(h, { link: this._t(st.last && st.last.link || r.links[0]) });
    this._note.textContent = msg;
    this._note.className = 'lf-note' + (st.done ? ' is-ok' : (h && !this._busy ? ' is-hint' : ''));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },

  /* the angle each fallen domino rests at: on the next domino (exactly touching a standing one, a little further over a fallen one);
     the last one tips onto the bell. Computed from the layout, never measured mid-build. */
  _angles: function (fall, gap, h, bell) {
    var out = [], deg = function (x) { return Math.asin(Math.min(1, x / h)) * 180 / Math.PI; }, lean = deg(gap);
    for (var i = 0; i < fall.f.length; i++) out.push((i === fall.f.length - 1 ? deg(bell) : Math.min(62, lean + (fall.f[i + 1] ? 9 : 0))).toFixed(1));
    return out;
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _standFirst: function (key) { var g = LincFactChainCore.firstEmpty(this.st); if (g < 0) g = this.st.placed.length - 1; this._stand(key, g); },
  _stand: function (key, gap) {
    if (!this._free()) return;
    if (LincFactChainCore.stand(this.st, key, gap)) { this.api.sound(523); this._view = { stood: gap }; this._paint(); var self = this; this._later(function () { if (self._view.stood === gap) { self._view = {}; self._paint(); } }, this._ms(420)); }
  },
  _unstand: function (gap) { if (!this._free()) return; if (LincFactChainCore.unstand(this.st, gap)) { this.api.sound(330); this._view = {}; this._paint(); } },
  _gapAt: function (x, y) {
    var els = this._track ? this._track.querySelectorAll('.lf-gapslot') : [];
    for (var i = 0; i < els.length; i++) { var b = els[i].getBoundingClientRect(); if (x >= b.left - 12 && x <= b.right + 12 && y >= b.top - 20 && y <= b.bottom + 20) return +els[i].getAttribute('data-gap'); }
    return -1;
  },
  _dragStart: function (ev, key, fromGap, el) {
    if (!this._free() || !key || (ev.button !== undefined && ev.button !== 0)) return;
    var self = this, st = this.st, sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null, over = -1;
    this._drag = { key: key };
    var onMove = function (e) {
      if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 10) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className = 'lf-card lf-ghost'; var rc = el.getBoundingClientRect(); ghost.style.width = Math.max(rc.width, 120) + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
      ghost.style.left = (e.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - ghost.offsetHeight / 2) + 'px';
      var g = self._gapAt(e.clientX, e.clientY);
      if (g !== over) {
        over = g;
        var pv = (g >= 0 && st.help >= 2) ? LincFactChainCore.preview(st.r, st.placed, g, key) : null;
        self._setPreview(pv, g);
      }
    };
    var onUp = function (e) {
      document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); document.removeEventListener('pointercancel', onUp);
      self._drag = null;
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      el.classList.remove('is-lifted');
      self._setPreview(null, -1, true);
      if (!moved) return;
      self._suppress = true; setTimeout(function () { self._suppress = false; }, 0);
      var g = self._gapAt(e.clientX, e.clientY);
      if (g >= 0) return self._stand(key, g);
      if (fromGap !== null) return self._unstand(fromGap);
      self._paint();
    };
    document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp); document.addEventListener('pointercancel', onUp);
  },
  /* the miss-2 preview and the gap highlight are updated IN PLACE: rebuilding the DOM under the pointer would lose the drag */
  _setPreview: function (pv, gap, clear) {
    var rail = this._body && this._body.querySelector('.lf-rail'), self = this;
    if (this._track) { var gs = this._track.querySelectorAll('.lf-gap'); for (var i = 0; i < gs.length; i++) gs[i].classList.toggle('is-over', !clear && +gs[i].parentNode.getAttribute('data-gap') === gap); }
    if (!rail) return;
    if (!pv) { if (rail.classList.contains('is-preview')) { rail.className = 'lf-rail'; rail.innerHTML = ''; } return; }
    rail.className = 'lf-rail is-preview'; rail.innerHTML = '';
    [['lf-part', pv.pair[0]], ['lf-link', this._t(pv.link)], ['lf-part', pv.pair[1]]].forEach(function (x) { var s = self.api.el('span', x[0]); s.textContent = x[1]; rail.appendChild(s); });
  },

  /* ---------------- Check, the push, the win ---------------- */
  _check: function () {
    if (!this._free()) return;
    var self = this, st = this.st, C = LincFactChainCore, res = C.check(st);
    if (res.reason === 'empty') { this.api.sound(460); this._view = { pulse: true }; this._paint(); this._later(function () { self._view = {}; self._paint(); }, this._ms(700)); return; }
    this._busy = true; this.api.sound(392);
    this._view = { push: true }; this._paint();
    var n = st.r.places.length;
    this._later(function () {
      self._view = { push: true, falls: { f: res.falls, broken: res.broken, animate: true } }; self._paint();
      for (var i = 1; i < n; i++) (function (i) { self._later(function () { self.api.sound(res.falls[i] ? 660 + i * 60 : 196); }, self._ms(i * self.FALL_MS)); })(i);
    }, this._ms(260));
    var end = this._ms(260 + n * this.FALL_MS + 200);
    if (res.ok) return this._later(function () { self._win(); }, end);
    this._later(function () {
      self.api.announce(self._t('ariaStopped', { f: res.pair[1] }));
      self._later(function () { C.clearWrong(st); st.show = true; self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, self._ms(self.MISS_MS));
    }, end);
  },
  _win: function () {
    var self = this, pa = this._pa || {}, msg = this.st.r.joined + ' ' + this._t('okTail'), f = LincFactChainCore.falls(this.st.r, this.st.placed);
    pa.msg = msg; this._busy = true; this._view = { msg: msg, win: true, ring: true, falls: { f: f, broken: -1 } };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._view = { msg: msg, joined: true, falls: { f: f, broken: -1 } }; self._paint(); self.api.announce(msg); }, this._ms(700));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  /* free play after the win: tap a domino to stand the row back up, tap Linc to push again */
  _standUp: function () { if (this._busy) return; this._view = { joined: true, msg: this._view.msg }; this._paint(); },
  _replay: function () {
    var self = this, f = LincFactChainCore.falls(this.st.r, this.st.placed), msg = this._view.msg;
    this._view = { joined: true, msg: msg, push: true }; this._paint();
    this._later(function () { self._view = { joined: true, msg: msg, push: true, ring: true, falls: { f: f, broken: -1, animate: true } }; self._paint(); }, this._ms(260));
  }
};

var lfCssDone = false;
function injectLincCSS() {
  if (lfCssDone || typeof document === 'undefined') return;
  lfCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lf-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--lf-ink:#2A2A35;--lf-teal:#146B5E;--lf-coral:#F2784B;--lf-cream:#FFF8EC;--lf-wood:#B98552;--lf-wood2:#8E6238;--lf-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.lf-wrap:focus{outline:none;} .lf-body{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the tab */
  + '.lf-tab{align-self:center;position:relative;display:flex;align-items:center;min-height:44px;padding:6px 18px;border-radius:12px;background:#E6F2EF;box-shadow:inset 0 0 0 3px var(--lf-teal);}'
  + '.lf-tabtxt{font-family:' + D + ';font-weight:800;font-size:22px;line-height:1.15;color:var(--lf-ink);text-align:center;}'
  + '.lf-tab::after{content:"";position:absolute;top:50%;margin-top:-9px;border:9px solid transparent;}'
  + '.lf-tab-right::after{right:-17px;border-left-color:var(--lf-teal);} .lf-tab-left::after{left:-17px;border-right-color:var(--lf-teal);}'
  /* the track */
  + '.lf-track{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:8px;padding:10px 6px 0;border-bottom:14px solid var(--lf-wood);border-radius:6px;box-shadow:0 4px 0 var(--lf-wood2);min-height:calc(var(--lf-dh) + 14px);}'
  + '.lf-linc{flex:none;width:var(--lf-linc);height:var(--lf-linc);padding:0;border:0;background:transparent;cursor:pointer;align-self:flex-end;}'
  + '.lf-linc .lf-img{width:100%;height:100%;object-fit:contain;display:block;transform:scaleX(-1);}'
  + '.lf-linc.is-push .lf-img{animation:lfPush .45s ease;} .lf-linc.is-flick .lf-img{animation:lfFlick .9s ease;}'
  + '.lf-places{display:flex;align-items:flex-end;gap:var(--lf-gap,18px);}'
  + '.lf-slot{position:relative;width:var(--lf-dw);height:var(--lf-dh);flex:none;}'
  + '.lf-gap{position:absolute;inset:0;border-radius:12px;border:3px dashed #9C8C72;background:rgba(255,248,236,.55);display:flex;align-items:flex-end;justify-content:center;transition:background .15s,border-color .15s;}'
  + '.lf-gap.is-over{background:#FFF1C9;border-color:var(--lf-gold);} .lf-gap.is-pulse{animation:lfPulse .35s ease 2;}'
  + '.lf-gapword{margin-bottom:8px;padding:2px 8px;border-radius:8px;background:var(--lf-gold);color:#fff;font-family:' + D + ';font-weight:800;font-size:18px;}'
  + '.lf-domino{position:absolute;inset:0;margin:0;padding:8px 6px;border:0;border-radius:12px;background:var(--lf-cream);box-shadow:inset 0 0 0 3px var(--lf-ink),0 3px 0 #D8C9A6;display:flex;align-items:center;justify-content:center;text-align:center;transform-origin:100% 100%;transition:transform .38s cubic-bezier(.5,0,.9,.6);cursor:pointer;touch-action:none;}'
  + '.lf-domino.is-placed{background:#FFFDF6;} .lf-domino.is-stood{animation:lfWobble .4s ease;}'
  + '.lf-dtext{position:relative;font-family:' + B + ';font-weight:800;font-size:var(--lf-dtext);line-height:1.22;color:var(--lf-ink);overflow-wrap:break-word;}'
  + '.lf-domino.is-rock{animation:lfRock .6s ease;box-shadow:inset 0 0 0 3px var(--lf-coral),0 3px 0 #D8C9A6;}'
  + '.lf-wrap.is-done .lf-domino.is-fallen{box-shadow:inset 0 0 0 3px var(--lf-teal),0 3px 0 #D8C9A6;}'
  + '.lf-domino:focus-visible{outline:3px solid var(--lf-teal);outline-offset:3px;}'
  + '.lf-bell{position:relative;flex:none;width:34px;height:40px;align-self:flex-end;transform-origin:50% 0;}'
  + '.lf-bellcup{position:absolute;left:3px;top:4px;width:28px;height:28px;border-radius:14px 14px 4px 4px;background:var(--lf-gold);box-shadow:inset 0 0 0 3px #A9801A;}'
  + '.lf-bellball{position:absolute;left:13px;top:30px;width:8px;height:8px;border-radius:50%;background:#A9801A;}'
  + '.lf-bell.is-ring{animation:lfRing .5s ease 3;}'
  /* the rail */
  + '.lf-rail{font-family:' + B + ';font-size:var(--lf-rail);min-height:56px;padding:8px 12px;border-radius:12px;background:#F6EFE3;box-shadow:inset 0 0 0 2px #D8C9A6;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 10px;text-align:center;}'
  + '.lf-joined{font-family:' + B + ';font-weight:800;font-size:var(--lf-rail);line-height:1.3;color:var(--lf-ink);} .lf-joined.is-ok{color:var(--lf-teal);}'
  + '.lf-part{font-family:' + B + ';font-weight:700;font-size:var(--lf-rail);line-height:1.3;color:var(--lf-ink);}'
  + '.lf-rail.is-broken .lf-part{opacity:.62;}'
  + '.lf-link{padding:2px 10px;border-radius:999px;background:var(--lf-gold);color:#fff;font-family:' + D + ';font-weight:800;font-size:var(--lf-rail);}'
  + '.lf-link.is-broken{background:#fff;color:#9A3D17;box-shadow:inset 0 0 0 2px #9A3D17;border-style:dashed;}'
  /* the tray */
  + '.lf-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;} .lf-tray2{grid-template-columns:repeat(2,1fr);max-width:440px;align-self:center;width:100%;} .lf-tray4{grid-template-columns:repeat(4,1fr);}'
  + '.lf-wrap.is-narrow .lf-tray,.lf-wrap.is-narrow .lf-tray4{grid-template-columns:repeat(2,1fr);} .lf-wrap.is-narrow .lf-tray3 .lf-card:last-child{grid-column:1/-1;justify-self:center;width:calc(50% - 5px);}'
  + '.lf-card{position:relative;min-height:64px;padding:8px 10px;border:0;border-radius:10px;background:var(--lf-cream);box-shadow:inset 0 0 0 3px var(--lf-ink),0 3px 0 #D8C9A6;cursor:grab;touch-action:none;display:flex;align-items:center;justify-content:center;text-align:center;}'
  + '.lf-ctext{position:relative;font-family:' + B + ';font-weight:800;font-size:var(--lf-ctext);line-height:1.22;color:var(--lf-ink);overflow-wrap:break-word;}'
  + '.lf-card.is-out{opacity:.28;cursor:default;box-shadow:inset 0 0 0 3px #B9AE98;} .lf-card.is-lifted{opacity:.35;} .lf-card:focus-visible{outline:3px solid var(--lf-teal);outline-offset:2px;}'
  + '.lf-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.94;transform:rotate(-4deg);margin:0;}'
  + '.lf-wrap:is([lang=de],[lang=nl],[lang=sv],[lang=da],[lang=no],[lang=fi]) .lf-dtext,.lf-wrap:is([lang=de],[lang=nl],[lang=sv],[lang=da],[lang=no],[lang=fi]) .lf-ctext{hyphens:auto;-webkit-hyphens:auto;hyphenate-limit-chars:12 5 5;}'
  + '.lf-row{display:flex;justify-content:center;}'
  + '.lf-check{min-width:150px;min-height:52px;padding:8px 26px;border:0;border-radius:999px;background:var(--lf-teal);color:#fff;font-family:' + D + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0D4A41;}'
  + '.lf-check:disabled{opacity:.55;cursor:default;} .lf-check:focus-visible{outline:3px solid var(--lf-coral);outline-offset:3px;}'
  + '.lf-note{margin:0;min-height:1.4em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.35;color:var(--lf-ink);max-width:640px;}'
  + '.lf-note.is-hint{color:#9A3D17;} .lf-note.is-ok{color:var(--lf-teal);}'
  /* narrow: Linc sits beside the tab; the track holds only the dominoes and the bell */
  + '.lf-wrap.is-narrow .lf-places{--lf-gap:8px;} .lf-wrap.is-narrow .lf-track{gap:4px;padding:8px 2px 0;}'
  + '.lf-wrap.is-narrow .lf-tabtxt{font-size:19px;} .lf-wrap.is-narrow .lf-note{font-size:17px;} .lf-wrap.is-narrow .lf-check{min-height:48px;font-size:20px;}'
  + '.lf-wrap.is-narrow .lf-domino{padding:6px 4px;} .lf-wrap.is-narrow .lf-card{min-height:56px;padding:6px 8px;} .lf-wrap.is-narrow .lf-body{gap:10px;}'
  + '.lf-wrap.is-narrow .lf-linc{position:absolute;left:2px;top:-62px;} .lf-wrap.is-narrow .lf-tab{margin-left:70px;margin-right:4px;}'
  + '.lf-wrap.is-narrow .lf-bell{width:24px;} .lf-wrap.is-narrow .lf-bellcup{left:1px;width:22px;height:22px;} .lf-wrap.is-narrow .lf-bellball{left:9px;top:24px;}'
  + '.lf-wrap.is-tiny .lf-places{--lf-gap:5px;} .lf-wrap.is-tiny .lf-tab{padding:4px 10px;} .lf-wrap.is-tiny .lf-tabtxt{font-size:17px;} .lf-wrap.is-tiny .lf-card{min-height:46px;padding:4px 6px;} .lf-wrap.is-tiny .lf-body{gap:8px;} .lf-wrap.is-tiny .lf-tray{gap:8px;} .lf-wrap.is-tiny .lf-rail{min-height:44px;padding:5px 8px;} .lf-wrap.is-tiny .lf-track{padding-top:4px;}'
  + '@keyframes lfPush{0%{transform:scaleX(-1) translateX(0)}50%{transform:scaleX(-1) translateX(-14px)}100%{transform:scaleX(-1) translateX(0)}}'
  + '@keyframes lfFlick{0%,100%{transform:scaleX(-1)}25%{transform:scaleX(1)}50%{transform:scaleX(-1)}75%{transform:scaleX(1)}}'
  + '@keyframes lfWobble{0%,100%{transform:rotate(0)}30%{transform:rotate(-4deg)}65%{transform:rotate(3deg)}}'
  + '@keyframes lfRock{0%,100%{transform:rotate(0)}30%{transform:rotate(8deg)}60%{transform:rotate(-3deg)}}'
  + '@keyframes lfRing{0%,100%{transform:rotate(0)}25%{transform:rotate(18deg)}75%{transform:rotate(-18deg)}}'
  + '@keyframes lfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}'
  + '.lf-wrap.is-fast *,.lf-wrap.is-fast *::before,.lf-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.lf-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'lf-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.LincFactChainActivity = LincFactChainActivity;
