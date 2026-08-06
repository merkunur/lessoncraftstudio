#!/usr/bin/env node
/* =====================================================================
   verify-clock-elapsed-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/clock-elapsed-core.js (window shim) and proves, for
   the shipped manifest (read start clock + duration → tap the END time):

     1. endTime() correct incl. the 12-hour rollover (ground-truth cases).
     2. EXACTLY-ONE-MATCH per round; oracle accepted, distractors rejected.
     3. endComputed — the oracle equals endTime(start, delta) (not stored).
     4. valid times (h 1-12, m 0-59); non-zero delta; options distinct.
     5. DERIVED_NOT_STORED — no stored correctIndex/answer/end key (deep scan);
        mutate deltaMin → the oracle moves (the grade computes, not a flag).
     6. ≥6 distinct starts, ≥7 rounds.

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'match', 'oracle', 'end', 'endTime'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'clock-elapsed-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ClockElapsedCore;
if (!Core) { console.error('FAIL: clock-elapsed-core.js did not define window.ClockElapsedCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-elapsed-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

/* endTime ground-truth (independent of the manifest) */
function expectEnd(h, m, delta, eh, em, label) {
  const e = Core.endTime({ h: h, m: m }, delta);
  check(e.h === eh && e.m === em, `${label}: endTime(${h}:${m}+${delta}) = ${e.h}:${e.m} != ${eh}:${em}`);
}
expectEnd(3, 0, 30, 3, 30, 'end 3:00+30');
expectEnd(3, 45, 30, 4, 15, 'end 3:45+30 (rollover)');
expectEnd(2, 15, 45, 3, 0, 'end 2:15+45 (rollover to o\'clock)');
expectEnd(10, 50, 20, 11, 10, 'end 10:50+20 (rollover)');
expectEnd(11, 40, 30, 12, 10, 'end 11:40+30 (rollover to 12)');
expectEnd(12, 50, 20, 1, 10, 'end 12:50+20 (12→1 wrap)');
/* subtraction (negative delta) ground-truth */
expectEnd(3, 30, -30, 3, 0, 'end 3:30-30');
expectEnd(12, 10, -20, 11, 50, 'end 12:10-20 (back-rollover past 12)');
expectEnd(1, 5, -10, 12, 55, 'end 1:05-10 (back-rollover)');
expectEnd(9, 5, -25, 8, 40, 'end 9:05-25');

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
    check(f.endComputed, `${label}: oracle does not equal endTime(start,delta)`);
    check(f.validTimes, `${label}: an invalid time (h 1-12 / m 0-59)`);
    check(f.validDelta, `${label}: invalid/zero deltaMin`);
    check(f.distinctOptions, `${label}: options not distinct`);

    (r.options || []).forEach((o, i) => { if (i !== oi) check(!Core.isAnswer(r, i), `${label}: distractor ${Core.digitalStr(o)} accepted`); });

    // DERIVED: mutate delta so the end lands on a distractor → oracle follows
    const di = (r.options || []).findIndex((_, i) => i !== oi);
    const want = r.options[di];
    // find a delta that maps start → want (search 1..720)
    let found = -1;
    for (let d = 1; d < 720; d++) { const e = Core.endTime(r.start, d); if (e.h === want.h && e.m === want.m) { found = d; break; } }
    if (found > 0) { const m = clone(r); m.deltaMin = found; check(Core.oracle(m) === di, `${label}: oracle did not follow a mutated delta (not derived)`); }
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctStarts >= 6, `${row.id}: only ${df.distinctStarts} distinct starts (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `${row.id}: only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} clock-elapsed violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctStarts} starts: endTime correct incl. 12h rollover (3:45+30=4:15, 11:40+30=12:10, 2:15+45=3:00); exactly-one-match; oracle = computed end (not stored); derived-not-stored (oracle follows a mutated delta); ≥${VARIETY_MIN} distinct rounds. [time-expansion elapsed-time operation]`);
process.exit(0);
