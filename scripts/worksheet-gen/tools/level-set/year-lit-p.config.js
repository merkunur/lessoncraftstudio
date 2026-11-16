/** Level Set config — Year pages, literacy P (Daily Teaching System, Part 12.3), 2026-11-17. PDF only.
 *  Two NEW Grade 3 page types for the lesson Maps, Diagrams, and Photos (RI.3.7) of the unit Reading to Learn: Informational Texts: G3-510 Read the Text and the Map (five texts, each with a grid map of real places), G3-511 Read the Text and Diagram (five texts, each with a chain of steps). Factory types/_shared/info-text-g3d.js; bank data/literacy/info-graphics-g3.en.json.
 *  No theme: a copy draws other items from one small bank, so two copies of a level DO share items: at most three
 *  quarters of a page (shareFrac 0.75; no two copies are the same page). Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['G3-510', 'G3-511'];
module.exports = {
  prefix: 'ylp',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-17: Year pages, literacy P (Part 12.3). Two new Grade 3 page types on reading a text together with a map or a diagram: questions answered from the text, from the graphic, or from both, with the source marked, three levels each. English only, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc) => loc === 'en',
};
