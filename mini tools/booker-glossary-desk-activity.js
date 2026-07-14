/* =====================================================================
   BOOKER'S GLOSSARY DESK — ACTIVITY  (booker-glossary-desk-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.e — use guide words to find a word in a glossary. Booker the bear
   shows a glossary page with two guide words; the child taps the word that
   belongs on the page (alphabetically between them). Validity DERIVED by
   glossary-guide-core.js (the in-range word, computed by alphabetical compare;
   words shuffle so position is no cue). answerType:'state' tap-a-card + shell
   Check; a wrong tap gives a DIFFUSE nudge. Per-pass reshuffle. Text + SVG char
   stub (CA5 later). No timer/score/streak. 0 lines to any core + lcs-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.GlossaryGuideCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  /* The core grades by a locale-neutral alphabetical compare → German is a pure
     data port (umlaut/ß-free word set via roundsL10n.de). 0 core lines. */
  var LANG = 'en';

  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function bearSVG() {
    return '<svg class="bgd-bear-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Booker, der Bär' : LANG === 'fr' ? 'Booker l’ours' : LANG === 'es' ? 'Booker el oso' : 'Booker the bear') + '">' +
      '<circle cx="32" cy="32" r="9" fill="#8A6A4A"/><circle cx="68" cy="32" r="9" fill="#8A6A4A"/>' +   /* ears */
      '<circle cx="32" cy="32" r="4" fill="#B89A78"/><circle cx="68" cy="32" r="4" fill="#B89A78"/>' +
      '<circle cx="50" cy="52" r="27" fill="#9A7A56"/>' +                          /* head */
      '<ellipse cx="50" cy="60" rx="15" ry="12" fill="#D9C2A2"/>' +               /* muzzle */
      '<circle cx="41" cy="47" r="2.8" fill="#2A2A35"/><circle cx="59" cy="47" r="2.8" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="56" rx="4" ry="3" fill="#2A2A35"/>' +                 /* nose */
      '<path d="M50 59 v5 M50 64 q-4 3 -8 1 M50 64 q4 3 8 1" stroke="#6E5234" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.BookerGlossaryDeskActivity = {
    id: 'booker-glossary-desk-activity',

    strings: {
      title: { en: "Booker's Glossary Desk", de: 'Bookers Wörterbuch-Pult', fr: 'Le dictionnaire de Booker', es: 'El diccionario de Booker' },
      prompt: { en: 'Which word is on this page?', de: 'Tippe das Wort an, das im ABC zwischen den beiden Leitwörtern steht.', fr: 'Quel mot est sur cette page ?', es: 'Toca la palabra que va en orden alfabético entre las dos palabras guía.' },
      bookerIntro: { en: 'Use the guide words! Which word comes between them?', de: 'Hallo, ich bin Booker! Im Wörterbuch stehen alle Wörter in der ABC-Reihenfolge — so finde ich jedes Wort ganz schnell.', fr: 'Bonjour, je suis Booker ! Sers-toi des mots repères pour trouver le bon mot.', es: '¡Hola, soy Booker! En el diccionario todas las palabras están en orden alfabético, así encuentro cada palabra rapidísimo.' },
      theAsk: { en: 'Tap the word that belongs on this page.', de: 'Welches Wort steht im ABC zwischen den beiden Leitwörtern?', fr: 'Touche le mot qui se trouve sur cette page.', es: '¿Cuál palabra va en orden alfabético entre las dos palabras guía?' },
      hintPick: { en: 'Tap the word that comes between the guide words in ABC order!', de: 'Schau dir die beiden Leitwörter ganz oben an. Welches Wort kommt im ABC dazwischen?', fr: 'Touche le mot qui vient entre les deux mots repères dans l’ordre alphabétique !', es: 'Mira las dos palabras guía de hasta arriba. ¿Cuál palabra va en el ABC entre ellas?' },
      hintWrong: { en: "Not on this page — check the guide words again, letter by letter.", de: 'Fast! Vergleiche die Wörter Buchstabe für Buchstabe — erst der erste Buchstabe, dann der zweite. Welches liegt im ABC zwischen den Leitwörtern?', fr: 'Presque ! Compare les mots lettre par lettre — d’abord la première lettre, puis la deuxième.', es: '¡Casi! Compara las palabras letra por letra: primero la primera letra, luego la segunda. ¿Cuál queda entre las dos palabras guía?' },
      win: { en: 'Yes! That word is on this page. 📖', de: 'Ja, super! Dieses Wort steht im ABC genau zwischen den beiden Leitwörtern.', fr: 'Oui ! Ce mot est bien sur cette page. 📖', es: '¡Sí! Esa palabra va en orden alfabético justo entre las dos palabras guía.' }
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
      this._cards = shuffle(this.view.words.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'bgd-wrap'); var root = api.el('div', 'bgd-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'bgd-row');
      var bear = api.el('div', 'bgd-bear'); bear.innerHTML = bearSVG(); row.appendChild(bear);
      var say = api.el('div', 'bgd-say'); say.textContent = api.t('bookerIntro'); row.appendChild(say);
      root.appendChild(row);

      // glossary page header with guide words
      var page = api.el('div', 'bgd-page');
      var g1 = api.el('div', 'bgd-guide'); g1.textContent = v.g1; page.appendChild(g1);
      var dots = api.el('div', 'bgd-dots'); dots.textContent = '•••'; page.appendChild(dots);
      var g2 = api.el('div', 'bgd-guide'); g2.textContent = v.g2; page.appendChild(g2);
      root.appendChild(page);

      var ask = api.el('div', 'bgd-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var opts = api.el('div', 'bgd-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'bgd-opt' + (self.sel === o.id ? ' bgd-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.g1 + (LANG === 'de' ? ' bis ' : LANG === 'fr' ? ' à ' : LANG === 'es' ? ' a ' : ' to ') + v.g2); }, 320); }
    },

    _tap: function (id, text) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(540); speak(text); this.render();
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
      fetch('/mini-tools/booker-glossary-desk-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[booker-glossary-desk] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bgd-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.bgd-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#EDE6DA);border-radius:20px;padding:clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,60,.08);}'
        + '.bgd-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.bgd-bear{width:clamp(42px,9vw,54px);flex:0 0 auto;}.bgd-bear-svg{width:100%;height:auto;display:block;}'
        + '.bgd-say{background:#fff;border:2px solid rgba(160,120,60,.22);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        /* glossary page header */
        + '.bgd-page{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:10px clamp(12px,4vw,22px);box-shadow:inset 0 0 0 2px rgba(232,165,58,.18);}'
        + '.bgd-guide{font:800 clamp(20px,6vw,30px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';letter-spacing:.01em;}'
        + '.bgd-dots{flex:1;text-align:center;color:#C9B68A;font-size:clamp(12px,3vw,16px);letter-spacing:.3em;}'
        + '.bgd-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.bgd-opts{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,12px);justify-content:center;}'
        + '.bgd-opt{min-width:clamp(74px,22vw,108px);min-height:50px;padding:10px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#fff;color:' + C.INK + ';font:800 clamp(17px,4.6vw,22px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.bgd-opt.bgd-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.bgd-opt:active{transform:translateY(1px);}'
        + '.bgd-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.bgd-root{gap:clamp(4px,1.1vw,8px);}.bgd-bear{width:clamp(40px,7vw,48px);}.bgd-guide{font-size:clamp(18px,5vw,26px);}.bgd-opt{min-height:48px;}}'
        + '@media (max-height:700px){.bgd-root{gap:5px;padding:10px;}.bgd-bear{width:clamp(38px,6.5vw,44px);}.bgd-page{padding:8px 16px;}.bgd-guide{font-size:22px;}.bgd-opt{min-height:46px;padding:8px 14px;font-size:18px;}}'
        + '@media (max-height:640px){.bgd-root{gap:4px;padding:8px;}.bgd-row{display:none;}.bgd-page{padding:7px 14px;}.bgd-guide{font-size:20px;}.bgd-opt{min-height:44px;padding:7px 13px;font-size:17px;}}'
        + '@media (max-width:380px){.bgd-opt{min-width:64px;font-size:18px;}.bgd-guide{font-size:20px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-booker-glossary-desk', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'booker-glossary-desk.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
