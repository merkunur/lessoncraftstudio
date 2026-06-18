/* =====================================================================
   ARRAY — BUILD & COUNT ACTIVITY   (array-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the build-an-array engine. Reuses array-core.js
   for the grid/strip/state. Task source depends on the URL:

   • ?activity=<id>  → fetches array-activities.json, finds the row,
                        instantiates tasks from row.task_template +
                        row.params.rounds.
   • no ?activity    → falls back to a static demo set.

   task_template 'build-array' — for each round in params.rounds (a
   {rows, cols, seed} spec) build a "make R rows of C, find the total"
   task. answerType:'number' (the shell renders the keypad; the tool's own
   stage = the array + repeated-addition strip). check() compares the
   entered total to rows×cols; on success the board locks (readOnly) so the
   celebration is stable.

   One coordinate lives on this wrapper: 2.OA.C.4 (rectangular arrays,
   total as a sum of equal addends). Its params.rounds is the exercise POOL.

   VARIETY + SHUFFLE (CLAUDE.md §A.13.60): the pool has ≥7 ORIGINAL distinct
   rounds (each a genuinely different array — a different R×C rectangle,
   total, and equation, not one board reshuffled), and after a full pass the
   order RESHUFFLES (order-only — same validated rounds, never new
   dimensions) so no two consecutive passes share a sequence. The reshuffle
   lives here via the shell's `nextTask` contract — ZERO change to
   lcs-shell.js.
   ===================================================================== */

/* The canonical pool: 8 GENUINELY DIFFERENT arrays (§A.13.60 — the variety
   is the changing R×C rectangle + total, not a reshuffle of one board).
   All within 2.OA.C.4's "up to 5 rows × up to 5 columns" (total ≤ 25), with
   a wide/tall contrast (3×4 AND 4×3) so rows≠columns is felt. */
var DEMO_ROUNDS = [
  { rows: 2, cols: 3, seed: 11 },
  { rows: 3, cols: 4, seed: 23 },
  { rows: 4, cols: 2, seed: 31 },
  { rows: 2, cols: 5, seed: 41 },
  { rows: 3, cols: 3, seed: 53 },
  { rows: 5, cols: 2, seed: 61 },
  { rows: 4, cols: 4, seed: 67 },
  { rows: 4, cols: 3, seed: 71 }
];

function makeRoundTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'prompt',
      promptArgs: { rows: r.rows, cols: r.cols },
      answerType: 'number',
      answerMin: 0,
      answerMax: 25,                    // the 5×5 ceiling — lets wrong guesses in, blocks absurd ones
      setup: function (tool) { tool.setupTask(r); },
      check: function (tool, answer) {
        var ok = (answer === tool.total());   // total === rows × cols
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function () { return 'hintRecount'; }
    };
  });
}

/* EQUAL-GROUPS (#2): each round { groups, each, seed }; the child fills N
   discrete groups of M, the strip assembles M + M + … and the keypad answers
   the total (groups × each). Same tap-fill/strip/keypad path as build-array. */
function makeGroupTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptGroups',
      promptArgs: { groups: r.groups, each: r.each },
      answerType: 'number',
      answerMin: 0,
      answerMax: 25,
      setup: function (tool) { tool.setupTask({ mode: 'equal-groups', groups: r.groups, each: r.each, seed: r.seed }); },
      check: function (tool, answer) {
        var ok = (answer === tool.total());   // total === groups × each
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function () { return 'hintGroups'; }
    };
  });
}

/* Fallback static task pool when no ?activity= is given. */
var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

/* The shell reads tool.strings.title/instruction at MOUNT (before init), so the
   per-activity title must be chosen SYNCHRONOUSLY from ?activity (the E3 #2 /
   money #2 pattern; zero lcs-shell touch). equal-groups → swap titleGroups/
   instructionGroups in. */
var _ARR_ACTIVITY_ID = (typeof window !== 'undefined' && window.location)
  ? (new URLSearchParams(window.location.search)).get('activity') : null;
var _ARR_IS_GROUPS = /equal-groups/.test(_ARR_ACTIVITY_ID || '');

/* Order-only Fisher–Yates over n indices. When `prev` is given (and n≥2),
   the result is GUARANTEED to differ from prev (the per-pass "never the same
   sequence twice" requirement). n<2 is a no-op. */
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

window.ArrayActivity = Object.assign({}, ArrayCore, {
  id: 'array-activity',

  /* Inherit the core's 11-locale strings; for equal-groups, swap the title +
     instruction to the groups variants synchronously (shell reads them at mount). */
  strings: Object.assign({}, ArrayCore.strings, _ARR_IS_GROUPS ? {
    title: ArrayCore.strings.titleGroups,
    instruction: ArrayCore.strings.instructionGroups
  } : {}),

  /* NO `tasks` property → the shell calls our nextTask() for ordering, so we
     own the per-pass reshuffle (CLAUDE.md §A.13.60). Pool resolved lazily:
     by ?activity=<id> if present, else the static demo. */

  init: function (api) {
    ArrayCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  /* Shell ordering hook (see fractions-activity.js for the full contract):
     builds a shuffled order over the pool; rebuilds when the pool length/ref
     changes (demo→manifest swap); RESHUFFLES (≠ previous) on a forward pass
     boundary. Order-only — every served round is a pre-validated spec. */
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
    if (pass > this._curPass) {
      this._order = shuffledOrder(n, this._order);
      this._curPass = pass;
    }
    return pool[this._order[i % n]];
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/array-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self._pool = self._buildTasksFromRow(row);
      self._order = null;   // force nextTask to rebuild the order for the new pool
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[array-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'build-array') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      /* defensive: every round must be within 2.OA.C.4's 2..5 × 2..5 bounds
         (an out-of-range dimension would be off-grade / overflow the grid). */
      if (window.console && console.warn) {
        rounds.forEach(function (r, ri) {
          if (!(r.rows >= 2 && r.rows <= 5 && r.cols >= 2 && r.cols <= 5)) {
            console.warn('[array-activity] round ' + ri + ' dims ' + r.rows + '×' + r.cols + ' outside 2..5');
          }
        });
      }
      return makeRoundTasks(rounds, row.id);
    }
    if (row.task_template === 'equal-groups') {
      var grounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
      /* defensive: groups + each within 2..5 (on-grade, total ≤ 25, fits the layout). */
      if (window.console && console.warn) {
        grounds.forEach(function (r, ri) {
          if (!(r.groups >= 2 && r.groups <= 5 && r.each >= 2 && r.each <= 5)) {
            console.warn('[array-activity] equal-groups round ' + ri + ' dims ' + r.groups + '×' + r.each + ' outside 2..5');
          }
        });
      }
      return makeGroupTasks(grounds, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

ArrayCore.injectCSS();
