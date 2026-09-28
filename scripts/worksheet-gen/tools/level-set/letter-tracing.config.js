/** Level Set config — Letter Tracing (K-238 + K-254 / K-255 / K-256 / K-257 / K-258), 2026-09-28. PDF ONLY (operator ruling). */
'use strict';
module.exports = {
  prefix: 'ltr',
  themeless: true,
  unitsOnly: true,          // K-238: one copy per LETTER of the alphabet (capital + lowercase on one page), every level
  noExemplarSkip: true,     // K-238's published page is the A–F range, not a letter — every letter gets its level-2 page
  singleFaces: ['K-254', 'K-255', 'K-256', 'K-257', 'K-258'],   // range pages: one copy per non-core level (titles name the letters)
  interactive: false,       // PDF only
  titleMax: 80,
  maxCopies: 40,
  maxShared: 99,
  seeds: 1,
  note: 'Level Set 2026-09-28: Letter Tracing (K-238 + 5 faces). One page per letter of every alphabet (capital + lowercase together; the country\'s own letters, de ß, nl IJ) at three levels: big with numbered strokes / core / small with two letters to write alone. The range pages get an easier level (numbered strokes) and a harder one (two to write alone). Stroke-order numbers are placed inside the lane and beside their own stroke (the cut-off fix). Visible to teachers, never indexed; PDF only.',
  faces: {
    'K-238': { levels: [2, 1, 3] },
    'K-254': { levels: [2, 1, 3] },
    'K-255': { levels: [2, 1, 3] },
    'K-256': { levels: [2, 3] },
    'K-257': { levels: [2, 1, 3] },
    'K-258': { levels: [2, 3] },
  },
  include: () => true,
};
