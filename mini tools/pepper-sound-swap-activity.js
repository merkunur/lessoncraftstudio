/* =====================================================================
   PEPPER'S SOUND SWAP — ACTIVITY  (pepper-sound-swap-activity.js)
   ---------------------------------------------------------------------
   CCSS RF.K.2.e — substitute a phoneme to make a new word. Pepper the parrot
   swaps one sound; the child hears the target picture-word, sees the new letter
   cue, and taps the picture of the new word. Validity DERIVED by phoneme-swap-
   core.js (the choice whose b/m/e matches the swapped target; the letter is a
   display cue, never the answer marker). answerType:'state' tap-a-picture +
   shell Check; tap any picture to HEAR it (LCSAudio, whole-word — NO isolated-
   phoneme audio). Per-pass reshuffle. Pictures from the image library; SVG char
   stub. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PhonemeSwapCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var POS_LABEL = { b: 'first', m: 'middle', e: 'last' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function parrotSVG() {
    return '<svg class="pss-bird-svg" viewBox="0 0 100 100" role="img" aria-label="Pepper the parrot">' +
      '<path d="M30 84 q-14 -10 -8 -34 q4 -16 18 -14 q-12 12 -6 30 q3 10 6 16 Z" fill="#E14B4B"/>' +    /* red tail/wing */
      '<ellipse cx="52" cy="58" rx="20" ry="22" fill="#2FA56A"/>' +                 /* green body */
      '<ellipse cx="52" cy="64" rx="12" ry="13" fill="#7BD3A6"/>' +                /* belly */
      '<circle cx="58" cy="36" r="13" fill="#F2C53D"/>' +                           /* yellow head */
      '<circle cx="61" cy="34" r="2.6" fill="#2A2A35"/>' +                          /* eye */
      '<path d="M68 36 q12 1 2 9 q-6 0 -8 -4 Z" fill="#F2784B"/>' +                 /* beak */
      '</svg>';
  }

  global.PepperSoundSwapActivity = {
    id: 'pepper-sound-swap-activity',

    strings: {
      title: { en: "Pepper's Sound Swap" },
      prompt: { en: 'Swap a sound to make a new word!' },
      pepperIntro: { en: 'Tap to hear. Swap the sound — what new word does Pepper make?' },
      cueFirst: { en: 'Change the FIRST sound to' },
      cueMiddle: { en: 'Change the MIDDLE sound to' },
      cueLast: { en: 'Change the LAST sound to' },
      theAsk: { en: 'Tap the picture of the new word.' },
      hintPick: { en: 'Tap a picture, then tap Check!' },
      hintWrong: { en: "Not quite — say the new word slowly and listen again." },
      win: { en: 'Yes! You made a new word. 🦜' }
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
      var wrap = api.el('div', 'pss-wrap'); var root = api.el('div', 'pss-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'pss-row');
      var bird = api.el('div', 'pss-bird'); bird.innerHTML = parrotSVG(); row.appendChild(bird);
      var say = api.el('div', 'pss-say'); say.textContent = api.t('pepperIntro'); row.appendChild(say);
      root.appendChild(row);

      // the swap line: [target picture] → [new letter]
      var swapRow = api.el('div', 'pss-swap');
      var tgt = api.el('button', 'pss-tile pss-target'); tgt.type = 'button'; tgt.setAttribute('aria-label', 'hear ' + v.target.noun);
      tgt.innerHTML = '<img class="pss-img" src="' + imgUrl(v.target) + '" alt="' + esc(v.target.noun) + '" onerror="this.style.visibility=\'hidden\'"><span class="pss-word">' + esc(v.target.noun) + '</span>';
      tgt.addEventListener('click', function () { speak(v.target.noun); });
      swapRow.appendChild(tgt);
      var arrow = api.el('div', 'pss-arrow'); arrow.textContent = '→'; swapRow.appendChild(arrow);
      var cue = api.el('div', 'pss-cue');
      var cueLab = api.el('div', 'pss-cuelab'); cueLab.textContent = api.t(v.swap.position === 'b' ? 'cueFirst' : v.swap.position === 'm' ? 'cueMiddle' : 'cueLast'); cue.appendChild(cueLab);
      var cueLetter = api.el('div', 'pss-cueletter'); cueLetter.textContent = v.swap.letter; cue.appendChild(cueLetter);
      swapRow.appendChild(cue);
      root.appendChild(swapRow);

      var ask = api.el('div', 'pss-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'pss-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'pss-tile pss-opt' + (self.sel === o.id ? ' pss-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.noun);
        b.innerHTML = '<img class="pss-img" src="' + imgUrl(o) + '" alt="' + esc(o.noun) + '" onerror="this.style.visibility=\'hidden\'"><span class="pss-word">' + esc(o.noun) + '</span>';
        b.addEventListener('click', function () { self._tap(o.id, o.noun); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.target.noun); }, 320); }
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
      fetch('/mini-tools/pepper-sound-swap-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[pepper-sound-swap] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.pss-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.pss-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.pss-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.pss-bird{width:clamp(42px,9vw,54px);flex:0 0 auto;}.pss-bird-svg{width:100%;height:auto;display:block;}'
        + '.pss-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.pss-swap{display:flex;align-items:center;justify-content:center;gap:clamp(6px,2vw,14px);}'
        + '.pss-tile{display:flex;flex-direction:column;align-items:center;gap:2px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;padding:clamp(5px,1.4vw,9px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.pss-img{width:clamp(50px,15vw,78px);height:clamp(50px,15vw,78px);object-fit:contain;display:block;}'
        + '.pss-word{font:700 clamp(12px,3.2vw,15px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.pss-target{border-color:' + C.GOLD + ';background:#FFFDF6;}'
        + '.pss-arrow{font-size:clamp(20px,6vw,30px);color:' + C.CORAL2 + ';font-weight:800;}'
        + '.pss-cue{display:flex;flex-direction:column;align-items:center;gap:3px;}'
        + '.pss-cuelab{font:800 clamp(10px,2.5vw,12px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';text-align:center;max-width:84px;}'
        + '.pss-cueletter{width:clamp(34px,9vw,46px);height:clamp(34px,9vw,46px);display:flex;align-items:center;justify-content:center;border-radius:11px;background:#FFE7A8;color:' + C.CORAL2 + ';font:800 clamp(22px,6vw,30px)/1 "Baloo 2",sans-serif;}'
        + '.pss-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.pss-opts{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.pss-opt.pss-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;transform:translateY(-2px);}'
        + '.pss-opt:active{transform:translateY(1px);}'
        + '.pss-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.pss-root{gap:clamp(4px,1.1vw,8px);}.pss-bird{width:clamp(40px,7vw,48px);}.pss-img{width:clamp(46px,12vw,64px);height:clamp(46px,12vw,64px);}}'
        + '@media (max-height:700px){.pss-root{gap:5px;padding:10px;}.pss-bird{width:clamp(38px,6.5vw,44px);}.pss-img{width:clamp(44px,11vw,56px);height:clamp(44px,11vw,56px);}.pss-word{font-size:12px;}}'
        + '@media (max-height:640px){.pss-root{gap:4px;padding:8px;}.pss-row{display:none;}.pss-img{width:clamp(42px,11vw,52px);height:clamp(42px,11vw,52px);}}'
        + '@media (max-width:380px){.pss-img{width:46px;height:46px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-pepper-sound-swap', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'pepper-sound-swap.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
