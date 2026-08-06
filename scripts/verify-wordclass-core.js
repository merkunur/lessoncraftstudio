#!/usr/bin/env node
/* =====================================================================
   verify-wordclass-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/wordclass-core.js (window shim) and proves, for the
   shipped manifest (L.2.1.e adjective vs adverb), the clarity-first redesign of
   #73:

     1. ORACLE 100% — oracle(round) = adjective for a noun target / adverb for a
        verb target; that class is accepted, the other rejected.
     2. EXACTLY-ONE-CORRECT per round (2 classes, 1 matches).
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer
        field (deep scan); the answer follows the modified target's kind, re-
        proven by MUTATION: flip round.targetKind → oracle class flips.
     4. each round: 2 DISTINCT forms + a non-empty `q` + a "___" blank in the
        sentence; valid targetKind.
     5. deck: both kinds present + balanced (none > ~0.6); ≥1 DUAL-CLASS base
        (same base used as adjective in one round + adverb in another); ≥7
        distinct rounds.

   The spec's ADJACENCY-decorrelation / SEMANTIC_FIT solver / non-adjacency
   mandate / ≥3-multi-candidate / dual-class-every-round / mode-3 rigor is
   deliberately NOT implemented (clarity-first — the form-pick + the function-
   naming prompt carry it). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'wordclass-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.WordclassCore;
if (!Core) { console.error('FAIL: wordclass-core.js did not define window.WordclassCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'wordclass-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.targetKind}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.targetKindValid, `${label}: invalid targetKind`);
    check(f.formsDistinct, `${label}: the 2 forms are not distinct/present`);
    check(f.qPresent, `${label}: empty prompt q`);
    check(f.blankPresent, `${label}: sentence has no "___" blank`);
    check(f.exactlyOneCorrect, `${label}: not exactly one correct class`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check((oi === 'adjective' || oi === 'adverb') && Core.isAnswer(r, oi), `${label}: oracle not an accepted class`);
    check(oi === (r.targetKind === 'noun' ? 'adjective' : 'adverb'), `${label}: oracle does not match targetKind`);

    // the other class is rejected
    Core.CLASSES.forEach((c) => { if (c !== oi) check(!Core.isAnswer(r, c), `${label}: non-answer class "${c}" accepted`); });

    // MUTATION: flip targetKind → oracle class flips (proves derived, not stored)
    const m = clone(r); m.targetKind = (r.targetKind === 'noun' ? 'verb' : 'noun');
    check(Core.oracle(m) !== oi, `${label}: oracle did not follow mutated targetKind`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctKinds.indexOf('noun') >= 0 && df.distinctKinds.indexOf('verb') >= 0, `deck missing a kind; got [${df.distinctKinds.join('/')}]`);
  const maxShare = Math.max(...Object.values(df.perKindCounts)) / rounds.length;
  check(maxShare <= 0.6, `a kind is ${(maxShare * 100).toFixed(0)}% of the deck (>60% — unbalanced)`);
  check(df.dualClassCount >= 1, `no dual-class base (a base used as BOTH adjective and adverb across the deck)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} wordclass violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), kinds [${df0.distinctKinds.join('/')}] (${JSON.stringify(df0.perKindCounts)}), ${df0.dualClassCount} dual-class base(s): oracle 100% (adjective↔noun / adverb↔verb, other rejected); exactly-one-correct; derived-not-stored (oracle flips under mutated targetKind); 2 distinct forms + q + blank each; balanced; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #73]`);
process.exit(0);
