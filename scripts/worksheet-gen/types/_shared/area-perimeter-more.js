/**
 * Area and perimeter with side LENGTHS (Year pages U, 2026-11-14; Daily Teaching System Part 12.2; Grade 3):
 *   sides         G3-488 Area of a Rectangle: Multiply the Sides — a rectangle with its two side lengths and their
 *                 unit; the child writes the product and the area. Level 1 the unit squares are still drawn (the
 *                 bridge from counting) · level 2 no squares · level 3 sides from 4 to 10 and, on two cards, the area
 *                 and one side are given and the other side is asked. 3.MD.C.7.b.
 *   lshape        G3-489 Area of an L-Shape — an L-shaped figure to cut into two rectangles; the child writes the
 *                 product of each part and adds. Level 1 on a grid with the cut drawn and the parts named A and B ·
 *                 level 2 on a grid without the cut · level 3 no grid, the six side lengths written. 3.MD.C.7.d.
 *   missing-side  G3-490 Find the Missing Side — a figure drawn TO SCALE with every side length but one and its
 *                 perimeter; the child writes an equation with a letter and finds the side. Level 1 triangles and
 *                 four-sided figures, the equation printed · level 2 also a five-sided figure, the child writes the
 *                 equation · level 3 perimeters to 100, an L-shape, and a rectangle with one side length (two equal
 *                 sides are unknown). 3.MD.D.8.
 * Units: US pages use feet, inches, centimeters and meters (areas in words: "square feet"); the other languages use
 * cm and m (areas as cm², m²). The words for area, perimeter and the grid square are those of the reviewed area page
 * (geometry-more.js LABELS). The letter of the unknown is n on US pages and x elsewhere.
 * No theme: a copy is a new draw of the figures. Printed page only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { mulGlyph } = require('./notation.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, GRID = C.grid, CORAL = C.coral;
const f1 = (v) => Math.round(v * 10) / 10;
const loc2 = (l) => String(l || 'en').slice(0, 2);
const METRIC = [{ u: 'cm', sq: 'cm²' }, { u: 'm', sq: 'm²' }];
// (read by a native reader, 2026-11-14)
const WORDS = {
  en: { area: 'Area', perim: 'Perimeter', sq: 'square units', letter: 'n', units: [{ u: 'ft', sq: 'square feet' }, { u: 'in.', sq: 'square inches' }, { u: 'cm', sq: 'square centimeters' }, { u: 'm', sq: 'square meters' }] },
  de: { area: 'Flächeninhalt', perim: 'Umfang', sq: 'Kästchen', letter: 'x', units: METRIC },
  es: { area: 'Área', perim: 'Perímetro', sq: 'unidades cuadradas', letter: 'x', units: METRIC },
  pt: { area: 'Área', perim: 'Perímetro', sq: 'quadradinhos', letter: 'x', units: METRIC },
  fr: { area: 'Aire', perim: 'Périmètre', sq: 'carreaux', letter: 'x', units: METRIC },
  it: { area: 'Area', perim: 'Perimetro', sq: 'quadretti', letter: 'x', units: METRIC },
  nl: { area: 'Oppervlakte', perim: 'Omtrek', sq: 'hokjes', letter: 'x', units: METRIC },
  sv: { area: 'Area', perim: 'Omkrets', sq: 'rutor', letter: 'x', units: METRIC },
  da: { area: 'Areal', perim: 'Omkreds', sq: 'tern', letter: 'x', units: METRIC },
  no: { area: 'Areal', perim: 'Omkrets', sq: 'ruter', letter: 'x', units: METRIC },
  fi: { area: 'Pinta-ala', perim: 'Piiri', sq: 'ruutua', letter: 'x', units: METRIC },
};

const LEVELS = {
  sides: {
    1: { cards: 6, cols: 2, lo: 2, hi: 6, grid: true, find: 0 },
    2: { cards: 6, cols: 2, lo: 2, hi: 10, grid: false, find: 0 },
    3: { cards: 6, cols: 2, lo: 4, hi: 10, grid: false, find: 2 },
  },
  lshape: {
    1: { cards: 4, cols: 1, grid: true, cut: true, W: [4, 8], H: [4, 6] },
    2: { cards: 4, cols: 1, grid: true, cut: false, W: [4, 8], H: [4, 6] },
    3: { cards: 4, cols: 1, grid: false, cut: false, W: [5, 10], H: [5, 9] },
  },
  'missing-side': {
    1: { cards: 4, cols: 2, shapes: ['tri', 'quad', 'tri', 'quad'], eqGiven: true, maxP: 40 },
    2: { cards: 6, cols: 2, shapes: ['tri', 'quad', 'house', 'tri', 'quad', 'house'], eqGiven: false, maxP: 60 },
    3: { cards: 6, cols: 2, shapes: ['tri', 'quad', 'house', 'ell', 'rect2', 'rect2'], eqGiven: false, maxP: 100 },
  },
};

const EQ = `font:700 22px/1.2 'Baloo 2',cursive;color:${INK};white-space:nowrap`;
const SMALL = `font:700 17px/1.2 'Nunito',sans-serif;color:${INK}`;
const svgText = (x, y, t, extra = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" dominant-baseline="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="17" fill="${INK}"${extra}>${t}</text>`;

/** the vertices of an L-shape W × H with a notch w × h cut from one corner (units; y grows downward) */
function ellPoints(W, H, w, h, corner) {
  let P = [[0, 0], [W - w, 0], [W - w, h], [W, h], [W, H], [0, H]];   // notch top right
  if (corner === 'tl' || corner === 'bl') P = P.map(([x, y]) => [W - x, y]).reverse();
  if (corner === 'bl' || corner === 'br') P = P.map(([x, y]) => [x, H - y]).reverse();
  return P;
}
const shoelace = (P) => Math.abs(P.reduce((s, p, i) => { const q = P[(i + 1) % P.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;

const pointIn = (pt, Q) => { let r = false; for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) if ((Q[i][1] > pt[1]) !== (Q[j][1] > pt[1]) && pt[0] < ((Q[j][0] - Q[i][0]) * (pt[1] - Q[i][1])) / (Q[j][1] - Q[i][1]) + Q[i][0]) r = !r; return r; };
/** side labels of a polygon (px points): each at the middle of its edge, pushed outward. The two edges that meet at
 *  an inner corner (the notch of an L-shape) carry their labels INSIDE the figure: outside, the two labels met in the
 *  notch. */
function edgeLabels(P, texts, attrs) {
  const n = P.length, cross = (i) => { const a = P[(i + n - 1) % n], b = P[i], c = P[(i + 1) % n]; return (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]); };
  const turn = Math.sign(P.reduce((t, _, i) => t + cross(i), 0)), inner = P.map((_, i) => n > 4 && Math.sign(cross(i)) === -turn);
  return P.map((p, i) => {
    if (texts[i] == null) return '';
    const q = P[(i + 1) % n], inside = inner[(i + 1) % n] || inner[i], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1;
    let nx = -dy / L, ny = dx / L;
    // outward: a point just off the edge that is NOT in the figure (the middle of the corners lies on the wrong side
    // of a notch edge)
    if (pointIn([mx + nx * 2, my + ny * 2], P)) { nx = -nx; ny = -ny; }
    if (inside) { nx = -nx; ny = -ny; }
    // (the label is centred on its point: beside an upright edge it needs half its own width)
    const off = 11 + Math.abs(nx) * 4.8 * String(texts[i]).length + Math.abs(ny) * 3;
    return svgText(mx + nx * off, my + ny * off, texts[i], ` data-lcs-side="${i}"${attrs ? attrs(i) : ''}`);
  }).join('');
}

/** the figures of the missing-side page, in units and to scale: { P, sides } (sides[i] = the length of edge i → i+1) */
const TRIANGLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [5, 5, 6], [5, 5, 8], [6, 7, 8], [7, 8, 9], [5, 7, 8], [4, 5, 6], [7, 9, 11], [6, 8, 9], [9, 10, 11]];
const TRIPLES = [[4, 3, 5], [3, 4, 5], [8, 6, 10], [6, 8, 10], [12, 5, 13], [5, 12, 13]];   // rise, run, slant
function figure(kind, rng, maxP) {
  for (let t = 0; t < 400; t++) {
    let P, sides, unknown = null;
    if (kind === 'tri') {
      const [a, b, c] = rng.shuffle(rng.pick(TRIANGLES).slice()), k = rng.int(1, 3);
      const x = (b * b + c * c - a * a) / (2 * c), y = Math.sqrt(Math.max(0, b * b - x * x));
      P = [[0, 0], [c * k, 0], [x * k, -y * k]]; sides = [c * k, a * k, b * k];
    } else if (kind === 'quad') {   // a right trapezoid: bottom, slanted side, top, upright side
      const [rise, run, slant] = rng.pick(TRIPLES), k = rng.int(1, 2), top = rng.int(2, 9);
      P = [[0, 0], [(top + run) * k, 0], [top * k, -rise * k], [0, -rise * k]]; sides = [(top + run) * k, slant * k, top * k, rise * k];
    } else if (kind === 'house') {   // a five-sided figure: a rectangle with a roof of two equal sides
      const [rise, half, slant] = rng.pick(TRIPLES.filter(([r]) => r <= 8)), k = rng.int(1, 2), wall = rng.int(3, 9);
      P = [[0, 0], [2 * half * k, 0], [2 * half * k, -wall * k], [half * k, -(wall + rise) * k], [0, -wall * k]]; sides = [2 * half * k, wall * k, slant * k, slant * k, wall * k];
    } else if (kind === 'ell') {
      const W = rng.int(6, 16), H = rng.int(5, 12), w = rng.int(2, W - 2), h = rng.int(2, H - 2);
      P = ellPoints(W, H, w, h, rng.pick(['tr', 'tl', 'br', 'bl'])).map(([x, y]) => [x, y - H]);
      sides = P.map((p, i) => { const q = P[(i + 1) % P.length]; return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]); });
    } else {   // rect2: a rectangle with ONE side length; the two unknown sides are equal
      const a = rng.int(3, 20), b = rng.int(a + 1, 30);
      P = [[0, 0], [b, 0], [b, -a], [0, -a]]; sides = [b, a, b, a]; unknown = [1, 3];
    }
    const per = sides.reduce((s, v) => s + v, 0);
    if (per > maxP || per < 12 || sides.some((v) => v < 2)) continue;
    // the unknown side is one whose length no other side shows (an equal side would print the answer)
    if (!unknown) { const uniq = sides.map((v, i) => i).filter((i) => sides.filter((v) => v === sides[i]).length === 1); if (!uniq.length) continue; unknown = [rng.pick(uniq)]; }
    // (the drawing is to scale: a figure three times as wide as tall would leave its labels no room)
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
    if (bw / bh > 3.2 || bh / bw > 1.6) continue;
    // (… and every side of an L-shape is long enough for its label: two short sides of the notch put two labels on each other)
    if (kind === 'ell' && sides.some((v) => v * Math.min(150 / bw, 96 / bh) < 38)) continue;
    return { kind, P, sides, unknown, per, answer: sides[unknown[0]] };
  }
  return null;
}

function makeAreaPerimeterType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error(`${id}: unknown mode ${mode}`);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'geometry', exerciseType: 'geometry',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: D,
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, L = loc2(args.locale), Wd = WORDS[L];
      if (!Wd) throw new Error(`${id}: no words for ${L}`);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen)), mul = mulGlyph(L);
      const box = (v, w = 62) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:${w}px;height:40px;margin:0 3px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:9px;background:#FFFFFF"></span>`;
      const unitOf = (i) => Wd.units[i % Wd.units.length];
      const u0 = rng.int(0, Wd.units.length - 1);   // which unit the first card has: the others follow in turn
      let cards, items;

      if (mode === 'sides') {
        const pairs = [];
        for (let a = d.lo; a <= d.hi; a++) for (let b = a; b <= d.hi; b++) if (a * b <= 100 && b / a <= 4) pairs.push([a, b]);
        let pick = null;
        for (let t = 0; t < 200 && !pick; t++) {
          const s = rng.sample(pairs, d.cards);
          if (new Set(s.map(([a, b]) => a * b)).size === d.cards && s.filter(([a, b]) => a === b).length <= 1) pick = s;
        }
        if (!pick) throw new Error(`${id}: no ${d.cards} rectangles with different areas`);
        const findAt = new Set(d.find ? rng.sample(pick.map((_, i) => i), d.find) : []);
        items = pick.map(([a, b], i) => ({ a, b, unit: unitOf(u0 + i), find: findAt.has(i) ? rng.pick(['a', 'b']) : null }));
        cards = items.map((it) => {
          const s = Math.min(200 / it.b, 104 / it.a, 30), w = it.b * s, h = it.a * s, x0 = 62, y0 = 26;
          let g = `<rect x="${x0}" y="${y0}" width="${f1(w)}" height="${f1(h)}" fill="#FFFFFF" stroke="${INK}" stroke-width="3" data-lcs-rect/>`;
          if (d.grid) {
            for (let i = 1; i < it.b; i++) g += `<line x1="${f1(x0 + i * s)}" y1="${y0}" x2="${f1(x0 + i * s)}" y2="${f1(y0 + h)}" stroke="${GRID}" stroke-width="1.4" data-lcs-gridline/>`;
            for (let j = 1; j < it.a; j++) g += `<line x1="${x0}" y1="${f1(y0 + j * s)}" x2="${f1(x0 + w)}" y2="${f1(y0 + j * s)}" stroke="${GRID}" stroke-width="1.4" data-lcs-gridline/>`;
          }
          const top = it.find === 'b' ? '?' : `${it.b} ${it.unit.u}`, left = it.find === 'a' ? '?' : `${it.a} ${it.unit.u}`;
          g += svgText(x0 + w / 2, y0 - 13, top, ' data-lcs-label="b"') + `<text x="${x0 - 8}" y="${f1(y0 + h / 2)}" text-anchor="end" dominant-baseline="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="17" fill="${INK}" data-lcs-label="a">${left}</text>`;
          const svg = `<svg width="${f1(x0 + w + 8)}" height="${f1(y0 + h + 6)}" viewBox="0 0 ${f1(x0 + w + 8)} ${f1(y0 + h + 6)}" data-lcs-prim="sides-rect">${g}</svg>`;
          const eq = it.find
            ? `<span style="${EQ}">${box(it.find === 'a' ? it.a : it.b)} ${mul} ${it.find === 'a' ? it.b : it.a} = ${it.a * it.b}</span><span style="${SMALL}">${it.unit.sq}</span>`
            : `<span style="${EQ}">${box(it.a, 52)} ${mul} ${box(it.b, 52)} = ${box(it.a * it.b)}</span><span style="${SMALL};flex-basis:100%;text-align:center">${it.unit.sq}</span>`;
          return `<div class="ws-card-stage" style="flex-direction:column;gap:10px;padding:6px 8px 6px 30px" data-lcs-sides="${it.a}|${it.b}|${it.find || ''}">${svg}<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center">${eq}</div></div>`;
        });
        items = items.map((it) => `${it.a}x${it.b}${it.find ? '?' + it.find : ''}`);
      } else if (mode === 'lshape') {
        const drawn = [];
        let shapes = [];
        for (let t = 0; t < 600 && shapes.length < d.cards; t++) {
          const W = rng.int(d.W[0], d.W[1]), H = rng.int(d.H[0], d.H[1]), w = rng.int(1, W - 2), h = rng.int(1, H - 2);
          if (W < H || (w === 1 && h === 1)) continue;
          // without a grid every side carries its length: each side is long enough for its label (a notch one unit deep left two labels on each other)
          if (!d.grid) { const sc = Math.min(20, 170 / W, 96 / H); if (h * sc < 40 || (H - h) * sc < 34 || w * sc < 66 || (W - w) * sc < 56) continue; }
          const area = W * H - w * h;
          if (area > 100 || drawn.includes(area) || shapes.some((s) => s.W === W && s.H === H)) continue;
          drawn.push(area);
          shapes.push({ W, H, w, h, area, corner: ['tr', 'tl', 'br', 'bl'][shapes.length % 4], cutV: rng.int(0, 1) === 1, unit: unitOf(u0 + shapes.length) });
        }
        if (shapes.length < d.cards) throw new Error(`${id}: no ${d.cards} different L-shapes`);
        shapes = rng.shuffle(shapes);
        cards = shapes.map((sh) => {
          const { W, H, w, h } = sh, s = d.grid ? Math.min(24, 190 / W, 132 / H) : Math.min(20, 170 / W, 96 / H), mX = d.grid ? 4 : 62, mY = d.grid ? 4 : 24;
          const P = ellPoints(W, H, w, h, sh.corner), px = P.map(([x, y]) => [mX + x * s, mY + y * s]);
          const poly = px.map(([x, y]) => f1(x) + ',' + f1(y)).join(' ');
          const cid = `lc${id}${W}${H}${w}${h}${sh.corner}`;
          let g = `<polygon points="${poly}" fill="#FFFFFF" stroke="none"/>`;
          if (d.grid) {
            g += `<clipPath id="${cid}"><polygon points="${poly}"/></clipPath><g clip-path="url(#${cid})">`;
            for (let i = 1; i < W; i++) g += `<line x1="${f1(mX + i * s)}" y1="${mY}" x2="${f1(mX + i * s)}" y2="${f1(mY + H * s)}" stroke="${GRID}" stroke-width="1.4"/>`;
            for (let j = 1; j < H; j++) g += `<line x1="${mX}" y1="${f1(mY + j * s)}" x2="${f1(mX + W * s)}" y2="${f1(mY + j * s)}" stroke="${GRID}" stroke-width="1.4"/>`;
            g += '</g>';
          }
          // the two rectangles of the drawn cut (level 1): the inner corner of the L is (ix, iy)
          const left = sh.corner === 'tr' || sh.corner === 'br', topNotch = sh.corner === 'tr' || sh.corner === 'tl';
          const ix = left ? W - w : w, iy = topNotch ? h : H - h;
          let parts = null;
          if (d.cut) {
            if (sh.cutV) {   // a vertical cut through the inner corner: a full-height part and the short part beside it
              g += `<line x1="${f1(mX + ix * s)}" y1="${f1(mY + (topNotch ? h : 0) * s)}" x2="${f1(mX + ix * s)}" y2="${f1(mY + (topNotch ? H : H - h) * s)}" stroke="${TEAL}" stroke-width="3" stroke-dasharray="8 6" data-lcs-cut="v"/>`;
              parts = [{ a: H, b: W - w, cx: left ? (W - w) / 2 : w + (W - w) / 2, cy: H / 2 }, { a: H - h, b: w, cx: left ? W - w / 2 : w / 2, cy: topNotch ? h + (H - h) / 2 : (H - h) / 2 }];
            } else {         // a horizontal cut: a full-width part and the narrow part above or below it
              g += `<line x1="${f1(mX + (left ? 0 : w) * s)}" y1="${f1(mY + iy * s)}" x2="${f1(mX + (left ? W - w : W) * s)}" y2="${f1(mY + iy * s)}" stroke="${TEAL}" stroke-width="3" stroke-dasharray="8 6" data-lcs-cut="h"/>`;
              parts = [{ a: H - h, b: W, cx: W / 2, cy: topNotch ? h + (H - h) / 2 : (H - h) / 2 }, { a: h, b: W - w, cx: left ? (W - w) / 2 : w + (W - w) / 2, cy: topNotch ? h / 2 : H - h / 2 }];
            }
            parts.forEach((p, i) => { g += `<text x="${f1(mX + p.cx * s)}" y="${f1(mY + p.cy * s)}" text-anchor="middle" dominant-baseline="middle" font-family="'Baloo 2',cursive" font-weight="800" font-size="19" fill="${TEAL}" data-lcs-part="${p.a}x${p.b}">${'AB'[i]}</text>`; });
          }
          g += `<polygon points="${poly}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round" data-lcs-ell/>`;
          if (!d.grid) g += edgeLabels(px, P.map((p, i) => { const q = P[(i + 1) % P.length]; return `${Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1])} ${sh.unit.u}`; }));
          const svg = `<svg width="${f1(2 * mX + W * s)}" height="${f1(2 * mY + H * s)}" viewBox="0 0 ${f1(2 * mX + W * s)} ${f1(2 * mY + H * s)}" data-lcs-prim="ell" style="overflow:visible">${g}</svg>`;
          const lab = (t) => `<span style="font:800 19px/1 'Baloo 2',cursive;color:${TEAL};min-width:20px">${t}</span>`;
          const row = (i) => `<div style="display:flex;align-items:center;gap:4px">${d.cut ? lab('AB'[i]) : ''}<span style="${EQ}">${box(parts ? parts[i].a : '', 46)} ${mul} ${box(parts ? parts[i].b : '', 46)} = ${box(parts ? parts[i].a * parts[i].b : '', 56)}</span></div>`;
          const sum = `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center"><span style="${EQ}">${box(parts ? parts[0].a * parts[0].b : '', 56)} + ${box(parts ? parts[1].a * parts[1].b : '', 56)} = ${box(sh.area)}</span><span style="${SMALL};flex-basis:100%;text-align:center" data-lcs-squnit>${d.grid ? Wd.sq : sh.unit.sq}</span></div>`;
          return `<div class="ws-card-stage" style="gap:14px;justify-content:space-evenly;padding:6px 8px 6px 34px" data-lcs-lshape="${W}|${H}|${w}|${h}|${sh.area}">${svg}<div style="display:flex;flex-direction:column;gap:7px;align-items:flex-start">${row(0)}${row(1)}${sum}</div></div>`;
        });
        items = shapes.map((sh) => `${sh.W}x${sh.H}-${sh.w}x${sh.h}`);
      } else {
        let figs = []; const answers = new Set();
        for (const kind of d.shapes) {
          let f = null;
          for (let t = 0; t < 60 && !f; t++) { const c = figure(kind, rng, d.maxP); if (c && !answers.has(c.answer) && !figs.some((o) => o.per === c.per)) f = c; }
          if (!f) throw new Error(`${id}: no ${kind} within a perimeter of ${d.maxP}`);
          answers.add(f.answer); figs.push(f);
        }
        figs = rng.shuffle(figs);
        cards = figs.map((f, i) => {
          const unit = unitOf(u0 + i), xs = f.P.map((p) => p[0]), ys = f.P.map((p) => p[1]);
          const minX = Math.min(...xs), minY = Math.min(...ys), bw = Math.max(...xs) - minX, bh = Math.max(...ys) - minY;
          const s = Math.min(150 / bw, 96 / bh), mx = 52, my = 26;
          const px = f.P.map(([x, y]) => [mx + (x - minX) * s, my + (y - minY) * s]);
          const texts = f.sides.map((v, k) => (f.unknown.includes(k) ? Wd.letter : (f.kind === 'rect2' && k !== 0 ? null : `${v} ${unit.u}`)));
          const g = `<polygon points="${px.map(([x, y]) => f1(x) + ',' + f1(y)).join(' ')}" fill="#FFFFFF" stroke="${INK}" stroke-width="3" stroke-linejoin="round" data-lcs-fig/>` +
            edgeLabels(px, texts, (k) => (f.unknown.includes(k) ? ` fill="${CORAL}" font-style="italic" data-lcs-unknown="1"` : ''));
          const svg = `<svg width="${f1(2 * mx + bw * s)}" height="${f1(2 * my + bh * s)}" viewBox="0 0 ${f1(2 * mx + bw * s)} ${f1(2 * my + bh * s)}" data-lcs-prim="fig" style="overflow:visible">${g}</svg>`;
          const eqText = f.sides.map((v, k) => (f.unknown.includes(k) ? Wd.letter : v)).join(' + ') + ' = ' + f.per;
          const eqRow = d.eqGiven ? `<span style="${EQ}" data-lcs-eq>${eqText}</span>` : `<span style="display:inline-block;width:220px;height:26px;border-bottom:2px solid #B9AE9C" data-lcs-eqline></span>`;
          return `<div class="ws-card-stage" style="flex-direction:column;gap:7px;padding:6px 8px 6px 30px" data-lcs-missing="${f.kind}|${f.sides.join(',')}|${f.unknown.join(',')}|${f.per}">${svg}` +
            `<span style="${SMALL}" data-lcs-perim>${Wd.perim} = ${f.per} ${unit.u}</span>${eqRow}` +
            `<div style="display:flex;align-items:center;gap:6px"><span style="${EQ}">${Wd.letter} = ${box(f.answer)}</span><span style="${SMALL}">${unit.u}</span></div></div>`;
        });
        items = figs.map((f) => `${f.kind}:${f.sides.join('-')}:${f.unknown.join('')}`);
      }
      return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-ap="${mode}|${lv}">${cardGrid({ cards, cols: d.cols, rows: Math.ceil(cards.length / d.cols) })}</div>`, meta: { items } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-ap]');
        if (!root) return ['no page'];
        const [mode, lv] = root.dataset.lcsAp.split('|');
        const rectOf = (e) => e.getBoundingClientRect();
        // every drawing and every box stays inside its card
        document.querySelectorAll('.ws-card').forEach((c, i) => { const cb = rectOf(c); c.querySelectorAll('svg, .ws-answerbox, text').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left - 1 || r.right > cb.right + 1 || r.top < cb.top - 1 || r.bottom > cb.bottom + 1)) fails.push(`card ${i + 1}: something leaves the card`); }); });
        // no label lies on another label
        document.querySelectorAll('svg[data-lcs-prim]').forEach((svg, i) => { const t = [...svg.querySelectorAll('text')].map(rectOf); for (let a = 0; a < t.length; a++) for (let b = a + 1; b < t.length; b++) if (t[a].left < t[b].right - 1 && t[b].left < t[a].right - 1 && t[a].top < t[b].bottom - 1 && t[b].top < t[a].bottom - 1) fails.push(`figure ${i + 1}: two labels overlap`); });
        if (mode === 'sides') {
          const cards = [...document.querySelectorAll('[data-lcs-sides]')], areas = new Set();
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [a, b, find] = c.dataset.lcsSides.split('|'), A = +a, B = +b;
            if (A * B > 100) fails.push(`${P}: area ${A * B}`); if (areas.has(A * B)) fails.push(`${P}: an area twice`); areas.add(A * B);
            const r = rectOf(c.querySelector('[data-lcs-rect]'));
            if (Math.abs(r.width / r.height - B / A) > 0.06 * (B / A)) fails.push(`${P}: the rectangle is not drawn ${A} by ${B}`);
            const lines = c.querySelectorAll('[data-lcs-gridline]').length;
            if (lv === '1' ? lines !== A - 1 + B - 1 : lines !== 0) fails.push(`${P}: ${lines} grid lines`);
            const la = c.querySelector('[data-lcs-label="a"]').textContent, lb = c.querySelector('[data-lcs-label="b"]').textContent;
            if (find === 'a' ? la !== '?' : parseInt(la, 10) !== A) fails.push(`${P}: the upright side reads "${la}"`);
            if (find === 'b' ? lb !== '?' : parseInt(lb, 10) !== B) fails.push(`${P}: the long side reads "${lb}"`);
            const boxes = c.querySelectorAll('.ws-answerbox').length;
            if (boxes !== (find ? 1 : 3)) fails.push(`${P}: ${boxes} boxes`);
            if (find && !c.textContent.includes('= ' + A * B)) fails.push(`${P}: the area is not printed`);
          });
          const finds = cards.filter((c) => c.dataset.lcsSides.split('|')[2]).length;
          if (finds !== (lv === '3' ? 2 : 0)) fails.push(`${finds} cards ask for a side`);
        } else if (mode === 'lshape') {
          const areas = new Set();
          document.querySelectorAll('[data-lcs-lshape]').forEach((c, i) => {
            const P = 'card ' + (i + 1), [W, H, w, h, area] = c.dataset.lcsLshape.split('|').map(Number);
            if (W * H - w * h !== area || area > 100) fails.push(`${P}: the area is not ${area}`);
            if (areas.has(area)) fails.push(`${P}: an area twice`); areas.add(area);
            const pts = c.querySelector('[data-lcs-ell]').getAttribute('points').trim().split(/\s+/).map((q) => q.split(',').map(Number));
            if (pts.length !== 6) fails.push(`${P}: ${pts.length} corners`);
            const sh = Math.abs(pts.reduce((s, p, k) => { const q = pts[(k + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
            const cell = (Math.max(...pts.map((p) => p[0])) - Math.min(...pts.map((p) => p[0]))) / W;
            if (Math.abs(sh / (cell * cell) - area) > 0.6) fails.push(`${P}: the drawn figure has ${Math.round(sh / (cell * cell))} squares, not ${area}`);
            const parts = [...c.querySelectorAll('[data-lcs-part]')].map((e) => e.dataset.lcsPart.split('x').map(Number));
            if (lv === '1') { if (parts.length !== 2 || parts[0][0] * parts[0][1] + parts[1][0] * parts[1][1] !== area || !c.querySelector('[data-lcs-cut]')) fails.push(`${P}: the cut does not give two rectangles of ${area} squares`); }
            else if (parts.length || c.querySelector('[data-lcs-cut]')) fails.push(`${P}: a cut is drawn`);
            const labels = [...c.querySelectorAll('[data-lcs-side]')].map((e) => parseInt(e.textContent, 10)).sort((x, y) => x - y);
            if (lv === '3') { const want = [W, H, w, h, W - w, H - h].sort((x, y) => x - y); if (labels.join() !== want.join()) fails.push(`${P}: the side lengths read ${labels.join(', ')}`); }
            else if (labels.length) fails.push(`${P}: side lengths on a grid figure`);
            if (c.querySelectorAll('.ws-answerbox').length !== 9) fails.push(`${P}: ${c.querySelectorAll('.ws-answerbox').length} boxes`);
          });
          if (document.querySelectorAll('[data-lcs-lshape]').length !== 4) fails.push('not four figures');
        } else {
          const answers = new Set();
          document.querySelectorAll('[data-lcs-missing]').forEach((c, i) => {
            const P = 'card ' + (i + 1), [kind, s, u, per] = c.dataset.lcsMissing.split('|'), sides = s.split(',').map(Number), unknown = u.split(',').map(Number);
            if (sides.reduce((a, b) => a + b, 0) !== +per) fails.push(`${P}: the sides do not add up to ${per}`);
            const ans = sides[unknown[0]]; if (unknown.some((k) => sides[k] !== ans)) fails.push(`${P}: the unknown sides differ`);
            if (answers.has(ans)) fails.push(`${P}: an answer twice`); answers.add(ans);
            // to scale: every drawn edge is as long as its number says
            const pts = c.querySelector('[data-lcs-fig]').getAttribute('points').trim().split(/\s+/).map((q) => q.split(',').map(Number));
            const lens = pts.map((p, k) => { const q = pts[(k + 1) % pts.length]; return Math.hypot(q[0] - p[0], q[1] - p[1]); });
            const k0 = lens[0] / sides[0]; if (lens.some((L, k) => Math.abs(L / sides[k] - k0) > 0.04 * k0)) fails.push(`${P}: the figure is not drawn to scale`);
            const lab = [...c.querySelectorAll('[data-lcs-side]')];
            const unk = lab.filter((e) => e.dataset.lcsUnknown === '1');
            if (unk.length !== unknown.length) fails.push(`${P}: ${unk.length} sides carry the letter`);
            lab.filter((e) => e.dataset.lcsUnknown !== '1').forEach((e) => { if (parseInt(e.textContent, 10) !== sides[+e.dataset.lcsSide]) fails.push(`${P}: side ${e.dataset.lcsSide} reads "${e.textContent}"`); });
            if (kind !== 'rect2' && lab.length !== sides.length) fails.push(`${P}: ${lab.length} of ${sides.length} sides are labelled`);
            if (kind === 'rect2' && lab.length !== 3) fails.push(`${P}: the rectangle shows ${lab.length} labels (one length and the letter twice)`);
            if (kind !== 'rect2' && lab.some((e) => !e.dataset.lcsUnknown && parseInt(e.textContent, 10) === ans)) fails.push(`${P}: another side prints the answer ${ans}`);
            if (!c.querySelector('[data-lcs-perim]').textContent.includes('= ' + per + ' ')) fails.push(`${P}: the perimeter is not printed`);
            const eq = c.querySelector('[data-lcs-eq]');
            if (lv === '1') { if (!eq) fails.push(`${P}: no printed equation`); else { const nums = eq.textContent.split('=')[0].split('+').map((x) => x.trim()); const sum = nums.filter((x) => /^\d+$/.test(x)).reduce((a, b) => a + +b, 0); if (sum + ans * nums.filter((x) => !/^\d+$/.test(x)).length !== +per) fails.push(`${P}: the printed equation is wrong`); } }
            else if (eq || !c.querySelector('[data-lcs-eqline]')) fails.push(`${P}: the equation is printed`);
          });
          if (!document.querySelector('[data-lcs-missing]')) fails.push('no figures');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeAreaPerimeterType, WORDS, LEVELS };
