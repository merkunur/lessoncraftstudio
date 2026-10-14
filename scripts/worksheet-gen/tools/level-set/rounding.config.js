/** Level Set config — Rounding Numbers (G2-346 + G3-387/388/389/390/391), 2026-10-14 (walk #63). PDF + interactive + key.
 *  Themeless: a copy = a seed; copies of a level share at most a quarter of their numbers (levelSetWords = the numbers
 *  asked, the estimate face's pairs). Level 2 copy 1 is the published page (wave-b4 / wave-b4var, September). The
 *  "Which numbers round to 50?" face rounds each copy to its own ten (title swapped by copyStrings); level 3 to a
 *  hundreds ten (350). Screens: type-number (the boxes), type-number into the bins (sort), tap-select (the circle face). */
'use strict';
const FACES = ['G2-346', 'G3-387', 'G3-388', 'G3-389', 'G3-390', 'G3-391'];
module.exports = {
  prefix: 'rnd',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.25,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-14: Rounding Numbers. Level 1 easier (two-digit numbers, fewer lines, the rule box, no bridge past a hundred), level 2 the published page, level 3 harder (no rule box, more lines, x95 bridges, chain-rounding traps like 449, three-digit sums, a hundreds ten to round to). Visible to teachers, never indexed; PDF + interactive screen version where the child types the rounded numbers (or taps the numbers that round to the target) + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
