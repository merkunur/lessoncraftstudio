/** G1-293 — Nouns and Verbs: Two Bins. nt20-B-VAR variation of G2-275. */
'use strict';
const base = require('../g2/G2-275-word-classes.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"classes":["noun","verb"],"per":5,"pics":false,"tiers":[1],"lines":6} };
module.exports = {
  ...base,
  id: 'G1-293',
  slug: 'word-classes-two-bins',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); the title's count and picture promise hold
  difficulty: { 1: { ...D, per: 3, pics: true, lines: 4 }, 2: D, 3: { ...D, per: 6, tiers: [1, 2], lines: 7 } },
  i18n: { en: { title: "Nouns and Verbs: Two Bins", instruction: "Ten words and two bins. Is each word a noun or a verb?" } },
};
