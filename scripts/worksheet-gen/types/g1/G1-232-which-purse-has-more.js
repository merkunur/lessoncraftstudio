/**
 * G1-232 — Which purse has more? (nt20-VAR, money family.) Two coin purses
 * per row; the child counts both and circles the one holding MORE money.
 * The trap this page exists for: more coins is not more money — a purse of
 * many small coins loses to two big ones. Native currency per locale via
 * data/money/currencies.js; totals stay in the smallest natural unit.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { coinRow } = require('../../primitives/coins.js');
const { CURRENCIES } = require('../../data/money/currencies.js');

const D = { coinsMin: 2, coinsMax: 5, denomsUsed: 4, cards: 3, cols: 1, rows: 3, minPx: 42, maxPx: 58 };

module.exports = {
  id: 'G1-232',
  slug: 'which-purse-has-more',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'money',
  themeAxis: { applicable: false },
  difficulty: { 1: { ...D }, 2: { ...D }, 3: { ...D } },
  i18n: {
    en: {
      title: 'Which Purse Has More?',
      instruction: 'Count the money in both purses. Circle the purse that has more.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cur = CURRENCIES[(locale || 'en').slice(0, 2)];
    if (!cur) throw new Error(`G1-232: no currency table for locale ${locale}`);
    const denoms = [...cur.sub].sort((a, b) => a.v - b.v).slice(0, Math.min(d.denomsUsed, cur.sub.length));
    const makePurse = () => {
      const k = rng.int(d.coinsMin, d.coinsMax);
      const values = Array.from({ length: k }, () => rng.pick(denoms).v);
      return { values, total: values.reduce((a, b) => a + b, 0) };
    };
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let A, B, guard = 0;
      do {
        A = makePurse(); B = makePurse(); guard++;
      } while ((A.total === B.total || A.total > cur.subMax || B.total > cur.subMax) && guard < 200);
      if (A.total === B.total) throw new Error('G1-232: could not build distinct purses');
      const more = A.total > B.total ? 'left' : 'right';
      const purse = (p, side) => {
        const row = coinRow({ values: p.values, denoms: cur.sub, minPx: d.minPx, maxPx: d.maxPx });
        return `<div style="flex:1;display:flex;align-items:center;justify-content:center;background:#FFFFFF;` +
          `border:2.5px dashed #C8BFAE;border-radius:18px;padding:14px 10px;min-height:96px" data-lcs-purse="${side}">${row.html}</div>`;
      };
      cards.push(
        `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:10px 14px" data-lcs-more="${more}">` +
        purse(A, 'left') +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#8A8276">?</span>` +
        purse(B, 'right') +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-more]');
      if (cards.length < 3) fails.push(`only ${cards.length} rows`);
      cards.forEach((card, i) => {
        const sumOf = (side) => {
          const purse = card.querySelector(`[data-lcs-purse="${side}"]`);
          if (!purse) return null;
          return [...purse.querySelectorAll('[data-lcs-prim="coin"]')].reduce((a, c) => a + (+c.dataset.lcsValue), 0);
        };
        const L = sumOf('left'), R = sumOf('right');
        if (L == null || R == null) { fails.push(`row ${i + 1}: missing purse`); return; }
        if (L === R) fails.push(`row ${i + 1}: equal totals`);
        const want = L > R ? 'left' : 'right';
        if (card.dataset.lcsMore !== want) fails.push(`row ${i + 1}: declared ${card.dataset.lcsMore} != actual ${want}`);
      });
      return fails;
    });
  },
};
