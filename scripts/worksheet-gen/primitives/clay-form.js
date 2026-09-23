/**
 * clay-form.js — the G1-399 F2 "change the shape" material: ONE lump of modelling clay
 * drawn as a lump, a ball or a boat (design docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md
 * §3 F2 "NEW primitives/clay-form.js"). Pure SVG on primitives/_tokens.js, viewBox 0 0 160 120
 * scaled uniformly to width w (height 0.75 w); every stroke is converted to units so it
 * RENDERS at its px width at any size (teal 3 px outline, grid 1.5 px dimples / table).
 *
 *   clayForm({ form: 'lump' | 'ball' | 'boat', w = 120, id }) -> { svg, width, height, meta: {form, areaUnits} }
 *
 * "Same clay" is visible: identical fill (coralSoft), identical 3 px teal outline and the
 * same three thumbprint dimple arcs at the same offsets from each form's clay centre.
 * Every form rests on a table line (grid 1.5, y 116, x 8..152); NO water is ever drawn
 * under a clay form, so no form shows its own answer.
 *   lump  a fixed 8-point closed blob inside x 44..116, y 60..116 (bottom ON the table line) (smooth quadratic
 *         midpoint spline through the points)
 *   ball  circle (80, 82) r 34                     (area 3632 u^2)
 *   boat  hull M 22 80 L 122 80 Q 142 78 148 66 Q 142 98 122 110 Q 117 114 110 114 L 48 114 Q 36 114 30 102 Z (a boat: flat deck, pointed bow,
 *         flat keel, a clay mast + sail — fix round 1; the design's round hull read as a bowl); the HOLLOW (the air
 *         the boat holds) = the ellipse (80, 72) rx 56 ry 7, fill cream, teal 1.5 rim
 *         (measured: lump 3 462, ball 3 634, boat clay = hull - hollow 3 392 u^2 — within ± 7 %)
 * `pancake`, `bowl`, `sheet` are NOT forms (a bowl is a boat without ends; ruled out) —
 * any other form THROWS. meta.areaUnits is the primitive's own claim; the gate
 * (qa/verify-b6-clay-form.js) re-measures the area from the EMITTED markup.
 */
'use strict';
const { color } = require('./_tokens.js');
const { el } = require('./_svg.js');

const VB_W = 160, VB_H = 120;
const FORMS = ['lump', 'ball', 'boat'];
const TABLE_Y = 116;
const r2 = (v) => Math.round(v * 100) / 100;

/* the lump: 8 control points, a closed quadratic midpoint spline (the curve passes through the midpoints) */
const LUMP_PTS = [[44, 104], [45, 72], [64, 60], [96, 60], [116, 72], [116, 104], [104, 116], [56, 116]];
function lumpPath() {
  const P = LUMP_PTS, n = P.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(P[n - 1], P[0]);
  let d = `M ${r2(m0[0])} ${r2(m0[1])}`;
  for (let i = 0; i < n; i++) { const c = P[i], m = mid(P[i], P[(i + 1) % n]); d += ` Q ${c[0]} ${c[1]} ${r2(m[0])} ${r2(m[1])}`; }
  return d + ' Z';
}
/* the boat hull (fix round 1, the fr panel: the design's round hull read as a BOWL — the very shape the design rules
 * out): a flat deck line at y 70, a raked POINTED bow to the right, a flat keel resting on the table, a near-upright
 * transom stern. The clay area is re-measured by the gate (hull - hollow within +-15 % of the ball). */
const BOAT_HULL = 'M 22 80 L 122 80 Q 142 78 148 66 Q 142 98 122 110 Q 117 114 110 114 L 48 114 Q 36 114 30 102 Z';
const HOLLOW = { cx: 72, cy: 81, rx: 46, ry: 5 };   // the open deck (the air the boat holds), fix round 1

/** Each form's clay centre (the dimple anchor) — identical relative offsets on every form. */
const CENTRE = { lump: [80, 92], ball: [80, 84], boat: [80, 100] };
const DIMPLES = [[-14, -6], [6, -11], [10, 6]];

function dimples(form, sw) {
  const [cx, cy] = CENTRE[form];
  return DIMPLES.map(([dx, dy]) => {
    const x = cx + dx, y = cy + dy;
    return el('path', { d: `M ${x - 4} ${y} Q ${x} ${y + 3.5} ${x + 4} ${y}`, fill: 'none', stroke: color.grid, 'stroke-width': sw, 'stroke-linecap': 'round', 'data-lcs-dimple': '' });
  });
}

function clayForm(opts = {}) {
  const { form, w = 120, id } = opts;
  if (!FORMS.includes(form)) throw new Error(`clay-form: unknown form "${form}" (only ${FORMS.join(' / ')}; pancake / bowl / sheet are ruled out)`);
  if (!(w >= 48)) throw new Error(`clay-form: w ${w} < 48`);
  const k = VB_W / w;                  // units per px
  const sw3 = r2(3 * k), sw15 = r2(1.5 * k);
  const clay = { fill: color.coralSoft, stroke: color.teal, 'stroke-width': sw3, 'stroke-linejoin': 'round', 'data-lcs-clay-body': '' };
  const parts = [el('line', { x1: 8, y1: TABLE_Y, x2: 152, y2: TABLE_Y, stroke: color.grid, 'stroke-width': sw15, 'stroke-linecap': 'round', 'data-lcs-table': '' })];
  if (form === 'lump') parts.push(el('path', { d: lumpPath(), ...clay }));
  else if (form === 'ball') parts.push(el('circle', { cx: 80, cy: 82, r: 34, ...clay }));
  else {
    parts.push(el('path', { d: BOAT_HULL, ...clay }));
    // a clay MAST + SAIL (fix round 1: the hull alone read as a tub): the same clay, standing on the hollow's far rim
    parts.push(el('rect', { x: 70, y: 30, width: 4, height: HOLLOW.cy - HOLLOW.ry - 30, fill: color.coralSoft, stroke: color.teal, 'stroke-width': sw15, 'data-lcs-clay-part': 'mast' }));
    parts.push(el('path', { d: 'M 74 32 L 100 46 L 74 60 Z', fill: color.coralSoft, stroke: color.teal, 'stroke-width': sw3, 'stroke-linejoin': 'round', 'data-lcs-clay-part': 'sail' }));
    parts.push(el('ellipse', { cx: HOLLOW.cx, cy: HOLLOW.cy, rx: HOLLOW.rx, ry: HOLLOW.ry, fill: color.cream, stroke: color.teal, 'stroke-width': sw15, 'data-lcs-hollow': '' }));
  }
  parts.push(el('g', { 'data-lcs-dimples': '' }, dimples(form, sw15)));
  const h = r2(w * VB_H / VB_W);
  const svg = el('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width: w, height: h, viewBox: `0 0 ${VB_W} ${VB_H}`, role: 'img', 'aria-hidden': 'true',
    'data-lcs-clay': id || 'clay', 'data-lcs-form': form, style: 'display:block',
  }, parts);
  return { svg, width: w, height: h, meta: { form, areaUnits: null } };
}

module.exports = { clayForm, FORMS, VB_W, VB_H, TABLE_Y, HOLLOW, BOAT_HULL, CENTRE, DIMPLES, lumpPath };
