/**
 * data/ptx/td.js — the DRAWN containers of the G1-431 "Trace, then draw" Level Set copies (ptl): each holds ONE empty space
 * with a reason (a basket, a tank, a nest, a toy chest…) that the child fills with a drawing of their own. Page px on the
 * 675 × 716 body, the library's line style (one even outline, round joins, no hatching), nothing letter- or digit-shaped.
 * Every function returns { motifs, hole }: TRACED motif entries and the empty space { x0, y0, x1, y1 } — the scene file
 * checks that no picture and no other line enters the hole, and that the hole is the level's size.
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
const rect = (x, y, w, h) => L([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], true);
const arc = (cx, cy, rx, ry, a0, a1) => M.arc(cx, cy, rx, ry, a0, a1, 3);
const smooth = (c, closed = false) => M.catmull(c, closed, 3);
const H = (x0, y0, x1, y1) => ({ x0, y0, x1, y1 });

/** a picnic hamper with its two lid flaps thrown open: a tapered body with two weave bands and a rim; the hole = above the
 *  open hamper, between the flaps (a tall arched handle read as a bell jar, 2026-10-22 render) */
function basket(cx, by, w, h, holeH) {
  const rimY = by - h, l = cx - w / 2, r = cx + w / 2, fw = w * 0.3;
  const motifs = [L([[l, rimY], [cx - w * 0.42, by], [cx + w * 0.42, by], [r, rimY]]), rect(l - 8, rimY - 14, w + 16, 14),
    L([[l + w * 0.03, rimY + h * 0.38], [r - w * 0.03, rimY + h * 0.38]]), L([[l + w * 0.055, rimY + h * 0.7], [r - w * 0.055, rimY + h * 0.7]]),
    // each lid half hinged at the rim's outer edge, lying open outward (a picnic hamper, not a tub)
    L([[l - 8, rimY - 14], [l - 8 - fw * 0.9, rimY - 14 + fw * 0.34], [l - 8 - fw * 0.9 + 6, rimY + fw * 0.34], [l - 8, rimY]], true),
    L([[r + 8, rimY - 14], [r + 8 + fw * 0.9, rimY - 14 + fw * 0.34], [r + 8 + fw * 0.9 - 6, rimY + fw * 0.34], [r + 8, rimY]], true)];
  return { motifs, hole: H(l + 20, rimY - 22 - holeH, r - 20, rimY - 24) };
}
/** a fish tank on a low cabinet: the glass, its top rim, the cabinet with two doors; the hole = the water */
function tank(x, by, w, h, cab = 100) {
  const gy = by - cab - h;
  // the water line near the top and a pebble bed at the bottom say "tank" (an empty glass box read as a cupboard)
  const pebbles = [L([[x, gy + h - 22], ...Array.from({ length: 9 }, (_, i) => [x + w * (i + 0.5) / 9, gy + h - 22 - (i % 2 ? 10 : 4)]), [x + w, gy + h - 22]])];
  const motifs = [rect(x - 14, by - cab, w + 28, cab), L([[x + (w + 28) / 2 - 14, by - cab + 12], [x + (w + 28) / 2 - 14, by - 10]]), rect(x, gy, w, h), rect(x - 8, gy - 14, w + 16, 14),
    L(smooth([[x, gy + 30], [x + w * 0.25, gy + 24], [x + w * 0.5, gy + 30], [x + w * 0.75, gy + 24], [x + w, gy + 30]])), ...pebbles];
  return { motifs, hole: H(x + 14, gy + 40, x + w - 14, gy + h - 40) };
}
/** a branch across the page with an empty nest on it; the hole = the space above the nest */
function nest(cx, y, w, holeH, x0 = 14, x1 = 661) {
  const motifs = [L(smooth([[x0, y + 40], [cx - w, y + 22], [cx, y + 18], [cx + w, y + 6], [x1, y - 16]])), L(smooth([[x0, y + 64], [cx - w, y + 46], [cx, y + 42], [cx + w, y + 30], [x1, y + 8]])),
    L([[cx - w / 2, y], [cx + w / 2, y], ...arc(cx, y, w / 2, w * 0.3, 0, Math.PI).slice(1)], true),
    L(smooth([[cx - w * 0.36, y + w * 0.08], [cx, y + w * 0.14], [cx + w * 0.36, y + w * 0.08]])), L(smooth([[cx - w * 0.24, y + w * 0.19], [cx, y + w * 0.23], [cx + w * 0.24, y + w * 0.19]]))];
  return { motifs, hole: H(cx - w / 2 + 6, y - holeH, cx + w / 2 - 6, y - 10) };
}
/** a toy chest with its lid thrown open to the left; the hole = the space above the open box */
function chest(x, by, w, h, holeH) {
  const ty = by - h, lw = w * 0.5;
  const motifs = [rect(x, ty, w, h), L([[x, ty + h * 0.36], [x + w, ty + h * 0.36]]), rect(x + w / 2 - 16, ty + h * 0.36 - 12, 32, 28),
    L([[x, ty], [x - lw * 0.5, ty - lw * 0.86], [x - lw * 0.5 - 22, ty - lw * 0.86 + 12], [x - 22, ty + 12], [x, ty]], true)];
  return { motifs, hole: H(x + 12, ty - holeH, x + w - 12, ty - 10) };
}
/** a pond: an oval edge, an inner ripple-free water, two reeds outside its rim; the hole = the water */
function pond(cx, cy, rx, ry) {
  const reed = (x, b, hh) => [L([[x - 5, b], [x - 3, b - hh * 0.7], [x + 3, b - hh * 0.7], [x + 5, b], [x - 5, b]], true), L(arc(x, b - hh * 0.82, 9, hh * 0.13, 0, 2 * Math.PI), true)];
  const motifs = [L(arc(cx, cy, rx, ry, 0, 2 * Math.PI), true), L(arc(cx, cy, rx + 16, ry + 12, 0.15 * Math.PI, 0.85 * Math.PI)), ...reed(cx - rx - 10, cy - ry * 0.1, 120), ...reed(cx + rx + 14, cy, 100)];
  return { motifs, hole: H(cx - rx * 0.68, cy - ry * 0.68, cx + rx * 0.68, cy + ry * 0.68) };
}
/** an open crate (front with two slats, the back rim seen above it); the hole = above the crate */
function openCrate(x, by, w, h, holeH) {
  const ty = by - h;
  const motifs = [rect(x, ty, w, h), L([[x, ty + h * 0.5], [x + w, ty + h * 0.5]]), L([[x + 10, ty], [x + 26, ty - 18], [x + w - 26, ty - 18], [x + w - 10, ty]])];
  return { motifs, hole: H(x + 30, ty - 18 - holeH, x + w - 30, ty - 26) };
}
/** a market stall with a striped awning and an empty counter; the hole = between the counter and the awning */
function stall(cx, by, w, h) {
  const x0 = cx - w / 2, x1 = cx + w / 2, tt = by - h * 0.42, at = by - h, ab = by - h * 0.8, n = 6, out = [];
  out.push(rect(x0 - 10, tt, w + 20, 16), L([[x0, tt + 16], [x0, by]]), L([[x1, tt + 16], [x1, by]]), L([[x0 + 8, ab + 12], [x0 + 8, tt]]), L([[x1 - 8, ab + 12], [x1 - 8, tt]]));
  const sc = [[x0 - 16, ab]]; for (let i = 0; i < n; i++) { const a = x0 - 16 + (w + 32) * i / n, b = x0 - 16 + (w + 32) * (i + 1) / n; sc.push(...arc((a + b) / 2, ab, (b - a) / 2, 12, 0, Math.PI).slice(1)); }
  out.push(L([[x0 - 16, ab], [x0 + 6, at], [x1 - 6, at], [x1 + 16, ab]]), L(sc));
  for (let i = 1; i < n; i++) { const xb = x0 - 16 + (w + 32) * i / n, xt = x0 + 6 + (w - 12) * i / n; out.push(L([[xt, at], [xb, ab]])); }
  return { motifs: out, hole: H(x0 + 24, ab + 26, x1 - 24, tt - 8) };
}
/** a shop front: the wall, a flat roof band, a door on the right and a big empty window; the hole = the window */
function shopWindow(x, by, w, h, ww, wh) {
  const top = by - h, wx = x + 24, wy = top + 40, dw = w - ww - 72;
  const motifs = [rect(x, top, w, h), rect(x - 10, top - 26, w + 20, 26), rect(wx, wy, ww, wh), L([[wx - 8, wy + wh], [wx + ww + 8, wy + wh]]),
    rect(x + w - dw - 24, by - h * 0.7, dw, h * 0.7), L(arc(x + w - 36 - 8, by - h * 0.36, 6, 6, 0, 2 * Math.PI), true)];
  return { motifs, hole: H(wx + 12, wy + 12, wx + ww - 12, wy + wh - 12) };
}
/** a long table with a tablecloth and its fringe of soft scallops; the hole = the space above the table top */
function partyTable(x, ty, w, legH, holeH) {
  const n = 7, sc = [[x, ty + 34]];
  for (let i = 0; i < n; i++) { const a = x + w * i / n, b = x + w * (i + 1) / n; sc.push(...arc((a + b) / 2, ty + 34, (b - a) / 2, 12, Math.PI, 0).slice(1)); }
  const motifs = [L([[x, ty + 34], [x, ty], [x + w, ty], [x + w, ty + 34]]), L(sc), rect(x + 30, ty + 46, 16, legH), rect(x + w - 46, ty + 46, 16, legH)];
  return { motifs, hole: H(x + 16, ty - holeH, x + w - 16, ty - 10) };
}
/** a big empty picture frame on the wall (a double frame and its hanging cord); the hole = the canvas */
function frame(x, y, w, h) {
  const motifs = [rect(x, y, w, h), rect(x + 18, y + 18, w - 36, h - 36), L([[x + w * 0.3, y], [x + w / 2, y - 36], [x + w * 0.7, y]])];
  return { motifs, hole: H(x + 30, y + 30, x + w - 30, y + h - 30) };
}
/** a tent with its flaps tied back: the tent, the open doorway, the two flaps, a pole tip; the hole = inside the doorway */
function openTent(cx, by, w, h, dw) {
  const top = by - h, dh = h * 0.78, dt = by - dh;
  // each pulled-back flap folds at a point HALFWAY between the doorway edge and the tent wall at that height (a fold point
  // set off the door's foot stuck out of the tent wall, visual review 2026-10-22)
  const fy = by - dh * 0.42, doorHalf = (fy - dt) / dh * (dw / 2), wallHalf = (fy - top) / h * (w / 2), fx = (doorHalf + wallHalf) / 2;
  const motifs = [L([[cx - w / 2, by], [cx, top], [cx + w / 2, by], [cx - w / 2, by]], true), L([[cx, top], [cx, top - 24]]),
    L([[cx - dw / 2, by], [cx, dt], [cx + dw / 2, by]]), L([[cx, dt], [cx - fx, fy], [cx - dw / 2, by]]), L([[cx, dt], [cx + fx, fy], [cx + dw / 2, by]])];   // the flaps tied back INSIDE the doorway edges
  // the largest box inside the doorway triangle (half its height, half its base)
  return { motifs, hole: H(cx - dw / 4 + 4, by - dh / 2 + 4, cx + dw / 4 - 4, by - 8) };
}
/** a zoo enclosure: a back wall with a gate post each side and a low fence in front; the hole = the empty yard */
function enclosure(x, by, w, h) {
  const top = by - h, out = [L([[x, by], [x, top], [x + w, top], [x + w, by]]), L([[x - 6, top], [x + w + 6, top]])];
  out.push(L([[x, by - 40], [x + w, by - 40]]), L([[x, by - 16], [x + w, by - 16]]));
  for (let i = 0; i <= 6; i++) { const px = x + w * i / 6; out.push(L([[px, by], [px, by - 52]])); }
  return { motifs: out, hole: H(x + 16, top + 14, x + w - 16, by - 64) };
}
/** a castle tower with a big arched window, a pointed roof and a plain pennant; the hole = the window */
function towerWindow(cx, by, w, h, ww, wh) {
  const x0 = cx - w / 2, top = by - h, wx = cx - ww / 2, wb = top + 60 + wh;
  // battlements, not a pointed roof (a roofed tower read as a house, 2026-10-22 render): merlons along the top, a flag pole
  const n = 5, mw = w / (2 * n - 1), bat = [[x0, top + 30]];
  for (let i = 0; i < n; i++) { const a = x0 + 2 * i * mw; bat.push([a, top], [a + mw, top], ...(i < n - 1 ? [[a + mw, top + 26], [a + 2 * mw, top + 26]] : [])); }
  bat.push([x0 + w, top + 30]);
  const motifs = [L([[x0, by], [x0, top + 30]]), L([[x0 + w, by], [x0 + w, top + 30]]), L(bat), L([[x0, top + 44], [x0 + w, top + 44]]),
    L([[cx, top], [cx, top - 70]]), L([[cx, top - 70], [cx + 34, top - 60], [cx, top - 50]]),
    L([[wx, wb], [wx, top + 60 + ww / 2], ...arc(cx, top + 60 + ww / 2, ww / 2, ww / 2, Math.PI, 2 * Math.PI).slice(1), [wx + ww, wb], [wx, wb]], true)];
  return { motifs, hole: H(wx + 12, top + 60 + ww * 0.28, wx + ww - 12, wb - 10) };
}
/** a cooking pot on the cooker top: two handles, a rim; the hole = above the pot */
function pot(cx, by, w, h, holeH) {
  const ty = by - h;
  const motifs = [L([[cx - w / 2, ty], [cx - w / 2, by - 18], ...arc(cx - w / 2 + 18, by - 18, 18, 18, Math.PI, Math.PI / 2).slice(1), [cx + w / 2 - 18, by], ...arc(cx + w / 2 - 18, by - 18, 18, 18, Math.PI / 2, 0).slice(1), [cx + w / 2, ty]]),
    rect(cx - w / 2 - 10, ty - 14, w + 20, 14), L(arc(cx - w / 2 - 2, ty + 30, 22, 14, 0.5 * Math.PI, 1.5 * Math.PI)), L(arc(cx + w / 2 + 2, ty + 30, 22, 14, -0.5 * Math.PI, 0.5 * Math.PI))];
  return { motifs, hole: H(cx - w / 2 + 8, ty - 14 - holeH, cx + w / 2 - 8, ty - 22) };
}
/** a raised garden bed: planks with their posts and the soil line; the hole = the space above the soil */
function gardenBed(x, by, w, h, holeH) {
  const ty = by - h;
  const motifs = [rect(x, ty, w, h), L([[x, ty + h / 2], [x + w, ty + h / 2]]), rect(x - 12, ty - 10, 18, h + 10), rect(x + w - 6, ty - 10, 18, h + 10), L(smooth([[x + 10, ty], [x + w * 0.3, ty - 10], [x + w * 0.6, ty - 6], [x + w - 10, ty]]))];
  return { motifs, hole: H(x + 14, ty - 12 - holeH, x + w - 14, ty - 18) };
}
module.exports = { rectOf: rect, basket, tank, nest, chest, pond, openCrate, stall, shopWindow, partyTable, frame, openTent, enclosure, towerWindow, pot, gardenBed };
