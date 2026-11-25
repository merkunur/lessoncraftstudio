/** G3-618 — Towns Grow Near Resources (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-064). dk-social-3.js mode 's3-settle'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-618', slug: 'towns-grow-near-resources', mode: 's3-settle', exerciseType: 'maps',
  difficulty: {"1":{"n":2},"2":{"n":3},"3":{"n":3,"own":true}},
  i18n: { en: { title: "Towns Grow Near Resources", instruction: "Look at the sample state. Write what each site has. Then write which site is the worst place for a town, and why." } },
});
