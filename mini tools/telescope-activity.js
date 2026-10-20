/* =====================================================================
   telescope-activity.js — ACTIVITY #46 of the one-by-one rebuild:
   "Byg ordet af stavelser" → KIKKERTEN, the telescope (RF.K.2.B, da).
   Design sheet: docs/activities-rebuild/designs/046-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a brass telescope pulled out one click for every
   syllable. Kig! swings the round view onto the far-away picture: sharp
   only when the telescope has exactly as many rings as the word has
   syllables, in the right order; blurred and shifted when it is too
   short (the last ring carries two syllables), blurred and shrunk when it
   is too long (a ring stays blank). Three levels: Træk ud · Byg kikkerten
   · Den manglende ring. A logbook strip keeps every word spotted.

   ACTIVITY LAYER ONLY: the model is telescope-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.TelescopeActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var TelescopeActivity = {
  id: 'telescope',
  apparatusClasses: ['ts-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Telescope',da:'Kikkerten'},
    instruction:   {en:'Pull the telescope out one click for every syllable. Look through it: the picture is sharp when you have it right.',da:'Træk kikkerten ud ét klik for hver stavelse. Kig igennem: billedet er skarpt, når det passer.'},
    check:         {en:'Look!',da:'Kig!'},
    pPull:         {en:'Pull the telescope out: one click for every syllable.',da:'Træk kikkerten ud: ét klik for hver stavelse.'},
    pBuild:        {en:'Build the telescope: the syllables in the right order.',da:'Byg kikkerten: sæt stavelserne i den rigtige rækkefølge.'},
    pGap:          {en:'Which ring is missing?',da:'Hvilken ring mangler?'},
    hintPull:      {en:'Pull the telescope out: one click for every syllable you say.',da:'Træk kikkerten ud: ét klik for hver stavelse, du siger.'},
    hintBuild:     {en:'Fit the rings on the telescope.',da:'Sæt ringene på kikkerten.'},
    hintGap:       {en:'Find the missing ring.',da:'Find ringen, der mangler.'},
    hintShort:     {en:'The last ring has more than one syllable. Pull one more ring out!',da:'Den sidste ring har mere end én stavelse. Træk én ring mere ud!'},
    hintLong:      {en:'That ring has no syllable. Push it in!',da:'Den ring har ingen stavelse. Skub den ind!'},
    hintLong2:     {en:'Those rings have no syllable. Push them in!',da:'De ringe har ingen stavelse. Skub dem ind!'},
    hintClap:      {en:'Clap the word, and pull the telescope out one click for each clap.',da:'Klap ordet, og træk kikkerten ét klik ud for hvert klap.'},
    hintGlow:      {en:'The glowing rings are in the right place.',da:'De lysende ringe sidder rigtigt.'},
    hintNoneRight: {en:'No ring was in the right place. Which syllable comes first?',da:'Ingen af ringene sad rigtigt. Hvilken stavelse kommer først?'},
    hintDecoy:     {en:'That ring is not part of the word.',da:'Den ring hører ikke til ordet.'},
    hintFirst:     {en:'The word starts with {first}.',da:'Ordet begynder med {first}.'},
    hintSameWord:  {en:'That syllable is in the word, but not here.',da:'Den stavelse er med i ordet, men ikke her.'},
    hintForeign:   {en:'That syllable is not in the word.',da:'Den stavelse er ikke med i ordet.'},
    hintListen:    {en:'Listen for what is missing.',da:'Lyt efter det, der mangler.'},
    okPull:        {en:'{word}: {n} syllables — {parts}!',da:'{word}: {n} stavelser — {parts}!'},
    okPullOne:     {en:'{word}: one syllable!',da:'{word}: én stavelse!'},
    okBuild:       {en:'{plus} = {word}!',da:'{plus} = {word}!'},
    setLevel:      {en:'Level',da:'Niveau'},
    lvPull:        {en:'Pull out',da:'Træk ud'},
    lvBuild:       {en:'Build the telescope',da:'Byg kikkerten'},
    lvGap:         {en:'The missing ring',da:'Den manglende ring'},
    setExtra:      {en:'Extra ring',da:'Ekstra ring'},
    optOff:        {en:'Off',da:'Fra'},
    optOn:         {en:'On',da:'Til'},
    setIsland:     {en:'Word on the island',da:'Ordet på øen'},
    optNo:         {en:'No',da:'Nej'},
    optYes:        {en:'Yes',da:'Ja'},
    ariaLog:       {en:'Logbook',da:'Logbog'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',da:'Billede: {word} — tryk for at høre det'},
    ariaScope:     {en:'Telescope with {n} rings out',da:'Kikkert med {n} ringe trukket ud'},
    ariaScope1:    {en:'Telescope with 1 ring out',da:'Kikkert med 1 ring trukket ud'},
    ariaRing:      {en:'Ring {i}: {s}',da:'Ring {i}: {s}'},
    ariaEmpty:     {en:'empty',da:'tom'},
    ariaLens:      {en:'Pull the telescope out',da:'Træk kikkerten ud'},
    ariaRackRing:  {en:'Ring {s}',da:'Ring {s}'},
    ariaSharp:     {en:'The picture is sharp',da:'Billedet er skarpt'},
    ariaBlur:      {en:'The picture is blurred',da:'Billedet er sløret'}
    /*STRINGS-END*/
  },
  defaults: { level: 'pull', extra: 'off', island: 'no' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'pull', labelKey: 'lvPull' }, { value: 'build', labelKey: 'lvBuild' }, { value: 'gap', labelKey: 'lvGap' }] },
    { key: 'extra', type: 'choice', labelKey: 'setExtra', options: [{ value: 'off', labelKey: 'optOff' }, { value: 'on', labelKey: 'optOn' }] },
    { key: 'island', type: 'choice', labelKey: 'setIsland', options: [{ value: 'no', labelKey: 'optNo' }, { value: 'yes', labelKey: 'optYes' }] }
  ],

  OK_MS: 2600, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._home = -1;
    this._log = []; this._logPass = -1;
    injectTelescopeCSS();
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
  _lv: function () { return TelescopeCore.level(this._set('level')); },
  /* the pool depends on the level and, for Byg kikkerten, the extra ring */
  _key: function () { var lv = this._lv(); return lv + (lv === 'build' ? '/' + this._set('extra') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'da', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = TelescopeCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = TelescopeCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, beats = w.syl.length, extra = this._set('extra') === 'on';
    var args = { word: w.word, n: beats, parts: w.syl.join(' · '), plus: w.syl.join(' + '), first: w.syl[0] };
    var pk = { pull: 'pPull', build: 'pBuild', gap: 'pGap' }[r.level];
    var ck = r.level === 'pull' ? (beats === 1 ? 'okPullOne' : 'okPull') : 'okBuild';
    return {
      id: 'telescope.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._home = -1; tool._shut = false;
        if (tool._logPass !== pss) { tool._log = []; tool._logPass = pss; }
        tool.st = C.newState(r, pss, { extra: extra }); tool._args = args; tool._ck = ck;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = TelescopeCore.newState(TelescopeCore.rounds('pull')[1], 0); this._args = {}; this._ck = 'okPull'; }
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
    var L = this._L = TelescopeCore.layout(this._width());
    var wrap = api.el('div', 'ts-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['seg', L.seg], ['segh', L.segH], ['cap', L.cap], ['lens', L.lens], ['tube', L.main], ['syl', L.syl], ['view', L.view], ['pic', L.pic], ['vpic', L.viewPic]].forEach(function (p) { wrap.style.setProperty('--ts-' + p[0], p[1] + 'px'); });
    var log = api.el('div', 'ts-log'); log.setAttribute('aria-label', this._t('ariaLog')); this._logEl = log; wrap.appendChild(log);
    var sea = api.el('div', 'ts-sea'); this._sea = sea; wrap.appendChild(sea);
    var rack = api.el('div', 'ts-rack'); this._rack = rack; wrap.appendChild(rack);
    var note = api.el('div', 'ts-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'ts-ask'); ask.appendChild(note);
    var chk = api.el('button', 'ts-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._look(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* every repaint rebuilds the controls: put the keyboard focus back on the same control (or the wrapper, which carries the key handler) */
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0], at = ['data-k', 'data-id'].filter(function (x) { return a.hasAttribute(x); })[0]; sel = '.' + cls + (at ? '[' + at + '="' + a.getAttribute(at) + '"]' : ''); }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._sea) return;
    var st = this.st, r = st.r, C = TelescopeCore;
    this._paintLog(); this._paintSea(); this._paintRack();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) msg = this._t(h, this._args);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    void r;
  },
  _paintLog: function () {
    var el = this._logEl, self = this; el.innerHTML = '';
    this._log.forEach(function (w) {
      var t = self.api.el('span', 'ts-entry');
      t.innerHTML = '<svg viewBox="0 0 30 14" aria-hidden="true"><rect x="1" y="4" width="9" height="7" rx="1" fill="#B8862F" stroke="#2A2A35" stroke-width="1.5"/><rect x="10" y="3" width="9" height="9" rx="1" fill="#D7A84B" stroke="#2A2A35" stroke-width="1.5"/><rect x="19" y="2" width="9" height="11" rx="1" fill="#D7A84B" stroke="#2A2A35" stroke-width="1.5"/></svg><span>' + w.word + '</span><i>' + w.syl.map(function () { return '<b></b>'; }).join('') + '</i>';
      el.appendChild(t);
    });
  },

  /* ---- the sea: the island with the picture, the view, the telescope ---- */
  _paintSea: function () {
    var self = this, st = this.st, r = st.r, C = TelescopeCore, sea = this._sea, L = st.last || {}, show = st.show && !st.done && L.result && L.result !== 'empty';
    sea.innerHTML = '';
    var far = this.api.el('div', 'ts-far'); sea.appendChild(far);
    var island = this.api.el('button', 'ts-island'); island.type = 'button';
    island.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    island.innerHTML = '<img class="ts-pic" alt="" draggable="false" src="' + this._pic(r.w.pic) + '">' + (r.level === 'pull' && this._set('island') === 'yes' ? '<span class="ts-iword">' + r.w.word + '</span>' : '');
    island.addEventListener('click', function () { self._say(r.w.word); });
    far.appendChild(island);
    /* the view: only after Kig! — sharp after a right look, blurred (shifted = too short, shrunk = too long) after a miss */
    if (st.done || show) {
      var kase = st.done ? 'sharp' : L.result === 'long' ? 'long' : L.result === 'short' ? 'short' : 'blur';
      /* the view swings in once per look — a repaint must not replay the swing */
      var vkey = r.id + '/' + st.misses + '/' + kase, fresh = this._viewKey !== vkey; this._viewKey = vkey;
      var view = this.api.el('div', 'ts-view is-' + kase + (fresh ? ' is-new' : '')); view.setAttribute('role', 'img');
      island.classList.add('is-behind');
      view.setAttribute('aria-label', this._t(C.sharp(st) ? 'ariaSharp' : 'ariaBlur'));
      view.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.w.pic) + '">' + (st.done ? '<i class="ts-twinkle"></i>' : '');
      view.addEventListener('click', function () { self._say(r.w.word); });
      far.appendChild(view);
    }
    var scope = this.api.el('div', 'ts-scope' + (st.done && this._shut ? ' is-done' : '')); this._scope = scope; sea.appendChild(scope);
    var nOut = this._ringCount();
    scope.setAttribute('aria-label', this._t(nOut === 1 ? 'ariaScope1' : 'ariaScope', { n: nOut }));
    scope.insertAdjacentHTML('beforeend', '<span class="ts-cap" aria-hidden="true"></span>');
    var tube = this.api.el('span', 'ts-tube'); tube.setAttribute('aria-hidden', 'true');
    if (st.done && this._shut) tube.textContent = r.w.word;
    scope.appendChild(tube);
    this._model().forEach(function (m, i) {
      var el = self.api.el('button', 'ts-ring' + (m.cls ? ' ' + m.cls : '')); el.type = 'button'; el.setAttribute('data-k', i);
      el.setAttribute('aria-label', self._t('ariaRing', { i: i + 1, s: m.text || self._t('ariaEmpty') }));
      var len = (m.text || '').length, fs = len > 3 ? ' style="font-size:' + Math.max(12, Math.min(self._L.syl, Math.floor((self._L.seg - 10) / (len * 0.62)))) + 'px"' : '';
      el.innerHTML = '<span class="ts-band"' + fs + '>' + (m.text || '') + '</span>' + (m.rivet ? '<i class="ts-rivet"></i>' : '');
      self._bindRing(el, i, m);
      scope.appendChild(el);
    });
    /* help 1 (too short): a ghost ring pulses beyond the lens; help 2 (pull): one ghost per syllable */
    if (r.level === 'pull' && show && L.result === 'short' && st.help < 2) scope.insertAdjacentHTML('beforeend', '<span class="ts-ghost" aria-hidden="true"></span>');
    if (r.level === 'pull' && show && st.help >= 2) for (var g = st.out; g < r.w.syl.length; g++) scope.insertAdjacentHTML('beforeend', '<span class="ts-ghost" aria-hidden="true"></span>');
    var lens = this.api.el('button', 'ts-lens'); lens.type = 'button'; this._lens = lens;
    lens.setAttribute('aria-label', this._t('ariaLens'));
    lens.disabled = st.done || r.level !== 'pull' || st.out >= C.MAX_RINGS;
    scope.appendChild(lens);
    if (r.level === 'pull') this._bindLens(lens);
  },
  _ringCount: function () { var st = this.st; return st.r.level === 'pull' ? st.out : this._model().length; },
  /* what each ring of the telescope shows */
  _model: function () {
    var st = this.st, r = st.r, C = TelescopeCore, L = st.last || {}, show = st.show && !st.done, out = [], i;
    /* after the sharp view the telescope slides shut: the syllables have flowed into the word on the main tube */
    if (st.done && this._shut) return out;
    if (r.level === 'pull') {
      var eng = st.done ? r.w.syl.map(function (s) { return [s]; }) : show && L.engraved ? L.engraved : null;
      for (i = 0; i < st.out; i++) { var p = eng ? eng[i] : null; out.push({ text: p ? p.join('·') : '', cls: (st.done ? 'is-right ' : '') + (p && !p.length ? 'is-blank' : p && p.length > 1 ? 'is-double' : '') }); }
      return out;
    }
    var segs = st.segs, last = -1;
    if (r.level === 'build') { for (i = 0; i < segs.length; i++) if (segs[i]) last = i; }
    else last = segs.length - 1;
    for (i = 0; i <= last; i++) {
      var x = segs[i];
      if (!x) { out.push({ text: '', cls: 'is-hollow' + (r.level === 'gap' && show && st.help >= 2 ? ' is-glow' : '') }); continue; }
      var text = C.isFixed(x) ? r.w.syl[+String(x).slice(5)] : C.ring(st, x).text;
      var glow = show && L.right && L.right[i];
      out.push({ text: text, rivet: i === st.locked, cls: (C.isFixed(x) ? 'is-fixed ' : '') + (st.done || glow || i === st.locked ? 'is-right' : '') + (this._home === i ? ' is-home' : '') });
    }
    return out;
  },
  _paintRack: function () {
    var self = this, st = this.st, rack = this._rack;
    rack.innerHTML = '';
    rack.hidden = !st.rack || st.done;
    if (rack.hidden) return;
    st.rack.forEach(function (id) {
      var b = TelescopeCore.ring(st, id), el = self.api.el('button', 'ts-loose'); el.type = 'button'; el.setAttribute('data-id', id);
      el.setAttribute('aria-label', self._t('ariaRackRing', { s: b.text }));
      el.innerHTML = '<span class="ts-band">' + b.text + '</span>';
      self._bindLoose(el, id);
      rack.appendChild(el);
    });
  },

  /* ---- the hand ---- */
  _pull: function () { if (this._busy) return; if (TelescopeCore.pull(this.st)) { this.api.sound(330); this._paint(); } },
  _push: function (i) { if (this._busy) return; if (TelescopeCore.push(this.st, i)) { this.api.sound(180); this._paint(); } },
  /* the lens cap is the handle: drag it outward one click per ring width, or tap it for one click */
  _bindLens: function (el) {
    var self = this;
    el.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } self._pull(); });
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, start = self.st.out, step = self._L.seg, moved = false;
      var move = function (e) {
        var dx = e.clientX - x0; if (!moved && Math.abs(dx) < 8) return;
        moved = true; self._dragged = true;
        var want = Math.max(0, Math.min(TelescopeCore.MAX_RINGS, start + Math.round(dx / step)));
        while (self.st.out < want) { TelescopeCore.pull(self.st); self.api.sound(330); }
        while (self.st.out > want) { TelescopeCore.push(self.st, self.st.out - 1); self.api.sound(180); }
        self._paint_();
      };
      var up = function () { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); if (moved) { self._paint(); setTimeout(function () { self._dragged = false; }, 0); } };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _bindRing: function (el, i, m) {
    var self = this, st = this.st, r = st.r;
    el.addEventListener('click', function () {
      if (self._busy || st.done || self._dragged) return;
      if (r.level === 'pull') { self._push(i); return; }
      if (m.text) { self._say(m.text); el.classList.add('is-glint'); }
    });
    /* a fitted ring can be dragged back to the rack */
    if (r.level !== 'pull' && m.text && !/is-fixed/.test(m.cls) && i !== st.locked) this._bindDrag(el, function (x, y) {
      if (self._overRack(x, y)) { if (TelescopeCore.unfit(st, i)) self.api.sound(180); }
      self._paint();
    });
  },
  _bindLoose: function (el, id) {
    var self = this, st = this.st;
    el.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } if (self._busy || st.done) return; self._say(TelescopeCore.ring(st, id).text); self._fit(id); });
    this._bindDrag(el, function (x, y) { if (self._overScope(x, y)) self._fit(id); else self._paint(); });
  },
  _fit: function (id) { if (TelescopeCore.fit(this.st, id)) { this.api.sound(420); this._paint(); var nx = this._rack.querySelector('.ts-loose'); if (nx && this._wrap.contains(document.activeElement)) nx.focus(); } else this._paint(); },
  /* drag with a ghost; a plain tap falls through to click */
  _bindDrag: function (el, drop) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = el.cloneNode(true); ghost.className = el.className + ' ts-dragging'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
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
  _overScope: function (x, y) { var b = this._scope.getBoundingClientRect(); return x >= b.left - 10 && x <= b.right + 60 && y >= b.top - 24 && y <= b.bottom + 24; },
  _overRack: function (x, y) { var b = this._rack.getBoundingClientRect(); return !this._rack.hidden && y >= b.top - 12 && y <= b.bottom + 12; },
  _onKey: function (ev) {
    var st = this.st, r = st.r, k = ev.key; if (st.done || this._busy || ev.defaultPrevented) return;
    if (r.level === 'pull') { if (k === 'ArrowRight') { ev.preventDefault(); this._pull(); } else if (k === 'ArrowLeft') { ev.preventDefault(); this._push(st.out - 1); } return; }
    if (k === 'Backspace') { ev.preventDefault(); var i = TelescopeCore.outermost(st); if (i >= 0 && TelescopeCore.unfit(st, i)) { this.api.sound(180); this._paint(); } }
  },
  _look: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, r = st.r, res = TelescopeCore.look(st);
    if (res.sharp) return this._win();
    this.api.sound(res.kase === 'empty' ? 460 : 196);
    if (st.help >= 2 && r.level === 'pull') this._say(r.w.syl.join(' … '), 0.7);
    if (st.help >= 2 && r.level === 'gap') this._say(r.w.syl.map(function (s, i) { return i === r.gap ? '…' : s; }).join(' … '), 0.7);
    /* a syllable of the same word shows where it belongs for a moment, then returns to the rack */
    if (st.last && st.last.result === 'sameword' && st.last.home >= 0) { this._home = st.last.home; this._later(function () { self._home = -1; if (!self.st.done) self._paint(); }, this._ms(800)); }
    this._paint();
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._say(r.w.syl.join(' … ') + ' … ' + r.w.word, 0.85);
    this._log.push(r.w); if (this._log.length > 10) this._log.shift();
    this.api.announce(this._t('ariaSharp'));
    this._shut = false; this._paint();
    this._later(function () { self._shut = true; self._paint(); }, this._ms(900));
    this._busy = true;
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var tsCssDone = false;
function injectTelescopeCSS() {
  if (tsCssDone || typeof document === 'undefined') return;
  tsCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ts-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--ts-ink:#2A2A35;--ts-teal:#146B5E;--ts-coral:#F2784B;--ts-brass:#D7A84B;--ts-brass2:#B8862F;user-select:none;-webkit-user-select:none;}'
  + '.ts-wrap:focus{outline:none;}'
  + '.ts-log:empty{display:none;} .ts-log{display:flex;gap:12px;overflow-x:auto;align-items:center;min-height:34px;padding:2px 10px;border-radius:8px;background:#FFF8EA;box-shadow:inset 0 0 0 2px #E4D3B0;}'
  + '.ts-entry{display:flex;align-items:center;gap:5px;font:800 14px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--ts-ink);white-space:nowrap;} .ts-entry svg{width:30px;height:14px;} .ts-entry i{display:flex;gap:3px;} .ts-entry b{width:6px;height:6px;border-radius:50%;background:var(--ts-coral);}'
  + '@media (max-width:339px){.ts-log{display:none;}}'
  + '.ts-sea{position:relative;display:flex;flex-direction:column;align-items:stretch;gap:12px;padding:12px 10px 16px;border-radius:16px;background:linear-gradient(#E3F2F8 0%,#CFE6F0 62%,#9FCBDD 62%,#8EC0D6 100%);box-shadow:inset 0 0 0 3px #8FB9CB;overflow:hidden;}'
  + '.ts-far{position:relative;align-self:flex-end;width:var(--ts-view);height:var(--ts-view);margin-right:6px;}'
  + '.is-narrow .ts-far{align-self:center;margin-right:0;} .is-narrow .ts-sea{padding:10px 6px 12px;}'
  + '.ts-island{position:absolute;inset:calc((var(--ts-view) - var(--ts-pic) - 26px) / 2);padding:0;border:0;border-radius:50%;background:#DCEFF5;box-shadow:inset 0 0 0 3px var(--ts-ink),0 6px 0 #C6A26A;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;}'
  + '.ts-pic{width:var(--ts-pic);height:var(--ts-pic);object-fit:contain;} .ts-iword{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);padding:2px 10px;border-radius:8px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--ts-ink);font:800 20px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--ts-ink);white-space:nowrap;}'
  + '.ts-view{position:absolute;inset:0;border-radius:50%;background:#F4FAFD;box-shadow:0 0 0 10px var(--ts-ink),0 8px 18px rgba(0,0,0,.25);overflow:hidden;display:flex;align-items:center;justify-content:center;z-index:3;cursor:pointer;} .ts-view.is-new{animation:ts-swing .35s ease-out;} .ts-island.is-behind{visibility:hidden;} @keyframes ts-swing{0%{transform:translateX(-40px) scale(.6);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.ts-view img{width:var(--ts-vpic);height:var(--ts-vpic);object-fit:contain;transition:filter .3s ease;} .ts-view.is-blur img,.ts-view.is-short img,.ts-view.is-long img{filter:blur(7px);} .ts-view.is-short img{transform:translateX(-10px);} .ts-view.is-long img{transform:scale(.85);} .ts-view.is-sharp img{filter:none;} .ts-view.is-sharp.is-new img{animation:ts-focus .3s ease-out;} @keyframes ts-focus{0%{filter:blur(7px);}100%{filter:blur(0);}}'
  + '.ts-twinkle{position:absolute;right:22%;top:20%;width:18px;height:18px;background:#fff;clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);animation:ts-tw 1.2s ease-in-out infinite;} @keyframes ts-tw{50%{transform:scale(.4) rotate(45deg);}}'
  + '.ts-scope{position:relative;display:flex;align-items:center;gap:0;min-height:calc(var(--ts-segh) + 20px);padding-left:2px;transform-origin:left center;transform:rotate(-6deg);} .is-narrow .ts-scope{transform:none;}'
  + '.ts-cap{flex:none;width:var(--ts-cap);height:calc(var(--ts-segh) - 4px);border-radius:8px 4px 4px 8px;background:#3A3A45;box-shadow:inset 0 0 0 3px var(--ts-ink);}'
  + '.ts-tube{flex:none;width:var(--ts-tube);height:calc(var(--ts-segh) + 6px);border-radius:4px;background:linear-gradient(#E6BE66,var(--ts-brass2));box-shadow:inset 0 0 0 3px var(--ts-ink);display:flex;align-items:center;justify-content:center;font:800 calc(var(--ts-syl) - 4px)/1 var(--lcs-font-body,Nunito,sans-serif);color:#4A3412;white-space:nowrap;overflow:visible;z-index:1;}'
  + '.ts-scope.is-done .ts-tube{min-width:var(--ts-tube);width:auto;padding:0 10px;background:linear-gradient(#F2D58A,#D7A84B);}'
  + '.ts-ring{position:relative;flex:none;width:var(--ts-seg);height:var(--ts-segh);margin-left:-2px;padding:0;border:0;border-radius:3px;background:linear-gradient(#E6BE66,var(--ts-brass),var(--ts-brass2));box-shadow:inset 0 0 0 3px var(--ts-ink);cursor:pointer;font:inherit;animation:ts-out .14s ease-out;} @keyframes ts-out{0%{transform:translateX(-20px);}}'
  + '.ts-band{position:absolute;inset:6px 6px;border-radius:4px;background:#F6E7C3;box-shadow:inset 0 0 0 2px #8C6420;display:flex;align-items:center;justify-content:center;font:800 var(--ts-syl)/1 var(--lcs-font-body,Nunito,sans-serif);color:#4A3412;white-space:nowrap;}'
  + '.ts-ring.is-blank{background:linear-gradient(#C9C3B6,#A9A398);} .ts-ring.is-blank .ts-band{background:#E2DED6;box-shadow:inset 0 0 0 2px #8A8478;} .ts-ring.is-blank{animation:ts-shiver .4s ease-in-out;} @keyframes ts-shiver{25%{transform:translateY(-3px);}75%{transform:translateY(3px);}}'
  + '.ts-ring.is-double .ts-band{box-shadow:inset 0 0 0 3px #A6461F;font-size:calc(var(--ts-syl) * .7);letter-spacing:-.5px;}'
  + '.ts-ring.is-right .ts-band{background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--ts-teal);} .ts-ring.is-fixed{background:linear-gradient(#CDB37A,#A88B4E);}'
  + '.ts-ring.is-hollow{background:rgba(255,255,255,.35);box-shadow:none;outline:3px dashed #6E777F;outline-offset:-4px;} .ts-ring.is-hollow .ts-band{background:none;box-shadow:none;} .ts-ring.is-hollow.is-glow{outline-color:var(--ts-coral);animation:ts-gp 1s ease-in-out infinite;} @keyframes ts-gp{50%{background:rgba(242,120,75,.25);}}'
  + '.ts-ring.is-home .ts-band{box-shadow:inset 0 0 0 4px #F2C14B;} .ts-ring.is-glint .ts-band{animation:ts-glint .5s ease-out;} @keyframes ts-glint{50%{background:#FFF6DB;}}'
  + '.ts-rivet{position:absolute;left:4px;top:4px;width:8px;height:8px;border-radius:50%;background:#5E5E66;box-shadow:inset 0 0 0 2px var(--ts-ink);}'
  + '.ts-ghost{flex:none;width:var(--ts-seg);height:var(--ts-segh);margin-left:4px;border-radius:3px;outline:3px dashed var(--ts-coral);outline-offset:-3px;animation:ts-gh 1.4s ease-in-out infinite;} @keyframes ts-gh{0%,100%{opacity:.3;}40%{opacity:1;}}'
  + '.ts-lens{flex:none;width:44px;height:64px;margin-left:-2px;padding:0;border:0;background:none;cursor:ew-resize;position:relative;touch-action:none;} .ts-lens::before{content:"";position:absolute;left:0;top:calc((64px - var(--ts-segh) - 8px) / 2);width:var(--ts-lens);height:calc(var(--ts-segh) + 8px);border-radius:3px 10px 10px 3px;background:linear-gradient(90deg,#BFE3F0,#EAF7FC);box-shadow:inset 0 0 0 3px var(--ts-ink);} .ts-lens::after{content:"";position:absolute;left:calc(var(--ts-lens) + 4px);top:24px;width:0;height:0;border-left:12px solid var(--ts-coral);border-top:8px solid transparent;border-bottom:8px solid transparent;} .ts-lens:disabled{cursor:default;} .ts-lens:disabled::after{display:none;}'
  + '.ts-rack{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:calc(var(--ts-segh) + 24px);padding:12px;border-radius:12px;background:#C9925A;box-shadow:inset 0 0 0 3px #7A4A22,0 3px 0 #8C5A2A;} .ts-rack[hidden]{display:none;}'
  + '.ts-loose{position:relative;flex:none;width:var(--ts-seg);min-width:62px;height:var(--ts-segh);padding:0;border:0;border-radius:3px;background:linear-gradient(#E6BE66,var(--ts-brass),var(--ts-brass2));box-shadow:inset 0 0 0 3px var(--ts-ink),0 3px 0 #6A4418;cursor:grab;touch-action:none;font:inherit;} .ts-loose.is-lifted{opacity:.35;}'
  + '.ts-dragging{position:fixed !important;z-index:50;pointer-events:none;opacity:.92;}'
  + '.ts-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.ts-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--ts-teal);text-align:center;flex:1;} .ts-note:empty{display:none;} .ts-note.is-ok{font-weight:800;} .ts-note.is-wrong{color:#A6461F;} .is-narrow .ts-note{font-size:15px;text-align:left;}'
  + '.ts-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .ts-check[hidden]{display:none;} .ts-check:disabled{opacity:.5;}'
  + '.ts-ring:focus-visible,.ts-loose:focus-visible,.ts-lens:focus-visible,.ts-check:focus-visible,.ts-island:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.ts-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'ts-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.TelescopeActivity = TelescopeActivity;
