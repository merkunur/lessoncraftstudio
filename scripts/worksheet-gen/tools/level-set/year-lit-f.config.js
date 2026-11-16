/** Level Set config — Year pages, literacy F (Daily Teaching System, Part 12.3), 2026-11-16. PDF only.
 *  One more Kindergarten reading page type (types/_shared/two-texts-k.js): Two Texts, One Topic (K-649, RI.K.9: what
 *  two fact texts on one topic both tell and what only one tells), the fifth lesson of the unit "Reading to Learn:
 *  Fact Texts". No theme: a copy is another PAIR of texts (data/literacy/info-texts.en.json, key `k2`, five pairs),
 *  so two copies of a level never share a text (maxShared 0). The face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-649'];
module.exports = {
  prefix: 'ylf',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-16: Year pages, literacy F (Part 12.3). One more Kindergarten reading page type: two fact texts of four sentences on one topic and six pictures to sort (first text only, both texts, second text only), to draw, or to draw and label, three levels, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
