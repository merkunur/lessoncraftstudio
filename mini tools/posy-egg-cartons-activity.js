/* =====================================================================
   POSY'S EGG CARTONS — ACTIVITY  (posy-egg-cartons-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.A.1 — count to 100 by tens. Posy the hen packs eggs into cartons
   of ten; the child counts the full cartons BY TENS and taps the total.
   Validity DERIVED by count-tens-core.js (the card whose value === 10 * tens;
   foils = the by-ones miscount + one-ten-too-many). answerType:'state'
   tap-a-card + shell Check; cards shuffle for display. SVG/drawn art only — no
   image-library, no audio dependency. No timer/score/streak. 0 lines to any
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CountTensCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A', EGG: '#FFF4DC', SHELL: '#F2C879' };

  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function henSVG() {
    return '<svg class="pec-hen-svg" viewBox="0 0 100 100" role="img" aria-label="Posy the hen">' +
      '<ellipse cx="50" cy="62" rx="26" ry="24" fill="#F6E7C8"/>' +                /* body */
      '<circle cx="50" cy="34" r="15" fill="#FBF1DA"/>' +                          /* head */
      '<path d="M50 19 q4 -8 8 -2 q6 -1 2 6" fill="#E5453B"/>' +                   /* comb */
      '<circle cx="46" cy="33" r="2.3" fill="#2A2A35"/>' +                         /* eye */
      '<path d="M62 36 l9 3 l-9 3 z" fill="#E8A53A"/>' +                           /* beak */
      '<path d="M28 60 q-12 4 -4 16 q8 -2 10 -10z" fill="#EAD7AE"/>' +            /* wing */
      '<path d="M40 86 v6 M56 86 v6" stroke="#E8A53A" stroke-width="3" stroke-linecap="round"/>' + /* legs */
      '</svg>';
  }

  /* One carton = a lidded box holding 10 eggs (2 rows × 5) + a "10" tag. */
  function cartonHTML(n) {
    var eggs = '';
    for (var i = 0; i < 10; i++) eggs += '<span class="pec-egg"></span>';
    return '<div class="pec-carton" aria-label="a carton of ten eggs"><div class="pec-eggs">' + eggs + '</div><span class="pec-ten">10</span></div>';
  }

  global.PosyEggCartonsActivity = {
    id: 'posy-egg-cartons-activity',

    strings: {
      title: { en: "Posy's Egg Cartons" },
      instruction: { en: 'Count the full cartons by tens and tap the total.' },
      prompt: { en: 'Count by tens. How many eggs?' },
      posyIntro: { en: 'Each carton holds ten eggs — count them by tens!' },
      ask: { en: 'Tap the total number of eggs.' },
      hintPick: { en: 'Count by tens: 10, 20, 30… one carton at a time.' },
      hintWrong: { en: "Each carton is TEN, not one — count 10, 20, 30…" },
      win: { en: 'Yes! You counted by tens. 🥚' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'pec-wrap'); var root = api.el('div', 'pec-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'pec-row');
      var hen = api.el('div', 'pec-hen'); hen.innerHTML = henSVG(); row.appendChild(hen);
      var say = api.el('div', 'pec-say'); say.textContent = api.t('posyIntro'); row.appendChild(say);
      root.appendChild(row);

      var cartons = api.el('div', 'pec-cartons');
      for (var k = 0; k < v.tens; k++) { var c = api.el('div', 'pec-carton-slot'); c.innerHTML = cartonHTML(); cartons.appendChild(c); }
      root.appendChild(cartons);

      var ask = api.el('div', 'pec-ask'); ask.textContent = api.t('ask'); root.appendChild(ask);

      var opts = api.el('div', 'pec-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'pec-opt' + (self.sel === o.id ? ' pec-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', String(o.value));
        b.textContent = String(o.value);
        b.addEventListener('click', function () { self._tap(o.id); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); this.render();
    },

    isCorrect: function () { return Core.grade(this.round, this.sel); },
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
      fetch('/mini-tools/posy-egg-cartons-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[posy-egg-cartons] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pec-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pec-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#FBEFD7);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(180,150,80,.1);}'
        + '.pec-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.pec-hen{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.pec-hen-svg{width:100%;height:auto;display:block;}'
        + '.pec-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.pec-cartons{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;align-items:flex-start;width:100%;}'
        + '.pec-carton{display:inline-flex;flex-direction:column;align-items:center;gap:3px;background:#C9885A;border:2px solid #A86A3F;border-radius:8px;padding:4px 5px 3px;box-shadow:0 2px 0 rgba(120,80,40,.22);}'
        + '.pec-eggs{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;}'
        + '.pec-egg{width:clamp(7px,1.9vw,10px);height:clamp(9px,2.4vw,13px);background:radial-gradient(circle at 38% 32%,#fff,' + C.EGG + ' 60%,' + C.SHELL + ');border-radius:50% 50% 50% 50%/60% 60% 40% 40%;}'
        + '.pec-ten{font:800 clamp(9px,2.3vw,12px)/1 "Baloo 2",sans-serif;color:#fff;background:' + C.T + ';border-radius:7px;padding:1px 7px;}'
        + '.pec-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.pec-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.pec-opt{min-width:clamp(72px,22vw,104px);min-height:56px;padding:10px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.26);background:#fff;color:' + C.INK + ';font:800 clamp(22px,6vw,30px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.pec-opt.pec-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.pec-opt:active{transform:translateY(1px);}'
        + '.pec-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.pec-root{gap:clamp(5px,1.4vw,10px);}.pec-hen{width:clamp(40px,8vw,50px);}.pec-opt{min-height:52px;}}'
        + '@media (max-height:700px){.pec-root{gap:6px;padding:11px;}.pec-hen{width:clamp(38px,7vw,44px);}.pec-egg{width:8px;height:10px;}.pec-opt{min-height:48px;padding:8px 15px;font-size:24px;}}'
        + '@media (max-height:640px){.pec-root{gap:5px;padding:9px;}.pec-row{display:none;}.pec-egg{width:7px;height:9px;}.pec-opt{min-height:46px;font-size:22px;}}'
        + '@media (max-width:380px){.pec-opt{min-width:64px;font-size:22px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-posy-egg-cartons', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'posy-egg-cartons.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return Core.grade(round, tool.sel); },
        hintKey: function (tool) { return tool.sel != null ? 'hintWrong' : 'hintPick'; }
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
