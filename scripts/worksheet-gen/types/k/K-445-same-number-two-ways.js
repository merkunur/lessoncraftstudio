/** K-445 — Same Number? (Counting maker, 2026-10-31). T4: the same pictures lined up and spread out (conservation, K.CC.B.4b). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-445', slug: 'same-number-two-ways', mode: 'conserve',
  i18n: { en: { title: "Same Number?", instruction: "Count each group and write how many. Are there the same number in both groups?" } },
});
