/**
 * G3-328 — Input/output tables: the rule is shown; apply it to fill the
 * missing outputs (and one missing input — inverse thinking).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const CELL = (v, given) => given
  ? `<span class="ws-pattern-slot" style="width:92px;height:56px;font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530" data-lcs-given="${v}">${v}</span>`
  : answerBox({ w: 92, h: 56, answer: v });

module.exports = {
  id: 'G3-328',
  slug: 'input-output-tables',
  gradeBand: 'G23',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { rules: [['+', 2], ['+', 5]], rows: 4 },
    2: { rules: [['+', 7], ['-', 4], ['+', 9]], rows: 4 },
    3: { rules: [['×', 2], ['×', 5], ['-', 8]], rows: 4 },
  },
  i18n: {
    en: {
      title: 'Number Machines',
      instruction: 'Each machine uses its rule on every number. Fill in the missing ones.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = rng.sample(d.rules, Math.min(2, d.rules.length)).map(([op, k]) => {
      const apply = (x) => op === '+' ? x + k : (op === '-' ? x - k : x * k);
      const lo = op === '-' ? k + 1 : 1;
      const ins = [];
      let guard = 0;
      while (ins.length < d.rows && guard++ < 100) {
        const v = rng.int(lo, op === '×' ? 12 : 40);
        if (!ins.includes(v)) ins.push(v);
      }
      // one missing input (inverse), the rest missing outputs
      const missInIdx = rng.int(1, d.rows - 1);
      const rows = ins.map((x, r) => {
        const y = apply(x);
        const inGiven = r !== missInIdx;
        const outGiven = r === missInIdx;   // when input hidden, show output
        return `<div style="display:flex;gap:14px;align-items:center" data-lcs-in="${x}" data-lcs-out="${y}">` +
          CELL(x, inGiven) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:#F2784B">→</span>` +
          CELL(y, outGiven) + `</div>`;
      }).join('');
      return (
        `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-op="${op}" data-lcs-k="${k}">` +
        `<span style="display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:999px;background:#146B5E;` +
        `color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:22px" data-lcs-rule="${op}${k}">${op === '-' ? '−' : op}${k}</span>` +
        rows + `</div>`
      );
    });
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: 1 }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-op]').forEach((card, c) => {
        const op = card.dataset.lcsOp, k = parseInt(card.dataset.lcsK, 10);
        card.querySelectorAll('[data-lcs-in]').forEach((row, r) => {
          const x = parseInt(row.dataset.lcsIn, 10), y = parseInt(row.dataset.lcsOut, 10);
          const want = op === '+' ? x + k : (op === '-' ? x - k : x * k);
          if (y !== want) fails.push(`machine ${c + 1} row ${r + 1}: ${x}${op}${k} != ${y}`);
          if (y < 0 || x < 0) fails.push(`machine ${c + 1} row ${r + 1}: negative`);
          const givens = row.querySelectorAll('[data-lcs-given]').length;
          const blanks = row.querySelectorAll('[data-lcs-answer]').length;
          if (givens !== 1 || blanks !== 1) fails.push(`machine ${c + 1} row ${r + 1}: needs exactly one given + one blank`);
        });
      });
      return fails;
    });
  },
};
