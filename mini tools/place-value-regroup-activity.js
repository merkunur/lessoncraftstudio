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
    if (/add-compose-hundred/.test(id)) return { title: { en: 'Tuck Makes a Hundred' }, instruction: { en: 'Tap “Make a hundred” to bundle 10 tens, then type the total.' } };
    if (/subtract-decompose-hundred/.test(id)) return { title: { en: 'Tuck Breaks a Hundred' }, instruction: { en: 'Break a hundred, then a ten — then take some away and type the answer.' } };
    if (/subtract/.test(id)) return { title: { en: 'Tuck Breaks a Ten' }, instruction: { en: 'Tap “Break a ten”, then take some away and type the answer.' } };
    return {};   /* add-compose-ten → core default "Tuck's Ten Bundles" */
  }
  var _PVR_TITLE = _pvrTitle(_PVR_ID);

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

    strings: Object.assign({}, Core.strings, {
      taskAdd: { en: '{a} + {b} = ?' },
      taskSub: { en: '{a} − {b} = ?' }
    }, _PVR_TITLE),

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
