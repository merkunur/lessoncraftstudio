/** Level Set config — Number Tracing (K-237 + K-249 0-4 / K-250 5-9 / K-251 trace and write / K-252 1-10 / K-253 11-20),
 *  2026-10-13. PDF ONLY (operator ruling). Levels FADE the trace (the level audit's recipe): level 1 every slot traced
 *  from its own orange dot (big pages: stroke-order numbers), level 2 the published page / one blank slot, level 3 one
 *  trace, one start dot only, two blank slots. K-237 also prints one page per NUMBER 0-20 at all three levels. */
'use strict';
module.exports = {
  prefix: 'ntr',
  themeless: true,
  unitsOnly: true,          // K-237: one copy per number 0-20, every level
  noExemplarSkip: true,     // K-237's published page is the 0-9 range, not a number — every number gets its level-2 page
  rangeToo: ['K-237'],      // ...and the 0-9 range page itself at levels 1 and 3
  singleFaces: ['K-249', 'K-250', 'K-251', 'K-252', 'K-253'],   // range pages: one copy per non-core level (titles name the range)
  interactive: false,       // PDF only
  titleMax: 80,
  maxCopies: 40,
  maxShared: 99,
  seeds: 1,
  note: 'Level Set 2026-10-13: Number Tracing (K-237 + 5 faces). One page per number 0-20 at three levels: big with stroke-order numbers and every slot traced from its own orange dot / core with one blank slot / small with one trace, one start dot only and two blank slots. The range pages (0-9, 0-4, 5-9, trace and write, 1-10, 11-20) get the same easier and harder level. Stroke-order numbers are placed beside their own stroke, never on top of each other (the 4/5/9 fix). Visible to teachers, never indexed; PDF only.',
  faces: {
    'K-237': { levels: [2, 1, 3] },
    'K-249': { levels: [2, 1, 3] },
    'K-250': { levels: [2, 1, 3] },
    'K-251': { levels: [2, 1, 3] },
    'K-252': { levels: [2, 1, 3] },
    'K-253': { levels: [2, 1, 3] },
  },
  include: () => true,
};
