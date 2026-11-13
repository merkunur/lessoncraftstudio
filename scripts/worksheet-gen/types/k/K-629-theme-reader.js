/** K-629 — a picture reader (about guided reading levels A to C; Daily Teaching System, Part 8.1): one sheet folded
 *  twice into a book of a cover and three pages, each page a library picture and its sentence. The adult names the
 *  pictures with the child before reading (scripts/readers/gate.js). A unit = a book. */
'use strict';
const { makeReaderBook } = require('../_shared/reader-book.js');
module.exports = makeReaderBook({
  id: 'K-629', slug: 'theme-reader', mode: 'theme', gradeBand: 'K',
  i18n: { en: { title: '{U}', instruction: 'Fold the top half back, then fold the left half back to make a little book. Name the pictures. Then point under each word as you read.', seoName: '{T}: A Picture Mini-Book', stage: 'Decodable · Set {N}: {L}', level: 'Level {N}' } },
});
