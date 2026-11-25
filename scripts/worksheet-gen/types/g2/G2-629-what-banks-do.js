/** G2-629 — What Banks Do (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-056). dk-social-2.js mode 's2-bank'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-629', slug: 'what-banks-do', mode: 's2-bank', exerciseType: 'money',
  difficulty: {"1":{"n":2},"2":{"n":3},"3":{"n":3,"frame":true}},
  i18n: { en: { title: "What Banks Do", instruction: "Read the sentences. Write the right sentence next to each picture." } },
});
