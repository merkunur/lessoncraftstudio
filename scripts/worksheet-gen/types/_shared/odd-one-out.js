/**
 * Factory for the odd-one-out / same-different family:
 *  - by-category: N of noun A + 1 of noun B (K-043)
 *  - by-size: N same-size + 1 clearly bigger/smaller (K-044)
 *  - different-one: 3 identical + 1 different = same-vs-different (K-039)
 * One row per problem; the child circles the odd item.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

function makeOddOneOutType(cfg) {
  const { id, slug, mode, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'visual-discrimination',
    themeAxis: { applicable: true, minNouns: 6 },
    difficulty: {
      1: { rows: 4, items: 4 },
      2: { rows: 4, items: 5 },
      3: { rows: 5, items: 6 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const pool = labelSafeNouns(theme);
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        const [main, odd] = rng.sample(pool, 2);
        const oddIdx = rng.int(0, d.items - 1);
        const px = Math.min(76, Math.floor((600 - (d.items - 1) * 14) / d.items));
        const items = [];
        for (let k = 0; k < d.items; k++) {
          const isOdd = k === oddIdx;
          let src = fileUri(theme, main.noun);
          let size = px;
          if (mode === 'category' && isOdd) src = fileUri(theme, odd.noun);
          if (mode === 'size' && isOdd) size = Math.round(px * (rng.next() < 0.5 ? 0.55 : 1.45));
          items.push(
            `<span style="display:flex;align-items:center;justify-content:center;width:${Math.round(px * 1.5)}px;height:${Math.round(px * 1.5)}px">` +
            `<img class="ws-icon" src="${src}" alt="" style="width:${size}px;height:${size}px"${isOdd ? ' data-lcs-odd="1"' : ''}></span>`
          );
        }
        cards.push(
          `<div class="ws-card-stage" style="justify-content:space-evenly;padding:8px" data-lcs-items="${d.items}">` +
          items.join('') + `</div>`
        );
        truth.push({ row: i + 1, main: main.vocabKey, odd: mode === 'category' ? odd.vocabKey : main.vocabKey, oddIdx });
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: { rows: truth, mode } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-items]').forEach((stage, i) => {
          const icons = [...stage.querySelectorAll('.ws-icon')];
          const n = parseInt(stage.dataset.lcsItems, 10);
          if (icons.length !== n) fails.push(`row ${i + 1}: ${icons.length} items != ${n}`);
          const odd = icons.filter((el) => el.dataset.lcsOdd);
          if (odd.length !== 1) { fails.push(`row ${i + 1}: ${odd.length} odd items`); return; }
          const o = odd[0];
          const others = icons.filter((el) => !el.dataset.lcsOdd);
          const sameSrc = others.every((el) => el.src === others[0].src);
          if (!sameSrc) fails.push(`row ${i + 1}: non-odd items are not identical`);
          const srcDiffers = o.src !== others[0].src;
          const sizeDiffers = o.style.width !== others[0].style.width;
          if (!srcDiffers && !sizeDiffers) fails.push(`row ${i + 1}: odd item is not actually different`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeOddOneOutType };
