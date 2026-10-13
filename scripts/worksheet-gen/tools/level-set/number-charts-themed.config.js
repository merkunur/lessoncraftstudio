/** Level Set config — Number Charts, the THEMED faces (the counting strips, Count in Groups, the hundreds chart),
 *  2026-10-13. PDF + interactive + key. The theme is a corner picture on the strips and the chart, and the counted
 *  pictures on Count in Groups; a copy = a theme + its own seed (new rows, new empty boxes). A face's two live themes
 *  (the same in all 11 locales, read from the live manifests 2026-10-13) are never reused in that face. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
const LIVE = {
  'K-019': ['fruits', 'vehicles'], 'K-020': ['toys', 'vehicles'], 'K-023': ['animals', 'fruits'],
  'G1-123': ['fruits', 'vehicles'], 'G1-124': ['toys', 'vehicles'], 'G1-125': ['shapes', 'toys'], 'G1-126': ['animals', 'shapes'],
  'G1-129': ['animals', 'fruits'], 'G2-207': ['toys', 'vehicles'], 'G2-208': ['shapes', 'toys'],
  'G3-326': ['toys', 'vehicles'], 'G3-327': ['shapes', 'toys'], 'G3-329': ['animals', 'fruits'],
};
module.exports = {
  prefix: 'nct',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  crossFaceShare: true,   // 13 faces × 5 copies a level: more than there are themes
  note: 'Level Set 2026-10-13: Number Charts. Level 1 easier (fewer and spread-out empty boxes, smaller numbers, groups of two), level 2 the published page, level 3 harder (empty boxes side by side, counts that start off the step, new rules, bigger groups with no total given). Count in Groups redesigned to fill the page. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(Object.entries(LIVE).map(([id, published]) => [id, { published, levels: FIVE }])),
  include: () => true,
};
