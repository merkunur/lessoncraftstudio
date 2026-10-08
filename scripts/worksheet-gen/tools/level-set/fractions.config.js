/** Level Set config — Fractions, the THEMELESS faces (14 of 16), 2026-10-08. PDF + interactive + key.
 *  A copy = a seed; a copy shares at most half of what it asks (its fractions) with another copy of its level, so a
 *  face whose level has few questions to ask (one half of a shape cut in two) gets fewer copies, never padding.
 *  Level 2 copy 1 is the published page. The picture faces (G2-233, G3-320) run from fractions-themed.config.js. */
'use strict';
const FACES = ['G2-228', 'G2-229', 'G2-230', 'G2-231', 'G2-232', 'G2-234', 'G3-315', 'G3-316', 'G3-317', 'G3-318', 'G3-319', 'G3-321', 'G3-322', 'G3-343'];
module.exports = {
  prefix: 'frc',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-08: Fractions. Level 1 smaller denominators and unit fractions, level 2 the published page, level 3 non-unit fractions, bigger denominators, equivalent forms and parts that are not one part. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
