/** K-289 — Trace Your First Words. nt20-B-VAR variation of K-284. */
'use strict';
const base = require('./K-284-word-tracing.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
// 2026-11-15 (en reviewer of the unit checks): the peach reads as an apple; the plum, persimmon, apricot and nectarine as an
// apple, a tomato or an orange — never a word to trace under its picture (swapped out of the draw: base avoidNouns)
const AVOID = ['peach', 'plum', 'persimmon', 'apricot', 'nectarine'];
const D = { ...base.difficulty[1], ...{ avoidNouns: AVOID } };
module.exports = {
  ...base,
  id: 'K-289',
  slug: 'word-tracing-first-words',
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); PDF only
  difficulty: { 1: { ...base.difficulty[1], maxLetters: 4, glyphH: 62, laneH: 72, pic: 160, cardW: 184, rowH: 230, avoidNouns: AVOID }, 2: D, 3: { ...base.difficulty[2], maxLetters: 6, avoidNouns: AVOID } },
  i18n: { en: { title: "Trace Your First Words", instruction: "Trace the dashed word, then write it on the empty line." } },

  /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): seven rows of the level drawn by the page's
   *  own build (a new page's word pool: the review's exclusions, the refused pictures), each row a card of its own; the
   *  empty school-line trio carries the word as its model answer (data-lcs-answer). Seven: a page holds three or four. */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d0 = this.difficulty[difficulty] || this.difficulty[2];
    const self = Object.assign(Object.create(this), { difficulty: { ...this.difficulty, [difficulty]: { ...d0, rows: 7 } } });
    const built = this.build.call(self, { theme, difficulty, locale }, { rng: ctx.rng, variant: 2 });
    const rows = built.bodyHtml.split('<div class="ws-trace-lane"').slice(1).map((x, i, a) => '<div class="ws-trace-lane"' + (i === a.length - 1 ? x.replace(/<\/div>\s*$/, '') : x));
    if (rows.length !== 7) throw new Error(`${this.id} checkPage: ${rows.length} rows, not 7`);
    const blocks = rows.map((row) => {
      const word = (row.match(/data-lcs-word="([^"]*)"/) || [])[1];
      if (!word || row.indexOf('data-lcs-empty-trio="1"') < 0) throw new Error(`${this.id} checkPage: a row without its word or its empty trio`);
      // (a row is 660 px wide, a card's inside a little less: the row is drawn at 95 %)
      return `<div style="zoom:0.95">${row.replace('data-lcs-empty-trio="1"', `data-lcs-empty-trio="1" data-lcs-answer="${word}"`)}</div>`;
    });
    return { bodyHtml: `<div>${checkGrid(blocks)}</div>`, meta: {} };
  },
};
