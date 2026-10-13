/** Level Set config — Number of the Day (G1-243 + G1-255 Teen Numbers / G1-256 Ten More, Ten Less / G1-257 Up to 99),
 *  2026-10-13. PDF ONLY (operator: no screen version, no answer key). Themeless: a copy = a seed = a new number; a copy
 *  shares at most half of its answers with any other copy of its level (no 23 beside 24). The levels live in G1-243
 *  levelsFor(face): level 1 easier, level 2 the published page, level 3 harder. */
'use strict';
module.exports = {
  prefix: 'notd',
  themeless: true,
  interactive: false,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number of the Day. Level 1 easier (a smaller number; one more and one less; for teen numbers the ten is given in a full ten frame; ten frames beside ten more and ten less), level 2 the published page, level 3 harder (bigger numbers, counting back in tens, a number line with fewer printed numbers, teen numbers drawn with blocks). Every answer stays within 99. Visible to teachers, never indexed; PDF only.',
  // teen pages have only nine numbers (11-19): any other number is a new day's page, so neighbours may share answers
  // (a repeated number still shares all of them and is refused); G1-243 level 1 has 15 numbers (21-39, not 25/30/35)
  faces: {
    'G1-243': { levels: [2, 1, 3], shareFrac: 0.6 },
    'G1-255': { levels: [2, 1, 3], shareFrac: 0.9 },
    'G1-256': { levels: [2, 1, 3], shareFrac: 0.9 },
    'G1-257': { levels: [2, 1, 3] },
  },
  include: () => true,
};
