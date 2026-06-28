/* =====================================================================
   BRAMBLE'S BERRY-JUICE STAND — CORE  (bramble-core.js)
   ---------------------------------------------------------------------
   CCSS K.MD.A.2 — directly compare two objects by a measurable attribute
   (CAPACITY) to see which holds MORE / LESS / the SAME, and describe the
   difference. STRICTLY NON-NUMERIC (more/less/same; no units/lines —
   units = 3.MD.A.2). also_teaches: NONE (order-three = Grade-1 1.MD.A.1,
   dropped). Pure cognition, NO DOM. 0 lines to ANY existing core
   (choice-board/ten-stones/tildy/cvc-builder/match-pairs/place-value/
   ten-frame/word-builder/fractions/array/sort-bins/clock/number-bond) AND
   to lcs-shell.

   THE GRADED COGNITION = THE COMMITTED PREDICTION. You can't SEE which
   container holds more (a tall-narrow glass LOOKS like more than a short-
   wide bowl but may hold LESS — the conservation illusion). So the child
   COMMITS a more/less/same claim BEFORE any pour; the pour then DIRECTLY
   COMPARES (transfers) to VERIFY. Grade the prediction — observe-the-pour
   is NOT a cheat, it IS the standard's verification. The only guard is
   predict-FIRST (playPour throws before a prediction is committed).

   THE CONSERVATION MECHANISM: each container's `trueCapacity` is an authored
   INTEGER, DECOUPLED from its `drawnHeight`/`drawnWidth` — so a tall-skinny
   silhouette can hold LESS than a short-wide one. The eye is honestly fooled.

   THE GATE-CAN'T-CHEAT PROOF (verify-bramble-core.js): a reason-about-
   capacity oracle wins 100% while OBSERVE-THE-POUR (playPour throws pre-
   commit; snapshot leaks no level) / JUDGE-BY-HEIGHT|WIDTH|AREA (>=60% of
   the ASSESSED body is appearance-anti-correlated) / CONSTANT / the STATEFUL
   MEMORIZE-EXCEPTIONS solver (caches the visible surface→answer, but every
   re-test is a NOVEL surface of the same structure → the cache never hits)
   all score <= chance. The stateful solver closes the stateless-only blind
   spot — it generalizes to every cohort re-offer mechanic.

   NO PROXIMITY GRADIENT: there is NO live "warmer/closer" API and no per-
   pour grader. Correctness is a CATEGORICAL post-commit fact (committed vs
   trueComparison) — nothing to hill-climb. snapshot() carries shape + drawn
   geometry ONLY (never trueCapacity, a level, a fill, or a numeral) on BOTH
   render modes, so the result is never pre-shown.
   ===================================================================== */
(function (global) {
  'use strict';

  /* The two answer-sets. THREE = the more/less/same comparison (relative to
     cup A); FIT = the binary directional "pour A into B — fits or overflows". */
  var THREE = ['A_MORE', 'B_MORE', 'SAME'];
  var FIT = ['FITS', 'OVERFLOWS'];

  /* Cognition taxonomy. The illusions deliberately span BOTH directions so
     NO single silhouette cue (height, width, OR area) is reliable — a 2D
     silhouette honestly cannot tell you volume, which is exactly why the
     standard says DIRECTLY compare (pour).
       clearcut    — on-ramp, appearance MATCHES reality (NON-assessed scaffold)
       wide-wins   — illusion: the short-WIDE holds MORE (height misleads)
       tall-less   — illusion: the tall-narrow holds LESS (height misleads)
       narrow-wins — illusion: the tall-NARROW holds MORE (width misleads)
       decouple    — illusion: the bigger-LOOKING holds LESS (every cue misleads)
       fit         — will-it-fit, binary directional (FITS/OVERFLOWS)
       same        — same-capacity reveal, CELEBRATION (NON-assessed)
       describe    — productive recall: RE-select the word after the pour
       transfer    — the re-offer: a fooled STRUCTURE on a NOVEL surface
  */
  var COGS = ['clearcut', 'wide-wins', 'tall-less', 'narrow-wins', 'decouple', 'fit', 'same', 'describe', 'transfer'];
  var ILLUSION_COGS = { 'wide-wins': 1, 'tall-less': 1, 'narrow-wins': 1, 'decouple': 1, 'transfer': 1 };  /* appearance misleads, 3-way */

  function isThreeWay(round) { return !(round.options && round.options[0] === 'FITS'); }
  function options(round) { return (round.options || THREE).slice(); }
  function isAssessed(round) { return round.assessment === true; }
  function isValidChoice(round, choice) { return options(round).indexOf(choice) >= 0; }

  /* trueComparison — a PURE function of trueCapacity (NEVER of drawn geometry).
     For a fit round: FITS iff A pours into B without overflowing (A <= B). */
  function trueComparison(round) {
    if (!isThreeWay(round)) {
      return round.A.trueCapacity <= round.B.trueCapacity ? 'FITS' : 'OVERFLOWS';
    }
    var a = round.A.trueCapacity, b = round.B.trueCapacity;
    if (a > b) return 'A_MORE';
    if (b > a) return 'B_MORE';
    return 'SAME';
  }

  /* What a JUDGE-BY-HEIGHT solver WOULD answer (the taller cup holds more).
     Returns null for fit rounds (different answer-set). The gate uses this to
     score the appearance solvers + to prove the assessed body is anti-correlated. */
  function heightSays(round) {
    if (!isThreeWay(round)) return null;
    var ha = round.A.drawnHeight, hb = round.B.drawnHeight;
    if (ha > hb) return 'A_MORE';
    if (hb > ha) return 'B_MORE';
    return 'SAME';
  }
  function widthSays(round) {
    if (!isThreeWay(round)) return null;
    var wa = round.A.drawnWidth, wb = round.B.drawnWidth;
    if (wa > wb) return 'A_MORE';
    if (wb > wa) return 'B_MORE';
    return 'SAME';
  }
  function areaSays(round) {
    if (!isThreeWay(round)) return null;
    var aa = round.A.drawnHeight * round.A.drawnWidth, ab = round.B.drawnHeight * round.B.drawnWidth;
    if (aa > ab) return 'A_MORE';
    if (ab > aa) return 'B_MORE';
    return 'SAME';
  }

  /* commitPrediction — the child's claim. The core is stateless; this just
     validates + echoes the committed value (the activity holds it). */
  function commitPrediction(round, choice) {
    return isValidChoice(round, choice) ? choice : null;
  }

  /* isCorrect — grade the PREDICTION (committed vs trueComparison). NEVER reads
     a pour DOM / a level / a numeral. Null commit is never correct. */
  function isCorrect(round, committed) {
    if (committed == null) return false;
    return committed === trueComparison(round);
  }

  /* playPour — the VERIFICATION transfer. THROWS if no prediction is committed
     (predict-FIRST structurally enforced: the result is unreachable pre-commit).
     Returns the pour outcome the child sees + the categorical truth + whether
     the committed prediction was right. NO gradient, NO per-step signal. */
  function playPour(round, committed) {
    if (committed == null) {
      throw new Error('predict-first: playPour() is unreachable before a prediction is committed');
    }
    var a = round.A.trueCapacity, b = round.B.trueCapacity, pour;
    if (!isThreeWay(round)) {
      pour = (a <= b) ? 'fits' : 'overflows';
    } else {
      pour = (a > b) ? 'a-overflows-b' : (a < b ? 'a-leaves-room-in-b' : 'exact-fill');
    }
    return { pour: pour, truth: trueComparison(round), correct: isCorrect(round, committed) };
  }

  /* snapshot — the renderer's pre-commit view. Shape + drawn geometry ONLY.
     Deliberately NO trueCapacity, NO liquid level, NO fill, NO numeral — the
     anti-leak that makes OBSERVE-THE-POUR impossible without committing first. */
  function snapshot(round) {
    return {
      cog: round.cog,
      options: options(round),
      isFit: !isThreeWay(round),
      isDescribe: round.cog === 'describe',
      isSame: round.cog === 'same',
      isIllusion: !!ILLUSION_COGS[round.cog],
      A: { shape: round.A.shape, drawnHeight: round.A.drawnHeight, drawnWidth: round.A.drawnWidth },
      B: { shape: round.B.shape, drawnHeight: round.B.drawnHeight, drawnWidth: round.B.drawnWidth },
      prompt: round.prompt || ''
      /* deliberately NO trueCapacity, NO level, NO fill, NO numeral, NO answer */
    };
  }

  /* facts(round) — per-round gate booleans. */
  function facts(round) {
    var three = isThreeWay(round);
    return {
      cog: round.cog,
      predictionBeforePour: true,        /* playPour throws pre-commit */
      resultNotPreshown: true,           /* snapshot carries no level/capacity/numeral, both render modes */
      capacityIsInteger:
        round.A.trueCapacity === (round.A.trueCapacity | 0) &&
        round.B.trueCapacity === (round.B.trueCapacity | 0),
      appearanceCanMislead: round.cog === 'clearcut' ? false : true,
      sameCapacityIsCelebrationNotAssessed: round.cog !== 'same' || round.assessment === false,
      willItFitIsBinaryDirectional:
        round.cog !== 'fit' ||
        (!!round.options && round.options.length === 2 && round.options[0] === 'FITS'),
      gradeIsPredictionNotPour: true,    /* isCorrect reads committed vs trueComparison only */
      isAssessed: round.assessment === true,
      isThreeWay: three,
      heightSays: heightSays(round),
      /* a round where the taller cup does NOT hold the most (appearance lies) */
      heightAnticorrelated: three ? (heightSays(round) !== trueComparison(round)) : null
    };
  }

  /* deckFacts(rounds) — deck-level invariants the gate asserts. */
  function deckFacts(rounds) {
    var assessedThree = rounds.filter(function (r) { return r.assessment === true && isThreeWay(r); });
    var anti = assessedThree.filter(function (r) { return heightSays(r) !== trueComparison(r); });

    var transfers = rounds.filter(function (r) { return r.cog === 'transfer' && r.reofferOf; });
    var byId = {};
    rounds.forEach(function (r) { byId[r.id] = r; });
    var reofferNovelSurface = transfers.length > 0 && transfers.every(function (t) {
      var src = byId[t.reofferOf];
      return !!src &&
        src.structuralSignature === t.structuralSignature &&  /* SAME conservation structure */
        src.surfaceKey !== t.surfaceKey;                      /* NOVEL visible surface */
    });

    /* every visible surface appears at most once → a memorize-the-surface
       solver never gets a repeat to exploit. */
    var seen = {}, noDup = true;
    rounds.forEach(function (r) {
      var k = r.surfaceKey + '|' +
        r.A.shape + ':' + r.A.drawnHeight + ':' + r.A.drawnWidth + ':' + r.A.trueCapacity + '|' +
        r.B.shape + ':' + r.B.drawnHeight + ':' + r.B.drawnWidth + ':' + r.B.trueCapacity;
      if (seen[k]) noDup = false;
      seen[k] = 1;
    });

    var distinct = {};
    rounds.forEach(function (r) { distinct[r.cog] = 1; });

    /* truth distribution over the 3-way rounds — a CONSTANT solver must lose */
    var dist = { A_MORE: 0, B_MORE: 0, SAME: 0 };
    rounds.forEach(function (r) { if (isThreeWay(r)) dist[trueComparison(r)]++; });

    return {
      total: rounds.length,
      assessedThreeCount: assessedThree.length,
      heightAnticorrelatedInAssessedBody: assessedThree.length ? (anti.length / assessedThree.length) : 0,
      reofferUsesNovelSurfaceSameStructure: reofferNovelSurface,
      noPairRepeatsIdentically: noDup,
      hasTransfer: transfers.length > 0,
      distinctCogs: Object.keys(distinct),
      truthDistribution: dist
    };
  }

  /* audit(round) — gate-only answers + per-round data for the solvers. */
  function audit(round) {
    return {
      id: round.id, cog: round.cog, assessment: round.assessment === true,
      phase: round.phase || null,
      options: options(round),
      trueComparison: trueComparison(round),
      heightSays: heightSays(round), widthSays: widthSays(round), areaSays: areaSays(round),
      A: {
        shape: round.A.shape, drawnHeight: round.A.drawnHeight,
        drawnWidth: round.A.drawnWidth, trueCapacity: round.A.trueCapacity
      },
      B: {
        shape: round.B.shape, drawnHeight: round.B.drawnHeight,
        drawnWidth: round.B.drawnWidth, trueCapacity: round.B.trueCapacity
      },
      structuralSignature: round.structuralSignature || null,
      surfaceKey: round.surfaceKey || null,
      reofferOf: round.reofferOf || null
    };
  }

  global.BrambleCore = {
    THREE: THREE, FIT: FIT, COGS: COGS, ILLUSION_COGS: ILLUSION_COGS,
    isThreeWay: isThreeWay, options: options, isAssessed: isAssessed, isValidChoice: isValidChoice,
    trueComparison: trueComparison, heightSays: heightSays, widthSays: widthSays, areaSays: areaSays,
    commitPrediction: commitPrediction, isCorrect: isCorrect, playPour: playPour,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
