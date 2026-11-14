/** G3-371 — Multiplication Word Problems. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G3-371',
  slug: 'multiplication-word-problems',
  // Level Set 2026-10-14: level 2 = the published config D; levels 1 / 3 from G3-370 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G3-371', D),
  i18n: { en: { title: "Multiplication Word Problems", instruction: "The picture shows the equal groups. Write each answer in the box." } },

  /** THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): seven stories of the
   *  level, each a card of its own (a worksheet page holds two, too few to cut two forms from). Built by the page's own
   *  story composer (G3-370 _levelSet), the answer box beside the picture (no working panel, no sentence line). Seven:
   *  the cutter pairs a page's cards with the cards of the type's answer key when their numbers agree, and the key page
   *  of a level holds groups of up to six alike things (six groups, six in a group). */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const N = 7;
    const d0 = this.difficulty[difficulty] || this.difficulty[2];
    const d = { ...d0, ops: Array.from({ length: N }, (_, i) => d0.ops[i % d0.ops.length]), dots: 0, ruling: false, compact: true };
    // at least six DIFFERENT facts (3 × 4 and 4 × 3 are one task of a check; the easier level has only seven): drawn
    // again from the same stream until they are
    let built = null;
    for (let t = 0; t < 200 && !built; t++) {
      const b = this._levelSet(d, theme, (locale || 'en').slice(0, 2), { ...(ctx || {}), interactive: false, answerKey: false });
      const facts = b.meta.problems.map((p) => [p.n1, p.n2].sort((x, y) => x - y).join('x'));
      if (new Set(facts).size >= 6) built = b;
    }
    if (!built) throw new Error('G3-371 checkPage: no six different facts');
    const html = built.bodyHtml, at = html.indexOf('<div class="ws-card-stage"');
    if (at < 0 || !html.endsWith('</div>')) throw new Error('G3-371 checkPage: no stories on the page');
    const blocks = html.slice(at, html.length - '</div>'.length).split(/(?=<div class="ws-card-stage")/)
      // a card at its natural height: the story does not stretch over the page (flex 1 0 auto)
      .map((b) => b.replace(/^<div class="ws-card-stage" style="flex:1 0 auto;/, '<div class="ws-card-stage" style="flex:0 0 auto;'));
    if (blocks.length !== N || blocks.some((b) => !/data-lcs-problem/.test(b.slice(0, 600)))) throw new Error('G3-371 checkPage: ' + blocks.length + ' stories');
    return { bodyHtml: checkGrid(blocks), meta: {} };
  },
};
