/** Level Set config — Question Words (G1-353 + G1-373 / G1-374 / G1-375 / G2-356 / G2-357), 2026-09-29. PDF + interactive + key (G2-357 printable only). */
'use strict';
module.exports = {
  prefix: 'qwd',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 4,          // a new copy shares at most a third of its names / things / places / times (≤ 4) with any other copy of its level
  shareFrac: 1 / 3,
  seeds: 60,
  note: 'Level Set 2026-09-29: Question Words (G1-353 + 5 faces). Levels change the task: circle the question word 3 chips with the highlighted thing\'s own picture / 3 chips / 5 chips incl. when and how many; match 4 short answers with pictures / 5 / 6 WHOLE answer sentences, no pictures, two names on two rows each; fill a bank of 3 / 5 / no bank; sort 6 tiles / 9 / 12 tiles and a fourth bin When?; write the question with the question word printed / the whole question / two questions per sentence (two highlights); ask about the picture 4 starters on big lines / 6 starters / no starters, the six words in a box. Native panels wrote the level titles/instructions and corrected the bank for the new pages. Visible to teachers, never indexed; PDF + interactive screen version + answer key (the open ask page: PDF only).',
  faces: {
    'G1-353': { levels: [2, 1, 3] },
    'G1-373': { levels: [2, 1, 3] },
    'G1-374': { levels: [2, 1, 3] },
    'G1-375': { levels: [2, 1, 3] },
    'G2-356': { levels: [2, 1, 3] },
    'G2-357': { levels: [2, 1, 3] },
  },
  include: () => true,
};
