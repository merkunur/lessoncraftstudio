/* =====================================================================
   NUMBER BOND — MAKE-10 ACTIVITY   (number-bond-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the part-part-whole bond engine. Reuses
   number-bond-core.js for the bond/state. Task source:
   • ?activity=<id> → fetches number-bond-activities.json, finds the row,
     instantiates tasks from row.task_template + row.params.rounds.
   • no ?activity   → static demo set.

   task_template 'make-ten' — each round {whole, given, seed} renders a
   bond with `given` filled in one part; the child fills the other part to
   make the whole. answerType:'state' (the bond IS the answer surface);
   check() reads isCorrect(); on success the bond locks for the celebration.

   One coordinate: K.OA.A.4 (find the number that makes 10). VARIETY +
   SHUFFLE (§A.13.60): ≥7 distinct rounds (whole=10 fixed; the given part
   varies 1-9 → a different bond + missing part each) + a post-pass order-
   only reshuffle via the shell's `nextTask` contract (ZERO lcs-shell.js
   change).
   ===================================================================== */

/* 8 distinct given-parts (missing = 10 − given): a different bond each. */
var DEMO_ROUNDS = [
  { whole: 10, given: 7, seed: 11 },
  { whole: 10, given: 4, seed: 23 },
  { whole: 10, given: 9, seed: 31 },
  { whole: 10, given: 2, seed: 41 },
  { whole: 10, given: 6, seed: 53 },
  { whole: 10, given: 5, seed: 61 },
  { whole: 10, given: 8, seed: 67 },
  { whole: 10, given: 3, seed: 71 }
];

function makeRoundTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'prompt',
      promptArgs: { whole: r.whole },
      answerType: 'state',
      setup: function (tool) { tool.setupTask(r); },
      check: function (tool) {
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function () { return 'hintWrong'; }
    };
  });
}

var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

function _sameOrder(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function shuffledOrder(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do {
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  } while (_sameOrder(idx, prev));
  return idx;
}

window.NumberBondActivity = Object.assign({}, NumberBondCore, {
  id: 'number-bond-activity',
  strings: Object.assign({}, NumberBondCore.strings),

  init: function (api) {
    NumberBondCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) { this._loadActivity(); }
  },

  nextTask: function (opts) {
    var pool = (this._pool && this._pool.length) ? this._pool : STATIC_DEMO_TASKS;
    var n = pool.length;
    var i = (opts && opts.index) || 0;
    if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
      this._order = shuffledOrder(n, null);
      this._orderForPool = pool;
      this._curPass = 0;
    }
    var pass = (n > 0) ? Math.floor(i / n) : 0;
    if (pass > this._curPass) { this._order = shuffledOrder(n, this._order); this._curPass = pass; }
    return pool[this._order[i % n]];
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/number-bond-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self._pool = self._buildTasksFromRow(row);
      self._order = null;
      if (typeof window.LCS_reloadFirstTask === 'function') { window.LCS_reloadFirstTask(); }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[number-bond-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'make-ten') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      /* defensive: given 1..9, parts must be able to sum to the whole. */
      if (window.console && console.warn) {
        rounds.forEach(function (r, ri) {
          if (!(r.given >= 1 && r.given < (r.whole || 10))) console.warn('[number-bond-activity] round ' + ri + ' given ' + r.given + ' not in 1..' + ((r.whole || 10) - 1));
        });
      }
      return makeRoundTasks(rounds, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

NumberBondCore.injectCSS();
