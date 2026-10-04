/** Level Set config — Arrays and Multiplication, the THEMELESS variations (G1-110 domino, G1-111 dice, G3-313 area grid), 2026-10-04. */
'use strict';
module.exports = {
  prefix: 'arn',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,        // a copy asks at most HALF of the facts of another copy of its level
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-04: Arrays and Multiplication, themeless variations (domino, dice, area grid), 5 sets per level. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: { 'G1-110': { levels: [2, 1, 3] }, 'G1-111': { levels: [2, 1, 3] }, 'G3-313': { levels: [2, 1, 3] } },
  include: () => true,
};
