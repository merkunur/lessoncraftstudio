/** K-630 — a picture reader to color (Daily Teaching System, Part 8.1): the book of K-629 with the line-art drawings of
 *  the same pictures. A book whose pictures have no line-art drawing is not offered in this version. A unit = a book. */
'use strict';
const { makeReaderBook } = require('../_shared/reader-book.js');
module.exports = makeReaderBook({
  id: 'K-630', slug: 'theme-reader-to-color', mode: 'theme', bw: true, gradeBand: 'K',
  i18n: { en: { title: '{U}', instruction: 'Fold the top half back, then fold the left half back to make a little book. Name the pictures, read each page, and color.', seoName: '{T}: A Picture Mini-Book to Color', stage: 'Decodable · Set {N}: {L}', level: 'Level {N}' } },
});
