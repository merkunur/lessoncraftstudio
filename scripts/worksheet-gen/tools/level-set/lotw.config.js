/** Level Set config — Letter of the Week (K-317 + K-325 / K-326 / K-327 / K-328 / G1-311), 2026-09-28. PDF ONLY (operator ruling). */
'use strict';
module.exports = {
  prefix: 'lotw',
  themeless: true,
  unitsOnly: true,          // one copy per LETTER (G1-311: per unit); every letter the face can build; the exemplar skipped at level 2
  interactive: false,       // PDF only
  titleMax: 80,
  maxCopies: 40,
  maxShared: 99,
  seeds: 1,
  note: 'Level Set 2026-09-28: Letter of the Week, the whole alphabet (K-317 + 5 faces). New letters from the eligible picture pool, reviewed by 11 native panels (sounds, graphemes, pair and confusable letters) and a picture panel; one copy per letter per level; levels change the task (three pictures instead of four, the sound only at the end, beginning-or-end only, short words once each, a key picture per letter; harder: foils that carry the letter, the sound only inside with letter-initial foils, eight pictures with four in the middle, up to three per word). Visible to teachers, never indexed; PDF only.',
  faces: {
    'K-317': { levels: [2, 1, 3] },
    'K-325': { levels: [2, 1, 3] },
    'K-326': { levels: [2, 1, 3] },
    'K-327': { levels: [2, 1, 3] },
    'K-328': { levels: [2, 1] },
    'G1-311': { levels: [2] },
  },
  include: () => true,
};
