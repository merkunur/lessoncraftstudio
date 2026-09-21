/**
 * water-cycle.js — the K-356 `weather-symbols` F4 diagram (design
 * docs/worksheet-gen/b4-designs/K-356-weather.md §2 "NEW primitives/
 * water-cycle.js"). Pure SVG on primitives/_tokens.js (palette-only: cream /
 * tealSoft / white / teal / coral / grid); Node-testable (qa/verify-water-
 * cycle.js re-derives every anchor from the emitted markup AND measures the
 * render). NO picture sits on the diagram and no word is ever drawn: the four
 * stage words live in the chip bank + the numbered lanes of the face.
 *
 * GEOMETRY (design §2, viewBox `0 0 640 400`, y down; every path verbatim):
 *   (1) land   M 360 400 L 360 302 Q 450 212 540 238 Q 600 254 640 246 L 640 400 Z
 *              fill cream, stroke teal 3
 *   (2) water  M 0 300 Q 40 288 80 300 T 160 300 T 240 300 T 320 300 T 400 300
 *              L 400 400 L 0 400 Z  fill tealSoft, no stroke; the top wave as
 *              an open stroke teal 3; two inner wave lines (the same curve
 *              translated to y 332 and 364, x 20..380) grid 1.5. Water AFTER
 *              land so the shoreline (x 360..400) is the water's edge.
 *   (3) sun    circle cx 72 cy 72 r 30 fill coral; eight rays r 38 -> 54
 *              every 45 deg, coral 4, round caps
 *   (4) cloud  ONE closed path M 362 160 A 40 40 0 0 1 398 86 A 56 56 0 0 1
 *              498 92 A 38 38 0 0 1 536 160 Z, fill white, stroke teal 3
 *   (5) evaporation  three wavy vapour lines teal 3 at x 236 / 266 / 296,
 *              each M x 286 q 10 -20 0 -40 q -10 -20 0 -40 q 10 -16 0 -28;
 *              one coral arrow M 200 282 Q 246 196 358 170 + a filled coral
 *              arrowhead (12 x 12) at (358,170) tangent to the curve
 *   (6) precipitation  six dashed teal 3 lines (dash 10 8) from the cloud
 *              base (y 166) to the hill at x 396 / 420 / 444 / 468 / 492 /
 *              516, ending ON the land path (the first quadratic
 *              (360,302)-(450,212)-(540,238) is solved for t at each x, so
 *              the end y is the curve's y there, measured y 270.6..233.1); one coral
 *              arrow M 550 172 L 550 236 + arrowhead down
 *   (7) run-off  coral arrow M 546 252 Q 470 262 406 292 + arrowhead at
 *              (406,292) into the water
 *   (8) markers last: white halo circle r 17 stroke white 4, coral disc
 *              r 13, numeral white Baloo 2 700 17 viewBox units (16.2 px at
 *              w 608, >= 16) centred; <g data-lcs-marker="<anchor>"
 *              data-lcs-n>
 *
 * API
 *   waterCycle({ w = 608, markers = [], id }) -> { svg, width, height, scale,
 *     anchors:{[key]:{x, y}} (px) }  — height = w x 400/640 (608 -> 380;
 *     480 -> 300); w < MIN_W (480) THROWS (a marker numeral falls under
 *     12 px); an unknown anchor THROWS; every marker pair must sit >= 50 px
 *     apart in the render (asserted here; the design's closest pair
 *     precipitation / runoff = 56.6 viewBox units = 53.8 px at w 608).
 *   ANCHORS (5, viewBox coords): evaporation (300,206) beside the arrow's
 *     mid · condensation (449,118) inside the cloud · precipitation (456,214)
 *     among the rain lines · collection (150,344) on the water · runoff
 *     (486,262) on the run-off arrow (d3 only; the d2 page uses four).
 *   HOSTS — the host shape bbox of every anchor (viewBox coords), exported
 *     for the gate: it asserts each anchor lies inside its host.
 *   landY(x) — the land curve's y at x on the first quadratic (360..540).
 *   MIN_W = 480 · VIEW = {w:640, h:400}
 * Root: <svg data-lcs-prim="water-cycle" data-lcs-w role="img" aria-label="">
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, circle, line } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;
const VIEW = Object.freeze({ w: 640, h: 400 });
const MIN_W = 480;
const MARKER_MIN_GAP = 50;   // px, in the render

const ANCHORS = Object.freeze({
  evaporation: Object.freeze({ x: 300, y: 206 }),
  condensation: Object.freeze({ x: 449, y: 118 }),
  precipitation: Object.freeze({ x: 456, y: 214 }),
  collection: Object.freeze({ x: 150, y: 344 }),
  runoff: Object.freeze({ x: 486, y: 262 }),
});

/** Host shape bounding boxes (viewBox coords) — each anchor must sit inside its host. */
const HOSTS = Object.freeze({
  evaporation: Object.freeze({ x0: 200, y0: 170, x1: 358, y1: 282, what: 'the evaporation arrow bbox' }),
  condensation: Object.freeze({ x0: 362, y0: 50, x1: 536, y1: 160, what: 'the cloud bbox' }),
  precipitation: Object.freeze({ x0: 396, y0: 166, x1: 516, y1: 292, what: 'the rain-lines bbox' }),
  collection: Object.freeze({ x0: 0, y0: 300, x1: 400, y1: 400, what: 'the water' }),
  runoff: Object.freeze({ x0: 406, y0: 252, x1: 546, y1: 292, what: 'the run-off arrow bbox' }),
});

const RAIN_X = [396, 420, 444, 468, 492, 516];
const RAIN_TOP = 166;

/** y of the land's first quadratic (360,302) (450,212) (540,238) at x, solved for t by bisection. */
function landY(x) {
  if (x < 360 || x > 540) throw new Error(`water-cycle: landY(${x}) outside the first land quadratic 360..540`);
  const P0 = [360, 302], P1 = [450, 212], P2 = [540, 238];
  const at = (t, i) => (1 - t) * (1 - t) * P0[i] + 2 * (1 - t) * t * P1[i] + t * t * P2[i];
  let lo = 0, hi = 1;
  for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (at(mid, 0) < x) lo = mid; else hi = mid; }
  return at((lo + hi) / 2, 1);
}

/** A filled 12 x 12 arrowhead at (x, y) pointing along the unit direction (dx, dy). */
function arrowhead(x, y, dx, dy) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux;               // perpendicular
  const L = 12, HW = 6;
  const bx = x - ux * L, by = y - uy * L;
  const pts = [[x, y], [bx + px * HW, by + py * HW], [bx - px * HW, by - py * HW]];
  return el('polygon', { points: pts.map((p) => p.map((v) => +v.toFixed(2)).join(',')).join(' '), fill: T.coral, stroke: 'none' });
}

const WAVE = 'M 0 300 Q 40 288 80 300 T 160 300 T 240 300 T 320 300 T 400 300';
const WAVE_INNER = (y) => `M 20 ${y} Q 60 ${y - 12} 100 ${y} T 180 ${y} T 260 ${y} T 340 ${y} T 380 ${y}`;

function waterCycle({ w = 608, markers = [], id } = {}) {
  if (typeof w !== 'number' || !(w >= MIN_W)) throw new Error(`water-cycle: w ${w} < MIN_W ${MIN_W} (a marker numeral would fall under 12 px)`);
  const scale = w / VIEW.w;
  const h = +(w * VIEW.h / VIEW.w).toFixed(2);
  const s = tokens.stroke;
  const parts = [];
  // (1) land
  parts.push(el('path', { d: 'M 360 400 L 360 302 Q 450 212 540 238 Q 600 254 640 246 L 640 400 Z', fill: T.cream, stroke: T.teal, 'stroke-width': s.primitive, 'stroke-linejoin': 'round', 'data-lcs-part': 'land' }));
  // (2) water (after the land: the shoreline is the water's edge)
  parts.push(el('path', { d: WAVE + ' L 400 400 L 0 400 Z', fill: T.tealSoft, stroke: 'none', 'data-lcs-part': 'water' }));
  parts.push(el('path', { d: WAVE, fill: 'none', stroke: T.teal, 'stroke-width': s.primitive, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-lcs-part': 'water-edge' }));
  for (const y of [332, 364]) parts.push(el('path', { d: WAVE_INNER(y), fill: 'none', stroke: T.grid, 'stroke-width': s.grid, 'stroke-linecap': 'round', 'data-lcs-part': 'water-line' }));
  // (3) sun
  parts.push(circle({ cx: 72, cy: 72, r: 30, fill: T.coral, data: { 'data-lcs-part': 'sun' } }));
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4;
    const c = Math.cos(a), sn = Math.sin(a);
    parts.push(line({ x1: +(72 + 38 * c).toFixed(2), y1: +(72 + 38 * sn).toFixed(2), x2: +(72 + 54 * c).toFixed(2), y2: +(72 + 54 * sn).toFixed(2), strokeColor: T.coral, strokeWidth: s.accent, cap: 'round', data: { 'data-lcs-part': 'sun-ray' } }));
  }
  // (4) cloud
  parts.push(el('path', { d: 'M 362 160 A 40 40 0 0 1 398 86 A 56 56 0 0 1 498 92 A 38 38 0 0 1 536 160 Z', fill: T.white, stroke: T.teal, 'stroke-width': s.primitive, 'stroke-linejoin': 'round', 'data-lcs-part': 'cloud' }));
  // (5) evaporation: three vapour lines + the arrow
  for (const x of [236, 266, 296]) parts.push(el('path', { d: `M ${x} 286 q 10 -20 0 -40 q -10 -20 0 -40 q 10 -16 0 -28`, fill: 'none', stroke: T.teal, 'stroke-width': s.primitive, 'stroke-linecap': 'round', 'data-lcs-part': 'vapour' }));
  parts.push(el('g', { 'data-lcs-arrow': 'evaporation' }, [
    el('path', { d: 'M 200 282 Q 246 196 358 170', fill: 'none', stroke: T.coral, 'stroke-width': s.accent, 'stroke-linecap': 'round' }),
    arrowhead(358, 170, 358 - 246, 170 - 196),
  ]));
  // (6) precipitation: six dashed lines onto the land + the arrow down
  for (const x of RAIN_X) {
    const yEnd = +landY(x).toFixed(2);
    parts.push(line({ x1: x, y1: RAIN_TOP, x2: x, y2: yEnd, strokeColor: T.teal, strokeWidth: s.primitive, cap: 'round', dash: '10 8', data: { 'data-lcs-part': 'rain', 'data-lcs-rain-end': yEnd } }));
  }
  parts.push(el('g', { 'data-lcs-arrow': 'precipitation' }, [
    line({ x1: 550, y1: 172, x2: 550, y2: 236, strokeColor: T.coral, strokeWidth: s.accent, cap: 'round' }),
    arrowhead(550, 236, 0, 1),
  ]));
  // (7) run-off into the water
  parts.push(el('g', { 'data-lcs-arrow': 'runoff' }, [
    el('path', { d: 'M 546 252 Q 470 262 406 292', fill: 'none', stroke: T.coral, 'stroke-width': s.accent, 'stroke-linecap': 'round' }),
    arrowhead(406, 292, 406 - 470, 292 - 262),
  ]));
  // (8) markers last
  const anchorsPx = {};
  for (const [k, a] of Object.entries(ANCHORS)) anchorsPx[k] = { x: +(a.x * scale).toFixed(2), y: +(a.y * scale).toFixed(2) };
  const seen = new Set();
  const placed = [];
  for (const m of markers) {
    if (!m || !ANCHORS[m.anchor]) throw new Error(`water-cycle: unknown anchor "${m && m.anchor}"`);
    if (seen.has(m.anchor)) throw new Error(`water-cycle: anchor "${m.anchor}" carries two markers`);
    if (!(Number.isInteger(m.n) && m.n >= 1 && m.n <= 9)) throw new Error(`water-cycle: marker n ${m.n} is not 1..9`);
    seen.add(m.anchor);
    const a = ANCHORS[m.anchor];
    for (const p of placed) {
      const d = Math.hypot(a.x - p.x, a.y - p.y) * scale;
      if (d < MARKER_MIN_GAP) throw new Error(`water-cycle: markers ${m.anchor} / ${p.anchor} are ${d.toFixed(1)} px apart < ${MARKER_MIN_GAP}`);
    }
    placed.push({ anchor: m.anchor, x: a.x, y: a.y });
    parts.push(el('g', { 'data-lcs-marker': m.anchor, 'data-lcs-n': m.n }, [
      circle({ cx: a.x, cy: a.y, r: 17, fill: T.white, strokeColor: T.white, strokeWidth: 4 }),
      circle({ cx: a.x, cy: a.y, r: 13, fill: T.coral }),
      el('text', { x: a.x, y: a.y + 1, 'font-family': F.display, 'font-size': 17, 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(m.n)),
    ]));
  }
  const svg = svgRoot({ width: w, height: h, viewBox: `0 0 ${VIEW.w} ${VIEW.h}`, label: '' }, parts.join(''),
    { 'data-lcs-prim': 'water-cycle', 'data-lcs-w': w, 'data-lcs-markers': markers.length, ...(id ? { id } : {}) });
  return { svg, width: w, height: h, scale, anchors: anchorsPx };
}

module.exports = { waterCycle, ANCHORS, HOSTS, MIN_W, VIEW, landY, RAIN_X, MARKER_MIN_GAP };
