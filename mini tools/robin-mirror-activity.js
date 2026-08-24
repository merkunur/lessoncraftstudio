/* =====================================================================
   ROBIN'S MIRROR — ACTIVITY  (robin-mirror-activity.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.c — reflexive pronouns. Robin holds up a mirror: a reflexive
   pronoun points back at the subject. The child reads a sentence with a
   "___" and taps the word chip that matches the subject. Validity DERIVED by
   reflexive-pronoun-core.js (REFLEXIVE_TABLE; never a stored literal; no-
   answer-leak). answerType:'state' → tap a chip, shell Check grades; a wrong
   tap gives a DIFFUSE nudge. Per-pass reshuffle + the 3 chips shuffle per
   render (no position cue). Text + SVG char stub (CA5 later). No timer/score/
   streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ReflexivePronounCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';

  /* German reflexive pronouns (0 lines to reflexive-pronoun-core.js): accusative,
     agreeing with the subject. All 3rd-person + plural collapse onto „sich". */
  var REFL_DE = { ich: 'mich', du: 'dich', er: 'sich', sie: 'sich', es: 'sich', wir: 'uns', ihr: 'euch' };
  /* French reflexive pronouns (pronoms réfléchis): agree with the subject, sit
     BEFORE the verb. All 3rd-person collapse onto « se ». Only consonant-initial
     verbs are used in the rounds, so me/te/se never elide to m'/t'/s'. */
  var REFL_FR = { je: 'me', tu: 'te', il: 'se', elle: 'se', on: 'se', nous: 'nous', vous: 'vous', ils: 'se', elles: 'se' };
  /* Mexican Spanish reflexive clitics (pronombres reflexivos): agree with the
     subject, sit BEFORE the verb. NO vosotros — a 2nd-plural group is „ustedes"
     → „se" + 3rd-plural verb (never peninsular „os"). All 3rd-person + ustedes
     collapse onto „se". The clitic never elides before a vowel (me escondo). */
  var REFL_ES = { yo: 'me', tu: 'te', el: 'se', ella: 'se', ellos: 'se', ellas: 'se', nosotros: 'nos', ustedes: 'se' };
  /* Brazilian-Portuguese reflexive obliques (pronomes reflexivos): PROCLISIS (before
     the verb, explicit subject before it). NATIONAL 3-form paradigm: me (eu), se
     (você/ele/ela/a gente/vocês/eles/elas — all 3rd-agreeing incl. a gente), nos (nós).
     NO tu/te (regionally marked; "tu te escondes" is a register no BR child speaks). */
  var REFL_PT = { eu: 'me', voce: 'se', ele: 'se', ela: 'se', a_gente: 'se', nos: 'nos', voces: 'se', eles: 'se', elas: 'se' };
  /* Italian reflexive pronouns (#31 native ensemble; pronomi riflessivi, proclitic):
     agree with the subject, sit BEFORE the verb. All 3rd-person (lui/lei/loro)
     collapse onto « si ». 5 distinct surface forms: mi/ti/si/ci/vi. ⚠ The clitic
     elides before a vowel («si»→«s'», «ci»→«c'» before e/i, mi/ti/vi optional), so
     every round's VERB is CONSONANT-INITIAL by design → the written clitic never
     elides (enforced by the round data, not this code). ⚠ Foil-picker MUST NOT pair
     two 3rd-person subjects (both → «si» = duplicate chip). */
  var REFL_IT = { io: 'mi', tu: 'ti', lui: 'si', lei: 'si', noi: 'ci', voi: 'vi', loro: 'si' };
  /* Per-locale table (en falls to the English core). Behaviour-identical to the
     prior LANG==='de' ternary for en/de. */
  var REFL_L10N = { de: REFL_DE, fr: REFL_FR, es: REFL_ES, pt: REFL_PT, it: REFL_IT };
  function rmReflexiveOf(ref) { var m = REFL_L10N[LANG]; return m ? (m[ref] || '') : Core.reflexiveOf(ref); }
  function rmOracle(r) { return rmReflexiveOf(r.referent); }
  function rmChips(r) { return [rmReflexiveOf(r.referent), rmReflexiveOf(r.wrongA), rmReflexiveOf(r.wrongB)]; }
  function rmIsAnswer(r, str) { return str === rmOracle(r); }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sayable(s) { return String(s || '').replace(/___/g, LANG === 'de' ? 'Lücke' : LANG === 'fr' ? 'trou' : LANG === 'es' ? 'espacio' : LANG === 'pt' ? 'lacuna' : LANG === 'it' ? 'spazio' : 'blank'); }

  function robinSVG(mood) {
    var happy = mood === 'happy';
    var eye = happy ? '<path d="M55 42 q3 -4 6 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>' : '<circle cx="58" cy="43" r="2.6" fill="#2A2A35"/>';
    return '<svg class="rmr-bird-svg" viewBox="0 0 100 100" role="img" aria-label="Robin the robin">' +
      '<ellipse cx="46" cy="52" rx="26" ry="24" fill="#6E7B86"/>' +              /* body */
      '<ellipse cx="46" cy="62" rx="16" ry="13" fill="#E2693C"/>' +             /* red breast */
      '<circle cx="58" cy="44" r="12" fill="#7C8995"/>' +                        /* head */
      eye +
      '<path d="M70 46 L80 49 L70 52 Z" fill="#F2A03B"/>' +                       /* beak */
      '<path d="M20 50 q-12 4 -2 12 q6 -2 8 -8 Z" fill="#5A6670"/>' +            /* tail */
      '</svg>';
  }

  global.RobinMirrorActivity = {
    id: 'robin-mirror-activity',

    strings: {
      title: { en: "Robin's Mirror", de: 'Robins Spiegel', fr: 'Robin et le miroir magique', es: 'El espejo de Robin', pt: 'O espelho do Robin', it: 'Lo specchio di Robin' },
      prompt: { en: 'Which word fills the blank?', de: 'Welches Wort passt?', fr: 'Quel petit mot va dans le trou ?', es: '¿Qué palabra va en el espacio?', pt: 'Qual palavra vai no espaço?', it: 'Quale parola va nello spazio?' },
      robinIntro: { en: 'A reflexive word points back at who did it!', de: 'Wie ein Spiegel zeigt das Wort zurück auf den, der etwas tut!', fr: 'Mon miroir renvoie le petit mot vers celui qui fait l’action !', es: 'Como un espejo, la palabra apunta de regreso a quien hace la acción.', pt: 'Como um espelho, a palavra volta para quem faz a ação.', it: 'Come uno specchio, la parolina torna a chi fa l’azione!' },
      theAsk: { en: 'Which word fills the blank?', de: 'Welches Wort passt in die Lücke?', fr: 'Quel petit mot va dans le trou ?', es: '¿Cuál palabra completa la oración?', pt: 'Qual palavra completa a frase?', it: 'Quale parola completa la frase?' },
      hintPick: { en: 'Tap the word that matches who did it!', de: 'Schau zuerst: Wer tut es? Tippe dann das passende Wort an.', fr: 'Regarde d’abord qui fait l’action, puis tape le petit mot qui va avec.', es: 'Primero mira quién hace la acción y luego toca la palabra que va con esa persona.', pt: 'Primeiro veja quem faz a ação e depois toque na palavra que combina com essa pessoa.', it: 'Prima guarda chi fa l’azione, poi tocca la parola giusta!' },
      hintWrong: { en: "That word doesn't match — read it again.", de: 'Fast! Schau auf das erste Wort: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch.', fr: 'je → me, tu → te, il/elle → se, nous → nous, vous → vous', es: '¡Casi! Fíjate en el sujeto: yo → me, tú → te, él/ella → se, nosotros → nos, ustedes → se.', pt: 'Quase! Olhe o sujeito: eu → me, você/ele/ela/a gente → se, nós → nos.', it: 'Quasi! Guarda il soggetto: io → mi, tu → ti, lui/lei → si, noi → ci, voi → vi.' },
      win: { en: 'Yes! That word points right back. 🪞', de: 'Super – das Wort zeigt genau zurück! 🪞', fr: 'Bravo ! Le miroir de Robin brille rien que pour toi ! 🪞', es: '¡Muy bien! La palabra apunta justo de regreso. 🪞', pt: 'Isso! A palavra volta certinho. 🪞', it: 'Sì! La parola torna proprio indietro. 🪞' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.sel = null; this._chips = null; this._spoke = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = REFL_L10N[LANG] ? { id: round.id, sentence: round.sentence, chips: rmChips(round) } : Core.childView(round); this.sel = null; this._spoke = false;
      this._chips = shuffle(this.view.chips.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'rmr-wrap'); var root = api.el('div', 'rmr-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'rmr-row');
      var bird = api.el('div', 'rmr-bird'); bird.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); bird.innerHTML = robinSVG(this.sel ? 'happy' : 'idle'); row.appendChild(bird);
      var say = api.el('div', 'rmr-say'); say.textContent = api.t('robinIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'rmr-sent');
      var txt = api.el('span', 'rmr-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'rmr-spk'); sp.type = 'button'; sp.setAttribute('aria-label', LANG === 'de' ? 'Satz anhören' : LANG === 'fr' ? 'écouter la phrase' : LANG === 'es' ? 'escuchar la oración' : LANG === 'pt' ? 'ouvir a frase' : LANG === 'it' ? 'ascolta la frase' : 'hear the sentence'); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(sayable(v.sentence)); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'rmr-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var chips = api.el('div', 'rmr-chips');
      this._chips.forEach(function (w) {
        var b = api.el('button', 'rmr-chip' + (self.sel === w ? ' rmr-sel' : '')); b.type = 'button'; b.setAttribute('data-w', w);
        b.textContent = w; b.setAttribute('aria-label', w);
        b.addEventListener('click', function () { self._tap(w); });
        chips.appendChild(b);
      });
      root.appendChild(chips);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(sayable(v.sentence)); }, 320); }
    },

    _tap: function (w) {
      if (this.sel === w) { this.sel = null; this.render(); return; }
      this.sel = w; this.api.sound && this.api.sound(540); speak(w); this.render();
    },

    isCorrect: function () { return this.sel != null && rmIsAnswer(this.round, this.sel); },
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
      fetch('/mini-tools/robin-mirror-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[robin-mirror] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.rmr-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.rmr-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#EAEEF1);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.rmr-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.rmr-bird{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.rmr-bird-svg{width:100%;height:auto;display:block;}'
        + '.rmr-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.rmr-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid ' + C.GOLD + ';border-radius:13px;padding:9px 13px;}'
        + '.rmr-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.6vw,18px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.rmr-spk{flex:0 0 auto;width:34px;height:34px;border-radius:10px;border:0;background:#EAF2EE;font-size:17px;cursor:pointer;touch-action:manipulation;}'
        + '.rmr-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';}'
        + '.rmr-chips{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,11px);justify-content:center;}'
        + '.rmr-chip{min-height:48px;padding:9px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.28);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        + '.rmr-chip.rmr-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.rmr-chip:active{transform:translateY(1px);}'
        + '.rmr-spk:focus-visible,.rmr-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.rmr-root{gap:clamp(4px,1.1vw,7px);}.rmr-bird{width:clamp(40px,8vw,48px);}}'
        + '@media (max-height:700px){.rmr-root{gap:4px;}.rmr-bird{width:clamp(36px,7vw,44px);}.rmr-sent{padding:7px 11px;}.rmr-senttxt{font-size:15px;}.rmr-chip{min-height:46px;padding:8px 15px;font-size:16px;}}'
        + '@media (max-height:640px){.rmr-root{gap:3px;padding:6px;}.rmr-row{display:none;}.rmr-sent{padding:6px 10px;}.rmr-senttxt{font-size:14px;}.rmr-chip{min-height:44px;padding:7px 13px;font-size:15px;}}'
        + '@media (max-width:380px){.rmr-root{gap:4px;padding:7px;}.rmr-senttxt{font-size:14px;}.rmr-chip{font-size:16px;padding:8px 14px;}}'
        + '@media (prefers-reduced-motion: reduce){.rmr-chip{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-robin-mirror', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'robin-mirror.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function (tool) { return tool.sel ? 'hintWrong' : 'hintPick'; }
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
