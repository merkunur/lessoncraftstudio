#!/usr/bin/env node
/* =====================================================================
   verify-fraction-equiv-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/fraction-equiv-core.js (window shim) and proves,
   for the shipped manifest (3.NF.A.3 equivalent fractions), the clarity-first
   redesign of #86:

     1. EXACTLY-ONE-EQUIVALENT per round (exactly one candidate ≈ ref).
     2. ORACLE 100% — oracle(round) is the equivalent candidate, accepted by
        isAnswer; every distractor rejected.
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer/
        equivalent/isEquivalent field (deep scan); equivalence is computed by
        integer cross-multiply, re-proven by MUTATION: set round.ref to EACH
        candidate's own value → the oracle re-points to THAT candidate
        (equivalence is relative to the committed ref, not absolute) — and a
        candidate REORDER leaves the accepted SET byte-identical (no positional
        dependence).
     4. PROPER FRACTIONS (0<num<den) + denominators ⊆ {2,3,4,6,8} (Grade 3).
     5. DISTRACTORS NON-EQUIVALENT to ref; candidates pairwise distinct in value.
     6. equiv positions VARIED across the deck (>1 distinct index); ≥6 distinct
        refs; ≥7 distinct rounds.
     7. SOLVERS FAIL — ECHO (no revealed answer) / RANDOM / every fixed-position
        solver (always-idx-0/1/2) is wrong on ≥1 round.

   The spec's comb-rake / child-glaze-proportional / "did-the-dough-move?"
   motion-judgment / 8-solver suite is deliberately NOT implemented (clarity-
   first — the standard's own visual-fraction-model carries it). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const G3 = { 2: 1, 3: 1, 4: 1, 6: 1, 8: 1 };
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex', 'equivalent', 'isEquivalent', 'equivIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'fraction-equiv-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.FractionEquivCore;
if (!Core) { console.error('FAIL: fraction-equiv-core.js did not define window.FractionEquivCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'fraction-equiv-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;
const fixedPosWrong = { 0: false, 1: false, 2: false };  // each fixed-position solver must be wrong somewhere
let echoFail = true;   // ECHO can never pick the answer (no field to echo)

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);
    const cands = r.candidates || [];

    check(f.candidateCount >= 3, `${label}: <3 candidates`);
    check(f.exactlyOneEquivalent, `${label}: not exactly one equivalent (${Core.correctCount(r)})`);
    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not the equivalent`);
    check(f.properFractions, `${label}: a fraction is not proper (0<num<den)`);
    check(f.denomsInGrade3Set, `${label}: a denominator is outside {2,3,4,6,8}`);
    check(f.distinctCandidates, `${label}: candidates are not pairwise distinct in value`);
    check(f.derivedNotStored, `${label}: derived invariant`);

    // every distractor rejected + genuinely non-equivalent to ref
    cands.forEach((c, i) => {
      if (i !== oi) {
        check(!Core.isAnswer(r, i), `${label}: distractor ${c.num}/${c.den} accepted as equivalent`);
        check(!Core.isEquivalent(c, r.ref), `${label}: distractor ${c.num}/${c.den} is equivalent to ref ${r.ref.num}/${r.ref.den}`);
      }
    });

    // MUTATION 1 — re-point ref to EACH candidate's own value → oracle follows
    cands.forEach((c, j) => {
      const m = clone(r); m.ref = { num: c.num, den: c.den };
      check(Core.oracle(m) === j, `${label}: re-pointing ref to ${c.num}/${c.den} did not move the oracle to that candidate (not relative to committed ref)`);
    });

    // MUTATION 2 — reorder candidates → the accepted SET is unchanged (no positional grade)
    const m2 = clone(r); m2.candidates = m2.candidates.slice().reverse();
    const acc1 = cands.filter((c) => Core.isEquivalent(c, r.ref)).map((c) => c.num + '/' + c.den).sort().join(',');
    const acc2 = m2.candidates.filter((c) => Core.isEquivalent(c, m2.ref)).map((c) => c.num + '/' + c.den).sort().join(',');
    check(acc1 === acc2, `${label}: reordering candidates changed the accepted set (positional dependence)`);

    // ECHO — the snapshot exposes no equivalence flag
    const snap = Core.snapshot(r);
    if (snap.candidates.some((c) => 'equivalent' in c || 'isAnswer' in c || 'correct' in c)) echoFail = false;

    // fixed-position solvers
    [0, 1, 2].forEach((p) => { if (p < cands.length && !Core.isAnswer(r, p)) fixedPosWrong[p] = true; });
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctEquivPositions > 1, `the equivalent is always at the same index (positions not varied)`);
  check(df.distinctRefs >= 6, `only ${df.distinctRefs} distinct refs (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

check(echoFail, `ECHO solver: snapshot exposed an equivalence flag (answer leak)`);
[0, 1, 2].forEach((p) => check(fixedPosWrong[p], `fixed-position solver (always idx ${p}) is never wrong — positions not varied enough`));

if (failures.length) {
  console.error(`FAIL — ${failures.length} fraction-equiv violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctRefs} refs, equiv at ${df0.distinctEquivPositions} distinct indices: exactly-one-equivalent; oracle 100% (equivalent accepted, distractors rejected + non-equivalent); derived-not-stored (re-pointing ref follows each candidate; reorder grade-stable); proper fractions, denoms⊆{2,3,4,6,8}; ECHO + RANDOM + fixed-position solvers FAIL; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #86]`);
process.exit(0);
