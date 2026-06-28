/* =====================================================================
   MAPLE'S BAKERY — ACTIVITY SKIN  (maple-bakery-activity.js)
   ---------------------------------------------------------------------
   3.OA.A.2 · interpret whole-number quotients (division) — CLARITY-FIRST.
   The lcs-shell skin over maple-bakery-core.js. answerType:'state'. EN-ONLY.

   The child SEES the division: the cookies are split into EQUAL groups, and
   the child taps the number.
     • share (partitive) — D cookies on `divisor` plates, each plate holding
       the same → "How many cookies on each plate?" (answer = D / divisor).
     • pack  (quotitive) — D cookies in boxes that each hold `divisor` →
       "How many boxes do you need?" (answer = D / divisor).
   The question (with the numbers) flows through the SHELL prompt banner
   (one prompt, no duplicate). A correct number → the vessels glow + Maple
   wiggles (resolve; shell Check hidden until `.lcs-app.maple-resolved`). A
   wrong number → a warm nudge ("count one plate / the full boxes"), no
   advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MapleBakeryCore;

  var L = {
    en: {
      win: 'Yes — {note}',
      winShare: '{a} cookies on each plate!',
      winPack: '{a} full boxes!',
      nShare: 'Count the cookies on just ONE plate.',
      nPack: 'Count how many boxes are full.'
    }
  };
  function txt(k, a) {
    var s = L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var C = { T: '#146B5E', CORAL: '#F2784B', INK: '#0F4A40', DOUGH: '#E8B97A', DOUGH2: '#CE934A', CHIP: '#6B4423', PLATE: '#E2F0EC', BOX: '#D8A56A', BOXDK: '#B97A36' };

  function mapleSVG() {
    return '<svg class="mb-maple-svg" viewBox="0 0 56 56" width="36" height="36" aria-hidden="true">' +
      '<circle cx="16" cy="15" r="9" fill="#B9A89C" stroke="#8B7A6E" stroke-width="2"/>' +   /* ears */
      '<circle cx="40" cy="15" r="9" fill="#B9A89C" stroke="#8B7A6E" stroke-width="2"/>' +
      '<circle cx="16" cy="15" r="4.5" fill="#F2C9C0"/><circle cx="40" cy="15" r="4.5" fill="#F2C9C0"/>' +
      '<ellipse cx="28" cy="34" rx="16" ry="15" fill="#C7B6A8" stroke="#8B7A6E" stroke-width="2"/>' +
      '<g class="mb-eyes-open"><circle cx="22" cy="32" r="2" fill="#2B2B2B"/><circle cx="34" cy="32" r="2" fill="#2B2B2B"/></g>' +
      '<g class="mb-eyes-happy"><path d="M19 32 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M31 32 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="28" cy="39" rx="3" ry="2.4" fill="#F2784B"/>' +
      '<path d="M28 41 v3" stroke="#8B7A6E" stroke-width="1.3"/>' +
      '<g class="mb-mouth-happy"><path d="M23 43 q5 5 10 0" stroke="#8B7A6E" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>' +
      '<g stroke="#8B7A6E" stroke-width="1" opacity=".7"><line x1="14" y1="39" x2="3" y2="37"/><line x1="14" y1="41" x2="3" y2="43"/><line x1="42" y1="39" x2="53" y2="37"/><line x1="42" y1="41" x2="53" y2="43"/></g></svg>';
  }

  /* one chocolate-chip cookie centered at (cx,cy) */
  function cookie(cx, cy) {
    var r = 10;
    var chips = '';
    var pts = [[-4, -3], [4, -2], [-1, 4], [3, 4], [-5, 3]];
    for (var i = 0; i < 4; i++) chips += '<circle cx="' + (cx + pts[i][0]) + '" cy="' + (cy + pts[i][1]) + '" r="1.6" fill="' + C.CHIP + '"/>';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + C.DOUGH + '" stroke="' + C.DOUGH2 + '" stroke-width="1.6"/>' + chips;
  }
  /* cookie offsets for n cookies — a SINGLE row, centered on (0,0). A short,
     wide vessel reads clearly + lets the scene fill the card width without
     growing tall (so it never overflows the resolved-state fold). */
  function grid(n) {
    var out = [], pitchX = 24;
    for (var c = 0; c < n; c++) out.push({ dx: (c - (n - 1) / 2) * pitchX, dy: 0 });
    return out;
  }
  function cookies(cx, cy, n) {
    var g = grid(n), s = '';
    for (var i = 0; i < g.length; i++) s += cookie(cx + g[i].dx, cy + g[i].dy);
    return s;
  }

  /* a plate (wide ellipse) with n cookies sitting on it in a row */
  function plateGroup(cx, n) {
    var plateY = 56, cookieCY = 38, rx = Math.max(34, n * 12 + 16);
    return '<ellipse cx="' + cx + '" cy="' + (plateY + 4) + '" rx="' + rx + '" ry="8" fill="#C9DAD4"/>' +
      '<ellipse cx="' + cx + '" cy="' + plateY + '" rx="' + rx + '" ry="9" fill="' + C.PLATE + '" stroke="' + C.T + '" stroke-width="2.5"/>' +
      cookies(cx, cookieCY, n);
  }
  /* a wide open box with a row of n cookies inside (peeking over the rim) */
  function boxGroup(cx, n) {
    var halfw = Math.max(28, n * 12 + 16), bx = cx - halfw, bx2 = cx + halfw, topY = 32, botY = 64;
    var cookieCY = 28;
    var body = '<path d="M' + bx + ' ' + topY + ' L' + (bx + 6) + ' ' + botY + ' h' + (2 * halfw - 12) + ' L' + bx2 + ' ' + topY + '" fill="' + C.BOX + '" stroke="' + C.BOXDK + '" stroke-width="2.5" stroke-linejoin="round"/>';
    var flapL = '<path d="M' + bx + ' ' + topY + ' l-7 -9 l11 -2 z" fill="' + C.BOXDK + '"/>';
    var flapR = '<path d="M' + bx2 + ' ' + topY + ' l7 -9 l-11 -2 z" fill="' + C.BOXDK + '"/>';
    var rim = '<line x1="' + bx + '" y1="' + topY + '" x2="' + bx2 + '" y2="' + topY + '" stroke="' + C.BOXDK + '" stroke-width="2.5"/>';
    return flapL + flapR + cookies(cx, cookieCY, n) + body + rim;   /* body drawn AFTER cookies = an opaque front wall (containment) */
  }

  var MapleBakeryActivity = {
    id: 'maple-bakery-activity',
    strings: {
      title: { en: "Maple's Bakery" },
      instruction: { en: 'Help Maple the mouse divide the cookies fairly!' },
      qshare: { en: 'Share {d} cookies onto {n} plates. How many on each plate?' },
      qpack: { en: 'Pack {d} cookies into boxes of {n}. How many boxes?' }
    },

    init: function (api) {
      this._api = api;
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._choiceOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('mb-style')) return;
      var s = el('style'); s.id = 'mb-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.mb-root{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.mb-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.mb-maple{flex:0 0 auto;}',
        '.mb-line-msg{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .88rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.mb-line-msg.miss{color:#C2410C;}',
        '.mb-board{width:100%;max-width:min(96vw,640px);display:flex;flex-direction:column;gap:14px;align-items:center;}',
        '.mb-scene{width:100%;height:auto;display:block;}',
        '.mb-scene.glow .mb-vessel{filter:drop-shadow(0 0 6px #F2C14E);}',
        '.mb-row{display:flex;justify-content:center;align-items:stretch;width:100%;gap:14px;}',
        '.mb-cand{flex:1 1 0;min-width:0;max-width:170px;min-height:clamp(54px,8vw,82px);border:3px solid #146B5E;border-radius:16px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(1.45rem,5.5vw,2.5rem)/1 Baloo 2,Nunito,sans-serif;display:flex;align-items:center;justify-content:center;}',
        '.mb-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.mb-cand.dim{opacity:.4;}',
        '.mb-maple-svg .mb-eyes-happy,.mb-maple-svg .mb-mouth-happy{display:none;}',
        '.mb-maple[data-pose=happy] .mb-eyes-open{display:none;}.mb-maple[data-pose=happy] .mb-eyes-happy,.mb-maple[data-pose=happy] .mb-mouth-happy{display:block;}',
        '.mb-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.mb-root{gap:9px;}.mb-cand{min-height:52px;font-size:1.25rem;}.mb-line-msg{font-size:.82rem;}}',
        '@media (prefers-reduced-motion:reduce){.mb-scene.glow .mb-vessel{filter:none;}}',
        '.lcs-app:not(.maple-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'maple-bakery.share.3-oa-a-2';
      var tries = ['/mini-tools/maple-bakery-activities.json', 'maple-bakery-activities.json', '../mini tools/maple-bakery-activities.json'];
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
      var pk = round.cog === 'pack' ? 'qpack' : 'qshare';
      return {
        id: round.id, promptKey: pk, promptArgs: { d: round.dividend, n: round.divisor }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {};
      this._choiceOrder = this._shuffle(Core.choices(round).slice());
      if (this._app) this._app.classList.remove('maple-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'mb-root');

      var say = el('div', 'mb-say');
      var ma = el('div', 'mb-maple'); ma.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); ma.innerHTML = mapleSVG();
      var msg = el('p', 'mb-line-msg'); msg.setAttribute('aria-live', 'polite');
      say.append(ma, msg); root.appendChild(say); this._maple = ma;

      this._renderScene(root);
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderScene: function (root) {
      var self = this, r = this._round, tok = this._token;
      var vessels = Core.vessels(r), perV = Core.perVessel(r);
      var board = el('div', 'mb-board');

      var cellW = 190, H = 70, W = vessels * cellW;
      var parts = '';
      for (var i = 0; i < vessels; i++) {
        var cx = i * cellW + cellW / 2;
        parts += '<g class="mb-vessel">' + (r.cog === 'pack' ? boxGroup(cx, perV) : plateGroup(cx, perV)) + '</g>';
      }
      var scene = '<svg class="mb-scene' + (this._resolved ? ' glow' : '') + '" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + parts + '</svg>';
      /* single-row vessels → wide + SHORT scene that fills the card width on
         desktop (≤640) without growing tall (so the resolved-state Check still
         clears the fold). */
      var wrap = el('div'); wrap.style.width = '100%'; wrap.style.maxWidth = Math.min(vessels * 200, 640) + 'px'; wrap.innerHTML = scene;
      board.appendChild(wrap);

      var row = el('div', 'mb-row');
      this._choiceOrder.forEach(function (val, i) {
        var b = el('button', 'mb-cand' + (self._nonConf[val] ? ' dim' : ''));
        b.type = 'button'; b.textContent = String(val); b.setAttribute('aria-label', String(val));
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[val] || self._token !== tok) return;
          if (Core.isAnswer(r, val)) self._resolve();
          else { self._nonConf[val] = 1; self._nudge(r.cog === 'pack' ? 'nPack' : 'nShare'); }
        });
        row.appendChild(b);
      });
      board.appendChild(row);
      root.appendChild(board);
    },

    _resolve: function () {
      var r = this._round, a = Core.answerValue(r);
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('maple-resolved');
      this.render();
      var note = txt(r.cog === 'pack' ? 'winPack' : 'winShare', { a: a });
      var line = this._api.stage.querySelector('.mb-line-msg');
      if (line) { line.textContent = txt('win', { note: note }); line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: note }));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      var line = this._api.stage.querySelector('.mb-line-msg');
      if (line) { line.textContent = txt(key); line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'mb-sronly'); wrap.setAttribute('aria-live', 'polite');
      var ch = this._choiceOrder.join(', ');
      var msg = r.cog === 'pack'
        ? r.dividend + ' cookies are packed into boxes that each hold ' + r.divisor + '. How many boxes are there? Choices: ' + ch + '.'
        : r.dividend + ' cookies are shared equally onto ' + r.divisor + ' plates. How many cookies are on each plate? Choices: ' + ch + '.';
      wrap.innerHTML = '<p>' + msg + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.MapleBakeryActivity = MapleBakeryActivity;

}(typeof window !== 'undefined' ? window : this));
