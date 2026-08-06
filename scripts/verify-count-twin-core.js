#!/usr/bin/env node
/* =====================================================================
   verify-count-twin-core.js — build-time MEASURED gate for the count-twin
   cognition behind "Twinsies" (CCSS K.CC.B.5). Loads the REAL
   mini tools/count-twin-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure):

     #1 BINARY-FEEDBACK / anti-nudge — feedback(n−1) and feedback(n+1) are
        byte-identical {twins:false}; feedback(n)={twins:true}. No direction.
     #2 NUDGE-HILL-CLIMB seen ≈ blind — a climber that reads the binary
        feedback does NOT converge faster than a blind random guesser (the
        channel carries no localizing signal — the #10 seen-vs-hidden analog).
     #3 SUBITIZE-ONLY FAILS THE DECK — all assessment rounds N≥6 (so a
        ≤4-only solver is random on every assessment round); N≤4 only on
        assessment:false; ≥1 teens round N∈[11,19].
     #4 DECORRELATION — every assessment round build-family ≠ model-family.
     #5 SKIP-STAGE-0 structural — assessment model rounds requireCover/commit.
     #6 validity DERIVED — no stored answer; validate=placed===n; capacity>N.
     #7 ≥7 distinct ACTS (rejecting arrangement-only).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'count-twin-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CountTwinCore;
if (!Core) { console.error('FAIL: count-twin-core.js did not define window.CountTwinCore'); process.exit(1); }

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'twinsies-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`, n = r.model.n;

  /* #6 validity derived */
  check(Core.validate(r, n), `${L}: the correct count is not accepted`);
  check(!Core.validate(r, n - 1) && !Core.validate(r, n + 1), `${L}: an off-by-one count was accepted`);
  check(Core.capacityFor(r) > n, `${L}: build capacity ${Core.capacityFor(r)} is not > N ${n} (fill-everything === N)`);
  check(!('answer' in r) && !('count' in r), `${L}: round carries a baked answer/count`);

  /* #1 binary feedback — byte-identical for n−1 and n+1, no direction */
  check(JSON.stringify(Core.feedback(r, n - 1)) === JSON.stringify(Core.feedback(r, n + 1)), `${L}: feedback(n−1) ≠ feedback(n+1) — a DIRECTION leaks`);
  check(Core.feedback(r, n).twins === true && Core.feedback(r, n - 1).twins === false, `${L}: feedback is not the binary twins-or-not channel`);

  /* #3 subitize / N≥6 */
  if (Core.isAssessment(r)) check(n >= 6, `${L}: assessment round N=${n} < 6 (subitizing could carry it)`);
  else check(n <= 8, `${L}: on-ramp N=${n} > 8`);

  /* #4 decorrelation on assessment rounds */
  if (Core.isAssessment(r)) check(Core.decorrelated(r), `${L}: assessment round is NOT decorrelated (build family === model family — shape-copy could win)`);
  else check(!Core.decorrelated(r) || r.source === 'numeral', `${L}: on-ramp should be same-family`);

  /* #5 skip-stage-0 structural: a model assessment round must require the cover OR be a numeral (no model to peek) */
  if (Core.isAssessment(r) && r.source !== 'numeral') check(Core.requiresCover(r) || r.type === 'scattered' || r.type === 'array' || r.type === 'count-on', `${L}: assessment model round lacks a stage-0 commitment mechanism`);
});

/* #2 NUDGE-HILL-CLIMB seen ≈ blind (the keystone) */
const TRIALS = 600, K = 40, MARGIN = 0.10;
let seenSolved = 0, blindSolved = 0, nn = 0, seenCalls = 0, blindCalls = 0, seenN = 0, blindN = 0;
rounds.forEach((r, ri) => {
  for (let t = 0; t < TRIALS; t++) {
    const seed = ((ri + 1) * 2654435761 ^ (t + 1) * 40503) >>> 0;
    const seen = Core.SOLVERS.nudgeClimber(r, mulberry32(seed), { seeFeedback: true, K });
    const blind = Core.SOLVERS.nudgeClimber(r, mulberry32(seed), { seeFeedback: false, K });
    nn++;
    if (seen.solved) { seenSolved++; seenCalls += seen.calls; seenN++; }
    if (blind.solved) { blindSolved++; blindCalls += blind.calls; blindN++; }
  }
});
const rateSeen = seenSolved / nn, rateBlind = blindSolved / nn;
const callsSeen = seenN ? seenCalls / seenN : K, callsBlind = blindN ? blindCalls / blindN : K;
check(rateSeen <= rateBlind * (1 + MARGIN), `nudge-climber RAISES solve-rate seeing feedback: seen ${rateSeen.toFixed(3)} > blind ${rateBlind.toFixed(3)} — a DIRECTION leaks`);
check(callsSeen >= callsBlind * (1 - MARGIN), `nudge-climber LOWERS calls seeing feedback: seen ${callsSeen.toFixed(2)} < blind ${callsBlind.toFixed(2)} — a DIRECTION leaks`);

/* #3 subitize fails the DECK + teens present */
const assess = rounds.filter((r) => Core.isAssessment(r));
let subHits = 0, subN = 0;
assess.forEach((r, ri) => { const rng = mulberry32((ri + 7) * 99991); for (let t = 0; t < 400; t++) { if (Core.SOLVERS.subitizeSolver(r, rng) === r.model.n) subHits++; subN++; } });
check(subHits / subN < 0.20, `subitize-only solver passes ${(subHits / subN * 100).toFixed(0)}% of assessment rounds (≥20% — N too small)`);
check(rounds.some((r) => r.model.n >= 11 && r.model.n <= 19), 'no teens round (N∈[11,19]) for ten-and-ones (K.NBT.A.1)');
check(rounds.every((r) => r.model.n > 4 || !Core.isAssessment(r)), 'an N≤4 round is assessment-bearing');

/* #7 ≥7 distinct ACTS (not arrangement-only) */
check(new Set(rounds.map((r) => r.type)).size >= 7, `only ${new Set(rounds.map((r) => r.type)).size} distinct ACTS (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');

if (failures.length) {
  console.error(`FAIL — ${failures.length} count-twin violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${new Set(rounds.map((r) => r.type)).size} distinct acts: ` +
  `binary feedback (n−1≡n+1, no direction); nudge-climber seen(rate ${rateSeen.toFixed(3)}, calls ${callsSeen.toFixed(1)}) ≈ blind(rate ${rateBlind.toFixed(3)}, calls ${callsBlind.toFixed(1)}) → no localizing signal; ` +
  `subitize-only ${(subHits / subN * 100).toFixed(0)}% (<20%, all assessment N≥6, teens present); decorrelation on every assessment round; validity DERIVED, capacity>N.`);
process.exit(0);
