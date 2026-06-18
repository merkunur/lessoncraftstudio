#!/usr/bin/env node
/* =====================================================================
   verify-sort-bins-core.js — build-time sort-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/sort-bins-core.js (under a window shim) and
   proves, for the shipped activity manifest, that:

     1. every catalog shape's declared `sides` EQUALS its polygon vertex
        count (the answer-key is geometry, not a hand-typed number);
     2. every family side-count is the canonical 3/4/5/6 and distinct
        (so each shape maps to exactly one family bin);
     3. every round's items each have a MATCHING bin (no unsortable item),
        and every bin in a round is NON-EMPTY (no decorative empty bin);
     4. the pool has ≥7 rounds (CLAUDE.md §A.13.60 variety floor).

   This is the "measured, not eyeballed" content-layer check. Exit 0 = all
   pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'sort-bins-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SortBinsCore;
if (!Core) { console.error('FAIL: sort-bins-core.js did not define window.SortBinsCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sort-bins-activities.json'), 'utf8'));

const CAT = Core._CATALOG, FAM = Core._FAMILY;
const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }

/* 1. every catalog shape: declared sides === resolved polygon vertex count */
Object.keys(CAT).forEach((id) => {
  const pts = Core._pointsOf(CAT[id]);
  check(Array.isArray(pts) && pts.length === CAT[id].sides,
    `catalog "${id}": declared sides ${CAT[id].sides} ≠ polygon vertex count ${pts ? pts.length : 'n/a'}`);
  // every vertex finite + inside the 0..100 viewBox
  (pts || []).forEach((p, vi) => check(
    isFinite(p.x) && isFinite(p.y) && p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100,
    `catalog "${id}": vertex ${vi} (${p.x},${p.y}) outside 0..100 viewBox`));
});

/* 2. family side-counts are the canonical 3/4/5/6 and distinct */
const EXPECT = { triangle: 3, quadrilateral: 4, pentagon: 5, hexagon: 6 };
const seen = {};
Object.keys(FAM).forEach((k) => {
  check(FAM[k].sides === EXPECT[k], `family "${k}": sides ${FAM[k].sides}, expected ${EXPECT[k]}`);
  check(!seen[FAM[k].sides], `family "${k}": side-count ${FAM[k].sides} collides with another family`);
  seen[FAM[k].sides] = true;
  check(!!Core.strings[FAM[k].labelKey], `family "${k}": label key "${FAM[k].labelKey}" missing from strings`);
});

/* 3 + 4. per-manifest-row round validity */
let roundCount = 0;
for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor (§A.13.60)`);
  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${row.id}#${i}`;
    const binSides = (r.bins || []).map((b) => FAM[b] && FAM[b].sides);
    check((r.bins || []).every((b) => FAM[b]), `${label}: unknown family in bins [${(r.bins || []).join(', ')}]`);
    // every item has a matching bin + exists in the catalog
    const usedBins = {};
    (r.items || []).forEach((id) => {
      const s = CAT[id] && CAT[id].sides;
      check(CAT[id] != null, `${label}: item "${id}" not in catalog`);
      const bi = binSides.indexOf(s);
      check(bi !== -1, `${label}: item "${id}" (sides ${s}) has no matching bin [${(r.bins || []).join(', ')}]`);
      if (bi !== -1) usedBins[bi] = true;
    });
    // every bin is used by ≥1 item (no decorative empty bin)
    (r.bins || []).forEach((b, bi) => check(usedBins[bi],
      `${label}: bin "${b}" has no items — empty bin would render with no correct answer`));
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} sort-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${Object.keys(CAT).length} catalog shapes (sides = vertex count), ${roundCount} round(s) across ${manifest.length} coordinate(s): every item maps to exactly one non-empty bin, ≥${VARIETY_MIN} rounds.`);
process.exit(0);
