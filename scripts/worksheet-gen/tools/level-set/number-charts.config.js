/** Level Set config — Number Charts, the THEMELESS faces (K-021 before/after, K-022 between, G1-130 colour the
 *  counting path, G1-131 / G1-132 one / ten more and less, G2-218 odd number hunt, G2-226 a hundred more and less,
 *  G3-328 number machines), 2026-10-13. PDF + interactive + key. A copy = a seed (G1-130: a copy = its own path);
 *  a copy shares at most half of what it asks with another copy of its level. Level 2 copy 1 is the published page.
 *  The themed faces run from number-charts-themed.config.js. */
'use strict';
const FACES = ['K-021', 'K-022', 'G1-130', 'G1-131', 'G1-132', 'G2-218', 'G2-226', 'G3-328'];
module.exports = {
  prefix: 'nc',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number Charts. Level 1 easier (smaller numbers, fewer empty boxes, straight counting paths), level 2 the published page, level 3 harder (crossing ten and a hundred, empty boxes side by side, new counting rules, two missing inputs). Count in Groups, Odd Number Hunt and Number Machines redesigned to fill the page. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
