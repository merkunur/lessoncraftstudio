/** G2-615 — Laws in Our Community (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-039). dk-social-2.js mode 's2-laws'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-615', slug: 'laws-in-our-community', mode: 's2-laws', exerciseType: 'science-match',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "Laws in Our Community", instruction: "Read each law. Write the letter of the problem the law stops. Use each letter one time." } },
});
