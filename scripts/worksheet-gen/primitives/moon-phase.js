/**
 * moon-phase.js — ONE Moon at a given phase, as seen from a given hemisphere
 * (G1-378 `earth-and-space`, design docs/worksheet-gen/b5-designs/
 * G1-378-earth-and-space.md §2 "NEW primitives/moon-phase.js"; gate
 * qa/verify-moon-phase.js).
 *
 *   moonPhase({phase, hemisphere, d, id}) -> {svg, width, height, meta:{phase, litFraction, litSide}}
 *
 * phase 0..7 in steps of 45° of the Sun-Earth-Moon angle θ = 45° x phase:
 *   0 new · 1 waxing crescent · 2 first quarter · 3 waxing gibbous · 4 full ·
 *   5 waning gibbous · 6 last quarter · 7 waning crescent.
 * litFraction = (1 - cos θ) / 2 (the illuminated fraction of the disc).
 * litSide: hemisphere N -> the waxing Moon (1..3) is lit on the RIGHT, the
 * waning Moon (5..7) on the LEFT; hemisphere S (pt, the only southern locale)
 * mirrors both; 0 and 4 are 'none'. A wrong-sided Moon teaches a wrong Moon,
 * so the side is a LOCALE fact the page passes in, never a default.
 *
 * Drawing (viewBox -50 -50 100 100, disc r 46 leaves room for the 3-unit rim):
 *   1. the whole disc in inkSoft  (a new Moon is a grey disc: the Moon is still there)
 *   2. the lit part in white, no stroke, drawn for RIGHT and mirrored with
 *      scale(-1,1) for LEFT: full = the disc; quarter = the half disc;
 *      crescent / gibbous = the half disc bounded by the terminator ellipse
 *      rx = 46 |cos θ| (the second arc's sweep flag 0 = crescent, 1 = gibbous)
 *   3. the rim, teal, stroke 3 units, on top
 * No craters, no face, no halo, no coral, no text.
 *
 * THROWS if phase is not an integer 0..7, hemisphere is not N|S, d < 72, or a
 * crescent (1, 7) is asked for below d 80 (its lit width at the equator is
 * 0.135 d and must stay >= 10.8 px on paper).
 */
'use strict';
const T = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const C = T.color;
const R = 46;
const MIN_D = 72;
const MIN_D_CRESCENT = 80;

function litFractionOf(phase) { return (1 - Math.cos(phase * Math.PI / 4)) / 2; }
function litSideOf(phase, hemisphere) {
  if (phase === 0 || phase === 4) return 'none';
  const waxing = phase < 4;
  const right = hemisphere === 'N' ? waxing : !waxing;
  return right ? 'right' : 'left';
}
const f2 = (x) => Math.round(x * 100) / 100;

/** The lit shape for a Moon lit on the RIGHT (the caller mirrors for LEFT). */
function litPathRight(phase) {
  if (phase === 4) return el('circle', { cx: 0, cy: 0, r: R, fill: C.white, 'data-lcs-part': 'lit' });
  if (phase === 2 || phase === 6) return el('path', { d: `M 0 -${R} A ${R} ${R} 0 0 1 0 ${R} L 0 -${R} Z`, fill: C.white, 'data-lcs-part': 'lit' });
  const rx = f2(R * Math.abs(Math.cos(phase * Math.PI / 4)));
  const gibbous = phase === 3 || phase === 5;
  return el('path', { d: `M 0 -${R} A ${R} ${R} 0 0 1 0 ${R} A ${rx} ${R} 0 0 ${gibbous ? 1 : 0} 0 -${R} Z`, fill: C.white, 'data-lcs-part': 'lit' });
}

function moonPhase({ phase, hemisphere, d, id } = {}) {
  if (!Number.isInteger(phase) || phase < 0 || phase > 7) throw new Error(`moon-phase: phase ${phase} is not an integer 0..7`);
  if (hemisphere !== 'N' && hemisphere !== 'S') throw new Error(`moon-phase: hemisphere "${hemisphere}" is not N or S`);
  if (!(d >= MIN_D)) throw new Error(`moon-phase: d ${d} < ${MIN_D}`);
  if ((phase === 1 || phase === 7) && d < MIN_D_CRESCENT) throw new Error(`moon-phase: a crescent at d ${d} < ${MIN_D_CRESCENT} (its lit width 0.135 d would print under 10.8 px)`);
  const litFraction = litFractionOf(phase);
  const litSide = litSideOf(phase, hemisphere);
  const parts = [el('circle', { cx: 0, cy: 0, r: R, fill: C.inkSoft, 'data-lcs-part': 'dark' })];
  if (phase !== 0) {
    const lit = litPathRight(phase);
    parts.push(litSide === 'left' ? el('g', { transform: 'scale(-1,1)' }, lit) : lit);
  }
  parts.push(el('circle', { cx: 0, cy: 0, r: R, fill: 'none', stroke: C.teal, 'stroke-width': 3, 'data-lcs-part': 'rim' }));
  const svg = svgRoot({ width: d, height: d, viewBox: '-50 -50 100 100', label: '' }, parts, {
    'data-lcs-prim': 'moon-phase', 'data-lcs-phase': phase, 'data-lcs-lit': litFraction.toFixed(3),
    'data-lcs-litside': litSide, 'data-lcs-hemi': hemisphere, id: id || undefined,
  });
  return { svg, width: d, height: d, meta: { phase, litFraction, litSide } };
}

module.exports = { moonPhase, litFractionOf, litSideOf, R, MIN_D, MIN_D_CRESCENT };
