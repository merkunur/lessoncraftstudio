/* =====================================================================
   photo-syllables-activity.js — ACTIVITY #52 of the one-by-one rebuild:
   "Forme le mot en syllabes" (fr) → LA PHOTO QUI SE RÉVÈLE, the
   developing photo (RF.K.2.B, French). Design sheet:
   docs/activities-rebuild/designs/052-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: every syllable card carries its own strip of the photo
   of its word. Lay the cards on the rail and press Développer: under a
   red safelight the strips come up left to right — the right card in the
   right place sharp, any other strip fogged, a decoy's strip from another
   photo, a missing card a white unexposed band. At the second miss the
   right photo lies faintly behind, with a line where each syllable's
   strip begins. Right: the seams melt into one photo, a flash, and the
   photo goes into the album. The word-final mute e is grey on its card.

   ACTIVITY LAYER ONLY: the model is photo-syllables-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on
   success). Test seams: window.PhotoSyllablesActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var PhotoSyllablesActivity = {
  id: 'photo-syllables',
  apparatusClasses: ['phs-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Developing Photo',fr:'La photo qui se révèle'},
    instruction:   {en:'Lay the syllable cards on the rail in the right order, then press Develop to see the photo.',fr:'Pose les cartes-syllabes sur le rail dans le bon ordre, puis appuie sur Développer pour voir la photo.'},
    check:         {en:'Develop',fr:'Développer'},
    pShort:        {en:'Build the word, then develop the photo.',fr:'Forme le mot, puis développe la photo.'},
    pMute:         {en:'Build the word. The grey e is written, but you can\'t hear it.',fr:'Forme le mot. Le e gris s’écrit, mais on ne l’entend pas.'},
    pLong:         {en:'Build the long word, one card for each syllable.',fr:'Forme le mot long, une carte pour chaque syllabe.'},
    hintEmpty:     {en:'Lay the cards on the rail, then develop the photo.',fr:'Pose les cartes sur le rail, puis développe la photo.'},
    hintOrder:     {en:'The photo\'s pieces are mixed up. Change the order of the cards.',fr:'Les morceaux de la photo sont mélangés. Change l’ordre des cartes.'},
    hintForeign:   {en:'One card comes from a different photo. Which one?',fr:'Une carte vient d’une autre photo. Laquelle ?'},
    hintMissing:   {en:'A piece of the photo is missing.',fr:'Il manque un morceau de la photo.'},
    hintLines:     {en:'Look at the lines on the photo: one piece for each syllable.',fr:'Regarde les traits sur la photo : un morceau pour chaque syllabe.'},
    okWord:        {en:'{dash}: {word}! You built the word from {n} cards.',fr:'{dash} : {word} ! Tu as formé le mot avec {n} cartes.'},
    okMute:        {en:'{dash}: {word}! The grey e is written, but you can\'t hear it.',fr:'{dash} : {word} ! Le e gris s’écrit, mais on ne l’entend pas.'},
    okOne:         {en:'{word}: one piece, one syllable!',fr:'{word} : un seul morceau, une seule syllabe !'},
    setLevel:      {en:'Level',fr:'Niveau'},
    lvShort:       {en:'One or two syllables',fr:'Une ou deux syllabes'},
    lvMute:        {en:'The silent e',fr:'Le e muet'},
    lvLong:        {en:'Three syllables or more',fr:'Trois syllabes et plus'},
    setDecoy:      {en:'Decoy card',fr:'Carte piège'},
    optNone:       {en:'None',fr:'Aucune'},
    optOne:        {en:'One',fr:'Une'},
    ariaPhoto:     {en:'The photo: {state}',fr:'La photo : {state}'},
    stBlank:       {en:'not developed yet',fr:'pas encore développée'},
    stSharp:       {en:'all sharp',fr:'toute nette'},
    stOrder:       {en:'mixed up',fr:'mélangée'},
    stForeign:     {en:'a piece from another photo',fr:'un morceau d’une autre photo'},
    stMissing:     {en:'a piece is missing',fr:'il manque un morceau'},
    ariaRail:      {en:'Rail: {cards}',fr:'Rail : {cards}'},
    ariaEmpty:     {en:'empty',fr:'vide'},
    ariaRailCard:  {en:'Card {s} on the rail — tap to take it back',fr:'Carte {s} sur le rail — touche pour la reprendre'},
    ariaTrayCard:  {en:'Card {s} — tap to lay it on the rail',fr:'Carte {s} — touche pour la poser sur le rail'},
    ariaTray:      {en:'Cards to lay: {n}',fr:'Cartes à poser : {n}'},
    ariaAlbum:     {en:'Album: {count} photos',fr:'Album : {count} photos'},
    ariaAlbum1:    {en:'Album: 1 photo',fr:'Album : 1 photo'},
    ariaAlbumPic:  {en:'Photo: {word} — tap to see it again',fr:'Photo : {word} — touche pour la revoir'},
    ariaSay:       {en:'Hear the cards',fr:'Écouter les cartes'}
    /*STRINGS-END*/
  },
  defaults: { level: 'short', decoy: 'one' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'short', labelKey: 'lvShort' }, { value: 'mute', labelKey: 'lvMute' }, { value: 'long', labelKey: 'lvLong' }] },
    { key: 'decoy', type: 'choice', labelKey: 'setDecoy', options: [{ value: 'none', labelKey: 'optNone' }, { value: 'one', labelKey: 'optOne' }] }
  ],

  OK_MS: 500, BAND_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._dragged = false;
    this._album = []; this._albumPass = -1; this._view = {};
    injectPhotoCSS();
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
  _lv: function () { return PhotoSyllablesCore.level(this._set('level')); },
  _decoy: function () { return this._set('decoy') !== 'none'; },
  /* a new deal when the level or the decoy card changes */
  _key: function () { return this._lv() + '/' + (this._decoy() ? 'one' : 'none'); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'fr', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey.split('/')[0] !== k.split('/')[0]) { this._album = []; this._albumPass = -1; } this._pool = PhotoSyllablesCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PhotoSyllablesCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, dec = this._decoy();
    var args = { word: w.word, dash: w.syl.join('-'), n: w.syl.length };
    return {
      id: 'photo-syllables.' + r.id, promptKey: { short: 'pShort', mute: 'pMute', long: 'pLong' }[r.level], promptArgs: args, celebrateKey: C.celebrateKey(r), answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {};
        if (tool._albumPass !== pss) { tool._album = []; tool._albumPass = pss; }
        tool.st = C.newState(r, pss, { decoy: dec }); tool._args = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = PhotoSyllablesCore.rounds('short')[0]; this.st = PhotoSyllablesCore.newState(r0, 0); this._args = { word: r0.w.word, dash: r0.w.syl.join('-'), n: r0.w.syl.length }; }
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
  /* card size for this round: every card of the round fits on the rail in one line */
  _sizes: function () {
    var L = this._L, st = this.st, cnt = st.cards.length, maxLen = 0;
    st.cards.forEach(function (c) { maxLen = Math.max(maxLen, c.text.length); });
    var railW = L.W - 20, cw = Math.min(L.cw, Math.floor((railW - (cnt - 1) * 6) / cnt));
    var fs = Math.max(14, Math.min(L.fs, Math.floor((cw - 12) / (maxLen * 0.6))));
    return { cw: cw, ch: L.ch, fs: fs };
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st;
    api.stage.innerHTML = '';
    var L = this._L = PhotoSyllablesCore.layout(this._width()), Z = this._sizes();
    var wrap = api.el('div', 'phs-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['pic', L.pic], ['cw', Z.cw], ['ch', Z.ch], ['fs', Z.fs]].forEach(function (p) { wrap.style.setProperty('--phs-' + p[0], p[1] + 'px'); });
    var album = api.el('div', 'phs-album'); this._albumEl = album; wrap.appendChild(album);
    var photo = api.el('div', 'phs-photo'); wrap.appendChild(photo);
    var frame = api.el('div', 'phs-frame'); this._frameEl = frame; photo.appendChild(frame);
    var note = api.el('div', 'phs-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var railRow = api.el('div', 'phs-railrow'); wrap.appendChild(railRow);
    /* the speaker sits on the frame's corner: it reads the rail as one word */
    var say = api.el('button', 'phs-say'); say.type = 'button'; say.setAttribute('aria-label', this._t('ariaSay'));
    say.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    say.addEventListener('click', function () { self._sayRail(); });
    photo.appendChild(say);
    var rail = api.el('div', 'phs-rail'); this._railEl = rail; railRow.appendChild(rail);
    var tray = api.el('div', 'phs-tray'); this._trayEl = tray; wrap.appendChild(tray);
    var chk = api.el('button', 'phs-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; wrap.appendChild(chk);
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
    if (!this._frameEl) return;
    var st = this.st, C = PhotoSyllablesCore;
    this._paintAlbum(); this._paintFrame(); this._paintRail(); this._paintTray();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (this._view.whole ? this._t(C.celebrateKey(st.r), this._args) : '');
    else if (h && !this._busy) msg = this._t(h, this._args);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _face: function (c) { return c.mute ? c.text.slice(0, -1) + '<span class="phs-mute">e</span>' : c.text; },
  _paintAlbum: function () {
    var self = this, el = this._albumEl, keep = this._L.mode === 'narrow' ? Math.max(1, Math.floor((this._L.pic + 28 + 20 - 12 + 6) / 50)) : Math.max(3, Math.floor((this._L.W - 20) / 100));
    el.innerHTML = '';
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._album.length === 1 ? this._t('ariaAlbum1') : this._t('ariaAlbum', { count: this._album.length }));
    var list = this._album.slice(-keep);
    if (!list.length) el.insertAdjacentHTML('beforeend', '<span class="phs-slot" aria-hidden="true"></span><span class="phs-slot" aria-hidden="true"></span><span class="phs-slot" aria-hidden="true"></span>');
    list.forEach(function (wd, i) {
      var b = self.api.el('button', 'phs-snap' + (i === list.length - 1 && self._view.newSnap ? ' is-new' : '')); b.type = 'button';
      b.setAttribute('aria-label', self._t('ariaAlbumPic', { word: wd }));
      b.innerHTML = '<span class="phs-corners" aria-hidden="true"></span><span class="phs-snapword">' + wd + '</span>';
      b.addEventListener('click', function () { self._peekPhoto(wd); });
      el.appendChild(b);
    });
  },
  /* an album photo is shown again FULL size in the frame for a moment (never as a thumbnail) */
  _peekPhoto: function (wd) {
    if (this._busy) return;
    var self = this; this._view.peek = wd; this._say(wd); this._paintFrame();
    this._later(function () { if (self._view.peek === wd) { self._view.peek = null; self._paintFrame(); } }, this._ms(1400) || 1);
  },
  _paintFrame: function () {
    var st = this.st, C = PhotoSyllablesCore, v = this._view, el = this._frameEl, P = this._L.pic, r = st.r, self = this;
    el.innerHTML = '';
    var dev = st.developed, state = 'stBlank';
    el.className = 'phs-frame' + (v.light ? ' is-light' : '') + (v.whole ? ' is-whole' : '') + (v.flash ? ' is-flash' : '');
    var img = this.api.el('div', 'phs-image'); el.appendChild(img);
    if (v.peek) {
      img.insertAdjacentHTML('beforeend', '<img class="phs-full" alt="" draggable="false" src="' + this._pic(C.word(v.peek).pic) + '">');
    } else if (st.done && v.whole) {
      img.insertAdjacentHTML('beforeend', '<img class="phs-full" alt="" draggable="false" src="' + this._pic(r.w.pic) + '">');
      state = 'stSharp';
    } else if (dev) {
      if (C.ghostOn(st)) img.insertAdjacentHTML('beforeend', '<img class="phs-ghost" alt="" draggable="false" src="' + this._pic(r.w.pic) + '">');
      dev.bands.forEach(function (b, i) {
        var e = self.api.el('span', 'phs-band' + (b.sharp ? ' is-sharp' : ' is-fog') + (b.foreign ? ' is-foreign' : ''));
        e.style.left = (b.x * P) + 'px'; e.style.width = Math.ceil(b.w * P) + 'px';
        e.style.backgroundImage = 'url("' + self._pic(b.pic) + '")';
        e.style.backgroundSize = P + 'px ' + P + 'px';
        e.style.backgroundPosition = (-b.srcIdx * P / b.srcCount) + 'px 0';
        if (v.reveal) e.style.animationDelay = (i * self._ms(self.BAND_MS) / 1000) + 's'; else e.classList.add('is-still');
        img.appendChild(e);
      });
      if (dev.gap) { var g = self.api.el('span', 'phs-gapband'); g.style.left = ((1 - dev.gap) * P) + 'px'; g.style.width = Math.ceil(dev.gap * P) + 'px'; img.appendChild(g); }
      if (dev.overflow) img.insertAdjacentHTML('beforeend', '<span class="phs-curl" aria-hidden="true"></span>');
      if (C.ghostOn(st)) C.guides(st).forEach(function (f) { var ln = self.api.el('span', 'phs-guide'); ln.style.left = (f * P) + 'px'; img.appendChild(ln); });
      state = st.done ? 'stSharp' : { foreign: 'stForeign', missing: 'stMissing', order: 'stOrder' }[st.last && st.last.result] || 'stOrder';
    } else img.insertAdjacentHTML('beforeend', '<span class="phs-blank" aria-hidden="true"></span>');
    el.setAttribute('role', 'img'); el.setAttribute('aria-label', this._t('ariaPhoto', { state: this._t(state) }));
  },
  _paintRail: function () {
    var self = this, st = this.st, C = PhotoSyllablesCore, el = this._railEl, dev = st.developed, v = this._view;
    el.innerHTML = '';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', this._t('ariaRail', { cards: st.rail.length ? st.rail.map(function (id) { return C.byId(st, id).text; }).join(', ') : this._t('ariaEmpty') }));
    st.rail.forEach(function (id, i) {
      var c = C.byId(st, id), b = dev && dev.bands[i];
      var b0 = self.api.el('button', 'phs-card is-laid' + (b && !b.sharp && !self._busy ? ' is-tilt' : '') + (v.gold ? ' is-gold' : '')); b0.type = 'button'; b0.setAttribute('data-id', id);
      if (v.gold) b0.style.animationDelay = (i * 0.12) + 's';
      b0.innerHTML = '<span class="phs-face">' + self._face(c) + '</span>';
      b0.setAttribute('aria-label', self._t('ariaRailCard', { s: c.text }));
      self._bindCard(b0, id);
      el.appendChild(b0);
    });
  },
  _paintTray: function () {
    var self = this, st = this.st, C = PhotoSyllablesCore, el = this._trayEl;
    el.innerHTML = '';
    el.className = 'phs-tray' + (st.tray.length && !st.done ? '' : ' is-empty');
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaTray', { n: st.tray.length }));
    if (st.done) return;
    st.tray.forEach(function (id) {
      var c = C.byId(st, id), b = self.api.el('button', 'phs-card'); b.type = 'button'; b.setAttribute('data-id', id);
      b.innerHTML = '<span class="phs-face">' + self._face(c) + '</span>';
      b.setAttribute('aria-label', self._t('ariaTrayCard', { s: c.text }));
      self._bindCard(b, id);
      el.appendChild(b);
    });
  },

  /* ---- the hand ---- */
  _sayRail: function () { var st = this.st, C = PhotoSyllablesCore; this._say(this._spoken(st.rail.map(function (id) { return C.byId(st, id); })), 0.85); },
  /* what the speaker says: the cards joined into one word; a grey e is never voiced on its own (a mute-e card that is alone or not last drops its e) */
  _spoken: function (cards) { return cards.map(function (c, i) { return c.mute && (cards.length === 1 || i < cards.length - 1) ? c.text.slice(0, -1) : c.text; }).join(''); },
  _lay: function (id, at) { if (this._busy) return; var c = PhotoSyllablesCore.byId(this.st, id); if (PhotoSyllablesCore.lay(this.st, id, at)) { this.api.sound(560); if (c && !c.mute) this._say(c.text, 1); this._view = {}; this._paint(); } },
  _move: function (id, to) { if (this._busy) return; if (PhotoSyllablesCore.move(this.st, id, to)) { this.api.sound(500); this._view = {}; this._paint(); } else this._paint(); },
  _back: function (id) { if (this._busy) return; if (PhotoSyllablesCore.takeBack(this.st, id)) { this.api.sound(300); this._view = {}; this._paint(); } },
  /* where on the rail a pointer at x would land: the number of rail cards (other than `skip`) whose centre is left of x */
  _railIndex: function (x, skip) {
    var n = 0; [].forEach.call(this._railEl.querySelectorAll('.phs-card'), function (c) { if (c.getAttribute('data-id') === skip) return; var r = c.getBoundingClientRect(); if (r.left + r.width / 2 < x) n++; });
    return n;
  },
  _bindCard: function (b, id) {
    var self = this;
    b.addEventListener('click', function () {
      if (self._busy || self.st.done || self._dragged) return;
      if (self.st.rail.indexOf(id) >= 0) self._back(id); else self._lay(id);
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
        var rr = self._railEl.getBoundingClientRect(), onRail = e.clientY >= rr.top - 24 && e.clientY <= rr.bottom + 24 && e.clientX >= rr.left - 30 && e.clientX <= rr.right + 30, st = self.st;
        var laid = st.rail.indexOf(id) >= 0;
        if (onRail) { var at = self._railIndex(e.clientX, id); if (laid) self._move(id, at); else self._lay(id, at); }
        else if (laid) self._back(id);
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    if (this._busy || this.st.done || ev.defaultPrevented) return;
    var t = ev.target, id = t && t.getAttribute ? t.getAttribute('data-id') : null, st = this.st;
    if (id && st.rail.indexOf(id) >= 0) {
      var i = st.rail.indexOf(id);
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { ev.preventDefault(); this._move(id, i + (ev.key === 'ArrowRight' ? 1 : -1)); return; }
      if (ev.key === 'Delete' || ev.key === 'Backspace') { ev.preventDefault(); this._back(id); return; }
    }
    if (ev.key === 'Backspace' && st.rail.length) { ev.preventDefault(); this._back(st.rail[st.rail.length - 1]); }
  },

  /* ---- Développer ---- */
  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = PhotoSyllablesCore;
    var res = C.develop(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    /* the safelight, then the strips left to right */
    var nb = st.developed.bands.length, upMs = this._ms(200 + nb * this.BAND_MS + 300);
    this._busy = true; this._view = { light: true, reveal: true };
    this.api.sound(220);
    for (var i = 0; i < nb; i++) (function (i) { self._later(function () { self.api.sound(420 + i * 60); }, self._ms(200 + i * self.BAND_MS)); })(i);
    this._paint();
    if (res.ok) return this._win(upMs);
    this._later(function () {
      self._busy = false; self._view = {}; self.api.sound(196);
      if (st.help >= 2) self._say(st.r.w.word, 0.6);
      self._paint();
    }, upMs);
  },
  _win: function (upMs) {
    var self = this, st = this.st, r = st.r;
    this._later(function () {
      self._view = { whole: true, flash: true, gold: true };
      self.api.sound(523); self._later(function () { self.api.sound(659); }, 110); self._later(function () { self.api.sound(784); }, 220);
      self._say(r.w.word, 0.85);
      self.api.announce(self._t('ariaPhoto', { state: self._t('stSharp') }));
      self._paint();
    }, upMs);
    this._later(function () {
      self._view = { whole: true, newSnap: true };
      self._album.push(r.w.word); if (self._album.length > 12) self._album.shift();
      self._busy = false; self._paint();
    }, upMs + this._ms(1100));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, upMs + this._ms(this.OK_MS));
  }
};

var phsCssDone = false;
function injectPhotoCSS() {
  if (phsCssDone || typeof document === 'undefined') return;
  phsCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.phs-wrap{position:relative;width:100%;display:grid;gap:10px;--phs-ink:#2A2A35;--phs-teal:#146B5E;--phs-coral:#F2784B;--phs-cream:#FBF3E4;user-select:none;-webkit-user-select:none;}'
  + '.phs-wrap:focus{outline:none;}'
  + '.phs-wrap.is-wide{grid-template-columns:auto minmax(0,1fr);grid-template-areas:"album album" "frame note" "frame check" "rail rail" "tray tray";column-gap:20px;align-items:center;} .is-wide .phs-note{align-self:end;} .is-wide .phs-check{align-self:start;justify-self:start;}'
  + '.phs-wrap.is-narrow{grid-template-columns:calc(var(--phs-pic) + 48px) minmax(0,1fr);grid-template-areas:"frame album" "rail rail" "tray tray" "check check" "note note";column-gap:8px;} .is-narrow .phs-album{flex-direction:column;flex-wrap:nowrap;align-items:stretch;justify-content:flex-start;max-height:none;align-self:stretch;padding:6px;gap:6px;} .is-narrow .phs-snap{min-width:0;padding:0 4px;flex:none;} .is-narrow .phs-slot{width:auto;height:44px;}'
  + '.phs-album{grid-area:album;} .phs-photo{grid-area:frame;position:relative;justify-self:center;} .phs-note{grid-area:note;} .phs-railrow{grid-area:rail;} .phs-tray{grid-area:tray;} .phs-check{grid-area:check;}'
  /* the album */
  + '.phs-album{display:flex;flex-wrap:nowrap;gap:6px;min-height:46px;padding:5px 8px;border-radius:12px;background:#3E5A57;box-shadow:inset 0 0 0 3px #2B3F3D;align-items:center;overflow:hidden;max-height:58px;}'
  + '.phs-slot{width:44px;height:34px;border-radius:4px;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25);}'
  + '.phs-snap{position:relative;min-width:56px;height:44px;padding:0 8px;border:0;border-radius:4px;background:#FFFDF6;box-shadow:0 2px 0 rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center;font:inherit;}'
  + '.phs-corners{position:absolute;inset:4px;pointer-events:none;background:linear-gradient(135deg,var(--phs-ink) 0 6px,transparent 6px) top left/10px 10px no-repeat,linear-gradient(225deg,var(--phs-ink) 0 6px,transparent 6px) top right/10px 10px no-repeat,linear-gradient(45deg,var(--phs-ink) 0 6px,transparent 6px) bottom left/10px 10px no-repeat,linear-gradient(315deg,var(--phs-ink) 0 6px,transparent 6px) bottom right/10px 10px no-repeat;}'
  + '.phs-snapword{font:800 14px/1 ' + B + ';color:var(--phs-ink);white-space:nowrap;} .phs-snap.is-new{animation:phs-pin .6s cubic-bezier(.3,1.4,.6,1);} @keyframes phs-pin{0%{transform:translateY(60px) rotate(-8deg);opacity:0;}}'
  /* the photo frame */
  + '.phs-frame{position:relative;justify-self:center;width:calc(var(--phs-pic) + 28px);height:calc(var(--phs-pic) + 28px);padding:14px;box-sizing:border-box;background:#fff;border-radius:6px;box-shadow:0 0 0 2px var(--phs-ink),0 0 0 12px #5E7C78,0 0 0 14px #2B3F3D,0 10px 18px rgba(0,0,0,.25);margin:14px;transition:box-shadow .2s;} .is-narrow .phs-frame{margin:10px;}'
  + '.phs-frame.is-light{box-shadow:0 0 0 2px var(--phs-ink),0 0 0 12px #B5473A,0 0 0 14px #2B3F3D,0 0 34px rgba(220,60,40,.55);}'
  + '.phs-image{position:relative;width:var(--phs-pic);height:var(--phs-pic);overflow:hidden;background:var(--phs-cream);}'
  + '.phs-blank{position:absolute;inset:8px;border:2px dashed rgba(110,90,60,.35);border-radius:4px;}'
  + '.phs-band{position:absolute;top:0;height:100%;background-repeat:no-repeat;animation:phs-dev .6s ease-out both;} .phs-band.is-still{animation:none;}'
  + '@keyframes phs-dev{0%{opacity:0;filter:sepia(1) brightness(1.6);}100%{opacity:1;}}'
  + '.phs-band.is-fog{filter:blur(2.5px) saturate(.7);} .phs-band.is-fog::after{content:"";position:absolute;inset:0;background:rgba(251,243,228,.35);}'
  + '.phs-band.is-foreign{box-shadow:inset 0 0 0 3px rgba(166,70,31,.75);}'
  + '.phs-band + .phs-band{box-shadow:inset 1px 0 0 rgba(42,42,53,.18);} .phs-band.is-foreign + .phs-band{box-shadow:inset 1px 0 0 rgba(42,42,53,.18);}'
  + '.phs-gapband{position:absolute;top:0;height:100%;background:repeating-linear-gradient(45deg,#FFFDF6 0 8px,#F1E7D4 8px 16px);box-shadow:inset 2px 0 0 rgba(166,70,31,.5);}'
  + '.phs-curl{position:absolute;right:-2px;top:0;bottom:0;width:22px;background:linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.25) 60%,#fff 61%,#ECE3D2);border-radius:0 0 0 22px;}'
  + '.phs-ghost{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:.18;}'
  + '.phs-guide{position:absolute;top:0;bottom:0;width:0;border-left:2px dashed rgba(20,107,94,.85);z-index:3;}'
  + '.phs-full{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;animation:phs-melt .3s ease-out;} @keyframes phs-melt{0%{filter:blur(1.5px);}}'
  + '.phs-frame.is-flash::after{content:"";position:absolute;inset:0;background:#fff;animation:phs-flash .45s ease-out forwards;pointer-events:none;} @keyframes phs-flash{0%{opacity:.95;}100%{opacity:0;}}'
  /* the rail and the cards */
  + '.phs-railrow{display:flex;align-items:center;gap:10px;min-width:0;}'
  + '.phs-say{position:absolute;right:-6px;bottom:-6px;z-index:4;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F3DC9C,#C9A24E 60%,#8E6C2A);box-shadow:inset 0 0 0 2px var(--phs-ink);color:#3A2A08;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.phs-rail{flex:1;min-width:0;display:flex;align-items:center;gap:6px;min-height:calc(var(--phs-ch) + 18px);padding:8px 10px;border-radius:12px;background:linear-gradient(#E9C77A,#B9852A);box-shadow:inset 0 0 0 3px var(--phs-ink),inset 0 calc(var(--phs-ch) * .5 + 9px) 0 rgba(0,0,0,.06);}'
  + '.phs-card{position:relative;flex:none;width:var(--phs-cw);height:var(--phs-ch);padding:0;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--phs-ink),0 3px 0 rgba(42,42,53,.22);cursor:pointer;touch-action:none;font:inherit;transition:transform .16s;}'
  + '.phs-card::before{content:"";position:absolute;left:7px;top:7px;width:7px;height:7px;border-radius:50%;background:rgba(42,42,53,.3);}'
  + '.phs-face{font:800 var(--phs-fs)/1 ' + D + ';color:var(--phs-ink);white-space:nowrap;} .phs-mute{color:rgba(42,42,53,.42);}'
  + '.phs-card.is-tilt{transform:rotate(4deg);box-shadow:inset 0 0 0 2px #A6461F,0 3px 0 rgba(42,42,53,.22);} .phs-card.is-gold{animation:phs-gold .5s ease-out both;} @keyframes phs-gold{100%{background:#FFF1C2;box-shadow:inset 0 0 0 2px var(--phs-teal),0 3px 0 rgba(42,42,53,.22);}}'
  + '.phs-card.is-lifting{opacity:.35;} .phs-card.is-ghost{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));}'
  + '.phs-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px;border-radius:12px;background:#6B4A2B;box-shadow:inset 0 0 0 3px #4A3220,inset 0 8px 0 rgba(0,0,0,.18);min-height:calc(var(--phs-ch) + 16px);} .phs-tray.is-empty{min-height:0;padding:0;background:transparent;box-shadow:none;}'
  + '.is-narrow .phs-check{justify-self:center;} .is-narrow .phs-note{min-width:0;text-align:center;} .phs-note{min-height:28px;font:700 17px/1.3 ' + B + ';color:var(--phs-teal);} .phs-note:empty{display:none;} .phs-note.is-ok{font-weight:800;} .phs-note.is-wrong{color:#A6461F;} .is-narrow .phs-note{font-size:15px;} .is-wide .phs-note{text-align:left;}'
  + '.phs-check{min-height:48px;padding:0 20px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;align-self:center;justify-self:end;} .phs-check[hidden]{display:none;} .phs-check:disabled{opacity:.5;}'
  + '.phs-card:focus-visible,.phs-check:focus-visible,.phs-say:focus-visible,.phs-snap:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.phs-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'phs-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.PhotoSyllablesActivity = PhotoSyllablesActivity;
