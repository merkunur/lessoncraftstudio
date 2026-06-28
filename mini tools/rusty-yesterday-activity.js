/* =====================================================================
   RUSTY'S YESTERDAY MACHINE — ACTIVITY  (rusty-yesterday-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.d — irregular past-tense verbs. Rusty the robot turns "today" verbs
   into "yesterday" verbs; the child taps the irregular past (went). Validity
   DERIVED by irregular-past-core.js (the choice whose word === the correct past;
   foils = the base verb + the over-regularized -ed error). answerType:'state'
   tap-a-word + shell Check; cards shuffle. Text + SVG char stub. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.IrregularPastCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', STEEL: '#6E8FA6' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function robotSVG() {
    return '<svg class="ryd-bot-svg" viewBox="0 0 100 100" role="img" aria-label="Rusty the robot">' +
      '<rect x="30" y="34" width="40" height="36" rx="8" fill="#9FB6C6"/>' +        /* head */
      '<rect x="38" y="44" width="10" height="10" rx="2" fill="#2A2A35"/><rect x="52" y="44" width="10" height="10" rx="2" fill="#2A2A35"/>' + /* eyes */
      '<rect x="40" y="60" width="20" height="4" rx="2" fill="#4A6275"/>' +         /* mouth */
      '<line x1="50" y1="34" x2="50" y2="24" stroke="#6E8FA6" stroke-width="3"/><circle cx="50" cy="22" r="4" fill="#F2784B"/>' + /* antenna */
      '<rect x="36" y="70" width="28" height="14" rx="4" fill="#6E8FA6"/>' +        /* body */
      '</svg>';
  }

  global.RustyYesterdayActivity = {
    id: 'rusty-yesterday-activity',

    strings: {
      title: { en: "Rusty's Yesterday Machine" },
      prompt: { en: 'Which word is right for yesterday?' },
      rustyIntro: { en: 'My machine turns today-verbs into yesterday-verbs!' },
      todayTpl: { en: 'Today I {present}.' },
      yTpl: { en: 'Yesterday I …' },
      theAsk: { en: 'Tap the word that tells about yesterday.' },
      hintPick: { en: 'Some verbs change in a tricky way — tap your pick!' },
      hintWrong: { en: "Not quite — yesterday's word doesn't just add -ed." },
      win: { en: 'Beep boop — that is yesterday’s word! 🤖' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'ryd-wrap'); var root = api.el('div', 'ryd-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'ryd-row');
      var bot = api.el('div', 'ryd-bot'); bot.innerHTML = robotSVG(); row.appendChild(bot);
      var say = api.el('div', 'ryd-say'); say.textContent = api.t('rustyIntro'); row.appendChild(say);
      root.appendChild(row);

      var panel = api.el('button', 'ryd-panel'); panel.type = 'button'; panel.setAttribute('aria-label', 'hear the sentence');
      var today = api.el('div', 'ryd-today'); today.innerHTML = api.t('todayTpl').replace('{present}', '<b>' + esc(v.present) + '</b>'); panel.appendChild(today);
      var yest = api.el('div', 'ryd-yest'); yest.textContent = api.t('yTpl'); panel.appendChild(yest);
      panel.addEventListener('click', function () { speak('Today I ' + v.present + '. Yesterday I …'); });
      root.appendChild(panel);

      var ask = api.el('div', 'ryd-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'ryd-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'ryd-opt' + (self.sel === o.id ? ' ryd-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak('Today I ' + v.present + '. Yesterday I …'); }, 320); }
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(word); this.render();
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
      fetch('/mini-tools/rusty-yesterday-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[rusty-yesterday] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ryd-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.ryd-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#EAEEF2);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(110,143,166,.1);}'
        + '.ryd-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.ryd-bot{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.ryd-bot-svg{width:100%;height:auto;display:block;}'
        + '.ryd-say{background:#fff;border:2px solid rgba(110,143,166,.3);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.ryd-panel{display:flex;flex-direction:column;align-items:center;gap:3px;background:#FFFDF6;border:3px solid ' + C.STEEL + ';border-radius:14px;padding:9px 18px;cursor:pointer;box-shadow:0 2px 0 rgba(110,143,166,.18);touch-action:manipulation;}'
        + '.ryd-today{font:700 clamp(15px,4vw,19px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.ryd-today b{color:' + C.T + ';}'
        + '.ryd-yest{font:800 clamp(15px,4vw,19px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.ryd-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.ryd-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.ryd-opt{min-width:clamp(82px,25vw,124px);min-height:52px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.26);background:#fff;color:' + C.INK + ';font:800 clamp(16px,4.4vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.ryd-opt.ryd-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.ryd-opt:active{transform:translateY(1px);}'
        + '.ryd-panel:focus-visible,.ryd-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.ryd-root{gap:clamp(5px,1.4vw,10px);}.ryd-bot{width:clamp(42px,8vw,52px);}.ryd-opt{min-height:50px;}}'
        + '@media (max-height:700px){.ryd-root{gap:6px;padding:11px;}.ryd-bot{width:clamp(40px,7vw,46px);}.ryd-today,.ryd-yest{font-size:16px;}.ryd-opt{min-height:48px;padding:9px 15px;font-size:18px;}}'
        + '@media (max-height:640px){.ryd-root{gap:5px;padding:9px;}.ryd-row{display:none;}.ryd-opt{min-height:46px;font-size:17px;}}'
        + '@media (max-width:380px){.ryd-opt{min-width:72px;font-size:17px;}.ryd-today,.ryd-yest{font-size:16px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-rusty-yesterday', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'rusty-yesterday.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
