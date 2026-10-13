/** Level Set config — Number Walls (G1-246 + G1-266/267/268/289 + G2-313), 2026-10-13 (walk #59). PDF + interactive + key.
 *  Themeless: a copy = a seed; copies of a level share at most a quarter of their walls (levelSetWords = the bases).
 *  Level 2 copy 1 is the published page (wave-b2 / wave-b2var, June). The screen version is the NEW kind `type-number`:
 *  the printed page itself, the child types each number into its empty brick (no options to choose from). */
'use strict';
const FACES = ['G1-246', 'G1-266', 'G1-267', 'G1-268', 'G1-289', 'G2-313'];
module.exports = {
  prefix: 'nwl',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.25,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number Walls. Level 1 easier (smaller numbers, one brick of the second row printed, three rows where the face allows), level 2 the published page, level 3 harder (four rows, missing bottom bricks and the top given on one page, bigger sums). Visible to teachers, never indexed; PDF + interactive screen version where the child TYPES each number into its brick + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
