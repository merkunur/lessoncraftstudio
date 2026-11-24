/** G3-591 — Climates Around the World (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-100). dk-g3.js mode 'g3-climates'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-591', slug: 'climates-around-the-world', mode: 'g3-climates', exerciseType: 'weather-symbols',
  difficulty: {"1":{"places":2},"2":{"places":4},"3":{"places":4,"frame":true}},
  i18n: { en: { title: "Climates Around the World", instruction: "Read the graphs for four places. Write each letter from the map and circle each climate." } },
});
