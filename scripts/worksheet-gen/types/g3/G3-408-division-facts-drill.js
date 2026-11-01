/** G3-408 — a page of division facts in the locale's sign (T2, 3.OA.C.7). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G3-408', slug: 'division-facts-drill', mode: 'divdrill', gradeBand: 'G3',
  i18n: { en: { title: "Division Facts", instruction: "Divide. Write the answer in each box." } },
});
