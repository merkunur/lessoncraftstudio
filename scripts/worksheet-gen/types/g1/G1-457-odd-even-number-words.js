/** G1-457 — read the number word, decide odd or even (T4, 2.OA.C.3). Odd & Even maker, 2026-11-01. See types/_shared/odd-more.js. */
'use strict';
const { makeOddMoreType } = require('../_shared/odd-more.js');

module.exports = makeOddMoreType({
  id: 'G1-457', slug: 'odd-even-number-words', mode: 'words', gradeBand: 'G1',
  i18n: { en: { title: "Odd or Even? Read the Number Word", instruction: "Read each number word. Is the number odd or even? Circle it." } },
});
