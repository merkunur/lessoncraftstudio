/** G3-612 — Civic Virtues at School (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-057). dk-social-3.js mode 's3-virtues'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-612', slug: 'civic-virtues-at-school', mode: 's3-virtues', exerciseType: 'feelings',
  difficulty: {"1":{"n":3},"2":{"n":5},"3":{"n":5,"own":true}},
  i18n: { en: { title: "Civic Virtues at School", instruction: "Read each situation. Write the virtue it calls for. Use each word one time. Then write what a good citizen would do." } },
});
