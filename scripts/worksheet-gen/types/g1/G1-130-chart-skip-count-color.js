/**
 * G1-130 — Hundreds chart: color the skip-count path. The first two
 * multiples come pre-colored as the example; the child colors the rest.
 */
'use strict';
const hundredsChart = require('../../primitives/hundreds-chart.js');

module.exports = {
  id: 'G1-130',
  slug: 'hundreds-chart-skip-counting',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { step: 10 },
    2: { step: 5 },
    3: { step: 2 },
  },
  i18n: {
    en: {
      title: 'Color the Counting Path',
      instruction: 'Two boxes are colored to start you off. Color every number in the same counting pattern.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const chart = hundredsChart({ start: 1, end: 100, highlights: [d.step, d.step * 2], cell: 60 });
    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center" data-lcs-skipstep="${d.step}">` +
        chart.svg + `</div>`,
      meta: { step: d.step },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-skipstep]');
      const step = parseInt(wrap.dataset.lcsSkipstep, 10);
      const his = [...wrap.querySelectorAll('[data-lcs-highlight]')].map((e) => parseInt(e.dataset.lcsHighlight, 10));
      if (his.length !== 2) fails.push(`${his.length} example highlights (want 2)`);
      his.forEach((v) => { if (v % step !== 0) fails.push(`highlight ${v} not a multiple of ${step}`); });
      const cells = wrap.querySelectorAll('[data-lcs-cell]').length;
      if (cells !== 100) fails.push(`${cells} numerals != 100 (chart must be complete — nothing blank)`);
      return fails;
    });
  },
};
