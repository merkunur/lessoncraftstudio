/**
 * b5var-rows/maps.js — the five G1-379 `maps` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3; record _work/G1-379-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `layout`
 * (types/g1/G1-379-map-skills.js): `d.layout` undefined is the base path (byte-identical,
 * tools/b3-baseline.js --check); a face config carries its own keys and every guard keys on
 * them, never on the level index. The emitter spreads base.difficulty[2] under each override,
 * so the base's own keys ride along inert (a face reads only its own keys; F5 re-declares
 * symPx 40).
 *
 *   F1 K-377  top-view            K  (extra gradeBand K: lints + manifest read the K band)
 *   F2 G2-369 compass-rose        G2
 *   F3 G2-370 continents          G2
 *   F4 G3-396 continents-oceans   G3
 *   F5 G2-371 directions-on-map   G2
 *
 * Titles + instructions === data/b5/maps.js MAPS_LOC.en.strings[layout] (the gate asserts it).
 * No title carries the word "compass": treasure-hunt owns that query (§5 rule 10, widened to en).
 */
'use strict';
const BASE = 'G1-379-map-skills.js';
const ROWS = [
  ['k', 'K-377', 'maps-birds-eye-view', BASE, 2,
    { layout: 'top-view', pairs: 5, classMix: [2, 2, 1], pool: 'all', rightOrder: 'derangement', box: 84, itemW: 116, tileW: 104, rowH: 104, rowW: 560, gapMin: 8 },
    "Bird's-Eye View: From the Side and From Above", 'Each thing is drawn from the side. Draw a line to the same thing seen from above.', { gradeBand: 'K' }],
  ['g2', 'G2-369', 'maps-north-east-south-west', BASE, 2,
    { layout: 'compass-rose', roses: 6, rotations: [0, 0, 0, 90, 180, 270], givenUpright: ['e', 's', 'w'], cols: 2, px: 198, cardW: 312, cardH: 214, gapMin: 8 },
    'North, East, South, West: Label the Four Directions', 'Each compass rose shows one letter, so write the other three letters in the empty boxes.', { gradeBand: 'G2' }],
  ['g2', 'G2-370', 'maps-label-the-continents', BASE, 2,
    { layout: 'continents', bank: true, answer: 'write', perRow: 2, laneW: 257, laneH: 44, glyphH: 24, gapMin: 8 },
    'Label the Continents', 'Write the name of each numbered continent on its line. Use the names in the box.', { gradeBand: 'G2' }],
  ['g3', 'G3-396', 'maps-continents-and-oceans', BASE, 2,
    { layout: 'continents-oceans', answer: 'number', runMax: 2, index: { cols: 3, nameW: 150, box: [44, 40], rowH: 56, narrowMax: 8, nameW2: 250 }, gapMin: 8 },
    'Continents and Oceans', 'Find each continent and ocean on the map. Write its number in the box next to its name.', { gradeBand: 'G3' }],
  ['g2', 'G2-371', 'maps-directions-on-a-map', BASE, 2,
    { layout: 'directions-on-map', places: 7, rows: 6, chips: 3, distinctStarts: 6, inDeg: 30, outDeg: 90, symPx: 40, islandW: 533, minApartPx: 72, rosePx: 96, gapMin: 6, legend: true },
    'Cardinal Directions on a Map', 'Start at the first picture on the map, look the way the word says, and circle the one of the three pictures that lies that way.', { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
