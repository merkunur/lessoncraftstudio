/** Level Set config — Opposites (G1-307 + K-351 / G1-335 / G1-336 / G1-337 / G2-320), 2026-09-28. PDF + interactive (G1-336 printable only). */
'use strict';
module.exports = {
  prefix: 'opp',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 1,     // a copy shares at most one pair (or prefix word) with any accepted copy of its level
  seeds: 80,
  note: 'Level Set 2026-09-28: Opposites (G1-307 + 5 faces). New pairs, sentences and prefix words by 11 native panels (+ the full/empty and summer/winter pictures, opened); copies of a level share at most one pair; levels change the task (picture cues and a word bank; four picture pairs; circle one of two words; four pairs; two words to choose from; the prefix printed in each row — harder: no word bank; eight picture pairs; eight sentences without a bank; seven pairs and two words with no partner; four words to choose from; ten rows without the prefix list). Visible to teachers, never indexed; PDF + interactive screen version + answer key (Pair Up printable only).',
  faces: {
    'G1-307': { levels: [2, 1, 3] },
    'K-351': { levels: [2, 1, 3] },
    'G1-335': { levels: [2, 1, 3] },
    'G1-336': { levels: [2, 1, 3] },
    'G1-337': { levels: [2, 1, 3] },
    'G2-320': { levels: [2, 1, 3] },
  },
  include: () => true,
};
