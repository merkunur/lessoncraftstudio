/* =====================================================================
   syllable-chain-activity.js — ACTIVITY #49 of the one-by-one rebuild:
   "Forma la parola con le sillabe" (it) → LA CATENA DELLE SILLABE, the
   syllable chain (RF.K.2.B, Italian). Design sheet: docs/activities-rebuild/designs/049-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: a chain whose hooks are syllables. The open clasp at the
   end of the chain shows the last syllable of the last word; hook the
   picture whose word STARTS with it and the clasp clinks shut, engraved
   with the shared syllable (pal·la → la·ma → ma·no). A picture that does
   not match will not close: the two half-rings show their two syllables
   side by side and it swings back to the basket. Conta e forma: size a
   link to the word's beats, then fill its sockets in order.

   ACTIVITY LAYER ONLY: the model is syllable-chain-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.SyllableChainActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var SyllableChainActivity = {
  id: 'syllable-chain',
  apparatusClasses: ['scn-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Syllable Chain',it:'La catena delle sillabe'},
    instruction:   {en:'Each picture hooks onto the chain with a syllable: the last syllable of one word is the first syllable of the next. Then count the beats and build the long words.',it:'Ogni immagine si aggancia alla catena con una sillaba: l\'ultima sillaba di una parola è la prima della parola dopo. Poi conta i battiti e forma le parole lunghe.'},
    check:         {en:'Check',it:'Controlla'},
    count:         {en:'Count',it:'Conta'},
    pChain:        {en:'Which picture hooks onto the chain?',it:'Quale immagine si aggancia alla catena?'},
    pBuild:        {en:'How many syllables? Then build the word.',it:'Quante sillabe? Poi forma la parola.'},
    hintFind:      {en:'Find the picture that starts with "{syl}".',it:'Trova l\'immagine che comincia con «{syl}».'},
    hintLure:      {en:'{word} ends with "{syl}". We need a word that starts with "{syl}".',it:'{word} finisce con «{syl}». Serve una parola che comincia con «{syl}».'},
    hintWrong:     {en:'{word} starts with "{first}", not with "{syl}".',it:'{word} comincia con «{first}», non con «{syl}».'},
    hintSlow:      {en:'Say "{prev}" slowly: the last little part is "{syl}".',it:'Di\' «{prev}» piano piano: l\'ultimo pezzetto è «{syl}».'},
    hintShort:     {en:'The last box has more than one syllable. Add a box!',it:'Nell\'ultima casella c\'è più di una sillaba. Aggiungi una casella!'},
    hintLong:      {en:'A box stayed empty. Take it away!',it:'Una casella è rimasta vuota. Toglila!'},
    hintLong2:     {en:'Some boxes stayed empty. Take them away!',it:'Alcune caselle sono rimaste vuote. Toglile!'},
    hintClap:      {en:'Clap: one box for every beat.',it:'Batti le mani: una casella per ogni battito.'},
    hintFill:      {en:'Tap the syllables and put them in order in the boxes.',it:'Tocca le sillabe e mettile in ordine nelle caselle.'},
    hintMore:      {en:'The glowing boxes are right. Fill the others!',it:'Le caselle che brillano sono giuste. Riempi le altre!'},
    hintGlow:      {en:'The glowing boxes are right.',it:'Le caselle che brillano sono giuste.'},
    hintAuto:      {en:'The next syllable is "{next}".',it:'La prossima sillaba è «{next}».'},
    okChain:       {en:'{chain}: the chain is closed!',it:'{chain}: la catena è chiusa!'},
    okBuild:       {en:'{parts} = {word}: {n} syllables!',it:'{parts} = {word}: {n} sillabe!'},
    setLevel:      {en:'Level',it:'Livello'},
    lvShort:       {en:'Short chains',it:'Catene corte'},
    lvLong:        {en:'Long chains',it:'Catene lunghe'},
    lvBuild:       {en:'Count and build',it:'Conta e forma'},
    setLure:       {en:'Trick picture',it:'Trabocchetto'},
    optYes:        {en:'Yes',it:'Sì'},
    optNo:         {en:'No',it:'No'},
    setLabels:     {en:'Syllables on the pictures',it:'Sillabe sulle immagini'},
    optAfter:      {en:'After hooking',it:'Dopo l\'aggancio'},
    optAlways:     {en:'Always',it:'Sempre'},
    ariaChain:     {en:'Chain of {n} links',it:'Catena di {n} anelli'},
    ariaOpen:      {en:'Open clasp: {syl}',it:'Gancio aperto: {syl}'},
    ariaPicture:   {en:'Picture: {word}',it:'Immagine: {word}'},
    ariaLast:      {en:'Link: {word} — tap to unhook it',it:'Anello: {word} — tocca per staccarlo'},
    ariaHooked:    {en:'{word} hooks onto "{syl}"',it:'{word} si aggancia a «{syl}»'},
    ariaLink:      {en:'Link with {n} boxes',it:'Anello con {n} caselle'},
    ariaSocket:    {en:'Box {i}: {s}',it:'Casella {i}: {s}'},
    ariaEmpty:     {en:'empty',it:'vuota'},
    ariaTile:      {en:'Syllable: {s}',it:'Sillaba: {s}'},
    ariaMore:      {en:'Add a box',it:'Aggiungi una casella'},
    ariaLess:      {en:'Remove a box',it:'Togli una casella'},
    ariaFestone:   {en:'Completed chains',it:'Catene completate'}
    /*STRINGS-END*/
  },
  defaults: { level: 'short', lure: 'yes', labels: 'after' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'short', labelKey: 'lvShort' }, { value: 'long', labelKey: 'lvLong' }, { value: 'build', labelKey: 'lvBuild' }] },
    { key: 'lure', type: 'choice', labelKey: 'setLure', options: [{ value: 'yes', labelKey: 'optYes' }, { value: 'no', labelKey: 'optNo' }] },
    { key: 'labels', type: 'choice', labelKey: 'setLabels', options: [{ value: 'after', labelKey: 'optAfter' }, { value: 'always', labelKey: 'optAlways' }] }
  ],

  OK_MS: 500, CLASH_MS: 700, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false;
    this._garland = []; this._garPass = -1; this._sel = null; this._clash = null; this._dragged = false; this._ring = false;
    injectChainCSS();
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
  _lv: function () { return SyllableChainCore.level(this._set('level')); },
  _lure: function () { return this._set('lure') !== 'no'; },
  /* a new deal when the level changes, or the trick picture at the chain levels */
  _key: function () { var lv = this._lv(); return lv + (lv !== 'build' ? '/' + (this._lure() ? 'yes' : 'no') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'it', rate: rate || 0.9 }); } catch (e) {} },
  _split: function (k) { return SyllableChainCore.word(k).syl.join('·'); },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._garland = []; this._garPass = -1; } this._pool = SyllableChainCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = SyllableChainCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, lure = this._lure(), args;
    if (r.level === 'build') args = { word: r.w.word, n: r.w.syl.length, parts: r.w.syl.join(' · ') };
    else { var ws = [r.start].concat(r.steps.map(function (s) { return s.answer; })); args = { chain: ws.join(' → ') }; }
    return {
      id: 'syllable-chain.' + r.id, promptKey: r.level === 'build' ? 'pBuild' : 'pChain', promptArgs: args, celebrateKey: r.level === 'build' ? 'okBuild' : 'okChain', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool._clash = null; tool._ring = false;
        if (tool._garPass !== pss) { tool._garland = []; tool._garPass = pss; }
        tool.st = C.newState(r, pss, { lure: lure }); tool._args = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = SyllableChainCore.newState(SyllableChainCore.rounds('short')[0], 0); this._args = { chain: '' }; }
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
    var L = this._L = SyllableChainCore.layout(this._width());
    var wrap = api.el('div', 'scn-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level + (this._set('labels') === 'always' ? ' is-labelled' : '')); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['lw', L.linkW], ['lh', L.linkH], ['pic', L.pic], ['clasp', L.clasp], ['open', L.open], ['word', L.word], ['card', L.card], ['cpic', L.cardPic], ['big', L.big], ['sock', L.sock], ['sockh', L.sockH], ['tile', L.tile]].forEach(function (p) { wrap.style.setProperty('--scn-' + p[0], p[1] + 'px'); });
    var fest = api.el('div', 'scn-festone'); fest.setAttribute('aria-label', this._t('ariaFestone')); this._festEl = fest; wrap.appendChild(fest);
    var stage = api.el('div', 'scn-stage'); this._stageEl = stage; wrap.appendChild(stage);
    var basket = api.el('div', 'scn-basket'); this._basketEl = basket; wrap.appendChild(basket);
    var note = api.el('div', 'scn-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'scn-ask'); ask.appendChild(note);
    var chk = api.el('button', 'scn-check'); chk.type = 'button'; chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
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
    if (!this._stageEl) return;
    var st = this.st, C = SyllableChainCore;
    this._paintFestone();
    if (st.r.level === 'build') { this._paintBig(); this._paintTiles(); } else { this._paintChain(); this._paintBasket(); }
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(st.r.level === 'build' ? 'okBuild' : 'okChain', this._args);
    else if (h) {
      var l = st.last || {}, a = { syl: C.clasp(st) || l.syl, word: l.word, first: l.first, prev: l.prev };
      if (h === 'hintAuto') a.next = st.r.w.syl[l.auto];
      msg = this._t(h, a);
    }
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty' && st.last.result !== 'more'));
    this._checkBtn.textContent = this._t(st.r.level === 'build' && st.phase === 'count' ? 'count' : 'check');
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintFestone: function () {
    var el = this._festEl, self = this; el.innerHTML = '';
    /* a phone keeps the newest chains that fit in two rows; older ones drift out of view */
    var keep = this._L && this._L.mode === 'narrow' ? 4 : 10, list = this._garland.slice(-keep);
    list.forEach(function (g, i) {
      var c = self.api.el('span', 'scn-garl' + (i === list.length - 1 && self.st.done ? ' is-new' : ''));
      c.innerHTML = g.map(function (s) { return '<i></i><b>' + s + '</b>'; }).join('') + '<i></i>';
      el.appendChild(c);
    });
  },

  /* ---- the chain ---- */
  _paintChain: function () {
    var self = this, st = this.st, C = SyllableChainCore, L = this._L, el = this._stageEl;
    var open = !st.done, pos = C.place(L, st.chain.length, open);
    el.innerHTML = ''; el.style.height = Math.ceil(pos.h + 4) + 'px';
    el.setAttribute('role', 'group'); el.setAttribute('aria-label', this._t('ariaChain', { n: st.chain.length }));
    el.insertAdjacentHTML('beforeend', '<span class="scn-hook" aria-hidden="true" style="left:0;top:' + (pos.links[0].y - 22) + 'px"></span>');
    /* the connecting bar behind links and clasps */
    var pts = []; pos.links.forEach(function (p, i) { pts.push(p); if (pos.clasps[i]) pts.push(pos.clasps[i]); });
    var d = 'M' + (L.hook * 0.5) + ' ' + pos.links[0].y + pts.map(function (p) { return ' L' + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join('');
    el.insertAdjacentHTML('beforeend', '<svg class="scn-bar" aria-hidden="true"><path d="' + d + '" fill="none" stroke="#B9934E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    st.chain.forEach(function (k, i) {
      var p = pos.links[i], w = C.word(k), lastLink = i === st.chain.length - 1 && i > 0 && !st.done;
      var b = self.api.el('button', 'scn-link' + (i === 0 ? ' is-start' : '') + (lastLink ? ' is-last' : '') + (st.done && self._ring ? ' is-ring' : ''));
      b.type = 'button'; b.setAttribute('data-id', k);
      b.style.left = (p.x - L.linkW / 2) + 'px'; b.style.top = (p.y - L.linkH / 2) + 'px';
      if (st.done && self._ring) b.style.animationDelay = (i * 0.22) + 's';
      b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(w.pic) + '"><span class="scn-lw">' + w.syl.join('·') + '</span>';
      b.setAttribute('aria-label', lastLink ? self._t('ariaLast', { word: k }) : self._t('ariaPicture', { word: k }));
      b.addEventListener('click', function () { if (self._busy || self._dragged) return; self._say(k); if (lastLink) self._unhook(); });
      el.appendChild(b);
    });
    pos.clasps.forEach(function (p, i) {
      var isOpen = open && i === pos.clasps.length - 1, syl = isOpen ? C.clasp(st) : C.last(st.chain[i]);
      if (isOpen) {
        var o = self.api.el('button', 'scn-open' + (self._sel ? ' is-armed' : '')); o.type = 'button';
        o.style.left = (p.x - L.open / 2) + 'px'; o.style.top = (p.y - L.open / 2) + 'px';
        if (self._clash) { o.classList.add('is-clash'); o.innerHTML = '<span class="scn-half">' + self._clash.syl + '</span><span class="scn-half is-card">' + self._clash.first + '</span>'; }
        else o.innerHTML = '<span>' + syl + '</span>';
        o.setAttribute('aria-label', self._t('ariaOpen', { syl: syl }));
        o.addEventListener('click', function () { if (self._busy || !self._sel) return; self._hook(self._sel); });
        self._openEl = o;
        el.appendChild(o);
      } else {
        el.insertAdjacentHTML('beforeend', '<span class="scn-clasp' + (st.done && self._ring ? ' is-lit' : '') + '" aria-hidden="true" style="left:' + (p.x - L.clasp / 2) + 'px;top:' + (p.y - L.clasp / 2) + 'px;' + (st.done && self._ring ? 'animation-delay:' + (i * 0.22 + 0.11) + 's' : '') + '"><span>' + syl + '</span></span>');
      }
    });
  },
  _paintBasket: function () {
    var self = this, st = this.st, C = SyllableChainCore, el = this._basketEl, tags = C.tags(st), always = this._set('labels') === 'always';
    el.innerHTML = ''; el.className = 'scn-basket' + (st.done ? ' is-empty' : '');
    el.setAttribute('role', 'group');
    st.basket.forEach(function (k) {
      var w = C.word(k), sel = self._sel === k, swing = self._clash && self._clash.word === k;
      var b = self.api.el('button', 'scn-card' + (sel ? ' is-sel' : '') + (swing ? ' is-swing' : '')); b.type = 'button'; b.setAttribute('data-id', k);
      var tag = tags ? '<span class="scn-tag">' + C.first(k) + '</span>' : '';
      b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(w.pic) + '">' + (always ? '<span class="scn-cw">' + w.syl.join('·') + '</span>' : '') + tag;
      b.setAttribute('aria-label', self._t('ariaPicture', { word: k }));
      self._bindCard(b, k);
      el.appendChild(b);
    });
  },
  /* tap a card: it is spoken and lifts (selected); tap it again — or tap the open clasp — to hook it; or drag it onto the open clasp */
  _bindCard: function (b, k) {
    var self = this;
    b.addEventListener('click', function () {
      if (self._busy || self.st.done || self._dragged) return;
      if (self._sel === k) { self._hook(k); return; }
      self._sel = k; self._say(k); self.api.sound(500); self._paint();
    });
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null, r0 = b.getBoundingClientRect();
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = b.cloneNode(true); ghost.className += ' is-drag'; ghost.style.width = r0.width + 'px'; ghost.style.height = r0.height + 'px'; document.body.appendChild(ghost); b.classList.add('is-lifting'); }
        ghost.style.left = (r0.left + e.clientX - x0) + 'px'; ghost.style.top = (r0.top + e.clientY - y0) + 'px'; e.preventDefault();
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (!moved) return;
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        setTimeout(function () { self._dragged = false; }, 0);
        var o = self._openEl && self._openEl.getBoundingClientRect();
        if (o && Math.hypot(e.clientX - (o.left + o.width / 2), e.clientY - (o.top + o.height / 2)) <= 50 + o.width / 2) self._hook(k);
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  _hook: function (k) {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = SyllableChainCore, syl = C.clasp(st), res = C.hook(st, k);
    this._sel = null;
    if (res.invalid) return;
    if (res.closes) {
      this.api.sound(880); this._say(k);
      this.api.announce(this._t('ariaHooked', { word: k, syl: syl }));
      if (res.done) return this._win();
      this._paint(); return;
    }
    this.api.sound(150);
    if (st.help >= 2) this._say(C.word(st.last.prev).syl.join(' … '), 0.7);
    this._clash = { syl: res.clasp, first: res.cardFirst, word: k };
    this._busy = true; this._paint();
    this._later(function () { self._clash = null; self._busy = false; self._paint(); }, this._ms(this.CLASH_MS));
  },
  _unhook: function () { if (this._busy) return; if (SyllableChainCore.unhookLast(this.st)) { this._sel = null; this.api.sound(240); this._paint(); } },

  /* ---- Conta e forma ---- */
  _paintBig: function () {
    var self = this, st = this.st, C = SyllableChainCore, L = this._L, el = this._stageEl, last = st.last || {}, show = st.show && !st.done;
    el.innerHTML = ''; el.style.height = '';
    var link = this.api.el('div', 'scn-big' + (st.done ? ' is-closed' : ''));
    link.setAttribute('role', 'group'); link.setAttribute('aria-label', this._t('ariaLink', { n: st.phase === 'count' ? st.sockets : st.filled.length }));
    var pic = this.api.el('button', 'scn-bigpic'); pic.type = 'button';
    pic.setAttribute('aria-label', this._t('ariaPicture', { word: st.r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(st.r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(st.r.w.word); });
    link.appendChild(pic);
    var socks = this.api.el('div', 'scn-socks');
    if (st.done) {
      var word = this.api.el('span', 'scn-bigword'); word.textContent = st.r.w.word; socks.appendChild(word);
    } else if (st.phase === 'count') {
      /* after a miss: what the sockets held — too few: the last crammed; too many: the extras empty */
      var printed = show && last.printed ? last.printed : null;
      for (var i = 0; i < st.sockets; i++) {
        var s = this.api.el('span', 'scn-sock' + (printed && printed[i] && printed[i].length > 1 ? ' is-crammed' : '') + (printed && printed[i] && !printed[i].length ? ' is-pop' : '') + (show && st.help >= 2 ? ' is-beat' : ''));
        if (show && st.help >= 2) s.style.animationDelay = (i * 0.45) + 's';
        s.textContent = printed && printed[i] ? printed[i].join('·') : '';
        s.setAttribute('aria-label', this._t('ariaSocket', { i: i + 1, s: s.textContent || this._t('ariaEmpty') }));
        socks.appendChild(s);
      }
    } else {
      st.filled.forEach(function (id, at) {
        var t = id ? C.tile(st, id) : null, locked = st.locked.indexOf(at) >= 0;
        var s = self.api.el('button', 'scn-sock is-fill' + (t ? ' is-full' : '') + (locked ? ' is-locked' : '')); s.type = 'button'; s.setAttribute('data-id', 'k' + at);
        s.textContent = t ? t.text : '';
        s.setAttribute('aria-label', self._t('ariaSocket', { i: at + 1, s: t ? t.text : self._t('ariaEmpty') }));
        s.addEventListener('click', function () { if (self._busy) return; if (C.unfill(st, at)) { self.api.sound(240); self._paint(); } });
        socks.appendChild(s);
      });
    }
    link.appendChild(socks);
    if (st.phase === 'count' && !st.done) {
      var knobs = this.api.el('div', 'scn-knobs');
      [['scn-less', '−', 'ariaLess', -1], ['scn-more', '+', 'ariaMore', 1]].forEach(function (k) {
        var b = self.api.el('button', 'scn-knob ' + k[0]); b.type = 'button'; b.textContent = k[1]; b.setAttribute('aria-label', self._t(k[2]));
        b.disabled = (k[3] < 0 && st.sockets <= 1) || (k[3] > 0 && st.sockets >= C.MAX_SOCKETS);
        b.addEventListener('click', function () { self._socket(k[3]); });
        knobs.appendChild(b);
      });
      link.appendChild(knobs);
    }
    el.appendChild(link);
  },
  _socket: function (d) { if (this._busy) return; if (SyllableChainCore.setSockets(this.st, this.st.sockets + d)) { this.api.sound(d > 0 ? 620 : 420); this._paint(); } },
  _paintTiles: function () {
    var self = this, st = this.st, C = SyllableChainCore, el = this._basketEl;
    el.innerHTML = '';
    var list = st.phase === 'build' && !st.done ? st.tiles.filter(function (t) { return st.filled.indexOf(t.id) < 0; }) : [];
    el.className = 'scn-basket is-tiles' + (list.length ? '' : ' is-empty');
    el.setAttribute('role', 'group');
    list.forEach(function (t) {
      var b = self.api.el('button', 'scn-tile'); b.type = 'button'; b.setAttribute('data-id', t.id); b.textContent = t.text;
      b.setAttribute('aria-label', self._t('ariaTile', { s: t.text }));
      b.addEventListener('click', function () { if (self._busy) return; if (C.fill(st, t.id)) { self.api.sound(560); self._say(t.text, 1); self._paint(); } });
      el.appendChild(b);
    });
  },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = SyllableChainCore;
    if (st.r.level !== 'build') { if (this._sel) { this._hook(this._sel); return; } C.ask(st); this.api.sound(460); this._paint(); return; }
    if (st.phase === 'count') {
      var res = C.countCheck(st);
      if (res.right) { this.api.sound(660); this._say(st.r.w.syl.join(' … '), 0.8); this._paint(); return; }
      this.api.sound(196);
      if (st.help >= 2) this._say(st.r.w.syl.join(' … '), 0.6);
      this._paint(); return;
    }
    var b = C.buildCheck(st);
    if (b.right) return this._win();
    this.api.sound(b.kase === 'more' || b.kase === 'empty' ? 460 : 196);
    this._paint();
  },
  _onKey: function (ev) {
    if (this.st.done || this._busy || ev.defaultPrevented) return;
    var st = this.st;
    if (st.r.level === 'build') {
      if (st.phase === 'count' && (ev.key === '+' || ev.key === '-')) { ev.preventDefault(); this._socket(ev.key === '+' ? 1 : -1); }
      else if (st.phase === 'build' && ev.key === 'Backspace') { ev.preventDefault(); for (var i = st.filled.length - 1; i >= 0; i--) if (SyllableChainCore.unfill(st, i)) { this._paint(); break; } }
      return;
    }
    if (ev.key === 'Backspace') { ev.preventDefault(); this._unhook(); return; }
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      var cards = Array.prototype.slice.call(this._basketEl.querySelectorAll('.scn-card')), at = cards.indexOf(document.activeElement);
      var nx = cards[(at < 0 ? 0 : at + (ev.key === 'ArrowRight' ? 1 : cards.length - 1)) % cards.length];
      if (nx) { ev.preventDefault(); nx.focus(); }
    }
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this._busy = true;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    if (r.level === 'build') { this._garland.push([r.w.word]); this._say(r.w.syl.join(' … ') + ' … ' + r.w.word, 0.85); }
    else { var joints = r.steps.map(function (s) { return s.syl; }); this._garland.push(joints); this._ring = true; this._say(joints.join(' … '), 0.85); }
    if (this._garland.length > 10) this._garland.shift();
    this.api.announce(this._t(r.level === 'build' ? 'okBuild' : 'okChain', this._args));
    this._paint();
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var scnCssDone = false;
function injectChainCSS() {
  if (scnCssDone || typeof document === 'undefined') return;
  scnCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.scn-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--scn-ink:#2A2A35;--scn-teal:#146B5E;--scn-coral:#F2784B;--scn-brass:#C9A24E;user-select:none;-webkit-user-select:none;}'
  + '.scn-wrap:focus{outline:none;}'
  + '.scn-festone:empty{display:none;} .scn-festone{display:flex;flex-wrap:wrap;gap:6px 10px;min-height:32px;padding:4px 10px;border-radius:10px;background:linear-gradient(#B9934E,#B9934E) 0 50%/100% 2px no-repeat,#FFF8EA;box-shadow:inset 0 0 0 2px #E4D3B0;}'
  + '.scn-garl{display:inline-flex;align-items:center;gap:2px;padding:2px 4px;border-radius:999px;background:#FFF8EA;} .scn-garl i{width:14px;height:14px;border-radius:50%;box-shadow:inset 0 0 0 3px var(--scn-brass);} .scn-garl b{font:800 14px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);padding:0 2px;} .scn-garl.is-new{animation:scn-fly .9s ease-out;} @keyframes scn-fly{0%{transform:translateY(60px) scale(.6);opacity:0;}100%{transform:none;opacity:1;}}'
  + '@media (max-width:339px){.scn-festone{display:none;}}'
  + '.scn-stage{position:relative;width:100%;}'
  + '.scn-bar{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none;}'
  + '.scn-hook{position:absolute;width:14px;height:44px;border-radius:7px;background:linear-gradient(90deg,#9C7A35,#E2C27A,#9C7A35);box-shadow:inset 0 0 0 2px var(--scn-ink);}'
  + '.scn-link{position:absolute;width:var(--scn-lw);height:var(--scn-lh);padding:10px 2px 14px;border:0;border-radius:46% / 40%;background:#FBF3E4;box-shadow:inset 0 0 0 4px var(--scn-ink),inset 0 0 0 8px var(--scn-brass);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;cursor:pointer;font:inherit;z-index:2;}'
  + '.scn-link img{width:var(--scn-pic);height:var(--scn-pic);object-fit:contain;display:block;} .scn-lw{margin-top:2px;padding:1px 5px;border-radius:7px;background:#FFFDF6;font:700 var(--scn-word)/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);white-space:nowrap;position:relative;z-index:1;}'
  + '.scn-link.is-last{box-shadow:inset 0 0 0 4px var(--scn-ink),inset 0 0 0 8px var(--scn-brass),0 0 0 3px rgba(20,107,94,.25);animation:scn-hang .5s ease-out;transform-origin:50% 0;} @keyframes scn-hang{0%{transform:rotate(-8deg);}50%{transform:rotate(5deg);}100%{transform:none;}}'
  + '.scn-link.is-ring{animation:scn-ring .5s ease-in-out both;} @keyframes scn-ring{40%{transform:rotate(-7deg) translateY(-4px);}80%{transform:rotate(4deg);}}'
  + '.scn-clasp{position:absolute;width:var(--scn-clasp);height:var(--scn-clasp);border-radius:50%;background:radial-gradient(circle at 35% 30%,#F3DC9C,var(--scn-brass) 55%,#8E6C2A);box-shadow:inset 0 0 0 3px var(--scn-ink);display:flex;align-items:center;justify-content:center;z-index:3;} .scn-clasp span{font:800 max(14px,calc(var(--scn-clasp) * .45))/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);} .scn-clasp.is-lit{animation:scn-lit .5s ease-out both;} @keyframes scn-lit{50%{filter:brightness(1.35);transform:scale(1.15);}}'
  + '.scn-open{position:absolute;width:var(--scn-open);height:var(--scn-open);padding:0;border:0;border-radius:50%;background:#FFFDF6;box-shadow:inset 0 0 0 4px var(--scn-brass),0 0 0 5px rgba(242,120,75,.35);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:3;font:inherit;animation:scn-glow 1.6s ease-in-out infinite;} .scn-open span{font:800 max(16px,calc(var(--scn-open) * .4))/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);} @keyframes scn-glow{50%{box-shadow:inset 0 0 0 4px var(--scn-brass),0 0 0 9px rgba(242,120,75,.18);}}'
  + '.scn-open.is-armed{box-shadow:inset 0 0 0 4px var(--scn-teal),0 0 0 6px rgba(20,107,94,.35);}'
  + '.scn-open.is-clash{width:calc(var(--scn-open) * 1.9);margin-left:calc(var(--scn-open) * -.45);border-radius:999px;gap:2px;animation:scn-shake .35s ease-in-out 2;box-shadow:inset 0 0 0 3px #A6461F;} .scn-half{padding:0 4px;} .scn-half.is-card{color:#A6461F !important;border-left:2px solid #A6461F;} @keyframes scn-shake{25%{translate:-4px 0;}75%{translate:4px 0;}}'
  + '.scn-basket{display:flex;justify-content:center;align-items:flex-end;gap:12px;min-height:calc(var(--scn-card) + 12px);padding:6px;border-radius:16px;background:repeating-linear-gradient(45deg,#E9D6AE 0 8px,#E1CB9D 8px 16px);box-shadow:inset 0 0 0 3px #B8925E;} .scn-basket.is-empty{min-height:0;padding:0;background:transparent;box-shadow:none;} .is-narrow .scn-basket{gap:8px;}'
  + '.scn-card{position:relative;width:var(--scn-card);min-height:var(--scn-card);padding:6px 4px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 3px var(--scn-ink),0 3px 0 #B8925E;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font:inherit;touch-action:none;}'
  + '.scn-card img{width:var(--scn-cpic);height:var(--scn-cpic);object-fit:contain;display:block;} .scn-cw{font:700 15px/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);white-space:nowrap;}'
  + '.is-narrow.is-labelled .scn-card img{width:68px;height:68px;} .is-narrow.is-labelled .scn-card{padding-top:4px;padding-bottom:4px;}'
  + '.scn-card.is-sel{transform:translateY(-8px);box-shadow:inset 0 0 0 3px var(--scn-teal),0 0 0 4px rgba(20,107,94,.3),0 6px 0 #B8925E;}'
  + '.scn-card.is-swing{animation:scn-swing .7s ease-in-out;} @keyframes scn-swing{20%{transform:rotate(9deg);}45%{transform:rotate(-7deg);}70%{transform:rotate(4deg) translateY(-3px);}}'
  + '.scn-tag{position:absolute;top:-10px;left:50%;transform:translateX(-50%);padding:2px 8px;border-radius:8px;background:#FFF2C7;box-shadow:inset 0 0 0 2px var(--scn-brass);font:800 16px/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);animation:scn-tagin .3s ease-out;} @keyframes scn-tagin{0%{transform:translate(-50%,6px);opacity:0;}}'
  + '.scn-card.is-lifting{opacity:.35;} .scn-card.is-drag{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));}'
  + '.scn-big{display:flex;align-items:center;justify-content:center;gap:14px;padding:14px 18px;border-radius:999px;background:#FBF3E4;box-shadow:inset 0 0 0 4px var(--scn-ink),inset 0 0 0 9px var(--scn-brass);} .is-narrow .scn-big{flex-wrap:wrap;border-radius:40px;padding:12px;gap:10px;}'
  + '.scn-bigpic{flex:none;padding:4px;border:0;border-radius:16px;background:transparent;cursor:pointer;} .scn-bigpic img{width:var(--scn-big);height:var(--scn-big);object-fit:contain;display:block;}'
  + '.scn-socks{display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:nowrap;} .is-narrow .scn-socks{order:3;width:100%;gap:4px;}'
  + '.scn-sock{width:var(--scn-sock);height:var(--scn-sockh);display:flex;align-items:center;justify-content:center;border-radius:12px;outline:3px dashed #8A6534;outline-offset:-3px;background:#FFFDF6;font:800 var(--scn-tile)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);padding:0;border:0;white-space:nowrap;}'
  + '.scn-sock.is-crammed{outline-color:#A6461F;font-size:15px;letter-spacing:-.4px;color:#A6461F;} .scn-sock.is-pop{animation:scn-pop .6s ease-out;opacity:.55;} @keyframes scn-pop{40%{transform:scale(1.15);}}'
  + '.scn-sock.is-beat{animation:scn-beat .45s ease-in-out both;} @keyframes scn-beat{50%{background:#FFE3D4;outline-color:var(--scn-coral);transform:scale(1.08);}}'
  + '.scn-sock.is-fill{cursor:pointer;} .scn-sock.is-full{outline:3px solid var(--scn-ink);background:#FFF8EA;} .scn-sock.is-locked{outline:3px solid var(--scn-teal);background:#E2F2EE;cursor:default;}'
  + '.scn-bigword{padding:6px 18px;border-radius:14px;background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--scn-teal);font:800 calc(var(--scn-tile) + 4px)/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);animation:scn-close .45s ease-out;} @keyframes scn-close{0%{letter-spacing:14px;}}'
  + '.scn-knobs{display:flex;gap:8px;flex:none;} .scn-knob{width:48px;height:48px;border:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F3DC9C,var(--scn-brass) 60%,#8E6C2A);box-shadow:inset 0 0 0 3px var(--scn-ink),0 3px 0 #8E6C2A;font:800 26px/1 var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--scn-ink);cursor:pointer;} .scn-knob:disabled{opacity:.4;cursor:default;}'
  + '.scn-basket.is-tiles{min-height:calc(var(--scn-sockh) + 16px);flex-wrap:wrap;}'
  + '.scn-tile{min-width:var(--scn-sock);height:var(--scn-sockh);padding:0 10px;border:0;border-radius:12px;background:#FFF2C7;box-shadow:inset 0 0 0 3px var(--scn-ink),0 3px 0 #B8925E;font:800 var(--scn-tile)/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-ink);cursor:pointer;}'
  + '.scn-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.scn-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--scn-teal);text-align:center;flex:1;} .scn-note:empty{display:none;} .scn-note.is-ok{font-weight:800;} .scn-note.is-wrong{color:#A6461F;} .is-narrow .scn-note{font-size:15px;text-align:left;}'
  + '.scn-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .scn-check[hidden]{display:none;} .scn-check:disabled{opacity:.5;}'
  + '.scn-link:focus-visible,.scn-card:focus-visible,.scn-open:focus-visible,.scn-check:focus-visible,.scn-tile:focus-visible,.scn-sock:focus-visible,.scn-knob:focus-visible,.scn-bigpic:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.scn-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'scn-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.SyllableChainActivity = SyllableChainActivity;
