/** G1-562 — Turn-Around Facts (Year pages E, 2026-11-13; 1.OA.B.3, de "Tauschaufgaben"): two picture groups and the two
 *  plus sentences a + b and b + a, without the two minus sentences of the fact family (G1-113). Three cards a page,
 *  never two equal groups, both groups at least 2. Level 1 sums 5 to 7, level 2 6 to 10, level 3 9 to 12. */
'use strict';
const base = require('./G1-113-fact-family.js');
const lv = (minTotal, maxTotal) => ({ minTotal, maxTotal, cards: 3, plusOnly: true, fitH: 170 });
module.exports = {
  ...base,
  id: 'G1-562', slug: 'turn-around-facts',
  difficulty: { 1: lv(5, 7), 2: lv(6, 10), 3: lv(9, 12) },
  i18n: { en: { title: 'Turn-Around Facts', instruction: 'Add the two groups. Then turn the numbers around and add again. What do you notice?' } },
};
