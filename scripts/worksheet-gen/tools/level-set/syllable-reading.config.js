/** Level Set config — Word Families (G1-306 + G1-330 / G1-331 / G1-332 / G1-333 / G1-334), 2026-10-02. PDF + interactive + key. */
'use strict';
const ALL = ['G1-306', 'G1-330', 'G1-331', 'G1-332', 'G1-333', 'G1-334'];
module.exports = {
  prefix: 'srd',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 4,          // a new copy shares at most HALF of its words (≤ 4) with any other copy of its level
  shareFrac: 0.5,
  seeds: 40,
  allowFewer: true,      // a language with few word families gives fewer copies, never a filler
  note: 'Level Set 2026-10-02: Word Families (G1-306 + 5 faces). Each copy reads a different family (rime, consonant or sound-out row) or new words of one. Levels: base 2 carpet rows + 4 big cards / 6 cards / 3 rows + 8 cards; circle 4 cards with 2 choices / 6 with 3 / 8 with 4; join 4 / 6 / 8 cards; colour carpet 3 rows + 4 cards / published / 5 rows + 8 cards; blends the base shapes on blend families; split words 4 lines + 1 extra picture / published / 7 lines + 3 extra, longer words. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(ALL.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
