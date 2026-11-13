/** K-635 — How Many Are Hiding? Numbers to 9 (Year pages E, 2026-11-13): the cup of K-457 with totals from 2 to 9 (the
 *  German "Schüttelbox" in the number range of the first weeks of Klasse 1; K.OA.A.3). Level 1 totals 2 to 5,
 *  level 2 totals 6 to 9, level 3 totals 5 to 9 on five cards. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');
module.exports = makeBondMoreType({
  id: 'K-635', slug: 'how-many-are-hiding-to-9', mode: 'hidden', gradeBand: 'K',
  levels: { 1: { cards: 4, totals: [2, 3, 4, 5], hide: [1, 4] }, 2: { cards: 4, totals: [6, 7, 8, 9], hide: [1, 8] }, 3: { cards: 5, totals: [5, 6, 7, 8, 9], hide: [2, 8] } },
  i18n: { en: { title: 'How Many Are Hiding? Numbers to 9', instruction: 'The circle shows how many there are in all. You can see some. The rest are hiding under the cup. Write how many are hiding.' } },
});
