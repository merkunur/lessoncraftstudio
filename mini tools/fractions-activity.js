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

   Per the one-unit workflow this ships 1.G.A.3 ONLY (halves + fourths,
   rect + circle). Thirds (2.G.A.3) is the planned fast-follow as a
   SECOND coordinate on this same engine — NOT built here.
   ===================================================================== */

/* The canonical round set: rect vertical-halves, circle halves, square
   horizontal-halves, square grid-fourths, circle perpendicular-fourths.
   Every correct cut is exact-by-construction (centre line / even
   fraction / diameter through centre) and every candidate tap target is
   ≥36px even at a 280px viewport (distractors are ≥16 viewBox units off).
   Used for the direct-load demo AND as the manifest fallback. */
var DEMO_ROUNDS = [
  { shape: 'rect',   n: 2, cut: 'v',    seed: 11 },
  { shape: 'circle', n: 2, cut: 'v',    seed: 23 },
  { shape: 'square', n: 2, cut: 'h',    seed: 31 },
  { shape: 'square', n: 4, cut: 'grid', seed: 37 },
  { shape: 'circle', n: 4, cut: 'grid', seed: 41 }
];

function makeRoundTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    var promptKey = (r.n === 4) ? 'promptFourths' : 'promptHalves';
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
        return 'hintNotEqual';   /* right count, wrong set → off-centre cut */
      }
    };
  });
}

/* Fallback static task set when no ?activity= is given. */
var STATIC_DEMO_TASKS = makeRoundTasks(DEMO_ROUNDS, 'demo');

window.FractionsActivity = Object.assign({}, FractionsCore, {
  id: 'fractions-activity',

  /* Inherit the core's 11-locale strings (title / instruction / prompts /
     hints / sr nouns). No activity-only strings beyond the core's. */
  strings: Object.assign({}, FractionsCore.strings),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback. */
  tasks: STATIC_DEMO_TASKS,

  init: function (api) {
    FractionsCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
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
      self.tasks = self._buildTasksFromRow(row);
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
