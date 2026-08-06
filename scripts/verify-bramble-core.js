#!/usr/bin/env node
/* =====================================================================
   verify-bramble-core.js — the MEASURED build-gate for "Bramble's Berry-
   Juice Stand" (K.MD.A.2 · capacity). Loads the REAL bramble-core.js via
   `new Function` + the bramble-activities.json deck, then drives the core
   with an oracle + the critic-armed adversary set. HALTS the build on any
   failure. NOTHING here re-implements the core — every verdict comes from
   the shipped BrambleCore.

   THE HEADLINE PROOF (the critic's deepest fix): a reason-about-capacity
   ORACLE wins 100% while —
     • OBSERVE-THE-POUR        (playPour throws pre-commit; snapshot leaks no
                                level) → cannot answer
     • JUDGE-BY-HEIGHT/WIDTH/AREA (>=60% of the ASSESSED body is appearance-
                                anti-correlated) → <= 40% on the assessed body
     • CONSTANT                (no truth class is a majority) → < 50%
     • MEMORIZE-EXCEPTIONS     (STATEFUL — caches the visible surface→answer,
                                but every re-test is a NOVEL surface of the
                                same structure → the cache never hits) → <= 40%
   — all lose. The stateful solver closes the stateless-only blind spot.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'bramble-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'bramble-activities.json');

/* ---- load the REAL core in a bare sandbox (no DOM) ---- */
function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  /* the IIFE assigns to (window||this).BrambleCore — pass an object as both */
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.BrambleCore) throw new Error('BrambleCore did not attach to the global');
  return sandbox.BrambleCore;
}

function loadDeck() {
  const rows = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = rows.find((r) => r.id === 'bramble.holds-more.k-md-a-2');
  if (!row || !row.params || !Array.isArray(row.params.rounds)) {
    throw new Error('bramble-activities.json: rounds not found');
  }
  return row.params.rounds;
}

const C = loadCore();
const ROUNDS = loadDeck();
const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const threeWay = ROUNDS.filter((r) => C.isThreeWay(r));
const assessedThree = ROUNDS.filter((r) => r.assessment === true && C.isThreeWay(r));

/* score a stateless solver(round)->choice over a round subset */
function score(solver, subset) {
  let ok = 0;
  subset.forEach((r) => { if (C.isCorrect(r, solver(r))) ok += 1; });
  return { ok: ok, n: subset.length, rate: subset.length ? ok / subset.length : 0 };
}

/* ---------- 1. ORACLE → 100% over the WHOLE deck ---------- */
const oracle = (r) => C.audit(r).trueComparison;
const oRes = score(oracle, ROUNDS);
note(oRes.rate === 1, `oracle scored ${pct(oRes.ok, oRes.n)}% (need 100%) — deck/core inconsistent`);

/* ---------- 2. OBSERVE-THE-POUR → cannot answer ---------- */
let pourThrewEveryRound = true, snapshotLeaked = false;
ROUNDS.forEach((r) => {
  try { C.playPour(r, null); pourThrewEveryRound = false; } catch (e) { /* expected */ }
  const snapJson = JSON.stringify(C.snapshot(r));
  if (/trueCapacity|"level"|"fill"|"trueComparison"/.test(snapJson)) snapshotLeaked = true;
});
note(pourThrewEveryRound, 'OBSERVE-THE-POUR: playPour() did NOT throw before a commit on some round (predict-first not enforced)');
note(!snapshotLeaked, 'OBSERVE-THE-POUR: snapshot() leaked trueCapacity / level / fill (result pre-shown)');
note(ROUNDS.every((r) => C.facts(r).predictionBeforePour && C.facts(r).resultNotPreshown),
  'OBSERVE-THE-POUR: facts.predictionBeforePour / resultNotPreshown not asserted on every round');

/* ---------- 3. JUDGE-BY-HEIGHT / WIDTH / AREA → fail on the ASSESSED body ---------- */
const hgt = score((r) => C.heightSays(r), assessedThree);
const wid = score((r) => C.widthSays(r), assessedThree);
const are = score((r) => C.areaSays(r), assessedThree);
note(hgt.rate <= 0.4, `JUDGE-BY-HEIGHT scored ${pct(hgt.ok, hgt.n)}% on the assessed body (need <= 40%)`);
note(wid.rate <= 0.4, `JUDGE-BY-WIDTH scored ${pct(wid.ok, wid.n)}% on the assessed body (need <= 40%)`);
note(are.rate <= 0.4, `JUDGE-BY-AREA scored ${pct(are.ok, are.n)}% on the assessed body (need <= 40%)`);

const df = C.deckFacts(ROUNDS);
note(df.heightAnticorrelatedInAssessedBody >= 0.6,
  `assessed body only ${Math.round(df.heightAnticorrelatedInAssessedBody * 100)}% appearance-anti-correlated (need >= 60%)`);
note(assessedThree.length >= 4, `assessed three-way body too small (${assessedThree.length}, need >= 4)`);

/* ---------- 4. MEMORIZE-EXCEPTIONS (STATEFUL) → fails ---------- */
/* trust appearance (height) UNLESS this exact visible surface was seen before,
   then return the cached truth. Every re-test is a NOVEL surface of the same
   structure → the cache never hits → no edge over the height solver. */
function memorizeExceptionsRun() {
  const cache = {};
  let ok = 0, n = 0;
  ROUNDS.forEach((r) => {
    const a = C.audit(r);
    const guess = (a.surfaceKey in cache) ? cache[a.surfaceKey] : C.heightSays(r);
    if (r.assessment === true && C.isThreeWay(r)) { n += 1; if (C.isCorrect(r, guess)) ok += 1; }
    cache[a.surfaceKey] = a.trueComparison;   /* the post-pour "reveal" */
  });
  return { ok: ok, n: n, rate: n ? ok / n : 0 };
}
const mem = memorizeExceptionsRun();
note(mem.rate <= 0.4, `MEMORIZE-EXCEPTIONS scored ${pct(mem.ok, mem.n)}% on the assessed body (need <= 40%)`);
note(df.reofferUsesNovelSurfaceSameStructure,
  'MEMORIZE-EXCEPTIONS: a transfer re-offer is NOT a novel surface of the same structure (pair-recall would work)');
note(df.noPairRepeatsIdentically,
  'MEMORIZE-EXCEPTIONS: a visible surface repeats identically (memorizable pair leaked)');
note(df.hasTransfer, 'no transfer (novel-instance re-offer) round in the deck');

/* ---------- 5. CONSTANT → no truth class is a majority ---------- */
['A_MORE', 'B_MORE', 'SAME'].forEach((k) => {
  const r = score(() => k, threeWay);
  note(r.rate < 0.5, `CONSTANT "${k}" scored ${pct(r.ok, r.n)}% of three-way rounds (need < 50% — truth not dominated by one class)`);
});

/* ---------- 6. STRUCTURAL ---------- */
note(ROUNDS.every((r) => C.facts(r).capacityIsInteger), 'CAPACITY_IS_INTEGER violated (a trueCapacity is non-integer)');
note(ROUNDS.every((r) => C.facts(r).gradeIsPredictionNotPour), 'gradeIsPredictionNotPour not asserted on every round');

/* grade-is-prediction-not-pour, demonstrated: isCorrect tracks the committed
   value vs trueCapacity, never the drawn geometry. */
note(ROUNDS.every((r) => {
  const truth = C.audit(r).trueComparison;
  const wrong = C.options(r).find((o) => o !== truth);
  return C.isCorrect(r, truth) === true && C.isCorrect(r, wrong) === false && C.isCorrect(r, null) === false;
}), 'isCorrect is not a clean committed-vs-truth grade (geometry leaked into grading, or null graded correct)');

const sameRounds = ROUNDS.filter((r) => r.cog === 'same');
note(sameRounds.length >= 1 && sameRounds.every((r) => r.assessment === false),
  'sameCapacityIsCelebrationNotAssessed: a same round is missing or marked assessment:true');

const fitRounds = ROUNDS.filter((r) => r.cog === 'fit');
note(fitRounds.length >= 1 && fitRounds.every((r) => C.facts(r).willItFitIsBinaryDirectional && !C.isThreeWay(r)),
  'willItFitIsBinaryDirectional: a fit round is missing or not a 2-option FITS/OVERFLOWS round');

/* RESULT_NOT_PRESHOWN on BOTH render modes — the core snapshot is render-mode-
   agnostic, so a clean snapshot proves it for instant + animated paths alike. */
note(ROUNDS.every((r) => {
  const s = C.snapshot(r);
  return s.A && s.B && s.A.trueCapacity === undefined && s.B.trueCapacity === undefined && s.level === undefined;
}), 'RESULT_NOT_PRESHOWN: snapshot exposed a capacity/level on some round');

note(df.distinctCogs.length >= 7, `only ${df.distinctCogs.length} distinct experiences (need >= 7): ${df.distinctCogs.join(', ')}`);
note(df.distinctCogs.indexOf('order') === -1, 'an order-three (Grade-1 1.MD.A.1) cog leaked into the deck (also_teaches must be NONE)');
note(ROUNDS.filter((r) => r.cog === 'clearcut').every((r) => r.assessment === false),
  'on-ramp (clearcut) rounds must be assessment:false (excluded from the assessed denominator)');

/* ---------- report ---------- */
console.log('Bramble core gate —');
console.log(`  oracle                 : ${pct(oRes.ok, oRes.n)}%  (${oRes.ok}/${oRes.n})`);
console.log(`  observe-the-pour       : blocked (playPour throws pre-commit; snapshot clean)`);
console.log(`  judge-by-height/w/area : ${pct(hgt.ok, hgt.n)}% / ${pct(wid.ok, wid.n)}% / ${pct(are.ok, are.n)}%  on the assessed body (${assessedThree.length})`);
console.log(`  memorize-exceptions    : ${pct(mem.ok, mem.n)}%  on the assessed body`);
console.log(`  assessed anti-correlated: ${Math.round(df.heightAnticorrelatedInAssessedBody * 100)}%   distinct experiences: ${df.distinctCogs.length}`);
console.log(`  truth distribution     : ${JSON.stringify(df.truthDistribution)}   novel-surface re-offer: ${df.reofferUsesNovelSurfaceSameStructure}   no-dup: ${df.noPairRepeatsIdentically}`);
console.log('');
if (fails.length) {
  console.error(`BRAMBLE CORE GATE FAILED — ${fails.length}:`);
  fails.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('BRAMBLE CORE GATE PASSED — the reason-about-capacity oracle wins 100%; observe-the-pour is blocked (predict-first); judge-by-height/width/area + the STATEFUL memorize-exceptions solver + constant all lose; >=60% of the assessed body is appearance-anti-correlated; the re-offer is a novel surface of the same structure with no identical repeat; capacity is integer + decoupled; >=7 distinct experiences; same = celebration, will-it-fit = binary, grade = the prediction.');
process.exit(0);
