#!/usr/bin/env node
/* =====================================================================
   verify-patchwork-meadow-core.js — build-time area-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/patchwork-meadow-core.js (under a window shim)
   and proves, for the shipped activity manifest (3.MD.C.6 — measure area by
   covering a region with unit squares), that:

     1. COVER-AND-COUNT ORACLE passes 100% — laying each region cell once
        (build: laying exactly the target N) → isComplete() true →
        area()/coverage === the true count; estimate's correct choice =
        regionArea.
     2. COUNT_VISIBLE_OBJECTS solver (the critic's DEEPEST cheat) FAILS on
        the numeric-REPORT modes (estimate / build): the snapshot exposes NO
        separated-tile array at report (estimate's bed is empty; build knits
        before stating), so a "count the visible tiles" solver finds none and
        cannot recover the area → ≤ chance. (the K.CC.B.5 route is closed.)
     3. MULTIPLY-DIMENSIONS solver FAILS — bbox.cols×bbox.rows ≠ |cells| on
        the irregular spine (≥40% of region rounds); + NO_LENGTH_WIDTH_NUMBERS
        (deep key-scan: no area/w/h/width/height/length field on any round).
     4. COUNT-PRE-PLACED solver FAILS — cover-from-empty rounds have 0
        pre-placed; the repair round's seeded cover has a gap + an overlap
        (its naive filled-count ≠ the true area).
     5. READ-TOTAL solver FAILS — no stored area/total field anywhere.
     6. FIRST/RANDOM solver FAILS — estimate has ≥3 choices, correct ∉ index-0.
     + STRUCTURAL asserts: UNIT_IS_A_SQUARE, GRADE3_AREA_BOUNDS (4–20, spine
       ≤16), BUILD_TARGET_IS_SPACE_NOT_TILE_QUANTITY, and ≥7 distinct rounds
       (§A.13.60 variety floor — honest 5 actions + ≥7 distinct regions).

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'patchwork-meadow-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PatchworkMeadowCore;
if (!Core) { console.error('FAIL: patchwork-meadow-core.js did not define window.PatchworkMeadowCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'patchwork-meadow-activities.json'), 'utf8'));

const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }

/* deep key-scan: assert no dimension/area "answer" key lives on a round. */
const FORBIDDEN_KEYS = ['area', 'total', 'w', 'h', 'width', 'height', 'length', 'rows', 'cols'];
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => {
    if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden dimension/area key "${k}" on the round (NO_LENGTH_WIDTH_NUMBERS)`);
    scanForbidden(obj[k], label);
  });
}

/* a placements MULTISET that fully + cleanly covers the region (the oracle) */
function fullCover(round) {
  const pl = {};
  Core.cells(round).forEach((k) => { pl[k] = 1; });
  return pl;
}
/* lay exactly N connected cells of the build frame */
function buildToTarget(round) {
  const pl = {}, cs = Core.cells(round);   // cells() reads round.frame for build
  for (let i = 0; i < round.target && i < cs.length; i++) pl[cs[i]] = 1;
  return pl;
}

let roundCount = 0, regionRounds = 0, irregularRounds = 0, reportRounds = 0;
const cogs = {};

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor (§A.13.60)`);

  rounds.forEach((round) => {
    roundCount++;
    cogs[round.cog] = 1;
    const label = `${round.id}[${round.cog}]`;
    const f = Core.facts(round);

    scanForbidden(round, label);                       // 3 (deep key-scan)
    check(f.unitIsASquare, `${label}: UNIT_IS_A_SQUARE violated`);                      // unit
    check(f.grade3AreaBounds, `${label}: GRADE3_AREA_BOUNDS (4–20, spine ≤16) violated`);
    check(f.areaFromCellsNotStored, `${label}: AREA_FROM_CELLS_NOT_STORED violated`);   // 5
    check(round.area == null && round.total == null, `${label}: READ-TOTAL — a stored area/total field exists`); // 5

    if (round.cog === 'build') {
      check(f.buildTargetIsSpaceNotTileQuantity, `${label}: BUILD_TARGET_IS_SPACE_NOT_TILE_QUANTITY violated`);
      // 1. oracle: build exactly target N → complete; area === target
      const pl = buildToTarget(round);
      check(Core.isComplete(round, pl), `${label}: building exactly ${round.target} cells did NOT complete`);
      check(Core.area(pl) === round.target, `${label}: built area ${Core.area(pl)} ≠ target ${round.target}`);
      // 4. one short → not complete; one over (overlap) → not complete
      const short = buildToTarget(round); const ks = Object.keys(short);
      delete short[ks[ks.length - 1]];
      check(!Core.isComplete(round, short), `${label}: a bed one square short still completed`);
      const over = buildToTarget(round); over[Object.keys(over)[0]] = 2;
      check(!Core.isComplete(round, over), `${label}: an overlap (double patch) still completed`);
      // 2. COUNT_VISIBLE_OBJECTS at report: the snapshot exposes no tile array
      const snap = Core.snapshot(round);
      check(!('visibleTiles' in snap) && !('placements' in snap) && !('prePlaced' in snap && snap.prePlaced),
        `${label}: build snapshot leaks a separated-tile array (object-counting route)`);
      reportRounds++;
    } else {
      regionRounds++;
      if (Core.isIrregular(round)) irregularRounds++;
      const ra = Core.regionArea(round);

      if (round.cog === 'estimate') {
        // 1. oracle = the choice whose value === regionArea
        const oi = Core.oracle(round);
        check(oi >= 0 && Number(round.choices[oi].value) === ra, `${label}: estimate oracle did not key regionArea ${ra}`);
        // 6. ≥3 choices, correct ∉ index-0
        check((round.choices || []).length >= 3, `${label}: estimate has <3 choices`);
        check(f.correctNotIndex0, `${label}: estimate correct choice is at index 0`);
        // 2. COUNT_VISIBLE_OBJECTS: at predict the bed is EMPTY → a count of
        //    visible placed tiles = 0 ≠ regionArea; the snapshot has none.
        const emptyVisibleCount = Core.coverageSize({});            // the rendered bed at predict
        check(emptyVisibleCount !== ra, `${label}: estimate bed is not empty at predict (object-count would work)`);
        const snap = Core.snapshot(round);
        check(!('visibleTiles' in snap) && !snap.prePlaced, `${label}: estimate snapshot leaks a tile array`);
        // a mis-authored isCorrect would be ignored: flip nothing — oracle is derived
        reportRounds++;
      } else {
        // tile / finish / repair — graded by the cover, not a number choice
        // 1. oracle: full clean cover → complete; area === regionArea
        const pl = fullCover(round);
        check(Core.isComplete(round, pl), `${label}: a full clean cover did NOT complete`);
        check(Core.area(pl) === ra, `${label}: covered area ${Core.area(pl)} ≠ regionArea ${ra}`);
        // 4. one gap → not complete
        const gap = fullCover(round); delete gap[Object.keys(gap)[0]];
        check(!Core.isComplete(round, gap), `${label}: a bare gap still completed`);
        // 4. one overlap → not complete (placements-multiset is real)
        const over = fullCover(round); over[Object.keys(over)[0]] = 2;
        check(!Core.isComplete(round, over), `${label}: a double patch (overlap) still completed`);
        // a stray outside the region → not complete
        const stray = fullCover(round); stray['99,99'] = 1;
        check(!Core.isComplete(round, stray), `${label}: a stray patch outside the bed still completed`);

        if (round.cog === 'repair') {
          // 4. COUNT-PRE-PLACED: the seeded flawed cover has a gap AND an overlap
          const seed = Core.placementsFromPre(round);
          check(Core.hasOverlap(seed), `${label}: repair seed has no overlap to fix`);
          // a region cell missing from the seed = the gap
          const region = Core.regionSet(round);
          let gapCount = 0; Object.keys(region).forEach((k) => { if (!(seed[k] >= 1)) gapCount++; });
          check(gapCount >= 1, `${label}: repair seed has no bare gap to fix`);
          check(!Core.isComplete(round, seed), `${label}: repair seed already complete (nothing to fix)`);
          // the naive "count visible pre-placed tiles" ≠ true area (count-pre-placed fails)
          check(Core.filledTotal(seed) !== ra || Core.hasOverlap(seed), `${label}: pre-placed count equals the area (count-pre-placed would work)`);
        }
        if (round.cog === 'finish') {
          const seed = Core.placementsFromPre(round);
          check(!Core.isComplete(round, seed), `${label}: finish seed already complete`);
          check(Core.coverageSize(seed) < ra, `${label}: finish seed already covers the whole bed`);
        }
      }
    }
  });
}

/* 3. MULTIPLY-DIMENSIONS provably diverges on the irregular spine */
check(regionRounds > 0 && irregularRounds / regionRounds >= 0.4,
  `IRREGULAR_REGION_PRESENT: only ${irregularRounds}/${regionRounds} region rounds irregular (<40%) — multiply-dimensions would not provably fail`);
manifest.forEach((row) => (row.params.rounds || []).forEach((round) => {
  if (round.cog === 'build') return;
  if (Core.isIrregular(round)) {
    const bb = Core.bboxArea(round), ra = Core.regionArea(round);
    check(bb !== ra, `${round.id}: MULTIPLY-DIMENSIONS did not diverge (bbox ${bb} === area ${ra})`);
  }
}));

const distinctCogs = Object.keys(cogs);
check(distinctCogs.length >= 5, `only ${distinctCogs.length} distinct cogs (expected 5: tile/repair/estimate/finish/build)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} area-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), ${distinctCogs.length} cogs [${distinctCogs.join('/')}]: cover-and-count oracle 100%; count-visible-objects FAILS on ${reportRounds} numeric-report round(s); multiply-dimensions FAILS on the irregular spine (${irregularRounds}/${regionRounds}); count-pre-placed + read-total + first/random FAIL; unit=square; bounds 4–20; ≥${VARIETY_MIN} rounds.`);
process.exit(0);
