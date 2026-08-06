#!/usr/bin/env node
/* =====================================================================
   verify-clock-ampm-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/clock-ampm-core.js (window shim) and proves, for the
   shipped manifest (everyday activity → a.m. / p.m.):

     1. every round's ampm ∈ {AM,PM}; has an activity + a time.
     2. isAnswer(round, round.ampm) === true AND the other choice === false.
     3. oracle === round.ampm.
     4. DERIVED — no stored correctIndex/isCorrect (deep scan); mutate round.ampm
        AM↔PM → the oracle flips (the grade reads the content, not a flag).
     5. ≥7 distinct activities; ≥2 AM and ≥2 PM (a real mix).

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answerIndex', 'correct', 'isCorrect', 'oracle'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-ampm-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ClockAmpmCore;
if (!Core) { console.error('FAIL: clock-ampm-core.js did not define window.ClockAmpmCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-ampm-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));
const other = (a) => (a === 'AM' ? 'PM' : 'AM');

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN}`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);

    check(f.validAmpm, `${label}: ampm "${r.ampm}" not in {AM,PM}`);
    check(f.hasActivity, `${label}: missing activity text`);
    check(f.hasTime, `${label}: missing time`);
    check(Core.isAnswer(r, r.ampm) === true, `${label}: isAnswer(correct) not true`);
    check(Core.isAnswer(r, other(r.ampm)) === false, `${label}: isAnswer(wrong) not false`);
    check(Core.oracle(r) === r.ampm, `${label}: oracle != ampm`);

    // DERIVED: flip ampm → oracle flips
    const m = clone(r); m.ampm = other(r.ampm);
    check(Core.oracle(m) === other(r.ampm), `${label}: oracle did not follow a flipped ampm (not derived)`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctActivities >= VARIETY_MIN, `${row.id}: only ${df.distinctActivities} distinct activities (<${VARIETY_MIN})`);
  check(df.distinctExercises >= VARIETY_MIN, `${row.id}: only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
  check(df.countAM >= 2, `${row.id}: only ${df.countAM} AM rounds (<2)`);
  check(df.countPM >= 2, `${row.id}: only ${df.countPM} PM rounds (<2)`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} clock-ampm violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctActivities} activities (${df0.countAM} AM / ${df0.countPM} PM): every ampm ∈ {AM,PM}; isAnswer correct + other-choice false; oracle = the activity's period (content, not a flag); derived (oracle follows a flipped ampm); ≥${VARIETY_MIN} distinct + ≥2 each AM/PM. [time-expansion a.m./p.m.]`);
process.exit(0);
