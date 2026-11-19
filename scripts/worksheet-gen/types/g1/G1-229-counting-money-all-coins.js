/** G1-229 — Counting Money: All the Coins. nt20-VAR variation of G1-211 (same family: money). */
'use strict';
const base = require('./G1-211-counting-coins.js');
module.exports = {
  ...base,
  id: 'G1-229',
  slug: 'counting-money-all-coins',
  // Level Set 2026-10-05: real levels (level 2 = the published page)
  difficulty: { 1: {"coinsMin":4,"coinsMax":5,"denomsUsed":99,"cards":4,"cols":2,"rows":2,"minPx":50,"maxPx":70}, 2: {"coinsMin":5,"coinsMax":7,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":42,"maxPx":60}, 3: {"coinsMin":6,"coinsMax":8,"denomsUsed":99,"cards":6,"cols":2,"rows":3,"minPx":38,"maxPx":54} },
  i18n: { en: { title: "Counting Money: All the Coins", instruction: "Count the coins in each purse. Write the total amount in the box." } },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6), 2026-11-19 (review en-1119-math of g2-measurement-time-money, part 6 and
   * question 4: with each coin's value printed on it, largest first, the part checked adding 25, 10, 5 and 1, not knowing
   * the coins). In English a card is a purse of the level, its coins drawn by the page's coin (the real sizes: the dime
   * smallest) WITHOUT their values, each named under it — penny, nickel, dime, quarter — in an order of their own (not
   * largest first); the child writes the total in cents. The other languages keep the page's cards as they are.
   */
  checkPage(args, ctx) {
    if (String(args.locale || 'en').slice(0, 2) !== 'en') return this.build(args, ctx);
    const { checkGrid } = require('../../lib/check-page.js');
    const { coin, sizeFor, mmOf } = require('../../primitives/coins.js');
    const { answerBox } = require('../../templates/components.js');
    const { CURRENCIES } = require('../../data/money/currencies.js');
    const cur = CURRENCIES.en, d = this.difficulty[args.difficulty] || this.difficulty[2];
    const NAME = { 1: 'penny', 5: 'nickel', 10: 'dime', 25: 'quarter' }, all = cur.sub.map((x) => x.v), mm = mmOf(cur.sub);
    const tint = Object.fromEntries(cur.sub.map((x) => [x.v, x.tint]));
    const cards = [], seen = new Set();
    for (let t = 0; t < 6 && cards.length < 8; t++) {
      const b = this.build(args, { ...ctx, interactive: false, answerKey: false });
      for (const p of b._purses) {
        const k = p.values.join('+'); if (seen.has(k) || cards.length >= 8) continue; seen.add(k);
        let order = ctx.rng.shuffle(p.values.slice());
        for (let g = 0; g < 10 && order.join() === p.values.join(); g++) order = ctx.rng.shuffle(p.values.slice());
        const coins = order.map((v) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px">` +
          coin({ value: v, tint: tint[v], d: sizeFor(v, all, { minPx: d.minPx, maxPx: d.maxPx, mm }), doubleRing: v >= 10 }).svg.replace(/<text[^>]*>\d+<\/text>/, '') +
          `<span style="font-family:'Nunito';font-weight:800;font-size:13px;line-height:1;color:#3A3530">${NAME[v]}</span></span>`).join('');
        const total = p.values.reduce((x, y) => x + y, 0);
        cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:12px;padding:8px">` +
          `<div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:10px" data-lcs-cointotal="${total}" data-lcs-purse="${p.values.slice().sort((x, y) => y - x).join('+')}" data-lcs-denoms="${new Set(p.values).size}">${coins}</div>` +
          `<div style="display:flex;align-items:center;gap:6px">${answerBox({ w: 76, h: 50, answer: total })}<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530">${cur.unit}</span></div></div>`);
      }
    }
    return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: {} };
  },
};
