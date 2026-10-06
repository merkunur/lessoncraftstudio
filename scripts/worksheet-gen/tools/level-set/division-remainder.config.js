/** Level Set config — Division with Remainders, the PICTURE pages (G3-377 Ring the Groups + G3-380 Share It Out),
 *  2026-10-06. PDF + interactive + key. The base sheet for every colour theme at 3 levels (scale rule 2026-10-03:
 *  base = every colour theme, variations 5 themes per level; the base refuses black-and-white art); Share It Out
 *  5 themes per level (only the 2–5 divisor set fits its deal row at level 2). The published theme (the same in all
 *  11 locales, read from the live manifests 2026-10-06) is skipped at level 2. The number pages run from
 *  division-remainder-themeless.config.js. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'dwr',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  // piles to ring and share: never body parts (eyes, hands), colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-10-06: Division with Remainders, picture pages (Ring the Groups for every colour theme, Share It Out 5 themes per level). Level 1 ÷2 and ÷3 with small piles, level 2 the published page, level 3 bigger divisors (scattered piles / sharing among 5 to 7). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G3-377': { published: 'animals', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'G3-380': { published: 'fruits', levels: FIVE },
  },
  include: () => true,
};
