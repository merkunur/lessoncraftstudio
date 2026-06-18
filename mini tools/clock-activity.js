/* =====================================================================
   CLOCK — SET-THE-TIME ACTIVITY   (clock-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the set-the-clock engine. Reuses clock-core.js
   for the face/hands/drag/state. Task source depends on the URL:

   • ?activity=<id>  → fetches clock-activities.json, finds the row,
                        instantiates tasks from row.task_template +
                        row.params.rounds.
   • no ?activity    → falls back to a static demo set.

   task_template 'set-clock' — for each round in params.rounds (an
   {hour, minute, seed} canonical-time spec) build a "set the clock to
   <worded time>" task. The worded time is resolved from clock-core's
   `timeExpr` for the CURRENT locale (the half-hour idiom is native-owned)
   and passed as promptArgs.time. answerType:'state' (the clock IS the
   answer surface; the shell renders no keypad/choices). check() reads
   tool.isCorrect(); on success the board locks (readOnly) for a stable
   celebration.

   One coordinate lives on this wrapper: 1.MD.B.3 (tell + write time in
   hours and half-hours). Its params.rounds is the exercise POOL.

   VARIETY + SHUFFLE (CLAUDE.md §A.13.60): the pool has ≥7 ORIGINAL
   distinct rounds (each a genuinely different target time — different clock
   face + different worded expression, o'clock + half-past mix), and after a
   full pass the order RESHUFFLES (order-only) so no two consecutive passes
   share a sequence. The reshuffle lives here via the shell's `nextTask`
   contract — ZERO change to lcs-shell.js.
   ===================================================================== */

/* 8 GENUINELY DIFFERENT target times (§A.13.60 — variety is the changing
   time + worded expression, 4 o'clock + 4 half-past, hours spread). */
var DEMO_ROUNDS = [
  { hour: 3,  minute: 0,  seed: 11 },
  { hour: 7,  minute: 30, seed: 23 },
  { hour: 9,  minute: 0,  seed: 31 },
  { hour: 6,  minute: 30, seed: 41 },
  { hour: 12, minute: 0,  seed: 53 },
  { hour: 4,  minute: 30, seed: 61 },
  { hour: 10, minute: 0,  seed: 67 },
  { hour: 1,  minute: 30, seed: 71 }
];

/* "H:MM" key — minute zero-padded (handles {0,30} for #1 AND {0,5,…,55}
   for #2; e.g. 3:00, 7:30, 3:15, 10:05). */
function _timeKey(h, m) { return h + ':' + (m < 10 ? '0' + m : '' + m); }

function makeRoundTasks(rounds, idPrefix, minuteStep) {
  var loc = (typeof window !== 'undefined' && window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
  var TE = ClockCore.strings.timeExpr;
  var step = (minuteStep === 5) ? 5 : 30;
  return rounds.map(function (r, i) {
    var key = _timeKey(r.hour, r.minute);
    var entry = TE[key] || {};
    var time = entry[loc] || entry.en || key;   // localized worded time (idiom native-owned)
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptSet',
      promptArgs: { time: time },
      answerType: 'state',
      setup: function (tool) { tool.setupTask({ hour: r.hour, minute: r.minute, minuteStep: step, seed: r.seed }); },
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

/* Order-only Fisher–Yates over n indices; with `prev` (n≥2) the result is
   GUARANTEED to differ from prev. n<2 is a no-op. */
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

window.ClockActivity = Object.assign({}, ClockCore, {
  id: 'clock-activity',

  /* Inherit the core's 11-locale strings (title / instruction / promptSet /
     timeExpr / hint / sr labels). No activity-only strings beyond the core's. */
  strings: Object.assign({}, ClockCore.strings),

  init: function (api) {
    ClockCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  /* Shell ordering hook (see fractions/array-activity.js for the full
     contract): shuffled order over the pool; rebuilt on pool length/ref
     change; RESHUFFLES (≠ previous) on a forward pass boundary. Order-only. */
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
    fetch('/mini-tools/clock-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self._pool = self._buildTasksFromRow(row);
      self._order = null;
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[clock-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'set-clock') {
      var rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : DEMO_ROUNDS;
      var step = (row.params && row.params.minuteStep === 5) ? 5 : 30;   // 30 = #1 (o'clock/half), 5 = #2 (2.MD.C.7)
      /* defensive: minutes must be a multiple of minuteStep, and a worded
         time must exist for each round (else the prompt shows a bare key). */
      if (window.console && console.warn) {
        var TE = ClockCore.strings.timeExpr;
        rounds.forEach(function (r, ri) {
          if (!(r.hour >= 1 && r.hour <= 12)) console.warn('[clock-activity] round ' + ri + ' hour ' + r.hour + ' outside 1..12');
          if (r.minute % step !== 0) console.warn('[clock-activity] round ' + ri + ' minute ' + r.minute + ' not a multiple of ' + step);
          if (!TE[_timeKey(r.hour, r.minute)]) console.warn('[clock-activity] round ' + ri + ' no timeExpr for ' + _timeKey(r.hour, r.minute));
        });
      }
      return makeRoundTasks(rounds, row.id, step);
    }
    return STATIC_DEMO_TASKS;
  }
});

ClockCore.injectCSS();
