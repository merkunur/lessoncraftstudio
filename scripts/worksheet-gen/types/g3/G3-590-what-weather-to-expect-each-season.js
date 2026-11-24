/** G3-590 — What Weather to Expect Each Season (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-098). dk-g3.js mode 'g3-seasons-graph'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-590', slug: 'what-weather-to-expect-each-season', mode: 'g3-seasons-graph', exerciseType: 'weather-symbols',
  difficulty: {"1":{"months":4},"2":{"months":12},"3":{"months":12,"frame":true}},
  i18n: { en: { title: "What Weather to Expect Each Season", instruction: "Graph the average high for every month. Write two words for each season." } },
});
