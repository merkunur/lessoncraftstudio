/**
 * data/ptx/dc.js — CLOSED colourable drawn pieces for the K-425 "trace and color" Level Set copies (ptl): every traced
 * outline is closed (ptl-levels §K-425: the child colours what was traced), page px, the library's line style, no letters
 * or digits (a clock has hands, never numbers). Every function returns traced motif entries.
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
const arc = (cx, cy, rx, ry, a0, a1) => M.arc(cx, cy, rx, ry, a0, a1, 3);
const smooth = (c, closed = false) => M.catmull(c, closed, 3);
const rect = (x, y, w, h) => L([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], true);
const ell = (cx, cy, rx, ry) => L(arc(cx, cy, rx, ry, 0, 2 * Math.PI), true);
/** a bathtub: a rounded tub body under a rim, two little feet, a tap on the right end */
function bathtub(x, y, w, h) {
  const body = smooth([[x + 6, y + 18], [x + 14, y + h * 0.78], [x + w * 0.2, y + h], [x + w * 0.8, y + h], [x + w - 14, y + h * 0.78], [x + w - 6, y + 18]]);
  return [L([...body, [x + 6, y + 18]], true), { m: 'roundRect', a: [x - 8, y, w + 16, 20, 10] }, ell(x + w * 0.2, y + h + 14, 18, 12), ell(x + w * 0.8, y + h + 14, 18, 12),
    L([[x + w - 30, y], [x + w - 30, y - 60], [x + w + 14, y - 60], [x + w + 14, y - 40], [x + w - 12, y - 40], [x + w - 12, y], [x + w - 30, y]], true)];
}
/** a window: four closed panes (the bars are the gaps between them; a frame line too would only add length) */
function windowPanes(x, y, w, h) {
  const g = 12, pw = (w - 3 * g) / 2, ph = (h - 3 * g) / 2, out = [];
  for (const i of [0, 1]) for (const j of [0, 1]) out.push(rect(x + g + i * (pw + g), y + g + j * (ph + g), pw, ph));
  return out;
}
/** a long ledge / table top / worktop / shelf plank */
const plank = (x, y, w, h = 18) => [rect(x, y, w, h)];
/** a table: a top and two legs */
const table = (x, y, w, legH) => [rect(x, y, w, 18), rect(x + 20, y + 18, 18, legH), rect(x + w - 38, y + 18, 18, legH)];
/** a present: box, lid, ribbon band, two bow loops */
function present(cx, by, w) {
  const h = w * 0.72, x = cx - w / 2;
  return [rect(x, by - h, w, h), rect(x - 8, by - h - 22, w + 16, 22), rect(cx - 10, by - h - 22, 20, h + 22), ell(cx - 22, by - h - 36, 20, 13), ell(cx + 22, by - h - 36, 20, 13)];
}
/** a balloon (oval + knot) with its string */
const balloon = (cx, cy, r, len) => [ell(cx, cy, r, r * 1.22), L([[cx - 9, cy + r * 1.22 + 12], [cx, cy + r * 1.22], [cx + 9, cy + r * 1.22 + 12], [cx - 9, cy + r * 1.22 + 12]], true),
  L(smooth([[cx, cy + r * 1.22 + 12], [cx + 10, cy + r * 1.22 + 12 + len * 0.4], [cx - 8, cy + r * 1.22 + 12 + len * 0.75], [cx, cy + r * 1.22 + 12 + len]]))];
/** a round rug with a border ring */
const rug = (cx, cy, rx, ry) => [ell(cx, cy, rx, ry), ell(cx, cy, rx * 0.68, ry * 0.68)];
/** a classroom board with a chalk ledge (empty) */
const board = (x, y, w, h) => [rect(x, y, w, h), rect(x + w * 0.2, y + h, w * 0.6, 14)];
/** a bookshelf: frame and planks */
function bookshelf(x, by, w, h, shelves = 2) {
  const out = [rect(x, by - h, w, h)], g = (h - 16) / (shelves + 1);
  for (let k = 1; k <= shelves; k++) out.push(rect(x + 8, by - h + k * g, w - 16, 12));
  return out;
}
/** a wall clock: ring, face, two hands (no numbers) */
const wallClock = (cx, cy, r) => [ell(cx, cy, r, r), ell(cx, cy, r * 0.8, r * 0.8), L([[cx, cy - r * 0.12], [cx, cy - r * 0.58]]), L([[cx + r * 0.12, cy], [cx + r * 0.58, cy]])];   // two open hands from a small centre gap: thin closed hands dashed into a knot
/** a shop counter: top + front with two panels */
const counter = (x, y, w, h) => [rect(x - 10, y, w + 20, 20), rect(x, y + 20, w, h - 20), rect(x + 18, y + 38, w / 2 - 27, h - 56), rect(x + w / 2 + 9, y + 38, w / 2 - 27, h - 56)];
/** a scalloped striped awning (closed stripes) */
function awning(x0, x1, y, h, n = 6) {
  const w = (x1 - x0) / n, out = [];
  for (let i = 0; i < n; i++) { const a = x0 + i * w, b = a + w; out.push(L([[a, y], [b, y], [b, y + h], ...arc((a + b) / 2, y + h, w / 2, 16, 0, Math.PI).slice(1), [a, y]], true)); }
  return out;
}
/** a cake stand: a plate on a foot */
const cakeStand = (cx, by, w) => [ell(cx, by - 46, w / 2, 10), L([[cx - 12, by - 38], [cx - 18, by], [cx + 18, by], [cx + 12, by - 38], [cx - 12, by - 38]], true)];
/** a rabbit hutch: box, roof, a mesh window (four closed cells), a door, legs */
function hutch(x, by, w, h) {
  const top = by - h, bt = by - 30, out = [rect(x, top + h * 0.22, w, bt - top - h * 0.22), L([[x - 14, top + h * 0.22], [x + w / 2, top], [x + w + 14, top + h * 0.22], [x - 14, top + h * 0.22]], true), rect(x + 8, bt, 18, 30), rect(x + w - 26, bt, 18, 30)];
  const mx = x + w * 0.12, my = top + h * 0.34, mw = w * 0.46, mh = (bt - my) - 22;
  out.push(rect(mx, my, mw, mh), L([[mx + mw / 2, my], [mx + mw / 2, my + mh]]), L([[mx, my + mh / 2], [mx + mw, my + mh / 2]]), rect(x + w * 0.66, my, w * 0.24, mh));
  return out;
}
/** a fishbowl with its water line and a fish */
function fishbowl(cx, by, r) {
  const cy = by - r, rim = arc(cx, cy, r, r, -0.32 * Math.PI, 1.32 * Math.PI), out = [L([...rim, rim[0]], true)];
  out.push(L([[cx - r * 0.93, cy - r * 0.34], [cx + r * 0.93, cy - r * 0.34]]));
  const fx = cx, fy = cy + r * 0.18; out.push(ell(fx, fy, r * 0.3, r * 0.17), L([[fx + r * 0.28, fy], [fx + r * 0.48, fy - r * 0.15], [fx + r * 0.48, fy + r * 0.15], [fx + r * 0.28, fy]], true));
  return out;
}
/** a pet's food bowl */
const foodBowl = (cx, by, w) => [L([[cx - w / 2, by - w * 0.32], [cx + w / 2, by - w * 0.32], ...arc(cx, by - w * 0.32, w / 2, w * 0.32, 0, Math.PI).slice(1)], true)];
/** a soil row: a closed hump */
const soil = (x0, x1, y, h) => [L([[x0, y], ...arc((x0 + x1) / 2, y, (x1 - x0) / 2, h, Math.PI, 2 * Math.PI).slice(1)], true)];
/** a seaweed frond (a closed wavy blade) */
function seaweed(x, by, h, w = 26, dir = 1) {
  const left = [], right = []; for (let k = 0; k <= 8; k++) { const t = k / 8, y = by - t * h, sx = dir * Math.sin(t * Math.PI * 2) * w * 0.6, half = w * 0.5 * (1 - t * 0.7); left.push([x + sx - half, y]); right.push([x + sx + half, y]); }
  return [L(smooth([...left, ...right.reverse()], true), true)];
}
/** a flat-top acacia tree (closed crown + trunk) */
function acacia(cx, by, w, h) {
  const ct = by - h, cb = ct + h * 0.26;
  return [L(smooth([[cx - w / 2, cb], [cx - w * 0.42, ct + h * 0.08], [cx - w * 0.2, ct], [cx + w * 0.2, ct], [cx + w * 0.42, ct + h * 0.08], [cx + w / 2, cb], [cx, cb + 6]], true), true),
    L([[cx - 10, by], [cx - 8, cb + 14], [cx - 40, cb + 4], [cx - 34, cb + 1], [cx, cb + 8], [cx + 34, cb + 1], [cx + 40, cb + 4], [cx + 8, cb + 14], [cx + 10, by], [cx - 10, by]], true)];
}
/** a shop door with a round window and a knob */
const shopDoor = (x, by, w, h) => [rect(x, by - h, w, h), ell(x + w / 2, by - h * 0.72, w * 0.26, w * 0.26), ell(x + w * 0.8, by - h * 0.42, 6, 6)];
/** a window with a curtain each side */
function curtainWindow(x, y, w, h) {
  return [...windowPanes(x, y, w, h), L(smooth([[x - 26, y - 10], [x + w * 0.22, y - 10], [x + w * 0.1, y + h * 0.5], [x + w * 0.18, y + h + 10], [x - 26, y + h + 10]], true), true),
    L(smooth([[x + w + 26, y - 10], [x + w * 0.78, y - 10], [x + w * 0.9, y + h * 0.5], [x + w * 0.82, y + h + 10], [x + w + 26, y + h + 10]], true), true)];
}
/** a lily pad with its notch */
const lilyPad = (cx, cy, r) => [L([[cx, cy], ...arc(cx, cy, r, r * 0.45, 0.15 * Math.PI, 1.9 * Math.PI), [cx, cy]], true)];
/** a reed: a closed narrow blade with a seed head */
const reed = (x, by, h) => [L([[x - 5, by], [x - 3, by - h * 0.7], [x + 3, by - h * 0.7], [x + 5, by], [x - 5, by]], true), ell(x, by - h * 0.82, 9, h * 0.13)];
/** a stepping stone */
const stepStone = (cx, cy, w) => [ell(cx, cy, w / 2, w * 0.2)];
module.exports = { L, rect, ell, bathtub, windowPanes, plank, table, present, balloon, rug, board, bookshelf, wallClock, counter, awning, cakeStand, hutch, fishbowl, foodBowl, soil, seaweed, acacia, shopDoor, curtainWindow, lilyPad, reed, stepStone };
