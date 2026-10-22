/**
 * data/ptx/scenes-K430.js — K-430 "Shape picture" (K.G.A.2) Level Set copies (ptl): a picture built ONLY of true shapes
 * (circles, squares, triangles, rectangles — no ovals, no rounded corners), every shape ≥ 12 px from every other (nested
 * shapes too: no shared edges), the "colour every circle" key, ≥ 2 circles on every page. A load-time check MEASURES the
 * gap between every pair of outlines and throws, so a crowded picture cannot ship.
 * Concepts: _work/ptl-scenes-B.json (Designer B). Levels (ptl-levels.md §K-430): L1 K-1 — 6-8 shapes, circle / square /
 * triangle only, upright, 90-260 px · L2 K — 11-14 shapes, + rectangles, ≥ 3 circle sizes, one tilted square and one
 * upside-down triangle · L3 K-3 — 16-20 shapes, ≥ 3 sizes of each kind, ≥ 3 nested, ≥ 3 turned shapes.
 */
'use strict';
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const KEY = [{ m: 'roundRect', a: [26, 620, 92, 64, 32] }, { m: 'circle', a: [72, 652, 20], fill: '#9a9a9a', stroke: false }];
const rot = (pts, cx, cy, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]); };
/** the shapes; each returns { motif, pts } (pts: the outline, for the gap check) */
const ci = (cx, cy, r) => ({ motif: { m: 'circle', a: [cx, cy, r] }, pts: Array.from({ length: 72 }, (_, k) => [cx + r * Math.cos(k * Math.PI / 36), cy + r * Math.sin(k * Math.PI / 36)]) });
const poly = (pts) => ({ motif: { m: 'line', a: [[...pts, pts[0]], true] }, pts: densify([...pts, pts[0]]) });
const rc = (cx, cy, w, h, deg = 0) => poly(rot([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], cx, cy, deg));
const sq = (cx, cy, s, deg = 0) => rc(cx, cy, s, s, deg);
/** an isosceles triangle in the box (cx, cy, w, h), apex up; deg 180 = upside down */
const tr = (cx, cy, w, h, deg = 0) => poly(rot([[cx, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], cx, cy, deg));
function densify(P) { const o = []; for (let i = 1; i < P.length; i++) { const [ax, ay] = P[i - 1], [bx, by] = P[i], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 4)); for (let k = 0; k < n; k++) o.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n]); } return o; }
/** the measured gap between every two outlines; a page whose shapes come closer than 12 px is refused */
const ERR = [];
function checkGaps(id, shapes) {
  for (let i = 0; i < shapes.length; i++) for (let j = i + 1; j < shapes.length; j++) {
    let d = 1e9; for (const p of shapes[i].pts) for (const q of shapes[j].pts) { const e = Math.hypot(p[0] - q[0], p[1] - q[1]); if (e < d) d = e; }
    if (d < 12) ERR.push(`K-430 ${id}: shapes ${i} and ${j} are ${d.toFixed(1)} px apart (want ≥ 12)`);
  }
  shapes.forEach((s, i) => { const bad = s.pts.find(([x, y]) => x < 16 || x > 659 || y < 12 || y > 704 || (x < 132 && y > 606)); if (bad) ERR.push(`K-430 ${id}: shape ${i} leaves the page (or covers the colour key) at ${bad[0].toFixed(0)},${bad[1].toFixed(0)}`); });
}
const copy = (id, level, name, shapes) => { checkGaps(id, shapes); return { id: 'ptx-K-430-' + id, face: 'K-430', level, name: { en: name }, skin: () => ({ ...BAND[level], occlusion: false, items: [], decor: KEY, motifs: shapes.map((s) => s.motif) }) }; };
const SCENES = [
  // ── L1 — 6-8 upright circles, squares, triangles; big ────────────────────────────────────────────────────────────────
  copy('house', 1, 'The Shape House', [sq(290, 470, 260), tr(290, 258, 330, 130), sq(290, 470, 100), ci(560, 120, 62), ci(560, 560, 66), tr(560, 365, 150, 200)]),
  copy('snowman', 1, 'The Shape Snowman', [ci(338, 590, 105), ci(338, 380, 80), ci(338, 215, 60), sq(338, 95, 90), ci(560, 130, 55), tr(560, 520, 160, 220)]),
  copy('owl', 1, 'The Shape Owl', [ci(338, 450, 175), ci(275, 400, 50), ci(401, 400, 50), tr(245, 218, 90, 100), tr(431, 218, 90, 100), tr(338, 512, 60, 54), sq(570, 620, 110), ci(570, 110, 52)]),
  copy('ice-cream', 1, 'The Shape Ice Cream', [sq(338, 560, 200), ci(338, 355, 88), ci(338, 190, 64), ci(338, 68, 44), tr(540, 140, 120, 160), sq(560, 600, 100)]),
  copy('cat', 1, 'The Shape Cat', [ci(300, 500, 150), ci(300, 240, 88), tr(232, 95, 80, 90), tr(368, 95, 80, 90), sq(540, 200, 160), ci(560, 560, 58)]),
  // ── L2 — 11-14 shapes, rectangles, 3 circle sizes, one tilted square, one upside-down triangle ────────────────────────
  copy('robot', 2, 'The Shape Robot', [sq(338, 160, 140), ci(305, 150, 20), ci(371, 150, 20), tr(338, 55, 40, 40), rc(338, 400, 220, 250), ci(338, 318, 30), sq(338, 397, 50, 45), tr(338, 476, 80, 60, 180), rc(178, 390, 40, 170), rc(498, 390, 40, 170), rc(290, 615, 56, 140), rc(386, 615, 56, 140), ci(560, 110, 56)]),
  copy('train', 2, 'The Shape Train', [rc(250, 440, 280, 150), sq(475, 410, 140), rc(170, 300, 50, 90), ci(170, 200, 34), ci(475, 400, 36), ci(170, 575, 44), ci(305, 575, 44), ci(470, 582, 50), tr(600, 480, 70, 80, 180), sq(600, 300, 60, 45), rc(395, 662, 490, 20), ci(560, 110, 46)]),
  copy('castle', 2, 'The Shape Castle', [rc(150, 440, 120, 320), rc(526, 440, 120, 320), sq(338, 480, 200), tr(150, 210, 150, 110), tr(526, 210, 150, 110), tr(338, 315, 220, 100), rc(338, 515, 70, 90), ci(150, 380, 30), ci(526, 380, 22), ci(338, 425, 16), sq(150, 100, 50, 45), tr(526, 105, 60, 50, 180), ci(338, 110, 50)]),
  copy('sailboat', 2, 'The Shape Sailboat', [rc(338, 560, 440, 90), rc(338, 330, 20, 300), tr(240, 340, 140, 260), tr(430, 350, 110, 220), ci(230, 560, 22), ci(338, 560, 30), ci(446, 560, 16), ci(560, 110, 56), sq(130, 170, 60, 45), tr(338, 140, 60, 50, 180), rc(360, 650, 400, 26)]),
  copy('bus', 2, 'The Shape Bus', [rc(338, 400, 520, 220), sq(170, 370, 80), sq(280, 370, 80), sq(390, 370, 80), rc(520, 410, 70, 160), ci(190, 572, 48), ci(480, 572, 48), ci(110, 470, 16), ci(560, 120, 60), sq(150, 110, 60, 45), rc(150, 222, 14, 100), tr(330, 140, 70, 60, 180)]),
  // ── L3 — 16-20 shapes, 3 sizes of each kind, nested, turned ──────────────────────────────────────────────────────────
  copy('windmill', 3, 'The Shape Windmill', [ci(338, 170, 40), ci(338, 170, 18), rc(415, 93, 30, 110, 45), rc(261, 93, 30, 110, -45), rc(261, 247, 30, 110, 45), rc(415, 247, 30, 110, -45), rc(338, 507, 150, 306), tr(338, 302, 210, 70), sq(338, 610, 70), sq(300, 450, 40), sq(376, 450, 40), ci(575, 100, 50), ci(560, 620, 40), rc(560, 685, 90, 24), tr(560, 470, 110, 140), tr(150, 430, 90, 110, -10), tr(170, 555, 70, 90, 10), sq(140, 200, 56, 45), ci(575, 100, 26), rc(560, 230, 120, 36, -8)]),
  copy('giraffe', 3, 'The Shape Giraffe', [rc(300, 478, 300, 140), rc(410, 272, 56, 222, 20), sq(472, 96, 90), ci(490, 86, 12), tr(442, 24, 26, 24), tr(502, 24, 26, 24), rc(185, 627, 34, 124), rc(250, 627, 34, 124), rc(350, 627, 34, 124), rc(415, 627, 34, 124), tr(100, 450, 40, 64, -30), ci(240, 478, 26), ci(240, 478, 10), ci(330, 468, 18), ci(590, 130, 48), sq(140, 140, 66, 30), tr(560, 640, 110, 120), tr(560, 500, 80, 100, 12), rc(560, 300, 100, 30, -10), rc(150, 360, 120, 26, 8)]),
  copy('fire-truck', 3, 'The Shape Fire Truck', [rc(250, 450, 340, 160), sq(530, 430, 160), sq(530, 410, 80), sq(530, 410, 40), rc(250, 315, 300, 26, -10), ci(180, 590, 46), ci(180, 590, 20), ci(370, 590, 46), ci(370, 590, 20), ci(540, 585, 40), tr(190, 250, 50, 50, 30), tr(300, 240, 50, 50, -30), sq(250, 450, 60, 45), tr(530, 300, 70, 60, 180), ci(110, 110, 46), ci(110, 110, 20), rc(560, 150, 110, 40, 8), sq(380, 160, 70)]),
  copy('butterfly', 3, 'The Shape Butterfly', [rc(338, 320, 34, 300), ci(338, 120, 36), tr(214, 228, 200, 190, 90), tr(462, 228, 200, 190, -90), tr(230, 412, 150, 140, 90), tr(446, 412, 150, 140, -90), ci(185, 228, 28), ci(185, 228, 12), ci(491, 228, 28), ci(205, 412, 16), ci(471, 412, 16), ci(190, 566, 44), rc(190, 655, 14, 62), ci(338, 584, 34), rc(338, 662, 14, 50), ci(500, 566, 44), rc(500, 655, 14, 62), sq(590, 90, 56, 45), ci(605, 470, 38), tr(600, 340, 56, 56, 20)]),
  copy('balloon', 3, 'The Shape Balloon', [ci(338, 230, 160), ci(338, 230, 100), ci(338, 230, 40), sq(338, 580, 110), rc(296, 457, 12, 104, -12), rc(380, 457, 12, 104, 12), tr(110, 110, 70, 40, 15), tr(570, 130, 60, 36, -15), tr(580, 400, 50, 30, 10), sq(110, 420, 60, 30), sq(570, 560, 70, 45), ci(110, 270, 30), tr(220, 650, 160, 90), tr(500, 655, 140, 80), sq(338, 580, 60), rc(600, 260, 80, 30, 20), ci(620, 640, 24), tr(200, 470, 60, 34, -12), tr(470, 470, 50, 30, 12)]),
];
if (ERR.length) throw new Error(ERR.join(' | '));
module.exports = { SCENES };
