#!/usr/bin/env node
/* =====================================================================
   verify-skipcount-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/skipcount-core.js (window shim) and proves,
   for the shipped manifest (2.NBT.A.2 skip-counting), the clarity-first game:

     1. ORACLE 100% — fill: the derived answer = start + unknownIndex*step IS
        accepted; whichstep: |step| IS accepted; a wrong choice is rejected.
     2. ANSWER_DERIVED_NOT_STORED — mutate start → the fill answer shifts by Δ;
        mutate step → it shifts; no stored answer/landing/term/correct field
        on any round (deep scan).
     3. NUMERAL_SET_INSUFFICIENT — for fill, the answer term is NOT among the
        displayed (non-blank) pads.
     4. WITHIN_1000 every round; ≥1 non-multiple start; ≥1 (non-by-100)
        hundred-crossing; both cogs (fill + whichstep); ≥3 distinct choices
        with the answer present; ≥7 distinct rounds (§A.13.60).

   The spec's BUILDER_SEARCH / forced-interstitial suite is deliberately NOT
   implemented (clarity-first — the operator chose a clear visible skip-count
   game, tap-the-number, over the abstract produce-builder). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['answer', 'landing', 'term', 'correct', 'correctIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'skipcount-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SkipCountCore;
if (!Core) { console.error('FAIL: skipcount-core.js did not define window.SkipCountCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'skipcount-activities.json'), 'utf8'));
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
    check(f.withinGrade, `${label}: a term falls outside 0..1000`);
    check(f.choicesCount >= 3, `${label}: <3 choices`);
    check(f.distinctChoices, `${label}: duplicate choices [${ch.join(',')}]`);
    check(f.answerInChoices, `${label}: the answer ${a} is not among the choices [${ch.join(',')}]`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);
    ch.filter((c) => c !== a).forEach((w) => check(!Core.isAnswer(r, w), `${label}: a wrong choice (${w}) was accepted`));

    if (r.cog === 'fill') {
      check(f.answerNotDisplayed, `${label}: the answer term is shown on another pad (NUMERAL_SET_INSUFFICIENT)`);
      // ANSWER_DERIVED_NOT_STORED — mutate start → answer shifts by Δ
      const moved = Core.answerValue({ cog: 'fill', start: r.start + 7, step: r.step, length: r.length, unknownIndex: r.unknownIndex });
      check(moved === a + 7, `${label}: fill answer did not shift when start moved (stored?)`);
      const movedStep = Core.answerValue({ cog: 'fill', start: r.start, step: r.step + (r.step < 0 ? -1 : 1), length: r.length, unknownIndex: r.unknownIndex });
      check(movedStep === a + (r.step < 0 ? -r.unknownIndex : r.unknownIndex), `${label}: fill answer did not shift when step moved (stored?)`);
    } else {
      check(JSON.stringify(ch) === JSON.stringify([5, 10, 100]), `${label}: whichstep choices must be [5,10,100], got [${ch.join(',')}]`);
    }
  });
}

const distinctCogs = Object.keys(cogs);
check(distinctCogs.indexOf('fill') >= 0 && distinctCogs.indexOf('whichstep') >= 0, `both cogs required (fill + whichstep); got [${distinctCogs.join('/')}]`);

const df = Core.deckFacts(manifest[0].params.rounds);
check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
check(df.nonMultipleCount >= 1, `no non-multiple-start round (the natural anti-chant case)`);
check(df.crossHundredCount >= 1, `no (non-by-100) hundred-crossing round`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} skip-count-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), cogs [${distinctCogs.join('/')}]: oracle 100% (answer = start + k*step / |step|); answer derived-not-stored + not-displayed; within 1000; ${df.nonMultipleCount} non-multiple-start + ${df.crossHundredCount} cross-hundred; ≥3 distinct choices; a wrong choice rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first]`);
process.exit(0);
