/* =====================================================================
   SORT BY SIDES — ACTIVITY   (sort-bins-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the drag-to-bin engine. Reuses sort-bins-core.js
   for the DOM/drag/state. Task source depends on the URL:

   • ?activity=<id>   → fetches sort-bins-activities.json, finds the row,
                         instantiates tasks from row.task_template +
                         row.params.rounds.
   • no ?activity     → falls back to a static demo set (the
                         /mini-tools/sort-bins-activity.html direct-load
                         shows the same kind of sorting board).

   task_template 'sort-by-sides' — for each round in params.rounds (a
   {bins, items, seed} spec) build a "sort the pile" task. answerType:'state'
   (the tool's own board IS the answer surface; the shell renders no
   keypad/choices and leaves Check enabled). check() paints per-tile marks
   via FractionsCore-style review() then reads isCorrect(); on success the
   board locks (readOnly) so the celebration state is stable.

   One coordinate lives on this wrapper: 2.G.A.1 (classify triangles /
   quadrilaterals / pentagons / hexagons). Its params.rounds is the
   exercise POOL.

   VARIETY + SHUFFLE (CLAUDE.md §A.13.60 standing rule): the pool has ≥7
   ORIGINAL distinct rounds (each a genuinely different sorting challenge —
   a different BIN SET + a different SHAPE PILE, not the same bins+shapes
   reshuffled), and after the child completes a full pass the order
   RESHUFFLES (order-only — same validated rounds, never new shapes/bins) so
   no two consecutive passes share a sequence. The reshuffle lives here in the
   wrapper via the shell's `nextTask` contract (the shell hands ordering fully
   to the tool when `tasks` is absent) — ZERO change to lcs-shell.js.
   ===================================================================== */

/* The canonical pool: 8 GENUINELY DIFFERENT sorting rounds (§A.13.60 — the
   variety is the changing bin set + shape mix, not a reshuffle of one board).
   Each round's items all have a matching bin (asserted in _buildTasksFromRow).
   Used for the direct-load demo AND the manifest fallback; the per-activity
   pool comes from the manifest row. */
var DEMO_ROUNDS = [
  { bins: ['triangle', 'quadrilateral', 'pentagon'],            items: ['tri_equi', 'tri_right', 'quad_square', 'quad_rect', 'pent_reg', 'pent_house'],            seed: 11 },
  { bins: ['triangle', 'quadrilateral', 'hexagon'],             items: ['tri_equi', 'tri_obtuse', 'quad_rhombus', 'quad_trap', 'hex_reg', 'hex_irreg'],            seed: 23 },
  { bins: ['quadrilateral', 'pentagon', 'hexagon'],             items: ['quad_square', 'quad_para', 'pent_reg', 'pent_house', 'hex_reg', 'hex_irreg'],              seed: 31 },
  { bins: ['triangle', 'quadrilateral'],                        items: ['tri_equi', 'tri_right', 'tri_obtuse', 'quad_square', 'quad_rect', 'quad_rhombus', 'quad_trap'], seed: 41 },
  { bins: ['triangle', 'quadrilateral', 'pentagon', 'hexagon'], items: ['tri_equi', 'quad_trap', 'pent_reg', 'hex_reg', 'quad_rect', 'hex_irreg'],                  seed: 53 },
  { bins: ['triangle', 'pentagon'],                             items: ['tri_equi', 'tri_right', 'tri_obtuse', 'pent_reg', 'pent_house'],                           seed: 61 },
  { bins: ['quadrilateral', 'hexagon'],                         items: ['quad_square', 'quad_rect', 'quad_rhombus', 'hex_reg', 'hex_irreg'],                        seed: 67 },
  { bins: ['triangle', 'quadrilateral', 'pentagon', 'hexagon'], items: ['tri_obtuse', 'quad_para', 'pent_house', 'hex_irreg', 'quad_rect', 'pent_reg'],            seed: 71 }
];

function makeRoundTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'prompt',
      answerType: 'state',
      setup: function (tool) { tool.setupTask(r); },
      check: function (tool) {
        tool.review();                 // paint green/coral marks for the current placement
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function (tool) {
        if (tool._placedCount() < tool.items.length) return 'hintPlaceAll';
        return 'hintSomeWrong';
      }
    };
  });
}

/* Fallback static task pool when no ?activity= is given. */
var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

/* Order-only Fisher–Yates over n indices. When `prev` is given (and n≥2),
   the result is GUARANTEED to differ from prev (the per-pass "never the same
   sequence twice" requirement). n<2 is a no-op (no reshuffle possible). */
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

window.SortBinsActivity = Object.assign({}, SortBinsCore, {
  id: 'sort-bins-activity',

  /* Inherit the core's 11-locale strings (title / instruction / prompt / bin
     labels / hints / sr nouns). No activity-only strings beyond the core's. */
  strings: Object.assign({}, SortBinsCore.strings),

  /* NO `tasks` property → the shell calls our nextTask() for ordering, so we
     own the per-pass reshuffle (CLAUDE.md §A.13.60). Pool resolved lazily:
     by ?activity=<id> if present, else the static demo. */

  init: function (api) {
    SortBinsCore.init.call(this, api);
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
     length/ref changes (demo→manifest swap); RESHUFFLES (≠ previous) when the
     pass index advances. Driven off the pass TRANSITION, not call count, so
     the repeated getTask(0) at mount + LCS_reloadFirstTask is idempotent and
     pass-1 order stays stable. Order-only — every served round is a
     pre-validated spec (the geometry/correctness never changes at runtime). */
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
      this._order = shuffledOrder(n, this._order);
      this._curPass = pass;
    }
    return pool[this._order[i % n]];
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/sort-bins-activities.json').then(function (r) {
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
      if (window.console && console.warn) console.warn('[sort-bins-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'sort-by-sides') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      /* defensive: every item in every round must have a matching bin
         (an item whose side-count no bin covers would be unsortable). */
      if (window.console && console.warn) {
        var FAM = SortBinsCore._FAMILY, CAT = SortBinsCore._CATALOG;
        rounds.forEach(function (r, ri) {
          var binSides = (r.bins || []).map(function (b) { return FAM[b] && FAM[b].sides; });
          (r.items || []).forEach(function (id) {
            var s = CAT[id] && CAT[id].sides;
            if (binSides.indexOf(s) === -1) console.warn('[sort-bins-activity] round ' + ri + ' item "' + id + '" (sides ' + s + ') has no matching bin');
          });
        });
      }
      return makeRoundTasks(rounds, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

SortBinsCore.injectCSS();
