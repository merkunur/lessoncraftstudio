/** G1-260 — Write the Word on Plain Lines. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
/** (fix round 2026-11-23, review of the placement checks) THE PLACEMENT CHECK OF SPELLING: the teacher says the word, a
 *  sentence with it, and the word again (data-lcs-teacher-reads: on the key and the teacher pages, never on the child's
 *  page); the child writes the word on the line. Form A and form B say their own words. */
function placementDictation(words, form, key, rowH) {
  const { checkGrid } = require('../../lib/check-page.js');
  const { _parts } = require('../_shared/info-text.js');
  const cards = words[form].map(([w, kind, says]) => '<div data-lcs-dictate="' + w + '" data-lcs-ckind="' + kind + '" data-lcs-teacher-reads="' + w + '. ' + says + ' ' + w + '." style="padding:10px 14px">' +
    (key ? _parts.line({ w: 360, h: rowH, answer: w }) : _parts.line({ w: 360, h: rowH }).replace('<div data-lcs-line', '<div data-lcs-line data-lcs-answer="' + w + '"')) + '</div>');
  return { bodyHtml: '<div data-lcs-dictation="1">' + checkGrid(cards, { cols: 1 }) + '</div>', meta: {} };
}
const PLACE_WORDS = {
  A: [['frog', 'short', 'A green frog sat on a log.'], ['crab', 'short', 'The crab ran on the sand.']],
  B: [['drum', 'short', 'Tap the drum with a stick.'], ['nest', 'short', 'The bird sat in its nest.']],
};
module.exports = {
  ...base,
  id: 'G1-260',
  slug: 'write-the-word-on-plain-lines',
  // Level Set 2026-10-03: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...D, cards: 6, rows: 3, minLetters: 2, maxLetters: 6, pic: 104, glyphH: 36, rulingW: 190 }, 2: D, 3: { ...D, minLetters: 7 } },
  i18n: { en: { title: "Write the Word on Plain Lines", instruction: "No word bank this time. Write each picture word on the lines." } },
  /** (fix round 2026-11-23) the placement check of spelling: short-vowel words the teacher says (placementDictation); every
   *  other page, a unit check's too, is the build, as before */
  checkPage(args, ctx) {
    const seed = String((ctx && ctx.rng && ctx.rng.seed) || '');
    const m = /^check\|placement-spelling-patterns\|([AB])/.exec(seed);
    if (this.id !== 'G1-260' || !m || String((args && args.locale) || 'en').slice(0, 2) !== 'en') return this.build(args, ctx);
    return placementDictation(PLACE_WORDS, m[1], !!(ctx && ctx.answerKey), 64);
  },
};
