/**
 * road-sign.js — the K-369 `road-safety` regulation sign on an optional post,
 * pure SVG in px (s = the sign's bounding WIDTH). Design:
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §2 "NEW primitives/
 * road-sign.js" (the shape table + the closed glyph set).
 *
 *   roadSign({ shape, rim, field, glyph, slash = false, text, s, post, role })
 *     -> { svg, w, h, meta }
 *   post: null | { h: px }  (teal w 6 + a 20 x 4 foot)
 *
 *   shape        outline                                   rim / field
 *   octagon      regular, flat top, circumradius 0.5412 s  white band 0.05 s / codeRed, text white
 *   triUp        equilateral side s, corner r 0.05 s       rim codeRed 0.10 s / white|yellow
 *   triDown      the inverted triUp                         rim codeRed 0.10 s / white|yellow, text codeRed
 *   circle       Ø s; rim:'red' -> ring 0.12 s             rim codeRed / field white|yellow (+slash codeRed 0.10 s)
 *                rim:null, field:'red' -> no-entry          field codeRed, white bar 0.64 s x 0.16 s (+ DO NOT / ENTER)
 *                rim:'white', field:'blue' -> mandatory     inner white ring 0.03 s / codeBlue, glyph white 0.60 s
 *   square       rounded square s, r 0.08 s                 white border 0.04 s / codeBlue
 *   diamond      square s/√2 turned 45°                     ink border 0.035 s / codeYellow, glyph ink 0.48 s
 *   pentagon     (0.5,0)(1,0.42)(1,1)(0,1)(0,0.42) · s      ink border 0.035 s / codeYellow
 *   plateCircle  white rounded rect s x 1.2 s, ink 0.03 s    carries a rim circle Ø 0.8 s (+slash)
 *
 * field keys: white | yellow | red | blue. glyphs (CLOSED; a panel may not add
 * one): walker walkerOnStripes crossingTriangle twoChildren adultChild bicycle
 * trafficLightMini bar text none. Every sign's OUTERMOST shape carries an ink
 * 1.5 hairline so a white rim shows on cream. Text is Baloo 2 700, sized from
 * a 0.6 em-per-character estimate and REFUSED below 9 px (the gate measures the
 * rendered length; a role whose text cannot reach 9 px is dropped from the page).
 *
 * Outlines are <path>s: a rounded corner is ONE `Q` whose control point is the
 * true vertex, a sharp corner an `L`/`M` point — so the gate re-derives the
 * vertex list from the markup (never from `meta`).
 * Stamps `<g data-lcs-signal data-lcs-sign-shape data-lcs-sign-rim
 * data-lcs-sign-field data-lcs-sign-glyph data-lcs-role>`; parts
 * `data-lcs-sign-part="plate|rim|field|glyph|text|slash|post"`.
 * Gate: qa/verify-b5-road-sign.js.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');
const { walkerParts } = require('./road-pictogram.js');

const T = tokens.color;
const C = tokens.codeColors;
const SHAPES = ['octagon', 'triUp', 'triDown', 'circle', 'square', 'diamond', 'pentagon', 'plateCircle'];
const FIELDS = { white: T.white, yellow: C.codeYellow, red: C.codeRed, blue: C.codeBlue };
const GLYPHS = ['walker', 'walkerOnStripes', 'crossingTriangle', 'twoChildren', 'adultChild', 'bicycle', 'trafficLightMini', 'bar', 'text', 'none'];
const EM_PER_CHAR = 0.6;          // Baloo 2 700 caps: STOP 42.0 px at 18 = 0.583 em / char (design, measured)
const TEXT_FLOOR = 9;
const fmt = (n) => (Math.round(n * 100) / 100).toString();

/* ---------------------------------------------------------------- geometry helpers */
/** A closed path through pts; r > 0 rounds every corner with ONE Q whose control point is the vertex. */
function polyPath(pts, r = 0) {
  if (!r) return 'M' + pts.map((p) => fmt(p[0]) + ',' + fmt(p[1])).join(' L') + ' Z';
  const n = pts.length;
  const segs = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    const toA = [a[0] - p[0], a[1] - p[1]], toB = [b[0] - p[0], b[1] - p[1]];
    const la = Math.hypot(...toA), lb = Math.hypot(...toB);
    const k = Math.min(r, la / 2, lb / 2);
    const p1 = [p[0] + toA[0] / la * k, p[1] + toA[1] / la * k];
    const p2 = [p[0] + toB[0] / lb * k, p[1] + toB[1] / lb * k];
    segs.push({ p1, p, p2 });
  }
  let d = `M${fmt(segs[0].p2[0])},${fmt(segs[0].p2[1])}`;
  for (let i = 1; i <= n; i++) {
    const s = segs[i % n];
    d += ` L${fmt(s.p1[0])},${fmt(s.p1[1])} Q${fmt(s.p[0])},${fmt(s.p[1])} ${fmt(s.p2[0])},${fmt(s.p2[1])}`;
  }
  return d + ' Z';
}
/** Inset a CONVEX polygon by distance d (each edge moved inward, adjacent edges re-intersected). */
function inset(pts, d) {
  const n = pts.length;
  // orientation: positive area = clockwise in screen coords (y down)
  let area = 0;
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; area += p[0] * q[1] - q[0] * p[1]; }
  const sgn = area > 0 ? 1 : -1;
  const lines = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy);
    const nx = -dy / L * sgn, ny = dx / L * sgn;          // inward normal
    lines.push({ p: [p[0] + nx * d, p[1] + ny * d], v: [dx, dy] });
  }
  const out = [];
  for (let i = 0; i < n; i++) {
    const A = lines[(i - 1 + n) % n], B = lines[i];
    const den = A.v[0] * B.v[1] - A.v[1] * B.v[0];
    const t = ((B.p[0] - A.p[0]) * B.v[1] - (B.p[1] - A.p[1]) * B.v[0]) / den;
    out.push([A.p[0] + A.v[0] * t, A.p[1] + A.v[1] * t]);
  }
  return out;
}
function outlinePts(shape, s) {
  if (shape === 'octagon') {
    const R = 0.5412 * s;
    return [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (22.5 + 45 * k) * Math.PI / 180; return [s / 2 + R * Math.cos(a), s / 2 + R * Math.sin(a)]; });
  }
  const h = s * Math.sqrt(3) / 2;
  if (shape === 'triUp') return [[s / 2, 0], [s, h], [0, h]];
  if (shape === 'triDown') return [[0, 0], [s, 0], [s / 2, h]];
  if (shape === 'diamond') return [[s / 2, 0], [s, s / 2], [s / 2, s], [0, s / 2]];
  if (shape === 'pentagon') return [[0.5, 0], [1, 0.42], [1, 1], [0, 1], [0, 0.42]].map(([x, y]) => [x * s, y * s]);
  if (shape === 'square') return [[0, 0], [s, 0], [s, s], [0, s]];
  throw new Error('road-sign: no polygon for ' + shape);
}
function shapeHeight(shape, s) {
  if (shape === 'triUp' || shape === 'triDown') return s * Math.sqrt(3) / 2;
  if (shape === 'plateCircle') return 1.2 * s;
  return s;
}

/* ---------------------------------------------------------------- the glyph set (100-unit box) */
function stripes(fill) {
  return [0, 1, 2, 3].map((i) => el('path', { d: `M${14 + i * 20},${86} L${26 + i * 20},${86} L${22 + i * 20},${98} L${10 + i * 20},${98} Z`, fill })).join('');
}
function glyphUnits(glyph, ink) {
  const fig = (pose, tx, ty, sc) => el('g', { transform: `translate(${tx} ${ty}) scale(${sc})` }, walkerParts(pose, { fill: ink }));
  switch (glyph) {
    case 'walker': return walkerParts('walking', { fill: ink });
    case 'walkerOnStripes': return fig('walking', 14, 0, 0.8) + stripes(ink);
    case 'twoChildren': return fig('walking', 6, 40, 0.6) + fig('walking', 30, 26, 0.74);
    case 'adultChild': return fig('walking', 0, 0, 0.95) + fig('walking', 46, 38, 0.6);
    case 'bicycle': {
      const st = { fill: 'none', stroke: ink, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
      return el('circle', { cx: 24, cy: 66, r: 18, ...st }) + el('circle', { cx: 76, cy: 66, r: 18, ...st }) +
        el('path', { d: 'M24,66 L42,40 L68,40 L76,66 M42,40 L50,66 L68,40 M24,66 L50,66 M36,32 L48,32 M68,40 L64,28 L74,26', ...st });
    }
    case 'trafficLightMini':
      return el('rect', { x: 34, y: 6, width: 32, height: 88, rx: 8, ry: 8, fill: T.ink }) +
        el('circle', { cx: 50, cy: 24, r: 10, fill: C.codeRed }) + el('circle', { cx: 50, cy: 50, r: 10, fill: C.codeYellow }) + el('circle', { cx: 50, cy: 76, r: 10, fill: C.codeGreen });
    case 'crossingTriangle': {
      // a white point-up triangle holding the ink walker-on-stripes (Vienna information sign)
      const h = 72 * Math.sqrt(3) / 2;
      const tri = el('path', { d: polyPath([[50, 50 - h / 2 - 4], [86, 50 + h / 2 - 4], [14, 50 + h / 2 - 4]], 3), fill: T.white });
      return tri + el('g', { transform: 'translate(29 26) scale(0.42)' }, glyphUnits('walkerOnStripes', T.ink));
    }
    default: return '';
  }
}

/* ---------------------------------------------------------------- the sign */
function roadSign({ shape, rim = null, field = 'white', glyph = 'none', slash = false, text = '', s = 76, post = null, role = '' } = {}) {
  if (!SHAPES.includes(shape)) throw new Error(`road-sign: shape "${shape}" is not one of ${SHAPES.join(' | ')}`);
  if (!GLYPHS.includes(glyph)) throw new Error(`road-sign: glyph "${glyph}" is not in the closed set (${GLYPHS.join(' | ')})`);
  if (!FIELDS[field]) throw new Error(`road-sign: field "${field}" is not one of ${Object.keys(FIELDS).join(' | ')}`);
  if (text && glyph !== 'text' && !(shape === 'circle' && field === 'red')) throw new Error(`road-sign: text "${text}" on glyph "${glyph}" (text only on glyph:'text')`);
  if (!(s > 0)) throw new Error(`road-sign: s ${s}`);
  const P = [];
  const H = shapeHeight(shape, s);
  const edge = { stroke: T.ink, 'stroke-width': 1.5, 'stroke-linejoin': 'round' };
  let glyphBox = null, glyphInk = T.ink;           // {x, y, size} px
  const texts = [];                                  // {x, y, size, str, fill}

  if (shape === 'octagon') {
    if (field !== 'red') throw new Error('road-sign: an octagon field is red');
    const pts = outlinePts('octagon', s);
    P.push(el('path', { d: polyPath(pts), fill: T.white, ...edge, 'data-lcs-sign-part': 'rim' }));
    P.push(el('path', { d: polyPath(inset(pts, 0.05 * s)), fill: C.codeRed, 'data-lcs-sign-part': 'field' }));
    if (glyph === 'text') {
      const size = Math.min(0.64 * s / (EM_PER_CHAR * text.length), 0.3 * s);
      texts.push({ x: s / 2, y: s / 2, size, str: text, fill: T.white });
    }
  } else if (shape === 'triUp' || shape === 'triDown') {
    const pts = outlinePts(shape, s);
    const fieldPts = inset(pts, 0.10 * s);
    P.push(el('path', { d: polyPath(pts, 0.05 * s), fill: C.codeRed, ...edge, 'data-lcs-sign-part': 'rim' }));
    P.push(el('path', { d: polyPath(fieldPts, 0.02 * s), fill: FIELDS[field], 'data-lcs-sign-part': 'field' }));
    if (shape === 'triUp') {
      const g = 0.46 * s;
      glyphBox = { x: s / 2 - g / 2, y: 0.60 * H - g / 2, size: g };
    } else if (glyph === 'text') {
      // the text sits in the wide upper part of the inverted field
      const y = 0.30 * H;
      const avail = (fieldPts[1][0] - fieldPts[0][0]) * (1 - (y - fieldPts[0][1]) / (fieldPts[2][1] - fieldPts[0][1])) * 0.86;
      const size = Math.min(avail / (EM_PER_CHAR * text.length), 0.2 * s);
      texts.push({ x: s / 2, y, size, str: text, fill: C.codeRed });
    } else if (glyph !== 'none') {
      const g = 0.40 * s;
      glyphBox = { x: s / 2 - g / 2, y: 0.36 * H - g / 2, size: g };
    }
  } else if (shape === 'circle') {
    const cx = s / 2, cy = s / 2, R = s / 2;
    if (rim === 'red') {
      if (!['white', 'yellow'].includes(field)) throw new Error('road-sign: a red-rim circle has a white or yellow field');
      P.push(el('circle', { cx, cy, r: fmt(R), fill: C.codeRed, ...edge, 'data-lcs-sign-part': 'rim' }));
      P.push(el('circle', { cx, cy, r: fmt(R - 0.12 * s), fill: FIELDS[field], 'data-lcs-sign-part': 'field' }));
      const g = 0.56 * s;
      glyphBox = { x: cx - g / 2, y: cy - g / 2, size: g };
    } else if (field === 'red') {
      if (rim) throw new Error('road-sign: the no-entry disc has no rim');
      P.push(el('circle', { cx, cy, r: fmt(R), fill: C.codeRed, ...edge, 'data-lcs-sign-part': 'field' }));
      P.push(el('rect', { x: fmt(cx - 0.32 * s), y: fmt(cy - 0.08 * s), width: fmt(0.64 * s), height: fmt(0.16 * s), fill: T.white, 'data-lcs-sign-part': 'glyph', 'data-lcs-glyph-kind': 'bar' }));
      if (text) {
        const [top, bottom] = String(text).split('|');
        const size = Math.min(0.14 * s, 0.62 * s / (EM_PER_CHAR * Math.max(top.length, (bottom || '').length)));
        texts.push({ x: cx, y: cy - 0.2 * s, size, str: top, fill: T.white });
        if (bottom) texts.push({ x: cx, y: cy + 0.2 * s, size, str: bottom, fill: T.white });
      }
    } else if (field === 'blue') {
      if (rim !== 'white') throw new Error('road-sign: a blue mandatory disc has rim "white"');
      P.push(el('circle', { cx, cy, r: fmt(R), fill: T.white, ...edge, 'data-lcs-sign-part': 'rim' }));
      P.push(el('circle', { cx, cy, r: fmt(R - 0.03 * s), fill: C.codeBlue, 'data-lcs-sign-part': 'field' }));
      const g = 0.60 * s;
      glyphBox = { x: cx - g / 2, y: cy - g / 2, size: g };
      glyphInk = T.white;
    } else {
      throw new Error(`road-sign: circle rim "${rim}" / field "${field}" is not a regulation circle`);
    }
  } else if (shape === 'square') {
    if (field !== 'blue') throw new Error('road-sign: an information square is blue');
    P.push(el('rect', { x: 0, y: 0, width: s, height: s, rx: fmt(0.08 * s), ry: fmt(0.08 * s), fill: T.white, ...edge, 'data-lcs-sign-part': 'rim' }));
    P.push(el('rect', { x: fmt(0.04 * s), y: fmt(0.04 * s), width: fmt(0.92 * s), height: fmt(0.92 * s), rx: fmt(0.05 * s), ry: fmt(0.05 * s), fill: C.codeBlue, 'data-lcs-sign-part': 'field' }));
    const g = 0.72 * s;
    glyphBox = { x: s / 2 - g / 2, y: s / 2 - g / 2, size: g };
    glyphInk = T.white;
  } else if (shape === 'diamond' || shape === 'pentagon') {
    if (field !== 'yellow') throw new Error(`road-sign: a ${shape} field is yellow`);
    const pts = outlinePts(shape, s);
    P.push(el('path', { d: polyPath(pts, shape === 'diamond' ? 0.04 * s : 0), fill: T.ink, ...edge, 'data-lcs-sign-part': 'rim' }));
    P.push(el('path', { d: polyPath(inset(pts, 0.035 * s), shape === 'diamond' ? 0.03 * s : 0), fill: C.codeYellow, 'data-lcs-sign-part': 'field' }));
    const g = shape === 'diamond' ? 0.48 * s : 0.52 * s;
    glyphBox = { x: s / 2 - g / 2, y: (shape === 'diamond' ? 0.5 : 0.64) * s - g / 2, size: g };
  } else if (shape === 'plateCircle') {
    P.push(el('rect', { x: 0, y: 0, width: s, height: fmt(1.2 * s), rx: fmt(0.06 * s), ry: fmt(0.06 * s), fill: T.ink, ...edge, 'data-lcs-sign-part': 'plate' }));
    P.push(el('rect', { x: fmt(0.03 * s), y: fmt(0.03 * s), width: fmt(0.94 * s), height: fmt(1.14 * s), rx: fmt(0.04 * s), ry: fmt(0.04 * s), fill: T.white }));
    const cx = s / 2, cy = 0.6 * s, R = 0.4 * s;
    P.push(el('circle', { cx: fmt(cx), cy: fmt(cy), r: fmt(R), fill: C.codeRed, 'data-lcs-sign-part': 'rim' }));
    P.push(el('circle', { cx: fmt(cx), cy: fmt(cy), r: fmt(R - 0.12 * 0.8 * s), fill: FIELDS[field], 'data-lcs-sign-part': 'field' }));
    const g = 0.56 * 0.8 * s;
    glyphBox = { x: cx - g / 2, y: cy - g / 2, size: g };
  }

  if (glyph !== 'none' && glyph !== 'text' && glyph !== 'bar') {
    if (!glyphBox) throw new Error(`road-sign: glyph "${glyph}" has no place on a ${shape}`);
    const sc = glyphBox.size / 100;
    P.push(el('g', { transform: `translate(${fmt(glyphBox.x)} ${fmt(glyphBox.y)}) scale(${fmt(sc * 10000) / 10000})`, 'data-lcs-sign-part': 'glyph', 'data-lcs-glyph-kind': glyph, 'data-lcs-glyph-box': `${fmt(glyphBox.x)},${fmt(glyphBox.y)},${fmt(glyphBox.size)}` }, glyphUnits(glyph, glyphInk)));
  }
  if (slash) {
    if (!(shape === 'circle' && rim === 'red') && shape !== 'plateCircle') throw new Error('road-sign: a slash belongs on a red-rim circle');
    const cx = s / 2, cy = shape === 'plateCircle' ? 0.6 * s : s / 2, R = (shape === 'plateCircle' ? 0.4 * s : s / 2) - (shape === 'plateCircle' ? 0.096 * s : 0.12 * s);
    const k = R * Math.SQRT1_2;
    P.push(el('line', { x1: fmt(cx - k), y1: fmt(cy - k), x2: fmt(cx + k), y2: fmt(cy + k), stroke: C.codeRed, 'stroke-width': fmt(0.10 * s), 'data-lcs-sign-part': 'slash' }));
  }
  for (const t of texts) {
    if (t.size < TEXT_FLOOR) throw new Error(`road-sign: text "${t.str}" at s ${s} would print ${t.size.toFixed(1)} px < ${TEXT_FLOOR} (drop the role from this page)`);
    P.push(`<text x="${fmt(t.x)}" y="${fmt(t.y)}" font-family="'Baloo 2'" font-weight="700" font-size="${fmt(t.size)}" fill="${t.fill}" text-anchor="middle" dominant-baseline="central" data-lcs-sign-part="text" data-lcs-fit="${fmt(shape === 'octagon' ? 0.64 * s : shape === 'triDown' ? 0.62 * s : 0.62 * s)}">${esc(t.str)}</text>`);
  }
  const signH = H;
  let W = s, HH = signH;
  if (post) {
    const ph = post.h;
    P.unshift(el('g', { 'data-lcs-sign-part': 'post' },
      el('rect', { x: fmt(s / 2 - 3), y: fmt(signH - 4), width: 6, height: fmt(ph + 4), fill: T.teal }) +
      el('rect', { x: fmt(s / 2 - 10), y: fmt(signH + ph), width: 20, height: 4, rx: 2, ry: 2, fill: T.teal })));
    HH = signH + ph + 4;
  }
  const g = el('g', { 'data-lcs-signal': '1', 'data-lcs-sign-shape': shape, 'data-lcs-sign-rim': rim || 'none', 'data-lcs-sign-field': field, 'data-lcs-sign-glyph': glyph, 'data-lcs-role': role, 'data-lcs-sign-s': fmt(s) }, P.join(''));
  const svg = svgRoot({ width: fmt(W), height: fmt(HH), label: 'road sign' }, g, { style: 'display:block;overflow:visible' });
  return { svg, w: W, h: HH, meta: { shape, rim, field, glyph, slash, text, role, signH } };
}

module.exports = { roadSign, polyPath, inset, outlinePts, shapeHeight, SHAPES, GLYPHS, FIELDS, TEXT_FLOOR, EM_PER_CHAR };
