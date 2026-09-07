/* =====================================================================
   PLACE VALUE — REGROUP ACTIVITY  (place-value-regroup-activity.js)
   ---------------------------------------------------------------------
   1.NBT.C.4 · add within 100, compose a ten. The lcs-shell skin over
   place-value-regroup-core.js (the array-activity Object.assign pattern).
   answerType:'number' (shell keypad). EN-ONLY-by-design (404 non-EN).

   Per round (e.g. 27 + 5): the core renders tens(a) rods + (ones(a)+b) cubes;
   the child taps "Make a ten" to bundle, then types the total on the keypad.
   The grade (Core.gradeAnswer) requires BOTH the correct total AND the bundle
   (onesCount<10) → the compose-a-ten action is load-bearing. Per-pass nextTask
   reshuffle (§A.13.60). 0 lines to any core / lcs-shell / game-shell.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.PlaceValueRegroupCore;

  /* Activity-layer narrow-viewport trim (0-core; the core owns `.pvr-maketen`).
     The pt button "Desagrupar uma centena" (break-hundred) is one char longer than
     the es/en labels and wraps at 320px → +9px cut-off. Higher-specificity @media
     (`.pvr-bar .pvr-maketen`) nudges the regroup button at ≤340px so it stays on one
     line. Locale-neutral: en/de/es/fr all pass at 320 already; a smaller button only
     helps them (tap-target min-height:44 is preserved). §A.13.62 layout-fix, not a
     threshold change. */
  if (typeof document !== 'undefined' && !document.getElementById('pvr-narrow-trim')) {
    var _pvrTrim = document.createElement('style');
    _pvrTrim.id = 'pvr-narrow-trim';
    _pvrTrim.textContent = '@media (max-width:340px){.pvr-bar .pvr-maketen{padding:9px 11px;font-size:.8rem;line-height:1;}}'
      /* Long nl column label "honderdtallen" (13 chars, vs de "Hunderter"/it "centinaia" ≤9) overflowed its
         1/3-width column box at ≤360px. Shrink the label to fit with nowrap; locale-neutral (only helps the
         long labels; short ones stay legible). Activity-layer, 0 lines to the core (which owns .pvr-col-label).
         §A.13.62 layout-fix, not a threshold change. */
      + '@media (max-width:400px){.pvr-col .pvr-col-label{white-space:nowrap;font-size:clamp(.44rem,2.0vw,.72rem);letter-spacing:-.2px;}}';
    (document.head || document.documentElement).appendChild(_pvrTrim);
  }

  /* canonical pool: 8 GENUINELY DIFFERENT compose-a-ten sums (ones(a)+b ≥ 10,
     a+b ≤ 99) — distinct sums + varied ones, every round composes one ten. */
  var DEMO_ROUNDS = [
    { id: 'r-27-5', a: 27, b: 5 },
    { id: 'r-48-6', a: 48, b: 6 },
    { id: 'r-36-7', a: 36, b: 7 },
    { id: 'r-19-4', a: 19, b: 4 },
    { id: 'r-55-8', a: 55, b: 8 },
    { id: 'r-63-9', a: 63, b: 9 },
    { id: 'r-74-8', a: 74, b: 8 },
    { id: 'r-28-6', a: 28, b: 6 }
  ];

  function makeRoundTasks(rounds, idPrefix) {
    return rounds.map(function (r) {
      var round = { a: r.a, b: r.b };
      return {
        id: idPrefix + '.' + (r.id || (r.a + '-' + r.b)),
        promptKey: 'taskAdd',
        promptArgs: { a: r.a, b: r.b },
        answerType: 'number',
        answerMin: 0,
        answerMax: 99,
        setup: function (tool) { tool.setupTask({ a: r.a, b: r.b, operation: 'add', places: 2 }); },
        check: function (tool, answer) {
          var ok = Core.gradeAnswer(round, answer, tool.onesCount);
          if (ok) tool.lockAndCaption();
          return ok;
        },
        hintKey: function (tool) { return tool.onesCount >= 10 ? 'hintBundleFirst' : 'hintReadTotal'; }
      };
    });
  }

  /* 2.NBT.B.7 — 3-digit subtraction, decompose a ten. Each round { id, a (minuend),
     b (subtrahend) } with ones(a) < b (a borrow is required), tens(a) ≥ 1 (single
     break), hundreds(a) ≤ 4 + tens(a) ≤ 5 (the 3-column mat fits 320). */
  function makeSubtractTasks(rounds, idPrefix) {
    return rounds.map(function (r) {
      var round = { a: r.a, b: r.b };
      return {
        id: idPrefix + '.' + (r.id || (r.a + '-' + r.b)),
        promptKey: 'taskSub',
        promptArgs: { a: r.a, b: r.b },
        answerType: 'number',
        answerMin: 0,
        answerMax: 999,
        setup: function (tool) { tool.setupTask({ a: r.a, b: r.b, operation: 'subtract', places: 3 }); },
        check: function (tool, answer) {
          var ok = Core.gradeSubtract(round, answer, tool._decomposed);
          if (ok) tool.lockAndCaption();
          return ok;
        },
        hintKey: function (tool) { return tool._decomposed ? 'hintReadTotal' : 'hintBreakFirst'; }
      };
    });
  }

  /* 2.NBT.B.7 — 3-digit addition, compose a hundred. Each round { id, a, b } with
     b a multiple of 10 and tens(a)+b/10 ∈ [10,13] (one hundred is composed). */
  function makeHundredTasks(rounds, idPrefix) {
    return rounds.map(function (r) {
      var round = { a: r.a, b: r.b };
      return {
        id: idPrefix + '.' + (r.id || (r.a + '-' + r.b)),
        promptKey: 'taskAdd',
        promptArgs: { a: r.a, b: r.b },
        answerType: 'number',
        answerMin: 0,
        answerMax: 999,
        setup: function (tool) { tool.setupTask({ a: r.a, b: r.b, operation: 'add', places: 3 }); },
        check: function (tool, answer) {
          var ok = Core.gradeAddHundred(round, answer, tool.tensCount);
          if (ok) tool.lockAndCaption();
          return ok;
        },
        hintKey: function (tool) { return tool.tensCount >= 10 ? 'hintMakeHundredFirst' : 'hintReadTotal'; }
      };
    });
  }

  /* 2.NBT.B.7 — 3-digit subtraction, decompose a hundred (double borrow). Each
     round { id, a, b } with tens(a)=0 and ones(a)<b → break a hundred, then a ten. */
  function makeBreakHundredTasks(rounds, idPrefix) {
    return rounds.map(function (r) {
      var round = { a: r.a, b: r.b };
      return {
        id: idPrefix + '.' + (r.id || (r.a + '-' + r.b)),
        promptKey: 'taskSub',
        promptArgs: { a: r.a, b: r.b },
        answerType: 'number',
        answerMin: 0,
        answerMax: 999,
        setup: function (tool) { tool.setupTask({ a: r.a, b: r.b, operation: 'subtract', places: 3 }); },
        check: function (tool, answer) {
          var ok = Core.gradeSubtract(round, answer, tool._decomposed);
          if (ok) tool.lockAndCaption();
          return ok;
        },
        hintKey: function (tool) {
          if (tool._decomposed) return 'hintReadTotal';
          return tool.tensCount < 1 ? 'hintBreakHundredFirst' : 'hintBreakTenNext';
        }
      };
    });
  }

  var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

  /* the shell reads tool.strings.title/instruction at MOUNT (before init), so the
     per-activity title is chosen SYNCHRONOUSLY from ?activity (the array-activity
     equal-groups pattern; zero shell touch). */
  var _PVR_ID = (typeof window !== 'undefined' && window.location) ? (new URLSearchParams(window.location.search)).get('activity') : null;
  function _pvrTitle(id) {
    id = id || '';
    if (/add-compose-hundred/.test(id)) return { title: { en: 'Tuck Makes a Hundred', de: 'Tuck bündelt einen Hunderter', fr: 'Tuck fait une centaine', es: 'Tuck forma una centena', pt: 'Tuck agrupa uma centena', it: 'Tuck forma un centinaio', nl: 'Tuck maakt een honderdtal', sv: 'Tuck gör ett hundratal' }, instruction: { en: 'Tap “Make a hundred” to bundle 10 tens, then type the total.', de: 'Tippe auf „Hunderter bündeln“, um 10 Zehner zu bündeln, und tippe dann das Ergebnis ein.', fr: 'Appuie sur « Grouper une centaine » pour faire un paquet de 10 dizaines, puis écris la réponse.', es: 'Toca «Formar una centena» para agrupar 10 decenas y luego escribe el total.', pt: 'Toque em «Agrupar uma centena» para juntar 10 dezenas e depois escreva o total.', it: 'Tocca «Forma un centinaio» per unire 10 decine, poi scrivi il totale.', nl: 'Tik op «Maak een honderdtal» om 10 tientallen te bundelen en typ dan het totaal.', sv: 'Tryck på ”Gör ett hundratal” så blir tio tiotal ett hundratal. Skriv sedan svaret.' } };
    if (/subtract-decompose-hundred/.test(id)) return { title: { en: 'Tuck Breaks a Hundred', de: 'Tuck entbündelt einen Hunderter', fr: 'Tuck casse une centaine', es: 'Tuck desarma una centena', pt: 'Tuck desagrupa uma centena', it: 'Tuck scompone un centinaio', nl: 'Tuck splitst een honderdtal', sv: 'Tuck växlar ett hundratal' }, instruction: { en: 'Break a hundred, then a ten — then take some away and type the answer.', de: 'Entbündle einen Hunderter, dann einen Zehner – nimm dann welche weg und tippe das Ergebnis ein.', fr: 'Casse une centaine, puis une dizaine — enlève, puis écris la réponse.', es: 'Desarma una centena y luego una decena. Después quita algunas unidades y escribe la respuesta.', pt: 'Desagrupe uma centena e depois uma dezena. Em seguida, tire algumas unidades e escreva a resposta.', it: 'C\'è uno zero: scomponi un centinaio, poi una decina, poi togli e scrivi la risposta.', nl: 'Splits een honderdtal en dan een tiental — haal er dan een paar weg en typ het antwoord.', sv: 'Växla ett hundratal och sedan ett tiotal — ta bort och skriv svaret.' } };
    if (/subtract/.test(id)) return { title: { en: 'Tuck Breaks a Ten', de: 'Tuck entbündelt einen Zehner', fr: 'Tuck casse une dizaine', es: 'Tuck desarma una decena', pt: 'Tuck desagrupa uma dezena', it: 'Tuck scompone una decina', nl: 'Tuck splitst een tiental', sv: 'Tuck växlar ett tiotal' }, instruction: { en: 'Tap “Break a ten”, then take some away and type the answer.', de: 'Tippe auf „Zehner entbündeln“, nimm dann welche weg und tippe das Ergebnis ein.', fr: 'Appuie sur « Casser une dizaine », enlève, puis écris la réponse.', es: 'Toca «Desarmar una decena», quita algunas unidades y escribe la respuesta.', pt: 'Toque em «Desagrupar uma dezena», tire algumas unidades e escreva a resposta.', it: 'Tocca «Scomponi una decina», poi togli alcune unità e scrivi la risposta.', nl: 'Tik op «Splits een tiental», haal er dan een paar weg en typ het antwoord.', sv: 'Tryck på ”Växla ett tiotal”, ta sedan bort och skriv svaret.' } };
    return {};   /* add-compose-ten → strings.title/instruction (en+de below) */
  }
  var _PVR_TITLE = _pvrTitle(_PVR_ID);

  /* Engine-string overrides (native ensembles). Merged over Core.strings in the
     activity below → 0 lines to the core. DE verb pair bündeln/entbündeln; FR
     verb pair grouper/casser (échange décimal; CP pedagogue + linguist). compose-
     ten exercises these this round; the break/hundred keys are authored ready for
     the deferred 3 within-1000 variants (DE Klasse 3 / FR CE2). */
  /* es-MX — native ensemble (lingüista + pedagoga de 1º, planes y programas SEP).
     Botones: "Formar una decena/centena" (agrupar) + "Desarmar una decena/centena"
     (desarmar = deshacer reversible, no "romper"); concepto = agrupar / suma con
     reagrupación. Valor posicional: unidades/decenas/centenas. Comillas angulares « ». */
  /* it — native ensemble (linguista + pedagoga classe seconda, Indicazioni nazionali). Bottone
     «Fai il cambio» = il cambio concreto del materiale (⚠ NON «il riporto» = l'algoritmo in colonna,
     stadio successivo). Valore posizionale: unità/decine/centinaia (⚠ «decina» NON lo spagnolo
     «decena»). Blocchi = «blocchi base dieci» (NON «materiale dorato» = Montessori). Classe seconda. */
  /* sv — native ensemble (lingvist + lågstadielärare + innehållsredaktör, Lgr22).
     MÄTT mot hela sv-korpusen, och mätningen avgjorde en tvist mellan två paneler:
       • Knapparna heter ”Gör ett tiotal” / ”Växla ett tiotal” därför att systertoolet
         place-value-lab redan SKICKAR exakt de orden som BARNKNAPPAR på alla elva
         språk. ⚠ Ordet ”bunta” finns bara i det verktygets INSTÄLLNINGSLÅDA, alltså
         lärartext — och man buntar sugrör med gummiband, man växlar tiobasmaterial.
       • ⚠ Om DENNA knapp hette ”Växla ett tiotal” vore den teckenidentisk med
         systerverktygets DELA-knapp, fast med motsatt betydelse.
       • ⚠ ”tia” undviks: en tia är i första hand ett TIOKRONORSMYNT, och på en matta
         utan pengar läser ett sjuårigt barn det bokstavligt. Lgr22-ordet är tiotal.
       • ⚠ ”minnessiffra” och ”uppställning” är BANNLYSTA här — de hör till den
         skriftliga algoritmen, samma gräns som den italienska panelen drog
         («fai il cambio» ≠ «il riporto»).
     ental/tiotal/hundratal är neutrum UTAN pluraländelse (ett tiotal, tre tiotal),
     så srMat behöver ingen numerusmaskineri. Citattecken: ”…” på båda sidor. */
  var _PVR_DE = {
    title:        { en: "Tuck's Ten Bundles", de: 'Tuck bündelt einen Zehner', fr: 'Tuck fait une dizaine', es: 'Tuck forma una decena', pt: 'Tuck agrupa uma dezena', it: 'Tuck fa il cambio', nl: 'Tuck maakt een tiental', sv: 'Tuck gör ett tiotal' },
    instruction:  { en: 'Tap “Make a ten” to bundle 10 ones, then type the total.', de: 'Tippe auf „Zehner bündeln“, um 10 Einer zu bündeln, und tippe dann das Ergebnis ein.', fr: 'Appuie sur « Grouper une dizaine » pour faire un paquet de 10 unités, puis écris la réponse.', es: 'Toca «Formar una decena» para agrupar 10 unidades y luego escribe el total.', pt: 'Toque em «Agrupar uma dezena» para juntar 10 unidades e depois escreva o total.', it: 'Tocca «Fai il cambio» per cambiare 10 unità con una decina, poi scrivi il totale.', nl: 'Tik op «Maak een tiental» om 10 eenheden te bundelen en typ dan het totaal.', sv: 'Tryck på ”Gör ett tiotal” så blir tio ental ett tiotal. Skriv sedan svaret.' },
    colHundreds:  { en: 'hundreds', de: 'Hunderter', fr: 'centaines', es: 'centenas', pt: 'centenas', it: 'centinaia', nl: 'honderdtallen', sv: 'hundratal' },
    colTens:      { en: 'tens', de: 'Zehner', fr: 'dizaines', es: 'decenas', pt: 'dezenas', it: 'decine', nl: 'tientallen', sv: 'tiotal' },
    colOnes:      { en: 'ones', de: 'Einer', fr: 'unités', es: 'unidades', pt: 'unidades', it: 'unità', nl: 'eenheden', sv: 'ental' },
    makeTen:      { en: '🔁 Make a ten', de: '🔁 Zehner bündeln', fr: '🔁 Grouper une dizaine', es: '🔁 Formar una decena', pt: '🔁 Agrupar uma dezena', it: '🔁 Fai il cambio', nl: '🔁 Maak een tiental', sv: '🔁 Gör ett tiotal' },
    makeHundred:  { en: '🔁 Make a hundred', de: '🔁 Hunderter bündeln', fr: '🔁 Grouper une centaine', es: '🔁 Formar una centena', pt: '🔁 Agrupar uma centena', it: '🔁 Forma un centinaio', nl: '🔁 Maak een honderdtal', sv: '🔁 Gör ett hundratal' },
    breakTen:     { en: '🔁 Break a ten', de: '🔁 Zehner entbündeln', fr: '🔁 Casser une dizaine', es: '🔁 Desarmar una decena', pt: '🔁 Desagrupar uma dezena', it: '🔁 Scomponi una decina', nl: '🔁 Splits een tiental', sv: '🔁 Växla ett tiotal' },
    breakHundred: { en: '🔁 Break a hundred', de: '🔁 Hunderter entbündeln', fr: '🔁 Casser une centaine', es: '🔁 Desarmar una centena', pt: '🔁 Desagrupar uma centena', it: '🔁 Scomponi un centinaio', nl: '🔁 Splits een honderdtal', sv: '🔁 Växla ett hundratal' },
    hintBundleFirst:       { en: 'First tap “Make a ten” to bundle 10 ones!', de: 'Tippe zuerst auf „Zehner bündeln“, um 10 Einer zu bündeln!', fr: 'Appuie d\'abord sur « Grouper une dizaine » pour faire un paquet de 10 !', es: '¡Primero toca «Formar una decena» para agrupar 10 unidades!', pt: 'Primeiro toque em «Agrupar uma dezena» para juntar 10 unidades!', it: 'Prima tocca «Fai il cambio» per cambiare 10 unità con una decina!', nl: 'Tik eerst op «Maak een tiental» om 10 eenheden te bundelen!', sv: 'Tryck först på ”Gör ett tiotal” — tio ental blir ett tiotal!' },
    hintMakeHundredFirst:  { en: 'First tap “Make a hundred” to bundle 10 tens!', de: 'Tippe zuerst auf „Hunderter bündeln“, um 10 Zehner zu bündeln!', fr: 'Appuie d\'abord sur « Grouper une centaine » pour faire un paquet de 10 dizaines !', es: '¡Primero toca «Formar una centena» para agrupar 10 decenas!', pt: 'Primeiro toque em «Agrupar uma centena» para juntar 10 dezenas!', it: 'Prima tocca «Forma un centinaio»: 10 decine formano un centinaio!', nl: 'Tik eerst op «Maak een honderdtal» om 10 tientallen te bundelen!', sv: 'Tryck först på ”Gör ett hundratal” — tio tiotal blir ett hundratal!' },
    hintBreakFirst:        { en: 'Break a ten first — there aren’t enough ones to take away.', de: 'Entbündle zuerst einen Zehner – es sind nicht genug Einer zum Wegnehmen da.', fr: 'Il n\'y a pas assez d\'unités pour enlever. Casse d\'abord une dizaine !', es: 'Primero desarma una decena: no hay suficientes unidades para quitar.', pt: 'Desagrupe uma dezena primeiro — não há unidades suficientes para tirar.', it: 'Prima scomponi una decina: non ci sono abbastanza unità da togliere.', nl: 'Splits eerst een tiental — er zijn niet genoeg eenheden om weg te halen.', sv: 'Entalen räcker inte — växla ett tiotal först.' },
    hintBreakHundredFirst: { en: 'No tens to break — tap “Break a hundred” first.', de: 'Hier gibt es keine Zehner – tippe zuerst auf „Hunderter entbündeln“.', fr: 'Il n\'y a pas de dizaine à casser — appuie d\'abord sur « Casser une centaine ».', es: 'No hay decenas para desarmar; primero toca «Desarmar una centena».', pt: 'Não há dezenas para desagrupar; toque primeiro em «Desagrupar uma centena».', it: 'Non ci sono decine da scomporre: tocca prima «Scomponi un centinaio».', nl: 'Er zijn geen tientallen om te splitsen — tik eerst op «Splits een honderdtal».', sv: 'Här finns inga tiotal att växla. Tryck först på ”Växla ett hundratal”.' },
    hintBreakTenNext:      { en: 'Now tap “Break a ten” to get enough ones.', de: 'Tippe jetzt auf „Zehner entbündeln“, damit du genug Einer hast.', fr: 'Casse une dizaine pour avoir 10 unités de plus, puis enlève.', es: 'Ahora toca «Desarmar una decena» para tener suficientes unidades.', pt: 'Agora toque em «Desagrupar uma dezena» para ter unidades suficientes.', it: 'Ora tocca «Scomponi una decina» per avere abbastanza unità.', nl: 'Tik nu op «Splits een tiental» zodat je genoeg eenheden hebt.', sv: 'Tryck nu på ”Växla ett tiotal” så räcker entalen.' },
    hintReadTotal:         { en: 'Now count the blocks and type the total.', de: 'Zähle jetzt alle Blöcke und tippe das Ergebnis ein.', fr: 'Maintenant, compte tous les blocs et écris le total.', es: 'Ahora cuenta los bloques y escribe el total.', pt: 'Agora conte os blocos e escreva o total.', it: 'Ora conta i blocchi e scrivi il totale.', nl: 'Tel nu alle blokken en typ het totaal.', sv: 'Hur många tiotal och ental har du nu? Skriv svaret.' },
    srMat:        { en: '{t} tens and {o} ones', de: '{t} Zehner und {o} Einer', fr: '{t} dizaines et {o} unités', es: '{t} decenas y {o} unidades', pt: '{t} dezenas e {o} unidades', it: '{t} decine e {o} unità', nl: '{t} tientallen en {o} eenheden', sv: '{t} tiotal och {o} ental' }
  };

  /* order-only Fisher–Yates (array-activity contract): guaranteed ≠ prev when n≥2 */
  function _sameOrder(a, b) { if (!b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (_sameOrder(idx, prev));
    return idx;
  }

  global.PlaceValueRegroupActivity = Object.assign({}, Core, {
    id: 'place-value-regroup-activity',

    strings: Object.assign({}, Core.strings, _PVR_DE, {
      taskAdd: { en: '{a} + {b} = ?' },
      taskSub: { en: '{a} − {b} = ?' }
    }, _PVR_TITLE),

    /* Locale-aware string lookup — OVERRIDES the core's `_t` (which read the
       nonexistent `api.locale`; the shell exposes `api.lang`). 0 core lines. */
    _t: function (key) {
      var loc = (this.api && this.api.lang) || 'en';
      var s = this.strings[key];
      return (s && (s[loc] || s.en)) || key;
    },

    /* ⚠ ONE table, read by BOTH the spoken result and the screen-reader mirror.
       It used to be an inline ternary chain inside lockAndCaption only, and I
       enumerated what that actually produced for all eleven locales:
         es (LIVE) spoke "27 plus 5 MAKES 32" — English verb AND English operator
         nl (LIVE) spoke "27 plus 5 MAKES 32" — English verb, and "minus" where
                   Dutch says "min"
         sv would have been the third.
       Meanwhile the core's _srMirror hardcodes its own ' plus '/' minus ', so the
       two channels disagreed in fr/it/pt/es. Swedish is accidentally correct there
       — plus and minus ARE the Swedish words — which is exactly why this kept
       surviving review. Duplicate state is what let them drift; now there is one.
       Only panel-vetted words are listed; every unlisted locale keeps ' plus ' /
       ' minus ' / ' makes ' exactly as before. */
    _SPOKEN: {
      en: { add: ' plus ', sub: ' minus ', verb: ' makes ' },
      de: { add: ' plus ', sub: ' minus ', verb: ' macht ' },
      fr: { add: ' plus ', sub: ' moins ', verb: ' font ' },
      pt: { add: ' mais ', sub: ' menos ', verb: ' dá ' },
      it: { add: ' più ',  sub: ' meno ',  verb: ' fa ' },
      /* es-MX panel: the copula "es igual a" is invariant. ⚠ NOT the folk form
         "son" — it is plural and breaks on a result of 1 ("son uno" is wrong). */
      es: { add: ' más ',  sub: ' menos ', verb: ' es igual a ' },
      /* nl panel: "min", never "minus" (Latinate, not used in Dutch primary maths). */
      nl: { add: ' plus ', sub: ' min ',   verb: ' is ' },
      /* sv: both Swedish panels proposed "blir" independently — the BECOMES verb
         that de fills with "macht", fr with "font", it with "fa". "är" is stiffer. */
      sv: { add: ' plus ', sub: ' minus ', verb: ' blir ' }
    },
    _spoken: function () { return this._SPOKEN[(this.api && this.api.lang) || 'en'] || this._SPOKEN.en; },

    /* OVERRIDES the core's lockAndCaption to localize the SPOKEN result (the core
       hardcoded English „… makes …" + lang:'en'). The on-screen caption stays the
       language-neutral symbol form. 0 core lines. */
    lockAndCaption: function () {
      this.readOnly = true;
      this.render();
      var sub = this.operation === 'subtract';
      var loc = (this.api && this.api.lang) || 'en';
      var stage = this.api && this.api.stage;
      var wrap = stage && stage.querySelector('.pvr-cap');
      if (wrap) wrap.textContent = this.a + (sub ? ' − ' : ' + ') + this.b + ' = ' + this._target;
      if (global.LCSAudio && global.LCSAudio.speak) {
        var sp = this._spoken();
        var op = sub ? sp.sub : sp.add;
        try { global.LCSAudio.speak({ type: 'number', text: this.a + op + this.b + sp.verb + this._target, lang: loc, rate: 0.95 }); } catch (e) {}
      }
    },

    /* OVERRIDES the core's _srMirror, which builds the screen-reader paragraph with
       its OWN hardcoded English ' plus ' / ' minus ' (core:334) and is reached by
       every locale. A blind French child heard "27 plus 5" inside an otherwise
       French sentence. Same table as the spoken result, so the two channels can no
       longer disagree. 0 core lines. */
    _srMirror: function () {
      var wrap = this._el('div', 'pvr-sronly'); wrap.setAttribute('aria-live', 'polite');
      var sp = this._spoken();
      var op = (this.operation === 'subtract') ? sp.sub : sp.add;
      wrap.innerHTML = '<p>' + this.a + op + this.b + '. ' +
        this._t('srMat').replace('{t}', this.tensCount).replace('{o}', this.onesCount) + '.</p>';
      return wrap;
    },

    /* NO `tasks` property → shell calls nextTask() → we own the per-pass reshuffle. */
    init: function (api) {
      Core.init.call(this, api);
      this._pool = STATIC_DEMO_TASKS;
      this._order = null; this._curPass = 0; this._orderForPool = null;
      var params = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : STATIC_DEMO_TASKS;
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
        this._order = shuffledOrder(n, null); this._orderForPool = pool; this._curPass = 0;
      }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = shuffledOrder(n, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      var tries = ['/mini-tools/place-value-regroup-activities.json', 'place-value-regroup-activities.json', '../mini tools/place-value-regroup-activities.json'];
      (function attempt(k) {
        if (k >= tries.length) return;
        fetch(tries[k]).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (rows) {
            var row = rows.find(function (x) { return x.id === self._activityId; }) || rows[0];
            self._activityRow = row;
            self._pool = self._buildTasksFromRow(row);
            self._order = null;
            if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          }).catch(function () { attempt(k + 1); });
      }(0));
    },

    _buildTasksFromRow: function (row) {
      if (row && row.task_template === 'add-compose-ten') {
        var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
        return makeRoundTasks(rounds, row.id);
      }
      if (row && row.task_template === 'subtract-decompose') {
        var srounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
        return makeSubtractTasks(srounds, row.id);
      }
      if (row && row.task_template === 'add-compose-hundred') {
        var hrounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
        return makeHundredTasks(hrounds, row.id);
      }
      if (row && row.task_template === 'subtract-decompose-hundred') {
        var brounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
        return makeBreakHundredTasks(brounds, row.id);
      }
      return STATIC_DEMO_TASKS;
    }
  });

  Core.injectCSS();

}(typeof window !== 'undefined' ? window : this));
