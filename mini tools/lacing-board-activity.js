/* =====================================================================
   lacing-board-activity.js — ACTIVITY #47 of the one-by-one rebuild:
   "Bygg ordet av stavelser" (no) → SNØREBRETTET, the lacing board
   (RF.K.2.B, bokmål). Design sheet: docs/activities-rebuild/designs/047-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a lacing card whose holes are scattered syllable
   buttons. Drag the lace's tip (or tap a button) to thread the buttons in
   the order you say the word, then Stram! (pull tight): the right
   beginning stays on the lace and glows, everything from the first wrong
   button on slips back out. When the word is right the buttons slide
   down the lace onto the rail and close up into the word, and the
   finished word hangs on the peg rail. Three levels: Tre ordet ·
   Lureknappen (trick buttons) · Hvor mange knapper? (blank buttons).

   ACTIVITY LAYER ONLY: the model is lacing-board-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.LacingBoardActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var LacingBoardActivity = {
  id: 'lacing-board',
  apparatusClasses: ['lc-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Lacing Board',no:'Snørebrettet'},
    instruction:   {en:'Thread the lace through the syllables in the order you say the word. Then pull it tight.',no:'Tre snøret gjennom stavelsene i den rekkefølgen du sier ordet. Stram det etterpå.'},
    check:         {en:'Pull tight!',no:'Stram!'},
    pThread:       {en:'Thread the word: one syllable at a time.',no:'Tre ordet: én stavelse om gangen.'},
    pDecoy1:       {en:'Thread the word — one button does not belong!',no:'Tre ordet — én knapp hører ikke til!'},
    pDecoy2:       {en:'Thread the word — two buttons do not belong!',no:'Tre ordet — to knapper hører ikke til!'},
    pCount:        {en:'One button for every syllable you say.',no:'Én knapp for hver stavelse du sier.'},
    hintThread:    {en:'Thread the lace through the syllables in the order you say the word.',no:'Tre snøret gjennom stavelsene i samme rekkefølge som du sier ordet.'},
    hintCount:     {en:'Thread the lace through one button for every syllable you say.',no:'Tre snøret gjennom én knapp for hver stavelse du sier.'},
    hintMore:      {en:'The word has more syllables.',no:'Ordet har flere stavelser.'},
    hintHolds:     {en:'The lace holds up to {last}. What comes after {last}?',no:'Snøret sitter fast helt til {last}. Hva kommer etter {last}?'},
    hintFirst:     {en:'Which syllable comes first?',no:'Hvilken stavelse kommer først?'},
    hintDecoy:     {en:'That button is not part of the word.',no:'Den knappen hører ikke til ordet.'},
    hintDecoy2:    {en:'Those buttons are not part of the word.',no:'De knappene hører ikke til ordet.'},
    hintNext:      {en:'The glowing button comes next.',no:'Knappen som lyser, kommer nå.'},
    hintShort:     {en:'The last button got more than one syllable. Thread one more button!',no:'Den siste knappen fikk mer enn én stavelse. Tre én knapp til!'},
    hintLong:      {en:'That button got no syllable. Take it off the lace!',no:'Den knappen fikk ingen stavelse. Ta den av snøret!'},
    hintLong2:     {en:'Those buttons got no syllable. Take them off the lace!',no:'De knappene fikk ingen stavelse. Ta dem av snøret!'},
    hintClap:      {en:'Clap the word: one button for each clap.',no:'Klapp ordet: én knapp for hvert klapp.'},
    okThread:      {en:'{plus} = {word}!',no:'{plus} = {word}!'},
    okCount:       {en:'{word}: {n} syllables — {parts}!',no:'{word}: {n} stavelser — {parts}!'},
    okCountOne:    {en:'{word}: one syllable!',no:'{word}: én stavelse!'},
    setLevel:      {en:'Level',no:'Nivå'},
    lvThread:      {en:'Thread the word',no:'Tre ordet'},
    lvDecoy:       {en:'The trick button',no:'Lureknappen'},
    lvCount:       {en:'How many buttons?',no:'Hvor mange knapper?'},
    setDecoys:     {en:'Trick buttons',no:'Lureknapper'},
    optNone:       {en:'None',no:'Ingen'},
    optOne:        {en:'One',no:'Én'},
    optTwo:        {en:'Two',no:'To'},
    setLayout:     {en:'The buttons',no:'Knappene'},
    optScatter:    {en:'Scattered',no:'Spredt'},
    optRow:        {en:'In a row',no:'På rad'},
    ariaPegs:      {en:'Finished words',no:'Ferdige ord'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',no:'Bilde: {word} — trykk for å høre det'},
    ariaBoard:     {en:'Lacing board with {n} buttons',no:'Snørebrett med {n} knapper'},
    ariaButton:    {en:'Button: {s}, {state}',no:'Knapp: {s}, {state}'},
    ariaThreaded:  {en:'threaded',no:'tredd'},
    ariaLoose:     {en:'not threaded',no:'ikke tredd'},
    ariaBlank:     {en:'blank',no:'tom'},
    ariaLace:      {en:'The lace goes through {list}',no:'Snøret går gjennom {list}'},
    ariaTight:     {en:'The lace is tight: {word}',no:'Snøret er stramt: {word}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'thread', decoys: 'one', layout: 'scatter' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'thread', labelKey: 'lvThread' }, { value: 'decoy', labelKey: 'lvDecoy' }, { value: 'count', labelKey: 'lvCount' }] },
    { key: 'decoys', type: 'choice', labelKey: 'setDecoys', options: [{ value: 'none', labelKey: 'optNone' }, { value: 'one', labelKey: 'optOne' }, { value: 'two', labelKey: 'optTwo' }] },
    { key: 'layout', type: 'choice', labelKey: 'setLayout', options: [{ value: 'scatter', labelKey: 'optScatter' }, { value: 'row', labelKey: 'optRow' }] }
  ],

  OK_MS: 2600, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._shut = false;
    this._pegs = []; this._pegPass = -1; this._popKey = null; this._dragged = false;
    injectLacingCSS();
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
  _lv: function () { return LacingBoardCore.level(this._set('level')); },
  _nDecoys: function () { return { none: 0, one: 1, two: 2 }[this._set('decoys')] === undefined ? 1 : { none: 0, one: 1, two: 2 }[this._set('decoys')]; },
  /* a new deal when the level, the trick buttons (Lureknappen) or the layout (Tre ordet, Lureknappen) change */
  _key: function () { var lv = this._lv(); return lv + (lv === 'decoy' ? '/' + this._nDecoys() : '') + (lv !== 'count' ? '/' + this._set('layout') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'no', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = LacingBoardCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = LacingBoardCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, beats = w.syl.length;
    var nd = r.level === 'decoy' ? this._nDecoys() : 0, row = this._set('layout') === 'row';
    var args = { word: w.word, n: beats, parts: w.syl.join(' · '), plus: w.syl.join(' + ') };
    var pk = r.level === 'count' ? 'pCount' : nd === 2 ? 'pDecoy2' : nd === 1 ? 'pDecoy1' : 'pThread';
    var ck = r.level === 'count' ? (beats === 1 ? 'okCountOne' : 'okCount') : 'okThread';
    return {
      id: 'lacing-board.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._shut = false; tool._popKey = null;
        if (tool._pegPass !== pss) { tool._pegs = []; tool._pegPass = pss; }
        tool.st = C.newState(r, pss, { decoys: nd, row: row }); tool._args = args; tool._ck = ck;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = LacingBoardCore.newState(LacingBoardCore.rounds('thread')[0], 0); this._args = {}; this._ck = 'okThread'; }
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
    var L = this._L = LacingBoardCore.layout(this._width());
    var wrap = api.el('div', 'lc-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['btn', L.btn], ['pic', L.pic], ['bw', L.boardW], ['bh', L.boardH], ['rail', L.rail], ['syl', L.syl]].forEach(function (p) { wrap.style.setProperty('--lc-' + p[0], p[1] + 'px'); });
    var pegs = api.el('div', 'lc-pegs'); pegs.setAttribute('aria-label', this._t('ariaPegs')); this._pegsEl = pegs; wrap.appendChild(pegs);
    var row = api.el('div', 'lc-row'); wrap.appendChild(row);
    var side = api.el('div', 'lc-side'); this._side = side; row.appendChild(side);
    var board = api.el('div', 'lc-board'); this._board = board; row.appendChild(board);
    var note = api.el('div', 'lc-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'lc-ask'); ask.appendChild(note);
    var chk = api.el('button', 'lc-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._tighten(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* every repaint rebuilds the board: put the keyboard focus back on the same button (or the wrapper, which carries the key handler) */
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0]; sel = '.' + cls + (a.hasAttribute('data-id') ? '[data-id="' + a.getAttribute('data-id') + '"]' : ''); }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._board) return;
    var st = this.st, C = LacingBoardCore;
    this._paintPegs(); this._paintSide(); this._paintBoard();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) {
      var a = Object.assign({}, this._args);
      if (st.last && st.last.prefix) a.last = st.r.w.syl[st.last.prefix - 1];
      msg = this._t(h, a);
    }
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty' && st.last.result !== 'more'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintPegs: function () {
    var el = this._pegsEl, self = this; el.innerHTML = '';
    this._pegs.forEach(function (w, i) {
      var c = self.api.el('span', 'lc-peg' + (i === self._pegs.length - 1 && self.st.done ? ' is-new' : ''));
      c.innerHTML = '<i></i><span>' + w.word + '</span>';
      el.appendChild(c);
    });
  },
  _paintSide: function () {
    var self = this, st = this.st, r = st.r, side = this._side;
    side.innerHTML = '';
    var pic = this.api.el('button', 'lc-pic'); pic.type = 'button';
    pic.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(r.w.word); });
    side.appendChild(pic);
    /* count, miss 2: the word, clapped in syllables, above the board */
    if (r.level === 'count' && st.show && st.help >= 2 && !st.done) {
      var ban = this.api.el('div', 'lc-banner'); ban.textContent = r.w.syl.join(' · '); side.appendChild(ban);
    }
  },

  /* ---- the board: buttons, the lace, the tip, the rail ---- */
  _pos: function (b) {
    var L = this._L, st = this.st, k = st.buttons.length, c = LacingBoardCore.centre(b, st.row, k);
    if (st.row) { var aw = L.boardW - L.padL - L.padR, ah = L.boardH - L.padT - L.rail; return { x: L.padL + c.x * aw, y: L.padT + c.y * ah }; }
    var col = b.cell % 3, rw = Math.floor(b.cell / 3);
    return { x: L.padL + (col + 0.5) * L.cellW + b.jx * L.slack, y: L.padT + (rw + 0.5) * L.cellH + b.jy * L.slack };
  },
  /* on the rail, edge to edge, in thread order */
  _railPos: function (i, k) {
    var L = this._L, w = Math.min(L.btn, (L.boardW - L.padL - 16) / Math.max(1, k)), x0 = L.padL + 8 + (L.boardW - L.padL - 16 - w * k) / 2;
    return { x: x0 + w * (i + 0.5), y: L.boardH - L.rail / 2 - 2, w: w };
  },
  _hole: function (p) { return { x: p.x, y: p.y - this._L.btn * 0.2 }; },
  _paintBoard: function () {
    var self = this, st = this.st, r = st.r, C = LacingBoardCore, L = this._L, board = this._board, last = st.last || {}, show = st.show && !st.done;
    board.innerHTML = '';
    board.setAttribute('role', 'group');
    board.setAttribute('aria-label', this._t('ariaBoard', { n: st.buttons.length }));
    var railed = st.done, k = st.path.length;
    /* what Stram! printed (count): on a miss or at success */
    var printed = r.level === 'count' ? (st.done ? r.w.syl.map(function (s) { return [s]; }) : show && last.printed ? last.printed : null) : null;
    var nextGlow = C.glow(st);
    /* the popped buttons hop back once per Stram! — a repaint must not replay the hop */
    var popKey = r.id + '/' + st.misses, freshPop = show && last.popped && this._popKey !== popKey; if (show && last.popped) this._popKey = popKey;
    var pts = [];
    board.insertAdjacentHTML('beforeend', '<span class="lc-rail" aria-hidden="true"></span>');
    var knot = { x: L.padL * 0.42, y: L.boardH / 2 };
    if (railed && this._shut) {
      /* the buttons have closed up into the word; the lace is tied in a bow */
      var card = this.api.el('span', 'lc-word'); card.textContent = r.w.word; card.setAttribute('aria-label', this._t('ariaTight', { word: r.w.word }));
      board.appendChild(card);
      board.insertAdjacentHTML('beforeend', '<svg class="lc-bow" viewBox="0 0 60 40" aria-hidden="true"><path d="M30 20 C18 4 4 8 8 20 C4 32 18 36 30 20 C42 4 56 8 52 20 C56 32 42 36 30 20 Z" fill="#C8553D" stroke="#2A2A35" stroke-width="2.5"/><path d="M27 22 L18 38 M33 22 L42 38" stroke="#C8553D" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="20" r="5" fill="#A8432E" stroke="#2A2A35" stroke-width="2"/></svg>');
    }
    /* DOM (= Tab) order is the cell order, never the word order */
    st.buttons.slice().sort(function (x, y) { return x.cell - y.cell; }).forEach(function (b) {
      var at = st.path.indexOf(b.id), threaded = at >= 0, p = self._pos(b), place = p, wpx = L.btn;
      if (railed && threaded) { var rp = self._railPos(at, k); place = rp; wpx = Math.max(L.btn * 0.62, rp.w); }
      if (railed && self._shut && threaded) return;
      var text = r.level === 'count' ? (printed && threaded ? (printed[at] || []).join('·') : '') : b.text;
      var cls = 'lc-btn' + (threaded ? ' is-threaded' : '') + (railed && threaded ? ' is-railed' : '');
      if (show && threaded && r.level !== 'count' && last.prefix > 0) cls += ' is-right';
      if (nextGlow === b.id) cls += ' is-next';
      if (printed && threaded && printed[at] && printed[at].length > 1) cls += ' is-double';
      if (printed && threaded && printed[at] && !printed[at].length) cls += ' is-blank';
      if (freshPop && last.popped.indexOf(b.id) >= 0) cls += ' is-hop' + (b.s === -1 ? ' is-decoy' : '');
      if (st.done && threaded) cls += ' is-done';
      /* at success the buttons the word did not use fall away, clearing the rail */
      if (st.done && !threaded) cls += ' is-gone';
      var el = self.api.el('button', cls); el.type = 'button'; el.setAttribute('data-id', b.id);
      el.style.left = (place.x - wpx / 2) + 'px'; el.style.top = (place.y - (railed && threaded ? L.btn * 0.62 : L.btn) / 2) + 'px'; el.style.width = wpx + 'px';
      if (!railed || !threaded) el.style.transform = 'rotate(' + (b.rot * 5).toFixed(1) + 'deg)';
      if (railed && threaded) { el.style.setProperty('--fx', (p.x - place.x) + 'px'); el.style.setProperty('--fy', (p.y - place.y) + 'px'); }
      var len = text.length, fs = len > 3 ? Math.max(14, Math.min(L.syl, Math.floor(wpx * 0.8 / (len * 0.6)))) : L.syl;
      el.innerHTML = '<span class="lc-hole"></span><span class="lc-syl" style="font-size:' + fs + 'px">' + text + '</span>';
      el.setAttribute('aria-label', self._t('ariaButton', { s: text || self._t('ariaBlank'), state: self._t(threaded ? 'ariaThreaded' : 'ariaLoose') }));
      self._bindButton(el, b, threaded, at);
      board.appendChild(el);
      if (threaded) pts[at] = railed ? { x: place.x, y: place.y } : self._hole(p);
    });
    /* count, too few: a faint empty hole beside the last threaded button */
    if (r.level === 'count' && show && last.result === 'short' && st.help < 2 && pts.length) {
      var lp = pts[pts.length - 1], gx = lp.x + L.btn * 0.9 > L.boardW - 10 ? lp.x - L.btn * 0.9 : lp.x + L.btn * 0.9;
      board.insertAdjacentHTML('beforeend', '<span class="lc-ghost" aria-hidden="true" style="left:' + (gx - L.btn * 0.25) + 'px;top:' + (lp.y - L.btn * 0.25) + 'px"></span>');
    }
    /* the lace: from the knot through every threaded hole, then 40 px on to the tip */
    var chain = [knot].concat(pts.filter(Boolean));
    if (railed) chain = [knot, { x: knot.x + 14, y: L.boardH - L.rail / 2 - 2 }].concat(this._shut ? [{ x: L.boardW / 2, y: L.boardH - L.rail / 2 - 2 }] : pts);
    var a = chain[chain.length - 1], pv = chain.length > 1 ? chain[chain.length - 2] : { x: a.x - 1, y: a.y }, dx = a.x - pv.x, dy = a.y - pv.y, dl = Math.hypot(dx, dy) || 1;
    var tip = railed ? { x: Math.min(L.boardW - 18, a.x + 40), y: a.y } : this._tipSpot(a, Math.atan2(dy, dx), chain.length > 1);
    if (railed && this._shut) tip = null;
    if (tip) { dx = tip.x - a.x; dy = tip.y - a.y; }
    var svg = '<svg class="lc-lace" viewBox="0 0 ' + L.boardW + ' ' + L.boardH + '" aria-hidden="true"><path d="' + this._curve(tip ? chain.concat([tip]) : chain) + '" fill="none" stroke="#C8553D" stroke-width="' + L.lace + '" stroke-linecap="round" stroke-linejoin="round"/><path d="' + this._curve(tip ? chain.concat([tip]) : chain) + '" fill="none" stroke="#E58A73" stroke-width="2" stroke-linecap="round"/></svg>';
    board.insertAdjacentHTML('afterbegin', svg);
    board.insertAdjacentHTML('beforeend', '<span class="lc-knot" aria-hidden="true" style="left:' + (knot.x - 14) + 'px;top:' + (knot.y - 14) + 'px"></span>');
    var lace = board.querySelector('.lc-lace');
    lace.setAttribute('aria-label', this._t('ariaLace', { list: st.path.map(function (id) { return C.button(st, id).text || self._t('ariaBlank'); }).join(', ') }));
    if (tip) {
      var ang = Math.atan2(dy, dx) * 180 / Math.PI;
      var ag = this.api.el('span', 'lc-aglet'); ag.setAttribute('aria-hidden', 'true');
      ag.style.left = (tip.x - 24) + 'px'; ag.style.top = (tip.y - 24) + 'px';
      ag.innerHTML = '<i style="transform:rotate(' + (ang - 90).toFixed(1) + 'deg)"></i>';
      this._aglet = ag;
      if (!st.done) this._bindAglet(ag);
      board.appendChild(ag);
    }
  },
  /* the tip rests just past the last hole, on a spot that covers no button face (the syllable must stay readable) */
  _tipSpot: function (a, ang, fromHole) {
    var self = this, L = this._L, st = this.st, d = fromHole ? L.btn * 0.5 + 26 : 40, best = null, bs = -Infinity;
    var turns = [0, 0.5, -0.5, 1, -1, 1.5, -1.5, 2, -2, 2.6, -2.6, Math.PI];
    turns.forEach(function (t, q) {
      var x = a.x + Math.cos(ang + t) * d, y = a.y + Math.sin(ang + t) * d;
      if (x < 18 || x > L.boardW - 18 || y < 18 || y > L.boardH - L.rail - 8) return;
      var clear = Infinity;
      st.buttons.forEach(function (b) { var p = self._pos(b); clear = Math.min(clear, Math.hypot(p.x - x, p.y - y) - L.btn / 2); });
      var score = Math.min(clear, 20) * 10 - q;
      if (score > bs) { bs = score; best = { x: x, y: y }; }
    });
    return best || { x: Math.max(18, Math.min(L.boardW - 18, a.x + 40)), y: Math.max(18, Math.min(L.boardH - L.rail - 8, a.y)) };
  },
  /* Catmull-Rom through the points, as cubic Béziers */
  _curve: function (p) {
    if (!p.length) return '';
    var d = 'M' + p[0].x.toFixed(1) + ' ' + p[0].y.toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += ' C' + (p1.x + (p2.x - p0.x) / 6).toFixed(1) + ' ' + (p1.y + (p2.y - p0.y) / 6).toFixed(1) + ' ' + (p2.x - (p3.x - p1.x) / 6).toFixed(1) + ' ' + (p2.y - (p3.y - p1.y) / 6).toFixed(1) + ' ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    return d;
  },

  /* ---- the hand ---- */
  _thread: function (id) {
    if (this._busy || this.st.done) return;
    var b = LacingBoardCore.button(this.st, id);
    if (LacingBoardCore.thread(this.st, id)) { this.api.sound(420); if (b && b.text) this._say(b.text); this._paint(); }
  },
  _unthread: function () { if (this._busy) return; if (LacingBoardCore.unthreadLast(this.st)) { this.api.sound(200); this._paint(); } },
  /* tap a loose button: the lace threads it; tap the LAST threaded button: it comes off; any other threaded button says its syllable */
  _bindButton: function (el, b, threaded, at) {
    var self = this, st = this.st;
    el.addEventListener('click', function () {
      if (self._busy || st.done || self._dragged) return;
      if (!threaded) { self._thread(b.id); return; }
      if (at === st.path.length - 1) { self._unthread(); return; }
      if (b.text) self._say(b.text);
      el.classList.add('is-glint');
    });
  },
  /* the aglet is the drag handle: drop it on a button to thread it */
  _bindAglet: function (ag) {
    var self = this;
    ag.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, br = self._board.getBoundingClientRect(), l0 = parseFloat(ag.style.left), t0 = parseFloat(ag.style.top);
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        moved = true; self._dragged = true; ag.classList.add('is-dragging');
        ag.style.left = (l0 + e.clientX - x0) + 'px'; ag.style.top = (t0 + e.clientY - y0) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (!moved) return;
        setTimeout(function () { self._dragged = false; }, 0);
        var hit = self._buttonAt(e.clientX - br.left, e.clientY - br.top);
        if (hit) self._thread(hit); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  /* the loose button whose face is under the point (within 16 px of its rim) */
  _buttonAt: function (x, y) {
    var self = this, st = this.st, best = null, bd = Infinity, R = this._L.btn / 2 + 16;
    st.buttons.forEach(function (b) { if (st.path.indexOf(b.id) >= 0) return; var p = self._pos(b), d = Math.hypot(p.x - x, p.y - y); if (d < R && d < bd) { bd = d; best = b.id; } });
    return best;
  },
  _onKey: function (ev) {
    if (this.st.done || this._busy || ev.defaultPrevented) return;
    if (ev.key === 'Backspace') { ev.preventDefault(); this._unthread(); }
  },
  _tighten: function () {
    if (this._busy || this.st.done) return;
    var st = this.st, r = st.r, res = LacingBoardCore.tighten(st);
    if (res.right) return this._win();
    this.api.sound(res.kase === 'empty' || res.kase === 'more' ? 460 : 196);
    if (st.help >= 2 && r.level === 'count') this._say(r.w.syl.join(' … '), 0.7);
    if (st.help >= 2 && r.level !== 'count' && st.last && st.last.next) this._say(r.w.syl.map(function (s, i) { return i === st.last.prefix ? s + ' …' : s; }).join(' '), 0.7);
    this._paint();
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._say(r.w.syl.join(' … ') + ' … ' + r.w.word, 0.85);
    this._pegs.push(r.w); if (this._pegs.length > 10) this._pegs.shift();
    this.api.announce(this._t('ariaTight', { word: r.w.word }));
    this._shut = false; this._paint();
    this._later(function () { self._shut = true; self._paint(); }, this._ms(900));
    this._busy = true;
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var lcCssDone = false;
function injectLacingCSS() {
  if (lcCssDone || typeof document === 'undefined') return;
  lcCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.lc-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--lc-ink:#2A2A35;--lc-teal:#146B5E;--lc-coral:#F2784B;--lc-lace:#C8553D;user-select:none;-webkit-user-select:none;}'
  + '.lc-wrap:focus{outline:none;}'
  + '.lc-pegs:empty{display:none;} .lc-pegs{display:flex;gap:10px;overflow-x:auto;align-items:flex-start;min-height:44px;padding:4px 10px 6px;border-radius:8px;background:linear-gradient(#B98A55,#B98A55) 0 8px/100% 5px no-repeat,#FFF8EA;box-shadow:inset 0 0 0 2px #E4D3B0;}'
  + '.lc-peg{position:relative;display:flex;flex-direction:column;align-items:center;flex:none;} .lc-peg i{width:8px;height:12px;border-radius:3px;background:#7A5230;} .lc-peg span{margin-top:-2px;padding:3px 8px;border-radius:5px;background:#FBF3E4;box-shadow:inset 0 0 0 2px var(--lc-ink);font:800 14px/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--lc-ink);white-space:nowrap;transform-origin:top center;} .lc-peg.is-new span{animation:lc-swing 1.2s ease-out;} @keyframes lc-swing{0%{transform:rotate(14deg);}30%{transform:rotate(-9deg);}60%{transform:rotate(5deg);}100%{transform:none;}}'
  + '@media (max-width:339px){.lc-pegs{display:none;}}'
  + '.lc-row{display:flex;gap:14px;align-items:center;justify-content:center;} .is-narrow .lc-row{flex-direction:column;gap:8px;}'
  + '.lc-side{flex:none;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.lc-pic{width:calc(var(--lc-pic) + 16px);height:calc(var(--lc-pic) + 16px);padding:8px;border:0;border-radius:16px;background:#FBF3E4;box-shadow:inset 0 0 0 3px var(--lc-ink),0 4px 0 #D9C7A2;cursor:pointer;} .lc-pic img{width:var(--lc-pic);height:var(--lc-pic);object-fit:contain;display:block;}'
  + '.lc-banner{padding:4px 12px;border-radius:8px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--lc-coral);font:800 20px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--lc-ink);white-space:nowrap;animation:lc-pulse 1.4s ease-in-out infinite;}'
  + '.lc-board{position:relative;flex:none;width:var(--lc-bw);height:var(--lc-bh);border-radius:22px;background:radial-gradient(circle at 30% 20%,#F4E2BE,#EBD3A8 60%,#E2C593);box-shadow:inset 0 0 0 3px #5B4636,inset 0 0 0 9px rgba(255,255,255,.18),0 4px 0 #B8925E;}'
  + '.lc-rail{position:absolute;left:calc(var(--lc-bw) * 0.06);right:calc(var(--lc-bw) * 0.03);bottom:6px;height:calc(var(--lc-rail) - 10px);border-radius:8px;background:#C9A16B;box-shadow:inset 0 2px 0 #9C7542,inset 0 0 0 2px #8A6534;}'
  + '.lc-lace{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;}'
  + '.lc-knot{position:absolute;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#E07A62,var(--lc-lace) 60%,#8E3726);box-shadow:inset 0 0 0 2px var(--lc-ink);z-index:2;}'
  + '.lc-btn{position:absolute;height:var(--lc-btn);padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 40% 30%,#FFFBF0,#FBF3E4 60%,#EADBBE);box-shadow:inset 0 0 0 3px var(--lc-ink),inset 0 0 0 7px #E3CFA7,0 3px 0 #A8865A;cursor:pointer;z-index:2;font:inherit;touch-action:manipulation;transition:box-shadow .15s ease;}'
  + '.lc-hole{position:absolute;left:50%;top:14%;width:calc(var(--lc-btn) * 0.22);height:calc(var(--lc-btn) * 0.22);transform:translateX(-50%);border-radius:50%;background:#3E3328;box-shadow:inset 0 2px 0 #1E1812;}'
  + '.lc-syl{position:absolute;left:4px;right:4px;top:44%;bottom:10%;display:flex;align-items:center;justify-content:center;font:800 var(--lc-syl)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--lc-ink);white-space:nowrap;letter-spacing:-.2px;}'
  + '.lc-btn.is-threaded{box-shadow:inset 0 0 0 3px var(--lc-ink),inset 0 0 0 7px #E3CFA7,0 1px 0 #A8865A,0 0 0 4px rgba(200,85,61,.25);transform-origin:center;} .lc-btn.is-threaded .lc-hole{background:var(--lc-lace);box-shadow:inset 0 0 0 2px #8E3726;}'
  + '.lc-btn.is-right{box-shadow:inset 0 0 0 3px var(--lc-teal),inset 0 0 0 7px #CFE9E2,0 0 0 4px rgba(20,107,94,.35);}'
  + '.lc-btn.is-next{box-shadow:inset 0 0 0 3px var(--lc-coral),inset 0 0 0 7px #FCE1D4,0 0 0 6px rgba(242,120,75,.45);animation:lc-pulse 1s ease-in-out infinite;} @keyframes lc-pulse{50%{filter:brightness(1.12);}}'
  + '.lc-btn.is-double .lc-syl{color:#A6461F;letter-spacing:-.6px;} .lc-btn.is-double{box-shadow:inset 0 0 0 3px #A6461F,inset 0 0 0 7px #F4D9C9,0 0 0 4px rgba(200,85,61,.25);}'
  + '.lc-btn.is-blank{background:#E2DED6;animation:lc-shiver .45s ease-in-out;} @keyframes lc-shiver{25%{translate:0 -3px;}75%{translate:0 3px;}}'
  + '.lc-btn.is-hop{animation:lc-hop .45s ease-out;} .lc-btn.is-hop.is-decoy{animation:lc-hop .45s ease-out,lc-dull .9s ease-out;} @keyframes lc-hop{0%{translate:0 24px;}50%{translate:0 -14px;}100%{translate:0 0;}} @keyframes lc-dull{0%,40%{filter:grayscale(1) brightness(.85);}}'
  + '.lc-btn.is-railed{height:calc(var(--lc-btn) * 0.62);border-radius:12px;animation:lc-slide .45s ease-out;} .lc-btn.is-railed .lc-hole{display:none;} .lc-btn.is-railed .lc-syl{top:0;bottom:0;} @keyframes lc-slide{0%{translate:var(--fx) var(--fy);}}'
  + '.lc-btn.is-gone{animation:lc-gone .35s ease-in forwards;pointer-events:none;} @keyframes lc-gone{100%{opacity:0;translate:0 12px;visibility:hidden;}}'
  + '.lc-btn.is-done{box-shadow:inset 0 0 0 3px var(--lc-teal),inset 0 0 0 6px #CFE9E2;}'
  + '.lc-btn.is-glint .lc-syl{animation:lc-glint .5s ease-out;} @keyframes lc-glint{50%{color:var(--lc-teal);}}'
  + '.lc-ghost{position:absolute;width:calc(var(--lc-btn) * 0.5);height:calc(var(--lc-btn) * 0.5);border-radius:50%;outline:3px dashed var(--lc-coral);outline-offset:-3px;z-index:2;animation:lc-gh 1.4s ease-in-out infinite;} @keyframes lc-gh{0%,100%{opacity:.3;}40%{opacity:1;}}'
  + '.lc-aglet{position:absolute;width:48px;height:48px;z-index:4;cursor:grab;touch-action:none;display:flex;align-items:center;justify-content:center;} .lc-aglet i{display:block;width:14px;height:30px;border-radius:5px 5px 7px 7px;background:linear-gradient(90deg,#AEB5BB,#E4E8EB 45%,#AEB5BB);box-shadow:inset 0 0 0 2px var(--lc-ink);} .lc-aglet.is-dragging{cursor:grabbing;z-index:6;} .lc-aglet.is-dragging i{filter:drop-shadow(0 4px 3px rgba(0,0,0,.3));}'
  + '.lc-aglet::after{content:"";position:absolute;inset:4px;border-radius:50%;box-shadow:0 0 0 2px rgba(242,120,75,.45);animation:lc-gh 2.4s ease-in-out infinite;pointer-events:none;}'
  + '.lc-word{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);padding:4px 18px;border-radius:12px;background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--lc-teal);font:800 calc(var(--lc-syl) + 2px)/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--lc-ink);white-space:nowrap;z-index:3;animation:lc-close .4s ease-out;} @keyframes lc-close{0%{letter-spacing:12px;}}'
  + '.lc-bow{position:absolute;left:calc(var(--lc-bw) * 0.02);bottom:4px;width:54px;height:36px;z-index:3;animation:lc-tie .6s ease-out;} @keyframes lc-tie{0%{transform:scale(.2) rotate(-40deg);}70%{transform:scale(1.1);}}'
  + '.lc-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.lc-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--lc-teal);text-align:center;flex:1;} .lc-note:empty{display:none;} .lc-note.is-ok{font-weight:800;} .lc-note.is-wrong{color:#A6461F;} .is-narrow .lc-note{font-size:15px;text-align:left;}'
  + '.lc-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .lc-check[hidden]{display:none;} .lc-check:disabled{opacity:.5;}'
  + '.lc-btn:focus-visible,.lc-check:focus-visible,.lc-pic:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.lc-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'lc-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.LacingBoardActivity = LacingBoardActivity;
