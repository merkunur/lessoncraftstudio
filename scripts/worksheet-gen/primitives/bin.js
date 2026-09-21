/**
 * bin.js — the K-357 `recycling` apparatus: ONE lidded waste bin, pure SVG on
 * primitives/_tokens.js, drawn in px from (w, h) with NO viewBox scaling (a
 * 210 x 176 es-MX bin is 176 tall, not 315). Design:
 * docs/worksheet-gen/b4-designs/K-357-recycling.md §2 "NEW primitives/bin.js";
 * every ruling in _work/K-357-critic.md (#1: one name, one geometry, fill
 * modes + marks; fill:'none' draws no mark).
 *
 *   bin({ w = 117, h = 176, colour, mark = 0, fill = 'lid', strokePx = 3, data = {} })
 *     -> { svg, w, h, colourHex, strokePx }
 *
 *   GEOMETRY (px, from w and h):
 *     handle  rect x 0.38w..0.62w, y 0.07h..0.14h, r 0.04w
 *     lid     rect x 0.06w..0.94w, y 0.13h..0.28h, r 0.07w      (lidH = 0.15h)
 *     collar  rect x 0.14w..0.86w, y 0.27h..0.37h
 *     body    path x 0.14w..0.86w, y 0.27h..0.97h, bottom corners r 0.18w,
 *             top corners SQUARE (they sit under the lid)
 *   Stroke teal `strokePx` (3), stroke-linejoin round; at w < 64 the stroke is
 *   max(2, strokePx * w / 117) — a 44 px chip keeps a 2 px line (1.5 vanishes
 *   in print). Each part is a `<g data-lcs-bin-part="handle|lid|collar|body">`;
 *   the four parts share `<g data-lcs-fill="<colourKey>" data-lcs-bin-fillgroup
 *   data-lcs-fill-mode="<fill>">` so verify() reads the INTENDED colour off the
 *   group, never off a fill attribute (the F4 colour face draws every part
 *   white and the group still names the colour).
 *
 *   fill:'lid'   (base, F1 chips, F1 key) handle + lid + collar in `colour`,
 *                body white
 *   fill:'all'   every part in `colour`
 *   fill:'none'  (F4) every part white, NO mark (a white mark on a white lid
 *                is invisible and would leak the answer's position cue)
 *
 *   colour = a `codeColors` key (codeBlue, codeYellow, codeBrown, codeGreen,
 *   codeRed, codeOrange, codePurple, codePink) or 'inkSoft' (the grey of a
 *   residual bin: de Rest / nl Rest / fr Ordures / es Inorgánico / it Secco —
 *   `codeColors` has no grey) or 'teal' (ADDITIVE, base build 2026-09-21: the
 *   NEUTRAL lid of a locale whose bins carry `color:null` — en has no national
 *   colour convention and its F4 is refused, yet its base still draws lidded
 *   bins; every lid the same house teal, the mark + the pill word separate
 *   them). Any other key THROWS.
 *
 *   mark = the MONO cue drawn in white on the lid, keyed on the bin's POSITION
 *   in the locale table (identical on every face in that locale): the design's
 *   greyscale mock prints blue and brown lids as ONE dark grey, green and
 *   inkSoft as two mid greys, so the mark + the word are what separate five
 *   bins in mono — mandatory, not decorative.
 *     0 none (solid lid)
 *     1 three dots r 0.16 lidH at 0.3 / 0.5 / 0.7 w
 *     2 three bars 0.06w x 0.6 lidH, the group CENTRED on the lid (left edges
 *       0.31 / 0.47 / 0.63 w; the design's 0.28 / 0.44 / 0.60 centred the group
 *       at 0.47w, 3.5 px left of the lid's centre at w 117 — recorded deviation)
 *     3 one rounded bar 0.5w x 0.24 lidH
 *     4 zigzag, 5 points, stroke 0.14 lidH, round joins
 *   Every mark feature is clamped >= 2 px (dots r, bar height, bar width,
 *   zigzag stroke) so a 44 px chip still carries it. Marks are `color.white`,
 *   stamped `<g data-lcs-bin-mark="<n>">`.
 *
 *   Min sizes on record: chip 44 x 66 (F1 rows) · key 56 x 84 (F1 key strip)
 *   · base 117 x 270 (the reviewer re-sized the design's 176, 2026-09-21; d3 240) · F4
 *   117 x 260 · es-MX 210 x 270. Node gate:
 *   qa/verify-b4-bin-primitive.js.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const T = tokens.color;
const CODE = tokens.codeColors;
const S = tokens.stroke;

const FILLS = ['lid', 'all', 'none'];
const MARKS = [0, 1, 2, 3, 4];
const REF_W = 117;
const STROKE_CLAMP_W = 64;
const MIN_FEATURE = 2;

/** The hex of a bin colour key: codeColors.* | 'inkSoft' | 'teal' (neutral); anything else THROWS. */
function colourFor(key) {
  if (CODE[key]) return CODE[key];
  if (key === 'inkSoft') return T.inkSoft;
  if (key === 'teal') return T.teal;
  throw new Error(`bin: colour "${key}" is not a codeColors key, 'inkSoft' or 'teal'`);
}
const fmt = (n) => (Math.round(n * 100) / 100).toString();

/** The lid mark (white) for index `mark` on a lid spanning x0..x1, y0..y1. */
function markSvg({ mark, w, x0, x1, y0, y1 }) {
  const lidH = y1 - y0;
  const cy = (y0 + y1) / 2;
  const children = [];
  if (mark === 1) {
    const r = Math.max(MIN_FEATURE, 0.16 * lidH);
    for (const fx of [0.3, 0.5, 0.7]) children.push(el('circle', { cx: fmt(fx * w), cy: fmt(cy), r: fmt(r), fill: T.white }));
  } else if (mark === 2) {
    const bw = Math.max(MIN_FEATURE, 0.06 * w), bh = Math.max(MIN_FEATURE, 0.6 * lidH);
    for (const fx of [0.31, 0.47, 0.63]) children.push(el('rect', { x: fmt(fx * w), y: fmt(cy - bh / 2), width: fmt(bw), height: fmt(bh), rx: fmt(Math.min(2, bw / 2)), fill: T.white }));
  } else if (mark === 3) {
    const bw = Math.max(MIN_FEATURE, 0.5 * w), bh = Math.max(MIN_FEATURE, 0.24 * lidH);
    children.push(el('rect', { x: fmt(w / 2 - bw / 2), y: fmt(cy - bh / 2), width: fmt(bw), height: fmt(bh), rx: fmt(bh / 2), fill: T.white }));
  } else if (mark === 4) {
    const sw = Math.max(MIN_FEATURE, 0.14 * lidH);
    const amp = Math.max(MIN_FEATURE, 0.22 * lidH);
    const xs = [0.28, 0.39, 0.5, 0.61, 0.72].map((f) => f * w);
    const pts = xs.map((x, i) => `${fmt(x)} ${fmt(cy + (i % 2 ? amp : -amp))}`);
    children.push(el('polyline', { points: pts.join(' '), fill: 'none', stroke: T.white, 'stroke-width': fmt(sw), 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  }
  if (!children.length) return '';
  return el('g', { 'data-lcs-bin-mark': mark }, children);
}

function bin({ w = 117, h = 176, colour, mark = 0, fill = 'lid', strokePx = 3, data = {} } = {}) {
  if (!(w > 0 && h > 0)) throw new Error(`bin: w ${w} / h ${h}`);
  if (!FILLS.includes(fill)) throw new Error(`bin: fill "${fill}" is not one of ${FILLS.join(' | ')}`);
  if (!MARKS.includes(mark)) throw new Error(`bin: mark ${mark} is not 0..4`);
  const hex = colourFor(colour);
  const sw = w < STROKE_CLAMP_W ? Math.max(2, strokePx * w / REF_W) : strokePx;
  const partFill = (part) => {
    if (fill === 'none') return T.white;
    if (fill === 'all') return hex;
    return part === 'body' ? T.white : hex;
  };
  const common = { stroke: T.teal, 'stroke-width': fmt(sw), 'stroke-linejoin': 'round' };
  const handle = el('g', { 'data-lcs-bin-part': 'handle' }, el('rect', {
    x: fmt(0.38 * w), y: fmt(0.07 * h), width: fmt(0.24 * w), height: fmt(0.07 * h), rx: fmt(0.04 * w), ry: fmt(0.04 * w), fill: partFill('handle'), ...common,
  }));
  const lid = el('g', { 'data-lcs-bin-part': 'lid' }, el('rect', {
    x: fmt(0.06 * w), y: fmt(0.13 * h), width: fmt(0.88 * w), height: fmt(0.15 * h), rx: fmt(0.07 * w), ry: fmt(0.07 * w), fill: partFill('lid'), ...common,
  }));
  const collar = el('g', { 'data-lcs-bin-part': 'collar' }, el('rect', {
    x: fmt(0.14 * w), y: fmt(0.27 * h), width: fmt(0.72 * w), height: fmt(0.10 * h), fill: partFill('collar'), ...common,
  }));
  // body: square top corners under the collar, rounded bottom corners r 0.18w
  const bx0 = 0.14 * w, bx1 = 0.86 * w, by0 = 0.27 * h, by1 = 0.97 * h, r = 0.18 * w;
  const d = `M ${fmt(bx0)} ${fmt(by0)} L ${fmt(bx1)} ${fmt(by0)} L ${fmt(bx1)} ${fmt(by1 - r)} ` +
    `Q ${fmt(bx1)} ${fmt(by1)} ${fmt(bx1 - r)} ${fmt(by1)} L ${fmt(bx0 + r)} ${fmt(by1)} ` +
    `Q ${fmt(bx0)} ${fmt(by1)} ${fmt(bx0)} ${fmt(by1 - r)} Z`;
  const body = el('g', { 'data-lcs-bin-part': 'body' }, el('path', { d, fill: partFill('body'), ...common }));
  // draw order: body, collar, lid, handle (the lid covers the body's square top); the mark on top of the lid
  const parts = body + collar + lid + handle;
  const mk = fill === 'none' ? '' : markSvg({ mark, w, x0: 0.06 * w, x1: 0.94 * w, y0: 0.13 * h, y1: 0.28 * h });
  const group = el('g', { 'data-lcs-fill': colour, 'data-lcs-bin-fillgroup': '1', 'data-lcs-fill-mode': fill }, parts + mk);
  const extra = { 'data-lcs-bin-svg': '1', 'data-lcs-bin-w': w, 'data-lcs-bin-h': h, 'data-lcs-bin-mark-index': mark, style: 'display:block' };
  for (const [k, v] of Object.entries(data || {})) extra['data-lcs-' + k] = v;
  const svg = svgRoot({ width: w, height: h, label: 'bin' }, group, extra);
  return { svg, w, h, colourHex: hex, strokePx: sw };
}

module.exports = { bin, colourFor, FILLS, MARKS, MIN_FEATURE, STROKE_CLAMP_W, REF_W };
