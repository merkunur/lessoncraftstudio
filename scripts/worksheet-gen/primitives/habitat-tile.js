/**
 * habitat-tile.js — the G1-398 `habitats` cut-away diorama windows (nt5-F, b6; design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §2 "NEW primitives/habitat-tile.js").
 *
 * Pure SVG on primitives/_tokens.js. Each tile is ONE ecological place drawn as a SIDE
 * cross-section: the place above its surface line AND the section below it (water under
 * the waves, soil under the ground, ice under the waterline), so a wall of windows reads
 * as one museum. A tile is EMPTY: no animal, no animal home, no <text>, no <image>, no
 * coral (coral is reserved for the letter discs and the child's boxes on the page).
 *
 *   id          surface   greyscale identity (what a six-year-old reads)
 *   ocean       y 50      a full-width water band under a wave line, dark fronds of seaweed,
 *                         a sandy seabed with pebbles, rising bubbles; NO banks
 *   pond        y 60      a water BOWL sunk in land between two grassy banks, dark cattail
 *                         heads on both banks, a lily pad with a flower, ripples
 *   forest      y 100     three trees (two scalloped broadleaf crowns + one dark spruce),
 *                         two small trees behind, soil with roots, leaf litter
 *   meadow      y ~86     a rolling LAWN (dense short grass on earth) with white flowers; darker soil; NO tree
 *   polar       y 66      snowflakes, a flat ice floe whose bulk is under the waterline, a
 *                         tall iceberg (most of it under water); white-dominant
 *   savanna     y 92      dry ground with cracks, tall grass tufts, a hot sun, ONE dark
 *                         flat-topped umbrella tree (acacia) + a low bush
 *   rainforest  y 118     NO sky: a wall of giant dark leaves, hanging vines, a buttressed
 *                         trunk; the darkest window by mean luminance
 *
 * API
 *   habitatTile({ id, w = 300, frame = true, attrs }) -> { svg, width, height, meta:{id, surfaceY} }
 *     viewBox 0 0 300 136; height = w x 136 / 300; w < 150 THROWS; an unknown id THROWS.
 *     Every stroke width is given in PAGE px and converted to user units (px / scale, the
 *     body-figure rule), so the frame is 3 px, outlines 2 px and details 1.5 px at every w.
 *   HABITAT_IDS, VIEW_W (300), VIEW_H (136), MIN_W (150), SURFACE
 *   tileBody(id, scale) -> the inner markup (for the gates)
 * Root: <svg data-lcs-prim="habitat-tile" data-lcs-habitat="<id>" data-lcs-surface="<y>">
 *
 * Deviations from the §2 table (each measured, recorded in _work/G1-398-build.md):
 *   ocean surface 34 -> 50 (the table's own rule "white sky >= 30 % except rainforest":
 *   34/136 = 25 %; measured white at 44 = 28 %, at 50 see the gate); polar second floe drawn as a tall iceberg peak (the classic iceberg read;
 *   the §2 floe x 240..290 kept its place); savanna carries a sun; the pond reeds stand on
 *   BOTH banks and the left pair is short (the page's letter disc covers x 0..40 / y 0..38);
 *   forest adds two small background trees (a forest is many trees).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { unionOutline } = require('./map-symbol.js');

const T = tokens.color;
const VIEW_W = 300, VIEW_H = 136, MIN_W = 150;
const HABITAT_IDS = ['ocean', 'pond', 'forest', 'meadow', 'polar', 'savanna', 'rainforest'];
const SURFACE = { ocean: 50, pond: 60, forest: 100, meadow: 86, polar: 66, savanna: 92, rainforest: 118 };
const f2 = (v) => +(+v).toFixed(2);
let _uid = 0;

/** A smooth open path through pts (uniform Catmull-Rom -> cubic), starting with M. */
function catmullOpen(pts) {
  let d = `M${f2(pts[0][0])} ${f2(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f2(c1[0])} ${f2(c1[1])} ${f2(c2[0])} ${f2(c2[1])} ${f2(p2[0])} ${f2(p2[1])}`;
  }
  return d;
}
/** "q a -b 2a 0 t 2a 0 ..." wave from x0 to x1 at y (relative segments). */
function waveD(x0, x1, y, half, amp) {
  let d = `M${x0} ${y} q${half} ${-amp} ${2 * half} 0`;
  for (let x = x0 + 2 * half; x < x1; x += 2 * half) d += ` t${2 * half} 0`;
  return d;
}
/** A tapering sinuous leaf-frond, filled: base centre (x, yb), tip height yt, lean dx. */
function frondD(x, yb, yt, lean, baseW, phase) {
  const N = 14, L = [], R = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const cx = x + lean * t + 4.5 * Math.sin(t * Math.PI * 2.4 + (phase || 0)) * (0.3 + t);
    const cy = yb - t * (yb - yt);
    const hw = (baseW / 2) * (1 - t) + 0.9;
    L.push([cx - hw, cy]); R.push([cx + hw, cy]);
  }
  const pts = [...L, ...R.reverse()];
  return 'M' + pts.map((p) => `${f2(p[0])} ${f2(p[1])}`).join(' L') + ' Z';
}
/** An almond leaf (pointed both ends) from base (x0,y0) to tip (x1,y1), max width wd. */
function leafD(x0, y0, x1, y1, wd) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const m1 = [x0 + dx * 0.35 + nx * wd, y0 + dy * 0.35 + ny * wd], m2 = [x0 + dx * 0.35 - nx * wd, y0 + dy * 0.35 - ny * wd];
  const a1 = [x0 + dx * 0.8 + nx * wd * 0.55, y0 + dy * 0.8 + ny * wd * 0.55], a2 = [x0 + dx * 0.8 - nx * wd * 0.55, y0 + dy * 0.8 - ny * wd * 0.55];
  return `M${f2(x0)} ${f2(y0)} C${f2(m1[0])} ${f2(m1[1])} ${f2(a1[0])} ${f2(a1[1])} ${f2(x1)} ${f2(y1)} C${f2(a2[0])} ${f2(a2[1])} ${f2(m2[0])} ${f2(m2[1])} ${f2(x0)} ${f2(y0)} Z`;
}
/** A regular snowflake: 3 crossing strokes of length len + tiny barbs. */
function snowflake(cx, cy, len, sw) {
  let s = '';
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3 + Math.PI / 2, dx = Math.cos(a) * len / 2, dy = Math.sin(a) * len / 2;
    s += el('line', { x1: f2(cx - dx), y1: f2(cy - dy), x2: f2(cx + dx), y2: f2(cy + dy), stroke: T.teal, 'stroke-width': sw, 'stroke-linecap': 'round' });
  }
  // a small V barb near each of the 6 arm tips (what makes an asterisk a snowflake)
  let d = '';
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 + Math.PI / 2, ux = Math.cos(a), uy = Math.sin(a), b = len * 0.3, r = len * 0.2;
    const mx = cx + ux * b, my = cy + uy * b;
    for (const sgn of [1, -1]) { const ba = a + sgn * Math.PI / 4; d += `M${f2(mx)} ${f2(my)} L${f2(mx + Math.cos(ba) * r)} ${f2(my + Math.sin(ba) * r)} `; }
  }
  s += el('path', { d: d.trim(), fill: 'none', stroke: T.teal, 'stroke-width': sw * 0.8, 'stroke-linecap': 'round' });
  return s;
}
/** A grass tuft of n blades rising from (x, y), height h. */
function tuft(x, y, h, n, sw, spread) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const bx = x + (t - 0.5) * (spread || 6), tx = bx + (t - 0.5) * (spread || 6) * 1.6, ty = y - h * (0.7 + 0.3 * Math.sin(t * Math.PI));
    d += `M${f2(bx)} ${f2(y)} Q${f2(bx + (tx - bx) * 0.2)} ${f2(y - h * 0.5)} ${f2(tx)} ${f2(ty)} `;
  }
  return el('path', { d: d.trim(), fill: 'none', stroke: T.teal, 'stroke-width': sw, 'stroke-linecap': 'round' });
}

function tileBody(id, scale) {
  const px = (p) => f2(p / scale);   // page px -> user units
  const O = px(2), D = px(1.5);       // outline 2 px, detail 1.5 px
  const sky = el('rect', { x: 0, y: 0, width: VIEW_W, height: VIEW_H, fill: T.white });
  switch (id) {
    case 'ocean': {
      const s = SURFACE.ocean;
      const sea = el('path', { d: waveD(0, 300, s, 12.5, 6) + ` L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.tealSoft, 'data-lcs-part': 'water' });
      const waveLine = el('path', { d: waveD(0, 300, s, 12.5, 6), fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round', 'data-lcs-surface-line': '' });
      const ripples = [[52, 70], [178, 68], [96, 90], [262, 86], [150, 106]].map(([x, y]) =>
        el('path', { d: `M${x} ${y} q5 -3 10 0 t10 0`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' })).join('');
      const bed = el('path', { d: `M0 116 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const pebbles = [[40, 126], [112, 128], [262, 124], [196, 129]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 5, ry: 3, fill: T.grid })).join('');
      const fronds = [[34, 68, 6, 0], [214, 66, -6, 1.3], [250, 72, 6, 2.2], [26, 84, -4, 0.8]].map(([x, top, lean, ph]) =>
        el('path', { d: frondD(x, 119, top, lean, 8, ph), fill: T.teal, stroke: T.teal, 'stroke-width': px(1), 'stroke-linejoin': 'round' })).join('');
      const bubbles = [[124, 98, 3], [130, 86, 4], [122, 72, 5]].map(([x, y, r]) => el('circle', { cx: x, cy: y, r, fill: T.white, stroke: T.teal, 'stroke-width': D })).join('');
      const sand = [[18, 124], [72, 130], [90, 122], [140, 124], [168, 131], [226, 126], [284, 130], [240, 121]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 1.4, fill: T.grid })).join('');
      return sky + sea + ripples + fronds + bed + pebbles + sand + bubbles + waveLine;
    }
    case 'pond': {
      const s = SURFACE.pond;
      const ground = el('path', { d: `M0 ${s - 2} Q20 ${s - 4} 40 ${s} L260 ${s} Q280 ${s - 4} 300 ${s - 2} L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.creamDeep, 'data-lcs-part': 'bank' });
      const bowlPts = [[40, s], [86, 104], [150, 118], [214, 104], [260, s]];
      const bowl = catmullOpen(bowlPts);
      const water = el('path', { d: bowl + ` L40 ${s} Z`, fill: T.tealSoft, 'data-lcs-part': 'water' });
      const bowlEdge = el('path', { d: bowl, fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const bankLine = el('path', { d: `M0 ${s - 2} Q20 ${s - 4} 40 ${s} M260 ${s} Q280 ${s - 4} 300 ${s - 2}`, fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      const surf = el('line', { x1: 40, y1: s, x2: 260, y2: s, stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round', 'data-lcs-surface-line': '' });
      const ripples = [[110, 68], [176, 74]].map(([x, y]) => el('path', { d: `M${x - 7} ${y} q7 -4 14 0`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' })).join('');
      const mud = [[112, 110], [128, 114], [146, 116], [162, 115], [178, 112], [196, 106], [100, 104]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 1.8, fill: T.grid })).join('');
      const bankDots = [[14, 96], [26, 118], [276, 100], [288, 122], [18, 128], [250, 124]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 4, ry: 2.4, fill: T.grid })).join('');
      // reeds: two short cattails on the left bank (the page's letter disc sits over x 0..40, y 0..38)
      // and two tall ones on the right bank; each an ink capsule on a teal stem + blade leaves
      const reed = (x, top) => el('line', { x1: x, y1: s, x2: x, y2: top, stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' }) +
        el('rect', { x: x - 3.5, y: top + 3, width: 7, height: 17, rx: 3.5, ry: 3.5, fill: T.ink, 'data-lcs-cattail': '' });
      const reeds = reed(22, 38) + reed(33, 42) + reed(274, 16) + reed(287, 24) +
        el('path', { d: `M18 ${s} Q12 50 8 44 M28 ${s} Q30 50 38 46 M270 ${s} Q262 44 258 34 M283 ${s} Q292 46 297 40 M292 ${s} Q296 54 299 50`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      const pad = el('path', { d: `M200 ${s} m-22 0 a22 6 0 1 0 44 0 a22 6 0 1 0 -44 0 Z`, fill: T.teal }) +
        el('path', { d: `M200 ${s} L218 ${s - 5} L221 ${s - 1} Z`, fill: T.tealSoft });
      const petals = [0, 72, 144, 216, 288].map((a) => { const r = (a - 90) * Math.PI / 180; return el('ellipse', { cx: f2(212 + 5 * Math.cos(r)), cy: f2(s - 7 + 5 * Math.sin(r)), rx: 3.2, ry: 4.6, transform: `rotate(${a} ${f2(212 + 5 * Math.cos(r))} ${f2(s - 7 + 5 * Math.sin(r))})`, fill: T.white, stroke: T.teal, 'stroke-width': px(1) }); }).join('');
      const flower = petals + el('circle', { cx: 212, cy: s - 7, r: 2.4, fill: T.creamDeep, stroke: T.teal, 'stroke-width': px(1) });
      const weed = el('path', { d: `M96 112 q-4 -10 0 -18 t0 -16 M226 96 q4 -8 0 -16`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      const bankGrass = tuft(8, s - 2, 7, 3, D) + tuft(46, s + 4, 6, 3, D) + tuft(256, s + 4, 6, 3, D) + tuft(296, s - 2, 6, 3, D);
      return sky + ground + bankDots + water + mud + weed + bowlEdge + surf + bankLine + bankGrass + ripples + reeds + pad + flower;
    }
    case 'forest': {
      const s = SURFACE.forest;
      const groundTop = [[0, s + 2], [60, s - 1], [120, s + 1], [180, s - 1], [240, s + 1], [300, s - 1]];
      const top = catmullOpen(groundTop);
      const ground = el('path', { d: top + ` L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.creamDeep, 'data-lcs-part': 'soil' });
      const groundLine = el('path', { d: top, fill: 'none', stroke: T.teal, 'stroke-width': O, 'data-lcs-surface-line': '' });
      // background trees: two small light spruces between the big trees
      const bgSpruce = (x, apex, base, w) => el('path', { d: `M${x} ${apex} L${x + w / 2} ${base} L${x - w / 2} ${base} Z`, fill: T.tealSoft, stroke: T.teal, 'stroke-width': D, 'stroke-linejoin': 'round' }) +
        el('line', { x1: x, y1: base, x2: x, y2: s, stroke: T.teal, 'stroke-width': O });
      const bg = bgSpruce(112, 40, 88, 30) + bgSpruce(186, 34, 86, 30);
      const crown = (cx, cy, k) => {
        const R = 22 * k, r = 10 * k;
        return el('path', { d: unionOutline([{ x: cx, y: cy, r: R }, ...Array.from({ length: 9 }, (_, i) => ({ x: cx + R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 9), y: cy + R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 9), r }))]), fill: T.tealSoft, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      };
      const trunk = (x0, x1, y0) => el('path', { d: `M${x0} ${s + 1} L${x0 + 1} ${y0} L${x1 - 1} ${y0} L${x1} ${s + 1} Z`, fill: T.grid, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const roots = (x) => el('path', { d: `M${x} ${s + 2} q-8 10 -20 16 M${x} ${s + 2} q0 12 -4 24 M${x} ${s + 2} q6 12 20 18 M${x} ${s + 2} q10 6 22 6`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      const litter = [[28, s + 8], [104, s + 10], [150, s + 20], [196, s + 9], [282, s + 14]].map(([x, y], i) => el('ellipse', { cx: x, cy: y, rx: 6, ry: 2.6, transform: `rotate(${i % 2 ? 18 : -14} ${x} ${y})`, fill: T.tealSoft, stroke: T.teal, 'stroke-width': px(1) })).join('');
      const pebbles = [[60, 128], [126, 124], [244, 130]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 4, ry: 2.4, fill: T.grid })).join('');
      const conifer = el('rect', { x: 146, y: 76, width: 8, height: s + 1 - 76, fill: T.grid, stroke: T.teal, 'stroke-width': D }) +
        [[8, 34, 44], [22, 56, 56], [40, 80, 68]].map(([apex, base, w]) => el('path', { d: `M150 ${apex} L${150 + w / 2} ${base} L${150 - w / 2} ${base} Z`, fill: T.teal, stroke: T.teal, 'stroke-width': px(1), 'stroke-linejoin': 'round' })).join('');
      const grass = tuft(88, s, 8, 3, D) + tuft(206, s, 8, 3, D) + tuft(268, s, 7, 3, D);
      return sky + bg + ground + roots(70) + roots(224) + litter + pebbles + groundLine + trunk(64, 76, 56) + crown(70, 40, 1) + trunk(218, 231, 60) + crown(224, 38, 1.15) + conifer + grass;
    }
    case 'meadow': {
      const s = SURFACE.meadow;
      const topPts = [[0, s + 6], [70, s - 4], [150, s + 6], [230, s - 2], [300, s + 6]];
      const top = catmullOpen(topPts);
      // fix round 1 (fi panel): the tealSoft hill read as WATER. Now earth (creamDeep) under a dense LAWN — rows of
      // short teal grass blades — so it reads as grass in colour AND as a textured mid-grey in mono; the soil band
      // below is the darker earth (grid) with root hairs
      const hill = el('path', { d: top + ` L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.creamDeep, 'data-lcs-part': 'grass' });
      let lawnD = '';
      for (let row = 0, y = s + 4; y <= 116; row++, y += 6.5) {
        for (let x = 4 + (row % 2) * 4.5; x < 298; x += 9) {
          const g = (() => { for (let i = 0; i < topPts.length - 1; i++) if (x >= topPts[i][0] && x <= topPts[i + 1][0]) { const t = (x - topPts[i][0]) / (topPts[i + 1][0] - topPts[i][0]); return topPts[i][1] + (topPts[i + 1][1] - topPts[i][1]) * (0.5 - 0.5 * Math.cos(Math.PI * t)); } return s; })();
          if (y < g + 5) continue;
          lawnD += `M${f2(x - 1.6)} ${f2(y)} l-1.2 -4.2 M${f2(x)} ${f2(y)} l0 -5 M${f2(x + 1.6)} ${f2(y)} l1.2 -4.2 `;
        }
      }
      const lawn = el('path', { d: lawnD.trim(), fill: 'none', stroke: T.teal, 'stroke-width': px(1.1), 'stroke-linecap': 'round', 'data-lcs-lawn': '' });
      const hillLine = el('path', { d: top, fill: 'none', stroke: T.teal, 'stroke-width': O, 'data-lcs-surface-line': '' });
      const soil = el('path', { d: `M0 120 q37.5 -3 75 0 t75 0 t75 0 t75 0 L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.grid, stroke: T.teal, 'stroke-width': D });
      const hairs = [30, 96, 170, 236, 280].map((x) => el('path', { d: `M${x} 120 q-2 5 -5 9 M${x} 120 q2 6 5 8`, fill: 'none', stroke: T.teal, 'stroke-width': px(1), 'stroke-linecap': 'round' })).join('');
      const yAt = (x) => { // the hill top at x (sampled from the catmull points, linear enough for placement)
        for (let i = 0; i < topPts.length - 1; i++) if (x >= topPts[i][0] && x <= topPts[i + 1][0]) { const t = (x - topPts[i][0]) / (topPts[i + 1][0] - topPts[i][0]); return topPts[i][1] + (topPts[i + 1][1] - topPts[i][1]) * (0.5 - 0.5 * Math.cos(Math.PI * t)); }
        return s;
      };
      const flower = (x, h) => {
        const g = yAt(x) + 4, cy = g - h;
        const stem = el('path', { d: `M${x} ${f2(g)} Q${x - 3} ${f2(g - h / 2)} ${x} ${f2(cy)}`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' }) +
          el('path', { d: leafD(x, g - h * 0.35, x + 9, g - h * 0.55, 2.6), fill: T.teal });
        const pet = [0, 72, 144, 216, 288].map((a) => { const r = (a - 90) * Math.PI / 180, ex = f2(x + 5.5 * Math.cos(r)), ey = f2(cy + 5.5 * Math.sin(r)); return el('ellipse', { cx: ex, cy: ey, rx: 4, ry: 6, transform: `rotate(${a} ${ex} ${ey})`, fill: T.white, stroke: T.teal, 'stroke-width': px(1.2) }); }).join('');
        return stem + pet + el('circle', { cx: x, cy: f2(cy), r: 3, fill: T.creamDeep, stroke: T.teal, 'stroke-width': px(1) });
      };
      const flowers = [[58, 34], [104, 26], [146, 38], [192, 30], [236, 40], [276, 26], [26, 26]].map(([x, h]) => flower(x, h)).join('');
      const blades = [12, 44, 80, 124, 166, 212, 256, 294, 170].map((x, i) => tuft(x, f2(yAt(x) + 4), 9 + (i % 3) * 3, 3, D)).join('');
      return sky + hill + lawn + soil + hairs + blades + hillLine + flowers;
    }
    case 'polar': {
      const s = SURFACE.polar;
      const flakes = [[72, 18], [118, 36], [168, 14], [212, 32], [176, 46], [236, 10], [124, 8], [60, 44]].map(([x, y]) => snowflake(x, y, 11, D)).join('');
      const sea = el('rect', { x: 0, y: s, width: VIEW_W, height: VIEW_H - s, fill: T.tealSoft, 'data-lcs-part': 'water' });
      const ripples = [[150, 118], [60, 124], [226, 104], [270, 124]].map(([x, y]) => el('path', { d: `M${x} ${y} q5 -3 10 0 t10 0`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' })).join('');
      // floe 1: a flat slab, top at y 58 with snow bumps, its bulk hanging under the waterline to y 110
      const floe1 = `M0 58 L28 58 A6 6 0 0 1 40 58 L92 58 A7 7 0 0 1 106 58 L152 58 A6 6 0 0 1 164 58 L210 58 L216 ${s} ` +
        `L212 78 L198 90 L186 86 L168 102 L140 98 L118 110 L92 104 L66 108 L40 100 L18 106 L0 98 Z`;
      // floe 2: a tall iceberg peak (x 240..290), most of it under the water
      const floe2 = `M246 ${s} L252 44 L262 26 L270 34 L276 22 L284 46 L290 ${s} L296 84 L284 100 L266 108 L250 98 L240 84 Z`;
      const ice = el('path', { d: floe1, fill: T.white, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round', 'data-lcs-part': 'ice' }) +
        el('path', { d: floe2, fill: T.white, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round', 'data-lcs-part': 'ice' });
      const cracks = el('path', { d: 'M60 60 l4 8 l-3 8 M132 60 l-3 10 l5 9 M186 62 l-4 9 M266 40 l3 12 l-4 10', fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      // the waterline: solid over open water, dashed across the ice (so the child sees how much ice is UNDER it)
      const openWater = el('path', { d: `M216 ${s} L246 ${s} M290 ${s} L300 ${s}`, fill: 'none', stroke: T.teal, 'stroke-width': O, 'data-lcs-surface-line': '' });
      const waterOverIce = el('path', { d: `M0 ${s} L216 ${s} M246 ${s} L290 ${s}`, fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-dasharray': `${px(4)} ${px(4)}` });
      return sky + flakes + sea + ripples + ice + cracks + openWater + waterOverIce;
    }
    case 'savanna': {
      const s = SURFACE.savanna;
      const sun = el('circle', { cx: 92, cy: 30, r: 11, fill: T.white, stroke: T.teal, 'stroke-width': O }) +
        Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return el('line', { x1: f2(92 + 15 * Math.cos(a)), y1: f2(30 + 15 * Math.sin(a)), x2: f2(92 + 21 * Math.cos(a)), y2: f2(30 + 21 * Math.sin(a)), stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' }); }).join('');
      const hills = el('path', { d: `M0 ${s} Q34 ${s - 16} 70 ${s} M150 ${s} Q200 ${s - 12} 240 ${s} M250 ${s} Q280 ${s - 10} 300 ${s - 4}`, fill: 'none', stroke: T.grid, 'stroke-width': D });
      const ground = el('rect', { x: 0, y: s, width: VIEW_W, height: VIEW_H - s, fill: T.creamDeep, 'data-lcs-part': 'soil' });
      const horizon = el('line', { x1: 0, y1: s, x2: VIEW_W, y2: s, stroke: T.teal, 'stroke-width': D, 'data-lcs-surface-line': '' });
      const cracks = el('path', { d: `M30 ${s + 18} l6 4 l-2 6 l7 3 M112 ${s + 30} l-5 5 l4 4 M170 ${s + 16} l7 3 l-1 6 M252 ${s + 28} l-6 4 l3 6`, fill: 'none', stroke: T.grid, 'stroke-width': D, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      const tufts = [[16, 20], [70, 16], [126, 22], [150, 14], [248, 18], [284, 22], [100, 14]].map(([x, h]) => tuft(x, s + 4, h, 5, D, 10)).join('');
      const trunk = el('path', { d: `M194 ${s + 1} L193 72 L180 46 L186 44 L197 64 L204 44 L210 46 L201 72 L201 ${s + 1} Z`, fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' }) +
        el('path', { d: 'M183 47 L170 44 M207 46 L226 42', fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      const crownD = 'M140 50 Q142 42 158 38 Q176 30 204 29 Q236 29 252 37 Q266 42 268 50 Z';
      const crown = el('path', { d: crownD, fill: T.teal, stroke: T.teal, 'stroke-width': px(1), 'stroke-linejoin': 'round', 'data-lcs-acacia': '' });
      const bush = el('path', { d: unionOutline([{ x: 38, y: s - 2, r: 9 }, { x: 52, y: s - 5, r: 11 }, { x: 64, y: s - 1, r: 8 }]), fill: T.tealSoft, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      return sky + sun + hills + ground + cracks + horizon + bush + trunk + crown + tufts;
    }
    case 'rainforest': {
      const s = SURFACE.rainforest;
      const bg = el('rect', { x: 0, y: 0, width: VIEW_W, height: VIEW_H, fill: T.tealSoft, 'data-lcs-part': 'canopy' });
      const bgTrunk = el('rect', { x: 150, y: 0, width: 12, height: s, fill: T.grid, stroke: T.teal, 'stroke-width': D });
      const trunk = el('path', { d: `M238 0 L238 96 Q236 110 220 ${s} L232 ${s} Q240 110 244 106 L246 ${s} L254 ${s} L254 106 Q258 110 268 ${s} L282 ${s} Q264 110 262 96 L262 0 Z`, fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      // hanging vines: x(y) = x0 + amp * sin(y / 30); the leaves grow OUT of the vine (their base is on it)
      const vx = (x0, amp, y) => x0 + amp * Math.sin(y / 30);
      const vine = (x0, amp, len) => {
        const pts = []; for (let y = 0; y <= len; y += 6) pts.push([vx(x0, amp, y), y]);
        let lv = '';
        for (const [y, dir] of [[20, 1], [44, -1], [68, 1], [len - 4, -1]]) { const bx = vx(x0, amp, y); lv += el('path', { d: leafD(bx, y, bx + dir * 15, y + 7, 4.2), fill: T.teal }); }
        return el('path', { d: catmullOpen(pts), fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' }) + lv;
      };
      const vines = vine(74, 5, 92) + vine(118, 4, 70) + vine(196, 5, 100) + vine(286, 4, 64);
      const leaf = (x0, y0, x1, y1, wd) => el('path', { d: leafD(x0, y0, x1, y1, wd), fill: T.teal, stroke: T.teal, 'stroke-width': px(1), 'stroke-linejoin': 'round' }) +
        el('path', { d: `M${x0} ${y0} Q${f2((x0 + x1) / 2)} ${f2((y0 + y1) / 2 - 3)} ${f2(x0 + (x1 - x0) * 0.9)} ${f2(y0 + (y1 - y0) * 0.9)}`, fill: 'none', stroke: T.white, 'stroke-width': D, 'stroke-linecap': 'round' });
      // the canopy: a row of dark leaves hanging from the top edge (the sky is hidden by leaves)
      const canopy = [[44, 26, 60], [96, 22, 76], [138, 24, 122], [176, 20, 160], [214, 26, 232], [262, 22, 282], [300, 26, 272]].map(([x, y, tx]) => leaf(x, -4, tx, y, 8)).join('');
      const leaves = leaf(0, 70, 62, 52, 12) + leaf(0, 104, 70, 96, 13) + leaf(96, 118, 142, 64, 12) + leaf(300, 50, 236, 40, 12) + leaf(300, 88, 232, 80, 13) +
        leaf(40, 118, 20, 58, 10) + leaf(206, 118, 186, 66, 11) + leaf(122, 118, 110, 80, 9);
      const floor = el('path', { d: `M0 ${s} q25 -3 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 L300 ${VIEW_H} L0 ${VIEW_H} Z`, fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'data-lcs-surface-line': '' });
      const fern = tuft(66, s + 1, 12, 5, D, 12) + tuft(172, s + 1, 10, 4, D, 10);
      return bg + bgTrunk + vines + trunk + floor + leaves + canopy + fern;
    }
    default:
      throw new Error(`habitat-tile: unknown id "${id}"`);
  }
}

function habitatTile({ id, w = 300, frame = true, attrs } = {}) {
  if (!HABITAT_IDS.includes(id)) throw new Error(`habitat-tile: unknown id "${id}" (${HABITAT_IDS.join(', ')}; desert and mountain are not drawn: no pool)`);
  if (!(w >= MIN_W)) throw new Error(`habitat-tile: w ${w} < ${MIN_W} (the floor)`);
  const scale = w / VIEW_W, h = f2(VIEW_H * scale);
  const cid = `hbclip${++_uid}`;
  const px = (p) => f2(p / scale);
  const clip = el('clipPath', { id: cid }, el('rect', { x: 1.5, y: 1.5, width: 297, height: 133, rx: 10, ry: 10 }));
  const body = el('g', { 'clip-path': `url(#${cid})` }, tileBody(id, scale));
  const border = frame ? el('rect', { x: 1.5, y: 1.5, width: 297, height: 133, rx: 10, ry: 10, fill: 'none', stroke: T.teal, 'stroke-width': px(3), 'data-lcs-frame': '' }) : '';
  const svg = svgRoot({ width: f2(w), height: h, viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, label: '' },
    el('defs', {}, clip) + body + border,
    { 'data-lcs-prim': 'habitat-tile', 'data-lcs-habitat': id, 'data-lcs-surface': SURFACE[id], 'aria-hidden': 'true', ...(attrs || {}) });
  return { svg, width: f2(w), height: h, meta: { id, surfaceY: SURFACE[id] } };
}

module.exports = { habitatTile, tileBody, HABITAT_IDS, SURFACE, VIEW_W, VIEW_H, MIN_W, catmullOpen, leafD };
