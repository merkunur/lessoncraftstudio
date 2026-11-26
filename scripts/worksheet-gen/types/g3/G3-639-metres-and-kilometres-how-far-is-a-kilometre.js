/** G3-639 — Meter und Kilometer: Wie weit ist ein Kilometer? (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:laengen-und-geld). e2-math-b.js mode 'e2b-km'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-639', slug: 'metres-and-kilometres-how-far-is-a-kilometre', mode: 'e2b-km', exerciseType: 'measurement', gradeBand: 'G3',
  i18n: { en: { title: "Metres and Kilometres: How Far Is a Kilometre?", instruction: "Read the lengths of the roads on the town map and add them. Fill up to 1 km. Remember: 1 km = 1000 m. Below, match each distance to the right card." } },
});
