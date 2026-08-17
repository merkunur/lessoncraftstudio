/* =====================================================================
   CLEO'S PACKING LIST — ACTIVITY  (cleo-packing-list-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.2.b — commas in a series. Cleo the chameleon makes lists; the child
   taps the sentence with the commas in the right places. Validity DERIVED by
   series-comma-core.js (the form whose ok flag is set; the misplaced-comma foil
   is length-matched). answerType:'state' tap-a-card + shell Check; cards shuffle.
   Text + SVG art only — no image-library, no audio dependency. No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SeriesCommaCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', LIME: '#7FB23A' };
  var LANG = 'en';

  /* German list-comma forms (0 lines to series-comma-core.js): comma between
     items, none before „und". correct & misplaced both carry 1 comma (no count
     cue); misplaced puts the comma at the forbidden spot before „und". */
  function deCorrect(r) { var i = r.items; return r.lead + ' ' + i[0] + ', ' + i[1] + ' und ' + i[2] + '.'; }
  function deNocomma(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ' und ' + i[2] + '.'; }
  function deMisplaced(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ', und ' + i[2] + '.'; }
  function deFormsOf(r) {
    var correct = deCorrect(r), foils = [deNocomma(r), deMisplaced(r)];
    var slot = (((r.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push({ text: correct, ok: true }); else out.push({ text: foils[fi++], ok: false }); }
    return out;
  }
  /* French list-comma forms (0 lines to series-comma-core.js): comma between
     items, none before « et ». Mirrors the de recipe (und→et) — correct &
     misplaced both carry 1 comma; misplaced puts it at the forbidden spot
     before « et » (« pas de virgule devant et », programmes officiels). */
  function frCorrect(r) { var i = r.items; return r.lead + ' ' + i[0] + ', ' + i[1] + ' et ' + i[2] + '.'; }
  function frNocomma(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ' et ' + i[2] + '.'; }
  function frMisplaced(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ', et ' + i[2] + '.'; }
  function frFormsOf(r) {
    var correct = frCorrect(r), foils = [frNocomma(r), frMisplaced(r)];
    var slot = (((r.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push({ text: correct, ok: true }); else out.push({ text: foils[fi++], ok: false }); }
    return out;
  }
  /* Spanish (Mexican) list-comma forms (0 lines to series-comma-core.js): comma
     between items, none before "y". Mirrors the de recipe (und→y) — correct &
     misplaced both carry 1 comma; misplaced puts it at the forbidden spot before
     "y" ("no coma antes de y", RAE §3.4.3.1). Items chosen so the 3rd never starts
     with i-/hi- → the hardcoded " y " never needs the euphonic "e". */
  function esCorrect(r) { var i = r.items; return r.lead + ' ' + i[0] + ', ' + i[1] + ' y ' + i[2] + '.'; }
  function esNocomma(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ' y ' + i[2] + '.'; }
  function esMisplaced(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ', y ' + i[2] + '.'; }
  function esFormsOf(r) {
    var correct = esCorrect(r), foils = [esNocomma(r), esMisplaced(r)];
    var slot = (((r.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push({ text: correct, ok: true }); else out.push({ text: foils[fi++], ok: false }); }
    return out;
  }
  /* Brazilian-Portuguese list-comma forms (0 lines to series-comma-core.js): comma
     between items, none before "e". Mirrors the de recipe (und→e). Portuguese "e" is
     invariant (no y→e euphony like Spanish), so no item-3 onset check is needed. */
  function ptCorrect(r) { var i = r.items; return r.lead + ' ' + i[0] + ', ' + i[1] + ' e ' + i[2] + '.'; }
  function ptNocomma(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ' e ' + i[2] + '.'; }
  function ptMisplaced(r) { var i = r.items; return r.lead + ' ' + i[0] + ' ' + i[1] + ', e ' + i[2] + '.'; }
  function ptFormsOf(r) {
    var correct = ptCorrect(r), foils = [ptNocomma(r), ptMisplaced(r)];
    var slot = (((r.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push({ text: correct, ok: true }); else out.push({ text: foils[fi++], ok: false }); }
    return out;
  }
  /* Per-locale forms builder (en falls to the English core; de/fr/es/pt use their own
     builders). Behaviour-identical to the prior `LANG!=='de'` guard for en/de. */
  var FORMS_BUILDER = { de: deFormsOf, fr: frFormsOf, es: esFormsOf, pt: ptFormsOf };
  function cplFormsOf(r) { var b = FORMS_BUILDER[LANG]; return b ? b(r) : null; }
  function cplChildView(r) { var f = cplFormsOf(r); if (!f) return Core.childView(r); return { lead: r.lead, choices: f.map(function (x, i) { return { id: i, text: x.text }; }) }; }
  function cplGrade(r, id) { var f = cplFormsOf(r); if (!f) return Core.grade(r, id); var x = f[id]; return !!x && !!x.ok; }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function chameleonSVG() {
    return '<svg class="cpl-cham-svg" viewBox="0 0 100 100" role="img" aria-label="Cleo the chameleon">' +
      '<path d="M20 58 q2 -2 6 -2 q2 -16 18 -18 q20 -2 28 14 q8 2 8 10" fill="none" stroke="#7FB23A" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M22 60 q-8 2 -10 10 q6 2 10 -2" fill="none" stroke="#7FB23A" stroke-width="5" stroke-linecap="round"/>' + /* curled tail */
      '<circle cx="66" cy="40" r="10" fill="#9BCB52"/>' +                         /* head */
      '<circle cx="69" cy="38" r="3" fill="#fff"/><circle cx="69" cy="38" r="1.5" fill="#2A2A35"/>' +
      '<path d="M74 42 l8 -1" stroke="#E2A33A" stroke-width="2.5" stroke-linecap="round"/>' + /* tongue/snout */
      '<path d="M40 64 l-3 8 M54 66 l-2 8" stroke="#7FB23A" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.CleoPackingListActivity = {
    id: 'cleo-packing-list-activity',

    strings: {
      title: { en: "Cleo's Packing List", de: 'Cleos Packliste', fr: 'Les virgules de Cléo', es: 'La lista de Cleo', pt: 'A lista do Cleo' },
      instruction: { en: 'Tap the list that has its commas in the right places.', de: 'Tippe die Liste mit den Kommas an der richtigen Stelle.', fr: 'Touche la liste où les virgules sont au bon endroit.', es: 'Toca la lista que tiene las comas en el lugar correcto.', pt: 'Toque na lista com as vírgulas no lugar certo.' },
      prompt: { en: 'Which list has the commas in the right places?', de: 'Welche Liste hat die Kommas an der richtigen Stelle?', fr: 'Quelle liste a les virgules au bon endroit ?', es: '¿Cuál lista tiene las comas en el lugar correcto?', pt: 'Qual lista está com as vírgulas no lugar certo?' },
      cleoIntro: { en: 'A comma goes after each thing in a list!', de: 'Tipp von Cleo: Zwischen den Dingen steht ein Komma – aber nie vor „und"!', fr: 'Une virgule entre les mots, jamais devant « et » !', es: 'Consejo de Cleo: una coma entre las cosas, ¡pero nunca antes de «y»!', pt: 'Vírgula entre as coisas, nunca antes do "e"!' },
      hintPick: { en: 'A comma comes after each item — and before the last "and".', de: 'Komma zwischen den Wörtern – aber KEIN Komma vor „und".', fr: 'Mets une virgule entre les mots, pas devant « et ».', es: 'Pon una coma entre las palabras, pero NO antes de «y».', pt: 'Ponha uma vírgula entre as palavras, mas NÃO antes do "e".' },
      hintWrong: { en: 'Check each comma — one after each thing in the list.', de: 'Fast! Das Komma gehört zwischen die Wörter – nicht vor „und".', fr: 'La virgule va entre les mots, pas devant « et ».', es: '¡Casi! La coma va entre las palabras, no antes de «y».', pt: 'Quase! A vírgula vai entre as palavras, não antes do "e".' },
      win: { en: 'Yes! The commas are just right. 🦎', de: 'Super – alle Kommas sitzen genau richtig! 🦎', fr: 'Bravo ! Tes virgules sont parfaites ! 🦎', es: '¡Muy bien! Todas las comas están en su lugar. 🦎', pt: 'Isso! As vírgulas estão certinhas. 🦎' }
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
      this.round = round; this.view = cplChildView(round); this.sel = null;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'cpl-wrap'); var root = api.el('div', 'cpl-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this;

      var row = api.el('div', 'cpl-row');
      var cham = api.el('div', 'cpl-cham'); cham.innerHTML = chameleonSVG(); row.appendChild(cham);
      var say = api.el('div', 'cpl-say'); say.textContent = api.t('cleoIntro'); row.appendChild(say);
      root.appendChild(row);

      var opts = api.el('div', 'cpl-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'cpl-opt' + (self.sel === o.id ? ' cpl-sel' : '')); b.type = 'button';
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

    isCorrect: function () { return cplGrade(this.round, this.sel); },
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
      fetch('/mini-tools/cleo-packing-list-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[cleo-packing-list] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.cpl-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.cpl-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(9px,2.2vw,14px);background:linear-gradient(180deg,#FBF3E4,#EEF4E2);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,150,70,.1);}'
        + '.cpl-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.cpl-cham{width:clamp(46px,10vw,60px);flex:0 0 auto;}.cpl-cham-svg{width:100%;height:auto;display:block;}'
        + '.cpl-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.cpl-opts{display:flex;flex-direction:column;gap:clamp(8px,2vw,11px);align-items:stretch;width:100%;max-width:380px;}'
        + '.cpl-opt{min-height:50px;padding:12px 16px;border-radius:13px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:700 clamp(14px,3.6vw,17px)/1.3 "Nunito",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(120,140,80,.16);touch-action:manipulation;text-align:center;}'
        + '.cpl-opt.cpl-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.cpl-opt:active{transform:translateY(1px);}'
        + '.cpl-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.cpl-root{gap:clamp(6px,1.5vw,9px);}.cpl-cham{width:clamp(42px,8vw,52px);}.cpl-opts{gap:clamp(6px,1.5vw,8px);}.cpl-opt{min-height:46px;padding:8px 15px;}}'
        + '@media (max-height:700px){.cpl-root{gap:7px;padding:12px;}.cpl-row{display:none;}.cpl-opt{min-height:46px;padding:10px 14px;font-size:15px;}}'
        + '@media (max-height:640px){.cpl-root{gap:6px;padding:10px;}.cpl-opt{min-height:44px;font-size:14.5px;}}'
        + '@media (max-width:380px){.cpl-opt{font-size:14.5px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-cleo-packing-list', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'cleo-packing-list.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return cplGrade(round, tool.sel); },
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
