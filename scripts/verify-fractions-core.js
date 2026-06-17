#!/usr/bin/env node
/* =====================================================================
   verify-fractions-core.js — build-time proportional-correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/fractions-core.js (under a window shim) and
   proves, for every round in the shipped manifest, that:

     1. each CORRECT cut set partitions the shape into N EQUAL shares
        (measured: rect/square strip widths equal within 1e-9; circle
        cuts pass through the exact centre + fourths are perpendicular);
     2. each DISTRACTOR line does NOT bisect (genuine foil — off-centre);
     3. tap-target separation: every pair of same-orientation candidate
        lines is ≥14 viewBox units apart (≥~36px at a 280px viewport).

   This is the "measured, not eyeballed" content-layer check (§ plan
   proportional-correctness). Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOL = 1e-9;
const SEP_MIN = 14;          // viewBox units → ≥36px at 280px viewport
const REPO = path.join(__dirname, '..');

/* ---- load the real core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'fractions-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.FractionsCore;
if (!Core) { console.error('FAIL: fractions-core.js did not define window.FractionsCore'); process.exit(1); }

/* ---- load the shipped manifest rounds ---- */
const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'fractions-activities.json'), 'utf8'));

const C = Core._C;
const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }

/* geometry predicates */
function isVertical(l) { return Math.abs(l.x1 - l.x2) < TOL; }
function isHorizontal(l) { return Math.abs(l.y1 - l.y2) < TOL; }
function throughCentre(l) {
  // point (CX,CY) on the segment's infinite line: cross product ~ 0
  const cross = (l.x2 - l.x1) * (C.CY - l.y1) - (l.y2 - l.y1) * (C.CX - l.x1);
  return Math.abs(cross) < 1e-6;
}

function verifyRound(label, shape, n, cut) {
  const built = Core._lines(shape, n, cut);
  const correct = built.correct, distractors = built.distractors;

  // count sanity
  check(correct.length === (n === 4 ? 2 : 1),
    `${label}: expected ${n === 4 ? 2 : 1} correct cut(s), got ${correct.length}`);

  if (shape === 'circle') {
    correct.forEach((l, i) => check(throughCentre(l), `${label}: correct circle cut #${i} must pass through centre (equal shares)`));
    if (n === 4) {
      check(correct.length === 2 && isVertical(correct[0]) !== isVertical(correct[1]),
        `${label}: circle fourths need 2 PERPENDICULAR diameters (4 equal quarter-disks)`);
    }
    distractors.forEach((l, i) => check(!throughCentre(l), `${label}: distractor circle chord #${i} must NOT pass through centre (genuine foil)`));
  } else {
    const box = (shape === 'square')
      ? { left: C.SX, top: C.SX, right: C.SR, bottom: C.SR }
      : { left: C.RX, top: C.RY, right: C.RR, bottom: C.RB };
    const midX = (box.left + box.right) / 2, midY = (box.top + box.bottom) / 2;
    correct.forEach((l, i) => {
      if (isVertical(l)) {
        // equal left/right widths ⇔ x at exact midpoint
        check(Math.abs(l.x1 - midX) < TOL, `${label}: correct vertical cut #${i} must bisect (x=${midX}); got x=${l.x1}`);
        check(Math.abs((l.x1 - box.left) - (box.right - l.x1)) < TOL, `${label}: vertical cut #${i} left/right widths unequal`);
      } else if (isHorizontal(l)) {
        check(Math.abs(l.y1 - midY) < TOL, `${label}: correct horizontal cut #${i} must bisect (y=${midY}); got y=${l.y1}`);
        check(Math.abs((l.y1 - box.top) - (box.bottom - l.y1)) < TOL, `${label}: horizontal cut #${i} top/bottom heights unequal`);
      } else {
        failures.push(`${label}: correct cut #${i} is neither vertical nor horizontal`);
      }
    });
    if (n === 4) {
      check(correct.some(isVertical) && correct.some(isHorizontal),
        `${label}: grid fourths need one vertical + one horizontal centre cut (4 equal quadrants)`);
    }
    distractors.forEach((l, i) => {
      const offCentre = isVertical(l) ? Math.abs(l.x1 - midX) > TOL : Math.abs(l.y1 - midY) > TOL;
      check(offCentre, `${label}: distractor #${i} must be off-centre (genuine foil)`);
    });
  }

  // tap-target separation: same-orientation candidate pairs ≥ SEP_MIN apart
  const all = correct.concat(distractors);
  for (let a = 0; a < all.length; a++) {
    for (let b = a + 1; b < all.length; b++) {
      const la = all[a], lb = all[b];
      let gap = null;
      if (isVertical(la) && isVertical(lb)) gap = Math.abs(la.x1 - lb.x1);
      else if (isHorizontal(la) && isHorizontal(lb)) gap = Math.abs(la.y1 - lb.y1);
      if (gap !== null) check(gap >= SEP_MIN - TOL,
        `${label}: candidate lines ${gap.toFixed(2)} units apart (<${SEP_MIN}) — tap targets too close at 280px`);
    }
  }
}

let roundCount = 0;
for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  rounds.forEach((r, i) => {
    roundCount++;
    verifyRound(`${row.id}#${i}[${r.shape}/n${r.n}/${r.cut}]`, r.shape, r.n, r.cut);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} proportional-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): every correct partition is exact (equal shares), every distractor is a genuine off-centre foil, all tap targets ≥${SEP_MIN}u (~36px@280).`);
process.exit(0);
