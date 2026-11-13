/** K-637 — Draw the Number on Two Ten-Frames (Year pages E, 2026-11-13; K.NBT.A.1): the number is printed, the child
 *  draws it into two empty ten-frames (K-448 is the other direction: the frames are filled, the child writes the
 *  number). Level 1 11 to 15, level 2 11 to 20, level 3 five numbers from 11 to 20. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');
module.exports = makeFrameMoreType({
  id: 'K-637', slug: 'draw-the-number-two-ten-frames', mode: 'double-frame',
  levels: { 1: { lo: 11, hi: 15, cards: 4, draw: true }, 2: { lo: 11, hi: 20, cards: 4, draw: true }, 3: { lo: 11, hi: 20, cards: 5, draw: true } },
  i18n: { en: { title: 'Draw the Number on Two Ten-Frames', instruction: 'Read the number. Draw that many dots in the two ten-frames. Fill the first ten-frame before you start the second.' } },
});
