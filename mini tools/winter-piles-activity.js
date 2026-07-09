/* =====================================================================
   SQUIRREL'S FAIR WINTER PILES — ACTIVITY  (winter-piles-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.OA.C.4 — partition a GIVEN rectangular array into EQUAL row-piles,
   READ each pile, and write the sum of EQUAL ADDENDS. The platform's FIRST
   draw-trace game: the child DRAWS a line (or taps a row-gap) to cut the
   array → reads each pile → SUPPLIES each addend on a stepper. Equality is
   the child's JUDGMENT (uneven cuts are reachable but UNFAIR — the equation
   can't close, no sparkle). Valid → the piles SPARKLE in unison + a "lock it
   in" pill → the shell Check.

   Validity DERIVED by mini tools/draw-partition-core.js (NO stored answer,
   NO auto-fill). answerType:'state'. Two stages via internal state. Squirrel
   + acorns = SVG/emoji STUB placeholders for CA5. No timer/score/streak.
   0 lines to the protected cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.DrawPartitionCore;
  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A', BAND: ['#FFF3DF', '#EAF3EF', '#F7EEF4', '#EEF4E4', '#FDEEDD'] };
  var LANG = 'en';
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  /* German standalone number words 0–16 (arrays ≤4×4 → addends/totals ≤16): eins standalone, sechzehn (no extra s) */
  var ONES_DE = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn'];
  /* French standalone number words 0–16 (arrays ≤4×4 → addends/totals ≤16) */
  var ONES_FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
  function numWord(n) { if (LANG === 'de') return ONES_DE[n] || String(n); if (LANG === 'fr') return ONES_FR[n] || String(n); if (n < 20) return ONES[n]; var t = ['', '', 'twenty', 'thirty', 'forty', 'fifty']; return (t[Math.floor(n / 10)] || n) + (n % 10 ? '-' + ONES[n % 10] : ''); }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'number', text: text, lang: LANG, rate: 0.92 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .92; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  function squirrelSVG(mood) {
    var happy = mood === 'happy';
    var eyes = happy ? '<path d="M40 44 q4 -5 8 0 M54 44 q4 -5 8 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '<circle cx="44" cy="45" r="3" fill="#2A2A35"/><circle cx="58" cy="45" r="3" fill="#2A2A35"/>';
    var mouth = happy ? '<path d="M44 55 q7 7 14 0" stroke="#2A2A35" stroke-width="2.3" fill="none" stroke-linecap="round"/>' : '<path d="M46 55 q5 3 10 0" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/>';
    return '<svg class="wp-sq-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Eichhörnchen' : LANG === 'fr' ? 'écureuil' : 'squirrel') + '">' +
      '<path d="M78 64 Q96 50 86 30 Q80 18 70 28 Q82 40 72 56 Z" fill="#B5713C"/>' + // tail
      '<ellipse cx="51" cy="58" rx="24" ry="22" fill="#C8854A"/>' +
      '<circle cx="40" cy="30" r="7" fill="#C8854A"/><circle cx="62" cy="30" r="7" fill="#C8854A"/>' +
      '<circle cx="51" cy="46" r="17" fill="#DDA468"/>' + eyes + mouth +
      '<circle cx="51" cy="52" r="2.4" fill="#7A4A28"/></svg>';
  }

  global.WinterPilesActivity = {
    id: 'winter-piles-activity',
    reward: { id: 'acorn-hoard', label: 'Acorn Hoard', emoji: '🌰' },

    strings: {
      title: { en: "Squirrel's Fair Winter Piles", de: 'Flos faire Winterhäufchen', fr: 'Les tas égaux de Flo' },
      prompt: { en: 'Make fair piles!', de: 'Mach faire Häufchen!', fr: 'Fais des tas égaux !' },
      promptFair: { en: 'Cut the rows into piles that are all the same size.', de: 'Schneide die Reihen in Häufchen, die alle gleich groß sind.', fr: 'Coupe les rangées en tas qui ont tous la même taille.' },
      promptN: { en: 'Make exactly {n} fair piles.', de: 'Mach genau {n} gleich große Häufchen.', fr: 'Fais exactement {n} tas égaux.' },
      promptFix: { en: 'These piles are unfair — re-cut them so they match!', de: 'Diese Häufchen sind nicht gleich groß – schneide noch mal, damit sie zusammenpassen!', fr: 'Ces tas ne sont pas égaux — recoupe-les pour qu’ils correspondent !' },
      promptMatch: { en: 'Cut and read to make {eq}.', de: 'Schneide und lies, um {eq} zu bauen.', fr: 'Coupe et lis pour faire {eq}.' },
      readHint: { en: 'Read each pile and tap its number in.', de: 'Lies jedes Häufchen und tippe seine Zahl ein.', fr: 'Lis chaque tas et entre son nombre.' },
      lockIt: { en: 'Lock it in!', de: 'Einrasten!', fr: 'Valide !' },
      win: { en: 'Fair piles! They sparkle as one!', de: 'Faire Häufchen! Sie funkeln wie eins!', fr: 'Des tas égaux ! Ils brillent ensemble !' },
      unfair: { en: "Those piles aren't equal yet — make them all the same.", de: 'Die Häufchen sind noch nicht gleich groß – mach sie alle gleich.', fr: 'Ces tas ne sont pas encore égaux — fais-les tous pareils.' },
      hintCheck: { en: 'Make fair piles + read each one, then lock it in.', de: 'Mach gleich große Häufchen und lies jedes, dann raste sie ein.', fr: 'Fais des tas égaux et lis chacun, puis valide.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cuts = []; this.addends = []; this.stage = 'draw'; this.solved = false; this.solvedCount = 0;
      this._drag = null; this._preview = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.stage = 'draw'; this.solved = false; this._drag = null; this._preview = null;
      this.cuts = (round.type === 'fix' && round.preset) ? round.preset.slice() : [];
      this._resetAddends();
    },
    _resetAddends: function () { var n = Core.derivePiles(this.round, this.cuts).length; this.addends = []; for (var i = 0; i < n; i++) this.addends.push(null); },

    /* ---------- geometry ---------- */
    _R: function () { return this.round.array.rows; },
    _Cc: function () { return this.round.array.cols; },
    _cellH: function () { return 1000 / this._R(); },
    _nearestBoundary: function (vy) { var b = Math.round(vy / this._cellH()); return Math.max(1, Math.min(this._R() - 1, b)); },
    _vbY: function (clientY) { var r = this._fieldEl.getBoundingClientRect(); return (clientY - r.top) / r.height * 1000; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'wp-wrap'); var root = api.el('div', 'wp-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      // a compact instruction line (the shell already shows the big prompt; a small squirrel + the type-specific
      // ask keep the warmth without a tall second header). Squirrel corner-sticker on the field is a CA5 fast-follow.
      var head = api.el('div', 'wp-head');
      var sq = api.el('div', 'wp-sq'); sq.innerHTML = squirrelSVG(this.solved ? 'happy' : 'idle'); head.appendChild(sq);
      var bub = api.el('div', 'wp-say'); bub.textContent = this.solved ? api.t('win') : (this.round.type === 'make-fair' ? api.t('readHint') : this._promptText()); head.appendChild(bub);
      root.appendChild(head);
      // main = field + (equation + lock) — stacked on phone, two columns on desktop (the equation costs
      // NO vertical height beside the field where height is tightest: the ~430px-header 900px desktops).
      var main = api.el('div', 'wp-main');
      main.appendChild(this._buildField());
      var rightcol = api.el('div', 'wp-rightcol');
      rightcol.appendChild(this._buildEquation());
      if (!this.solved && this._isValid()) {
        var lock = api.el('button', 'wp-lock'); lock.type = 'button'; lock.textContent = api.t('lockIt');
        var self = this; lock.addEventListener('click', function () { self._lockIn(); });
        rightcol.appendChild(lock);
      }
      main.appendChild(rightcol);
      root.appendChild(main);
      // acorn-hoard vessel — a thin row (the GameCollection 🌰 reward is the cross-game keepsake)
      var hoard = api.el('div', 'wp-hoard');
      for (var i = 0; i < ((this._pool && this._pool.length) || 9); i++) { var a = api.el('span', 'wp-acorn' + (i < this.solvedCount ? ' wp-acorn-on' : '')); a.textContent = '🌰'; hoard.appendChild(a); }
      root.appendChild(hoard);
      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _promptText: function () {
      var r = this.round, api = this.api;
      if (r.type === 'make-n') return api.t('promptN').replace('{n}', r.target.piles);
      if (r.type === 'fix') return api.t('promptFix');
      if (r.type === 'match') return api.t('promptMatch').replace('{eq}', this._targetEqString());
      return api.t('promptFair');
    },
    _targetEqString: function () { var t = this.round.target, s = []; for (var i = 0; i < t.count; i++) s.push(t.addend); return s.join(' + ') + ' = ' + (t.addend * t.count); },

    _buildField: function () {
      var self = this, api = this.api, R = this._R(), Cc = this._Cc(), cw = 1000 / Cc, ch = 1000 / R;
      var box = api.el('div', 'wp-field-box');
      var svg = svgEl('svg', { viewBox: '0 0 1000 1000', class: 'wp-field' }); this._fieldEl = svg;
      // pile bands (color contiguous row-groups)
      var piles = this._pileRanges();
      piles.forEach(function (pr, idx) {
        var valid = self._isValid();
        svg.appendChild(svgEl('rect', { x: 6, y: pr.start * ch + 4, width: 988, height: (pr.end - pr.start) * ch - 8, rx: 14, fill: C.BAND[idx % C.BAND.length], class: 'wp-band' + (valid ? ' wp-band-win' : ''), 'data-pile': idx }));
      });
      // acorns
      for (var row = 0; row < R; row++) for (var col = 0; col < Cc; col++) {
        svg.appendChild(svgEl('circle', { cx: (col + 0.5) * cw, cy: (row + 0.5) * ch, r: Math.min(cw, ch) * 0.27, fill: '#B5713C', stroke: '#7A4A28', 'stroke-width': 4, class: 'wp-acorn-dot' }));
        svg.appendChild(svgEl('ellipse', { cx: (col + 0.5) * cw, cy: (row + 0.5) * ch - Math.min(cw, ch) * 0.27, rx: Math.min(cw, ch) * 0.16, ry: Math.min(cw, ch) * 0.09, fill: '#6E4A2C' }));
      }
      // committed cut-lines (each tappable to erase, fat hit-stroke)
      this.cuts.forEach(function (b) {
        var y = b * ch;
        svg.appendChild(svgEl('line', { x1: 20, y1: y, x2: 980, y2: y, stroke: C.T, 'stroke-width': 9, 'stroke-linecap': 'round', class: 'wp-cut' }));
        var hit = svgEl('rect', { x: 0, y: y - 26, width: 1000, height: 52, fill: 'transparent', class: 'wp-cut-hit', 'data-b': b });
        if (!self.solved) hit.addEventListener('click', function (e) { e.stopPropagation(); self._toggleCut(b); });
        svg.appendChild(hit);
      });
      // preview line (during drag)
      if (this._preview != null) {
        var py = this._preview * ch, has = this.cuts.indexOf(this._preview) >= 0;
        svg.appendChild(svgEl('line', { x1: 20, y1: py, x2: 980, y2: py, stroke: has ? C.CORAL : C.T, 'stroke-width': 7, 'stroke-dasharray': '14 12', 'stroke-linecap': 'round', class: 'wp-preview' }));
      }
      // capture rect (draw / tap-the-gap)
      var cap = svgEl('rect', { x: 0, y: 0, width: 1000, height: 1000, fill: 'transparent', class: 'wp-capture' });
      if (!this.solved) {
        cap.addEventListener('pointerdown', function (e) { self._onDown(e); });
        cap.addEventListener('pointermove', function (e) { self._onMove(e); });
        cap.addEventListener('pointerup', function (e) { self._onUp(e); });
        cap.addEventListener('pointercancel', function () { self._drag = null; self._preview = null; self.render(); });
      }
      svg.appendChild(cap);
      box.appendChild(svg);
      return box;
    },
    _pileRanges: function () {
      var R = this._R(), sorted = this.cuts.slice().sort(function (a, b) { return a - b; }), bounds = [0], i;
      for (i = 0; i < sorted.length; i++) if (sorted[i] !== bounds[bounds.length - 1]) bounds.push(sorted[i]);
      bounds.push(R); var out = [];
      for (i = 0; i < bounds.length - 1; i++) out.push({ start: bounds[i], end: bounds[i + 1] });
      return out;
    },

    /* ---------- gesture (preview a single line during the drag — NO full render, so the
       capture rect stays attached + the pointer capture is not lost mid-drag) ---------- */
    _onDown: function (e) { if (this.solved) return; try { e.target.setPointerCapture(e.pointerId); } catch (x) {} this._drag = { capRect: e.target }; this._showPreview(this._nearestBoundary(this._vbY(e.clientY))); },
    _onMove: function (e) { if (!this._drag) return; this._showPreview(this._nearestBoundary(this._vbY(e.clientY))); },
    _onUp: function (e) { if (!this._drag) return; var b = this._nearestBoundary(this._vbY(e.clientY)); this._drag = null; this._clearPreview(); this._toggleCut(b); },
    _showPreview: function (b) {
      this._preview = b; var ch = this._cellH(), y = b * ch, has = this.cuts.indexOf(b) >= 0;
      if (!this._previewLine && this._fieldEl) { this._previewLine = svgEl('line', { x1: 20, x2: 980, 'stroke-width': 7, 'stroke-dasharray': '14 12', 'stroke-linecap': 'round', class: 'wp-preview' }); this._fieldEl.insertBefore(this._previewLine, this._fieldEl.lastChild); }
      if (this._previewLine) { this._previewLine.setAttribute('y1', y); this._previewLine.setAttribute('y2', y); this._previewLine.setAttribute('stroke', has ? C.CORAL : C.T); }
    },
    _clearPreview: function () { this._preview = null; if (this._previewLine && this._previewLine.parentNode) this._previewLine.parentNode.removeChild(this._previewLine); this._previewLine = null; },

    _toggleCut: function (b) {
      var k = this.cuts.indexOf(b);
      if (k >= 0) this.cuts.splice(k, 1); else this.cuts.push(b);
      this.cuts.sort(function (a, b) { return a - b; });
      this._resetAddends();           // pile structure changed → the child must re-read
      this.api.sound && this.api.sound(k >= 0 ? 360 : 560);
      this.render();
    },

    /* ---------- equation strip (child-supplied addends) ---------- */
    _buildEquation: function () {
      var self = this, api = this.api, piles = Core.derivePiles(this.round, this.cuts), valid = this._isValid();
      var strip = api.el('div', 'wp-strip'); strip.setAttribute('aria-live', 'polite');
      if (piles.length < 1) { var hint = api.el('div', 'wp-strip-hint'); hint.textContent = api.t('readHint'); strip.appendChild(hint); return strip; }
      piles.forEach(function (trueCount, i) {
        if (i > 0) { var op = api.el('span', 'wp-op'); op.textContent = '+'; strip.appendChild(op); }
        var slot = api.el('div', 'wp-slot' + (self.addends[i] == null ? ' wp-blank' : '') + (valid ? ' wp-slot-win' : ''));
        var minus = api.el('button', 'wp-step wp-minus'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'minus');
        var num = api.el('span', 'wp-num'); num.textContent = self.addends[i] == null ? '?' : self.addends[i];
        var plus = api.el('button', 'wp-step wp-plus'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'plus');
        if (!self.solved) {
          minus.addEventListener('click', function () { self._setAddend(i, Math.max(0, (self.addends[i] || 0) - 1)); });
          plus.addEventListener('click', function () { self._setAddend(i, Math.min(self._R() * self._Cc(), (self.addends[i] == null ? 0 : self.addends[i]) + 1)); });
        }
        slot.appendChild(minus); slot.appendChild(num); slot.appendChild(plus); strip.appendChild(slot);
      });
      var eq = api.el('span', 'wp-op'); eq.textContent = '='; strip.appendChild(eq);
      var tot = api.el('span', 'wp-total' + (valid ? ' wp-total-win' : ''));
      tot.textContent = valid ? (this._R() * this._Cc()) : '?'; strip.appendChild(tot);
      return strip;
    },
    _setAddend: function (i, v) {
      this.addends[i] = v; this.api.sound && this.api.sound(500);
      if (this.addends[i] != null) speak(numWord(v));
      var wasValid = this._lastValid;
      this.render();
      if (this._isValid() && !wasValid) { this._onBecomeValid(); }
      this._lastValid = this._isValid();
    },

    _isValid: function () { return Core.validate(this.round, this.cuts, this.addends.map(function (a) { return a == null ? -1 : a; })); },
    _onBecomeValid: function () {
      this.api.sound && this.api.sound(880);
      var piles = Core.derivePiles(this.round, this.cuts), eq = piles.map(numWord).join(' plus ') + (LANG === 'de' ? ' ist gleich ' : LANG === 'fr' ? ' égale ' : ' equals ') + numWord(this._R() * this._Cc());
      this.api.announce && this.api.announce(this.api.t('win')); speak(eq);
    },

    _lockIn: function () {
      if (!this._isValid()) return;
      this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this.api.sound && this.api.sound(920); this.render();
      this.api.announce && this.api.announce(this.api.t('win'));
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/winter-piles-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[winter-piles] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wp-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.wp-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#F1E5CC);border-radius:20px;padding:clamp(7px,1.8vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* head */
        + '.wp-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.wp-sq{width:clamp(44px,11vw,58px);flex:0 0 auto;}.wp-sq-svg{width:100%;height:auto;display:block;}'
        + '.wp-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* main: field + (equation+lock) — column on phone, two columns on desktop */
        + '.wp-main{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);width:100%;}'
        + '.wp-rightcol{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.wp-main{flex-direction:row;align-items:center;justify-content:center;gap:20px;}.wp-rightcol{width:auto;flex:0 0 auto;max-width:300px;}}'
        /* field */
        + '.wp-field-box{display:flex;justify-content:center;flex:0 0 auto;}'
        + '.wp-field{width:100%;max-width:min(230px,24vh);aspect-ratio:1;display:block;background:#5A4632;border-radius:18px;box-shadow:0 0 0 3px #5A4632, inset 0 0 0 4px rgba(0,0,0,.18), 0 4px 10px rgba(90,70,50,.18);touch-action:none;}'
        + '.wp-capture{touch-action:none;cursor:crosshair;}'
        + '.wp-band{transition:opacity .2s;}'
        + '.wp-band-win{animation:wpSpark 1.1s ease-in-out infinite;}'
        + '@keyframes wpSpark{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25) drop-shadow(0 0 10px ' + C.GOLD + ')}}'
        + '.wp-cut{filter:drop-shadow(0 1px 1px rgba(0,0,0,.3));}.wp-cut-hit{cursor:pointer;}'
        + '.wp-preview{opacity:.85;}'
        /* equation strip */
        + '.wp-strip{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(4px,1.4vw,8px);font-family:"Baloo 2",sans-serif;min-height:46px;}'
        + '.wp-strip-hint{font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';opacity:.8;text-align:center;}'
        + '.wp-op{font:800 clamp(17px,4.5vw,22px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wp-slot{display:inline-flex;align-items:center;gap:3px;padding:2px;border-radius:12px;background:#EAF2EE;border:2px solid ' + C.T + ';}'
        + '.wp-slot.wp-blank{background:transparent;border-style:dashed;border-color:rgba(20,107,94,.45);}'
        + '.wp-slot.wp-slot-win{background:#FCEBD8;border-color:' + C.GOLD + ';}'
        + '.wp-step{min-width:34px;height:38px;border:0;border-radius:9px;background:#fff;color:' + C.T + ';font:800 19px/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.2);touch-action:manipulation;}'
        + '.wp-step:active{transform:translateY(2px);}'
        + '.wp-num{min-width:24px;text-align:center;font:800 clamp(17px,4.5vw,21px)/1 "Baloo 2",sans-serif;color:' + C.INK + ';}'
        + '.wp-total{min-width:30px;height:38px;padding:0 8px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;background:#D2E8E1;border:2px solid ' + C.T + ';font:800 clamp(17px,4.5vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.wp-total-win{background:#FCEBD8;border-color:' + C.GOLD + ';}'
        /* lock it in */
        + '.wp-lock{align-self:center;min-height:46px;padding:0 clamp(20px,6vw,32px);border-radius:14px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;animation:wpPulse 1.1s ease-in-out infinite;}'
        + '.wp-lock:active{transform:translateY(2px);}'
        + '@keyframes wpPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}'
        /* hoard vessel */
        + '.wp-hoard{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.wp-acorn{font-size:clamp(11px,3vw,15px);filter:grayscale(1) opacity(.35);transition:filter .3s;}'
        + '.wp-acorn-on{filter:none;}'
        + '.wp-step:focus-visible,.wp-lock:focus-visible,.wp-cut-hit:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports — the field + equation + lock + shell Check must clear the fold; the field
           competes with the ~280px (phone) / ~430px (desktop) shell header + the Check, so cap it hard. */
        + '@media (max-height:900px),(max-width:480px){.wp-root{gap:3px;padding:6px;}.wp-head{gap:6px;}.wp-sq{width:clamp(30px,7vw,38px);}.wp-say{font:700 11.5px/1.15 "Nunito",sans-serif;padding:3px 7px;-webkit-line-clamp:1;line-clamp:1;}.wp-lock{min-height:40px;}.wp-step{height:30px;min-width:28px;font-size:17px;}.wp-num{min-width:20px;}.wp-rightcol{gap:5px;}.wp-hoard{display:none;}}'
        /* phone (stacked): the field competes with the equation + lock + Check below it → cap hard by height */
        + '@media (max-width:767px){.wp-field{max-width:min(172px,19vh);}}'
        + '@media (max-width:767px) and (max-height:680px){.wp-field{max-width:min(138px,18vh);}}'
        + '@media (max-width:360px){.wp-field{max-width:min(120px,17vh);}.wp-step{height:28px;min-width:26px;}.wp-slot{gap:2px;}.wp-rightcol{gap:4px;}.wp-lock{min-height:38px;}}'
        + '@media (prefers-reduced-motion: reduce){.wp-band-win,.wp-lock{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-winter-piles', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'winter-piles.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
