/** K-723 — A Map of a Neighborhood (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-016). dk-social-k.js mode 'sk-hood'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-723', slug: 'a-map-of-a-neighborhood', mode: 'sk-hood', exerciseType: 'maps',
  difficulty: {"1":{"places":3,"trace":true},"2":{"places":5},"3":{"places":5,"lot":true}},
  i18n: { en: { title: "A Map of a Neighborhood", instruction: "Circle the school. Put an X on the park. Draw a path along the streets from the house with the red door to the school." } },
});
