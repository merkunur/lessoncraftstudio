'use strict';
/**
 * G1-376 `plants` — the five variation faces (nt10-E Phase E). Contract: design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §3; record _work/G1-376-faces.md.
 * All five are CODE faces on ONE additive knob `layout` read by the base spec
 * types/g1/G1-376-parts-of-a-plant.js (_buildFace / _verifyFace); the base (layout
 * undefined) stays byte-identical. EN strings === data/b5/plants.js PLANTS.en.strings.<layout>
 * (the family gate asserts it). Ids FIXED by _records/b5var-id-allocation.json.
 */
const BASE = 'G1-376-parts-of-a-plant.js';
const S = require('../../data/b5/plants.js').PLANTS.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-376', 'what-plants-need-to-grow', BASE, 2,
    { layout: 'needs', rows: 5, pots: 2, mix: { noWater: 2, noLight: 2, neither: 1 }, gift: 64, potH: 104, rowH: 120, rowGap: 14 },
    S.needs.title, S.needs.instruction, { gradeBand: 'K' }],
  ['g1', 'G1-388', 'plant-life-cycle-seed-to-plant', BASE, 2,
    { layout: 'cycle', stages: ['seed', 'sprout', 'seedling', 'flowering', 'fruiting'], given: 'seed', ring: true, slot: [124, 150], R: 165, stripGap: 16 },
    S.cycle.title, S.cycle.instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-363', 'parts-of-a-plant-we-eat', BASE, 2,
    { layout: 'eat', cards: 8, cols: 2, rows: 4, mix: { root: 2, leaf: 2, flower: 1, stem: 1, seed: 1, fruit: 1 }, mixNoStem: { root: 2, leaf: 2, flower: 1, seed: 1, fruit: 2 },
      chips: 3, pic: 96, chipW: 150, chipH: 38, chipPx: 17, cardW: 312, cardH: 150, colGap: 15, rowGap: 12 },
    S.eat.title, S.eat.instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-364', 'parts-of-a-plant-and-their-functions', BASE, 2,
    { layout: 'jobs', parts: ['root', 'stem', 'leaf', 'flower', 'seed'], bank: false, figureH: 560, jobStageW: 340, jobCardW: 319, box: [60, 54], jobPx: 19, jobLineH: 24, rowH: 76, rowGap: 12, maxLines: 4 },
    S.jobs.title, S.jobs.instruction, { gradeBand: 'G2' }],
  ['g3', 'G3-392', 'parts-of-a-flower', BASE, 2,
    { layout: 'flower', labels: ['petal', 'sepal', 'stamen', 'pistil', 'stalk'], decoy: 'root', figureH: 330, vbTop: 110, insetH: 200, insetColW: 140, rowGap: 12, rowH: 64, glyphH: 26, boxW: 205, bankPx: 18 },
    S.flower.title, S.flower.instruction, { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
