'use strict';
/**
 * b4var-rows/tangram.js — the five variation faces of K-353 `tangram`
 * (design docs/worksheet-gen/b4-designs/K-353-tangram.md §3; record
 * _work/K-353-faces.md). Ids are FIXED by _records/b4var-id-allocation.json.
 * Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces on the base's ONE additive `mode` knob
 * (types/k/K-353-tangram.js `_buildFace`): every row spreads the base's d2
 * config and sets `mode` + its own keys; the base's three configs carry no
 * `mode`, so the published base deck is byte-identical (tools/b3-baseline.js).
 * The base's d2 keys a face ignores (`figures` / `pool` / `seams` / `legend` /
 * `Sg`) ride along in D; each face builder reads only its own keys (`S` /
 * `pool` / `Sg` / `bodyMin` are shared names a row re-sets). The family is
 * THEMELESS and wordless (`themeAxis:{applicable:false}` inherited):
 * `coordinate.theme:''`, `coordinate.mode` = the mode string. Every figure on
 * every face is a stored placement from data/b4/tangram-figures.js.
 *
 *   F1 K-358  mode:'compose'    4 cards: a 2-3 piece glyph strip over an empty WHITE true-size
 *                               outline (S 216); the child DRAWS the seam(s) where the pieces meet (K)
 *   F2 G1-354 mode:'silhouette' 4 solid shadows at S 216, no template, no seams; the child BUILDS each
 *                               with the seven pieces of a physical set (G1, OPEN)
 *   F3 G1-355 mode:'missing'    6 cards: a figure with six tans + one hole beside three TRUE-SIZE chips
 *                               of distinct classes; the child CIRCLES the one that fits (G1)
 *   F4 G2-347 mode:'match'      4 rows: a shadow + three drawn solutions of the same figure, one standing
 *                               like the shadow, two turned / flipped; the child CIRCLES it (G2)
 *   F5 K-359  mode:'count'      4 cards: a built sub-figure over two answer boxes; the child COUNTS the
 *                               triangles, then the squares (K)
 *
 * EN title + instruction = the bank's strings.<mode> verbatim (data/b4/tangram.js;
 * the gate asserts the pair is one source). F2 / F3 carry `extra {gradeBand:'G1'}`
 * and F4 `{gradeBand:'G2'}` (the base is K; qa/lints.js + emit/manifest.js read
 * spec.gradeBand) — their floors are the band's (44 / 36).
 *
 * Measured deviations from §3 (each recorded in _work/K-353-faces.md): F4 ships
 * FOUR rows at box 162 / gap 9 (three rows of 160 left 214 px of paper at the 722
 * chrome — the nt10-D sparse rule; 4 x 162 + 3 x 9 = 675 <= 677, and the 158 px box
 * inner holds the cat, which the design's 156 did not); F3's chip box is the
 * GEOMETRIC glyph height + 12 (the svg height + 8), so the tallest column is 176,
 * not 188 = the 677 inner; F2 / F3 pools are filtered at bodyMin 677 (the build
 * cannot see the chrome), so `cat` never draws at d2.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-358', 'tangram-draw-the-lines-2-and-3-pieces', 'K-353-tangram.js', 2,
    { mode: 'compose', S: 216, Sg: 64, items: 4, cols: 2, rows: 2, pool2: ['m-from-2s', 'p-from-2s', 'trap-m-s', 'bigtri-2l', 'trap-l-m'], pool3: ['trap-q-2s', 'kite-l-q-s', 'pent-l-s-p'], mix: [2, 2], bodyMin: 677 },
    'Easy Tangram Puzzles: Draw the Lines for 2 and 3 Pieces', 'Look at the pieces above each shape. Draw the lines inside the shape to show where those pieces meet.'],
  ['g1', 'G1-354', 'tangram-four-shadows-to-build', 'K-353-tangram.js', 2,
    { mode: 'silhouette', S: 216, items: 4, cols: 2, rows: 2, rowH: 390, pool: ['tree', 'arrow', 'boat', 'cat', 'rectangle', 'square'], padding: 6, bodyMin: 677 },
    'Tangram Puzzles: Four Shadows to Build', 'Build each dark figure with the seven pieces of your tangram. Use all seven pieces every time.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-355', 'tangram-which-piece-is-missing', 'K-353-tangram.js', 2,
    { mode: 'missing', S: 128, items: 6, cols: 2, rows: 3, pool: ['tree', 'arrow', 'cat', 'rectangle', 'square'], holes: ['M', 'S', 'Q', 'P'], chips: 3, chipW: 104, pad: 1.5, bodyMin: 677 },
    'Tangram Puzzles: Which Piece Is Missing?', 'One piece is missing from each figure. Circle the piece that fits the empty space exactly.',
    { gradeBand: 'G1' }],
  ['g2', 'G2-347', 'tangram-which-solution-matches-the-shadow', 'K-353-tangram.js', 2,
    { mode: 'match', S: 102, rows: 4, candidates: 3, box: 162, gap: 9, pad: 1.5, pool: ['tree', 'arrow', 'rectangle', 'cat'], bodyMin: 677 },
    'Tangram Puzzles: Which Solution Matches the Shadow?', 'Look at each shadow. Circle the solution that stands exactly like the shadow. Turned or flipped ones do not match.',
    { gradeBand: 'G2' }],
  ['k', 'K-359', 'tangram-count-the-triangles-and-squares', 'K-353-tangram.js', 2,
    { mode: 'count', S: 160, items: 4, cols: 2, rows: 2, boxes: ['triangles', 'squares'], tans: [3, 6], triangles: [1, 4], pool: ['cat-head', 'rabbit-head', 'tree-4tri', 'rabbit-body', 'arrow-head-q', 'trap-q-2s', 'kite-l-q-s', 'pent-l-s-p'], bodyMin: 677 },
    'Tangram Puzzles: Count the Triangles and Squares', 'Count the triangles in each picture and write the number in the first box. Then count the squares for the second box.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
