/** G2-291 — Shopping Math: Add Up the Basket. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
const { checkGrid } = require('../../lib/check-page.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["total","total","total"]} };
module.exports = {
  ...base,
  id: 'G2-291',
  slug: 'shopping-math-add-up-the-basket',
  // Level Set 2026-10-05: real levels (level 2 = the published page, D): level 1 smaller prices, level 3 harder
  difficulty: { 1: { ...D, ...{"baseMax":5,"items":4} }, 2: D, 3: { ...D, ...{"cards":4,"baseMax":9,"cardH":0,"dots":40,"icon":56,"font":15,"coinPx":[30,40],"pad":"8px 14px","gap":10} } },
  i18n: { en: { title: "Shopping Math: Add Up the Basket", instruction: "Every card asks for a total. Add the prices together." } },

  /**
   * THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's story cards, each with a
   * small shelf of its own (the page's shelf stands above all its cards, so a card could not be cut from it): the two
   * things the story names and one more thing of the same shelf, in the shelf's order, with their price tags. The
   * stories are the page's own (built by the page's build, one shelf after another, until seven different baskets are
   * drawn; never as many cards as a page holds), the answer in the markup.
   * 2026-11-19 (review en-1119-math, g2-measurement-time-money part 7: "A card 1 (25 + 45) regroups; A card 2 and both
   * B cards do not, so A is harder"): the stage says whether the two prices of its story make a new ten
   * (data-lcs-regroup), so that the check can ask one total that does and one that does not in each form (lists kindAttr).
   */
  checkPage(args, ctx) {
    const { shelf } = require('../../templates/components-b2.js');
    const { answerBox } = require('../../templates/components.js');
    const cards = [], seen = new Set();
    for (let t = 0; t < 12 && cards.length < 7; t++) {
      const b = this.build(args, { ...ctx, check: false });
      const onShelf = [...b._shelf.matchAll(/data-lcs-shelfitem="(\d+)" data-lcs-price="(\d+)"[^>]*>\s*<img class="ws-icon" src="([^"]+)"/g)].map((m) => ({ i: +m[1], price: +m[2], src: m[3] }));
      if (onShelf.length !== b.meta.prices.length) throw new Error(`${this.id}: the shelf changed its shape`);
      for (const p of b._probs) {
        const refs = [...p.sentence.matchAll(/data-lcs-ref="(\d+)"/g)].map((m) => +m[1]);
        const k = refs.map((r) => onShelf[r].price).sort((x, y) => x - y).join('+') + '=' + p.answer;
        if (seen.has(k) || cards.length >= 7) continue;
        seen.add(k);
        const more = ctx.rng.pick(onShelf.filter((s) => !refs.includes(s.i)));
        const ones = refs.reduce((n, r) => n + (onShelf[r].price % 10), 0);
        const mini = onShelf.filter((s) => refs.includes(s.i) || s === more).map((s) => ({ src: s.src, price: s.price, unit: p.unit }));
        cards.push(`<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;padding:2px 4px" data-lcs-problem data-lcs-qtype="${p.kind}" data-lcs-regroup="${p.kind === 'total' && ones >= 10 ? 1 : 0}">` +
          `<div style="display:flex;justify-content:center">${shelf({ items: mini, w: 290, iconPx: 48, tagPx: p.unit.length > 3 ? 15 : 17 })}</div>` +
          `<p style="font-family:'Nunito';font-weight:800;font-size:17px;line-height:1.45;color:#3A3530;margin:0" data-lcs-sentence>${p.sentence}</p>` +
          `<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px">${answerBox({ w: 84, h: 52, answer: p.answer })}<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:#3A3530" data-lcs-unit>${p.unit}</span></div></div>`);
      }
    }
    return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: {} };
  },
};
