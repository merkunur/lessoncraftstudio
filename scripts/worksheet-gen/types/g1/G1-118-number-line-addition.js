/**
 * G1-118 — Number-line addition: hops drawn from a, land on a+b; the child
 * reads the jumps and completes a + b = []. Asset class 4 exemplar.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberLine = require('../../primitives/number-line.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (n) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530" data-lcs-num="${n}">${n}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

module.exports = {
  id: 'G1-118',
  slug: 'number-line-addition',
  gradeBand: 'G1',
  assetClass: 'number-lines',
  exerciseType: 'number-lines',
  themeAxis: { applicable: false },
  difficulty: {
    1: { lineMax: 10, rows: 3 },
    2: { lineMax: 20, rows: 3 },
    3: { lineMax: 20, rows: 4 },
  },
  i18n: {
    en: {
      title: 'Hop Along the Line!',
      instruction: 'Start at the dot. Count the hops. Write the addition answer.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const a = rng.int(0, d.lineMax - 2);
      const b = rng.int(1, Math.min(6, d.lineMax - a));   // ≤6 hops stay readable
      const nl = numberLine({
        min: 0, max: d.lineMax,
        labelEvery: d.lineMax > 10 ? 2 : 1,
        width: 540,
        jumps: [{ from: a, to: a + b }],
        marks: [a],
      });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-a="${a}" data-lcs-b="${b}">` +
        nl.svg +
        `<span style="display:inline-flex;align-items:center;gap:10px">` +
        NUM(a) + OP('+') + NUM(b) + OP('=') + answerBox({ w: 60, h: 48, answer: a + b }) +
        `</span></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const a = parseInt(card.querySelector('[data-lcs-a]').dataset.lcsA, 10);
        const b = parseInt(card.querySelector('[data-lcs-a]').dataset.lcsB, 10);
        const svg = card.querySelector('[data-lcs-prim="number-line"]');
        const hops = [...svg.querySelectorAll('[data-lcs-hop]')].map((e) => e.dataset.lcsHop);
        if (hops.length !== b) fails.push(`row ${i + 1}: ${hops.length} hops != ${b}`);
        // hops form the exact chain a -> a+b
        for (let k = 0; k < b; k++) {
          const want = `${a + k}->${a + k + 1}`;
          if (!hops.includes(want)) fails.push(`row ${i + 1}: missing hop ${want}`);
        }
        const mark = svg.querySelector('[data-lcs-mark]');
        if (!mark || parseInt(mark.dataset.lcsMark, 10) !== a) fails.push(`row ${i + 1}: start dot != ${a}`);
        const box = card.querySelector('[data-lcs-answer]');
        if (parseInt(box.dataset.lcsAnswer, 10) !== a + b) fails.push(`row ${i + 1}: sum mismatch`);
        const max = parseInt(svg.dataset.lcsMax, 10);
        if (a + b > max) fails.push(`row ${i + 1}: lands beyond the line`);
      });
      return fails;
    });
  },
};
