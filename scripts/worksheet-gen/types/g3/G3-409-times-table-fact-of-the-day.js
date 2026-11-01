/** G3-409 — one multiplication fact five ways (T3, 3.OA.A.1-2 / 3.OA.B.5-6). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G3-409', slug: 'times-table-fact-of-the-day', mode: 'day', gradeBand: 'G3',
  i18n: { en: { title: "Fact of the Day", instruction: "Look at the fact at the top. Fill in every box: count the skips, multiply both ways and divide both ways." } },
});
