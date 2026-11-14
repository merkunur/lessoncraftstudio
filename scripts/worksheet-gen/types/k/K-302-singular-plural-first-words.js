/** K-302 — One and Many: First Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-302',
  slug: 'singular-plural-first-words',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], maxLetters: 6 }, 2: D, 3: { ...base.difficulty[2], maxLetters: 7 } },
  i18n: { en: { title: "One and Many: First Words", instruction: "One or many? Trace the word that names more than one." } },
  /**
   * THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): seven rows of the level, each a card of
   * its own — the page's own build with seven rows (a new copy: the reviewed exclusions apply), the rows lifted out of
   * its column, the empty writing trio under the plural carrying the plural as its answer (the child traces the word
   * for many and writes it on that line; the key writes it there). Seven: the page has three or four rows.
   */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const built = base.build.call({ ...this, difficulty: { 0: { ...d, rows: 7 } } }, { theme, difficulty: 0, locale }, { rng: ctx.rng, variant: ctx.variant });
    const ROW = '<div class="ws-card" style="flex-direction:row;';
    const body = built.bodyHtml.slice(built.bodyHtml.indexOf(ROW), -'</div>'.length);
    const rows = body.split(new RegExp('(?=' + ROW.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')')).filter(Boolean);
    if (rows.length !== 7) throw new Error(`${this.id}: check page cut ${rows.length} rows, not 7`);
    const cards = rows.map((r) => {
      const plur = (/ data-lcs-plural="([^"]*)"/.exec(r) || [])[1];
      if (!plur || !r.includes('data-lcs-empty-trio="1"')) throw new Error(`${this.id}: a row without its plural lane`);
      return r.replace(/^<div class="ws-card" style="flex-direction:row;flex:0 1 \d+px;min-height:0;padding:8px 10px;/, '<div style="display:flex;flex-direction:row;padding:2px 0;')
        .replace('data-lcs-empty-trio="1"', `data-lcs-empty-trio="1" data-lcs-answer="${plur}"`);
    });
    return { bodyHtml: `<div data-lcs-check-page>${checkGrid(cards)}</div>`, meta: {} };   // (in a wrapper: a grid straight in the body is cut as an old card page, keyed by the numbers it shows — the count badges made every card one task)
  },
};
