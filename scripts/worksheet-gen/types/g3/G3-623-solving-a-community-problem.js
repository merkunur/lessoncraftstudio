/** G3-623 — A Community Problem (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-069 (change of G2-562)). dk-social-3.js mode 's3-problem'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-623', slug: 'solving-a-community-problem', mode: 's3-problem', exerciseType: 'sentence-building',
  difficulty: {"1":{"given":true},"2":{},"3":{"carry":true}},
  i18n: { en: { title: "A Community Problem", instruction: "Read about the problem. Write three solutions, with a cost and a benefit for each. Then write a letter to the city council." } },
});
