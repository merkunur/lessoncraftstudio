#!/usr/bin/env node
/* =====================================================================
   verify-mosaic-menders-activity.js — build-time gate for the Mosaic
   Menders ACTIVITY (CCSS 3.MD.C.6 area = count of unit tiles). Loads the
   REAL cognition core (mini tools/mosaic-menders-core.js, window shim) +
   the shipped manifest and proves, for every round, the measured cognition:

     • candidates = match + decoys; EXACTLY ONE candidate has area === the
       target area (Core.matches) — the answer is DERIVED, never stored;
     • the MATCH conserves area across a DIFFERENT shape (its bbox differs
       from the target's) — area-invariance is the point;
     • ≥1 decoy has a STRICTLY BIGGER bounding box than the match (so
       "pick the biggest box" misfires);
     • ≥1 decoy has MORE tiles than the target (so "pick the most" misfires);
     • no stored answer/correctIndex; ≥7 DISTINCT rounds (§A.13.60).

   Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mosaic-menders-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MosaicMendersCore;
if (!Core) { console.error('FAIL: mosaic-menders-core.js did not define window.MosaicMendersCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mosaic-menders-activities.json'), 'utf8'));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

let roundCount = 0;
for (const row of manifest) {
  if (row.task_template !== 'area-match') continue;
  const rounds = (row.params && row.params.rounds) || [];

  check(rounds.length >= VARIETY_MIN, `${row.id}: only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
  const distinct = new Set(rounds.map((r) => r.target + '>' + r.match));
  check(distinct.size >= VARIETY_MIN, `${row.id}: only ${distinct.size} distinct rounds (< ${VARIETY_MIN})`);

  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${row.id}#${i}[${r.target}/${r.match}]`;
    const cands = Core.candidates(r);
    const tArea = Core.area(r.target), tBbox = Core.bboxArea(r.target);
    const mBbox = Core.bboxArea(r.match);

    check(!('answer' in r) && !('correctIndex' in r), `${label}: round stores an answer/correctIndex (must be DERIVED)`);

    // every shape name is known
    cands.concat([r.target]).forEach((nm) => check(!!Core.SHAPES[nm], `${label}: unknown shape "${nm}"`));

    // EXACTLY ONE candidate has the target area
    const matchN = cands.filter((nm) => Core.matches(r.target, nm)).length;
    check(matchN === 1, `${label}: ${matchN} candidates match the target area (must be exactly 1)`);
    check(Core.matches(r.target, r.match), `${label}: declared match "${r.match}" (a${Core.area(r.match)}) ≠ target area a${tArea}`);

    // the match conserves area across a DIFFERENT shape (bbox differs from target)
    check(mBbox !== tBbox || r.match !== r.target, `${label}: match has the same bbox/shape as the target (no conservation across shape)`);

    // ≥1 decoy with a STRICTLY BIGGER bbox than the match (the "biggest box" foil)
    check((r.decoys || []).some((nm) => Core.bboxArea(nm) > mBbox), `${label}: no decoy has a bigger bounding box than the match (the perceptual foil)`);
    // ≥1 decoy with MORE tiles than the target (the "most tiles" foil)
    check((r.decoys || []).some((nm) => Core.area(nm) > tArea), `${label}: no decoy has more tiles than the target`);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} mosaic-menders activity violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s): EXACTLY ONE area-match per round, match conserves area across a different shape, ` +
  `a bigger-bbox foil + a more-tiles foil present, no stored answer, ≥${VARIETY_MIN} distinct rounds.`);
process.exit(0);
