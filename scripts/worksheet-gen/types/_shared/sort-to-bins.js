/**
 * Factory for sorting-to-bins (K-042 two bins, G1-160 three bins):
 * a shuffled strip of mixed icons; icon-labeled bins below; the child draws
 * a line from each picture to its bin.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

function makeSortBinsType(cfg) {
  const { id, slug, bins, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'sorting-categories',
    themeAxis: { applicable: true, minNouns: bins + 2 },
    difficulty: {
      1: { perBin: 2 },
      2: { perBin: 3 },
      3: { perBin: 4 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cats = rng.sample(labelSafeNouns(theme), bins);
      const items = rng.shuffle(cats.flatMap((c) => Array.from({ length: d.perBin }, () => c)));

      const itemPx = Math.min(72, Math.floor(600 / items.length) - 12);
      const strip = items.map((c) =>
        `<span class="ws-pattern-slot" style="width:${itemPx + 18}px;height:${itemPx + 18}px" data-lcs-item="${c.vocabKey}">` +
        `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:${itemPx}px;height:${itemPx}px"></span>`).join('');

      const binBoxes = cats.map((c) =>
        `<div class="ws-bin" data-lcs-bin="${c.vocabKey}">` +
        `<span class="ws-bin-label"><img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:44px;height:44px"></span>` +
        `</div>`).join('');

      return {
        bodyHtml:
          `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;min-height:0;padding:8px 0">` +
          `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">${strip}</div>` +
          `<div style="display:flex;justify-content:space-evenly;gap:20px">${binBoxes}</div>` +
          `</div>`,
        meta: { bins: cats.map((c) => c.vocabKey), perBin: d.perBin },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const binKeys = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
        const counts = {};
        document.querySelectorAll('[data-lcs-item]').forEach((it) => {
          counts[it.dataset.lcsItem] = (counts[it.dataset.lcsItem] || 0) + 1;
          if (!binKeys.includes(it.dataset.lcsItem)) fails.push(`item ${it.dataset.lcsItem} has no bin`);
        });
        const ns = Object.values(counts);
        if (new Set(ns).size !== 1) fails.push('bins are unevenly filled: ' + JSON.stringify(counts));
        if (Object.keys(counts).length !== binKeys.length) fails.push('item kinds != bin count');
        return fails;
      });
    },
  };
}

module.exports = { makeSortBinsType };
