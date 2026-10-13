/** Level Set config — Number Lines (2026-10-13), all 21 faces of the family `number-lines` (themeless number pages):
 *  count on / back, addition and subtraction hops, place the number, rounding to ten / hundred, multiplication hops,
 *  repeated subtraction (types/_shared/number-line-tasks.js + G1-118) and "Where on the Number Line?" with its eleven
 *  ranges (G1-248 + G1-274…281, G1-295, G2-305, G2-310). PDF + interactive + key. A copy = a seed; a copy shares at
 *  most half of what it asks with another copy of its level. Level 2 copy 1 is the published page. */
'use strict';
const FACES = ['G1-116', 'G1-117', 'G1-118', 'G1-119', 'G1-138', 'G2-221', 'G3-308', 'G3-310', 'G3-323',
  'G1-248', 'G1-274', 'G1-275', 'G1-276', 'G1-277', 'G1-278', 'G1-279', 'G1-280', 'G1-281', 'G1-295', 'G2-305', 'G2-310'];
module.exports = {
  prefix: 'nln',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number Lines. Level 1 easier (lines to 10 with every number printed, fewer hops, arrows just after a printed number, the halfway mark printed for rounding), level 2 the published page, level 3 harder (hops that cross ten, fewer printed numbers, more arrows further from the printed numbers, three-digit rounding, dots near the middle). Multiplication Hops and Hop Down to Zero now draw equal hops. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
