/* =====================================================================
   kite-tail-activity.js — ACTIVITY #45 of the one-by-one rebuild:
   "Build Words from Syllables" → THE KITE TAIL (RF.K.2.B, en).
   Design sheet: docs/activities-rebuild/designs/045-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: every picture rides a kite whose tail needs exactly one
   bow per beat, in the right order. Check is the gust: the right tail
   flies steady and lights each beat; too few bows and the last bow
   carries two beats and the kite spins; too many and a blank bow drags it
   into the grass; a wrong order knots the tail at the first bow out of
   place. Five levels: How many bows? · Tie the word (or Write it) · Fix
   the tail · The kite fence · The tassels.

   ACTIVITY LAYER ONLY: the model is kite-tail-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.KiteTailActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var KiteTailActivity = {
  id: 'kite-tail',
  apparatusClasses: ['kt-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Kite Tail'},
    instruction:   {en:'Every picture flies on a kite. Tie one bow on its tail for every beat, in the right order, and the kite will fly.'},
    check:         {en:'Check'},
    pCount:        {en:'How many bows does this kite need?'},
    pTie:          {en:'Tie the bows to build the word.'},
    pWrite:        {en:'Write each beat on its own bow.'},
    pFixA:         {en:'Find the missing beat.'},
    pFixB:         {en:'Put the bows in the right order.'},
    pFence:        {en:'Give this picture the kite that fits.'},
    pTassels:      {en:'Hang one tassel for every sound.'},
    hintCount:     {en:'Tie a bow for every beat you hear, then let the wind blow.'},
    hintTie:       {en:'Say the word slowly. Which beat comes first?'},
    hintSwap:      {en:'Swap the bows into the right order.'},
    hintTassel:    {en:'Say the beat slowly and tap + once for each sound.'},
    hintSpin:      {en:'One bow has two beats on it. Tie another bow!'},
    hintSag:       {en:'This bow has no beat. Take it off!'},
    hintBob:       {en:'Watch the kite bob: one bow for each bob.'},
    hintGlow:      {en:'The glowing bows are right. Fix the others.'},
    hintForeign:   {en:'That bow is not part of this word.'},
    hintSameWord:  {en:'That beat is in the word, but not here.'},
    hintNext:      {en:'The glowing bow comes next.'},
    hintSwapGlow:  {en:'The glowing bows are in place. Swap the others.'},
    hintAutoFix:   {en:'One bow flew to its place. Swap the others.'},
    hintFenceFew:  {en:'This kite has too few bows for that word.'},
    hintFenceMany: {en:'This kite has too many bows for that word.'},
    hintNoTassel:  {en:'A sound has no tassel.'},
    hintNoSound:   {en:'A tassel has no sound.'},
    hintSpell:     {en:'Use the letters of {word}, in order.'},
    hintDouble:    {en:'Split between the two {c}’s: {a} | {b}.'},
    hintCompound:  {en:'Split between the two small words: {a} | {b}.'},
    hintSlow:      {en:'Say it slowly: {a} … {b}.'},
    okCount:       {en:'{Word} has {n} beats: {parts}!'},
    okCountOne:    {en:'{Word} has one beat!'},
    okTie:         {en:'{plus} = {word}!'},
    okWrite:       {en:'{word} = {dash}!'},
    okFence:       {en:'{word}: {n} beats!'},
    okFenceOne:    {en:'{word}: one beat!'},
    okTassels:     {en:'{tass}'},
    tassOne:       {en:'{s}: {k} sounds.'},
    tassOne1:      {en:'{s}: 1 sound.'},
    setLevel:      {en:'Level'},
    lvCount:       {en:'How many bows?'},
    lvTie:         {en:'Tie the word'},
    lvFix:         {en:'Fix the tail'},
    lvFence:       {en:'The kite fence'},
    lvTassels:     {en:'The tassels'},
    setBows:       {en:'Bows'},
    optPick:       {en:'Pick'},
    optWrite:      {en:'Write'},
    setCards:      {en:'Cards'},
    optPictures:   {en:'Pictures'},
    optWords:      {en:'Word cards'},
    setKites:      {en:'Kites'},
    opt123:        {en:'One, two, or three'},
    opt23:         {en:'Two or three'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it'},
    ariaTail:      {en:'Kite tail, bows: {n}'},
    ariaBow:       {en:'Bow {i}: {s}'},
    ariaEmpty:     {en:'empty'},
    ariaSpare:     {en:'Tie another bow'},
    ariaBoxBow:    {en:'Bow {s}'},
    ariaFence:     {en:'Kite with bows: {n}'},
    ariaErase:     {en:'Erase'},
    ariaFlying:    {en:'The kite is flying'},
    ariaHook:      {en:'Hang a tassel under bow {i}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'count', bows: 'pick', cards: 'pictures', kites: '123' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'count', labelKey: 'lvCount' }, { value: 'tie', labelKey: 'lvTie' }, { value: 'fix', labelKey: 'lvFix' }, { value: 'fence', labelKey: 'lvFence' }, { value: 'tassels', labelKey: 'lvTassels' }] },
    { key: 'bows', type: 'choice', labelKey: 'setBows', options: [{ value: 'pick', labelKey: 'optPick' }, { value: 'write', labelKey: 'optWrite' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: 'pictures', labelKey: 'optPictures' }, { value: 'words', labelKey: 'optWords' }] },
    { key: 'kites', type: 'choice', labelKey: 'setKites', options: [{ value: '123', labelKey: 'opt123' }, { value: '23', labelKey: 'opt23' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._sel = null; this._focusKnot = 0; this._flight = null;
    this._line = []; this._fence = {}; this._fencePass = -1;
    injectKiteTailCSS();
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
  _pic: function (p) { var s = p.split('/'); return '/image-library-webp/themes/' + encodeURIComponent(s[0]) + '/' + s[1] + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _lv: function () { return KiteTailCore.level(this._set('level')); },
  /* the pool depends on the level, the Write setting (tie) and the number of kites (fence) */
  _key: function () { var lv = this._lv(); return lv + (lv === 'tie' ? '/' + this._set('bows') : '') + (lv === 'fence' ? '/' + this._set('kites') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: rate || 0.9 }); } catch (e) {} },
  _cap: function (s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = KiteTailCore.rounds(this._lv(), { kites: this._set('kites') }); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = KiteTailCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, beats = w.syl.length, write = r.level === 'tie' && this._set('bows') === 'write';
    var args = { word: w.word, Word: this._cap(w.word), n: beats, parts: w.syl.join(' · '), plus: w.syl.join(' + '), dash: w.syl.join('-') };
    if (r.level === 'tassels') args.tass = r.sounds.map(function (g, i) { return self._t(g.length === 1 ? 'tassOne1' : 'tassOne', { s: w.syl[i], k: g.length }); }).join(' ');
    var pk = { count: 'pCount', tie: write ? 'pWrite' : 'pTie', fix: r.t === 'b' ? 'pFixB' : 'pFixA', fence: 'pFence', tassels: 'pTassels' }[r.level];
    var ck = r.level === 'count' ? (beats === 1 ? 'okCountOne' : 'okCount') : r.level === 'fence' ? (beats === 1 ? 'okFenceOne' : 'okFence') : r.level === 'tassels' ? 'okTassels' : write ? 'okWrite' : 'okTie';
    return {
      id: 'kite-tail.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool._focusKnot = 0; tool._flight = null;
        if (r.level === 'fence' && tool._fencePass !== pss) { tool._fence = {}; tool._fencePass = pss; }
        tool.st = C.newState(r, pss, { write: write }); tool._args = args; tool._ck = ck;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = KiteTailCore.newState(KiteTailCore.rounds('count')[2], 0); this._args = {}; this._ck = 'okCount'; }
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
    var api = this.api, self = this, st = this.st, r = st.r;
    api.stage.innerHTML = '';
    var L = this._L = KiteTailCore.layout(this._width());
    var wrap = api.el('div', 'kt-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.level + (st.write ? ' is-write' : '')); this._wrap = wrap;
    wrap.tabIndex = -1;
    wrap.style.setProperty('--kt-pic', L.pic + 'px'); wrap.style.setProperty('--kt-bw', L.bowW + 'px'); wrap.style.setProperty('--kt-bh', L.bowH + 'px'); wrap.style.setProperty('--kt-syl', L.syl + 'px'); wrap.style.setProperty('--kt-card', L.cardPic + 'px');
    var line = api.el('div', 'kt-line'); line.setAttribute('aria-hidden', 'true'); this._lineEl = line; wrap.appendChild(line);
    var main = api.el('div', 'kt-main'); this._main = main; wrap.appendChild(main);
    var box = api.el('div', 'kt-box'); this._box = box; wrap.appendChild(box);
    var keys = api.el('div', 'kt-keys'); this._keys = keys; wrap.appendChild(keys);
    var note = api.el('div', 'kt-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'kt-ask'); ask.appendChild(note);
    var chk = api.el('button', 'kt-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._gust(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* every repaint rebuilds the controls: put the keyboard focus back on the same control (or the wrapper, which carries the key handler) */
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0], at = ['data-k', 'data-id', 'data-kite', 'data-hook'].filter(function (x) { return a.hasAttribute(x); })[0]; sel = '.' + cls + (at ? '[' + at + '="' + a.getAttribute(at) + '"]' : ''); if (cls === 'kt-key') sel = null; }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || (a && a.classList && a.classList.contains('kt-key') && this._wrap.querySelector('.kt-key')) || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._main) return;
    var st = this.st, r = st.r, C = KiteTailCore;
    this._paintLine();
    if (r.level === 'fence') this._paintFence(); else this._paintSky();
    this._paintBox(); this._paintKeys();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) msg = this._t(h, this._hintArgs());
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done || r.level === 'fence'; this._checkBtn.disabled = !!this._busy;
  },
  _hintArgs: function () { var L = this.st.last || {}; return { a: L.a, b: L.b, c: L.c, word: this.st.r.w.word }; },
  _paintLine: function () {
    var el = this._lineEl, self = this; el.innerHTML = ''; el.hidden = !this._line.length;
    this._line.forEach(function (w) { var t = self.api.el('span', 'kt-token'); t.innerHTML = '<svg viewBox="0 0 24 28"><path d="M12 1 L23 13 L12 27 L1 13 Z" fill="#FBF3E4" stroke="#2A2A35" stroke-width="2"/><path d="M12 1 V27 M1 13 H23" stroke="#F2784B" stroke-width="2"/></svg><span>' + w + '</span>'; el.appendChild(t); });
  },
  _kiteSVG: function () { return '<svg class="kt-sail" viewBox="0 0 150 180" aria-hidden="true"><path d="M75 4 L146 82 L75 176 L4 82 Z" fill="#FBF3E4" stroke="#2A2A35" stroke-width="4" stroke-linejoin="round"/><path d="M75 4 V176 M4 82 H146" stroke="#F2784B" stroke-width="5"/></svg>'; },

  /* ---- the sky: kite + tail (count, tie, fix, tassels) ---- */
  _paintSky: function () {
    var self = this, st = this.st, r = st.r, C = KiteTailCore, main = this._main, L = st.last || {}, show = st.show && !st.done;
    main.innerHTML = '';
    var sky = this.api.el('div', 'kt-sky'); main.appendChild(sky);
    sky.insertAdjacentHTML('beforeend', '<span class="kt-cloud is-a" aria-hidden="true"></span><span class="kt-cloud is-b" aria-hidden="true"></span><span class="kt-grass" aria-hidden="true"></span>');
    var flight = st.done ? 'steady' : (show && /spin|sag|tangle|lopsided/.test(this._flightOf(L)) ? this._flightOf(L) : '');
    var kite = this.api.el('button', 'kt-kite' + (flight && !this.FAST ? ' is-' + flight : '') + (st.done ? ' is-up' : '')); kite.type = 'button';
    kite.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    kite.innerHTML = this._kiteSVG() + '<img class="kt-pic" alt="" draggable="false" src="' + this._pic(r.w.pic) + '">';
    kite.addEventListener('click', function () { self._say(r.w.word); });
    sky.appendChild(kite);
    var tail = this.api.el('div', 'kt-tail' + (flight === 'sag' ? ' is-sag' : '')); this._tail = tail; sky.appendChild(tail);
    tail.setAttribute('aria-label', this._t('ariaTail', { n: this._bowCount() }));
    var bows = this._tailModel();
    bows.forEach(function (b, i) {
      var el = self.api.el('button', 'kt-knot' + (b.cls ? ' ' + b.cls : '')); el.type = 'button'; el.setAttribute('data-k', i);
      el.setAttribute('aria-label', self._t('ariaBow', { i: i + 1, s: b.text || self._t('ariaEmpty') }));
      /* a typed piece can be long: its text is sized to fit the bow */
      var fit = b.text && b.text.length > 3 ? ' style="font-size:' + Math.max(12, Math.min(self._L.syl, Math.floor((self._L.bowW - 8) / (b.text.length * 0.6)))) + 'px"' : '';
      el.innerHTML = b.open ? '<span class="kt-loopopen"></span>' : '<span class="kt-bow"><i class="kt-l"></i><i class="kt-r"></i><span class="kt-tag"' + fit + '>' + (b.text || '') + '</span></span>';
      if (b.tassels != null) el.insertAdjacentHTML('beforeend', self._tasselHTML(i, b));
      self._bindKnot(el, i, b);
      tail.appendChild(el);
    });
    /* help 2 on count: ghost bows at the right knots, the kite bobs once per beat */
    if (r.level === 'count' && show && st.help >= 2) { var g = this.api.el('div', 'kt-ghosts'); g.setAttribute('aria-hidden', 'true'); for (var i = 0; i < r.w.syl.length; i++) { var gi = this.api.el('i', 'kt-ghost'); gi.textContent = r.w.syl[i]; gi.style.animationDelay = (i * 500) + 'ms'; g.appendChild(gi); } sky.appendChild(g); }
    if (st.done) { var word = this.api.el('div', 'kt-word'); word.textContent = r.w.word; sky.appendChild(word); }
  },
  _flightOf: function (L) { var R = L.result; return R === 'spin' || R === 'sag' ? R : R === 'tangle' || R === 'foreign' || R === 'sameword' || R === 'split' || R === 'spell' ? 'tangle' : R === 'missing' || R === 'extra' ? 'lopsided' : ''; },
  _bowCount: function () { var st = this.st, r = st.r; return r.level === 'count' ? st.bows : r.w.syl.length; },
  /* what each knot of the tail shows */
  _tailModel: function () {
    var st = this.st, r = st.r, C = KiteTailCore, L = st.last || {}, show = st.show && !st.done, out = [], i;
    if (r.level === 'count') {
      var printed = st.done ? r.w.syl.map(function (s) { return [s]; }) : show && L.printed ? L.printed : null;
      for (i = 0; i < st.bows; i++) { var p = printed ? printed[i] : null; out.push({ text: p ? p.join('·') : '', cls: p && !p.length ? 'is-blank' : p && p.length > 1 ? 'is-double' : '' }); }
      return out;
    }
    if (r.level === 'tassels') return r.w.syl.map(function (s, i) { return { text: s, tassels: st.tassels[i] }; });
    if (r.level === 'fix' && r.t === 'b') {
      var rightB = show && L.right ? L.right : null;
      return st.order.map(function (s, i) { return { text: r.w.syl[s], cls: (st.done || (rightB && rightB[i]) ? 'is-right' : rightB && i >= L.tangleAt ? 'is-crooked' : '') + (this._sel === i ? ' is-sel' : '') + (L.autoFixed === i && show ? ' is-auto' : '') }; }, this);
    }
    if (st.write) return st.typed.map(function (t, i) { return { text: t, cls: 'is-write' + (this._focusKnot === i && !st.done ? ' is-focus' : '') + (st.done ? ' is-right' : '') }; }, this);
    var right = show && L.right ? L.right : null;
    return st.knots.map(function (x, i) {
      if (!x) return { open: true, cls: 'is-open' + (this._sel ? ' is-armed' : '') };
      var text = String(x).indexOf('fixed') === 0 ? r.w.syl[+String(x).slice(5)] : C.bow(st, x).text;
      return { text: text, cls: (String(x).indexOf('fixed') === 0 ? 'is-fixed ' : '') + (st.done || (right && right[i]) ? 'is-right' : right && i >= L.tangleAt ? 'is-crooked' : '') };
    }, this);
  },
  _tasselHTML: function (i, b) {
    var st = this.st, r = st.r, L = st.last || {}, show = st.show && !st.done, per = show && L.per ? L.per[i] : null, g = r.sounds[i], h = '<span class="kt-rail" data-rail="' + i + '">';
    var lit = st.done || (show && st.help >= 2);
    for (var t = 0; t < b.tassels; t++) h += '<span class="kt-tassel' + (per && per.extra && t >= g.length ? ' is-bare' : '') + '" data-t="' + i + '">' + (lit && g[t] ? '<b>' + g[t] + '</b>' : '') + '</span>';
    /* miss 1: the missing sounds glow empty; miss 2 shows them as lettered outlines instead (never both) */
    if (per && per.missing && st.help < 2) for (var m = 0; m < per.missing; m++) h += '<span class="kt-tassel is-missing"></span>';
    if (show && st.help >= 2) for (var o = b.tassels; o < g.length; o++) h += '<span class="kt-tassel is-outline"><b>' + g[o] + '</b></span>';
    /* a dedicated hook adds a tassel: tapping the rail itself would mostly land on a tassel, which takes one off */
    if (!st.done) h += '<span class="kt-hook" data-hook="' + i + '" role="button" aria-label="' + this._t('ariaHook', { i: i + 1 }) + '">+</span>';
    return h + '</span>';
  },
  _paintBox: function () {
    var self = this, st = this.st, r = st.r, C = KiteTailCore, box = this._box;
    box.innerHTML = '';
    var has = r.level === 'count' || (st.bowsAll && !st.write);
    box.hidden = !has || (st.done && r.level !== 'count');
    if (!has) return;
    if (r.level === 'count') {
      var spare = this.api.el('button', 'kt-spare'); spare.type = 'button'; spare.setAttribute('aria-label', this._t('ariaSpare'));
      spare.innerHTML = '<span class="kt-bow"><i class="kt-l"></i><i class="kt-r"></i><span class="kt-tag">+</span></span>';
      spare.disabled = st.done || st.bows >= C.MAX_BOWS;
      spare.addEventListener('click', function () { self._tie(); });
      box.appendChild(spare);
      return;
    }
    var glow = C.nextBow(st);
    st.box.forEach(function (id) {
      var b = C.bow(st, id), el = self.api.el('button', 'kt-boxbow' + (self._sel === id ? ' is-sel' : '') + (glow === id ? ' is-glow' : '')); el.type = 'button'; el.setAttribute('data-id', id);
      el.setAttribute('aria-label', self._t('ariaBoxBow', { s: b.text }));
      el.innerHTML = '<span class="kt-bow"><i class="kt-l"></i><i class="kt-r"></i><span class="kt-tag">' + b.text + '</span></span>';
      self._bindBoxBow(el, id);
      box.appendChild(el);
    });
  },
  _paintKeys: function () {
    var self = this, st = this.st, keys = this._keys;
    keys.innerHTML = '';
    keys.hidden = !st.write || st.done;
    if (keys.hidden) return;
    'abcdefghijklmnopqrstuvwxyz'.split('').concat(['⌫']).forEach(function (ch) {
      var b = self.api.el('button', 'kt-key' + (ch === '⌫' ? ' is-back' : '')); b.type = 'button'; b.textContent = ch; b.setAttribute('aria-label', ch === '⌫' ? self._t('ariaErase') : ch);
      b.addEventListener('click', function () { self._typeKey(ch === '⌫' ? 'Backspace' : ch); });
      keys.appendChild(b);
    });
  },
  /* ---- the fence (sort) ---- */
  _paintFence: function () {
    var self = this, st = this.st, r = st.r, main = this._main, L = st.last || {}, show = st.show && !st.done;
    main.innerHTML = '';
    var fence = this.api.el('div', 'kt-fence'); main.appendChild(fence);
    r.kites.forEach(function (bows, k) {
      var col = self.api.el('button', 'kt-fkite' + (show && L.kite === k && !self.FAST ? ' is-' + L.result : '') + (st.done && L.kite === k ? ' is-up' : '')); col.type = 'button'; col.setAttribute('data-kite', k);
      col.setAttribute('aria-label', self._t('ariaFence', { n: bows }));
      var got = self._fence[k] || [];
      var last = got.length ? KiteTailCore.word(got[got.length - 1]) : null;
      var printed = show && L.kite === k ? L.printed : null;
      var h = '<span class="kt-fsail">' + self._kiteSVG() + (last ? '<img class="kt-fpic" alt="" draggable="false" src="' + self._pic(last.pic) + '">' : '') + (got.length > 1 ? '<em class="kt-fcount">' + got.length + '</em>' : '') + '</span><span class="kt-ftail">';
      for (var i = 0; i < bows; i++) { var p = printed ? printed[i] : null; h += '<span class="kt-fbow' + (p && !p.length ? ' is-blank' : p && p.length > 1 ? ' is-double' : '') + '"><i class="kt-l"></i><i class="kt-r"></i><span class="kt-tag">' + (p ? p.join('·') : '') + '</span></span>'; }
      col.innerHTML = h + '</span>';
      col.addEventListener('click', function () { self._tryCard(k); });
      fence.appendChild(col);
    });
    if (!st.done) {
      var card = this.api.el('div', 'kt-card'); card.setAttribute('role', 'img'); card.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
      var dots = st.help >= 2 && Object.keys(st.tries).some(function (k) { return st.tries[k] >= 1; }) && st.misses >= 2;
      card.innerHTML = '<img class="kt-cpic" alt="" draggable="false" src="' + this._pic(r.w.pic) + '">' + (this._set('cards') === 'words' ? '<span class="kt-cword">' + r.w.word + '</span>' : '') + (dots ? '<span class="kt-dots">' + r.w.syl.map(function () { return '<i></i>'; }).join('') + '</span>' : '');
      this._bindCard(card);
      main.appendChild(card);
    } else { var wd = this.api.el('div', 'kt-word kt-fword'); wd.textContent = r.w.word; main.appendChild(wd); }
  },

  /* ---- the hand ---- */
  _tie: function () { if (this._busy) return; if (KiteTailCore.tie(this.st)) { this.api.sound(700); this._paint(); } },
  _bindKnot: function (el, i, b) {
    var self = this, st = this.st, r = st.r;
    el.addEventListener('click', function (ev) {
      if (self._busy || st.done) return;
      if (ev.target.closest('.kt-rail')) return;
      if (r.level === 'count') { if (KiteTailCore.untie(st)) { self.api.sound(400); self._paint(); } return; }
      if (r.level === 'tassels') { self._say(r.w.syl[i]); return; }
      if (st.write) { self._focusKnot = i; self._paint(); self._say(st.typed[i]); return; }
      if (r.level === 'fix' && r.t === 'b') {
        if (self._sel === null) { self._sel = i; self._say(r.w.syl[st.order[i]]); self._paint(); }
        else { var a = self._sel; self._sel = null; if (KiteTailCore.swap(st, a, i)) self.api.sound(600); self._paint(); }
        return;
      }
      if (self._sel) { var s = self._sel; self._sel = null; self._tieBow(s, i); return; }
      if (st.knots[i]) { if (KiteTailCore.untieBow(st, i)) { self.api.sound(400); self._paint(); } }
    });
    if (r.level === 'tassels') {
      el.addEventListener('click', function (ev) {
        if (self._busy || st.done) return;
        var t = ev.target.closest('.kt-tassel:not(.is-missing):not(.is-outline)'), rail = ev.target.closest('.kt-hook') || ev.target.closest('.kt-rail');
        if (t) { if (KiteTailCore.tassel(st, i, -1)) { self.api.sound(400); self._paint(); } }
        else if (rail) { if (KiteTailCore.tassel(st, i, +1)) { self.api.sound(500 + st.tassels[i] * 60); self._paint(); } }
      });
    }
    /* a tied bow can be dragged onto another knot (tie) or another bow (fix b: swap) */
    if ((r.level === 'tie' && !st.write) || (r.level === 'fix' && r.t === 'b') || (r.level === 'fix' && i === r.bare)) this._bindDrag(el, function (x, y) {
      var k = self._knotAt(x, y);
      if (r.level === 'fix' && r.t === 'b') { if (k >= 0 && KiteTailCore.swap(st, i, k)) self.api.sound(600); self._paint(); return; }
      var id = st.knots[i]; if (!id) { self._paint(); return; }
      if (k >= 0) self._tieBow(id, k); else if (self._overBox(x, y)) { KiteTailCore.untieBow(st, i); self._paint(); } else self._paint();
    });
  },
  _bindBoxBow: function (el, id) {
    var self = this, st = this.st, r = st.r;
    el.addEventListener('click', function (ev) {
      if (ev.detail === 0 || !self._dragged) { if (self._busy || st.done) return; var b = KiteTailCore.bow(st, id); self._say(b.text);
        var k = r.level === 'fix' ? r.bare : KiteTailCore.firstFree(st);
        if (k >= 0 && !st.knots[k]) self._tieBow(id, k); else { self._sel = self._sel === id ? null : id; self._paint(); } }
      self._dragged = false;
    });
    this._bindDrag(el, function (x, y) { var k = self._knotAt(x, y); if (k >= 0) self._tieBow(id, k); else self._paint(); });
  },
  _bindCard: function (el) {
    var self = this;
    this._bindDrag(el, function (x, y) { var k = self._kiteAt(x, y); if (k >= 0) self._tryCard(k); else self._paint(); });
  },
  /* drag with a ghost; a plain tap falls through to click */
  _bindDrag: function (el, drop) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = el.cloneNode(true); ghost.className = el.className + ' kt-dragging'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - el.offsetHeight / 2) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove(); el.classList.remove('is-lifted');
        if (moved) { drop(e.clientX, e.clientY); setTimeout(function () { self._dragged = false; }, 0); }
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _knotAt: function (x, y) { var ks = this._tail ? this._tail.querySelectorAll('.kt-knot') : []; for (var i = 0; i < ks.length; i++) { var b = ks[i].getBoundingClientRect(); if (x >= b.left - 6 && x <= b.right + 6 && y >= b.top - 14 && y <= b.bottom + 14) return +ks[i].getAttribute('data-k'); } return -1; },
  _kiteAt: function (x, y) { var ks = this._main.querySelectorAll('.kt-fkite'); for (var i = 0; i < ks.length; i++) { var b = ks[i].getBoundingClientRect(); if (x >= b.left && x <= b.right && y >= b.top - 10 && y <= b.bottom + 10) return +ks[i].getAttribute('data-kite'); } return -1; },
  _overBox: function (x, y) { var b = this._box.getBoundingClientRect(); return !this._box.hidden && y >= b.top - 10 && y <= b.bottom + 10; },
  _tieBow: function (id, k) { if (KiteTailCore.tieBow(this.st, id, k)) { this.api.sound(650); this._paint(); var nx = this._box.querySelector('.kt-boxbow'); if (nx && this._wrap.contains(document.activeElement)) nx.focus(); } else this._paint(); },
  _tryCard: function (k) {
    if (this._busy || this.st.done) return;
    var self = this, res = KiteTailCore.tryCard(this.st, k); if (!res) return;
    if (res.result === 'fit') return this._win(k);
    this.api.sound(196); this._paint();
    if (!this.FAST) this._later(function () { if (!self.st.done) self._paint(); }, 900);
  },
  _typeKey: function (ch) {
    var st = this.st; if (!st.write || st.done || this._busy) return;
    var i = this._focusKnot, cur = st.typed[i] || '';
    if (ch === 'Backspace') { if (!cur && i > 0) { this._focusKnot = i - 1; this._paint(); return; } KiteTailCore.type(st, i, cur.slice(0, -1)); }
    else KiteTailCore.type(st, i, cur + ch);
    this.api.sound(560); this._paint();
  },
  _onKey: function (ev) {
    var st = this.st, r = st.r, k = ev.key; if (st.done || this._busy || ev.defaultPrevented) return;
    if (r.level === 'count') { if (k === '+' || k === '=') { ev.preventDefault(); this._tie(); } else if (k === '-') { ev.preventDefault(); if (KiteTailCore.untie(st)) this._paint(); } return; }
    if (st.write) {
      if (/^[a-z]$/i.test(k)) { ev.preventDefault(); this._typeKey(k.toLowerCase()); }
      else if (k === 'Backspace') { ev.preventDefault(); this._typeKey('Backspace'); }
      else if (k === 'ArrowRight' || k === 'ArrowLeft') { ev.preventDefault(); this._focusKnot = Math.max(0, Math.min(st.typed.length - 1, this._focusKnot + (k === 'ArrowRight' ? 1 : -1))); this._paint(); }
      return;
    }
    if (k === 'Backspace' && st.knots) { ev.preventDefault(); for (var i = st.knots.length - 1; i >= 0; i--) if (st.knots[i] && String(st.knots[i]).indexOf('fixed') !== 0) { KiteTailCore.untieBow(st, i); this._paint(); break; } }
  },
  _gust: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, res = KiteTailCore.gust(st);
    if (res.flight === 'steady') return this._win(-1);
    this.api.sound(res.flight === 'none' ? 460 : 196);
    if (st.help >= 2 && st.r.level === 'count') this._say(st.r.w.syl.join(' … '), 0.7);
    this._paint();
    void self;
  },
  _win: function (kite) {
    var self = this, st = this.st, r = st.r;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._say(r.w.syl.join(' … ') + ' … ' + r.w.word, 0.85);
    if (kite >= 0) (this._fence[kite] = this._fence[kite] || []).push(r.w.key);
    this._line.push(r.w.word); if (this._line.length > 10) this._line.shift();
    this.api.announce(this._t('ariaFlying'));
    this._paint();
    this._busy = true;
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var ktCssDone = false;
function injectKiteTailCSS() {
  if (ktCssDone || typeof document === 'undefined') return;
  ktCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.kt-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--kt-ink:#2A2A35;--kt-teal:#146B5E;--kt-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.kt-main{display:flex;flex-direction:column;align-items:stretch;gap:10px;}'
  + '.kt-line{display:flex;gap:10px;overflow-x:auto;padding:2px 4px;border-top:2px solid #8A939B;min-height:30px;} .kt-line[hidden]{display:none;} .kt-token{display:flex;align-items:center;gap:4px;font:800 14px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);white-space:nowrap;} .kt-token svg{width:20px;height:24px;}'
  + '@media (max-width:339px){.kt-line{display:none;}}'
  + '.kt-sky{position:relative;min-height:calc(var(--kt-pic) + 150px);padding:10px 10px 46px;border-radius:16px;background:linear-gradient(#DCEFF5,#EAF6FA);box-shadow:inset 0 0 0 3px #9CC6D6;overflow:hidden;display:flex;align-items:flex-start;gap:6px;}'
  + '.kt-cloud{position:absolute;top:12px;right:24px;width:70px;height:26px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px var(--kt-ink);} .kt-cloud::before{content:"";position:absolute;left:14px;top:-12px;width:32px;height:28px;border-radius:50%;background:#fff;box-shadow:inset 0 3px 0 0 var(--kt-ink),inset 3px 0 0 0 var(--kt-ink),inset -3px 0 0 0 var(--kt-ink);clip-path:inset(0 0 45% 0);} .kt-cloud.is-b{top:44px;right:120px;transform:scale(.7);}'
  + '.kt-grass{position:absolute;left:0;right:0;bottom:0;height:34px;background:#CFE8B8;border-top:3px solid var(--kt-ink);}'
  + '.kt-kite{position:relative;flex:none;width:calc(var(--kt-pic) * 1.34);height:calc(var(--kt-pic) * 1.6);padding:0;border:0;background:none;cursor:pointer;z-index:2;transition:transform .5s ease;} .kt-sail{position:absolute;inset:0;width:100%;height:100%;} .kt-pic{position:absolute;left:50%;top:46%;width:var(--kt-pic);height:var(--kt-pic);transform:translate(-50%,-50%);object-fit:contain;}'
  + '.kt-kite.is-spin{animation:kt-spin .9s ease-in-out;} @keyframes kt-spin{40%{transform:rotate(330deg) translateY(10px);}80%{transform:rotate(700deg) translateY(30px);}100%{transform:rotate(720deg) translateY(20px);}}'
  + '.kt-kite.is-sag{animation:kt-sag .9s ease-in-out forwards;} @keyframes kt-sag{100%{transform:translateY(34px) rotate(12deg);}}'
  + '.kt-kite.is-tangle{animation:kt-tilt .6s ease-in-out 2;} @keyframes kt-tilt{50%{transform:rotate(-14deg);}} .kt-kite.is-lopsided{transform:rotate(-10deg);}'
  + '.kt-kite.is-up{animation:kt-up 1.2s ease-out forwards;} @keyframes kt-up{60%{transform:translateY(-14px);}100%{transform:translateY(-6px);}}'
  + '.kt-tail{position:relative;flex:1;min-width:0;display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px 4px;padding-top:calc(var(--kt-pic) * .9);z-index:1;} .kt-tail::before{content:"";position:absolute;left:-12px;right:8px;top:calc(var(--kt-pic) * .9 + var(--kt-bh) / 2);height:3px;background:var(--kt-coral);border-radius:2px;} .kt-tail.is-sag{transform:translateY(18px);transition:transform .5s ease;}'
  + '.kt-knot{position:relative;display:flex;flex-direction:column;align-items:center;min-width:var(--kt-bw);padding:0;border:0;background:none;cursor:pointer;font:inherit;}'
  + '.kt-bow{position:relative;display:flex;align-items:center;justify-content:center;width:var(--kt-bw);height:var(--kt-bh);} .kt-l,.kt-r{position:absolute;top:10%;width:38%;height:80%;border-radius:50% 40% 40% 50%;background:var(--kt-teal);box-shadow:inset 0 0 0 3px #0B4A40;} .kt-l{left:0;transform:rotate(-12deg);} .kt-r{right:0;transform:scaleX(-1) rotate(-12deg);}'
  + '.kt-tag{position:relative;min-width:66%;height:72%;padding:0 4px;border-radius:8px;background:#FBF3E4;box-shadow:inset 0 0 0 3px var(--kt-ink);display:flex;align-items:center;justify-content:center;font:800 var(--kt-syl)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);white-space:nowrap;}'
  + '.kt-loopopen{display:block;width:var(--kt-bw);height:var(--kt-bh);border-radius:14px;outline:3px dashed #8A939B;outline-offset:-6px;background:rgba(255,255,255,.4);} .kt-knot.is-armed .kt-loopopen{outline-color:var(--kt-teal);background:#E2F2EE;animation:kt-arm 1.2s ease-in-out infinite;} @keyframes kt-arm{50%{background:#C6E8DF;}}'
  + '.kt-knot.is-blank .kt-tag{background:#E7E3DA;} .kt-knot.is-blank .kt-l,.kt-knot.is-blank .kt-r{background:#9AA3AB;box-shadow:inset 0 0 0 3px #6E777F;} .kt-knot.is-double .kt-tag{box-shadow:inset 0 0 0 3px #A6461F;font-size:calc(var(--kt-syl) * .78);}'
  + '.kt-knot.is-right .kt-tag{background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--kt-teal);} .kt-knot.is-crooked{transform:rotate(14deg) translateY(6px);} .kt-knot.is-crooked .kt-tag{box-shadow:inset 0 0 0 3px #A6461F;} .kt-knot.is-fixed .kt-l,.kt-knot.is-fixed .kt-r{background:#5E8F86;}'
  + '.kt-knot.is-sel .kt-tag{box-shadow:inset 0 0 0 4px var(--kt-coral);transform:translateY(-4px);} .kt-knot.is-auto{animation:kt-auto .6s ease-out;} @keyframes kt-auto{0%{transform:translateY(-14px);}}'
  + '.kt-knot.is-write .kt-tag{min-width:80%;} .kt-knot.is-focus .kt-tag{box-shadow:inset 0 0 0 4px var(--kt-coral);}'
  + '.kt-ghosts{position:absolute;left:10px;right:10px;bottom:38px;display:flex;gap:8px;justify-content:center;} .kt-ghost{padding:2px 8px;border-radius:8px;outline:3px dashed var(--kt-coral);font:800 15px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:#A6461F;font-style:normal;animation:kt-gp 1.5s ease-in-out infinite;} @keyframes kt-gp{0%,100%{opacity:.35;}30%{opacity:1;}}'
  + '.kt-word{position:absolute;left:0;right:0;bottom:4px;text-align:center;font:800 22px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);z-index:3;}'
  + '.kt-rail{display:flex;gap:4px;justify-content:center;min-width:var(--kt-bw);min-height:48px;padding:4px 6px;margin-top:4px;border-radius:8px;background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 2px #9CC6D6;cursor:copy;} .kt-tassel{position:relative;width:12px;height:40px;border-radius:3px 3px 6px 6px;background:linear-gradient(#F59A73,#F2784B);box-shadow:inset 0 0 0 2px #A6461F;cursor:pointer;} .kt-tassel b{position:absolute;left:50%;top:44px;transform:translateX(-50%);font:800 14px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);white-space:nowrap;} .kt-tassel.is-bare{opacity:.45;} .kt-tassel.is-missing{background:none;box-shadow:inset 0 0 0 2px #E0662F;animation:kt-gp 1s ease-in-out infinite;} .kt-tassel.is-outline{background:none;box-shadow:inset 0 0 0 2px dashed #8A939B;outline:2px dashed #8A939B;outline-offset:-2px;}'
  + '.kt-hook{flex:none;width:44px;height:44px;margin-left:4px;border-radius:22px;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--kt-coral);display:flex;align-items:center;justify-content:center;font:800 24px/1 var(--lcs-font-body,Nunito,sans-serif);color:#A6461F;cursor:pointer;}'
  + '.is-tassels .kt-tail{gap:8px 14px;} .is-tassels .kt-knot{padding-bottom:20px;}'
  + '.kt-box{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:calc(var(--kt-bh) + 20px);padding:10px;border-radius:12px;background:#E9C99A;box-shadow:inset 0 0 0 3px #8C5A2A,0 3px 0 #A06A33;} .kt-box[hidden]{display:none;}'
  + '.kt-boxbow,.kt-spare{padding:0;border:0;background:none;cursor:grab;touch-action:none;min-height:48px;display:flex;align-items:center;} .kt-boxbow.is-sel .kt-tag{box-shadow:inset 0 0 0 4px var(--kt-coral);} .kt-boxbow.is-glow .kt-tag{animation:kt-gp 1s ease-in-out infinite;box-shadow:inset 0 0 0 4px #F2C14B;} .kt-boxbow.is-lifted{opacity:.35;} .kt-spare:disabled{opacity:.45;cursor:default;} .kt-spare .kt-tag{font-size:calc(var(--kt-syl) + 6px);}'
  + '.kt-keys{display:grid;grid-template-columns:repeat(9,minmax(44px,1fr));gap:6px;} .kt-keys[hidden]{display:none;} .is-narrow .kt-keys{grid-template-columns:repeat(6,minmax(44px,1fr));} .kt-key{min-height:46px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B897,0 2px 0 #C9B897;font:800 20px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);cursor:pointer;} .kt-key.is-back{background:#F4E2C0;}'
  + '.kt-fence{position:relative;display:flex;gap:10px;justify-content:space-around;padding:10px 6px 40px;border-radius:16px;background:linear-gradient(#DCEFF5,#EAF6FA);box-shadow:inset 0 0 0 3px #9CC6D6;overflow:hidden;} .kt-fence::after{content:"";position:absolute;left:0;right:0;bottom:0;height:28px;background:#CFE8B8;border-top:3px solid var(--kt-ink);}'
  + '.kt-fkite{position:relative;z-index:1;flex:1 1 0;min-width:0;max-width:200px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px;border:0;border-radius:12px;background:none;cursor:pointer;font:inherit;} .kt-fkite:hover{background:rgba(255,255,255,.35);}'
  + '.kt-fsail{position:relative;width:100px;height:116px;} .kt-fsail .kt-sail{width:100%;height:100%;} .kt-fpic{position:absolute;left:50%;top:46%;width:62px;height:62px;transform:translate(-50%,-50%);object-fit:contain;} .kt-fcount{position:absolute;right:-4px;top:-4px;min-width:24px;height:24px;border-radius:12px;background:var(--kt-teal);color:#fff;font:800 14px/24px var(--lcs-font-body,Nunito,sans-serif);font-style:normal;text-align:center;}'
  + '.kt-ftail{display:flex;flex-direction:column;gap:2px;align-items:center;} .kt-fbow{position:relative;display:flex;align-items:center;justify-content:center;width:58px;height:36px;} .kt-fbow .kt-tag{font-size:13px;min-width:60%;} .kt-fbow.is-blank .kt-tag{background:#E7E3DA;} .kt-fbow.is-double .kt-tag{box-shadow:inset 0 0 0 3px #A6461F;font-size:11px;}'
  + '.kt-fkite.is-spin .kt-fsail{animation:kt-spin .9s ease-in-out;} .kt-fkite.is-sag .kt-fsail{animation:kt-sag .9s ease-in-out;} .kt-fkite.is-up .kt-fsail{animation:kt-up 1s ease-out forwards;}'
  + '.kt-card{align-self:center;width:calc(var(--kt-card) + 22px);padding:8px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--kt-ink),0 4px 0 #C9B897;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:grab;touch-action:none;} .kt-cpic{width:var(--kt-card);height:var(--kt-card);object-fit:contain;} .kt-cword{font:800 22px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-ink);} .kt-dots{display:flex;gap:6px;} .kt-dots i{width:12px;height:12px;border-radius:50%;background:var(--kt-coral);} .kt-card.is-lifted{opacity:.35;} .kt-fword{position:static;}'
  + '.kt-dragging{position:fixed !important;z-index:50;pointer-events:none;opacity:.92;}'
  + '.kt-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.kt-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--kt-teal);text-align:center;flex:1;} .kt-note:empty{display:none;} .kt-note.is-ok{font-weight:800;} .kt-note.is-wrong{color:#A6461F;} .is-narrow .kt-note{font-size:15px;text-align:left;}'
  + '.kt-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .kt-check[hidden]{display:none;} .kt-check:disabled{opacity:.5;}'
  + '.kt-knot:focus-visible,.kt-boxbow:focus-visible,.kt-spare:focus-visible,.kt-key:focus-visible,.kt-check:focus-visible,.kt-kite:focus-visible,.kt-fkite:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow .kt-sky{flex-direction:column;align-items:center;padding-bottom:44px;} .is-narrow .kt-tail{padding-top:0;justify-content:center;width:100%;} .is-narrow .kt-tail::before{top:calc(var(--kt-bh) / 2);left:8px;}'
  + '.kt-wrap:focus{outline:none;} .is-narrow.is-write{--kt-pic:64px;} .is-narrow.is-write .kt-sky{flex-direction:row;align-items:center;min-height:0;padding:6px 6px 26px;} .is-narrow.is-write .kt-tail{padding-top:0;} .is-narrow.is-write .kt-keys{gap:4px;} .is-narrow.is-write .kt-key{min-height:44px;} .is-narrow.is-write .kt-grass{height:20px;} .is-narrow.is-write .kt-cloud{display:none;}'
  + '@media (prefers-reduced-motion: reduce){.kt-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'kt-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.KiteTailActivity = KiteTailActivity;
