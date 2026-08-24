/* =====================================================================
   ROARY'S ROAR METER — ACTIVITY  (roary-roar-meter-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.5.b — shades of meaning. Roary the lion: read 3 related words and tap
   the STRONGEST (or WEAKEST) one. Validity DERIVED by word-intensity-core.js (the
   max/min-rank word; the ask alternates so a prompt-ignoring reader fails; the
   middle word is never the answer). answerType:'state' tap-a-word + shell Check;
   cards shuffle. Text + SVG char stub. No timer/score/streak. 0 lines to any
   core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.WordIntensityCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };
  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function lionSVG() {
    return '<svg class="rrm-lion-svg" viewBox="0 0 100 100" role="img" aria-label="Roary the lion">' +
      '<circle cx="50" cy="52" r="32" fill="#C8862E"/>' +                           /* mane */
      '<circle cx="50" cy="52" r="22" fill="#F2C661"/>' +                          /* face */
      '<circle cx="42" cy="48" r="2.8" fill="#2A2A35"/><circle cx="58" cy="48" r="2.8" fill="#2A2A35"/>' +
      '<path d="M44 58 q6 6 12 0" stroke="#8A5A2C" stroke-width="2.4" fill="none" stroke-linecap="round"/>' + /* mouth */
      '<ellipse cx="50" cy="56" rx="4" ry="3" fill="#8A5A2C"/>' +                  /* nose */
      '</svg>';
  }

  global.RoaryRoarMeterActivity = {
    id: 'roary-roar-meter-activity',

    strings: {
      title: { en: "Roary's Roar Meter", de: 'Roarys Brüll-Meter', fr: 'Roary et le rugissomètre', es: 'El rugidómetro de Roary', pt: 'Roary e o Rugidômetro', it: 'Il ruggitometro di Roary' },
      prompt: { en: 'Find the strongest or weakest word!', de: 'Welches Wort ist am stärksten oder schwächsten?', fr: 'Quel mot est le plus fort ou le plus faible ?', es: '¿Cuál palabra es la más fuerte o la más suave?', pt: 'Ache a palavra mais forte ou mais fraca!', it: 'Trova la parola più forte o più debole!' },
      roaryIntro: { en: 'These words are alike — but how strong is each one?', de: 'Ich bin Roary! Diese Wörter sind sich ähnlich, aber manche brüllen lauter als andere. Hörst du den Unterschied?', fr: '🦁 Ces mots se ressemblent, mais l’un est plus fort !', es: '¡Soy Roary! Estas palabras se parecen, pero unas rugen más fuerte que otras. ¿Oyes la diferencia?', pt: 'Sou o Roary! Umas palavras rugem mais forte…', it: 'Sono Roary! Alcune parole ruggiscono più forte…' },
      askStrong: { en: 'Tap the STRONGEST word.', de: 'Tippe das STÄRKSTE Wort an.', fr: 'Touche le mot le plus fort.', es: 'Toca la palabra más fuerte.', pt: 'Toque na palavra MAIS FORTE.', it: 'Tocca la parola più FORTE.' },
      askWeak: { en: 'Tap the WEAKEST word.', de: 'Tippe das SCHWÄCHSTE Wort an.', fr: 'Touche le mot le plus faible.', es: 'Toca la palabra más suave.', pt: 'Toque na palavra MAIS FRACA.', it: 'Tocca la parola più DEBOLE.' },
      hintPick: { en: 'Read all three, then tap a word!', de: 'Lies alle drei Wörter. Welches passt zur Frage – das stärkste oder das schwächste?', fr: 'Lis bien les trois mots. Roary veut le plus fort ou le plus faible ?', es: 'Lee las tres palabras. ¿Cuál va con la pregunta: la más fuerte o la más suave?', pt: 'Leia as três e toque em uma palavra!', it: 'Leggi tutte e tre, poi tocca una parola!' },
      hintWrong: { en: "Not quite — think about how strong each word feels.", de: 'Fast! Achte genau darauf, ob Roary das stärkste oder das schwächste Wort sucht. Vergleiche die drei noch einmal.', fr: 'Presque ! Regarde encore : Roary cherche-t-il le mot le plus fort ou le plus faible ? Compare les trois.', es: '¡Casi! Fíjate bien si Roary busca la palabra más fuerte o la más suave. Compara las tres otra vez.', pt: 'Quase! Pense em como cada palavra soa forte.', it: 'Quasi! Pensa a quanto è forte ogni parola.' },
      win: { en: 'Roar! You found it. 🦁', de: 'Stark gebrüllt! Du hörst die feinen Unterschiede ganz genau. 🦁', fr: '🦁 Bravo ! Roary rugit de joie, tu as trouvé le bon mot !', es: '¡Bien rugido! Oyes muy bien las pequeñas diferencias. 🦁', pt: 'Que rugido! Você achou! 🦁', it: 'Che bel ruggito! Hai trovato la parola giusta! 🦁' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.words.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'rrm-wrap'); var root = api.el('div', 'rrm-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'rrm-row');
      var lion = api.el('div', 'rrm-lion'); lion.innerHTML = lionSVG(); row.appendChild(lion);
      var say = api.el('div', 'rrm-say'); say.textContent = api.t('roaryIntro'); row.appendChild(say);
      root.appendChild(row);

      var ask = api.el('div', 'rrm-ask' + (v.ask === 'strongest' ? ' rrm-strong' : ' rrm-weak'));
      ask.textContent = api.t(v.ask === 'strongest' ? 'askStrong' : 'askWeak'); root.appendChild(ask);

      var opts = api.el('div', 'rrm-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'rrm-opt' + (self.sel === o.id ? ' rrm-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.word);
        b.textContent = o.word;
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
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
      fetch('/mini-tools/roary-roar-meter-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[roary-roar-meter] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.rrm-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.rrm-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,13px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(9px,2.2vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.rrm-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.rrm-lion{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.rrm-lion-svg{width:100%;height:auto;display:block;}'
        + '.rrm-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.rrm-ask{text-align:center;font:800 clamp(13px,3.6vw,17px)/1.2 "Baloo 2",sans-serif;padding:8px 16px;border-radius:12px;}'
        + '.rrm-strong{color:' + C.CORAL2 + ';background:#FCEBE2;}'
        + '.rrm-weak{color:' + C.T + ';background:#E6F2EC;}'
        + '.rrm-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.rrm-opt{min-width:clamp(80px,24vw,120px);min-height:52px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.26);background:#fff;color:' + C.T + ';font:800 clamp(16px,4.4vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.rrm-opt.rrm-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.rrm-opt:active{transform:translateY(1px);}'
        + '.rrm-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.rrm-root{gap:clamp(6px,1.4vw,10px);}.rrm-lion{width:clamp(42px,8vw,50px);}.rrm-opt{min-height:50px;}}'
        + '@media (max-height:700px){.rrm-root{gap:6px;padding:11px;}.rrm-lion{width:clamp(40px,7vw,46px);}.rrm-opt{min-height:48px;padding:9px 15px;font-size:18px;}}'
        + '@media (max-height:640px){.rrm-root{gap:5px;padding:9px;}.rrm-row{display:none;}.rrm-opt{min-height:46px;font-size:17px;}}'
        + '@media (max-width:380px){.rrm-opt{min-width:70px;font-size:17px;}.rrm-ask{font-size:14px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-roary-roar-meter', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'roary-roar-meter.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
