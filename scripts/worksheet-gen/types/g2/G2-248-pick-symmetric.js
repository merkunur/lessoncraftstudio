/** G2-248 — Find the Mirror Picture (geometry-tasks factory, mode pick-symmetric) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-248', slug: 'symmetry-pictures', mode: 'pick-symmetric', 
  i18n: { en: { title: 'Find the Mirror Picture', instruction: 'Circle the picture that is the same on both sides.' } },
});
