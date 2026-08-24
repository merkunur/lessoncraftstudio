/* =====================================================================
   ZIGGY'S ODD ONE OUT — ACTIVITY  (ziggy-odd-one-out-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.a — sort words into categories. Ziggy the zebra: 4 pictures, 3 from
   one group + 1 outsider; tap the one that DOESN'T belong. Validity DERIVED by
   odd-one-out-core.js (the minority-category item). answerType:'state'
   tap-a-picture + shell Check; tap any picture to HEAR it. Per-pass reshuffle.
   Pictures from the image library; SVG char stub. No timer/score/streak. 0 lines
   to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.OddOneOutCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgUrl(t) { return '/image-library-webp/themes/' + t.themeDir + '/' + t.noun + '@2x.webp'; }
  function speak(word) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: word, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(word); u.rate = 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function zebraSVG() {
    return '<svg class="zoo-zeb-svg" viewBox="0 0 100 100" role="img" aria-label="Ziggy the zebra">' +
      '<ellipse cx="48" cy="60" rx="22" ry="19" fill="#FFFDF6"/>' +                 /* body */
      '<path d="M38 44 L42 78 M48 43 L50 80 M58 44 L56 78" stroke="#2A2A35" stroke-width="4" fill="none"/>' + /* stripes */
      '<circle cx="64" cy="40" r="12" fill="#FFFDF6"/>' +                           /* head */
      '<path d="M60 30 L62 40 M68 30 L66 40" stroke="#2A2A35" stroke-width="3" fill="none"/>' +
      '<path d="M58 30 q-2 -8 1 -10 q4 2 3 10 Z" fill="#2A2A35"/>' +                /* mane/ear */
      '<circle cx="66" cy="40" r="2.4" fill="#2A2A35"/>' +                          /* eye */
      '<ellipse cx="74" cy="44" rx="5" ry="4" fill="#3A3A45"/>' +                  /* muzzle */
      '</svg>';
  }

  global.ZiggyOddOneOutActivity = {
    id: 'ziggy-odd-one-out-activity',

    strings: {
      title: { en: "Ziggy's Odd One Out", de: 'Ziggys Was-passt-nicht?', fr: 'Ziggy et l’intrus', es: 'Ziggy y el intruso', pt: 'Ziggy e a Diferente', it: 'Ziggy e l’intruso' },
      prompt: { en: 'Which one does not belong?', de: 'Welches Bild passt nicht?', fr: 'Quelle image ne va pas avec les autres ?', es: '¿Qué imagen no pertenece?', pt: 'Qual imagem não pertence?', it: 'Quale non appartiene al gruppo?' },
      ziggyIntro: { en: 'Three of these go together — which one is different?', de: 'Hallo, ich bin Ziggy das Zebra! Drei gehören zusammen – eines ist anders.', fr: '🦓 Trois vont ensemble, une est différente. Trouve l’intrus !', es: '¡Hola, soy Ziggy la cebra! Tres van juntas y una es diferente.', pt: 'Oi! Sou a Ziggy, a zebra. Uma é diferente! 🦓', it: 'Ciao, sono Ziggy la zebra! Tre vanno insieme, una è diversa.' },
      theAsk: { en: "Tap the one that doesn't belong.", de: 'Tippe das Bild an, das nicht dazugehört.', fr: 'Touche l’image qui ne va pas avec les autres.', es: 'Toca la imagen que no pertenece.', pt: 'Toque na que não pertence.', it: 'Tocca quella che non va con le altre.' },
      hintPick: { en: 'Three are alike — tap the odd one out!', de: 'Schau dir alle vier an. Welche drei gehören zusammen?', fr: 'Regarde bien les quatre images. Lesquelles vont ensemble ?', es: 'Mira las cuatro. ¿Cuáles tres van juntas?', pt: 'Três são parecidas — toque na diferente!', it: 'Guarda tutte e quattro. Quali tre vanno insieme?' },
      hintWrong: { en: "Look again — which three make a group?", de: 'Fast! Drei passen zusammen – eines ist anders. Versuch es noch einmal.', fr: 'Presque ! Trois images vont ensemble, une seule est différente. Regarde encore.', es: '¡Casi! Tres van juntas y una es diferente. Inténtalo otra vez.', pt: 'Quase! Três vão juntas e uma é diferente. Tente de novo.', it: 'Quasi! Tre vanno insieme, una è diversa. Riprova.' },
      win: { en: 'Yes! That one is different. 🦓', de: 'Super gemacht – du hast es gefunden! 🦓', fr: 'Bravo ! Tu as trouvé l’intrus ! 🦓', es: '¡Muy bien, lo encontraste! 🦓', pt: 'Isso! Essa é a diferente. 🦓', it: 'Sì! Quella è l’intrusa. 🦓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      this._cards = shuffle(this.view.items.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'zoo-wrap'); var root = api.el('div', 'zoo-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this;

      var row = api.el('div', 'zoo-row');
      var zeb = api.el('div', 'zoo-zeb'); zeb.innerHTML = zebraSVG(); row.appendChild(zeb);
      var say = api.el('div', 'zoo-say'); say.textContent = api.t('ziggyIntro'); row.appendChild(say);
      root.appendChild(row);

      var ask = api.el('div', 'zoo-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'zoo-opts');
      this._cards.forEach(function (o) {
        var label = (self.round.items[o.id] && self.round.items[o.id].label) || o.noun;
        var b = api.el('button', 'zoo-tile zoo-opt' + (self.sel === o.id ? ' zoo-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', label);
        b.innerHTML = '<img class="zoo-img" src="' + imgUrl(o) + '" alt="' + esc(label) + '" onerror="this.style.visibility=\'hidden\'"><span class="zoo-word">' + esc(label) + '</span>';
        b.addEventListener('click', function () { self._tap(o.id, label); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { self._cards.forEach(function (o, i) { var lab = (self.round.items[o.id] && self.round.items[o.id].label) || o.noun; setTimeout(function () { speak(lab); }, i * 650); }); }, 320); }
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
      fetch('/mini-tools/ziggy-odd-one-out-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[ziggy-odd-one-out] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.zoo-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.zoo-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.zoo-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.zoo-zeb{width:clamp(42px,9vw,54px);flex:0 0 auto;}.zoo-zeb-svg{width:100%;height:auto;display:block;}'
        + '.zoo-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.zoo-ask{text-align:center;font:800 clamp(12px,3.1vw,15px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.zoo-opts{display:grid;grid-template-columns:repeat(2,auto);gap:clamp(8px,2.2vw,13px);justify-content:center;}'
        + '.zoo-tile{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:14px;border:2px solid rgba(20,107,94,.2);background:#fff;padding:clamp(6px,1.6vw,10px);cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.zoo-img{width:clamp(56px,16vw,84px);height:clamp(56px,16vw,84px);object-fit:contain;display:block;}'
        + '.zoo-word{font:700 clamp(12px,3.2vw,15px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.zoo-opt.zoo-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;transform:translateY(-2px);}'
        + '.zoo-opt:active{transform:translateY(1px);}'
        + '.zoo-tile:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.zoo-root{gap:clamp(4px,1.1vw,8px);}.zoo-zeb{width:clamp(40px,7vw,48px);}.zoo-img{width:clamp(50px,13vw,70px);height:clamp(50px,13vw,70px);}}'
        + '@media (max-height:700px){.zoo-root{gap:5px;padding:10px;}.zoo-zeb{width:clamp(38px,6.5vw,44px);}.zoo-img{width:clamp(46px,12vw,60px);height:clamp(46px,12vw,60px);}.zoo-word{font-size:13px;}.zoo-opts{gap:8px;}}'
        + '@media (max-height:640px){.zoo-root{gap:4px;padding:8px;}.zoo-row{display:none;}.zoo-img{width:clamp(44px,12vw,54px);height:clamp(44px,12vw,54px);}}'
        + '@media (max-width:380px){.zoo-img{width:50px;height:50px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-ziggy-odd-one-out', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'ziggy-odd-one-out.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
