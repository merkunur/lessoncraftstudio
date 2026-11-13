/** G1-557 — to the next ten first, then the rest: addition over a ten within 100 on a number line (1.NBT.C.4, 2.NBT.B.5).
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/number-line-more.js mode 'bridge', addition only.
 *  Level 1 the first card worked · 2 four cards · 3 the line is labelled at the tens only. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G1-557', slug: 'jump-across-the-next-ten', mode: 'bridge', gradeBand: 'G1',
  levels: { 1: { cards: 4, ops: ['+'], within: 100, model: true, distinct: true }, 2: { cards: 4, ops: ['+'], within: 100, distinct: true }, 3: { cards: 4, ops: ['+'], within: 100, labelEvery: 10, distinct: true } },
  i18n: { en: { title: "Jump Across the Next Ten", instruction: "Jump to the next ten first, then jump the rest. Fill in the boxes." } },
});
