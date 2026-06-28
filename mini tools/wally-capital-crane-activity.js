/* =====================================================================
   WALLY'S CAPITAL CRANE — ACTIVITY  (wally-capital-crane-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.2.a — capitalize holidays, places, product names. Wally the walrus
   runs a crane that lifts a little letter into a big CAPITAL; the child taps the
   special-name word that needs a capital letter. Validity DERIVED by
   capital-name-core.js (the token === the stored special name). answerType:'state'
   tap-a-chip + shell Check; chips render in SENTENCE ORDER (not shuffled). The
   selected chip shows its Capitalized form (the crane "lifts" it). Text + SVG art
   only — no image-library, no audio dependency. No timer/score/streak. 0 lines to
   any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CapitalNameCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', BLUE: '#3F7CAC' };

  function isWord(t) { return /[A-Za-z]/.test(t); }

  function walrusSVG() {
    return '<svg class="wcc-wal-svg" viewBox="0 0 100 100" role="img" aria-label="Wally the walrus">' +
      '<ellipse cx="50" cy="60" rx="26" ry="22" fill="#8FA9C0"/>' +                /* body */
      '<circle cx="50" cy="40" r="17" fill="#A7BED2"/>' +                          /* head */
      '<circle cx="44" cy="38" r="2.4" fill="#2A2A35"/><circle cx="56" cy="38" r="2.4" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="47" rx="9" ry="6" fill="#C9D6E3"/>' +                  /* muzzle */
      '<path d="M46 50 l-2 12 M54 50 l2 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' + /* tusks */
      '<path d="M28 74 q-4 8 2 12 M72 74 q4 8 -2 12" stroke="#8FA9C0" stroke-width="7" stroke-linecap="round" fill="none"/>' + /* flippers */
      '</svg>';
  }

  global.WallyCapitalCraneActivity = {
    id: 'wally-capital-crane-activity',

    strings: {
      title: { en: "Wally's Capital Crane" },
      instruction: { en: 'Tap the special name that needs a capital letter.' },
      prompt: { en: 'Tap the word that needs a capital letter.' },
      wallyIntro: { en: 'Special names get a BIG letter — lift it up with the crane!' },
      hintPick: { en: 'Holidays, places, and products are special names — they need a capital.' },
      hintWrong: { en: 'That one is fine. Find the special name (a holiday, place, or product).' },
      win: { en: 'Yes! That special name gets a big capital letter. 🏗️' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) { this.round = round; this.view = Core.childView(round); this.sel = null; },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'wcc-wrap'); var root = api.el('div', 'wcc-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'wcc-row');
      var wal = api.el('div', 'wcc-wal'); wal.innerHTML = walrusSVG(); row.appendChild(wal);
      var say = api.el('div', 'wcc-say'); say.textContent = api.t('wallyIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'wcc-sent');
      v.tokens.forEach(function (o) {
        if (!isWord(o.word)) { var pn = api.el('span', 'wcc-punct'); pn.textContent = o.word; sent.appendChild(pn); return; }
        var seld = self.sel === o.id;
        var b = api.el('button', 'wcc-chip' + (seld ? ' wcc-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = seld ? Core.capitalize(o.word) : o.word;
        b.addEventListener('click', function () { self._tap(o.id); });
        sent.appendChild(b);
      });
      root.appendChild(sent);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); this.render();
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
      fetch('/mini-tools/wally-capital-crane-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[wally-capital-crane] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.wcc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.wcc-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vw,16px);background:linear-gradient(180deg,#FBF3E4,#E7EEF4);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(90,120,150,.1);}'
        + '.wcc-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.wcc-wal{width:clamp(46px,10vw,60px);flex:0 0 auto;}.wcc-wal-svg{width:100%;height:auto;display:block;}'
        + '.wcc-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.wcc-sent{display:flex;flex-wrap:wrap;gap:6px 7px;justify-content:center;align-items:flex-end;background:#fff;border:2px dashed rgba(63,124,172,.3);border-radius:14px;padding:clamp(11px,2.8vw,18px);}'
        + '.wcc-chip{min-height:46px;padding:9px 13px;border-radius:11px;border:2px solid rgba(20,107,94,.22);background:#FCFBF7;color:' + C.INK + ';font:800 clamp(16px,4.2vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(120,120,90,.16);touch-action:manipulation;}'
        + '.wcc-chip.wcc-sel{border-color:' + C.CORAL + ';background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-7px);box-shadow:0 9px 0 rgba(242,120,75,.18);}'
        + '.wcc-chip:active{transform:translateY(1px);}'
        + '.wcc-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.wcc-punct{align-self:flex-end;font:800 clamp(16px,4.2vw,21px)/1 "Baloo 2",sans-serif;color:' + C.INK + ';padding-bottom:9px;}'
        + '@media (max-height:920px){.wcc-root{gap:clamp(7px,1.8vw,12px);}.wcc-wal{width:clamp(42px,8vw,52px);}.wcc-chip{min-height:44px;}}'
        + '@media (max-height:700px){.wcc-root{gap:8px;padding:12px;}.wcc-row{display:none;}.wcc-chip{min-height:42px;padding:8px 11px;font-size:18px;}.wcc-punct{font-size:18px;}}'
        + '@media (max-height:640px){.wcc-root{gap:7px;padding:10px;}.wcc-sent{padding:11px;}.wcc-chip{min-height:40px;font-size:17px;}.wcc-punct{font-size:17px;}}'
        + '@media (max-width:380px){.wcc-chip{font-size:17px;padding:8px 10px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-wally-capital-crane', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'wally-capital-crane.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
