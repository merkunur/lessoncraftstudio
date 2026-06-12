/**
 * Factory for the compare-two-groups family (K-008 more / K-009 fewer).
 * Each row: two icon groups in white sub-boxes; the child circles the group
 * the instruction asks for. data-lcs-target marks the correct box.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons } = require('../../templates/components.js');

function makeCompareGroupsType({ id, slug, mode, i18n }) {
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'comparing-groups',
    themeAxis: { applicable: true, minNouns: 3 },
    difficulty: {
      1: { min: 1, max: 6, rows: 3, minDiff: 2 },
      2: { min: 2, max: 10, rows: 3, minDiff: 1 },
      3: { min: 4, max: 12, rows: 3, minDiff: 1 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const nouns = rng.sample(labelSafeNouns(theme), d.rows);
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        let a, b;
        do {
          a = rng.int(d.min, d.max);
          b = rng.int(d.min, d.max);
        } while (Math.abs(a - b) < d.minDiff);
        const target = mode === 'more' ? Math.max(a, b) : Math.min(a, b);
        const boxes = [a, b].map((n) => {
          const fit = fitIcons({ n, stageW: 250, stageH: 150, maxPx: 60, gapX: 8, gapY: 6 });
          return `<div class="ws-subgroup" data-lcs-group="${n}"${n === target ? ' data-lcs-target="1"' : ''}>` +
            iconRows({ theme, noun: nouns[i].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 8, gapY: 6 }) +
            `</div>`;
        });
        cards.push(`<div class="ws-card-stage" style="gap:18px">${boxes.join('')}</div>`);
        truth.push({ row: i + 1, a, b, target });
      }
      return {
        bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }),
        meta: { rows: truth, mode },
      };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        document.querySelectorAll('[data-lcs-card]').forEach((card) => {
          const groups = [...card.querySelectorAll('[data-lcs-group]')];
          if (groups.length !== 2) { fails.push(`card ${card.dataset.lcsCard}: ${groups.length} groups`); return; }
          groups.forEach((g) => {
            const n = parseInt(g.dataset.lcsGroup, 10);
            const icons = g.querySelectorAll('.ws-icon').length;
            if (icons !== n) fails.push(`card ${card.dataset.lcsCard}: ${icons} icons != ${n}`);
          });
          const [a, b] = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
          if (a === b) fails.push(`card ${card.dataset.lcsCard}: equal groups — no answer`);
          const target = groups.find((g) => g.dataset.lcsTarget);
          if (!target) { fails.push(`card ${card.dataset.lcsCard}: no target`); return; }
          const tn = parseInt(target.dataset.lcsGroup, 10);
          const expected = mode === 'more' ? Math.max(a, b) : Math.min(a, b);
          if (tn !== expected) fails.push(`card ${card.dataset.lcsCard}: target ${tn} != ${mode} of ${a},${b}`);
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeCompareGroupsType };
