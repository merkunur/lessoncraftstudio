/** G3-483 — Break Apart a Hard Fact (Year pages K, 2026-11-13; 3.OA.B.5, 3.OA.C.7): an array of a rows of b squares
 *  is cut into two arrays the child knows, and the two part products are added: 7 x 8 = 5 x 8 + 2 x 8 = 40 + 16 = 56.
 *  Level 1 prints the line under the fifth row and both part facts (tables 6 to 9); level 2 has the six facts 7 x 7 to
 *  9 x 9 and the child draws the line and writes the parts; level 3 prints three facts twice, to cut in two ways. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');
module.exports = makeMdMoreType({
  id: 'G3-483', slug: 'break-apart-a-hard-fact', mode: 'split', gradeBand: 'G3',
  i18n: { en: { title: 'Break Apart a Hard Fact', instruction: 'Draw a line to cut each array into two parts you know. Write the two products and add them.' } },
});
