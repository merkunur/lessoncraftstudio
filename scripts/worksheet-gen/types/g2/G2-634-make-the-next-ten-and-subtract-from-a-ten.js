/** G2-634 — Zum Zehner ergänzen, vom Zehner abziehen (Batch DE-A, Daily Teaching System Stage E-2, 2026-11-26; German only, new:plus-minus-bis-100-einer-und-zehner). e2-math.js mode 'e2-zehner'. */
'use strict';
const { makeE2Type } = require('../_shared/e2-math.js');
module.exports = makeE2Type({
  id: 'G2-634', slug: 'make-the-next-ten-and-subtract-from-a-ten', mode: 'e2-zehner', exerciseType: 'mental-math', gradeBand: 'G2',
  i18n: { en: { title: "Make the Next Ten and Subtract from a Ten", instruction: "Complete each number to the next ten and subtract from the tens. First work out the heart task: the two numbers that make 10 help you." } },
});
