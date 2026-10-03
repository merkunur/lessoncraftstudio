/** Level Set config — Write the Word (G1-244 + G1-258 / 259 / 260 / 291 / 301 / 303 / 304), 2026-10-03. PDF only. */
'use strict';
const ALL3 = { 1: 'all', 2: 'all', 3: 'all' };
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'wtw',
  interactive: false,   // operator: PDF only
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,   // operator 2026-10-03: base every colour theme (+ B&W only where it is a topic of its own); faces 5 themes per level
  note: 'Level Set 2026-10-03: Write the Word (G1-244 + 7 faces), PDF only. The base sheet for every colour theme (and black-and-white topics of their own) at 3 levels: word bank + first letter / letter boxes / plain lines; each face 5 themes per level: 4 (or 6) big cards with short words / the published page / 8 cards with longer words, its clues (bank, first letter, letter boxes) unchanged. Visible to teachers, never indexed.',
  faces: {
    'G1-244': { published: 'fruits', levels: ALL3 },
    'G1-258': { published: 'animals', levels: FIVE },
    'G1-259': { published: 'vehicles', levels: FIVE },
    'G1-260': { published: 'toys', levels: FIVE },
    'G1-291': { published: 'animals', levels: FIVE },
    'G1-301': { published: 'vehicles', levels: FIVE },
    'G1-303': { published: 'toys', levels: FIVE },
    'G1-304': { published: 'animals', levels: FIVE },
  },
  include: () => true,
};
