/**
 * compass-rose.js — the G1-379 `maps` compass rose (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 F2 "primitives/compass-rose.js", design A's
 * geometry). Pure SVG on primitives/_tokens.js; viewBox 0 0 200 200, centre (100,100).
 *
 *   kites     4; the up kite M100 46 L113 87 L100 100 L87 87 Z, the others rotated 90/180/270.
 *             Each kite is split on its axis: the CLOCKWISE half teal, the other half white,
 *             outline teal 2 — the shading is rotation-invariant, so a turned rose looks the
 *             same as an upright one and only its LETTERS tell the way round.
 *   ring      r 30 stroke grid 2; centre pin r 4 ink.
 *   N marker  the N kite's halves coral / coralSoft — drawn on EVERY rose, on the kite that
 *             points north (kite rotation / 90). Landing round 1 (2026-09-23): a turned rose
 *             without its marker was a rose with no north at all (the fr/es panels: nothing on
 *             the page said a rose may be turned); a real map's rose always marks north, and
 *             reading north off a turned rose is the map skill. marker:false is a poison seam only.
 *   boxes     40 x 40 r 8 centred at radius 80 on each axis: (100,20) (180,100) (100,180)
 *             (20,100) = positions 0 1 2 3 (up right down left). Given = white, teal 2, the
 *             letter Baloo 2 700 26 units ink, data-lcs-given; blank = white, coral 2.5 dash
 *             6 4, hidden data-lcs-answer=<letter>. Letters always upright. Every box stamps
 *             data-lcs-pos and data-lcs-dir.
 *   tip direction of position p on a rose turned `rotation` degrees clockwise:
 *             DIRS[(p - rotation/90 + 4) % 4], DIRS = ['n','e','s','w'] (clockwise).
 *   reference (F5) all four letters in white circles r 20 units (teal 2), no boxes; upright;
 *             the coral N marker; letters 30 units (14.4 px at px 96 — the design's 26 units
 *             measured 12.5 px, under its own 14 px floor).
 *   overflow  the root is overflow:visible (Phase E, 2026-09-23): the side boxes / circles reach
 *             the viewBox edge (x 0 / 200), so half their stroke was clipped — measured on the
 *             F2 render as a missing box border. Only the G1-379 faces consume this primitive.
 *
 * API
 *   compassRose({ px = 196, rotation = 0, given = 'n', letters, reference = false, marker })
 *     -> { svg, meta:{ rotation, boxes:[{pos, dir, letter, given}] } }
 *     letters = {n,e,s,w} (the locale's dirLetters; every one a non-empty literal); rotation
 *     ∈ {0,90,180,270}; marker defaults to true (reference forces it); px < 180 with
 *     boxes THROWS (a letter under 22 px); a reference px that puts the letter under 14 px THROWS.
 *   posToDir(pos, rotation), DIRS, VIEW (200), BOX_CENTRES
 * Root: <svg data-lcs-prim="compass-rose" data-lcs-rot data-lcs-reference?>
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;
const VIEW = 200;
const DIRS = ['n', 'e', 's', 'w'];
const BOX_CENTRES = [[100, 20], [180, 100], [100, 180], [20, 100]];
const ROTS = [0, 90, 180, 270];
/** reference letters: 30 units = 14.4 px at px 96 (design "14 px"; 26 units measured 12.5 px — deviation) */
const REF_FONT = 30;

function posToDir(pos, rotation) { return DIRS[((pos - rotation / 90) % 4 + 4) % 4]; }

function kite(k, marker) {
  const rot = `rotate(${k * 90} 100 100)`;
  const cw = marker ? T.coral : T.teal, ccw = marker ? T.coralSoft : T.white;
  return el('g', { transform: rot, 'data-lcs-kite': k, ...(marker ? { 'data-lcs-marker': 'n' } : {}) },
    el('path', { d: 'M100 46 L113 87 L100 100 Z', fill: cw }) +
    el('path', { d: 'M100 46 L100 100 L87 87 Z', fill: ccw }) +
    el('path', { d: 'M100 46 L113 87 L100 100 L87 87 Z', fill: 'none', stroke: marker ? T.ink : T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
}

function compassRose({ px = 196, rotation = 0, given = 'n', letters, reference = false, marker } = {}) {
  if (!ROTS.includes(rotation)) throw new Error(`compass-rose: rotation ${rotation} ∉ {0,90,180,270}`);
  if (!letters) throw new Error('compass-rose: no letters (the locale dirLetters)');
  for (const d of DIRS) if (typeof letters[d] !== 'string' || !letters[d].trim()) throw new Error(`compass-rose: letters.${d} missing`);
  if (reference) {
    if (rotation !== 0) throw new Error('compass-rose: a reference rose is always upright');
    if (px * REF_FONT / VIEW < 14) throw new Error(`compass-rose: reference px ${px} puts the letter under 14 px`);
  } else {
    if (px < 180) throw new Error(`compass-rose: px ${px} < 180 with letter boxes (a 22 px letter floor)`);
    if (!DIRS.includes(given)) throw new Error(`compass-rose: given "${given}" ∉ n e s w`);
  }
  const showMarker = reference ? true : (marker === undefined ? true : marker);
  const northPos = rotation / 90;   // the kite that points north
  const parts = [];
  for (let k = 0; k < 4; k++) parts.push(kite(k, showMarker && k === northPos));
  parts.push(el('circle', { cx: 100, cy: 100, r: 30, fill: 'none', stroke: T.grid, 'stroke-width': 2 }));
  parts.push(el('circle', { cx: 100, cy: 100, r: 4, fill: T.ink, 'data-lcs-pin': '' }));
  const boxes = [];
  for (let pos = 0; pos < 4; pos++) {
    const dir = posToDir(pos, rotation), letter = letters[dir];
    const [cx, cy] = BOX_CENTRES[pos];
    if (reference) {
      parts.push(el('g', { 'data-lcs-ref': dir, 'data-lcs-pos': pos, 'data-lcs-dir': dir },
        el('circle', { cx, cy, r: 20, fill: T.white, stroke: T.teal, 'stroke-width': 2 }) +
        el('text', { x: cx, y: cy + 1, 'font-family': `${F.display}, cursive`, 'font-size': REF_FONT, 'font-weight': 700, fill: T.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, letter)));
      boxes.push({ pos, dir, letter, given: true });
      continue;
    }
    const isGiven = dir === given;
    const attrs = { 'data-lcs-pos': pos, 'data-lcs-dir': dir, ...(isGiven ? { 'data-lcs-given': letter } : { 'data-lcs-answer': letter }) };
    parts.push(el('g', attrs,
      el('rect', { x: cx - 20, y: cy - 20, width: 40, height: 40, rx: 8, ry: 8, fill: T.white, stroke: isGiven ? T.teal : T.coral, 'stroke-width': isGiven ? 2 : 2.5, 'stroke-dasharray': isGiven ? undefined : '6 4', 'data-lcs-box': '' }) +
      (isGiven ? el('text', { x: cx, y: cy + 1, 'font-family': `${F.display}, cursive`, 'font-size': 26, 'font-weight': 700, fill: T.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, letter) : '')));
    boxes.push({ pos, dir, letter, given: isGiven });
  }
  const svg = svgRoot({ width: px, height: px, viewBox: `0 0 ${VIEW} ${VIEW}`, label: '' }, parts.join(''),
    { 'data-lcs-prim': 'compass-rose', 'data-lcs-rot': rotation, ...(reference ? { 'data-lcs-reference': '' } : {}), style: 'display:block;overflow:visible' });
  return { svg, meta: { rotation, boxes } };
}

module.exports = { compassRose, posToDir, DIRS, VIEW, BOX_CENTRES };
