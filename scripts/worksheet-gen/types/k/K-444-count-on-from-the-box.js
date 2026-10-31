/** K-444 — Count On (Counting maker, 2026-10-31). T3: a closed box shows its count; count on with the loose pictures (K.CC.A.2 -> 1.OA.C.5). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-444', slug: 'count-on-from-the-box', mode: 'count-on',
  i18n: { en: { title: "Count On", instruction: "The box says how many are inside. Start at that number and count on. Write how many in all." } },
});
