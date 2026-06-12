/**
 * K-057 — Match the shadow (icon ↔ its silhouette).
 * Asset class 1: plain icon placement + Sharp silhouette derivation.
 *
 * Left column: theme icons in cream cards. Right column: their silhouettes,
 * shuffled (never the identity permutation). The child draws connecting lines
 * between the coral dots.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { silhouetteUri, pickDistinctSilhouettes } = require('../../image-cache/silhouette.js');

module.exports = {
  id: 'K-057',
  slug: 'shadow-matching',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-matching',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { pairs: 4 },
    2: { pairs: 5 },
    3: { pairs: 6 },
  },
  i18n: {
    en: {
      title: 'Match the Shadow',
      instruction: 'Draw a line from each picture to its shadow.',
    },
  },

  async build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // shape-distinct selection: no two near-identical shadows on one page
    const nouns = await pickDistinctSilhouettes(theme, labelSafeNouns(theme), d.pairs, rng);

    // derangement: no silhouette sits straight across from its picture
    let order;
    do {
      order = rng.shuffle(nouns.map((_, i) => i));
    } while (order.some((v, i) => v === i));

    const itemH = Math.floor((760 - (d.pairs - 1) * 14) / d.pairs);
    const iconPx = Math.min(96, itemH - 24);

    const left = [];
    const right = [];
    for (let i = 0; i < d.pairs; i++) {
      const ln = nouns[i];
      left.push(
        `<div class="ws-match-item" style="width:190px;height:${itemH}px" data-lcs-left="${ln.vocabKey}">` +
        `<img class="ws-icon" src="${fileUri(theme, ln.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`
      );
      const rn = nouns[order[i]];
      right.push(
        `<div class="ws-match-item ws-match-item--plain" style="width:190px;height:${itemH}px" data-lcs-right="${rn.vocabKey}">` +
        `<img class="ws-icon" src="${await silhouetteUri(theme, rn.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`
      );
    }

    return {
      bodyHtml:
        `<div class="ws-match">` +
        `<div class="ws-match-col">${left.join('')}</div>` +
        `<div class="ws-match-col">${right.join('')}</div>` +
        `</div>`,
      meta: { pairs: nouns.map((n, i) => ({ left: n.vocabKey, rightRow: order.indexOf(i) })) },
    };
  },

  /** QA: right column is a permutation of left; never identity-aligned. */
  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const left = [...document.querySelectorAll('[data-lcs-left]')].map((e) => e.dataset.lcsLeft);
      const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
      if (left.length !== right.length) fails.push('column length mismatch');
      if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of left');
      left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: shadow sits straight across from its picture`); });
      return fails;
    });
  },
};
