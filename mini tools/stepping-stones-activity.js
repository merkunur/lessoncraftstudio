/* =====================================================================
   stepping-stones-activity.js — ACTIVITY #48 of the one-by-one rebuild:
   "Bygg ordet av stavelser" (sv) → STENARNA I BÄCKEN, the stepping
   stones (RF.K.2.B, Swedish). Design sheet: docs/activities-rebuild/designs/048-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: stepping stones that each hold one syllable. Lay the
   stones, press Hoppa! and the library frog hops the word across the
   stream — a stone with two syllables sinks half under, a stone with
   none slips away, a stone out of order tips. In Gömda ord, lift a stone
   out and the frog hops a different word: the far bank shows it.
   Three levels: Räkna stavelser · Bygg ordet · Gömda ord.

   ACTIVITY LAYER ONLY: the model is stepping-stones-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.SteppingStonesActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var SteppingStonesActivity = {
  id: 'stepping-stones',
  apparatusClasses: ['sst-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'The Stepping Stones',sv:'Stenarna i bäcken'},
    instruction:   {en:'Lay a stone for every syllable and the frog hops the word across. In Hidden words, lift out part of the word and see what word is left.',sv:'Lägg en sten för varje stavelse, så hoppar grodan över ordet. I Gömda ord lyfter du bort en del av ordet och ser vilket ord som blir kvar.'},
    check:         {en:'Hop!',sv:'Hoppa!'},
    pCount:        {en:'One stone for every syllable.',sv:'En sten för varje stavelse.'},
    pBuild:        {en:'Build the word across the stream.',sv:'Bygg ordet över bäcken.'},
    pHidden:       {en:'Which part has to go?',sv:'Vilken del ska bort?'},
    hintCount:     {en:'Lay a stone for every syllable you hear.',sv:'Lägg en sten för varje stavelse du hör.'},
    hintBuild:     {en:'Lay the stones in order across the stream.',sv:'Lägg stenarna i ordning över bäcken.'},
    hintLift:      {en:'Lift out a part so that it makes {target}.',sv:'Lyft bort en del så att det blir {target}.'},
    hintShort:     {en:'More than one syllable on a stone — it sinks! Lay one more stone.',sv:'Fler än en stavelse på en sten — den sjunker! Lägg en sten till.'},
    hintLong:      {en:'That stone has no syllable.',sv:'Den stenen har ingen stavelse.'},
    hintLong2:     {en:'Those stones have no syllable.',sv:'De stenarna har ingen stavelse.'},
    hintNod:       {en:'Watch the frog nod: one stone for each nod.',sv:'Titta på grodan när den nickar: en sten för varje nick.'},
    hintMore:      {en:'The word has more syllables.',sv:'Ordet har fler stavelser.'},
    hintHolds:     {en:'The frog got to {last}. What comes next?',sv:'Grodan kom till {last}. Vad kommer sen?'},
    hintFirst:     {en:'Which syllable comes first?',sv:'Vilken stavelse kommer först?'},
    hintDecoy:     {en:'That stone is not part of the word.',sv:'Den stenen hör inte till ordet.'},
    hintNext:      {en:'The glowing stone is next.',sv:'Stenen som lyser kommer sen.'},
    hintMade:      {en:'That made {made} — not {target}.',sv:'Det blev {made} — inte {target}.'},
    hintNoWord:    {en:'That made no word. Which part has to go?',sv:'Det blev inget ord. Vilken del ska bort?'},
    hintKeep:      {en:'Keep the glowing stones.',sv:'Behåll stenarna som lyser.'},
    okCount:       {en:'{word}: {n} syllables — {parts}!',sv:'{word}: {n} stavelser — {parts}!'},
    okCountOne:    {en:'{word}: one syllable!',sv:'{word}: en stavelse!'},
    okBuild:       {en:'{plus} = {word}!',sv:'{plus} = {word}!'},
    okHidden:      {en:'{compound} without {lift} is {target}!',sv:'{compound} utan {lift} blir {target}!'},
    setLevel:      {en:'Level',sv:'Nivå'},
    lvCount:       {en:'Count syllables',sv:'Räkna stavelser'},
    lvBuild:       {en:'Build the word',sv:'Bygg ordet'},
    lvHidden:      {en:'Hidden words',sv:'Gömda ord'},
    setDecoy:      {en:'Trick stone',sv:'Lursten'},
    optOff:        {en:'Off',sv:'Av'},
    optOn:         {en:'On',sv:'På'},
    setShow:       {en:'The word',sv:'Ordet'},
    optHop:        {en:'Shown when the frog hops',sv:'Syns när grodan hoppar'},
    optStart:      {en:'Shown from the start',sv:'Syns från början'},
    ariaPond:      {en:'Finished words',sv:'Färdiga ord'},
    ariaPicture:   {en:'Picture: {word} — tap to hear it',sv:'Bild: {word} — tryck för att höra ordet'},
    ariaStream:    {en:'Stream with {n} stones',sv:'Bäck med {n} stenar'},
    ariaStone:     {en:'Stone {i}: {s}',sv:'Sten {i}: {s}'},
    ariaEmpty:     {en:'empty',sv:'tom'},
    ariaPileStone: {en:'Stone: {s}',sv:'Sten: {s}'},
    ariaPile:      {en:'Stone pile with {n} stones',sv:'Stenhög med {n} stenar'},
    ariaBank:      {en:'Stones lifted out',sv:'Stenar som lyfts bort'},
    ariaLay:       {en:'Lay a stone',sv:'Lägg en sten'},
    ariaFar:       {en:'The other side: {word}',sv:'Andra sidan: {word}'},
    ariaFrog:      {en:'The frog',sv:'Grodan'},
    ariaHopped:    {en:'The frog hopped across: {word}',sv:'Grodan hoppade över: {word}'}
    /*STRINGS-END*/
  },
  defaults: { level: 'count', decoy: 'off', show: 'hop' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'count', labelKey: 'lvCount' }, { value: 'build', labelKey: 'lvBuild' }, { value: 'hidden', labelKey: 'lvHidden' }] },
    { key: 'decoy', type: 'choice', labelKey: 'setDecoy', options: [{ value: 'off', labelKey: 'optOff' }, { value: 'on', labelKey: 'optOn' }] },
    { key: 'show', type: 'choice', labelKey: 'setShow', options: [{ value: 'hop', labelKey: 'optHop' }, { value: 'start', labelKey: 'optStart' }] }
  ],

  OK_MS: 2600, HOP_MS: 380, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._shut = false;
    this._lilies = []; this._lilyPass = -1; this._dragged = false; this._made = null; this._backKey = null;
    injectSteppingCSS();
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
  _lv: function () { return SteppingStonesCore.level(this._set('level')); },
  _decoy: function () { return this._set('decoy') === 'on'; },
  /* a new deal when the level changes, or the trick stone at Bygg ordet */
  _key: function () { var lv = this._lv(); return lv + (lv === 'build' ? '/' + (this._decoy() ? 'on' : 'off') : ''); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: 'sv', rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { if (this._poolKey && this._poolKey !== k) { this._lilies = []; this._lilyPass = -1; } this._pool = SteppingStonesCore.rounds(this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = SteppingStonesCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pss = pass, w = r.w, beats = w.syl.length, dec = r.level === 'build' && this._decoy();
    var args = { word: w.word, n: beats, parts: w.syl.join(' · '), plus: w.syl.join(' + ') };
    if (r.level === 'hidden') { args.target = r.target.word; args.compound = w.word; args.lift = r.lift.map(function (i) { return w.syl[i]; }).join(''); }
    var pk = { count: 'pCount', build: 'pBuild', hidden: 'pHidden' }[r.level];
    var ck = r.level === 'count' ? (beats === 1 ? 'okCountOne' : 'okCount') : r.level === 'build' ? 'okBuild' : 'okHidden';
    return {
      id: 'stepping-stones.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: ck, answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._shut = false; tool._made = null; tool._backKey = null;
        if (tool._lilyPass !== pss) { tool._lilies = []; tool._lilyPass = pss; }
        tool.st = C.newState(r, pss, { decoy: dec }); tool._args = args; tool._ck = ck;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { this.st = SteppingStonesCore.newState(SteppingStonesCore.rounds('count')[0], 0); this._args = {}; this._ck = 'okCount'; }
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
    var L = this._L = SteppingStonesCore.layout(this._width());
    var wrap = api.el('div', 'sst-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap;
    wrap.tabIndex = -1;
    [['sign', L.sign], ['frog', L.frog], ['far', L.far], ['sh', L.stoneH], ['syl', L.syl], ['sceneh', L.sceneH], ['wt', L.waterTop], ['wh', L.waterH], ['x0', L.x0], ['x1', L.x1]].forEach(function (p) { wrap.style.setProperty('--sst-' + p[0], p[1] + 'px'); });
    var top = api.el('div', 'sst-top'); wrap.appendChild(top);
    var sign = api.el('div', 'sst-signpost'); this._signEl = sign; top.appendChild(sign);
    var pond = api.el('div', 'sst-pond'); pond.setAttribute('aria-label', this._t('ariaPond')); this._pondEl = pond; top.appendChild(pond);
    var scene = api.el('div', 'sst-scene'); this._scene = scene; wrap.appendChild(scene);
    var pile = api.el('div', 'sst-pile'); this._pileEl = pile; wrap.appendChild(pile);
    var note = api.el('div', 'sst-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'sst-ask'); ask.appendChild(note);
    var chk = api.el('button', 'sst-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._hop(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    scene.addEventListener('click', function (ev) { self._onWater(ev); });
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
    if (!this._scene) return;
    var st = this.st, C = SteppingStonesCore;
    this._paintTop(); this._paintScene(); this._paintPile();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(this._ck, this._args);
    else if (h) {
      var a = Object.assign({}, this._args);
      if (st.last && st.last.prefix) a.last = st.r.w.syl[st.last.prefix - 1];
      if (st.last && st.last.made !== undefined) a.made = st.last.made;
      msg = this._t(h, a);
    }
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.misses && st.last && st.last.result !== 'empty' && st.last.result !== 'more'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _paintTop: function () {
    var self = this, st = this.st, r = st.r;
    this._signEl.innerHTML = '';
    var pic = this.api.el('button', 'sst-sign'); pic.type = 'button';
    pic.setAttribute('aria-label', this._t('ariaPicture', { word: r.w.word }));
    pic.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.w.pic) + '">';
    pic.addEventListener('click', function () { self._say(r.w.word); });
    this._signEl.appendChild(pic);
    this._signEl.insertAdjacentHTML('beforeend', '<span class="sst-post" aria-hidden="true"></span>');
    var el = this._pondEl; el.innerHTML = '';
    var lv = r.level, show = st.show && !st.done;
    /* count, miss 2: the word as a row of small stones, one per syllable — the frog nods once for each */
    if (lv === 'count' && show && st.help >= 2) {
      var ban = this.api.el('span', 'sst-banner'); ban.setAttribute('aria-hidden', 'true');
      ban.innerHTML = r.w.syl.map(function (x) { return '<b>' + x + '</b>'; }).join('');
      el.appendChild(ban);
    } else if (lv === 'count' && this._set('show') === 'start' && !st.done) {
      /* count, "shown from the start": the word, faint (the stones still have to be laid) */
      var fa = this.api.el('span', 'sst-faint'); fa.textContent = r.w.word; fa.setAttribute('aria-hidden', 'true'); el.appendChild(fa);
    }
    if (!this._lilies.length) el.insertAdjacentHTML('beforeend', '<span class="sst-pad" aria-hidden="true"></span><span class="sst-pad is-b" aria-hidden="true"></span><span class="sst-pad is-c" aria-hidden="true"></span>');
    /* newest first: the pond holds what fits beside the sign, the oldest pads drift out of view */
    /* a phone shows only the newest pads that fit beside the sign — never a row cut in half */
    var cap = this._L && this._L.mode === 'narrow' ? (el.querySelector('.sst-banner') ? 2 : 4) : 10;
    this._lilies.slice().reverse().slice(0, cap).forEach(function (w, i) {
      var c = self.api.el('span', 'sst-lily' + (i === 0 && st.done ? ' is-new' : ''));
      c.innerHTML = '<i></i><span>' + w + '</span>';
      el.appendChild(c);
    });
  },

  /* ---- the scene: water, banks, stones, the far bank, the frog ---- */
  /* the stones in the water now: [{id, i, text, cls}] */
  _waterStones: function () {
    var st = this.st, r = st.r, out = [];
    if (r.level === 'count') { for (var i = 0; i < st.laid; i++) out.push({ id: 'b' + i, i: i, text: '' }); return out; }
    if (r.level === 'build') return st.row.map(function (id, i) { var s = SteppingStonesCore.stone(st, id); return { id: id, i: i, text: s.text, s: s.s }; });
    var lifted = this._made ? this._made.lifted : st.lifted;
    return st.stones.filter(function (s, q) { return lifted.indexOf(q) < 0; }).map(function (s, i) { return { id: s.id, i: i, text: s.text, s: s.s, q: st.stones.indexOf(s) }; });
  },
  _stoneXs: function (n) { var L = this._L; return SteppingStonesCore.spread(n, L.x0, L.x1); },
  _frogSpot: function (x) { var L = this._L; return { x: x, y: L.waterY - L.stoneH * 0.32 - L.frog * 0.32 }; },
  _home: function () { var L = this._L; return { x: L.homeX, y: L.homeY }; },
  /* the frog at full size beside the far bank's frame: at the water's far end (wide), on the top bank (narrow) */
  _farSpot: function () { var L = this._L; return L.mode === 'wide' ? { x: L.x1 - L.frog / 2, y: L.waterY - L.frog * 0.1 } : { x: L.farX - L.far / 2 - L.frog / 2 - 4, y: L.farY }; },
  /* where the frog sits once the paint settles */
  _frogRest: function (ws) {
    var st = this.st, last = st.last || {}, xs = this._stoneXs(ws.length), show = st.show && !st.done, n = st.r.w.syl.length;
    if (st.done) return this._farSpot();
    if (!show) return this._home();
    if (st.r.level === 'count') { if (last.result === 'short') return this._frogSpot(xs[ws.length - 1]); if (last.result === 'long') return this._frogSpot(xs[n - 1]); return this._home(); }
    if (st.r.level === 'build') return last.prefix > 0 ? this._frogSpot(xs[last.prefix - 1]) : this._home();
    if (this._made && ws.length) return this._frogSpot(xs[ws.length - 1]);
    return this._home();
  },
  _paintScene: function () {
    var self = this, st = this.st, r = st.r, C = SteppingStonesCore, L = this._L, sc = this._scene, last = st.last || {}, show = st.show && !st.done;
    sc.innerHTML = '';
    var ws = this._waterStones(), xs = this._stoneXs(ws.length), sw = C.stoneW(L, ws.length), glow = C.glow(st);
    sc.setAttribute('role', 'group');
    sc.setAttribute('aria-label', this._t('ariaStream', { n: ws.length }));
    sc.insertAdjacentHTML('beforeend', '<span class="sst-water" aria-hidden="true"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><path class="sst-rip" d="M4 12 q6 -4 12 0 t12 0"/><path class="sst-rip sst-rip2" d="M58 26 q6 -4 12 0 t12 0"/><path class="sst-rip sst-rip3" d="M30 33 q5 -3 10 0 t10 0"/></svg></span>');
    if (L.mode === 'wide') sc.insertAdjacentHTML('beforeend', '<span class="sst-bank is-near" aria-hidden="true"></span><span class="sst-bank is-far" aria-hidden="true"></span>');
    else sc.insertAdjacentHTML('beforeend', '<span class="sst-bank is-top" aria-hidden="true"></span>');
    /* count, miss 2: the frog nods once per syllable (the syllable stones show in the pond row) */
    var nod = r.level === 'count' && show && st.help >= 2;
    /* what the frog wrote on the laid stones (count): on a miss or at success */
    var printed = r.level === 'count' ? (st.done ? r.w.syl.map(function (s) { return [s]; }) : show && last.printed ? last.printed : null) : null;
    if (st.done && this._shut) {
      var card = this.api.el('span', 'sst-word'); card.textContent = r.level === 'hidden' ? r.target.word : r.w.word; sc.appendChild(card);
    } else ws.forEach(function (w, i) {
      var x = xs[i], text = r.level === 'count' ? (printed ? (printed[i] || []).join('·') : '') : w.text;
      var cls = 'sst-stone';
      if (r.level === 'count' && printed && printed[i] && printed[i].length > 1) cls += ' is-heavy';
      if (r.level === 'count' && printed && printed[i] && !printed[i].length) cls += ' is-sink';
      if (show && r.level === 'build' && last.prefix > i) cls += ' is-right';
      if (glow.indexOf(w.id) >= 0) cls += ' is-glow';
      if (st.done) cls += ' is-done';
      var el = self.api.el('button', cls); el.type = 'button'; el.setAttribute('data-id', w.id);
      el.style.left = (x - sw / 2) + 'px'; el.style.width = sw + 'px';
      var len = text.length, fs = len > 3 ? Math.max(14, Math.min(L.syl, Math.floor(sw * 0.86 / (len * 0.58)))) : L.syl;
      el.innerHTML = '<span class="sst-chalk" style="font-size:' + fs + 'px">' + text + '</span>';
      el.setAttribute('aria-label', self._t('ariaStone', { i: i + 1, s: text || self._t('ariaEmpty') }));
      self._bindWaterStone(el, w);
      sc.appendChild(el);
    });
    /* count, too few: a ghost stone floats beside the heavy one */
    if (r.level === 'count' && show && last.result === 'short' && st.help < 2 && ws.length) {
      var lx = xs[ws.length - 1], gx2 = lx + sw * 0.7 > L.x1 - sw * 0.3 ? lx - sw * 0.7 : lx + sw * 0.7;
      sc.insertAdjacentHTML('beforeend', '<span class="sst-ghost is-one" aria-hidden="true" style="left:' + (gx2 - sw * 0.35) + 'px;width:' + (sw * 0.7) + 'px"></span>');
    }
    /* the far bank: the round's picture (count / build), the target (hidden) — or, for 1.4 s after a lift, what the stones made */
    var far = this.api.el('span', 'sst-far' + (st.done ? ' is-bounce' : '')), fw = r.level === 'hidden' ? r.target : r.w;
    far.style.left = (L.farX - L.far / 2) + 'px'; far.style.top = (L.farY - L.far / 2) + 'px';
    var what = this._made ? this._made.what : null;
    if (what && what.kind === 'picture') { far.innerHTML = '<img alt="" draggable="false" src="' + this._pic(what.pic) + '">'; far.classList.add('is-made'); far.setAttribute('aria-label', this._t('ariaFar', { word: what.word })); }
    else if (what && what.kind === 'word') { far.innerHTML = '<span class="sst-card">' + what.word + '</span>'; far.classList.add('is-made'); far.setAttribute('aria-label', this._t('ariaFar', { word: what.word })); }
    else if (what) { var left = this._waterStones().map(function (w) { return w.text; }); far.innerHTML = '<span class="sst-card is-none">' + left.join('·') + '</span>'; far.classList.add('is-made'); far.setAttribute('aria-label', this._t('ariaFar', { word: left.join('·') })); }
    else { far.innerHTML = '<img alt="" draggable="false" src="' + this._pic(fw.pic) + '">'; far.setAttribute('aria-label', this._t('ariaFar', { word: fw.word })); }
    far.setAttribute('role', 'img');
    sc.appendChild(far);
    /* the frog */
    var spot = this._frogRest(ws);
    var frog = this.api.el('button', 'sst-frog' + (nod ? ' is-nod' : '') + (show && r.level === 'count' && last.result === 'short' ? ' is-teeter' : '')); frog.type = 'button';
    frog.setAttribute('aria-label', this._t('ariaFrog'));
    frog.style.left = (spot.x - L.frog / 2) + 'px'; frog.style.top = (spot.y - L.frog / 2) + 'px';
    if (nod) frog.style.setProperty('--sst-nods', r.w.syl.length);
    frog.innerHTML = '<img alt="" draggable="false" src="' + this._pic('camping/frog') + '">';
    frog.addEventListener('click', function (ev) { ev.stopPropagation(); if (self._busy) return; frog.classList.remove('is-jump'); void frog.offsetWidth; frog.classList.add('is-jump'); });
    this._frog = frog;
    sc.appendChild(frog);
  },
  /* the pile below the stream: blank stones (count), the syllable stones (build), the lifted stones on the bank (hidden) */
  _paintPile: function () {
    var self = this, st = this.st, r = st.r, C = SteppingStonesCore, el = this._pileEl, glow = C.glow(st);
    el.innerHTML = '';
    var list = [];
    if (st.done) { el.className = 'sst-pile is-empty'; return; }
    if (r.level === 'count') for (var i = 0; i < C.MAX_STONES - st.laid; i++) list.push({ id: 'p' + i, text: '' });
    else if (r.level === 'build') list = st.pile.map(function (id) { return C.stone(st, id); });
    else { var lifted = this._made ? this._made.lifted : st.lifted; list = lifted.map(function (q) { var s = st.stones[q]; return { id: s.id, text: s.text, q: q }; }); }
    el.className = 'sst-pile' + (list.length ? '' : ' is-empty');
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', r.level === 'hidden' ? this._t('ariaBank') : this._t('ariaPile', { n: list.length }));
    /* the stones that just floated back after a tip arrive with a hop — once per Hoppa! */
    var bk = r.id + '/' + st.misses, fresh = st.show && st.last && st.last.tipped && this._backKey !== bk; if (fresh) this._backKey = bk;
    list.forEach(function (s) {
      var cls = 'sst-pstone' + (glow.indexOf(s.id) >= 0 ? ' is-glow' : '') + (fresh && st.last.tipped.indexOf(s.id) >= 0 ? ' is-back' : '') + (r.level === 'hidden' ? ' is-lifted' : '');
      var b = self.api.el('button', cls); b.type = 'button'; b.setAttribute('data-id', s.id);
      b.innerHTML = '<span class="sst-chalk">' + s.text + '</span>';
      b.setAttribute('aria-label', r.level === 'count' ? self._t('ariaLay') : self._t('ariaPileStone', { s: s.text }));
      self._bindPileStone(b, s);
      el.appendChild(b);
    });
  },

  /* ---- the hand ---- */
  _onWater: function (ev) {
    if (this._busy || this.st.done || this._dragged) return;
    if (ev.target.closest && ev.target.closest('.sst-stone,.sst-frog,.sst-far')) return;
    if (this.st.r.level === 'count') { this._lay(); return; }
    /* free play: the water rings */
    var r = this._scene.getBoundingClientRect(), ring = this.api.el('span', 'sst-ring');
    ring.style.left = (ev.clientX - r.left - 20) + 'px'; ring.style.top = (ev.clientY - r.top - 20) + 'px';
    this._scene.appendChild(ring); setTimeout(function () { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 900);
  },
  _lay: function () { if (this._busy) return; if (SteppingStonesCore.lay(this.st)) { this.api.sound(330); this._paint(); } },
  _unlay: function () { if (this._busy) return; if (SteppingStonesCore.unlay(this.st)) { this.api.sound(220); this._paint(); } },
  _place: function (id, gap) { if (this._busy) return; var s = SteppingStonesCore.stone(this.st, id); if (SteppingStonesCore.place(this.st, id, gap)) { this.api.sound(380); if (s) this._say(s.text); this._paint(); } },
  _unplace: function (id) { if (this._busy) return; if (SteppingStonesCore.unplace(this.st, id)) { this.api.sound(220); this._paint(); } },
  _toggleLift: function (q) {
    if (this._busy) return;
    var C = SteppingStonesCore, st = this.st;
    if (st.lifted.indexOf(q) >= 0 ? C.unlift(st, q) : C.lift(st, q)) { this.api.sound(st.lifted.indexOf(q) >= 0 ? 440 : 260); this._paint(); }
  },
  _bindWaterStone: function (el, w) {
    var self = this, lv = this.st.r.level;
    if (lv === 'build') { this._bindDrag(el, w.id, true); return; }
    el.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (self._busy || self.st.done || self._dragged) return;
      if (lv === 'count') self._unlay(); else self._toggleLift(w.q);
    });
  },
  _bindPileStone: function (el, s) {
    var self = this, lv = this.st.r.level;
    if (lv === 'build') { this._bindDrag(el, s.id, false); return; }
    el.addEventListener('click', function () {
      if (self._busy || self.st.done) return;
      if (lv === 'count') self._lay(); else self._toggleLift(s.q);
    });
  },
  /* Bygg ordet: tap a pile stone → it goes to the end of the row; tap a row stone → back to the pile;
     drag either → drop in the water at the nearest gap, or on the pile to take it out */
  _bindDrag: function (el, id, inRow) {
    var self = this;
    el.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (self._busy || self.st.done || self._dragged) return;
      if (inRow) self._unplace(id); else self._place(id);
    });
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || ev.button > 0) return;
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null, r0 = el.getBoundingClientRect();
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
        if (!moved) { moved = true; self._dragged = true; ghost = el.cloneNode(true); ghost.className += ' is-drag'; ghost.style.width = r0.width + 'px'; ghost.style.height = r0.height + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifting'); }
        ghost.style.left = (r0.left + e.clientX - x0) + 'px'; ghost.style.top = (r0.top + e.clientY - y0) + 'px';
        e.preventDefault();
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (!moved) return;
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        setTimeout(function () { self._dragged = false; }, 0);
        var sr = self._scene.getBoundingClientRect(), pr = self._pileEl.getBoundingClientRect();
        if (e.clientY >= sr.top && e.clientY <= sr.bottom && e.clientX >= sr.left && e.clientX <= sr.right) self._place(id, self._gapAt(e.clientX - sr.left, id));
        else if (inRow && e.clientY >= pr.top - 20 && e.clientY <= pr.bottom + 20) self._unplace(id);
        else self._paint();
      };
      window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  },
  /* the gap a drop lands in: how many row stones (other than the dragged one) lie left of the point */
  _gapAt: function (x, id) {
    var st = this.st, row = st.row, xs = this._stoneXs(row.length), gap = 0, skip = row.indexOf(id);
    for (var i = 0; i < row.length; i++) if (i !== skip && xs[i] < x) gap++;
    return gap + (skip >= 0 && skip < gap ? 1 : 0);
  },
  _onKey: function (ev) {
    if (this.st.done || this._busy || ev.defaultPrevented) return;
    var lv = this.st.r.level;
    if (lv === 'count' && (ev.key === '+' || ev.key === 'ArrowUp')) { ev.preventDefault(); this._lay(); }
    else if (lv === 'count' && (ev.key === '-' || ev.key === 'ArrowDown' || ev.key === 'Backspace')) { ev.preventDefault(); this._unlay(); }
    else if (lv === 'build' && ev.key === 'Backspace' && this.st.row.length) { ev.preventDefault(); this._unplace(this.st.row[this.st.row.length - 1]); }
  },

  /* ---- Hoppa! ---- */
  _hop: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, r = st.r, C = SteppingStonesCore, L = this._L;
    var before = this._waterStones(), xs = this._stoneXs(before.length), liftedBefore = st.lifted.slice();
    var res = C.hop(st), last = st.last || {};
    if (!res.right && (res.kase === 'empty')) { this.api.sound(460); this._paint(); return; }
    /* how far the frog gets on this hop */
    var n = r.w.syl.length, stops = before.length;
    if (r.level === 'count' && last.result === 'long') stops = n;
    if (r.level === 'build' && !res.right && last.result !== 'more') stops = last.prefix + 1;
    var els = this._scene.querySelectorAll('.sst-stone'), frog = this._frog, i = 0;
    var printed = r.level === 'count' ? (res.right ? r.w.syl.map(function (s) { return [s]; }) : last.printed) : null;
    if (r.level === 'hidden' && !res.right) this._made = { what: last.what, lifted: liftedBefore };
    this._busy = true; this._checkBtn.disabled = true;
    var step = function () {
      if (i < stops) {
        var p = self._frogSpot(xs[i]), el = els[i];
        frog.style.left = (p.x - L.frog / 2) + 'px'; frog.style.top = (p.y - L.frog / 2) + 'px';
        frog.classList.remove('is-hop'); void frog.offsetWidth; frog.classList.add('is-hop');
        if (el && printed) { var tx = (printed[i] || []).join('·'); el.querySelector('.sst-chalk').textContent = tx; if (printed[i] && printed[i].length > 1) el.classList.add('is-heavy'); }
        if (el) el.classList.add('is-landed');
        /* build: the first wrong stone tips — the frog hops back */
        if (r.level === 'build' && !res.right && last.result !== 'more' && i === stops - 1 && el) el.classList.add('is-tip');
        self.api.sound(300 + i * 40);
        if (el && !(r.level === 'build' && i === stops - 1 && !res.right && last.result !== 'more')) { var tx2 = el.querySelector('.sst-chalk').textContent; if (tx2) self._say(tx2, 1); }
        i++; self._later(step, self._ms(self.HOP_MS)); return;
      }
      /* count, too many: the next blank stone slips under before the frog lands */
      if (r.level === 'count' && last.result === 'long' && els[n]) for (var q = n; q < els.length; q++) els[q].classList.add('is-sink');
      self._later(function () { self._settle(res); }, self._ms(r.level === 'build' && !res.right && last.result !== 'more' ? 320 : 120));
    };
    step();
  },
  _settle: function (res) {
    var self = this, st = this.st, r = st.r;
    if (res.right) return this._win();
    this._busy = false;
    this.api.sound(st.last.result === 'more' ? 460 : 196);
    if (st.help >= 2 && r.level === 'count') this._say(r.w.syl.join(' … '), 0.7);
    if (st.help >= 2 && r.level === 'build' && st.last.next) this._say(r.w.syl.map(function (s, i) { return i === st.last.prefix ? '… ' + s : s; }).join(' '), 0.7);
    if (st.help >= 2 && r.level === 'hidden') this._say(r.w.word + ' … utan ' + this._args.lift, 0.8);
    if (this._made) { this._busy = true; this._later(function () { self._made = null; self._busy = false; if (!self.st.done) self._paint(); }, this._ms(1400)); }
    this._paint();
  },
  _win: function () {
    var self = this, st = this.st, r = st.r, L = this._L, frog = this._frog, fs = this._farSpot(), word = r.level === 'hidden' ? r.target.word : r.w.word;
    this._busy = true;
    frog.style.left = (fs.x - L.frog / 2) + 'px'; frog.style.top = (fs.y - L.frog / 2) + 'px';
    frog.classList.remove('is-hop'); void frog.offsetWidth; frog.classList.add('is-hop');
    this._later(function () {
      self.api.sound(523); self._later(function () { self.api.sound(659); }, 110); self._later(function () { self.api.sound(784); }, 220);
      self._say(r.level === 'hidden' ? word : r.w.syl.join(' … ') + ' … ' + word, 0.85);
      self._lilies.push(word); if (self._lilies.length > 10) self._lilies.shift();
      self.api.announce(self._t('ariaHopped', { word: word }));
      self._shut = false; self._paint();
      self._later(function () { self._shut = true; self._paint(); }, self._ms(700));
    }, this._ms(this.HOP_MS));
    this._later(function () { self._busy = false; self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var sstCssDone = false;
function injectSteppingCSS() {
  if (sstCssDone || typeof document === 'undefined') return;
  sstCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sst-wrap{width:100%;display:flex;flex-direction:column;gap:10px;--sst-ink:#2A2A35;--sst-teal:#146B5E;--sst-coral:#F2784B;user-select:none;-webkit-user-select:none;}'
  + '.sst-wrap:focus{outline:none;}'
  + '.sst-top{display:flex;align-items:flex-end;gap:14px;}'
  + '.sst-signpost{position:relative;flex:none;display:flex;flex-direction:column;align-items:center;}'
  + '.sst-sign{position:relative;z-index:1;width:calc(var(--sst-sign) + 16px);height:calc(var(--sst-sign) + 16px);padding:8px;border:0;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #6B4A2B,0 4px 0 #B8925E;cursor:pointer;} .sst-sign img{width:var(--sst-sign);height:var(--sst-sign);object-fit:contain;display:block;}'
  + '.sst-post{width:14px;height:12px;background:#8A6534;box-shadow:inset 0 0 0 2px #5B4636;}'
  + '.sst-pond{flex:1;min-width:0;min-height:52px;max-height:calc(var(--sst-sign) + 28px);overflow:hidden;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px 8px;padding:8px 10px;border-radius:26px 26px 18px 18px;background:radial-gradient(ellipse at 50% 40%,#D6EEF4,#BFE3EE 70%);box-shadow:inset 0 0 0 3px #7FB9C9;}'
  + '.sst-lily{display:inline-flex;align-items:center;gap:4px;padding:2px 8px 2px 3px;border-radius:999px;background:#E8F3D7;box-shadow:inset 0 0 0 2px #4E7D3A;} .sst-lily i{width:20px;height:20px;border-radius:50%;background:conic-gradient(from 20deg,#6FA34F 0 330deg,transparent 330deg);box-shadow:inset 0 0 0 2px #2F5A23;} .sst-lily span{font:800 14px/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-ink);white-space:nowrap;} .sst-lily.is-new{animation:sst-drift 1.4s ease-out;} @keyframes sst-drift{0%{transform:translateX(-60px) rotate(-20deg);opacity:0;}60%{opacity:1;}100%{transform:none;}}'
  + '.is-narrow .sst-top{gap:10px;} @media (max-width:339px){.sst-wrap{gap:7px;} .sst-pile{min-height:52px;padding:4px 6px;}}'
  + '.sst-scene{position:relative;height:var(--sst-sceneh);border-radius:18px;background:#CFE8B8;box-shadow:inset 0 0 0 3px #4E7D3A;overflow:hidden;cursor:pointer;}'
  + '.sst-water{position:absolute;left:var(--sst-x0);width:calc(var(--sst-x1) - var(--sst-x0));top:var(--sst-wt);height:var(--sst-wh);background:linear-gradient(#CBEAF2,#BFE3EE 50%,#A9D7E4);box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35;} .is-wide .sst-water{border-radius:10px;box-shadow:inset 0 0 0 3px #2A2A35;} .sst-water svg{width:100%;height:100%;display:block;} .sst-rip{fill:none;stroke:#FFFFFF;stroke-width:1.4;opacity:.7;vector-effect:non-scaling-stroke;animation:sst-rip 6s linear infinite;} .sst-rip2{animation-delay:-2s;} .sst-rip3{animation-delay:-4s;} @keyframes sst-rip{0%{transform:translateX(-6px);opacity:0;}30%{opacity:.8;}100%{transform:translateX(14px);opacity:0;}}'
  + '.sst-bank{position:absolute;background:#BFDDA2;} .sst-bank.is-near{left:12px;width:calc(var(--sst-x0) - 12px);top:calc(var(--sst-wt) + 10px);height:calc(var(--sst-wh) - 20px);border-radius:40% 10px 10px 40%;} .sst-bank.is-far{left:var(--sst-x1);right:12px;top:calc(var(--sst-wt) + 10px);height:calc(var(--sst-wh) - 20px);border-radius:10px 40% 40% 10px;} .sst-bank.is-top{left:0;right:0;top:0;height:var(--sst-wt);background:#BFDDA2;}'
  + '.sst-stone{position:absolute;top:calc(var(--sst-wt) + var(--sst-wh) / 2 - var(--sst-sh) / 2);height:var(--sst-sh);padding:0;border:0;border-radius:50% / 46%;background:radial-gradient(ellipse at 38% 30%,#C3CACE,#9AA3A8 45%,#7C858A);box-shadow:inset 0 0 0 3px var(--sst-ink),0 4px 0 rgba(42,42,53,.35);cursor:pointer;z-index:2;font:inherit;touch-action:none;transition:left .18s ease,width .18s ease;}'
  + '.sst-chalk{position:absolute;left:6px;right:6px;top:50%;transform:translateY(-50%);min-height:1.15em;display:flex;align-items:center;justify-content:center;border-radius:8px;font:800 var(--sst-syl)/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-ink);white-space:nowrap;letter-spacing:-.2px;} .sst-chalk:not(:empty){background:rgba(255,253,246,.88);}'
  + '.sst-stone.is-landed{animation:sst-bob .3s ease-out;} @keyframes sst-bob{50%{translate:0 4px;}}'
  + '.sst-stone.is-heavy{background:radial-gradient(ellipse at 38% 30%,#B6BEC2,#8A9398 45%,#6C757A);translate:0 12px;clip-path:inset(0 0 26% 0);} .sst-stone.is-heavy .sst-chalk{color:#A6461F;letter-spacing:-.6px;}'
  + '.sst-stone.is-sink{animation:sst-sink 1.3s ease-in-out;} @keyframes sst-sink{0%{translate:0 0;}35%,60%{translate:0 20px;opacity:.25;}100%{translate:0 0;opacity:1;}}'
  + '.sst-stone.is-tip{animation:sst-tip .32s ease-in forwards;} @keyframes sst-tip{100%{rotate:24deg;translate:0 10px;opacity:.5;}}'
  + '.sst-stone.is-right{box-shadow:inset 0 0 0 3px var(--sst-teal),0 0 0 4px rgba(20,107,94,.35),0 4px 0 rgba(42,42,53,.35);}'
  + '.sst-stone.is-glow,.sst-pstone.is-glow{box-shadow:inset 0 0 0 3px var(--sst-coral),0 0 0 6px rgba(242,120,75,.45);animation:sst-pulse 1s ease-in-out infinite;} @keyframes sst-pulse{50%{filter:brightness(1.12);}}'
  + '.sst-stone.is-done{box-shadow:inset 0 0 0 3px var(--sst-teal),0 4px 0 rgba(42,42,53,.35);}'
  + '.sst-ghost{position:absolute;top:calc(var(--sst-wt) + var(--sst-wh) / 2 - var(--sst-sh) / 2);height:var(--sst-sh);border-radius:50% / 46%;outline:3px dashed var(--sst-coral);outline-offset:-3px;z-index:1;animation:sst-gh 1.4s ease-in-out infinite;pointer-events:none;} .sst-ghost.is-one{top:calc(var(--sst-wt) + var(--sst-wh) / 2 - var(--sst-sh) * .35);height:calc(var(--sst-sh) * .7);} @keyframes sst-gh{0%,100%{opacity:.35;}40%{opacity:1;}}'
  + '.sst-banner{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 8px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px var(--sst-coral);} .sst-banner b{display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:30px;padding:0 8px;border-radius:50% / 46%;background:#B4BCC0;box-shadow:inset 0 0 0 2px var(--sst-ink);font:800 17px/1 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-ink);animation:sst-pulse 1.4s ease-in-out infinite;}'
  + '.sst-faint{align-self:center;font:800 22px/1.2 var(--lcs-font-body,Nunito,sans-serif);color:rgba(42,42,53,.42);letter-spacing:3px;white-space:nowrap;}'
  + '.sst-pad{width:30px;height:30px;border-radius:50%;background:conic-gradient(from 30deg,#9CC78A 0 320deg,transparent 320deg);opacity:.45;align-self:center;} .sst-pad.is-b{width:22px;height:22px;transform:rotate(90deg);} .sst-pad.is-c{width:26px;height:26px;transform:rotate(200deg);}'
  + '.sst-far{position:absolute;width:var(--sst-far);height:var(--sst-far);border-radius:50%;background:#FBF3E4;box-shadow:inset 0 0 0 3px #6B4A2B,0 3px 0 #B8925E;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:2;} .sst-far img{width:88%;height:88%;object-fit:contain;} .sst-far.is-made{box-shadow:inset 0 0 0 3px var(--sst-coral),0 3px 0 #B8925E;animation:sst-flash .4s ease-out;} @keyframes sst-flash{0%{transform:scale(.8);}} .sst-far.is-bounce{animation:sst-bounce .7s ease-out .3s;} @keyframes sst-bounce{30%{transform:translateY(-12px);}60%{transform:translateY(0);}80%{transform:translateY(-4px);}}'
  + '.sst-card{padding:4px 8px;border-radius:8px;background:#FFF8EA;box-shadow:inset 0 0 0 2px var(--sst-ink);font:800 16px/1.1 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-ink);white-space:nowrap;} .sst-card.is-none{background:transparent;box-shadow:none;outline:2px dashed #8A6534;outline-offset:2px;color:#6B4A2B;}'
  + '.sst-frog{position:absolute;width:var(--sst-frog);height:var(--sst-frog);padding:0;border:0;background:transparent;z-index:4;cursor:pointer;transition:left .34s ease-in-out,top .34s ease-in-out;} .sst-frog img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 4px 3px rgba(0,0,0,.22));}'
  + '.sst-frog.is-hop img{animation:sst-arc .36s ease-in-out;} @keyframes sst-arc{0%{transform:translateY(0) scaleY(.92);}45%{transform:translateY(-34%) scaleY(1.05);}100%{transform:translateY(0);}}'
  + '.sst-frog.is-jump img{animation:sst-arc .4s ease-in-out;}'
  + '.sst-frog.is-nod img{animation:sst-nod .55s ease-in-out .4s var(--sst-nods,2);} @keyframes sst-nod{50%{transform:translateY(10%) rotate(4deg);}}'
  + '.sst-frog.is-teeter img{animation:sst-teeter .5s ease-in-out 3;} @keyframes sst-teeter{25%{transform:rotate(-8deg);}75%{transform:rotate(8deg);}}'
  + '.sst-word{position:absolute;left:calc((var(--sst-x0) + var(--sst-x1)) / 2);top:calc(var(--sst-wt) + var(--sst-wh) / 2);transform:translate(-50%,-50%);padding:6px 20px;border-radius:14px;background:#E2F2EE;box-shadow:inset 0 0 0 3px var(--sst-teal);font:800 calc(var(--sst-syl) + 4px)/1.2 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-ink);white-space:nowrap;z-index:3;animation:sst-close .4s ease-out;} @keyframes sst-close{0%{letter-spacing:14px;}}'
  + '.sst-ring{position:absolute;width:40px;height:40px;border-radius:50%;box-shadow:0 0 0 2px #FFFFFF;z-index:1;pointer-events:none;animation:sst-ring .9s ease-out forwards;} @keyframes sst-ring{100%{transform:scale(2.4);opacity:0;}}'
  + '.sst-pile{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;min-height:60px;padding:6px 8px;border-radius:16px;background:#E7D7B6;box-shadow:inset 0 0 0 2px #B8925E;} .sst-pile.is-empty{min-height:0;padding:0;background:transparent;box-shadow:none;} .is-done-row .sst-pile{display:none;}'
  + '.sst-pstone{position:relative;min-width:56px;height:48px;padding:0 14px;border:0;border-radius:50% / 46%;background:radial-gradient(ellipse at 38% 30%,#C3CACE,#9AA3A8 45%,#7C858A);box-shadow:inset 0 0 0 3px var(--sst-ink),0 3px 0 rgba(42,42,53,.35);cursor:pointer;font:inherit;touch-action:none;} .is-count .sst-pstone{width:52px;height:44px;} .sst-pstone .sst-chalk{position:static;transform:none;padding:0 4px;font-size:min(var(--sst-syl),22px);}'
  + '.sst-pstone.is-back{animation:sst-back .45s ease-out;} @keyframes sst-back{0%{translate:0 -24px;}60%{translate:0 4px;}100%{translate:0 0;}} .sst-pstone.is-lifted{animation:sst-drip .3s ease-out;} @keyframes sst-drip{0%{translate:0 -10px;}}'
  + '.sst-stone.is-lifting,.sst-pstone.is-lifting{opacity:.35;} .sst-stone.is-drag,.sst-pstone.is-drag{position:fixed !important;z-index:50;pointer-events:none;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));translate:none;}'
  + '.sst-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.sst-note{min-height:28px;font:700 17px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--sst-teal);text-align:center;flex:1;} .sst-note:empty{display:none;} .sst-note.is-ok{font-weight:800;} .sst-note.is-wrong{color:#A6461F;} .is-narrow .sst-note{font-size:15px;text-align:left;}'
  + '.sst-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .sst-check[hidden]{display:none;} .sst-check:disabled{opacity:.5;}'
  + '.sst-stone:focus-visible,.sst-pstone:focus-visible,.sst-check:focus-visible,.sst-sign:focus-visible,.sst-frog:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.sst-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'sst-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.SteppingStonesActivity = SteppingStonesActivity;
