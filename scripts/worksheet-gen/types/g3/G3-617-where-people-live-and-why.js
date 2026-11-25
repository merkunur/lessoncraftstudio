/** G3-617 — Where People Live and Why (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-063). dk-social-3.js mode 's3-live'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-617', slug: 'where-people-live-and-why', mode: 's3-live', exerciseType: 'maps',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"own":true}},
  i18n: { en: { title: "Where People Live and Why", instruction: "Find each letter on both maps. Circle many people or few people. Use the land map to write a reason." } },
});
