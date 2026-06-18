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

/* make-ten-to-add (1.OA.C.6): each round {first, second, seed} → "A + B" where
   the bond decomposes B so one part makes a ten with A. promptArgs are digits. */
function makeAddTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptAdd',
      promptArgs: { first: r.first, second: r.second },
      answerType: 'state',
      setup: function (tool) { tool.setupTask({ mode: 'make-ten-to-add', first: r.first, second: r.second, seed: r.seed }); },
      check: function (tool) {
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      },
      hintKey: function () { return 'hintAdd'; }
    };
  });
}

/* whole-unknown (1.OA.A.1): each round {first, second, seed} → both parts given,
   the child types the TOTAL on the shell keypad (answerType 'number'). */
function makeWholeTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptWhole',
      answerType: 'number',
      answerMin: 0,
      answerMax: 20,
      setup: function (tool) { tool.setupTask({ mode: 'whole-unknown', first: r.first, second: r.second, seed: r.seed }); },
      check: function (tool, answer) { return answer === tool.total(); }
    };
  });
}

/* subtraction-as-unknown-addend (1.OA.B.4): each round {whole, given, seed} →
   reuses the make-ten MODE (whole = minuend, given = subtrahend); the child fills
   the missing part (= the difference). Only the prompt framing differs from #1. */
function makeUnknownAddendTasks(rounds, idPrefix) {
  return rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptSubtraction',
      promptArgs: { whole: r.whole, given: r.given },
      answerType: 'state',
      setup: function (tool) { tool.setupTask({ whole: r.whole, given: r.given, seed: r.seed }); },
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
    if (row.task_template === 'make-ten-to-add') {
      var addRounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
      /* defensive: A∈6..9, the make-ten part (10−A) must be < B, total ≤18 (within 20). */
      if (window.console && console.warn) {
        addRounds.forEach(function (r, ri) {
          if (!(r.first >= 6 && r.first <= 9)) console.warn('[number-bond-activity] add round ' + ri + ' first ' + r.first + ' not in 6..9');
          if (!((10 - r.first) < r.second && r.first + r.second <= 18 && r.first + r.second > 10)) console.warn('[number-bond-activity] add round ' + ri + ' (' + r.first + ',' + r.second + ') not a clean cross-ten');
        });
      }
      return makeAddTasks(addRounds, row.id);
    }
    if (row.task_template === 'whole-unknown') {
      var wholeRounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
      /* defensive: both parts ≥1, total within 20. */
      if (window.console && console.warn) {
        wholeRounds.forEach(function (r, ri) {
          if (!(r.first >= 1 && r.second >= 1 && r.first + r.second <= 20)) console.warn('[number-bond-activity] whole round ' + ri + ' (' + r.first + ',' + r.second + ') not within-20 parts≥1');
        });
      }
      return makeWholeTasks(wholeRounds, row.id);
    }
    if (row.task_template === 'unknown-addend') {
      var uaRounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
      /* defensive: given 1..whole-1; BOTH parts ≤9 (render-safety — the tested dot-packing range). */
      if (window.console && console.warn) {
        uaRounds.forEach(function (r, ri) {
          if (!(r.given >= 1 && r.given < r.whole)) console.warn('[number-bond-activity] ua round ' + ri + ' given ' + r.given + ' not in 1..' + (r.whole - 1));
          if (!(r.given <= 9 && (r.whole - r.given) <= 9)) console.warn('[number-bond-activity] ua round ' + ri + ' part >9 (render-safety): ' + r.given + '/' + (r.whole - r.given));
        });
      }
      return makeUnknownAddendTasks(uaRounds, row.id);
    }
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

/* The shell reads tool.strings.title/instruction at MOUNT (before init). For
   the make-ten-to-add activity, swap them to the add-mode variants synchronously
   (this module runs before the inline LCS.mount), so the in-deck title strip
   reads "Make a Ten to Add" — not "Make 10". The default (make-ten) path is
   untouched. (Per-task prompt is already handled via promptKey:'promptAdd'.) */
(function () {
  var p = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
  var id = p ? p.get('activity') : null;
  if (id && id.indexOf('make-ten-to-add') >= 0) {
    NumberBondActivity.strings = Object.assign({}, NumberBondActivity.strings, {
      title: NumberBondActivity.strings.titleAdd,
      instruction: NumberBondActivity.strings.instructionAdd
    });
  } else if (id && id.indexOf('find-the-total') >= 0) {
    NumberBondActivity.strings = Object.assign({}, NumberBondActivity.strings, {
      title: NumberBondActivity.strings.titleWhole,
      instruction: NumberBondActivity.strings.instructionWhole
    });
  } else if (id && id.indexOf('subtraction') >= 0) {
    NumberBondActivity.strings = Object.assign({}, NumberBondActivity.strings, {
      title: NumberBondActivity.strings.titleSubtraction,
      instruction: NumberBondActivity.strings.instructionSubtraction
    });
  }
})();

NumberBondCore.injectCSS();
