#!/usr/bin/env node
/* =====================================================================
   verify-mochi-feast-core.js — build-time count-out cognition gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/mochi-feast-core.js (under a window shim) and
   proves, over the shipped manifest pool, that the GRADED cognition is
   "count out EXACTLY the asked number of objects" (CCSS K.CC.B.5) — driven
   through the real core, not eyeballed:

     • the count-equality ORACLE passes ONLY at the target: feeding
       target-1 → wrong, target → right, target+1 → wrong (both off-by-one
       sides fail; isCorrect is true cardinality, not "≥ target");
     • no stored answer/correctIndex on any round (DERIVED, not stored);
     • ≥7 rounds (§A.13.60) and ≥7 DISTINCT feasts (target+noun pairs);
     • every target is in the K count range (1..20) and every round's PROP
       IMAGE FILE EXISTS on disk (image-library-webp/themes/<theme>/<noun>@2x.webp);
     • the resting pile FITS: for every target (incl. the max), all treat
       positions stay inside the bowl band (below Mochi, inside the frame),
       so the count is always fully visible/countable.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mochi-feast-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MochiFeastCore;
if (!Core) { console.error('FAIL: mochi-feast-core.js did not define window.MochiFeastCore'); process.exit(1); }

/* ---- load the shipped manifest ---- */
const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mochi-feast-activities.json'), 'utf8'));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* drive the REAL core: set the bowl to k treats and read isCorrect() */
function isCorrectWith(round, k) {
  Core.init({});                 // api unused by setup/isCorrect; {} is safe
  Core.setupTask(round);
  Core.fed = new Array(Math.max(0, k)).fill(1);
  return Core.isCorrect();
}

let roundCount = 0;
for (const row of manifest) {
  if (row.task_template !== 'count-out') continue;
  const rounds = (row.params && row.params.rounds) || [];

  check(rounds.length >= VARIETY_MIN, `${row.id}: only ${rounds.length} rounds (< ${VARIETY_MIN} variety floor §A.13.60)`);
  const distinct = new Set(rounds.map((r) => r.target + ':' + r.noun));
  check(distinct.size >= VARIETY_MIN, `${row.id}: only ${distinct.size} distinct feasts (target+noun) (< ${VARIETY_MIN})`);

  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${row.id}#${i}[${r.target}×${r.noun}]`;

    check(!('answer' in r) && !('correctIndex' in r), `${label}: round stores an answer/correctIndex (must be DERIVED, not stored)`);
    check(r.target >= 1 && r.target <= 20, `${label}: target ${r.target} outside the K count range 1..20`);
    /* the prop is a REAL library image — its file must exist on disk */
    const imgFile = path.join(REPO, 'image-library-webp', 'themes', r.theme || '', (r.noun || '') + '@2x.webp');
    check(!!r.noun && !!r.theme, `${label}: round missing noun/theme`);
    check(fs.existsSync(imgFile), `${label}: prop image not found on disk — ${path.relative(REPO, imgFile)}`);
    /* the wrapper resolves a per-noun prompt key — it must exist (EN) */
    const promptKey = 'prompt' + (r.noun ? r.noun.charAt(0).toUpperCase() + r.noun.slice(1) : '');
    check(!!(Core.strings[promptKey] && Core.strings[promptKey].en), `${label}: missing prompt string "${promptKey}.en"`);

    /* the measured cognition: only EXACTLY the target is correct */
    check(isCorrectWith(r, r.target) === true,      `${label}: feeding the target (${r.target}) is not graded correct`);
    check(isCorrectWith(r, r.target - 1) === false, `${label}: feeding target-1 (${r.target - 1}) was graded correct (under-count must fail)`);
    check(isCorrectWith(r, r.target + 1) === false, `${label}: feeding target+1 (${r.target + 1}) was graded correct (over-count must fail)`);
    check(isCorrectWith(r, 0) === false,            `${label}: feeding 0 was graded correct`);

    /* the resting pile fits inside the bowl band (below Mochi y≈74, inside
       the 120×130 frame) so every treat is fully visible + countable */
    Core.setupTask(r);
    const pos = Core._treatPositions(r.target);
    check(pos.length === r.target, `${label}: ${pos.length} positions for target ${r.target}`);
    pos.forEach((p, pi) => {
      check(p.y >= 78 && p.y <= 114, `${label}: treat ${pi} y=${p.y.toFixed(1)} outside the bowl band [78,114] (would overlap Mochi / leave the bowl)`);
      check(p.x >= 26 && p.x <= 94, `${label}: treat ${pi} x=${p.x.toFixed(1)} outside the frame band [26,94]`);
    });
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} count-out violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): the count-equality ORACLE passes ONLY at the target ` +
  `(both off-by-one sides fail), no stored answer, ≥${VARIETY_MIN} distinct feasts, every target in 1..20, every pile fits the bowl band.`);
process.exit(0);
