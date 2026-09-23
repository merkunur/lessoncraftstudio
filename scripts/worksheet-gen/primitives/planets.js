/**
 * planets.js — the eight planet glyphs of G1-378 `earth-and-space` (design
 * docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §2 "NEW
 * primitives/planets.js"; gate qa/verify-planets.js). Used ONLY on the F4 name
 * bank, BESIDE the printed name — never as an answer target, never at honest
 * size: every disc is r 30 at (50,50) in a 0 0 100 100 viewBox (the RULING —
 * honest radii put Mercury at 13 px and would print the rocky/giant split beside
 * the order task). Only Saturn's and Uranus's rings leave the disc.
 *
 *   planetGlyph({id, box = 64}) -> {svg, width, height, sig}
 *
 * Mercury is a pale creamDeep disc with the design's filled inkSoft r 4 craters
 * (the design's disc is `grid`): on grid, Mercury measured L 185-191 against the
 * Earth's 178-184 in greyscale, under the >= 8-level separation, with no other
 * feature to tell them apart (qa/verify-planets.js). On creamDeep it reads as a
 * pale, spotted ball, clear of the Earth; every lighter planet it now sits near
 * carries a ring or bands.
 * Each glyph differs from every other in greyscale by at least one of: mean
 * lightness, ring orientation (h / v / none), banding, a white polar cap
 * (measured by the gate on the pixels). Tokens only; outline ink 2; no text.
 * THROWS for an unknown id or box < 56.
 */
'use strict';
const T = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { EARTH_LAND } = require('./sky-bodies.js');

const C = T.color;
const IDS = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const R = 30;

const disc = (fill) => el('circle', { cx: 50, cy: 50, r: R, fill, 'data-lcs-part': 'disc' });
const outline = () => el('circle', { cx: 50, cy: 50, r: R, fill: 'none', stroke: C.ink, 'stroke-width': 2, 'data-lcs-part': 'outline' });
const clipDefs = (id) => el('defs', {}, el('clipPath', { id }, el('circle', { cx: 50, cy: 50, r: R })));

/** L-class | ring | bands  (the declared signature; the gate measures the real one) */
const SIG = {
  mercury: 'mid|0|0', venus: 'white|0|0', earth: 'light|0|0', mars: 'mid-cap|0|0',
  jupiter: 'light|0|4', saturn: 'light|h|2', uranus: 'pale|v|0', neptune: 'dark|0|0',
};

function recipe(id, cid) {
  const clip = (children) => el('g', { 'clip-path': `url(#${cid})` }, children);
  switch (id) {
    case 'mercury': return [disc(C.creamDeep), ...[[40, 40], [58, 44], [46, 58], [62, 62], [36, 56]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 4, fill: C.inkSoft, 'data-lcs-part': 'crater' })), outline()];
    case 'venus': return [disc(C.white), clip(['M 26 44 Q 50 36 74 46', 'M 24 56 Q 50 50 76 58', 'M 30 66 Q 50 62 70 68'].map((d) => el('path', { d, fill: 'none', stroke: C.grid, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'data-lcs-part': 'swirl' }))), outline()];
    case 'earth': {
      // the earthDisc recipe (sky-bodies.js: the Americas + Greenland) scaled from r 46 to r 30 about (50,50)
      const k = R / 46;
      return [disc(C.tealSoft), clip(el('g', { transform: `translate(50 50) scale(${k.toFixed(4)})` }, EARTH_LAND.map((dd) => el('path', { d: dd, fill: C.teal, stroke: C.teal, 'stroke-width': 1.5, 'stroke-linejoin': 'round' })))), outline()];
    }
    case 'mars': return [disc(C.coral), clip(el('ellipse', { cx: 50, cy: 22, rx: 13, ry: 7, fill: C.white, 'data-lcs-part': 'cap' })) /* a polar CAP, not a full-width band: the band read as "a half-filled glass" to the de/sv panels */, el('ellipse', { cx: 56, cy: 56, rx: 7, ry: 4, fill: C.inkSoft }), outline()];
    case 'jupiter': return [disc(C.white), clip([34, 44, 56, 66].map((y) => el('rect', { x: 18, y: y - 3.5, width: 64, height: 7, fill: C.grid, 'data-lcs-part': 'band' }))), el('ellipse', { cx: 60, cy: 60, rx: 7, ry: 4.5, fill: C.coral, 'data-lcs-part': 'spot' }), outline()];
    case 'saturn': {
      const ring = (half) => el('path', { d: half === 'back' ? 'M 4 50 A 46 10 0 0 1 96 50' : 'M 4 50 A 46 10 0 0 0 96 50', fill: 'none', stroke: C.inkSoft, 'stroke-width': 4, 'stroke-linecap': 'round', transform: 'rotate(-12 50 50)', 'data-lcs-part': 'ring' });
      return [ring('back'), disc(C.creamDeep), clip([44, 57].map((y) => el('rect', { x: 18, y: y - 3, width: 64, height: 6, fill: C.grid, 'data-lcs-part': 'band' }))), outline(), ring('front')];
    }
    case 'uranus': return [disc(C.tealSoft), outline(), el('ellipse', { cx: 50, cy: 50, rx: 5, ry: 40, fill: 'none', stroke: C.grid, 'stroke-width': 2.5, 'data-lcs-part': 'ring' })];
    case 'neptune': return [disc(C.teal), el('path', { d: 'M 36 46 Q 50 42 64 47', fill: 'none', stroke: C.white, 'stroke-width': 2.5, 'stroke-linecap': 'round' }), outline()];
    default: throw new Error(`planets: unknown planet "${id}"`);
  }
}

function planetGlyph({ id, box = 64 } = {}) {
  if (!IDS.includes(id)) throw new Error(`planets: unknown planet "${id}"`);
  if (!(box >= 56)) throw new Error(`planets: box ${box} < 56`);
  const cid = 'es-planet-clip';   // deterministic: every planet clips to the same circle
  const svg = svgRoot({ width: box, height: box, viewBox: '0 0 100 100', label: '' }, [clipDefs(cid), ...recipe(id, cid)], { 'data-lcs-planet': id, 'data-lcs-sig': SIG[id] });
  return { svg, width: box, height: box, sig: SIG[id] };
}

module.exports = { planetGlyph, PLANET_IDS: IDS, GLYPH_R: R };
