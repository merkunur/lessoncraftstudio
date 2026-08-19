/* =====================================================================
   HATTIE'S WHOSE-IS-IT — ACTIVITY  (hattie-whose-is-it-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.b — possessive nouns. Hattie the hedgehog runs a lost-and-found;
   one thing belongs to one owner and the child taps the singular-possessive form
   (dog's). Validity DERIVED by possessive-noun-core.js (the card === noun+"'s";
   foils = plain plural + plural possessive). answerType:'state' tap-a-card +
   shell Check; cards shuffle. Text + SVG art only — no image-library, no audio
   dependency. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PossessiveNounCore;
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', RUST: '#B0613A' };

  /* German NAMEN-GENITIV wrapper (activity-layer; 0 lines to possessive-noun-core.js).
     Correct = Name+s (Annas); foils = Name+'s (Deppenapostroph) + Name (missing -s).
     Answer at round.slot (mirrors the core's slot logic); the render then shuffles. */
  function deAnswer(round) { return round.noun + 's'; }
  function deForms(round) {
    var a = round.noun + 's', foils = [round.noun + "'s", round.noun];
    var slot = (((round.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push(a); else out.push(foils[fi++]); }
    return out;
  }
  function deChildView(round) { return { noun: round.noun, thing: round.thing, choices: deForms(round).map(function (w, i) { return { id: i, word: w }; }) }; }

  /* pt-BR REBUILD wrapper (activity-layer; 0 lines to possessive-noun-core.js).
     Portuguese has NO possessive apostrophe/genitive-s — this teaches the GENDER
     AGREEMENT of the possessive contraction: "De quem é? da Ana / do Téo".
     Correct = contraction agreeing with the owner's gender (da=fem, do=masc);
     foils = the gender-wrong contraction + a wrong-preposition contraction (na/no,
     em≠posse). All 3 phrases share the owner name → equal length, no length cue.
     (The uncontracted "de Ana" is acceptable BR, so it is NOT used as a foil.) */
  function ptAnswer(round) { return (round.ownerG === 'f' ? 'da ' : 'do ') + round.noun; }
  function ptForms(round) {
    var owner = round.noun, f = round.ownerG === 'f';
    var a = (f ? 'da ' : 'do ') + owner;
    var foils = [(f ? 'do ' : 'da ') + owner, (f ? 'na ' : 'no ') + owner]; // gender-wrong, wrong-preposition
    var slot = (((round.slot || 0) % 3) + 3) % 3, out = [], fi = 0;
    for (var i = 0; i < 3; i++) { if (i === slot) out.push(a); else out.push(foils[fi++]); }
    return out;
  }
  function ptChildView(round) { return { noun: round.noun, thing: round.thing, ownerG: round.ownerG, thingG: round.thingG, choices: ptForms(round).map(function (w, i) { return { id: i, word: w }; }) }; }

  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = (LANG === 'de' ? 'de-DE' : LANG === 'pt' ? 'pt-BR' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function hedgehogSVG() {
    return '<svg class="hwi-hog-svg" viewBox="0 0 100 100" role="img" aria-label="' + (LANG === 'de' ? 'Hattie, der Igel' : LANG === 'pt' ? 'Tuca, a ouriça' : 'Hattie the hedgehog') + '">' +
      '<path d="M22 64 q4 -26 28 -28 q24 2 28 28z" fill="#9A6B47"/>' +              /* spiky back */
      '<path d="M30 44 l-4 -10 M42 38 l-2 -11 M54 37 l2 -11 M66 42 l5 -10" stroke="#7A5238" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="50" cy="64" rx="28" ry="14" fill="#E0C49E"/>' +                /* face/belly */
      '<circle cx="74" cy="60" r="9" fill="#EBD6B6"/>' +                           /* snout */
      '<circle cx="76" cy="59" r="2.2" fill="#2A2A35"/>' +
      '<circle cx="82" cy="61" r="2" fill="#2A2A35"/>' +                           /* nose */
      '<path d="M34 78 l-3 6 M48 80 l-2 6" stroke="#B0613A" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.HattieWhoseIsItActivity = {
    id: 'hattie-whose-is-it-activity',

    strings: {
      title: { en: "Hattie's Whose-Is-It", de: 'Hatties Fundkiste', pt: 'O acha-e-perde da Tuca' },
      instruction: { en: 'Tap the word that shows ONE owner owns it.', de: 'Tippe das Wort, das zeigt, wem es gehört – Name und s, kein Apostroph.', pt: 'Toque no pedacinho que combina com o dono: da para menina, do para menino.' },
      prompt: { en: 'Tap the word that shows ONE owner.', de: 'Wem gehört es? Tippe: Name + s – kein Apostroph.', pt: 'De quem é? Toque em da ou do.' },
      hattieIntro: { en: "Add an apostrophe + s to show ONE owner: the dog's bone!", de: 'Ein Name bekommt nur ein s – keinen Apostroph: Annas Ball!', pt: 'Oi! Eu sou a Tuca. Dica: da é de menina, do é de menino!' },
      hintPick: { en: "One owner gets an apostrophe and an s — like cat's.", de: 'Beim Namen hängst du nur ein s an – wie Annas Ball. Kein Apostroph!', pt: 'Olhe pro dono: se é menina, escolha da; se é menino, escolha do.' },
      hintWrong: { en: "Look for the apostrophe before the s (one owner = 's).", de: 'Beim Namen kommt NUR ein s dran – kein Apostroph.', pt: 'Quase! Veja de novo: o dono é menina (da) ou menino (do)? E a gente usa de, não em.' },
      win: { en: "Yes! That shows who owns it. 🦔", de: 'Ja! Das zeigt, wem es gehört. 🦔', pt: 'Isso! Você achou de quem é. 🦔' }
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
      this.round = round; this.view = (LANG === 'pt' ? ptChildView(round) : LANG === 'de' ? deChildView(round) : Core.childView(round)); this.sel = null;
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'hwi-wrap'); var root = api.el('div', 'hwi-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'hwi-row');
      var hog = api.el('div', 'hwi-hog'); hog.innerHTML = hedgehogSVG(); row.appendChild(hog);
      var say = api.el('div', 'hwi-say'); say.textContent = api.t('hattieIntro'); row.appendChild(say);
      root.appendChild(row);

      var tell = api.el('div', 'hwi-tell'); tell.textContent = (LANG === 'pt' ? ((v.ownerG === 'f' ? 'A ' : 'O ') + v.noun + ' perdeu ' + (v.thingG === 'f' ? 'a ' : 'o ') + v.thing + '.') : LANG === 'de' ? ('Das gehört ' + v.noun + '.') : ('This ' + v.thing + ' belongs to the ' + v.noun + '.')); root.appendChild(tell);
      var ask = api.el('div', 'hwi-ask'); ask.textContent = (LANG === 'pt' ? ('De quem é ' + (v.thingG === 'f' ? 'a ' : 'o ') + v.thing + '?') : LANG === 'de' ? ('Wessen ' + v.thing + ' ist das?') : ('Whose ' + v.thing + ' is it?')); root.appendChild(ask);

      var opts = api.el('div', 'hwi-opts');
      this._cards.forEach(function (o) {
        var b = api.el('button', 'hwi-opt' + (self.sel === o.id ? ' hwi-sel' : '')); b.type = 'button';
        b.setAttribute('data-id', o.id); b.setAttribute('aria-label', LANG === 'pt' ? o.word : (o.word + ' ' + v.thing));
        var w = api.el('span', 'hwi-word'); w.textContent = o.word; b.appendChild(w);
        var th = api.el('span', 'hwi-thing'); th.textContent = (LANG === 'pt' ? '' : v.thing); b.appendChild(th);
        b.addEventListener('click', function () { self._tap(o.id, o.word); });
        opts.appendChild(b);
      });
      root.appendChild(opts);

      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _tap: function (id, word) {
      if (this.sel === id) { this.sel = null; this.render(); return; }
      this.sel = id; this.api.sound && this.api.sound(560); speak(word); this.render();
    },

    isCorrect: function () { return (LANG === 'pt' ? (this.sel != null && ptForms(this.round)[this.sel] === ptAnswer(this.round)) : LANG === 'de' ? (this.sel != null && deForms(this.round)[this.sel] === deAnswer(this.round)) : Core.grade(this.round, this.sel)); },
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
      fetch('/mini-tools/hattie-whose-is-it-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var pool = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(pool.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[hattie-whose-is-it] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.hwi-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.hwi-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,13px);background:linear-gradient(180deg,#FBF3E4,#F4EBE2);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(160,120,90,.1);}'
        + '.hwi-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.hwi-hog{width:clamp(46px,10vw,60px);flex:0 0 auto;}.hwi-hog-svg{width:100%;height:auto;display:block;}'
        + '.hwi-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:74%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.hwi-tell{text-align:center;font:700 clamp(13px,3.3vw,16px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';max-width:92%;}'
        + '.hwi-ask{text-align:center;font:800 clamp(14px,3.7vw,18px)/1.2 "Baloo 2",sans-serif;color:' + C.RUST + ';}'
        + '.hwi-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.hwi-opt{display:flex;flex-direction:column;align-items:center;gap:1px;min-width:clamp(88px,26vw,124px);min-height:56px;padding:9px 14px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';cursor:pointer;box-shadow:0 2px 0 rgba(150,120,80,.16);touch-action:manipulation;}'
        + '.hwi-word{font:800 clamp(17px,4.6vw,22px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.hwi-thing{font:600 clamp(11px,2.7vw,13px)/1 "Nunito",sans-serif;color:#6B6256;}'
        + '.hwi-opt.hwi-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;}'
        + '.hwi-opt.hwi-sel .hwi-word{color:' + C.CORAL2 + ';}'
        + '.hwi-opt:active{transform:translateY(1px);}'
        + '.hwi-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.hwi-root{gap:clamp(6px,1.6vw,11px);}.hwi-hog{width:clamp(42px,8vw,52px);}.hwi-opt{min-height:52px;}}'
        + '@media (max-height:700px){.hwi-root{gap:7px;padding:12px;}.hwi-row{display:none;}.hwi-tell{font-size:13px;}.hwi-ask{font-size:15px;}.hwi-opt{min-height:50px;padding:8px 12px;}.hwi-word{font-size:19px;}}'
        + '@media (max-height:640px){.hwi-root{gap:6px;padding:10px;}.hwi-tell{font-size:12.5px;}.hwi-ask{font-size:14px;}.hwi-opt{min-height:48px;}.hwi-word{font-size:18px;}}'
        + '@media (max-width:380px){.hwi-opt{min-width:80px;}.hwi-word{font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-hattie-whose-is-it', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'hattie-whose-is-it.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return (LANG === 'pt' ? (tool.sel != null && ptForms(round)[tool.sel] === ptAnswer(round)) : LANG === 'de' ? (tool.sel != null && deForms(round)[tool.sel] === deAnswer(round)) : Core.grade(round, tool.sel)); },
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
