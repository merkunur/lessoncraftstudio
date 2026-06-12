/** G2-246 — Count the Corners (geometry-tasks factory, mode solid-counts) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-246', slug: 'counting-vertices', mode: 'solid-counts', facet: 'vertices',
  i18n: { en: { title: 'Count the Corners', instruction: 'Write how many corners each solid has.' } },
});
