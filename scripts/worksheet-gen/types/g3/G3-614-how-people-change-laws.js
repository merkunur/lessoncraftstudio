/** G3-614 — How People Change Laws (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-059). dk-social-3.js mode 's3-changelaw'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-614', slug: 'how-people-change-laws', mode: 's3-changelaw', exerciseType: 'reading-comprehension',
  difficulty: {"1":{"n":1},"2":{"n":3},"3":{"n":3,"ask":true}},
  i18n: { en: { title: "How People Change Laws", instruction: "Read the three stories. Fill in the chart: who wanted each change, what they did, and what changed." } },
});
