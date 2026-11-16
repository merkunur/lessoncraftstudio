/** G2-536 — Suffixes -ful, -less, and -ly (RF.2.3.d; word-building-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeWordBuildingType } = require('../_shared/word-building-g2.js');
module.exports = makeWordBuildingType({
  id: 'G2-536', slug: 'suffixes-ful-less-and-ly', mode: 'suffix', exerciseType: 'word-parts',
  i18n: { en: { title: "Suffixes -ful, -less, and -ly", instruction: "-ful means full of, and -less means without." } },
});
