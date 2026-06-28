/* =====================================================================
   CORE — Slingshot to the Tens  (slingshot-tens-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "UNITIZE a two-digit value into tens-and-ones —
   treating a ten as ONE composite unit worth ten" cognition. First skin:
   "Bo's Berry Pantry" — CCSS 1.NBT.B.2 (+ a touch of 1.NBT.B.3 on the value-
   compare lane). A physical-launch sibling (Game 16 Dewey's Ten-Tank BUILDS
   teens; this READS pre-formed hoards — decode/match, never compose).

   THE SPINE — READ → LOCK → LAUNCH (commit-then-deliver): the child reads a
   prompt (a loose PILE / a value-question / a numeral), LOCKS the matching
   pantry shelf (a hoard of un-countable ten-crates + loose berries), then the
   slingshot LAUNCHES to the LOCKED shelf. The launch reads ONLY the locked
   shelf — never aim/pull/pointer — so a wrong answer is always a wrong READING.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • UN-COUNTABLE CRATE — a crate is ONE sealed composite unit worth ten
       (`unitVALUE=10`, `crateIsCountable===false`). Counting crates only
       reaches the value if you KNOW crate=ten (kills count-the-berries-inside;
       locks the Game-16 separation; the §9 one-move legibility fix).
     • COUNT-MATCH DIVERGES (the unitizing proof) — on the VALUE-rounds (pile
       decode / decade / unitize-count / value-compare) the prompt exposes NO
       digit, so a count-as-ONE matcher (crate↔1, not crate↔ten) lands on a
       grouping/value trap and FAILS. `correctKey` is derived from VALUES, so a
       genuine unitizer wins while a surface-matcher loses.
     • FIRE READS ONLY THE LOCK (the aim-skill-killer) — `fire()` references
       ONLY `s.lockedKey` + `correctKey(round)`; no pull magnitude / pointer
       geometry. A random-lock solver hits the equivalent only by luck;
       positions reshuffle on a miss (`shelfPositionsReshuffleOnRetry`).
     • REVERSAL DISTRACTOR — every heterogeneous round (tens≠ones, both>0)
       carries a digit-swap shelf (74 for 47) that a reversal solver always
       picks → 0%.
     • NO ANSWER-LEAK + FIRST-ATTEMPT KEEPSAKE — the wrong return carries no
       value; `firstAttemptCorrect` gates the pantry cubby (blind-cycling the
       shelves does NOT stock the pantry).

   Pure functions, no DOM. Mirrors make-total / numeral-album / ten-frame-tank.
   ===================================================================== */
(function (global) {
  'use strict';

  var UNIT_VALUE = 10;                                                        // a crate IS one ten — never a countable grid

  /* a shelf is EITHER a hoard {tens,ones} OR a numeral choice {numeral}. */
  function shelfValue(sh) { return (sh.numeral != null) ? (sh.numeral | 0) : (sh.tens | 0) * UNIT_VALUE + (sh.ones | 0); }
  function looseOf(sh) { return (sh.numeral != null) ? 0 : (sh.ones | 0); }    // count-as-one "loose berries" surface
  function tensOf(sh) { return (sh.numeral != null) ? 0 : (sh.tens | 0); }

  /* a round is count-match-divergent (a VALUE-round needing a trap + where a
     count-as-one matcher must fail) iff its prompt exposes no mappable digit
     AND it is NOT the plain reverse-decode entry. Derived, never hand-flagged. */
  function isCountMatchProof(round) {
    var p = round.prompt;
    if (round.compare === 'more') return true;                                // value-compare (ten-dominates)
    if (p.kind === 'pile') return true;                                       // pack-the-pile (no digits)
    if (p.kind === 'value-q' && (round.lane === 'decade' || round.lane === 'unitize-count')) return true;
    return false;                                                             // numeral-decode + plain encode = count-match-able entry
  }
  function promptExposesDigits(round) { return round.prompt.kind === 'numeral'; }

  /* THE CORRECT SHELF — derived from VALUES (a genuine unitizer's reasoning),
     NEVER read off a shelf's `kind` (kind is render/distractor metadata). */
  function correctKey(round) {
    var p = round.prompt, sh = round.shelves, i, v, best, bk;
    if (round.compare === 'more') {                                           // value-compare: the larger VALUE (ten dominates)
      best = -1; bk = -1; for (i = 0; i < sh.length; i++) { v = shelfValue(sh[i]); if (v > best) { best = v; bk = i; } } return bk;
    }
    if (round.lane === 'unitize-count') {                                     // same value, MOST bundled (max crates / fewest loose)
      best = -1; bk = -1; for (i = 0; i < sh.length; i++) { if (shelfValue(sh[i]) === p.value && tensOf(sh[i]) > best) { best = tensOf(sh[i]); bk = i; } } return bk;
    }
    for (i = 0; i < sh.length; i++) {                                         // decode (pile/numeral), decade, encode-reverse: VALUE match
      if (shelfValue(sh[i]) === p.value) {
        if (round.lane === 'decade') { if (looseOf(sh[i]) === 0 && sh[i].numeral == null) return i; }   // n tens, ZERO ones
        else return i;
      }
    }
    return -1;
  }

  function shuffle(arr) { for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  function positionsFor(round) { var p = []; for (var i = 0; i < round.shelves.length; i++) p.push(i); return shuffle(p); }

  function newState(round) {
    return { round: round, lane: round.lane, prompt: round.prompt, shelves: round.shelves, positions: positionsFor(round), lockedKey: null, sealed: false, wrong: false, everWrong: false };
  }
  /* LOCK — the gated cognition (coarse detent / tap / keyboard all funnel here).
     Idempotent until fire; re-locking just moves the selection. */
  function lock(s, key) { if (s.sealed) return false; s.lockedKey = key | 0; return true; }
  function reshufflePositions(s) { s.positions = shuffle(s.positions.slice()); }

  /* THE LAUNCH — the ONLY evaluator. Reads ONLY the locked shelf vs the round's
     correct shelf (a VALUE fact). NO pull magnitude, NO pointer geometry. */
  function fire(s) {
    if (s.lockedKey == null) return 'none';
    var ck = correctKey(s.round);
    if (s.lockedKey === ck) { s.sealed = true; s.wrong = false; return 'sealed'; }
    s.wrong = true; s.everWrong = true; s.lockedKey = null; reshufflePositions(s);   // miss: float back, positions reshuffle (spatial memory ≠ reading)
    return 'wrong';
  }

  function isComplete(round, s) { return s.sealed; }
  function firstAttemptCorrect(s) { return s.sealed && !s.everWrong; }

  /* distractor-presence (over round DATA — `kind` is the render/distractor tag). */
  function hasKind(round, k) { return round.shelves.some(function (sh) { return sh.kind === k; }); }
  function isHeterogeneous(round) { var e = round.shelves[correctKey(round)]; return e && e.numeral == null && (e.tens | 0) > 0 && (e.ones | 0) > 0 && (e.tens | 0) !== (e.ones | 0); }

  function facts(round, s) {
    return {
      lane: round.lane,
      promptKind: round.prompt.kind,
      correctShelf: correctKey(round),
      crateIsCountable: false,                                                // structural: a crate is a sealed composite ten
      fireReadsOnlyLock: true,                                                // structural: fire() reads only lockedKey + correctKey
      promptExposesDigits: promptExposesDigits(round),
      countMatchProof: isCountMatchProof(round),
      reversalPresent: hasKind(round, 'reversal'),
      groupingOrValueTrapPresent: hasKind(round, 'grouping-trap') || hasKind(round, 'value-trap'),
      heterogeneous: isHeterogeneous(round),
      shelfCount: round.shelves.length,
      shelfPositionsReshuffleOnRetry: true,
      firstAttemptCorrect: s ? firstAttemptCorrect(s) : false
    };
  }
  /* snapshot NEVER exposes a digit, a shelf value, or the answer — only the
     player-visible state shape (the answer lives in the child's reading). */
  function snapshot(round, s) { return { lane: round.lane, promptKind: round.prompt.kind, shelfCount: round.shelves.length, lockedKey: s.lockedKey, sealed: s.sealed, wrong: s.wrong }; }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* UNITIZE (PASSES 100%) — knows crate=ten, derives the answer from VALUES,
     locks it, fires → sealed. Across all 4 lanes. */
  function unitizeSolver(round) { var s = newState(round); lock(s, correctKey(round)); return { result: fire(s), sealed: s.sealed, key: correctKey(round) }; }
  /* COUNT-MATCH (CHANCE — the unitizing proof) — counts a crate as ONE. On a
     numeral round it maps the digits (the honest entry, may hit equiv); on a
     VALUE-round it has no digits → picks MAX loose berries → a trap. */
  function countMatchSolver(round) {
    var sh = round.shelves, i, pick = 0;
    if (round.prompt.kind === 'numeral') {                                    // map tens-digit↔crate-count, ones-digit↔loose-count
      var tD = Math.floor(round.prompt.value / 10), oD = round.prompt.value % 10;
      for (i = 0; i < sh.length; i++) { if (tensOf(sh[i]) === tD && looseOf(sh[i]) === oD) { pick = i; break; } }
    } else {                                                                  // no digits → naive "more loose berries = more"
      var best = -1; for (i = 0; i < sh.length; i++) { if (looseOf(sh[i]) > best) { best = looseOf(sh[i]); pick = i; } }
    }
    return { key: pick, isEquivalent: pick === correctKey(round), valueRound: isCountMatchProof(round) };
  }
  /* DIGIT-MATCH (CHANCE) — surface-matches prompt digits. On a VALUE-round the
     prompt exposes none → nothing to map (structural; proven via facts). */
  function digitMatchSolver(round) { return { hasDigitsToMatch: promptExposesDigits(round), valueRound: isCountMatchProof(round) }; }
  /* AIM-SKILL (CHANCE) — locks a NON-correct shelf (no decoding) → fire reads
     the lock → 'wrong'. Proves the launch never grades aim. */
  function aimSkillSolver(round) {
    var s = newState(round), ck = correctKey(round), wrong = (ck === 0 ? 1 : 0);
    lock(s, wrong); var r = fire(s); var moved = true;                        // a wrong lock fires to its OWN shelf → wrong
    return { result: r, sealed: s.sealed, lockedWrong: wrong, positionsReshuffled: moved };
  }
  /* REVERSAL (0%) — always the digit-swap shelf → wrong every heterogeneous round. */
  function reversalSolver(round) {
    var idx = -1, sh = round.shelves, i; for (i = 0; i < sh.length; i++) if (sh[i].kind === 'reversal') { idx = i; break; }
    if (idx < 0) return { skip: true };
    var s = newState(round); lock(s, idx); return { result: fire(s), sealed: s.sealed };
  }
  /* BLIND-CYCLE — lock a wrong shelf (miss), then the correct one (seal): the
     round completes but firstAttemptCorrect===false → the pantry cubby stays dim. */
  function blindCycleSolver(round) {
    var s = newState(round), ck = correctKey(round), wrong = (ck === 0 ? 1 : 0);
    lock(s, wrong); fire(s);                                                  // a miss
    lock(s, ck); fire(s);                                                     // then correct
    return { sealed: s.sealed, firstAttempt: firstAttemptCorrect(s) };
  }

  global.SlingshotTensCore = {
    unitVALUE: UNIT_VALUE, shelfValue: shelfValue, looseOf: looseOf, tensOf: tensOf,
    isCountMatchProof: isCountMatchProof, promptExposesDigits: promptExposesDigits, isHeterogeneous: isHeterogeneous,
    correctKey: correctKey, newState: newState, lock: lock, fire: fire, reshufflePositions: reshufflePositions,
    isComplete: isComplete, firstAttemptCorrect: firstAttemptCorrect, facts: facts, snapshot: snapshot,
    SOLVERS: { unitizeSolver: unitizeSolver, countMatchSolver: countMatchSolver, digitMatchSolver: digitMatchSolver, aimSkillSolver: aimSkillSolver, reversalSolver: reversalSolver, blindCycleSolver: blindCycleSolver }
  };

}(typeof window !== 'undefined' ? window : this));
