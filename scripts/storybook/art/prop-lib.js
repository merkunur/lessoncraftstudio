/* =====================================================================
   prop-lib.js — shared wsv-1 prop draw functions for cross-story use.

   Extracted at the 250-library's first part finale (story #10), where a
   roster-recap story needs props from five earlier worlds. Shipped
   per-story generators keep their own copies (they are one-shot build
   artifacts and must keep reproducing their stories byte-for-byte);
   NEW stories that need these props import from here.

   Every fn returns a full standalone SVG string (S.doc). For in-scene
   embedding, strip the svg wrapper: svg.replace(/<\/?svg[^>]*>/g, '').
   ===================================================================== */
'use strict';
const S = require('./style-lib.js');

/* ---- Poppy's world (story #3) ---- */
function pumpkin() {
  return S.doc(300, 300, [
    S.stroke('M 150 66 Q 148 34 176 24', 'leafDeep', 16),
    S.ellipse(150, 170, 122, 100, 'orange', { outlined: true }),
    S.ellipse(150, 170, 52, 96, 'orangeDeep', { alpha: 0.5 }),
    S.stroke('M 96 84 Q 76 170 96 252 M 204 84 Q 224 170 204 252', 'orangeDeep', 9, { alpha: 0.8 }),
  ]);
}
function carrot() {
  return S.doc(300, 300, [
    S.stroke('M 128 60 Q 110 20 92 12 M 150 58 Q 150 16 150 6 M 172 60 Q 190 20 208 12', 'leafDeep', 14),
    S.pathShape('M 104 70 Q 150 44 196 70 Q 186 190 150 282 Q 114 190 104 70 Z', 'orange', { outlined: true }),
    S.stroke('M 122 120 L 176 112 M 128 168 L 172 162 M 138 218 L 164 214', 'orangeDeep', 8, { alpha: 0.8 }),
  ]);
}
function strawberry() {
  const seeds = [];
  [[128, 150], [172, 150], [150, 190], [116, 190], [184, 190], [150, 236]].forEach(([x, y]) => seeds.push(S.ellipse(x, y, 5, 8, 'sunshine')));
  return S.doc(300, 300, [
    S.pathShape('M 150 108 C 90 96 62 140 74 186 C 86 236 128 272 150 282 C 172 272 214 236 226 186 C 238 140 210 96 150 108 Z', 'coral', { outlined: true }),
    seeds.join(''),
    S.pathShape('M 106 108 L 132 84 L 150 106 L 168 84 L 194 108 L 168 122 L 150 112 L 132 122 Z', 'leafDeep', { outlined: true, sw: 7 }),
  ]);
}

/* ---- Milo's world (story #6) ---- */
function mitten() {
  return S.doc(300, 300, [
    S.pathShape('M 96 232 L 96 130 Q 96 56 162 56 Q 226 56 226 128 L 226 168 Q 250 158 258 180 Q 264 202 232 214 L 226 232 Z', 'coral', { outlined: true }),
    S.rrect(88, 224, 146, 42, 16, 'cream', { outlined: true, sw: 8 }),
  ]);
}
function hat() {
  return S.doc(300, 300, [
    S.pathShape('M 62 208 Q 62 84 150 78 Q 238 84 238 208 Z', 'tealMid', { outlined: true }),
    S.rrect(50, 198, 200, 44, 20, 'cream', { outlined: true, sw: 8 }),
    S.circle(150, 66, 26, 'cream', { outlined: true, sw: 8 }),
  ]);
}
function scarf() {
  return S.doc(300, 300, [
    S.rrect(70, 60, 160, 130, 26, 'tealMid', { outlined: true }),
    S.rrect(96, 150, 74, 120, 14, 'tealMid', { outlined: true }),
    S.stroke('M 104 246 L 104 272 M 126 250 L 126 276 M 148 246 L 148 272', 'outline', 8),
    S.stroke('M 84 96 L 226 96 M 84 130 L 226 130', 'cream', 12, { alpha: 0.85 }),
    S.stroke('M 110 176 L 156 176 M 110 210 L 156 210', 'cream', 10, { alpha: 0.85 }),
  ]);
}

/* ---- Willa's laundry world (story #5) ---- */
function sock() {
  return S.doc(300, 300, [
    S.pathShape('M 108 46 L 196 46 L 196 168 Q 232 196 224 238 Q 210 276 160 268 Q 116 260 108 214 Z', 'bluebird', { outlined: true }),
    S.rrect(100, 34, 104, 40, 16, 'cream', { outlined: true, sw: 8 }),
  ]);
}
function shirt() {
  return S.doc(300, 300, [
    S.pathShape('M 108 60 Q 150 84 192 60 L 258 96 L 232 152 L 204 138 L 204 252 L 96 252 L 96 138 L 68 152 L 42 96 Z', 'bluebird', { outlined: true }),
    S.stroke('M 108 60 Q 150 84 192 60', 'outline', 8),
  ]);
}

/* ---- Willa's pond world (story #8) ---- */
function fish() {
  return S.doc(300, 300, [
    S.pathShape('M 42 150 Q 110 76 196 108 Q 250 130 250 150 Q 250 170 196 192 Q 110 224 42 150 Z', 'bluebird', { outlined: true }),
    S.pathShape('M 236 150 L 286 108 Q 292 150 286 192 Z', 'bluebird', { outlined: true, sw: 7 }),
    S.eyeDot(96, 138, 11),
    S.stroke('M 150 108 Q 166 150 150 190', 'skyPale', 9),
  ]);
}

/* ---- Shelly's beach world (story #1) ---- */
function shell() {
  const L = 42, R = 258, top = 120, hx = 150, hy = 250;
  const seg = (R - L) / 5;
  let d = `M ${hx} ${hy} L ${L} ${top + 46}`;
  for (let i = 0; i < 5; i++) {
    const x0 = L + i * seg, x1 = L + (i + 1) * seg;
    const peak = top - (i === 2 ? 26 : i === 1 || i === 3 ? 16 : 0);
    d += ` Q ${(x0 + x1) / 2} ${peak - 34} ${x1} ${i === 4 ? top + 46 : peak + 12}`;
  }
  d += ' Z';
  const ridges = [];
  for (let i = 1; i < 5; i++) ridges.push(S.stroke(`M ${hx} ${hy - 8} L ${L + i * seg} ${top + (i === 2 || i === 3 ? -8 : 10)}`, 'cream', 11, { alpha: 0.85 }));
  return S.doc(300, 300, [S.pathShape(d, 'coral', { outlined: true }), ridges.join(''), S.rrect(hx - 30, hy - 14, 60, 34, 14, 'orangeDeep', { outlined: true, sw: 8 })]);
}
function starfish() {
  const cx = 150, cy = 158, ro = 130, ri = 58;
  let d = '';
  for (let k = 0; k < 5; k++) {
    const ao = (-90 + 72 * k) * Math.PI / 180, ai = (-90 + 72 * k + 36) * Math.PI / 180;
    const ox = cx + Math.cos(ao) * ro, oy = cy + Math.sin(ao) * ro;
    const ix = cx + Math.cos(ai) * ri, iy = cy + Math.sin(ai) * ri;
    if (k === 0) d = `M ${cx + Math.cos((-90 - 36) * Math.PI / 180) * ri} ${cy + Math.sin((-90 - 36) * Math.PI / 180) * ri}`;
    d += ` Q ${ox} ${oy} ${ix} ${iy}`;
  }
  return S.doc(300, 300, [S.pathShape(d + ' Z', 'orange', { outlined: true }), S.circle(cx, cy, 30, 'sunshine')]);
}

/* ---- Noodle's world (story #9) ---- */
function toyTrain() {
  const parts = [];
  const y = 110, cw = 100, gap = 10, x0 = 40;
  for (let i = 0; i < 2; i++) {
    const x = x0 + i * (cw + gap);
    parts.push(S.rrect(x, y, cw, 70, 12, i === 0 ? 'coral' : 'tealMid', { outlined: true, sw: 7 }));
    parts.push(S.circle(x + 26, y + 84, 16, 'outline'));
    parts.push(S.circle(x + cw - 26, y + 84, 16, 'outline'));
    if (i === 0) parts.push(S.rrect(x + 18, y - 32, 32, 38, 10, 'coral', { outlined: true, sw: 6 }));
    else parts.push(S.rrect(x + 18, y + 16, cw - 36, 26, 8, 'cream', { alpha: 0.8 }));
  }
  return S.doc(300, 300, parts);
}

module.exports = { pumpkin, carrot, strawberry, mitten, hat, scarf, sock, shirt, fish, shell, starfish, toyTrain };
