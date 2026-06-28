/* =====================================================================
   CORE — Connect Sequence  (connect-sequence-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "produce the successor by counting on, to reveal
   an ordered trail" cognition (the spec's `engine-connect-sequence.js`).
   First skin: "Count the Stars Awake" — CCSS K.CC.A.2 (count forward from a
   GIVEN number k≠1; the successor function from an arbitrary entry point).

   The anti-cheat: the dots are BLANK + DARK (only the given start is
   labeled). `order` is INTERNAL — getRenderableState OMITS the order of any
   un-counted (dark) dot, so a numeral-matcher has nothing to read. Production
   is GENERATIVE: the firefly advances one star per count-on; to wake a target
   the child counts up to it and WAKES it (the cardinality stop) — MASHING
   then waking at the wrong star OVERSHOOTS (glide back), so there is no finite
   key-set to brute-force (the Game-12-hill-climb / Game-7-beam family, closed).

   Validity DERIVED (the produced count vs the target), NO stored on-screen
   answer beyond the lit start. Pure functions, no DOM. Mirrors draw-partition
   / count-twin cores.
   ===================================================================== */
(function (global) {
  'use strict';

  function maxOrder(round) { var m = round.start; round.dots.forEach(function (d) { if (d.order > m) m = d.order; }); return m; }
  function dotByOrder(round, o) { for (var i = 0; i < round.dots.length; i++) if (round.dots[i].order === o) return round.dots[i]; return null; }

  /* ---- the fused count-on + the wake (the cardinality stop) ---- */
  function initState(round) { return { count: round.start, segStart: round.start, lockedIdx: 0 }; }
  function commitCountOn(round, state) {
    if (state.count < maxOrder(round)) state.count++;                 // advance one star (tentative; lights as passed)
    return { count: state.count, fireflyOrder: state.count };
  }
  function wakeAttempt(round, state) {                                 // lock the firefly's current star IF it is the current target
    var t = round.targets[state.lockedIdx];
    if (state.count === t) { state.lockedIdx++; state.segStart = state.count; return { locked: true, solved: state.lockedIdx >= round.targets.length, count: state.count }; }
    state.count = state.segStart;                                      // OVERSHOOT / wrong stop → glide back to the segment start
    return { overshoot: true, count: state.count };
  }
  function isSolved(round, state) { return state.lockedIdx >= round.targets.length; }

  /* ---- the ONLY projection the skin/solver sees (dark dots carry NO order) ---- */
  function getRenderableState(round, state) {
    var dots = round.dots.map(function (d) {
      var lit = d.order <= state.segStart;                            // locked + the labeled start
      var passing = d.order > state.segStart && d.order <= state.count; // tentative (being counted)
      return { domId: d.domId || ('d' + d.order), cx: d.cx, cy: d.cy, lit: lit, passing: passing, order: (lit || passing) ? d.order : null };
    });
    return { dots: dots, fireflyOrder: state.count, count: state.count, start: round.start };
  }

  /* ---- geometry / pedagogy invariants ---- */
  function isDecadeCross(a) { return (a % 10) === 9; }                 // step a→a+1 crosses a decade when a ends in 9 (9→10, 19→20)
  function dist(a, b) { var dx = a.cx - b.cx, dy = a.cy - b.cy; return Math.sqrt(dx * dx + dy * dy); }
  function nearestUnlit(round, fromOrder) {                            // the spatially-nearest dot with order > fromOrder
    var from = dotByOrder(round, fromOrder), best = null, bd = Infinity;
    round.dots.forEach(function (d) { if (d.order > fromOrder) { var dd = dist(from, d); if (dd < bd) { bd = dd; best = d; } } });
    return best;
  }
  // anti-proximity: the next-in-sequence is NOT the nearest unlit dot — at the decade step ALWAYS, and ≥50% of steps overall
  function antiProximityOK(round) {
    var mx = maxOrder(round), steps = 0, anti = 0, decadeOK = true, hadDecade = false;
    for (var o = round.start; o < mx; o++) {
      var nn = nearestUnlit(round, o), next = dotByOrder(round, o + 1); if (!nn || !next) continue;
      steps++; var isAnti = nn.order !== (o + 1); if (isAnti) anti++;
      if (isDecadeCross(o)) { hadDecade = true; if (!isAnti) decadeOK = false; }
    }
    return { ok: decadeOK && (steps === 0 || anti / steps >= 0.5), antiRatio: steps ? anti / steps : 1, decadeOK: decadeOK, hadDecade: hadDecade };
  }

  function requiresPickAnchor(round) { return round.type === 'read-k'; }
  function requiresCountSet(round) { return round.type === 'quantity-start'; }

  /* ---- ANTI-PROXIMITY placement (generation-time): consecutive orders land far apart on a jittered
     circle via a star-polygon stride coprime to n, so the sequence-next is NEVER the nearest unlit dot. ---- */
  // TWO-COLUMN ZIGZAG: consecutive orders alternate left↔right columns, so the sequence-next is ALWAYS
  // across the panel while a same-column dot (the next-next) is nearer → anti-proximity by construction.
  function placeDots(start, n) {
    var leftX = 250, rightX = 750, topY = 165, botY = 835, rows = Math.ceil(n / 2), dots = [];
    for (var k = 0; k < n; k++) {
      var col = k % 2, row = Math.floor(k / 2);
      var x = (col === 0 ? leftX : rightX) + (((k * 53) % 13) - 6) * 6;
      var y = topY + (rows > 1 ? row * (botY - topY) / (rows - 1) : (botY - topY) / 2) + (((k * 97) % 11) - 5) * 5;
      dots.push({ order: start + k, cx: Math.round(x), cy: Math.round(y), domId: 'd' + (start + k) });
    }
    return dots;
  }
  // expand a manifest round (params only) into a full round with placed dots + absolute targets
  function expandRound(raw) {
    if (raw._expanded) return raw;
    var n = raw.n, start = raw.start, dots = placeDots(start, n);
    var targets = raw.targets && raw.targets.length ? raw.targets.slice() : [];
    if (!targets.length) { for (var o = start + 1; o <= start + n - 1; o++) targets.push(o); } // default +1 each
    var r = {}; for (var key in raw) r[key] = raw[key];
    r.dots = dots; r.targets = targets; r._expanded = true; return r;
  }

  /* ---- the SOLVER gauntlet (the gate drives these) ---- */
  // the unique pass: counts on EXACTLY to each target, then wakes
  function successorProducer(round) {
    var st = initState(round), guard = 0;
    while (!isSolved(round, st) && guard++ < 200) {
      var t = round.targets[st.lockedIdx];
      while (st.count < t) commitCountOn(round, st);
      wakeAttempt(round, st);
    }
    return isSolved(round, st);
  }
  // numeral-matcher: tries to read the next target from the visible tokens — dark dots have NO order → cannot identify it
  function numeralMatcher(round) {
    var st = initState(round), view = getRenderableState(round, st);
    var darkWithOrder = view.dots.filter(function (d) { return !d.lit && !d.passing && d.order != null; });
    return { canIdentifyTarget: darkWithOrder.length > 0, solved: false }; // solved:false ⇒ cannot win without producing
  }
  // exhaustion masher: GUESSES a tap-count per wake (NO target knowledge — the wake gives only locked/glide-back,
  // no direction), with a beat BUDGET equal to the OPTIMAL (maxOrder − start). Any overshoot wastes irrecoverable
  // beats → it runs out → fails. The producer uses exactly the budget. (No finite key-set is brute-forceable.)
  function exhaustionMasher(round, rng) {
    var st = initState(round), mx = maxOrder(round), budget = mx - round.start;
    while (!isSolved(round, st) && budget > 0) {
      var hops = 1 + Math.floor(rng() * Math.max(1, mx - st.segStart)); // a blind guess of how far to count
      for (var h = 0; h < hops && st.count < mx && budget > 0; h++) { commitCountOn(round, st); budget--; }
      wakeAttempt(round, st);                                          // wrong → glide back (count reset; the beats are GONE)
    }
    return isSolved(round, st);
  }
  // proximity solver: would chase the spatially-nearest dark dot — defeated by anti-proximity placement
  function proximitySolver(round) {
    var st = initState(round), guard = 0;
    while (!isSolved(round, st) && guard++ < 200) {
      var nn = nearestUnlit(round, st.segStart); if (!nn) break;       // it counts to the NEAREST dot's order, not the true next
      while (st.count < nn.order) commitCountOn(round, st);
      var r = wakeAttempt(round, st);
      if (!r.locked) { if (guard > 100) break; }                       // a wrong nearest → overshoot → never converges
    }
    return isSolved(round, st);
  }

  global.ConnectSequenceCore = {
    initState: initState, commitCountOn: commitCountOn, wakeAttempt: wakeAttempt, isSolved: isSolved,
    getRenderableState: getRenderableState, maxOrder: maxOrder, dotByOrder: dotByOrder,
    isDecadeCross: isDecadeCross, antiProximityOK: antiProximityOK, nearestUnlit: nearestUnlit,
    requiresPickAnchor: requiresPickAnchor, requiresCountSet: requiresCountSet,
    placeDots: placeDots, expandRound: expandRound,
    SOLVERS: { successorProducer: successorProducer, numeralMatcher: numeralMatcher, exhaustionMasher: exhaustionMasher, proximitySolver: proximitySolver }
  };

}(typeof window !== 'undefined' ? window : this));
