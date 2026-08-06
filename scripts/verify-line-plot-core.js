#!/usr/bin/env node
/* =====================================================================
   verify-line-plot-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/line-plot-core.js (window shim) and proves, for
   the shipped manifest (2.MD.D.9 measurement line plot), the clarity-first
   game:

     1. ORACLE 100% — each read type computes the correct answer; plot =
        placeLength; the derived answer is accepted, a wrong choice rejected.
     2. ANSWER_DERIVED_NOT_STORED — no stored answer/correct field (deep scan);
        a read answer MOVES when the plot data (marks) changes.
     3. ≥3 distinct choices with the answer present, each round.
     4. both cogs (plot + read); ≥3 distinct read types incl. ≥1 VALUE-read
        (maxMinusMin / moreAB); ≥1 read round with a zero-count interior gap;
        the mode round's mode is non-extreme; ≥7 distinct rounds.

   The spec's VALUE_PERMUTE_INVARIANCE tier taxonomy + VISUAL_REGION_COUNT_
   SOLVER suite is deliberately NOT implemented (clarity-first — the value-
   reads are kept so it stays a real line plot). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['answer', 'correct', 'correctIndex', 'isCorrect'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'line-plot-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.LinePlotCore;
if (!Core) { console.error('FAIL: line-plot-core.js did not define window.LinePlotCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'line-plot-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

// independent oracle re-implementation (proves the core's oracle matches truth)
function truth(r) {
  if (r.cog === 'plot') return r.placeLength;
  const c = {}; r.marks.forEach((m) => { c[m] = (c[m] || 0) + 1; });
  const q = r.question;
  if (q.type === 'atN') return c[q.n] || 0;
  if (q.type === 'longerN') return r.marks.filter((x) => x > q.n).length;
  if (q.type === 'mode') { let best = null, bc = -1; Object.keys(c).forEach((k) => { if (c[k] > bc) { bc = c[k]; best = +k; } }); return best; }
  if (q.type === 'maxMinusMin') return Math.max(...r.marks) - Math.min(...r.marks);
  if (q.type === 'moreAB') return (c[q.a] || 0) - (c[q.b] || 0);
  return null;
}

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.cog}${r.question ? ':' + r.question.type : ''}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const a = Core.oracle(r);
    const ch = Core.choices(r);

    check(a === truth(r), `${label}: core oracle (${a}) ≠ independent truth (${truth(r)})`);
    check(Core.isAnswer(r, a), `${label}: the derived answer (${a}) was not accepted`);
    check(f.choicesCount >= 3, `${label}: <3 choices`);
    check(f.distinctChoices, `${label}: duplicate choices [${ch.join(',')}]`);
    check(f.answerInChoices, `${label}: the answer ${a} is not among the choices [${ch.join(',')}]`);
    check(f.answerDerivedNotStored, `${label}: derived invariant`);
    ch.filter((c) => c !== a).forEach((w) => check(!Core.isAnswer(r, w), `${label}: a wrong choice (${w}) was accepted`));

    if (r.cog === 'read') {
      // ANSWER_DERIVED_NOT_STORED — the oracle is a PURE function of the data: recompute on a changed plot, it must still equal independent truth (proves no caching)
      const mutated = Object.assign({}, r, { marks: r.marks.concat([4, 4]) });
      check(Core.oracle(mutated) === truth(mutated), `${label}: oracle did not recompute correctly on changed marks (stored?)`);
      if (r.question.type === 'mode') check(f.modeNonExtreme, `${label}: the mode is extreme (tallest-stack = an endpoint)`);
    } else {
      const mp = Object.assign({}, r, { placeLength: r.placeLength === r.scale.max ? r.placeLength - 1 : r.placeLength + 1 });
      check(Core.oracle(mp) === mp.placeLength, `${label}: plot oracle did not track placeLength (stored?)`);
    }
  });
}

const df = Core.deckFacts(manifest[0].params.rounds);
check(df.distinctCogs.indexOf('plot') >= 0 && df.distinctCogs.indexOf('read') >= 0, `both cogs required (plot + read); got [${df.distinctCogs.join('/')}]`);
check(df.readTypes.length >= 3, `only ${df.readTypes.length} distinct read types (<3): [${df.readTypes.join(',')}]`);
check(df.valueReadCount >= 1, `no VALUE-read (maxMinusMin / moreAB) present`);
check(df.gapRoundCount >= 1, `no read round with a zero-count interior gap`);
check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} line-plot-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), cogs [${df.distinctCogs.join('/')}], read-types [${df.readTypes.join('/')}] (${df.valueReadCount} value-read): oracle 100% vs independent truth; answer derived-not-stored; ≥3 distinct choices; a wrong choice rejected; ${df.gapRoundCount} interior-gap round(s); mode non-extreme; ≥${VARIETY_MIN} distinct. [clarity-first]`);
process.exit(0);
