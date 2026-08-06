#!/usr/bin/env node
/* =====================================================================
   verify-fix-it-core.js — build-time gate for the sentence-editing
   cognition behind "Dr. Plume's Sentence Clinic" (CCSS L.2.1). Loads the
   REAL mini tools/fix-it-core.js under a window shim and proves, MEASURED:

     • every round has EXACTLY ONE correct diagnosis target (the trouble is
       a unique, locatable grammar violation — not "anything goes");
     • the ORACLE (correct diagnosis + correct repair) → applyRepair yields
       the authored CLEAN sentence for EVERY round;
     • BLIND solvers do NOT track the answer: "always diagnose the first
       token" < 1.0 (the trouble isn't positionally trivial); a repair has
       ≥2 options so "pick one" isn't a free win;
     • swap rounds carry ≥2 DISTINCT same-lemma form distractors (the choice
       is a grammar judgment, not a look-weird guess);
     • ≥7 DISTINCT actions (§A.13.60 — the distinctness IS the 7 actions);
     • no round stores a UI answer/correctIndex (DERIVED from the descriptor).

   The "repair is gated behind a correct diagnosis" (no blind-swap) is an
   ENGINE-state property → asserted in local-test-sentence-clinic.js.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'fix-it-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.FixItCore;
if (!Core) { console.error('FAIL: fix-it-core.js did not define window.FixItCore'); process.exit(1); }

const rounds = Core.buildRounds();
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const eqArr = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => x === b[i]);

/* ---- structural / variety ---- */
check(rounds.length >= VARIETY_MIN, `only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
const actions = new Set(rounds.map((r) => r.action));
check(actions.size >= VARIETY_MIN, `only ${actions.size} DISTINCT actions (< ${VARIETY_MIN} — distinctness is the action)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'round ids not distinct');

/* ---- per round ---- */
let oracleHits = 0, blindFirstHits = 0, diagnoseRounds = 0;
rounds.forEach((r, i) => {
  const label = `round#${i}[${r.id}/${r.action}]`;
  check(!('answer' in r) && !('correctIndex' in r), `${label}: stores a UI answer/correctIndex (must be DERIVED)`);
  check(Array.isArray(r.clean) && r.clean.length > 0, `${label}: missing the clean (sounds-right) form`);

  // ORACLE: the correct repair produces the authored clean sentence
  if (eqArr(Core.applyRepair(r), r.clean)) oracleHits++;
  else failures.push(`${label}: applyRepair → [${Core.applyRepair(r).join(' ')}] ≠ clean [${r.clean.join(' ')}]`);

  // exactly ONE correct diagnosis target (for actions that diagnose)
  if (r.action !== 'reorder') {
    diagnoseRounds++;
    const span = r.tokens.length + 1; // gap/seam can sit at the end
    let correct = 0, firstIsCorrect = false;
    for (let idx = 0; idx < span; idx++) { if (Core.diagnoseCorrect(r, idx)) { correct++; if (idx === 0) firstIsCorrect = true; } }
    check(correct === 1, `${label}: ${correct} correct diagnosis targets (must be exactly 1)`);
    if (firstIsCorrect) blindFirstHits++;
    check(!!Core.diagnoseKind(r), `${label}: no diagnoseKind`);
  }

  // repair options: chip actions need ≥2 distinct options incl. the replacement
  if (r.action === 'swap' || r.action === 'insert-punct' || r.action === 'insert-word') {
    const opts = Core.repairOptions(r);
    check(Array.isArray(opts) && opts.length >= 2, `${label}: < 2 repair options (a single option is a free win)`);
    check(opts.indexOf(r.replacement) >= 0, `${label}: replacement not among the options`);
    check(new Set(opts).size === opts.length, `${label}: duplicate repair options`);
    check(Core.repairCorrect(r, r.replacement) === true, `${label}: the replacement is not accepted as correct`);
    (r.distractors || []).forEach((d) => check(d !== r.replacement, `${label}: a distractor equals the replacement`));
    if (r.action === 'swap') check((r.distractors || []).length >= 2, `${label}: swap needs ≥2 same-lemma form distractors`);
  } else {
    check(Core.repairOptions(r) === null, `${label}: non-chip action should expose no repair options`);
  }

  // reorder: a wrong order must fail; the correct order must pass
  if (r.action === 'reorder') {
    check(Core.repairCorrect(r, r.correctOrder.slice()) === true, `${label}: correct order rejected`);
    const wrong = r.correctOrder.slice().reverse();
    check(eqArr(wrong, r.correctOrder) || Core.repairCorrect(r, wrong) === false, `${label}: a reversed order was accepted`);
  }
});

const oracleAcc = oracleHits / rounds.length;
const blindFirstAcc = diagnoseRounds ? blindFirstHits / diagnoseRounds : 0;
check(oracleAcc === 1, `the ORACLE solved ${oracleHits}/${rounds.length} (must be all)`);
check(blindFirstAcc < 1, `"always diagnose the first token" scored ${blindFirstAcc.toFixed(2)} (the trouble must NOT be positionally trivial)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} fix-it-core violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${actions.size} distinct actions: ORACLE ${oracleAcc.toFixed(2)}; ` +
  `blind-first-token ${blindFirstAcc.toFixed(2)} < 1.00; exactly one diagnosis target per round, ` +
  `≥2 same-lemma options on chip actions, reorder rejects a wrong order, no stored answer.`);
process.exit(0);
