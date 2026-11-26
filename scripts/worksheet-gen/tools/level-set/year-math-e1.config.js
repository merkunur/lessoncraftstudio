/** Level Set config — Year pages, mathematics E-1 (Daily Teaching System, Stage E-1), 2026-11-26. PDF only.
 *  The eight German and Swedish page types of the generator changes the year designs needed (types/_shared/e1-math.js,
 *  e1-math-art.js; the lessons and rulings: lcs-stage-d/batch-e1/LINES.md, BATCH-E1-RESULT.md; one German Grundschule
 *  teacher and one Swedish lågstadium teacher read them). Each type ships in its own language only:
 *    de  G1-671 Einkaufen bis 20 Euro · G3-630 Halbschriftlich addieren · G3-631 Überschlag und Probe
 *    sv  G1-672 Lägesord · G2-631 Betala med sedlar · G2-632 Kilogram · G2-633 Hur lång tid tar det? · G3-632 Egen undersökning
 *  Themeless: a copy = a seed. Every face is NEW (noPublished). Noindex like every Level Set; the units link the pages. */
'use strict';
const LOC = { 'G1-671': 'de', 'G3-630': 'de', 'G3-631': 'de', 'G1-672': 'sv', 'G2-631': 'sv', 'G2-632': 'sv', 'G2-633': 'sv', 'G3-632': 'sv' };
module.exports = {
  prefix: 'yea',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-26: Year pages, mathematics E-1. Eight German and Swedish page types for lessons of the year designs (shopping with euros and kronor, position words, kilograms, durations, adding in steps to 1000, estimate and check, a class survey), three levels each, PDF only.',
  // G3-632 is the class's own survey record: every copy is the same page, so one copy a level
  faces: Object.fromEntries(Object.keys(LOC).map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, id === 'G3-632' ? { maxCopiesAt: { 1: 1, 2: 1, 3: 1 } } : {})])),
  include: (loc, id) => LOC[id] === loc,
};
