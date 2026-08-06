#!/usr/bin/env node
/* =====================================================================
   verify-bead-string-core.js — build-time MEASURED gate for the bead-string
   cognition behind "The Necklace That Won't Hold Still" (CCSS K.CC.B.4).
   Loads the REAL mini tools/bead-string-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 COLOR-COPY FAILS / color is irrelevant — colorCopySolver (palette
        period) ≠ target on every assessment round; wrongColorCounter (right
        count, wrong colors) === target on EVERY round (color not even an input
        to validate → conservation by acceptance).
     #2 ROTE-DECOUPLED FAILS — no count outside thread/unthread → 0 ≠ target.
     #3 BULK / SUBITIZE BURST FAILS — `_busy` admits ≤1 → 1 ≠ target (>1).
     #4 MODEL-SUBITIZE FAILS the deck — exact only ≤5; all assessment N≥6.
     #5 CACHE-THE-COUNT FAILS (the Twinsies-distinction teeth) — a solver that
        trusts the first/naive read and never re-enumerates after the
        disturbance changed the node-set FAILS ≥3 rounds (scatter / injected
        error / no-model). On those rounds one-to-one still PASSES.
     #6 KEYPAD-EXHAUSTION FAILS #5 — the cardinality-confirm round accepts only
        the produced count; a typed-without-counting guess (0) is rejected.
     #7 CONSERVATION DEMONSTRATED-NOT-TESTED — every disturbance is arrangement-
        only (no add/remove); no win-condition branches on "did the count
        change"; no "is it still the same?" gate field.
     #8 BINARY FEEDBACK / anti-nudge — feedback(n−1) ≡ feedback(n+1); a climber
        reading it does NOT converge faster than blind (no localizing signal).
     #9 validity DERIVED — validate=count===target, no baked answer, capacity>N.
     #10 ≥7 distinct ACTS (by type), distinct ids, ceiling 10, ≥1 ≤5 on-ramp.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'bead-string-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.BeadStringCore;
if (!Core) { console.error('FAIL: bead-string-core.js did not define window.BeadStringCore'); process.exit(1); }
const S = Core.SOLVERS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'necklace-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const assess = rounds.filter((r) => Core.isOnRamp(r) === false);

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`, n = r.targetCount;

  /* #9 validity derived */
  check(Core.validate(r, n), `${L}: the correct count is not accepted`);
  check(!Core.validate(r, n - 1) && !Core.validate(r, n + 1), `${L}: an off-by-one count was accepted`);
  check(Core.capacityFor(r) > n, `${L}: capacity ${Core.capacityFor(r)} is not > N ${n}`);
  check(!('answer' in r), `${L}: round carries a baked 'answer'`);
  check(typeof r.targetCount === 'number' && r.targetCount >= 1 && r.targetCount <= 10, `${L}: targetCount ${n} outside 1..10`);

  /* #8 binary feedback — byte-identical for n−1 and n+1, no direction */
  check(JSON.stringify(Core.feedback(r, n - 1)) === JSON.stringify(Core.feedback(r, n + 1)), `${L}: feedback(n−1) ≠ feedback(n+1) — a DIRECTION leaks`);
  check(Core.feedback(r, n).clasp === true && Core.feedback(r, n - 1).clasp === false, `${L}: feedback is not the binary clasp-or-not channel`);

  /* #7 conservation: every disturbance is arrangement-only (no count change) */
  check(!Core.disturbanceChangesCount(r), `${L}: a disturbance CHANGES the count (must be arrangement-only)`);
  check(!('expectChanged' in r) && !('isStillSame' in r), `${L}: a "did it change / is it still the same" gate field exists (conservation must be DEMONSTRATED, not tested)`);

  /* #1 color: wrong-color/right-count must PASS on every round */
  check(S.wrongColorCounter(r) === n, `${L}: a right-count / wrong-color necklace is NOT accepted — order is being graded (patterning drift)`);

  /* #2/#3 rote + bulk fail everywhere */
  check(S.roteDecoupledSolver(r) !== n, `${L}: rote-decoupled (no threading) reaches the target`);
  check(S.bulkSubitizeSolver(r) !== n, `${L}: a single-frame bulk burst reaches the target (target ${n})`);

  /* honest one-to-one passes everywhere */
  check(S.oneToOneCounter(r) === n, `${L}: the honest one-to-one counter does NOT reach the target`);

  /* assessment-only floors */
  if (Core.isOnRamp(r) === false) {
    check(n >= 6, `${L}: assessment round N=${n} < 6 (subitizing could carry it)`);
    check(S.colorCopySolver(r) !== n, `${L}: color-copy (palette period) reaches the target — color is being graded`);
    check(S.modelSubitizeSolver(r) !== n, `${L}: model-subitize reaches the target on N≥6`);
  } else {
    check(n <= 5, `${L}: on-ramp N=${n} > 5`);
  }
});

/* #5 cache-the-count fails the re-enumeration rounds (the Twinsies-distinction) */
const reEnum = rounds.filter((r) => r.naiveCount !== r.targetCount);
check(reEnum.length >= 3, `only ${reEnum.length} re-enumeration rounds (<3) — the count-then-hide distinction is not load-bearing`);
reEnum.forEach((r) => {
  check(S.cacheTheCountSolver(r) !== r.targetCount, `round[${r.id}]: cache-the-count (no re-enumerate) reaches the target — Twinsies-collapse`);
  check(S.oneToOneCounter(r) === r.targetCount, `round[${r.id}]: one-to-one fails a re-enumeration round`);
});

/* #6 keypad-exhaustion fails the cardinality-confirm round */
const confirm = rounds.filter((r) => r.confirmFromCount);
check(confirm.length >= 1, 'no cardinality-confirm (confirmFromCount) round');
confirm.forEach((r) => check(S.keypadExhaustionSolver(r) !== r.targetCount, `round[${r.id}]: keypad-exhaustion (typed, not counted) reaches the target — #5 not de-brute-forced`));

/* #4 model-subitize fails the assessment DECK */
let subHits = 0, subN = 0;
assess.forEach((r) => { if (S.modelSubitizeSolver(r) === r.targetCount) subHits++; subN++; });
check(subN > 0 && subHits / subN < 0.20, `model-subitize passes ${subN ? (subHits / subN * 100).toFixed(0) : '—'}% of assessment rounds (≥20% — N too small)`);

/* #8 NUDGE-HILL-CLIMB seen ≈ blind (the keystone) */
const TRIALS = 600, K = 40, MARGIN = 0.10;
let seenSolved = 0, blindSolved = 0, nn = 0, seenCalls = 0, blindCalls = 0, seenN = 0, blindN = 0;
rounds.forEach((r, ri) => {
  for (let t = 0; t < TRIALS; t++) {
    const seed = ((ri + 1) * 2654435761 ^ (t + 1) * 40503) >>> 0;
    const seen = S.nudgeClimber(r, mulberry32(seed), { seeFeedback: true, K });
    const blind = S.nudgeClimber(r, mulberry32(seed), { seeFeedback: false, K });
    nn++;
    if (seen.solved) { seenSolved++; seenCalls += seen.calls; seenN++; }
    if (blind.solved) { blindSolved++; blindCalls += blind.calls; blindN++; }
  }
});
const rateSeen = seenSolved / nn, rateBlind = blindSolved / nn;
const callsSeen = seenN ? seenCalls / seenN : K, callsBlind = blindN ? blindCalls / blindN : K;
check(rateSeen <= rateBlind * (1 + MARGIN), `nudge-climber RAISES solve-rate seeing feedback: seen ${rateSeen.toFixed(3)} > blind ${rateBlind.toFixed(3)} — a DIRECTION leaks`);
check(callsSeen >= callsBlind * (1 - MARGIN), `nudge-climber LOWERS calls seeing feedback: seen ${callsSeen.toFixed(2)} < blind ${callsBlind.toFixed(2)} — a DIRECTION leaks`);

/* #7 getRenderableState never leaks the target */
rounds.forEach((r) => {
  const v = Core.getRenderableState(r, { count: 0, placed: [], spoken: 0 });
  check(!('targetCount' in v) && !('target' in v), `round[${r.id}]: getRenderableState leaks the target`);
  check(v.modelBeads.every((b) => !('order' in b) && !('ordinal' in b) && b.label === 'bead'), `round[${r.id}]: a model bead leaks an ordinal (anti-cheat broken)`);
});

/* #10 distinctness + ranges */
check(new Set(rounds.map((r) => r.type)).size >= 7, `only ${new Set(rounds.map((r) => r.type)).size} distinct ACTS (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.every((r) => r.targetCount <= 10), 'a round exceeds the ceiling of 10');
check(rounds.some((r) => r.targetCount <= 5 && Core.isOnRamp(r)), 'no ≤5 on-ramp round');

if (failures.length) {
  console.error(`FAIL — ${failures.length} bead-string violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${new Set(rounds.map((r) => r.type)).size} distinct acts: ` +
  `color irrelevant (wrong-color/right-count passes; color-copy fails all assessment); rote=0 / bulk=1 / model-subitize ${(subHits / subN * 100).toFixed(0)}% (<20%) all FAIL; ` +
  `cache-the-count FAILS ${reEnum.length} re-enumeration rounds (Twinsies-distinction); keypad-exhaustion FAILS #5; conservation arrangement-only (no count-change gate); ` +
  `nudge seen(rate ${rateSeen.toFixed(3)}, calls ${callsSeen.toFixed(1)}) ≈ blind(rate ${rateBlind.toFixed(3)}, calls ${callsBlind.toFixed(1)}) → no direction; validity DERIVED, capacity>N, target never leaked.`);
process.exit(0);
