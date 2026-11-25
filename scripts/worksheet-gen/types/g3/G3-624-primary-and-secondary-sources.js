/** G3-624 — Primary or Secondary? (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-070). dk-social-3.js mode 's3-sources'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-624', slug: 'primary-and-secondary-sources', mode: 's3-sources', exerciseType: 'science-sort',
  difficulty: {"1":{"n":4},"2":{"n":8},"3":{"n":8,"school":true}},
  i18n: { en: { title: "Primary or Secondary?", instruction: "Read each source. Write its name in the right column: primary or secondary." } },
});
