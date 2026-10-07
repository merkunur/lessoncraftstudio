/** Level Set config — Doubles and Halves, the PICTURE pages (G1-247 base + 6 picture faces), 2026-10-07.
 *  PDF + interactive + key. The base for every colour theme at levels 1-2 (scale rule 2026-10-03: base = every colour
 *  theme; the type refuses black-and-white art); its level 3 is numbers only, so 5 copies. Faces 5 themes per level.
 *  The published theme (the same in all 11 locales, read from the live manifests 2026-10-07) is skipped at level 2.
 *  The number pages (G1-271, G1-298, G1-299) run from doubles-halves-themeless.config.js. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'dh',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  // groups to count: never body parts, colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-10-07: Doubles and Halves, picture pages. Level 1 smaller groups and fewer cards, level 2 the published page, level 3 thinks backwards (the double or the halves are given: find the number). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G1-247': { published: 'fruits', levels: { 1: 'all', 2: 'all', 3: [1, 2, 3, 4, 5] } },
    'G1-270': { published: 'animals', levels: FIVE },
    'G1-286': { published: 'toys', levels: FIVE },
    'G1-287': { published: 'fruits', levels: FIVE },
    'G1-288': { published: 'animals', levels: FIVE },
    'G1-296': { published: 'vehicles', levels: FIVE },
    'G1-297': { published: 'toys', levels: FIVE },
  },
  include: () => true,
};
