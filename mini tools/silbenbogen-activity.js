/* =====================================================================
   silbenbogen-activity.js — ACTIVITY #43 of the one-by-one rebuild:
   "Bau das Wort aus Silben" → DIE SCHWUNGBAHN (RF.K.2.B, German only).
   Design sheet: docs/activities-rebuild/designs/043-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the child swings the word — every swing flings the ball
   one arc along the track and leaves a Silbenbogen under the rail. The
   bows ARE the slots and each holds exactly one syllable card, so the
   count is the child's own: a card with nowhere to lie, a bow left empty,
   or a ride that stops at the bow out of place shows the mistake. On a
   right word the ball rides the bows — "schmet … ter … ling" — and the
   word closes up, its first letter growing into the German noun capital.

   ACTIVITY LAYER ONLY: the model is silbenbogen-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.SilbenbogenActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var SilbenbogenActivity = {
  id: 'silbenbogen',
  apparatusClasses: ['sb-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:       {en:'Swing the Syllables',de:'Silben schwingen'},
    instruction: {en:'Listen to the word. Swing one bow for each syllable. Then put the syllables in the bows and let the ball ride!',de:'Hör dir das Wort an. Schwing für jede Silbe einen Bogen. Leg dann die Silben in die Bögen und lass die Kugel fahren!'},
    check:       {en:'Ride!',de:'Fahren!'},
    prompt:      {en:'How many syllables does the word have?',de:'Wie viele Silben hat das Wort?'},
    hintSwing:   {en:'Swing the word: one swing for each syllable!',de:'Schwing das Wort: ein Schwung für jede Silbe!'},
    hintPlace:   {en:'Put the syllables in the bows.',de:'Leg die Silben in die Bögen.'},
    hintTooFew:  {en:'A bow is missing.',de:'Da fehlt ein Bogen.'},
    hintTooMany: {en:'A bow is empty.',de:'Ein Bogen ist leer.'},
    hintOrder:   {en:'Listen closely: which syllable belongs in this bow?',de:'Hör genau: Welche Silbe gehört in diesen Bogen?'},
    hintSwingN:  {en:'Swing along: {n} times!',de:'Schwing mit: {n}-mal!'},
    hintSlices:  {en:'Look at the picture pieces.',de:'Schau auf die Bildstücke.'},
    okWord:      {en:'{sylls}: {Wort}!',de:'{sylls}: {Wort}!'},
    okWord1:     {en:'{Wort}!',de:'{Wort}!'},
    okOne:       {en:'1 syllable!',de:'1 Silbe!'},
    okMany:      {en:'{n} syllables!',de:'{n} Silben!'},
    setLevel:    {en:'Words',de:'Wörter'},
    lvKurz:      {en:'Short',de:'Kurz'},
    lvMittel:    {en:'Medium',de:'Mittel'},
    lvLang:      {en:'Long',de:'Lang'},
    setColours:  {en:'Syllable colours',de:'Silbenfarben'},
    colAus:      {en:'Off',de:'Aus'},
    colBlauRot:  {en:'Blue – red',de:'Blau – Rot'},
    ariaPicture: {en:'{Wort} — tap to hear the word',de:'{Wort} – antippen, dann hörst du das Wort'},
    ariaSwing:   {en:'Swing: one more bow',de:'Schwingen: noch ein Bogen'},
    ariaTrack:   {en:'bows: {b}, filled: {f}',de:'Bögen: {b}, gefüllt: {f}'},
    ariaCard:    {en:'syllable {s}',de:'Silbe {s}'},
    ariaBow:     {en:'bow {i}, empty',de:'Bogen {i}, leer'},
    ariaLine:    {en:'words built',de:'gebaute Wörter'},
    ariaRide:    {en:'{sylls} — {Wort}',de:'{sylls} – {Wort}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'kurz', colours: 'blaurot' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'kurz', labelKey: 'lvKurz' }, { value: 'mittel', labelKey: 'lvMittel' }, { value: 'lang', labelKey: 'lvLang' }] },
    { key: 'colours', type: 'choice', labelKey: 'setColours', options: [{ value: 'aus', labelKey: 'colAus' }, { value: 'blaurot', labelKey: 'colBlauRot' }] }
  ],

  OK_MS: 500, FAST: false,
  BLUE: '#2F6FD6', RED: '#D9452F', TEAL: '#146B5E',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._sel = null; this._line = []; this._riding = -1;
    injectSilbenbogenCSS();
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
  _key: function () { return SilbenbogenCore.level(this._set('level')); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'de', rate: rate || 0.9 }); } catch (e) {} },
  _colour: function (b) { return this._set('colours') === 'aus' ? this.TEAL : (b % 2 ? this.RED : this.BLUE); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = SilbenbogenCore.rounds(k); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = SilbenbogenCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass;
    var args = { sylls: r.word.syl.map(function (s, i) { return i === 0 ? r.word.word.slice(0, s.length) : s; }).join(' – '), Wort: r.word.word, n: r.n };
    return {
      id: 'silbenbogen.' + r.id, promptKey: 'prompt', promptArgs: args, celebrateKey: r.n === 1 ? 'okWord1' : 'okWord', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool._riding = -1; tool.st = C.newState(r, pss); tool._args = args; },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = SilbenbogenCore.newState(SilbenbogenCore.rounds('kurz')[1], 0); this._args = {}; }
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
    var L = this._L = SilbenbogenCore.layout(this._width());
    var wrap = api.el('div', 'sb-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow')); this._wrap = wrap;
    wrap.style.setProperty('--sb-pad', L.pad + 'px'); wrap.style.setProperty('--sb-cw', L.cardW + 'px'); wrap.style.setProperty('--sb-ch', L.cardH + 'px'); wrap.style.setProperty('--sb-cf', L.cardFont + 'px'); wrap.style.setProperty('--sb-pic', L.pic + 'px');
    wrap.addEventListener('keydown', function (ev) {
      if (ev.defaultPrevented || ev.target.tagName === 'INPUT') return;
      if (ev.key === 's' || ev.key === 'S') { ev.preventDefault(); self._swing(); }
      else if (ev.key === 'Backspace') { ev.preventDefault(); for (var b = self.st.bows - 1; b >= 0; b--) if (self.st.beds[b] === null) { self._removeBow(b); break; } }
    });
    var top = api.el('div', 'sb-top'); wrap.appendChild(top);
    var picBtn = api.el('button', 'sb-picture'); picBtn.type = 'button'; picBtn.setAttribute('aria-label', this._t('ariaPicture', { Wort: st.r.word.word }));
    picBtn.innerHTML = '<img class="sb-img" alt="" draggable="false" src="' + this._pic(st.r.word.pic) + '"><span class="sb-speaker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M19 7a8 8 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>';
    picBtn.addEventListener('click', function () { self._hearWord(picBtn); });
    this._picBtn = picBtn; top.appendChild(picBtn);
    var rig = api.el('div', 'sb-rig'); wrap.appendChild(rig);
    var pad = api.el('button', 'sb-pad'); pad.type = 'button'; pad.setAttribute('aria-label', this._t('ariaSwing'));
    pad.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34 Q24 6 40 30" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M33 31 L41 31 L40 23" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    pad.addEventListener('click', function () { self._swing(); });
    /* on phones the pad stands beside the picture, so the track keeps the full width and the fold holds */
    this._pad = pad; (L.mode === 'wide' ? rig : top).appendChild(pad);
    var track = api.el('div', 'sb-track'); this._track = track; rig.appendChild(track);
    this._bindSwipe(track);
    var tray = api.el('div', 'sb-tray'); this._tray = tray; wrap.appendChild(tray);
    var note = api.el('div', 'sb-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'sb-ask'); ask.appendChild(note);
    var chk = api.el('button', 'sb-check'); chk.type = 'button';
    chk.innerHTML = '<svg viewBox="0 0 40 28" aria-hidden="true"><path d="M3 22 H37" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="14" r="7" fill="#FFE7A6"/></svg><span>' + this._t('check') + '</span>';
    chk.addEventListener('click', function () { self._ride(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    var line = api.el('div', 'sb-line'); line.setAttribute('aria-label', this._t('ariaLine')); this._lineEl = line; wrap.appendChild(line);
    api.stage.appendChild(wrap);
    this._paint();
  },

  _paint: function () {
    if (!this._track) return;
    this._paintTrack(); this._paintTray(); this._paintLine();
    var st = this.st, C = SilbenbogenCore, h = C.hint(st), msg = '', sub = '';
    if (st.done) { if (!this._afterOk) { msg = this._t(st.r.n === 1 ? 'okWord1' : 'okWord', this._args); sub = this._t(st.r.n === 1 ? 'okOne' : 'okMany', { n: st.r.n }); } }
    else if (h) msg = this._t(h, { n: st.r.n });
    this._note.innerHTML = '';
    if (msg) { var m = document.createElement('span'); m.textContent = msg; this._note.appendChild(m); }
    if (sub) { var s2 = document.createElement('span'); s2.className = 'sb-count'; s2.textContent = sub; this._note.appendChild(s2); }
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && /tooFew|tooMany|order/.test(st.last && st.last.reason)));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._pad.disabled = !!st.done || st.bows >= C.MAX_BOWS;
    this._pad.classList.toggle('is-pulse', !!(st.show && st.last && st.last.reason === 'noBows'));
  },

  /* the track: the rail, the bows hanging under it, the card beds above it, the ball */
  _paintTrack: function () {
    var self = this, st = this.st, C = SilbenbogenCore, L = this._L, track = this._track;
    var bw = C.bowWidth(L, st.bows), last = st.last || {}, show = st.show && !st.done;
    track.innerHTML = '';
    track.style.setProperty('--sb-bw', bw + 'px');
    track.setAttribute('aria-label', this._t('ariaTrack', { b: st.bows, f: st.beds.filter(function (x) { return x; }).length }));
    var row = this.api.el('div', 'sb-bows'); track.appendChild(row);
    var tooMany = show && last.reason === 'tooMany', stop = show && last.reason === 'order' ? last.stopAt : -1;
    for (var b = 0; b < st.bows; b++) (function (b) {
      var id = st.beds[b], c = id ? C.card(st, id) : null, col = self._colour(b);
      var bow = self.api.el('div', 'sb-bow' + (c ? ' is-full' : ' is-empty') + (tooMany && !c ? ' is-sag' : '') + (b === stop ? ' is-stop' : '') + (self._riding === b ? ' is-lit' : '') + (b === st.bows - 1 && self._justSwung ? ' is-new' : ''));
      bow.setAttribute('data-b', b);
      var bed = self.api.el('button', 'sb-bed'); bed.type = 'button'; bed.setAttribute('data-b', b);
      if (c) {
        bed.innerHTML = self._cardHTML(c, col, bw - 6);
        bed.setAttribute('aria-label', self._t('ariaCard', { s: c.text }));
        self._bindCard(bed, c.id, b);
      } else {
        bed.setAttribute('aria-label', self._t('ariaBow', { i: b + 1 }));
        bed.addEventListener('click', function () { if (self._sel) { var s = self._sel; self._sel = null; self._place(s, b); } else self._removeBow(b); });
      }
      bow.appendChild(bed);
      bow.insertAdjacentHTML('beforeend', '<span class="sb-rail"></span><svg class="sb-arc" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="M6 2 Q50 40 94 2" fill="none" stroke="' + (c || self._set('colours') !== 'aus' ? (c ? col : col) : self.TEAL) + '" stroke-width="' + (c ? 6 : 4) + '"' + (c ? '' : ' stroke-dasharray="7 6"') + ' stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>');
      row.appendChild(bow);
    })(b);
    /* the "missing bow": every bow full, cards left over */
    if (show && last.reason === 'tooFew') { var miss = this.api.el('div', 'sb-bow is-missing'); miss.innerHTML = '<span class="sb-bed sb-ghostbed"></span><span class="sb-rail"></span><svg class="sb-arc" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="M6 2 Q50 40 94 2" fill="none" stroke="#E0662F" stroke-width="4" stroke-dasharray="5 5" vector-effect="non-scaling-stroke"/></svg>'; row.appendChild(miss); }
    /* help 2 (count): ghost bows pulse the right count as rhythm */
    if (show && st.help >= 2 && st.helpKind === 'count') { var gh = this.api.el('div', 'sb-ghosts'); gh.setAttribute('aria-hidden', 'true'); for (var g = 0; g < st.r.n; g++) { var gi = this.api.el('i', 'sb-ghost'); gi.style.animationDelay = (g * 420) + 'ms'; gh.appendChild(gi); } track.appendChild(gh); }
    if (!st.bows) { var rail0 = this.api.el('div', 'sb-rail0'); row.appendChild(rail0); }
    /* the ball sits after the last bow (or rides) */
    var ball = this.api.el('span', 'sb-ball' + (this._justSwung && !this.FAST ? ' is-fly' : '')); ball.setAttribute('aria-hidden', 'true');
    var pos = this._riding >= 0 ? this._riding * bw + bw / 2 - 18 : st.bows * bw + 4;
    if (st.done && this._riding < 0) pos = st.bows * bw + 4;
    ball.style.left = Math.min(pos, Math.max(0, L.track - 40)) + 'px';
    track.appendChild(ball);
    if (show && last.reason === 'order' && last.built) { var bt = this.api.el('div', 'sb-built'); bt.textContent = last.built; track.appendChild(bt); }
    if (st.done) { var wd = this.api.el('div', 'sb-word' + (this.FAST ? '' : ' is-pop')); wd.textContent = st.r.word.word; track.appendChild(wd); }
    this._justSwung = false;
  },
  /* a syllable card; at help 2 (order) its slice of the picture rides on its top edge */
  _cardHTML: function (c, col, width) {
    var L = this._L, w = width || L.cardW, fs = Math.max(14, Math.min(L.cardFont, Math.floor((w - 16) / (c.text.length * 0.6))));
    var st = this.st, slice = st.show && !st.done && st.help >= 2 && st.helpKind === 'order', n = st.r.n;
    return '<span class="sb-card"' + (col ? ' style="color:' + col + '"' : '') + '>' + (slice ? '<span class="sb-slice" style="background-image:url(\'' + this._pic(st.r.word.pic) + '\');background-size:' + (n * 100) + '% auto;background-position:' + (n > 1 ? (c.s / (n - 1)) * 100 : 0) + '% 50%"></span>' : '') + '<span class="sb-syl" lang="de" style="font-size:' + fs + 'px">' + c.text + '</span></span>';
  },
  _paintTray: function () {
    var self = this, st = this.st, C = SilbenbogenCore, tray = this._tray, last = st.last || {};
    tray.innerHTML = '';
    tray.hidden = !!(st.done && !st.tray.length);
    /* every card of the word fits one row: the width follows the syllable count (never below 54 px) */
    var L = this._L, m = st.cards.length, gap = L.mode === 'wide' ? 10 : 8, cw = Math.max(54, Math.min(L.cardW, Math.floor((L.W - 16 - gap * (m - 1)) / m)));
    tray.classList.toggle('is-over', !!(st.show && !st.done && last.reason === 'tooFew'));
    st.tray.forEach(function (id, i) {
      var c = C.card(st, id);
      var b = self.api.el('button', 'sb-tcard' + (self._sel === id ? ' is-sel' : '') + (st.show && last.reason === 'unplaced' && i === 0 ? ' is-bob' : '')); b.type = 'button'; b.setAttribute('data-id', id);
      b.setAttribute('aria-label', self._t('ariaCard', { s: c.text })); b.setAttribute('aria-pressed', self._sel === id ? 'true' : 'false');
      b.style.width = cw + 'px';
      b.innerHTML = self._cardHTML(c, null, cw);
      self._bindCard(b, id, -1);
      tray.appendChild(b);
    });
  },
  _paintLine: function () {
    var self = this, line = this._lineEl;
    line.innerHTML = '';
    line.hidden = !this._line.length;
    this._line.forEach(function (w) {
      var el = self.api.el('span', 'sb-lword'); el.setAttribute('lang', 'de');
      var at = 0;
      w.syl.forEach(function (s, i) { var t = w.word.slice(at, at + s.length); at += s.length; var sp = self.api.el('span', 'sb-lsyl'); sp.textContent = t; sp.style.borderBottomColor = self._colour(i); sp.style.color = self._set('colours') === 'aus' ? '' : self._colour(i); el.appendChild(sp); });
      line.appendChild(el);
    });
  },

  /* ---- the hand ---- */
  _hearWord: function (el) {
    this._say(this.st.r.word.word);
    if (el && !this.FAST) { el.classList.remove('is-hear'); void el.offsetWidth; el.classList.add('is-hear'); }
  },
  _bindSwipe: function (track) {
    var self = this, x0 = 0, y0 = 0, on = false;
    track.addEventListener('pointerdown', function (e) { if (e.target.closest('.sb-bed')) return; on = true; x0 = e.clientX; y0 = e.clientY; });
    track.addEventListener('pointerup', function (e) { if (!on) return; on = false; var dx = e.clientX - x0, dy = e.clientY - y0; if (dx > 30 && Math.abs(dy) < 120) self._swing(); });
    track.addEventListener('pointercancel', function () { on = false; });
  },
  /* a repaint rebuilds the cards: keep the keyboard focus on the same card (or the pad) so S / Backspace keep working */
  _keepFocus: function (fn) {
    var a = document.activeElement, id = a && a.getAttribute && a.getAttribute('data-id'), pad = a === this._pad;
    fn();
    var nx = id ? this._wrap.querySelector('.sb-tcard[data-id="' + id + '"]') : null;
    if (!nx && (pad || (a && this._wrap && !this._wrap.contains(a)))) nx = this._pad.disabled ? this._tray.querySelector('.sb-tcard') : this._pad;
    if (nx && this._wrap.contains(nx)) nx.focus();
  },
  _swing: function () {
    if (this._busy) return;
    var self = this;
    if (SilbenbogenCore.swing(this.st)) { this._justSwung = true; this.api.sound(330 + this.st.bows * 70); this._keepFocus(function () { self._paint(); }); }
  },
  _removeBow: function (b) { if (this._busy) return; var self = this; if (SilbenbogenCore.removeBow(this.st, b)) { this.api.sound(260); this._keepFocus(function () { self._paint(); }); } },
  _place: function (id, b) {
    if (this._busy) return;
    var st = this.st, c = SilbenbogenCore.card(st, id);
    if (SilbenbogenCore.place(st, id, b)) { this.api.sound(520 + b * 40); this._say(c.text, 0.85); this._paint(); var nx = this._tray.querySelector('.sb-tcard'); if (nx) nx.focus(); }
  },
  _bindCard: function (el, id, fromBow) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done) return;
      ev.preventDefault(); ev.stopPropagation();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className = 'sb-tcard sb-dragging'; ghost.style.width = el.offsetWidth + 'px'; ghost.style.height = el.offsetHeight + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - el.offsetHeight / 2) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove();
        el.classList.remove('is-lifted');
        if (!moved) { self._tapCard(id, fromBow, el); return; }
        var b = self._bowAt(e.clientX, e.clientY);
        if (b >= 0) self._place(id, b);
        else if (fromBow >= 0 && self._tray.getBoundingClientRect().top - 20 < e.clientY) { SilbenbogenCore.lift(self.st, fromBow); self._paint(); }
        else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; self._tapCard(id, fromBow, el); });
    el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && fromBow < 0) { ev.preventDefault(); var b = SilbenbogenCore.firstEmpty(self.st); if (b >= 0) self._place(id, b); } });
  },
  _tapCard: function (id, fromBow, el) {
    if (this._busy || this.st.done) return;
    var c = SilbenbogenCore.card(this.st, id);
    this._say(c.text, 0.85);
    if (fromBow >= 0) { if (this._sel && this._sel !== id) { var s = this._sel; this._sel = null; this._place(s, fromBow); return; } SilbenbogenCore.lift(this.st, fromBow); this.api.sound(420); this._paint(); return; }
    this._sel = this._sel === id ? null : id;
    this._paint();
    var nx = this._tray.querySelector('.sb-tcard[data-id="' + id + '"]'); if (nx) nx.focus();
  },
  _bowAt: function (x, y) {
    var bows = this._track.querySelectorAll('.sb-bow[data-b]');
    for (var i = 0; i < bows.length; i++) { var r = bows[i].getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top - 16 && y <= r.bottom + 16) return +bows[i].getAttribute('data-b'); }
    return -1;
  },
  _ride: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, res = SilbenbogenCore.ride(st);
    if (res.ok) return this._win();
    if (res.reason === 'noBows' || res.reason === 'unplaced') { this.api.sound(460); this._paint(); return; }
    this.api.sound(196);
    if (res.reason !== 'order') this._say(st.r.word.syl.join(' … '), 0.7);
    this._paint();
    void self;
  },
  _win: function () {
    var self = this, st = this.st, n = st.r.n, hop = this._ms(450);
    this.api.sound(523);
    this._busy = true; this._paint();
    var step = function (b) {
      if (b >= n) {
        self._riding = -1; self._line.push(st.r.word); if (self._line.length > 6) self._line.shift();
        self._say(st.r.word.word, 0.9);
        self.api.announce(self._t('ariaRide', { sylls: st.r.word.syl.join(', '), Wort: st.r.word.word }));
        self.api.sound(659); self._later(function () { self.api.sound(784); }, 110);
        self._paint();
        self._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, self._ms(self.OK_MS));
        return;
      }
      self._riding = b; self._say(st.r.word.syl[b], 0.85); self._paint();
      if (hop) self._later(function () { step(b + 1); }, hop); else step(b + 1);
    };
    step(0);
  }
};

var sbCssDone = false;
function injectSilbenbogenCSS() {
  if (sbCssDone || typeof document === 'undefined') return;
  sbCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sb-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--sb-ink:#0F4A40;--sb-teal:#146B5E;--sb-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.sb-top{display:flex;justify-content:center;} .sb-picture{position:relative;width:calc(var(--sb-pic) + 16px);height:calc(var(--sb-pic) + 16px);padding:8px;border:0;border-radius:16px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #2A2A35,0 3px 0 #C9B897;cursor:pointer;} .sb-img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.sb-speaker{position:absolute;right:-10px;bottom:-10px;width:44px;height:44px;border-radius:22px;background:var(--sb-teal);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 #0B4A40;} .sb-speaker svg{width:24px;height:24px;}'
  + '.sb-rig{display:flex;align-items:flex-start;gap:12px;padding:10px;border-radius:14px;background:#EAF4FB;box-shadow:inset 0 0 0 2px #C3D9E8;} .is-narrow .sb-rig{flex-direction:column;align-items:stretch;gap:6px;padding:8px 4px;}'
  + '.sb-pad{flex:none;width:var(--sb-pad);height:var(--sb-pad);border:0;border-radius:50%;background:var(--sb-teal);box-shadow:0 4px 0 #0B4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-top:calc(var(--sb-ch) - var(--sb-pad) / 2 + 4px);} .sb-pad svg{width:62%;height:62%;} .sb-pad:disabled{opacity:.45;cursor:default;} .is-narrow .sb-pad{align-self:center;margin-top:0;}'
  + '.sb-pad.is-pulse{animation:sb-pulse 1s ease-in-out 2;} @keyframes sb-pulse{50%{transform:scale(1.12);box-shadow:0 4px 0 #0B4A40,0 0 0 8px rgba(20,107,94,.25);}}'
  + '.sb-track{position:relative;flex:1;min-width:0;min-height:calc(var(--sb-ch) + 52px);padding-bottom:22px;touch-action:pan-y;}'
  + '.sb-bows{display:flex;align-items:flex-start;min-height:calc(var(--sb-ch) + 46px);}'
  + '.sb-bow{position:relative;width:var(--sb-bw);flex:none;display:flex;flex-direction:column;align-items:center;}'
  + '.sb-bed{width:var(--sb-bw);height:var(--sb-ch);padding:0;border:0;border-radius:10px;background:rgba(255,253,246,.6);box-shadow:inset 0 0 0 2px #B9C7D2;cursor:pointer;display:flex;align-items:stretch;justify-content:center;font:inherit;} .sb-bow.is-full .sb-bed{background:none;box-shadow:none;}'
  + '.sb-rail,.sb-rail0{display:block;width:100%;height:6px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #2A2A35;margin-top:4px;} .sb-rail0{width:100%;margin-top:calc(var(--sb-ch) + 4px);}'
  + '.sb-arc{display:block;width:100%;height:30px;margin-top:-2px;}'
  + '.sb-bow.is-new{animation:sb-grow .36s ease-out;} @keyframes sb-grow{0%{opacity:0;transform:translateY(-10px);}100%{opacity:1;transform:none;}}'
  + '.sb-bow.is-sag .sb-arc path{stroke:#9AA3AB;} .sb-bow.is-sag .sb-bed{box-shadow:inset 0 0 0 2px #9AA3AB;background:#E9E9EC;} .sb-bow.is-stop .sb-card{animation:sb-wob .45s ease-in-out 2;box-shadow:inset 0 0 0 3px #E0662F;} @keyframes sb-wob{25%{transform:rotate(-5deg);}75%{transform:rotate(5deg);}}'
  + '.sb-bow.is-missing{opacity:.95;animation:sb-wob 1.2s ease-in-out 2;} .sb-ghostbed{display:block;width:calc(var(--sb-bw) - 6px);height:var(--sb-ch);border-radius:10px;outline:3px dashed #E0662F;outline-offset:-3px;}'
  + '.sb-bow.is-lit .sb-card{background:#FFE7A6;transform:translateY(-4px);}'
  + '.sb-card{position:relative;flex:1;margin:0 3px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #2A2A35,0 3px 0 #C9B897;color:#2A2A35;overflow:hidden;transition:transform .2s ease,background .2s ease;}'
  + '.sb-syl{font-family:\'Andika\',var(--lcs-font-body,Nunito),sans-serif;font-weight:700;line-height:1;white-space:nowrap;} .sb-tray[hidden]{display:none;}'
  + '.sb-slice{position:absolute;left:3px;right:3px;top:3px;height:34%;background-repeat:no-repeat;border-bottom:2px solid #2A2A35;opacity:.95;} .sb-slice + .sb-syl{margin-top:22%;}'
  + '.sb-ball{position:absolute;top:calc(var(--sb-ch) - 32px);width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFD2BE 0 18%,#F2784B 20%);box-shadow:inset 0 0 0 2px #2A2A35;transition:left .36s ease-in-out;pointer-events:none;} .sb-ball.is-fly{animation:sb-fly .36s ease-in-out;} @keyframes sb-fly{50%{transform:translateY(-34px);}}'
  + '.sb-ghosts{position:absolute;left:0;right:0;bottom:-4px;display:flex;gap:6px;justify-content:center;} .sb-ghost{width:40px;height:14px;border-bottom:4px solid #E0662F;border-radius:0 0 40px 40px;animation:sb-gp 1.2s ease-in-out infinite;} @keyframes sb-gp{0%,100%{opacity:.25;}30%{opacity:1;}}'
  + '.sb-built{position:absolute;left:0;bottom:-6px;font:700 15px/1 var(--lcs-font-body,Nunito,sans-serif);color:#A6461F;letter-spacing:.04em;}'
  + '.sb-word{position:absolute;left:0;right:0;bottom:-8px;text-align:center;font-family:\'Andika\',var(--lcs-font-body,Nunito),sans-serif;font-weight:700;font-size:24px;color:var(--sb-ink);} .sb-word.is-pop{animation:sb-pop .4s ease-out;} @keyframes sb-pop{0%{transform:scale(.6);opacity:0;}70%{transform:scale(1.1);}100%{transform:none;opacity:1;}}'
  + '.sb-tray{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:calc(var(--sb-ch) + 12px);padding:6px;border-radius:12px;background:#F4E2C0;box-shadow:inset 0 0 0 2px #C9A97A;} .sb-tray.is-over{box-shadow:inset 0 0 0 3px #E0662F;}'
  + '.sb-tcard{width:var(--sb-cw);height:var(--sb-ch);padding:0;border:0;background:none;display:flex;cursor:grab;touch-action:none;font:inherit;} .sb-tcard.is-sel .sb-card{box-shadow:inset 0 0 0 4px var(--sb-teal),0 3px 0 #0B4A40;transform:translateY(-5px);} .sb-tcard.is-lifted{opacity:.35;} .sb-tcard.is-bob .sb-card{animation:sb-bob .6s ease-in-out 2;} @keyframes sb-bob{50%{transform:translateY(-8px);}}'
  + '.sb-dragging{position:fixed;z-index:50;pointer-events:none;opacity:.92;}'
  + '.is-hear{animation:sb-hear .32s ease-out;} @keyframes sb-hear{40%{transform:translateY(-6px) scale(1.03);}}'
  + '.sb-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.sb-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--sb-ink);text-align:center;flex:1;display:flex;flex-direction:column;gap:2px;} .sb-note:empty{display:none;} .sb-note.is-ok{color:var(--sb-teal);font-weight:800;} .sb-note.is-wrong{color:#A6461F;} .sb-count{font-size:15px;} .is-narrow .sb-note{font-size:15px;text-align:left;}'
  + '.sb-check{min-height:48px;padding:0 18px 0 12px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1.1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;display:flex;align-items:center;gap:8px;} .sb-check svg{width:34px;height:24px;flex:none;} .sb-check[hidden]{display:none;} .sb-check:disabled{opacity:.5;}'
  + '.sb-line{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;padding:6px;} .sb-line[hidden]{display:none;} .sb-lword{display:flex;font-family:\'Andika\',var(--lcs-font-body,Nunito),sans-serif;font-weight:700;font-size:20px;color:var(--sb-ink);} .sb-lsyl{padding:0 1px 3px;border-bottom:3px solid;border-radius:0 0 50% 50%;margin:0 1px;}'
  + '.sb-tcard:focus-visible,.sb-bed:focus-visible,.sb-pad:focus-visible,.sb-check:focus-visible,.sb-picture:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow.sb-wrap{gap:6px;} .is-narrow .sb-tray{gap:8px;flex-wrap:nowrap;}.is-narrow .sb-top{align-items:center;gap:22px;}'
  + '@media (prefers-reduced-motion: reduce){.sb-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'sb-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.SilbenbogenActivity = SilbenbogenActivity;
