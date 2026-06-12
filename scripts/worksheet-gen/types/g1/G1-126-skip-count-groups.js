/**
 * G1-126 — Skip-count the objects: equal icon groups of 2/5/10 with a running
 * count box under each group (2, 4, 6, … pattern made tangible).
 */
'use strict';
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, answerBox } = require('../../templates/components.js');

module.exports = {
  id: 'G1-126',
  slug: 'skip-counting-groups',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: true, minNouns: 2 },
  difficulty: {
    1: { k: 2, groups: 5 },
    2: { k: 5, groups: 5 },
    3: { k: 10, groups: 5 },
  },
  i18n: {
    en: {
      title: 'Count in Groups',
      instruction: 'Each box holds the same amount. Skip count and write the running total.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const noun = rng.pick(labelSafeNouns(theme));
    const fit = fitIcons({ n: d.k, stageW: 104, stageH: 130, maxPx: d.k <= 2 ? 46 : 34, gapX: 4, gapY: 4 });
    const groups = [];
    for (let g = 1; g <= d.groups; g++) {
      // first total is GIVEN (anchors the pattern); the rest are blanks
      const total = g * d.k;
      const totalEl = g === 1
        ? `<span class="ws-pattern-slot" style="width:66px;height:50px;font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530;background:#DDEBE8;border-color:#146B5E" data-lcs-given="${total}">${total}</span>`
        : answerBox({ w: 66, h: 50, answer: total });
      groups.push(
        `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:10px" data-lcs-groupn="${d.k}">` +
        `<span class="ws-subgroup" style="width:116px;height:140px;flex:0 0 auto">` +
        iconRows({ theme, noun: noun.noun, n: d.k, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 4, gapY: 4 }) +
        `</span>` + totalEl + `</span>`
      );
    }
    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:space-evenly" data-lcs-k="${d.k}">${groups.join('')}</div>`,
      meta: { k: d.k, groups: d.groups },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-k]');
      const k = parseInt(wrap.dataset.lcsK, 10);
      const groups = [...wrap.querySelectorAll('[data-lcs-groupn]')];
      groups.forEach((g, i) => {
        const icons = g.querySelectorAll('.ws-icon').length;
        if (icons !== k) fails.push(`group ${i + 1}: ${icons} icons != ${k}`);
        const tot = g.querySelector('[data-lcs-given],[data-lcs-answer]');
        const v = parseInt(tot.dataset.lcsGiven !== undefined ? tot.dataset.lcsGiven : tot.dataset.lcsAnswer, 10);
        if (v !== (i + 1) * k) fails.push(`group ${i + 1}: total ${v} != ${(i + 1) * k}`);
      });
      if (!groups[0].querySelector('[data-lcs-given]')) fails.push('first total must be given as the anchor');
      return fails;
    });
  },
};
