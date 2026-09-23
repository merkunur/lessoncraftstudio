'use strict';
/**
 * G1-399 `sink-or-float` — the five variation faces (nt5-F Phase E). Contract: design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §3; record _work/G1-399-faces.md.
 * All five are CODE faces on ONE additive knob `layout` read by the base spec
 * types/g1/G1-399-sink-or-float.js (FACE.build / FACE.verify); the base (layout undefined)
 * stays byte-identical. EN strings === data/b6/sink-or-float.js SINK_OR_FLOAT.en.strings[<id>]
 * (the family gate asserts it). Ids FIXED by _records/b6var-id-allocation.json.
 */
const BASE = 'G1-399-sink-or-float.js';
const S = require('../../data/b6/sink-or-float.js').SINK_OR_FLOAT.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['g1', 'G1-408', 'heavy-or-light-sink-or-float-scale', BASE, 2,
    { layout: 'scale', cards: 4, mix: { heavyFloats: 2, lightFloats: 2 }, bigPx: 76, smallPx: 46, balance: [560, 146], drop: 82, beamAt: 0.2, cols: 1, rows: 4, cardW: 639, cardMin: 154, colGap: 15, rowGap: 12 },
    S['G1-408'].title, S['G1-408'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-382', 'make-clay-float-change-the-shape', BASE, 2,
    { layout: 'shape', forms: ['ball', 'boat'], transfer: ['nail', 'ship'], drawTank: [639, 180], formW: 120, lumpW: 120, tank: [150, 75], cardW: 312, clayH: 196, transferH: 150, rowGap: 12, smallPx: 56, bigPx: 96, legendH: 72, headH: 24 },
    S['G2-382'].title, S['G2-382'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-383', 'why-things-float-true-or-false', BASE, 2,
    { layout: 'truth', rows: 6, mix: { T: 3, F: 3 }, shelfPx: 56, shelfH: 88, textPx: 17, rowMin: 80, rowGap: 8 },
    S['G2-383'].title, S['G2-383'].instruction, { gradeBand: 'G2' }],
  ['k', 'K-384', 'draw-what-floats-and-sinks', BASE, 2,
    { layout: 'draw', tub: [639, 520], spots: 2, tags: true, tagPx: 22 },
    S['K-384'].title, S['K-384'].instruction, { gradeBand: 'K' }],
  ['g3', 'G3-400', 'sink-or-float-investigation-lab-report', BASE, 2,
    { layout: 'report', questions: ['orange', 'cargo'], predictRows: 2, resultRows: 2, learnRows: 2, glyphH: 24, rowH: 42, resultTank: [150, 110], textPx: 17, gap: 6 },
    S['G3-400'].title, S['G3-400'].instruction, { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
