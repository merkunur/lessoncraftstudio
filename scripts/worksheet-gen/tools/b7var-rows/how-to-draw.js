'use strict';
/**
 * K-396 `how-to-draw` — the ten variation faces (nt2-G / b7). Contract: docs/worksheet-gen/b7-designs/K-396-how-to-draw.md §3.
 * All ten are CODE faces on ONE additive knob `mode` read by the base spec types/k/K-396-how-to-draw.js; the base
 * (mode 'base') stays byte-identical. EN strings === data/b7/how-to-draw.js HOW_TO_DRAW.en.strings[<mode>] (the family
 * gate asserts it). Ids FIXED by _records/b7var-id-allocation.json (tools/alloc-b7var-ids.js, file order of the FINAL).
 * Every face pins its unit (the FINAL's demand leader); a wave may swap it through unitOverrides, never the row.
 */
const BASE = 'K-396-how-to-draw.js';
const S = require('../../data/b7/how-to-draw.js').HOW_TO_DRAW.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-401', 'draw-with-simple-shapes', BASE, 2,
    { mode: 'shapes', unit: 'animals-bw-2-dog', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 150, shapesOnFirst: true, boxGuides: 'shapes', box: { w: 449, ratio: 'bbox' } },
    S.shapes.title, S.shapes.instruction],
  ['k', 'K-402', 'trace-then-draw', BASE, 2,
    { mode: 'trace', unit: 'animals-bw-4-rabbit-2', steps: 'all', orient: 'strip', cardPx: 140, traceFill: 'grid', twin: true, twinW: 300 },
    S.trace.title, S.trace.instruction],
  ['k', 'K-403', 'finish-the-drawing', BASE, 2,
    { mode: 'finish', unit: 'farm-animals-bw-pony', orient: 'pair', omit: 'largest', copies: 1, pairW: 292, paper: { w: 282 } },
    S.finish.title, S.finish.instruction],
  ['g1', 'G1-416', 'draw-with-the-grid', BASE, 2,
    { mode: 'grid', unit: 'animals-bw-3-dinosaur', steps: 'none', orient: 'none', cells: 4, cellPx: 72, labels: false, paper: { h: 350 } },
    S.grid.title, S.grid.instruction, { gradeBand: 'G1' }],
  ['k', 'K-404', 'draw-and-write-the-word', BASE, 2,
    { mode: 'word', unit: 'animals-bw-3-fish-2', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 150, paper: { w: 449 }, lane: { reps: 2, emptyLast: true, stack: true, glyphH: 40, h: 60 } },
    S.word.title, S.word.instruction],
  ['g1', 'G1-417', 'draw-it-in-the-scene', BASE, 2,
    { mode: 'scene', unit: 'animals-bw-3-frog-2', scene: 'frog', heroItem: 3, steps: 'all', orient: 'strip', cardPx: 118, sceneW: 540, heroRing: false },
    S.scene.title, S.scene.instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-418', 'order-the-drawing-steps', BASE, 2,
    { mode: 'order', unit: 'animals-bw-5-owl', steps: 5, orient: 'ladder', rail: 'left', cardPx: 118, answer: 'numeral', scramble: 'SCRAMBLE5', badges: false, beside: 'numeral' },
    S.order.title, S.order.instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-419', 'copy-each-step', BASE, 2,
    { mode: 'copy-steps', unit: 'birds-bw-hummingbird', steps: 'all', orient: 'strip', colW: 150, boxH: 'ratio', finalBox: true, paper: { h: 350 } },
    S['copy-steps'].title, S['copy-steps'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-390', 'draw-then-write-about-it', BASE, 2,
    { mode: 'write', unit: 'zoo-animals-bw-bear-2', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 118, paper: { h: 494 }, rows: 3, rowH: 48, glyphH: 24, starters: 'unit' },
    S.write.title, S.write.instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-391', 'draw-from-memory', BASE, 2,
    { mode: 'memory', unit: 'easter-bw-butterfly', steps: 'none', orient: 'none', modelW: 220, fold: true, paper: { w: 620 }, hintShapes: false },
    S.memory.title, S.memory.instruction, { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
