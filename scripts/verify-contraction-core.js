#!/usr/bin/env node
/* =====================================================================
   verify-contraction-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/contraction-core.js (window shim) and proves, for
   the shipped manifest (L.2.2.c contractions), the clarity-first redesign of
   #77:

     1. DERIVE — deriveCorrect(round) has EXACTLY ONE apostrophe, at
        apostropheIndex; the 3 chip strings (correct / misplaced / none) are all
        DISTINCT.
     2. ORACLE 100% — only the correct string is accepted; misplaced + none
        rejected.
     3. DERIVED_NOT_STORED — the contraction literal is NEVER stored: NO field
        value contains an apostrophe (deep scan); no isCorrect/correct/answer
        key; mutate apostropheIndex → deriveCorrect changes.
     4. combined has no apostrophe; apostropheIndex ≠ wrongIndex, both in
        [0..combined.length]; ≥2 distinct families; ≥2 irregulars; ≥7 distinct
        rounds.

   The spec's PROCESS-axis rigor (NO_PRE_COMMIT_ORACLE / commit-then-grade-with-
   cost / TRIAL_AND_ERROR_SOLVER / FAMILY_RULE_SOLVER / cross-family-≥4 /
   discriminating-≥50%) is deliberately NOT implemented (clarity-first — the
   3-way recognition pick has NO brute-force surface). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex', 'contraction'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'contraction-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ContractionCore;
if (!Core) { console.error('FAIL: contraction-core.js did not define window.ContractionCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'contraction-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scan(obj, label) {
  if (obj == null) return;
  if (typeof obj === 'string') { if (obj.indexOf("'") >= 0) failures.push(`${label}: a stored string value contains an apostrophe ("${obj}") — the answer literal must never be stored`); return; }
  if (typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scan(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scan(r, label);
    const f = Core.facts(r);
    const chips = Core.chipStrings(r);
    const correct = Core.deriveCorrect(r);

    check(f.indicesValid, `${label}: indices invalid (apostropheIndex=${r.apostropheIndex}, wrongIndex=${r.wrongIndex}, len=${(r.combined || '').length})`);
    check(f.combinedHasNoApostrophe, `${label}: combined contains an apostrophe`);
    check(f.correctHasOneApostropheAtIndex, `${label}: deriveCorrect not exactly one apostrophe at apostropheIndex ("${correct}")`);
    check(f.threeDistinctChips, `${label}: the 3 chips are not all distinct (${chips.join(' / ')})`);

    // oracle: only the correct string accepted
    check(Core.isAnswer(r, correct), `${label}: correct string not accepted`);
    chips.forEach((s) => { if (s !== correct) check(!Core.isAnswer(r, s), `${label}: a non-correct chip "${s}" was accepted`); });

    // MUTATION: change apostropheIndex → deriveCorrect changes
    const m = clone(r); m.apostropheIndex = (r.apostropheIndex === 1 ? 2 : 1);
    if (m.apostropheIndex <= (r.combined || '').length) check(Core.deriveCorrect(m) !== correct, `${label}: deriveCorrect did not change under mutated apostropheIndex (not derived)`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctFamilies.length >= 2, `only ${df.distinctFamilies.length} distinct families (<2)`);
  check(df.irregularCount >= 2, `only ${df.irregularCount} irregulars (<2)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} contraction violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), families [${df0.distinctFamilies.join('/')}], ${df0.irregularCount} irregulars: derive = one apostrophe at index; 3 distinct chips; oracle 100% (correct accepted, misplaced + none rejected); derived-not-stored (no apostrophe literal stored; oracle changes under mutated index); ≥2 families; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #77]`);
process.exit(0);
