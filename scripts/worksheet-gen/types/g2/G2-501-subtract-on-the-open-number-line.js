/** G2-501 — subtraction on the empty number line (2.NBT.B.5, 2.NBT.B.7): the child draws the jumps back.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/number-line-more.js mode 'open', subtraction only.
 *  Level 1 no ten opened, the first card worked · 2 across a ten · 3 a three-digit and a two-digit number. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G2-501', slug: 'subtract-on-the-open-number-line', mode: 'open', gradeBand: 'G23',
  levels: { 1: { cards: 4, model: true, kind: 'minus-plain' }, 2: { cards: 4, kind: 'minus-cross' }, 3: { cards: 4, kind: 'minus-big' } },
  i18n: { en: { title: "Subtract on the Open Number Line", instruction: "Draw your jumps back on the empty line. Write the answer." } },
});
