/** G3-652 — Mäta i halva centimeter och visa i diagram (Batch SV, Daily Teaching System Stage E-2, 2026-11-26; Swedish only, new:samband-slump-statistik). e2-math-sv.js mode 'sv-halvcm'. */
'use strict';
const { makeSvType } = require('../_shared/e2-math-sv.js');
module.exports = makeSvType({
  id: 'G3-652', slug: 'measure-in-half-centimetres-and-show-in-a-diagram', mode: 'sv-halvcm', exerciseType: 'graphing-data', gradeBand: 'G3',
  i18n: { en: { title: "Measure in Half Centimetres and Show in a Diagram", instruction: "Measure each pencil with a ruler to the nearest half centimetre. Put the ruler's 0 at the pencil's flat end. Write the length. Then draw a cross for each pencil over the right length in the diagram." } },
});
