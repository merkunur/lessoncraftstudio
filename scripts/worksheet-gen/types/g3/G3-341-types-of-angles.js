/** G3-341 — Right-Angle Hunt (geometry-tasks factory, mode angles) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G3-341', slug: 'types-of-angles', mode: 'angles', 
  i18n: { en: { title: 'Right-Angle Hunt', instruction: 'Circle every RIGHT angle (the ones with the little square).' } },
});
