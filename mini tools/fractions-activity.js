/* =====================================================================
   FRACTIONS — ACTIVITY   (fractions-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the partition engine. Reuses fractions-core.js
   for the DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches fractions-activities.json, finds the row,
                         instantiates tasks from row.task_template +
                         row.params.rounds.
   • no ?activity     → falls back to a static demo set (the
                         /mini-tools/fractions-activity.html direct-load
                         shows the same kind of partition board).

   task_template 'partition-equal-shares' — for each round in
   params.rounds (a {shape, n, cut, seed} spec), build a "Cut into N
   equal parts" task. answerType:'state' (the tool's own SVG IS the
   answer surface; the shell renders no keypad/choices and leaves Check
   enabled). check() reads FractionsCore.isCorrect() — committed cut set
   must EXACTLY equal the correct set; on success the board locks
   (readOnly) so the celebration state is stable.

   Two coordinates live on this wrapper: 1.G.A.3 (halves + fourths) and
   2.G.A.3 (thirds). Each is a manifest row whose params.rounds is the
   exercise POOL.

   VARIETY + SHUFFLE (CLAUDE.md §A.13.60 standing rule): each pool has
   ≥7 ORIGINAL distinct rounds, and after the child completes a full pass
   the order RESHUFFLES (order-only — same validated rounds, never new
   geometry) so no two consecutive passes share a sequence. The reshuffle
   lives here in the wrapper via the shell's `nextTask` contract (the
   shell hands ordering fully to the tool when `tasks` is absent) — ZERO
   change to the protected lcs-shell.js, and it subsumes the shell's
   per-mount shuffle (fresh order each mount + a fresh order each pass).
   ===================================================================== */

/* The canonical pool: rect/square/circle × halves & fourths, every cut
   exact-by-construction (centre line / even fraction / diameter through
   centre), every candidate tap target ≥36px even at 280px. 8 distinct
   rounds (≥7 floor). Used for the direct-load demo AND as the manifest
   fallback; the per-activity pool comes from the manifest. */
var DEMO_ROUNDS = [
  { shape: 'rect',   n: 2, cut: 'v',    seed: 11 },
  { shape: 'circle', n: 2, cut: 'v',    seed: 23 },
  { shape: 'square', n: 2, cut: 'h',    seed: 31 },
  { shape: 'rect',   n: 2, cut: 'h',    seed: 59 },
  { shape: 'square', n: 2, cut: 'v',    seed: 61 },
  { shape: 'square', n: 4, cut: 'grid', seed: 37 },
  { shape: 'rect',   n: 4, cut: 'grid', seed: 67 },
  { shape: 'circle', n: 4, cut: 'grid', seed: 41 }
];

function makeRoundTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    var promptKey = (r.n === 4) ? 'promptFourths' : (r.n === 3) ? 'promptThirds' : 'promptHalves';
    /* the halves "through the middle" wording is wrong for thirds → route
       n=3 wrong-set hints to the thirds-specific key. */
    var notEqualKey = (r.n === 3) ? 'hintNotEqualThirds' : 'hintNotEqual';
    return {
      id: idPrefix + '.round-' + i,
      promptKey: promptKey,
      answerType: 'state',
      setup: function (tool) { tool.setupTask(r); },
      check: function (tool) {
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function (tool) {
        var made = tool._committedCount();
        var need = tool.correctIds.length;
        if (made === 0)    return 'hintTapLine';
        if (made < need)   return 'hintMoreCuts';
        if (made > need)   return 'hintTooManyCuts';
        return notEqualKey;   /* right count, wrong set → off-position cut */
      }
    };
  });
}

/* Fallback static task pool when no ?activity= is given. */
var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

/* Order-only Fisher–Yates over n indices. When `prev` is given (and n≥2),
   the result is GUARANTEED to differ from prev (the per-pass "never the
   same sequence twice" requirement). n<2 is a no-op (no reshuffle possible). */
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

window.FractionsActivity = Object.assign({}, FractionsCore, {
  id: 'fractions-activity',

  /* Inherit the core's 11-locale strings (title / instruction / prompts /
     hints / sr nouns). No activity-only strings beyond the core's. */
  strings: Object.assign({}, FractionsCore.strings),

  /* NO `tasks` property → the shell calls our nextTask() for ordering, so
     we own the per-pass reshuffle (CLAUDE.md §A.13.60). Pool resolved
     lazily: by ?activity=<id> if present, else the static demo. */

  init: function (api) {
    FractionsCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;   // replaced by the manifest pool on load
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  /* Shell ordering hook: returns the round for the i-th completed task.
     Builds a shuffled order over the pool; rebuilds it when the pool
     length/ref changes (demo→manifest swap); RESHUFFLES (≠ previous) when
     the pass index advances. Driven off the pass TRANSITION, not call
     count, so the repeated getTask(0) at mount + LCS_reloadFirstTask is
     idempotent and pass-1 order stays stable. Order-only — every served
     task is a pre-validated _lines round (geometry stays measured-equal). */
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
    if (pass > this._curPass) {   // FORWARD pass boundary only → reshuffle ≠ previous
      this._order = shuffledOrder(n, this._order);   // (a lower/equal index never reshuffles — the
      this._curPass = pass;                          //  reload path rebuilds via _order=null, so index 0 is idempotent)
    }
    return pool[this._order[i % n]];
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/fractions-activities.json').then(function (r) {
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
      if (window.console && console.warn) console.warn('[fractions-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'partition-equal-shares') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      return makeRoundTasks(rounds, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

FractionsCore.injectCSS();
