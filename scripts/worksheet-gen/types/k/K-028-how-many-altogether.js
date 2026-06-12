/**
 * K-028 — How many altogether? Two groups, count all, write the total.
 * Pre-addition: group A + group B = write-in box. Totals stay ≤ 10.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, answerBox } = require('../../templates/components.js');

module.exports = {
  id: 'K-028',
  slug: 'how-many-altogether',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { maxTotal: 5, rows: 4 },
    2: { maxTotal: 10, rows: 4 },
    3: { maxTotal: 12, rows: 4 },
  },
  i18n: {
    en: {
      title: 'How Many Altogether?',
      instruction: 'Count both groups together. Write how many in all.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.rows);
    const cards = [];
    const truth = [];
    for (let i = 0; i < d.rows; i++) {
      const a = rng.int(1, d.maxTotal - 1);
      const b = rng.int(1, d.maxTotal - a);
      const fitA = fitIcons({ n: a, stageW: 190, stageH: 120, maxPx: 50, gapX: 6, gapY: 5 });
      const fitB = fitIcons({ n: b, stageW: 190, stageH: 120, maxPx: 50, gapX: 6, gapY: 5 });
      const op = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#146B5E">${ch}</span>`;
      cards.push(
        `<div class="ws-card-stage" style="gap:14px" data-lcs-a="${a}" data-lcs-b="${b}">` +
        `<div class="ws-subgroup" data-lcs-part="a">` +
        iconRows({ theme, noun: nouns[i].noun, n: a, iconPx: fitA.iconPx, perRow: fitA.perRow, rng, gapX: 6, gapY: 5 }) +
        `</div>` + op('+') +
        `<div class="ws-subgroup" data-lcs-part="b">` +
        iconRows({ theme, noun: nouns[i].noun, n: b, iconPx: fitB.iconPx, perRow: fitB.perRow, rng, gapX: 6, gapY: 5 }) +
        `</div>` + op('=') +
        answerBox({ w: 76, h: 64, answer: a + b }) +
        `</div>`
      );
      truth.push({ row: i + 1, a, b, total: a + b });
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: { rows: truth } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card) => {
        const stage = card.querySelector('[data-lcs-a]');
        const a = parseInt(stage.dataset.lcsA, 10), b = parseInt(stage.dataset.lcsB, 10);
        const ia = stage.querySelector('[data-lcs-part="a"]').querySelectorAll('.ws-icon').length;
        const ib = stage.querySelector('[data-lcs-part="b"]').querySelectorAll('.ws-icon').length;
        if (ia !== a) fails.push(`card ${card.dataset.lcsCard}: group A ${ia} != ${a}`);
        if (ib !== b) fails.push(`card ${card.dataset.lcsCard}: group B ${ib} != ${b}`);
        const box = card.querySelector('[data-lcs-answer]');
        if (parseInt(box.dataset.lcsAnswer, 10) !== a + b) fails.push(`card ${card.dataset.lcsCard}: total mismatch`);
      });
      return fails;
    });
  },
};
