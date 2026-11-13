/** K-639 — One for You, One for Me: Share Equally (Year pages E, 2026-11-13): the pile and the bins of G2-216 WITHOUT the
 *  division sentence (Swedish förskoleklass and Kindergarten share by dealing out; the division sign comes in grade 2
 *  or 3). Level 1 two bins, 4 to 10 pictures; level 2 two or three bins, up to 12; level 3 two or three bins, up to 18. */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'K-639', slug: 'one-for-you-one-for-me', mode: 'share-bins', gradeBand: 'K',
  levels: { 'share-bins': { 1: { binLo: 2, binHi: 2, eachLo: 2, eachHi: 5, noSentence: true }, 2: { binLo: 2, binHi: 3, eachLo: 2, eachHi: 4, noSentence: true }, 3: { binLo: 2, binHi: 3, eachLo: 3, eachHi: 6, noSentence: true } } },
  i18n: { en: { title: 'One for You, One for Me: Share Equally', instruction: 'Share the pile equally into the bins. Write how many each gets.' } },
});
