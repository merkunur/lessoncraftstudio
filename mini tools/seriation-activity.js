/* =====================================================================
   THE FARAWAY SHELF — ACTIVITY SKIN  (seriation-activity.js)
   ---------------------------------------------------------------------
   1.MD.A.1 · order by length + compare indirectly via a third object —
   CLARITY-FIRST redesign of #69. The lcs-shell skin over seriation-core.js.
   answerType:'state'. EN-ONLY pilot (non-EN 404-by-design).

   Tilly the shop cat keeps things on far-apart shelves, so a measuring CORD
   (a fixed-length reference — the "third object") is the go-between. The scene
   shows the cord + a dashed vertical "cord line" + three color ribbons, each on
   its own shelf, all from a common left edge, drawn at their HONEST lengths —
   so each ribbon visibly goes past / stops short of the cord line. The SHELL
   prompt asks: tap the LONGEST / the SHORTEST / the one AS LONG AS the cord.
   The child taps a color chip; correct = the core's per-mode oracle (max / min
   / ==cordLen), DERIVED not stored. Correct → the chip glows + Tilly wiggles
   (resolve; shell Check hidden until `.lcs-app.tilly-resolved`). Wrong → a warm
   cord nudge, no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SeriationCore;

  var COLORS = {
    red:    { hex: '#E0524A', label: 'Red' },
    blue:   { hex: '#3E7CB1', label: 'Blue' },
    green:  { hex: '#5FA85C', label: 'Green' },
    yellow: { hex: '#E0A92E', label: 'Yellow' },
    purple: { hex: '#8C6BB1', label: 'Purple' },
    orange: { hex: '#E8833A', label: 'Orange' }
  };

  var L = {
    en: {
      qLongest: 'Tap the LONGEST ribbon.',
      qShortest: 'Tap the SHORTEST ribbon.',
      qSamecord: 'Which ribbon is as long as the cord?',
      win: 'Yes! {note}', winNote: 'You compared the lengths!',
      nLongest: 'The longest ribbon goes PAST all the others. Look again!',
      nShortest: 'The shortest ribbon stops first. Look again!',
      nSamecord: 'Find the ribbon that ends right at the cord line. Look again!',
      cord: 'the cord'
    }
  };
  function txt(k, a) { var s = L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function pct(v, max) { return Math.max(0, Math.min(100, (v / max) * 100)); }

  function tillySVG() {
    /* Tilly — an orange tabby shop cat */
    return '<svg class="sr-tilly-svg" viewBox="0 0 56 50" width="40" height="36" aria-hidden="true">' +
      '<path d="M12 14 l2 -10 l9 6z" fill="#E8923A" stroke="#B4631E" stroke-width="1.4"/><path d="M40 14 l-2 -10 l-9 6z" fill="#E8923A" stroke="#B4631E" stroke-width="1.4"/>' +   /* ears */
      '<path d="M15 8 l1.3 -5 l4 4z" fill="#F2B07A"/><path d="M37 8 l-1.3 -5 l-4 4z" fill="#F2B07A"/>' +   /* inner ears */
      '<ellipse cx="26" cy="28" rx="16" ry="14" fill="#EE9A45" stroke="#B4631E" stroke-width="2"/>' +
      '<path d="M20 16 q6 4 12 0 M18 22 q8 4 16 0" stroke="#C9742A" stroke-width="1.2" fill="none" opacity=".7"/>' +   /* head stripes */
      '<ellipse cx="26" cy="33" rx="8" ry="6" fill="#F7D9AE"/>' +   /* muzzle */
      '<path d="M26 31 l-2 2 h4z" fill="#C25A4A"/>' +   /* nose */
      '<g class="sr-eyes-open"><circle cx="21" cy="27" r="2.3" fill="#2B2B2B"/><circle cx="31" cy="27" r="2.3" fill="#2B2B2B"/></g>' +
      '<g class="sr-eyes-happy"><path d="M18.5 27 q2.5 -3 5 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M28.5 27 q2.5 -3 5 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<g stroke="#9A6A36" stroke-width=".9" stroke-linecap="round"><line x1="10" y1="32" x2="2" y2="30"/><line x1="10" y1="34" x2="2" y2="35"/><line x1="42" y1="32" x2="50" y2="30"/><line x1="42" y1="34" x2="50" y2="35"/></g></svg>';   /* whiskers */
  }

  var SeriationActivity = {
    id: 'seriation-activity',
    strings: {
      title: { en: 'The Faraway Shelf' },
      instruction: { en: 'Use the cord to compare the ribbons, then tap your answer!' },
      q: { en: '{q}' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._maxUnit = 12; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = null; this._chipOrder = null; this._shelfOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('sr-style')) return;
      var s = el('style'); s.id = 'sr-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.sr-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,660px);margin:0 auto;}',
        '.sr-scene{position:relative;width:100%;display:flex;flex-direction:column;gap:6px;padding:8px 10px 10px;border:2.5px solid #C9B98E;border-radius:14px;background:#FFFDF6;}',
        '.sr-cord-line{position:absolute;top:6px;bottom:8px;width:0;border-left:3px dashed #146B5E;opacity:.85;pointer-events:none;}',
        '.sr-cord-flag{position:absolute;top:-2px;transform:translateX(-50%);font:800 .68rem/1 "Baloo 2",Nunito,sans-serif;color:#0F4A40;background:#EAF4F1;border:1.5px solid #146B5E;border-radius:6px;padding:1px 6px;white-space:nowrap;}',
        '.sr-row{position:relative;display:flex;align-items:center;gap:7px;}',
        '.sr-track{position:relative;flex:1 1 auto;height:24px;background:#F4ECDC;border-radius:5px;}',
        '.sr-cordrow .sr-track{background:transparent;}',
        '.sr-bar{position:absolute;left:0;top:0;height:100%;border-radius:5px;}',
        '.sr-cordbar{background:repeating-linear-gradient(45deg,#146B5E,#146B5E 5px,#1d8474 5px,#1d8474 10px);}',
        '.sr-rlabel{flex:0 0 52px;text-align:right;font:800 .8rem/1 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.sr-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.sr-tilly{flex:0 0 auto;}',
        '.sr-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .9rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.sr-line-msg.miss{color:#C2410C;}',
        '.sr-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;width:100%;}',
        '.sr-cand{display:flex;align-items:center;gap:8px;padding:9px 16px;border:3px solid #146B5E;border-radius:13px;background:#fff;cursor:pointer;min-height:48px;font:800 clamp(.92rem,3.4vw,1.06rem)/1 Nunito,system-ui,sans-serif;color:#0F4A40;}',
        '.sr-cand.dim{opacity:.42;}',
        '.sr-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.sr-swatch{width:20px;height:20px;border-radius:5px;flex:0 0 auto;box-shadow:0 0 0 1.5px rgba(0,0,0,.18) inset;}',
        '.sr-tilly-svg .sr-eyes-happy{display:none;}.sr-tilly[data-pose=happy] .sr-eyes-open{display:none;}.sr-tilly[data-pose=happy] .sr-eyes-happy{display:block;}',
        '.sr-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.sr-root{gap:6px;}.sr-scene{gap:4px;padding:6px 8px 8px;}.sr-track{height:20px;}.sr-rlabel{flex-basis:42px;font-size:.74rem;}.sr-cand{min-height:44px;padding:7px 11px;}}',
        '.lcs-app:not(.tilly-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'seriation.compare-length.1-md-a-1';
      var tries = ['/mini-tools/seriation-activities.json', 'seriation-activities.json', '../mini tools/seriation-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row;
            self._pool = (row && row.params && row.params.rounds) || [];
            self._maxUnit = (row && row.params && row.params.maxUnit) || 12;
            self._order = null; self._orderForPool = null; self._curPass = 0;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(i + 1); });
      }(0));
    },

    _shuffle: function (a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; },
    _bandOrder: function (pool, prev) {
      var self = this, order = this._shuffle(pool.map(function (_, i) { return i; }));
      if (prev && order.length > 1) { var g = 0; while (order.join(',') === prev.join(',') && g++ < 12) order = self._shuffle(pool.map(function (_, i) { return i; })); }
      return order;
    },
    nextTask: function (ctx) {
      var pool = this._pool || []; if (!pool.length) return null;
      var n = pool.length, index = (ctx && ctx.index) || 0, pass = Math.floor(index / n);
      if (!this._order || this._orderForPool !== pool) { this._order = this._bandOrder(pool); this._orderForPool = pool; this._curPass = 0; }
      else if (pass > this._curPass) { this._order = this._bandOrder(pool, this._order); this._curPass = pass; }
      return this._makeTask(pool[this._order[index % n]]);
    },

    _makeTask: function (round) {
      var q = round.mode === 'shortest' ? txt('qShortest') : round.mode === 'samecord' ? txt('qSamecord') : txt('qLongest');
      return {
        id: round.id, promptKey: 'q', promptArgs: { q: q }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = null;
      var n = (round.ribbons || []).length;
      this._shelfOrder = this._shuffle(round.ribbons.map(function (_, i) { return i; }));   /* shelf display order ≠ length order */
      this._chipOrder = this._shuffle(round.ribbons.map(function (_, i) { return i; }));     /* chip order ≠ shelf order */
      if (this._app) this._app.classList.remove('tilly-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'sr-root');

      root.appendChild(this._scene(round));

      var say = el('div', 'sr-say');
      var tl = el('div', 'sr-tilly'); tl.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); tl.innerHTML = tillySVG();
      var msg = el('p', 'sr-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(tl, msg); root.appendChild(say); this._tilly = tl;

      this._renderChips(root, round);
      root.appendChild(this._srMirror(round));
      stage.appendChild(root);
    },

    _scene: function (round) {
      var max = this._maxUnit, cordPct = pct(round.cordLen, max);
      var scene = el('div', 'sr-scene');

      /* The cord reference is shown as a teal striped bar (top row) + a per-shelf
         dashed marker at the SAME track-percentage, so "past / short of the cord"
         reads on every shelf. (Each track shares left:0, so the percentage aligns
         vertically across all rows without a fragile scene-wide overlay.) */

      /* cord reference row */
      var crow = el('div', 'sr-row sr-cordrow');
      var ctrack = el('div', 'sr-track');
      var cbar = el('div', 'sr-bar sr-cordbar'); cbar.style.width = cordPct + '%';
      var cflag = el('div', 'sr-cord-flag'); cflag.style.left = cordPct + '%'; cflag.textContent = txt('cord');
      ctrack.append(cbar, cflag);
      var clab = el('div', 'sr-rlabel'); clab.textContent = '';
      crow.append(ctrack, clab);
      scene.appendChild(crow);

      /* ribbon shelves (display order shuffled) */
      var self = this, order = this._shelfOrder || round.ribbons.map(function (_, i) { return i; });
      order.forEach(function (ri) {
        var rib = round.ribbons[ri], c = COLORS[rib.color] || { hex: '#999', label: rib.label };
        var row = el('div', 'sr-row');
        var track = el('div', 'sr-track');
        var bar = el('div', 'sr-bar'); bar.style.width = pct(rib.len, max) + '%'; bar.style.background = c.hex;
        /* per-track dashed cord marker so "past / short of the cord" reads on every shelf */
        var mk = el('div'); mk.style.position = 'absolute'; mk.style.left = cordPct + '%'; mk.style.top = '-3px'; mk.style.bottom = '-3px'; mk.style.width = '0'; mk.style.borderLeft = '2px dashed rgba(20,107,94,.55)';
        track.append(bar, mk);
        var lab = el('div', 'sr-rlabel'); lab.textContent = c.label;
        row.append(track, lab);
        scene.appendChild(row);
      });
      return scene;
    },

    _renderChips: function (root, round) {
      var self = this, tok = this._token;
      var strip = el('div', 'sr-strip');
      var order = this._chipOrder || round.ribbons.map(function (_, i) { return i; });
      order.forEach(function (ri) {
        var rib = round.ribbons[ri], c = COLORS[rib.color] || { hex: '#999', label: rib.label };
        var b = el('button', 'sr-cand' + (self._nonConf[ri] ? ' dim' : '') + (self._lit === ri ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('data-ci', ri); b.setAttribute('aria-label', c.label);
        var sw = el('span', 'sr-swatch'); sw.style.background = c.hex;
        var nm = el('span'); nm.textContent = c.label;
        b.append(sw, nm);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[ri] || self._token !== tok) return;
          if (Core.isAnswer(round, ri)) { self._lit = ri; self._resolve(); }
          else { self._nonConf[ri] = 1; self._nudge(round.mode); }
        });
        strip.appendChild(b);
      });
      root.appendChild(strip);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('tilly-resolved');
      this.render();
      var line = this._api.stage.querySelector('.sr-line-msg');
      if (line) { line.textContent = txt('win', { note: txt('winNote') }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (mode) {
      var key = mode === 'shortest' ? 'nShortest' : mode === 'samecord' ? 'nSamecord' : 'nLongest';
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.sr-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function (round) {
      var max = this._maxUnit, wrap = el('div', 'sr-sronly'); wrap.setAttribute('aria-live', 'polite');
      var q = round.mode === 'shortest' ? txt('qShortest') : round.mode === 'samecord' ? txt('qSamecord') : txt('qLongest');
      var parts = (round.ribbons || []).map(function (r) {
        var c = COLORS[r.color] || { label: r.label };
        var rel = r.len > round.cordLen ? 'longer than the cord' : r.len < round.cordLen ? 'shorter than the cord' : 'as long as the cord';
        return c.label + ' ribbon is ' + rel;
      }).join('; ');
      wrap.innerHTML = '<p>The cord is the reference. ' + parts + '. ' + q + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.SeriationActivity = SeriationActivity;

}(typeof window !== 'undefined' ? window : this));
