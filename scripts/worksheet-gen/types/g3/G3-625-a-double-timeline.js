/** G3-625 — A Double Timeline (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-071). dk-social-3.js mode 's3-timeline'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-625', slug: 'a-double-timeline', mode: 's3-timeline', exerciseType: 'family',
  difficulty: {"1":{"n":4},"2":{"n":7},"3":{"n":7,"own":true}},
  i18n: { en: { title: "A Double Timeline", instruction: "Write each event's letter above its year on its timeline. Then draw a line between each two events, one on each timeline, that happened within five years of each other." } },
});
