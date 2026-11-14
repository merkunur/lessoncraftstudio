/** G1-573 — Add and Make a New Ten: Tens-and-Ones Mat (regroup-more factory, mode mat-add; Year pages V, 2026-11-14) */
'use strict';
const { makeRegroupType } = require('../_shared/regroup-more.js');
module.exports = makeRegroupType({
  id: 'G1-573', slug: 'add-and-make-a-new-ten-mat', mode: 'mat-add', gradeBand: 'G1',
  i18n: { en: { title: "Add and Make a New Ten: Tens-and-Ones Mat", instruction: "Draw both numbers on the mat: a stick for each ten, a dot for each one. Circle ten dots and draw one new stick for them. Then write the tens, the ones, and the sum." } },
});
