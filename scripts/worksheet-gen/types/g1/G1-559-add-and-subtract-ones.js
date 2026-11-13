/** G1-559 — ones on and off a two-digit number without a new ten, in the head (1.NBT.C.4): 32 + 5, 68 − 4.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/addsub-more.js mode 'mental100', ones only.
 *  Level 1 adding · 2 taking away · 3 both in turn. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-559', slug: 'add-and-subtract-ones', mode: 'mental100', gradeBand: 'G1',
  levels: { 1: { cards: 12, kind: 'tens-or-ones', part: 'ones', ops: ['+'] }, 2: { cards: 12, kind: 'tens-or-ones', part: 'ones', ops: ['-'] }, 3: { cards: 12, kind: 'tens-or-ones', part: 'ones', ops: ['+', '-'] } },
  i18n: { en: { title: "Add and Subtract Ones", instruction: "Add or take away ones in your head. Only the ones change. Write the answer in the box." } },
});
