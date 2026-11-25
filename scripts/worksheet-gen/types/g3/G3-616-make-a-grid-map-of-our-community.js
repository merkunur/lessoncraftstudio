/** G3-616 — Our Community Grid Map (Batch S3, Daily Teaching System Stage D-5, 2026-11-25; social en-3-062 (change of G1-530 / G3-510)). dk-social-3.js mode 's3-gridmap'. English only. */
'use strict';
const { makeS3Type } = require('../_shared/dk-social-3.js');
module.exports = makeS3Type({
  id: 'G3-616', slug: 'make-a-grid-map-of-our-community', mode: 's3-gridmap', exerciseType: 'maps',
  difficulty: {"1":{"started":true},"2":{},"3":{"directions":true}},
  i18n: { en: { title: "Our Community Grid Map", instruction: "Draw our school's neighborhood on the grid. Fill in the title, the compass rose, the scale and the key. Check off each place. Then write the squares of four places for a partner." } },
});
