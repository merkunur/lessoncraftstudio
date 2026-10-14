/** Level Set config — Logic Grid Puzzles (G2-319 + G2-344 / G3-378 / G1-349 / G3-379 / G2-345), 2026-10-15 (walk #69).
 *  PDF + interactive + key. The base on EVERY allowlisted theme at 3 levels (the family's pictures are a curated allowlist:
 *  pets, fruits, toys, vehicles, farm animals, zoo animals — every picture opened, colour only by design); each face 5
 *  copies a level. Only six themes exist, so a copy may reuse a theme (`reuseThemes`): a copy is a new puzzle — new
 *  children (20 names a locale), new pictures from the allowlist, a new solution and new clues.
 *  The 4 × 4 face has two levels only (a six-clue 4 × 4 page has no honest easier level — G2-319 FACE_LEVELS).
 *  Screens: tick / cross the printed grid (mark-grid; the read face: tap the tick or the cross). */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'lgp',
  titleMax: 100,
  allowFewer: true,
  interactive: true,
  faceWideDistinct: false,
  reuseThemes: true,
  crossFaceShare: true,
  shareFrac: 0.5,
  // the colour drops differ by hue only (they print as one grey drop on a mono laser — data/b3/logic-puzzles.js): never a theme
  themeDeny: ['colors', 'colors bw'],
  note: 'Level Set 2026-10-15: Logic Grid Puzzles. Level 1 easier (yes clues that fix a whole row and column, two clues a puzzle, ringed pictures only, four statements to judge), level 2 the published page with new children and pictures, level 3 harder (only "does not have" clues incl. the turned-round "… does not belong to …", either-or clues with no yes clue, crossed-out pictures only, "nobody has" and "either … or …" statements). Visible to teachers, never indexed; PDF + interactive screen version (tick and cross the grid on the screen) + answer key.',
  faces: {
    'G2-319': { published: 'pets', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'G2-344': { published: 'fruits', levels: FIVE },
    'G3-378': { published: 'toys', levels: { 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] } },
    'G1-349': { published: 'vehicles', levels: FIVE },
    'G3-379': { published: 'pets', levels: FIVE },
    'G2-345': { published: 'zoo animals', levels: FIVE },
  },
  include: () => true,
};
