/** G2-622 — Made Here, Sold There (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-048). dk-social-2.js mode 's2-trade'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-622', slug: 'made-here-sold-there', mode: 's2-trade', exerciseType: 'science-sort',
  difficulty: {"1":{"n":4},"2":{"n":6},"3":{"n":6,"frame":true}},
  i18n: { en: { title: "Made Here, Sold There", instruction: "Read each card. Write each thing in the right arrow." } },
});
