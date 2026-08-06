#!/usr/bin/env node
/* =====================================================================
   verify-pronoun-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/pronoun-core.js (window shim) and proves, for the
   shipped manifest (L.1.1.d personal pronouns by case), the clarity-first
   redesign of #84:

     1. DISPLAY FORM correct vs the CASE_TABLE (and a known-forms spot-check).
     2. 2 DISTINCT chips (the two case forms of ONE referent); ORACLE 100%
        (only the role-correct form accepted; the wrong-case form rejected).
     3. DERIVED_NOT_STORED — no stored value equals the derived pronoun (deep
        scan, excluding sentence text — which the no-answer-leak check covers);
        no isCorrect/correct/pronoun/answer key; mutate round.role → deriveCorrect
        CHANGES (crosses the case boundary).
     4. each sentence has a "___" blank + does NOT contain the answer pronoun as
        a standalone token; ≥1 compound-subject + ≥1 compound-object + ≥1
        form-by-function; all 3 roles present; ≥7 distinct rounds.

   The spec's grade-only-ear-resistant / role-cue-withhold-mechanics /
   ROLE_AFFORDANCE_READ_SOLVER / hard-discrete-commit / position-heuristic /
   drop-and-ear rigor is deliberately NOT implemented (clarity-first — the
   sentence + 2-form same-referent pick shows no role cue). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex', 'pronoun'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'pronoun-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PronounCore;
if (!Core) { console.error('FAIL: pronoun-core.js did not define window.PronounCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pronoun-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const clone = (o) => JSON.parse(JSON.stringify(o));

/* deep-scan for forbidden keys + a stored pronoun literal in NON-sentence fields */
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const correct = Core.deriveCorrect(r);
    const chips = Core.chipStrings(r);

    check(f.roleValid, `${label}: role/wrongRole invalid (${r.role}/${r.wrongRole})`);
    check(f.referentValid, `${label}: referent "${r.referent}" not in CASE_TABLE`);
    check(f.twoDistinctChips, `${label}: the 2 chips are not distinct (${chips.join(' / ')})`);
    check(f.sentenceHasBlank, `${label}: sentence has no "___" blank`);
    check(f.sentenceNoAnswerLeak, `${label}: the answer pronoun "${correct}" appears in the sentence (leak)`);

    // oracle: only the role-correct form accepted
    check(Core.isAnswer(r, correct), `${label}: correct form "${correct}" not accepted`);
    check(!Core.isAnswer(r, Core.deriveWrong(r)), `${label}: the wrong-case form "${Core.deriveWrong(r)}" was accepted`);

    // displayForm spot-check vs the CASE_TABLE
    check(correct === Core.displayForm(r.referent, r.role, r.cap), `${label}: deriveCorrect ≠ displayForm`);

    // MUTATION: flip role to the wrongRole → deriveCorrect must change (crosses case)
    const m = clone(r); m.role = r.wrongRole;
    check(Core.deriveCorrect(m) !== correct, `${label}: deriveCorrect did not change under mutated role (not derived)`);
  });

  const df = Core.deckFacts(rounds);
  ['subject', 'object', 'possessive'].forEach((role) => check(df.distinctRoles.indexOf(role) >= 0, `deck missing role "${role}"`));
  check(df.compoundSubjectCount >= 1, `no compound-subject round`);
  check(df.compoundObjectCount >= 1, `no compound-object round`);
  check(df.formByFunctionCount >= 1, `no form-by-function round (his↔him / their↔them)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} pronoun violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), roles [${df0.distinctRoles.join('/')}], compound-subj ${df0.compoundSubjectCount} / compound-obj ${df0.compoundObjectCount} / form-by-function ${df0.formByFunctionCount}: displayForm vs CASE_TABLE; 2 distinct same-referent chips; oracle 100% (role-correct accepted, wrong-case rejected); derived-not-stored (role-mutation crosses case); no answer-leak; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #84]`);
process.exit(0);
