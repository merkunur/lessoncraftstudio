/** Level Set config — Arrays and Multiplication (G2-211 + 13 themed variations), 2026-10-04. PDF + interactive + key.
 *  The three themeless variations (G1-110 domino, G1-111 dice, G3-313 area grid) run from arrays-multiplication-themeless.config.js. */
'use strict';
// every type published TWO themes at level 2 (read from the live manifests 2026-10-04): both are skipped
const PUB = require('./arrays-multiplication-published.json');
const ALL3 = { 1: 'all', 2: 'all', 3: 'all' };
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
const THEMED = ['G2-211', 'K-027', 'G2-209', 'G2-210', 'G2-212', 'G2-213', 'G2-216', 'G2-217', 'G3-301', 'G3-302', 'G3-309', 'G3-311', 'G3-312', 'G3-314'];
const byLoc = (id) => Object.fromEntries(Object.entries(PUB).map(([l, v]) => [l, v[id] || []]));
module.exports = {
  prefix: 'arr',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,   // operator 2026-10-03: base every colour theme (+ B&W only where it is a topic of its own); faces 5 themes per level
  note: 'Level Set 2026-10-04: Arrays and Multiplication (G2-211 + 16 variations). The base sheet for every colour theme (and black-and-white topics of their own) at 3 levels; each variation 5 themes (or 5 sets) per level. Levels change the numbers (smaller arrays and groups / the published page / bigger ones). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(THEMED.map((id) => [id, { publishedByLoc: byLoc(id), levels: id === 'G2-211' ? ALL3 : FIVE }])),
  include: () => true,
};
