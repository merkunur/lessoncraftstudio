/** Level Set config — Feelings (K-319 + K-331 / K-332 / K-333 / K-334), 2026-09-28. PDF + interactive (K-332 printable only). */
'use strict';
module.exports = {
  prefix: 'fee',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 2,
  seeds: 1,
  // the situation page: one copy per SCENE SET (group 1 = the published scenes, then the picture panel's
  // five sets); at level 2 the published set is the published page itself, so it is skipped there
  groupFaces: { 'K-331': 'skipFirstAtCore' },
  note: 'Level Set 2026-09-28: Feelings (K-319 + 4 faces). New situation pictures chosen and opened by a picture panel (30 scenes in 5 sets); levels change the task (4 faces instead of 6, two faces to choose from, a model face to copy; harder: 4 faces but all 6 words, look-alike faces offered first). Only six faces are readable at this age, so the face pages get one easier and one harder copy. Visible to teachers, never indexed; PDF + interactive screen version + answer key (the draw page is printable only).',
  faces: {
    'K-319': { levels: [1, 3] },
    'K-331': { levels: [2, 1, 3] },
    'K-332': { levels: [1] },
    'K-333': { levels: [1] },
    'K-334': { levels: [1, 3] },
  },
  include: () => true,
};
