/** K-715 — Family Traditions (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-006). dk-social-k.js mode 'sk-traditions'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-715', slug: 'family-traditions', mode: 'sk-traditions', exerciseType: 'family',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"draw":true}},
  i18n: { en: { title: "Family Traditions", instruction: "Draw a line from each thing to the family picture where it belongs. Each family picture gets one line." } },
});
