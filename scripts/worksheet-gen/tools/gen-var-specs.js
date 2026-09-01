/**
 * gen-var-specs.js — nt20-VAR: emits the thin variation spec modules (the
 * P/S rows of the 20×5 matrix; the 5 moderate-code variations K-252/K-253/
 * G1-232/G2-268/G3-369 are hand-written, not generated). Each emitted file
 * spreads its base spec and overrides {id, slug, difficulty, i18n} (+
 * themeAxis where the variation changes theme applicability). Idempotent:
 * re-running overwrites exactly its own files. Run once; the files then live
 * as normal source under types/{k,g1,g2,g3}.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// dir · id · fileSlug · baseFile · d2 params · EN title · EN instruction (null = inherit base) · extra top-level overrides
const ROWS = [
  // ---- K-236 pre-writing (stroke-set variations; themed-decorative) ----
  ['k', 'K-244', 'prewriting-lines-zigzags', 'K-236-prewriting-strokes.js',
    { reps: 4, n: 4, laneH: 100, strokes: ['line', 'zigzag', 'mountains', 'castle'] },
    'Straight Lines and Zigzags', null],
  ['k', 'K-245', 'prewriting-waves-bumps', 'K-236-prewriting-strokes.js',
    { reps: 4, n: 4, laneH: 100, strokes: ['wave', 'bumps', 'cups', 'loops'] },
    'Wavy Lines and Curves', null],
  ['k', 'K-246', 'prewriting-loops-spirals', 'K-236-prewriting-strokes.js',
    { reps: 4, n: 4, laneH: 100, strokes: ['loops', 'eight', 'spiral', 'wave'] },
    'Loops, Eights and Spirals', null],
  ['k', 'K-247', 'prewriting-advanced-paths', 'K-236-prewriting-strokes.js',
    { reps: 4, n: 4, laneH: 100, strokes: ['castle', 'spiral', 'eight', 'mountains', 'loops'] },
    'Advanced Pencil Paths', null],
  ['k', 'K-248', 'prewriting-review', 'K-236-prewriting-strokes.js',
    { reps: 4, n: 4, laneH: 100, strokes: ['line', 'wave', 'zigzag', 'cups', 'bumps'] },
    'Pencil Path Review', null],

  // ---- K-237 number tracing ----
  ['k', 'K-249', 'number-tracing-0-4', 'K-237-number-tracing.js',
    { digits: [0, 1, 2, 3, 4], glyphH: 92, laneH: 128, reps: 4 },
    'Trace the Numbers 0 to 4', null],
  ['k', 'K-250', 'number-tracing-5-9', 'K-237-number-tracing.js',
    { digits: [5, 6, 7, 8, 9], glyphH: 92, laneH: 128, reps: 4 },
    'Trace the Numbers 5 to 9', null],
  ['k', 'K-251', 'number-trace-and-write', 'K-237-number-tracing.js',
    { digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], glyphH: 52, laneH: 71, reps: 5, emptyLast: true },
    'Trace and Write the Numbers',
    'Trace each number. Then write it yourself in the empty space.'],

  // ---- K-238 letter tracing (rest-pool slices; specials/vowels page) ----
  ['k', 'K-254', 'letter-tracing-g-l', 'K-238-letter-tracing.js',
    { from: 6, count: 6, glyphH: 74, laneH: 108, reps: 5, pool: 'rest' },
    'Trace the Letters G to L', null],
  ['k', 'K-255', 'letter-tracing-m-r', 'K-238-letter-tracing.js',
    { from: 12, count: 6, glyphH: 74, laneH: 108, reps: 5, pool: 'rest' },
    'Trace the Letters M to R', null],
  ['k', 'K-256', 'letter-tracing-s-z', 'K-238-letter-tracing.js',
    { from: 18, count: 8, glyphH: 56, laneH: 80, reps: 5, pool: 'rest', toEnd: true },
    'Trace the Letters S to Z', null],
  ['k', 'K-257', 'letter-tracing-own-letters', 'K-238-letter-tracing.js',
    { from: 'specials', count: 6, glyphH: 74, laneH: 108, reps: 5 },
    'Trace the Vowels', null],
  ['k', 'K-258', 'letter-tracing-first-letters', 'K-238-letter-tracing.js',
    { from: 0, count: 4, glyphH: 104, laneH: 152, reps: 4 },
    'My First Big Letters', null],

  // ---- K-239 sight words (deterministic set windows 2..6) ----
  ...[2, 3, 4, 5, 6].map((set) => ['k', `K-${257 + set}`, `sight-words-set-${set}`, 'K-239-sight-words.js',
    { slice: set - 1, words: 4, glyphH: 52, traceH: 82, writeH: 56, reps: 2 },
    `Sight Words Practice Set ${set}`, null]),

  // ---- K-240 cut & paste (the two-strip 8-tile page; theme fans ride waves) ----
  ['k', 'K-264', 'cut-and-paste-two-groups', 'K-240-cut-and-paste.js',
    { bins: 2, perBin: 4, tilePx: 104, twoStrips: true, ghostGrid: true },
    'Cut and Paste: Two Big Groups', null],

  // ---- K-241 color by code ----
  ['k', 'K-265', 'color-by-shape-code', 'K-241-color-by-code.js',
    { mode: 'shapes', codes: 4, items: 12, size: 96 },
    'Color by Shape Code', null],
  ['k', 'K-266', 'color-by-number-classic', 'K-241-color-by-code.js',
    { mode: 'numbers', codes: 4, items: 12, size: 100, values: [1, 2, 3, 4, 5, 6] },
    'Color by Number',
    'Look at the code. Color every shape to match its number.'],
  ['k', 'K-267', 'color-by-subtraction', 'K-241-color-by-code.js',
    { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['-'] },
    'Subtraction Color by Code', null],
  ['k', 'K-268', 'color-by-add-subtract', 'K-241-color-by-code.js',
    { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['+', '-'] },
    'Add and Subtract Coloring', null],
  ['k', 'K-269', 'color-by-sums-to-20', 'K-241-color-by-code.js',
    { mode: 'sums', codes: 4, items: 12, size: 100, max: 20, ops: ['+'], values: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    'Color by Code: Sums to 20', null],

  // ---- K-242 maze sizes (theme fans ride waves) ----
  ['k', 'K-270', 'maze-easy', 'K-242-maze.js',
    { cols: 7, rows: 8, cell: 74 }, 'Easy Maze', null],
  ['k', 'K-271', 'maze-hard', 'K-242-maze.js',
    { cols: 11, rows: 13, cell: 48 }, 'Hard Maze', null],
  ['k', 'K-272', 'maze-giant', 'K-242-maze.js',
    { cols: 13, rows: 15, cell: 42 }, 'Giant Maze', null],

  // ---- K-243 number bonds ----
  ['k', 'K-273', 'number-bonds-to-5', 'K-243-number-bonds.js',
    { wholeMin: 5, wholeMax: 5, cards: 6, cols: 2, rows: 3, dots: true, blanks: ['a', 'b'], size: 196 },
    'Number Bonds to 5', null],
  ['k', 'K-274', 'number-bonds-within-10', 'K-243-number-bonds.js',
    { wholeMin: 5, wholeMax: 10, dedupUnordered: true, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['a', 'b'], size: 196 },
    'Number Bonds Within 10', null],
  ['k', 'K-275', 'number-bonds-to-20', 'K-243-number-bonds.js',
    { wholeMin: 20, wholeMax: 20, dedupUnordered: true, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['a', 'b'], size: 196 },
    'Number Bonds to 20', null],
  ['k', 'K-276', 'number-bonds-missing-whole', 'K-243-number-bonds.js',
    { wholeMin: 6, wholeMax: 10, dedupUnordered: true, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['whole'], size: 196 },
    'Find the Whole: Number Bonds', null],
  ['k', 'K-277', 'number-bonds-ten-dots', 'K-243-number-bonds.js',
    { wholeMin: 10, wholeMax: 10, dedupUnordered: true, cards: 4, cols: 2, rows: 2, dots: true, blanks: ['a', 'b'], size: 232 },
    'Make Ten with Counting Dots', null],

  // ---- G1-208 mental math ----
  ['g1', 'G1-214', 'mental-math-to-10', 'G1-208-mental-math-to-20.js',
    { max: 10, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: false },
    'Mental Math to 10', null],
  ['g1', 'G1-215', 'missing-numbers-equations-20', 'G1-208-mental-math-to-20.js',
    { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: true },
    'Missing Number Problems to 20',
    'Work out the missing number in your head. Write it in the box.'],
  ['g1', 'G1-216', 'addition-practice-to-20', 'G1-208-mental-math-to-20.js',
    { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+'], missing: false },
    'Addition Practice to 20', null],
  ['g1', 'G1-217', 'subtraction-practice-to-20', 'G1-208-mental-math-to-20.js',
    { max: 20, cards: 12, cols: 3, rows: 4, ops: ['-'], missing: false },
    'Subtraction Practice to 20', null],
  ['g1', 'G1-218', 'missing-numbers-equations-10', 'G1-208-mental-math-to-20.js',
    { max: 10, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: true },
    'Missing Number Problems to 10',
    'Work out the missing number in your head. Write it in the box.'],

  // ---- G1-209 fact families ----
  ['g1', 'G1-219', 'fact-families-to-10', 'G1-209-fact-families.js',
    { max: 10, cards: 4, cols: 2, rows: 2 }, 'Fact Families to 10', null],
  ['g1', 'G1-220', 'fact-family-houses-20', 'G1-209-fact-families.js',
    { max: 20, cards: 6, cols: 2, rows: 3 }, 'Fact Family Houses to 20', null],
  ['g1', 'G1-221', 'fact-house-practice-10', 'G1-209-fact-families.js',
    { max: 10, cards: 6, cols: 2, rows: 3 }, 'Fact House Practice to 10', null],
  ['g1', 'G1-222', 'fact-families-missing-partner', 'G1-209-fact-families.js',
    { max: 20, cards: 4, cols: 2, rows: 2, blank: 'partner' },
    'Fact Families: Missing Partners',
    'Use the three numbers on the roof. Write the missing number in each fact.'],

  // ---- G1-210 number words ----
  ['g1', 'G1-223', 'number-words-to-20', 'G1-210-number-words.js',
    { mode: 'circle', min: 3, max: 20, cards: 6, cols: 2, rows: 3 }, 'Number Words to 20', null],
  ['g1', 'G1-224', 'tens-in-words', 'G1-210-number-words.js',
    { mode: 'circle', pool: 'tens', min: 10, max: 100, cards: 6, cols: 2, rows: 3 },
    'Tens in Words: 10 to 100', null],
  ['g1', 'G1-225', 'match-numbers-to-words', 'G1-210-number-words.js',
    { mode: 'match', min: 13, max: 100, items: 5 },
    'Match Numbers to Words',
    'Draw a line from each number to its word.'],
  ['g1', 'G1-226', 'number-words-to-50', 'G1-210-number-words.js',
    { mode: 'circle', min: 13, max: 50, cards: 6, cols: 2, rows: 3 }, 'Number Words to 50', null],
  ['g1', 'G1-227', 'write-the-number-words', 'G1-210-number-words.js',
    { mode: 'write', min: 3, max: 20, cards: 6, cols: 2, rows: 3 },
    'Write the Number Words',
    'Find the matching word in the word bank. Write it on the line.'],

  // ---- G1-211 money ----
  ['g1', 'G1-228', 'counting-coins-first-steps', 'G1-211-counting-coins.js',
    { coinsMin: 2, coinsMax: 3, denomsUsed: 3, cards: 4, cols: 2, rows: 2, minPx: 66, maxPx: 86 },
    'Counting Coins: First Steps', null],
  ['g1', 'G1-229', 'counting-money-all-coins', 'G1-211-counting-coins.js',
    { coinsMin: 5, coinsMax: 7, denomsUsed: 99, cards: 6, cols: 2, rows: 3, minPx: 42, maxPx: 60 },
    'Counting Money: All the Coins', null],
  ['g1', 'G1-230', 'coin-counting-practice', 'G1-211-counting-coins.js',
    { coinsMin: 3, coinsMax: 5, denomsUsed: 4, cards: 8, cols: 2, rows: 4, minPx: 40, maxPx: 56 },
    'Coin Counting Practice', null],
  ['g1', 'G1-231', 'two-coin-counting', 'G1-211-counting-coins.js',
    { coinsMin: 2, coinsMax: 4, denomsUsed: 2, cards: 6, cols: 2, rows: 3, minPx: 54, maxPx: 74 },
    'Two-Coin Counting', null],

  // ---- G1-212 clock (draw mode only) ----
  ['g1', 'G1-233', 'draw-hands-oclock', 'G1-212-draw-clock-hands.js',
    { cards: 4, stepM: 60 }, "Draw the Hands: O'Clock", null],
  ['g1', 'G1-234', 'draw-hands-half-past', 'G1-212-draw-clock-hands.js',
    { cards: 4, stepM: 30, fixedM: 30 }, 'Draw the Hands: Half Past', null],
  ['g1', 'G1-235', 'draw-hands-quarter-hours', 'G1-212-draw-clock-hands.js',
    { cards: 6, stepM: 15, minutes: [15, 45] }, 'Draw the Hands: Quarter Hours', null],
  ['g1', 'G1-236', 'draw-hands-five-minutes', 'G1-212-draw-clock-hands.js',
    { cards: 6, stepM: 5 }, 'Draw the Hands: Five Minutes', null],
  ['g1', 'G1-237', 'draw-hands-mixed-times', 'G1-212-draw-clock-hands.js',
    { cards: 6, stepM: [60, 30, 15] }, 'Draw the Hands: Mixed Times', null],

  // ---- G1-213 word problems (fruits-pinned wave; animals fan rides base id) ----
  ['g1', 'G1-238', 'addition-word-problems', 'G1-213-word-problems.js',
    { max: 20, problems: 2, iconMax: 12, opsPattern: ['add'] },
    'Addition Word Problems', null],
  ['g1', 'G1-239', 'subtraction-word-problems', 'G1-213-word-problems.js',
    { max: 20, problems: 2, iconMax: 12, opsPattern: ['sub'] },
    'Subtraction Word Problems', null],
  ['g1', 'G1-240', 'word-problems-within-10', 'G1-213-word-problems.js',
    { max: 10, problems: 2, iconMax: 10 }, 'Word Problems Within 10', null],
  ['g1', 'G1-241', 'word-problems-three-stories', 'G1-213-word-problems.js',
    { max: 10, problems: 3, iconMax: 10, thinkH: 70, iconPx: 32 }, 'Word Problem Practice', null],

  // ---- G2-251 column arithmetic, no regrouping ----
  ['g2', 'G2-255', 'column-addition-2-digit', 'G2-251-column-add-sub.js',
    { min: 11, max: 88, sumMax: 99, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    '2-Digit Column Addition', null],
  ['g2', 'G2-256', 'column-subtraction-2-digit', 'G2-251-column-add-sub.js',
    { min: 11, max: 88, sumMax: 99, cards: 6, cols: 3, rows: 2, ops: ['-'] },
    '2-Digit Column Subtraction', null],
  ['g2', 'G2-257', 'column-method-3-digit', 'G2-251-column-add-sub.js',
    { min: 111, max: 888, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    '3-Digit Numbers in Columns', null],
  ['g2', 'G2-258', 'column-addition-3-digit', 'G2-251-column-add-sub.js',
    { min: 111, max: 888, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    '3-Digit Column Addition', null],
  ['g2', 'G2-259', 'column-method-review', 'G2-251-column-add-sub.js',
    { min: 11, max: 888, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    'Column Method Review', null],

  // ---- G2-252 capacity & mass ----
  ['g2', 'G2-260', 'reading-measuring-jugs', 'G2-252-capacity-mass.js',
    { jugs: 6, balances: 0, cols: 3, rows: 2, jugMax: 1000, jugStep: 100, weightsMax: 0 },
    'Reading Measuring Jugs',
    'Read the scale on each jug. Write how many milliliters are inside.',
    { themeAxis: { applicable: false } }],
  ['g2', 'G2-261', 'balance-scales-grams', 'G2-252-capacity-mass.js',
    { jugs: 0, balances: 6, cols: 3, rows: 2, jugMax: 1000, jugStep: 100, weightsMax: 3 },
    'Balance Scales in Grams',
    'Look at the weights on each scale. Write how many grams the object weighs.'],
  ['g2', 'G2-262', 'reading-scales-fine-marks', 'G2-252-capacity-mass.js',
    { jugs: 3, balances: 3, cols: 3, rows: 2, jugMax: 1000, jugStep: 50, weightsMax: 4 },
    'Reading Scales: Small Steps', null],
  ['g2', 'G2-263', 'measuring-jugs-to-2000', 'G2-252-capacity-mass.js',
    { jugs: 6, balances: 0, cols: 3, rows: 2, jugMax: 2000, jugStep: 250, weightsMax: 0 },
    'Measuring Jugs to 2000 ml',
    'Read the scale on each jug. Write how many milliliters are inside.',
    { themeAxis: { applicable: false } }],

  // ---- G2-253 symmetry ----
  ['g2', 'G2-264', 'symmetry-drawing-easy', 'G2-253-symmetry-drawing.js',
    { cards: 4, cols: 2, rows: 2, cell: 26, figures: ['umbrella', 'tulip', 'sun', 'crab'] }, 'Easy Symmetry Drawing', null],
  ['g2', 'G2-265', 'symmetry-drawing-hard', 'G2-253-symmetry-drawing.js',
    { cards: 4, cols: 2, rows: 2, cell: 26, figures: ['ladybug', 'owl', 'sailboat', 'cactus'] }, 'Hard Symmetry Drawing', null],
  ['g2', 'G2-266', 'symmetry-hearts-butterflies', 'G2-253-symmetry-drawing.js',
    { cards: 4, cols: 2, rows: 2, cell: 26, figures: ['heart', 'butterfly', 'snowman', 'tree'] },
    'Mirror Pictures: Heart and Butterfly', null],
  ['g2', 'G2-267', 'symmetry-house-crown', 'G2-253-symmetry-drawing.js',
    { cards: 4, cols: 2, rows: 2, cell: 26, figures: ['house', 'crown', 'mushroom', 'apple'] },
    'Mirror Pictures: House and Crown', null],

  // ---- G2-254 reading comprehension (passages 3..7 — data lands with panels) ----
  ...[2, 3, 4, 5, 6].map((story) => ['g2', `G2-${267 + story}`, `reading-comprehension-story-${story}`, 'G2-254-reading-comprehension.js',
    { idx: story + 1 },
    `Reading Comprehension: Story ${story}`, null]),

  // ---- G3-357 regrouping ----
  ['g3', 'G3-359', 'addition-with-carrying', 'G3-357-column-regrouping.js',
    { min: 15, max: 89, sumMax: 160, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    'Addition with Carrying', null],
  ['g3', 'G3-360', 'subtraction-with-borrowing', 'G3-357-column-regrouping.js',
    { min: 15, max: 89, sumMax: 160, cards: 6, cols: 3, rows: 2, ops: ['-'] },
    'Subtraction with Borrowing', null],
  ['g3', 'G3-361', '3-digit-addition-carrying', 'G3-357-column-regrouping.js',
    { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    '3-Digit Addition with Carrying', null],
  ['g3', 'G3-362', 'subtracting-across-zeros', 'G3-357-column-regrouping.js',
    { min: 115, max: 908, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['-'], acrossZero: true },
    'Subtracting Across Zeros', null],
  ['g3', 'G3-363', 'regrouping-review', 'G3-357-column-regrouping.js',
    { min: 15, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    'Regrouping Review', null],

  // ---- G3-358 times tables (the per-table query family) ----
  ...[[364, 2], [365, 5], [366, 10], [367, 3], [368, 4]].map(([n, table]) => ['g3', `G3-${n}`, `times-table-of-${table}`, 'G3-358-times-tables.js',
    { mode: 'table', table, cards: 10, cols: 2, rows: 5 },
    `Times Table of ${table}`, null]),
];

let written = 0;
for (const [dir, id, fileSlug, baseFile, d2, title, instruction, extra] of ROWS) {
  const basePath = path.join(ROOT, 'types', dir, baseFile);
  const base = require(basePath);
  const instr = instruction || base.i18n.en.instruction;
  const dJson = JSON.stringify(d2);
  const extraSrc = extra
    ? Object.entries(extra).map(([k, v]) => `  ${k}: ${JSON.stringify(v)},\n`).join('')
    : '';
  const src = `/** ${id} — ${title}. nt20-VAR variation of ${base.id} (same family: ${base.exerciseType}). */
'use strict';
const base = require('./${baseFile}');
module.exports = {
  ...base,
  id: '${id}',
  slug: '${fileSlug}',
${extraSrc}  difficulty: { 1: ${dJson}, 2: ${dJson}, 3: ${dJson} },
  i18n: { en: { title: ${JSON.stringify(title)}, instruction: ${JSON.stringify(instr)} } },
};
`;
  fs.writeFileSync(path.join(ROOT, 'types', dir, `${id}-${fileSlug}.js`), src);
  written++;
}
console.log(`gen-var-specs: wrote ${written} variation spec modules`);
