/** Level Set config — Year pages, literacy B (Daily Teaching System, Part 12.3), 2026-11-15. PDF only.
 *  Two NEW Kindergarten reading page types on one fact text each (types/_shared/fact-text-k.js): Find the Facts
 *  (K-645, RI.K.1: four questions answered with a picture) and What Is It All About? (K-646, RI.K.2: the main topic
 *  and key details), for the unit "Reading to Learn: Fact Texts" of the English literacy year design.
 *  No theme: a copy is another TEXT (data/literacy/info-texts.en.json, key `k`), so two copies of a level never
 *  share a question (maxShared 0). Every face is NEW (noPublished), so its copies number from 1 at every level.
 *  English only: the texts are English texts written to the Common Core's Kindergarten reading standards. */
'use strict';
const FACES = ['K-645', 'K-646'];
module.exports = {
  prefix: 'ylb',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 0,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-15: Year pages, literacy B (Part 12.3). Two new Kindergarten reading page types on a fact text of four sentences in big print with a library picture (questions answered by circling or drawing a picture; the main topic and key details), three levels, for the lessons of the English literacy year design.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
