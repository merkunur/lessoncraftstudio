/** Level Set config — Year pages, literacy E-0 (Daily Teaching System, Stage E-0), 2026-11-25. PDF only.
 *  The pages of the two English teacher-led lessons that waited for one (operator 2026-11-25: "fix both of them"):
 *  K-728 Walk, March, Tiptoe: Act It Out (L.K.5.d) and G1-678 Book Talk: Listen, Then Add On (SL.1.1.a)
 *  (types/_shared/talk-verbs.js). Themeless: a copy draws other rows or another tale from a small bank, so two copies of
 *  a level may share rows: at most three quarters of a page (shareFrac 0.75). The record page of G1-678 (level 3) is
 *  the same page in every copy: one copy; its level 1 holds one of the four tales: four copies. Every face is NEW (noPublished). English only. */
'use strict';
const FACES = ['K-728', 'G1-678'];
module.exports = {
  prefix: 'yen',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 30,
  shareFrac: 0.75,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-25: Year pages, literacy E-0. The pages of two teacher-led lessons: acting out action words (walk, march, tiptoe) and a book talk with talk rules and talk stems, three levels each, PDF only.',
  faces: Object.fromEntries(FACES.map((id) => [id, Object.assign({ levels: [2, 1, 3], noPublished: true }, id === 'G1-678' ? { maxCopiesAt: { 1: 4, 3: 1 } } : {})])),
  include: (loc) => loc === 'en',
};
