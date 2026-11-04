/**
 * K-062 — Which two are exactly the same? One duplicated pair hides among
 * otherwise-distinct pictures; the child circles the twins.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

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
    const pool = labelSafeNouns(theme);
    // makers (2026-11-02): each picture a slot (the twin is item 0, both its cards carry it); the key and the screen mark
    // both twins (data-lcs-correct: select both) — the catalogue page is unchanged
    const picked = slot.pictures(ctx, rng.sample(pool, d.items - 1), pool, theme, 'pic');
    const marks = !!(ctx && (ctx.answerKey || ctx.screen));
    const twin = picked[0];
    const order = rng.shuffle([...picked, twin]);

    const rows = Math.ceil(d.items / d.cols);
    // two rows (level 1) take bigger pictures and more air (2026-11-03: six 140 px cards left bands above and below); level 2 as shipped
    const cellPx = Math.min(rows <= 2 ? 180 : 140, Math.floor(620 / d.cols) - 20, Math.floor(740 / rows) - 20);
    const iconPx = cellPx - 28;
    const cells = order.map((n) =>
      `<span class="ws-pattern-slot" style="width:${cellPx}px;height:${cellPx}px" ` +
      `data-lcs-item="${n.vocabKey}"${n.vocabKey === twin.vocabKey ? ' data-lcs-twin="1"' : ''}${marks && n.vocabKey === twin.vocabKey ? ' data-lcs-correct="1"' : ''}${slot.attr(ctx, 'pic', picked.indexOf(n))}>` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">` +
        `<div style="display:grid;grid-template-columns:repeat(${d.cols},${cellPx}px);gap:${rows <= 2 ? 64 : 24}px 40px;justify-content:center">${cells}</div>` +
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
