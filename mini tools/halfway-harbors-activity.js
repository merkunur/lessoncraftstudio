/* =====================================================================
   THE HALFWAY HARBORS — ACTIVITY SKIN  (halfway-harbors-activity.js)
   ---------------------------------------------------------------------
   3.NBT.A.1 · round to the nearest 10 / 100 — CLARITY REBUILD. The lcs-shell
   skin over halfway-harbors-core.js. answerType:'state'. EN-ONLY pilot.

   The NUMBER-LINE is the graphic: a row of round-number HARBORS (lantern = a
   ten, lighthouse = a hundred), the BOAT carrying its number sitting at its
   true to-scale spot above the line, the coral HALFWAY BUOY at the midpoint.
   The child SEES which harbor the boat is nearer to and taps it.
     • nearest    — tap the harbor the boat is closest to (nearest 10).
     • big-trail  — tap the lighthouse the boat is closest to (nearest 100).
     • halfway    — tap the buoy exactly halfway between two harbors.

   A correct tap → the harbor lights + the boat docks (resolve; shell Check
   hidden until `.lcs-app.marina-resolved`) + the coastline lights grow. A
   wrong tap → a warm nudge that points at the buoy, no advance. 0 lines to
   any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.HalfwayHarborsCore;

  var L = {
    en: {
      qnearest: 'Which harbor is the boat closest to?',
      qbig: 'Which lighthouse is the boat closest to?',
      qhalfway: 'Tap the buoy exactly halfway between the two harbors.',
      win: 'Docked safely! {note}',
      winNear: 'that is the closest harbor.',
      winHalf: 'right in the middle!',
      nPast: 'The boat is past the halfway buoy — it’s closer to the bigger harbor.',
      nBefore: 'The boat is before the halfway buoy — it’s closer to the smaller harbor.',
      nHalf: 'The buoy sits the same distance from each harbor — pick the middle one.',
      srNearest: 'Boat {target} on a number line. Which round number is it closest to? Harbors: {harbors}.',
      srHalfway: 'On a number line from {a} to {b}, which number is exactly halfway? Choices: {choices}.',
      harborAria: 'harbor {n}'
    },
    de: {
      qnearest: 'Zu welchem Hafen gehört das Boot? Runde auf den nächsten Zehner.',
      qbig: 'Zu welchem Leuchtturm gehört das Boot? Runde auf den nächsten Hunderter.',
      qhalfway: 'Welche Zahl liegt genau in der Mitte?',
      win: 'Sicher im Hafen! {note}',
      winNear: 'Das ist der nächste Hafen.',
      winHalf: 'Genau in der Mitte!',
      nPast: 'Das Boot ist schon hinter der Boje – der größere Hafen ist näher.',
      nBefore: 'Das Boot ist noch vor der Boje – der kleinere Hafen ist näher.',
      nHalf: 'Die Boje liegt von beiden Häfen gleich weit weg – wähle die Zahl genau dazwischen.',
      srNearest: 'Boot {target} auf einem Zahlenstrahl. Welcher runde Hafen ist am nächsten? Häfen: {harbors}.',
      srHalfway: 'Auf einem Zahlenstrahl von {a} bis {b}: Welche Zahl liegt genau in der Mitte? Zur Auswahl: {choices}.',
      harborAria: 'Hafen {n}'
    },
    fr: {
      qnearest: 'De quel port le bateau est-il le plus proche ? Arrondis à la dizaine.',
      qbig: 'De quel phare le bateau est-il le plus proche ? Arrondis à la centaine.',
      qhalfway: 'Quel nombre est exactement au milieu ?',
      win: 'À bon port ! {note}',
      winNear: 'c’est le port le plus proche.',
      winHalf: 'pile au milieu !',
      nPast: 'Le bateau a dépassé la bouée du milieu — il est plus proche du grand port.',
      nBefore: 'Le bateau est avant la bouée du milieu — il est plus proche du petit port.',
      nHalf: 'La bouée est à la même distance des deux ports — choisis le nombre du milieu.',
      srNearest: 'Bateau {target} sur une droite graduée. De quel nombre rond est-il le plus proche ? Ports : {harbors}.',
      srHalfway: 'Sur une droite graduée de {a} à {b}, quel nombre est exactement au milieu ? Choix : {choices}.',
      harborAria: 'port {n}'
    },
    es: {
      qnearest: '¿A qué puerto pertenece el barco? Redondea a la decena más cercana.',
      qbig: '¿A qué faro pertenece el barco? Redondea a la centena más cercana.',
      qhalfway: '¿Qué número queda justo a la mitad?',
      win: '¡A salvo en el puerto! {note}',
      winNear: 'Ese es el puerto más cercano.',
      winHalf: '¡Justo a la mitad!',
      nPast: 'El barco ya pasó la boya: el puerto más grande está más cerca.',
      nBefore: 'El barco todavía no llega a la boya: el puerto más pequeño está más cerca.',
      nHalf: 'La boya está a la misma distancia de los dos puertos: elige el número que queda justo entre ellos.',
      srNearest: 'Barco {target} en una recta numérica. ¿A qué número redondo está más cerca? Puertos: {harbors}.',
      srHalfway: 'En una recta numérica del {a} al {b}, ¿qué número queda justo a la mitad? Opciones: {choices}.',
      harborAria: 'puerto {n}'
    },
    pt: {
      qnearest: 'De qual porto o barco está mais perto? Arredonde para a dezena mais próxima.',
      qbig: 'De qual farol o barco está mais perto? Arredonde para a centena mais próxima.',
      qhalfway: 'Qual número fica bem no meio?',
      win: 'Chegou em segurança ao porto! {note}',
      winNear: 'Esse é o porto mais próximo.',
      winHalf: 'Bem no meio!',
      nPast: 'O barco já passou da boia: o porto maior está mais perto.',
      nBefore: 'O barco ainda não chegou à boia: o porto menor está mais perto.',
      nHalf: 'A boia está à mesma distância dos dois portos: escolha o número que fica bem no meio.',
      srNearest: 'Barco {target} numa reta numérica. De qual número redondo ele está mais perto? Portos: {harbors}.',
      srHalfway: 'Numa reta numérica de {a} a {b}, qual número fica bem no meio? Opções: {choices}.',
      harborAria: 'porto {n}'
    }
  };
  function txt(k, a) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var s = (L[lang] || L.en)[k] || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var C = { T: '#146B5E', LINE: '#146B5E', CORAL: '#F2784B', LIT: '#F2C14E', INK: '#0F4A40', SEA: '#1B4F63' };

  function marinaSVG() {
    return '<svg class="hh-marina-svg" viewBox="0 0 54 56" width="34" height="36" aria-hidden="true">' +
      '<rect x="20" y="20" width="14" height="30" rx="2" fill="#E2F0EC" stroke="#146B5E" stroke-width="2"/>' +
      '<path d="M18 20 h18 l-3 -6 h-12 z" fill="#F2784B"/>' +
      '<circle cx="27" cy="12" r="5" fill="#FCE6A8" stroke="#F2784B" stroke-width="1.5"/>' +
      '<ellipse cx="27" cy="44" rx="9" ry="8" fill="#8AA0A6"/>' +
      '<path d="M20 39 q-2 -6 2 -7 q3 2 2 7z" fill="#7A9097"/><path d="M34 39 q2 -6 -2 -7 q-3 2 -2 7z" fill="#7A9097"/>' +
      '<g class="hh-eyes-open"><circle cx="24" cy="44" r="1.8" fill="#2B2B2B"/><circle cx="30" cy="44" r="1.8" fill="#2B2B2B"/></g>' +
      '<g class="hh-eyes-happy"><path d="M22 44 q2 -3 4 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M28 44 q2 -3 4 0" stroke="#2B2B2B" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></svg>';
  }
  function coastSVG(n) {
    var cap = Math.min(n, 9), lights = '';
    for (var i = 0; i < cap; i++) { var x = 6 + i * 6, y = 18 - (i % 3) * 4; lights += '<circle cx="' + x + '" cy="' + y + '" r="2.1" fill="#F2C14E"/><circle cx="' + x + '" cy="' + y + '" r="3.6" fill="#F2C14E" opacity=".3"/>'; }
    return '<svg class="hh-coast-svg" viewBox="0 0 62 32" width="42" height="22" aria-hidden="true">' +
      '<rect x="50" y="9" width="6" height="15" rx="1.5" fill="#E2F0EC" stroke="#146B5E" stroke-width="1.5"/>' +
      '<circle cx="53" cy="8" r="2.6" fill="#F2C14E"/><path d="M50 6 h6 l-1.5 -3 h-3 z" fill="#F2784B"/>' +
      '<g>' + lights + '</g><path d="M0 25 q15 -4 31 0 q16 4 31 0 v7 h-62z" fill="#1B4F63"/></svg>';
  }
  /* a harbor marker on the line. A ten = a short LANTERN; a hundred = a tall
     striped LIGHTHOUSE — clearly different so the place reads at a glance. */
  function harborMark(cx, lineY, big) {
    var tick = '<line x1="' + cx + '" y1="' + (lineY - 5) + '" x2="' + cx + '" y2="' + (lineY + 5) + '" stroke="' + C.LINE + '" stroke-width="3"/>';
    if (big) {
      var h = 30, w = 14, topY = lineY - 2 - h;
      return tick +
        '<path d="M' + (cx - w / 2) + ' ' + (lineY - 2) + ' L' + (cx - w / 2 + 2) + ' ' + topY + ' h' + (w - 4) + ' L' + (cx + w / 2) + ' ' + (lineY - 2) + ' z" fill="#E2F0EC" stroke="' + C.LINE + '" stroke-width="2"/>' +
        '<rect x="' + (cx - w / 2 + 2) + '" y="' + (topY + 9) + '" width="' + (w - 4) + '" height="5" fill="' + C.CORAL + '"/>' +
        '<rect x="' + (cx - w / 2 + 2) + '" y="' + (topY + 19) + '" width="' + (w - 4) + '" height="5" fill="' + C.CORAL + '" opacity=".7"/>' +
        '<circle cx="' + cx + '" cy="' + (topY - 2) + '" r="4.2" fill="' + C.LIT + '" stroke="' + C.CORAL + '" stroke-width="1.2"/>';
    }
    var lh = 13, lw = 9, lbase = lineY - 2;
    return tick +
      '<rect x="' + (cx - lw / 2) + '" y="' + (lbase - lh) + '" width="' + lw + '" height="' + lh + '" rx="2" fill="#E2F0EC" stroke="' + C.LINE + '" stroke-width="2"/>' +
      '<circle cx="' + cx + '" cy="' + (lbase - lh - 1) + '" r="3.2" fill="' + C.LIT + '" stroke="' + C.CORAL + '" stroke-width="1"/>';
  }
  function boatMark(cx, topY, num) {
    return '<g>' +
      '<rect x="' + (cx - 19) + '" y="' + topY + '" width="38" height="20" rx="6" fill="#fff" stroke="' + C.CORAL + '" stroke-width="2.5"/>' +
      '<text x="' + cx + '" y="' + (topY + 15) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="15" fill="' + C.INK + '" text-anchor="middle">' + num + '</text>' +
      '<path d="M' + (cx - 12) + ' ' + (topY + 24) + ' h24 l-5 9 h-14 z" fill="' + C.CORAL + '"/>' +   /* hull points down to the line */
      '<line x1="' + cx + '" y1="' + (topY + 20) + '" x2="' + cx + '" y2="' + (topY + 24) + '" stroke="' + C.CORAL + '" stroke-width="2"/></g>';
  }
  function buoyMark(cx, lineY, withDivide) {
    var divide = withDivide ? '<line x1="' + cx + '" y1="' + (lineY - 26) + '" x2="' + cx + '" y2="' + (lineY + 6) + '" stroke="' + C.CORAL + '" stroke-width="1.5" stroke-dasharray="3 3" opacity=".55"/>' : '';
    return divide + '<path d="M' + cx + ' ' + (lineY - 9) + ' l8 9 -8 9 -8 -9 z" fill="' + C.CORAL + '" stroke="#fff" stroke-width="1.2"/>';
  }

  var HalfwayHarborsActivity = {
    id: 'halfway-harbors-activity',
    strings: {
      title: { en: 'The Halfway Harbors', de: 'Marinas Häfen', fr: 'Les ports de Marina', es: 'Marina y los puertos redondos', pt: 'Marina e os portos redondos' },
      instruction: { en: 'Send each boat to the round-number harbor it is closest to!', de: 'Bring jedes Boot zum nächsten runden Hafen.', fr: 'Emmène chaque bateau vers le port rond le plus proche !', es: 'Lleva cada barco al puerto redondo más cercano.', pt: 'Leve cada barco ao porto redondo mais próximo.' },
      qnearest: { en: 'Which harbor is the boat closest to?', de: 'Zu welchem Hafen gehört das Boot? Runde auf den nächsten Zehner.', fr: 'De quel port le bateau est-il le plus proche ? Arrondis à la dizaine.', es: '¿A qué puerto pertenece el barco? Redondea a la decena más cercana.', pt: 'De qual porto o barco está mais perto? Arredonde para a dezena mais próxima.' },
      qbig: { en: 'Which lighthouse is the boat closest to?', de: 'Zu welchem Leuchtturm gehört das Boot? Runde auf den nächsten Hunderter.', fr: 'De quel phare le bateau est-il le plus proche ? Arrondis à la centaine.', es: '¿A qué faro pertenece el barco? Redondea a la centena más cercana.', pt: 'De qual farol o barco está mais perto? Arredonde para a centena mais próxima.' },
      qhalfway: { en: 'Which number is exactly halfway?', de: 'Welche Zahl liegt genau in der Mitte?', fr: 'Quel nombre est exactement au milieu ?', es: '¿Qué número queda justo a la mitad?', pt: 'Qual número fica bem no meio?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {};
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('hh-style')) return;
      var s = el('style'); s.id = 'hh-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.hh-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.hh-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.hh-marina,.hh-coast{flex:0 0 auto;}',
        '.hh-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.hh-line-msg.miss{color:#C2410C;}',
        '.hh-prompt{font:700 clamp(1rem,4.2vw,1.5rem)/1.25 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;max-width:min(92vw,500px);}',
        /* the number-line strip + the aligned harbor/marker tap row share one width */
        '.hh-board{width:100%;max-width:min(96vw,600px);display:flex;flex-direction:column;gap:4px;}',
        '.hh-nl{width:100%;height:auto;display:block;}',
        '.hh-row{display:flex;justify-content:space-around;align-items:stretch;width:100%;gap:6px;}',
        '.hh-cand{flex:1 1 0;min-width:0;min-height:clamp(52px,9vw,72px);border:2.8px solid #146B5E;border-radius:13px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(1.15rem,4.6vw,2rem)/1 Baloo 2,Nunito,sans-serif;padding:6px 4px;display:flex;align-items:center;justify-content:center;}',
        '.hh-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.hh-cand.dim{opacity:.4;}',
        '.hh-marina-svg .hh-eyes-happy{display:none;}.hh-marina[data-pose=happy] .hh-eyes-open{display:none;}.hh-marina[data-pose=happy] .hh-eyes-happy{display:block;}',
        '.hh-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.hh-root{gap:7px;}.hh-prompt{font-size:.98rem;}.hh-cand{min-height:48px;font-size:1.1rem;}.hh-line-msg{font-size:.78rem;}}',
        '.lcs-app:not(.marina-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'halfway-harbors.nearest.3-nbt-a-1';
      var tries = ['/mini-tools/halfway-harbors-activities.json', 'halfway-harbors-activities.json', '../mini tools/halfway-harbors-activities.json'];
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
      var pk = { 'nearest': 'qnearest', 'big-trail': 'qbig', 'halfway': 'qhalfway' }[round.cog] || 'qnearest';
      return {
        id: round.id, promptKey: pk, promptArgs: {}, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      if (this._app) this._app.classList.remove('marina-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'hh-root');

      /* Marina (the character) speaks the prompt; no separate decorative vessel
         (it read as a stray icon competing with the number line). */
      var say = el('div', 'hh-say');
      var ma = el('div', 'hh-marina'); ma.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ma.innerHTML = marinaSVG();
      var msg = el('p', 'hh-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ma, msg); root.appendChild(say); this._marina = ma;

      if (round.cog === 'halfway') this._renderHalfway(root);
      else this._renderNearest(root);

      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    /* nearest / big-trail: the number-line with the boat + buoy, harbors as the tap row */
    _renderNearest: function (root) {
      var self = this, r = this._round, hs = r.harbors, N = hs.length, big = r.place === 100, tok = this._token;
      var board = el('div', 'hh-board');
      var W = N * 100, H = 100, lineY = 70;
      var tickX = function (i) { return i * 100 + 50; };
      /* boat at its true spot between the two bracketing harbors */
      var j = 0; for (var k = 0; k < N - 1; k++) { if (r.target >= hs[k] && r.target <= hs[k + 1]) { j = k; break; } if (r.target > hs[N - 1]) j = N - 2; }
      var localF = (r.target - hs[j]) / (hs[j + 1] - hs[j]);
      var boatX = tickX(j) + localF * 100;
      var parts = '<line x1="20" y1="' + lineY + '" x2="' + (W - 20) + '" y2="' + lineY + '" stroke="' + C.LINE + '" stroke-width="3"/>';
      for (var i = 0; i < N; i++) {
        parts += harborMark(tickX(i), lineY, big);
        parts += '<text x="' + tickX(i) + '" y="' + (lineY + 22) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="16" fill="' + C.INK + '" text-anchor="middle">' + hs[i] + '</text>';
      }
      parts += buoyMark(tickX(j) + 50, lineY, true);   /* the halfway buoy + dashed divide between the bracketing pair */
      if (!this._resolved) parts += boatMark(boatX, 6, r.target);
      var nl = '<svg class="hh-nl" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
      var svgWrap = el('div'); svgWrap.style.width = '100%'; svgWrap.innerHTML = nl; board.appendChild(svgWrap);

      var row = el('div', 'hh-row');
      hs.forEach(function (h, i) {
        var b = el('button', 'hh-cand' + (self._nonConf[i] ? ' dim' : ''));
        b.type = 'button'; b.textContent = String(h); b.setAttribute('aria-label', txt('harborAria', { n: h }));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[i] || self._token !== tok) return;
          if (Core.isAnswer(r, i)) self._resolve('winNear');
          else { self._nonConf[i] = 1; self._nudge(h > Core.nearestHarbor(r.target, hs) ? 'nBefore' : 'nPast'); }
        });
        row.appendChild(b);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    /* halfway: the line a—b with a single "?" buoy at the visual middle; tap the
       number that belongs there. (One middle marker — no clustered buoys, and
       the tap target is clearly the number buttons.) */
    _renderHalfway: function (root) {
      var self = this, r = this._round, a = r.harbors[0], b = r.harbors[1], tok = this._token;
      var board = el('div', 'hh-board');
      var W = 300, H = 100, lineY = 70, xA = 45, xB = 255, mid = (xA + xB) / 2;
      var parts = '<line x1="' + xA + '" y1="' + lineY + '" x2="' + xB + '" y2="' + lineY + '" stroke="' + C.LINE + '" stroke-width="3"/>';
      parts += harborMark(xA, lineY, b >= 100) + harborMark(xB, lineY, b >= 100);
      parts += '<text x="' + xA + '" y="' + (lineY + 22) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="16" fill="' + C.INK + '" text-anchor="middle">' + a + '</text>';
      parts += '<text x="' + xB + '" y="' + (lineY + 22) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="16" fill="' + C.INK + '" text-anchor="middle">' + b + '</text>';
      parts += buoyMark(mid, lineY, true);   /* the halfway buoy at the visual middle */
      parts += '<text x="' + mid + '" y="' + (lineY + 22) + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="18" fill="' + C.CORAL + '" text-anchor="middle">?</text>';
      var nl = '<svg class="hh-nl" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
      var svgWrap = el('div'); svgWrap.style.width = '100%'; svgWrap.innerHTML = nl; board.appendChild(svgWrap);

      var row = el('div', 'hh-row');
      r.buoyMarkers.forEach(function (m, i) {
        var btn = el('button', 'hh-cand' + (self._nonConf[i] ? ' dim' : ''));
        btn.type = 'button'; btn.textContent = String(m); btn.setAttribute('aria-label', m + '');
        btn.addEventListener('click', function () {
          if (self._resolved || self._nonConf[i] || self._token !== tok) return;
          if (Core.isAnswer(r, i)) self._resolve('winHalf');
          else { self._nonConf[i] = 1; self._nudge('nHalf'); }
        });
        row.appendChild(btn);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    _resolve: function (winKey) {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('marina-resolved');
      this.render();
      var line = this._api.stage.querySelector('.hh-line-msg');
      if (line) { line.textContent = txt('win', { note: txt(winKey) }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt(winKey) }));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.hh-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'hh-sronly'); wrap.setAttribute('aria-live', 'polite');
      var msg = '';
      if (r.cog === 'halfway') msg = txt('srHalfway', { a: r.harbors[0], b: r.harbors[1], choices: r.buoyMarkers.join(', ') });
      else msg = txt('srNearest', { target: r.target, harbors: r.harbors.join(', ') });
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.HalfwayHarborsActivity = HalfwayHarborsActivity;

}(typeof window !== 'undefined' ? window : this));
