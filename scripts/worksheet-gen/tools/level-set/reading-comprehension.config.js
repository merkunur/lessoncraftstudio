/** Level Set config — Reading Comprehension (G2-254 + faces G2-269 … G2-273), 2026-09-30. PDF + interactive. */
'use strict';
const ALL = [1, 2, 3];
module.exports = {
  prefix: 'rcm',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  seeds: 1,
  // every level walks the page's native story pool (data/literacy/rc-levels/<loc>.json): level 2 copy k = new story k
  // (the published story is copy 1), levels 1 and 3 copy k = pool story k (the published story first)
  textLevels: { 'G2-254': ALL, 'G2-269': ALL, 'G2-270': ALL, 'G2-271': ALL, 'G2-272': ALL, 'G2-273': ALL },
  note: 'Level Set 2026-09-30: Reading Comprehension (G2-254 + 5 story pages). New stories by 11 native panels (never translated); the same story at every level, the level changes the questions: easier = numbered sentences and literal questions with a sentence hint, harder = two inference questions and one written answer. Visible to teachers, never indexed; PDF + interactive screen version (the written answer becomes "tap the sentence that tells you") + answer key.',
  faces: {
    'G2-254': { levels: [2, 1, 3] },
    'G2-269': { levels: [2, 1, 3] },
    'G2-270': { levels: [2, 1, 3] },
    'G2-271': { levels: [2, 1, 3] },
    'G2-272': { levels: [2, 1, 3] },
    'G2-273': { levels: [2, 1, 3] },
  },
  include: () => true,
};
