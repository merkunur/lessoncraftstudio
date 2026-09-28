/** Level Set config — Fill in the Missing Word (cloze: G1-350 + G1-366 / 367 / 368 / G2-349 / 350), 2026-09-28. PDF + interactive. */
'use strict';
const ALL = 'skipFirstAtCore';
module.exports = {
  prefix: 'clz',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 2,
  seeds: 1,
  // one copy per SHARE of the face's sentence pool (the published frames + the native panels' new ones): the
  // copies of a level never repeat a sentence; at level 2 share 1 is skipped (the published page is copy 1)
  groupFaces: { 'G1-350': ALL, 'G1-366': ALL, 'G1-367': ALL, 'G1-368': ALL, 'G2-349': ALL, 'G2-350': ALL },
  note: 'Level Set 2026-09-28: Fill in the Missing Word (G1-350 + 5 faces). New sentences, plural sentences and stories by 11 native panels (every picture opened); copies of a level share no sentence; levels change the task (shorter sentences, a word bank, the first letter given, four pairs, two stories with pictures in order; harder: two unused bank words, longer words to spell, eight pairs, harder plurals). Visible to teachers, never indexed; PDF + interactive screen version (letter tiles for the spelling pages) + answer key.',
  faces: {
    'G1-350': { levels: [2, 1, 3] },
    'G1-366': { levels: [2, 1, 3] },
    'G1-367': { levels: [2, 1] },
    'G1-368': { levels: [2, 1, 3] },
    'G2-349': { levels: [2, 1, 3] },
    'G2-350': { levels: [2, 1, 3] },
  },
  include: (loc, face) => !(loc === 'da' && face === 'G2-349'),   // da refuses the plural page (design)
};
