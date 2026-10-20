/* =====================================================================
   clay-snake-activity.js — ACTIVITY #44 of the one-by-one rebuild:
   "Bouw het woord met klankgroepen" → DE KLEISLANG (RF.K.2.B, Dutch).
   Design sheet: docs/activities-rebuild/designs/044-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a clay snake that is always the same length. Tap it and
   the knife chops; tap a seam and the two pieces knead back together. On
   Klaar! the stamp roller prints the klankgroepen onto the child's own
   pieces — two on one piece means a chop is missing, a blank piece means
   one too many. Plakken: lumps pressed onto the board stick only to their
   true neighbours. Hakken met letters: a cut that is not at a seam heals.
   A finished snake curls into a coil on the shelf.

   ACTIVITY LAYER ONLY: the model is clay-snake-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.ClaySnakeActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var ClaySnakeActivity = {
  id: 'clay-snake',
  apparatusClasses: ['cs-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Clay Snake',nl:'De kleislang'},
    instruction:   {en:'Chop the word into parts, or press the parts together into a word.',nl:'Hak het woord in klankgroepen, of plak de klankgroepen aan elkaar tot een woord.'},
    check:         {en:'Done!',nl:'Klaar!'},
    pHak:          {en:'Chop the clay: one piece for every part you hear.',nl:'Hak de klei: één stukje voor elke klankgroep die je hoort.'},
    pPlak:         {en:'Press the pieces together in the right order.',nl:'Plak de stukjes in de goede volgorde.'},
    pLetters:      {en:'Chop the word into parts.',nl:'Hak het woord in klankgroepen.'},
    hintChop:      {en:'Chop the clay: one piece for every part you hear.',nl:'Hak de klei in stukjes: één stukje voor elke klankgroep.'},
    hintPlace:     {en:'Put the pieces on the board.',nl:'Leg de stukjes op de plank.'},
    hintTub:       {en:'There are still pieces in the tub.',nl:'Er liggen nog stukjes in de bak.'},
    hintShort:     {en:'There are more parts in this piece. Chop it!',nl:'In dit stukje zitten nog meer klankgroepen. Hak het door!'},
    hintLong:      {en:'This piece is empty: you have one piece too many. Press it back on.',nl:'Dit stukje is leeg: je hebt een stukje te veel. Plak het er weer aan.'},
    hintClap:      {en:'Clap along with the word and chop where the clay lights up.',nl:'Klap mee met het woord en hak waar de klei oplicht.'},
    hintJoint:     {en:'These two don’t go next to each other.',nl:'Deze twee horen niet naast elkaar.'},
    hintDecoy:     {en:'This piece is not part of this word.',nl:'Dit stukje hoort niet bij dit woord.'},
    hintFirst:     {en:'The word starts with {first}.',nl:'Het woord begint met {first}.'},
    hintHealed:    {en:'It closed again: you cannot chop in the middle of a part.',nl:'Het ging weer dicht: midden in een klankgroep kun je niet hakken.'},
    hintOneOnly:   {en:'{Word} is one part. Don’t chop!',nl:'{Word} is één klankgroep. Niet hakken!'},
    hintDents:     {en:'Chop in the dents.',nl:'Hak in de deukjes.'},
    okHak:         {en:'{word}: {n} parts — {parts}!',nl:'{word}: {n} klankgroepen — {parts}!'},
    okOne:         {en:'{word}: one part!',nl:'{word}: één klankgroep!'},
    okPlak:        {en:'{plus} = {word}!',nl:'{plus} = {word}!'},
    okLetters:     {en:'{bar} — that is how you chop {word}!',nl:'{bar} — zo hak je {word}!'},
    setLevel:      {en:'Level',nl:'Niveau'},
    lvHak:         {en:'Chop',nl:'Hakken'},
    lvPlak:        {en:'Press',nl:'Plakken'},
    lvLetters:     {en:'Chop with letters',nl:'Hakken met letters'},
    setExtra:      {en:'Extra piece',nl:'Extra stukje'},
    optUit:        {en:'Off',nl:'Uit'},
    optAan:        {en:'On',nl:'Aan'},
    setLettersNow: {en:'Letters on the clay',nl:'Letters op de klei'},
    optNa:         {en:'After chopping',nl:'Pas na het hakken'},
    optMeteen:     {en:'Right away',nl:'Meteen'},
    ariaPicture:   {en:'Picture: {word} — tap to hear',nl:'Plaatje: {word} – tik om te horen'},
    ariaSnake:     {en:'Clay snake, pieces: {n}',nl:'Kleislang, aantal stukjes: {n}'},
    ariaPiece:     {en:'Piece {i}: {k}',nl:'Stukje {i}: {k}'},
    ariaBlank:     {en:'empty',nl:'leeg'},
    ariaKnead:     {en:'Knead seam {i} back together',nl:'Naad {i} weer dichtkneden'},
    ariaTub:       {en:'Pieces in the tub: {n}',nl:'Stukjes in de bak: {n}'},
    ariaChopped:   {en:'Pieces: {n}',nl:'Aantal stukjes: {n}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'hak', extra: 'uit', lettersNow: 'na' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'hak', labelKey: 'lvHak' }, { value: 'plak', labelKey: 'lvPlak' }, { value: 'letters', labelKey: 'lvLetters' }] },
    { key: 'extra', type: 'choice', labelKey: 'setExtra', options: [{ value: 'uit', labelKey: 'optUit' }, { value: 'aan', labelKey: 'optAan' }] },
    { key: 'lettersNow', type: 'choice', labelKey: 'setLettersNow', options: [{ value: 'na', labelKey: 'optNa' }, { value: 'meteen', labelKey: 'optMeteen' }] }
  ],

  OK_MS: 2600, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._knife = 0.5; this._shelf = []; this._sel = null;
    injectClaySnakeCSS();
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
  /* the decoy changes the plak pool's tub, so it is part of the pool key */
  _key: function () { var lv = ClaySnakeCore.level(this._set('level')); return lv + (lv === 'plak' ? '/' + (this._set('extra') === 'aan' ? 'decoy' : 'plain') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'nl', rate: rate || 0.9 }); } catch (e) {} },
  _cap: function (s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = ClaySnakeCore.rounds(ClaySnakeCore.level(this._set('level'))); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = ClaySnakeCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.word, decoy = this._set('extra') === 'aan';
    var args = { word: w.word, Word: this._cap(w.word), n: r.n, parts: w.syl.join(' · '), plus: w.syl.join(' + '), bar: w.syl.join(' | '), first: w.syl[0] };
    var ck = r.n === 1 ? 'okOne' : r.level === 'hak' ? 'okHak' : r.level === 'plak' ? 'okPlak' : 'okLetters';
    return {
      id: 'clay-snake.' + r.id, promptKey: r.level === 'hak' ? 'pHak' : r.level === 'plak' ? 'pPlak' : 'pLetters', promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool._knife = 0.5; tool.st = C.newState(r, pss, { decoy: decoy }); tool._args = args; tool._ck = ck; },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = ClaySnakeCore.newState(ClaySnakeCore.rounds('hak')[2], 0); this._args = {}; this._ck = 'okHak'; }
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
    var L = this._L = ClaySnakeCore.layout(this._width());
    var wrap = api.el('div', 'cs-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.level); this._wrap = wrap;
    wrap.style.setProperty('--cs-snake', L.snakeH + 'px'); wrap.style.setProperty('--cs-letter', L.letter + 'px'); wrap.style.setProperty('--cs-pic', L.pic + 'px'); wrap.style.setProperty('--cs-lump', L.lumpH + 'px');
    var main = api.el('div', 'cs-main'), side = api.el('div', 'cs-side');
    /* the picture on its easel */
    var easel = api.el('button', 'cs-easel'); easel.type = 'button'; easel.setAttribute('aria-label', this._t('ariaPicture', { word: r.word.word }));
    easel.innerHTML = '<img class="cs-img" alt="" draggable="false" src="' + this._pic(r.word.pic) + '"><span class="cs-speaker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M19 7a8 8 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>';
    easel.addEventListener('click', function () { self._say(st.r.word.word); if (!self.FAST) { easel.classList.remove('is-hear'); void easel.offsetWidth; easel.classList.add('is-hear'); } });
    var shelf = api.el('div', 'cs-shelf'); shelf.setAttribute('aria-hidden', 'true'); this._shelfEl = shelf;
    var board = api.el('div', 'cs-board'); this._board = board;
    var tub = api.el('div', 'cs-tub'); this._tub = tub;
    var note = api.el('div', 'cs-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var chk = api.el('button', 'cs-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk;
    if (L.mode === 'wide') {
      main.appendChild(shelf); main.appendChild(board); if (r.level === 'plak') main.appendChild(tub);
      side.appendChild(easel); side.appendChild(note); side.appendChild(chk);
      var row = api.el('div', 'cs-row'); row.appendChild(main); row.appendChild(side); wrap.appendChild(row);
    } else {
      var top = api.el('div', 'cs-top'); top.appendChild(easel); wrap.appendChild(top);
      wrap.appendChild(shelf); wrap.appendChild(board); if (r.level === 'plak') wrap.appendChild(tub);
      var ask = api.el('div', 'cs-ask'); ask.appendChild(note); ask.appendChild(chk); wrap.appendChild(ask);
    }
    wrap.addEventListener('keydown', function (ev) { self._key_(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },

  _paint: function () {
    if (!this._board) return;
    var st = this.st, C = ClaySnakeCore;
    if (st.r.level === 'plak') this._paintPlak(); else this._paintSnake();
    this._paintShelf();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) msg = this._t(h, this._args);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && !/empty|tub/.test(st.last.result)));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintShelf: function () {
    var el = this._shelfEl, self = this;
    el.innerHTML = '';
    el.hidden = !this._shelf.length;
    this._shelf.forEach(function (w) {
      var c = self.api.el('span', 'cs-coil');
      c.innerHTML = '<svg viewBox="0 0 40 40"><path d="M20 20 m0 -3 a3 3 0 1 1 -3 3 a6 6 0 1 1 6 6 a9 9 0 1 1 -9 -9 a12 12 0 1 1 12 12" fill="none" stroke="#D9805F" stroke-width="5" stroke-linecap="round"/></svg><span>' + w + '</span>';
      el.appendChild(c);
    });
  },

  /* ---- hak / letters: the snake on the board ---- */
  _paintSnake: function () {
    var self = this, st = this.st, r = st.r, C = ClaySnakeCore, board = this._board, w = r.word, L = st.last || {};
    board.innerHTML = '';
    var area = this.api.el('div', 'cs-snakearea'); this._area = area; board.appendChild(area);
    area.setAttribute('role', 'group'); area.setAttribute('aria-label', this._t('ariaSnake', { n: st.cuts.length + 1 }));
    var letters = r.level === 'letters', cellsW = C.cells(w.word), nc = cellsW.length;
    /* a finished snake closes into ONE smooth piece with the word at word spacing */
    var bounds = st.done ? [0, 1] : [0].concat(st.cuts.map(function (c) { return letters ? c / nc : c; })).concat([1]);
    var stamp = st.show && r.level === 'hak' && L.pieces ? L.pieces : null;
    var help2 = st.show && !st.done && st.help >= 2;
    var printWord = !st.done && (letters || (r.level === 'hak' && (help2 || this._set('lettersNow') === 'meteen')));
    for (var i = 0; i + 1 < bounds.length; i++) (function (i) {
      var a = bounds[i], b = bounds[i + 1];
      var p = self.api.el('div', 'cs-piece' + (i === 0 ? ' is-head' : '') + (i === bounds.length - 2 ? ' is-tail' : ''));
      p.style.left = 'calc(' + (a * 100) + '% + ' + (i ? 4 : 0) + 'px)'; p.style.width = 'calc(' + ((b - a) * 100) + '% - ' + ((i ? 4 : 0) + (i < bounds.length - 2 ? 4 : 0)) + 'px)';
      p.setAttribute('data-i', i);
      if (stamp) {
        var ks = stamp[i] || [];
        if (!ks.length) { p.classList.add('is-blank'); p.setAttribute('aria-label', self._t('ariaPiece', { i: i + 1, k: self._t('ariaBlank') })); }
        else { p.innerHTML = ks.map(function (k) { return '<span class="cs-k">' + k + '</span>'; }).join('<span class="cs-dseam"></span>'); p.setAttribute('aria-label', self._t('ariaPiece', { i: i + 1, k: ks.join(' ') })); if (ks.length > 1) p.classList.add('is-double'); }
      }
      if (st.done) { p.classList.add('is-merged'); p.innerHTML = '<span class="cs-k cs-whole">' + w.word + '</span>'; p.setAttribute('aria-label', w.word); }
      area.appendChild(p);
    })(i);
    /* the printed word: letters evenly spaced along the snake (letters level, done, help 2, or "Meteen") */
    if (printWord && !stamp) {
      var lay = this.api.el('div', 'cs-letters' + (r.level === 'hak' && !help2 && !st.done ? ' is-faint' : '')); lay.setAttribute('aria-hidden', 'true');
      cellsW.forEach(function (c, j) { var s = self.api.el('span', 'cs-cell'); s.textContent = c; s.style.left = ((j + 0.5) / nc * 100) + '%'; lay.appendChild(s); });
      area.appendChild(lay);
    }
    /* seams glowing (help 2) or dimpled (letters, miss 1) */
    var glow = [];
    if (help2) glow = C.seams(w);
    else if (letters && st.show && L.missing) glow = L.missing;
    glow.forEach(function (g) { var d = self.api.el('span', 'cs-glow' + (help2 ? ' is-strong' : '')); d.style.left = (g / nc * 100) + '%'; d.setAttribute('aria-hidden', 'true'); area.appendChild(d); });
    /* healed cuts flash closed */
    if (letters && st.show && L.healed && !this.FAST) L.healed.forEach(function (g) { var h = self.api.el('span', 'cs-heal'); h.style.left = (g / nc * 100) + '%'; area.appendChild(h); });
    /* the seams the child made: tap one to knead it back */
    if (!st.done) st.cuts.forEach(function (c, i) {
      var x = letters ? c / nc : c, b = self.api.el('button', 'cs-seam'); b.type = 'button'; b.style.left = (x * 100) + '%'; b.setAttribute('data-c', i);
      b.setAttribute('aria-label', self._t('ariaKnead', { i: i + 1 }));
      b.addEventListener('click', function (ev) { ev.stopPropagation(); self._knead(i); });
      area.appendChild(b);
    });
    /* the knife */
    var knife = this.api.el('span', 'cs-knife' + (st.show && L.result === 'short' && !st.done ? ' is-pulse' : '')); knife.setAttribute('aria-hidden', 'true'); this._knifeEl = knife;
    var kx = st.show && L.result === 'short' && stamp ? (bounds[bounds.length - 2] + 1) / 2 : this._knife;
    knife.style.left = (kx * 100) + '%'; knife.hidden = !!st.done;
    area.appendChild(knife);
    area.tabIndex = 0;
    area.setAttribute('aria-describedby', '');
    area.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var rr = area.getBoundingClientRect(); self._knife = Math.max(0, Math.min(1, (e.clientX - rr.left) / rr.width)); knife.style.left = (self._knife * 100) + '%'; });
    area.addEventListener('click', function (e) { if (e.target.closest('.cs-seam')) return; var rr = area.getBoundingClientRect(); self._chop((e.clientX - rr.left) / rr.width); });
  },
  /* ---- plak: the row on the board, the lumps in the tub ---- */
  _paintPlak: function () {
    var self = this, st = this.st, C = ClaySnakeCore, board = this._board, tub = this._tub, L = st.last || {};
    board.innerHTML = ''; tub.innerHTML = '';
    var row = this.api.el('div', 'cs-prow'); this._rowEl = row; board.appendChild(row);
    row.insertAdjacentHTML('beforeend', '<span class="cs-start" aria-hidden="true"></span>');
    var J = st.show && L.result === 'joints' ? L.joints : null;
    st.row.forEach(function (id, i) {
      var l = C.lump(st, id), b = self.api.el('button', 'cs-lump is-placed' + (st.locked === id ? ' is-locked' : '') + (st.done ? ' is-merged' : '') + (J && i > 0 && !J[i - 1] ? ' is-crack' : '') + (J && i > 0 && J[i - 1] ? ' is-stuck' : ''));
      b.type = 'button'; b.setAttribute('data-id', id); b.textContent = l.text; b.setAttribute('aria-label', l.text);
      self._bindLump(b, id, true);
      row.appendChild(b);
    });
    if (st.done) { var whole = this.api.el('div', 'cs-wholeword'); whole.textContent = st.r.word.word; board.appendChild(whole); }
    tub.setAttribute('aria-label', this._t('ariaTub', { n: st.tub.length }));
    st.tub.forEach(function (id) {
      var l = C.lump(st, id), b = self.api.el('button', 'cs-lump' + (self._sel === id ? ' is-sel' : '') + (st.show && L.result === 'decoy' && l.s < 0 ? ' is-back' : ''));
      b.type = 'button'; b.setAttribute('data-id', id); b.textContent = l.text; b.setAttribute('aria-label', l.text);
      self._bindLump(b, id, false);
      tub.appendChild(b);
    });
    tub.hidden = st.done && !st.tub.length;
  },

  /* ---- the hand ---- */
  _chop: function (x) {
    if (this._busy) return;
    var res = ClaySnakeCore.chop(this.st, x);
    if (res.result === 'cut') { var had = this._hadFocus(); this.api.sound(900); this.api.announce(this._t('ariaChopped', { n: this.st.cuts.length + 1 })); this._knife = x; this._paint(); if (had) this._area.focus(); }
    else if (res.result === 'refused') { this.api.sound(180); if (this._knifeEl && !this.FAST) { this._knifeEl.classList.remove('is-boing'); void this._knifeEl.offsetWidth; this._knifeEl.classList.add('is-boing'); } }
  },
  _knead: function (i) { if (this._busy) return; var had = this._hadFocus(); if (ClaySnakeCore.knead(this.st, i)) { this.api.sound(300); this._paint(); if (had) this._area.focus(); } },
  /* a repaint rebuilds the snake: ask BEFORE it whether the keyboard was on it, so the arrows / Enter / Backspace keep working */
  _hadFocus: function () { var a = document.activeElement; return !!(a && this._wrap && this._wrap.contains(a) && a.closest && a.closest('.cs-snakearea')); },
  _bindLump: function (el, id, inRow) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done) return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className = 'cs-lump cs-dragging'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - el.offsetHeight / 2) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove(); el.classList.remove('is-lifted');
        if (!moved) { self._tapLump(id, inRow); return; }
        var bb = self._board.getBoundingClientRect();
        if (e.clientY >= bb.top - 16 && e.clientY <= bb.bottom + 16) self._placeAt(id, self._rowIndexAt(e.clientX, id));
        else if (inRow) self._remove(id); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; self._tapLump(id, inRow); });
  },
  _rowIndexAt: function (x, id) {
    var ls = this._rowEl.querySelectorAll('.cs-lump.is-placed'), at = 0;
    for (var i = 0; i < ls.length; i++) { if (ls[i].getAttribute('data-id') === id) continue; var b = ls[i].getBoundingClientRect(); if (x > b.left + b.width / 2) at++; }
    return at;
  },
  _tapLump: function (id, inRow) {
    if (this._busy || this.st.done) return;
    var l = ClaySnakeCore.lump(this.st, id); this._say(l.text, 0.85);
    if (inRow) this._remove(id); else this._placeAt(id, null);
  },
  _placeAt: function (id, at) {
    if (ClaySnakeCore.place(this.st, id, at)) { this.api.sound(520); this._paint(); var nx = this._tub.querySelector('.cs-lump'); if (nx) nx.focus(); }
  },
  _remove: function (id) { if (ClaySnakeCore.remove(this.st, id)) { this.api.sound(300); this._paint(); } },
  _key_: function (ev) {
    var st = this.st, k = ev.key;
    if (st.done || this._busy || ev.defaultPrevented) return;
    if (st.r.level === 'plak') {
      if (k === 'Backspace') { ev.preventDefault(); for (var i = st.row.length - 1; i >= 0; i--) if (st.row[i] !== st.locked) { this._remove(st.row[i]); break; } }
      return;
    }
    if (!this._area || document.activeElement !== this._area) return;
    if (k === 'ArrowLeft' || k === 'ArrowRight') { ev.preventDefault(); this._knife = Math.max(0, Math.min(1, this._knife + (k === 'ArrowLeft' ? -1 : 1) * 12 / 440)); if (this._knifeEl) this._knifeEl.style.left = (this._knife * 100) + '%'; }
    else if (k === 'Enter') { ev.preventDefault(); this._chop(this._knife); }
    else if (k === 'Backspace') {
      ev.preventDefault();
      if (!st.cuts.length) return;
      var nc = ClaySnakeCore.cells(st.r.word.word).length, fx = function (c) { return st.r.level === 'letters' ? c / nc : c; }, best = 0;
      for (var j = 1; j < st.cuts.length; j++) if (Math.abs(fx(st.cuts[j]) - this._knife) < Math.abs(fx(st.cuts[best]) - this._knife)) best = j;
      this._knead(best);
    }
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var st = this.st, res = ClaySnakeCore.check(st);
    if (res.result === 'ok') return this._win();
    this.api.sound(res.result === 'empty' || res.result === 'tub' ? 460 : 196);
    if (st.help >= 2 && st.r.level !== 'plak') this._say(st.r.word.syl.join(' … '), 0.7);
    this._paint();
  },
  _win: function () {
    var self = this, st = this.st;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._say(st.r.word.word, 0.9);
    this._shelf.push(st.r.word.word); if (this._shelf.length > 8) this._shelf.shift();
    this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var csCssDone = false;
function injectClaySnakeCSS() {
  if (csCssDone || typeof document === 'undefined') return;
  csCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.cs-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--cs-ink:#3B2A20;--cs-clay:#D9805F;--cs-teal:#146B5E;user-select:none;-webkit-user-select:none;}'
  + '.cs-row{display:flex;gap:14px;align-items:flex-start;} .cs-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;} .cs-side{width:200px;flex:none;display:flex;flex-direction:column;align-items:center;gap:10px;}'
  + '.cs-top{display:flex;justify-content:center;}'
  + '.cs-easel{position:relative;width:calc(var(--cs-pic) + 20px);height:calc(var(--cs-pic) + 20px);padding:10px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #8C5A2A,0 4px 0 #A06A33;cursor:pointer;} .cs-img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.cs-speaker{position:absolute;right:-10px;bottom:-10px;width:44px;height:44px;border-radius:22px;background:var(--cs-teal);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 #0B4A40;} .cs-speaker svg{width:24px;height:24px;}'
  + '.cs-shelf{display:flex;gap:8px;overflow-x:auto;min-height:44px;padding:4px 8px;border-radius:8px;background:linear-gradient(#E9C99A,#D9B27C);box-shadow:inset 0 -3px 0 #A57E4F;} .cs-shelf[hidden]{display:none;} .cs-coil{display:flex;align-items:center;gap:4px;font:800 14px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--cs-ink);white-space:nowrap;} .cs-coil svg{width:30px;height:30px;}'
  + '@media (max-width:339px){.cs-shelf{display:none;}}'
  + '.cs-board{padding:18px 14px;border-radius:18px;background:repeating-linear-gradient(180deg,rgba(91,70,54,.06) 0 2px,transparent 2px 28px),linear-gradient(#E9C99A,#D9B27C);box-shadow:inset 0 0 0 3px #5B4636,0 4px 0 #A57E4F;}'
  + '.cs-snakearea{position:relative;height:calc(var(--cs-snake) + 34px);cursor:crosshair;outline:none;touch-action:manipulation;} .cs-snakearea:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:4px;border-radius:12px;}'
  + '.cs-piece{position:absolute;top:30px;height:var(--cs-snake);background:linear-gradient(#E9997A,#D9805F 55%,#C26A4C);box-shadow:inset 0 0 0 3px #7A3E2A,inset 0 -5px 0 rgba(0,0,0,.08);border-radius:14px;display:flex;align-items:center;justify-content:center;gap:4px;transition:left .22s ease,width .22s ease;}'
  + '.cs-piece.is-head{border-top-left-radius:calc(var(--cs-snake) / 2);border-bottom-left-radius:calc(var(--cs-snake) / 2);} .cs-piece.is-tail{border-top-right-radius:calc(var(--cs-snake) / 2) 50%;border-bottom-right-radius:calc(var(--cs-snake) / 1.4) 50%;}'
  + '.cs-piece.is-blank{background:linear-gradient(#D7B9A9,#C9A693);animation:cs-crumble .7s ease-in-out 2;} @keyframes cs-crumble{25%{transform:rotate(-3deg) scale(.97);}75%{transform:rotate(3deg) scale(.97);}}'
  + '.cs-piece.is-double{box-shadow:inset 0 0 0 3px #A6461F,inset 0 -5px 0 rgba(0,0,0,.08);} .cs-dseam{width:0;height:70%;border-left:3px dotted #FFF3D6;}'
  + '.cs-k,.cs-cell,.cs-lump,.cs-wholeword{font-family:var(--lcs-font-body,Nunito),sans-serif;font-weight:800;color:var(--cs-ink);} .cs-k{font-size:var(--cs-letter);color:#FFF6E6;text-shadow:0 2px 0 #7A3E2A;}'
  + '.cs-letters{position:absolute;left:0;right:0;top:30px;height:var(--cs-snake);pointer-events:none;} .cs-letters.is-faint{opacity:.4;} .cs-cell{position:absolute;top:50%;transform:translate(-50%,-50%);font-size:var(--cs-letter);color:#FFF6E6;text-shadow:0 2px 0 #7A3E2A;}'
  + '.cs-glow{position:absolute;top:24px;height:calc(var(--cs-snake) + 12px);width:0;border-left:4px dotted rgba(255,231,166,.7);transform:translateX(-2px);pointer-events:none;} .cs-glow.is-strong{border-left-color:#FFE7A6;filter:drop-shadow(0 0 4px #F2C14B);animation:cs-gl 1s ease-in-out infinite;} @keyframes cs-gl{50%{opacity:.4;}}'
  + '.cs-heal{position:absolute;top:30px;height:var(--cs-snake);width:10px;transform:translateX(-5px);background:#D9805F;animation:cs-heal .6s ease-out forwards;pointer-events:none;} @keyframes cs-heal{0%{opacity:1;}100%{opacity:0;}}'
  + '.cs-seam{position:absolute;top:24px;width:44px;height:calc(var(--cs-snake) + 12px);transform:translateX(-22px);border:0;background:none;cursor:pointer;padding:0;z-index:2;} .cs-seam::after{content:"";position:absolute;left:20px;top:2px;bottom:2px;width:4px;border-radius:2px;background:rgba(91,70,54,.35);}'
  + '.cs-knife{position:absolute;top:0;width:12px;height:34px;transform:translateX(-6px);border-radius:6px 6px 3px 3px;background:#B9C1C7;box-shadow:inset 0 0 0 2px #2A2A35;pointer-events:none;transition:left .08s linear;} .cs-knife::before{content:"";position:absolute;left:-4px;top:-8px;width:20px;height:12px;border-radius:6px;background:#A06A33;box-shadow:inset 0 0 0 2px #2A2A35;} .cs-knife.is-pulse{animation:cs-kp .8s ease-in-out infinite;} @keyframes cs-kp{50%{transform:translate(-6px,6px);}} .cs-knife.is-boing{animation:cs-boing .3s ease-out;} @keyframes cs-boing{40%{transform:translate(-6px,-10px);}}'
  + '.cs-prow{display:flex;align-items:center;gap:6px;min-height:calc(var(--cs-lump) + 8px);flex-wrap:wrap;} .cs-start{width:16px;height:16px;border-radius:50%;background:#A57E4F;box-shadow:inset 0 2px 3px rgba(0,0,0,.4);flex:none;}'
  + '.cs-tub{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-content:center;min-height:calc(var(--cs-lump) + 24px);padding:10px;border-radius:14px;background:#9BB3C4;box-shadow:inset 0 0 0 3px #4E6475,inset 0 6px 10px rgba(0,0,0,.18);} .cs-tub[hidden]{display:none;}'
  + '.cs-lump{min-width:72px;height:var(--cs-lump);padding:0 16px;border:0;border-radius:24px;background:linear-gradient(#E9997A,#D9805F 55%,#C26A4C);box-shadow:inset 0 0 0 3px #7A3E2A,0 3px 0 #7A3E2A;font-size:var(--cs-letter);color:#FFF6E6;text-shadow:0 2px 0 #7A3E2A;cursor:grab;touch-action:none;transition:margin .2s ease;} .cs-lump.is-sel{transform:translateY(-6px);} .cs-lump.is-lifted{opacity:.35;} .cs-lump.is-locked{box-shadow:inset 0 0 0 3px #7A3E2A,inset 0 0 0 7px rgba(255,231,166,.6),0 3px 0 #7A3E2A;cursor:default;}'
  + '.cs-lump.is-crack{margin-left:18px;box-shadow:inset 0 0 0 3px #A6461F,0 3px 0 #7A3E2A;animation:cs-spring .4s ease-out;} @keyframes cs-spring{0%{margin-left:0;}60%{margin-left:24px;}100%{margin-left:18px;}} .cs-lump.is-stuck{margin-left:-10px;}'
  + '.cs-lump.is-back{animation:cs-crumble .7s ease-in-out 2;} .cs-lump.is-merged{margin-left:-8px;border-radius:12px;} .cs-wholeword{margin-top:8px;text-align:center;font-size:calc(var(--cs-letter) + 2px);}'
  + '.cs-dragging{position:fixed;z-index:50;pointer-events:none;opacity:.92;}'
  + '.cs-piece.is-merged{transition:none;}'
  + '.is-hear{animation:cs-hear .32s ease-out;} @keyframes cs-hear{40%{transform:translateY(-4px);}}'
  + '.cs-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.cs-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--cs-teal);text-align:center;} .cs-note:empty{display:none;} .cs-note.is-ok{font-weight:800;} .cs-note.is-wrong{color:#A6461F;} .is-narrow .cs-note{flex:1;font-size:15px;text-align:left;}'
  + '.cs-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1.1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .cs-check[hidden]{display:none;} .cs-check:disabled{opacity:.5;}'
  + '.cs-lump:focus-visible,.cs-check:focus-visible,.cs-easel:focus-visible,.cs-seam:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow.cs-wrap{gap:8px;} .is-narrow .cs-board{padding:12px 8px;}'
  + '.cs-whole{letter-spacing:.02em;} .is-plak .cs-lump{font-size:calc(var(--cs-letter) * .8);padding:0 12px;min-width:64px;} .is-plak .cs-lump.is-crack{margin-left:12px;} .is-plak .cs-prow{flex-wrap:nowrap;}'
  + '.is-narrow.is-plak .cs-prow{gap:4px;} .is-narrow.is-plak .cs-lump{font-size:calc(var(--cs-letter) * .78);padding:0 7px;min-width:46px;} .is-narrow.is-plak .cs-lump.is-crack{margin-left:8px;} .is-narrow.is-plak .cs-lump.is-stuck{margin-left:-6px;} .is-narrow .cs-start{width:12px;height:12px;}'
  + '@media (prefers-reduced-motion: reduce){.cs-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'cs-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.ClaySnakeActivity = ClaySnakeActivity;
