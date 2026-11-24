/** K-716 — Long Ago and Today (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social en-K-007). dk-social-k.js mode 'sk-then-now'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-716', slug: 'long-ago-and-today', mode: 'sk-then-now', exerciseType: 'family',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"draw":true}},
  i18n: { en: { title: "Long Ago and Today", instruction: "Draw a line from each thing from long ago to the thing we use today that does the same job." } },
});
