/**
 * data/ptx/xm.js — DRAWN Christmas pieces for the K-429 Level Set copies (ptl), page px, the library's line style: a tiered
 * fir whose round baubles are PLACED INSIDE its crown by measurement (every bauble a whole closed circle, the child traces
 * it "all the way round"; none touches the outline or another), a star on top, and the room furniture the library has no
 * drawing of. No figures, no Santa, nothing religious (ptl-levels §K-429). All entries are traced motifs.
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const { rng } = require('./lay.js');
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
const rect = (x, y, w, h) => L([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], true);
const arc = (cx, cy, rx, ry, a0, a1) => M.arc(cx, cy, rx, ry, a0, a1, 3);
const ell = (cx, cy, rx, ry) => L(arc(cx, cy, rx, ry, 0, 2 * Math.PI), true);
const smooth = (c, closed = false) => M.catmull(c, closed, 3);
/** the fir's outline polygon: T tiers from (cx, top) down to y = base, half-width hw at the bottom */
function firPoly(cx, top, base, hw, T = 3) {
  const right = [[cx, top]];
  for (let t = 1; t <= T; t++) { const y = top + (base - top) * t / T, w = hw * (0.42 + 0.58 * t / T); right.push([cx + w, y]); if (t < T) right.push([cx + w * 0.52, y]); }
  const left = right.slice(1).reverse().map(([x, y]) => [2 * cx - x, y]);
  return [...right, ...left, [cx, top]];
}
const inPoly = (P, x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
/** a decorated tree: outline, trunk, pot; n baubles of radius r inside the crown (≥ gap apart, ≥ gap from the outline);
 *  `stars` small stars among them; a star on top. pot: 'pot' | 'bucket' | 'stool' | 'none' */
function tree({ cx, top, base, floorY, hw, tiers = 2, n, r, gap = 14, stars = 0, starR, seed = 1, pot = 'pot', topStar = true }) {
  // floorY: the tree STANDS on the floor — its crown base follows (trunk 10 %, pot 20 % of the crown height)
  if (floorY != null) base = top + (floorY - top) / 1.3;
  const P = firPoly(cx, top, base, hw, tiers), out = [L(P, true)];
  const tw = Math.max(26, hw * 0.2), th = Math.max(28, (base - top) * 0.1);
  out.push(L([[cx - tw / 2, base], [cx - tw / 2, base + th], [cx + tw / 2, base + th], [cx + tw / 2, base]]));
  const pb = base + th, pw = Math.max(90, hw * 0.75), ph = floorY != null ? floorY - pb : Math.max(60, (base - top) * 0.2);
  if (pot === 'pot') out.push(L([[cx - pw / 2, pb], [cx + pw / 2, pb], [cx + pw * 0.38, pb + ph], [cx - pw * 0.38, pb + ph], [cx - pw / 2, pb]], true));
  if (pot === 'bucket') out.push(L([[cx - pw * 0.42, pb], [cx + pw * 0.42, pb], [cx + pw * 0.36, pb + ph], [cx - pw * 0.36, pb + ph], [cx - pw * 0.42, pb]], true), L([[cx - pw * 0.42, pb + ph * 0.35], [cx + pw * 0.42, pb + ph * 0.35]]), L([[cx - pw * 0.42, pb + ph * 0.7], [cx + pw * 0.42, pb + ph * 0.7]]));
  if (pot === 'stool') out.push(rect(cx - pw / 2, pb, pw, 16), L([[cx - pw * 0.36, pb + 16], [cx - pw * 0.42, pb + ph]]), L([[cx + pw * 0.36, pb + 16], [cx + pw * 0.42, pb + ph]]));
  if (topStar) out.push({ m: 'star', a: [cx, top - Math.max(18, r * 0.9) + 4, Math.max(20, r * 1.05)] });
  // baubles + stars inside the crown: a circle is accepted only when 12 points round it, gap outside its rim, are all in
  const R = rng(seed), placed = [], all = n + stars, sr = starR || r;
  const ok = (x, y, rr) => { for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; if (!inPoly(P, x + (rr + gap * 0.7) * Math.cos(a), y + (rr + gap * 0.7) * Math.sin(a))) return false; } return placed.every((q) => Math.hypot(q.x - x, q.y - y) >= q.r + rr + gap); };
  for (let attempt = 0; attempt < 300 && placed.length < all; attempt++) {
    placed.length = 0; let tries = 0;
    while (placed.length < all && tries < 6000) { tries++; const rr = placed.length < n ? r : sr; const x = cx - hw + R() * 2 * hw, y = top + R() * (base - top); if (ok(x, y, rr)) placed.push({ x, y, r: rr }); }
  }
  if (placed.length < all) throw new Error(`K-429 tree: placed ${placed.length} of ${all} baubles (r ${r}) — enlarge the tree or shrink the baubles`);
  placed.sort((a, b) => a.y - b.y);
  placed.forEach((q, i) => out.push(i < n ? { m: 'circle', a: [q.x, q.y, q.r] } : { m: 'star', a: [q.x, q.y, q.r] }));
  return out;
}
/** room pieces */
const fireplace = (x, by, w, h) => [L([[x, by], [x, by - h], [x + w, by - h], [x + w, by]]), rect(x - 18, by - h - 22, w + 36, 22), L([[x + w * 0.2, by], [x + w * 0.2, by - h * 0.62], ...arc(x + w / 2, by - h * 0.62, w * 0.3, w * 0.22, Math.PI, 2 * Math.PI).slice(1), [x + w * 0.8, by]]),
  L(smooth([[x + w * 0.34, by], [x + w * 0.38, by - h * 0.22], [x + w * 0.46, by - h * 0.14], [x + w * 0.5, by - h * 0.38], [x + w * 0.56, by - h * 0.16], [x + w * 0.62, by - h * 0.26], [x + w * 0.66, by]]))];
const door = (x, by, w, h) => [L([[x, by], [x, by - h], [x + w, by - h], [x + w, by]]), ell(x + w / 2, by - h * 0.74, w * 0.2, w * 0.2), ell(x + w * 0.82, by - h * 0.45, 7, 7)];
const coatRack = (x0, x1, y, n) => { const out = [rect(x0, y, x1 - x0, 14)]; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + 0.5) / n; out.push(L([[x, y + 14], [x, y + 32], [x + 12, y + 38]])); } return out; };
const rail = (x0, x1, y, h, posts) => { const out = [rect(x0, y - h, x1 - x0, 14)]; for (let i = 0; i < posts; i++) { const x = x0 + 10 + i * (x1 - x0 - 20) / (posts - 1); out.push(L([[x - 5, y], [x - 5, y - h + 14], [x + 5, y - h + 14], [x + 5, y]])); } return out; };
const bench = (x, by, w) => [rect(x, by - 70, w, 16), L([[x + 18, by - 54], [x + 18, by]]), L([[x + w - 18, by - 54], [x + w - 18, by]])];
const counter = (x, by, w, h) => [rect(x - 10, by - h, w + 20, 18), L([[x, by - h + 18], [x, by], [x + w, by], [x + w, by - h + 18]])];
const cooker = (x, by, w, h) => [rect(x, by - h, w, h), ell(x + w * 0.3, by - h + 26, 12, 12), ell(x + w * 0.7, by - h + 26, 12, 12), rect(x + w * 0.15, by - h * 0.62, w * 0.7, h * 0.5)];
const bedEnd = (x, by, w, h) => [L([[x, by], [x, by - h]]), L([[x + w, by], [x + w, by - h * 0.62]]), L([[x, by - h * 0.62], [x + w, by - h * 0.62]]), L([[x, by - h * 0.28], [x + w, by - h * 0.28]]), ell(x, by - h - 10, 12, 12)];
const chair = (x, by, s, dir = 1) => [L([[x, by], [x, by - s * 0.5], [x + dir * s * 0.62, by - s * 0.5], [x + dir * s * 0.62, by]]), L([[x, by - s * 0.5], [x, by - s]])];
const musicStand = (cx, by, h) => [L([[cx, by], [cx, by - h * 0.62]]), L([[cx - 30, by], [cx, by - 40], [cx + 30, by]]), L([[cx - 46, by - h * 0.62], [cx + 46, by - h * 0.62], [cx + 38, by - h], [cx - 38, by - h], [cx - 46, by - h * 0.62]], true)];
const garland = (x0, x1, y, sag) => [L(smooth([[x0, y], [(x0 + x1) / 2, y + sag], [x1, y]]))];
const pigeonHoles = (x, y, cols, rows, s) => { const out = [rect(x, y, cols * s, rows * s)]; for (let i = 1; i < cols; i++) out.push(L([[x + i * s, y], [x + i * s, y + rows * s]])); for (let j = 1; j < rows; j++) out.push(L([[x, y + j * s], [x + cols * s, y + j * s]])); return out; };
const trainTrack = (cx, cy, rx, ry) => [ell(cx, cy, rx, ry), ell(cx, cy, rx - 16, ry - 12)];
const floorLamp = (x, by, h) => [L([[x, by], [x, by - h * 0.7]]), L([[x - 26, by], [x + 26, by]]), L([[x - 30, by - h * 0.7], [x + 30, by - h * 0.7], [x + 20, by - h], [x - 20, by - h], [x - 30, by - h * 0.7]], true)];
const logWall = (x0, x1, ys) => ys.map((y) => L([[x0, y], [x1, y]]));
module.exports = { firPoly, tree, fireplace, door, coatRack, rail, bench, counter, cooker, bedEnd, chair, musicStand, garland, pigeonHoles, trainTrack, floorLamp, logWall, rect, ell, L };
