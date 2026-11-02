/** K-464 — Shape Pictures (Shapes & Geometry maker, 2026-11-02): colour a picture made of shapes by the shape key, then
 * count each kind. See types/_shared/shape-pictures.js. */
'use strict';
const { makeShapePicturesType } = require('../_shared/shape-pictures.js');

module.exports = makeShapePicturesType({
  id: 'K-464', slug: 'shape-pictures',
  i18n: { en: { title: "Shape Pictures", instruction: "Color the shapes to match the color key. Then count each kind of shape and write how many in its box." } },
});
