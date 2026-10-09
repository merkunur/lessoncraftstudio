/** Level Set config — Mental Math (G1-208 + its five faces G1-214..218), 2026-10-09. PDF + interactive + key.
 *  Themeless: a copy = a seed; a copy shares at most half of the facts it asks with another copy of its level.
 *  Level 2 copy 1 is the published page (no June level-1/3 pages exist for this family). */
'use strict';
const FACES = ['G1-208', 'G1-214', 'G1-215', 'G1-216', 'G1-217', 'G1-218'];
module.exports = {
  prefix: 'mm',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-09: Mental Math. Level 1 easier (within 5, no crossing ten, the unknown second), level 2 the published page, level 3 harder (crossing ten, the unknown first, three-number problems). Every page redesigned so the equations fill their cards. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  // G1-214 level 1 (within 5) has only 20 facts for a 12-problem page: its copies may share two thirds
  faces: Object.fromEntries(FACES.map((id) => [id, id === 'G1-214' ? { levels: [2, 1, 3], shareFrac: 0.67 } : { levels: [2, 1, 3] }])),
  include: () => true,
};
