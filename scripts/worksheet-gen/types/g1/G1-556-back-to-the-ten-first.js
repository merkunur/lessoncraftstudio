/** G1-556 — back to the ten first, then the rest: subtraction over the ten on a number line (1.OA.C.6, 2.NBT.B.5).
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/number-line-more.js mode 'bridge' with ONE operation.
 *  Level 1 within 20 with the first card worked · 2 within 20 · 3 within 100. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G1-556', slug: 'back-to-the-ten-first', mode: 'bridge', gradeBand: 'G1',
  levels: { 1: { cards: 4, ops: ['-'], within: 20, model: true, distinct: true }, 2: { cards: 4, ops: ['-'], within: 20, distinct: true }, 3: { cards: 4, ops: ['-'], within: 100, distinct: true } },
  i18n: { en: { title: "Subtract: Back to the Ten First", instruction: "Jump back to the ten first, then jump the rest. Fill in the boxes." } },
});
