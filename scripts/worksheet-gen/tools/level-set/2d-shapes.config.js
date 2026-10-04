/** Level Set config — 2D Shapes (K-368 + K-371 / K-372 / G1-381 / G1-382 / G1-383), 2026-10-04. PDF + interactive + key (dot paper: PDF only). */
'use strict';
const ALL = ['K-368', 'K-371', 'K-372', 'G1-381', 'G1-382', 'G1-383'];
module.exports = {
  prefix: 'shp',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,         // the share is set by shareFrac per face (a copy asks at most HALF of what another copy of its level asks)
  shareFrac: 0.5,
  seeds: 40,
  allowFewer: true,      // a thin pool gives fewer copies, never a filler
  note: 'Level Set 2026-10-04: 2D Shapes (K-368 + 5 faces). Levels change the task: name the shape 4 shapes with 2 names / 6 with 3 / 6 with more turned and skinny shapes and the hexagon; real or not 2 rows of 3 big shapes / 3 rows of 4 / 3 rows with more turned and skinny shapes; around us 6 pictures / 8 / 8 with an uneven split; write the names 4 shapes / 6 / 7; riddles 4 riddles with 2 names / 5 with 3 / 5 with 4; dot paper every side given / some / none. Visible to teachers, never indexed; PDF + interactive screen version + answer key (dot paper: PDF only).',
  faces: Object.fromEntries(ALL.map((id) => [id,
    id === 'K-371' ? { levels: [2, 1, 3], shareFrac: 0.63 }      // eleven opened objects: two pages of eight always share five
      : id === 'G1-383' ? { levels: [2, 1, 3], shareFrac: 0.6 }  // two riddles per shape: a copy changes at least two riddles
        : { levels: [2, 1, 3] }])),
  include: () => true,
};
