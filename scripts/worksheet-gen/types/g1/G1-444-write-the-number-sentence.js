/** G1-444 — write the whole number sentence from the picture (T3, K.OA.A.1 / 1.OA.A.1). Addition & Subtraction maker, 2026-11-01. See types/_shared/addsub-more.js. */
'use strict';
const { makeAddSubMoreType } = require('../_shared/addsub-more.js');

module.exports = makeAddSubMoreType({
  id: 'G1-444', slug: 'write-the-number-sentence', mode: 'sentence', gradeBand: 'G1',
  i18n: { en: { title: "Write the Number Sentence", instruction: "Look at the pictures. Write the number sentence that tells what happens." } },
});
