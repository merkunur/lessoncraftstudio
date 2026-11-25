/** G2-618 — How Places Change (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-044). dk-social-2.js mode 's2-change'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-618', slug: 'how-places-change', mode: 's2-change', exerciseType: 'maps',
  difficulty: {"1":{"n":2},"2":{"n":3,"because":true},"3":{"n":3,"because":true,"draw":true}},
  i18n: { en: { title: "How Places Change", instruction: "Circle who changed each place: nature or people. Then write why it changed." } },
});
