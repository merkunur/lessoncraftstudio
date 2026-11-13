/** K-634 — Ten and How Many More? (Year pages E, 2026-11-13): number bonds of the teen numbers with TEN as one part
 *  (K.NBT.A.1: 14 is ten and four more). Level 1 wholes 11 to 15, the ones blank; level 2 wholes 11 to 19; level 3
 *  any of the three numbers blank (the ten, the ones, or the whole). A face of the number-bond type K-243. */
'use strict';
const base = require('./K-243-number-bonds.js');
const lv = (o) => ({ v2: true, tenPart: true, ...o });
module.exports = {
  ...base,
  id: 'K-634', slug: 'ten-and-how-many-more',
  difficulty: {
    1: lv({ wholes: [11, 12, 13, 14, 15], given: [10, 10], cards: 4, blanks: ['a', 'b'] }),
    2: lv({ wholes: [11, 12, 13, 14, 15, 16, 17, 18, 19], given: [10, 10], cards: 6, blanks: ['a', 'b'] }),
    3: lv({ wholes: [11, 12, 13, 14, 15, 16, 17, 18, 19], cards: 6, blanks: ['a', 'b', 'whole'] }),
  },
  i18n: { en: { title: 'Ten and How Many More?', instruction: 'Look at each number bond. Write the missing number in the dashed circle.' } },
};
