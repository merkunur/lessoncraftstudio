/** Level Set config — Ordinal Numbers (K-320 + K-336 / G1-315 / G1-316 / G1-317 / G1-318), 2026-10-14 (walk #62).
 *  PDF + interactive + key. The base "Find the Place" for EVERY colour theme at 3 levels (+ the black-and-white themes
 *  with no colour twin); each face 5 themes per level (the race: its racer themes, 2 levels only).
 *  Screens: tap the picture in that place (base, either end, words) · type the place (write, which place, race). */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'ord',
  titleMax: 100,
  allowFewer: true,
  allSkipBwTwins: true,   // the base: every colour theme, a B&W theme only when it is no twin of a colour one (operator 2026-10-03)
  faceWideDistinct: false,
  // the race has few racer themes (animals of the published page excluded as twins): a second copy may run on a theme
  // already used, with mostly other runners
  reuseThemes: true,
  // colour swatches and plain shapes: a "find the small picture in its line" page needs pictures a child tells apart at a glance
  themeDeny: ['colors', 'colors bw', 'shapes', 'shapes bw'],
  note: 'Level Set 2026-10-14: Ordinal Numbers. Level 1 easier (shorter lines, more places given, four runners), level 2 the published page, level 3 harder (lines of 10 up to the tenth, more to write, the flag at either end). Visible to teachers, never indexed; PDF + interactive screen version (tap the picture in that place, or type the place) + answer key.',
  faces: {
    'K-320': { published: 'animals', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'K-336': { published: 'vehicles', levels: FIVE },
    'G1-315': { published: 'zoo animals', levels: FIVE },
    'G1-316': { published: 'farm animals', levels: FIVE },
    'G1-317': { published: 'pets', levels: FIVE },
    'G1-318': { published: 'animals', levels: { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6] } },
  },
  include: () => true,
};
