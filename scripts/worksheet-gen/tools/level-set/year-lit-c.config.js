/** Level Set config — Year pages, literacy C (Daily Teaching System, Part 12.3), 2026-11-15. PDF only.
 *  Two more Kindergarten reading page types on the fact texts (types/_shared/fact-text-k.js): Pictures That Teach
 *  (K-647, RI.K.7: a line from each sentence to the picture that goes with it) and First, Then (K-648, RI.K.3: what
 *  comes first and what comes then in a text that tells a change), for the unit "Reading to Learn: Fact Texts".
 *  No theme: a copy is another TEXT, so two copies of a level never share a sentence (maxShared 0). Five texts tell a
 *  change, eight have a matching page. Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-647', 'K-648'];
module.exports = {
  prefix: 'ylc',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-15: Year pages, literacy C (Part 12.3). Two more Kindergarten reading page types on a fact text of four sentences (a line from each sentence to its picture; what comes first and what comes then), three levels, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
