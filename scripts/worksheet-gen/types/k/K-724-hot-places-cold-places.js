/** K-724 — Hot Places, Cold Places (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-018). dk-social-k.js mode 'sk-places'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-724', slug: 'hot-places-cold-places', mode: 'sk-places', exerciseType: 'science-sort',
  difficulty: {"1":{"items":4},"2":{"items":6},"3":{"items":6,"draw":true}},
  i18n: { en: { title: "Hot Places, Cold Places", instruction: "Draw a line from each thing to the place where people would use it." } },
});
