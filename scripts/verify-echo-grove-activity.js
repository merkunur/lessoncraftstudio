#!/usr/bin/env node
/* =====================================================================
   verify-echo-grove-activity.js — build-time gate for the Echo Grove
   ACTIVITY (CCSS 3.OA.A.1 match-the-rune). Loads the REAL cognition core
   (mini tools/echo-grove-core.js, window shim) + the shipped manifest and
   proves, for every round, the graded cognition + the ≤12 band + the props:

     • candidates = correct + same-total decoys: EVERY candidate shares the
       product g·s (the total is non-discriminating — a total-reader gains
       nothing);
     • EXACTLY ONE candidate is "g groups of s" (Core.matches) — the answer
       is DERIVED, never a stored index;
     • the COMMUTATIVE TWIN (s groups of g) is present as a decoy whenever
       g≠s (the load-bearing distractor);
     • the NUMBER BAND: factors 2..6, product ≤12, ≥2 candidates (so the
       card stays countable + twin-proof at 280px);
     • the PROP image file exists on disk (image-library-webp/themes/<theme>/<noun>@2x.webp);
     • ≥7 DISTINCT rounds (g,s,fruit) (§A.13.60).

   The shipped scripts/verify-echo-grove-core.js covers the core cognition
   over its own pool; this gate covers the ACTIVITY's manifest band + props.
   Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'echo-grove-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.EchoGroveCore;
if (!Core) { console.error('FAIL: echo-grove-core.js did not define window.EchoGroveCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'echo-grove-activities.json'), 'utf8'));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* mirror the wrapper's candidate construction */
function candsFor(r) {
  const list = [{ g: r.g, s: r.s }];
  Core.sameTotalDecoys(r.g, r.s, 2).forEach((d) => list.push({ g: d[0], s: d[1] }));
  return list;
}

let roundCount = 0;
for (const row of manifest) {
  if (row.task_template !== 'match-the-rune') continue;
  const rounds = (row.params && row.params.rounds) || [];

  check(rounds.length >= VARIETY_MIN, `${row.id}: only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
  const distinct = new Set(rounds.map((r) => r.g + 'x' + r.s + ':' + r.fruit));
  check(distinct.size >= VARIETY_MIN, `${row.id}: only ${distinct.size} distinct (g,s,fruit) (< ${VARIETY_MIN})`);

  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${row.id}#${i}[${r.g}×${r.s} ${r.fruit}]`;
    const total = r.g * r.s;

    /* band */
    check(r.g >= 2 && r.g <= 5 && r.s >= 2 && r.s <= 5, `${label}: factors outside 2..5`);
    check(total <= 12, `${label}: product ${total} > 12 (band)`);
    check(!('answer' in r) && !('correctIndex' in r), `${label}: round stores an answer/correctIndex (must be DERIVED)`);

    const cands = candsFor(r);
    check(cands.length >= 2, `${label}: only ${cands.length} candidate(s) (< 2)`);

    /* every candidate shares the total (total non-discriminating) */
    cands.forEach((c) => check(c.g * c.s === total, `${label}: candidate ${c.g}×${c.s} total ${c.g * c.s} ≠ ${total} (decoys must share the total)`));

    /* exactly one matches g-groups-of-s */
    const matchN = cands.filter((c) => Core.matches({ g: r.g, s: r.s }, c)).length;
    check(matchN === 1, `${label}: ${matchN} candidates match "g groups of s" (must be exactly 1)`);

    /* the commutative twin is a decoy whenever g≠s */
    if (r.g !== r.s) {
      const twin = cands.some((c) => c.g === r.s && c.s === r.g);
      check(twin, `${label}: the commutative twin ${r.s}×${r.g} is not among the candidates (the load-bearing decoy)`);
    }

    /* prop image exists on disk */
    const imgFile = path.join(REPO, 'image-library-webp', 'themes', r.theme || '', (r.fruit || '') + '@2x.webp');
    check(!!r.fruit && !!r.theme, `${label}: missing fruit/theme`);
    check(fs.existsSync(imgFile), `${label}: prop image not found — ${path.relative(REPO, imgFile)}`);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} echo-grove activity violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s): every decoy shares the total, EXACTLY ONE candidate is g-groups-of-s, the commutative twin is present, ` +
  `band = factors 2..5 / product ≤12, every prop image exists, ≥${VARIETY_MIN} distinct groves.`);
process.exit(0);
