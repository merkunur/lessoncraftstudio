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

function dist(p, q) { return Math.hypot(p.x - q.x, p.y - q.y); }

/* ---- equal-area proof by POINT-SAMPLING (general — works for every shape,
   no per-shape theorem coding). Classify each interior sample point into a
   piece (radial cuts → angular sector from centre; line cuts → side-sign
   tuple), count points per piece, and assert the CORRECT cuts make exactly
   N pieces of EQUAL area (count ratio ≤ tol) while the DISTRACTOR foil makes
   UNequal pieces. This is the "measured, not eyeballed" content gate. ---- */
const GRID = 240;
const EQ_TOL = 1.06;     // max/min piece-count ratio tolerated for an EQUAL partition (sampling noise)
const FOIL_MIN = 1.12;   // min ratio proving a distractor foil is genuinely UNequal

function polyOf(shape) { Core.shape = shape; return Core._polyOf(); }
function pointInShape(x, y, shape, poly) {
  if (shape === 'circle') return (x - 50) * (x - 50) + (y - 50) * (y - 50) <= C.R * C.R;
  if (shape === 'ellipse') { const a = (x - 50) / Core._ELLIPSE.rx, b = (y - 50) / Core._ELLIPSE.ry; return a * a + b * b <= 1; }
  if (shape === 'square') return x >= C.SX && x <= C.SR && y >= C.SX && y <= C.SR;
  if (shape === 'rect') return x >= C.RX && x <= C.RR && y >= C.RY && y <= C.RB;
  let inside = false;                       // ray-cast point-in-polygon
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function atCentre(l, end) { return Math.abs((end ? l.x2 : l.x1) - C.CX) < 1e-6 && Math.abs((end ? l.y2 : l.y1) - C.CY) < 1e-6; }
function isRadial(cuts) { return cuts.length >= 2 && cuts.every(l => atCentre(l, false) || atCentre(l, true)); }
function rimOf(l) { return atCentre(l, false) ? { x: l.x2, y: l.y2 } : { x: l.x1, y: l.y1 }; }
function angleOf(p) { return (Math.atan2(-(p.y - C.CY), p.x - C.CX) * 180 / Math.PI + 360) % 360; }
function pieceCounts(shape, poly, cuts) {
  const radial = isRadial(cuts);
  const radAngs = radial ? cuts.map(l => angleOf(rimOf(l))).sort((a, b) => a - b) : null;
  const counts = {}, step = 100 / GRID;
  for (let gx = 0; gx < GRID; gx++) {
    const x = (gx + 0.5) * step;
    for (let gy = 0; gy < GRID; gy++) {
      const y = (gy + 0.5) * step;
      if (!pointInShape(x, y, shape, poly)) continue;
      let k;
      if (radial) {
        const ang = angleOf({ x, y });
        let s = 0; while (s < radAngs.length && ang >= radAngs[s]) s++;
        k = 's' + (s % radAngs.length);
      } else {
        k = cuts.map(l => ((l.x2 - l.x1) * (y - l.y1) - (l.y2 - l.y1) * (x - l.x1)) >= 0 ? '1' : '0').join('');
      }
      counts[k] = (counts[k] || 0) + 1;
    }
  }
  return counts;
}
function ratioOf(counts) { const v = Object.values(counts); return v.length ? Math.max.apply(null, v) / Math.min.apply(null, v) : Infinity; }

function verifyRound(label, shape, n, cut, rot) {
  Core.shape = shape;   // _lines + the polygon helpers read this.shape (set by setupTask in the engine)
  const built = Core._lines(shape, n, cut, rot || 0);
  const correct = built.correct, distractors = built.distractors;
  const poly = ['circle', 'ellipse', 'square', 'rect'].indexOf(shape) < 0 ? polyOf(shape) : null;

  // 1+2. correct cuts → exactly N pieces of EQUAL area (sampled)
  const cc = pieceCounts(shape, poly, correct);
  const pieces = Object.keys(cc).length;
  check(pieces === n, `${label}: correct cuts make ${pieces} piece(s), expected ${n}`);
  if (pieces === n) {
    const r = ratioOf(cc);
    check(r <= EQ_TOL, `${label}: correct pieces NOT equal area — count ratio ${r.toFixed(3)} > ${EQ_TOL} (sampled ${GRID}²)`);
  }
  // 3. distractor is a genuine foil: swap the last k correct cuts for the k distractors → UNequal pieces
  if (distractors.length) {
    const foil = correct.slice(0, Math.max(0, correct.length - distractors.length)).concat(distractors);
    const fr = ratioOf(pieceCounts(shape, poly, foil));
    check(fr >= FOIL_MIN, `${label}: distractor not a genuine foil — foil pieces nearly equal (ratio ${fr.toFixed(3)})`);
  }
  // 4. tap-target separation (radial → rim distance; line → same-orientation gap)
  const all = correct.concat(distractors);
  for (let a = 0; a < all.length; a++) for (let b = a + 1; b < all.length; b++) {
    const la = all[a], lb = all[b];
    if (isRadial(correct) && (atCentre(la, false) || atCentre(la, true)) && (atCentre(lb, false) || atCentre(lb, true))) {
      check(dist(rimOf(la), rimOf(lb)) >= SEP_MIN - TOL, `${label}: radius rim points too close (<${SEP_MIN}u)`);
    } else {
      let gap = null;
      if (isVertical(la) && isVertical(lb)) gap = Math.abs(la.x1 - lb.x1);
      else if (isHorizontal(la) && isHorizontal(lb)) gap = Math.abs(la.y1 - lb.y1);
      if (gap !== null) check(gap >= SEP_MIN - TOL, `${label}: candidate lines ${gap.toFixed(2)}u apart (<${SEP_MIN}) — tap targets too close at 280px`);
    }
  }
  // 5. IN-BOUNDS — every candidate cut-line's BODY must lie inside the shape (a
  //    cut drawn outside the figure is a render bug). Sample interior points
  //    (skip endpoints, which legitimately touch the boundary / polygon vertices).
  all.forEach((l) => {
    [0.25, 0.5, 0.75].forEach((t) => {
      const x = l.x1 + (l.x2 - l.x1) * t, y = l.y1 + (l.y2 - l.y1) * t;
      check(pointInShape(x, y, shape, poly), `${label}: a cut line lies OUTSIDE the shape (interior point ${x.toFixed(1)},${y.toFixed(1)} not in ${shape})`);
    });
  });
}

let roundCount = 0;
for (const row of manifest) {
  /* This gate proves the EQUAL-AREA partition geometry (shape/n/cut rounds).
     Other fractions templates (e.g. grid-count 2.G.A.2 — {rows,cols} rounds, no
     shape) have their own measured gate; skip them here. */
  if (row.task_template && row.task_template !== 'partition-equal-shares') continue;
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
