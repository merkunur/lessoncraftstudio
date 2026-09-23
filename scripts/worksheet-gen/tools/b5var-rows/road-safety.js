/**
 * b5var-rows/road-safety.js — the five K-369 `road-safety` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §3; record _work/K-369-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `mode` (types/k/K-369-road-safety.js):
 * `d.mode` undefined is the base path (byte-identical, tools/b3-baseline.js --check); a face config
 * carries its own keys and every guard keys on them, never on the level index. The emitter spreads
 * base.difficulty[2] under each override, so the base's own keys ride along inert.
 *
 * F1 F2 are K (K-373 K-374); F3 is G1 (G1-384, types/g1/, extra gradeBand G1: signs >= 72, text
 * >= 16); F4 F5 are G2 (G2-360 G2-361, types/g2/, extra gradeBand G2: signs >= 64).
 * Titles + instructions === data/b5/road-safety.js ROAD_SAFETY.en.strings[mode] (the gate asserts it).
 */
'use strict';
const BASE = 'K-369-road-safety.js';
const ROWS = [
  ['k', 'K-373', 'road-safety-color-the-traffic-lights', BASE, 2,
    { mode: 'colour-lights', lights: 6, perRow: 3, car: 4, ped: 2, mutcdCarOnly: true, fill: 'none', onMark: 'rays', lampD: 80, minPole: 18, rowGap: 24 },
    'Road Safety: Color the Traffic Lights', 'Find the lamp with rays on each traffic light and color it the color it shines.'],
  ['k', 'K-374', 'crossing-the-road-safely-steps', BASE, 2,
    { mode: 'crossing-steps', cards: 4, offBy: 3, cardW: 200, figH: 130, minFrameH: 196, gap: 20, rowGap: 18 },
    'Crossing the Road Safely: the Steps', 'Write 1 to 4 in the boxes to show how to cross the road.'],
  ['g1', 'G1-384', 'road-safety-signs-and-meanings', BASE, 2,
    { mode: 'sign-meaning', pairs: 6, signS: 74, leftW: 130, rightW: 340, minH: 96, px: 16, gap: 12, padX: 30 },
    'Road Safety: Traffic Signs and Their Meanings', 'Draw a line from each road sign to what it means.', { gradeBand: 'G1' }],
  ['g2', 'G2-360', 'road-safety-kinds-of-signs', BASE, 2,
    { mode: 'sign-kinds', signs: 8, boxW: 56, boxH: 52, gap: 14, binGap: 24, cardMinH: 176, signExt: 112 },
    'Road Safety: Kinds of Traffic Signs', 'Write the letter of each road sign in the boxes of its group.', { gradeBand: 'G2' }],
  ['g2', 'G2-361', 'road-safety-sign-quiz', BASE, 2,
    { mode: 'sign-quiz', rows: 6, chips: 3, boxW: 360, tile: 88, signExt: 72, px: 16, minRow: 96, gap: 10 },
    'Road Safety Quiz: Which Sign Fits?', 'Read each sentence and circle the one road sign that fits it.', { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
