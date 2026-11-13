/** K-631 — Read and Talk (Daily Teaching System, Part 8.1): the companion page of a mini-book. The whole text once more
 *  in large type, the new sounds and warm-up words of a decodable book, the book's words by kind, two or three
 *  questions for the adult, boxes to tick for each reading, and the teacher's line. A unit = a book. */
'use strict';
const { makeReaderBook } = require('../_shared/reader-book.js');
module.exports = makeReaderBook({
  id: 'K-631', slug: 'read-and-talk', mode: 'talk', gradeBand: 'K',
  i18n: { en: { title: '{U}: Read and Talk', instruction: 'Read the book again. Then talk about it with a grown-up.', stage: 'Decodable · Set {N}: {L}', level: 'Level {N}',
    wNewSounds: 'New sounds', warm: 'Warm up: read these first', wSound: 'Sound these out', wHeart: 'Heart words', wNew: 'New words: read them together first',
    wPicture: 'Picture words: name the pictures together first', wSight: 'Words you know', talk: 'Talk about it', readIt: 'I read it:', teacher: 'For the teacher:' } },
});
