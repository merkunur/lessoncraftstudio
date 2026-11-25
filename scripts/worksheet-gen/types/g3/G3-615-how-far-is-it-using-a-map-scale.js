/** G3-615 — Using a Map Scale (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-061 (change of G2-476 / G3-493)). dk-social-3.js mode 's3-scale'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-615', slug: 'how-far-is-it-using-a-map-scale', mode: 's3-scale', exerciseType: 'maps',
  difficulty: {"1":{"compare":2},"2":{"half":true,"compare":3},"3":{"half":true,"compare":2,"trip":true}},
  i18n: { en: { title: "Using a Map Scale", instruction: "Use a ruler. Measure from dot to dot to the nearest half inch. Write the inches and the miles. Then circle the map." } },
});
