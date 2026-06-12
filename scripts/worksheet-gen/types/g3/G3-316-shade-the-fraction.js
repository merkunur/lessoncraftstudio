/** G3-316 — Shade to match the fraction (class-7 exemplar). */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const fractionShape = require('../../primitives/fraction.js');

const FRAC = (n, d) =>
  `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:700;color:#3A3530" data-lcs-frac="${n}/${d}">` +
  `<span style="font-size:30px;line-height:1">${n}</span>` +
  `<span style="width:34px;height:3.5px;background:#3A3530;border-radius:2px;margin:3px 0"></span>` +
  `<span style="font-size:30px;line-height:1">${d}</span></span>`;

module.exports = {
  id: 'G3-316',
  slug: 'shading-fractions',
  gradeBand: 'G23',
  assetClass: 'fractions',
  exerciseType: 'fractions',
  themeAxis: { applicable: false },
  difficulty: {
    1: { ds: [2, 3, 4], cards: 4 },
    2: { ds: [3, 4, 6, 8], cards: 4 },
    3: { ds: [4, 6, 8, 9], cards: 6 },
  },
  i18n: {
    en: { title: 'Shade the Fraction', instruction: 'Color the right number of parts to show each fraction.' },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    const used = new Set();
    for (let i = 0; i < d.cards; i++) {
      let den, num, guard = 0;
      do {
        den = rng.pick(d.ds);
        num = rng.int(1, den - 1);
        guard++;
      } while (used.has(num + '/' + den) && guard < 30);
      used.add(num + '/' + den);
      const shape = rng.pick(den <= 4 ? ['circle', 'bar', 'square'] : ['circle', 'bar', den === 6 || den === 8 || den === 9 ? 'square' : 'bar']);
      const fig = fractionShape({ shape, d: den, shaded: 0, size: shape === 'bar' ? 150 : 130 });
      cards.push(
        `<div class="ws-card-stage" style="gap:30px" data-lcs-num="${num}" data-lcs-den="${den}">` +
        FRAC(num, den) +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#F2784B">→</span>` +
        fig.svg + `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
        const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
        const svg = card.querySelector('[data-lcs-prim="fraction"]');
        const parts = svg.querySelectorAll('[data-lcs-part]').length;
        const shaded = svg.querySelectorAll('[data-lcs-shaded="1"]').length;
        if (parts !== den) fails.push(`card ${i + 1}: ${parts} parts != denominator ${den}`);
        if (shaded !== 0) fails.push(`card ${i + 1}: must start unshaded`);
        if (num < 1 || num >= den) fails.push(`card ${i + 1}: improper target ${num}/${den}`);
        if (svg.dataset.lcsEqual !== '1') fails.push(`card ${i + 1}: parts must be equal`);
      });
      return fails;
    });
  },
};
