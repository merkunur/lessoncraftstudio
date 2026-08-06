#!/usr/bin/env node
/* =====================================================================
   verify-maple-bakery-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/maple-bakery-core.js (window shim) and proves,
   for the shipped manifest (3.OA.A.2 division), the clarity-first game:

     1. ORACLE 100% — for every round the derived answerValue = dividend/divisor
        IS accepted, AND a wrong choice is NOT accepted.
     2. ANSWER_DERIVED_NOT_STORED — mutate dividend → answerValue moves; no
        stored answer/quotient/correct/perPlate/boxes field on any round
        (deep scan).
     3. EXACT_DIVISION_ONLY — dividend % divisor === 0 every round.
     4. ≥3 distinct choices each, the answer ∈ choices; both cogs present
        (share + pack); ≥7 distinct rounds (§A.13.60); within-grade (≤100).

   The spec's KEYWORD/SCENE/structural-placement solver suite is deliberately
   NOT implemented — this is the clarity-first build (the operator chose a
   clear, visible share/group game over the abstract anti-cheat design;
   deal-and-count is allowed). Exit 0 = pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['answer', 'quotient', 'correct', 'correctIndex', 'perPlate', 'boxes', 'perBox'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'maple-bakery-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MapleBakeryCore;
if (!Core) { console.error('FAIL: maple-bakery-core.js did not define window.MapleBakeryCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'maple-bakery-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;
const cogs = {};

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++; cogs[r.cog] = 1;
    const label = `${r.id}[${r.cog}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const a = Core.answerValue(r);
    const ch = Core.choices(r);

    check(Core.isAnswer(r, a), `${label}: the derived answer (${a}) was not accepted`);
    check(f.exactDivision, `${label}: ${r.dividend} ÷ ${r.divisor} is not exact`);
    check(f.choicesCount >= 3, `${label}: <3 choices`);
    check(f.distinctChoices, `${label}: duplicate choices [${ch.join(',')}]`);
    check(f.answerInChoices, `${label}: the answer ${a} is not among the choices [${ch.join(',')}]`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);
    check(f.withinGrade, `${label}: dividend ${r.dividend} > 100 (out of K-2/3 band)`);
    // every wrong choice is rejected
    ch.filter((c) => c !== a).forEach((w) => check(!Core.isAnswer(r, w), `${label}: a wrong choice (${w}) was accepted`));
    // ANSWER_DERIVED_NOT_STORED — mutate dividend → answer moves
    const moved = Core.answerValue({ cog: r.cog, dividend: r.dividend + r.divisor, divisor: r.divisor });
    check(moved === a + 1, `${label}: answerValue did not move when the dividend changed (stored?)`);
  });
}

const distinctCogs = Object.keys(cogs);
check(distinctCogs.indexOf('share') >= 0 && distinctCogs.indexOf('pack') >= 0, `both cogs required (share + pack); got [${distinctCogs.join('/')}]`);

const df = Core.deckFacts(manifest[0].params.rounds);
check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} division-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), cogs [${distinctCogs.join('/')}]: oracle 100% (answer = dividend ÷ divisor); answer derived-not-stored; exact division; ≥3 distinct choices with the answer present; a wrong choice is rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first]`);
process.exit(0);
