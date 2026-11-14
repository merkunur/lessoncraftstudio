/** G2-514 — Add Three and Four Two-Digit Numbers (regroup-more factory, mode column-many; Year pages V, 2026-11-14) */
'use strict';
const { makeRegroupType } = require('../_shared/regroup-more.js');
module.exports = makeRegroupType({
  id: 'G2-514', slug: 'add-three-and-four-two-digit-numbers', mode: 'column-many', gradeBand: 'G2',
  i18n: { en: { title: "Add Three and Four Two-Digit Numbers", instruction: "Add the ones first. Look for two digits in the ones column that make ten. Write the new ten in the small box above the tens. Then add the tens." } },
});
