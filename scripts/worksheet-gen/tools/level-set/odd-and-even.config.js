/** Level Set config — Odd and Even Numbers, the THEMELESS pages (G1-351 base + G2-351 / G2-352 / G3-386), 2026-10-14
 *  (walk #61). PDF + interactive + key. A copy = a seed; copies of a level share at most part of the numbers they ask
 *  (levelSetWords = the numbers). The small ranges (1-10, 2-10, 11-20) cannot avoid repeats — up to half.
 *  Level 2 copy 1 is the published page (wave-b4 / wave-b4var, September; no level-1/3 pages were ever published).
 *  Screens: the house page — tap a box in a house and TYPE the number (any right number of that house, each once);
 *  the equal-parts page — TYPE the two parts and what is left over; the ones and sums pages — tap the circle (the paper
 *  is a tick). */
'use strict';
module.exports = {
  prefix: 'oae',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.34,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-14: Odd and Even Numbers. Level 1 easier (numbers to 10, one dot row, two-digit numbers under 50 with every ones digit once, two-digit sums), level 2 the published page, level 3 harder (numbers to 30 in two rows, all two-row dot piles, sixteen numbers without the rule strip, sixteen three-digit sums without the table). Visible to teachers, never indexed; PDF + interactive screen version (type the numbers; tap the circles) + answer key.',
  faces: {
    'G1-351': { levels: [2, 1, 3], shareFrac: 0.5 },
    'G2-351': { levels: [2, 1, 3], shareFrac: 0.75 },   // 8 cards from 11-12 numbers: a new copy changes at least two of them
    'G2-352': { levels: [2, 1, 3] },
    'G3-386': { levels: [2, 1, 3], shareFrac: 0.25 },
  },
  include: () => true,
};
