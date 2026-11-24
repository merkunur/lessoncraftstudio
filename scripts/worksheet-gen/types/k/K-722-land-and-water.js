/** K-722 — Land and Water (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-015). dk-social-k.js mode 'sk-globe'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-722', slug: 'land-and-water', mode: 'sk-globe', exerciseType: 'maps',
  difficulty: {"1":{"big":true,"dots":true},"2":{"more":true},"3":{"more":true,"star":true}},
  i18n: { en: { title: "Land and Water", instruction: "Color the water blue and the land green. Is there more water or more land? Circle the wave for more water or the tree for more land." } },
});
