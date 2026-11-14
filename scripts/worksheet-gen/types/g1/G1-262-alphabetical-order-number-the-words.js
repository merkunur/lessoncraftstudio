/** G1-262 — ABC Order: Number the Words. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.FOUR_CARDS, ...{"rulings":false} };
module.exports = {
  ...base,
  id: 'G1-262',
  slug: 'alphabetical-order-number-the-words',
  // Level Set 2026-09-27 — the instruction fixes "the four cards": every level keeps four.
  // L1 first letters >= 5 apart · L2 >= 3 apart (published) · L3 one same-first-letter pair.
  difficulty: { 1: { ...D, gap: 5 }, 2: D, 3: { ...D, pairs: 1 } },
  i18n: { en: { title: "ABC Order: Number the Words", instruction: "Number the four cards to put the words in ABC order." } },

  /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): six sets of four picture-word cards, each set
   *  a card of its own with its own small alphabet strip. Each set is the page's own draw (build: its first-letter rule of
   *  the level, its shuffled order), read back from the page it builds; the rank circles carry the ranks
   *  (data-lcs-answer). A set that shares a word with an earlier set is drawn again, so six tasks ask about other words. */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const { alphabetStrip } = require('../../templates/components-b2.js');
    const { COLLATION } = require('../../data/b2/collation.js');
    const loc = (locale || 'en').slice(0, 2);
    const col = COLLATION[loc];
    const RE = /data-lcs-word="([^"]*)" data-lcs-vocab="[^"]*" data-lcs-rank="(\d+)" data-lcs-pos="(\d+)"[^>]*>\s*<img class="ws-icon" src="([^"]*)"/g;
    const sets = [], used = new Set();
    for (let guard = 0; sets.length < 6 && guard < 60; guard++) {
      const built = this.build({ theme, difficulty, locale }, { rng: ctx.rng });
      const cards = [...built.bodyHtml.matchAll(RE)].map((m) => ({ word: m[1], rank: Number(m[2]), pos: Number(m[3]), src: m[4] })).sort((a, b) => a.pos - b.pos);
      if (cards.length < 3) throw new Error('G1-262 checkPage: the page has no cards to read');
      if (cards.some((c) => used.has(c.word)) && guard < 40) continue;
      cards.forEach((c) => used.add(c.word));
      sets.push(cards);
    }
    if (sets.length < 6) throw new Error('G1-262 checkPage: fewer than six sets of other words');
    const strip = alphabetStrip({ letters: col.strip, w: 600, upper: col.stripCase === 'upper' });
    const blocks = sets.map((cards) => {
      const row = cards.map((c) =>
        `<div style="position:relative;width:132px;height:108px;border:2px solid #F0E4CB;border-radius:12px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px" data-lcs-word="${c.word}">` +
        `<img class="ws-icon" src="${c.src}" alt="" style="width:56px;height:56px">` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:${[...c.word].length >= 11 ? 14 : 17}px;color:#3A3530;white-space:nowrap">${c.word}</span>` +
        `<svg width="34" height="34" viewBox="0 0 36 36" style="position:absolute;right:-9px;top:-9px"><circle cx="18" cy="18" r="16" fill="#FFFFFF" stroke="#F2784B" stroke-width="2.5" stroke-dasharray="5 4" data-lcs-answer="${c.rank}"/></svg>` +
        `</div>`).join('');
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:4px 0">${strip}<div style="display:flex;gap:22px;justify-content:center;padding-top:6px">${row}</div></div>`;
    });
    // (the grid in a wrapper of its own: a grid straight in the page body is cut the old way, where a card whose answers
    // are numbers is known by its numbers only, so six sets of ranks 1-4 would be one task)
    return { bodyHtml: `<div>${checkGrid(blocks)}</div>`, meta: {} };
  },
};
