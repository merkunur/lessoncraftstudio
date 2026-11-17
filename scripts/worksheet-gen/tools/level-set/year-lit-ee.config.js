/** Level Set config — Year pages, literacy EE (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Eight NEW Kindergarten page types on how books and print work: K-665 Front Cover, Title Page, and Back Cover and K-666 Make a Front Cover and a Title Page (RI.K.5); K-667 Read Left to Right, Top to Bottom and K-668 Number the Lines and the Pages (RF.K.1.a); K-669 One Spoken Word, One Written Word and K-670 Match the Word You Hear (RF.K.1.b); K-671 Spaces Between Words: Count the Words and K-672 Finger Spaces (RF.K.1.c). Factory types/_shared/print-concepts-k.js; bank data/literacy/print-concepts-k.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-665', 'K-666', 'K-667', 'K-668', 'K-669', 'K-670', 'K-671', 'K-672'];
module.exports = {
  prefix: 'ylee',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy EE (Part 12.3). Eight new Kindergarten page types on print concepts: the parts of a book, reading left to right and top to bottom, one written word for each spoken word, and the spaces between words, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
