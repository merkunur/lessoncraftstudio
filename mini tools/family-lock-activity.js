/* =====================================================================
   family-lock-activity.js — ACTIVITY #51 of the one-by-one rebuild:
   "Forme as sílabas" (pt-BR) → O CADEADO DAS FAMÍLIAS, the syllable-
   family lock (RF.K.2.B, Brazilian Portuguese). Design sheet:
   docs/activities-rebuild/designs/051-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a combination lock whose wheels are famílias silábicas.
   Roll a wheel (drag, flick, the nubs, the keys ↑ ↓) and it clicks one
   syllable at a time — ga ge gi go gu; the plate under the wheels always
   reads what they say right now. Check: right wheels drop a brass pin,
   wrong ones wobble, the case stays shut; at the second miss a gold mark
   sits beside each wrong wheel's right face and the word lies as a ghost
   under the plate. Right: the shackle pops, the glass slides, the
   picture turns, a key with the word drops onto the keyring.

   ACTIVITY LAYER ONLY: the model is family-lock-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.FamilyLockActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var FamilyLockActivity = {
  id: 'family-lock',
  apparatusClasses: ['flk-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Family Lock',pt:'O cadeado das famílias'},
    instruction:   {en:'Roll each wheel to the right syllable. When the plate says the picture\'s name, press Check.',pt:'Gire cada rodinha até a sílaba certa. Quando a plaquinha disser o nome da figura, aperte Verificar.'},
    check:         {en:'Check',pt:'Verificar'},
    pRoll:         {en:'Roll the wheels to make the picture\'s name.',pt:'Gire as rodinhas para formar o nome da figura.'},
    pBuild:        {en:'Put the wheels in the lock in the right order. One wheel is extra.',pt:'Coloque as rodinhas no cadeado na ordem certa. Sobra uma rodinha.'},
    hintRoll:      {en:'Roll the wheels until the plate says the picture\'s name.',pt:'Gire as rodinhas até a plaquinha dizer o nome da figura.'},
    hintMissing:   {en:'A syllable is still missing.',pt:'Ainda falta uma sílaba.'},
    hintPins:      {en:'The wheels with a pin are right. Roll the wheel that wobbles.',pt:'As rodinhas com um pino estão certas. Gire a rodinha que balança.'},
    hintPins3:     {en:'The wheels with a pin are in the right place. Move the wheel that wobbles.',pt:'As rodinhas com um pino estão no lugar certo. Mude de lugar a rodinha que balança.'},
    hintDecoy:     {en:'One wheel is extra: it is not part of {word}.',pt:'Sobra uma rodinha: ela não faz parte de {word}.'},
    hintNotch:     {en:'Roll until the little gold mark is in the window.',pt:'Gire até a marquinha dourada aparecer na janelinha.'},
    hintGhost:     {en:'Look under the plate: the syllables are there in order.',pt:'Olhe embaixo da plaquinha: lá estão as sílabas na ordem certa.'},
    okLine:        {en:'{dash}: {word}! You built the word.',pt:'{dash}: {word}! Você formou a palavra.'},
    setLevel:      {en:'Level',pt:'Nível'},
    lvTwo:         {en:'Two syllables',pt:'Duas sílabas'},
    lvLong:        {en:'Longer words',pt:'Palavras maiores'},
    lvBuild:       {en:'Build the lock',pt:'Monte o cadeado'},
    setNotch:      {en:'Gold mark help',pt:'Ajuda da marquinha'},
    optAfter:      {en:'After two tries',pt:'Depois de duas tentativas'},
    optAlways:     {en:'Always',pt:'Sempre'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',pt:'Figura: {word} — toque para ouvir'},
    ariaWheel:     {en:'Wheel {n} of {total}, {onset} family, showing {syllable}',pt:'Rodinha {n} de {total}, família {onset}, mostrando {syllable}'},
    ariaUp:        {en:'Roll wheel {n} up',pt:'Girar a rodinha {n} para cima'},
    ariaDown:      {en:'Roll wheel {n} down',pt:'Girar a rodinha {n} para baixo'},
    ariaTag:       {en:'{onset} family: show all its syllables',pt:'Família {onset}: mostrar todas as sílabas'},
    ariaPlate:     {en:'The plate reads {reading}',pt:'A plaquinha diz {reading}'},
    ariaSay:       {en:'Hear the plate',pt:'Ouvir a plaquinha'},
    ariaOpen:      {en:'Lock open. The word is {word}.',pt:'Cadeado aberto. A palavra é {word}.'},
    ariaVowels:    {en:'vowel',pt:'das vogais'},
    ariaRing:      {en:'Keyring: {count} keys',pt:'Chaveiro: {count} chaves'},
    ariaRing1:     {en:'Keyring: 1 key',pt:'Chaveiro: 1 chave'},
    ariaKey:       {en:'Key: {word} — tap to hear it',pt:'Chave: {word} — toque para ouvir'},
    ariaSocket:    {en:'Place {n}: {s}',pt:'Lugar {n}: {s}'},
    ariaEmpty:     {en:'empty',pt:'vazio'},
    ariaTray:      {en:'Wheels to place: {n}',pt:'Rodinhas para colocar: {n}'},
    ariaLoose:     {en:'Wheel: {s}',pt:'Rodinha: {s}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'two', notch: 'after' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'two', labelKey: 'lvTwo' }, { value: 'long', labelKey: 'lvLong' }, { value: 'build', labelKey: 'lvBuild' }] },
    { key: 'notch', type: 'choice', labelKey: 'setNotch', options: [{ value: 'after', labelKey: 'optAfter' }, { value: 'always', labelKey: 'optAlways' }] }
  ],

  OK_MS: 3200, FAST: false, FREE_MS: 6000,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._dragged = false;
    this._keys = []; this._keysPass = -1; this._view = {}; this._fan = -1; this._peek = null;
    this._salt = Math.floor(Math.random() * 1e6);
    injectLockCSS();
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
  _lv: function () { return FamilyLockCore.level(this._set('level')); },
  _always: function () { return this._set('notch') === 'always'; },
  _key: function () { return this._lv(); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'pt', rate: rate || 0.9 }); } catch (e) {} },
  _onsetLabel: function (w) { return w.onset ? w.onset + (w.coda ? '_' + w.coda : '') : 'aeiou'; },
  _onsetAria: function (w) { return w.onset ? this._onsetLabel(w) : this._t('ariaVowels'); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._keys = []; this._keysPass = -1; } this._pool = FamilyLockCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = FamilyLockCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w;
    var args = { word: w.word, dash: w.syl.join('-') };
    return {
      id: 'family-lock.' + r.id, promptKey: r.level === 'build' ? 'pBuild' : 'pRoll', promptArgs: args, celebrateKey: 'okLine', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._fan = -1; tool._peek = null;
        if (tool._keysPass !== pss) { tool._keys = []; tool._keysPass = pss; }
        tool.st = C.newState(r, pss, { offsets: C.startOffsets(r.level, pss + self._salt * 7) }); tool._args = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = FamilyLockCore.rounds('two')[0]; this.st = FamilyLockCore.newState(r0, 0); this._args = { word: r0.w.word, dash: r0.w.syl.join('-') }; }
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
  /* wheel / socket sizes for this round: N = 4 wheels are narrower; long syllables widen a socket */
  _sizes: function () {
    var L = this._L, st = this.st, r = st.r, n = r.w.syl.length, avail = L.W - 28;
    if (r.level === 'build') {
      var maxLen = 0; st.wheels.forEach(function (w) { maxLen = Math.max(maxLen, w.text.length); });
      var fs = L.ssyl, sw = Math.max(L.sw, Math.ceil(maxLen * fs * 0.62 + 14));
      var cap = Math.floor((avail - (n - 1) * 8) / n);
      if (sw > cap) { sw = cap; fs = Math.max(16, Math.min(fs, Math.floor((sw - 12) / (maxLen * 0.62)))); }
      /* the tray: all n + 1 wheels on as few rows as fit, never under 44 px; on a phone they lie as low chips */
      var cnt = n + 1, tw = Math.max(44, Math.min(sw, Math.floor((L.W - 16 - (cnt - 1) * 6) / cnt))), tfs = Math.max(16, Math.min(fs, Math.floor((tw - 10) / (maxLen * 0.62))));
      return { w: sw, h: L.sh, fs: fs, nfs: 0, tw: tw, th: L.mode === 'wide' ? L.sh : 52, tfs: tfs };
    }
    var four = n >= 4, maxF = 0; st.wheels.forEach(function (w) { maxF = Math.max(maxF, w.faces[0].length); });
    var ww = four ? L.ww4 : L.ww, f = four ? L.syl4 : L.syl;
    var need = Math.ceil(maxF * f * 0.62 + 10); if (need > ww) ww = Math.min(Math.floor((avail - (n - 1) * 8) / n), need);
    if (maxF * f * 0.62 + 10 > ww) f = Math.max(18, Math.floor((ww - 10) / (maxF * 0.62)));
    return { w: Math.max(46, ww), h: four ? L.wh4 : L.wh, fs: f, nfs: Math.max(14, Math.round(f * 0.55)) };
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st;
    api.stage.innerHTML = '';
    var L = this._L = FamilyLockCore.layout(this._width());
    var Z = this._Z = this._sizes();
    var wrap = api.el('div', 'flk-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['shk', L.mode === 'wide' ? 28 : 20], ['pic', L.pic], ['ww', Z.w], ['wh', Z.h], ['syl', Z.fs], ['nsyl', Z.nfs], ['plate', L.plate], ['tw', Z.tw || 0], ['th', Z.th || 0], ['tfs', Z.tfs || 0]].forEach(function (p) { wrap.style.setProperty('--flk-' + p[0], p[1] + 'px'); });
    var top = api.el('div', 'flk-top'); wrap.appendChild(top);
    var cas = api.el('div', 'flk-case'); this._caseEl = cas; top.appendChild(cas);
    var ring = api.el('div', 'flk-ring'); this._ringEl = ring; top.appendChild(ring);
    var lockCell = api.el('div', 'flk-lockcell'); wrap.appendChild(lockCell);
    var lock = api.el('div', 'flk-lock'); this._lockEl = lock; lockCell.appendChild(lock);
    lock.insertAdjacentHTML('beforeend', '<span class="flk-shackle" aria-hidden="true"></span>');
    var body = api.el('div', 'flk-body'); this._bodyEl = body; lock.appendChild(body);
    var tray = api.el('div', 'flk-tray'); this._trayEl = tray; lockCell.appendChild(tray);
    var side = api.el('div', 'flk-side'); wrap.appendChild(side);
    var plate = api.el('div', 'flk-plate'); this._plateEl = plate; side.appendChild(plate);
    var note = api.el('div', 'flk-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var chk = api.el('button', 'flk-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; side.appendChild(chk); side.appendChild(note);
    var live = api.el('div', 'flk-live'); live.setAttribute('aria-live', 'polite'); this._liveEl = live; wrap.appendChild(live);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    wrap.addEventListener('pointerdown', function (ev) { if (self._fan >= 0 && !(ev.target.closest && (ev.target.closest('.flk-fan') || ev.target.closest('.flk-tag') || ev.target.closest('.flk-win')))) { self._fan = -1; self._paint(); } });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap) { var cls = (a.className || '').split(' ')[0]; sel = '.' + cls + (a.hasAttribute('data-q') ? '[data-q="' + a.getAttribute('data-q') + '"]' : '') + (a.hasAttribute('data-id') ? '[data-id="' + a.getAttribute('data-id') + '"]' : ''); }
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._bodyEl) return;
    var st = this.st, C = FamilyLockCore;
    this._paintCase(); this._paintRing(); this._paintLock(); this._paintTray(); this._paintPlate();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.open ? this._t('okLine', this._args) : '');
    else if (h) msg = this._t(h, this._args);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintCase: function () {
    var self = this, st = this.st, r = st.r, v = this._view, el = this._caseEl;
    el.className = 'flk-case' + (v.open ? ' is-open' : '');
    el.innerHTML = '';
    var pic = this.api.el('button', 'flk-pic' + (v.open ? ' is-turn' : '')); pic.type = 'button';
    pic.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(r.w.word); });
    el.appendChild(pic);
    el.insertAdjacentHTML('beforeend', '<span class="flk-glass" aria-hidden="true"></span><span class="flk-hinge" aria-hidden="true"></span>');
  },
  _paintRing: function () {
    var self = this, el = this._ringEl, keep = this._L.mode === 'narrow' ? 3 : 9;
    el.innerHTML = '';
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._keys.length === 1 ? this._t('ariaRing1') : this._t('ariaRing', { count: this._keys.length }));
    el.insertAdjacentHTML('beforeend', '<span class="flk-rail" aria-hidden="true"></span>');
    var list = this._keys.slice(-keep);
    list.forEach(function (wd, i) {
      var k = self.api.el('button', 'flk-key' + (i === list.length - 1 && self._view.newKey ? ' is-new' : '')); k.type = 'button';
      k.setAttribute('aria-label', self._t('ariaKey', { word: wd }));
      k.innerHTML = '<span class="flk-bow" aria-hidden="true"></span><span class="flk-shaft">' + wd + '</span><span class="flk-bit" aria-hidden="true"></span>';
      k.addEventListener('click', function () { self._peekKey(wd); });
      el.appendChild(k);
    });
  },
  _peekKey: function (wd) {
    var self = this; this._peek = wd; this._say(wd); this.api.sound(880); this._paintPlate();
    this._later(function () { if (self._peek === wd) { self._peek = null; self._paintPlate(); } }, this._ms(1800) || 1);
  },
  _paintLock: function () {
    var self = this, st = this.st, r = st.r, C = FamilyLockCore, v = this._view, lock = this._lockEl, body = this._bodyEl;
    lock.className = 'flk-lock' + (v.open ? ' is-open' : '') + (v.tried ? ' is-try' : '');
    body.innerHTML = '';
    var row = this.api.el('div', 'flk-wheels'); this._rowEl = row; body.appendChild(row);
    var n = r.w.syl.length;
    if (r.level === 'build') {
      row.setAttribute('role', 'group');
      st.sockets.forEach(function (id, q) {
        var sock = self.api.el('div', 'flk-sock'); sock.setAttribute('data-q', q);
        if (id) {
          var w = C.wheel(st, id), cls = 'flk-lw is-seated' + (st.pinned.indexOf(q) >= 0 && (st.show || st.done) ? ' is-pinned' : '') + (st.wobble.indexOf(q) >= 0 && st.show ? ' is-wrong' + (v.tried ? ' is-wob' : '') : '') + (v.gold ? ' is-gold' : '') + (id === 'x' && st.show && st.last && st.last.result === 'decoy' ? ' is-decoy' : '');
          var b = self.api.el('button', cls); b.type = 'button'; b.setAttribute('data-id', id); b.setAttribute('data-q', q);
          if (v.gold) b.style.animationDelay = (q * 0.12) + 's';
          b.innerHTML = '<span class="flk-lwface">' + w.text + '</span><i class="flk-pin" aria-hidden="true"></i>';
          b.setAttribute('aria-label', self._t('ariaSocket', { n: q + 1, s: w.text }));
          self._bindLoose(b, id);
          sock.appendChild(b);
        } else sock.setAttribute('aria-label', self._t('ariaSocket', { n: q + 1, s: self._t('ariaEmpty') }));
        row.appendChild(sock);
      });
      return;
    }
    var always = this._always();
    st.wheels.forEach(function (w, q) {
      var col = self.api.el('div', 'flk-col' + (st.pinned.indexOf(q) >= 0 && (st.show || st.done) ? ' is-pinned' : '') + (st.wobble.indexOf(q) >= 0 && st.show ? ' is-wrong' + (v.tried ? ' is-wob' : '') : '') + (v.gold ? ' is-gold' : ''));
      col.setAttribute('data-q', q);
      if (v.gold) col.style.animationDelay = (q * 0.12) + 's';
      var tag = self.api.el('span', 'flk-tag' + (self._fan === q ? ' is-on' : '')); tag.setAttribute('data-q', q); tag.setAttribute('aria-hidden', 'true');
      tag.innerHTML = '<span>' + self._onsetLabel(w) + '</span>';
      tag.addEventListener('click', function () { self._toggleFan(q); });
      col.appendChild(tag);
      var near = C.notchOn(st, q, always) && w.idx !== w.answer ? C.nearest(w) : 0;
      var up = self.api.el('button', 'flk-nub is-up' + (near < 0 ? ' has-notch' : '')); up.type = 'button'; up.setAttribute('data-q', q); up.setAttribute('aria-label', self._t('ariaUp', { n: q + 1 }));
      up.addEventListener('click', function () { if (!self._dragged) self._roll(q, -1); });
      col.appendChild(up);
      var win = self.api.el('div', 'flk-win'); win.tabIndex = 0; win.setAttribute('data-q', q); win.setAttribute('role', 'spinbutton');
      win.setAttribute('aria-valuetext', C.readingParts(st)[q]);
      win.setAttribute('aria-label', self._t('ariaWheel', { n: q + 1, total: n, onset: self._onsetAria(w), syllable: w.faces[w.idx] }) + '. ' + self._t('ariaTag', { onset: self._onsetAria(w) })); win.setAttribute('aria-expanded', self._fan === q ? 'true' : 'false');
      var strip = self.api.el('div', 'flk-strip');
      var len = w.faces.length;
      for (var k = -2; k <= 2; k++) {
        var fi = ((w.idx + k) % len + len) % len;
        var f = self.api.el('span', 'flk-face' + (k === 0 ? ' is-cur' : ''));
        f.style.setProperty('--k', k);
        f.textContent = w.faces[fi];
        if (fi === w.answer && C.notchOn(st, q, always)) f.classList.add('has-notch');
        strip.appendChild(f);
      }
      win.appendChild(strip);
      win.insertAdjacentHTML('beforeend', '<i class="flk-pin" aria-hidden="true"></i>');
      self._bindWheel(win, strip, q);
      col.appendChild(win);
      var dn = self.api.el('button', 'flk-nub is-dn' + (near > 0 ? ' has-notch' : '')); dn.type = 'button'; dn.setAttribute('data-q', q); dn.setAttribute('aria-label', self._t('ariaDown', { n: q + 1 }));
      dn.addEventListener('click', function () { if (!self._dragged) self._roll(q, 1); });
      col.appendChild(dn);
      row.appendChild(col);
    });
    /* the family fan: the whole família over the wheel, like the chart on the classroom wall */
    if (this._fan >= 0 && st.wheels[this._fan]) {
      var w0 = st.wheels[this._fan], fan = this.api.el('div', 'flk-fan'); fan.setAttribute('role', 'listbox');
      w0.faces.forEach(function (fc, i) {
        var b = self.api.el('button', 'flk-fanface' + (i === w0.idx ? ' is-cur' : '')); b.type = 'button'; b.textContent = fc; b.setAttribute('role', 'option'); b.setAttribute('aria-selected', i === w0.idx ? 'true' : 'false'); b.setAttribute('data-i', i);
        b.addEventListener('click', function () { var q = self._fan; self._fan = -1; self._setFace(q, i); });
        fan.appendChild(b);
      });
      body.appendChild(fan);
      this._placeFan(fan);
    }
  },
  _toggleFan: function (q) { if (this._busy || !this._rollable()) return; this._fan = this._fan === q ? -1 : q; this.api.sound(700); this._paint(); },
  _placeFan: function (fan) {
    var self = this;
    requestAnimationFrame(function () {
      if (!fan.isConnected) return;
      var col = self._rowEl.querySelector('.flk-col[data-q="' + self._fan + '"]'); if (!col) return;
      var br = self._bodyEl.getBoundingClientRect(), cr = col.querySelector('.flk-win').getBoundingClientRect(), fr = fan.getBoundingClientRect(), fw = fr.width;
      fan.style.top = (cr.top - br.top + cr.height / 2 - fr.height / 2) + 'px';
      var x = cr.left + cr.width / 2 - br.left - fw / 2, wr = self._wrap.getBoundingClientRect();
      x = Math.max(wr.left - br.left, Math.min(x, wr.right - br.left - fw));
      fan.style.left = x + 'px';
    });
  },
  _paintTray: function () {
    var self = this, st = this.st, C = FamilyLockCore, el = this._trayEl;
    el.innerHTML = '';
    if (st.r.level !== 'build' || st.done) { el.className = 'flk-tray is-empty'; return; }
    el.className = 'flk-tray' + (st.tray.length ? '' : ' is-empty');
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaTray', { n: st.tray.length }));
    st.tray.forEach(function (id) {
      var w = C.wheel(st, id), b = self.api.el('button', 'flk-lw'); b.type = 'button'; b.setAttribute('data-id', id);
      b.innerHTML = '<span class="flk-lwface">' + w.text + '</span>';
      b.setAttribute('aria-label', self._t('ariaLoose', { s: w.text }));
      self._bindLoose(b, id);
      el.appendChild(b);
    });
  },
  _paintPlate: function () {
    var self = this, st = this.st, C = FamilyLockCore, el = this._plateEl, v = this._view;
    el.innerHTML = '';
    var parts = C.readingParts(st), text;
    if (this._peek) text = this._peek;
    else if (st.done && v.closed && !v.freeMoved) text = st.r.w.word;
    else if (st.done && v.open && !v.freeMoved) text = parts.join(' · ');
    else text = parts.join('·');
    el.className = 'flk-plate' + (st.done && v.closed && !v.freeMoved ? ' is-word' : '') + (this._peek ? ' is-peek' : '');
    var rd = this.api.el('span', 'flk-read'); rd.textContent = text; el.appendChild(rd);
    var room = el.clientWidth - 70, fs = this._L.plate; if (room > 40 && text.length * fs * 0.6 > room) fs = Math.max(16, Math.floor(room / (text.length * 0.6))); rd.style.fontSize = fs + 'px';
    el.setAttribute('aria-label', this._t('ariaPlate', { reading: text }));
    if (!this._peek && C.ghostOn(st, this._always())) { var g = this.api.el('span', 'flk-ghost'); g.setAttribute('aria-hidden', 'true'); g.textContent = st.r.w.syl.join('·'); el.appendChild(g); }
    var say = this.api.el('button', 'flk-say'); say.type = 'button'; say.setAttribute('aria-label', this._t('ariaSay'));
    say.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    say.addEventListener('click', function () { self._say(self._peek || C.readingParts(self.st).filter(function (p) { return p !== '_'; }).join(' … '), 0.8); });
    el.appendChild(say);
  },

  /* ---- the hand ---- */
  _announce: function () { var self = this; clearTimeout(this._annT); this._annT = setTimeout(function () { if (self._liveEl) self._liveEl.textContent = self._t('ariaPlate', { reading: FamilyLockCore.reading(self.st) }); }, 400); },
  _afterMove: function () { if (this.st.done) { this._view.freeMoved = true; } this._announce(); this._paint(); },
  _roll: function (q, d) {
    if (this._busy || !this._rollable()) return;
    if (FamilyLockCore.roll(this.st, q, d)) { this.api.sound(d > 0 ? 620 : 560); this._afterMove(); }
  },
  _setFace: function (q, i) {
    if (this._busy || !this._rollable()) return;
    if (FamilyLockCore.setFace(this.st, q, i)) { this.api.sound(660); this._afterMove(); } else this._paint();
  },
  /* after the lock opens, its wheels spin freely for a while (free play); then they rest */
  _rollable: function () { return !this.st.done || !!this._view.free; },
  _bindWheel: function (win, strip, q) {
    var self = this;
    win.addEventListener('pointerdown', function (ev) {
      if (self._busy || !self._rollable() || ev.button > 0) return;
      var y0 = ev.clientY, last = y0, lastT = performance.now(), vel = 0, moved = false;
      var pitch = parseFloat(getComputedStyle(win).getPropertyValue('--pitch')) || win.clientHeight * 0.42;
      try { win.setPointerCapture(ev.pointerId); } catch (e) {}
      var move = function (e) {
        var dy = e.clientY - y0, now = performance.now();
        if (!moved && Math.abs(dy) < 6) return;
        if (!moved) { moved = true; self._dragged = true; win.classList.add('is-drag'); }
        vel = (e.clientY - last) / Math.max(1, now - lastT); last = e.clientY; lastT = now;
        strip.style.transform = 'translateY(' + dy + 'px)'; e.preventDefault();
      };
      var up = function (e) {
        win.removeEventListener('pointermove', move); win.removeEventListener('pointerup', up); win.removeEventListener('pointercancel', up);
        if (!moved) { if (e.type === 'pointerup') self._toggleFan(q); return; }
        setTimeout(function () { self._dragged = false; }, 0);
        var dy = e.clientY - y0, steps = -Math.round(dy / pitch);
        /* a flick coasts: a fast release adds up to three more clicks */
        if (Math.abs(vel) > 0.6) steps += -Math.sign(vel) * Math.min(3, Math.round(Math.abs(vel) * 2));
        strip.style.transform = '';
        win.classList.remove('is-drag');
        if (!steps) { self._paint(); return; }
        var C = FamilyLockCore, w = self.st.wheels[q], len = w.faces.length;
        self._setFace(q, ((w.idx + steps) % len + len) % len);
        for (var i = 0; i < Math.min(Math.abs(steps), 4); i++) (function (i) { self._later(function () { self.api.sound(600 + i * 30); }, i * 40); })(i);
      };
      win.addEventListener('pointermove', move, { passive: false }); win.addEventListener('pointerup', up); win.addEventListener('pointercancel', up);
    });
  },
  _bindLoose: function (b, id) {
    var self = this;
    b.addEventListener('click', function () {
      if (self._busy || self.st.done || self._dragged) return;
      var at = self.st.sockets.indexOf(id);
      if (at >= 0) self._unseat(at); else self._seat(id);
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
        var lr = self._lockEl.getBoundingClientRect(), tr = self._trayEl.getBoundingClientRect(), st = self.st;
        if (e.clientY >= lr.top - 10 && e.clientY <= lr.bottom + 10 && e.clientX >= lr.left - 20 && e.clientX <= lr.right + 20) {
          var best = 0, bd = Infinity;
          [].forEach.call(self._rowEl.querySelectorAll('.flk-sock'), function (s, i) { var r = s.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - e.clientX); if (d < bd) { bd = d; best = i; } });
          self._seat(id, best);
        } else if (e.clientY >= tr.top - 20 && st.sockets.indexOf(id) >= 0) self._unseat(st.sockets.indexOf(id));
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _seat: function (id, socket) { if (this._busy) return; if (FamilyLockCore.seat(this.st, id, socket)) { this.api.sound(420); this._say(FamilyLockCore.wheel(this.st, id).text, 1); this._announce(); this._paint(); } },
  _unseat: function (q) { if (this._busy) return; if (FamilyLockCore.unseat(this.st, q)) { this.api.sound(300); this._announce(); this._paint(); } },
  _onKey: function (ev) {
    if (this._busy || ev.defaultPrevented) return;
    var st = this.st, t = ev.target, q = t && t.getAttribute ? parseInt(t.getAttribute('data-q'), 10) : NaN;
    if (this._fan >= 0) {
      var w0 = st.wheels[this._fan], cur = this._wrap.querySelector('.flk-fanface:focus'), i = cur ? +cur.getAttribute('data-i') : w0.idx;
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); var ni = (i + (ev.key === 'ArrowRight' ? 1 : -1) + w0.faces.length) % w0.faces.length, nb = this._wrap.querySelector('.flk-fanface[data-i="' + ni + '"]'); if (nb) nb.focus(); return; }
      if (ev.key === 'Escape') { ev.preventDefault(); var fq = this._fan; this._fan = -1; this._paint(); var tg = this._wrap.querySelector('.flk-win[data-q="' + fq + '"]'); if (tg) tg.focus(); return; }
      return;
    }
    if (t && t.classList && t.classList.contains('flk-win') && !isNaN(q)) {
      if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') { ev.preventDefault(); this._roll(q, ev.key === 'ArrowDown' ? 1 : -1); return; }
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (!this._rollable()) return; this._fan = q; this._paint(); var fb = this._wrap.querySelector('.flk-fanface.is-cur'); if (fb) fb.focus(); return; }
    }
    if (st.r.level === 'build' && ev.key === 'Backspace' && !st.done) {
      ev.preventDefault();
      for (var k = st.sockets.length - 1; k >= 0; k--) if (st.sockets[k]) { this._unseat(k); return; }
    }
  },

  /* ---- Check ---- */
  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = FamilyLockCore;
    this._fan = -1;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._paint(); return; }
    if (res.ok) return this._win();
    /* the lock tried: right wheels drop their pins, wrong ones wobble, the shackle lifts and falls */
    this._busy = true; this._view = { tried: true };
    res.pinned.forEach(function (q, i) { self._later(function () { self.api.sound(900); }, self._ms(60 + i * 80)); });
    this.api.sound(196);
    this._paint();
    if (st.help >= 2 && st.r.level !== 'build') this._say(st.r.w.syl.join(' … '), 0.6);
    this._later(function () { self._busy = false; self._view = {}; self._paint(); }, this._ms(650));
  },
  _win: function () {
    var self = this, st = this.st, r = st.r, n = r.w.syl.length;
    this._busy = true; this._view = { gold: true };
    for (var i = 0; i < n; i++) (function (i) { self._later(function () { self.api.sound(880); }, self._ms(i * 80)); })(i);
    this._paint();
    this._later(function () {
      self._view = { gold: true, open: true }; self.api.sound(523); self._later(function () { self.api.sound(784); }, 120);
      self._say(r.w.syl.join(' … '), 0.8);
      self.api.announce(self._t('ariaOpen', { word: r.w.word }));
      self._paint();
    }, this._ms(n * 80 + 260));
    this._later(function () {
      self._view = { gold: true, open: true, closed: true, newKey: true, free: true };
      self._say(r.w.word, 0.9);
      self._keys.push(r.w.word); if (self._keys.length > 12) self._keys.shift();
      self._busy = false; self._paint();
    }, this._ms(n * 80 + 1300));
    this._later(function () { if (self.st === st) { self._view.free = false; self._view.freeMoved = false; self._paint(); } }, this._ms(n * 80 + 1300 + this.FREE_MS) || 1);
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var flkCssDone = false;
function injectLockCSS() {
  if (flkCssDone || typeof document === 'undefined') return;
  flkCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.flk-wrap{position:relative;width:100%;display:grid;grid-template-columns:1fr;gap:10px;--flk-ink:#2B3A3A;--flk-teal:#146B5E;--flk-coral:#F2784B;--flk-brass:#D9A441;--flk-brass2:#B9852A;--flk-gold:#F2C14E;user-select:none;-webkit-user-select:none;}'
  + '.flk-wrap:focus{outline:none;}'
  + '.flk-wrap.is-wide{grid-template-columns:auto 1fr;grid-template-areas:"top top" "lock side";column-gap:20px;align-items:center;} .is-wide .flk-top{grid-area:top;} .is-wide .flk-lockcell{grid-area:lock;} .is-wide .flk-side{grid-area:side;}'
  + '.flk-top{display:flex;align-items:stretch;gap:12px;}'
  /* the display case */
  + '.flk-case{position:relative;flex:none;width:calc(var(--flk-pic) + 28px);height:calc(var(--flk-pic) + 28px);border-radius:16px;background:linear-gradient(160deg,#EEF7F8,#DCEEF1);box-shadow:inset 0 0 0 3px var(--flk-ink),0 4px 0 rgba(43,58,58,.25);overflow:hidden;}'
  + '.flk-pic{position:absolute;left:14px;top:14px;width:var(--flk-pic);height:var(--flk-pic);padding:0;border:0;background:transparent;cursor:pointer;} .flk-pic img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.flk-pic.is-turn{animation:flk-turn .7s ease-out;} @keyframes flk-turn{0%{transform:none;}40%{transform:translateY(-12px) rotateY(180deg);}100%{transform:translateY(0) rotateY(360deg);}}'
  + '.flk-glass{position:absolute;inset:0;pointer-events:none;background:linear-gradient(125deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.55) 38%,rgba(255,255,255,0) 46%),rgba(180,220,230,.25);box-shadow:inset 0 0 0 3px var(--flk-ink);border-radius:16px;transition:transform .5s ease-in;} .flk-case.is-open .flk-glass{transform:translateY(-104%);}'
  + '.flk-hinge{position:absolute;left:50%;bottom:-2px;width:28px;height:10px;margin-left:-14px;border-radius:4px 4px 0 0;background:var(--flk-brass);box-shadow:inset 0 0 0 2px var(--flk-ink);}'
  /* the keyring */
  + '.flk-ring{position:relative;flex:1;min-width:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px 8px;padding:20px 8px 8px;border-radius:14px;background:#F6EBD6;box-shadow:inset 0 0 0 3px #C9A15A;overflow:hidden;max-height:calc(var(--flk-pic) + 28px);}'
  + '.flk-rail{position:absolute;left:10px;right:10px;top:8px;height:6px;border-radius:3px;background:linear-gradient(#E9C77A,#B9852A);box-shadow:0 0 0 1.5px var(--flk-ink);}'
  + '.flk-key{position:relative;display:inline-flex;align-items:center;height:44px;padding:0 14px 0 4px;border:0;background:transparent;cursor:pointer;font:inherit;}'
  + '.flk-bow{width:22px;height:22px;border-radius:50%;border:5px solid var(--flk-brass);box-shadow:0 0 0 1.5px var(--flk-ink),inset 0 0 0 1.5px var(--flk-ink);flex:none;}'
  + '.flk-shaft{position:relative;margin-left:-2px;height:22px;display:flex;align-items:center;padding:0 10px 0 8px;border-radius:0 4px 4px 0;background:linear-gradient(#F3D58A,#D9A441);box-shadow:inset 0 0 0 1.5px var(--flk-ink);font:800 14px/1 ' + B + ';color:#5A3E10;white-space:nowrap;}'
  + '.flk-bit{position:absolute;right:6px;top:30px;width:10px;height:8px;background:var(--flk-brass);box-shadow:inset 0 0 0 1.5px var(--flk-ink);}'
  + '.flk-key.is-new{animation:flk-drop .6s cubic-bezier(.3,1.4,.6,1);} @keyframes flk-drop{0%{transform:translateY(-60px);opacity:0;}}'
  /* the lock */
  + '.flk-lockcell{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0;}'
  + '.flk-lock{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:var(--flk-shk);max-width:100%;}'
  + '.flk-shackle{position:absolute;top:0;left:50%;width:46%;max-width:150px;height:calc(var(--flk-shk) + 28px);transform:translateX(-50%);border:12px solid #A8AFB2;border-bottom:0;border-radius:60px 60px 0 0;box-shadow:0 0 0 2px var(--flk-ink),inset 0 0 0 2px var(--flk-ink);transition:transform .25s cubic-bezier(.3,1.6,.6,1);} .flk-lock.is-open .flk-shackle{transform:translate(-50%,-18px);} .flk-lock.is-try .flk-shackle{animation:flk-try .35s ease-out;} @keyframes flk-try{40%{transform:translate(-50%,-5px);}}'
  + '.flk-body{position:relative;z-index:1;padding:8px 12px 10px;border-radius:18px;background:linear-gradient(170deg,#ECC062,var(--flk-brass) 40%,var(--flk-brass2));box-shadow:inset 0 0 0 3px var(--flk-ink),0 5px 0 rgba(43,58,58,.3);max-width:100%;}'
  + '.flk-wheels{display:flex;justify-content:center;gap:8px;}'
  + '.flk-col{display:flex;flex-direction:column;align-items:center;width:max(44px,var(--flk-ww));}'
  + '.flk-tag{height:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;} .flk-tag span{min-width:30px;padding:2px 6px;border-radius:12px;background:#FBEBC3;box-shadow:inset 0 0 0 2px var(--flk-ink);font:800 15px/1.1 ' + B + ';color:var(--flk-ink);white-space:nowrap;} .flk-tag.is-on span{background:var(--flk-teal);color:#fff;}'
  + '.flk-nub{width:44px;height:44px;padding:0;border:0;background:transparent;cursor:pointer;position:relative;} .flk-nub::before{content:"";position:absolute;left:50%;top:50%;width:0;height:0;margin:-8px 0 0 -14px;border-left:14px solid transparent;border-right:14px solid transparent;} .flk-nub.is-up::before{border-bottom:16px solid var(--flk-ink);} .flk-nub.is-dn::before{border-top:16px solid var(--flk-ink);} .flk-nub:active::before{opacity:.6;} .flk-nub.has-notch{background:radial-gradient(circle,var(--flk-gold) 0 17px,var(--flk-ink) 17.5px 19.5px,transparent 20px);border-radius:50%;} .flk-nub.is-up.has-notch::before{border-bottom-color:#5A3E10;} .flk-nub.is-dn.has-notch::before{border-top-color:#5A3E10;} .flk-nub.has-notch{animation:flk-nudge 1.2s ease-in-out infinite;} @keyframes flk-nudge{50%{transform:scale(1.15);}}'
  + '.flk-win{--pitch:calc(var(--flk-wh) * .42);position:relative;width:var(--flk-ww);height:var(--flk-wh);border-radius:10px;overflow:hidden;cursor:ns-resize;touch-action:none;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--flk-ink);}'
  + '.flk-win::after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:10px;background:linear-gradient(rgba(43,58,58,.45),rgba(43,58,58,0) 28%,rgba(43,58,58,0) 72%,rgba(43,58,58,.45));box-shadow:inset 0 0 0 3px var(--flk-ink);}'
  + '.flk-strip{position:absolute;inset:0;transition:transform .14s ease-out;} .flk-win.is-drag .flk-strip{transition:none;}'
  + '.flk-face{position:absolute;left:0;right:0;top:calc(50% + var(--k) * var(--pitch));transform:translateY(-50%);text-align:center;font:700 var(--flk-nsyl)/1 ' + B + ';color:var(--flk-ink);opacity:.45;white-space:nowrap;} .flk-face.is-cur{font:800 var(--flk-syl)/1 ' + D + ';opacity:1;}'
  + '.flk-face.has-notch::before{content:"";position:absolute;left:3px;top:50%;width:0;height:0;margin-top:-7px;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:9px solid var(--flk-gold);filter:drop-shadow(0 0 1px #6B4A10);}'
  + '.flk-pin{position:absolute;left:50%;top:-14px;width:12px;height:16px;margin-left:-6px;border-radius:6px 6px 2px 2px;background:linear-gradient(#F3D58A,#B9852A);box-shadow:inset 0 0 0 2px var(--flk-ink);opacity:0;transform:translateY(-10px);transition:transform .2s ease-in,opacity .2s;z-index:2;}'
  + '.flk-win .flk-pin{top:2px;} .is-pinned .flk-pin,.is-pinned.flk-lw .flk-pin{opacity:1;transform:none;} .flk-col.is-pinned .flk-win{box-shadow:inset 0 0 0 3px var(--flk-teal);}'
  + '.flk-col.is-wob .flk-win,.flk-lw.is-wob{animation:flk-wob .3s ease-in-out 2;} @keyframes flk-wob{25%{rotate:-6deg;}75%{rotate:6deg;}} .flk-col.is-wrong .flk-win::after{box-shadow:inset 0 0 0 3px #A6461F;} .flk-lw.is-wrong{box-shadow:inset 0 0 0 3px #A6461F,0 3px 0 rgba(43,58,58,.25);}'
  + '.flk-col.is-gold .flk-win,.flk-lw.is-gold{animation:flk-gold .5s ease-out both;} @keyframes flk-gold{100%{background:#FFF1C2;}}'
  /* the fan */
  + '.flk-fan{position:absolute;left:0;top:0;z-index:5;display:flex;gap:4px;padding:6px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--flk-teal),0 6px 12px rgba(0,0,0,.18);animation:flk-fan .22s ease-out;transform-origin:50% 100%;} @keyframes flk-fan{0%{transform:scale(.4);opacity:0;}}'
  + '.flk-fanface{min-width:44px;height:44px;padding:0 6px;border:0;border-radius:8px;background:#F3EDE0;font:800 20px/1 ' + B + ';color:var(--flk-ink);cursor:pointer;} .flk-fanface.is-cur{background:var(--flk-teal);color:#fff;}'
  /* sockets and loose wheels (Monte o cadeado) */
  + '.flk-sock{position:relative;width:var(--flk-ww);height:var(--flk-wh);border-radius:10px;background:rgba(43,58,58,.18);box-shadow:inset 0 0 0 3px rgba(43,58,58,.55);margin-top:10px;}'
  + '.flk-lw{position:relative;width:var(--flk-ww);height:var(--flk-wh);padding:0;border:0;border-radius:10px;cursor:pointer;touch-action:none;background:linear-gradient(rgba(43,58,58,.3),rgba(43,58,58,0) 26%,rgba(43,58,58,0) 74%,rgba(43,58,58,.3)),#FFFDF6;box-shadow:inset 0 0 0 3px var(--flk-ink),0 3px 0 rgba(43,58,58,.25);font:inherit;}'
  + '.flk-lw.is-seated{position:absolute;inset:0;} .flk-lwface{font:800 var(--flk-syl)/1 ' + D + ';color:var(--flk-ink);white-space:nowrap;} .flk-lw .flk-pin{top:2px;} .flk-lw.is-pinned{box-shadow:inset 0 0 0 3px var(--flk-teal);} .flk-lw.is-decoy{opacity:.6;}'
  + '.flk-lw.is-lifting{opacity:.35;} .flk-lw.is-ghost{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));}'
  + '.flk-tray .flk-lw{width:var(--flk-tw);height:var(--flk-th);} .flk-tray .flk-lwface{font-size:var(--flk-tfs);} .flk-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px;border-radius:12px;background:#6B4A2B;box-shadow:inset 0 0 0 3px #4A3220,inset 0 8px 0 rgba(0,0,0,.18);max-width:100%;} .flk-tray.is-empty{display:none;}'
  /* the plate, the bubble, Check */
  + '.flk-side{display:grid;grid-template-columns:1fr auto;grid-template-areas:"plate plate" "note check";gap:10px;align-items:center;min-width:0;} .flk-plate{grid-area:plate;} .flk-check{grid-area:check;} .flk-note{grid-area:note;} .is-narrow .flk-side{grid-template-areas:"plate check" "note note";}'
  + '.flk-plate{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(var(--flk-plate) + 30px);padding:8px 52px 8px 14px;border-radius:12px;background:linear-gradient(170deg,#F3D58A,#D9A441);box-shadow:inset 0 0 0 3px var(--flk-ink),inset 0 0 0 6px rgba(255,255,255,.35);}'
  + '.flk-read{font:800 var(--flk-plate)/1.1 ' + D + ';color:#4A3410;text-shadow:0 1px 0 rgba(255,255,255,.6);white-space:nowrap;letter-spacing:.5px;} .flk-plate.is-word .flk-read{color:var(--flk-teal);} .flk-plate.is-peek .flk-read{color:#7A5212;}'
  + '.flk-ghost{font:700 calc(var(--flk-plate) * .6)/1.1 ' + D + ';color:rgba(74,52,16,.42);white-space:nowrap;}'
  + '.flk-say{position:absolute;right:4px;top:50%;width:44px;height:44px;margin-top:-22px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.4);color:#4A3410;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.flk-note{min-height:28px;font:700 17px/1.3 ' + B + ';color:var(--flk-teal);text-align:center;} .flk-note:empty{display:none;} .flk-note.is-ok{font-weight:800;} .flk-note.is-wrong{color:#A6461F;} .is-narrow .flk-note{font-size:15px;text-align:left;}'
  + '.flk-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .flk-check[hidden]{display:none;} .flk-check:disabled{opacity:.5;}'
  + '.flk-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '.flk-win:focus-visible,.flk-nub:focus-visible,.flk-lw:focus-visible,.flk-key:focus-visible,.flk-check:focus-visible,.flk-pic:focus-visible,.flk-say:focus-visible,.flk-fanface:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.flk-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'flk-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.FamilyLockActivity = FamilyLockActivity;
