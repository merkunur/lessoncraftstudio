/** G3-621 — Where Taxes Go (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-067). dk-social-3.js mode 's3-taxes'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-621', slug: 'where-taxes-go', mode: 's3-taxes', exerciseType: 'science-sort',
  difficulty: {"1":{"drawn":true},"2":{},"3":{"spend":true}},
  i18n: { en: { title: "Where Taxes Go", instruction: "Follow the arrows. Draw or write a service in each box and the level of government that pays for it. Then finish the sentence." } },
});
