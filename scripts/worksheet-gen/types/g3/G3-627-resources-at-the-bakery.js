/** G3-627 — Resources at the Bakery (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-073). dk-social-3.js mode 's3-resources'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-627', slug: 'resources-at-the-bakery', mode: 's3-resources', exerciseType: 'science-sort',
  difficulty: {"1":{"n":6},"2":{"n":9},"3":{"n":9,"own":true}},
  i18n: { en: { title: "Resources at the Bakery", instruction: "Look at the bakery. Write each card in its column: natural, human or capital resources." } },
});
