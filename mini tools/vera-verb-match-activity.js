/* =====================================================================
   VERA'S VERB MATCH — ACTIVITY  (vera-verb-match-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.c — subject–verb agreement. Vera the vole matches the verb to its
   subject; the child reads a sentence and taps the be-verb (am/is/are) that
   agrees. answerType:'state' tap-a-card + shell Check; cards shuffle; the
   selected card fills the blank. Text + SVG art only — no image-library, no
   audio dependency. No timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.

   ⚠⚠ THE HEADER USED TO SAY "Validity DERIVED by be-agreement-core.js". THAT IS
   TRUE IN ENGLISH ONLY. The core hard-codes FORMS = ['am','is','are'], so for every
   other locale grade()/oracle()/facts().correctValid are dead — measured:
   correctValid false and oracle() === -1 on EVERY de/fr/es/pt/it/nl round (nl shows
   hasIs true purely because Dutch also spells it "is", which is worse: a partial
   overlap looks half-alive). This file has always re-implemented the lookup below;
   the claim in the docblock was the thing that was wrong. The core is PROTECTED
   (0 lines), so the build-gate now carries its own per-locale ground truth instead
   — see scripts/verify-be-agreement-core.js.

   ⭐⭐ sv (#28) IS A REBUILD, NOT A FAN-OUT, AND IT IS THE ONLY POOL WITH PER-ROUND
   CARDS. Swedish has NO subject–verb agreement: "vara" has one present form, "är",
   for every person and number — and so does every other Swedish verb, so the
   es/pt/it escape (switch ser→estar for three distinct forms) has nothing to switch
   to. Measured on a faithful Swedish pool: 1 distinct form, fixedGuessBot 100%.
   Swedish carries gender/number concord on the ADJECTIVE instead, so the sv deck
   moves the gap past the copula — "Björnen är ___" / "Gräset är ___" /
   "Blommorna är ___" with stor·stort·stora — keeping "är" on screen as the very
   distance the child must reason across. Each sv round therefore ships its OWN card
   triple (round.cards): the deck's whole justification is that the rule is
   PRODUCTIVE, and a single-adjective deck could not show that.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.BeAgreementCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', PLUM: '#9B6FB0',
           /* ⚠ this palette shipped with NO GREEN, so any `C.GOOD`-style reference would be
              an invalid declaration — dropped WHOLE and SILENTLY by the cascade. Declared. */
           WIN: '#2E7D46', WINTX: '#1B5E33' };
  var LANG = 'en';
  var FORMS_DE = ['bin', 'ist', 'sind'];
  var FORMS_FR = ['suis', 'est', 'sont'];
  var FORMS_ES = ['estoy', 'está', 'están'];
  var FORMS_PT = ['estou', 'está', 'estão'];
  /* it (#28 fan-out): ⭐⭐ THE COPULA = STARE (sto/sta/stanno) — «essere» is structurally impossible (io sono ===
     loro sono → two identical cards; è/sono/siamo would MISLEAD, mixing number vs person). STARE = 3 clean distinct
     forms io/uno/tanti, the estar-cognate, a first-taught irregular verb. ⚠ FENCE: rounds are LOCATION + «sta bene»
     ONLY (never state-adjectives — «sta stanco» is a Spanishism; standard = «è stanco»). */
  var FORMS_IT = ['sto', 'sta', 'stanno'];
  /* nl (#29 fan-out): the copula = ZIJN (ben/is/zijn) — the native Dutch «to be», 3 CLEAN distinct
     forms [ik / één ding / meer], the direct analogue of DE sein (bin/ist/sind) + EN (am/is/are). NO
     estar-substitute (Dutch has no ser/estar split). "bent" (jij, 2sg) is DELIBERATELY omitted to keep
     3 cards — like DE omits "du bist"; no round uses a jij/je subject. */
  var FORMS_NL = ['ben', 'is', 'zijn'];
  /* sv (#28 REBUILD): predicative adjective agreement — en-ord / ett-ord / flera.
     This triple is only the FALLBACK; every sv round carries its own `cards`. */
  var FORMS_SV = ['stor', 'stort', 'stora'];
  var FORMS_L10N = { de: FORMS_DE, fr: FORMS_FR, es: FORMS_ES, pt: FORMS_PT, it: FORMS_IT, nl: FORMS_NL, sv: FORMS_SV };
  /* ⚠⚠ TWO CALL SITES READ THIS, AND PATCHING ONLY ONE MIS-GRADES EVERY ROUND.
     setupTask() is the DISPLAY path; grading runs through vvmGrade() independently.
     Were setupTask to show round.cards while vvmGrade indexed FORMS_L10N[LANG], the
     child would be shown one triple and graded against another — a correct tap
     marked wrong. Both go through vvmForms(round). */
  function vvmForms(round) { return (round && round.cards) || FORMS_L10N[LANG] || Core.FORMS; }
  function vvmGrade(round, id) { return vvmForms(round)[id] === round.correct; }

  /* one table, not another ternary arm — the chain used to END in 'en-US', so a new
     locale would silently speak English rather than fail visibly. */
  var VOICE = { de: 'de-DE', fr: 'fr-FR', es: 'es-MX', pt: 'pt-BR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE', en: 'en-US' };
  function speak(text) {
    var voice = VOICE[LANG] || LANG || 'en-US';
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: voice, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = 0.95; u.lang = voice; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ⚠ the character's NAME, spoken to a screen-reader. Hard-coded English in all
     seven shipped locales; sv is repaired here, the other six stay filed. */
  var VOLE_LABEL = { en: 'Vera the vole', sv: 'Sorken Tuva' };
  function voleSVG() {
    return '<svg class="vvm-vole-svg" viewBox="0 0 100 100" role="img" aria-label="' + (VOLE_LABEL[LANG] || VOLE_LABEL.en) + '">' +
      '<ellipse cx="50" cy="62" rx="24" ry="20" fill="#9C8472"/>' +                /* body */
      '<circle cx="50" cy="38" r="16" fill="#B49C88"/>' +                          /* head */
      '<circle cx="40" cy="28" r="6" fill="#B49C88"/><circle cx="60" cy="28" r="6" fill="#B49C88"/>' + /* ears */
      '<circle cx="44" cy="37" r="2.3" fill="#2A2A35"/><circle cx="56" cy="37" r="2.3" fill="#2A2A35"/>' +
      '<ellipse cx="50" cy="44" rx="4" ry="3" fill="#5E4A3C"/>' +                  /* nose */
      '<path d="M50 47 v5" stroke="#5E4A3C" stroke-width="1.6"/>' +
      '<path d="M30 74 l-4 6 M44 78 l-2 6" stroke="#9C8472" stroke-width="5" stroke-linecap="round"/>' +
      '</svg>';
  }

  global.VeraVerbMatchActivity = {
    id: 'vera-verb-match-activity',

    strings: {
      title: { en: "Vera's Verb Match", de: 'Veras Verb-Werkstatt', fr: 'Vera et le verbe être', es: 'Vera y el verbo estar', pt: 'Vera e o verbo estar', it: 'Vera e il verbo stare', nl: "Vera's werkwoordwerkplaats", sv: 'Tuvas ordäng' },
      instruction: { en: 'Tap am, is, or are to match the subject.', de: 'Tippe die richtige Form: bin, ist oder sind.', fr: 'Touche la bonne forme : suis, est ou sont.', es: 'Toca la forma correcta: estoy, está o están.', pt: 'Toque na forma certa: estou, está ou estão.', it: 'Tocca la forma giusta: sto, sta, stanno.', nl: 'Tik de juiste vorm: ben, is of zijn.', sv: 'Läs meningen och tryck på ordet som passar.' },
      prompt: { en: 'Tap the verb that matches the subject.', de: 'Welche Form passt in den Satz?', fr: 'Quelle forme va dans la phrase ?', es: '¿Qué forma va en la oración?', pt: 'Qual forma completa a frase?', it: 'Quale forma completa la frase?', nl: 'Welke vorm past in de zin?', sv: 'Vilket ord passar i meningen?' },
      veraIntro: { en: 'AM goes with I, IS with one, ARE with many!', de: 'Merke: „bin" bei ich, „ist" bei einem, „sind" bei vielen!', fr: 'je → suis, un seul → est, plusieurs → sont', es: 'Recuerda: «estoy» con yo, «está» con uno, «están» con varios.', pt: 'Lembre: “estou” (eu), “está” (um), “estão” (vários).', it: 'Ricorda: «sto» io, «sta» uno, «stanno» tanti!', nl: 'Onthoud: ben bij ik, is bij één, zijn bij meer!', sv: 'En-ord: kall. Ett-ord: kallt. Flera: kalla!' },
      hintPick: { en: 'Is the subject I, one, or many? Pick am, is, or are.', de: 'Tippe zuerst auf bin, ist oder sind.', fr: 'Touche d’abord suis, est ou sont.', es: 'Toca primero estoy, está o están.', pt: 'Leia a frase e toque em uma forma!', it: 'Leggi la frase e tocca una forma!', nl: 'Tik eerst op ben, is of zijn.', sv: 'Läs meningen och tryck på ett ord!' },
      hintWrong: { en: 'Read the subject again — I → am, one → is, many → are.', de: 'Schau aufs Subjekt: einer oder viele? Probier es noch einmal!', fr: 'Regarde le sujet : un seul ou plusieurs ? Essaie encore !', es: 'Mira el sujeto: ¿uno o varios? ¡Inténtalo de nuevo!', pt: 'Olhe o sujeito de novo: um ou vários? Tente outra vez!', it: 'Guarda il soggetto: io, uno o tanti? Riprova!', nl: 'Kijk naar het onderwerp: één of meer? Probeer het nog eens!', sv: 'Titta på början av meningen: en-ord, ett-ord eller flera? Försök igen!' },
      win: { en: 'Yes! The verb matches the subject. 🌿', de: 'Super gemacht! Alle Sätze sind richtig. 🌿', fr: 'Bravo ! Toutes les phrases sont justes. 🌿', es: '¡Muy bien! Todas las oraciones están bien. 🌿', pt: 'Isso! O verbo combina com o sujeito. 🌿', it: 'Sì! Il verbo va d’accordo con il soggetto. 🌿', nl: 'Goed gedaan! Alle zinnen zijn goed. 🌿', sv: 'Ja! Ordet passar till början av meningen. 🌿' }
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
      var _lf = (round && round.cards) || FORMS_L10N[LANG];
      if (_lf) this.view.choices = _lf.map(function (f, i) { return { id: i, word: f }; });
      this._cards = shuffle(this.view.choices.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'vvm-wrap'); var root = api.el('div', 'vvm-root');
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;
      var selWord = null; if (self.sel != null) { for (var i = 0; i < v.choices.length; i++) { if (v.choices[i].id === self.sel) selWord = v.choices[i].word; } }

      var row = api.el('div', 'vvm-row');
      var vole = api.el('div', 'vvm-vole'); vole.innerHTML = voleSVG(); row.appendChild(vole);
      var say = api.el('div', 'vvm-say'); say.textContent = api.t('veraIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'vvm-sent');
      var b = api.el('span', 'vvm-txt'); b.textContent = v.before + ' '; sent.appendChild(b);
      var blank = api.el('span', 'vvm-blank' + (selWord ? ' vvm-filled' : '')); blank.textContent = selWord || '___'; sent.appendChild(blank);
      var a = api.el('span', 'vvm-txt'); a.textContent = ' ' + v.after; sent.appendChild(a);
      root.appendChild(sent);

      var opts = api.el('div', 'vvm-opts');
      this._cards.forEach(function (o) {
        var btn = api.el('button', 'vvm-opt' + (self.sel === o.id ? ' vvm-sel' : '')); btn.type = 'button';
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

    isCorrect: function () { return vvmGrade(this.round, this.sel); },
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
      fetch('/mini-tools/vera-verb-match-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[vera-verb-match] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.vvm-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,520px);margin:0 auto;}'
        + '.vvm-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2.4vw,16px);background:linear-gradient(180deg,#FBF3E4,#F1ECF4);border-radius:20px;padding:clamp(11px,2.6vw,18px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(120,100,150,.1);}'
        + '.vvm-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.vvm-vole{width:clamp(44px,9.5vw,58px);flex:0 0 auto;}.vvm-vole-svg{width:100%;height:auto;display:block;}'
        /* ⚠ THE BUBBLE CARRIES THE RULE, AND IN SPANISH IT WAS CLIPPED. `Recuerda: «estoy»
           con yo, «está» con uno, «están» con varios` needs three lines; a 2-line clamp at
           74% hid 16-17px — the last third of the rule — at 360 AND 412, in 64 of 192
           renders. Pre-existing and invisible until the sweep ran every locale: a clamp
           does not overflow, it just quietly stops. Widened and given the third line. */
        + '.vvm-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.vvm-sent{text-align:center;background:#fff;border:2px dashed rgba(155,111,176,.32);border-radius:13px;padding:clamp(10px,2.6vw,16px);font:700 clamp(15px,4vw,20px)/1.4 "Nunito",sans-serif;color:' + C.INK + ';max-width:94%;}'
        + '.vvm-blank{display:inline-block;min-width:48px;text-align:center;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:' + C.PLUM + ';border-bottom:3px solid rgba(155,111,176,.5);padding:0 4px;}'
        /* CHOSEN — plum, the gap's own colour. NOT coral: coral is this screen's
           try-again colour, and using it for a selection told the child they were
           wrong at the moment they committed. */
        + '.vvm-blank.vvm-filled{color:' + C.PLUM + ';border-bottom-color:' + C.PLUM + ';}'
        /* ⚠⚠ THE NEXT TWO MUST STAY AFTER .vvm-filled AND IN THIS ORDER. All three are
           two-class rules, so the cascade breaks every tie on SOURCE ORDER alone and a
           reordering reverts the meaning SILENTLY, with the class list still correct. */
        + '.vvm-blank.vvm-tried{color:' + C.CORAL2 + ';border-bottom-color:' + C.CORAL + ';}'
        + '.vvm-blank.vvm-right{color:' + C.WINTX + ';border-bottom-color:' + C.WIN + ';}'
        + '.vvm-opts{display:flex;flex-wrap:wrap;gap:clamp(8px,2.4vw,12px);justify-content:center;}'
        + '.vvm-opt{min-width:clamp(74px,22vw,104px);min-height:54px;padding:11px 18px;border-radius:14px;border:2px solid rgba(20,107,94,.24);background:#FFFDF8;color:' + C.INK + ';font:800 clamp(18px,4.8vw,23px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(130,110,150,.16);touch-action:manipulation;}'
        /* CHOSEN — no verdict. See .vvm-blank.vvm-filled above. */
        + '.vvm-opt.vvm-sel{border-color:' + C.PLUM + ';box-shadow:0 0 0 3px rgba(155,111,176,.32);background:#F7F2FA;color:#6B4A80;transform:translateY(-2px);}'
        /* WRONG, after Check — the coral now matches the coral the prompt turns, so the
           board and the heading finally say the SAME thing. This is the half of the
           defect the first pass missed: it fixed success and left the miss silent. */
        + '.vvm-opt.vvm-tried{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        /* RIGHT, after Check. ⚠⚠ LAST of the three, and it has to be. */
        + '.vvm-opt.vvm-right{border-color:' + C.WIN + ';box-shadow:0 0 0 3px rgba(46,125,70,.30);background:#F1FAF3;color:' + C.WINTX + ';transform:translateY(-2px);}'
        + '.vvm-opt:active{transform:translateY(1px);}'
        + '.vvm-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.vvm-root{gap:clamp(7px,1.7vw,12px);}.vvm-vole{width:clamp(40px,8vw,50px);}.vvm-opt{min-height:50px;}}'
        + '@media (max-height:700px){.vvm-root{gap:8px;padding:12px;}.vvm-row{display:none;}.vvm-sent{font-size:17px;padding:11px;}.vvm-blank{font-size:17px;}.vvm-opt{min-height:48px;padding:9px 15px;font-size:19px;}}'
        + '@media (max-height:640px){.vvm-root{gap:7px;padding:10px;}.vvm-sent{font-size:16px;}.vvm-opt{min-height:46px;font-size:18px;}}'
        /* ⭐ ≤400px: WIDTH, not type size. At 360 the sentence dropped its last word onto a
           line of its own in every frame checked, and a long triple (starka/starkt/stark)
           wrapped 2-then-1 — orphaning one of three PEER cards, which reads as a grouping
           that means something. Both are the box being narrower than its content, so the
           box gets wider and the horizontal padding tighter. The text is left alone: the
           sentence is the thing being read and the cards carry the answer. */
        + '@media (max-width:400px){'
        +   '.vvm-root{padding:11px 7px;}'
        +   '.vvm-sent{max-width:100%;padding:10px 7px;}'
        +   '.vvm-blank{min-width:40px;padding:0 3px;}'
        /* ⚠⚠ THE FIRST VERSION OF THIS RULE SET `min-width:0` AND BROKE FOUR LOCALES.
           A Swedish card says «starka»; an English one says «am». Dropping the width
           floor to fit the long word collapsed the short one to 36px — under the 44px
           tap minimum — in en/de/nl/es, 48-64 renders each, while sv stayed green. I
           tuned the layout against the locale in front of me. A THREE-COLUMN GRID is
           the deterministic answer: the row can never wrap, every card is the same
           width whatever the word, and the width is a share of the row rather than a
           function of the text — so no locale can push another below the floor. */
        +   '.vvm-opts{gap:7px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:100%;}'
        +   '.vvm-opt{min-width:0;padding:11px 4px;}'
        + '}'
        + '@media (max-width:380px){.vvm-opt{font-size:18px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-vera-verb-match', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'vera-verb-match.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) {
          var ok = vvmGrade(round, tool.sel);
          /* ⭐ ONE COLOUR MUST NOT MEAN BOTH THINGS. Before this, the correct card and the
             filled blank kept the coral .vvm-sel treatment on the win screen — the same
             coral a WRONG answer wears — so the board said the same thing either way and
             only the heading disagreed. Green on success; wrong stays coral; nothing is
             ever marked on a MISS, so the answer still never leaks. */
          var el = document.querySelector('.vvm-opt.vvm-sel');
          var bl = document.querySelector('.vvm-blank.vvm-filled');
          if (el) el.classList.add(ok ? 'vvm-right' : 'vvm-tried');
          if (bl) bl.classList.add(ok ? 'vvm-right' : 'vvm-tried');
          /* ⚠ marking the card the CHILD tapped reveals nothing about which card is
             right — the no-leak contract is unchanged, and the gates assert it. */
          return ok;
        },
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
