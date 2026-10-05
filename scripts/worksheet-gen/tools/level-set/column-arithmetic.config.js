/** Level Set config — Column Addition and Subtraction (G2-251 + 5 variations without regrouping, G3-357 + 5 with), 2026-10-05.
 *  Themeless numbers: 5 new copies per level; a copy shares at most half its problems with another copy of its level.
 *  Level 2 copy 1 is the published page (skipped). PDF + interactive screen version (tap the right answer) + answer key. */
'use strict';
const ALL = ['G2-251', 'G2-255', 'G2-256', 'G2-257', 'G2-258', 'G2-259', 'G3-357', 'G3-359', 'G3-360', 'G3-361', 'G3-362', 'G3-363'];
module.exports = {
  prefix: 'cad',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 40,
  allowFewer: true,
  note: 'Level Set 2026-10-05: Column Addition and Subtraction (12 faces, with and without regrouping). Level 1 smaller numbers and 4 problems, level 2 the published page, level 3 harder numbers or more problems. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(ALL.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
