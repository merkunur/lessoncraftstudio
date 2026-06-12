/** G2-245 — Count the Edges (geometry-tasks factory, mode solid-counts) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-245', slug: 'edges-and-vertices', mode: 'solid-counts', facet: 'edges',
  i18n: { en: { title: 'Count the Edges', instruction: 'Write how many edges each solid has.' } },
});
