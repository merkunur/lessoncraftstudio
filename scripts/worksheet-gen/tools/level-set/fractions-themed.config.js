/** Level Set config — Fractions, the PICTURE faces (G2-233 Share the Set, G3-320 Fraction of the Group), 2026-10-08.
 *  PDF + interactive + key. 5 colour themes per level; the published themes (the same in all 11 locales, read from the
 *  live manifests 2026-10-08: G2-233 fruits + vehicles, G3-320 toys + vehicles) are skipped. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'frs',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  // a set to share: never body parts, colour swatches or activity scenes
  themeDeny: ['body parts', 'body parts bw', 'colors', 'colors bw', 'activities', 'activities bw'],
  note: 'Level Set 2026-10-08: Fractions, fraction of a set. Level 1 one half of small sets, level 2 the published page, level 3 two thirds, three quarters … of the set. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G2-233': { published: ['fruits', 'vehicles'], levels: FIVE },
    'G3-320': { published: ['toys', 'vehicles'], levels: FIVE },
  },
  include: () => true,
};
