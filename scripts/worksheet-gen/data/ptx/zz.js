/**
 * data/ptx/zz.js — DRAWN zigzag pictures for the K-423 Level Set copies, in page px on the 675 × 716 body, in the library's
 * line style. Every function returns motif entries ({ m: 'line', a: [pts, closed] }) — traced by construction. A tip is a
 * sharp point (no rounding), so "stop at every tip" stays true.
 */
'use strict';
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
/** n tips between x0 and x1; base y, tips at y - amp (amp < 0: tips down) */
function zzPts(x0, x1, y, amp, n) {
  const pts = [[x0, y]], step = (x1 - x0) / n;
  for (let i = 0; i < n; i++) { pts.push([x0 + step * (i + 0.5), y - amp]); pts.push([x0 + step * (i + 1), y]); }
  return pts;
}
const zz = (x0, x1, y, amp, n) => [L(zzPts(x0, x1, y, amp, n))];
/** a crown: a band and a zigzag top of n tips (one closed outline + the band's top line) */
function crown(cx, by, w, h, n = 5) {
  const x0 = cx - w / 2, x1 = cx + w / 2, band = by - h * 0.3;
  const top = zzPts(x0, x1, band, h * 0.7, n);
  return [L([[x0, by], ...top, [x1, by], [x0, by]], true), L([[x0, band], [x1, band]])];
}
const triangle = (cx, by, w, h) => [L([[cx - w / 2, by], [cx, by - h], [cx + w / 2, by], [cx - w / 2, by]], true)];
/** a row of n pointed houses whose roofs make one zigzag skyline; a door + a window each */
function houses(x0, x1, by, n, wallH, roofH) {
  const w = (x1 - x0) / n, out = [];
  out.push(L([[x0, by - wallH], ...zzPts(x0, x1, by - wallH, roofH, n).slice(1)]));
  for (let i = 0; i <= n; i++) out.push(L([[x0 + i * w, by], [x0 + i * w, by - wallH]]));
  out.push(L([[x0, by], [x1, by]]));
  for (let i = 0; i < n; i++) {
    const cx = x0 + w * (i + 0.5);
    out.push(L([[cx - w * 0.14, by], [cx - w * 0.14, by - wallH * 0.45], [cx + w * 0.14, by - wallH * 0.45], [cx + w * 0.14, by]]));
    out.push(L([[cx - w * 0.16, by - wallH * 0.62], [cx + w * 0.16, by - wallH * 0.62], [cx + w * 0.16, by - wallH * 0.88], [cx - w * 0.16, by - wallH * 0.88], [cx - w * 0.16, by - wallH * 0.62]], true));
  }
  return out;
}
/** a reed clump: n narrow pointed blades from one base */
function reeds(cx, by, h, n = 4) {
  const out = [];
  for (let i = 0; i < n; i++) { const t = (i - (n - 1) / 2) / n, x = cx + t * h * 0.6; out.push(L([[x - 6, by], [x + t * h * 0.5, by - h * (0.8 + 0.2 * Math.cos(t * 3))], [x + 6, by]])); }
  return out;
}
/** a fern: a midrib and a zigzag outline of pointed leaflets */
function fern(cx, by, h, k = 5) {
  const pts = [[cx, by]], w = h * 0.32;
  for (let i = 0; i < k; i++) { const y = by - h * (i + 0.5) / k, s = w * (1 - i / k * 0.6); pts.push([cx - s, y + h / k * 0.25]); pts.push([cx - 6, y - h / k * 0.15]); }
  pts.push([cx, by - h]);
  for (let i = k - 1; i >= 0; i--) { const y = by - h * (i + 0.5) / k, s = w * (1 - i / k * 0.6); pts.push([cx + 6, y - h / k * 0.15]); pts.push([cx + s, y + h / k * 0.25]); }
  pts.push([cx, by]);
  return [L(pts, true), L([[cx, by], [cx, by - h * 0.92]])];
}
/** a castle: a wall with a zigzag top, a gate, n towers with pointed roofs */
function castle(cx, by, w, h, towers = 3) {
  const x0 = cx - w / 2, x1 = cx + w / 2, wallTop = by - h * 0.45, out = [];
  out.push(L([[x0, by], [x0, wallTop], ...zzPts(x0, x1, wallTop, 16, 8).slice(1), [x1, by]]));
  out.push(L([[cx - w * 0.08, by], [cx - w * 0.08, by - h * 0.2], [cx, by - h * 0.27], [cx + w * 0.08, by - h * 0.2], [cx + w * 0.08, by]]));
  for (let i = 0; i < towers; i++) {
    const tx = x0 + w * (towers === 1 ? 0.5 : i / (towers - 1)) , tw = w * 0.16, tt = by - h * 0.72;
    out.push(L([[tx - tw / 2, wallTop + 4], [tx - tw / 2, tt], [tx + tw / 2, tt], [tx + tw / 2, wallTop + 4]]));
    out.push(...triangle(tx, tt, tw * 1.3, h * 0.28));
  }
  return out;
}
/** a circus tent: a tall pointed roof, a zigzag hem of flaps, a door */
function circusTent(cx, by, w, h) {
  const hemY = by - h * 0.42, x0 = cx - w / 2, x1 = cx + w / 2;
  return [L([[x0, hemY], [cx, by - h], [x1, hemY]]), L(zzPts(x0, x1, hemY, -22, 7)), L([[x0 + 10, hemY + 22], [x0 + 10, by], [x1 - 10, by], [x1 - 10, hemY + 22]]),
    L([[cx - w * 0.12, by], [cx, by - h * 0.3], [cx + w * 0.12, by]]), L([[cx, by - h], [cx, by - h - 26]]), L([[cx, by - h - 26], [cx + 26, by - h - 18], [cx, by - h - 10]])];
}
/** a diamond kite with a zigzag tail of n tips */
function kite(cx, cy, s, n = 5, dir = 1) {
  const tail = [[cx, cy + s * 0.65]]; for (let i = 0; i < n; i++) tail.push([cx + (i % 2 ? -1 : 1) * 14 * dir, cy + s * 0.65 + (i + 1) * 20]);
  return [L([[cx, cy - s * 0.5], [cx + s * 0.4, cy - s * 0.05], [cx, cy + s * 0.65], [cx - s * 0.4, cy - s * 0.05], [cx, cy - s * 0.5]], true), L([[cx - s * 0.4, cy - s * 0.05], [cx + s * 0.4, cy - s * 0.05]]), L(tail)];
}
/** a pointed rock (3 tips) */
const rock = (cx, by, w, h) => [L([[cx - w / 2, by], [cx - w * 0.28, by - h * 0.6], [cx - w * 0.1, by - h * 0.4], [cx + w * 0.05, by - h], [cx + w * 0.25, by - h * 0.55], [cx + w / 2, by], [cx - w / 2, by]], true)];
/** a cake with a zigzag icing edge */
function cake(cx, by, w, h) {
  const x0 = cx - w / 2, x1 = cx + w / 2, top = by - h;
  return [L([[x0, top], [x0, by], [x1, by], [x1, top], [x0, top]], true), L(zzPts(x0, x1, top + h * 0.32, h * 0.18, 6)), L([[cx, top], [cx, top - h * 0.35]]), L([[cx, top - h * 0.35], [cx + 9, top - h * 0.45], [cx, top - h * 0.6], [cx - 9, top - h * 0.45], [cx, top - h * 0.35]], true)];
}
/** a criss-cross fence: two zigzags between a top and a bottom rail */
function crissFence(x0, x1, by, h, n) {
  return [L([[x0, by], [x1, by]]), L([[x0, by - h], [x1, by - h]]), L(zzPts(x0, x1, by, h, n)), L(zzPts(x0, x1, by - h, -h, n))];
}
/** a pyramid with its stone courses (horizontal lines inside keep the zigzag outline the move) */
const pyramid = (cx, by, w, h) => triangle(cx, by, w, h);
/** a pennant on a pole, its tail cut in a zigzag */
function pennant(x, by, h) {
  const top = by - h;
  return [L([[x, by], [x, top]]), L([[x, top], [x + h * 0.55, top + h * 0.08], [x + h * 0.42, top + h * 0.14], [x + h * 0.55, top + h * 0.2], [x, top + h * 0.28]])];
}
/** a volcano with a zigzag smoke puff */
function volcano(cx, by, w, h) {
  return [L([[cx - w / 2, by], [cx - w * 0.12, by - h], [cx + w * 0.12, by - h], [cx + w / 2, by]]), L(zzPts(cx - w * 0.12, cx + w * 0.12, by - h - 6, 18, 3).map(([x, y], i) => [x + i * 4, y - i * 6]))];
}
module.exports = { L, zz, zzPts, crown, triangle, houses, reeds, fern, castle, circusTent, kite, rock, cake, crissFence, pyramid, pennant, volcano };
