/**
 * K-573 — Shape and Color Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): five shapes in four colours, the colour word under each shape (a copier loses the colour; K.G.A.2 + colour words). Levels: 1 3×3 · 2 4×4 · 3 the cards print «red triangle» (reading), the caller card shows the shape.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-573', slug: 'shape-and-color-bingo', gradeBand: 'K', content: 'shapes',
  D: { 1: { g: 3, perPage: 4 }, 2: { g: 4, perPage: 1 }, 3: { g: 3, perPage: 4, words: true } },
  i18n: { en: { title: "Shape and Color Bingo", instruction: "Listen to each shape and its color. If it is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
