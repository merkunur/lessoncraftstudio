/* =====================================================================
   HAZEL'S WORD BRIDGE — ACTIVITY  (hazel-word-bridge-activity.js)
   ---------------------------------------------------------------------
   CCSS L.1.1.g — conjunctions. Hazel the heron bridges two ideas; the child
   reads a two-clause sentence with a "___" and taps the joining word that
   fits. Validity DERIVED by conjunction-core.js (RELATION_CONJ; never a stored
   literal; no-answer-leak). answerType:'state' → tap a chip, shell Check
   grades; a wrong tap gives a DIFFUSE nudge. Per-pass reshuffle + the 4 chips
   shuffle per render (no position cue). Text + SVG char stub (CA5 later). No
   timer/score/streak. 0 lines to any core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.ConjunctionCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var LANG = 'en';
  var REL_CONJ_DE = { addition: 'und', alternative: 'oder', contrast: 'aber', cause: 'denn' };
  var CHIPS_DE = ['und', 'oder', 'aber', 'denn'];
  var REL_CONJ_FR = { addition: 'et', alternative: 'ou', contrast: 'mais', cause: 'car' };
  var CHIPS_FR = ['et', 'ou', 'mais', 'car'];
  var REL_CONJ_ES = { addition: 'y', alternative: 'o', contrast: 'pero', cause: 'porque' };
  var CHIPS_ES = ['y', 'o', 'pero', 'porque'];
  var REL_CONJ_PT = { addition: 'e', alternative: 'ou', contrast: 'mas', cause: 'porque' };
  var CHIPS_PT = ['e', 'ou', 'mas', 'porque'];
  // it (#29 native ensemble): the four basic congiunzioni for classe terza — e / o / ma / perché.
  // ⚠ ACUTE é on «perché» (all oxytone -ché words take acute; «perchè» is the classic error).
  var REL_CONJ_IT = { addition: 'e', alternative: 'o', contrast: 'ma', cause: 'perché' };
  var CHIPS_IT = ['e', 'o', 'ma', 'perché'];
  // nl (#30 fan-out): the four nevenschikkende voegwoorden — en / of / maar / want. ⚠ «want» = the
  // COORDINATING causal (V2 order «want het regent»), the true parallel of DE «denn» / FR «car» —
  // NOT the subordinating «omdat» (verb-final). Direct analogue of de und/oder/aber/denn.
  var REL_CONJ_NL = { addition: 'en', alternative: 'of', contrast: 'maar', cause: 'want' };
  var CHIPS_NL = ['en', 'of', 'maar', 'want'];
  /* sv (#29): och/eller/men/för — four uncontroversial SAMORDNANDE KONJUNKTIONER that behave
     identically (no inversion after any of them, none can front its own clause), so the child forms
     ONE rule and it holds.
     ⚠ `så` is deliberately NOT here. It is a konjunktionellt adverb, not a coordinator; it is the
     worst-behaved small word in Swedish (result / degree / manner / the verb "så" / the resumptive
     filler in «När det regnade, SÅ stannade vi hemma»); and it is unusable *because `och` is in the
     set* — a result frame accepts `och` AND reverse-`för` («Det blev mörkt ___ vi gick in» = because
     we went inside), i.e. three live chips. The English pool has that same hole and does not enforce
     uniqueness; sv follows the six localized decks instead, on Swedish grounds.
     ⭐⭐ The causal is `för`, not `eftersom`, and BIFF is what decides it: a Swedish SUBORDINATE clause
     puts the sentence adverbial before the finite verb («eftersom det INTE regnade»), but this engine
     prints ONE fixed frame and swaps only the chip. Any clause 2 with a post-verbal `inte`/`ändå`/
     `också` would make an `eftersom` chip render ILL-FORMED Swedish as the CORRECT answer. Those are
     exactly the adverbs the sv rounds use to force uniqueness, so the deck requires a coordinator. */
  var REL_CONJ_SV = { addition: 'och', alternative: 'eller', contrast: 'men', cause: 'för' };
  var CHIPS_SV = ['och', 'eller', 'men', 'för'];
  /* ⚠⚠ A LOCALE MUST APPEAR IN BOTH MAPS. Ship roundsL10n.<loc> while missing REL_CONJ_<LOC> and
     hwbOracle() falls through to the English core, which returns '' for relation 'alternative' — so
     NO chip is ever correct, with no error, no console warning and a normal-looking screen. */
  var REL_CONJ_L10N = { de: REL_CONJ_DE, fr: REL_CONJ_FR, es: REL_CONJ_ES, pt: REL_CONJ_PT, it: REL_CONJ_IT, nl: REL_CONJ_NL, sv: REL_CONJ_SV };
  var CHIPS_L10N = { de: CHIPS_DE, fr: CHIPS_FR, es: CHIPS_ES, pt: CHIPS_PT, it: CHIPS_IT, nl: CHIPS_NL, sv: CHIPS_SV };
  function hwbOracle(round) { var m = REL_CONJ_L10N[LANG]; return m ? (m[round.relation] || '') : Core.oracle(round); }
  function hwbIsAnswer(round, str) { return str === hwbOracle(round); }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    /* ⚠ The SpeechSynthesis branch below is effectively DEAD CODE: lcs-shell.js always exports
       global.LCSAudio, and its own ttsLang() already maps sv -> 'sv-SE'. The sv arm is added for
       consistency, not as a fix. The LIVE arm is the LCSAudio one. */
    var voice = VOICE[LANG] || LANG || 'en-US';
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: voice, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = voice; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* one table, not a seventh ternary arm — the chain ENDED IN ENGLISH, so any new locale silently
     had the word "blank" read aloud in the middle of its own sentence. */
  var GAPWORD = { de: 'Lücke', fr: 'trou', es: 'espacio', pt: 'lacuna', it: 'spazio', nl: 'gaatje', sv: 'lucka', en: 'blank' };
  var SPEAK_LABEL = { de: 'Satz anhören', fr: 'écouter la phrase', es: 'escuchar la oración', pt: 'ouvir a frase', it: 'ascolta la frase', nl: 'de zin beluisteren', sv: 'lyssna på meningen', en: 'hear the sentence' };
  /* ⚠ the character's NAME, spoken to a screen-reader. It was hard-coded English in ALL SEVEN
     shipped locales, with no localization chain at all; sv is repaired here, the rest stay filed. */
  var HERON_LABEL = { sv: 'Hägern Vide', en: 'Hazel the heron' };
  var VOICE = { de: 'de-DE', fr: 'fr-FR', es: 'es-MX', pt: 'pt-BR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE', en: 'en-US' };
  function sayable(s) { return String(s || '').replace(/___/g, GAPWORD[LANG] || GAPWORD.en); }

  function heronSVG(mood) {
    var happy = mood === 'happy';
    var eye = happy ? '<path d="M52 30 q3 -3 6 0" stroke="#2A2A35" stroke-width="2" fill="none" stroke-linecap="round"/>' : '<circle cx="55" cy="31" r="2.4" fill="#2A2A35"/>';
    return '<svg class="hwb-heron-svg" viewBox="0 0 100 100" role="img" aria-label="' + (HERON_LABEL[LANG] || HERON_LABEL.en) + '">' +
      '<ellipse cx="42" cy="66" rx="24" ry="16" fill="#8AA6BD"/>' +              /* body */
      '<path d="M46 56 q4 -22 12 -28" stroke="#9DB6CA" stroke-width="9" fill="none" stroke-linecap="round"/>' +  /* neck */
      '<circle cx="56" cy="30" r="11" fill="#9DB6CA"/>' +                        /* head */
      eye +
      '<path d="M66 30 L86 33 L66 36 Z" fill="#F2A03B"/>' +                       /* long beak */
      '<path d="M40 82 L40 92 M50 82 L50 92" stroke="#C8A05A" stroke-width="3" stroke-linecap="round"/>' +   /* legs */
      '</svg>';
  }

  global.HazelWordBridgeActivity = {
    id: 'hazel-word-bridge-activity',

    strings: {
      title: { en: "Hazel's Word Bridge", de: 'Hazels Wortbrücke', fr: 'Le pont des mots de Hazel', es: 'El puente de palabras de Hazel', pt: 'A ponte de palavras da Hazel', it: 'Il ponte di parole di Hazel', nl: 'Hazels woordbrug', sv: 'Vides ordbro' },
      prompt: { en: 'Which joining word fits?', de: 'Welches Bindewort passt?', fr: 'Quel mot de liaison va bien ?', es: '¿Qué palabra une las dos partes?', pt: 'Qual palavrinha de ligação combina?', it: 'Quale parolina di collegamento va bene?', nl: 'Welk verbindingswoord past?', sv: 'Vilket bindeord passar i meningen?' },
      hazelIntro: { en: 'A joining word bridges the two ideas!', de: 'Ein Bindewort schlägt eine Brücke zwischen den zwei Sätzen!', fr: 'Un mot de liaison fait un pont entre les deux phrases !', es: 'Algunas palabras son como un puente: unen las dos partes de la oración.', pt: 'Uma palavrinha de ligação faz a ponte entre as duas ideias!', it: 'Una parolina fa da ponte tra le due idee!', nl: 'Een verbindingswoord slaat een brug tussen de twee zinnen!', sv: 'Ett ord kan bygga en bro mellan två tankar.' },
      theAsk: { en: 'Which word joins the two parts?', de: 'Welches Wort verbindet die zwei Teile?', fr: 'Quel mot relie les deux parties ?', es: '¿Qué palabra va con el sentido?', pt: 'Qual palavra combina com o sentido?', it: 'Quale parola unisce le due idee?', nl: 'Welk woord verbindt de twee delen?', sv: 'Välj ordet som saknas.' },
      hintPick: { en: 'Tap the joining word that makes sense!', de: 'Tippe auf ein Bindewort, das in die Lücke passt.', fr: 'Touche le mot de liaison qui va dans le trou.', es: 'Toca la palabra que une las dos partes con sentido.', pt: 'Toque na palavra que liga as duas partes com sentido!', it: 'Tocca la parola di collegamento che ha senso!', nl: 'Tik op een verbindingswoord dat in het gaatje past.', sv: 'Prova ett ord i luckan. Hur låter det då?' },
      hintWrong: { en: "That joining word doesn't fit — read it again.", de: 'Lies den ganzen Satz noch einmal. Welches Wort passt zur Bedeutung?', fr: 'Relis toute la phrase : quel mot va avec le sens ?', es: 'Lee otra vez toda la oración. ¿Qué palabra tiene sentido aquí?', pt: 'Leia a frase toda de novo — qual palavrinha combina com o sentido?', it: 'Rileggi tutta la frase — quale parola ha senso qui?', nl: 'Lees de hele zin nog een keer. Welk woord past bij de betekenis?', sv: 'Vad gör den andra delen med den första?' },
      win: { en: 'Yes! That word bridges the two ideas. 🌉', de: 'Stark gemacht! Du hast die richtige Brücke gebaut! 🌉', fr: 'Bravo ! Tu as construit le bon pont ! 🌉', es: '¡Muy bien! Uniste las dos partes con el puente correcto. 🌉', pt: 'Muito bem! Você ligou as duas partes com a ponte certa. 🌉', it: 'Sì! Hai unito le due idee con il ponte giusto. 🌉', nl: 'Goed gedaan! Je hebt de juiste brug gebouwd! 🌉', sv: 'Snyggt! Nu står alla broar stadigt. 🌉' }
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
      this.round = round; this.view = Core.childView(round); this.sel = null; this._spoke = false;
      var _c = CHIPS_L10N[LANG]; if (_c) this.view.chips = _c.slice();
      this._chips = shuffle(this.view.chips.slice());
    },

    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'hwb-wrap'); var root = api.el('div', 'hwb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var self = this, v = this.view;

      var row = api.el('div', 'hwb-row');
      var bird = api.el('div', 'hwb-heron'); bird.setAttribute('data-mood', this.sel ? 'happy' : 'idle'); bird.innerHTML = heronSVG(this.sel ? 'happy' : 'idle'); row.appendChild(bird);
      var say = api.el('div', 'hwb-say'); say.textContent = api.t('hazelIntro'); row.appendChild(say);
      root.appendChild(row);

      var sent = api.el('div', 'hwb-sent');
      var txt = api.el('span', 'hwb-senttxt'); txt.textContent = v.sentence; sent.appendChild(txt);
      var sp = api.el('button', 'hwb-spk'); sp.type = 'button'; sp.setAttribute('aria-label', SPEAK_LABEL[LANG] || SPEAK_LABEL.en); sp.textContent = '🔊';
      sp.addEventListener('click', function () { speak(sayable(v.sentence)); }); sent.appendChild(sp);
      root.appendChild(sent);

      var ask = api.el('div', 'hwb-ask'); ask.textContent = api.t('theAsk'); root.appendChild(ask);

      var chips = api.el('div', 'hwb-chips');
      this._chips.forEach(function (w) {
        var b = api.el('button', 'hwb-chip' + (self.sel === w ? ' hwb-sel' : '')); b.type = 'button'; b.setAttribute('data-w', w);
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

    isCorrect: function () { return this.sel != null && hwbIsAnswer(this.round, this.sel); },
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
      fetch('/mini-tools/hazel-word-bridge-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[hazel-word-bridge] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.hwb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.hwb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#FBF3E4,#E6EEF2);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.hwb-row{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.hwb-heron{width:clamp(42px,9.5vw,54px);flex:0 0 auto;}.hwb-heron-svg{width:100%;height:auto;display:block;}'
        /* ⚠ THE BUBBLE CARRIES THE RULE, AND TWO LOCALES CLIPPED IT. A 2-line clamp at 78%
           hid 16px of the German «Ein Bindewort schlägt eine Brücke zwischen den zwei
           Sätzen!» and of the Spanish line at 360px — 32 and 40 renders. A clamp does not
           overflow, it just quietly stops, so nothing ever reported it. Pre-existing in all
           seven shipped locales; the identical defect to the sibling deck's Spanish bubble. */
        + '.hwb-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.1vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:84%;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}'
        /* ⚠⚠ THIS BORDER USED TO BE GOLD — THE SAME GOLD THAT NOW MEANS "I CHOSE THIS".
           I picked gold for the selected chip *because* it matched this panel, and called that
           semantic. The visual critic showed it is the opposite: this outline is on screen
           permanently, in every state including the opening frame, at roughly four times the
           size of the chip ring — so the verdict colour was competing with a larger, constant,
           meaningless instance of itself. A signal colour has to be EXCLUSIVE to the signal. */
        + '.hwb-sent{display:flex;align-items:center;gap:8px;background:#FFFDF6;border:2px solid rgba(20,107,94,.20);border-radius:13px;padding:9px 13px;}'
        + '.hwb-senttxt{flex:1;min-width:0;font:700 clamp(14px,3.6vw,18px)/1.3 "Nunito",sans-serif;color:' + C.INK + ';}'
        /* ⚠⚠ 34px SHIPPED IN ALL SEVEN LOCALES AND IS UNDER THE 44px K-2 TAP FLOOR.
           This is the button a child presses to hear the sentence read aloud — the one
           control a struggling reader needs most — and it failed the tap gate in every
           round, every phase and every viewport, in English too (288 findings). It went
           unseen because this activity had no visual-qa phase driver until sv #29, so only
           the opening frame had ever been photographed.
           ⚠ It is measured only BY ACCIDENT: `.hwb-chip` matches none of the harness's
           answer-card conventions, so `cards` is 0 and the convention-independent FALLBACK
           engages and happens to catch this button. Add `-chip` to that selector and this
           control stops being measured at all — see the filed note in the sv #29 plan. */
        + '.hwb-spk{flex:0 0 auto;width:44px;height:44px;border-radius:12px;border:0;background:#EAF2EE;font-size:19px;cursor:pointer;touch-action:manipulation;}'
        /* ⚠ AND THIS LINE USED TO BE CORAL — the wrong-answer colour, on a line that never
           signals an error, in EVERY state. On the green celebration frame a coral line was
           still telling the child to go and choose the missing word: a stale instruction, in
           the alarm colour, under a success heading. Neutral now, and hidden once the round
           is answered (see the check hook). */
        + '.hwb-ask{text-align:center;font:800 clamp(11.5px,2.9vw,13.5px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.hwb-chips{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,10px);justify-content:center;}'
        /* ⚠⚠ NO min-width SHIPPED, AND THREE LOCALES' CHIPS ARE ONE CHARACTER LONG.
           es `y`/`o`, pt `e`, it `e`/`o` rendered ~40px wide — under the 44px K-2 tap floor —
           in 48 of 192 renders each, while en/de/fr/nl/sv passed because their shortest
           conjunction happens to be two or three letters. A control sized by its TEXT gets a
           different size in every language, and the shortest word loses; the floor has to be
           declared. (Same lesson as the sibling deck, where dropping a width floor to fit a
           long Swedish word collapsed «am» to 36px in four locales.) */
        + '.hwb-chip{min-height:48px;min-width:48px;padding:9px 16px;border-radius:14px;border:2px solid rgba(20,107,94,.28);background:#fff;color:' + C.T + ';font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(160,120,60,.16);touch-action:manipulation;}'
        /* CHOSEN — gold, the sentence card's own border colour. NOT coral: coral is this
           screen's try-again colour, and using it for a selection told the child they were
           wrong at the very moment they committed. */
        + '.hwb-chip.hwb-sel{border-color:' + C.GOLD + ';box-shadow:0 0 0 3px rgba(232,165,58,.34);background:#FFF9EC;color:#8A5A12;transform:translateY(-2px);}'
        /* ⚠⚠ THE NEXT TWO MUST STAY AFTER .hwb-sel AND IN THIS ORDER. All three are two-class
           rules, so the cascade breaks every tie on SOURCE ORDER alone — reorder them and the
           meaning reverts SILENTLY, with the class list still perfectly correct. */
        + '.hwb-chip.hwb-tried{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.34);background:#FFF6F1;color:' + C.CORAL2 + ';transform:translateY(-2px);}'
        + '.hwb-chip.hwb-right{border-color:' + C.GOOD + ';box-shadow:0 0 0 3px rgba(47,165,106,.30);background:#F1FAF4;color:#1B6B45;transform:translateY(-2px);}'
        + '.hwb-chip:active{transform:translateY(1px);}'
        + '.hwb-spk:focus-visible,.hwb-chip:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '@media (max-height:920px){.hwb-root{gap:clamp(4px,1.1vw,7px);}.hwb-heron{width:clamp(40px,8vw,48px);}}'
        + '@media (max-height:700px){.hwb-root{gap:4px;}.hwb-heron{width:clamp(36px,7vw,44px);}.hwb-sent{padding:7px 11px;}.hwb-senttxt{font-size:15px;}.hwb-chip{min-height:46px;padding:8px 14px;font-size:16px;}}'
        + '@media (max-height:640px){.hwb-root{gap:3px;padding:6px;}.hwb-row{display:none;}.hwb-sent{padding:6px 10px;}.hwb-senttxt{font-size:14px;}.hwb-chip{min-height:44px;padding:7px 12px;font-size:15px;}}'
        + '@media (max-width:380px){.hwb-root{gap:4px;padding:7px;}.hwb-senttxt{font-size:14px;}.hwb-chip{font-size:16px;padding:8px 13px;}}'
        + '@media (prefers-reduced-motion: reduce){.hwb-chip{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-hazel-word-bridge', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'hazel-word-bridge.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) {
          var ok = tool.isCorrect();
          /* ⭐ ONE COLOUR MUST NOT MEAN BOTH THINGS. Until this build the chosen chip kept its
             coral treatment through Check, so the "I picked this" frame and the "this is wrong"
             frame were pixel-identical and only the heading disagreed. Gold = chosen, coral =
             wrong, green = right. ⚠ Only the TAPPED chip is ever marked, so a miss still never
             reveals which chip was right — the no-leak contract is unchanged. */
          var el = document.querySelector('.hwb-chip.hwb-sel');
          if (el) el.classList.add(ok ? 'hwb-right' : 'hwb-tried');
          /* the ask line is an instruction, and the round is over — leaving "choose the missing
             word" under a celebration heading is a contradictory screen. */
          var ask = document.querySelector('.hwb-ask');
          if (ask && ok) ask.style.visibility = 'hidden';
          return ok;
        },
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
