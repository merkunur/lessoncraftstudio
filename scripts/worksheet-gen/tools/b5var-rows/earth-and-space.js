'use strict';
/**
 * G1-378 `earth-and-space` — the five variation faces (nt10-E Phase E). Contract: design
 * docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §3; record _work/G1-378-faces.md.
 * All five are CODE faces on ONE additive knob `layout` read by the base spec
 * types/g1/G1-378-sun-earth-and-moon.js (_buildFace / _verifyFace); the base (layout undefined)
 * stays byte-identical. EN strings === data/b5/earth-and-space.js EARTH_AND_SPACE_LOC.en.strings.<layout>
 * (the family gate asserts it). Ids FIXED by _records/b5var-id-allocation.json.
 * The base's own difficulty[2] keys ride along inert (a face reads only its own keys).
 */
const BASE = 'G1-378-sun-earth-and-moon.js';
const S = require('../../data/b5/earth-and-space.js').EARTH_AND_SPACE_LOC.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['g1', 'G1-391', 'moon-phases-in-order', BASE, 2,
    { layout: 'moon-phases-in-order', rails: [{ cue: 'grow', phases: [0, 1, 2, 3, 4] }, { cue: 'shrink', phases: [4, 5, 6, 7, 0] }], d: 112, box: [56, 52], givenFirst: false },
    S['moon-phases-in-order'].title, S['moon-phases-in-order'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-367', 'name-the-moon-phases', BASE, 2,
    { layout: 'moon-phase-names', phases: [0, 2, 4, 6, 0, 2, 4, 6], bank: true, d: 96, lineW: 168, lineH: 52, glyphH: 24, lines: 2 },
    S['moon-phase-names'].title, S['moon-phase-names'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-368', 'why-do-we-have-day-and-night', BASE, 2,
    { layout: 'day-and-night-model', r: 150, pins: 6, split: [3, 3], sunDir: 'rng', shadeNight: false },
    S['day-and-night-model'].title, S['day-and-night-model'].instruction, { gradeBand: 'G2' }],
  ['g3', 'G3-394', 'planets-in-order-from-the-sun', BASE, 2,
    { layout: 'planets-in-order', slots: 8, bank: 'glyph-cards', pitch: 56, discD: 36, glyphH: 24 },
    S['planets-in-order'].title, S['planets-in-order'].instruction, { gradeBand: 'G3' }],
  ['g3', 'G3-395', 'giant-and-rocky-planets', BASE, 2,
    { layout: 'planet-sizes', items: 10, bins: ['giant', 'rocky', 'notPlanet'], notPlanet: ['sun', 'moon'], linesPerBin: 5, lineW: 186, lineH: 80, glyphH: 40 },
    S['planet-sizes'].title, S['planet-sizes'].instruction, { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
