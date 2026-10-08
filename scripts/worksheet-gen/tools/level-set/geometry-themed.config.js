/** Level Set config — Geometry, the MIRROR-PICTURE faces (G2-247 Mirror Line?, G2-248 Find the Mirror Picture),
 *  2026-10-08. PDF + interactive + key. Themes only from the by-eye reviewed list (data/symmetry-review.js); the
 *  published themes (the same in all 11 locales, read from the live manifests 2026-10-08: G2-247 animals + fruits,
 *  G2-248 fruits — at levels 1-3) are never reused in the face. */
'use strict';
const REVIEWED = Object.keys(require('../../data/symmetry-review.js'));
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'geos',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  themeAllow: REVIEWED,
  note: 'Level Set 2026-10-08: Geometry, mirror symmetry. Level 1 four pictures (two choices), level 2 the published page, level 3 six pictures (three choices). Pictures read by eye. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G2-247': { published: ['animals', 'fruits'], levels: FIVE },
    'G2-248': { published: ['fruits'], levels: FIVE },
  },
  include: () => true,
};
