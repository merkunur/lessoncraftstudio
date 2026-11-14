/** K-644 — Name the Solid Shapes (solids-k factory; Year pages AA, 2026-11-14; K.G.A.2) */
'use strict';
const { makeSolidsType } = require('../_shared/solids-k.js');
module.exports = makeSolidsType({
  id: 'K-644', slug: 'name-the-solid-shapes', gradeBand: 'K',
  i18n: { en: { title: "Name the Solid Shapes", instruction: "Draw a line from each solid to the thing with the same shape. Then color each solid by the color code and say its name." } },
});
