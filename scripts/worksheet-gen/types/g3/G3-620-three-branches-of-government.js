/** G3-620 — Three Branches (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-066). dk-social-3.js mode 's3-branches'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-620', slug: 'three-branches-of-government', mode: 's3-branches', exerciseType: 'science-sort',
  difficulty: {"1":{},"2":{"state":true},"3":{"state":true,"check":true}},
  i18n: { en: { title: "Three Branches", instruction: "Read each card. Write it under its branch, for our national government and for our state government. Write the three job cards in the national chart." } },
});
