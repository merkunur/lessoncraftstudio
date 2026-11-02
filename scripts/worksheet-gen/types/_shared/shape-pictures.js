/**
 * Shape Pictures (K-464, Shapes & Geometry maker, 2026-11-02) — a picture built from flat shapes (a house, a train, a
 * robot …) printed in OUTLINE; a key below gives each kind of shape its crayon colour. The child colours every shape
 * the colour of its kind, then counts each kind and writes how many (K.G.2 — name shapes whatever their size or
 * orientation — and counting). The answer key shows the picture coloured and the counts.
 *
 * One right answer, by construction:
 *   - pieces only TOUCH or NEST (a window inside a wall): never overlap, so no shape hides another and no new shape is
 *     made by two overlapping pieces (checked on the geometry, build and verify);
 *   - a page shows squares OR rectangles, never both: "a square is a rectangle" is grade 3, and a kindergarten child
 *     counting rectangles must not have to decide whether a square counts;
 *   - every rectangle is clearly not a square (long side ≥ 1.5 × the short one); every triangle has no angle under 25°;
 *   - the colours never follow the kinds in the OUTLINE picture (it has no colour at all).
 * Levels: 1 — three kinds (circle, triangle, square or rectangle), few pieces; 2 — a fourth kind, the hexagon; 3 — more
 * pieces and shapes turned (a square standing on a corner, a turned hexagon, a turned rectangle).
 * The scenes are drawn here (no library art): each has its own options (windows, wheels, smoke, snowflakes …) so the
 * counts change from copy to copy.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { answerBox } = require('../../templates/components.js');

const W = 600, H = 440;                       // the scene's own box
const INK = tokens.color.ink;
const CRAYONS = ['codeRed', 'codeBlue', 'codeYellow', 'codeGreen', 'codeOrange', 'codePurple', 'codePink'].map((k) => tokens.codeColors[k]);
const KINDS = ['circle', 'triangle', 'square', 'rectangle', 'hexagon'];

// ---------- pieces ----------
const rot = (pts, cx, cy, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]); };
const R = (x, y, w, h, deg = 0) => ({ kind: Math.abs(w - h) < 0.01 ? 'square' : 'rectangle', w, h, pts: rot([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], x + w / 2, y + h / 2, deg), turned: deg % 90 !== 0 });
const S = (x, y, s, deg = 0) => R(x, y, s, s, deg);
const T = (a, b, c) => ({ kind: 'triangle', pts: [a, b, c] });
const C = (cx, cy, r) => ({ kind: 'circle', cx, cy, r, pts: Array.from({ length: 48 }, (_, k) => [cx + r * Math.cos(k * Math.PI / 24), cy + r * Math.sin(k * Math.PI / 24)]) });
const Hx = (cx, cy, r, deg = 0) => ({ kind: 'hexagon', pts: Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos((deg + 60 * k) * Math.PI / 180), cy + r * Math.sin((deg + 60 * k) * Math.PI / 180)]), turned: deg % 60 !== 0 });

// ---------- geometry checks ----------
const EPS = 0.6;
function onSeg(p, a, b) { const cr = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); const len = Math.hypot(b[0] - a[0], b[1] - a[1]); if (Math.abs(cr) / len > EPS) return false; const t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / (len * len); return t >= -EPS / len && t <= 1 + EPS / len; }
/** 1 inside, 0 on the boundary, -1 outside */
function where(p, P) {
  for (let i = 0; i < P.length; i++) if (onSeg(p, P[i], P[(i + 1) % P.length])) return 0;
  let inside = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, yi] = P[i], [xj, yj] = P[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside ? 1 : -1;
}
function properCross(a, b, c, d) {
  const o = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const d1 = o(c, d, a), d2 = o(c, d, b), d3 = o(a, b, c), d4 = o(a, b, d);
  const n1 = Math.hypot(d[0] - c[0], d[1] - c[1]), n2 = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return ((d1 / n1 > EPS && d2 / n1 < -EPS) || (d1 / n1 < -EPS && d2 / n1 > EPS)) && ((d3 / n2 > EPS && d4 / n2 < -EPS) || (d3 / n2 < -EPS && d4 / n2 > EPS));
}
/** how two pieces sit: 'apart' (disjoint or touching), 'nested' (one inside the other), 'overlap' */
function relation(A, B) {
  const P = A.pts, Q = B.pts;
  for (let i = 0; i < P.length; i++) for (let j = 0; j < Q.length; j++) if (properCross(P[i], P[(i + 1) % P.length], Q[j], Q[(j + 1) % Q.length])) return 'overlap';
  const a = P.map((p) => where(p, Q)), b = Q.map((q) => where(q, P));
  // the centre of a piece tells a circle sitting exactly inside another apart from one sitting outside it
  const cen = (X) => [X.reduce((s, p) => s + p[0], 0) / X.length, X.reduce((s, p) => s + p[1], 0) / X.length];
  if (a.every((x) => x >= 0) && (a.some((x) => x > 0) || where(cen(P), Q) > 0)) return 'nested';
  if (b.every((x) => x >= 0) && (b.some((x) => x > 0) || where(cen(Q), P) > 0)) return 'nested';
  if (a.some((x) => x > 0) || b.some((x) => x > 0)) return 'overlap';
  return 'apart';
}
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
function angleAt(P, i) { const a = P[(i + P.length - 1) % P.length], b = P[i], c = P[(i + 1) % P.length]; const u = [a[0] - b[0], a[1] - b[1]], v = [c[0] - b[0], c[1] - b[1]]; return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; }
/** the kind a piece's own corners make (never the label it was built with) */
function kindOf(P, isCircle) {
  if (isCircle) return 'circle';
  if (P.length === 3) return Math.min(angleAt(P, 0), angleAt(P, 1), angleAt(P, 2)) >= 25 ? 'triangle' : 'thin triangle';
  if (P.length === 6) { const s = P.map((p, i) => dist(p, P[(i + 1) % 6])); return Math.max(...s) - Math.min(...s) < 0.5 && P.every((_, i) => Math.abs(angleAt(P, i) - 120) < 0.5) ? 'hexagon' : 'other'; }
  if (P.length === 4) {
    if (!P.every((_, i) => Math.abs(angleAt(P, i) - 90) < 0.5)) return 'other';
    const a = dist(P[0], P[1]), b = dist(P[1], P[2]);
    if (Math.abs(a - b) < 0.5) return 'square';
    return Math.max(a, b) / Math.min(a, b) >= 1.5 ? 'rectangle' : 'nearly square';
  }
  return 'other';
}
/** every rule of the module docblock, on a list of pieces; returns the failures */
function checkPieces(pieces) {
  const fails = [];
  pieces.forEach((p, i) => {
    const k = kindOf(p.pts, p.kind === 'circle');
    if (k !== p.kind) fails.push(`piece ${i} is drawn as a ${k}, labelled ${p.kind}`);
    const xs = p.pts.map((q) => q[0]), ys = p.pts.map((q) => q[1]);
    if (Math.min(...xs) < -EPS || Math.max(...xs) > W + EPS || Math.min(...ys) < -EPS || Math.max(...ys) > H + EPS) fails.push(`piece ${i} (${p.kind}) leaves the picture`);
    // big enough to colour and to tell apart (the reviewer: 6-9 mm was too small for a five-year-old): 26 units ~ 7 mm on
    // the page, a hexagon 34 units across its flats ~ 10 mm (a small hexagon reads as a circle)
    const minSide = Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    if (minSide < (p.kind === 'hexagon' ? 34 : 26)) fails.push(`piece ${i} (${p.kind}) is too small to colour`);
  });
  for (let i = 0; i < pieces.length; i++) for (let j = i + 1; j < pieces.length; j++) if (relation(pieces[i], pieces[j]) === 'overlap') fails.push(`pieces ${i} (${pieces[i].kind}) and ${j} (${pieces[j].kind}) overlap`);
  const ks = new Set(pieces.map((p) => p.kind));
  if (ks.has('square') && ks.has('rectangle')) fails.push('squares and rectangles on one page');
  return fails;
}

// ---------- the scenes (each: quad = the one four-sided kind it uses; hex / turned = what it can show) ----------
const pick = (rng, a) => a[rng.int(0, a.length - 1)];
const SCENES = {
  house: { quad: 'rectangle', hex: true, turned: true, build(rng, o) {
    const p = [R(160, 215, 280, 175), T([140, 215], [460, 215], [300, 105]), R(275, 290, 50, 100)];
    const wins = pick(rng, o.level === 1 ? [1, 2] : [2, 2, 1]);
    p.push(R(185, 245, 66, 40)); if (wins === 2) p.push(R(349, 245, 66, 40));
    if (o.hex) p.push(Hx(300, 172, 22, o.turned ? 30 : 0)); else if (rng.next() < 0.6) p.push(C(300, 172, 20));
    p.push(C(70, 72, 38));
    const trees = o.level === 1 ? pick(rng, [0, 1]) : pick(rng, [1, 2]);
    if (trees >= 1) p.push(R(61, 330, 28, 60), T([30, 330], [120, 330], [75, 240]));
    if (trees === 2) p.push(R(511, 330, 28, 60), T([480, 330], [570, 330], [525, 240]));
    else if (o.turned) p.push(R(510, 150, 70, 40, 25), T([520, 210], [570, 210], [545, 250]));   // a turned sign, a bunting flag
    if (o.level > 1 && rng.next() < 0.5) p.push(C(470, 60, 22));
    return p;
  } },
  train: { quad: 'square', hex: true, turned: true, build(rng, o) {
    const p = [];
    const cars = o.level === 1 ? 1 : pick(rng, [1, 2]);
    const x0 = cars === 2 ? 15 : 125;
    for (let c = 0; c < cars; c++) {
      const x = x0 + c * 110;
      p.push(S(x, 180, 100));
      if (o.turned && c === 0) p.push(S(x + 22, 202, 56, 45));
      else if (rng.next() < 0.5) p.push(S(x + 30, 205, 40)); else p.push(S(x + 12, 200, 32), S(x + 56, 200, 32));
      p.push(C(x + 25, 302, 20), C(x + 75, 302, 20));
    }
    const e = x0 + cars * 110;                                       // the engine
    p.push(S(e, 170, 110), S(e + 25, 190, 45), S(e + 110, 215, 65), S(e + 125, 180, 35), T([e + 175, 280], [e + 175, 240], [e + 215, 280]));
    p.push(C(e + 30, 302, 22), C(e + 85, 302, 22), C(e + 142, 302, 22));
    const smoke = o.level === 1 ? pick(rng, [1, 2]) : pick(rng, [2, 3]);
    [[e + 142, 152, 15], [e + 162, 115, 18], [e + 192, 78, 21]].slice(0, smoke).forEach(([x, y, r]) => p.push(C(x, y, r)));
    if (o.hex) p.push(Hx(e + 142.5, 247.5, 20, o.turned ? 30 : 0));
    if (o.level > 1 && rng.next() < 0.5) p.push(C(60, 70, 34));
    return p;
  } },
  robot: { quad: 'square', hex: true, turned: true, build(rng, o) {
    const p = [S(240, 60, 120), C(300, 42, 18), S(285, 180, 30), S(210, 210, 180)];
    if (o.turned) p.push(S(260, 95, 26, 45), S(314, 95, 26, 45)); else p.push(C(275, 105, 15), C(325, 105, 15));
    p.push(T([278, 138], [322, 138], [300, 166]));
    const buttons = o.level === 1 ? pick(rng, [2, 3]) : pick(rng, [1, 2, 3]);
    [250, 290, 330].slice(0, buttons).forEach((y) => p.push(C(300, y, 13)));
    if (rng.next() < 0.6) p.push(o.turned ? S(232, 250, 36, 45) : S(234, 250, 36));
    p.push(S(170, 230, 40), S(130, 230, 40), C(112, 250, 18), S(390, 230, 40), S(430, 230, 40), C(488, 250, 18));
    p.push(S(235, 390, 45), S(320, 390, 45));
    if (o.hex) { p.push(Hx(220, 120, 20), Hx(380, 120, 20)); if (o.level === 3) p.push(Hx(360, 362, 20, 30)); }
    return p;
  } },
  rocket: { quad: 'rectangle', hex: true, turned: true, build(rng, o) {
    const p = [R(250, 110, 100, 220), T([250, 110], [350, 110], [300, 40]), T([250, 260], [250, 330], [205, 330]), T([350, 260], [350, 330], [395, 330])];
    const wins = o.level === 1 ? pick(rng, [1, 2]) : pick(rng, [2, 3]);
    [160, 210, 255].slice(0, wins).forEach((y, i) => p.push(o.hex && i === 0 ? Hx(300, y, 20, 30) : C(300, y, 18)));
    const flames = pick(rng, o.level === 1 ? [1, 2] : [2, 3]);
    (flames === 3 ? [252, 286, 320] : flames === 2 ? [266, 306] : [286]).forEach((x) => p.push(T([x, 330], [x + 28, 330], [x + 14, 380])));
    p.push(C(500, 90, 45));
    if (rng.next() < 0.6) p.push(C(95, 330, 28));
    if (o.turned) p.push(C(110, 110, 18), R(40, 97, 44, 26, 30), R(136, 97, 44, 26, 30));   // a satellite with turned panels
    if (o.hex && o.level === 3) p.push(Hx(520, 330, 22, 15));
    return p;
  } },
  castle: { quad: 'square', hex: true, turned: true, build(rng, o) {
    const p = [S(200, 180, 200), S(270, 320, 60)];
    if (o.hex) p.push(Hx(300, 270, 22));
    p.push(S(225, 205, 40), S(335, 205, 40));
    for (const x of [120, 400]) {
      p.push(S(x, 300, 80), S(x, 220, 80), T([x, 220], [x + 80, 220], [x + 40, 150]));
      if (o.turned) p.push(S(x + 22, 242, 36, 45)); else if (rng.next() < 0.7) p.push(S(x + 24, 244, 32));
    }
    const merlons = o.level === 1 ? 2 : pick(rng, [2, 3]);
    (merlons === 3 ? [200, 286, 372] : [220, 352]).forEach((x) => p.push(S(x, 152, 28)));
    p.push(C(60, 70, 36));
    if (o.level > 1 && rng.next() < 0.5) p.push(T([150, 150], [150, 120], [185, 135]));   // a flag on a tower
    return p;
  } },
  snowman: { quad: 'rectangle', hex: true, turned: true, build(rng, o) {
    const p = [C(300, 344, 62), C(300, 232, 50), C(300, 142, 40), R(250, 76, 100, 26), R(282, 0, 36, 76)];
    p.push(C(285, 126, 13), C(315, 126, 13), T([297, 136], [297, 162], [332, 149]));
    const buttons = o.level === 1 ? pick(rng, [2, 3]) : pick(rng, [1, 2, 3]);
    [200, 232, 264].slice(0, buttons).forEach((y) => p.push(C(300, y, 13)));
    p.push(T([60, 370], [160, 370], [110, 250]), R(96, 370, 28, 55));
    if (o.level > 1 || rng.next() < 0.5) p.push(T([450, 370], [550, 370], [500, 260]), R(486, 370, 28, 55));
    if (o.hex) { const n = o.level === 3 ? 3 : 2; [[80, 80], [520, 110], [470, 40]].slice(0, n).forEach(([x, y], i) => p.push(Hx(x, y, 20, o.turned && i === 1 ? 30 : 0))); }
    else if (rng.next() < 0.5) p.push(C(500, 70, 30));
    return p;
  } },
  sailboat: { quad: 'rectangle', hex: true, turned: false, build(rng, o) {
    const p = [R(170, 300, 260, 50), R(287, 90, 26, 210), T([287, 110], [287, 285], [175, 285]), T([313, 130], [313, 285], [405, 285])];
    if (o.level > 1 || rng.next() < 0.5) p.push(T([313, 92], [313, 122], [352, 107]));
    const ports = o.level === 1 ? pick(rng, [1, 2]) : pick(rng, [2, 3, 4]);
    [215, 255, 345, 385].slice(0, ports).forEach((x) => p.push(C(x, 325, 14)));
    p.push(C(510, 80, 40));
    if (o.hex) p.push(Hx(520, 330, 22));
    if (o.level > 1 && rng.next() < 0.6) p.push(R(60, 360, 70, 28));   // a floating plank
    return p;
  } },
  bus: { quad: 'rectangle', hex: true, turned: false, build(rng, o) {
    const p = [R(40, 170, 450, 170), R(410, 200, 46, 140), C(130, 370, 30), C(410, 370, 30), C(474, 300, 14)];
    const wins = o.level === 1 ? pick(rng, [2, 3]) : pick(rng, [3, 4]);
    [65, 155, 245, 335].slice(0, wins).forEach((x) => p.push(R(x, 195, 70, 46)));
    if (o.hex) p.push(Hx(130, 370, 20), Hx(410, 370, 20));          // a hub on both wheels
    p.push(C(70, 80, 40));
    p.push(T([505, 320], [600, 320], [552, 200]), R(539, 320, 26, 80));   // a tree by the road (a wide crown on a short trunk: never a sign post)
    return p;
  } },
};

const LEVELS = {
  1: { kinds: 3, hex: false, turned: false, max: 6 },
  2: { kinds: 4, hex: true, turned: false, max: 8 },
  3: { kinds: 4, hex: true, turned: true, max: 10 },
};

/** a scene at a level: its pieces, its kinds and their counts (counts all different where the scene can do it) */
function makeScene(name, level, rng) {
  const sc = SCENES[name], L = LEVELS[level];
  const o = { level, hex: L.hex && sc.hex, turned: L.turned && sc.turned };
  let best = null;
  for (let t = 0; t < 12; t++) {
    const pieces = sc.build(rng, o);
    const counts = {};
    pieces.forEach((p) => { counts[p.kind] = (counts[p.kind] || 0) + 1; });
    const vals = Object.values(counts);
    const score = new Set(vals).size - (Math.max(...vals) > L.max ? 10 : 0);
    if (!best || score > best.score) best = { pieces, counts, score };
    if (new Set(vals).size === vals.length && Math.max(...vals) <= L.max) break;
  }
  const fails = checkPieces(best.pieces);
  if (fails.length) throw new Error(`shape-pictures ${name} L${level}: ${fails.slice(0, 3).join('; ')}`);
  const kinds = KINDS.filter((k) => best.counts[k]);
  if (kinds.length !== L.kinds) throw new Error(`shape-pictures ${name} L${level}: ${kinds.length} kinds, the level shows ${L.kinds}`);
  return { pieces: best.pieces, kinds, counts: best.counts };
}

// ---------- drawing ----------
const f1 = (v) => Math.round(v * 10) / 10;
function pieceSvg(p, fill, i) {
  const data = ` data-lcs-shape="${p.kind}" data-lcs-piece="${i}"${p.turned ? ' data-lcs-turned="1"' : ''}`;
  if (p.kind === 'circle') return `<circle cx="${f1(p.cx)}" cy="${f1(p.cy)}" r="${f1(p.r)}" fill="${fill}" stroke="${INK}" stroke-width="3"${data}/>`;
  return `<polygon points="${p.pts.map(([x, y]) => f1(x) + ',' + f1(y)).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"${data} data-lcs-pts="${p.pts.map(([x, y]) => f1(x) + ',' + f1(y)).join(' ')}"/>`;
}
/** the key's icon of a kind: the shape upright, filled with its crayon colour */
function legendIcon(kind, color, px) {
  const m = 4, s = px - 2 * m;
  const shape = kind === 'circle' ? `<circle cx="${px / 2}" cy="${px / 2}" r="${s / 2}"/>`
    : kind === 'square' ? `<rect x="${m}" y="${m}" width="${s}" height="${s}"/>`
      : kind === 'rectangle' ? `<rect x="${m}" y="${px / 2 - s * 0.3}" width="${s}" height="${s * 0.6}"/>`
        : kind === 'triangle' ? `<polygon points="${px / 2},${m} ${px - m},${px - m} ${m},${px - m}"/>`
          : `<polygon points="${Array.from({ length: 6 }, (_, k) => [px / 2 + (s / 2) * Math.cos(k * Math.PI / 3), px / 2 + (s / 2) * Math.sin(k * Math.PI / 3)].map(f1).join(',')).join(' ')}"/>`;
  return `<svg width="${px}" height="${px}" viewBox="0 0 ${px} ${px}" data-lcs-legend-icon="${kind}"><g fill="${color}" stroke="${INK}" stroke-width="3" stroke-linejoin="round">${shape}</g></svg>`;
}

function makeShapePicturesType({ id, slug, i18n }) {
  return {
    id, slug, gradeBand: 'K', assetClass: 'geometry', exerciseType: '2d-shapes',
    themeAxis: { applicable: false },
    difficulty: { 1: { level: 1 }, 2: { level: 2 }, 3: { level: 3 } },
    i18n,
    levelSetWords(m) { return (m.counts || []).map(String); },

    build({ difficulty }, ctx) {
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      // level 3 promises turned shapes: only the scenes that show them
      const names = Object.keys(SCENES).filter((n) => (LEVELS[lv].hex ? SCENES[n].hex : true) && (LEVELS[lv].turned ? SCENES[n].turned : true));
      const name = pick(rng, names);
      const sc = makeScene(name, lv, rng);
      const colors = rng.shuffle(CRAYONS.slice()).slice(0, sc.kinds.length);
      const colorOf = Object.fromEntries(sc.kinds.map((k, i) => [k, colors[i]]));
      const key = !!(ctx && ctx.answerKey);
      const PW = 640, PH = Math.round(H * PW / W);
      const pic = `<svg width="${PW}" height="${PH}" viewBox="-6 -6 ${W + 12} ${H + 12}" data-lcs-prim="shape-picture" data-lcs-scene="${name}" style="flex:0 0 auto">` +
        sc.pieces.map((p, i) => pieceSvg(p, key ? colorOf[p.kind] : tokens.color.white, i)).join('') + `</svg>`;
      const legend = sc.kinds.map((k) => `<div style="display:flex;align-items:center;gap:12px" data-lcs-legend="${k}" data-lcs-color="${colorOf[k]}">${legendIcon(k, colorOf[k], 60)}${answerBox({ w: 64, h: 56, answer: sc.counts[k] })}</div>`).join('');
      return {
        bodyHtml: `<div data-ws-content data-lcs-shape-pictures="${lv}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">` +
          `<div style="background:#FFFFFF;border:2.5px solid #F0E4CB;border-radius:18px;padding:8px">${pic}</div>` +
          `<div style="display:flex;justify-content:space-evenly;align-items:center;width:100%;padding:12px 8px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px;box-sizing:border-box" data-lcs-shape-key>${legend}</div></div>`,
        meta: { scene: name, counts: sc.kinds.map((k) => sc.counts[k]), kinds: sc.kinds },
      };
    },

    async verify(page) {
      const fails = await page.evaluate(() => {
        const out = [];
        const svg = document.querySelector('[data-lcs-prim="shape-picture"]');
        if (!svg) return ['no picture'];
        const pieces = [...svg.querySelectorAll('[data-lcs-shape]')].map((e) => ({ kind: e.dataset.lcsShape, circle: e.tagName.toLowerCase() === 'circle',
          pts: e.tagName.toLowerCase() === 'circle' ? (() => { const cx = +e.getAttribute('cx'), cy = +e.getAttribute('cy'), r = +e.getAttribute('r'); return Array.from({ length: 48 }, (_, k) => [cx + r * Math.cos(k * Math.PI / 24), cy + r * Math.sin(k * Math.PI / 24)]); })()
            : e.dataset.lcsPts.split(' ').map((s) => s.split(',').map(Number)), fill: e.getAttribute('fill'), box: e.getBoundingClientRect() }));
        const legend = [...document.querySelectorAll('[data-lcs-legend]')].map((e) => ({ kind: e.dataset.lcsLegend, color: e.dataset.lcsColor, ans: +e.querySelector('[data-lcs-answer]').dataset.lcsAnswer }));
        legend.forEach((l) => { const n = pieces.filter((p) => p.kind === l.kind).length; if (n !== l.ans) out.push(`${l.kind}: the picture has ${n}, the box says ${l.ans}`); });
        const kinds = new Set(pieces.map((p) => p.kind));
        kinds.forEach((k) => { if (!legend.some((l) => l.kind === k)) out.push(`${k} in the picture but not in the key`); });
        if (new Set(legend.map((l) => l.color)).size !== legend.length) out.push('two kinds share a colour');
        if (kinds.has('square') && kinds.has('rectangle')) out.push('squares and rectangles on one page');
        pieces.forEach((p, i) => { if (Math.min(p.box.width, p.box.height) < 14) out.push(`piece ${i} (${p.kind}) prints too small to colour`); });
        return { out, pieces: pieces.map((p) => ({ kind: p.kind, circle: p.circle, pts: p.pts })) };
      });
      // the geometry again, from the page's own corners: every kind, no overlap, no square beside a rectangle (a <circle>
      // element is a circle whatever it is labelled; a polygon labelled circle is caught by its corners)
      return fails.out.concat(checkPieces(fails.pieces.map((p) => ({ kind: p.circle ? 'circle' : (p.kind === 'circle' ? 'polygon' : p.kind), pts: p.pts }))));
    },
  };
}

module.exports = { makeShapePicturesType, SCENES, LEVELS, checkPieces, relation, kindOf, makeScene };
