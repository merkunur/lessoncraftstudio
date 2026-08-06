#!/usr/bin/env node
/* =====================================================================
   verify-connect-sequence-core.js — build-time MEASURED gate for the
   count-on cognition behind "Count the Stars Awake" (CCSS K.CC.A.2). Loads
   the REAL mini tools/connect-sequence-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 NUMERAL-MATCHER FAILS — getRenderableState exposes NO order on dark
        (un-counted) dots → the next target cannot be read; 0 rounds solvable
        without producing the successor.
     #2 EXHAUSTION/OVERSHOOT-MASHER FAILS — a guesser (no target knowledge)
        overshoots the multi-step segments + never converges; the
        successor-producer is the unique pass (the #12-hill-climb analog).
     #3 PROXIMITY-SOLVER FAILS — chasing the spatially-nearest dark dot
        completes 0% of decks (anti-proximity placement).
     #4 SUCCESSOR-PRODUCER PASSES every round (the measured gap).
     #5 ANTI-PROXIMITY — every round: the sequence-next is NOT the nearest
        unlit dot at the decade step + ≥50% of steps; ≥1 round crosses a decade.
     #6 ranges — start≥2 (NEVER 1); 1–20; 5–8 steps; quantity-start cardinal
        === the perch.  #7 ≥7 distinct ACTS.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'connect-sequence-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ConnectSequenceCore;
if (!Core) { console.error('FAIL: connect-sequence-core.js did not define window.ConnectSequenceCore'); process.exit(1); }

const raw = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'star-stitcher-activities.json'), 'utf8'))[0].params.rounds;
const rounds = raw.map((r) => Core.expandRound(r));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const mulberry32 = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

let anyDecade = false;
rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`;

  /* #4 successor-producer PASSES */
  check(Core.SOLVERS.successorProducer(r), `${L}: the successor-producer cannot complete the round (unsolvable)`);

  /* #1 numeral-matcher FAILS — no dark dot exposes its order; it cannot identify the target */
  const nm = Core.SOLVERS.numeralMatcher(r);
  check(!nm.canIdentifyTarget && !nm.solved, `${L}: a dark dot leaks its order (numeral-matcher could read the target)`);
  // structural: getRenderableState at the start exposes NO order beyond the lit start
  const view = Core.getRenderableState(r, Core.initState(r));
  const leaks = view.dots.filter((d) => d.order != null && d.order !== r.start);
  check(leaks.length === 0, `${L}: getRenderableState exposes ${leaks.length} dark-dot order(s) at the start`);

  /* #3 proximity-solver FAILS (anti-proximity) */
  check(!Core.SOLVERS.proximitySolver(r), `${L}: the nearest-dark-dot (proximity) solver COMPLETED the round (placement leaks the path)`);

  /* #5 anti-proximity placement */
  const ap = Core.antiProximityOK(r);
  check(ap.ok, `${L}: anti-proximity FAILED (decadeOK=${ap.decadeOK}, antiRatio=${ap.antiRatio.toFixed(2)})`);
  if (ap.hadDecade) anyDecade = true;

  /* #6 ranges + quantity-start */
  check(r.start >= 2, `${L}: start ${r.start} < 2 (a start of 1 is K.CC.A.1 rote)`);
  check(Core.maxOrder(r) <= 20, `${L}: max order ${Core.maxOrder(r)} > 20`);
  check(r.n >= 5 && r.n <= 8, `${L}: ${r.n} stars (want 5–8 steps)`);
  if (r.type === 'quantity-start') check(r.setN === r.start, `${L}: quantity-start pip cardinal ${r.setN} ≠ the firefly perch ${r.start} (B.4 not load-bearing)`);

  /* targets are within range + increasing + the last reaches the final star (or its ceiling is a pre-lit anchor) */
  for (let i = 1; i < r.targets.length; i++) check(r.targets[i] > r.targets[i - 1], `${L}: targets not increasing`);
  const ceilingAnchored = (r.anchors || []).indexOf(Core.maxOrder(r)) >= 0;
  check(r.targets[r.targets.length - 1] === Core.maxOrder(r) || ceilingAnchored, `${L}: the last target is not the final star (and the ceiling is not a pre-lit anchor)`);
});

/* #2 EXHAUSTION-MASHER FAILS vs the successor-producer (measured) */
const TRIALS = 300;
let masherSolved = 0, masherN = 0;
rounds.forEach((r, ri) => { for (let t = 0; t < TRIALS; t++) { if (Core.SOLVERS.exhaustionMasher(r, mulberry32(((ri + 1) * 2654435761 ^ (t + 1) * 40503) >>> 0))) masherSolved++; masherN++; } });
const masherRate = masherSolved / masherN;
check(masherRate < 0.10, `exhaustion-masher completes ${(masherRate * 100).toFixed(1)}% of attempts (≥10% — there is a brute-forceable key-set)`);

/* #5 ≥1 decade-cross */
check(anyDecade, 'no round crosses a decade (9→10 / 19→20) — the prosody break is untested');

/* #7 ≥7 distinct ACTS */
check(new Set(rounds.map((r) => r.type)).size >= 7, `only ${new Set(rounds.map((r) => r.type)).size} distinct ACTS (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');

if (failures.length) {
  console.error(`FAIL — ${failures.length} connect-sequence violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${new Set(rounds.map((r) => r.type)).size} distinct acts: ` +
  `numeral-matcher cannot read the target (dark dots have NO order); exhaustion-masher ${(masherRate * 100).toFixed(1)}% (<10%, no key-set); ` +
  `proximity-solver 0% (anti-proximity placement, decade step always anti); successor-producer passes every round; start≥2, decade-cross present, quantity-start cardinal === perch.`);
process.exit(0);
