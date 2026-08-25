/* =====================================================================
   TEMPO'S DAY PLAN — ACTIVITY  (tempo-day-plan-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.i — prepositions of time. Tempo the turtle plans the day; the child
   reads a sentence and taps the time preposition (before/during/after) that
   fits. Validity DERIVED by time-preposition-core.js (the card === the correct
   preposition). answerType:'state' tap-a-card + shell Check; cards shuffle; the
   selected card fills the blank. Text + SVG art only — no image-library, no
   audio dependency. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TimePrepositionCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', LEAF: '#4E9E5E' };

  /* English-locked core (FORMS/childView/grade) → German via an activity-layer
     FORMS_DE + tdpGrade wrapper; setupTask swaps the de view's choices. 0 core. */
  var LANG = 'en';
  var FORMS_DE = ['vor', 'während', 'nach'];
  var FORMS_FR = ['avant', 'pendant', 'après'];
  /* Spanish (MX): antes/después REQUIRE "de" before a noun (durante does NOT) → bake "de" into the cards, NOT the frame,
     so the "durante" card never renders "durante de la…". Paired with the feminine-noun invariant in roundsL10n.es
     ("la <fem>." so "de la" never contracts to "del"), all three cards surface-swap grammatically. */
  var FORMS_ES = ['antes de', 'durante', 'después de'];
  /* Portuguese (BR): "de" CONTRACTS with the article (de+a=da), so a bare "antes de" card + "a caminhada"
     would render the ungrammatical "antes de a caminhada". Fix = bake the prep+article contraction into the
     cards ("antes da"/"durante a"/"depois da") + keep every roundsL10n.pt after-noun FEMININE (bare, no article),
     so all three cards render grammatically with any feminine head noun (antes da/durante a/depois da caminhada). */
  var FORMS_PT = ['antes da', 'durante a', 'depois da'];
  /* Italian: "prima" REQUIRES di+article and Italian CONTRACTS di+la=della, while "durante"/"dopo" take the plain
     article. A single fixed card set can't carry a per-round article, so (as pt) bake the article into the cards
     ("prima della"/"durante la"/"dopo la") + keep every roundsL10n.it after-noun FEMININE + CONSONANT-INITIAL (bare,
     no article), so all three cards render grammatically ("prima della/durante la/dopo la <fem-cons>") and no "l'"
     elision is ever forced (which would break the apostrophe-free JS rule). */
  var FORMS_IT = ['prima della', 'durante la', 'dopo la'];
  function tdpGrade(round, id) { return (LANG === 'de' ? FORMS_DE : LANG === 'fr' ? FORMS_FR : LANG === 'es' ? FORMS_ES : LANG === 'pt' ? FORMS_PT : LANG === 'it' ? FORMS_IT : Core.FORMS)[id] === round.correct; }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function turtleSVG() {
    return '<svg class="tdp-turtle-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Tempo, die Schildkröte' : LANG === 'fr' ? 'Tempo la tortue' : LANG === 'es' ? 'Tempo la tortuga' : LANG === 'pt' ? 'Tempo, a tartaruga' : LANG === 'it' ? 'Tempo la tartaruga' : 'Tempo the turtle') + '">' +
      '<ellipse cx="48" cy="60" rx="26" ry="20" fill="#4E9E5E"/>' +               /* shell */
      '<path d="M48 40 v40 M24 54 l48 12 M24 66 l48 -12" stroke="#377544" stroke-width="3" fill="none"/>' +
      '<ellipse cx="48" cy="60" rx="26" ry="20" fill="none" stroke="#377544" stroke-width="3"/>' +
      '<circle cx="78" cy="56" r="9" fill="#7FBE7E"/>' +                          /* head */
      '<circle cx="81" cy="54" r="2.2" fill="#2A2A35"/>' +                        /* eye */
      '<path d="M26 76 l-4 6 M40 80 l-2 6" stroke="#7FBE7E" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.TempoDayPlanActivity = {
    id: 'tempo-day-plan-activity',

    strings: {
      title: { en: "Tempo's Day Plan", de: 'Tempos Tagesplan', fr: 'La journée de Tempo', es: 'El día de Tempo', pt: 'O dia da Tempo', it: 'La giornata di Tempo' },
      instruction: { en: 'Tap before, during, or after to fit the sentence.', de: 'Tippe auf vor, während oder nach, damit es in den Satz passt.', fr: 'Touche avant, pendant ou après pour compléter la phrase.', es: 'Toca antes de, durante o después de para que quede bien en la oración.', pt: 'Toque em antes da, durante a ou depois da para completar a frase.', it: 'Tocca prima, durante o dopo per completare la frase.' },
      prompt: { en: 'Tap the time word that fits.', de: 'Tippe auf das richtige Zeitwort.', fr: 'Touche le mot de temps qui convient.', es: 'Toca la palabra del tiempo correcta.', pt: 'Toque na palavra de tempo que combina.', it: 'Tocca la parola del tempo giusta.' },
      tempoIntro: { en: 'Some things come before, some during, and some after!', de: 'Manches kommt vorher, manches mittendrin und manches danach!', fr: 'Certaines choses arrivent avant, d’autres pendant, et d’autres après !', es: '¡Unas cosas pasan antes, otras mientras y otras después!', pt: 'Antes, durante ou depois? Tudo tem a sua hora!', it: 'Alcune cose vengono prima, altre durante e altre dopo!' },
      hintPick: { en: 'Does it happen first, in the middle, or at the end?', de: 'Passiert es zuerst, in der Mitte oder am Ende?', fr: 'Est-ce que ça arrive d’abord, au milieu, ou à la fin ?', es: '¿Pasa primero, al mismo tiempo o al final?', pt: 'Isso acontece primeiro, no meio ou no fim?', it: 'Succede prima, nel mezzo o alla fine?' },
      hintWrong: { en: 'Think about the order — before, during, or after?', de: 'Denk an die Reihenfolge: vor, während oder nach?', fr: 'Pense à l’ordre : avant, pendant ou après ?', es: 'Piensa en el orden: ¿antes, durante o después?', pt: 'Pense na ordem: antes, durante ou depois?', it: 'Pensa a quando succede: prima, durante o dopo?' },
      win: { en: 'Yes! That fits the time. 🐢', de: 'Ja! Genau zur richtigen Zeit! 🐢', fr: 'Oui ! C’est le bon moment. 🐢', es: '¡Sí! ¡Justo a tiempo! 🐢', pt: 'Isso! Bem na hora certa. 🐢', it: 'Sì! È il momento giusto. 🐢' }
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
      if (LANG === 'de') this.view.choices = FORMS_DE.map(function (f, i) { return { id: i, word: f }; });
      else if (LANG === 'fr') this.view.choices = FORMS_FR.map(function (f, i) { return { id: i, word: f }; });
      else if (LANG === 'es') this.view.choices = FORMS_ES.map(function (f, i) { return { id: i, word: f }; });
      else if (LANG === 'pt') this.view.choices = FORMS_PT.map(function (f, i) { return { id: i, word: f }; });
      else if (LANG === 'it') this.view.choices = FORMS_IT.map(function (f, i) { return { id: i, word: f }; });
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'tdp-wrap'); var root = api.el('div', 'tdp-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;
      var selWord = null; if (self.sel != null) { for (var i = 0; i < v.choices.length; i++) { if (v.choices[i].id === self.sel) selWord = v.choices[i].word; } }

      var row = api.el('div', 'tdp-row');
      var tur = api.el('div', 'tdp-turtle'); tur.innerHTML = turtleSVG(); row.appendChild(tur);
      var say = api.el('div', 'tdp-say'); say.textContent = api.t('tempoIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'tdp-sent');
      var b = api.el('span', 'tdp-txt'); b.textContent = v.before + ' '; sent.appendChild(b);
      var blank = api.el('span', 'tdp-blank' + (selWord ? ' tdp-filled' : '')); blank.textContent = selWord || '___'; sent.appendChild(blank);
      var a = api.el('span', 'tdp-txt'); a.textContent = ' ' + v.after; sent.appendChild(a);
      root.appendChild(sent);

      var opts = api.el('div', 'tdp-opts');
      this._cards.forEach(function (o) {
        var btn = api.el('button', 'tdp-opt' + (self.sel === o.id ? ' tdp-sel' : '')); btn.type = 'button';
        btn.setAttribute('data-id', o.id); btn.setAttribute('aria-label', o.word);
        btn.textContent = o.word;
        btn.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(btn);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); speak(word); this.render();
    },

    isCorrect: function () { return tdpGrade(this.round, this.sel); },
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
      fetch('/mini-tools/tempo-day-plan-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[tempo-day-plan] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.tdp-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.tdp-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vw,16px);background:linear-gradient(180deg,#FBF3E4,#EDF3E6);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(90,150,90,.1);}'
        + '.tdp-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.tdp-turtle{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.tdp-turtle-svg{width:100%;height:auto;display:block;}'
        + '.tdp-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.tdp-sent{text-align:center;background:#fff;border:2px dashed rgba(78,158,94,.32);border-radius:13px;padding:clamp(10px,2.6vw,16px);font:700 clamp(15px,4vw,20px)/1.4 "Nunito",sans-serif;color:' + C.INK + ';max-width:94%;}'
        + '.tdp-blank{display:inline-block;min-width:62px;text-align:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.LEAF + ';border-bottom:3px solid rgba(78,158,94,.5);padding:0 4px;}'
        + '.tdp-blank.tdp-filled{color:' + C.CORAL2 + ';border-bottom-color:' + C.CORAL + ';}'
        + '.tdp-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.tdp-opt{min-width:clamp(86px,26vw,120px);min-height:54px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(17px,4.5vw,21px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(100,140,90,.16);touch-action:manipulation;}'
        + '.tdp-opt.tdp-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.tdp-opt:active{transform:translateY(1px);}'
        + '.tdp-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.tdp-root{gap:clamp(7px,1.7vw,12px);}.tdp-turtle{width:clamp(40px,8vw,50px);}.tdp-opt{min-height:50px;}}'
        + '@media (max-height:700px){.tdp-root{gap:8px;padding:12px;}.tdp-row{display:none;}.tdp-sent{font-size:17px;padding:11px;}.tdp-blank{font-size:17px;}.tdp-opt{min-height:48px;padding:9px 15px;font-size:19px;}}'
        + '@media (max-height:640px){.tdp-root{gap:7px;padding:10px;}.tdp-sent{font-size:16px;}.tdp-opt{min-height:46px;font-size:18px;}}'
        + '@media (max-width:380px){.tdp-opt{min-width:84px;font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-tempo-day-plan', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'tempo-day-plan.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tdpGrade(round, tool.sel); },
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
