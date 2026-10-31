/** G3-406 — mark a fraction on a number line cut into equal parts (T4, 3.NF.A.2). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G3-406', slug: 'fractions-on-the-number-line', mode: 'fraction', gradeBand: 'G3',
  i18n: { en: { title: "Fractions on the Number Line", instruction: "Each line is cut into equal parts. Draw a dot where the fraction belongs." } },
});
