/**
 * K-062 — Which two are exactly the same? One duplicated pair hides among
 * otherwise-distinct pictures; the child circles the twins.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-062',
  slug: 'find-the-same-two',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: {
    1: { items: 6, cols: 3 },
    2: { items: 9, cols: 3 },
    3: { items: 12, cols: 4 },
  },
  i18n: {
    en: {
      title: 'Find the Twins',
      instruction: 'Two pictures are exactly the same. Find them and circle both.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const picked = rng.sample(labelSafeNouns(theme), d.items - 1);
    const twin = picked[0];
    const order = rng.shuffle([...picked, twin]);

    const rows = Math.ceil(d.items / d.cols);
    const cellPx = Math.min(140, Math.floor(620 / d.cols) - 20, Math.floor(740 / rows) - 20);
    const iconPx = cellPx - 28;
    const cells = order.map((n) =>
      `<span class="ws-pattern-slot" style="width:${cellPx}px;height:${cellPx}px" ` +
      `data-lcs-item="${n.vocabKey}"${n.vocabKey === twin.vocabKey ? ' data-lcs-twin="1"' : ''}>` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">` +
        `<div style="display:grid;grid-template-columns:repeat(${d.cols},${cellPx}px);gap:24px 40px;justify-content:center">${cells}</div>` +
        `</div>`,
      meta: { twin: twin.vocabKey },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const counts = {};
      document.querySelectorAll('[data-lcs-item]').forEach((el) => {
        counts[el.dataset.lcsItem] = (counts[el.dataset.lcsItem] || 0) + 1;
      });
      const twins = Object.entries(counts).filter(([, c]) => c === 2);
      const over = Object.entries(counts).filter(([, c]) => c > 2);
      if (twins.length !== 1) fails.push(`${twins.length} duplicated nouns (want exactly 1)`);
      if (over.length) fails.push('a noun appears more than twice');
      const marked = document.querySelectorAll('[data-lcs-twin]');
      if (marked.length !== 2) fails.push(`${marked.length} marked twins (want 2)`);
      return fails;
    });
  },
};
