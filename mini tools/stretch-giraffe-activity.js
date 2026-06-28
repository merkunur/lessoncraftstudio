/* =====================================================================
   STRETCH THE GIRAFFE — ACTIVITY  (stretch-giraffe-activity.js)
   ---------------------------------------------------------------------
   CCSS RF.1.2.a — distinguish long from short vowel sounds. Stretch the giraffe
   loves the long, stretched-out vowels; the child hears picture-words and taps
   the one with the long (or short) vowel sound. Validity DERIVED by vowel-
   length-core.js (the choice whose vowel === ask; the ask alternates so a
   prompt-ignoring reader fails). answerType:'state' tap-a-picture + shell Check;
   tap any picture to HEAR it (whole-word). Per-pass reshuffle. Pictures from the
   image library; SVG char stub. No timer/score/streak. 0 lines to any core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.VowelLengthCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function giraffeSVG() {
    return '<svg class="stg-gir-svg" viewBox="0 0 100 100" role="img" aria-label="Stretch the giraffe">' +
      '<rect x="44" y="40" width="12" height="44" rx="6" fill="#E8B24A"/>' +         /* long neck */
      '<circle cx="46" cy="80" r="3" fill="#C98A2E"/><circle cx="54" cy="68" r="3" fill="#C98A2E"/><circle cx="47" cy="56" r="3" fill="#C98A2E"/>' + /* spots */
      '<ellipse cx="58" cy="34" rx="13" ry="11" fill="#F2C661"/>' +                  /* head */
      '<path d="M50 26 q-2 -8 1 -10 q3 2 2 9 Z" fill="#C98A2E"/>' +                  /* ossicone */
      '<path d="M62 25 q2 -8 -1 -10 q-3 2 -2 9 Z" fill="#C98A2E"/>' +
      '<circle cx="60" cy="32" r="2.4" fill="#2A2A35"/>' +                           /* eye */
      '<ellipse cx="68" cy="38" rx="5" ry="4" fill="#E8B24A"/>' +                    /* snout */
      '</svg>';
  }

  global.StretchGiraffeActivity = {
    id: 'stretch-giraffe-activity',

    strings: {
      title: { en: "Stretch the Giraffe" },
      prompt: { en: 'Find the vowel sound!' },
      stretchIntro: { en: 'Tap to hear. A long vowel says its NAME — like a in cake.' },
      askLong: { en: 'Tap the word with a LONG vowel sound.' },
      askShort: { en: 'Tap the word with a SHORT vowel sound.' },
      hintPick: { en: 'Tap a picture, then tap Check!' },
      hintWrong: { en: "Not quite — say each word slowly and listen to the vowel." },
      win: { en: 'Yes! You heard the vowel. 🦒' }
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
      var wrap = api.el('div', 'stg-wrap'); var root = api.el('div', 'stg-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'stg-row');
      var gir = api.el('div', 'stg-gir'); gir.innerHTML = giraffeSVG(); row.appendChild(gir);
      var say = api.el('div', 'stg-say'); say.textContent = api.t('stretchIntro'); row.appendChild(say);
      root.appendChild(row);

      var ask = api.el('div', 'stg-ask' + (v.ask === 'long' ? ' stg-asklong' : ' stg-askshort'));
      ask.textContent = api.t(v.ask === 'long' ? 'askLong' : 'askShort'); root.appendChild(ask);

      var opts = api.el('div', 'stg-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'stg-tile stg-opt' + (self.sel === o.id ? ' stg-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.noun);
        b.innerHTML = '<img class="stg-img" src="' + imgUrl(o) + '" alt="' + esc(o.noun) + '" onerror="this.style.visibility=\'hidden\'"><span class="stg-word">' + esc(o.noun) + '</span>';
        b.addEventListener('click', function () { self._tap(o.id, o.noun); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { self._cards.forEach(function (o, i) { setTimeout(function () { speak(o.noun); }, i * 700); }); }, 320); }
    },

    _tap: function (id, noun) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(noun); this.render();
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
      fetch('/mini-tools/stretch-giraffe-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[stretch-giraffe] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.stg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.stg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(7px,1.8vw,12px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.stg-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.stg-gir{width:clamp(40px,8.5vw,52px);flex:0 0 auto;}.stg-gir-svg{width:100%;height:auto;display:block;}'
        + '.stg-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.stg-ask{text-align:center;font:800 clamp(13px,3.4vw,16px)/1.2 "Baloo 2",sans-serif;padding:7px 14px;border-radius:12px;}'
        + '.stg-asklong{color:' + C.T + ';background:#E6F2EC;}'
        + '.stg-askshort{color:' + C.CORAL2 + ';background:#FCEBE2;}'
        + '.stg-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,14px);justify-content:center;}'
        + '.stg-tile{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;padding:clamp(6px,1.6vw,10px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.stg-img{width:clamp(58px,17vw,90px);height:clamp(58px,17vw,90px);object-fit:contain;display:block;}'
        + '.stg-word{font:700 clamp(13px,3.4vw,16px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.stg-opt.stg-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;transform:translateY(-2px);}'
        + '.stg-opt:active{transform:translateY(1px);}'
        + '.stg-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.stg-root{gap:clamp(5px,1.3vw,9px);}.stg-gir{width:clamp(38px,7vw,46px);}.stg-img{width:clamp(52px,14vw,74px);height:clamp(52px,14vw,74px);}}'
        + '@media (max-height:700px){.stg-root{gap:6px;padding:10px;}.stg-gir{width:clamp(36px,6.5vw,42px);}.stg-img{width:clamp(48px,12vw,62px);height:clamp(48px,12vw,62px);}.stg-word{font-size:13px;}}'
        + '@media (max-height:640px){.stg-root{gap:5px;padding:8px;}.stg-row{display:none;}.stg-img{width:clamp(46px,12vw,56px);height:clamp(46px,12vw,56px);}}'
        + '@media (max-width:380px){.stg-img{width:52px;height:52px;}.stg-ask{font-size:13px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-stretch-giraffe', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'stretch-giraffe.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
