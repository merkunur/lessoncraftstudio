/**
 * G1-105 — Ten-frame addition: two colors fill one frame; write the sum.
 * Asset class 3 exemplar (ten-frames & subitizing).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const tenFrame = require('../../primitives/ten-frame.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (n, color) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:${color}" data-lcs-num="${n}">${n}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530">${ch}</span>`;

module.exports = {
  id: 'G1-105',
  slug: 'ten-frame-addition',
  gradeBand: 'G1',
  assetClass: 'ten-frames',
  exerciseType: 'counting-frames',
  themeAxis: { applicable: false },
  difficulty: {
    1: { maxTotal: 5, cards: 4 },
    2: { maxTotal: 10, cards: 4 },
    3: { maxTotal: 10, cards: 6 },
  },
  i18n: {
    en: {
      title: 'Ten-Frame Addition',
      instruction: 'Count the two colors. Write the addition sentence’s answer.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    const used = new Set();
    for (let i = 0; i < d.cards; i++) {
      let a, b;
      let guard = 0;
      do {
        a = rng.int(1, d.maxTotal - 1);
        b = rng.int(1, Math.max(1, d.maxTotal - a));
        guard++;
      } while (used.has(a + '+' + b) && guard < 30);
      used.add(a + '+' + b);
      const frame = tenFrame({ a, b, cell: 50 });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:14px">` +
        frame.svg +
        `<span style="display:inline-flex;align-items:center;gap:10px">` +
        NUM(a, '#146B5E') + OP('+') + NUM(b, '#F2784B') + OP('=') +
        answerBox({ w: 62, h: 52, answer: a + b }) +
        `</span></div>`
      );
    }
    return {
      bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }),
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const svg = card.querySelector('[data-lcs-prim="ten-frame"]');
        const a = parseInt(svg.dataset.lcsA, 10), b = parseInt(svg.dataset.lcsB, 10);
        const ca = svg.querySelectorAll('[data-lcs-counter="a"]').length;
        const cb = svg.querySelectorAll('[data-lcs-counter="b"]').length;
        if (ca !== a || cb !== b) fails.push(`card ${i + 1}: frame shows ${ca}+${cb}, declared ${a}+${b}`);
        const nums = [...card.querySelectorAll('[data-lcs-num]')].map((e) => parseInt(e.dataset.lcsNum, 10));
        if (nums[0] !== a || nums[1] !== b) fails.push(`card ${i + 1}: printed equation != frame`);
        const box = card.querySelector('[data-lcs-answer]');
        if (parseInt(box.dataset.lcsAnswer, 10) !== a + b) fails.push(`card ${i + 1}: sum mismatch`);
        if (a + b > 10) fails.push(`card ${i + 1}: total exceeds the frame`);
      });
      return fails;
    });
  },
};
