/**
 * G2-222 — Hundreds, tens, ones from blocks → write the number.
 * Class-5 exemplar: the full flat/rod/unit visual system.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const baseTenBlocks = require('../../primitives/base-ten.js');
const { answerBox } = require('../../templates/components.js');

module.exports = {
  id: 'G2-222',
  slug: 'place-value-blocks',
  gradeBand: 'G23',
  assetClass: 'base-ten',
  exerciseType: 'base-ten',
  themeAxis: { applicable: false },
  difficulty: {
    1: { maxH: 0, maxT: 9, rows: 4, unit: 13 },     // tens+ones (G1 shape)
    2: { maxH: 3, maxT: 6, rows: 4, unit: 10 },
    3: { maxH: 5, maxT: 9, rows: 4, unit: 9 },
  },
  i18n: {
    en: {
      title: 'Read the Blocks',
      instruction: 'Count the hundreds, tens, and ones. Write the number they show.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    const used = new Set();
    for (let i = 0; i < d.rows; i++) {
      let h, t, o;
      let guard = 0;
      do {
        h = d.maxH ? rng.int(1, d.maxH) : 0;
        t = rng.int(1, d.maxT);
        o = rng.int(1, 9);
        guard++;
      } while (used.has(`${h}-${t}-${o}`) && guard < 40);
      used.add(`${h}-${t}-${o}`);
      const blocks = baseTenBlocks({ h, t, o, unit: d.unit });
      cards.push(
        `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:8px 14px" data-lcs-value="${h * 100 + t * 10 + o}">` +
        blocks.svg +
        answerBox({ w: 110, h: 64, answer: h * 100 + t * 10 + o }) +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-value]').forEach((stage, i) => {
        const want = parseInt(stage.dataset.lcsValue, 10);
        const svg = stage.querySelector('[data-lcs-prim="base-ten"]');
        const h = svg.querySelectorAll('[data-lcs-block="hundred"]').length;
        const t = svg.querySelectorAll('[data-lcs-block="ten"]').length;
        const o = svg.querySelectorAll('[data-lcs-block="one"]').length;
        if (h * 100 + t * 10 + o !== want) fails.push(`row ${i + 1}: blocks show ${h}/${t}/${o} != ${want}`);
        const box = stage.querySelector('[data-lcs-answer]');
        if (parseInt(box.dataset.lcsAnswer, 10) !== want) fails.push(`row ${i + 1}: answer mismatch`);
      });
      return fails;
    });
  },
};
