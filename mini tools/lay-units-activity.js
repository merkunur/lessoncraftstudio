/* =====================================================================
   INCHIE'S GARDEN PATH — Lay the Units — ACTIVITY  (lay-units-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.MD.A.2 — Inchie the inchworm measures the garden. The child LAYS
   identical helper-worms end-to-end along an object on a fine integer sub-unit
   lattice (tap "add a helper" → it lands a step short → ◀▶ NUDGE to abut; the
   child OWNS gaps/overlaps/same-size/start), then ENUMERATES them (taps each
   helper once → the emergent count IS the length). NO ruler / scale / ticks /
   endpoint number, ever. All grading from lay-units-core.js. 0 lines to any
   protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.LayUnitsCore;
  var LANG = 'en';                               /* content locale (api.lang = ?lang=xx); set in init(). */
  var SVGNS = 'http://www.w3.org/2000/svg';
  var RH = 11;                                   /* SVG viewBox height in lattice-step units — kept low so the
                                                    aspect (steps/RH) is wide → a SHORT rail that fits the vertical
                                                    budget, while each abutted helper still renders tall enough to tap. */
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', DARKSEAM: '#0E3B34', OBJ: '#3E6F66' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  /* Locale number words. DE needs two forms: the standalone tap-count register
     ("eins, zwei, …") and the before-noun win form where 1 → "Ein Helfer"
     (not "Eins Helfer"). EN reuses WORDS for both. */
  var NUMW = {
    de: {
      count: ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'],
      win:   ['Null', 'Ein', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn']
    }
  };
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function numCount(n) { return (LANG === 'de' && NUMW.de.count[n]) || WORDS[n] || String(n); }   /* spoken/tap counting */
  function numWin(n) { return (LANG === 'de' && NUMW.de.win[n]) || (WORDS[n] ? cap(WORDS[n]) : String(n)); }   /* sentence-start before the noun */
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG; u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }

  global.LayUnitsActivity = {
    id: 'lay-units-activity',

    strings: {
      title: { en: "Inchie's Garden Path", de: 'Inchies Gartenweg' },
      instruction: { en: '', de: '' },
      prompt: { en: 'Lay the helpers, then count.', de: 'Leg die Helfer aus und zähl sie dann.' },
      add: { en: '+ Add a helper', de: '+ Helfer dazu' },
      addBig: { en: '+ Big helper', de: '+ Großer Helfer' },
      nudgeL: { en: '◀' }, nudgeR: { en: '▶' }, take: { en: 'Take back', de: 'Zurücknehmen' },
      count: { en: 'Count them! Tap each helper.', de: 'Zähl sie! Tipp jeden Helfer an.' },
      sayWelcome: { en: 'Lay my helpers nose-to-tail to measure it!', de: 'Leg meine Helfer dicht hintereinander, dann messen wir zusammen!' },
      sayWin: { en: 'helpers long! 🌸', de: 'Helfer lang! 🌸' },
      sayWinSpoken: { en: 'helpers long', de: 'Helfer lang' },
      sayGap: { en: 'A little gap snuck in — scootch them together!', de: 'Da hat sich eine Lücke eingeschlichen – schieb sie zusammen!' },
      sayOverlap: { en: 'Two helpers are on top — give them room!', de: 'Zwei Helfer liegen übereinander – gib ihnen Platz!' },
      sayShort: { en: 'Not all the way yet — add more helpers!', de: 'Noch nicht ganz bis zum Ende – leg noch ein paar Helfer dazu!' },
      sayOverhang: { en: "That's past the end — take one back.", de: 'Das ragt über das Ende hinaus – nimm einen weg.' },
      sayStart: { en: 'Start the first helper right at the tip!', de: 'Fang mit dem ersten Helfer genau an der Spitze an!' },
      sayMixed: { en: 'Only the SAME helpers — they must match!', de: 'Nur die GLEICHEN Helfer – sie müssen alle gleich groß sein!' },
      saySnug: { en: 'All snug, no holes! Now count them.', de: 'Schön lückenlos, keine Lücke! Jetzt zähl sie.' },
      sayInverse: { en: 'Smaller helpers, more of them!', de: 'Kleinere Helfer – mehr davon!' },
      hintCheck: { en: 'No gaps, no overlaps, all the same — then count.', de: 'Keine Lücken, nichts übereinander, alle gleich groß – dann zähl.' },
      countBig: { en: 'Count the BIG helpers.', de: 'Zähl die GROSSEN Helfer.' },
      countLittle: { en: 'Now count the LITTLE helpers!', de: 'Jetzt zähl die KLEINEN Helfer!' },
      judgeMiss: { en: 'Look closely — same size, no gaps, no overhang?', de: 'Schau genau hin – gleich groß, keine Lücke, nichts steht über?' },
      invMidA: { en: '{n} big helpers! Now the little ones.', de: '{n} große Helfer! Jetzt die kleinen.' },
      invDone: { en: '{a} big, {b} little — smaller helpers, more of them! 🌸', de: '{a} große, {b} kleine – kleinere Helfer, mehr davon! 🌸' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.phase = 'lay'; this.helpers = []; this.selected = null; this.counted = {}; this.addWidth = 8;
      this.msg = null; this.bloomCount = 0;
      this._inv = null;                          /* inverse: {rowA, rowB, countedA, countedB, stage} */
      this._judgePick = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.msg = null; this._spoke = false; this.selected = null; this.counted = {}; this.addWidth = round.unitWidth || 8;
      this.phase = 'lay';
      this.helpers = (round.prePlaced || []).map(function (h) { return { pos: h.pos, w: h.w, kind: round.unitKind }; });
      this._judgePick = null;
      if (round.cog === 'inverse') {
        var big = Core.legalAbut(round);
        var sw = round.inverse.smallWidth, small = [];
        for (var i = 0; i < (round.L * (round.unitWidth || 8)) / sw; i++) small.push({ pos: i * sw, w: sw, kind: 'little' });
        this._inv = { rowA: big, rowB: small, countedA: {}, countedB: {}, stage: 'A' };
      } else this._inv = null;
    },

    /* localized per-round prompt: manifest promptL10n[LANG] → EN prompt → generic */
    _pPrompt: function (r) { return (r && r.promptL10n && r.promptL10n[LANG]) || (r && r.prompt) || this.api.t('prompt'); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'lu-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round;

      var say = api.el('div', 'lu-saytop');
      say.innerHTML = '<span class="lu-inchie' + (this.solved ? ' lu-hop' : '') + '">🐛</span><span class="lu-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderGarden(root);
      var prompt = api.el('p', 'lu-prompt'); prompt.textContent = this._pPrompt(r); root.appendChild(prompt);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      if (r.cog === 'judge') this._renderJudge(root);
      else if (r.cog === 'inverse') this._renderInverse(root);
      else this._renderLay(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(self._pPrompt(r)); }, 260); }
    },

    _renderGarden: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 10;
      var g = api.el('div', 'lu-garden'); g.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.bloomCount / total);
      g.style.background = 'linear-gradient(90deg, #BfE0C8 ' + Math.round(fill * 100) + '%, #E7EEE9 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'lu-bloom'); k.textContent = fill >= 1 ? '🌷🌸' : '🌱'; g.appendChild(k);
      root.appendChild(g);
    },

    /* render a row of helpers + the object onto an SVG; returns the <svg>.
       onTap(idx) makes helpers tappable; countedMap lights counted helpers. */
    _rowSvg: function (helpers, L, opts) {
      opts = opts || {}; var self = this, api = this.api;
      var steps = this.round.trackSteps || (L + 1) * 8;
      var sv = svg('svg', { viewBox: '0 0 ' + steps + ' ' + RH, class: 'lu-svg', 'aria-label': 'measuring rail' });
      sv.style.aspectRatio = (steps / RH).toFixed(2);
      /* the object being measured: [0, L*unit] — a thin bar near the top */
      var uw = this.round.unitWidth || 8;
      sv.appendChild(svg('rect', { x: 0, y: 0.7, width: L * uw, height: 1.9, rx: 0.9, fill: C.OBJ, opacity: '0.85' }));
      sv.appendChild(svg('line', { x1: 0, y1: 0.2, x2: 0, y2: RH - 0.2, stroke: C.CORAL2, 'stroke-width': 0.4, 'stroke-dasharray': '0.8 0.8', 'pointer-events': 'none' }));   /* visual-only start notch */
      /* rail */
      sv.appendChild(svg('line', { x1: 0, y1: RH - 0.7, x2: steps, y2: RH - 0.7, stroke: 'rgba(20,107,94,.25)', 'stroke-width': 0.3 }));
      var HY = 3.0, HH = RH - 4.0;                  /* helper band: y .. y+height (tall enough to tap) */
      var hs = helpers.slice().sort(function (a, b) { return a.pos - b.pos; });
      /* gap slivers + overlap seams (honest renders) */
      for (var j = 0; j < hs.length - 1; j++) {
        var d = hs[j + 1].pos - hs[j].pos;
        if (d > hs[j].w) sv.appendChild(svg('rect', { x: hs[j].pos + hs[j].w, y: HY + 0.4, width: d - hs[j].w, height: HH - 0.8, fill: C.CORAL, opacity: '0.7' }));
        else if (d < hs[j].w) sv.appendChild(svg('rect', { x: hs[j + 1].pos, y: HY + 0.4, width: hs[j].w - d, height: HH - 0.8, fill: C.DARKSEAM, opacity: '0.9' }));
      }
      var baseUw = this.round.unitWidth || 8;
      helpers.forEach(function (h, idx) {
        var lit = opts.counted && opts.counted[idx];
        var little = h.w < baseUw;                  /* inverse small-unit helpers — intrinsically thin, NOT 44px-tappable by design */
        var grp = svg('g', { class: 'lu-h' + (little ? ' lu-little' : '') + (self.selected === idx && opts.selectable ? ' lu-sel' : '') + (lit ? ' lu-lit' : '') });
        /* transparent full-column hit-rect: the tap target is the whole vertical
           band over a unit, so even a slim helper bar gives a ≥44px tap height
           (the plan's "padded hit-rect even when a unit renders thin"). */
        if (opts.onTap || opts.selectable) grp.appendChild(svg('rect', { x: h.pos, y: 0.2, width: h.w, height: RH - 0.4, fill: 'transparent' }));
        grp.appendChild(svg('rect', { x: h.pos + 0.3, y: HY, width: h.w - 0.6, height: HH, rx: 1.6, fill: lit ? C.CORAL : C.T, stroke: '#fff', 'stroke-width': 0.3, 'fill-opacity': lit ? '0.92' : '0.85' }));
        grp.appendChild(svg('circle', { cx: h.pos + h.w * 0.32, cy: HY + 1.6, r: 0.6, fill: '#fff' }));
        grp.appendChild(svg('circle', { cx: h.pos + h.w * 0.55, cy: HY + 1.6, r: 0.6, fill: '#fff' }));
        if (lit) { var t = svg('text', { x: h.pos + h.w / 2, y: HY + HH - 1.1, 'text-anchor': 'middle', 'font-size': 3.2, 'font-weight': 800, fill: '#fff' }); t.textContent = opts.counted[idx]; grp.appendChild(t); }
        if (opts.onTap) { grp.setAttribute('tabindex', '0'); grp.setAttribute('role', 'button'); grp.style.cursor = 'pointer'; grp.addEventListener('click', function () { opts.onTap(idx); }); grp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opts.onTap(idx); } }); }
        sv.appendChild(grp);
      });
      return sv;
    },

    /* ----- LAY cogs: rail + add/nudge → count ----- */
    _renderLay: function (root) {
      var self = this, api = this.api, r = this.round;
      var counting = (this.phase === 'count');
      var forge = api.el('div', 'lu-forge');
      forge.appendChild(this._rowSvg(this.helpers, r.L, {
        selectable: !counting,
        counted: counting ? this.counted : null,
        onTap: counting ? function (i) { self._countTap(i); } : function (i) { self._select(i); }
      }));
      root.appendChild(forge);

      if (!counting) {
        /* one control row: add (+ big) · ◀ ▶ nudge · take — a single flex-wrap
           strip so the lay phase costs ONE button row, not two (desktop budget). */
        var ctr = api.el('div', 'lu-controls');
        var add = api.el('button', 'lu-btn lu-add'); add.type = 'button'; add.textContent = api.t('add');
        add.disabled = this.helpers.length >= (r.supplyCount || r.L + 1);
        add.addEventListener('click', function () { self._add(r.unitWidth || 8); });
        ctr.appendChild(add);
        if (r.decoyWidth) { var big = api.el('button', 'lu-btn lu-add'); big.type = 'button'; big.textContent = api.t('addBig'); big.addEventListener('click', function () { self._add(r.decoyWidth); }); ctr.appendChild(big); }
        var nl = api.el('button', 'lu-btn lu-arrow'); nl.type = 'button'; nl.textContent = api.t('nudgeL'); nl.setAttribute('aria-label', 'nudge left'); nl.disabled = this.selected == null; nl.addEventListener('click', function () { self._nudge(-1); }); ctr.appendChild(nl);
        var nr = api.el('button', 'lu-btn lu-arrow'); nr.type = 'button'; nr.textContent = api.t('nudgeR'); nr.setAttribute('aria-label', 'nudge right'); nr.disabled = this.selected == null; nr.addEventListener('click', function () { self._nudge(1); }); ctr.appendChild(nr);
        var tk = api.el('button', 'lu-btn lu-take'); tk.type = 'button'; tk.textContent = api.t('take'); tk.disabled = this.selected == null; tk.addEventListener('click', function () { self._take(); }); ctr.appendChild(tk);
        root.appendChild(ctr);
      } else {
        var hint = api.el('div', 'lu-counthint'); hint.textContent = api.t('count'); root.appendChild(hint);
        var tally = api.el('div', 'lu-tally'); tally.textContent = '🌼 ' + Object.keys(this.counted).length; root.appendChild(tally);
      }
    },

    _renderJudge: function (root) {
      var self = this, api = this.api, r = this.round;
      var wrap = api.el('div', 'lu-judge');
      r.judgeRows.forEach(function (jr, i) {
        var card = api.el('button', 'lu-judgecard' + (self._judgePick === i ? ' lu-jsel' : '')); card.type = 'button';
        card.setAttribute('aria-label', 'measuring choice ' + (i + 1));
        card.appendChild(self._rowSvg(jr.helpers, r.L, {}));
        card.addEventListener('click', function () { self._judge(i); });
        wrap.appendChild(card);
      });
      root.appendChild(wrap);
    },

    _renderInverse: function (root) {
      var self = this, api = this.api, r = this.round, inv = this._inv;
      var which = inv.stage === 'A' ? 'rowA' : 'rowB', countMap = inv.stage === 'A' ? inv.countedA : inv.countedB;
      var lab = api.el('div', 'lu-counthint'); lab.textContent = inv.stage === 'A' ? api.t('countBig') : api.t('countLittle'); root.appendChild(lab);
      var forge = api.el('div', 'lu-forge');
      forge.appendChild(this._rowSvg(inv[which], r.L, { counted: countMap, onTap: function (i) { self._invCount(i); } }));
      root.appendChild(forge);
      var tally = api.el('div', 'lu-tally'); tally.textContent = '🌼 ' + Object.keys(countMap).length; root.appendChild(tally);
    },

    _renderDone: function (root) {
      var api = this.api;
      var d = api.el('div', 'lu-done');
      d.innerHTML = '<span class="lu-flare">🌸</span><span class="lu-donetext">' + esc(this.msg || api.t('sayWin')) + '</span>';
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    _add: function (w) {
      var r = this.round, max = r.supplyCount || r.L + 1;
      if (this.helpers.length >= max) return;
      var pos = 1;   /* first helper lands a step short of the notch */
      if (this.helpers.length) { var right = 0; this.helpers.forEach(function (h) { right = Math.max(right, h.pos + h.w); }); pos = right + 1; }
      if (pos + w > (r.trackSteps || (r.L + 1) * 8)) pos = Math.max(0, (r.trackSteps || (r.L + 1) * 8) - w);
      this.helpers.push({ pos: pos, w: w, kind: r.unitKind }); this.selected = this.helpers.length - 1;
      this.api.sound && this.api.sound(620);
      this._afterMove();
    },
    _select: function (i) { this.selected = (this.selected === i) ? null : i; this.api.sound && this.api.sound(520); this.render(); },
    _nudge: function (dir) {
      if (this.selected == null) return;
      var h = this.helpers[this.selected], r = this.round, steps = r.trackSteps || (r.L + 1) * 8;
      h.pos = Math.max(0, Math.min(steps - h.w, h.pos + dir));
      this.api.sound && this.api.sound(560);
      this._afterMove();
    },
    _take: function () {
      if (this.selected == null) return;
      this.helpers.splice(this.selected, 1); this.selected = null;
      this.api.sound && this.api.sound(420);
      this._afterMove();
    },
    _afterMove: function () {
      var r = this.round, ev = Core.evaluate(r, this.helpers, null);
      var api = this.api;
      if (ev.status === 'placed-ok-awaiting-count') { this.phase = 'count'; this.counted = {}; this.msg = api.t('saySnug'); api.announce && api.announce(api.t('saySnug')); this.render(); return; }
      var m = { gap: 'sayGap', overlap: 'sayOverlap', short: 'sayShort', overhang: 'sayOverhang', 'misaligned-start': 'sayStart', 'mixed-size': 'sayMixed' }[ev.status];
      this.msg = m ? api.t(m) : null;
      this.render();
    },
    _countTap: function (i) {
      if (this.counted[i]) return;                       /* already counted — no double-count */
      this.counted[i] = Object.keys(this.counted).length + 1;
      var n = this.counted[i];
      speak(numCount(n));
      this.api.sound && this.api.sound(640 + n * 20);
      if (Object.keys(this.counted).length >= this.helpers.length) { this._bloom(this.helpers.length); return; }
      this.render();
    },

    _judge: function (i) {
      var r = this.round, api = this.api;
      this._judgePick = i;
      if (r.judgeRows[i].correct) { this._bloom(r.L); return; }
      this.msg = api.t('judgeMiss'); this.api.sound && this.api.sound(360); api.announce && api.announce(this.msg); this.render();
    },

    _invCount: function (i) {
      var inv = this._inv, map = inv.stage === 'A' ? inv.countedA : inv.countedB, row = inv.stage === 'A' ? inv.rowA : inv.rowB;
      if (map[i]) return;
      map[i] = Object.keys(map).length + 1; var n = map[i];
      speak(numCount(n)); this.api.sound && this.api.sound(640 + n * 12);
      if (Object.keys(map).length >= row.length) {
        if (inv.stage === 'A') { inv.stage = 'B'; this.msg = this.api.t('invMidA').replace('{n}', inv.rowA.length); this.render(); return; }
        /* both counted — neutral advance (observational, no verdict) */
        this.solved = true; this.bloomCount = Math.min(this.bloomCount + 1, (this._pool && this._pool.length) || 10);
        this.msg = this.api.t('invDone').replace('{a}', inv.rowA.length).replace('{b}', inv.rowB.length);
        this.api.sound && this.api.sound(880); this.api.announce && this.api.announce(this.msg); this.render(); return;
      }
      this.render();
    },

    _bloom: function (len) {
      var api = this.api;
      this.solved = true; this.bloomCount = Math.min(this.bloomCount + 1, (this._pool && this._pool.length) || 10);
      this.msg = numWin(len) + ' ' + api.t('sayWin');
      api.sound && api.sound(880);
      setTimeout(function () { speak(numWin(len) + ' ' + api.t('sayWinSpoken')); }, 200);
      api.announce && api.announce(this.msg);
      this.render();
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
      fetch('/mini-tools/lay-units-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[lay-units] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.lu-root{position:relative;width:100%;max-width:min(96vw,660px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#EAF2EE);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.lu-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.lu-saytext{min-width:0;overflow-wrap:break-word;}.lu-inchie{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.lu-hop{animation:luHop .5s ease;}'
        + '@keyframes luHop{0%{transform:translateY(0)}40%{transform:translateY(-7px)}100%{transform:none}}'
        + '.lu-garden{position:relative;height:11px;border-radius:6px;overflow:hidden;}.lu-bloom{position:absolute;right:5px;top:-4px;font-size:14px;}'
        + '.lu-prompt{margin:0;text-align:center;font:700 clamp(12px,3vw,15px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;}'
        + '.lu-forge{display:flex;justify-content:center;background:rgba(20,107,94,.06);border-radius:12px;padding:clamp(4px,1.2vw,8px);}'
        + '.lu-svg{width:100%;max-width:100%;max-height:clamp(64px,12vh,86px);height:auto;display:block;}'
        + '.lu-h:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);}.lu-h.lu-sel rect:first-of-type{stroke:' + C.CORAL + ';stroke-width:0.8;}'
        + '.lu-controls{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}'
        + '.lu-nudge{display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap;}'
        + '.lu-btn{min-height:46px;padding:0 14px;border-radius:13px;border:2px solid rgba(20,107,94,.4);background:#fff;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.lu-btn:disabled{opacity:.4;cursor:default;}.lu-btn:active:not(:disabled){transform:translateY(1px);}'
        + '.lu-add{border-color:rgba(242,120,75,.5);color:' + C.CORAL2 + ';}.lu-arrow{min-width:54px;font-size:18px;}'
        + '.lu-btn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.lu-counthint{text-align:center;font:700 clamp(11px,2.8vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;overflow-wrap:break-word;}'
        + '.lu-tally{text-align:center;font:800 clamp(16px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        /* judge — three stacked choice rows; each rail capped SHORT so 3 cards
           clear the fold (the difference reads horizontally: gap / overhang). */
        + '.lu-judge{display:flex;flex-direction:column;gap:5px;align-items:center;}'
        /* content-sized choice cards: cap the width + center so the worm-row
           FILLS its card (no sparse desktop expanse), not a full-width box. */
        + '.lu-judgecard{width:100%;max-width:230px;border:2px solid rgba(20,107,94,.25);border-radius:11px;background:#fff;padding:3px 8px;cursor:pointer;touch-action:manipulation;min-height:46px;}'
        + '.lu-judge .lu-svg{max-height:clamp(34px,6.5vh,46px);margin:0 auto;}'
        + '.lu-judgecard.lu-jsel{border-color:' + C.CORAL + ';}.lu-judgecard:active{transform:translateY(1px);}.lu-judgecard:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);}'
        /* done */
        + '.lu-done{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;}.lu-flare{font-size:clamp(30px,8vw,44px);animation:luFlare .6s ease;}.lu-donetext{font:800 clamp(13px,3.2vw,16px)/1.25 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;min-width:0;overflow-wrap:break-word;}'
        + '@keyframes luFlare{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        /* desktop: do NOT enlarge the rail — a taller SVG pushes the shell Check
           past the fold (the §A.13.62 cut-off). Hold it short; widen padding only. */
        + '@media (min-width:760px){.lu-root{padding:11px 14px;}.lu-svg{max-height:clamp(64px,10vh,84px);}.lu-judge .lu-svg{max-height:48px;}}'
        + '@media (max-width:480px){.lu-root{gap:4px;padding:8px;}}'
        + '@media (max-width:380px){.lu-root{gap:3px;padding:6px;}.lu-prompt{font-size:11.5px;line-height:1.15;}.lu-svg{max-height:clamp(58px,13vh,82px);}.lu-garden{height:9px;}.lu-controls{gap:6px;}.lu-saytop{font-size:10.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.lu-hop,.lu-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-lay-units', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'lay-units.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
