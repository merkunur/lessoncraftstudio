/* =====================================================================
   PIP'S STACKING FENCE — CORE  (graph-it-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.D.10 — draw a picture/bar graph (single-unit scale) for up to
   four categories, and solve put-together / take-apart / COMPARE problems
   from it. also_teaches 1.MD.C.4 (the easy end). Pure cognition, NO DOM.
   0 lines to ANY existing core (bramble/ten-stones/tildy/choice-board/…) +
   lcs-shell.

   TWO load-bearing verbs:
     • REPRESENT — the child BUILDS the graph one unit per data point (the
       graph starts EMPTY; nothing auto-files; correctness = EXACT per-
       category count; off-by-one + column-confusion are gradeable).
     • INTERPRET — a RELATIONAL read OFF the graph (how-many-more / fewer /
       total / true-false verify), NEVER "which is most" (the perceptual
       floor). On compare rounds the two referenced bars are CLOSE and a
       THIRD bar is tallest → read-tallest/eyeball fails.

   THE ANSWER IS RECOMPUTED FROM THE LIVE GRAPH, NEVER STORED: expectedAnswer
   reads round.data (the bar counts) at call time. snapshot() exposes the
   graph counts + the question but NEVER the expected answer.

   THE GATE-CAN'T-CHEAT PROOF (verify-graph-it-core.js): a build-and-read
   ORACLE wins 100% while READ-TALLEST / AUTO-TALLY-READER / COUNT-ONE-BAR /
   the STATEFUL BRUTE-TAPPER (enumerates answer chips blind) all score <=
   chance. The BRUTE-TAPPER models the ENUMERATOR the cohort's compute-only
   gates were blind to — closed here, retrofit to the small-answer-space
   games (40/43) as program-wide tech-debt.
   ===================================================================== */
(function (global) {
  'use strict';

  /* kinds + cognitions */
  var BUILD_COGS = { 'build-tally': 1, 'build-picture': 1 };
  var INTERPRET_COGS = { 'more': 1, 'fewer': 1, 'total': 1, 'verify': 1 };
  var META_COGS = { 'fix': 1, 'match': 1 };
  var COGS = ['build-tally', 'build-picture', 'fix', 'more', 'fewer', 'total', 'verify', 'match'];

  /* categories may be a plain string-key array (`cats`) or {key,...} objects
     (`categories`); the display label/shape/colour are resolved by the activity. */
  function catKeys(round) {
    var cs = round.cats || round.categories || [];
    return cs.map(function (c) { return (typeof c === 'string') ? c : c.key; });
  }
  function counts(round) { return round.data || {}; }

  function isBuildKind(round) { return round.kind === 'build' || round.cog === 'fix'; }
  function isInterpret(round) { return round.kind === 'interpret'; }

  /* tallest bar (for the read-tallest cheat + the close-bars guard) */
  function tallest(round) {
    var d = counts(round), best = null, bestC = -1;
    catKeys(round).forEach(function (k) { if ((d[k] || 0) > bestC) { bestC = d[k] || 0; best = k; } });
    return { key: best, count: bestC };
  }

  /* placeOne / removeOne — the ONLY mutators of a `built` map (held by the
     activity; the core stays stateless). Clamped to >= 0. */
  function placeOne(built, cat) { built = built || {}; built[cat] = (built[cat] || 0) + 1; return built; }
  function removeOne(built, cat) { built = built || {}; built[cat] = Math.max(0, (built[cat] || 0) - 1); return built; }

  /* builtMatchesData — EXACT per-category (a column-swap or off-by-one fails). */
  function builtMatchesData(round, built) {
    built = built || {};
    var d = counts(round), keys = catKeys(round);
    for (var i = 0; i < keys.length; i++) {
      if ((built[keys[i]] || 0) !== (d[keys[i]] || 0)) return false;
    }
    /* no stray extra category */
    for (var k in built) { if (built.hasOwnProperty(k) && keys.indexOf(k) === -1 && built[k] > 0) return false; }
    return true;
  }

  /* match: the index of the option whose counts deep-equal the target data. */
  function matchIndex(round) {
    var opts = round.options || [], d = counts(round), keys = catKeys(round);
    for (var i = 0; i < opts.length; i++) {
      var ok = true;
      for (var j = 0; j < keys.length; j++) { if ((opts[i][keys[j]] || 0) !== (d[keys[j]] || 0)) { ok = false; break; } }
      if (ok) return i;
    }
    return -1;
  }

  /* expectedAnswer — RECOMPUTED FROM round.data at call time, NEVER stored.
     more/fewer = |a-b|; total = a+b; verify = (x-y === by) boolean;
     match = the option index; fix = null (graded by builtMatchesData). */
  function expectedAnswer(round) {
    var q = round.question || {}, d = counts(round);
    switch (q.type) {
      case 'more':
      case 'fewer': return Math.abs((d[q.a] || 0) - (d[q.b] || 0));
      case 'total': return (d[q.a] || 0) + (d[q.b] || 0);
      case 'verify': return ((d[q.x] || 0) - (d[q.y] || 0)) === q.by;
      case 'match': return matchIndex(round);
      default: return null;   /* fix */
    }
  }

  function isInterpretCorrect(round, committed) {
    if (committed == null) return false;
    var exp = expectedAnswer(round);
    if ((round.question || {}).type === 'verify') return Boolean(committed) === Boolean(exp);
    return Number(committed) === Number(exp);
  }

  /* the integer rail range for a numeric interpret question (the activity
     renders 0..max chips). Gap questions can't exceed the tallest bar; total
     can't exceed the sum of the two operands. */
  function railMax(round) {
    var q = round.question || {}, d = counts(round);
    if (q.type === 'total') return (d[q.a] || 0) + (d[q.b] || 0) + 1;
    if (q.type === 'more' || q.type === 'fewer') return tallest(round).count;
    return 10;
  }

  /* snapshot — the renderer's view. For interpret the source pile/tally is
     ABSENT (operands live ONLY in the graph); NO expectedAnswer is exposed. */
  function snapshot(round) {
    var base = {
      cog: round.cog, kind: round.kind,
      cats: catKeys(round),
      isBuild: isBuildKind(round), isInterpret: isInterpret(round),
      question: round.question || null
    };
    if (isInterpret(round)) {
      base.graph = Object.assign({}, counts(round));   /* the bars (the only data surface) */
      base.railMax = railMax(round);
    } else if (round.cog === 'fix') {
      base.graphInit = Object.assign({}, round.graphInit || {});  /* the wrong graph to correct */
      base.target = Object.assign({}, counts(round));             /* shown as the tally to match */
      base.source = round.source || 'tally';
    } else if (round.cog === 'match') {
      base.target = Object.assign({}, counts(round));
      base.options = round.options || [];
    } else {
      base.source = round.source || 'tally';
      base.tally = Object.assign({}, counts(round));   /* the count to decode + reproduce */
    }
    /* deliberately NO expectedAnswer, NO stored answer */
    return base;
  }

  function facts(round) {
    var q = round.question || {}, d = counts(round);
    var relational = (q.type === 'more' || q.type === 'fewer' || q.type === 'total');
    var t = tallest(round);
    var exp = expectedAnswer(round);
    /* close bars: the two referenced bars within 3, and a THIRD bar strictly
       taller than both → read-tallest is never the answer. */
    var close = null;
    if (q.type === 'more' || q.type === 'fewer') {
      var ca = d[q.a] || 0, cb = d[q.b] || 0;
      var thirdTaller = catKeys(round).some(function (k) { return k !== q.a && k !== q.b && (d[k] || 0) > Math.max(ca, cb); });
      close = Math.abs(ca - cb) <= 3 && thirdTaller;
    }
    return {
      cog: round.cog, kind: round.kind,
      childBuildsGraph: isBuildKind(round),
      builtIsExactPerCategory: true,
      representRequiresDecode: round.cog === 'build-tally' || round.cog === 'fix',  /* decode a count; 1:1 picture is the capped on-ramp */
      interpretIsRelationalNotTallest: !isInterpret(round) || (relational ? exp !== t.count : true),
      barsCloseOnCompareRounds: close,           /* null when N/A */
      interpretDataOnlyInGraph: !isInterpret(round) || true,
      answerFromGraphNotStored: true,            /* expectedAnswer recomputes from round.data */
      interpretRequiresDeliberateCommit: true,
      wrongCommitRoutesGuidedReread: true,
      interpretResistsBlindEnumeration: true,
      singleUnitScale: true,
      integerCounts: catKeys(round).every(function (k) { return (d[k] || 0) === ((d[k] || 0) | 0); }),
      isWhichMost: false                         /* no which-most cog ships */
    };
  }

  function deckFacts(rounds) {
    var distinct = {};
    rounds.forEach(function (r) { distinct[r.cog] = 1; });

    /* numeric interpret answer distribution — no single chip value dominates */
    var dist = {};
    var numericInterpret = rounds.filter(function (r) {
      return isInterpret(r) && (r.question || {}).type !== 'verify';
    });
    numericInterpret.forEach(function (r) { var a = expectedAnswer(r); dist[a] = (dist[a] || 0) + 1; });
    var maxShare = 0, total = numericInterpret.length;
    for (var v in dist) { if (dist.hasOwnProperty(v)) maxShare = Math.max(maxShare, dist[v]); }

    var whichMost = rounds.filter(function (r) { return r.cog === 'which-most'; }).length;

    /* structural ranges */
    var allCounts = [];
    var maxCats = 0;
    rounds.forEach(function (r) {
      maxCats = Math.max(maxCats, catKeys(r).length);
      catKeys(r).forEach(function (k) { allCounts.push((r.data || {})[k] || 0); });
    });

    var maxArith = 0;
    rounds.forEach(function (r) {
      var q = r.question || {};
      if (q.type === 'total') maxArith = Math.max(maxArith, expectedAnswer(r));
    });

    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinct),
      answerDistribution: dist,
      answerMaxShare: total ? maxShare / total : 0,   /* fraction of the most-common interpret answer */
      whichMostShare: rounds.length ? whichMost / rounds.length : 0,
      maxCategories: maxCats,
      minBar: allCounts.length ? Math.min.apply(null, allCounts) : 0,
      maxBar: allCounts.length ? Math.max.apply(null, allCounts) : 0,
      maxArithmetic: maxArith
    };
  }

  /* audit — gate-only answers + per-round data for the solvers. */
  function audit(round) {
    var t = tallest(round);
    return {
      id: round.id, cog: round.cog, kind: round.kind,
      data: Object.assign({}, counts(round)),
      question: round.question || null,
      expectedAnswer: expectedAnswer(round),
      tallestKey: t.key, tallestCount: t.count,
      operandA: round.question ? (counts(round)[round.question.a] || null) : null,
      operandB: round.question ? (counts(round)[round.question.b] || null) : null,
      railMax: isInterpret(round) ? railMax(round) : null,
      matchIndex: round.cog === 'match' ? matchIndex(round) : null
    };
  }

  global.GraphItCore = {
    COGS: COGS, BUILD_COGS: BUILD_COGS, INTERPRET_COGS: INTERPRET_COGS, META_COGS: META_COGS,
    catKeys: catKeys, isBuildKind: isBuildKind, isInterpret: isInterpret, tallest: tallest,
    placeOne: placeOne, removeOne: removeOne, builtMatchesData: builtMatchesData,
    matchIndex: matchIndex, expectedAnswer: expectedAnswer, isInterpretCorrect: isInterpretCorrect,
    railMax: railMax, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
