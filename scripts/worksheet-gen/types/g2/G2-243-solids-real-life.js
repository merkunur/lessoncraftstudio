/** G2-243 — Solid Shapes Around Us (geometry-tasks factory, mode solid-real) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-243', slug: '3d-shapes-real-life', mode: 'solid-real', 
  i18n: { en: { title: 'Solid Shapes Around Us', instruction: 'Draw a line from each solid to the object with its shape.' } },
});
