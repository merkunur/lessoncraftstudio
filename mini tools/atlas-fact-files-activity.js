/* =====================================================================
   ATLAS'S FACT FILES — ACTIVITY  (atlas-fact-files-activity.js)
   ---------------------------------------------------------------------
   CCSS RI.K.1 — answer key-detail questions about an informational text. Atlas
   the armadillo shows a two-sentence fact; the child reads it and taps the
   answer to a key-detail question. Validity DERIVED by fact-detail-core.js (the
   option === the answer, which is findable in the fact). answerType:'state'
   tap-a-card + shell Check; cards shuffle. The per-round question renders on the
   stage. Text + SVG art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.FactDetailCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', BROWN: '#B07A48' };

  /* The core grades by exact string match (locale-neutral). German = a data port:
     German Sachtext rounds via roundsL10n.de (answer===one option, answer⊂fact). 0 core. */
  var LANG = 'en';

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function armadilloSVG() {
    return '<svg class="aff-arm-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'fr' ? 'Atlas le tatou' : LANG === 'de' ? 'Atlas, das Gürteltier' : 'Atlas the armadillo') + '">' +
      '<ellipse cx="48" cy="60" rx="26" ry="20" fill="#C79B6E"/>' +                /* shell */
      '<path d="M30 50 q18 -10 36 0 M28 60 q20 -8 40 0 M30 70 q18 8 36 0" stroke="#9A6E42" stroke-width="3" fill="none"/>' + /* bands */
      '<ellipse cx="48" cy="60" rx="26" ry="20" fill="none" stroke="#9A6E42" stroke-width="2.5"/>' +
      '<circle cx="78" cy="54" r="10" fill="#D9B68C"/>' +                          /* head */
      '<circle cx="81" cy="52" r="2.2" fill="#2A2A35"/>' +                         /* eye */
      '<path d="M86 52 l6 -3 M86 56 l6 1" stroke="#D9B68C" stroke-width="2.5" stroke-linecap="round"/>' + /* snout/ear */
      '<path d="M30 78 l-3 6 M44 80 l-2 6" stroke="#B07A48" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.AtlasFactFilesActivity = {
    id: 'atlas-fact-files-activity',

    strings: {
      title: { en: "Atlas's Fact Files", de: 'Atlas\' Fakten-Kartei', fr: 'Les fiches d’Atlas' },
      instruction: { en: 'Read the facts, then tap the answer to the question.', de: 'Lies den Sachtext und tippe dann auf die Antwort zur Frage.', fr: 'Lis le texte, puis tape la réponse à la question.' },
      prompt: { en: 'Read the facts, then tap the answer.', de: 'Lies den Sachtext und tippe auf die Antwort.', fr: 'Lis le texte, puis tape la réponse.' },
      atlasIntro: { en: 'Read my fact, then find the answer hiding inside it!', de: 'Hallo, ich bin Atlas! Lies meinen kleinen Sachtext ganz genau – die Antwort steckt mitten im Text.', fr: 'Lis bien mon petit texte : la réponse se cache dedans !' },
      hintPick: { en: 'The answer is right there in the facts — read them again.', de: 'Die Antwort steht schon im Text. Lies sie dort noch einmal nach!', fr: 'La réponse est dans le texte — relis-le bien.' },
      hintWrong: { en: 'Look back at the facts and find the part that answers it.', de: 'Schau noch einmal in den Text. Dort steht die richtige Antwort!', fr: 'Regarde encore dans le texte : la réponse s’y trouve.' },
      win: { en: 'Yes! You found the key detail. 📁', de: 'Super! Du hast die wichtige Information gefunden. 📁', fr: 'Bravo ! Tu as trouvé l’information. 📁' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._cards = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.sel = null;
      this._cards = shuffle(this.view.options.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'aff-wrap'); var root = api.el('div', 'aff-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'aff-row');
      var arm = api.el('div', 'aff-arm'); arm.innerHTML = armadilloSVG(); row.appendChild(arm);
      var fileb = api.el('button', 'aff-fact'); fileb.type = 'button'; fileb.setAttribute('aria-label', (LANG === 'fr' ? 'écouter le texte' : LANG === 'de' ? 'Den Sachtext anhören' : 'hear the facts'));
      fileb.textContent = v.fact;
      fileb.addEventListener('click', function () { speak(v.fact); });
      row.appendChild(fileb);
      root.appendChild(row);

      var q = api.el('div', 'aff-q'); q.textContent = v.question; root.appendChild(q);

      var opts = api.el('div', 'aff-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'aff-opt' + (self.sel === o.id ? ' aff-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', o.text);
        b.textContent = o.text;
        b.addEventListener('click', function () { self._tap(o.id, o.text); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, text) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); speak(text); this.render();
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
      fetch('/mini-tools/atlas-fact-files-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[atlas-fact-files] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.aff-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.aff-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#F4ECDD);border-radius:20px;padding:clamp(10px,2.4vw,16px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,130,90,.1);}'
        + '.aff-row{display:flex;align-items:center;gap:clamp(7px,2vw,12px);justify-content:center;width:100%;}'
        + '.aff-arm{width:clamp(46px,10vw,60px);flex:0 0 auto;}.aff-arm-svg{width:100%;height:auto;display:block;}'
        + '.aff-fact{flex:1 1 auto;max-width:380px;text-align:left;background:#fff;border:2px solid rgba(176,122,72,.3);border-left:6px solid ' + C.BROWN + ';border-radius:8px;padding:10px 13px;font:700 clamp(13px,3.3vw,16px)/1.35 "Nunito",sans-serif;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(160,130,90,.14);}'
        + '.aff-q{text-align:center;font:800 clamp(14px,3.7vw,18px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';max-width:94%;}'
        + '.aff-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.2vw,12px);justify-content:center;}'
        + '.aff-opt{min-height:50px;padding:11px 16px;border-radius:13px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(15px,3.9vw,19px)/1.1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(120,120,90,.16);touch-action:manipulation;}'
        + '.aff-opt.aff-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.aff-opt:active{transform:translateY(1px);}'
        + '.aff-fact:focus-visible,.aff-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.aff-root{gap:clamp(7px,1.7vw,11px);}.aff-arm{width:clamp(40px,8vw,50px);}.aff-opt{min-height:48px;}}'
        + '@media (max-height:700px){.aff-root{gap:7px;padding:11px;}.aff-arm{width:clamp(38px,7vw,44px);}.aff-fact{font-size:13px;padding:8px 11px;}.aff-q{font-size:15px;}.aff-opt{min-height:46px;padding:9px 13px;font-size:16px;}}'
        + '@media (max-height:640px){.aff-root{gap:6px;padding:9px;}.aff-fact{font-size:12.5px;}.aff-q{font-size:14px;}.aff-opt{min-height:44px;font-size:15px;}}'
        + '@media (max-width:380px){.aff-opt{font-size:15px;padding:9px 12px;}.aff-fact{font-size:12.5px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-atlas-fact-files', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'atlas-fact-files.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
