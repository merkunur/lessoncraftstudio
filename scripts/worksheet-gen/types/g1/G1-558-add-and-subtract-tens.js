/** G1-558 — tens on and off a two-digit number, in the head (1.NBT.C.4, 1.NBT.C.6): 34 + 20, 76 − 30.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/addsub-more.js mode 'mental100', tens only.
 *  Level 1 adding · 2 taking away · 3 both in turn. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-558', slug: 'add-and-subtract-tens', mode: 'mental100', gradeBand: 'G1',
  levels: { 1: { cards: 12, kind: 'tens-or-ones', part: 'tens', ops: ['+'] }, 2: { cards: 12, kind: 'tens-or-ones', part: 'tens', ops: ['-'] }, 3: { cards: 12, kind: 'tens-or-ones', part: 'tens', ops: ['+', '-'] } },
  i18n: { en: { title: "Add and Subtract Tens", instruction: "Add or take away tens in your head. Only the tens change. Write the answer in the box." } },
});
