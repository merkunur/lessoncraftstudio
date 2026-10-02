/** Level Set config — Word Tracing (K-284 + K-289 / K-290 / K-291 / K-310 / K-311 / K-315), 2026-10-02. PDF only (fine-motor practice). */
'use strict';
const ALL3 = { 1: 'all', 2: 'all', 3: 'all' };
module.exports = {
  prefix: 'wtr',
  interactive: false,   // tracing: the point is the pencil — printable only, no screen version, no answer key
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  note: 'Level Set 2026-10-02: Word Tracing (K-284 + 6 faces), PDF only. Every face for EVERY buildable theme (colour and black-and-white) at 3 levels: base 3 big rows of short words / 4 rows / trace once and write twice; first words 4-letter words, big / published / 4 rows up to 6 letters; trace once write twice short words, big / published / 8-12 letters; longer words 7-9 letters / published / 4 rows up to 13 letters; capitals short, big / published / 4 rows up to 8 letters; copy the word short, big / published / 8-12 letters; copy the capitals short, big / published / 4 rows 6-10 letters. Visible to teachers, never indexed.',
  faces: {
    'K-284': { published: 'animals', levels: ALL3 },
    'K-289': { published: 'fruits', levels: ALL3 },
    'K-290': { published: 'vehicles', levels: ALL3 },
    'K-291': { published: 'toys', levels: ALL3 },
    'K-310': { published: 'fruits', levels: ALL3 },
    'K-311': { published: 'animals', levels: ALL3 },
    'K-315': { published: 'toys', levels: ALL3 },
  },
  include: () => true,
};
