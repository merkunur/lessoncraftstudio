'use strict';
/**
 * b3var-rows/hundreds-chart-puzzles.js — the five variation faces of G1-310
 * `hundreds-chart-puzzles` (design docs/worksheet-gen/b3-designs/
 * G1-310-hundreds-chart-puzzles.md §3; record _work/G1-310-faces.md). Ids are
 * FIXED by _records/b3var-id-allocation.json. Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces on the base's additive `mode` knob (types/g1/
 * G1-310-hundreds-chart-puzzles.js `buildFace` / `verifyFaceInPage`); every row
 * spreads the base's d2 config and sets `mode` + the face's own keys, so the
 * resolved d2 config differs from the base's and from every sibling
 * (tools/gate-variation-distinct.js --batch=b3 --family=hundreds-chart-puzzles).
 * The base's d2 keys a face ignores (shapes / anchorAt / compass …) ride along
 * in D; each face builder reads only its own keys.
 *
 *   F1 G1-347 (g1)  mode:'place'     four fully printed 3x3-box pieces under an almost empty
 *                                    board (guides 'edges'); write each piece's numbers into
 *                                    the board's target cells (NUMBER -> POSITION)
 *   F2 G2-321 (g2)  mode:'jumps'     eight [start][3 arrows][pointer][box] chains
 *   F3 G2-322 (g2)  mode:'riddle'    eight two-clue riddles converging on one box (language-free)
 *   F4 G1-348 (g1)  mode:'error'     six fully printed pieces, ONE wrong number each + a box
 *   F5 G2-323 (g2)  mode:'distance'  eight [A][>][B] pairs, two counters (jumps down / right)
 *
 * The three G2 faces carry `extra {gradeBand:'G2'}` (the base is G1; qa/lints.js +
 * emit/manifest.js read spec.gradeBand); they are the only faces that accept the
 * `tens` unit. EN title + instruction = the bank's strings.F1..F5 verbatim
 * (data/b3/hundreds-chart-puzzles.js; the gate asserts the pair is one source).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g1', 'G1-347', 'hundreds-chart-puzzles-where-does-the-piece-go', 'G1-310-hundreds-chart-puzzles.js', 2,
    { mode: 'place', pieces: 4, piecePool: ['sq3', 'plus', 'L3', 'T3', 'S', 'Z', 'sq3-holes'], pieceCell: 48, pieceFont: 20, pieceGap: 22, boardCell: 46, boardFont: 16, guides: 'edges' },
    'Where Does the Piece Go?',
    'Read the numbers on each piece, find its place on the empty chart and write them in.'],
  ['g2', 'G2-321', 'hundreds-chart-puzzles-jump-puzzles', 'G1-310-hundreds-chart-puzzles.js', 2,
    { mode: 'jumps', items: 8, arrows: 3, noReverse: true, showSteps: false, pointer: true, chip: 36, gap: 8 },
    'Jump Puzzles: Follow the Arrows',
    'Start at the number and follow the arrows: up is 10 less, down is 10 more, left is 1 less, right is 1 more. Write where you land.',
    { gradeBand: 'G2' }],
  ['g2', 'G2-322', 'hundreds-chart-puzzles-mystery-number', 'G1-310-hundreds-chart-puzzles.js', 2,
    { mode: 'riddle', items: 8, kinds: [10, 1], chip: 36, box: { w: 84, h: 56 }, gap: 8 },
    'Mystery Number: Two Arrows, One Square',
    'Follow both arrows. They point to the same square of the chart. Write the mystery number.',
    { gradeBand: 'G2' }],
  ['g1', 'G1-348', 'hundreds-chart-puzzles-find-the-wrong-number', 'G1-310-hundreds-chart-puzzles.js', 2,
    { mode: 'error', shapes: ['sq3', 'L3', 'T3', 'plus', 'T3', 'L3'], cell: 56, fontSize: 20, box: { w: 84, h: 56 }, gap: 16, padLeft: 18, cleanPieces: 0 },
    'Find the Wrong Number on the Piece',
    'One number on each piece is wrong. Circle it and write the right number in the box.'],
  ['g2', 'G2-323', 'hundreds-chart-puzzles-count-the-jumps', 'G1-310-hundreds-chart-puzzles.js', 2,
    { mode: 'distance', items: 8, counterMin: 1, counterMax: 6, chip: 36, box: 44, gap: 8 },
    'How Far Apart? Count the Jumps',
    'Count how many jumps down and how many jumps right take you from the first number to the second.',
    { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
