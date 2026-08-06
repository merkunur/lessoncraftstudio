#!/usr/bin/env node
/* =====================================================================
   verify-point-of-view-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/point-of-view-core.js (window shim) and proves,
   for the shipped manifest (RL.1.6 point-of-view), the clarity-first redesign
   of #66:

     1. ORACLE 100% — oracle(round) is the creature whose pos===the round's
        view, and it is accepted; a non-matching creature is rejected.
     2. DERIVED_NOT_STORED — no stored isCorrect/correctIndex field (deep
        scan); grading is chars[i].pos === round.view.
     3. every round: EXACTLY ONE creature at the view's height + a creature at
        BOTH high AND low + ≥3 creatures.
     4. creature ARRANGEMENTS vary (≥2 distinct name→pos layouts — not a fixed
        cast); ≥2 distinct views (high + low); ≥7 distinct rounds (§A.13.60).

   The spec's gate-consumes-render / canSee-split / keyword-lint / teller-shift
   / knowledge-tier / HUMAN-bypass-pilot rigor is deliberately NOT implemented
   (clarity-first — high/low vantage only, clear labels). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'point-of-view-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PointOfViewCore;
if (!Core) { console.error('FAIL: point-of-view-core.js did not define window.PointOfViewCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'point-of-view-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.view}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not an accepted answer`);
    check(r.chars[oi].pos === r.view, `${label}: oracle creature pos ≠ round view`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(f.charCount >= 3, `${label}: <3 creatures`);
    check(f.exactlyOneViewMatch, `${label}: not exactly one creature at the view's height`);
    check(f.hasHighAndLow, `${label}: missing a high and/or a low creature`);
    // a non-matching creature is rejected
    const wrong = r.chars.findIndex((c, i) => i !== oi);
    check(wrong < 0 || !Core.isAnswer(r, wrong), `${label}: a non-matching creature was accepted`);
    (r.chars || []).forEach((c) => check(['high', 'mid', 'low'].indexOf(c.pos) >= 0, `${label}: creature "${c.name}" invalid pos "${c.pos}"`));
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctViews.indexOf('high') >= 0 && df.distinctViews.indexOf('low') >= 0, `both views required (high + low); got [${df.distinctViews.join('/')}]`);
  check(df.distinctArrangements >= 2, `creature arrangements not varied (only ${df.distinctArrangements} distinct layout — a fixed cast is a position cheat)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} point-of-view violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), views [${df.distinctViews.join('/')}], ${df.distinctArrangements} distinct creature-arrangements: oracle 100% (the view-matching creature); derived-not-stored; exactly one match per view + a high & a low each round; a non-matching creature rejected; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #66]`);
process.exit(0);
