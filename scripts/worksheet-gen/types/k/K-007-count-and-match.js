/**
 * K-007 — Count and match: draw a line from each picture group to its numeral.
 * Left column: icon clusters. Right column: big numerals, deranged order.
 * Counts are pairwise distinct (otherwise the matching is ambiguous).
 */
'use strict';
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons } = require('../../templates/components.js');

module.exports = {
  id: 'K-007',
  slug: 'count-and-match',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { min: 1, max: 5, pairs: 4 },
    2: { min: 2, max: 9, pairs: 4 },
    3: { min: 4, max: 12, pairs: 5 },
  },
  i18n: {
    en: {
      title: 'Count and Match',
      instruction: 'Count the pictures. Draw a line to the right number.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.pairs);
    const all = [];
    for (let v = d.min; v <= d.max; v++) all.push(v);
    const counts = rng.sample(all, d.pairs);   // distinct by construction

    let order;
    do { order = rng.shuffle(counts.map((_, i) => i)); }
    while (order.some((v, i) => v === i));

    const itemH = Math.floor((760 - (d.pairs - 1) * 14) / d.pairs);
    const left = [];
    const right = [];
    for (let i = 0; i < d.pairs; i++) {
      const n = counts[i];
      const fit = fitIcons({ n, stageW: 200, stageH: itemH - 20, maxPx: 56 });
      left.push(
        `<div class="ws-match-item" style="width:240px;height:${itemH}px" data-lcs-left="${n}">` +
        iconRows({ theme, noun: nouns[i].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 6, gapY: 5 }) +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`
      );
      const rn = counts[order[i]];
      right.push(
        `<div class="ws-match-item ws-match-item--plain" style="width:130px;height:${itemH}px" data-lcs-right="${rn}">` +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:44px;color:#3A3530">${rn}</span>` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`
      );
    }
    return {
      bodyHtml:
        `<div class="ws-match" style="padding:6px 60px">` +
        `<div class="ws-match-col">${left.join('')}</div>` +
        `<div class="ws-match-col">${right.join('')}</div>` +
        `</div>`,
      meta: { counts, order },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const left = [...document.querySelectorAll('[data-lcs-left]')];
      const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
      left.forEach((item, i) => {
        const n = parseInt(item.dataset.lcsLeft, 10);
        const icons = item.querySelectorAll('.ws-icon').length;
        if (icons !== n) fails.push(`row ${i + 1}: ${icons} icons != ${n}`);
        if (right[i] === item.dataset.lcsLeft) fails.push(`row ${i + 1}: numeral sits straight across`);
      });
      const ls = left.map((e) => e.dataset.lcsLeft);
      if (new Set(ls).size !== ls.length) fails.push('duplicate counts — ambiguous matching');
      if ([...ls].sort().join() !== [...right].sort().join()) fails.push('right column not a permutation');
      return fails;
    });
  },
};
