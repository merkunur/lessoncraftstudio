/** Level Set config — Geometry, the THEMELESS faces (14 of 16), 2026-10-08. PDF + interactive + key.
 *  A copy = a seed; a copy shares at most half of what it asks with another copy of its level (fewer copies where a
 *  level cannot vary). Level 2 copy 1 is the published page. The mirror-picture faces (G2-247, G2-248) run from
 *  geometry-themed.config.js. */
'use strict';
const FACES = ['K-075', 'K-076', 'G2-241', 'G2-242', 'G2-243', 'G2-244', 'G2-245', 'G2-246', 'G3-337', 'G3-338', 'G3-339', 'G3-340', 'G3-341', 'G3-342'];
module.exports = {
  prefix: 'geo',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-08: Geometry. Level 1 fewer and plainer shapes, level 2 the published page, level 3 more sides, turned shapes, near-right angles, side lengths instead of squares. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
