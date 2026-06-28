/* =====================================================================
   PESTO'S SOUP STALL — ACTIVITY SKIN  (shades-activity.js)
   ---------------------------------------------------------------------
   L.1.5.d · shades of meaning. The lcs-shell activity skin over
   shades-core.js. answerType:'state'. EN-ONLY pilot (slug.en only → 404
   non-EN by design).

   A TEXT meaning-game (mute-safe, SR-first): Pesto the parrot is picky about
   STRENGTH. All spice-words in a round are the SAME family — only the SHADE
   differs. The child reasons the shade. 4 cogs:
     • pick   — read the customer's degree-cue, hand Pesto the right-strength
                spice (the answer word is NOT in the cue → reason, don't copy).
     • order  — tap a less-rote ladder weakest → strongest.
     • bound  — "stronger than X but weaker than Y — which?".
     • manner — choose the right way-of-looking for the scene.

   UNIFORM word jars (NOT sized by rank — sizing would let `order` be solved
   by eye). A correct shade → resolve (shell Check appears, hidden until
   resolved via `.lcs-app.pesto-resolved`) + the broth-pot grows (abundance
   vessel, never a count). A wrong shade → a degree-DIRECTIONAL nudge ("too
   fierce — gentler!"), no advance, no red-X. Per-round `_token` guard.
   0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ShadesCore;

  var L = {
    en: {
      qpick: 'Hand Pesto the spice of the right strength.',
      qorder: 'Order the spices from weakest to strongest.',
      qbound: 'Which spice fits between?',
      qmanner: 'Which way of looking fits the story?',
      askOrderNext: 'Tap the weakest one left.',
      askBound: 'Stronger than {lo}, but weaker than {hi} — which one?',
      win: 'Just right! {note}',
      winPick: 'that is the perfect strength.',
      winOrder: 'weakest to strongest — perfect!',
      winBound: 'right in between!',
      winManner: 'that is just how it happened.',
      tooStrong: 'Whew — too fierce! Try a gentler one.',
      tooWeak: 'Needs more pep — try a stronger one.',
      orderTooStrong: "That one's too strong for now — find a weaker one first.",
      orderTooWeak: "That one's too weak now — you need a stronger one.",
      nManner: 'Look again — what does the story say happened?'
    }
  };
  function txt(k, a) {
    var lang = (global.LCS && global.LCS.i18n && global.LCS.i18n.current) || 'en';
    var s = (L[lang] || L.en)[k] || L.en[k] || k;
    return String(s).replace(/\{(\w+)\}/g, function (m, key) { return (a && key in a) ? a[key] : m; });
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---- Pesto the parrot — SVG PLACEHOLDER ([data-pose] idle|happy; CA5 later) ---- */
  function pestoSVG() {
    return '<svg class="sh-pesto-svg" viewBox="0 0 56 56" width="34" height="34" aria-hidden="true">' +
      '<ellipse cx="28" cy="34" rx="16" ry="17" fill="#2A9D8F"/>' +
      '<path d="M14 22 q-6 -10 4 -14 q8 0 8 12 z" fill="#1B7E6E"/>' +
      '<circle cx="28" cy="20" r="11" fill="#3CB4A4"/>' +
      '<path d="M22 12 q6 -8 12 0 q-2 4 -6 4 q-4 0 -6 -4z" fill="#F2784B"/>' +   /* crest */
      '<g class="sh-eyes-open"><circle cx="24" cy="20" r="2.4" fill="#2B2B2B"/><circle cx="33" cy="20" r="2.4" fill="#2B2B2B"/></g>' +
      '<g class="sh-eyes-happy"><path d="M21 20 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M30 20 q3 -4 6 0" stroke="#2B2B2B" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M27 23 l6 3 -6 3z" fill="#F2B705"/>' +   /* beak */
      '</svg>';
  }
  /* the broth-pot — a growing swirl per win (abundance, never a count) */
  function potSVG(n) {
    var cap2 = Math.min(n, 9), curls = '';
    for (var i = 0; i < cap2; i++) { var x = 10 + (i % 5) * 9, y = 12 - Math.floor(i / 5) * 6; curls += '<path d="M' + x + ' ' + y + ' q3 -4 0 -7" stroke="#C8A24a" stroke-width="1.4" fill="none" opacity=".7"/>'; }
    return '<svg class="sh-pot-svg" viewBox="0 0 62 40" width="40" height="26" aria-hidden="true">' +
      '<g>' + curls + '</g>' +
      '<path d="M8 18 h46 l-4 18 a4 4 0 0 1 -4 3 h-30 a4 4 0 0 1 -4 -3 z" fill="#146B5E"/>' +
      '<ellipse cx="31" cy="18" rx="23" ry="5" fill="#E9C46A"/></svg>';
  }

  var ShadesActivity = {
    id: 'shades-activity',
    strings: {
      title: { en: "Pesto's Soup Stall" },
      instruction: { en: 'Same-meaning words, different strength — give Pesto the right shade!' },
      qpick: { en: 'Hand Pesto the right-strength spice.' },
      qorder: { en: 'Weakest to strongest.' },
      qbound: { en: 'Which fits between?' },
      qmanner: { en: 'Which way of looking?' }
    },

    init: function (api) {
      this._api = api;
      this._sets = {}; this._pool = []; this._order = null; this._orderForPool = null; this._curPass = 0;
      this._finds = 0; this._round = null; this._resolved = false; this._token = 0;
      this._nonConf = {}; this._placed = [];
      this._app = api.stage.closest('.lcs-app');
      this._injectStyle();
      this._loadActivity();
    },

    _injectStyle: function () {
      if (document.getElementById('sh-style')) return;
      var s = el('style'); s.id = 'sh-style';
      s.textContent = [
        '.lcs-app.activity .lcs-stage{display:flex;flex-direction:column;justify-content:center;}',
        '.sh-root{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;max-width:min(96vw,560px);margin:0 auto;}',
        '.sh-say{display:flex;align-items:center;gap:8px;width:100%;}',
        '.sh-pesto,.sh-pot{flex:0 0 auto;}',
        '.sh-line{flex:1 1 auto;min-height:1.1em;text-align:center;font:700 .84rem/1.18 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;}',
        '.sh-line.miss{color:#C2410C;}',
        /* the customer cue / scene sentence */
        '.sh-cue{font:600 clamp(.95rem,4vw,1.18rem)/1.3 Nunito,system-ui,sans-serif;color:#0F4A40;text-align:center;background:#EAF5F1;border-radius:14px;padding:9px 16px;max-width:min(92vw,460px);}',
        '.sh-bound{font:800 clamp(1rem,4.4vw,1.3rem)/1.25 Baloo 2,Nunito,sans-serif;color:#0F4A40;text-align:center;}',
        '.sh-bound b{color:#F2784B;}',
        /* placed strip (order) */
        '.sh-placed{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;min-height:6px;}',
        '.sh-chip{font:800 clamp(.95rem,4vw,1.3rem)/1 Baloo 2,Nunito,sans-serif;color:#0F4A40;background:#EAF5F1;border:2px solid #146B5E;border-radius:11px;padding:6px 12px;}',
        '.sh-arrow{align-self:center;color:#9a8a66;font-weight:800;}',
        /* word jars — UNIFORM size (NOT rank-sized; sizing would solve order by eye) */
        '.sh-jars{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:min(94vw,480px);}',
        '.sh-cand{min-width:clamp(82px,22vw,128px);min-height:clamp(50px,9vw,66px);border:2.8px solid #146B5E;border-radius:14px;background:#fff;color:#0F4A40;cursor:pointer;font:800 clamp(1.05rem,4.4vw,1.5rem)/1 Baloo 2,Nunito,sans-serif;padding:8px 14px;display:flex;align-items:center;justify-content:center;}',
        '.sh-cand.dim{opacity:.35;}',
        '.sh-cand.gone{opacity:.18;pointer-events:none;}',
        '.sh-sronly{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}',
        '.sh-pesto-svg .sh-eyes-happy{display:none;}.sh-pesto[data-pose=happy] .sh-eyes-open{display:none;}.sh-pesto[data-pose=happy] .sh-eyes-happy{display:block;}',
        '@media (max-width:380px){.sh-root{gap:6px;}.sh-cue{font-size:.92rem;padding:7px 12px;}.sh-cand{min-width:74px;min-height:48px;font-size:1.02rem;}.sh-line{font-size:.78rem;}}',
        '.lcs-app:not(.pesto-resolved) .lcs-activity-check{display:none !important;}'
      ].join('');
      document.head.appendChild(s);
    },

    _loadActivity: function () {
      var self = this;
      var params = new URLSearchParams(global.location ? global.location.search : '');
      var id = params.get('activity') || 'shades.pick.l-1-5-d';
      var tries = ['/mini-tools/shades-activities.json', 'shades-activities.json', '../mini tools/shades-activities.json'];
      (function attempt(i) {
        if (i >= tries.length) return;
        fetch(tries[i]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === id; }) || rows[0];
            self._activityRow = row; self._sets = (row && row.params && row.params.sets) || {};
            var raw = (row && row.params && row.params.rounds) || [];
            self._pool = raw.map(function (rr) { return Core.resolve(rr, self._sets); });
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
      var pk = { pick: 'qpick', order: 'qorder', bound: 'qbound', manner: 'qmanner' }[round.cog] || 'qpick';
      return {
        id: round.id, promptKey: pk, promptArgs: {}, answerType: 'state', round: round,
        setup: function (tool) { tool._beginRound(round); },
        check: function (tool) { return tool._resolved === true; }
      };
    },

    _beginRound: function (round) {
      this._round = round; this._resolved = false; this._token = (this._token || 0) + 1;
      this._nonConf = {}; this._placed = [];
      this._displayOrder = this._shuffle(Core.words(round).map(function (_, i) { return i; }));
      if (this._app) this._app.classList.remove('pesto-resolved');
    },

    render: function () {
      var api = this._api; if (!api) return;
      var stage = api.stage; stage.innerHTML = '';
      var round = this._round; if (!round) return;
      var root = el('div', 'sh-root');

      var say = el('div', 'sh-say');
      var pe = el('div', 'sh-pesto'); pe.setAttribute('data-pose', this._resolved ? 'happy' : 'idle'); pe.innerHTML = pestoSVG();
      var line = el('p', 'sh-line'); line.setAttribute('aria-live', 'polite');
      var pot = el('div', 'sh-pot'); pot.innerHTML = potSVG(this._finds);
      say.append(pe, line, pot); root.appendChild(say); this._line = line; this._pesto = pe;

      if (!this._resolved) {
        ({ pick: '_rPick', order: '_rOrder', bound: '_rBound', manner: '_rManner' }[round.cog] &&
          this[{ pick: '_rPick', order: '_rOrder', bound: '_rBound', manner: '_rManner' }[round.cog]](root));
        if (this._line && !this._line.textContent) this._line.textContent = this._defaultLine();
      }
      root.appendChild(this._srMirror());
      stage.appendChild(root);
    },

    _defaultLine: function () {
      var r = this._round;
      if (r.cog === 'order') return txt('askOrderNext');
      if (r.cog === 'bound') { var lo = Core.wordById(r, r.loId), hi = Core.wordById(r, r.hiId); return txt('askBound', { lo: lo && lo.text, hi: hi && hi.text }); }
      return '';
    },

    /* a uniform word-jar button */
    _jar: function (round, wi, onPick, gone) {
      var self = this, w = Core.words(round)[wi], tok = this._token;
      var b = el('button', 'sh-cand' + (this._nonConf[wi] ? ' dim' : '') + (gone ? ' gone' : ''));
      b.type = 'button'; b.textContent = w.text; b.setAttribute('aria-label', w.text);
      b.addEventListener('click', function () { if (!self._resolved && !self._nonConf[wi] && !gone && self._token === tok) onPick(wi, w); });
      return b;
    },

    _rPick: function (root) {
      var self = this, r = this._round;
      var cue = el('p', 'sh-cue'); cue.textContent = r.sentence; root.appendChild(cue);
      var jars = el('div', 'sh-jars');
      this._displayOrder.forEach(function (wi) {
        jars.appendChild(self._jar(r, wi, function (i, w) {
          if (Core.isAnswer(r, i)) self._resolve('winPick');
          else { self._nonConf[i] = 1; self._nudge(w.rank > r.requiredRank ? 'tooStrong' : 'tooWeak'); }
        }));
      });
      root.appendChild(jars);
    },

    _rManner: function (root) {
      var self = this, r = this._round;
      var cue = el('p', 'sh-cue'); cue.textContent = r.sentence; root.appendChild(cue);
      var jars = el('div', 'sh-jars');
      this._displayOrder.forEach(function (wi) {
        jars.appendChild(self._jar(r, wi, function (i) {
          if (Core.isAnswer(r, i)) self._resolve('winManner');
          else { self._nonConf[i] = 1; self._nudge('nManner'); }
        }));
      });
      root.appendChild(jars);
    },

    _rBound: function (root) {
      var self = this, r = this._round;
      var lo = Core.wordById(r, r.loId), hi = Core.wordById(r, r.hiId);
      var p = el('div', 'sh-bound'); p.innerHTML = 'Stronger than <b>' + esc(lo.text) + '</b>, weaker than <b>' + esc(hi.text) + '</b>'; root.appendChild(p);
      var jars = el('div', 'sh-jars');
      this._displayOrder.forEach(function (wi) {
        jars.appendChild(self._jar(r, wi, function (i, w) {
          if (Core.isAnswer(r, i)) self._resolve('winBound');
          else { self._nonConf[i] = 1; self._nudge(w.rank <= lo.rank ? 'tooWeak' : 'tooStrong'); }
        }));
      });
      root.appendChild(jars);
    },

    _rOrder: function (root) {
      var self = this, r = this._round, seq = Core.orderOracle(r);
      /* placed strip */
      var placed = el('div', 'sh-placed');
      this._placed.forEach(function (id, k) {
        if (k > 0) { var a = el('span', 'sh-arrow'); a.textContent = '→'; placed.appendChild(a); }
        var c = el('span', 'sh-chip'); c.textContent = Core.wordById(r, id).text; placed.appendChild(c);
      });
      root.appendChild(placed);
      /* the bank (uniform jars; placed ones greyed gone) */
      var jars = el('div', 'sh-jars');
      this._displayOrder.forEach(function (wi) {
        var w = Core.words(r)[wi], gone = self._placed.indexOf(w.id) >= 0;
        jars.appendChild(self._jar(r, wi, function (i, ww) {
          var expectId = seq[self._placed.length];
          if (ww.id === expectId) {
            self._placed.push(ww.id);
            if (self._placed.length === seq.length) { self._resolve('winOrder'); return; }
            self.render(); if (self._line) self._line.textContent = txt('askOrderNext');
          } else {
            var expectRank = Core.wordById(r, expectId).rank;
            self._nudge(ww.rank > expectRank ? 'orderTooStrong' : 'orderTooWeak');
          }
        }, gone));
      });
      root.appendChild(jars);
    },

    _resolve: function (winKey) {
      this._resolved = true; this._finds += 1;
      if (this._app) this._app.classList.add('pesto-resolved');
      this.render();
      if (this._line) { this._line.textContent = txt('win', { note: txt(winKey) }); this._line.classList.remove('miss'); }
      this._api.sound && this._api.sound(880);
      this._api.announce && this._api.announce(txt('win', { note: txt(winKey) }));
    },
    _nudge: function (key) {
      this._api.sound && this._api.sound(440);
      this.render();
      if (this._line) { this._line.textContent = txt(key); this._line.classList.add('miss'); }
      this._api.announce && this._api.announce(txt(key));
    },

    _srMirror: function () {
      var r = this._round, wrap = el('div', 'sh-sronly'); wrap.setAttribute('aria-live', 'polite');
      var fam = Core.words(r).map(function (w) { return w.text; }).join(', ');
      var msg;
      if (r.cog === 'pick') msg = r.sentence + ' Choose the right strength from: ' + fam + '.';
      else if (r.cog === 'order') msg = 'Put these in order from weakest to strongest: ' + fam + '.';
      else if (r.cog === 'bound') { var lo = Core.wordById(r, r.loId), hi = Core.wordById(r, r.hiId); msg = 'Which is stronger than ' + lo.text + ' but weaker than ' + hi.text + '? Choices: ' + fam + '.'; }
      else msg = r.sentence + ' Choose the way of looking: ' + fam + '.';
      wrap.innerHTML = '<p>' + esc(msg) + '</p>';
      return wrap;
    },

    reset: function () { if (this._round) { this._beginRound(this._round); this.render(); } }
  };

  global.ShadesActivity = ShadesActivity;

}(typeof window !== 'undefined' ? window : this));
