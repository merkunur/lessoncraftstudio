/** G2-617 — Services Our Government Provides (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-041). dk-social-2.js mode 's2-services'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-617', slug: 'services-our-government-provides', mode: 's2-services', exerciseType: 'science-sort',
  difficulty: {"1":{"n":5},"2":{"n":8,"uses":true},"3":{"n":8,"uses":true,"frame":true}},
  i18n: { en: { title: "Services Our Government Provides", instruction: "Circle every service of the government in the town. Then write who two of them help." } },
});
