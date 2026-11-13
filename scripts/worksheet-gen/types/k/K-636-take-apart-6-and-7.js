/** K-636 — Take Apart 6 and 7 (Year pages E, 2026-11-13; K.OA.A.3): a strip of 6 or 7 squares coloured in two colours.
 *  Level 1 the two parts of 6 are printed (colour them); level 2 the child finds five ways to make 6 itself; level 3 six
 *  ways to make 7. A face of the ten-frame factory, mode colour-parts (K-454 has the wholes 5 and 10). */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');
module.exports = makeFrameMoreType({
  id: 'K-636', slug: 'take-apart-6-and-7', mode: 'colour-parts',
  levels: { 1: { whole: 6, cards: 4, find: false }, 2: { whole: 6, cards: 5, find: true }, 3: { whole: 7, cards: 6, find: true } },
  i18n: { en: { title: 'Take Apart 6 and 7', instruction: 'Color the squares: as many red as the red number, as many blue as the blue number.' } },
});
