#!/usr/bin/env node
/* =====================================================================
   verify-graph-it-core.js — the MEASURED build-gate for "Pip's Stacking
   Fence" (2.MD.D.10 · data/bar-graphs). Loads the REAL graph-it-core.js via
   `new Function` + the graph-it-activities.json deck, then drives the core
   with a build-and-read oracle + the critic-armed adversary set. HALTS the
   build on any failure. NOTHING here re-implements the core.

   THE HEADLINE PROOF (the critic's deepest, program-wide fix): a build-and-
   read ORACLE wins 100% while —
     • READ-TALLEST     (the tallest bar count; close bars + a third tallest) → 0%
     • AUTO-TALLY       (assumes the graph pre-built; build starts empty)     → fails
     • COUNT-ONE-BAR    (a single operand; relational needs ≥2)               → 0%
     • BRUTE-TAPPER     (the ENUMERATOR — blind first-commit + enumerate-until-
                         accepted; answer spread + close bars + deliberate-commit
                         + guided-reread)                                      → ≤chance
   — all lose. The BRUTE-TAPPER models the enumerator the cohort's compute-only
   gates were blind to (retrofit to Games 40/43).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'graph-it-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'graph-it-activities.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.GraphItCore) throw new Error('GraphItCore did not attach to the global');
  return sandbox.GraphItCore;
}
function loadDeck() {
  const rows = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = rows.find((r) => r.id === 'graph-it.bar-graph.2-md-d-10');
  if (!row || !row.params || !Array.isArray(row.params.rounds)) throw new Error('rounds not found');
  return row.params.rounds;
}

const C = loadCore();
const ROUNDS = loadDeck();
const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const buildRounds = ROUNDS.filter((r) => C.isBuildKind(r));
const interpret = ROUNDS.filter((r) => C.isInterpret(r));
const numeric = interpret.filter((r) => (r.question || {}).type !== 'verify');

/* score an interpret solver(round)->committed over a subset */
function scoreInterpret(solver, subset) {
  let ok = 0;
  subset.forEach((r) => { if (C.isInterpretCorrect(r, solver(r))) ok += 1; });
  return { ok: ok, n: subset.length, rate: subset.length ? ok / subset.length : 0 };
}

/* ---------- 1. BUILD-AND-READ ORACLE → 100% over the WHOLE deck ---------- */
let oracleOk = 0;
ROUNDS.forEach((r) => {
  if (C.isBuildKind(r)) {
    /* build to the exact per-category count */
    const built = {};
    C.catKeys(r).forEach((k) => { for (let i = 0; i < (r.data[k] || 0); i++) C.placeOne(built, k); });
    if (C.builtMatchesData(r, built)) oracleOk += 1;
  } else {
    if (C.isInterpretCorrect(r, C.audit(r).expectedAnswer)) oracleOk += 1;
  }
});
note(oracleOk === ROUNDS.length, `oracle solved ${oracleOk}/${ROUNDS.length} (need all) — deck/core inconsistent`);

/* ---------- 2. READ-TALLEST → fails on numeric interpret ---------- */
const rt = scoreInterpret((r) => C.audit(r).tallestCount, numeric);
note(rt.rate === 0, `READ-TALLEST scored ${pct(rt.ok, rt.n)}% (need 0% — close bars + a third tallest)`);
note(numeric.every((r) => C.facts(r).interpretIsRelationalNotTallest), 'interpretIsRelationalNotTallest violated on a numeric round');
const compareRounds = numeric.filter((r) => ['more', 'fewer'].indexOf((r.question || {}).type) >= 0);
note(compareRounds.every((r) => C.facts(r).barsCloseOnCompareRounds === true), 'barsCloseOnCompareRounds not true on every compare round');

/* ---------- 3. AUTO-TALLY-READER → cannot complete a build ---------- */
let autoTallyCompleted = 0;
buildRounds.forEach((r) => { if (C.builtMatchesData(r, {})) autoTallyCompleted += 1; });
note(autoTallyCompleted === 0, `AUTO-TALLY completed ${autoTallyCompleted} build round(s) without placing (need 0 — graph starts empty)`);
note(buildRounds.every((r) => C.facts(r).childBuildsGraph), 'childBuildsGraph not true on a build round');

/* ---------- 4. COUNT-ONE-BAR → fails (relational needs ≥2 bars) ---------- */
const cobA = scoreInterpret((r) => C.audit(r).operandA, numeric);
const cobB = scoreInterpret((r) => C.audit(r).operandB, numeric);
note(cobA.rate === 0 && cobB.rate === 0, `COUNT-ONE-BAR scored ${pct(cobA.ok, cobA.n)}% / ${pct(cobB.ok, cobB.n)}% (need 0% — one bar never equals the relational answer)`);

/* ---------- 5. BRUTE-TAPPER (the enumerator) → ≤ chance ---------- */
/* (a) blind first-commit strategies — none beats the answer spread */
const blind = {
  'const-0': (r) => 0,
  'const-max-rail': (r) => C.audit(r).railMax,
  'tallest-count': (r) => C.audit(r).tallestCount,
  'operand-a': (r) => C.audit(r).operandA,
  'operand-b': (r) => C.audit(r).operandB
};
let worstBlind = 0;
Object.keys(blind).forEach((name) => {
  const s = scoreInterpret(blind[name], numeric);
  if (s.rate > worstBlind) worstBlind = s.rate;
  note(s.rate <= 0.34, `BRUTE-TAPPER blind "${name}" scored ${pct(s.ok, s.n)}% (need ≤34% — no blind first-commit beats the spread)`);
});
/* (b) enumerate-until-accepted needs >1 try on average → cannot first-try without reading */
let totalTries = 0;
numeric.forEach((r) => { totalTries += (Number(C.audit(r).expectedAnswer) + 1); });  /* tries to scan 0..answer */
const avgTries = numeric.length ? totalTries / numeric.length : 0;
note(avgTries > 1, `enumerate-until-accepted averages ${avgTries.toFixed(1)} tries (need >1 — can't first-try blind)`);
/* (c) the structural flags that make every wrong commit consequential */
note(interpret.every((r) => {
  const f = C.facts(r);
  return f.interpretRequiresDeliberateCommit && f.wrongCommitRoutesGuidedReread &&
    f.interpretResistsBlindEnumeration && f.answerFromGraphNotStored;
}), 'INTERPRET_RESISTS_BLIND_ENUMERATION: a deliberate-commit / guided-reread / answer-not-stored flag is false');

/* answer-not-stored, demonstrated: mutating round.data changes expectedAnswer */
note(numeric.every((r) => {
  const before = C.expectedAnswer(r);
  const probe = JSON.parse(JSON.stringify(r));
  probe.data[probe.question.a] = (probe.data[probe.question.a] || 0) + 1;
  return C.expectedAnswer(probe) !== before;   /* recomputed from live counts, not a constant */
}), 'ANSWER_FROM_GRAPH_NOT_STORED: expectedAnswer did not track a change to the graph counts');

/* ---------- 6. STRUCTURAL ---------- */
const df = C.deckFacts(ROUNDS);
note(df.distinctCogs.length >= 7, `only ${df.distinctCogs.length} distinct cognitions (need ≥7): ${df.distinctCogs.join(', ')}`);
note(df.answerMaxShare <= 0.34, `answer distribution too concentrated (max share ${Math.round(df.answerMaxShare * 100)}% — need ≤34%): ${JSON.stringify(df.answerDistribution)}`);
note(df.whichMostShare <= 1 / 3, `which-most over the ⅓ cap (${Math.round(df.whichMostShare * 100)}%)`);
note(df.maxCategories <= 4, `a round has >4 categories (${df.maxCategories})`);
note(df.minBar >= 3 && df.maxBar <= 10, `bars out of the 3-10 single-unit band (min ${df.minBar}, max ${df.maxBar})`);
note(df.maxArithmetic <= 20, `total arithmetic over 20 (${df.maxArithmetic}) — breaks the 2.OA easy-arithmetic fence`);
note(ROUNDS.every((r) => C.facts(r).integerCounts && C.facts(r).singleUnitScale), 'INTEGER_COUNTS / SINGLE_UNIT_SCALE violated');
/* represent-requires-decode: the trivial 1:1 picture build is capped ≤ ⅓ */
const buildPic = ROUNDS.filter((r) => r.cog === 'build-picture').length;
note(buildPic / ROUNDS.length <= 1 / 3, `trivial 1:1 picture-build over the ⅓ cap (${buildPic}/${ROUNDS.length})`);
note(ROUNDS.filter((r) => r.cog === 'build-tally' || r.cog === 'fix').every((r) => C.facts(r).representRequiresDecode),
  'REPRESENT_REQUIRES_DECODE: a build-tally / fix round does not require decoding a count');
/* snapshot must not leak the interpret answer */
note(interpret.every((r) => !/expectedAnswer|"answer"/.test(JSON.stringify(C.snapshot(r)))),
  'snapshot leaked the interpret answer');

/* ---------- report ---------- */
console.log('Graph-It core gate —');
console.log(`  build-and-read oracle  : ${oracleOk}/${ROUNDS.length}`);
console.log(`  read-tallest           : ${pct(rt.ok, rt.n)}%  on ${numeric.length} numeric interpret`);
console.log(`  auto-tally completed   : ${autoTallyCompleted} build round(s)`);
console.log(`  count-one-bar (a/b)    : ${pct(cobA.ok, cobA.n)}% / ${pct(cobB.ok, cobB.n)}%`);
console.log(`  brute-tapper worst blind: ${Math.round(worstBlind * 100)}%   avg enumerate tries: ${avgTries.toFixed(1)}`);
console.log(`  distinct cognitions    : ${df.distinctCogs.length} (${df.distinctCogs.join(', ')})`);
console.log(`  answer distribution    : ${JSON.stringify(df.answerDistribution)}  (max share ${Math.round(df.answerMaxShare * 100)}%)`);
console.log(`  bars ${df.minBar}-${df.maxBar}, ≤${df.maxCategories} categories, max total ${df.maxArithmetic}`);
console.log('');
if (fails.length) {
  console.error(`GRAPH-IT CORE GATE FAILED — ${fails.length}:`);
  fails.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('GRAPH-IT CORE GATE PASSED — the build-and-read oracle wins 100%; read-tallest/auto-tally/count-one-bar all lose; the BRUTE-TAPPER (blind first-commit ≤34%, enumerate-until-accepted needs >1 try, every wrong commit gated by the deliberate-commit + guided-reread) cannot converge; the answer is recomputed from the live graph (not stored); ≥7 distinct cognitions; single-unit integer scale, ≤4 categories, bars 3-10, easy arithmetic; the trivial picture-build is capped.');
process.exit(0);
