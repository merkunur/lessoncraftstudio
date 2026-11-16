/** G2-535 — Prefixes un- and re- (L.2.4.b; word-building-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeWordBuildingType } = require('../_shared/word-building-g2.js');
module.exports = makeWordBuildingType({
  id: 'G2-535', slug: 'prefixes-un-and-re', mode: 'prefix', exerciseType: 'word-parts',
  i18n: { en: { title: "Prefixes un- and re-", instruction: "un- means not or the opposite of, and re- means again." } },
});
