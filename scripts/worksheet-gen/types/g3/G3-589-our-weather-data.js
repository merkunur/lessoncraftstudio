/** G3-589 — Our Weather Data (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-097). dk-g3.js mode 'g3-weather-data'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-589', slug: 'our-weather-data', mode: 'g3-weather-data', exerciseType: 'weather-symbols',
  difficulty: {"1":{"days":5},"2":{"days":10,"graph":true,"compare":true},"3":{"days":10,"graph":true,"compare":true,"celsius":true}},
  i18n: { en: { title: "Our Weather Data", instruction: "Record the weather for ten school days. Graph the highs and compare them with the fall." } },
});
