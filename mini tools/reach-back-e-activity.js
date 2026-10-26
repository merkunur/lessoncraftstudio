/* =====================================================================
   reach-back-e-activity.js — ACTIVITY #111 of the one-by-one rebuild:
   "Add the Magic e" → THE REACH-BACK e (RF.1.3; en only).
   Design: docs/activities-rebuild/designs/111-cvc-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the silent e has an arm. Drop it in the end socket and
   its wire arm unfolds, swings back over exactly ONE letter and taps the
   vowel with its little hand — the vowel tile flips like a coin from its
   teal short face to its gold name face. Take the e away and the vowel
   flips back. The arm's reach IS the rule. Four rounds in nine must NOT
   take the e: an e dropped on cap makes the vowel say its name and the
   word no longer names the picture. Finished words hang on a washing
   line (cap next to cape). Clues: Finish the word · Read and find.
   ACTIVITY LAYER ONLY: the model is reach-back-e-core.js; pictures are the
   library's; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity when right).
   Test seams: window.ReachBackEActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var ReachBackEActivity = {
  id: 'reach-back-e',
  apparatusClasses: ['rb-'],

  /*STRINGS-BEGIN*/strings: {
    title:          {en:'Add the Magic e'},
    instrBubble:    {en:'{msg}'},
    okBubble:       {en:'{msg}'},
    check:          {en:'Check'},
    tFinish:        {en:'Build the word for the picture. Does it need the magic e?'},
    tRead:          {en:'Read the word. Which picture is it?'},
    nudge:          {en:'Drop the e on the end and watch its arm!'},
    hintEmpty:      {en:'Pick a vowel for the middle.'},
    hintReadEmpty:  {en:'Read the word, then tap the picture it names.'},
    hintVowel:      {en:'Say the picture\'s name slowly. Which vowel do you hear?'},
    hintVowel2:     {en:'Say the name slowly. Listen for the middle sound.'},
    hintExtra:      {en:'Listen to the picture\'s name. Does the vowel say its name?'},
    hintMissing:    {en:'Say the picture\'s name. Does the vowel say its name?'},
    hintBadgeName:  {en:'Look at the badge: gold means the vowel says its name, and that needs the e.'},
    hintBadgeShort: {en:'Look at the badge: teal means a short sound, so no e.'},
    hintEnd:        {en:'That letter adds a new sound to the end. The magic e is the quiet one.'},
    hintRead:       {en:'Read it again, sound by sound. Does the vowel say its name?'},
    hintRead2:      {en:'Is there an e on the end? Its arm reaches back, and the vowel says its name.'},
    okE:            {en:'Add the e: {word}! The e reached back and the {v} said its name.'},
    okNoE:          {en:'{word}: a short {v}, no e needed!'},
    okRead:         {en:'Yes, that says {word}!'},
    aLine:          {en:'Washing line: the words you built'},
    aPic:           {en:'Picture: {name}. Tap to hear it.'},
    aRail:          {en:'Rail: {letters}'},
    aVowelSock:     {en:'Vowel socket: {v}. Tap to take it out.'},
    aVowelSockEmpty:{en:'Vowel socket: empty'},
    aEndSock:       {en:'End socket: magic e. Tap to take it off.'},
    aEndSockLetter: {en:'End socket: {c}. Tap to take it off.'},
    aEndSockEmpty:  {en:'End socket: empty'},
    aTileV:         {en:'Vowel {v}'},
    aTileE:         {en:'Magic e'},
    aTileC:         {en:'Letter {c}'},
    aChoice:        {en:'Picture {n}'},
    aReached:       {en:'The e reached the {v}: it says its name.'},
    aShort:         {en:'No e: a short {v}.'},
    aWaiting:       {en:'The e is waiting for a vowel.'},
    setClue:        {en:'Clue'},
    cFinish:        {en:'Finish the word'},
    cRead:          {en:'Read and find'},
    setVowel:       {en:'Vowel'},
    vPick:          {en:'Pick the vowel'},
    vGiven:         {en:'Vowel given'}
  },/*STRINGS-END*/

  defaults: { clue: 'finish', vowel: 'pick' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'finish', labelKey: 'cFinish' }, { value: 'read', labelKey: 'cRead' }] },
    { key: 'vowel', type: 'choice', labelKey: 'setVowel', options: [{ value: 'pick', labelKey: 'vPick' }, { value: 'given', labelKey: 'vGiven' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._line = []; this._drag = null; this._dragEl = null; this._dragEnd = 0; this._nudged = false;
    injectReachBackCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _clue: function () { return ReachBackECore.clueOf(this._setting('clue')); },
  _vmode: function () { return this._setting('vowel') === 'given' ? 'given' : 'pick'; },
  _key: function () { return this._clue() + '/' + this._vmode(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ReachBackECore.rounds(this._clue(), 0); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._ids = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ReachBackECore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._clue(), Math.random, fresh ? null : this._ids, pass);
      this._ids = P.order; this._order = P.order.slice(); this._pos = P.pos; this._vFirst = P.vFirst; this._set = P.set; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'reachbacke.' + this._key() + '.' + (this._set || 0) + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st.clue === 'read' ? 'tRead' : 'tFinish'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null, vf = this._vFirst ? this._vFirst[this._at] : null;
    this.st = ReachBackECore.newState(this._clue(), this._set || 0, r, { slot: pos, pos: pos, vFirst: vf, vowel: this._vmode() });
    this._view = { note: '', ok: '', swing: false, flip: false };
    /* the nudge stays until the child's first move or Check retires it (a round can be started more than once before it is seen) */
    if (!this._nudged && this.st.clue === 'finish') { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', 'en');
    wrap.innerHTML = '<div class="rb-line" role="list"></div><div class="rb-top"></div><div class="rb-railbox"></div><div class="rb-tray"></div><div class="rb-foot"></div><p class="rb-note" aria-live="polite"></p><p class="rb-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = ReachBackECore.band(W), gap = B.wide ? 8 : 6;
    var sock = B.wide ? 80 : Math.max(44, Math.min(64, Math.floor((w - 4 * gap - 26) / 5)));
    var pic = B.wide ? 160 : B.tiny ? 104 : Math.max(104, Math.min(120, Math.floor(w * 0.36)));
    var tile = B.wide ? 72 : B.tiny ? 58 : 64, cpic = B.wide ? 112 : B.tiny ? 80 : 88;
    return { w: w, wide: B.wide, tiny: B.tiny, gap: gap, sock: sock, sockH: Math.round(sock * 1.1), pic: pic, tile: tile, tileH: Math.round(tile * 1.12), cpic: cpic };
  },
  _img: function (word) { var p = ReachBackECore.PICS[word]; return '/image-library-webp/themes/' + p + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.rb-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = ReachBackECore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'rb-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue;
    this._wrap.style.setProperty('--rb-sock', D.sock + 'px'); this._wrap.style.setProperty('--rb-sockh', D.sockH + 'px'); this._wrap.style.setProperty('--rb-gap', D.gap + 'px');
    this._wrap.style.setProperty('--rb-tile', D.tile + 'px'); this._wrap.style.setProperty('--rb-tileh', D.tileH + 'px');
    /* the washing line: every finished word's tag, kept across passes */
    var line = this._qs('.rb-line'); line.innerHTML = '<span class="rb-string" aria-hidden="true"></span>'; line.setAttribute('aria-label', this._t('aLine'));
    this._line.slice(-9).forEach(function (w) { var t = document.createElement('span'); t.className = 'rb-tag' + (C.shape(w).needsE ? ' is-long' : ''); t.setAttribute('role', 'listitem'); t.textContent = w; line.appendChild(t); });
    var top = this._qs('.rb-top'); top.innerHTML = '';
    if (st.clue === 'finish') {
      var card = document.createElement('div'); card.className = 'rb-card';
      var pic = this._btn('rb-pic', 'pic', this._t('aPic', { name: st.word }), '<img src="' + this._img(st.word) + '" alt="" width="' + D.pic + '" height="' + D.pic + '" draggable="false">');
      pic.style.width = pic.style.height = (D.pic + 10) + 'px';
      pic.addEventListener('click', function () { self._speak(st.word); });
      card.appendChild(pic);
      var bd = C.badge(st), badge = document.createElement('span');
      badge.className = 'rb-badge' + (bd ? ' is-' + bd.face : ''); badge.setAttribute('aria-hidden', 'true');
      badge.innerHTML = bd ? (bd.face === 'name' ? '<i class="rb-crown"></i>' : '') + esc(bd.vowel) : '';
      card.appendChild(badge);
      if (st.done) { var tag = document.createElement('span'); tag.className = 'rb-wordtag'; tag.textContent = st.word; card.appendChild(tag); }
      top.appendChild(card);
    }
    this._paintRail(D);
    var tray = this._qs('.rb-tray'); tray.innerHTML = '';
    if (st.clue === 'finish') this._paintTray(tray, D); else this._paintChoices(tray, D);
    var foot = this._qs('.rb-foot'); foot.innerHTML = '';
    var chk = this._btn('rb-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.rb-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'rb-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'rb-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'rb-note'; }
  },
  /* ---- the rail: one socket per letter, ONE vowel socket, the end socket; the e's arm drawn over it ---- */
  _paintRail: function (D) {
    var C = ReachBackECore, st = this.st, v = this._view, self = this, box = this._qs('.rb-railbox'); box.innerHTML = '';
    var rail = document.createElement('div'); rail.className = 'rb-rail'; rail.setAttribute('role', 'group'); rail.setAttribute('aria-label', this._t('aRail', { letters: C.spelled(st).split('').join(' ') || '…' }));
    var wrong = C.wrongAt(st), face = C.vowelFace(st);
    st.rail.forEach(function (c, i) {
      if (c != null) { var s = document.createElement('span'); s.className = 'rb-sock is-letter' + (st.done ? ' is-done' : ''); s.textContent = c; rail.appendChild(s); return; }
      var vs = self._btn('rb-sock is-vowel' + (st.vowel ? '' : ' is-empty') + (wrong === 'vowel' ? ' is-wrong' : '') + (!st.vowel && st.last === 'tray' ? ' is-pulse' : ''), 'vsock',
        st.vowel ? self._t('aVowelSock', { v: st.vowel }) : self._t('aVowelSockEmpty'),
        st.vowel ? '<span class="rb-coin is-' + face + (v.flip ? ' is-flipping' : '') + '"><i class="rb-crown"></i>' + esc(st.vowel) + '</span>' : '');
      vs.setAttribute('data-sock', 'v'); vs.disabled = st.done || st.clue === 'read' || st.given || !st.vowel;
      vs.addEventListener('click', function () { if (self._afterDrag(vs)) return; self._clearVowel(); });
      rail.appendChild(vs);
    });
    var es = this._btn('rb-sock is-end' + (st.end ? '' : ' is-empty') + (wrong === 'end' ? ' is-wrong' : '') + (wrong === 'endEmpty' ? ' is-want' : ''), 'esock',
      st.end === 'e' ? this._t('aEndSock') : st.end ? this._t('aEndSockLetter', { c: st.end }) : this._t('aEndSockEmpty'),
      '<svg class="rb-groove" viewBox="0 0 40 14" aria-hidden="true"><path d="M2 12 Q20 -4 38 12" fill="none" stroke-width="2" stroke-dasharray="3 3"/></svg>' + (st.end === 'e' ? '<span class="rb-etile"><b>e</b></span>' : st.end ? '<span class="rb-ctile">' + esc(st.end) + '</span>' : ''));
    es.setAttribute('data-sock', 'e');
    es.disabled = st.done || (st.clue === 'finish' && !st.end) || (st.clue === 'read' && st.end !== 'e');
    es.addEventListener('click', function () { if (self._afterDrag(es)) return; if (st.clue === 'read') { self._swing(); return; } self._clearEnd(); });
    rail.appendChild(es);
    box.appendChild(rail);
    /* the arm: from the top of the end socket back over exactly one letter to the top of the socket two places left */
    if (st.end === 'e') {
      var n = st.rail.length, step = D.sock + D.gap, x1 = n * step + D.sock / 2, x0 = C.armTarget(st) * step + D.sock / 2, wArm = n * step + D.sock, top = 46;
      var hand = st.vowel ? 'is-tap' : 'is-wait', arm = document.createElement('div'); arm.className = 'rb-arm ' + hand + (v.swing ? ' is-swing' : ''); arm.setAttribute('aria-hidden', 'true');
      arm.style.width = wArm + 'px'; arm.style.height = top + 'px';
      arm.innerHTML = '<svg width="' + wArm + '" height="' + top + '" viewBox="0 0 ' + wArm + ' ' + top + '"><path class="rb-wire" d="M' + x1 + ' ' + top + ' C ' + x1 + ' 2, ' + x0 + ' 2, ' + x0 + ' ' + (top - 12) + '"/><circle class="rb-hand" cx="' + x0 + '" cy="' + (top - 12) + '" r="7"/></svg>';
      rail.appendChild(arm);
    }
  },
  _paintTray: function (tray, D) {
    var st = this.st, self = this;
    st.tray.forEach(function (t, k) {
      var used = t.k === 'v' ? st.vowel === t.c : st.end === t.c;
      var label = t.k === 'v' ? self._t('aTileV', { v: t.c }) : t.k === 'e' ? self._t('aTileE') : self._t('aTileC', { c: t.c });
      var html = t.k === 'e' ? '<span class="rb-etile"><b>e</b><svg class="rb-fold" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 L10 6 L16 12" fill="none" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="12" r="2.6"/></svg></span>'
        : t.k === 'v' ? '<span class="rb-coin is-short">' + esc(t.c) + '</span>' : '<span class="rb-ctile">' + esc(t.c) + '</span>';
      var b = self._btn('rb-tile is-' + t.k + (used ? ' is-used' : ''), 'tile-' + k, label, used ? '' : html);
      b.disabled = used || st.done;
      self._wireDrag(b, t);
      b.addEventListener('click', function () { if (self._afterDrag(b)) return; self._place(t); });
      tray.appendChild(b);
    });
  },
  _paintChoices: function (tray, D) {
    var st = this.st, self = this, v = this._view;
    st.choices.forEach(function (w, k) {
      var b = self._btn('rb-choice' + (st.picked === k ? ' is-sel' : '') + (st.done && k === st.right ? ' is-right' : '') + (v.wrongK === k ? ' is-wrong' : ''), 'choice-' + k, self._t('aChoice', { n: k + 1 }),
        '<img src="' + self._img(w) + '" alt="" width="' + D.cpic + '" height="' + D.cpic + '" draggable="false">');
      b.style.width = b.style.height = (D.cpic + 10) + 'px'; b.setAttribute('aria-pressed', st.picked === k ? 'true' : 'false'); b.disabled = st.done;
      b.addEventListener('click', function () { if (ReachBackECore.pick(st, k) === 'picked') { self.api.sound(540); self._clearHelp(); v.wrongK = null; self._paint(); } });
      tray.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _place: function (t) {
    var C = ReachBackECore, st = this.st, v = this._view, before = C.vowelFace(st);
    if (t.k === 'v') { if (C.setVowel(st, t.c) !== 'set') return; this.api.sound(330); }
    else { if (C.setEnd(st, t.c) !== 'set') return; this.api.sound(t.k === 'e' ? 880 : 300); }
    this._clearHelp(); v.swing = t.k === 'e'; v.flip = before !== C.vowelFace(st);
    this._sr(this._armSay());
    this._paint(); this._settle();
  },
  _clearVowel: function () { if (ReachBackECore.clearVowel(this.st) !== 'cleared') return; this.api.sound(260); this._clearHelp(); this._view.flip = false; this._paint(); },
  _clearEnd: function () {
    var C = ReachBackECore, st = this.st, wasName = C.vowelFace(st) === 'name';
    if (C.clearEnd(st) !== 'cleared') return; this.api.sound(wasName ? 220 : 260); this._clearHelp(); this._view.flip = wasName; this._view.swing = false;
    this._sr(this._armSay()); this._paint(); this._settle();
  },
  /* Read and find: a tap on the e replays its reach */
  _swing: function () { this._view.swing = true; this._view.flip = true; this.api.sound(880); this._sr(this._armSay()); this._paint(); this._settle(); },
  _settle: function () { var v = this._view, self = this; if (this.FAST) { v.swing = false; v.flip = false; return; } this._later(function () { v.swing = false; v.flip = false; }, 700); },
  _armSay: function () { var C = ReachBackECore, st = this.st; if (st.end !== 'e') return st.vowel ? this._t('aShort', { v: st.vowel }) : ''; return st.vowel ? this._t('aReached', { v: st.vowel }) : this._t('aWaiting'); },
  _wireDrag: function (el, t) {
    var self = this;
    el.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return; if (el.disabled || self.st.done) return;
      var dr = { el: el, t: t, x: e.clientX, y: e.clientY, moved: false, ghost: null };
      self._endDrag(); self._drag = dr;
      dr.move = function (ev) {
        if (!dr.moved && Math.abs(ev.clientX - dr.x) + Math.abs(ev.clientY - dr.y) < 8) return;
        if (!dr.moved) { dr.moved = true; el.classList.add('is-dragging'); var g = document.createElement('div'); g.className = 'rb-ghost is-' + t.k; g.textContent = t.c; document.body.appendChild(g); dr.ghost = g; }
        ev.preventDefault(); dr.ghost.style.left = ev.clientX + 'px'; dr.ghost.style.top = ev.clientY + 'px';
      };
      dr.up = function (ev) {
        var moved = dr.moved, sock = moved ? self._sockAt(ev.clientX, ev.clientY) : null; self._endDrag();
        if (!moved) return; self._dragEl = el; self._dragEnd = Date.now();
        if (sock === (t.k === 'v' ? 'v' : 'e')) self._place(t); else self._paint();
      };
      window.addEventListener('pointermove', dr.move, { passive: false }); window.addEventListener('pointerup', dr.up); window.addEventListener('pointercancel', dr.up);
    });
  },
  _afterDrag: function (el) { return this._dragEl === el && Date.now() - this._dragEnd < 400; },
  _endDrag: function () {
    var dr = this._drag; if (!dr) return;
    window.removeEventListener('pointermove', dr.move); window.removeEventListener('pointerup', dr.up); window.removeEventListener('pointercancel', dr.up);
    if (dr.ghost && dr.ghost.parentNode) dr.ghost.parentNode.removeChild(dr.ghost);
    if (dr.el) dr.el.classList.remove('is-dragging'); this._drag = null;
  },
  _sockAt: function (x, y) { var els = this._wrap ? this._wrap.querySelectorAll('[data-sock]') : []; for (var i = 0; i < els.length; i++) { var r = els[i].getBoundingClientRect(); if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 10 && y <= r.bottom + 10) return els[i].getAttribute('data-sock'); } return null; },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = ReachBackECore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true;
    if (st.clue === 'finish' && st.vowel) this._speak(C.spelled(st));
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); v.nudge = false; v.note = this._t(C.hint(st).key); this._paint(); this.api.announce(v.note); return; }
    if (a.result === 'ok') { this._success(); return; }
    this.api.sound(220); v.nudge = false; v.note = this._t(C.hint(st).key); if (st.clue === 'read') v.wrongK = st.picked;
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = ReachBackECore, st = this.st, v = this._view;
    if (st.clue === 'read') v.ok = this._t('okRead', { word: st.word });
    else v.ok = st.needsE ? this._t('okE', { base: st.base, word: st.word, v: st.answer }) : this._t('okNoE', { word: st.word, v: st.answer });
    this._line.push(st.word);
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3600);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectReachBackCSS() {
  if (typeof document === 'undefined' || document.getElementById('rb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rb-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .rb-wrap:focus{outline:none;} .rb-wrap.is-narrow{gap:9px;}'
  + '.rb-line{position:relative;display:flex;gap:6px;justify-content:center;flex-wrap:wrap;min-height:34px;width:100%;max-width:520px;padding-top:6px;} .rb-string{position:absolute;left:0;right:0;top:6px;height:0;border-top:2px solid #C9B48F;}'
  + '.rb-tag{position:relative;margin-top:2px;padding:2px 8px 3px;border-radius:4px 4px 8px 8px;background:#E3F2EF;box-shadow:0 0 0 1.5px #146B5E;font-family:' + H + ';font-weight:700;font-size:16px;line-height:1.1;color:#0E3B34;} .rb-tag.is-long{background:#FFF1C9;box-shadow:0 0 0 1.5px #A87C12;} .rb-tag::before{content:"";position:absolute;left:50%;top:-6px;width:4px;height:8px;margin-left:-2px;border-radius:2px;background:#8C7A5B;} .rb-wrap.is-tiny .rb-line{display:none;}'
  + '.rb-top{display:flex;justify-content:center;width:100%;} .rb-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.rb-pic{display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #3A2E1F;border-radius:18px;background:#FFF8EC;cursor:pointer;} .rb-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.rb-badge{position:absolute;right:-8px;top:-8px;width:36px;height:36px;border-radius:50%;box-sizing:border-box;border:2px dashed #C9B48F;background:#FFFDF6;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:20px;} .rb-badge.is-name{border:3px solid #C9A54E;background:#FFE9A8;color:#3A2E1F;} .rb-badge.is-short{border:3px solid #146B5E;background:#E3F2EF;color:#0E3B34;} .rb-badge .rb-crown{top:-7px;}'
  + '.rb-wordtag{padding:2px 12px;border-radius:8px;background:#FFF1C9;box-shadow:0 0 0 2px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:22px;color:#2B1D0E;animation:rbClip .3s ease-out;} .rb-wrap.is-fast .rb-wordtag{animation:none;} @keyframes rbClip{from{transform:translateY(-12px);opacity:0;}}'
  + '.rb-railbox{display:flex;justify-content:center;width:100%;padding-top:30px;} .rb-rail{position:relative;display:flex;gap:var(--rb-gap);padding:10px 12px;border-radius:16px;background:linear-gradient(#C99560,#A8743F);box-shadow:inset 0 -4px 0 rgba(58,46,31,.35),0 2px 0 #6B4A26;}'
  + '.rb-sock{position:relative;width:var(--rb-sock);height:var(--rb-sockh);box-sizing:border-box;padding:0;border:0;border-radius:12px;background:#FFF8EC;box-shadow:inset 0 0 0 2px #6B4A26;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:700;font-size:calc(var(--rb-sock) * .6);line-height:1;color:#2B1D0E;}'
  + '.rb-sock.is-empty{background:rgba(255,248,236,.55);box-shadow:inset 0 0 0 2px #6B4A26;outline:2px dashed #FFF8EC;outline-offset:-8px;} .rb-sock.is-vowel:not(:disabled),.rb-sock.is-end:not(:disabled){cursor:pointer;} .rb-sock.is-pulse{animation:rbPulse 1s ease-in-out 2;} @keyframes rbPulse{50%{transform:scale(1.07);}}'
  + '.rb-sock.is-wrong{transform:translateY(-6px);box-shadow:inset 0 0 0 2px #6B4A26,0 0 0 4px #E0503C;} .rb-sock.is-want{box-shadow:inset 0 0 0 2px #6B4A26,0 0 0 4px #E0503C;}'
  + '.rb-groove{position:absolute;top:-16px;left:50%;width:70%;transform:translateX(-50%);} .rb-groove path{stroke:#6B4A26;opacity:.5;}'
  + '.rb-coin{position:relative;display:flex;align-items:center;justify-content:center;width:86%;height:86%;border-radius:10px;font-family:' + H + ';font-weight:800;font-size:calc(var(--rb-sock) * .56);line-height:1;transition:transform .24s, background .24s;}'
  + '.rb-coin.is-short{background:#146B5E;color:#FFF8EC;box-shadow:inset 0 0 0 2px #0E3B34;} .rb-coin.is-name{background:#F2C230;color:#2B1D0E;box-shadow:inset 0 0 0 2px #8A6A10;} .rb-coin.is-flipping{animation:rbFlip .26s ease-in-out;} .rb-wrap.is-fast .rb-coin{animation:none;transition:none;} @keyframes rbFlip{50%{transform:rotateY(90deg);}}'
  + '.rb-crown{display:none;position:absolute;top:-9px;left:50%;width:22px;height:9px;margin-left:-11px;background:#F2C230;clip-path:polygon(0 100%,0 30%,25% 70%,50% 0,75% 70%,100% 30%,100% 100%);} .rb-coin.is-name .rb-crown,.rb-badge.is-name .rb-crown{display:block;} .rb-coin.is-name .rb-crown{background:#8A6A10;top:-11px;width:26px;height:11px;margin-left:-13px;}'
  + '.rb-etile{position:relative;display:flex;align-items:center;justify-content:center;width:86%;height:86%;border-radius:10px;background:linear-gradient(135deg,#F4F6F7,#C8CED3);box-shadow:inset 0 0 0 2px #7D8790;color:#8D96A0;} .rb-etile b{font-family:' + H + ';font-weight:700;font-size:calc(var(--rb-sock) * .5);line-height:1;} .rb-fold{position:absolute;right:3px;top:3px;width:34%;height:34%;} .rb-fold path{stroke:#5E6770;} .rb-fold circle{fill:#5E6770;}'
  + '.rb-ctile{display:flex;align-items:center;justify-content:center;width:86%;height:86%;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #6B4A26;font-family:' + H + ';font-weight:700;font-size:calc(var(--rb-sock) * .5);color:#2B1D0E;}'
  + '.rb-arm{position:absolute;left:12px;bottom:calc(100% - 10px);pointer-events:none;overflow:visible;} .rb-arm svg{display:block;overflow:visible;} .rb-wire{fill:none;stroke:#7D8790;stroke-width:4;stroke-linecap:round;} .rb-hand{fill:#C8CED3;stroke:#5E6770;stroke-width:2;} .rb-arm.is-wait .rb-hand{fill:#FFE9A8;stroke:#C9A54E;}'
  + '.rb-arm.is-swing .rb-wire{stroke-dasharray:400;stroke-dashoffset:400;animation:rbSwing .28s ease-out forwards;} .rb-arm.is-swing .rb-hand{animation:rbHand .3s ease-out;} .rb-wrap.is-fast .rb-arm .rb-wire,.rb-wrap.is-fast .rb-arm .rb-hand{animation:none;stroke-dashoffset:0;} @keyframes rbSwing{to{stroke-dashoffset:0;}} @keyframes rbHand{0%{opacity:0;}70%{opacity:0;}100%{opacity:1;}}'
  + '.rb-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;} .rb-tile{width:var(--rb-tile);height:var(--rb-tileh);padding:0;border:0;border-radius:12px;background:rgba(255,248,236,.6);box-shadow:inset 0 0 0 2px #E2CFAE;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;--rb-sock:var(--rb-tile);}'
  + '.rb-tile .rb-coin,.rb-tile .rb-etile,.rb-tile .rb-ctile{width:100%;height:100%;} .rb-tile.is-used{cursor:default;} .rb-tile.is-dragging{opacity:.4;} .rb-tile:disabled{cursor:default;}'
  + '.rb-ghost{position:fixed;z-index:9999;pointer-events:none;width:52px;height:56px;margin:-28px 0 0 -26px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:30px;box-shadow:0 4px 10px rgba(0,0,0,.25);} .rb-ghost.is-v{background:#146B5E;color:#FFF8EC;} .rb-ghost.is-e{background:#DDE2E6;color:#8D96A0;} .rb-ghost.is-c{background:#FFFDF6;color:#2B1D0E;}'
  + '.rb-choice{display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #3A2E1F;border-radius:16px;background:#FFF8EC;cursor:pointer;} .rb-choice img{display:block;object-fit:contain;pointer-events:none;} .rb-choice.is-sel{border-color:#F4CF62;box-shadow:0 0 0 4px #F4CF62;} .rb-choice.is-right{border-color:#1F8A78;box-shadow:0 0 0 4px #9FD9CC;} .rb-choice.is-wrong{border-color:#E0503C;}'
  + '.rb-foot{display:flex;justify-content:center;width:100%;}'
  + '.rb-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .rb-check:disabled{opacity:.5;cursor:default;}'
  + '.rb-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .rb-note.is-hint{color:#8A3B1F;} .rb-note.is-nudge{color:#5E6770;} .rb-wrap.is-narrow .rb-note{font-size:17px;}'
  + '.rb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.rb-wrap.is-tiny .rb-check{min-width:112px;padding:8px 14px;font-size:20px;} .rb-wrap.is-tiny .rb-rail{padding:8px 12px;} .rb-wrap.is-tiny .rb-tray{gap:8px;}'
  + '.rb-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'rb-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.ReachBackEActivity = ReachBackEActivity;
