/* =====================================================================
   SHELLY'S TIDE-LINE — ACTIVITY SKIN  (line-plot-activity.js)
   ---------------------------------------------------------------------
   2.MD.D.9 · measurement line plot — CLARITY-FIRST. The lcs-shell skin over
   line-plot-core.js. answerType:'state'. EN-ONLY pilot.

   Shelly the hermit crab plots shell lengths on a tide-line (a numbered
   scale with stacked X's). Two cogs:
     • plot — a new shell drawn as a coral bar (0 → its length); the child
       reads the length + taps it to drop its X onto the plot.
     • read — a complete line plot; the child answers a question by tapping
       a number card.
   The question flows through the SHELL prompt banner (one prompt). A correct
   tap → for plot the X drops onto the scale; Shelly wiggles (resolve; shell
   Check hidden until `.lcs-app.shelly-resolved`). A wrong tap → a warm nudge,
   no advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.LinePlotCore;
  var LANG = 'en';

  var L = {
    en: {
      win: 'Yes — {note}',
      winPlot: 'plotted at {a}!',
      winAt: '{a} shells!',
      winMode: '{a} is the most common length!',
      winNum: 'the answer is {a}!',
      nPlot: 'Look where the shell ends on the scale.',
      nRead: 'Look again at the X’s over each number.',
      srJoin: '{c} at {v}',
      srPlot: 'A new shell measures {len} on a scale of 1 to {max}. Tap its length to plot it. Choices: {choices}.',
      srRead: 'A line plot, scale 1 to {max}: {dist}. {q} Choices: {choices}.'
    },
    de: {
      win: 'Genau — {note}!',
      winPlot: 'bei {a} cm eingetragen',
      winAt: '{a} Muscheln',
      winMode: '{a} cm ist die häufigste Länge',
      winNum: 'die Lösung ist {a}',
      nPlot: 'Schau, wo die Muschel auf dem Zahlenstrahl endet.',
      nRead: 'Schau dir die Kreuze über jeder Zahl noch einmal an.',
      srJoin: '{c} bei {v} cm',
      srPlot: 'Eine neue Muschel ist {len} cm lang. Häufigkeitsdiagramm, Zahlenstrahl 1 bis {max}. Tippe auf ihre Länge, um sie einzutragen. Zur Auswahl: {choices}.',
      srRead: 'Ein Häufigkeitsdiagramm, Zahlenstrahl 1 bis {max}: {dist}. {q} Zur Auswahl: {choices}.'
    },
    fr: {
      win: 'Oui — {note} !',
      winPlot: 'placé à {a} cm',
      winAt: '{a} coquillages',
      winMode: '{a} cm est la longueur qui revient le plus souvent',
      winNum: 'la réponse est {a}',
      nPlot: 'Regarde où se termine le coquillage sur la droite graduée.',
      nRead: 'Regarde encore les X placés au-dessus de chaque nombre.',
      srJoin: '{c} à {v} cm',
      srPlot: 'Un nouveau coquillage mesure {len} cm. Diagramme des effectifs, droite graduée de 1 à {max}. Touche sa longueur pour le placer. Choix : {choices}.',
      srRead: 'Un diagramme des effectifs, droite graduée de 1 à {max} : {dist}. {q} Choix : {choices}.'
    }
  };
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var C = { T: '#146B5E', INK: '#0F4A40', CORAL: '#F2784B', LIT: '#F2C14E', LINE: '#146B5E' };

  function shellySVG() {
    return '<svg class="tl-shelly-svg" viewBox="0 0 56 50" width="36" height="34" aria-hidden="true">' +
      '<path d="M10 40 q-5 -1 -6 -5 M46 40 q5 -1 6 -5" stroke="#C2410C" stroke-width="2" fill="none" stroke-linecap="round"/>' +   /* claws */
      '<path d="M28 40 m-15 0 a15 13 0 1 1 30 0 z" fill="#F2A65A" stroke="#C2410C" stroke-width="2"/>' +   /* shell dome */
      '<path d="M28 40 a15 13 0 0 1 0 -26" fill="none" stroke="#C2410C" stroke-width="1.6"/><path d="M28 40 a8 7 0 0 1 0 -14" fill="none" stroke="#C2410C" stroke-width="1.4"/>' +
      '<line x1="22" y1="16" x2="20" y2="9" stroke="#5A3F33" stroke-width="1.6"/><line x1="34" y1="16" x2="36" y2="9" stroke="#5A3F33" stroke-width="1.6"/>' +
      '<g class="tl-eyes-open"><circle cx="20" cy="8" r="2.4" fill="#2B2B2B"/><circle cx="36" cy="8" r="2.4" fill="#2B2B2B"/></g>' +
      '<g class="tl-eyes-happy"><path d="M17 8 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M33 8 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></svg>';
  }

  var LinePlotActivity = {
    id: 'line-plot-activity',
    strings: {
      title: { en: "Shelly's Tide-Line", de: 'Shellys Gezeitenlinie', fr: 'Shelly et la ligne de marée' },
      instruction: { en: 'Help Shelly the hermit crab measure shells and read the tide-line plot!', de: 'Hilf Shelly, dem Einsiedlerkrebs, Muscheln zu messen und die Gezeitenlinie zu lesen!', fr: 'Aide Shelly le bernard-l’ermite à mesurer des coquillages et à lire le diagramme !' },
      qplot: { en: 'How long is this shell? Tap its length to plot it.', de: 'Wie lang ist diese Muschel? Tippe auf ihre Länge, um sie einzutragen.', fr: 'Quelle est la longueur de ce coquillage ? Touche sa longueur pour la placer.' },
      qAt: { en: 'How many shells are {n} cm long?', de: 'Wie viele Muscheln sind {n} cm lang?', fr: 'Combien de coquillages mesurent {n} cm ?' },
      qLonger: { en: 'How many shells are longer than {n} cm?', de: 'Wie viele Muscheln sind länger als {n} cm?', fr: 'Combien de coquillages sont plus longs que {n} cm ?' },
      qMode: { en: 'Which length is the most common?', de: 'Welche Länge kommt am häufigsten vor?', fr: 'Quelle longueur revient le plus souvent ?' },
      qDiff: { en: 'How much longer is the longest shell than the shortest?', de: 'Wie viel länger ist die längste Muschel als die kürzeste?', fr: 'Combien de cm de plus mesure le coquillage le plus long par rapport au plus court ?' },
      qMore: { en: 'How many more shells are {a} cm than {b} cm?', de: 'Wie viele Muscheln mehr sind {a} cm lang als {b} cm lang?', fr: 'Combien y a-t-il de coquillages de {a} cm de plus que de coquillages de {b} cm ?' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._choiceOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('tl-style')) return;
      var s = el('style'); s.id = 'tl-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.tl-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,620px);margin:0 auto;}',
        '.tl-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.tl-shelly{flex:0 0 auto;}',
        '.tl-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.tl-line-msg.miss{color:#C2410C;}',
        '.tl-board{width:100%;max-width:min(96vw,620px);display:flex;flex-direction:column;gap:12px;align-items:center;}',
        '.tl-scene{width:100%;height:auto;display:block;}',
        '.tl-row{display:flex;justify-content:center;align-items:stretch;width:100%;gap:14px;}',
        '.tl-cand{flex:1 1 0;min-width:0;max-width:120px;min-height:clamp(54px,8vw,84px);border:3px solid #146B5E;border-radius:16px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(2.1rem,9vw,3rem)/1 Baloo 2,Nunito,sans-serif;display:flex;align-items:center;justify-content:center;}',
        '.tl-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.tl-cand.dim{opacity:.4;}',
        '.tl-shelly-svg .tl-eyes-happy{display:none;}.tl-shelly[data-pose=happy] .tl-eyes-open{display:none;}.tl-shelly[data-pose=happy] .tl-eyes-happy{display:block;}',
        '.tl-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.tl-root{gap:8px;}.tl-cand{min-height:50px;font-size:1.2rem;}.tl-line-msg{font-size:.82rem;}}',
        '.lcs-app:not(.shelly-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'line-plot.read.2-md-d-9';
      var tries = ['/mini-tools/line-plot-activities.json', 'line-plot-activities.json', '../mini tools/line-plot-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && row.params.rounds) || [];
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
      var pk, args = {};
      if (round.cog === 'plot') pk = 'qplot';
      else { var q = round.question; pk = { atN: 'qAt', longerN: 'qLonger', mode: 'qMode', maxMinusMin: 'qDiff', moreAB: 'qMore' }[q.type] || 'qAt'; args = { n: q.n, a: q.a, b: q.b }; }
      return {
        id: round.id, promptKey: pk, promptArgs: args, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      this._choiceOrder = this._shuffle(Core.choices(round).slice());
      if (this._app) this._app.classList.remove('shelly-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'tl-root');

      var say = el('div', 'tl-say');
      var sh = el('div', 'tl-shelly'); sh.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); sh.innerHTML = shellySVG();
      var msg = el('p', 'tl-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(sh, msg); root.appendChild(say); this._shelly = sh;

      this._renderScene(root);
      this._renderOptions(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderScene: function (root) {
      var r = this._round, sc = r.scale, max = sc.max;
      var marks = (r.marks || []).slice();
      var isPlot = r.cog === 'plot';
      if (isPlot && this._resolved) marks.push(r.placeLength);   /* the dropped X */

      var pad = 22, cellU = 38, baseY = 76, W = pad * 2 + max * cellU, plotBottom = isPlot ? 116 : 102, H = plotBottom;
      var x = function (v) { return pad + v * cellU; };
      var parts = '';
      /* number line */
      parts += '<line x1="' + x(0) + '" y1="' + baseY + '" x2="' + x(max) + '" y2="' + baseY + '" stroke="' + C.LINE + '" stroke-width="3"/>';
      /* the X-stacks + tick labels */
      var cnt = {}; marks.forEach(function (m) { cnt[m] = (cnt[m] || 0) + 1; });
      for (var v = 1; v <= max; v++) {
        parts += '<line x1="' + x(v) + '" y1="' + (baseY - 4) + '" x2="' + x(v) + '" y2="' + (baseY + 4) + '" stroke="' + C.LINE + '" stroke-width="2"/>';
        parts += '<text x="' + x(v) + '" y="' + (baseY + 18) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="14" fill="' + C.INK + '" text-anchor="middle">' + v + '</text>';
        var n = cnt[v] || 0;
        for (var i = 0; i < n; i++) {
          var isNew = isPlot && this._resolved && v === r.placeLength && i === n - 1;
          parts += '<text x="' + x(v) + '" y="' + (baseY - 10 - i * 14) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="15" fill="' + (isNew ? C.CORAL : C.T) + '" text-anchor="middle">✕</text>';
        }
      }
      /* plot mode: the measure-bar (0 → placeLength) below the labels + a 0 origin */
      if (isPlot) {
        var barY = baseY + 22;
        parts += '<text x="' + x(0) + '" y="' + (baseY + 17) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="14" fill="' + C.INK + '" text-anchor="middle">0</text>';
        parts += '<rect x="' + x(0) + '" y="' + barY + '" width="' + (x(r.placeLength) - x(0)) + '" height="11" rx="4" fill="' + C.CORAL + '"/>';
        parts += '<line x1="' + x(r.placeLength) + '" y1="' + (baseY + 6) + '" x2="' + x(r.placeLength) + '" y2="' + (barY + 11) + '" stroke="' + C.CORAL + '" stroke-width="1.5" stroke-dasharray="3 3" opacity=".7"/>';
      }
      var svg = '<svg class="tl-scene" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
      /* read scenes can grow (more vertical headroom); plot scenes stay capped (the resolved measure-bar state is the FITS constraint) */
      var sceneMax = isPlot ? Math.min(W * 1.25, 440) : Math.min(W * 1.4, 500);
      var wrap = el('div'); wrap.style.width = '100%'; wrap.style.maxWidth = sceneMax + 'px'; wrap.innerHTML = svg;
      var board = el('div'); board.style.width = '100%'; board.style.display = 'flex'; board.style.justifyContent = 'center'; board.appendChild(wrap);
      root.appendChild(board);
    },

    _renderOptions: function (root) {
      var self = this, r = this._round, tok = this._token;
      var board = el('div', 'tl-board');
      var row = el('div', 'tl-row');
      this._choiceOrder.forEach(function (val) {
        var b = el('button', 'tl-cand' + (self._nonConf[val] ? ' dim' : ''));
        b.type = 'button'; b.textContent = String(val); b.setAttribute('aria-label', String(val));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[val] || self._token !== tok) return;
          if (Core.isAnswer(r, val)) self._resolve();
          else { self._nonConf[val] = 1; self._nudge(r.cog === 'plot' ? 'nPlot' : 'nRead'); }
        });
        row.appendChild(b);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    _resolve: function () {
      var r = this._round, a = Core.oracle(r);
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('shelly-resolved');
      this.render();
      var note;
      if (r.cog === 'plot') note = txt('winPlot', { a: a });
      else if (r.question.type === 'atN') note = (LANG === 'de' && a === 1) ? 'eine Muschel' : (LANG === 'fr' && a <= 1) ? (a + ' coquillage') : txt('winAt', { a: a });
      else if (r.question.type === 'mode') note = txt('winMode', { a: a });
      else note = txt('winNum', { a: a });
      var line = this._api.stage.querySelector('.tl-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.tl-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, snap = Core.snapshot(r), wrap = el('div', 'tl-sronly'); wrap.setAttribute('aria-live', 'polite');
      var cnt = {}; (r.marks || []).forEach(function (m) { cnt[m] = (cnt[m] || 0) + 1; });
      var dist = []; for (var v = 1; v <= r.scale.max; v++) if (cnt[v]) dist.push(txt('srJoin', { c: cnt[v], v: v }));
      var choices = this._choiceOrder.join(', '), msg;
      if (r.cog === 'plot') msg = txt('srPlot', { len: r.placeLength, max: r.scale.max, choices: choices });
      else {
        var pk = { atN: 'qAt', longerN: 'qLonger', mode: 'qMode', maxMinusMin: 'qDiff', moreAB: 'qMore' }[r.question.type];
        var qs = this.strings[pk], qt = (qs[LANG] || qs.en).replace('{n}', r.question.n).replace('{a}', r.question.a).replace('{b}', r.question.b);
        msg = txt('srRead', { max: r.scale.max, dist: dist.join(', '), q: qt, choices: choices });
      }
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.LinePlotActivity = LinePlotActivity;

}(typeof window !== 'undefined' ? window : this));
