/** G2-242 — Count the Faces (geometry-tasks factory, mode solid-counts) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-242', slug: '3d-shapes-faces', mode: 'solid-counts', facet: 'faces',
  i18n: { en: { title: 'Count the Faces', instruction: 'Write how many flat faces each solid has.' } },
});
