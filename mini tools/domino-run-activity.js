/* =====================================================================
   domino-run-activity.js — ACTIVITY #50 of the one-by-one rebuild:
   "Forma las sílabas" (es) → LA FILA DE FICHAS, the domino run
   (RF.K.2.B, Spanish). Design sheet: docs/activities-rebuild/designs/050-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: syllables as dominoes. Stand them on their marks and
   press ¡Empuja!: they topple faster and faster, each landing face-up a
   little closer to the one before, and the fallen syllables close up into
   the word. A gap stops the run; a wrong domino lies in the fallen row as
   a non-word and bounces back to the box. Three levels: Completa la
   palabra · Ordena las fichas · ¿Cuántas fichas?

   ACTIVITY LAYER ONLY: the model is domino-run-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.DominoRunActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var DominoRunActivity = {
  id: 'domino-run',
  apparatusClasses: ['drn-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Domino Run',es:'La fila de fichas'},
    instruction:   {en:'Stand the syllables up as dominoes and push the first one: the dominoes fall and their syllables join up to make the word.',es:'Pon las sílabas de pie como fichas de dominó y empuja la primera: las fichas caen y sus sílabas se juntan para formar la palabra.'},
    check:         {en:'Push!',es:'¡Empuja!'},
    pComplete:     {en:'Which syllable is missing?',es:'¿Qué sílaba falta?'},
    pOrder:        {en:'Order the dominoes to build the word.',es:'Ordena las fichas para formar la palabra.'},
    pCount:        {en:'How many syllables does it have?',es:'¿Cuántas sílabas tiene?'},
    hintGap:       {en:'One domino is missing. Which one?',es:'Falta una ficha. ¿Cuál es?'},
    hintOrder:     {en:'Put the dominoes in order and push the first one.',es:'Pon las fichas en orden y empuja la primera.'},
    hintCount:     {en:'Stand one domino for each syllable you hear.',es:'Pon una ficha por cada sílaba que oyes.'},
    hintStop:      {en:'The run stops! A domino is missing.',es:'¡La fila se detiene! Falta una ficha.'},
    hintSame:      {en:'"{syl}" is in {word}, but not here.',es:'«{syl}» está en {word}, pero no aquí.'},
    hintForeign:   {en:'"{syl}" is not in {word}.',es:'«{syl}» no está en {word}.'},
    hintListen:    {en:'Listen: {gapped}.',es:'Escucha: {gapped}.'},
    hintStay:      {en:'The dominoes that stay in the run are right.',es:'Las fichas que se quedan en la fila están bien.'},
    hintDecoy:     {en:'That domino is not from this word.',es:'Esa ficha no es de esta palabra.'},
    hintFirst:     {en:'The word starts with "{first}".',es:'La palabra empieza con «{first}».'},
    hintShort:     {en:'That domino carried two syllables! Add another.',es:'¡Esa ficha llevaba dos sílabas! Pon otra.'},
    hintLong:      {en:'That domino had no syllable.',es:'Esa ficha no tenía sílaba.'},
    hintLong2:     {en:'Those dominoes had no syllable.',es:'Esas fichas no tenían sílaba.'},
    hintClap:      {en:'Clap: one domino per clap.',es:'Da palmadas: una ficha por palmada.'},
    okComplete:    {en:'It is {word}! "{syl}" was missing.',es:'¡Es {word}! Faltaba «{syl}».'},
    okOrder:       {en:'{plus} = {word}',es:'{plus} = {word}'},
    okCount:       {en:'{word}: {n} syllables — {parts}',es:'{word}: {n} sílabas — {parts}'},
    okCountOne:    {en:'{word}: one syllable',es:'{word}: una sílaba'},
    setLevel:      {en:'Level',es:'Nivel'},
    lvComplete:    {en:'Complete the word',es:'Completa la palabra'},
    lvOrder:       {en:'Order the dominoes',es:'Ordena las fichas'},
    lvCount:       {en:'How many dominoes?',es:'¿Cuántas fichas?'},
    setDecoy:      {en:'Trick domino',es:'Ficha trampa'},
    optNo:         {en:'No',es:'No'},
    optYes:        {en:'Yes',es:'Sí'},
    setCase:       {en:'Letters',es:'Letras'},
    optLower:      {en:'lowercase',es:'minúsculas'},
    optUpper:      {en:'CAPITALS',es:'MAYÚSCULAS'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',es:'Imagen: {word} — toca para oírla'},
    ariaRun:       {en:'Run of {n} dominoes',es:'Fila de {n} fichas'},
    ariaDomino:    {en:'Domino {i}: {s}',es:'Ficha {i}: {s}'},
    ariaBlank:     {en:'blank',es:'en blanco'},
    ariaHole:      {en:'gap',es:'hueco'},
    ariaBox:       {en:'Box with {n} dominoes',es:'Caja con {n} fichas'},
    ariaBoxTile:   {en:'Domino: {s}',es:'Ficha: {s}'},
    ariaWords:     {en:'Finished words',es:'Palabras terminadas'},
    ariaWord:      {en:'The word is {word}',es:'La palabra es {word}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'complete', decoy: 'no', letters: 'lower' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'complete', labelKey: 'lvComplete' }, { value: 'order', labelKey: 'lvOrder' }, { value: 'count', labelKey: 'lvCount' }] },
    { key: 'decoy', type: 'choice', labelKey: 'setDecoy', options: [{ value: 'no', labelKey: 'optNo' }, { value: 'yes', labelKey: 'optYes' }] },
    { key: 'letters', type: 'choice', labelKey: 'setCase', options: [{ value: 'lower', labelKey: 'optLower' }, { value: 'upper', labelKey: 'optUpper' }] }
  ],

  OK_MS: 500, HOLD_MS: 1300, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false;
    this._box = []; this._boxPass = -1; this._view = null; this._dragged = false;
    injectDominoCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _lv: function () { return DominoRunCore.level(this._set('level')); },
  _decoy: function () { return this._set('decoy') === 'yes'; },
  /* a new deal when the level changes, or the trick domino at Ordena las fichas */
  _key: function () { var lv = this._lv(); return lv + (lv === 'order' ? '/' + (this._decoy() ? 'yes' : 'no') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'es', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._box = []; this._boxPass = -1; } this._pool = DominoRunCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = DominoRunCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, dec = r.level === 'order' && this._decoy();
    var args = { word: w.word, n: w.syl.length, parts: w.syl.join(' · '), plus: w.syl.join(' + '), syl: r.level === 'complete' ? w.syl[r.gap] : '', first: w.syl[0] };
    args.gapped = r.level === 'complete' ? w.syl.map(function (s, i) { return i === r.gap ? '¿?' : s; }).join(' … ') : '';
    var pk = { complete: 'pComplete', order: 'pOrder', count: 'pCount' }[r.level];
    var ck = r.level === 'complete' ? 'okComplete' : r.level === 'order' ? 'okOrder' : (w.syl.length === 1 ? 'okCountOne' : 'okCount');
    return {
      id: 'domino-run.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = null;
        if (tool._boxPass !== pss) { tool._box = []; tool._boxPass = pss; }
        tool.st = C.newState(r, pss, { decoy: dec }); tool._args = args; tool._ck = ck;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = DominoRunCore.newState(DominoRunCore.rounds('complete')[0], 0); this._args = {}; this._ck = 'okComplete'; }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st;
    api.stage.innerHTML = '';
    var L = this._L = DominoRunCore.layout(this._width());
    var wrap = api.el('div', 'drn-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level + (this._set('letters') === 'upper' ? ' is-upper' : '')); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['pic', L.pic], ['dw', L.dw], ['dh', L.dh], ['syl', L.syl], ['th', L.tableH], ['base', L.base]].forEach(function (p) { wrap.style.setProperty('--drn-' + p[0], p[1] + 'px'); });
    var top = api.el('div', 'drn-top'); wrap.appendChild(top);
    var easel = api.el('div', 'drn-easel'); this._easelEl = easel; top.appendChild(easel);
    var words = api.el('div', 'drn-words'); words.setAttribute('aria-label', this._t('ariaWords')); this._wordsEl = words; top.appendChild(words);
    var table = api.el('div', 'drn-table'); this._table = table; wrap.appendChild(table);
    var box = api.el('div', 'drn-box'); this._boxEl = box; wrap.appendChild(box);
    var note = api.el('div', 'drn-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'drn-ask'); ask.appendChild(note);
    var chk = api.el('button', 'drn-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._push(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    table.addEventListener('click', function (ev) { self._onTable(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0]; sel = '.' + cls + (a.hasAttribute('data-id') ? '[data-id="' + a.getAttribute('data-id') + '"]' : ''); }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._table) return;
    var st = this.st, C = DominoRunCore;
    this._paintTop(); this._paintTable(); this._paintBox();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) { var a = Object.assign({}, this._args); if (st.last && st.last.syl) a.syl = st.last.syl; msg = this._t(h, a); }
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && ['empty', 'stop'].indexOf(st.last.result) < 0));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintTop: function () {
    var self = this, st = this.st, r = st.r;
    this._easelEl.innerHTML = '';
    var pic = this.api.el('button', 'drn-pic' + (st.done && this._view && this._view.closed ? ' is-bounce' : '')); pic.type = 'button';
    pic.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(r.w.word); });
    this._easelEl.appendChild(pic);
    this._easelEl.insertAdjacentHTML('beforeend', '<span class="drn-legs" aria-hidden="true"></span><span class="drn-bell' + (st.done && this._view && this._view.closed ? ' is-ring' : '') + '" aria-hidden="true"></span>');
    var el = this._wordsEl; el.innerHTML = '';
    var keep = this._L && this._L.mode === 'narrow' ? 4 : 10;
    if (!this._box.length) el.insertAdjacentHTML('beforeend', '<span class="drn-wpad" aria-hidden="true"></span><span class="drn-wpad" aria-hidden="true"></span><span class="drn-wpad" aria-hidden="true"></span>');
    this._box.slice(-keep).reverse().forEach(function (w, i) { var t = self.api.el('span', 'drn-wtile' + (i === 0 && st.done ? ' is-new' : '')); t.textContent = w; el.appendChild(t); });
  },

  /* ---- the table: marks, standing dominoes, the toppling run, the fallen row ---- */
  _xs: function (n) { var L = this._L; return DominoRunCore.spread(n, L.x0, L.x1); },
  _text: function (id) { var d = DominoRunCore.domino(this.st, id); return d ? d.text : ''; },
  _paintTable: function () {
    var self = this, st = this.st, r = st.r, C = DominoRunCore, L = this._L, t = this._table, v = this._view;
    t.innerHTML = '';
    var n = r.level === 'count' ? st.blanks : st.marks.length, xs = this._xs(Math.max(n, 1));
    t.setAttribute('role', 'group'); t.setAttribute('aria-label', this._t('ariaRun', { n: n }));
    t.insertAdjacentHTML('beforeend', '<span class="drn-edge" aria-hidden="true"></span>');
    /* the fallen row: face-up tiles overlapping less and less; closed = edge to edge */
    if (v && v.fallen) {
      var tiles = v.fallen, ov = v.closed ? tiles.map(function () { return 0; }) : [0].concat(C.overlaps(tiles.length));
      var sumOv = ov.reduce(function (a, b) { return a + b; }, 0), fw = Math.min(L.dh, Math.floor((L.x1 - L.x0 + sumOv) / Math.max(1, tiles.length))), fh = Math.round(L.dw * 0.95);
      /* a tile is as wide as the run allows, wider when it carries crammed syllables */
      var sizes = tiles.map(function (f) { var len = f.text.length, fs = len > 2 ? Math.max(14, Math.min(L.syl, Math.floor((fw - 24) / (len * 0.6)))) : L.syl; return { fs: fs, w: Math.max(fw, Math.ceil(len * fs * 0.6 + 24)) }; });
      var total = sizes.reduce(function (a, z) { return a + z.w; }, 0) - sumOv, x = (L.x0 + L.x1) / 2 - total / 2;
      var row = this.api.el('div', 'drn-fallen' + (v.closed ? ' is-closed' : '')); row.setAttribute('aria-label', this._t('ariaWord', { word: tiles.map(function (f) { return f.text; }).join('') }));
      tiles.forEach(function (f, i) {
        x -= ov[i];
        var e = self.api.el('span', 'drn-flat' + (f.cls ? ' ' + f.cls : ''));
        e.style.left = x + 'px'; e.style.width = sizes[i].w + 'px'; e.style.height = fh + 'px'; e.style.zIndex = 10 + i;
        e.innerHTML = '<span style="font-size:' + sizes[i].fs + 'px">' + f.text + '</span><i></i>';
        row.appendChild(e); x += sizes[i].w;
      });
      t.appendChild(row);
      if (v.closed) { var card = this.api.el('span', 'drn-word'); card.textContent = r.w.word; t.appendChild(card); }
      return;
    }
    /* count, miss 2: one beat per syllable lights in turn above the run — the clap made visible (sound off) */
    if (r.level === 'count' && st.show && st.help >= 2 && !st.done) {
      var beats = this.api.el('div', 'drn-beats'); beats.setAttribute('aria-hidden', 'true');
      r.w.syl.forEach(function (_, q) { var b0 = self.api.el('span', 'drn-beat'); b0.style.animationDelay = (q * 0.45) + 's'; beats.appendChild(b0); });
      t.appendChild(beats);
    }
    /* marks and standing dominoes */
    for (var i = 0; i < n; i++) {
      var x0 = xs[i], id = r.level === 'count' ? 'b' + i : st.marks[i];
      t.insertAdjacentHTML('beforeend', '<span class="drn-mark" aria-hidden="true" style="left:' + (x0 - L.dw / 2 - 3) + 'px"></span>');
      if (!id) { if (r.level !== 'count') { var hole = this.api.el('span', 'drn-hole' + (st.show && st.help >= 2 && r.level === 'complete' ? ' is-glow' : '')); hole.style.left = (x0 - L.dw / 2) + 'px'; hole.setAttribute('aria-label', this._t('ariaDomino', { i: i + 1, s: this._t('ariaHole') })); t.appendChild(hole); } continue; }
      var d = r.level === 'count' ? { id: id, text: '', fixed: false } : C.domino(st, id);
      var cls = 'drn-dom' + (d.fixed ? ' is-fixed' : '') + (st.pinned.indexOf(i) >= 0 ? ' is-pinned' : '');
      if (v && v.fall && i < v.fall.upto) { cls += ' is-fall'; }
      if (v && v.fall && v.fall.flat === i) cls += ' is-flat';
      var b = this.api.el('button', cls); b.type = 'button'; b.setAttribute('data-id', id);
      b.style.left = (x0 - L.dw / 2) + 'px';
      if (v && v.fall && i < v.fall.upto) b.style.animationDelay = (v.fall.delays[i] / 1000) + 's';
      b.innerHTML = '<span class="drn-face">' + d.text + '</span><i></i>';
      b.setAttribute('aria-label', this._t('ariaDomino', { i: i + 1, s: d.text || this._t('ariaBlank') }));
      this._bindStanding(b, i, d);
      t.appendChild(b);
    }
  },
  _paintBox: function () {
    var self = this, st = this.st, r = st.r, C = DominoRunCore, el = this._boxEl;
    el.innerHTML = '';
    var list = [];
    if (!st.done) {
      if (r.level === 'count') { for (var i = 0; i < C.MAX_BLANKS - st.blanks; i++) list.push({ id: 'p' + i, text: '' }); }
      /* while the fallen row lies on the table, the dominoes that just fell are not yet back in the box */
      else { var onTable = this._view && this._view.fallen && this._view.onTable ? this._view.onTable : []; list = st.box.filter(function (id) { return onTable.indexOf(id) < 0; }).map(function (id) { return C.domino(st, id); }); }
    }
    el.className = 'drn-box' + (list.length ? '' : ' is-empty');
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaBox', { n: list.length }));
    var back = this._view && this._view.bounced ? this._view.bounced : [];
    list.forEach(function (d) {
      var b = self.api.el('button', 'drn-loose' + (back.indexOf(d.id) >= 0 ? ' is-back' : '')); b.type = 'button'; b.setAttribute('data-id', d.id);
      b.innerHTML = '<span class="drn-face">' + d.text + '</span><i></i>';
      b.setAttribute('aria-label', self._t('ariaBoxTile', { s: r.level === 'count' ? self._t('ariaBlank') : d.text }));
      self._bindLoose(b, d);
      el.appendChild(b);
    });
  },

  /* ---- the hand ---- */
  _onTable: function (ev) {
    if (this._busy || this.st.done || this._dragged || this.st.r.level !== 'count') return;
    if (ev.target.closest && ev.target.closest('.drn-dom')) return;
    this._blank(1);
  },
  _blank: function (d) { if (this._busy) return; if (d > 0 ? DominoRunCore.standBlank(this.st) : DominoRunCore.unstandBlank(this.st)) { this.api.sound(d > 0 ? 520 : 300); this._paint(); } },
  _stand: function (id, mark) { if (this._busy) return; if (DominoRunCore.stand(this.st, id, mark)) { this.api.sound(560); this._say(this._text(id), 1); this._paint(); } },
  _unstand: function (mark) { if (this._busy) return; if (DominoRunCore.unstand(this.st, mark)) { this.api.sound(300); this._paint(); } },
  _bindStanding: function (b, i, d) {
    var self = this, lv = this.st.r.level;
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (self._busy || self.st.done || self._dragged) return;
      if (lv === 'count') { self._blank(-1); return; }
      if (d.fixed || self.st.pinned.indexOf(i) >= 0) { b.classList.remove('is-wobble'); void b.offsetWidth; b.classList.add('is-wobble'); self._say(d.text, 1); return; }
      self._unstand(i);
    });
    if (lv !== 'count' && !d.fixed) this._bindDrag(b, d.id);
  },
  _bindLoose: function (b, d) {
    var self = this, lv = this.st.r.level;
    b.addEventListener('click', function () {
      if (self._busy || self.st.done || self._dragged) return;
      if (lv === 'count') { self._blank(1); return; }
      self._stand(d.id);
    });
    if (lv !== 'count') this._bindDrag(b, d.id);
  },
  /* drag a domino onto the table: it stands on the nearest mark (Completa: the gap only); back to the box to take it off */
  _bindDrag: function (b, id) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null, r0 = b.getBoundingClientRect();
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = b.cloneNode(true); ghost.className += ' is-drag'; ghost.style.left = r0.left + 'px'; ghost.style.top = r0.top + 'px'; ghost.style.width = r0.width + 'px'; ghost.style.height = r0.height + 'px'; document.body.appendChild(ghost); b.classList.add('is-lifting'); }
        ghost.style.left = (r0.left + e.clientX - x0) + 'px'; ghost.style.top = (r0.top + e.clientY - y0) + 'px'; e.preventDefault();
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (!moved) return;
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        setTimeout(function () { self._dragged = false; }, 0);
        var tr = self._table.getBoundingClientRect(), br = self._boxEl.getBoundingClientRect(), st = self.st;
        if (e.clientY >= tr.top && e.clientY <= tr.bottom + 10) {
          var xs = self._xs(st.marks.length), best = 0, bd = Infinity;
          xs.forEach(function (x, i) { var dd = Math.abs(tr.left + x - e.clientX); if (dd < bd) { bd = dd; best = i; } });
          self._stand(id, st.r.level === 'complete' ? st.r.gap : best);
        } else if (e.clientY >= br.top - 20 && e.clientY <= br.bottom + 20 && st.marks.indexOf(id) >= 0) self._unstand(st.marks.indexOf(id));
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    if (this.st.done || this._busy || ev.defaultPrevented) return;
    var st = this.st, lv = st.r.level;
    if (lv === 'count' && (ev.key === '+' || ev.key === '-')) { ev.preventDefault(); this._blank(ev.key === '+' ? 1 : -1); return; }
    if (ev.key === 'Backspace') {
      ev.preventDefault();
      if (lv === 'count') { this._blank(-1); return; }
      for (var i = st.marks.length - 1; i >= 0; i--) if (st.marks[i] && !DominoRunCore.domino(st, st.marks[i]).fixed && st.pinned.indexOf(i) < 0) { this._unstand(i); return; }
    }
  },

  /* ---- ¡Empuja! ---- */
  _push: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, r = st.r, C = DominoRunCore;
    var n = r.level === 'count' ? st.blanks : st.marks.length, before = st.marks.slice();
    var res = C.push(st), last = st.last || {};
    if (res.kase === 'empty') { this.api.sound(460); this._paint(); return; }
    var iv = C.intervals(n), delays = [], acc = 0; iv.forEach(function (d) { delays.push(acc); acc += d; });
    var upto = res.kase === 'stop' ? res.stoppedAt : n;
    /* the run topples: the marks as they stood before ¡Empuja! */
    var saved = st.marks; st.marks = before;
    this._view = { fall: { upto: upto, delays: delays, flat: res.kase === 'stop' && upto > 0 ? upto - 1 : -1 } };
    this._busy = true; this._paint(); st.marks = saved;
    for (var q = 0; q < upto; q++) (function (q) { self._later(function () { self.api.sound(380 + q * 50); }, self._ms(delays[q])); })(q);
    var fallMs = this._ms((delays[upto - 1] || 0) + 260);
    if (res.kase === 'stop') {
      this._later(function () { self._view = null; self._busy = false; self.api.sound(196); self._paint(); }, fallMs + this._ms(700));
      return;
    }
    /* the fallen row */
    var fallen;
    if (r.level === 'count') {
      var pr = res.right ? r.w.syl.map(function (s) { return [s]; }) : last.printed;
      fallen = pr.map(function (p) { return { text: p.join('·'), cls: p.length > 1 ? 'is-crammed' : !p.length ? 'is-blank' : '' }; });
    } else if (res.right) fallen = r.w.syl.map(function (s) { return { text: s }; });
    else fallen = last.fallen.map(function (s, i) { return { text: s, cls: (last.bounced || []).indexOf(i) >= 0 ? 'is-wrong' : (last.stay || []).indexOf(i) >= 0 ? 'is-stay' : '' }; });
    this._later(function () {
      self._view = { fallen: fallen, closed: false, onTable: before.filter(Boolean) };
      fallen.forEach(function (f, i) { if (f.text) self._later(function () { self._say(f.text, 1.1); }, self._ms(i * 120)); });
      self._paint();
      if (res.right) return self._win();
      self._later(function () {
        var bounced = (last.bounced || []).map(function (i) { return before[i]; });
        self._view = { bounced: bounced }; self._busy = false; self.api.sound(196);
        if (st.help >= 2 && r.level === 'count') self._say(r.w.syl.join(' … '), 0.6);
        if (st.help >= 2 && r.level === 'complete') self._say(r.w.syl.map(function (s, i) { return i === r.gap ? '…' : s; }).join(' '), 0.6);
        self._paint();
      }, self._ms(self.HOLD_MS));
    }, fallMs);
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._later(function () {
      self._view = { fallen: r.w.syl.map(function (s) { return { text: s }; }), closed: true };
      self._say(r.w.word, 0.9);
      self._box.push(r.w.word); if (self._box.length > 10) self._box.shift();
      self.api.announce(self._t('ariaWord', { word: r.w.word }));
      self._paint();
    }, this._ms(500));
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(500 + this.OK_MS));
  }
};

var drnCssDone = false;
function injectDominoCSS() {
  if (drnCssDone || typeof document === 'undefined') return;
  drnCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.drn-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--drn-ink:#2A2A35;--drn-teal:#146B5E;--drn-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.drn-wrap:focus{outline:none;} .drn-wrap.is-upper .drn-face,.drn-wrap.is-upper .drn-flat span,.drn-wrap.is-upper .drn-word,.drn-wrap.is-upper .drn-wtile{text-transform:uppercase;}'
  + '.drn-top{display:flex;align-items:flex-end;gap:14px;}'
  + '.drn-easel{position:relative;flex:none;display:flex;flex-direction:column;align-items:center;}'
  + '.drn-pic{position:relative;z-index:1;width:calc(var(--drn-pic) + 16px);height:calc(var(--drn-pic) + 16px);padding:8px;border:0;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #6B4A2B,0 4px 0 #B8925E;cursor:pointer;} .drn-pic img{width:var(--drn-pic);height:var(--drn-pic);object-fit:contain;display:block;} .drn-pic.is-bounce{animation:drn-bounce .7s ease-out;} @keyframes drn-bounce{30%{transform:translateY(-10px);}60%{transform:none;}80%{transform:translateY(-4px);}}'
  + '.drn-legs{width:60%;height:12px;background:linear-gradient(90deg,#8A6534 0 8px,transparent 8px calc(100% - 8px),#8A6534 calc(100% - 8px));}'
  + '.drn-bell{position:absolute;right:-12px;top:-6px;width:24px;height:22px;border-radius:12px 12px 4px 4px;background:radial-gradient(circle at 35% 30%,#F3DC9C,#C9A24E 60%,#8E6C2A);box-shadow:inset 0 0 0 2px var(--drn-ink);z-index:2;} .drn-bell.is-ring{animation:drn-ring .5s ease-in-out 3;transform-origin:50% 0;} @keyframes drn-ring{25%{transform:rotate(-18deg);}75%{transform:rotate(18deg);}}'
  + '.drn-words{flex:1;min-width:0;min-height:44px;max-height:calc(var(--drn-pic) + 28px);overflow:hidden;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px;padding:8px;border-radius:12px;background:linear-gradient(#B98A55,#B98A55) 0 0/100% 6px no-repeat,#EAD7B4;box-shadow:inset 0 0 0 3px #8A6534;}'
  + '.drn-wtile{display:inline-flex;align-items:center;padding:3px 10px;border-radius:6px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--drn-ink);font:700 14px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--drn-ink);white-space:nowrap;} .drn-wtile.is-new{animation:drn-slide .6s ease-out;} @keyframes drn-slide{0%{transform:translateY(40px);opacity:0;}}'
  + '.drn-table{position:relative;height:var(--drn-th);border-radius:14px;background:linear-gradient(#E3C08F,#CFA56C);box-shadow:inset 0 0 0 3px #8A6534;overflow:hidden;cursor:pointer;}'
  + '.drn-edge{position:absolute;left:0;right:0;bottom:0;height:18px;background:#B48850;box-shadow:inset 0 3px 0 #8A6534;}'
  + '.drn-mark{position:absolute;top:calc(var(--drn-base) - 8px);width:calc(var(--drn-dw) + 6px);height:10px;border-radius:4px;background:rgba(110,74,35,.25);}'
  + '.drn-dom,.drn-hole{position:absolute;top:calc(var(--drn-base) - var(--drn-dh));width:var(--drn-dw);height:var(--drn-dh);}'
  + '.drn-dom,.drn-loose{padding:0;border:0;border-radius:8px;background:linear-gradient(#FFFDF6 0 calc(50% - 1.5px),#2A2A35 calc(50% - 1.5px) calc(50% + 1.5px),#FFFDF6 calc(50% + 1.5px));box-shadow:inset 0 0 0 3px var(--drn-ink),3px 3px 0 rgba(42,42,53,.25);cursor:pointer;font:inherit;touch-action:none;transform-origin:85% 100%;}'
  + '.drn-face{position:absolute;left:2px;right:2px;top:0;height:50%;display:flex;align-items:center;justify-content:center;font:800 var(--drn-syl)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--drn-ink);white-space:nowrap;letter-spacing:-.4px;}'
  + '.drn-dom i,.drn-loose i{position:absolute;left:50%;top:74%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;background:var(--drn-ink);}'
  + '.drn-dom.is-fixed{background:linear-gradient(#EADFC6 0 calc(50% - 1.5px),#2A2A35 calc(50% - 1.5px) calc(50% + 1.5px),#EADFC6 calc(50% + 1.5px));}'
  + '.drn-wpad{width:46px;height:22px;border-radius:5px;box-shadow:inset 0 0 0 2px rgba(110,74,35,.35);}'
  + '.drn-dom.is-pinned::after{content:"";position:absolute;left:50%;bottom:-8px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#C9A24E;box-shadow:inset 0 0 0 2px var(--drn-ink);}'
  + '.drn-dom.is-wobble{animation:drn-wob .4s ease-in-out;} @keyframes drn-wob{25%{rotate:-6deg;}75%{rotate:6deg;}}'
  + '.drn-dom.is-fall{animation:drn-fall .16s ease-in forwards;} .drn-dom.is-flat{z-index:3;} @keyframes drn-fall{100%{transform:rotate(82deg);}}'
  + '.drn-hole{border-radius:8px;outline:3px dashed rgba(110,74,35,.55);outline-offset:-3px;} .drn-hole.is-glow{outline-color:var(--drn-coral);animation:drn-pulse 1s ease-in-out infinite;} @keyframes drn-pulse{50%{background:rgba(242,120,75,.18);}}'
  + '.drn-fallen{position:absolute;left:0;right:0;top:calc(var(--drn-base) - var(--drn-dw));height:var(--drn-dw);}'
  + '.drn-flat{position:absolute;top:0;display:flex;align-items:center;justify-content:center;border-radius:7px;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--drn-ink),0 3px 0 rgba(42,42,53,.25);transition:left .3s ease;animation:drn-land .18s ease-out;} .drn-flat span{padding:0 18px 0 6px;text-align:center;font:800 var(--drn-syl)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--drn-ink);white-space:nowrap;letter-spacing:-.3px;} .drn-flat i{position:absolute;right:6px;top:50%;width:7px;height:7px;margin-top:-3.5px;border-radius:50%;background:var(--drn-ink);opacity:.7;} @keyframes drn-land{0%{transform:translateY(-14px) rotate(-8deg);}}'
  + '.drn-flat.is-wrong{box-shadow:inset 0 0 0 3px #A6461F,0 0 0 4px rgba(242,120,75,.4);animation:drn-wob .45s ease-in-out 2;} .drn-flat.is-wrong span{color:#A6461F;} .drn-flat.is-stay{box-shadow:inset 0 0 0 3px var(--drn-teal),0 0 0 4px rgba(20,107,94,.3);}'
  + '.drn-flat.is-crammed span{color:#A6461F;letter-spacing:-.8px;} .drn-flat.is-crammed{box-shadow:inset 0 0 0 3px #A6461F;animation:drn-wob .45s ease-in-out 2;} .drn-flat.is-blank{opacity:.7;box-shadow:inset 0 0 0 3px var(--drn-coral),0 0 0 4px rgba(242,120,75,.35);}'
  + '.drn-fallen.is-closed .drn-flat{box-shadow:inset 0 0 0 3px var(--drn-teal);}'
  + '.drn-beats{position:absolute;left:0;right:0;top:10px;display:flex;justify-content:center;gap:14px;} .drn-beat{width:22px;height:22px;border-radius:50%;background:#FFE3D4;box-shadow:inset 0 0 0 3px var(--drn-coral);animation:drn-beat 1.8s ease-in-out infinite;} @keyframes drn-beat{0%,30%,100%{transform:scale(1);background:#FFE3D4;}12%{transform:scale(1.35);background:var(--drn-coral);}}'
  + '.drn-word{position:absolute;left:50%;top:14px;transform:translateX(-50%);padding:4px 18px;border-radius:10px;background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--drn-teal);font:800 calc(var(--drn-syl) + 2px)/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--drn-ink);white-space:nowrap;animation:drn-lift .5s ease-out;} @keyframes drn-lift{0%{transform:translate(-50%,30px);opacity:0;}}'
  + '.drn-box{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px;min-height:calc(var(--drn-dh) * .8 + 14px);padding:6px 8px;border-radius:12px;background:#6B4A2B;box-shadow:inset 0 0 0 3px #4A3220,inset 0 8px 0 rgba(0,0,0,.18);} .drn-box.is-empty{min-height:0;padding:0;background:transparent;box-shadow:none;}'
  + '.drn-loose{position:relative;width:max(var(--drn-dw),calc(var(--drn-syl) * 2.6));height:calc(var(--drn-dh) * .8);} .is-count .drn-loose{width:var(--drn-dw);} .drn-loose .drn-face{font-size:calc(var(--drn-syl) * .92);} .drn-loose.is-back{animation:drn-back .45s ease-out;} @keyframes drn-back{0%{transform:translateY(-30px);}60%{transform:translateY(4px);}}'
  + '.drn-dom.is-lifting,.drn-loose.is-lifting{opacity:.35;} .drn-dom.is-drag,.drn-loose.is-drag{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));transform:none;}'
  + '.drn-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.drn-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--drn-teal);text-align:center;flex:1;} .drn-note:empty{display:none;} .drn-note.is-ok{font-weight:800;} .drn-note.is-wrong{color:#A6461F;} .is-narrow .drn-note{font-size:15px;text-align:left;}'
  + '.drn-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .drn-check[hidden]{display:none;} .drn-check:disabled{opacity:.5;}'
  + '.drn-dom:focus-visible,.drn-loose:focus-visible,.drn-check:focus-visible,.drn-pic:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.drn-wrap *{animation:none !important;transition:none !important;} .drn-dom.is-fall{transform:rotate(82deg);}}';
  var el = document.createElement('style'); el.id = 'drn-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.DominoRunActivity = DominoRunActivity;
