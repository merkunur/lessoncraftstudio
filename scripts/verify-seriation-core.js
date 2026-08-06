#!/usr/bin/env node
/* =====================================================================
   verify-seriation-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/seriation-core.js (window shim) and proves, for
   the shipped manifest (1.MD.A.1 order/indirect length-compare), the clarity-
   first redesign of #69:

     1. ORACLE 100% per mode — oracle(round) is the max (longest) / min
        (shortest) / ==cordLen (samecord) ribbon, and it is accepted; a non-
        answer ribbon is rejected.
     2. EXACTLY-ONE-CORRECT per round (construction validity).
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer
        field (deep scan); grading is computed from the ribbon lengths, re-
        proven by MUTATION: bump the oracle ribbon's len so another becomes the
        extreme → the oracle index moves accordingly.
     4. each round ≥3 ribbons with DISTINCT lengths (longest/shortest
        unambiguous); samecord rounds have exactly one ribbon ==cordLen and the
        others !=; ≥2 modes present; ≥7 distinct rounds + ≥7 distinct sets.

   The spec's scale-inversion / frozen memory-rail / REMEASURE_IMPOSSIBLE /
   role-frequency-solver / 40%-transitive-ceiling rigor is deliberately NOT
   implemented (clarity-first — honest pixels, the cord as a clear go-between).
   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'seriation-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SeriationCore;
if (!Core) { console.error('FAIL: seriation-core.js did not define window.SeriationCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'seriation-activities.json'), 'utf8'));
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
    const label = `${r.id}[${r.mode}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.modeValid, `${label}: invalid mode`);
    check(f.ribbonCount >= 3, `${label}: <3 ribbons`);
    check(f.distinctLengths, `${label}: ribbon lengths not all distinct (longest/shortest ambiguous)`);
    check(f.sameCordValid, `${label}: samecord round does not have exactly one ribbon == cordLen`);
    check(f.exactlyOneCorrect, `${label}: not exactly one correct (${Core.correctCount(r)})`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not an accepted answer`);

    // oracle matches the intended per-mode rule
    const lens = r.ribbons.map((x) => x.len);
    if (r.mode === 'longest') check(r.ribbons[oi].len === Math.max(...lens), `${label}: oracle is not the longest`);
    if (r.mode === 'shortest') check(r.ribbons[oi].len === Math.min(...lens), `${label}: oracle is not the shortest`);
    if (r.mode === 'samecord') check(r.ribbons[oi].len === r.cordLen, `${label}: oracle len != cordLen`);

    // every non-oracle ribbon rejected
    r.ribbons.forEach((rib, i) => { if (i !== oi) check(!Core.isAnswer(r, i), `${label}: a non-oracle ribbon "${rib.color}" was accepted`); });

    // MUTATION (longest/shortest): make a different ribbon the extreme → oracle moves
    if (r.mode === 'longest' || r.mode === 'shortest') {
      const m = clone(r), other = (oi + 1) % m.ribbons.length;
      // push `other` to the extreme well beyond all
      m.ribbons[other].len = r.mode === 'longest' ? Math.max(...lens) + 5 : Math.min(...lens) - 5;
      check(Core.oracle(m) === other, `${label}: oracle did not move under mutation (not derived from lengths)`);
    } else {
      // samecord: change cordLen to match a different ribbon → oracle moves to it
      const m = clone(r), other = (oi + 1) % m.ribbons.length;
      m.cordLen = m.ribbons[other].len;
      // ensure uniqueness of the new match
      const matches = m.ribbons.filter((x) => x.len === m.cordLen).length;
      if (matches === 1) check(Core.oracle(m) === other, `${label}: samecord oracle did not follow cordLen (not derived)`);
    }
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctModes.length >= 2, `only ${df.distinctModes.length} mode(s) (want ≥2); got [${df.distinctModes.join('/')}]`);
  check(df.distinctSets >= VARIETY_MIN, `only ${df.distinctSets} distinct ribbon-sets (<${VARIETY_MIN})`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} seriation violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), modes [${df0.distinctModes.join('/')}], ${df0.distinctSets} distinct sets: oracle 100% (max/min/==cord accepted, others rejected); exactly-one-correct; distinct lengths; samecord-valid; derived-not-stored (oracle moves under mutation); ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #69]`);
process.exit(0);
