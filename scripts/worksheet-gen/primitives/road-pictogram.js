/**
 * road-pictogram.js — the K-369 `road-safety` flat silhouettes (no faces), pure
 * SVG on primitives/_tokens.js. Design: docs/worksheet-gen/b5-designs/
 * K-369-road-safety.md §2 "NEW primitives/road-pictogram.js" (B's paths, A's car
 * body, B's facing rule). Every figure is drawn in a 100 x 100 UNIT box and
 * scaled to the requested px height; the car in a 120 x 60 unit box (plus a
 * 22-unit tail zone for the motion lines, so a waiting and a driving car share
 * one scale).
 *
 *   walker({ pose, h = 84, fill = ink, outline = false, strokeW = 2 })
 *       pose: standing | walking | hand | back | back-look-left |
 *             back-look-right | back-walk
 *       outline:true draws the silhouette in `ink` stroke only (fill white):
 *       the UNLIT pedestrian-lamp glyph.
 *   car({ state = 'waiting' | 'driving', w = 100 })          faces RIGHT
 *   streetBand({ kind = 'walk' | 'drive', w, h = 10, poleX })  base + F1
 *   crossingFrame({ step, px = 180 })                          F2 (from behind)
 *   glyphGroup(...)  the bare <g> of a walker in unit space (road-sign.js and
 *       traffic-light.js embed it inside their own coordinate systems)
 *
 * Stamps: every silhouette `<g data-lcs-pictogram="walker|car" data-lcs-pose=…>`;
 * the sight arrow of a look pose `<g data-lcs-sight data-lcs-dir="-1|1">` whose
 * chevron tip is its extreme x (the gate parses the polygon, never the stamp).
 * The car is `teal` (never a code colour: a coloured car beside a lamp teaches
 * the car's colour). Gate: qa/verify-b5-road-pictogram.js.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const T = tokens.color;
const POSES = ['standing', 'walking', 'hand', 'back', 'back-look-left', 'back-look-right', 'back-walk'];
const fmt = (n) => (Math.round(n * 100) / 100).toString();

/* ---------------------------------------------------------------- unit-space parts (100 x 100) */
const STANDING_BODY = 'M38,28 H62 Q66,28 66,32 V60 H60 V94 H52 V62 H48 V94 H40 V60 H34 V32 Q34,28 38,28 Z';
const WALK_TORSO = 'M47,26 L61,26 L65,58 L51,58 Z';
const WALK_LEGS = ['M53,55 L61,55 L76,93 L67,96 Z', 'M51,55 L59,58 L43,96 L34,93 Z'];
const WALK_ARMS = ['M59,29 L65,27 L75,49 L69,52 Z', 'M49,29 L43,31 L32,49 L38,52 Z'];
/** back-walk legs: feet 36 units apart (x 32 .. 68 at the soles) */
const BACK_WALK_LEGS = ['M50,58 L58,58 L70,94 L62,96 Z', 'M42,58 L50,58 L38,96 L30,94 Z'];

function shape(tag, a, { fill, outline, strokeW }) {
  if (outline) return el(tag, { ...a, fill: T.white, stroke: T.ink, 'stroke-width': strokeW, 'stroke-linejoin': 'round' });
  return el(tag, { ...a, fill });
}

/** The walker's shapes in unit space (no <svg>): a string of elements. */
function walkerParts(pose, o) {
  const P = [];
  if (pose === 'standing') {
    P.push(shape('circle', { cx: 50, cy: 14, r: 10 }, o), shape('path', { d: STANDING_BODY }, o));
  } else if (pose === 'walking') {
    for (const d of WALK_LEGS) P.push(shape('path', { d }, o));
    for (const d of WALK_ARMS) P.push(shape('path', { d }, o));
    P.push(shape('path', { d: WALK_TORSO }, o), shape('circle', { cx: 55, cy: 12, r: 10 }, o));
  } else if (pose === 'hand') {
    for (const x of [31, 41, 51, 61]) P.push(shape('rect', { x, y: 14, width: 8, height: 34, rx: 4, ry: 4 }, o));
    P.push(shape('path', { d: 'M30,64 L18,50 L12,54 L26,74 Z' }, o));
    P.push(shape('rect', { x: 30, y: 44, width: 40, height: 48, rx: 8, ry: 8 }, o));
  } else {
    // back views: the head is WHITE with an ink outline and an ink hair cap (the back of the head)
    const dx = pose === 'back-look-left' ? -4 : pose === 'back-look-right' ? 4 : 0;
    const scale = pose === 'back-walk' ? 0.85 : 1;
    const inner = [];
    if (pose === 'back-walk') {
      for (const d of BACK_WALK_LEGS) inner.push(el('path', { d, fill: T.ink }));
      inner.push(el('path', { d: 'M38,28 H62 Q66,28 66,32 V60 H34 V32 Q34,28 38,28 Z', fill: T.ink }));
    } else {
      inner.push(el('path', { d: STANDING_BODY, fill: T.ink }));
    }
    const hx = 50 + dx, hy = 18, hr = 11;
    inner.push(el('circle', { cx: hx, cy: hy, r: hr, fill: T.white, stroke: T.ink, 'stroke-width': 2 }));
    inner.push(el('path', { d: `M${hx - hr},${hy} A${hr},${hr} 0 0 1 ${hx + hr},${hy} Z`, fill: T.ink }));
    if (dx !== 0) {
      // sight arrow: dashed shaft 26 units long from the head edge, solid 10 x 10 chevron at the far end
      const dir = dx < 0 ? -1 : 1;
      const x0 = hx + dir * (hr + 2), x1 = x0 + dir * 26;
      const shaft = el('line', { x1: fmt(x0), y1: hy, x2: fmt(x1 - dir * 6), y2: hy, stroke: T.ink, 'stroke-width': 3, 'stroke-dasharray': '5 4', 'stroke-linecap': 'round' });
      const tip = el('polygon', { points: `${fmt(x1)},${hy} ${fmt(x1 - dir * 10)},${hy - 5} ${fmt(x1 - dir * 10)},${hy + 5}`, fill: T.ink, 'data-lcs-sight-tip': '1' });
      inner.push(el('g', { 'data-lcs-sight': '1', 'data-lcs-dir': dir }, shaft + tip));
    }
    if (pose === 'back-walk') {
      // a straight chevron up the road (walk straight across)
      inner.push(el('g', { 'data-lcs-ahead': '1' }, el('polygon', { points: '50,0 44,8 56,8', fill: T.ink })));
    }
    const body = inner.join('');
    P.push(scale === 1 ? body : el('g', { transform: `translate(${fmt(50 - 50 * scale)} ${fmt(100 - 100 * scale)}) scale(${scale})` }, body));
  }
  return P.join('');
}

/** A walker as a bare <g> in unit space, for embedding (traffic-light, road-sign). */
function glyphGroup({ pose, fill = T.ink, outline = false, strokeW = 2, data = {} } = {}) {
  if (!POSES.includes(pose)) throw new Error(`road-pictogram: pose "${pose}" is not one of ${POSES.join(' | ')}`);
  const a = { 'data-lcs-pictogram': 'walker', 'data-lcs-pose': pose, 'data-lcs-outline': outline ? '1' : '0' };
  for (const [k, v] of Object.entries(data)) a['data-lcs-' + k] = v;
  return el('g', a, walkerParts(pose, { fill, outline, strokeW }));
}

function walker({ pose, h = 84, fill = T.ink, outline = false, strokeW = 2, data = {} } = {}) {
  if (!(h > 0)) throw new Error(`road-pictogram: walker h ${h}`);
  const g = glyphGroup({ pose, fill, outline, strokeW, data });
  const svg = svgRoot({ width: fmt(h), height: fmt(h), viewBox: '0 0 100 100', label: 'person' }, g, { style: 'display:block;overflow:visible' });
  return { svg, w: h, h, meta: { pose } };
}

/* ---------------------------------------------------------------- the car (faces RIGHT) */
const CAR_TAIL = 22;                       // unit zone left of the car for the motion lines
const CAR_VB_W = 120 + CAR_TAIL, CAR_VB_H = 60;
function carParts(state) {
  const P = [];
  P.push(el('path', { d: 'M30,26 L42,8 H82 L96,26 Z', fill: T.teal }));
  P.push(el('rect', { x: 4, y: 26, width: 112, height: 22, rx: 8, ry: 8, fill: T.teal }));
  P.push(el('path', { d: 'M44,12 H80 L90,24 H36 Z', fill: T.white }));
  P.push(el('line', { x1: 63, y1: 12, x2: 63, y2: 24, stroke: T.teal, 'stroke-width': 3 }));
  for (const cx of [30, 90]) {
    P.push(el('circle', { cx, cy: 48, r: 10, fill: T.ink }));
    P.push(el('circle', { cx, cy: 48, r: 4, fill: T.white }));
  }
  if (state === 'driving') {
    const lines = [[20, -6], [30, -18], [40, -10]].map(([y, x0]) => el('line', { x1: x0, y1: y, x2: -2, y2: y, stroke: T.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }));
    P.push(el('g', { 'data-lcs-motion': '1' }, lines.join('')));
  }
  return P.join('');
}
function car({ state = 'waiting', w = 100, data = {} } = {}) {
  if (!['waiting', 'driving'].includes(state)) throw new Error(`road-pictogram: car state "${state}"`);
  const h = w * CAR_VB_H / CAR_VB_W;
  const a = { 'data-lcs-pictogram': 'car', 'data-lcs-state': state };
  for (const [k, v] of Object.entries(data)) a['data-lcs-' + k] = v;
  const svg = svgRoot({ width: fmt(w), height: fmt(h), viewBox: `${-CAR_TAIL} 0 ${CAR_VB_W} ${CAR_VB_H}`, label: 'car' }, el('g', a, carParts(state)), { style: 'display:block' });
  return { svg, w, h, meta: { state } };
}

/* ---------------------------------------------------------------- the street band (side view) */
/**
 * walk: teal kerb x 0..poleX, then a zebra (grid road, white bars 10 wide every
 * 20, ink 1.5 outlines) from poleX to w. drive: grid road the whole width and a
 * white stop line (w 6, ink 1.5 outline) 16 px left of the pole.
 */
function streetBand({ kind = 'walk', w, h = 10, poleX }) {
  if (!['walk', 'drive'].includes(kind)) throw new Error(`road-pictogram: band kind "${kind}"`);
  const P = [];
  if (kind === 'walk') {
    P.push(el('rect', { x: 0, y: 0, width: fmt(poleX), height: h, fill: T.teal, 'data-lcs-band-part': 'kerb' }));
    P.push(el('rect', { x: fmt(poleX), y: 0, width: fmt(w - poleX), height: h, fill: T.ink, 'data-lcs-band-part': 'road' }));
    // DEVIATION (renders 1-2, 2026-09-23): the design's ink 1.5 outline round each 10 x 10 bar
    // printed a row of little SQUARES that read as tick boxes on a page whose job is circling,
    // and flat white bars on the pale `grid` road then read as a dashed line. The road is drawn
    // `ink` (asphalt) with flat white bars inset 2 px top and bottom (so the asphalt edges enclose
    // them on a white page): the zebra every child knows. Same for the drive band. Band 12 px.
    for (let x = poleX + 6; x + 10 <= w - 2; x += 20) {
      P.push(el('rect', { x: fmt(x), y: 2, width: 10, height: fmt(h - 4), fill: T.white, 'data-lcs-band-part': 'zebra' }));
    }
  } else {
    P.push(el('rect', { x: 0, y: 0, width: fmt(w), height: h, fill: T.ink, 'data-lcs-band-part': 'road' }));
    // the stop line: a flat white bar, no outline (an outlined 6 x 10 bar read as a tick box)
    P.push(el('rect', { x: fmt(poleX - 16 - 3), y: 2, width: 6, height: fmt(h - 4), fill: T.white, 'data-lcs-band-part': 'stopline' }));
  }
  const svg = svgRoot({ width: fmt(w), height: fmt(h), label: kind === 'walk' ? 'pavement and crossing' : 'road' }, P.join(''), { style: 'display:block', 'data-lcs-band': kind });
  return { svg, w, h };
}

/* ---------------------------------------------------------------- F2: the crossing seen from BEHIND */
const STEP_POSE = { 'stop-kerb': 'back', 'look-left': 'back-look-left', 'look-right': 'back-look-right', 'look-both': 'back', 'walk-across': 'back-walk', listen: 'back' };
function crossingFrame({ step, px = 180 }) {
  if (!STEP_POSE[step]) throw new Error(`road-pictogram: step "${step}"`);
  const P = [];
  P.push(el('rect', { x: 0, y: 26, width: 100, height: 8, fill: T.tealSoft }));
  P.push(el('rect', { x: 0, y: 34, width: 100, height: 46, fill: T.grid }));
  for (let i = 0; i < 5; i++) P.push(el('rect', { x: fmt(28 + i * 9.5), y: 34, width: 6, height: 46, fill: T.white, stroke: T.ink, 'stroke-width': 1.5 }));
  P.push(el('rect', { x: 0, y: 80, width: 100, height: 20, fill: T.tealSoft }));
  P.push(el('line', { x1: 0, y1: 80, x2: 100, y2: 80, stroke: T.teal, 'stroke-width': 2 }));
  // the child: feet at the kerb (y 98) or ON the stripes (walk-across); drawn at 0.55 scale
  const onRoad = step === 'walk-across';
  const s = 0.55, fx = 50 - 50 * s, fy = onRoad ? 62 - 100 * s + 8 : 98 - 100 * s;
  let fig = glyphGroup({ pose: STEP_POSE[step] });
  if (step === 'look-both') fig = glyphGroup({ pose: 'back-look-left' }) ;
  P.push(el('g', { transform: `translate(${fmt(fx)} ${fmt(fy)}) scale(${s})` }, fig));
  const svg = svgRoot({ width: px, height: px, viewBox: '0 0 100 100', label: 'crossing' }, P.join(''), { style: 'display:block', 'data-lcs-step': step });
  return { svg, w: px, h: px };
}

module.exports = { walker, car, streetBand, crossingFrame, glyphGroup, walkerParts, POSES, CAR_VB_W, CAR_VB_H, CAR_TAIL, STANDING_BODY };
