/* =====================================================================
   PIP'S MARKET STALL — CORE  (coin-stall-core.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.C.8 — solve word problems with dollars/quarters/dimes/nickels/
   pennies, using $ and ¢. Pure cognition, NO DOM. The graded cognition is
   DENOMINATION-VALUE KNOWLEDGE / UNITIZING: recognize each coin (size/tint)
   + RETRIEVE its learned value (penny=1, nickel=5, dime=10, quarter=25 —
   the value is INVISIBLE ON THE COIN, never read off the art) + compose
   mixed denominations to a target. value(coin) ≠ count ≠ size ≠ read-a-label.
   0 lines to any protected core + lcs-shell.{js,css}.

   This MIRRORS money-core.js's {den→value} table idiom + the value-sum
   arithmetic — but DEPARTS on the 3 distinctness points: value invisible on
   the coin, NO live total (commit-then-check), TRUE-relative diameters (the
   dime is the smallest coin). It does NOT fork/modify the live MoneyCore.

   THE GATE-CAN'T-CHEAT PROOF (verify-coin-stall-core.js): a value-composer
   oracle wins 100% while COUNT-PIPS / ALL-PENNIES / NUMBER-CHASE / BRUTE /
   LEGEND-MATCH (passes scaffolded, fails legend-free) / SIZE-GREEDY (fails
   the dime round) all score <= chance.
   ===================================================================== */
(function (global) {
  'use strict';

  /* the US coin set — the value is the LEARNED knowledge; the diameter is
     TRUE-RELATIVE (the dime 18 is SMALLER than the nickel 21 — the value≠size
     confront). `glyph` is a denomination recognition monogram (NOT the value).
     The activity reads this from the manifest; this default backs the gate. */
  var US_COINSET = [
    { den: 'penny', value: 1, glyph: 'P', tint: '#C97B43', diameter: 19 },
    { den: 'nickel', value: 5, glyph: 'N', tint: '#A9A9A9', diameter: 21 },
    { den: 'dime', value: 10, glyph: 'D', tint: '#B8B8B8', diameter: 18 },
    { den: 'quarter', value: 25, glyph: 'Q', tint: '#9FA0A2', diameter: 24 },
    { den: 'dollar', value: 100, glyph: '$', tint: '#7BA86B', diameter: 28 }
  ];

  var COMPOSE_COGS = { 'make-amount': 1, 'fewest': 1, 'change': 1, 'two-ways': 1, 'trade': 1 };
  var CHOOSE_COGS = { 'count-set': 1, 'enough': 1 };
  var COGS = ['count-set', 'make-amount', 'fewest', 'change', 'enough', 'two-ways', 'trade'];

  function coinSetOf(round) { return (round && round.coinSet) || US_COINSET; }
  function valueOf(coinSet, den) { for (var i = 0; i < coinSet.length; i++) { if (coinSet[i].den === den) return coinSet[i].value; } return 0; }
  function diameterOf(coinSet, den) { for (var i = 0; i < coinSet.length; i++) { if (coinSet[i].den === den) return coinSet[i].diameter; } return 0; }
  function placedValue(coinSet, trayDens) { var s = 0; for (var i = 0; i < trayDens.length; i++) s += valueOf(coinSet, trayDens[i]); return s; }
  function pileValue(coinSet, pile) { var s = 0; (pile || []).forEach(function (p) { s += p.count * valueOf(coinSet, p.den); }); return s; }

  /* greedy min-coin count over the coinSet (canonical US system → greedy is
     optimal). Used by the fewest grader + the dime-value-over-size assert. */
  function minCoins(coinSet, target) {
    var dens = coinSet.map(function (c) { return c.value; }).sort(function (a, b) { return b - a; });
    var t = target, n = 0;
    for (var i = 0; i < dens.length; i++) { n += Math.floor(t / dens[i]); t %= dens[i]; }
    return t === 0 ? n : Infinity;
  }
  /* the denomination multiset of the fewest solution (for the size-greedy +
     dime-round asserts). */
  function fewestDens(coinSet, target) {
    var sorted = coinSet.slice().sort(function (a, b) { return b.value - a.value; });
    var t = target, out = [];
    sorted.forEach(function (c) { while (t >= c.value) { out.push(c.den); t -= c.value; } });
    return t === 0 ? out : null;
  }

  function sameMultiset(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  /* the effective value the child must COMPOSE for a COMPOSE cog. */
  function effectiveTarget(round) {
    var cs = coinSetOf(round);
    if (round.cog === 'change') return round.paid - round.price;
    if (round.cog === 'trade') return valueOf(cs, round.offer.den) * (round.offer.count || 1);
    return round.target;
  }

  /* state() — under/over/exact keyed on Σ VALUE (the only scored quantity).
     For the activity's seal + over-adjust (NO live total shown to the child). */
  function state(round, trayDens) {
    var cs = coinSetOf(round), v = placedValue(cs, trayDens), tgt = effectiveTarget(round);
    if (v < tgt) return 'under';
    if (v > tgt) return 'over';
    return 'exact';
  }

  /* gradeCompose — the full per-cog check at the "Pay" commit. */
  function gradeCompose(round, trayDens) {
    var cs = coinSetOf(round);
    if (state(round, trayDens) !== 'exact') return false;
    if (round.cog === 'fewest') return trayDens.length === minCoins(cs, effectiveTarget(round));
    if (round.cog === 'two-ways') return !sameMultiset(trayDens, round.shownSet);
    if (round.cog === 'trade') return trayDens.indexOf(round.offer.den) === -1;   /* trade the coin AWAY — compose its value from OTHER denominations */
    return true;   /* make-amount / change: exact value is the bar */
  }

  function enoughVerdict(diff) { return diff < 0 ? 'short' : (diff > 0 ? 'over' : 'enough'); }

  /* gradeChoose — count-set (tap the total) / enough (tap short|enough|over). */
  function gradeChoose(round, choice) {
    var cs = coinSetOf(round);
    if (round.cog === 'count-set') return Number(choice) === pileValue(cs, round.pile);
    if (round.cog === 'enough') return choice === enoughVerdict(pileValue(cs, round.pile) - round.price);
    return false;
  }

  /* snapshot — the renderer's view. Coins carry den+glyph+size+tint but NO
     value; NO live total; the legend per tier. Deliberately NO solution. */
  function snapshot(round) {
    var cs = coinSetOf(round);
    return {
      cog: round.cog,
      isCompose: !!COMPOSE_COGS[round.cog],
      coinSet: cs.map(function (c) { return { den: c.den, glyph: c.glyph, tint: c.tint, diameter: c.diameter }; }),   /* NO value */
      legendTier: round.legendTier || 'none',
      scenario: round.scenario || '',
      price: round.price, paid: round.paid, target: round.target, offer: round.offer,
      shownSet: round.shownSet || null,
      pile: round.pile || null,
      options: round.options || null
      /* deliberately NO effectiveTarget on COMPOSE, NO live total, NO solution */
    };
  }

  /* legend-free = the value is NOT directly readable from the legend (only the
     'full' tier pairs coin↔value). */
  function legendIsFree(round) { return (round.legendTier || 'none') !== 'full'; }

  function denomsInPurse(round) { var seen = {}; (round.purse || []).forEach(function (d) { seen[d] = (seen[d] || 0) + 1; }); return seen; }

  /* does any SINGLE denomination (within the purse supply) reach the target?
     if not → the solution needs ≥2 denominations (the anti-all-pennies). */
  function needsTwoDenominations(round) {
    if (!COMPOSE_COGS[round.cog]) return true;
    var cs = coinSetOf(round), tgt = effectiveTarget(round), supply = denomsInPurse(round);
    for (var i = 0; i < cs.length; i++) {
      var d = cs[i], k = tgt / d.value;
      if (k >= 1 && k === Math.floor(k) && (supply[d.den] || 0) >= k) return false;   /* one den suffices */
    }
    return true;
  }

  function facts(round) {
    var cs = coinSetOf(round), supply = denomsInPurse(round);
    var dimeFewest = false;
    if (round.cog === 'fewest') {
      var fd = fewestDens(cs, effectiveTarget(round));
      dimeFewest = !!fd && fd.indexOf('dime') !== -1;   /* the fewest solution uses the (smallest) dime */
    }
    return {
      cog: round.cog,
      noValueNumeralOnCoin: true,            /* the activity renders no value on the coin face */
      noLiveGauge: true,                     /* commit-then-check; no running total */
      scoredByValueNotCount: true,
      reshuffleOnWrong: true,
      adjustDontWipe: true,                  /* over → the child removes a coin; no system wipe */
      pennyCount: supply.penny || 0,
      pennyOK: (supply.penny || 0) <= 4,
      solutionNeeds2Denominations: needsTwoDenominations(round),
      legendTier: round.legendTier || 'none',
      legendFree: legendIsFree(round),
      wordProblemFramed: !!(round.scenario && String(round.scenario).trim().length > 0),
      dollarCrossing: effectiveTarget(round) >= 100 || (round.paid || 0) >= 100,
      dimeValueOverSize: dimeFewest
    };
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var cs = coinSetOf(round);
    return {
      id: round.id, cog: round.cog, isCompose: !!COMPOSE_COGS[round.cog],
      coinSet: cs, purse: (round.purse || []).slice(),
      target: effectiveTarget(round),
      legendTier: round.legendTier || 'none', legendFree: legendIsFree(round),
      pile: round.pile || null, price: round.price, options: round.options || null,
      shownSet: round.shownSet || null,
      fewestDens: round.cog === 'fewest' ? fewestDens(cs, effectiveTarget(round)) : null,
      correctChoice: round.cog === 'count-set' ? pileValue(cs, round.pile)
        : round.cog === 'enough' ? enoughVerdict(pileValue(cs, round.pile) - round.price) : null
    };
  }

  global.CoinStallCore = {
    US_COINSET: US_COINSET,
    COMPOSE_COGS: COMPOSE_COGS, CHOOSE_COGS: CHOOSE_COGS, COGS: COGS,
    coinSetOf: coinSetOf, valueOf: valueOf, diameterOf: diameterOf,
    placedValue: placedValue, pileValue: pileValue, minCoins: minCoins, fewestDens: fewestDens,
    sameMultiset: sameMultiset, effectiveTarget: effectiveTarget, state: state,
    gradeCompose: gradeCompose, gradeChoose: gradeChoose, enoughVerdict: enoughVerdict,
    snapshot: snapshot, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
