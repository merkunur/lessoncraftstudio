/**
 * data/ptx/dr.js — DRAWN scene structures for the composed Level Set copies (ptl), page px on the 675 × 716 body, in the
 * library's line style (one even outline, round joins, no hatching): the buildings, play equipment and landscape pieces the
 * library has no drawing of. Every function returns TRACED motif entries ({ m: 'line', a: [pts, closed] }).
 * Nothing here is letter- or digit-shaped (ptl-levels §0: a clock has hands, never numbers).
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
const rect = (x, y, w, h) => L([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], true);
const arc = (cx, cy, rx, ry, a0, a1) => M.arc(cx, cy, rx, ry, a0, a1, 3);
const smooth = (c, closed = false) => M.catmull(c, closed, 3);
/** a hen house: box, pointed roof, round-topped door, a ramp to the ground */
function henHouse(x, by, w, h) {
  const top = by - h * 0.62, rt = by - h, dw = w * 0.3, dx = x + w * 0.5 - dw / 2, dt = by - h * 0.34;
  return [L([[x, by], [x, top], [x + w / 2, rt], [x + w, top], [x + w, by]]), L([[x - w * 0.08, top + 8], [x + w / 2, rt - 10], [x + w * 1.08, top + 8]]),
    L([[dx, by - 30], [dx, dt], ...arc(dx + dw / 2, dt, dw / 2, dw / 2, Math.PI, 2 * Math.PI).slice(1), [dx + dw, by - 30]]), L([[dx, by - 30], [dx + dw, by - 30]]),
    L([[dx + dw * 0.1, by - 30], [x + w + w * 0.35, by]])];
}
/** a barn: walls, a gambrel roof, a big door with a cross brace and a hay loft window */
function barn(x, by, w, h) {
  const eave = by - h * 0.55, mid = by - h * 0.82, top = by - h, dw = w * 0.42, dx = x + w / 2 - dw / 2, dt = by - h * 0.4;
  return [L([[x, by], [x, eave], [x + w * 0.16, mid], [x + w / 2, top], [x + w * 0.84, mid], [x + w, eave], [x + w, by], [x, by]], true),
    rect(dx, dt, dw, by - dt), L([[dx, dt], [dx + dw, by]]), L([[dx + dw, dt], [dx, by]]), rect(x + w / 2 - w * 0.09, mid - 2, w * 0.18, w * 0.15)];
}
/** a tent: one triangle, a door line, the pole tip */
function tent(cx, by, w, h) {
  return [L([[cx - w / 2, by], [cx, by - h], [cx + w / 2, by], [cx - w / 2, by]], true), L([[cx, by - h], [cx - w * 0.12, by]]), L([[cx, by - h], [cx + w * 0.1, by]]), L([[cx, by - h], [cx, by - h - 22]])];
}
/** a slide: a ladder (two rails, rungs) and a straight chute down to the right */
function slide(x, by, h, run) {
  const top = by - h, out = [L([[x, by], [x, top]]), L([[x + 36, by], [x + 36, top]])];
  for (let k = 1; k <= 4; k++) out.push(L([[x, by - k * h / 5], [x + 36, by - k * h / 5]]));
  out.push(L([[x + 36, top], [x + 36 + run, by - 14], [x + 36 + run + 28, by - 14]]), L([[x + 36, top + 22], [x + 36 + run - 6, by]]), L([[x - 6, top], [x + 42, top]]));
  return out;
}
/** a swing: an A-frame each side, a top bar, two seats on their ropes */
function swing(cx, by, w, h) {
  const x0 = cx - w / 2, x1 = cx + w / 2, top = by - h, out = [];
  for (const x of [x0, x1]) out.push(L([[x - 28, by], [x, top], [x + 28, by]]));
  out.push(L([[x0 - 8, top], [x1 + 8, top]]));
  for (const u of [0.32, 0.68]) { const sx = x0 + (x1 - x0) * u, sy = by - h * 0.28; out.push(L([[sx - 20, top], [sx - 20, sy]]), L([[sx + 20, top], [sx + 20, sy]]), rect(sx - 28, sy, 56, 12)); }
  return out;
}
/** an igloo: a dome, an arched door, two block rows */
function igloo(cx, by, r) {
  const dw = r * 0.36;
  return [L([[cx - r, by], ...arc(cx, by, r, r * 0.92, Math.PI, 2 * Math.PI).slice(1)]), L([[cx - dw, by], ...arc(cx, by - dw * 0.2, dw, dw * 1.1, Math.PI, 2 * Math.PI).slice(1), [cx + dw, by]]),
    L(arc(cx, by, r * 0.94, r * 0.5, 1.12 * Math.PI, 1.38 * Math.PI)), L(arc(cx, by, r * 0.94, r * 0.5, 1.62 * Math.PI, 1.88 * Math.PI)), L([[cx - r * 1.04, by], [cx + r * 1.04, by]])];
}
/** a wooden pier: the deck and its posts in the water */
function pier(x0, x1, y, posts = 4, depth = 60) {
  const out = [L([[x0, y], [x1, y]]), L([[x0, y + 14], [x1, y + 14]])];
  for (let k = 0; k < posts; k++) { const x = x0 + 20 + k * (x1 - x0 - 40) / (posts - 1); out.push(L([[x - 6, y + 14], [x - 6, y + depth], [x + 6, y + depth], [x + 6, y + 14]])); }
  return out;
}
/** a row of harbour houses: single-line facades with gable roofs and a window each */
function houses(x0, x1, by, n, h) {
  const w = (x1 - x0) / n, out = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + i * w + 4, ww = w - 8, eh = h * (0.62 + 0.1 * (i % 2));
    out.push(L([[x, by], [x, by - eh], [x + ww / 2, by - h * (0.95 + 0.05 * (i % 2))], [x + ww, by - eh], [x + ww, by]]), rect(x + ww * 0.32, by - eh * 0.72, ww * 0.36, ww * 0.3));
  }
  out.push(L([[x0, by], [x1, by]]));
  return out;
}
/** a station building: walls, a pitched roof, a round clock with two hands (no numbers), a door */
function station(x, by, w, h) {
  const eave = by - h * 0.62, top = by - h, cx = x + w / 2, cr = h * 0.11, cy = eave - (eave - top) * 0.42;
  return [L([[x, by], [x, eave], [x + w, eave], [x + w, by]]), L([[x - 14, eave], [cx, top], [x + w + 14, eave], [x - 14, eave]], true),
    L(arc(cx, cy, cr, cr, 0, 2 * Math.PI), true), L([[cx, cy], [cx, cy - cr * 0.7]]), L([[cx, cy], [cx + cr * 0.55, cy]]),
    rect(cx - w * 0.12, by - h * 0.34, w * 0.24, h * 0.34), rect(x + w * 0.08, by - h * 0.5, w * 0.18, h * 0.18), rect(x + w * 0.74, by - h * 0.5, w * 0.18, h * 0.18)];
}
/** two rails with sleepers */
function rails(x0, x1, y, gap = 22) {
  const out = [L([[x0, y], [x1, y]]), L([[x0, y + gap], [x1, y + gap]])];
  for (let x = x0 + 18; x < x1 - 10; x += 44) out.push(L([[x, y - 6], [x + 10, y + gap + 6]]));
  return out;
}
/** a market stall: a table, two posts and a striped awning with a scalloped edge */
function stall(cx, by, w, h) {
  const x0 = cx - w / 2, x1 = cx + w / 2, tt = by - h * 0.42, at = by - h, ab = by - h * 0.78, n = 6, out = [];
  out.push(L([[x0 - 10, tt], [x1 + 10, tt]]), L([[x0 - 10, tt + 14], [x1 + 10, tt + 14]]), L([[x0, tt + 14], [x0, by]]), L([[x1, tt + 14], [x1, by]]), L([[x0 + 8, ab], [x0 + 8, tt]]), L([[x1 - 8, ab], [x1 - 8, tt]]));
  const sc = [[x0 - 16, ab]]; for (let i = 0; i < n; i++) { const a = x0 - 16 + (w + 32) * i / n, b = x0 - 16 + (w + 32) * (i + 1) / n; sc.push(...arc((a + b) / 2, ab, (b - a) / 2, 14, Math.PI, 0).slice(1)); }
  out.push(L([[x0 - 16, ab], [x0 + 6, at], [x1 - 6, at], [x1 + 16, ab]]), L(sc));
  for (let i = 1; i < n; i++) { const xb = x0 - 16 + (w + 32) * i / n, xt = x0 + 6 + (w - 12) * i / n; out.push(L([[xt, at], [xb, ab]])); }
  return out;
}
/** a crate: a box with two slats */
const crate = (x, by, s) => [rect(x, by - s, s, s), L([[x, by - s * 0.5], [x + s, by - s * 0.5]]), L([[x + 4, by - s + 4], [x + s - 4, by - s * 0.5 - 4]])];
/** a castle on a hill: wall with a zigzag-free top, a gate, two towers with pointed roofs and a plain pennant */
function castle(cx, by, w, h) {
  const x0 = cx - w / 2, x1 = cx + w / 2, wt = by - h * 0.5, tw = w * 0.22, tt = by - h * 0.78, out = [];
  out.push(L([[x0 + tw, wt], [x1 - tw, wt]]), L([[cx - w * 0.1, by], [cx - w * 0.1, by - h * 0.24], ...arc(cx, by - h * 0.24, w * 0.1, w * 0.1, Math.PI, 2 * Math.PI).slice(1), [cx + w * 0.1, by]]));
  for (const tx of [x0, x1 - tw]) { out.push(L([[tx, by], [tx, tt], [tx + tw, tt], [tx + tw, by]]), L([[tx - 8, tt], [tx + tw / 2, by - h], [tx + tw + 8, tt], [tx - 8, tt]], true), rect(tx + tw * 0.34, tt + 26, tw * 0.32, tw * 0.42)); }
  const px = x1 - tw / 2, pt = by - h; out.push(L([[px, pt], [px, pt - 34]]), L([[px, pt - 34], [px + 30, pt - 26], [px, pt - 18]]));
  return out;
}
/** a puddle, a stone, an ice floe, the jungle leaf */
const puddle = (cx, y, w) => [L(arc(cx, y, w / 2, w * 0.1, 0, 2 * Math.PI), true)];
const stone = (cx, by, w) => [L([[cx - w / 2, by], ...arc(cx, by, w / 2, w * 0.32, Math.PI, 2 * Math.PI).slice(1), [cx - w / 2, by]], true)];
function leaf(x, y, len, ang, wid = 0.34) {
  const c = Math.cos(ang), s = Math.sin(ang), P = (u, v) => [x + c * u * len - s * v * len, y + s * u * len + c * v * len];
  return [L(smooth([P(0, 0), P(0.35, -wid), P(0.75, -wid * 0.7), P(1, 0), P(0.75, wid * 0.7), P(0.35, wid), P(0, 0)]), true), L([P(0.04, 0), P(0.9, 0)])];
}
/** a winding path band (its two edges) from bottom to the top point */
const path = (ctrl, w) => [{ m: 'pathBand', a: [ctrl, w] }];
/** a slanted cable */
const cable = (x0, y0, x1, y1) => [L([[x0, y0], [x1, y1]])];
module.exports = { L, rect, henHouse, barn, tent, slide, swing, igloo, pier, houses, station, rails, stall, crate, castle, puddle, stone, leaf, path, cable };
