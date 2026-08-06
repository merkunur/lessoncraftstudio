#!/usr/bin/env node
/* =====================================================================
   verify-clock-digital-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/clock-digital-core.js (window shim) and proves, for
   the shipped manifest (read analog → match digital):

     1. EXACTLY-ONE-MATCH per round; oracle accepted, distractors rejected.
     2. handAngles correct (the coupled math): 3:00 → hour 90° / minute 0°;
        12:00 → hour 0° / minute 0°; an o'clock hour hand points AT its number
        (30·h°), minute hand straight up (0°).
     3. GRANULARITY in scope (read-hour → every time has m=0); valid times
        (h 1-12, m 0-59); options distinct within a round.
     4. DERIVED_NOT_STORED — no stored correctIndex/answer/match key (deep scan);
        mutate target → the oracle moves (the grade reads the time, not a flag).
     5. ≥6 distinct targets, ≥7 rounds.

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'match', 'oracle'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-digital-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ClockDigitalCore;
if (!Core) { console.error('FAIL: clock-digital-core.js did not define window.ClockDigitalCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-digital-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

/* handAngles ground-truth checks (independent of the core) */
function expectAngle(h, m, eh, em, label) {
  const a = Core.handAngles(h, m);
  check(Math.abs(a.hour - eh) < 0.001, `${label}: hour angle ${a.hour} != ${eh}`);
  check(Math.abs(a.minute - em) < 0.001, `${label}: minute angle ${a.minute} != ${em}`);
}
expectAngle(3, 0, 90, 0, 'handAngles 3:00');
expectAngle(12, 0, 0, 0, 'handAngles 12:00');
expectAngle(6, 0, 180, 0, 'handAngles 6:00');
expectAngle(9, 30, 285, 180, 'handAngles 9:30');

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  const gran = (row.params && row.params.granularity) || 'minute';
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN}`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r, gran);
    const oi = Core.oracle(r);

    check(f.optionCount >= 3, `${label}: <3 options`);
    check(f.exactlyOneMatch, `${label}: not exactly one match (${Core.correctCount(r)})`);
    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not a match`);
    check(f.granularityInScope, `${label}: a time is outside granularity "${gran}"`);
    check(f.validTimes, `${label}: an invalid time (h 1-12 / m 0-59)`);
    check(f.distinctOptions, `${label}: options not distinct`);

    (r.options || []).forEach((o, i) => { if (i !== oi) check(!Core.isAnswer(r, i), `${label}: distractor ${Core.digitalStr(o)} accepted`); });

    // DERIVED: mutate target to a distractor's time → oracle moves to it
    const di = (r.options || []).findIndex((_, i) => i !== oi);
    const m = clone(r); m.target = { h: r.options[di].h, m: r.options[di].m };
    check(Core.oracle(m) === di, `${label}: oracle did not follow a mutated target (not derived)`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctTargets >= 6, `${row.id}: only ${df.distinctTargets} distinct targets (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `${row.id}: only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} clock-digital violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctTargets} targets: exactly-one digital match; oracle 100%; coupled handAngles correct (3:00→90°/0°, 9:30→285°/180°); granularity in scope; derived-not-stored (oracle follows a mutated target); ≥${VARIETY_MIN} distinct rounds. [time-expansion read analog→digital]`);
process.exit(0);
