/** G2-500 — addition on the empty number line (2.NBT.B.5, 2.NBT.B.7): the child draws the jumps.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/number-line-more.js mode 'open', addition only.
 *  Level 1 no new ten, the first card worked · 2 across a ten, the second
 *  number 11 to 29 · 3 across a ten, the second number 31 and more. Every level stays within 100. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G2-500', slug: 'add-on-the-open-number-line', mode: 'open', gradeBand: 'G23',
  levels: { 1: { cards: 4, model: true, kind: 'plus-plain' }, 2: { cards: 4, kind: 'plus-cross' }, 3: { cards: 4, kind: 'plus-big' } },
  i18n: { en: { title: "Add on the Open Number Line", instruction: "Draw your jumps on the empty line. Write the sum." } },
});
