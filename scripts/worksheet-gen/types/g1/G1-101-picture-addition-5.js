/** G1-101 — Picture addition within 5. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-101', slug: 'picture-addition-within-5', mode: 'add', maxTotal: 5,
  difficulty: { 1: { maxTotal: 5, rows: 4 }, 2: { maxTotal: 5, rows: 5 }, 3: { maxTotal: 6, rows: 5 } },
  i18n: { en: { title: 'Add the Pictures', instruction: 'Count both groups. Write how many altogether.' } },
});
