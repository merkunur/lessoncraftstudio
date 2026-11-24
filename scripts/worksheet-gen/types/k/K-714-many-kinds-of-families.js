/** K-714 — Many Kinds of Families (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-005). dk-social-k.js mode 'sk-families'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-714', slug: 'many-kinds-of-families', mode: 'sk-families', exerciseType: 'family',
  difficulty: {"1":{"families":3},"2":{"families":6},"3":{"families":6,"together":true}},
  i18n: { en: { title: "Many Kinds of Families", instruction: "Look at the families. Every one is a family. Draw everyone in your home in the big box. Your teacher writes the names you say." } },
});
