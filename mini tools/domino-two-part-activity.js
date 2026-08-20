/* =====================================================================
   DOMINO'S TWO-PART WORDS — ACTIVITY  (domino-two-part-activity.js)
   ---------------------------------------------------------------------
   CCSS RF.1.3.e — decode two-syllable words by breaking into syllables. Domino
   the penguin reads a printed word split into its two parts (rab·bit); the child
   blends the parts and taps the picture it names. Validity DERIVED by read-
   bisyllable-core.js (the choice whose noun === the printed word). answerType:
   'state' tap-a-picture + shell Check; tap any picture to HEAR it. Per-pass
   reshuffle. Pictures from the image library; SVG char stub. No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ReadBisyllableCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';  // set from api.lang in init(); drives TTS + de display overlay

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word, lang) {
    var lg = lang || (LANG === 'pt' ? 'pt-BR' : LANG);
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: lg, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.lang = lg; u.rate = 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function penguinSVG() {
    return '<svg class="dtp-pen-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'pt' ? 'Pingo, o pinguim' : 'Domino the penguin') + '">' +
      '<ellipse cx="50" cy="56" rx="24" ry="28" fill="#2A2A35"/>' +                 /* black body */
      '<ellipse cx="50" cy="60" rx="15" ry="22" fill="#FFFDF6"/>' +                /* white belly */
      '<circle cx="50" cy="32" r="15" fill="#2A2A35"/>' +                           /* head */
      '<circle cx="44" cy="31" r="2.6" fill="#fff"/><circle cx="56" cy="31" r="2.6" fill="#fff"/>' +
      '<path d="M46 36 L54 36 L50 42 Z" fill="#F2A03B"/>' +                         /* beak */
      '<path d="M26 56 q-8 6 -2 16 q6 -2 8 -10 Z" fill="#2A2A35"/>' +              /* wing */
      '<path d="M42 84 l-6 6 M58 84 l6 6" stroke="#F2A03B" stroke-width="4" stroke-linecap="round"/>' + /* feet */
      '</svg>';
  }

  global.DominoTwoPartActivity = {
    id: 'domino-two-part-activity',

    strings: {
      title: { en: "Domino's Two-Part Words", de: 'Silben lesen', es: 'Leer por sílabas', pt: 'Leia por sílabas' },
      prompt: { en: 'Read both parts — which picture?', de: 'Lies beide Silben – welches Bild?', es: 'Lee las dos sílabas. ¿Qué dibujo es?', pt: 'Leia as duas sílabas. Que desenho é?' },
      dominoIntro: { en: 'Read each part, then blend them — which picture is it?', de: 'Hallo, ich bin Pauli! Lies jede Silbe – dann tippe das passende Bild an.', es: '¡Hola, soy Pancho! Lee cada sílaba y toca el dibujo que le toca.', pt: 'Oi, eu sou o Pingo! Leia cada sílaba e toque no desenho.' },
      theAsk: { en: 'Tap the picture this word names.', de: 'Tippe das Bild an, das dieses Wort zeigt.', es: 'Toca el dibujo de esta palabra.', pt: 'Toque no desenho desta palavra.' },
      hintPick: { en: 'Say the first part, then the second — tap a picture!', de: 'Lies das Wort ruhig: erst die erste Silbe, dann die zweite – tippe ein Bild an.', es: 'Di la primera sílaba, luego la segunda. ¡Toca un dibujo!', pt: 'Diga a primeira sílaba, depois a segunda. Toque num desenho!' },
      hintWrong: { en: "Blend the two parts slowly and try once more.", de: 'Fast! Lies noch einmal beide Silben und hör genau hin.', es: 'Casi. Junta las dos sílabas otra vez, sin prisa.', pt: 'Quase! Junte as duas sílabas de novo, sem pressa.' },
      win: { en: 'Yes! You read both parts. 🐧', de: 'Super gelesen! Du hast jede Silbe erkannt. 🐧', es: '¡Muy bien! Leíste las dos sílabas. 🐧', pt: 'Muito bem! Você leu as duas sílabas. 🐧' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      // de (or any non-en): overlay the German display word/split + tile labels from the round.
      // Core still grades by choice.noun===round.word (round.word = EN image-key). 0-core.
      if (round.displayWord) this.view.word = round.displayWord;
      if (round.displaySyl) this.view.syl = round.displaySyl.slice();
      this.view.choices.forEach(function (c, i) { var s = (round.choices || [])[i]; if (s && s[LANG]) c[LANG] = s[LANG]; });
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'dtp-wrap'); var root = api.el('div', 'dtp-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'dtp-row');
      var pen = api.el('div', 'dtp-pen'); pen.innerHTML = penguinSVG(); row.appendChild(pen);
      var say = api.el('div', 'dtp-say'); say.textContent = api.t('dominoIntro'); row.appendChild(say);
      root.appendChild(row);

      // the split word
      var wordBox = api.el('button', 'dtp-word'); wordBox.type = 'button'; wordBox.setAttribute('aria-label', (LANG === 'de' ? 'anhören: ' : LANG === 'es' ? 'escuchar: ' : LANG === 'pt' ? 'ouvir: ' : 'hear ') + v.word);
      var inner = '';
      v.syl.forEach(function (s, i) {
        if (i > 0) inner += '<span class="dtp-dot">·</span>';
        inner += '<span class="dtp-syl">' + esc(s) + '</span>';
      });
      inner += '<span class="dtp-wspk">🔊</span>';
      wordBox.innerHTML = inner;
      wordBox.addEventListener('click', function () { speak(v.word); });
      root.appendChild(wordBox);

      var ask = api.el('div', 'dtp-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'dtp-opts');
      this._cards.forEach(function (o) {
        var lab = o[LANG] || o.noun;
        var b = api.el('button', 'dtp-tile dtp-opt' + (self.sel === o.id ? ' dtp-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', lab);
        b.innerHTML = '<img class="dtp-img" src="' + imgUrl(o) + '" alt="' + esc(lab) + '" onerror="this.style.visibility=\'hidden\'"><span class="dtp-word-lab">' + esc(lab) + '</span>';
        b.addEventListener('click', function () { self._tap(o.id, lab); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.word); }, 320); }
    },

    _tap: function (id, label) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(label); this.render();
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
      fetch('/mini-tools/domino-two-part-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rds = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[domino-two-part] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.dtp-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.dtp-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.dtp-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.dtp-pen{width:clamp(40px,8.5vw,52px);flex:0 0 auto;}.dtp-pen-svg{width:100%;height:auto;display:block;}'
        + '.dtp-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.dtp-word{display:inline-flex;align-items:center;gap:4px;background:#FFFDF6;border:3px solid ' + C.GOLD + ';border-radius:14px;padding:8px clamp(12px,4vw,22px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.dtp-syl{font:800 clamp(22px,6.5vw,34px)/1 "Baloo 2",sans-serif;color:' + C.INK + ';letter-spacing:.02em;}'
        + '.dtp-dot{font:800 clamp(20px,6vw,30px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.dtp-wspk{font-size:15px;margin-left:4px;background:#EAF2EE;border-radius:7px;padding:0 4px;}'
        + '.dtp-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.dtp-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,14px);justify-content:center;}'
        + '.dtp-tile{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;padding:clamp(6px,1.6vw,10px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.dtp-img{width:clamp(58px,17vw,90px);height:clamp(58px,17vw,90px);object-fit:contain;display:block;}'
        + '.dtp-word-lab{font:700 clamp(12px,3.2vw,15px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.dtp-opt.dtp-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;transform:translateY(-2px);}'
        + '.dtp-opt:active{transform:translateY(1px);}'
        + '.dtp-word:focus-visible,.dtp-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.dtp-root{gap:clamp(4px,1.1vw,8px);}.dtp-pen{width:clamp(38px,7vw,46px);}.dtp-img{width:clamp(52px,14vw,74px);height:clamp(52px,14vw,74px);}.dtp-syl{font-size:clamp(20px,6vw,28px);}}'
        + '@media (max-height:700px){.dtp-root{gap:6px;padding:10px;}.dtp-pen{width:clamp(36px,6.5vw,42px);}.dtp-img{width:clamp(48px,12vw,62px);height:clamp(48px,12vw,62px);}.dtp-word-lab{font-size:13px;}.dtp-syl{font-size:24px;}}'
        + '@media (max-height:640px){.dtp-root{gap:5px;padding:8px;}.dtp-row{display:none;}.dtp-img{width:clamp(46px,12vw,56px);height:clamp(46px,12vw,56px);}}'
        + '@media (max-width:380px){.dtp-img{width:52px;height:52px;}.dtp-syl{font-size:22px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-domino-two-part', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'domino-two-part.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
