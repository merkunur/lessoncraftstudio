#!/usr/bin/env node
/* =====================================================================
   verify-clock-convert-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/clock-convert-core.js (window shim) and proves, for
   the shipped manifest (convert 12-hour ↔ 24-hour):

     1. to12 / to24str / to12str ground-truth (incl. noon + the +12 cases).
     2. EXACTLY-ONE-MATCH per round; oracle accepted, distractors rejected.
     3. valid h24 (0-23) + m (0-59); valid dir; options distinct.
     4. DERIVED_NOT_STORED — no stored correctIndex/answer key (deep scan);
        mutate h24 to a distractor's value → the oracle follows it.
     5. ≥6 distinct true-times, ≥7 rounds.

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'oracle'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-convert-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ClockConvertCore;
if (!Core) { console.error('FAIL: clock-convert-core.js did not define window.ClockConvertCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-convert-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

/* notation ground-truth (independent of the manifest) */
function expect12(h24, eh, eampm, label) { const t = Core.to12(h24); check(t.h12 === eh && t.ampm === eampm, `${label}: to12(${h24}) = ${t.h12}${t.ampm} != ${eh}${eampm}`); }
expect12(15, 3, 'PM', 'to12 15');
expect12(0, 12, 'AM', 'to12 0 (midnight)');
expect12(12, 12, 'PM', 'to12 12 (noon)');
expect12(20, 8, 'PM', 'to12 20');
expect12(23, 11, 'PM', 'to12 23');
expect12(9, 9, 'AM', 'to12 9');
check(Core.to24str(15, 0) === '15:00', `to24str(15,0) = ${Core.to24str(15, 0)}`);
check(Core.to24str(3, 0) === '03:00', `to24str(3,0) = ${Core.to24str(3, 0)}`);
check(Core.to24str(9, 30) === '09:30', `to24str(9,30) = ${Core.to24str(9, 30)}`);
check(Core.to12str(15, 30) === '3:30 PM', `to12str(15,30) = ${Core.to12str(15, 30)}`);
check(Core.to12str(8, 0) === '8:00 AM', `to12str(8,0) = ${Core.to12str(8, 0)} (expected 8:00 AM)`);

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN}`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.optionCount >= 3, `${label}: <3 options`);
    check(f.exactlyOneMatch, `${label}: not exactly one match (${Core.correctCount(r)})`);
    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not a match`);
    check(f.validH24, `${label}: an invalid h24 (0-23) / m (0-59)`);
    check(f.validDir, `${label}: invalid dir "${r.dir}"`);
    check(f.distinctOptions, `${label}: options not distinct`);
    check(r.options.indexOf(r.h24) >= 0, `${label}: h24 ${r.h24} not among options`);

    (r.options || []).forEach((o, i) => { if (i !== oi) check(!Core.isAnswer(r, i), `${label}: distractor ${Core.optionStr(r, o)} accepted`); });

    // DERIVED: point h24 at a distractor's value → oracle follows
    const di = (r.options || []).findIndex((_, i) => i !== oi);
    const m = clone(r); m.h24 = r.options[di];
    check(Core.oracle(m) === di, `${label}: oracle did not follow a mutated h24 (not derived)`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctTrueTimes >= 6, `${row.id}: only ${df.distinctTrueTimes} distinct true-times (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `${row.id}: only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} clock-convert violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctTrueTimes} true-times: 12↔24 notation correct (15→3 PM, 0→12 AM, 12→12 PM; 3 PM→15:00); exactly-one-match; oracle = the option === h24 (not stored); derived-not-stored (oracle follows a mutated h24); ≥${VARIETY_MIN} distinct rounds. [time-expansion 12↔24 conversion]`);
process.exit(0);
