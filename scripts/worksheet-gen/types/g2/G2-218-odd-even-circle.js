/**
 * G2-218 — Odd or even (two-digit): circle all the ODD numbers in the grid.
 * Guaranteed mix: at least a third of each parity.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');

module.exports = {
  id: 'G2-218',
  slug: 'odd-and-even-numbers',
  gradeBand: 'G23',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { count: 12, max: 50 },
    2: { count: 16, max: 99 },
    3: { count: 20, max: 999 },
  },
  i18n: {
    en: {
      title: 'Odd Number Hunt',
      instruction: 'Circle every ODD number. Look at the last digit to decide.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const third = Math.ceil(d.count / 3);
    const vals = new Set();
    // guarantee parity mix, then fill randomly
    while ([...vals].filter((v) => v % 2 === 1).length < third) vals.add(rng.int(5, d.max) | 1);
    while ([...vals].filter((v) => v % 2 === 0).length < third) vals.add((rng.int(5, d.max) | 1) - 1);
    let guard = 0;
    while (vals.size < d.count && guard++ < 300) vals.add(rng.int(10, d.max));
    const order = rng.shuffle([...vals]).slice(0, d.count);
    const cols = 4;
    const cells = order.map((v) =>
      `<span class="ws-pattern-slot" style="width:124px;height:84px;font-family:'Baloo 2';font-weight:700;font-size:30px;color:#3A3530" ` +
      `data-lcs-val="${v}"${v % 2 === 1 ? ' data-lcs-target="1"' : ''}>${v}</span>`).join('');
    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">` +
        `<div style="display:grid;grid-template-columns:repeat(${cols},124px);gap:24px 30px;justify-content:center">${cells}</div>` +
        `</div>`,
      meta: { odds: order.filter((v) => v % 2 === 1).length },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-val]')];
      cells.forEach((c) => {
        const v = parseInt(c.dataset.lcsVal, 10);
        const marked = !!c.dataset.lcsTarget;
        if ((v % 2 === 1) !== marked) fails.push(`${v}: parity mark wrong`);
        if (c.textContent.trim() !== String(v)) fails.push(`${v}: text mismatch`);
      });
      const odds = cells.filter((c) => c.dataset.lcsTarget).length;
      if (odds < 3 || cells.length - odds < 3) fails.push('parity mix too thin');
      return fails;
    });
  },
};
