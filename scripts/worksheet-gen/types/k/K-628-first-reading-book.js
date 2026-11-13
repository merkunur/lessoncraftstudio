/** K-628 — a decodable mini-book (Daily Teaching System, Part 8.1): one sheet folded twice into a book of a cover and
 *  three pages. Every word is decodable at the book's set or a heart word taught by then (scripts/readers/gate.js);
 *  the pages carry no picture: the child reads the page and draws it. A unit = a book. */
'use strict';
const { makeReaderBook } = require('../_shared/reader-book.js');
module.exports = makeReaderBook({
  id: 'K-628', slug: 'first-reading-book', mode: 'first', gradeBand: 'K',
  i18n: { en: { title: '{U}', instruction: 'Fold the top half back, then fold the left half back to make a little book. Read each page. Then draw what it says.', by: 'Pictures by', seoName: '{T}: A Decodable Mini-Book', stage: 'Decodable · Set {N}: {L}', level: 'Level {N}' } },
});
