/** G2-616 — Local, State and National Government (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-040). dk-social-2.js mode 's2-gov'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-616', slug: 'local-state-and-national-government', mode: 's2-gov', exerciseType: 'science-sort',
  difficulty: {"1":{"n":3},"2":{"n":5},"3":{"n":5,"jobs":true}},
  i18n: { en: { title: "Local, State and National Government", instruction: "Read each leader card. Write each leader in the right box: local, state or national." } },
});
