/**
 * Factory: SCIENCE curated-pair match — two columns; the child draws a line
 * from each left picture to its curated partner on the right (adult↔baby,
 * helper↔tool, sense↔body-part, animal↔home).
 *
 * Distinct from the existing visual-matching (shadow-match): that matches an
 * icon to its OWN silhouette (identity). Science matches cross-noun semantic
 * pairs from a curated data file. Cores untouched — borrows the .ws-match /
 * .ws-match-col / .ws-match-item / .ws-match-dot layout; no page.css edit.
 *
 * cfg: { id, slug, gradeBand, data:{pairs:[{left:{theme,noun},right:{theme,noun}}]}, i18n }
 * themeAxis OFF (curated cross-theme refs); pair sample + derangement = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

function makeSciencePairMatch(cfg) {
  const allPairs = cfg.data.pairs;
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'science-match',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { pairs: 4 }, 2: { pairs: 5 }, 3: { pairs: 5 } },
    i18n: cfg.i18n,

    build({ difficulty }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const n = Math.min(d.pairs, allPairs.length);
      const pairs = rng.sample(allPairs, n);

      // right column deranged: no baby sits straight across from its grown-up
      let order;
      do { order = rng.shuffle(pairs.map((_, i) => i)); }
      while (n > 1 && order.some((v, i) => v === i));

      const itemH = Math.floor((720 - (n - 1) * 14) / n);
      const iconPx = Math.min(92, itemH - 26);

      const left = pairs.map((p) =>
        `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-sci-left="${p.left.noun}">` +
        `<img class="ws-icon" src="${fileUri(p.left.theme, p.left.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');

      const right = order.map((srcIdx) => {
        const p = pairs[srcIdx];
        return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-sci-right="${p.left.noun}">` +
          `<img class="ws-icon" src="${fileUri(p.right.theme, p.right.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
      }).join('');

      return {
        bodyHtml:
          `<div class="ws-match" style="padding:6px 40px">` +
          `<div class="ws-match-col">${left}</div>` +
          `<div class="ws-match-col">${right}</div>` +
          `</div>`,
        meta: { pairs: pairs.map((p) => p.left.noun + '→' + p.right.noun) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const left = [...document.querySelectorAll('[data-sci-left]')].map((e) => e.dataset.sciLeft);
        const right = [...document.querySelectorAll('[data-sci-right]')].map((e) => e.dataset.sciRight);
        if (left.length !== right.length) fails.push('column length mismatch');
        if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of left');
        left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: baby sits straight across from its grown-up`); });
        return fails;
      });
    },
  };
}

module.exports = { makeSciencePairMatch };
