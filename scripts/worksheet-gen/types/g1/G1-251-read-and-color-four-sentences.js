/** G1-251 — Read and Color: Four Sentences. nt20-B-VAR variation of G1-242. */
'use strict';
const base = require('./G1-242-read-and-color.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-251',
  slug: 'read-and-color-four-sentences',
  // Level Set 2026-09-30: L1 one or two of each picture (big pictures) · L3 three or four, among pictures of TWO other nouns; L2 = the published page
  difficulty: { 1: { ...D, nMin: 2, nMax: 2 }, 2: D, 3: { ...D, nMin: 3, nMax: 4, distract: [2], others: 2, icon: 80 } },
  i18n: { en: { title: "Read and Color: Four Sentences", instruction: "Read each sentence, then color exactly what it asks for." } },
  /**
   * THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): seven cards of the level, each a card of
   * its own — the page's own build with seven cards (a new copy: every colour frame can name its noun) on the black-and-
   * white set of the check's theme, each card carrying its one colour of the legend inside it; the pictures to colour
   * carry data-lcs-correct (the key rings them). Seven: the page has four cards.
   */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const { colorLegend } = require('../../templates/components-b2.js');
    const { COLOR_WORDS } = require('../../data/color-words.js');
    const bw = /\bbw\b/i.test(theme || '') ? theme : (theme || 'animals') + ' bw';   // colour art cannot be coloured
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const built = base.build.call({ ...this, difficulty: { 0: { ...d, cards: 7, rows: 4, colors: 8, icon: Math.min(d.icon, 64) } } }, { theme: bw, difficulty: 0, locale }, { rng: ctx.rng, variant: ctx.variant });
    const words = COLOR_WORDS[(locale || 'en').slice(0, 2)];
    const cards = [...built.bodyHtml.matchAll(/<section class="ws-card" data-lcs-card="\d+"><span class="ws-card-badge">\d+<\/span>([\s\S]*?)<\/section>/g)].map((m) => {
      const key = (/ data-lcs-color="([^"]+)"/.exec(m[1]) || [])[1];
      if (!key || !words[key]) throw new Error(`${this.id}: a card without its colour`);
      return colorLegend({ entries: [{ key, word: words[key] }], wordPx: 15 }).replace('class="ws-scene-banner" style="', 'class="ws-scene-banner" style="align-self:flex-start;padding:4px 12px;margin:0 0 4px;') +
        m[1].replace(/ data-lcs-target="1" data-lcs-key-ring/g, ' data-lcs-target="1" data-lcs-key-ring data-lcs-correct="1"').replace('padding-left:22px" data-lcs-sentence', '" data-lcs-sentence');
    });
    if (cards.length !== 7) throw new Error(`${this.id}: check page cut ${cards.length} cards, not 7`);
    return { bodyHtml: `<div data-lcs-check-page>${checkGrid(cards, { cols: 2 })}</div>`, meta: {} };
  },
};
