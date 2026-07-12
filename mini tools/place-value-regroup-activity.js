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
    if (/add-compose-hundred/.test(id)) return { title: { en: 'Tuck Makes a Hundred', de: 'Tuck bündelt einen Hunderter', fr: 'Tuck fait une centaine', es: 'Tuck forma una centena' }, instruction: { en: 'Tap “Make a hundred” to bundle 10 tens, then type the total.', de: 'Tippe auf „Hunderter bündeln", um 10 Zehner zu bündeln, und tippe dann das Ergebnis ein.', fr: 'Appuie sur « Grouper une centaine » pour faire un paquet de 10 dizaines, puis écris la réponse.', es: 'Toca «Formar una centena» para agrupar 10 decenas y luego escribe el total.' } };
    if (/subtract-decompose-hundred/.test(id)) return { title: { en: 'Tuck Breaks a Hundred', de: 'Tuck entbündelt einen Hunderter', fr: 'Tuck casse une centaine', es: 'Tuck desarma una centena' }, instruction: { en: 'Break a hundred, then a ten — then take some away and type the answer.', de: 'Entbündle einen Hunderter, dann einen Zehner – nimm dann welche weg und tippe das Ergebnis ein.', fr: 'Casse une centaine, puis une dizaine — enlève, puis écris la réponse.', es: 'Desarma una centena y luego una decena. Después quita algunas unidades y escribe la respuesta.' } };
    if (/subtract/.test(id)) return { title: { en: 'Tuck Breaks a Ten', de: 'Tuck entbündelt einen Zehner', fr: 'Tuck casse une dizaine', es: 'Tuck desarma una decena' }, instruction: { en: 'Tap “Break a ten”, then take some away and type the answer.', de: 'Tippe auf „Zehner entbündeln", nimm dann welche weg und tippe das Ergebnis ein.', fr: 'Appuie sur « Casser une dizaine », enlève, puis écris la réponse.', es: 'Toca «Desarmar una decena», quita algunas unidades y escribe la respuesta.' } };
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
  var _PVR_DE = {
    title:        { en: "Tuck's Ten Bundles", de: 'Tuck bündelt einen Zehner', fr: 'Tuck fait une dizaine', es: 'Tuck forma una decena' },
    instruction:  { en: 'Tap “Make a ten” to bundle 10 ones, then type the total.', de: 'Tippe auf „Zehner bündeln", um 10 Einer zu bündeln, und tippe dann das Ergebnis ein.', fr: 'Appuie sur « Grouper une dizaine » pour faire un paquet de 10 unités, puis écris la réponse.', es: 'Toca «Formar una decena» para agrupar 10 unidades y luego escribe el total.' },
    colHundreds:  { en: 'hundreds', de: 'Hunderter', fr: 'centaines', es: 'centenas' },
    colTens:      { en: 'tens', de: 'Zehner', fr: 'dizaines', es: 'decenas' },
    colOnes:      { en: 'ones', de: 'Einer', fr: 'unités', es: 'unidades' },
    makeTen:      { en: '🔁 Make a ten', de: '🔁 Zehner bündeln', fr: '🔁 Grouper une dizaine', es: '🔁 Formar una decena' },
    makeHundred:  { en: '🔁 Make a hundred', de: '🔁 Hunderter bündeln', fr: '🔁 Grouper une centaine', es: '🔁 Formar una centena' },
    breakTen:     { en: '🔁 Break a ten', de: '🔁 Zehner entbündeln', fr: '🔁 Casser une dizaine', es: '🔁 Desarmar una decena' },
    breakHundred: { en: '🔁 Break a hundred', de: '🔁 Hunderter entbündeln', fr: '🔁 Casser une centaine', es: '🔁 Desarmar una centena' },
    hintBundleFirst:       { en: 'First tap “Make a ten” to bundle 10 ones!', de: 'Tippe zuerst auf „Zehner bündeln", um 10 Einer zu bündeln!', fr: 'Appuie d\'abord sur « Grouper une dizaine » pour faire un paquet de 10 !', es: '¡Primero toca «Formar una decena» para agrupar 10 unidades!' },
    hintMakeHundredFirst:  { en: 'First tap “Make a hundred” to bundle 10 tens!', de: 'Tippe zuerst auf „Hunderter bündeln", um 10 Zehner zu bündeln!', fr: 'Appuie d\'abord sur « Grouper une centaine » pour faire un paquet de 10 dizaines !', es: '¡Primero toca «Formar una centena» para agrupar 10 decenas!' },
    hintBreakFirst:        { en: 'Break a ten first — there aren’t enough ones to take away.', de: 'Entbündle zuerst einen Zehner – es sind nicht genug Einer zum Wegnehmen da.', fr: 'Il n\'y a pas assez d\'unités pour enlever. Casse d\'abord une dizaine !', es: 'Primero desarma una decena: no hay suficientes unidades para quitar.' },
    hintBreakHundredFirst: { en: 'No tens to break — tap “Break a hundred” first.', de: 'Hier gibt es keine Zehner – tippe zuerst auf „Hunderter entbündeln".', fr: 'Il n\'y a pas de dizaine à casser — appuie d\'abord sur « Casser une centaine ».', es: 'No hay decenas para desarmar; primero toca «Desarmar una centena».' },
    hintBreakTenNext:      { en: 'Now tap “Break a ten” to get enough ones.', de: 'Tippe jetzt auf „Zehner entbündeln", damit du genug Einer hast.', fr: 'Casse une dizaine pour avoir 10 unités de plus, puis enlève.', es: 'Ahora toca «Desarmar una decena» para tener suficientes unidades.' },
    hintReadTotal:         { en: 'Now count the blocks and type the total.', de: 'Zähle jetzt alle Blöcke und tippe das Ergebnis ein.', fr: 'Maintenant, compte tous les blocs et écris le total.', es: 'Ahora cuenta los bloques y escribe el total.' },
    srMat:        { en: '{t} tens and {o} ones', de: '{t} Zehner und {o} Einer', fr: '{t} dizaines et {o} unités', es: '{t} decenas y {o} unidades' }
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
        var op = sub ? (loc === 'fr' ? ' moins ' : ' minus ') : ' plus ';   /* „plus"/„minus" read by de+en TTS; fr subtract → „moins" */
        var verb = loc === 'fr' ? ' font ' : loc === 'de' ? ' macht ' : ' makes ';
        try { global.LCSAudio.speak({ type: 'number', text: this.a + op + this.b + verb + this._target, lang: loc, rate: 0.95 }); } catch (e) {}
      }
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
