/* =====================================================================
   MONEY — COUNT-OUT ACTIVITY   (money-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of the count-out money engine. Reuses money-core.js
   for the tray/palette/total/state. Task source:
   • ?activity=<id> → fetches money-activities.json, finds the row,
     instantiates tasks from the CURRENT LOCALE's params.byLocale[loc].
   • no ?activity   → static demo (EN).

   MONEY IS PER-LOCALE: params.byLocale[<loc>] = { currency, coins, rounds }.
   Each round { target, palette, solution } is in MINOR units of that locale's
   currency (native-authored). The wrapper reads LCS.i18n.current to pick the
   locale's currency + rounds (NEVER cross-applies denominations).

   task_template 'count-out' — each round renders the coin palette; the child
   taps coins into the tray until the total equals the target. answerType:
   'state' (the tray IS the answer surface); check() reads isCorrect(); on
   success the tray locks for the celebration.

   One coordinate: 2.MD.C.8. VARIETY + SHUFFLE (§A.13.60): ≥7 distinct rounds
   (different targets/palettes) + a post-pass order-only reshuffle via the
   shell's nextTask contract (ZERO lcs-shell.js change).
   ===================================================================== */

/* EN demo currency + coins + rounds (the schema reference; per-locale data
   lives in money-activities.json params.byLocale). */
var DEMO_LOCALE = {
  currency: { symbol: '$', before: true, decimalSep: '.', minorPerMajor: 100 },
  coins: [{ v: 1, label: '1¢' }, { v: 5, label: '5¢' }, { v: 10, label: '10¢' }, { v: 25, label: '25¢' }, { v: 100, label: '$1' }],
  rounds: [
    { target: 30, palette: [1, 5, 10, 25], solution: [25, 5], seed: 11 },
    { target: 15, palette: [1, 5, 10, 25], solution: [10, 5], seed: 23 },
    { target: 40, palette: [5, 10, 25], solution: [25, 10, 5], seed: 31 },
    { target: 11, palette: [1, 5, 10, 25], solution: [10, 1], seed: 41 },
    { target: 26, palette: [1, 5, 10, 25], solution: [25, 1], seed: 53 },
    { target: 35, palette: [5, 10, 25], solution: [25, 10], seed: 61 },
    { target: 50, palette: [10, 25], solution: [25, 25], seed: 67 },
    { target: 20, palette: [5, 10, 25], solution: [10, 10], seed: 71 }
  ]
};

function makeCountOutTasks(L, idPrefix) {
  var currency = L.currency, coins = L.coins;
  return L.rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptCount',
      promptArgs: { amount: MoneyCore.formatMoney(r.target, currency) },
      answerType: 'state',
      setup: function (tool) { tool.setupTask({ currency: currency, coins: coins, target: r.target, palette: r.palette }); },
      check: function (tool) {
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      }
    };
  });
}

/* MAKE-CHANGE (#2): each round { cost, paid, palette, solution }; the child
   tenders coins summing to (paid - cost). Same tray/palette mechanics; the
   cost/paid show as the purchase context (paid may be a note). */
function makeMakeChangeTasks(L, idPrefix) {
  var currency = L.currency, coins = L.coins;
  return L.rounds.map(function (r, i) {
    return {
      id: idPrefix + '.round-' + i,
      promptKey: 'promptChange',
      promptArgs: { cost: MoneyCore.formatMoney(r.cost, currency), paid: MoneyCore.formatMoney(r.paid, currency) },
      answerType: 'state',
      setup: function (tool) { tool.setupTask({ mode: 'make-change', currency: currency, coins: coins, cost: r.cost, paid: r.paid, palette: r.palette }); },
      check: function (tool) {
        var ok = tool.isCorrect();
        if (ok) { tool.readOnly = true; tool.paint(); }
        return ok;
      }
    };
  });
}

var STATIC_DEMO_TASKS = makeCountOutTasks(DEMO_LOCALE, 'demo');

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

function _currentLocale() {
  return (typeof window !== 'undefined' && window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
}

/* The shell reads tool.strings.title/instruction at MOUNT (before init), so the
   per-activity title must be chosen SYNCHRONOUSLY from ?activity (the E3 #2
   pattern; zero lcs-shell touch). make-change → swap in titleChange/instructionChange. */
var _ACTIVITY_ID = (typeof window !== 'undefined' && window.location)
  ? (new URLSearchParams(window.location.search)).get('activity') : null;
var _IS_MAKE_CHANGE = /make-change/.test(_ACTIVITY_ID || '');

window.MoneyActivity = Object.assign({}, MoneyCore, {
  id: 'money-activity',
  strings: Object.assign({}, MoneyCore.strings, _IS_MAKE_CHANGE ? {
    title: MoneyCore.strings.titleChange,
    instruction: MoneyCore.strings.instructionChange
  } : {}),

  init: function (api) {
    MoneyCore.init.call(this, api);
    this._pool = STATIC_DEMO_TASKS;
    this._order = null; this._curPass = 0; this._orderForPool = null;
    var params = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
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
    fetch('/mini-tools/money-activities.json').then(function (r) {
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
      if (window.console && console.warn) console.warn('[money-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    var byLoc = (row.params && row.params.byLocale) || {};
    var loc = _currentLocale();
    var L = byLoc[loc] || byLoc.en || DEMO_LOCALE;
    if (row.task_template === 'count-out') {
      /* defensive: each round's solution must be in-palette + sum to target + ≥2 coins. */
      if (window.console && console.warn) {
        (L.rounds || []).forEach(function (r, ri) {
          var sum = (r.solution || []).reduce(function (a, b) { return a + b; }, 0);
          if (sum !== r.target) console.warn('[money-activity] ' + loc + ' round ' + ri + ' solution sums ' + sum + ' ≠ target ' + r.target);
          if ((r.solution || []).length < 2) console.warn('[money-activity] ' + loc + ' round ' + ri + ' trivial (<2 coins)');
        });
      }
      return makeCountOutTasks(L, row.id);
    }
    if (row.task_template === 'make-change') {
      /* defensive: paid>cost, solution sums to the change, in-palette, ≥2 coins. */
      if (window.console && console.warn) {
        (L.rounds || []).forEach(function (r, ri) {
          var change = r.paid - r.cost;
          var sum = (r.solution || []).reduce(function (a, b) { return a + b; }, 0);
          if (!(r.paid > r.cost)) console.warn('[money-activity] ' + loc + ' round ' + ri + ' paid ' + r.paid + ' not > cost ' + r.cost);
          if (sum !== change) console.warn('[money-activity] ' + loc + ' round ' + ri + ' solution sums ' + sum + ' ≠ change ' + change);
          if ((r.solution || []).some(function (v) { return (r.palette || []).indexOf(v) === -1; })) console.warn('[money-activity] ' + loc + ' round ' + ri + ' solution coin not in palette');
          if ((r.solution || []).length < 2) console.warn('[money-activity] ' + loc + ' round ' + ri + ' trivial change (<2 coins)');
        });
      }
      return makeMakeChangeTasks(L, row.id);
    }
    return STATIC_DEMO_TASKS;
  }
});

MoneyCore.injectCSS();
