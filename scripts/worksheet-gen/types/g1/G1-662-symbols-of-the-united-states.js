/** G1-662 — Symbols of the United States (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-030). dk-social-1.js mode 's1-symbols'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-662', slug: 'symbols-of-the-united-states', mode: 's1-symbols', exerciseType: 'write-the-word',
  difficulty: {"1":{"n":2,"trace":true},"2":{"n":4,"box":true},"3":{"n":4,"box":true,"draw":true}},
  i18n: { en: { title: "Symbols of the United States", instruction: "Read about each symbol. Write its name from the word box." } },
});
