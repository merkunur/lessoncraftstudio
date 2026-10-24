/* =====================================================================
   plank-path-activity.js — ACTIVITY #90 of the one-by-one rebuild:
   "Find the Missing Number" → THE PLANK PATH (1.OA.D.8, 11 locales).
   Design sheet: docs/activities-rebuild/designs/090-match-pairs.md
   ---------------------------------------------------------------------
   THE INVENTION: every equation is a gap in a stream-side path and every
   number is a plank exactly that long. Tap an equation's signpost, then
   a plank: it unfolds into the gap square by square. Too short → it
   falls in; too long → it sticks out past the far bank; only the number
   that makes the equation true fits. The blank sits in a different place
   in each gap (the start, the middle, the number taken away, the whole
   under the road), the tray hides one decoy plank — a real mistake —
   and when all four fit, the walker crosses to the flag.
   ACTIVITY LAYER ONLY: the model is plank-path-core.js; the walkers are
   library pictures via lcs-pictures.js; lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when the path is
   crossed). Test seams: window.PlankPathActivity.st / ._pool / ._order /
   ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var PlankPathActivity = {
  id: 'plank-path',
  apparatusClasses: ['pp-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Find the Missing Number',de:'Finde die fehlende Zahl',nl:'Vind het ontbrekende getal',da:'Find det manglende tal',sv:'Hitta talet som fattas',no:'Finn tallet som mangler',es:'Encuentra el número que falta',it:'Trova il numero mancante',pt:'Encontre o número que falta',fr:'Trouve le nombre manquant',fi:'Etsi puuttuva luku'},
    tLine:       {en:'Which number makes {eq} true?',de:'Welche Zahl macht {eq} richtig?',nl:'Met welk getal klopt {eq}?',da:'Hvilket tal gør {eq} rigtigt?',sv:'Vilket tal gör {eq} sant?',no:'Hvilket tall gjør {eq} riktig?',es:'¿Qué número completa {eq}?',it:'Quale numero rende vera l’uguaglianza {eq}?',pt:'Que número completa {eq}?',fr:'Quel nombre rend l’égalité {eq} vraie ?',fi:'Mikä luku tekee laskusta {eq} oikean?'},
    hShort:      {en:'Too short — it fell in!',de:'Zu kurz – es ist ins Wasser gefallen!',nl:'Te kort — hij viel erin!',da:'For kort – den faldt i vandet!',sv:'För kort – den ramlade i vattnet!',no:'For kort – den falt i vannet!',es:'¡Muy corta! Se cayó al agua.',it:'Troppo corta: è caduta in acqua!',pt:'Curta demais: caiu na água!',fr:'Trop courte : elle est tombée à l’eau !',fi:'Liian lyhyt – se putosi veteen!'},
    hLong:       {en:'Too long — it sticks out!',de:'Zu lang – es steht über!',nl:'Te lang — hij steekt uit!',da:'For lang – den stikker ud!',sv:'För lång – den sticker ut!',no:'For lang – den stikker ut!',es:'¡Muy larga! Se sale.',it:'Troppo lunga: sporge!',pt:'Comprida demais: sobra uma parte!',fr:'Trop longue : elle dépasse !',fi:'Liian pitkä – se ulottuu yli!'},
    hCount:      {en:'Count the squares in the gap.',de:'Zähl die Kästchen in der Lücke.',nl:'Tel de hokjes in het gat.',da:'Tæl firkanterne i hullet.',sv:'Räkna rutorna i luckan.',no:'Tell rutene i hullet.',es:'Cuenta los cuadritos del hueco.',it:'Conta i quadretti del buco.',pt:'Conte os quadradinhos do buraco.',fr:'Compte les cases du trou.',fi:'Laske aukon ruudut.'},
    okFit:       {en:'{eq} — it fits!',de:'{eq} – es passt!',nl:'{eq} — hij past!',da:'{eq} – den passer!',sv:'{eq} – den passar!',no:'{eq} – den passer!',es:'{eq}: ¡encaja!',it:'{eq}: si incastra!',pt:'{eq}: encaixou!',fr:'{eq} — la planche est juste !',fi:'{eq} – se sopii!'},
    okAll:       {en:'{a}, {b}, {c} and {d} — every plank fits!',de:'{a}, {b}, {c} und {d} – jedes Brett passt!',nl:'{a}, {b}, {c} en {d} — elke plank past!',da:'{a}, {b}, {c} og {d} – hver planke passer!',sv:'{a}, {b}, {c} och {d} – varje planka passar!',no:'{a}, {b}, {c} og {d} – hver planke passer!',es:'{a}, {b}, {c} y {d}: ¡todas las tablas encajan!',it:'{a}, {b}, {c} e {d}: tutte le assi si incastrano!',pt:'{a}, {b}, {c} e {d}: todas as tábuas encaixaram!',fr:'{a}, {b}, {c} et {d} — toutes les planches sont justes !',fi:'{a}, {b}, {c} ja {d} – jokainen lankku sopii!'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    n10:         {en:'Within 10',de:'Bis 10',nl:'Tot 10',da:'Op til 10',sv:'Upp till 10',no:'Til 10',es:'Hasta 10',it:'Fino a 10',pt:'Até 10',fr:'Jusqu’à 10',fi:'10 asti'},
    n20:         {en:'Within 20',de:'Bis 20',nl:'Tot 20',da:'Op til 20',sv:'Upp till 20',no:'Til 20',es:'Hasta 20',it:'Fino a 20',pt:'Até 20',fr:'Jusqu’à 20',fi:'20 asti'},
    setPath:     {en:'Path',de:'Weg',nl:'Pad',da:'Sti',sv:'Stig',no:'Sti',es:'Camino',it:'Sentiero',pt:'Caminho',fr:'Chemin',fi:'Polku'},
    pSquares:    {en:'With squares',de:'Mit Kästchen',nl:'Met hokjes',da:'Med firkanter',sv:'Med rutor',no:'Med ruter',es:'Con cuadritos',it:'Con quadretti',pt:'Com quadradinhos',fr:'Avec les cases',fi:'Ruuduilla'},
    pNumbers:    {en:'Numbers only',de:'Nur Zahlen',nl:'Alleen getallen',da:'Kun tal',sv:'Bara tal',no:'Bare tall',es:'Solo números',it:'Solo numeri',pt:'Só números',fr:'Nombres seulement',fi:'Vain luvut'},
    ariaSign:    {en:'{eq}. Tap to choose this gap.',de:'{eq}. Tippen, um diese Lücke zu wählen.',nl:'{eq}. Tik om dit gat te kiezen.',da:'{eq}. Tryk for at vælge dette hul.',sv:'{eq}. Tryck för att välja den här luckan.',no:'{eq}. Trykk for å velge dette hullet.',es:'{eq}. Toca para elegir este hueco.',it:'{eq}. Tocca per scegliere questo buco.',pt:'{eq}. Toque para escolher este buraco.',fr:'{eq}. Touche pour choisir ce trou.',fi:'{eq}. Napauta valitaksesi tämän aukon.'},
    ariaLaid:    {en:'Plank {n} fits {eq}. Tap to take it out.',de:'Brett {n} passt in {eq}. Tippen zum Herausnehmen.',nl:'Plank {n} past in {eq}. Tik om hem eruit te halen.',da:'Planke {n} passer i {eq}. Tryk for at tage den ud.',sv:'Planka {n} passar i {eq}. Tryck för att ta ut den.',no:'Planke {n} passer i {eq}. Trykk for å ta den ut.',es:'La tabla {n} encaja en {eq}. Toca para sacarla.',it:'L’asse {n} si incastra in {eq}. Tocca per toglierla.',pt:'A tábua {n} encaixa em {eq}. Toque para tirá-la.',fr:'La planche {n} est juste pour {eq}. Touche pour la retirer.',fi:'Lankku {n} sopii laskuun {eq}. Napauta, niin otat sen pois.'},
    ariaPlank:   {en:'Plank {n}',de:'Brett {n}',nl:'Plank {n}',da:'Planke {n}',sv:'Planka {n}',no:'Planke {n}',es:'Tabla {n}',it:'Asse {n}',pt:'Tábua {n}',fr:'Planche {n}',fi:'Lankku {n}'}
  },/*STRINGS-END*/

  defaults: { numbers: '10', path: 'squares' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '10', labelKey: 'n10' }, { value: '20', labelKey: 'n20' }] },
    { key: 'path', type: 'choice', labelKey: 'setPath', options: [{ value: 'squares', labelKey: 'pSquares' }, { value: 'numbers', labelKey: 'pNumbers' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0; this._decoySlot = -1;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {};
    injectPlankCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['forest creatures', 'farm animals', 'pets'].forEach(function (dir) { LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PlankPathCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return PlankPathCore.levelOf(this._setting('numbers')); },
  _key: function () { return this._level(); },
  _mist: function () { return this._setting('path') === 'numbers'; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PlankPathCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PlankPathCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: '' }; this._pa = pa;
    var r = C.round(this._level(), idx); pa.msg = this._t('tLine', { eq: C.text(r.gaps[0]) });
    return {
      id: 'planks.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx, pos) {
    var C = PlankPathCore, r = C.round(this._level(), idx);
    this._clearTimers(); this._view = {}; this._pos = pos || 0;
    var tray = C.tray(r, Math.random, this._decoySlot); this._decoySlot = tray.indexOf(r.decoy);
    this.st = C.newState(r, tray);
    this._walker = C.DATA.WALKERS[this._pos % C.DATA.WALKERS.length];
    this._syncPrompt();
  },
  _syncPrompt: function () {
    var C = PlankPathCore, st = this.st, g = st.selected >= 0 ? st.r.gaps[st.selected] : st.r.gaps[3];
    var line = this._t('tLine', { eq: C.text(g) }); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pp-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="pp-strip"></div><div class="pp-path"></div><div class="pp-tray" role="group"></div><p class="pp-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled && nx.offsetParent !== null ? nx : this._wrap).focus(); }
  },
  _pic: function (dir, key, size, cls) {
    var th = this._pics[dir]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = PlankPathCore, st = this.st, r = st.r, W = this._width(), L = C.layoutW(W), v = this._view, self = this;
    this._L = L;
    this._wrap.className = 'pp-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* ---- the walker + the flag: their own strip on a wide screen, inside the first / last signpost rows on a phone ---- */
    var strip = this._q('.pp-strip'); strip.innerHTML = '';
    var wsize = L.wide ? 96 : 64, fsize = L.wide ? 96 : 44, walker = this._pic(this._walker[0], this._walker[1], wsize, 'pp-walker' + (this._walker[2] ? ' is-mirror' : '') + (st.done ? ' is-across' : ''));
    var flag = '<svg class="pp-flag' + (st.done ? ' is-up' : '') + '" width="' + (L.wide ? 64 : 30) + '" height="' + fsize + '" viewBox="0 0 44 64" aria-hidden="true"><rect x="6" y="4" width="3" height="58" rx="1.5" fill="#6E4F22"/><path class="pp-pennant" d="M9 ' + (st.done ? 6 : 34) + 'l28 8-28 8z" fill="#E0603A"/></svg>';
    /* ---- the path ---- */
    var path = this._q('.pp-path'); path.innerHTML = '';
    path.style.gridTemplateColumns = 'repeat(' + L.cols + ', minmax(0, 1fr))';
    var segW = L.wide ? Math.floor((W - 16) / 2) : W;
    if (L.wide) {
      strip.hidden = false;
      var row = this.api.el('div', 'pp-striprow');
      var road = this.api.el('span', 'pp-striproad'); row.appendChild(road);
      var wbox = this.api.el('span', 'pp-wbox is-strip' + (st.done ? ' is-across' : '')); if (walker) wbox.appendChild(walker); row.appendChild(wbox);
      var fbox = this.api.el('span', 'pp-fbox'); fbox.innerHTML = flag; row.appendChild(fbox);
      strip.appendChild(row);
    } else strip.hidden = true;
    r.gaps.forEach(function (e, g) {
      var seg = self.api.el('div', 'pp-seg' + (st.selected === g && !st.done ? ' is-sel' : '') + (st.laid[g] != null ? ' is-laid' : ''));
      var head = self.api.el('div', 'pp-head');
      if (!L.wide && g === (st.done ? 3 : 0)) { var wb = self.api.el('span', 'pp-wbox' + (st.done ? ' is-arrived' : '')); if (walker) wb.appendChild(walker); head.appendChild(wb); }   /* on a phone the walker waits by gap 1 and arrives by the flag */
      var sign = self.api.el('button', 'pp-sign'); sign.type = 'button'; sign.setAttribute('data-k', 'sign-' + g);
      var laid = st.laid[g];
      sign.innerHTML = C.text(e).replace('?', '<span class="pp-blank' + (laid != null ? ' is-full' : '') + '">' + (laid != null ? laid : '?') + '</span>');
      sign.setAttribute('aria-label', laid != null ? self._t('ariaLaid', { n: laid, eq: C.text(e, laid) }) : self._t('ariaSign', { eq: C.text(e) }));
      sign.setAttribute('aria-pressed', st.selected === g ? 'true' : 'false');
      sign.disabled = st.done;
      sign.addEventListener('click', function () { self._sign(g); });
      head.appendChild(sign);
      if (!L.wide && g === 3) { var fb = self.api.el('span', 'pp-fbox'); fb.innerHTML = flag; head.appendChild(fb); }
      seg.appendChild(head);
      var rd = self.api.el('div', 'pp-road'); rd.innerHTML = roadSVG(self, e, g, segW, L); seg.appendChild(rd);
      path.appendChild(seg);
    });
    /* ---- the tray ---- */
    var tray = this._q('.pp-tray'); tray.innerHTML = '';
    st.tray.forEach(function (p, i) {
      var b = self.api.el('button', 'pp-plank' + (C.used(st, p) ? ' is-used' : '') + (st.done && p === r.decoy ? ' is-float' : '') + (v.bounce === p ? ' is-back' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'plank-' + p);
      b.innerHTML = '<svg viewBox="0 0 96 64" aria-hidden="true"><rect x="4" y="14" width="88" height="14" rx="3" class="pp-wood"/><rect x="8" y="30" width="80" height="14" rx="3" class="pp-wood"/><rect x="4" y="46" width="88" height="14" rx="3" class="pp-wood"/></svg><span class="pp-tag">' + p + '</span>';
      b.setAttribute('aria-label', self._t('ariaPlank', { n: p }));
      b.disabled = st.done || C.used(st, p);
      b.addEventListener('click', function () { self._lay(p); });
      tray.appendChild(b);
    });
    /* ---- the note ---- */
    var note = this._q('.pp-note'), hk = C.hint(st), t = '', cls = 'pp-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; }
    else if (hk) { t = this._t(hk); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },

  /* ---------------- actions ---------------- */
  _sign: function (g) {
    var C = PlankPathCore, st = this.st;
    if (st.done) return;
    if (st.laid[g] != null) { if (C.lift(st, g)) { this._view = {}; this.api.sound(380); this._syncPrompt(); this._paint(); } return; }
    if (C.select(st, g)) { this._view = {}; this.api.sound(560); this._syncPrompt(); this._paint(); }
  },
  _lay: function (p) {
    var C = PlankPathCore, st = this.st, self = this;
    if (st.done) return;
    var res = C.lay(st, p); if (!res) return;
    var e = st.r.gaps[res.gap];
    if (res.fit === 'exact') {
      this._view = { fresh: res.gap, msg: res.done ? this._t('okAll', { a: st.laid[0], b: st.laid[1], c: st.laid[2], d: st.laid[3] }) : this._t('okFit', { eq: C.text(e, p) }) };
      this.api.sound(res.done ? 880 : 640);
    } else { this._view = { attempt: { gap: res.gap, p: p, fit: res.fit }, bounce: p }; this.api.sound(res.fit === 'short' ? 200 : 240); }
    this._syncPrompt(); this._paint();
    this.api.announce(this._q('.pp-note').textContent || '');
    if (st.done) this._advance(this._view.msg.length * 60 + 2600);
  },
  _key_: function (e) {
    var st = this.st, k = e.key;
    if (k === 'ArrowUp' || k === 'ArrowDown') {
      e.preventDefault(); var d = k === 'ArrowDown' ? 1 : 3;
      for (var i = 1; i <= 4; i++) { var g = (st.selected + d * i) % 4; if (st.laid[g] == null) { this._sign(g); break; } }
    } else if (k === 'Backspace') {
      e.preventDefault(); for (var j = 3; j >= 0; j--) if (st.laid[j] != null) { this._sign(j); break; }
    }
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

/* one gap's road: water, sand, the banks of squares, the posts, the open stretch (or the base slot), a laid plank, an attempt, the counting help */
function roadSVG(self, e, g, SW, L) {
  var C = PlankPathCore, st = self.st, top = st.r.top, lay = C.layout(e), H = L.wide ? 96 : L.tiny ? 40 : 50, pad = 14, v = self._view;
  var mist = self._mist() && !st.seen[g] && st.laid[g] == null;
  var u = (SW - 2 * pad) / top, sq = Math.min(L.wide ? 26 : 16, u), roadY = L.wide ? 22 : 11, rh = Math.max(12, Math.min(sq, L.wide ? 24 : 16)), baseY = roadY + rh + (L.wide ? 8 : 5), bh = L.wide ? 14 : 9;
  var X = function (n) { return pad + n * u; }, f = function (x) { return x.toFixed(1); };
  var s = '<svg class="pp-svg" width="' + SW + '" height="' + H + '" viewBox="0 0 ' + SW + ' ' + H + '" aria-hidden="true">';
  s += '<rect x="0" y="' + (roadY - 6) + '" width="' + SW + '" height="' + (H - roadY + 6) + '" rx="10" class="pp-water"/>';
  s += '<path d="M8 ' + (H - 10) + 'q12 -6 24 0t24 0t24 0" class="pp-wave"/>';
  if (mist) {
    /* "Numbers only": every segment the same width, the banks as plain strips with their numbers, the open stretch under mist */
    var half = (SW - 2 * pad) / 2, gapFirst = lay.gap.from === 0 && !lay.gap.base;
    var bankX = gapFirst ? pad + half : pad, gapX = gapFirst ? pad : pad + half;
    if (lay.gap.base) {
      lay.banks.forEach(function (b, i) { s += '<rect x="' + f(pad + i * half) + '" y="' + roadY + '" width="' + f(half - 2) + '" height="' + rh + '" rx="4" class="pp-strip-bank is-' + b.c + '"/><text x="' + f(pad + i * half + half / 2) + '" y="' + f(roadY + rh * 0.78) + '" class="pp-banknum">' + b.len + '</text>'; });
      s += '<rect x="' + pad + '" y="' + baseY + '" width="' + f(2 * half) + '" height="' + bh + '" rx="4" class="pp-mist"/>';
    } else {
      var b0 = lay.banks[0];
      s += '<rect x="' + f(bankX) + '" y="' + roadY + '" width="' + f(half) + '" height="' + rh + '" rx="4" class="pp-strip-bank is-' + b0.c + (b0.gone ? ' is-gone' : '') + '"/><text x="' + f(bankX + half / 2) + '" y="' + f(roadY + rh * 0.78) + '" class="pp-banknum">' + b0.len + '</text>';
      s += '<rect x="' + f(gapX) + '" y="' + (roadY - 2) + '" width="' + f(half) + '" height="' + (rh + 4) + '" rx="4" class="pp-mist"/>';
    }
    return s + '</svg>';
  }
  /* the posts at 0 and at the whole */
  s += '<rect x="' + f(X(0) - 3) + '" y="' + (roadY - 8) + '" width="5" height="' + (rh + 14) + '" rx="2" class="pp-post"/><rect x="' + f(X(lay.whole) - 2) + '" y="' + (roadY - 8) + '" width="5" height="' + (rh + 14) + '" rx="2" class="pp-post"/>';
  /* the banks: one square per unit */
  lay.banks.forEach(function (b) { for (var i = 0; i < b.len; i++) s += '<rect x="' + f(X(b.from + i) + 0.8) + '" y="' + roadY + '" width="' + f(u - 1.6) + '" height="' + rh + '" rx="2" class="pp-sq is-' + b.c + (b.gone ? ' is-gone' : '') + '"/>'; });
  if (top === 20) lay.banks.forEach(function (b) { for (var i = 1; i <= b.len; i++) if ((b.from + i) % 5 === 0) s += '<line x1="' + f(X(b.from + i)) + '" y1="' + (roadY - 3) + '" x2="' + f(X(b.from + i)) + '" y2="' + (roadY + rh + 3) + '" class="pp-five"/>'; });
  /* the open stretch: water between banks, or the dashed base slot under the road */
  var G = lay.gap;
  if (G.base) s += '<rect x="' + f(X(0)) + '" y="' + baseY + '" width="' + f(G.len * u) + '" height="' + bh + '" rx="3" class="pp-slot"/>';
  else s += '<rect x="' + f(X(G.from) + 1) + '" y="' + (roadY - 2) + '" width="' + f(G.len * u - 2) + '" height="' + (rh + 4) + '" rx="3" class="pp-open"/>';
  var py = G.base ? baseY : roadY + rh * 0.15, ph = G.base ? bh : rh * 0.7;
  /* a laid plank */
  if (st.laid[g] != null) s += '<g class="pp-laid' + (v.fresh === g && !self.FAST ? ' is-new' : '') + '" style="transform-origin:' + f(X(G.from)) + 'px 0"><rect x="' + f(X(G.from)) + '" y="' + f(py) + '" width="' + f(G.len * u) + '" height="' + f(ph) + '" rx="3" class="pp-board"/><line x1="' + f(X(G.from)) + '" y1="' + f(py - 3) + '" x2="' + f(X(G.from + G.len)) + '" y2="' + f(py - 3) + '" class="pp-rope"/></g>';
  /* a wrong attempt: the plank falls in or sticks out; the open squares / the overhang stay outlined */
  var A = v.attempt && v.attempt.gap === g ? v.attempt : null, last = st.last && st.last.gap === g && (st.last.reason === 'short' || st.last.reason === 'long') ? st.last : null;
  if (A && !self.FAST) s += '<rect x="' + f(X(G.from)) + '" y="' + f(py) + '" width="' + f(Math.min(A.p * u, SW - X(G.from))) + '" height="' + f(ph) + '" rx="3" class="pp-board ' + (A.fit === 'short' ? 'is-fall' : 'is-seesaw') + '"/>';
  if (last && last.help < 2) {
    if (last.reason === 'short') for (var k = last.p; k < G.len; k++) s += '<rect x="' + f(X(G.from + k) + 1.5) + '" y="' + f(py) + '" width="' + f(u - 3) + '" height="' + f(ph) + '" rx="2" class="pp-miss"/>';
    else for (var k2 = G.len; k2 < last.p && X(G.from + k2) < SW - 2; k2++) s += '<rect x="' + f(X(G.from + k2) + 1.5) + '" y="' + f(py) + '" width="' + f(Math.min(u - 3, SW - 2 - X(G.from + k2))) + '" height="' + f(ph) + '" rx="2" class="pp-over"/>';
  }
  /* miss 2: dashed squares across the open stretch, numbered from the near end */
  var help = C.countHelp(st);
  if (help && help.gap === g) for (var c = 0; c < help.len; c++) { var cx = X(help.from + c); s += '<rect x="' + f(cx + 1.5) + '" y="' + f(py) + '" width="' + f(u - 3) + '" height="' + f(ph) + '" rx="2" class="pp-count"/>'; if (u >= 11 || (c + 1) % 5 === 0 || c === help.len - 1) s += '<text x="' + f(cx + u / 2) + '" y="' + f(py + ph * 0.74) + '" class="pp-countnum" font-size="' + f(Math.min(13, Math.max(8, u * 0.62))) + '">' + (c + 1) + '</text>'; }
  return s + '</svg>';
}

var ppCssDone = false;
function injectPlankCSS() {
  if (ppCssDone || typeof document === 'undefined') return;
  ppCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pp-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;} .pp-wrap:focus{outline:none;}'
  + '.pp-strip{width:100%;} .pp-strip[hidden]{display:none;} .pp-striprow{position:relative;display:flex;align-items:flex-end;gap:8px;min-height:96px;padding-left:104px;} .pp-striproad{flex:1;height:14px;margin-bottom:10px;border-radius:7px;background:#E8D2A6;box-shadow:inset 0 -3px 0 #C9A96E;}'
  + '.pp-wbox.is-strip{position:absolute;left:0;bottom:0;} .pp-wbox.is-strip.is-across{left:calc(100% - 172px);animation:ppCross 1.6s ease-in-out;} @keyframes ppCross{from{left:0;}} .pp-head .pp-wbox.is-arrived{margin-right:0;margin-left:auto;order:3;}'
  + '.pp-wbox{display:block;flex:none;position:relative;} .pp-fbox{display:block;flex:none;} .pp-walker{display:block;transition:transform 1.4s ease-in-out;} .pp-walker.is-mirror{transform:scaleX(-1);}'
  + '.pp-wrap.is-done .pp-walker{animation:ppHop .35s ease-in-out 4;} @keyframes ppHop{50%{translate:0 -10px;}}'
  + '.pp-pennant{transition:d .6s;} .pp-flag.is-up .pp-pennant{fill:#D4A21E;}'
  + '.pp-path{display:grid;gap:10px;width:100%;} .pp-seg{display:flex;flex-direction:column;gap:4px;border-radius:14px;padding:4px 0;} .pp-seg.is-sel{background:#E5F2EF;box-shadow:inset 0 0 0 2px #1E8A78;}'
  + '.pp-head{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;} .pp-head .pp-wbox{margin-right:auto;} .pp-head .pp-fbox{margin-left:auto;}'
  + '.pp-sign{min-width:200px;min-height:44px;padding:4px 14px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42,0 3px 0 #C9A96E;font-family:' + H + ';font-weight:800;font-size:26px;color:#3A2E1F;cursor:pointer;white-space:nowrap;}'
  + '.pp-seg.is-sel .pp-sign{box-shadow:inset 0 0 0 3px #1E8A78,0 3px 0 #9CC9BE;} .pp-sign:disabled{cursor:default;}'
  + '.pp-blank{display:inline-block;min-width:1.2em;padding:0 4px;border:2px dashed #8A6B42;border-radius:6px;color:#8A6B42;} .pp-blank.is-full{border-style:solid;border-color:#D4A21E;background:#FFF6D6;color:#5A3D00;}'
  + '.pp-road{display:flex;justify-content:center;} .pp-svg{display:block;}'
  + '.pp-water{fill:#CFE6F3;} .pp-wave{fill:none;stroke:#9CCBE6;stroke-width:2;}'
  + '.pp-post{fill:#6E4F22;} .pp-sq{stroke:#3A2E1F;stroke-width:1.2;} .pp-sq.is-c{fill:#F6C2A8;} .pp-sq.is-t{fill:#A9DCD2;} .pp-sq.is-gone{fill:none;stroke:#1E8A78;stroke-dasharray:3 2;} .pp-five{stroke:#3A2E1F;stroke-width:1.6;}'
  + '.pp-open{fill:#9CCBE6;opacity:.55;} .pp-slot{fill:#FFF6D6;stroke:#8A6B42;stroke-width:1.6;stroke-dasharray:4 3;}'
  + '.pp-board{fill:#C9945A;stroke:#6E4F22;stroke-width:1.6;} .pp-rope{stroke:#8A5A2B;stroke-width:2;stroke-dasharray:6 3;}'
  + '.pp-laid.is-new{animation:ppUnfold .5s ease-out;} @keyframes ppUnfold{from{transform:scaleX(0);}}'
  + '.pp-board.is-fall{animation:ppFall .7s ease-in forwards;} @keyframes ppFall{to{transform:translateY(26px);opacity:0;}} .pp-board.is-seesaw{transform-box:fill-box;transform-origin:center;animation:ppSaw .8s ease-in-out forwards;} @keyframes ppSaw{25%{rotate:-4deg;}50%{rotate:4deg;}100%{opacity:0;rotate:0deg;}}'
  + '.pp-miss{fill:none;stroke:#E0603A;stroke-width:2;stroke-dasharray:3 2;} .pp-over{fill:#F2784B;opacity:.75;}'
  + '.pp-count{fill:#FFF6D6;stroke:#D9822B;stroke-width:1.4;stroke-dasharray:3 2;} .pp-countnum{fill:#B5461F;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.pp-strip-bank{stroke:#3A2E1F;stroke-width:1.2;} .pp-strip-bank.is-c{fill:#F6C2A8;} .pp-strip-bank.is-t{fill:#A9DCD2;} .pp-strip-bank.is-gone{fill:#fff;stroke-dasharray:3 2;} .pp-banknum{fill:#3A2E1F;text-anchor:middle;font-family:' + H + ';font-weight:800;font-size:14px;} .pp-mist{fill:#EEF1F4;stroke:#C5CDD6;}'
  + '.pp-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;}'
  + '.pp-plank{position:relative;width:96px;height:64px;padding:0;border:0;border-radius:10px;background:none;cursor:pointer;transition:transform .15s,opacity .3s;} .pp-plank svg{position:absolute;inset:0;width:100%;height:100%;} .pp-wood{fill:#D8A86A;stroke:#6E4F22;stroke-width:2;}'
  + '.pp-tag{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:44px;padding:0 6px;border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #6E4F22;font-family:' + H + ';font-weight:800;font-size:32px;line-height:1.15;color:#3A2E1F;}'
  + '.pp-plank.is-used{visibility:hidden;} .pp-plank:disabled{cursor:default;} .pp-plank.is-back{animation:ppBack .5s ease-out;} @keyframes ppBack{from{transform:translateY(-14px);}}'
  + '.pp-plank.is-float{visibility:visible;animation:ppFloat 2.4s ease-in forwards;} @keyframes ppFloat{to{transform:translate(120px,20px) rotate(12deg);opacity:0;}}'
  + '.pp-plank:focus-visible,.pp-sign:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.pp-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .pp-note:empty{display:none;} .pp-note.is-hint{color:#B5461F;} .pp-note.is-ok{color:#146B5E;}'
  + '.pp-wrap.is-narrow .pp-path{gap:3px;} .pp-wrap.is-narrow .pp-seg{padding:2px 0;gap:2px;} .pp-wrap.is-narrow .pp-wave{display:none;} .pp-wrap.is-narrow .pp-sign{min-width:150px;font-size:22px;padding:2px 10px;} .pp-wrap.is-narrow .pp-plank{width:60px;height:56px;} .pp-wrap.is-narrow .pp-tag{font-size:24px;min-width:34px;} .pp-wrap.is-narrow .pp-tray{gap:6px;} .pp-wrap.is-narrow .pp-note{font-size:17px;}'
  + '.pp-wrap.is-tiny .pp-seg{padding:0;} .pp-wrap.is-tiny .pp-sign{min-width:130px;font-size:20px;} .pp-wrap.is-tiny .pp-plank{width:52px;height:52px;} .pp-wrap.is-tiny .pp-tag{font-size:22px;min-width:30px;}'
  + '.pp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.pp-note,.pp-tray{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.pp-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'pp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.PlankPathActivity = PlankPathActivity;
