/* =====================================================================
   marble-run-activity.js — ACTIVITY #53 of the one-by-one rebuild:
   "Muodosta sana tavuista" (fi) → TAVUKUULARATA, the syllable marble run
   (RF.K.2.B, Finnish). Design sheet: docs/activities-rebuild/designs/053-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: syllables are pieces of a marble track. Lay pieces on
   the six places of the pegboard and press Päästä kuula: the marble
   rolls from the funnel, each piece lights and its syllable joins the
   word strip, and it drops into the picture's cup only when the strip
   says the picture's name. A gap → it falls through; a step of 2 (two
   consonants before the vowel, after the first piece) → it bumps and
   rolls back; a wrong word → it rolls past the cup into the side dish.
   Miss 2: the shadow track (one outline per syllable) and the word in
   pale grey with a divider at each syllable. Right: a marble in the jar.

   ACTIVITY LAYER ONLY: the model is marble-run-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on
   success). Test seams: window.MarbleRunActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var MarbleRunActivity = {
  id: 'marble-run',
  apparatusClasses: ['tmr-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Syllable Marble Run',fi:'Tavukuularata'},
    instruction:   {en:'Build the marble track by putting the syllable pieces in the right order. Then let the marble go.',fi:'Rakenna kuularata laittamalla tavupalat oikeaan järjestykseen. Päästä sitten kuula liikkeelle.'},
    check:         {en:'Let it roll',fi:'Päästä kuula'},
    pShort:        {en:'Build the picture\'s name from the pieces. One piece does not belong.',fi:'Rakenna kuvan nimi paloista. Yksi pala ei kuulu sanaan.'},
    pShortNo:      {en:'Build the picture\'s name from the pieces.',fi:'Rakenna kuvan nimi paloista.'},
    pGuard:        {en:'Build the word. Watch the steps on the pieces.',fi:'Rakenna sana. Katso palojen askelmia.'},
    hintEmpty:     {en:'Build the track from syllables, then let the marble go.',fi:'Rakenna rata tavuista ja päästä sitten kuula.'},
    hintStart:     {en:'The track has to start at the funnel.',fi:'Radan pitää alkaa suppilosta.'},
    hintGap:       {en:'There is a gap in the track.',fi:'Radassa on aukko.'},
    hintStep:      {en:'The marble can\'t get over the step: after the first piece, a new syllable starts with at most one consonant.',fi:'Kuula ei pääse askelman yli: ensimmäisen palan jälkeen uusi tavu alkaa enintään yhdellä konsonantilla.'},
    hintLength:    {en:'The marble read: {read}. Listen carefully: is one of the sounds long or short?',fi:'Kuula luki: {read}. Kuuntele tarkasti: kuuluuko jokin äänne pitkänä vai lyhyenä?'},
    hintOther:     {en:'The marble read: {read}. One piece does not belong to the word.',fi:'Kuula luki: {read}. Yksi pala ei kuulu sanaan.'},
    hintShort:     {en:'The marble read: {read}. The track ended too soon.',fi:'Kuula luki: {read}. Rata loppui liian aikaisin.'},
    hintOrder:     {en:'The marble read: {read}. Change the order of the pieces.',fi:'Kuula luki: {read}. Vaihda palojen järjestystä.'},
    hintShadow:    {en:'Look at the grey lines: one piece for each syllable.',fi:'Katso harmaita viivoja: yksi pala jokaista tavua kohti.'},
    okWord:        {en:'{dash}: {word}! You built the word from syllables.',fi:'{dash}: {word}! Rakensit sanan tavuista.'},
    okOne:         {en:'{word}: one piece, one syllable!',fi:'{word}: yksi pala, yksi tavu!'},
    setLevel:      {en:'Level',fi:'Taso'},
    lvShort:       {en:'Short words',fi:'Lyhyet sanat'},
    lvLong:        {en:'Long words',fi:'Pitkät sanat'},
    lvGuard:       {en:'Syllable guard',fi:'Tavuvahti'},
    setDecoy:      {en:'Extra piece',fi:'Ylimääräinen pala'},
    optNo:         {en:'No',fi:'Ei'},
    optYes:        {en:'Yes',fi:'Kyllä'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',fi:'Kuva: {word} — kuuntele napauttamalla'},
    ariaPlace:     {en:'Place {n} of 6: {s}',fi:'Paikka {n}/6: {s}'},
    ariaEmpty:     {en:'empty',fi:'tyhjä'},
    ariaPiece:     {en:'Piece {s}, step {k} — tap to take it back',fi:'Pala {s}, askelma {k} — ota pois napauttamalla'},
    ariaTrayPiece: {en:'Piece {s}, step {k} — tap to put it on the track',fi:'Pala {s}, askelma {k} — laita radalle napauttamalla'},
    ariaTray:      {en:'Pieces: {n}',fi:'Paloja: {n}'},
    ariaStrip:     {en:'The marble read {read}',fi:'Kuula luki {read}'},
    ariaCup:       {en:'The marble landed in the cup.',fi:'Kuula putosi kuppiin.'},
    ariaJar:       {en:'Marble jar: {count}',fi:'Kuulapurkki: {count}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'short', decoy: 'yes' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'short', labelKey: 'lvShort' }, { value: 'long', labelKey: 'lvLong' }, { value: 'guard', labelKey: 'lvGuard' }] },
    { key: 'decoy', type: 'choice', labelKey: 'setDecoy', options: [{ value: 'no', labelKey: 'optNo' }, { value: 'yes', labelKey: 'optYes' }] }
  ],

  OK_MS: 3000, SEG_MS: 300, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._dragged = false;
    this._jar = 0; this._jarPass = -1; this._view = {};
    injectMarbleCSS();
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
  _lv: function () { return MarbleRunCore.level(this._set('level')); },
  _decoy: function () { return this._set('decoy') !== 'no'; },
  /* a new deal when the level changes, or the decoy at Lyhyet / Pitkät sanat */
  _key: function () { var lv = this._lv(); return lv + (lv === 'guard' ? '' : '/' + (this._decoy() ? 'yes' : 'no')); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'fi', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey.split('/')[0] !== k.split('/')[0]) { this._jar = 0; this._jarPass = -1; } this._pool = MarbleRunCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = MarbleRunCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, dec = this._decoy();
    var args = { word: w.word, dash: w.syl.join('-') };
    var pk = r.level === 'guard' ? 'pGuard' : (dec ? 'pShort' : 'pShortNo');
    return {
      id: 'marble-run.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: w.syl.length === 1 ? 'okOne' : 'okWord', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {};
        if (tool._jarPass !== pss) { tool._jar = 0; tool._jarPass = pss; }
        tool.st = C.newState(r, pss, { decoy: dec }); tool._args = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = MarbleRunCore.rounds('short')[0]; this.st = MarbleRunCore.newState(r0, 0); this._args = { word: r0.w.word, dash: r0.w.syl.join('-') }; }
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
  _fs: function (text) { var L = this._L; return Math.max(16, Math.min(L.fs, Math.floor((L.pw - 22) / (text.length * 0.62)))); },
  _render2: function () {
    var api = this.api, self = this, st = this.st, C = MarbleRunCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width());
    var wrap = api.el('div', 'tmr-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['pw', L.pw], ['ph', L.ph], ['pic', L.pic], ['fun', L.funnel]].forEach(function (p) { wrap.style.setProperty('--tmr-' + p[0], p[1] + 'px'); });
    var top = api.el('div', 'tmr-top'); wrap.appendChild(top);
    var jar = api.el('div', 'tmr-jar'); this._jarEl = jar; top.appendChild(jar);
    var strip = api.el('div', 'tmr-strip'); strip.setAttribute('aria-live', 'polite'); this._stripEl = strip; top.appendChild(strip);
    var board = api.el('div', 'tmr-board'); this._boardEl = board; wrap.appendChild(board);
    var p5 = C.placeXY(L, C.PLACES - 1); board.style.height = (p5.y + L.ph + (L.mode === 'wide' ? 26 : 8)) + 'px';
    var tray = api.el('div', 'tmr-tray'); this._trayEl = tray; wrap.appendChild(tray);
    var cupcell = api.el('div', 'tmr-cupcell'); wrap.appendChild(cupcell);
    var dish = api.el('span', 'tmr-dish'); dish.setAttribute('aria-hidden', 'true'); this._dishEl = dish; cupcell.appendChild(dish);
    var cupwrap = api.el('div', 'tmr-cupwrap'); cupcell.appendChild(cupwrap);
    var pic = api.el('button', 'tmr-pic'); pic.type = 'button'; pic.setAttribute('aria-label', this._t('ariaPicture', { word: st.r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(st.r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(st.r.w.word); }); this._picEl = pic; cupwrap.appendChild(pic);
    var cup = api.el('span', 'tmr-cup'); cup.setAttribute('aria-hidden', 'true'); this._cupEl = cup; cupwrap.appendChild(cup);
    var chk = api.el('button', 'tmr-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._release(); }); this._checkBtn = chk; wrap.appendChild(chk);
    var note = api.el('div', 'tmr-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var marble = api.el('span', 'tmr-marble'); marble.setAttribute('aria-hidden', 'true'); this._marbleEl = marble; wrap.appendChild(marble);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
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
    if (!this._boardEl) return;
    var st = this.st, C = MarbleRunCore;
    this._paintJar(); this._paintStrip(); this._paintBoard(); this._paintTray();
    this._picEl.classList.toggle('is-hop', !!this._view.landed);
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.landed ? this._t(st.r.w.syl.length === 1 ? 'okOne' : 'okWord', this._args) : '');
    else if (h && !this._busy) msg = this._t(h, { read: st.last && st.last.read ? st.last.read : '' });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && ['empty', 'nostart'].indexOf(st.last.result) < 0));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    if (!this._busy) this._parkMarble();
  },
  _paintJar: function () {
    var el = this._jarEl, n = this._jar, html = '<span class="tmr-jarglass" aria-hidden="true">';
    var cols = ['#F2784B', '#146B5E', '#E9B949', '#7A6FB0', '#3E8FC4', '#D35D8C'];
    for (var i = 0; i < Math.min(n, 12); i++) html += '<i style="background:radial-gradient(circle at 35% 30%,#fff 0 18%,' + cols[i % 6] + ' 20%);left:' + (5 + (i % 3) * 11) + 'px;bottom:' + (4 + Math.floor(i / 3) * 9) + 'px"></i>';
    el.innerHTML = html + '</span>';
    el.setAttribute('role', 'img'); el.setAttribute('aria-label', this._t('ariaJar', { count: n }));
  },
  /* the word strip: what the marble read so far; miss 2 adds the word in pale grey with a divider at each syllable */
  _paintStrip: function () {
    var st = this.st, C = MarbleRunCore, el = this._stripEl, v = this._view;
    var read = v.reading !== undefined ? v.reading : (st.done ? st.r.w.word : (st.ride ? st.ride.read : ''));
    var diff = this._busy ? -1 : C.firstDiff(st), html = '';
    if (C.shadowOn(st) && !this._busy) html += '<span class="tmr-ghost" aria-hidden="true">' + st.r.w.syl.map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</span>';
    html += '<span class="tmr-read' + (st.done && v.landed ? ' is-whole' : '') + '">' + read.split('').map(function (ch, i) { return i === diff ? '<u>' + ch + '</u>' : ch; }).join('') + '</span>';
    el.innerHTML = html;
    /* the strip text fits the strip: the read word and the grey word share one size so their letters stay aligned */
    var base = this._L.mode === 'wide' ? 34 : 28, len = read.length, room = el.clientWidth - 30;
    var fs = len && room > 40 ? Math.max(16, Math.min(base, Math.floor(room / (len * 0.6)))) : base;
    var ghost = !!el.querySelector('.tmr-ghost'); el.classList.toggle('has-ghost', ghost);
    if (ghost) fs = Math.min(fs, this._L.mode === 'wide' ? 28 : 22);
    [].forEach.call(el.querySelectorAll('.tmr-read'), function (e) { e.style.fontSize = fs + 'px'; });
    el.setAttribute('aria-label', this._t('ariaStrip', { read: read || this._t('ariaEmpty') }));
  },
  _pieceHTML: function (pc) {
    var ridges = ''; for (var i = 0; i < pc.step; i++) ridges += '<i></i>';
    return '<span class="tmr-step s' + pc.step + '" aria-hidden="true">' + ridges + '</span><span class="tmr-syl" style="font-size:' + this._fs(pc.text) + 'px">' + pc.text + '</span>';
  },
  _paintBoard: function () {
    var self = this, st = this.st, C = MarbleRunCore, L = this._L, el = this._boardEl, v = this._view, ride = st.ride;
    el.innerHTML = '';
    el.insertAdjacentHTML('beforeend', '<span class="tmr-funnel" aria-hidden="true"></span>');
    if (L.perRow < C.PLACES) { var a = C.placeXY(L, L.perRow - 1), b = C.placeXY(L, L.perRow); el.insertAdjacentHTML('beforeend', '<span class="tmr-chute" aria-hidden="true" style="left:' + (b.x + 6) + 'px;top:' + (a.y + L.ph - 6) + 'px;width:' + (a.x + L.pw - b.x - 6) + 'px;height:' + (b.y - a.y - L.ph + 8) + 'px"></span>'); }
    var shadow = C.shadowOn(st) && !this._busy, n = st.r.w.syl.length;
    for (var k = 0; k < C.PLACES; k++) {
      var xy = C.placeXY(L, k), id = st.places[k];
      if (shadow && k < n) el.insertAdjacentHTML('beforeend', '<span class="tmr-shadow" aria-hidden="true" style="left:' + xy.x + 'px;top:' + xy.y + 'px"></span>');
      if (!id) {
        var slot = this.api.el('span', 'tmr-slot' + (ride && ride.stop === 'gap' && ride.at === k && !this._busy ? ' is-gap' : '')); slot.style.left = xy.x + 'px'; slot.style.top = xy.y + 'px';
        slot.setAttribute('data-k', k); slot.setAttribute('aria-label', this._t('ariaPlace', { n: k + 1, s: this._t('ariaEmpty') }));
        el.appendChild(slot); continue;
      }
      var pc = C.byId(st, id), lit = v.lit && v.lit.indexOf(k) >= 0;
      var cls = 'tmr-piece is-placed' + (lit || (st.done && !this._busy) ? ' is-lit' : '') + (ride && !this._busy && ride.stop === 'step' && ride.at === k ? ' is-stepbad' : '') + (ride && !this._busy && ride.stop === 'gap' && ride.at - 1 === k ? ' is-rock' : '');
      var bt = this.api.el('button', cls); bt.type = 'button'; bt.setAttribute('data-id', id); bt.setAttribute('data-k', k);
      bt.style.left = xy.x + 'px'; bt.style.top = xy.y + 'px';
      bt.innerHTML = this._pieceHTML(pc);
      bt.setAttribute('aria-label', this._t('ariaPlace', { n: k + 1, s: this._t('ariaPiece', { s: pc.text, k: pc.step }) }));
      this._bindPiece(bt, id);
      el.appendChild(bt);
    }
  },
  _paintTray: function () {
    var self = this, st = this.st, C = MarbleRunCore, el = this._trayEl;
    el.innerHTML = '';
    el.className = 'tmr-tray' + (st.tray.length && !st.done ? '' : ' is-empty');
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaTray', { n: st.tray.length }));
    if (st.done) return;
    st.tray.forEach(function (id) {
      var pc = C.byId(st, id), b = self.api.el('button', 'tmr-piece'); b.type = 'button'; b.setAttribute('data-id', id);
      b.innerHTML = self._pieceHTML(pc);
      b.setAttribute('aria-label', self._t('ariaTrayPiece', { s: pc.text, k: pc.step }));
      self._bindPiece(b, id);
      el.appendChild(b);
    });
  },

  /* ---- the marble ---- */
  _rel: function (el) { var w = this._wrap.getBoundingClientRect(), r = el.getBoundingClientRect(); return { x: r.left - w.left, y: r.top - w.top, w: r.width, h: r.height }; },
  _placePt: function (k, where) { var b = this._rel(this._boardEl), xy = MarbleRunCore.placeXY(this._L, Math.min(k, MarbleRunCore.PLACES - 1)), L = this._L; return { x: b.x + xy.x + (where === 'in' ? 6 : where === 'out' ? L.pw - 6 : L.pw / 2), y: b.y + xy.y - 6 }; },
  _funnelPt: function () { var b = this._rel(this._boardEl); return { x: b.x + this._L.funnel / 2 + 4, y: b.y + 20 }; },
  _put: function (p, ms) { var m = this._marbleEl; m.style.transitionDuration = (ms || 0) + 'ms'; m.style.transform = 'translate(' + (p.x - 11) + 'px,' + (p.y - 11) + 'px)'; },
  _parkMarble: function () {
    if (!this._marbleEl) return;
    var st = this.st, v = this._view;
    if (st.done && v.landed) { var c = this._rel(this._cupEl); this._put({ x: c.x + c.w / 2, y: c.y + c.h / 2 }, 0); }
    /* after a miss it stays where it stopped, until a move takes the ride away */
    else if (st.ride && !st.done) this._putStop(st.ride);
    else this._put(this._funnelPt(), 0);
  },
  _release: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = MarbleRunCore;
    var res = C.release(st);
    if (res.kase === 'empty' || res.kase === 'nostart') { this.api.sound(460); this._view = {}; this._paint(); return; }
    var ride = res.ride, seg = this._ms(this.SEG_MS), steps = [], t = 0, lit = [], reading = '';
    this._busy = true; this._view = { lit: [], reading: '' }; this._paint();
    var push = function (p, ms, fn) { t += ms; steps.push({ p: p, ms: ms, at: t, fn: fn }); };
    ride.events.forEach(function (ev) {
      if (ev.kind === 'enter') {
        var pc = C.byId(st, st.places[ev.place]);
        push(self._placePt(ev.place, 'in'), seg, function () { lit.push(ev.place); reading += pc.text; self._view.lit = lit.slice(); self._view.reading = reading; self.api.sound(500 + ev.place * 40); self._paintStrip(); self._paintBoard(); });
        push(self._placePt(ev.place, 'out'), seg);
      } else if (ev.kind === 'gap') {
        var g = self._placePt(ev.place, 'mid'), d = self._rel(self._dishEl);
        push(g, seg, function () { self.api.sound(880); });
        push({ x: d.x + d.w / 2, y: d.y + d.h / 2 }, seg * 2, function () { self.api.sound(196); });
      } else if (ev.kind === 'step') {
        push(self._placePt(ev.place, 'in'), seg, function () { self.api.sound(150); });
        push(self._placePt(ev.place - 1, 'mid'), seg * 2);
      } else {
        var cup = self._rel(self._cupEl), dish = self._rel(self._dishEl);
        push(ride.landed ? { x: cup.x + cup.w / 2, y: cup.y + cup.h / 2 } : { x: dish.x + dish.w / 2, y: dish.y + dish.h / 2 }, seg * 2, function () { self.api.sound(ride.landed ? 1046 : 196); });
      }
    });
    this._put(this._funnelPt(), 0);
    var prev = 0;
    steps.forEach(function (s) { self._later(function () { self._put(s.p, s.ms); }, prev); self._later(function () { if (s.fn) s.fn(); }, s.at); prev = s.at; });
    if (res.ok) return this._win(t);
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self._putStop(ride); }, t + this._ms(250));
  },
  /* after a miss the marble stays where it stopped: in the dish, or rolled back before the high step */
  _putStop: function (ride) {
    if (ride.stop === 'step') this._put(this._placePt(ride.at - 1, 'mid'), 0);
    else { var d = this._rel(this._dishEl); this._put({ x: d.x + d.w / 2, y: d.y + d.h / 2 }, 0); }
  },
  _win: function (t) {
    var self = this, st = this.st, r = st.r;
    this._later(function () {
      self._view = { landed: true }; self._jar++;
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._say(r.w.word, 0.85);
      self.api.announce(self._t('ariaCup'));
      self._busy = false; self._paint();
    }, t);
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, t + this._ms(this.OK_MS));
  },

  /* ---- the hand ---- */
  _place: function (id, k) { if (this._busy) return; var C = MarbleRunCore, pc = C.byId(this.st, id); if (k === undefined) k = C.firstFree(this.st); if (k >= 0 && C.place(this.st, id, k)) { this.api.sound(560); if (pc) this._say(pc.text, 1); this._view = {}; this._paint(); } else this._paint(); },
  _remove: function (id) { if (this._busy) return; if (MarbleRunCore.remove(this.st, id)) { this.api.sound(300); this._view = {}; this._paint(); } },
  /* the place nearest a point on the board (within a piece's reach), or -1 */
  _placeAt: function (x, y) {
    var b = this._boardEl.getBoundingClientRect(), L = this._L, best = -1, bd = Infinity;
    for (var k = 0; k < MarbleRunCore.PLACES; k++) { var xy = MarbleRunCore.placeXY(L, k), cx = b.left + xy.x + L.pw / 2, cy = b.top + xy.y + L.ph / 2, d = Math.hypot(cx - x, cy - y); if (d < bd) { bd = d; best = k; } }
    return bd <= Math.max(L.pw, L.ph) ? best : -1;
  },
  _bindPiece: function (b, id) {
    var self = this;
    b.addEventListener('click', function () {
      if (self._busy || self.st.done || self._dragged) return;
      if (self.st.places.indexOf(id) >= 0) self._remove(id); else self._place(id);
    });
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null, r0 = b.getBoundingClientRect();
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = b.cloneNode(true); ghost.className += ' is-ghost'; ghost.style.left = r0.left + 'px'; ghost.style.top = r0.top + 'px'; ghost.style.width = r0.width + 'px'; ghost.style.height = r0.height + 'px'; document.body.appendChild(ghost); b.classList.add('is-lifting'); }
        ghost.style.left = (r0.left + e.clientX - x0) + 'px'; ghost.style.top = (r0.top + e.clientY - y0) + 'px'; e.preventDefault();
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (!moved) return;
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        setTimeout(function () { self._dragged = false; }, 0);
        var k = self._placeAt(e.clientX, e.clientY);
        if (k >= 0) self._place(id, k);
        else if (self.st.places.indexOf(id) >= 0) self._remove(id);
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    if (ev.key === 'Escape' && this._busy) { ev.preventDefault(); this.FAST = true; return; }
    if (this._busy || this.st.done || ev.defaultPrevented) return;
    var t = ev.target, id = t && t.getAttribute ? t.getAttribute('data-id') : null, st = this.st, k = id ? st.places.indexOf(id) : -1;
    if (k >= 0) {
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { ev.preventDefault(); var to = k + (ev.key === 'ArrowRight' ? 1 : -1); if (to >= 0 && to < MarbleRunCore.PLACES) this._place(id, to); return; }
      if (ev.key === 'Delete' || ev.key === 'Backspace') { ev.preventDefault(); this._remove(id); return; }
    }
  }
};

var tmrCssDone = false;
function injectMarbleCSS() {
  if (tmrCssDone || typeof document === 'undefined') return;
  tmrCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.tmr-wrap{position:relative;width:100%;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"top top" "board board" "tray cup" "note check";gap:10px;align-items:center;--tmr-ink:#2A2A35;--tmr-teal:#146B5E;--tmr-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.tmr-wrap.is-narrow{grid-template-areas:"top top" "board board" "cup check" "tray tray" "note note";} .is-narrow .tmr-check{justify-self:end;} .is-narrow .tmr-cupcell{justify-self:start;} .is-narrow .tmr-note{text-align:center;font-size:15px;}'
  + '.tmr-wrap:focus{outline:none;} .tmr-top{grid-area:top;display:flex;align-items:center;gap:10px;} .tmr-board{grid-area:board;} .tmr-tray{grid-area:tray;} .tmr-cupcell{grid-area:cup;} .tmr-check{grid-area:check;} .tmr-note{grid-area:note;}'
  /* the jar and the word strip */
  + '.tmr-jar{flex:none;width:44px;height:48px;} .tmr-jarglass{position:relative;display:block;width:40px;height:44px;margin-left:2px;border-radius:6px 6px 12px 12px;background:rgba(190,225,235,.35);box-shadow:inset 0 0 0 2px #5E7C78,inset 6px 0 0 rgba(255,255,255,.5);} .tmr-jarglass::before{content:"";position:absolute;left:4px;right:4px;top:-5px;height:6px;border-radius:3px;background:#5E7C78;} .tmr-jarglass i{position:absolute;width:10px;height:10px;border-radius:50%;box-shadow:0 0 0 1px rgba(42,42,53,.5);}'
  + '.tmr-strip{position:relative;flex:1;min-width:0;height:52px;padding:0 14px;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--tmr-ink);display:flex;align-items:center;justify-content:flex-start;overflow:hidden;} .is-narrow .tmr-strip{height:44px;font-size:28px;} .is-wide .tmr-strip{font-size:34px;}'
  + '.tmr-read{position:relative;z-index:1;font:800 34px/1 ' + D + ';color:var(--tmr-ink);white-space:nowrap;letter-spacing:.5px;} .is-narrow .tmr-read{font-size:28px;} .tmr-read u{text-decoration:none;box-shadow:inset 0 -4px 0 var(--tmr-coral);} .tmr-read.is-whole{color:var(--tmr-teal);}'
  + '.tmr-strip.has-ghost{flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;} .tmr-ghost{order:2;display:flex;font:800 16px/1 ' + D + ';color:rgba(42,42,53,.45);white-space:nowrap;letter-spacing:.5px;} .tmr-ghost span{padding:0 4px;} .tmr-ghost span + span{box-shadow:-2px 0 0 rgba(20,107,94,.7);} .tmr-strip.has-ghost .tmr-read{line-height:1;}'
  /* the pegboard */
  + '.tmr-board{position:relative;width:100%;border-radius:14px;background-color:#E8D5B0;background-image:radial-gradient(circle,rgba(110,80,40,.28) 2px,transparent 2.5px);background-size:22px 22px;box-shadow:inset 0 0 0 2px var(--tmr-ink);overflow:hidden;}'
  + '.tmr-funnel{position:absolute;left:6px;top:4px;width:var(--tmr-fun);height:44px;background:var(--tmr-teal);clip-path:polygon(0 0,100% 0,72% 100%,28% 100%);}'
  + '.tmr-chute{position:absolute;border:3px solid rgba(110,80,40,.45);border-top:0;border-radius:0 0 18px 18px;}'
  + '.tmr-slot{position:absolute;width:var(--tmr-pw);height:var(--tmr-ph);} .tmr-slot::before,.tmr-slot::after{content:"";position:absolute;bottom:4px;width:8px;height:8px;border-radius:50%;background:rgba(110,80,40,.55);} .tmr-slot::before{left:12px;} .tmr-slot::after{right:12px;} .tmr-slot.is-gap{background:repeating-linear-gradient(45deg,rgba(242,120,75,.18) 0 6px,transparent 6px 12px);border-radius:8px;box-shadow:inset 0 0 0 2px rgba(166,70,31,.6);}'
  + '.tmr-shadow{position:absolute;width:var(--tmr-pw);height:var(--tmr-ph);border-radius:8px;box-shadow:inset 0 0 0 2px rgba(20,107,94,.5);background:rgba(20,107,94,.08);}'
  /* the pieces */
  + '.tmr-piece{position:relative;flex:none;width:var(--tmr-pw);height:var(--tmr-ph);padding:0 0 0 14px;border:0;border-radius:6px 6px 10px 10px;background:linear-gradient(#C9A15A 0 7px,#FFFDF6 7px);box-shadow:inset 0 0 0 2px var(--tmr-ink),0 3px 0 rgba(42,42,53,.22);cursor:pointer;touch-action:none;font:inherit;display:flex;align-items:center;justify-content:center;}'
  + '.tmr-piece.is-placed{position:absolute;} .tmr-syl{font-weight:800;font-family:' + D + ';color:var(--tmr-ink);white-space:nowrap;line-height:1;}'
  + '.tmr-step{position:absolute;left:2px;bottom:3px;width:12px;display:flex;flex-direction:column-reverse;gap:2px;} .tmr-step i{display:block;height:7px;border-radius:2px;background:var(--tmr-ink);} .tmr-step.s2 i{background:#A6461F;}'
  + '.tmr-piece.is-lit{background:linear-gradient(#C9A15A 0 7px,#FFF1C2 7px);} .tmr-piece.is-stepbad{box-shadow:inset 0 0 0 3px #A6461F,0 0 0 4px rgba(242,120,75,.35);} .tmr-piece.is-stepbad .tmr-step i{animation:tmr-glow .8s ease-in-out 3;} @keyframes tmr-glow{50%{background:var(--tmr-coral);}}'
  + '.tmr-piece.is-rock{animation:tmr-rock .4s ease-in-out 2;} @keyframes tmr-rock{25%{rotate:-4deg;}75%{rotate:4deg;}}'
  + '.tmr-piece.is-lifting{opacity:.35;} .tmr-piece.is-ghost{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));}'
  /* the tray, the cup, the dish */
  + '.tmr-tray{min-width:0;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px;border-radius:12px;background:#6B4A2B;box-shadow:inset 0 0 0 3px #4A3220,inset 0 8px 0 rgba(0,0,0,.18);min-height:calc(var(--tmr-ph) + 16px);} .tmr-tray.is-empty{visibility:hidden;} .is-narrow .tmr-tray.is-empty{display:none;}'
  + '.tmr-cupcell{flex:none;display:flex;align-items:flex-end;justify-content:center;gap:10px;}'
  + '.is-narrow .tmr-dish{width:52px;} .is-narrow .tmr-cup{height:24px;} .is-narrow .tmr-tray .tmr-piece{height:46px;} .tmr-dish{width:70px;height:20px;border-radius:0 0 30px 30px;background:#B9C7C5;box-shadow:inset 0 0 0 2px var(--tmr-ink);margin-bottom:4px;}'
  + '.tmr-cupwrap{display:flex;flex-direction:column;align-items:center;}'
  + '.tmr-pic{width:var(--tmr-pic);height:var(--tmr-pic);padding:0;border:0;background:transparent;cursor:pointer;} .tmr-pic img{width:100%;height:100%;object-fit:contain;display:block;} .tmr-pic.is-hop{animation:tmr-hop .7s ease-out;} @keyframes tmr-hop{25%,65%{transform:translateY(-12px);}45%{transform:none;}}'
  + '.tmr-cup{width:calc(var(--tmr-pic) * .7);height:30px;border-radius:0 0 24px 24px;background:var(--tmr-teal);box-shadow:inset 0 0 0 3px var(--tmr-ink);}'
  + '.tmr-marble{position:absolute;left:0;top:0;z-index:6;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 16%,#F7A07C 22%,var(--tmr-coral) 55%,#B9532D);box-shadow:0 2px 3px rgba(0,0,0,.3);pointer-events:none;transition-property:transform;transition-timing-function:linear;}'
  + '.tmr-note{min-height:28px;font:700 17px/1.3 ' + B + ';color:var(--tmr-teal);} .tmr-note:empty{display:none;} .tmr-note.is-ok{font-weight:800;} .tmr-note.is-wrong{color:#A6461F;}'
  + '.tmr-check{justify-self:end;min-height:48px;padding:0 20px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;} .tmr-check[hidden]{display:none;} .tmr-check:disabled{opacity:.5;}'
  + '.tmr-piece:focus-visible,.tmr-check:focus-visible,.tmr-pic:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.tmr-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'tmr-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.MarbleRunActivity = MarbleRunActivity;
