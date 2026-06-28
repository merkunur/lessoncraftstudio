/* =====================================================================
   BINGO'S WORD HUNT — ACTIVITY  (bingo-word-hunt-activity.js)
   ---------------------------------------------------------------------
   CCSS RF.K.3.d — distinguish similarly spelled words. Bingo the beagle: see a
   picture, READ the 3 near-words, tap the one that names the picture. Validity
   DERIVED by word-match-core.js (the choice whose word === the picture noun; the
   foils are vowel minimal pairs). answerType:'state' tap-a-word + shell Check;
   the picture has a 🔊 support, the WORD cards are silent (decoding them is the
   task). Per-pass reshuffle. Picture from the image library; SVG char stub. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.WordMatchCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function beagleSVG() {
    return '<svg class="bwh-dog-svg" viewBox="0 0 100 100" role="img" aria-label="Bingo the beagle">' +
      '<path d="M26 40 q-12 4 -8 26 q10 4 16 -6 Z" fill="#7A4A28"/>' +              /* long ear */
      '<path d="M74 40 q12 4 8 26 q-10 4 -16 -6 Z" fill="#7A4A28"/>' +             /* long ear */
      '<circle cx="50" cy="50" r="26" fill="#EBD6B0"/>' +                          /* head */
      '<path d="M30 36 q20 -10 40 0 q-4 -14 -20 -14 q-16 0 -20 14 Z" fill="#9A6233"/>' + /* brown cap */
      '<circle cx="42" cy="50" r="3" fill="#2A2A35"/><circle cx="58" cy="50" r="3" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="60" rx="9" ry="7" fill="#F4E6CB"/><ellipse cx="50" cy="58" rx="4" ry="3" fill="#2A2A35"/>' + /* snout+nose */
      '</svg>';
  }

  global.BingoWordHuntActivity = {
    id: 'bingo-word-hunt-activity',

    strings: {
      title: { en: "Bingo's Word Hunt" },
      prompt: { en: 'Which word names the picture?' },
      bingoIntro: { en: 'Sound out each word — which one names the picture?' },
      theAsk: { en: 'Read the words and tap the right one.' },
      hintPick: { en: 'Read each word slowly, then tap your pick!' },
      hintWrong: { en: "Look at the middle letter — sound it out again." },
      win: { en: 'Yes! You read it right. 🐾' }
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
      var wrap = api.el('div', 'bwh-wrap'); var root = api.el('div', 'bwh-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'bwh-row');
      var dog = api.el('div', 'bwh-dog'); dog.innerHTML = beagleSVG(); row.appendChild(dog);
      var say = api.el('div', 'bwh-say'); say.textContent = api.t('bingoIntro'); row.appendChild(say);
      root.appendChild(row);

      // the picture (with 🔊 support)
      var picWrap = api.el('div', 'bwh-picwrap');
      var pic = api.el('button', 'bwh-pic'); pic.type = 'button'; pic.setAttribute('aria-label', 'hear ' + v.target.noun);
      pic.innerHTML = '<img class="bwh-img" src="' + imgUrl(v.target) + '" alt="' + esc(v.target.noun) + '" onerror="this.style.visibility=\'hidden\'"><span class="bwh-spk">🔊</span>';
      pic.addEventListener('click', function () { speak(v.target.noun); });
      picWrap.appendChild(pic);
      root.appendChild(picWrap);

      var ask = api.el('div', 'bwh-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'bwh-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'bwh-opt' + (self.sel === o.id ? ' bwh-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
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
      fetch('/mini-tools/bingo-word-hunt-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bingo-word-hunt] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bwh-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.bwh-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.bwh-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.bwh-dog{width:clamp(42px,9vw,54px);flex:0 0 auto;}.bwh-dog-svg{width:100%;height:auto;display:block;}'
        + '.bwh-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.bwh-picwrap{display:flex;justify-content:center;}'
        + '.bwh-pic{position:relative;border-radius:16px;border:3px solid ' + C.GOLD + ';background:#FFFDF6;padding:clamp(6px,1.6vw,10px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.bwh-img{width:clamp(72px,22vw,120px);height:clamp(72px,22vw,120px);object-fit:contain;display:block;}'
        + '.bwh-spk{position:absolute;right:4px;bottom:4px;font-size:16px;background:#EAF2EE;border-radius:8px;padding:0 4px;}'
        + '.bwh-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.bwh-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,14px);justify-content:center;}'
        + '.bwh-opt{min-width:clamp(78px,24vw,112px);min-height:54px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#fff;color:' + C.INK + ';font:800 clamp(20px,5.4vw,26px)/1 "Baloo 2",sans-serif;letter-spacing:.04em;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.bwh-opt.bwh-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.bwh-opt:active{transform:translateY(1px);}'
        + '.bwh-pic:focus-visible,.bwh-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.bwh-root{gap:clamp(4px,1.1vw,8px);}.bwh-dog{width:clamp(40px,7vw,48px);}.bwh-img{width:clamp(66px,18vw,100px);height:clamp(66px,18vw,100px);}.bwh-opt{min-height:50px;}}'
        + '@media (max-height:700px){.bwh-root{gap:5px;padding:10px;}.bwh-dog{width:clamp(38px,6.5vw,44px);}.bwh-img{width:clamp(60px,16vw,84px);height:clamp(60px,16vw,84px);}.bwh-opt{min-height:48px;padding:9px 15px;font-size:22px;}}'
        + '@media (max-height:640px){.bwh-root{gap:4px;padding:8px;}.bwh-row{display:none;}.bwh-img{width:clamp(56px,15vw,72px);height:clamp(56px,15vw,72px);}.bwh-opt{min-height:46px;font-size:20px;}}'
        + '@media (max-width:380px){.bwh-opt{min-width:66px;font-size:20px;}.bwh-img{width:60px;height:60px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bingo-word-hunt', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bingo-word-hunt.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
