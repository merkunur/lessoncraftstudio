/**
 * K-010 — Which groups have the SAME number? Three groups per row; exactly
 * two hold the same count. The child circles the matching pair.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons } = require('../../templates/components.js');

module.exports = {
  id: 'K-010',
  slug: 'equal-groups',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'comparing-groups',
  themeAxis: { applicable: true, minNouns: 6 },
  difficulty: {
    1: { rows: 3, min: 1, max: 5 },
    2: { rows: 3, min: 2, max: 8 },
    3: { rows: 3, min: 3, max: 10 },
  },
  i18n: {
    en: {
      title: 'Find the Equal Groups',
      instruction: 'Two groups have the same number. Circle both of them.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const nouns = rng.sample(labelSafeNouns(theme), 3);
      const same = rng.int(d.min, d.max);
      let other;
      do { other = rng.int(d.min, d.max); } while (other === same);
      const counts = rng.shuffle([same, same, other]);
      const boxes = counts.map((n, k) => {
        const fit = fitIcons({ n, stageW: 160, stageH: 130, maxPx: 48, gapX: 5, gapY: 4 });
        return `<div class="ws-subgroup" data-lcs-group="${n}"${n === same ? ' data-lcs-equal="1"' : ''}>` +
          iconRows({ theme, noun: nouns[k].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 5, gapY: 4 }) +
          `</div>`;
      });
      cards.push(`<div class="ws-card-stage" style="gap:14px">${boxes.join('')}</div>`);
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const groups = [...card.querySelectorAll('[data-lcs-group]')];
        if (groups.length !== 3) { fails.push(`row ${i + 1}: ${groups.length} groups`); return; }
        groups.forEach((g) => {
          const n = parseInt(g.dataset.lcsGroup, 10);
          if (g.querySelectorAll('.ws-icon').length !== n) fails.push(`row ${i + 1}: icon count mismatch`);
        });
        const ns = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
        const equal = groups.filter((g) => g.dataset.lcsEqual);
        if (equal.length !== 2) fails.push(`row ${i + 1}: ${equal.length} marked equal (want 2)`);
        const [a, b] = equal.map((g) => parseInt(g.dataset.lcsGroup, 10));
        if (a !== b) fails.push(`row ${i + 1}: marked groups differ`);
        if (new Set(ns).size !== 2) fails.push(`row ${i + 1}: counts not exactly one pair + one odd`);
      });
      return fails;
    });
  },
};
