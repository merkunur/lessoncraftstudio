/* =====================================================================
   FERN'S CLUE GARDEN — ACTIVITY  (fern-clue-garden-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.a — use sentence context as a clue to a word's meaning. Fern the
   fawn reads the words AROUND a tricky word; the child taps the meaning the
   sentence points to. Validity DERIVED by context-clue-core.js (the 'correct'
   card; the obvious foil is the word's no-context sense; cards shuffle so
   position is no cue). answerType:'state' tap-a-card + shell Check; a wrong tap
   gives a DIFFUSE nudge. Per-pass reshuffle. Text + SVG char stub (CA5 later).
   No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ContextClueCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOLD: '#E8A53A' };

  /* The core grades by choices[id].kind === 'correct' (locale-neutral) → German
     is a pure data port (German Teekessel rounds via roundsL10n.de). 0 core. */
  var LANG = 'en';

  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function fawnSVG() {
    return '<svg class="fcg-fawn-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Fern le faon' : LANG === 'de' ? 'Fern, das Rehkitz' : LANG === 'es' ? 'Fern el cervatillo' : LANG === 'pt' ? 'Fern, o cervo' : 'Fern the fawn') + '">' +
      '<ellipse cx="50" cy="62" rx="22" ry="19" fill="#C98A4B"/>' +                /* body */
      '<ellipse cx="50" cy="68" rx="13" ry="11" fill="#EACBA0"/>' +               /* belly */
      '<circle cx="58" cy="42" r="11" fill="#C98A4B"/>' +                          /* head */
      '<path d="M52 33 q-4 -12 0 -16 q5 3 4 15 Z" fill="#B0763C"/>' +             /* ear */
      '<path d="M64 33 q4 -12 0 -16 q-5 3 -4 15 Z" fill="#B0763C"/>' +            /* ear */
      '<path d="M55 31 q-2 -9 1 -13 M61 31 q2 -9 -1 -13" stroke="#8A5A2C" stroke-width="2" fill="none" stroke-linecap="round"/>' + /* antler nubs */
      '<circle cx="61" cy="41" r="2.4" fill="#2A2A35"/>' +                         /* eye */
      '<path d="M67 44 l5 1 l-5 2 Z" fill="#6E4423"/>' +                           /* nose */
      '<circle cx="40" cy="58" r="3" fill="#EAD3AE"/><circle cx="48" cy="52" r="2.4" fill="#EAD3AE"/>' + /* spots */
      '</svg>';
  }

  global.FernClueGardenActivity = {
    id: 'fern-clue-garden-activity',

    strings: {
      title: { en: "Fern's Clue Garden", de: 'Ferns Rätselgarten', fr: 'Le jardin d’indices de Fern', es: 'El jardín de acertijos de Fern', pt: 'O jardim de pistas da Fern' },
      prompt: { en: 'What does the word mean here?', de: 'Was bedeutet das Wort hier?', fr: 'Que veut dire le mot ici ?', es: '¿Qué significa la palabra aquí?', pt: 'O que a palavra quer dizer aqui?' },
      fernIntro: { en: 'Read the whole sentence — the clues are around the word!', de: 'Hallo, ich bin Fern! Lies den ganzen Satz – er verrät dir wie ein kleines Rätsel, welche Bedeutung gemeint ist.', fr: 'Lis toute la phrase — les indices sont autour du mot !', es: '¡Hola, soy Fern! Lee toda la oración: es como un pequeño acertijo que te dice cuál es el significado correcto.', pt: 'Leia a frase toda — as pistas estão em volta da palavra!' },
      theAsk: { en: 'What does "{word}" mean in this sentence?', de: 'Was bedeutet „{word}“ in diesem Satz?', fr: 'Que veut dire « {word} » dans cette phrase ?', es: '¿Qué significa «{word}» en esta oración?', pt: 'O que “{word}” quer dizer nesta frase?' },
      hintPick: { en: 'Tap the meaning that fits the sentence!', de: 'Lies den Satz ganz genau und tippe dann die passende Bedeutung an.', fr: 'Tape la définition qui va avec la phrase !', es: 'Lee la oración con calma y toca el significado que le queda bien.', pt: 'Toque no sentido que combina com a frase!' },
      hintWrong: { en: "That can be a meaning, but not here — read the sentence again.", de: 'Das kann das Wort zwar auch bedeuten – aber hier nicht. Lies den Satz noch einmal in Ruhe.', fr: 'Ce mot peut vouloir dire ça, mais pas ici — relis la phrase.', es: 'Esa palabra también puede significar eso… pero aquí no. Vuelve a leer la oración sin prisa.', pt: 'Essa palavra também pode ter esse sentido… mas aqui não. Leia a frase de novo.' },
      win: { en: 'Yes! The sentence shows what it means. 🌿', de: 'Ja! Genau diese Bedeutung zeigt der Satz.', fr: 'Oui ! La phrase montre ce que le mot veut dire. 🌿', es: '¡Sí! Ese es el significado que muestra la oración.', pt: 'Isso! A frase mostra o sentido certo. 🌿' }
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
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'fcg-wrap'); var root = api.el('div', 'fcg-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'fcg-row');
      var fawn = api.el('div', 'fcg-fawn'); fawn.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); fawn.innerHTML = fawnSVG(); row.appendChild(fawn);
      var say = api.el('div', 'fcg-say'); say.textContent = api.t('fernIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'fcg-sent');
      var txt = api.el('span', 'fcg-senttxt'); txt.innerHTML = highlight(v.sentence, v.word); sent.appendChild(txt);
      var sp = api.el('button', 'fcg-spk'); sp.type = 'button'; sp.setAttribute('aria-label', (LANG === 'fr' ? 'écouter la phrase' : LANG === 'de' ? 'Satz anhören' : LANG === 'es' ? 'escuchar la oración' : LANG === 'pt' ? 'ouvir a frase' : 'hear the sentence')); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(v.sentence); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'fcg-ask'); ask.textContent = api.t('theAsk').replace('{word}', v.word); root.appendChild(ask);

      var opts = api.el('div', 'fcg-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'fcg-opt' + (self.sel === o.id ? ' fcg-sel' : '')); b.type = 'button'; b.setAttribute('data-id', o.id);
        b.textContent = o.text; b.setAttribute('aria-label', o.text);
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(v.sentence); }, 320); }
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
      fetch('/mini-tools/fern-clue-garden-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[fern-clue-garden] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.fcg-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.fcg-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#EAF0E2);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,140,60,.08);}'
        + '.fcg-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.fcg-fawn{width:clamp(40px,8.5vw,52px);flex:0 0 auto;}.fcg-fawn-svg{width:100%;height:auto;display:block;}'
        + '.fcg-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.fcg-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:8px 12px;}'
        + '.fcg-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.5vw,17px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.fcg-mark{background:#FFE7A8;border-radius:5px;padding:0 3px;font-weight:800;color:' + C.CORAL2 + ';}'
        + '.fcg-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.fcg-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.fcg-opts{display:flex;flex-direction:column;gap:clamp(4px,1vw,6px);}'
        + '.fcg-opt{text-align:left;min-height:46px;padding:8px 13px;border-radius:13px;border:2px solid rgba(20,107,94,.22);background:#fff;color:' + C.INK + ';font:700 clamp(13px,3.2vw,15px)/1.25 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.fcg-opt.fcg-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.fcg-opt:active{transform:translateY(1px);}'
        + '.fcg-spk:focus-visible,.fcg-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.fcg-root{gap:clamp(3px,0.9vw,6px);}.fcg-fawn{width:clamp(38px,7vw,46px);}.fcg-opt{min-height:44px;padding:7px 12px;}}'
        + '@media (max-height:700px){.fcg-root{gap:4px;padding:9px;}.fcg-fawn{width:clamp(36px,6.5vw,42px);}.fcg-sent{padding:6px 11px;}.fcg-senttxt{font-size:14px;}.fcg-opt{min-height:44px;padding:6px 11px;font-size:13px;}}'
        + '@media (max-height:640px){.fcg-root{gap:3px;padding:7px;}.fcg-row{display:none;}.fcg-sent{padding:5px 10px;}.fcg-senttxt{font-size:13px;}.fcg-opt{min-height:44px;padding:5px 10px;font-size:12.5px;line-height:1.18;}}'
        + '@media (max-width:380px){.fcg-senttxt{font-size:13.5px;}.fcg-opt{font-size:13px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-fern-clue-garden', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* highlight the target word inside the sentence (whole-word, case-insensitive, first hit) */
  function highlight(sentence, word) {
    var s = String(sentence || ''), w = String(word || '');
    var re = new RegExp('\\b(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'i');
    var m = s.match(re);
    if (!m) return esc(s);
    var i = m.index, len = m[0].length;
    return esc(s.slice(0, i)) + '<span class="fcg-mark">' + esc(s.slice(i, i + len)) + '</span>' + esc(s.slice(i + len));
  }

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'fern-clue-garden.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
