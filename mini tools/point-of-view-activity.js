/* =====================================================================
   LUMEN'S LIGHTHOUSE WINDOWS — ACTIVITY SKIN  (point-of-view-activity.js)
   ---------------------------------------------------------------------
   RL.1.6 · point-of-view (who is telling) — CLARITY-FIRST redesign of #66.
   The lcs-shell skin over point-of-view-core.js. answerType:'state'. EN-ONLY.

   Lumen the owl keeps a lighthouse of creature-windows. A first-person line
   describes a harbor event from one creature's VIEW (high → tiny/far; low →
   big/close); the child taps the creature (in its window at a clear height)
   whose viewpoint it is. The line flows through the SHELL prompt banner. A
   correct tap → the window glows + Lumen wiggles (resolve; shell Check hidden
   until `.lcs-app.lumen-resolved`). A wrong tap → a warm vantage nudge, no
   advance. 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PointOfViewCore;
  var LANG = 'en';

  var L = {
    en: {
      win: 'Yes! {note}', winNote: 'That window has just the right view!',
      nHigh: 'Who is way up HIGH? Up high, things look tiny and far.',
      nLow: 'Who is down LOW by the water? Down low, things look big and close.'
    },
    de: {
      win: 'Richtig! {note}', winNote: 'Genau aus diesem Fenster wurde es gesehen!',
      nHigh: 'Wer sitzt ganz oben? Von ganz oben sieht alles winzig und weit weg aus.',
      nLow: 'Wer ist ganz unten am Wasser? Von ganz unten sieht alles riesig und ganz nah aus.'
    }
  };
  var POSLABEL = {
    en: { high: 'Up high', mid: 'Middle', low: 'Down low' },
    de: { high: 'Ganz oben', mid: 'In der Mitte', low: 'Ganz unten' }
  };
  function poslabel(pos) { return (POSLABEL[LANG] && POSLABEL[LANG][pos]) || POSLABEL.en[pos]; }
  function txt(k, a) { var s = (L[LANG] && L[LANG][k]) || L.en[k] || k; return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; }); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  /* fixed creature glyphs (centered ~(18,18) in a 36 box) */
  var GLYPHS = {
    bird: '<line x1="17" y1="28" x2="17" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><line x1="21" y1="28" x2="21" y2="33" stroke="#E08A2A" stroke-width="1.6" stroke-linecap="round"/><path d="M26 21 l8 -3 l-2 6 z" fill="#3E8794"/><ellipse cx="19" cy="23" rx="9" ry="7" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.5"/><circle cx="13" cy="16" r="5.5" fill="#5BA3B0" stroke="#2E6B77" stroke-width="1.4"/><path d="M8 15 l-6 2 l6 2.5 z" fill="#F2A65A" stroke="#D2761F" stroke-width="1"/><path d="M20 22 q5 -3 8 1 q-4 3 -8 0z" fill="#3E8794"/><circle cx="12" cy="15" r="1.4" fill="#2B2B2B"/>',
    mouse: '<ellipse cx="18" cy="24" rx="10" ry="9" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.5"/><circle cx="11" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><circle cx="25" cy="15" r="4.5" fill="#B7B2AE" stroke="#7E7873" stroke-width="1.3"/><path d="M27 27 q7 2 6 8" stroke="#7E7873" stroke-width="1.5" fill="none"/><circle cx="16" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="21" cy="23" r="1.3" fill="#2B2B2B"/><circle cx="18.5" cy="27" r="1.2" fill="#E7A6A0"/>',
    friend: '<circle cx="18" cy="22" r="10" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.5"/><circle cx="11" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="25" cy="13" r="3.5" fill="#D8A65A" stroke="#A07C3A" stroke-width="1.2"/><circle cx="15" cy="21" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="21" r="1.4" fill="#2B2B2B"/><path d="M15 26 q3 2 6 0" stroke="#7A5A2A" stroke-width="1.3" fill="none"/>',
    bunny: '<ellipse cx="18" cy="26" rx="9" ry="10" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.5"/><ellipse cx="14" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><ellipse cx="22" cy="11" rx="3" ry="8" fill="#C9BDB0" stroke="#8B7A6E" stroke-width="1.3"/><circle cx="15" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="21" cy="24" r="1.4" fill="#2B2B2B"/><circle cx="18" cy="28" r="1.4" fill="#E7A6A0"/>'
  };
  /* a LANDSCAPE height-window: a background tinted by height (sky for high,
     cream for middle, water for low) + a big creature + an up/down arrow. Fills
     a width-capped card (not sparse) without the portrait-tower height. The
     tint + arrow + the text label below give the height THREE ways. */
  function windowSVG(pos, glyphName) {
    var tint = { high: '#E4F1FB', mid: '#FBF3E4', low: '#8FC3CF' }[pos];   /* pale sky (high) vs deep teal water (low) — clearly distinct */
    var bg = '<rect x="1" y="1" width="86" height="62" rx="9" fill="' + tint + '" stroke="#146B5E" stroke-width="2"/>';
    var scenery = '';
    if (pos === 'high') scenery = '<circle cx="16" cy="14" r="4" fill="#fff"/><circle cx="23" cy="12" r="3.4" fill="#fff"/><circle cx="73" cy="15" r="4" fill="#fff"/>';   /* clouds */
    else if (pos === 'low') scenery = '<path d="M1 50 q11 -4 22 0 q11 4 22 0 q11 -4 22 0 q11 4 21 0 v12 h-87z" fill="#5E97A6"/>';   /* deeper wave on the teal water */
    else scenery = '<rect x="10" y="11" width="68" height="42" rx="3" fill="none" stroke="#D8C49A" stroke-width="2"/>';   /* window frame */
    var arrow = pos === 'high'
      ? '<path d="M9 28 l5 -6 l5 6 M9 37 l5 -6 l5 6" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
      : pos === 'low'
        ? '<path d="M9 25 l5 6 l5 -6 M9 34 l5 6 l5 -6" fill="none" stroke="#F2784B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<path d="M8 26 h12 M8 32 h12 M8 38 h12" stroke="#C99A4A" stroke-width="2.6" stroke-linecap="round"/>';
    var halo = '<ellipse cx="50" cy="33" rx="21" ry="19" fill="#fff" opacity=".6"/>';   /* keeps the creature visible on any tint */
    var creature = halo + '<g transform="translate(' + (50 - 18 * 1.6) + ',' + (32 - 18 * 1.6) + ') scale(1.6)">' + (GLYPHS[glyphName] || '') + '</g>';
    return '<svg class="lw-win" viewBox="0 0 88 64" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + bg + scenery + arrow + creature + '</svg>';
  }

  function lumenSVG() {
    return '<svg class="lw-lumen-svg" viewBox="0 0 54 52" width="36" height="34" aria-hidden="true">' +
      '<path d="M11 14 l6 8 l-9 1 z" fill="#9A7B5A" stroke="#6B5240" stroke-width="1.3"/><path d="M43 14 l-6 8 l9 1 z" fill="#9A7B5A" stroke="#6B5240" stroke-width="1.3"/>' +
      '<ellipse cx="27" cy="30" rx="16" ry="15" fill="#B89A72" stroke="#6B5240" stroke-width="2"/>' +
      '<circle cx="20" cy="27" r="6" fill="#FBF3E4" stroke="#6B5240" stroke-width="1.4"/><circle cx="34" cy="27" r="6" fill="#FBF3E4" stroke="#6B5240" stroke-width="1.4"/>' +
      '<g class="lw-eyes-open"><circle cx="20" cy="27" r="2.4" fill="#2B2B2B"/><circle cx="34" cy="27" r="2.4" fill="#2B2B2B"/></g>' +
      '<g class="lw-eyes-happy"><path d="M17 27 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M31 27 q3 -3 6 0" stroke="#2B2B2B" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M24 32 l3 4 l3 -4 z" fill="#E0A24A"/></svg>';
  }

  var PointOfViewActivity = {
    id: 'point-of-view-activity',
    strings: {
      title: { en: "Lumen's Lighthouse Windows", de: 'Lumens Leuchtturm' },
      instruction: { en: 'Lumen the owl needs help — whose window is the story told from?', de: 'Lies den Satz. Von ganz oben sieht alles winzig und weit weg aus. Von ganz unten sieht alles riesig und ganz nah aus. Tippe auf das Fenster, aus dem der Satz erzählt wird.' },
      q: { en: '“{line}” Who said it?', de: '„{line}“ Wer erzählt das?' }
    },

    init: function (api) {
      this._api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._lit = -1; this._charOrder = null;
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('lw-style')) return;
      var s = el('style'); s.id = 'lw-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.lw-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,640px);margin:0 auto;}',
        '.lw-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.lw-lumen{flex:0 0 auto;}',
        '.lw-event{flex:1 1 auto;text-align:center;font:700 .84rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.lw-line-msg{min-height:1.1em;text-align:center;font:700 .86rem/1.2 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.lw-line-msg.miss{color:#C2410C;}',
        '.lw-row{display:flex;justify-content:center;gap:10px;width:100%;max-width:min(96vw,560px);align-items:stretch;}',
        '.lw-cand{flex:1 1 0;min-width:0;max-width:150px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 5px 8px;border:3px solid #146B5E;border-radius:14px;background:#fff;cursor:pointer;min-height:44px;}',
        '.lw-cand.sel{box-shadow:0 0 0 3px #F2784B;}',
        '.lw-cand.dim{opacity:.4;}',
        '.lw-cand.lit{box-shadow:0 0 0 3px #F2C14E;background:#FFFBEF;}',
        '.lw-win{width:100%;max-width:138px;height:auto;display:block;}',
        '.lw-name{font:800 clamp(.78rem,3vw,1rem)/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;}',
        '.lw-pos{font:700 clamp(.62rem,2.4vw,.8rem)/1.1 Nunito,system-ui,sans-serif;color:#146B5E;text-align:center;}',
        '.lw-lumen-svg .lw-eyes-happy{display:none;}.lw-lumen[data-pose=happy] .lw-eyes-open{display:none;}.lw-lumen[data-pose=happy] .lw-eyes-happy{display:block;}',
        '.lw-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '@media (max-width:380px){.lw-root{gap:6px;}}',
        '.lcs-app:not(.lumen-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'point-of-view.who-told.rl-1-6';
      var tries = ['/mini-tools/point-of-view-activities.json', 'point-of-view-activities.json', '../mini tools/point-of-view-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._pool = (row && row.params && ((row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds)) || [];
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
      return {
        id: round.id, promptKey: 'q', promptArgs: { line: round.line }, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1; this._nonConf = {}; this._lit = -1;
      this._charOrder = this._shuffle((round.chars || []).map(function (_, i) { return i; }));   /* display order of the 3 windows */
      if (this._app) this._app.classList.remove('lumen-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'lw-root');

      var say = el('div', 'lw-say');
      var lu = el('div', 'lw-lumen'); lu.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); lu.innerHTML = lumenSVG();
      var ev = el('p', 'lw-event'); ev.textContent = round.event || '';
      say.append(lu, ev); root.appendChild(say); this._lumen = lu;

      this._renderRow(root);
      var msg = el('p', 'lw-line-msg'); msg.setAttribute('aria-live', 'polite'); root.appendChild(msg); this._msg = msg;
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _renderRow: function (root) {
      var self = this, r = this._round, tok = this._token, chars = r.chars || [];
      var row = el('div', 'lw-row');
      (this._charOrder || chars.map(function (_, i) { return i; })).forEach(function (ci) {
        var c = chars[ci];
        var b = el('button', 'lw-cand' + (self._nonConf[ci] ? ' dim' : '') + (self._lit === ci ? ' lit' : ''));
        b.type = 'button'; b.setAttribute('aria-label', c.name + ', ' + poslabel(c.pos)); b.setAttribute('data-ci', ci);
        var tw = el('div'); tw.style.width = '100%'; tw.style.display = 'flex'; tw.style.justifyContent = 'center'; tw.innerHTML = windowSVG(c.pos, c.glyph);
        var nm = el('div', 'lw-name'); nm.textContent = c.name;
        var ps = el('div', 'lw-pos'); ps.textContent = poslabel(c.pos);
        b.append(tw, nm, ps);
        b.addEventListener('click', function () {
          if (self._resolved || self._nonConf[ci] || self._token !== tok) return;
          if (Core.isAnswer(r, ci)) { self._lit = ci; self._resolve(); }
          else { self._nonConf[ci] = 1; self._nudge(r.view); }
        });
        row.appendChild(b);
      });
      root.appendChild(row);
    },

    _resolve: function () {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('lumen-resolved');
      this.render();
      if (this._msg) { this._msg.textContent = txt('win', { note: txt('winNote') }); this._msg.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt('winNote') }));
    },
    _nudge: function (view) {
      this._api.sound && this._api.sound(440);
      var key = view === 'high' ? 'nHigh' : 'nLow';
      this.render();
      if (this._msg) { this._msg.textContent = txt(key); this._msg.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'lw-sronly'); wrap.setAttribute('aria-live', 'polite');
      if (LANG === 'de') {
        var whoDe = (r.chars || []).map(function (c) { return c.name + ' ist ' + poslabel(c.pos); }).join(', ');
        wrap.innerHTML = '<p>' + (r.event || '') + ' Der Satz „' + r.line + '“ wird aus einem Fenster erzählt. ' + whoDe + '. Wer erzählt ihn?</p>';
        return wrap;
      }
      var who = (r.chars || []).map(function (c) { return c.name + ' is ' + poslabel(c.pos).toLowerCase(); }).join('; ');
      wrap.innerHTML = '<p>' + (r.event || '') + ' The line "' + r.line + '" is told from one window. ' + who + '. Who is telling it?</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.PointOfViewActivity = PointOfViewActivity;

}(typeof window !== 'undefined' ? window : this));
