/** G3-619 — Three Levels of Government (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-065). dk-social-3.js mode 's3-levels'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-619', slug: 'three-levels-of-government', mode: 's3-levels', exerciseType: 'science-sort',
  difficulty: {"1":{"leaders":true},"2":{},"3":{"ask":true}},
  i18n: { en: { title: "Three Levels of Government", instruction: "Read each card. Write each leader and each service in the right column: local, state or national." } },
});
