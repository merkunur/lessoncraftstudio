/* =====================================================================
   SAGE'S ROOT GARDEN — ACTIVITY  (sage-root-garden-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.c — use a known root word as a clue. Sage the tortoise grows word
   families from a root; the child taps the word that GROWS from the root.
   Validity DERIVED by root-word-core.js (the choice whose word === the correct
   derivative; foils are similar-spelled words from a different root).
   answerType:'state' tap-a-word + shell Check; cards shuffle. Text + SVG char
   stub. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RootWordCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A', GREEN: '#2FA56A' };

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function tortoiseSVG() {
    return '<svg class="srg-tor-svg" viewBox="0 0 100 100" role="img" aria-label="Sage the tortoise">' +
      '<ellipse cx="50" cy="58" rx="28" ry="20" fill="#5E8C3A"/>' +                 /* shell */
      '<path d="M50 40 v36 M30 52 l40 12 M30 64 l40 -12" stroke="#3F6326" stroke-width="3" fill="none"/>' + /* shell pattern */
      '<ellipse cx="50" cy="58" rx="28" ry="20" fill="none" stroke="#3F6326" stroke-width="3"/>' +
      '<circle cx="80" cy="56" r="9" fill="#8AB36A"/>' +                            /* head */
      '<circle cx="83" cy="54" r="2.2" fill="#2A2A35"/>' +                          /* eye */
      '<path d="M26 74 l-4 6 M40 78 l-2 6" stroke="#8AB36A" stroke-width="5" stroke-linecap="round"/>' + /* legs */
      '</svg>';
  }

  global.SageRootGardenActivity = {
    id: 'sage-root-garden-activity',

    strings: {
      title: { en: "Sage's Root Garden" },
      prompt: { en: 'Which word grows from the root?' },
      sageIntro: { en: 'Big words grow from little root words — find the family!' },
      rootLab: { en: 'Root word:' },
      theAsk: { en: 'Tap the word that grows from this root.' },
      hintPick: { en: 'Find the root hiding inside one of the words!' },
      hintWrong: { en: "That one just looks alike — look for the root inside." },
      win: { en: 'Yes! That word grew from the root. 🌱' }
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
      var wrap = api.el('div', 'srg-wrap'); var root = api.el('div', 'srg-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'srg-row');
      var tor = api.el('div', 'srg-tor'); tor.innerHTML = tortoiseSVG(); row.appendChild(tor);
      var say = api.el('div', 'srg-say'); say.textContent = api.t('sageIntro'); row.appendChild(say);
      root.appendChild(row);

      var rootBox = api.el('button', 'srg-rootbox'); rootBox.type = 'button'; rootBox.setAttribute('aria-label', 'hear the root ' + v.root);
      var rl = api.el('span', 'srg-rootlab'); rl.textContent = api.t('rootLab'); rootBox.appendChild(rl);
      var rw = api.el('span', 'srg-rootword'); rw.textContent = v.root; rootBox.appendChild(rw);
      rootBox.addEventListener('click', function () { speak(v.root); });
      root.appendChild(rootBox);

      var ask = api.el('div', 'srg-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'srg-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'srg-opt' + (self.sel === o.id ? ' srg-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.root); }, 320); }
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
      fetch('/mini-tools/sage-root-garden-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[sage-root-garden] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.srg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.srg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.srg-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.srg-tor{width:clamp(46px,10vw,60px);flex:0 0 auto;}.srg-tor-svg{width:100%;height:auto;display:block;}'
        + '.srg-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.srg-rootbox{display:inline-flex;align-items:center;gap:8px;background:#E6F2EC;border:3px solid ' + C.GREEN + ';border-radius:14px;padding:8px 18px;cursor:pointer;box-shadow:0 2px 0 rgba(47,165,106,.2);touch-action:manipulation;}'
        + '.srg-rootlab{font:800 clamp(10px,2.5vw,12px)/1 "Baloo 2",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.srg-rootword{font:800 clamp(22px,6vw,30px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.srg-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.srg-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.srg-opt{min-width:clamp(82px,25vw,124px);min-height:52px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.26);background:#fff;color:' + C.INK + ';font:800 clamp(16px,4.4vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.srg-opt.srg-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.srg-opt:active{transform:translateY(1px);}'
        + '.srg-rootbox:focus-visible,.srg-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.srg-root{gap:clamp(5px,1.4vw,10px);}.srg-tor{width:clamp(42px,8vw,52px);}.srg-opt{min-height:50px;}}'
        + '@media (max-height:700px){.srg-root{gap:6px;padding:11px;}.srg-tor{width:clamp(40px,7vw,46px);}.srg-rootword{font-size:24px;}.srg-opt{min-height:48px;padding:9px 15px;font-size:18px;}}'
        + '@media (max-height:640px){.srg-root{gap:5px;padding:9px;}.srg-row{display:none;}.srg-opt{min-height:46px;font-size:17px;}}'
        + '@media (max-width:380px){.srg-opt{min-width:72px;font-size:17px;}.srg-rootword{font-size:24px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-sage-root-garden', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'sage-root-garden.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
