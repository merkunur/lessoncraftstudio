/**
 * b5var-rows/2d-shapes.js — the five K-368 `2d-shapes` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §3; record _work/K-368-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `mode` (types/k/K-368-2d-shapes.js):
 * `d.mode` undefined is the base path (byte-identical, tools/b3-baseline.js --check); a face
 * config carries its own keys and every guard keys on them, never on the level index. The
 * emitter spreads base.difficulty[2] under each override, so the base's own keys ride along
 * inert (a face reads only its own keys; `rows` is re-declared by F1 as a list of kinds).
 *
 * F1 F3 F4 are G1 faces (ids G1-381..383, types/g1/): `extra {gradeBand:'G1'}` so qa/lints.js
 * and emit/manifest.js read the G1 band (targets 44, figures >= 30 / 45). F2 F5 stay K.
 * Titles + instructions === data/b5/2d-shapes.js SHAPES_2D.en.strings[mode] (the gate asserts it).
 */
'use strict';
const G1 = { gradeBand: 'G1' };
const BASE = 'K-368-2d-shapes.js';
const ROWS = [
  ['g1', 'G1-381', '2d-shapes-real-or-not', BASE, 2,
    { mode: 'real-or-not', rows: ['triangle', 'rectangle', 'square'], perRow: 4, trueMin: 1, trueMax: 3, lens: 132, R: [33, 60], nearR: [44, 60], turnedMin: 2, skinnyMin: 1, floorW: 30, floorE: 45, pillPx: 20, colMaxShare: 0.5 },
    '2D Shapes: Real or Not?', 'Read the name in each row and circle every shape that really is that shape.', G1],
  ['k', 'K-371', '2d-shapes-around-us', BASE, 2,
    { mode: 'around-us', items: 8, split: { circle: 4, rectangle: 4 }, pic: 110, tile: [176, 56], tilePx: 16, cols: 2, rows: 4, runMax: 3 },
    '2D Shapes Around Us', 'Look at each picture and color the shape it has: the circle or the rectangle.'],
  ['g1', 'G1-382', '2d-shapes-write-the-names', BASE, 2,
    { mode: 'write-name', lanes: 6, bank: true, turnedMin: 2, elongated: 1, lens: 84, R: [33, 36], rowW: 541, rowH: 70, glyphH: 32, bankPx: 18, floorW: 30, floorE: 45 },
    '2D Shapes: Write the Names', 'Look at each shape and write its name on the line, using the names in the box.', G1],
  ['g1', 'G1-383', '2d-shape-riddles', BASE, 2,
    { mode: 'riddles', cards: 5, tags: 3, tagW: 132, tagH: 44, tagPx: 18, px: 16, lh: 20, slotMaxShare: 0.6, cols: 2, rows: 3 },
    '2D Shape Riddles', 'Read each riddle and circle the name of the shape.', G1],
  ['k', 'K-372', '2d-shapes-draw-on-dots', BASE, 2,
    { mode: 'dot-draw', cards: 4, kinds: ['triangle', 'square', 'square', 'rectangle'], given: [null, null, [3, 0], [0, 4]], pitch: 46, n: 6, pillPx: 22, cols: 2, rows: 2 },
    'Draw 2D Shapes on Dot Paper', 'Read the shape name and join the dots to draw it, starting from the thick line where there is one.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
