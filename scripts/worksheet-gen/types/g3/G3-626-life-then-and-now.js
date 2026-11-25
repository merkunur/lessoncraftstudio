/** G3-626 — Life Then and Now (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-072). dk-social-3.js mode 's3-thennow'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-626', slug: 'life-then-and-now', mode: 's3-thennow', exerciseType: 'family',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"most":true}},
  i18n: { en: { title: "Life Then and Now", instruction: "Read about life around 1900 and look at each photo. Write what it is like today. Then finish the sentences." } },
});
