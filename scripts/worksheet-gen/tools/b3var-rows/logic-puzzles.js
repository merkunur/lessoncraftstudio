'use strict';
/**
 * b3var-rows/logic-puzzles.js — the five variation faces of G2-319
 * `logic-puzzles` (design docs/worksheet-gen/b3-designs/G2-319-logic-puzzles.md
 * §3; record _work/G2-319-faces.md). Ids are FIXED by
 * _records/b3var-id-allocation.json. Read by tools/gen-b3var-specs.js only.
 *
 * Every row spreads the base's d2 config (types/g2/G2-319-logic-puzzles.js
 * difficulty[2]: 3×3, two cases, three negative clues, cell 60) and overrides
 * it, so the resolved d2 config differs from the base's and from every sibling
 * (tools/gate-variation-distinct.js --batch=b3 --family=logic-puzzles):
 *
 *   F1 G2-344 (g2) PARAM  clue KINDS: either / pos / neg / holderNot, 2-3 clues, one
 *                         `either` per case, >= 1 `pos` AND >= 1 `either` per page
 *                         (`pageMin`, an additive page-level quota the base reads only
 *                         when declared)
 *   F2 G3-378 (g3) PARAM  `size:4`: four children × four pictures, 4-6 clues (neg /
 *                         either, `maxEither:2`), all 8 bank names, NO answer strip —
 *                         the grid is the answer; the design's 344 × 304 grid (rows
 *                         measure 36 one-line / 60 two-line, so even two wrapped
 *                         `either` rows + four one-liners = 284 <= 304)
 *   F3 G1-349 (g1) CODE   `mode:'picture'`: the clue is a name tile + a ringed (has)
 *                         or crossed-out (does not have) picture, no sentence; 2-3
 *                         clues (a `pos` clue on 3×3 always leaves exactly two
 *                         necessary clues, so `clues:[3,3]` + pos is unsatisfiable —
 *                         measured), `pageMin:{pos:1}` so every page shows both
 *                         pictograms; cells 56 (G1 floor 44), stacked 44 px chips
 *   F4 G3-379 (g3) CODE   `mode:'two-attr'`: ONE case, three names × three theme
 *                         pictures × three pictures of a SECOND theme (`attr2`:
 *                         fruits, or pets on the fruits fan — NOT the design's colour
 *                         drops, which print as one grey silhouette; see the record),
 *                         three linked grids in one L-frame, 4-6 clues with >= 1
 *                         linking `cross` clue, no strip
 *   F5 G2-345 (g2) CODE   `mode:'read'`: two SOLVED grids, five statements each with
 *                         a ✓ / ✗ glyph pair the child circles; 2-3 of 5 true
 *
 * EN title + instruction = the bank's strings.F1..F5 verbatim
 * (data/b3/logic-puzzles.js; the gate asserts the pair is one source). The G1 /
 * G3 faces carry `extra {gradeBand}` (qa/lints.js + emit/manifest.js read it).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g2', 'G2-344', 'logic-puzzles-yes-no-either-or-clues', 'G2-319-logic-puzzles.js', 2,
    { clues: [2, 3], kinds: ['either', 'pos', 'neg', 'holderNot'], minEither: 1, maxPos: 1, pageMin: { pos: 1, either: 1 } },
    'Logic Grid Puzzles with Yes, No and Either-Or Clues',
    'A yes clue gets a tick, a no clue gets a cross and an either-or clue crosses out the third picture. Finish the grid, then circle each answer.'],
  ['g3', 'G3-378', 'logic-puzzles-4-by-4-six-clues', 'G2-319-logic-puzzles.js', 2,
    { size: 4, clues: [4, 6], kinds: ['neg', 'either'], maxEither: 2, headW: 104, namePx: 18, picPx: 52, answer: 'none' },
    '4 by 4 Logic Grid Puzzles: Six Clues',
    'Four children and four pictures. Use every clue: cross out what cannot be true and tick what must be true until each row has one answer.',
    { gradeBand: 'G3' }],
  ['g1', 'G1-349', 'logic-puzzles-picture-clues', 'G2-319-logic-puzzles.js', 2,
    { mode: 'picture', clues: [2, 3], kinds: ['neg', 'pos'], maxPos: 1, pageMin: { pos: 1 }, cell: 56, ring: 56, bankPic: 44, bankW: 488, answer: 'circle' },
    'Picture Clue Logic Puzzles: Cross Out and Find',
    'A crossed-out picture means the child does not have it, a ringed one means the child has it. Cross out on the grid, then circle each answer.',
    { gradeBand: 'G1' }],
  ['g3', 'G3-379', 'logic-puzzles-two-attributes', 'G2-319-logic-puzzles.js', 2,
    { mode: 'two-attr', attr2: ['fruits', 'pets'], cases: 1, clues: [4, 6], kinds: ['neg', 'pos', 'cross'], maxPos: 2, minCross: 1, answer: 'none' },
    'Two-Attribute Logic Puzzles: Two Pictures per Child',
    'Each child has one picture from each set. Use the linking clues to fill all three grids.',
    { gradeBand: 'G3' }],
  ['g2', 'G2-345', 'logic-puzzles-read-the-grid-true-or-false', 'G2-319-logic-puzzles.js', 2,
    { mode: 'read', statements: 5, stmtKinds: ['has', 'hasNot', 'holderIs'], trueRange: [2, 3], maxNobody: 1, cell: 56, headW: 104, namePx: 18, glyph: 40, answer: 'none' },
    'Read the Logic Grid: True or False',
    'The grid is already solved. Read it, then circle the tick if the sentence is true or the cross if it is false.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
