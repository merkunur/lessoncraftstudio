#!/usr/bin/env node
/* =====================================================================
   verify-tense-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/tense-core.js (window shim) and proves, for the
   shipped manifest (L.1.1.e verb tense), the clarity-first redesign of #70:

     1. ORACLE 100% — oracle(round) === round.time, the `tense===time` form is
        accepted, the other two are rejected.
     2. EXACTLY-ONE-CORRECT per round.
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer
        field (deep scan); the answer follows the time, re-proven by MUTATION:
        set round.time to each other tense → oracle + form follow.
     4. each round: 3 DISTINCT forms; future is "will <verb>"; present is the
        BARE form (no 3rd-singular -s trap); valid time.
     5. deck: all THREE times present + none > ~0.5 of the key; ≥1 irregular
        verb; ≥7 distinct rounds + ≥7 distinct verbs.

   The spec's OPTION_SURFACE_NON_DIAGNOSTIC / cue-absent / future-will-must-fail
   / odd-form-out / morph-reveal / 4-mode rigor is deliberately NOT implemented
   (clarity-first — the time cue + visible "will" are good Grade-1 pedagogy).
   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'tense-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TenseCore;
if (!Core) { console.error('FAIL: tense-core.js did not define window.TenseCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'tense-activities.json'), 'utf8'));
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
    const label = `${r.id}[${r.time}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.timeValid, `${label}: invalid time`);
    check(f.formsDistinct, `${label}: the 3 forms are not all distinct`);
    check(f.futureWellFormed, `${label}: future form is not "will <verb>" ("${r.verb.forms.future}")`);
    check(f.presentIsBare, `${label}: present form looks like a 3rd-singular -s form ("${r.verb.forms.present}")`);
    check(f.exactlyOneCorrect, `${label}: not exactly one correct tense`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(oi === r.time && Core.isAnswer(r, oi), `${label}: oracle is not the round's time`);

    // the non-answer forms are rejected
    Core.TENSES.forEach((t) => { if (t !== r.time) check(!Core.isAnswer(r, t), `${label}: non-answer tense "${t}" accepted`); });

    // MUTATION: set time to each other tense → oracle + form follow (proves derived, not stored)
    Core.TENSES.forEach((t) => {
      if (t === r.time) return;
      const m = clone(r); m.time = t;
      check(Core.oracle(m) === t, `${label}: oracle did not follow mutated time → ${t}`);
      check(Core.formText(m, Core.oracle(m)) === r.verb.forms[t], `${label}: form did not follow mutated time → ${t}`);
    });
  });

  const df = Core.deckFacts(rounds);
  Core.TENSES.forEach((t) => check(df.distinctTimes.indexOf(t) >= 0, `deck missing time "${t}"`));
  const maxShare = Math.max(...Object.values(df.timeCounts)) / rounds.length;
  check(maxShare <= 0.5, `a time is ${(maxShare * 100).toFixed(0)}% of the key (>50% — unbalanced)`);
  check(df.irregularCount >= 1, `no irregular verbs (want ≥1 for real past forms)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
  check(df.distinctVerbs >= VARIETY_MIN, `only ${df.distinctVerbs} distinct verbs (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} tense violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), times [${df0.distinctTimes.join('/')}], ${df0.distinctVerbs} distinct verbs, ${df0.irregularCount} irregular: oracle 100% (the time-matching form accepted, others rejected); exactly-one-correct; distinct forms; future="will …"; present bare (no 3rd-sing -s); derived-not-stored (oracle+form follow mutated time); ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #70]`);
process.exit(0);
