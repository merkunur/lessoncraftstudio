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

// circle-thirds helpers (radii)
function isCentre(x, y) { return Math.abs(x - C.CX) < TOL && Math.abs(y - C.CY) < TOL; }
function rimPoint(l) { return isCentre(l.x1, l.y1) ? { x: l.x2, y: l.y2 } : { x: l.x1, y: l.y1 }; }
function radiusAngle(l) {
  const p = rimPoint(l);
  let deg = Math.atan2(-(p.y - C.CY), p.x - C.CX) * 180 / Math.PI;  // SVG y-down → negate
  return ((deg % 360) + 360) % 360;
}
function angDiff(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
function dist(p, q) { return Math.hypot(p.x - q.x, p.y - q.y); }

function verifyRound(label, shape, n, cut, rot) {
  const built = Core._lines(shape, n, cut, rot || 0);
  const correct = built.correct, distractors = built.distractors;

  // expected correct-cut count: circle halves=1/thirds=3/fourths=2; box halves=1/thirds=2/fourths-grid=2
  const expected = shape === 'circle' ? (n === 2 ? 1 : n === 3 ? 3 : 2) : (n === 2 ? 1 : 2);
  check(correct.length === expected, `${label}: expected ${expected} correct cut(s), got ${correct.length}`);

  if (shape === 'circle') {
    if (n === 3) {
      // 3 radii from centre, pairwise 120° apart → 3 EXACT equal 120° wedges
      correct.forEach((l, i) => check(throughCentre(l), `${label}: correct radius #${i} must originate at centre`));
      if (correct.length === 3) {
        const a = correct.map(radiusAngle);
        [[0, 1], [1, 2], [0, 2]].forEach(([i, j]) =>
          check(Math.abs(angDiff(a[i], a[j]) - 120) < 1e-6,
            `${label}: circle-thirds radii must be 120° apart (got ${angDiff(a[i], a[j]).toFixed(4)}°) — wedges not equal`));
      }
      // distractor radius is a genuine foil: between two spokes (0 < Δ < 120 from nearest correct → unequal wedges)
      distractors.forEach((l, i) => {
        const da = radiusAngle(l);
        const nearest = Math.min.apply(null, correct.map(c => angDiff(da, radiusAngle(c))));
        check(nearest > TOL && nearest < 120 - TOL, `${label}: distractor radius #${i} must break equal-thirds (nearest correct ${nearest.toFixed(2)}°)`);
      });
    } else {
      correct.forEach((l, i) => check(throughCentre(l), `${label}: correct circle cut #${i} must pass through centre (equal shares)`));
      if (n === 4) check(correct.length === 2 && isVertical(correct[0]) !== isVertical(correct[1]),
        `${label}: circle fourths need 2 PERPENDICULAR diameters (4 equal quarter-disks)`);
      distractors.forEach((l, i) => check(!throughCentre(l), `${label}: distractor circle chord #${i} must NOT pass through centre (genuine foil)`));
    }
  } else {
    const box = (shape === 'square')
      ? { left: C.SX, top: C.SX, right: C.SR, bottom: C.SR }
      : { left: C.RX, top: C.RY, right: C.RR, bottom: C.RB };
    const w = box.right - box.left, h = box.bottom - box.top;
    const midX = (box.left + box.right) / 2, midY = (box.top + box.bottom) / 2;
    if (n === 3) {
      // 2 parallel cuts at EXACT thirds → 3 equal strips
      const vert = correct.every(isVertical), horiz = correct.every(isHorizontal);
      check(vert || horiz, `${label}: thirds cuts must be parallel (all vertical OR all horizontal)`);
      if (vert) {
        const xs = correct.map(l => l.x1).sort((p, q) => p - q);
        check(xs.length === 2 && Math.abs(xs[0] - (box.left + w / 3)) < TOL && Math.abs(xs[1] - (box.left + 2 * w / 3)) < TOL,
          `${label}: vertical thirds must be at exact 1/3,2/3 (x=${(box.left + w / 3).toFixed(2)},${(box.left + 2 * w / 3).toFixed(2)}); got ${xs.map(x => x.toFixed(2))}`);
      } else if (horiz) {
        const ys = correct.map(l => l.y1).sort((p, q) => p - q);
        check(ys.length === 2 && Math.abs(ys[0] - (box.top + h / 3)) < TOL && Math.abs(ys[1] - (box.top + 2 * h / 3)) < TOL,
          `${label}: horizontal thirds must be at exact 1/3,2/3; got ${ys.map(y => y.toFixed(2))}`);
      }
      distractors.forEach((l, i) => {
        const off = isVertical(l)
          ? (Math.abs(l.x1 - (box.left + w / 3)) > TOL && Math.abs(l.x1 - (box.left + 2 * w / 3)) > TOL)
          : (Math.abs(l.y1 - (box.top + h / 3)) > TOL && Math.abs(l.y1 - (box.top + 2 * h / 3)) > TOL);
        check(off, `${label}: thirds distractor #${i} must be off the exact-third positions (genuine foil)`);
      });
    } else {
      correct.forEach((l, i) => {
        if (isVertical(l)) check(Math.abs(l.x1 - midX) < TOL, `${label}: correct vertical cut #${i} must bisect (x=${midX}); got x=${l.x1}`);
        else if (isHorizontal(l)) check(Math.abs(l.y1 - midY) < TOL, `${label}: correct horizontal cut #${i} must bisect (y=${midY}); got y=${l.y1}`);
        else failures.push(`${label}: correct cut #${i} is neither vertical nor horizontal`);
      });
      if (n === 4) check(correct.some(isVertical) && correct.some(isHorizontal), `${label}: grid fourths need one vertical + one horizontal centre cut (4 equal quadrants)`);
      distractors.forEach((l, i) => {
        const offCentre = isVertical(l) ? Math.abs(l.x1 - midX) > TOL : Math.abs(l.y1 - midY) > TOL;
        check(offCentre, `${label}: distractor #${i} must be off-centre (genuine foil)`);
      });
    }
  }

  // tap-target separation
  const all = correct.concat(distractors);
  for (let a = 0; a < all.length; a++) {
    for (let b = a + 1; b < all.length; b++) {
      const la = all[a], lb = all[b];
      if (shape === 'circle' && n === 3) {
        check(dist(rimPoint(la), rimPoint(lb)) >= SEP_MIN - TOL,
          `${label}: radius rim points too close (<${SEP_MIN}u) — tap targets converge`);
      } else {
        let gap = null;
        if (isVertical(la) && isVertical(lb)) gap = Math.abs(la.x1 - lb.x1);
        else if (isHorizontal(la) && isHorizontal(lb)) gap = Math.abs(la.y1 - lb.y1);
        if (gap !== null) check(gap >= SEP_MIN - TOL,
          `${label}: candidate lines ${gap.toFixed(2)} units apart (<${SEP_MIN}) — tap targets too close at 280px`);
      }
    }
  }
}

let roundCount = 0;
for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  rounds.forEach((r, i) => {
    roundCount++;
    verifyRound(`${row.id}#${i}[${r.shape}/n${r.n}/${r.cut}${r.rot ? '/rot' + r.rot : ''}]`, r.shape, r.n, r.cut, r.rot);
  });
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} proportional-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${manifest.length} coordinate(s): every correct partition is exact (equal shares), every distractor is a genuine off-centre foil, all tap targets ≥${SEP_MIN}u (~36px@280).`);
process.exit(0);
